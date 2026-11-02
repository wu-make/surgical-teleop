const clamp=value=>Math.max(0,Math.min(1,value));
const smooth=value=>{const t=clamp(value);return t*t*(3-2*t);};
const derivative=value=>value>0&&value<1?6*value*(1-value):0;

/** A cut-front mask for the existing invertible local traction flow. It keeps
 * the bed still behind a real completed incision while the held flap rises.
 * This never edits occupancy or creates a disconnected specimen. */
export function normalizeTractionSection(section){
  if(!section)return null;
  const {center,radii,plane,depth,curvature,front}=section;
  if(![center,radii,curvature].every(v=>Array.isArray(v)&&v.length===2&&v.every(Number.isFinite))||radii.some(v=>v<=0)||curvature.some(v=>v<0)||![plane,depth,front].every(Number.isFinite)||depth<=0||[section.width,section.frontBlend].some(v=>v!=null&&!Number.isFinite(v)))throw Error('Invalid traction section');
  return{center:[...center],radii:[...radii],plane,depth,curvature:[...curvature],front,width:Math.max(.001,section.width??.0033),frontBlend:Math.max(.002,section.frontBlend??.006)};
}

export function tractionSectionInto(x,y,z,section,out){
  const u=(x-section.center[0])/section.radii[0],v=(y-section.center[1])/section.radii[1],s=u*u+v*v;
  const [a,b]=section.curvature,surface=section.plane+section.depth*(a*s+b*s*s),slope=2*section.depth*(a+2*b*s);
  const t=(z-surface)/section.width+.5,h=smooth(t),hz=derivative(t)/section.width;
  const f=(section.front-y)/section.frontBlend,front=smooth(f),fy=-derivative(f)/section.frontBlend;
  out.weight=1-front*(1-h);
  out.above=t>=1;out.ahead=f<=0;
  out.gradient[0]=-front*hz*slope*u/section.radii[0];
  out.gradient[1]=-fy*(1-h)-front*hz*slope*v/section.radii[1];
  out.gradient[2]=front*hz;
  return out;
}

/** Exact affine cases of the same flow, rather than a lower-detail map.
 * The curved sheet is convex, so its signed vertical gap is concave along a
 * straight translation. Being above at both ends proves it stays above. */
export function sectionRigidWeight(x,y,z,deformation,scratch){
  const section=deformation.section,delta=deformation.displacement,mask=tractionSectionInto(x,y,z,section,scratch);
  if(mask.weight===0)return 0;
  const local=deformation.local;if((x-local[0])**2+(y-local[1])**2+(z-local[2])**2>deformation.coreRadius**2)return null;
  const above=mask.above,ahead=mask.ahead,end=tractionSectionInto(x+delta[0],y+delta[1],z+delta[2],section,scratch);
  return(above&&end.above)||(ahead&&end.ahead)?1:null;
}

/** Bounds are used only for integration step size and conservative queries.
 * Upward flow expands this gate; lateral/downward flow also receives enough
 * substeps to keep every rank-one step's Jacobian positive. */
export function tractionSectionBounds(section,local,delta,radius){
  const [a,b]=section.curvature,top=local[2]+radius+Math.max(0,delta[2])+section.width*.5;
  const height=Math.max(0,(top-section.plane)/section.depth);
  const radial=b>0?Math.max(0,(-a+Math.sqrt(a*a+4*b*height))/(2*b)):a>0?height/a:0;
  const factor=2*section.depth*(a+2*b*radial)*Math.sqrt(radial),sx=factor/section.radii[0],sy=factor/section.radii[1];
  const vertical=1.5/section.width,front=1.5/section.frontBlend;
  return{gradient:Math.hypot(vertical*sx,vertical*sy+front,vertical),contraction:vertical*(Math.abs(delta[0])*sx+Math.abs(delta[1])*sy+Math.max(0,-delta[2]))+front*Math.abs(delta[1])};
}
