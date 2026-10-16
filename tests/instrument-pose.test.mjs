import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import * as THREE from 'three';
import { instrumentPose, instrumentCapsules, resolveInstrumentAlignment, slerpInstrumentAlignment } from '../src/instrument-pose.js';
import { sourceInstrumentContact } from '../src/instrument-contact.js';
import { INSTRUMENT_COLLISION_DATA } from '../src/instrument-collision-data.js';

const Z = new THREE.Vector3(0, 0, 1), TAU = Math.PI * 2;
const reference = {};
for (const name of ['needle-driver', 'scissors']) {
  // Read matrices from the actual shipped GLB and joint axes from its separate
  // metadata. Do not call production Instrument.update or its shared FK helper.
  const buffer = await readFile(new URL(`../public/assets/${name}.glb`, import.meta.url));
  const json = JSON.parse(buffer.subarray(20, 20 + buffer.readUInt32LE(12)).toString());
  const metadata = JSON.parse(await readFile(new URL(`../public/assets/${name}-kinematics.json`, import.meta.url)));
  const objects = json.nodes.map(node => {
    const object = new THREE.Object3D(); object.name = node.name;
    if (node.matrix) new THREE.Matrix4().fromArray(node.matrix).decompose(object.position, object.quaternion, object.scale);
    else {
      object.position.fromArray(node.translation ?? [0, 0, 0]);
      object.quaternion.fromArray(node.rotation ?? [0, 0, 0, 1]);
      object.scale.fromArray(node.scale ?? [1, 1, 1]);
    }
    return object;
  });
  json.nodes.forEach((node, index) => node.children?.forEach(child => objects[index].add(objects[child])));
  const group = new THREE.Group();
  for (const index of json.scenes[json.scene ?? 0].nodes) group.add(objects[index]);
  reference[name] = { group, metadata, joints: metadata.joints.map(joint => ({
    ...joint, node: group.getObjectByName(joint.name), rest: group.getObjectByName(joint.name).quaternion.clone(),
  })) };
}

function vectorClose(actual, expected, tolerance = 1e-9, message = 'source vector mismatch') {
  const distance = Math.hypot(...actual.map((value, i) => value - expected[i]));
  assert.ok(distance < tolerance, `${message}: ${distance}`);
}
function quaternionClose(actual, expected, message) {
  const dot = Math.abs(actual.reduce((sum, value, i) => sum + value * expected[i], 0));
  assert.ok(Math.abs(dot - 1) < 2e-10, `${message}: quaternion dot ${dot}`);
}

function independentSource(tool) {
  const model = reference[tool.instrument], group = model.group;
  group.position.set(0, 0, 0); group.quaternion.identity();
  const jaw = Math.max(0, Math.min(1, tool.jaw)) * 1.1;
  const angle = joint => joint.name === 'roll' ? tool.wrist[2]
    : joint.name === 'wrist_pitch' ? tool.wrist[0]
      : joint.name === 'wrist_yaw' ? tool.wrist[1]
        : joint.mimic ? jaw * Number(joint.mimic.multiplier) : joint.name === 'jaw' ? jaw : 0;
  for (const joint of model.joints) {
    if (joint.type === 'fixed') continue;
    const phase = Math.atan2(Math.sin(angle(joint)), Math.cos(angle(joint)));
    joint.node.quaternion.copy(joint.rest).multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(...joint.axis), phase));
  }
  group.updateMatrixWorld(true);
  const localTip = group.getObjectByName('tool_tip_link').getWorldPosition(new THREE.Vector3());
  const links = {};
  for (const name of ['adaptor_link', ...model.metadata.joints.map(joint => joint.child)]) {
    const link = group.getObjectByName(name);
    links[name] = { position: link.getWorldPosition(new THREE.Vector3()).toArray(),
      quaternion: link.getWorldQuaternion(new THREE.Quaternion()).toArray() };
  }
  const desired = new THREE.Vector3(...tool.position), delta = desired.clone().sub(new THREE.Vector3(...tool.port));
  let alignment;
  if (tool.alignment) alignment = new THREE.Quaternion(...tool.alignment).normalize();
  else alignment = new THREE.Quaternion().setFromUnitVectors(Z, delta.length() > 1e-12 ? delta.clone().normalize() : Z);
  const transverse = localTip.x ** 2 + localTip.y ** 2;
  const fromPort = new THREE.Vector3(localTip.x, localTip.y, Math.sqrt(Math.max(1e-10, delta.lengthSq() - transverse))).normalize();
  group.quaternion.copy(alignment).multiply(new THREE.Quaternion().setFromUnitVectors(fromPort, Z));
  group.position.copy(desired).sub(localTip.clone().applyQuaternion(group.quaternion));
  group.updateMatrixWorld(true);
  return { group, links, alignment, rcmFeasible: delta.lengthSq() + 1e-12 >= transverse };
}

