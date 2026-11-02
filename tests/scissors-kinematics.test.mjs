import test from 'node:test';
import assert from 'node:assert/strict';
import {prepareScissorsProfile} from '../scripts/prepare-scissors-profile.mjs';
import {SCISSORS_BLADE_PROFILE} from '../src/scissors-blade-profile.js';
import {scissorsAnchor,scissorsTarget,scissorsSegments} from '../src/scissors-kinematics.js';
import {Simulation} from '../src/simulation.js';

test('cutting calibration is regenerated from unchanged GLB triangle intersections',async()=>{
  assert.deepEqual(await prepareScissorsProfile(),SCISSORS_BLADE_PROFILE);
  assert.equal(SCISSORS_BLADE_PROFILE.profiles.length,2);assert(SCISSORS_BLADE_PROFILE.profiles.every(p=>p.points.length===7));
});

test('a command solved for the real blade ends reaches the desired point through the public collision controller',()=>{
  const sim=new Simulation();let checked=0;
  for(let i=0;i<100;i++){
    sim.setJaw('right',[0,.28,.45][i%3]);sim.adjustWrist(2,.13,'right');
    const target=[.035+Math.sin(i*1.7)*.015,1.075+Math.cos(i*1.1)*.025,-.015+Math.sin(i*.7)*.018],before=sim.snapshot(),solution=scissorsTarget(sim.state.tools.right,target);
    assert.deepEqual(sim.snapshot(),before,'solving a preview cannot move the real instruments');
    if(solution.error>.00015)continue;
    const move=sim.moveToolTo(solution.position,'right');if(move.limited)continue;
    const anchor=scissorsAnchor(sim.state.tools.right);assert(Math.hypot(...anchor.map((v,j)=>v-target[j]))<.00015);checked++;
    const segments=scissorsSegments(sim.state.tools.right);assert.equal(segments.length,12);assert(Math.hypot(...anchor.map((v,j)=>v-(segments[5].b[j]+segments[11].b[j])*.5))<1e-12);
  }
  assert(checked>70,'exercise many actual accepted moves rather than only rejected targets');
});
