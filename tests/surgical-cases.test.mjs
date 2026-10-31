import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as THREE from 'three';
import {surgicalCase,boundaryProjection,initializeCase} from '../src/surgical-cases.js';
import {assistBoundary,BOUNDARY_ASSIST} from '../src/boundary-assistance.js';
import {Simulation} from '../src/simulation.js';
import {createVolumeState,applyCapsuleCut,initializeConnectivity,separateDisconnectedComponents} from '../src/tissue-worker.js';
import {lesionNodes,lesionStatistics} from '../src/lesion-volume.js';
import {resectionScore} from '../src/resection-score.js';
import {createTissueMaterial} from '../src/tissue-material.js';
import {TissueVolume} from '../src/tissue.js';
import {GuidedDemo,planPeripheralResections} from '../src/guided-demo.js';
import {InteractionController} from '../src/interaction-controller.js';
import {instrumentPose} from '../src/instrument-pose.js';

test('pelvic reference includes both ovaries, both tubes and uterus in a closed connected submillimetre volume',()=>{
  const m=JSON.parse(fs.readFileSync(new URL('../public/assets/pelvic-volume.json',import.meta.url)));
  assert(m.structures.some(p=>p.node==='VH_F_left_ovary'));assert(m.structures.some(p=>p.node==='VH_F_right_ovary'));
  for(const side of ['L','R'])assert(m.structures.some(p=>p.node.includes('ampulla')&&p.node.endsWith(side)));
  assert(m.structures.some(p=>p.node.includes('wall_of_uterus')));assert.equal(m.license,'CC BY 4.0');
  assert.equal(m.validation.connectedComponents,1);assert.equal(m.validation.watertight,true);assert(m.spacing.every(s=>s<=.00075));
  assert.equal(fs.statSync(new URL('../public/assets/pelvic-volume.bin',import.meta.url)).size,m.dims.reduce((a,b)=>a*b,4));
});

test('actual pelvic volume cuts off the left target and accounts for lesion in the independent specimen',()=>{
  const c=surgicalCase('uterus-adnexa'),meta=JSON.parse(fs.readFileSync(new URL('../public/assets/pelvic-volume.json',import.meta.url))),b=fs.readFileSync(new URL('../public/assets/pelvic-volume.bin',import.meta.url));
  meta.pathology=c.lesion;const state=createVolumeState(meta,new Float32Array(b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength)));
  state.lesionNodes=lesionNodes(meta,state.base);initializeConnectivity(state);
  const before=lesionStatistics(state);assert(before.totalMm3>1000);assert.equal(before.attachedMm3,before.totalMm3);assert.equal(resectionScore(before).points,0);
  const x=c.lesion.center[0]-c.lesion.radii[0]-.004;
  for(let y=meta.bounds[0][1]-.003;y<=meta.bounds[1][1]+.003;y+=.0025)applyCapsuleCut(state,{a:[x,y,meta.bounds[0][2]-.003],b:[x,y,meta.bounds[1][2]+.003],radius:.00165});
  const result=separateDisconnectedComponents(state,{force:true}),after=lesionStatistics(state);
  assert(result.fragments.length>0,'the target must truly disconnect from the registered mother');
  assert.equal(after.attachedMm3,0);assert.deepEqual(resectionScore(after),{complete:true,percent:100,points:100});assert(after.detachedMm3/before.totalMm3>.99,'a medial section should preserve the labelled lesion inside its specimen');
  assert(after.excisedMm3/before.totalMm3<.01,'the lesion cannot disappear by replacing it with a visual dummy');
});

test('both lesion examples cover the complete target and preflight their full CAD paths without empty-corner collisions',()=>{
  for(const id of ['lesion-liver','uterus-adnexa']){
    const c=surgicalCase(id),meta=JSON.parse(fs.readFileSync(new URL('../public/assets/'+c.asset+'.json',import.meta.url))),b=fs.readFileSync(new URL('../public/assets/'+c.asset+'.bin',import.meta.url));
    const tissue=new TissueVolume({caseDefinition:c});tissue.metadata=meta;tissue._baseField=new Float32Array(b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength));tissue.group.position.y=1.035;tissue.group.rotation.x=-Math.PI/2;tissue.group.updateMatrixWorld(true);
    const sim=new Simulation(),interaction=new InteractionController(sim,tissue),demo=new GuidedDemo(sim,tissue,interaction);initializeCase(sim,tissue,c,949/612);
    try{
      const plans=planPeripheralResections(tissue);assert.equal(plans.length,1);const plan=plans[0];
      assert(plan.plane<c.lesion.center[0]-c.lesion.radii[0]);assert(plan.referenceAnchor.x>plan.plane);
      assert(demo._preparePlan(plan),'every planned source-CAD movement must be accepted by the actual collision controller');
      assert(Math.abs(tissue.queryReferenceDistance(plan.referenceAnchor))<meta.spacing[0]*.1);
    }finally{tissue.dispose();}
  }
});

