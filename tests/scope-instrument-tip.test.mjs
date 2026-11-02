import test from'node:test';import assert from'node:assert/strict';import{Group,PerspectiveCamera,Vector3}from'three';
import{Simulation}from'../src/simulation.js';import{makeScopeContext}from'../src/scope-context.js';import{scissorsAnchor}from'../src/scissors-kinematics.js';
function projected(sim,p){const s=sim.state.scope,camera=new PerspectiveCamera(s.fov,sim.viewAspect,.003,5);camera.position.fromArray(s.position);camera.up.fromArray(s.cameraUp);camera.lookAt(new Vector3(...s.lookAt));camera.updateMatrixWorld();return new Vector3(...p).project(camera);}
test('the complete visible curved-scissor end stays centred through jaw and wrist changes, rather than the proximal command frame',()=>{
 const sim=new Simulation();sim.moveToolTo([-.14,1.08,.03],'left');sim.select('right');sim.setScopeFollow(true,'active');
 for(const jaw of[0,.2,.6]){assert(!sim.moveToolPose({position:[.04,1.13,-.02],wrist:[.6,-.7,.8],jaw},'right').limited);for(let i=0;i<240;i++)sim.update(1/60);const p=projected(sim,scissorsAnchor(sim.state.tools.right));assert(Math.hypot(p.x,p.y)<1e-8,'the actual distal blade, not its wrist frame, must project to the optical centre');}
});
test('the anatomical surface query uses the same actual distal blade point as optical tracking',()=>{
 const sim=new Simulation();sim.select('right');sim.setScopeFollow(true,'active');let query;const tissue={group:new Group(),metadata:{bounds:[[-1,0,-1],[1,2,1]]},_epoch:0,findParentSurfacePoint:p=>{query=p.toArray();return p;}};makeScopeContext(sim,tissue,{},0);const expected=scissorsAnchor(sim.state.tools.right);assert(Math.hypot(...query.map((v,i)=>v-expected[i]))<1e-10);
});
test('reset framing keeps the real scissor end and the left grasp point visible together',()=>{const sim=new Simulation();sim.prepareInitialScopeView(949/612);for(const p of[sim.state.tools.left.position,scissorsAnchor(sim.state.tools.right)]){const q=projected(sim,p);assert(Math.abs(q.x)<1&&Math.abs(q.y)<1&&q.z>-1&&q.z<1);}});
