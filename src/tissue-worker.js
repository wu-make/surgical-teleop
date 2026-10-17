import {prepareWoundSurface,selectWoundSurface} from './wound-surface.js';
// Anatomy is sampled in metres. The field is negative inside the source organ.
// These exports deliberately have no browser dependencies so the same geometry
// and CSG code can be checked with Node's test runner.
export const TETRAHEDRA = [[0, 5, 1, 6], [0, 1, 2, 6], [0, 2, 3, 6], [0, 3, 7, 6], [0, 7, 4, 6], [0, 4, 5, 6]];
const CORNERS = [[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0], [0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]];
const EDGES = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]];
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const LOCAL_OFFSETS = [];
for (let z = -1; z <= 1; z++) for (let y = -1; y <= 1; y++) for (let x = -1; x <= 1; x++) LOCAL_OFFSETS.push([x, y, z]);
const LOCAL_ADJACENCY = LOCAL_OFFSETS.map((p, index) => LOCAL_OFFSETS.reduce((mask, q, j) => j !== index && Math.max(Math.abs(p[0] - q[0]), Math.abs(p[1] - q[1]), Math.abs(p[2] - q[2])) <= 1 ? mask | (1 << j) : mask, 0));
const EXTENDED_OFFSETS=[],EXTENDED_ADJACENCY=[];
for(let z=-2;z<=2;z++)for(let y=-2;y<=2;y++)for(let x=-2;x<=2;x++)EXTENDED_OFFSETS.push([x,y,z]);
for(let i=0;i<125;i++){
  const p=EXTENDED_OFFSETS[i],neighbours=[];
  for(let j=0;j<125;j++)if(i!==j&&Math.max(...p.map((v,k)=>Math.abs(v-EXTENDED_OFFSETS[j][k])))<=1)neighbours.push(j);
  EXTENDED_ADJACENCY.push(neighbours);
}

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

export const LOCAL_TRACTION=Object.freeze({radius:.018,coreRadius:.0025,stepFraction:.24,slipStrain:2.2});

/** Compact C2 displacement field. Radius/offset bounds keep its Jacobian
 * positive, allowing contact and cutting to use the same inverse as rendering.
 * This is an interactive geometric model, not a calibrated constitutive law. */
export function normalizeDeformation(input) {
  if (!input) return null;
  const local = input.local ?? input.point, displacement = input.displacement ?? input.delta;
  if (!Array.isArray(local) || !Array.isArray(displacement) || local.length !== 3 || displacement.length !== 3 || [...local, ...displacement].some(v => !Number.isFinite(v))) throw new Error('Invalid tissue deformation');
  const length = Math.hypot(...displacement);
  if (!Number.isFinite(length) || !Number.isFinite(length * 3.2)) throw new Error('Tissue deformation exceeds the numeric range');
  if (length < 1e-10) return null;
  const delta = [...displacement];
  if(input.model==='local-flow'){
    const radius=clamp(Number.isFinite(input.radius)?input.radius:LOCAL_TRACTION.radius,.012,.03);
    const coreRadius=clamp(Number.isFinite(input.coreRadius)?input.coreRadius:LOCAL_TRACTION.coreRadius,.001,radius*.25);
    const stepFraction=Math.min(1,(radius-coreRadius)*LOCAL_TRACTION.stepFraction/length);
    const steps=Math.max(1,Math.ceil(1/stepFraction));
    if(steps>512)throw new Error('Local traction exceeds supported material strain; the grasp must slip.');
    return {model:'local-flow',local:[...local],displacement:delta,radius,coreRadius,steps,stepFraction};
  }
  const radius = Math.max(clamp(Number.isFinite(input.radius) ? input.radius : 0.065, 0.02, 0.2), 3.2 * Math.hypot(...delta));
  return { local: [...local], displacement: delta, radius };
}

