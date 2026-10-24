import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {readFile} from 'node:fs/promises';
import {Simulation,instrumentClearance} from '../src/simulation.js';
import {TissueVolume} from '../src/tissue.js';
import {InteractionController,CUT_RADIUS} from '../src/interaction-controller.js';
import {createVolumeState,applyCapsuleCut,allChunkKeys,polygonizeChunk} from '../src/tissue-worker.js';
import {loadAssemblies} from '../src/authentic-assemblies.js';

function slabWorkbench(){
  const dims=[49,33,33],spacing=[.00025,.0005,.0005],origin=[-.006,-.008,-.008],values=new Float32Array(dims[0]*dims[1]*dims[2]);
  for(let z=0;z<dims[2];z++)for(let y=0;y<dims[1];y++)for(let x=0;x<dims[0];x++){
    const p=[origin[0]+x*spacing[0],origin[1]+y*spacing[1],origin[2]+z*spacing[2]],q=p.map((v,i)=>Math.abs(v)-[.0002,.006,.006][i]);
    values[x+dims[0]*(y+dims[1]*z)]=Math.hypot(...q.map(v=>Math.max(0,v)))+Math.min(0,Math.max(...q));
  }
  return volumeWorkbench(createVolumeState({dims,spacing,origin},values,8));
}

function volumeWorkbench(volume){
  const tissue=new TissueVolume();tissue.metadata=volume.meta;tissue._baseField=volume.base;tissue.ready=true;
  for(const key of allChunkKeys(volume))tissue._replaceChunk(polygonizeChunk(volume,key));
  let requests=0;
  const enqueue=async operation=>{
    assert.equal(operation.type,'cut');requests++;
    let removedMm3=0,changedSamples=0;const dirty=new Set();
    for(const cut of operation.cuts){const result=applyCapsuleCut(volume,cut);removedMm3+=result.removedMm3;changedSamples+=result.changedSamples;for(const key of result.dirty)dirty.add(key);}
    for(const key of dirty)tissue._replaceChunk(polygonizeChunk(volume,key));
    tissue.removedVolumeMm3=volume.removedVolumeMm3;
    return {changed:changedSamples>0,removedMm3,removedVolumeMm3:volume.removedVolumeMm3};
  };
  tissue._enqueue=enqueue;
  const sim=new Simulation();sim.state.tools.left.jaw=1;sim.state.tools.right.jaw=0;sim.setCutting(true);
  return {tissue,sim,volume,enqueue,get requests(){return requests;}};
}

test('an 8 mm blade cuts a thin flap when both blade endpoints are in air',async()=>{
  const f=slabWorkbench(),a=new THREE.Vector3(-.004,0,0),b=new THREE.Vector3(.004,0,0);
  try{
    assert.ok(f.tissue.contactDistance(a,.0032)>.0032&&f.tissue.contactDistance(b,.0032)>.0032);
    assert.equal(f.tissue.contactSegment(a,b,.0032).contact,true,'the complete segment intersects the actual thin sheet');
    f.sim.state.tools.right.position=b.toArray();
    const interaction=new InteractionController(f.sim,f.tissue,{toolBlade:()=>({source:'regression-segment',segments:[{a,b}],jaw:0})});
    await interaction.update(1/60);
    assert.equal(interaction.contact.right,true,'contact feedback describes the blade rather than just the TCP');
    assert.ok(f.requests>0&&f.tissue.removedVolumeMm3>0,'mid-blade contact must create a real CSG defect');
  }finally{f.tissue.dispose();}
});

test('changing blade orientation at a fixed TCP performs a new real cut',async()=>{
  const f=slabWorkbench(),tip=new THREE.Vector3(0,.004,0);let back=new THREE.Vector3(0,-.004,0);
  try{
    f.sim.state.tools.right.position=tip.toArray();
    const interaction=new InteractionController(f.sim,f.tissue,{toolBlade:()=>({segments:[{a:back,b:tip}],jaw:0})});
    await interaction.update(1/60);const first=f.tissue.removedVolumeMm3,requests=f.requests;
    assert.ok(first>0);
    back=new THREE.Vector3(0,.004,-.008);f.sim.state.tools.right.wrist[2]=Math.PI/2;
    await interaction.update(1/60);
    assert.deepEqual(f.sim.state.tools.right.position,tip.toArray());
    assert.ok(f.requests>requests&&f.tissue.removedVolumeMm3>first,'a changed real blade at the same TCP must not hit the old TCP-only deduplication');
  }finally{f.tissue.dispose();}
});

