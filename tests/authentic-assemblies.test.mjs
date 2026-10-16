import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import * as THREE from 'three';
import { Simulation, constrainToolPosition } from '../src/simulation.js';
import { loadAssemblies } from '../src/authentic-assemblies.js';
import { resolveInstrumentAlignment } from '../src/instrument-pose.js';

const scene = new THREE.Scene();
const originalFetch = globalThis.fetch;
globalThis.fetch = async url => new Response(await readFile(new URL(`../public${url}`, import.meta.url)));
const assembly = await loadAssemblies(scene);
globalThis.fetch = originalFetch;
after(() => assembly.dispose());

test('source CAD keeps physical scale and uses correct endoscopic visibility', () => {
  assert.equal(assembly.toolNames.left, '持针钳');
  for (const side of ['left', 'right']) {
    const tip = assembly.tools[side].metadata.tipPositionAtZero;
    assert.ok(tip[2] > .43 && tip[2] < .45, 'instrument units must remain meters');
  }
  for (const source of [assembly.scope, assembly.scopeArm]) {
    source.group.traverse(node => { if (node.isMesh) assert.equal(node.layers.mask, 1); });
  }
  assert.equal(assembly.scopeArm.chain.length, 6);
});

test('actual CAD tool tips follow commands without RCM drift over wrist and insertion range', () => {
  const state = new Simulation().state;
  const tip = new THREE.Vector3();
  for (let i = 0; i < 200; i++) {
    for (const [index, side] of ['left', 'right'].entries()) {
      const tool = state.tools[side];
      tool.position = constrainToolPosition([
        Math.sin(i * .11 + index) * .13,
        1.075 + Math.sin(i * .13) * .075,
        Math.cos(i * .17) * .12,
      ], tool.port);
      tool.wrist = [Math.sin(i * .17) * 1.2, Math.sin(i * .13) * 1.35, Math.sin(i * .19) * Math.PI];
      tool.jaw = (i % 17) / 16;
      // This fixture constructs a new command directly. Resolve its frame once,
      // as the command path does; the CAD renderer only reads committed poses.
      tool.alignment = resolveInstrumentAlignment(tool, tool.alignment);
    }
    assembly.update(state, 1 / 60);
    for (const side of ['left', 'right']) {
      tip.fromArray(state.tools[side].position);
      assert.ok(assembly.toolTipPositions[side].distanceTo(tip) < 1e-7, `${side} CAD tip moved off command`);
      assert.ok(assembly.toolRCMErrors[side] < 1e-7, `${side} shaft missed its fixed port`);
    }
  }
});

test('scope source tip stays exact and genuine Z1 supports the shaft across full angular workspace', () => {
  // Production chest plate: elevated G1 standing mount, clocked downwards.
  assembly.scopeMount.position.set(0,1.33,.25);
  assembly.scopeMount.quaternion.setFromEuler(new THREE.Euler(-Math.PI/2,0,0)).premultiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1),Math.PI));
  assembly.resetPose();
  const state = new Simulation().state;
  const tip = new THREE.Vector3(), direction = new THREE.Vector3(), port = new THREE.Vector3(...state.scope.port);
  assembly.update(state,1/30); // Offscreen initial installation/seed, as in main.
  for (let i = 0; i < 100; i++) {
    const yaw = (i % 10 - 4.5) / 4.5 * Math.PI;
    const pitch = Math.floor(i / 10) / 9 * 1.55 + .01;
    const depth = .018 + (i % 7) / 6 * .117;
    direction.set(Math.sin(yaw) * Math.cos(pitch), -Math.sin(pitch), -Math.cos(yaw) * Math.cos(pitch));
    tip.copy(port).addScaledVector(direction, depth);
    state.scope.position = tip.toArray();
    state.scope.roll = Math.sin(i * .17) * Math.PI;
    // Simulate settling after each abrupt relocation, including recovery from
    // one-sided joint-limit minima. Continuous keyboard control moves more slowly.
    for (let frame = 0; frame < 90; frame++) {
      const previous = assembly.scopeArm.chain.map(joint => joint.angle);
      assembly.update(state, 1 / 30);
      assembly.scopeArm.chain.forEach((joint, index) => {
        assert.ok(Math.abs(joint.angle - previous[index]) <= joint.specification.limit.velocity / 30 + 1e-8,
          'Z1 recovery exceeded the source joint velocity');
      });
    }
    assert.ok(assembly.scope.tipPosition.distanceTo(tip) < 1e-7);
    assert.ok(assembly.scopeArmError < .0005, `Z1 shaft support error ${assembly.scopeArmError}`);
    assert.ok(Math.abs(assembly.scopeSupportPosition.distanceTo(port) - .1) < 1e-9);
    for (const joint of assembly.scopeArm.chain) {
      const { lower, upper } = joint.specification.limit;
      assert.ok(joint.angle >= lower - 1e-9 && joint.angle <= upper + 1e-9);
    }
  }
});

