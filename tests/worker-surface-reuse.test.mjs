import test from 'node:test';
import assert from 'node:assert/strict';
import {Worker} from 'node:worker_threads';
import {surfaceTreeBounds} from '../src/surface-tree.js';

test('real tissue worker reuses only unchanged exposed surfaces and transfers fresh selection after another real cut',async()=>{
  const url=new URL('../src/tissue-worker.js',import.meta.url).href,source=`import {parentPort} from 'node:worker_threads';class Scope{};globalThis.WorkerGlobalScope=Scope;globalThis.self=new Scope();self.postMessage=(message,transfer)=>parentPort.postMessage(message,transfer);await import(${JSON.stringify(url)});parentPort.on('message',data=>self.onmessage({data}));`,thread=new Worker(new URL('data:text/javascript,'+encodeURIComponent(source)));
  let id=0;const send=data=>new Promise((resolve,reject)=>{const message=answer=>{cleanup();answer.error?reject(new Error(answer.error)):resolve(answer);},error=e=>{cleanup();reject(e);},cleanup=()=>{thread.off('message',message);thread.off('error',error);};thread.on('message',message);thread.on('error',error);thread.postMessage({id:++id,epoch:0,...data});});
  const dims=[25,25,25],spacing=[.0015,.0015,.0015],origin=[-.018,-.018,-.018],field=new Float32Array(25**3);for(let z=0;z<25;z++)for(let y=0;y<25;y++)for(let x=0;x<25;x++)field[x+25*(y+25*z)]=Math.hypot(origin[0]+x*spacing[0],origin[1]+y*spacing[1],origin[2]+z*spacing[2])-.013;
  try{
    const init=await send({type:'init',metadata:{dims,spacing,origin},buffer:field.buffer,chunkSize:8});assert(init.woundSelection);assert.equal(init.reuseWoundSelection,false);
    for(const c of init.chunks.filter(c=>c.positions.length)){assert.equal(c.filmSpatialIndex.positions,c.positions,'transferred film bins index the exact authoritative material buffer');assert.equal(c.filmSpatialIndex.vertices.length,c.positions.length/3);assert.equal(new Set(c.filmSpatialIndex.vertices).size,c.positions.length/3,'every original vertex is retained exactly once');}
    const cut={a:[0,0,-.018],b:[0,0,.014],radius:.003},first=await send({type:'cut',cuts:[cut]});assert(first.changedSamples>0);assert(first.woundSelection.nodes.length>0);const saved=structuredClone(first.woundSelection);
    const repeated=await send({type:'cut',cuts:[cut]});assert.equal(repeated.changedSamples,0);assert.equal(repeated.chunks.length,0);assert.equal(repeated.reuseWoundSelection,true);assert.equal(repeated.woundSelection,null);assert.deepEqual(first.woundSelection,saved);assert(repeated.work.totalMs>=0);
    const next=await send({type:'cut',cuts:[{...cut,radius:.004}]});assert(next.changedSamples>0);assert.equal(next.reuseWoundSelection,false);assert(next.woundSelection.nodes.length>0);assert(next.chunks.length>0);
    const deformed=await send({type:'cut',cuts:[{...cut,radius:.005,deformation:{model:'local-flow',local:[0,.01,0],displacement:[0,.004,0]}}]});
    const mapped=deformed.chunks.filter(c=>c.display?.activeCount>0);assert(mapped.length>0);
    for(const c of mapped){assert(c.restContactBounds.length>0);assert.deepEqual(c.restContactBounds,surfaceTreeBounds(c.contactTree,c.positions,c.indices));}
  }finally{await thread.terminate();}
});
