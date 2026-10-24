import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {filmSupport} from '../src/film-support.js';

test('spatial kernel bins produce exactly the exhaustive wet-triangle support for dense moving fields',()=>{
  const g=new THREE.PlaneGeometry(.08,.06,70,60);g.setAttribute('filmReference',g.attributes.position);g.setAttribute('filmRestNormal',g.attributes.normal);g.userData.fullFilmIndex=g.index;
  const fields={count:{value:64},texture:{image:{data:new Float32Array(64*12)}}},data=fields.texture.image.data,p=g.attributes.position,n=g.attributes.normal;
  for(let phase=0;phase<4;phase++){
    for(let j=0;j<64;j++)data.set([Math.sin(j*31+phase)*.043,Math.cos(j*17-phase)*.032,0,(.0015+j%5*.001)**2,0,0,j%7===0?-1:1,1,0,0,0,0],j*12);
    const wet=new Uint8Array(p.count);
    for(let i=0;i<p.count;i++)for(let j=0;j<64;j++){const k=j*12,dx=p.getX(i)-data[k],dy=p.getY(i)-data[k+1],dz=p.getZ(i)-data[k+2];if(dx*dx+dy*dy+dz*dz<=data[k+3]*1.00001+1e-12&&n.getX(i)*data[k+4]+n.getY(i)*data[k+5]+n.getZ(i)*data[k+6]>=.14999){wet[i]=1;break;}}
    const expected=[];for(let i=0;i<g.index.count;i+=3){const [a,b,c]=g.index.array.subarray(i,i+3);if(wet[a]||wet[b]||wet[c])expected.push(a,b,c);}
    assert.deepEqual(Array.from(filmSupport(g,fields).index.array),expected);
  }g.dispose();
});

test('conservative film support retains every possibly wet triangle in source order through kernel motion',()=>{
  const g=new THREE.PlaneGeometry(.06,.04,60,40);g.setAttribute('filmReference',g.attributes.position);g.setAttribute('filmRestNormal',g.attributes.normal);g.userData.fullFilmIndex=g.index;
  const fields={count:{value:3},texture:{image:{data:new Float32Array(36)}}};let prior=null;
  for(let phase=0;phase<5;phase++){
    for(let j=0;j<3;j++)fields.texture.image.data.set([-.025+phase*.008+j*.006,0,0,1e-5,0,0,1,phase*.1,0,0,0,0],j*12);
    const s=filmSupport(g,fields,prior),out=Array.from(s.index.array),kept=new Set();let cursor=0;
    for(let i=0;i<g.index.count;i+=3){
      const ids=[0,1,2].map(k=>g.index.getX(i+k));let wet=false;
      for(const id of ids){const p=new THREE.Vector3().fromBufferAttribute(g.attributes.position,id);for(let j=0;j<3;j++){const d=fields.texture.image.data,b=j*12;if(p.distanceToSquared(new THREE.Vector3(d[b],d[b+1],d[b+2]))<d[b+3])wet=true;}}
      const included=ids.every((id,k)=>id===out[cursor+k]);if(included){kept.add(i);cursor+=3;}
      if(wet)assert(included,'every triangle with a wet vertex must remain');
    }
    assert.equal(cursor,out.length,'submitted triangles preserve exact original order');assert(kept.size>0);
    assert(s.submittedTriangles<s.sourceTriangles/2);assert.equal(filmSupport(g,fields,s),s);
    fields.texture.image.data[7]+=1;assert.equal(filmSupport(g,fields,s),s,'flow and clot cannot invalidate material support');prior=s;
  }
  assert.equal(g.attributes.position,g.attributes.filmReference);
});
