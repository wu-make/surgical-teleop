// Worker-side scenario accounting: label belongs to actual original solid.
// Excluded voxels have become independent pieces, not vaporised material.
export function lesionNodes(meta,base){
  const lesion=meta.pathology;if(!lesion)return null;
  const nodes=[],{dims,origin,spacing}=meta;
  const low=lesion.center.map((c,i)=>Math.max(0,Math.floor((c-lesion.radii[i]-origin[i])/spacing[i]))),high=lesion.center.map((c,i)=>Math.min(dims[i]-1,Math.ceil((c+lesion.radii[i]-origin[i])/spacing[i])));
  for(let z=low[2];z<=high[2];z++)for(let y=low[1];y<=high[1];y++)for(let x=low[0];x<=high[0];x++){
    const p=[x,y,z],index=x+dims[0]*(y+dims[1]*z);
    if(base[index]<0&&p.reduce((sum,v,i)=>sum+((origin[i]+v*spacing[i]-lesion.center[i])/lesion.radii[i])**2,0)<=1)nodes.push(index);
  }
  return new Uint32Array(nodes);
}
export function lesionStatistics(state){
  if(!state.lesionNodes)return null;
  let attached=0,detached=0,excised=0;
  for(const i of state.lesionNodes){if(state.excluded[i])detached++;else if(state.field[i]<0)attached++;else excised++;}
  const voxel=state.meta.spacing.reduce((a,b)=>a*b,1)*1e9;
  return {totalMm3:state.lesionNodes.length*voxel,attachedMm3:attached*voxel,detachedMm3:detached*voxel,excisedMm3:excised*voxel};
}
