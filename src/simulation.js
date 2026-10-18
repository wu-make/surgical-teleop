import {instrumentPose,instrumentCapsules} from './instrument-pose.js';
import {sourceInstrumentContact,sweepInstrument,sourceSegmentDistance} from './instrument-contact.js';
import {SCOPE_FRAMING,resolveScopeFraming,resolveInitialScopeFraming,advanceScopeDepth,validOrganBounds} from './scope-framing.js';

/**
 * Deterministic kinematic controls for the browser demonstration.
 * Units: metres, radians, seconds. This is a virtual workbench, not a
 * tissue/contact solver or a controller for physical surgical equipment.
 *
 * The abdominal ports are fixed remote centres of motion (RCM). Source-CAD
 * wrist articulation and the RCM frame share the same pose in rendering/contact.
 */

export const LIMITS = Object.freeze({
  scopeDepth: Object.freeze([.018, .135]),
  workingDistance: .028,
  collisionTolerance: 1e-7,
  shaftLengths: Object.freeze({left: .4355, right: .4408}),
  maxFrameTime: .1,
  history: 40,
});

export const CONTROL_RATES = Object.freeze({
  translation: .035,
  wrist: .8,
  jaw: 1.1,
  scopeDepth: .026,
  scopeRotation: .55,
  fineFactor: .04,
  startFactor: .045,
  accelerationDelay: .12,
  accelerationTime: .85,
  followSmoothing: 5,
  followMaxRadiansPerSecond: .9,
});

const clone = value => typeof structuredClone === 'function' ? structuredClone(value) : JSON.parse(JSON.stringify(value));
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const finite = value => typeof value === 'number' && Number.isFinite(value);
const validVector = value => Array.isArray(value) && value.length === 3 && value.every(finite);
const vectorDistance = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const equalVector = (a, b, epsilon = 1e-10) => a.every((v, i) => Math.abs(v - b[i]) < epsilon);
const TOOL_IDS = ['left', 'right'];
const SELECTIONS = [...TOOL_IDS, 'scope'];
const AXES = { x: 0, y: 1, z: 2 };
const wrapAngle = angle => Math.atan2(Math.sin(angle), Math.cos(angle));
const add = (a, b) => a.map((v, i) => v + b[i]);
const sub = (a, b) => a.map((v, i) => v - b[i]);
const mul = (a, n) => a.map(v => v * n);
const dot = (a, b) => a.reduce((sum, v, i) => sum + v * b[i], 0);
const cross = (a, b) => [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]];
const normalize = (v, fallback = [0, 0, -1]) => {
  const length = Math.hypot(...v);
  return length > 1e-12 ? mul(v, 1 / length) : [...fallback];
};
const interpolate = (a, b, fraction) => a.map((v, i) => v + (b[i] - v) * fraction);
const followModes = ['active', 'midpoint', 'grasp'];

/** Integral of the held-key speed curve: exact across frame subdivisions. */
export function integratedControlDistance(age, duration, rate, fine = false) {
  if (![age, duration, rate].every(finite) || age < 0 || duration < 0 || rate < 0) throw new TypeError('Invalid control integration.');
  if (fine) return duration * rate * CONTROL_RATES.fineFactor;
  const {startFactor: start, accelerationDelay: delay, accelerationTime: ramp} = CONTROL_RATES;
  const primitive = time => {
    const u = clamp((time - delay) / ramp, 0, 1);
    return rate * (start * time + (1 - start) * (ramp * (u ** 3 - .5 * u ** 4) + Math.max(0, time - delay - ramp)));
  };
  return primitive(age + duration) - primitive(age);
}

/** Shared source-CAD capsules: no TCP sphere or fictitious straight bent wrist. */
export const segmentDistance=sourceSegmentDistance;
export const toolCollisionShapes=tool=>instrumentCapsules(tool);
export const instrumentClearance=(a,b)=>sourceInstrumentContact(a,b).clearance;
function collisionState(tools,blocked=false,selected=null,reason=null){
  const info=sourceInstrumentContact(tools.left,tools.right);
  return {...info,active:blocked,blocked,contact:info.clearance<=.00025,selected:blocked?selected:null,reason:blocked?reason:null};
}
function clearCollisionBlock(state){if(state.collision?.blocked||state.collision?.active)state.collision={...state.collision,active:false,blocked:false,selected:null,reason:null};}

function perpendicularUp(direction, suggestion = [0, 1, 0]) {
  const projected = sub(suggestion, mul(direction, dot(suggestion, direction)));
  if (Math.hypot(...projected) > 1e-8) return normalize(projected);
  return normalize(cross(direction, Math.abs(direction[0]) < .8 ? [1, 0, 0] : [0, 0, 1]));
}

function rotateAround(vector, axis, angle) {
  const c = Math.cos(angle), s = Math.sin(angle);
  return add(add(mul(vector, c), mul(cross(axis, vector), s)), mul(axis, dot(axis, vector) * (1 - c)));
}

