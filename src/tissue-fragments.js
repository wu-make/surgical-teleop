import * as THREE from 'three';
import { normalizeDeformation, deformPoint, inverseDeformPoint, deformationWeight, deformNormal } from './tissue-worker.js';

const array = value => Array.isArray(value) || ArrayBuffer.isView(value) ? [...value] : value.toArray();
const vec = value => new THREE.Vector3().fromArray(array(value));
const rotation = value => value ? new THREE.Quaternion().fromArray(array(value)).normalize() : new THREE.Quaternion();

/** Trilinear sampling with a positive extension outside a cropped specimen. */
export function sampleFragmentVolume(volume, point) {
  const p = array(point), { dims, origin, spacing, values } = volume;
  const g = p.map((v, i) => (v - origin[i]) / spacing[i]);
  if (g.some(v => !Number.isFinite(v))) return Infinity;
  const bounded = g.map((v, i) => Math.max(0, Math.min(dims[i] - 1, v)));
  const lo = bounded.map((v, i) => Math.min(dims[i] - 2, Math.floor(v)));
  const f = bounded.map((v, i) => v - lo[i]);
  let result = 0;
  for (let z = 0; z < 2; z++) for (let y = 0; y < 2; y++) for (let x = 0; x < 2; x++) {
    result += values[lo[0] + x + dims[0] * (lo[1] + y + dims[1] * (lo[2] + z))] *
      (x ? f[0] : 1 - f[0]) * (y ? f[1] : 1 - f[1]) * (z ? f[2] : 1 - f[2]);
  }
  const outside = Math.hypot(...g.map((v, i) => (v - bounded[i]) * spacing[i]));
  return outside ? Math.max(0, result) + outside : result;
}

/** Rigid transport of actual disconnected material, separate from liver recoil.
 * Released pieces use damped gravity and sampled contact, not calibrated FEM. */
export class TissueFragments {
  constructor(tissue) {
    this.tissue = tissue;
    this.group = new THREE.Group();
    this.group.name = 'detached-liver-specimens';
    this.group.layers.enable(1);
    tissue.group.add(this.group);
    this.items = new Map();
  }

  clear() {
    for (const piece of this.items.values()) piece.mesh.geometry.dispose();
    this.items.clear(); this.group.clear();
  }

  add(descriptor, saved) {
    if (this.items.has(descriptor.id)) return this.items.get(descriptor.id);
    const frozen = saved && Object.hasOwn(saved, 'deformation') ? saved.deformation :
      Object.hasOwn(descriptor, 'deformation') ? descriptor.deformation : this.tissue._deformation;
    const deformation = normalizeDeformation(frozen);
    const center = new THREE.Vector3().fromArray(deformPoint(descriptor.center, deformation));
    const positions = new Float32Array(descriptor.positions.length);
    const normals = new Float32Array(descriptor.normals.length);
    for (let i = 0; i < positions.length; i += 3) {
      const rest = [...descriptor.positions.subarray(i, i + 3)];
      const p = deformPoint(rest, deformation);
      const n = deformation ? deformNormal([...descriptor.normals.subarray(i, i + 3)], deformationWeight(rest, deformation).gradient, deformation.displacement) : descriptor.normals.subarray(i, i + 3);
      for (let axis = 0; axis < 3; axis++) { positions[i + axis] = p[axis] - center.getComponent(axis); normals[i + axis] = n[axis]; }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(descriptor.colors, 3));
    geometry.setAttribute('tissueRestPosition', new THREE.BufferAttribute(descriptor.positions, 3));
    geometry.setAttribute('tissueCutMask', new THREE.BufferAttribute(descriptor.cutMasks, 1));
    geometry.setIndex(new THREE.BufferAttribute(descriptor.indices, 1));
    geometry.computeBoundingBox(); geometry.computeBoundingSphere();
    const mesh = new THREE.Mesh(geometry, this.tissue.material);
    mesh.name = `specimen-${descriptor.id}`; mesh.layers.enable(1);
    mesh.castShadow = true; mesh.receiveShadow = true;
    mesh.userData.tissue = true; mesh.userData.fragmentId = descriptor.id;
    const piece = { id: descriptor.id, volumeMm3: descriptor.volumeMm3, referenceCenter: [...descriptor.center],
      frozenCenter: center, deformation, volume: descriptor.volume, mesh,
      position: saved ? vec(saved.position) : center.clone(), quaternion: rotation(saved?.quaternion),
      velocity: saved?.velocity ? vec(saved.velocity) : new THREE.Vector3(), held: !!saved?.held,
      attachment: saved?.attachment ? structuredClone(saved.attachment) : null, sleeping: !!saved?.sleeping,
      contactTime: 0, support: this._supportPoints(positions) };
    this.items.set(piece.id, piece); this.group.add(mesh); this.sync(piece);
    return piece;
  }

