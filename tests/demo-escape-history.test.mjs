import test from'node:test';import assert from'node:assert/strict';import{Group,Vector3}from'three';
import{Simulation}from'../src/simulation.js';import{GuidedDemo}from'../src/guided-demo.js';import{runImmediately}from'../src/cooperative-work.js';import{instrumentCapsules,resolveInstrumentAlignment}from'../src/instrument-pose.js';import{scissorsAnchor,scissorsBodyClearance}from'../src/scissors-kinematics.js';
test('a dense recorded escape can be shortened only by fully swept source-CAD moves',()=>{
 const sim=new Simulation(),builder=new Simulation();builder.restore(sim.snapshot());builder.setPaused(false);builder.setCutting(false);const journal=[],origin=[...builder.state.tools.right.position];
 for(let i=1;i<=1800;i++){const p=origin.map((v,a)=>v+(a===0?.003*i/1800:0));assert(!builder.moveToolTo(p,'right').limited);journal.push(structuredClone(builder.state.tools.right));}
 const demo=new GuidedDemo(sim,{group:new Group(),sampleDistance:()=>Infinity},{}),probe=new Simulation();probe.restore(sim.snapshot());probe.setPaused(false);probe.setCutting(false);const prefix=[],before=sim.snapshot();
 assert.equal(typeof demo._replayEscapeJournalSteps,'function','validate short escape segments before replaying the entire dense journal');
 assert(runImmediately(demo._replayEscapeJournalSteps(probe,journal,prefix,{shortcut:true})));
 assert(prefix.length<100,'do not revisit thousands of near-identical controller samples when complete larger sweeps are clear');
 assert.deepEqual(sim.snapshot(),before);assert(new Vector3(...scissorsAnchor(probe.state.tools.right)).distanceTo(new Vector3(...scissorsAnchor(builder.state.tools.right)))<1e-9);
});
test('an escape shortcut cannot cross a thin intervening tissue edge with clear endpoints',()=>{
 const sim=new Simulation(),tool=sim.state.tools.right;let fixture;
 outer:for(let axis=0;axis<3;axis++)for(const sign of[-1,1]){
  const end={...tool,position:tool.position.map((v,i)=>v+(i===axis?sign*.0006:0))},mid={...tool,position:tool.position.map((v,i)=>(v+end.position[i])*.5)};end.alignment=resolveInstrumentAlignment(end,tool.alignment);mid.alignment=resolveInstrumentAlignment(mid,tool.alignment);
  for(const cap of instrumentCapsules(mid).filter(c=>c.part==='wrist')){const centre=new Vector3(...cap.a).lerp(new Vector3(...cap.b),.5),distance=p=>new Vector3(...p).distanceTo(centre)-.00004;if(scissorsBodyClearance(tool,scissorsAnchor(tool),distance).minimum>.00005&&scissorsBodyClearance(end,scissorsAnchor(end),distance).minimum>.00005){fixture={end,centre};break outer;}}
 }
 assert(fixture);const demo=new GuidedDemo(sim,{group:new Group(),sampleDistance:p=>p.distanceTo(fixture.centre)-.00004},{}),probe=new Simulation();probe.restore(sim.snapshot());probe.setPaused(false);probe.setCutting(false);const prefix=[],before=probe.snapshot();
 assert.equal(typeof demo._replayEscapeJournalSteps,'function');assert.equal(runImmediately(demo._replayEscapeJournalSteps(probe,[fixture.end],prefix,{shortcut:true})),false);assert.deepEqual(probe.snapshot(),before);assert.equal(prefix.length,0);
});

test('an escape checkpoint continues into clear axial working space before a large wrist turn',()=>{
 const sim=new Simulation(),demo=new GuidedDemo(sim,{group:new Group(),sampleDistance:()=>Infinity},{}),probe=new Simulation();probe.restore(sim.snapshot());probe.setPaused(false);probe.setCutting(false);
 const original=structuredClone(probe.state.tools.right),prefix=[];
 assert(runImmediately(demo._replayEscapeJournalSteps(probe,[original],prefix,{shortcut:true,stopInAir:true})));
 const port=new Vector3(...original.port),before=new Vector3(...original.position).distanceTo(port),after=new Vector3(...probe.state.tools.right.position).distanceTo(port);
 assert(Math.abs(before-after-.025)<1e-8,'a barely clear rest cannot be used as the workspace for a large turn');
 assert.deepEqual(probe.state.tools.right.wrist,original.wrist);assert.equal(probe.state.cutting,false);
});