function smoothDirection(from, to, time, up) {
  const angle = Math.acos(clamp(dot(from, to), -1, 1));
  if (angle < 1e-10) return [...to];
  const amount = Math.min(angle, CONTROL_RATES.followMaxRadiansPerSecond * time);
  if(amount===angle)return normalize(to);
  const axis = normalize(cross(from, to), perpendicularUp(from, up));
  return normalize(rotateAround(from, axis, amount));
}

const INITIAL_TOOLS = Object.freeze({
  left: { port: [-.08, 1.18, .10], position: [-.025, 1.105, 0], wrist: [0, 0, 0], jaw: .6 },
  right: { port: [.08, 1.18, .10], position: [.025, 1.108, 0], wrist: [0, 0, 0], jaw: .6 },
});
const SCOPE_PORT = Object.freeze([0, 1.18, .14]);

function initialState() {
  const target = INITIAL_TOOLS.left.position.map((v,i)=>(v+INITIAL_TOOLS.right.position[i])*.5);
  const dx = target[0] - SCOPE_PORT[0];
  const dy = target[1] - SCOPE_PORT[1];
  const dz = target[2] - SCOPE_PORT[2];
  const state = {
    selected: 'left', activeTool: 'left', paused: false, cutting: false,
    elapsed: 0,
    tools: clone(INITIAL_TOOLS),
    scope: {
      port: [...SCOPE_PORT], position: [0, 0, 0], target, lookAt: [...target],
      depth: clamp(Math.hypot(dx,dy,dz)-SCOPE_FRAMING.workingDistance,...LIMITS.scopeDepth), yaw: Math.atan2(dx, -dz), pitch: Math.atan2(-dy, Math.hypot(dx, dz)),
      roll: 0, fov: SCOPE_FRAMING.defaultFov, follow: true, followMode: 'midpoint', startupOverview:true, startupFovUserSet:false, graspTarget: null, operating: false,
      direction: normalize([dx, dy, dz]), up: [0, 1, 0], cameraUp: [0, 1, 0],
      viewMode:'field',depthBias:0,surfaceTarget:null,fieldAnchor:null,organBounds:null,heldSpecimen:null,
      framingSource:null,framingLimited:false,targetWorkingDistance:SCOPE_FRAMING.workingDistance,autoDepthTarget:null,intentTarget:[...target],
    },
  };
  for(const id of TOOL_IDS){
    state.tools[id].shaftLength=LIMITS.shaftLengths[id];
    state.tools[id].instrument=id==='left'?'needle-driver':'scissors';
    const pose=instrumentPose(state.tools[id]);state.tools[id].alignment=pose.alignment;state.tools[id].shaftDirection=pose.shaftDirection;
  }
  state.collision=collisionState(state.tools);
  prepareInitialScopeState(state,1);
  return state;
}

function prepareInitialScopeState(state,aspect){
  const s=state.scope,framed=resolveInitialScopeFraming({port:s.port,targets:TOOL_IDS.map(id=>state.tools[id].position),aspect,
    minimumDepth:LIMITS.scopeDepth[0],maximumDepth:LIMITS.scopeDepth[1]});
  s.target=[...framed.target];s.intentTarget=[...framed.target];s.depth=framed.depthTarget;if(!s.startupFovUserSet)s.fov=framed.recommendedFov;
  s.direction=[...framed.direction];s.up=[...framed.up];s.roll=0;
  s.yaw=Math.atan2(s.direction[0],-s.direction[2]);s.pitch=Math.atan2(-s.direction[1],Math.hypot(s.direction[0],s.direction[2]));
  s.framingSource=framed.source;s.framingLimited=framed.framingLimited;s.targetWorkingDistance=framed.workingDistance;s.autoDepthTarget=framed.depthTarget;
  updateScopePose(state,s.direction);
}

function scopeDirection(scope) {
  return [Math.sin(scope.yaw) * Math.cos(scope.pitch), -Math.sin(scope.pitch), -Math.cos(scope.yaw) * Math.cos(scope.pitch)];
}

function updateScopePose(state, directionOverride) {
  const s = state.scope;
  s.port = [...SCOPE_PORT];
  const distance = s.follow ? vectorDistance(s.target, s.port) : .19;
  const maxDepth = Math.max(LIMITS.scopeDepth[0], Math.min(LIMITS.scopeDepth[1], distance - LIMITS.workingDistance));
  s.depth = clamp(s.depth, LIMITS.scopeDepth[0], maxDepth);
  const direction = normalize(directionOverride || scopeDirection(s));
  const transported=scopeUpForDirection(s,direction);
  s.up=transported.up;
  s.direction = direction;
  s.cameraUp=transported.cameraUp;
  s.position = s.port.map((v, i) => v + direction[i] * s.depth);
  s.lookAt = s.port.map((v, i) => v + direction[i] * Math.max(distance, s.depth + LIMITS.workingDistance));
  if (!s.follow) s.target = [...s.lookAt];
  s.actualWorkingDistance=vectorDistance(s.position,s.target);
}

