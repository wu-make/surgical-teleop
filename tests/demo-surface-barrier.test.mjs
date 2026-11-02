import test from 'node:test';
import assert from 'node:assert/strict';
import {BoxGeometry,Group,Mesh,Vector3} from 'three';
import {Simulation} from '../src/simulation.js';
import {GuidedDemo} from '../src/guided-demo.js';
import {instrumentCapsules,resolveInstrumentAlignment} from '../src/instrument-pose.js';

test('the displayed surface barrier blocks a complete wrist sweep even when both endpoint envelopes clear a thin tissue wall',()=>{
 const sim=new Simulation();sim.moveToolTo([-.14,1.08,.01],'left');
 const start=structuredClone(sim.state.tools.right),position=start.position.map((v,i)=>v+(i===0?.04:0)),mid={...start,position:start.position.map((v,i)=>(v+position[i])*.5)};mid.alignment=resolveInstrumentAlignment(mid,start.alignment);
 const cap=instrumentCapsules(mid).find(c=>c.id==='wrist-wrist_pitch_link-4'),p=new Vector3(...cap.a).lerp(new Vector3(...cap.b),.5),geometry=new BoxGeometry(.0004,.004,.004);geometry.translate(...p.toArray());geometry.computeBoundingBox();
 const tissue={group:new Group(),_meshes:new Map([['wall',new Mesh(geometry)]]),_contactRevision:1},demo=new GuidedDemo(sim,tissue,{});demo.plan={traction:{section:{}}};
 try{
  assert(demo._currentBladeGuard(start).bodyMinimum>0);
  const end={...start,position};end.alignment=resolveInstrumentAlignment(end,start.alignment);assert(demo._currentBladeGuard(end).bodyMinimum>0);
  assert.equal(demo._recordedBladeStep(sim,{position,wrist:[...start.wrist],jaw:start.jaw}),false);
  assert.deepEqual(sim.state.tools.right.position,start.position,'an interior crossing must not be committed');
 }finally{geometry.dispose();}
});
