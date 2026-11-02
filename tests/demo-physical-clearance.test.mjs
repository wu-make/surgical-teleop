import test from 'node:test';import assert from 'node:assert/strict';
import{Group,Mesh,PlaneGeometry}from'three';import{Simulation}from'../src/simulation.js';import{instrumentCapsules}from'../src/instrument-pose.js';import{GuidedDemo}from'../src/guided-demo.js';
test('a genuine half-millimetre air gap remains clear without a second artificial one-millimetre work boundary',()=>{
 const sim=new Simulation(),tool=sim.state.tools.right,cap=instrumentCapsules(tool).filter(c=>c.part!=='jaw'),maximum=Math.max(...cap.flatMap(c=>[c.a[0]+c.radius,c.b[0]+c.radius])),geometry=new PlaneGeometry(4,4);geometry.rotateY(Math.PI/2);geometry.computeBoundingBox();
 const tissue={group:new Group(),_meshes:new Map([['plane',new Mesh(geometry)]]),_contactRevision:1},demo=new GuidedDemo(sim,tissue,{});demo.plan={traction:{section:{center:[0,0]}}};let coordinate=0,lo=maximum-.03,hi=maximum+.01,result;
 try{for(let i=0;i<28;i++){const x=(lo+hi)/2;geometry.translate(x-coordinate,0,0);coordinate=x;geometry.computeBoundingBox();tissue._contactRevision++;result=demo._currentBladeGuard(tool);if(result.bodyMinimum<.0005)lo=x;else hi=x;}assert(Math.abs(result.bodyMinimum-.0005)<1e-7,JSON.stringify({distance:result.bodyMinimum,lo,hi,maximum}));assert(result.minimum>0,'a physically clear real CAD envelope cannot be rejected by an extra planning boundary');}finally{geometry.dispose();}
});
