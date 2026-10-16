import test from 'node:test';
import assert from 'node:assert/strict';
import { Simulation, LIMITS, CONTROL_RATES, constrainToolPosition, integratedControlDistance, instrumentClearance, segmentDistance, toolCollisionShapes } from '../src/simulation.js';
import { SCOPE_FRAMING, resolveScopeFraming, advanceScopeDepth } from '../src/scope-framing.js';

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
  hold(a, ['KeyA', 'KeyW'], .5, .01);
  hold(b, ['KeyA', 'KeyW'], .5, .02);
  nearVector(a.state.tools.left.position, b.state.tools.left.position);
  near(Math.hypot(...sub(a.state.tools.left.position, initial)), integratedControlDistance(0, .5, CONTROL_RATES.translation));
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

test('finite positions are free of workspace, insertion and cone limits', () => {
  const s = new Simulation();
  for (const tool of Object.values(s.state.tools)) {
    for (const x of [-100, -.1, .1, 100]) for (const y of [-100, 1.18, 100]) for (const z of [-100, .14, 100]) {
      const result = constrainToolPosition([x, y, z], tool.port);
      nearVector(result, [x,y,z]);
    }
  }
  const result = s.moveToolTo([-3, 4, 5], 'left');
  assert.equal(result.limited, false);
  nearVector(s.state.tools.left.position, [-3,4,5]);
  hold(s, ['ArrowRight', 'ArrowUp', 'KeyX', 'KeyV'], 100);
  const t = s.state.tools.left;
  t.wrist.forEach(v => assert.ok(v > Math.PI * 10));
  assert.equal(t.jaw, 1);
  assert.ok(s.undoStack.length <= LIMITS.history);
});

