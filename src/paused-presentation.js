// Reuse a frozen frame, without lowering the cadence of any live simulation.
// The caller includes camera/layout/geometry state, so interaction, restoration
// and an in-flight cut finishing while paused still invalidate presentation.
export class PausedPresentation {
  constructor(){this.key=null;this.stats={reused:0,pausedDraws:0};}
  needsFrame(paused,signature){
    if(!paused){this.key=null;return true;}
    const key=signature();if(this.key===key){this.stats.reused++;return false;}
    this.key=key;this.stats.pausedDraws++;return true;
  }
}
