import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import * as THREE from 'three';
import {GLTFLoader}from'three/addons/loaders/GLTFLoader.js';import{createDemoContextGuard}from'../src/demo-context-guard.js';import{loadBodyTriangleGeometry}from'../src/scissors-body-catalogue.js';import{instrumentCapsules}from'../src/instrument-pose.js';import{Simulation}from'../src/simulation.js';import{GuidedDemo}from'../src/guided-demo.js';
const fixture=JSON.parse(fs.readFileSync(new URL('./fixtures/demo-context-collision.json',import.meta.url)));
test('the full unchanged neighboring anatomy rejects the old stomach intersection and clears the revised wrist',async()=>{
 await loadBodyTriangleGeometry();const b=fs.readFileSync(new URL('../public/assets/hepatobiliary-context.glb',import.meta.url)),g=await new GLTFLoader().parseAsync(b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength),'');g.scene.rotation.x=-Math.PI/2;g.scene.position.set(0,1.035,0);
 let faces=0;const source=[];g.scene.traverse(o=>{if(o.isMesh){faces+=o.geometry.index.count/3;source.push([o.geometry,o.geometry.attributes.position.array.slice()]);}});
 const guard=createDemoContextGuard(g.scene);try{assert.equal(guard.triangleCount,faces);assert(faces>1000);assert(guard.clearance(fixture.blocked)<0,'the original roll/shaft genuinely intersected the stomach');assert(guard.clearance(fixture.clear)>.0002,'the revised wrist is clear of every neighboring organ');assert(guard.sweep(fixture.clear,fixture.clear));}finally{guard.dispose();}
 for(const [geometry,original]of source)assert.deepEqual(geometry.attributes.position.array,original,'contact copies must never rescale or edit source anatomy');
});
test('neighboring anatomy checks the continuous sweep, not just two free endpoints',async()=>{
 await loadBodyTriangleGeometry();const root=new THREE.Group(),tool=fixture.clear,shaft=instrumentCapsules(tool).find(c=>c.part==='shaft'),mesh=new THREE.Mesh(new THREE.BoxGeometry(.001,.008,.008));mesh.position.fromArray(shaft.b);root.add(mesh);const guard=createDemoContextGuard(root);
 const shifted=x=>({...structuredClone(tool),port:tool.port.map((v,i)=>v+(i===0?x:0)),position:tool.position.map((v,i)=>v+(i===0?x:0))}),from=shifted(-.03),to=shifted(.03);
 try{assert(guard.clearance(from)>0);assert(guard.clearance(to)>0);assert.equal(guard.sweep(from,to),false,'a free endpoint cannot jump through a thin intervening organ');}finally{guard.dispose();mesh.geometry.dispose();mesh.material.dispose();}
});
test('context rejection preserves the actual right pose for direct and recorded automatic movement',()=>{
 const sim=new Simulation(),before=sim.snapshot(),demo=new GuidedDemo(sim,{}, {breakCutTrajectory(){}},{contextGuard:{clearance:()=>-1,sweep:()=>false}});demo.active=true;const tool=sim.state.tools.right,target=tool.position.map((v,i)=>v+(i===0?.001:0));
 assert.equal(demo.move(target,'right'),false);assert.deepEqual(sim.state.tools,before.state.tools);
 assert.equal(demo._recordedBladeStep(sim,{position:target,wrist:[...tool.wrist],jaw:tool.jaw}),false);assert.deepEqual(sim.state.tools,before.state.tools);
});
