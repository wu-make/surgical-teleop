import * as THREE from 'three';
import {BloodSurfaceFilm} from './blood-surface-film.js';

// Development-only real-WebGL comparison. Production never imports this UI,
// legacy shader or synthetic fixture, and never reads back rendering pixels.
export function attachBloodFilmVerification(view,pause){
  const button=document.createElement('button');button.id='verify-blood-shader';button.textContent='验证血膜着色器逐像素等价';document.getElementById('app').prepend(button);
  button.onclick=async()=>{
    button.disabled=true;pause(true);const renderer=view.renderer,scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(45,4/3,.001,1),width=512,height=384;
    const geometry=new THREE.SphereGeometry(.035,96,64),specimenGeometry=new THREE.SphereGeometry(.014,64,48),baseMaterial=new THREE.MeshPhysicalMaterial({color:'#943e35',roughness:.47});
    for(const g of [geometry,specimenGeometry]){g.setAttribute('tissueRestPosition',g.attributes.position.clone());g.computeBoundingBox();}
    const parent=new THREE.Mesh(geometry,baseMaterial),specimen=new THREE.Mesh(specimenGeometry,baseMaterial),piece={id:'fixture-piece',mesh:specimen,position:new THREE.Vector3(.054,0,0),quaternion:new THREE.Quaternion()};
    specimen.position.copy(piece.position);scene.add(parent,specimen);scene.environment=view.env;scene.background=new THREE.Color('#172326');camera.position.set(.023,.015,.18);camera.lookAt(.018,0,0);
    const tissue={_meshes:new Map([['parent',parent]]),fragments:{items:new Map([[piece.id,piece]])}},film=new BloodSurfaceFilm(tissue,{gpu:true,capacity:320});scene.add(film.mesh);
    const nodes=Array.from({length:320},(_,i)=>{const g=i<256?geometry:specimenGeometry,index=(i*97+331)%g.attributes.position.count;return{reference:new THREE.Vector3().fromBufferAttribute(g.attributes.position,index).toArray(),restNormal:new THREE.Vector3().fromBufferAttribute(g.attributes.normal,index).toArray(),fragmentId:i<256?null:piece.id,area:6.25+(i%5),physicalArea:6.25,volume:.04+(i%19)*.08,clot:(i%7)/7};});
    const target=new THREE.WebGLRenderTarget(width,height,{type:THREE.HalfFloatType}),savedTarget=renderer.getRenderTarget(),savedExposure=renderer.toneMappingExposure,legacy=new Map(),originals=new Map(),results=[];
    const eager=`vec4 a=texelFetch(filmFields,ivec2(i*3,0),0),b=texelFetch(filmFields,ivec2(i*3+1,0),0),c=texelFetch(filmFields,ivec2(i*3+2,0),0);
      vec3 delta=filmReference-a.xyz;float q=dot(delta,delta)/a.w;
      if(abs(filmOwner-c.y)>.1||q>=1.0||dot(filmRestNormal,b.xyz)<.15)continue;`;
    let replaced=0;
    const draw=async(mode)=>{
      for(const [mesh,original]of originals)mesh.material=mode==='legacy'?legacy.get(original):original;
      film.mesh.visible=mode!=='dry';renderer.setRenderTarget(target);renderer.render(scene,camera);
      const data=new Uint16Array(width*height*4),pending=renderer.readRenderTargetPixelsAsync(target,0,0,width,height,data);renderer.setRenderTarget(savedTarget);await pending;return data;
    };
    try{
      renderer.toneMappingExposure=1.1;
      for(let phase=0;phase<4;phase++){
        for(let i=0;i<nodes.length;i++){nodes[i].volume=(.04+(i%19)*.08)*(1+phase*.3);nodes[i].clot=((i+phase*2)%11)/11;}
        piece.quaternion.setFromAxisAngle(new THREE.Vector3(1,2,3).normalize(),phase*.18);specimen.quaternion.copy(piece.quaternion);film.update(nodes);
        film.mesh.traverse(mesh=>{if(!mesh.isMesh||originals.has(mesh))return;const original=mesh.material;originals.set(mesh,original);if(legacy.has(original))return;const copy=original.clone();copy.onBeforeCompile=shader=>{original.onBeforeCompile(shader);const pattern=/vec4 a=texelFetch\(filmFields,ivec2\(i\*3,0\),0\);[\s\S]*?if\(abs\(filmOwner-c.y\)>\.1\)continue;/;if(!pattern.test(shader.vertexShader))throw new Error('Optimized shader block missing');shader.vertexShader=shader.vertexShader.replace(pattern,eager);replaced++;};copy.customProgramCacheKey=()=>original.customProgramCacheKey()+'-eager-verification';legacy.set(original,copy);});
        const first=await draw('optimized'),a=await draw('optimized'),b=await draw('legacy'),again=await draw('legacy'),dry=await draw('dry');let different=0,wetComponents=0,optimizedRepeatDifferent=0,legacyRepeatDifferent=0,maxAbsolute=0;
        for(let i=0;i<a.length;i++){if(a[i]!==b[i]){different++;maxAbsolute=Math.max(maxAbsolute,Math.abs(THREE.DataUtils.fromHalfFloat(a[i])-THREE.DataUtils.fromHalfFloat(b[i])));}if(first[i]!==a[i])optimizedRepeatDifferent++;if(b[i]!==again[i])legacyRepeatDifferent++;if(a[i]!==dry[i])wetComponents++;}
        results.push({phase,components:a.length,different,wetComponents,optimizedRepeatDifferent,legacyRepeatDifferent,maxAbsolute,triangles:film.stats.triangles});
      }
      const result={three:THREE.REVISION,width,height,kernels:320,replaced,phases:results,exact:replaced>0&&results.every(r=>r.different===0&&r.wetComponents>0)};button.dataset.result=JSON.stringify(result);button.textContent=JSON.stringify(result);
    }catch(error){button.dataset.result=JSON.stringify({error:String(error)});button.textContent=String(error);}
    finally{for(const [mesh,original]of originals)mesh.material=original;renderer.setRenderTarget(savedTarget);renderer.toneMappingExposure=savedExposure;film.dispose();for(const m of legacy.values())m.dispose();geometry.dispose();specimenGeometry.dispose();baseMaterial.dispose();target.dispose();button.disabled=false;}
  };
}
