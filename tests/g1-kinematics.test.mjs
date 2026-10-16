import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { SurgicalScene } from '../src/scene.js';
import { Simulation, constrainToolPosition } from '../src/simulation.js';
import { loadAssemblies, G1_GRIP } from '../src/authentic-assemblies.js';

const bytes = await readFile(new URL('../public/assets/g1.glb', import.meta.url));
const source = (await new GLTFLoader().parseAsync(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength), '/')).scene;
const metadata = JSON.parse(await readFile(new URL('../public/assets/g1-kinematics.json', import.meta.url), 'utf8'));
const previousFetch = globalThis.fetch;
globalThis.fetch = async url => new Response(await readFile(new URL(`../public${url}`, import.meta.url)));
const instruments = await loadAssemblies(new THREE.Scene());
globalThis.fetch = previousFetch;
after(() => instruments.dispose());

// Exercise the production scene methods without a canvas, renderer or DOM.
function fixture() {
  const scene = Object.create(SurgicalScene.prototype);
  scene.robot = new THREE.Group();
  scene.robot.position.set(0, 1.0922729, .42);
  scene.robot.rotation.y = Math.PI / 2;
  scene.robotModel = source.clone(true);
  scene.robot.add(scene.robotModel);
  scene.joints = [];
  scene.handMarkers = {};
  scene.armErrors = { left: Infinity, right: Infinity };
  for (const definition of metadata.joints) {
    const node = scene.robotModel.getObjectByName(definition.name);
    if (!node || definition.type === 'fixed') continue;
    node.userData.rest = node.quaternion.clone();
    node.userData.angle = 0;
    node.userData.axis = new THREE.Vector3(...definition.axis);
    node.userData.limit = definition.limit;
    scene.joints.push(node);
  }
  for (const side of ['left', 'right']) {
    scene.setJoint(`${side}_shoulder_pitch_joint`, .8);
    scene.setJoint(`${side}_shoulder_roll_joint`, side === 'left' ? .2 : -.2);
    scene.setJoint(`${side}_elbow_joint`, 1.1);
    const marker = new THREE.Object3D();
    marker.position.fromArray(G1_GRIP[side]);
    scene.robotModel.getObjectByName(`${side}_rubber_hand`).add(marker);
    scene.handMarkers[side] = marker;
  }
  scene.robotLoaded = true;
  return scene;
}

function settle(scene, targets, frames = 50) {
  for (let frame = 0; frame < frames; frame++) {
    for (const side of ['left', 'right']) scene.solveArm(side, targets[side]);
  }
  for (const side of ['left', 'right']) {
    const actual = new THREE.Vector3();
    scene.handMarkers[side].getWorldPosition(actual);
    assert.ok(actual.distanceTo(targets[side]) < .001, `${side} real hand missed CAD adaptor by ${actual.distanceTo(targets[side])} m`);
  }
}

test('production G1 IK joins measured source palms to real proximal shaft grip adaptors', () => {
  const scene = fixture();
  instruments.update(new Simulation().state, 1 / 60);
  settle(scene, instruments.toolGripPositions);
  // Confirm the fixed manufacturer hand is the endpoint, not the wrist origin.
  for (const side of ['left', 'right']) {
    assert.equal(scene.handMarkers[side].parent.name, `${side}_rubber_hand`);
    const wrist = new THREE.Vector3();
    scene.robotModel.getObjectByName(`${side}_wrist_yaw_link`).getWorldPosition(wrist);
    assert.ok(wrist.distanceTo(instruments.toolGripPositions[side]) > .09);
  }
});

test('production G1 IK follows nearby 20 mm movements without mesh stretching', () => {
  const scene = fixture();
  instruments.update(new Simulation().state, 1 / 60);
  const initial = Object.fromEntries(['left', 'right'].map(side => [side, instruments.toolGripPositions[side].clone()]));
  const scales = new Map();
  scene.robot.traverse(node => scales.set(node, node.scale.clone()));
  settle(scene, initial);
  for (const offset of [[.02, 0, 0], [-.02, 0, 0], [0, .02, 0], [0, -.02, 0], [0, 0, .02], [0, 0, -.02]]) {
    const targets = Object.fromEntries(['left', 'right'].map(side => [side, initial[side].clone().add(new THREE.Vector3(...offset))]));
    settle(scene, targets, 35);
  }
  scene.robot.traverse(node => assert.ok(node.scale.equals(scales.get(node)), `${node.name} was scaled by IK`));
});

