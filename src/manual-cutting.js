// Closing the right scissors is an explicit cutting action. Approaching a
// surface, undo or haemostasis may have paused cutting; C resumes it directly.
// The armed mode is permission, not a continuously running cutting command.
export function cuttingRequested(sim,keys,demo){
  if(keys.has('KeyH')||keys.has('Space'))return false;
  return sim.state.selected==='right'&&keys.has('KeyC')||!!(demo?.active&&demo.mode==='example');
}
export function armManualCut(sim,interaction,code,{pressureHeld=false}={}){
  if(code!=='KeyC'||pressureHeld||sim.state.selected!=='right'||sim.state.paused||sim.state.cutting)return false;
  interaction.breakCutTrajectory();interaction.lastCut=null;sim.setCutting(true);return true;
}
