// DEV-only continuous held-key regression. Unlike single-step pixel probes,
// this preserves the real held-key acceleration and asynchronous cut backlog.
export async function verifyClosedMotion(view,sim,interaction,pause,options){
  const params=new URLSearchParams(location.search),video=!params.has('no-video'),sampleEvery=params.has('no-pixel-samples')?0:15,report={frames:[],samples:[],phases:[],complete:false,video,sampleEvery,latencies:[],run:params.get('run')};let resolveFrame,phase='start',sampling=false;
  const send=(name,data,type='application/json')=>fetch('/__qa__/'+name,{method:'POST',headers:{'Content-Type':type},body:type==='application/json'?JSON.stringify(data):data});
  const capture=async name=>send('v39-motion-'+name+'.png',await new Promise(resolve=>view.canvas.toBlob(resolve,'image/png')),'image/png');
  // Audit input acceptance -> worker result -> first ordinary rendered frame.
  // Wrap existing live methods only; do not drive an alternate cutting path.
  const append=interaction._appendBladePose,take=interaction._takeCutBatch,cut=view.tissue.cutSamples;
  let accepted=[];const awaitingPresentation=[];
  interaction._appendBladePose=function(...args){const tail=this._cutSpans.at(-1);const value=append.apply(this,args);if(this._cutSpans.at(-1)!==tail&&this._cutSpans.length)this._cutSpans.at(-1).auditAcceptedAt=performance.now();return value;};
  interaction._takeCutBatch=function(){const times=[];for(const span of this._cutSpans)for(let i=span.index;i<span.steps&&times.length<256;i++)times.push(span.auditAcceptedAt??performance.now());const batch=take.call(this);accepted=times.slice(0,batch.length);return batch;};
  view.tissue.cutSamples=function(...args){const times=accepted,submitted=performance.now(),label=phase;return cut.apply(this,args).then(result=>{const received=performance.now(),entry={phase:label,acceptedOldest:Math.min(...times),acceptedNewest:Math.max(...times),submitted,received,oldestMs:received-Math.min(...times),newestMs:received-Math.max(...times),samples:times.length,removed:result.removedMm3,work:structuredClone(this.updateTimings)};report.latencies.push(entry);awaitingPresentation.push(entry);return result;});};
  const frame=now=>{
    for(const entry of awaitingPresentation.splice(0)){entry.firstPresented=performance.now();entry.oldestPresentedMs=entry.firstPresented-entry.acceptedOldest;}
    const sc=sim.state.scope;report.frames.push({now,phase,tip:[...sim.state.tools.right.position],jaw:sim.state.tools.right.jaw,camera:[...sc.position],aim:[...sc.lookAt],depth:sc.depth,pending:interaction.contact.pendingCutSamples,removed:view.tissue.removedVolumeMm3,work:{...view.tissue.updateTimings},cuts:view.tissue._cuts.length,receivedAt:view.tissue.updateTimings.receivedAt,render:{...view.renderTimings},blood:view.tissue.blood.metrics});
    if(sampleEvery&&report.frames.length%sampleEvery===0&&!sampling){sampling=true;(async()=>{const image=await createImageBitmap(view.canvas),c=new OffscreenCanvas(64,40),x=c.getContext('2d',{willReadFrequently:true});x.drawImage(image,0,0,64,40);image.close();const p=x.getImageData(0,0,64,40).data;let sum=0,dark=0,bright=0;for(let i=0;i<p.length;i+=4){const v=p[i]+p[i+1]+p[i+2];sum+=v;if(v<12)dark++;if(v>720)bright++;}report.samples.push({now,phase,meanRGB:sum/(64*40*3),dark,bright});})().finally(()=>sampling=false);}
    if(resolveFrame){const done=resolveFrame;resolveFrame=null;done();}
  };
  const next=()=>new Promise(resolve=>resolveFrame=resolve);
  const hold=async(keys,ms)=>{options.holdKeys(keys);const end=performance.now()+ms,simulationEnd=sim.state.elapsed+ms/1000;while(params.has('verify-commit-frames')?sim.state.elapsed<simulationEnd:performance.now()<end)await next();options.holdKeys([]);};
  let recorder,chunks=[],stopCommitProbe;
  try{
    await options.reset();view.tissue.blood.group.visible=!params.has('hide-blood');report.hideBlood=params.has('hide-blood');options.setExclusive(false);options.setFrameCallback(frame);sim.state.paused=false;
    if(params.has('manual-traction')){phase='grasp';sim.select('left');options.demo.approach();while(options.demo.active)await next();await hold(['KeyC'],700);await hold(['KeyE'],650);report.traction=interaction.metrics.grasp;if(!interaction.grasp)throw new Error('Manual traction setup failed to acquire tissue');}
    sim.select('right');options.demo.approach();
    while(options.demo.active)await next();
    if(params.has('verify-commit-frames')){const {probeCommittedFrames}=await import('./commit-frame-verification.js');stopCommitProbe=probeCommittedFrames(view,report,send);}
    const stream=video?view.canvas.captureStream(30):null;if(video){recorder=new MediaRecorder(stream,{mimeType:'video/webm;codecs=vp9',videoBitsPerSecond:6000000});recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};recorder.start();}
    for(const [label,keys,ms]of [['close',['KeyC'],700],['inside',['KeyQ'],900],['left',['KeyA'],1200],['forward',['KeyC','KeyW'],700],['right',['KeyC','KeyD'],2400],['back',['KeyS'],700],['out',['KeyE'],900],['return',['KeyA'],1200],['settle',[],3500]]){
      const before=view.tissue._cuts.length;phase=label;await hold(keys,ms);
      while(view.tissue.busy||interaction.cuttingBusy)await next();
      const after=view.tissue._cuts.length,blood=view.tissue.blood.metrics;
      if(label==='close'&&sim.state.tools.right.jaw>.001)throw new Error('Actual jaw did not finish closing: background scheduling is not a valid continuous-motion acceptance run');
      if(!keys.includes('KeyC')&&after!==before)throw new Error('Released C still generated cuts during '+label);
      if(blood.spreading||blood.surfacePools||blood.droplets||Math.abs(blood.balanceErrorMm3)>1e-4)throw new Error('Confined blood policy failed during '+label);
      report.phases.push({label,cuts:after,before,keys,blood});await capture(label);await send('v39-motion-progress.json',{...report,frames:report.frames.slice(-8)});
    }
    if(video){await new Promise(resolve=>{recorder.onstop=resolve;recorder.stop();});for(const track of stream.getTracks())track.stop();await send('v39-motion.webm',new Blob(chunks,{type:'video/webm'}),'video/webm');}
    if(stopCommitProbe){await stopCommitProbe();stopCommitProbe=null;if(report.commits.some(c=>c.glError||c.blackPulsePixels||c.mean>(report.hideBlood?0:.02)))throw new Error('Committed tissue still changes on its first draw');}report.cuts=view.tissue.snapshot().cuts;report.complete=true;report.diagnostics=options.diagnostics();report.presentation=view.presentation.metrics;await send('v39-motion-result.json',report);
  }catch(error){report.error=String(error);report.stack=error.stack;await send('v39-motion-result.json',report);}
  finally{interaction._appendBladePose=append;interaction._takeCutBatch=take;view.tissue.cutSamples=cut;if(stopCommitProbe)await stopCommitProbe();if(recorder?.state==='recording')recorder.stop();view.tissue.blood.group.visible=true;options.holdKeys([]);options.setFrameCallback(null);options.setExclusive(false);pause(true);}
}
