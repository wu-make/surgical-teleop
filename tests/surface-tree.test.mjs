import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {buildSurfaceTree} from '../src/surface-tree.js';
import {closestParentSurface,closestParentSegment,firstParentHit} from '../src/tissue-contact.js';

test('transferred contact trees retain every triangle and match fresh exact queries before and after deformation',()=>{
  const a=new THREE.SphereGeometry(.02,32,24),b=a.clone(),material=new THREE.MeshBasicMaterial();
  const expected=new THREE.Mesh(a,material),actual=new THREE.Mesh(b,material);
  const tree=buildSurfaceTree(b.attributes.position.array,b.index.array);
  b.userData.surfaceTree=structuredClone(tree,{transfer:[tree.boundsStore.buffer,tree.triangles.buffer]});
  const faces=[];const visit=node=>{if(node.triangles)faces.push(...node.triangles);else{visit(node.left);visit(node.right);}};visit(b.userData.surfaceTree.root);
  assert.deepEqual(faces.sort((x,y)=>x-y),Array.from({length:b.index.count/3},(_,i)=>i));
  const compare=(x,y)=>{assert.equal(!!x,!!y);if(x&&y){const p=x.surface??x,q=y.surface??y;assert(p.distanceTo(q)<1e-10);}};
  try{
    // Version zero uses worker bounds; later versions must refit those bounds.
    for(const displacement of [0,.012,-.006]){
      if(displacement)for(const g of [a,b]){const p=g.attributes.position;for(let i=0;i<p.count;i++)p.setY(i,p.getY(i)+displacement*Math.max(0,p.getX(i)/.02));p.needsUpdate=true;}
      for(const g of [a,b])g.computeBoundingBox();
      for(let i=0;i<50;i++){
        const start=new THREE.Vector3(Math.sin(i*2.7)*.04,Math.cos(i*1.9)*.04,.035),end=start.clone().multiplyScalar(-.7);
        compare(closestParentSurface([expected],start,.05),closestParentSurface([actual],start,.05));
        const x=closestParentSegment([expected],start,end,.05),y=closestParentSegment([actual],start,end,.05);
        assert.equal(!!x,!!y);if(x&&y)assert(Math.abs(x.distance-y.distance)<1e-10);
        compare(firstParentHit([expected],start,end),firstParentHit([actual],start,end));
      }
    }
    // A deformation applied before the first query must also refit immediately.
    const c=b.clone();c.userData.surfaceTree=b.userData.surfaceTree;c.attributes.position.needsUpdate=true;c.computeBoundingBox();
    compare(closestParentSurface([actual],new THREE.Vector3(.03,0,0),.05),closestParentSurface([new THREE.Mesh(c,material)],new THREE.Vector3(.03,0,0),.05));c.dispose();
  }finally{a.dispose();b.dispose();material.dispose();}
});
