import {INSTRUMENT_COLLISION_DATA} from './instrument-collision-data.js';
import {buildSurfaceTree} from './surface-tree.js';
import {yieldPreparationTask} from './preparation-task.js';

function clipPolygon(polygon,axis,plane,sign){
  const result=[];
  for(let i=0;i<polygon.length;i++){
    const a=polygon[i],b=polygon[(i+1)%polygon.length],da=sign*(a[axis]-plane),db=sign*(b[axis]-plane);
    if(da>=0)result.push(a);
    if((da<0&&db>0)||(da>0&&db<0)){
      const t=da/(da-db);result.push(a.map((v,j)=>v+(b[j]-v)*t));
    }
  }
  return result;
}

/** Partition the unchanged source faces at the same source-axis planes as
 * their collision envelopes. Clipped polygons are triangulated in their
 * original plane; no cap, simplification or visual replacement is created.
 * A 1 nm overlap covers decimal rounding at shared slab boundaries. */
export async function prepareBodySegments(catalogue){
  const segments=new Map();
  for(const capsule of INSTRUMENT_COLLISION_DATA.scissors.capsules){
    if(capsule.region==='jaw')continue;
    const body=catalogue.get(capsule.link),values=[],sourceFaces=[],{axis,min,max}=capsule.slab;
    for(let face=0;face<body.indices.length/3;face++){
      let polygon=[0,1,2].map(j=>{
        const offset=body.indices[face*3+j]*3;
        return[body.positions[offset],body.positions[offset+1],body.positions[offset+2]];
      });
      polygon=clipPolygon(clipPolygon(polygon,axis,min-1e-9,1),axis,max+1e-9,-1);
      for(let j=1;j+1<polygon.length;j++){
        values.push(...polygon[0],...polygon[j],...polygon[j+1]);sourceFaces.push(face);
      }
    }
    if(!values.length)throw new Error(`Missing original metal surface for ${capsule.id}`);
    const positions=new Float64Array(values),indices=Uint32Array.from({length:values.length/3},(_,i)=>i);
    segments.set(capsule.id,{positions,indices,sourceFaces:new Uint32Array(sourceFaces),tree:buildSurfaceTree(positions,indices)});
    await yieldPreparationTask({scheduler:null});
  }
  return segments;
}
