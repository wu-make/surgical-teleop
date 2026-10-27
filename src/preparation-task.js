// Loading has no animation cadence to preserve. Yield bounded preparation
// slices to browser task scheduling, so a throttled RAF cannot turn every
// 3 ms slice into a one-second wait. Rendering/input tasks keep priority.
export function yieldPreparationTask({scheduler=globalThis.scheduler,Channel=globalThis.MessageChannel,setTimer=globalThis.setTimeout}={}){
  const fallback=()=>new Promise(resolve=>{
    if(Channel){try{const channel=new Channel();channel.port1.onmessage=()=>{channel.port1.close();channel.port2.close();resolve();};channel.port2.postMessage(null);return;}catch{}}
    setTimer(resolve,0);
  });
  if(scheduler?.postTask){try{return Promise.resolve(scheduler.postTask(()=>{},{priority:'background'})).catch(fallback);}catch{}}
  return fallback();
}
