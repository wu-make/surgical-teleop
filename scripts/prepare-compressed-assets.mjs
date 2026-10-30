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
const pelvic=fs.readFileSync(new URL('pelvic-volume.bin',root)),packed=gzipSync(pelvic,{level:9});
if(!gunzipSync(packed).equals(pelvic))throw new Error('Lossless pelvic volume validation failed');
fs.writeFileSync(new URL('pelvic-volume.bin.gz',root),packed);
for(const name of ['pelvic-volume.json','pelvic-volume.bin','pelvic-volume.bin.gz','ATTRIBUTION.md']){const bytes=fs.readFileSync(new URL(name,root));manifest.files[name]={bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')};}
fs.writeFileSync(manifestPath,JSON.stringify(manifest,null,2)+'\n');
console.log(JSON.stringify({originalBytes,compressedBytes,savedBytes:originalBytes-compressedBytes,lossless:true}));
