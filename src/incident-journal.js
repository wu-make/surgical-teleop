import {incidentEvidence} from './incident-evidence.js';

// Owned by the export worker. Full contexts live here for the session rather
// than in a capped main-thread/UI array. Observer/GPU results can arrive late.
export class IncidentJournal {
  constructor(){this.epochs=new Map();}
  accept(message){
    const {epoch,action}=message;
    if(action==='open'){this.epochs.set(epoch,{rows:[],byId:new Map()});return;}
    const session=this.epochs.get(epoch);if(!session)throw new Error('Unknown incident journal epoch');
    if(action==='capture'){const row=message.incident;session.rows.push(row);session.byId.set(row.id,row);return;}
    if(action==='following'){const incident=session.byId.get(message.id);if(incident)incident.followingFrame=message.frame;return;}
    const row=message.row;if(!row)throw new Error('Invalid incident journal update');
    const before=action==='runtime'?1000:250,after=action==='runtime'?500:250;
    // Ends are ordered even if a late sample concerns a much older frame.
    let lo=0,hi=session.rows.length;
    while(lo<hi){const mid=(lo+hi)>>>1;if(session.rows[mid].end<=row.start-after)lo=mid+1;else hi=mid;}
    for(let i=lo;i<session.rows.length;i++){
      const incident=session.rows[i];if(incident.start>=row.end+before)break;
      if(row.start<incident.end+after&&row.end>incident.start-before)incident[action==='runtime'?'runtime':'browser'].push(row);
    }
  }
  snapshot(epoch,count){
    const session=this.epochs.get(epoch);if(!session)throw new Error('Incident journal is unavailable; refusing an incomplete export');
    const rows=session.rows.filter(row=>row.id<=count);
    if(rows.length!==count)throw new Error('Incident journal count mismatch; refusing an incomplete export');
    return rows.map(row=>({...structuredClone(row),observations:incidentEvidence(row)}));
  }
  hydrate(report){
    if(!report?.archive)return;
    report.incidents=this.snapshot(report.archive.epoch,report.incidentCount);
    report.archive={...report.archive,exported:report.incidents.length,complete:true};
  }
}
