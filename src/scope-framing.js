/** Pure composition policy; all coordinates/distances are world metres.
 * Geometry queries and the final organ-clearance veto belong to TissueVolume /
 * main. This module never treats a detached specimen as the mother organ. */
export const SCOPE_FRAMING = Object.freeze({
  workingDistance: .065,
  minimumWorkingDistance: .028,
  maximumWorkingDistance: .13,
  insertionSpeed: .035,
  insertionSmoothing: 4.5,
  defaultFov: 55,
  minimumFov: 25,
  maximumFov: 80,
});

const vector = value => Array.isArray(value) && value.length === 3 && value.every(Number.isFinite);
const clamp = (v, low, high) => Math.min(high, Math.max(low, v));
const distance = (a, b) => Math.hypot(...a.map((v, i) => v - b[i]));
const clone = value => [...value];
const minus=(a,b)=>a.map((v,i)=>v-b[i]);
const dot=(a,b)=>a.reduce((sum,v,i)=>sum+v*b[i],0);
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const unit=a=>{const length=Math.hypot(...a);return a.map(v=>v/length);};

/** Largest insertion depth that retains every supplied world point inside the
 * actual camera axes/FOV. Unlike a sphere about a midpoint, this includes the
 * targets' different optical depths and preserves the user's chosen FOV. */
export function scopeTargetsDepthLimit({port,targets,direction,cameraUp=[0,1,0],aspect=1,fovDegrees=55,margin=.004,coverage=.86}={}){
  if(!vector(port)||!Array.isArray(targets)||!targets.length||!targets.every(vector)||!vector(direction)||Math.hypot(...direction)<1e-12||!vector(cameraUp)||!Number.isFinite(aspect)||aspect<=0||!Number.isFinite(fovDegrees)||fovDegrees<=0||fovDegrees>=180)throw new TypeError('Scope target fit requires finite projection geometry.');
  const forward=unit(direction);let right=cross(forward,cameraUp);
  if(Math.hypot(...right)<1e-9)right=cross(forward,Math.abs(forward[2])<.9?[0,0,1]:[0,1,0]);
  right=unit(right);const up=unit(cross(right,forward)),tanHalf=Math.tan(fovDegrees*Math.PI/360);
  return Math.min(...targets.flatMap(target=>{const offset=minus(target,port),z=dot(offset,forward);
    return [z-(Math.abs(dot(offset,right))+margin)/(tanHalf*aspect*coverage),z-(Math.abs(dot(offset,up))+margin)/(tanHalf*coverage)];}));
}

/** Fit actual source-CAD TCPs at startup/reset, before the first render. The
 * physical lens remains on its RCM ray; aspect controls retraction first and
 * widens optical FOV only if the retraction stop otherwise clips either TCP. */
export function resolveInitialScopeFraming({port,targets,aspect=1,fovDegrees=SCOPE_FRAMING.defaultFov,
  minimumDepth=.018,maximumDepth=.135,margin=.004,coverage=.86}={}){
  if(!vector(port)||!Array.isArray(targets)||targets.length<2||!targets.every(vector)||!Number.isFinite(aspect)||aspect<=0||!Number.isFinite(fovDegrees))throw new TypeError('Initial scope framing requires finite TCPs and a positive aspect.');
  const target=[0,1,2].map(axis=>targets.reduce((sum,p)=>sum+p[axis],0)/targets.length);
  const delta=minus(target,port),targetDistance=Math.hypot(...delta),direction=targetDistance>1e-12?unit(delta):[0,-1,0];
  let right=cross(direction,[0,1,0]);if(Math.hypot(...right)<1e-9)right=cross(direction,[0,0,1]);right=unit(right);
  const up=unit(cross(right,direction));
  const projected=targets.map(p=>{const d=minus(p,target);return {x:Math.abs(dot(d,right))+margin,y:Math.abs(dot(d,up))+margin,z:dot(d,direction)};});
  const atMinimum=targetDistance-minimumDepth;
  const tanRequired=Math.max(...projected.flatMap(p=>[p.x/(Math.max(.001,atMinimum+p.z)*aspect*coverage),p.y/(Math.max(.001,atMinimum+p.z)*coverage)]));
  const recommendedFov=clamp(Math.max(fovDegrees,Math.atan(tanRequired)*360/Math.PI),SCOPE_FRAMING.minimumFov,SCOPE_FRAMING.maximumFov);
  const tanHalf=Math.tan(recommendedFov*Math.PI/360);
  const workingDistance=Math.max(SCOPE_FRAMING.workingDistance,...projected.flatMap(p=>[p.x/(tanHalf*aspect*coverage)-p.z,p.y/(tanHalf*coverage)-p.z]));
  const depthTarget=clamp(targetDistance-workingDistance,minimumDepth,maximumDepth);
  return {target,anchor:[...target],source:'initial-two-tips',direction,up,workingDistance,baseWorkingDistance:workingDistance,
    baseDepth:targetDistance-workingDistance,targetDistance,depthTarget,recommendedFov,
    framingLimited:targetDistance-depthTarget<workingDistance-1e-9,viewMode:'field'};
}

export function validOrganBounds(bounds) {
  return !!bounds && vector(bounds.min) && vector(bounds.max) && bounds.min.every((v, i) => v <= bounds.max[i]);
}

