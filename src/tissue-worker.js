// Anatomy is sampled in metres. The field is negative inside the source organ.
// These exports deliberately have no browser dependencies so the same geometry
// and CSG code can be checked with Node's test runner.
export const TETRAHEDRA = [[0, 5, 1, 6], [0, 1, 2, 6], [0, 2, 3, 6], [0, 3, 7, 6], [0, 7, 4, 6], [0, 4, 5, 6]];
const CORNERS = [[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0], [0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]];
const EDGES = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]];
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

export function normalizeMetadata(input) {
  const dims = input.dims ?? input.dimensions;
  const origin = input.origin;
  const spacing = Array.isArray(input.spacing) ? input.spacing : [input.spacing, input.spacing, input.spacing];
  if (!Array.isArray(dims) || dims.length !== 3 || dims.some(v => !Number.isInteger(v) || v < 2 || v > 512)) throw new Error('Invalid volume dimensions');
  if (!Array.isArray(origin) || origin.length !== 3 || origin.some(v => !Number.isFinite(v))) throw new Error('Invalid volume origin');
  if (spacing.length !== 3 || spacing.some(v => !Number.isFinite(v) || v <= 0 || v > 0.05)) throw new Error('Invalid volume spacing');
  return { ...input, dims: [...dims], origin: [...origin], spacing: [...spacing] };
}

export function nodeIndex(meta, x, y, z) { return x + meta.dims[0] * (y + meta.dims[1] * z); }
export function occupancy(distance, width) { return clamp(0.5 - distance / width, 0, 1); }

export function createVolumeState(metadata, values, chunkSize = 16) {
  const meta = normalizeMetadata(metadata);
  const length = meta.dims.reduce((a, b) => a * b, 1);
  if (!(values instanceof Float32Array) || values.length !== length) throw new Error('Volume byte length does not match its metadata');
  for (let i = 0; i < values.length; i++) if (!Number.isFinite(values[i])) throw new Error('Volume has non-finite samples');
  const base = new Float32Array(values);
  const field = new Float32Array(values);
  const voxelMm3 = meta.spacing.reduce((a, b) => a * b, 1) * 1e9;
  const bandWidth = Math.min(...meta.spacing);
  let totalVolumeMm3 = 0;
  for (let i = 0; i < base.length; i++) totalVolumeMm3 += occupancy(base[i], bandWidth) * voxelMm3;
  return { meta, base, field, chunkSize, bandWidth, voxelMm3, totalVolumeMm3, removedVolumeMm3: 0, cuts: [] };
}

export function distanceToSegment(point, start, end) {
  const dx = end[0] - start[0], dy = end[1] - start[1], dz = end[2] - start[2];
  const denominator = dx * dx + dy * dy + dz * dz;
  const t = denominator ? clamp(((point[0] - start[0]) * dx + (point[1] - start[1]) * dy + (point[2] - start[2]) * dz) / denominator, 0, 1) : 0;
  return Math.hypot(point[0] - start[0] - t * dx, point[1] - start[1] - t * dy, point[2] - start[2] - t * dz);
}

export function validateCut(cut) {
  const start = cut.a ?? cut.point, end = cut.b ?? start;
  if (!Array.isArray(start) || !Array.isArray(end) || start.length !== 3 || end.length !== 3 || [...start, ...end].some(v => !Number.isFinite(v))) throw new Error('Cut points must be finite three-component coordinates');
  if (!Number.isFinite(cut.radius) || cut.radius <= 0 || cut.radius > 0.05) throw new Error('Cut radius must be positive and at most 50 mm');
  if (Math.hypot(...end.map((v, i) => v - start[i])) > 0.5) throw new Error('Cut segment exceeds the supported workspace');
  return { a: [...start], b: [...end], radius: cut.radius };
}

export function allChunkKeys(state) {
  const keys = [];
  const count = state.meta.dims.map(n => Math.ceil((n - 1) / state.chunkSize));
  for (let z = 0; z < count[2]; z++) for (let y = 0; y < count[1]; y++) for (let x = 0; x < count[0]; x++) keys.push(`${x},${y},${z}`);
  return keys;
}

