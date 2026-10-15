import test from 'node:test';
import assert from 'node:assert/strict';
import { createVolumeState, applyCapsuleCut, resetVolume, polygonizeChunk, allChunkKeys, nodeIndex } from '../src/tissue-worker.js';
import { TissueVolume } from '../src/tissue.js';

function sphereVolume(n = 25, spacing = 0.0015, radius = 0.013) {
  const origin = -(n - 1) * spacing / 2;
  const metadata = { dims: [n, n, n], origin: [origin, origin, origin], spacing: [spacing, spacing, spacing] };
  const field = new Float32Array(n * n * n);
  for (let z = 0; z < n; z++) for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) field[x + n * (y + n * z)] = Math.hypot(origin + x * spacing, origin + y * spacing, origin + z * spacing) - radius;
  return createVolumeState(metadata, field, 8);
}

test('subtractive capsule changes a solid volume and tracks removal without double counting', () => {
  const state = sphereVolume();
  const center = nodeIndex(state.meta, 12, 12, 12);
  const before = state.field[center];
  assert.ok(before < 0);
  const cut = { a: [0, 0, -0.018], b: [0, 0, 0.01], radius: 0.003 };
  const result = applyCapsuleCut(state, cut);
  assert.ok(state.field[center] > 0, 'actual interior samples become air');
  assert.ok(result.removedMm3 > 100 && result.removedMm3 < 900);
  assert.ok(result.dirty.size > 0 && result.dirty.size <= allChunkKeys(state).length);
  const repeated = applyCapsuleCut(state, cut);
  assert.equal(repeated.removedMm3, 0);
  assert.equal(repeated.changedSamples, 0);
  assert.ok(state.base[center] < 0, 'pristine organ is immutable');
  const larger = sphereVolume(49);
  const localCut = applyCapsuleCut(larger, { a: [0.01, 0, 0], radius: 0.002 });
  assert.ok(localCut.dirty.size < allChunkKeys(larger).length / 2, 'local edits only dirty nearby tiles');
});

test('undo by replay restores every sample and the exact removed-volume estimate', () => {
  const state = sphereVolume();
  const first = { a: [0, 0, 0.01], b: [0, 0, 0.016], radius: 0.003 };
  applyCapsuleCut(state, first);
  const field = state.field.slice(), removed = state.removedVolumeMm3;
  applyCapsuleCut(state, { a: [-0.005, 0, -0.005], radius: 0.004 });
  assert.ok(state.removedVolumeMm3 > removed);
  resetVolume(state, [first]);
  assert.deepEqual(state.field, field);
  assert.equal(state.removedVolumeMm3, removed);
  resetVolume(state);
  assert.deepEqual(state.field, state.base);
  assert.equal(state.removedVolumeMm3, 0);
});

test('marching tetrahedra produces finite outward normals and a new cavity wall', () => {
  const state = sphereVolume();
  applyCapsuleCut(state, { a: [0, 0, -0.02], b: [0, 0, 0.02], radius: 0.004 });
  let vertices = 0, innerWall = 0;
  for (const key of allChunkKeys(state)) {
    const mesh = polygonizeChunk(state, key);
    assert.equal(mesh.positions.length, mesh.normals.length);
    assert.equal(mesh.positions.length, mesh.colors.length);
    assert.equal(mesh.positions.length % 3, 0);
    assert.equal(mesh.indices.length % 3, 0);
    assert.ok([...mesh.indices].every(index => index < mesh.positions.length / 3));
    for (let i = 0; i < mesh.positions.length; i += 3) {
      const p = mesh.positions.slice(i, i + 3), n = mesh.normals.slice(i, i + 3);
      assert.ok([...p, ...n].every(Number.isFinite));
      assert.ok(Math.abs(Math.hypot(...n) - 1) < 1e-5);
      if (Math.abs(p[2]) < 0.006 && Math.hypot(p[0], p[1]) < 0.005) {
        innerWall++;
        assert.ok(p[0] * n[0] + p[1] * n[1] < 0, 'cavity normals point into the new air space');
      }
      vertices++;
    }
  }
  assert.ok(vertices > 1000);
  assert.ok(innerWall > 10, 'the cut is a real interior wall, not a transparent mask');
});

