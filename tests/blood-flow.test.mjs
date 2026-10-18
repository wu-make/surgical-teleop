import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {TissueVolume} from '../src/tissue.js';
import {createVolumeState,allChunkKeys,polygonizeChunk,applyCapsuleCut,normalizeDeformation,deformPoint,deformNormal,deformationWeight} from '../src/tissue-worker.js';

function bench(){
  const t=new TissueVolume();t.group.position.y=1.035;t.group.updateMatrixWorld(true);
  const b=t.blood;
  b.nodes=[0,.0025,.005].map((x,i)=>({key:String(i),reference:[x,.01-i*.0008,0],restNormal:[0,1,0],area:4,cut:true,fragmentId:null,volume:0,clot:0,pressure:0,injured:i===0}));
  b.updatePositions();b.connect();return{t,b,step:(n,options)=>{for(let i=0;i<n;i++)b.update(1/60,options);}};
}

test('blood material caching is exact through recoil and rigid specimen transport',()=>{
  const {t,b}=bench(),piece={deformation:normalizeDeformation({model:'local-flow',local:[0,.01,0],displacement:[0,.006,.02]}),frozenCenter:new THREE.Vector3(.004,.01,.01),position:new THREE.Vector3(),quaternion:new THREE.Quaternion()};
  t.getFragment=id=>id==='piece'?piece:null;b.nodes[1].fragmentId='piece';let previousMaterial;
  try{for(let step=0;step<30;step++){
    t._deformation=normalizeDeformation({model:'local-flow',local:[0,.01,0],displacement:[0,.003*(1-step/30),.01*(1-step/30)]});
    piece.position.set(step*.001,.003,.02);piece.quaternion.setFromAxisAngle(new THREE.Vector3(1,2,3).normalize(),step*.08);b.updatePositions();
    const cached=b._positionCache.get(b.nodes[1]).materialPoint;if(previousMaterial)assert.equal(cached,previousMaterial,'rigid movement must reuse the frozen material calculation');previousMaterial=cached;
    for(const n of b.nodes){
      const owner=n.fragmentId?piece:null,d=owner?.deformation??t._deformation,gradient=deformationWeight(n.reference,d).gradient;
      const position=new THREE.Vector3(...deformPoint(n.reference,d));if(owner)position.sub(owner.frozenCenter).applyQuaternion(owner.quaternion).add(owner.position);
      const normal=new THREE.Vector3(...deformNormal(n.restNormal,gradient,d.displacement));if(owner)normal.applyQuaternion(owner.quaternion);normal.normalize();
      const determinant=1+new THREE.Vector3(...gradient).dot(new THREE.Vector3(...d.displacement));
      const areaScale=new THREE.Vector3(...n.restNormal).multiplyScalar(determinant).addScaledVector(new THREE.Vector3(...gradient),-new THREE.Vector3(...n.restNormal).dot(new THREE.Vector3(...d.displacement))).length();
      assert.deepEqual(n.display,position);assert.deepEqual(n.normal,normal);assert.equal(n.physicalArea,n.area*THREE.MathUtils.clamp(areaScale,.01,10));
    }
  }}finally{t.dispose();}
});
test('cut-source emission and downhill film transport conserve volume and create 3-D geometry',()=>{
  const {t,b,step}=bench();
  try{
    step(600);
    assert(b.emitted>0);assert(b.nodes[1].volume>0,'volume travels off its source over connected surface cells');
    assert(Math.abs(b.metrics.balanceErrorMm3)<1e-9);
    assert(b.film.count>0&&b.fibres.count===3);assert.equal(b.film.material.map,null);
    assert(b.film.instanceMatrix.array.some(v=>v!==0));
  }finally{t.dispose();}
});
test('sustained local pressure suppresses inflow but never deletes blood already emitted',()=>{
  const a=bench(),c=bench();
  try{
    a.step(120);c.step(120);const retained=c.b.metrics.retainedMl;
    const p=c.b.nodes[0].display.clone(),options={pressureSegments:[{a:p,b:p}]};
    a.step(600);c.step(600,options);
    assert(c.b.emitted<a.b.emitted*.35,'only spatially local contact reduces the source');
    assert(c.b.metrics.retainedMl>=retained);assert(c.b.nodes[0].clot>.95);
    const emitted=c.b.emitted;c.step(120);
    assert(c.b.emitted-emitted<.001,'accumulated clot persists after pressure release');
    assert(Math.abs(c.b.metrics.balanceErrorMm3)<1e-9);
  }finally{a.t.dispose();c.t.dispose();}
});
test('distant or brief pressure cannot declare durable haemostasis',()=>{
  const a=bench();try{
    a.step(60,{pressureSegments:[{a:new THREE.Vector3(1,1,1),b:new THREE.Vector3(1,1,1)}]});
    assert.equal(a.b.pressureContacts,0);assert.equal(a.b.nodes[0].clot,0);
    const p=a.b.nodes[0].display.clone();a.step(3,{pressureSegments:[{a:p,b:p}]});
    assert(a.b.nodes[0].clot<.01);assert(a.b.metrics.activeSources>0);
  }finally{a.t.dispose();}
});

