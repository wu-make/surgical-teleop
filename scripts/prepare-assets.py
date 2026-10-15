"""Reproducible browser asset conversion; source checkouts are intentionally untracked.

Requires: numpy, trimesh, scipy, scikit-image, rtree.
Run from repo root after cloning sources as recorded in public/assets/ATTRIBUTION.md.
"""
from pathlib import Path
import json
import math
import shutil
import hashlib
import xml.etree.ElementTree as ET

import numpy as np
import trimesh

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "assets"
SRC = ROOT / ".asset-sources"
OUT.mkdir(parents=True, exist_ok=True)


def vec(element, key, default=(0., 0., 0.)):
    return np.array([float(n) for n in element.get(key, ' '.join(map(str, default))).split()]) if element is not None else np.array(default, dtype=float)


def origin(el):
    xyz = vec(el, "xyz")
    rpy = vec(el, "rpy")
    mat = trimesh.transformations.euler_matrix(*rpy, axes="sxyz")
    mat[:3, 3] = xyz
    return mat


def make_robot():
    source = SRC / "unitree_ros" / "robots" / "g1_description"
    urdf = source / "g1_29dof.urdf"
    robot = ET.parse(urdf).getroot()
    mats = {m.get("name"): vec(m.find("color"), "rgba", (0.7, 0.7, 0.7, 1)) for m in robot.findall("material")}
    scene = trimesh.Scene(base_frame="world")
    yup = trimesh.transformations.rotation_matrix(-math.pi / 2, [1, 0, 0])
    scene.graph.update(frame_to="UnitreeG1", frame_from="world", matrix=yup)
    scene.graph.update(frame_to="pelvis", frame_from="UnitreeG1", matrix=np.eye(4))
    joints = []
    links = []
    triangle_count = 0
    for j in robot.findall("joint"):
        name = j.get("name")
        parent = j.find("parent").get("link")
        child = j.find("child").get("link")
        transform = origin(j.find("origin"))
        scene.graph.update(frame_to=name, frame_from=parent, matrix=transform)
        scene.graph.update(frame_to=child, frame_from=name, matrix=np.eye(4))
        lim = j.find("limit")
        joints.append({
            "name": name, "parent": parent, "child": child, "type": j.get("type"),
            "origin": {"xyz": vec(j.find("origin"), "xyz").tolist(), "rpy": vec(j.find("origin"), "rpy").tolist()},
            "axis": vec(j.find("axis"), "xyz", (1, 0, 0)).tolist(),
            "limit": {k: float(v) for k, v in lim.attrib.items()} if lim is not None else None,
        })
    for link in robot.findall("link"):
        name = link.get("name")
        visuals = []
        for idx, vis in enumerate(link.findall("visual")):
            mesh_el = vis.find("geometry/mesh")
            if mesh_el is None:
                continue
            filename = mesh_el.get("filename")
            m = trimesh.load(source / filename, force="mesh", process=True)
            if mesh_el.get("scale"):
                m.apply_scale(vec(mesh_el, "scale", (1, 1, 1)))
            material = vis.find("material")
            color = mats.get(material.get("name"), np.array([0.7, 0.7, 0.7, 1])) if material is not None else np.array([0.7, 0.7, 0.7, 1])
            m.visual = trimesh.visual.TextureVisuals(material=trimesh.visual.material.PBRMaterial(
                name=material.get("name") if material is not None else "body",
                baseColorFactor=color,
                metallicFactor=0.38 if color[0] < 0.4 else 0.16,
                roughnessFactor=0.32 if color[0] < 0.4 else 0.28,
            ))
            node = f"{name}__visual_{idx}"
            scene.add_geometry(m, node_name=node, geom_name=node, parent_node_name=name, transform=origin(vis.find("origin")))
            triangle_count += len(m.faces)
            visuals.append({"node": node, "source": filename, "triangles": len(m.faces), "vertices": len(m.vertices)})
        links.append({"name": name, "visuals": visuals})
    (OUT / "g1.glb").write_bytes(scene.export(file_type="glb"))
    shutil.copy2(urdf, OUT / "g1-source.urdf")
    shutil.copy2(SRC / "unitree_ros" / "LICENSE", OUT / "UNITREE-LICENSE.txt")
    metadata = {
        "source": "https://github.com/unitreerobotics/unitree_ros", "commit": "5994d4faef0a9cadd3287f8de0199a67eeb2a259",
        "sourceFile": "robots/g1_description/g1_29dof.urdf", "units": "meters", "rootNode": "UnitreeG1",
        "rootRotationXYZ": [-math.pi / 2, 0, 0], "sourceUp": "Z", "gltfUp": "Y",
        "jointApplication": "Keep each joint node's translation and source Euler origin rotation; apply rotation about local axis AFTER origin transform. Link nodes are identity.",
        "boundsAtZeroPoseYUp": scene.bounds.tolist(), "triangles": triangle_count, "links": links, "joints": joints,
    }
    (OUT / "g1-kinematics.json").write_text(json.dumps(metadata, indent=2), encoding="utf8")
    print("G1", triangle_count, "triangles", (OUT / "g1.glb").stat().st_size, "bytes", scene.bounds)


