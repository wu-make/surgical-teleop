import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { Simulation } from '../src/simulation.js';
import { TissueVolume } from '../src/tissue.js';
import { createVolumeState, applyCapsuleCut, resetVolume,allChunkKeys,polygonizeChunk,separateDisconnectedComponents,initializeConnectivity } from '../src/tissue-worker.js';
import { InteractionController } from '../src/interaction-controller.js';
import { GuidedDemo,planPeripheralResections } from '../src/guided-demo.js';

function workbench() {
  const dims = [41, 41, 41], origin = [-.04, -.04, -.04], spacing = [.002, .002, .002];
  const values = new Float32Array(dims[0] ** 3);
  for (let z = 0; z < 41; z++) for (let y = 0; y < 41; y++) for (let x = 0; x < 41; x++)
    values[x + 41 * (y + 41 * z)] = Math.hypot(origin[0] + x * .002, origin[1] + y * .002, origin[2] + z * .002) - .03;
  const volume = createVolumeState({ dims, origin, spacing }, values);
  const tissue = new TissueVolume(); tissue.metadata = volume.meta; tissue._baseField = volume.base; tissue.ready = true;
  tissue._enqueue = async operation => {
    if (operation.type === 'restore') resetVolume(volume, operation.cuts);
    else for (const cut of operation.cuts) applyCapsuleCut(volume, cut);
    tissue.removedVolumeMm3 = volume.removedVolumeMm3;
    return { changed: true };
  };
  const sim = new Simulation();
  sim.state.tools.left.position = [-.015, 0, .027]; sim.state.tools.left.jaw = 0;
  sim.state.tools.right.position = [.015, 0, .027]; sim.state.tools.right.jaw = .7;
  const interaction = new InteractionController(sim, tissue, { toolDirection: () => new THREE.Vector3(0, 0, 1) });
  return { sim, tissue, interaction,volume };
}

function specimenDescriptor(center,radius=.005,id='interaction-specimen') {
  const n=17,spacing=.001,origin=center.map(v=>v-.008),meta={dims:[n,n,n],origin,spacing:[spacing,spacing,spacing]};
  const values=new Float32Array(n**3);
  for(let z=0;z<n;z++)for(let y=0;y<n;y++)for(let x=0;x<n;x++)values[x+n*(y+n*z)]=Math.hypot(origin[0]+x*spacing-center[0],origin[1]+y*spacing-center[1],origin[2]+z*spacing-center[2])-radius;
  const state=createVolumeState(meta,values,8),merged={positions:[],normals:[],colors:[],cutMasks:[],indices:[]};
  for(const key of allChunkKeys(state)){
    const chunk=polygonizeChunk(state,key),offset=merged.positions.length/3;
    for(const field of ['positions','normals','colors','cutMasks'])merged[field].push(...chunk[field]);
    merged.indices.push(...chunk.indices.map(i=>i+offset));
  }
  return {id,center,volumeMm3:4/3*Math.PI*radius**3*1e9,volume:{...meta,values},
    ...Object.fromEntries(Object.entries(merged).map(([key,values])=>[key,key==='indices'?new Uint32Array(values):new Float32Array(values)]))};
}

function raisedWorkbench() {
  const result=workbench();
  result.tissue.group.position.y=1.035;result.tissue.group.updateMatrixWorld(true);
  for(const side of ['left','right'])result.sim.state.tools[side].position[1]+=1.035;
  return result;
}

test('left traction persists while the selected right shear removes held tissue', async () => {
  const { sim, tissue, interaction } = workbench();
  await interaction.update(1 / 60);
  assert.ok(interaction.grasp, 'the left jaw captures a nearby real surface');
  sim.state.tools.left.position[2] += .015;
  await interaction.update(1 / 60);
  const displacement = tissue.graspMetrics.displacementMm;
  assert.ok(displacement > 14);
  sim.select('right'); sim.setCutting(true); sim.setJaw('right', 0);
  await interaction.update(1 / 60);
  assert.ok(interaction.grasp, 'enabling and executing a right cut must not release the left grasper');
  assert.ok(tissue.removedVolumeMm3 > 10, 'the same held material really loses volume');
  assert.equal(tissue.graspMetrics.displacementMm, displacement);
  tissue.dispose();
});

