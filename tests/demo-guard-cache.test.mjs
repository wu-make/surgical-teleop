import test from 'node:test';
import assert from 'node:assert/strict';
import {Mesh,PlaneGeometry} from 'three';
import {TissueVolume} from '../src/tissue.js';
import {Simulation} from '../src/simulation.js';
import {GuidedDemo} from '../src/guided-demo.js';
import {scissorsSegments} from '../src/scissors-kinematics.js';
import {sourceSegmentDistance} from '../src/instrument-contact.js';

test('repeated exact CAD poses reuse a guard result and every committed geometry revision invalidates it',()=>{
 const tissue=new TissueVolume(),sim=new Simulation(),demo=new GuidedDemo(sim,tissue,{}),geometry=new PlaneGeometry(.01,.01);geometry.computeBoundingBox();tissue._meshes.set('far',new Mesh(geometry));let distance=.02,queries=0;tissue.sampleDistance=()=>{queries++;return distance;};
 try{const first=demo._currentBladeGuard(sim.state.tools.right),count=queries;assert(count>0);assert.equal(demo._currentBladeGuard(sim.state.tools.right),first);assert.equal(queries,count);distance=-.001;tissue._contactRevision++;assert(demo._currentBladeGuard(sim.state.tools.right).bodyMinimum<0);assert(queries>count);}finally{tissue.dispose();}
});

test('transported frame changes and organ world transforms cannot reuse a stale CAD guard',()=>{
 const tissue=new TissueVolume(),sim=new Simulation(),demo=new GuidedDemo(sim,tissue,{}),geometry=new PlaneGeometry(.01,.01);geometry.computeBoundingBox();tissue._meshes.set('far',new Mesh(geometry));let queries=0;tissue.sampleDistance=()=>{queries++;return .02;};
 try{const tool=sim.state.tools.right;demo._currentBladeGuard(tool);let before=queries;demo._currentBladeGuard({...tool,alignment:tool.alignment.map(v=>-v)});assert(queries>before);before=queries;tissue.group.position.x=.01;demo._currentBladeGuard(tool);assert(queries>before);}finally{tissue.dispose();}
});

test('opening the jaws reuses the identical non-jaw metal query while retaining distinct full blade guards',()=>{
 const tissue=new TissueVolume(),sim=new Simulation(),demo=new GuidedDemo(sim,tissue,{}),geometry=new PlaneGeometry(.01,.01);geometry.computeBoundingBox();tissue._meshes.set('far',new Mesh(geometry));let queries=0;tissue.sampleDistance=()=>{queries++;return .02;};
 try{const tool=sim.state.tools.right,closed=demo._currentBladeGuard({...tool,jaw:0}),count=queries,opened=demo._currentBladeGuard({...tool,jaw:.2});assert.notEqual(opened,closed);assert.equal(queries,count);assert.deepEqual(opened.bodyGaps,closed.bodyGaps);assert.equal(opened.bodyMinimum,closed.bodyMinimum);tissue._contactRevision++;demo._currentBladeGuard({...tool,jaw:.2});assert(queries>count);}finally{tissue.dispose();}
});

test('switching to a broad cut rechecks lesion clearance while reusing unchanged metal geometry',()=>{
 const tissue=new TissueVolume(),sim=new Simulation(),demo=new GuidedDemo(sim,tissue,{}),geometry=new PlaneGeometry(.01,.01);geometry.computeBoundingBox();tissue._meshes.set('far',new Mesh(geometry));let queries=0;tissue.sampleDistance=()=>{queries++;return .02;};
 try{
  const tool={...sim.state.tools.right,jaw:0},segments=scissorsSegments(tool),tip=segments.at(-1).b;
  const centers=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]].map(axis=>tip.map((v,i)=>v+axis[i]*.0048));
  const distance=p=>Math.min(...segments.map(s=>sourceSegmentDistance(p,p,s.a,s.b)));centers.sort((a,b)=>distance(b)-distance(a));const center=centers[0];assert(distance(center)>.0025);
  tissue.metadata={dims:[3,3,3],spacing:[.0001,.0001,.0001],origin:center.map(v=>v-.0001),pathology:{center,radii:[.00001,.00001,.00001]}};tissue._baseField=new Float32Array(27).fill(-.01);
  demo.plan={traction:{},cutRadius:.00165};const fine=demo._currentBladeGuard(tool),count=queries;assert.equal(fine.lesionClearance,Infinity);
  demo.plan={traction:{},cutRadius:.005};const wide=demo._currentBladeGuard(tool);assert(wide.lesionClearance<0,'the larger real cut region reaches the protected label');assert.notEqual(wide,fine);assert.equal(queries,count,'changing cut width must not repeat unchanged metal queries');
 }finally{tissue.dispose();}
});
