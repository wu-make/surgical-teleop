import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const BASE = import.meta.env?.BASE_URL ?? '/';
const Z = new THREE.Vector3(0, 0, 1);
const clamp = THREE.MathUtils.clamp;

async function asset(loader, name) {
  const [modelResponse, metadataResponse] = await Promise.all([
    fetch(`${BASE}assets/${name}.glb`),
    fetch(`${BASE}assets/${name}-kinematics.json`),
  ]);
  if (!modelResponse.ok || !metadataResponse.ok) throw new Error(`无法载入真实模型：${name}`);
  const [buffer, metadata] = await Promise.all([modelResponse.arrayBuffer(), metadataResponse.json()]);
  const gltf = await loader.parseAsync(buffer, `${BASE}assets/`);
  const group = new THREE.Group();
  group.name = `Authentic_${name}`;
  group.add(gltf.scene);
  group.traverse(object => {
    if (!object.isMesh) return;
    object.castShadow = true;
    object.receiveShadow = true;
    if (name === 'endoscope' || name === 'z1') object.layers.set(0);
    else object.layers.enable(1);
    // Reuse the source material; source dimensions and mesh topology are unchanged.
    if (name !== 'z1') {
      object.material.roughness = .25;
      object.material.metalness = .86;
    }
  });
  const joints = new Map();
  for (const specification of metadata.joints) {
    const node = group.getObjectByName(specification.name);
    if (!node) continue;
    joints.set(specification.name, {
      node, specification, rest: node.quaternion.clone(),
      axis: new THREE.Vector3(...specification.axis), angle: 0,
    });
  }
  return { name, group, joints, metadata };
}

const rotation = new THREE.Quaternion();
function setJoint(assembly, name, angle) {
  const joint = assembly.joints.get(name);
  if (!joint || joint.specification.type === 'fixed') return;
  const limit = joint.specification.limit;
  joint.angle = clamp(angle, limit?.lower ?? -Math.PI, limit?.upper ?? Math.PI);
  const frameLimit = assembly.frameBounds?.get(name);
  if (frameLimit) joint.angle = clamp(joint.angle, frameLimit.lower, frameLimit.upper);
  joint.node.quaternion.copy(joint.rest).multiply(rotation.setFromAxisAngle(joint.axis, joint.angle));
}

/**
 * CAD instruments retain a genuine articulated wrist and a rigid shaft.
 * The shaft's centre line intersects the fixed RCM port even with a bent wrist.
 * The actual source tool_tip_link, rather than a visual proxy, equals the command.
 */
class Instrument {
  constructor(assembly) {
    Object.assign(this, assembly);
    this.tipNode = this.group.getObjectByName('tool_tip_link');
    this.tipPosition = new THREE.Vector3();
    this.handlePosition = new THREE.Vector3();
    this.shaftDirection = new THREE.Vector3();
    this.rcmError = 0;
    this.localTip = new THREE.Vector3();
    this.desired = new THREE.Vector3();
    this.port = new THREE.Vector3();
    this.delta = new THREE.Vector3();
    this.localFromPort = new THREE.Vector3();
    this.alignment = new THREE.Quaternion();
    this.compensation = new THREE.Quaternion();
    this.inverseRoot = new THREE.Matrix4();
    this.scratch = new THREE.Vector3();
  }

