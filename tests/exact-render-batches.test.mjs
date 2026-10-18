import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {ExactRenderBatches} from '../src/exact-render-batches.js';
function verify(batcher,source){
  const record=batcher.records.get(source);assert(record);const batch=record.group.mesh,range=batch.getGeometryRangeAt(record.geometry.id),matrix=new THREE.Matrix4();batch.getMatrixAt(record.instance,matrix);matrix.premultiply(batcher.root.matrixWorld);
  const expected=new THREE.Vector3(),actual=new THREE.Vector3(),g=source.geometry;
  assert.equal(range.vertexCount,g.attributes.position.count);assert.equal(range.indexCount,g.index.count);
  for(let i=0;i<range.vertexCount;i++){expected.fromBufferAttribute(g.attributes.position,i).applyMatrix4(source.matrixWorld);actual.fromBufferAttribute(batch.geometry.attributes.position,range.vertexStart+i).applyMatrix4(matrix);assert(expected.distanceTo(actual)<1e-6);}
  for(const name of Object.keys(g.attributes))assert.deepEqual(batch.geometry.attributes[name].array.slice(range.vertexStart*g.attributes[name].itemSize,(range.vertexStart+range.vertexCount)*g.attributes[name].itemSize),g.attributes[name].array,`${name} must not lose detail`);
  for(let i=0;i<range.indexCount;i++)assert.equal(batch.geometry.index.array[range.indexStart+i]-range.vertexStart,g.index.array[i]);
}

test('new cut geometry is copied into its batch once; later attribute edits still upload once',()=>{
  const original=THREE.BatchedMesh.prototype.setGeometryAt;let copies=0;
  THREE.BatchedMesh.prototype.setGeometryAt=function(...args){copies++;return original.apply(this,args);};
  const root=new THREE.Scene(),material=new THREE.MeshStandardMaterial(),sources=[0,1].map(()=>new THREE.Mesh(new THREE.BoxGeometry(),material));sources.forEach(m=>root.add(m));const batcher=new ExactRenderBatches(root);
  try{
    batcher.sync(sources);assert.equal(copies,2,'addGeometry already copied both source geometries');
    batcher.sync(sources);assert.equal(copies,2);
    sources[0].geometry.attributes.position.setX(0,.8);sources[0].geometry.attributes.position.needsUpdate=true;
    batcher.sync(sources);assert.equal(copies,3);verify(batcher,sources[0]);
  }finally{THREE.BatchedMesh.prototype.setGeometryAt=original;batcher.dispose();sources.forEach(m=>m.geometry.dispose());material.dispose();}
});
test('exact batches retain every triangle and material attribute through movement, deformation and visibility changes',()=>{
  const root=new THREE.Scene(),joint=new THREE.Group();joint.position.set(.02,1.03,-.01);root.add(joint);const material=new THREE.MeshPhysicalMaterial(),sources=[];
  for(let i=0;i<3;i++){const g=new THREE.BoxGeometry(.01,.02,.03);g.setAttribute('tissueRestPosition',g.attributes.position.clone());g.setAttribute('tissueCutMask',new THREE.BufferAttribute(new Float32Array(g.attributes.position.count).fill(i*.25),1));const m=new THREE.Mesh(g,material);m.position.x=i*.04;m.layers.enable(1);m.castShadow=m.receiveShadow=true;joint.add(m);sources.push(m);}
  const batcher=new ExactRenderBatches(root),before=sources.map(m=>structuredClone(m.geometry.attributes.position.array));
  try{
    batcher.sync(sources);assert.equal(batcher.metrics.batches,1);assert.equal(batcher.metrics.triangles,36);for(const m of sources)verify(batcher,m);
    joint.rotation.y=.8;sources[1].position.y=.02;sources[1].geometry.attributes.position.setY(0,.023);sources[1].geometry.attributes.position.needsUpdate=true;sources[1].geometry.attributes.tissueCutMask.setX(0,.91);sources[1].geometry.attributes.tissueCutMask.needsUpdate=true;sources[2].visible=false;batcher.sync(sources);
    for(const m of sources)verify(batcher,m);assert.equal(batcher.records.get(sources[2]).group.mesh.getVisibleAt(batcher.records.get(sources[2]).instance),false);
    assert.deepEqual(sources[0].geometry.attributes.position.array,before[0]);assert.equal(sources[0].parent,joint);
    const old=sources[0].geometry;sources[0].geometry=new THREE.BoxGeometry(.02,.03,.04);sources[0].geometry.setAttribute('tissueRestPosition',sources[0].geometry.attributes.position.clone());sources[0].geometry.setAttribute('tissueCutMask',new THREE.BufferAttribute(new Float32Array(24),1));batcher.sync(sources.slice(0,2));assert.equal(batcher.metrics.sources,2);assert.equal(sources[2].layers.mask,3);verify(batcher,sources[0]);old.dispose();
  }finally{batcher.dispose();for(const m of sources){assert.equal(m.layers.mask,3);m.geometry.dispose();}material.dispose();}
});
test('repeated growing cut geometries reclaim batch storage and do not duplicate removed surfaces',()=>{
  const root=new THREE.Scene(),material=new THREE.MeshStandardMaterial(),sources=[new THREE.Mesh(new THREE.SphereGeometry(.01,8,6),material),new THREE.Mesh(new THREE.SphereGeometry(.01,8,6),material)];sources.forEach(m=>root.add(m));const batcher=new ExactRenderBatches(root);
  try{for(let i=0;i<45;i++){const old=sources[0].geometry;sources[0].geometry=new THREE.SphereGeometry(.01,8+i%16,6+i%8);batcher.sync(sources);verify(batcher,sources[0]);assert.equal(batcher.metrics.sources,2);assert.equal(batcher.groups.values().next().value.geometries.size,2);old.dispose();}}finally{batcher.dispose();sources.forEach(m=>m.geometry.dispose());material.dispose();}
});

test('batch capacity operations retain precise timestamps while preserving every source vertex',()=>{
  const root=new THREE.Scene(),material=new THREE.MeshStandardMaterial(),sources=[new THREE.Mesh(new THREE.BoxGeometry(),material),new THREE.Mesh(new THREE.BoxGeometry(),material)];sources.forEach(m=>root.add(m));const batches=new ExactRenderBatches(root);
  try{batches.sync(sources);const old=sources[0].geometry;sources[0].geometry=new THREE.SphereGeometry(.02,45,35);batches.sync(sources);old.dispose();verify(batches,sources[0]);
    assert(batches.metrics.operationCounts.compact>0);assert(batches.metrics.operationCounts.resize>0);
    for(const row of batches.metrics.operations){assert(row.end>=row.start);assert(row.ms>=0);assert(row.vertexCapacity>0);}assert(batches.metrics.operations.length<=32);assert(batches.metrics.worstOperations.length<=8);
  }finally{batches.dispose();sources.forEach(m=>m.geometry.dispose());material.dispose();}
});
