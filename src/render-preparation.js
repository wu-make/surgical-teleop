import {runCooperatively} from './cooperative-work.js';

// Compile the real endoscope/HDR and overview/window variants before their
// first draw. Compiling after render() has already synchronously linked them
// does not protect the loading UI from the initial driver stall.
export async function prepareSceneMaterials(view,{width,height,yieldFrame=()=>new Promise(resolve=>requestAnimationFrame(resolve))}={}){
  const r=view.renderer,scene=view.scene,inner=view.cavity.children[0];
  const saved={target:r.getRenderTarget(),background:scene.background,environmentIntensity:scene.environmentIntensity,exposure:r.toneMappingExposure,visible:inner.visible};
  view.prepareRenderGeometry();view.scopeFeed.reserve(r,width,height);
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
  scene.traverse(object=>{if(object.isMesh||object.isLine||object.isPoints||object.isSprite)objects.push({object,mask:object.layers.mask,culled:object.frustumCulled});});
  const saved={target:r.getRenderTarget(),intensity:scene.environmentIntensity,exposure:r.toneMappingExposure,visible:inner.visible};
  function* draws(){
    for(const record of objects)record.object.layers.mask=0;
    for(const endoscopy of [true,false]){
      const camera=endoscopy?view.endoCamera:view.overviewCamera;
      inner.visible=endoscopy;scene.environmentIntensity=endoscopy?.34:.80;r.toneMappingExposure=endoscopy?1.10:1.0;
      for(const record of objects){
        const {object,mask}=record;if(!(mask&camera.layers.mask)||!object.visible)continue;
        object.layers.mask=mask;object.frustumCulled=false;
        if(endoscopy)view.scopeFeed.capture(r,scene,camera,view.stage.clientWidth,view.stage.clientHeight);
        else{r.setRenderTarget(null);r.render(scene,camera);}
        object.layers.mask=0;object.frustumCulled=record.culled;yield;
      }
    }
    r.setRenderTarget(null);view.scopeFeed.blit(r,0,0,view.stage.clientWidth,view.stage.clientHeight);yield;
  }
  try{return await runCooperatively(draws(),options);}
  finally{
    for(const {object,mask,culled}of objects){object.layers.mask=mask;object.frustumCulled=culled;}
    r.setRenderTarget(saved.target);scene.environmentIntensity=saved.intensity;r.toneMappingExposure=saved.exposure;inner.visible=saved.visible;
    if(r.shadowMap)r.shadowMap.needsUpdate=true;
  }
}