export function deformationWeight(point, deformation) {
  if (!deformation) return { weight: 0, gradient: [0, 0, 0] };
  if(deformation.model==='local-flow'){
    const count=deformation.steps,delta=deformation.displacement,local=deformation.local;
    const px=point[0]-local[0],py=point[1]-local[1],pz=point[2]-local[2],dx=delta[0],dy=delta[1],dz=delta[2];
    const lengthSquared=dx*dx+dy*dy+dz*dz,along=clamp((px*dx+py*dy+pz*dz)/lengthSquared,0,1);
    const ex=px-dx*along,ey=py-dy*along,ez=pz-dz*along;
    if(ex*ex+ey*ey+ez*ez>=deformation.radius*deformation.radius)return {weight:0,gradient:[0,0,0]};
    let weight=0,gx=0,gy=0,gz=0;
    for(let i=0;i<count;i++){
      const start=i*deformation.stepFraction,fraction=Math.min(deformation.stepFraction,1-start);
      const shift=weight-start,x=px+dx*shift,y=py+dy*shift,z=pz+dz*shift;
      const length=Math.sqrt(x*x+y*y+z*z),core=deformation.coreRadius,falloff=deformation.radius-core;
      if(length>=deformation.radius)continue;
      const r=Math.max(0,(length-core)/falloff),t=1-r,stepWeight=t**4*(4*r+1);
      const derivative=length>core?-20*r*t**3/(falloff*length):0;
      const ax=x*derivative,ay=y*derivative,az=z*derivative;
      const gain=1+(dx*ax+dy*ay+dz*az)*fraction;
      gx=gx*gain+ax*fraction;gy=gy*gain+ay*fraction;gz=gz*gain+az*fraction;
      weight+=stepWeight*fraction;
    }
    return {weight,gradient:[gx,gy,gz]};
  }
  const offset = point.map((v, axis) => v - deformation.local[axis]);
  const distance = Math.hypot(...offset), r = distance / deformation.radius;
  if (r >= 1) return { weight: 0, gradient: [0, 0, 0] };
  const t = 1 - r;
  const derivativeOverDistance = -20 * t * t * t / (deformation.radius * deformation.radius);
  return { weight: t ** 4 * (4 * r + 1), gradient: offset.map(v => v * derivativeOverDistance) };
}

export function deformPoint(point, deformation) {
  if (!deformation) return [...point];
  const { weight } = deformationWeight(point, deformation);
  return point.map((v, axis) => v + deformation.displacement[axis] * weight);
}

export function inverseDeformPoint(point, deformation) {
  if (!deformation) return [...point];
  if(deformation.model==='local-flow'){
    let result=[...point];const count=deformation.steps;
    for(let i=count-1;i>=0;i--){
      const start=i*deformation.stepFraction,fraction=Math.min(deformation.stepFraction,1-start);
      const step=deformation.displacement.map(v=>v*fraction),local=deformation.local.map((v,axis)=>v+deformation.displacement[axis]*start);
      // Each near-identity compact step has a strictly positive Jacobian;
      // undo its own map before moving to the preceding material frame.
      const target=[...result];
      for(let iteration=0;iteration<16;iteration++){
        const offset=result.map((v,axis)=>v-local[axis]),length=Math.hypot(...offset),core=deformation.coreRadius,falloff=deformation.radius-core;
        const r=Math.max(0,Math.min(1,(length-core)/falloff)),t=1-r,w=t**4*(4*r+1);
        const derivative=length>core&&r<1?-20*r*t**3/(falloff*length):0;
        const gradient=offset.map(v=>v*derivative),error=result.map((v,axis)=>v+step[axis]*w-target[axis]);
        if(Math.hypot(...error)<1e-11)break;
        const denominator=1+gradient.reduce((sum,v,axis)=>sum+v*step[axis],0);
        const projection=gradient.reduce((sum,v,axis)=>sum+v*error[axis],0)/denominator;
        result=result.map((v,axis)=>v-error[axis]+step[axis]*projection);
      }
    }
    return result;
  }
  const result = [...point], delta = deformation.displacement;
  for (let i = 0; i < 20; i++) {
    const { weight, gradient } = deformationWeight(result, deformation);
    const error = result.map((v, axis) => v + delta[axis] * weight - point[axis]);
    if (Math.hypot(...error) < 1e-10) break;
    const denominator = 1 + gradient.reduce((sum, v, axis) => sum + v * delta[axis], 0);
    const projection = gradient.reduce((sum, v, axis) => sum + v * error[axis], 0) / denominator;
    for (let axis = 0; axis < 3; axis++) result[axis] -= error[axis] - delta[axis] * projection;
  }
  return result;
}

/** Conservative singular-value bound for broadphase distance comparisons. */
export function deformationMinimumScale(deformation){
  if(!deformation)return 1;
  const length=Math.hypot(...deformation.displacement);
  if(deformation.model==='local-flow'){
    const k=2.109375*length/(deformation.radius-deformation.coreRadius),full=deformation.steps-1;
    return Math.max(1e-12,(1-k*deformation.stepFraction)**full*(1-k*(1-full*deformation.stepFraction)));
  }
  return Math.max(1e-12,1-2.109375*length/deformation.radius);
}

export function deformNormal(normal, gradient, displacement) {
  // J = I + displacement * grad(w)^T; inverse-transpose via Sherman-Morrison.
  const denominator = 1 + gradient.reduce((sum, v, axis) => sum + v * displacement[axis], 0);
  const projection = normal.reduce((sum, v, axis) => sum + v * displacement[axis], 0) / denominator;
  const result = normal.map((v, axis) => v - gradient[axis] * projection);
  const length = Math.hypot(...result) || 1;
  return result.map(v => v / length);
}

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
  return { meta, base, field, chunkSize, bandWidth, voxelMm3, totalVolumeMm3, removedVolumeMm3: 0, cuts: [],
    separations: [], fragmentRecords: [], fragmentVolumeMm3: 0, excluded: new Uint8Array(length), exclusionIndices: [],
    baselineLabels: null, connectivityVerified: false, topologyDirty: false,
    topologyMetrics: { scans: 0, scannedNodes: 0, localChecks: 0, lastScanMs: 0 } };
}

