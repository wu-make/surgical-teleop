import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {TissueVolume} from '../src/tissue.js';
import {prepareFragmentDisplay} from '../src/tissue-worker.js';
import {prepareFilmIndex} from '../src/film-support-index.js';

function descriptor(deformation){
  const g=new THREE.SphereGeometry(.009,24,18);g.translate(.004,-.002,.006);
  const result={id:'prepared-piece',center:[.004,-.002,.006],volumeMm3:1500,deformation,
    positions:g.attributes.position.array.slice(),normals:g.attributes.normal.array.slice(),
    colors:new Float32Array(g.attributes.position.count*3).fill(.4),cutMasks:new Float32Array(g.attributes.position.count).fill(.8),indices:g.index.array.slice(),
    volume:{dims:[2,2,2],origin:[0,0,0],spacing:[.01,.01,.01],values:new Float32Array(8)}};
  g.dispose();return result;
}

test('worker-prepared specimens preserve every frozen vertex, normal, material attribute, bound and support point',()=>{
  for(const deformation of [null,{local:[.002,0,.005],displacement:[.003,-.004,.008],radius:.03},{model:'local-flow',local:[.004,-.002,.006],displacement:[-.009,.003,.025]}]){
    const d=descriptor(deformation),a=new TissueVolume(),b=new TissueVolume();
    try{
      const expected=a.fragments.add(d);d.display=prepareFragmentDisplay(d);d.filmSpatialIndex=prepareFilmIndex(d.positions);
      const transferred=structuredClone(d,{transfer:[d.display.positions.buffer,d.display.normals.buffer,d.display.support.buffer,d.filmSpatialIndex.offsets.buffer,d.filmSpatialIndex.vertices.buffer]});
      const actual=b.fragments.add(transferred);
      assert.equal(actual.mesh.geometry.userData.filmSpatialIndex,transferred.filmSpatialIndex,'specimen blood adopts the transferred index without rebuilding it');
      assert.equal(transferred.filmSpatialIndex.positions,actual.mesh.geometry.attributes.tissueRestPosition.array,'blood bins refer to the exact original material vertices');
      assert.deepEqual(actual.mesh.geometry.userData.restBox,new THREE.Box3().setFromBufferAttribute(actual.mesh.geometry.attributes.tissueRestPosition),'blood adopts exact undeformed bounds instead of scanning the new specimen on first draw');
      assert.equal(actual.mesh.geometry.attributes.position.array,transferred.display.positions,'foreground uses the transferred full vertex buffer');
      for(const key of Object.keys(expected.mesh.geometry.attributes))assert.deepEqual(actual.mesh.geometry.attributes[key].array,expected.mesh.geometry.attributes[key].array,key);
      assert.deepEqual(actual.mesh.geometry.index.array,expected.mesh.geometry.index.array);
      assert.deepEqual(actual.support,expected.support);assert.deepEqual(actual.mesh.geometry.boundingBox,expected.mesh.geometry.boundingBox);
      assert.deepEqual(actual.mesh.geometry.boundingSphere,expected.mesh.geometry.boundingSphere);assert.deepEqual(actual.frozenCenter,expected.frozenCenter);
      assert.deepEqual(actual.position,expected.position);assert.equal(actual.volumeMm3,expected.volumeMm3);
    }finally{a.dispose();b.dispose();}
  }
});

test('a restored deformation different from the prepared one uses the exact saved-state fallback',()=>{
  const d=descriptor(null);d.display=prepareFragmentDisplay(d);
  const saved={position:[.02,.03,.04],quaternion:[0,0,0,1],deformation:{model:'local-flow',local:[.004,-.002,.006],displacement:[.002,0,.012]}};
  const a=new TissueVolume(),b=new TissueVolume();try{
    const actual=a.fragments.add(d,saved);delete d.display;const expected=b.fragments.add(d,saved);
    assert.deepEqual(actual.mesh.geometry.attributes.position.array,expected.mesh.geometry.attributes.position.array);
    assert.deepEqual(actual.support,expected.support);assert.deepEqual(actual.position,expected.position);
  }finally{a.dispose();b.dispose();}
});
