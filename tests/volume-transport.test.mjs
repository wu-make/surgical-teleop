import test from 'node:test';
import assert from 'node:assert/strict';
import {gunzipSync} from 'node:zlib';
import fs from 'node:fs';
import {fetchVolumeBytes} from '../src/binary-asset.js';

for(const name of ['liver-volume','pelvic-volume']){
  test(name+' preserves every float bit with either static gzip delivery mode',async()=>{
    const raw=fs.readFileSync(new URL('../public/assets/'+name+'.bin',import.meta.url));
    const packed=fs.readFileSync(new URL('../public/assets/'+name+'.bin.sfv1.gz',import.meta.url));
    for(const body of [packed,gunzipSync(packed)]){
      const urls=[];
      const result=await fetchVolumeBytes('/volume.bin',{fetchImpl:async url=>{urls.push(url);return new Response(body);}});
      assert.deepEqual(Buffer.from(result),raw);
      assert.deepEqual(urls,['/volume.bin.sfv1.gz']);
    }
  });
}
test('unsupported compression or invalid packed data uses the original field',async()=>{
  const raw=Buffer.from(new Float32Array([-.002,.003,.004]).buffer);
  for(const [options,bytes] of [[{Decompressor:null},null],[{},new Uint8Array([31,139,0,1])],[{},new Uint8Array(32)]]){
    const urls=[];
    const result=await fetchVolumeBytes('/volume.bin',{...options,fetchImpl:async url=>{urls.push(url);return new Response(url.endsWith('.gz')?bytes:raw);}});
    assert.deepEqual(Buffer.from(result),raw);
    assert.deepEqual(urls,bytes?['/volume.bin.sfv1.gz','/volume.bin']:['/volume.bin']);
  }
});