  _supportPoints(positions) {
    const points = [];
    for (let z = -1; z <= 1; z++) for (let y = -1; y <= 1; y++) for (let x = -1; x <= 1; x++) {
      if (!x && !y && !z) continue;
      let best = -Infinity, index = 0;
      for (let i = 0; i < positions.length; i += 3) {
        const dot = positions[i] * x + positions[i + 1] * y + positions[i + 2] * z;
        if (dot > best) { best = dot; index = i; }
      }
      points.push(new THREE.Vector3().fromArray(positions, index));
    }
    return points;
  }

  sync(piece) {
    piece.mesh.position.copy(piece.position); piece.mesh.quaternion.copy(piece.quaternion);
    piece.mesh.updateMatrix();
    piece.box = piece.mesh.geometry.boundingBox.clone().applyMatrix4(piece.mesh.matrix);
  }

  snapshot() {
    return [...this.items.values()].map(p => ({ id: p.id, position: p.position.toArray(), quaternion: p.quaternion.toArray(),
      velocity: p.velocity.toArray(), held: p.held, sleeping: p.sleeping, deformation: p.deformation ? structuredClone(p.deformation) : null,
      attachment: p.attachment ? structuredClone(p.attachment) : null }));
  }

  atReference(point) {
    for (const piece of this.items.values()) if (sampleFragmentVolume(piece.volume, point) <= .002) return piece;
    return null;
  }

  referencePoint(piece, point) {
    const frozen = vec(point).sub(piece.position).applyQuaternion(piece.quaternion.clone().invert()).add(piece.frozenCenter);
    return inverseDeformPoint(frozen.toArray(), piece.deformation);
  }

  distance(piece, point) { return sampleFragmentVolume(piece.volume, this.referencePoint(piece, point)); }

  nearest(point, margin = .006) {
    const p = vec(point);
    let best = null, bestDistance = Infinity;
    for (const piece of this.items.values()) {
      if (piece.box.distanceToPoint(p) > margin) continue;
      // The reference SDF is not a metric after the frozen traction. Its
      // minimum singular-value bound keeps compressed surfaces eligible;
      // surfacePoint then verifies the actual displayed projection distance.
      const minimumScale = piece.deformation ? 1 - 2.109375 * Math.hypot(...piece.deformation.displacement) / piece.deformation.radius : 1;
      const distance = Math.abs(this.distance(piece, p)) * minimumScale;
      if (distance <= margin && distance < bestDistance) { best = piece; bestDistance = distance; }
    }
    return best;
  }

  surfacePoint(point, margin) {
    // A distant point can project past a thin, curved specimen in its cropped
    // SDF. Approach commands use the actual displayed triangles directly.
    if (margin > .02) return this.closestSurfacePoint(point, margin);
    const piece = this.nearest(point, margin);
    if (!piece) return this.closestSurfacePoint(point, margin);
    const initial = vec(point), p = initial.clone(), gradient = new THREE.Vector3();
    const epsilon = Math.min(...piece.volume.spacing) * .3;
    for (let iteration = 0; iteration < 10; iteration++) {
      const d = this.distance(piece, p);
      for (let axis = 0; axis < 3; axis++) {
        const lo = p.clone(), hi = p.clone();
        lo.setComponent(axis, lo.getComponent(axis) - epsilon); hi.setComponent(axis, hi.getComponent(axis) + epsilon);
        gradient.setComponent(axis, (this.distance(piece, hi) - this.distance(piece, lo)) / (2 * epsilon));
      }
      if (!Number.isFinite(d) || gradient.lengthSq() < 1e-9) return this.closestSurfacePoint(point, margin);
      if (Math.abs(d) < .00004) break;
      p.addScaledVector(gradient, -d / gradient.lengthSq());
    }
    if (p.distanceTo(initial) > margin || Math.abs(this.distance(piece, p)) > .0003) return this.closestSurfacePoint(point, margin);
    p.normal = gradient.normalize(); p.fragmentId = piece.id;
    return p;
  }

  closestSurfacePoint(point, margin) {
    const initial = vec(point);
    if (!Number.isFinite(margin) || margin <= 0 || !initial.toArray().every(Number.isFinite)) return null;
    let best = margin * margin, result = null;
    const triangle = new THREE.Triangle(), candidate = new THREE.Vector3(), barycentric = new THREE.Vector3();
    const normal = new THREE.Vector3(), temporary = new THREE.Vector3();
    for (const piece of this.items.values()) {
      if (piece.box.distanceToPoint(initial) > margin) continue;
      const local = initial.clone().sub(piece.position).applyQuaternion(piece.quaternion.clone().invert());
      const geometry = piece.mesh.geometry, positions = geometry.attributes.position, normals = geometry.attributes.normal, indices = geometry.index.array;
      for (let i = 0; i < indices.length; i += 3) {
        const a = indices[i], b = indices[i + 1], c = indices[i + 2];
        triangle.a.fromBufferAttribute(positions, a); triangle.b.fromBufferAttribute(positions, b); triangle.c.fromBufferAttribute(positions, c);
        triangle.closestPointToPoint(local, candidate);
        const distance = local.distanceToSquared(candidate);
        if (distance > best) continue;
        best = distance;
        triangle.getBarycoord(candidate, barycentric);
        normal.fromBufferAttribute(normals, a).multiplyScalar(barycentric.x);
        normal.addScaledVector(temporary.fromBufferAttribute(normals, b), barycentric.y);
        normal.addScaledVector(temporary.fromBufferAttribute(normals, c), barycentric.z);
        if (!Number.isFinite(normal.lengthSq()) || normal.lengthSq() < 1e-12) triangle.getNormal(normal);
        result = candidate.clone().applyQuaternion(piece.quaternion).add(piece.position);
        result.normal = normal.clone().applyQuaternion(piece.quaternion).normalize(); result.fragmentId = piece.id;
      }
    }
    return result;
  }

