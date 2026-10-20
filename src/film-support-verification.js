// Development-only readback of the actual full scene, at its actual render size.
export function attachFilmSupportVerification(view,pause){
  const button=document.createElement('button');button.id='verify-film-support';button.textContent='验证完整血膜与透明面剔除逐像素等价';document.getElementById('app').prepend(button);
  button.onclick=async()=>{
    if(view.tissue.busy){button.dataset.result=JSON.stringify({deferred:true,reason:'Wait for the real in-flight geometry result before comparing frozen frames.'});return;}
    button.disabled=true;pause(true);const r=view.renderer,gl=r.getContext(),layers=[...view.tissue.blood.surfaceFilm.overlays.values(),...view.tissue.blood.pooledFilm.overlays.values()],saved=layers.map(l=>({index:l.overlay.geometry.index,count:l.overlay.geometry.drawRange.count})),mode=view.mode,results=[];
    try{
      for(const nextMode of ['endo','overview']){
        view.setMode(nextMode);const draws=[];
        for(const full of [false,true]){
          layers.forEach((l,i)=>{l.overlay.geometry.setIndex(full?l.overlay.geometry.userData.fullFilmIndex:saved[i].index);l.overlay.geometry.setDrawRange(0,full?Infinity:saved[i].count);});view.render();
          const {width,height}=view.renderFrame,pixels=new Uint8Array(width*height*4);gl.readPixels(0,0,width,height,gl.RGBA,gl.UNSIGNED_BYTE,pixels);
          const size=view.scopeFeed.resolution,hdr=new Uint16Array(size.width*size.height*4);await r.readRenderTargetPixelsAsync(view.scopeFeed.target,0,0,size.width,size.height,hdr);draws.push({pixels,hdr,width,height,scope:{...size},error:gl.getError()});
        }
        const compare=(a,b)=>{let different=0;for(let i=0;i<a.length;i++)if(a[i]!==b[i])different++;return{components:a.length,different};};
        results.push({mode:nextMode,width:draws[0].width,height:draws[0].height,scope:draws[0].scope,display:compare(draws[0].pixels,draws[1].pixels),hdr:compare(draws[0].hdr,draws[1].hdr),errors:draws.map(d=>d.error)});
      }
      const result={layers:layers.length,sourceTriangles:layers.reduce((s,l)=>s+l.overlay.geometry.userData.fullFilmIndex.count/3,0),submittedTriangles:saved.reduce((s,i)=>s+i.count/3,0),samples:view.scopeFeed.target.samples,results,passed:layers.length>0&&results.every(x=>!x.display.different&&!x.hdr.different&&x.errors.every(e=>e===0))};button.dataset.result=JSON.stringify(result);button.textContent=JSON.stringify(result);
    }catch(error){button.dataset.result=JSON.stringify({error:String(error)});}
    finally{layers.forEach((l,i)=>{l.overlay.geometry.setIndex(saved[i].index);l.overlay.geometry.setDrawRange(0,saved[i].count);});view.setMode(mode);button.disabled=false;}
  };
}
