import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { OutputShader } from 'three/addons/shaders/OutputShader.js';
import { ScopeFeed } from '../src/scope-feed.js';
import { SurgicalScene } from '../src/scene.js';
import { buildOperatingRoom } from '../src/operating-room.js';

class RendererProbe {
  constructor(hdr = true) {
    this.extensions = { has: name => hdr && name === 'EXT_color_buffer_float' };
    this.target = null; this.viewport = new THREE.Vector4(11, 13, 900, 600);
    this.scissor = new THREE.Vector4(21, 23, 400, 300); this.scissorTest = true;
    this.autoClear = true; this.toneMappingExposure = 0.8; this.draws = []; this.clearCount = 0;
    this.infoResetCount = 0; this.info = { reset: () => { this.infoResetCount++; } };
  }
  getPixelRatio() { return 1.5; }
  getRenderTarget() { return this.target; }
  setRenderTarget(target) { this.target = target; }
  getScissorTest() { return this.scissorTest; }
  setScissorTest(value) { this.scissorTest = value; }
  getViewport(result) { return result.copy(this.viewport); }
  setViewport(...args) { args.length === 1 ? this.viewport.copy(args[0]) : this.viewport.set(...args); }
  getScissor(result) { return result.copy(this.scissor); }
  setScissor(...args) { args.length === 1 ? this.scissor.copy(args[0]) : this.scissor.set(...args); }
  clear() { this.clearCount++; }
  clearDepth() {}
  render(object, camera) {
    const visible = [];
    object.traverseVisible(node => { if (node.isMesh && node.layers.test(camera.layers)) visible.push(node); });
    for (const mesh of visible) {
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      for (const material of materials) for (const uniform of Object.values(material.uniforms ?? {})) {
        assert.notEqual(uniform.value, this.target?.texture, 'the captured layer must not sample its active render target');
      }
    }
    this.draws.push({ object, camera, visible, target: this.target, autoClear: this.autoClear,
      viewport: this.viewport.clone(), scissor: this.scissor.clone(), scissorTest: this.scissorTest,
      exposure: this.toneMappingExposure, environmentIntensity: object.environmentIntensity, background: object.background?.getHexString() });
    if (this.failNext) { this.failNext = false; throw new Error('Synthetic render failure'); }
  }
}

test('endoscope uses supported HDR color/depth MSAA intersection without changing active pixels',()=>{
  const renderer=new RendererProbe(),gl={RENDERBUFFER:1,RGBA16F:2,RGBA8:3,DEPTH_COMPONENT24:4,SAMPLES:5,getInternalformatParameter:(_,format)=>format===4?new Int32Array([4,2]):new Int32Array([8,4,2])};renderer.getContext=()=>gl;
  const feed=new ScopeFeed(renderer);try{assert.equal(feed.target.samples,4);feed.reserve(renderer,1000,800);feed.capture(renderer,new THREE.Scene(),new THREE.PerspectiveCamera(),640,400);assert.deepEqual(feed.resolution,{width:960,height:600});assert.deepEqual(feed.outputMaterial.uniforms.feedClamp.value.toArray(),[.5/1500,.5/1200,959.5/1500,599.5/1200]);assert.equal(feed.monitorMaterial.uniforms.feedClamp,feed.outputMaterial.uniforms.feedClamp);}finally{feed.dispose();}
  gl.getInternalformatParameter=(_,format)=>format===4?new Int32Array([2]):new Int32Array([4,2]);const two=new ScopeFeed(renderer);assert.equal(two.target.samples,2);two.dispose();gl.getInternalformatParameter=()=>new Int32Array([]);const none=new ScopeFeed(renderer);assert.equal(none.target.samples,0);none.dispose();
});