function scopeUpForDirection(s,direction){
  const previous = validVector(s.direction) ? normalize(s.direction) : direction;
  const previousUp = perpendicularUp(previous, s.up);
  const axis = cross(previous, direction);
  const angle = Math.acos(clamp(dot(previous, direction), -1, 1));
  const up=angle>1e-10?perpendicularUp(direction,rotateAround(previousUp,normalize(axis,previousUp),angle)):perpendicularUp(direction,previousUp);
  return {up,cameraUp:normalize(rotateAround(up,direction,s.roll))};
}

/** Compatibility entry: finite positions are free; there is no workspace box. */
export function constrainToolPosition(position, port) {
  if (!validVector(position) || !validVector(port)) throw new TypeError('Tool position and port require three finite numbers.');
  return [...position];
}

function normalizeKeys(input) {
  const keys = input instanceof Set ? input : new Set(input || []);
  const result = new Set();
  const aliases = {
    ' ': 'Space', Spacebar: 'Space', Shift: 'ShiftLeft',
    '1': 'Digit1', '2': 'Digit2', '3': 'Digit3',
    '[': 'BracketLeft', ']': 'BracketRight',
    w: 'KeyW', s: 'KeyS', a: 'KeyA', d: 'KeyD', q: 'KeyQ', e: 'KeyE',
    z: 'KeyZ', x: 'KeyX', c: 'KeyC', v: 'KeyV',
  };
  for (const key of keys) {
    if (typeof key !== 'string') continue;
    result.add(aliases[key] || aliases[key.toLowerCase()] || key);
  }
  return result;
}

const axisInput = (keys, positive, negative) => Number(keys.has(positive)) - Number(keys.has(negative));

export class Simulation {
  constructor({ onEvent, getExtraData, shouldCheckpoint, ownsExtraData=false } = {}) {
    this.state = initialState();
    this.undoStack = [];
    this.redoStack = [];
    this._listeners = new Set();
    if (typeof onEvent === 'function') this._listeners.add(onEvent);
    this._previousKeys = new Set();
    this._gesture = false;
    this._events = [];
    this._limitCooldown = 0;
    this._controlAges = new Map();
    this.ownsExtraData=ownsExtraData;
    this.getExtraData = typeof getExtraData === 'function' ? getExtraData : undefined;
    this.shouldCheckpoint = typeof shouldCheckpoint === 'function' ? shouldCheckpoint : undefined;
    // Viewport shape is display context, never part of surgical undo history.
    this.viewAspect=1;
  }

  /** Subscribe to {type, ...details} events; returns an unsubscribe function. */
  onEvent(listener) {
    if (typeof listener !== 'function') throw new TypeError('Event listener must be a function.');
    this._listeners.add(listener);
    return () => this._listeners.delete(listener);
  }

  _emit(type, detail = {}) {
    const event = { type, ...detail };
    this._events.push(event);
    for (const listener of this._listeners) listener(event);
    return event;
  }

  get canUndo() { return this.undoStack.length > 0; }
  get canRedo() { return this.redoStack.length > 0; }
  get selectedTool() { return this.state.tools[this.state.activeTool]; }

  snapshot() { return clone({ version: 1, state: this.state }); }

