import * as THREE from 'three';
import {boundaryProjection} from './surgical-cases.js';

export const BOUNDARY_ASSIST=Object.freeze({capture:.008,maxSpeed:.010,strength:.78});
/** Move the visible real blade, never invisible cutters. Physical CAD collision
 * sweeps remain authoritative. Distant, open, paused or left-hand operations
 * cannot be attracted; guidance cancels immediately with C/Space/H. */
export function assistBoundary({sim,tissue,definition,keys,dt,blade,enabled=true,demoActive=false}){
  const idle={engaged:false,correctionMm:0};
  if(!enabled||!definition.boundary||demoActive||sim.state.paused||sim.state.selected!=='right'||!sim.state.cutting||!keys.has('KeyC')||keys.has('KeyH')||keys.has('Space')||keys.has('KeyV')||sim.state.tools.right.jaw>.65)return idle;
  let best=null;
  for(const segment of blade?.segments??[])for(const input of [segment.a,segment.b]){
    const world=input?.isVector3?input.clone():new THREE.Vector3(...input),local=tissue.group.worldToLocal(world.clone()),reference=tissue.toReferencePoint(local);
    const projected=boundaryProjection(reference.toArray(),definition.boundary);
    if(projected&&projected.distance<BOUNDARY_ASSIST.capture&&(!best||projected.distance<best.distance))best={...projected,world};
  }
  if(!best)return idle;
  const desired=tissue.group.localToWorld(tissue.deformPoint(new THREE.Vector3(...best.target))),delta=desired.sub(best.world);
  const limit=BOUNDARY_ASSIST.maxSpeed*Math.max(0,Math.min(.05,dt)),length=delta.length();
  if(length>0)delta.multiplyScalar(Math.min(BOUNDARY_ASSIST.strength,limit/length));
  const before=new THREE.Vector3(...sim.state.tools.right.position),result=sim.moveToolTo(before.clone().add(delta).toArray(),'right');
  const correction=before.distanceTo(new THREE.Vector3(...sim.state.tools.right.position));
  return {engaged:!result.limited,blocked:result.limited,correctionMm:correction*1000,distanceMm:best.distance*1000};
}
