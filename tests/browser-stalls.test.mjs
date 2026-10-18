import test from 'node:test';
import assert from 'node:assert/strict';
import {BrowserStalls} from '../src/browser-stalls.js';

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
