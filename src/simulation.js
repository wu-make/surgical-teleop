/**
 * Deterministic kinematic controls for the browser demonstration.
 * Units: metres, radians, seconds. This is a bounded virtual workbench, not a
 * tissue/contact solver or a controller for physical surgical equipment.
 *
 * The abdominal ports are fixed remote centres of motion (RCM). A tool shaft
 * always joins its port and tip; wrist angles describe distal articulation only.
 */

export const LIMITS = Object.freeze({
  workspace: Object.freeze({ min: Object.freeze([-.165, .985, -.145]), max: Object.freeze([.165, 1.165, .145]) }),
  insertion: Object.freeze([.065, .29]),
  shaftCone: 63 * Math.PI / 180,
  wrist: Object.freeze([70 * Math.PI / 180, 80 * Math.PI / 180, Math.PI]),
  scopeDepth: Object.freeze([.018, .135]),
  // All reachable instrument tips lie below the scope port. Allow its complete
  // downward hemisphere so automatic centring never stops at an arbitrary cone.
  scopePitch: Object.freeze([.01, Math.PI / 2]),
  scopeYaw: Math.PI,
  maxFrameTime: .05,
  history: 40,
});

export const CONTROL_RATES = Object.freeze({
  translation: .035,
  wrist: .8,
  jaw: 1.1,
  scopeDepth: .026,
  scopeRotation: .55,
  fineFactor: .18,
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
      roll: 0, follow: true, followMode: 'active',
    },
  };
  updateScopePose(state);
  return state;
}

function scopeDirection(scope) {
  return [Math.sin(scope.yaw) * Math.cos(scope.pitch), -Math.sin(scope.pitch), -Math.cos(scope.yaw) * Math.cos(scope.pitch)];
}

function updateScopePose(state) {
  const s = state.scope;
  s.port = [...SCOPE_PORT];
  s.yaw = clamp(s.yaw, -LIMITS.scopeYaw, LIMITS.scopeYaw);
  s.pitch = clamp(s.pitch, ...LIMITS.scopePitch);
  s.roll = clamp(s.roll, -Math.PI, Math.PI);
  const distance = s.follow ? vectorDistance(s.target, s.port) : .19;
  const maxDepth = Math.max(LIMITS.scopeDepth[0], Math.min(LIMITS.scopeDepth[1], distance - .028));
  s.depth = clamp(s.depth, LIMITS.scopeDepth[0], maxDepth);
  const direction = scopeDirection(s);
  s.position = s.port.map((v, i) => v + direction[i] * s.depth);
  s.lookAt = s.port.map((v, i) => v + direction[i] * Math.max(distance, s.depth + .028));
  if (!s.follow) s.target = [...s.lookAt];
}