def make_anatomy(volume_only=False):
    from scipy.ndimage import distance_transform_edt, gaussian_filter
    from skimage.measure import marching_cubes
    source = SRC / "BodyParts3D" / "assets" / "BodyParts3D_data" / "stl"
    liver = trimesh.load(source / "FMA7197.stl", force="mesh", process=True)
    source_bounds = liver.bounds.copy()
    source_center = source_bounds.mean(axis=0)
    rotation = trimesh.transformations.rotation_matrix(-math.pi / 2, [1, 0, 0])
    source_to_local = rotation.copy()
    source_to_local[:3, :3] *= 0.001
    source_to_local[:3, 3] = -source_to_local[:3, :3] @ source_center
    liver.apply_transform(source_to_local)
    liver.fix_normals()
    liver.visual = trimesh.visual.TextureVisuals(material=trimesh.visual.material.PBRMaterial(
        name="LiverCapsule", baseColorFactor=[0.34, 0.075, 0.055, 1], metallicFactor=0., roughnessFactor=0.32,
    ))
    if not volume_only:
        (OUT / "liver.glb").write_bytes(liver.export(file_type="glb"))
    # The source is watertight; voxelization/fill preserves the anatomical volume.
    # EDT is explicitly a sampled distance field, not a claim of biomechanical fidelity.
    pitch = 0.0015
    vox = liver.voxelized(pitch).fill()
    occupancy = np.pad(vox.matrix, 3, constant_values=False)
    grid_origin = vox.transform[:3, 3] - pitch * 3
    signed_distance = ((distance_transform_edt(~occupancy) - 0.5) * pitch).astype(np.float32)
    signed_distance[occupancy] = -((distance_transform_edt(occupancy)[occupancy] - 0.5) * pitch)
    # Smooth the sampled field, rather than displacing the source CAD surface.
    # An EDT of binary voxels has discontinuous derivatives and leaves visible
    # stair steps under specular light. This reproducible 1.2 mm Gaussian kernel
    # regularizes those derivatives without claiming finer anatomical resolution.
    sigma_voxels = 0.8
    volume_ml = lambda field: float(np.clip(0.5 - field / pitch, 0., 1.).sum(dtype=np.float64) * pitch ** 3 * 1e6)
    raw_volume_ml = volume_ml(signed_distance)
    signed_distance = gaussian_filter(signed_distance, sigma=sigma_voxels, mode="nearest", truncate=4.0).astype(np.float32)
    smoothed_volume_ml = volume_ml(signed_distance)
    volume_change_percent = (smoothed_volume_ml / raw_volume_ml - 1.) * 100.
    vertices, faces, _, _ = marching_cubes(signed_distance, level=0., spacing=(pitch,) * 3)
    surface = trimesh.Trimesh(vertices=vertices, faces=faces, process=True)
    components = len(surface.split(only_watertight=False))
    if abs(volume_change_percent) > 3. or not surface.is_watertight or components != 1 or surface.euler_number != 2:
        raise ValueError("The smoothed liver field failed volume/topology validation")
    (OUT / "liver-volume.bin").write_bytes(signed_distance.astype("<f4").ravel(order="F").tobytes())
    metadata = {
        "name": "BodyParts3D FMA7197 liver", "dtype": "float32", "endianness": "little",
        "order": "x-fastest", "indexFormula": "x + nx * (y + ny * z)",
        "dims": list(occupancy.shape), "origin": grid_origin.tolist(), "spacing": [pitch] * 3,
        "sign": "negative-inside", "units": "meters", "bounds": liver.bounds.tolist(),
        "anatomicalUp": "+Y (superior)", "anatomicalFront": "+Z (anterior)",
        "sourceMesh": "BodyParts3D v3 FMA7197.stl", "sourceMeshTriangles": len(liver.faces),
        "sourceMeshWatertight": bool(liver.is_watertight), "sourceBoundsMillimeters": source_bounds.tolist(),
        "sourceToLocalMatrixRowMajor": source_to_local.tolist(),
        "volumeMl": smoothed_volume_ml,
        "voxelizedVolumeMl": float(occupancy.sum() * pitch ** 3 * 1e6),
        "volumeEstimation": "Sum of clamp(0.5 - signedDistance / voxelSpacing, 0, 1), multiplied by voxel volume; consistent with runtime resection accounting.",
        "smoothing": {
            "method": "scipy.ndimage.gaussian_filter", "sigmaVoxels": sigma_voxels,
            "sigmaMillimeters": sigma_voxels * pitch * 1000., "mode": "nearest", "truncate": 4.0,
            "input": "Signed Euclidean distance of the filled 1.5 mm source-mesh voxelization",
            "purpose": "Suppress voxel stair steps in the display/resection field; source liver.glb geometry is unchanged.",
            "preSmoothingVolumeMl": raw_volume_ml, "postSmoothingVolumeMl": smoothed_volume_ml,
            "volumeChangePercent": volume_change_percent,
            "validation": {"watertight": bool(surface.is_watertight), "connectedComponents": components,
                           "eulerCharacteristic": int(surface.euler_number), "surfaceTriangles": len(surface.faces)},
        },
        "notes": "Anatomical reference surface from one adult male; sampled at 1.5 mm and Gaussian-regularized at sigma 0.8 voxels. Smoothing does not increase source resolution. Does not encode histology, vessels, patient-specific imaging, or validated tissue mechanics.",
    }
    (OUT / "liver-volume.json").write_text(json.dumps(metadata, indent=2), encoding="utf8")
    shutil.copy2(SRC / "BodyParts3D" / "LICENSE_content", OUT / "BODYPARTS3D-LICENSE-original.txt")
    print("Liver", metadata)
    if volume_only:
        return
    skin = trimesh.load(source / "FMA7163.stl", force="mesh", process=True)
    skin.apply_transform(source_to_local)
    skin = skin.simplify_quadric_decimation(face_count=50000)
    skin.visual = trimesh.visual.TextureVisuals(material=trimesh.visual.material.PBRMaterial(
        name="AnatomicalSkin", baseColorFactor=[0.65, 0.38, 0.25, 1], metallicFactor=0., roughnessFactor=0.58,
    ))
    (OUT / "patient-skin.glb").write_bytes(skin.export(file_type="glb"))
    (OUT / "anatomy-metadata.json").write_text(json.dumps({
        "source": "BodyParts3D v3", "skinFma": "FMA7163", "liverFma": "FMA7197",
        "coordinates": "All anatomy shares the same local origin at liver bounding-box center. +Y superior, +Z anterior, meters.",
        "skinOriginalTriangles": 1586498, "skinOutputTriangles": len(skin.faces), "skinBounds": skin.bounds.tolist(),
        "sourceToLocalMatrixRowMajor": source_to_local.tolist(),
    }, indent=2), encoding="utf8")
    print("Skin", len(skin.faces), "triangles", skin.bounds)


