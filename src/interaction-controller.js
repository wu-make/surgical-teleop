import * as THREE from 'three';
import {LOCAL_TRACTION,deformPoint} from './tissue-worker.js';
import {CUT_SWEEP,captureBladePose,bladeSpan,sampleBladeSpan} from './blade-sweep.js';

const copy = value => value == null ? null : structuredClone(value);
const localPoint = (tissue, point) => tissue.group.worldToLocal(new THREE.Vector3(...point));
const contactState=()=>({left:false,right:false,leftFragmentId:null,rightDepthMm:0,cutting:false,bladeContact:false,bladeDistanceMm:null,bladeSource:null,cutContactPointWorld:null,pendingCutSamples:0,pendingCutFrames:0,cutBacklogMm:0,cutStatus:'disabled',cutReason:'按 B 开启剪切模式'});
const finitePoint=point=>point?.isVector3?point.toArray().every(Number.isFinite):Array.isArray(point)&&point.length===3&&point.every(Number.isFinite);
const asVector=point=>point?.isVector3?point.clone():new THREE.Vector3(...point);
// CAD TCP is at the jaws. This is a contact tolerance for the 1.5 mm volume,
// not a magnetic pickup radius or a claimed material precision.
const GRASP_CONTACT_MARGIN=.002;
const CUT_RADIUS=.0024;

/** Shared interaction path for manual input and the optional guided example. */
export class InteractionController {
  constructor(sim, tissue, { onMessage = () => {}, onEvent = () => {}, toolDirection, toolQuaternion,toolBlade } = {}) {
    this.sim = sim;
    this.tissue = tissue;
    this.onMessage = onMessage;
    this.onEvent = onEvent;
    this.toolDirection = toolDirection;
    this.toolQuaternion = toolQuaternion;
    this.toolBlade=toolBlade;
    this.grasp = null;
    this.relaxing = null;
    this.cuttingBusy = false;
    this.lastCut = null;
    this.contact = contactState();
    this._generation = 0;
    this._fragmentRebaseId = null;
    this.requiresReopen=false;
    this._pressurePosition=null;
    this._cutTask=null;
    this._clock=0;this._noMaterialAttempt=null;
    this._bladeContactCache=null;
    this._cutSpans=[];this._cutTail=null;this._pendingCutSamples=0;this._cutOverflow=false;
  }

  snapshot(options) { return { version: 3, tissue: this.tissue.snapshot(options), grasp: copy(this.grasp), relaxing: copy(this.relaxing),requiresReopen:this.requiresReopen }; }

  async restore(data) {
    const generation = ++this._generation;
    this._cutTask=null;this.cuttingBusy=false;this.contact=contactState();this._noMaterialAttempt=null;this._bladeContactCache=null;
    this._clearCutTrajectory();
    this._fragmentRebaseId=null;
    this.lastCut = null;
    this.relaxing = null;
    await this.tissue.restore(data?.tissue ?? data);
    if(generation !== this._generation)return;
    this.grasp = copy(data?.grasp);
    if(this.grasp){
      this.grasp.kind ??= this.grasp.fragmentId != null ? 'fragment' : 'tissue';
      if(!Object.hasOwn(this.grasp,'reference'))this.grasp.reference=this.grasp.kind==='fragment'?null:[...this.grasp.local];
      if(this.grasp.kind==='tissue'){
        this.grasp.deformationModel??=data?.tissue?.deformation?.model??'legacy';
        if(this.grasp.deformationModel==='legacy')this.grasp.deformationRadius??=data?.tissue?.deformation?.radius??.065;
      }
    }
    this.relaxing = copy(data?.relaxing);
    if(this.relaxing){
      this.relaxing.deformationModel??=data?.tissue?.deformation?.model??'legacy';
      if(this.relaxing.deformationModel==='legacy')this.relaxing.deformationRadius??=data?.tissue?.deformation?.radius??.065;
    }
    this.requiresReopen=Boolean(data?.requiresReopen);
    if(this.grasp?.kind==='fragment')this._fragmentRebaseId=this.grasp.fragmentId;
    // Rigid pose and attachment already belong to the tissue snapshot. The CAD
    // quaternion getter may still describe the pre-undo render; following it
    // here would corrupt an exact restored specimen pose before the next frame.
    if(this.grasp?.kind!=='fragment')this.applyGrasp({restoring:true});
  }

