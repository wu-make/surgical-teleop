import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const BASE = import.meta.env?.BASE_URL ?? '/';
const Z = new THREE.Vector3(0, 0, 1);
const clamp = THREE.MathUtils.clamp;

// The source G1 rubber hands have fixed, slightly curved fingers. A strapped
// palm saddle supplies the mechanical grip; source fingers are never animated.
export const G1_GRIP = Object.freeze({
  left: Object.freeze([.085, -.026, 0]), right: Object.freeze([.085, .026, 0]),
  proximalShaftZ: -.095, lateralBallOffset: .060,
  clevisDepth: .075, clevisRadius: .0035,
});

const displayMaterial = (color, metalness = .65, roughness = .35) => new THREE.MeshStandardMaterial({ color, metalness, roughness });
function detail(parent, geometry, material, position = [0, 0, 0]) {
  const object = new THREE.Mesh(geometry, material);
  object.position.set(...position);
  object.castShadow = object.receiveShadow = true;
  object.layers.set(0);
  parent.add(object);
  return object;
}

// These visible quick-change fixtures are explicitly custom interface parts.
// None of the manufacturer's robot, wrist, shaft or jaw geometry is stretched.
function makeToolCoupler(parent, color) {
  const group = new THREE.Group();
  group.name = 'Concept_Custom_Quick_Change_Instrument_Coupler';
  parent.add(group);
  const alloy = displayMaterial('#a8b4b5', .78, .3), dark = displayMaterial('#1b2529', .18, .5);
  detail(group, new RoundedBoxGeometry(.034, .039, .051, 2, .004), dark, [0, 0, -.022]);
  const sleeve = detail(group, new THREE.CylinderGeometry(.012, .013, .029, 24), alloy, [0, 0, .013]);
  sleeve.rotation.x = Math.PI / 2;
  for (const z of [-.045, .027]) detail(group, new THREE.TorusGeometry(.013, .0017, 8, 28), alloy, [0, 0, z]);
  detail(group, new THREE.TorusGeometry(.0134, .0012, 8, 28), displayMaterial(color, .22, .42), [0, 0, .021]);
  for (const x of [-.012, .012]) for (const y of [-.015, .015]) {
    const screw = detail(group, new THREE.CylinderGeometry(.0017, .0017, .002, 8), alloy, [x, y, -.048]);
    screw.rotation.x = Math.PI / 2;
  }
  return group;
}

function makeProximalGrip(parent, side, color) {
  const clampGroup = new THREE.Group();
  clampGroup.name = `Concept_${side}_Proximal_Shaft_Clamp`;
  clampGroup.position.z = G1_GRIP.proximalShaftZ; parent.add(clampGroup);
  const alloy = displayMaterial('#b2c0c3', .76, .28), dark = displayMaterial('#26373a', .15, .54);
  const housing = detail(clampGroup, new RoundedBoxGeometry(.021, .025, .029, 2, .003), dark);
  housing.name = 'Custom_Shaft_Clamp_Housing';
  for (const z of [-.012, .012]) detail(clampGroup, new THREE.TorusGeometry(.0071, .0017, 8, 24), alloy, [0, 0, z]);
  const sign = side === 'left' ? -1 : 1;
  // A fixed-size U clevis goes around the source palm. Its only passive motion
  // is clocking about the two unchanged end centres; no segment telescopes.
  const clevis = new THREE.Group(); clevis.name = 'Custom_Fixed_Size_Palm_Clearance_Clevis'; clampGroup.add(clevis);
  for (const x of [0, sign * G1_GRIP.lateralBallOffset]) detail(clevis, new THREE.CylinderGeometry(G1_GRIP.clevisRadius, G1_GRIP.clevisRadius, G1_GRIP.clevisDepth, 12), alloy, [x, G1_GRIP.clevisDepth * .5, 0]);
  const bridge = detail(clevis, new THREE.CylinderGeometry(G1_GRIP.clevisRadius, G1_GRIP.clevisRadius, G1_GRIP.lateralBallOffset, 12), alloy, [sign * G1_GRIP.lateralBallOffset * .5, G1_GRIP.clevisDepth, 0]); bridge.rotation.z = Math.PI / 2;
  for (const x of [0, sign * G1_GRIP.lateralBallOffset]) detail(clevis, new THREE.SphereGeometry(G1_GRIP.clevisRadius, 12, 8), alloy, [x, G1_GRIP.clevisDepth, 0]);
  const ball = detail(clampGroup, new THREE.SphereGeometry(.008, 18, 12), alloy, [sign * G1_GRIP.lateralBallOffset, 0, 0]);
  ball.name = 'Custom_Passive_Universal_Grip_Ball';
  detail(clampGroup, new THREE.TorusGeometry(.0073, .0012, 6, 20), displayMaterial(color, .2, .43), [0, 0, -.014]);
  return clampGroup;
}