def export_urdf_tree(robot, source, stem, root_name, base_link, root_transform=None, default_metal=False):
    """Preserve URDF transforms. No mesh simplification or invented geometry."""
    scene = trimesh.Scene(base_frame="scene")
    scene.graph.update(frame_to=root_name, frame_from="scene", matrix=np.eye(4) if root_transform is None else root_transform)
    scene.graph.update(frame_to=base_link, frame_from=root_name, matrix=np.eye(4))
    joints = []
    for j in robot.findall("joint"):
        name, parent, child = j.get("name"), j.find("parent").get("link"), j.find("child").get("link")
        scene.graph.update(frame_to=name, frame_from=parent, matrix=origin(j.find("origin")))
        scene.graph.update(frame_to=child, frame_from=name, matrix=np.eye(4))
        lim = j.find("limit")
        mimic = j.find("mimic")
        joints.append({"name": name, "parent": parent, "child": child, "type": j.get("type"),
                       "origin": {"xyz": vec(j.find("origin"), "xyz").tolist(), "rpy": vec(j.find("origin"), "rpy").tolist()},
                       "axis": vec(j.find("axis"), "xyz", (1, 0, 0)).tolist(),
                       "limit": {k: float(v) for k, v in lim.attrib.items()} if lim is not None else None,
                       "mimic": mimic.attrib if mimic is not None else None})
    triangles = 0
    for link in robot.findall("link"):
        for i, visual in enumerate(link.findall("visual")):
            mesh = visual.find("geometry/mesh")
            if mesh is None:
                continue
            filename = mesh.get("filename").split("/", 3)[-1] if mesh.get("filename").startswith("package://") else mesh.get("filename")
            loaded = trimesh.load(source / filename, process=True)
            meshes = list(loaded.dump()) if isinstance(loaded, trimesh.Scene) else [loaded]
            for k, item in enumerate(meshes):
                item.apply_scale(vec(mesh, "scale", (1, 1, 1)))
                if default_metal:
                    item.visual = trimesh.visual.TextureVisuals(material=trimesh.visual.material.PBRMaterial(
                        name="SurgicalSteel", baseColorFactor=[.57, .59, .61, 1], metallicFactor=.88, roughnessFactor=.24))
                scene.add_geometry(item, node_name=f"{link.get('name')}__visual_{i}_{k}",
                                   geom_name=f"{link.get('name')}__mesh_{i}_{k}", parent_node_name=link.get("name"), transform=origin(visual.find("origin")))
                triangles += len(item.faces)
    (OUT / f"{stem}.glb").write_bytes(scene.export(file_type="glb"))
    metadata = {"rootNode": root_name, "units": "meters", "baseLink": base_link, "joints": joints,
                "boundsAtZero": scene.bounds.tolist(), "triangles": triangles,
                "jointApplication": "Save origin quaternion; node quaternion = origin * axisAngle(axis, angle). Mimic joints apply multiplier to jaw angle."}
    if "tool_tip_link" in scene.graph.nodes:
        metadata["tipPositionAtZero"] = scene.graph["tool_tip_link"][0][:3, 3].tolist()
    if "tip_link" in scene.graph.nodes:
        metadata["tipPositionAtZero"] = scene.graph["tip_link"][0][:3, 3].tolist()
    (OUT / f"{stem}-kinematics.json").write_text(json.dumps(metadata, indent=2), encoding="utf8")
    print(stem, triangles, "triangles", (OUT / f"{stem}.glb").stat().st_size, "bytes", scene.bounds, metadata.get("tipPositionAtZero"))


