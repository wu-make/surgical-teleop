import * as THREE from 'three';
import {buildSurfaceTree,unpackSurfaceTree} from './surface-tree.js';

const boxDistanceSquared=(p,b)=>Math.max(b[0]-p.x,0,p.x-b[3])**2+Math.max(b[1]-p.y,0,p.y-b[4])**2+Math.max(b[2]-p.z,0,p.z-b[5])**2;
const boxesDistanceSquared=(a,b)=>Math.max(b[0]-a[3],a[0]-b[3],0)**2+Math.max(b[1]-a[4],a[1]-b[4],0)**2+Math.max(b[2]-a[5],a[2]-b[5],0)**2;
// A swept AABB is only a broad phase. Clip the actual segment to each tree
// node before inspecting triangles, including parallel and grazing segments.
const segmentEntersBox=(start,direction,bounds,maximum)=>{
  let low=0,high=maximum+1e-10;
  for(let axis=0;axis<3;axis++){
    const p=axis===0?start.x:axis===1?start.y:start.z,d=axis===0?direction.x:axis===1?direction.y:direction.z;
    const min=bounds[axis]-1e-12,max=bounds[axis+3]+1e-12;
    if(d===0){if(p<min||p>max)return false;continue;}
    let a=(min-p)/d,b=(max-p)/d;if(a>b)[a,b]=[b,a];low=Math.max(low,a);high=Math.min(high,b);if(low>high)return false;
  }
  return true;
};

function closestSegments(a,b,c,d,p,q,u,v,r){
  u.subVectors(b,a);v.subVectors(d,c);r.subVectors(a,c);
  const aa=u.lengthSq(),ee=v.lengthSq(),f=v.dot(r);let s=0,t=0;
  if(aa<=1e-20&&ee<=1e-20){p.copy(a);q.copy(c);return;}
  if(aa<=1e-20)t=THREE.MathUtils.clamp(f/ee,0,1);
  else{
    const cc=u.dot(r);
    if(ee<=1e-20)s=THREE.MathUtils.clamp(-cc/aa,0,1);
    else{
      const bb=u.dot(v),denominator=aa*ee-bb*bb;
      if(denominator>1e-20)s=THREE.MathUtils.clamp((bb*f-cc*ee)/denominator,0,1);
      t=(bb*s+f)/ee;
      if(t<0){t=0;s=THREE.MathUtils.clamp(-cc/aa,0,1);}else if(t>1){t=1;s=THREE.MathUtils.clamp((bb-cc)/aa,0,1);}
    }
  }
  p.copy(a).addScaledVector(u,s);q.copy(c).addScaledVector(v,t);
}

/** Chunk-local triangle hierarchy. Topology is built once; only bounds refit
 * when that chunk's displayed positions change. Queries never scan the whole
 * parent organ's triangles and do not mutate render geometry bounds. */
