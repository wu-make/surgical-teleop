import test from 'node:test';
import assert from 'node:assert/strict';
import {incidentEvidence} from '../src/incident-evidence.js';
test('historical gaps without independent observations cannot be retroactively assigned a cause',()=>{
  const e=incidentEvidence({start:100,end:203.1,frame:{work:{previousFrame:{end:114,raf:100}}},browser:[]});assert.equal(e.mainThreadResponsiveDuringGap,false);assert.equal(e.maxTimerIntervalMs,null);assert.match(e.interpretation,/historical/);
});

test('completed following callback supplies arrival after the worst-eight gap list has moved on',()=>{
  const e=incidentEvidence({start:100,end:154.6,followingFrame:{start:162},rafGaps:[],frame:{work:{previousFrame:{end:150,raf:100}}},runtime:[],browser:[]});
  assert.equal(e.gapAfterPreviousCallbackMs,12);
});

test('an intervening unrendered RAF must not hide the exact preceding rendered GPU sample',()=>{
  const e=incidentEvidence({start:100,end:172.7,followingFrame:{start:177},frame:{work:{previousFrame:{end:112,raf:106,rendered:false},previousRenderedFrame:{end:109,raf:100,rendered:true}}},runtime:[{type:'gpu',raf:100,start:102,end:200,gpuMs:67.5,fenceReadyAt:200}],browser:[]});
  assert.equal(e.exactPreviousFrameGpu.length,0);assert.equal(e.exactPreviousRenderedFrameGpu[0].gpuMs,67.5);assert.equal(e.exactPreviousRenderedFrameGpu[0].completedBeforeNextCallback,false);assert.equal(e.nearbySampledGpu.length,0);
});
test('responsive timers and completed exact-frame GPU work remain distinct from nearby samples',()=>{
  const e=incidentEvidence({start:100,end:203.1,rafGaps:[{end:203.1,entered:207}],frame:{work:{previousFrame:{end:114,raf:100}}},browser:[],runtime:[130,146,162,178,194].map(end=>({type:'timer',start:end-16,end,ms:16})).concat([{type:'gpu',raf:100,start:102,end:135,gpuMs:3,fenceReadyAt:135,completionUpperBoundMs:20},{type:'gpu',raf:80,start:82,end:110,gpuMs:7,fenceReadyAt:110}])});
  assert.equal(e.gapAfterPreviousCallbackMs,93);assert.equal(e.mainThreadResponsiveDuringGap,true);assert.equal(e.exactPreviousFrameGpu[0].completedBeforeNextCallback,true);assert.equal(e.nearbySampledGpu.length,1);assert.match(e.interpretation,/not established/);
});
