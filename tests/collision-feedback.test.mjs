import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {collisionFeedback,collisionPartLabel} from '../src/collision-feedback.js';
import {SurgicalScene} from '../src/scene.js';

test('collision labels distinguish jaws, wrists and real in/outside shaft contact',()=>{
  assert.equal(collisionPartLabel('left',{part:'jaw',section:'distal'}),'左钳口');
  assert.equal(collisionPartLabel('right',{part:'jaw',section:'distal'}),'右剪口');
  assert.equal(collisionPartLabel('right',{part:'wrist',section:'distal'}),'右腕部');
  assert.equal(collisionPartLabel('left',{part:'shaft',section:'outside'}),'左体外杆身');
  assert.equal(collisionPartLabel('right',{part:'shaft',section:'inside'}),'右体内杆身');
});

test('outside contact identifies its location and requests the relevant overview only in the endoscope',()=>{
  const collision={blocked:true,contact:true,clearance:0,pair:{left:{part:'shaft',section:'outside'},right:{part:'shaft',section:'outside'}}};
  const endo=collisionFeedback(collision,'endo');
  assert.match(endo.status,/左体外杆身与右体外杆身接触/);
  assert.match(endo.notice,/体外接触请切系统总览查看/);
  assert.doesNotMatch(endo.notice,/钳口/);
  assert.doesNotMatch(collisionFeedback(collision,'overview').notice,/请切系统总览/);
});

test('blocked notice is removed on the next state while near contact keeps a quiet readout',()=>{
  const pair={left:{part:'jaw',section:'distal'},right:{part:'wrist',section:'distal'}};
  assert.ok(collisionFeedback({blocked:true,contact:true,pair}).notice);
  const near=collisionFeedback({blocked:false,contact:true,clearance:.0002,pair});
  assert.equal(near.notice,'');
  assert.match(near.status,/近接触/);
  assert.doesNotMatch(near.status,/阻止/);
  assert.match(near.detail,/0\.20 mm/);
  const clear=collisionFeedback({blocked:false,contact:false,active:true,pair});
  assert.equal(clear.status,'双器械防碰撞');
  assert.equal(clear.notice,'');
});

test('surface contact markers use world points, both camera layers and never persist after separation',()=>{
  const scene=Object.create(SurgicalScene.prototype);scene.scene=new THREE.Scene();scene._makeCollisionMarkers();
  const pair={left:[.002,1.04,.01],right:[.0022,1.04,.01]};
  scene._updateCollisionMarkers({blocked:true,contact:true,closestPoints:pair});
  const group=scene.collisionMarkers;assert.equal(group.visible,true);
  assert.deepEqual(group.userData.points[0].position.toArray(),pair.left);
  assert.deepEqual(group.userData.points[1].position.toArray(),pair.right);
  for(const object of group.children){assert.equal(object.layers.isEnabled(0),true);assert.equal(object.layers.isEnabled(1),true);}
  assert.equal(group.userData.line.visible,true);
  scene._updateCollisionMarkers({blocked:false,contact:true,closestPoints:pair});assert.equal(group.visible,true);
  scene._updateCollisionMarkers({blocked:false,contact:false,closestPoints:pair});assert.equal(group.visible,false);
  scene._updateCollisionMarkers({blocked:true,closestPoints:{left:[NaN,1,0],right:[0,1,0]}});assert.equal(group.visible,false);
  scene._updateCollisionMarkers({blocked:true,closestPoints:null});assert.equal(group.visible,false);
  scene.scene.traverse(object=>{object.geometry?.dispose();object.material?.dispose();});
});
