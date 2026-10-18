import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizeDeformation,inverseDeformPoint,deformPoint} from '../src/tissue-worker.js';

// Original allocating Newton solve retained as an independent numerical oracle.
function reference(point,deformation){
  let result=[...point];const count=deformation.steps;
  for(let i=count-1;i>=0;i--){
    const start=i*deformation.stepFraction,fraction=Math.min(deformation.stepFraction,1-start);
    const step=deformation.displacement.map(v=>v*fraction),local=deformation.local.map((v,axis)=>v+deformation.displacement[axis]*start),target=[...result];
    for(let iteration=0;iteration<16;iteration++){
      const offset=result.map((v,axis)=>v-local[axis]),length=Math.hypot(...offset),core=deformation.coreRadius,falloff=deformation.radius-core;
      const r=Math.max(0,Math.min(1,(length-core)/falloff)),t=1-r,w=t**4*(4*r+1);
      const derivative=length>core&&r<1?-20*r*t**3/(falloff*length):0;
      const gradient=offset.map(v=>v*derivative),error=result.map((v,axis)=>v+step[axis]*w-target[axis]);
      if(Math.hypot(...error)<1e-11)break;
      const denominator=1+gradient.reduce((sum,v,axis)=>sum+v*step[axis],0);
      const projection=gradient.reduce((sum,v,axis)=>sum+v*error[axis],0)/denominator;
      result=result.map((v,axis)=>v-error[axis]+step[axis]*projection);
    }
  }
  return result;
}
test('allocation-free traction inverse retains every Newton step and exact numeric output through recoil',()=>{
  let seed=65537;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/2**32;};
  for(let i=0;i<160;i++){
    const local=Array.from({length:3},()=>random()*.2-.1);
    const displacement=Array.from({length:3},()=>random()*.04-.02);
    const d=normalizeDeformation({model:'local-flow',local,displacement:displacement.map(v=>v*(i%10===0?1e-7:1)),radius:.012+random()*.018});
    for(let j=0;j<32;j++){
      const point=j===0?local:local.map(v=>v+(random()-.5)*.06),display=deformPoint(point,d);
      assert.deepEqual(inverseDeformPoint(display,d),reference(display,d));
      assert.deepEqual(inverseDeformPoint(point,d),reference(point,d));
    }
  }
});
