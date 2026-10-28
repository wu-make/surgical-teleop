import test from 'node:test';
import assert from 'node:assert/strict';
import {FramePresentation} from '../src/frame-presentation.js';

function fixture(){
  const calls=[],images=[],listeners=new Map(),gl={isContextLost:()=>false};
  const display={transferFromImageBitmap(bitmap){assert(bitmap);bitmap.consumed=true;calls.push(['commit',bitmap]);}};
  const canvas={width:1,height:1,getContext:type=>type==='bitmaprenderer'?display:null,dispatchEvent:event=>calls.push(['event',event.type])};
  class Offscreen{constructor(width,height){this.width=width;this.height=height;}getContext(type,options){calls.push(['context',type,options]);return gl;}transferToImageBitmap(){const image={width:this.width,height:this.height,closed:false,close(){this.closed=true;}};images.push(image);return image;}addEventListener(type,fn){listeners.set(type,fn);}removeEventListener(type,fn){if(listeners.get(type)===fn)listeners.delete(type);}}
  return{calls,images,listeners,gl,canvas,Offscreen};
}

test('complete native-size images transfer ownership while the visible canvas retains its last committed image',()=>{
  const f=fixture(),p=new FramePresentation(f.canvas,{Offscreen:f.Offscreen});
  assert.equal(p.mode,'retained-bitmap');assert.equal(p.rendererOptions.preserveDrawingBuffer,false);assert.equal(p.rendererOptions.antialias,true);assert.equal(p.rendererOptions.context,f.gl);
  p.renderCanvas.width=949;p.renderCanvas.height=612;assert.equal(p.present(),true);
  const image=f.images[0];assert.equal(image.consumed,true);assert.equal(image.closed,false,'the display owns the completed image; it must not be closed after transfer');assert.equal(f.canvas.width,949);assert.equal(f.canvas.height,612);
  p.renderCanvas.width=1920;p.renderCanvas.height=1080;
  assert.equal(f.calls.filter(x=>x[0]==='commit').length,1,'preparing a new render size does not clear or replace the display');
  p.present();assert.equal(f.images.length,2);assert.equal(f.canvas.width,1920);assert.equal(p.metrics.frames,2);
});

test('context loss and invalid frames never replace the last completed image with a blank bitmap',()=>{
  const f=fixture(),p=new FramePresentation(f.canvas,{Offscreen:f.Offscreen});p.present();f.gl.isContextLost=()=>true;
  assert.equal(p.present(),false);assert.equal(f.images.length,1);assert.equal(f.calls.filter(x=>x[0]==='commit').length,1);
  f.gl.isContextLost=()=>false;p.renderCanvas.width=0;assert.equal(p.present(),false);assert.equal(f.images.at(-1).closed,true);assert.equal(f.calls.filter(x=>x[0]==='commit').length,1);
  assert.equal(p.metrics.skippedFrames,2);
});

test('fallback uses the same retained, antialiased WebGL canvas without an unsupported transport',()=>{
  const canvas={width:949,height:612},p=new FramePresentation(canvas,{Offscreen:null});assert.equal(p.mode,'retained-webgl');assert.equal(p.renderCanvas,canvas);assert.equal(p.rendererOptions.preserveDrawingBuffer,true);assert.equal(p.rendererOptions.antialias,true);p.present();assert.equal(p.frames,1);
});

test('a rejected offscreen context leaves a working retained HTML-canvas fallback',()=>{
  const canvas={width:949,height:612},p=new FramePresentation(canvas,{Offscreen:class{constructor(){throw new Error('offscreen rendering unavailable');}}});assert.equal(p.mode,'retained-webgl');assert.equal(p.rendererOptions.canvas,canvas);assert.equal(p.rendererOptions.preserveDrawingBuffer,true);
});

test('offscreen context recovery is forwarded and every event listener is removed on disposal',()=>{
  const f=fixture(),p=new FramePresentation(f.canvas,{Offscreen:f.Offscreen});p.forwardContextEvents();let prevented=false;
  f.listeners.get('webglcontextlost')({preventDefault(){prevented=true;}});f.listeners.get('webglcontextrestored')({});assert(prevented);assert.deepEqual(f.calls.filter(x=>x[0]==='event').map(x=>x[1]),['webglcontextlost','webglcontextrestored']);p.dispose();assert.equal(f.listeners.size,0);
});
