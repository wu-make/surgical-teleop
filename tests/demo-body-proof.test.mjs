import test from 'node:test';
import assert from 'node:assert/strict';
import {Mesh,PlaneGeometry} from 'three';
import {Simulation} from '../src/simulation.js';
import {TissueVolume} from '../src/tissue.js';
import {GuidedDemo} from '../src/guided-demo.js';
import {createBodyProof,queryBodyProof} from '../src/demo-body-proof.js';
import {resolveInstrumentAlignment,quaternionProduct} from '../src/instrument-pose.js';

function fixture(){
 const sim=new Simulation(),tissue=new TissueVolume(),geometry=new PlaneGeometry(.01,.01);geometry.computeBoundingBox();tissue._meshes.set('plane',new Mesh(geometry));
 const demo=new GuidedDemo(sim,tissue,{});demo.plan={traction:{section:{}}};
 const tool=structuredClone(sim.state.tools.right),guard=demo._currentBladeGuard(tool,{protectTarget:false}),poses=[{...tool,bodyGaps:[...guard.bodyGaps]}];
 return{sim,tissue,demo,tool,proof:createBodyProof(tissue,tool,poses)};
}

test('reusable body witnesses are conservative lower bounds of the same complete source-CAD triangle query',()=>{
 const f=fixture();try{
  for(let i=0;i<70;i++){
   const tool={...f.tool,position:f.tool.position.map((v,j)=>v+Math.sin(i+j)*.00005),wrist:f.tool.wrist.map((v,j)=>v+Math.sin(i*.7+j)*.0002)};tool.alignment=resolveInstrumentAlignment(tool,f.tool.alignment);
   const proof=queryBodyProof(f.tissue,f.proof,tool),exact=f.demo._currentBladeGuard(tool,{protectTarget:false});assert(proof);
   for(let j=0;j<exact.bodyGaps.length;j++)assert(proof.bodyGaps[j]<=exact.bodyGaps[j]+1e-9);
   assert(proof.bodyMinimum>0);
  }
 }finally{f.tissue.dispose();}
});

test('an unrelated axial transport frame cannot receive a zero-motion clearance certificate',()=>{
 const f=fixture();try{const tool={...f.tool,alignment:quaternionProduct(f.tool.alignment,[0,0,Math.sin(.5),Math.cos(.5)])};assert.equal(queryBodyProof(f.tissue,f.proof,tool),null);}finally{f.tissue.dispose();}
});

test('geometry, epoch, metadata, world transforms, pending geometry and instrument changes invalidate a witness',()=>{
 for(const mutate of [f=>f.tissue._contactRevision++,f=>f.tissue._epoch++,f=>f.tissue.metadata={},f=>f.tissue.group.position.x=.001,f=>f.tissue.busy=true,f=>f.tool.port[0]+=.001,f=>f.tool.instrument='needle-driver']){
  const f=fixture();try{mutate(f);assert.equal(queryBodyProof(f.tissue,f.proof,f.tool),null);}finally{f.tissue.dispose();}
 }
 const f=fixture();try{f.proof.poses[0].bodyGaps[0]=0;assert.equal(queryBodyProof(f.tissue,f.proof,f.tool),null);f.tissue.group.scale.x=2;assert.equal(createBodyProof(f.tissue,f.tool,f.proof.poses),null);}finally{f.tissue.dispose();}
});


test('a newly installed recorded route uses its initial witness before poseIndex is first advanced',()=>{
 const f=fixture();try{
  const start={...structuredClone(f.tool),bodyGaps:[...f.demo._currentBladeGuard(f.tool,{protectTarget:false}).bodyGaps]},far={...structuredClone(f.tool),position:f.tool.position.map((v,i)=>v+(i===0?.1:0))};far.bodyGaps=[...f.demo._currentBladeGuard(far,{protectTarget:false}).bodyGaps];
  const poses=[start,...Array.from({length:6},()=>structuredClone(far))];
  f.demo._bladeSteering={route:{validatedPoses:poses,bodyProof:createBodyProof(f.tissue,f.tool,poses)}};
  assert.equal(f.demo._currentBladeGuard(f.tool,{protectTarget:false}).witness,true,'an undefined replay cursor means the first sweep, never the end of the route');
 }finally{f.tissue.dispose();}
});