test('a failed worker cut can retry at the same blade pose without a movement workaround',async()=>{
  const f=slabWorkbench(),a=new THREE.Vector3(-.004,0,0),b=new THREE.Vector3(.004,0,0);let fail=true;
  try{
    f.sim.state.tools.right.position=b.toArray();
    f.tissue._enqueue=async operation=>{if(fail){fail=false;throw new Error('transient regression worker failure');}return f.enqueue(operation);};
    const interaction=new InteractionController(f.sim,f.tissue,{toolBlade:()=>({segments:[{a,b}],jaw:0})});
    await assert.rejects(interaction.update(1/60),/transient regression worker failure/);
    assert.equal(interaction.cuttingBusy,true,'a failed legitimate blade sample remains pending for retry');
    assert.ok(interaction.metrics.pendingCutSamples>0);
    await interaction.update(1/60);
    assert.ok(f.tissue.removedVolumeMm3>0&&f.requests>0);
  }finally{f.tissue.dispose();}
});

test('an air-only field update is not cached as successful tissue removal',async()=>{
  const f=slabWorkbench(),a=new THREE.Vector3(-.004,0,0),b=new THREE.Vector3(.004,0,0);let first=true;
  try{
    f.sim.state.tools.right.position=b.toArray();
    f.tissue._enqueue=async operation=>{if(first){first=false;return {changed:true,removedMm3:0};}return f.enqueue(operation);};
    const interaction=new InteractionController(f.sim,f.tissue,{toolBlade:()=>({segments:[{a,b}],jaw:0})});
    await interaction.update(1/60);
    assert.equal(interaction.lastCut,null);assert.equal(interaction.contact.cutStatus,'no-material');
    await interaction.update(1/60);
    assert.ok(f.tissue.removedVolumeMm3>0,'a no-material result must not suppress the next real worker attempt');
  }finally{f.tissue.dispose();}
});

test('reset invalidates old cut continuations without disturbing a newer cut task or feedback',async()=>{
  for(const outcome of ['resolve','reject'])for(const settlement of ['pending','completed']){
    const f=slabWorkbench(),a=new THREE.Vector3(-.004,0,0),b=new THREE.Vector3(.004,0,0),pending=[];
    try{
      f.sim.state.tools.right.position=b.toArray();
      f.tissue._enqueue=operation=>new Promise((resolve,reject)=>pending.push({operation,resolve,reject}));
      const interaction=new InteractionController(f.sim,f.tissue,{toolBlade:()=>({segments:[{a,b}],jaw:0})});
      const old=interaction.update(1/60);assert.equal(pending.length,1);assert.equal(interaction.cuttingBusy,true);
      interaction.reset();
      // TissueVolume.reset increments the worker epoch and clears old material
      // history; the controlled promises model replies arriving on either side
      // of the new cut without relying on wall-clock timing.
      f.tissue._epoch++;f.tissue._cuts=[];
      const current=interaction.update(1/60);assert.equal(pending.length,2);assert.equal(interaction.cuttingBusy,true);
      const finishOld=async()=>{
        if(outcome==='resolve')pending[0].resolve({changed:true,removedMm3:123});else pending[0].reject(new Error('obsolete pre-reset cut'));
        await old;
      };
      if(settlement==='pending'){await finishOld();assert.equal(interaction.cuttingBusy,true,'an old finally must not clear the newer task');}
      pending[1].resolve(await f.enqueue(pending[1].operation));await current;
      const signature=interaction.lastCut;assert.ok(signature);assert.equal(interaction.contact.cutStatus,'cut');
      if(settlement==='completed')await finishOld();
      assert.equal(interaction.cuttingBusy,false);assert.equal(interaction.contact.cutStatus,'cut');
      assert.strictEqual(interaction.lastCut,signature,'a stale result must not overwrite the new material operation');
      assert.ok(f.tissue.removedVolumeMm3>0);
    }finally{f.tissue.dispose();}
  }
});