  update(state) {
    setJoint(this, 'roll', state.wrist[2]);
    setJoint(this, 'wrist_pitch', state.wrist[0]);
    setJoint(this, 'wrist_yaw', state.wrist[1]);
    // The source instrument defines symmetric mimic joints at ± half jaw angle.
    const opening = clamp(state.jaw, 0, 1) * 1.1;
    setJoint(this, 'jaw', opening);
    setJoint(this, 'jaw_1', opening * .5);
    setJoint(this, 'jaw_2', -opening * .5);
    this.group.updateWorldMatrix(true, true);
    this.inverseRoot.copy(this.group.matrixWorld).invert();
    this.tipNode.getWorldPosition(this.localTip).applyMatrix4(this.inverseRoot);
    this.desired.fromArray(state.position);
    this.port.fromArray(state.port);
    this.delta.subVectors(this.desired, this.port);
    const distanceSquared = this.delta.lengthSq();
    const perpendicularSquared = this.localTip.x ** 2 + this.localTip.y ** 2;
    // The simulated minimum insertion is 65 mm; source wrists offset under 30 mm.
    // This guard keeps malformed imported states finite without changing mesh scale.
    const axialDistance = Math.sqrt(Math.max(1e-10, distanceSquared - perpendicularSquared));
    this.localFromPort.set(this.localTip.x, this.localTip.y, axialDistance).normalize();
    this.alignment.setFromUnitVectors(Z, this.delta.normalize());
    this.compensation.setFromUnitVectors(this.localFromPort, Z);
    this.group.quaternion.copy(this.alignment).multiply(this.compensation);
    this.scratch.copy(this.localTip).applyQuaternion(this.group.quaternion);
    this.group.position.copy(this.desired).sub(this.scratch);
    this.group.updateWorldMatrix(true, true);
    this.tipNode.getWorldPosition(this.tipPosition);
    this.handlePosition.copy(this.group.position);
    this.shaftDirection.copy(Z).applyQuaternion(this.group.quaternion);
    this.scratch.subVectors(this.port, this.group.position);
    this.scratch.addScaledVector(this.shaftDirection, -this.scratch.dot(this.shaftDirection));
    this.rcmError = this.scratch.length();
  }
}

class Scope {
  constructor(assembly) {
    Object.assign(this, assembly);
    this.tipNode = this.group.getObjectByName('tip_link');
    this.tipPosition = new THREE.Vector3();
    this.handlePosition = new THREE.Vector3();
    this.desired = new THREE.Vector3();
    this.direction = new THREE.Vector3();
    this.supportPosition = new THREE.Vector3();
    this.offset = new THREE.Vector3(...assembly.metadata.tipPositionAtZero);
    this.scratch = new THREE.Vector3();
    this.roll = new THREE.Quaternion();
  }

  update(state) {
    this.desired.fromArray(state.position);
    this.direction.fromArray(state.port).sub(this.desired).negate().normalize();
    this.group.quaternion.setFromUnitVectors(Z, this.direction)
      .multiply(this.roll.setFromAxisAngle(Z, state.roll));
    this.group.position.copy(this.desired).sub(this.scratch.copy(this.offset).applyQuaternion(this.group.quaternion));
    this.group.updateWorldMatrix(true, true);
    this.tipNode.getWorldPosition(this.tipPosition);
    this.handlePosition.copy(this.group.position);
    // The Z1 supports the actual rigid scope shaft 100 mm outside the port.
    // Gripping the remote camera adaptor would unnecessarily restrict insertion.
    this.supportPosition.fromArray(state.port).addScaledVector(this.direction, -.10);
  }
}

class ScopeArm {
  constructor(assembly, scene) {
    Object.assign(this, assembly);
    this.mount = new THREE.Group();
    this.mount.name = 'Custom_G1_Chest_Adapter';
    this.mount.position.set(0, 1.17, .47);
    // The real Z1 base bolts to a custom vertical chest plate, facing forward.
    this.mount.rotation.x = -Math.PI / 2;
    this.mount.add(this.group);
    scene.add(this.mount);
    const plate = new THREE.Mesh(
      new THREE.BoxGeometry(.10, .045, .065),
      new THREE.MeshStandardMaterial({ color: '#677a7e', metalness: .85, roughness: .3 }),
    );
    plate.name = 'Custom_Chest_Plate';
    plate.position.y = -.012;
    this.mount.add(plate);
    this.end = new THREE.Object3D();
    this.end.name = 'Custom_Endoscope_Coupler_TCP';
    this.end.position.set(.027, 0, 0);
    this.group.getObjectByName('link06').add(this.end);
    this.chain = [...this.joints.values()].filter(j => j.specification.type === 'revolute');
    this.position = new THREE.Vector3();
    this.pivot = new THREE.Vector3();
    this.axis = new THREE.Vector3();
    this.toEnd = new THREE.Vector3();
    this.toTarget = new THREE.Vector3();
    this.cross = new THREE.Vector3();
    this.quaternion = new THREE.Quaternion();
    this.lastTarget = new THREE.Vector3(Infinity, Infinity, Infinity);
    this.accumulated = 0;
    this.initialized = false;
    this.error = 0;
    this.stallTime = 0;
    this.recoveryCooldown = 0;
    this.recoveryPose = null;
    this.recoveries = 0;
    this.baseInverse = new THREE.Matrix4();
    this.baseTarget = new THREE.Vector3();
    this.frameBounds = null;
    // Source q2 and q3 have one-sided limits; start inside their valid ranges.
    [0, 1.4, -1.8, .35, 0, 0].forEach((q, i) => setJoint(this, `joint${i + 1}`, q));
  }

