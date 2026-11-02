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
  boxVertexDistance(box,inverse,bounds,maximum){
    this.refit();let best=maximum;
    const triangle=new THREE.Triangle(),stack=[this.root],positions=this.positions,indices=this.indices;
    while(stack.length){
      const node=stack.pop();if(boxesDistanceSquared(bounds,node.bounds)>best*best)continue;
      if(!node.triangles){stack.push(node.left,node.right);continue;}
      for(const id of node.triangles){
        triangle.a.fromBufferAttribute(positions,indices[id*3]).applyMatrix4(inverse);
        triangle.b.fromBufferAttribute(positions,indices[id*3+1]).applyMatrix4(inverse);
        triangle.c.fromBufferAttribute(positions,indices[id*3+2]).applyMatrix4(inverse);
        if(box.intersectsTriangle(triangle))return 0;
        best=Math.min(best,box.distanceToPoint(triangle.a),box.distanceToPoint(triangle.b),box.distanceToPoint(triangle.c));
      }
    }
    return best;
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

/** Exact distance between the displayed triangles and a rigid oriented box.
 * Triangle vertices, box edges, and SAT intersections cover all closest cases.
 */
export function closestParentBox(meshes,box,matrix,margin){
  const list=Array.from(meshes),world=box.clone().applyMatrix4(matrix),inverse=matrix.clone().invert(),bounds=[...world.min.toArray(),...world.max.toArray()];let best=margin;
  for(const mesh of list){
    const geometry=mesh.geometry,b=geometry.boundingBox;
    if(!geometry.index?.count||boxesDistanceSquared(bounds,[...b.min.toArray(),...b.max.toArray()])>best*best)continue;
    let index=indices.get(geometry);if(!index){index=new SurfaceIndex(geometry);indices.set(geometry,index);}
    best=Math.min(best,index.boxVertexDistance(box,inverse,bounds,best));if(best===0)return 0;
  }
  const corners=[];for(let z=0;z<2;z++)for(let y=0;y<2;y++)for(let x=0;x<2;x++)corners.push(new THREE.Vector3(x?box.max.x:box.min.x,y?box.max.y:box.min.y,z?box.max.z:box.min.z).applyMatrix4(matrix));
  for(let i=0;i<8;i++)for(const bit of [1,2,4])if(!(i&bit)){
    const hit=closestParentSegment(list,corners[i],corners[i|bit],best);if(hit)best=Math.min(best,hit.distance);if(best===0)return 0;
  }
  return best;
}

function trianglePairDistance(a,b,s){
  let best=Infinity;
  const take=(p,q)=>{const d=p.distanceToSquared(q);if(d<best){best=d;s.closestA.copy(p);s.closestB.copy(q);}};
  for(const p of [a.a,a.b,a.c]){b.closestPointToPoint(p,s.q);take(p,s.q);}
  for(const p of [b.a,b.b,b.c]){a.closestPointToPoint(p,s.p);take(s.p,p);}
  const av=[a.a,a.b,a.c],bv=[b.a,b.b,b.c];
  for(let i=0;i<3;i++)for(let j=0;j<3;j++){closestSegments(av[i],av[(i+1)%3],bv[j],bv[(j+1)%3],s.p,s.q,s.u,s.v,s.r);take(s.p,s.q);}
  for(let side=0;side<2;side++)for(let i=0;i<3;i++){
    const vertices=side?bv:av,p=vertices[i],q=vertices[(i+1)%3],two=side?a:b;
    s.direction.subVectors(q,p);const length=s.direction.length();if(length<1e-15)continue;
    s.ray.set(p,s.direction.divideScalar(length));
    if(s.ray.intersectTriangle(two.a,two.b,two.c,false,s.hit)&&s.hit.distanceToSquared(p)<=length*length+1e-18){s.closestA.copy(s.hit);s.closestB.copy(s.hit);return 0;}
  }
  return Math.sqrt(best);
}

/** Full original metal triangles against full displayed organ triangles.
 * Both immutable hierarchies remain complete; boxes only prune distant pairs.
 * This resolves the empty spaces that conservative wrist boxes also enclose. */
export function closestParentMetal(meshes,metal,matrix,margin,details=null){
  const transformed=new Map(),localParents=new Map(),faces=new Map(),parentFaces=new Map(),m=matrix.elements;
  let rigid=true;for(let i=0;i<3;i++)for(let j=0;j<3;j++)if(Math.abs(m[i*4]*m[j*4]+m[i*4+1]*m[j*4+1]+m[i*4+2]*m[j*4+2]-(i===j?1:0))>1e-10)rigid=false;
  const inverse=rigid?matrix.clone().invert().elements:null;
  const transformBounds=(b,e)=>{
    const c=[(b[0]+b[3])*.5,(b[1]+b[4])*.5,(b[2]+b[5])*.5],h=[(b[3]-b[0])*.5,(b[4]-b[1])*.5,(b[5]-b[2])*.5],p=[],r=[];
    for(let i=0;i<3;i++){p[i]=e[i]*c[0]+e[4+i]*c[1]+e[8+i]*c[2]+e[12+i];r[i]=Math.abs(e[i])*h[0]+Math.abs(e[4+i])*h[1]+Math.abs(e[8+i])*h[2]+1e-12;}
    return[p[0]-r[0],p[1]-r[1],p[2]-r[2],p[0]+r[0],p[1]+r[1],p[2]+r[2]];
  };
  const faceBounds=t=>[Math.min(t.a.x,t.b.x,t.c.x)-1e-12,Math.min(t.a.y,t.b.y,t.c.y)-1e-12,Math.min(t.a.z,t.b.z,t.c.z)-1e-12,Math.max(t.a.x,t.b.x,t.c.x)+1e-12,Math.max(t.a.y,t.b.y,t.c.y)+1e-12,Math.max(t.a.z,t.b.z,t.c.z)+1e-12];
  const bounds=node=>{
    let out=transformed.get(node);if(out)return out;out=transformBounds(node.bounds,m);transformed.set(node,out);return out;
  };
  const lowerBound=(metalNode,parentNode)=>{
    const world=boxesDistanceSquared(bounds(metalNode),parentNode.bounds);if(!inverse)return world;
    let local=localParents.get(parentNode);if(!local){local=transformBounds(parentNode.bounds,inverse);localParents.set(parentNode,local);}
    // A long diagonal shaft has a very loose world-axis box. The same
    // complete pair in source axes supplies another conservative distance;
    // rigid transforms preserve the metric, so their maximum is still safe.
    return Math.max(world,boxesDistanceSquared(metalNode.bounds,local));
  };
  const scratch={p:new THREE.Vector3(),q:new THREE.Vector3(),u:new THREE.Vector3(),v:new THREE.Vector3(),r:new THREE.Vector3(),direction:new THREE.Vector3(),hit:new THREE.Vector3(),closestA:new THREE.Vector3(),closestB:new THREE.Vector3(),ray:new THREE.Ray()};
  const root=metal.tree.root,rootBounds=bounds(root),stack=[];let best=margin;
  for(const mesh of meshes){
    const g=mesh.geometry,box=g.boundingBox;if(!g.index?.count||boxesDistanceSquared(rootBounds,[...box.min.toArray(),...box.max.toArray()])>best*best)continue;
    let index=indices.get(g);if(!index){index=new SurfaceIndex(g);indices.set(g,index);}index.refit();
    const lower=lowerBound(root,index.root);if(lower<=best*best)stack.push({metal:root,parent:index.root,index,lower});
  }
  stack.sort((x,y)=>y.lower-x.lower);
  const span=b=>(b[3]-b[0])**2+(b[4]-b[1])**2+(b[5]-b[2])**2;
  while(stack.length){
    const item=stack.pop();if(item.lower>best*best)continue;
    const x=item.metal,y=item.parent;
    if(x.triangles&&y.triangles){
      let parent=parentFaces.get(item.index);if(!parent){parent=new Map();parentFaces.set(item.index,parent);}
      for(const id of x.triangles){
        let face=faces.get(id);if(!face){const t=new THREE.Triangle();t.a.fromArray(metal.positions,metal.indices[id*3]*3).applyMatrix4(matrix);t.b.fromArray(metal.positions,metal.indices[id*3+1]*3).applyMatrix4(matrix);t.c.fromArray(metal.positions,metal.indices[id*3+2]*3).applyMatrix4(matrix);face={triangle:t,bounds:faceBounds(t)};faces.set(id,face);}
        for(const other of y.triangles){
          let target=parent.get(other);if(!target){const t=new THREE.Triangle();t.a.fromBufferAttribute(item.index.positions,item.index.indices[other*3]);t.b.fromBufferAttribute(item.index.positions,item.index.indices[other*3+1]);t.c.fromBufferAttribute(item.index.positions,item.index.indices[other*3+2]);target={triangle:t,bounds:faceBounds(t)};parent.set(other,target);}
          // Leaf boxes contain several faces. Keep every face, but skip a
          // pair whose own conservative bounds already exceed the best gap.
          if(boxesDistanceSquared(face.bounds,target.bounds)>best*best)continue;
          const distance=trianglePairDistance(face.triangle,target.triangle,scratch);
          if(distance<best){best=distance;if(details){details.point=scratch.closestA.clone();details.surface=scratch.closestB.clone();details.normal=target.triangle.getNormal(new THREE.Vector3());}}
          if(best<1e-12)return 0;
        }
      }
    }else{
      const splitMetal=!x.triangles&&(y.triangles||span(bounds(x))>=span(y.bounds)),children=[];
      for(const child of splitMetal?[x.left,x.right]:[y.left,y.right]){
        const one=splitMetal?child:x,two=splitMetal?y:child,lower=lowerBound(one,two);
        if(lower<=best*best)children.push({metal:one,parent:two,index:item.index,lower});
      }
      children.sort((one,two)=>two.lower-one.lower);stack.push(...children);
    }
  }
  return best;
}