/** Returns null only when the host has not supplied an anatomical context. */
export function resolveScopeFraming({port, intentTarget, surfaceTarget = null, fieldAnchor = null,
  organBounds = null, heldSpecimen = null, viewMode = 'field', depthBias = 0,
  followMode = 'active', operating = false, graspTarget = null, startupOverview = false, initialTargets = null,
  direction = null,cameraUp = [0,1,0],cooperativeFovDegrees = null,
  fovDegrees = SCOPE_FRAMING.defaultFov, aspect=1, minimumDepth = .018, maximumDepth = .135} = {}) {
  if (!vector(port) || !vector(intentTarget) || !Number.isFinite(depthBias)||!Number.isFinite(aspect)||aspect<=0||!Number.isFinite(fovDegrees)) throw new TypeError('Invalid scope framing inputs.');
  if(startupOverview&&initialTargets){
    const framed=resolveInitialScopeFraming({port,targets:initialTargets,aspect,fovDegrees,minimumDepth,maximumDepth});
    framed.workingDistance=Math.max(SCOPE_FRAMING.minimumWorkingDistance,framed.workingDistance-depthBias);
    framed.depthTarget=clamp(framed.targetDistance-framed.workingDistance,minimumDepth,maximumDepth);
    return framed;
  }
  const cooperative=(followMode==='midpoint'||followMode==='grasp'&&(!vector(graspTarget)||operating))&&Array.isArray(initialTargets)&&initialTargets.length>1&&initialTargets.every(vector);
  let target, anchor, baseWorkingDistance, source;
  if (viewMode === 'specimen' && vector(heldSpecimen?.position)) {
    anchor = clone(heldSpecimen.position); target = clone(intentTarget); source = 'specimen';
    const radius = Number.isFinite(heldSpecimen.radius) && heldSpecimen.radius > 0 ? heldSpecimen.radius : .009;
    const fov = clamp(fovDegrees, 30, 100) * Math.PI / 180;
    // A perspective camera's configured FOV is vertical. Portrait scope areas
    // have a narrower horizontal field; both axes must contain the specimen.
    const tanHalf=Math.tan(fov/2)*Math.min(1,aspect);
    // The selected control target remains centred even when a held specimen's
    // bounds are offset from the grasped TCP. Back off enough to fit both.
    baseWorkingDistance = Math.max(.03,(radius+distance(anchor,target))/(.78*tanHalf));
  } else {
    anchor = vector(surfaceTarget) ? clone(surfaceTarget) : vector(fieldAnchor) ? clone(fieldAnchor) : null;
    if (!anchor && validOrganBounds(organBounds)) anchor = intentTarget.map((v, i) => clamp(v, organBounds.min[i], organBounds.max[i]));
    if (!anchor&&cooperative)anchor=clone(intentTarget);
    if (!anchor) return null;
    source = followMode === 'active' ? 'active-tip' : followMode === 'midpoint' ? 'instrument-midpoint' : 'cooperative-target';
    // Parent geometry supplies clearance context, never an aim offset. In
    // active mode the commanded/visible CAD TCP is the exact screen centre.
    target = clone(intentTarget);
    baseWorkingDistance = SCOPE_FRAMING.workingDistance;
  }
  const targetDistance = distance(port, target);
  let fitDepthMaximum=null;
  if(cooperative){
    const forward=vector(direction)&&Math.hypot(...direction)>1e-12?direction:minus(target,port);
    fitDepthMaximum=scopeTargetsDepthLimit({port,targets:initialTargets,direction:Math.hypot(...forward)>1e-12?forward:[0,-1,0],cameraUp,aspect,
      fovDegrees:cooperativeFovDegrees??fovDegrees});
    baseWorkingDistance=Math.max(baseWorkingDistance,targetDistance-fitDepthMaximum);
  }
  const workingDistance = clamp(baseWorkingDistance - depthBias, SCOPE_FRAMING.minimumWorkingDistance,
    Math.max(SCOPE_FRAMING.maximumWorkingDistance,baseWorkingDistance,targetDistance-minimumDepth));
  const baseDepth = targetDistance - baseWorkingDistance;
  const depthTarget = clamp(targetDistance - workingDistance, minimumDepth, maximumDepth);
  return {target, anchor, source, baseWorkingDistance, workingDistance, baseDepth, depthTarget,
    targetDistance,fitDepthMaximum,viewMode: source === 'specimen' ? 'specimen' : 'field',
    insertionLimited: depthTarget < targetDistance - workingDistance - 1e-9,
    retractionLimited: depthTarget > targetDistance - workingDistance + 1e-9,
    framingLimited:Math.abs(depthTarget-(targetDistance-workingDistance))>1e-9||fitDepthMaximum!==null&&depthTarget>fitDepthMaximum+1e-9};
}

/** Monotone, bounded depth servo; manual commands are applied by Simulation. */
export function advanceScopeDepth(current, desired, dt) {
  if (![current, desired, dt].every(Number.isFinite) || dt < 0) throw new TypeError('Invalid scope insertion update.');
  const error=desired-current,sign=Math.sign(error),magnitude=Math.abs(error);
  const speed=SCOPE_FRAMING.insertionSpeed,k=SCOPE_FRAMING.insertionSmoothing,transition=speed/k;
  if(magnitude<=transition)return desired-error*Math.exp(-k*dt);
  const saturatedTime=(magnitude-transition)/speed;
  if(dt<=saturatedTime)return current+sign*speed*dt;
  return desired-sign*transition*Math.exp(-k*(dt-saturatedTime));
}
