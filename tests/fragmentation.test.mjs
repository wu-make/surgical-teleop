import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createVolumeState, applyCapsuleCut, initializeConnectivity, separateDisconnectedComponents, restoreVolumeWithSeparations, resetVolume, nodeIndex, distanceToSegment, normalizeDeformation, deformPoint } from '../src/tissue-worker.js';

function dumbbell() {
  const dims = [61, 35, 35], spacing = [0.001, 0.001, 0.001], origin = [-0.03, -0.017, -0.017];
  const values = new Float32Array(dims[0] * dims[1] * dims[2]);
  for (let z = 0; z < dims[2]; z++) for (let y = 0; y < dims[1]; y++) for (let x = 0; x < dims[0]; x++) {
    const p = [origin[0] + x * spacing[0], origin[1] + y * spacing[1], origin[2] + z * spacing[2]];
    values[x + dims[0] * (y + dims[1] * z)] = Math.min(Math.hypot(p[0] + 0.01, p[1], p[2]) - 0.012, Math.hypot(p[0] - 0.014, p[1], p[2]) - 0.006, distanceToSegment(p, [-0.01, 0, 0], [0.014, 0, 0]) - 0.0018);
  }
  const state = createVolumeState({ dims, spacing, origin }, values, 8);
  initializeConnectivity(state);
  return state;
}

const shallow = { a: [0.004, -0.004, 0.002], b: [0.004, 0.004, 0.002], radius: 0.0013 };
const sever = { a: [0.004, -0.004, -0.001], b: [0.004, 0.004, -0.001], radius: 0.0027 };

test('a wider local connectivity proof avoids full scans without hiding a genuinely severed bridge',()=>{
  const meta={dims:[9,9,9],origin:[-.004,-.004,-.004],spacing:[.001,.001,.001]},points=[[0,0,0],[-1,0,0],[1,0,0]];
  function fixture(bypass){
    const field=new Float32Array(9**3).fill(.001),route=bypass?[[-2,1,0],[-1,2,0],[0,2,0],[1,2,0],[2,1,0]]:[];
    for(const p of [...points,...route])field[nodeIndex(meta,...p.map(v=>v+4))]=-.0002;
    const volume=createVolumeState(meta,field,4);initializeConnectivity(volume);return volume;
  }
  const connected=fixture(true);applyCapsuleCut(connected,{a:[0,0,0],radius:.0004});
  assert.equal(connected.topologyMetrics.extendedProofs,1,'the bypass lies outside the old 3³ neighbourhood');
  separateDisconnectedComponents(connected,{minVoxels:1});assert.equal(connected.topologyMetrics.scans,1,'a proven surviving route needs no whole-volume scan');
  const bridge=fixture(false);applyCapsuleCut(bridge,{a:[0,0,0],radius:.0004});
  assert.equal(bridge.topologyDirty,true,'a missing bypass still requests global proof on the very same cut');
  separateDisconnectedComponents(bridge,{minVoxels:1});assert.equal(bridge.topologyMetrics.scans,2);
});

function assertClosed(mesh) {
  const edges = new Map(), keys = [];
  for (let i = 0; i < mesh.positions.length; i += 3) keys.push([...mesh.positions.slice(i, i + 3)].map(value => Math.round(value * 1e8)).join(','));
  for (let i = 0; i < mesh.indices.length; i += 3) {
    const triangle = [...mesh.indices.slice(i, i + 3)].map(index => keys[index]);
    for (let j = 0; j < 3; j++) { const key = [triangle[j], triangle[(j + 1) % 3]].sort().join('|'); edges.set(key, (edges.get(key) ?? 0) + 1); }
  }
  assert.ok(edges.size > 100);
  assert.equal([...edges.values()].filter(count => count !== 2).length, 0, 'every welded edge has two adjacent faces, including the fresh severed face');
}

