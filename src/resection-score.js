/** Completion of the original labelled target, from committed volume state.
 * Pure state-derived scoring keeps undo/reset/model changes reversible. */
export function resectionScore(status){
  if(!status)return null;
  const {totalMm3:total,attachedMm3:attached,detachedMm3:detached,excisedMm3:excised}=status;
  if(![total,attached,detached,excised].every(Number.isFinite)||total<=0||Math.min(attached,detached,excised)<0)return null;
  const accounted=attached+detached+excised;
  if(Math.abs(accounted-total)>Number.EPSILON*Math.max(total,accounted)*16)return null;
  const complete=attached===0,ratio=Math.max(0,Math.min(1,(detached+excised)/total));
  return{complete,percent:complete?100:Math.min(99.9,Math.round(ratio*1000)/10),points:complete?100:Math.min(99,Math.floor(ratio*100+1e-9))};
}

/** Never label a positive remainder as zero, or a partial share as complete. */
export function targetShareLabel(volume,total){
  if(!Number.isFinite(volume)||!Number.isFinite(total)||total<=0||volume<0||volume>total)return '—';
  if(volume===0)return '0%';
  if(volume===total)return '100%';
  const percent=volume/total*100;
  if(percent<.1)return '<0.1%';
  if(percent>99.9)return '>99.9%';
  return Number(percent.toFixed(1))+'%';
}
