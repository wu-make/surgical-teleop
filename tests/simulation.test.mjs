import test from 'node:test';
import assert from 'node:assert/strict';
import { Simulation, LIMITS, CONTROL_RATES, constrainToolPosition } from '../src/simulation.js';

const near = (a, b, e = 1e-9) => assert.ok(Math.abs(a - b) <= e, `${a} ≠ ${b}`);
const nearVector = (a, b, e = 1e-9) => a.forEach((v, i) => near(v, b[i], e));
const hold = (sim, codes, seconds = 1, dt = .01) => {
  for (let i = 0; i < Math.round(seconds / dt); i++) sim.update(dt, new Set(codes));
};
const sub = (a, b) => a.map((v, i) => v - b[i]);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];

test('translation is time based, diagonal-normalized and precision-scaled', () => {
  const a = new Simulation();
  const b = new Simulation();
  const initial = [...a.state.tools.left.position];
  // Keep the velocity comparison inside the RCM cone; boundary projection is
  // independently verified below and should not be mistaken for free motion.
  hold(a, ['KeyD', 'KeyW'], .5, .01);
  hold(b, ['KeyD', 'KeyW'], .5, .02);
  nearVector(a.state.tools.left.position, b.state.tools.left.position);
  near(Math.hypot(...sub(a.state.tools.left.position, initial)), CONTROL_RATES.translation * .5);
  const fine = new Simulation();
  hold(fine, ['KeyD', 'ShiftRight']);
  near(fine.state.tools.left.position[0] - initial[0], CONTROL_RATES.translation * CONTROL_RATES.fineFactor);
});

test('release stops tools, clutch freezes every pose, pause freezes time', () => {
  const s = new Simulation();
  hold(s, ['KeyD', 'ArrowUp', 'KeyC'], .2);
  const tools = structuredClone(s.state.tools);
  s.update(.02, new Set());
  assert.deepEqual(s.state.tools, tools);
  const snapshot = s.snapshot();
  hold(s, ['Space', 'KeyD', 'KeyW']);
  assert.deepEqual(s.snapshot(), snapshot);
  s.setPaused(true);
  const paused = s.snapshot();
  hold(s, ['KeyD', 'KeyC']);
  assert.deepEqual(s.snapshot(), paused);
  assert.equal(s.adjustJaw(.1), false);
  assert.equal(s.nudge('x', 1), false);
});

test('left and right selection controls instruments independently', () => {
  const s = new Simulation();
  const left = structuredClone(s.state.tools.left);
  hold(s, ['Digit2', 'KeyD']);
  assert.equal(s.state.selected, 'right');
  assert.equal(s.state.activeTool, 'right');
  assert.deepEqual(s.state.tools.left, left);
  assert.ok(s.state.tools.right.position[0] > .025);
  s.update(.01, new Set(['Digit3']));
  assert.equal(s.state.selected, 'scope');
  assert.equal(s.state.activeTool, 'right');
  assert.throws(() => s.select('robot'), RangeError);
});

test('hard workspace, insertion and cone limits withstand extreme targets', () => {
  const s = new Simulation();
  for (const tool of Object.values(s.state.tools)) {
    for (const x of [-100, -.1, .1, 100]) for (const y of [-100, 1.18, 100]) for (const z of [-100, .14, 100]) {
      const result = constrainToolPosition([x, y, z], tool.port);
      result.forEach((v, i) => {
        assert.ok(v >= LIMITS.workspace.min[i] - 1e-9 && v <= LIMITS.workspace.max[i] + 1e-9);
      });
      const shaft = sub(result, tool.port);
      const length = Math.hypot(...shaft);
      assert.ok(length >= LIMITS.insertion[0] - 1e-9 && length <= LIMITS.insertion[1] + 1e-9);
      assert.ok(Math.acos(-shaft[1] / length) <= LIMITS.shaftCone + 1e-9);
    }
  }
  hold(s, ['KeyD', 'KeyE', 'KeyS', 'ArrowRight', 'ArrowUp', 'KeyX', 'KeyV'], 100);
  const t = s.state.tools.left;
  t.wrist.forEach((v, i) => assert.ok(Math.abs(v) <= LIMITS.wrist[i]));
  assert.equal(t.jaw, 1);
  assert.ok(s.undoStack.length <= LIMITS.history);
});

