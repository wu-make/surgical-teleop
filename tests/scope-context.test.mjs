import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {Simulation} from '../src/simulation.js';
import {makeScopeContext} from '../src/scope-context.js';

const near=(a,b,epsilon=1e-10)=>assert.ok(Math.abs(a-b)<=epsilon,`${a} != ${b}`);
const nearVector=(a,b)=>a.forEach((v,i)=>near(v,b[i]));

function fixture(){
  const sim=new Simulation(),group=new THREE.Group(),records=new Map(),queries=[];
  group.position.set(0,1.03,0);group.rotation.x=-Math.PI/2;
  const tissue={group,ready:true,_epoch:0,metadata:{bounds:[[-.1,-.08,-.06],[.1,.08,.06]]},
    graspMetrics:{displacement:[0,0,0]},fragmentMetrics:{pieces:[]},getFragment:id=>records.get(id),
    findParentSurfacePoint:(p,margin)=>{queries.push({point:p.clone(),margin});return new THREE.Vector3(p.x,p.y,.05);},
    findGraspPoint:()=>{throw new Error('A generic query could select the specimen.');},
  };
  const interaction={grasp:null};
  const addPiece=(id,held=false)=>{
    const mesh=new THREE.Mesh(new THREE.BoxGeometry(.01,.02,.03));mesh.position.set(.3,.2,.1);group.add(mesh);
    const record={id,held,mesh};records.set(id,record);tissue.fragmentMetrics.pieces.push({id,held,position:mesh.position.toArray()});return record;
  };
  return {sim,tissue,interaction,queries,addPiece};
}

test('mother-only queries are cached for 150 ms while intent and grasp state stay current',()=>{
  const {sim,tissue,interaction,queries}=fixture();
  const first=makeScopeContext(sim,tissue,interaction,1000);assert.equal(queries.length,1);
  interaction.grasp={kind:'tissue'};sim.select('right');
  const cached=makeScopeContext(sim,tissue,interaction,1149);assert.equal(queries.length,1);
  assert.equal(cached.operating,true);nearVector(cached.graspTarget,sim.state.tools.left.position);
  nearVector(first.surfaceTarget,cached.surfaceTarget);
  sim.setScopeFollow(true,'grasp');makeScopeContext(sim,tissue,interaction,1150);assert.equal(queries.length,2);
  const midpoint=sim.state.tools.left.position.map((v,i)=>(v+sim.state.tools.right.position[i])/2);
  const expected=tissue.group.worldToLocal(new THREE.Vector3(...midpoint));
  const box=new THREE.Box3(new THREE.Vector3(...tissue.metadata.bounds[0]),new THREE.Vector3(...tissue.metadata.bounds[1]));box.clampPoint(expected,expected);
  nearVector(queries[1].point.toArray(),expected.toArray());
  sim.setCutting(false);sim.select('left');makeScopeContext(sim,tissue,interaction,1300);
  const active=tissue.group.worldToLocal(new THREE.Vector3(...sim.state.tools.left.position));box.clampPoint(active,active);
  nearVector(queries[2].point.toArray(),active.toArray());
});

test('world mother bounds transform rotation and scale, expanding only by actual traction',()=>{
  const {sim,tissue,interaction,addPiece}=fixture();
  tissue.group.scale.set(1.2,.8,1.5);tissue.graspMetrics.displacement=[.02,-.01,.03];
  addPiece('far').mesh.position.set(300,-200,100);
  const context=makeScopeContext(sim,tissue,interaction,0);
  const box=new THREE.Box3(new THREE.Vector3(-.1,-.09,-.06),new THREE.Vector3(.12,.08,.09)).applyMatrix4(tissue.group.matrixWorld);
  nearVector(context.organBounds.min,box.min.toArray());nearVector(context.organBounds.max,box.max.toArray());
  assert.ok(context.organBounds.max[0]<1,'a detached mesh never enlarges mother bounds');
  assert.ok(context.heldSpecimen.position[0]>100,'the explicit specimen context still follows the true mesh');
});

test('far intent is clamped for parent query and a failed query retains the last anatomical anchor',()=>{
  const {sim,tissue,interaction,queries}=fixture();
  const first=makeScopeContext(sim,tissue,interaction,0);
  sim.state.tools.left.position=[3,4,5];
  tissue.findParentSurfacePoint=(query)=>{queries.push({point:query.clone()});return null;};
  const failed=makeScopeContext(sim,tissue,interaction,150);
  nearVector(failed.surfaceTarget,first.surfaceTarget);
  const q=queries.at(-1).point.toArray();
  assert.ok(q.every((v,i)=>v>=tissue.metadata.bounds[0][i]&&v<=tissue.metadata.bounds[1][i]));
  tissue.group.position.x+=.1;
  const moved=makeScopeContext(sim,tissue,interaction,151);near(moved.surfaceTarget[0],first.surfaceTarget[0]+.1);
  failed.surfaceTarget[0]=100;assert.notEqual(makeScopeContext(sim,tissue,interaction,152).surfaceTarget[0],100);
});

