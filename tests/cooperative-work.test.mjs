import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {runCooperatively} from '../src/cooperative-work.js';
import {GuidedDemo,planPeripheralResections,planPeripheralResectionSteps,probeToolMoveSteps} from '../src/guided-demo.js';
import {TissueVolume} from '../src/tissue.js';
import {Simulation} from '../src/simulation.js';
import {InteractionController} from '../src/interaction-controller.js';

function fixture(){
  const t=new TissueVolume(),dims=[25,25,25],origin=[-.042,-.042,-.042],spacing=[.0035,.0035,.0035];
  t.metadata={dims,origin,spacing,bounds:[[-.03,-.03,-.03],[.03,.03,.03]]};t._baseField=new Float32Array(25**3);
  for(let z=0;z<25;z++)for(let y=0;y<25;y++)for(let x=0;x<25;x++)t._baseField[x+25*(y+25*z)]=Math.hypot(origin[0]+x*spacing[0],origin[1]+y*spacing[1],origin[2]+z*spacing[2])-.03;
  t.ready=true;t.group.position.y=1.035;t.group.rotation.x=-Math.PI/2;t.group.updateMatrixWorld(true);
  const s=new Simulation(),i=new InteractionController(s,t),d=new GuidedDemo(s,t,i);return{t,s,i,d};
}

test('cooperative work preserves every ordered unit and final value while yielding between bounded slices',async()=>{
  let clock=0,paints=0;const visited=[];
  function* work(){for(let i=0;i<11;i++){visited.push(i);clock++;yield;}return 81;}
  const p=runCooperatively(work(),{now:()=>clock,budgetMs:3,yieldFrame:async()=>{paints++;}});
  assert.equal(visited.length,0,'click handler does not begin the scan');const result=await p;
  assert.deepEqual(visited,Array.from({length:11},(_,i)=>i));assert.equal(result.value,81);assert.equal(result.cancelled,false);assert(paints>=4);assert(result.stats.maxSliceMs<=3);
});

test('cancellation after a frame yield prevents stale work from executing',async()=>{
  let valid=true,ran=false,release;const wait=new Promise(resolve=>release=resolve);
  function* work(){ran=true;yield;return 1;}
  const p=runCooperatively(work(),{yieldFrame:()=>wait,valid:()=>valid});valid=false;release();assert((await p).cancelled);assert.equal(ran,false);
});

test('yielded full-volume planning preserves all samples, sorted plans and raster coordinates exactly',async()=>{
  const {t}=fixture();try{
    const query=t.queryReferenceDistance.bind(t),trace=[];t.queryReferenceDistance=p=>{trace.push(p.toArray());return query(p);};
    const expected=planPeripheralResections(t),sampleTrace=structuredClone(trace);trace.length=0;
    const actual=await runCooperatively(planPeripheralResectionSteps(t),{yieldFrame:async()=>{},budgetMs:.1});
    assert(expected.length>0);assert.deepEqual(actual.value,expected);assert.deepEqual(trace,sampleTrace,'all trilinear and boundary-refinement queries keep their original order');assert(actual.stats.slices>1);
  }finally{t.dispose();}
});

test('cooperative CAD preflight and start preserve the synchronous accepted path and tool states',async()=>{
  const a=fixture(),b=fixture();try{
    a.d.startExample();assert(a.d.active,'fixture must contain a reachable real controller path');
    const started=await b.d.startExampleAsync({yieldFrame:async()=>{},budgetMs:.1});assert(started);assert.deepEqual(b.d.plan,a.d.plan);
    assert.deepEqual(b.s.snapshot(),a.s.snapshot());for(const key of ['leftRest','leftLift','leftAway','rightStandby'])assert.deepEqual(b.d[key],a.d[key]);assert(b.d.planningTimings.slices>1);
  }finally{a.t.dispose();b.t.dispose();}
});

