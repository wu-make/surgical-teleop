import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createVolumeState, applyCapsuleCut, resetVolume, polygonizeChunk, allChunkKeys, nodeIndex, normalizeDeformation, deformationWeight, deformPoint, inverseDeformPoint, deformNormal,LOCAL_TRACTION } from '../src/tissue-worker.js';
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
  const first = tissue.group.children.find(child => child.isMesh);
  assert.equal(first.geometry.index.count, chunk.indices.length);
  assert.equal(first.geometry.attributes.position.count, chunk.positions.length / 3);
  assert.ok(first.layers.mask & (1 << 1), 'new cut meshes are visible to the layer-1 endoscope');
  let disposed = false;
  first.geometry.addEventListener('dispose', () => { disposed = true; });
  tissue._replaceChunk(chunk);
  assert.equal(disposed, true);
  assert.equal(tissue.group.children.filter(child => child.isMesh).length, 1);
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

test('large three-dimensional traction remains invertible and transforms normals consistently', () => {
  const deformation = normalizeDeformation({ local: [0.01, 0.02, -0.01], displacement: [0.018, -0.007, 0.026], radius: 0.035 });
  for (let i = 0; i < 500; i++) {
    const point = [Math.sin(i * 3.1) * 0.08, Math.cos(i * 1.7) * 0.07, Math.sin(i * 0.91) * 0.06];
    const displayed = deformPoint(point, deformation), restored = inverseDeformPoint(displayed, deformation);
    assert.ok(Math.hypot(...point.map((v, axis) => v - restored[axis])) < 1e-8);
    const { gradient } = deformationWeight(point, deformation);
    const normal = deformNormal([0, 0, 1], gradient, deformation.displacement);
    const tangent = [1, 0, 0].map((v, axis) => v + deformation.displacement[axis] * gradient[0]);
    assert.ok(Math.abs(normal.reduce((sum, v, axis) => sum + v * tangent[axis], 0)) < 1e-10);
  }
});

test('grasping lifts real geometry, updates contact, and returns exactly on release', () => {
  const source = sphereVolume(), tissue = new TissueVolume();
  tissue.metadata = source.meta; tissue._baseField = source.base;
  for (const key of allChunkKeys(source)) tissue._replaceChunk(polygonizeChunk(source, key));
  const anchor = tissue.findGraspPoint([0, 0, 0.016], 0.005);
  assert.ok(anchor && Math.abs(anchor.z - 0.013) < 0.00015);
  assert.ok(anchor.normal.z > 0.99);
  assert.equal(tissue.findGraspPoint([0, 0, 0.04], 0.008), null, 'air cannot be grasped');
  const pristine = [...tissue._meshes.values()].map(mesh => mesh.geometry.attributes.position.array.slice());
  tissue.setGrasp(anchor, { x: 0.002, y: 0, z: 0.014 });
  assert.ok(tissue.graspMetrics.affectedVertices > 100);
  const movedAnchor = deformPoint(anchor.toArray(), tissue._deformation);
  assert.ok(Math.abs(tissue.sampleDistance(movedAnchor)) < 0.00015);
  let lifted = 0;
  for (const mesh of tissue._meshes.values()) {
    const position = mesh.geometry.attributes.position.array;
    for (let i = 2; i < position.length; i += 3) if (position[i] > 0.025) lifted++;
  }
  assert.ok(lifted > 10, 'vertices visibly lift by more than 12 mm, not a shader-only effect');
  tissue.setGrasp(null);
  [...tissue._meshes.values()].forEach((mesh, i) => assert.deepEqual(mesh.geometry.attributes.position.array, pristine[i]));
  tissue.dispose();
});

