import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {Simulation} from '../src/simulation.js';
import {TissueVolume} from '../src/tissue.js';
import {InteractionController} from '../src/interaction-controller.js';
import {createVolumeState,applyCapsuleCut,nodeIndex} from '../src/tissue-worker.js';
import {captureBladePose,bladeSpan,sampleBladeSpan,CUT_SWEEP} from '../src/blade-sweep.js';

function bench({plate=false,holdFirst=false}={}){
  const dims=plate?[81,81,9]:[17,81,17],spacing=[.0005,.0005,.0005],origin=plate?[-.02,-.02,-.002]:[-.004,-.02,-.004];
  const half=plate?[.018,.018,.0002]:[.00025,.017,.003],values=new Float32Array(dims[0]*dims[1]*dims[2]);
  for(let z=0;z<dims[2];z++)for(let y=0;y<dims[1];y++)for(let x=0;x<dims[0];x++){
    const q=[origin[0]+x*spacing[0],origin[1]+y*spacing[1],origin[2]+z*spacing[2]].map((v,i)=>Math.abs(v)-half[i]);
    values[x+dims[0]*(y+dims[1]*z)]=Math.hypot(...q.map(v=>Math.max(0,v)))+Math.min(0,Math.max(...q));
  }
  const volume=createVolumeState({dims,spacing,origin},values,8),tissue=new TissueVolume();
  tissue.metadata=volume.meta;tissue._baseField=volume.base;tissue.ready=true;
  const operations=[];let releaseFirst,first=true;
  const apply=operation=>{
    let removedMm3=0,changedSamples=0;
    for(const cut of operation.cuts){const r=applyCapsuleCut(volume,cut);removedMm3+=r.removedMm3;changedSamples+=r.changedSamples;}
    tissue.removedVolumeMm3=volume.removedVolumeMm3;
    return {changed:changedSamples>0,removedMm3,removedVolumeMm3:volume.removedVolumeMm3};
  };
  tissue._enqueue=operation=>{
    operations.push(structuredClone(operation));
    if(holdFirst&&first){first=false;tissue.busy=true;return new Promise(resolve=>{releaseFirst=()=>{const result=apply(operation);tissue.busy=false;resolve(result);};});}
    return Promise.resolve(apply(operation));
  };
  const sim=new Simulation();sim.state.tools.left.jaw=1;sim.state.tools.right.jaw=0;sim.setCutting(true);
  const point=new THREE.Vector3(.004,-.012,0),quaternion=new THREE.Quaternion();
  let localSegments=Array.from({length:12},(_,i)=>({a:new THREE.Vector3(-.008+i*.008/12,0,0),b:new THREE.Vector3(-.008+(i+1)*.008/12,0,0)}));
  const blade=()=>({source:'continuous-regression-blade',segments:localSegments.map(({a,b})=>({a:a.clone().applyQuaternion(quaternion).add(point),b:b.clone().applyQuaternion(quaternion).add(point)}))});
  const sync=()=>{sim.state.tools.right.position=point.toArray();};sync();
  const interaction=new InteractionController(sim,tissue,{toolBlade:blade,toolQuaternion:()=>quaternion});
  const at=(y,z=0)=>{point.y=y;point.z=z;sync();};
  return {volume,tissue,sim,point,quaternion,interaction,operations,at,sync,blade,
    get releaseFirst(){return releaseFirst;},setLocalSegments(segments){localSegments=segments;},
    field(point){const grid=point.map((v,i)=>Math.round((v-origin[i])/spacing[i]));return volume.field[nodeIndex(volume.meta,...grid)];}};
}

test('a busy worker preserves the entire 24 mm path as bounded complete-CAD passes',async()=>{
  const f=bench({holdFirst:true});
  try{
    const first=f.interaction.update(1/60);assert.equal(typeof f.releaseFirst,'function');
    f.at(.012);await f.interaction.update(1/60);
    assert.ok(f.interaction.metrics.pendingCutSamples>=24,'input arriving during meshing must remain recorded');
    f.releaseFirst();await first;
    assert.equal(f.interaction.cuttingBusy,false);assert.equal(f.interaction.metrics.pendingCutSamples,0);
    const samples=f.operations.flatMap(operation=>operation.cuts);
    assert.ok(samples.length>=25);
    for(const operation of f.operations)assert.ok(operation.cuts.reduce((n,cut)=>n+(cut.segments?.length??1),0)<=CUT_SWEEP.maxBatchSegments);
    for(let i=1;i<samples.length;i++)assert.ok(Math.abs(samples[i].a[1]-samples[i-1].a[1])<=CUT_SWEEP.spacing+1e-10);
    for(let i=-10;i<=10;i++)assert.ok(f.field([0,i*.001,0])>0,`a material bridge remained at y=${i} mm`);
  }finally{f.tissue.dispose();}
});

test('rotation follows the physical blade arc and removes its outer swept material',async()=>{
  const f=bench({plate:true,holdFirst:true});
  try{
    f.point.set(0,0,0);f.sync();f.setLocalSegments([{a:new THREE.Vector3(.005,0,0),b:new THREE.Vector3(.015,0,0)}]);
    const first=f.interaction.update(1/60);f.quaternion.setFromAxisAngle(new THREE.Vector3(0,0,1),Math.PI/2);await f.interaction.update(1/60);
    f.releaseFirst();await first;
    assert.ok(f.field([.0105,.0105,0])>0,'the 45-degree outer arc must be removed, not replaced by the inner endpoint chord');
    const cuts=f.operations.flatMap(op=>op.cuts),middle=cuts.find(cut=>Math.abs(cut.b[0]-cut.b[1])<.0008);
    assert.ok(middle);assert.ok(Math.abs(Math.hypot(middle.b[0],middle.b[1])-.015)<1e-9);
  }finally{f.tissue.dispose();}
});