test('the endoscope uses a linear HDR target and exactly one official display conversion per output', () => {
  const feed = new ScopeFeed(new RendererProbe(), 1.10);
  assert.equal(feed.target.texture.type, THREE.HalfFloatType);
  assert.equal(feed.target.texture.colorSpace, THREE.LinearSRGBColorSpace);
  assert.equal(feed.target.depthBuffer, true);
  for (const material of [feed.outputMaterial, feed.monitorMaterial]) {
    assert.equal(material.isRawShaderMaterial, true);
    assert.equal(material.toneMapped, false);
    assert.deepEqual(material.defines, { ACES_FILMIC_TONE_MAPPING: '', SRGB_TRANSFER: '' });
    assert.equal(material.uniforms.tDiffuse.value, feed.target.texture);
    assert.equal(material.uniforms.toneMappingExposure.value, 1.10);
    assert.equal(material.fragmentShader.split('#include <tonemapping_pars_fragment>').length - 1, 1);
    assert.equal(material.fragmentShader.split('ACESFilmicToneMapping( gl_FragColor.rgb )').length - 1, 1);
    assert.equal(material.fragmentShader.split('sRGBTransferOETF( gl_FragColor )').length - 1, 1);
    assert.doesNotMatch(material.fragmentShader, /#include <(?:tonemapping|colorspace)_fragment>/);
  }
  assert.match(feed.outputMaterial.fragmentShader,/vUv \* feedScale/);
  assert.match(feed.monitorMaterial.fragmentShader,/feedUV \* feedScale/);
  assert.equal(feed.outputMaterial.depthTest, false); assert.equal(feed.outputMaterial.depthWrite, false);
  assert.equal(feed.monitorMaterial.depthTest, true); assert.equal(feed.monitorMaterial.depthWrite, true);
  assert.notEqual(feed.outputMaterial.uniforms, feed.monitorMaterial.uniforms);
  const fallback = new ScopeFeed(new RendererProbe(false));
  assert.equal(fallback.target.texture.type, THREE.UnsignedByteType);
  assert.equal(fallback.target.texture.colorSpace, THREE.LinearSRGBColorSpace, 'fallback is still linear; no accidental sRGB decode');
  feed.dispose(); fallback.dispose();
});

test('one endoscope capture is reused by viewport and monitor without recursive framebuffer feedback', () => {
  const renderer = new RendererProbe(), feed = new ScopeFeed(renderer), scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(); camera.layers.set(1);
  const liver = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshStandardMaterial()); liver.layers.set(1); scene.add(liver);
  const monitor = new THREE.Mesh(new THREE.PlaneGeometry(), feed.monitorMaterial); monitor.layers.set(0); scene.add(monitor);
  const previousTarget = new THREE.WebGLRenderTarget(7, 9); renderer.target = previousTarget;
  feed.capture(renderer, scene, camera, 640, 400);
  assert.equal(renderer.draws.length, 1); assert.equal(renderer.draws[0].target, feed.target);
  assert.deepEqual(renderer.draws[0].visible, [liver], 'the operating-room display is excluded from the scope layer');
  assert.equal(renderer.draws[0].scissorTest, false);
  assert.deepEqual(feed.resolution, { width: 960, height: 600 });
  assert.equal(camera.aspect, 1.6); assert.equal(feed.monitorMaterial.uniforms.feedAspect.value, 1.6);
  assert.equal(renderer.target, previousTarget); assert.equal(renderer.scissorTest, true);
  renderer.target = null;
  feed.blit(renderer, 10, 20, 640, 400);
  assert.equal(renderer.draws.length, 2); assert.equal(renderer.draws[1].target, null);
  assert.equal(renderer.draws[1].visible[0].material.uniforms.tDiffuse.value, feed.target.texture);
  renderer.toneMappingExposure = 0.35;
  const overview = new THREE.PerspectiveCamera();
  renderer.render(scene, overview);
  assert.deepEqual(renderer.draws[2].visible, [monitor]);
  assert.equal(monitor.material.uniforms.toneMappingExposure.value, 1.10, 'room exposure cannot remap the scope feed a second time');
  assert.equal(renderer.draws.filter(draw => draw.camera === camera).length, 1, 'monitor and viewport reuse the same captured frame');
  feed.dispose(); previousTarget.dispose(); liver.geometry.dispose(); liver.material.dispose(); monitor.geometry.dispose();
});