test('cutting held tissue removes the displayed material and leaves the same defect after release', () => {
  const source = sphereVolume(), tissue = new TissueVolume();
  tissue.metadata = source.meta; tissue._baseField = source.base;
  const deformation = normalizeDeformation({ local: [0, 0, 0.013], displacement: [0.002, 0, 0.012], radius: 0.05 });
  const materialPoint = [0, 0, 0.0105], displayed = deformPoint(materialPoint, deformation);
  const cut = { a: displayed, b: displayed.map((v, axis) => v + (axis === 2 ? 0.009 : 0)), radius: 0.0035, deformation };
  const result = applyCapsuleCut(source, cut);
  assert.ok(result.removedMm3 > 30);
  tissue._cuts = source.cuts;
  tissue.setGrasp(deformation);
  assert.equal(tissue.contains(displayed), false, 'the current displayed tip sits in the actual cut cavity');
  assert.equal(tissue.contains(deformPoint([0.007, 0, 0.007], deformation)), true, 'surrounding held material remains');
  let freshVertices = 0;
  for (const key of result.dirty) {
    const mesh = polygonizeChunk(source, key);
    freshVertices += [...mesh.cutMasks].filter(value => value > 0.5).length;
    tissue._replaceChunk(mesh);
  }
  assert.ok(freshVertices > 10, 'newly exposed three-dimensional cut walls carry fresh parenchyma material');
  tissue.setGrasp(null);
  assert.equal(tissue.contains(materialPoint), false, 'defect follows material when traction is released');
  const replay = source.field.slice(), removal = source.removedVolumeMm3;
  resetVolume(source, [cut]);
  assert.deepEqual(source.field, replay);
  assert.equal(source.removedVolumeMm3, removal);
  tissue.dispose();
});

test('the delivered anatomical liver supports a surface grasp and a visibly open resection stroke', () => {
  const metadata = JSON.parse(fs.readFileSync(new URL('../public/assets/liver-volume.json', import.meta.url), 'utf8'));
  const bytes = fs.readFileSync(new URL('../public/assets/liver-volume.bin', import.meta.url));
  const values = new Float32Array(bytes.buffer, bytes.byteOffset, bytes.byteLength / 4);
  const tissue = new TissueVolume(); tissue.metadata = metadata; tissue._baseField = values;
  const anchor = tissue.findGraspPoint([-0.025, 0.015, 0.075], 0.008);
  assert.ok(anchor, 'the actual source surface, not a proxy ellipsoid, is graspable');
  const deformation = normalizeDeformation({ local: anchor.toArray(), displacement: [-0.003, 0, 0.02], radius: 0.07 });
  const source = createVolumeState(metadata, values), points = [];
  for (let x = -0.04; x < 0.0401; x += 0.01) {
    const surface = tissue.findGraspPoint([x, 0.015, 0.074], 0.008);
    assert.ok(surface);
    points.push(surface.toArray());
  }
  let removed = 0;
  for (let i = 1; i < points.length; i++) {
    const cut = { a: deformPoint(points[i - 1], deformation), b: deformPoint(points[i], deformation), radius: 0.0045, deformation };
    removed += applyCapsuleCut(source, cut).removedMm3;
  }
  assert.ok(removed > 1800 && removed < 4500, 'the sweep removes a clearly visible millilitre-scale groove');
  tissue._cuts = source.cuts; tissue.setGrasp(deformation);
  for (const point of points.slice(1, -1)) assert.equal(tissue.contains(deformPoint(point, deformation)), false, 'the original exterior has a real open defect');
  tissue.setGrasp(null);
  for (const point of points.slice(1, -1)) assert.equal(tissue.contains(point), false, 'the resection persists after releasing the left grasper');
  resetVolume(source);
  assert.deepEqual(source.field, values);
  tissue.dispose();
});

