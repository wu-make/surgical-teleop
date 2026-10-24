import test from 'node:test';
import assert from 'node:assert/strict';
import {createVolumeState,allChunkKeys,applyCapsuleCut,polygonizeChunk} from '../src/tissue-worker.js';
import {CUT_RADIUS} from '../src/interaction-controller.js';

function organ(){
  const n=25,spacing=.0015,origin=-.018,field=new Float32Array(n**3);
  for(let z=0;z<n;z++)for(let y=0;y<n;y++)for(let x=0;x<n;x++)field[x+n*(y+n*z)]=Math.hypot(origin+x*spacing,origin+y*spacing,origin+z*spacing)-.013;
  return createVolumeState({dims:[n,n,n],spacing:[spacing,spacing,spacing],origin:[origin,origin,origin]},field,8);
}
test('CAD-width incision removes a matching solid kerf, exposes internal walls and stays closed across all chunk seams',()=>{
  const state=organ();assert.equal(CUT_RADIUS,.00165);
  applyCapsuleCut(state,{a:[0,0,-.02],b:[0,0,.02],radius:CUT_RADIUS});
  const edges=new Map();let interior=0,fineEdges=0;
  for(const key of allChunkKeys(state)){
    const m=polygonizeChunk(state,key),point=id=>Array.from(m.positions.subarray(id*3,id*3+3));
    for(let i=0;i<m.indices.length;i+=3){
      const ids=Array.from(m.indices.subarray(i,i+3));
      for(let j=0;j<3;j++){
        const a=point(ids[j]),b=point(ids[(j+1)%3]);
        const edge=[a.map(v=>Math.round(v*1e7)).join(','),b.map(v=>Math.round(v*1e7)).join(',')].sort().join('|');edges.set(edge,(edges.get(edge)??0)+1);
        if(m.cutMasks[ids[j]]>.9&&m.cutMasks[ids[(j+1)%3]]>.9&&Math.hypot(...a.map((v,k)=>v-b[k]))<.0008)fineEdges++;
      }
    }
    for(let i=0;i<m.positions.length;i+=3){
      const [x,y,z]=m.positions.subarray(i,i+3),radius=Math.hypot(x,y);
      assert(m.normals.subarray(i,i+3).every(Number.isFinite));
      assert(Math.abs(Math.hypot(...m.normals.subarray(i,i+3))-1)<1e-5,'cut normals must not collapse into black/undefined shading');
      if(Math.abs(z)<.008&&m.cutMasks[i/3]>.9){interior++;assert(radius>.0006&&radius<.0026,'cavity width stays near the physical scissors rather than becoming a large TCP crater');}
    }
  }
  assert(interior>100);assert(fineEdges>200);assert([...edges.values()].every(count=>count===2),'no crack or T junction at refined chunk borders');
});
