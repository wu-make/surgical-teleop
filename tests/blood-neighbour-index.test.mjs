import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {BloodNeighbourIndex} from '../src/blood-neighbour-index.js';

const linear=(nodes,p,v)=>{
  let node=null,distance=.0035;
  for(const n of nodes){const d=n.display.distanceTo(p);if(d<distance&&v.dot(n.normal)<0){distance=d;node=n;}}
  return {node,distance};
};
test('wound deposition index matches all cells through negative boundaries, motion and inward normals',()=>{
  let seed=104729;
  const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/2**32;};
  const nodes=Array.from({length:320},()=>({display:new THREE.Vector3(...Array.from({length:3},()=>random()*.05-.025)),normal:new THREE.Vector3(...Array.from({length:3},()=>random()*2-1)).normalize()}));
  for(let frame=0;frame<8;frame++){
    nodes.forEach(n=>n.display.add(new THREE.Vector3(.00013,-.00027,.00009)));
    const index=new BloodNeighbourIndex(nodes);
    for(let i=0;i<400;i++){
      const p=i<320?nodes[i].display.clone().add(new THREE.Vector3((random()-.5)*.006,.0001,0)):new THREE.Vector3(...Array.from({length:3},()=>random()*.05-.025));
      const v=new THREE.Vector3(...Array.from({length:3},()=>random()*2-1));
      assert.deepEqual(index.nearest(p,v),linear(nodes,p,v));
    }
  }
});
test('deposition preserves original equal-distance ordering and strict search radius',()=>{
  const node=x=>({display:new THREE.Vector3(x,0,0),normal:new THREE.Vector3(0,1,0)});
  const nodes=[node(.001),node(-.001)],p=new THREE.Vector3(),v=new THREE.Vector3(0,-1,0);
  assert.equal(new BloodNeighbourIndex(nodes).nearest(p,v).node,nodes[0]);
  assert.equal(new BloodNeighbourIndex([node(.0035)]).nearest(p,v).node,null);
  assert.equal(new BloodNeighbourIndex(nodes).nearest(p,v.clone().negate()).node,null);
  assert.deepEqual(new BloodNeighbourIndex([]).nearest(p,v),linear([],p,v));
});

test('reused deposition result clears a previous hit and retains exact tie order',()=>{
  const nodes=[.001,-.001].map(x=>({display:new THREE.Vector3(x,0,0),normal:new THREE.Vector3(0,1,0)}));
  const index=new BloodNeighbourIndex(nodes),out={},v=new THREE.Vector3(0,-1,0);
  assert.equal(index.nearest(new THREE.Vector3(),v,out),out);assert.equal(out.node,nodes[0]);
  assert.equal(index.nearest(new THREE.Vector3(1,2,3),v,out),out);assert.equal(out.node,null);assert.equal(out.distance,.0035);
  assert.deepEqual(index.nearest(new THREE.Vector3(-.0035,0,0),v,out),linear(nodes,new THREE.Vector3(-.0035,0,0),v));
});