export function applyCapsuleCut(state, input) {
  const cut = validateCut(input);
  const { meta, field, base } = state;
  const margin = 2.5 * Math.max(...meta.spacing);
  const lower = cut.a.map((v, axis) => clamp(Math.floor((Math.min(v, cut.b[axis]) - cut.radius - margin - meta.origin[axis]) / meta.spacing[axis]), 0, meta.dims[axis] - 1));
  const upper = cut.a.map((v, axis) => clamp(Math.ceil((Math.max(v, cut.b[axis]) + cut.radius + margin - meta.origin[axis]) / meta.spacing[axis]), 0, meta.dims[axis] - 1));
  let removedMm3 = 0, changedSamples = 0;
  const point = [0, 0, 0];
  const changedBounds = [[Infinity, Infinity, Infinity], [-Infinity, -Infinity, -Infinity]];
  for (let z = lower[2]; z <= upper[2]; z++) for (let y = lower[1]; y <= upper[1]; y++) for (let x = lower[0]; x <= upper[0]; x++) {
    point[0] = meta.origin[0] + x * meta.spacing[0]; point[1] = meta.origin[1] + y * meta.spacing[1]; point[2] = meta.origin[2] + z * meta.spacing[2];
    const index = nodeIndex(meta, x, y, z);
    // Difference: organ \ cutter = max(organSignedDistance, -cutterSignedDistance).
    const value = Math.fround(Math.max(field[index], cut.radius - distanceToSegment(point, cut.a, cut.b)));
    if (value <= field[index]) continue;
    removedMm3 += (occupancy(field[index], state.bandWidth) - occupancy(value, state.bandWidth)) * state.voxelMm3;
    field[index] = value;
    changedSamples++;
    for (let axis = 0; axis < 3; axis++) { const coordinate = axis === 0 ? x : axis === 1 ? y : z; changedBounds[0][axis] = Math.min(changedBounds[0][axis], coordinate); changedBounds[1][axis] = Math.max(changedBounds[1][axis], coordinate); }
  }
  state.cuts.push(cut);
  state.removedVolumeMm3 = Math.min(state.totalVolumeMm3, state.removedVolumeMm3 + removedMm3);
  const dirty = new Set();
  if (changedSamples) {
    // Normals use neighbouring samples, hence an additional one-cell halo.
    const first = changedBounds[0].map(v => Math.max(0, Math.floor((v - 2) / state.chunkSize)));
    const last = changedBounds[1].map((v, axis) => Math.min(Math.ceil((meta.dims[axis] - 1) / state.chunkSize) - 1, Math.floor((v + 1) / state.chunkSize)));
    for (let z = first[2]; z <= last[2]; z++) for (let y = first[1]; y <= last[1]; y++) for (let x = first[0]; x <= last[0]; x++) dirty.add(`${x},${y},${z}`);
  }
  return { dirty, removedMm3, changedSamples, removedVolumeMm3: state.removedVolumeMm3 };
}

export function resetVolume(state, cuts = []) {
  state.field.set(state.base); state.cuts = []; state.removedVolumeMm3 = 0;
  for (const cut of cuts) applyCapsuleCut(state, cut);
  return state;
}

function nodeGradient(state, x, y, z) {
  const { meta, field } = state;
  const gradient = [0, 0, 0];
  for (let axis = 0; axis < 3; axis++) {
    const low = [x, y, z], high = [x, y, z];
    low[axis] = Math.max(0, low[axis] - 1); high[axis] = Math.min(meta.dims[axis] - 1, high[axis] + 1);
    gradient[axis] = (field[nodeIndex(meta, ...high)] - field[nodeIndex(meta, ...low)]) / ((high[axis] - low[axis]) * meta.spacing[axis]);
  }
  return gradient;
}

function surfaceColor(point, originalDistance, width) {
  const noise = 0.93 + 0.045 * Math.sin(point[0] * 492 + Math.sin(point[2] * 341)) + 0.025 * Math.sin(point[1] * 713 - point[2] * 427);
  const cut = clamp((-originalDistance - width * 0.55) / (width * 1.5), 0, 1);
  return [(0.25 + 0.16 * cut) * noise, (0.038 + 0.035 * cut) * noise, (0.026 + 0.026 * cut) * noise];
}

