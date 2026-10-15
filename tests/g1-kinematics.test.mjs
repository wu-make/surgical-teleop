import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { SurgicalScene } from '../src/scene.js';
import { Simulation, constrainToolPosition } from '../src/simulation.js';
import { loadAssemblies } from '../src/authentic-assemblies.js';

const bytes = await readFile(new URL('../public/assets/g1.glb', import.meta.url));
const source = (await new GLTFLoader().parseAsync(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength), '/')).scene;
const metadata = JSON.parse(await readFile(new URL('../public/assets/g1-kinematics.json', import.meta.url), 'utf8'));
const previousFetch = globalThis.fetch;
globalThis.fetch = async url => new Response(await readFile(new URL(`../public${url}`, import.meta.url)));
const instruments = await loadAssemblies(new THREE.Scene());
globalThis.fetch = previousFetch;
after(() => instruments.dispose());

// Exercise the production scene methods without a canvas, renderer or DOM.
function fixture() {
  const scene = Object.create(SurgicalScene.prototype);
  scene.robot = new THREE.Group();
  scene.robot.position.set(0, .9922729, .67);
  scene.robot.rotation.y = Math.PI / 2;
  scene.robotModel = source.clone(true);
  scene.robot.add(scene.robotModel);
  scene.joints = [];
  scene.handMarkers = {};
  scene.armErrors = { left: Infinity, right: Infinity };
  for (const definition of metadata.joints) {
    const node = scene.robotModel.getObjectByName(definition.name);
    if (!node || definition.type === 'fixed') continue;
    node.userData.rest = node.quaternion.clone();
    node.userData.angle = 0;
    node.userData.axis = new THREE.Vector3(...definition.axis);
    node.userData.limit = definition.limit;
    scene.joints.push(node);
  }
  for (const side of ['left', 'right']) {
    scene.setJoint(`${side}_shoulder_pitch_joint`, .8);
    scene.setJoint(`${side}_shoulder_roll_joint`, side === 'left' ? .2 : -.2);
    scene.setJoint(`${side}_elbow_joint`, 1.1);
    const marker = new THREE.Object3D();
    marker.position.set(.075, 0, .02);
    scene.robotModel.getObjectByName(`${side}_rubber_hand`).add(marker);
    scene.handMarkers[side] = marker;
  }
  scene.robotLoaded = true;
  return scene;
}

function settle(scene, targets, frames = 50) {
  for (let frame = 0; frame < frames; frame++) {
    for (const side of ['left', 'right']) scene.solveArm(side, targets[side]);
  }
  for (const side of ['left', 'right']) {
    const actual = new THREE.Vector3();
    scene.handMarkers[side].getWorldPosition(actual);
    assert.ok(actual.distanceTo(targets[side]) < .001, `${side} real hand missed CAD adaptor by ${actual.distanceTo(targets[side])} m`);
  }
}

test('production G1 IK joins real hands to the initial CAD instrument adaptors', () => {
  const scene = fixture();
  instruments.update(new Simulation().state, 1 / 60);
  settle(scene, instruments.toolHandlePositions);
  // Confirm the fixed manufacturer hand is the endpoint, not the wrist origin.
  for (const side of ['left', 'right']) {
    assert.equal(scene.handMarkers[side].parent.name, `${side}_rubber_hand`);
    const wrist = new THREE.Vector3();
    scene.robotModel.getObjectByName(`${side}_wrist_yaw_link`).getWorldPosition(wrist);
    assert.ok(wrist.distanceTo(instruments.toolHandlePositions[side]) > .09);
  }
});

