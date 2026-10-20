// Independent task-queue and GPU completion observations. Never waits for the
// GPU, flushes it, spins, or changes a render/simulation timestep.
export class RuntimeAttribution{
  constructor({gl=null,gpuIntervalMs=200,measureGpu=false,workerUrl=null,WorkerClass=globalThis.Worker,timeOrigin=globalThis.performance?.timeOrigin,now=()=>performance.now(),schedule=(fn,ms)=>setTimeout(fn,ms),cancel=id=>clearTimeout(id),Channel=globalThis.MessageChannel,document=globalThis.document,target=globalThis.window,onSample=()=>{}}={}){
    Object.assign(this,{gl,now,schedule,cancel,document,target,onSample});this.rows=[];this.pending=[];this.sequence=0;this.counts={};this.summary={};this.skippedGpu=0;this.disjointGpu=0;this.disposed=false;
    try{this.extension=gl?.getExtension('EXT_disjoint_timer_query_webgl2')??null;}catch{this.extension=null;}
    this.gpuSupported=!!(this.extension&&gl?.createQuery);this.fenceSupported=!!gl?.fenceSync;
    this.measureGpu=measureGpu;this.gpuIntervalMs=gpuIntervalMs;this.lastGpuAt=-Infinity;this.probeWork={calls:0,totalInclusiveMs:0,maxMs:0,byStage:{}};
    this.device={};try{const debug=gl?.getExtension('WEBGL_debug_renderer_info');for(const [name,key]of [['renderer',gl?.RENDERER],['vendor',gl?.VENDOR],['unmaskedRenderer',debug?.UNMASKED_RENDERER_WEBGL],['unmaskedVendor',debug?.UNMASKED_VENDOR_WEBGL]])if(key!=null)this.device[name]=gl.getParameter(key);}catch{}
    if(workerUrl&&WorkerClass){try{this.heartbeat=new WorkerClass(workerUrl,{type:'module'});this.heartbeat.onmessage=({data})=>this.measure('worker-heartbeat',()=>{if(this.disposed)return;const sent=data.origin+data.at-timeOrigin,received=this.now();if(Number.isFinite(sent)&&Number.isFinite(data.intervalMs))this.record({type:'worker-heartbeat',start:sent,end:received,workerIntervalMs:data.intervalMs,deliveryDelayMs:received-sent,...this.visibility()});});this.heartbeat.onerror=()=>this.record({type:'worker-heartbeat-error',start:this.now(),end:this.now()});}catch{}}
    if(Channel){this.channel=new Channel();this.channel.port1.onmessage=()=>this.measure('message',()=>{const queued=this.messagePending;this.messagePending=null;if(!this.disposed&&queued)this.record({type:'message',start:queued.at,end:this.now(),raf:queued.raf});});}
    this.listeners=[];for(const [host,name]of [[document,'visibilitychange'],[target,'focus'],[target,'blur'],[target,'resize'],[target,'pagehide']])if(host?.addEventListener){const fn=()=>this.record({type:name,start:this.now(),end:this.now(),...this.visibility()});host.addEventListener(name,fn);this.listeners.push([host,name,fn]);}
    this.nextTick();
  }
  visibility(){return{hidden:this.document?.hidden??null,focused:this.document?.hasFocus?.()??null};}
  record(row){row.ms=row.end-row.start;this.counts[row.type]=(this.counts[row.type]??0)+1;for(const key of row.type==='gpu'?['gpuMs','completionUpperBoundMs']:row.type==='worker-heartbeat'?['workerIntervalMs','deliveryDelayMs']:row.type==='timer'?['lateMs']:row.type==='message'?['ms']:[]){const value=row[key];if(!Number.isFinite(value))continue;const name=row.type+'.'+key,s=this.summary[name]??={count:0,totalMs:0,maxMs:0,over16ms:0,over33ms:0,over50ms:0};s.count++;s.totalMs+=value;s.maxMs=Math.max(s.maxMs,value);if(value>16.67)s.over16ms++;if(value>33.34)s.over33ms++;if(value>50)s.over50ms++;}this.rows.push(row);if(this.rows.length>2048)this.rows.shift();this.onSample(row);}
  measure(stage,fn){const start=this.now();try{return fn();}finally{const end=this.now(),ms=end-start,stats=this.probeWork,part=stats.byStage[stage]??={calls:0,totalMs:0,maxMs:0};stats.calls++;stats.totalInclusiveMs+=ms;stats.maxMs=Math.max(stats.maxMs,ms);part.calls++;part.totalMs+=ms;part.maxMs=Math.max(part.maxMs,ms);if(ms>2)this.record({type:'probe-work',stage,start,end});}}
  nextTick(){if(this.disposed)return;const scheduled=this.now();this.timer=this.schedule(()=>this.measure('timer',()=>{if(this.disposed)return;const at=this.now();this.record({type:'timer',start:scheduled,end:at,dueAt:scheduled+16,lateMs:Math.max(0,at-scheduled-16),...this.visibility()});this.poll();this.nextTick();}),16);}
  begin(raf){return this.measure('begin',()=>this._begin(raf));}
  _begin(raf){
    if(this.disposed||!this.measureGpu||raf-this.lastGpuAt<this.gpuIntervalMs||(!this.gpuSupported&&!this.fenceSupported))return null;
    if(this.pending.length>=8){this.skippedGpu++;return null;}
    this.lastGpuAt=raf;
    const record={id:++this.sequence,raf,start:this.now()};
    if(this.gpuSupported){record.query=this.gl.createQuery();if(record.query)this.gl.beginQuery(this.extension.TIME_ELAPSED_EXT,record.query);}
    return record;
  }
  end(record){return this.measure('end',()=>this._end(record));}
  _end(record){if(!record||this.disposed)return;const g=this.gl;if(record.query)g.endQuery(this.extension.TIME_ELAPSED_EXT);record.submittedAt=this.now();if(this.fenceSupported)record.fence=g.fenceSync(g.SYNC_GPU_COMMANDS_COMPLETE,0);this.pending.push(record);}
  poll(){
    return this.measure('poll',()=>this._poll());
  }
  _poll(){
    const g=this.gl;if(!g||this.disposed||!this.pending.length)return;
    const disjoint=this.extension?g.getParameter(this.extension.GPU_DISJOINT_EXT):false;
    if(disjoint){this.disjointGpu+=this.pending.length;for(const p of this.pending){if(p.query)g.deleteQuery(p.query);if(p.fence)g.deleteSync(p.fence);}this.pending.length=0;return;}
    const remaining=[];
    for(const p of this.pending){
      if(p.fenceReadyAt==null&&p.fence){const status=g.clientWaitSync(p.fence,0,0);if(status===g.ALREADY_SIGNALED||status===g.CONDITION_SATISFIED)p.fenceReadyAt=this.now();else if(status===g.WAIT_FAILED)p.failed=true;}
      const ready=!p.query||g.getQueryParameter(p.query,g.QUERY_RESULT_AVAILABLE);
      if(!p.failed&&(!ready||(p.fence&&p.fenceReadyAt==null))){remaining.push(p);continue;}
      this.record({type:'gpu',id:p.id,raf:p.raf,start:p.start,end:this.now(),submittedAt:p.submittedAt,fenceReadyAt:p.fenceReadyAt??null,completionUpperBoundMs:p.fenceReadyAt==null?null:p.fenceReadyAt-p.submittedAt,gpuMs:p.query&&!p.failed?g.getQueryParameter(p.query,g.QUERY_RESULT)/1e6:null,failed:!!p.failed});
      if(p.query)g.deleteQuery(p.query);if(p.fence)g.deleteSync(p.fence);
    }
    this.pending=remaining;
  }
  afterFrame(raf){if(!this.channel||this.messagePending||this.disposed)return;this.messagePending={raf,at:this.now()};this.channel.port2.postMessage(0);}
  report({compact=false}={}){const report={device:this.device,workerHeartbeatEnabled:!!this.heartbeat,gpuTimerSupported:this.gpuSupported,fenceSupported:this.fenceSupported,gpuMeasurementEnabled:this.measureGpu,gpuIntervalMs:this.gpuIntervalMs,summary:structuredClone(this.summary),probeWork:{...this.probeWork},pending:this.pending.length,skippedGpu:this.skippedGpu,disjointGpu:this.disjointGpu,counts:{...this.counts},recent:compact?this.rows.slice(-8):this.rows};return report;}
  dispose(){this.disposed=true;this.heartbeat?.terminate();this.cancel(this.timer);for(const [host,name,fn]of this.listeners)host.removeEventListener(name,fn);this.channel?.port1.close();this.channel?.port2.close();for(const p of this.pending){if(p.query)this.gl.deleteQuery(p.query);if(p.fence)this.gl.deleteSync(p.fence);}this.pending.length=0;}
}