test('material mapping is frozen per recorded sample while a held flap moves during worker delay',async()=>{
  const f=bench({holdFirst:true});
  try{
    f.at(0,.01);f.sim.state.tools.left.jaw=0;f.sim.state.tools.left.position=[0,0,.01];
    f.interaction.grasp={kind:'tissue',fragmentId:null,deformationModel:'local-flow',local:[0,0,0],reference:[0,0,0],displacement:[0,0,.01]};
    const first=f.interaction.update(1/60);
    f.sim.state.tools.left.position=[0,0,.02];await f.interaction.update(1/60);
    f.tissue.setGrasp({model:'local-flow',local:[0,0,0],displacement:[0,0,.03]});
    f.releaseFirst();await first;
    const cuts=f.operations.flatMap(op=>op.cuts),displacements=cuts.map(cut=>cut.deformation?.displacement[2]??0);
    assert.ok(Math.abs(displacements[0]-.01)<1e-10);assert.ok(Math.abs(displacements.at(-1)-.02)<1e-10);
    assert.ok(displacements.some(v=>v>.0105&&v<.0195),'intermediate moving-material frames must be preserved');
    assert.ok(displacements.every(v=>v<=.020000001),'the later live 30 mm pull must not rewrite queued material frames');
    for(let i=1;i<displacements.length;i++)assert.ok(displacements[i]-displacements[i-1]<=CUT_SWEEP.spacing+1e-10);
  }finally{f.tissue.dispose();}
});

test('B, opening, clutch, pause and reset break trajectories instead of cutting across the disabled gap',async()=>{
  for(const kind of ['B','open','clutch','pause','reset','discrete-B']){
    const f=bench();
    try{
      await f.interaction.update(1/60);f.at(.012);
      if(kind==='B'){f.sim.setCutting(false);await f.interaction.update(1/60);f.sim.setCutting(true);}
      if(kind==='open'){f.sim.state.tools.right.jaw=1;await f.interaction.update(1/60);f.sim.state.tools.right.jaw=0;}
      if(kind==='clutch')await f.interaction.update(1/60,{clutched:true});
      if(kind==='pause'){f.sim.setPaused(true);await f.interaction.update(1/60);f.sim.setPaused(false);}
      if(kind==='reset')f.interaction.reset();
      if(kind==='discrete-B'){f.interaction.breakCutTrajectory();f.sim.setCutting(false);f.sim.setCutting(true);}
      await f.interaction.update(1/60);
      assert.ok(f.field([0,0,0])<0,kind+' must not invent an enabled cutting path between the two poses');
      assert.ok(f.field([0,.012,0])>0,kind+' still permits a fresh legal cut after resuming');
    }finally{f.tissue.dispose();}
  }
});

test('disabling cutting drains only already recorded legal motion and never bridges the later disabled reposition',async()=>{
  const f=bench({holdFirst:true});
  try{
    const first=f.interaction.update(1/60);
    f.at(0);await f.interaction.update(1/60);
    f.interaction.breakCutTrajectory();f.sim.setCutting(false);f.at(.012);await f.interaction.update(1/60);
    f.releaseFirst();await first;
    assert.ok(f.field([0,-.006,0])>0&&f.field([0,0,0])>0,'a disabled mode must not discard legitimate earlier input');
    assert.ok(f.field([0,.006,0])<0,'the disabled relocation must not be converted into a hidden swept cut');
    f.sim.setCutting(true);await f.interaction.update(1/60);
    assert.ok(f.field([0,.012,0])>0);
    assert.ok(f.field([0,.006,0])<0,'re-arming starts a fresh stroke at the new pose');
  }finally{f.tissue.dispose();}
});

test('an oversized delayed path reports backpressure without allocating an unbounded queue or constraining the tool',async()=>{
  const f=bench({holdFirst:true});
  try{
    const first=f.interaction.update(1/60);f.at(20);await f.interaction.update(1/60);
    assert.equal(f.sim.state.tools.right.position[1],20,'cut buffering must not become a tool workspace fence');
    assert.equal(f.interaction.metrics.cutStatus,'blocked');
    assert.ok(f.interaction.metrics.pendingCutSamples<=CUT_SWEEP.maxPendingSamples+1);
    assert.ok(f.interaction.metrics.pendingCutFrames<=CUT_SWEEP.maxPendingFrames);
    f.releaseFirst();await first;await f.interaction.update(1/60);
    assert.equal(f.interaction.metrics.cutStatus,'blocked','dropped new paths remain explicit until re-armed');
    assert.ok(f.field([0,0,0])<0,'overflow must not invent a giant unsampled cut');
  }finally{f.tissue.dispose();}
});

test('sampled rigid blade endpoints stay on their rotation radius with submillimetre spacing',()=>{
  const q0=new THREE.Quaternion(),q1=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1),Math.PI/2),point=new THREE.Vector3();
  const shape={segments:[{a:new THREE.Vector3(.005,0,0),b:new THREE.Vector3(.015,0,0)}],source:'arc'};
  const a=captureBladePose(shape,point,q0,0,[0,0,0],null),b=captureBladePose({source:'arc',segments:shape.segments.map(s=>({a:s.a.clone().applyQuaternion(q1),b:s.b.clone().applyQuaternion(q1)}))},point,q1,0,[0,0,Math.PI/2],null),span=bladeSpan(a,b);
  let previous=a;
  for(let i=1;i<=span.steps;i++){
    const current=sampleBladeSpan(span,i);assert.ok(Math.abs(current.segments[0].b.length()-.015)<1e-12);
    assert.ok(current.segments[0].b.distanceTo(previous.segments[0].b)<=CUT_SWEEP.spacing+1e-12);previous=current;
  }
});