  solve(target, passes, maximumStep = .18) {
    for (let pass = 0; pass < passes; pass++) {
      for (let index = this.chain.length - 1; index >= 0; index--) {
        const joint = this.chain[index];
        this.mount.updateWorldMatrix(true, true);
        joint.node.getWorldPosition(this.pivot);
        this.end.getWorldPosition(this.position);
        joint.node.getWorldQuaternion(this.quaternion);
        this.axis.copy(joint.axis).applyQuaternion(this.quaternion).normalize();
        this.toEnd.subVectors(this.position, this.pivot);
        this.toTarget.subVectors(target, this.pivot);
        this.toEnd.addScaledVector(this.axis, -this.toEnd.dot(this.axis));
        this.toTarget.addScaledVector(this.axis, -this.toTarget.dot(this.axis));
        if (this.toEnd.lengthSq() < 1e-12 || this.toTarget.lengthSq() < 1e-12) continue;
        this.toEnd.normalize();
        this.toTarget.normalize();
        this.cross.crossVectors(this.toEnd, this.toTarget);
        const delta = Math.atan2(this.axis.dot(this.cross), clamp(this.toEnd.dot(this.toTarget), -1, 1));
        setJoint(this, joint.specification.name, joint.angle + clamp(delta, -maximumStep, maximumStep));
      }
      this.mount.updateWorldMatrix(true, true);
      this.end.getWorldPosition(this.position);
      if (this.position.distanceToSquared(target) < 1e-8) break;
    }
    this.end.getWorldPosition(this.position);
    this.error = this.position.distanceTo(target);
  }

  recover(target) {
    // Position CCD can stall against one-sided shoulder/elbow limits. Search a
    // small deterministic set offscreen, restore the current visible pose, then
    // travel towards the better solution with bounded joint speed.
    const saved = this.chain.map(joint => joint.angle);
    const visibleFrameBounds = this.frameBounds;
    this.frameBounds = null;
    this.mount.updateWorldMatrix(true, true);
    this.baseInverse.copy(this.group.getObjectByName('link00').matrixWorld).invert();
    this.baseTarget.copy(target).applyMatrix4(this.baseInverse);
    let bearing = Math.atan2(-this.baseTarget.y, -this.baseTarget.x);
    bearing = Math.atan2(Math.sin(bearing), Math.cos(bearing));
    const seeds = [
      [bearing, .35, -1.3, 0, 0, 0],
      [bearing, 1.4, -2.0, .3, 0, 0],
      [bearing, 2.6, -2.0, -.8, 0, 0],
      [bearing, 1.0, -.5, -.8, .7, 0],
      [bearing, .04, -.65, 1.45, 0, 0],
      [bearing, .15, -1.25, 1.45, -.6, 0],
    ];
    let bestError = this.error;
    let best = null;
    for (const seed of seeds) {
      seed.forEach((angle, index) => setJoint(this, `joint${index + 1}`, angle));
      this.solve(target, 36, .3);
      if (this.error < bestError) {
        bestError = this.error;
        best = this.chain.map(joint => joint.angle);
      }
      if (bestError < .0002) break;
    }
    saved.forEach((angle, index) => setJoint(this, this.chain[index].specification.name, angle));
    this.frameBounds = visibleFrameBounds;
    this.mount.updateWorldMatrix(true, true);
    this.end.getWorldPosition(this.position);
    this.error = this.position.distanceTo(target);
    if (best && bestError < this.error * .65) {
      this.recoveryPose = best;
      this.recoveries++;
    }
    this.recoveryCooldown = .65;
    this.stallTime = 0;
  }