  /** Restore a validated detached snapshot. Fixed RCM ports cannot be modified. */
  restore(snapshot) {
    const state = clone(snapshot?.state ?? snapshot);
    if (!state || !SELECTIONS.includes(state.selected) || !TOOL_IDS.includes(state.activeTool) || !finite(state.elapsed)) {
      throw new TypeError('Invalid simulation snapshot.');
    }
    for (const id of TOOL_IDS) {
      const tool = state.tools?.[id];
      if (!tool || !validVector(tool.position) || !validVector(tool.wrist) || !finite(tool.jaw)) throw new TypeError(`Invalid ${id} tool snapshot.`);
      tool.port = [...INITIAL_TOOLS[id].port];
      tool.shaftLength = LIMITS.shaftLengths[id];
      tool.position = constrainToolPosition(tool.position, tool.port);
      if(tool.shaftDirection!==undefined&&(!validVector(tool.shaftDirection)||Math.hypot(...tool.shaftDirection)<1e-10))throw new TypeError(`Invalid ${id} shaft direction.`);
      tool.instrument=id==='left'?'needle-driver':'scissors';
      if(tool.alignment!==undefined&&(!Array.isArray(tool.alignment)||tool.alignment.length!==4||!tool.alignment.every(finite)||Math.hypot(...tool.alignment)<1e-10))throw new TypeError(`Invalid ${id} tool frame.`);
      const pose=instrumentPose(tool);tool.alignment=pose.alignment;tool.shaftDirection=pose.shaftDirection;
      tool.jaw = clamp(tool.jaw, 0, 1);
    }
    const s = state.scope;
    if (!s || !validVector(s.target) || !['depth', 'yaw', 'pitch', 'roll'].every(k => finite(s[k])) || !followModes.includes(s.followMode)) {
      throw new TypeError('Invalid scope snapshot.');
    }
    state.paused = Boolean(state.paused);
    state.cutting = Boolean(state.cutting);
    s.follow = Boolean(s.follow);
    if (s.graspTarget != null && !validVector(s.graspTarget)) throw new TypeError('Invalid scope grasp target.');
    s.graspTarget ??= null;
    s.operating = Boolean(s.operating);
    s.startupOverview=Boolean(s.startupOverview);
    s.startupFovUserSet=Boolean(s.startupFovUserSet);
    s.fov ??= SCOPE_FRAMING.defaultFov;
    if(!finite(s.fov)||s.fov<SCOPE_FRAMING.minimumFov||s.fov>SCOPE_FRAMING.maximumFov)throw new TypeError('Invalid scope optical FOV.');
    s.viewMode??='field';s.depthBias??=0;s.surfaceTarget??=null;s.fieldAnchor??=s.surfaceTarget?[...s.surfaceTarget]:null;
    s.organBounds??=null;s.heldSpecimen??=null;s.framingSource??=null;s.targetWorkingDistance??=SCOPE_FRAMING.workingDistance;
    s.framingLimited=Boolean(s.framingLimited);
    s.autoDepthTarget??=null;s.intentTarget??=[...s.target];
    if(!['field','specimen'].includes(s.viewMode)||!finite(s.depthBias)||
      (s.surfaceTarget!==null&&!validVector(s.surfaceTarget))||(s.fieldAnchor!==null&&!validVector(s.fieldAnchor))||
      (s.organBounds!==null&&!validOrganBounds(s.organBounds))||!validVector(s.intentTarget)||
      (s.heldSpecimen!==null&&(!validVector(s.heldSpecimen.position)||!finite(s.heldSpecimen.radius)||s.heldSpecimen.radius<0)))throw new TypeError('Invalid scope anatomical framing snapshot.');
    state.elapsed = Math.max(0, state.elapsed);
    state.collision=collisionState(state.tools);
    const savedCamera=Object.fromEntries(['position','lookAt','direction','up','cameraUp'].filter(key=>validVector(s[key])).map(key=>[key,[...s[key]]]));
    const savedWorkingDistance=s.actualWorkingDistance;
    updateScopePose(state);
    // Preserve an already consistent camera snapshot exactly. Re-evaluating
    // atan2/sin at reset's symmetric midpoint otherwise adds tiny drift to
    // histories; inconsistent/missing legacy derived vectors stay canonical.
    for(const [key,value]of Object.entries(savedCamera))if(vectorDistance(value,s[key])<1e-10)s[key]=value;
    if(finite(savedWorkingDistance)&&Math.abs(savedWorkingDistance-s.actualWorkingDistance)<1e-10)s.actualWorkingDistance=savedWorkingDistance;
    this.state = state;
    this._gesture = false;
    this._previousKeys.clear();
    this._controlAges.clear();
    this._emit('restore');
    return this.state;
  }

  /**
   * Save BEFORE an atomic action. extraData may contain a typed tissue mask,
   * or be a lazy factory so pending worker geometry is never sampled when the
   * host's stability gate is closed. A rejected checkpoint leaves redo intact.
   * takeOwnership is for a fresh private snapshot whose mutable fields have no
   * external owner; immutable cutter records may be shared. Defaults clone.
   * Pass the current extraData to undo/redo so the other direction can restore it.
   */
  checkpoint(label = '操作', extraData, {takeOwnership=false}={}) {
    if(this.shouldCheckpoint&&!this.shouldCheckpoint())return false;
    if(typeof extraData==='function')extraData=extraData();
    this.undoStack.push({ label: String(label), snapshot: this.snapshot(), extraData: extraData === undefined ? undefined : takeOwnership?extraData:clone(extraData) });
    if (this.undoStack.length > LIMITS.history) this.undoStack.shift();
    this.redoStack.length = 0;
    this._emit('history', { canUndo: true, canRedo: false });
    return true;
  }

  _travelHistory(source, destination, currentExtraData, type) {
    if (!source.length) return null;
    const record = source.pop();
    destination.push({ label: record.label, snapshot: this.snapshot(), extraData: currentExtraData === undefined ? undefined : clone(currentExtraData) });
    // Pausing is a safety control and is deliberately preserved across history.
    const paused = this.state.paused;
    this.restore(record.snapshot);
    this.state.paused = paused;
    const result = { label: record.label, extraData: record.extraData === undefined ? undefined : clone(record.extraData), hasExtraData: record.extraData !== undefined };
    this._emit(type, result);
    this._emit('history', { canUndo: this.canUndo, canRedo: this.canRedo });
    return result;
  }

  undo(currentExtraData) { return this._travelHistory(this.undoStack, this.redoStack, currentExtraData, 'undo'); }
  redo(currentExtraData) { return this._travelHistory(this.redoStack, this.undoStack, currentExtraData, 'redo'); }

