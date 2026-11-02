import test from'node:test';import assert from'node:assert/strict';import{Group,Vector3}from'three';
import{Simulation}from'../src/simulation.js';import{GuidedDemo}from'../src/guided-demo.js';import{instrumentCapsules}from'../src/instrument-pose.js';import{scissorsAnchor}from'../src/scissors-kinematics.js';

test('an obstructed row withdrawal requests worker validation before attempting a local turn on the live arm',()=>{
 const sim=new Simulation();sim.setPaused(false);sim.setCutting(false);sim.setJaw('right',0);
 const tool=sim.state.tools.right,cap=instrumentCapsules(tool).find(c=>c.id==='wrist-wrist_pitch_link-4'),obstacle=new Vector3(...cap.a).lerp(new Vector3(...cap.b),.5),tissue={group:new Group(),sampleDistance:p=>p.distanceTo(obstacle)-.001},demo=new GuidedDemo(sim,tissue,{cuttingBusy:false,breakCutTrajectory(){}}),anchor=new Vector3(...scissorsAnchor(tool)),target=anchor.clone().add(new Vector3(.002,0,0));
 Object.assign(demo,{active:true,mode:'example',phase:'row-transfer',plan:{jawOpening:.2,traction:{section:{}}},wristPlanner:{},_rowRecovery:{index:0,target},_bladeSteering:{anchor,target,frames:0,resumeCutting:false}});
 let requested=0;demo._planBladeWristRoute=async()=>{requested++;};const before=sim.snapshot();demo._steerBlade(.05);
 assert.equal(requested,1,'a return obstruction must be checked off-thread before local correction');assert.deepEqual(sim.snapshot(),before,'both physical instruments remain still until the path is validated');
});

test('an uncertain padded overlap during withdrawal is deferred without recursively blocking or moving the live arm',()=>{
 const sim=new Simulation();sim.setPaused(false);sim.setCutting(false);sim.setJaw('right',0);const tool=sim.state.tools.right,cap=instrumentCapsules(tool).find(c=>c.part==='wrist'),centre=new Vector3(...cap.a).lerp(new Vector3(...cap.b),.5),demo=new GuidedDemo(sim,{group:new Group(),sampleDistance:p=>p.distanceTo(centre)-.001},{});
 Object.assign(demo,{phase:'row-transfer',plan:{traction:{section:{}}},wristPlanner:{}});let improving;
 const baseline=demo._currentBladeGuard(tool,{protectTarget:false}).bodyMinimum;
 for(let axis=0;axis<3;axis++)for(const sign of[-1,1]){const pose={position:tool.position.map((v,i)=>v+(i===axis?sign*.0002:0)),wrist:[...tool.wrist],jaw:0},candidate={...tool,...pose},value=demo._currentBladeGuard(candidate,{protectTarget:false}).bodyMinimum;if(value>baseline+1e-7&&value<0)improving=pose;}
 assert(improving);const before=sim.snapshot();assert.equal(demo._recordedBladeStep(sim,improving),false);assert.deepEqual(sim.snapshot(),before);
 demo._planningReplica=true;assert.equal(demo._recordedBladeStep(sim,improving),false,'an unresolved negative start is not a measurable penetration depth in the planning thread either');assert.deepEqual(sim.snapshot(),before);
});