test('clot impedes existing fluid transport rather than only recolouring a bleeding site',()=>{
  const a=bench(),c=bench();try{
    for(const f of [a,c]){f.b.nodes[0].injured=false;f.b.nodes[0].volume=2;f.b.emitted=2;}
    c.b.nodes[0].clot=1;a.step(120);c.step(120);
    assert(c.b.nodes[1].volume<a.b.nodes[1].volume*.15);assert(Math.abs(c.b.metrics.balanceErrorMm3)<1e-10);
  }finally{a.t.dispose();c.t.dispose();}
});
test('detached wound cells cease perfusion and frozen undeformed specimens ignore later mother traction',()=>{
  const {t,b,step}=bench();try{
    const piece={id:'piece',position:new THREE.Vector3(.03,.02,0),frozenCenter:new THREE.Vector3(),quaternion:new THREE.Quaternion(),deformation:null};
    t.getFragment=id=>id==='piece'?piece:null;b.nodes[0].fragmentId='piece';t._deformation={local:[0,0,0],displacement:[0,.02,0],radius:.065};
    b.updatePositions();assert(b.nodes[0].display.distanceTo(new THREE.Vector3(.03,.03,0))<1e-12);
    step(60);assert.equal(b.emitted,0);
    piece.position.x+=.012;piece.quaternion.setFromAxisAngle(new THREE.Vector3(0,0,1),Math.PI/2);b.updatePositions();
    assert(b.nodes[0].display.distanceTo(new THREE.Vector3(.032,.02,0))<1e-12,'blood moves and rotates with a carried specimen');
    assert(b.nodes[0].normal.distanceTo(new THREE.Vector3(-1,0,0))<1e-12);
    t.getFragment=()=>null;t._deformation=null;b.updatePositions();
    assert(b.nodes[0].display.distanceTo(new THREE.Vector3(0,.01,0))<1e-12,'owner changes invalidate a previous rigid pose');
  }finally{t.dispose();}
});

test('traction changes film area and thickness without creating or losing liquid volume',()=>{
  const {t,b}=bench();try{
    b.nodes[0].volume=1;b.emitted=1;const before=b.nodes[0].physicalArea;
    t.setGrasp([.003,.01,0],[.012,.008,0]);b.updatePositions();b.render();
    assert(Math.abs(b.nodes[0].physicalArea-before)>.01);assert.equal(b.nodes[0].volume,1);assert(Math.abs(b.metrics.balanceErrorMm3)<1e-12);
  }finally{t.dispose();}
});
test('blood and clot history restores exact volumes, positions and source states; reset clears all',()=>{
  const {t,b,step}=bench();try{
    step(200);b.shed(new THREE.Vector3(0,.1,0),.5);b.emitted+=.5;
    const saved=b.snapshot();b.reset();b.restore(saved);assert.deepEqual(b.snapshot(),saved);
    assert(Math.abs(b.metrics.balanceErrorMm3)<1e-9);b.reset();assert.equal(b.metrics.emittedMl,0);assert.equal(b.film.count,0);assert.equal(b.fibres.count,0);
  }finally{t.dispose();}
});
test('shed drops fall under gravity while conserving their physical volume',()=>{
  const {t,b,step}=bench();try{
    b.nodes=[];b.connect();b.shed(new THREE.Vector3(0,.05,0),1);b.emitted=1;step(6);
    assert(b.drops[0].position[1]<.05);assert.equal(b.drops[0].volume,1);assert(Math.abs(b.metrics.balanceErrorMm3)<1e-12);
  }finally{t.dispose();}
});

test('bounded droplet coalescence keeps overflow blood represented rather than invisible or discarded',()=>{
  const {t,b}=bench();try{
    for(let i=0;i<300;i++){b.shed(new THREE.Vector3(i*.00001,.05,0),.2);b.emitted+=.2;}
    assert(b.drops.length<=96);assert.equal(b.reservoir,0);assert(Math.abs(b.drops.reduce((s,d)=>s+d.volume,0)-60)<1e-9);assert(Math.abs(b.metrics.balanceErrorMm3)<1e-9);
  }finally{t.dispose();}
});

test('only an actual newly exposed CSG cut face creates sources, and unchanged geometry preserves clot',()=>{
  const t=new TissueVolume(),n=19,origin=[-.0135,-.0135,-.0135],spacing=[.0015,.0015,.0015],values=new Float32Array(n**3);
  for(let z=0;z<n;z++)for(let y=0;y<n;y++)for(let x=0;x<n;x++)values[x+n*(y+n*z)]=Math.hypot(origin[0]+x*spacing[0],origin[1]+y*spacing[1],origin[2]+z*spacing[2])-.009;
  const field=createVolumeState({dims:[n,n,n],origin,spacing},values,8);t.metadata=field.meta;t._baseField=field.base;
  const mesh=()=>{for(const k of allChunkKeys(field))t._replaceChunk(polygonizeChunk(field,k));};
  try{
    mesh();t.blood.syncSurface();t.blood.update(.1);assert.equal(t.blood.emitted,0);assert.equal(t.blood.metrics.activeSources,0);
    applyCapsuleCut(field,{a:[-.005,.007,0],b:[.005,.007,0],radius:.003});mesh();t.blood.syncSurface({injury:true});
    assert(t.blood.metrics.activeSources>0,'sources must originate on the newly generated solid cut surface');
    for(let i=0;i<60;i++)t.blood.update(1/60);
    assert(t.blood.emitted>0);assert(Math.abs(t.blood.metrics.balanceErrorMm3)<1e-8);
    const source=t.blood.nodes.find(c=>c.injured);source.clot=.6;t.blood.syncSurface();assert.equal(t.blood.nodes.find(c=>c.key===source.key).clot,.6);
  }finally{t.dispose();}
});