// Removing a voxel cannot disconnect the global solid if all of its remaining
// neighbours are still 26-connected inside the surrounding 3x3x3 block. A
// negative result is conservative: it only requests a full global confirmation.
function removalMayDisconnect(state, x, y, z) {
  state.topologyMetrics.localChecks++;
  const { meta, field } = state;
  let mask = 0;
  for (let i = 0; i < 27; i++) {
    if (i === 13) continue;
    const offset = LOCAL_OFFSETS[i], nx = x + offset[0], ny = y + offset[1], nz = z + offset[2];
    if (nx >= 0 && nx < meta.dims[0] && ny >= 0 && ny < meta.dims[1] && nz >= 0 && nz < meta.dims[2] && field[nodeIndex(meta, nx, ny, nz)] < 0) mask |= 1 << i;
  }
  if (!mask) return false;
  let frontier = mask & -mask, reached = frontier;
  while (frontier && reached !== mask) {
    const bit = frontier & -frontier, index = 31 - Math.clz32(bit);
    frontier &= ~bit;
    const next = LOCAL_ADJACENCY[index] & mask & ~reached;
    frontier |= next; reached |= next;
  }
  return reached !== mask&&extendedRemovalMayDisconnect(state,x,y,z);
}

// The 3³ test can fail because a neighbouring surface route leaves that tiny
// cube. A 5³ proof is still sufficient (never a heuristic split decision) and
// avoids scanning all ~1.8 million liver nodes for each such blade sample.
function extendedRemovalMayDisconnect(state,x,y,z){
  state.topologyMetrics.extendedChecks=(state.topologyMetrics.extendedChecks??0)+1;
  const solid=state._localSolid??=new Uint8Array(125),visited=state._localVisited??=new Uint8Array(125),queue=state._localQueue??=new Uint8Array(125);
  const {meta,field}=state;let seed=-1,remaining=0;
  visited.fill(0);
  for(let i=0;i<125;i++){
    const p=EXTENDED_OFFSETS[i],xx=x+p[0],yy=y+p[1],zz=z+p[2];
    solid[i]=xx>=0&&yy>=0&&zz>=0&&xx<meta.dims[0]&&yy<meta.dims[1]&&zz<meta.dims[2]&&field[nodeIndex(meta,xx,yy,zz)]<0?1:0;
    if(solid[i]&&Math.max(Math.abs(p[0]),Math.abs(p[1]),Math.abs(p[2]))<=1){remaining++;seed=i;}
  }
  if(seed<0)return false;
  let read=0,written=1;queue[0]=seed;visited[seed]=1;remaining--;
  while(read<written&&remaining){
    for(const next of EXTENDED_ADJACENCY[queue[read++]]){
      if(visited[next]||!solid[next])continue;
      visited[next]=1;queue[written++]=next;
      const p=EXTENDED_OFFSETS[next];
      if(Math.max(Math.abs(p[0]),Math.abs(p[1]),Math.abs(p[2]))<=1)remaining--;
    }
  }
  if(!remaining)state.topologyMetrics.extendedProofs=(state.topologyMetrics.extendedProofs??0)+1;
  return remaining>0;
}

export function distanceToSegment(point, start, end) {
  const dx = end[0] - start[0], dy = end[1] - start[1], dz = end[2] - start[2];
  const denominator = dx * dx + dy * dy + dz * dz;
  const t = denominator ? clamp(((point[0] - start[0]) * dx + (point[1] - start[1]) * dy + (point[2] - start[2]) * dz) / denominator, 0, 1) : 0;
  return Math.hypot(point[0] - start[0] - t * dx, point[1] - start[1] - t * dy, point[2] - start[2] - t * dz);
}

export function validateCut(cut) {
  let segments;
  if(cut.segments!==undefined){
    if(!Array.isArray(cut.segments)||!cut.segments.length||cut.segments.length>64)throw new Error('A cutting stroke requires 1–64 finite blade segments.');
    segments=cut.segments.map(segment=>{
      const a=segment.a,b=segment.b??a;
      if(!Array.isArray(a)||!Array.isArray(b)||a.length!==3||b.length!==3||![...a,...b].every(Number.isFinite))throw new Error('Cut points must be finite three-component coordinates');
      if(Math.hypot(...b.map((v,i)=>v-a[i]))>.5)throw new Error('Cut segment exceeds the supported workspace');
      return {a:[...a],b:[...b]};
    });
  }
  const start = cut.a ?? cut.point ?? segments?.[0].a, end = cut.b ?? segments?.[0].b ?? start;
  if (!Array.isArray(start) || !Array.isArray(end) || start.length !== 3 || end.length !== 3 || [...start, ...end].some(v => !Number.isFinite(v))) throw new Error('Cut points must be finite three-component coordinates');
  if (!Number.isFinite(cut.radius) || cut.radius <= 0 || cut.radius > 0.05) throw new Error('Cut radius must be positive and at most 50 mm');
  if (Math.hypot(...end.map((v, i) => v - start[i])) > 0.5) throw new Error('Cut segment exceeds the supported workspace');
  const result = { a: [...start], b: [...end], radius: cut.radius };
  if(segments)result.segments=segments;
  const deformation = normalizeDeformation(cut.deformation);
  if (deformation) result.deformation = deformation;
  return result;
}

