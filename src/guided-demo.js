import * as THREE from 'three';
import { surfacePose,CUT_RADIUS } from './interaction-controller.js';
import { deformPoint as materialDisplay, normalizeDeformation,inverseDeformPoint } from './tissue-worker.js';
import {runCooperatively,runImmediately} from './cooperative-work.js';
import {yieldPreparationTask} from './preparation-task.js';
import {scissorsTarget,scissorsAnchor,scissorsBodyClearance,scissorsPoseCommand,canonicalScissorsWrist,SCISSORS_GUIDE_CLEARANCE} from './scissors-kinematics.js';
import {resolveInstrumentAlignment,instrumentPose,instrumentCapsules} from './instrument-pose.js';
import {sourceInstrumentContact,sweepInstrument,instrumentMotionBound,instrumentBodyMotionBounds} from './instrument-contact.js';
import {bladeLesionClearance} from './demo-lesion-clearance.js';
import {displayedBodyDistance,displayedCADBodyClearance} from './demo-surface-clearance.js';
import {createBodyProof,queryBodyProof} from './demo-body-proof.js';
import {createMotionValidation,validatedMotionStep} from './demo-validated-motion.js';
import {loadBodyTriangleGeometry,bodyTriangleGeometry} from './scissors-body-catalogue.js';

const smooth = value => value * value * (3 - 2 * value);
// These are user-requested live operations. Keep bounded task yields without
// waiting for background-priority idle time during an active 3-D scene.
const yieldDemoTask=()=>yieldPreparationTask({scheduler:null});
const defaults = { left: [-.025, 1.106, -.015], right: [.025, 1.108, -.015] };
// The example uses broad overlapping bands; manual operation keeps the CAD
// tip's original fine kerf. Both modes use the same volume and fragment solver.
const exampleCutRadius=tissue=>tissue.caseDefinition?.context==='hepatic'?.005:CUT_RADIUS;

function exteriorTransfer(query,meta,a,b){
  const epsilon=Math.min(...meta.spacing)*.35;
  // Adjacent exterior row ends often already have a clear direct connection.
  // Adding a compulsory outward loop brought the wrist toward the holding
  // clamp, although neither the organ nor the incision required that detour.
  const direct=[],directSteps=Math.max(1,Math.ceil(a.distanceTo(b)/.0005));let directClear=true;
  for(let i=1;i<=directSteps;i++){const p=a.clone().lerp(b,i/directSteps);if(query(p.toArray())<.0001){directClear=false;break;}direct.push(p);}
  if(directClear)return direct;
  const normal=p=>{const n=new THREE.Vector3();for(let i=0;i<3;i++){const lo=p.clone(),hi=p.clone();lo.setComponent(i,lo.getComponent(i)-epsilon);hi.setComponent(i,hi.getComponent(i)+epsilon);n.setComponent(i,query(hi.toArray())-query(lo.toArray()));}return n.toArray().every(Number.isFinite)&&n.lengthSq()>1e-12?n.normalize():p.clone().sub(new THREE.Vector3(...meta.origin.map((v,i)=>v+(meta.dims[i]-1)*meta.spacing[i]*.5))).normalize();};
  const na=normal(a),nb=normal(b);
  for(const height of [.001,.002,.004,.008,.016,.03]){
    const waypoints=[a,a.clone().addScaledVector(na,height),b.clone().addScaledVector(nb,height),b],path=[];let clear=true;
    for(let s=1;s<waypoints.length&&clear;s++){const n=Math.max(1,Math.ceil(waypoints[s-1].distanceTo(waypoints[s])/.001));for(let i=1;i<=n;i++){const p=waypoints[s-1].clone().lerp(waypoints[s],i/n);if(query(p.toArray())<.0001){clear=false;break;}path.push(p);}}
    if(clear)return path;
  }
  return null;
}

// The real controller still sweeps each complete segment against source CAD.
// Bound a preflight unit so a long withdrawal cannot monopolize one RAF slice.
export function* probeToolMoveSteps(probe,target,side,move=null){
  const start=new THREE.Vector3(...probe.state.tools[side].position),count=Math.max(1,Math.ceil(start.distanceTo(target)/.002));
  for(let i=1;i<=count;i++){
    const point=i===count?target.toArray():start.clone().lerp(target,i/count).toArray();
    const blocked=move?move(probe,point,side):probe.moveToolTo(point,side).limited;
    yield;if(blocked)return true;
  }
  return false;
}

/** Plan a complete peripheral-cap basal section from the actual remaining SDF.
 * The raster covers the whole occupied cross-section, rather than drawing one
 * groove and pretending it detached. Returned positions are material coordinates.
 */
export function planPeripheralResections(tissue, {depth=.012,cutRadius=CUT_RADIUS}={}) {
  return runImmediately(planPeripheralResectionSteps(tissue,{depth,cutRadius}));
}

export function* planPeripheralResectionSteps(tissue, {depth=.012,cutRadius=CUT_RADIUS}={}) {
  if(!tissue.queryReferenceDistance||!tissue.metadata)return [];
  const meta=tissue.metadata,spacing=Math.max(...meta.spacing),step=Math.min(cutRadius*1.45,Math.max(.0025,spacing*1.8,cutRadius*1.3));
  const bounds=meta.bounds??[meta.origin.map(v=>v+spacing*2),meta.origin.map((v,i)=>v+(meta.dims[i]-3)*meta.spacing[i])];
  const query=point=>tissue.queryReferenceDistance(new THREE.Vector3(...point));
  const plans=[];
  for(let axis=0;axis<3;axis++)for(const sign of [-1,1]){
    const lesion=tissue.caseDefinition?.lesion;
    const pelvic=tissue.caseDefinition?.context==='pelvic';
    // Enter the liver from its exposed superior face. A medial vertical slab
    // sent the wrist through intact parenchyma despite a correctly placed tip.
    // The adnexal attachment is instead approached from its medial side.
    if(lesion&&(axis!==(pelvic?0:2)||sign!==1))continue;
    // The scope/shaft enter from negative material Y. Expose that face first;
    // scanning from top Z instead left intact tissue in front of the wrist.
    const tangents=lesion&&!pelvic?[0,1]:[0,1,2].filter(i=>i!==axis),depthDirection=lesion&&!pelvic?1:-1,extreme=bounds[sign>0?1:0][axis],margin=(pelvic?.004:.006)+Math.max(0,cutRadius-CUT_RADIUS),plane=lesion?lesion.center[axis]-lesion.radii[axis]-margin:extreme-sign*depth;
    // A bounded curved margin around the labelled target, rather than a flat
    // transection of unrelated distant tissue across the entire source organ.
    const curvature=lesion&&!pelvic?[.8,0]:[0,0];
    const sectionRadii=lesion?.radii.map((v,i)=>!pelvic&&i<2?v*1.1:v);
    const radial=(u,v)=>lesion?((u-lesion.center[tangents[0]])/sectionRadii[tangents[0]])**2+((v-lesion.center[tangents[1]])/sectionRadii[tangents[1]])**2:0;
    const pointAt=(u,v)=>{const p=[0,0,0],s=radial(u,v);p[axis]=plane+(lesion?lesion.radii[axis]*(curvature[0]*s+curvature[1]*s*s):0);p[tangents[0]]=u;p[tangents[1]]=v;return p;};
    const slopeAt=(u,v,i)=>lesion?Math.abs(2*lesion.radii[axis]*(curvature[0]+2*curvature[1]*radial(u,v))*((i?v:u)-lesion.center[tangents[i]])/sectionRadii[tangents[i]]**2):0;
    const inside=[];
    let lowU=Infinity,highU=-Infinity,lowV=Infinity,highV=-Infinity,slopeU=0;
    for(let v=bounds[0][tangents[1]]-step;v<=bounds[1][tangents[1]]+step;v+=step){
      for(let u=bounds[0][tangents[0]]-step;u<=bounds[1][tangents[0]]+step;u+=step){
        const point=pointAt(u,v);
        const distance=query(point);
        if(distance<=cutRadius){lowU=Math.min(lowU,u);highU=Math.max(highU,u);lowV=Math.min(lowV,v);highV=Math.max(highV,v);if(lesion)slopeU=Math.max(slopeU,slopeAt(u,v,0));}
        if(distance<0)inside.push({point,distance});
      }
      yield;
    }
    if(inside.length<4||!Number.isFinite(lowU))continue;
    inside.sort((a,b)=>a.distance-b.distance);
    let anchor=null,top=-Infinity;
    for(const candidate of inside.slice(0,24)){
      const point=[...candidate.point];
      let outside=extreme+sign*spacing*2;
      for(let projection=outside;sign*(projection-plane)>=0;projection-=sign*spacing*.65){
        point[axis]=projection;
        if(query(point)<=0){
          let a=projection,b=outside;
          for(let i=0;i<12;i++){point[axis]=(a+b)*.5;if(query(point)<=0)a=point[axis];else b=point[axis];}
          point[axis]=(a+b)*.5;
          if(sign*point[axis]>top){anchor=[...point];top=sign*point[axis];}
          break;
        }
        outside=projection;
      }
      yield;
    }
    if(lesion){
      // Grasp the visible anterior capsule over the labelled target. Grasping
      // the far lateral extreme crossed the two real shafts in left-sided cases.
      const point=[...lesion.center];let outside=bounds[1][2]+spacing*2;
      for(let z=outside;z>=bounds[0][2];z-=spacing*.5){point[2]=z;if(query(point)<=0){let a=z,b=outside;for(let i=0;i<12;i++){point[2]=(a+b)*.5;if(query(point)<=0)a=point[2];else b=point[2];}anchor=[point[0],point[1],(a+b)*.5];break;}outside=z;}
      yield;
    }
    if(!anchor||sign*(anchor[axis]-plane)<cutRadius*2+spacing)continue;
    const normal=lesion?new THREE.Vector3(0,0,1):new THREE.Vector3().setComponent(axis,sign);
    const worldNormal=normal.clone().applyQuaternion(tissue.group.getWorldQuaternion(new THREE.Quaternion())).normalize();
    // Include a complete ring outside the SDF cross-section. Adjacent kerfs
    // overlap, so diagonal voxel bridges cannot be silently left between rows.
    lowU-=cutRadius*1.5;highU+=cutRadius*1.5;lowV-=cutRadius*1.5;highV+=cutRadius*1.5;
    const travelStep=lesion?Math.min(step,cutRadius*1.2/Math.hypot(1,slopeU)):Infinity;
    const levels=[depthDirection>0?lowV:highV],endDepth=depthDirection>0?highV:lowV;
    while((endDepth-levels.at(-1))*depthDirection>1e-10){
      const v=levels.at(-1);let maximumSlope=0;
      if(lesion)for(let u=lowU;u<=highU;u+=step*.5)for(const dv of [0,step*depthDirection])if(query(pointAt(u,v+dv))<=cutRadius+spacing)maximumSlope=Math.max(maximumSlope,slopeAt(u,v+dv,1));
      const h=lesion?Math.min(step,cutRadius*1.2/Math.hypot(1,maximumSlope)):step;levels.push(depthDirection>0?Math.min(endDepth,v+h):Math.max(endDepth,v-h));yield;
    }
    const rows=levels.length,path=[],strokeStarts=[],transfers={};let validTransfers=true;
    for(let row=0;row<rows;row++){
      const v=levels[row];
      let rowLow=lowU,rowHigh=highU;
      if(lesion){
        // Keep every occupied cross-section sample, while avoiding wide empty
        // rectangle corners that unnecessarily cross the grasping shaft.
        rowLow=Infinity;rowHigh=-Infinity;
        for(let u=lowU;u<=highU;u+=Math.min(step*.5,travelStep)){if(query(pointAt(u,v))<=cutRadius){rowLow=Math.min(rowLow,u);rowHigh=Math.max(rowHigh,u);}}
        yield;if(!Number.isFinite(rowLow))continue;const endMargin=pelvic?cutRadius:.00025;rowLow-=endMargin;rowHigh+=endMargin;
      }
      const start=path.length;strokeStarts.push(start);
      if(lesion){
        const fromRight=!pelvic||row%2;let u=fromRight?rowHigh:rowLow;const end=fromRight?rowLow:rowHigh,direction=Math.sign(end-u);path.push(new THREE.Vector3(...pointAt(u,v)));
        while((end-u)*direction>1e-10){
          const proposed=direction>0?Math.min(end,u+step):Math.max(end,u-step),from=path.at(-1);let next=proposed;
          if(from.distanceTo(new THREE.Vector3(...pointAt(next,v)))>cutRadius*1.2){let lo=u,hi=proposed;for(let j=0;j<14;j++){const mid=(lo+hi)*.5;if(from.distanceTo(new THREE.Vector3(...pointAt(mid,v)))>cutRadius*1.2)hi=mid;else lo=mid;}next=lo;}
          path.push(new THREE.Vector3(...pointAt(next,v)));u=next;
        }
      }else{path.push(new THREE.Vector3(...pointAt(row%2?rowHigh:rowLow,v)),new THREE.Vector3(...pointAt(row%2?rowLow:rowHigh,v)));}
      if(start){const origin=lesion&&!pelvic?path[strokeStarts.at(-2)]:path[start-1],route=exteriorTransfer(p=>query(p),meta,origin,path[start]);if(!route){validTransfers=false;break;}transfers[start]=route;}
      yield;
    }
    if(!validTransfers||!path.length)continue;
    const length=path.slice(1).reduce((sum,p,i)=>sum+(transfers[i+1]?0:p.distanceTo(path[i])),0);
    if(length>(lesion?16:2.8))continue;
    plans.push({axis,sign,plane,normal,worldNormal,referenceAnchor:new THREE.Vector3(...anchor),path,cutRadius,unidirectional:!!lesion&&!pelvic,
      anchorJaw:lesion&&!pelvic?0:undefined,rowSpacing:Math.max(...levels.slice(1).map((v,i)=>Math.abs(levels[i]-v))),depthAxis:tangents[1],depthDirection,strokeStarts,transfers,length,curvature,pattern:'raster',jawOpening:pelvic ? .28 : lesion ? .20 : .45,traction:lesion&&!pelvic?{radius:.05,coreRadius:.040,section:{center:lesion.center.slice(0,2),radii:sectionRadii.slice(0,2),plane,depth:lesion.radii[2],curvature,front:path[0].y,width:.001,frontBlend:.0033}}:null,bite:lesion&&!pelvic?{opening:.12,closing:.24,speed:.06,maxStep:.006}:null,score:length*(worldNormal.y<-.25?1.5:1)});
  }
  return plans.sort((a,b)=>a.score-b.score);
}

/** Keep every curved CSG segment, but operate whole connection bands from
 * accessible surface points instead of driving the wrist through every cell. */
export function areaResectionPlan(tissue,plan){
  if(tissue.caseDefinition?.context!=='hepatic'||plan.cutRadius<.004)return plan;
  const segments=[];
  for(let row=0;row<plan.strokeStarts.length;row++){
    const begin=plan.strokeStarts[row],end=plan.strokeStarts[row+1]??plan.path.length;
    for(let i=begin+1;i<end;i++)segments.push({a:plan.path[i-1].clone(),b:plan.path[i].clone()});
  }
  const bands=[];for(let i=0;i<segments.length;i+=256)bands.push(segments.slice(i,i+256));
  if(!bands.length)return null;
  const path=bands.map(()=>plan.path[0].clone()),transfers=Object.fromEntries(path.slice(1).map((_,i)=>[i+1,[]]));
  return{...plan,pattern:'area',path,transfers,strokeStarts:path.map((_,i)=>i),unidirectional:false,areaBands:bands,areaFronts:bands.map(b=>Math.max(...b.flatMap(s=>[s.a.getComponent(plan.depthAxis),s.b.getComponent(plan.depthAxis)]))),sourceCutSegments:segments.length};
}

/** An actual controller/tissue operation example. It contains no baked geometry. */
export class GuidedDemo {
  constructor(sim, tissue, interaction, { onMessage = () => {}, onChange = () => {}, wristPlanner = null,contextGuard=null } = {}) {
    Object.assign(this, { sim, tissue, interaction, onMessage, onChange, wristPlanner,contextGuard });
    this.active = false;
    this.mode = null;
  }

  _anchor(tool,plan=this.plan){return scissorsAnchor({...tool,jaw:plan?.anchorJaw??tool.jaw});}
  _target(tool,point,plan=this.plan){return scissorsTarget({...tool,jaw:plan?.anchorJaw??tool.jaw},point);}
  _poseCommand(tool,point,wrist,reference){const command=scissorsPoseCommand({...tool,jaw:this.plan?.anchorJaw??tool.jaw},point,wrist,reference);return{...command,jaw:tool.jaw};}

  // A stored wrist angle alone is not a stored physical pose: the RCM's
  // transported axial frame changes along a different withdrawal path.
  _recordedPose(tool,record){
    if(!record.alignment||record.side==='left')return record;
    const saved={...tool,...record};
    return{...record,wrist:canonicalScissorsWrist(saved,tool.alignment)};
  }

