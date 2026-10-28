import test from 'node:test';
import assert from 'node:assert/strict';
import {Simulation} from '../src/simulation.js';
import {armManualCut,cuttingRequested} from '../src/manual-cutting.js';

test('armed scissors require a current right-hand C request; left closure, navigation and pressure never request a cut',()=>{
  const sim=new Simulation();sim.select('right');sim.setCutting(true);
  assert.equal(cuttingRequested(sim,new Set()),false);
  assert.equal(cuttingRequested(sim,new Set(['KeyD'])),false);
  assert.equal(cuttingRequested(sim,new Set(['KeyC','KeyD'])),true);
  assert.equal(cuttingRequested(sim,new Set(['KeyC','KeyH'])),false);
  assert.equal(cuttingRequested(sim,new Set(['KeyC','Space'])),false);
  sim.select('left');assert.equal(cuttingRequested(sim,new Set(['KeyC'])),false);
  assert.equal(cuttingRequested(sim,new Set(),{active:true,mode:'example'}),true);
  assert.equal(cuttingRequested(sim,new Set(),{active:false,mode:'example'}),false);
});

test('right closure resumes manual cutting directly, with no action needed from B',()=>{
  const sim=new Simulation();sim.select('right');let breaks=0;const interaction={lastCut:{old:true},breakCutTrajectory(){breaks++;}};
  assert.equal(armManualCut(sim,interaction,'KeyC'),true);assert.equal(sim.state.cutting,true);assert.equal(interaction.lastCut,null);assert.equal(breaks,1);
  assert.equal(armManualCut(sim,interaction,'KeyC'),false);assert.equal(breaks,1);
});

test('closure never arms cutting while pressing, paused, using the left jaw or another key',()=>{
  const sim=new Simulation(),interaction={breakCutTrajectory(){throw new Error('must not cut');}};
  sim.select('right');assert.equal(armManualCut(sim,interaction,'KeyC',{pressureHeld:true}),false);
  sim.setPaused(true);assert.equal(armManualCut(sim,interaction,'KeyC'),false);sim.setPaused(false);
  sim.select('left');assert.equal(armManualCut(sim,interaction,'KeyC'),false);sim.select('right');assert.equal(armManualCut(sim,interaction,'KeyV'),false);assert.equal(sim.state.cutting,false);
});
