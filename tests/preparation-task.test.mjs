import test from 'node:test';
import assert from 'node:assert/strict';
import {yieldPreparationTask} from '../src/preparation-task.js';
import {runCooperatively} from '../src/cooperative-work.js';

test('loading slices retain every ordered unit without depending on animation-frame delivery',async()=>{
  let scheduled=0,clock=0;const order=[],scheduler={postTask:async(fn,options)=>{assert.equal(options.priority,'background');scheduled++;return fn();}};
  function* work(){for(let i=0;i<36;i++){order.push(i);clock++;yield;}return 'complete';}
  const result=await runCooperatively(work(),{budgetMs:3,now:()=>clock,yieldFrame:()=>yieldPreparationTask({scheduler})});
  assert.deepEqual(order,Array.from({length:36},(_,i)=>i));assert.equal(result.value,'complete');assert(result.stats.maxSliceMs<=3);assert(scheduled>=12);
});
test('preparation falls back to a task message and closes its ports when priority scheduling is unavailable',async()=>{
  let closed=0,messages=0;class Channel{constructor(){this.port1={close:()=>closed++};this.port2={close:()=>closed++,postMessage:()=>queueMicrotask(()=>{messages++;this.port1.onmessage();})};}}
  await yieldPreparationTask({scheduler:{postTask:()=>Promise.reject(new Error('unavailable'))},Channel});assert.equal(messages,1);assert.equal(closed,2);
});