  stop(message = '已结束自动操作，可继续手动控制') {
    this.interaction.setCutRadius?.(CUT_RADIUS);
    this._planningToken=(this._planningToken??0)+1;
    this.wristPlanner?.cancel();
    if (!this.active) return;
    this.active = false;
    this._bladeSteering=null;
    if(this._scopeBeforeDemo&&this.sim.state.scope.follow&&this.sim.state.scope.followMode===(this._demoScopeMode??'grasp'))this.sim.setScopeFollow(this._scopeBeforeDemo.follow,this._scopeBeforeDemo.mode);
    this._scopeBeforeDemo=null;
    this.sim.setCutting(false);
    this.interaction.breakCutTrajectory?.();
    this.interaction.lastCut = null;
    this.onChange();
    if (message) this.onMessage(message);
  }

  move(position, side) {
    if(side==='right'&&this._context()){
      const probe=new this.sim.constructor();probe.restore(this.sim.snapshot());probe.setPaused(false);
      if(this._probeMove(probe,position,side)){this.stop('自动通道受到邻近解剖结构阻挡，已保持器械位置');return false;}
    }
    const result = this.sim.moveToolTo(position, side);
    if (result.limited) {
      this.stop('自动路径被另一器械挡住；请先移开另一器械，再重新就位');
      return false;
    }
    return true;
  }

  _context(){return typeof this.contextGuard==='function'?this.contextGuard():this.contextGuard;}
  _probeMove(probe,position,side){
    const guard=side==='right'?this._context():null,before=guard?structuredClone(probe.state.tools.right):null;
    const result=probe.moveToolTo(position,side);
    return result.limited||!!(guard&&!guard.sweep(before,probe.state.tools.right));
  }

  _moveBlade(point){
    if(this.plan?.traction&&this.mode==='example'){
      this._rememberBlade();
      const tool=this.sim.state.tools.right,start=new THREE.Vector3(...this._anchor(tool)),n=Math.max(1,Math.ceil(start.distanceTo(point)/.0005));
      const blocked=(next,body=false)=>{
        this._bladeSteering={target:point.clone(),clearanceTarget:next.clone(),anchor:new THREE.Vector3(...this._anchor(tool)),frames:0,waitForGeometry:body&&(this.tissue.busy||this.interaction.cuttingBusy),attempts:(this._bladeSteering?.attempts??0)+1,partialPasses:this._bladeSteering?.partialPasses??0,lastReliefY:this._bladeSteering?.lastReliefY,resumeCutting:this._bladeSteering?.resumeCutting??this.sim.state.cutting};
        this.sim.setCutting(false);this.interaction.breakCutTrajectory?.();return false;
      };
      for(let i=1;i<=n;i++){
        const next=start.clone().lerp(point,i/n),clearance=this._bladeClearance(tool,next);
        const predicted=sweepInstrument(tool,{...tool,position:clearance.solution.position},this.sim.state.tools.left);
        if(predicted.limited)return blocked(new THREE.Vector3(...this._anchor(predicted.tool)));
        // A reached cutting point still needs its closing/row-end state to
        // finish. Rechecking a loose body envelope must not turn a truly
        // stationary command into another wrist recovery and reopen the jaws.
        const stationary=clearance.solution.error<=.00015&&instrumentMotionBound(tool,predicted.tool)<2e-12;
        if(clearance.minimum<0&&!stationary)return blocked(next,clearance.bodyMinimum<0);
        if(!this._recordedBladeStep(this.sim,{position:clearance.solution.position,wrist:[...tool.wrist],jaw:tool.jaw}))return blocked(next,this._poseRejection==='tissue');
        this._rememberBlade();
      }
      return true;
    }
    const target=this._target(this.sim.state.tools.right,point.toArray());
    if(target.error>.00015){this.stop('剪刃未能准确就位，请重新准备示范');return false;}
    return this.move(target.position,'right');
  }

  _bladeClearance(tool,point,wrist=tool.wrist){
    const solution=this._target({...tool,wrist},point.toArray());
    if(solution.error>.00015)return{minimum:-Infinity,bodyMinimum:-Infinity,lesionClearance:Infinity,pairClearance:-Infinity,penalty:Infinity,solution};
    const goal={...tool,wrist,position:solution.position};goal.alignment=resolveInstrumentAlignment(goal,tool.alignment);
    const result=this._currentBladeGuard(goal);
    const pairClearance=sourceInstrumentContact(this.sim.state.tools.left,goal).clearance;
    return{...result,solution,pairClearance,penalty:result.penalty+Math.max(0,.002-pairClearance)**2};
  }

  _currentBladeGuard(tool,{protectTarget=true,exactBody=false}={}){
    const result=this._organBladeGuard(tool,{protectTarget,exactBody}),gap=this._context()?.clearance(tool)??Infinity;
    if(gap>=result.bodyMinimum)return result;
    return{...result,bodyMinimum:gap,minimum:Math.min(result.minimum,gap),bodyGaps:result.bodyGaps?.map(v=>Math.min(v,gap)),penalty:result.penalty+Math.max(0,SCISSORS_GUIDE_CLEARANCE-gap)**2};
  }

  _organBladeGuard(tool,{protectTarget=true,exactBody=false}={}){
    const route=this._bladeSteering?.route;
    const bodyProof=route?.bodyProof??this._bodyWorldProof,proofIndex=route?(route.poseIndex??0):(bodyProof?.poses.length??1)-1;
    if(!exactBody&&bodyProof){const proof=queryBodyProof(this.tissue,bodyProof,tool,proofIndex);if(proof){if(route)route.proofHits=(route.proofHits??0)+1;const lesionClearance=protectTarget&&this.plan?.traction?bladeLesionClearance(this.tissue,tool,this.plan?.cutRadius??CUT_RADIUS):Infinity;return{...proof,lesionClearance,minimum:Math.min(proof.bodyMinimum,lesionClearance),penalty:proof.penalty+Math.max(0,SCISSORS_GUIDE_CLEARANCE-lesionClearance)**2};}}
    if(this._planningReplica&&!protectTarget&&this._planningBodyProof){const proof=queryBodyProof(this.tissue,this._planningBodyProof,tool,this._planningBodyProof.poses.length-1);if(proof){(this.bodyWitnessStats??={hits:0,fullQueries:0}).hits++;return proof;}}
    const cachedGeometry=this.tissue._meshes?.size&&Number.isFinite(this.tissue._contactRevision);let cacheKey,cache;
    if(cachedGeometry){
      this.tissue.group.updateWorldMatrix(true,false);
      const revision=[this.tissue._contactRevision,!!this.plan?.traction,!!this.plan?.traction?.section,!!bodyTriangleGeometry('roll_link'),...this.tissue.group.matrixWorld.elements].join(',');
      if(this._guardTissue!==this.tissue||this._guardMeta!==this.tissue.metadata||this._guardRevision!==revision){this._guardTissue=this.tissue;this._guardMeta=this.tissue.metadata;this._guardRevision=revision;this._guardCache=new Map();this._guardBodyCache=new Map();}
      cache=this._guardCache;cacheKey=[protectTarget,this.plan?.cutRadius??CUT_RADIUS,exactBody||!!this._planningReplica||this.mode==='planning',tool.instrument,tool.shaftLength,...tool.port,...tool.position,...tool.wrist,tool.jaw,...(tool.alignment??[])].join(',');
      if(cache.has(cacheKey)){const result=cache.get(cacheKey);if(!protectTarget)this._rememberPlanningBodyWitness(tool,result);return result;}
    }
    const bodyMargin=SCISSORS_GUIDE_CLEARANCE;
    const bodyKey=cachedGeometry?[exactBody||!!this._planningReplica||this.mode==='planning',tool.instrument,tool.shaftLength,...tool.port,...tool.position,...tool.wrist,...(tool.alignment??[])].join(','):null;
    const previousBody=bodyKey?this._guardBodyCache.get(bodyKey):null;
    const pose=instrumentPose(tool),bodyGaps=previousBody?.bodyGaps??[],triangleCache=new Map();let bodyMinimum=previousBody?.bodyMinimum??Infinity,penalty=previousBody?.penalty??0,bodyNormal=previousBody?.bodyNormal??null;
    if(!previousBody)for(const c of instrumentCapsules(tool,pose)){if(c.part==='jaw'){bodyGaps.push(Infinity);continue;}
      const p=c.part==='shaft'?c.b:c.a.map((v,i)=>(v+c.b[i])*.5),details={cache:triangleCache,allowExact:exactBody||!!this._planningReplica||this.mode==='planning'},d=this.plan?.traction?.section?displayedCADBodyClearance(this.tissue,c,pose,details):displayedBodyDistance(this.tissue,this.tissue.group.worldToLocal(new THREE.Vector3(...p)));
      bodyGaps.push(d);
      if(d<bodyMinimum)bodyNormal=details.normal??null;
      bodyMinimum=Math.min(bodyMinimum,d);penalty+=Math.max(0,bodyMargin-d)**2;
    }
    if(bodyKey&&!previousBody){if(this._guardBodyCache.size>=4096)this._guardBodyCache.clear();this._guardBodyCache.set(bodyKey,{bodyMinimum,bodyNormal,bodyGaps,penalty});}
    const lesionClearance=protectTarget&&this.plan?.traction?bladeLesionClearance(this.tissue,tool,this.plan?.cutRadius??CUT_RADIUS,{pose}):Infinity;
    const result={bodyMinimum,bodyNormal,bodyGaps,lesionClearance,minimum:Math.min(bodyMinimum,lesionClearance),penalty:penalty+Math.max(0,SCISSORS_GUIDE_CLEARANCE-lesionClearance)**2};
    if(!protectTarget)this._rememberPlanningBodyWitness(tool,result);
    if(cache){if(cache.size>=4096)cache.clear();cache.set(cacheKey,result);}return result;
  }

  _rememberPlanningBodyWitness(tool,result){
    if(!this._planningReplica||!this.plan?.traction?.section)return;
    const pose={position:[...tool.position],wrist:[...tool.wrist],jaw:tool.jaw,alignment:[...tool.alignment],bodyGaps:[...result.bodyGaps]};
    if(!this._planningBodyProof)this._planningBodyProof=createBodyProof(this.tissue,tool,[pose]);
    else{const proof=this._planningBodyProof;proof.poses.push(pose);if(proof.poses.length>128){proof.poses=proof.poses.slice(-16);proof.frames.clear();}}
    (this.bodyWitnessStats??={hits:0,fullQueries:0}).fullQueries++;
  }

  _rememberBlade(){
    const tool=this.sim.state.tools.right,anchor=new THREE.Vector3(...this._anchor(tool)),history=this._bladeHistory??=[],last=history.at(-1);
    if(last?.tool&&last.tool.position.every((v,i)=>Math.abs(v-tool.position[i])<1e-7)&&last.tool.wrist.every((v,i)=>Math.abs(v-tool.wrist[i])<1e-6)&&Math.abs(last.tool.jaw-tool.jaw)<1e-6)return;
    // Retain the whole entry from the last free working-space checkpoint.
    // A short position-only ring buffer can lose the escape after many bends.
    // Retain the complete entry. A reference-field value is not a metric
    // free-space checkpoint after traction; discarding here could erase the
    // only valid way out while the wrist is still next to the incision.
    const entry={anchor,tool:{position:[...tool.position],wrist:[...tool.wrist],jaw:tool.jaw,alignment:[...tool.alignment]}};
    history.push(entry);if(history.length>32768)history.shift();
    if(this.plan?.unidirectional&&this.phase==='raster')this._rowJournal?.push(entry.tool);
  }

  _recordedBladeStep(sim,pose,minimum=0){
    const tool=sim.state.tools.right,predicted=sweepInstrument(tool,{...tool,position:[...pose.position],wrist:[...pose.wrist],jaw:pose.jaw},sim.state.tools.left);
    if(predicted.limited){this._poseRejection='metal';return false;}
    if(this._context()&&!this._context().sweep(tool,predicted.tool)){this._poseRejection='context';return false;}
    const bodyMoves=instrumentMotionBound(tool,predicted.tool,{bodyOnly:true})>2e-12,protectTarget=sim.state.cutting,first=this._currentBladeGuard(tool,{protectTarget}),last=this._currentBladeGuard(predicted.tool,{protectTarget}),bodyFloor=0,lesionFloor=Math.min(minimum,first.lesionClearance);
    const permitted=(g,p)=>{const body=bodyMoves&&g.bodyMinimum<bodyFloor-1e-9,lesion=g.lesionClearance<lesionFloor-1e-9;if(!body&&!lesion)return true;this._poseRejection=lesion?'lesion':'tissue';this.lastBladeRejection={bodyMinimum:g.bodyMinimum,lesionClearance:g.lesionClearance,required:minimum,position:[...p.position],wrist:[...p.wrist]};return false;};
    if(!permitted(last,predicted.tool))return false;
    // Nonpositive unsigned envelope distances do not measure penetration.
    // An unchanged negative value is never permission to move a rigid body.
    // Jaw-only motion leaves that body fixed and retains the metal sweep.
    if(bodyMoves&&first.bodyMinimum<=0){this._poseRejection='tissue';return false;}
    const continuous=(a,b,ga,gb,depth=0)=>{
      const bound=instrumentMotionBound(a,b),bodyBound=instrumentMotionBound(a,b,{bodyOnly:true});
      const bodyClear=bodyBound<2e-12||(ga.bodyGaps&&gb.bodyGaps?instrumentBodyMotionBounds(a,b).every((travel,i)=>travel===Infinity||ga.bodyGaps[i]+gb.bodyGaps[i]-2*bodyFloor>travel+1e-9):ga.bodyMinimum+gb.bodyMinimum-2*bodyFloor>bodyBound+1e-9);
      if(bodyClear&&(ga.lesionClearance+gb.lesionClearance-2*lesionFloor>bound+1e-9))return true;
      const mid={...a,position:a.position.map((v,i)=>(v+b.position[i])*.5),wrist:a.wrist.map((v,i)=>(v+b.wrist[i])*.5),jaw:(a.jaw+b.jaw)*.5};mid.alignment=resolveInstrumentAlignment(mid,a.alignment);const gm=this._currentBladeGuard(mid,{protectTarget});
      if(!permitted(gm,mid))return false;
      // Non-cutting metal motion may consume 50 µm of the source envelopes'
      // 150 µm CAD padding, as the public metal/metal sweep already does. This
      // leaves the unchanged metal separated while avoiding thousands of
      // redundant near-tangent samples. Actual cutting retains the 4 µm test.
      if(depth>=10||(!protectTarget&&this.plan?.traction?.section&&bodyFloor>=0?bodyBound<.00005:bound<.000004))return true;
      return continuous(a,mid,ga,gm,depth+1)&&continuous(mid,b,gm,gb,depth+1);
    };
    if(!continuous(tool,predicted.tool,first,last))return false;
    return !sim.moveToolPose(pose,'right').limited;
  }