  reset() {
    this.state = initialState();
    prepareInitialScopeState(this.state,this.viewAspect);
    this.undoStack.length = this.redoStack.length = 0;
    this._previousKeys.clear();
    this._gesture = false;
    this._controlAges.clear();
    this._emit('reset');
    this._emit('history', { canUndo: false, canRedo: false });
    return this.state;
  }

  setSelected(id) { return this.select(id); }
  select(id) {
    if (!SELECTIONS.includes(id)) throw new RangeError(`Unknown selection: ${id}`);
    if (this.state.selected === id) return false;
    this.state.selected = id;
    if (id !== 'scope') this.state.activeTool = id;
    this._gesture = false;
    this._controlAges.clear();
    clearCollisionBlock(this.state);
    this._emit('selection', { selected: id });
    return true;
  }

  setPaused(value) {
    this.state.paused = Boolean(value);
    this._gesture = false;
    this._controlAges.clear();
    clearCollisionBlock(this.state);
    this._emit('pause', { paused: this.state.paused });
  }

  setCutting(value) {
    this.state.cutting = Boolean(value);
    this._emit('cutting', { cutting: this.state.cutting });
  }

  setScopeFollow(value, mode = this.state.scope.followMode) {
    if (!followModes.includes(mode)) throw new RangeError('Scope follow mode must be active, midpoint or grasp.');
    this.state.scope.follow = Boolean(value);
    this.state.scope.followMode = mode;
    this.state.scope.startupOverview=false;
    this._emit('scope-follow', { follow: this.state.scope.follow, mode });
  }

  /** Apply the initial two-tip framing immediately after reset/viewport setup,
   * before displaying a frame. Explicitly chosen follow modes are preserved. */
  prepareInitialScopeView(aspect=this.viewAspect){
    if(!finite(aspect)||aspect<=0)throw new TypeError('Initial scope view needs a positive aspect.');
    this.viewAspect=aspect;if(!this.state.scope.startupOverview)return false;
    prepareInitialScopeState(this.state,aspect);this._preparedInitialScope=this.state.scope;this._preparedInitialAspect=aspect;return true;
  }

  /** Mouse view rotation changes the real RCM scope direction, not a detached
   * virtual camera. The host applies the same parent-surface clearance veto as
   * keyboard navigation before drawing the next frame. */
  navigateScope(deltaYaw,deltaPitch) {
    if(![deltaYaw,deltaPitch].every(finite))throw new TypeError('Scope navigation requires finite angles.');
    const s=this.state.scope;if(s.follow||this.state.paused||(!deltaYaw&&!deltaPitch))return false;
    s.yaw+=deltaYaw;s.pitch+=deltaPitch;updateScopePose(this.state);return true;
  }

  zoomScope(logScale) {
    if(!finite(logScale))throw new TypeError('Scope optical zoom requires a finite scale.');
    if(this.state.paused)return false;
    const s=this.state.scope,next=clamp(s.fov*Math.exp(clamp(logScale,-4,4)),SCOPE_FRAMING.minimumFov,SCOPE_FRAMING.maximumFov);
    if(next===s.fov)return false;s.fov=next;if(s.startupOverview)s.startupFovUserSet=true;return true;
  }

  homeScopeView() {
    if(this.state.paused)return false;
    if(this.state.scope.startupOverview){this.state.scope.startupFovUserSet=false;return this.prepareInitialScopeView();}
    const s=this.state.scope,direction=normalize(sub(this._scopeIntentTarget(),s.port),s.direction);
    s.fov=SCOPE_FRAMING.defaultFov;s.roll=0;s.up=perpendicularUp(direction,[0,1,0]);
    s.yaw+=wrapAngle(Math.atan2(direction[0],-direction[2])-s.yaw);
    s.pitch=Math.atan2(-direction[1],Math.hypot(direction[0],direction[2]));
    updateScopePose(this.state,direction);return true;
  }

  setScopeContext({graspTarget = null, operating = false,surfaceTarget,organBounds,heldSpecimen,viewAspect} = {}) {
    if (graspTarget !== null && !validVector(graspTarget)) throw new TypeError('Grasp target must be null or three finite world coordinates.');
    if(surfaceTarget!==undefined&&surfaceTarget!==null&&!validVector(surfaceTarget))throw new TypeError('Surface target requires finite world coordinates.');
    if(organBounds!==undefined&&organBounds!==null&&!validOrganBounds(organBounds))throw new TypeError('Organ bounds require finite min/max world coordinates.');
    if(heldSpecimen!==undefined&&heldSpecimen!==null&&(!validVector(heldSpecimen.position)||!finite(heldSpecimen.radius)||heldSpecimen.radius<0))throw new TypeError('Held specimen requires a finite world position and nonnegative radius.');
    if(viewAspect!==undefined&&(!finite(viewAspect)||viewAspect<=0))throw new TypeError('Scope view aspect requires a finite positive width/height ratio.');
    if(viewAspect!==undefined){
      this.viewAspect=viewAspect;
      if(this.state.scope.startupOverview&&!this.state.paused&&(this._preparedInitialScope!==this.state.scope||this._preparedInitialAspect!==viewAspect))this.prepareInitialScopeView(viewAspect);
    }
    this.state.scope.graspTarget = graspTarget === null ? null : [...graspTarget];
    this.state.scope.operating = Boolean(operating);
    if(surfaceTarget!==undefined){
      this.state.scope.surfaceTarget=surfaceTarget===null?null:[...surfaceTarget];
      if(surfaceTarget!==null)this.state.scope.fieldAnchor=[...surfaceTarget];
    }
    if(organBounds!==undefined)this.state.scope.organBounds=organBounds===null?null:{min:[...organBounds.min],max:[...organBounds.max]};
    if(heldSpecimen!==undefined)this.state.scope.heldSpecimen=heldSpecimen===null?null:{...heldSpecimen,position:[...heldSpecimen.position]};
  }

