import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {BufferGeometry,Float32BufferAttribute,Mesh,Matrix4,PlaneGeometry} from 'three';
import {buildSurfaceTree} from '../src/surface-tree.js';
import {closestParentMetal} from '../src/tissue-contact.js';
import {loadBodyTriangleGeometry} from '../src/scissors-body-catalogue.js';
import {SOURCE_SHA256} from '../src/scissors-body-triangles.js';
import {readGlbGeometry} from '../scripts/prepare-instrument-collision.mjs';
import {INSTRUMENT_COLLISION_DATA} from '../src/instrument-collision-data.js';

function metal(values){const positions=new Float32Array(values),indices=Uint32Array.from({length:positions.length/3},(_,i)=>i);return{positions,indices,tree:buildSurfaceTree(positions,indices)};}
function parent(values){const geometry=new BufferGeometry();geometry.setAttribute('position',new Float32BufferAttribute(values,3));geometry.setIndex(Array.from({length:values.length/3},(_,i)=>i));geometry.computeBoundingBox();return new Mesh(geometry);}

test('full triangle contact includes face interiors, both edge directions, intersections and rigid source transforms',()=>{
 const broad=[-.02,-.02,0,.02,-.02,0,0,.02,0],small=[-.001,-.001,0,.001,-.001,0,0,.001,0];
 for(const [a,b,height]of [[small,broad,.003],[broad,small,.003],[small,broad,0]]){
  const mesh=parent(b);try{const result=closestParentMetal([mesh],metal(a),new Matrix4().makeTranslation(0,0,height),.01);assert(Math.abs(result-height)<1e-8);}finally{mesh.geometry.dispose();mesh.material.dispose();}
 }
 const mesh=parent(broad);try{
  const crossing=metal([-.001,0,-.003,.001,0,-.003,0,0,.004]);assert.equal(closestParentMetal([mesh],crossing,new Matrix4(),.01),0);
  const transform=new Matrix4().makeRotationZ(.6);transform.setPosition(.002,.001,.004);assert(Math.abs(closestParentMetal([mesh],metal(small),transform,.01)-.004)<1e-8);
  assert.equal(closestParentMetal([mesh],metal(small),new Matrix4().makeTranslation(0,0,.004),.001),.001);
 }finally{mesh.geometry.dispose();mesh.material.dispose();}
});

test('the dual hierarchy searches every original source face and refits changed displayed parent positions',()=>{
 const values=[];for(let i=0;i<40;i++){const z=i===29?.002:.02+i*.0001;values.push(-.001,-.001,z,.001,-.001,z,0,.001,z);}
 const geometry=new PlaneGeometry(.03,.03);geometry.computeBoundingBox();const mesh=new Mesh(geometry),source=metal(values);
 try{assert(Math.abs(closestParentMetal([mesh],source,new Matrix4(),.03)-.002)<1e-8);geometry.translate(0,0,-.001);geometry.computeBoundingBox();assert(Math.abs(closestParentMetal([mesh],source,new Matrix4(),.03)-.003)<1e-8);}finally{geometry.dispose();mesh.material.dispose();}
});

test('face-level pruning agrees with exhaustive face pairs under rigid rotations and translations',()=>{
 let seed=71821;const random=()=>((seed=(1664525*seed+1013904223)>>>0)/2**32),triangles=()=>Array.from({length:19},()=>Array.from({length:9},()=>.03*(random()-.5)));
 const aa=triangles(),bb=triangles(),mesh=parent(bb.flat()),source=metal(aa.flat());
 try{for(let step=0;step<6;step++){
  const matrix=new Matrix4().makeRotationY(.29*step);matrix.setPosition(.002*step,-.001*step,.04+step*.001);
  const actual=closestParentMetal([mesh],source,matrix,.1);let expected=.1;
  for(const a of aa)for(const b of bb){const one=parent(b);try{expected=Math.min(expected,closestParentMetal([one],metal(a),matrix,.1));}finally{one.geometry.dispose();one.material.dispose();}}
  assert(Math.abs(actual-expected)<1e-12,`complete hierarchy ${actual}, exhaustive pairs ${expected}`);
 }}finally{mesh.geometry.dispose();mesh.material.dispose();}
});

test('lazy original-metal data retains every shipped non-jaw CAD vertex and face without decimation',async()=>{
 const data=await loadBodyTriangleGeometry(),bytes=fs.readFileSync(new URL('../public/assets/scissors.glb',import.meta.url)),meshes=readGlbGeometry(bytes);
 assert.equal(SOURCE_SHA256,createHash('sha256').update(bytes).digest('hex'));
 for(const [link,body]of data){
  const names=new Set(INSTRUMENT_COLLISION_DATA.scissors.capsules.filter(c=>c.link===link&&c.region!=='jaw').flatMap(c=>c.source)),original=meshes.filter(m=>m.link===link&&names.has(m.name));
  assert.equal(body.indices.length,original.reduce((n,m)=>n+m.indices.length,0));assert.deepEqual(body.positions,new Float32Array(original.flatMap(m=>m.points.flat())));
  assert.equal(body.tree.triangles.length,body.indices.length/3);
 }
});
