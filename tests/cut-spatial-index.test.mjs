import test from 'node:test';
import assert from 'node:assert/strict';
import {CutSpatialIndex} from '../src/cut-spatial-index.js';
import {cutBounds,distanceToCut} from '../src/tissue-worker.js';

test('spatial cutter queries equal complete linear CSG at every incremental block boundary',()=>{
  const index=new CutSpatialIndex(),entries=[];
  for(let i=0;i<513;i++){
    const x=(i%32)*.003-.048,y=Math.floor(i/32)*.003-.024;
    const cut={a:[x,y,0],b:[x+.001,y+.002,.001],radius:.0015+(i%3)*.0004};
    if(i%4===0)cut.segments=[{a:cut.a,b:cut.b},{a:cut.b,b:[x+.002,y+.003,.002]}];
    const entry={cut,...cutBounds(cut,cut.radius)};entries.push(entry);index.add(entry);
    if(i%31!==0&&i!==512)continue;
    for(let j=0;j<90;j++){
      const p=[Math.sin(j*.71)*.065,Math.cos(j*.43)*.04,Math.sin(j*.37)*.02],initial=(j%7-4)*.003;
      const expected=entries.reduce((d,e)=>Math.max(d,e.cut.radius-distanceToCut(p,e.cut)),initial);
      assert.equal(index.evaluate(p,initial),expected,`cut ${i}, query ${j}`);
    }
  }
  const stats={skippedCutters:0,evaluatedCutters:0};index.evaluate([.5,.5,.5],0,stats);
  assert.equal(stats.skippedCutters,513);assert.equal(stats.evaluatedCutters,0);
});