test('traction beyond 40 mm and 100 mm has no hidden displacement cap', () => {
  const source = sphereVolume(), tissue = new TissueVolume();
  tissue.metadata = source.meta; tissue._baseField = source.base;
  for (const key of allChunkKeys(source)) tissue._replaceChunk(polygonizeChunk(source, key));
  const anchor = [0, 0, 0.013];
  for (const displacement of [[0.055, 0, 0.03], [0.16, 0.08, -0.03]]) {
    tissue.setGrasp({ local: anchor, displacement, radius: 0.04 });
    assert.deepEqual(tissue.graspMetrics.displacement, displacement);
    const displayedAnchor = deformPoint(anchor, tissue._deformation);
    assert.ok(Math.hypot(...displayedAnchor.map((v, axis) => v - anchor[axis] - displacement[axis])) < 1e-12);
    assert.ok(Math.abs(tissue.sampleDistance(displayedAnchor)) < 0.00015);
    for (const reference of [anchor, [0.005, 0.002, 0.01], [-0.009, 0, 0.004]]) {
      const restored = inverseDeformPoint(deformPoint(reference, tissue._deformation), tissue._deformation);
      assert.ok(Math.hypot(...restored.map((v, axis) => v - reference[axis])) < 1e-8);
    }
    for (const mesh of tissue._meshes.values()) {
      const positions = mesh.geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const p = { x: positions.getX(i), y: positions.getY(i), z: positions.getZ(i) };
        assert.ok(mesh.geometry.boundingBox.containsPoint(p), 'moved geometry stays inside its updated raycast bounds');
      }
    }
  }
  tissue.setGrasp(null); tissue.dispose();
});

test('cut bounding-box acceleration matches exhaustive deformed CSG distance queries', () => {
  const source = sphereVolume(), tissue = new TissueVolume(), baseline = new TissueVolume();
  for (const instance of [tissue, baseline]) { instance.metadata = source.meta; instance._baseField = source.base; }
  for (let i = 0; i < 160; i++) {
    const group = Math.floor(i / 32);
    const deformation = normalizeDeformation({ local: [0, 0, 0.012], displacement: [group * 0.002, 0, group * 0.005], radius: 0.055 });
    const a = deformPoint([Math.sin(i * 0.7) * 0.01, Math.cos(i * 0.43) * 0.007, 0.009], deformation);
    tissue._cuts.push({ a, b: a.map((v, axis) => v + (axis === 2 ? 0.004 : 0)), radius: 0.0016, ...(deformation ? { deformation } : {}) });
  }
  const current = normalizeDeformation({ local: [0, 0, 0.013], displacement: [0.004, 0, 0.02], radius: 0.065 });
  tissue.setGrasp(current); baseline.setGrasp(current);
  for (let i = 0; i < 700; i++) {
    const reference = [Math.sin(i * 0.71) * 0.017, Math.cos(i * 0.37) * 0.017, Math.sin(i * 0.29) * 0.017];
    const displayed = deformPoint(reference, tissue._deformation);
    let expected = baseline.sampleDistance(displayed);
    for (const cut of tissue._cuts) {
      const p = deformPoint(reference, cut.deformation);
      const dx = cut.b[0] - cut.a[0], dy = cut.b[1] - cut.a[1], dz = cut.b[2] - cut.a[2];
      const t = Math.max(0, Math.min(1, ((p[0] - cut.a[0]) * dx + (p[1] - cut.a[1]) * dy + (p[2] - cut.a[2]) * dz) / (dx * dx + dy * dy + dz * dz)));
      const distance = Math.hypot(p[0] - cut.a[0] - t * dx, p[1] - cut.a[1] - t * dy, p[2] - cut.a[2] - t * dz);
      expected = Math.max(expected, cut.radius - distance);
    }
    assert.ok(Math.abs(tissue.sampleDistance(displayed) - expected) < 1e-9, 'broadphase does not alter signed-distance values');
  }
  assert.ok(tissue.queryMetrics.evaluatedCutters < 700 * 160 * 0.2, 'most remote cutters are skipped safely');
  tissue._cuts = [];
  assert.equal(tissue.contains(deformPoint([0, 0, 0.009], current)), true, 'restored history clears its old acceleration index');
  tissue.dispose(); baseline.dispose();
});

