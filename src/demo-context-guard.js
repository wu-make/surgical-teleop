import {Group} from 'three';
import {instrumentCapsules,instrumentPose,resolveInstrumentAlignment} from './instrument-pose.js';
import {instrumentMotionBound} from './instrument-contact.js';
import {displayedCADBodyClearance,displayedCapsuleClearance} from './demo-surface-clearance.js';

/** Read-only contact copies of every original neighbouring-anatomy triangle.
 * World coordinates keep this independent of the active organ/deformation. */
export function createDemoContextGuard(root){
  root.updateWorldMatrix(true,true);
  const meshes=new Map(),frame=new Group();frame.updateMatrixWorld(true);
  let triangleCount=0;
  root.traverse(o=>{if(!o.isMesh||!o.geometry.index)return;const geometry=o.geometry.clone().applyMatrix4(o.matrixWorld);geometry.computeBoundingBox();triangleCount+=geometry.index.count/3;meshes.set(o.uuid,{name:o.name,geometry});});
  const tissue={group:frame,_meshes:meshes,sampleDistance:()=>Infinity},cache=new Map(),margin=.00005;
  function clearance(tool){
    const key=JSON.stringify(tool);if(cache.has(key))return cache.get(key);
    const pose=instrumentPose(tool),details={cache:new Map()};let gap=.006;
    for(const capsule of instrumentCapsules(tool,pose)){
      gap=Math.min(gap,capsule.part==='jaw'?displayedCapsuleClearance(tissue,capsule):displayedCADBodyClearance(tissue,capsule,pose,details));
      if(gap<=margin)break;
    }
    if(cache.size>=1024)cache.clear();cache.set(key,gap);return gap;
  }
  function sweep(a,b){
    const visit=(from,to,ga,gb,depth)=>{
      if(ga<=margin||gb<=margin)return false;
      const travel=instrumentMotionBound(from,to);
      if(travel<1e-12||ga+gb-2*margin>travel+1e-9)return true;
      if(depth>=16)return false;
      const mid={...from,position:from.position.map((v,i)=>(v+to.position[i])*.5),wrist:from.wrist.map((v,i)=>(v+to.wrist[i])*.5),jaw:(from.jaw+to.jaw)*.5};
      mid.alignment=resolveInstrumentAlignment(mid,from.alignment);const gm=clearance(mid);
      return visit(from,mid,ga,gm,depth+1)&&visit(mid,to,gm,gb,depth+1);
    };
    return visit(a,b,clearance(a),clearance(b),0);
  }
  return{clearance,sweep,triangleCount,dispose(){for(const {geometry}of meshes.values())geometry.dispose();meshes.clear();cache.clear();}};
}
