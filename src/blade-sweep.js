import * as THREE from 'three';
import {normalizeDeformation} from './tissue-worker.js';

// Samples are physical copies of the complete source blade, never TCP lines.
// Keep an individual worker pass small even when input outruns meshing.
export const CUT_SWEEP=Object.freeze({spacing:.001,maxBatchSegments:64,maxPendingFrames:2048,maxPendingSamples:8192});

export function captureBladePose(blade,point,quaternion,jaw,wrist,deformation){
  const inverse=quaternion.clone().invert(),segments=blade.segments.map(({a,b})=>({a:a.clone(),b:b.clone()}));
  const material=normalizeDeformation(deformation);
  return {segments,point:point.clone(),quaternion:quaternion.clone(),jaw,wrist:[...wrist],source:blade.source,
    deformation:JSON.stringify(material),material,
    localSegments:segments.map(({a,b})=>({a:a.clone().sub(point).applyQuaternion(inverse),b:b.clone().sub(point).applyQuaternion(inverse)}))};
}

function compatibleMaterial(a,b){
  if(!a||!b)return true;
  return a.model===b.model&&a.local.every((v,i)=>Math.abs(v-b.local[i])<1e-9)&&Math.abs(a.radius-b.radius)<1e-9&&Math.abs((a.coreRadius??0)-(b.coreRadius??0))<1e-9;
}

export function bladeSpan(from,to){
  if(!from||from.source!==to.source||from.segments.length!==to.segments.length||!compatibleMaterial(from.material,to.material))return {from:to,to,steps:1,index:0,length:0};
  let shapeTravel=0,radius=0;
  for(let i=0;i<to.localSegments.length;i++)for(const key of ['a','b']){
    shapeTravel=Math.max(shapeTravel,from.localSegments[i][key].distanceTo(to.localSegments[i][key]));
    radius=Math.max(radius,from.localSegments[i][key].length(),to.localSegments[i][key].length());
  }
  const materialTravel=new THREE.Vector3(...(from.material?.displacement??[0,0,0])).distanceTo(new THREE.Vector3(...(to.material?.displacement??[0,0,0])));
  // Translation + rotation arc + local jaw articulation bounds every blade
  // endpoint's travel. Material motion is included so a moving held flap does
  // not pass through a stationary shear between sampled render frames.
  const length=from.point.distanceTo(to.point)+radius*from.quaternion.angleTo(to.quaternion)+shapeTravel+materialTravel;
  return {from,to,steps:Math.max(1,Math.ceil(length/CUT_SWEEP.spacing)),index:0,length};
}

export function sampleBladeSpan(span,index){
  const t=index/span.steps,{from,to}=span;
  if(t>=1||from===to)return to;
  const point=from.point.clone().lerp(to.point,t),quaternion=from.quaternion.clone().slerp(to.quaternion,t);
  const materialBase=from.material??to.material;
  const material=materialBase?normalizeDeformation({...materialBase,displacement:[0,1,2].map(i=>(from.material?.displacement[i]??0)*(1-t)+(to.material?.displacement[i]??0)*t)}):null;
  const segments=from.localSegments.map((segment,i)=>Object.fromEntries(['a','b'].map(key=>[key,segment[key].clone().lerp(to.localSegments[i][key],t).applyQuaternion(quaternion).add(point)])));
  return {point,quaternion,segments,material,deformation:JSON.stringify(material),source:to.source,
    jaw:from.jaw+(to.jaw-from.jaw)*t,wrist:from.wrist.map((v,i)=>v+(to.wrist[i]-v)*t)};
}