/** A CAD curve is retained as an exact union of its sampled blade capsules.
 * Material-to-display mapping is evaluated once per voxel, not once per jaw
 * segment. Single-segment historical strokes retain their original format. */
export function distanceToCut(point,cut){
  if(!cut.segments)return distanceToSegment(point,cut.a,cut.b);
  let distance=Infinity;
  for(const segment of cut.segments)distance=Math.min(distance,distanceToSegment(point,segment.a,segment.b));
  return distance;
}

export function cutBounds(cut,padding=0){
  const low=[Infinity,Infinity,Infinity],high=[-Infinity,-Infinity,-Infinity];
  for(const segment of cut.segments??[cut])for(let axis=0;axis<3;axis++){
    low[axis]=Math.min(low[axis],segment.a[axis]-padding,segment.b[axis]-padding);
    high[axis]=Math.max(high[axis],segment.a[axis]+padding,segment.b[axis]+padding);
  }
  return {low,high};
}

export function allChunkKeys(state) {
  const keys = [];
  const count = state.meta.dims.map(n => Math.ceil((n - 1) / state.chunkSize));
  for (let z = 0; z < count[2]; z++) for (let y = 0; y < count[1]; y++) for (let x = 0; x < count[0]; x++) keys.push(`${x},${y},${z}`);
  return keys;
}

