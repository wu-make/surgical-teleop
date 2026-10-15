import * as THREE from 'three';
import { validateCut, normalizeMetadata, distanceToSegment, nodeIndex } from './tissue-worker.js';

const vectorArray = point => Array.isArray(point) ? [...point] : [point.x, point.y, point.z];
const copyCuts = cuts => cuts.map(cut => ({ a: [...cut.a], b: [...cut.b], radius: cut.radius }));

/** A real sampled organ volume; the worker alone owns and modifies its SDF. */
export class TissueVolume {
  constructor() {
    this.group = new THREE.Group();
    this.group.name = 'anatomical-liver-volume';
    this.ready = false;
    this.busy = false;
    this.removedVolumeMm3 = 0;
    this.totalVolumeMm3 = 0;
    this.voxelMm = 1.5;
    this.error = null;
    this._meshes = new Map();
    this._cuts = [];
    this._commands = [];
    this._epoch = 0;
    this._sequence = 0;
    this._inFlight = null;
    this._disposed = false;
    this._grasp = { point: { value: new THREE.Vector3() }, delta: { value: new THREE.Vector3() }, radius: { value: 0.035 } };
    this.material = new THREE.MeshPhysicalMaterial({ vertexColors: true, roughness: 0.37, metalness: 0, clearcoat: 0.22, clearcoatRoughness: 0.27, envMapIntensity: 0.75 });
    this.material.onBeforeCompile = shader => {
      shader.uniforms.tissueGraspPoint = this._grasp.point;
      shader.uniforms.tissueGraspDelta = this._grasp.delta;
      shader.uniforms.tissueGraspRadius = this._grasp.radius;
      shader.vertexShader = 'uniform vec3 tissueGraspPoint;\nuniform vec3 tissueGraspDelta;\nuniform float tissueGraspRadius;\n' + shader.vertexShader;
      shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\nfloat graspWeight = max(0.0, 1.0 - distance(position, tissueGraspPoint) / tissueGraspRadius);\ntransformed += tissueGraspDelta * graspWeight * graspWeight;');
    };
    this.material.customProgramCacheKey = () => 'tissue-grasp-v1';
  }

  async load(urlbase = './assets/liver-volume') {
    if (this._disposed) throw new Error('TissueVolume has been disposed');
    if (this.worker) throw new Error('This tissue volume has already been loaded');
    let base = String(urlbase).replace(/\.(?:json|bin)$/, '');
    if (base.endsWith('/')) base += 'liver-volume';
    const [metadataResponse, volumeResponse] = await Promise.all([fetch(`${base}.json`), fetch(`${base}.bin`)]);
    if (!metadataResponse.ok || !volumeResponse.ok) throw new Error('Could not load the anatomical liver volume');
    const [metadata, buffer] = await Promise.all([metadataResponse.json(), volumeResponse.arrayBuffer()]);
    this.metadata = normalizeMetadata(metadata);
    this._baseField = new Float32Array(buffer.slice(0));
    this.worker = new Worker(new URL('./tissue-worker.js', import.meta.url), { type: 'module' });
    this.worker.onmessage = ({ data }) => this._receive(data);
    this.worker.onerror = event => this._fail(new Error(event.message || 'Tissue geometry worker failed'));
    await this._enqueue({ type: 'init', metadata, buffer, transfer: [buffer] });
    this.ready = true;
    this.onChange?.();
    return this;
  }

  cut(point, radius) { return this.cutSegment(point, point, radius); }

  cutSegment(start, end, radius) {
    if (!this.ready || this._disposed) return Promise.resolve({ changed: false, removedMm3: 0, reason: 'not-ready' });
    let primitive;
    try { primitive = validateCut({ a: vectorArray(start), b: vectorArray(end), radius }); }
    catch (error) { return Promise.reject(error); }
    const previous = this._cuts.at(-1);
    if (previous && primitive.radius === previous.radius && [...primitive.a, ...primitive.b].every((v, i) => v === [...previous.a, ...previous.b][i])) return Promise.resolve({ changed: false, removedMm3: 0, removedVolumeMm3: this.removedVolumeMm3 });
    if (this._cuts.length >= 50000) return Promise.resolve({ changed: false, removedMm3: 0, reason: 'history-limit' });
    this._cuts.push(primitive);
    return this._enqueue({ type: 'cut', cuts: [primitive] });
  }

  snapshot() { return { version: 1, cuts: copyCuts(this._cuts) }; }

  async restore(snapshot) {
    if (!this.ready || this._disposed) return { changed: false, reason: 'not-ready' };
    if (!snapshot || snapshot.version !== 1 || !Array.isArray(snapshot.cuts) || snapshot.cuts.length > 50000) throw new Error('Invalid tissue snapshot');
    const cuts = snapshot.cuts.map(validateCut);
    this._epoch++;
    for (const command of this._commands.splice(0)) command.resolve({ changed: false, cancelled: true });
    this._cuts = copyCuts(cuts);
    this._grasp.delta.value.set(0, 0, 0);
    return this._enqueue({ type: 'restore', cuts });
  }

  reset() { return this.restore({ version: 1, cuts: [] }); }