test('production G1 IK follows nearby 20 mm movements without mesh stretching', () => {
  const scene = fixture();
  instruments.update(new Simulation().state, 1 / 60);
  const initial = Object.fromEntries(['left', 'right'].map(side => [side, instruments.toolHandlePositions[side].clone()]));
  const scales = new Map();
  scene.robot.traverse(node => scales.set(node, node.scale.clone()));
  settle(scene, initial);
  for (const offset of [[.02, 0, 0], [-.02, 0, 0], [0, .02, 0], [0, -.02, 0], [0, 0, .02], [0, 0, -.02]]) {
    const targets = Object.fromEntries(['left', 'right'].map(side => [side, initial[side].clone().add(new THREE.Vector3(...offset))]));
    settle(scene, targets, 35);
  }
  scene.robot.traverse(node => assert.ok(node.scale.equals(scales.get(node)), `${node.name} was scaled by IK`));
});

test('all seven G1 arm joints on each side clamp to the manufacturer limits', () => {
  const scene = fixture();
  for (const side of ['left', 'right']) {
    const chain = ['shoulder_pitch', 'shoulder_roll', 'shoulder_yaw', 'elbow', 'wrist_roll', 'wrist_pitch', 'wrist_yaw'];
    assert.equal(chain.length, 7);
    for (const suffix of chain) {
      const name = `${side}_${suffix}_joint`;
      const node = scene.robotModel.getObjectByName(name);
      const { lower, upper } = node.userData.limit;
      scene.setJoint(name, lower - 10);
      assert.equal(node.userData.angle, lower);
      scene.setJoint(name, upper + 10);
      assert.equal(node.userData.angle, upper);
      assert.ok(node.quaternion.toArray().every(Number.isFinite));
    }
  }
});

test('production reach guard accepts a local move and restores an unreachable tool and all seven joints', () => {
  const scene = fixture(), state = new Simulation().state;
  scene.assemblies = instruments;
  instruments.update(state, 1 / 60);
  settle(scene, instruments.toolHandlePositions);
  assert.equal(scene.guardArmTargets(state), false);
  state.tools.left.position[0] += .002;
  instruments.update(state, 1 / 60);
  settle(scene, instruments.toolHandlePositions, 20);
  assert.equal(scene.guardArmTargets(state), false);
  const accepted = structuredClone(state.tools.left);
  const acceptedRight = structuredClone(state.tools.right);
  const angles = scene.acceptedArmPoses.left.joints.map(pair => [...pair]);
  assert.equal(angles.length, 7);
  assert.deepEqual(scene.acceptedArmPoses.left.tool, accepted);

  state.tools.left.position = constrainToolPosition([.165, 1.165, .145], state.tools.left.port);
  instruments.update(state, 1 / 60);
  for (const side of ['left', 'right']) scene.solveArm(side, instruments.toolHandlePositions[side]);
  assert.ok(scene.armErrors.left > .0025, 'test must exercise an actually unreachable CAD handle');
  assert.equal(scene.guardArmTargets(state), true);
  assert.deepEqual(state.tools.left, accepted);
  assert.deepEqual(state.tools.right, acceptedRight);
  for (const [name, angle] of angles) {
    const joint = scene.robotModel.getObjectByName(name);
    assert.equal(joint.userData.angle, angle);
    assert.ok(joint.quaternion.toArray().every(Number.isFinite));
  }
  assert.ok(scene.armErrors.left < .0025);
  assert.ok(scene.armErrors.right < .0025);
  assert.ok(instruments.toolTipPositions.left.distanceTo(new THREE.Vector3(...accepted.position)) < 1e-7);
});

test('releasing the production reach guard lets a reset or history pose settle again', () => {
  const scene = fixture(), state = new Simulation().state;
  scene.assemblies = instruments;
  instruments.update(state, 1 / 60);
  settle(scene, instruments.toolHandlePositions);
  scene.guardArmTargets(state);
  assert.ok(scene.acceptedArmPoses.left);
  scene.releaseKinematicGuard();
  assert.deepEqual(scene.acceptedArmPoses, {});
  instruments.update(state, 1 / 60);
  settle(scene, instruments.toolHandlePositions, 3);
  assert.equal(scene.guardArmTargets(state), false);
  assert.deepEqual(scene.acceptedArmPoses.left.tool, state.tools.left);
  assert.ok(scene.joints.every(joint => Number.isFinite(joint.userData.angle)));
});
