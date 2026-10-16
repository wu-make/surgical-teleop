import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { INSTRUMENT_COLLISION_DATA } from '../src/instrument-collision-data.js';
import { readGlbGeometry, clippedPoints, prepareCollisionData } from '../scripts/prepare-instrument-collision.mjs';

const source = {};
for (const name of Object.keys(INSTRUMENT_COLLISION_DATA)) {
  const binary = await readFile(new URL(`../public/assets/${name}.glb`, import.meta.url));
  source[name] = { binary, meshes: readGlbGeometry(binary),
    metadata: JSON.parse(await readFile(new URL(`../public/assets/${name}-kinematics.json`, import.meta.url))) };
}

function pointSegmentDistance(point, a, b) {
  const delta = b.map((value, c) => value - a[c]);
  const denominator = delta.reduce((sum, value) => sum + value * value, 0);
  const t = Math.max(0, Math.min(1, delta.reduce((sum, value, c) => sum + value * (point[c] - a[c]), 0) / denominator));
  return Math.hypot(...point.map((value, c) => value - a[c] - delta[c] * t));
}

test('collision data is immutable and generated from the unchanged shipped instrument assets', async () => {
  const generated = await prepareCollisionData();
  assert.deepEqual(generated, INSTRUMENT_COLLISION_DATA);
  for (const [name, data] of Object.entries(INSTRUMENT_COLLISION_DATA)) {
    assert.ok(Object.isFrozen(data) && Object.isFrozen(data.capsules) && Object.isFrozen(data.capsules[0].a));
    assert.equal(data.sourceSha256, createHash('sha256').update(source[name].binary).digest('hex'));
    assert.deepEqual(data.joints, source[name].metadata.joints);
    assert.deepEqual(data.tipPositionAtZero, source[name].metadata.tipPositionAtZero);
    assert.equal(data.coverage.triangles, source[name].metadata.triangles);
    assert.ok(data.capsules.length <= 25, 'finite small set is suitable for continuously swept contact');
  }
});

test('every source triangle is covered continuously by its own animated link envelopes', () => {
  for (const [name, data] of Object.entries(INSTRUMENT_COLLISION_DATA)) {
    const meshes = source[name].meshes;
    for (const mesh of meshes) {
      const envelope = data.capsules.filter(capsule => capsule.source.includes(mesh.name));
      assert.ok(envelope.length, `${name}/${mesh.name} was omitted`);
      assert.ok(envelope.every(capsule => capsule.link === mesh.link), 'source visual transform must be expressed in the correct URDF link');
      const axis = envelope[0].slab.axis;
      const ordered = envelope.slice().sort((a, b) => a.slab.min - b.slab.min);
      const minimum = Math.min(...mesh.points.map(point => point[axis]));
      const maximum = Math.max(...mesh.points.map(point => point[axis]));
      assert.ok(ordered[0].slab.min <= minimum + 1e-9 && ordered.at(-1).slab.max >= maximum - 1e-9);
      for (let i = 1; i < ordered.length; i++) assert.ok(ordered[i].slab.min <= ordered[i - 1].slab.max + 1e-9, 'no hole between triangle slabs');
      // A capsule is convex. All vertices of each plane-clipped polygon being
      // inside proves its complete source triangle piece is inside as well.
      for (const capsule of envelope) {
        const points = clippedPoints([mesh], capsule.slab.axis, capsule.slab.min, capsule.slab.max);
        for (const point of points) assert.ok(pointSegmentDistance(point, capsule.a, capsule.b) <= capsule.radius - data.margin + 2e-9,
          `${name}/${capsule.id}: source triangle escaped its measured envelope`);
      }
    }
  }
});

test('source-aligned shaft, articulated wrists and separate slender jaws replace the old oversized TCP bubble', () => {
  for (const [name, data] of Object.entries(INSTRUMENT_COLLISION_DATA)) {
    const shaft = data.capsules.filter(capsule => capsule.region === 'shaft');
    assert.equal(shaft.length, 1);
    assert.equal(shaft[0].link, 'roll_link');
    assert.ok(Math.abs(shaft[0].a[2] + .5565920963) < 1e-9);
    assert.ok(Math.abs(shaft[0].b[2] + .0088236004) < 1e-9);
    assert.ok(shaft[0].radius > .00437 && shaft[0].radius < .00453);
    const jaws = data.capsules.filter(capsule => capsule.region === 'jaw');
    assert.deepEqual([...new Set(jaws.map(capsule => capsule.link))], ['jaw_1_link', 'jaw_2_link']);
    for (const link of ['jaw_1_link', 'jaw_2_link']) {
      const distal = jaws.filter(capsule => capsule.link === link).at(-1);
      assert.ok(distal.radius < .0015, `${name} distal envelope should track the slender source tip`);
    }
    assert.ok(data.capsules.every(capsule => capsule.link !== 'tool_tip_link'), 'empty space around the abstract TCP is never a collision sphere');
    assert.ok(data.capsules.filter(capsule => capsule.region !== 'shaft').every(capsule => capsule.b[capsule.slab.axis] - capsule.a[capsule.slab.axis] <= .003500001));
  }
});