  /** Continuous local distance to the current organ; useful for contact gating. */
  sampleDistance(point) {
    if (!this._baseField) return Infinity;
    const p = vectorArray(point), meta = this.metadata;
    if (p.some(v => !Number.isFinite(v))) return Infinity;
    const grid = p.map((v, axis) => (v - meta.origin[axis]) / meta.spacing[axis]);
    if (grid.some((v, axis) => v < 0 || v > meta.dims[axis] - 1)) return Infinity;
    const low = grid.map((v, axis) => Math.min(Math.floor(v), meta.dims[axis] - 2));
    const fraction = grid.map((v, axis) => v - low[axis]);
    let distance = 0;
    for (let z = 0; z <= 1; z++) for (let y = 0; y <= 1; y++) for (let x = 0; x <= 1; x++) {
      const weight = (x ? fraction[0] : 1 - fraction[0]) * (y ? fraction[1] : 1 - fraction[1]) * (z ? fraction[2] : 1 - fraction[2]);
      distance += weight * this._baseField[nodeIndex(meta, low[0] + x, low[1] + y, low[2] + z)];
    }
    for (const cut of this._cuts) distance = Math.max(distance, cut.radius - distanceToSegment(p, cut.a, cut.b));
    return distance;
  }

  contains(point, margin = 0) {
    return this.sampleDistance(point) <= Math.max(0, Number.isFinite(margin) ? margin : 0);
  }

  // Small, reversible display deformation for grasper traction. It never edits
  // the source volume or pretends to be a calibrated tissue mechanics solver.
  setGrasp(point, delta) {
    if (!point || !delta) { this._grasp.delta.value.set(0, 0, 0); return; }
    if ([...vectorArray(point), ...vectorArray(delta)].some(v => !Number.isFinite(v))) return;
    this._grasp.point.value.fromArray(vectorArray(point));
    this._grasp.delta.value.fromArray(vectorArray(delta)).clampLength(0, 0.025);
  }

  _enqueue(operation) {
    if (!this.worker) return Promise.reject(new Error('Tissue worker is not available'));
    this.busy = true;
    return new Promise((resolve, reject) => {
      this._commands.push({ ...operation, epoch: this._epoch, resolve, reject });
      queueMicrotask(() => this._flush());
    });
  }

  _flush() {
    if (this._inFlight || !this._commands.length || this._disposed) return;
    const command = this._commands.shift();
    // Coalesce queued strokes to rebuild each dirty tile once per worker pass.
    const callbacks = [command];
    if (command.type === 'cut') {
      while (this._commands[0]?.type === 'cut' && this._commands[0].epoch === command.epoch && command.cuts.length < 256) {
        const next = this._commands.shift(); callbacks.push(next); command.cuts.push(...next.cuts);
      }
    }
    command.id = ++this._sequence;
    this._inFlight = { command, callbacks };
    const { resolve, reject, transfer, ...message } = command;
    this.worker.postMessage(message, transfer ?? []);
  }

  _receive(data) {
    const active = this._inFlight;
    if (!active || data.id !== active.command.id) return;
    this._inFlight = null;
    if (data.error) {
      const error = new Error(data.error); this.error = error;
      active.callbacks.forEach(command => command.reject(error));
    } else if (data.epoch !== this._epoch) {
      active.callbacks.forEach(command => command.resolve({ changed: false, cancelled: true }));
    } else {
      for (const chunk of data.chunks) this._replaceChunk(chunk);
      Object.assign(this, data.statistics);
      const result = { changed: !!data.changedSamples || data.type !== 'cut', removedMm3: data.removedMm3, removedVolumeMm3: this.removedVolumeMm3, totalVolumeMm3: this.totalVolumeMm3 };
      active.callbacks.forEach(command => command.resolve(result));
      this.onChange?.(result);
    }
    this.busy = !!this._commands.length;
    this._flush();
  }

  _replaceChunk(chunk) {
    const previous = this._meshes.get(chunk.key);
    if (previous) { previous.geometry.dispose(); this.group.remove(previous); this._meshes.delete(chunk.key); }
    if (!chunk.positions.length) return;
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(chunk.positions, 3));
    geometry.setAttribute('normal', new THREE.BufferAttribute(chunk.normals, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(chunk.colors, 3));
    geometry.setIndex(new THREE.BufferAttribute(chunk.indices, 1));
    geometry.computeBoundingSphere();
    // GPU grasp displacement can extend the rest bounding sphere by 25 mm.
    geometry.boundingSphere.radius += 0.025;
    const mesh = new THREE.Mesh(geometry, this.material);
    mesh.name = `liver-chunk-${chunk.key}`;
    mesh.castShadow = true; mesh.receiveShadow = true;
    mesh.layers.enable(1);
    mesh.userData.tissue = true;
    this.group.add(mesh); this._meshes.set(chunk.key, mesh);
  }

  _fail(error) {
    this.error = error; this.busy = false;
    this._inFlight?.callbacks.forEach(command => command.reject(error));
    this._inFlight = null;
    for (const command of this._commands.splice(0)) command.reject(error);
  }

  dispose() {
    this._disposed = true; this.ready = false;
    this.worker?.terminate();
    this._fail(new Error('Tissue volume disposed'));
    for (const mesh of this._meshes.values()) mesh.geometry.dispose();
    this._meshes.clear(); this.group.clear(); this.material.dispose();
    this._baseField = null;
  }
}

export default TissueVolume;
