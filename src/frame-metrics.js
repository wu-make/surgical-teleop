/** Actual RAF intervals, before simulation time clamping. Passive diagnostics;
 * never alters the controller, geometry density, render resolution or timestep. */
export class FrameMetrics {
  constructor(limit=7200){this.limit=limit;this.clear();}
  clear(){this.rows=[];this.head=0;this.cached={};}
  record(milliseconds,phase){
    if(!Number.isFinite(milliseconds)||milliseconds<=0)return;
    const row={ms:milliseconds,phase};if(this.rows.length<this.limit)this.rows.push(row);else{this.rows[this.head]=row;this.head=(this.head+1)%this.limit;}
  }
  summarize(){
    const groups=new Map();for(const row of this.rows){if(!groups.has(row.phase))groups.set(row.phase,[]);groups.get(row.phase).push(row.ms);}
    const result={};for(const [phase,values]of groups){values.sort((a,b)=>a-b);const n=values.length,total=values.reduce((a,b)=>a+b,0);result[phase]={frames:n,seconds:total/1000,averageFps:n*1000/total,p50Ms:values[Math.ceil(n*.5)-1],p95Ms:values[Math.ceil(n*.95)-1],p99Ms:values[Math.ceil(n*.99)-1],over33ms:values.filter(v=>v>33.34).length,over50ms:values.filter(v=>v>50).length};}
    this.cached=result;return result;
  }
}