function palmClearanceCloud(hand, grip) {
  hand.updateWorldMatrix(true, true);
  const inverse = hand.matrixWorld.clone().invert(), matrix = new THREE.Matrix4(), point = new THREE.Vector3(), cells = new Map();
  hand.traverse(node => {
    if (!node.isMesh) return;
    matrix.multiplyMatrices(inverse, node.matrixWorld); const positions = node.geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      point.fromBufferAttribute(positions, i).applyMatrix4(matrix);
      const key = `${Math.floor(point.x / .008)},${Math.floor(point.y / .008)},${Math.floor(point.z / .008)}`;
      if (!cells.has(key)) cells.set(key, [point.x - grip[0], point.y - grip[1], point.z - grip[2]]);
    }
  });
  return new Float64Array([...cells.values()].flat());
}

function clevisClearance(points, theta, endpoint) {
  const cosine = Math.cos(theta), sine = Math.sin(theta), height = G1_GRIP.clevisDepth;
  let minimum = Infinity;
  for (let i = 0; i < points.length; i += 3) {
    const x = points[i], z = points[i + 2] - G1_GRIP.proximalShaftZ;
    const y = points[i + 1] * cosine + z * sine, sideways = -points[i + 1] * sine + z * cosine;
    const along = Math.max(0, -y, y - height), across = Math.max(Math.min(0, endpoint) - x, 0, x - Math.max(0, endpoint));
    minimum = Math.min(minimum, x * x + along * along + sideways * sideways,
      (x - endpoint) ** 2 + along * along + sideways * sideways, across * across + (y - height) ** 2 + sideways * sideways);
  }
  return Math.sqrt(minimum);
}