  release(immediate = false) {
    if(immediate)this.requiresReopen=false;
    this._fragmentRebaseId=null;
    const released=this.grasp;
    if(released?.kind==='fragment')this.tissue.releaseFragment?.(released.fragmentId);
    else if (released && !immediate) this.relaxing = { ...copy(released), remaining: 1,offset:[...released.displacement],velocity:[0,0,0],releaseAge:0 };
    this.grasp = null;
    if (immediate) { this.relaxing = null; this.tissue.setGrasp(null); }
    this.onEvent('release', {kind:released?.kind??'tissue',fragmentId:released?.fragmentId??null});
    if(released&&!immediate)this.onMessage(released.kind==='fragment'?'独立组织块已松开，按重力下落并接触周边表面':'组织仍与母体相连：已从钳口滑脱，正在回落和回弹');
  }

  /** Cancel controller continuations before resetting/restoring the tissue.
   * A late worker reply cannot recapture tissue, rewrite feedback, or clear a
   * newer cut's busy flag. TissueVolume.reset owns worker-epoch invalidation. */
  reset(){
    ++this._generation;this._cutTask=null;this.cuttingBusy=false;this.lastCut=null;this._noMaterialAttempt=null;this._bladeContactCache=null;
    this._clearCutTrajectory();
    this._pressurePosition=null;
    this.release(true);this.contact=contactState();
  }
  invalidate(){this.reset();}

  _setCutStatus(status,reason){this.contact.cutStatus=status;this.contact.cutReason=reason;}