export function polygonizeChunk(state, key) {
  const [cx, cy, cz] = key.split(',').map(Number);
  const { meta, field, base, chunkSize } = state;
  const first = [cx, cy, cz].map(v => v * chunkSize), last = first.map((v, axis) => Math.min(v + chunkSize, meta.dims[axis] - 1));
  const positions = [], normals = [], colors = [], indices = [], vertexIndices = new Map();
  const corners = new Array(8), samples = new Array(8), originals = new Array(8), gradientCache = new Map();
  const gradient = (x, y, z) => { const index = nodeIndex(meta, x, y, z); let result = gradientCache.get(index); if (!result) { result = nodeGradient(state, x, y, z); gradientCache.set(index, result); } return result; };
  function emitTriangle(a, b, c) {
    const ux = b.p[0] - a.p[0], uy = b.p[1] - a.p[1], uz = b.p[2] - a.p[2];
    const vx = c.p[0] - a.p[0], vy = c.p[1] - a.p[1], vz = c.p[2] - a.p[2];
    const face = [uy * vz - uz * vy, uz * vx - ux * vz, ux * vy - uy * vx];
    if (Math.hypot(...face) < 1e-15) return;
    const outward = a.n.map((v, axis) => v + b.n[axis] + c.n[axis]);
    if (face.reduce((sum, v, axis) => sum + v * outward[axis], 0) < 0) [b, c] = [c, b];
    for (const vertex of [a, b, c]) {
      let index = vertexIndices.get(vertex.key);
      if (index === undefined) {
        index = positions.length / 3; vertexIndices.set(vertex.key, index);
        positions.push(...vertex.p); normals.push(...vertex.n); colors.push(...vertex.c);
      }
      indices.push(index);
    }
  }
  for (let z = first[2]; z < last[2]; z++) for (let y = first[1]; y < last[1]; y++) for (let x = first[0]; x < last[0]; x++) {
    let negative = 0;
    for (let i = 0; i < 8; i++) {
      const grid = [x + CORNERS[i][0], y + CORNERS[i][1], z + CORNERS[i][2]];
      const index = nodeIndex(meta, ...grid);
      samples[i] = field[index]; originals[i] = base[index]; corners[i] = grid;
      if (samples[i] < 0) negative++;
    }
    if (!negative || negative === 8) continue;
    for (const tetra of TETRAHEDRA) {
      const intersections = [];
      for (const [ta, tb] of EDGES) {
        const ia = tetra[ta], ib = tetra[tb];
        if ((samples[ia] < 0) === (samples[ib] < 0)) continue;
        const t = samples[ia] / (samples[ia] - samples[ib]);
        const ga = gradient(...corners[ia]), gb = gradient(...corners[ib]);
        const p = corners[ia].map((v, axis) => meta.origin[axis] + (v + (corners[ib][axis] - v) * t) * meta.spacing[axis]);
        const normal = ga.map((v, axis) => v + (gb[axis] - v) * t), length = Math.hypot(...normal) || 1;
        const original = originals[ia] + (originals[ib] - originals[ia]) * t;
        const nodeA = nodeIndex(meta, ...corners[ia]), nodeB = nodeIndex(meta, ...corners[ib]);
        intersections.push({ key: nodeA < nodeB ? `${nodeA}:${nodeB}` : `${nodeB}:${nodeA}`, p, n: normal.map(v => v / length), c: surfaceColor(p, original, state.bandWidth) });
      }
      if (intersections.length === 3) emitTriangle(...intersections);
      else if (intersections.length === 4) {
        const center = [0, 1, 2].map(axis => intersections.reduce((sum, vertex) => sum + vertex.p[axis], 0) / 4);
        let normal = [0, 1, 2].map(axis => intersections.reduce((sum, vertex) => sum + vertex.n[axis], 0));
        const length = Math.hypot(...normal) || 1; normal = normal.map(v => v / length);
        const reference = intersections[0].p.map((v, axis) => v - center[axis]);
        const tangent = [normal[1] * reference[2] - normal[2] * reference[1], normal[2] * reference[0] - normal[0] * reference[2], normal[0] * reference[1] - normal[1] * reference[0]];
        for (const vertex of intersections) { const v = vertex.p.map((value, axis) => value - center[axis]); vertex.angle = Math.atan2(v.reduce((sum, value, axis) => sum + value * tangent[axis], 0), v.reduce((sum, value, axis) => sum + value * reference[axis], 0)); }
        intersections.sort((a, b) => a.angle - b.angle);
        emitTriangle(intersections[0], intersections[1], intersections[2]); emitTriangle(intersections[0], intersections[2], intersections[3]);
      }
    }
  }
  return { key, positions: new Float32Array(positions), normals: new Float32Array(normals), colors: new Float32Array(colors), indices: new Uint32Array(indices) };
}

function buildChunks(state, keys) { return [...keys].map(key => polygonizeChunk(state, key)); }
function statistics(state) { return { removedVolumeMm3: state.removedVolumeMm3, totalVolumeMm3: state.totalVolumeMm3, voxelMm: Math.max(...state.meta.spacing) * 1000, cutCount: state.cuts.length }; }

if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
  let state;
  self.onmessage = ({ data }) => {
    try {
      let chunks, changedSamples = 0, removedMm3 = 0;
      if (data.type === 'init') {
        state = createVolumeState(data.metadata, new Float32Array(data.buffer), data.chunkSize ?? 16);
        chunks = buildChunks(state, allChunkKeys(state));
      } else if (!state) throw new Error('The tissue volume is not initialized');
      else if (data.type === 'cut') {
        const dirty = new Set();
        for (const primitive of data.cuts) { const result = applyCapsuleCut(state, primitive); result.dirty.forEach(key => dirty.add(key)); changedSamples += result.changedSamples; removedMm3 += result.removedMm3; }
        chunks = buildChunks(state, dirty);
      } else if (data.type === 'restore') {
        resetVolume(state, data.cuts ?? []);
        chunks = buildChunks(state, allChunkKeys(state));
      } else throw new Error(`Unknown tissue operation: ${data.type}`);
      const transfer = chunks.flatMap(chunk => [chunk.positions.buffer, chunk.normals.buffer, chunk.colors.buffer, chunk.indices.buffer]);
      self.postMessage({ id: data.id, epoch: data.epoch, type: data.type, chunks, statistics: statistics(state), changedSamples, removedMm3 }, transfer);
    } catch (error) { self.postMessage({ id: data.id, epoch: data.epoch, error: error.message }); }
  };
}
