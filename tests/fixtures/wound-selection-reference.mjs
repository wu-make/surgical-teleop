// Frozen pre-optimization selection, used only to verify exact blood-surface equivalence.
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
  const candidates=new Map(),capsule=[];
  const collect=(surface,fragmentId=null)=>{
    for(const [data,cut]of [[surface.cuts,true],[surface.capsule,false]])for(let i=0;i<data.length;i+=8){
      const reference=Array.from(data.subarray(i,i+3)),key=reference.map(v=>Math.round(v/.0025)).join(':'),entry={key,reference,restNormal:Array.from(data.subarray(i+3,i+6)),area:data[i+6],cut,fragmentId,seed:seedOf(key)};
      if(!cut){capsule.push(entry);continue;}
      const old=candidates.get(key),sourceArea=Math.min(6.25,(old?.sourceArea??0)+data[i+7]);
      if(!old||old.area<entry.area)candidates.set(key,{...entry,sourceArea});else old.sourceArea=sourceArea;
    }
  };
  for(const surface of chunks)collect(surface);for(const {id,surface}of fragments)collect(surface,id);
  const cuts=[...candidates.values()].sort((a,b)=>a.seed-b.seed).slice(0,240),low=[Infinity,Infinity,Infinity],high=[-Infinity,-Infinity,-Infinity];
  for(const c of cuts)for(let i=0;i<3;i++){low[i]=Math.min(low[i],c.reference[i]-.012);high[i]=Math.max(high[i],c.reference[i]+.012);}
  const adjacent=[];
  for(const c of capsule){if(adjacent.length>=80)break;if(c.reference.some((v,i)=>v<low[i]||v>high[i]))continue;if(!candidates.has(c.key)&&cuts.some(n=>n.reference.reduce((s,v,i)=>s+(v-c.reference[i])**2,0)<.000144)){candidates.set(c.key,c);adjacent.push(c);}}
  const nodes=[...cuts,...adjacent];return{nodes,edges:new Uint16Array(connectWoundNodes(nodes).flat())};
}
