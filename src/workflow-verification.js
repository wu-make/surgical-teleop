import * as THREE from 'three';
import {yieldPreparationTask} from './preparation-task.js';

// Development-only end-to-end execution of the actual application controller.
// Try ordinary RAF first. A throttled host can still check the exact shared
// single-step/render/worker path, but that run is explicitly no FPS acceptance.
export async function verifyCompleteWorkflow(view,sim,interaction,pause,options){
  const {demo}=options,tissue=view.tissue,auditEvery=Number(new URLSearchParams(location.search).get('canvas-audit-every')??120),report={phases:[],frames:[],visibleAudits:[],auditEvery,mode:null,complete:false};let clock=performance.now(),frameResolve=null,auditTask=null;
  const assert=(value,message)=>{if(!value)throw new Error(message);};
  const send=async(name,data,type='application/json')=>fetch('/__qa__/'+name,{method:'POST',headers:{'Content-Type':type},body:type==='application/json'?JSON.stringify(data):data});
  const state=()=>({cutCount:tissue._cuts.length,removed:tissue.removedVolumeMm3,fragments:tissue.fragmentMetrics,grasp:interaction.metrics.grasp,blood:tissue.blood.metrics,tools:structuredClone(sim.state.tools),scope:structuredClone(sim.state.scope)});
  const phase=async name=>{const current=state();if(!tissue.blood.spread)assert(!current.blood.spreading&&!current.blood.droplets&&!current.blood.surfacePools&&Math.abs(current.blood.balanceErrorMm3)<1e-4,'wound-confined blood policy failed');report.phases.push({name,at:performance.now(),state:current});await send('v38-workflow-progress.json',{...report,frames:report.frames.slice(-8)});};
  const audit=()=>{
    if(auditTask)return;
    const phase=demo.phase;
    auditTask=(async()=>{const start=performance.now(),image=await createImageBitmap(view.canvas),c=new OffscreenCanvas(image.width,image.height),x=c.getContext('2d',{willReadFrequently:true});x.drawImage(image,0,0);image.close();const p=x.getImageData(0,0,c.width,c.height).data;let colored=0,opaque=0;for(let i=0;i<p.length;i+=4){if(p[i]||p[i+1]||p[i+2])colored++;if(p[i+3])opaque++;}report.visibleAudits.push({phase,width:c.width,height:c.height,coloredPixels:colored,opaquePixels:opaque,ms:performance.now()-start});})().finally(()=>auditTask=null);
  };
  const frame=now=>{report.frames.push({now,cutCount:tissue._cuts.length,phase:demo.phase,presented:view.renderTimings.presented,tissueMs:tissue.updateTimings.receiveMs,renderMs:view.renderTimings.scopeMs+view.renderTimings.overviewMs+(view.renderTimings.presentationMs??0),hidden:document.hidden});if(auditEvery>0&&report.frames.length%auditEvery===0)audit();if(frameResolve){const done=frameResolve;frameResolve=null;done();}};
  const nativeFrame=()=>new Promise(resolve=>frameResolve=resolve);
  const settle=async()=>{sim.state.paused=false;try{while(tissue.busy||interaction.cuttingBusy){if(tissue.busy)await new Promise(resolve=>tissue.worker.addEventListener('message',resolve,{once:true}));else await interaction.update(1/60);await yieldPreparationTask();}}finally{sim.state.paused=true;}};
  const sharedStep=async(keys=[],withDemo=true)=>{await settle();sim.state.paused=true;assert(await options.advance(keys,clock+=1000/60,withDemo),'shared application frame was rejected');frame(clock);await yieldPreparationTask();};
  const steps=async(count,keys=[])=>{
    if(report.mode==='ordinary-raf'){options.holdKeys(keys);sim.state.paused=false;for(let i=0;i<count;i++)await nativeFrame();options.holdKeys([]);sim.state.paused=true;}
    else{if(keys.includes('KeyH'))options.beginPressure();for(let i=0;i<count;i++)await sharedStep(keys,false);}
  };
  const capture=async name=>{sim.state.paused=true;view.update(sim.state,0);view.render();await send('v38-workflow-'+name+'.png',await new Promise(resolve=>view.canvas.toBlob(resolve,'image/png')),'image/png');};
  try{
    await options.reset();sim.state.paused=true;await phase('reset');options.setExclusive(false);options.setFrameCallback(frame);sim.state.paused=false;
    const first=performance.now(),before=report.frames.length;
    await Promise.race([(async()=>{for(let i=0;i<8;i++)await nativeFrame();})(),new Promise(resolve=>setTimeout(resolve,4000))]);
    const sample=report.frames.slice(before),span=sample.length>1?sample.at(-1).now-sample[0].now:Infinity;
    report.mode=!document.hidden&&sample.length>=8&&span<800?'ordinary-raf':'shared-single-step-no-fps-claim';report.nativeProbe={frames:sample.length,wallMs:performance.now()-first,spanMs:span,hidden:document.hidden};
    frameResolve=null;options.setFrameCallback(report.mode==='ordinary-raf'?frame:null);options.setExclusive(report.mode!=='ordinary-raf');sim.state.paused=true;
    assert(await demo.startExampleAsync({yieldFrame:yieldPreparationTask}),'actual peripheral resection plan failed');sim.state.paused=true;await phase('grasp-traction-and-cut-start');
    let previous=demo.phase;
    for(let i=0;demo.active&&i<12000;i++){
      if(report.mode==='ordinary-raf'){sim.state.paused=false;await nativeFrame();}
      else if(demo.mode==='planning')await yieldPreparationTask();else await sharedStep([],true);
      if(demo.phase!==previous){previous=demo.phase;await phase(previous);}
      else if(i%120===0)await send('v38-workflow-progress.json',{...report,current:state(),frames:report.frames.slice(-8)});
    }
    await settle();assert(!demo.active,'actual resection exceeded bounded duration');assert(tissue.fragmentMetrics.count>0,'no true separated specimen was generated');assert(interaction.grasp?.kind==='fragment','left grasper did not retain the real separated specimen');
    const id=interaction.grasp.fragmentId,piece=tissue.getFragment(id);await phase('separated-and-carried');await capture('carried');
    sim.select('left');const beforePosition=piece.position.clone(),beforeRotation=piece.quaternion.clone();tissue.blood.updatePositions();const owned=tissue.blood.nodes.filter(n=>n.fragmentId===id),bloodBefore=owned.map(n=>n.display.clone());
    await steps(30,['KeyE']);await steps(20,['KeyD']);assert(piece.held&&piece.position.distanceTo(beforePosition)>.0001,'manual held specimen movement failed');
    tissue.blood.updatePositions();const rotation=piece.quaternion.clone().multiply(beforeRotation.clone().invert());let bloodError=0;owned.forEach((n,i)=>bloodError=Math.max(bloodError,n.display.distanceTo(bloodBefore[i].sub(beforePosition).applyQuaternion(rotation).add(piece.position))));report.bloodFollow={ownedCells:owned.length,maxPositionError:bloodError};assert(owned.length>0&&bloodError<1e-8,'blood did not follow the moved specimen');await phase('manual-move-and-blood-follow');
    const releasedFrom=piece.position.clone();await steps(48,['KeyV']);await steps(90);assert(!piece.held&&!interaction.grasp,'open grasper did not release specimen');assert(piece.position.distanceTo(releasedFrom)>.001,'released specimen did not fall');await phase('released-and-fallen');
    sim.state.paused=false;assert(demo.approachSpecimen(),'actual same-specimen approach failed');sim.state.paused=true;for(let i=0;demo.active&&i<300;i++){if(report.mode==='ordinary-raf'){sim.state.paused=false;await nativeFrame();}else await sharedStep([],true);}await steps(55,['KeyC']);assert(interaction.grasp?.fragmentId===id,'regrasp did not acquire the same real specimen');await phase('same-specimen-regrasped');
    sim.state.paused=false;demo.approachBleeding();sim.state.paused=true;for(let i=0;demo.active&&i<300;i++){if(report.mode==='ordinary-raf'){sim.state.paused=false;await nativeFrame();}else await sharedStep([],true);}sim.select('right');await steps(180,['KeyH']);assert(tissue.blood.metrics.lastPressureContacts>0&&tissue.blood.metrics.pressureExposureSeconds>2,'local pressure never contacted a real bleeding surface');assert(Math.abs(tissue.blood.metrics.balanceErrorMm3)<1e-4,'blood mass balance failed');await phase('pressure-contact-confirmed');await capture('pressure');
    if(auditTask)await auditTask;if(auditEvery>0)assert(report.visibleAudits.length>0&&report.visibleAudits.every(a=>a.coloredPixels>0&&a.opaquePixels===a.width*a.height),'visible output contained a blank or transparent frame');assert(report.frames.every(f=>f.presented),'a complete rendered frame failed presentation');report.final=state();report.presentation=view.presentation.metrics;report.diagnostics=options.diagnostics();report.complete=true;await send('v38-workflow-result.json',report);
    await options.reset();sim.state.paused=true;view.update(sim.state,0);view.render();const tips=['left','right'].map(side=>new THREE.Vector3(...sim.state.tools[side].position).project(view.endoCamera));assert(!tissue._cuts.length&&!tissue.fragmentMetrics.count&&tips.every(p=>Math.abs(p.x)<1&&Math.abs(p.y)<1),'reset did not restore the complete organ and both visible tips');report.resetVerified=true;await send('v38-workflow-result.json',report);
  }catch(error){report.error=String(error);report.stack=error.stack;report.diagnostics=options.diagnostics();await send('v38-workflow-result.json',report);}
  finally{options.holdKeys([]);options.setFrameCallback(null);options.setExclusive(false);pause(true);}
}
