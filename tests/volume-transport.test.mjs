import test from 'node:test';
import assert from 'node:assert/strict';
import {gzipSync,gunzipSync} from 'node:zlib';
import fs from 'node:fs';
import {fetchVolumeBytes} from '../src/binary-asset.js';

test('pelvic compressed transport decodes to every unchanged original float sample',async()=>{
  const raw=fs.readFileSync(new URL('../public/assets/pelvic-volume.bin',import.meta.url)),compressed=fs.readFileSync(new URL('../public/assets/pelvic-volume.bin.gz',import.meta.url));
  assert.deepEqual(gunzipSync(compressed),raw);
  const urls=[],result=await fetchVolumeBytes('/volume.bin',{fetchImpl:async url=>{urls.push(url);return new Response(compressed);}});
  assert.deepEqual(Buffer.from(result),raw);assert.deepEqual(urls,['/volume.bin.gz']);
});
test('a damaged gzip falls back to the complete raw field',async()=>{
  const raw=Buffer.from(new Float32Array([-.002,.003,.004]).buffer),urls=[];
  const result=await fetchVolumeBytes('/volume.bin',{fetchImpl:async url=>{urls.push(url);return new Response(url.endsWith('.gz')?gzipSync(raw).subarray(0,7):raw);}});
  assert.deepEqual(Buffer.from(result),raw);assert.deepEqual(urls,['/volume.bin.gz','/volume.bin']);
});
