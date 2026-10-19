import test from 'node:test';
import assert from 'node:assert/strict';
import {FrameMetrics} from '../src/frame-metrics.js';

test('completed evidence windows stop consuming per-frame work without losing their raw intervals',()=>{
  const m=new FrameMetrics(7200);
  for(let i=1;i<=500;i++){
    const at=i*2000;m.record(16,'cutting',null,at);m.pinWindow('stall-'+i,at,{beforeMs:20,afterMs:40});
    m.record(16,'cutting',null,at+16);m.record(16,'cutting',null,at+32);m.record(16,'cutting',null,at+48);m.record(16,'cutting',null,at+80);
    assert.equal(m.activeWindows.size,0);
  }
  const windows=m.report().pinnedWindows;assert.equal(windows.length,500);
  for(const window of windows)assert.deepEqual(window.intervals.map(x=>x.endedAt-window.at),[0,16,32,48]);
});
test('worst frame context survives replacement of the recent slow-frame ring',()=>{
  const metrics=new FrameMetrics(3);let captures=0;metrics.record(157.5,'cutting',()=>{captures++;return{endedAt:1200,bloodMs:130};});
  for(let i=0;i<80;i++)metrics.record(36,'cutting',()=>{captures++;return{endedAt:1300+i};});
  const report=metrics.report();assert.equal(report.slowFrames.length,64);assert.equal(report.worstFrames[0].ms,157.5);assert.equal(report.worstFrames[0].work.bloodMs,130);assert.equal(captures,81,'capture once per slow frame');
  report.worstFrames[0].work.bloodMs=0;assert.equal(metrics.report().worstFrames[0].work.bloodMs,130);metrics.clear();assert.deepEqual(metrics.worstFrames,[]);
});
test('frame diagnostics include slow frames without simulation-time clamping and separate cutting from other phases',()=>{
  const metrics=new FrameMetrics();for(let i=0;i<99;i++)metrics.record(1000/60,'cutting');metrics.record(200,'cutting');metrics.record(16,'pressure');metrics.record(NaN,'cutting');const data=metrics.summarize();assert.equal(data.cutting.frames,100);assert.equal(data.cutting.over50ms,1);assert.equal(data.cutting.p99Ms,1000/60);assert(data.cutting.averageFps<60);assert.equal(data.pressure.frames,1);metrics.clear();assert.deepEqual(metrics.summarize(),{});
});
test('frame diagnostics retain a bounded recent window',()=>{const metrics=new FrameMetrics(3);metrics.record(200,'cutting');for(let i=0;i<3;i++)metrics.record(20,'cutting');const data=metrics.summarize();assert.equal(data.cutting.frames,3);assert.equal(data.cutting.averageFps,50);assert.equal(data.cutting.over50ms,0);});

test('raw frame timestamps identify separation intervals even after cutting switches off',()=>{
  const metrics=new FrameMetrics();metrics.sample(100,'cutting');metrics.sample(116,'cutting');metrics.sample(170.6,'manipulation');metrics.sample(187,'manipulation');
  const rows=metrics.report({includeIntervals:true}).recentWindow.intervals;
  assert.deepEqual(rows.map(r=>r.endedAt),[116,170.6,187]);
  assert.equal(rows.filter(r=>r.endedAt>=120&&r.endedAt-r.ms<=175).length,2);
  assert.equal(metrics.report().session.manipulation.over50ms,1,'phase switch must not conceal the conversion stall');
});

test('session counters retain old stalls after the recent ring wraps, and exported intervals are chronological copies',()=>{
  const metrics=new FrameMetrics(3);for(const ms of [200,10,20,30,40])metrics.record(ms,'cutting');metrics.record(16,'pressure');
  const report=metrics.report({includeIntervals:true});assert.equal(report.session.cutting.frames,5);
  assert.equal(report.session.cutting.over50ms,1);assert.equal(report.session.cutting.maxMs,200);
  assert.equal(report.recentWindow.phases.cutting.maxMs,40);
  assert.deepEqual(report.recentWindow.intervals.map(row=>row.ms),[30,40,16]);
  report.session.cutting.maxMs=0;report.recentWindow.intervals[0].ms=0;
  assert.equal(metrics.report().session.cutting.maxMs,200);assert.equal(metrics.rows[0].ms,30);
  metrics.clear();assert.deepEqual(metrics.report().session,{});assert.deepEqual(metrics.summarize(),{});
});

