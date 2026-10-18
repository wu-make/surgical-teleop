import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {TissueVolume} from '../src/tissue.js';

function plane(t,{slope=0,gap=false}={}){
  const g=new THREE.PlaneGeometry(.03,.03,30,30);g.rotateX(-Math.PI/2);g.rotateZ(slope);g.translate(0,.01,0);
  g.setAttribute('tissueRestPosition',g.attributes.position.clone());g.computeBoundingBox();g.userData.restBox=g.boundingBox.clone();g.userData.restNormals=g.attributes.normal.array.slice();
  if(gap){const indices=[];for(let i=0;i<g.index.count;i+=3){const a=g.index.array.slice(i,i+3);if(a.every(id=>g.attributes.position.getX(id)<-.001)||a.every(id=>g.attributes.position.getX(id)>.001))indices.push(...a);}g.setIndex(indices);}
  const mesh=new THREE.Mesh(g);t._meshes.set('plane',mesh);t.group.add(mesh);return mesh;
}
const source=(x,volume=1)=>({key:String(x),reference:[x,.01,0],restNormal:[0,1,0],area:6.25,physicalArea:6.25,volume,clot:0,cut:true,injured:false,fragmentId:null});

test('adjacent blood cells form a continuous physical layer on the original tissue triangles',()=>{
  const t=new TissueVolume();try{
    plane(t);const b=t.blood;b.nodes=[source(-.00125),source(.00125)];b.updatePositions();b.render();
    const g=b.film.geometry,p=g.attributes.position,h=g.attributes.filmThickness;
    assert(g.drawRange.count>0);let bridge=false,maxHeight=0;
    for(let i=0;i<g.drawRange.count;i++){
      assert(Math.abs(p.getY(i)-(.01+h.getX(i)+.000012))<2e-9,'film follows the exact source surface plus its computed thickness');
      if(Math.abs(p.getX(i))<.0002&&Math.abs(p.getZ(i))<.0002&&h.getX(i)>0)bridge=true;
      maxHeight=Math.max(maxHeight,h.getX(i));
    }
    assert(bridge,'overlapping volume kernels must join between the cells');assert(maxHeight>.00005&&maxHeight<.001);
    assert.equal(b.film.isInstancedMesh,undefined);assert.equal(b.film.material.map,null);
    const builds=b.surfaceFilm.stats.cacheBuilds;b.nodes[0].volume*=2;b.render();assert.equal(b.surfaceFilm.stats.cacheBuilds,builds,'fluid transport reuses source geometry and material weights');
  }finally{t.dispose();}
});

test('liquid cannot bridge a real cut gap, and back-facing tissue receives no ghost coating',()=>{
  const t=new TissueVolume();try{
    plane(t,{gap:true});const b=t.blood;b.nodes=[source(-.002),source(.002)];b.updatePositions();b.render();
    const g=b.film.geometry,p=g.attributes.position;
    for(let i=0;i<g.drawRange.count;i+=3){const x=[p.getX(i),p.getX(i+1),p.getX(i+2)];assert(x.every(v=>v<-.00099)||x.every(v=>v>.00099),'there are no liquid triangles spanning absent tissue');}
    b.nodes=b.nodes.map(n=>({...n,restNormal:[0,-1,0]}));b.render();assert.equal(g.drawRange.count,0);
  }finally{t.dispose();}
});

test('film updates at display cadence when the source surface moves between fluid steps',()=>{
  const t=new TissueVolume();try{
    const mesh=plane(t),b=t.blood;b.nodes=[source(0)];b.updatePositions();b.render();
    const before=b.film.geometry.attributes.position.getY(0),p=mesh.geometry.attributes.position;
    for(let i=0;i<p.count;i++)p.setY(i,p.getY(i)+.002);p.needsUpdate=true;
    const volume=b.nodes[0].volume;b.surfaceFilm.syncDisplay();assert(Math.abs(b.film.geometry.attributes.position.getY(0)-before-.002)<2e-9);assert.equal(b.nodes[0].volume,volume);
  }finally{t.dispose();}
});

test('a real surface contact becomes a spreading pool, not a rolling spherical bead, and restores exactly',()=>{
  const t=new TissueVolume();try{
    plane(t);t.group.position.y=1.035;t.group.updateMatrixWorld(true);const b=t.blood;
    b.shed(new THREE.Vector3(0,.016,0),1);b.emitted=1;
    for(let i=0;i<20;i++)b.update(1/60);
    assert.equal(b.drops.length,1);assert.equal(b.drops[0].surface,true);assert.equal(b.dropsMesh.count,0);
    assert(b.poolMesh.geometry.drawRange.count>0);const area=b.drops[0].area;
    for(let i=0;i<60;i++)b.update(1/60);
    assert(b.drops[0].area>area,'contact area grows while liquid volume stays constant');assert.equal(b.drops[0].volume,1);assert(Math.abs(b.metrics.balanceErrorMm3)<1e-10);
    const saved=b.snapshot();b.restore(saved);assert.deepEqual(b.snapshot(),saved,'history includes wetting position, spread, velocity and clot');
    b.reset();assert.equal(b.poolMesh.geometry.drawRange.count,0);assert.equal(b.dropsMesh.count,0);
  }finally{t.dispose();}
});