test('viewport blitting restores renderer state and both passes recover after rendering throws', () => {
  const renderer = new RendererProbe(), feed = new ScopeFeed(renderer);
  const before = { viewport: renderer.viewport.clone(), scissor: renderer.scissor.clone(), autoClear: renderer.autoClear, scissorTest: renderer.scissorTest };
  feed.blit(renderer, 101, 103, 320, 200);
  const draw = renderer.draws.at(-1);
  assert.deepEqual(draw.viewport.toArray(), [101, 103, 320, 200]);
  assert.deepEqual(draw.scissor.toArray(), [101, 103, 320, 200]);
  assert.equal(draw.autoClear, false); assert.equal(draw.scissorTest, true);
  const check = () => {
    assert.deepEqual(renderer.viewport, before.viewport); assert.deepEqual(renderer.scissor, before.scissor);
    assert.equal(renderer.autoClear, before.autoClear); assert.equal(renderer.scissorTest, before.scissorTest);
  };
  check(); renderer.failNext = true;
  assert.throws(() => feed.blit(renderer, 1, 2, 30, 40), /Synthetic/); check();
  const oldTarget = new THREE.WebGLRenderTarget(8, 6); renderer.target = oldTarget; renderer.failNext = true;
  assert.throws(() => feed.capture(renderer, new THREE.Scene(), new THREE.PerspectiveCamera(), 320, 200), /Synthetic/);
  assert.equal(renderer.target, oldTarget); check();
  feed.dispose(); oldTarget.dispose();
});

test('disposing the shared feed releases its target, materials and fullscreen geometry once', () => {
  const feed = new ScopeFeed(new RendererProbe()), counts = [0, 0, 0, 0];
  [feed.target, feed.outputMaterial, feed.monitorMaterial, feed.quad._mesh.geometry].forEach((resource, i) => resource.addEventListener('dispose', () => counts[i]++));
  feed.dispose(); feed.dispose();
  assert.deepEqual(counts, [1, 1, 1, 1]); assert.equal(feed.disposed, true);
});

test('each complete surgical frame captures endoscopy once, draws overview once and blits the same feed once', () => {
  for (const mode of ['endo', 'overview']) {
    const renderer = new RendererProbe(), feed = new ScopeFeed(renderer), scene = new THREE.Scene();
    const endoCamera = new THREE.PerspectiveCamera(55); endoCamera.layers.set(1);
    const overviewCamera = new THREE.PerspectiveCamera(42);
    const organ = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshStandardMaterial()); organ.layers.set(1); scene.add(organ);
    const cavity = new THREE.Group(), inner = new THREE.Mesh(new THREE.SphereGeometry(), new THREE.MeshBasicMaterial());
    inner.layers.set(1); cavity.add(inner); scene.add(cavity);
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(), feed.monitorMaterial); screen.layers.set(0); scene.add(screen);
    const view = { mode, renderer, scopeFeed: feed, scene, cavity, endoCamera, overviewCamera,
      stage: { clientWidth: 1000, clientHeight: 620, getBoundingClientRect: () => ({ left: 20, top: 40 }) },
      mini: { getBoundingClientRect: () => ({ left: 720, top: 170, width: 280, height: 180 }) } };
    SurgicalScene.prototype.render.call(view, 1000);
    assert.equal(renderer.infoResetCount, 1, `${mode}: statistics reset exactly once for all passes`);
    assert.equal(renderer.draws.length, 3);
    const capture = renderer.draws.filter(draw => draw.camera === endoCamera), overview = renderer.draws.filter(draw => draw.camera === overviewCamera), blit = renderer.draws.filter(draw => draw.object !== scene);
    assert.equal(capture.length, 1); assert.equal(overview.length, 1); assert.equal(blit.length, 1);
    assert.equal(renderer.draws[0], capture[0], 'LCD samples the new frame, not a previous or recursive one');
    assert.equal(capture[0].target, feed.target); assert.equal(overview[0].target, null); assert.equal(blit[0].target, null);
    assert.deepEqual(capture[0].visible, [organ, inner]); assert.deepEqual(overview[0].visible, [screen]);
    assert.equal(capture[0].environmentIntensity, 0.34); assert.equal(capture[0].exposure, 1.10);
    assert.equal(capture[0].background, '6b4a42'); assert.equal(overview[0].environmentIntensity, 0.80);
    assert.equal(overview[0].exposure, 1.0); assert.equal(overview[0].background, 'c2d0d0');
    assert.equal(screen.material.uniforms.tDiffuse.value, feed.target.texture);
    assert.equal(screen.material.uniforms.toneMappingExposure.value, 1.10);
    assert.deepEqual(blit[0].viewport.toArray(), mode === 'endo' ? [0, 0, 1000, 620] : [700, 310, 280, 180]);
    assert.deepEqual(overview[0].viewport.toArray(), mode === 'endo' ? [700, 310, 280, 180] : [0, 0, 1000, 620]);
    assert.equal(overviewCamera.aspect, mode === 'endo' ? 280 / 180 : 1000 / 620);
    assert.deepEqual(feed.resolution, mode === 'endo' ? { width: 1500, height: 930 } : { width: 420, height: 270 });
    assert.equal(renderer.target, null); assert.equal(renderer.scissorTest, false); assert.equal(renderer.autoClear, true);
    feed.dispose(); organ.geometry.dispose(); organ.material.dispose(); inner.geometry.dispose(); inner.material.dispose(); screen.geometry.dispose();
  }
});

