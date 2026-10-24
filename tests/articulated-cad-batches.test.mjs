import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {loadAssemblies} from '../src/authentic-assemblies.js';
import {Simulation} from '../src/simulation.js';
import {SurgicalScene} from '../src/scene.js';

test('real articulated CAD retains every source attribute/index, layer and world transform through jaw and wrist motion',async()=>{
  const scene=new THREE.Scene(),fetchBefore=globalThis.fetch;
  globalThis.fetch=async url=>new Response(await readFile(new URL('../public'+url,import.meta.url)));
  let assembly;try{assembly=await loadAssemblies(scene);}finally{globalThis.fetch=fetchBefore;}
  const toolLayers=new Map();for(const tool of Object.values(assembly.tools))tool.group.traverse(source=>{if(source.isMesh)toolLayers.set(source,source.layers.mask);});
  const room=new THREE.Group(),state=new Simulation().state,view={scene,room,assemblies:assembly,robotLoaded:true,tissue:{ready:true,_meshes:new Map(),fragments:{items:new Map()}},renderer:{extensions:{has:()=>true}}};scene.add(room);
  const raw=await readFile(new URL('../public/assets/g1.glb',import.meta.url)),g1=await new GLTFLoader().parseAsync(raw.buffer.slice(raw.byteOffset,raw.byteOffset+raw.byteLength),'');view.robotModel=g1.scene;scene.add(g1.scene);
  try{
    for(const phase of [0,.4,1]){
      state.tools.left.jaw=phase;state.tools.right.jaw=1-phase;state.tools.left.wrist=[phase*.2,-phase*.3,phase*7];state.tools.right.wrist=[-phase*.3,phase*.4,-phase*6];assembly.update(state,1/30);
      g1.scene.getObjectByName('left_shoulder_pitch_joint').rotation.x=phase*.8;g1.scene.getObjectByName('right_elbow_joint').rotation.y=-phase*.6;
      SurgicalScene.prototype.prepareRenderGeometry.call(view);
      let robotParts=0;g1.scene.traverse(source=>{if(source.isMesh){robotParts++;assert(view.exactBatches.records.has(source),'every original G1 CAD part uses the exact batch transport');}});assert(robotParts>20);
      for(const [source,mask]of toolLayers)if(mask&2){assert.equal(source.layers.mask,mask,'operative CAD keeps its original draw path');assert(!view.exactBatches.records.has(source));}
      assert(view.exactBatches.records.size>20);assert(view.exactBatches.metrics.batches<view.exactBatches.records.size);
      for(const [source,record]of view.exactBatches.records){
        const batch=record.group.mesh,range=batch.getGeometryRangeAt(record.geometry.id),matrix=new THREE.Matrix4();batch.getMatrixAt(record.instance,matrix);matrix.premultiply(scene.matrixWorld);
        assert(source.matrixWorld.determinant()>0,'source CAD must not require a different front-face winding');
        assert.equal(source.layers.mask,0);assert.equal(batch.layers.mask,record.mask);
        for(const [name,a]of Object.entries(source.geometry.attributes))assert.deepEqual(batch.geometry.attributes[name].array.slice(range.vertexStart*a.itemSize,(range.vertexStart+range.vertexCount)*a.itemSize),a.array);
        const indices=source.geometry.index;for(let i=0;i<indices.count;i++)assert.equal(batch.geometry.index.array[range.indexStart+i]-range.vertexStart,indices.array[i]);
        // Complete attributes plus one affine matrix determine every vertex.
        // Check all matrix coefficients and distributed vertices in world space.
        for(let i=0;i<16;i++)assert(Math.abs(matrix.elements[i]-source.matrixWorld.elements[i])<1e-6);
        for(let i=0;i<range.vertexCount;i+=Math.max(1,Math.floor(range.vertexCount/19))){const expected=new THREE.Vector3().fromBufferAttribute(source.geometry.attributes.position,i).applyMatrix4(source.matrixWorld),actual=new THREE.Vector3().fromBufferAttribute(batch.geometry.attributes.position,range.vertexStart+i).applyMatrix4(matrix);assert(expected.distanceTo(actual)<1e-6);}
      }
    }
  }finally{view.exactBatches?.dispose();assembly.dispose();g1.scene.traverse(m=>{m.geometry?.dispose();if(m.material)(Array.isArray(m.material)?m.material:[m.material]).forEach(material=>material.dispose());});}
});
