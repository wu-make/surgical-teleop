// Optional profiling only. Independent worker event-loop observations tell
// whether a main-thread gap also delayed another browser execution context.
let previous=performance.now();
function tick(){const at=performance.now();self.postMessage({at,origin:performance.timeOrigin,intervalMs:at-previous});previous=at;setTimeout(tick,50);}
setTimeout(tick,50);
