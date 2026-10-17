import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {prepareWoundSurface,selectWoundSurface} from '../src/wound-surface.js';
import {TissueVolume} from '../src/tissue.js';
import {createVolumeState,allChunkKeys,polygonizeChunk,applyCapsuleCut} from '../src/tissue-worker.js';
test('worker-prepared wound samples preserve legacy exposed cells, source areas, normals and all render triangles',()=>{
  const dims=[19,19,19],spacing=[.0015,.0015,.0015],origin=[-.0135,-.0135,-.0135],metadata={dims,spacing,origin},values=new Float32Array(19**3);
  for(let z=0;z<19;z++)for(let y=0;y<19;y++)for(let x=0;x<19;x++)values[x+19*(y+19*z)]=Math.hypot(origin[0]+x*.0015,origin[1]+y*.0015,origin[2]+z*.0015)-.011;
  const volume=createVolumeState(metadata,values);applyCapsuleCut(volume,{a:[-.008,.008,0],b:[.008,.008,0],radius:.003});
  const legacy=new TissueVolume(),prepared=new TissueVolume(),surfaces=[];
  try{
    for(const key of allChunkKeys(volume)){
      const chunk=polygonizeChunk(volume,key),before=structuredClone(chunk);legacy._replaceChunk(chunk);
      const next={...chunk,woundSurface:prepareWoundSurface(chunk)};surfaces.push(next.woundSurface);assert.deepEqual(chunk,before,'surface preparation must not modify any render array');prepared._replaceChunk(next);
    }
    legacy.blood.syncSurface({injury:true});prepared.blood.syncSurface({injury:true,selection:selectWoundSurface(surfaces)});
    const a=legacy.blood.nodes,b=prepared.blood.nodes;assert.deepEqual(b.map(n=>n.key),a.map(n=>n.key));assert.equal(a.length,b.length);
    for(let i=0;i<a.length;i++){for(const name of ['reference','restNormal'])for(let k=0;k<3;k++)assert(Math.abs(a[i][name][k]-b[i][name][k])<1e-12);assert(Math.abs((a[i].sourceArea??0)-(b[i].sourceArea??0))<1e-10);assert.equal(a[i].injured,b[i].injured);}
    for(let i=0;i<120;i++){legacy.blood.update(1/60);prepared.blood.update(1/60);}assert(Math.abs(legacy.blood.emitted-prepared.blood.emitted)<1e-9);assert(Math.abs(prepared.blood.metrics.balanceErrorMm3)<1e-9);
  }finally{legacy.dispose();prepared.dispose();}
});
