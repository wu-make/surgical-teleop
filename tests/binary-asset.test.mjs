import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {fetchModelBytes} from '../src/binary-asset.js';

const root=new URL('../public/assets/',import.meta.url),model=fs.readFileSync(new URL('endoscope.glb',root));
test('every compressed source CAD decodes to the identical original byte sequence',async()=>{
  for(const name of ['g1','z1','needle-driver','scissors','endoscope','patient-skin','hepatobiliary-context']){
    const calls=[],decoded=await fetchModelBytes(name+'.glb',{fetchImpl:async url=>{calls.push(url);return new Response(fs.readFileSync(new URL(url,root)));}});
    assert.deepEqual(Buffer.from(decoded),fs.readFileSync(new URL(name+'.glb',root)),name);assert.deepEqual(calls,[name+'.glb.gz']);
  }
});
test('hosts that decode gzip in transit and browsers without decompression preserve the original CAD',async()=>{
  const calls=[],fetchImpl=async url=>{calls.push(url);return new Response(model);};
  assert.deepEqual(Buffer.from(await fetchModelBytes('model.glb',{fetchImpl})),model);assert.deepEqual(calls,['model.glb.gz']);calls.length=0;
  assert.deepEqual(Buffer.from(await fetchModelBytes('model.glb',{fetchImpl,Decompressor:null})),model);assert.deepEqual(calls,['model.glb']);
});
test('missing or damaged compressed assets retry the complete original and never return a partial model',async()=>{
  for(const broken of [()=>new Response('',{status:404}),()=>new Response(new Uint8Array([31,139,0,0])),()=>new Response('<html>not a model</html>')]){
    const calls=[],decoded=await fetchModelBytes('model.glb',{fetchImpl:async url=>{calls.push(url);return url.endsWith('.gz')?broken():new Response(model);}});
    assert.deepEqual(Buffer.from(decoded),model);assert.deepEqual(calls,['model.glb.gz','model.glb']);
  }
  await assert.rejects(fetchModelBytes('model.glb',{fetchImpl:async()=>new Response('partial')}),/模型文件不完整/);
});
