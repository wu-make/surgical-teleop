import test from 'node:test';
import assert from 'node:assert/strict';
import {selectWoundSurface} from '../src/wound-surface.js';
import {selectWoundSurface as reference} from './fixtures/wound-selection-reference.mjs';

test('prefiltered capsule selection preserves every node, source area and edge, including order and fragment ownership',()=>{
  let seed=17;const random=()=>((seed=Math.imul(seed,1664525)+1013904223>>>0)/2**32);
  const surface=(count,cutCount)=>{
    const records=n=>Float64Array.from(Array.from({length:n},()=>{const x=Math.round((random()-.5)*65)*.0025,y=Math.round((random()-.5)*50)*.0025,z=Math.round((random()-.5)*40)*.0025;return[x,y,z,random()-.5,random()-.5,random()-.5,random()*6.25,random()*6.25];}).flat());
    return{cuts:records(cutCount),capsule:records(count)};
  };
  for(const cutCount of [0,1,20,100,400]){
    const chunks=Array.from({length:16},()=>surface(1200,cutCount)),fragments=[{id:'specimen-1',surface:surface(50,60)}];
    assert.deepEqual(selectWoundSurface(chunks),reference(chunks));
    assert.deepEqual(selectWoundSurface(chunks,fragments),reference(chunks,fragments));
    assert.deepEqual(selectWoundSurface(chunks.values(),fragments.values()),reference(chunks,fragments));
  }
});
