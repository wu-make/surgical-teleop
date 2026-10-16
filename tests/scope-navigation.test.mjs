import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {Simulation} from '../src/simulation.js';
import {attachScopeNavigation} from '../src/scope-navigation.js';

const near=(a,b,tolerance=1e-9)=>assert.ok(Math.abs(a-b)<=tolerance,`${a} != ${b}`);
const nearVector=(a,b,tolerance=1e-9)=>a.forEach((v,i)=>near(v,b[i],tolerance));
const settle=(sim,seconds=3)=>{for(let i=0;i<seconds*60;i++)sim.update(1/60);};
const context=()=>({surfaceTarget:[-.08,1.05,.04],organBounds:{min:[-.14,1.01,-.09],max:[.14,1.14,.1]},
  heldSpecimen:{id:'held',position:[-.15,1.14,-.1],radius:.008}});
function projected(sim,target=sim.state.tools[sim.state.activeTool].position){
  const s=sim.state.scope,camera=new THREE.PerspectiveCamera(s.fov,.75,.003,5);
  camera.position.fromArray(s.position);camera.up.fromArray(s.cameraUp);camera.lookAt(new THREE.Vector3(...s.lookAt));
  camera.updateMatrixWorld();return new THREE.Vector3(...target).project(camera);
}
function centred(sim,target){const pixel=projected(sim,target);near(pixel.x,0,1e-8);near(pixel.y,0,1e-8);assert.ok(pixel.z<1&&pixel.z>-1);}

class Canvas {
  constructor(){this.listeners=new Map();this.captures=new Set();}
  addEventListener(type,handler){if(!this.listeners.has(type))this.listeners.set(type,new Set());this.listeners.get(type).add(handler);}
  removeEventListener(type,handler){this.listeners.get(type)?.delete(handler);}
  getBoundingClientRect(){return {width:600,height:800};}
  setPointerCapture(id){this.captures.add(id);}
  releasePointerCapture(id){this.captures.delete(id);}
  hasPointerCapture(id){return this.captures.has(id);}
  emit(type,data={}){const event={target:this,button:0,pointerId:1,clientX:100,clientY:100,deltaY:0,deltaMode:0,
    preventDefault(){this.prevented=true;},...data};for(const handler of this.listeners.get(type)??[])handler(event);return event;}
}
function mouseFixture(){
  const canvas=new Canvas(),sim=new Simulation();let time=0,enabled=true,began=0,changed=0,focused=0;
  const navigation=attachScopeNavigation({canvas,sim,now:()=>time,enabled:()=>enabled,
    onBegin:label=>{began++;sim.checkpoint(label);},onChange:()=>changed++,onFocus:()=>focused++});
  return {canvas,sim,navigation,advance:n=>time+=n,enable:v=>enabled=v,get began(){return began;},get changed(){return changed;},get focused(){return focused;}};
}

test('active following keeps the actual moving TCP centred every frame despite stale mother and specimen anchors',()=>{
  const sim=new Simulation();sim.setScopeContext(context());sim.select('left');settle(sim);
  centred(sim);
  let moved=0;
  for(const key of ['KeyA','KeyQ','KeyW']){
    const before=[...sim.state.tools.left.position];
    for(let frame=0;frame<100;frame++){
      sim.update(1/60,new Set([key]));
      assert.deepEqual(sim.state.scope.target,sim.state.tools.left.position);
      centred(sim);
      // A camera and its physical scope share the same RCM/optical axis.
      const camera=sim.state.scope,ray=new THREE.Vector3(...camera.lookAt).sub(new THREE.Vector3(...camera.position)).normalize();
      nearVector(ray.toArray(),camera.direction,1e-9);
    }
    moved+=Math.hypot(...before.map((v,i)=>v-sim.state.tools.left.position[i]));
    sim.update(1/60);
  }
  assert.ok(moved>.08,'test must include meaningful live movement, not a stationary end pose');
  sim.select('right');settle(sim);centred(sim);
  assert.deepEqual(sim.state.scope.target,sim.state.tools.right.position);
  sim.select('left');sim.setScopeContext({...context(),graspTarget:sim.state.tools.left.position,operating:true});settle(sim);
  for(let frame=0;frame<40;frame++){sim.update(1/60,new Set(['KeyE','ShiftLeft']));centred(sim);}
  assert.equal(sim.state.activeTool,'left','left specimen carriage remains the active control target');
});

