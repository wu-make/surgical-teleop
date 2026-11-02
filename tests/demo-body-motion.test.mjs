import test from 'node:test';
import assert from 'node:assert/strict';
import {Group} from 'three';
import {Simulation} from '../src/simulation.js';
import {GuidedDemo} from '../src/guided-demo.js';
import {instrumentCapsules} from '../src/instrument-pose.js';
import {instrumentMotionBound} from '../src/instrument-contact.js';

test('jaw-only motion retains every source shaft/wrist capsule and has zero body sweep while its blades still sweep',()=>{
 const tool=new Simulation().state.tools.right,a={...tool,jaw:0},b={...tool,jaw:1};
 assert.deepEqual(instrumentCapsules(a).filter(c=>c.part!=='jaw'),instrumentCapsules(b).filter(c=>c.part!=='jaw'));
 assert(instrumentMotionBound(a,b)>0.01);assert(instrumentMotionBound(a,b,{bodyOnly:true})<2e-12);
});

test('a non-metric reference-field air value cannot erase the recorded source-CAD escape entry',()=>{
 const sim=new Simulation(),tissue={group:new Group(),sampleDistance:()=>Infinity},demo=new GuidedDemo(sim,tissue,{});demo._bladeHistory=[];demo._rememberBlade();const first=structuredClone(demo._bladeHistory[0].tool);
 assert.equal(sim.moveToolTo(sim.state.tools.right.position.map((v,i)=>v+(i===0?.002:0)),'right').limited,false);sim.state.collision.clearance=.1;demo._rememberBlade();
 assert.equal(demo._bladeHistory.length,2);assert.deepEqual(demo._bladeHistory[0].tool,first);
});
