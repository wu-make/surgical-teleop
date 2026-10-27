// Refine only exposed cut edges. Both neighbours decide from the same edge
// endpoints, so chunk seams and intact capsule triangles stay watertight.
export function refineIncisionSurface(mesh,{spacing,mapPoint=null,passes=4,splitTrace=null}={}){
  if(!mesh.indices.length||(!mapPoint&&!mesh.cutMasks.some(value=>value>.02)))return mesh;
  const positions=Array.from(mesh.positions),normals=Array.from(mesh.normals),colors=Array.from(mesh.colors),masks=Array.from(mesh.cutMasks);
  let indices=Array.from(mesh.indices);const target=Math.min(...spacing)*.52,points=[],mapped=[],travel=[];
  const point=id=>points[id]??=positions.slice(id*3,id*3+3);
  const distance=(x,y)=>Math.hypot(x[0]-y[0],x[1]-y[1],x[2]-y[2]);
  const display=id=>{let p=mapped[id];if(!p){const rest=point(id);p=mapPoint(rest);mapped[id]=p;travel[id]=distance(p,rest);}return p;};
  // Edge endpoints never move in material space. Reuse even unsplit edge
  // decisions across passes instead of evaluating their nonlinear map again.
  const midpoints=new Map();
  for(let pass=0;pass<passes;pass++){
    const output=[];
    function midpoint(a,b){
      const high=Math.max(a,b),low=Math.min(a,b),key=high*(high+1)/2+low;if(midpoints.has(key))return midpoints.get(key);
      if(!mapPoint&&Math.max(masks[a],masks[b])<=.02){midpoints.set(key,-1);return -1;}
      const pa=point(a),pb=point(b);
      const p=[(pa[0]+pb[0])*.5,(pa[1]+pb[1])*.5,(pa[2]+pb[2])*.5];
      let split=Math.max(masks[a],masks[b])>.02&&distance(pa,pb)>target,mp;
      if(mapPoint){const da=display(a),db=display(b);if(travel[a]+travel[b]>1e-9){mp=mapPoint(p);split||=distance(da,db)>target||Math.hypot(mp[0]-(da[0]+db[0])*.5,mp[1]-(da[1]+db[1])*.5,mp[2]-(da[2]+db[2])*.5)>target*.1;}}
      if(!split){midpoints.set(key,-1);return -1;}
      // Marching tetrahedra describe a piecewise-affine zero surface. Keep
      // each midpoint on its original edge. Projecting it onto a different
      // trilinear field can cross a cut/capsule crease and fold tiny faces
      // into long reflective slivers once the flap is pulled.
      let normal=[0,1,2].map(i=>(normals[a*3+i]+normals[b*3+i])*.5);
      const normalLength=Math.hypot(...normal);normal=normalLength>1e-10?normal.map(v=>v/normalLength):normals.slice(a*3,a*3+3);
      const id=positions.length/3;positions.push(...p);points[id]=p;normals.push(...normal);for(let i=0;i<3;i++)colors.push((colors[a*3+i]+colors[b*3+i])*.5);masks.push((masks[a]+masks[b])*.5);midpoints.set(key,id);if(mp){mapped[id]=mp;travel[id]=distance(mp,p);}return id;
    }
    for(let i=0;i<indices.length;i+=3){
      const a=indices[i],b=indices[i+1],c=indices[i+2],ab=midpoint(a,b),bc=midpoint(b,c),ca=midpoint(c,a),bits=(ab>=0?1:0)|(bc>=0?2:0)|(ca>=0?4:0);
      // Exact topology identity for worker reuse, independent of the hand
      // pose that produced it. Rest-space attributes depend only on these
      // edge decisions and the unchanged scalar/normal input.
      if(bits&&splitTrace)splitTrace.push(pass,i,bits);
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