let seed = 20261016;
function random() { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 2 ** 32; }
function randomTool(name) {
  const sign = name === 'needle-driver' ? -1 : 1;
  return { instrument: name, port: [.08 * sign, 1.18, .1],
    position: [(random() - .5) * .34, .99 + random() * .22, -.16 + random() * .34],
    wrist: Array.from({ length: 3 }, () => (random() - .5) * 16 * Math.PI), jaw: random() };
}

test('shared FK matches the independent GLB hierarchy at arbitrary wrist, jaw and roll poses', () => {
  for (const name of Object.keys(reference)) for (let i = 0; i < 140; i++) {
    const tool = randomTool(name);
    if (i % 2) tool.alignment = new THREE.Quaternion().setFromEuler(new THREE.Euler(random() * 2, random() * 2, random() * 2)).toArray();
    const expected = independentSource(tool), actual = instrumentPose(tool);
    for (const [link, pose] of Object.entries(expected.links)) {
      vectorClose(actual.links[link].position, pose.position, 2e-10, `${name}/${link} local position`);
      quaternionClose(actual.links[link].quaternion, pose.quaternion, `${name}/${link} local rotation`);
    }
    vectorClose(actual.position, expected.group.position.toArray(), 2e-9, 'independent source root position');
    quaternionClose(actual.quaternion, expected.group.quaternion.toArray(), 'independent source root rotation');
    quaternionClose(actual.alignment, expected.alignment.toArray(), 'transported source frame');
    assert.equal(actual.rcmFeasible, expected.rcmFeasible);
    vectorClose(expected.group.getObjectByName('tool_tip_link').getWorldPosition(new THREE.Vector3()).toArray(), tool.position, 2e-9, 'actual source TCP');
  }
});

test('every world contact capsule follows its actual animated source link matrix', () => {
  for (const name of Object.keys(reference)) for (let i = 0; i < 80; i++) {
    const tool = randomTool(name), expected = independentSource(tool), actual = instrumentCapsules(tool);
    INSTRUMENT_COLLISION_DATA[name].capsules.forEach((capsule, index) => {
      const matrix = expected.group.getObjectByName(capsule.link).matrixWorld;
      vectorClose(actual[index].a, new THREE.Vector3(...capsule.a).applyMatrix4(matrix).toArray(), 2e-9, `${capsule.id} first endpoint`);
      vectorClose(actual[index].b, new THREE.Vector3(...capsule.b).applyMatrix4(matrix).toArray(), 2e-9, `${capsule.id} second endpoint`);
      assert.equal(actual[index].radius, capsule.radius);
      for (let axis = 0; axis < 3; axis++) {
        assert.ok(actual[index].min[axis] <= Math.min(actual[index].a[axis], actual[index].b[axis]) - capsule.radius + 1e-12);
        assert.ok(actual[index].max[axis] >= Math.max(actual[index].a[axis], actual[index].b[axis]) + capsule.radius - 1e-12);
      }
    });
  }
});

test('each wrist axis supports many positive and negative complete turns without geometric drift', () => {
  for (const name of Object.keys(reference)) for (const axis of [0, 1, 2]) for (const turns of [-10000, -64, 64, 10000]) {
    const initial = { instrument: name, port: [name === 'needle-driver' ? -.08 : .08, 1.18, .1],
      position: [.025, 1.09, -.02], wrist: [.32, -.47, .81], jaw: .72 };
    const rotated = structuredClone(initial); rotated.wrist[axis] += turns * TAU;
    const expected = instrumentCapsules(initial), actual = instrumentCapsules(rotated);
    for (let i = 0; i < actual.length; i++) {
      vectorClose(actual[i].a, expected[i].a, 2e-9, `${axis}/${turns} turns first endpoint`);
      vectorClose(actual[i].b, expected[i].b, 2e-9, `${axis}/${turns} turns second endpoint`);
    }
    const source = independentSource(rotated), pose = instrumentPose(rotated);
    vectorClose(pose.position, source.group.position.toArray(), 2e-9, 'large-turn independent GLB pose');
    quaternionClose(pose.quaternion, source.group.quaternion.toArray(), 'large-turn independent GLB orientation');
  }
});