test('a remaining tissue bridge prevents separation; its final real cut creates a closed specimen', () => {
  const state = dumbbell();
  applyCapsuleCut(state, shallow);
  assert.equal(separateDisconnectedComponents(state).fragments.length, 0);
  applyCapsuleCut(state, sever);
  const separated = separateDisconnectedComponents(state);
  assert.equal(separated.fragments.length, 1);
  const fragment = separated.fragments[0];
  assert.ok(fragment.center[0] > 0.009, 'the smaller right bulb, not the parent body, is detached');
  assert.ok(fragment.voxelCount >= 12 && fragment.volumeMm3 > 300 && fragment.volumeMm3 < 1300);
  assert.equal(fragment.cutIndex, 2);
  assert.ok(fragment.indices.length > 100);
  assert.equal(fragment.normals.length, fragment.positions.length);
  assert.equal(fragment.cutMasks.length, fragment.positions.length / 3);
  assert.ok([...fragment.cutMasks].some(value => value > 0.5), 'the detached part includes its newly exposed cut face');
  assertClosed(fragment);
  assert.ok([...fragment.volume.values].some(value => value < 0));
  assert.ok([...fragment.volume.values].some(value => value > 0));
  for (let i = 0; i < separated.exclusions.nodeIndices.length; i++) {
    assert.ok(separated.exclusions.positiveValues[i] > 0);
    assert.equal(state.field[separated.exclusions.nodeIndices[i]], separated.exclusions.positiveValues[i]);
  }
  assert.deepEqual(separateDisconnectedComponents(state).fragments, [], 'a specimen is emitted exactly once');
});

test('26-neighbour corner contact remains attached and original source islands are not specimens', () => {
  const dims = [17, 17, 17], values = new Float32Array(17 ** 3).fill(0.001);
  const meta = { dims, origin: [0, 0, 0], spacing: [0.001, 0.001, 0.001] };
  for (const [lo, hi] of [[2, 5], [6, 9]]) for (let z = lo; z <= hi; z++) for (let y = lo; y <= hi; y++) for (let x = lo; x <= hi; x++) values[nodeIndex(meta, x, y, z)] = -0.001;
  const state = createVolumeState(meta, values, 8); initializeConnectivity(state);
  assert.equal(separateDisconnectedComponents(state, { force: true }).fragments.length, 0, 'diagonal contact is conservatively connected');
  for (let z = 12; z <= 14; z++) for (let y = 2; y <= 4; y++) for (let x = 2; x <= 4; x++) values[nodeIndex(meta, x, y, z)] = -0.001;
  const islands = createVolumeState(meta, values, 8); initializeConnectivity(islands);
  applyCapsuleCut(islands, { a: [0.002, 0.002, 0.002], radius: 0.0006 });
  assert.equal(separateDisconnectedComponents(islands, { force: true }).fragments.length, 0, 'pre-existing disconnected source islands stay in the parent baseline');
});

test('later cuts never recut a detached specimen; undo, replay and reset preserve exact state', () => {
  const state = dumbbell();
  applyCapsuleCut(state, shallow); separateDisconnectedComponents(state);
  applyCapsuleCut(state, sever);
  const initial = separateDisconnectedComponents(state).fragments[0];
  const originalFragmentField = initial.volume.values.slice(), originalMesh = initial.positions.slice();
  const events = structuredClone(state.separations);
  applyCapsuleCut(state, { a: [0.014, 0, 0], radius: 0.004 });
  assert.equal(separateDisconnectedComponents(state).fragments.length, 0);
  assert.equal(state.fragmentRecords.length, 1);
  assert.deepEqual(initial.volume.values, originalFragmentField);
  const cuts = structuredClone(state.cuts), parentField = state.field.slice(), removal = state.removedVolumeMm3;
  const restored = restoreVolumeWithSeparations(state, cuts, events);
  assert.equal(restored.fragments.length, 1);
  assert.equal(restored.fragments[0].id, initial.id);
  assert.deepEqual(restored.fragments[0].volume.values, originalFragmentField, 'replay extracts at the recorded cut index, before subsequent parent cuts');
  assert.deepEqual(restored.fragments[0].positions, originalMesh);
  assert.deepEqual(state.field, parentField);
  assert.equal(state.removedVolumeMm3, removal);
  restoreVolumeWithSeparations(state, [shallow], []);
  assert.equal(state.fragmentRecords.length, 0);
  assert.equal(state.exclusionIndices.length, 0);
  assert.ok(state.field[nodeIndex(state.meta, 44, 17, 17)] < 0, 'undo restores the attached bulb');
  resetVolume(state);
  assert.deepEqual(state.field, state.base);
  assert.equal(state.fragmentVolumeMm3, 0);
  assert.deepEqual(state.separations, []);
});

