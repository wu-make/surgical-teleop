import test from 'node:test';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {Simulation} from '../src/simulation.js';
import {GuidedDemo} from '../src/guided-demo.js';
import {instrumentCapsules,resolveInstrumentAlignment} from '../src/instrument-pose.js';
import {scissorsAnchor,scissorsTarget,scissorsBodyClearance,SCISSORS_GUIDE_CLEARANCE} from '../src/scissors-kinematics.js';
import {runImmediately} from '../src/cooperative-work.js';
import {sourceInstrumentContact} from '../src/instrument-contact.js';

test('an unproved initial wrist overlap retains the real blade point and requests validation instead of bending through tissue',()=>{
 const sim=new Simulation(),tool=sim.state.tools.right,cap=instrumentCapsules(tool).find(c=>c.id==='wrist-wrist_pitch_link-4'),obstacle=new THREE.Vector3(...cap.a).lerp(new THREE.Vector3(...cap.b),.5),tissue={group:new THREE.Group(),sampleDistance:p=>p.distanceTo(obstacle)-.001},demo=new GuidedDemo(sim,tissue,{breakCutTrajectory(){}}),target=new THREE.Vector3(...scissorsAnchor(tool));
 Object.assign(demo,{active:true,mode:'example',phase:'raster',plan:{traction:{radius:.03,section:{}}},wristPlanner:{}});sim.setCutting(true);assert.equal(demo._moveBlade(target.clone().add(new THREE.Vector3(.001,0,0))),false);const before=sim.snapshot();let planned=0;demo._planBladeWristRoute=async()=>{planned++;};demo._steerBlade(1/60);
 assert.equal(planned,1);assert.deepEqual(sim.snapshot(),before);assert(new THREE.Vector3(...scissorsAnchor(tool)).distanceTo(target)<1e-12);
});

test('an unresolved negative surface value cannot authorize a monotonic body escape',()=>{
  const sim=new Simulation(),tool=sim.state.tools.right,cap=instrumentCapsules(tool).find(c=>c.part==='wrist'),obstacle=new THREE.Vector3(...cap.a).lerp(new THREE.Vector3(...cap.b),.5),tissue={group:new THREE.Group(),sampleDistance:p=>p.distanceTo(obstacle)-.001},demo=new GuidedDemo(sim,tissue,{}),original={position:[...tool.position],wrist:[...tool.wrist],jaw:tool.jaw};
  sim.setPaused(false);let best=null;const before=demo._bladeClearance(tool,new THREE.Vector3(...scissorsAnchor(tool))).bodyMinimum;
  for(let axis=0;axis<3;axis++)for(const sign of [-1,1]){const candidate={...tool,position:tool.position.map((v,i)=>v+(axis===i?sign*.0002:0))};candidate.alignment=resolveInstrumentAlignment(candidate,tool.alignment);const clearance=demo._bladeClearance(candidate,new THREE.Vector3(...scissorsAnchor(candidate))).bodyMinimum;if(clearance>before+1e-5&&clearance<0&&(!best||clearance>best.clearance))best={pose:{position:candidate.position,wrist:candidate.wrist,jaw:candidate.jaw},clearance};}
  assert(best,'the fixture starts in a shallow pre-existing surface overlap');
  const saved=sim.snapshot();assert.equal(demo._recordedBladeStep(sim,best.pose),false);assert.deepEqual(sim.snapshot(),saved);demo._planningReplica=true;assert.equal(demo._recordedBladeStep(sim,best.pose),false);assert.deepEqual(sim.snapshot(),saved);
});

