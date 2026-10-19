import * as THREE from 'three';
import {runImmediately} from './cooperative-work.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const finish = (color, metalness = 0, roughness = .6) => new THREE.MeshStandardMaterial({ color, metalness, roughness });
function solid(parent, size, position, material, radius = .012) {
  const shape = new THREE.Mesh(new RoundedBoxGeometry(...size, 2, Math.min(radius, ...size.map(v => v * .4))), material);
  shape.position.set(...position); shape.castShadow = shape.receiveShadow = true; parent.add(shape); return shape;
}
function rod(parent, a, b, radius, material) {
  const from = new THREE.Vector3(...a), to = new THREE.Vector3(...b), delta = to.clone().sub(from);
  const shape = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, delta.length(), 12), material);
  shape.position.copy(from).add(to).multiplyScalar(.5); shape.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), delta.normalize());
  shape.castShadow = shape.receiveShadow = true; parent.add(shape); return shape;
}
function decal(parent, text, size, position, color = '#405a61') {
  const canvas = document.createElement('canvas'); canvas.width = 768; canvas.height = 128;
  const context = canvas.getContext('2d'); context.fillStyle = '#dce6e5'; context.fillRect(0, 0, 768, 128);
  context.fillStyle = color; context.font = '500 40px sans-serif'; context.textAlign = 'center'; context.fillText(text, 384, 80);
  const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace;
  const shape = new THREE.Mesh(new THREE.PlaneGeometry(...size), new THREE.MeshBasicMaterial({ map: texture }));
  shape.position.set(...position); parent.add(shape); return shape;
}

