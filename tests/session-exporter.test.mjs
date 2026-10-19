import test from 'node:test';
import assert from 'node:assert/strict';
import {Worker} from 'node:worker_threads';
import {SessionExporter} from '../src/session-exporter.js';
import {BrowserStalls} from '../src/browser-stalls.js';
test('real background worker exports a complete coherent session without mutating live arrays',async()=>{
  const target=new URL('../src/session-export-worker.js',import.meta.url).href;
  const source=`import {parentPort} from 'node:worker_threads';globalThis.self={postMessage:value=>parentPort.postMessage(value)};await import(${JSON.stringify(target)});parentPort.on('message',data=>self.onmessage({data}));`;
  const thread=new Worker(new URL('data:text/javascript,'+encodeURIComponent(source)));
  const adapter={postMessage:data=>thread.postMessage(data),terminate:()=>thread.terminate()};thread.on('message',data=>adapter.onmessage?.({data}));thread.on('error',error=>adapter.onerror?.(error));
  const exporter=new SessionExporter(adapter,{yieldFrame:()=>new Promise(setImmediate)});
  try{const data={cuts:Array.from({length:1800},(_,i)=>({i,path:Array.from({length:40},(_,j)=>[i*.001,j*.0001,.5])})),blood:{nodes:[{fragmentId:'piece-1',volume:1.2}],drops:[{reference:[1,2,3],surface:true}]},intervals:Array.from({length:7200},(_,i)=>({endedAt:i*16.7,ms:16.7}))};
    const expected=structuredClone(data),pending=exporter.encode(data);data.cuts[0].path[0][0]=999;data.blood.nodes[0].volume=0;
    const blob=await pending;assert.equal(blob.type,'application/json');assert.deepEqual(JSON.parse(await blob.text()),expected);assert.equal(exporter.pending.size,0);
  }finally{exporter.dispose();}
});
test('export failure rejects and allows a subsequent export',async()=>{const worker={postMessage(){throw new Error('clone failed');},terminate(){}};const e=new SessionExporter(worker,{yieldFrame:()=>new Promise(setImmediate)});await assert.rejects(e.encode({}),/clone failed/);assert.equal(e.pending.size,0);e.dispose();});

test('real worker seals all 400 contexts before yielding and preserves late evidence and reset epochs',async()=>{
  const target=new URL('../src/session-export-worker.js',import.meta.url).href;
  const source=`import {parentPort} from 'node:worker_threads';globalThis.self={postMessage:value=>parentPort.postMessage(value)};await import(${JSON.stringify(target)});parentPort.on('message',data=>self.onmessage({data}));`;
  const thread=new Worker(new URL('data:text/javascript,'+encodeURIComponent(source)));
  const adapter={postMessage:data=>thread.postMessage(data),terminate:()=>thread.terminate()};thread.on('message',data=>adapter.onmessage?.({data}));thread.on('error',error=>adapter.onerror?.(error));
  const exporter=new SessionExporter(adapter,{yieldFrame:()=>new Promise(setImmediate)}),d=new BrowserStalls(undefined,()=>0);d.setArchive(message=>adapter.postMessage(message));
  try{
    for(let i=1;i<=400;i++){d.captureFrame({ms:72.6,phase:'cutting',work:{endedAt:i*100}});d.finishFrame({raf:i*100,start:i*100+1,end:i*100+10});}
    d.accept([{entryType:'longtask',startTime:50,duration:65}]);
    const data={performance:{browserStalls:d.report({detach:true})}},pending=exporter.encode(data,{takeOwnership:true});
    d.accept([{entryType:'longtask',startTime:55,duration:66}]);d.clear();
    const first=JSON.parse(await (await pending).text()).performance.browserStalls;
    assert.equal(first.incidents.length,400);assert.equal(first.archive.complete,true);assert.equal(first.droppedIncidents,0);assert.equal(first.incidents[0].browser.length,1);assert.equal(first.incidents[0].followingFrame.end,110);
    const second=JSON.parse(await (await exporter.encode({performance:{browserStalls:d.report({detach:true})}})).text());assert.equal(second.performance.browserStalls.incidents.length,0);
  }finally{exporter.dispose();}
});
