import {instrumentPose,instrumentCapsules,quaternionProduct,rotateVector,resolveInstrumentAlignment,slerpInstrumentAlignment} from './instrument-pose.js';

const sub=(a,b)=>a.map((v,i)=>v-b[i]),dot=(a,b)=>a.reduce((s,v,i)=>s+v*b[i],0);
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const distance=(a,b)=>Math.hypot(...sub(a,b));
const mix=(a,b,t)=>a.map((v,i)=>v+(b[i]-v)*t);
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const unit=(v,fallback=[0,0,-1])=>{const n=Math.hypot(...v);return n>1e-12?v.map(x=>x/n):fallback;};
const quaternionAngle=(a,b)=>2*Math.atan2(Math.hypot(...quaternionProduct(b,[-a[0],-a[1],-a[2],a[3]]).slice(0,3)),Math.abs(dot(a,b)));

/** Scalar segment solver; optional witness construction only for the best pair. */
function segmentParameters(p,q,r,s){
  const ux=q[0]-p[0],uy=q[1]-p[1],uz=q[2]-p[2],vx=s[0]-r[0],vy=s[1]-r[1],vz=s[2]-r[2];
  const wx=p[0]-r[0],wy=p[1]-r[1],wz=p[2]-r[2];
  const a=ux*ux+uy*uy+uz*uz,e=vx*vx+vy*vy+vz*vz,f=vx*wx+vy*wy+vz*wz;
  let one=0,two=0;
  if(a<=1e-20)two=e<=1e-20?0:clamp(f/e,0,1);
  else{const c=ux*wx+uy*wy+uz*wz;if(e<=1e-20)one=clamp(-c/a,0,1);else{
    const b=ux*vx+uy*vy+uz*vz,denominator=a*e-b*b;
    if(denominator>1e-20)one=clamp((b*f-c*e)/denominator,0,1);
    two=(b*one+f)/e;
    if(two<0){two=0;one=clamp(-c/a,0,1);}else if(two>1){two=1;one=clamp((b-c)/a,0,1);}
  }}
  return {one,two,distance:Math.hypot(wx+ux*one-vx*two,wy+uy*one-vy*two,wz+uz*one-vz*two)};
}
export function sourceSegmentDistance(a,b,c,d){return segmentParameters(a,b,c,d).distance;}

function broadGap(a,b){let sum=0;for(let i=0;i<3;i++){const d=Math.max(0,a.min[i]-b.max[i],b.min[i]-a.max[i]);sum+=d*d;}return Math.sqrt(sum);}

export function capsuleClearance(first,second,allowances=null,witness=false){
  let clearance=Infinity,best=null;
  for(let i=0;i<first.length;i++)for(let j=0;j<second.length;j++){
    const a=first[i],b=second[j],allowed=allowances?.[i*second.length+j]??0;
    if(allowed===-Infinity)continue;
    const broad=broadGap(a,b);if(!allowances&&clearance>=0&&broad>0&&broad>=clearance)continue;
    const solution=segmentParameters(a.a,a.b,b.a,b.b),gap=solution.distance-a.radius-b.radius-allowed;
    if(gap<clearance){clearance=gap;best={a,b,...solution};}
  }
  if(!witness)return clearance;
  if(!best)return {clearance,pair:null,closestPoints:null};
  const a=mix(best.a.a,best.a.b,best.one),b=mix(best.b.a,best.b.b,best.two),normal=unit(sub(b,a),[1,0,0]);
  return {clearance,pair:{left:best.a,right:best.b},closestPoints:{left:a.map((v,i)=>v+normal[i]*best.a.radius),right:b.map((v,i)=>v-normal[i]*best.b.radius)}};
}

export function sourceInstrumentContact(left,right){
  const a=instrumentPose(left),b=instrumentPose(right),result=capsuleClearance(instrumentCapsules(left,a),instrumentCapsules(right,b),null,true);
  if(result.pair)for(const [side,tool,pose] of [['left',left,a],['right',right,b]]){
    const shape=result.pair[side],point=result.closestPoints[side];
    result.pair[side]={part:shape.part,id:shape.id,section:shape.part==='shaft'?(dot(sub(point,tool.port),pose.shaftDirection)<0?'outside':'inside'):'distal'};
  }
  return result;
}

