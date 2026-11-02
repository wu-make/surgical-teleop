import test from 'node:test';import assert from 'node:assert/strict';
import{createHash}from'node:crypto';import{createVolumeState,allChunkKeys,applyCapsuleCut,polygonizeChunk,normalizeDeformation}from'../src/tissue-worker.js';
export function meshingFixture(held=false){const n=25,spacing=.0015,origin=-.018,field=new Float32Array(n**3);for(let z=0;z<n;z++)for(let y=0;y<n;y++)for(let x=0;x<n;x++)field[x+n*(y+n*z)]=Math.hypot(origin+x*spacing,origin+y*spacing,origin+z*spacing)-.013;const state=createVolumeState({dims:[n,n,n],spacing:[spacing,spacing,spacing],origin:[origin,origin,origin]},field,8);const deformation=held?normalizeDeformation({model:'local-flow',local:[0,0,.012],displacement:[0,0,.027]}):null;applyCapsuleCut(state,{a:[-.01,0,held?.026:0],b:[.01,0,held?.026:0],radius:.00165,deformation});return state;}
export function meshHash(state,metrics){const hash=createHash('sha256');for(const key of allChunkKeys(state)){const mesh=polygonizeChunk(state,key,{metrics});for(const name of ['positions','normals','colors','cutMasks','indices'])hash.update(new Uint8Array(mesh[name].buffer));}return hash.digest('hex');}

test('shared tetrahedral intersections are computed once per directed grid edge with byte-identical cut and raised surfaces',()=>{
  const expected=['e7a7fb9c6ed21256de4dab809ea26bc961a037dbcd3d23c3949229a603591e9f','f4a9858f9babe8c4bca08b1a30a854f3aa5e21c95c58441e28ae758f28923b5d'];
  for(const held of [false,true]){const metrics={};assert.equal(meshHash(meshingFixture(held),metrics),expected[Number(held)]);assert(metrics.intersectionReuses>metrics.intersectionBuilds,'repeated tetrahedra must reuse exact attributes rather than recalculate them');}
});
