/** Actual RAF intervals, before simulation time clamping. Passive diagnostics;
 * never alters the controller, geometry density, render resolution or timestep. */
export class FrameMetrics {
  constructor(limit=7200){this.limit=limit;this.clear();}
  clear(){this.rows=[];this.head=0;this.cached={};this.totals={};this.lastSample=null;this.slowFrames=[];this.worstFrames=[];this.presentationChanges=[];}
  observePresentation(fullscreen,width,height,pixelRatio,atMs){
    const last=this.presentationChanges.at(-1);
    if(last&&last.fullscreen===fullscreen&&last.width===width&&last.height===height&&last.pixelRatio===pixelRatio)return;
    this.presentationChanges.push({fullscreen,width,height,pixelRatio,atMs});if(this.presentationChanges.length>64)this.presentationChanges.shift();
  }
  // Both endpoints must be eligible: a hidden/paused interval must not be
  // attributed to the first visible frame after resuming.
  sample(now,phase,eligible=true,work=null){
    if(!Number.isFinite(now)){this.lastSample=null;return;}
    if(eligible&&this.lastSample!==null)this.record(now-this.lastSample,phase,work,now);
    this.lastSample=eligible?now:null;
  }
  record(milliseconds,phase,work=null,endedAt=null){
    if(!Number.isFinite(milliseconds)||milliseconds<=0)return;
    const total=this.totals[phase]??={frames:0,seconds:0,averageFps:0,maxMs:0,over33ms:0,over50ms:0};
    total.frames++;total.seconds+=milliseconds/1000;total.averageFps=total.frames/total.seconds;
    total.maxMs=Math.max(total.maxMs,milliseconds);if(milliseconds>33.34)total.over33ms++;if(milliseconds>50)total.over50ms++;
    if(milliseconds>33.34){const row={ms:milliseconds,phase,...(work?{work:structuredClone(work())}:{})};this.slowFrames.push(row);if(this.slowFrames.length>64)this.slowFrames.shift();this.worstFrames.push(row);this.worstFrames.sort((a,b)=>b.ms-a.ms);this.worstFrames.length=Math.min(8,this.worstFrames.length);}
    const row={ms:milliseconds,phase,...(Number.isFinite(endedAt)?{endedAt}:{})};if(this.rows.length<this.limit)this.rows.push(row);else{this.rows[this.head]=row;this.head=(this.head+1)%this.limit;}
  }
  summarize(){
    const groups=new Map();for(const row of this.rows){if(!groups.has(row.phase))groups.set(row.phase,[]);groups.get(row.phase).push(row.ms);}
    const result={};for(const [phase,values]of groups){values.sort((a,b)=>a-b);const n=values.length,total=values.reduce((a,b)=>a+b,0);result[phase]={frames:n,seconds:total/1000,averageFps:n*1000/total,p50Ms:values[Math.ceil(n*.5)-1],p95Ms:values[Math.ceil(n*.95)-1],p99Ms:values[Math.ceil(n*.99)-1],maxMs:values[n-1],over33ms:values.filter(v=>v>33.34).length,over50ms:values.filter(v=>v>50).length};}
    this.cached=result;return result;
  }
  report({includeIntervals=false}={}){
    const report={units:'milliseconds for intervals; seconds for measured duration',
      scope:'Since reset or example start; excludes paused, hidden and history restoration intervals. Frame time is not simulation time.',
      session:structuredClone(this.totals),slowFrames:structuredClone(this.slowFrames),worstFrames:structuredClone(this.worstFrames),presentationChanges:structuredClone(this.presentationChanges),recentWindow:{capacityFrames:this.limit,retainedFrames:this.rows.length,phases:this.summarize()}};
    if(includeIntervals)report.recentWindow.intervals=[...this.rows.slice(this.head),...this.rows.slice(0,this.head)].map(row=>({...row}));
    return report;
  }
}
