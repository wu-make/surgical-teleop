import fs from 'node:fs';
import {gzipSync,gunzipSync} from 'node:zlib';
import {createHash} from 'node:crypto';
const root=new URL('../public/assets/',import.meta.url),manifestPath=new URL('asset-manifest.json',root),manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8'));
let originalBytes=0,compressedBytes=0;
for(const name of ['g1','z1','needle-driver','scissors','endoscope','patient-skin','hepatobiliary-context']){
  const original=fs.readFileSync(new URL(name+'.glb',root)),compressed=gzipSync(original,{level:9});
  if(!gunzipSync(compressed).equals(original))throw new Error('Lossless asset validation failed: '+name);
  fs.writeFileSync(new URL(name+'.glb.gz',root),compressed);manifest.files[name+'.glb.gz']={bytes:compressed.length,sha256:createHash('sha256').update(compressed).digest('hex')};originalBytes+=original.length;compressedBytes+=compressed.length;
}
fs.writeFileSync(manifestPath,JSON.stringify(manifest,null,2)+'\n');
console.log(JSON.stringify({originalBytes,compressedBytes,savedBytes:originalBytes-compressedBytes,lossless:true}));
