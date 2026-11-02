import test from'node:test';import assert from'node:assert/strict';import*as THREE from'three';import{Simulation}from'../src/simulation.js';import{GuidedDemo}from'../src/guided-demo.js';import{scissorsAnchor}from'../src/scissors-kinematics.js';import{sourceInstrumentContact}from'../src/instrument-contact.js';
test('coordinated pose replay cannot tunnel through the other real instrument',()=>{
 const sim=new Simulation(),result=sim.moveToolPose({position:[-.10,1.108,-.015],wrist:[.25,-.2,.1],jaw:.4},'right');
 assert(result.limited);assert(sourceInstrumentContact(sim.state.tools.left,sim.state.tools.right).clearance>=-1e-7);
 assert(new THREE.Vector3(...sim.state.tools.right.position).distanceTo(new THREE.Vector3(-.10,1.108,-.015))>.0001);
});
test('a complete recorded entry can be reversed with bounded position, wrist and jaw speeds through the same controller',()=>{
 const sim=new Simulation(),tissue={group:new THREE.Group(),sampleDistance:()=>.005},demo=new GuidedDemo(sim,tissue,{breakCutTrajectory(){}});sim.moveToolTo([-.14,1.08,.01],'left');
 Object.assign(demo,{active:true,mode:'example',plan:{traction:{radius:.03},jawOpening:.45}});demo._rememberBlade();const initial=structuredClone(sim.state.tools.right);
 for(let i=0;i<8;i++){const p=sim.state.tools.right.position.map((v,a)=>v+(a===0?.001:0));assert(!sim.moveToolPose({position:p},'right').limited);demo._rememberBlade();}
 for(let i=0;i<6;i++){sim.adjustWrist(0,.02,'right');demo._rememberBlade();sim.setJaw('right',.6-i*.05);demo._rememberBlade();}
 const journal=demo._bladeHistory.slice(0,-1).reverse().map(p=>p.tool),rest=new THREE.Vector3(...scissorsAnchor(initial));demo._bladeSteering={anchor:new THREE.Vector3(...scissorsAnchor(sim.state.tools.right)),target:rest,resumeCutting:true,route:{stage:'rollback',journal,rest,wrist:initial.wrist,retreat:.008}};
 for(let i=0;i<300&&demo.active&&demo._bladeSteering;i++){const before=structuredClone(sim.state.tools.right);demo._followBladeWristRoute(1/60);const now=sim.state.tools.right;assert(new THREE.Vector3(...now.position).distanceTo(new THREE.Vector3(...before.position))<=.04/60+1e-6);assert(now.wrist.every((v,a)=>Math.abs(v-before.wrist[a])<=.8/60+1e-6));assert(Math.abs(now.jaw-before.jaw)<=1.5/60+1e-6);assert(sourceInstrumentContact(sim.state.tools.left,now).clearance>=-1e-7);}
 assert(demo.active&&!demo._bladeSteering);assert(new THREE.Vector3(...scissorsAnchor(sim.state.tools.right)).distanceTo(rest)<.00015);assert.deepEqual(sim.state.tools.right.wrist,initial.wrist);assert.equal(sim.state.tools.right.jaw,initial.jaw);
});