  setScopeViewMode(mode) {
    if(!['field','specimen'].includes(mode))throw new RangeError('Scope view mode must be field or specimen.');
    if(this.state.scope.viewMode===mode)return false;
    this.state.scope.viewMode=mode;this.state.scope.depthBias=0;this.state.scope.startupOverview=false;
    this._emit('scope-view',{viewMode:mode});return true;
  }

  _scopeIntentTarget() {
    const s=this.state.scope;
    if(s.followMode==='grasp'&&s.graspTarget)return s.operating?interpolate(s.graspTarget,this.state.tools.right.position,.5):[...s.graspTarget];
    if(s.followMode==='midpoint'||s.followMode==='grasp')return interpolate(this.state.tools.left.position,this.state.tools.right.position,.5);
    return [...this.state.tools[this.state.activeTool].position];
  }

  _scopeFraming(intentTarget=this._scopeIntentTarget(),projection={}) {
    const s=this.state.scope;
    return resolveScopeFraming({...s,...projection,intentTarget,fovDegrees:s.fov,cooperativeFovDegrees:s.fov,initialTargets:TOOL_IDS.map(id=>this.state.tools[id].position),aspect:this.viewAspect,minimumDepth:LIMITS.scopeDepth[0],maximumDepth:LIMITS.scopeDepth[1]});
  }

  /** A depth command sets a persistent working-distance offset, rather than
   * fighting the automatic insertion servo on the next unpressed frame. */
  _manualScopeDepth(delta,framing=null) {
    const s=this.state.scope;
    const targetDistance=framing?.targetDistance??(s.follow?vectorDistance(s.target,s.port):.19);
    const maximum=Math.max(LIMITS.scopeDepth[0],Math.min(LIMITS.scopeDepth[1],targetDistance-LIMITS.workingDistance));
    s.depth=clamp(s.depth+delta,LIMITS.scopeDepth[0],maximum);
    if(s.follow&&framing)s.depthBias=s.depth-framing.baseDepth;
  }

  _integrateControl(channel, vector, time, rate, fine) {
    const length = Math.hypot(...vector);
    if (!length) { this._controlAges.delete(channel); return vector.map(() => 0); }
    const direction = mul(vector, 1 / length);
    const signature = direction.join(',') + ':' + fine;
    const previous = this._controlAges.get(channel);
    const age = previous?.signature === signature ? previous.age : 0;
    const amount = integratedControlDistance(age, time, rate, fine);
    this._controlAges.set(channel, {signature, age: age + time});
    return mul(direction, amount);
  }

  _tool(id = this.state.selected) {
    if (!TOOL_IDS.includes(id)) throw new RangeError('Select a left or right instrument for this action.');
    return this.state.tools[id];
  }

  _moveTool(delta, id = this.state.selected) {
    if (!validVector(delta)) throw new TypeError('Tool displacement requires three finite values.');
    const tool = this._tool(id);
    const requested = tool.position.map((v, i) => v + delta[i]);
    return this._applyTool({...tool, position: constrainToolPosition(requested, tool.port)}, id);
  }

  _applyTool(desired, id) {
    const tool = this._tool(id);
    if(desired.position.every((v,i)=>v===tool.position[i])&&desired.wrist.every((v,i)=>v===tool.wrist[i])&&desired.jaw===tool.jaw)return {changed:false,limited:false};
    const other = this._tool(id === 'left' ? 'right' : 'left');
    const {tool: next, limited,reason} = sweepInstrument(tool, desired, other);
    const changed = !equalVector(next.position, tool.position) || !equalVector(next.wrist, tool.wrist) || next.jaw !== tool.jaw;
    tool.position = [...next.position];
    const pose=instrumentPose(next);tool.shaftDirection=pose.shaftDirection;tool.alignment=pose.alignment;
    tool.wrist = [...next.wrist];
    tool.jaw = next.jaw;
    if(changed){
      this.state.activeTool=id;
      if(this.state.scope.startupOverview){this.state.scope.startupOverview=false;this.state.scope.followMode='active';this.state.scope.depthBias=0;}
    }
    this.state.collision=collisionState(this.state.tools,limited&&reason==='instrument-contact',id,reason);
    const clearance=this.state.collision.clearance;
    if (limited && this._limitCooldown <= 0) {
      this._emit('limit', { selected: id, kind: reason==='instrument-contact'?'instrument-collision':'motion-resolution', clearance });
      this._limitCooldown = .6;
    }
    return { changed, limited };
  }

