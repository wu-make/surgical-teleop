export const FILM_BIN_SIZE=.003;

// Full material-coordinate vertex index. Flat transferable bins are prepared
// beside cut geometry in the tissue worker, avoiding map construction when a
// new wound is first displayed. Coordinates and fluid kernels are unchanged.
export function prepareFilmIndex(positions){
  const count=positions.length/3;if(!count)return null;
  const min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity];
  for(let i=0;i<positions.length;i++){
    const axis=i%3,b=Math.floor(positions[i]/FILM_BIN_SIZE);min[axis]=Math.min(min[axis],b);max[axis]=Math.max(max[axis],b);
  }
  const dims=min.map((v,i)=>max[i]-v+1),cells=dims[0]*dims[1]*dims[2];
  // An unusually sparse imported surface can use the exhaustive exact path.
  if(cells>1000000)return null;
  const offsets=new Uint32Array(cells+1),vertices=new Uint32Array(count);
  const key=i=>Math.floor(positions[i*3]/FILM_BIN_SIZE)-min[0]+dims[0]*(Math.floor(positions[i*3+1]/FILM_BIN_SIZE)-min[1]+dims[1]*(Math.floor(positions[i*3+2]/FILM_BIN_SIZE)-min[2]));
  for(let i=0;i<count;i++)offsets[key(i)+1]++;
  for(let i=1;i<offsets.length;i++)offsets[i]+=offsets[i-1];
  const cursors=offsets.slice();for(let i=0;i<count;i++)vertices[cursors[key(i)]++]=i;
  return{positions,min,dims,offsets,vertices};
}

export function visitFilmBins(index,low,high,visit){
  const {min,dims,offsets,vertices}=index;
  const lo=low.map((v,i)=>Math.max(0,v-min[i])),hi=high.map((v,i)=>Math.min(dims[i]-1,v-min[i]));
  for(let z=lo[2];z<=hi[2];z++)for(let y=lo[1];y<=hi[1];y++)for(let x=lo[0];x<=hi[0];x++){
    const cell=x+dims[0]*(y+dims[1]*z);for(let j=offsets[cell];j<offsets[cell+1];j++)visit(vertices[j]);
  }
}