test('a safe pair of endpoints cannot hide a thin tissue bridge from the continuous pose validator',()=>{
  const sim=new Simulation(),tool=sim.state.tools.right;let fixture=null;
  search:for(let axis=0;axis<3;axis++)for(const sign of [-1,1]){
    const end={...tool,position:tool.position.map((v,i)=>v+(i===axis?sign*.0006:0))},mid={...tool,position:tool.position.map((v,i)=>(v+end.position[i])*.5)};end.alignment=resolveInstrumentAlignment(end,tool.alignment);mid.alignment=resolveInstrumentAlignment(mid,tool.alignment);
    for(const cap of instrumentCapsules(mid).filter(c=>c.part==='wrist')){const centre=new THREE.Vector3(...cap.a).lerp(new THREE.Vector3(...cap.b),.5),distance=p=>new THREE.Vector3(...p).distanceTo(centre)-.00004;if(scissorsBodyClearance(tool,scissorsAnchor(tool),distance).minimum>.00005&&scissorsBodyClearance(end,scissorsAnchor(end),distance).minimum>.00005){fixture={end,centre};break search;}}
  }
  assert(fixture);const tissue={group:new THREE.Group(),sampleDistance:p=>p.distanceTo(fixture.centre)-.00004},demo=new GuidedDemo(sim,tissue,{}),before=sim.snapshot();
  assert.equal(demo._recordedBladeStep(sim,{position:fixture.end.position,wrist:tool.wrist,jaw:tool.jaw}),false);assert.deepEqual(sim.snapshot(),before,'a rejected bridge crossing cannot move the live instrument');
});

test('the operative closed-blade frame keeps the wrist fixed throughout jaw opening and closure',()=>{
  const sim=new Simulation(),tissue={group:new THREE.Group(),sampleDistance:()=>Infinity},demo=new GuidedDemo(sim,tissue,{breakCutTrajectory(){}}),tool=sim.state.tools.right;
  Object.assign(demo,{active:true,mode:'example',plan:{traction:{radius:.05},anchorJaw:0}});const target=new THREE.Vector3(...demo._anchor(tool)),position=[...tool.position];
  for(const jaw of [0,.1,.3,.45,0]){sim.setJaw('right',jaw);assert(demo._moveBlade(target));assert(Math.hypot(...tool.position.map((v,i)=>v-position[i]))<1e-10);assert.deepEqual(demo._anchor(tool),target.toArray());}
  sim.setJaw('right',.45);assert(new THREE.Vector3(...scissorsAnchor(tool)).distanceTo(target)>.0001,'the real curved tips retain their natural opening movement');
});

test('a coupled wrist route is probed without moving live arms and executes with real CAD and tissue clearance',()=>{
  const sim=new Simulation(),tool=sim.state.tools.right,cap=instrumentCapsules(tool).find(c=>c.id==='wrist-wrist_pitch_link-4'),anchor=new THREE.Vector3(...scissorsAnchor(tool));
  const obstacle=new THREE.Vector3(...cap.a).lerp(new THREE.Vector3(...cap.b),.5).add(new THREE.Vector3(.002,0,0)),tissue={group:new THREE.Group(),sampleDistance:p=>p.distanceTo(obstacle)-.0015};
  const demo=new GuidedDemo(sim,tissue,{breakCutTrajectory(){}}),target=anchor.clone().add(new THREE.Vector3(.003,0,0));
  Object.assign(demo,{active:true,mode:'example',plan:{jawOpening:.45},_bladeSteering:{anchor,target,resumeCutting:true}});
  const before=sim.snapshot(),route=runImmediately(demo._bladeWristRouteSteps(demo._bladeSteering,before));assert.deepEqual(sim.snapshot(),before);assert(route);
  demo._bladeSteering.route={...route,stage:route.retreat?'withdraw':'orient'};sim.setCutting(false);
  for(let i=0;i<1600&&demo.active&&demo._bladeSteering;i++){
    demo._followBladeWristRoute(1/60);
    assert(scissorsBodyClearance(tool,scissorsAnchor(tool),p=>tissue.sampleDistance(new THREE.Vector3(...p))).minimum>=0);
  }
  assert(demo.active);assert.equal(demo._bladeSteering,null);assert.deepEqual(sim.state.tools.left,before.state.tools.left);
  assert(new THREE.Vector3(...scissorsAnchor(tool)).distanceTo(target)<.00015);
});

