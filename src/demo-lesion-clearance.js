import {Vector3} from 'three';
import {lesionNodes} from './lesion-volume.js';
import {scissorsSegments} from './scissors-kinematics.js';
import {sourceSegmentDistance} from './instrument-contact.js';

const caches=new WeakMap(),cell=.003;
// The same original material labels as the scoring worker, transformed by the
// actual grasp. This protects the whole measured blade, not an invisible TCP.
function targetBins(tissue){
  const meta=tissue.metadata;if(!meta?.pathology||!tissue._baseField)return null;
  tissue.group.updateWorldMatrix(true,false);
  const key=JSON.stringify([tissue._deformation,tissue.group.matrixWorld.elements]),old=caches.get(tissue);
  if(old?.meta===meta&&old.base===tissue._baseField&&old.key===key)return old;
  const low=[Infinity,Infinity,Infinity],high=[-Infinity,-Infinity,-Infinity],points=[];
  for(const index of lesionNodes(meta,tissue._baseField)){
    const grid=[index%meta.dims[0],Math.floor(index/meta.dims[0])%meta.dims[1],Math.floor(index/(meta.dims[0]*meta.dims[1]))],p=new Vector3(...grid.map((v,i)=>meta.origin[i]+v*meta.spacing[i]));
    const world=tissue.group.localToWorld(tissue.deformPoint(p)).toArray();points.push(world);
    for(let i=0;i<3;i++){low[i]=Math.min(low[i],world[i]);high[i]=Math.max(high[i],world[i]);}
  }
  const dims=high.map((v,i)=>Math.max(1,Math.floor((v-low[i])/cell)+1)),bins=new Map();
  for(const p of points){const q=p.map((v,i)=>Math.floor((v-low[i])/cell)),id=q[0]+dims[0]*(q[1]+dims[1]*q[2]);let list=bins.get(id);if(!list)bins.set(id,list=[]);list.push(p);}
  const result={meta,base:tissue._baseField,key,low,high,dims,bins};caches.set(tissue,result);return result;
}

export function bladeLesionClearance(tissue,tool,radius,{margin=.0003,guard=.00005,pose}={}){
  const target=targetBins(tissue);if(!target)return Infinity;
  const limit=radius+margin+guard,{low,high,dims,bins}=target;let distance=Infinity;
  for(const segment of scissorsSegments(tool,pose)){
    const a=segment.a,b=segment.b,lo=a.map((v,i)=>Math.min(v,b[i])-limit),hi=a.map((v,i)=>Math.max(v,b[i])+limit);
    if(lo.some((v,i)=>v>high[i])||hi.some((v,i)=>v<low[i]))continue;
    const first=lo.map((v,i)=>Math.max(0,Math.floor((v-low[i])/cell))),last=hi.map((v,i)=>Math.min(dims[i]-1,Math.floor((v-low[i])/cell)));
    for(let z=first[2];z<=last[2];z++)for(let y=first[1];y<=last[1];y++)for(let x=first[0];x<=last[0];x++)for(const p of bins.get(x+dims[0]*(y+dims[1]*z))??[])distance=Math.min(distance,sourceSegmentDistance(p,p,a,b));
  }
  return distance<limit?distance-radius-margin:Infinity;
}
