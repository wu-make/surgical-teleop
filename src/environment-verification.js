import * as THREE from 'three';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';

// Development-only UI check; Vite removes the import from the published app.
export function attachEnvironmentVerification(view,pause){
  const button=document.createElement('button');button.id='verify-environment';button.textContent='验证完整 HDR 环境像素';document.getElementById('app').prepend(button);
  button.onclick=async()=>{
    button.disabled=true;pause(true);const r=view.renderer,room=new RoomEnvironment(),generator=new THREE.PMREMGenerator(r);let reference;
    try{
      reference=generator.fromScene(room,.04);
      const n=reference.width*reference.height*4,a=new Uint16Array(n),b=new Uint16Array(n);
      await r.readRenderTargetPixelsAsync(reference,0,0,reference.width,reference.height,a);
      await r.readRenderTargetPixelsAsync(view.env,0,0,view.env.width,view.env.height,b);
      let different=0,maxAbsolute=0,nonzero=0;
      for(let begin=0;begin<n;begin+=65536){for(let i=begin;i<Math.min(begin+65536,n);i++){if(a[i])nonzero++;if(a[i]!==b[i]){different++;maxAbsolute=Math.max(maxAbsolute,Math.abs(THREE.DataUtils.fromHalfFloat(a[i])-THREE.DataUtils.fromHalfFloat(b[i])));}}await new Promise(resolve=>requestAnimationFrame(resolve));}
      const result={three:THREE.REVISION,width:reference.width,height:reference.height,components:n,nonzero,different,maxAbsolute,exact:different===0};button.dataset.result=JSON.stringify(result);button.textContent=JSON.stringify(result);
    }catch(error){button.dataset.result=JSON.stringify({error:String(error)});button.textContent=String(error);}
    finally{reference?.dispose();generator.dispose();room.dispose();button.disabled=false;}
  };
}
