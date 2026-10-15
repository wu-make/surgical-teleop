import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import * as THREE from 'three';
import { Simulation, constrainToolPosition } from '../src/simulation.js';
import { loadAssemblies } from '../src/authentic-assemblies.js';

const scene = new THREE.Scene();
const originalFetch = globalThis.fetch;
globalThis.fetch = async url => new Response(await readFile(new URL(`../public${url}`, import.meta.url)));
const assembly = await loadAssemblies(scene);
globalThis.fetch = originalFetch;
after(() => assembly.dispose());

test('source CAD keeps physical scale and uses correct endoscopic visibility', () => {
  assert.equal(assembly.toolNames.left, '持针钳');
  for (const side of ['left', 'right']) {
    const tip = assembly.tools[side].metadata.tipPositionAtZero;
    assert.ok(tip[2] > .43 && tip[2] < .45, 'instrument units must remain meters');
  }
  for (const source of [assembly.scope, assembly.scopeArm]) {
    source.group.traverse(node => { if (node.isMesh) assert.equal(node.layers.mask, 1); });
  }
  assert.equal(assembly.scopeArm.chain.length, 6);
});

test('actual CAD tool tips follow commands without RCM drift over wrist and insertion range', () => {
  const state = new Simulation().state;
  const tip = new THREE.Vector3();
  for (let i = 0; i < 200; i++) {
    for (const [index, side] of ['left', 'right'].entries()) {
      const tool = state.tools[side];
      tool.position = constrainToolPosition([
        Math.sin(i * .11 + index) * .13,
        1.075 + Math.sin(i * .13) * .075,
        Math.cos(i * .17) * .12,
      ], tool.port);
      tool.wrist = [Math.sin(i * .17) * 1.2, Math.sin(i * .13) * 1.35, Math.sin(i * .19) * Math.PI];
      tool.jaw = (i % 17) / 16;
    }
    assembly.update(state, 1 / 60);
    for (const side of ['left', 'right']) {
      tip.fromArray(state.tools[side].position);
      assert.ok(assembly.toolTipPositions[side].distanceTo(tip) < 1e-7, `${side} CAD tip moved off command`);
      assert.ok(assembly.toolRCMErrors[side] < 1e-7, `${side} shaft missed its fixed port`);
    }
  }
});

test('scope source tip stays exact and genuine Z1 supports the shaft across full angular workspace', () => {
  const state = new Simulation().state;
  const tip = new THREE.Vector3(), direction = new THREE.Vector3(), port = new THREE.Vector3(...state.scope.port);
  for (let i = 0; i < 100; i++) {
    const yaw = (i % 10 - 4.5) / 4.5 * Math.PI;
    const pitch = Math.floor(i / 10) / 9 * 1.55 + .01;
    const depth = .018 + (i % 7) / 6 * .117;
    direction.set(Math.sin(yaw) * Math.cos(pitch), -Math.sin(pitch), -Math.cos(yaw) * Math.cos(pitch));
    tip.copy(port).addScaledVector(direction, depth);
    state.scope.position = tip.toArray();
    state.scope.roll = Math.sin(i * .17) * Math.PI;
    // Simulate settling after each abrupt relocation, including recovery from
    // one-sided joint-limit minima. Continuous keyboard control moves more slowly.
    for (let frame = 0; frame < 90; frame++) {
      const previous = assembly.scopeArm.chain.map(joint => joint.angle);
      assembly.update(state, 1 / 30);
      assembly.scopeArm.chain.forEach((joint, index) => {
        assert.ok(Math.abs(joint.angle - previous[index]) <= joint.specification.limit.velocity / 30 + 1e-8,
          'Z1 recovery exceeded the source joint velocity');
      });
    }
    assert.ok(assembly.scope.tipPosition.distanceTo(tip) < 1e-7);
    assert.ok(assembly.scopeArmError < .0005, `Z1 shaft support error ${assembly.scopeArmError}`);
    assert.ok(Math.abs(assembly.scopeSupportPosition.distanceTo(port) - .1) < 1e-9);
    for (const joint of assembly.scopeArm.chain) {
      const { lower, upper } = joint.specification.limit;
      assert.ok(joint.angle >= lower - 1e-9 && joint.angle <= upper + 1e-9);
    }
  }
});

test('disposing source assemblies removes them and tolerates repeated disposal', () => {
  assembly.dispose();
  assembly.dispose();
  assert.equal(scene.children.length, 0);
});
