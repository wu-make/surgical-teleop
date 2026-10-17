import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {MeshBroadPhase} from '../src/mesh-broad-phase.js';
test('parcel broad phase conservatively includes every intersected chunk after motion, replacement and removal',()=>{
  const meshes=Array.from({length:90},(_,i)=>{const g=new THREE.BoxGeometry(.007,.011,.009);g.translate((i%9-4)*.019,(Math.floor(i/9)-5)*.017,0);g.computeBoundingBox();return new THREE.Mesh(g);});
  const index=new MeshBroadPhase();index.sync(meshes);
  const verify=()=>{for(let i=0;i<80;i++){
    const a=new THREE.Vector3(Math.sin(i*3.4)*.1,Math.cos(i*.7)*.1,-.02),b=a.clone().add(new THREE.Vector3(.01,-.004,.04)),radius=.001;
    const query=new THREE.Box3().setFromPoints([a,b]).expandByScalar(radius),found=new Set(index.query(a,b,radius));
    for(const mesh of meshes)if(query.intersectsBox(mesh.geometry.boundingBox))assert(found.has(mesh));
    assert(found.size<meshes.length/2,'remote chunks must be excluded without changing geometry');
  }};
  try{verify();meshes[0].geometry.translate(.2,.13,0);meshes[0].geometry.computeBoundingBox();const removed=meshes.splice(5,1)[0];index.sync(meshes);verify();assert(!index.query(new THREE.Vector3(-1,-1,-1),new THREE.Vector3(1,1,1),0).includes(removed));removed.geometry.dispose();}finally{for(const m of meshes)m.geometry.dispose();}
});