test('proximal grip is a finite rigid fixture on the genuine shaft and never changes its TCP', () => {
  const state=new Simulation().state;assembly.resetPose();assembly.update(state,1/60);
  for(const side of['left','right']){
    const tool=assembly.tools[side],local=tool.gripPosition.clone().sub(tool.group.position).applyQuaternion(tool.group.quaternion.clone().invert());
    assert.ok(Math.abs(local.z+.095)<1e-10,'shaft clamp must remain inside the actual proximal source shaft');
    assert.ok(Math.abs(Math.abs(local.x)-.060)<1e-10,'finite 60 mm universal adaptor is explicit custom geometry');
    const ball=tool.proximalGrip.getObjectByName('Custom_Passive_Universal_Grip_Ball');
    assert.ok(ball.getWorldPosition(new THREE.Vector3()).distanceTo(tool.gripPosition)<1e-10);
    assert.ok(tool.tipPosition.distanceTo(new THREE.Vector3(...state.tools[side].position))<1e-7);
    assert.ok(tool.handlePosition.distanceTo(tool.group.position)<1e-10,'source adaptor frame remains available unchanged');
    const clevis=tool.proximalGrip.getObjectByName('Custom_Fixed_Size_Palm_Clearance_Clevis'),lengths=[];
    clevis.traverse(n=>{if(n.geometry?.type==='CylinderGeometry')lengths.push(n.geometry.parameters.height);});
    assert.deepEqual(lengths.sort((a,b)=>a-b),[.060,.075,.075],'the U adaptor must have three fixed physical lengths');
    clevis.traverse(n=>assert.deepEqual(n.scale.toArray(),[1,1,1],'clocking cannot stretch a connector'));
  }
});

test('all instrument rotation axes allow many complete turns without clipping or stretching CAD', () => {
  const state = new Simulation().state;
  const scales = new Map();
  for(const tool of Object.values(assembly.tools))tool.group.traverse(node=>scales.set(node,node.scale.clone()));
  for(let i=0;i<100;i++){
    state.tools.left.wrist=[i*.33,-i*.27,i*.91];
    state.tools.right.wrist=[-i*.41,i*.39,-i*.75];
    assembly.update(state,1/60);
    for(const side of ['left','right']){
      const tool=assembly.tools[side];
      for(const [name,index] of [['wrist_pitch',0],['wrist_yaw',1],['roll',2]]){
        assert.equal(tool.joints.get(name).angle,state.tools[side].wrist[index]);
      }
      assert.ok(tool.tipPosition.distanceTo(new THREE.Vector3(...state.tools[side].position))<1e-7);
      tool.group.traverse(node=>assert.ok(node.scale.equals(scales.get(node))));
    }
  }
});

test('passing through the RCM singularity preserves exact commands and finite continuous poses', () => {
  const state=new Simulation().state;
  state.tools.left.wrist=[1.8,-2.7,17*Math.PI];
  let previous=null;
  for(let i=-20;i<=20;i++){
    state.tools.left.position=state.tools.left.port.map((v,axis)=>v+(axis===2?i*.0001:0));
    const command=structuredClone(state.tools.left);
    assembly.update(state,1/60);
    const tool=assembly.tools.left;
    assert.deepEqual(state.tools.left,command);
    assert.ok(tool.tipPosition.distanceTo(new THREE.Vector3(...command.position))<1e-7);
    assert.ok(tool.group.position.toArray().every(Number.isFinite));
    assert.ok(tool.group.quaternion.toArray().every(Number.isFinite));
    if(previous)assert.ok(tool.group.quaternion.angleTo(previous)<.05,'near-port orientation must not flip');
    previous=tool.group.quaternion.clone();
  }
});