  attach(id, anchor, quaternion) {
    const piece = this.items.get(id); if (!piece) return false;
    const q = rotation(quaternion);
    piece.attachment = { anchor: vec(anchor).sub(piece.position).applyQuaternion(piece.quaternion.clone().invert()).toArray(),
      rotationOffset: q.clone().invert().multiply(piece.quaternion).toArray() };
    piece.held = true; piece.sleeping = false; piece.velocity.set(0, 0, 0);
    return true;
  }

  move(id, point, quaternion) {
    const piece = this.items.get(id); if (!piece?.held || !piece.attachment) return false;
    piece.quaternion.copy(rotation(quaternion)).multiply(rotation(piece.attachment.rotationOffset));
    piece.position.copy(vec(point)).sub(vec(piece.attachment.anchor).applyQuaternion(piece.quaternion));
    piece.velocity.set(0, 0, 0); this.sync(piece); return true;
  }

  release(id) {
    const piece = this.items.get(id); if (!piece) return false;
    piece.held = false; piece.attachment = null; piece.sleeping = false; piece.contactTime = 0;
    piece.velocity.set(0, 0, 0); return true;
  }

  update(dt) {
    if (!Number.isFinite(dt) || dt <= 0) return;
    const inverse = this.tissue.group.getWorldQuaternion(new THREE.Quaternion()).invert();
    const gravity = new THREE.Vector3(0, -9.81, 0).applyQuaternion(inverse);
    const up = new THREE.Vector3(0, 1, 0).applyQuaternion(inverse);
    const steps = Math.max(1, Math.ceil(Math.min(.05, dt) / .01)), h = Math.min(.05, dt) / steps;
    for (const piece of this.items.values()) {
      if (piece.held || piece.sleeping) continue;
      for (let step = 0; step < steps; step++) {
        piece.velocity.addScaledVector(gravity, h).multiplyScalar(Math.exp(-h * 1.6));
        piece.position.addScaledVector(piece.velocity, h);
        let penetration = 0, deepest = null, floorPenetration = 0;
        for (const support of piece.support) {
          const point = support.clone().applyQuaternion(piece.quaternion).add(piece.position);
          const d = this.tissue.sampleDistance(point);
          if (Number.isFinite(d) && d < penetration) { penetration = d; deepest = point; }
          const world = this.tissue.group.localToWorld(point.clone());
          floorPenetration = Math.max(floorPenetration, .959 - world.y);
        }
        let contact = false;
        if (deepest && penetration < -.0001) {
          const normal = new THREE.Vector3(), eps = .0006;
          for (let axis = 0; axis < 3; axis++) {
            const lo = deepest.clone(), hi = deepest.clone(); lo.setComponent(axis, lo.getComponent(axis) - eps); hi.setComponent(axis, hi.getComponent(axis) + eps);
            normal.setComponent(axis, (this.tissue.sampleDistance(hi) - this.tissue.sampleDistance(lo)) / (2 * eps));
          }
          if (!Number.isFinite(normal.lengthSq()) || normal.lengthSq() < 1e-8) normal.copy(up);
          normal.normalize(); piece.position.addScaledVector(normal, Math.min(.008, -penetration + .0002));
          const inward = piece.velocity.dot(normal); if (inward < 0) piece.velocity.addScaledVector(normal, -inward);
          contact = true;
        }
        if (floorPenetration > 0) { piece.position.addScaledVector(up, floorPenetration); const inward = piece.velocity.dot(up); if (inward < 0) piece.velocity.addScaledVector(up, -inward); contact = true; }
        if (contact) { piece.velocity.multiplyScalar(Math.exp(-h * 18)); piece.contactTime += h; }
        else piece.contactTime = 0;
        if (piece.contactTime > .3 && piece.velocity.length() < .003) { piece.sleeping = true; piece.velocity.set(0, 0, 0); break; }
      }
      this.sync(piece);
    }
  }

  get metrics() {
    return { count: this.items.size, volumeMm3: [...this.items.values()].reduce((sum, p) => sum + p.volumeMm3, 0),
      pieces: [...this.items.values()].map(p => ({ id: p.id, volumeMm3: p.volumeMm3, position: p.position.toArray(), quaternion: p.quaternion.toArray(), held: p.held, sleeping: p.sleeping })) };
  }
}
