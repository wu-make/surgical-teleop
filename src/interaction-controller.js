import * as THREE from 'three';

const copy = value => value == null ? null : structuredClone(value);
const localPoint = (tissue, point) => tissue.group.worldToLocal(new THREE.Vector3(...point));

/** Shared interaction path for manual input and the optional guided example. */
export class InteractionController {
  constructor(sim, tissue, { onMessage = () => {}, onEvent = () => {}, toolDirection } = {}) {
    this.sim = sim;
    this.tissue = tissue;
    this.onMessage = onMessage;
    this.onEvent = onEvent;
    this.toolDirection = toolDirection;
    this.grasp = null;
    this.relaxing = null;
    this.cuttingBusy = false;
    this.lastCut = null;
    this.contact = { left: false, right: false, rightDepthMm: 0, cutting: false };
  }

  snapshot() { return { version: 2, tissue: this.tissue.snapshot(), grasp: copy(this.grasp) }; }

  async restore(data) {
    this.lastCut = null;
    this.relaxing = null;
    await this.tissue.restore(data?.tissue ?? data);
    this.grasp = copy(data?.grasp);
    this.applyGrasp();
  }

  release(immediate = false) {
    if (this.grasp && !immediate) this.relaxing = { ...copy(this.grasp), remaining: 1 };
    this.grasp = null;
    if (immediate) { this.relaxing = null; this.tissue.setGrasp(null); }
    this.onEvent('release');
  }

  applyGrasp() {
    if (!this.grasp) return;
    const position = localPoint(this.tissue, this.sim.state.tools.left.position);
    const delta = position.sub(new THREE.Vector3(...this.grasp.local));
    this.grasp.displacement = delta.toArray();
    this.tissue.setGrasp(new THREE.Vector3(...this.grasp.local), delta);
  }

  updateGrasp(dt) {
    const left = this.sim.state.tools.left;
    if (left.jaw > .32 && this.grasp) this.release();
    if (left.jaw < .16 && !this.grasp && !this.relaxing) {
      const p = localPoint(this.tissue, left.position);
      const anchor = this.tissue.findGraspPoint(p, .006);
      if (anchor) {
        this.grasp = { local: anchor.toArray(), displacement: [0, 0, 0] };
        this.onEvent('grasp');
        this.onMessage('左钳已夹住肝包膜：按 E 抬起，组织会随钳尖牵拉；V 松开');
      }
    }
    if (this.grasp) this.applyGrasp();
    else if (this.relaxing) {
      this.relaxing.remaining *= Math.exp(-dt * 11);
      this.tissue.setGrasp(new THREE.Vector3(...this.relaxing.local),
        new THREE.Vector3(...this.relaxing.displacement).multiplyScalar(this.relaxing.remaining));
      if (this.relaxing.remaining < .008) { this.relaxing = null; this.tissue.setGrasp(null); }
    } else this.tissue.setGrasp(null);
  }

  async update(dt, { clutched = false } = {}) {
    if (!this.tissue.ready || this.sim.state.paused) return;
    this.updateGrasp(dt);
    const { left, right } = this.sim.state.tools;
    const leftDistance = this.tissue.sampleDistance(localPoint(this.tissue, left.position));
    const point = localPoint(this.tissue, right.position);
    const distance = this.tissue.sampleDistance(point);
    this.contact.left = leftDistance < .006;
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
      const before = this.tissue.removedVolumeMm3;
      await this.tissue.cutSegment(bladeBack, point, .0024);
      if (this.tissue.removedVolumeMm3 > before) this.onEvent('cut', { volumeMm3: this.tissue.removedVolumeMm3 });
    } finally { this.cuttingBusy = false; }
  }

  get metrics() {
    return { ...this.contact, grasp: copy(this.grasp), deformation: this.tissue.graspMetrics,
      cuttingBusy: this.cuttingBusy };
  }
}

/** Surface query in display coordinates; uses the same deformed SDF as cutting. */
export function surfacePose(tissue, seed, maximumDistance = .08) {
  const point = tissue.findGraspPoint(localPoint(tissue, seed), maximumDistance);
  if (!point) return null;
  const normal = (point.normal ?? new THREE.Vector3(0, 0, 1)).clone()
    .applyQuaternion(tissue.group.getWorldQuaternion(new THREE.Quaternion())).normalize();
  return { point: tissue.group.localToWorld(point.clone()), normal };
}
