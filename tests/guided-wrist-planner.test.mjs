import test from 'node:test';
import assert from 'node:assert/strict';
import {Group,Vector3,BufferGeometry,Float32BufferAttribute,Mesh} from 'three';
import {Simulation} from '../src/simulation.js';
import {scissorsAnchor} from '../src/scissors-kinematics.js';
import {GuidedDemo} from '../src/guided-demo.js';
import {WristPlanner} from '../src/guided-wrist-planner.js';
import {capturePlanningContext,planningTransfers,restoreFields} from '../src/guided-planning-context.js';
import {runImmediately} from '../src/cooperative-work.js';
import {planJob} from '../src/guided-wrist-planning-job.js';

function fixture(){
  const sim=new Simulation(),group=new Group(),geometry=new BufferGeometry();
  geometry.setAttribute('position',new Float32BufferAttribute([.5,.5,.5,.51,.5,.5,.5,.51,.5],3));
  geometry.setIndex([0,1,2]);geometry.computeVertexNormals();geometry.computeBoundingBox();
  const tissue={group,_epoch:1,_contactRevision:1,metadata:{dims:[2,2,2],origin:[0,0,0],spacing:[.01,.01,.01]},_meshes:new Map([['test',new Mesh(geometry)]]),_baseField:new Float32Array(8),_deformation:null,caseDefinition:{id:'test'},_cuts:[]};
  const demo=new GuidedDemo(sim,tissue,{cuttingBusy:false}),anchor=new Vector3(...scissorsAnchor(sim.state.tools.right));
  demo.plan={path:[new Vector3(.001234567890123,0,0)],transfers:{},jawOpening:.2,traction:{section:{}}};
  demo._bladeHistory=[{anchor:anchor.clone(),tool:structuredClone(sim.state.tools.right)}];demo._rowJournal=[structuredClone(sim.state.tools.right)];
  demo.active=true;demo.phase='raster';demo.pathIndex=0;
  const steering={anchor,target:anchor.clone().add(new Vector3(.0002,0,0)),resumeCutting:true};
  return{sim,tissue,demo,steering,dispose:()=>{geometry.dispose();for(const mesh of tissue._meshes.values())mesh.material.dispose();}};
}

test('planning transfers exact copied anatomy and Float64 controller history without detaching renderer buffers',()=>{
  const f=fixture();try{
    const context=runImmediately(capturePlanningContext(f.demo,f.sim.snapshot(),f.steering));
    const transferred=structuredClone(context,{transfer:planningTransfers(context)}),fields=restoreFields(transferred);
    assert.equal(f.tissue._baseField.byteLength,32);
    assert.equal(f.tissue._meshes.get('test').geometry.attributes.position.array.byteLength,36);
    assert.deepEqual(fields.plan.path,f.demo.plan.path);assert.deepEqual(fields._bladeHistory[0].tool.position,f.sim.state.tools.right.position);
    assert.deepEqual(fields._rowJournal[0].wrist,f.sim.state.tools.right.wrist);
  }finally{f.dispose();}
});

test('detached scene planning returns a continuously checked source-CAD route and never moves either live arm',async()=>{
  const f=fixture();try{
    const before=f.sim.snapshot(),context=runImmediately(capturePlanningContext(f.demo,before,f.steering));
    const result=await planJob(context,{yieldFrame:async()=>{}});
    assert.equal(result.cancelled,false);assert(result.value?.validatedPoses.length>0);
    assert.deepEqual(result.value.validatedPoses[0].position,before.state.tools.right.position,'the exact initial CAD witness must accompany the first replay interval');
    assert.deepEqual(result.value.validatedPoses[0].alignment,before.state.tools.right.alignment);
    assert(result.value.validatedPoses[0].bodyGaps.every(v=>v>0));
    assert.deepEqual(f.sim.snapshot(),before);assert.equal(f.tissue._contactRevision,1);
  }finally{f.dispose();}
});

