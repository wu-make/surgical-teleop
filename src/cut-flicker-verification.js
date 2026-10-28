import * as THREE from 'three';
import {ScopeFeed} from './scope-feed.js';
import {yieldPreparationTask} from './preparation-task.js';

// Development-only, actual liver/CAD/worker replay. Readbacks are diagnostic
// work and are never counted as an interactive performance acceptance run.
export function attachCutFlickerVerification(view,sim,interaction,pause,options){
  const {advance}=options;
  const button=document.createElement('button');button.id='verify-cut-flicker';button.textContent='逐帧检查右剪 C：原始组织 / 合批组织';document.getElementById('app').prepend(button);
  const send=(name,data,type='application/json')=>fetch('/__qa__/'+name,{method:'POST',headers:{'Content-Type':type},body:type==='application/json'?JSON.stringify(data):data});
  const rows=[],frames=[];let running=false,clock=performance.now();
  const recordFrame=(now,keys)=>{
    if(!running)return;
    const s=sim.state.scope;
    frames.push({now,keys:[...keys],scope:{position:[...s.position],lookAt:[...s.lookAt],target:[...s.target],depth:s.depth,fov:s.fov,autoDepthTarget:s.autoDepthTarget},camera:view.endoCamera.position.toArray(),tools:{left:[...sim.state.tools.left.position],right:[...sim.state.tools.right.position],jaw:sim.state.tools.right.jaw},cutCount:view.tissue._cuts.length,receivedAt:view.tissue.updateTimings.receivedAt,stage:{width:view.stage.clientWidth,height:view.stage.clientHeight},frame:view.renderFrame,timings:{...view.renderTimings}});
  };
  const status=async data=>{button.dataset.result=JSON.stringify(data);await send('v38-flicker-progress.json',data);};
  const layoutProbe=async()=>{
    const iframe=document.createElement('iframe');iframe.style.cssText='position:fixed;left:-10000px;top:0;border:0;visibility:hidden';
    const styles=[...document.querySelectorAll('style')].map(s=>s.outerHTML).join(''),clone=document.getElementById('app').cloneNode(true);
    iframe.srcdoc=`<!doctype html><html><head><base href="${document.baseURI}">${styles}</head><body>${clone.outerHTML}</body></html>`;
    const ready=new Promise(resolve=>iframe.onload=resolve);document.body.append(iframe);await ready;const d=iframe.contentDocument,result=[];
    try{for(const [width,height]of [[327,576],[419,680],[901,612],[949,612],[1366,768],[1904,944]]){
      iframe.style.width=width+'px';iframe.style.height=height+'px';
      for(const text of ['右剪已待命：让组织位于剪口之间，再按 C 闭合','正在完成已执行的剪切，请稍候','此处已切开，请沿组织连接继续移动右剪','实际剪刃尚未碰到组织，请移动或旋转右剪贴近薄片','剪刃附近未检出可移除组织，请调整刃角度后重试']){
        d.getElementById('left-contact').textContent='已抓持 · 牵拉 27.7 mm';d.getElementById('right-contact').textContent=text;
        const s=d.getElementById('stage'),strip=d.querySelector('.contact-strip');result.push({width,height,text,stageWidth:s.clientWidth,stageHeight:s.clientHeight,contactHeight:strip.getBoundingClientRect().height});
      }
    }}finally{iframe.remove();}
    await send('v38-layout-probe.json',result);return result;
  };
  const retentionProbe=async()=>{
    const r=view.renderer,gl=r.getContext();let expected;
    const present=view.presentation.present;
    view.presentation.present=function(){const size=r.getDrawingBufferSize(new THREE.Vector2());expected=new Uint8Array(size.x*size.y*4);gl.readPixels(0,0,size.x,size.y,gl.RGBA,gl.UNSIGNED_BYTE,expected);return present.call(this);};
    try{view.render();}finally{view.presentation.present=present;}
    const read=async()=>{const bitmap=await createImageBitmap(view.canvas),size={x:bitmap.width,y:bitmap.height},c=new OffscreenCanvas(size.x,size.y),x=c.getContext('2d',{willReadFrequently:true});x.drawImage(bitmap,0,0);bitmap.close();const p=x.getImageData(0,0,size.x,size.y).data;let colored=0,opaque=0,sum=0,maxDifference=0,different=0;for(let y=0;y<size.y;y++)for(let x=0;x<size.x;x++){const i=(y*size.x+x)*4,j=((size.y-y-1)*size.x+x)*4;if(p[i]||p[i+1]||p[i+2])colored++;if(p[i+3])opaque++;sum+=p[i]+p[i+1]+p[i+2];for(let k=0;k<4;k++){const d=Math.abs(p[i+k]-expected[j+k]);maxDifference=Math.max(maxDifference,d);if(d)different++;}}return{width:size.x,height:size.y,coloredPixels:colored,opaquePixels:opaque,meanRGB:sum/(size.x*size.y*3),maxDifference,different,error:gl.getError()};};
    const immediate=await read(),delayed=[];
    for(let i=0;i<4;i++){await new Promise(resolve=>requestAnimationFrame(resolve));delayed.push(await read());}
    const result={context:gl.getContextAttributes(),presentation:view.presentation.metrics,immediate,delayed};await send('v38-canvas-retention.json',result);view.render();return result;
  };
  button.onclick=async()=>{
    if(running)return;running=true;button.disabled=true;pause(true);options.setExclusive(true);
    const r=view.renderer,scene=view.scene,feed=new ScopeFeed(r),width=949,height=612;
    const output=new THREE.WebGLRenderTarget(width,height,{depthBuffer:false});feed.reserve(r,width/r.getPixelRatio(),height/r.getPixelRatio());
    const gl=r.getContext(),saved={background:scene.background,intensity:scene.environmentIntensity,exposure:r.toneMappingExposure,cavity:view.cavity.children[0].visible};
    const tissueRecords=()=>[...(view.exactBatches?.records??[])].filter(([m])=>m.userData.tissue||m.geometry.attributes.tissueRestPosition);
    const switchPath=original=>{for(const [m,b]of tissueRecords()){m.layers.mask=original?b.mask:0;b.group.mesh.setVisibleAt(b.instance,!original&&b.visible);}};
    const draw=async(original,{save=null}={})=>{
      switchPath(original);scene.background=new THREE.Color('#6b4a42');scene.environmentIntensity=.34;r.toneMappingExposure=1.10;view.cavity.children[0].visible=true;
      feed.capture(r,scene,view.endoCamera.clone(),width/r.getPixelRatio(),height/r.getPixelRatio());
      const old=r.getRenderTarget();r.setRenderTarget(output);feed.blit(r,0,0,width/r.getPixelRatio(),height/r.getPixelRatio());
      const pixels=new Uint8Array(width*height*4);await r.readRenderTargetPixelsAsync(output,0,0,width,height,pixels);r.setRenderTarget(old);
      if(save){const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;const x=canvas.getContext('2d'),image=x.createImageData(width,height);for(let y=0;y<height;y++)image.data.set(pixels.subarray(y*width*4,(y+1)*width*4),(height-y-1)*width*4);x.putImageData(image,0,0);await send(save,await new Promise(resolve=>canvas.toBlob(resolve,'image/png')),'image/png');}
      return pixels;
    };
    const difference=(a,b)=>{let sum=0,maximum=0,over8=0;for(let i=0;i<a.length;i++){const d=Math.abs(a[i]-b[i]);sum+=d;maximum=Math.max(maximum,d);if(d>8)over8++;}return{mean:sum/a.length,maximum,over8,components:a.length};};
    const intensity=p=>{let sum=0,dark=0;for(let i=0;i<p.length;i+=4){const v=p[i]+p[i+1]+p[i+2];sum+=v;if(v<12)dark++;}return{meanRGB:sum/(p.length/4*3),darkPixels:dark};};
    const readComplete=()=>{let pixels;const present=view.presentation.present;view.presentation.present=function(){pixels=new Uint8Array(width*height*4);gl.readPixels(0,0,width,height,gl.RGBA,gl.UNSIGNED_BYTE,pixels);return present.call(this);};try{view.render();return pixels;}finally{view.presentation.present=present;}};
    const saveComplete=async(pixels,name)=>{const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;const x=canvas.getContext('2d'),out=x.createImageData(width,height);for(let y=0;y<height;y++)out.data.set(pixels.subarray(y*width*4,(y+1)*width*4),(height-y-1)*width*4);x.putImageData(out,0,0);await send(name,await new Promise(resolve=>canvas.toBlob(resolve,'image/png')),'image/png');};
    const check=async label=>{
      view.update(sim.state,0);const committedFirst=readComplete(),committedRepeat=readComplete(),firstFrameRepeat=difference(committedFirst,committedRepeat);
      if(firstFrameRepeat.mean>.001){await saveComplete(committedFirst,`v38-commit-${label.toLowerCase()}-first.png`);await saveComplete(committedRepeat,`v38-commit-${label.toLowerCase()}-repeat.png`);}
      const original=await draw(true),batch=await draw(false),repeat=await draw(false);
      const row={label,cutCount:view.tissue._cuts.length,receivedAt:view.tissue.updateTimings.receivedAt,firstFrameRepeat,originalIntensity:intensity(original),batchIntensity:intensity(batch),camera:view.endoCamera.position.toArray(),target:[...sim.state.scope.lookAt],originalVsBatch:difference(original,batch),repeatBatch:difference(batch,repeat),glError:gl.getError(),tissue:structuredClone(view.tissue.updateTimings)};
      rows.push(row);await status({phase:label,rows,frames});
      if(label==='restored'||label==='closed-final'){await draw(true,{save:`v38-${label}-original.png`});await draw(false,{save:`v38-${label}-batch.png`});}
      switchPath(false);return row;
    };
    const step=async(keys,count)=>{for(let i=0;i<count;i++){await settle();sim.state.paused=true;if(!await advance(keys,clock+=1000/60))throw new Error('Shared single-step rejected a ready cut frame');recordFrame(clock,keys);await yieldPreparationTask();}};
    const settle=async()=>{
      sim.state.paused=false;
      try{for(let i=0;i<1000&&(view.tissue.busy||interaction.cuttingBusy);i++){
        if(view.tissue.busy)await new Promise(resolve=>view.tissue.worker.addEventListener('message',resolve,{once:true}));
        else await interaction.update(1/60);
        await yieldPreparationTask();
      }}finally{sim.state.paused=true;}
    };
    try{
      await layoutProbe();
      await retentionProbe();
      await status({phase:'loading-fixture',rows});
      const snapshot=await(await fetch('/__qa__/fixture')).json();sim.state=structuredClone(snapshot.state.state);sim.state.paused=true;
      await interaction.restore(snapshot.interaction);sim.select('right');sim.setCutting(true);view.update(sim.state,0);view.render();
      // Warm both real drawing paths before comparing their actual pixels.
      for(let i=0;i<2;i++){await draw(true);await draw(false);}await check('restored');
      await step(['KeyV'],45);await settle();await check('opened');
      for(let i=0;i<6;i++){await step(['KeyC'],8);await settle();await check('closure-'+i);}
      await step([],1);await settle();await check('closed-final');
      // A closed blade moving below the capsule is a separate regression from
      // merely closing a stationary jaw. Preserve exact source/batch pixels at
      // each material edit, including the raised/deformed fixture.
      if(new URLSearchParams(location.search).has('closed-cut-motion')){
        for(const [key,count]of [['KeyQ',16],['KeyA',32],['KeyW',24],['KeyD',64],['KeyS',24],['KeyE',16],['KeyA',32]]){
          for(let i=0;i<count;i+=8){await step([key],8);await settle();await check(`closed-move-${key}-${i}`);}
        }
      }
      const result={complete:true,rows,frames,errors:rows.filter(row=>row.glError),scope:{width,height,hdr:feed.target.texture.type===THREE.HalfFloatType,samples:feed.target.samples},interpretation:'Same real cut/pose/camera/light at each comparison. Actual application key, camera, clearance and rendering loop drives closure. Diagnostic readback and pacing are excluded from FPS acceptance.'};
      await send('v38-flicker-result.json',result);button.dataset.result=JSON.stringify(result);button.textContent='右剪 C 像素检查完成';
    }catch(error){await status({error:String(error),stack:error.stack,rows});button.textContent='右剪 C 像素检查未完成';}
    finally{sim.state.paused=true;switchPath(false);Object.assign(scene,{background:saved.background,environmentIntensity:saved.intensity});r.toneMappingExposure=saved.exposure;view.cavity.children[0].visible=saved.cavity;feed.dispose();output.dispose();view.render();button.disabled=false;running=false;}
    if(new URLSearchParams(location.search).has('auto-cut-flicker')&&!new URLSearchParams(location.search).has('closed-cut-motion')){const {verifyCompleteWorkflow}=await import('./workflow-verification.js');await verifyCompleteWorkflow(view,sim,interaction,pause,options);}
    else options.setExclusive(false);
  };
  if(new URLSearchParams(location.search).has('auto-cut-flicker'))void button.onclick();
}