export function applyCapsuleCut(state, input) {
  const cut = validateCut(input);
  const { meta, field } = state;
  const margin = 2.5 * Math.max(...meta.spacing);
  // Since x_display = x_material + displacement*w and 0<=w<=1, these bounds
  // also enclose curved inverse images of long straight display-space strokes.
  const displacement = cut.deformation?.displacement ?? [0, 0, 0];
  const padding = cut.radius + margin;
  const bounds=cutBounds(cut,padding);
  const lower = bounds.low.map((v, axis) => clamp(Math.floor((v-Math.max(0,displacement[axis])-meta.origin[axis])/meta.spacing[axis]),0,meta.dims[axis]-1));
  const upper = bounds.high.map((v, axis) => clamp(Math.ceil((v-Math.min(0,displacement[axis])-meta.origin[axis])/meta.spacing[axis]),0,meta.dims[axis]-1));
  const boundedSegments=cut.segments?.map(segment=>({segment,
    low:segment.a.map((v,axis)=>clamp(Math.floor((Math.min(v,segment.b[axis])-Math.max(0,displacement[axis])-padding-meta.origin[axis])/meta.spacing[axis]),0,meta.dims[axis]-1)),
    high:segment.a.map((v,axis)=>clamp(Math.ceil((Math.max(v,segment.b[axis])-Math.min(0,displacement[axis])+padding-meta.origin[axis])/meta.spacing[axis]),0,meta.dims[axis]-1))}));
  let removedMm3 = 0, changedSamples = 0, removedNodes = 0;
  const point = [0, 0, 0];
  const changedBounds = [[Infinity, Infinity, Infinity], [-Infinity, -Infinity, -Infinity]];
  for (let z = lower[2]; z <= upper[2]; z++) for (let y = lower[1]; y <= upper[1]; y++) for (let x = lower[0]; x <= upper[0]; x++) {
    point[0] = meta.origin[0] + x * meta.spacing[0]; point[1] = meta.origin[1] + y * meta.spacing[1]; point[2] = meta.origin[2] + z * meta.spacing[2];
    const index = nodeIndex(meta, x, y, z);
    // Difference: organ \ cutter = max(organSignedDistance, -cutterSignedDistance).
    let displayPoint,distance=Infinity;
    if(boundedSegments){
      for(const entry of boundedSegments){
        if(x<entry.low[0]||x>entry.high[0]||y<entry.low[1]||y>entry.high[1]||z<entry.low[2]||z>entry.high[2])continue;
        displayPoint??=cut.deformation?deformPoint(point,cut.deformation):point;
        distance=Math.min(distance,distanceToSegment(displayPoint,entry.segment.a,entry.segment.b));
      }
      if(distance===Infinity)continue;
    }else{displayPoint=cut.deformation?deformPoint(point,cut.deformation):point;distance=distanceToCut(displayPoint,cut);}
    const value = Math.fround(Math.max(field[index], cut.radius-distance));
    if (value <= field[index]) continue;
    const wasInside = field[index] < 0;
    removedMm3 += (occupancy(field[index], state.bandWidth) - occupancy(value, state.bandWidth)) * state.voxelMm3;
    field[index] = value;
    if (wasInside && value >= 0) {
      removedNodes++;
      if (!state.topologyDirty && removalMayDisconnect(state, x, y, z)) state.topologyDirty = true;
    }
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
  return { dirty, removedMm3, changedSamples, removedNodes, removedVolumeMm3: state.removedVolumeMm3 };
}

export function resetVolume(state, cuts = []) {
  state.field.set(state.base); state.cuts = []; state.removedVolumeMm3 = 0;
  state.separations = []; state.fragmentRecords = []; state.fragmentVolumeMm3 = 0;
  state.excluded.fill(0); state.exclusionIndices = [];
  state.topologyDirty = false; state.connectivityVerified = !!state.baselineLabels;
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

function cutSurfaceMask(originalDistance,width){return clamp((-originalDistance-width*.08)/(width*.2),0,1);}
function surfaceColor(point, originalDistance, width) {
  const noise = 0.93 + 0.045 * Math.sin(point[0] * 492 + Math.sin(point[2] * 341)) + 0.025 * Math.sin(point[1] * 713 - point[2] * 427);
  const cut = cutSurfaceMask(originalDistance,width);
  return [(0.19 + 0.14 * cut) * noise, (0.027 + 0.027 * cut) * noise, (0.018 + 0.024 * cut) * noise];
}

export function polygonizeChunk(state, key) {
  const [cx, cy, cz] = key.split(',').map(Number);
  const { meta, field, base, chunkSize } = state;
  const first = [cx, cy, cz].map(v => v * chunkSize), last = first.map((v, axis) => Math.min(v + chunkSize, meta.dims[axis] - 1));
  const positions = [], normals = [], colors = [], cutMasks = [], indices = [], vertexIndices = new Map();
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
        positions.push(...vertex.p); normals.push(...vertex.n); colors.push(...vertex.c); cutMasks.push(vertex.cutMask);
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
        intersections.push({ key: nodeA < nodeB ? `${nodeA}:${nodeB}` : `${nodeB}:${nodeA}`, p, n: normal.map(v => v / length), c: surfaceColor(p, original, state.bandWidth), cutMask: cutSurfaceMask(original,state.bandWidth) });
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
  return { key, positions: new Float32Array(positions), normals: new Float32Array(normals), colors: new Float32Array(colors), cutMasks: new Float32Array(cutMasks), indices: new Uint32Array(indices) };
}

function scanComponents(state, values, labels = null) {
  const started = performance.now(), { dims } = state.meta, [nx, ny, nz] = dims, plane = nx * ny;
  const visited = state._connectivityVisited ??= new Uint8Array(values.length);
  const queue = state._connectivityQueue ??= new Uint32Array(values.length);
  visited.fill(0);
  const components = [];
  let written = 0;
  for (let seed = 0; seed < values.length; seed++) {
    if (visited[seed] || values[seed] >= 0) continue;
    const start = written, label = components.length + 1;
    let read = start;
    queue[written++] = seed; visited[seed] = 1;
    if (labels) labels[seed] = label;
    const low = [nx, ny, nz], high = [0, 0, 0];
    while (read < written) {
      const index = queue[read++], z = Math.floor(index / plane), y = Math.floor((index - z * plane) / nx), x = index - z * plane - y * nx;
      if (x < low[0]) low[0] = x; if (x > high[0]) high[0] = x;
      if (y < low[1]) low[1] = y; if (y > high[1]) high[1] = y;
      if (z < low[2]) low[2] = z; if (z > high[2]) high[2] = z;
      const x0 = Math.max(0, x - 1), x1 = Math.min(nx - 1, x + 1), y0 = Math.max(0, y - 1), y1 = Math.min(ny - 1, y + 1), z0 = Math.max(0, z - 1), z1 = Math.min(nz - 1, z + 1);
      for (let zz = z0; zz <= z1; zz++) for (let yy = y0; yy <= y1; yy++) {
        const row = zz * plane + yy * nx;
        for (let xx = x0; xx <= x1; xx++) {
          const neighbour = row + xx;
          if (!visited[neighbour] && values[neighbour] < 0) {
            visited[neighbour] = 1; queue[written++] = neighbour;
            if (labels) labels[neighbour] = label;
          }
        }
      }
    }
    components.push({ seed, start, end: written, voxelCount: written - start, low, high, baseline: state.baselineLabels?.[seed] ?? label });
  }
  state.topologyMetrics.scans++;
  state.topologyMetrics.scannedNodes += values.length;
  state.topologyMetrics.lastScanMs = performance.now() - started;
  return { components, queue };
}

/** Label original islands once. A pre-existing source island is never invented
 * as a newly cut specimen; each original island retains its largest descendant. */
export function initializeConnectivity(state) {
  if (state.baselineLabels) return state;
  const labels = new Uint32Array(state.base.length);
  scanComponents(state, state.base, labels);
  state.baselineLabels = labels;
  if (!state.cuts.length) { state.connectivityVerified = true; state.topologyDirty = false; }
  return state;
}

function retainedComponents(components) {
  const retained = new Map();
  for (const component of components) {
    const old = retained.get(component.baseline);
    if (!old || component.voxelCount > old.voxelCount) retained.set(component.baseline, component);
  }
  return retained;
}

function keysForBounds(state, low, high) {
  const first = low.map(v => Math.max(0, Math.floor((v - 2) / state.chunkSize)));
  const last = high.map((v, axis) => Math.min(Math.ceil((state.meta.dims[axis] - 1) / state.chunkSize) - 1, Math.floor((v + 1) / state.chunkSize)));
  const keys = new Set();
  for (let z = first[2]; z <= last[2]; z++) for (let y = first[1]; y <= last[1]; y++) for (let x = first[0]; x <= last[0]; x++) keys.add(`${x},${y},${z}`);
  return keys;
}

function joinMeshes(chunks) {
  const vertexComponents = chunks.reduce((sum, chunk) => sum + chunk.positions.length, 0), indexCount = chunks.reduce((sum, chunk) => sum + chunk.indices.length, 0);
  const result = { positions: new Float32Array(vertexComponents), normals: new Float32Array(vertexComponents), colors: new Float32Array(vertexComponents), cutMasks: new Float32Array(vertexComponents / 3), indices: new Uint32Array(indexCount) };
  let positionOffset = 0, indexOffset = 0;
  for (const chunk of chunks) {
    result.positions.set(chunk.positions, positionOffset); result.normals.set(chunk.normals, positionOffset); result.colors.set(chunk.colors, positionOffset); result.cutMasks.set(chunk.cutMasks, positionOffset / 3);
    for (let i = 0; i < chunk.indices.length; i++) result.indices[indexOffset + i] = chunk.indices[i] + positionOffset / 3;
    positionOffset += chunk.positions.length; indexOffset += chunk.indices.length;
  }
  return result;
}

function meshMassProperties(mesh) {
  let determinant = 0, x = 0, y = 0, z = 0;
  const p = mesh.positions, indices = mesh.indices;
  for (let i = 0; i < indices.length; i += 3) {
    const a = indices[i] * 3, b = indices[i + 1] * 3, c = indices[i + 2] * 3;
    const v = p[a] * (p[b + 1] * p[c + 2] - p[b + 2] * p[c + 1]) + p[a + 1] * (p[b + 2] * p[c] - p[b] * p[c + 2]) + p[a + 2] * (p[b] * p[c + 1] - p[b + 1] * p[c]);
    determinant += v;
    x += v * (p[a] + p[b] + p[c]); y += v * (p[a + 1] + p[b + 1] + p[c + 1]); z += v * (p[a + 2] + p[b + 2] + p[c + 2]);
  }
  if (Math.abs(determinant) < 1e-20) throw new Error('Detached tissue has no closed three-dimensional volume');
  return { volumeMm3: Math.abs(determinant) / 6 * 1e9, center: [x, y, z].map(v => v / (4 * determinant)) };
}

function extractComponent(state, scan, component, record = null) {
  const nodeIndices = scan.queue.slice(component.start, component.end), membership = new Set(nodeIndices);
  const low = component.low.map(v => v - 2), high = component.high.map(v => v + 2), dims = low.map((v, axis) => high[axis] - v + 1);
  const origin = low.map((v, axis) => state.meta.origin[axis] + v * state.meta.spacing[axis]);
  const metadata = { dims, origin, spacing: [...state.meta.spacing] }, length = dims[0] * dims[1] * dims[2];
  const field = new Float32Array(length), base = new Float32Array(length), outside = Math.max(...state.meta.spacing);
  for (let z = 0; z < dims[2]; z++) for (let y = 0; y < dims[1]; y++) for (let x = 0; x < dims[0]; x++) {
    const gx = x + low[0], gy = y + low[1], gz = z + low[2], localIndex = x + dims[0] * (y + dims[1] * z);
    if (gx < 0 || gy < 0 || gz < 0 || gx >= state.meta.dims[0] || gy >= state.meta.dims[1] || gz >= state.meta.dims[2]) { field[localIndex] = outside; base[localIndex] = outside; continue; }
    const globalIndex = nodeIndex(state.meta, gx, gy, gz), value = state.field[globalIndex];
    field[localIndex] = membership.has(globalIndex) ? value : Math.max(0, value >= 0 ? value : -value);
    base[localIndex] = state.base[globalIndex];
  }
  const cropped = { meta: metadata, field, base, chunkSize: state.chunkSize, bandWidth: state.bandWidth };
  const mesh = joinMeshes(allChunkKeys(cropped).map(key => polygonizeChunk(cropped, key))), mass = meshMassProperties(mesh);
  const cutIndex = state.cuts.length, seed = component.seed, id = record?.id ?? `fragment-${cutIndex.toString(36)}-${seed.toString(36)}`;
  if (state.fragmentRecords.some(fragment => fragment.id === id)) throw new Error('Duplicate detached tissue identifier');
  const deformation = normalizeDeformation(state.cuts[cutIndex - 1]?.deformation);
  const fragment = { id, cutIndex, seed, voxelCount: component.voxelCount, ...mass, ...mesh, deformation,
    coordinateSpace: 'source-material', volume: { dims, origin, spacing: [...state.meta.spacing], values: field } };
  const positiveValues = new Float32Array(nodeIndices.length);
  for (let i = 0; i < nodeIndices.length; i++) {
    const index = nodeIndices[i], positive = Math.fround(Math.max(Math.abs(state.field[index]), state.bandWidth * 0.75));
    state.field[index] = positive; positiveValues[i] = positive;
    if (!state.excluded[index]) { state.excluded[index] = 1; state.exclusionIndices.push(index); }
  }
  state.fragmentRecords.push({ id, cutIndex, seed, voxelCount: component.voxelCount, volumeMm3: mass.volumeMm3, center: [...mass.center] });
  state.fragmentVolumeMm3 += mass.volumeMm3;
  state.separations.push({ id, cutIndex, seed });
  return { fragment, nodeIndices, positiveValues, dirty: keysForBounds(state, component.low, component.high) };
}

function combineExtractions(extractions) {
  const length = extractions.reduce((sum, extraction) => sum + extraction.nodeIndices.length, 0);
  const nodeIndices = new Uint32Array(length), positiveValues = new Float32Array(length), dirty = new Set();
  let offset = 0;
  for (const extraction of extractions) { nodeIndices.set(extraction.nodeIndices, offset); positiveValues.set(extraction.positiveValues, offset); offset += extraction.nodeIndices.length; extraction.dirty.forEach(key => dirty.add(key)); }
  return { fragments: extractions.map(result => result.fragment), dirty, exclusions: { nodeIndices, positiveValues } };
}

/** Only globally disconnected descendants become transportable closed solids.
 * Every true split requests confirmation on the same cut batch; no N-cut timer. */
export function separateDisconnectedComponents(state, { force = false, minVoxels = 12 } = {}) {
  initializeConnectivity(state);
  if (!force && state.connectivityVerified && !state.topologyDirty) return combineExtractions([]);
  const scan = scanComponents(state, state.field), retained = retainedComponents(scan.components), extractions = [];
  for (const component of scan.components) {
    if (retained.get(component.baseline) === component || component.voxelCount < minVoxels) continue;
    extractions.push(extractComponent(state, scan, component));
  }
  state.connectivityVerified = true; state.topologyDirty = false;
  return combineExtractions(extractions);
}

/** Replay separation events at their exact cut index. Later cuts operate only
 * on the remaining parent field, never on already detached specimens. */
export function restoreVolumeWithSeparations(state, cuts = [], separations = []) {
  const normalized = cuts.map(validateCut), events = separations.map(event => ({ ...event }));
  const ids = new Set(), components = new Set();
  for (const event of events) {
    const componentKey = `${event.cutIndex}:${event.seed}`;
    if (!Number.isInteger(event.cutIndex) || event.cutIndex < 1 || event.cutIndex > normalized.length || !Number.isInteger(event.seed) || event.seed < 0 || event.seed >= state.field.length || typeof event.id !== 'string' || !/^fragment-[a-z0-9-]+$/.test(event.id) || ids.has(event.id) || components.has(componentKey)) throw new Error('Invalid tissue separation history');
    ids.add(event.id); components.add(componentKey);
  }
  events.sort((a, b) => a.cutIndex - b.cutIndex || a.seed - b.seed);
  // Validate the complete replay before committing. A corrupt imported event
  // must not leave the worker halfway through a different organ/history.
  const original = state;
  state = { ...state, field: new Float32Array(state.base), excluded: new Uint8Array(state.base.length), topologyMetrics: { ...state.topologyMetrics } };
  resetVolume(state); initializeConnectivity(state);
  const fragments = [];
  for (let i = 0; i < normalized.length; i++) {
    applyCapsuleCut(state, normalized[i]);
    const scheduled = events.filter(event => event.cutIndex === i + 1);
    if (!scheduled.length) continue;
    const scan = scanComponents(state, state.field), retained = retainedComponents(scan.components);
    for (const event of scheduled) {
      const component = scan.components.find(component => component.seed === event.seed);
      if (!component || retained.get(component.baseline) === component) throw new Error('Separation history does not match a fully disconnected component');
      fragments.push(extractComponent(state, scan, component, event).fragment);
    }
    state.connectivityVerified = true; state.topologyDirty = false;
  }
  const nodeIndices = new Uint32Array(state.exclusionIndices), positiveValues = new Float32Array(nodeIndices.length);
  for (let i = 0; i < nodeIndices.length; i++) positiveValues[i] = state.field[nodeIndices[i]];
  const field = original.field;
  field.set(state.field); Object.assign(original, state, { field });
  return { fragments, dirty: new Set(allChunkKeys(state)), exclusions: { nodeIndices, positiveValues } };
}

function buildChunks(state, keys) { return [...keys].map(key => {const chunk=polygonizeChunk(state,key);chunk.woundSurface=prepareWoundSurface(chunk);return chunk;}); }
function statistics(state) { return { removedVolumeMm3: state.removedVolumeMm3, totalVolumeMm3: state.totalVolumeMm3, voxelMm: Math.max(...state.meta.spacing) * 1000, cutCount: state.cuts.length,
  fragmentCount: state.fragmentRecords.length, fragmentVolumeMm3: state.fragmentVolumeMm3, topology: { ...state.topologyMetrics } }; }

if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
  let state;const woundChunks=new Map(),woundFragments=new Map();
  self.onmessage = ({ data }) => {
    try {
      let chunks, changedSamples = 0, removedMm3 = 0, fragments = [], exclusions = { nodeIndices: new Uint32Array(), positiveValues: new Float32Array() };
      if (data.type === 'init') {
        state = createVolumeState(data.metadata, new Float32Array(data.buffer), data.chunkSize ?? 16);
        initializeConnectivity(state);
        chunks = buildChunks(state, allChunkKeys(state));
      } else if (!state) throw new Error('The tissue volume is not initialized');
      else if (data.type === 'cut') {
        const dirty = new Set();
        const separatedIndices=[],separatedValues=[];
        for (const primitive of data.cuts) {
          const result = applyCapsuleCut(state, primitive); result.dirty.forEach(key => dirty.add(key)); changedSamples += result.changedSamples; removedMm3 += result.removedMm3;
          // Preserve the same topology boundary as one-at-a-time input: after
          // a true split, later samples cut only the mother, not the specimen.
          // Geometry generation remains amortized across the bounded pass.
          const separated=separateDisconnectedComponents(state);
          fragments.push(...separated.fragments);separated.dirty.forEach(key=>dirty.add(key));
          for(const value of separated.exclusions.nodeIndices)separatedIndices.push(value);
          for(const value of separated.exclusions.positiveValues)separatedValues.push(value);
        }
        exclusions={nodeIndices:new Uint32Array(separatedIndices),positiveValues:new Float32Array(separatedValues)};
        chunks = buildChunks(state, dirty);
      } else if (data.type === 'restore') {
        const restored = restoreVolumeWithSeparations(state, data.cuts ?? [], data.separations ?? []);
        fragments = restored.fragments; exclusions = restored.exclusions;
        chunks = buildChunks(state, allChunkKeys(state));
      } else throw new Error(`Unknown tissue operation: ${data.type}`);
      if(data.type!=='cut'){woundChunks.clear();woundFragments.clear();}
      for(const chunk of chunks){woundChunks.delete(chunk.key);if(chunk.positions.length)woundChunks.set(chunk.key,chunk.woundSurface);delete chunk.woundSurface;}
      for(const fragment of fragments)woundFragments.set(fragment.id,{id:fragment.id,surface:prepareWoundSurface(fragment,true)});
      const woundSelection=selectWoundSurface(woundChunks.values(),woundFragments.values());
      const transfer = chunks.flatMap(chunk => [chunk.positions.buffer, chunk.normals.buffer, chunk.colors.buffer, chunk.cutMasks.buffer, chunk.indices.buffer]);
      for (const fragment of fragments)transfer.push(fragment.positions.buffer, fragment.normals.buffer, fragment.colors.buffer, fragment.cutMasks.buffer, fragment.indices.buffer, fragment.volume.values.buffer);
      transfer.push(woundSelection.edges.buffer);
      transfer.push(exclusions.nodeIndices.buffer, exclusions.positiveValues.buffer);
      self.postMessage({ id: data.id, epoch: data.epoch, type: data.type, chunks,woundSelection, statistics: statistics(state), changedSamples, removedMm3, fragments,
        exclusions: { reset: data.type !== 'cut', ...exclusions }, separations: state.separations.map(event => ({ ...event })) }, transfer);
    } catch (error) { self.postMessage({ id: data.id, epoch: data.epoch, error: error.message }); }
  };
}
