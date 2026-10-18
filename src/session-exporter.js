import {runCooperatively} from './cooperative-work.js';

// Session cuts and event records are append-only; capture their array at the
// click, then send complete ordered chunks between rendered frames. Worker
// formatting and Blob allocation never run on the render/input thread.
const get=(root,path)=>path.reduce((value,key)=>value?.[key],root);
const replace=(root,path,value)=>{const [key,...tail]=path;return {...root,[key]:tail.length?replace(root[key],tail,value):value};};
export class SessionExporter {
  constructor(worker,options={}){
    this.worker=worker;this.options=options;this.id=0;this.pending=new Map();
    worker.onmessage=({data})=>{const pending=this.pending.get(data.id);if(!pending)return;this.pending.delete(data.id);data.error?pending.reject(new Error(data.error)):pending.resolve(data.blob);};
    worker.onerror=event=>{for(const p of this.pending.values())p.reject(new Error(event.message||'Session export worker failed'));this.pending.clear();};
  }
  encode(data,{takeOwnership=false}={}){
    if(!takeOwnership)data=structuredClone(data);
    const id=++this.id,parts=[];let header=data;
    for(const path of [['cuts'],['interaction','tissue','cuts'],['events'],['performance','recentWindow','intervals']]){
      const value=get(data,path);if(!Array.isArray(value))continue;
      parts.push({path,entries:value.slice()});header=replace(header,path,[]);
    }
    return new Promise((resolve,reject)=>{
      this.pending.set(id,{resolve,reject});
      const worker=this.worker;
      function* messages(){
        worker.postMessage({id,type:'begin',data:header});yield;
        for(const {path,entries}of parts)for(let offset=0;offset<entries.length;offset+=32){worker.postMessage({id,type:'append',path,entries:entries.slice(offset,offset+32)});yield;}
        worker.postMessage({id,type:'finish'});
      }
      runCooperatively(messages(),{...this.options,valid:()=>this.pending.has(id)}).then(result=>{this.lastTimings=result.stats;},error=>{this.pending.delete(id);reject(error);});
    });
  }
  dispose(){this.worker.terminate();for(const p of this.pending.values())p.reject(new Error('Session exporter disposed'));this.pending.clear();}
}