test('composite history restores both the grasper attachment and the material cut history', async () => {
  const { sim, tissue, interaction } = workbench();
  await interaction.update(1 / 60);
  sim.checkpoint('牵拉', interaction.snapshot());
  const before = interaction.snapshot();
  sim.state.tools.left.position[2] += .012;
  await interaction.update(1 / 60);
  assert.ok(tissue.graspMetrics.displacementMm > 10);
  const record = sim.undo(interaction.snapshot());
  await interaction.restore(record.extraData);
  assert.deepEqual(interaction.grasp, before.grasp);
  assert.deepEqual(tissue.snapshot().cuts, before.tissue.cuts);
  assert.ok(tissue.graspMetrics.displacementMm < 2);
  tissue.dispose();
});

test('opening the left jaw releases it with a bounded continuous recoil', async () => {
  const { sim, tissue, interaction } = workbench();
  await interaction.update(1 / 60);
  sim.state.tools.left.position[2] += .016;
  await interaction.update(1 / 60);
  const maximum = tissue.graspMetrics.displacementMm;
  sim.setJaw('left', 1);
  await interaction.update(1 / 60);
  assert.equal(interaction.grasp, null);
  assert.ok(tissue.graspMetrics.displacementMm > 0 && tissue.graspMetrics.displacementMm < maximum);
  for (let i = 0; i < 60; i++) await interaction.update(1 / 60);
  assert.equal(tissue.graspMetrics.active, false);
  tissue.dispose();
});

test('an attached material anchor transfers seamlessly to its disconnected specimen and no longer drags its mother',async()=>{
  const {sim,tissue,interaction}=raisedWorkbench();
  let toolRotation=new THREE.Quaternion();interaction.toolQuaternion=()=>toolRotation;
  await interaction.update(1/60);
  sim.state.tools.left.position[2]+=.016;await interaction.update(1/60);
  const reference=new THREE.Vector3(...interaction.grasp.reference);
  const normal=reference.clone().normalize(),center=reference.clone().addScaledVector(normal,-.005);
  const descriptor=specimenDescriptor(center.toArray());descriptor.deformation=structuredClone(tissue._deformation);
  const piece=tissue.fragments.add(descriptor),frozenVertices=piece.mesh.geometry.attributes.position.array.slice();
  const before=piece.position.clone();
  await interaction.update(1/60);
  assert.equal(interaction.grasp.kind,'fragment');assert.equal(interaction.grasp.fragmentId,piece.id);
  assert.equal(piece.held,true);assert.ok(piece.position.distanceTo(before)<1e-10,'conversion must not jump or release the specimen');
  const motherDisplacement=tissue.graspMetrics.displacementMm;
  sim.state.tools.left.position[0]+=.03;sim.state.tools.left.position[1]+=.018;
  toolRotation=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),.8);
  await interaction.update(1/60);
  const localTip=tissue.group.worldToLocal(new THREE.Vector3(...sim.state.tools.left.position));
  const actualContact=new THREE.Vector3(...piece.attachment.anchor).applyQuaternion(piece.quaternion).add(piece.position);
  assert.ok(actualContact.distanceTo(localTip)<1e-10);
  assert.ok(piece.quaternion.angleTo(toolRotation)<1e-8);
  assert.ok(tissue.graspMetrics.displacementMm<motherDisplacement,'the mother recoils instead of following subsequent specimen movement');
  assert.deepEqual(piece.mesh.geometry.attributes.position.array,frozenVertices,'a detached piece keeps the deformation frozen at separation');
  tissue.dispose();
});