test('new scenario tips retain true fixed-port shaft alignment and can be reset repeatedly',()=>{
  const sim=new Simulation(),tissue={group:new THREE.Group()};tissue.group.position.y=1.035;tissue.group.rotation.x=-Math.PI/2;tissue.group.updateMatrixWorld(true);
  for(const id of ['lesion-liver','uterus-adnexa','lesion-liver']){
    sim.reset();initializeCase(sim,tissue,surgicalCase(id),949/612);
    for(const side of ['left','right']){const tool=sim.state.tools[side],pose=instrumentPose(tool),fromRoot=new THREE.Vector3(...tool.port).sub(new THREE.Vector3(...pose.position));assert(fromRoot.cross(new THREE.Vector3(...pose.shaftDirection)).length()<1e-10,'the physical shaft axis must pass through its RCM despite the offset CAD tip');}
    assert(sim.state.collision.clearance>0);assert.equal(sim.canUndo,false);
  }
});

function assistFixture(){
  const sim=new Simulation();sim.select('right');sim.setCutting(true);sim.setJaw('right',0);
  const tissue={group:new THREE.Group(),toReferencePoint:p=>p.clone(),deformPoint:p=>p.clone()};tissue.group.updateMatrixWorld(true);
  const definition={boundary:{center:[.025,1.108,-.035],radii:[.02,.02,.02]}};
  sim.moveToolTo([.030,1.108,-.013],'right');
  const blade=()=>{const p=new THREE.Vector3(...sim.state.tools.right.position);return{segments:[{a:p,b:p.clone().add(new THREE.Vector3(0,-.001,0))}]};};
  return {sim,tissue,definition,blade};
}
test('near-edge assistance moves the visible scissors with bounded speed and preserves the left tool',()=>{
  const f=assistFixture(),left=structuredClone(f.sim.state.tools.left),start=[...f.sim.state.tools.right.position];
  const distance=p=>boundaryProjection(p,f.definition.boundary).distance;
  const result=assistBoundary({...f,blade:f.blade(),keys:new Set(['KeyC','KeyD']),dt:1/60});
  assert(result.engaged);assert(result.correctionMm>0&&result.correctionMm<=BOUNDARY_ASSIST.maxSpeed/60*1000+1e-8);
  assert(distance(f.sim.state.tools.right.position)<distance(start));assert.deepEqual(f.sim.state.tools.left,left);
});
test('assistance leaves distant, released-C, paused, left-hand, pressure and disabled operations untouched',()=>{
  for(const modify of [f=>f.sim.moveToolTo([.10,1.108,-.013],'right'),f=>f.keys.clear(),f=>f.sim.setPaused(true),f=>f.sim.select('left'),f=>f.keys.add('KeyH'),f=>f.keys.add('Space'),f=>f.enabled=false,f=>f.demoActive=true]){
    const f={...assistFixture(),keys:new Set(['KeyC']),enabled:true,dt:1/60};modify(f);const before=f.sim.snapshot();
    assert.equal(assistBoundary({...f,blade:f.blade()}).engaged,false);assert.deepEqual(f.sim.snapshot(),before);
  }
});
test('scenario pathology and guidance share fixed material coordinates on original and detached surfaces',()=>{
  for(const id of ['liver','lesion-liver','uterus-adnexa']){
    const c=surgicalCase(id),m=createTissueMaterial({caseDefinition:c}),s={uniforms:{},vertexShader:THREE.ShaderLib.physical.vertexShader,fragmentShader:THREE.ShaderLib.physical.fragmentShader};m.onBeforeCompile(s);
    assert.equal(s.uniforms.uCaseKind.value,c.kind);assert.equal(s.uniforms.uCutGuide.value,c.boundary?1:0);assert.match(s.vertexShader,/vTissuePosition=tissueRestPosition/);
    if(c.lesion)assert.deepEqual(s.uniforms.uLesionCenter.value.toArray(),c.lesion.center);m.dispose();
  }
  assert.equal(surgicalCase('not-a-model').id,'liver');
});
