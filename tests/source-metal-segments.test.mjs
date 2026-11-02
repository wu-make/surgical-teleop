import test from'node:test';import assert from'node:assert/strict';import fs from'node:fs';
import{BufferGeometry,Float32BufferAttribute,Mesh,Matrix4,Triangle,Vector3}from'three';
import{loadBodyTriangleGeometry,bodyTriangleGeometry}from'../src/scissors-body-catalogue.js';
import{INSTRUMENT_COLLISION_DATA}from'../src/instrument-collision-data.js';
import{readGlbGeometry}from'../scripts/prepare-instrument-collision.mjs';
import{closestParentMetal}from'../src/tissue-contact.js';

test('query segments retain the complete original metal surface and contain only original triangle fragments',async()=>{
 const full=await loadBodyTriangleGeometry({segmentBodies:true}),caps=INSTRUMENT_COLLISION_DATA.scissors.capsules.filter(c=>c.region!=='jaw');
 for(const c of caps){
  const part=bodyTriangleGeometry(c.id);assert(part,`prepare the exact ${c.id} surface rather than rechecking its complete URDF link`);
  const source=full.get(c.link),a=new Triangle(),point=new Vector3(),nearest=new Vector3();assert(part.indices.length>0);
  for(let face=0;face<part.indices.length/3;face++){
   const original=part.sourceFaces[face];a.a.fromArray(source.positions,source.indices[original*3]*3);a.b.fromArray(source.positions,source.indices[original*3+1]*3);a.c.fromArray(source.positions,source.indices[original*3+2]*3);
   for(let j=0;j<3;j++){point.fromArray(part.positions,part.indices[face*3+j]*3);a.closestPointToPoint(point,nearest);assert(point.distanceTo(nearest)<2e-10,'clipping cannot replace a source face with a synthetic cap');assert(point.getComponent(c.slab.axis)>=c.slab.min-2e-9&&point.getComponent(c.slab.axis)<=c.slab.max+2e-9);}
  }
 }
 const meshes=readGlbGeometry(fs.readFileSync(new URL('../public/assets/scissors.glb',import.meta.url)));
 for(const mesh of meshes){const owned=caps.filter(c=>c.link===mesh.link&&c.source.includes(mesh.name));if(!owned.length)continue;
  const axis=owned[0].slab.axis;assert(owned.every(c=>c.slab.axis===axis));const ranges=owned.map(c=>[c.slab.min-1e-9,c.slab.max+1e-9]).sort((a,b)=>a[0]-b[0]);
  let lo=ranges[0][0],hi=ranges[0][1];for(const range of ranges.slice(1)){assert(range[0]<=hi,'no original surface interval may be omitted');hi=Math.max(hi,range[1]);}
  for(const point of mesh.points)assert(point[axis]>=lo&&point[axis]<=hi,'the segment union covers every original face, including its full interior');
 }
});

test('the minimum of complete metal segments agrees with the unsplit original CAD query',async()=>{
 const full=await loadBodyTriangleGeometry({segmentBodies:true}),caps=INSTRUMENT_COLLISION_DATA.scissors.capsules.filter(c=>c.region!=='jaw');
 for(const tilt of[0,.7]){
  const g=new BufferGeometry();g.setAttribute('position',new Float32BufferAttribute([-.6,-.6,.004,.6,-.6,.004,0,.6,.004],3));g.setIndex([0,1,2]);g.computeBoundingBox();const mesh=new Mesh(g),matrix=new Matrix4().makeRotationY(tilt);matrix.setPosition(.001,.002,0);
  try{for(const [link,body]of full){const expected=closestParentMetal([mesh],body,matrix,.02);let actual=.02;for(const c of caps.filter(c=>c.link===link))actual=Math.min(actual,closestParentMetal([mesh],bodyTriangleGeometry(c.id),matrix,.02));assert(Math.abs(actual-expected)<2e-10,`${link}: complete ${expected}, segments ${actual}`);}}finally{g.dispose();mesh.material.dispose();}
 }
});