test('hidden, paused and restoration gaps do not leak into resumed frame measurements',()=>{
  const metrics=new FrameMetrics();metrics.sample(0,'cutting');metrics.sample(20,'cutting');
  metrics.sample(1020,'cutting',false);metrics.sample(3000,'cutting');metrics.sample(3016,'cutting');
  metrics.sample(3017,'cutting',false);metrics.sample(4000,'pressure');metrics.sample(4018,'pressure');
  const report=metrics.report();assert.equal(report.session.cutting.frames,2);assert.equal(report.session.cutting.maxMs,20);
  assert.equal(report.session.pressure.frames,1);assert.equal(report.session.pressure.maxMs,18);
  metrics.clear();metrics.sample(9999,'pressure');assert.deepEqual(metrics.report().session,{});
});

test('slow-frame work is captured lazily, bounded, detached from live state and cleared on reset',()=>{
  const metrics=new FrameMetrics();let calls=0;const state={receiveMs:7};const work=()=>{calls++;return state;};
  metrics.sample(0,'cutting',true,work);metrics.sample(16,'cutting',true,work);assert.equal(calls,0);
  metrics.sample(76,'cutting',true,work);state.receiveMs=0;
  assert.equal(metrics.report().slowFrames[0].work.receiveMs,7);
  for(let i=0;i<80;i++)metrics.record(60,'cutting',work);
  assert.equal(metrics.report().slowFrames.length,64);assert.equal(metrics.report().session.cutting.over50ms,81);
  metrics.clear();assert.deepEqual(metrics.report().slowFrames,[]);
});

test('fullscreen acceptance exports actual resolution transitions without duplicating unchanged frames',()=>{
  const metrics=new FrameMetrics();metrics.observePresentation(false,949,612,1,0);
  metrics.observePresentation(true,1920,1080,1,100);metrics.observePresentation(true,1920,1080,1,120100);
  metrics.observePresentation(false,949,612,1,120200);
  assert.equal(metrics.report().presentationChanges.length,3);assert.equal(metrics.report().presentationChanges[1].fullscreen,true);
  metrics.clear();assert.deepEqual(metrics.report().presentationChanges,[]);
});

test('cut transition windows retain raw preceding and following intervals after the recent ring expires',()=>{
  const m=new FrameMetrics(4);for(let t=16;t<=160;t+=16)m.record(16,'cutting',null,t);
  m.pinWindow('separation',150,{beforeMs:40,afterMs:60});m.pinWindow('separation',150,{beforeMs:40,afterMs:60});
  for(let t=176;t<=800;t+=16)m.record(16,'manipulation',null,t);
  const report=m.report({includeIntervals:true});assert.equal(report.pinnedWindows.length,1);assert.deepEqual(report.pinnedWindows[0].intervals.map(r=>r.endedAt),[112,128,144,160,176,192,208,224]);
  assert(report.recentWindow.intervals.every(r=>r.endedAt>700));report.pinnedWindows[0].intervals[0].ms=999;assert.equal(m.report().pinnedWindows[0].intervals[0].ms,16);m.clear();assert.deepEqual(m.report().pinnedWindows,[]);
});
test('long-frame evidence callbacks run after recording the anomalous interval exactly once',()=>{
  const m=new FrameMetrics();m.onLongFrame=row=>m.pinWindow('stall',row.work.endedAt,{beforeMs:200,afterMs:50});
  m.record(16,'cutting',null,100);m.record(157.5,'cutting',()=>({endedAt:257.5}),257.5);m.record(16,'cutting',null,273.5);
  assert.deepEqual(m.report().pinnedWindows[0].intervals.map(r=>r.ms),[16,157.5,16]);
});
