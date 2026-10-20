import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {filmSupport} from '../src/film-support.js';

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