class SurfaceIndex {
  constructor(geometry,profile){
    const start=profile?performance.now():0;
    this.geometry=geometry;this.positions=geometry.attributes.position;this.indices=geometry.index.array;
    const prepared=geometry.userData.surfaceTree;
    const tree=prepared?unpackSurfaceTree(prepared):buildSurfaceTree(this.positions.array,this.indices);
    this.root=tree.root;
    this.boundsStore=tree.boundsStore;
    if(profile){if(prepared){profile.preparedTrees++;profile.adoptMs+=performance.now()-start;}else{profile.builds++;profile.buildMs+=performance.now()-start;}}
    // A deformed parent chunk refits against its actual displayed vertices.
    // Frozen specimens and unchanged chunks already carry exact bounds.
    this.version=prepared&&(this.positions.version!==0||geometry.userData.surfaceTreeNeedsRefit)?-1:this.positions.version;
  }
  refit(profile){
    if(this.version===this.positions.version)return;
    const start=profile?performance.now():0,rest=this.geometry.userData.restSurfaceBounds;
    if(rest&&this.geometry.userData.useRestSurfaceBounds&&rest.length===this.boundsStore.length){this.boundsStore.set(rest);this.version=this.positions.version;if(profile){profile.restBoundsCopies++;profile.refitMs+=performance.now()-start;}return;}
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
    visit(this.root);this.version=this.positions.version;if(profile){profile.refits++;profile.refitMs+=performance.now()-start;}
  }
  firstHit(start,end,profile){
    this.refit(profile);
    const s=this.hitScratch??={direction:new THREE.Vector3(),ray:new THREE.Ray(),triangle:new THREE.Triangle(),hit:new THREE.Vector3(),normal:new THREE.Vector3(),bounds:new Array(6),stack:[]};
    const {direction,ray,triangle,hit,normal,bounds,stack}=s;direction.subVectors(end,start);const length=direction.length();if(length<1e-12)return null;
    direction.divideScalar(length);ray.origin.copy(start);ray.direction.copy(direction);
    bounds[0]=Math.min(start.x,end.x);bounds[1]=Math.min(start.y,end.y);bounds[2]=Math.min(start.z,end.z);bounds[3]=Math.max(start.x,end.x);bounds[4]=Math.max(start.y,end.y);bounds[5]=Math.max(start.z,end.z);
    let best=length+1e-10,result=null;stack.length=0;stack.push(this.root);
    while(stack.length){
      const node=stack.pop();if(boxesDistanceSquared(bounds,node.bounds)>0||!segmentEntersBox(start,direction,node.bounds,best))continue;
      if(!node.triangles){stack.push(node.left,node.right);continue;}
      for(const id of node.triangles){
        triangle.a.fromBufferAttribute(this.positions,this.indices[id*3]);triangle.b.fromBufferAttribute(this.positions,this.indices[id*3+1]);triangle.c.fromBufferAttribute(this.positions,this.indices[id*3+2]);
        triangle.getNormal(normal);if(normal.dot(direction)>=-1e-12)continue;
        if(!ray.intersectTriangle(triangle.a,triangle.b,triangle.c,false,hit))continue;
        const distance=hit.distanceTo(start);if(distance>best)continue;
        best=distance;if(!result){result=new THREE.Vector3();result.normal=new THREE.Vector3();}result.copy(hit);result.normal.copy(normal);result.travel=distance;
      }
    }
    return result;
  }
  nearest(point,maximum,profile){
    this.refit(profile);let best=maximum*maximum,result=null;
    const s=this.nearestScratch??={triangle:new THREE.Triangle(),candidate:new THREE.Vector3(),barycentric:new THREE.Vector3(),temporary:new THREE.Vector3(),stack:[]};
    const {triangle,candidate,barycentric,temporary,stack}=s;stack.length=0;stack.push(this.root);
    const positions=this.positions,normals=this.geometry.attributes.normal,indices=this.indices;
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
        if(!result){result=new THREE.Vector3();result.normal=new THREE.Vector3();}
        const normal=result.normal.fromBufferAttribute(normals,a).multiplyScalar(barycentric.x);
        normal.addScaledVector(temporary.fromBufferAttribute(normals,b),barycentric.y).addScaledVector(temporary.fromBufferAttribute(normals,c),barycentric.z);
        if(!Number.isFinite(normal.lengthSq())||normal.lengthSq()<1e-12)triangle.getNormal(normal);else normal.normalize();
        result.copy(candidate);
      }
    }
    return result;
  }
  nearestSegment(start,end,maximum){
    this.refit();let best=maximum*maximum,result=null;
    const s=this.segmentScratch??={direction:new THREE.Vector3(),ray:new THREE.Ray(),bounds:new Array(6),triangle:new THREE.Triangle(),blade:new THREE.Vector3(),surface:new THREE.Vector3(),hit:new THREE.Vector3(),normal:new THREE.Vector3(),u:new THREE.Vector3(),v:new THREE.Vector3(),r:new THREE.Vector3(),offset:new THREE.Vector3(),stack:[]};
    const {direction,ray,bounds,triangle,blade,surface,hit,normal,u,v,r,offset,stack}=s;direction.subVectors(end,start);const length=direction.length();ray.origin.copy(start);if(length)ray.direction.copy(direction).divideScalar(length);else ray.direction.set(0,0,1);
    bounds[0]=Math.min(start.x,end.x);bounds[1]=Math.min(start.y,end.y);bounds[2]=Math.min(start.z,end.z);bounds[3]=Math.max(start.x,end.x);bounds[4]=Math.max(start.y,end.y);bounds[5]=Math.max(start.z,end.z);
    const p=this.positions,indices=this.indices;stack.length=0;stack.push(this.root);
    const accept=()=>{
      const squared=blade.distanceToSquared(surface);if(squared>best)return;
      best=squared;triangle.getNormal(normal);
      result??={point:new THREE.Vector3(),surface:new THREE.Vector3(),normal:new THREE.Vector3()};result.point.copy(blade);result.surface.copy(surface);result.normal.copy(normal);result.distance=Math.sqrt(best);
      result.t=length?THREE.MathUtils.clamp(offset.subVectors(blade,start).dot(direction)/(length*length),0,1):0;
    };
    while(stack.length){
      const node=stack.pop();if(boxesDistanceSquared(bounds,node.bounds)>best)continue;
      if(!node.triangles){stack.push(node.left,node.right);continue;}
      for(const id of node.triangles){
        triangle.a.fromBufferAttribute(p,indices[id*3]);triangle.b.fromBufferAttribute(p,indices[id*3+1]);triangle.c.fromBufferAttribute(p,indices[id*3+2]);
        if(length&&ray.intersectTriangle(triangle.a,triangle.b,triangle.c,false,hit)&&hit.distanceTo(start)<=length+1e-10){blade.copy(hit);surface.copy(hit);accept();return result;}
        blade.copy(start);triangle.closestPointToPoint(start,surface);accept();
        blade.copy(end);triangle.closestPointToPoint(end,surface);accept();
        closestSegments(start,end,triangle.a,triangle.b,blade,surface,u,v,r);accept();
        closestSegments(start,end,triangle.b,triangle.c,blade,surface,u,v,r);accept();
        closestSegments(start,end,triangle.c,triangle.a,blade,surface,u,v,r);accept();
      }
    }
    return result;
  }
}

