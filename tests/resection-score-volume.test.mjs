import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createVolumeState,initializeConnectivity,applyCapsuleCut,resetVolume,separateDisconnectedComponents} from '../src/tissue-worker.js';
import {lesionNodes,lesionStatistics} from '../src/lesion-volume.js';
import {resectionScore,targetShareLabel} from '../src/resection-score.js';
import {surgicalCase} from '../src/surgical-cases.js';

for(const id of ['lesion-liver','uterus-adnexa'])test(id+': actual near-complete volume cuts retain a nonzero target and cannot earn full score',()=>{
  const c=surgicalCase(id),meta=JSON.parse(fs.readFileSync(new URL('../public/assets/'+c.asset+'.json',import.meta.url))),bytes=fs.readFileSync(new URL('../public/assets/'+c.asset+'.bin',import.meta.url));meta.pathology=c.lesion;
  const state=createVolumeState(meta,new Float32Array(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength)));state.lesionNodes=lesionNodes(meta,state.base);initializeConnectivity(state);
  const distances=[...state.lesionNodes].map(i=>{const p=[i%meta.dims[0],Math.floor(i/meta.dims[0])%meta.dims[1],Math.floor(i/(meta.dims[0]*meta.dims[1]))];return Math.hypot(...p.map((n,a)=>meta.origin[a]+n*meta.spacing[a]-c.lesion.center[a]));}).sort((a,b)=>b-a);
  const farthest=distances[0],next=distances.find(d=>d<farthest-1e-12);assert(next>0);
  applyCapsuleCut(state,{a:c.lesion.center,b:c.lesion.center,radius:(farthest+next)*.5});
  assert.equal(separateDisconnectedComponents(state).fragments.length,0,'the residual must still belong to the mother');
  const residual=lesionStatistics(state),score=resectionScore(residual);
  assert(residual.attachedMm3>0&&residual.attachedMm3/residual.totalMm3<.002,'retain a small real negative target volume');
  assert.equal(score.complete,false);assert(score.percent<100&&score.points<100);assert.notEqual(targetShareLabel(residual.attachedMm3,residual.totalMm3),'0%');
  // Finish the same actual volume and then replay the partial cut and reset.
  const reset=()=>resetVolume(state);
  applyCapsuleCut(state,{a:c.lesion.center,b:c.lesion.center,radius:farthest+.000001});assert.equal(resectionScore(lesionStatistics(state)).points,100);
  reset();applyCapsuleCut(state,{a:c.lesion.center,b:c.lesion.center,radius:(farthest+next)*.5});assert.deepEqual(resectionScore(lesionStatistics(state)),score);
  reset();assert.equal(resectionScore(lesionStatistics(state)).percent,0);
});