test('a clear destination cannot hide an intervening narrow tissue edge from the real wrist sweep',()=>{
  const sim=new Simulation(),tool=sim.state.tools.right,start=new THREE.Vector3(...scissorsAnchor(tool)),target=start.clone().add(new THREE.Vector3(.006,0,0)),mid=start.clone().lerp(target,.5);
  const preview={...tool,position:scissorsTarget(tool,mid.toArray()).position};preview.alignment=resolveInstrumentAlignment(preview,tool.alignment);
  const cap=instrumentCapsules(preview).find(c=>c.id==='wrist-wrist_pitch_link-4'),obstacle=new THREE.Vector3(...cap.a).lerp(new THREE.Vector3(...cap.b),.5),tissue={group:new THREE.Group(),sampleDistance:p=>p.distanceTo(obstacle)-.0004};
  const distance=p=>tissue.sampleDistance(new THREE.Vector3(...p));
  assert(scissorsBodyClearance(tool,start.toArray(),distance).minimum>SCISSORS_GUIDE_CLEARANCE);
  assert(scissorsBodyClearance(tool,target.toArray(),distance).minimum>SCISSORS_GUIDE_CLEARANCE);
  const demo=new GuidedDemo(sim,tissue,{breakCutTrajectory(){}}),left=structuredClone(sim.state.tools.left);Object.assign(demo,{active:true,mode:'example',plan:{traction:{radius:.03}}});sim.setCutting(true);
  assert.equal(demo._moveBlade(target),false);assert(demo.active&&demo._bladeSteering);assert.equal(sim.state.cutting,false);
  assert(scissorsBodyClearance(tool,scissorsAnchor(tool),distance).minimum>=SCISSORS_GUIDE_CLEARANCE,'stop before the wrist enters the intervening edge');
  assert(new THREE.Vector3(...scissorsAnchor(tool)).distanceTo(start)<.003);assert.deepEqual(sim.state.tools.left,left);
});

test('the recorded left-clamp obstruction finds a free source-CAD goal before wasting turns at colliding goals',()=>{
  const fixture=JSON.parse(fs.readFileSync(new URL('./fixtures/demo-collision-pose.json',import.meta.url))),sim=new Simulation();sim.restore(fixture.state);sim.setPaused(false);
  const tissue={group:new THREE.Group(),sampleDistance:()=>Infinity},demo=new GuidedDemo(sim,tissue,{breakCutTrajectory(){}}),target=new THREE.Vector3(...fixture.steering.target),anchor=new THREE.Vector3(...fixture.steering.anchor);
  Object.assign(demo,{active:true,mode:'example',plan:{jawOpening:.45},_bladeSteering:{target,anchor,resumeCutting:true}});
  const iterator=demo._bladeWristRouteSteps(demo._bladeSteering,sim.snapshot());let r,units=0;do{r=iterator.next();}while(!r.done&&++units<30000);
  assert(r.done&&r.value,'the real recorded obstruction needs a feasible route within the bounded regression run');
  demo._bladeSteering.route={...r.value,stage:r.value.retreat?'withdraw':'orient'};
  for(let i=0;i<2000&&demo.active&&demo._bladeSteering;i++){demo._followBladeWristRoute(1/60);assert(sourceInstrumentContact(sim.state.tools.left,sim.state.tools.right).clearance>=-1e-7);}
  assert(demo.active&&!demo._bladeSteering);assert(new THREE.Vector3(...scissorsAnchor(sim.state.tools.right)).distanceTo(target)<.00015);
});

test('automatic advancement plans before committing a clipped metal contact',()=>{
  const sim=new Simulation(),tissue={group:new THREE.Group(),sampleDistance:()=>Infinity},demo=new GuidedDemo(sim,tissue,{breakCutTrajectory(){}});
  Object.assign(demo,{active:true,mode:'example',plan:{traction:{radius:.03}}});sim.setCutting(true);
  const target=new THREE.Vector3(...sim.state.tools.left.position);
  assert.equal(demo._moveBlade(target),false);assert(demo.active&&demo._bladeSteering);assert.equal(sim.state.cutting,false);
  assert(sourceInstrumentContact(sim.state.tools.left,sim.state.tools.right).clearance>1e-7,'keep space to withdraw rather than stopping at exact metal contact');
});
