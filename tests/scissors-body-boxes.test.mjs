import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {Box3,Group,Mesh,PlaneGeometry,Matrix4,Vector3} from 'three';
import {closestParentBox} from '../src/tissue-contact.js';
import {displayedCapsuleClearance,displayedCADBodyClearance} from '../src/demo-surface-clearance.js';
import {SCISSORS_BODY_BOXES} from '../src/scissors-body-boxes.js';
import {INSTRUMENT_COLLISION_DATA} from '../src/instrument-collision-data.js';
import {readGlbGeometry,clippedPoints} from '../scripts/prepare-instrument-collision.mjs';

test('every clipped original CAD triangle remains inside the tighter source-axis box',()=>{
 const meshes=readGlbGeometry(fs.readFileSync(new URL('../public/assets/scissors.glb',import.meta.url)));
 for(const c of INSTRUMENT_COLLISION_DATA.scissors.capsules){if(c.region==='jaw')continue;const spec=SCISSORS_BODY_BOXES[c.id];assert(spec);const points=clippedPoints(meshes.filter(m=>m.link===c.link&&c.source.includes(m.name)),c.slab.axis,c.slab.min,c.slab.max);for(const p of points){
  for(let i=0;i<3;i++)assert(p[i]-spec.min[i]>.0001&&spec.max[i]-p[i]>.0001,'every unchanged source triangle retains more than twice the 50 µm non-cutting sweep quantum inside its box');
  const delta=c.b.map((v,i)=>v-c.a[i]),squared=delta.reduce((n,v)=>n+v*v,0),t=Math.max(0,Math.min(1,delta.reduce((n,v,i)=>n+v*(p[i]-c.a[i]),0)/squared)),distance=Math.hypot(...p.map((v,i)=>v-c.a[i]-t*delta[i]));
  assert(c.radius-distance>.0001,'the circular source envelope retains the same metal margin');
 }}
});

test('the oriented-box distance covers enclosed triangles and the interior of broad and tiny parallel faces',()=>{
 for(const width of [.002,.1])for(const height of [0,.003]){
  const geometry=new PlaneGeometry(width,width);geometry.translate(0,0,height);geometry.computeBoundingBox();const meshes=[new Mesh(geometry)],box=new Box3(new Vector3(-.01,-.01,-.001),new Vector3(.01,.01,.001));
  try{assert(Math.abs(closestParentBox(meshes,box,new Matrix4(),.02)-Math.max(0,height-.001))<1e-9);}finally{geometry.dispose();}
 }
 const geometry=new PlaneGeometry(.1,.1);geometry.translate(0,0,.01);geometry.computeBoundingBox();
 try{const matrix=new Matrix4().makeRotationX(Math.PI/4),box=new Box3(new Vector3(-.001,-.002,-.003),new Vector3(.001,.002,.003));assert(Math.abs(closestParentBox([new Mesh(geometry)],box,matrix,.02)-(.01-.005/Math.sqrt(2)))<1e-9);}finally{geometry.dispose();}
});

test('empty circular-envelope corners no longer block a real air gap beside the same unchanged source wrist',()=>{
 const id='wrist-wrist_pitch_link-2',c=INSTRUMENT_COLLISION_DATA.scissors.capsules.find(c=>c.id===id),spec=SCISSORS_BODY_BOXES[id],center=spec.min.map((v,i)=>(v+spec.max[i])*.5),geometry=new PlaneGeometry(.0001,.0001);geometry.translate(center[0],center[1],spec.max[2]+.0004);geometry.computeBoundingBox();
 const tissue={group:new Group(),_meshes:new Map([['tiny',new Mesh(geometry)]])},pose={position:[0,0,0],quaternion:[0,0,0,1],links:{[spec.link]:{position:[0,0,0],quaternion:[0,0,0,1]}}};
 try{assert(displayedCapsuleClearance(tissue,{...c,part:c.region})<0);assert(displayedCADBodyClearance(tissue,{...c,part:c.region},pose)>.0003);}finally{geometry.dispose();}
});

test('CAD refinement retains the metric air gap used by 3 mm traction checkpoints',()=>{
 const id='wrist-wrist_pitch_link-2',c=INSTRUMENT_COLLISION_DATA.scissors.capsules.find(c=>c.id===id),spec=SCISSORS_BODY_BOXES[id],center=spec.min.map((v,i)=>(v+spec.max[i])*.5),geometry=new PlaneGeometry(.0001,.0001);
 geometry.rotateY(Math.PI/2);geometry.translate(spec.max[0]+.004,center[1],center[2]);geometry.computeBoundingBox();
 const tissue={group:new Group(),_meshes:new Map([['face',new Mesh(geometry)]])},pose={position:[0,0,0],quaternion:[0,0,0,1],links:{[spec.link]:{position:[0,0,0],quaternion:[0,0,0,1]}}};
 try{assert(displayedCapsuleClearance(tissue,{...c,part:c.region})<.002);const distance=displayedCADBodyClearance(tissue,{...c,part:c.region},pose);assert(distance>.0039&&distance<.004,'a distant conservative cap must not masquerade as an exact sub-3 mm gap');}finally{geometry.dispose();}
});
