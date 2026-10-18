import {distanceToCut} from './tissue-worker.js';

const boxDistance=(p,low,high)=>Math.max(low[0]-p[0],0,p[0]-high[0])**2+Math.max(low[1]-p[1],0,p[1]-high[1])**2+Math.max(low[2]-p[2],0,p[2]-high[2])**2;
const merge=(a,b)=>({low:a.low.map((v,i)=>Math.min(v,b.low[i])),high:a.high.map((v,i)=>Math.max(v,b.high[i])),radius:Math.max(a.radius,b.radius),count:a.count+b.count,left:a,right:b});
function tree(nodes){
  if(nodes.length===1)return nodes[0];
  const low=[Infinity,Infinity,Infinity],high=[-Infinity,-Infinity,-Infinity];
  for(const n of nodes)for(let i=0;i<3;i++){low[i]=Math.min(low[i],n.low[i]);high[i]=Math.max(high[i],n.high[i]);}
  let axis=0;for(let i=1;i<3;i++)if(high[i]-low[i]>high[axis]-low[axis])axis=i;
  nodes.sort((a,b)=>(a.low[axis]+a.high[axis])-(b.low[axis]+b.high[axis]));
  const half=nodes.length>>1;return merge(tree(nodes.slice(0,half)),tree(nodes.slice(half)));
}

/** Exact cutter-field broadphase. Complete curved blades and historical
 * material maps stay intact. Fixed blocks bound rebuild work per new cut;
 * conservative boxes skip only fields that cannot change the current max. */
export class CutSpatialIndex {
  constructor(){this.blocks=[];this.tail=[];this.root=null;this.stack=[];}
  add(entry){
    this.tail.push({low:entry.low,high:entry.high,radius:entry.cut.radius,count:1,entry});
    if(this.tail.length===32){this.blocks.push(tree(this.tail));this.tail=[];this.root=tree(this.blocks.slice());}
  }
  evaluate(point,distance,stats){
    const stack=this.stack;stack.length=0;if(this.root)stack.push(this.root);for(const node of this.tail)stack.push(node);
    while(stack.length){
      const node=stack.pop(),squared=boxDistance(point,node.low,node.high);
      if(distance>=node.radius||(squared>0&&(distance>=0||squared>=distance*distance))){if(stats)stats.skippedCutters+=node.count;continue;}
      if(node.entry){distance=Math.max(distance,node.entry.cut.radius-distanceToCut(point,node.entry.cut));if(stats)stats.evaluatedCutters++;}
      else stack.push(node.left,node.right);
    }
    return distance;
  }
}
