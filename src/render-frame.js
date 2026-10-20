// An explicit native-pixel workload for reproducible profiling in a small pane.
// Only its CSS preview shrinks. Both cameras, HDR/MSAA and every simulation step
// still run at the requested full frame extent; no window/viewport API is used.
export function fixedRenderFrame(search=''){
  return new URLSearchParams(search).get('render-size')==='949x612'?{width:949,height:612}:null;
}
export function frameLayout(stage,mini,pixelRatio,fixed=null){
  if(fixed){
    const width=fixed.width/pixelRatio,height=fixed.height/pixelRatio;
    const mw=width*.29,mh=height*.30;
    return{width,height,mini:{x:width-18-mw,y:height-77-mh,width:mw,height:mh},fixed:true};
  }
  const width=stage.clientWidth,height=stage.clientHeight,s=stage.getBoundingClientRect(),m=mini.getBoundingClientRect();
  return{width,height,mini:{x:m.left-s.left,y:height-(m.top-s.top)-m.height,width:m.width,height:m.height},fixed:false};
}
export function styleFixedPreview(stage,mini,pixelRatio,fixed){
  if(!fixed)return;
  const {width,height}=frameLayout(null,null,pixelRatio,fixed);
  Object.assign(stage.style,{aspectRatio:`${fixed.width} / ${fixed.height}`,height:'auto',minHeight:'0'});
  Object.assign(mini.style,{right:`${18/width*100}%`,top:`${77/height*100}%`,width:'29%',height:'30%',minWidth:'0',minHeight:'0'});
  stage.dataset.renderSize=`${fixed.width}x${fixed.height}`;
}
