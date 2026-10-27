import * as THREE from 'three';
import {ScopeFeed} from './scope-feed.js';

// Development-only A/B of the same source CAD, pose, lights and complete
// geometry. Both render at the former wide-window resolution, without changing
// the user's window or entering fullscreen.
export function attachCadBatchVerification(view,pause){
  const button=document.createElement('button');button.id='verify-cad-batches';button.textContent='验证原始 CAD 与合批画面及绘制耗时';document.getElementById('app').prepend(button);
  button.onclick=async()=>{
    button.disabled=true;pause(true);const r=view.renderer,scene=view.scene,a=view.assemblies,cad=new Set();
    for(const root of [view.robotModel,a.tools.left.group,a.tools.right.group,a.scope.group,a.scopeArm.mount])root.traverse(m=>{if(m.isMesh)cad.add(m);});
    const records=[...view.exactBatches.records].filter(([source])=>cad.has(source));
    const feed=new ScopeFeed(r);feed.reserve(r,Math.max(screen.width,innerWidth),Math.max(screen.height,innerHeight));
    const displayTarget=new THREE.WebGLRenderTarget(Math.round(863*r.getPixelRatio()),Math.round(556*r.getPixelRatio()),{depthBuffer:false});
    const saved={background:scene.background,intensity:scene.environmentIntensity,exposure:r.toneMappingExposure,visible:view.cavity.children[0].visible};
    const gl=r.getContext(),ext=gl.getExtension('EXT_disjoint_timer_query_webgl2'),frames=[],images=[];
    const switchCad=batched=>{for(const [source,record]of records){source.layers.mask=batched?0:record.mask;record.group.mesh.setVisibleAt(record.instance,batched&&record.visible);}};
    const draw=(mode,batched)=>{
      switchCad(batched);const endo=mode==='endo',camera=(endo?view.endoCamera:view.overviewCamera).clone();
      scene.background=new THREE.Color(endo?'#6b4a42':'#c2d0d0');scene.environmentIntensity=endo?.34:.80;r.toneMappingExposure=endo?1.10:1.0;view.cavity.children[0].visible=endo;
      const before=r.info.render.calls,at=performance.now();feed.capture(r,scene,camera,863,556);return{cpuMs:performance.now()-at,calls:r.info.render.calls-before};
    };
    const pixels=async(mode,batched)=>{
      draw(mode,batched);const {width,height}=feed.resolution,hdr=new Uint16Array(width*height*4);await r.readRenderTargetPixelsAsync(feed.target,0,0,width,height,hdr);
      const prior=r.getRenderTarget(),display=new Uint8Array(width*height*4);feed.outputMaterial.uniforms.toneMappingExposure.value=mode==='endo'?1.1:1;r.setRenderTarget(displayTarget);feed.blit(r,0,0,863,556);const pending=r.readRenderTargetPixelsAsync(displayTarget,0,0,width,height,display);r.setRenderTarget(prior);await pending;return{hdr,display};
    };
    const timed=async(mode,batched)=>{
      const query=ext?gl.createQuery():null;if(query)gl.beginQuery(ext.TIME_ELAPSED_EXT,query);const row=draw(mode,batched);if(query)gl.endQuery(ext.TIME_ELAPSED_EXT);
      if(query){try{const start=performance.now();while(!gl.getQueryParameter(query,gl.QUERY_RESULT_AVAILABLE)){if(performance.now()-start>3000)throw new Error('GPU timer timeout');await new Promise(resolve=>requestAnimationFrame(resolve));}row.gpuMs=gl.getParameter(ext.GPU_DISJOINT_EXT)?null:gl.getQueryParameter(query,gl.QUERY_RESULT)/1e6;}finally{gl.deleteQuery(query);}}
      return row;
    };
    try{
      for(const mode of ['endo','overview']){
        const original=await pixels(mode,false),batched=await pixels(mode,true);let different=0,maxAbs=0,sum=0,displayMax=0,displaySum=0,overThree=0;
        for(let i=0;i<original.hdr.length;i++){const d=Math.abs(THREE.DataUtils.fromHalfFloat(original.hdr[i])-THREE.DataUtils.fromHalfFloat(batched.hdr[i]));if(d)different++;maxAbs=Math.max(maxAbs,d);sum+=d;const e=Math.abs(original.display[i]-batched.display[i]);displayMax=Math.max(displayMax,e);displaySum+=e;if(e>3)overThree++;}
        images.push({mode,components:original.hdr.length,different,maxAbs,meanAbs:sum/original.hdr.length,displayMax,displayMean:displaySum/original.hdr.length,displayOverThree:overThree});
        for(let i=0;i<10;i++){const first=i%2===0;for(const batch of [first,!first]){const row=await timed(mode,batch);if(i>=2)frames.push({mode,batched:batch,...row});}}
      }
      const result={passed:images.every(row=>row.displayMean<.002&&row.displayOverThree/row.components<.0001),criterion:'All original CAD attributes, indices and articulated transforms are retained. Admit only Float32 transport rounding: mean8-bit error<.002 levels and<.01% components differing by>3levels in either view.',images,frames,sourceMeshes:records.length,sourceTriangles:records.reduce((n,[s])=>n+s.geometry.index.count/3,0),scope:feed.resolution,reserved:{width:feed.target.width,height:feed.target.height},samples:feed.target.samples,error:gl.getError()};
      button.dataset.result=JSON.stringify(result);button.textContent=result.passed?'原始 CAD 合批验证通过':'原始 CAD 合批验证失败';
    }catch(error){button.dataset.result=JSON.stringify({passed:false,error:String(error)});button.textContent='原始 CAD 合批验证失败';}
    finally{switchCad(true);feed.dispose();displayTarget.dispose();scene.background=saved.background;scene.environmentIntensity=saved.intensity;r.toneMappingExposure=saved.exposure;view.cavity.children[0].visible=saved.visible;button.disabled=false;}
  };
}