  _clearCutTrajectory(){this._jawObservation=null;this._cutSpans=[];this._cutTail=null;this._pendingCutSamples=0;this._cutOverflow=false;}
  _breakCutTrajectory(){this._cutTail=null;this._cutOverflow=false;this._jawObservation=null;}
  /** Call on discrete B/pause/clutch transitions as well as rendered frames,
   * so an off/on pair between two renders can never bridge the disabled gap. */
  breakCutTrajectory(){this._breakCutTrajectory();}
  _pendingCutFeedback(){
    this.contact.pendingCutSamples=this._pendingCutSamples+(this._cutTask?.batch?.length??0);
    this.contact.pendingCutFrames=this._cutSpans.length;
    this.contact.cutBacklogMm=this._cutSpans.reduce((sum,span)=>sum+span.length*(1-span.index/span.steps),0)*1000;
    this.cuttingBusy=!!this._cutTask||this._pendingCutSamples>0;
  }
  _appendBladePose(pose,{contact=false}={}){
    if(this._cutOverflow)return;
    const previous=this._cutTail;this._cutTail=pose;
    const stationary=previous&&previous.deformation===pose.deformation&&previous.segments.length===pose.segments.length&&previous.segments.every((segment,i)=>segment.a.distanceToSquared(pose.segments[i].a)<1e-18&&segment.b.distanceToSquared(pose.segments[i].b)<1e-18);
    if(stationary){
      if(this.cuttingBusy||this._sameCut(pose))return;
      if(this._noMaterialAttempt&&this._sameCut(pose,this._noMaterialAttempt.signature)&&this._clock<this._noMaterialAttempt.until)return;
      if(!contact)return;
    }else if(!previous&&!contact)return;
    const span=bladeSpan(previous,pose);
    if(pose.segments.length>CUT_SWEEP.maxBatchSegments||!Number.isSafeInteger(span.steps)||this._cutSpans.length>=CUT_SWEEP.maxPendingFrames||this._pendingCutSamples+span.steps>CUT_SWEEP.maxPendingSamples){
      this._cutOverflow=true;this._cutTail=null;
      this._setCutStatus('blocked','切割轨迹缓冲已满，已停止记录新路径；等待追赶后请重新张合剪口或切换 B');
      this.onMessage(this.contact.cutReason);return;
    }
    this._cutSpans.push(span);this._pendingCutSamples+=span.steps;this._pendingCutFeedback();
  }
  _takeCutBatch(){
    const batch=[];let segments=0;
    while(this._cutSpans.length){
      const span=this._cutSpans[0],count=span.to.segments.length;
      if(segments+count>CUT_SWEEP.maxBatchSegments)break;
      batch.push(sampleBladeSpan(span,++span.index));segments+=count;this._pendingCutSamples--;
      if(span.index===span.steps)this._cutSpans.shift();
    }
    return batch;
  }
  _restoreCutBatch(batch){
    this._cutSpans.unshift(...batch.map(pose=>({from:pose,to:pose,steps:1,index:0,length:0})));
    this._pendingCutSamples+=batch.length;
  }
  async _drainCutQueue(){
    if(this._cutTask||!this._pendingCutSamples||this.tissue.busy||this.sim.state.paused)return;
    const task={generation:this._generation,batch:null};this._cutTask=task;this._pendingCutFeedback();
    try{
      while(this._pendingCutSamples&&!this.sim.state.paused){
        const batch=this._takeCutBatch();task.batch=batch;this._pendingCutFeedback();
        this.contact.cutting=true;this._setCutStatus('busy','正在完成已执行的剪切，请稍候');
        const before=this.tissue.removedVolumeMm3;let result;
        if(this.tissue.cutSamples)result=await this.tissue.cutSamples(batch.map(pose=>({segments:pose.segments,deformation:pose.material})),CUT_RADIUS);
        else{
          // Lightweight test adapters and old integrations can accept one pose
          // at a time. Production uses cutSamples to freeze each material map.
          for(const pose of batch){
            if(this.tissue.cutSegments)result=await this.tissue.cutSegments(pose.segments,CUT_RADIUS);
            else for(const segment of pose.segments)result=await this.tissue.cutSegment(segment.a,segment.b,CUT_RADIUS);
          }
        }
        if(task.generation!==this._generation||this._cutTask!==task)return;
        task.batch=null;this._reconcileDetachedGrasp();
        const signature=batch.at(-1),removed=this.tissue.removedVolumeMm3>before+1e-8||result?.removedMm3>1e-8||(!Number.isFinite(before)&&result?.changed);
        if(removed){this.lastCut=signature;this._noMaterialAttempt=null;this._setCutStatus('cut','已真实切除组织，沿连接处继续剪切可切离');this.onEvent('cut',{volumeMm3:this.tissue.removedVolumeMm3});}
        else{
          this.lastCut=null;
          const attempts=this._noMaterialAttempt&&this._sameCut(signature,this._noMaterialAttempt.signature)?this._noMaterialAttempt.count+1:1;
          this._noMaterialAttempt={signature,count:attempts,until:this._clock+(attempts>=2?.18:0)};
          this._setCutStatus(['history-limit','not-ready'].includes(result?.reason)?'blocked':'no-material',result?.reason==='history-limit'?'切割记录已到上限，请导出后重置':'剪刃附近未检出可移除组织，请调整刃角度后重试');
          if(['history-limit','not-ready'].includes(result?.reason)){this._clearCutTrajectory();break;}
        }
        this._pendingCutFeedback();
      }
    }catch(error){
      if(task.generation!==this._generation||this._cutTask!==task)return;
      if(task.batch)this._restoreCutBatch(task.batch);
      this.lastCut=null;this._noMaterialAttempt=null;this._setCutStatus('retry','切面更新失败，已保留轨迹，可继续后重试');throw error;
    }finally{
      if(this._cutTask===task){this._cutTask=null;this.contact.cutting=false;this._pendingCutFeedback();}
    }
  }

  _bladeGeometry(){
    const supplied=this.toolBlade?.('right'),segments=[];
    for(const segment of supplied?.segments??[]){
      if(!finitePoint(segment.a)||!finitePoint(segment.b))continue;
      const worldA=asVector(segment.a),worldB=asVector(segment.b);
      if(worldA.distanceToSquared(worldB)<1e-16)continue;
      segments.push({a:this.tissue.group.worldToLocal(worldA.clone()),b:this.tissue.group.worldToLocal(worldB.clone()),worldA,worldB});
    }
    if(segments.length)return {segments,source:supplied.source??'source-CAD-blade',jaw:supplied.jaw};
    const tip=localPoint(this.tissue,this.sim.state.tools.right.position);
    const quaternion=this.toolQuaternion?.('right');let direction,source;
    if(quaternion?.isQuaternion||(Array.isArray(quaternion)&&quaternion.length===4)){
      direction=new THREE.Vector3(0,0,1).applyQuaternion(this._toolQuaternionLocal('right'));source='tip-orientation-fallback';
    }else if(this.toolDirection?.('right')){
      direction=this.toolDirection('right').clone().applyQuaternion(this.tissue.group.getWorldQuaternion(new THREE.Quaternion()).invert()).normalize();source='tip-direction-fallback';
    }else{direction=new THREE.Vector3(0,0,1).applyQuaternion(this._toolQuaternionLocal('right'));source='kinematic-fallback';}
    const a=tip.clone().addScaledVector(direction,-.008),b=tip;
    return {segments:[{a,b,worldA:this.tissue.group.localToWorld(a.clone()),worldB:this.tissue.group.localToWorld(b.clone())}],source};
  }

