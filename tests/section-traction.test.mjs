import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizeDeformation,deformPoint,inverseDeformPoint,deformationWeight} from '../src/tissue-worker.js';
import {tractionSectionInto} from '../src/section-traction.js';

const section={center:[.045,.012],radii:[.0168,.0204],plane:.0375,depth:.013,curvature:[.4,.6],front:.025,width:.0033,frontBlend:.006};
const model=delta=>normalizeDeformation({model:'local-flow',local:[.045,.012,.0713],displacement:delta,radius:.05,coreRadius:.032,section});

test('an actual kerf opens under flap traction while the cut bed remains still',()=>{
  const d=model([0,0,.04]),bed=[.045,.012,section.plane-.00165],flap=[.045,.012,section.plane+.00165];
  const lower=deformPoint(bed,d),upper=deformPoint(flap,d);
  assert(Math.hypot(...lower.map((v,i)=>v-bed[i]))<1e-10,'the bed below a completed cut remains stationary');
  assert(upper[2]-lower[2]>.010,'the existing 3.3 mm incision opens enough for the real 9 mm instrument body');
  assert(Math.hypot(...deformPoint(d.local,d).map((v,i)=>v-d.local[i]-d.displacement[i]))<1e-10,'the held material anchor follows the clamp');
});

test('the exact affine shortcut preserves the original incremental flow for the complete patch',()=>{
 for(const delta of [[0,0,.04],[.003,-.001,.04]]){
  const d=normalizeDeformation({...model(delta),coreRadius:.04}),scratch={gradient:[0,0,0]};
  for(let i=0;i<180;i++){
   const p=[.022+(i%15)*.003,-.012+(Math.floor(i/15)%12)*.004,.025+(i%17)*.003];let weight=0;
   for(let step=0;step<d.steps;step++){
    const t=step*d.stepFraction,fraction=Math.min(d.stepFraction,1-t),shown=p.map((v,a)=>v+delta[a]*weight),center=d.local.map((v,a)=>v+delta[a]*t),distance=Math.hypot(...shown.map((v,a)=>v-center[a])),r=Math.max(0,Math.min(1,(distance-d.coreRadius)/(d.radius-d.coreRadius))),u=1-r;
    weight+=u**4*(4*r+1)*tractionSectionInto(...shown,d.section,scratch).weight*fraction;
   }
   const expected=p.map((v,a)=>v+delta[a]*weight),actual=deformPoint(p,d);assert(Math.hypot(...expected.map((v,a)=>v-actual[a]))<1e-12,'the shortcut changes work, not geometry');
  }
 }
});

test('section-aware flow has a consistent inverse and positive Jacobian through the curved front and recoil',()=>{
  let seed=42;const rand=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
  for(const delta of [[0,0,.06],[0,0,.05],[0,0,.04],[-.002,.001,.025],[.003,-.001,.02],[0,0,.008]]){
    const d=model(delta);
    for(let i=0;i<300;i++){
      const p=[.015+rand()*.06,-.018+rand()*.06,.02+rand()*.065],display=deformPoint(p,d),restored=inverseDeformPoint(display,d),map=deformationWeight(p,d);
      assert(Math.hypot(...p.map((v,a)=>v-restored[a]))<2e-8,'rendering and cutting recover the same material point');
      assert(1+map.gradient.reduce((sum,g,a)=>sum+g*delta[a],0)>0,'the map must not fold the tissue');
      if(i<30)for(let a=0;a<3;a++){
        const lo=[...p],hi=[...p];lo[a]-=1e-7;hi[a]+=1e-7;
        const numeric=(deformationWeight(hi,d).weight-deformationWeight(lo,d).weight)/2e-7;
        assert(Math.abs(numeric-map.gradient[a])<.002,'cut-face normals use the derivative of the same deformation');
      }
    }
  }
});


test('the uncut row is never deformed by a cut-front mask before the scissors reach it',()=>{
 const current={...section,front:.012,width:.001,frontBlend:.0033},scratch={gradient:[0,0,0]};
 for(const y of [.012,.0125,.014,.020])for(const z of [.030,.0375,.045,.070]){
  const mask=tractionSectionInto(.045,y,z,current,scratch);assert.equal(mask.weight,1,'ahead-of-front material retains its original traction map');assert(mask.gradient.every(v=>v===0));
 }
 const d=normalizeDeformation({model:'local-flow',local:[.045,.012,.0713],displacement:[0,0,.0206],radius:.05,coreRadius:.04,section:{...current,front:.018}});
 const bed=[.045,.012,section.plane-.00165],flap=[.045,.012,section.plane+.00165];
 assert.deepEqual(deformPoint(bed,d),bed,'the already cut bed stays at the original section plane');
 assert(deformPoint(flap,d)[2]-deformPoint(bed,d)[2]>.018,'advancing the completed front opens the true kerf instead of pulling a carpet of bed tissue upward');
});
