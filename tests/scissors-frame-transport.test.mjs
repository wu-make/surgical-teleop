import test from'node:test';import assert from'node:assert/strict';import{Simulation}from'../src/simulation.js';import{instrumentCapsules,resolveInstrumentAlignment,quaternionProduct}from'../src/instrument-pose.js';import{scissorsAnchor,scissorsPoseCommand}from'../src/scissors-kinematics.js';
test('different RCM transport paths retain the same physical source CAD pose through roll compensation',()=>{
 const sim=new Simulation(),original=sim.state.tools.right,reference=[...original.alignment];
 for(let i=0;i<100;i++){
  const goal={...original,position:[.035+.025*Math.sin(i*2.1),1.10+.025*Math.sin(i*.6),-.02+.025*Math.cos(i*.8)],wrist:[1.25*Math.sin(i*.3),1.25*Math.cos(i*.4),i*.43],jaw:(i%11)/10};goal.alignment=resolveInstrumentAlignment(goal,reference);
  const target=scissorsAnchor(goal),twist=Math.sin(i*.7)*2.5,start={...original,position:[.06,1.13,.015],wrist:[.3,-.2,i*.43-.1],jaw:goal.jaw};const radial=resolveInstrumentAlignment(start,reference);start.alignment=quaternionProduct(radial,[0,0,Math.sin(twist/2),Math.cos(twist/2)]);
  const command=scissorsPoseCommand(start,target,goal.wrist,reference),actual={...start,position:command.position,wrist:command.wrist,alignment:command.alignment};
  const expected={...goal,position:command.position};expected.alignment=resolveInstrumentAlignment(expected,reference);
  const a=instrumentCapsules(actual),b=instrumentCapsules(expected);for(let j=0;j<a.length;j++)for(const endpoint of ['a','b'])assert(Math.hypot(...a[j][endpoint].map((v,k)=>v-b[j][endpoint][k]))<1e-10,'wrist and shaft must retain the planned world pose');
  assert(Math.hypot(...scissorsAnchor(actual).map((v,k)=>v-target[k]))<.00015);assert(Math.abs(command.wrist[2]-start.wrist[2])<=Math.PI+1e-10);
 }
});