  pressureApproachTarget(source){
    const desired=source.display.clone().addScaledVector(source.normal,.0004);
    let closest=null,best=Infinity;
    for(const {a,b} of this._bladeGeometry().segments){
      const d=b.clone().sub(a),t=THREE.MathUtils.clamp(desired.clone().sub(a).dot(d)/Math.max(1e-20,d.lengthSq()),0,1);
      const point=a.clone().addScaledVector(d,t),distance=point.distanceToSquared(desired);
      if(distance<best){best=distance;closest=point;}
    }
    const tip=localPoint(this.tissue,this.sim.state.tools.right.position);
    return this.tissue.group.localToWorld(closest?tip.add(desired).sub(closest):desired);
  }

  _sameCut(signature,previous=this.lastCut){
    if(!previous||previous.deformation!==signature.deformation||previous.segments.length!==signature.segments.length||Math.abs(previous.jaw-signature.jaw)>.002||previous.quaternion.angleTo(signature.quaternion)>.0001)return false;
    if(previous.wrist.some((v,i)=>Math.abs(v-signature.wrist[i])>.0001))return false;
    return previous.segments.every((segment,i)=>segment.a.distanceTo(signature.segments[i].a)<.00055&&segment.b.distanceTo(signature.segments[i].b)<.00055);
  }

