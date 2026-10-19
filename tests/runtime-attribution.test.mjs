import test from 'node:test';
import assert from 'node:assert/strict';
import {RuntimeAttribution} from '../src/runtime-attribution.js';
test('task-queue probe preserves real timer/message delays without scheduling an unbounded message loop',()=>{
  let now=0,tick;const samples=[],channels=[];class Channel{constructor(){channels.push(this);this.port1={close(){}};this.port2={postMessage(){},close(){}};}}
  const p=new RuntimeAttribution({now:()=>now,schedule:fn=>(tick=fn,1),cancel(){},Channel,document:{hidden:false,hasFocus:()=>true},target:null,onSample:s=>samples.push(s)});
  p.afterFrame(0);p.afterFrame(1);assert.equal(p.messagePending.raf,0);now=103.1;channels[0].port1.onmessage();tick();
  assert.equal(samples.find(s=>s.type==='message').ms,103.1);assert.equal(samples.find(s=>s.type==='timer').lateMs,87.1);p.dispose();
});
test('GPU probe never reads an unavailable result, waits, or flushes and releases all resources',()=>{
  let now=0,ready=false,fenceReady=false,deleted=0,reads=0;const ext={TIME_ELAPSED_EXT:1,GPU_DISJOINT_EXT:2},gl={SYNC_GPU_COMMANDS_COMPLETE:3,ALREADY_SIGNALED:4,CONDITION_SATISFIED:5,WAIT_FAILED:6,QUERY_RESULT_AVAILABLE:7,QUERY_RESULT:8,getExtension:()=>ext,createQuery:()=>({}),beginQuery(){},endQuery(){},fenceSync:()=>({}),getParameter:()=>false,clientWaitSync(s,flags,timeout){assert.equal(flags,0);assert.equal(timeout,0);return fenceReady?4:0;},getQueryParameter(q,key){if(key===7)return ready;assert(ready);reads++;return 2500000;},deleteQuery(){deleted++;},deleteSync(){deleted++;},flush(){throw new Error('no flush');},finish(){throw new Error('no finish');}};
  const p=new RuntimeAttribution({gl,measureGpu:true,now:()=>now,schedule:()=>1,cancel(){},Channel:null,document:null,target:null});const sample=p.begin(12);p.end(sample);now=16;p.poll();assert.equal(reads,0);assert.equal(p.pending.length,1);ready=fenceReady=true;now=32;p.poll();assert.equal(reads,1);assert.equal(p.rows.at(-1).gpuMs,2.5);assert.equal(p.rows.at(-1).completionUpperBoundMs,32);assert.equal(deleted,2);assert.equal(p.begin(150),null);p.dispose();
});
test('missing optional GPU extensions and message API cannot prevent rendering or timer observations',()=>{
  const p=new RuntimeAttribution({gl:{getExtension:()=>null},schedule:()=>1,cancel(){},Channel:null,document:null,target:null});assert.equal(p.begin(1),null);p.end(null);p.poll();assert.equal(p.report().gpuTimerSupported,false);p.dispose();
});

test('independent worker timestamps separate worker scheduling from delivery delay and stop after disposal',()=>{
  let instance,now=900,terminated=false;
  class Worker{constructor(url,options){assert.equal(url,'probe.js');assert.equal(options.type,'module');instance=this;}terminate(){terminated=true;}}
  const p=new RuntimeAttribution({workerUrl:'probe.js',WorkerClass:Worker,timeOrigin:10000,now:()=>now,schedule:()=>1,cancel(){},Channel:null,document:{hidden:false,hasFocus:()=>true},target:null});
  // The other context kept ticking, but its message waited800ms on this one.
  instance.onmessage({data:{origin:10050,at:50,intervalMs:50}});
  assert.equal(p.rows.at(-1).start,100);assert.equal(p.rows.at(-1).workerIntervalMs,50);assert.equal(p.rows.at(-1).deliveryDelayMs,800);assert.equal(p.rows.at(-1).focused,true);
  p.dispose();assert(terminated);const count=p.rows.length;now=1000;instance.onmessage({data:{origin:10050,at:100,intervalMs:50}});assert.equal(p.rows.length,count);
});