test('a cancelled wrist job cannot publish its late result into a replacement job',async()=>{
  const f=fixture(),sent=[],listeners={};let wake;
  const worker={addEventListener:(type,fn)=>listeners[type]=fn,postMessage:message=>{sent.push(message);wake?.();},terminate:()=>{}};
  const planner=new WristPlanner(()=>worker),dispatched=async()=>{while(!sent.some(m=>m.type==='plan'))await new Promise(resolve=>wake=resolve);};
  try{
    const first=planner.plan(f.demo,f.steering,f.sim.snapshot());await dispatched();const firstId=sent.find(m=>m.type==='plan').id;
    const second=planner.plan(f.demo,f.steering,f.sim.snapshot());assert.equal((await first).cancelled,true);
    while(!sent.some(m=>m.type==='plan'&&m.id!==firstId))await new Promise(resolve=>wake=resolve);
    const secondId=sent.find(m=>m.type==='plan'&&m.id!==firstId).id;
    listeners.message({data:{id:firstId,result:{value:{stale:true},stats:{}}}});
    assert.equal(planner.active.id,secondId);
    listeners.message({data:{id:secondId,result:{value:{rest:{__demoVector:[1,2,3]}},stats:{}}}});
    const result=await second;assert.equal(result.stats.thread,'worker');assert.deepEqual(result.value.rest,new Vector3(1,2,3));assert.equal(planner.active,null);
  }finally{planner.dispose();f.dispose();}
});

test('stopping the demonstration cancels its worker before any further controller motion',()=>{
  const f=fixture();try{
    let cancelled=0;f.demo.wristPlanner={cancel:()=>cancelled++};const before=structuredClone(f.sim.state.tools);
    f.demo.stop();assert.equal(cancelled,1);assert.equal(f.demo.active,false);assert.deepEqual(f.sim.state.tools,before);
  }finally{f.dispose();}
});

test('a row recovery retains and checks its remaining actual entry poses before searching unrelated configurations',async()=>{
 const f=fixture();try{
  f.sim.setPaused(false);f.sim.setCutting(false);f.sim.setJaw('right',0);f.demo.plan.anchorJaw=0;f.demo.phase='row-transfer';
  const builder=new Simulation();builder.restore(f.sim.snapshot());const origin=[...builder.state.tools.right.position],records=[];
  for(const dx of[.0004,.0008]){assert(!builder.moveToolTo(origin.map((v,i)=>v+(i===0?dx:0)),'right').limited);records.push(structuredClone(builder.state.tools.right));}
  const anchor=new Vector3(...scissorsAnchor(f.sim.state.tools.right)),target=new Vector3(...scissorsAnchor(builder.state.tools.right));
  f.demo._rowReturn=records;f.demo._rowReturnIndex=0;f.demo._rowRecovery={index:1,target};const before=f.sim.snapshot(),context=runImmediately(capturePlanningContext(f.demo,before,{anchor,target,resumeCutting:false}));
  const result=await planJob(context,{yieldFrame:async()=>{}});assert(result.value?.remainingJournal,'resume the actual remaining path instead of rewinding the whole cut history');assert(result.value.validatedPoses.length>0);assert.deepEqual(f.sim.snapshot(),before);
 }finally{f.dispose();}
});


test('worker planning yields to cancellable message tasks without depending on background-throttled timers',async()=>{
 const f=fixture(),timer=globalThis.setTimeout;try{
  const context=runImmediately(capturePlanningContext(f.demo,f.sim.snapshot(),f.steering));
  globalThis.setTimeout=()=>{throw Error('background timer must not gate each worker planning slice');};
  const result=await planJob(context);assert.equal(result.cancelled,false);assert(result.value?.validatedPoses.length);
 }finally{globalThis.setTimeout=timer;f.dispose();}
});


test('a bounded preferred pass can yield to actual entry-history escape and still retain the identical full fallback',async()=>{
 const f=fixture();try{
  const make=()=>runImmediately(capturePlanningContext(f.demo,f.sim.snapshot(),f.steering));
  const complete=await planJob(make(),{yieldFrame:async()=>{},preferredBudgetMs:Infinity}),interleaved=await planJob(make(),{yieldFrame:async()=>{},preferredBudgetMs:0});
  assert.equal(interleaved.stats.historyFirstAttempted,true,'long preferred turns cannot starve the recorded exit indefinitely');
  assert.deepEqual(interleaved.value,complete.value,'if no actual entry history exists, resume every original preferred manoeuvre');
 }finally{f.dispose();}
});