test('invalid metadata, corrupt fields, and non-finite cuts are rejected', () => {
  assert.throws(() => createVolumeState({ dims: [2, 2, 2], origin: [0, 0, 0], spacing: [0.001, 0.001, 0.001] }, new Float32Array(7)), /byte length/);
  const state = sphereVolume();
  assert.throws(() => applyCapsuleCut(state, { a: [NaN, 0, 0], radius: 0.001 }), /finite/);
  assert.throws(() => applyCapsuleCut(state, { a: [0, 0, 0], radius: -1 }), /radius/);
});

test('contact queries reflect removed material as well as the original anatomy', () => {
  const source = sphereVolume();
  const tissue = new TissueVolume();
  tissue.metadata = source.meta;
  tissue._baseField = source.base;
  assert.equal(tissue.contains([0, 0, 0]), true);
  assert.equal(tissue.contains([0.017, 0, 0]), false);
  assert.equal(tissue.contains([0.014, 0, 0], 0.002), true);
  tissue._cuts = [{ a: [0, 0, -0.02], b: [0, 0, 0.02], radius: 0.003 }];
  assert.equal(tissue.contains([0, 0, 0]), false, 'cut-away material is no longer graspable');
  assert.equal(tissue.contains([0.006, 0, 0]), true);
  assert.equal(tissue.contains([NaN, 0, 0]), false);
  tissue.dispose();
});

test('chunk interfaces and the cut cavity form a closed surface', () => {
  const state = sphereVolume();
  applyCapsuleCut(state, { a: [0, 0, -0.02], b: [0, 0, 0.02], radius: 0.004 });
  const edges = new Map();
  for (const key of allChunkKeys(state)) {
    const mesh = polygonizeChunk(state, key);
    const vertexKey = index => [...mesh.positions.slice(index * 3, index * 3 + 3)].map(value => Math.round(value * 1e8)).join(',');
    for (let i = 0; i < mesh.indices.length; i += 3) {
      const triangle = [...mesh.indices.slice(i, i + 3)].map(vertexKey);
      for (let j = 0; j < 3; j++) {
        const edge = [triangle[j], triangle[(j + 1) % 3]].sort().join('|');
        edges.set(edge, (edges.get(edge) ?? 0) + 1);
      }
    }
  }
  assert.ok(edges.size > 1000);
  assert.equal([...edges.values()].filter(count => count !== 2).length, 0, 'each welded surface edge has exactly two adjacent triangles');
});

test('Three mesh assembly uses indexed triangles, endoscope layers, and disposes replaced geometry', () => {
  const source = sphereVolume();
  const key = allChunkKeys(source).find(key => polygonizeChunk(source, key).indices.length > 0);
  const chunk = polygonizeChunk(source, key), tissue = new TissueVolume();
  tissue._replaceChunk(chunk);
  const first = tissue.group.children[0];
  assert.equal(first.geometry.index.count, chunk.indices.length);
  assert.equal(first.geometry.attributes.position.count, chunk.positions.length / 3);
  assert.ok(first.layers.mask & (1 << 1), 'new cut meshes are visible to the layer-1 endoscope');
  let disposed = false;
  first.geometry.addEventListener('dispose', () => { disposed = true; });
  tissue._replaceChunk(chunk);
  assert.equal(disposed, true);
  assert.equal(tissue.group.children.length, 1);
  tissue.dispose();
});

test('a reset invalidates in-flight cuts so late worker results cannot overwrite the restored organ', async () => {
  const tissue = new TissueVolume(), messages = [];
  tissue.worker = { postMessage: message => messages.push(message), terminate() {} };
  tissue.ready = true;
  const cutting = tissue.cut([0, 0, 0], 0.003);
  await Promise.resolve();
  assert.equal(messages.length, 1);
  const resetting = tissue.reset();
  const first = messages[0];
  tissue._receive({ id: first.id, epoch: first.epoch, type: 'cut', chunks: [], statistics: { removedVolumeMm3: 90, totalVolumeMm3: 1000 }, changedSamples: 12, removedMm3: 90 });
  assert.equal((await cutting).cancelled, true);
  assert.equal(tissue.removedVolumeMm3, 0, 'stale cut statistics are discarded');
  assert.equal(messages.length, 2);
  const second = messages[1];
  assert.equal(second.type, 'restore');
  tissue._receive({ id: second.id, epoch: second.epoch, type: 'restore', chunks: [], statistics: { removedVolumeMm3: 0, totalVolumeMm3: 1000 }, changedSamples: 0, removedMm3: 0 });
  await resetting;
  assert.deepEqual(tissue.snapshot().cuts, []);
  assert.equal(tissue.busy, false);
  tissue.dispose();
});
