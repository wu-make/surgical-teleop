import{runCooperatively}from'./cooperative-work.js';import{yieldPreparationTask}from'./preparation-task.js';import{capturePlanningContext,planningTransfers,decode}from'./guided-planning-context.js';
const yieldTask=()=>yieldPreparationTask({scheduler:null});
export class WristPlanner{
 constructor(factory){this.factory=factory;this.serial=0;this.worker=null;this.active=null;}
 _ensure(){if(this.worker)return this.worker;const w=this.worker=this.factory();w.addEventListener('message',({data})=>{const job=this.active;if(this.worker!==w||!job||data.id!==job.id)return;if(data.error){job.reject(new Error(data.error));return;}if(data.result){const result=data.result;result.value=decode(result.value);result.stats={...result.stats,thread:'worker',capture:job.capture,dispatchMs:job.dispatchMs,endToEndMs:performance.now()-job.started};job.resolve(result);}});w.addEventListener('error',event=>{if(this.worker!==w)return;this.active?.reject?.(new Error(event.message??'Wrist planning worker failed'));w.terminate();this.worker=null;});return w;}
 async plan(demo,steering,snapshot,{valid=()=>true}={}){
  this.cancel();const job={id:++this.serial,started:performance.now(),cancelled:false};this.active=job;let timer;
  const current=()=>this.active===job&&!job.cancelled&&valid();
  try{
   const captured=await runCooperatively(capturePlanningContext(demo,snapshot,steering),{valid:current,yieldFrame:yieldTask});if(captured.cancelled||!current())return{cancelled:true,value:null,stats:{thread:'worker',capture:captured.stats}};
   job.capture=captured.stats;const worker=this._ensure();
   const result=await new Promise((resolve,reject)=>{job.resolve=resolve;job.reject=reject;timer=setInterval(()=>{if(this.active===job&&!current())this.cancel();},33);const at=performance.now();worker.postMessage({type:'plan',id:job.id,context:captured.value},planningTransfers(captured.value));job.dispatched=true;job.dispatchMs=performance.now()-at;});
   return result;
  }finally{if(timer)clearInterval(timer);if(this.active===job)this.active=null;}
 }
 cancel(){const job=this.active;if(!job)return;job.cancelled=true;if(job.dispatched)this.worker?.postMessage({type:'cancel',id:job.id});job.resolve?.({cancelled:true,value:null,stats:{thread:'worker'}});if(this.active===job)this.active=null;}
 dispose(){this.cancel();this.worker?.terminate();this.worker=null;}
}
