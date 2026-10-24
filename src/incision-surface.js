// Refine only exposed cut edges. Both neighbours decide from the same edge
// endpoints, so chunk seams and intact capsule triangles stay watertight.
export function refineIncisionSurface(mesh,{spacing,sampleField,sampleOriginal,colour,mask,passes=2}={}){
  if(!mesh.indices.length||!mesh.cutMasks.some(value=>value>.02))return mesh;
  const positions=Array.from(mesh.positions),normals=Array.from(mesh.normals),colors=Array.from(mesh.colors),masks=Array.from(mesh.cutMasks);
  let indices=Array.from(mesh.indices);const target=Math.min(...spacing)*.52,epsilon=Math.min(...spacing)*.03;
  const point=id=>positions.slice(id*3,id*3+3);
  const gradient=p=>{const g=[0,0,0];for(let axis=0;axis<3;axis++){const value=p[axis];p[axis]=value-epsilon;const low=sampleField(p);p[axis]=value+epsilon;const high=sampleField(p);p[axis]=value;g[axis]=(high-low)/(2*epsilon);}return g;};
  for(let pass=0;pass<passes;pass++){
    const midpoints=new Map(),output=[];
    function midpoint(a,b){
      const key=a<b?a+':'+b:b+':'+a;if(midpoints.has(key))return midpoints.get(key);
      if(Math.max(masks[a],masks[b])<=.02){midpoints.set(key,-1);return -1;}
      const pa=point(a),pb=point(b);
      if(Math.hypot(pa[0]-pb[0],pa[1]-pb[1],pa[2]-pb[2])<=target){midpoints.set(key,-1);return -1;}
      const p=[(pa[0]+pb[0])*.5,(pa[1]+pb[1])*.5,(pa[2]+pb[2])*.5];
      // Project onto the actual remaining volume, rather than smoothing across
      // empty space or rounding over a newly opened cavity.
      for(let i=0;i<4;i++){
        const d=sampleField(p),g=gradient(p),length=g.reduce((sum,v)=>sum+v*v,0);if(!Number.isFinite(d)||length<1e-12||Math.abs(d)<1e-8)break;
        const scale=Math.max(-target*.35,Math.min(target*.35,d/Math.sqrt(length)))/Math.sqrt(length);
        for(let axis=0;axis<3;axis++)p[axis]-=g[axis]*scale;
      }
      const n=gradient(p),length=Math.hypot(...n);let normal=length>1e-10?n.map(v=>v/length):[0,1,2].map(i=>(normals[a*3+i]+normals[b*3+i])*.5);
      const normalLength=Math.hypot(...normal);normal=normalLength>1e-10?normal.map(v=>v/normalLength):normals.slice(a*3,a*3+3);
      const original=sampleOriginal(p),id=positions.length/3;positions.push(...p);normals.push(...normal);colors.push(...colour(p,original));masks.push(mask(original));midpoints.set(key,id);return id;
    }
    for(let i=0;i<indices.length;i+=3){
      const a=indices[i],b=indices[i+1],c=indices[i+2],ab=midpoint(a,b),bc=midpoint(b,c),ca=midpoint(c,a),bits=(ab>=0?1:0)|(bc>=0?2:0)|(ca>=0?4:0);
      if(bits===0)output.push(a,b,c);
      else if(bits===1)output.push(a,ab,c,ab,b,c);
      else if(bits===2)output.push(a,b,bc,a,bc,c);
      else if(bits===4)output.push(a,b,ca,b,c,ca);
      else if(bits===3)output.push(ab,b,bc,a,ab,bc,a,bc,c);
      else if(bits===5)output.push(a,ab,ca,ab,b,c,ab,c,ca);
      else if(bits===6)output.push(b,bc,a,bc,ca,a,bc,c,ca);
      else output.push(a,ab,ca,ab,b,bc,ca,bc,c,ab,bc,ca);
    }
    indices=output;
  }
  return {...mesh,positions:new Float32Array(positions),normals:new Float32Array(normals),colors:new Float32Array(colors),cutMasks:new Float32Array(masks),indices:new Uint32Array(indices)};
}
