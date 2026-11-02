import test from 'node:test';
import assert from 'node:assert/strict';
import {Group,Vector3} from 'three';
import {GuidedDemo} from '../src/guided-demo.js';
import {Simulation} from '../src/simulation.js';
import {scissorsAnchor} from '../src/scissors-kinematics.js';

function fixture(){
 const sim=new Simulation(),tissue={group:new Group(),sampleDistance:()=>Infinity,_epoch:1,_contactRevision:1,busy:false},interaction={cuttingBusy:false},demo=new GuidedDemo(sim,tissue,interaction),anchor=new Vector3(...scissorsAnchor(sim.state.tools.right));
 Object.assign(demo,{active:true,mode:'example',phase:'raster',plan:{jawOpening:.2},_bladeHistory:[],_bladeSteering:{target:anchor.clone(),anchor,resumeCutting:true,frames:0}});
 return{sim,tissue,interaction,demo};
}

test('pending actual cut geometry defers wrist planning and never moves either instrument',()=>{
 const{sim,tissue,interaction,demo}=fixture(),before=sim.snapshot();let planned=0;demo._planBladeWristRoute=()=>{planned++;};
 for(const owner of [tissue,interaction]){owner[owner===tissue?'busy':'cuttingBusy']=true;demo._steerBlade(.016);assert.equal(planned,0);assert.deepEqual(sim.state.tools,before.state.tools);owner[owner===tissue?'busy':'cuttingBusy']=false;}
});

test('a geometry revision during asynchronous wrist planning retries after settling instead of aborting or leaving planning mode stuck',async()=>{
 const{sim,tissue,demo}=fixture(),before=sim.snapshot();demo._bladeWristRouteSteps=function*(){yield;tissue._contactRevision++;yield;return null;};
 await demo._planBladeWristRoute();assert(demo.active);assert.equal(demo.mode,'example');assert.equal(demo._bladeSteering.waitForGeometry,true);assert.deepEqual(sim.state.tools,before.state.tools);
});

test('a narrow incision first tries the geometry-checked left-clamp opening before another worker wrist search',()=>{
 const{sim,demo}=fixture();demo.plan.traction={section:{}};demo.wristPlanner={};demo._bladeSteering.frames=2;sim.state.tools.right.jaw=0;
 let pulled=0,planned=0;demo._relieveBladeWithTraction=()=>{pulled++;return true;};demo._planBladeWristRoute=()=>{planned++;};
 demo._steerBlade(.016);assert.equal(pulled,1);assert.equal(planned,0);assert(demo.active);
});