test('large target changes remain speed limited while explicit midpoint and grasp targets stay exact',()=>{
  const sim=new Simulation();sim.setScopeContext(context());settle(sim);
  const before=new THREE.Vector3(...sim.state.scope.direction);sim.select('right');sim.update(1/60);
  const after=new THREE.Vector3(...sim.state.scope.direction);
  assert.ok(before.angleTo(after)<=.9/60+1e-9);
  sim.setScopeFollow(true,'midpoint');settle(sim);
  const midpoint=sim.state.tools.left.position.map((v,i)=>(v+sim.state.tools.right.position[i])/2);
  assert.deepEqual(sim.state.scope.target,midpoint);centred(sim,midpoint);
  const grasp=[-.04,1.08,-.02];sim.setScopeContext({...context(),graspTarget:grasp,operating:false});sim.setScopeFollow(true,'grasp');settle(sim);
  assert.deepEqual(sim.state.scope.target,grasp);centred(sim,grasp);
  sim.setScopeViewMode('specimen');sim.setScopeFollow(true,'active');settle(sim);
  assert.deepEqual(sim.state.scope.target,sim.state.tools.right.position);centred(sim);
});

test('manual canvas dragging controls RCM yaw/pitch with one history gesture and no tool movement',()=>{
  const f=mouseFixture(),{canvas,sim,navigation}=f;sim.setScopeFollow(false);
  const before=sim.snapshot(),tools=structuredClone(sim.state.tools),depth=sim.state.scope.depth;
  canvas.emit('pointerdown');assert.ok(canvas.hasPointerCapture(1));assert.equal(f.focused,1,'canvas input returns keyboard focus from previous form controls');
  canvas.emit('pointermove',{clientX:101,clientY:100});assert.equal(f.began,0,'a click is not a camera move');
  canvas.emit('pointermove',{clientX:160,clientY:140});canvas.emit('pointermove',{clientX:190,clientY:155});
  assert.equal(f.began,1);assert.equal(f.changed,2);assert.equal(sim.undoStack.length,1);
  assert.notEqual(sim.state.scope.yaw,before.state.scope.yaw);assert.notEqual(sim.state.scope.pitch,before.state.scope.pitch);
  near(sim.state.scope.depth,depth);assert.deepEqual(sim.state.tools,tools);
  near(Math.hypot(...sim.state.scope.position.map((v,i)=>v-sim.state.scope.port[i])),depth);
  canvas.emit('pointerup');assert.ok(!canvas.hasPointerCapture(1));
  const after=sim.snapshot();sim.undo();near(sim.state.scope.yaw,before.state.scope.yaw);near(sim.state.scope.pitch,before.state.scope.pitch);
  sim.redo();nearVector(sim.state.scope.position,after.state.scope.position);
  navigation.dispose();
});

