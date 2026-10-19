import * as THREE from 'three';
import {ScopeFeed} from './scope-feed.js';

// Development-only pixel readback of the actual CAD/anatomy scene. No test
// target, readback or additional pass exists in the production renderer.
export function attachScopeCaptureVerification(view,pause){
  const button=document.createElement('button');button.id='verify-scope-capture';button.textContent='验证内窥镜完整像素与裁剪解析一致';document.getElementById('app').prepend(button);
  button.onclick=async()=>{
    button.disabled=true;pause(true);const r=view.renderer,scene=view.scene,camera=view.endoCamera.clone(),baseline=new ScopeFeed(r),optimized=new ScopeFeed(r),rows=[];
    baseline.target.resolveDepthBuffer=true;baseline.reserve(r,1440,900);optimized.reserve(r,1440,900);
    const saved={background:scene.background,intensity:scene.environmentIntensity,exposure:r.toneMappingExposure,visible:view.cavity.children[0].visible,matrixWorldAutoUpdate:scene.matrixWorldAutoUpdate};
    const draw=async(feed,legacy,width,height)=>{
      scene.background=new THREE.Color('#6b4a42');scene.environmentIntensity=.34;r.toneMappingExposure=1.1;view.cavity.children[0].visible=true;
      scene.matrixWorldAutoUpdate=legacy;
      const prior=r.getRenderTarget(),scissor=r.getScissorTest(),ratio=r.getPixelRatio(),w=Math.round(width*ratio),h=Math.round(height*ratio);
      if(legacy){feed.target.viewport.set(0,0,w,h);feed.target.scissorTest=false;camera.aspect=width/height;camera.updateProjectionMatrix();r.setRenderTarget(feed.target);r.setScissorTest(false);r.clear();r.render(scene,camera);r.setRenderTarget(prior);r.setScissorTest(scissor);}
      else feed.capture(r,scene,camera,width,height);
      const pixels=new Uint16Array(w*h*4),pending=r.readRenderTargetPixelsAsync(feed.target,0,0,w,h,pixels);r.setRenderTarget(prior);await pending;return pixels;
    };
    try{
      for(const [width,height]of [[640,400],[320,504],[863,556]]){
        const a=await draw(baseline,true,width,height),b=await draw(optimized,false,width,height);let different=0,nonzero=0;
        for(let i=0;i<a.length;i++){if(a[i]!==b[i])different++;if(b[i])nonzero++;}
        rows.push({width,height,components:a.length,different,nonzero,samples:optimized.target.samples,hdr:optimized.target.texture.type===THREE.HalfFloatType});
      }
      const result={passed:rows.every(row=>row.different===0&&row.nonzero>0),rows,errors:r.getContext().getError()};button.dataset.result=JSON.stringify(result);button.textContent=result.passed?'内窥镜逐像素一致':'内窥镜像素验证失败';
    }catch(error){button.dataset.result=JSON.stringify({passed:false,error:String(error)});button.textContent='内窥镜像素验证失败';}
    finally{baseline.dispose();optimized.dispose();scene.background=saved.background;scene.environmentIntensity=saved.intensity;r.toneMappingExposure=saved.exposure;view.cavity.children[0].visible=saved.visible;scene.matrixWorldAutoUpdate=saved.matrixWorldAutoUpdate;button.disabled=false;}
  };
}