  update(target, dt) {
    const elapsed = Math.min(.1, Math.max(0, dt || 0));
    this.accumulated += elapsed;
    this.recoveryCooldown = Math.max(0, this.recoveryCooldown - elapsed);
    if (!this.initialized) {
      this.solve(target, 80, .25);
      this.initialized = true;
      if (this.error > .003) this.recover(target);
    } else if (this.accumulated >= 1 / 30) {
      const frameTime = this.accumulated;
      this.accumulated = 0;
      this.frameBounds = new Map(this.chain.map(joint => {
        const delta = (joint.specification.limit?.velocity ?? Math.PI) * frameTime;
        return [joint.specification.name, { lower: joint.angle - delta, upper: joint.angle + delta }];
      }));
      if (this.recoveryPose) {
        let remaining = 0;
        for (let i = 0; i < this.chain.length; i++) {
          const joint = this.chain[i], delta = this.recoveryPose[i] - joint.angle;
          remaining += Math.abs(delta);
          setJoint(this, joint.specification.name, joint.angle + clamp(delta, -2.4 * frameTime, 2.4 * frameTime));
        }
        if (remaining < .025) this.recoveryPose = null;
      }
      if (this.recoveryPose) {
        this.mount.updateWorldMatrix(true, true);
        this.end.getWorldPosition(this.position);
        this.error = this.position.distanceTo(target);
      } else this.solve(target, 4);
      if (this.error < .002) {
        this.stallTime = 0;
        this.recoveryPose = null;
      } else {
        this.stallTime += frameTime;
        if (!this.recoveryPose && this.stallTime > .18 && this.recoveryCooldown === 0) this.recover(target);
      }
      this.frameBounds = null;
    }
    this.lastTarget.copy(target);
  }
}

/** Load local, licensed source CAD. The caller owns camera and UI integration. */
export async function loadAssemblies(scene) {
  const loader = new GLTFLoader();
  const [leftAsset, rightAsset, scopeAsset, armAsset] = await Promise.all([
    asset(loader, 'needle-driver'), asset(loader, 'scissors'),
    asset(loader, 'endoscope'), asset(loader, 'z1'),
  ]);
  const tools = { left: new Instrument(leftAsset), right: new Instrument(rightAsset) };
  const scope = new Scope(scopeAsset);
  const scopeArm = new ScopeArm(armAsset, scene);
  scene.add(tools.left.group, tools.right.group, scope.group);
  let disposed = false;
  const result = {
    loaded: true,
    toolNames: Object.freeze({ left: '持针钳', right: '单极弯剪' }),
    tools, scope, scopeArm,
    scopeMount: scopeArm.mount,
    scopeArmError: 0,
    scopeHandlePosition: scope.handlePosition,
    scopeSupportPosition: scope.supportPosition,
    toolTipPositions: { left: tools.left.tipPosition, right: tools.right.tipPosition },
    toolHandlePositions: { left: tools.left.handlePosition, right: tools.right.handlePosition },
    toolRCMErrors: { left: 0, right: 0 },
    update(state, dt = 1 / 60) {
      if (disposed) return;
      for (const side of ['left', 'right']) {
        tools[side].update(state.tools[side]);
        result.toolRCMErrors[side] = tools[side].rcmError;
      }
      scope.update(state.scope);
      scopeArm.update(scope.supportPosition, dt);
      result.scopeArmError = scopeArm.error;
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      const geometries = new Set(), materials = new Set();
      for (const group of [tools.left.group, tools.right.group, scope.group, scopeArm.mount]) {
        group.removeFromParent();
        group.traverse(object => {
          if (object.geometry) geometries.add(object.geometry);
          if (object.material) for (const material of Array.isArray(object.material) ? object.material : [object.material]) materials.add(material);
        });
      }
      geometries.forEach(geometry => geometry.dispose());
      materials.forEach(material => material.dispose());
    },
  };
  return result;
}