test('the real theatre LCD faces the default overview, matches its feed aspect and stays absent from endoscopy', () => {
  const previousDocument = globalThis.document;
  globalThis.document = { createElement: () => ({ width: 0, height: 0, getContext: () => ({ fillRect() {}, fillText() {} }) }) };
  const feed = new ScopeFeed(new RendererProbe()), scene = new THREE.Scene();
  try {
    const room = buildOperatingRoom(scene, feed.monitorMaterial); scene.updateMatrixWorld(true);
    const cameraPosition = new THREE.Vector3(1.68, 2.02, -1.92), screenPosition = room.monitorScreen.getWorldPosition(new THREE.Vector3());
    const normal = new THREE.Vector3(0, 0, 1).transformDirection(room.monitorScreen.matrixWorld);
    assert.ok(normal.dot(cameraPosition.sub(screenPosition).normalize()) > 0.9, 'the display front faces the viewer instead of its opaque back casing');
    assert.equal(room.monitorScreen.material, feed.monitorMaterial);
    const geometry = room.monitorScreen.geometry.parameters;
    assert.ok(Math.abs(geometry.width / geometry.height - feed.monitorMaterial.uniforms.screenAspect.value) < 1e-12);
    room.room.traverse(object => assert.equal(object.layers.mask, 1, 'all theatre fixtures stay in layer 0, including the LCD'));
  } finally {
    if (previousDocument === undefined) delete globalThis.document; else globalThis.document = previousDocument;
    const geometries = new Set(), materials = new Set();
    scene.traverse(object => { if (object.geometry) geometries.add(object.geometry); if (object.material && object.material !== feed.monitorMaterial) materials.add(object.material); });
    geometries.forEach(geometry => geometry.dispose()); materials.forEach(material => { material.map?.dispose(); material.dispose(); });
    feed.dispose();
  }
});

test('preallocated HDR storage retains every active pixel across fullscreen and view switches',()=>{
  const renderer=new RendererProbe(),feed=new ScopeFeed(renderer),scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera();
  let allocations=0;feed.target.addEventListener('dispose',()=>allocations++);
  feed.reserve(renderer,1920,1080);const initial=allocations;
  for(const [w,h]of [[640,400],[1280,720],[1920,1080],[280,180],[640,400]]){
    feed.capture(renderer,scene,camera,w,h);
    assert.deepEqual(feed.resolution,{width:w*1.5,height:h*1.5});
    assert.deepEqual(feed.target.viewport.toArray(),[0,0,w*1.5,h*1.5]);
    assert.deepEqual(feed.outputMaterial.uniforms.feedScale.value.toArray(),[w/1920,h/1080]);
    assert.equal(feed.monitorMaterial.uniforms.feedScale,feed.outputMaterial.uniforms.feedScale);
    assert.equal(camera.aspect,w/h);assert.equal(allocations,initial,'no texture/depth reallocation during fullscreen');
  }
  feed.dispose();
});

test('unchanged viewport notifications do not reallocate the drawing buffer',()=>{
  let sizes=[];const view={stage:{clientWidth:863,clientHeight:556},renderer:{setSize:(w,h)=>sizes.push([w,h])},overviewCamera:new THREE.PerspectiveCamera(),endoCamera:new THREE.PerspectiveCamera()};
  SurgicalScene.prototype.resize.call(view);SurgicalScene.prototype.resize.call(view);assert.deepEqual(sizes,[[863,556]]);
  view.stage.clientWidth=1746;view.stage.clientHeight=984;SurgicalScene.prototype.resize.call(view);assert.deepEqual(sizes.at(-1),[1746,984]);assert.equal(view.endoCamera.aspect,1746/984);
});