  /** Programmatic/guided positioning uses the same continuous collision sweep. */
  moveToolTo(position, id = this.state.selected, {checkpoint = false, label = '定位器械'} = {}) {
    if (!validVector(position)) throw new TypeError('Tool position requires three finite values.');
    if (this.state.paused) return {changed: false, limited: false};
    if (checkpoint) this.checkpoint(label, ()=>this.getExtraData?.(),{takeOwnership:this.ownsExtraData});
    return this._moveTool(sub(position, this._tool(id).position), id);
  }

  moveTool(delta, id = this.state.selected) {
    if (this.state.paused) return {changed: false, limited: false};
    return this._moveTool(delta, id);
  }

  nudge(axis, sign, step = .002, id = this.state.selected) {
    const index = typeof axis === 'string' ? AXES[axis] : axis;
    if (![0, 1, 2].includes(index) || !finite(sign) || !finite(step) || step < 0) throw new TypeError('Nudge requires an axis, finite direction and nonnegative step.');
    if (this.state.paused) return false;
    this.checkpoint('微调位移', ()=>this.getExtraData?.(),{takeOwnership:this.ownsExtraData});
    if (id === 'scope') {
      if (index === 2) this._manualScopeDepth(-sign*step,this.state.scope.follow?this._scopeFraming():null);
      else {
        this.setScopeFollow(false);
        this.state.scope[index === 0 ? 'yaw' : 'pitch'] += sign * step * 5;
      }
      updateScopePose(this.state);
      return true;
    }
    const delta = [0, 0, 0];
    delta[index] = sign * step;
    return this._moveTool(delta, id).changed;
  }

  setJaw(id, value) {
    if (!finite(value)) throw new TypeError('Jaw opening must be finite.');
    if (this.state.paused) return false;
    const tool = this._tool(id);
    const next = clamp(value, 0, 1);
    return this._applyTool({...tool, jaw: next}, id).changed;
  }

  adjustJaw(delta, id = this.state.selected) {
    if (!finite(delta)) throw new TypeError('Jaw delta must be finite.');
    return this.setJaw(id, this._tool(id).jaw + delta);
  }

  adjustWrist(index, delta, id = this.state.selected) {
    if (![0, 1, 2].includes(index) || !finite(delta)) throw new TypeError('Wrist adjustment requires axis 0–2 and a finite delta.');
    if (this.state.paused) return false;
    if (id === 'scope') {
      const key = ['pitch', 'yaw', 'roll'][index];
      if (index < 2 && this.state.scope.follow) this.setScopeFollow(false);
      const previous = this.state.scope[key];
      this.state.scope[key] += delta;
      updateScopePose(this.state);
      return previous !== this.state.scope[key];
    }
    const tool = this._tool(id);
    const next = tool.wrist[index] + delta;
    if (!finite(next)) throw new TypeError('Wrist rotation overflow.');
    const wrist=[...tool.wrist];wrist[index]=next;
    return this._applyTool({...tool,wrist},id).changed;
  }

  homeTools() {
    if (this.state.paused) return false;
    this.checkpoint('器械回中', ()=>this.getExtraData?.(),{takeOwnership:this.ownsExtraData});
    this.state.tools = initialState().tools;
    this.state.collision=collisionState(this.state.tools);
    this._emit('home');
    return true;
  }

