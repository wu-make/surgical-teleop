import test from 'node:test';
import assert from 'node:assert/strict';
import {Simulation} from '../src/simulation.js';
import {instrumentCapsules,resolveInstrumentAlignment} from '../src/instrument-pose.js';
import {instrumentBodyMotionBounds} from '../src/instrument-contact.js';

test('per-capsule motion bounds cover the sampled full source CAD while avoiding the long-shaft bound at the distal wrist',()=>{
 const sim=new Simulation(),base=sim.state.tools.right;let seed=17;const random=()=>((seed=(1664525*seed+1013904223)>>>0)/2**32);
 for(let j=0;j<60;j++){
  const a={...base,position:base.position.map(v=>v+(random()-.5)*.08),wrist:[(random()-.5)*2.4,(random()-.5)*2.4,(random()-.5)*5],jaw:random()};a.alignment=resolveInstrumentAlignment(a,base.alignment);
  const b={...a,position:a.position.map(v=>v+(random()-.5)*.002),wrist:a.wrist.map(v=>v+(random()-.5)*.04),jaw:random()};b.alignment=resolveInstrumentAlignment(b,a.alignment);
  const first=instrumentCapsules({...a,jaw:0}),bounds=instrumentBodyMotionBounds(a,b);
  for(let k=1;k<=16;k++){
   const t=k/16,m={...a,position:a.position.map((v,i)=>v+(b.position[i]-v)*t),wrist:a.wrist.map((v,i)=>v+(b.wrist[i]-v)*t),jaw:0};m.alignment=resolveInstrumentAlignment(m,a.alignment);
   const current=instrumentCapsules(m);
   first.forEach((c,i)=>{if(c.part==='jaw')return;for(const key of ['a','b'])assert(Math.hypot(...c[key].map((v,n)=>v-current[i][key][n]))<=bounds[i]+1e-10,'source endpoint escaped its conservative motion bound');});
  }
 }
});
