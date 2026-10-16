import * as THREE from 'three';

/** Procedural 3-D capsule/grain detail, attached to material coordinates. These
 * are display cues, not reconstructed vessels or patient-specific histology. */
export function createTissueMaterial() {
  const material = new THREE.MeshPhysicalMaterial({
    vertexColors: true, roughness: 0.43, metalness: 0,
    clearcoat: 0.19, clearcoatRoughness: 0.32, envMapIntensity: 0.65,
  });
  material.onBeforeCompile = shader => {
    shader.vertexShader = `attribute vec3 tissueRestPosition;
attribute float tissueCutMask;
varying vec3 vTissuePosition;
varying float vTissueCut;
` + shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', `#include <begin_vertex>
vTissuePosition = tissueRestPosition;
vTissueCut = tissueCutMask;`);
    shader.fragmentShader = `varying vec3 vTissuePosition;
varying float vTissueCut;
float tissueHash(vec3 p) { p = fract(p * .1031); p += dot(p, p.yxz + 33.33); return fract((p.x + p.y) * p.z); }
float tissueNoise(vec3 p) {
  vec3 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
  return mix(mix(mix(tissueHash(i), tissueHash(i+vec3(1,0,0)), f.x),
                 mix(tissueHash(i+vec3(0,1,0)), tissueHash(i+vec3(1,1,0)), f.x), f.y),
             mix(mix(tissueHash(i+vec3(0,0,1)), tissueHash(i+vec3(1,0,1)), f.x),
                 mix(tissueHash(i+vec3(0,1,1)), tissueHash(i+vec3(1,1,1)), f.x), f.y), f.z);
}
float tissueVeins(vec3 p) {
  vec3 q=p*170.0;
  float warp=sin(q.y*.63+sin(q.z*.49))*.9;
  float trunk=abs(sin(q.x*.64+sin(q.z*.72)*1.4+q.y*.33+warp));
  float twigs=abs(sin(q.z*1.8+sin(q.x*1.13+q.y)*1.2+warp));
  float broad=(1.0-smoothstep(.006,.025,trunk));
  float fine=(1.0-smoothstep(.008,.03,twigs))*smoothstep(.1,.8,sin(q.x*.8+q.y*.73)*.5+.5);
  return max(broad*.42,fine*.24);
}
` + shader.fragmentShader;
    shader.fragmentShader = shader.fragmentShader.replace('#include <color_fragment>', `#include <color_fragment>
float tissueCut=clamp(vTissueCut,0.0,1.0);
float tissueLobules=tissueNoise(vTissuePosition*1150.0);
float tissueMottle=tissueNoise(vTissuePosition*230.0+9.1);
float tissueVessel=tissueVeins(vTissuePosition)*(1.0-tissueCut);
vec3 tissueCapsule=mix(vec3(.82,.84,.90),vec3(1.11,1.04,.91),tissueMottle);
tissueCapsule*=1.0-tissueVessel*.18;
vec3 tissueParenchyma=mix(vec3(.78,.74,.70),vec3(1.12,1.02,1.0),tissueLobules);
diffuseColor.rgb*=mix(tissueCapsule,tissueParenchyma,tissueCut);
diffuseColor.rgb*=.93+.13*tissueLobules;`);
    shader.fragmentShader = shader.fragmentShader.replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
roughnessFactor=clamp(roughnessFactor+vTissueCut*.15+(tissueLobules-.5)*.065,.25,.72);`);
    shader.fragmentShader = shader.fragmentShader.replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
float tissueHeight=(tissueLobules-.5)*mix(.000045,.00012,clamp(vTissueCut,0.0,1.0));
tissueHeight+=tissueVessel*.000015;
vec3 tissueDx=dFdx(-vViewPosition), tissueDy=dFdy(-vViewPosition);
vec3 tissueR1=cross(tissueDy,normal), tissueR2=cross(normal,tissueDx);
float tissueDet=dot(tissueDx,tissueR1);
vec3 tissueGrad=sign(tissueDet)*(dFdx(tissueHeight)*tissueR1+dFdy(tissueHeight)*tissueR2);
normal=normalize(abs(tissueDet)*normal-tissueGrad);`);
  };
  material.customProgramCacheKey = () => 'anatomical-tissue-capsule-v2';
  return material;
}
