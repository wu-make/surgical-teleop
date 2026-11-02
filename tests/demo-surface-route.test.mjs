import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {TissueVolume} from '../src/tissue.js';
import {planPeripheralResections} from '../src/guided-demo.js';
import {surgicalCase} from '../src/surgical-cases.js';
import {createVolumeState,applyCapsuleCut,initializeConnectivity,separateDisconnectedComponents,normalizeDeformation,deformPoint} from '../src/tissue-worker.js';
import {lesionNodes,lesionStatistics} from '../src/lesion-volume.js';
import {auditHeldTarget} from '../src/demo-route-audit.js';

for(const id of ['lesion-liver','uterus-adnexa'])test(id+': visible-front-first strokes and exterior transfers genuinely isolate the complete target',()=>{
  const c=surgicalCase(id),meta=JSON.parse(fs.readFileSync(new URL('../public/assets/'+c.asset+'.json',import.meta.url))),bytes=fs.readFileSync(new URL('../public/assets/'+c.asset+'.bin',import.meta.url)),base=new Float32Array(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength));meta.pathology=c.lesion;
  const tissue=new TissueVolume({caseDefinition:c});tissue.metadata=meta;tissue._baseField=base;tissue.group.position.y=1.035;tissue.group.rotation.x=-Math.PI/2;tissue.group.updateMatrixWorld(true);
  try{
    const plan=planPeripheralResections(tissue)[0];assert(plan?.strokeStarts.length>1);if(id==='lesion-liver')assert.equal(plan.traction.section.plane,plan.plane,'the bed/flap split must coincide with the actual cut rather than leaving a moving bed layer');let previous=-Infinity;
    if(plan.pattern==='peripheral-spiral'){for(let i=1;i<plan.path.length;i++)assert(plan.path[i].z<=plan.path[i-1].z+1e-10,'open the superficial outer margin before advancing to the deep centre');}
    else for(const start of plan.strokeStarts){const depth=plan.path[start].getComponent(plan.depthAxis)*plan.depthDirection;assert(depth>previous);previous=depth;if(start){assert(plan.transfers[start]?.length);for(const p of plan.transfers[start])assert(tissue.queryReferenceDistance(p)>=.0001-1e-10,'non-cutting transfer stays outside the source organ');}}
    const state=createVolumeState(meta,base);state.lesionNodes=lesionNodes(meta,state.base);initializeConnectivity(state);
    for(let i=1;i<plan.path.length;i+=64){const segments=plan.path.slice(i,i+64).map((p,j)=>({a:plan.path[i+j-1].toArray(),b:p.toArray(),index:i+j})).filter(s=>!plan.transfers[s.index]);if(segments.length)applyCapsuleCut(state,{...segments[0],segments,radius:plan.cutRadius});}
    const split=separateDisconnectedComponents(state,{force:true}),target=lesionStatistics(state);assert(split.fragments.length>0);assert.equal(target.attachedMm3,0);assert(target.detachedMm3/target.totalMm3>.99,'the labelled target must remain inside a real specimen');
    const piece=split.fragments[0],audit=auditHeldTarget({...tissue,getFragment:()=>piece},{grasp:{fragmentId:piece.id}});assert(audit.heldFraction>.99,'the held specimen must contain the original labelled target');
    if(id==='lesion-liver')assert(split.fragments.reduce((s,p)=>s+p.volumeMm3,0)<70000,'the demonstration must not section the entire distant lobe');
  }finally{tissue.dispose();}
});

test('the lifted liver cut retains real voxel connectivity until all curved rows actually isolate the target',()=>{
 const c=surgicalCase('lesion-liver'),meta=JSON.parse(fs.readFileSync(new URL('../public/assets/'+c.asset+'.json',import.meta.url))),bytes=fs.readFileSync(new URL('../public/assets/'+c.asset+'.bin',import.meta.url)),base=new Float32Array(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength));meta.pathology=c.lesion;
 const tissue=new TissueVolume({caseDefinition:c});tissue.metadata=meta;tissue._baseField=base;
 try{const plan=planPeripheralResections(tissue)[0],state=createVolumeState(meta,base);state.lesionNodes=lesionNodes(meta,state.base);initializeConnectivity(state);
  for(let row=0;row<plan.strokeStarts.length;row++){
   const begin=plan.strokeStarts[row],end=plan.strokeStarts[row+1]??plan.path.length,d=normalizeDeformation({model:'local-flow',local:plan.referenceAnchor.toArray(),displacement:[0,0,.0406+.005*begin/plan.path.length],...plan.traction,section:{...plan.traction.section,front:plan.path[begin].y}}),segments=[];
   for(let j=begin+1;j<end;j++)segments.push({a:deformPoint(plan.path[j-1].toArray(),d),b:deformPoint(plan.path[j].toArray(),d)});
   for(let j=0;j<segments.length;j+=64)applyCapsuleCut(state,{segments:segments.slice(j,j+64),radius:plan.cutRadius,deformation:d});
   if(row===Math.floor(plan.strokeStarts.length/2)){separateDisconnectedComponents(state,{force:true});assert(lesionStatistics(state).attachedMm3>0,'partial rows cannot report complete resection');}
  }
  const split=separateDisconnectedComponents(state,{force:true}),target=lesionStatistics(state);assert.equal(target.attachedMm3,0,'traction cannot leave subvoxel bridges behind an apparently complete cut');assert.equal(target.detachedMm3,target.totalMm3);assert.equal(target.excisedMm3,0);assert(split.fragments.length>0);
 }finally{tissue.dispose();}
});