test('separation history cannot move the parent component or duplicate a stable identifier', () => {
  const state = dumbbell();
  applyCapsuleCut(state, shallow); applyCapsuleCut(state, sever);
  separateDisconnectedComponents(state);
  const events = structuredClone(state.separations), cuts = structuredClone(state.cuts);
  const field = state.field.slice(), records = structuredClone(state.fragmentRecords), volume = state.removedVolumeMm3;
  assert.throws(() => restoreVolumeWithSeparations(state, cuts, [events[0], events[0]]), /history/);
  assert.throws(() => restoreVolumeWithSeparations(state, cuts, [events[0], { ...events[0], id: 'fragment-other' }]), /history/);
  assert.throws(() => restoreVolumeWithSeparations(state, cuts, [{ id: 'fragment-invalid', seed: 0, cutIndex: 2 }]), /history does not match/);
  assert.deepEqual(state.field, field, 'an invalid semantic event leaves the current parent field untouched');
  assert.deepEqual(state.fragmentRecords, records);
  assert.deepEqual(state.separations, events);
  assert.equal(state.removedVolumeMm3, volume);
});

test('a severed lifted part preserves the exact frozen mapping and replayable material geometry', () => {
  const state = dumbbell();
  const deformation = normalizeDeformation({ local: [0.014, 0, 0], displacement: [0.004, 0.008, 0.01], radius: 0.065 });
  const displayed = { a: deformPoint(sever.a, deformation), b: deformPoint(sever.b, deformation), radius: sever.radius, deformation };
  applyCapsuleCut(state, displayed);
  const fragment = separateDisconnectedComponents(state).fragments[0];
  assert.ok(fragment, 'cutting the lifted bridge creates an actual disconnected volume');
  assert.deepEqual(fragment.deformation, deformation);
  assert.ok(fragment.center[0] > 0.009 && fragment.center[2] < 0.003, 'geometry and volume remain in material coordinates');
  assert.ok(deformPoint(fragment.center, fragment.deformation)[2] > 0.008, 'the displayed specimen freezes its lifted position');
  assertClosed(fragment);
  const replay = restoreVolumeWithSeparations(state, structuredClone(state.cuts), structuredClone(state.separations)).fragments[0];
  assert.deepEqual(replay.positions, fragment.positions);
  assert.deepEqual(replay.deformation, deformation);
});

test('a complete basal section of the delivered anatomical liver yields a closed real specimen without per-stroke global scans', () => {
  const metadata = JSON.parse(fs.readFileSync(new URL('../public/assets/liver-volume.json', import.meta.url)));
  const bytes = fs.readFileSync(new URL('../public/assets/liver-volume.bin', import.meta.url));
  const values = new Float32Array(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength));
  const state = createVolumeState(metadata, values);
  initializeConnectivity(state);
  const baselineScans = state.topologyMetrics.scans, plane = metadata.bounds[0][1] + 0.012;
  const fragments = [], radius = 0.0024;
  let strokes = 0;
  for (let z = metadata.bounds[0][2] - radius * 2; z <= metadata.bounds[1][2] + radius * 2; z += 0.0034) {
    applyCapsuleCut(state, { a: [metadata.bounds[0][0] - radius * 2, plane, z], b: [metadata.bounds[1][0] + radius * 2, plane, z], radius });
    fragments.push(...separateDisconnectedComponents(state).fragments); strokes++;
  }
  assert.equal(fragments.length, 1, 'the original anatomy supplies the specimen, not an inserted visual block');
  assert.ok(fragments[0].volumeMm3 > 1500 && fragments[0].volumeMm3 < 5000);
  assert.ok(fragments[0].center[1] < plane);
  assertClosed(fragments[0]);
  assert.ok(state.topologyMetrics.scans - baselineScans < strokes / 3, 'local simple-node confirmation avoids a full volume BFS on every stroke');
  assert.equal(state.fragmentRecords.length, 1);
});

