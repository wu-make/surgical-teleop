import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {fixedRenderFrame,frameLayout,styleFixedPreview} from '../src/render-frame.js';
import {SurgicalScene} from '../src/scene.js';

test('fixed native workload stays 949x612 across pane sizes and preserves native mini proportions',()=>{
  const fixed=fixedRenderFrame('?render-size=949x612');assert.deepEqual(fixed,{width:949,height:612});
  for(const ratio of [1,1.100000023841858,1.25,1.5])for(const [w,h]of [[325,458],[863,556]]){
    const stage={clientWidth:w,clientHeight:h,style:{},dataset:{}},mini={style:{}};
    const layout=frameLayout(stage,mini,ratio,fixed);
    assert.equal(Math.floor(layout.width*ratio),949);assert.equal(Math.floor(layout.height*ratio),612);
    assert(Math.abs(layout.width/layout.height-949/612)<1e-12);assert.equal(layout.mini.width,layout.width*.29);
    assert.equal(layout.mini.height,layout.height*.30);
    styleFixedPreview(stage,mini,ratio,fixed);assert.equal(stage.clientWidth,w);assert.equal(stage.style.height,'auto');
  }
  assert.equal(fixedRenderFrame('?render-size=100x100'),null);assert.equal(fixedRenderFrame(''),null);
});

test('pane resize in fixed mode never reallocates the native buffer or changes camera aspect',()=>{
  const sizes=[],view=Object.assign(Object.create(SurgicalScene.prototype),{mode:'endo',fixedFrame:{width:949,height:612},stage:{clientWidth:325,clientHeight:458},renderer:{getPixelRatio:()=>1.100000023841858,setSize:(w,h)=>sizes.push([w,h])},overviewCamera:new THREE.PerspectiveCamera(),endoCamera:new THREE.PerspectiveCamera()});
  view.resize();view.stage.clientWidth=700;view.stage.clientHeight=430;view.resize();
  assert.equal(sizes.length,1);assert(Math.abs(view.scopeAspect-949/612)<1e-12);assert(Math.abs(view.endoCamera.aspect-949/612)<1e-12);
  view.mode='overview';assert(Math.abs(view.scopeAspect-(949/612)*(.29/.30))<1e-12);
});
