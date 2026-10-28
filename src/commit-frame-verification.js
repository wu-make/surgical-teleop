// DEV-only readback of the very first draw after real worker mesh delivery.
// A later frozen A/B render cannot detect a one-frame upload/visibility error.
export function probeCommittedFrames(view,report,send){
  const original=view.presentation.present,gl=view.renderer.getContext(),jobs=[];let seen=view.tissue._contactRevision,comparing=false,repeated=null,saved=0;
  report.commits=[];
  const read=()=>{const width=view.presentation.renderCanvas.width,height=view.presentation.renderCanvas.height,pixels=new Uint8Array(width*height*4);gl.readPixels(0,0,width,height,gl.RGBA,gl.UNSIGNED_BYTE,pixels);return{width,height,pixels};};
  const save=async(frame,name)=>{const c=document.createElement('canvas');c.width=frame.width;c.height=frame.height;const x=c.getContext('2d'),data=x.createImageData(c.width,c.height);for(let y=0;y<c.height;y++)data.data.set(frame.pixels.subarray(y*c.width*4,(y+1)*c.width*4),(c.height-y-1)*c.width*4);x.putImageData(data,0,0);await send(name,await new Promise(resolve=>c.toBlob(resolve,'image/png')),'image/png');};
  view.presentation.present=function(){
    if(comparing){repeated=read();return original.call(this);}
    const revision=view.tissue._contactRevision;
    if(revision===seen)return original.call(this);seen=revision;
    const first=read(),result=original.call(this);comparing=true;
    try{view.render();}finally{comparing=false;}
    let total=0,maximum=0,over8=0,blackPulsePixels=0;
    for(let i=0;i<first.pixels.length;i++){const d=Math.abs(first.pixels[i]-repeated.pixels[i]);total+=d;maximum=Math.max(maximum,d);if(d>8)over8++;}
    for(let i=0;i<first.pixels.length;i+=4){const a=first.pixels[i]+first.pixels[i+1]+first.pixels[i+2],b=repeated.pixels[i]+repeated.pixels[i+1]+repeated.pixels[i+2];if(a<12&&b>72||b<12&&a>72)blackPulsePixels++;}
    const row={at:performance.now(),revision,cuts:view.tissue._cuts.length,mean:total/first.pixels.length,maximum,over8,blackPulsePixels,glError:gl.getError()};report.commits.push(row);
    if(row.mean>.001&&saved<8){const name='v39-commit-'+saved++;jobs.push(save(first,name+'-first.png'),save(repeated,name+'-repeat.png'));}
    return result;
  };
  return async()=>{view.presentation.present=original;await Promise.all(jobs);};
}