function instrumentTrajectory(start,end){
  const radial=tool=>unit(sub(tool.position,tool.port),tool.shaftDirection);
  const initial=radial(start),last=radial(end),angle=Math.atan2(Math.hypot(...cross(initial,last)),clamp(dot(initial,last),-1,1));
  const radialA=distance(start.position,start.port),radialB=distance(end.position,start.port),travel=distance(start.position,end.position);
  const polar=sourceSegmentDistance(start.port,start.port,start.position,end.position)<1e-7&&angle>1e-12;
  const axis=unit(cross(initial,last),unit(cross(initial,Math.abs(initial[0])<.8?[1,0,0]:[0,1,0])));
  const wristTravel=start.wrist.reduce((v,x,i)=>v+Math.abs(end.wrist[i]-x),0),jawTravel=1.1*Math.abs(end.jaw-start.jaw);
  const bendingTravel=Math.abs(end.wrist[0]-start.wrist[0])+Math.abs(end.wrist[1]-start.wrist[1]),rollTravel=Math.abs(end.wrist[2]-start.wrist[2]);
  const startPose=instrumentPose(start),localA=startPose.localTip,localB=instrumentPose(end).localTip;
  const initialAlignment=startPose.alignment;
  // Resolve a command once, then interpolate absolute frames. FK/contact/render
  // are pure readers, including in the deliberately free near-RCM region.
  const finalAlignment=travel===0?initialAlignment:resolveInstrumentAlignment(end,initialAlignment);
  // A Cartesian line does not advance its radial angle at a constant rate.
  // Preserve exact RCM alignment throughout normal-workspace sweeps, including
  // an accepted contact point in the middle of a long command.
  const radialFrame=!polar&&angle>1e-12&&sourceSegmentDistance(start.port,start.port,start.position,end.position)>=.020&&distance(rotateVector([0,0,1],initialAlignment),initial)<1e-9&&distance(rotateVector([0,0,1],finalAlignment),last)<1e-9;
  const rotate=(v,a,t)=>{const cosine=Math.cos(t),sine=Math.sin(t),c=cross(a,v),d=dot(a,v);return v.map((x,i)=>x*cosine+c[i]*sine+a[i]*d*(1-cosine));};
  const pose=t=>{
    let position;
    if(t<=0)position=[...start.position];else if(t>=1)position=[...end.position];
    else if(polar)position=rotate(initial,axis,angle*t).map((v,i)=>start.port[i]+v*(radialA+(radialB-radialA)*t));
    else position=mix(start.position,end.position,t);
    const direction=unit(sub(position,start.port));
    const progress=radialFrame?clamp(Math.atan2(Math.hypot(...cross(initial,direction)),clamp(dot(initial,direction),-1,1))/angle,0,1):t;
    const alignment=polar?quaternionProduct([...axis.map(v=>v*Math.sin(angle*t/2)),Math.cos(angle*t/2)],initialAlignment):slerpInstrumentAlignment(initialAlignment,finalAlignment,progress);
    return {...start,position,alignment,wrist:mix(start.wrist,end.wrist,t),jaw:start.jaw+(end.jaw-start.jaw)*t};
  };
  const bound=(from,to)=>{
    const span=to-from;if(span<=0)return 0;
    const one=pose(from),two=pose(to);
    const baseAngle=polar?angle*span:quaternionAngle(one.alignment,two.alignment);
    const radiusOne=distance(one.position,start.port),radiusTwo=distance(two.position,start.port);
    const radiusMin=polar?Math.min(radiusOne,radiusTwo):sourceSegmentDistance(start.port,start.port,one.position,two.position);
    const radiusMax=Math.max(radiusOne,radiusTwo),radialTravel=polar?Math.abs(radialB-radialA)*span:travel*span;
    const transverseMax=bendingTravel>1e-14?.035:Math.max(Math.hypot(localA[0],localA[1]),Math.hypot(localB[0],localB[1]));
    const transverseTravel=(.035*bendingTravel+transverseMax*rollTravel)*span;
    let compensation;
    if(radiusMin>transverseMax+1e-6){
      const ratio=transverseMax/radiusMin;
      compensation=3*(transverseTravel/radiusMin+transverseMax*radialTravel/(radiusMin*radiusMin))/Math.sqrt(1-ratio*ratio);
    }else{
      // Normalisation is uniformly bounded away from zero by the same 10 µm
      // axial regulariser used by the visible pose. This also covers the free
      // RCM singular region instead of introducing a forbidden workspace cone.
      compensation=Math.min(Math.PI,4*(transverseTravel+Math.sqrt(2*radiusMax*radialTravel+2*transverseMax*transverseTravel))/Math.max(1e-5,radiusMin));
    }
    return (polar?Math.abs(radialB-radialA)*span:travel*span)+.65*(baseAngle+compensation)+.035*(wristTravel+jawTravel)*span+1e-12;
  };
  return {pose,bound};
}

/** Continuous contact over the complete source shaft and animated distal links.
 * Contact departures use at most 50 µm of swept travel, strictly below the
 * envelopes' 150 µm CAD padding, so tangent/zero-gap escape stays possible while
 * the original metal triangles remain separated throughout the micro-step. */
export function sweepInstrument(start,desired,other){
  const trajectory=instrumentTrajectory(start,desired),fixed=instrumentCapsules(other),first=instrumentCapsules(start),tolerance=1e-7;
  const fullBound=trajectory.bound(0,1);if(fullBound<2e-12)return {tool:trajectory.pose(1),limited:false};
  let allowances=null;
  if(capsuleClearance(first,fixed)<0){
    allowances=[];
    for(const a of first)for(const b of fixed){const gap=sourceSegmentDistance(a.a,a.b,b.a,b.b)-a.radius-b.radius;
      allowances.push(gap<=-a.radius-b.radius+tolerance?-Infinity:Math.min(0,gap));}
  }
  const clearance=t=>capsuleClearance(instrumentCapsules(trajectory.pose(t)),fixed,allowances);
  let fraction=0;
  for(let iteration=0;iteration<2048;iteration++){
    const gap=clearance(fraction),remaining=1-fraction,endBound=trajectory.bound(fraction,1);
    if(gap>=endBound+1e-12)return {tool:trajectory.pose(1),limited:false};
    let low=fraction,high=1;
    const allowance=Math.max(gap*.8,gap<2e-5?5e-5:0);
    for(let search=0;search<30;search++){const middle=(low+high)*.5;if(trajectory.bound(fraction,middle)<=allowance)low=middle;else high=middle;}
    if(low-fraction<1e-12)return {tool:trajectory.pose(fraction),limited:true,reason:'motion-resolution'};
    if(gap<2e-5){
      const next=clearance(low);
      if(next<0){
        let safe=fraction,blocked=low;
        for(let search=0;search<28;search++){const mid=(safe+blocked)*.5;if(clearance(mid)>=0)safe=mid;else blocked=mid;}
        return {tool:trajectory.pose(safe),limited:true,reason:'instrument-contact'};
      }
    }
    fraction=low;
    if(remaining<1e-12||fraction>=1-1e-12)return {tool:trajectory.pose(1),limited:false};
  }
  return {tool:trajectory.pose(fraction),limited:true,reason:'motion-resolution'};
}
