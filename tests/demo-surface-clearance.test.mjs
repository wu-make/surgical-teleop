import test from 'node:test';
import assert from 'node:assert/strict';
import {Group,Mesh,PlaneGeometry,Vector3} from 'three';
import {displayedBodyDistance,displayedCapsuleClearance} from '../src/demo-surface-clearance.js';
import {TissueVolume} from '../src/tissue.js';

test('an uncommitted analytic cut cannot make the wrist penetrate the still-visible tissue',()=>{
  const geometry=new PlaneGeometry(.1,.1);geometry.computeBoundingBox();const mesh=new Mesh(geometry),tissue={_meshes:new Map([['visible',mesh]]),sampleDistance:()=>.02};
  try{
    assert(displayedBodyDistance(tissue,new Vector3(0,0,-.001))<0,'visible tissue takes priority over the submitted future cut');
    assert(Math.abs(displayedBodyDistance(tissue,new Vector3(0,0,.001))-.001)<1e-12);
    assert.equal(displayedBodyDistance({...tissue,_meshes:new Map()},new Vector3(0,0,-.001)),.02,'headless/static preflight retains its material-field fallback');
  }finally{geometry.dispose();}
});

test('a shaft centre outside tissue still collides when its real radius overlaps the displayed surface',()=>{
 const geometry=new PlaneGeometry(.1,.1);geometry.computeBoundingBox();const tissue={group:new Group(),_meshes:new Map([['visible',new Mesh(geometry)]]),sampleDistance:()=>.02};
 try{const result=displayedCapsuleClearance(tissue,{a:[-.03,0,.001],b:[.03,0,.001],radius:.002,part:'shaft'});assert(result<-.0009,'outside centre lines cannot hide the surrounding metal');}finally{geometry.dispose();}
});

test('the entire shaft segment catches an intervening tissue bridge and supplies its true escape normal',()=>{
 const geometry=new PlaneGeometry(.1,.1);geometry.rotateY(Math.PI/2);geometry.computeBoundingBox();const tissue={group:new Group(),_meshes:new Map([['visible',new Mesh(geometry)]]),sampleDistance:()=>.02};
 try{const details={},result=displayedCapsuleClearance(tissue,{a:[-.04,0,0],b:[.04,0,0],radius:.001,part:'shaft'},details);assert(result<-.0009);assert(details.normal.x>.99);}finally{geometry.dispose();}
});

test('a stretched non-metric implicit value cannot turn a real air gap into a metal collision',()=>{
 const geometry=new PlaneGeometry(.1,.1);geometry.computeBoundingBox();const tissue={group:new Group(),_meshes:new Map([['visible',new Mesh(geometry)]]),sampleDistance:()=>.0001};
 try{const capsule={a:[-.03,0,.02],b:[.03,0,.02],radius:.0045,part:'shaft'};assert(displayedCapsuleClearance(tissue,capsule)>0,'20 mm of actual clearance remains clear even when the reference field reports 0.1 mm');tissue.sampleDistance=()=>-.0001;assert(displayedCapsuleClearance(tissue,capsule)>0,'the actual far surface also resolves a reference-sign disagreement');}finally{geometry.dispose();}
});

test('an opened cut uses displayed triangles for blade contact without reference-field projection',()=>{
 const tissue=new TissueVolume(),geometry=new PlaneGeometry(.1,.1);geometry.computeBoundingBox();tissue._meshes.set('visible',new Mesh(geometry));tissue._deformation={section:{}};tissue.sampleDistance=()=>{throw Error('non-metric reference field must not decide displayed contact');};
 try{assert.equal(tissue.contactSegment(new Vector3(-.01,0,.004),new Vector3(.01,0,.004),.00165).contact,false);const inside=tissue.contactSegment(new Vector3(-.01,0,-.005),new Vector3(.01,0,-.005),.00165);assert(inside.contact&&inside.inside);assert(Math.abs(inside.distance+.005)<1e-10);tissue._deformation=null;tissue._contactHasSectionCuts=true;assert.equal(tissue.contactSegment(new Vector3(-.01,0,.004),new Vector3(.01,0,.004),.00165).contact,false);}finally{tissue.dispose();}
});