/** Clamp a desired tip position while preserving the fixed abdominal port. */
export function constrainToolPosition(position, port) {
  if (!validVector(position) || !validVector(port)) throw new TypeError('Tool position and port require three finite numbers.');
  const p = position.map((v, i) => clamp(v, LIMITS.workspace.min[i], LIMITS.workspace.max[i]));
  let d = p.map((v, i) => v - port[i]);
  d[1] = Math.min(-.015, d[1]);
  const radius = Math.hypot(d[0], d[2]);
  const maxRadius = -d[1] * Math.tan(LIMITS.shaftCone);
  if (radius > maxRadius) {
    const factor = maxRadius / radius;
    d[0] *= factor;
    d[2] *= factor;
  }
  let length = Math.hypot(...d);
  if (length < LIMITS.insertion[0]) {
    // Deepen along Y instead of extending sideways beyond the rectangular field.
    d[1] = -Math.sqrt(Math.max(0, LIMITS.insertion[0] ** 2 - d[0] ** 2 - d[2] ** 2));
    length = Math.hypot(...d);
  }
  if (length > LIMITS.insertion[1]) d = d.map(v => v * LIMITS.insertion[1] / length);
  return port.map((v, i) => v + d[i]);
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
      tool.position = constrainToolPosition(tool.position, tool.port);
      tool.wrist = tool.wrist.map((v, i) => clamp(v, -LIMITS.wrist[i], LIMITS.wrist[i]));
      tool.jaw = clamp(tool.jaw, 0, 1);
    }
    const s = state.scope;
    if (!s || !validVector(s.target) || !['depth', 'yaw', 'pitch', 'roll'].every(k => finite(s[k])) || !['active', 'midpoint'].includes(s.followMode)) {
      throw new TypeError('Invalid scope snapshot.');
    }
    state.paused = Boolean(state.paused);
    state.cutting = Boolean(state.cutting);
    s.follow = Boolean(s.follow);
    state.elapsed = Math.max(0, state.elapsed);
    updateScopePose(state);
    this.state = state;
    this._gesture = false;
    this._previousKeys.clear();
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
    this._emit('selection', { selected: id });
    return true;
  }

  setPaused(value) {
    this.state.paused = Boolean(value);
    this._gesture = false;
    this._emit('pause', { paused: this.state.paused });
  }

  setCutting(value) {
    this.state.cutting = Boolean(value);
    this._emit('cutting', { cutting: this.state.cutting });
  }

  setScopeFollow(value, mode = this.state.scope.followMode) {
    if (!['active', 'midpoint'].includes(mode)) throw new RangeError('Scope follow mode must be active or midpoint.');
    this.state.scope.follow = Boolean(value);
    this.state.scope.followMode = mode;
    this._emit('scope-follow', { follow: this.state.scope.follow, mode });
  }

  _tool(id = this.state.selected) {
    if (!TOOL_IDS.includes(id)) throw new RangeError('Select a left or right instrument for this action.');
    return this.state.tools[id];
  }

  _moveTool(delta, id = this.state.selected) {
    const tool = this._tool(id);
    const requested = tool.position.map((v, i) => v + delta[i]);
    const next = constrainToolPosition(requested, tool.port);
    const limited = !equalVector(next, requested, 1e-8);
    const changed = !equalVector(next, tool.position);
    tool.position = next;
    if (limited && this._limitCooldown <= 0) {
      this._emit('limit', { selected: id, kind: 'workspace' });
      this._limitCooldown = .6;
    }
    return { changed, limited };
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
    const changed = next !== tool.jaw;
    tool.jaw = next;
    return changed;
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
    const next = clamp(tool.wrist[index] + delta, -LIMITS.wrist[index], LIMITS.wrist[index]);
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
    const scale = time * ((keys.has('ShiftLeft') || keys.has('ShiftRight')) ? CONTROL_RATES.fineFactor : 1);
    let changed = false;
    let limited = false;
    const previousScopePosition = [...this.state.scope.position];
    const previousScopeDepth = this.state.scope.depth;
    if (this.state.selected === 'scope') {
      const s = this.state.scope;
      if ((x || y || pitch || yaw) && s.follow) this.setScopeFollow(false);
      const before = [s.depth, s.yaw, s.pitch, s.roll];
      s.depth += clamp(-z + scopeInsertion, -1, 1) * CONTROL_RATES.scopeDepth * scale;
      s.yaw += (x + yaw) * CONTROL_RATES.scopeRotation * scale;
      s.pitch += (y + pitch) * CONTROL_RATES.scopeRotation * scale;
      s.roll += roll * CONTROL_RATES.wrist * scale;
      updateScopePose(this.state);
      changed = !equalVector(before.slice(0, 3), [s.depth, s.yaw, s.pitch]) || before[3] !== s.roll;
    } else if (moving) {
      const move = [x, y, z];
      // A diagonal key combination has the same translational speed as one key.
      const length = Math.hypot(...move) || 1;
      const result = this._moveTool(move.map(v => v / length * CONTROL_RATES.translation * scale));
      limited = result.limited;
      changed = result.changed;
      for (const [index, amount] of [pitch, yaw, roll].entries()) {
        if (amount) changed = this.adjustWrist(index, amount * CONTROL_RATES.wrist * scale) || changed;
      }
      if (jaw) changed = this.adjustJaw(jaw * CONTROL_RATES.jaw * scale) || changed;
    }
    const scope = this.state.scope;
    if (this.state.selected !== 'scope' && scopeInsertion) {
      scope.depth += scopeInsertion * CONTROL_RATES.scopeDepth * scale;
      updateScopePose(this.state);
    }
    if (scope.follow) {
      const target = scope.followMode === 'midpoint'
        ? this.state.tools.left.position.map((v, i) => (v + this.state.tools.right.position[i]) * .5)
        : [...this.state.tools[this.state.activeTool].position];
      scope.target = target;
      const d = target.map((v, i) => v - scope.port[i]);
      const targetYaw = clamp(Math.atan2(d[0], -d[2]), -LIMITS.scopeYaw, LIMITS.scopeYaw);
      const targetPitch = clamp(Math.atan2(-d[1], Math.hypot(d[0], d[2])), ...LIMITS.scopePitch);
      const alpha = 1 - Math.exp(-time * 9);
      const oldPosition = [...scope.position];
      const oldAim = [...scope.lookAt];
      scope.yaw = wrapAngle(scope.yaw + wrapAngle(targetYaw - scope.yaw) * alpha);
      scope.pitch += (targetPitch - scope.pitch) * alpha;
      updateScopePose(this.state);
      changed = !equalVector(oldPosition, scope.position) || !equalVector(oldAim, scope.lookAt) || changed;
    }
    changed = !equalVector(previousScopePosition, scope.position) || previousScopeDepth !== scope.depth || changed;
    this.state.elapsed += time;
    return { changed, moving, clutched, limited, events: [...this._events] };
  }
}

export default Simulation;