test('regrasp uses the actual specimen surface, supports local orientation, release gravity, clutch and pause',async()=>{
  const {sim,tissue,interaction}=raisedWorkbench();
  tissue.group.rotation.z=.28;tissue.group.updateMatrixWorld(true);
  const descriptor=specimenDescriptor([.05,.055,.01],.005);
  const piece=tissue.fragments.add(descriptor);
  const surface=new THREE.Vector3(.055,.055,.01),tip=surface.clone().add(new THREE.Vector3(.003,0,0));
  sim.state.tools.left.position=tissue.group.localToWorld(tip.clone()).toArray();
  let worldRotation=tissue.group.getWorldQuaternion(new THREE.Quaternion());
  interaction.toolQuaternion=()=>worldRotation;
  await interaction.update(1/60);
  assert.equal(interaction.grasp.kind,'fragment');assert.equal(interaction.contact.left,true);
  assert.equal(interaction.contact.leftFragmentId,piece.id);
  assert.equal(tissue.graspMetrics.active,false);
  const contact=new THREE.Vector3(...piece.attachment.anchor).applyQuaternion(piece.quaternion).add(piece.position);
  assert.ok(contact.distanceTo(tip)<1e-10,'the projected material surface closes the 3 mm jaw gap');
  assert.ok(Math.abs(new THREE.Vector3(...piece.attachment.anchor).length()-.005)<.0002,'attachment must use the material surface, not the floating tool point');
  worldRotation=worldRotation.clone().multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1),.7));
  await interaction.update(1/60);
  assert.ok(piece.quaternion.angleTo(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1),.7))<1e-8);
  sim.setJaw('left',1);await interaction.update(1/60);
  assert.equal(interaction.grasp,null);assert.equal(piece.held,false);assert.equal(interaction.relaxing,null);
  sim.setPaused(true);const paused=piece.position.clone();
  for(let i=0;i<10;i++)await interaction.update(1/60);
  assert.ok(piece.position.distanceTo(paused)<1e-12);
  sim.setPaused(false);const worldBefore=tissue.group.localToWorld(piece.position.clone()).y;
  await interaction.update(.03,{clutched:true});
  assert.ok(tissue.group.localToWorld(piece.position.clone()).y<worldBefore,'clutch freezes inputs while released material still falls');
  tissue.dispose();
});

test('a nearby independent piece cannot steal a still-attached grasp from a different material anchor',async()=>{
  const {sim,tissue,interaction}=raisedWorkbench();await interaction.update(1/60);
  const descriptor=specimenDescriptor([.07,0,0],.005),piece=tissue.fragments.add(descriptor);
  piece.position.copy(tissue.group.worldToLocal(new THREE.Vector3(...sim.state.tools.left.position)));
  tissue.fragments.sync(piece);
  assert.equal(tissue.fragmentAtReference(interaction.grasp.reference),null);
  await interaction.update(1/60);
  assert.equal(interaction.grasp.kind,'tissue');assert.equal(piece.held,false);
  tissue.dispose();
});

test('the guided basal raster actually disconnects material rather than producing only an open groove',()=>{
  const {tissue,volume}=workbench();
  tissue.metadata.bounds=[[-.03,-.03,-.03],[.03,.03,.03]];
  const plans=planPeripheralResections(tissue);
  assert.ok(plans.length>0);const plan=plans[0];
  assert.ok(plan.rowSpacing<plan.cutRadius*2);
  initializeConnectivity(volume);
  for(let index=1;index<plan.path.length;index++)applyCapsuleCut(volume,{a:plan.path[index-1].toArray(),b:plan.path[index].toArray(),radius:plan.cutRadius});
  const separated=separateDisconnectedComponents(volume,{force:true});
  assert.ok(separated.fragments.length>=1,'the complete basal sheet must divide the original connected organ');
  assert.ok(separated.fragments.some(fragment=>fragment.volumeMm3>50));
  tissue.dispose();
});

test('a finished raster cannot report success or fake a piece while its material remains connected',()=>{
  const {sim,tissue,interaction}=workbench(),messages=[];
  const demo=new GuidedDemo(sim,tissue,interaction,{onMessage:text=>messages.push(text)});
  demo.active=true;demo.mode='example';demo.phase='wait-separation';demo.phaseTime=0;demo.time=0;
  interaction.grasp={kind:'tissue',local:[0,0,0],reference:[0,0,0],displacement:[0,0,0]};
  demo.update(2.1);
  assert.equal(demo.active,false);assert.ok(messages.some(message=>message.includes('仍相连')));
  assert.equal(tissue.fragmentMetrics.count,0);assert.equal(interaction.grasp.kind,'tissue');
  tissue.dispose();
});

