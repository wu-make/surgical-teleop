import test from 'node:test';
import assert from 'node:assert/strict';
import {FrameMetrics} from '../src/frame-metrics.js';
test('frame diagnostics include slow frames without simulation-time clamping and separate cutting from other phases',()=>{
  const metrics=new FrameMetrics();for(let i=0;i<99;i++)metrics.record(1000/60,'cutting');metrics.record(200,'cutting');metrics.record(16,'pressure');metrics.record(NaN,'cutting');const data=metrics.summarize();assert.equal(data.cutting.frames,100);assert.equal(data.cutting.over50ms,1);assert.equal(data.cutting.p99Ms,1000/60);assert(data.cutting.averageFps<60);assert.equal(data.pressure.frames,1);metrics.clear();assert.deepEqual(metrics.summarize(),{});
});
test('frame diagnostics retain a bounded recent window',()=>{const metrics=new FrameMetrics(3);metrics.record(200,'cutting');for(let i=0;i<3;i++)metrics.record(20,'cutting');const data=metrics.summarize();assert.equal(data.cutting.frames,3);assert.equal(data.cutting.averageFps,50);assert.equal(data.cutting.over50ms,0);});
