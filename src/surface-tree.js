/** Full-triangle contact hierarchy, prepared off the rendering thread.
 * Tree partitioning changes query order only; every original face is retained.
 * Shared stores allow one transfer per array instead of one per tree node. */
export function buildSurfaceTree(positions,indices){
  const count=indices.length/3,triangles=Uint32Array.from({length:count},(_,i)=>i),centres=new Float64Array(count*3);
  for(let i=0;i<count;i++)for(let axis=0;axis<3;axis++)centres[i*3+axis]=(positions[indices[i*3]*3+axis]+positions[indices[i*3+1]*3+axis]+positions[indices[i*3+2]*3+axis])/3;
  const nodeCount=n=>n<=12?1:1+nodeCount(n>>1)+nodeCount(n-(n>>1));
  const boundsStore=new Float64Array(nodeCount(count)*6);let cursor=0;
  const partition=(from,to,middle,axis)=>{
    let lo=from,hi=to-1;
    while(lo<hi){const pivot=centres[triangles[(lo+hi)>>1]*3+axis];let i=lo,j=hi;
      while(i<=j){while(centres[triangles[i]*3+axis]<pivot)i++;while(centres[triangles[j]*3+axis]>pivot)j--;if(i<=j){const value=triangles[i];triangles[i++]=triangles[j];triangles[j--]=value;}}
      if(middle<=j)hi=j;else if(middle>=i)lo=i;else break;
    }
  };
  const build=(from,to)=>{
    const bounds=boundsStore.subarray(cursor,cursor+6);cursor+=6;bounds.set([Infinity,Infinity,Infinity,-Infinity,-Infinity,-Infinity]);
    if(to-from<=12){
      const faces=triangles.subarray(from,to);
      for(const face of faces)for(let j=0;j<3;j++)for(let axis=0;axis<3;axis++){
        const v=positions[indices[face*3+j]*3+axis];bounds[axis]=Math.min(bounds[axis],v);bounds[axis+3]=Math.max(bounds[axis+3],v);
      }
      return {triangles:faces,bounds};
    }
    const low=[Infinity,Infinity,Infinity],high=[-Infinity,-Infinity,-Infinity];
    for(let i=from;i<to;i++)for(let axis=0;axis<3;axis++){const v=centres[triangles[i]*3+axis];low[axis]=Math.min(low[axis],v);high[axis]=Math.max(high[axis],v);}
    let axis=0;for(let i=1;i<3;i++)if(high[i]-low[i]>high[axis]-low[axis])axis=i;
    const middle=(from+to)>>1;partition(from,to,middle,axis);const left=build(from,middle),right=build(middle,to);
    for(let i=0;i<3;i++){bounds[i]=Math.min(left.bounds[i],right.bounds[i]);bounds[i+3]=Math.max(left.bounds[i+3],right.bounds[i+3]);}
    return {left,right,bounds};
  };
  return {root:build(0,count),boundsStore,triangles};
}
