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

### Registered hepatobiliary context and display adaptation

`hepatobiliary-context.glb` adds the reference gallbladder (`FMA7202.stl`, 13,846 source triangles), common hepatic artery (`FMA14771.stl`, 808), stomach (`FMA7148.stl`, 9,384) and duodenum (`FMA7206.stl`, 11,950) from the same mirror revision and source anatomical frame. `scripts/prepare-context-anatomy.py` applies exactly the liver's recorded source-to-local matrix, without fitting invented vessel branches. Its companion JSON records each structure, dimensions, transform and checksum. These anatomical derivatives retain **CC BY-SA 2.1 Japan** and the DBCLS attribution above. Neighbouring organs provide registered context; only the liver has interactive volumetric resection.

Runtime traction now changes real vertices and analytic normals using an invertible compact geometric displacement, including contact and material-coordinate cutting. The capsule mottling, microscopic-scale surface variation and freshly exposed parenchyma appearance are procedural rendering choices, not measured histology or a patient-specific scan. No clinically calibrated material mechanics are supplied.

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

## Uterus and adnexa reference scenario

The cuttable `pelvic-volume` derives from Kristen Browne and Heidi Schlehlein, Human Reference Atlas / HuBMAP, based on the U.S. National Library of Medicine Visible Human Female. Source anatomy is licensed **CC BY 4.0**, https://creativecommons.org/licenses/by/4.0/ . Reference library: https://humanatlas.io/3d-reference-library .

Pinned digital objects:

- Uterus: https://lod.humanatlas.io/ref-organ/uterus-female/v1.2 , DOI https://doi.org/10.48539/HBM627.VTKD.892 .
- Left/right uterine tubes: https://lod.humanatlas.io/ref-organ/fallopian-tube-female-left/v1.2 and https://lod.humanatlas.io/ref-organ/fallopian-tube-female-right/v1.2 .
- Left/right ovaries: https://lod.humanatlas.io/ref-organ/ovary-female-left/v1.3 and https://lod.humanatlas.io/ref-organ/ovary-female-right/v1.3 .

Adaptations: retain registered native metre coordinates, translate to a common operative origin, voxelise at 0.75 mm, close sampling gaps, regularise the field with sigma 0.45 voxels, and reconstruct a thin endometrial cavity plus the two missing ovarian support connections. These supplements and the left ovarian lesion are explicitly authored scenario geometry, not findings in the reference donor. Full source node names, revisions, checksums, transforms, reconstructions and closed-volume validation are recorded in `pelvic-volume.json`; conversion is reproducible with `scripts/prepare-pelvic-volume.py`. The original reference structures are not geometrically decimated.

Both pathological scenes use explicit three-dimensional lesion labels clipped to the original organ solid. Liver lesion location and all pathological appearances are authored scenario data. Surface colour, exposed myometrial/parenchymal detail and cut-edge overlays are procedural display adaptations; they stay in material coordinates on the mother and separated specimens. Optional edge assistance moves the visible real blade through the normal collision controller within an 8 mm neighbourhood, at a bounded speed; it does not delete or replace the target region. True separation is still determined by volumetric connectivity.
