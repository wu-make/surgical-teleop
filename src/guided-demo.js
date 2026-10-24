import * as THREE from 'three';
import { surfacePose,CUT_RADIUS } from './interaction-controller.js';
import { deformPoint as materialDisplay, normalizeDeformation } from './tissue-worker.js';
import {runCooperatively,runImmediately} from './cooperative-work.js';

const smooth = value => value * value * (3 - 2 * value);
const defaults = { left: [-.025, 1.106, -.015], right: [.025, 1.108, -.015] };

/** Plan a complete peripheral-cap basal section from the actual remaining SDF.
 * The raster covers the whole occupied cross-section, rather than drawing one
 * groove and pretending it detached. Returned positions are material coordinates.
 */
export function planPeripheralResections(tissue, {depth=.012,cutRadius=CUT_RADIUS}={}) {
  return runImmediately(planPeripheralResectionSteps(tissue,{depth,cutRadius}));
}

export function* planPeripheralResectionSteps(tissue, {depth=.012,cutRadius=CUT_RADIUS}={}) {
  if(!tissue.queryReferenceDistance||!tissue.metadata)return [];
  const meta=tissue.metadata,spacing=Math.max(...meta.spacing),step=Math.min(cutRadius*1.45,Math.max(.0025,spacing*1.8));
  const bounds=meta.bounds??[meta.origin.map(v=>v+spacing*2),meta.origin.map((v,i)=>v+(meta.dims[i]-3)*meta.spacing[i])];
  const query=point=>tissue.queryReferenceDistance(new THREE.Vector3(...point));
  const plans=[];
  for(let axis=0;axis<3;axis++)for(const sign of [-1,1]){
    const tangents=[0,1,2].filter(i=>i!==axis),extreme=bounds[sign>0?1:0][axis],plane=extreme-sign*depth;
    const inside=[];
    let lowU=Infinity,highU=-Infinity,lowV=Infinity,highV=-Infinity;
    for(let v=bounds[0][tangents[1]]-step;v<=bounds[1][tangents[1]]+step;v+=step){
      for(let u=bounds[0][tangents[0]]-step;u<=bounds[1][tangents[0]]+step;u+=step){
        const point=[0,0,0];point[axis]=plane;point[tangents[0]]=u;point[tangents[1]]=v;
        const distance=query(point);
        if(distance<=cutRadius){lowU=Math.min(lowU,u);highU=Math.max(highU,u);lowV=Math.min(lowV,v);highV=Math.max(highV,v);}
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
    if(!anchor||sign*(anchor[axis]-plane)<cutRadius*2+spacing)continue;
    const normal=new THREE.Vector3().setComponent(axis,sign);
    const worldNormal=normal.clone().applyQuaternion(tissue.group.getWorldQuaternion(new THREE.Quaternion())).normalize();
    // Include a complete ring outside the SDF cross-section. Adjacent kerfs
    // overlap, so diagonal voxel bridges cannot be silently left between rows.
    lowU-=cutRadius*1.5;highU+=cutRadius*1.5;lowV-=cutRadius*1.5;highV+=cutRadius*1.5;
    const rows=Math.max(2,Math.ceil((highV-lowV)/step)+1),path=[];
    for(let row=0;row<rows;row++){
      const v=lowV+(highV-lowV)*row/(rows-1);
      for(const u of row%2?[highU,lowU]:[lowU,highU]){
        const point=[0,0,0];point[axis]=plane;point[tangents[0]]=u;point[tangents[1]]=v;path.push(new THREE.Vector3(...point));
      }
    }
    const length=path.slice(1).reduce((sum,p,i)=>sum+p.distanceTo(path[i]),0);
    if(length>2.8)continue;
    plans.push({axis,sign,plane,normal,worldNormal,referenceAnchor:new THREE.Vector3(...anchor),path,cutRadius,
      rowSpacing:(highV-lowV)/(rows-1),length,score:length*(worldNormal.y<-.25?1.5:1)});
  }
  return plans.sort((a,b)=>a.score-b.score);
}

/** An actual controller/tissue operation example. It contains no baked geometry. */
export class GuidedDemo {
  constructor(sim, tissue, interaction, { onMessage = () => {}, onChange = () => {} } = {}) {
    Object.assign(this, { sim, tissue, interaction, onMessage, onChange });
    this.active = false;
    this.mode = null;
  }

  stop(message = '已结束自动操作，可继续手动控制') {
    this._planningToken=(this._planningToken??0)+1;
    if (!this.active) return;
    this.active = false;
    this.sim.setCutting(false);
    this.interaction.breakCutTrajectory?.();
    this.interaction.lastCut = null;
    this.onChange();
    if (message) this.onMessage(message);
  }

  move(position, side) {
    const result = this.sim.moveToolTo(position, side);
    if (result.limited) {
      this.stop('自动路径被另一器械挡住；请先移开另一器械，再重新就位');
      return false;
    }
    return true;
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
    this.approachFragment=null;this._bleedingKey=null;
    this.start = new THREE.Vector3(...tool.position);
    this.end = surface.point.addScaledVector(surface.normal, .001);
    this.onMessage(`${side === 'left' ? '左钳' : '右剪'}正在贴近实际肝表面`);
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
    this._bleedingKey=null;
    this.start=new THREE.Vector3(...tool.position);
    this.approachFragment={id:piece.id,anchor:surface.clone().sub(piece.position).applyQuaternion(inverse),normal:normal.applyQuaternion(inverse)};
    this.end=this.tissue.group.localToWorld(surface.clone());
    this.onMessage('左钳正在接近最近的独立标本，标本移动时目标会随动；就位后按 C 重抓');
    this.onChange();return true;
  }

  approachBleeding(){
    if(this.sim.state.paused||this.tissue.busy||this.interaction.cuttingBusy){this.onMessage('请先继续仿真并等待组织更新完成');return false;}
    const tool=this.sim.state.tools.right,point=this.tissue.group.worldToLocal(new THREE.Vector3(...tool.position));
    const sources=(this.tissue.blood?.nodes??[]).filter(n=>n.cut&&n.injured&&n.fragmentId==null&&n.clot<.95&&n.display);
    sources.sort((a,b)=>a.display.distanceToSquared(point)-b.display.distanceToSquared(point));
    const source=sources[0];if(!source){this.onMessage('当前没有可接近的开放渗血切面');return false;}
    this.sim.checkpoint('右端接近渗血切面',()=>this.interaction.snapshot({forHistory:true}),{takeOwnership:true});this.sim.select('right');this.sim.setCutting(false);this.sim.setJaw('right',0);
    this.mode='approach';this.active=true;this.time=0;this.side='right';this.approachFragment=null;this._bleedingKey=source.key;
    this.start=new THREE.Vector3(...tool.position);this.end=this.interaction.pressureApproachTarget(source);
    this.onMessage('右端已闭合，正在以实际剪刃接近渗血切面；就位后按住 H 局部压迫');this.onChange();return true;
  }

  startExample() {
    if (this.active) { this.stop(); return; }
    if(this.tissue.busy||this.interaction.cuttingBusy){this.onMessage('组织更新中，请稍候再开始示范');return;}
    const plans=planPeripheralResections(this.tissue);
    let prepared=null;
    for(const plan of plans){prepared=this._preparePlan(plan);if(prepared)break;}
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
      const plans=yield* planPeripheralResectionSteps(self.tissue);
      for(const plan of plans){const prepared=yield* self._preparePlanSteps(plan);if(prepared)return prepared;}
      return null;
    }
    try{
      const result=await runCooperatively(prepare(),{...options,valid});if(this._planningToken===token)this.planningTimings=result.stats;
      if(result.cancelled||!valid()){if(this._planningToken===token)this.stop('路径准备已取消：场景或操作状态发生改变');return false;}
      if(!result.value){this.stop('当前器官没有可安全到达的薄缘切离路径；请移开器械或重置完整器官后重试');return false;}
      this._startPrepared(result.value);return true;
    }catch(error){if(this._planningToken===token)this.stop('路径准备未完成，可重新开始');throw error;}
  }

  _startPrepared(prepared){
    Object.assign(this,prepared);
    this.sim.checkpoint('真实切离、夹持与移开示范', ()=>this.interaction.snapshot({forHistory:true}),{takeOwnership:true});
    this.interaction.release(true);
    this.sim.setCutting(false);
    this.sim.setPaused(false);
    this.sim.select('right');
    this.sim.setScopeFollow(true, 'grasp');
    this.leftStart = new THREE.Vector3(...this.sim.state.tools.left.position);
    this.rightStart = new THREE.Vector3(...this.sim.state.tools.right.position);
    this.sim.setJaw('left', .75); this.sim.setJaw('right', .85);
    this.active = true; this.mode = 'example'; this.time = 0; this.phaseTime=0;this.phase='park';
    this.pathIndex=0;this.pathPoint=this.plan.path[0].clone();this.rasterTravel=0;
    this.onMessage('切离示范：抓持器官薄缘 → 实际栅格切断基底 → 确认独立组织块后移开');
    this.onChange();
  }

  _preparePlan(plan) {
    return runImmediately(this._preparePlanSteps(plan));
  }

  *_preparePlanSteps(plan) {
    const world=point=>this.tissue.group.localToWorld(point.clone());
    const surface=world(plan.referenceAnchor),up=new THREE.Vector3(0,1,0);
    const leftRest=surface.clone().addScaledVector(plan.worldNormal,.0006);
    const leftLift=leftRest.clone().addScaledVector(plan.worldNormal,.022).addScaledVector(up,.012);
    const leftAway=leftLift.clone().addScaledVector(plan.worldNormal,.045).addScaledVector(up,.025);
    const delta=this.tissue.group.worldToLocal(leftLift.clone()).sub(plan.referenceAnchor);
    const preview=normalizeDeformation({model:'local-flow',local:plan.referenceAnchor.toArray(),displacement:delta.toArray()});
    const displayed=point=>world(new THREE.Vector3(...materialDisplay(point.toArray(),preview)));
    const rightEntry=displayed(plan.path[0]);
    const standbyCandidates=[new THREE.Vector3(...this.sim.state.tools.right.position),
      rightEntry.clone().addScaledVector(plan.worldNormal,.035).addScaledVector(up,.018),
      rightEntry.clone().addScaledVector(plan.worldNormal,.07).addScaledVector(up,.05)];
    // Probe the exact public collision controller before selecting a plan. This
    // never rewrites scene state or bypasses a blocked instrument during playback.
    for(const rightStandby of standbyCandidates){
      try{
        const probe=new this.sim.constructor();probe.restore(this.sim.snapshot());probe.setPaused(false);
        probe.setJaw('left',.75);probe.setJaw('right',.85);
        let blocked=probe.moveToolTo(rightStandby.toArray(),'right').limited;yield;
        if(!blocked){blocked=probe.moveToolTo(leftRest.toArray(),'left').limited;yield;}
        probe.setJaw('left',0);yield;
        if(!blocked){blocked=probe.moveToolTo(leftLift.toArray(),'left').limited;yield;}
        if(!blocked){blocked=probe.moveToolTo(rightEntry.toArray(),'right').limited;yield;}
        probe.setJaw('right',0);yield;
        for(const point of plan.path){if(blocked)break;blocked=probe.moveToolTo(displayed(point).toArray(),'right').limited;yield;if(blocked)break;}
        if(!blocked)return {plan,leftRest,leftLift,leftAway,rightStandby};
      }catch{continue;}
    }
    return null;
  }

  _phase(name,message) {
    this.phase=name;this.phaseTime=0;
    if(message)this.onMessage(message);
    this.onChange();
  }

  _displayReference(point) {
    return this.tissue.group.localToWorld((this.tissue.deformPoint?.(point)??point).clone());
  }

  _beginFragmentMove(){
    this.sim.setCutting(false);this._acceptFragmentRoute(runImmediately(this._fragmentRouteSteps()));
  }
  async _beginFragmentMoveAsync(options={}){
    this.sim.setCutting(false);const token=this._planningToken=(this._planningToken??0)+1,epoch=this.tissue._epoch,held=this.interaction.grasp?.fragmentId,tools=JSON.stringify(this.sim.state.tools);
    this.mode='planning';this.phase='planning-move';this.phaseTime=0;
    const valid=()=>this.active&&this._planningToken===token&&this.tissue._epoch===epoch&&this.interaction.grasp?.fragmentId===held&&JSON.stringify(this.sim.state.tools)===tools;
    try{
      const result=await runCooperatively(this._fragmentRouteSteps(),{...options,valid});
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
        const rightBlocked=probe.moveToolTo(rightTarget.toArray(),'right').limited;yield;if(rightBlocked)continue;
        probe.setJaw('right',.75);yield;
        if(probe.state.tools.right.jaw<.7)continue;
        const leftBlocked=probe.moveToolTo(leftTarget.toArray(),'left').limited;yield;if(leftBlocked)continue;
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
    if(this.mode==='planning')return;
    this.time += dt;
    if (this.mode === 'approach') {
      if(this._bleedingKey){
        const source=this.tissue.blood?.nodes.find(n=>n.key===this._bleedingKey&&n.fragmentId==null&&n.injured);
        if(!source){this.stop('目标切面已改变，请重新选择渗血切面');return;}
        this.end=this.interaction.pressureApproachTarget(source);
      }
      if(this.approachFragment){
        const piece=this.tissue.getFragment?.(this.approachFragment.id);
        if(!piece||piece.held){this.stop('目标标本已不存在或已被夹持，接近操作已停止');return;}
        const normal=this.approachFragment.normal.clone().applyQuaternion(piece.quaternion).normalize();
        this.end=this.tissue.group.localToWorld(this.approachFragment.anchor.clone().applyQuaternion(piece.quaternion).add(piece.position).addScaledVector(normal,.0007));
      }
      if (!this.move(this.start.clone().lerp(this.end, smooth(Math.min(1, this.time / 1.1))).toArray(), this.side)) return;
      if (this.time >= 1.1) { this.active = false;if(this.side==='right'&&!this._bleedingKey)this.sim.setCutting(true); this.onMessage(this._bleedingKey?'已闭合接近渗血切面：按住 H 局部压迫，松开后检查是否再渗血':this.approachFragment?'已接近独立标本表面：按 C 闭合重抓，随后可移动或旋转':'已贴近组织表面：C 闭合，E 抬起；右剪 C 闭合即可剪切'); this.onChange(); }
      return;
    }
    if(['close-right','raster','wait-separation'].includes(this.phase)&&this.interaction.grasp?.kind==='fragment'){
      void this._beginFragmentMoveAsync().catch(error=>console.error(error));return;
    }
    this.phaseTime+=dt;
    const progress=seconds=>smooth(Math.min(1,this.phaseTime/seconds));
    if(this.phase==='park'){
      if(!this.move(this.rightStart.clone().lerp(this.rightStandby,progress(1.1)).toArray(),'right'))return;
      if(this.phaseTime>=1.1)this._phase('approach-left');
    }else if(this.phase==='approach-left'){
      if(!this.move(this.leftStart.clone().lerp(this.leftRest,progress(1.2)).toArray(),'left'))return;
      if(this.phaseTime>=1.2)this._phase('close-left','左钳正在夹住实际薄缘表面');
    }else if(this.phase==='close-left'){
      this.sim.setJaw('left',.75*(1-progress(.6)));
      if(this.phaseTime>=.7&&this.interaction.grasp?.kind==='tissue')this._phase('lift','左钳牵拉薄缘，右剪将完整扫过其基底');
      else if(this.phaseTime>1.3)this.stop('未成功抓住附着组织，示范已停止；请重置或重新表面就位');
    }else if(this.phase==='lift'){
      if(!this.move(this.leftRest.clone().lerp(this.leftLift,progress(1.5)).toArray(),'left'))return;
      if(this.phaseTime>=1.5){this.rightBeforeCut=new THREE.Vector3(...this.sim.state.tools.right.position);this._phase('approach-cut');}
    }else if(this.phase==='approach-cut'){
      if(!this.move(this.rightBeforeCut.clone().lerp(this._displayReference(this.plan.path[0]),progress(1.2)).toArray(),'right'))return;
      if(this.phaseTime>=1.2){this.sim.setCutting(true);this._phase('close-right','右剪闭合，实际扫切完整基底平面；不会用模型替换制造组织块');}
    }else if(this.phase==='close-right'){
      this.sim.setJaw('right',.85*(1-progress(.6)));
      if(this.phaseTime>=.7)this._phase('raster');
    }else if(this.phase==='raster'){
      // Preserve the real continuous CAD path in the bounded input queue.
      // Waiting for every single mesh reply prevented adjacent shear samples
      // from sharing a worker rebuild and visibly stopped the scissors.
      if((this.interaction.contact?.pendingCutSamples??0)>12||(this.interaction.contact?.cutBacklogMm??0)>CUT_RADIUS*2000)return;
      const next=this.plan.path[this.pathIndex+1];
      if(!next){this.sim.setCutting(false);this.sim.setJaw('right',.7);this._phase('wait-separation','基底扫描完成，正在确认真实体素连通性');return;}
      const remaining=this.pathPoint.distanceTo(next),step=Math.min(.00085,.028*dt,remaining);
      if(remaining>1e-10)this.pathPoint.lerp(next,step/remaining);
      this.rasterTravel+=step;
      if(!this.move(this._displayReference(this.pathPoint).toArray(),'right'))return;
      if(remaining<=step+1e-10)this.pathIndex++;
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
