import test from 'node:test';
import assert from 'node:assert/strict';
import {createVolumeState,allChunkKeys,buildChunks,polygonizeChunk,applyCapsuleCut,normalizeDeformation,deformPoint} from '../src/tissue-worker.js';

function organ(){
  const n=25,spacing=.0015,origin=-.018,field=new Float32Array(n**3);
  for(let z=0;z<n;z++)for(let y=0;y<n;y++)for(let x=0;x<n;x++)field[x+n*(y+n*z)]=Math.hypot(origin+x*spacing,origin+y*spacing,origin+z*spacing)-.013;
  return createVolumeState({dims:[n,n,n],spacing:[spacing,spacing,spacing],origin:[origin,origin,origin]},field,8);
}

function assertClosed(meshes,deformation){
  const edges=new Map();
  for(const m of meshes){
    const points=Array.from({length:m.positions.length/3},(_,id)=>{
      const p=Array.from(m.positions.subarray(id*3,id*3+3));
      return (deformation?deformPoint(p,deformation):p).map(v=>Math.round(v*1e8)).join(',');
    });
    for(let i=0;i<m.indices.length;i+=3)for(let k=0;k<3;k++){
      const a=points[m.indices[i+k]],b=points[m.indices[i+(k+1)%3]];if(a===b)continue;
      const key=[a,b].sort().join('|'),edge=edges.get(key)??{count:0,orientation:0};
      edge.count++;edge.orientation+=a<b?1:-1;edges.set(key,edge);
    }
  }
  const invalid=[...edges.values()].filter(e=>e.count!==2||e.orientation!==0);
  assert.equal(invalid.length,0,'incrementally replaced chunks must remain closed and consistently oriented, including displayed traction seams');
}

test('incremental raised cuts update both sides of every refinement seam through motion, repeated closure and release',()=>{
  const state=organ(),keys=allChunkKeys(state),live=new Map(buildChunks(state,keys).map(m=>[m.key,m]));
  const d=normalizeDeformation({model:'local-flow',local:[0,0,.012],displacement:[0,0,.027],radius:.018,coreRadius:.0025});
  const poses=[
    {a:[-.004,0,.026],b:[.004,0,.026],radius:.00165,deformation:d},
    {a:[-.003,.001,.024],b:[.005,.001,.024],radius:.00165,deformation:{...d,displacement:[.002,0,.025]}},
    {a:[-.004,0,.012],b:[.004,0,.012],radius:.00165},
  ];
  for(let i=0;i<poses.length;i++){
    const result=applyCapsuleCut(state,poses[i]),chunks=buildChunks(state,result.dirty);
    if(i===0)assert(chunks.some(m=>!result.dirty.has(m.key)),'traction refinement must also invalidate untouched neighbours');
    for(const m of chunks)live.set(m.key,m);
    assertClosed(live.values(),state.cuts.at(-1)?.deformation);
    for(const key of keys){
      const actual=live.get(key),expected=polygonizeChunk(state,key);
      for(const attribute of ['positions','normals','colors','cutMasks','indices'])assert.deepEqual(actual[attribute],expected[attribute],`${i}: ${key} ${attribute} matches a coherent complete rebuild`);
    }
    assert.equal(buildChunks(state,keys).length,0,'unchanged surface does not cause replacement or GPU uploads');
    const repeated=applyCapsuleCut(state,poses[i]);assert.equal(repeated.changedSamples,0);
    assert.equal(buildChunks(state,repeated.dirty).length,0,'holding the same closed scissors never replaces identical geometry');
  }
});

test('a changed traction pose with identical scalar inputs and split decisions retains every live chunk buffer',()=>{
  const state=organ(),keys=allChunkKeys(state),d=normalizeDeformation({model:'local-flow',local:[0,0,.012],displacement:[0,0,.027]});
  applyCapsuleCut(state,{a:[-.004,0,.026],b:[.004,0,.026],radius:.00165,deformation:d});
  const live=new Map(buildChunks(state,keys).map(m=>[m.key,m]));
  state.meshingDeformation=normalizeDeformation({...d,displacement:[1e-12,0,.027]});
  assert.equal(buildChunks(state,[]).length,0,'changed pose alone must not dispose identical wound, film or contact geometry');
  for(const key of keys){const expected=polygonizeChunk(state,key);for(const attribute of ['positions','normals','colors','cutMasks','indices'])assert.deepEqual(live.get(key)[attribute],expected[attribute]);}
});
