import test from 'node:test';
import assert from 'node:assert/strict';
import {Group,Vector3} from 'three';
import {Simulation} from '../src/simulation.js';
import {GuidedDemo} from '../src/guided-demo.js';
import {scissorsAnchor} from '../src/scissors-kinematics.js';
import {instrumentCapsules,resolveInstrumentAlignment,quaternionProduct} from '../src/instrument-pose.js';

test('row withdrawal follows the real source-CAD journal with cutting off and restores its entry pose',()=>{
 const sim=new Simulation(),tissue={group:new Group(),sampleDistance:()=>Infinity},demo=new GuidedDemo(sim,tissue,{}),start=structuredClone(sim.state.tools.right),anchor=scissorsAnchor(start);
 Object.assign(demo,{active:true,mode:'example',pathIndex:0,pathPoint:new Vector3(...anchor),plan:{unidirectional:true,path:[new Vector3(...anchor)]},_bladeHistory:[]});demo._phase('raster');demo._rememberBlade();
 assert.equal(sim.moveToolTo(start.position.map((v,i)=>v+(i===0?.004:i===1?.002:0)),'right').limited,false);demo._rememberBlade();sim.adjustWrist(0,.10,'right');demo._rememberBlade();
 demo._phase('row-transfer');demo._prepareRowReturn();sim.setCutting(true);
 for(let i=0;i<200&&!demo._rowReturnDone;i++){demo._replayRowReturn(.05);assert.equal(sim.state.cutting,false);assert(demo.active);}
 assert(demo._rowReturnDone);assert(sim.state.tools.right.position.every((v,i)=>Math.abs(v-start.position[i])<1e-10));assert(sim.state.tools.right.wrist.every((v,i)=>Math.abs(v-start.wrist[i])<1e-10));assert(new Vector3(...scissorsAnchor(sim.state.tools.right)).distanceTo(new Vector3(...anchor))<1e-10);
});

test('recorded withdrawal preserves the physical CAD orientation after the live RCM frame has accumulated axial transport',()=>{
 const sim=new Simulation(),demo=new GuidedDemo(sim,{},{}),saved=structuredClone(sim.state.tools.right);
 saved.wrist=[.9,-1.1,2.2];const live={...saved,position:[.055,1.14,.01]};
 live.alignment=quaternionProduct(resolveInstrumentAlignment(live,saved.alignment),[0,0,Math.sin(.7),Math.cos(.7)]);
 const command=demo._recordedPose(live,saved),actual={...live,...command};actual.alignment=resolveInstrumentAlignment(actual,live.alignment);
 const expected=instrumentCapsules(saved),result=instrumentCapsules(actual);
 for(let i=0;i<expected.length;i++)for(const endpoint of ['a','b'])assert(new Vector3(...expected[i][endpoint]).distanceTo(new Vector3(...result[i][endpoint]))<1e-10);
});

test('a changed incision pauses withdrawal and requests a checked route without moving or cutting through the obstruction',()=>{
 const sim=new Simulation(),demo=new GuidedDemo(sim,{},{}),start=structuredClone(sim.state.tools.right),target={...start,position:start.position.map((v,i)=>v+(i===0?.003:0))};
 Object.assign(demo,{active:true,mode:'example',phase:'row-transfer',plan:{traction:{section:{}}},_rowReturn:[target],_rowReturnIndex:0});
 demo._recordedBladeStep=()=>false;sim.setCutting(true);const before=structuredClone(sim.state.tools);
 assert.equal(demo._replayRowReturn(.05),true);assert.equal(demo.active,true);assert.deepEqual(sim.state.tools,before);assert.equal(sim.state.cutting,false);
 assert.equal(demo._bladeSteering.resumeCutting,false);assert.equal(demo._rowRecovery.index,0);assert.equal(demo._rowRecovery.attempts,1);
});

test('hepatic withdrawal keeps the scissors closed and removes only identical jaw-only samples',()=>{
 const sim=new Simulation(),demo=new GuidedDemo(sim,{},{}),pose=structuredClone(sim.state.tools.right);
 demo.plan={anchorJaw:0};demo._rowJournal=[{...pose,jaw:.2},{...pose,jaw:.1},{...pose,jaw:0},{...pose,position:pose.position.map((v,i)=>v+(i===0?.001:0)),jaw:0}];
 const original=structuredClone(demo._rowJournal);demo._prepareRowReturn();
 assert.equal(demo._rowReturn.length,1);assert.equal(demo._rowReturn[0].jaw,0);assert.deepEqual(demo._rowReturn[0].position,pose.position);
 assert.deepEqual(demo._rowJournal,original,'the real cutting history remains unchanged');
});

test('a reached non-cutting return waypoint cancels an obsolete orientation search without moving the live arms',()=>{
 const sim=new Simulation(),demo=new GuidedDemo(sim,{},{}),before=structuredClone(sim.state.tools),target=new Vector3(...scissorsAnchor(sim.state.tools.right));let cancelled=0,replayed=0;
 Object.assign(demo,{active:true,mode:'planning',phase:'row-transfer',phaseTime:0,time:0,_planningToken:2,plan:{unidirectional:true},_rowRecovery:{index:0,target},_bladeSteering:{target},wristPlanner:{cancel:()=>cancelled++}});
 demo._replayRowReturn=()=>{replayed++;return true;};
 demo.update(.016);assert.equal(cancelled,1);assert.equal(replayed,1);assert.equal(demo.mode,'example');assert.equal(demo._bladeSteering,null);assert.deepEqual(sim.state.tools,before);
});

test('hepatic withdrawal retains a safe working bend for the next row while returning the real blade anchor',()=>{
 const sim=new Simulation(),tissue={group:new Group(),sampleDistance:()=>Infinity},demo=new GuidedDemo(sim,tissue,{}),start=structuredClone(sim.state.tools.right),anchor=new Vector3(...scissorsAnchor({...start,jaw:0}));
 Object.assign(demo,{active:true,mode:'example',pathIndex:0,pathPoint:anchor.clone(),plan:{unidirectional:true,traction:{section:{}},anchorJaw:0,path:[anchor.clone()]},_bladeHistory:[]});demo._phase('raster');
 sim.setJaw('right',0);demo._rememberBlade();assert.equal(sim.moveToolPose({position:start.position.map((v,i)=>v+(i===0?.004:i===1?.002:0)),wrist:[.3,0,0],jaw:0},'right').limited,false);demo._rememberBlade();
 demo._phase('row-transfer');demo._prepareRowReturn();
 for(let i=0;i<200&&!demo._rowReturnDone;i++){demo._replayRowReturn(.05);assert(demo.active);assert.equal(sim.state.cutting,false);}
 assert(demo._rowReturnDone);assert(Math.abs(sim.state.tools.right.wrist[0]-.3)<1e-9);assert(new Vector3(...scissorsAnchor({...sim.state.tools.right,jaw:0})).distanceTo(anchor)<.00015);
});
