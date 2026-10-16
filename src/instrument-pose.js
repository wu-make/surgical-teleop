import {INSTRUMENT_COLLISION_DATA} from './instrument-collision-data.js';

const Z=[0,0,1], identity=[0,0,0,1];
const add=(a,b)=>a.map((v,i)=>v+b[i]);
const subtract=(a,b)=>a.map((v,i)=>v-b[i]);
const dot=(a,b)=>a.reduce((n,v,i)=>n+v*b[i],0);
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const normalized=(a,fallback=Z)=>{const length=Math.hypot(...a);return length>1e-12?a.map(v=>v/length):[...fallback];};
export function quaternionProduct(a,b){return [a[3]*b[0]+a[0]*b[3]+a[1]*b[2]-a[2]*b[1],a[3]*b[1]-a[0]*b[2]+a[1]*b[3]+a[2]*b[0],a[3]*b[2]+a[0]*b[1]-a[1]*b[0]+a[2]*b[3],a[3]*b[3]-a[0]*b[0]-a[1]*b[1]-a[2]*b[2]];}
export function rotateVector(point,q){const t=cross(q,point).map(v=>v*2),u=cross(q,t);return point.map((v,i)=>v+q[3]*t[i]+u[i]);}
function axisQuaternion(axis,angle){const sine=Math.sin(angle*.5);return [...axis.map(v=>v*sine),Math.cos(angle*.5)];}
function unitQuaternion(from,to){let r=dot(from,to)+1;let q;if(r<1e-12){q=Math.abs(from[0])>Math.abs(from[2])?[-from[1],from[0],0,0]:[0,-from[2],from[1],0];}else q=[...cross(from,to),r];return normalized(q,identity);}
export function slerpInstrumentAlignment(a,b,t){if(t<=0)return [...a];if(t>=1)return [...b];let cosine=dot(a,b);if(cosine<0){b=b.map(v=>-v);cosine=-cosine;}if(cosine>1-1e-10)return normalized(a.map((v,i)=>v+(b[i]-v)*t),identity);const angle=Math.acos(Math.min(1,cosine)),sine=Math.sin(angle);return a.map((v,i)=>(v*Math.sin((1-t)*angle)+b[i]*Math.sin(t*angle))/sine);}
function rpyQuaternion([r,p,y]){const cr=Math.cos(r/2),sr=Math.sin(r/2),cp=Math.cos(p/2),sp=Math.sin(p/2),cy=Math.cos(y/2),sy=Math.sin(y/2);return [sr*cp*cy-cr*sp*sy,cr*sp*cy+sr*cp*sy,cr*cp*sy-sr*sp*cy,cr*cp*cy+sr*sp*sy];}
const models=Object.fromEntries(Object.entries(INSTRUMENT_COLLISION_DATA).map(([name,data])=>[name,{...data,joints:data.joints.map(j=>({...j,rest:rpyQuaternion(j.origin.rpy)}))}]));

export const instrumentName=tool=>tool.instrument??(tool.port[0]<0?'needle-driver':'scissors');

function savedAlignment(tool,seed=tool.alignment){
  let alignment=Array.isArray(seed)&&seed.length===4?[...seed]:unitQuaternion(Z,normalized(subtract(tool.position,tool.port)));
  if(Math.abs(Math.hypot(...alignment)-1)>1e-12)alignment=normalized(alignment,identity);
  return alignment;
}

/** Explicit command-time frame resolution. Call once when constructing the
 * desired movement endpoint, then sweep from the original saved frame to this
 * resolved endpoint. Reading CAD/contact/history must never advance this servo.
 * Inside 3 mm retain the saved frame, avoiding a half-turn across the RCM; the
 * 3–20 mm band gradually recovers the normal radial shaft orientation. */
export function resolveInstrumentAlignment(tool,seedAlignment=tool.alignment){
  let alignment=savedAlignment(tool,seedAlignment);
  const delta=subtract(tool.position,tool.port),distance=Math.hypot(...delta);
  if(distance>.003){const from=rotateVector(Z,alignment),to=normalized(delta);if(Math.hypot(...subtract(from,to))>1e-12){const next=quaternionProduct(unitQuaternion(from,to),alignment),u=Math.max(0,Math.min(1,(distance-.003)/.017));alignment=u===1?next:slerpInstrumentAlignment(alignment,next,u*u*(3-2*u));}}
  return alignment;
}

/** The same source URDF forward kinematics drives both visible CAD and contact.
 * The transported frame is saved with tool state, so collision and rendering
 * cannot choose different roll gauges after a bend, reset or history restore.
 * This is a pure read of an already resolved frame: repeated rendering, contact
 * queries and snapshot restore cannot move a stationary instrument. */
export function instrumentPose(tool){
  const model=models[instrumentName(tool)],links={adaptor_link:{position:[0,0,0],quaternion:identity}};
  const angles={roll:tool.wrist?.[2]??0,wrist_pitch:tool.wrist?.[0]??0,wrist_yaw:tool.wrist?.[1]??0,jaw:Math.max(0,Math.min(1,tool.jaw??0))*1.1};
  for(const joint of model.joints){
    const parent=links[joint.parent];if(!parent)throw new Error('Invalid source instrument link hierarchy');
    const angle=joint.mimic?angles[joint.mimic.joint]*Number(joint.mimic.multiplier):angles[joint.name]??0;
    const local=joint.type==='fixed'?joint.rest:quaternionProduct(joint.rest,axisQuaternion(joint.axis,angle));
    links[joint.child]={position:add(parent.position,rotateVector(joint.origin.xyz,parent.quaternion)),quaternion:quaternionProduct(parent.quaternion,local)};
  }
  const localTip=links.tool_tip_link.position,delta=subtract(tool.position,tool.port),distance=Math.hypot(...delta);
  const alignment=savedAlignment(tool);
  const perpendicular=localTip[0]**2+localTip[1]**2;
  const fromPort=normalized([localTip[0],localTip[1],Math.sqrt(Math.max(1e-10,distance*distance-perpendicular))]);
  const quaternion=quaternionProduct(alignment,unitQuaternion(fromPort,Z));
  const position=subtract(tool.position,rotateVector(localTip,quaternion));
  return {position,quaternion,alignment,links,localTip,shaftDirection:rotateVector(Z,quaternion),rcmFeasible:distance*distance+1e-12>=perpendicular};
}

export function instrumentCapsules(tool,pose=instrumentPose(tool)){
  const data=INSTRUMENT_COLLISION_DATA[instrumentName(tool)];
  return data.capsules.map(capsule=>{
    const link=pose.links[capsule.link];
    const world=point=>add(pose.position,rotateVector(add(link.position,rotateVector(point,link.quaternion)),pose.quaternion));
    const a=world(capsule.a),b=world(capsule.b),radius=capsule.radius;
    return {a,b,radius,id:capsule.id,part:capsule.region,
      min:a.map((v,i)=>Math.min(v,b[i])-radius),max:a.map((v,i)=>Math.max(v,b[i])+radius)};
  });
}
