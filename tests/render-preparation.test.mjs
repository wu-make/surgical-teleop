import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {prepareSceneMaterials} from '../src/render-preparation.js';
function fixture(fail=false){
  const calls=[],target={name:'HDR'},previous={name:'previous'},scene={background:{name:'original'},environmentIntensity:2},inner={visible:true};
  const renderer={target:previous,toneMappingExposure:1.7,getRenderTarget(){return this.target;},setRenderTarget(t){this.target=t;},async compileAsync(s,c){calls.push({kind:'compile',scene:s,camera:c,target:this.target,inner:inner.visible,intensity:s.environmentIntensity,exposure:this.toneMappingExposure});if(fail)throw new Error('compile failed');},render(){throw new Error('must not draw before compile completes');}};
  const view={renderer,scene,cavity:{children:[inner]},endoCamera:{name:'endo'},overviewCamera:{name:'overview'},prepareRenderGeometry(){calls.push({kind:'exact-geometry'});},scopeFeed:{target,reserve(r,w,h){calls.push({kind:'reserve',w,h});}}};
  return {view,calls,previous,inner,yieldFrame:async()=>calls.push({kind:'yield'})};
}

test('isolated wet fragments warm in front of both real cameras, then disappear and restore world transforms even on failure',async()=>{
  const {warmSceneDisplay}=await import('../src/render-preparation.js');
  for(const fail of [false,true]){
    const f=fixture(),object=new THREE.Mesh();object.layers.mask=3;object.userData.cameraSpaceWarmup=true;object.matrixWorld.makeTranslation(1,2,3);const original=object.matrixWorld.clone();let draws=0;
    object.onBeforeRender=(_r,_s,c)=>object.matrixWorld.copy(c.matrixWorld).multiply(new THREE.Matrix4().makeTranslation(0,0,-.02));object.onAfterRender=()=>{object.visible=false;};
    f.view.endoCamera={layers:{mask:2},matrixWorld:new THREE.Matrix4().makeTranslation(0,1,2)};f.view.overviewCamera={layers:{mask:1},matrixWorld:new THREE.Matrix4().makeTranslation(2,3,4)};
    f.view.scene.traverse=fn=>fn(object);f.view.stage={clientWidth:1445,clientHeight:548};
    f.view.renderer.render=(s,c)=>{draws++;assert(object.visible);object.onBeforeRender(f.view.renderer,s,c);assert.equal(object.matrixWorld.elements[14],c.matrixWorld.elements[14]-.02);object.onAfterRender();if(fail)throw new Error('wet driver interruption');};f.view.scopeFeed.capture=(r,s,c)=>r.render(s,c);f.view.scopeFeed.blit=()=>{};
    if(fail)await assert.rejects(warmSceneDisplay(f.view,{yieldFrame:f.yieldFrame}),/wet driver interruption/);else{await warmSceneDisplay(f.view,{yieldFrame:f.yieldFrame});assert.equal(draws,2);}
    assert.equal(object.visible,false);assert.deepEqual(object.matrixWorld,original);assert.equal(object.layers.mask,3);
  }
});

