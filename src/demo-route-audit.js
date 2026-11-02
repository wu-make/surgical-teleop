import * as THREE from 'three';
import {instrumentCapsules} from './instrument-pose.js';
import {firstParentHit,closestParentSurface} from './tissue-contact.js';
import {lesionNodes} from './lesion-volume.js';
import {sampleFragmentVolume} from './tissue-fragments.js';

// Development-only geometry evidence, using the actual rendered triangles.
export function auditDemoFrame(view,sim,interaction,demo){
  const tissue=view.tissue,blade=view.assemblies.toolBlade('right'),tips=[blade.segments[5]?.b,blade.segments[11]?.b].filter(Boolean);
  if(tips.length!==2)return{phase:demo.phase,error:'missing source blade ends'};
  const anchor=tips[0].clone().add(tips[1]).multiplyScalar(.5),pathTarget=demo.pathPoint&&demo._displayReference(demo.pathPoint),steering=demo._bladeSteering,expected=steering?(steering.expectedAnchor??steering.anchor):pathTarget,camera=tissue.group.worldToLocal(view.endoCamera.getWorldPosition(new THREE.Vector3())),meshes=[...tissue._meshes.values()];
  const obscured=tips.map(tip=>{const p=tissue.group.worldToLocal(tip.clone()),hit=firstParentHit(meshes,camera,p);return hit?Math.max(0,camera.distanceTo(p)-hit.travel)*1000:0;});
  let wristDepth=0,shaftDepth=0,wristImplicitDepth=0;
  for(const capsule of instrumentCapsules(sim.state.tools.right)){
    if(capsule.part==='jaw')continue;
    const world=capsule.part==='shaft'?new THREE.Vector3(...capsule.b):new THREE.Vector3(...capsule.a).lerp(new THREE.Vector3(...capsule.b),.5),p=tissue.group.worldToLocal(world),surface=closestParentSurface(meshes,p,.025);
    if(capsule.part!=='shaft')wristImplicitDepth=Math.max(wristImplicitDepth,Math.max(0,-tissue.sampleDistance(p))*1000);
    if(!surface)continue;const depth=Math.max(0,-p.clone().sub(surface).dot(surface.normal))*1000;
    if(capsule.part==='shaft')shaftDepth=Math.max(shaftDepth,depth);else wristDepth=Math.max(wristDepth,depth);
  }
  return{phase:demo.phase,pathIndex:demo.pathIndex,jaw:sim.state.tools.right.jaw,wrist:[...sim.state.tools.right.wrist],steering:!!steering,reentryStage:steering?.route?.stage??null,anchor:anchor.toArray(),anchorErrorMm:expected&&['raster','close-right','row-transfer'].includes(demo.phase)?anchor.distanceTo(expected)*1000:null,pathTargetGapMm:pathTarget?anchor.distanceTo(pathTarget)*1000:null,obscuredMm:obscured,wristCentreDepthMm:wristDepth,wristImplicitDepthMm:wristImplicitDepth,shaftCentreDepthMm:shaftDepth,bodyEnvelopeClearanceMm:demo.plan?.traction?.section?demo._currentBladeGuard(sim.state.tools.right).bodyMinimum*1000:null,pending:interaction.cuttingBusy};
}

export function auditHeldTarget(tissue,interaction){
  if(!tissue.caseDefinition?.lesion)return null;
  const piece=tissue.getFragment(interaction.grasp?.fragmentId);if(!piece)return{heldNodes:0,totalNodes:0};
  const meta=tissue.metadata,nodes=lesionNodes(meta,tissue._baseField);let heldNodes=0;
  for(const index of nodes){const xyz=[index%meta.dims[0],Math.floor(index/meta.dims[0])%meta.dims[1],Math.floor(index/(meta.dims[0]*meta.dims[1]))],p=xyz.map((v,i)=>meta.origin[i]+v*meta.spacing[i]);if(sampleFragmentVolume(piece.volume,p)<0)heldNodes++;}
  return{pieceId:piece.id,heldNodes,totalNodes:nodes.length,heldFraction:heldNodes/nodes.length};
}
