// Observations, not guesses about GC, drivers or host-app throttling. Older
// recordings with no independent probes must remain explicitly unclassified.
export function incidentEvidence(incident){
  const previous=incident.frame.work?.previousFrame,arrival=incident.followingFrame?.start??incident.rafGaps?.find(g=>g.end===incident.end)?.entered??incident.end,start=previous?.end??incident.start;
  const rows=incident.runtime??[],timers=rows.filter(r=>r.type==='timer'&&r.end>=start&&r.end<=arrival),messages=rows.filter(r=>r.type==='message'&&r.end>=start&&r.end<=arrival);
  const rendered=incident.frame.work?.previousRenderedFrame??(previous?.rendered===false?null:previous);
  const exactGpu=rows.filter(r=>r.type==='gpu'&&r.raf===previous?.raf),exactRenderedGpu=rows.filter(r=>r.type==='gpu'&&r.raf===rendered?.raf),nearbyGpu=rows.filter(r=>r.type==='gpu'&&r.raf!==previous?.raf&&r.raf!==rendered?.raf&&r.start>=start-500&&r.start<arrival);
  const tasks=(incident.browser??[]).filter(r=>r.type==='longtask'&&r.start<arrival&&r.end>start);
  return{gapAfterPreviousCallbackMs:Math.max(0,arrival-start),timerCallbacksDuringGap:timers.length,messageCallbacksDuringGap:messages.length,maxTimerIntervalMs:timers.length?Math.max(...timers.map(r=>r.ms)):null,maxMessageDelayMs:messages.length?Math.max(...messages.map(r=>r.ms)):null,
    mainThreadResponsiveDuringGap:timers.length>=2&&timers.every(r=>r.ms<50),longTasksOverlappingGap:tasks.map(r=>({start:r.start,end:r.end,ms:r.ms})),
    exactPreviousFrameGpu:exactGpu.map(r=>({gpuMs:r.gpuMs,fenceReadyAt:r.fenceReadyAt,completedBeforeNextCallback:r.fenceReadyAt!=null&&r.fenceReadyAt<=arrival,completionUpperBoundMs:r.completionUpperBoundMs})),
    exactPreviousRenderedFrameGpu:exactRenderedGpu.map(r=>({raf:r.raf,gpuMs:r.gpuMs,fenceReadyAt:r.fenceReadyAt,completedBeforeNextCallback:r.fenceReadyAt!=null&&r.fenceReadyAt<=arrival,completionUpperBoundMs:r.completionUpperBoundMs})),
    nearbySampledGpu:nearbyGpu.map(r=>({raf:r.raf,gpuMs:r.gpuMs,fenceReadyAt:r.fenceReadyAt,completionUpperBoundMs:r.completionUpperBoundMs})),
    interpretation:!rows.length?'No independent task/GPU observations were captured for this historical event.':timers.length>=2&&timers.every(r=>r.ms<50)&&!tasks.length?'Other main-thread callbacks remained responsive while animation delivery waited; host/compositor cause is not established.':'Inspect retained task, GPU and application spans together; no unique cause assigned.'};
}
