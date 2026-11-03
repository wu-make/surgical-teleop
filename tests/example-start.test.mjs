import test from 'node:test';
import assert from 'node:assert/strict';
import {startFreshExample} from '../src/example-start.js';

test('a demonstration restores edited tissue and robot state before planning, including a pending cut',async()=>{
  const state={cuts:[1,2],fragments:[3],blood:5,score:60,arms:'moved',pending:true},calls=[];let finish;
  const demo={active:false,startExampleAsync:async()=>{calls.push('plan');assert.deepEqual(state,{cuts:[],fragments:[],blood:0,score:0,arms:'initial',pending:false});return true;}};
  const task=startFreshExample(demo,()=>{calls.push('reset');return new Promise(resolve=>{finish=()=>{Object.assign(state,{cuts:[],fragments:[],blood:0,score:0,arms:'initial',pending:false});resolve(true);};});});
  await Promise.resolve();assert.deepEqual(calls,['reset'],'planning must wait for the real restore response');finish();assert.equal(await task,true);assert.deepEqual(calls,['reset','plan']);
});

test('clicking an active demonstration cancels it without resetting the current surgery',async()=>{
  let resets=0,cancels=0;const demo={active:true,startExampleAsync:async()=>{cancels++;demo.active=false;return false;}};
  assert.equal(await startFreshExample(demo,async()=>{resets++;return true;}),false);assert.equal(resets,0);assert.equal(cancels,1);
});

test('failed restoration never starts a demonstration on partial or stale tissue',async()=>{
  let plans=0;const demo={active:false,startExampleAsync:async()=>{plans++;return true;}};
  assert.equal(await startFreshExample(demo,async()=>false),false);assert.equal(plans,0);
  await assert.rejects(startFreshExample(demo,async()=>{throw new Error('restore failed');}),/restore failed/);assert.equal(plans,0);
});