  _toolQuaternionLocal(side = 'left') {
    const supplied=this.toolQuaternion?.(side);
    let world;
    if(supplied?.isQuaternion)world=supplied.clone();
    else if(Array.isArray(supplied)&&supplied.length===4&&supplied.every(Number.isFinite))world=new THREE.Quaternion().fromArray(supplied);
    else{
      const tool=this.sim.state.tools[side];
      const axis=new THREE.Vector3(...tool.position).sub(new THREE.Vector3(...tool.port));
      if(axis.lengthSq()<1e-16)axis.set(0,0,1);else axis.normalize();
      world=new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,0,1),axis)
        .multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(tool.wrist[0],tool.wrist[1],tool.wrist[2],'XYZ')));
    }
    return this.tissue.group.getWorldQuaternion(new THREE.Quaternion()).invert().multiply(world).normalize();
  }

  _attachFragment(fragmentId, reference = null, {transition = false,surfaceAnchor = null} = {}) {
    if(fragmentId==null||!this.tissue.getFragment?.(fragmentId))return false;
    const point=localPoint(this.tissue,this.sim.state.tools.left.position);
    if(this.tissue.attachFragment?.(fragmentId,surfaceAnchor??point,this._toolQuaternionLocal())===false)return false;
    const previous=this.grasp;
    if(transition&&previous?.kind!=='fragment'){
      this.relaxing={...copy(previous),remaining:1};
      // Keep the mother's current display map until the first analytic recoil
      // step. Resetting it here briefly snaps the parent flat and forces every
      // affected vertex/contact bound to be rebuilt twice at separation.
    }
    this.grasp={kind:'fragment',fragmentId,local:point.toArray(),reference:reference?[...reference]:null,displacement:[0,0,0]};
    this._fragmentRebaseId=null;
    if(transition)this.tissue.moveHeldFragment?.(fragmentId,point,this._toolQuaternionLocal());
    this.onEvent('fragment-grasp',{fragmentId,transition});
    this.onMessage(transition?'切断已确认：左钳现夹持独立组织块，可移动、旋转，V 松开':'已夹住切离组织块：可移动和旋转，V 松开放下');
    return true;
  }

  _reconcileDetachedGrasp() {
    if(!this.grasp||this.grasp.kind==='fragment')return false;
    const reference=this.grasp.reference??this.grasp.local;
    const component=this.tissue.fragmentAtReference?.(new THREE.Vector3(...reference));
    let id=component?.id??(typeof component==='string'||typeof component==='number'?component:null);
    if(id==null&&!this.tissue.fragmentAtReference){
      const display=this.tissue.deformPoint?.(new THREE.Vector3(...reference))??localPoint(this.tissue,this.sim.state.tools.left.position);
      id=this.tissue.findFragmentAt?.(display,.005)??null;
    }
    let surfaceAnchor=null;
    if(component?.frozenCenter&&component?.position&&component?.quaternion){
      // A queued cut may finish after the left hand has moved again. Attach
      // the actual material anchor in its frozen specimen pose, then bring
      // that anchor to the current jaw; using currentTip as the old surface
      // would silently leave the hand offset from its held specimen.
      surfaceAnchor=new THREE.Vector3().fromArray(deformPoint(reference,component.deformation)).sub(component.frozenCenter).applyQuaternion(component.quaternion).add(component.position);
    }
    return id!=null?this._attachFragment(id,reference,{transition:true,surfaceAnchor}):false;
  }

  _setAttachedDeformation(grasp,delta){
    if(grasp.deformationModel==='legacy')this.tissue.setGrasp({local:[...grasp.local],displacement:delta.toArray(),radius:grasp.deformationRadius??.065});
    else this.tissue.setGrasp(new THREE.Vector3(...grasp.local),delta);
  }

  applyGrasp({restoring=false}={}) {
    if (!this.grasp) return;
    if(this.grasp.kind==='fragment'){
      if(!this.tissue.getFragment?.(this.grasp.fragmentId)){
        this.grasp=null;
        this._fragmentRebaseId=null;
        this.onMessage('该组织块已不存在，左钳夹持已解除');
        return;
      }
      if(this.sim.state.paused)return;
      const point=localPoint(this.tissue,this.sim.state.tools.left.position),quaternion=this._toolQuaternionLocal();
      if(this._fragmentRebaseId===this.grasp.fragmentId){
        // The authentic CAD uses path-dependent parallel transport. Undo/redo
        // can therefore restore the same TCP/wrist with a different orientation
        // gauge. Rebase against the first fresh CAD frame without moving the
        // saved specimen, then continue ordinary relative rigid following.
        if(this.tissue.attachFragment?.(this.grasp.fragmentId,point,quaternion)===false)return;
        this._fragmentRebaseId=null;
      }
      this.tissue.moveHeldFragment?.(this.grasp.fragmentId,point,quaternion);
      return;
    }
    const position = localPoint(this.tissue, this.sim.state.tools.left.position);
    const delta = position.sub(new THREE.Vector3(...this.grasp.local));
    if(!restoring&&delta.length()>LOCAL_TRACTION.radius*LOCAL_TRACTION.slipStrain){
      this.release();this.requiresReopen=true;this.lastCut=null;
      this.onEvent('grasp-slip',{strain:delta.length()/LOCAL_TRACTION.radius});
      this.onMessage('局部组织过度牵拉，已从左钳滑脱并回弹；请张开后重新夹持。此为未标定的几何应变模型');
      return;
    }
    this.grasp.displacement = delta.toArray();
    this._setAttachedDeformation(this.grasp,delta);
  }

  updateGrasp(dt) {
    const left = this.sim.state.tools.left;
    if(left.jaw>.32)this.requiresReopen=false;
    this._reconcileDetachedGrasp();
    if (left.jaw > .32 && this.grasp) this.release();
    if (left.jaw < .16 && !this.grasp&&!this.requiresReopen) {
      // One capture attempt per actual open/close cycle. A closed empty jaw
      // cannot acquire tissue later merely by translating through a surface.
      this.requiresReopen=true;
      const p = localPoint(this.tissue, left.position);
      const anchor = this.relaxing?null:this.tissue.findGraspPoint(p, GRASP_CONTACT_MARGIN);
      if (anchor) {
        if(anchor.fragmentId!=null)this._attachFragment(anchor.fragmentId,anchor.reference?.toArray?.()??null,{surfaceAnchor:anchor});
        else{
          const reference=this.tissue.toReferencePoint?.(anchor)??anchor;
          this.grasp = { kind:'tissue',fragmentId:null,deformationModel:'local-flow',local: reference.toArray(),reference:reference.toArray(),displacement: [0, 0, 0] };
          this.onEvent('grasp');
          this.onMessage('左钳已夹住肝包膜：按 E 抬起，组织会随钳尖牵拉；V 松开');
        }
      }else this.onMessage(this.relaxing?'组织正在回弹，请稍候再张开并闭合左钳':'左钳未夹到组织：先 V 张开，贴近表面后 C 夹持');
    }
    if (this.grasp) this.applyGrasp();
    if ((!this.grasp||this.grasp.kind==='fragment')&&this.relaxing) {
      // Critically damped recoil starts continuously from the released pose.
      // The material remains connected: no rigid piece or artificial tear.
      const r=this.relaxing,h=Math.max(0,Math.min(.1,dt)),omega=15,decay=Math.exp(-omega*h);
      r.offset??=r.displacement.map(v=>v*r.remaining);r.velocity??=[0,0,0];r.releaseAge=(r.releaseAge??0)+h;
      for(let i=0;i<3;i++){const x=r.offset[i],v=r.velocity[i],c=v+omega*x;r.offset[i]=(x+c*h)*decay;r.velocity[i]=(v-omega*c*h)*decay;}
      r.remaining=Math.hypot(...r.offset)/Math.max(1e-12,Math.hypot(...r.displacement));
      this._setAttachedDeformation(r,new THREE.Vector3(...r.offset));
      if (this.relaxing.remaining < .008) { this.relaxing = null; this.tissue.setGrasp(null); }
    } else if(!this.grasp||this.grasp.kind==='fragment')this.tissue.setGrasp(null);
  }

  async update(dt, { clutched = false,compressing=false } = {}) {
    if(!this.tissue.ready){this._setCutStatus('loading','正在加载真实组织');return;}
    if(this.sim.state.paused){this._breakCutTrajectory();this._pendingCutFeedback();this._setCutStatus('paused','仿真已暂停；已记录的剪刃轨迹将在继续后完成');return;}
    const updateStart=performance.now();
    if(Number.isFinite(dt)&&dt>0)this._clock+=Math.min(.1,dt);
    this.updateGrasp(dt);
    this.tissue.updateFragments?.(dt);
    const graspEnd=performance.now();
    const { left, right } = this.sim.state.tools;
    const leftPoint=localPoint(this.tissue,left.position);
    const leftDistance = this.tissue.contactDistance?.(leftPoint,GRASP_CONTACT_MARGIN)??this.tissue.sampleDistance(leftPoint);
    const leftFragmentId=this.tissue.findFragmentAt?.(leftPoint,GRASP_CONTACT_MARGIN)??null;
    const point = localPoint(this.tissue, right.position);
    const pending=this.cuttingBusy||this.tissue.busy;
    const distance = pending?Infinity:(this.tissue.contactDistance?.(point,.0032)??this.tissue.sampleDistance(point));
    this.contact.left = Math.abs(leftDistance) < GRASP_CONTACT_MARGIN||leftFragmentId!=null;
    this.contact.leftFragmentId=leftFragmentId;
    const blade=this._bladeGeometry();
    const selected=this.sim.state.selected,tool=this.sim.state.tools[selected],pressurePoint=tool?localPoint(this.tissue,tool.position):null;
    const steady=pressurePoint&&(!this._pressurePosition||pressurePoint.distanceTo(this._pressurePosition)<=.005*Math.max(1/240,dt));
    const canPress=compressing&&!clutched&&steady&&tool?.jaw<.22&&(selected!=='left'||!this.grasp);
    this._pressurePosition=compressing?pressurePoint:null;
    const bloodStart=performance.now();
    this.tissue.blood?.update(dt,{pressureSegments:canPress?(selected==='right'?blade.segments:[{a:pressurePoint,b:pressurePoint}]):[]});
    const bloodEnd=performance.now();
    const contactKey=[this.tissue._contactRevision??0,this.tissue._epoch??0,this.tissue._cuts?.length??0,...blade.segments.flatMap(segment=>[...segment.a.toArray(),...segment.b.toArray()])].join(',');
    let hits;
    if(pending)hits=[];
    else if(this._bladeContactCache?.key===contactKey)hits=this._bladeContactCache.hits;
    else{
      hits=blade.segments.map(segment=>this.tissue.contactSegment?.(segment.a,segment.b,CUT_RADIUS)??
        {contact:Math.min(this.tissue.sampleDistance(segment.a),this.tissue.sampleDistance(segment.b))<=CUT_RADIUS,distance:Infinity});
      this._bladeContactCache={key:contactKey,hits};
    }
    const hit=hits.find(value=>value.contact);
    this.contact.right = !!hit;
    this.contact.bladeContact=!!hit;this.contact.bladeSource=blade.source;
    this.contact.bladeDistanceMm=hit&&Number.isFinite(hit.distance)?hit.distance*1000:null;
    this.contact.cutContactPointWorld=hit?.point?this.tissue.group.localToWorld(hit.point.clone()).toArray():null;
    this.contact.rightDepthMm = Number.isFinite(distance) ? -distance * 1000 : 0;
    this.timings={graspMs:graspEnd-updateStart,contactMs:bloodStart-graspEnd,bloodMs:bloodEnd-bloodStart,bladeMs:performance.now()-bloodEnd};
    this.contact.cutting = !!this._cutTask;
    const jaw=right.jaw;
    if(compressing){this.lastCut=null;this._breakCutTrajectory();this._setCutStatus('pressure',this.tissue.blood?.pressureContacts?'局部压迫中：观察渗血变化；松开 H 后继续检查':'压迫需稳定接触渗血切面：闭合器械，精细贴近；左钳需先释放组织');}
    else if(!this.sim.state.cutting){this.lastCut=null;this._noMaterialAttempt=null;this._breakCutTrajectory();this._setCutStatus('disabled','按 B 开启剪切模式');}
    else if(jaw>.22 && !(this._jawObservation!=null && jaw<this._jawObservation-1e-6)){
      // Retain the open CAD pose as the start of a closure, without cutting
      // while opening or parked open. Closing samples the actual opposing edges.
      this.lastCut=null;this._noMaterialAttempt=null;this._breakCutTrajectory();
      this._cutTail=captureBladePose(blade,point,this._toolQuaternionLocal('right'),jaw,right.wrist,this.tissue._deformation??null);
      this._setCutStatus('jaw-open','右剪已待命：让组织位于剪口之间，再按 C 闭合');
    }
    else if(clutched){this.lastCut=null;this._breakCutTrajectory();this._setCutStatus('clutched','松开空格离合后继续剪切');}
    else{
      const pose=captureBladePose(blade,point,this._toolQuaternionLocal('right'),jaw,right.wrist,this.tissue._deformation??null);
      if(!hit)this._setCutStatus('no-contact','实际剪刃尚未碰到组织，请移动或旋转右剪贴近薄片');
      else if(this._sameCut(pose))this._setCutStatus('already-cut','此处已切开，请沿组织连接继续移动右剪');
      this._appendBladePose(pose,{contact:pending||!!hit});
    }
    this._jawObservation=jaw;
    this._pendingCutFeedback();
    if(this._cutOverflow)this._setCutStatus('blocked','切割轨迹缓冲已满，已停止记录新路径；等待追赶后请重新张合剪口或切换 B');
    else if(this.cuttingBusy)this._setCutStatus('busy','正在完成已执行的剪切，请稍候');
    return this._drainCutQueue();
  }

  get metrics() {
    return { ...this.contact, timings:this.timings,grasp: copy(this.grasp), deformation: this.tissue.graspMetrics,
      cuttingBusy: this.cuttingBusy,requiresReopen:this.requiresReopen,releaseState:this.relaxing?'connected-slip':this.tissue.fragmentMetrics?.pieces.some(p=>!p.held&&!p.sleeping)?'detached-fall':null,blood:this.tissue.blood?.metrics??null,heldFragmentId:this.grasp?.kind==='fragment'?this.grasp.fragmentId:null };
  }
}

/** Surface query in display coordinates; uses the same deformed SDF as cutting. */
export function surfacePose(tissue, seed, maximumDistance = .08) {
  const point = tissue.findGraspPoint(localPoint(tissue, seed), maximumDistance);
  if (!point) return null;
  const normal = (point.normal ?? new THREE.Vector3(0, 0, 1)).clone()
    .applyQuaternion(tissue.group.getWorldQuaternion(new THREE.Quaternion())).normalize();
  return { point: tissue.group.localToWorld(point.clone()), normal,fragmentId:point.fragmentId??null,
    reference:(tissue.toReferencePoint?.(point)??point).clone() };
}