test('specimen context uses the actual transformed geometry sphere and prefers the held piece',()=>{
  const {sim,tissue,interaction,addPiece}=fixture(),a=addPiece('a'),b=addPiece('b',true);
  b.mesh.scale.set(2,3,1);b.mesh.rotation.set(.5,.8,.3);
  let context=makeScopeContext(sim,tissue,interaction,0);
  assert.equal(context.heldSpecimen.id,'b');
  b.mesh.geometry.computeBoundingSphere();b.mesh.updateWorldMatrix(true,false);
  const expected=b.mesh.geometry.boundingSphere.clone().applyMatrix4(b.mesh.matrixWorld);
  nearVector(context.heldSpecimen.position,expected.center.toArray());near(context.heldSpecimen.radius,expected.radius);
  interaction.grasp={kind:'fragment',fragmentId:'a'};context=makeScopeContext(sim,tissue,interaction,1);assert.equal(context.heldSpecimen.id,'a');
  interaction.grasp=null;tissue.fragmentMetrics.pieces.forEach(p=>p.held=false);
  context=makeScopeContext(sim,tissue,interaction,2);assert.equal(context.heldSpecimen.id,'a','retain the last viewed piece after release');
  tissue.fragmentMetrics.pieces=[];assert.equal(makeScopeContext(sim,tissue,interaction,3).heldSpecimen,null);
});

test('cache invalidates on history epoch and clock reset; absent anatomy returns honest null context',()=>{
  const {sim,tissue,interaction,queries}=fixture();
  makeScopeContext(sim,tissue,interaction,1000);tissue._epoch++;makeScopeContext(sim,tissue,interaction,1001);
  assert.equal(queries.length,2);makeScopeContext(sim,tissue,interaction,0);assert.equal(queries.length,3);
  const empty=new THREE.Group(),context=makeScopeContext(sim,{group:empty},interaction,0);
  assert.equal(context.surfaceTarget,null);assert.equal(context.organBounds,null);assert.equal(context.heldSpecimen,null);
  assert.throws(()=>makeScopeContext(sim,tissue,interaction,NaN),TypeError);
});

test('history epochs reseed the restored field anchor before a failed surface query',()=>{
  const {sim,tissue,interaction,queries}=fixture();
  const previous=makeScopeContext(sim,tissue,interaction,1000);
  sim.setScopeContext(previous);
  const restored=[-.06,1.09,.03];
  sim.state.scope.fieldAnchor=[...restored];sim.state.scope.surfaceTarget=[...restored];
  tissue._epoch++;
  tissue.findParentSurfacePoint=query=>{queries.push({point:query.clone()});return null;};
  const context=makeScopeContext(sim,tissue,interaction,1001);
  nearVector(context.surfaceTarget,restored);
  assert.notDeepEqual(context.surfaceTarget,previous.surfaceTarget);
  nearVector(makeScopeContext(sim,tissue,interaction,1151).surfaceTarget,restored);
  sim.state.scope.fieldAnchor=null;sim.state.scope.surfaceTarget=null;tissue._epoch++;
  assert.equal(makeScopeContext(sim,tissue,interaction,1152).surfaceTarget,null,'an empty reset anchor clears the old cache');
});

test('same-epoch simulation restore replaces cached field and last-viewed specimen identity',()=>{
  const {sim,tissue,interaction,addPiece}=fixture();
  addPiece('a');addPiece('b');
  interaction.grasp={kind:'fragment',fragmentId:'a'};
  sim.setScopeContext(makeScopeContext(sim,tissue,interaction,0));
  interaction.grasp=null;
  const restored=sim.snapshot();
  restored.state.scope.fieldAnchor=[-.06,1.10,.02];
  restored.state.scope.surfaceTarget=[-.06,1.10,.02];
  interaction.grasp={kind:'fragment',fragmentId:'b'};
  sim.setScopeContext(makeScopeContext(sim,tissue,interaction,1));
  assert.equal(sim.state.scope.heldSpecimen.id,'b');
  interaction.grasp=null;
  sim.restore(restored);
  tissue.findParentSurfacePoint=()=>null;
  const context=makeScopeContext(sim,tissue,interaction,2);
  assert.equal(context.heldSpecimen.id,'a','released specimens respect the restored viewing identity');
  nearVector(context.surfaceTarget,restored.state.scope.fieldAnchor);
  const epochRestored=sim.snapshot();epochRestored.state.scope.heldSpecimen={...epochRestored.state.scope.heldSpecimen,id:'b'};
  sim.restore(epochRestored);tissue._epoch++;
  assert.equal(makeScopeContext(sim,tissue,interaction,3).heldSpecimen.id,'b','a composite tissue restore uses its own specimen identity');
  interaction.grasp={kind:'fragment',fragmentId:'a'};makeScopeContext(sim,tissue,interaction,4);interaction.grasp=null;
  sim.reset();
  assert.equal(makeScopeContext(sim,tissue,interaction,5).surfaceTarget,null);
  assert.equal(makeScopeContext(sim,tissue,interaction,5).heldSpecimen.id,'b','without a retained ID the documented last available specimen is selected');
});
