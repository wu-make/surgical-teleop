import {runCooperatively} from './cooperative-work.js';
import {yieldPreparationTask} from './preparation-task.js';

// Compile the real endoscope/HDR and overview/window variants before their
// first draw. Compiling after render() has already synchronously linked them
// does not protect the loading UI from the initial driver stall.
export async function prepareSceneMaterials(view,{width,height,yieldFrame=yieldPreparationTask}={}){
  const r=view.renderer,scene=view.scene,inner=view.cavity.children[0];
  const saved={target:r.getRenderTarget(),background:scene.background,environmentIntensity:scene.environmentIntensity,exposure:r.toneMappingExposure,visible:inner.visible};
  if(view.prepareRenderGeometryAsync)await view.prepareRenderGeometryAsync();else view.prepareRenderGeometry();
  view.scopeFeed.reserve(r,width,height);
  // Live cut surfaces use original source draws. Compile that real material
  // variant before the first C, even when initial tissue is statically batched.
  const original=view.tissue?._meshes?.values().next().value,originalMask=original?.layers.mask;
  if(original)original.layers.mask|=3;
  try{
    await yieldFrame();
    inner.visible=true;scene.environmentIntensity=.34;r.toneMappingExposure=1.10;
    r.setRenderTarget(view.scopeFeed.target);
    await r.compileAsync(scene,view.endoCamera);
    await yieldFrame();
    inner.visible=false;scene.environmentIntensity=.80;r.toneMappingExposure=1.0;
    r.setRenderTarget(null);
    await r.compileAsync(scene,view.overviewCamera);
  }finally{
    if(original)original.layers.mask=originalMask;
    r.setRenderTarget(saved.target);scene.background=saved.background;
    scene.environmentIntensity=saved.environmentIntensity;r.toneMappingExposure=saved.exposure;inner.visible=saved.visible;
  }
}

// Shader linking is only part of first-use cost. Warm every original visible
// render object (including full batches, shadows, texture/buffer uploads) in
// small units while the loading screen remains responsive. No proxy geometry,
// downsampling or material substitution is used; restore the exact layer masks
// before the first complete visible frame.
export async function warmSceneDisplay(view,options={}){
  const r=view.renderer,scene=view.scene,inner=view.cavity.children[0],objects=[];
  const width=view.frameLayout?.width??view.stage.clientWidth,height=view.frameLayout?.height??view.stage.clientHeight;
  scene.traverse(object=>{if(object.isMesh||object.isLine||object.isPoints||object.isSprite)objects.push({object,mask:object.layers.mask,culled:object.frustumCulled,warmWorld:object.userData?.cameraSpaceWarmup?object.matrixWorld.clone():null,count:object.isInstancedMesh?object.count:null,matrix:object.isInstancedMesh&&object.count===0&&object.instanceMatrix.array.length>=16?object.instanceMatrix.array.slice(0,16):null});});
  const original=view.tissue?._meshes?.values().next().value,originalRecord=objects.find(record=>record.object===original);
  if(originalRecord)originalRecord.warmMask=3;
  const saved={target:r.getRenderTarget(),intensity:scene.environmentIntensity,exposure:r.toneMappingExposure,visible:inner.visible};
  function* draws(){
    // Zero-instance particles/fibres compile but never exercise their actual
    // instanced draw or shadow path. Prime one original instance while loading;
    // restore every matrix/count without advancing the physical simulation.
    for(const record of objects){record.object.layers.mask=0;if(record.matrix){record.object.count=1;record.object.instanceMatrix.array.set([.0001,0,0,0,0,.0001,0,0,0,0,.0001,0,0,0,0,1]);record.object.instanceMatrix.needsUpdate=true;}}
    for(const endoscopy of [true,false]){
      const camera=endoscopy?view.endoCamera:view.overviewCamera;
      inner.visible=endoscopy;scene.environmentIntensity=endoscopy?.34:.80;r.toneMappingExposure=endoscopy?1.10:1.0;
      for(const record of objects){
        const {object,mask}=record,drawMask=record.warmMask??mask;if(record.warmWorld)object.visible=true;if(!(drawMask&camera.layers.mask)||!object.visible)continue;
        object.layers.mask=drawMask;object.frustumCulled=false;
        if(endoscopy)view.scopeFeed.capture(r,scene,camera,width,height);
        else{r.setRenderTarget(null);r.render(scene,camera);}
        object.layers.mask=0;object.frustumCulled=record.culled;yield;
      }
    }
    if(originalRecord&&original.visible){
      // Three renders shadows before refreshing the scene's light state.
      // The real endoscope -> overview transition therefore uses a different
      // depth-program cache key from repeated isolated overview draws. Prime
      // that exact source-tissue transition before the first changed cut tile.
      original.layers.mask=originalRecord.warmMask;original.frustumCulled=false;
      inner.visible=true;scene.environmentIntensity=.34;r.toneMappingExposure=1.10;
      view.scopeFeed.capture(r,scene,view.endoCamera,width,height);yield;
      inner.visible=false;scene.environmentIntensity=.80;r.toneMappingExposure=1.0;
      r.setRenderTarget(null);r.render(scene,view.overviewCamera);yield;
      original.layers.mask=0;original.frustumCulled=originalRecord.culled;
    }
    r.setRenderTarget(null);view.scopeFeed.blit(r,0,0,width,height);yield;
  }
  try{return await runCooperatively(draws(),{yieldFrame:yieldPreparationTask,...options});}
  finally{
    for(const {object,mask,culled,count,matrix,warmWorld}of objects){object.layers.mask=mask;object.frustumCulled=culled;if(warmWorld){object.visible=false;object.matrixWorld.copy(warmWorld);}if(matrix){object.count=count;object.instanceMatrix.array.set(matrix);object.instanceMatrix.needsUpdate=true;}}
    r.setRenderTarget(saved.target);scene.environmentIntensity=saved.intensity;r.toneMappingExposure=saved.exposure;inner.visible=saved.visible;
    if(r.shadowMap)r.shadowMap.needsUpdate=true;
  }
}