test('contacting pools coalesce conservatively and flow tangentially downhill over actual sloped contact',()=>{
  const t=new TissueVolume();try{
    plane(t,{slope:.35});t.group.position.y=1.035;t.group.updateMatrixWorld(true);const b=t.blood;
    b.shed(new THREE.Vector3(0,.016,0),1);b.shed(new THREE.Vector3(.0003,.016,0),1);b.emitted=2;
    for(let i=0;i<16;i++)b.update(1/60);
    assert.equal(b.drops.length,1,'touching wet parcels form one pool');const before=b.drops[0].position[0];
    for(let i=0;i<30;i++)b.update(1/60);
    assert(b.drops[0].position[0]<before,'gravity has a tangential downhill component');assert(Math.abs(b.metrics.balanceErrorMm3)<1e-10);
    assert.equal(b.dropsMesh.count,0);
  }finally{t.dispose();}
});

test('a distant cut selection preserves exact cached weights for unchanged source triangles',()=>{
  const t=new TissueVolume();try{
    plane(t);const b=t.blood;b.nodes=[source(0)];b.updatePositions();b.render();
    const builds=b.surfaceFilm.stats.cacheBuilds,vertices=b.film.geometry.attributes.position.array.slice(0,b.film.geometry.drawRange.count*3);
    b.nodes.push(source(.1));b.updatePositions();b.render();
    assert.equal(b.surfaceFilm.stats.cacheBuilds,builds);assert.deepEqual(b.film.geometry.attributes.position.array.slice(0,vertices.length),vertices);
  }finally{t.dispose();}
});

test('moving pools upload the complete volume kernel without rebuilding unchanged organ triangles',()=>{
  const t=new TissueVolume();try{
    const mesh=plane(t),b=t.blood;
    b.drops=[{position:[0,.010015,0],velocity:[0,0,0],volume:2,surface:true,reference:[0,.01,0],restNormal:[0,1,0],surfaceNormal:[0,1,0],area:6.25,clot:.3,fragmentId:null}];b.emitted=2;b.render();
    const f=b.pooledFilm,indices=Array.from(mesh.geometry.index.array),g=f.geometry;
    assert.equal(g.drawRange.count,indices.length,'the GPU keeps every selected source triangle');
    const layer=f.overlays.get(mesh);assert.notEqual(layer.overlay.geometry,mesh.geometry);assert.equal(layer.overlay.geometry.index.array,mesh.geometry.index.array);assert.equal(layer.overlay.geometry.attributes.position.array,mesh.geometry.attributes.position.array);assert.equal(layer.overlay.geometry.attributes.filmReference.array,mesh.geometry.attributes.tissueRestPosition.array);assert.equal(mesh.geometry.attributes.filmReference,undefined,'the parent batching schema remains unchanged');
    const r=Math.sqrt(6.25/Math.PI)*.001*1.9,data=f.fields.texture.image.data;
    assert(Math.abs(data[3]-r*r)<1e-12);assert(Math.abs(data[7]-2*3/(Math.PI*(r*1000)**2)*.001)<1e-10);assert(Math.abs(data[8]-.3)<1e-7);
    const version=mesh.geometry.attributes.position.version;
    b.drops[0].reference[0]+=.00001;b.drops[0].volume=3;b.render();
    assert.equal(f.overlays.get(mesh),layer,'moving liquid changes field data, not the unchanged triangle buffers');assert.equal(mesh.geometry.attributes.position.version,version);assert(Math.abs(data[0]-.00001)<1e-11);
    assert(Math.abs(data[7]-3*3/(Math.PI*(r*1000)**2)*.001)<1e-10);
  }finally{t.dispose();}
});

test('browser GPU blood retains exact source geometry, conservative chunk support and complete fluid state',()=>{
  const cpu=new TissueVolume(),gpu=new TissueVolume({gpuBlood:true});try{
    const a=plane(cpu),c=plane(gpu);const nodes=[source(-.00125),source(.00125),source(.2)];
    cpu.blood.nodes=structuredClone(nodes);gpu.blood.nodes=structuredClone(nodes);cpu.blood.emitted=gpu.blood.emitted=3;
    cpu.blood.updatePositions();gpu.blood.updatePositions();cpu.blood.render();gpu.blood.render();
    assert.deepEqual(gpu.blood.snapshot(),cpu.blood.snapshot(),'render backend changes no fluid state');
    const layer=gpu.blood.surfaceFilm.overlays.get(c);assert(layer);assert.equal(layer.fields.count.value,2,'a completely distant support sphere is excluded');
    assert.equal(layer.overlay.geometry.index.array,c.geometry.index.array);assert.equal(layer.overlay.geometry.attributes.position.array,c.geometry.attributes.position.array);assert.equal(layer.overlay.geometry.attributes.filmReference.array,c.geometry.attributes.tissueRestPosition.array);
    assert.deepEqual(Object.keys(c.geometry.attributes),Object.keys(a.geometry.attributes),'the original batching schema is unchanged');
    const saved=gpu.blood.snapshot();gpu.blood.restore(saved);assert.deepEqual(gpu.blood.snapshot(),saved);gpu.blood.reset();assert.equal(gpu.blood.surfaceFilm.overlays.size,0);assert.equal(gpu.blood.film.geometry.drawRange.count,0);
  }finally{cpu.dispose();gpu.dispose();}
});

