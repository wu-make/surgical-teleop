// Keep the visible canvas independent of a discardable WebGL backbuffer.
// A complete, native-size GPU image changes ownership only after both views
// have finished. No readPixels, CPU encoding, resampling or old-frame replay.
export class FramePresentation {
  constructor(canvas,{Offscreen=globalThis.OffscreenCanvas}={}){
    this.canvas=canvas;this.renderCanvas=canvas;this.mode='retained-webgl';this.frames=0;this.skippedFrames=0;this.totalMs=0;this.maxMs=0;this.listeners=[];
    const attributes={antialias:true,powerPreference:'high-performance',preserveDrawingBuffer:false};
    if(Offscreen)try{
      const offscreen=new Offscreen(1,1);
      if(typeof offscreen.transferToImageBitmap==='function'){
        const gl=offscreen.getContext('webgl2',attributes);
        if(gl){const display=canvas.getContext('bitmaprenderer');if(display?.transferFromImageBitmap){this.renderCanvas=offscreen;this.display=display;this.context=gl;this.mode='retained-bitmap';}}
      }
    }catch{/* Unsupported/disabled offscreen rendering retains the HTML WebGL canvas. */}
    this.rendererOptions={canvas:this.renderCanvas,...attributes,preserveDrawingBuffer:this.mode==='retained-webgl'};
    if(this.context)this.rendererOptions.context=this.context;
  }
  forwardContextEvents(){
    if(this.renderCanvas===this.canvas)return;
    // Register after Three's own listeners, so restoration has rebuilt its
    // internal state before the application's recovery handler compiles.
    for(const type of ['webglcontextlost','webglcontextrestored']){
      const listener=event=>{if(type==='webglcontextlost')event.preventDefault();this.canvas.dispatchEvent(new Event(type,{cancelable:true}));};
      this.renderCanvas.addEventListener(type,listener);this.listeners.push([type,listener]);
    }
  }
  present(){
    if(!this.display){this.frames++;return true;}
    if(this.context.isContextLost?.()){this.skippedFrames++;return false;}
    const start=performance.now(),bitmap=this.renderCanvas.transferToImageBitmap();
    if(!bitmap.width||!bitmap.height){bitmap.close();this.skippedFrames++;return false;}
    try{
      if(this.canvas.width!==bitmap.width)this.canvas.width=bitmap.width;
      if(this.canvas.height!==bitmap.height)this.canvas.height=bitmap.height;
      this.display.transferFromImageBitmap(bitmap);
    }catch(error){bitmap.close();throw error;}
    const ms=performance.now()-start;this.frames++;this.totalMs+=ms;this.maxMs=Math.max(this.maxMs,ms);return true;
  }
  get metrics(){return{mode:this.mode,frames:this.frames,skippedFrames:this.skippedFrames,totalMs:this.totalMs,maxMs:this.maxMs,meanMs:this.frames?this.totalMs/this.frames:0,width:this.canvas.width,height:this.canvas.height};}
  dispose(){for(const [type,fn]of this.listeners)this.renderCanvas.removeEventListener(type,fn);this.listeners.length=0;}
}
