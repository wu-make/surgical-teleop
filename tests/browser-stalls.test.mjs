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
