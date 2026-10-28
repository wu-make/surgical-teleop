import test from 'node:test';
import assert from 'node:assert/strict';
import {TissueVolume} from '../src/tissue.js';

function bench(){
  const tissue=new TissueVolume({bloodSpread:false}),blood=tissue.blood;
  blood._applySurfaceSelection([
    {key:'source',reference:[0,.01,0],restNormal:[0,1,0],area:6.25,sourceArea:6.25,cut:true,fragmentId:null,seed:.4},
    {key:'cut-neighbour',reference:[.0025,.01,0],restNormal:[0,1,0],area:6.25,sourceArea:0,cut:true,fragmentId:null,seed:.5},
    {key:'capsule',reference:[-.0025,.01,0],restNormal:[0,1,0],area:6.25,cut:false,fragmentId:null,seed:.6},
  ],true);
  blood.nodes[1].injured=false;
  return{tissue,blood,step:n=>{for(let i=0;i<n;i++)blood.update(1/60);}};
}

test('product local-wound mode keeps blood at its cut source for two simulated minutes, without capsule transport or pools',()=>{
  const {tissue,blood,step}=bench();try{
    step(7200);assert(blood.nodes[0].volume>0);assert.equal(blood.nodes[1].volume,0);assert(blood.nodes.every(n=>n.cut));
    assert.equal(blood.drops.length,0);assert.equal(blood.metrics.surfacePools,0);assert.equal(blood.metrics.spreading,false);
    assert(blood.nodes[0].volume<=blood.nodes[0].physicalArea*.12+1e-10);assert(Math.abs(blood.metrics.balanceErrorMm3)<1e-9);
  }finally{tissue.dispose();}
});

test('local-wound remeshing retains nearby liquid and accounts for removed material without spawning spreading drops',()=>{
  const {tissue,blood,step}=bench();try{
    step(120);const volume=blood.nodes[0].volume,emitted=blood.emitted;
    const replacement={...blood.nodes[0],key:'remeshed',reference:[.0005,.01,0]};delete replacement.volume;
    blood._applySurfaceSelection([replacement],false);assert.equal(blood.nodes[0].volume,volume);assert.equal(blood.emitted,emitted);assert.equal(blood.drops.length,0);
    blood._applySurfaceSelection([],false);assert.equal(blood.escaped,emitted);assert.equal(blood.drops.length,0);assert(Math.abs(blood.metrics.balanceErrorMm3)<1e-9);
  }finally{tissue.dispose();}
});

test('local pressure suppresses fresh inflow before saturation and confined blood restores without changing its mass',()=>{
  const a=bench(),b=bench();try{
    a.step(30);b.step(30);const p=b.blood.nodes[0].display.clone();
    for(let i=0;i<72;i++){a.blood.update(1/60);b.blood.update(1/60,{pressureSegments:[{a:p,b:p}]});}
    assert(b.blood.emitted<a.blood.emitted*.5);assert(b.blood.pressureContacts>0);assert(b.blood.nodes[0].clot>0);
    const saved=b.blood.snapshot();b.blood.reset();b.blood.restore(saved);assert.deepEqual(b.blood.snapshot(),saved);assert(Math.abs(b.blood.metrics.balanceErrorMm3)<1e-9);
    saved.drops.push({position:[0,.02,0],velocity:[0,0,0],volume:.2});saved.nodes.push({...saved.nodes[0],key:'old-capsule',cut:false,volume:.1});saved.emitted+=.3;
    b.blood.restore(saved);assert.equal(b.blood.drops.length,0);assert(b.blood.nodes.every(n=>n.cut));assert(Math.abs(b.blood.metrics.balanceErrorMm3)<1e-9,'old spreading sessions must remain accounted when loaded under the new confined policy');
  }finally{a.tissue.dispose();b.tissue.dispose();}
});

test('confined film uses the real cut mask in both shader paths so kernel support cannot stain an intact capsule',()=>{
  const {tissue,blood}=bench();try{
    for(const film of [blood.surfaceFilm,blood.pooledFilm]){
      assert.equal(film.woundOnly,true);const shader={uniforms:{},vertexShader:'#include <begin_vertex>',fragmentShader:'#include <color_fragment>'};film.mesh.material.onBeforeCompile(shader);
      assert(shader.vertexShader.includes('vFilmCutMask=filmCutMask'));assert(shader.fragmentShader.includes('if(vFilmCutMask<.55)discard'));
    }
  }finally{tissue.dispose();}
});
