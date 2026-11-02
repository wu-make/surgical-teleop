import {instrumentPose,instrumentCapsules,rotateVector,resolveInstrumentAlignment,quaternionProduct} from './instrument-pose.js';
import {SCISSORS_BLADE_PROFILE} from './scissors-blade-profile.js';
const add=(a,b)=>a.map((v,i)=>v+b[i]);
export const SCISSORS_GUIDE_CLEARANCE=.00005;

/** The same measured curved blade ends as the visible source GLB. */
export function scissorsAnchor(tool,pose=instrumentPose(tool)){
  const ends=SCISSORS_BLADE_PROFILE.profiles.map(profile=>{
    const link=pose.links[profile.link],local=add(link.position,rotateVector(profile.points.at(-1),link.quaternion));
    return add(pose.position,rotateVector(local,pose.quaternion));
  });
  return ends[0].map((v,i)=>(v+ends[1][i])*.5);
}

/** Optical focus follows the visible source blade end, not its command frame. */
export function instrumentFocusPoint(tool){return tool.instrument==='scissors'?scissorsAnchor(tool):[...tool.position];}

export function scissorsSegments(tool,pose=instrumentPose(tool)){
  return SCISSORS_BLADE_PROFILE.profiles.flatMap(profile=>{
    const link=pose.links[profile.link],points=profile.points.map(p=>add(pose.position,rotateVector(add(link.position,rotateVector(p,link.quaternion)),pose.quaternion)));
    return points.slice(1).map((b,i)=>({a:points[i],b}));
  });
}

/** Solve a command TCP for the real distal blade midpoint. The saved roll
 * gauge is resolved exactly as a public controller move, without mutating it. */
export function scissorsTarget(tool,target,{alignmentSeed=tool.alignment}={}){
  const current=scissorsAnchor(tool);let position=tool.position.map((v,i)=>v+target[i]-current[i]),error=Infinity,iterations=0;
  for(;iterations<10;iterations++){
    const candidate={...tool,position};candidate.alignment=resolveInstrumentAlignment(candidate,alignmentSeed);
    const actual=scissorsAnchor(candidate),delta=target.map((v,i)=>v-actual[i]);error=Math.hypot(...delta);
    if(error<.000025)break;
    position=add(position,delta);
  }
  return{position,error,iterations,alignment:resolveInstrumentAlignment({...tool,position},alignmentSeed)};
}

const nearAngle=(value,reference)=>reference+Math.atan2(Math.sin(value-reference),Math.cos(value-reference));
function alignmentTwist(from,to){
  const inverse=[-from[0],-from[1],-from[2],from[3]],q=quaternionProduct(inverse,to);
  return 2*Math.atan2(q[2],q[3]);
}

/** Express the saved physical orientation in one fixed transported frame. */
export function canonicalScissorsWrist(tool,referenceAlignment){
  const reference=resolveInstrumentAlignment(tool,referenceAlignment);
  return[tool.wrist[0],tool.wrist[1],tool.wrist[2]+alignmentTwist(reference,tool.alignment)];
}

/** Realise the same CAD pose after a different withdrawal/approach path.
 * Transporting the RCM frame changes its axial gauge. Counter-rotating the
 * actual roll joint preserves the planned physical blades and wrist exactly.
 */
export function scissorsPoseCommand(tool,target,wrist,referenceAlignment){
  const canonical={...tool,wrist};canonical.alignment=resolveInstrumentAlignment(canonical,referenceAlignment);
  const solution=scissorsTarget(canonical,target,{alignmentSeed:referenceAlignment});
  const alignment=resolveInstrumentAlignment({...tool,position:solution.position},tool.alignment);
  const roll=nearAngle(wrist[2]-alignmentTwist(solution.alignment,alignment),tool.wrist[2]);
  return{...solution,alignment,wrist:[wrist[0],wrist[1],roll],jaw:tool.jaw};
}

/** Preview the actual source wrist/shaft at a fixed cutting point. Distance
 * queries are supplied by the live organ, including its real incision field. */
export function scissorsBodyClearance(tool,target,distance,wrist=tool.wrist){
  const candidate={...tool,wrist},solution=scissorsTarget(candidate,target);
  if(solution.error>.00015)return{minimum:-Infinity,penalty:Infinity,solution};
  candidate.position=solution.position;candidate.alignment=resolveInstrumentAlignment(candidate,tool.alignment);
  let minimum=Infinity,penalty=0;
  for(const capsule of instrumentCapsules(candidate)){
    if(capsule.part==='jaw')continue;
    const p=capsule.part==='shaft'?capsule.b:capsule.a.map((v,i)=>(v+capsule.b[i])*.5),d=distance(p)-(tool.bodyEnvelope?capsule.radius:0);
    minimum=Math.min(minimum,d);penalty+=Math.max(0,SCISSORS_GUIDE_CLEARANCE-d)**2;
  }
  return{minimum,penalty,solution};
}
