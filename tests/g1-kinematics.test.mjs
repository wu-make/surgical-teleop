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

test('free instrument commands remain untouched when the genuine G1 cannot reach them', () => {
  const scene = fixture(), state = new Simulation().state;
  scene.assemblies = instruments;
  instruments.update(state, 1 / 60);
  settle(scene, instruments.toolHandlePositions);
  state.tools.left.position = [1.5, 1.8, -1.2];
  state.tools.left.wrist = [9 * Math.PI, -7 * Math.PI, 12 * Math.PI];
  const command = structuredClone(state);
  instruments.update(state, 1 / 60);
  for (const side of ['left', 'right']) scene.solveArm(side, instruments.toolHandlePositions[side]);
  assert.ok(scene.armErrors.left > .1);
  const angles = scene.joints.map(joint => joint.userData.angle);
  assert.equal(scene.guardArmTargets(state), false);
  assert.deepEqual(state, command, 'rendering must never restore or restrict tool commands');
  assert.deepEqual(scene.joints.map(joint => joint.userData.angle), angles);
  assert.equal(scene.kinematicLimited, false);
  assert.ok(instruments.toolTipPositions.left.distanceTo(new THREE.Vector3(...state.tools.left.position)) < 1e-7);
  const hands = { left: new THREE.Vector3(), right: new THREE.Vector3() };
  for (const side of ['left', 'right']) scene.handMarkers[side].getWorldPosition(hands[side]);
  instruments.connectHands(hands, scene.armErrors);
  assert.equal(instruments.connectionModes.left, 'virtual');
  assert.equal(instruments.conceptDecoupled, true);
  scene.robot.traverse(node => assert.ok(node.quaternion.toArray().every(Number.isFinite)));
});

test('reset compatibility releases display history without changing the tool state', () => {
  const scene = fixture(), state = new Simulation().state;
  scene.assemblies = instruments;
  const before = structuredClone(state);
  scene.acceptedArmPoses = { left: { tool: { position: [99, 99, 99] } } };
  scene.releaseKinematicGuard();
  assert.deepEqual(scene.acceptedArmPoses, {});
  assert.equal(scene.guardArmTargets(state), false);
  assert.deepEqual(state, before);
});
