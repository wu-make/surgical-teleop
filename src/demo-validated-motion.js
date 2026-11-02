import {instrumentCapsules,resolveInstrumentAlignment,instrumentPose,quaternionProduct} from './instrument-pose.js';
import {canonicalScissorsWrist} from './scissors-kinematics.js';
import {sweepInstrument} from './instrument-contact.js';

const signature=tool=>JSON.stringify(tool);
function at(validation,index,t){
 const start=index?validation.poses[index-1]:validation.base,end=validation.poses[index],pose={...validation.base,position:start.position.map((v,i)=>v+(end.position[i]-v)*t),wrist:start.wrist.map((v,i)=>v+(end.wrist[i]-v)*t),jaw:start.jaw+(end.jaw-start.jaw)*t};
 pose.alignment=resolveInstrumentAlignment(pose,start.alignment);return pose;
}
function sameMetal(a,b){
 if(a.instrument!==b.instrument||a.shaftLength!==b.shaftLength||a.port.some((v,i)=>v!==b.port[i])||Math.abs(a.jaw-b.jaw)>1e-9)return false;
 const pa=instrumentPose(a),pb=instrumentPose(b);
 for(const key of Object.keys(pa.links)){
  const qa=quaternionProduct(pa.quaternion,pa.links[key].quaternion),qb=quaternionProduct(pb.quaternion,pb.links[key].quaternion),sign=qa.reduce((n,v,i)=>n+v*qb[i],0)<0?-1:1;
  if(qa.some((v,i)=>Math.abs(v-sign*qb[i])>1e-8))return false;
 }
 const first=instrumentCapsules(a,pa),second=instrumentCapsules(b,pb);
 return first.every((c,i)=>['a','b'].every(key=>Math.hypot(...c[key].map((v,j)=>v-second[i][key][j]))<1e-8));
}
/** The worker already checked every complete source-CAD sweep. Its exact
 * piecewise trajectory is reusable only against that same committed world.
 * A new surface, a moved opposite tool, or a deviated trajectory cancels it. */
export function createMotionValidation(tissue,tools,poses){
 if(!poses?.length||poses.some(p=>p.side==='left'))return null;
 tissue.group.updateWorldMatrix(true,false);
 return{tissue,metadata:tissue.metadata,epoch:tissue._epoch,revision:tissue._contactRevision,matrix:tissue.group.matrixWorld.elements.join(','),left:signature(tools.left),base:structuredClone(tools.right),poses};
}
export function validatedMotionStep(tissue,sim,validation,index,from,to){
 if(!validation||validation.tissue!==tissue||validation.metadata!==tissue.metadata||validation.epoch!==tissue._epoch||validation.revision!==tissue._contactRevision||tissue.busy||sim.state.cutting||signature(sim.state.tools.left)!==validation.left||from<0||to<from||to>1||!validation.poses[index])return false;
 tissue.group.updateWorldMatrix(true,false);if(tissue.group.matrixWorld.elements.join(',')!==validation.matrix)return false;
 const tool=sim.state.tools.right;if(!sameMetal(tool,at(validation,index,from)))return false;
 const expected=at(validation,index,to),command={position:expected.position,wrist:canonicalScissorsWrist(expected,tool.alignment),jaw:expected.jaw},predicted=sweepInstrument(tool,{...tool,...command},sim.state.tools.left);
 if(predicted.limited||!sameMetal(predicted.tool,expected))return false;
 return !sim.moveToolPose(command,'right').limited;
}
