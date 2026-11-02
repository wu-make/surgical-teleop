import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {readGlbGeometry} from './prepare-instrument-collision.mjs';
import {INSTRUMENT_COLLISION_DATA} from '../src/instrument-collision-data.js';
import {buildSurfaceTree,packSurfaceTree} from '../src/surface-tree.js';
const bytes=await readFile(new URL('../public/assets/scissors.glb',import.meta.url)),meshes=readGlbGeometry(bytes),links={};
const encode=a=>Buffer.from(a.buffer,a.byteOffset,a.byteLength).toString('base64');
for(const link of new Set(INSTRUMENT_COLLISION_DATA.scissors.capsules.filter(c=>c.region!=='jaw').map(c=>c.link))){
 const names=new Set(INSTRUMENT_COLLISION_DATA.scissors.capsules.filter(c=>c.link===link&&c.region!=='jaw').flatMap(c=>c.source)),selected=meshes.filter(m=>m.link===link&&names.has(m.name)),vertices=[],faces=[];
 for(const mesh of selected){const offset=vertices.length/3;vertices.push(...mesh.points.flat());faces.push(...mesh.indices.map(i=>i+offset));}
 const positions=new Float32Array(vertices),indices=new Uint32Array(faces),tree=packSurfaceTree(buildSurfaceTree(positions,indices));
 links[link]={positions:encode(positions),indices:encode(indices),tree:{packed:true,rootId:tree.rootId,nodes:encode(tree.nodes),boundsStore:encode(tree.boundsStore),triangles:encode(tree.triangles)}};
 console.log(link,indices.length/3,'original triangles');
}
await writeFile(new URL('../src/scissors-body-triangles.js',import.meta.url),'// Generated from every unchanged non-jaw source CAD face. No decimation.\nexport const SOURCE_SHA256='+JSON.stringify(createHash('sha256').update(bytes).digest('hex'))+';\nexport const BODY_TRIANGLE_DATA='+JSON.stringify(links)+';\n');
