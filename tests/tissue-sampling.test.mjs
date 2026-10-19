import test from 'node:test';
import assert from 'node:assert/strict';
import {TissueVolume} from '../src/tissue.js';

test('allocation-free scalar interpolation preserves all original voxel weights, exclusions and grid boundaries',()=>{
  const t=new TissueVolume(),dims=[5,6,4],spacing=[.0013,.0021,.0007],origin=[-.004,-.003,.001];
  t.metadata={dims,spacing,origin};t._baseField=Float32Array.from({length:120},(_,i)=>Math.sin(i*1.7)*.01);
  t._excludedValues.set(13,.007894);t._excludedValues.set(119,.002456);
  const reference=p=>{
    if(p.some(v=>!Number.isFinite(v)))return Infinity;
    const grid=p.map((v,i)=>(v-origin[i])/spacing[i]);if(grid.some((v,i)=>v<0||v>dims[i]-1))return Infinity;
    const lower=grid.map((v,i)=>Math.min(Math.floor(v),dims[i]-2)),fraction=grid.map((v,i)=>v-lower[i]);
    const corners=Array.from({length:8},(_,i)=>[i&1,(i>>1)&1,(i>>2)&1]);
    return corners.reduce((total,corner)=>{const xyz=corner.map((v,i)=>lower[i]+v),index=xyz[0]+dims[0]*(xyz[1]+dims[1]*xyz[2]);const weight=corner.map((v,i)=>v?fraction[i]:1-fraction[i]).reduce((a,b)=>a*b);return total+weight*(t._excludedValues.get(index)??t._baseField[index]);},0);
  };
  try{
    const queries=Array.from({length:600},(_,i)=>spacing.map((s,j)=>origin[j]+s*((Math.sin(i*1.931+j*2.1)+1)*.5)*(dims[j]-1)));
    queries.push(origin.slice(),origin.map((v,i)=>v+(dims[i]-1)*spacing[i]),[NaN,0,0],[Infinity,0,0],origin.map(v=>v-.1));
    for(const point of queries)assert.equal(t._sampleReferenceDistance(point),reference(point));
  }finally{t.blood.dispose();t.material.dispose();}
});