test('the actual worker protocol transfers detached geometry safely and restores complete exclusions', async () => {
  const previousSelf = globalThis.self, previousScope = globalThis.WorkerGlobalScope, replies = [];
  class WorkerScope {
    postMessage(message, transfer) { replies.push(structuredClone(message, { transfer })); }
  }
  const scope = new WorkerScope();
  globalThis.WorkerGlobalScope = WorkerScope; globalThis.self = scope;
  try {
    await import('../src/tissue-worker.js?fragment-protocol-test');
    const source = dumbbell();
    const send = data => { scope.onmessage({ data: { id: replies.length + 1, epoch: 12, ...data } }); const reply = replies.at(-1); assert.equal(reply.error, undefined); return reply; };
    const initial = send({ type: 'init', metadata: source.meta, buffer: source.base.buffer.slice(0), chunkSize: 8 });
    assert.equal(initial.statistics.fragmentCount, 0); assert.equal(initial.exclusions.reset, true);
    send({ type: 'cut', cuts: [shallow] });
    const severed = send({ type: 'cut', cuts: [sever] });
    assert.equal(severed.fragments.length, 1); assert.equal(severed.exclusions.reset, false);
    assert.ok(severed.fragments[0].positions.byteLength > 0 && severed.fragments[0].volume.values.byteLength > 0);
    assert.equal(severed.statistics.fragmentCount, 1); assert.equal(severed.epoch, 12);
    const later = { a: [0.014, 0, 0], radius: 0.004 };
    assert.equal(send({ type: 'cut', cuts: [later] }).fragments.length, 0, 'transferred geometry does not corrupt continued worker editing');
    const restored = send({ type: 'restore', cuts: [shallow, sever, later], separations: severed.separations });
    assert.equal(restored.exclusions.reset, true); assert.equal(restored.fragments.length, 1);
    assert.deepEqual(restored.fragments[0].positions, severed.fragments[0].positions);
    assert.deepEqual(restored.separations, severed.separations);
    assert.deepEqual(restored.exclusions.nodeIndices, severed.exclusions.nodeIndices);
    const reset = send({ type: 'restore', cuts: [], separations: [] });
    assert.equal(reset.fragments.length, 0); assert.equal(reset.statistics.fragmentCount, 0);
    assert.equal(reset.exclusions.nodeIndices.length, 0); assert.equal(reset.statistics.removedVolumeMm3, 0);
    const batched=send({type:'cut',cuts:[shallow,sever,later]});
    assert.equal(batched.fragments.length,1);assert.equal(batched.fragments[0].cutIndex,2,'a specimen separates at its exact pose sample, not the end of a worker batch');
    assert.deepEqual(batched.fragments[0].positions,severed.fragments[0].positions,'later samples in the same pass must not recut detached specimen geometry');
    const replayBatch=send({type:'restore',cuts:[shallow,sever,later],separations:batched.separations});
    assert.deepEqual(replayBatch.fragments[0].positions,batched.fragments[0].positions);
  } finally {
    if (previousSelf === undefined) delete globalThis.self; else globalThis.self = previousSelf;
    if (previousScope === undefined) delete globalThis.WorkerGlobalScope; else globalThis.WorkerGlobalScope = previousScope;
  }
});
