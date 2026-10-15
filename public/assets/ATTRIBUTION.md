# Asset provenance and reuse

All binary assets in this directory are locally served. The demo does not request a third-party model CDN at runtime. `asset-manifest.json` records checksums, file sizes, and the selected source revisions. No private project documents, patient records, or proposal text are included in this directory.

## Unitree G1 and Z1

- Publisher: Unitree Robotics / HangZhou YuShu TECHNOLOGY CO., LTD.
- Source: https://github.com/unitreerobotics/unitree_ros
- Pinned revision: `5994d4faef0a9cadd3287f8de0199a67eeb2a259`
- G1: `robots/g1_description/g1_29dof.urdf` and only the meshes referenced by its visual elements.
- Z1: `robots/z1_description/xacro/z1.urdf` and referenced official visual DAE meshes.
- License: BSD 3-Clause; full notice in `UNITREE-LICENSE.txt`.
- Outputs: `g1.glb`, `g1-kinematics.json`, `g1-source.urdf`, `z1.glb`, `z1-kinematics.json`, `z1-source.urdf`.
- Conversion: STL/DAE to indexed glTF binary; exact source visual triangle counts retained (G1: 382,618; Z1: 177,936), with no geometric simplification. G1 official gray/dark material colors are retained; PBR roughness and metalness are display choices. Z1 DAE colors are retained. Joint origins, axes, and limits come from the selected URDF.
- Coordinate system: meters; the `UnitreeG1` and `UnitreeZ1` nodes convert the source Z-up coordinates to glTF Y-up by -90 degrees about X. Child joint data remains in source local coordinates. Apply a joint axis-angle after its original origin rotation.

These public CAD descriptions are visual references for the selected robot models; they do not establish the dimensions, calibration, or safety of a modified physical robot. A chest mounting bracket, the combined three-arm surgical assembly, any bespoke sterile adapter, and software tool attachment are a proposed custom integration, not a Unitree product or a manufacturer-approved surgical configuration. Unitree does not endorse this demonstration.

## Anatomical liver and patient surface

- Original publisher: BodyParts3D / The Database Center for Life Science (DBCLS).
- Original database: https://lifesciencedb.jp/bp3d/
- Archive and official data description: https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html
- Publisher license page (updated 2025-02-27): https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html
- Source geometry: BodyParts3D version 3.0 / 20110915, `FMA7197` (liver) and `FMA7163` (skin), a reference adult male anatomical model.
- Delivery mirror for the original OBJ-to-STL conversion: https://github.com/Kevin-Mattheus-Moerman/BodyParts3D
- Mirror revision: `f0eeb6e843380cfe6b83797cf8c3e1af74de5e61`.
- Exact mirror paths: `assets/BodyParts3D_data/stl/FMA7197.stl`, `assets/BodyParts3D_data/stl/FMA7163.stl`.
- The mirror supplies these model derivatives under CC Attribution-Share Alike 2.1 Japan: https://creativecommons.org/licenses/by-sa/2.1/jp/deed.en. Its original content notice is retained in `BODYPARTS3D-LICENSE-original.txt`. The mirror-derived anatomical outputs here retain that same license. The original publisher now separately states CC Attribution 4.0 International for its database.
- Required attribution: **BodyParts3D, © The Database Center for Life Science.** Original geometry / mirrored derivatives licensed under **CC Attribution-Share Alike 2.1 Japan**; source database currently licensed by DBCLS under **CC Attribution 4.0 International**.
- Changes: millimeters converted to meters; liver bounding-box center set to local origin; +Y points superior and +Z points anterior. `liver.glb` preserves all 19,416 original source triangles. `patient-skin.glb` is a quadric simplification from 1,586,498 to 49,998 source-derived triangles. `liver-volume.bin` is a signed-distance sampling of the watertight reference liver at 1.5 mm voxel spacing. The sampled distance field is regularized with `scipy.ndimage.gaussian_filter`, sigma 0.8 voxels (1.2 mm), nearest boundary mode, truncate 4.0, to suppress voxel stair steps under lighting. This does not change `liver.glb`, increase anatomical resolution, or add biomechanical data. The smoothed field is checked for a single connected, watertight genus-zero surface and less than 3% volume change; its measured volume change is approximately -0.1121%. The accompanying JSON records the smoothing method, before/after volume estimates, indexing and transformation. Volume sampling, smoothing and runtime resection are adaptations of that anatomical model.
- Citation: Mitsuhashi N, et al. BodyParts3D: 3D structure database for anatomical concepts. *Nucleic Acids Research*. 2009;37:D782–D785. https://doi.org/10.1093/nar/gkn613

This is anatomical reference geometry from one model, not patient-specific imaging. Surface detail, histology, vessels, ducts, tumor locations, bleeding, thermal spread, and validated tissue mechanics are not contained in this source mesh. Any added lesion or internal vessel display is a separate demonstration layer.

## Surgical instruments and endoscope

- Publisher: da Vinci Research Kit (dVRK), Johns Hopkins research community.
- Primary source: https://github.com/jhu-dvrk/dvrk_model
- Pinned revision: `90472a933995acaa88d84eb5c58aeee4cd17e9f3`.
- License: MIT, copyright (c) 2024 da Vinci Research Kit. Full notice in `DVRK-LICENSE.txt`.
- `needle-driver.glb`: Large Needle Driver, model selection `400006`, source roll `4162`, wrist pitch/yaw `0091`, jaw tip `006`.
- `scissors.glb`: Monopolar Curved Scissors, model selection `400179`, source roll `4162`, wrist pitch/yaw `0091`, jaw tip `179`.
- `endoscope.glb`: `meshes/endoscopes/Classic_SD_straight/ECM_tool.stl` and the source reference tip transform.
- Geometry and transform definitions: `urdf/common/instruments/`, `urdf/common/endoscopes/`, and `meshes/instruments/` in the pinned source.
- Changes: original geometry assembled using the corresponding URDF macro transforms, glTF binary conversion, and a steel display material. No geometric decimation. External drive housings and the dVRK patient-side manipulator are omitted because these outputs show the instrument portions attached to the custom demonstration assembly. Exact source files and joint metadata are included for the two instruments. Roll axis and instrument length remain in meters along local +Z; the tool-tip transform is recorded in each metadata JSON.

These tool models are research visualizations. Their integration onto a G1 or chest-mounted Z1 is conceptual. The demonstration is not affiliated with, endorsed by, or an exact replica of a commercially certified surgical robot. The source CAD and URDF do not themselves validate physical dynamics or clinical performance.

## Reproduction

The script `scripts/prepare-assets.py` documents the conversions. Download the pinned sources into `.asset-sources/unitree_ros`, `.asset-sources/BodyParts3D`, and `.asset-sources/dvrk_model`; install `numpy`, `trimesh`, `scipy`, `scikit-image`, `rtree`, `fast-simplification`, and `pycollada`; run the script with no arguments for G1, or `--anatomy`, `--z1`, and `--instruments` for the respective assets. `--liver-volume` regenerates only the smoothed anatomical distance field and metadata while preserving all delivered GLB files. Every conversion refreshes the asset size/hash manifest. Source checkouts are not part of the public deployment.