test('the measured palms reach all phases of the real liver resection and specimen transport trajectory',()=>{
  const scene=fixture();
  const renderScene=instruments.tools.left.group.parent;renderScene.add(scene.robot);
  // Grip-centre waypoints measured from the complete production controller /
  // real BodyParts3D / dVRK run, including the formerly detached end posture.
  const waypoints=[
    [[-.2623056,1.3467803,.412624],[.2634672,1.3478576,.4200927]],
    [[-.1007056,1.5483281,.1769094],[.2634672,1.3478576,.4200927]],
    [[-.0987622,1.5676843,.1225068],[.3093887,1.348597,.1517582]],
    [[-.0987622,1.5676843,.1225068],[.3087579,1.3861705,.1570713]],
    [[-.0987622,1.5676843,.1225068],[.3249039,1.3853028,.1541197]],
    [[-.0987622,1.5676843,.1225068],[.3393741,1.3810524,.1530809]],
    [[-.0987622,1.5676843,.1225068],[.3515668,1.3739147,.1551306]],
    [[-.0987622,1.5676843,.1225068],[.3624151,1.3455085,.1516905]],
    [[-.0987615,1.5676892,.1224855],[.4007754,1.3776675,.1540027]],
    [[-.096921,1.5745452,.0511915],[.4007754,1.3776675,.1540027]],
    [[-.0957965,1.5633681,-.020029],[.4007754,1.3776675,.1540027]],
  ];
  const sourceOrientations=[
    [[.750488,.55035786,0,.36588794],[.74143378,-.56423981,.00439577,.36316671]],
    [[.65763748,.32443465,-.32373749,.5978705],[.74143378,-.56423981,.00439577,.36316671]],
    [[.61247643,.30097203,-.34905467,.64222216],[.56691593,-.45872637,-.05581904,.68195358]],
    [[.61247643,.30097203,-.34905467,.64222216],[.58790924,-.43804883,-.02442333,.67961714]],
    [[.61247643,.30097203,-.34905467,.64222216],[.57640959,-.44671918,-.03989805,.6830828]],
    [[.61247643,.30097203,-.34905467,.64222216],[.56628245,-.45705662,-.05528016,.68364285]],
    [[.61247643,.30097203,-.34905467,.64222216],[.55850257,-.46942848,-.06992964,.68030995]],
    [[.61247643,.30097203,-.34905467,.64222216],[.5367407,-.48985601,-.10143786,.6794563]],
    [[.61245873,.30096284,-.34906391,.64223831],[.53686111,-.48904663,-.10079868,.6800391]],
    [[.55216387,.26973345,-.37790439,.69249347],[.53686111,-.48904663,-.10079868,.6800391]],
    [[.48710862,.23616903,-.40386472,.73745689],[.53686111,-.48904663,-.10079868,.6800391]],
  ];
  const clock=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1),Math.PI/2);
  const sourceScales=new Map();scene.robot.traverse(n=>sourceScales.set(n,n.scale.clone()));
  const handPositions={},handQuaternions={};let minimumClevisGap=Infinity;
  for(const [index,positions] of waypoints.entries()){
    const targets={left:new THREE.Vector3(...positions[0]),right:new THREE.Vector3(...positions[1])};
    for(let frame=0;frame<150;frame++)for(const [sideIndex,side] of ['left','right'].entries()){
      const start=new THREE.Vector3(...waypoints[Math.max(0,index-1)][sideIndex]);
      const position=start.lerp(targets[side],Math.min(1,(frame+1)/120));
      const orientation=new THREE.Quaternion(...sourceOrientations[Math.max(0,index-1)][sideIndex]).normalize()
        .slerp(new THREE.Quaternion(...sourceOrientations[index][sideIndex]).normalize(),Math.min(1,(frame+1)/120)).multiply(clock);
      const previous=scene.joints.map(n=>n.userData.angle);scene.solveArm(side,position,1/60,orientation);
      scene.joints.forEach((n,j)=>assert.ok(Math.abs(n.userData.angle-previous[j])<=(n.userData.limit.velocity??12)/60+1e-10));
      const tool=instruments.tools[side],toolQuaternion=orientation.clone().multiply(clock.clone().invert());
      tool.group.quaternion.copy(toolQuaternion);tool.group.position.copy(position).sub(tool.gripLocal.clone().applyQuaternion(toolQuaternion));tool.group.updateMatrixWorld(true);tool.gripPosition.copy(position);
      handPositions[side]=scene.handMarkers[side].getWorldPosition(new THREE.Vector3());handQuaternions[side]=scene.handMarkers[side].getWorldQuaternion(new THREE.Quaternion());
      if(sideIndex===1){
        instruments.connectHands(handPositions,scene.armErrors,handQuaternions);
        if(frame===149)for(const id of ['left','right']){
          const assembly=instruments.tools[id],theta=assembly.proximalGrip.getObjectByName('Custom_Fixed_Size_Palm_Clearance_Clevis').rotation.x;
          const cosine=Math.cos(theta),sine=Math.sin(theta),inverse=assembly.group.matrixWorld.clone().invert(),point=new THREE.Vector3(),transform=new THREE.Matrix4(),endpoint=assembly.gripLocal.x;
          scene.handMarkers[id].parent.traverse(n=>{if(!n.isMesh)return;transform.multiplyMatrices(inverse,n.matrixWorld);const vertices=n.geometry.attributes.position;for(let j=0;j<vertices.count;j++){
            point.fromBufferAttribute(vertices,j).applyMatrix4(transform);const x=point.x,z=point.z-G1_GRIP.proximalShaftZ,y=point.y*cosine+z*sine,radial=-point.y*sine+z*cosine,dy=Math.max(0,-y,y-G1_GRIP.clevisDepth),dx=Math.max(Math.min(0,endpoint)-x,0,x-Math.max(0,endpoint));
            minimumClevisGap=Math.min(minimumClevisGap,Math.sqrt(Math.min(x*x+dy*dy+radial*radial,(x-endpoint)**2+dy*dy+radial*radial,dx*dx+(y-G1_GRIP.clevisDepth)**2+radial*radial))-G1_GRIP.clevisRadius);
          }});
        }
      }
    }
    for(const side of ['left','right'])assert.ok(scene.handMarkers[side].getWorldPosition(new THREE.Vector3()).distanceTo(targets[side])<.001);
    for(const side of['left','right'])for(const joint of scene._armIK[side].chain){const l=joint.userData.limit;assert.ok(joint.userData.angle>=l.lower-1e-12&&joint.userData.angle<=l.upper+1e-12);}
  }
  scene.robot.traverse(n=>assert.ok(n.scale.equals(sourceScales.get(n))));
  assert.ok(minimumClevisGap>.001,`the fixed-size U clevis entered a genuine source palm (${minimumClevisGap} m)`);
  scene.robot.removeFromParent();
});

