import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { createTissueMaterial } from '../src/tissue-material.js';

function compiledHooks() {
  const material=createTissueMaterial();
  const shader={vertexShader:THREE.ShaderLib.physical.vertexShader,
    fragmentShader:THREE.ShaderLib.physical.fragmentShader,uniforms:{}};
  material.onBeforeCompile(shader);
  return {material,shader};
}

test('one opaque double-sided material supports the organ and rotated cut specimens',()=>{
  const {material,shader}=compiledHooks();
  assert.equal(material.side,THREE.DoubleSide);
  assert.equal(material.transparent,false);
  assert.equal(material.depthWrite,true);
  assert.equal(material.vertexColors,true);
  assert.equal(material.metalness,0);
  assert.match(shader.vertexShader,/vTissuePosition\s*=\s*tissueRestPosition/);
  assert.match(shader.vertexShader,/vTissueCut\s*=\s*tissueCutMask/);
  assert.equal(shader.uniforms.uCaseKind.value,0);
  assert.equal(shader.uniforms.uCutGuide.value,0);
  assert(!Object.keys(shader.uniforms).some(key=>/time|frame/i.test(key)),'material detail must not need time/frame-dependent updates');
  material.dispose();
});

test('physical shader hooks remain in valid stage order after the installed Three template expands',()=>{
  const {material,shader}=compiledHooks(),source=shader.fragmentShader;
  const colour=source.indexOf('float tissueCut='),roughness=source.indexOf('roughnessFactor=clamp'),normal=source.indexOf('float tissueHeight='),physical=source.indexOf('material.clearcoat=mix');
  assert.ok(colour>=0&&roughness>colour&&normal>roughness&&physical>normal);
  for(const name of ['color_fragment','roughnessmap_fragment','normal_fragment_maps','lights_physical_fragment']){
    assert.equal(source.split(`#include <${name}>`).length-1,1,`${name} must remain included exactly once`);
  }
  assert.match(source,/if\(dot\(tissuePerturbed,tissuePerturbed\)>1e-20\)/,'grazing cut faces need a finite normal fallback');
  assert.match(source,/tissueDet\*=faceDirection/,'back faces need face-corrected micro-relief');
  material.dispose();
});

test('submillimetre display detail is filtered and has no periodic fake vessel or texture dependency',()=>{
  const {material,shader}=compiledHooks(),source=shader.fragmentShader;
  assert.match(source,/tissueMicroVisibility=1\.0-smoothstep/);
  assert.match(source,/fwidth\(tissueDistance\)/);
  assert.match(source,/tissueLumen/);
  assert.match(source,/tissueSepta/);
  assert.doesNotMatch(source,/tissueVeins|sin\(/);
  assert.equal(material.map,null);
  assert.equal(material.bumpMap,null);
  assert.equal(material.normalMap,null);
  assert.notEqual(material.customProgramCacheKey(),'anatomical-tissue-capsule-v2');
  material.dispose();
});
