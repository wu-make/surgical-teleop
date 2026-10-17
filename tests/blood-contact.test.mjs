import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {TissueVolume} from '../src/tissue.js';

const slab=y=>{const geometry=new THREE.BoxGeometry(.04,.002,.04);geometry.translate(0,y,0);geometry.computeBoundingBox();return new THREE.Mesh(geometry);};
test('blood uses the earliest inward displayed-mesh crossing and endpoint overlap without replaying cut history',()=>{
  const tissue=new TissueVolume(),upper=slab(.01),lower=slab(0);
  tissue._meshes.set('lower-first',lower);tissue._meshes.set('upper-second',upper);
  tissue.sampleDistance=()=>{throw new Error('historical field must not be replayed for droplets');};
  try{
    const contact=tissue.collideBloodDrop(new THREE.Vector3(0,.03,0),new THREE.Vector3(0,-.01,0),.0004);
    assert(contact);assert(Math.abs(contact.y-.011)<1e-8);assert(contact.normal.y>.99);
    const overlap=tissue.collideBloodDrop(new THREE.Vector3(0,.012,0),new THREE.Vector3(0,.0112,0),.0004);
    assert(overlap);assert(Math.abs(overlap.y-.011)<1e-8);
    assert.equal(tissue.collideBloodDrop(new THREE.Vector3(.1,.03,0),new THREE.Vector3(.1,-.01,0),.0004),null);
    tissue._meshes.delete('upper-second');
    const removed=tissue.collideBloodDrop(new THREE.Vector3(0,.03,0),new THREE.Vector3(0,-.01,0),.0004);
    assert(Math.abs(removed.y-.001)<1e-8,'removed geometry must no longer support blood');
    lower.geometry.translate(0,.004,0);lower.geometry.computeBoundingBox();
    const refitted=tissue.collideBloodDrop(new THREE.Vector3(0,.03,0),new THREE.Vector3(0,-.01,0),.0004);
    assert(Math.abs(refitted.y-.005)<1e-8,'the shared hierarchy must refit after vertex changes');
  }finally{upper.geometry.dispose();tissue.dispose();}
});
test('a free blood parcel lands on actual cut geometry without gaining or losing fluid',()=>{
  const tissue=new TissueVolume();tissue.group.position.y=1.035;tissue.group.updateMatrixWorld(true);
  tissue._meshes.set('support',slab(0));tissue.sampleDistance=()=>{throw new Error('unexpected field replay');};
  try{
    tissue.blood.emitted=1;tissue.blood.shed(new THREE.Vector3(0,.02,0),1);
    for(let i=0;i<120;i++)tissue.blood.update(1/60);
    assert.equal(tissue.blood.drops.length,1);assert(tissue.blood.drops[0].position[1]>.001);
    assert(tissue.blood.drops[0].position[1]<.002);assert(Math.abs(tissue.blood.metrics.balanceErrorMm3)<1e-9);
  }finally{tissue.dispose();}
});