test('fragment history restores its exact frozen rigid pose before the next fresh CAD frame',async()=>{
  const {sim,tissue,interaction}=raisedWorkbench();
  const descriptor=specimenDescriptor([.05,.055,.01],.005),piece=tissue.fragments.add(descriptor);
  sim.state.tools.left.position=tissue.group.localToWorld(new THREE.Vector3(.055,.055,.01)).toArray();
  let worldRotation=new THREE.Quaternion();interaction.toolQuaternion=()=>worldRotation;
  await interaction.update(1/60);
  const snapshot=interaction.snapshot();
  assert.equal(snapshot.version,3);assert.equal(snapshot.grasp.kind,'fragment');
  const saved=snapshot.tissue.fragments[0];
  // Stub only the asynchronous worker transport: the tissue module owns exact
  // specimen pose restoration; interaction must not overwrite it with stale CAD.
  tissue.restore=async data=>{
    const pose=data.fragments.find(value=>value.id===piece.id);
    piece.position.fromArray(pose.position);piece.quaternion.fromArray(pose.quaternion);
    piece.held=pose.held;piece.attachment=structuredClone(pose.attachment);tissue.fragments.sync(piece);
  };
  piece.position.add(new THREE.Vector3(.03,.04,0));
  worldRotation=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),1.2);
  await interaction.restore(snapshot);
  assert.deepEqual(piece.position.toArray(),saved.position);
  assert.deepEqual(piece.quaternion.toArray(),saved.quaternion);
  assert.deepEqual(interaction.grasp,snapshot.grasp);
  worldRotation.identity();await interaction.update(1/60);
  assert.ok(piece.quaternion.angleTo(new THREE.Quaternion(...saved.quaternion))<1e-8);
  tissue.dispose();
});

test('specimen withdrawal preflights the real full-shaft controller before moving either tool',()=>{
  const {sim,tissue,interaction}=raisedWorkbench();
  // A near-contact specimen pose where pushing the right shear outward toward
  // the held cap is unsafe; axial withdrawal must be preferred instead.
  sim.state.tools.left.position=[-.086,1.034,.110];
  sim.state.tools.right.position=[-.070,1.034,.092];
  sim.state.tools.left.jaw=sim.state.tools.right.jaw=0;
  interaction.grasp={kind:'fragment',fragmentId:'held',local:[0,0,0],reference:[0,0,0],displacement:[0,0,0]};
  const demo=new GuidedDemo(sim,tissue,interaction);
  demo.active=true;demo.mode='example';demo.plan={worldNormal:new THREE.Vector3(0,0,1)};
  demo.leftAway=new THREE.Vector3(-.086,1.059,.155);
  demo._beginFragmentMove();
  assert.equal(demo.active,true);assert.equal(demo.phase,'retract');
  const withdrawal=demo.rightRetractEnd.clone().sub(demo.rightRetractStart).normalize();
  const towardPort=new THREE.Vector3(...sim.state.tools.right.port).sub(demo.rightRetractStart).normalize();
  assert.ok(withdrawal.dot(towardPort)>.999);
  assert.equal(sim.moveToolTo(demo.rightRetractEnd.toArray(),'right').limited,false);
  sim.setJaw('right',.75);
  assert.equal(sim.moveToolTo(demo.leftAway.toArray(),'left').limited,false);
  tissue.dispose();
});

test('dedicated specimen approach reaches a released piece beyond the old 80 mm range and follows its rigid motion',async()=>{
  const {sim,tissue,interaction}=raisedWorkbench(),messages=[];
  const piece=tissue.fragments.add(specimenDescriptor([.05,.055,.01],.005,'nearest-piece'),
    {position:[-.06,-.065,.05],quaternion:[0,0,0,1],sleeping:true});
  tissue.fragments.add(specimenDescriptor([.12,.03,.01],.005,'farther-piece'),
    {position:[.13,-.05,.08],quaternion:[0,0,0,1],sleeping:true});
  sim.state.tools.left.position=tissue.group.localToWorld(piece.position.clone().add(new THREE.Vector3(0,.105,0))).toArray();
  sim.select('right');
  const demo=new GuidedDemo(sim,tissue,interaction,{onMessage:text=>messages.push(text)});
  assert.equal(demo.approachSpecimen(),true);
  assert.equal(demo.approachFragment.id,piece.id);assert.equal(sim.state.selected,'left');
  assert.ok(sim.state.tools.left.jaw>.7);assert.equal(sim.undoStack.at(-1).label,'左钳接近独立标本');
  for(let index=0;index<70;index++){
    if(index===20){piece.position.z+=.01;piece.quaternion.setFromAxisAngle(new THREE.Vector3(0,1,0),.3);tissue.fragments.sync(piece);}
    demo.update(1/60);
  }
  assert.equal(demo.active,false);assert.ok(messages.at(-1).includes('独立标本表面'));
  const localTip=tissue.group.worldToLocal(new THREE.Vector3(...sim.state.tools.left.position));
  const surface=tissue.findSpecimenGraspPoint(localTip,.003);
  assert.equal(surface.fragmentId,piece.id);assert.ok(surface.distanceTo(localTip)<.001);
  sim.setJaw('left',0);await interaction.update(1/60);
  assert.equal(interaction.grasp.kind,'fragment');assert.equal(interaction.grasp.fragmentId,piece.id);
  tissue.dispose();
});

