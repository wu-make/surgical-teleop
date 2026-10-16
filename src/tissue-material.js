import * as THREE from 'three';

// Display-scale procedural cues, not patient-derived vessels or histology.
// Coordinates remain in the anatomical frame when a piece is moved or rotated.
// Material-space fields stay fixed to cut tissue and detached specimens.
// Restrained brown/purple capsule and granular fresh parenchyma are separate
// optical surfaces; they never repeat a painted organ silhouette inside a cut.
const DETAIL_FUNCTIONS = /* glsl */`
varying vec3 vTissuePosition;
varying float vTissueCut;
float tissueHash(vec3 p) {
  p=fract(p*.1031);p+=dot(p,p.yxz+33.33);
  return fract((p.x+p.y)*p.z);
}
vec3 tissueHash3(vec3 p) {
  p=fract(p*vec3(.1031,.1030,.0973));p+=dot(p,p.yxz+33.33);
  return fract((p.xxy+p.yzz)*p.zyx);
}
float tissueNoise(vec3 p) {
  vec3 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);
  return mix(mix(mix(tissueHash(i),tissueHash(i+vec3(1,0,0)),f.x),
                 mix(tissueHash(i+vec3(0,1,0)),tissueHash(i+vec3(1,1,0)),f.x),f.y),
             mix(mix(tissueHash(i+vec3(0,0,1)),tissueHash(i+vec3(1,0,1)),f.x),
                 mix(tissueHash(i+vec3(0,1,1)),tissueHash(i+vec3(1,1,1)),f.x),f.y),f.z);
}
`;

const COLOUR_DETAIL = /* glsl */`
#include <color_fragment>
float tissueCut=smoothstep(.06,.62,clamp(vTissueCut,0.0,1.0));
float tissueFootprint=max(length(dFdx(vTissuePosition)),length(dFdy(vTissuePosition)));
float tissueGrainVisibility=1.0-smoothstep(.00035,.00120,tissueFootprint);
float tissueMicroVisibility=1.0-smoothstep(.00009,.00035,tissueFootprint);
float tissueMottle=tissueNoise(vTissuePosition*92.0+vec3(7.3,2.1,11.8));
float tissueMesoscopic=tissueNoise(vTissuePosition*340.0+vec3(3.7,12.4,2.8));
vec3 tissueGrainCoordinate=vec3(dot(vTissuePosition,vec3(.36,.80,.48)),dot(vTissuePosition,vec3(-.80,.52,-.30)),dot(vTissuePosition,vec3(-.48,-.30,.824)))*1800.0
                         +vec3(tissueMesoscopic,tissueMottle,tissueMesoscopic-tissueMottle)*.72;
float tissueGrain=tissueNoise(tissueGrainCoordinate+vec3(2.7,9.2,4.1));
// Sparse connective flecks; avoid a closed honeycomb or a repeated cell grid.
// These are a material cue, not a reconstructed vessel tree or histology.
float tissueSepta=smoothstep(.58,.76,tissueGrain)
                 *smoothstep(.42,.72,tissueMesoscopic)*tissueGrainVisibility;
// Sparse submillimetre pits with a restrained pale rim. A site's centre stays
// inside its cell, so no 27-neighbour Voronoi search is necessary.
vec3 tissueCell=vTissuePosition*420.0;
vec3 tissueSeed=tissueHash3(floor(tissueCell)+vec3(19.1,4.7,8.3));
vec3 tissueSite=.20+.60*tissueSeed;
vec3 tissueOffset=(fract(tissueCell)-tissueSite)*vec3(1.0,1.28,.88);
float tissueRadius=.055+.043*tissueSeed.x;
float tissueDistance=length(tissueOffset);
float tissueAA=clamp(fwidth(tissueDistance),.008,.035);
float tissueSiteMask=step(.76,tissueSeed.z)*tissueMicroVisibility;
float tissueLumen=(1.0-smoothstep(tissueRadius-tissueAA,tissueRadius+tissueAA,tissueDistance))*tissueSiteMask;
float tissueRim=max(0.0,(1.0-smoothstep(tissueRadius+.022-tissueAA,tissueRadius+.022+tissueAA,tissueDistance))*tissueSiteMask-tissueLumen);

// Linear-light reflectance: a muted purple-brown capsule, not saturated red
// plastic. Large mottling stays shallow; the surface itself remains smooth.
vec3 tissueCapsule=mix(vec3(.100,.027,.028),vec3(.205,.068,.045),tissueMottle);
tissueCapsule*=.94+.12*tissueMesoscopic;
tissueCapsule*=1.0+(tissueGrain-.5)*.038*tissueGrainVisibility;
// The exposed solid is red-brown, warmer and less glossy than the membrane.
// Fine pale septa/pits follow 3-D material coordinates on both sides of a cut.
// This shear demonstration deliberately omits heat-charred/necrotic colouring.
vec3 tissueCutColour=mix(vec3(.190,.050,.038),vec3(.265,.076,.055),tissueGrain);
tissueCutColour*=.90+.15*tissueMesoscopic+.05*tissueMottle;
tissueCutColour=mix(tissueCutColour,vec3(.34,.187,.130),tissueSepta*.10);
tissueCutColour=mix(tissueCutColour,vec3(.045,.012,.009),tissueLumen*.84);
tissueCutColour+=vec3(.048,.032,.020)*tissueRim;
diffuseColor.rgb=mix(tissueCapsule,tissueCutColour,tissueCut);
`;