test('scope follows selected tip, preserves RCM, changes depth and accepts manual control', () => {
  const s = new Simulation();
  s.select('right');
  hold(s, ['KeyD', 'KeyQ'], .6);
  hold(s, [], 2);
  nearVector(s.state.scope.target, s.state.tools.right.position);
  const scope = s.state.scope;
  const shaft = sub(scope.position, scope.port);
  const sight = sub(scope.lookAt, scope.port);
  near(Math.hypot(...cross(shaft, sight)), 0, 1e-12);
  near(Math.hypot(...shaft), scope.depth);
  near(Math.hypot(...cross(sight, sub(scope.target, scope.port))), 0, 1e-6);
  s.select('scope');
  const depth = scope.depth;
  hold(s, ['KeyW'], .5);
  assert.ok(scope.depth > depth);
  assert.equal(scope.follow, true);
  const port = [...scope.port];
  hold(s, ['KeyD'], .5);
  assert.equal(scope.follow, false);
  nearVector(scope.port, port);
  const yaw = scope.yaw;
  s.update(.01, new Set());
  near(scope.yaw, yaw);
  s.setScopeFollow(true, 'midpoint');
  s.update(.01, new Set());
  nearVector(scope.target, s.state.tools.left.position.map((v, i) => (v + s.state.tools.right.position[i]) / 2));
});

test('automatic scope centres every reachable corner and seeded random tip, then freezes on pause', () => {
  let seed = 9071;
  const random = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  const s = new Simulation();
  for (let i = 0; i < 72; i++) {
    const id = i % 2 ? 'left' : 'right';
    const tool = s.state.tools[id];
    const desired = i < 8
      ? LIMITS.workspace.min.map((v, axis) => (i >> axis) & 1 ? LIMITS.workspace.max[axis] : v)
      : [random() * .6 - .3, .9 + random() * .4, random() * .6 - .3];
    tool.position = constrainToolPosition(desired, tool.port);
    s.select(id);
    hold(s, [], 3);
    const camera = s.state.scope;
    const forward = sub(camera.lookAt, camera.position);
    const toTarget = sub(tool.position, camera.position);
    // The norm of this cross product is the sine of the off-axis angle. With
    // positive forward projection this also verifies a perspective image centre.
    const normalizedError = Math.hypot(...cross(forward, toTarget)) / (Math.hypot(...forward) * Math.hypot(...toTarget));
    assert.ok(normalizedError < 1e-8, `off-axis error ${normalizedError} at ${desired}`);
    assert.ok(forward.reduce((sum, v, axis) => sum + v * toTarget[axis], 0) > 0);
    assert.ok(Math.hypot(...toTarget) >= .028 - 1e-8);
    near(Math.hypot(...sub(camera.position, camera.port)), camera.depth);
  }
  s.setPaused(true);
  const before = s.snapshot();
  hold(s, ['KeyW', 'ArrowRight'], 1);
  assert.deepEqual(s.snapshot(), before);
});

test('global bracket depth works with either tool selected and shares clutch, precision and history', () => {
  const s = new Simulation({ getExtraData: () => ({ cuts: ['retained tissue state'] }) });
  s.select('right');
  const tools = structuredClone(s.state.tools);
  const depth = s.state.scope.depth;
  const result = s.update(.02, new Set(['BracketRight']));
  assert.equal(result.moving, true);
  assert.equal(result.changed, true);
  hold(s, [']'], .48, .02);
  near(s.state.scope.depth - depth, CONTROL_RATES.scopeDepth * .5);
  assert.deepEqual(s.state.tools, tools);
  assert.equal(s.undoStack.length, 1);
  assert.deepEqual(s.undoStack[0].extraData, { cuts: ['retained tissue state'] });
  s.update(.01, new Set());
  hold(s, ['BracketLeft', 'ShiftLeft'], .5);
  near(s.state.scope.depth - depth, CONTROL_RATES.scopeDepth * .5 * (1 - CONTROL_RATES.fineFactor));
  const before = s.snapshot();
  hold(s, ['BracketRight', 'Space']);
  assert.deepEqual(s.snapshot(), before);
  s.setPaused(true);
  const paused = s.snapshot();
  hold(s, ['BracketRight']);
  assert.deepEqual(s.snapshot(), paused);
});

