import * as THREE from 'three';
import {Simulation} from './simulation.js';
import {SurgicalScene} from './scene.js';
import {TissueVolume} from './tissue.js';
import {InteractionController} from './interaction-controller.js';
import {GuidedDemo} from './guided-demo.js';
import {makeScopeContext} from './scope-context.js';
import {collisionFeedback} from './collision-feedback.js';
import {attachScopeNavigation} from './scope-navigation.js';
import {armManualCut} from './manual-cutting.js';
import {advanceSimulationStep} from './simulation-step.js';
import {FrameMetrics} from './frame-metrics.js';
import {browserStalls} from './startup-observer.js';
import {RuntimeAttribution} from './runtime-attribution.js';
import {SessionExporter} from './session-exporter.js';
import {prepareSceneMaterials,warmSceneDisplay} from './render-preparation.js';
import {PausedPresentation} from './paused-presentation.js';
import {getStartupScreen} from './startup-screen.js';
import {ControlTaps} from './control-taps.js';
const startupScreen=getStartupScreen(),controlTaps=new ControlTaps();

const $=id=>document.getElementById(id),base=import.meta.env.BASE_URL;
const held=new Set(),pointerHeld=new Set(),allMotion=new Set(['KeyW','KeyA','KeyS','KeyD','KeyQ','KeyE','KeyZ','KeyX','KeyC','KeyV','KeyH','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','BracketLeft','BracketRight','Space','ShiftLeft','ShiftRight']);
let runtimeProbe,view,tissue,sim,interactionController,demo,scopeNavigation,ready=false,contextLost=false,precision='normal',lastFrame=performance.now(),nextRender=0,lastRenderAt=0,fpsFrames=0,fpsSince=lastFrame,lastUI=0,fps=0,historyBusy=false,frameHandle,frameDurations=[],runtimeErrors=[];
const startupStages=[],previousFrame={},previousRenderedFrame={};let startupDiagnostics=null;
function preserveStartup(){startupDiagnostics??={browser:browserStalls.report({detach:true}),stages:startupStages.slice()};}
const inputTimings=[];let exportPending=false;const sessionExporter=new SessionExporter(new Worker(new URL('./session-export-worker.js',import.meta.url),{type:'module'}));
sessionExporter.options.onArchiveError=error=>reportError(new Error('异常记录归档失败：'+error));
browserStalls.setArchive(message=>sessionExporter.worker.postMessage(message));
const record=[],maxRecords=3000;let toastTimer,inputFrames=0,inputEpoch=0;const timings={},frameStats=new FrameMetrics();
const pausedPresentation=new PausedPresentation();
frameStats.onLongFrame=row=>{browserStalls.captureFrame(row,frameStats.rows);frameStats.pinWindow('stall-'+browserStalls.incidentCount,row.work?.endedAt,{beforeMs:1000,afterMs:500});};
function toast(message){const host=document.fullscreenElement||$('app');if($('toast').parentElement!==host)host.append($('toast'));$('toast').textContent=message;$('toast').hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').hidden=true,3000);}
function updateCollisionUI(){
  if(!sim||!view)return;
  const feedback=collisionFeedback(sim.state.collision,view.mode),status=$('collision-status');
  const level=feedback.blocked?'blocked':feedback.contact?'contact':'clear';
  if(status.textContent!==feedback.status)status.textContent=feedback.status;
  if(status.title!==feedback.detail)status.title=feedback.detail;
  if(status.dataset.collision!==level)status.dataset.collision=level;
  let notice=$('collision-notice');
  if(!notice){notice=document.createElement('div');notice.id='collision-notice';notice.className='collision-notice';notice.setAttribute('role','status');notice.setAttribute('aria-live','polite');$('stage').append(notice);}
  if(notice.textContent!==feedback.notice)notice.textContent=feedback.notice;
  notice.hidden=!feedback.blocked;
}
function log(type,details={}){record.push({t:Number((sim?.state.elapsed||0).toFixed(3)),type,...details});if(record.length>maxRecords)record.shift();}
function clearInput(){inputEpoch++;held.clear();pointerHeld.clear();controlTaps.clear();scopeNavigation?.cancel();document.querySelectorAll('.held').forEach(n=>n.classList.remove('held'));if(interactionController)interactionController.lastCut=null;}
function geometryBusy(){return !!(tissue?.busy||interactionController?.cuttingBusy);}
function beginPressure(){if(historyBusy||!ready)return;const start=performance.now();demo?.stop('');sim.checkpoint('局部压迫止血',()=>interactionController.snapshot({forHistory:true}),{takeOwnership:true});sim.setCutting(false);interactionController.breakCutTrajectory();toast('剪切已关闭：闭合器械，稳定接触渗血切面并按住 H；松开后检查是否再渗血');inputTimings.push({type:'pressure-start',at:start,ms:performance.now()-start});if(inputTimings.length>32)inputTimings.shift();}
async function startExample(){
  if(historyBusy||(!demo?.active&&geometryBusy()))return;
  const at=performance.now();clearInput();if(!demo.active){preserveStartup();frameStats.clear();browserStalls.clear();}
  try{
    const pending=demo.startExampleAsync();switchView('endo');updateUI();
    const handlerMs=performance.now()-at,started=await pending;
    inputTimings.push({type:'example-start',at,handlerMs,wallMs:performance.now()-at,started,...(started?{planning:{...demo.planningTimings}}:{})});if(inputTimings.length>32)inputTimings.shift();
  }catch(error){reportError(error);}
}
async function singleStep(){
  if(!ready||historyBusy||geometryBusy()||!sim.state.paused)return;
  historyBusy=true;updateUI();
  const keys=new Set([...held,...pointerHeld,...controlTaps.take()]);if(precision==='fine')keys.add('ShiftLeft');
  try{await advanceSimulationStep({sim,tissue,interaction:interactionController,demo,keys,
    beforeControl:()=>sim.setScopeContext({...makeScopeContext(sim,tissue,interactionController,performance.now()),viewAspect:view.scopeAspect}),
    afterControl:dt=>{enforceScopeClearance();view.update(sim.state,dt);},
    afterInteraction:()=>{enforceScopeClearance();view.update(sim.state,0);view.render();}});}
  catch(e){reportError(e);}finally{historyBusy=false;updateUI();}
}
function selected(id){if(historyBusy)return;demo?.stop('');clearInput();sim.select(id);updateUI();$('stage').focus({preventScroll:true});}
function pause(value){if(historyBusy)return;if(value)interactionController?.breakCutTrajectory();clearInput();sim.setPaused(value);updateUI();}
function toggleFollow(){if(historyBusy)return;clearInput();sim.setScopeFollow(!sim.state.scope.follow);toast(sim.state.scope.follow?'内窥镜跟随当前控制目标':'自动跟随已关闭：拖拽转向，滚轮光学变焦；W/S 或 [ ] 控制进退');updateUI();}
function toggleCut(){if(historyBusy)return;if(sim.state.selected==='scope'){toast('请选择左钳或右剪后操作');return;}const enable=!sim.state.cutting;demo?.stop('');if(enable)sim.checkpoint('启用剪切',()=>interactionController.snapshot({forHistory:true}),{takeOwnership:true});interactionController.breakCutTrajectory();sim.setCutting(enable);interactionController.lastCut=null;updateUI();}
function switchView(mode){scopeNavigation?.cancel();view.setMode(mode|| (view.mode==='endo'?'overview':'endo'));$('view-endo').classList.toggle('active',view.mode==='endo');$('view-overview').classList.toggle('active',view.mode==='overview');$('endo-overlay').hidden=view.mode!=='endo';$('mini-title').textContent=view.mode==='endo'?'系统总览':'内窥镜 LIVE';$('mini-caption').textContent=view.mode==='endo'?'UNITREE G1 + 胸部持镜概念集成':'同一三维场景 · 实时内窥镜';$('stage').focus({preventScroll:true});}
async function undo(redo=false){if(historyBusy||!ready)return;if(geometryBusy()){toast('正在完成已记录的剪切，请完成后撤销或重做');return;}demo?.stop('');historyBusy=true;clearInput();updateUI();try{const current=interactionController.snapshot();const action=redo?sim.redo(current):sim.undo(current);if(!action){toast(redo?'没有可重做的操作':'没有可撤销的操作');return;}view.releaseKinematicGuard();if(action.hasExtraData)await interactionController.restore(action.extraData);sim.setCutting(false);toast((redo?'已重做：':'已撤销：')+action.label);log(redo?'redo':'undo');}catch(e){reportError(e);}finally{historyBusy=false;updateUI();}}
async function reset(){
  if(historyBusy||!ready)return;
  demo?.stop('');historyBusy=true;clearInput();updateUI();
  try{
    // Invalidate an in-flight cut before restoring geometry. Its late response
    // must not reattach a specimen or overwrite the new interaction state.
    interactionController.reset();
    await tissue.reset();
    sim.reset();sim.select('right');sim.setCutting(true);preserveStartup();frameStats.clear();browserStalls.clear();
    precision='normal';document.querySelectorAll('[data-speed]').forEach(button=>button.classList.toggle('active',button.dataset.speed===precision));
    switchView('endo');
    sim.prepareInitialScopeView(view.scopeAspect);
    view.resetPresentation(sim.state);
    view.render();
    log('reset');toast('完整器官、双臂、器械与镜头已复原；双尖端同时入镜');
  }catch(e){reportError(e);}finally{historyBusy=false;updateUI();}
}
function reportError(error){runtimeErrors.push(String(error.message||error));console.error(error);$('system-status').textContent='需要检查';toast('操作未完成：'+(error.message||error));}
let lastDiagnostics=-Infinity;
const uiWrites={changed:0,skipped:0};
function setText(element,value){if(element.textContent!==value){element.textContent=value;uiWrites.changed++;}else uiWrites.skipped++;}
function setHTML(element,value){if(element.innerHTML!==value){element.innerHTML=value;uiWrites.changed++;}else uiWrites.skipped++;}
function setAttribute(element,name,value){if(element.getAttribute(name)!==value){element.setAttribute(name,value);uiWrites.changed++;}else uiWrites.skipped++;}
function updateUI(){if(!sim)return;const s=sim.state,fragments=tissue?.fragmentMetrics,tool=s.tools[s.selected]||s.scope,pos=tool.position;const names={left:'左手 · 持针钳 / 牵拉',right:'右手 · 精细分离剪',scope:'胸部 · 内窥镜'};const ref=[0,1.035,0],stageHeight=$('stage').clientHeight;['x','y','z'].forEach((axis,i)=>{setHTML($('pos-'+axis),((pos[i]-ref[i])*1000).toFixed(1)+'<small>mm</small>');});
  setText($('active-tool'),{left:'LEFT / L',right:'RIGHT / R',scope:'SCOPE / C'}[s.selected]);setText($('selected-badge'),names[s.selected]);document.querySelectorAll('[data-select]').forEach(b=>{const on=b.dataset.select===s.selected;b.classList.toggle('selected',on);setAttribute(b,'aria-pressed',String(on));});
  setText($('jaw-value'),s.selected==='scope'?'—':Math.round(tool.jaw*100)+'%');setText($('scope-depth'),(s.scope.depth*1000).toFixed(1)+' mm');setAttribute($('follow'),'aria-checked',String(s.scope.follow));$('follow').querySelector('.switch').classList.toggle('on',s.scope.follow);setAttribute($('cut-mode'),'aria-checked',String(s.cutting));$('cut-mode').querySelector('.switch').classList.toggle('on',s.cutting);$('cut-mode').classList.toggle('active-cut',s.cutting);setText($('stage-cut-mode'),s.cutting?'右剪就绪 · B 暂停':'剪切暂停 · C 剪切');setAttribute($('stage-cut-mode'),'aria-pressed',String(s.cutting));setText($('stage-cut-feedback'),(interactionController?.contact.cutReason||'')+' · 切削 '+(tissue?.removedVolumeMm3??0).toFixed(1)+' mm³ · 标本 '+(fragments?.count??0)+' 块');
  setText($('scope-summary'),s.scope.follow?'RCM 持镜 · '+({active:'尖端跟随',midpoint:'双器械居中',grasp:'协作区域跟随'}[s.scope.followMode]):'RCM 持镜 · 手动控制');for(const side of['left','right']){setText($(side+'-summary'),(s.selected===side?'已选择 · ':'待命 · ')+(s.tools[side].jaw<.16?(side==='left'&&interactionController?.grasp?(interactionController.grasp.fragmentId?'已夹持 · 独立组织块':'已抓持 · 牵拉中'):'钳口闭合'):'钳口 '+Math.round(s.tools[side].jaw*100)+'%'));}
  setText($('view-status'),view.mode==='endo'?'内窥镜 · '+(s.scope.follow?(s.scope.framingLimited?'视野不足 · 滚轮缩小':({active:'当前尖端跟随',midpoint:'双尖端取景',grasp:'牵拉协作跟随'}[s.scope.followMode])):'手动镜头'):'系统总览 · 鼠标拖动观察');setHTML($('removed'),(tissue?.removedVolumeMm3||0).toFixed(1)+' <small>mm³</small>');$('removed-bar').style.width=Math.min(100,(tissue?.removedVolumeMm3||0)/(tissue?.totalVolumeMm3||1)*100)+'%';setText($('tissue-status'),fragments?.count?'已分离 '+fragments.count+' 块':(tissue?.removedVolumeMm3||0)>0?'已切除组织':'完整');$('undo').disabled=!sim.canUndo||historyBusy||geometryBusy();$('redo').disabled=!sim.canRedo||historyBusy||geometryBusy();$('reset').disabled=historyBusy;$('export').disabled=historyBusy||geometryBusy()||exportPending;$('help-export').disabled=$('export').disabled;$('view-home').disabled=historyBusy||(view.mode==='endo'&&s.paused);$('pause-overlay').hidden=!s.paused;setHTML($('pause'),(s.paused?'▶ 继续仿真':'Ⅱ 暂停仿真')+' <kbd>P</kbd>');setText($('run-status'),s.paused?'Ⅱ 已暂停':'● 运行中');const sec=Math.floor(s.elapsed);setText($('session-time'),String(Math.floor(sec/60)).padStart(2,'0')+':'+String(sec%60).padStart(2,'0'));$('clutch-indicator').classList.toggle('active',held.has('Space')||pointerHeld.has('Space'));setText($('system-status'),runtimeErrors.length?'需要检查':historyBusy?'恢复场景中':geometryBusy()?(s.paused?'剪切待处理 · 请继续':'更新组织'):demo?.mode==='planning'&&demo.active?'准备切离路径中':'系统就绪');
  document.querySelectorAll('[data-hold="KeyC"],[data-hold="KeyV"]').forEach(b=>b.disabled=s.selected==='scope');
  const contact=interactionController?.contact;const deformation=tissue?.graspMetrics;setText($('left-contact'),interactionController?.relaxing&&!interactionController?.grasp?'未切断 · 从钳口滑脱并回落，仍连接母体':!interactionController?.grasp&&interactionController?.requiresReopen?'空钳闭合 · V 张开后贴近表面，再 C 夹取':interactionController?.grasp?(interactionController.grasp.fragmentId?'已夹持独立组织块 · 可抬起移开 / V 释放':'已抓持 · 牵拉 '+(deformation?.displacementMm||0).toFixed(1)+' mm'):contact?.leftFragmentId?'标本接触 · C 夹持':contact?.left?'包膜接触 · C 抓持':'未接触 · 可表面就位');setText($('right-contact'),contact?.cutReason||(s.cutting?'等待剪刃接触组织并闭合 C':'右剪待命 · C 闭合剪切'));setAttribute($('right-contact'),'data-cut-status',contact?.cutStatus||'disabled');setText($('roll-value'),s.selected==='scope'?(s.scope.roll*180/Math.PI).toFixed(1)+'°':(tool.wrist[2]*180/Math.PI).toFixed(1)+'°');$('follow-mode').value=s.scope.followMode;$('scope-content').value=s.scope.viewMode;setText($('demo'),demo?.active?(demo.mode==='planning'?'■ 取消路径准备':'■ 停止自动操作'):'▶ 切离与移开示范');$('demo').disabled=historyBusy||(!demo?.active&&geometryBusy());$('approach').disabled=historyBusy||geometryBusy()||s.selected==='scope'||s.paused;updateCollisionUI();setText($('connection-status'),view.conceptDecoupled?'概念主从联接':'双臂器械联接');
  setText($('specimen-count'),(fragments?.count||0)+' 块');setText($('specimen-volume'),((fragments?.volumeMm3||0)/1000).toFixed(2)+' cm³');setText($('specimen-state'),fragments?.pieces.some(piece=>piece.held)?'左钳夹持 · 独立搬运':fragments?.count?'已切离 · C 可再次夹持':'组织桥完全切断后才会分离');$('approach-specimen').disabled=historyBusy||geometryBusy()||!fragments?.count||fragments.pieces.some(piece=>piece.held)||s.paused;
  const blood=tissue?.blood?.metrics;
  $('single-step').disabled=historyBusy||geometryBusy()||!s.paused;
  $('approach-bleed').disabled=historyBusy||geometryBusy()||s.paused||!blood?.activeSources;
  setText($('blood-volume'),(blood?.emittedMl??0).toFixed(3)+' mL');
  setText($('blood-retained'),(blood?.retainedMl??0).toFixed(3)+' mL');
  setText($('bleeding-state'),blood?.pressureContacts?'局部压迫中 · 松开后继续观察':blood?.recentPressure?'已局部压迫 · 继续观察是否再渗血':blood?.activeSources?'切面仍有渗血':blood?.emittedMl?'当前流量已受抑制 · 需继续观察':'尚无开放出血切面');
  const tcpProjection=new THREE.Vector3(...s.tools[s.activeTool].position).project(view.endoCamera);
  const scopeTipsNdc=Object.fromEntries(['left','right'].map(side=>[side,new THREE.Vector3(...s.tools[side].position).project(view.endoCamera).toArray()]));
  $('stage').dataset.telemetry=JSON.stringify({state:sim.snapshot().state,fps,errors:runtimeErrors,removedVolumeMm3:tissue?.removedVolumeMm3,fragments,armErrors:view.armErrors,scopeArmError:view.assemblies?.scopeArmError,toolRCMErrors:view.assemblies?.toolRCMErrors,interaction:interactionController?.metrics,demo:demo?.active,demoPhase:demo?.phase,tissueBusy:tissue?.busy,cutCount:tissue?._cuts.length,viewMode:view.mode,precision,scopeFeed:view.scopeFeed.resolution,renderFrame:view.renderFrame,scopeQuality:{samples:view.scopeFeed.target.samples,hdr:view.scopeFeed.target.texture.type===THREE.HalfFloatType},presentation:{fullscreen:!!document.fullscreenElement,pixelRatio:view.renderer.getPixelRatio()},scopeViewAspect:sim.viewAspect,scopeTcpNdc:tcpProjection.toArray(),scopeTipsNdc,robotJoints:view.joints.map(joint=>({name:joint.name,angle:joint.userData.angle})),scopeFov:view.endoCamera.fov,drawCalls:view.renderer.info.render.calls,triangles:view.renderer.info.render.triangles,connectionModes:view.assemblies?.connectionModes,timings,frameSession:frameStats.totals,presentationChanges:frameStats.presentationChanges,inputTimings,uiWrites:{...uiWrites},tissueTimings:tissue.updateTimings,geometryOperations:tissue.operationMetrics});if(view.mode==='endo'){const p=new THREE.Vector3(...s.tools[s.activeTool].position).applyMatrix4(view.endoCamera.matrixWorldInverse);const pixels=.01*stageHeight/(2*Math.tan(THREE.MathUtils.degToRad(view.endoCamera.fov*.5))*Math.max(.01,-p.z));$('lens-scale').style.width=pixels+'px';}
  // Visual controls and physical state remain at the original cadence. Large
  // passive histories have their own DOM channel; repeatedly serializing all
  // frozen incident contexts must not compete with the operation being timed.
  for(const transition of tissue.transitionTimings)frameStats.pinWindow('separation',transition.receivedAt);
  const diagnosticAt=performance.now();if(diagnosticAt-lastDiagnostics>=1000){lastDiagnostics=diagnosticAt;$('stage').dataset.diagnostics=JSON.stringify({sampledAt:diagnosticAt,framePerformance:frameStats.cached,frameStalls:frameStats.slowFrames.slice(-8),frameWorst:frameStats.worstFrames,browserStalls:browserStalls.report({compact:true}),startupDiagnostics,resizeTimings:view.resizeTimings,transitionTimings:tissue.transitionTimings,fragmentRouteTimings:demo.fragmentRouteTimings,renderTimings:view.renderTimings});}
  const lensLabel=document.querySelector('.lens-label');if(lensLabel)setText(lensLabel,'LAPAROSCOPE · '+(s.scope.fov??55).toFixed(0)+'° FOV');
}
function attachUI(){
  document.querySelectorAll('[data-select]').forEach(b=>b.onclick=()=>selected(b.dataset.select));
  document.querySelectorAll('[data-speed]').forEach(b=>b.onclick=()=>{if(historyBusy)return;precision=b.dataset.speed;document.querySelectorAll('[data-speed]').forEach(n=>n.classList.toggle('active',n===b));toast(precision==='fine'?'精细模式：降低位移与旋转速度':'标准速度模式');});
  for(const b of document.querySelectorAll('[data-hold]')){
    let beganAtFrame=0,pressActive=false,pressEpoch=0;
    const begin=()=>{if(pressEpoch!==inputEpoch)pressActive=false;if(!ready||historyBusy||pressActive)return false;if(b.dataset.hold==='KeyH')beginPressure();if(b.dataset.hold==='KeyV'||b.dataset.hold==='Space')interactionController.breakCutTrajectory();demo?.stop('');armManualCut(sim,interactionController,b.dataset.hold,{pressureHeld:held.has('KeyH')||pointerHeld.has('KeyH')});beganAtFrame=inputFrames;pressEpoch=inputEpoch;pressActive=true;pointerHeld.add(b.dataset.hold);b.classList.add('held');return true;};
    const stop=e=>{const tap=pressActive&&pressEpoch===inputEpoch&&beganAtFrame===inputFrames&&['pointerup','keyup'].includes(e.type);pressActive=false;pointerHeld.delete(b.dataset.hold);b.classList.remove('held');if(tap&&!historyBusy&&!sim.state.paused){const keys=new Set([b.dataset.hold]);if(precision==='fine')keys.add('ShiftLeft');sim.update(.05,keys);if(b.dataset.hold==='KeyH')void interactionController.update(.05,{compressing:true}).catch(reportError);sim.update(1e-9,new Set());updateUI();}};
    b.addEventListener('pointerdown',e=>{e.preventDefault();if(begin())b.setPointerCapture(e.pointerId);});b.addEventListener('pointerup',stop);b.addEventListener('pointercancel',stop);b.addEventListener('lostpointercapture',stop);b.addEventListener('keydown',e=>{if(e.code==='Enter'){e.preventDefault();begin();}});b.addEventListener('keyup',e=>{if(e.code==='Enter')stop(e);});b.addEventListener('blur',stop);
  }
  $('approach-bleed').onclick=()=>{if(historyBusy||geometryBusy()||sim.state.paused)return;clearInput();demo.stop('');demo.approachBleeding();updateUI();};
  $('single-step').onclick=singleStep;
  $('pause').onclick=()=>pause(!sim.state.paused);$('resume').onclick=()=>pause(false);$('undo').onclick=()=>undo();$('redo').onclick=()=>undo(true);$('reset').onclick=reset;$('follow').onclick=toggleFollow;$('cut-mode').onclick=toggleCut;$('stage-cut-mode').onclick=()=>{toggleCut();$('stage').focus({preventScroll:true});};
  $('follow-mode').onchange=e=>{if(historyBusy){updateUI();return;}clearInput();sim.setScopeFollow(true,e.target.value);updateUI();};$('scope-content').onchange=e=>{if(historyBusy){updateUI();return;}clearInput();sim.setScopeViewMode(e.target.value);sim.setScopeFollow(true);toast(e.target.value==='specimen'?'按真实标本大小调整观察距离；中心仍跟随所选控制目标':'局部术野距离；中心跟随所选控制目标');updateUI();};$('demo').onclick=startExample;$('approach').onclick=()=>{if(historyBusy||geometryBusy())return;clearInput();demo.stop('');demo.approach();updateUI();};
  $('approach-specimen').onclick=()=>{if(historyBusy||geometryBusy())return;clearInput();demo.stop('');demo.approachSpecimen();switchView('endo');updateUI();};
  $('view-endo').onclick=()=>switchView('endo');$('view-overview').onclick=()=>switchView('overview');$('swap-view').onclick=()=>switchView();$('view-home').onclick=()=>{if(historyBusy||(view.mode==='endo'&&sim.state.paused))return;clearInput();if(view.mode==='endo'){sim.checkpoint('内窥镜视角复位',()=>interactionController.snapshot({forHistory:true}),{takeOwnership:true});sim.homeScopeView();}else view.home();toast('观察视角已复位');};$('fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else{const stage=$('stage');const start=performance.now();await stage.requestFullscreen({navigationUI:'hide'});inputTimings.push({type:'fullscreen-enter',at:start,ms:performance.now()-start,screen:[screen.width,screen.height]});}}catch{toast('当前浏览器不支持全屏，请使用浏览器全屏模式');}};
  $('help').onclick=()=>{demo?.stop('');clearInput();$('help-dialog').showModal();};$('about').onclick=()=>{demo?.stop('');clearInput();$('about-dialog').showModal();};document.querySelectorAll('dialog [data-close]').forEach(b=>b.onclick=()=>b.closest('dialog').close());document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d)d.close();}));
  $('export').onclick=async()=>{if(exportPending)return;if(historyBusy||geometryBusy()){toast('请等待已记录的剪切处理完成后导出');return;}exportPending=true;const exportAt=performance.now();try{const data={app:'MIRA surgical teleoperation demo',version:4,performance:{...frameStats.report({includeIntervals:true}),browserStalls:browserStalls.report({detach:true}),startupDiagnostics,inputTimings:structuredClone(inputTimings),resizeTimings:structuredClone(view.resizeTimings),transitions:structuredClone(tissue.transitionTimings),geometryOperations:structuredClone(tissue.operationMetrics),fragmentRouteTimings:structuredClone(demo.fragmentRouteTimings),rendering:{scopeFeed:view.scopeFeed.resolution,renderFrame:view.renderFrame,samples:view.scopeFeed.target.samples,pixelRatio:view.renderer.getPixelRatio(),fullscreen:!!document.fullscreenElement}},exportedAt:new Date().toISOString(),units:'metres/radians/seconds',tissueVoxelMm:tissue.voxelMm,removedVolumeMm3:tissue.removedVolumeMm3,state:sim.snapshot(),interaction:interactionController.snapshot({forHistory:true}),events:structuredClone(record)};const encoded=sessionExporter.encode(data,{takeOwnership:true});inputTimings.push({type:'export-capture',at:exportAt,ms:performance.now()-exportAt});if(inputTimings.length>32)inputTimings.shift();updateUI();const blob=await encoded;const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='mira-session-'+new Date().toISOString().replace(/[:.]/g,'-')+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);toast('操作与帧时间记录已导出');}catch(error){reportError(error);}finally{exportPending=false;updateUI();}};$('help-export').onclick=$('export').onclick;
  window.addEventListener('keydown',e=>{if(!ready||e.target.closest('input,textarea,select,[contenteditable=true]')||document.querySelector('dialog[open]'))return;if(e.ctrlKey||e.metaKey){if(e.code==='KeyZ'){e.preventDefault();if(!e.repeat)undo(e.shiftKey);return;}if(e.code==='KeyY'){e.preventDefault();if(!e.repeat)undo(true);return;}return;}if(allMotion.has(e.code)){e.preventDefault();if(!e.repeat&&e.code==='KeyH')beginPressure();if(!e.repeat&&(e.code==='Space'||e.code==='KeyV'))interactionController.breakCutTrajectory();if(e.code!=='Space'&&!e.code.startsWith('Shift'))demo?.stop('');if(!historyBusy){armManualCut(sim,interactionController,e.code,{pressureHeld:held.has('KeyH')||pointerHeld.has('KeyH')});if(!e.repeat)controlTaps.begin(e.code,inputFrames);held.add(e.code);}return;}const actions={Digit1:()=>selected('left'),Digit2:()=>selected('right'),Digit3:()=>selected('scope'),KeyP:()=>pause(!sim.state.paused),KeyF:toggleFollow,KeyB:toggleCut,KeyR:reset,Tab:()=>switchView(),Slash:()=>{demo?.stop('');$('help-dialog').showModal();clearInput();}};if(actions[e.code]){e.preventDefault();if(!e.repeat)actions[e.code]();}});
  window.addEventListener('keyup',e=>{controlTaps.end(e.code,inputFrames);held.delete(e.code);});window.addEventListener('blur',clearInput);document.addEventListener('visibilitychange',()=>{clearInput();if(document.hidden&&ready)pause(true);});
  $('scene').addEventListener('webglcontextlost',e=>{
    e.preventDefault();contextLost=true;clearInput();sim.setPaused(true);demo?.stop('');
    $('loading').hidden=false;$('loading-detail').textContent='显卡连接中断：操作已暂停，等待显卡恢复。';
    log('graphics-lost');
  });
  $('scene').addEventListener('webglcontextrestored',async()=>{
    try{
      $('loading-detail').textContent='正在恢复完整材质和术野，组织与操作记录保留…';
      await view.renderer.compileAsync(view.scene,view.endoCamera);await view.renderer.compileAsync(view.scene,view.overviewCamera);
      contextLost=false;lastFrame=performance.now();lastRenderAt=0;nextRender=0;view.update(sim.state,0);view.render();
      $('loading').hidden=true;updateUI();log('graphics-restored');toast('显卡已恢复，组织状态保留；按 P 继续');
    }catch(error){$('loading-detail').textContent='显卡恢复未完成，请刷新页面重试。';reportError(error);}
  });
  scopeNavigation=attachScopeNavigation({canvas:$('scene'),sim,
    enabled:()=>ready&&!historyBusy&&view.mode==='endo'&&!held.has('Space')&&!pointerHeld.has('Space')&&!document.querySelector('dialog[open]'),
    onBegin:label=>{demo?.stop('');sim.checkpoint(label,()=>interactionController.snapshot({forHistory:true}),{takeOwnership:true});},
    onFocus:()=>$('stage').focus({preventScroll:true}),
    onChange:()=>{enforceScopeClearance();updateUI();}});
}
function interaction(keys,dt){if(!ready||historyBusy)return;void interactionController.update(dt,{clutched:keys.has('Space'),compressing:keys.has('KeyH')}).catch(reportError);}
function enforceScopeClearance(){
  const scope=sim.state.scope,port=new THREE.Vector3(...scope.port),direction=new THREE.Vector3(...scope.position).sub(port).normalize();let previous=.018;
  for(let i=0;i<=8;i++){const depth=.018+(scope.depth-.018)*i/8;const point=tissue.group.worldToLocal(port.clone().addScaledVector(direction,depth));if(tissue.contactDistance(point,.005)<.005){let low=previous,high=depth;for(let j=0;j<8;j++){const middle=(low+high)*.5;const sample=tissue.group.worldToLocal(port.clone().addScaledVector(direction,middle));if(tissue.contactDistance(sample,.005)<.005)high=middle;else low=middle;}scope.depth=low;scope.position=port.addScaledVector(direction,low).toArray();return;}previous=depth;}
}
function animate(now){
  frameHandle=requestAnimationFrame(animate);const dt=Math.max(0,Math.min(.05,(now-lastFrame)/1000));const priorRaf=lastFrame;lastFrame=now;if(!ready||contextLost)return;
  if(!pausedPresentation.needsFrame(sim.state.paused,()=>JSON.stringify([sim.state,view.mode,view.frameLayout,view.overviewCamera.position.toArray(),view.overviewCamera.quaternion.toArray(),view.controls.target.toArray(),tissue._epoch,tissue._contactRevision,tissue.updateTimings.receivedAt,tissue.blood.clock,tissue.blood.renderDirty,historyBusy]))){
    frameStats.sample(now,'manipulation',false);previousFrame.eligible=false;previousFrame.rendered=false;fpsSince=now;fpsFrames=0;
    if(now-lastUI>1000){lastUI=now;updateUI();setText($('fps'),'已暂停');}return;
  }
  const start=performance.now();browserStalls.raf(priorRaf,now,start,previousFrame,!sim.state.paused&&!historyBusy&&!document.hidden);const keys=new Set([...held,...pointerHeld,...controlTaps.take()]);if(precision==='fine')keys.add('ShiftLeft');if(historyBusy)keys.clear();
  if(!historyBusy)sim.setScopeContext({...makeScopeContext(sim,tissue,interactionController,now),viewAspect:view.scopeAspect});
  if(!historyBusy&&!keys.has('Space'))demo.update(dt);
  if(!historyBusy)sim.update(dt,keys);inputFrames++;const controlEnd=performance.now();timings.control=controlEnd-start;
  if(!sim.state.paused&&!historyBusy)enforceScopeClearance();timings.clearance=performance.now()-controlEnd;
  updateCollisionUI();
  let rendered=false;if(now>=nextRender){rendered=true;frameStats.sample(now,demo?.active&&demo.mode==='planning'?'planning':keys.has('KeyH')?'pressure':sim.state.cutting&&(sim.state.tools.right.jaw<.6||keys.has('KeyC')||interactionController.cuttingBusy)?'cutting':'manipulation',!sim.state.paused&&!historyBusy&&!document.hidden,()=>({endedAt:now,previousFrame:{...previousFrame},previousRenderedFrame:{...previousRenderedFrame},timings:{...timings},interaction:{...interactionController.timings},tissue:{...tissue.updateTimings},queries:tissue.queryMetrics,blood:{cells:tissue.blood.nodes.length,parcels:tissue.blood.drops.length,timings:{...tissue.blood.timings},renderTimings:{...tissue.blood.renderTimings}},render:{...view.renderTimings},cutCount:tissue._cuts.length,fragments:tissue.fragments.items.size}));const renderDt=Math.min(.05,lastRenderAt?(now-lastRenderAt)/1000:dt),sceneStart=performance.now();view.update(sim.state,renderDt);lastRenderAt=now;const sceneEnd=performance.now();interaction(keys,renderDt);const interactionEnd=performance.now();const gpuSample=runtimeProbe.begin(now);try{view.render(now);}finally{runtimeProbe.end(gpuSample);}frameStats.observePresentation(!!document.fullscreenElement,view.scopeFeed.resolution.width,view.scopeFeed.resolution.height,view.renderer.getPixelRatio(),now);timings.scene=sceneEnd-sceneStart;timings.interaction=interactionEnd-sceneEnd;timings.render=performance.now()-interactionEnd;fpsFrames++;nextRender=Math.max(nextRender+1000/60,now-1000/60);}
  browserStalls.span('animate',start,performance.now());frameDurations.push(performance.now()-start);if(frameDurations.length>600)frameDurations.shift();
  if(now-fpsSince>1000){frameStats.summarize();fps=fpsFrames*1000/(now-fpsSince);setText($('fps'),fps.toFixed(0)+' FPS');fpsFrames=0;fpsSince=now;}
  timings.ui=0;if(now-lastUI>100){lastUI=now;const uiStart=performance.now();updateUI();timings.ui=performance.now()-uiStart;browserStalls.span('updateUI',uiStart,performance.now());}
  Object.assign(previousFrame,{raf:now,start,end:performance.now(),eligible:!sim.state.paused&&!historyBusy&&!document.hidden,controlMs:timings.control,clearanceMs:timings.clearance,rendered,sceneMs:rendered?timings.scene:0,interactionMs:rendered?timings.interaction:0,renderMs:rendered?timings.render:0,uiMs:timings.ui,cutCount:tissue._cuts.length,fragments:tissue.fragments.items.size});browserStalls.finishFrame(previousFrame);if(rendered){Object.assign(previousRenderedFrame,previousFrame);runtimeProbe.afterFrame(now);}
}
async function init(){try{
  let stageStart=performance.now();
  startupScreen.progress('准备手术室光照与三维工作空间…');view=await SurgicalScene.create($('scene'),$('stage'),$('mini-view'));runtimeProbe=new RuntimeAttribution({gl:view.renderer.getContext(),workerUrl:new URLSearchParams(location.search).has('gpu-profile')?new URL('./runtime-heartbeat-worker.js',import.meta.url):null,measureGpu:new URLSearchParams(location.search).has('gpu-profile'),gpuIntervalMs:new URLSearchParams(location.search).get('gpu-profile')==='all'?0:200,onSample:row=>browserStalls.runtimeSample(row)});browserStalls.runtime=runtimeProbe;tissue=new TissueVolume({gpuBlood:true});sim=new Simulation({ownsExtraData:true,shouldCheckpoint:()=>!geometryBusy(),getExtraData:()=>interactionController?.snapshot({forHistory:true})??tissue.snapshot(),onEvent:e=>{if(e.type!=='history')log(e.type);}});sim.select('right');sim.setCutting(true);interactionController=new InteractionController(sim,tissue,{onMessage:toast,onEvent:log,toolDirection:side=>view.assemblies?.toolDirections?.[side],toolQuaternion:side=>view.assemblies?.tools[side]?.tipQuaternion,toolBlade:side=>view.assemblies?.toolBlade(side)});demo=new GuidedDemo(sim,tissue,interactionController,{onMessage:toast,onChange:()=>{if(ready)updateUI();}});
  tissue.onDiagnostic=(name,start,end)=>browserStalls.span(name,start,end);startupStages.push(...view.startupTimings,{name:'scene-initialization-wall',start:stageStart,end:performance.now()});stageStart=performance.now();
  startupScreen.progress('加载机器人、器械与肝脏体积…');await Promise.all([view.loadRobot(),tissue.load(base+'assets/liver-volume')]);startupStages.push({name:'robot-volume-wall',start:stageStart,end:performance.now()});stageStart=performance.now();view.addTissue(tissue);tissue.group.rotation.x=-Math.PI/2;tissue.group.updateMatrixWorld(true);startupScreen.progress('装配器械并加载周围解剖结构…');await view.loadAnatomy?.();startupStages.push({name:'assembly-anatomy-wall',start:stageStart,end:performance.now()});stageStart=performance.now();
  $('model-details').innerHTML='<p><strong>宇树 G1：</strong>官方 29 自由度 CAD，保留原始尺寸与关节层级，双臂由逆运动学驱动。原始固定手型通过掌托、绑带和球接轴夹固定器械；夹具为概念设计。器械自由移动不受机械臂可达范围阻挡；超出真实手臂可达范围时显示概念主从联接。</p><p><strong>肝胆解剖：</strong>BodyParts3D 公开成人肝脏、胆囊与肝总动脉，同源坐标注册。体积间距 '+tissue.voxelMm+' mm；包膜与细小纹理由程序材质表现，并非患者 CT 或组织学数据。</p><p><strong>牵拉与切除：</strong>抓持实际表面，三维顶点、法线和阴影随动。剪切贯通并切断全部组织桥后，按体积连通性提取独立三维组织块，可夹持、旋转、移开、释放和再次夹取；切面及两侧封闭表面均保留。撤销同时恢复切口、组织块和夹持。牵拉为几何近似，松手组织块采用简化重力与表面接触。</p><p><strong>器械与持镜：</strong>真实 dVRK 持针钳、弯剪和内窥镜 CAD。G1 胸部 Z1 与快换耦合器为概念集成，非官方医疗配置。旋转连续多圈、无工作空间围栏，仅双器械防碰撞；这也意味着并未模拟真机电缆/关节行程。</p><p><strong>镜头：</strong>当前器械模式精确跟随正在操作的 CAD 尖端，双器械中心和牵拉协作区按显式选择工作。小幅移动即时居中，大幅切换限速转向，实体内窥镜与成像光轴一致；自动进退维持约 65 mm 观察距离，标本模式按真实包围体调整距离。关闭自动后可在主画面拖拽转向；滚轮独立调整 25–80° 光学视角，W/S 或 [ ] 控制实体进退。手动进退保留距离偏置，肝表面提供防穿透。术野与室内实体屏共用同一帧实时图像。</p>';
  const fidelity=document.createElement('p');fidelity.textContent='仿真能力：支持局部牵拉、体积切除、标本搬运、体积守恒血膜/血滴与持续局部压迫。出血、凝血和压迫是未标定的交互近似，现有器械接触不等于完整临床止血器械或术式；尚无经实验标定的组织力学、热损伤、患者特定血管胆管损伤及触觉反馈。细小纤维几何仅表现暴露实质，不是显微组织重建，不能用于评定临床手术能力。夹取容差 2 mm，不代表材料精度。';$('model-details').append(fidelity);
  sim.prepareInitialScopeView(view.scopeAspect);startupStages.push({name:'initial-scope',start:stageStart,end:performance.now()});stageStart=performance.now();view.resetPresentation(sim.state);startupStages.push({name:'joint-settle',start:stageStart,end:performance.now()});stageStart=performance.now();view.update(sim.state,0);
  startupStages.push({name:'initial-pose',start:stageStart,end:performance.now()});stageStart=performance.now();
  startupScreen.progress('准备完整切面、血液和双视角材质…');await prepareSceneMaterials(view,{width:Math.max(screen.width,innerWidth),height:Math.max(screen.height,innerHeight)});
  if(view.geometryPreparation)startupStages.push(view.geometryPreparation);
  startupStages.push({name:'compile-wall',start:stageStart,end:performance.now()});stageStart=performance.now();
  startupScreen.progress('预热完整模型和材质，准备显示术野…');const warmup=await warmSceneDisplay(view);startupStages.push({name:'display-warmup',start:stageStart,end:performance.now(),work:warmup.stats});stageStart=performance.now();
  attachUI();ready=true;document.querySelectorAll('button:not([data-startup-action]),select').forEach(control=>control.disabled=false);fpsSince=performance.now();startupScreen.complete();updateUI();view.update(sim.state,0);view.render();startupStages.push({name:'ready-render',start:stageStart,end:performance.now(),rendering:structuredClone(view.renderTimings)});log('ready');
  if(import.meta.env.DEV&&new URLSearchParams(location.search).has('verify-film-support')){const {attachFilmSupportVerification}=await import('./film-support-verification.js');attachFilmSupportVerification(view,pause);}
  if(import.meta.env.DEV&&new URLSearchParams(location.search).has('verify-cad-batches')){const {attachCadBatchVerification}=await import('./cad-batch-verification.js');attachCadBatchVerification(view,pause);}
  if(import.meta.env.DEV&&new URLSearchParams(location.search).has('verify-scope-capture')){const {attachScopeCaptureVerification}=await import('./scope-capture-verification.js');attachScopeCaptureVerification(view,pause);}
  if(import.meta.env.DEV&&new URLSearchParams(location.search).has('verify-blood-shader')){const {attachBloodFilmVerification}=await import('./blood-film-verification.js');attachBloodFilmVerification(view,pause);}
  if(import.meta.env.DEV&&new URLSearchParams(location.search).has('verify-environment')){const {attachEnvironmentVerification}=await import('./environment-verification.js');attachEnvironmentVerification(view,pause);}
  window.__mira={get state(){return sim.snapshot();},get metrics(){return{fps,frameMs:frameDurations.slice(),errors:[...runtimeErrors],removedVolumeMm3:tissue.removedVolumeMm3,totalVolumeMm3:tissue.totalVolumeMm3,voxelMm:tissue.voxelMm,drawCalls:view.renderer.info.render.calls,triangles:view.renderer.info.render.triangles,armErrors:{...view.armErrors},interaction:interactionController.metrics};},select:selected,reset,undo,redo:()=>undo(true),setPaused:pause,toggleCut,sim,tissue,view,interactionController,demo,ready:true};
}catch(e){ready=false;console.error(e);runtimeErrors.push(String(e));startupScreen.fail(e);}}
window.addEventListener('error',e=>runtimeErrors.push(e.message));window.addEventListener('unhandledrejection',e=>runtimeErrors.push(String(e.reason)));
window.addEventListener('beforeunload',()=>{runtimeProbe?.dispose();sessionExporter.dispose();browserStalls.dispose();cancelAnimationFrame(frameHandle);scopeNavigation?.dispose();view?.dispose();tissue?.dispose?.();});
document.querySelectorAll('button:not([data-startup-action]),select').forEach(control=>control.disabled=true);
requestAnimationFrame(animate);void init();
