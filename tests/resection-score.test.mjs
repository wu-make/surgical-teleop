import test from 'node:test';
import assert from 'node:assert/strict';
import {resectionScore,targetShareLabel} from '../src/resection-score.js';

test('completion credits only removed or truly detached target volume, not traction or cut count',()=>{
  assert.deepEqual(resectionScore({totalMm3:100,attachedMm3:100,detachedMm3:0,excisedMm3:0,cutCount:900}),{complete:false,percent:0,points:0});
  assert.deepEqual(resectionScore({totalMm3:100,attachedMm3:37.5,detachedMm3:60,excisedMm3:2.5}),{complete:false,percent:62.5,points:62});
  assert.deepEqual(resectionScore({totalMm3:100,attachedMm3:0,detachedMm3:97.5,excisedMm3:2.5}),{complete:true,percent:100,points:100});
  const tinyRemainder=resectionScore({totalMm3:100,attachedMm3:1e-10,detachedMm3:100-1e-10,excisedMm3:0});
  assert.equal(tinyRemainder.complete,false);assert.equal(tinyRemainder.percent,99.9);assert.equal(tinyRemainder.points,99);
});

test('small but nonzero remaining targets cannot be formatted as zero or partial specimens as fully removed',()=>{
  assert.equal(targetShareLabel(13.5,12349.125),'0.1%');
  assert.equal(targetShareLabel(.421875,4344.46875),'<0.1%');
  assert.equal(targetShareLabel(4344.046875,4344.46875),'>99.9%');
  assert.equal(targetShareLabel(0,100),'0%');assert.equal(targetShareLabel(100,100),'100%');
  assert.equal(targetShareLabel(24.55,100),'24.6%');
  for(const pair of [[NaN,100],[-1,100],[2,1],[1,0]])assert.equal(targetShareLabel(...pair),'—');
});

test('state-derived scores reverse on undo, redo, reset and scenario switch',()=>{
  const start={totalMm3:200,attachedMm3:200,detachedMm3:0,excisedMm3:0},partial={...start,attachedMm3:120,detachedMm3:72,excisedMm3:8},done={...start,attachedMm3:0,detachedMm3:192,excisedMm3:8};
  assert.deepEqual([start,partial,done,partial,done,start,{...start,totalMm3:50,attachedMm3:50}].map(s=>resectionScore(s).points),[0,40,100,40,100,0,0]);
  for(const status of [null,{}, {...start,totalMm3:0},{...start,attachedMm3:NaN},{...start,detachedMm3:-1},{...start,attachedMm3:0}])assert.equal(resectionScore(status),null);
});

