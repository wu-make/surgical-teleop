import {cuttingRequested} from './manual-cutting.js';
/** Educational single-step: the same CAD/control/contact/worker path as live
 * operation, while preserving the user's paused state even after a failure. */
export async function advanceSimulationStep({sim,tissue,interaction,demo,keys=new Set(),beforeControl=()=>{},afterControl=()=>{},afterInteraction=()=>{},duration=.05}){
  if(!sim.state.paused||!tissue.ready||tissue.busy||interaction.cuttingBusy)return false;
  if(!Number.isFinite(duration)||duration<=0||duration>.05)throw new Error('Invalid simulation step');
  try{
    sim.setPaused(false);beforeControl();
    if(!keys.has('Space'))demo?.update(duration);
    sim.update(duration,keys);afterControl(duration);
    await interaction.update(duration,{clutched:keys.has('Space'),compressing:keys.has('KeyH'),cutRequested:cuttingRequested(sim,keys,demo)});afterInteraction();return true;
  }finally{sim.setPaused(true);}
}