function makePalmSaddle(parent, side, color) {
  const group = new THREE.Group(); group.name = `Concept_${side}_Strapped_Palm_Grip`; parent.add(group);
  const sign = side === 'left' ? -1 : 1;
  const dark = displayMaterial('#1f3032', .12, .62), alloy = displayMaterial('#afbdc0', .72, .3);
  const bar = detail(group, new THREE.CylinderGeometry(.0105, .0105, .061, 20), dark); bar.rotation.x = Math.PI / 2;
  bar.name = 'Custom_Palm_Transverse_Grip_Bar';
  for (const z of [-.03, .03]) detail(group, new THREE.SphereGeometry(.0107, 12, 8), dark, [0, 0, z]);
  // Local origin is the measured grip-bar centre, not the buried hand origin.
  detail(group, new RoundedBoxGeometry(.049, .008, .061, 2, .004), alloy, [-.03, -sign * .008, 0]);
  for (const x of [-.052, -.015]) {
    // Two closed, finite straps wrap the fixed hand and anchor its palm plate.
    detail(group, new RoundedBoxGeometry(.009, .004, .066, 2, .0015), dark, [x, -sign * .011, 0]);
    detail(group, new RoundedBoxGeometry(.009, .004, .066, 2, .0015), dark, [x, -sign * .044, 0]);
    for (const z of [-.031, .031]) detail(group, new RoundedBoxGeometry(.009, .037, .004, 2, .0015), dark, [x, -sign * .0275, z]);
  }
  detail(group, new THREE.TorusGeometry(.0085, .0016, 8, 24), displayMaterial(color, .25, .4));
  return group;
}

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
      object.material.roughness = .32;
      object.material.metalness = .78;
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
function setJoint(assembly, name, angle, unrestricted = false) {
  const joint = assembly.joints.get(name);
  if (!joint || joint.specification.type === 'fixed') return;
  const limit = joint.specification.limit;
  if (!Number.isFinite(angle)) return;
  joint.angle = unrestricted ? angle : clamp(angle, limit?.lower ?? -Math.PI, limit?.upper ?? Math.PI);
  const frameLimit = assembly.frameBounds?.get(name);
  if (frameLimit) joint.angle = clamp(joint.angle, frameLimit.lower, frameLimit.upper);
  // Reduce only the rendered phase to retain precision after many full turns.
  const phase = Math.atan2(Math.sin(joint.angle), Math.cos(joint.angle));
  joint.node.quaternion.copy(joint.rest).multiply(rotation.setFromAxisAngle(joint.axis, phase));
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
    this.cuttingDirection = new THREE.Vector3(0, 0, 1);
    this.tipQuaternion = new THREE.Quaternion();
    this.handlePosition = new THREE.Vector3();
    this.gripPosition = new THREE.Vector3();
    this.gripLocal = new THREE.Vector3(assembly.name === 'needle-driver' ? -G1_GRIP.lateralBallOffset : G1_GRIP.lateralBallOffset, 0, G1_GRIP.proximalShaftZ);
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
    this.previousDirection = new THREE.Vector3(0, 0, -1);
    this.transport = new THREE.Quaternion();
    this.nextAlignment = new THREE.Quaternion();
    this.initialized = false;
    this.rcmFeasible = true;
    this.coupler = makeToolCoupler(this.group, assembly.name === 'needle-driver' ? '#5faaa9' : '#c3a46b');
    this.proximalGrip = makeProximalGrip(this.group, assembly.name === 'needle-driver' ? 'left' : 'right', assembly.name === 'needle-driver' ? '#5faaa9' : '#c3a46b');
  }

  update(state) {
    setJoint(this, 'roll', state.wrist[2], true);
    setJoint(this, 'wrist_pitch', state.wrist[0], true);
    setJoint(this, 'wrist_yaw', state.wrist[1], true);
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
    // A bent rigid wrist cannot intersect a port closer than its lateral offset.
    // In this singular region keep the TCP exact, retain continuous orientation,
    // and report the RCM mismatch; never reject or rewrite the user's command.
    this.rcmFeasible = distanceSquared + 1e-12 >= perpendicularSquared;
    const axialDistance = Math.sqrt(Math.max(1e-10, distanceSquared - perpendicularSquared));
    this.localFromPort.set(this.localTip.x, this.localTip.y, axialDistance).normalize();
    if (distanceSquared > 1e-12) {
      this.delta.normalize();
      if (!this.initialized) this.alignment.setFromUnitVectors(Z, this.delta);
      else {
        this.nextAlignment.copy(this.alignment).premultiply(this.transport.setFromUnitVectors(this.previousDirection, this.delta));
        const singularBlend = THREE.MathUtils.smoothstep(Math.sqrt(distanceSquared), .003, .020);
        this.alignment.slerp(this.nextAlignment, singularBlend);
      }
      this.previousDirection.copy(Z).applyQuaternion(this.alignment);
      this.initialized = true;
    } else if (!this.initialized) {
      this.alignment.setFromUnitVectors(Z, this.previousDirection);
      this.initialized = true;
    }
    this.compensation.setFromUnitVectors(this.localFromPort, Z);
    this.group.quaternion.copy(this.alignment).multiply(this.compensation);
    this.scratch.copy(this.localTip).applyQuaternion(this.group.quaternion);
    this.group.position.copy(this.desired).sub(this.scratch);
    this.group.updateWorldMatrix(true, true);
    this.tipNode.getWorldPosition(this.tipPosition);
    this.tipNode.getWorldQuaternion(this.tipQuaternion);
    this.cuttingDirection.copy(Z).applyQuaternion(this.tipQuaternion).normalize();
    this.handlePosition.copy(this.group.position);
    this.gripPosition.copy(this.gripLocal).applyQuaternion(this.group.quaternion).add(this.group.position);
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
    this.previousDirection = new THREE.Vector3(0, -1, 0);
    this.transport = new THREE.Quaternion();
    this.alignment = new THREE.Quaternion();
    this.initialized = false;
    this.supportPosition = new THREE.Vector3();
    this.offset = new THREE.Vector3(...assembly.metadata.tipPositionAtZero);
    this.scratch = new THREE.Vector3();
    this.roll = new THREE.Quaternion();
  }

  update(state) {
    this.desired.fromArray(state.position);
    this.direction.fromArray(state.port).sub(this.desired).negate();
    if (this.direction.lengthSq() < 1e-12) this.direction.copy(this.previousDirection);
    else this.direction.normalize();
    if (!this.initialized) this.alignment.setFromUnitVectors(Z, this.direction);
    else this.alignment.premultiply(this.transport.setFromUnitVectors(this.previousDirection, this.direction));
    this.previousDirection.copy(this.direction);
    this.initialized = true;
    this.group.quaternion.copy(this.alignment)
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
    const alloy = displayMaterial('#8f9ea1', .78, .32), dark = displayMaterial('#263336', .2, .56);
    detail(this.mount, new RoundedBoxGeometry(.14, .014, .12, 2, .005), dark, [0, -.09, 0]).name = 'Custom_Chest_Backplate';
    detail(this.mount, new RoundedBoxGeometry(.105, .012, .085, 2, .004), alloy).name = 'Custom_Z1_Baseplate';
    for (const x of [-.047, .047]) for (const z of [-.034, .034]) {
      detail(this.mount, new THREE.CylinderGeometry(.006, .006, .086, 12), alloy, [x, -.047, z]);
      detail(this.mount, new THREE.CylinderGeometry(.004, .004, .004, 8), dark, [x, .008, z]);
    }
    const flange = detail(this.mount, new THREE.TorusGeometry(.034, .003, 8, 32), dark, [0, .008, 0]);
    flange.rotation.x = Math.PI / 2;
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
      this.accumulated = 0;
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
  const connections = new THREE.Group();
  connections.name = 'Concept_Virtual_Master_Slave_Connections';
  scene.add(connections);
  const handConnections = {};
  for (const [side, color] of [['left', '#5eaaa9'], ['right', '#b9a06f']]) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
    const line = new THREE.Line(geometry, new THREE.LineDashedMaterial({ color, transparent: true, opacity: .6, dashSize: .012, gapSize: .009, depthWrite: false }));
    line.name = `Concept_${side}_Virtual_Teleoperation_Link`;
    line.layers.set(0);
    const controller = detail(connections, new THREE.TorusGeometry(.014, .0024, 8, 24), displayMaterial(color, .28, .4));
    controller.name = `Concept_${side}_Master_Grip_Indicator`;
    line.visible = controller.visible = false;
    connections.add(line);
    const saddle = makePalmSaddle(connections, side, color); saddle.visible = false;
    handConnections[side] = { line, controller, saddle, clevis: tools[side].proximalGrip.getObjectByName('Custom_Fixed_Size_Palm_Clearance_Clevis'),
      sourceHand: null, cloud: null, transformed: null, inverse: new THREE.Quaternion(), relative: new THREE.Quaternion(), point: new THREE.Vector3(), origin: new THREE.Vector3(), initialized: false };
  }
  const scopeCollar = new THREE.Group();
  scopeCollar.name = 'Custom_Universal_Endoscope_Shaft_Clamp';
  scene.add(scopeCollar);
  detail(scopeCollar, new THREE.TorusGeometry(.0065, .002, 8, 28), displayMaterial('#879b9d', .78, .3));
  detail(scopeCollar, new RoundedBoxGeometry(.014, .011, .016, 2, .002), displayMaterial('#28373a', .2, .52), [.011, 0, 0]);
  let disposed = false;
  let gripFrameTime = 1 / 60;
  const result = {
    loaded: true,
    toolNames: Object.freeze({ left: '持针钳', right: '单极弯剪' }),
    tools, scope, scopeArm,
    scopeMount: scopeArm.mount,
    scopeArmError: 0,
    scopeHandlePosition: scope.handlePosition,
    scopeSupportPosition: scope.supportPosition,
    toolTipPositions: { left: tools.left.tipPosition, right: tools.right.tipPosition },
    toolDirections: { left: tools.left.cuttingDirection, right: tools.right.cuttingDirection },
    toolHandlePositions: { left: tools.left.handlePosition, right: tools.right.handlePosition },
    toolGripPositions: { left: tools.left.gripPosition, right: tools.right.gripPosition },
    handGripPositions: { left: new THREE.Vector3(), right: new THREE.Vector3() },
    handGripQuaternions: { left: new THREE.Quaternion(), right: new THREE.Quaternion() },
    toolRCMErrors: { left: 0, right: 0 },
    toolRCMFeasible: { left: true, right: true },
    connectionModes: { left: 'direct', right: 'direct' },
    conceptDecoupled: false,
    resetPose() {
      tools.left.initialized=tools.right.initialized=scope.initialized=false;
      scopeArm.initialized=false;scopeArm.recoveryPose=null;
      scopeArm.accumulated=0;scopeArm.frameBounds=null;scopeArm.stallTime=0;scopeArm.recoveryCooldown=0;
      for(const connection of Object.values(handConnections))connection.initialized=false;
    },
    connectHands(positions, errors, quaternions) {
      result.conceptDecoupled = false;
      for (const side of ['left', 'right']) {
        const connection = handConnections[side], hand = positions[side];
        const virtual = (errors[side] ?? 0) > .003;
        result.connectionModes[side] = virtual ? 'virtual' : 'direct';
        result.conceptDecoupled ||= virtual;
        connection.line.visible = connection.controller.visible = virtual;
        if (!hand) continue;
        const handle = tools[side].gripPosition;
        const attribute = connection.line.geometry.attributes.position;
        attribute.setXYZ(0, hand.x, hand.y, hand.z);
        attribute.setXYZ(1, handle.x, handle.y, handle.z);
        attribute.needsUpdate = true;
        connection.line.computeLineDistances();
        connection.line.geometry.computeBoundingSphere();
        connection.controller.position.copy(hand);
        const orientation = quaternions?.[side] ?? tools[side].group.quaternion;
        connection.controller.quaternion.copy(orientation);
        connection.saddle.visible = true;
        connection.saddle.position.copy(hand); connection.saddle.quaternion.copy(orientation);
        result.handGripPositions[side].copy(hand); result.handGripQuaternions[side].copy(orientation);
        // Cache a sparse cloud from the actual loaded G1 palm. It selects the
        // passive U-clevis clock; the source robot and tool geometry stay rigid.
        connection.sourceHand ??= scene.getObjectByName(`${side}_rubber_hand`);
        if (connection.sourceHand && !connection.cloud) { connection.cloud = palmClearanceCloud(connection.sourceHand, G1_GRIP[side]); connection.transformed = new Float64Array(connection.cloud.length); }
        if (connection.cloud) {
          connection.inverse.copy(tools[side].group.quaternion).invert(); connection.relative.copy(connection.inverse).multiply(orientation);
          connection.origin.copy(hand).sub(tools[side].group.position).applyQuaternion(connection.inverse);
          for (let i = 0; i < connection.cloud.length; i += 3) { connection.point.fromArray(connection.cloud, i).applyQuaternion(connection.relative).add(connection.origin); connection.point.toArray(connection.transformed, i); }
          const previous = connection.clevis.rotation.x, endpoint = tools[side].gripLocal.x;
          let chosen = previous, best = clevisClearance(connection.transformed, previous, endpoint);
          if (best < .010) for (let sample = 1; sample <= 128; sample++) {
            const candidate = previous + Math.ceil(sample / 2) * (sample % 2 ? 1 : -1) * Math.PI / 64;
            const clearance = clevisClearance(connection.transformed, candidate, endpoint);
            if (clearance > best) { best = clearance; chosen = candidate; }
            if (clearance >= .010) break;
          }
          const delta = Math.atan2(Math.sin(chosen - previous), Math.cos(chosen - previous));
          connection.clevis.rotation.x = connection.initialized ? previous + clamp(delta, -4.8 * gripFrameTime, 4.8 * gripFrameTime) : chosen;
          connection.initialized = true;
        }
      }
    },
    update(state, dt = 1 / 60) {
      if (disposed) return;
      gripFrameTime = clamp(Number.isFinite(dt) ? dt : 1 / 60, .001, .05);
      for (const side of ['left', 'right']) {
        tools[side].update(state.tools[side]);
        result.toolRCMErrors[side] = tools[side].rcmError;
        result.toolRCMFeasible[side] = tools[side].rcmFeasible;
      }
      scope.update(state.scope);
      scopeArm.update(scope.supportPosition, dt);
      result.scopeArmError = scopeArm.error;
      scopeCollar.position.copy(scope.supportPosition);
      scopeCollar.quaternion.setFromUnitVectors(Z, scope.direction);
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      const geometries = new Set(), materials = new Set();
      for (const group of [tools.left.group, tools.right.group, scope.group, scopeArm.mount, connections, scopeCollar]) {
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
