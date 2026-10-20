import * as THREE from 'three';

/** Conservative draw support, independent of fluid volume/clot. A triangle
 * whose three vertices cannot receive any kernel has zero interpolated opacity
 * in the existing shader. Keep boundary uncertainty, source order and all
 * original vertex arrays. This does not approximate the fluid or surface. */
export function filmSupport(geometry,fields,previous=null){
  const data=fields.texture.image.data,count=fields.count.value;
  if(previous?.referenceVersion===geometry.userData.filmReferenceVersion&&previous?.signature.length===count*7){
    let same=true;for(let i=0;i<count&&same;i++)for(let j=0;j<7;j++)if(data[i*12+j]!==previous.signature[i*7+j]){same=false;break;}
    if(same)return previous;
  }
  const signature=new Float32Array(count*7);
  for(let i=0;i<count;i++)for(let j=0;j<7;j++)signature[i*7+j]=data[i*12+j];
  const p=geometry.attributes.filmReference,n=geometry.attributes.filmRestNormal,wet=new Uint8Array(p.count);
  for(let i=0;i<p.count;i++)for(let j=0;j<count;j++){
    const k=j*12,dx=p.getX(i)-data[k],dy=p.getY(i)-data[k+1],dz=p.getZ(i)-data[k+2];
    // texelFetch, attributes and shader arithmetic are Float32. Retain a
    // generous boundary band instead of relying on CPU/GPU rounding equality.
    if(dx*dx+dy*dy+dz*dz>data[k+3]*1.00001+1e-12)continue;
    if(n.getX(i)*data[k+4]+n.getY(i)*data[k+5]+n.getZ(i)*data[k+6]<.14999)continue;
    wet[i]=1;break;
  }
  const source=geometry.userData.fullFilmIndex,indices=[];
  for(let i=0;i<source.count;i+=3){const a=source.getX(i),b=source.getX(i+1),c=source.getX(i+2);if(wet[a]||wet[b]||wet[c])indices.push(a,b,c);}
  const index=new THREE.BufferAttribute(new source.array.constructor(indices),1);
  return{signature,index,referenceVersion:geometry.userData.filmReferenceVersion,sourceTriangles:source.count/3,submittedTriangles:indices.length/3};
}