test('scope follows selected tip, preserves RCM, changes depth and accepts manual control', () => {
  const s = new Simulation();
  s.select('right');
  hold(s, ['KeyD', 'KeyQ'], .6);
  hold(s, [], 6);
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

test('automatic scope centres free-space tips above and below its port, then freezes on pause', () => {
  let seed = 9071;
  const random = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  const s = new Simulation();
  for (let i = 0; i < 24; i++) {
    const id = i % 2 ? 'left' : 'right';
    const tool = s.state.tools[id];
    const desired = [random() * 1.6 - .8, .4 + random() * 1.6, random() * 1.6 - .8];
    tool.position = constrainToolPosition(desired, tool.port);
    s.select(id);
    hold(s, [], 10, .02);
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
  near(s.state.scope.depth - depth, integratedControlDistance(0, .5, CONTROL_RATES.scopeDepth));
  assert.deepEqual(s.state.tools, tools);
  assert.equal(s.undoStack.length, 1);
  assert.deepEqual(s.undoStack[0].extraData, { cuts: ['retained tissue state'] });
  s.update(.01, new Set());
  hold(s, ['BracketLeft', 'ShiftLeft'], .5);
  near(s.state.scope.depth - depth, integratedControlDistance(0, .5, CONTROL_RATES.scopeDepth) - CONTROL_RATES.scopeDepth * .5 * CONTROL_RATES.fineFactor);
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
  near(s.state.scope.depth - depth, integratedControlDistance(0, .5, CONTROL_RATES.scopeDepth));
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
  near(s.state.tools.left.position[0] - before.state.tools.left.position[0], integratedControlDistance(0, LIMITS.maxFrameTime, CONTROL_RATES.translation));
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

test('50 ms taps are submillimetre, long holds accelerate and releasing never coasts', () => {
  const s = new Simulation(), initial = [...s.state.tools.left.position];
  hold(s, ['KeyA'], .05);
  const tap = Math.hypot(...sub(s.state.tools.left.position, initial));
  assert.ok(tap > .00005 && tap < .0001, `50ms tap ${tap * 1000} mm`);
  hold(s, ['KeyA'], 1.5);
  const before = [...s.state.tools.left.position];
  hold(s, ['KeyA'], .05);
  assert.ok(Math.hypot(...sub(s.state.tools.left.position, before)) > tap * 15);
  s.update(.01, new Set());
  const stopped = structuredClone(s.state.tools);
  hold(s, [], 1);
  assert.deepEqual(s.state.tools, stopped);
});

test('30/60/200 Hz mixed translation and rotation integrate equally without diagonal gain', () => {
  const a = new Simulation(), b = new Simulation(), single = new Simulation();
  const initial = [...a.state.tools.left.position];
  hold(a, ['KeyA', 'KeyW', 'ArrowLeft', 'ArrowUp', 'KeyX'], 1.8, 1/30);
  hold(b, ['KeyA', 'KeyW', 'ArrowLeft', 'ArrowUp', 'KeyX'], 1.8, 1/200);
  hold(single, ['KeyA', 'KeyX'], 1.8, 1/60);
  nearVector(a.state.tools.left.position, b.state.tools.left.position);
  nearVector(a.state.tools.left.wrist, b.state.tools.left.wrist);
  near(Math.hypot(...sub(a.state.tools.left.position, initial)), Math.hypot(...sub(single.state.tools.left.position, initial)));
  near(Math.hypot(...a.state.tools.left.wrist), Math.abs(single.state.tools.left.wrist[2]));
});

test('continuous swept contact stops long moves at tips and shafts, with immediate reverse escape', () => {
  const s = new Simulation();
  const result = s.moveToolTo([.2, 1.108, 0], 'left');
  assert.equal(result.limited, true);
  assert.ok(s.state.tools.left.position[0] < s.state.tools.right.position[0]);
  assert.ok(instrumentClearance(s.state.tools.left, s.state.tools.right) >= -1e-8);
  const contact = [...s.state.tools.left.position];
  const tangent = s.moveTool([0, 0, -.01], 'left');
  assert.equal(tangent.limited, false);
  near(s.state.tools.left.position[2], contact[2] - .01);
  const reverse = s.moveTool([-.01, 0, 0], 'left');
  assert.equal(reverse.limited, false);
  near(s.state.tools.left.position[0], contact[0] - .01);
  // An intracorporeal shaft crossing also collides while tips are far apart.
  const left = {port:[-.08,0,0], position:[.08,-.2,0], jaw:.5};
  const right = {port:[.08,0,0], position:[-.08,-.2,0], jaw:.5};
  near(segmentDistance(left.port, left.position, right.port, right.position), 0);
  assert.ok(instrumentClearance(left, right) < 0);
  assert.ok(Math.hypot(...sub(left.position, right.position)) > .1);
  const crossing = s.moveToolTo([.4, 1, -.2], 'left');
  assert.equal(crossing.limited, true);
  assert.ok(instrumentClearance(s.state.tools.left, s.state.tools.right) >= -1e-8);
});

test('keyboard contact cannot tunnel, and contact never blocks continuous wrist or roll', () => {
  const s = new Simulation();
  hold(s, ['KeyD'], 5, .05);
  assert.ok(instrumentClearance(s.state.tools.left, s.state.tools.right) >= -1e-8);
  const contact = [...s.state.tools.left.position];
  hold(s, ['KeyX'], 20, .05);
  nearVector(s.state.tools.left.position, contact);
  assert.ok(s.state.tools.left.wrist[2] > 14);
  s.adjustWrist(0, Math.PI * 20, 'left');
  s.adjustWrist(1, -Math.PI * 16, 'left');
  const snapshot = s.snapshot();
  s.restore(snapshot);
  nearVector(s.state.tools.left.wrist, snapshot.state.tools.left.wrist);
  hold(s, ['KeyA'], .3);
  assert.ok(s.state.tools.left.position[0] < contact[0]);
});

test('legacy overlapping poses can move outward without snapping, and opening jaws respects contact', () => {
  const s = new Simulation();
  const imported = s.snapshot();
  imported.state.tools.left.position = [...imported.state.tools.right.position];
  s.restore(imported);
  assert.ok(instrumentClearance(s.state.tools.left, s.state.tools.right) < 0);
  const original = [...s.state.tools.left.position];
  assert.equal(s.moveTool([-.08,0,0], 'left').limited, false);
  near(s.state.tools.left.position[0], original[0] - .08);
  assert.ok(instrumentClearance(s.state.tools.left, s.state.tools.right) > 0);
  s.setJaw('left', -5); s.setJaw('right', -5);
  s.moveToolTo([.2,1.108,0], 'left');
  const jaw = s.state.tools.left.jaw;
  s.setJaw('left', 1);
  assert.ok(s.state.tools.left.jaw >= jaw && s.state.tools.left.jaw < 1);
  assert.ok(instrumentClearance(s.state.tools.left, s.state.tools.right) >= -1e-8);
});

test('scope follow switches are angular-speed limited, and parallel-transport up crosses the pole', () => {
  const s = new Simulation();
  const snapshot = s.snapshot();
  snapshot.state.tools.right.position = [.3, 1.5, .25];
  s.restore(snapshot);
  const before = [...s.state.scope.direction];
  s.select('right'); s.update(.02, new Set());
  const dot = before.reduce((sum,v,i) => sum + v * s.state.scope.direction[i], 0);
  assert.ok(Math.acos(Math.max(-1,Math.min(1,dot))) <= CONTROL_RATES.followMaxRadiansPerSecond * .02 + 1e-9);
  s.select('scope'); s.setScopeFollow(false);
  s.state.scope.pitch = Math.PI/2 - .01; s.adjustWrist(0,0,'scope');
  let up = [...s.state.scope.cameraUp];
  for(let i=0;i<40;i++) {
    s.adjustWrist(0,.001,'scope');
    assert.ok(up.reduce((sum,v,j)=>sum+v*s.state.scope.cameraUp[j],0) > .999, 'camera up flipped');
    up = [...s.state.scope.cameraUp];
  }
  hold(s, ['KeyX'], 50, .05);
  assert.ok(s.state.scope.roll > Math.PI * 8);
  const copy = s.snapshot(); s.restore(copy);
  near(s.state.scope.roll, copy.state.scope.roll);
});

test('cooperative scope context chooses grasp or combined cutting work point', () => {
  const s = new Simulation(), target = [-.04,1.06,-.02];
  s.setScopeContext({graspTarget:target, operating:false});
  s.setScopeFollow(true,'grasp'); s.update(.01,new Set());
  nearVector(s.state.scope.target,target);
  s.setScopeContext({graspTarget:target, operating:true}); s.update(.01,new Set());
  nearVector(s.state.scope.target,target.map((v,i)=>(v+s.state.tools.right.position[i])/2));
  s.setScopeContext(); s.update(.01,new Set());
  nearVector(s.state.scope.target,s.state.tools.left.position.map((v,i)=>(v+s.state.tools.right.position[i])/2));
  assert.throws(()=>s.setScopeContext({graspTarget:[NaN,0,0]}),TypeError);
});

test('complete source-length shafts stay separated by default and detect the known external crossing', () => {
  const s = new Simulation();
  assert.ok(instrumentClearance(s.state.tools.left,s.state.tools.right) > .03);
  for(const id of ['left','right']) {
    const rod=toolCollisionShapes(s.state.tools[id])[0];
    near(Math.hypot(...sub(rod.a,rod.b)),LIMITS.shaftLengths[id]);
  }
  const crossing=s.snapshot();
  crossing.state.tools.left.position=[-.18,1.08,0];
  crossing.state.tools.right.position=[.18,1.08,0];
  s.restore(crossing);
  // The ports-to-tips segments diverge and are 160 mm apart. Only their external
  // extensions intersect: this regression was invisible to the original proxy.
  assert.ok(segmentDistance(s.state.tools.left.port,s.state.tools.left.position,s.state.tools.right.port,s.state.tools.right.position) > .15);
  assert.ok(instrumentClearance(s.state.tools.left,s.state.tools.right) < -.005);
});

test('a nonlinear external handle sweep is stopped even if both requested endpoint poses are clear', () => {
  const s = new Simulation();
  assert.equal(s.moveToolTo([-.18,1.08,0],'left').limited,false);
  assert.equal(s.moveToolTo([.025,1.08,0],'right').limited,false);
  const far=[.8,1.08,0];
  const hypothetical={...s.state.tools.right,position:far};
  assert.ok(instrumentClearance(s.state.tools.left,hypothetical) > .01);
  const result=s.moveToolTo(far,'right');
  assert.equal(result.limited,true);
  assert.ok(s.state.tools.right.position[0] < .18);
  assert.ok(instrumentClearance(s.state.tools.left,s.state.tools.right) > 0);
  const contact=[...s.state.tools.right.position];
  assert.equal(s.moveTool([-.01,0,0],'right').limited,false);
  near(s.state.tools.right.position[0],contact[0]-.01);
  assert.equal(s.moveTool([0,0,-.01],'right').limited,false);
  const position=[...s.state.tools.right.position];
  s.select('right');hold(s,['KeyX'],20,.05);
  assert.ok(s.state.tools.right.wrist[2] > 14);
  nearVector(s.state.tools.right.position,position);
});

test('traversing the port singularity is finite, preserves exact endpoints and adds no exclusion zone', () => {
  const s = new Simulation(),snapshot=s.snapshot();
  snapshot.state.tools.right.position=[3,3,3];
  snapshot.state.tools.left.position=[-.08,1.18,.10001];
  s.restore(snapshot);
  const port=[...s.state.tools.left.port];
  for(const position of [[-.08,1.18,.09999],port,[-.08001,1.18,.1],[-.08,1.18001,.1]]){
    const result=s.moveToolTo(position,'left');
    assert.equal(result.limited,false);
    nearVector(s.state.tools.left.position,position);
    nearVector(s.state.tools.left.port,port);
    for(const shape of toolCollisionShapes(s.state.tools.left))assert.ok([...shape.a,...shape.b].every(Number.isFinite));
    near(Math.hypot(...s.state.tools.left.shaftDirection),1);
  }
});

test('even a submicrometre imported overlap can immediately move apart', () => {
  const s=new Simulation(),snapshot=s.snapshot();
  snapshot.state.tools.left.position=[.01020005,1.108,0];
  s.restore(snapshot);
  const gap=instrumentClearance(s.state.tools.left,s.state.tools.right);
  assert.ok(gap<0&&gap>-1e-7);
  assert.equal(s.moveTool([-.001,0,0],'left').limited,false);
  assert.ok(instrumentClearance(s.state.tools.left,s.state.tools.right)>0);
});

const anatomicalContext = () => ({
  surfaceTarget:[-.025,1.09,.015],
  organBounds:{min:[-.13,1.015,-.09],max:[.13,1.135,.1]},
  heldSpecimen:{id:'cap-1',position:[-.03,1.09,.035],radius:.007},
});

test('initial laparoscope working distance frames a local organ patch at 55 degrees', () => {
  const s=new Simulation(),camera=s.state.scope;
  near(camera.actualWorkingDistance,.065);
  near(Math.hypot(...sub(camera.position,camera.port)),camera.depth);
  const visibleHeight=2*camera.actualWorkingDistance*Math.tan(55*Math.PI/360);
  const oldVisibleHeight=2*.11*Math.tan(60*Math.PI/360);
  assert.ok(visibleHeight>.06&&visibleHeight<.075);
  assert.ok(oldVisibleHeight/visibleHeight>1.85,'the local organ patch must gain meaningful magnification');
});

test('field composition retains the mother organ when a held specimen moves far away', () => {
  const s=new Simulation(),context=anatomicalContext();
  context.heldSpecimen.position=[-.19,1.19,-.13];
  context.graspTarget=[...context.heldSpecimen.position];
  s.setScopeContext(context);s.setScopeFollow(true,'grasp');
  hold(s,[],6,.02);
  const camera=s.state.scope;
  nearVector(camera.intentTarget,context.graspTarget);
  assert.ok(Math.hypot(...sub(camera.target,context.surfaceTarget))<=SCOPE_FRAMING.maximumIntentOffset+1e-12);
  assert.ok(Math.hypot(...sub(camera.target,context.graspTarget))>.2);
  near(camera.actualWorkingDistance,.065,1e-8);
  assert.equal(camera.framingSource,'mother-surface');
  s.setScopeContext({surfaceTarget:null});hold(s,[],1);
  assert.equal(camera.framingSource,'retained-operative-field');
  assert.ok(Math.hypot(...sub(camera.target,context.surfaceTarget))<=.012+1e-12);
});

test('anatomical framing preserves active, midpoint and cooperative grasp intentions', () => {
  const s=new Simulation(),context=anatomicalContext(),grasp=[-.04,1.06,-.02];
  s.setScopeContext({...context,graspTarget:grasp});
  s.select('right');s.update(.02);
  nearVector(s.state.scope.intentTarget,s.state.tools.right.position);
  s.setScopeFollow(true,'midpoint');s.update(.02);
  nearVector(s.state.scope.intentTarget,s.state.tools.left.position.map((v,i)=>(v+s.state.tools.right.position[i])/2));
  s.setScopeFollow(true,'grasp');s.update(.02);
  nearVector(s.state.scope.intentTarget,grasp);
  s.setScopeContext({graspTarget:grasp,operating:true});s.update(.02);
  nearVector(s.state.scope.intentTarget,grasp.map((v,i)=>(v+s.state.tools.right.position[i])/2));
  assert.equal(s.state.scope.viewMode,'field');
});

test('explicit specimen view centres its real bounds and falls back honestly when none is held', () => {
  const s=new Simulation(),context=anatomicalContext();
  s.setScopeContext(context);s.setScopeViewMode('specimen');hold(s,[],6,.02);
  nearVector(s.state.scope.target,context.heldSpecimen.position);
  assert.equal(s.state.scope.framingSource,'specimen');
  assert.ok(s.state.scope.actualWorkingDistance>=.028&&s.state.scope.actualWorkingDistance<=.065);
  s.setScopeContext({heldSpecimen:null});hold(s,[],3);
  assert.equal(s.state.scope.viewMode,'specimen','the explicit user preference is retained');
  assert.equal(s.state.scope.framingSource,'mother-surface');
  assert.ok(Math.hypot(...sub(s.state.scope.target,context.surfaceTarget))<=.012+1e-12);
});

test('automatic insertion is bounded, monotone and independent of frame subdivision', () => {
  for(const desired of [.018,.055,.135]){
    const single=advanceScopeDepth(.096,desired,1.6);
    let subdivided=.096;
    for(let i=0;i<320;i++)subdivided=advanceScopeDepth(subdivided,desired,.005);
    near(single,subdivided,1e-12);
    assert.ok(single>=Math.min(.096,desired)&&single<=Math.max(.096,desired));
    assert.ok(Math.abs(single-.096)<=SCOPE_FRAMING.insertionSpeed*1.6+1e-12);
  }
  const a=new Simulation(),b=new Simulation();
  a.setScopeContext(anatomicalContext());b.setScopeContext(anatomicalContext());
  hold(a,[],3,1/30);hold(b,[],3,1/200);
  near(a.state.scope.depth,b.state.scope.depth,1e-10);
  nearVector(a.state.scope.position,b.state.scope.position,1e-8);
});

test('manual scope depth and nudges persist after release under anatomical automatic following', () => {
  const s=new Simulation();s.setScopeContext(anatomicalContext());hold(s,[],4);
  const depth=s.state.scope.depth;
  hold(s,['BracketRight'],.5);
  near(s.state.scope.depth-depth,integratedControlDistance(0,.5,CONTROL_RATES.scopeDepth),1e-9);
  const commanded=s.state.scope.depth;hold(s,[],4);
  near(s.state.scope.depth,commanded,1e-10);
  const bias=s.state.scope.depthBias;
  s.nudge('z',1,.002,'scope');hold(s,[],3);
  near(s.state.scope.depth,commanded-.002,1e-10);
  near(s.state.scope.depthBias,bias-.002,1e-10);
  hold(s,['BracketLeft','ShiftLeft'],.5);
  const fine=s.state.scope.depth;hold(s,[],2);
  near(fine,commanded-.002-CONTROL_RATES.scopeDepth*.5*CONTROL_RATES.fineFactor,1e-10);
  near(s.state.scope.depth,fine,1e-10);
});

test('scope view preference, field anchor and manual distance restore exactly across history', () => {
  const s=new Simulation();s.setScopeContext(anatomicalContext());hold(s,[],4);
  const before=s.snapshot();s.checkpoint('观察内容');s.setScopeViewMode('specimen');
  hold(s,[],3);hold(s,['BracketLeft'],.2);hold(s,[],1);
  const after=s.snapshot();
  const sameSnapshot=(actual,expected)=>{
    // RCM pose restoration normalizes unit vectors; preserve the whole state
    // while allowing roundoff below a picometre in these derived quantities.
    const a=structuredClone(actual),b=structuredClone(expected);
    for(const key of ['up','cameraUp','direction','position','lookAt']){
      nearVector(a.state.scope[key],b.state.scope[key],1e-12);
      delete a.state.scope[key];delete b.state.scope[key];
    }
    near(a.state.scope.actualWorkingDistance,b.state.scope.actualWorkingDistance,1e-12);
    delete a.state.scope.actualWorkingDistance;delete b.state.scope.actualWorkingDistance;
    assert.deepEqual(a,b);
  };
  s.undo();s.undo();sameSnapshot(s.snapshot(),before);
  s.redo();s.redo();sameSnapshot(s.snapshot(),after);
  s.setPaused(true);const frozen=s.snapshot();
  s.setScopeViewMode('field');hold(s,['BracketRight'],2);
  nearVector(s.state.scope.position,frozen.state.scope.position);
  nearVector(s.state.scope.lookAt,frozen.state.scope.lookAt);
  near(s.state.scope.depth,frozen.state.scope.depth);
  assert.equal(s.state.scope.viewMode,'field');
  assert.throws(()=>s.setScopeViewMode('arbitrary'),RangeError);
});

test('scope anatomical contexts are detached and invalid updates never partially mutate them', () => {
  const s=new Simulation(),context=anatomicalContext();s.setScopeContext(context);
  const stored=s.snapshot();context.surfaceTarget[0]=9;context.organBounds.min[0]=9;context.heldSpecimen.position[0]=9;
  assert.deepEqual(s.snapshot(),stored);
  for(const invalid of [{surfaceTarget:[NaN,0,0]},{organBounds:{min:[1,0,0],max:[0,0,0]}},{heldSpecimen:{position:[0,0,0],radius:-1}}]){
    assert.throws(()=>s.setScopeContext({graspTarget:[0,0,0],...invalid}),TypeError);
    assert.deepEqual(s.snapshot(),stored);
  }
  const old=s.snapshot();
  for(const field of ['viewMode','depthBias','surfaceTarget','fieldAnchor','organBounds','heldSpecimen','framingSource','targetWorkingDistance','autoDepthTarget','intentTarget','actualWorkingDistance'])delete old.state.scope[field];
  s.restore(old);assert.equal(s.state.scope.viewMode,'field');assert.equal(s.state.scope.depthBias,0);
  near(s.state.scope.actualWorkingDistance,Math.hypot(...sub(s.state.scope.position,s.state.scope.target)));
  const stable=s.snapshot(),bad=s.snapshot();bad.state.scope.viewMode='other';
  assert.throws(()=>s.restore(bad),TypeError);assert.deepEqual(s.snapshot(),stable);
});

test('pure scope framing uses only mother bounds when no surface query is available', () => {
  const context=anatomicalContext();
  const framed=resolveScopeFraming({port:[0,1.18,.14],intentTarget:[-.3,1.3,-.2],organBounds:context.organBounds});
  assert.equal(framed.source,'mother-bounds');
  assert.ok(framed.anchor.every((v,i)=>v>=context.organBounds.min[i]&&v<=context.organBounds.max[i]));
  assert.ok(Math.hypot(...sub(framed.target,framed.anchor))<=.012+1e-12);
  assert.equal(resolveScopeFraming({port:[0,1.18,.14],intentTarget:[0,1.1,0]}),null);
});

test('portrait specimen framing fits the narrower horizontal FOV beyond the former 65 mm cap',()=>{
  const input={port:[0,1.18,.14],intentTarget:[0,1.09,0],viewMode:'specimen',heldSpecimen:{position:[0,1.09,0],radius:.014}};
  const portrait=resolveScopeFraming({...input,aspect:.462}),square=resolveScopeFraming({...input,aspect:1});
  near(portrait.baseWorkingDistance,square.baseWorkingDistance/.462);
  assert.ok(portrait.baseWorkingDistance>.065);
  assert.equal(portrait.framingLimited,false);
  const actualDistance=portrait.targetDistance-portrait.depthTarget;
  // Use a sphere's perspective silhouette, rather than its orthographic width.
  const coverage=input.heldSpecimen.radius/(Math.sqrt(actualDistance**2-input.heldSpecimen.radius**2)*Math.tan(55*Math.PI/360)*.462);
  assert.ok(coverage<1,'the actual bounding sphere fits horizontally without cropping');
  const landscape=resolveScopeFraming({...input,aspect:2});near(landscape.depthTarget,square.depthTarget);
});

test('unreachable narrow-view framing reports best effort at the physical retraction stop',()=>{
  const framing=resolveScopeFraming({port:[0,1.18,.14],intentTarget:[0,1.09,0],viewMode:'specimen',aspect:.08,
    heldSpecimen:{position:[0,1.09,0],radius:.014}});
  assert.ok(framing.baseWorkingDistance>.13);
  near(framing.depthTarget,LIMITS.scopeDepth[0]);
  assert.equal(framing.retractionLimited,true);assert.equal(framing.framingLimited,true);
  assert.ok(framing.targetDistance-framing.depthTarget<framing.workingDistance);
  for(const aspect of [0,-1,NaN,Infinity])assert.throws(()=>resolveScopeFraming({port:[0,1.18,.14],intentTarget:[0,1.09,0],aspect}),TypeError);
});

test('live viewport aspect is validated atomically and stays independent of undo, restore and reset',()=>{
  const s=new Simulation(),context=anatomicalContext();context.heldSpecimen.radius=.014;
  s.setScopeContext({...context,viewAspect:1});s.setScopeViewMode('specimen');hold(s,[],4);
  const before=s.snapshot();s.checkpoint('display context');s.setScopeContext({viewAspect:.462});hold(s,[],4);
  assert.ok(s.state.scope.actualWorkingDistance>.065);assert.equal(s.state.scope.framingLimited,false);
  assert.equal(Object.hasOwn(s.snapshot().state.scope,'viewAspect'),false);
  s.undo();near(s.viewAspect,.462);s.restore(before);near(s.viewAspect,.462);
  const stored=s.snapshot();
  for(const viewAspect of [null,0,-.1,NaN,Infinity]){
    assert.throws(()=>s.setScopeContext({graspTarget:[0,0,0],viewAspect}),TypeError);
    assert.deepEqual(s.snapshot(),stored);near(s.viewAspect,.462);
  }
  s.setPaused(true);s.setScopeContext({viewAspect:.08});const pose=[...s.state.scope.position];hold(s,[],1);nearVector(s.state.scope.position,pose);
  s.reset();near(s.viewAspect,.08);
});
