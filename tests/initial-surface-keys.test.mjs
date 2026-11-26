import test from 'node:test';
import assert from 'node:assert/strict';
import {allChunkKeys,initialSurfaceKeys,createVolumeState,buildChunks,applyCapsuleCut} from '../src/tissue-worker.js';

test('initial surface filtering preserves shared faces, partial tiles and newly exposed interior geometry',()=>{
  const dims=[21,22,23],values=new Float32Array(dims[0]*dims[1]*dims[2]);
  for(let z=0,i=0;z<dims[2];z++)for(let y=0;y<dims[1];y++)for(let x=0;x<dims[0];x++,i++){
    // Exact zero on a shared high face is outside, as in polygonizeChunk.
    values[i]=(x-16)*.001;
  }
  const make=()=>createVolumeState({dims,spacing:.001,origin:[0,0,0]},values,4);
  const fast=make(),full=make(),keys=initialSurfaceKeys(fast);
  const visible=chunks=>chunks.filter(chunk=>chunk.indices.length);
  assert.ok(keys.length<allChunkKeys(full).length);
  assert.deepEqual(visible(buildChunks(fast,keys)),visible(buildChunks(full,allChunkKeys(full))));
  const cut={a:[.006,.008,.012],b:[.010,.008,.013],radius:.0025};
  const edited=visible(buildChunks(fast,applyCapsuleCut(fast,cut).dirty));
  assert.ok(edited.some(chunk=>!keys.includes(chunk.key)));
  assert.deepEqual(edited,visible(buildChunks(full,applyCapsuleCut(full,cut).dirty)));
});
