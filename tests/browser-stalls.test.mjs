import test from 'node:test';
import assert from 'node:assert/strict';
import {BrowserStalls} from '../src/browser-stalls.js';
import {IncidentJournal} from '../src/incident-journal.js';

test('browser attribution preserves actual long work and isolates reset epochs',()=>{
  let now=100;const callbacks=[];
  class Observer {static supportedEntryTypes=['long-animation-frame','longtask'];constructor(fn){callbacks.push(fn);}observe(){}disconnect(){}}
  const d=new BrowserStalls(Observer,()=>now);
  d.span('animate',105,140);d.span('updateUI',141,143);
  callbacks[0]({getEntries:()=>[{entryType:'long-animation-frame',startTime:101,duration:157.5,renderStart:103,scripts:[{startTime:105,duration:35,invoker:'Window.requestAnimationFrame',sourceFunctionName:'animate'}]}]});
  assert.equal(d.report().worst[0].ms,157.5);assert.equal(d.report().worst[0].work.length,1);assert.equal(d.report().worst[0].scripts[0].function,'animate');
  for(let i=0;i<80;i++)d.accept([{entryType:'longtask',startTime:200+i,duration:51}]);
  assert.equal(d.recent.length,64);assert.equal(d.worst[0].ms,157.5);assert.equal(d.counts.longtask,80);
  now=999;d.clear();d.accept([{entryType:'longtask',startTime:500,duration:200}]);assert.equal(d.recent.length,0);
  d.dispose();
});
test('optional browser timing API absence does not affect the application',()=>{const d=new BrowserStalls(undefined,()=>0);assert.deepEqual(d.report().supported,[]);d.dispose();});

test('RAF gaps distinguish callback work from time before the next callback without assigning an unsupported cause',()=>{
  const d=new BrowserStalls(undefined,()=>0),previous={start:100,end:112,eligible:true,renderMs:8};d.span('tissue-receive',150,170);
  d.raf(99,256.5,260,previous,true);previous.renderMs=999;
  const gap=d.report().rafGaps[0];assert.equal(gap.ms,157.5);assert.equal(gap.betweenCallbacksMs,148);assert.equal(gap.dispatchDelayMs,3.5);assert.equal(gap.previousFrame.renderMs,8);assert.equal(gap.work[0].name,'tissue-receive');
  d.raf(300,900,901,{...previous,eligible:false},true);assert.equal(d.rafGaps.length,1);d.clear();assert.equal(d.rafGaps.length,0);
});
test('detached browser reports cannot change while an asynchronous session export is in flight',()=>{
  const d=new BrowserStalls(undefined,()=>0);d.accept([{entryType:'longtask',startTime:2,duration:120}]);const snapshot=d.report({detach:true});
  d.accept([{entryType:'longtask',startTime:200,duration:180}]);d.worst[0].ms=999;assert.equal(snapshot.recent.length,1);assert.equal(snapshot.worst[0].ms,120);assert.equal(snapshot.counts.longtask,1);
});

test('a first-input long frame crossing the reset boundary is preserved in full instead of silently discarded',()=>{
  let now=100;const d=new BrowserStalls(undefined,()=>now);d.accept([{entryType:'long-animation-frame',startTime:90,duration:157.5}]);
  assert.equal(d.worst[0].ms,157.5);assert.equal(d.worst[0].overlapsReset,true);now=1000;d.clear();d.accept([{entryType:'longtask',startTime:90,duration:157.5}]);assert.equal(d.recent.length,0);
});

test('each slow incident keeps its original context and late observer attribution after rolling lists expire',()=>{
  const d=new BrowserStalls(undefined,()=>0),frame={ms:157.5,phase:'cutting',work:{endedAt:200,render:{batchMs:4}}};
  d.captureFrame(frame,[{endedAt:30,ms:16},{endedAt:200,ms:157.5}]);frame.work.render.batchMs=999;
  d.accept([{entryType:'long-animation-frame',startTime:40,duration:157.5,scripts:[{duration:100,sourceFunctionName:'animate'}]}]);
  for(let i=0;i<100;i++)d.accept([{entryType:'longtask',startTime:1000+i*300,duration:250}]);
  const report=d.report({detach:true});assert.equal(report.incidents.length,1);assert.equal(report.incidents[0].frame.work.render.batchMs,4);assert.equal(report.incidents[0].browser[0].ms,157.5);assert.equal(report.incidents[0].intervals.length,2);assert.equal(report.droppedIncidents,0);assert.equal(d.report({compact:true}).incidents,undefined);
  d.clear();assert.equal(d.incidentCount,0);
});
test('the complete callback following a stall is attached after render and remains detached',()=>{
  const d=new BrowserStalls(undefined,()=>0);d.captureFrame({ms:103.1,phase:'manipulation',work:{endedAt:203.1}});
  const frame={raf:203.1,start:207,end:237,renderMs:17};d.finishFrame(frame);frame.renderMs=999;
  assert.equal(d.report().incidents[0].followingFrame.renderMs,17);assert.equal(d.unfinished.size,0);
});

test('worker journal retains every context beyond 128, including late attribution to evicted main-thread rows',()=>{
  const journal=new IncidentJournal(),d=new BrowserStalls(undefined,()=>0);
  d.setArchive(message=>journal.accept(structuredClone(message)));
  for(let i=1;i<=600;i++){
    d.captureFrame({ms:72.6,phase:'cutting',work:{endedAt:i*100,render:{i}}});
    d.finishFrame({raf:i*100,start:i*100+1,end:i*100+12,renderMs:7});
  }
  assert.equal(d.incidents.length,32);assert.equal(d.incidentCount,600);assert.equal(d.droppedIncidents,0);
  d.accept([{entryType:'long-animation-frame',startTime:70,duration:61,scripts:[{sourceFunctionName:'late-original-event'}]}]);
  d.runtimeSample({type:'gpu',start:80,end:130,raf:80,gpuMs:65});
  const report=d.report({detach:true});journal.hydrate(report);
  assert.equal(report.incidents.length,600);assert.equal(report.archive.complete,true);
  assert.equal(report.incidents[0].followingFrame.renderMs,7);
  assert.equal(report.incidents[0].browser[0].scripts[0].function,'late-original-event');
  assert.equal(report.incidents[0].runtime[0].gpuMs,65);
  assert.deepEqual(report.incidents.map(x=>x.id),Array.from({length:600},(_,i)=>i+1));
  d.clear();assert.equal(d.report().incidentCount,0);assert.equal(journal.snapshot(report.archive.epoch,600).length,600);
  assert.throws(()=>journal.snapshot(d.epoch,1),/count mismatch/);
});

test('without an archive the fallback retains all contexts rather than silently dropping event 129',()=>{
  const d=new BrowserStalls(undefined,()=>0);for(let i=1;i<=160;i++)d.captureFrame({ms:54,phase:'cutting',work:{endedAt:i*60}});
  assert.equal(d.report().incidents.length,160);assert.equal(d.report().droppedIncidents,0);
});
