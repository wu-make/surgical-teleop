import {instrumentCapsules,instrumentPose,quaternionProduct} from './instrument-pose.js';
import {INSTRUMENT_COLLISION_DATA} from './instrument-collision-data.js';
import {SCISSORS_BODY_BOXES} from './scissors-body-boxes.js';

// Each source capsule and its tighter box are rigid within the same URDF link.
// These radii contain both complete envelopes about the capsule midpoint.
const source=INSTRUMENT_COLLISION_DATA.scissors.capsules;
const radii=source.map(c=>{
  const middle=c.a.map((v,i)=>(v+c.b[i])*.5),box=SCISSORS_BODY_BOXES[c.id];
  let radius=Math.hypot(...c.a.map((v,i)=>v-c.b[i]))*.5+c.radius;
  if(box)for(let bits=0;bits<8;bits++)radius=Math.max(radius,Math.hypot(...middle.map((v,i)=>(bits&(1<<i)?box.max[i]:box.min[i])-v)));
  return radius;
});
function frames(tool){
  const pose=instrumentPose(tool);
  return instrumentCapsules(tool,pose).map((c,i)=>({center:c.a.map((v,j)=>(v+c.b[j])*.5),rotation:quaternionProduct(pose.quaternion,pose.links[source[i].link].quaternion)}));
}

/** A witness for the unchanged committed surface. Translate each rigid source
 * envelope, then bound its rotation by 2 sin(angle/2) times its enclosing radius.
 * Subtract that full point-set displacement from its exact witnessed gap.
 * Changed or uncertain scenes always use the original triangle query. */
export function createBodyProof(tissue,baseTool,poses){
  if(baseTool.instrument!=='scissors'||!poses?.some(p=>p.bodyGaps))return null;
  tissue.group.updateWorldMatrix(true,false);const m=tissue.group.matrixWorld.elements;
  for(let a=0;a<3;a++)for(let b=0;b<3;b++)if(Math.abs(m[a*4]*m[b*4]+m[a*4+1]*m[b*4+1]+m[a*4+2]*m[b*4+2]-(a===b?1:0))>1e-10)return null;
  return{tissue,metadata:tissue.metadata,epoch:tissue._epoch,revision:tissue._contactRevision,matrix:m.join(','),baseTool:structuredClone(baseTool),poses,frames:new Map()};
}

export function queryBodyProof(tissue,proof,tool,index=0){
  if(!proof||proof.tissue!==tissue||proof.metadata!==tissue.metadata||proof.epoch!==tissue._epoch||proof.revision!==tissue._contactRevision||tissue.busy)return null;
  tissue.group.updateWorldMatrix(true,false);
  if(proof.matrix!==tissue.group.matrixWorld.elements.join(','))return null;
  const base=proof.baseTool;
  if(tool.instrument!==base.instrument||tool.shaftLength!==base.shaftLength||tool.port.some((v,i)=>v!==base.port[i]))return null;
  const current=frames(tool);let gaps=null;
  for(let i=Math.max(0,index-2);i<Math.min(proof.poses.length,index+3);i++){
    const p=proof.poses[i];if(!p.bodyGaps||p.side==='left'||p.bodyGaps.length!==current.length)continue;
    let witness=proof.frames.get(i);if(!witness){witness=frames({...base,...p});proof.frames.set(i,witness);}
    if(!gaps)gaps=p.bodyGaps.map(()=>-Infinity);
    for(let j=0;j<gaps.length;j++){
      const a=witness[j],b=current[j],dot=Math.min(1,Math.abs(a.rotation.reduce((n,v,k)=>n+v*b.rotation[k],0)));
      const travel=Math.hypot(...a.center.map((v,k)=>v-b.center[k]))+2*Math.sqrt(Math.max(0,1-dot*dot))*radii[j]+1e-7;
      gaps[j]=Math.max(gaps[j],p.bodyGaps[j]===Infinity?Infinity:p.bodyGaps[j]-travel);
    }
  }
  if(!gaps||!gaps.every(v=>v>1e-9))return null;
  const minimum=Math.min(...gaps);
  return{bodyMinimum:minimum,bodyGaps:gaps,bodyNormal:null,lesionClearance:Infinity,minimum,penalty:gaps.reduce((n,v)=>n+Math.max(0,.00005-v)**2,0),witness:true};
}