/** Static, full-scale theatre fixtures. Robot and instruments remain source CAD. */
export function buildOperatingRoom(scene,feedMaterial){return runImmediately(buildOperatingRoomSteps(scene,feedMaterial));}
export function* buildOperatingRoomSteps(scene, feedMaterial) {
  const room = new THREE.Group(); room.name = 'Surgical_Theatre'; scene.add(room);
  const white = finish('#dbe5e4', .08, .54), wall = finish('#cbdcdb', .02, .9), trim = finish('#8aa8a8', .25, .5);
  const stainless = finish('#adbfc2', .8, .28), dark = finish('#344b54', .3, .44), rubber = finish('#23343a', .05, .8);
  const drape = finish('#4e8e93', 0, .94), floorMaterial = finish('#96b5b2', .03, .81);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(7, 7), floorMaterial); floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; room.add(floor);
  solid(room, [4.8, 2.65, .08], [0, 1.325, 1.75], wall);
  solid(room, [.08, 2.65, 3.4], [2.4, 1.325, .1], finish('#d9e3e1', 0, .9));
  solid(room, [4.8, .11, .055], [0, .055, 1.69], trim);
  for (const x of [-2, -1.2, -.4, .4, 1.2, 2]) solid(room, [.003, 2.42, .006], [x, 1.35, 1.704], finish('#b7cecb', .1, .8), .001);

  yield;
  const table = new THREE.Group(); table.name = 'Adjustable_Operating_Table'; room.add(table);
  solid(table, [.62, .065, 1.4], [0, .875, -.41], stainless, .025);
  solid(table, [.59, .05, 1.38], [0, .934, -.40], finish('#3c5d63', 0, .73), .025);
  solid(table, [.27, .66, .39], [0, .43, -.12], white, .025);
  solid(table, [.7, .06, .7], [0, .07, -.12], dark, .025);
  for (const x of [-.29, .29]) for (const z of [-.38, .14]) {
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(.045, .045, .027, 18), rubber); wheel.position.set(x, .045, z); wheel.rotation.z = Math.PI / 2; table.add(wheel);
  }
  for (const x of [-.33, .33]) rod(table, [x, .85, -.93], [x, .85, .22], .009, stainless);
  const pillow = solid(table, [.26, .055, .23], [0, .985, -.49], finish('#d7e7e4', 0, .96), .045); pillow.rotation.x = .05;
  yield;
  const platform = new THREE.Group(); platform.name = 'G1_Stable_Mounting_Platform'; room.add(platform);
  solid(platform, [.60, .29, .58], [0, .145, .51], finish('#708b8d', .55, .44));
  solid(platform, [.59, .01, .57], [0, .295, .51], rubber, .008);
  for (const x of [-.285, .285]) solid(platform, [.006, .003, .54], [x, .302, .51], finish('#c4b784', .3, .6), .001);

  yield;
  const monitor = new THREE.Group(); monitor.name = 'Live_Endoscopic_Monitor'; monitor.position.set(-.73, 1.38, -.40); monitor.rotation.y = 2.15; room.add(monitor);
  solid(monitor, [.35, .24, .027], [0, 0, 0], rubber, .012);
  const monitorScreen = new THREE.Mesh(new THREE.PlaneGeometry(.32, .20), feedMaterial); monitorScreen.position.z = .0145; monitorScreen.name = 'Same_Frame_Endoscopic_LCD'; monitor.add(monitorScreen);
  const indicator = new THREE.Mesh(new THREE.SphereGeometry(.0025, 8, 6), new THREE.MeshBasicMaterial({ color: '#69dda8' })); indicator.position.set(.145, -.108, .015); monitor.add(indicator);
  rod(room, [-.73, .10, -.4], [-.73, 1.27, -.4], .012, stainless);
  solid(room, [.35, .035, .29], [-.73, .09, -.4], dark);
  decal(monitor, 'MIRA  |  LIVE ENDOSCOPE', [.25, .033], [0, -.103, .015], '#405b58');

  yield;
  const cabinet = new THREE.Group(); cabinet.position.set(-1.57, 0, 1.45); cabinet.name = 'Sealed_Clinical_Storage'; room.add(cabinet);
  solid(cabinet, [.85, 1.78, .42], [0, .92, 0], white, .015);
  for (const x of [-.21, .21]) {
    solid(cabinet, [.404, 1.65, .018], [x, .95, -.22], finish('#c9d9d7', .02, .58));
    rod(cabinet, [x + (x > 0 ? -.14 : .14), .90, -.243], [x + (x > 0 ? -.14 : .14), 1.14, -.243], .006, stainless);
  }
  yield;
  const door = new THREE.Group(); door.position.set(1.31, 0, 1.69); room.add(door);
  solid(door, [.98, 2.20, .025], [0, 1.12, 0], trim, .008);
  solid(door, [.90, 2.10, .019], [0, 1.13, -.023], finish('#b7d1d0', .05, .58));
  solid(door, [.32, .45, .013], [0, 1.55, -.043], finish('#537478', .2, .31));
  rod(door, [.34, .91, -.049], [.34, 1.16, -.049], .008, stainless);
  const doorLabel = decal(door, 'OPERATING THEATRE  01', [.68, .11], [0, 2.36, -.025]); doorLabel.rotation.y = Math.PI;

  yield;
  const trolley = new THREE.Group(); trolley.position.set(-.95, 0, .66); trolley.name = 'Sterile_Instrument_Trolley'; room.add(trolley);
  solid(trolley, [.52, .035, .42], [0, .86, 0], stainless);
  solid(trolley, [.48, .012, .38], [0, .884, 0], drape, .006);
  solid(trolley, [.45, .018, .35], [0, .31, 0], stainless);
  for (const x of [-.21, .21]) for (const z of [-.16, .16]) {
    rod(trolley, [x, .085, z], [x, .85, z], .010, stainless);
    const caster = new THREE.Mesh(new THREE.CylinderGeometry(.032, .032, .021, 12), rubber); caster.position.set(x, .055, z); caster.rotation.z = Math.PI / 2; trolley.add(caster);
  }
  solid(trolley, [.28, .025, .19], [.025, .903, 0], finish('#b7c9ca', .75, .24), .025);

  yield;
  const emitterMaterial = new THREE.MeshBasicMaterial({ color: '#fffaf2' });
  for (const [index, x] of [-.48, .48].entries()) {
    yield;const lamp = new THREE.Group(); lamp.position.set(x, 2.02 + index * .10, -.07 + index * .27); lamp.rotation.z = x < 0 ? -.18 : .18; room.add(lamp);
    rod(room, [x, 2.6, .4], [x, 2.45, .4], .017, white); rod(room, [x, 2.45, .4], [x, 2.36 + index * .10, -.07 + index * .27], .014, stainless);
    rod(room, [x, 2.36 + index * .10, -.07 + index * .27], [x, 2.035 + index * .10, -.07 + index * .27], .012, stainless);
    const housing = new THREE.Mesh(new THREE.CylinderGeometry(.235, .26, .045, 48), white); lamp.add(housing);
    for (let led = 0; led < 7; led++) {
      const angle = (led - 1) * Math.PI / 3, radius = led ? .135 : 0;
      const lens = new THREE.Mesh(new THREE.CircleGeometry(.055, 12), emitterMaterial); lens.rotation.x = Math.PI / 2;
      lens.position.set(Math.cos(angle) * radius, -.025, Math.sin(angle) * radius); lamp.add(lens);
    }
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(.013, .017, .10, 12), rubber); handle.position.y = -.075; lamp.add(handle);
  }
  for (const x of [-.8, .8]) solid(room, [.52, .012, .72], [x, 2.61, .70], new THREE.MeshBasicMaterial({ color: '#edf5f2' }));
  // Every fixture, especially the LCD, is absent from the endoscope layer.
  room.traverse(object => object.layers.set(0));
  return { room, monitor, monitorScreen, platform };
}
