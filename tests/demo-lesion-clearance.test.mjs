import test from 'node:test';
import assert from 'node:assert/strict';
import {Vector3} from 'three';
import {Simulation} from '../src/simulation.js';
import {TissueVolume} from '../src/tissue.js';
import {scissorsSegments} from '../src/scissors-kinematics.js';
import {resolveInstrumentAlignment} from '../src/instrument-pose.js';
import {sourceSegmentDistance} from '../src/instrument-contact.js';
import {lesionNodes} from '../src/lesion-volume.js';
import {bladeLesionClearance} from '../src/demo-lesion-clearance.js';

test('whole-blade lesion protection matches exhaustive original-label distances and refreshes with the real grasp and world frame',()=>{
  const sim=new Simulation(),tool=sim.state.tools.right,centre=scissorsSegments(tool).at(-1).b,lesion={center:centre,radii:[.003,.004,.003]},tissue=new TissueVolume({caseDefinition:{lesion}}),radius=.00165,limit=radius+.00035;
  tissue.metadata={dims:[13,13,13],spacing:[.001,.001,.001],origin:centre.map(v=>v-.006),pathology:lesion};tissue._baseField=new Float32Array(13**3).fill(-.01);
  try{
    assert(bladeLesionClearance(tissue,tool,radius)<0,'the real blade crossing the labelled target must be rejected');
    for(let round=0;round<3;round++){
      if(round===1)tissue.setGrasp({model:'local-flow',local:centre,displacement:[.003,.002,0],radius:.018,coreRadius:.0025});
      if(round===2)tissue.group.position.y=.03;
      const meta=tissue.metadata,points=[...lesionNodes(meta,tissue._baseField)].map(index=>{const xyz=[index%13,Math.floor(index/13)%13,Math.floor(index/169)];return tissue.group.localToWorld(tissue.deformPoint(new Vector3(...xyz.map((v,i)=>meta.origin[i]+v*.001)))).toArray();});
      for(let k=0;k<50;k++){
        const candidate={...tool,position:tool.position.map((v,i)=>v+Math.sin(k*1.71+i)*.008),wrist:[Math.sin(k)*.4,Math.cos(k)*.4,k*.1],jaw:(k%6)*.1};candidate.alignment=resolveInstrumentAlignment(candidate,tool.alignment);
        let expected=Infinity;for(const segment of scissorsSegments(candidate))for(const point of points)expected=Math.min(expected,sourceSegmentDistance(point,point,segment.a,segment.b));
        const actual=bladeLesionClearance(tissue,candidate,radius);
        if(expected<limit)assert(Math.abs(actual-(expected-radius-.0003))<1e-12,'binning must retain the exact nearest material label');else assert.equal(actual,Infinity);
      }
    }
  }finally{tissue.dispose();}
});
