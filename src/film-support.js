import * as THREE from 'three';
import {FILM_BIN_SIZE as CELL,prepareFilmIndex,visitFilmBins} from './film-support-index.js';
const referenceIndices=new WeakMap();

function referenceIndex(geometry){
  const p=geometry.attributes.filmReference,n=geometry.attributes.filmRestNormal,version=geometry.userData.filmReferenceVersion;
  let cached=referenceIndices.get(geometry);
  if(cached?.p===p&&cached.n===n&&cached.version===version&&cached.pVersion===p.version&&cached.nVersion===n.version)return cached;
  const prepared=geometry.userData.filmSpatialIndex;
  const positions=!p.isInterleavedBufferAttribute&&!p.normalized?p.array:Float64Array.from({length:p.count*3},(_,i)=>[p.getX,p.getY,p.getZ][i%3].call(p,Math.floor(i/3)));
  const bins=prepared?.positions===positions&&p.version===0?prepared:prepareFilmIndex(positions);
  cached={p,n,version,pVersion:p.version,nVersion:n.version,bins,wet:new Uint8Array(p.count)};referenceIndices.set(geometry,cached);return cached;
}

/** Conservative draw support, independent of fluid volume/clot. A triangle
 * whose three vertices cannot receive any kernel has zero interpolated opacity
 * in the existing shader. Keep boundary uncertainty, source order and all
 * original vertex arrays. This does not approximate the fluid or surface. */
export function filmSupport(geometry,fields,previous=null){
  const data=fields.texture.image.data,count=fields.count.value,p=geometry.attributes.filmReference,n=geometry.attributes.filmRestNormal,source=geometry.userData.fullFilmIndex;
  if(previous?.referenceVersion===geometry.userData.filmReferenceVersion&&previous?.reference===p&&previous.normal===n&&previous.pVersion===p.version&&previous.nVersion===n.version&&previous.source===source&&previous.sourceVersion===source.version&&previous.signature.length===count*7){
    let same=true;for(let i=0;i<count&&same;i++)for(let j=0;j<7;j++)if(data[i*12+j]!==previous.signature[i*7+j]){same=false;break;}
    if(same)return previous;
  }
  const signature=new Float32Array(count*7);
  for(let i=0;i<count;i++)for(let j=0;j<7;j++)signature[i*7+j]=data[i*12+j];
  const cached=referenceIndex(geometry),{wet,bins}=cached,pa=p.array,na=n.array;wet.fill(0);
  const direct=!p.isInterleavedBufferAttribute&&!n.isInterleavedBufferAttribute&&!p.normalized&&!n.normalized;
  const visit=(i,k)=>{
    if(wet[i])return;
    const v=i*3,px=direct?pa[v]:p.getX(i),py=direct?pa[v+1]:p.getY(i),pz=direct?pa[v+2]:p.getZ(i);
    const dx=px-data[k],dy=py-data[k+1],dz=pz-data[k+2];
    // texelFetch, attributes and shader arithmetic are Float32. Retain a
    // generous boundary band instead of relying on CPU/GPU rounding equality.
    if(dx*dx+dy*dy+dz*dz>data[k+3]*1.00001+1e-12)return;
    if((direct?na[v]:n.getX(i))*data[k+4]+(direct?na[v+1]:n.getY(i))*data[k+5]+(direct?na[v+2]:n.getZ(i))*data[k+6]<.14999)return;
    wet[i]=1;
  };
  // Index the unchanged material vertices once. A moving blood kernel visits
  // its exact conservative sphere bins instead of rescanning the entire dense
  // pulled/cut surface at every liquid step. Every accepted vertex and source
  // triangle still uses the same distance/normal tests, in source draw order.
  for(let j=0;j<count;j++){
    const k=j*12,r=Math.sqrt(data[k+3]*1.00001+1e-12),low=[0,1,2].map(i=>Math.floor((data[k+i]-r)/CELL)),high=[0,1,2].map(i=>Math.floor((data[k+i]+r)/CELL));
    const cells=(high[0]-low[0]+1)*(high[1]-low[1]+1)*(high[2]-low[2]+1);
    if(!bins||cells>p.count){for(let i=0;i<p.count;i++)visit(i,k);continue;}
    visitFilmBins(bins,low,high,i=>visit(i,k));
  }
  // Reuse a typed workspace instead of repeatedly growing a boxed JS array at
  // detachment. Publish an independent exact-length copy so older support
  // snapshots remain immutable while the next liquid footprint is evaluated.
  const Type=source.array.constructor;
  if(!(cached.indexScratch instanceof Type)||cached.indexScratch.length<source.count)cached.indexScratch=new Type(source.count);
  const indices=cached.indexScratch,raw=!source.isInterleavedBufferAttribute&&!source.normalized?source.array:null;let cursor=0;
  for(let i=0;i<source.count;i+=3){const a=raw?raw[i]:source.getX(i),b=raw?raw[i+1]:source.getX(i+1),c=raw?raw[i+2]:source.getX(i+2);if(wet[a]||wet[b]||wet[c]){indices[cursor++]=a;indices[cursor++]=b;indices[cursor++]=c;}}
  const index=new THREE.BufferAttribute(indices.slice(0,cursor),1);
  return{signature,index,referenceVersion:geometry.userData.filmReferenceVersion,reference:p,normal:n,pVersion:p.version,nVersion:n.version,source,sourceVersion:source.version,sourceTriangles:source.count/3,submittedTriangles:cursor/3};
}