test('a near TCP with all actual blade metal away from tissue does not cut',async()=>{
  const f=slabWorkbench();
  try{
    f.sim.state.tools.right.position=[0,0,0];
    const a=new THREE.Vector3(.012,0,0),b=new THREE.Vector3(.02,0,0);
    const interaction=new InteractionController(f.sim,f.tissue,{toolBlade:()=>({segments:[{a,b}],jaw:0})});
    await interaction.update(1/60);
    assert.equal(f.requests,0);assert.equal(f.tissue.removedVolumeMm3,0);
    assert.equal(interaction.contact.right,false,'TCP proximity must not masquerade as metal contact');
  }finally{f.tissue.dispose();}
});

async function sourceAssemblies(){
  const previous=globalThis.fetch;
  try{globalThis.fetch=async url=>new Response(await readFile(new URL(`../public${url}`,import.meta.url)));return await loadAssemblies(new THREE.Scene());}
  finally{globalThis.fetch=previous;}
}

function distanceToSourceJaw(tool,world){
  const triangle=new THREE.Triangle(),closest=new THREE.Vector3();let best=Infinity;
  for(const name of ['jaw_1_link','jaw_2_link'])tool.group.getObjectByName(name).traverse(mesh=>{
    if(!mesh.isMesh)return;
    const point=world.clone().applyMatrix4(mesh.matrixWorld.clone().invert()),positions=mesh.geometry.attributes.position,indices=mesh.geometry.index;
    for(let i=0;i<(indices?.count??positions.count);i+=3){
      triangle.a.fromBufferAttribute(positions,indices?indices.getX(i):i);triangle.b.fromBufferAttribute(positions,indices?indices.getX(i+1):i+1);triangle.c.fromBufferAttribute(positions,indices?indices.getX(i+2):i+2);
      triangle.closestPointToPoint(point,closest);best=Math.min(best,closest.distanceTo(point));
    }
  });
  return best;
}

test('the source CAD cutting path follows both curved metal jaws through articulation',async()=>{
  const assemblies=await sourceAssemblies(),sim=new Simulation();
  try{
    sim.state.tools.right.jaw=0;
    for(const wrist of [[0,0,0],[.9,-1.1,.7]]){
      sim.state.tools.right.wrist=wrist;assemblies.tools.right.update(sim.state.tools.right);
      const blade=assemblies.toolBlade('right'),tool=assemblies.tools.right;
      assert.equal(blade.source,'source-CAD-curved-jaw');assert.ok(blade.segments.length>=4);
      let proximal=0;
      for(const segment of blade.segments)for(const point of [segment.a,segment.b]){
        assert.ok(distanceToSourceJaw(tool,point)<.00003,'every blade path endpoint must lie on the unchanged source jaw triangles');
        const local=point.clone().sub(tool.tipPosition).applyQuaternion(tool.tipQuaternion.clone().invert());
        assert.ok(local.z<-.002,'the TCP air gap is excluded from the active metal');
        if(local.z<-.008)proximal++;
      }
      assert.ok(proximal>0,'active cutting metal extends behind the old 8 mm TCP proxy');
    }
  }finally{assemblies.dispose();}
});