  /**
   * Held input uses KeyboardEvent.code strings (lowercase letter aliases work).
   * W/S = -/+Z, A/D = -/+X, Q/E = -/+Y, arrows = wrist, Z/X = roll,
   * C closes, V opens. [/] change scope depth with any selection.
   * Shift = precision. Space = clutch; pause freezes all poses.
   * One continuous held gesture creates one undo checkpoint.
   */
  update(dt, input = new Set()) {
    this._events = [];
    const keys = normalizeKeys(input);
    clearCollisionBlock(this.state);
    for (const [code, id] of [['Digit1', 'left'], ['Digit2', 'right'], ['Digit3', 'scope']]) {
      if (keys.has(code) && !this._previousKeys.has(code)) this.select(id);
    }
    this._previousKeys = keys;
    if (!finite(dt) || dt <= 0) return { changed: false, moving: false, clutched: false, limited: false, events: [...this._events] };
    const time = Math.min(dt, LIMITS.maxFrameTime);
    this._limitCooldown = Math.max(0, this._limitCooldown - time);
    const clutched = keys.has('Space');
    if (this.state.paused || clutched) {
      this._gesture = false;
      this._controlAges.clear();
      return { changed: false, moving: false, clutched, limited: false, events: [...this._events] };
    }
    const x = axisInput(keys, 'KeyD', 'KeyA');
    const y = axisInput(keys, 'KeyE', 'KeyQ');
    const z = axisInput(keys, 'KeyS', 'KeyW');
    const pitch = axisInput(keys, 'ArrowUp', 'ArrowDown');
    const yaw = axisInput(keys, 'ArrowRight', 'ArrowLeft');
    const roll = axisInput(keys, 'KeyX', 'KeyZ');
    const jaw = axisInput(keys, 'KeyV', 'KeyC');
    const scopeInsertion = axisInput(keys, 'BracketRight', 'BracketLeft');
    const moving = Boolean(x || y || z || pitch || yaw || roll || scopeInsertion || (jaw && this.state.selected !== 'scope'));
    if (moving && !this._gesture) this.checkpoint('遥操作位姿', ()=>this.getExtraData?.(),{takeOwnership:this.ownsExtraData});
    this._gesture = moving;
    const fine = keys.has('ShiftLeft') || keys.has('ShiftRight');
    let changed = false;
    let limited = false;
    const previousScopePosition = [...this.state.scope.position];
    const previousScopeDepth = this.state.scope.depth;
    const move = this._integrateControl('translation', [x, y, z], time, CONTROL_RATES.translation, fine);
    const rotation = this._integrateControl('rotation', [pitch, yaw, roll], time, CONTROL_RATES.wrist, fine);
    const scopeRotation = this._integrateControl('scope-rotation', [clamp(y + pitch, -1, 1), clamp(x + yaw, -1, 1), roll], time, CONTROL_RATES.scopeRotation, fine);
    const scopeMove = this._integrateControl('scope-navigation', [clamp(-z + scopeInsertion, -1, 1)], time, CONTROL_RATES.scopeDepth, fine)[0];
    const globalDepth = this._integrateControl('scope-depth', [scopeInsertion], time, CONTROL_RATES.scopeDepth, fine)[0];
    if (this.state.selected === 'scope') {
      const s = this.state.scope;
      if ((x || y || pitch || yaw) && s.follow) this.setScopeFollow(false);
      const before = [s.depth, s.yaw, s.pitch, s.roll];
      s.pitch += scopeRotation[0];
      s.yaw += scopeRotation[1];
      s.roll += scopeRotation[2];
      changed = !equalVector(before.slice(0, 3), [s.depth, s.yaw, s.pitch]) || before[3] !== s.roll;
    } else {
      const tool = this._tool();
      const result = this._applyTool({...tool,
        position: add(tool.position, move),
        wrist: add(tool.wrist, rotation),
        jaw: clamp(tool.jaw + jaw * CONTROL_RATES.jaw * time * (fine ? .35 : 1), 0, 1),
      }, this.state.selected);
      limited = result.limited;
      changed = result.changed;
    }
    const scope = this.state.scope;
    const manualDepth=this.state.selected==='scope'?scopeMove:globalDepth;
    if (scope.follow) {
      const intentTarget=this._scopeIntentTarget();
      let framing=this._scopeFraming(intentTarget);
      const target=framing?.target??intentTarget;
      scope.intentTarget=[...intentTarget];
      scope.target = target;
      const oldPosition = [...scope.position];
      const oldAim = [...scope.lookAt];
      const direction = smoothDirection(scope.direction, normalize(sub(target, scope.port), scope.direction), time, scope.up);
      const projection={direction,cameraUp:scopeUpForDirection(scope,direction).cameraUp};
      framing=this._scopeFraming(intentTarget,projection);
      if(manualDepth){
        this._manualScopeDepth(manualDepth,framing);
        framing=this._scopeFraming(intentTarget,projection);
      }else if(framing){
        const nextDepth=advanceScopeDepth(scope.depth,framing.depthTarget,time);
        // Retraction is always permitted. Do not advance toward a new field
        // while the lens is still turning away from the previous field.
        if(nextDepth<=scope.depth||dot(direction,normalize(sub(target,scope.port),direction))>Math.cos(.35))scope.depth=nextDepth;
      }
      scope.framingSource=framing?.source??null;
      scope.framingLimited=framing?.framingLimited??false;
      scope.targetWorkingDistance=framing?.workingDistance??vectorDistance(scope.position,scope.target);
      scope.autoDepthTarget=framing?.depthTarget??null;
      scope.yaw += wrapAngle(Math.atan2(direction[0], -direction[2]) - scope.yaw);
      scope.pitch = Math.atan2(-direction[1], Math.hypot(direction[0], direction[2]));
      updateScopePose(this.state, direction);
      changed = !equalVector(oldPosition, scope.position) || !equalVector(oldAim, scope.lookAt) || changed;
    }else{
      if(manualDepth)this._manualScopeDepth(manualDepth);
      scope.framingSource=null;scope.framingLimited=false;scope.autoDepthTarget=null;
      updateScopePose(this.state);
    }
    changed = !equalVector(previousScopePosition, scope.position) || previousScopeDepth !== scope.depth || changed;
    this.state.elapsed += time;
    return { changed, moving, clutched, limited, events: [...this._events] };
  }
}

export default Simulation;
