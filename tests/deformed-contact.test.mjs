import test from 'node:test';
import assert from 'node:assert/strict';
import {TissueVolume} from '../src/tissue.js';
import * as THREE from 'three';
import {createVolumeState,allChunkKeys,polygonizeChunk,applyCapsuleCut,resetVolume,deformPoint} from '../src/tissue-worker.js';
import {closestParentSurface} from '../src/tissue-contact.js';
import {Simulation} from '../src/simulation.js';
import {InteractionController} from '../src/interaction-controller.js';

function workbench(){
  const size=41,spacing=.0015,origin=-.03,radius=.024;
  const metadata={dims:[size,size,size],origin:[origin,origin,origin],spacing:[spacing,spacing,spacing]};
  const values=new Float32Array(size**3);
  for(let z=0;z<size;z++)for(let y=0;y<size;y++)for(let x=0;x<size;x++)values[x+size*(y+size*z)]=Math.hypot(origin+x*spacing,origin+y*spacing,origin+z*spacing)-radius;
  const source=createVolumeState(metadata,values,8),tissue=new TissueVolume();
  tissue.metadata=source.meta;tissue._baseField=source.base;tissue.ready=true;
  for(const key of allChunkKeys(source))tissue._replaceChunk(polygonizeChunk(source,key));
  tissue.setGrasp({model:'local-flow',local:[0,0,.024],displacement:[0,0,.039]});
  return {source,tissue};
}

test('compressed displayed liver remains reachable within the real 1 mm surface gap',()=>{
  const {tissue}=workbench();
  try{
    // This is 1 mm along the correctly transformed display normal. Its inverse
    // material SDF is >6 mm: treating that value as world distance rejected it.
    const point=[.004351650166885946,0,.061570211516439974];
    assert.ok(tissue.sampleDistance(point)>.006,'fixture must expose the reference-versus-display distance discrepancy');
    const surface=tissue.findParentSurfacePoint(point,.006);
    assert.ok(surface,'a grasper 1 mm outside the displayed organ must remain eligible');
    assert.ok(surface.distanceTo({x:point[0],y:point[1],z:point[2]})<.002);
    const distance=tissue.contactDistance(point,.0032);
    assert.ok(Number.isFinite(distance)&&distance>=0&&distance<.002,'right shear and scope gates use displayed metres');
    assert.ok(surface.normal.toArray().every(Number.isFinite));
  }finally{tissue.dispose();}
});

test('display contact keeps inside signs, rejects distant points and invalid coordinates',()=>{
  const {tissue}=workbench();
  try{
    const inside=[0,0,.0625],surface=[0,0,.063];
    assert.ok(tissue.contactDistance(inside,.005)<0,'a real interior point remains available to the cutter');
    assert.ok(Math.abs(tissue.contactDistance(surface,.005))<.0003);
    assert.ok(tissue.contactDistance([.08,0,.063],.006)>.006);
    assert.equal(tissue.findParentSurfacePoint([.08,0,.063],.006),null);
    for(const invalid of [[NaN,0,0],[Infinity,0,0]]){
      assert.equal(tissue.contactDistance(invalid,.006),Infinity);
      assert.equal(tissue.findParentSurfacePoint(invalid,.006),null);
    }
  }finally{tissue.dispose();}
});

test('cut and reset rebuild displayed contact without retaining cached mother-organ surfaces',()=>{
  const {source,tissue}=workbench(),point=[0,0,.063];
  try{
    assert.ok(tissue.findParentSurfacePoint(point,.0005),'populate the displayed-surface query cache');
    const result=applyCapsuleCut(source,{a:point,b:point,radius:.004,deformation:tissue._deformation});
    assert.ok(result.changedSamples>0);
    tissue._cuts=source.cuts;
    for(const key of result.dirty)tissue._replaceChunk(polygonizeChunk(source,key));
    assert.equal(tissue.findParentSurfacePoint(point,.0005),null,'the old intact surface must not survive as a contact ghost');
    assert.ok(tissue.contactDistance(point,.0005)>.0005);
    resetVolume(source);tissue._cuts=[];
    for(const key of allChunkKeys(source))tissue._replaceChunk(polygonizeChunk(source,key));
    assert.ok(tissue.findParentSurfacePoint(point,.0005),'reset restores the same complete surface and its contact');
  }finally{tissue.dispose();}
});

test('a cut recorded under traction retains displayed-distance contact after release',()=>{
  const {source,tissue}=workbench();
  try{
    const center=deformPoint([.003,0,.019],tissue._deformation);
    const result=applyCapsuleCut(source,{a:center,b:center,radius:.0024,deformation:tissue._deformation});
    assert.ok(result.changedSamples>0);
    tissue._cuts=source.cuts;
    for(const key of result.dirty)tissue._replaceChunk(polygonizeChunk(source,key));
    tissue.setGrasp(null);
    // In the relaxed organ this point is ~0.43 mm from the actual fresh cut
    // triangles, although its historical mapped-cutter level set reads 1.38 mm.
    const point=[.0031213196741634,.00006779598724840325,.01878353599250468],margin=.0012;
    assert.ok(tissue.sampleDistance(point)>margin,'history retains a non-metric mapped cutter even with no current traction');
    const rendered=closestParentSurface(tissue._meshes.values(),new THREE.Vector3(...point),margin);
    assert.ok(rendered&&rendered.distanceTo(new THREE.Vector3(...point))<.0008);
    const surface=tissue.findParentSurfacePoint(point,margin);
    assert.ok(surface,'release must not re-enable the raw-level-set distance gate');
    const distance=tissue.contactDistance(point,margin);
    assert.ok(Number.isFinite(distance)&&distance>0&&distance<.001);
  }finally{tissue.dispose();}
});

test('the right-shear interaction cuts nearby displayed tissue despite distant material-level-set endpoints',async()=>{
  const {source,tissue}=workbench(),sim=new Simulation();
  try{
    const point=[.004351650166885946,0,.061570211516439974],back=point.map((v,i)=>v-(i===1?.008:0));
    assert.ok(tissue.sampleDistance(point)>.0032&&tissue.sampleDistance(back)>.0032,'both old raw-distance gates must reject this real surface approach');
    tissue._enqueue=async command=>{
      assert.equal(command.type,'cut');
      let removed=0,changed=0;
      for(const cut of command.cuts){
        const result=applyCapsuleCut(source,cut);removed+=result.removedMm3;changed+=result.changedSamples;
        for(const key of result.dirty)tissue._replaceChunk(polygonizeChunk(source,key));
      }
      tissue.removedVolumeMm3=source.removedVolumeMm3;
      return {changed:changed>0,removedMm3:removed};
    };
    sim.state.tools.left.position=[0,0,.063];sim.state.tools.left.jaw=0;
    sim.state.tools.right.position=point;sim.state.tools.right.jaw=0;sim.setCutting(true);
    const interaction=new InteractionController(sim,tissue,{toolDirection:()=>new THREE.Vector3(0,1,0)});
    interaction.grasp={kind:'tissue',fragmentId:null,deformationModel:'local-flow',local:[0,0,.024],reference:[0,0,.024],displacement:[0,0,.039]};
    await interaction.update(1/60);
    assert.equal(interaction.contact.right,true);
    assert.equal(tissue._cuts.length,1,'the near displayed surface must pass the actual right-shear gate');
    assert.ok(tissue.removedVolumeMm3>0,'a passed gate must produce a real CSG defect');
  }finally{tissue.dispose();}
});
