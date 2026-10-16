import * as THREE from 'three';
import {LOCAL_TRACTION} from './tissue-worker.js';

const copy = value => value == null ? null : structuredClone(value);
const localPoint = (tissue, point) => tissue.group.worldToLocal(new THREE.Vector3(...point));
const contactState=()=>({left:false,right:false,leftFragmentId:null,rightDepthMm:0,cutting:false,bladeContact:false,bladeDistanceMm:null,bladeSource:null,cutContactPointWorld:null,cutStatus:'disabled',cutReason:'按 B 开启剪切模式'});
const finitePoint=point=>point?.isVector3?point.toArray().every(Number.isFinite):Array.isArray(point)&&point.length===3&&point.every(Number.isFinite);
const asVector=point=>point?.isVector3?point.clone():new THREE.Vector3(...point);

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
    this._cutTask=null;
    this._clock=0;this._noMaterialAttempt=null;
    this._bladeContactCache=null;
  }

  snapshot() { return { version: 3, tissue: this.tissue.snapshot(), grasp: copy(this.grasp), relaxing: copy(this.relaxing),requiresReopen:this.requiresReopen }; }

  async restore(data) {
    const generation = ++this._generation;
    this._cutTask=null;this.cuttingBusy=false;this.contact=contactState();this._noMaterialAttempt=null;this._bladeContactCache=null;
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
    else if (released && !immediate) this.relaxing = { ...copy(released), remaining: 1 };
    this.grasp = null;
    if (immediate) { this.relaxing = null; this.tissue.setGrasp(null); }
    this.onEvent('release', {kind:released?.kind??'tissue',fragmentId:released?.fragmentId??null});
  }

  /** Cancel controller continuations before resetting/restoring the tissue.
   * A late worker reply cannot recapture tissue, rewrite feedback, or clear a
   * newer cut's busy flag. TissueVolume.reset owns worker-epoch invalidation. */
  reset(){
    ++this._generation;this._cutTask=null;this.cuttingBusy=false;this.lastCut=null;this._noMaterialAttempt=null;this._bladeContactCache=null;
    this.release(true);this.contact=contactState();
  }
  invalidate(){this.reset();}

  _setCutStatus(status,reason){this.contact.cutStatus=status;this.contact.cutReason=reason;}

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
      this.tissue.setGrasp(null);
    }
    this.grasp={kind:'fragment',fragmentId,local:point.toArray(),reference:reference?[...reference]:null,displacement:[0,0,0]};
    this._fragmentRebaseId=null;
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
    return id!=null?this._attachFragment(id,reference,{transition:true}):false;
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
    if (left.jaw < .16 && !this.grasp && !this.relaxing&&!this.requiresReopen) {
      const p = localPoint(this.tissue, left.position);
      const anchor = this.tissue.findGraspPoint(p, .006);
      if (anchor) {
        if(anchor.fragmentId!=null)this._attachFragment(anchor.fragmentId,anchor.reference?.toArray?.()??null,{surfaceAnchor:anchor});
        else{
          const reference=this.tissue.toReferencePoint?.(anchor)??anchor;
          this.grasp = { kind:'tissue',fragmentId:null,deformationModel:'local-flow',local: reference.toArray(),reference:reference.toArray(),displacement: [0, 0, 0] };
          this.onEvent('grasp');
          this.onMessage('左钳已夹住肝包膜：按 E 抬起，组织会随钳尖牵拉；V 松开');
        }
      }
    }
    if (this.grasp) this.applyGrasp();
    if ((!this.grasp||this.grasp.kind==='fragment')&&this.relaxing) {
      this.relaxing.remaining *= Math.exp(-dt * 11);
      this._setAttachedDeformation(this.relaxing,new THREE.Vector3(...this.relaxing.displacement).multiplyScalar(this.relaxing.remaining));
      if (this.relaxing.remaining < .008) { this.relaxing = null; this.tissue.setGrasp(null); }
    } else if(!this.grasp||this.grasp.kind==='fragment')this.tissue.setGrasp(null);
  }

  async update(dt, { clutched = false } = {}) {
    if(!this.tissue.ready){this._setCutStatus('loading','正在加载真实组织');return;}
    if(this.sim.state.paused){this._setCutStatus('paused','仿真已暂停，请继续后剪切');return;}
    if(Number.isFinite(dt)&&dt>0)this._clock+=Math.min(.1,dt);
    this.updateGrasp(dt);
    this.tissue.updateFragments?.(dt);
    const { left, right } = this.sim.state.tools;
    const leftPoint=localPoint(this.tissue,left.position);
    const leftDistance = this.tissue.contactDistance?.(leftPoint,.006)??this.tissue.sampleDistance(leftPoint);
    const leftFragmentId=this.tissue.findFragmentAt?.(leftPoint,.006)??null;
    const point = localPoint(this.tissue, right.position);
    const distance = this.tissue.contactDistance?.(point,.0032)??this.tissue.sampleDistance(point);
    this.contact.left = leftDistance < .006||leftFragmentId!=null;
    this.contact.leftFragmentId=leftFragmentId;
    const blade=this._bladeGeometry();
    const contactKey=[this.tissue._contactRevision??0,this.tissue._epoch??0,this.tissue._cuts?.length??0,...blade.segments.flatMap(segment=>[...segment.a.toArray(),...segment.b.toArray()])].join(',');
    let hits;
    if(this._bladeContactCache?.key===contactKey)hits=this._bladeContactCache.hits;
    else{
      hits=blade.segments.map(segment=>this.tissue.contactSegment?.(segment.a,segment.b,.0032)??
        {contact:Math.min(this.tissue.sampleDistance(segment.a),this.tissue.sampleDistance(segment.b))<=.0032,distance:Infinity});
      this._bladeContactCache={key:contactKey,hits};
    }
    const hit=hits.find(value=>value.contact);
    this.contact.right = !!hit;
    this.contact.bladeContact=!!hit;this.contact.bladeSource=blade.source;
    this.contact.bladeDistanceMm=hit&&Number.isFinite(hit.distance)?hit.distance*1000:null;
    this.contact.cutContactPointWorld=hit?.point?this.tissue.group.localToWorld(hit.point.clone()).toArray():null;
    this.contact.rightDepthMm = Number.isFinite(distance) ? -distance * 1000 : 0;
    this.contact.cutting = false;
    if(!this.sim.state.cutting){this.lastCut=null;this._noMaterialAttempt=null;this._setCutStatus('disabled','按 B 开启剪切模式');return;}
    // Source CAD getters may expose the joint angle in radians. The command
    // remains the normalized [0,1] jaw input used by all closure controls.
    const jaw=right.jaw;
    if(jaw>.22){this.lastCut=null;this._noMaterialAttempt=null;this._setCutStatus('jaw-open','右剪尚未闭合，请选右剪后按 C');return;}
    if(clutched){this.lastCut=null;this._setCutStatus('clutched','松开空格离合后继续剪切');return;}
    if(this.cuttingBusy||this.tissue.busy){this._setCutStatus('busy','正在更新真实切面，请稍候');return;}
    if(!hit){this._setCutStatus('no-contact','实际剪刃尚未碰到组织，请移动或旋转右剪贴近薄片');return;}
    const signature={segments:blade.segments.map(({a,b})=>({a:a.clone(),b:b.clone()})),jaw,wrist:[...right.wrist],quaternion:this._toolQuaternionLocal('right'),
      deformation:JSON.stringify(this.tissue._deformation??this.tissue.graspMetrics??null),point:point.clone()};
    if(this._sameCut(signature)){this._setCutStatus('already-cut','此处已切开，请沿组织连接继续移动右剪');return;}
    if(this._noMaterialAttempt&&this._sameCut(signature,this._noMaterialAttempt.signature)&&this._clock<this._noMaterialAttempt.until){this._setCutStatus('no-material','当前剪刃位置未检出可切组织，请稍移刃口或旋转后重试');return;}
    const task={generation:this._generation};this._cutTask=task;
    this.cuttingBusy = true;
    this.contact.cutting = true;
    this._setCutStatus('cutting','实际剪刃接触组织，正在更新切面');
    try {
      const before = this.tissue.removedVolumeMm3;
      const touching=blade.segments.filter((segment,i)=>hits[i].contact);
      let result;
      if(this.tissue.cutSegments)result=await this.tissue.cutSegments(touching,.0024);
      else for(const segment of touching)result=await this.tissue.cutSegment(segment.a,segment.b,.0024);
      if(task.generation!==this._generation||this._cutTask!==task)return;
      this._reconcileDetachedGrasp();
      const removed=this.tissue.removedVolumeMm3>before+1e-8||result?.removedMm3>1e-8||(!Number.isFinite(before)&&result?.changed);
      if(removed){this.lastCut=signature;this._noMaterialAttempt=null;this._setCutStatus('cut','已真实切除组织，沿连接处继续剪切可切离');this.onEvent('cut',{volumeMm3:this.tissue.removedVolumeMm3});}
      else{
        this.lastCut=null;
        const attempts=this._noMaterialAttempt&&this._sameCut(signature,this._noMaterialAttempt.signature)?this._noMaterialAttempt.count+1:1;
        this._noMaterialAttempt={signature,count:attempts,until:this._clock+(attempts>=2?.18:0)};
        this._setCutStatus(['history-limit','not-ready'].includes(result?.reason)?'blocked':'no-material',result?.reason==='history-limit'?'切割记录已到上限，请导出后重置':'剪刃附近未检出可移除组织，请调整刃角度后重试');
      }
    }catch(error){
      if(task.generation!==this._generation||this._cutTask!==task)return;
      this.lastCut=null;this._noMaterialAttempt=null;this._setCutStatus('retry','切面更新失败，可在当前位置重试');
      throw error;
    }finally{
      if(this._cutTask===task){this.cuttingBusy=false;this._cutTask=null;this.contact.cutting=false;}
    }
  }

  get metrics() {
    return { ...this.contact, grasp: copy(this.grasp), deformation: this.tissue.graspMetrics,
      cuttingBusy: this.cuttingBusy,heldFragmentId:this.grasp?.kind==='fragment'?this.grasp.fragmentId:null };
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
