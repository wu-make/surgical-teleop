import test from 'node:test';
import assert from 'node:assert/strict';
import {createVolumeState,allChunkKeys,applyCapsuleCut,polygonizeChunk,normalizeDeformation,deformPoint,prepareChunkDisplay,createDeformationSampler,deformationWeight,buildChunks,nodeIndex} from '../src/tissue-worker.js';
import {refineIncisionSurface} from '../src/incision-surface.js';
import {TissueVolume} from '../src/tissue.js';
import {CUT_RADIUS} from '../src/interaction-controller.js';
import * as THREE from 'three';
import {buildSurfaceTree,surfaceTreeBounds} from '../src/surface-tree.js';
import {closestParentSurface,firstParentHit} from '../src/tissue-contact.js';

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

test('refinement retains the exact piecewise-affine crease instead of projecting faces through another field',()=>{
  const mesh={positions:new Float32Array([0,0,0,.004,0,0,0,.004,0,0,0,.004]),normals:new Float32Array([0,1,0,0,1,0,0,0,1,0,1,0]),colors:new Float32Array(12).fill(.2),cutMasks:new Float32Array(4).fill(1),indices:new Uint32Array([0,1,2,0,3,1])};
  const refined=refineIncisionSurface(mesh,{spacing:[.0015,.0015,.0015],sampleField:p=>p[2]+.001,sampleOriginal:()=>-.01,colour:()=>[.2,.2,.2],mask:()=>1});
  assert(refined.indices.length>mesh.indices.length);
  for(let i=0;i<refined.positions.length;i+=3){const p=refined.positions.subarray(i,i+3);assert(p.every(v=>v>=0&&v<=.004000001));assert(p[1]===0||p[2]===0,'every added vertex stays on the original cut/capsule faces');}
});

test('a 27 mm raised incision refines in displayed space without folds, missing seams or excessive straight-edge interpolation error',()=>{
  const state=organ(),deformation=normalizeDeformation({model:'local-flow',local:[0,0,.012],displacement:[0,0,.027],radius:.018,coreRadius:.0025});
  applyCapsuleCut(state,{a:[-.01,0,.026],b:[.01,0,.026],radius:CUT_RADIUS,deformation});
  const edges=new Map();let affected=0,maxError=0;
  for(const key of allChunkKeys(state)){
    const mesh=polygonizeChunk(state,key),point=id=>Array.from(mesh.positions.subarray(id*3,id*3+3));
    for(let i=0;i<mesh.indices.length;i+=3)for(let j=0;j<3;j++){
      const a=point(mesh.indices[i+j]),b=point(mesh.indices[i+(j+1)%3]),da=deformPoint(a,deformation),db=deformPoint(b,deformation);
      const ap=a.map(v=>Math.round(v*1e8)).join(','),bp=b.map(v=>Math.round(v*1e8)).join(',');if(ap===bp)continue;
      const edge=[ap,bp].sort().join('|'),record=edges.get(edge)??{count:0,orientation:0};record.count++;record.orientation+=ap<bp?1:-1;edges.set(edge,record);
      if(Math.hypot(...da.map((v,k)=>v-a[k]))+Math.hypot(...db.map((v,k)=>v-b[k]))>1e-6){
        affected++;const middle=deformPoint(a.map((v,k)=>(v+b[k])/2),deformation);maxError=Math.max(maxError,Math.hypot(...middle.map((v,k)=>v-(da[k]+db[k])/2)));
      }
    }
  }
  assert(affected>500);assert(maxError<.00012,`display-space curvature error ${maxError*1000} mm`);
  assert([...edges.values()].every(r=>r.count===2&&r.orientation===0),'the complete wound remains a closed, consistently oriented manifold across all refined chunks');
});

