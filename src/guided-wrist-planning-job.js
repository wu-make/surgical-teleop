import{yieldPreparationTask}from'./preparation-task.js';
import * as THREE from'three';import{Simulation}from'./simulation.js';import{GuidedDemo}from'./guided-demo.js';import{deformPoint,inverseDeformPoint}from'./tissue-worker.js';import{runCooperatively}from'./cooperative-work.js';import{restoreFields,restoreSteering,encode}from'./guided-planning-context.js';import{loadBodyTriangleGeometry}from'./scissors-body-catalogue.js';import{scissorsAnchor,canonicalScissorsWrist}from'./scissors-kinematics.js';
export async function planJob(context,{valid=()=>true,preferredBudgetMs=3000,yieldFrame=()=>yieldPreparationTask({scheduler:null})}={}){
 await loadBodyTriangleGeometry({segmentBodies:true});if(!valid())return{cancelled:true,value:null,stats:{thread:'worker'}};
 const group=new THREE.Group();group.matrixAutoUpdate=false;group.matrix.fromArray(context.matrix);group.updateWorldMatrix(true,false);const meshes=new Map();
 for(const chunk of context.chunks){const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(chunk.positions,3));g.setAttribute('normal',new THREE.BufferAttribute(chunk.normals,3));g.setIndex(new THREE.BufferAttribute(chunk.indices,1));g.computeBoundingBox();meshes.set(chunk.key,new THREE.Mesh(g));}
 const tissue={group,_meshes:meshes,metadata:context.metadata,caseDefinition:context.caseDefinition,_baseField:context.baseField,_deformation:context.deformation,_epoch:context.epoch,_contactRevision:context.revision,busy:false,deformPoint:p=>new THREE.Vector3(...deformPoint(p.toArray(),context.deformation)),toReferencePoint:p=>new THREE.Vector3(...inverseDeformPoint(p.toArray(),context.deformation)),sampleDistance:()=>{throw Error('Wrist planning requires the committed triangle surface');}};
 const sim=new Simulation();sim.restore(context.snapshot);const demo=new GuidedDemo(sim,tissue,{cuttingBusy:false,grasp:{kind:'tissue'}});Object.assign(demo,restoreFields(context),{active:true,mode:'example',_planningReplica:true});const steering=restoreSteering(context);
 const ordering={preferredWorkMs:0,historyFirstAttempted:false};
 function* solve(){
  // Nonpositive unsigned distances cannot certify an initial rigid body.
  if(demo._currentBladeGuard(context.snapshot.state.tools.right,{protectTarget:false}).bodyMinimum<=0)return null;
  yield;

  if(demo._rowRemaining?.length)for(const shortcut of[true,false]){
   const probe=new Simulation();probe.restore(context.snapshot);probe.setPaused(false);probe.setCutting(false);const poses=[];
   if(!(yield* demo._replayEscapeJournalSteps(probe,demo._rowRemaining,poses,{shortcut})))continue;
   const end=new THREE.Vector3(...scissorsAnchor(probe.state.tools.right));if(end.distanceTo(steering.target)>.0002)continue;
   return{wrist:canonicalScissorsWrist(probe.state.tools.right,context.snapshot.state.tools.right.alignment),referenceAlignment:[...context.snapshot.state.tools.right.alignment],rest:end,retreat:steering.anchor.distanceTo(end),validatedPoses:poses,remainingJournal:true};
  }
  const preferred=demo._preferredWristRouteSteps(steering,context.snapshot);
  while(ordering.preferredWorkMs<preferredBudgetMs){
   const start=performance.now(),next=preferred.next();ordering.preferredWorkMs+=performance.now()-start;
   if(next.done){if(next.value)return next.value;return yield* demo._bladeWristRouteSteps(steering,context.snapshot);}
   yield;
  }
  // Keep the suspended preferred iterator intact. A long near-tangent turn
  // must not starve the real entry-history escape; if that fails, resume
  // every original candidate before using the complete global fallback.
  ordering.historyFirstAttempted=true;
  const escape=yield* demo._bladeWristRouteSteps(steering,context.snapshot,{historyOnly:true});
  if(escape){preferred.return?.();return escape;}
  const resumed=yield* preferred;if(resumed)return resumed;
  return yield* demo._bladeWristRouteSteps(steering,context.snapshot);
 }
 try{const result=await runCooperatively(solve(),{valid,yieldFrame});
  if(result.value?.validatedPoses){
   result.value.continuousCAD=true;
   // Replay begins at the real initial pose, before the first recorded end
   // point. Carry its exact CAD gaps too, so a loose capsule envelope cannot
   // reject that already checked first interval on the rendering thread.
   const start=context.snapshot.state.tools.right,guard=demo._currentBladeGuard(start,{protectTarget:false});
   result.value.validatedPoses.unshift({position:[...start.position],wrist:[...start.wrist],jaw:start.jaw,alignment:[...start.alignment],bodyGaps:[...guard.bodyGaps]});
  }
  return{...result,stats:{...result.stats,...ordering,bodyWitness:demo.bodyWitnessStats},value:encode(result.value),goals:encode(demo.wristGoalCandidates),lastRejectedPose:demo.lastBladeRejection};}finally{for(const mesh of meshes.values()){mesh.geometry.dispose();mesh.material.dispose();}}
}