test('real curved CAD blades cut a 35 mm raised BodyParts liver tent with clear tools and air at both jaw ends',async()=>{
  const metadata=JSON.parse(await readFile(new URL('../public/assets/liver-volume.json',import.meta.url),'utf8'));
  const bytes=await readFile(new URL('../public/assets/liver-volume.bin',import.meta.url));
  const volume=createVolumeState(metadata,new Float32Array(bytes.buffer,bytes.byteOffset,bytes.byteLength/4),16);
  const f=volumeWorkbench(volume),assemblies=await sourceAssemblies();
  try{
    f.tissue.group.position.y=1.035;f.tissue.group.rotation.x=-Math.PI/2;f.tissue.group.updateMatrixWorld(true);
    const anchor=f.tissue.findParentSurfacePoint([-.025,.015,.075],.008);assert.ok(anchor);
    const displacement=new THREE.Vector3(0,0,.035);f.tissue.setGrasp(anchor,displacement);
    const held=f.tissue.group.localToWorld(f.tissue.deformPoint(anchor));
    const left=f.sim.state.tools.left,right=f.sim.state.tools.right;
    // The narrower CAD-sized kerf requires physical middle-blade contact:
    // rotate the left wrist clear, then place the right jaw 1 mm closer.
    left.position=held.toArray();left.jaw=0;left.wrist=[-2.9989633371462627,-1.7522124481673962,-1.3711020171722994];
    right.position=[-.021213295416704214,1.1408066237048135,-.01838100938528305];
    right.wrist=[.23878295820621145,-2.3446010070384746,2.216962990561834];right.jaw=0;
    for(const tool of [left,right])tool.alignment=new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,0,1),new THREE.Vector3(...tool.position).sub(new THREE.Vector3(...tool.port)).normalize()).toArray();
    assert.ok(instrumentClearance(left,right)>.0001,'the regression must not bypass a genuine two-tool collision');
    assemblies.tools.left.update(left);assemblies.tools.right.update(right);
    assert.ok(assemblies.tools.left.rcmError<1e-9&&assemblies.tools.right.rcmError<1e-9,'both source shafts still pass their commanded ports');
    const blade=assemblies.toolBlade('right');
    const wholeEnds=[blade.segments[0].a,blade.segments[5].b,blade.segments[6].a,blade.segments[11].b];
    assert.ok(wholeEnds.every(point=>f.tissue.contactDistance(f.tissue.group.worldToLocal(point.clone()),CUT_RADIUS)>CUT_RADIUS),'both ends of each complete source jaw remain in air');
    assert.ok(blade.segments.some(segment=>f.tissue.contactSegment(f.tissue.group.worldToLocal(segment.a.clone()),f.tissue.group.worldToLocal(segment.b.clone()),CUT_RADIUS).contact));
    const interaction=new InteractionController(f.sim,f.tissue,{toolBlade:side=>assemblies.toolBlade(side),toolQuaternion:side=>assemblies.tools[side].tipQuaternion});
    interaction.grasp={kind:'tissue',fragmentId:null,deformationModel:'local-flow',local:anchor.toArray(),reference:anchor.toArray(),displacement:displacement.toArray()};
    await interaction.update(1/60);
    assert.equal(interaction.contact.bladeSource,'source-CAD-curved-jaw');assert.equal(interaction.contact.bladeContact,true);
    assert.ok(f.requests>0&&f.tissue.removedVolumeMm3>0,'the lifted real anatomy must acquire an actual volumetric defect');
    assert.equal(f.tissue._cuts.length,1,'the complete curved blade remains one atomic union stroke');
    assert.ok(f.tissue._cuts[0].segments.length>1,'the real curved metal was preserved rather than replaced by an enlarged TCP sphere');
  }finally{assemblies.dispose();f.tissue.dispose();}
});

test('batched complete CAD contact reuses identical signed samples without changing any surface hit',()=>{
  const f=slabWorkbench();try{
    const segments=Array.from({length:10},(_,i)=>({a:new THREE.Vector3((i-5)/1024,7/1024,0),b:new THREE.Vector3((i-4)/1024,7/1024,0)}));
    const sample=f.tissue.sampleDistance.bind(f.tissue);let calls=0;f.tissue.sampleDistance=p=>{calls++;return sample(p);};
    const expected=segments.map(({a,b})=>f.tissue.contactSegment(a,b));const serial=calls;calls=0;
    assert.deepEqual(f.tissue.contactSegments(segments),expected);assert(calls<serial,'shared endpoints are evaluated once within the unchanged synchronous batch');
    f.tissue.setGrasp(new THREE.Vector3(0,0,0),new THREE.Vector3(.001,0,0));
    assert.deepEqual(f.tissue.contactSegments(segments),segments.map(({a,b})=>f.tissue.contactSegment(a,b)),'new batches never retain stale signed samples');
  }finally{f.tissue.dispose();}
});
