// Passive browser attribution complements RAF intervals: a long interval can
// include worker delivery, layout, input or scheduling outside animate().
export class BrowserStalls {
  constructor(Observer=globalThis.PerformanceObserver,now=()=>performance.now()){
    this.now=now;this.observers=[];this.supported=[];this.clear();
    for(const type of ['long-animation-frame','longtask']){
      if(!Observer?.supportedEntryTypes?.includes(type))continue;
      try{const observer=new Observer(list=>this.accept(list.getEntries()));observer.observe({type,buffered:false});this.observers.push(observer);this.supported.push(type);}catch{/* Optional diagnostics must never block simulation. */}
    }
  }
  clear(){this.since=this.now();this.recent=[];this.worst=[];this.spans=[];this.counts={};}
  span(name,start,end){if(end-start<4)return;this.spans.push({name,start,end,ms:end-start});if(this.spans.length>128)this.spans.shift();}
  accept(entries){for(const e of entries){
    if(e.startTime<this.since)continue;
    const row={type:e.entryType,start:e.startTime,ms:e.duration,end:e.startTime+e.duration,
      blockingMs:e.blockingDuration??null,renderStart:e.renderStart??null,layoutStart:e.styleAndLayoutStart??null,
      scripts:Array.from(e.scripts??[],s=>({start:s.startTime,ms:s.duration,executionStart:s.executionStart,invoker:s.invoker,invokerType:s.invokerType,function:s.sourceFunctionName,url:s.sourceURL,position:s.sourceCharPosition,forcedLayoutMs:s.forcedStyleAndLayoutDuration,pauseMs:s.pauseDuration})),
      work:this.spans.filter(s=>s.start<e.startTime+e.duration&&s.end>e.startTime).map(s=>({...s}))};
    this.counts[e.entryType]=(this.counts[e.entryType]??0)+1;this.recent.push(row);if(this.recent.length>64)this.recent.shift();this.worst.push(row);this.worst.sort((a,b)=>b.ms-a.ms);this.worst.length=Math.min(this.worst.length,8);
  }}
  report({compact=false}={}){return {supported:[...this.supported],since:this.since,counts:{...this.counts},recent:compact?this.recent.slice(-4):this.recent,worst:this.worst};}
  dispose(){for(const observer of this.observers)observer.disconnect();}
}
