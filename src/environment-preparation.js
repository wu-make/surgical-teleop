import * as THREE from 'three';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';

// Three r180 fromScene(), unchanged resolution, blur sigmas, directions and
// sample kernels. Only scheduling differs. Keep the version guard because the
// public API cannot yield between its private Gaussian blur passes.
const phi=(1+Math.sqrt(5))/2,inv=1/phi;
const axes=[[-phi,inv,0],[phi,inv,0],[-inv,0,phi],[inv,0,phi],[0,phi,-inv],[0,phi,inv],[-1,1,-1],[1,1,-1],[-1,1,1],[1,1,1]].map(a=>new THREE.Vector3(...a));
export async function prepareEnvironment(renderer,{yieldFrame=()=>new Promise(resolve=>requestAnimationFrame(resolve)),onStage=()=>{}}={}){
  if(THREE.REVISION!=='180')throw new Error('Revalidate incremental PMREM before changing Three version');
  const saved={target:renderer.getRenderTarget(),face:renderer.getActiveCubeFace(),mip:renderer.getActiveMipmapLevel(),xr:renderer.xr.enabled,autoClear:renderer.autoClear,toneMapping:renderer.toneMapping};
  let generator,room,target,complete=false;
  const step=async(name,fn)=>{await yieldFrame();const start=performance.now();try{return await fn();}finally{onStage({name,start,end:performance.now()});}};
  try{
    await step('environment-allocate',()=>{generator=new THREE.PMREMGenerator(renderer);room=new RoomEnvironment();generator._setSize(256);target=generator._allocateTargets();target.depthBuffer=true;});
    renderer.xr.enabled=false;
    // Compile against the actual linear HDR target. Poll KHR parallel shader
    // compilation before rendering, rather than blocking at the first draw.
    await step('environment-compile-room',async()=>{renderer.setRenderTarget(target);renderer.toneMapping=THREE.NoToneMapping;await renderer.compileAsync(room,new THREE.PerspectiveCamera(90,1,.1,100));});
    const flat=new THREE.OrthographicCamera();
    await step('environment-compile-blur',()=>renderer.compileAsync(new THREE.Mesh(generator._lodPlanes[0],generator._blurMaterial),flat));
    await step('environment-cube-faces',()=>generator._sceneToCubeUV(room,.1,100,target,new THREE.Vector3()));
    await step('environment-initial-blur',()=>generator._blur(target,0,0,.04));
    renderer.autoClear=false;
    const n=generator._lodPlanes.length;
    for(let i=1;i<n;i++){
      const sigma=Math.sqrt(generator._sigmas[i]**2-generator._sigmas[i-1]**2),axis=axes[(n-i-1)%axes.length];
      await step('environment-blur-'+i,()=>generator._blur(target,i-1,i,sigma,axis));
    }
    target.scissorTest=false;target.viewport.set(0,0,target.width,target.height);target.scissor.set(0,0,target.width,target.height);
    complete=true;return target;
  }finally{
    renderer.setRenderTarget(saved.target,saved.face,saved.mip);renderer.xr.enabled=saved.xr;renderer.autoClear=saved.autoClear;renderer.toneMapping=saved.toneMapping;
    generator?.dispose();room?.dispose();if(!complete)target?.dispose();
  }
}
