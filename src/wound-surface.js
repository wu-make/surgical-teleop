// Prepare the same material-space samples as the renderer's original scan,
// outside the render thread. Float64 preserves centroid/key boundary decisions.
// Each record is [x,y,z,nx,ny,nz,largestTriangleArea,sourceArea].
export function prepareWoundSurface({positions:p,normals:n,cutMasks:m,indices},fragment=false){
  const cuts=new Map(),capsule=[];
  if(!m)return {cuts:new Float64Array(),capsule:new Float64Array()};
  for(let i=0;i<indices.length;i+=3){
    const a=indices[i],b=indices[i+1],c=indices[i+2],cut=(m[a]+m[b]+m[c])/3>.55;
    if(!cut&&(fragment||i%27!==0))continue;
    const ax=p[a*3],ay=p[a*3+1],az=p[a*3+2],ux=p[b*3]-ax,uy=p[b*3+1]-ay,uz=p[b*3+2]-az,vx=p[c*3]-ax,vy=p[c*3+1]-ay,vz=p[c*3+2]-az;
    const area=Math.hypot(uy*vz-uz*vy,uz*vx-ux*vz,ux*vy-uy*vx)*.5e6;if(area<.015)continue;
    const x=(ax+p[b*3]+p[c*3])/3,y=(ay+p[b*3+1]+p[c*3+1])/3,z=(az+p[b*3+2]+p[c*3+2])/3;
    const nx=n[a*3]+n[b*3]+n[c*3],ny=n[a*3+1]+n[b*3+1]+n[c*3+1],nz=n[a*3+2]+n[b*3+2]+n[c*3+2],length=Math.hypot(nx,ny,nz)||1;
    const record=[x,y,z,nx/length,ny/length,nz/length,Math.min(6.25,area),Math.min(6.25,area)];
    if(!cut){capsule.push(...record);continue;}
    const key=[x,y,z].map(v=>Math.round(v/.0025)).join(':'),old=cuts.get(key),sum=Math.min(6.25,(old?.[7]??0)+record[6]);
    if(!old||old[6]<record[6]){record[7]=sum;cuts.set(key,record);}else old[7]=sum;
  }
  return {cuts:new Float64Array([...cuts.values()].flat()),capsule:new Float64Array(capsule)};
}

const seedOf=key=>{let h=2166136261;for(let i=0;i<key.length;i++){h^=key.charCodeAt(i);h=Math.imul(h,16777619);}return(h>>>0)/4294967296;};
export function connectWoundNodes(nodes){
  const edges=[],cell=.0047,grid=new Map(),key=(p,x=0,y=0,z=0)=>`${Math.floor(p[0]/cell)+x}:${Math.floor(p[1]/cell)+y}:${Math.floor(p[2]/cell)+z}`;
  for(let i=0;i<nodes.length;i++){
    const a=nodes[i];
    for(let x=-1;x<=1;x++)for(let y=-1;y<=1;y++)for(let z=-1;z<=1;z++)for(const j of grid.get(key(a.reference,x,y,z))??[]){
      const b=nodes[j],distance=a.reference.reduce((s,v,k)=>s+(v-b.reference[k])**2,0),dot=a.restNormal.reduce((s,v,k)=>s+v*b.restNormal[k],0);
      if(a.fragmentId===b.fragmentId&&distance<cell*cell&&distance>1e-8&&dot>-.15)edges.push([j,i]);
    }
    const k=key(a.reference);if(!grid.has(k))grid.set(k,[]);grid.get(k).push(i);
  }
  return edges;
}

/** Same deterministic source/capsule selection as the original main-thread
 * scan, now prepared beside the geometry worker's persistent chunk cache. */
export function selectWoundSurface(chunks,fragments=[]){
  const candidates=new Map(),capsules=[];
  const collect=(surface,fragmentId=null)=>{
    capsules.push({data:surface.capsule,fragmentId});
    const data=surface.cuts;
    for(let i=0;i<data.length;i+=8){
      const reference=[data[i],data[i+1],data[i+2]],key=reference.map(v=>Math.round(v/.0025)).join(':'),entry={key,reference,restNormal:[data[i+3],data[i+4],data[i+5]],area:data[i+6],cut:true,fragmentId,seed:seedOf(key)};
      const old=candidates.get(key),sourceArea=Math.min(6.25,(old?.sourceArea??0)+data[i+7]);
      if(!old||old.area<entry.area)candidates.set(key,{...entry,sourceArea});else old.sourceArea=sourceArea;
    }
  };
  for(const surface of chunks)collect(surface);for(const {id,surface}of fragments)collect(surface,id);
  const cuts=[...candidates.values()].sort((a,b)=>a.seed-b.seed).slice(0,240),low=[Infinity,Infinity,Infinity],high=[-Infinity,-Infinity,-Infinity];
  for(const c of cuts)for(let i=0;i<3;i++){low[i]=Math.min(low[i],c.reference[i]-.012);high[i]=Math.max(high[i],c.reference[i]+.012);}
  const adjacent=[];
  // Retain the exact original traversal, keys and neighbours, but reject the
  // distant capsule records before allocating their temporary JS objects.
  capsuleScan:for(const {data,fragmentId}of capsules)for(let i=0;i<data.length;i+=8){
    if(adjacent.length>=80)break capsuleScan;
    const x=data[i],y=data[i+1],z=data[i+2];
    if(x<low[0]||x>high[0]||y<low[1]||y>high[1]||z<low[2]||z>high[2])continue;
    const reference=[x,y,z],key=reference.map(v=>Math.round(v/.0025)).join(':');
    if(candidates.has(key)||!cuts.some(n=>n.reference.reduce((s,v,k)=>s+(v-reference[k])**2,0)<.000144))continue;
    const entry={key,reference,restNormal:[data[i+3],data[i+4],data[i+5]],area:data[i+6],cut:false,fragmentId,seed:seedOf(key)};
    candidates.set(key,entry);adjacent.push(entry);
  }
  const nodes=[...cuts,...adjacent];return{nodes,edges:new Uint16Array(connectWoundNodes(nodes).flat())};
}