test('wheel optical zoom works with automatic following without moving the physical lens or its centred TCP',()=>{
  const f=mouseFixture(),{canvas,sim,navigation}=f;sim.setScopeContext(context());settle(sim);
  const position=[...sim.state.scope.position],depth=sim.state.scope.depth;
  canvas.emit('wheel',{deltaY:-120});assert.ok(sim.state.scope.fov<55);centred(sim);assert.equal(f.focused,1);
  nearVector(sim.state.scope.position,position);near(sim.state.scope.depth,depth);
  f.advance(100);canvas.emit('wheel',{deltaY:-30,deltaMode:1});assert.equal(f.began,1,'one short wheel burst is one history action');
  canvas.emit('wheel',{deltaY:-10000});near(sim.state.scope.fov,25);
  f.advance(300);canvas.emit('wheel',{deltaY:10000});near(sim.state.scope.fov,80);assert.equal(f.began,2);
  sim.update(1/60);centred(sim);nearVector(sim.state.scope.position,position);
  const saved=sim.snapshot();sim.restore(saved);near(sim.state.scope.fov,80);
  sim.undo();near(sim.state.scope.fov,25);sim.redo();near(sim.state.scope.fov,80);
  sim.reset();near(sim.state.scope.fov,55);
  const legacy=sim.snapshot();delete legacy.state.scope.fov;sim.restore(legacy);near(sim.state.scope.fov,55);
  for(const badFov of [0,24,81,NaN,Infinity]){const stable=sim.snapshot(),bad=sim.snapshot();bad.state.scope.fov=badFov;assert.throws(()=>sim.restore(bad),TypeError);assert.deepEqual(sim.snapshot(),stable);}
  navigation.dispose();
});

test('canvas input ignores overlays, automatic drags, paused/disabled scenes and cancelled captures',()=>{
  const f=mouseFixture(),{canvas,sim,navigation}=f;
  const before=sim.snapshot();canvas.emit('pointerdown');canvas.emit('pointermove',{clientX:200});assert.deepEqual(sim.snapshot(),before);
  sim.setScopeFollow(false);
  canvas.emit('pointerdown',{target:{tagName:'BUTTON'}});canvas.emit('pointermove',{clientX:200});assert.equal(f.began,0);
  canvas.emit('pointerdown');canvas.emit('pointercancel');canvas.emit('pointermove',{clientX:200});assert.equal(f.began,0);
  canvas.emit('pointerdown');navigation.cancel();canvas.emit('pointermove',{clientX:200});assert.equal(f.began,0);
  assert.equal(canvas.captures.size,0,'blur/reset/history cancellation releases pointer capture');
  sim.setPaused(true);const paused=sim.snapshot();canvas.emit('pointerdown');canvas.emit('wheel',{deltaY:-200});assert.deepEqual(sim.snapshot(),paused);
  sim.setPaused(false);f.enable(false);const disabled=sim.snapshot();canvas.emit('pointerdown');canvas.emit('wheel',{deltaY:-200});assert.deepEqual(sim.snapshot(),disabled);
  f.enable(true);canvas.emit('pointerdown');canvas.emit('pointermove',{clientX:140});assert.equal(f.began,1);
  sim.setPaused(true);const freeze=sim.snapshot();canvas.emit('pointermove',{clientX:180});assert.deepEqual(sim.snapshot(),freeze);assert.equal(canvas.captures.size,0);
  navigation.dispose();assert.ok([...canvas.listeners.values()].every(set=>set.size===0));
});

test('manual navigation and optical zoom validate inputs, home/reset restore defaults, and zoom never changes insertion',()=>{
  const sim=new Simulation();sim.setScopeFollow(false);const before=sim.snapshot();
  assert.throws(()=>sim.navigateScope(NaN,0),TypeError);assert.throws(()=>sim.zoomScope(Infinity),TypeError);assert.deepEqual(sim.snapshot(),before);
  sim.navigateScope(.4,-.25);sim.zoomScope(-.3);const depth=sim.state.scope.depth;
  sim.homeScopeView();near(sim.state.scope.fov,55);near(sim.state.scope.roll,0);near(sim.state.scope.depth,depth);
  const ray=new THREE.Vector3(...sim.state.scope.direction),target=new THREE.Vector3(...sim.state.tools[sim.state.activeTool].position).sub(new THREE.Vector3(...sim.state.scope.port)).normalize();
  assert.ok(ray.angleTo(target)<1e-7);
  sim.setScopeFollow(true);const auto=sim.snapshot();assert.equal(sim.navigateScope(.1,.1),false);assert.deepEqual(sim.snapshot(),auto);
  sim.reset();near(sim.state.scope.fov,55);
});
