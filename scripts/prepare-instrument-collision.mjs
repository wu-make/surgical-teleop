/**
 * Reproducible tight collision envelopes for the exact shipped instrument CAD.
 * Run `node scripts/prepare-instrument-collision.mjs` from the repository root.
 * No downloaded assets, model rescaling, browser APIs or optional packages.
 *
 * The rigid shaft has one measured capsule. Distal CAD is clipped into short
 * axial slabs before fitting capsules. Every clipped source triangle belongs
 * to a convex capsule; thus the complete triangle surface (not just sampled
 * vertices) is covered. The endpoints belong to their source URDF link frame.
 * Capsules are conservative geometric envelopes, not precision contact meshes.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { Matrix4, Vector3, Quaternion } from 'three';

const root = new URL('../', import.meta.url);
export const COLLISION_MARGIN = .00015;
const round = value => Number(value.toFixed(10)) || 0;
const vector = value => value.map(round);

export function readGlbGeometry(buffer) {
  const jsonLength = buffer.readUInt32LE(12);
  const gltf = JSON.parse(buffer.subarray(20, 20 + jsonLength).toString('utf8'));
  const binaryStart = 28 + jsonLength;
  const binary = buffer.subarray(binaryStart);
  const nodes = gltf.nodes;
  const parent = new Map();
  nodes.forEach((node, index) => node.children?.forEach(child => parent.set(child, index)));
  const nodeMatrix = node => node.matrix
    ? new Matrix4().fromArray(node.matrix)
    : new Matrix4().compose(new Vector3(...(node.translation ?? [0, 0, 0])),
      new Quaternion(...(node.rotation ?? [0, 0, 0, 1])), new Vector3(...(node.scale ?? [1, 1, 1])));
  function accessor(index) {
    const specification = gltf.accessors[index], view = gltf.bufferViews[specification.bufferView];
    const components = specification.type === 'VEC3' ? 3 : 1;
    const bytes = specification.componentType === 5123 ? 2 : 4;
    const offset = (view.byteOffset ?? 0) + (specification.byteOffset ?? 0);
    const stride = view.byteStride ?? components * bytes;
    const result = [];
    for (let i = 0; i < specification.count; i++) for (let c = 0; c < components; c++) {
      const position = offset + i * stride + c * bytes;
      result.push(specification.componentType === 5126 ? binary.readFloatLE(position)
        : specification.componentType === 5123 ? binary.readUInt16LE(position) : binary.readUInt32LE(position));
    }
    return result;
  }
  const result = [];
  nodes.forEach((node, nodeIndex) => {
    if (node.mesh === undefined) return;
    let linkIndex = parent.get(nodeIndex), transform = nodeMatrix(node);
    while (!nodes[linkIndex].name?.endsWith('_link')) {
      transform.premultiply(nodeMatrix(nodes[linkIndex])); linkIndex = parent.get(linkIndex);
    }
    for (const primitive of gltf.meshes[node.mesh].primitives) {
      const positions = accessor(primitive.attributes.POSITION), points = [];
      for (let i = 0; i < positions.length; i += 3) {
        points.push(new Vector3().fromArray(positions, i).applyMatrix4(transform).toArray());
      }
      const indices = primitive.indices === undefined ? points.map((_, i) => i) : accessor(primitive.indices);
      result.push({ name: node.name, link: nodes[linkIndex].name, points, indices });
    }
  });
  return result;
}

function clipPlane(polygon, axis, boundary, sign) {
  const result = [];
  for (let i = 0; i < polygon.length; i++) {
    const a = polygon[i], b = polygon[(i + 1) % polygon.length];
    const da = sign * (a[axis] - boundary), db = sign * (b[axis] - boundary);
    if (da >= -1e-14) result.push(a);
    if ((da < 0 && db > 0) || (da > 0 && db < 0)) {
      const t = da / (da - db);
      result.push(a.map((value, c) => value + (b[c] - value) * t));
    }
  }
  return result;
}

export function clippedPoints(meshes, axis, minimum, maximum) {
  const result = [];
  for (const mesh of meshes) for (let i = 0; i < mesh.indices.length; i += 3) {
    let polygon = [mesh.points[mesh.indices[i]], mesh.points[mesh.indices[i + 1]], mesh.points[mesh.indices[i + 2]]];
    if (Math.max(...polygon.map(p => p[axis])) < minimum - 1e-14
      || Math.min(...polygon.map(p => p[axis])) > maximum + 1e-14) continue;
    polygon = clipPlane(clipPlane(polygon, axis, minimum, 1), axis, maximum, -1);
    result.push(...polygon);
  }
  return result;
}

export function makeCollisionData(name, glbBuffer, metadataBuffer) {
  const metadata = JSON.parse(metadataBuffer), meshes = readGlbGeometry(glbBuffer);
  const capsules = [];
  function fit(meshGroup, link, region, axis, width) {
    const allPoints = meshGroup.flatMap(mesh => mesh.points);
    const minimum = Math.min(...allPoints.map(p => p[axis]));
    const maximum = Math.max(...allPoints.map(p => p[axis]));
    const count = width === Infinity ? 1 : Math.ceil((maximum - minimum) / width);
    for (let index = 0; index < count; index++) {
      const low = minimum + (maximum - minimum) * index / count;
      const high = minimum + (maximum - minimum) * (index + 1) / count;
      const points = clippedPoints(meshGroup, axis, low, high);
      if (!points.length) continue;
      const axes = [0, 1, 2].filter(c => c !== axis), center = [0, 0, 0];
      for (const c of axes) center[c] = (Math.min(...points.map(p => p[c])) + Math.max(...points.map(p => p[c]))) / 2;
      const radius = Math.sqrt(Math.max(...points.map(p => axes.reduce((sum, c) => sum + (p[c] - center[c]) ** 2, 0)))) + COLLISION_MARGIN;
      const a = center.slice(), b = center.slice(); a[axis] = low; b[axis] = high;
      capsules.push({ id: `${region}-${link}-${index}`, link, region, a: vector(a), b: vector(b), radius: round(radius),
        source: meshGroup.map(mesh => mesh.name), slab: { axis, min: round(low), max: round(high) } });
    }
  }
  const shaft = meshes.filter(mesh => mesh.link === 'roll_link' && Math.max(...mesh.points.map(p => p[2])) - Math.min(...mesh.points.map(p => p[2])) > .1);
  fit(shaft, 'roll_link', 'shaft', 2, Infinity);
  const distalRoll = meshes.filter(mesh => mesh.link === 'roll_link' && !shaft.includes(mesh));
  fit(distalRoll, 'roll_link', 'wrist', 2, .0035);
  fit(meshes.filter(mesh => mesh.link === 'wrist_pitch_link'), 'wrist_pitch_link', 'wrist', 0, .0035);
  fit(meshes.filter(mesh => mesh.link === 'wrist_yaw_link'), 'wrist_yaw_link', 'wrist', 2, .0035);
  for (const link of ['jaw_1_link', 'jaw_2_link']) fit(meshes.filter(mesh => mesh.link === link), link, 'jaw', 1, .003);
  return {
    units: 'meters', margin: COLLISION_MARGIN,
    source: `public/assets/${name}.glb`, sourceSha256: createHash('sha256').update(glbBuffer).digest('hex'),
    frame: 'Each capsule a/b is in its named source URDF link coordinate system; transform with that animated link matrix.',
    fit: 'Triangle-clipped axial slabs; radial bounding circle plus 0.15 mm. No TCP sphere or jaw-gap fill.',
    tipPositionAtZero: metadata.tipPositionAtZero, joints: metadata.joints,
    coverage: { meshes: meshes.length, triangles: meshes.reduce((sum, mesh) => sum + mesh.indices.length / 3, 0),
      vertices: meshes.reduce((sum, mesh) => sum + mesh.points.length, 0), shaftSlabs: 1,
      distalSlabMaximum: .0035 },
    capsules,
  };
}

export async function prepareCollisionData() {
  const result = {};
  for (const name of ['needle-driver', 'scissors']) {
    result[name] = makeCollisionData(name,
      await readFile(new URL(`public/assets/${name}.glb`, root)),
      await readFile(new URL(`public/assets/${name}-kinematics.json`, root)));
  }
  return result;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const data = await prepareCollisionData();
  const output = `// Generated by scripts/prepare-instrument-collision.mjs from the shipped, unchanged CAD.\n// Units: metres. Radius includes 0.15 mm. Conservative link-local triangle envelopes.\nconst freeze = object => { Object.values(object).forEach(value => { if (value && typeof value === 'object') freeze(value); }); return Object.freeze(object); };\nexport const INSTRUMENT_COLLISION_DATA = freeze(${JSON.stringify(data, null, 2)});\n`;
  await writeFile(new URL('src/instrument-collision-data.js', root), output);
  for (const [name, specification] of Object.entries(data)) console.log(`${name}: ${specification.capsules.length} source-aligned capsules, ${specification.coverage.triangles} source triangles`);
}