test('wetting liquid transfers to the real disconnected component and follows its rigid pose and contacts',()=>{
  const t=new TissueVolume();let original;
  try{
    original=plane(t);t.group.position.y=1.035;t.group.updateMatrixWorld(true);const b=t.blood;
    b.emitted=1;b.shed(new THREE.Vector3(0,.016,0),1);for(let i=0;i<20;i++)b.update(1/60);
    assert.equal(b.drops[0].surface,true);const beforeY=b.drops[0].position[1];
    const g=new THREE.BoxGeometry(.02,.002,.02,20,2,20);g.translate(0,.009,0);
    const piece=t.fragments.add({id:'wet-piece',center:[0,0,0],volumeMm3:800,deformation:null,positions:g.attributes.position.array.slice(),normals:g.attributes.normal.array.slice(),colors:new Float32Array(g.attributes.position.count*3).fill(.4),cutMasks:new Float32Array(g.attributes.position.count).fill(.8),indices:g.index.array.slice(),volume:{dims:[3,3,3],origin:[-.01,0,-.01],spacing:[.01,.01,.01],values:new Float32Array(27).fill(-.001)}});g.dispose();
    t._meshes.delete('plane');b._applySurfaceSelection([],false);assert.equal(b.drops[0].fragmentId,piece.id);
    const layer=b.pooledFilm.overlays.get(piece.mesh),vertex=()=>new THREE.Vector3().fromBufferAttribute(layer.overlay.geometry.attributes.position,0).applyQuaternion(layer.overlay.quaternion).add(layer.overlay.position).y;
    const oldVertex=vertex();
    piece.position.set(.006,.005,0);piece.quaternion.setFromAxisAngle(new THREE.Vector3(0,1,0),.35);t.fragments.sync(piece);
    b.pooledFilm.syncDisplay();assert(Math.abs(vertex()-oldVertex-.005)<2e-9,'the film follows the specimen at display cadence');
    b.update(1/30);assert.equal(b.drops[0].fragmentId,piece.id);assert.equal(b.drops[0].surface,true);assert(Math.abs(b.drops[0].position[1]-beforeY-.005)<1e-7);assert.equal(b.dropsMesh.count,0);assert(Math.abs(b.metrics.balanceErrorMm3)<1e-9);
    const hit=t.collideBloodDrop(new THREE.Vector3(.006,.025,0),new THREE.Vector3(.006,0,0),.00015);
    assert.equal(hit.fragmentId,piece.id);assert(Math.abs(hit.y-.015)<1e-8);
    const saved=b.snapshot();b.restore(saved);assert.deepEqual(b.snapshot(),saved);
  }finally{t.dispose();original?.geometry.dispose();}
});

test('worker surface delivery and the next fluid step prepare full blood geometry only once before display',()=>{
  const immediate=new TissueVolume({gpuBlood:true}),deferred=new TissueVolume({gpuBlood:true});try{
    plane(immediate);plane(deferred);const nodes=[source(0)],selection={nodes,edges:new Uint32Array()};
    immediate.blood.syncSurface({selection});deferred.blood.syncSurface({selection:structuredClone(selection),deferRender:true});
    assert.equal(deferred.blood.surfaceFilm.overlays.size,0);assert.equal(deferred.blood.renderDirty,true);
    assert.deepEqual(deferred.blood.snapshot(),immediate.blood.snapshot(),'physics is already current before GPU upload');
    deferred.blood.flushRender();assert.equal(deferred.blood.renderDirty,false);assert.equal(deferred.blood.surfaceFilm.geometry.drawRange.count,immediate.blood.surfaceFilm.geometry.drawRange.count);
    let renders=0;const render=deferred.blood.render.bind(deferred.blood);deferred.blood.render=()=>{renders++;render();};
    deferred.blood.syncSurface({selection:structuredClone(selection),deferRender:true});deferred.blood.update(1/30);deferred.blood.flushRender();assert.equal(renders,1,'fluid and worker updates share one complete display upload');
  }finally{immediate.dispose();deferred.dispose();}
});
