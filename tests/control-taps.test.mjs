import test from 'node:test';
import assert from 'node:assert/strict';
import {ControlTaps} from '../src/control-taps.js';
import {Simulation} from '../src/simulation.js';

test('an entire short key press between frames reaches the actual tool controller exactly once',()=>{
  const input=new ControlTaps(),sim=new Simulation();sim.select('left');const before=sim.state.tools.left.position.slice();
  input.begin('KeyE',10);input.end('KeyE',10);const keys=input.take();sim.update(1/60,keys);
  assert(sim.state.tools.left.position[1]>before[1]);assert.equal(input.take().size,0);
});
test('held keys are not replayed on release; repeats cannot overwrite their original frame',()=>{
  const input=new ControlTaps();input.begin('KeyC',2);input.begin('KeyC',8);input.end('KeyC',8);assert.equal(input.take().size,0);
});
test('blur, reset and selection cancellation discard queued taps and late keyup cannot revive them',()=>{
  const input=new ControlTaps();input.begin('KeyE',1);input.end('KeyE',1);input.begin('KeyC',1);input.clear();input.end('KeyC',1);
  assert.equal(input.take().size,0);input.end('KeyW',1);assert.equal(input.take().size,0);
});
