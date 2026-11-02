import test from 'node:test';
import assert from 'node:assert/strict';
import {BufferGeometry,Float32BufferAttribute,Mesh,Vector3} from 'three';
import {TissueVolume} from '../src/tissue.js';
import {normalizeDeformation} from '../src/tissue-worker.js';

function fixture(){
  const tissue=new TissueVolume(),g=new BufferGeometry();
  g.setAttribute('position',new Float32BufferAttribute([-.03,-.03,0,.03,-.03,0,.03,.03,0,-.03,.03,0],3));
  g.setIndex([0,1,2,0,2,3]);g.computeVertexNormals();g.computeBoundingBox();
  tissue._meshes.set('plane',new Mesh(g,tissue.material));
  const deformation=normalizeDeformation({model:'local-flow',local:[0,0,.02],displacement:[0,0,.02],radius:.05,coreRadius:.04,section:{center:[0,0],radii:[.015,.018],plane:0,depth:.013,curvature:[.8,0],front:0,width:.001,frontBlend:.0033}});
  tissue._cuts=[{deformation}];
  tissue.sampleDistance=()=>{throw Error('Displayed contact must not evaluate historical CSG');};
  tissue._ensureCutIndex=()=>{throw Error('Displayed contact must not construct historical CSG indices');};
  return tissue;
}

test('committed section contact uses exact metric triangles after recoil without constructing the CSG history index',()=>{
  const t=fixture();try{
    assert.equal(t._deformation,null);
    assert(Math.abs(t.contactDistance([0,0,.001])-.001)<1e-9);
    assert(Math.abs(t.contactDistance([0,0,-.001])+.001)<1e-9);
    assert(t._contactHasSectionCuts);assert.equal(t._indexedCutCount,0);
    t._contactRevision++;t._meshes.get('plane').geometry.translate(0,0,.002);
    t._meshes.get('plane').geometry.computeBoundingBox();
    assert(t.contactDistance([0,0,.001])<0,'a new displayed revision invalidates the prior contact distance');
  }finally{t.dispose();}
});

test('adjacent source blade segments share exact endpoint queries within one committed geometry batch',()=>{
  const t=fixture();try{
    const samples=new Map(),a=new Vector3(-.01,0,.001),b=new Vector3(0,0,.001),c=new Vector3(.01,0,.001);
    const first=t.contactSegment(a,b,.002,samples),second=t.contactSegment(b,c,.002,samples);
    assert(first.contact&&second.contact);assert.equal(samples.size,3);
    assert.deepEqual(t.contactSegments([{a,b},{a:b,b:c}],.002),[first,second]);
    t._cuts=[];t._ensureContactHistory();
    assert.equal(t._contactHasSectionCuts,false);assert.equal(t._contactHasDeformedCuts,false);
    t._cuts=[{deformation:null}];t._ensureContactHistory();assert.equal(t._contactHistoryScale,1);
  }finally{t.dispose();}
});
