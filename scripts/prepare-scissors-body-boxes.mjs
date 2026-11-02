import fs from 'node:fs/promises';
import{readGlbGeometry,clippedPoints,COLLISION_MARGIN}from'../scripts/prepare-instrument-collision.mjs';
import{INSTRUMENT_COLLISION_DATA}from'../src/instrument-collision-data.js';
const model=INSTRUMENT_COLLISION_DATA.scissors,meshes=readGlbGeometry(await fs.readFile('public/assets/scissors.glb')),boxes={};
for(const c of model.capsules){if(c.region==='jaw')continue;const points=clippedPoints(meshes.filter(m=>m.link===c.link&&c.source.includes(m.name)),c.slab.axis,c.slab.min,c.slab.max),min=[0,1,2].map(i=>Math.min(...points.map(p=>p[i]))-COLLISION_MARGIN),max=[0,1,2].map(i=>Math.max(...points.map(p=>p[i]))+COLLISION_MARGIN);boxes[c.id]={link:c.link,min,max};}
await fs.writeFile('src/scissors-body-boxes.js','// Additional conservative bounds of every clipped source CAD triangle. Units: m.\nexport const SCISSORS_BODY_BOXES='+JSON.stringify(boxes)+';\n');
console.log(Object.entries(boxes).filter(([id])=>id.startsWith('wrist-wrist')).map(([id,b])=>({id,sizeMm:b.max.map((v,i)=>+(1000*(v-b.min[i])).toFixed(2)),capsuleDiameterMm:1000*model.capsules.find(c=>c.id===id).radius*2})));