test('near and at the RCM singularity, finite source geometry keeps the exact commanded TCP', () => {
  for (const name of Object.keys(reference)) for (const offset of [[0, 0, 0], [1e-14, -1e-14, 0], [1e-7, 0, -1e-7], [.0005, -.0002, .0001]]) {
    const port = [name === 'needle-driver' ? -.08 : .08, 1.18, .1];
    const tool = { instrument: name, port, position: port.map((value, i) => value + offset[i]), wrist: [1.43, -1.37, 81 * TAU + .7], jaw: .85,
      alignment: new THREE.Quaternion().setFromEuler(new THREE.Euler(.3, -.7, .2)).toArray() };
    const pose = instrumentPose(tool), capsules = instrumentCapsules(tool);
    assert.ok([...pose.position, ...pose.quaternion, ...pose.alignment, ...pose.shaftDirection].every(Number.isFinite));
    assert.ok(Math.abs(new THREE.Quaternion(...pose.quaternion).length() - 1) < 1e-10);
    assert.ok(capsules.flatMap(capsule => [...capsule.a, ...capsule.b, ...capsule.min, ...capsule.max]).every(Number.isFinite));
    const source = independentSource(tool);
    // Inside the infeasible RCM region the root orientation is non-unique.
    // Apply the returned finite root to the independently articulated GLB:
    // validate the actual source TCP and contact geometry, rather than forcing
    // a radial direction that would flip by 180 degrees when crossing the port.
    source.group.position.fromArray(pose.position); source.group.quaternion.fromArray(pose.quaternion); source.group.updateMatrixWorld(true);
    vectorClose(source.group.getObjectByName('tool_tip_link').getWorldPosition(new THREE.Vector3()).toArray(), tool.position, 2e-9, 'singular source TCP');
    INSTRUMENT_COLLISION_DATA[name].capsules.forEach((capsule, index) => {
      const matrix = source.group.getObjectByName(capsule.link).matrixWorld;
      vectorClose(capsules[index].a, new THREE.Vector3(...capsule.a).applyMatrix4(matrix).toArray(), 2e-9, 'singular source capsule first endpoint');
      vectorClose(capsules[index].b, new THREE.Vector3(...capsule.b).applyMatrix4(matrix).toArray(), 2e-9, 'singular source capsule second endpoint');
    });
    assert.equal(pose.rcmFeasible, false, 'infeasible RCM is honestly reported without a workspace fence');
  }
  for (const name of Object.keys(reference)) {
    const port = [name === 'needle-driver' ? -.08 : .08, 1.18, .1];
    const alignment = new THREE.Quaternion().setFromEuler(new THREE.Euler(.3, -.7, .2)).toArray();
    let previous;
    for (let step = 0; step <= 80; step++) {
      const offset = -.002 + step * .00005;
      const tool = { instrument: name, port, position: [port[0], port[1], port[2] + offset],
        wrist: [1.43, -1.37, 81 * TAU + .7], jaw: .85, alignment };
      const pose = instrumentPose(tool), quaternion = new THREE.Quaternion(...pose.quaternion);
      if (previous) assert.ok(quaternion.angleTo(previous) < .05, 'crossing within 2 mm of the port must preserve continuous wrist orientation');
      previous = quaternion;
      const source = independentSource(tool);
      source.group.position.fromArray(pose.position); source.group.quaternion.copy(quaternion); source.group.updateMatrixWorld(true);
      vectorClose(source.group.getObjectByName('tool_tip_link').getWorldPosition(new THREE.Vector3()).toArray(), tool.position, 2e-9, 'port-crossing source TCP');
    }
  }
});

test('reported user scene retains its real 11.6 mm jaw clearance instead of the old TCP-sphere block', () => {
  // Exact numerical tool poses from the user report; independent of ignored QA
  // files so the regression also runs in a fresh checkout and in CI.
  const left = { instrument: 'needle-driver', port: [-.08, 1.18, .1],
    position: [.006953776536535539, 1.105, .0006800918698292505], wrist: [0, 0, 0], jaw: .6 };
  const right = { instrument: 'scissors', port: [.08, 1.18, .1],
    position: [.019064760067993465, 1.108, .008673961662072275], wrist: [0, 0, 0], jaw: .6 };
  const contact = sourceInstrumentContact(left, right);
  assert.ok(Math.abs(contact.clearance - .011603560801702443) < 2e-9, `source clearance ${contact.clearance}`);
  assert.equal(contact.pair.left.part, 'jaw'); assert.equal(contact.pair.right.part, 'jaw');
  assert.ok(contact.clearance > .01, 'a centimetre of visible free space cannot be reported as contact');
});