test('dedicated specimen approach never falls back to the mother and never drops an existing grasp',()=>{
  const {sim,tissue,interaction}=raisedWorkbench(),messages=[];
  const demo=new GuidedDemo(sim,tissue,interaction,{onMessage:text=>messages.push(text)}),initial=sim.snapshot();
  assert.equal(demo.approachSpecimen(),false);assert.deepEqual(sim.snapshot(),initial);assert.equal(sim.canUndo,false);
  assert.ok(messages.at(-1).includes('没有独立标本'));
  tissue.fragments.add(specimenDescriptor([.04,.03,.01],.005),{position:[.04,.03,.01],quaternion:[0,0,0,1],sleeping:true});
  interaction.grasp={kind:'tissue',local:[0,0,0],reference:[0,0,0],displacement:[0,0,0]};
  assert.equal(demo.approachSpecimen(),false);assert.equal(interaction.grasp.kind,'tissue');assert.equal(sim.canUndo,false);
  assert.ok(messages.at(-1).includes('先按 V 松开'));
  interaction.grasp=null;tissue.findSpecimenGraspPoint=()=>null;
  assert.equal(demo.approachSpecimen(),false);assert.equal(sim.canUndo,false);
  assert.ok(messages.at(-1).includes('不会退回母体'));
  tissue.dispose();
});

test('resume rebases a restored specimen onto the fresh CAD orientation gauge without spontaneous rotation',async()=>{
  const {sim,tissue,interaction}=raisedWorkbench();
  const piece=tissue.fragments.add(specimenDescriptor([.05,.055,.01],.005));
  sim.state.tools.left.position=tissue.group.localToWorld(new THREE.Vector3(.055,.055,.01)).toArray();
  let worldRotation=new THREE.Quaternion();interaction.toolQuaternion=()=>worldRotation;
  await interaction.update(1/60);
  worldRotation.setFromAxisAngle(new THREE.Vector3(0,0,1),.6);await interaction.update(1/60);
  const snapshot=interaction.snapshot(),saved=snapshot.tissue.fragments[0];
  tissue.restore=async data=>{
    const pose=data.fragments.find(value=>value.id===piece.id);
    piece.position.fromArray(pose.position);piece.quaternion.fromArray(pose.quaternion);
    piece.held=pose.held;piece.attachment=structuredClone(pose.attachment);tissue.fragments.sync(piece);
  };
  let rebases=0;const attach=tissue.attachFragment.bind(tissue);
  tissue.attachFragment=(...args)=>{rebases++;return attach(...args);};
  sim.setPaused(true);worldRotation.setFromAxisAngle(new THREE.Vector3(0,1,0),-1.1);
  await interaction.restore(snapshot);await interaction.update(1/60);interaction.applyGrasp();
  assert.equal(rebases,0,'paused restore must neither follow stale CAD nor consume the pending rebase');
  assert.deepEqual(piece.position.toArray(),saved.position);assert.deepEqual(piece.quaternion.toArray(),saved.quaternion);
  const freshGauge=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),1.8);
  worldRotation.copy(freshGauge);sim.setPaused(false);await interaction.update(1/60);
  assert.equal(rebases,1);
  assert.ok(piece.position.distanceTo(new THREE.Vector3(...saved.position))<1e-10);
  assert.ok(piece.quaternion.angleTo(new THREE.Quaternion(...saved.quaternion))<1e-8,'a fresh parallel-transport gauge must not rotate the restored specimen');
  worldRotation.copy(freshGauge).multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1),.4));
  await interaction.update(1/60);
  assert.equal(rebases,1,'the alignment correction is one-shot, not a per-frame rotation lock');
  assert.ok(Math.abs(piece.quaternion.angleTo(new THREE.Quaternion(...saved.quaternion))-.4)<1e-8,'subsequent deliberate wrist rotation must still rotate the specimen');
  sim.setJaw('left',1);await interaction.update(1/60);assert.equal(piece.held,false);
  tissue.dispose();
});