const NORMAL_DETAIL = /* glsl */`
#include <normal_fragment_maps>
// Tens of micrometres of displayed relief avoid coarse orange-peel highlights.
float tissueHeight=(tissueGrain-.5)*mix(.000009,.000035,tissueCut)*tissueGrainVisibility;
tissueHeight+=(tissueMesoscopic-.5)*.000025*tissueCut;
tissueHeight+=(tissueSepta*.000004-tissueLumen*.000050+tissueRim*.000007)*tissueCut;
vec3 tissueDx=dFdx(-vViewPosition),tissueDy=dFdy(-vViewPosition);
vec3 tissueR1=cross(tissueDy,normal),tissueR2=cross(normal,tissueDx);
float tissueDet=dot(tissueDx,tissueR1);
// Match Three's bump convention on both sides of a rotating specimen.
tissueDet*=faceDirection;
vec3 tissueGrad=sign(tissueDet)*(dFdx(tissueHeight)*tissueR1+dFdy(tissueHeight)*tissueR2);
vec3 tissuePerturbed=abs(tissueDet)*normal-tissueGrad;
// Edge-on/degenerate triangles can have a zero screen-space determinant.
// Preserve Three's face-corrected normal rather than normalize a zero vector.
if(dot(tissuePerturbed,tissuePerturbed)>1e-20)normal=normalize(tissuePerturbed);
`;

/** Opaque, double-sided liver material for both the organ and real cut pieces.
 * Requires tissueRestPosition (vec3, metres), tissueCutMask (float: capsule=0,
 * fresh cut=1) and vertex colours. Detail is procedural, not patient histology. */
export function createTissueMaterial() {
  const material = new THREE.MeshPhysicalMaterial({
    vertexColors: true, side: THREE.DoubleSide,
    roughness: .38, metalness: 0, ior: 1.37, specularIntensity: .72,
    clearcoat: .30, clearcoatRoughness: .23, envMapIntensity: .48,
  });
  material.name = 'Anatomical_Capsule_And_Procedural_Cut_Parenchyma';
  material.userData.detailDescription = 'Procedural display cues at millimetre and submillimetre scales; not patient-specific anatomy or histology.';
  material.onBeforeCompile = shader => {
    shader.vertexShader = /* glsl */`attribute vec3 tissueRestPosition;
attribute float tissueCutMask;
varying vec3 vTissuePosition;
varying float vTissueCut;
` + shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', /* glsl */`#include <begin_vertex>
vTissuePosition=tissueRestPosition;
vTissueCut=tissueCutMask;`);
    shader.fragmentShader = DETAIL_FUNCTIONS + shader.fragmentShader;
    shader.fragmentShader = shader.fragmentShader.replace('#include <color_fragment>', COLOUR_DETAIL);
    shader.fragmentShader = shader.fragmentShader.replace('#include <roughnessmap_fragment>', /* glsl */`#include <roughnessmap_fragment>
roughnessFactor=clamp(roughnessFactor+tissueCut*.18+(tissueGrain-.5)*.055*tissueGrainVisibility
                     +(tissueMottle-.5)*.040+tissueLumen*tissueCut*.08,.30,.68);`);
    shader.fragmentShader = shader.fragmentShader.replace('#include <normal_fragment_maps>', NORMAL_DETAIL);
    shader.fragmentShader = shader.fragmentShader.replace('#include <lights_physical_fragment>', /* glsl */`#include <lights_physical_fragment>
#ifdef USE_CLEARCOAT
  material.clearcoat=mix(.30,.075,tissueCut)*(.90+.10*tissueMottle);
  material.clearcoatRoughness=max(material.clearcoatRoughness,mix(.23,.37,tissueCut));
#endif`);
  };
  material.customProgramCacheKey = () => 'anatomical-capsule-cut-parenchyma-v4';
  return material;
}
