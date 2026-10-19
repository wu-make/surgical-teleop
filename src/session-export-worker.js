import {IncidentJournal} from './incident-journal.js';
const sessions=new Map(),sealed=new Map(),journal=new IncidentJournal();let journalError=null;
self.onmessage=({data:message})=>{
  const {id,type,data,path,entries}=message;
  try{
    if(type==='incident-journal'){journal.accept(message);return;}
    if(type==='journal-seal'){if(journalError)throw new Error(journalError);sealed.set(id,message.reports.map(ref=>ref?journal.snapshot(ref.epoch,ref.count):null));return;}
    if(type==='begin'){
      if(journalError)throw new Error(journalError);
      const snapshots=sealed.get(id);sealed.delete(id);
      [data.performance?.browserStalls,data.performance?.startupDiagnostics?.browser].forEach((report,i)=>{if(!report?.archive)return;if(!snapshots?.[i])throw new Error('Missing sealed incident journal');report.incidents=snapshots[i];report.archive={...report.archive,exported:report.incidents.length,complete:true};});
      sessions.set(id,data);return;
    }
    const session=sessions.get(id);if(!session)throw new Error('Unknown session export');
    if(type==='append'){path.reduce((value,key)=>value[key],session).push(...entries);return;}
    if(type!=='finish')throw new Error('Unknown session export command');
    sessions.delete(id);const blob=new Blob([JSON.stringify(session,null,2)],{type:'application/json'});self.postMessage({id,blob});
  }catch(error){if(type==='incident-journal'){journalError=String(error);self.postMessage({type:'journal-error',error:journalError});return;}sessions.delete(id);sealed.delete(id);self.postMessage({id,error:String(error)});}
};
