import * as THREE from 'three';
import { OutputShader } from 'three/addons/shaders/OutputShader.js';
import { FullScreenQuad } from 'three/addons/postprocessing/Pass.js';

function sampleCount(renderer,hdr){
  const gl=renderer.getContext?.();if(!gl?.getInternalformatParameter)return 0;
  try{
    const color=Array.from(gl.getInternalformatParameter(gl.RENDERBUFFER,hdr?gl.RGBA16F:gl.RGBA8,gl.SAMPLES));
    const depth=Array.from(gl.getInternalformatParameter(gl.RENDERBUFFER,gl.DEPTH_COMPONENT24,gl.SAMPLES));
    return Math.max(0,...color.filter(n=>n>0&&n<=4&&depth.includes(n)));
  }catch{return 0;}
}

/** One linear endoscope render, reused by the viewport and operating-room LCD.
 * Official Three output conversion applies ACES and sRGB exactly once. */
export class ScopeFeed {
  constructor(renderer, exposure = 1.10) {
    const hdr = renderer.extensions?.has('EXT_color_buffer_float') ?? false;
    this.target = new THREE.WebGLRenderTarget(1, 1, { type: hdr ? THREE.HalfFloatType : THREE.UnsignedByteType,
      minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, depthBuffer: true, samples:sampleCount(renderer,hdr) });
    this.target.texture.colorSpace = THREE.LinearSRGBColorSpace;
    this.target.texture.name = 'Linear_Real_Time_Endoscope_Feed';
    const uniforms = THREE.UniformsUtils.clone(OutputShader.uniforms);
    uniforms.feedScale = { value: new THREE.Vector2(1, 1) };
    uniforms.feedClamp = { value:new THREE.Vector4(.5,.5,.5,.5) };
    uniforms.tDiffuse.value = this.target.texture; uniforms.toneMappingExposure.value = exposure;
    this.outputMaterial = new THREE.RawShaderMaterial({ ...OutputShader, uniforms,
      defines: { ACES_FILMIC_TONE_MAPPING: '', SRGB_TRANSFER: '' }, depthTest: false, depthWrite: false, toneMapped: false,
      fragmentShader: OutputShader.fragmentShader.replace('varying vec2 vUv;', 'varying vec2 vUv;\nuniform vec2 feedScale;\nuniform vec4 feedClamp;')
        .replace('texture2D( tDiffuse, vUv )', 'texture2D( tDiffuse, clamp(vUv * feedScale,feedClamp.xy,feedClamp.zw) )') });
    const monitorUniforms = THREE.UniformsUtils.clone(OutputShader.uniforms);
    monitorUniforms.tDiffuse.value = this.target.texture; monitorUniforms.toneMappingExposure.value = exposure;
    monitorUniforms.feedAspect = { value: 1 }; monitorUniforms.screenAspect = { value: 1.6 };
    monitorUniforms.feedScale = uniforms.feedScale;
    monitorUniforms.feedClamp = uniforms.feedClamp;
    this.monitorMaterial = new THREE.RawShaderMaterial({ ...OutputShader, uniforms: monitorUniforms,
      defines: { ACES_FILMIC_TONE_MAPPING: '', SRGB_TRANSFER: '' }, toneMapped: false,
      fragmentShader: OutputShader.fragmentShader.replace('varying vec2 vUv;', 'varying vec2 vUv;\nuniform vec2 feedScale;\nuniform vec4 feedClamp;\nuniform float feedAspect;\nuniform float screenAspect;')
        .replace('gl_FragColor = texture2D( tDiffuse, vUv );', `vec2 feedUV=vUv;
float fit=screenAspect/feedAspect;
if(fit>1.0)feedUV.x=(feedUV.x-.5)*fit+.5;else feedUV.y=(feedUV.y-.5)/fit+.5;
if(any(lessThan(feedUV,vec2(0.0)))||any(greaterThan(feedUV,vec2(1.0)))){gl_FragColor=vec4(.008,.012,.016,1.0);return;}
gl_FragColor = texture2D( tDiffuse, clamp(feedUV * feedScale,feedClamp.xy,feedClamp.zw) );`) });
    this.quad = new FullScreenQuad(this.outputMaterial);
    this.resolution = { width: 1, height: 1 }; this.disposed = false;
  }

  // Reserve GPU storage during loading. Active pixels remain one-to-one with
  // the original HDR capture: no downsampling, reduced detail or stale frame.
  reserve(renderer, width, height) {
    const w=Math.max(this.target.width,Math.round(width*renderer.getPixelRatio())),h=Math.max(this.target.height,Math.round(height*renderer.getPixelRatio()));
    if(w!==this.target.width||h!==this.target.height)this.target.setSize(w,h);
    renderer.initRenderTarget?.(this.target);
  }

  capture(renderer, scene, camera, width, height) {
    const ratio = renderer.getPixelRatio(), w = Math.max(1, Math.round(width * ratio)), h = Math.max(1, Math.round(height * ratio));
    if (this.target.width < w || this.target.height < h) this.target.setSize(Math.max(this.target.width,w),Math.max(this.target.height,h));
    this.target.viewport.set(0,0,w,h);
    this.outputMaterial.uniforms.feedScale.value.set(w/this.target.width,h/this.target.height);
    this.outputMaterial.uniforms.feedClamp.value.set(.5/this.target.width,.5/this.target.height,(w-.5)/this.target.width,(h-.5)/this.target.height);
    this.resolution = { width: w, height: h };
    camera.aspect = width / Math.max(1, height); camera.updateProjectionMatrix();
    this.monitorMaterial.uniforms.feedAspect.value = camera.aspect;
    const previousTarget = renderer.getRenderTarget(), previousScissor = renderer.getScissorTest();
    try {
      renderer.setRenderTarget(this.target); renderer.setScissorTest(false);
      renderer.clear(); renderer.render(scene, camera);
    } finally { renderer.setRenderTarget(previousTarget); renderer.setScissorTest(previousScissor); }
  }

  blit(renderer, x, y, width, height) {
    const viewport = renderer.getViewport(new THREE.Vector4()), scissor = renderer.getScissor(new THREE.Vector4());
    const scissorTest = renderer.getScissorTest(), autoClear = renderer.autoClear;
    try {
      renderer.autoClear = false; renderer.setViewport(x, y, width, height);
      renderer.setScissorTest(true); renderer.setScissor(x, y, width, height);
      this.quad.render(renderer);
    } finally {
      renderer.autoClear = autoClear; renderer.setViewport(viewport); renderer.setScissor(scissor); renderer.setScissorTest(scissorTest);
    }
  }

  dispose() {
    if (this.disposed) return; this.disposed = true;
    this.target.dispose(); this.outputMaterial.dispose(); this.monitorMaterial.dispose(); this.quad.dispose();
  }
}
