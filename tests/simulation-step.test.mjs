import test from 'node:test';
import assert from 'node:assert/strict';
import {Simulation} from '../src/simulation.js';
import {advanceSimulationStep} from '../src/simulation-step.js';
test('a paused step executes ordered live controls and asynchronous geometry, then remains paused',async()=>{
  const sim=new Simulation();sim.setPaused(true);const order=[],tissue={ready:true,busy:false},interaction={cuttingBusy:false,async update(dt,flags){assert.equal(sim.state.paused,false);assert.equal(dt,.05);assert.equal(flags.compressing,true);order.push('interaction');}};
  const initial=sim.state.elapsed;
  const result=await advanceSimulationStep({sim,tissue,interaction,demo:{update(){order.push('demo');}},keys:new Set(['KeyH']),beforeControl:()=>order.push('context'),afterControl:()=>order.push('CAD'),afterInteraction:()=>order.push('render')});
  assert.equal(result,true);assert.deepEqual(order,['context','demo','CAD','interaction','render']);assert.equal(sim.state.paused,true);assert(Math.abs(sim.state.elapsed-initial-.05)<1e-12);
});
test('busy or running states reject a step and failures still restore pause',async()=>{
  const sim=new Simulation(),tissue={ready:true,busy:false},interaction={cuttingBusy:false,update(){throw new Error('worker failed');}};
  assert.equal(await advanceSimulationStep({sim,tissue,interaction}),false);sim.setPaused(true);tissue.busy=true;assert.equal(await advanceSimulationStep({sim,tissue,interaction}),false);tissue.busy=false;
  await assert.rejects(advanceSimulationStep({sim,tissue,interaction}),/worker failed/);assert.equal(sim.state.paused,true);
});