  _steerBlade(dt){
    // A closing stroke can still be committing its geometry when clearance
    // first fails. Do not plan a wrist route against that intermediate mesh.
    if(this.tissue.busy||this.interaction.cuttingBusy){this.sim.setCutting(false);return;}
    const steering=this._bladeSteering;if(steering.route){this._followBladeWristRoute(dt);return;}
    if(steering.waitForGeometry){this.sim.setCutting(false);if(this.tissue.busy||this.interaction.cuttingBusy)return;steering.waitForGeometry=false;}
    const right=this.sim.state.tools.right;
    if(this.plan?.anchorJaw===0&&right.jaw>.0001){
      const pose={position:[...right.position],wrist:[...right.wrist],jaw:Math.max(0,right.jaw-1.5*dt)};
      if(this._recordedBladeStep(this.sim,pose)){
        // Finish the real closing stroke before withdrawing or changing angle.
        // If the edges still touch tissue, send that stroke to the same CSG
        // controller rather than merely folding the visible jaws through it.
        this.sim.setCutting(steering.resumeCutting);steering.waitForGeometry=true;this._rememberBlade();return;
      }
    }
    if(this.wristPlanner&&this.plan?.traction?.section&&(this._currentBladeGuard(right,{protectTarget:false}).bodyMinimum<=0||(!steering.resumeCutting&&['row-transfer','return-cut'].includes(this.phase)))){
      this.planningTask=this._planBladeWristRoute();void this.planningTask.catch(error=>console.error(error));return;
    }
    if(!this._rowRecovery&&(steering.frames>=2||steering.relieveTraction)&&this._relieveBladeWithTraction())return;
    steering.relieveTraction=false;
    const tool=this.sim.state.tools.right,objective=steering.clearanceTarget??steering.target,current=this._bladeClearance(tool,objective);
    if(current.minimum>=SCISSORS_GUIDE_CLEARANCE&&current.pairClearance>=.00015){
      if(!this._moveBlade(steering.target)){
        if(this.active&&this._bladeSteering?.attempts>8){this.planningTask=this._planBladeWristRoute();void this.planningTask.catch(error=>console.error(error));}return;
      }
      this._bladeSteering=null;this._biteTime=0;this._biteWaiting=false;this._biteFinal=false;
      this.sim.setCutting(steering.resumeCutting);return;
    }
    // Two small local corrections are enough to test an immediately available
    // bend. A deep kerf can otherwise trigger hundreds of expensive searches
    // on the render thread. Continue the same exact CAD/surface search in the
    // detached worker, keeping both live arms still until a route is checked.
    if(this.wristPlanner&&this.plan?.traction?.section&&(steering.frames>=2||current.bodyMinimum<=0)){
      this.planningTask=this._planBladeWristRoute();void this.planningTask.catch(error=>console.error(error));return;
    }
    // Keep the actual tip stationary while bending. Local candidates retain
    // the full CAD and organ geometry; every applied joint/move still uses the
    // public swept tool collision controller.
    let best=null;const heldBaseline=this._bladeClearance(tool,steering.anchor),single=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]],coupled=[];
    for(let x=-1;x<=1;x++)for(let y=-1;y<=1;y++)for(let z=-1;z<=1;z++)if(Math.abs(x)+Math.abs(y)+Math.abs(z)>1)coupled.push([x,y,z]);
    search:for(const scale of [1,.5,.25,.125])for(const directions of [single,coupled]){
      for(const direction of directions){
        const wrist=tool.wrist.map((v,i)=>i<2?THREE.MathUtils.clamp(v+direction[i]*.8*dt*scale,-1.39,1.39):v+direction[i]*.8*dt*scale);
        const candidate=this._bladeClearance(tool,objective,wrist);if(candidate.penalty>=current.penalty-1e-15)continue;
        const held=this._bladeClearance(tool,steering.anchor,wrist);
        if(held.bodyMinimum<Math.min(0,heldBaseline.bodyMinimum)-1e-9||held.lesionClearance<Math.min(0,heldBaseline.lesionClearance)-1e-9||held.pairClearance<Math.min(0,heldBaseline.pairClearance)-1e-9)continue;
        if(held.solution.error>.00015||sweepInstrument(tool,{...tool,wrist,position:held.solution.position},this.sim.state.tools.left).limited)continue;
        if(!best||candidate.penalty<best.penalty)best={wrist,penalty:candidate.penalty};
      }
      if(best)break search;
    }
    if(!best||++steering.frames>400){
      if(this.tissue.busy||this.interaction.cuttingBusy)return;
      this.planningTask=this._planBladeWristRoute();void this.planningTask.catch(error=>console.error(error));return;
    }
    const probe=new this.sim.constructor();probe.restore(this.sim.snapshot());probe.setPaused(false);
    const start=[...tool.wrist],n=Math.max(1,Math.ceil(Math.max(...best.wrist.map((v,i)=>Math.abs(v-start[i])))/.008)),poses=[],floor=Math.min(0,heldBaseline.bodyMinimum,heldBaseline.lesionClearance);
    for(let i=1;i<=n;i++){
      const wrist=start.map((v,a)=>THREE.MathUtils.lerp(v,best.wrist[a],i/n)),candidate=probe.state.tools.right,solution=this._target({...candidate,wrist},steering.anchor.toArray()),pose={position:solution.position,wrist,jaw:candidate.jaw};
      if(solution.error>.00015||!this._recordedBladeStep(probe,pose,floor)){
        this.planningTask=this._planBladeWristRoute();void this.planningTask.catch(error=>console.error(error));return;
      }
      poses.push(pose);
    }
    this._rememberBlade();
    for(const pose of poses){if(!this._recordedBladeStep(this.sim,pose,floor)){this.stop('协调转腕路径被阻挡，已保持当前位置');return;}this._rememberBlade();}
  }

  async _planBladeWristRoute(){
    this._rememberBlade();
    const steering=this._bladeSteering,token=this._planningToken=(this._planningToken??0)+1,epoch=this.tissue._epoch,revision=this.tissue._contactRevision,snapshot=this.sim.snapshot(),tools=JSON.stringify(this.sim.state.tools);
    this.mode='planning';this.onMessage('右剪正在检查退刀与换角度路径');this.onChange();
    const valid=()=>this.active&&this._bladeSteering===steering&&this._planningToken===token&&this.tissue._epoch===epoch&&this.tissue._contactRevision===revision&&JSON.stringify(this.sim.state.tools)===tools;
    try{
      if(this.plan?.traction?.section){await loadBodyTriangleGeometry();if(!valid()){if(this.active&&this._planningToken===token){this.mode='example';steering.waitForGeometry=true;}return;}}
      let result;
      if(this.wristPlanner&&this.plan?.traction?.section){
        try{result=await this.wristPlanner.plan(this,steering,snapshot,{valid});if(result.goals)this.wristGoalCandidates=result.goals;if(result.lastRejectedPose)this.lastBladeRejection=result.lastRejectedPose;}
        catch(error){this.planningFallback={message:error.message,at:performance.now()};}
      }
      if(!result){const self=this;function* solve(){return(yield* self._preferredWristRouteSteps(steering,snapshot))??(yield* self._bladeWristRouteSteps(steering,snapshot));}result=await runCooperatively(solve(),{yieldFrame:yieldDemoTask,valid});}
      if(result.cancelled||!valid()){
        if(this.active&&this._planningToken===token&&this._bladeSteering===steering){
          this.mode='example';steering.waitForGeometry=true;steering.frames=0;
          this.onMessage('切面更新后重新检查右剪路径');this.onChange();
        }
        return;
      }
      (this.wristRouteTimings??=[]).push({pathIndex:this.pathIndex,target:steering.target.toArray(),anchor:steering.anchor.toArray(),startTools:structuredClone(snapshot.state.tools),cutCount:this.tissue._cuts?.length??0,found:!!result.value,partial:!!result.value?.partial,retreatMm:result.value?result.value.retreat*1000:null,rest:result.value?.rest.toArray()??null,wrist:result.value?.wrist??null,stats:result.stats,lastRejectedPose:this.lastBladeRejection?{...this.lastBladeRejection}:null});
      if(!result.value){this.stop('未找到保持器械根部位于组织外的进刀路径，请重新牵开目标组织');return;}
      steering.route={...result.value,validation:result.value.continuousCAD?createMotionValidation(this.tissue,snapshot.state.tools,result.value.validatedPoses):null,bodyProof:this.plan?.traction?.section?createBodyProof(this.tissue,snapshot.state.tools.right,result.value.validatedPoses):null,stage:result.value.validatedPoses?.length?'recorded':result.value.journal?.length?'rollback':result.value.retreat?'withdraw':'orient'};this.mode='example';this.onChange();
      if(steering.route.bodyProof)this._bodyWorldProof=steering.route.bodyProof;
    }catch(error){if(this._planningToken===token)this.stop('右剪换角度路径未完成');throw error;}
  }

  *_preferredWristRouteSteps(steering,snapshot,{quarterRoll=false}={}){
    if(!this.plan?.traction?.section)return null;
    const original=snapshot.state.tools.right,reference=original.alignment,start=canonicalScissorsWrist(original,reference),self=this;
    const wrists=quarterRoll?[[1.3,.65,Math.PI*1.5],[1.3,-.65,Math.PI*1.5]]:[...(this.wristRouteTimings??[]).filter(r=>r.found&&r.wrist).slice(-2).reverse().map(r=>r.wrist),start,
      [-1.3,-.65,Math.PI/2],[-1.3,-1.3,Math.PI/2],[-.65,-1.3,Math.PI/2],[-1.3,0,Math.PI/2],[0,-1.3,Math.PI/2],
      [1.3,-.65,Math.PI/2],[1.3,-1.3,Math.PI],[-1.3,1.3,Math.PI/2]],choices=[];
    for(const input of wrists){
      const goal=[...input];goal[2]=start[2]+Math.atan2(Math.sin(goal[2]-start[2]),Math.cos(goal[2]-start[2]));
      let minimum=Infinity,pair=Infinity;
      for(const jaw of [0,this.plan.jawOpening]){const c=this._bladeClearance({...original,jaw},steering.target,goal);minimum=Math.min(minimum,c.minimum);pair=Math.min(pair,c.pairClearance);yield;}
      if(minimum>=SCISSORS_GUIDE_CLEARANCE&&pair>=.0001){const angular=goal.reduce((n,v,i)=>n+(v-start[i])**2,0);choices.push({goal,score:angular<1e-12&&minimum>=.0005&&pair>=.0005?-1000:1e7*(Math.max(0,.003-minimum)**2+Math.max(0,.002-pair)**2)+.1*angular});}
    }
    choices.sort((a,b)=>a.score-b.score);
    const makeProbe=state=>{const probe=new self.sim.constructor();probe.restore(state);probe.setPaused(false);probe.setCutting(false);return probe;};
    const savePose=probe=>{const t=probe.state.tools.right;return{position:[...t.position],wrist:[...t.wrist],jaw:t.jaw,alignment:[...t.alignment],bodyGaps:[...self._currentBladeGuard(t,{protectTarget:false}).bodyGaps]};};
    function* line(probe,target,goal,poses,timing=0){
      const from=new THREE.Vector3(...self._anchor(probe.state.tools.right)),begin=canonicalScissorsWrist(probe.state.tools.right,reference);
      const n=Math.max(1,Math.ceil(2*Math.max(from.distanceTo(target)/.0002,...goal.map((v,i)=>Math.abs(v-begin[i])/.012))));
      for(let i=1;i<=n;i++){
        const t=i/n,u=timing===1?t*t:timing===2?1-(1-t)**2:t,point=from.clone().lerp(target,t),wrist=begin.map((v,a)=>THREE.MathUtils.lerp(v,goal[a],u)),command=self._poseCommand(probe.state.tools.right,point.toArray(),wrist,reference);
        const valid=command.error<=.00015&&self._recordedBladeStep(probe,command,0);if(valid)poses.push(savePose(probe));yield;if(!valid)return false;
      }
      return true;
    }
    function* jaws(probe,goal){
      for(const jaw of [0,self.plan.jawOpening]){
        const tool={...probe.state.tools.right,jaw},clear=self._bladeClearance(tool,steering.target);
        if(clear.minimum<SCISSORS_GUIDE_CLEARANCE||sourceInstrumentContact(probe.state.tools.left,tool).clearance<0)return false;
        probe.setJaw('right',jaw);const command=self._poseCommand(probe.state.tools.right,steering.target.toArray(),goal,reference);
        const valid=Math.abs(probe.state.tools.right.jaw-jaw)<.001&&command.error<=.00015&&self._recordedBladeStep(probe,command,0);yield;if(!valid)return false;
      }
      return true;
    }
    const result=(goal,poses,rest,retreat)=>({wrist:goal,referenceAlignment:[...reference],rest,retreat,validatedPoses:poses,preferred:true});
    for(const {goal}of choices)for(const timing of [0,1,2]){
      const probe=makeProbe(snapshot),poses=[];
      if((yield* line(probe,steering.target,goal,poses,timing))&&(yield* jaws(probe,goal)))return result(goal,poses,steering.anchor.clone(),0);
    }
    // Try the natural closed-scissor manoeuvre before a global joint search:
    // withdraw into free space, articulate there, then approach the cut again.
    // Every source metal segment and every intermediate organ clearance uses
    // the same continuous controller guard as the live demonstration.
    const normal=this._currentBladeGuard(original,{protectTarget:false}).bodyNormal;
    const directions=[normal,new THREE.Vector3(...instrumentPose(original).shaftDirection).negate(),new THREE.Vector3(...original.port).sub(steering.anchor).normalize(),new THREE.Vector3(0,1,0)].filter(Boolean);
    for(const distance of [.025,.05])for(let d=0;d<directions.length;d++){
      if(directions.slice(0,d).some(v=>v.dot(directions[d])>.999))continue;
      const air=steering.anchor.clone().addScaledVector(directions[d],distance),withdrawn=makeProbe(snapshot),prefix=[];
      if(!(yield* line(withdrawn,air,start,prefix)))continue;
      const state=withdrawn.snapshot();
      for(const {goal}of choices){
        const probe=makeProbe(state),poses=prefix.slice();
        if((yield* line(probe,air,goal,poses))&&(yield* line(probe,steering.target,goal,poses))&&(yield* jaws(probe,goal)))return result(goal,poses,air,distance);
      }
    }
    // The opposite cutting-edge clocking is common at the curved lateral
    // margin. Try it after the established manoeuvres, before enumerating
    // the full configuration grid. Every pose and sweep uses the same CAD.
    if(!quarterRoll)return yield* this._preferredWristRouteSteps(steering,snapshot,{quarterRoll:true});
    return null;
  }

  *_replayEscapeJournalSteps(probe,journal,prefix,{shortcut=false,stopInAir=false}={}){
    const save=()=>{const t=probe.state.tools.right;prefix.push({position:[...t.position],wrist:[...t.wrist],jaw:t.jaw,alignment:[...t.alignment],bodyGaps:[...this._currentBladeGuard(t,{protectTarget:false}).bodyGaps]});};
    if(shortcut){
      let cursor=0;
      while(cursor<journal.length){
        let accepted=false;
        for(const count of new Set([64,16,4,1].map(n=>Math.min(n,journal.length-cursor)))){
          const tool=probe.state.tools.right,pose={...this._recordedPose(tool,journal[cursor+count-1])};
          if(this.plan?.traction?.section)pose.jaw=0;
          // This is a new, fully checked motion, not a skipped collision test.
          // Keep each attempted sweep bounded; the original dense path is
          // retained as a separate fallback if no shortcut is available.
          if(count>1&&instrumentMotionBound(tool,{...tool,...pose})>.006)continue;
          const valid=this._recordedBladeStep(probe,pose,0);if(valid){save();cursor+=count;accepted=true;}
          yield;if(accepted)break;
        }
        if(!accepted)return false;
        if(stopInAir&&this._currentBladeGuard(probe.state.tools.right,{protectTarget:false}).bodyMinimum>.005){
          const t=probe.state.tools.right,from=new THREE.Vector3(...t.position),direction=new THREE.Vector3(...t.port).sub(from).normalize(),wrist=[...t.wrist],jaw=t.jaw;
          // Five millimetres clears the present body, but a large bend needs
          // working space. Continue along the actual fixed insertion axis,
          // checking every complete move before accepting a turning point.
          for(let i=1;i<=25;i++){
            const valid=this._recordedBladeStep(probe,{position:from.clone().addScaledVector(direction,.001*i).toArray(),wrist,jaw},0);
            if(valid)save();yield;if(!valid)return false;
          }
          return true;
        }
      }
      return true;
    }
    for(const recorded of journal){
      const pose=this._recordedPose(probe.state.tools.right,recorded),start=structuredClone(probe.state.tools.right),n=Math.max(1,Math.ceil(Math.max(new THREE.Vector3(...start.position).distanceTo(new THREE.Vector3(...pose.position))/.0002,...pose.wrist.map((v,i)=>Math.abs(v-start.wrist[i])/.012),Math.abs(pose.jaw-start.jaw)/.05)));
      for(let i=1;i<=n;i++){
        const t=i/n,next={position:start.position.map((v,a)=>THREE.MathUtils.lerp(v,pose.position[a],t)),wrist:start.wrist.map((v,a)=>THREE.MathUtils.lerp(v,pose.wrist[a],t)),jaw:THREE.MathUtils.lerp(start.jaw,pose.jaw,t)},valid=this._recordedBladeStep(probe,next);
        if(valid)save();yield;if(!valid)return false;
      }
    }
    return true;
  }

  *_bladeWristRouteSteps(steering,snapshot,{allowPartial=true,candidateBudget=this.plan?.traction?.section?8:Infinity,historyOnly=false}={}){
    const original=snapshot.state.tools.right,candidates=[],seeds=[],opening=this.plan.jawOpening,self=this;
    const add=(wrist,pairClearance,minimum)=>candidates.push({wrist,pairedClear:pairClearance>=1e-7,score:(pairClearance<1e-7?1000:0)+1e7*(Math.max(0,.003-minimum)**2+Math.max(0,.002-pairClearance)**2)+.1*wrist.reduce((n,v,i)=>n+(v-original.wrist[i])**2,0)});
    function* evaluate(wrist){
      let minimum=Infinity,penalty=0,pairClearance=Infinity;
      for(const jaw of [0,opening,original.jaw]){
        const c=self._bladeClearance({...original,jaw},steering.target,wrist);minimum=Math.min(minimum,c.minimum);penalty+=c.penalty;
        const goal={...original,wrist,jaw,position:c.solution.position};goal.alignment=resolveInstrumentAlignment(goal,original.alignment);
        pairClearance=Math.min(pairClearance,sourceInstrumentContact(snapshot.state.tools.left,goal).clearance);yield;
      }
      return{wrist,minimum,penalty,pairClearance};
    }
    const rolls=[...new Set([original.wrist[2],original.wrist[2]-Math.PI/2,original.wrist[2]+Math.PI/2,original.wrist[2]+Math.PI,0,-Math.PI/2,Math.PI/2,Math.PI])];
    const bends=axis=>[...new Set([-1.39,-1.3,-.65,0,.65,1.3,1.39,THREE.MathUtils.clamp(original.wrist[axis],-1.39,1.39)])];
    let pairedCandidates=0,gridExhausted=true;
    grid:for(const pitch of bends(0))for(const yaw of bends(1))for(const roll of rolls){
      const candidate=yield* evaluate([pitch,yaw,roll]);
      if(candidate.minimum>=SCISSORS_GUIDE_CLEARANCE){add(candidate.wrist,candidate.pairClearance,candidate.minimum);if(candidate.pairClearance>=1e-7)pairedCandidates++;}
      if(Number.isFinite(candidate.penalty)&&(candidate.minimum<SCISSORS_GUIDE_CLEARANCE||candidate.pairClearance<.0001))seeds.push(candidate);
      if(pairedCandidates>=candidateBudget){gridExhausted=false;break grid;}
    }
    // Refine near-feasible poses rather than treating the coarse orientation
    // grid as a mechanical limit at a narrow, curved incision.
    seeds.sort((a,b)=>a.penalty-b.penalty);
    seed:for(const seed of pairedCandidates>=candidateBudget?[]:seeds.slice(0,8)){
      let current=seed;
      for(const step of [.16,.08,.04,.02])for(let iteration=0;iteration<2;iteration++){
        let best=current;
        for(let axis=0;axis<3;axis++)for(const sign of [-1,1]){
          const wrist=[...current.wrist];wrist[axis]=axis<2?THREE.MathUtils.clamp(wrist[axis]+sign*step,-1.39,1.39):wrist[axis]+sign*step;
          if(Math.abs(wrist[axis]-current.wrist[axis])<1e-6)continue;
          const candidate=yield* evaluate(wrist);if(candidate.minimum>=SCISSORS_GUIDE_CLEARANCE&&candidate.pairClearance>=.0001){add(wrist,candidate.pairClearance,candidate.minimum);continue seed;}
          if(candidate.penalty<best.penalty-1e-14)best=candidate;
        }
        if(best===current)break;current=best;
      }
    }
    candidates.sort((a,b)=>a.score-b.score);
    const search={coupled:0,exits:0,validExits:0,goals:0,turnBlocked:0,approachBlocked:0,pathBodyBlocked:0,pathMetalBlocked:0,pathLesionBlocked:0};
    function* finish(){
      if(historyOnly)return null;
      if(self.plan?.traction?.section){const direct=yield* coupledRoutes();if(direct)return direct;}
      const route=yield* self._configurationRouteSteps(steering,snapshot,candidates,search);
      if(route||gridExhausted||!Number.isFinite(candidateBudget))return route;
      // A small feasible batch is only an early opportunity, never a limit
      // on the mechanical search. Retain the complete original fallback.
      return yield* self._bladeWristRouteSteps(steering,snapshot,{allowPartial,candidateBudget:Infinity});
    }
    const initialDistance=steering.anchor.distanceTo(steering.target);
    const savePose=probe=>{const tool=probe.state.tools.right;return{position:[...tool.position],wrist:[...tool.wrist],jaw:tool.jaw,alignment:[...tool.alignment],bodyGaps:[...this._currentBladeGuard(tool,{protectTarget:false}).bodyGaps]};};
    this.wristGoalCandidates={pathIndex:this.pathIndex,count:candidates.length,clearMetalGoals:candidates.filter(c=>c.pairedClear).length,refinedSeeds:Math.min(8,seeds.length),search};
    const portDirection=new THREE.Vector3(...original.port).sub(new THREE.Vector3(...original.position)).normalize(),shaftWithdrawal=new THREE.Vector3(...instrumentPose(original).shaftDirection).negate(),directions=[shaftWithdrawal,portDirection];
    const surfaceNormal=this._currentBladeGuard(original).bodyNormal;
    if(surfaceNormal)directions.unshift(surfaceNormal,...[.25,.5,1].map(weight=>surfaceNormal.clone().addScaledVector(portDirection,weight).normalize()));
    // A pulled flap can cover the axial exit. Also test short side exits from
    // the existing incision; none is accepted without the same CAD/SDF sweep.
    for(let y=1;y>=-1;y--)for(let z=-1;z<=1;z++)for(let x=-1;x<=1;x++){
      if(!x&&!y&&!z)continue;const direction=new THREE.Vector3(x,y,z).normalize();
      if(this._bladeClearance(original,steering.anchor.clone().addScaledVector(direction,.002)).minimum>=-.0001)directions.push(direction);yield;
    }
    function* line(probe,from,to,canonicalWrist=null,trajectory=null){
      const begin=new THREE.Vector3(...self._anchor(probe.state.tools.right)),n=Math.max(1,Math.ceil(begin.distanceTo(to)/.0002));
      // Candidate endpoints retain the 50 µm preparation margin. The swept
      // interior uses the same zero-penetration boundary as live execution;
      // treating that margin as solid tissue rejected valid 15 µm air gaps.
      const floor=0;
      for(let i=1;i<=n;i++){
        const p=begin.clone().lerp(to,i/n),tool=probe.state.tools.right;
        if(canonicalWrist){const command=self._poseCommand(tool,p.toArray(),canonicalWrist,original.alignment),valid=command.error<=.00015&&self._recordedBladeStep(probe,command,floor);if(valid&&trajectory)trajectory.push(savePose(probe));yield;if(!valid)return false;continue;}
        const c=self._bladeClearance(tool,p);
        const endpoint={...tool,position:c.solution.position};endpoint.alignment=resolveInstrumentAlignment(endpoint,tool.alignment);
        if(c.minimum<floor-1e-9){search.pathBodyBlocked++;yield;return false;}
        if(sourceInstrumentContact(probe.state.tools.left,endpoint).clearance<0||sweepInstrument(tool,{...tool,position:c.solution.position},probe.state.tools.left).limited){search.pathMetalBlocked++;yield;return false;}
        const blocked=!self._recordedBladeStep(probe,{position:c.solution.position,wrist:[...tool.wrist],jaw:tool.jaw},floor);if(!blocked&&trajectory)trajectory.push(savePose(probe));yield;if(blocked)return false;
      }
      return true;
    }
    // In a hepatic cleft, replay the real entry to free working space before
    // retrying large coupled turns. Keep those turns as the complete fallback.
    function* coupledRoutes(){
    for(const timing of [0,1,2])for(const {wrist,pairedClear}of candidates.filter(c=>c.pairedClear).slice(0,12)){
      if(!pairedClear)continue;search.coupled++;
      const probe=new self.sim.constructor();probe.restore(snapshot);probe.setPaused(false);yield;
      const start=canonicalScissorsWrist(original,original.alignment),goal=[...wrist];goal[2]=start[2]+Math.atan2(Math.sin(wrist[2]-start[2]),Math.cos(wrist[2]-start[2]));
      const n=Math.max(1,Math.ceil(2*Math.max(initialDistance/.0002,...goal.map((v,i)=>Math.abs(v-start[i])/.012)))),trajectory=[];let valid=true;
      for(let i=1;i<=n;i++){
        const t=i/n,u=timing===1?t*t:timing===2?1-(1-t)**2:t,point=steering.anchor.clone().lerp(steering.target,t),canonical=start.map((v,a)=>THREE.MathUtils.lerp(v,goal[a],u)),command=self._poseCommand(probe.state.tools.right,point.toArray(),canonical,original.alignment);
        valid=command.error<=.00015&&self._recordedBladeStep(probe,command,0);if(valid)trajectory.push(savePose(probe));else if(self._poseRejection==='lesion')search.pathLesionBlocked++;else if(self._poseRejection==='tissue')search.pathBodyBlocked++;else search.pathMetalBlocked++;yield;if(!valid)break;
      }
      if(!valid)continue;
      for(const jaw of [0,opening]){if(sourceInstrumentContact(probe.state.tools.left,{...probe.state.tools.right,jaw}).clearance<0){valid=false;break;}probe.setJaw('right',jaw);valid=Math.abs(probe.state.tools.right.jaw-jaw)<.001&&(yield* line(probe,steering.target,steering.target,goal));if(!valid)break;}
      if(valid)return{wrist:goal,startWrist:start,referenceAlignment:[...original.alignment],rest:steering.anchor.clone(),retreat:0,validatedPoses:trajectory};
    }
      return null;
    }
    if(!this.plan?.traction?.section){const direct=yield* coupledRoutes();if(direct)return direct;}
    const exits=[];
    const addExit=points=>{let from=steering.anchor,length=0;const path=[];for(const point of points){if(from.distanceTo(point)<.00005)continue;length+=from.distanceTo(point);path.push(point.clone());from=point;}if(path.length)exits.push({points:path,retreat:length});};
    // Reuse the real collision-free entry, not only guessed straight escape
    // directions. Every reversed segment is rechecked against the live organ.
    const rowRecorded=(this._rowJournal??[]).slice(0,-1).reverse();
    const recorded=(this._bladeHistory??[]).filter(p=>p.tool).slice(0,-1).reverse();
    if(this.plan?.traction?.section&&recorded.length)exits.push({points:[],journal:recorded.map(p=>p.tool),shortcut:true,stopInAir:true,retreat:0});
    if(rowRecorded.length)exits.push({points:[],journal:rowRecorded,retreat:steering.anchor.distanceTo(new THREE.Vector3(...this._anchor({...original,...rowRecorded.at(-1)})))});
    for(const count of new Set([8,24,64,128,recorded.length]))if(count>0&&recorded.length>=count){const journal=recorded.slice(0,count).map(p=>p.tool),rest=recorded[count-1].anchor;exits.push({points:[],journal,retreat:steering.anchor.distanceTo(rest)});}
    if(surfaceNormal)for(const distance of [.008,.016,.003,.001])for(const direction of directions.slice(0,4))exits.push({points:[steering.anchor.clone().addScaledVector(direction,distance)],retreat:distance});
    const recent=recorded.map(p=>p.anchor);
    for(const count of [6,12,24,48,96])if(recent.length>=count)addExit(recent.slice(0,count));
    for(const previous of (this.wristRouteTimings??[]).filter(r=>r.found&&r.pathIndex<=this.pathIndex).slice(-2).reverse()){
      const back=[];for(let index=this.pathIndex-1;index>previous.pathIndex&&back.length<12;index--)if(this.plan.path?.[index])back.push(this._displayReference(this.plan.path[index]));
      back.push(new THREE.Vector3(...previous.target),new THREE.Vector3(...previous.rest));addExit(back);
      const rest=back.at(-1),outward=new THREE.Vector3(...original.port).sub(rest).normalize();addExit([...back,rest.clone().addScaledVector(outward,.02)]);
    }
    for(const retreat of [.003,.005,.008,0,.012,.016,.02,.03,.04,.05])for(const withdrawal of retreat?directions:[portDirection])exits.push({points:retreat?[steering.anchor.clone().addScaledVector(withdrawal,retreat)]:[],retreat});
    for(const batch of [candidates.filter(c=>c.pairedClear),candidates.filter(c=>!c.pairedClear)])for(const exit of historyOnly?exits.filter(e=>e.journal?.length).slice(0,2):exits){
      search.exits++;
      const withdrawn=new this.sim.constructor();withdrawn.restore(snapshot);withdrawn.setPaused(false);yield;
      const prefix=[];
      const rollbackClear=yield* this._replayEscapeJournalSteps(withdrawn,exit.journal??[],prefix,exit);
      if(!rollbackClear)continue;
      let from=steering.anchor,clear=true;for(const point of exit.points){if(!(yield* line(withdrawn,from,point,null,prefix))){clear=false;break;}from=point;}if(!clear)continue;
      const rest=exit.journal?.length?new THREE.Vector3(...this._anchor(withdrawn.state.tools.right)):from,retreat=exit.stopInAir?steering.anchor.distanceTo(rest):exit.retreat;
      search.validExits++;
      const withdrawnState=withdrawn.snapshot();
      const leftY=this.sim.state.tools.left.position[1];
      if(prefix.length&&this.plan.traction?.section&&allowPartial&&(steering.partialPasses??0)<8&&this.leftLiftFinal&&this.leftLiftFinal.y-leftY>.001&&(steering.lastReliefY==null||leftY-steering.lastReliefY>.001)&&this._currentBladeGuard(withdrawn.state.tools.right).bodyMinimum>.005){
        // Withdraw through a fully checked route before opening the cleft
        // further with the left clamp. Replan after that real shape change;
        // a wrist must not turn in the original narrow slit first.
        return{wrist:[...withdrawn.state.tools.right.wrist],referenceAlignment:[...original.alignment],rest,retreat,validatedPoses:prefix,partial:true,relieveAfterRetreat:true};
      }
      // A near-surface rest may block every large turn. Do not exhaust all
      // endpoint orientations there before trying a slightly deeper exit.
      for(const {wrist}of surfaceNormal?batch.slice(0,10):batch){
      search.goals++;
      if(search.goals>128)return yield* finish();
      const trajectory=prefix.slice();
      const probe=new this.sim.constructor();probe.restore(withdrawnState);probe.setPaused(false);yield;
      const start=canonicalScissorsWrist(probe.state.tools.right,original.alignment),canonicalTarget=[...wrist];canonicalTarget[2]=start[2]+Math.atan2(Math.sin(wrist[2]-start[2]),Math.cos(wrist[2]-start[2]));
      if(retreat>.002){
        const coupled=prefix.slice(),count=Math.max(1,Math.ceil(Math.max(rest.distanceTo(steering.target)/.0003,...canonicalTarget.map((v,i)=>Math.abs(v-start[i])/.018))));let clear=true;
        for(let i=1;i<=count;i++){
          const t=i/count,point=rest.clone().lerp(steering.target,t),canonical=start.map((v,a)=>THREE.MathUtils.lerp(v,canonicalTarget[a],t)),command=this._poseCommand(probe.state.tools.right,point.toArray(),canonical,original.alignment);
          clear=command.error<=.00015&&this._recordedBladeStep(probe,command,0);if(clear)coupled.push(savePose(probe));yield;if(!clear)break;
        }
        if(clear)for(const jaw of [0,opening]){const tool={...probe.state.tools.right,jaw};if(sourceInstrumentContact(probe.state.tools.left,tool).clearance<0||this._bladeClearance(tool,steering.target).minimum<SCISSORS_GUIDE_CLEARANCE){clear=false;break;}}
        if(clear)return{wrist:canonicalTarget,startWrist:start,referenceAlignment:[...original.alignment],rest,retreat,validatedPoses:coupled};
        probe.restore(withdrawnState);probe.setPaused(false);
      }
      const n=Math.max(1,Math.ceil(Math.max(...canonicalTarget.map((v,i)=>Math.abs(v-start[i])))/.012));let valid=true;
      for(let i=1;i<=n&&valid;i++){
        const canonical=start.map((v,axis)=>THREE.MathUtils.lerp(v,canonicalTarget[axis],i/n)),command=this._poseCommand(probe.state.tools.right,rest.toArray(),canonical,original.alignment);
        valid=command.error<=.00015&&this._recordedBladeStep(probe,command,0);if(valid)trajectory.push(savePose(probe));yield;
      }
      if(!valid){search.turnBlocked++;continue;}
      if(!(yield* line(probe,rest,steering.target,canonicalTarget,trajectory))){
        search.approachBlocked++;
        const reached=new THREE.Vector3(...this._anchor(probe.state.tools.right)),distance=reached.distanceTo(steering.target);
        if(allowPartial&&(steering.partialPasses??0)<8&&distance<initialDistance-.0003){return{wrist:canonicalTarget,startWrist:start,referenceAlignment:[...original.alignment],rest,retreat,withdrawalPath:exit.points,journal:exit.journal,validatedPoses:trajectory,partial:true,approachTarget:reached};}
        continue;
      }
      for(const jaw of [0,opening]){if(sourceInstrumentContact(probe.state.tools.left,{...probe.state.tools.right,jaw}).clearance<0){valid=false;break;}probe.setJaw('right',jaw);if(Math.abs(probe.state.tools.right.jaw-jaw)>.001){valid=false;break;}valid=yield* line(probe,steering.target,steering.target,canonicalTarget);if(!valid)break;}
      if(valid)return{wrist:canonicalTarget,startWrist:start,referenceAlignment:[...original.alignment],rest,retreat,withdrawalPath:exit.points,journal:exit.journal,validatedPoses:trajectory};
      }
    }
    return yield* finish();
  }

  *_configurationRouteSteps(steering,snapshot,candidates,search){
    const original=snapshot.state.tools.right,reference=original.alignment,self=this;
    const startWrist=canonicalScissorsWrist(original,reference),start=[...steering.anchor.toArray(),...startWrist],probe=new this.sim.constructor();
    probe.restore(snapshot);probe.setPaused(false);
    const wrap=w=>[w[0],w[1],startWrist[2]+Math.atan2(Math.sin(w[2]-startWrist[2]),Math.cos(w[2]-startWrist[2]))];
    const pose=tool=>({position:[...tool.position],wrist:[...tool.wrist],jaw:tool.jaw,alignment:[...tool.alignment],bodyGaps:[...this._currentBladeGuard(tool,{protectTarget:false}).bodyGaps]});
    const metric=(a,b)=>Math.hypot(...a.map((v,i)=>(v-b[i])*(i<3?1:.015)));
    const initial={q:start,tool:structuredClone(original),parent:null};
    const goals=[];
    for(const candidate of candidates.filter(c=>c.pairedClear).slice(0,24)){
      const wrist=wrap(candidate.wrist),command=this._poseCommand(original,steering.target.toArray(),wrist,reference),tool={...structuredClone(original),...command};
      tool.alignment=resolveInstrumentAlignment(tool,original.alignment);
      if(command.error>.00015||this._bladeClearance(tool,steering.target).minimum<SCISSORS_GUIDE_CLEARANCE||sourceInstrumentContact(snapshot.state.tools.left,tool).clearance<0)continue;
      goals.push({q:[...steering.target.toArray(),...wrist],tool,parent:null});yield;
    }
    if(!goals.length)return null;
    let seed=(this.pathIndex??0)+1729;
    const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
    function* edge(node,q,trajectory=null){
      probe.state.tools.right=structuredClone(node.tool);
      const n=Math.max(1,Math.ceil(Math.max(Math.hypot(...q.slice(0,3).map((v,i)=>v-node.q[i]))/.0003,...q.slice(3).map((v,i)=>Math.abs(v-node.q[i+3])/.018))));
      for(let i=1;i<=n;i++){
        const v=node.q.map((x,a)=>THREE.MathUtils.lerp(x,q[a],i/n)),command=self._poseCommand(probe.state.tools.right,v.slice(0,3),v.slice(3),reference);
        const valid=command.error<=.00015&&self._recordedBladeStep(probe,command,0);yield;
        if(!valid)return null;if(trajectory)trajectory.push(pose(probe.state.tools.right));
      }
      return{q:[...q],tool:structuredClone(probe.state.tools.right),parent:node};
    }
    const nearest=(tree,q)=>tree.reduce((a,b)=>metric(a.q,q)<=metric(b.q,q)?a:b);
    function* extend(tree,q){
      const near=nearest(tree,q),scale=Math.max(1,Math.hypot(...q.slice(0,3).map((v,i)=>v-near.q[i]))/.002,...q.slice(3).map((v,i)=>Math.abs(v-near.q[i+3])/.14));
      const target=near.q.map((v,i)=>v+(q[i]-v)/scale),node=yield* edge(near,target);
      if(node)tree.push(node);return node;
    }
    const trees=[[initial],goals],chain=node=>{const list=[];for(let n=node;n;n=n.parent)list.push(n);return list;};
    search.configuration={iterations:0,nodes:goals.length+1};
    for(let iteration=0;iteration<1400;iteration++){
      search.configuration.iterations=iteration+1;
      const a=iteration%2,b=1-a,goal=goals[Math.floor(random()*goals.length)];let sample;
      if(iteration%7===0){const point=steering.anchor.clone().addScaledVector(new THREE.Vector3(...instrumentPose(original).shaftDirection).negate(),.015+random()*.045);sample=[...point.toArray(),...startWrist];}
      else if(iteration%5===0)sample=a?start:goal.q;
      else{
        const centre=steering.anchor.clone().lerp(steering.target,random()),radius=iteration<250?.008:.06;
        sample=[...centre.toArray().map(v=>v+(random()*2-1)*radius),...(iteration%3?startWrist.map((v,i)=>i<2?THREE.MathUtils.clamp(v+(random()*2-1)*1.4,-1.39,1.39):v+(random()*2-1)*Math.PI):goal.q.slice(3))];
      }
      const added=yield* extend(trees[a],sample);if(!added)continue;
      let other=nearest(trees[b],added.q);
      for(let step=0;step<20;step++){
        if(metric(other.q,added.q)<1e-8){
          const begin=a?other:added,end=a?added:other,configs=[...chain(begin).reverse(),...chain(end)],trajectory=[];
          let current=initial,valid=true;
          for(const next of configs.slice(1)){const result=yield* edge(current,next.q,trajectory);if(!result){valid=false;break;}current=result;}
          if(valid)return{wrist:current.q.slice(3),referenceAlignment:[...reference],rest:steering.anchor.clone(),retreat:0,validatedPoses:trajectory,configurationSearch:{...search.configuration}};
          break;
        }
        const next=yield* extend(trees[b],added.q);if(!next)break;other=next;
      }
      search.configuration.nodes=trees[0].length+trees[1].length;yield;
    }
    return null;
  }

  _followBladeWristRoute(dt){
    const steering=this._bladeSteering,route=steering.route,tool=this.sim.state.tools.right;
    const retry=()=>{const retries=(steering.retries??0)+1;if(retries>6){this.stop('切口间隙不足，已保持器械位置，请重新牵开组织');return false;}this._bladeSteering={target:steering.target,anchor:new THREE.Vector3(...this._anchor(tool)),frames:0,retries,partialPasses:steering.partialPasses??0,resumeCutting:steering.resumeCutting};return false;};
    if(route.validatedPoses&&!route.recordedStarted){route.recordedStarted=true;route.stage='recorded';}
    if(route.stage==='recorded'){
      let budget=dt;
      while(budget>1e-8){const recorded=route.validatedPoses[route.poseIndex??0],pose=recorded?this._recordedPose(recorded.side==='left'?this.sim.state.tools.left:tool,recorded):null;if(!pose){if(route.partial){this._bladeSteering={target:steering.target,anchor:new THREE.Vector3(...this._anchor(tool)),frames:route.relieveAfterRetreat?401:0,partialPasses:(steering.partialPasses??0)+1,lastReliefY:route.relieveAfterRetreat?this.sim.state.tools.left.position[1]:steering.lastReliefY,resumeCutting:steering.resumeCutting};this.sim.setCutting(false);}else{this._bladeSteering=null;this._biteTime=0;this._biteFinal=false;this._biteWaiting=false;this.sim.setCutting(steering.resumeCutting);}return;}
        if(route.validation){
          const index=route.poseIndex??0,begin=index?route.validatedPoses[index-1]:route.validation.base,end=route.validatedPoses[index],from=route.poseFraction??0;
          const duration=Math.max(new THREE.Vector3(...begin.position).distanceTo(new THREE.Vector3(...end.position))/.04,...end.wrist.map((v,i)=>Math.abs(v-begin.wrist[i])/.8),Math.abs(end.jaw-begin.jaw)/1.5),to=Math.min(1,from+budget/Math.max(duration,1e-12));
          if(this._context()){
            const next={...begin,position:begin.position.map((v,i)=>THREE.MathUtils.lerp(v,end.position[i],to)),wrist:begin.wrist.map((v,i)=>THREE.MathUtils.lerp(v,end.wrist[i],to)),jaw:THREE.MathUtils.lerp(begin.jaw,end.jaw,to)};next.alignment=resolveInstrumentAlignment(next,begin.alignment);
            if(!this._context().sweep(tool,next))return retry();
          }
          if(!validatedMotionStep(this.tissue,this.sim,route.validation,index,from,to))return retry();
          steering.expectedAnchor=new THREE.Vector3(...this._anchor(tool));this._rememberBlade();
          budget-=Math.min(budget,(to-from)*duration);route.poseFraction=to;
          if(to>=1){route.poseIndex=index+1;route.poseFraction=0;}else return;
          continue;
        }
        const actor=pose.side==='left'?this.sim.state.tools.left:tool,start=structuredClone(actor),duration=Math.max(new THREE.Vector3(...start.position).distanceTo(new THREE.Vector3(...pose.position))/.04,...pose.wrist.map((v,i)=>Math.abs(v-start.wrist[i])/.8),Math.abs(pose.jaw-start.jaw)/1.5),fraction=Math.min(1,budget/Math.max(duration,1e-12)),n=Math.max(1,Math.ceil(Math.max(new THREE.Vector3(...start.position).distanceTo(new THREE.Vector3(...pose.position))*fraction/.0002,...pose.wrist.map((v,i)=>Math.abs(v-start.wrist[i])*fraction/.012))));
        for(let i=1;i<=n;i++){const t=fraction*i/n,next={position:start.position.map((v,a)=>THREE.MathUtils.lerp(v,pose.position[a],t)),wrist:start.wrist.map((v,a)=>THREE.MathUtils.lerp(v,pose.wrist[a],t)),jaw:THREE.MathUtils.lerp(start.jaw,pose.jaw,t)};if(pose.side==='left'){if(this.sim.moveToolPose(next,'left').limited)return retry();}else if(!this._recordedBladeStep(this.sim,next))return retry();steering.expectedAnchor=new THREE.Vector3(...this._anchor(tool));this._rememberBlade();}
        budget-=Math.min(budget,duration);if(fraction>=1)route.poseIndex=(route.poseIndex??0)+1;else return;
      }return;
    }
    if(route.stage==='rollback'){
      let budget=dt;
      while(budget>1e-8){const recorded=route.journal[route.rollbackIndex??0],pose=recorded?this._recordedPose(tool,recorded):null;if(!pose){route.stage='orient';this._bladeHistory=[];this._rememberBlade();return;}
        const start=structuredClone(tool),duration=Math.max(new THREE.Vector3(...start.position).distanceTo(new THREE.Vector3(...pose.position))/.04,...pose.wrist.map((v,i)=>Math.abs(v-start.wrist[i])/.8),Math.abs(pose.jaw-start.jaw)/1.5),fraction=Math.min(1,budget/Math.max(duration,1e-12));
        const n=Math.max(1,Math.ceil(Math.max(new THREE.Vector3(...start.position).distanceTo(new THREE.Vector3(...pose.position))*fraction/.0002,...pose.wrist.map((v,i)=>Math.abs(v-start.wrist[i])*fraction/.012),Math.abs(pose.jaw-start.jaw)*fraction/.05)));
        for(let i=1;i<=n;i++){const t=fraction*i/n,next={position:start.position.map((v,a)=>THREE.MathUtils.lerp(v,pose.position[a],t)),wrist:start.wrist.map((v,a)=>THREE.MathUtils.lerp(v,pose.wrist[a],t)),jaw:THREE.MathUtils.lerp(start.jaw,pose.jaw,t)};if(!this._recordedBladeStep(this.sim,next)){this.stop('已记录的退刀路径发生变化，已保持器械位置');return;}steering.expectedAnchor=new THREE.Vector3(...this._anchor(tool));}
        budget-=Math.min(budget,duration);if(fraction>=1)route.rollbackIndex=(route.rollbackIndex??0)+1;else return;
      }return;
    }
    const canonicalMove=(point,wrist)=>{
      const command=this._poseCommand(tool,point.toArray(),wrist,route.referenceAlignment);
      if(command.error>.00015||!this._recordedBladeStep(this.sim,command,0))return retry();
      steering.expectedAnchor=point.clone();this._rememberBlade();return true;
    };
    const move=point=>{
      if(route.referenceAlignment){const begin=new THREE.Vector3(...this._anchor(tool)),n=Math.max(1,Math.ceil(begin.distanceTo(point)/.0002));for(let i=1;i<=n;i++)if(!canonicalMove(begin.clone().lerp(point,i/n),route.wrist))return false;return true;}
      const c=this._bladeClearance(tool,point);if(c.minimum<SCISSORS_GUIDE_CLEARANCE){
        // The runtime RCM frame is transported from the actual last pose.
        // At a narrow kerf it can differ slightly from a sampled preview.
        // Keep the real blade still and replan from here; never push through.
        return retry();
      }
      steering.expectedAnchor=point.clone();if(!this.move(c.solution.position,'right'))return false;this._rememberBlade();return true;
    };
    if(route.stage==='orient'){
      if(route.referenceAlignment){
        if(!route.canonicalCurrent){route.canonicalCurrent=canonicalScissorsWrist(tool,route.referenceAlignment);if(route.startWrist){const base=route.startWrist[2];route.canonicalCurrent[2]=base+Math.atan2(Math.sin(route.canonicalCurrent[2]-base),Math.cos(route.canonicalCurrent[2]-base));}}
        const start=[...route.canonicalCurrent],gap=Math.max(...route.wrist.map((v,i)=>Math.abs(v-start[i]))),fraction=Math.min(1,.8*dt/Math.max(gap,1e-12)),next=start.map((v,i)=>THREE.MathUtils.lerp(v,route.wrist[i],fraction)),n=Math.max(1,Math.ceil(Math.max(...next.map((v,i)=>Math.abs(v-start[i])))/.012));
        for(let i=1;i<=n;i++)if(!canonicalMove(route.rest,start.map((v,a)=>THREE.MathUtils.lerp(v,next[a],i/n))))return;
        route.canonicalCurrent=next;if(gap<.0001)route.stage='approach';return;
      }
      const gap=Math.max(...route.wrist.map((v,i)=>Math.abs(v-tool.wrist[i]))),fraction=Math.min(1,.8*dt/Math.max(gap,1e-12));
      const nextWrist=tool.wrist.map((v,i)=>THREE.MathUtils.lerp(v,route.wrist[i],fraction));
      if(this._bladeClearance(tool,route.rest,nextWrist).minimum<0){this.stop('转腕途中没有足够的组织间隙，已保持当前器械位置');return;}
      for(let axis=0;axis<3;axis++){
        const target=nextWrist[axis];this.sim.adjustWrist(axis,target-tool.wrist[axis],'right');this._rememberBlade();
        if(Math.abs(tool.wrist[axis]-target)>.0001){this.stop('换角度时受到左钳阻挡');return;}
      }
      if(!move(route.rest))return;
      if(gap<.0001)route.stage='approach';return;
    }
    const target=route.stage==='withdraw'?(route.withdrawalPath?.[route.withdrawalIndex??0]??route.rest):(route.approachTarget??steering.target),anchor=new THREE.Vector3(...this._anchor(tool)),distance=anchor.distanceTo(target),step=Math.min(distance,.04*dt),n=Math.max(1,Math.ceil(step/.0005));
    for(let i=1;i<=n;i++)if(!move(anchor.clone().lerp(target,distance?step*i/n/distance:1)))return;
    if(distance<=step+.000025){
      if(route.stage==='withdraw'){route.withdrawalIndex=(route.withdrawalIndex??0)+1;if(route.withdrawalPath?.[route.withdrawalIndex])return;route.stage='orient';return;}
      if(route.partial){this._bladeSteering={target:steering.target,anchor:new THREE.Vector3(...this._anchor(tool)),frames:0,partialPasses:(steering.partialPasses??0)+1,resumeCutting:steering.resumeCutting};this.sim.setCutting(false);return;}
      this._bladeSteering=null;this._biteTime=0;this._biteFinal=false;this._biteWaiting=false;this.sim.setCutting(steering.resumeCutting);
    }
  }

  approach() {
    const side = this.sim.state.selected;
    if (side === 'scope') { this.onMessage('先选左钳或右剪，再进行表面就位'); return; }
    const tool = this.sim.state.tools[side];
    const surface = surfacePose(this.tissue, tool.position) ?? surfacePose(this.tissue, defaults[side]);
    if (!surface) { this.onMessage('当前区域没有可接近的组织表面'); return; }
    this.sim.checkpoint('器械表面就位', ()=>this.interaction.snapshot({forHistory:true}),{takeOwnership:true});
    if (side === 'left') this.interaction.release(true);
    this.sim.setCutting(false);
    this.sim.setJaw(side, .7);
    this.mode = 'approach'; this.active = true; this.time = 0; this.side = side;
    this.approachFragment=null;this._bleedingKey=null;this._pressureWaypoints=null;
    this.start = new THREE.Vector3(...tool.position);
    this.end = surface.point.addScaledVector(surface.normal, .001);
    this.onMessage(`${side === 'left' ? '左钳' : '右剪'}正在贴近实际组织表面`);
    this.onChange();
  }

  /** Approach an independent specimen only; never fall back to the mother. */
  approachSpecimen() {
    if(this.interaction.grasp){this.onMessage('左钳正在夹持组织，请先按 V 松开后再接近标本');return false;}
    if(this.sim.state.paused){this.onMessage('请先继续仿真，再接近标本');return false;}
    const pieces=this.tissue.fragmentMetrics?.pieces??[];
    const available=new Set(pieces.filter(piece=>!piece.held).map(piece=>piece.id));
    if(!available.size){this.onMessage(pieces.length?'独立组织块正被夹持，请先松开':'目前没有独立标本；请先完成真实切离');return false;}
    const tool=this.sim.state.tools.left,point=this.tissue.group.worldToLocal(new THREE.Vector3(...tool.position));
    const surface=this.tissue.findSpecimenGraspPoint?.(point,.35);
    const piece=surface?.fragmentId!=null?this.tissue.getFragment?.(surface.fragmentId):null;
    if(!piece||!available.has(piece.id)){this.onMessage('附近 35 cm 内未找到可接近的独立标本表面，不会退回母体');return false;}
    const normal=(surface.normal??new THREE.Vector3(0,1,0)).clone().normalize(),inverse=piece.quaternion.clone().invert();
    this.sim.checkpoint('左钳接近独立标本',()=>this.interaction.snapshot({forHistory:true}),{takeOwnership:true});
    this.sim.select('left');this.sim.setCutting(false);this.sim.setJaw('left',.75);
    this.mode='approach';this.active=true;this.time=0;this.side='left';
    this._bleedingKey=null;this._pressureWaypoints=null;
    this.start=new THREE.Vector3(...tool.position);
    this.approachFragment={id:piece.id,anchor:surface.clone().sub(piece.position).applyQuaternion(inverse),normal:normal.applyQuaternion(inverse)};
    this.end=this.tissue.group.localToWorld(surface.clone());
    this.onMessage('左钳正在接近最近的独立标本，标本移动时目标会随动；就位后按 C 重抓');
    this.onChange();return true;
  }

  approachBleeding(){
    if(!this._prepareBleedingApproach())return false;
    return this._acceptBleedingRoute(runImmediately(this._bleedingRouteSteps()));
  }

  _prepareBleedingApproach(){
    if(this.sim.state.paused||this.tissue.busy||this.interaction.cuttingBusy){this.onMessage('请先继续仿真并等待组织更新完成');return false;}
    if(!this._bleedingSources().length){this.onMessage('当前没有可接近的开放渗血切面');return false;}
    this.sim.checkpoint('右端接近渗血切面',()=>this.interaction.snapshot({forHistory:true}),{takeOwnership:true});this.sim.select('right');this.sim.setCutting(false);this.sim.setJaw('right',0);
    return true;
  }

  _bleedingSources(){
    const tool=this.sim.state.tools.right,point=this.tissue.group.worldToLocal(new THREE.Vector3(...tool.position));
    const sources=(this.tissue.blood?.nodes??[]).filter(n=>n.cut&&n.injured&&n.fragmentId==null&&n.clot<.95&&n.display);
    sources.sort((a,b)=>a.display.distanceToSquared(point)-b.display.distanceToSquared(point));
    return sources;
  }

  *_bleedingRouteSteps(){
    const snapshot=this.sim.snapshot(),sources=this._bleedingSources(),start=new THREE.Vector3(...this.sim.state.tools.right.position);
    const withdrawal=new THREE.Vector3(...this.sim.state.tools.right.port).sub(start).normalize();
    // Try all real exposed sources before a longer withdrawal route. Each sweep
    // uses the same source-CAD collision controller as manual movement.
    for(const distance of [0,.035,.07,.12]){
      const via=distance?start.clone().addScaledVector(withdrawal,distance):null;
      for(const source of sources){
        const probe=new this.sim.constructor();probe.restore(snapshot);probe.setPaused(false);yield;
        if(via){const blocked=this._probeMove(probe,via.toArray(),'right');yield;if(blocked)break;}
        const target=this.interaction.pressureApproachTarget(source),blocked=this._probeMove(probe,target.toArray(),'right');yield;
        if(!blocked)return {key:source.key,waypoints:via?[via,target]:[target]};
      }
    }
    return null;
  }

  async approachBleedingAsync(options={}){
    if(!this._prepareBleedingApproach())return false;
    const token=this._planningToken=(this._planningToken??0)+1,epoch=this.tissue._epoch,tools=JSON.stringify(this.sim.state.tools);
    this.active=true;this.mode='planning';this.phase='planning-pressure';
    const valid=()=>this.active&&this._planningToken===token&&this.tissue._epoch===epoch&&!this.sim.state.paused&&!this.tissue.busy&&!this.interaction.cuttingBusy&&JSON.stringify(this.sim.state.tools)===tools;
    this.onMessage('正在检查通往实际渗血切面的无碰撞路径');this.onChange();
    try{
      const result=await runCooperatively(this._bleedingRouteSteps(),{yieldFrame:yieldDemoTask,...options,valid});
      if(result.cancelled||!valid()){if(this._planningToken===token)this.stop('切面就位已取消：操作状态发生改变');return false;}
      this.pressureRouteTimings=result.stats;return this._acceptBleedingRoute(result.value);
    }catch(error){if(this._planningToken===token)this.stop('切面路径准备未完成，可重新选择');throw error;}
  }

  _acceptBleedingRoute(route){
    if(!route){this.active=false;this.onMessage('当前渗血切面被另一器械挡住；请先移开另一器械再就位');this.onChange();return false;}
    this.mode='approach';this.active=true;this.time=0;this.side='right';this.approachFragment=null;this._bleedingKey=route.key;
    this._pressureWaypoints=route.waypoints;this._pressureWaypoint=0;this._pressureAligning=false;
    this.start=new THREE.Vector3(...this.sim.state.tools.right.position);this.end=route.waypoints[0];
    this.onMessage('右端已闭合，正在以实际剪刃接近渗血切面；就位后按住 H 局部压迫');this.onChange();return true;
  }

  startExample() {
    if (this.active) { this.stop(); return; }
    if(this.tissue.busy||this.interaction.cuttingBusy){this.onMessage('组织更新中，请稍候再开始示范');return;}
    const plans=planPeripheralResections(this.tissue,{cutRadius:exampleCutRadius(this.tissue)});
    let prepared=null;
    for(const source of plans){const plan=areaResectionPlan(this.tissue,source);if(!plan)continue;prepared=this._preparePlan(plan);if(prepared)break;}
    if(!prepared){this.onMessage('当前器官没有可安全到达的薄缘切离路径；请移开器械或重置完整器官后重试');return;}
    this._startPrepared(prepared);
  }

  async startExampleAsync(options={}){
    if(this.active){this.stop();return false;}
    if(this.tissue.busy||this.interaction.cuttingBusy){this.onMessage('组织更新中，请稍候再开始示范');return false;}
    const token=this._planningToken=(this._planningToken??0)+1,epoch=this.tissue._epoch,cuts=this.tissue._cuts?.length,metadata=this.tissue.metadata;
    const tools=JSON.stringify(this.sim.state.tools),paused=this.sim.state.paused;
    const valid=()=>this._planningToken===token&&this.active&&!this.tissue._disposed&&this.tissue._epoch===epoch&&this.tissue.metadata===metadata&&this.tissue._cuts?.length===cuts&&!this.tissue.busy&&!this.interaction.cuttingBusy&&this.sim.state.paused===paused&&JSON.stringify(this.sim.state.tools)===tools;
    this.active=true;this.mode='planning';this.phase='planning';this.time=0;
    this.onMessage('正在分帧准备完整切离路径，可取消；组织采样与碰撞检查保持完整');this.onChange();
    const self=this;
    function* prepare(){
      const plans=yield* planPeripheralResectionSteps(self.tissue,{cutRadius:exampleCutRadius(self.tissue)});
      for(const source of plans){const plan=areaResectionPlan(self.tissue,source);if(!plan)continue;const prepared=yield* self._preparePlanSteps(plan);if(prepared)return prepared;}
      return null;
    }
    try{
      if(this.tissue.caseDefinition?.lesion&&this.tissue.caseDefinition.context!=='pelvic'){await loadBodyTriangleGeometry();if(!valid()){if(this._planningToken===token)this.stop('路径准备已取消：场景或操作状态发生改变');return false;}}
      const result=await runCooperatively(prepare(),{yieldFrame:yieldDemoTask,...options,valid});if(this._planningToken===token)this.planningTimings=result.stats;
      if(result.cancelled||!valid()){if(this._planningToken===token)this.stop('路径准备已取消：场景或操作状态发生改变');return false;}
      if(!result.value){this.stop('当前器官没有可安全到达的薄缘切离路径；请移开器械或重置完整器官后重试');return false;}
      this._startPrepared(result.value);return true;
    }catch(error){if(this._planningToken===token)this.stop('路径准备未完成，可重新开始');throw error;}
  }

  _startPrepared(prepared){
    Object.assign(this,prepared);
    this.sim.checkpoint('真实切离、夹持与移开示范', ()=>this.interaction.snapshot({forHistory:true}),{takeOwnership:true});
    this.interaction.release(true);
    this.interaction.setCutRadius?.(this.plan.cutRadius);
    this.sim.setCutting(false);
    this.sim.setPaused(false);
    this.sim.select('right');
    this._scopeBeforeDemo={follow:this.sim.state.scope.follow,mode:this.sim.state.scope.startupOverview?'active':this.sim.state.scope.followMode};
    this._demoScopeMode='active';this.sim.setScopeFollow(true,this._demoScopeMode);
    this.leftStart = new THREE.Vector3(...this.sim.state.tools.left.position);
    this.rightStart = new THREE.Vector3(...this.sim.state.tools.right.position);
    this.sim.setJaw('left', .75); this.sim.setJaw('right', this.plan.jawOpening);
    this.active = true; this.mode = 'example'; this.time = 0; this.phaseTime=0;this.phase='park';
    this.pathIndex=0;this.pathPoint=this.plan.path[0].clone();this.rasterTravel=0;this._biteWaiting=false;this._biteFinal=false;this._strokeEnd=false;this._areaQueuedIndex=-1;
    this._bladeSteering=null;this._areaQueuedIndex=-1;
    this._bladeHistory=[];
    this.wristRouteTimings=[];
    this.onMessage('区域切离：夹持牵开目标 → 成片切断连接面 → 完全切离后移开');
    this.onChange();
  }

  _preparePlan(plan) {
    return runImmediately(this._preparePlanSteps(plan));
  }

  *_preparePlanSteps(plan) {
    if(plan.traction&&plan.pattern==='area'){
      // A whole connection band needs a working gap, not the deep traction
      // required by successive fine rows. Check the same source-CAD entry
      // with a modest pull and keep that pull until genuine separation.
      for(const height of [.008,.010,.012])for(const rightWrist of [[0,-1.3,-Math.PI/2],[0,1.3,-Math.PI/2],[0,-1.3,Math.PI/2],[0,1.3,Math.PI/2],[0,0,Math.PI/2]]){
        const prepared=yield* this._prepareTrajectorySteps(plan,[0,height,0],{rightWrist,leftWrist:[-1.3,0,0],tractionEndOffset:[0,height,0]});
        if(prepared)return prepared;
      }
      return null;
    }
    if(plan.traction){
      // Open the first edge with a small pull. Increase traction between rows,
      // after the scissors have left tissue, so an existing kerf opens before
      // the next deeper pass. A large fixed pull crowded both shafts together.
      for(const offset of [[0,.020,0],[0,.026,0],[0,.030,0]])for(const rightWrist of [[0,-1.3,Math.PI/2],[0,1.3,Math.PI/2],[0,0,Math.PI/2]]){
        const progressive=yield* this._prepareTrajectorySteps(plan,offset,{rightWrist,leftWrist:[-1.3,0,0],tractionEndOffset:[0,.060,0]});
        if(progressive)return progressive;
      }
      const oblique=yield* this._prepareTrajectorySteps(plan,[.02,.035,-.024],{rightWrist:[0,-1.3,0]});
      if(oblique)return oblique;
      // Lift perpendicular to the target instead of compressing its lateral
      // margin toward the closed clamp. Bend the right wrist in free space.
      for(const rightWrist of [[0,0,0],[-1.3,0,0],[1.3,0,0],[0,.65,0],[0,-.65,0]]){
        const prepared=yield* this._prepareTrajectorySteps(plan,[0,.035,0],{rightWrist});
        if(prepared)return prepared;
      }
    }
    const offsets=this.tissue.caseDefinition?.lesion?[...(this.tissue.caseDefinition.context!=='pelvic'?[[-.026,.024,.008],[-.050,.035,.015],[-.040,.045,.020],[-.026,.035,.020]]:[]),[0,.024,-.024],[0,.024,.024],[-.014,.028,0],[-.026,.024,0],[.010,.024,.024]]:null;
    for(const offset of offsets??[null]){const prepared=yield* this._prepareTrajectorySteps(plan,offset);if(prepared)return prepared;}
    return null;
  }

  *_prepareTrajectorySteps(plan,tractionOffset,{frozenWrist=false,rightWrist=null,leftWrist=null,tractionEndOffset=null}={}) {
    const world=point=>this.tissue.group.localToWorld(point.clone());
    const surface=world(plan.referenceAnchor),up=new THREE.Vector3(0,1,0);
    const leftRest=surface.clone().addScaledVector(plan.worldNormal,.0006);
    const leftLift=tractionOffset?leftRest.clone().add(new THREE.Vector3(...tractionOffset)):leftRest.clone().addScaledVector(plan.worldNormal,.016).addScaledVector(up,.008);
    const leftLiftFinal=tractionEndOffset?leftRest.clone().add(new THREE.Vector3(...tractionEndOffset)):null;
    const leftAway=plan.traction?(leftLiftFinal??leftLift).clone().add(new THREE.Vector3(-.045,.015,.02)):leftLift.clone().addScaledVector(plan.worldNormal,.045).addScaledVector(up,.025);
    const delta=this.tissue.group.worldToLocal(leftLift.clone()).sub(plan.referenceAnchor);
    const preview=normalizeDeformation({model:'local-flow',local:plan.referenceAnchor.toArray(),displacement:delta.toArray(),...plan.traction});
    const displayed=point=>world(new THREE.Vector3(...materialDisplay(point.toArray(),preview)));
    const previewDistance=point=>this.tissue.queryReferenceDistance(new THREE.Vector3(...inverseDeformPoint(this.tissue.group.worldToLocal(new THREE.Vector3(...point)).toArray(),preview)));
    const rightEntry=displayed(plan.path[0]);
    const rightStart=new THREE.Vector3(...this.sim.state.tools.right.position),withdrawal=new THREE.Vector3(...this.sim.state.tools.right.port).sub(rightStart).normalize();
    const initialLeft=new THREE.Vector3(...this.sim.state.tools.left.position),leftStandby=initialLeft.clone().addScaledVector(new THREE.Vector3(...this.sim.state.tools.left.port).sub(initialLeft).normalize(),.045);
    const standbyCandidates=[...(this.tissue.caseDefinition?.lesion?[.05,.09].map(d=>rightStart.clone().addScaledVector(withdrawal,d)):[]),rightStart,
      rightEntry.clone().addScaledVector(plan.worldNormal,.035).addScaledVector(up,.018),
      rightEntry.clone().addScaledVector(plan.worldNormal,.07).addScaledVector(up,.05)];
    // Probe the exact public collision controller before selecting a plan. This
    // never rewrites scene state or bypasses a blocked instrument during playback.
    for(const rightStandby of standbyCandidates){
      try{
        const probe=new this.sim.constructor();probe.restore(this.sim.snapshot());probe.setPaused(false);
        probe.setJaw('left',.75);probe.setJaw('right',plan.jawOpening);
        let blocked=this._probeMove(probe,rightStandby.toArray(),'right');yield;
        if(!blocked&&rightWrist)for(let axis=0;axis<3;axis++){const before=structuredClone(probe.state.tools.right);probe.adjustWrist(axis,rightWrist[axis]-probe.state.tools.right.wrist[axis],'right');blocked=Math.abs(probe.state.tools.right.wrist[axis]-rightWrist[axis])>.0001||!!(this._context()&&!this._context().sweep(before,probe.state.tools.right));yield;if(blocked)break;}
        if(!blocked&&leftWrist){blocked=probe.moveToolTo(leftStandby.toArray(),'left').limited;yield;}
        if(!blocked&&leftWrist)for(let axis=0;axis<3;axis++){probe.adjustWrist(axis,leftWrist[axis]-probe.state.tools.left.wrist[axis],'left');blocked=Math.abs(probe.state.tools.left.wrist[axis]-leftWrist[axis])>.0001;yield;if(blocked)break;}
        if(!blocked){blocked=probe.moveToolTo(leftRest.toArray(),'left').limited;yield;}
        probe.setJaw('left',0);yield;
        if(!blocked){blocked=probe.moveToolTo(leftLift.toArray(),'left').limited;yield;}
        const moveBlade=point=>{const target=this._target(probe.state.tools.right,point.toArray(),plan);return target.error>.00015||this._probeMove(probe,target.position,'right');};
        if(!blocked&&plan.traction){
          const from=new THREE.Vector3(...this._anchor(probe.state.tools.right,plan)),n=Math.max(1,Math.ceil(from.distanceTo(rightEntry)/.0005));
          for(let i=1;i<=n;i++){
            const point=from.clone().lerp(rightEntry,i/n),c=scissorsBodyClearance({...probe.state.tools.right,jaw:plan.anchorJaw??probe.state.tools.right.jaw,bodyEnvelope:!!plan.traction.section},point.toArray(),previewDistance);
            blocked=c.minimum<.0001||c.solution.error>.00015||this._probeMove(probe,c.solution.position,'right');yield;if(blocked)break;
          }
          if(!blocked)for(const jaw of [0,plan.jawOpening*.5,plan.jawOpening]){const c=scissorsBodyClearance({...probe.state.tools.right,jaw:plan.anchorJaw??jaw,bodyEnvelope:!!plan.traction.section},rightEntry.toArray(),previewDistance);blocked=c.minimum<.0001;yield;if(blocked)break;}
        }else if(!blocked){blocked=moveBlade(rightEntry);yield;}
        // An adaptive liver route changes wrist orientation against the live
        // incision, so a frozen initial wrist cannot validate its later rows.
        // Every playback substep is still swept by that same CAD controller.
        for(let index=0;index<(plan.traction&&!frozenWrist?0:plan.path.length);index++){
          const point=plan.path[index];
          if(blocked)break;
          for(const air of plan.transfers[index]??[]){probe.setJaw('right',plan.jawOpening);blocked=moveBlade(displayed(air));yield;if(blocked)break;}
          if(blocked)break;
          for(const jaw of [0,plan.jawOpening]){probe.setJaw('right',jaw);if(Math.abs(probe.state.tools.right.jaw-jaw)>.03){blocked=true;break;}blocked=moveBlade(displayed(point));yield;if(blocked)break;}
        }
        if(!blocked)return {plan,leftRest,leftLift,leftLiftFinal,leftAway,rightStandby,leftStandby,tractionOffset,rightWrist,leftWrist};
      }catch{continue;}
    }
    return null;
  }

  _phase(name,message) {
    this.phase=name;this.phaseTime=0;
    if(name==='raster'&&this.plan?.unidirectional){this._rowRecovery=null;this._rowAirExit=null;this._rowAirExitDone=false;this._airTransferReady=false;this._rowReturnPoint=null;this._rowStartIndex=this.pathIndex;const t=this.sim.state.tools.right;this._rowJournal=[{position:[...t.position],wrist:[...t.wrist],jaw:t.jaw,alignment:[...t.alignment]}];this._rowReturn=null;this._rowReturnDone=false;}
    if(message)this.onMessage(message);
    this.onChange();
  }

  _displayReference(point) {
    return this.tissue.group.localToWorld((this.tissue.deformPoint?.(point)??point).clone());
  }

  _prepareRowReturn(){
    if(this._rowReturn&&!this._rowReturnDone)return;
    const recorded=(this._rowJournal??[]).slice(0,-1).reverse();
    // Withdraw closed scissors through their actual entry path. Replaying the
    // cutting bites used to reopen the jaws inside the flap during withdrawal.
    // Once closed, consecutive jaw-only samples describe the identical metal
    // pose and can be shared without changing any part of the spatial path.
    this._rowReturn=[];
    for(const source of recorded){
      const pose=this.plan?.anchorJaw===0?{...source,jaw:0}:source,last=this._rowReturn.at(-1);
      if(last&&['position','wrist','alignment'].every(key=>(last[key]??[]).length===(pose[key]??[]).length&&(last[key]??[]).every((v,i)=>Math.abs(v-pose[key][i])<1e-12))&&last.jaw===pose.jaw)continue;
      this._rowReturn.push(pose);
    }
    this._rowReturnIndex=0;this._rowReturnDone=false;
    const tool=this.sim.state.tools.right;
    this._rowRetreat=this.plan?.traction?.section?{wrist:canonicalScissorsWrist(tool,tool.alignment),alignment:[...tool.alignment]}:null;
  }

  _replayRowReturn(dt){
    this.sim.setCutting(false);let budget=dt;
    if(this._rowRecovery){
      const {index,target}=this._rowRecovery;
      if(new THREE.Vector3(...this._anchor(this.sim.state.tools.right)).distanceTo(target)<.0002){this._rowReturnIndex=index+1;this._rowRecovery=null;}
    }
    while(budget>1e-8){
      const recorded=this._rowReturn?.[this._rowReturnIndex??0];let pose=recorded?this._recordedPose(this.sim.state.tools.right,recorded):null;if(!pose){this._rowReturnDone=true;if(this._rowReturnPoint)this.pathPoint.copy(this._rowReturnPoint);else if(this._rowStartIndex!=null)this.pathPoint.copy(this.plan.path[this._rowStartIndex]);return false;}
      if(this._rowRetreat){
        // Keep the working articulation while following the actual blade entry
        // points. Rewinding every historical turn restored the initial crowded
        // posture at each row, forcing the same wrist search on the next row.
        const tool=this.sim.state.tools.right,target=new THREE.Vector3(...this._anchor({...tool,...recorded,jaw:0}));
        if(target.distanceTo(new THREE.Vector3(...this._anchor(tool)))<.00005){this._rowReturnIndex=(this._rowReturnIndex??0)+1;continue;}
        const command=this._poseCommand(tool,target.toArray(),this._rowRetreat.wrist,this._rowRetreat.alignment);
        if(command.error>.00015){this._rowRetreat=null;return true;}
        pose={...command,jaw:0};
      }
      const tool=this.sim.state.tools.right,start=structuredClone(tool),duration=Math.max(new THREE.Vector3(...start.position).distanceTo(new THREE.Vector3(...pose.position))/.05,...pose.wrist.map((v,i)=>Math.abs(v-start.wrist[i])/.9),Math.abs(pose.jaw-start.jaw)/1.5),fraction=Math.min(1,budget/Math.max(duration,1e-12));
      const n=Math.max(1,Math.ceil(Math.max(new THREE.Vector3(...start.position).distanceTo(new THREE.Vector3(...pose.position))*fraction/.0005,...pose.wrist.map((v,i)=>Math.abs(v-start.wrist[i])*fraction/.012))));
      for(let i=1;i<=n;i++){
        const t=fraction*i/n,next={position:start.position.map((v,a)=>THREE.MathUtils.lerp(v,pose.position[a],t)),wrist:start.wrist.map((v,a)=>THREE.MathUtils.lerp(v,pose.wrist[a],t)),jaw:THREE.MathUtils.lerp(start.jaw,pose.jaw,t)};
        if(!this._recordedBladeStep(this.sim,next)){
          if(this._rowRetreat){this._rowRetreat=null;return true;}
          if(this.plan?.traction?.section){
            const index=this._rowReturnIndex??0,attempts=this._rowRecovery?.index===index?this._rowRecovery.attempts+1:1;
            if(attempts<=3){
              const endpoint={...tool,...pose};endpoint.alignment=resolveInstrumentAlignment(endpoint,tool.alignment);
              const target=new THREE.Vector3(...this._anchor(endpoint));
              if(new THREE.Vector3(...this._anchor(tool)).distanceTo(target)<.0002){this._rowReturnIndex=index+1;return true;}
              // Rejoin the actual row entry in one continuously checked route,
              // rather than replanning every tiny obsolete in-place wrist pose.
              const entryIndex=this._rowReturn.length-1,entryPose=this._recordedPose(tool,this._rowReturn[entryIndex]),entry={...tool,...entryPose};
              entry.alignment=resolveInstrumentAlignment(entry,tool.alignment);
              const exitTarget=new THREE.Vector3(...this._anchor(entry));
              this._rowRecovery={index:entryIndex,target:exitTarget,attempts};
              this._bladeSteering={target:exitTarget,anchor:new THREE.Vector3(...this._anchor(tool)),frames:401,resumeCutting:false};
              this.onMessage('切面已变化，右剪正在重新检查退刀通道');return true;
            }
          }
          this.stop('已记录的退出路径受到组织或器械阻挡，已保持当前位置');return true;
        }this._rememberBlade();
      }
      budget-=Math.min(budget,duration);if(fraction>=1)this._rowReturnIndex=(this._rowReturnIndex??0)+1;else return true;
    }
    return true;
  }

  _withdrawRowToAir(dt){
    if(!this.plan.unidirectional||this._rowAirExitDone)return false;
    const tool=this.sim.state.tools.right,anchor=new THREE.Vector3(...this._anchor(tool));
    if(!this._rowAirExit){
      const outward=new THREE.Vector3(...tool.port).sub(anchor).normalize();
      this._rowAirExit=anchor.clone().addScaledVector(outward,.025);
    }
    const distance=anchor.distanceTo(this._rowAirExit);
    if(distance<.00003){this._rowAirExitDone=true;this.pathPoint.copy(this.tissue.toReferencePoint(this.tissue.group.worldToLocal(anchor)));return false;}
    this.sim.setCutting(false);
    this._moveBlade(anchor.lerp(this._rowAirExit,Math.min(1,.04*dt/distance)));
    return true;
  }

  _prepareAirTransfer(){
    if(!this.plan.unidirectional||this._airTransferReady)return;
    const entry=this._displayReference(this.plan.path[this._rowNextIndex]),port=new THREE.Vector3(...this.sim.state.tools.right.port),air=entry.clone().addScaledVector(port.sub(entry).normalize(),.025);
    this.pathPoint.copy(this.tissue.toReferencePoint(this.tissue.group.worldToLocal(new THREE.Vector3(...this._anchor(this.sim.state.tools.right)))));
    this._transferPath=[this.tissue.toReferencePoint(this.tissue.group.worldToLocal(air)),this.plan.path[this._rowNextIndex].clone()];
    this._transferIndex=0;this._airTransferReady=true;
  }

  _advanceTraction(){
    if(!this.leftLiftFinal||this.interaction.grasp?.kind!=='tissue')return false;
    const fraction=Math.floor(8*this.pathIndex/Math.max(1,this.plan.path.length-1))/8;
    const goal=this.leftLift.clone().lerp(this.leftLiftFinal,fraction),tool=this.sim.state.tools.left;
    const current=new THREE.Vector3(...tool.position),distance=current.distanceTo(goal);
    if(goal.clone().sub(current).dot(this.leftLiftFinal.clone().sub(this.leftLift))<=0)return false;
    if(distance<.00005||this._currentBladeGuard(this.sim.state.tools.right).bodyMinimum<.003)return false;
    // This uses the same swept source-CAD collision controller as manual input.
    const before=current.clone(),saved=structuredClone(tool);this.sim.moveToolTo(current.lerp(goal,Math.min(1,.001/distance)).toArray(),'left');
    if(before.distanceTo(new THREE.Vector3(...tool.position))<1e-7)return false;
    this.interaction.applyGrasp();
    const guard=this._currentBladeGuard(this.sim.state.tools.right);
    if(guard.minimum<0){this.sim.moveToolPose(saved,'left');this.interaction.applyGrasp();return false;}
    // Retain earlier escape poses. Each is revalidated against the current
    // deformed mesh before use, so a pull must not erase the only way back
    // through an already opened incision.
    this._rememberBlade();
    return true;
  }

  _openCompletedSection(dt){
    const grasp=this.interaction.grasp,section=grasp?.deformationSection;
    if(!section||grasp.kind!=='tissue')return false;
    const goal=this.plan.pattern==='area'?this.plan.areaFronts[this.pathIndex]:this.plan.path[Math.min(this.pathIndex+1,this.plan.path.length-1)].y;
    if(goal-section.front<1e-7)return false;
    const before=section.front;section.front+=Math.min(goal-section.front,.004*dt);this.interaction.applyGrasp();
    if(this._currentBladeGuard(this.sim.state.tools.right).minimum<0){section.front=before;this.interaction.applyGrasp();return false;}
    this._rememberBlade();return true;
  }

  _relieveBladeWithTraction(){
    if(!this.leftLiftFinal||this.interaction.grasp?.kind!=='tissue'||this.tissue.busy||this.interaction.cuttingBusy)return false;
    const tool=this.sim.state.tools.left,before=structuredClone(tool),from=new THREE.Vector3(...tool.position);
    const fraction=Math.min(1,this.pathIndex/Math.max(1,this.plan.path.length-1)+.65),goal=this.leftLift.clone().lerp(this.leftLiftFinal,fraction);
    const distance=from.distanceTo(goal);if(distance<.0001)return false;
    const baseline=this._currentBladeGuard(this.sim.state.tools.right),n=2;
    if(baseline.bodyMinimum<=0)return false;
    // Open an already cut cleft with the left clamp while holding the right
    // wrist still. Trial half-steps update the actual displayed mesh before
    // accepting a pull, so tension cannot push tissue onto the stationary body
    // or bring labelled target tissue into its blades. Nothing is cut here.
    const displacement=goal.clone().sub(from),directions=[displacement,new THREE.Vector3(displacement.x*.3,displacement.y,displacement.z),new THREE.Vector3(0,displacement.y,0)];
    let accepted=false;
    for(const direction of directions){
      if(direction.length()<.0001)continue;
      for(const length of [.0006,.0003,.00015,.000075]){
        const delta=direction.clone().setLength(Math.min(length,direction.length()));let clear=true;
        for(let i=1;i<=n;i++){
          const point=from.clone().addScaledVector(delta,i/n),moved=this.sim.moveToolTo(point.toArray(),'left');this.interaction.applyGrasp();
          const guard=this._currentBladeGuard(this.sim.state.tools.right);
          if(moved.limited||guard.bodyMinimum<=0||guard.lesionClearance<Math.min(0,baseline.lesionClearance)-1e-9){clear=false;break;}
        }
        if(clear){accepted=true;break;}
        if(this.sim.moveToolPose(before,'left').limited){this.stop('牵拉调整被器械接触阻挡，已停止示范');return false;}
        this.interaction.applyGrasp();
      }
      if(accepted)break;
    }
    if(!accepted)return false;
    if(this.plan.unidirectional&&this._currentBladeGuard(this.sim.state.tools.right).bodyMinimum>.005){
      const right=this.sim.state.tools.right;
      this._rowJournal=[{position:[...right.position],wrist:[...right.wrist],jaw:right.jaw,alignment:[...right.alignment]}];
      this._rowReturnPoint=this.tissue.toReferencePoint?.(this.tissue.group.worldToLocal(new THREE.Vector3(...this._anchor(right))))??null;
    }
    this._rememberBlade();
    const steering=this._bladeSteering;
    steering.target=this._displayReference(this.pathPoint);steering.clearanceTarget=steering.target.clone();
    steering.anchor=new THREE.Vector3(...this._anchor(this.sim.state.tools.right));steering.frames=0;steering.relieveTraction=true;
    return true;
  }

  _beginFragmentMove(){
    if(!this._confirmTarget())return;
    this.sim.setCutting(false);this._acceptFragmentRoute(runImmediately(this._fragmentRouteSteps()));
  }
  _confirmTarget(){
    const status=this.tissue.pathology;
    if(this.tissue.caseDefinition?.lesion&&(!status||status.attachedMm3>0||status.detachedMm3<=0)){this.stop('目标组织尚未完整切离，示范已停止，不会将局部碎片当作完成');return false;}
    return true;
  }
  async _beginFragmentMoveAsync(options={}){
    if(!this._confirmTarget())return false;
    this.sim.setCutting(false);const token=this._planningToken=(this._planningToken??0)+1,epoch=this.tissue._epoch,held=this.interaction.grasp?.fragmentId,tools=JSON.stringify(this.sim.state.tools);
    this.mode='planning';this.phase='planning-move';this.phaseTime=0;
    const valid=()=>this.active&&this._planningToken===token&&this.tissue._epoch===epoch&&this.interaction.grasp?.fragmentId===held&&JSON.stringify(this.sim.state.tools)===tools;
    try{
      const result=await runCooperatively(this._fragmentRouteSteps(),{yieldFrame:yieldDemoTask,...options,valid});
      if(result.cancelled||!valid()){if(this._planningToken===token)this.stop('移开路径准备已取消，标本仍由实际夹持状态决定');return false;}
      this.fragmentRouteTimings=result.stats;this.mode='example';this._acceptFragmentRoute(result.value);return !!result.value;
    }catch(error){if(this._planningToken===token)this.stop('移开路径准备未完成，请手动退出右剪');throw error;}
  }
  *_fragmentRouteSteps(){
    const snapshot=this.sim.snapshot();
    this.rightRetractStart=new THREE.Vector3(...this.sim.state.tools.right.position);
    const left=new THREE.Vector3(...this.sim.state.tools.left.position),up=new THREE.Vector3(0,1,0);
    const withdrawal=new THREE.Vector3(...this.sim.state.tools.right.port).sub(this.rightRetractStart).normalize();
    const rightCandidates=[.05,.08,.03,.12].map(distance=>this.rightRetractStart.clone().addScaledVector(withdrawal,distance));
    const leftCandidates=[this.leftAway,
      left.clone().addScaledVector(this.plan.worldNormal,.02).addScaledVector(up,.05),
      left.clone().addScaledVector(this.plan.worldNormal,.06).addScaledVector(up,.045)];
    let route=null;
    for(const rightTarget of rightCandidates){
      for(const leftTarget of leftCandidates){
        const probe=new this.sim.constructor();probe.restore(snapshot);probe.setPaused(false);yield;
        const rightBlocked=yield* probeToolMoveSteps(probe,rightTarget,'right',(p,target,side)=>this._probeMove(p,target,side));if(rightBlocked)continue;
        probe.setJaw('right',.75);yield;
        if(probe.state.tools.right.jaw<.7)continue;
        const leftBlocked=yield* probeToolMoveSteps(probe,leftTarget,'left');if(leftBlocked)continue;
        route={rightTarget,leftTarget};break;
      }
      if(route)break;
    }
    return route;
  }
  _acceptFragmentRoute(route){
    if(!route){this.stop('独立组织块已切离并仍由左钳夹持，但没有通过双器械防碰撞的自动移开路径，请手动退出右剪');return;}
    this.rightRetractEnd=route.rightTarget;this.leftAway=route.leftTarget;
    this._phase('retract','基底已真正断开：独立组织块仍在左钳上，先退出右剪再移开');
  }

  update(dt) {
    if (!this.active || this.sim.state.paused) return;
    if(this._rowRecovery&&this._bladeSteering&&new THREE.Vector3(...this._anchor(this.sim.state.tools.right)).distanceTo(this._rowRecovery.target)<.0002){
      // Already at this non-cutting return waypoint. Keep the current safe
      // articulation rather than forcing an obsolete in-place historical turn.
      this._planningToken++;this.wristPlanner?.cancel();this._bladeSteering=null;this.mode='example';
    }
    if(this.phase==='row-transfer'&&this.plan?.unidirectional&&this._rowReturnDone&&!this._rowAirExit&&this._bladeSteering){
      this._planningToken++;this._bladeSteering=null;this.mode='example';
    }
    if(this.mode==='planning'&&this.phase!=='planning-move'&&this.interaction.grasp?.kind==='fragment'&&['raster','row-transfer','close-right','wait-separation'].includes(this.phase)){this._planningToken++;this._bladeSteering=null;this.mode='example';}
    if(this.mode==='planning')return;
    if(this._bladeSteering){this._steerBlade(dt);return;}
    this.time += dt;
    if (this.mode === 'approach') {
      if(this._bleedingKey){
        const source=this.tissue.blood?.nodes.find(n=>n.key===this._bleedingKey&&n.fragmentId==null&&n.injured);
        if(!source){this.stop('目标切面已改变，请重新选择渗血切面');return;}
        if(this._pressureAligning){
          const current=new THREE.Vector3(...this.sim.state.tools.right.position),target=this.interaction.pressureApproachTarget(source),distance=current.distanceTo(target);
          if(distance<=.0003){this.active=false;this.onMessage('已闭合接近渗血切面：按住 H 局部压迫，松开后检查是否再渗血');this.onChange();return;}
          if(this.time>3){this.stop('切面就位尚未收敛，请稳定组织后重新就位或手动贴近');return;}
          this.move(current.lerp(target,Math.min(1,.012*dt/distance)).toArray(),'right');return;
        }
        // Execute the same straight waypoints that passed the CAD sweep.
        // Correct blade/RCM offset only after arrival, through guarded small steps.
        this.end=this._pressureWaypoints[this._pressureWaypoint];
      }
      if(this.approachFragment){
        const piece=this.tissue.getFragment?.(this.approachFragment.id);
        if(!piece||piece.held){this.stop('目标标本已不存在或已被夹持，接近操作已停止');return;}
        const normal=this.approachFragment.normal.clone().applyQuaternion(piece.quaternion).normalize();
        this.end=this.tissue.group.localToWorld(this.approachFragment.anchor.clone().applyQuaternion(piece.quaternion).add(piece.position).addScaledVector(normal,.0007));
      }
      if (!this.move(this.start.clone().lerp(this.end, smooth(Math.min(1, this.time / 1.1))).toArray(), this.side)) return;
      if(this.time>=1.1&&this._bleedingKey&&this._pressureWaypoint<this._pressureWaypoints.length-1){this._pressureWaypoint++;this.start=new THREE.Vector3(...this.sim.state.tools.right.position);this.time=0;return;}
      if(this.time>=1.1&&this._bleedingKey){this._pressureAligning=true;return;}
      if (this.time >= 1.1) { this.active = false;if(this.side==='right'&&!this._bleedingKey)this.sim.setCutting(true); this.onMessage(this._bleedingKey?'已闭合接近渗血切面：按住 H 局部压迫，松开后检查是否再渗血':this.approachFragment?'已接近独立标本表面：按 C 闭合重抓，随后可移动或旋转':'已贴近组织表面：C 闭合，E 抬起；右剪 C 闭合即可剪切'); this.onChange(); }
      return;
    }
    if(['close-right','area-cut','raster','row-transfer','wait-separation'].includes(this.phase)&&this.interaction.grasp?.kind==='fragment'){
      if(this.plan.unidirectional&&!this._rowReturnDone&&this._rowJournal?.length>1){this.sim.setCutting(false);this._prepareRowReturn();this._phase('return-cut','连接已切断：右剪先沿进刀路径退出，再由左钳移开标本');return;}
      this.planningTask=this._beginFragmentMoveAsync();void this.planningTask.catch(error=>console.error(error));return;
    }
    this.phaseTime+=dt;
    const progress=seconds=>smooth(Math.min(1,this.phaseTime/seconds));
    if(this.phase==='park'){
      if(!this.move(this.rightStart.clone().lerp(this.rightStandby,progress(1.1)).toArray(),'right'))return;
      if(this.phaseTime>=1.1)this._phase(this.rightWrist?'orient-right':this.leftWrist?'park-left':'approach-left');
    }else if(this.phase==='orient-right'){
      const tool=this.sim.state.tools.right;let complete=true;
      for(let axis=0;axis<3;axis++){
        const change=THREE.MathUtils.clamp(this.rightWrist[axis]-tool.wrist[axis],-.8*dt,.8*dt),before=tool.wrist[axis];
        if(Math.abs(change)>1e-8){this.sim.adjustWrist(axis,change,'right');if(Math.abs(tool.wrist[axis]-before-change)>.0001){this.stop('右剪准备转腕时受到另一器械阻挡，已保持当前位置');return;}}
        if(Math.abs(tool.wrist[axis]-this.rightWrist[axis])>.0001)complete=false;
      }
      if(complete)this._phase(this.leftWrist?'park-left':'approach-left');
    }else if(this.phase==='park-left'){
      if(!this.move(this.leftStart.clone().lerp(this.leftStandby,progress(1)).toArray(),'left'))return;
      if(this.phaseTime>=1){this.leftStart=this.leftStandby.clone();this._phase('orient-left','左钳调整持械角度，留出右剪的操作通道');}
    }else if(this.phase==='orient-left'){
      const tool=this.sim.state.tools.left;let complete=true;
      for(let axis=0;axis<3;axis++){
        const change=THREE.MathUtils.clamp(this.leftWrist[axis]-tool.wrist[axis],-.8*dt,.8*dt),before=tool.wrist[axis];
        if(Math.abs(change)>1e-8){this.sim.adjustWrist(axis,change,'left');if(Math.abs(tool.wrist[axis]-before-change)>.0001){this.stop('左钳持械角度受到另一器械阻挡，已保持当前位置');return;}}
        if(Math.abs(tool.wrist[axis]-this.leftWrist[axis])>.0001)complete=false;
      }
      if(complete)this._phase('approach-left');
    }else if(this.phase==='approach-left'){
      if(!this.move(this.leftStart.clone().lerp(this.leftRest,progress(1.2)).toArray(),'left'))return;
      if(this.phaseTime>=1.2)this._phase('close-left','左钳正在夹住实际薄缘表面');
    }else if(this.phase==='close-left'){
      this.sim.setJaw('left',.75*(1-progress(.6)));
      if(this.phaseTime>=.7&&this.interaction.grasp?.kind==='tissue'){
        if(this.plan.traction){this.interaction.grasp.deformationRadius=this.plan.traction.radius;this.interaction.grasp.deformationCoreRadius=this.plan.traction.coreRadius;this.interaction.grasp.deformationSection=structuredClone(this.plan.traction.section);}
        this._phase('lift',this.plan.pattern==='area'?'左钳牵开目标连接面，右剪准备宽幅切离':'左钳牵开目标组织，右剪逐层剪断连接');
      }
      else if(this.phaseTime>1.3)this.stop('未成功抓住附着组织，示范已停止；请重置或重新表面就位');
    }else if(this.phase==='lift'){
      if(!this.move(this.leftRest.clone().lerp(this.leftLift,progress(1.5)).toArray(),'left'))return;
      if(this.phaseTime>=1.5){this.rightBeforeCut=new THREE.Vector3(...this.sim.state.tools.right.position);this._entryAnchorStart=new THREE.Vector3(...this._anchor(this.sim.state.tools.right));this._entryCommand=new THREE.Vector3(...this._target(this.sim.state.tools.right,this._displayReference(this.plan.path[0]).toArray()).position);this._phase('approach-cut');}
    }else if(this.phase==='approach-cut'){
      if(this.plan.traction){if(!this._moveBlade(this._entryAnchorStart.clone().lerp(this._displayReference(this.plan.path[0]),progress(1.2))))return;}
      else if(!this.move(this.rightBeforeCut.clone().lerp(this._entryCommand,progress(1.2)).toArray(),'right'))return;
      if(this.phaseTime>=1.2){this.sim.setScopeFollow(true,this._demoScopeMode??'active');this.sim.setCutting(true);this._phase('close-right',this.plan.pattern==='area'?'右剪已贴近切缘，闭合进行区域辅助切离':'右剪已贴近切缘，开合剪切并逐层推进');}
    }else if(this.phase==='close-right'){
      this.sim.setJaw('right',this.plan.jawOpening*(1-progress(.6)));
      if(!this._moveBlade(this._displayReference(this.pathPoint)))return;
      if(this.phaseTime>=.7){this._biteTime=0;this._phase(this.plan.pattern==='area'?'area-cut':'raster');}
    }else if(this.phase==='area-cut'){
      if(this._areaQueuedIndex!==this.pathIndex){
        const opening=.12,closing=.24,t=this.phaseTime;
        this.sim.setJaw('right',t<opening?this.plan.jawOpening*smooth(t/opening):this.plan.jawOpening*(1-smooth(THREE.MathUtils.clamp((t-opening)/closing,0,1))));
        if(t<opening+closing||this.tissue.busy||this.interaction.cuttingBusy)return;
        const segments=this.plan.areaBands[this.pathIndex].map(s=>({a:this.tissue.deformPoint(s.a),b:this.tissue.deformPoint(s.b)}));
        if(!this.interaction.queueRegionCut(segments))return;
        this._areaQueuedIndex=this.pathIndex;this.sim.setCutting(false);return;
      }
      if(this.tissue.busy||this.interaction.cuttingBusy)return;
      if(!this.plan.path[this.pathIndex+1]){this._phase('wait-separation','连接面已区域切开，正在确认真实组织分离');return;}
      this._transferPath=this.plan.transfers[this.pathIndex+1];this._transferIndex=0;this._rowNextIndex=this.pathIndex+1;this._phase('row-transfer');
    }else if(this.phase==='raster'){
      // Preserve the real continuous CAD path in the bounded input queue.
      // Waiting for every single mesh reply prevented adjacent shear samples
      // from sharing a worker rebuild and visibly stopped the scissors.
      if(this._biteWaiting){
        if(this.tissue.busy||this.interaction.cuttingBusy)return;
        if(this._strokeEnd){
          this._strokeEnd=false;
          if(!this.plan.path[this.pathIndex+1]){this._phase('wait-separation','基底扫描完成，正在确认真实体积连通性');return;}
          this._transferPath=this.plan.transfers[this.pathIndex+1];this._transferIndex=0;this._rowNextIndex=this.pathIndex+1;this._phase('row-transfer');return;
        }
        this._biteWaiting=false;this._biteFinal=false;this._biteTime=0;this.sim.setCutting(true);
      }
      if((this.interaction.contact?.pendingCutSamples??0)>12||(this.interaction.contact?.cutBacklogMm??0)>(this.plan.cutRadius??CUT_RADIUS)*2000)return;
      const bite=this.plan.bite??{opening:.16,closing:.30,speed:.028,maxStep:.00085},duration=bite.opening+bite.closing;
      this._biteTime=(this._biteTime??0)+dt;
      if(this._biteTime>=duration){
        if(!this._biteFinal){this.sim.setJaw('right',0);this._biteFinal=true;this._moveBlade(this._displayReference(this.pathPoint));return;}
        this.sim.setCutting(false);this._biteWaiting=true;return;
      }
      const cycle=this._biteTime,opening=cycle<bite.opening;
      this.sim.setJaw('right',opening ? this.plan.jawOpening*smooth(cycle/bite.opening) : this.plan.jawOpening*(1-smooth((cycle-bite.opening)/bite.closing)));
      // Opening retracts the two real curved blade ends slightly. Keep the
      // instrument body still, instead of advancing the whole wrist merely
      // to hold that changing midpoint at the cutting coordinate.
      if(opening||cycle<=bite.opening+1e-10)return;
      const next=this.plan.path[this.pathIndex+1];
      if(!next||this.plan.transfers[this.pathIndex+1]){this._strokeEnd=true;this._moveBlade(this._displayReference(this.pathPoint));return;}
      let budget=Math.min(bite.maxStep,bite.speed*dt);
      while(budget>1e-10){const point=this.plan.path[this.pathIndex+1];if(!point||this.plan.transfers[this.pathIndex+1])break;const distance=this.pathPoint.distanceTo(point),step=Math.min(budget,distance);if(distance>1e-10)this.pathPoint.lerp(point,step/distance);this.rasterTravel+=step;budget-=step;if(distance<=step+1e-10)this.pathIndex++;else break;}
      if(!this._moveBlade(this._displayReference(this.pathPoint)))return;
    }else if(this.phase==='row-transfer'){
      if(this.tissue.busy||this.interaction.cuttingBusy)return;
      if(this.plan.unidirectional&&!this._rowReturnDone){this._prepareRowReturn();if(this._replayRowReturn(dt))return;}
      if(this._withdrawRowToAir(dt))return;
      if(this._openCompletedSection(dt))return;
      if(this._advanceTraction())return;
      this._prepareAirTransfer();
      this.sim.setJaw('right',this.plan.traction?.section?0:this.plan.jawOpening);const next=this._transferPath[this._transferIndex];
      if(!next){this.pathIndex=this._rowNextIndex;this.pathPoint.copy(this.plan.path[this.pathIndex]);this._biteTime=0;this._biteWaiting=false;this._biteFinal=false;this.sim.setCutting(true);this._phase(this.plan.pattern==='area'?'area-cut':'raster');return;}
      let budget=Math.min(.0015,.05*dt);
      while(budget>1e-10){const point=this._transferPath[this._transferIndex];if(!point)break;const distance=this.pathPoint.distanceTo(point),step=Math.min(distance,budget);if(distance>1e-10)this.pathPoint.lerp(point,step/distance);budget-=step;if(distance<=step+1e-10)this._transferIndex++;else break;}
      if(!this._moveBlade(this._displayReference(this.pathPoint)))return;
    }else if(this.phase==='return-cut'){
      if(this.tissue.busy||this.interaction.cuttingBusy)return;
      if(this._replayRowReturn(dt))return;
      this.planningTask=this._beginFragmentMoveAsync();void this.planningTask.catch(error=>console.error(error));
    }else if(this.phase==='wait-separation'){
      if(!this.tissue.busy&&!this.interaction.cuttingBusy&&this.phaseTime>2)
        this.stop('扫描后该处组织仍相连，未生成独立块；示范已停止，可继续补切或撤销');
      else if(this.phaseTime>12)this.stop('组织拓扑更新尚未完成，未宣称切离成功；请等待后检查');
    }else if(this.phase==='retract'){
      if(!this.move(this.rightRetractStart.clone().lerp(this.rightRetractEnd,progress(1)).toArray(),'right'))return;
      if(this.phaseTime>=1){this.sim.setJaw('right',.75);this.fragmentMoveStart=new THREE.Vector3(...this.sim.state.tools.left.position);this._demoRoll=0;this._phase('move-fragment','左钳正在搬走并旋转真实切离块，母体已独立回弹');}
    }else if(this.phase==='move-fragment'){
      const t=progress(2.2);
      if(!this.move(this.fragmentMoveStart.clone().lerp(this.leftAway,t).toArray(),'left'))return;
      const roll=t*Math.PI*.65;this.sim.adjustWrist(2,roll-this._demoRoll,'left');this._demoRoll=roll;
      if(this.phaseTime>=2.2){this.sim.select('left');this.stop('切离确认完成：左钳夹持的独立组织块已移开并旋转，V 可松开放下；可撤销或重置');}
    }
  }
}
