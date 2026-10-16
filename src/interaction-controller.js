import * as THREE from 'three';

const copy = value => value == null ? null : structuredClone(value);
const localPoint = (tissue, point) => tissue.group.worldToLocal(new THREE.Vector3(...point));

/** Shared interaction path for manual input and the optional guided example. */
export class InteractionController {
  constructor(sim, tissue, { onMessage = () => {}, onEvent = () => {}, toolDirection, toolQuaternion } = {}) {
    this.sim = sim;
    this.tissue = tissue;
    this.onMessage = onMessage;
    this.onEvent = onEvent;
    this.toolDirection = toolDirection;
    this.toolQuaternion = toolQuaternion;
    this.grasp = null;
    this.relaxing = null;
    this.cuttingBusy = false;
    this.lastCut = null;
    this.contact = { left: false, right: false, rightDepthMm: 0, cutting: false };
    this._generation = 0;
    this._fragmentRebaseId = null;
  }

  snapshot() { return { version: 3, tissue: this.tissue.snapshot(), grasp: copy(this.grasp), relaxing: copy(this.relaxing) }; }

  async restore(data) {
    const generation = ++this._generation;
    this._fragmentRebaseId=null;
    this.lastCut = null;
    this.relaxing = null;
    await this.tissue.restore(data?.tissue ?? data);
    if(generation !== this._generation)return;
    this.grasp = copy(data?.grasp);
    if(this.grasp){
      this.grasp.kind ??= this.grasp.fragmentId != null ? 'fragment' : 'tissue';
      if(!Object.hasOwn(this.grasp,'reference'))this.grasp.reference=this.grasp.kind==='fragment'?null:[...this.grasp.local];
    }
    this.relaxing = copy(data?.relaxing);
    if(this.grasp?.kind==='fragment')this._fragmentRebaseId=this.grasp.fragmentId;
    // Rigid pose and attachment already belong to the tissue snapshot. The CAD
    // quaternion getter may still describe the pre-undo render; following it
    // here would corrupt an exact restored specimen pose before the next frame.
    if(this.grasp?.kind!=='fragment')this.applyGrasp();
  }

  release(immediate = false) {
    this._fragmentRebaseId=null;
    const released=this.grasp;
    if(released?.kind==='fragment')this.tissue.releaseFragment?.(released.fragmentId);
    else if (released && !immediate) this.relaxing = { ...copy(released), remaining: 1 };
    this.grasp = null;
    if (immediate) { this.relaxing = null; this.tissue.setGrasp(null); }
    this.onEvent('release', {kind:released?.kind??'tissue',fragmentId:released?.fragmentId??null});
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

  applyGrasp() {
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
    this.grasp.displacement = delta.toArray();
    this.tissue.setGrasp(new THREE.Vector3(...this.grasp.local), delta);
  }

  updateGrasp(dt) {
    const left = this.sim.state.tools.left;
    this._reconcileDetachedGrasp();
    if (left.jaw > .32 && this.grasp) this.release();
    if (left.jaw < .16 && !this.grasp && !this.relaxing) {
      const p = localPoint(this.tissue, left.position);
      const anchor = this.tissue.findGraspPoint(p, .006);
      if (anchor) {
        if(anchor.fragmentId!=null)this._attachFragment(anchor.fragmentId,anchor.reference?.toArray?.()??null,{surfaceAnchor:anchor});
        else{
          const reference=this.tissue.toReferencePoint?.(anchor)??anchor;
          this.grasp = { kind:'tissue',fragmentId:null,local: reference.toArray(),reference:reference.toArray(),displacement: [0, 0, 0] };
          this.onEvent('grasp');
          this.onMessage('左钳已夹住肝包膜：按 E 抬起，组织会随钳尖牵拉；V 松开');
        }
      }
    }
    if (this.grasp) this.applyGrasp();
    if ((!this.grasp||this.grasp.kind==='fragment')&&this.relaxing) {
      this.relaxing.remaining *= Math.exp(-dt * 11);
      this.tissue.setGrasp(new THREE.Vector3(...this.relaxing.local),
        new THREE.Vector3(...this.relaxing.displacement).multiplyScalar(this.relaxing.remaining));
      if (this.relaxing.remaining < .008) { this.relaxing = null; this.tissue.setGrasp(null); }
    } else if(!this.grasp||this.grasp.kind==='fragment')this.tissue.setGrasp(null);
  }

  async update(dt, { clutched = false } = {}) {
    if (!this.tissue.ready || this.sim.state.paused) return;
    this.updateGrasp(dt);
    this.tissue.updateFragments?.(dt);
    const { left, right } = this.sim.state.tools;
    const leftPoint=localPoint(this.tissue,left.position);
    const leftDistance = this.tissue.sampleDistance(leftPoint);
    const leftFragmentId=this.tissue.findFragmentAt?.(leftPoint,.006)??null;
    const point = localPoint(this.tissue, right.position);
    const distance = this.tissue.sampleDistance(point);
    this.contact.left = leftDistance < .006||leftFragmentId!=null;
    this.contact.leftFragmentId=leftFragmentId;
    this.contact.right = distance < .0032;
    this.contact.rightDepthMm = Number.isFinite(distance) ? -distance * 1000 : 0;
    this.contact.cutting = false;
    if (!this.sim.state.cutting || right.jaw > .22 || clutched) { this.lastCut = null; return; }
    if (this.cuttingBusy || this.tissue.busy) return;
    const deformation = this.tissue.graspMetrics?.displacement ?? this.grasp?.displacement ?? [0, 0, 0];
    if (this.lastCut && point.distanceTo(this.lastCut.point) < .00055 &&
        new THREE.Vector3(...deformation).distanceTo(this.lastCut.deformation) < .00055) return;
    // A closed curved shear cuts along its distal blade, not at a detached dot.
    const direction = this.toolDirection?.('right')?.clone() ??
      new THREE.Vector3(...right.position).sub(new THREE.Vector3(...right.port)).normalize();
    const inverse = this.tissue.group.getWorldQuaternion(new THREE.Quaternion()).invert();
    direction.applyQuaternion(inverse).normalize();
    const bladeBack = point.clone().addScaledVector(direction, -.008);
    if (distance > .0032 && this.tissue.sampleDistance(bladeBack) > .0032) return;
    this.lastCut = { point: point.clone(), deformation: new THREE.Vector3(...deformation) };
    this.cuttingBusy = true;
    this.contact.cutting = true;
    try {
      const generation=this._generation;
      const before = this.tissue.removedVolumeMm3;
      await this.tissue.cutSegment(bladeBack, point, .0024);
      if(generation!==this._generation)return;
      this._reconcileDetachedGrasp();
      if (this.tissue.removedVolumeMm3 > before) this.onEvent('cut', { volumeMm3: this.tissue.removedVolumeMm3 });
    } finally { this.cuttingBusy = false; }
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
