"""Registered HRA uterus/adnexa -> cuttable submillimetre reference volume.

Requires the five source GLBs/metadata in .asset-sources/hra-female. Their
pinned digital-object revisions, hashes and adaptations travel with the asset.
Run with numpy, scipy, scikit-image and trimesh installed.
"""
from pathlib import Path
import json, hashlib
import numpy as np
import trimesh
from scipy import ndimage as ndi
from skimage.measure import marching_cubes

ROOT=Path(__file__).resolve().parents[1]
SOURCE=ROOT/'.asset-sources'/'hra-female'
OUT=ROOT/'public'/'assets'
pitch=.00075
center=np.array([-.0125,.043,-.054])
parts=[]; records=[]
for stem in ['uterus-female','fallopian-tube-female-left','fallopian-tube-female-right','ovary-female-left','ovary-female-right']:
    scene=trimesh.load(SOURCE/f'{stem}.glb',force='scene')
    metadata=json.loads((SOURCE/f'{stem}.json').read_text(encoding='utf8'))
    for node in scene.graph.nodes_geometry:
        transform,geometry=scene.graph[node];mesh=scene.geometry[geometry].copy();mesh.apply_transform(transform)
        mesh.apply_translation(-center);mesh.merge_vertices();mesh.fix_normals();parts.append(mesh)
        records.append({'node':node,'source':metadata['id'],'triangles':len(mesh.faces),'bounds':mesh.bounds.tolist()})
combined=trimesh.util.concatenate(parts)
low=np.floor((combined.bounds[0]-.012)/pitch)*pitch
high=np.ceil((combined.bounds[1]+.012)/pitch)*pitch
dims=np.ceil((high-low)/pitch).astype(int)+1
occupied=np.zeros(dims,dtype=bool)
for mesh in parts:
    vox=mesh.voxelized(pitch).fill();indices=np.rint((vox.points-low)/pitch).astype(int)
    occupied[tuple(indices.T)]=True
occupied=ndi.binary_fill_holes(ndi.binary_closing(occupied,iterations=1))
grid=np.stack(np.meshgrid(*[low[i]+np.arange(dims[i])*pitch for i in range(3)],indexing='ij'),axis=-1)

def ellipsoid(c,r):
    return np.linalg.norm((grid-np.array(c))/np.array(r),axis=-1)<=1

def ligament(a,b,radius):
    a=np.array(a)-center;b=np.array(b)-center;d=b-a;p=grid-a
    t=np.clip(np.sum(p*d,axis=-1)/np.dot(d,d),0,1)
    return np.linalg.norm(p-t[...,None]*d,axis=-1)<=radius

# The reference organ downloads omit supporting ligaments. Explicitly recorded
# reconstruction joins each source ovary to its corresponding uterine horn.
supports=[([.006,.042,-.041],[.044,.058,-.045],.0021),([-.032,.041,-.041],[-.070,.058,-.045],.0021)]
for a,b,r in supports: occupied|=ligament(a,b,r)
lesion_center=(np.array([.044,.060,-.044])-center).tolist()
occupied|=ellipsoid(lesion_center,[.013,.017,.011])
# Reconstruct a thin cavity inside the source-registered uterine walls. It
# exposes a different internal layer on an actual volume cut, never a decal.
cavity_center=(np.array([-.0125,.035,-.050])-center).tolist()
occupied&=~ellipsoid(cavity_center,[.012,.008,.0011])
field=(ndi.distance_transform_edt(~occupied)-.5)*pitch
inside=ndi.distance_transform_edt(occupied)
field[occupied]=-(inside[occupied]-.5)*pitch
field=ndi.gaussian_filter(field,.45).astype('<f4')
labels,count=ndi.label(field<0)
sizes=np.bincount(labels.ravel());print('components',count,'sizes',sorted(sizes[1:],reverse=True)[:8])
# Tiny source-sampling specks have no anatomical identity. Preserve all source
# structures in the main connected solid; fail rather than silently dropping
# an ovary or an entire tube.
largest=1+np.argmax(sizes[1:])
if np.sum((labels!=largest)&(labels>0))>200: raise ValueError('Registered supports do not join the reference anatomy')
field[(labels!=largest)&(labels>0)]=pitch
vertices,faces,_,_=marching_cubes(field,0,spacing=(pitch,)*3)
surface=trimesh.Trimesh(vertices+low,faces,process=True)
if not surface.is_watertight: raise ValueError('Pelvic field is not closed')
metadata={'name':'HRA Visible Human Female uterus and adnexa','dtype':'float32','endianness':'little','order':'x-fastest','units':'meters','sign':'negative-inside','dims':dims.tolist(),'origin':low.tolist(),'spacing':[pitch]*3,'bounds':surface.bounds.tolist(),
 'sourceCenterMetres':center.tolist(),'license':'CC BY 4.0','source':'https://humanatlas.io/3d-reference-library','creators':['Kristen Browne','Heidi Schlehlein'],'structures':records,
 'sourceFiles':[{'file':p.name,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()} for p in sorted(SOURCE.glob('*.glb')) if p.name!='united-female.glb'],
 'adaptations':{'voxelPitchMm':pitch*1000,'smoothingSigmaVoxels':.45,'supportLigamentsSourceFrameMetres':supports,'leftOvarianLesion':{'center':lesion_center,'radii':[.010,.013,.008]},'reconstructedEndometrialCavity':{'center':cavity_center,'radii':[.012,.008,.0011]}},
 'validation':{'watertight':True,'surfaceTriangles':len(faces),'connectedComponents':1,'volumeMl':float(np.clip(.5-field/pitch,0,1).sum()*pitch**3*1e6)}}
(OUT/'pelvic-volume.bin').write_bytes(field.ravel(order='F').tobytes())
(OUT/'pelvic-volume.json').write_text(json.dumps(metadata,indent=2),encoding='utf8')
print(json.dumps({'dims':dims.tolist(),'bounds':surface.bounds.tolist(),'lesion':lesion_center,'validation':metadata['validation']}))
