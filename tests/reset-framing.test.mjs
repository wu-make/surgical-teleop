import test,{after} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import * as THREE from 'three';
import {Simulation} from '../src/simulation.js';
import {loadAssemblies} from '../src/authentic-assemblies.js';
import {resolveInitialScopeFraming} from '../src/scope-framing.js';

const originalFetch=globalThis.fetch;
globalThis.fetch=async url=>new Response(await readFile(new URL(`../public${url}`,import.meta.url)));
const assemblies=await loadAssemblies(new THREE.Scene());globalThis.fetch=originalFetch;after(()=>assemblies.dispose());
const near=(a,b,tolerance=1e-9)=>assert.ok(Math.abs(a-b)<tolerance,`${a} != ${b}`);
function cameraFor(sim,aspect){const s=sim.state.scope,camera=new THREE.PerspectiveCamera(s.fov,aspect,.003,5);camera.position.fromArray(s.position);camera.up.fromArray(s.cameraUp);camera.lookAt(new THREE.Vector3(...s.lookAt));camera.updateMatrixWorld(true);return camera;}
function bothVisible(sim,aspect){
  assemblies.update(sim.state,1/60);const camera=cameraFor(sim,aspect);
  for(const side of ['left','right']){
    const tcp=assemblies.toolTipPositions[side],ndc=tcp.clone().project(camera);
    assert.ok(Math.abs(ndc.x)<.86&&Math.abs(ndc.y)<.86&&ndc.z<1&&ndc.z>-1,`${aspect}/${side}: true CAD TCP clipped ${ndc.toArray()}`);
    assert.ok(tcp.distanceTo(new THREE.Vector3(...sim.state.tools[side].position))<1e-10);
    // Also check the end of the actual source jaw metal, not merely its named
    // abstract tool_tip_link. These points retain the genuine source opening.
    const tool=assemblies.tools[side];
    for(const name of ['jaw_1_link','jaw_2_link']){
      const link=tool.group.getObjectByName(name),inverse=link.matrixWorld.clone().invert(),points=[];
      link.traverse(node=>{if(!node.isMesh)return;const p=node.geometry.attributes.position;for(let i=0;i<p.count;i++){const world=new THREE.Vector3().fromBufferAttribute(p,i).applyMatrix4(node.matrixWorld);points.push({world,local:world.clone().applyMatrix4(inverse)});}});
      const maxY=Math.max(...points.map(p=>p.local.y));
      for(const point of points.filter(p=>p.local.y>maxY-.0002)){
        const projected=point.world.project(camera);
        assert.ok(Math.abs(projected.x)<.98&&Math.abs(projected.y)<.98,`${aspect}/${side}: visible source jaw end clipped`);
      }
    }
  }
}

test('initial/reset framing contains both actual CAD TCPs and metal jaw ends in portrait, landscape and fullscreen aspects',()=>{
  for(const aspect of [.3,.32,.462,.6,.75,1,1.55,2.4,3.5]){
    const sim=new Simulation();sim.select('right');sim.prepareInitialScopeView(aspect);
    assert.equal(sim.state.scope.followMode,'midpoint');assert.equal(sim.state.scope.startupOverview,true);
    bothVisible(sim,aspect);
    assert.ok(sim.state.scope.fov>=55&&sim.state.scope.fov<=80);
    assert.equal(sim.state.scope.framingLimited,false);
    const initial=sim.snapshot();
    sim.moveTool([-.01,.012,-.015],'left');sim.state.scope.roll=2;sim.zoomScope(-.2);sim.setScopeFollow(false);
    sim.reset();sim.select('right');sim.prepareInitialScopeView(aspect);bothVisible(sim,aspect);
    assert.deepEqual(sim.snapshot(),initial,'reset restores the same complete initial simulation pose for this viewport');
  }
});

test('first real instrument input leaves startup framing for active TCP, while explicit midpoint/grasp remain authoritative',()=>{
  const sim=new Simulation();sim.prepareInitialScopeView(.462);sim.select('right');
  sim.update(.05,new Set());assert.equal(sim.state.scope.startupOverview,true,'selection and idle frames do not discard the initial two-tip view');
  sim.update(.05,new Set(['KeyD']));assert.equal(sim.state.scope.startupOverview,false);assert.equal(sim.state.scope.followMode,'active');assert.equal(sim.state.activeTool,'right');
  sim.update(.01,new Set());for(let i=0;i<120;i++)sim.update(1/60);
  const projected=assemblies.toolTipPositions.right;assemblies.update(sim.state,1/60);const p=projected.clone().project(cameraFor(sim,.462));near(p.x,0,1e-8);near(p.y,0,1e-8);
  sim.undo();assert.equal(sim.state.scope.startupOverview,true);bothVisible(sim,.462);
  for(const mode of ['midpoint','grasp']){
    sim.reset();sim.setScopeFollow(true,mode);sim.moveTool([-.002,0,0],'left');assert.equal(sim.state.scope.followMode,mode);assert.equal(sim.state.scope.startupOverview,false);
  }
});

test('an explicit startup optical zoom survives context updates and resize, and reset removes the override',()=>{
  const sim=new Simulation();sim.prepareInitialScopeView(.462);const canonicalFov=sim.state.scope.fov;sim.zoomScope(-.25);const fov=sim.state.scope.fov;
  assert.equal(sim.state.scope.startupFovUserSet,true);
  sim.setScopeContext({viewAspect:.32});near(sim.state.scope.fov,fov);
  sim.prepareInitialScopeView(1.6);near(sim.state.scope.fov,fov);
  sim.reset();sim.prepareInitialScopeView(.462);near(sim.state.scope.fov,canonicalFov);assert.equal(sim.state.scope.startupFovUserSet,false);bothVisible(sim,.462);
  const old=sim.snapshot();delete old.state.scope.startupOverview;delete old.state.scope.startupFovUserSet;sim.restore(old);
  assert.equal(sim.state.scope.startupOverview,false,'old explicit follow preferences are not reinterpreted as startup');
});

test('extremely narrow impossible framing reports its optical/physical limit instead of fabricating a lens position',()=>{
  const sim=new Simulation(),s=sim.state.scope;
  const fit=resolveInitialScopeFraming({port:s.port,targets:Object.values(sim.state.tools).map(t=>t.position),aspect:.08});
  assert.equal(fit.framingLimited,true);near(fit.depthTarget,.018);near(fit.recommendedFov,80);
  assert.throws(()=>sim.prepareInitialScopeView(0),TypeError);
});
