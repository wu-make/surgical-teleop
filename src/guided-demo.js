import * as THREE from 'three';
import { surfacePose } from './interaction-controller.js';

const smooth = value => value * value * (3 - 2 * value);
const defaults = { left: [-.025, 1.106, -.015], right: [.025, 1.108, -.015] };

/** An actual controller/tissue operation example. It contains no baked geometry. */
export class GuidedDemo {
  constructor(sim, tissue, interaction, { onMessage = () => {}, onChange = () => {} } = {}) {
    Object.assign(this, { sim, tissue, interaction, onMessage, onChange });
    this.active = false;
    this.mode = null;
  }

  stop(message = '已结束自动操作，可继续手动控制') {
    if (!this.active) return;
    this.active = false;
    this.sim.setCutting(false);
    this.interaction.lastCut = null;
    this.onChange();
    if (message) this.onMessage(message);
  }

  move(position, side) {
    const result = this.sim.moveToolTo(position, side);
    if (result.limited) {
      this.stop('自动路径被另一器械挡住；请先移开另一器械，再重新就位');
      return false;
    }
    return true;
  }

  approach() {
    const side = this.sim.state.selected;
    if (side === 'scope') { this.onMessage('先选左钳或右剪，再进行表面就位'); return; }
    const tool = this.sim.state.tools[side];
    const surface = surfacePose(this.tissue, tool.position) ?? surfacePose(this.tissue, defaults[side]);
    if (!surface) { this.onMessage('当前区域没有可接近的组织表面'); return; }
    this.sim.checkpoint('器械表面就位', this.interaction.snapshot());
    if (side === 'left') this.interaction.release(true);
    this.sim.setCutting(false);
    this.sim.setJaw(side, .7);
    this.mode = 'approach'; this.active = true; this.time = 0; this.side = side;
    this.start = new THREE.Vector3(...tool.position);
    this.end = surface.point.addScaledVector(surface.normal, .001);
    this.onMessage(`${side === 'left' ? '左钳' : '右剪'}正在贴近实际肝表面`);
    this.onChange();
  }

  startExample() {
    if (this.active) { this.stop(); return; }
    this.sim.checkpoint('双臂牵拉与切除示范', this.interaction.snapshot());
    this.interaction.release(true);
    this.sim.setCutting(false);
    this.sim.setPaused(false);
    this.sim.select('right');
    this.sim.setScopeFollow(true, 'grasp');
    const left = surfacePose(this.tissue, defaults.left);
    const right = surfacePose(this.tissue, defaults.right);
    if (!left || !right) { this.onMessage('操作区组织已被切除，请先重置完整器官再演示'); return; }
    this.leftSurface = left; this.rightSurface = right;
    this.leftStart = new THREE.Vector3(...this.sim.state.tools.left.position);
    this.rightStart = new THREE.Vector3(...this.sim.state.tools.right.position);
    this.leftRest = left.point.clone().addScaledVector(left.normal, .0007);
    this.leftLift = left.point.clone().addScaledVector(left.normal, .024);
    this.rightRest = right.point.clone().addScaledVector(right.normal, .001);
    this.sim.setJaw('left', .75); this.sim.setJaw('right', .85);
    this.active = true; this.mode = 'example'; this.time = 0; this.phase = -1;
    this.onMessage('协作示范：器械就位 → 左钳抓持抬起 → 右剪沿表面切除');
    this.onChange();
  }

  update(dt) {
    if (!this.active || this.sim.state.paused) return;
    this.time += dt;
    if (this.mode === 'approach') {
      if (!this.move(this.start.clone().lerp(this.end, smooth(Math.min(1, this.time / 1.1))).toArray(), this.side)) return;
      if (this.time >= 1.1) { this.active = false; this.onMessage('已贴近组织表面：C 闭合，E 抬起；右剪需开启剪切'); this.onChange(); }
      return;
    }
    const times = [1.4, 2.2, 4.2, 5.5, 6.2, 10.8, 11.6];
    const phase = times.findIndex(end => this.time < end);
    if (phase < 0) { this.stop('协作示范完成：左钳保持牵拉，右侧已形成真实三维切面。可撤销或重置'); return; }
    const start = phase ? times[phase - 1] : 0;
    const t = smooth(Math.min(1, (this.time - start) / (times[phase] - start)));
    if (phase !== this.phase) {
      this.phase = phase;
      if (phase === 2) this.onMessage('左钳正在抬起：组织顶点、包膜与阴影一起移动');
      if (phase === 3) {
        const points = [];
        for (let index = 0; index <= 36; index++) {
          const x = .003 + index / 36 * .044;
          const surface = surfacePose(this.tissue, [x, 1.108, -.015]);
          if (surface) points.push(surface.point.addScaledVector(surface.normal, -.0015));
        }
        this.cutPath = points.length > 2 ? new THREE.CatmullRomCurve3(points, false, 'centripetal') : null;
        this.rightBeforeCut = new THREE.Vector3(...this.sim.state.tools.right.position);
      }
      if (phase === 4) { this.sim.setCutting(true); this.onMessage('右剪闭合切入；左钳继续牵拉，切口会留在组织上'); }
      if (phase === 6) this.sim.setCutting(false);
    }
    if (phase === 0) {
      if (!this.move(this.leftStart.clone().lerp(this.leftRest, t).toArray(), 'left')) return;
      this.move(this.rightStart.clone().lerp(this.rightRest, t).toArray(), 'right');
    } else if (phase === 1) this.sim.setJaw('left', .75 * (1 - t));
    else if (phase === 2) this.move(this.leftRest.clone().lerp(this.leftLift, t).toArray(), 'left');
    else if (phase === 3 && this.cutPath) this.move(this.rightBeforeCut.clone().lerp(this.cutPath.getPoint(0), t).toArray(), 'right');
    else if (phase === 4) this.sim.setJaw('right', .85 * (1 - t));
    else if (phase === 5 && this.cutPath) this.move(this.cutPath.getPoint(t).toArray(), 'right');
    else if (phase === 6) this.sim.setJaw('right', .7 * t);
  }
}
