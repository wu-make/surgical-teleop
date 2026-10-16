/**
 * Deterministic kinematic controls for the browser demonstration.
 * Units: metres, radians, seconds. This is a virtual workbench, not a
 * tissue/contact solver or a controller for physical surgical equipment.
 *
 * The abdominal ports are fixed remote centres of motion (RCM). A tool shaft
 * always joins its port and tip; wrist angles describe distal articulation only.
 */

export const LIMITS = Object.freeze({
  scopeDepth: Object.freeze([.018, .135]),
  workingDistance: .028,
  shaftRadius: .003,
  tipRadius: .005,
  jawRadius: .004,
  collisionTolerance: 1e-7,
  contactMargin: .00002,
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

/** Closest distance of two finite segments, including zero-length segments. */
export function segmentDistance(p1, q1, p2, q2) {
  const d1 = sub(q1, p1), d2 = sub(q2, p2), r = sub(p1, p2);
  const a = dot(d1, d1), e = dot(d2, d2), f = dot(d2, r);
  let s = 0, t = 0;
  if (a <= 1e-20 && e <= 1e-20) return vectorDistance(p1, p2);
  if (a <= 1e-20) t = clamp(f / e, 0, 1);
  else {
    const c = dot(d1, r);
    if (e <= 1e-20) s = clamp(-c / a, 0, 1);
    else {
      const b = dot(d1, d2), denominator = a * e - b * b;
      if (denominator > 1e-20) s = clamp((b * f - c * e) / denominator, 0, 1);
      t = (b * s + f) / e;
      if (t < 0) { t = 0; s = clamp(-c / a, 0, 1); }
      else if (t > 1) { t = 1; s = clamp((b - c) / a, 0, 1); }
    }
  }
  return vectorDistance(add(p1, mul(d1, s)), add(p2, mul(d2, t)));
}

/**
 * Full internal/external shaft capsule and distal/jaw envelope. The straight
 * capsule spans the source CAD's neutral adaptor-to-TCP length (435.5/440.8 mm),
 * including the 416.2 mm rigid rod. Bent wrists and handles are approximated;
 * this is not triangle-level CAD contact. The distal envelope is
 * rotation invariant: wrist/roll can rotate continuously at contact, without a
 * changing bounding sphere artificially locking rotation. These are geometric
 * clearance proxies, not CAD mesh contact or an anatomy collision model.
 */
export function toolCollisionShapes(tool) {
  const direction = toolDirection(tool);
  const length = toolLength(tool);
  return [
    {a: sub(tool.position, mul(direction, length)), b: tool.position, radius: LIMITS.shaftRadius},
    {a: tool.position, b: tool.position, radius: LIMITS.tipRadius + LIMITS.jawRadius * tool.jaw},
  ];
}

const toolLength = tool => tool.shaftLength ?? LIMITS.shaftLengths[tool.port[0] < 0 ? 'left' : 'right'];
function toolDirection(tool) {
  return normalize(sub(tool.position, tool.port), validVector(tool.shaftDirection) ? tool.shaftDirection : [0,0,-1]);
}

function clearancePairs(a, b) {
  const result = [];
  for (const one of toolCollisionShapes(a)) for (const two of toolCollisionShapes(b)) {
    result.push(segmentDistance(one.a, one.b, two.a, two.b) - one.radius - two.radius);
  }
  return result;
}

export function instrumentClearance(a, b) { return Math.min(...clearancePairs(a, b)); }

function toolTrajectory(start, end) {
  const a=toolDirection(start),b=toolDirection(end),angle=Math.atan2(Math.hypot(...cross(a,b)),clamp(dot(a,b),-1,1));
  const radiusA=vectorDistance(start.position,start.port),radiusB=vectorDistance(end.position,start.port);
  const distance=vectorDistance(start.position,end.position),length=toolLength(start);
  if(!finite(distance))throw new TypeError('Tool trajectory exceeds finite numeric precision.');
  const jawBound=LIMITS.jawRadius*Math.abs(end.jaw-start.jaw);
  // Exactly crossing the port makes the radial direction undefined. Traverse a
  // continuous polar path in this submicron singular region, keeping TCP end
  // commands exact; no position or insertion is rejected. This avoids an
  // instantaneous 180-degree teleport of the external shaft.
  const polar=segmentDistance(start.port,start.port,start.position,end.position)<1e-7&&angle>1e-12;
  const axis=normalize(cross(a,b),perpendicularUp(a));
  const pose=fraction=>{
    let position,direction;
    if(fraction<=0){position=[...start.position];direction=[...a];}
    else if(fraction>=1){position=[...end.position];direction=[...b];}
    else if(polar){
      direction=normalize(rotateAround(a,axis,angle*fraction));
      position=add(start.port,mul(direction,radiusA+(radiusB-radiusA)*fraction));
    }else{position=interpolate(start.position,end.position,fraction);direction=normalize(sub(position,start.port),a);}
    return {...start,position,shaftDirection:direction,wrist:interpolate(start.wrist,end.wrist,fraction),jaw:start.jaw+(end.jaw-start.jaw)*fraction};
  };
  const bound=(from,to)=>{
    const span=to-from;
    if(span<=0)return 0;
    if(polar){
      const maxLever=Math.max(radiusA,radiusB,Math.abs(radiusA-length),Math.abs(radiusB-length));
      return span*(Math.abs(radiusB-radiusA)+maxLever*angle+jawBound)+1e-12;
    }
    const one=pose(from).shaftDirection,two=pose(to).shaftDirection;
    // Along a Cartesian segment that does not cross the port, the radial axis
    // travels monotonically along one great-circle arc. For any interval the
    // full rod's Hausdorff travel is <= TCP distance + L * swept axis angle.
    // This bounds the nonlinear handle, rather than incorrectly treating it as
    // a linearly moving endpoint. Radius interpolation adds the final term.
    const sweptAngle=Math.atan2(Math.hypot(...cross(one,two)),clamp(dot(one,two),-1,1));
    return distance*span+length*sweptAngle+jawBound*span+1e-12;
  };
  return {pose,bound};
}

/**
 * Continuous advancement using a proven interval motion bound for both ends of
 * the complete shaft. Signed capsule clearance is 1-Lipschitz under this bound.
 * Each accepted interval therefore stays nonpenetrating, even when a long move
 * ends clear on the far side of the other instrument.
 */
function sweepTool(start, desired, other) {
  const trajectory=toolTrajectory(start,desired),fullBound=trajectory.bound(0,1);
  if (fullBound < 2e-12) return {tool: trajectory.pose(1), limited: false};
  const tolerance = LIMITS.collisionTolerance;
  const originalGaps = clearancePairs(start, other);
  const recovering=Math.min(...originalGaps)<0;
  let clearanceAt=pose=>instrumentClearance(pose,other);
  if(recovering){
    // Legacy overlaps may recover without snapping. Each pair must stay at least
    // as separated as it originally was (within 0.1 micrometre numeric tolerance).
    // A maximally overlapping pair is already at its analytic distance floor and
    // cannot worsen, so it must not trap the operator on a zero-gradient plateau.
    const first=toolCollisionShapes(start),last=toolCollisionShapes(desired),fixed=toolCollisionShapes(other),constraints=[];
    let index=0;
    for(let i=0;i<first.length;i++)for(const shape of fixed){
      const allowed=Math.min(0,originalGaps[index]);
      const floor=-Math.max(first[i].radius,last[i].radius)-shape.radius;
      if(floor<allowed-tolerance)constraints.push({index,allowed});
      index++;
    }
    if(!constraints.length)return {tool:trajectory.pose(1),limited:false};
    clearanceAt=pose=>{const gaps=clearancePairs(pose,other);return Math.min(...constraints.map(({index,allowed})=>gaps[index]-allowed+tolerance));};
  }
  let fraction = 0;
  for (let iteration = 0; iteration < 768; iteration++) {
    const pose = trajectory.pose(fraction);
    const gap = clearanceAt(pose);
    const remaining = 1 - fraction;
    const endBound=trajectory.bound(fraction,1);
    if (gap >= endBound + 1e-12) return {tool: trajectory.pose(1), limited: false};
    if(gap<LIMITS.contactMargin){
      const probe=Math.min(remaining,Math.max(1e-8,remaining*Math.min(.01,LIMITS.contactMargin/Math.max(endBound,1e-12))));
      if(clearanceAt(trajectory.pose(fraction+probe))<gap-1e-11)return {tool:pose,limited:true};
    }
    // Find an interval whose complete nonlinear sweep fits inside current free
    // clearance. A small contact margin gives tangential departures room to
    // progress without allowing penetration or clamping a workspace coordinate.
    let low=fraction,high=1;
    for(let search=0;search<36;search++){
      const middle=(low+high)*.5;
      if(trajectory.bound(fraction,middle)<=Math.max(0,gap)*.8)low=middle;else high=middle;
    }
    if(low-fraction<1e-12)return {tool:pose,limited:true};
    fraction=low;
    if (fraction >= 1 - 1e-12) return {tool: trajectory.pose(1), limited: false};
  }
  return {tool: trajectory.pose(fraction), limited: true};
}

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
  const amount = Math.min(angle * (1 - Math.exp(-CONTROL_RATES.followSmoothing * time)), CONTROL_RATES.followMaxRadiansPerSecond * time);
  const axis = normalize(cross(from, to), perpendicularUp(from, up));
  return normalize(rotateAround(from, axis, amount));
}

const INITIAL_TOOLS = Object.freeze({
  left: { port: [-.08, 1.18, .10], position: [-.025, 1.105, 0], wrist: [0, 0, 0], jaw: .6 },
  right: { port: [.08, 1.18, .10], position: [.025, 1.108, 0], wrist: [0, 0, 0], jaw: .6 },
});
const SCOPE_PORT = Object.freeze([0, 1.18, .14]);

function initialState() {
  const target = [...INITIAL_TOOLS.left.position];
  const dx = target[0] - SCOPE_PORT[0];
  const dy = target[1] - SCOPE_PORT[1];
  const dz = target[2] - SCOPE_PORT[2];
  const state = {
    selected: 'left', activeTool: 'left', paused: false, cutting: false,
    elapsed: 0,
    tools: clone(INITIAL_TOOLS),
    scope: {
      port: [...SCOPE_PORT], position: [0, 0, 0], target, lookAt: [...target],
      depth: .05, yaw: Math.atan2(dx, -dz), pitch: Math.atan2(-dy, Math.hypot(dx, dz)),
      roll: 0, follow: true, followMode: 'active', graspTarget: null, operating: false,
      direction: normalize([dx, dy, dz]), up: [0, 1, 0], cameraUp: [0, 1, 0],
    },
  };
  for(const id of TOOL_IDS){
    state.tools[id].shaftLength=LIMITS.shaftLengths[id];
    state.tools[id].shaftDirection=toolDirection(state.tools[id]);
  }
  state.collision = {active: false, clearance: instrumentClearance(state.tools.left, state.tools.right), selected: null};
  updateScopePose(state);
  return state;
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
  const previous = validVector(s.direction) ? normalize(s.direction) : direction;
  const previousUp = perpendicularUp(previous, s.up);
  const axis = cross(previous, direction);
  const angle = Math.acos(clamp(dot(previous, direction), -1, 1));
  s.up = angle > 1e-10 ? perpendicularUp(direction, rotateAround(previousUp, normalize(axis, previousUp), angle)) : perpendicularUp(direction, previousUp);
  s.direction = direction;
  s.cameraUp = normalize(rotateAround(s.up, direction, s.roll));
  s.position = s.port.map((v, i) => v + direction[i] * s.depth);
  s.lookAt = s.port.map((v, i) => v + direction[i] * Math.max(distance, s.depth + LIMITS.workingDistance));
  if (!s.follow) s.target = [...s.lookAt];
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
  constructor({ onEvent, getExtraData } = {}) {
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
    this.getExtraData = typeof getExtraData === 'function' ? getExtraData : undefined;
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
      tool.shaftDirection ??= toolDirection(tool);
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
    state.elapsed = Math.max(0, state.elapsed);
    state.collision ??= {active: instrumentClearance(state.tools.left, state.tools.right) < 0, clearance: instrumentClearance(state.tools.left, state.tools.right), selected: null};
    updateScopePose(state);
    this.state = state;
    this._gesture = false;
    this._previousKeys.clear();
    this._controlAges.clear();
    this._emit('restore');
    return this.state;
  }

  /**
   * Save BEFORE an atomic action. extraData may contain a typed tissue mask.
   * Pass the current extraData to undo/redo so the other direction can restore it.
   */
  checkpoint(label = '操作', extraData) {
    this.undoStack.push({ label: String(label), snapshot: this.snapshot(), extraData: extraData === undefined ? undefined : clone(extraData) });
    if (this.undoStack.length > LIMITS.history) this.undoStack.shift();
    this.redoStack.length = 0;
    this._emit('history', { canUndo: true, canRedo: false });
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
    this._emit('selection', { selected: id });
    return true;
  }

  setPaused(value) {
    this.state.paused = Boolean(value);
    this._gesture = false;
    this._controlAges.clear();
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
    this._emit('scope-follow', { follow: this.state.scope.follow, mode });
  }

  setScopeContext({graspTarget = null, operating = false} = {}) {
    if (graspTarget !== null && !validVector(graspTarget)) throw new TypeError('Grasp target must be null or three finite world coordinates.');
    this.state.scope.graspTarget = graspTarget === null ? null : [...graspTarget];
    this.state.scope.operating = Boolean(operating);
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
    const other = this._tool(id === 'left' ? 'right' : 'left');
    const {tool: next, limited} = sweepTool(tool, desired, other);
    const changed = !equalVector(next.position, tool.position) || !equalVector(desired.wrist, tool.wrist) || next.jaw !== tool.jaw;
    tool.position = [...next.position];
    tool.shaftDirection = [...next.shaftDirection];
    // Rotation is not clipped by rotationally invariant clearance envelopes.
    tool.wrist = [...desired.wrist];
    tool.jaw = next.jaw;
    const clearance = instrumentClearance(tool, other);
    this.state.collision = {active: limited || clearance < -LIMITS.collisionTolerance, clearance, selected: id};
    if (limited && this._limitCooldown <= 0) {
      this._emit('limit', { selected: id, kind: 'instrument-collision', clearance });
      this._limitCooldown = .6;
    }
    return { changed, limited };
  }

  /** Programmatic/guided positioning uses the same continuous collision sweep. */
  moveToolTo(position, id = this.state.selected, {checkpoint = false, label = '定位器械'} = {}) {
    if (!validVector(position)) throw new TypeError('Tool position requires three finite values.');
    if (this.state.paused) return {changed: false, limited: false};
    if (checkpoint) this.checkpoint(label, this.getExtraData?.());
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
    this.checkpoint('微调位移', this.getExtraData?.());
    if (id === 'scope') {
      if (index === 2) this.state.scope.depth += -sign * step;
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
    const changed = next !== tool.wrist[index];
    tool.wrist[index] = next;
    return changed;
  }

  homeTools() {
    if (this.state.paused) return false;
    this.checkpoint('器械回中', this.getExtraData?.());
    this.state.tools = clone(INITIAL_TOOLS);
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
    if (moving && !this._gesture) this.checkpoint('遥操作位姿', this.getExtraData?.());
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
      s.depth += scopeMove;
      s.pitch += scopeRotation[0];
      s.yaw += scopeRotation[1];
      s.roll += scopeRotation[2];
      updateScopePose(this.state);
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
    if (this.state.selected !== 'scope' && scopeInsertion) {
      scope.depth += globalDepth;
      updateScopePose(this.state);
    }
    if (scope.follow) {
      let target;
      if (scope.followMode === 'grasp' && scope.graspTarget) {
        target = scope.operating ? interpolate(scope.graspTarget, this.state.tools.right.position, .5) : [...scope.graspTarget];
      } else if (scope.followMode === 'midpoint' || scope.followMode === 'grasp') {
        target = interpolate(this.state.tools.left.position, this.state.tools.right.position, .5);
      } else target = [...this.state.tools[this.state.activeTool].position];
      scope.target = target;
      const oldPosition = [...scope.position];
      const oldAim = [...scope.lookAt];
      const direction = smoothDirection(scope.direction, normalize(sub(target, scope.port), scope.direction), time, scope.up);
      scope.yaw += wrapAngle(Math.atan2(direction[0], -direction[2]) - scope.yaw);
      scope.pitch = Math.atan2(-direction[1], Math.hypot(direction[0], direction[2]));
      updateScopePose(this.state, direction);
      changed = !equalVector(oldPosition, scope.position) || !equalVector(oldAim, scope.lookAt) || changed;
    }
    changed = !equalVector(previousScopePosition, scope.position) || previousScopeDepth !== scope.depth || changed;
    this.state.elapsed += time;
    return { changed, moving, clutched, limited, events: [...this._events] };
  }
}

export default Simulation;
