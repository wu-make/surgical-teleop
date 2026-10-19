// Closing the right scissors is an explicit cutting action. Approaching a
// surface, undo or haemostasis may have paused cutting; C resumes it directly.
export function armManualCut(sim,interaction,code,{pressureHeld=false}={}){
  if(code!=='KeyC'||pressureHeld||sim.state.selected!=='right'||sim.state.paused||sim.state.cutting)return false;
  interaction.breakCutTrajectory();interaction.lastCut=null;sim.setCutting(true);return true;
}
