import {unpackSurfaceTree} from './surface-tree.js';

let catalogue=null,pending=null,segments=null,pendingSegments=null;
const decode=(text,Type)=>{
  let bytes;
  if(typeof Uint8Array.fromBase64==='function')bytes=Uint8Array.fromBase64(text);
  else{const value=atob(text);bytes=new Uint8Array(value.length);for(let i=0;i<value.length;i++)bytes[i]=value.charCodeAt(i);}
  return new Type(bytes.buffer,bytes.byteOffset,bytes.byteLength/Type.BYTES_PER_ELEMENT);
};
export function bodyTriangleGeometry(key){return segments?.get(key)??catalogue?.get(key)??null;}
export async function loadBodyTriangleGeometry({segmentBodies=false}={}){
  const loaded=await(pending??=import('./scissors-body-triangles.js').then(({BODY_TRIANGLE_DATA})=>{
    catalogue=new Map();
    for(const [link,data]of Object.entries(BODY_TRIANGLE_DATA)){
      const tree=unpackSurfaceTree({...data.tree,nodes:decode(data.tree.nodes,Uint32Array),boundsStore:decode(data.tree.boundsStore,Float64Array),triangles:decode(data.tree.triangles,Uint32Array)});
      catalogue.set(link,{positions:decode(data.positions,Float32Array),indices:decode(data.indices,Uint32Array),tree});
    }
    return catalogue;
  }).catch(error=>{pending=null;throw error;}));
  if(segmentBodies)await(pendingSegments??=import('./scissors-body-segments.js').then(async({prepareBodySegments})=>{
    const prepared=await prepareBodySegments(loaded);segments=prepared;return prepared;
  }).catch(error=>{pendingSegments=null;throw error;}));
  return loaded;
}
