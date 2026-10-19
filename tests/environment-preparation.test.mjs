import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {prepareEnvironment} from '../src/environment-preparation.js';

function renderer(){
  const calls=[];return {calls,target:null,xr:{enabled:true},autoClear:true,toneMapping:THREE.ACESFilmicToneMapping,state:{buffers:{depth:{getReversed:()=>false}}},
    getRenderTarget(){return this.target;},getActiveCubeFace:()=>0,getActiveMipmapLevel:()=>0,setRenderTarget(t){this.target=t;},getClearColor(c){c.set('#a4b3b3');},compile(){},async compileAsync(){},
    render(mesh,camera){const u=mesh.material?.uniforms;calls.push(u?.weights?{kind:'blur',viewport:this.target.viewport.toArray(),mip:u.mipInt.value,samples:u.samples.value,weights:u.weights.value.slice(),latitudinal:u.latitudinal.value,pole:u.poleAxis.value.toArray(),dTheta:u.dTheta.value}:{kind:mesh.isScene?'room':'background',viewport:this.target.viewport.toArray(),direction:camera.getWorldDirection(new THREE.Vector3()).toArray(),up:camera.up.toArray(),autoClear:this.autoClear,tone:this.toneMapping});}};
}
test('incremental PMREM preserves every r180 cube face, blur sample, direction, viewport and HDR resolution',async()=>{
  const old=renderer(),pmrem=new THREE.PMREMGenerator(old),room=new RoomEnvironment(),reference=pmrem.fromScene(room,.04);
  const current=renderer(),stages=[];let yields=0;const result=await prepareEnvironment(current,{yieldFrame:async()=>yields++,onStage:s=>stages.push(s)});
  assert.equal(result.width,reference.width);assert.equal(result.height,reference.height);assert.equal(result.texture.type,reference.texture.type);assert.equal(result.texture.mapping,reference.texture.mapping);
  assert.deepEqual(current.calls,old.calls);assert.equal(current.calls.length,34);assert(yields>=15);assert.equal(stages.length,yields);assert.equal(current.xr.enabled,true);assert.equal(current.target,null);assert.equal(current.autoClear,true);assert.equal(current.toneMapping,THREE.ACESFilmicToneMapping);
  result.dispose();reference.dispose();pmrem.dispose();room.dispose();
});
test('failed asynchronous environment preparation restores all renderer state',async()=>{
  const r=renderer(),target={previous:true};r.target=target;r.compileAsync=async()=>{throw new Error('driver compile failed');};
  await assert.rejects(prepareEnvironment(r,{yieldFrame:async()=>{}}),/driver compile failed/);assert.equal(r.target,target);assert.equal(r.xr.enabled,true);assert.equal(r.autoClear,true);assert.equal(r.toneMapping,THREE.ACESFilmicToneMapping);
});