test('combined scope W and bracket insertions do not double the permitted speed', () => {
  const s = new Simulation();
  s.select('scope');
  const depth = s.state.scope.depth;
  hold(s, ['KeyW', 'BracketRight'], .5);
  near(s.state.scope.depth - depth, CONTROL_RATES.scopeDepth * .5);
  hold(s, ['KeyW', 'BracketRight'], 10);
  assert.ok(s.state.scope.depth <= LIMITS.scopeDepth[1]);
  hold(s, ['KeyS', 'BracketLeft'], 10);
  near(s.state.scope.depth, LIMITS.scopeDepth[0]);
});

test('automatic gesture checkpoints capture external tissue once at gesture start', () => {
  let tissue = { mask: new Uint8Array([1, 1, 1]) };
  let snapshots = 0;
  const s = new Simulation({ getExtraData: () => { snapshots++; return tissue; } });
  hold(s, ['KeyC', 'KeyD'], .2);
  tissue.mask[1] = 0;
  hold(s, ['KeyC', 'KeyD'], .2);
  assert.equal(snapshots, 1);
  assert.equal(s.undoStack.length, 1);
  const undone = s.undo(tissue);
  assert.equal(undone.hasExtraData, true);
  assert.deepEqual(undone.extraData.mask, new Uint8Array([1, 1, 1]));
  const redone = s.redo(undone.extraData);
  assert.deepEqual(redone.extraData.mask, new Uint8Array([1, 0, 1]));
});

test('atomic tissue checkpoints detach typed masks and undo/redo restores both domains', () => {
  const s = new Simulation();
  const before = s.snapshot();
  const tissue = { mask: new Uint8Array([1, 1, 1]), strokes: [] };
  s.checkpoint('切除', tissue);
  tissue.mask[1] = 0;
  tissue.strokes.push([.1, .2, .3]);
  s.setJaw('left', 0);
  const after = s.snapshot();
  const undo = s.undo(tissue);
  assert.equal(undo.label, '切除');
  assert.equal(undo.hasExtraData, true);
  assert.deepEqual(undo.extraData.mask, new Uint8Array([1, 1, 1]));
  assert.deepEqual(s.snapshot(), before);
  const redo = s.redo(undo.extraData);
  assert.deepEqual(redo.extraData, tissue);
  assert.deepEqual(s.snapshot(), after);
  redo.extraData.mask[0] = 0;
  assert.equal(tissue.mask[0], 1);
});

test('a continuous movement is one history action; new edits invalidate redo', () => {
  const s = new Simulation();
  hold(s, ['KeyD'], .8);
  assert.equal(s.undoStack.length, 1);
  s.update(.01, new Set());
  hold(s, ['KeyW'], .3);
  assert.equal(s.undoStack.length, 2);
  s.undo();
  assert.equal(s.canRedo, true);
  s.update(.01, new Set(['KeyA']));
  assert.equal(s.canRedo, false);
});

test('reset restores initial organs-independent pose and clears history; snapshots do not alias', () => {
  const s = new Simulation();
  const initial = s.snapshot();
  const copy = s.snapshot();
  copy.state.tools.left.position[0] = 55;
  assert.notEqual(s.state.tools.left.position[0], 55);
  hold(s, ['KeyD', 'ArrowUp', 'KeyC']);
  s.select('right');
  s.setCutting(true);
  s.reset();
  assert.deepEqual(s.snapshot(), initial);
  assert.equal(s.canUndo, false);
  assert.equal(s.canRedo, false);
});

test('invalid timestamps and invalid snapshots never introduce NaN or partially restore state', () => {
  const s = new Simulation();
  const before = s.snapshot();
  for (const dt of [NaN, Infinity, -1, 0]) s.update(dt, new Set(['KeyD']));
  assert.deepEqual(s.snapshot(), before);
  const bad = s.snapshot();
  bad.state.scope.depth = NaN;
  assert.throws(() => s.restore(bad), TypeError);
  assert.deepEqual(s.snapshot(), before);
  s.update(100, new Set(['KeyD']));
  near(s.state.tools.left.position[0] - before.state.tools.left.position[0], CONTROL_RATES.translation * LIMITS.maxFrameTime);
});

test('undo preserves paused safety state and event listeners can unsubscribe', () => {
  const events = [];
  const s = new Simulation();
  const unsubscribe = s.onEvent(event => events.push(event.type));
  s.checkpoint('动作');
  s.setJaw('right', 0);
  s.setPaused(true);
  s.undo();
  assert.equal(s.state.paused, true);
  assert.ok(events.includes('undo'));
  unsubscribe();
  const n = events.length;
  s.reset();
  assert.equal(events.length, n);
});