test('resolved frames are idempotent through contact, commit, rendering and history in the 3–20 mm transition', () => {
  for (const name of Object.keys(reference)) for (const distance of [0, .002, .003, .005, .012, .019, .02, .03, .16]) {
    const port = [name === 'needle-driver' ? -.08 : .08, 1.18, .1];
    const tool = { instrument: name, port, position: [port[0] + distance, port[1], port[2]],
      wrist: [.6, -.9, 4 * TAU + .3], jaw: .6,
      alignment: new THREE.Quaternion().setFromUnitVectors(Z, new THREE.Vector3(-.055, -.075, -.1).normalize()).toArray() };
    const seed = structuredClone(tool), alignment = resolveInstrumentAlignment(tool, tool.alignment);
    const resolved = { ...tool, alignment }, expected = instrumentPose(resolved), expectedCapsules = instrumentCapsules(resolved);
    assert.deepEqual(tool, seed, 'resolving a candidate must not modify the saved start frame');
    for (let read = 0; read < 12; read++) {
      const pose = instrumentPose(resolved);
      assert.deepEqual(pose, expected, 'contact or render queried a stationary frame more than once');
      assert.deepEqual(instrumentCapsules(resolved), expectedCapsules, 'a repeated contact query moved the source geometry');
      resolved.alignment = [...pose.alignment];
    }
    const restored = JSON.parse(JSON.stringify(resolved));
    assert.deepEqual(instrumentPose(restored), expected, 'history restore re-advanced an already resolved frame');
    assert.deepEqual(instrumentCapsules(restored), expectedCapsules);
  }
});

test('explicit frame sweep retains the exact saved start and resolves the normal RCM endpoint only once', () => {
  for (const name of Object.keys(reference)) {
    const port = [name === 'needle-driver' ? -.08 : .08, 1.18, .1];
    const start = { instrument: name, port, position: [port[0] + .012, port[1], port[2]],
      wrist: [0, 0, 0], jaw: .6,
      alignment: new THREE.Quaternion().setFromUnitVectors(Z, new THREE.Vector3(-.055, -.075, -.1).normalize()).toArray() };
    const endpoint = { ...start, position: [port[0] + .014, port[1], port[2]] };
    const target = resolveInstrumentAlignment(endpoint, start.alignment);
    const first = { ...start, alignment: slerpInstrumentAlignment(start.alignment, target, 0) };
    assert.deepEqual(instrumentPose(first), instrumentPose(start), 'CCD must start at the absolute committed source pose');
    assert.deepEqual(slerpInstrumentAlignment(start.alignment, target, 1), target);
    for (let step = 0; step <= 20; step++) {
      const t = step / 20, candidate = { ...start,
        position: start.position.map((value, axis) => value + (endpoint.position[axis] - value) * t),
        alignment: slerpInstrumentAlignment(start.alignment, target, t) };
      const pose = instrumentPose(candidate);
      assert.deepEqual(instrumentPose({ ...candidate, alignment: pose.alignment }), pose, 'CCD candidate changed again when committed');
    }
    const normal = { ...endpoint, position: [port[0] + .06, port[1] - .07, port[2] - .1] };
    normal.alignment = resolveInstrumentAlignment(normal, start.alignment);
    const pose = instrumentPose(normal), direction = new THREE.Vector3(...pose.shaftDirection);
    const perpendicular = new THREE.Vector3(...port).sub(new THREE.Vector3(...pose.position));
    perpendicular.addScaledVector(direction, -perpendicular.dot(direction));
    assert.ok(perpendicular.length() < 1e-9, 'the resolved normal-workspace shaft still passes through its source RCM');
    for (const offset of [-.002, -.001, 0, .001, .002]) {
      const near = { ...start, position: [port[0], port[1], port[2] + offset] };
      assert.deepEqual(resolveInstrumentAlignment(near, start.alignment), start.alignment, 'near-port commands must retain their fixed continuous frame');
    }
  }
});