const indices=new WeakMap();
/** Earliest inward centre-line crossing, independent of chunk iteration order.
 * Used together with endpoint sphere overlap for small fluid parcels. */
export function firstParentHit(meshes,start,end,profile){
  const began=profile?performance.now():0;
  let result=null,best=start.distanceTo(end)+1e-10;
  const bounds=[Math.min(start.x,end.x),Math.min(start.y,end.y),Math.min(start.z,end.z),Math.max(start.x,end.x),Math.max(start.y,end.y),Math.max(start.z,end.z)];
  for(const mesh of meshes){
    const geometry=mesh.geometry,box=geometry.boundingBox;
    if(!geometry.index?.count||boxesDistanceSquared(bounds,[box.min.x,box.min.y,box.min.z,box.max.x,box.max.y,box.max.z])>0)continue;
    let index=indices.get(geometry);if(!index){index=new SurfaceIndex(geometry,profile);indices.set(geometry,index);}
    const candidate=index.firstHit(start,end,profile);if(candidate&&candidate.travel<best){best=candidate.travel;result=candidate;}
  }
  if(profile){profile.rayQueries++;profile.rayMs+=performance.now()-began;}
  return result;
}
export function closestParentSurface(meshes,point,margin,profile){
  const began=profile?performance.now():0;
  let result=null,best=margin;
  for(const mesh of meshes){
    const geometry=mesh.geometry;
    if(!geometry.index?.count||geometry.boundingBox?.distanceToPoint(point)>best)continue;
    let index=indices.get(geometry);if(!index){index=new SurfaceIndex(geometry,profile);indices.set(geometry,index);}
    const candidate=index.nearest(point,best,profile);if(!candidate)continue;
    best=candidate.distanceTo(point);result=candidate;
  }
  if(profile){profile.nearestQueries++;profile.nearestMs+=performance.now()-began;}
  return result;
}

/** The complete blade may cross tissue even when both ends are in air. */
export function closestParentSegment(meshes,start,end,margin){
  let result=null,best=margin;
  const bounds=[Math.min(start.x,end.x),Math.min(start.y,end.y),Math.min(start.z,end.z),Math.max(start.x,end.x),Math.max(start.y,end.y),Math.max(start.z,end.z)];
  for(const mesh of meshes){
    const geometry=mesh.geometry,box=geometry.boundingBox;
    if(!geometry.index?.count||boxesDistanceSquared(bounds,[box.min.x,box.min.y,box.min.z,box.max.x,box.max.y,box.max.z])>best*best)continue;
    let index=indices.get(geometry);if(!index){index=new SurfaceIndex(geometry);indices.set(geometry,index);}
    const candidate=index.nearestSegment(start,end,best);if(!candidate)continue;
    result=candidate;best=candidate.distance;if(best<1e-10)break;
  }
  return result;
}
