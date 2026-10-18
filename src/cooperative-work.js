// Same iterator/order/results, with bounded main-thread slices between paints.
// Cancellation is checked both before work and after each asynchronous yield.
export async function runCooperatively(iterator,{budgetMs=3,now=()=>performance.now(),yieldFrame=()=>new Promise(resolve=>requestAnimationFrame(resolve)),valid=()=>true}={}){
  const started=now(),stats={slices:0,units:0,maxSliceMs:0,maxUnitMs:0,workMs:0,wallMs:0,budgetMs};
  while(valid()){
    await yieldFrame();if(!valid())break;
    const began=now();let result;
    do{
      const before=now();result=iterator.next();const after=now();stats.units++;stats.maxUnitMs=Math.max(stats.maxUnitMs,after-before);
      if(result.done||!valid()||after-began>=budgetMs)break;
    }while(true);
    const cost=now()-began;stats.slices++;stats.workMs+=cost;stats.maxSliceMs=Math.max(stats.maxSliceMs,cost);
    if(result.done){stats.wallMs=now()-started;return{cancelled:false,value:result.value,stats};}
  }
  iterator.return?.();stats.wallMs=now()-started;return{cancelled:true,stats};
}

export function runImmediately(iterator){let result;do{result=iterator.next();}while(!result.done);return result.value;}
