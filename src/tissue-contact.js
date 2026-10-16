import * as THREE from 'three';

const boxDistanceSquared=(p,b)=>Math.max(b[0]-p.x,0,p.x-b[3])**2+Math.max(b[1]-p.y,0,p.y-b[4])**2+Math.max(b[2]-p.z,0,p.z-b[5])**2;

/** Chunk-local triangle hierarchy. Topology is built once; only bounds refit
 * when that chunk's displayed positions change. Queries never scan the whole
 * parent organ's triangles and do not mutate render geometry bounds. */
class SurfaceIndex {
  constructor(geometry){
    this.geometry=geometry;this.positions=geometry.attributes.position;this.indices=geometry.index.array;
    const triangles=Array.from({length:this.indices.length/3},(_,i)=>i);
    const centroid=(triangle,axis)=>{
      const i=triangle*3,a=this.indices[i],b=this.indices[i+1],c=this.indices[i+2];
      return (this.positions.array[a*3+axis]+this.positions.array[b*3+axis]+this.positions.array[c*3+axis])/3;
    };
    const build=list=>{
      if(list.length<=12)return {triangles:list,bounds:new Float64Array(6)};
      const low=[Infinity,Infinity,Infinity],high=[-Infinity,-Infinity,-Infinity];
      for(const triangle of list)for(let axis=0;axis<3;axis++){const v=centroid(triangle,axis);low[axis]=Math.min(low[axis],v);high[axis]=Math.max(high[axis],v);}
      let axis=0;for(let i=1;i<3;i++)if(high[i]-low[i]>high[axis]-low[axis])axis=i;
      list.sort((a,b)=>centroid(a,axis)-centroid(b,axis));const half=list.length>>1;
      return {left:build(list.slice(0,half)),right:build(list.slice(half)),bounds:new Float64Array(6)};
    };
    this.root=build(triangles);this.version=-1;
  }
  refit(){
    if(this.version===this.positions.version)return;
    const p=this.positions.array,indices=this.indices;
    const visit=node=>{
      const bounds=node.bounds;bounds.set([Infinity,Infinity,Infinity,-Infinity,-Infinity,-Infinity]);
      if(node.triangles){
        for(const triangle of node.triangles)for(let j=0;j<3;j++){
          const index=indices[triangle*3+j]*3;
          for(let axis=0;axis<3;axis++){bounds[axis]=Math.min(bounds[axis],p[index+axis]);bounds[axis+3]=Math.max(bounds[axis+3],p[index+axis]);}
        }
      }else{
        visit(node.left);visit(node.right);
        for(let axis=0;axis<3;axis++){bounds[axis]=Math.min(node.left.bounds[axis],node.right.bounds[axis]);bounds[axis+3]=Math.max(node.left.bounds[axis+3],node.right.bounds[axis+3]);}
      }
    };
    visit(this.root);this.version=this.positions.version;
  }
  nearest(point,maximum){
    this.refit();let best=maximum*maximum,result=null;
    const triangle=new THREE.Triangle(),candidate=new THREE.Vector3(),barycentric=new THREE.Vector3(),temporary=new THREE.Vector3();
    const positions=this.positions,normals=this.geometry.attributes.normal,indices=this.indices,stack=[this.root];
    while(stack.length){
      const node=stack.pop();if(boxDistanceSquared(point,node.bounds)>best)continue;
      if(!node.triangles){
        const a=boxDistanceSquared(point,node.left.bounds),b=boxDistanceSquared(point,node.right.bounds);
        if(a<b){stack.push(node.right,node.left);}else stack.push(node.left,node.right);continue;
      }
      for(const id of node.triangles){
        const a=indices[id*3],b=indices[id*3+1],c=indices[id*3+2];
        triangle.a.fromBufferAttribute(positions,a);triangle.b.fromBufferAttribute(positions,b);triangle.c.fromBufferAttribute(positions,c);
        triangle.closestPointToPoint(point,candidate);const distance=point.distanceToSquared(candidate);if(distance>best)continue;
        best=distance;triangle.getBarycoord(candidate,barycentric);
        const normal=new THREE.Vector3().fromBufferAttribute(normals,a).multiplyScalar(barycentric.x);
        normal.addScaledVector(temporary.fromBufferAttribute(normals,b),barycentric.y).addScaledVector(temporary.fromBufferAttribute(normals,c),barycentric.z);
        if(!Number.isFinite(normal.lengthSq())||normal.lengthSq()<1e-12)triangle.getNormal(normal);else normal.normalize();
        result=candidate.clone();result.normal=normal;
      }
    }
    return result;
  }
}

const indices=new WeakMap();
export function closestParentSurface(meshes,point,margin){
  let result=null,best=margin;
  for(const mesh of meshes){
    const geometry=mesh.geometry;
    if(!geometry.index?.count||geometry.boundingBox?.distanceToPoint(point)>best)continue;
    let index=indices.get(geometry);if(!index){index=new SurfaceIndex(geometry);indices.set(geometry,index);}
    const candidate=index.nearest(point,best);if(!candidate)continue;
    best=candidate.distanceTo(point);result=candidate;
  }
  return result;
}
