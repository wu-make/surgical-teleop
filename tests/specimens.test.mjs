import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { TissueVolume } from '../src/tissue.js';
import { createVolumeState, allChunkKeys, polygonizeChunk, deformPoint } from '../src/tissue-worker.js';
import { sampleFragmentVolume } from '../src/tissue-fragments.js';

function fixture(fieldAt = (x, y, z) => Math.hypot(x, y, z) - .009) {
  const n = 19, spacing = .0015, origin = -.0135;
  const meta = { dims: [n, n, n], origin: [origin, origin, origin], spacing: [spacing, spacing, spacing] };
  const values = new Float32Array(n ** 3);
  for (let z = 0; z < n; z++) for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) values[x + n * (y + n * z)] = fieldAt(origin + x * spacing, origin + y * spacing, origin + z * spacing);
  const state = createVolumeState(meta, values, 8);
  const chunks = allChunkKeys(state).map(key => polygonizeChunk(state, key));
  const merged = { positions: [], normals: [], colors: [], cutMasks: [], indices: [] };
  for (const chunk of chunks) {
    const offset = merged.positions.length / 3;
    for (const field of ['positions', 'normals', 'colors', 'cutMasks']) merged[field].push(...chunk[field]);
    merged.indices.push(...chunk.indices.map(i => i + offset));
  }
  const descriptor = { id: 'test-piece', center: [0, 0, 0], volumeMm3: 3000, volume: { ...meta, values },
    ...Object.fromEntries(Object.entries(merged).map(([key, list]) => [key, key === 'indices' ? new Uint32Array(list) : new Float32Array(list)])) };
  const tissue = new TissueVolume(); tissue.metadata = meta; tissue._baseField = values;
  tissue.group.position.y = 1.035; tissue.group.updateMatrixWorld(true);
  return { tissue, descriptor };
}

test('a specimen preserves real volume geometry, material coordinates and signed contact data', () => {
  const { tissue, descriptor } = fixture();
  const piece = tissue.fragments.add(descriptor);
  assert.ok(piece.mesh.geometry.index.count > 1000);
  assert.equal(piece.mesh.geometry.attributes.tissueRestPosition.array, descriptor.positions);
  assert.equal(sampleFragmentVolume(piece.volume, [0, 0, 0]) < 0, true);
  assert.ok(sampleFragmentVolume(piece.volume, [1, 0, 0]) > .9);
  assert.equal(tissue.fragmentAtReference([0, 0, 0]).id, piece.id);
  assert.equal(tissue.fragmentAtReference([.03, 0, 0]), null);
  tissue.dispose();
});

test('material ownership does not attach a nearby retained point to the wrong specimen',()=>{
  const {tissue,descriptor}=fixture();
  try{
    tissue.fragments.add(descriptor);
    assert.equal(tissue.fragmentAtReference([.010,0,0])===null,true,'one millimetre outside a specimen is not part of its material');
    const shifted={...descriptor,id:'adjacent-piece',center:[.019,0,0],
      positions:Float32Array.from(descriptor.positions,(v,i)=>v+(i%3===0?.019:0)),
      volume:{...descriptor.volume,origin:descriptor.volume.origin.map((v,i)=>v+(i===0?.019:0))}};
    tissue.fragments.add(shifted);
    assert.equal(tissue.fragmentAtReference([.010,0,0])?.id,shifted.id,'a boundary material anchor belongs to the adjacent component, not the first nearby mesh');
  }finally{tissue.dispose();}
});

test('holding and rotating keeps the exact grasp point fixed while the complete specimen moves', () => {
  const { tissue, descriptor } = fixture();
  const piece = tissue.fragments.add(descriptor), anchor = new THREE.Vector3(.009, 0, 0);
  tissue.attachFragment(piece.id, anchor, new THREE.Quaternion());
  const destination = new THREE.Vector3(.06, .045, -.02);
  const turn = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2);
  tissue.moveHeldFragment(piece.id, destination, turn);
  const transformed = new THREE.Vector3(...piece.attachment.anchor).applyQuaternion(piece.quaternion).add(piece.position);
  assert.ok(transformed.distanceTo(destination) < 1e-12);
  assert.ok(piece.position.distanceTo(new THREE.Vector3(.06, .036, -.02)) < 1e-10);
  const before = piece.position.clone(); tissue.setGrasp([0, 0, 0], [.01, .02, 0]);
  assert.equal(piece.position.distanceTo(before), 0, 'liver recoil cannot drag an independent specimen');
  const found = tissue.findGraspPoint(destination, .003);
  assert.equal(found.fragmentId, piece.id);
  assert.ok(found.distanceTo(destination) < .0001);
  tissue.dispose();
});

test('released material falls onto the mother surface and can be grasped again', () => {
  const { tissue, descriptor } = fixture();
  const piece = tissue.fragments.add(descriptor, { position: [0, .06, 0], quaternion: [0, 0, 0, 1] });
  tissue.attachFragment(piece.id, piece.position.clone().add(new THREE.Vector3(0, .009, 0)));
  tissue.releaseFragment(piece.id);
  for (let i = 0; i < 240; i++) tissue.updateFragments(1 / 120);
  assert.equal(piece.held, false);
  assert.ok(piece.position.y < .04 && piece.position.y > .01, `rests on liver, actual ${piece.position.y}`);
  assert.ok(piece.position.toArray().every(Number.isFinite));
  const anchor = piece.position.clone().add(new THREE.Vector3(0, .009, 0));
  assert.equal(tissue.findGraspPoint(anchor, .004).fragmentId, piece.id);
  assert.equal(tissue.attachFragment(piece.id, anchor), true);
  assert.equal(piece.held, true);
  tissue.dispose();
});

