import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {deformationWeight,deformationWeightInto} from '../src/tissue-worker.js';

test('dense reusable traction output remains bit-identical to published material maps, including reset and signed zero',()=>{
  const reference=JSON.parse(fs.readFileSync(new URL('./fixtures/traction-golden.json',import.meta.url)));
  const actual=new Float64Array(reference.deformations.length*reference.points.length*4),reused=new Float64Array(actual.length),out={weight:99,gradient:[99,99,99]};let k=0;
  for(const deformation of reference.deformations)for(const point of reference.points){
    const independent=deformationWeight(point,deformation);actual.set([independent.weight,...independent.gradient],k);
    assert.equal(deformationWeightInto(point,deformation,out),out);reused.set([out.weight,...out.gradient],k);k+=4;
  }
  const expected=Buffer.from(reference.expectedBase64,'base64');
  assert.deepEqual(Buffer.from(actual.buffer),expected,'public mapping must preserve the published Float64 outputs');
  assert.deepEqual(Buffer.from(reused.buffer),expected,'scratch reuse must not retain a previous vertex gradient');
});