test('empty particle and fibre draws execute both real render variants during loading and restore all instance data even on failure',async()=>{
  const {warmSceneDisplay}=await import('../src/render-preparation.js');
  for(const fail of [false,true]){
    const f=fixture(),array=new Float32Array(32).fill(.37),before=array.slice(),object={isMesh:true,isInstancedMesh:true,count:0,visible:true,instanceMatrix:{array,needsUpdate:false},layers:{mask:3},frustumCulled:true};
    f.view.scene.traverse=fn=>fn(object);f.view.endoCamera.layers={mask:2};f.view.overviewCamera.layers={mask:1};f.view.stage={clientWidth:949,clientHeight:612};let draws=0;
    f.view.renderer.render=()=>{draws++;assert.equal(object.count,1);assert(Math.abs(array[0]-.0001)<1e-10);assert.equal(array[15],1);if(fail)throw new Error('draw interrupted');};
    f.view.scopeFeed.capture=(r,s,c)=>r.render(s,c);f.view.scopeFeed.blit=()=>{};
    if(fail)await assert.rejects(warmSceneDisplay(f.view,{yieldFrame:f.yieldFrame}),/draw interrupted/);else{await warmSceneDisplay(f.view,{yieldFrame:f.yieldFrame});assert.equal(draws,2);}
    assert.equal(object.count,0);assert.deepEqual(array,before);assert.equal(object.layers.mask,3);assert.equal(object.frustumCulled,true);
  }
});
test('complete real HDR and window variants compile before any initial draw with unchanged geometry and resolution',async()=>{
  const f=fixture();await prepareSceneMaterials(f.view,{width:1920,height:1080,yieldFrame:f.yieldFrame});
  assert.deepEqual(f.calls.map(c=>c.kind),['exact-geometry','reserve','yield','compile','yield','compile']);
  const passes=f.calls.filter(c=>c.kind==='compile');assert.equal(passes[0].target,f.view.scopeFeed.target);assert.equal(passes[0].camera,f.view.endoCamera);assert.equal(passes[0].inner,true);assert.equal(passes[0].intensity,.34);assert.equal(passes[0].exposure,1.10);
  assert.equal(passes[1].target,null);assert.equal(passes[1].camera,f.view.overviewCamera);assert.equal(passes[1].inner,false);assert.equal(passes[1].intensity,.80);assert.equal(passes[1].exposure,1);
  assert.equal(f.calls[1].w,1920);assert.equal(f.calls[1].h,1080);assert.equal(f.view.renderer.target,f.previous);assert.equal(f.inner.visible,true);assert.equal(f.view.renderer.toneMappingExposure,1.7);assert.equal(f.view.scene.environmentIntensity,2);
});
test('material preparation restores target and lighting after compile rejection for retry',async()=>{
  const f=fixture(true);await assert.rejects(prepareSceneMaterials(f.view,{width:1920,height:1080,yieldFrame:f.yieldFrame}),/compile failed/);
  assert.equal(f.view.renderer.target,f.previous);assert.equal(f.inner.visible,true);assert.equal(f.view.scene.environmentIntensity,2);assert.equal(f.view.renderer.toneMappingExposure,1.7);
});
test('all exact initial buffers complete cooperatively before compiling either real view',async()=>{
  const f=fixture();f.view.prepareRenderGeometryAsync=async()=>{f.calls.push({kind:'buffer-start'});await f.yieldFrame();f.calls.push({kind:'buffer-complete'});};
  await prepareSceneMaterials(f.view,{width:1920,height:1080,yieldFrame:f.yieldFrame});
  assert.deepEqual(f.calls.map(c=>c.kind),['buffer-start','yield','buffer-complete','reserve','yield','compile','yield','compile']);
});

test('first-use warming uploads complete real geometry in bounded units and restores exact layers and culling',async()=>{
  const {warmSceneDisplay}=await import('../src/render-preparation.js');const f=fixture(),objects=[1,2,3].map((mask,i)=>({isMesh:true,visible:true,layers:{mask},frustumCulled:true,geometry:{id:i,vertices:new Float32Array([i,2,3])},material:{id:i}}));
  f.view.scene.traverse=fn=>objects.forEach(fn);f.view.endoCamera.layers={mask:2};f.view.overviewCamera.layers={mask:1};f.view.stage={clientWidth:325,clientHeight:458};f.view.renderer.shadowMap={needsUpdate:false};
  const draws=[];f.view.renderer.render=(s,c)=>draws.push({camera:c,objects:objects.filter(o=>o.layers.mask&c.layers.mask).map(o=>o.geometry)});
  f.view.scopeFeed.capture=(r,s,c,w,h)=>{assert.equal(w,325);assert.equal(h,458);r.setRenderTarget(f.view.scopeFeed.target);r.render(s,c);};f.view.scopeFeed.blit=()=>draws.push({blit:true});
  const before=objects.map(o=>o.geometry.vertices.slice());const result=await warmSceneDisplay(f.view,{yieldFrame:f.yieldFrame});
  assert.equal(result.cancelled,false);assert.equal(draws.length,5);assert(draws.filter(d=>!d.blit).every(d=>d.objects.length===1));
  objects.forEach((o,i)=>{assert.equal(o.layers.mask,i+1);assert.equal(o.frustumCulled,true);assert.deepEqual(o.geometry.vertices,before[i]);});assert.equal(f.view.renderer.target,f.previous);assert.equal(f.view.renderer.shadowMap.needsUpdate,true);
});
test('first-use warming restores scene masks even when a driver draw throws',async()=>{
  const {warmSceneDisplay}=await import('../src/render-preparation.js');const f=fixture(),object={isMesh:true,visible:true,layers:{mask:3},frustumCulled:true};f.view.scene.traverse=fn=>fn(object);f.view.endoCamera.layers={mask:2};f.view.overviewCamera.layers={mask:1};f.view.stage={clientWidth:325,clientHeight:458};f.view.scopeFeed.capture=()=>{throw new Error('driver failed');};
  await assert.rejects(warmSceneDisplay(f.view,{yieldFrame:f.yieldFrame}),/driver failed/);assert.equal(object.layers.mask,3);assert.equal(object.frustumCulled,true);assert.equal(f.view.renderer.target,f.previous);assert.equal(f.inner.visible,true);
});