test('specimen history retains frozen deformation, rigid pose and grasp attachment', () => {
  const { tissue, descriptor } = fixture();
  descriptor.deformation = { local: [.004, 0, 0], displacement: [0, .018, 0], radius: .065 };
  const piece = tissue.fragments.add(descriptor);
  tissue.attachFragment(piece.id, [.009, .017, 0], new THREE.Quaternion());
  tissue.moveHeldFragment(piece.id, [.03, .05, -.01], new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), .7));
  const saved = tissue.snapshot();
  const vertices = piece.mesh.geometry.attributes.position.array.slice();
  tissue.fragments.clear(); tissue.setGrasp(null);
  const restored = tissue.fragments.add(descriptor, saved.fragments[0]);
  assert.deepEqual(restored.mesh.geometry.attributes.position.array, vertices);
  assert.deepEqual(tissue.snapshot().fragments, saved.fragments);
  assert.equal(restored.held, true);
  tissue.dispose();
});

test('separated-node overrides prevent ghost liver contact at the old specimen position', () => {
  const { tissue } = fixture();
  const oldCenter = tissue.queryReferenceDistance([0, 0, 0]);
  assert.ok(oldCenter < 0);
  for (let i = 0; i < tissue._baseField.length; i++) if (tissue._baseField[i] < 0) tissue._excludedValues.set(i, -tissue._baseField[i]);
  assert.ok(tissue.queryReferenceDistance([0, 0, 0]) > 0);
  assert.equal(tissue.contains([0, 0, 0]), false);
  tissue.dispose();
});

test('an explicitly undeformed specimen stays unchanged when restored during later liver traction', () => {
  const { tissue, descriptor } = fixture(); descriptor.deformation = null;
  const piece = tissue.fragments.add(descriptor);
  const positions = piece.mesh.geometry.attributes.position.array.slice();
  tissue.setGrasp([0, 0, 0], [0, .018, 0]);
  const saved = tissue.snapshot().fragments[0];
  assert.equal(saved.deformation, null);
  tissue.fragments.clear();
  const restored = tissue.fragments.add(descriptor, saved);
  assert.equal(restored.deformation, null);
  assert.deepEqual(restored.mesh.geometry.attributes.position.array, positions);
  tissue.dispose();
});

test('a compressed frozen cut surface remains graspable by displayed millimetre distance', () => {
  const { tissue, descriptor } = fixture();
  descriptor.deformation = { local: [0, 0, 0], displacement: [0, .018, 0], radius: .065 };
  const piece = tissue.fragments.add(descriptor);
  const point = new THREE.Vector3().fromArray(deformPoint([0, .013, 0], descriptor.deformation));
  const projected = tissue.fragments.surfacePoint(point, .0025);
  assert.ok(projected, 'compressed material must be selected in display coordinates');
  assert.equal(projected.fragmentId, piece.id);
  assert.ok(projected.distanceTo(point) < .0025);
  tissue.dispose();
});

test('specimen approach finds a released piece beyond the ordinary liver approach radius', () => {
  const { tissue, descriptor } = fixture();
  const piece = tissue.fragments.add(descriptor, { position: [.03, -.065, 0], quaternion: [0, 0, 0, 1], deformation: null });
  const tool = new THREE.Vector3(.03, .04, 0);
  assert.equal(tissue.findGraspPoint(tool, .08), null);
  const surface = tissue.findSpecimenGraspPoint(tool);
  assert.ok(surface);
  assert.equal(surface.fragmentId, piece.id);
  assert.ok(surface.distanceTo(tool) > .08);
  assert.ok(Math.abs(tissue.fragments.distance(piece, surface)) < .0001);
  tissue.dispose();
});

test('far approach reaches the actual surface of a thin concave rotated specimen', () => {
  const major = .008, minor = .0025;
  const { tissue, descriptor } = fixture((x, y, z) => Math.hypot(Math.hypot(x, y) - major, z) - minor);
  const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(.2, .4, .5));
  const piece = tissue.fragments.add(descriptor, { position: [.03, -.055, .01], quaternion: q.toArray(), deformation: null });
  const tool = new THREE.Vector3(0, 0, .08).applyQuaternion(q).add(piece.position);
  const hit = tissue.findSpecimenGraspPoint(tool, .15);
  assert.equal(hit?.fragmentId, piece.id);
  const analyticDistance = Math.hypot(major, .08) - minor;
  assert.ok(Math.abs(tool.distanceTo(hit) - analyticDistance) < .0015, 'matches analytic nearest distance within volume resolution');
  assert.ok(Math.abs(tissue.fragments.distance(piece, hit)) < .0006, 'lands on tissue rather than in the concave hole');
  assert.ok(Math.abs(hit.normal.length() - 1) < 1e-10);
  tissue.dispose();
});
