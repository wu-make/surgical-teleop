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

export function validOrganBounds(bounds) {
  return !!bounds && vector(bounds.min) && vector(bounds.max) && bounds.min.every((v, i) => v <= bounds.max[i]);
}

/** Returns null only when the host has not supplied an anatomical context. */
export function resolveScopeFraming({port, intentTarget, surfaceTarget = null, fieldAnchor = null,
  organBounds = null, heldSpecimen = null, viewMode = 'field', depthBias = 0,
  followMode = 'active', fovDegrees = SCOPE_FRAMING.defaultFov, aspect=1, minimumDepth = .018, maximumDepth = .135} = {}) {
  if (!vector(port) || !vector(intentTarget) || !Number.isFinite(depthBias)||!Number.isFinite(aspect)||aspect<=0||!Number.isFinite(fovDegrees)) throw new TypeError('Invalid scope framing inputs.');
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
    if (!anchor) return null;
    source = followMode === 'active' ? 'active-tip' : followMode === 'midpoint' ? 'instrument-midpoint' : 'cooperative-target';
    // Parent geometry supplies clearance context, never an aim offset. In
    // active mode the commanded/visible CAD TCP is the exact screen centre.
    target = clone(intentTarget);
    baseWorkingDistance = SCOPE_FRAMING.workingDistance;
  }
  const targetDistance = distance(port, target);
  const workingDistance = clamp(baseWorkingDistance - depthBias, SCOPE_FRAMING.minimumWorkingDistance,
    Math.max(SCOPE_FRAMING.maximumWorkingDistance,baseWorkingDistance,targetDistance-minimumDepth));
  const baseDepth = targetDistance - baseWorkingDistance;
  const depthTarget = clamp(targetDistance - workingDistance, minimumDepth, maximumDepth);
  return {target, anchor, source, baseWorkingDistance, workingDistance, baseDepth, depthTarget,
    targetDistance, viewMode: source === 'specimen' ? 'specimen' : 'field',
    insertionLimited: depthTarget < targetDistance - workingDistance - 1e-9,
    retractionLimited: depthTarget > targetDistance - workingDistance + 1e-9,
    framingLimited:Math.abs(depthTarget-(targetDistance-workingDistance))>1e-9};
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