test('organ reset during planning cancels without releasing a grasp, changing tools or creating history',async()=>{
  const {t,s,i,d}=fixture();try{
    i.grasp={kind:'tissue',reference:[0,0,0],local:[0,0,0],displacement:[0,0,0]};const tools=structuredClone(s.state.tools);let frames=0;
    const result=await d.startExampleAsync({budgetMs:.01,yieldFrame:async()=>{if(++frames===2)t._epoch++;}});
    assert.equal(result,false);assert.equal(d.active,false);assert.equal(i.grasp.kind,'tissue');assert.deepEqual(s.state.tools,tools);assert.equal(s.canUndo,false);
  }finally{t.dispose();}
});

test('explicit cancellation keeps delayed preparation from restarting automatic motion',async()=>{
  const {t,s,d}=fixture();try{
    let release;const pending=d.startExampleAsync({yieldFrame:()=>new Promise(resolve=>release=resolve)}),tools=structuredClone(s.state.tools);
    d.update(.05);assert.deepEqual(s.state.tools,tools);d.stop('');release();assert.equal(await pending,false);assert.equal(d.active,false);assert.equal(s.canUndo,false);
  }finally{t.dispose();}
});

function withdrawalFixture(){const f=fixture();f.s.state.tools.left.position=[-.086,1.034,.110];f.s.state.tools.right.position=[-.070,1.034,.092];f.s.state.tools.left.jaw=f.s.state.tools.right.jaw=0;f.i.grasp={kind:'fragment',fragmentId:'held'};f.d.active=true;f.d.mode='example';f.d.plan={worldNormal:new THREE.Vector3(0,0,1)};f.d.leftAway=new THREE.Vector3(-.086,1.059,.155);return f;}
test('yielded specimen withdrawal keeps every real collision check and the synchronous accepted route',async()=>{
  const a=withdrawalFixture(),b=withdrawalFixture();try{
    a.d._beginFragmentMove();const tools=structuredClone(b.s.state.tools);let frames=0;
    assert(await b.d._beginFragmentMoveAsync({budgetMs:0,yieldFrame:async()=>{frames++;b.d.update(.016);assert.deepEqual(b.s.state.tools,tools);}}));
    assert(frames>3);assert.equal(b.d.phase,'retract');assert.equal(b.d.mode,'example');assert.deepEqual(b.d.rightRetractEnd,a.d.rightRetractEnd);assert.deepEqual(b.d.leftAway,a.d.leftAway);assert.deepEqual(b.s.state.tools,a.s.state.tools);
  }finally{a.t.dispose();b.t.dispose();}
});
test('manual cancellation prevents a late withdrawal planner from moving or reopening either instrument',async()=>{
  const f=withdrawalFixture();try{let release;const tools=structuredClone(f.s.state.tools),pending=f.d._beginFragmentMoveAsync({yieldFrame:()=>new Promise(resolve=>release=resolve)});f.d.stop('');release();assert.equal(await pending,false);assert.deepEqual(f.s.state.tools,tools);assert.equal(f.d.active,false);}finally{f.t.dispose();}
});

test('specimen preflight yields after every bounded CAD sweep and rejects the first blocked subsegment',()=>{
  const target=new THREE.Vector3(.075,.021,-.017),visits=[],probe={state:{tools:{left:{position:[0,0,0]}}},moveToolTo(p,side){const before=new THREE.Vector3(...this.state.tools[side].position);assert(before.distanceTo(new THREE.Vector3(...p))<=.002000000001);visits.push(p);this.state.tools[side].position=p;return{limited:false};}};
  let result;const scan=probeToolMoveSteps(probe,target,'left');do{result=scan.next();}while(!result.done);assert.equal(result.value,false);assert.deepEqual(probe.state.tools.left.position,target.toArray());assert.equal(visits.length,Math.ceil(target.length()/.002));
  let calls=0;probe.state.tools.left.position=[0,0,0];probe.moveToolTo=()=>({limited:++calls===3});const blocked=probeToolMoveSteps(probe,target,'left');do{result=blocked.next();}while(!result.done);assert.equal(result.value,true);assert.equal(calls,3);
});
