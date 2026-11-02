import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {Simulation} from '../src/simulation.js';
import {TissueVolume} from '../src/tissue.js';
import {InteractionController} from '../src/interaction-controller.js';
import {deformPoint,inverseDeformPoint,LOCAL_TRACTION} from '../src/tissue-worker.js';

for(const radius of [.03,.05])test('target-sized '+radius+' m traction remains local, invertible and preserved on release; manual pinch retains its original size',()=>{
  const sim=new Simulation(),tissue=new TissueVolume(),controller=new InteractionController(sim,tissue);
  try{
    const point=tissue.group.worldToLocal(new THREE.Vector3(...sim.state.tools.left.position));
    controller.grasp={kind:'tissue',local:point.clone().sub(new THREE.Vector3(.012,.016,0)).toArray(),displacement:[0,0,0],deformationModel:'local-flow'};
    controller.applyGrasp();assert.equal(tissue._deformation.radius,LOCAL_TRACTION.radius);
    Object.assign(controller.grasp,{deformationRadius:radius,deformationCoreRadius:radius/4});controller.applyGrasp();
    const d=tissue._deformation;assert.equal(d.radius,radius);assert.equal(d.coreRadius,radius/4);
    for(const offset of [[0,0,0],[.02,.005,-.008],[-.025,.005,.01],[.12,0,0]]){
      const p=d.local.map((v,i)=>v+offset[i]),shown=deformPoint(p,d),restored=inverseDeformPoint(shown,d);
      assert(Math.hypot(...p.map((v,i)=>v-restored[i]))<1e-8);
      if(offset[0]===.12)assert.deepEqual(shown,p,'distant organ stays stationary');
    }
    const saved=controller.snapshot();assert.equal(saved.tissue.deformation.radius,radius);assert.equal(saved.grasp.deformationRadius,radius);
    controller.release();assert.equal(controller.grasp,null);assert.equal(controller.relaxing.deformationRadius,radius);assert.equal(controller.relaxing.deformationCoreRadius,radius/4);
  }finally{tissue.dispose();}
});
