import {Vector3,Box3,Matrix4,Quaternion} from 'three';
import {closestParentSurface,closestParentSegment,closestParentBox,closestParentMetal} from './tissue-contact.js';
import {SCISSORS_BODY_BOXES} from './scissors-body-boxes.js';
import {bodyTriangleGeometry} from './scissors-body-catalogue.js';

/** Motion must clear the committed, visible surface. Submitted CSG records
 * can already describe a cut that the geometry worker has not displayed yet. */
export function displayedBodyDistance(tissue,point,margin=.006){
  if(tissue._meshes?.size){
    const surface=closestParentSurface(tissue._meshes.values(),point,margin);
    if(surface){const delta=point.clone().sub(surface),distance=delta.length();return delta.dot(surface.normal)<0?-distance:distance;}
  }
  return tissue.sampleDistance(point);
}

/** The complete source capsule, including its radius and every point along
 * the shaft/link, must clear the currently displayed surface. */
export function displayedCapsuleClearance(tissue,capsule,details=null){
  const a=tissue.group.worldToLocal(new Vector3(...capsule.a)),b=tissue.group.worldToLocal(new Vector3(...capsule.b));
  const point=capsule.part==='shaft'?b:a.clone().lerp(b,.5);
  if(!tissue._meshes?.size)return displayedBodyDistance(tissue,point)-capsule.radius;
  // An envelope outside the complete organ bounds is provably in free air.
  // Avoid an unlimited nearest-triangle search for every proximal CAD slab.
  // This changes no near-surface query or collision margin.
  const low=[Infinity,Infinity,Infinity],high=[-Infinity,-Infinity,-Infinity];
  for(const {geometry} of tissue._meshes.values()){
    const box=geometry.boundingBox;if(!geometry.index?.count||!box)continue;
    for(let i=0;i<3;i++){low[i]=Math.min(low[i],box.min.getComponent(i));high[i]=Math.max(high[i],box.max.getComponent(i));}
  }
  const margin=capsule.radius+.006;
  if(low.some((v,i)=>Math.max(a.getComponent(i),b.getComponent(i))+margin<v)||high.some((v,i)=>Math.min(a.getComponent(i),b.getComponent(i))-margin>v))return .006;
  // This is the distance of the complete metal envelope to the committed
  // surface. A signed nearest-normal test is discontinuous at a folded cut
  // edge and can change its sign while the tool remains in free air. The
  // caller starts outside and continuously sweeps this surface barrier, so
  // an interior endpoint cannot be reached through a zero-clearance crossing.
  const surface=closestParentSegment(tissue._meshes.values(),a,b,margin);
  if(details&&surface){
    const n=surface.point.clone().sub(surface.surface);
    if(n.lengthSq()<1e-16||n.dot(surface.normal)<0)n.copy(surface.normal);
    n.normalize().transformDirection(tissue.group.matrixWorld);details.normal=n;
  }
  return surface?surface.distance-capsule.radius:.006;
}

/** Intersect two conservative envelopes of the same unchanged source CAD.
 * A circular slab fills empty corners around a flat wrist. Its source-axis
 * box supplies a tighter second proof without omitting any source triangle.
 */
export function displayedCADBodyClearance(tissue,capsule,pose,details=null){
  const coarse=displayedCapsuleClearance(tissue,capsule,details),spec=SCISSORS_BODY_BOXES[capsule.id];
  if(coarse>=.002||!spec||!tissue._meshes?.size)return coarse;
  const link=pose.links[spec.link],matrix=new Matrix4().compose(new Vector3(...pose.position),new Quaternion(...pose.quaternion),new Vector3(1,1,1));
  matrix.multiply(new Matrix4().compose(new Vector3(...link.position),new Quaternion(...link.quaternion),new Vector3(1,1,1)));
  matrix.premultiply(tissue.group.matrixWorld.clone().invert());
  // Keep the full 6 mm distance: traction and free-space checkpoints also
  // consume this metric at 3 and 5 mm, beyond the contact boundary itself.
  const distance=closestParentBox(tissue._meshes.values(),new Box3(new Vector3(...spec.min),new Vector3(...spec.max)),matrix,.006);
  const envelope=Math.max(coarse,distance-.00005),metal=bodyTriangleGeometry(capsule.id)??bodyTriangleGeometry(spec.link);
  if(envelope>.0002||!metal||details?.allowExact===false)return envelope;
  let exact=details?.cache?.get(metal);
  if(!exact){const contact={};exact={distance:closestParentMetal(tissue._meshes.values(),metal,matrix,.006,contact),contact};details?.cache?.set(metal,exact);}
  if(details&&exact.contact.normal){
    const normal=exact.contact.point.clone().sub(exact.contact.surface);
    if(normal.lengthSq()<1e-16||normal.dot(exact.contact.normal)<0)normal.copy(exact.contact.normal);
    details.normal=normal.normalize().transformDirection(tissue.group.matrixWorld);
  }
  return Math.max(envelope,exact.distance-.00015);
}
