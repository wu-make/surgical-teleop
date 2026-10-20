import test from 'node:test';
import assert from 'node:assert/strict';
import {PausedPresentation} from '../src/paused-presentation.js';

test('a paused frame is reused until camera, geometry, history or layout changes; live frames are never skipped',()=>{
  const gate=new PausedPresentation(),state={camera:0,geometry:0,history:0,layout:0},key=()=>JSON.stringify(state);
  assert(gate.needsFrame(true,key));for(let i=0;i<3600;i++)assert.equal(gate.needsFrame(true,key),false);
  for(const field of Object.keys(state)){state[field]++;assert(gate.needsFrame(true,key));assert.equal(gate.needsFrame(true,key),false);}
  for(let i=0;i<1000;i++)assert(gate.needsFrame(false,()=>{throw new Error('live frames must not serialize paused state');}));
  assert(gate.needsFrame(true,key));assert.equal(gate.needsFrame(true,key),false);assert.equal(gate.stats.pausedDraws,6);
});