test('repeated production CAD updates do not advance a committed near-port frame', () => {
  for (const side of ['left', 'right']) for (const distance of [.004, .012, .019]) {
    const state = new Simulation().state, command = state.tools[side];
    command.position = [command.port[0] + distance, command.port[1], command.port[2]];
    command.wrist = [.43, -.67, 11 * Math.PI];
    command.alignment = resolveInstrumentAlignment(command, command.alignment);
    const savedState = structuredClone(state);
    assembly.update(state, 1 / 60);
    const actual = assembly.tools[side], root = [...actual.group.matrixWorld.elements];
    const jaw = [...actual.group.getObjectByName('jaw_1_link').matrixWorld.elements];
    const tip = actual.tipPosition.toArray();
    for (let frame = 0; frame < 24; frame++) {
      assembly.update(state, 1 / 60);
      assert.deepEqual(actual.group.matrixWorld.elements, root, 'render reads moved the source root');
      assert.deepEqual(actual.group.getObjectByName('jaw_1_link').matrixWorld.elements, jaw, 'render reads moved source jaw geometry');
      assert.deepEqual(actual.tipPosition.toArray(), tip);
      assert.deepEqual(state, savedState, 'a CAD update rewrote committed control state');
    }
    assert.ok(actual.tipPosition.distanceTo(new THREE.Vector3(...command.position)) < 1e-9);
  }
});

test('source curved blade paths follow both actual jaw matrices and exclude the hinge and empty TCP', () => {
  const state=new Simulation().state;
  for(const opening of [0,.1,.6,1]){
    state.tools.right.jaw=opening;state.tools.right.wrist=[.53,-.42,8*Math.PI+.31];assembly.update(state,1/60);
    const blade=assembly.toolBlade('right'),tool=assembly.tools.right;
    assert.equal(blade.source,'source-CAD-curved-jaw');assert.equal(blade.segments.length,12);
    let index=0;
    for(const profile of tool.bladeProfiles){
      assert.equal(profile.points.length,7);
      assert.ok(profile.points.every(p=>p.y>=.0028-1e-12&&p.y<.0131),'do not treat round hinge or empty TCP as a blade');
      assert.ok(profile.points.at(-1).z-profile.points[0].z>.0005,'source curve must remain three dimensional');
      for(let i=1;i<profile.points.length;i++){
        assert.ok(blade.segments[index].a.distanceTo(profile.points[i-1].clone().applyMatrix4(profile.link.matrixWorld))<1e-10);
        assert.ok(blade.segments[index].b.distanceTo(profile.points[i].clone().applyMatrix4(profile.link.matrixWorld))<1e-10);
        index++;
      }
    }
    const frozen=blade.segments.map(s=>({a:s.a.clone(),b:s.b.clone()}));
    state.tools.right.wrist[2]+=.2;assembly.update(state,1/60);assembly.toolBlade('right');
    blade.segments.forEach((s,i)=>{assert.ok(s.a.equals(frozen[i].a));assert.ok(s.b.equals(frozen[i].b));});
  }
  assert.equal(assembly.toolBlade('left').segments.length,0);
});

test('physical presentation reset restores the Z1 seed while history invalidation preserves existing joints',()=>{
  const state=new Simulation().state;assembly.resetPresentation();assembly.update(state,.05);
  const canonical=assembly.scopeArm.chain.map(j=>j.angle);
  state.scope.position=[.05,1.13,-.02];
  for(let i=0;i<40;i++)assembly.update(state,.05);
  const moved=assembly.scopeArm.chain.map(j=>j.angle);assert.notDeepEqual(moved,canonical);
  assembly.resetPose();assert.deepEqual(assembly.scopeArm.chain.map(j=>j.angle),moved,'undo cache invalidation must not reset physical joints');
  assembly.resetPresentation();
  assert.deepEqual(assembly.scopeArm.chain.map(j=>j.angle),[0,1.4,-1.8,.35,0,0]);
  assembly.update(new Simulation().state,.05);
  assert.deepEqual(assembly.scopeArm.chain.map(j=>j.angle),canonical,'reset must solve from the same initial seed');
});

test('disposing source assemblies removes them and tolerates repeated disposal', () => {
  assembly.dispose();
  assembly.dispose();
  assert.equal(scene.children.length, 0);
});