test('continuous radius growth reuses radial caches and keeps exact visible traction', () => {
  const source = sphereVolume(), tissue = new TissueVolume();
  tissue.metadata = source.meta; tissue._baseField = source.base;
  for (const key of allChunkKeys(source)) tissue._replaceChunk(polygonizeChunk(source, key));
  const anchor = [0, 0, 0.013];
  tissue.setGrasp({ local: anchor, displacement: [0, 0, 0.024] });
  const builds = tissue.deformationMetrics.cacheBuilds;
  for (let step = 1; step <= 100; step++) tissue.setGrasp({ local: anchor, displacement: [0, 0, 0.024 + step * 0.00016] });
  assert.equal(tissue.deformationMetrics.cacheBuilds, builds, 'growing the support radius must not rescan the source on each frame');
  assert.ok(tissue.deformationMetrics.radiusUpdates > builds);
  for (const mesh of tissue._meshes.values()) {
    assert.equal(mesh.geometry.attributes.position.usage, 35040, 'frequently rewritten vertices use STREAM_DRAW');
    const rest = mesh.geometry.userData.restPositions, positions = mesh.geometry.attributes.position.array;
    for (let i = 0; i < rest.length; i += 27) {
      const expected = deformPoint([...rest.slice(i, i + 3)], tissue._deformation);
      assert.ok(Math.hypot(...expected.map((v, axis) => v - positions[i + axis])) < 1e-8);
    }
  }
  tissue.dispose();
});

test('local traction has a rigid 2.5 mm grasp core, anchored distant material and an invertible narrow support',()=>{
  const local=[.01,-.015,.02],delta=[.025,.012,.021],d=normalizeDeformation({model:'local-flow',local,displacement:delta});
  assert.equal(d.radius,.018);assert.equal(d.coreRadius,.0025);
  const core=local.map((v,i)=>v+(i===1?.001:0)),lifted=deformPoint(core,d);
  assert.ok(Math.hypot(...lifted.map((v,i)=>v-core[i]-delta[i]))<1e-12);
  for(let i=0;i<900;i++){
    const p=local.map((v,axis)=>v+Math.sin(i*(1.13+axis*.47))*.045),moved=deformPoint(p,d),back=inverseDeformPoint(moved,d);
    assert.ok(Math.hypot(...p.map((v,axis)=>v-back[axis]))<1e-8);
    const {gradient}=deformationWeight(p,d),determinant=1+gradient.reduce((sum,v,axis)=>sum+v*delta[axis],0);
    assert.ok(determinant>0,'material mapping never folds or makes a duplicate shell');
    const normal=deformNormal([0,0,1],gradient,delta),eps=1e-7;
    const shifted=deformPoint(p.map((v,axis)=>v+(axis===0?eps:0)),d),tangent=shifted.map((v,axis)=>(v-moved[axis])/eps);
    assert.ok(Math.abs(normal.reduce((sum,v,axis)=>sum+v*tangent[axis],0))<.0002);
  }
  const far=local.map((v,i)=>v+(i===0?-.05:0));assert.deepEqual(deformPoint(far,d),far);
  // Introducing a new final flow segment must be continuous, not reset all
  // previous substeps and cause a visible jump when the step count changes.
  const boundary=(d.radius-d.coreRadius)*LOCAL_TRACTION.stepFraction*5,p=local.map((v,i)=>v+(i===0?.007:0));
  const a=normalizeDeformation({model:'local-flow',local,displacement:[0,0,boundary-1e-9]}),b=normalizeDeformation({model:'local-flow',local,displacement:[0,0,boundary+1e-9]});
  assert.ok(Math.hypot(...deformPoint(p,a).map((v,i)=>v-deformPoint(p,b)[i]))<1e-7);
});