test('worker-prepared raised chunk preserves exact Float32 positions, normals and bounds without a second foreground mapping',()=>{
  const state=organ(),d=normalizeDeformation({model:'local-flow',local:[0,0,.012],displacement:[.002,-.001,.027]}),tissue=new TissueVolume();
  try{
    tissue._deformation=d;const mesh=polygonizeChunk(state,'1,1,2'),prepared=prepareChunkDisplay(mesh,d);assert(prepared.activeCount>0);
    tissue._replaceChunk({...mesh,key:'fallback'});const expected=tissue._meshes.get('fallback').geometry;
    tissue._replaceChunk({...mesh,key:'worker',display:prepared});const actual=tissue._meshes.get('worker').geometry;
    assert.deepEqual(actual.attributes.position.array,expected.attributes.position.array);assert.deepEqual(actual.attributes.normal.array,expected.attributes.normal.array);
    assert.deepEqual(actual.boundingSphere,expected.boundingSphere);assert.deepEqual(actual.boundingBox,expected.boundingBox);
    assert.equal(actual.attributes.position.array,prepared.positions,'adopt the transferred complete array without another copy');
    assert.notEqual(actual.attributes.position.array,actual.attributes.tissueRestPosition.array);
    tissue.setGrasp({...d,displacement:[.002,-.001,.022]});assert.deepEqual(actual.attributes.position.array,expected.attributes.position.array,'future traction still maps both chunks identically');
  }finally{tissue.dispose();}
});

test('release before a worker response rejects stale mapping and bounds while preserving exact parent contact',()=>{
  const state=organ(),mesh=polygonizeChunk(state,'1,1,2'),d=normalizeDeformation({model:'local-flow',local:[0,0,.012],displacement:[0,0,.027]}),tissue=new TissueVolume();
  try{
    const display=prepareChunkDisplay(mesh,d),contactTree=buildSurfaceTree(display.positions,mesh.indices),restContactBounds=surfaceTreeBounds(contactTree,mesh.positions,mesh.indices);
    tissue._replaceChunk({...mesh,display,contactTree,restContactBounds});const actual=tissue._meshes.get(mesh.key),g=actual.geometry;
    assert.deepEqual(g.attributes.position.array,mesh.positions);assert.deepEqual(g.attributes.normal.array,mesh.normals);
    const copy=g.clone();copy.userData={};const expected=new THREE.Mesh(copy);
    for(let i=0;i<30;i++){
      const a=new THREE.Vector3(Math.sin(i)*.02,Math.cos(i)*.02,.03),b=a.clone().negate(),x=firstParentHit([actual],a,b),y=firstParentHit([expected],a,b);assert.equal(!!x,!!y);if(y)assert(x.distanceTo(y)<1e-10);
      const p=closestParentSurface([actual],a,.1),q=closestParentSurface([expected],a,.1);assert.equal(!!p,!!q);if(q)assert(p.distanceTo(q)<1e-10);
    }
    copy.dispose();expected.material.dispose();
  }finally{tissue.dispose();}
});

test('bounded material cache preserves every full-precision coordinate and mapping through eviction',()=>{
  const d=normalizeDeformation({model:'local-flow',local:[0,0,.012],displacement:[.002,-.001,.027]}),sample=createDeformationSampler(d,{limit:10});
  const points=Array.from({length:24},(_,i)=>[i*.000031,0,.012+i*.000014]);points.push([points[0][0]+1e-15,0,.012]);
  for(let round=0;round<3;round++)for(const p of points){const expected=deformationWeight(p,d),result=sample(p);assert.deepEqual(result.position,deformPoint(p,d));assert.deepEqual(result.gradient,expected.gradient);assert.equal(result.weight,expected.weight);assert(sample.metrics.size<=10);assert.equal(sample(p),result);}
  assert(sample.metrics.hits>0);assert(sample.metrics.misses>10);
});

test('unchanged chunk-input reuse includes the complete normal halo and never hides geometry changes or forced restoration',()=>{
  const state=organ(),keys=allChunkKeys(state),initial=new Map(buildChunks(state,keys).map(m=>[m.key,m]));
  assert.equal(buildChunks(state,keys).length,0);
  const cut=applyCapsuleCut(state,{a:[0,0,-.02],b:[0,0,.02],radius:CUT_RADIUS});
  for(const m of buildChunks(state,cut.dirty))initial.set(m.key,m);
  for(const key of keys){const expected=polygonizeChunk(state,key),actual=initial.get(key);for(const name of ['positions','normals','colors','cutMasks','indices'])assert.deepEqual(actual[name],expected[name],`${key} ${name}: every current surface attribute must match full regeneration`);}
  assert.equal(buildChunks(state,keys).length,0);
  state.field[nodeIndex(state.meta,9,12,12)]+=.0005;
  assert(buildChunks(state,['0,1,1']).length===1,'a changed one-node normal halo invalidates the neighbouring chunk even outside its cells');
  assert.equal(buildChunks(state,keys,{force:true}).length,keys.length,'reset/history always delivers the complete scene');
});
