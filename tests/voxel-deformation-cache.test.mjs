import test from'node:test';import assert from'node:assert/strict';import{normalizeDeformation,deformPoint,voxelDeformationMapper}from'../src/tissue-worker.js';
test('voxel mapping retains exact Float64 deformation, reuses unchanged grasps, and discards stale grasp weights',()=>{
  const state={},d=normalizeDeformation({model:'local-flow',local:[.02,.012,.06],displacement:[-.05,.035,.015],radius:.05,coreRadius:.0125}),map=voxelDeformationMapper(state,d),points=[];
  for(let i=0;i<1200;i++){const p=[(i%15)*.002,Math.floor(i/15)%10*.002,.03+Math.floor(i/150)*.003];points.push(p);assert.deepEqual(map(i,p),deformPoint(p,d));}
  const cache=state._voxelMapping;assert.equal(cache.misses,1200);assert.equal(cache.tiles.size,1);
  const same=voxelDeformationMapper(state,structuredClone(d));for(let i=0;i<points.length;i++)assert.deepEqual(same(i,points[i]),deformPoint(points[i],d));assert.equal(cache.hits,1200);assert.equal(state._voxelMapping,cache);
  const changed=normalizeDeformation({...d,displacement:[-.049,.035,.015]}),fresh=voxelDeformationMapper(state,changed);assert.notEqual(state._voxelMapping,cache);for(let i=0;i<points.length;i++)assert.deepEqual(fresh(i,points[i]),deformPoint(points[i],changed));
});

test('cut-front changes invalidate exact voxel weights while retaining section geometry',()=>{
 const state={},d=normalizeDeformation({model:'local-flow',local:[.045,.012,.0713],displacement:[0,0,.04],radius:.05,coreRadius:.032,section:{center:[.045,.012],radii:[.0168,.0204],plane:.0375,depth:.013,curvature:[.4,.6],front:.010,width:.0033,frontBlend:.006}}),first=voxelDeformationMapper(state,d),p=[.045,.012,.039];
 assert.deepEqual(first(0,p),deformPoint(p,d));const cache=state._voxelMapping;
 const next=normalizeDeformation({...d,section:{...d.section,front:.025}}),second=voxelDeformationMapper(state,next);assert.notEqual(state._voxelMapping,cache);assert.deepEqual(second(0,p),deformPoint(p,next));assert.notDeepEqual(first(0,p),second(0,p));
});