test('real liver traction moves a small patch while the mother remains fixed and exact after release',()=>{
  const metadata=JSON.parse(fs.readFileSync(new URL('../public/assets/liver-volume.json',import.meta.url),'utf8'));
  const bytes=fs.readFileSync(new URL('../public/assets/liver-volume.bin',import.meta.url)),values=new Float32Array(bytes.buffer,bytes.byteOffset,bytes.byteLength/4);
  const source=createVolumeState(metadata,values),tissue=new TissueVolume();tissue.metadata=metadata;tissue._baseField=source.base;
  for(const key of allChunkKeys(source))tissue._replaceChunk(polygonizeChunk(source,key));
  const anchor=tissue.findParentSurfacePoint([-.025,.015,.075],.008),pristine=[...tissue._meshes.values()].map(m=>m.geometry.attributes.position.array.slice());
  tissue.setGrasp(anchor,{x:0,y:0,z:.026});
  assert.equal(tissue.graspMetrics.radiusMm,18);assert.equal(tissue.graspMetrics.coreRadiusMm,2.5);
  let count=0,moved=0,far=0;
  for(const mesh of tissue._meshes.values()){
    const rest=mesh.geometry.userData.restPositions,positions=mesh.geometry.attributes.position.array;
    for(let i=0;i<rest.length;i+=3){
      count++;const shift=Math.hypot(...[0,1,2].map(a=>positions[i+a]-rest[i+a]));
      if(shift>.0001)moved++;
      if(Math.hypot(rest[i]-anchor.x,rest[i+1]-anchor.y)>.02){far++;assert.ok(shift<1e-8,'distant mother is anchored, not translated');}
      if(i%27===0){const expected=deformPoint([...rest.slice(i,i+3)],tissue._deformation);assert.ok(Math.hypot(...expected.map((v,a)=>v-positions[i+a]))<1e-8);}
    }
  }
  assert.ok(moved>30&&moved/count<.10,`${moved}/${count} vertices move >0.1mm`);assert.ok(far/count>.8);
  const point=tissue.deformPoint(anchor);assert.ok(Math.abs(tissue.sampleDistance(point))<.00015);
  tissue.setGrasp(anchor,{x:0,y:0,z:.008});assert.equal(tissue.graspMetrics.radiusMm,18);
  tissue.setGrasp(null);[...tissue._meshes.values()].forEach((mesh,i)=>assert.deepEqual(mesh.geometry.attributes.position.array,pristine[i]));tissue.dispose();
});

test('submillimetre fresh cut walls get parenchyma mask while untouched capsule remains unmarked',()=>{
  const source=sphereVolume(41,.0015,.024);
  for(const key of allChunkKeys(source))assert.ok(polygonizeChunk(source,key).cutMasks.every(v=>v===0));
  applyCapsuleCut(source,{a:[-.012,0,.024],b:[.012,0,.024],radius:.002});
  let shallowFresh=0,untouched=0;
  for(const key of allChunkKeys(source)){
    const mesh=polygonizeChunk(source,key);
    for(let i=0;i<mesh.positions.length;i+=3){
      const p=[...mesh.positions.slice(i,i+3)],depth=.024-Math.hypot(...p),mask=mesh.cutMasks[i/3];
      if(depth>.0005&&depth<.001&&mask>.9)shallowFresh++;
      if(p[2]<0){untouched++;assert.equal(mask,0);}
    }
  }
  assert.ok(shallowFresh>10,'a shallow real incision already exposes fresh parenchyma');assert.ok(untouched>100);
});

test('new local-flow cuts, displayed contact and undo replay all reference the same material defect',()=>{
  const source=sphereVolume(41,.0015,.024),tissue=new TissueVolume();tissue.metadata=source.meta;tissue._baseField=source.base;
  const d=normalizeDeformation({model:'local-flow',local:[0,0,.024],displacement:[.003,0,.025]});
  const reference=[.003,0,.022],display=deformPoint(reference,d);
  const cut={a:display,b:display.map((v,i)=>v+(i===2?.005:0)),radius:.003,deformation:d};
  const result=applyCapsuleCut(source,cut);assert.ok(result.removedMm3>10);
  tissue._cuts=source.cuts;tissue.setGrasp(d);assert.equal(tissue.contains(display),false);
  const expected=source.field.slice(),volume=source.removedVolumeMm3;resetVolume(source,[cut]);
  assert.deepEqual(source.field,expected);assert.equal(source.removedVolumeMm3,volume);
  tissue.setGrasp(null);assert.equal(tissue.contains(reference),false,'the real cut stays in the mother material after release');
  tissue.dispose();
});
