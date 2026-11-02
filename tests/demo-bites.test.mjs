import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {Simulation} from '../src/simulation.js';
import {GuidedDemo} from '../src/guided-demo.js';
import {scissorsAnchor} from '../src/scissors-kinematics.js';

test('a short stroke still completes a real closed-jaw cutting frame before withdrawing to the next row',()=>{
  const sim=new Simulation(),tissue={group:new THREE.Group(),busy:false},interaction={cuttingBusy:false,contact:{},grasp:null};
  const demo=new GuidedDemo(sim,tissue,interaction),start=new THREE.Vector3(...scissorsAnchor(sim.state.tools.right)),end=start.clone().add(new THREE.Vector3(.001,0,0)),next=end.clone().add(new THREE.Vector3(0,.005,0));
  Object.assign(demo,{active:true,mode:'example',phase:'raster',phaseTime:0,time:0,pathIndex:0,pathPoint:start.clone(),rasterTravel:0,_biteTime:0,plan:{path:[start,end,next],transfers:{2:[next]},jawOpening:.45}});sim.setCutting(true);
  const frames=[];
  for(let i=0;i<120&&demo.phase!=='row-transfer';i++){demo.update(1/60);frames.push({phase:demo.phase,jaw:sim.state.tools.right.jaw,cutting:sim.state.cutting});}
  assert.equal(demo.phase,'row-transfer');assert(frames.some(f=>f.jaw>.4),'scissors visibly open');
  assert(frames.some(f=>f.phase==='raster'&&f.jaw===0&&f.cutting),'the closing endpoint must be sent through the actual cutting controller');
  assert.equal(sim.state.cutting,false,'air transfer cannot shear tissue');
});

test('opening the curved blades does not advance the wrist into the tissue to compensate for their natural retraction',()=>{
  const sim=new Simulation(),tissue={group:new THREE.Group(),busy:false},demo=new GuidedDemo(sim,tissue,{cuttingBusy:false,contact:{}}),tool=sim.state.tools.right,start=new THREE.Vector3(...scissorsAnchor(tool));
  Object.assign(demo,{active:true,mode:'example',phase:'raster',phaseTime:0,time:0,pathIndex:0,pathPoint:start.clone(),rasterTravel:0,_biteTime:0,plan:{path:[start,start.clone().add(new THREE.Vector3(.005,0,0))],transfers:{},jawOpening:.45}});
  sim.setJaw('right',0);const position=[...tool.position],wrist=[...tool.wrist];
  for(let i=0;i<9;i++){demo.update(1/60);assert.deepEqual(tool.position,position);assert.deepEqual(tool.wrist,wrist);assert.deepEqual(demo.pathPoint,start);}
  assert(tool.jaw>.4,'the jaws still visibly open while the body remains still');
});

test('a delayed region cut keeps the completed jaws closed and submits once when geometry becomes ready',()=>{
 for(const wait of ['tissue','queue']){
  const sim=new Simulation(),tissue={group:new THREE.Group(),busy:wait==='tissue',deformPoint:p=>p.clone()},accepted=[];
  const interaction={cuttingBusy:wait==='queue',contact:{},queueRegionCut(segments){if(sim.state.tools.right.jaw>.22)return false;accepted.push(segments);return true;}};
  const demo=new GuidedDemo(sim,tissue,interaction),a=new THREE.Vector3(),b=new THREE.Vector3(.01,0,0);
  Object.assign(demo,{active:true,mode:'example',phase:'area-cut',phaseTime:0,time:0,pathIndex:0,_areaQueuedIndex:-1,plan:{pattern:'area',path:[a],areaBands:[[{a,b}]],jawOpening:.2}});sim.setCutting(true);
  for(let i=0;i<18;i++)demo.update(.05);
  assert.equal(sim.state.tools.right.jaw,0,'closed jaws must not reopen while '+wait+' is busy');assert.equal(accepted.length,0);
  tissue.busy=false;interaction.cuttingBusy=false;demo.update(.05);assert.equal(accepted.length,1);assert.equal(demo._areaQueuedIndex,0);assert.equal(sim.state.cutting,false);
  demo.update(.05);assert.equal(accepted.length,1);assert.equal(demo.phase,'wait-separation');
 }
});