test('visible palm saddles follow genuine hand pose and physically meet the short shaft fixture',()=>{
  const scene=fixture();instruments.resetPose();instruments.update(new Simulation().state,1/60);settle(scene,instruments.toolGripPositions);
  const points={},quaternions={};for(const side of['left','right']){points[side]=scene.handMarkers[side].getWorldPosition(new THREE.Vector3());quaternions[side]=scene.handMarkers[side].getWorldQuaternion(new THREE.Quaternion());}
  instruments.connectHands(points,scene.armErrors,quaternions);
  const renderScene=instruments.tools.left.group.parent;
  for(const side of['left','right']){
    const saddle=renderScene.getObjectByName(`Concept_${side}_Strapped_Palm_Grip`);assert.ok(saddle?.visible);
    assert.ok(saddle.position.distanceTo(points[side])<1e-12);assert.ok(1-Math.abs(saddle.quaternion.dot(quaternions[side]))<1e-12);
    assert.ok(saddle.position.distanceTo(instruments.toolGripPositions[side])<.001);
    assert.equal(instruments.connectionModes[side],'direct');
  }
});

test('all seven G1 arm joints on each side clamp to the manufacturer limits', () => {
  const scene = fixture();
  for (const side of ['left', 'right']) {
    const chain = ['shoulder_pitch', 'shoulder_roll', 'shoulder_yaw', 'elbow', 'wrist_roll', 'wrist_pitch', 'wrist_yaw'];
    assert.equal(chain.length, 7);
    for (const suffix of chain) {
      const name = `${side}_${suffix}_joint`;
      const node = scene.robotModel.getObjectByName(name);
      const { lower, upper } = node.userData.limit;
      scene.setJoint(name, lower - 10);
      assert.equal(node.userData.angle, lower);
      scene.setJoint(name, upper + 10);
      assert.equal(node.userData.angle, upper);
      assert.ok(node.quaternion.toArray().every(Number.isFinite));
    }
  }
});

test('free instrument commands remain untouched when the genuine G1 cannot reach them', () => {
  const scene = fixture(), state = new Simulation().state;
  scene.assemblies = instruments;
  instruments.update(state, 1 / 60);
  settle(scene, instruments.toolGripPositions);
  state.tools.left.position = [1.5, 1.8, -1.2];
  state.tools.left.wrist = [9 * Math.PI, -7 * Math.PI, 12 * Math.PI];
  const command = structuredClone(state);
  instruments.update(state, 1 / 60);
  for (const side of ['left', 'right']) scene.solveArm(side, instruments.toolGripPositions[side]);
  assert.ok(scene.armErrors.left > .1);
  const angles = scene.joints.map(joint => joint.userData.angle);
  assert.equal(scene.guardArmTargets(state), false);
  assert.deepEqual(state, command, 'rendering must never restore or restrict tool commands');
  assert.deepEqual(scene.joints.map(joint => joint.userData.angle), angles);
  assert.equal(scene.kinematicLimited, false);
  assert.ok(instruments.toolTipPositions.left.distanceTo(new THREE.Vector3(...state.tools.left.position)) < 1e-7);
  const hands = { left: new THREE.Vector3(), right: new THREE.Vector3() };
  for (const side of ['left', 'right']) scene.handMarkers[side].getWorldPosition(hands[side]);
  instruments.connectHands(hands, scene.armErrors);
  assert.equal(instruments.connectionModes.left, 'virtual');
  assert.equal(instruments.conceptDecoupled, true);
  scene.robot.traverse(node => assert.ok(node.quaternion.toArray().every(Number.isFinite)));
});

test('reset compatibility releases display history without changing the tool state', () => {
  const scene = fixture(), state = new Simulation().state;
  scene.assemblies = instruments;
  const before = structuredClone(state);
  scene.acceptedArmPoses = { left: { tool: { position: [99, 99, 99] } } };
  scene.releaseKinematicGuard();
  assert.deepEqual(scene.acceptedArmPoses, {});
  assert.equal(scene.guardArmTargets(state), false);
  assert.deepEqual(state, before);
});
