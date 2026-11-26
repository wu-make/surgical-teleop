import {distanceToSegment} from './tissue-worker.js';

function tree(nodes){
  if(nodes.length===1)return nodes[0];
  const extent={low:[Infinity,Infinity,Infinity],high:[-Infinity,-Infinity,-Infinity],radius:0};
  for(const node of nodes){
    extent.radius=Math.max(extent.radius,node.radius);
    for(let i=0;i<3;i++){
      extent.low[i]=Math.min(extent.low[i],node.low[i]);
      extent.high[i]=Math.max(extent.high[i],node.high[i]);
    }
  }
  let axis=0;for(let i=1;i<3;i++)if(extent.high[i]-extent.low[i]>extent.high[axis]-extent.low[axis])axis=i;
  nodes.sort((a,b)=>(a.low[axis]+a.high[axis])-(b.low[axis]+b.high[axis]));
  const mid=nodes.length>>1;
  return {...extent,left:tree(nodes.slice(0,mid)),right:tree(nodes.slice(mid))};
}

// No centreline in this box can be closer than the distance to the box.
// The largest radius bounds every capsule's contribution to the CSG maximum.
function upperBound(p,node){
  const {low,high}=node;
  const x=Math.max(low[0]-p[0],0,p[0]-high[0]),y=Math.max(low[1]-p[1],0,p[1]-high[1]),z=Math.max(low[2]-p[2],0,p[2]-high[2]);
  return node.radius-Math.sqrt(x*x+y*y+z*z);
}

export class CutSpatialIndex {
  constructor(){this.tiers=[];this.tail=[];this.stack=[];this.lastHit=null;this.size=0;this.sequence=0;}
  add({cut}){
    // Index individual CAD edges. A whole curved jaw's box encloses empty air
    // between its edges, especially after many overlapping strokes at one site.
    const stroke={visit:0};this.size++;
    for(const {a,b} of cut.segments??[cut]){
      this.tail.push({a,b,stroke,radius:cut.radius,low:a.map((v,i)=>Math.min(v,b[i])),high:a.map((v,i)=>Math.max(v,b[i]))});
    }
    // Rebuild a bounded spatial subtree, never all historical edges at once.
    if(this.tail.length>=128){
      let block=tree(this.tail);this.tail=[];
      for(let level=0;;level++){
        const tier=this.tiers[level]??=[];tier.push(block);
        if(tier.length<16)break;
        block=tree(tier);tier.length=0;
      }
    }
  }
  evaluate(point,distance,stats){
    const visit=++this.sequence,stack=this.stack;stack.length=0;let touched=0;
    const evaluateEdge=edge=>{
      if(edge.stroke.visit!==visit){edge.stroke.visit=visit;touched++;}
      const field=edge.radius-distanceToSegment(point,edge.a,edge.b);
      if(field>distance){distance=field;this.lastHit=edge;}
    };
    // Adjacent contact/normal samples often have the same nearest blade.
    // This gives an exact lower bound before searching the full hierarchy.
    if(this.lastHit&&upperBound(point,this.lastHit)+1e-12>distance)evaluateEdge(this.lastHit);
    for(const tier of this.tiers)for(const root of tier)stack.push(root);
    for(const edge of this.tail)if(upperBound(point,edge)+1e-12>distance)evaluateEdge(edge);
    while(stack.length){
      const node=stack.pop();
      if(upperBound(point,node)+1e-12<=distance)continue;
      if(node.stroke){evaluateEdge(node);continue;}
      const left=upperBound(point,node.left),right=upperBound(point,node.right);
      if(left>right){
        if(right+1e-12>distance)stack.push(node.right);
        if(left+1e-12>distance)stack.push(node.left);
      }else{
        if(left+1e-12>distance)stack.push(node.left);
        if(right+1e-12>distance)stack.push(node.right);
      }
    }
    if(stats){stats.evaluatedCutters+=touched;stats.skippedCutters+=this.size-touched;}
    return distance;
  }
}
