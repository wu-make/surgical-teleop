import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { Simulation } from '../src/simulation.js';
import { TissueVolume } from '../src/tissue.js';
import { createVolumeState, applyCapsuleCut, resetVolume } from '../src/tissue-worker.js';
import { InteractionController } from '../src/interaction-controller.js';

function workbench() {
  const dims = [41, 41, 41], origin = [-.04, -.04, -.04], spacing = [.002, .002, .002];
  const values = new Float32Array(dims[0] ** 3);
  for (let z = 0; z < 41; z++) for (let y = 0; y < 41; y++) for (let x = 0; x < 41; x++)
    values[x + 41 * (y + 41 * z)] = Math.hypot(origin[0] + x * .002, origin[1] + y * .002, origin[2] + z * .002) - .03;
  const volume = createVolumeState({ dims, origin, spacing }, values);
  const tissue = new TissueVolume(); tissue.metadata = volume.meta; tissue._baseField = volume.base; tissue.ready = true;
  tissue._enqueue = async operation => {
    if (operation.type === 'restore') resetVolume(volume, operation.cuts);
    else for (const cut of operation.cuts) applyCapsuleCut(volume, cut);
    tissue.removedVolumeMm3 = volume.removedVolumeMm3;
    return { changed: true };
  };
  const sim = new Simulation();
  sim.state.tools.left.position = [-.015, 0, .027]; sim.state.tools.left.jaw = 0;
  sim.state.tools.right.position = [.015, 0, .027]; sim.state.tools.right.jaw = .7;
  const interaction = new InteractionController(sim, tissue, { toolDirection: () => new THREE.Vector3(0, 0, 1) });
  return { sim, tissue, interaction };
}

test('left traction persists while the selected right shear removes held tissue', async () => {
  const { sim, tissue, interaction } = workbench();
  await interaction.update(1 / 60);
  assert.ok(interaction.grasp, 'the left jaw captures a nearby real surface');
  sim.state.tools.left.position[2] += .015;
  await interaction.update(1 / 60);
  const displacement = tissue.graspMetrics.displacementMm;
  assert.ok(displacement > 14);
  sim.select('right'); sim.setCutting(true); sim.setJaw('right', 0);
  await interaction.update(1 / 60);
  assert.ok(interaction.grasp, 'enabling and executing a right cut must not release the left grasper');
  assert.ok(tissue.removedVolumeMm3 > 10, 'the same held material really loses volume');
  assert.equal(tissue.graspMetrics.displacementMm, displacement);
  tissue.dispose();
});

test('composite history restores both the grasper attachment and the material cut history', async () => {
  const { sim, tissue, interaction } = workbench();
  await interaction.update(1 / 60);
  sim.checkpoint('牵拉', interaction.snapshot());
  const before = interaction.snapshot();
  sim.state.tools.left.position[2] += .012;
  await interaction.update(1 / 60);
  assert.ok(tissue.graspMetrics.displacementMm > 10);
  const record = sim.undo(interaction.snapshot());
  await interaction.restore(record.extraData);
  assert.deepEqual(interaction.grasp, before.grasp);
  assert.deepEqual(tissue.snapshot().cuts, before.tissue.cuts);
  assert.ok(tissue.graspMetrics.displacementMm < 2);
  tissue.dispose();
});

test('opening the left jaw releases it with a bounded continuous recoil', async () => {
  const { sim, tissue, interaction } = workbench();
  await interaction.update(1 / 60);
  sim.state.tools.left.position[2] += .016;
  await interaction.update(1 / 60);
  const maximum = tissue.graspMetrics.displacementMm;
  sim.setJaw('left', 1);
  await interaction.update(1 / 60);
  assert.equal(interaction.grasp, null);
  assert.ok(tissue.graspMetrics.displacementMm > 0 && tissue.graspMetrics.displacementMm < maximum);
  for (let i = 0; i < 60; i++) await interaction.update(1 / 60);
  assert.equal(tissue.graspMetrics.active, false);
  tissue.dispose();
});
