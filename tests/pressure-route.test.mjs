import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {Simulation} from '../src/simulation.js';
import {GuidedDemo} from '../src/guided-demo.js';

function setup(){
  const sim=new Simulation(),group=new THREE.Group();group.updateMatrixWorld(true);
  const blocked={key:'blocked',display:new THREE.Vector3(...sim.state.tools.left.position),cut:true,injured:true,clot:0};
  const accessible={...blocked,key:'accessible',display:new THREE.Vector3(...sim.state.tools.right.position).add(new THREE.Vector3(.08,0,0))};
  const tissue={group,blood:{nodes:[blocked,accessible]},_epoch:1};
  const interaction={snapshot:()=>({}),pressureApproachTarget:source=>source.display.clone()};
  return {sim,tissue,interaction,demo:new GuidedDemo(sim,tissue,interaction)};
}

test('pressure approach skips a nearer blocked cut face without moving the left instrument',async()=>{
  const {sim,demo,tissue}=setup(),left=structuredClone(sim.state.tools.left);
  const probe=new Simulation();probe.restore(sim.snapshot());probe.setJaw('right',0);
  assert(probe.moveToolTo(tissue.blood.nodes[0].display.toArray(),'right').limited,'the nearest source must really be blocked by the other CAD instrument');
  assert(await demo.approachBleedingAsync({yieldFrame:()=>Promise.resolve()}));
  assert.equal(demo._bleedingKey,'accessible');assert.deepEqual(sim.state.tools.left,left);
  for(let i=0;i<80;i++)demo.update(1/60);
  assert.equal(demo.active,false);assert(new THREE.Vector3(...sim.state.tools.right.position).distanceTo(tissue.blood.nodes[1].display)<1e-9);
  assert.deepEqual(sim.state.tools.left,left);assert.equal(sim.state.cutting,false);
});

test('cooperative pressure routing cancels when a user moves an instrument',async()=>{
  const {sim,demo}=setup();let yields=0;
  const accepted=await demo.approachBleedingAsync({yieldFrame:async()=>{if(++yields===1)sim.nudge('x',1,.001,'left');}});
  assert.equal(accepted,false);assert.equal(demo.active,false);assert.notEqual(sim.state.tools.left.position[0],-.025);
});

test('pressure navigation follows its preflight endpoint before fine alignment instead of bending the swept path',async()=>{
  const {sim,demo,tissue,interaction}=setup(),start=sim.state.tools.right.position[0],left=structuredClone(sim.state.tools.left);
  interaction.pressureApproachTarget=source=>source.display.clone().add(new THREE.Vector3(.004*(sim.state.tools.right.position[0]-start)/.08,0,0));
  assert(await demo.approachBleedingAsync({yieldFrame:()=>Promise.resolve()}));const checked=demo.end.clone();
  for(let i=0;i<66;i++){demo.update(1/60);assert.deepEqual(demo.end,checked,'the long movement must keep its collision-checked endpoint');}
  for(let i=0;i<100&&demo.active;i++)demo.update(1/60);
  assert.equal(demo.active,false);assert.equal(sim.state.collision.active,false);assert.deepEqual(sim.state.tools.left,left);
  const target=interaction.pressureApproachTarget(tissue.blood.nodes.find(n=>n.key===demo._bleedingKey));assert(new THREE.Vector3(...sim.state.tools.right.position).distanceTo(target)<=.0003);
});