def make_z1():
    source = SRC / "unitree_ros" / "robots" / "z1_description"
    urdf = source / "xacro" / "z1.urdf"
    export_urdf_tree(ET.parse(urdf).getroot(), source, "z1", "UnitreeZ1", "world",
                     trimesh.transformations.rotation_matrix(-math.pi / 2, [1, 0, 0]))
    shutil.copy2(urdf, OUT / "z1-source.urdf")


def make_dvrk():
    import copy
    source = SRC / "dvrk_model"
    def make_robot_from_macros(files):
        robot = ET.Element("robot", name="dvrk_instrument")
        ET.SubElement(robot, "link", name="adaptor_link")
        for filename in files:
            text = (source / filename).read_text(encoding="utf8")
            for a, b in {"${prefix}": "", "${parent_link}": "adaptor_link", "${PI_2}": str(math.pi / 2), "${PI}": str(math.pi)}.items():
                text = text.replace(a, b)
            macro = ET.fromstring(text).find("{http://www.ros.org/wiki/xacro}macro")
            for node in macro:
                if node.tag in ("link", "joint"):
                    robot.append(copy.deepcopy(node))
        return robot
    common = ["urdf/common/instruments/roll/roll_4162.urdf.xacro",
              "urdf/common/instruments/wrist_pitch/wrist_pitch_0091.urdf.xacro",
              "urdf/common/instruments/wrist_yaw/wrist_yaw_0091.urdf.xacro"]
    for stem, tip in [("needle-driver", "006"), ("scissors", "179")]:
        files = common + [f"urdf/common/instruments/tip/tip_{tip}.urdf.xacro"]
        robot = make_robot_from_macros(files)
        export_urdf_tree(robot, source, stem, "Instrument", "adaptor_link", default_metal=True)
        ET.ElementTree(robot).write(OUT / f"{stem}-source.urdf", encoding="utf8", xml_declaration=True)
    robot = make_robot_from_macros(["urdf/common/endoscopes/Classic_SD_straight.urdf.xacro"])
    export_urdf_tree(robot, source, "endoscope", "Endoscope", "adaptor_link", default_metal=True)
    shutil.copy2(source / "LICENSE", OUT / "DVRK-LICENSE.txt")


def update_asset_manifest():
    """Keep output checksums reproducible after any selected asset conversion."""
    manifest_path = OUT / "asset-manifest.json"
    manifest = json.loads(manifest_path.read_text(encoding="utf8")) if manifest_path.exists() else {}
    manifest["files"] = {path.name: {"bytes": path.stat().st_size, "sha256": hashlib.sha256(path.read_bytes()).hexdigest()}
                         for path in sorted(OUT.iterdir(), key=lambda path: path.name.lower())
                         if path.is_file() and path.name != manifest_path.name}
    manifest_path.write_text(json.dumps(manifest, indent=2), encoding="utf8")


if __name__ == "__main__":
    import sys
    if "--liver-volume" in sys.argv:
        make_anatomy(volume_only=True)
    elif "--anatomy" in sys.argv:
        make_anatomy()
    elif "--z1" in sys.argv:
        make_z1()
    elif "--instruments" in sys.argv:
        make_dvrk()
    else:
        make_robot()
    update_asset_manifest()
