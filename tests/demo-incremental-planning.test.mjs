import test from 'node:test';
import assert from 'node:assert/strict';
import {Group,Vector3} from 'three';
import {Simulation} from '../src/simulation.js';
import {GuidedDemo} from '../src/guided-demo.js';
import {scissorsAnchor} from '../src/scissors-kinematics.js';
import {sourceInstrumentContact} from '../src/instrument-contact.js';

test('a feasible source-CAD wrist route is checked before exhausting the endpoint orientation grid',()=>{
 const sim=new Simulation(),demo=new GuidedDemo(sim,{group:new Group(),sampleDistance:()=>Infinity},{breakCutTrajectory(){}});
 const anchor=new Vector3(...scissorsAnchor(sim.state.tools.right)),target=anchor.clone().add(new Vector3(.003,0,0));
 Object.assign(demo,{active:true,mode:'example',plan:{jawOpening:.2},_bladeSteering:{anchor,target,resumeCutting:false}});
 let endpoints=0,firstRoute=true;const clearance=demo._bladeClearance.bind(demo),step=demo._recordedBladeStep.bind(demo);
 demo._bladeClearance=(...args)=>{endpoints++;return clearance(...args);};
 demo._recordedBladeStep=(...args)=>{if(firstRoute){firstRoute=false;assert(endpoints<100,`a clear route waited for ${endpoints} endpoint queries`);}return step(...args);};
 const initial=sim.snapshot(),iterator=demo._bladeWristRouteSteps(demo._bladeSteering,initial,{candidateBudget:8});let result,units=0;
 do{result=iterator.next();}while(!result.done&&++units<2000);
 assert(result.done&&result.value,'try a complete swept route as soon as a small set of feasible source-CAD endpoints is available');
 assert.deepEqual(sim.snapshot(),initial,'planning must leave the real arms stationary');
 demo._bladeSteering.route={...result.value,stage:'recorded'};
 for(let frame=0;demo._bladeSteering&&frame<2000;frame++){
  demo._followBladeWristRoute(1/60);
  assert(sourceInstrumentContact(sim.state.tools.left,sim.state.tools.right).clearance>=-1e-7);
 }
 assert(demo.active&&!demo._bladeSteering);assert(new Vector3(...scissorsAnchor(sim.state.tools.right)).distanceTo(target)<.00015);
});

test('an already exhausted endpoint grid is not searched twice when no pose is feasible',()=>{
 const sim=new Simulation(),demo=new GuidedDemo(sim,{group:new Group(),sampleDistance:()=>-.05},{}),anchor=new Vector3(...scissorsAnchor(sim.state.tools.right));
 demo.plan={jawOpening:.2};let queries=0;const clearance=demo._bladeClearance.bind(demo);demo._bladeClearance=(...args)=>{queries++;return clearance(...args);};
 const iterator=demo._bladeWristRouteSteps({anchor,target:anchor.clone().add(new Vector3(.003,0,0))},sim.snapshot(),{candidateBudget:8});let result;
 do{result=iterator.next();}while(!result.done);
 assert.equal(result.value,null);assert(queries<1500,`an unreachable pose repeated ${queries} endpoint queries`);
});


test('a liver section checks its recorded exit before enumerating in-place coupled turns in the narrow cut',()=>{
 const sim=new Simulation(),demo=new GuidedDemo(sim,{group:new Group(),sampleDistance:()=>Infinity},{breakCutTrajectory(){}}),anchor=new Vector3(...scissorsAnchor(sim.state.tools.right)),target=anchor.clone().add(new Vector3(.003,0,0)),before=sim.snapshot(),marker=new Error('recorded exit reached');
 demo.plan={jawOpening:.2,traction:{section:{}}};demo._bladeHistory=[{anchor:anchor.clone(),tool:structuredClone(sim.state.tools.right)},{anchor:anchor.clone(),tool:structuredClone(sim.state.tools.right)}];
 demo._recordedBladeStep=()=>false;
 demo._replayEscapeJournalSteps=function*(){assert.equal(this.wristGoalCandidates.search.coupled,0,'withdraw along the actual entry before retrying obstructed turns');throw marker;};
 const iterator=demo._bladeWristRouteSteps({anchor,target,resumeCutting:false},before,{candidateBudget:8});
 assert.throws(()=>{let r;do{r=iterator.next();}while(!r.done);},e=>e===marker);assert.deepEqual(sim.snapshot(),before);
});


test('failed hepatic exits retain the complete coupled-turn fallback before global configuration search',()=>{
 const sim=new Simulation(),demo=new GuidedDemo(sim,{group:new Group(),sampleDistance:()=>Infinity},{}),anchor=new Vector3(...scissorsAnchor(sim.state.tools.right)),marker=new Error('global fallback reached');demo.plan={jawOpening:.2,traction:{section:{}}};
 demo._recordedBladeStep=()=>false;demo._replayEscapeJournalSteps=function*(){return false;};demo._configurationRouteSteps=function*(_s,_snapshot,_c,search){assert(search.coupled>0,'preserve the original complete coupled-turn search after the historical exits fail');throw marker;};
 const iterator=demo._bladeWristRouteSteps({anchor,target:anchor.clone().add(new Vector3(.003,0,0))},sim.snapshot(),{candidateBudget:8});assert.throws(()=>{let r;do{r=iterator.next();}while(!r.done);},e=>e===marker);
});
