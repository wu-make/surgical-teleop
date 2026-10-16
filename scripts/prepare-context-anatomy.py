"""Convert registered BodyParts3D structures in the liver's source frame.

The source revision and licence are shared with the existing liver model. This
adds actual reference anatomy, without inventing intrahepatic vessel branches.
"""
from pathlib import Path
import hashlib
import io
import json
import subprocess
import urllib.request
import numpy as np
import trimesh

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / '.asset-sources' / 'BodyParts3D'
OUT = ROOT / 'public' / 'assets'
REVISION = 'f0eeb6e843380cfe6b83797cf8c3e1af74de5e61'
metadata = json.loads((OUT / 'liver-volume.json').read_text(encoding='utf-8'))
transform = np.array(metadata['sourceToLocalMatrixRowMajor'])
specifications = [
    ('FMA7202', 'gallbladder', [0.25, 0.31, 0.11, 1]),
    ('FMA14771', 'common-hepatic-artery', [0.51, 0.09, 0.065, 1]),
    ('FMA7148', 'stomach', [0.59, 0.25, 0.20, 1]),
    ('FMA7206', 'duodenum', [0.58, 0.36, 0.27, 1]),
]
scene = trimesh.Scene()
structures = []
for identifier, label, color in specifications:
    source_path = f'assets/BodyParts3D_data/stl/{identifier}.stl'
    result = subprocess.run(['git', '-C', str(SOURCE), 'show', f'{REVISION}:{source_path}'], capture_output=True)
    if result.returncode == 0:
        source_bytes = result.stdout
    else:
        url = f'https://raw.githubusercontent.com/Kevin-Mattheus-Moerman/BodyParts3D/{REVISION}/{source_path}'
        with urllib.request.urlopen(url, timeout=45) as response:
            source_bytes = response.read()
    mesh = trimesh.load(io.BytesIO(source_bytes), file_type='stl', force='mesh', process=True)
    original_faces = len(mesh.faces)
    mesh.apply_transform(transform)
    mesh.fix_normals()
    mesh.visual = trimesh.visual.TextureVisuals(material=trimesh.visual.material.PBRMaterial(
        name=label, baseColorFactor=color, metallicFactor=0, roughnessFactor=0.42))
    scene.add_geometry(mesh, node_name=identifier, geom_name=label)
    structures.append({'id': identifier, 'name': label, 'sourcePath': source_path, 'sourceTriangles': original_faces, 'boundsMetres': mesh.bounds.tolist()})
payload = scene.export(file_type='glb')
(OUT / 'hepatobiliary-context.glb').write_bytes(payload)
manifest = {'source': 'https://github.com/Kevin-Mattheus-Moerman/BodyParts3D', 'revision': REVISION,
            'licence': 'CC BY-SA 2.1 Japan', 'attribution': 'BodyParts3D, © The Database Center for Life Science.',
            'units': 'metres', 'frame': 'Same local anatomical frame as liver-volume.json',
            'sourceToLocalMatrixRowMajor': transform.tolist(), 'structures': structures,
            'file': 'hepatobiliary-context.glb', 'bytes': len(payload), 'sha256': hashlib.sha256(payload).hexdigest(),
            'notes': 'Registered source gallbladder, common hepatic artery, stomach and duodenum. No generated internal vessel tree or patient-specific anatomy is implied.'}
(OUT / 'hepatobiliary-context.json').write_text(json.dumps(manifest, indent=2), encoding='utf-8')
print(json.dumps({'file': manifest['file'], 'bytes': len(payload), 'structures': structures}))
