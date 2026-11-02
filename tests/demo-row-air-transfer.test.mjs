import test from 'node:test';
import assert from 'node:assert/strict';
import {Group,Vector3} from 'three';
import {GuidedDemo} from '../src/guided-demo.js';
import {Simulation} from '../src/simulation.js';
import {scissorsAnchor} from '../src/scissors-kinematics.js';

test('a completed row withdraws 25 mm into air before changing traction and approaches the next row from air',()=>{
 const sim=new Simulation();sim.moveToolTo([-.14,1.08,.01],'left');
 const tissue={group:new Group(),sampleDistance:()=>Infinity,toReferencePoint:p=>p.clone()},interaction={},demo=new GuidedDemo(sim,tissue,interaction),entry=new Vector3(...scissorsAnchor(sim.state.tools.right)),next=entry.clone().add(new Vector3(.001,0,.0005));
 Object.assign(demo,{active:true,mode:'example',time:0,phaseTime:0,phase:'row-transfer',pathIndex:0,pathPoint:entry.clone(),plan:{unidirectional:true,jawOpening:.2,path:[entry.clone(),next]},_rowNextIndex:1,_rowReturnDone:true,_bladeHistory:[],_transferPath:[],_transferIndex:0});
 let opened=0;demo._openCompletedSection=()=>{opened++;assert(new Vector3(...scissorsAnchor(sim.state.tools.right)).distanceTo(entry)>.0249,'traction cannot change while the tool is still at the cut boundary');return false;};
 sim.setCutting(true);
 for(let i=0;i<100&&!opened;i++){demo.update(.05);assert.equal(sim.state.cutting,false);assert(demo.active);}
 assert(opened);assert(demo._rowAirExitDone&&demo._airTransferReady);assert.equal(demo._transferPath.length,2);
 assert(Math.abs(demo._transferPath[0].distanceTo(next)-.025)<1e-10);assert(demo._transferPath[1].distanceTo(next)<1e-10);
});
