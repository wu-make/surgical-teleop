import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';
import * as THREE from 'three';
import {readGlbGeometry} from './prepare-instrument-collision.mjs';
import {sourceBladeProfile} from '../src/authentic-assemblies.js';

export async function prepareScissorsProfile(){
  const bytes=await fs.readFile(new URL('../public/assets/scissors.glb',import.meta.url)),meshes=readGlbGeometry(bytes),group=new THREE.Group(),profiles=[];
  for(const [name,side]of [['jaw_1_link',1],['jaw_2_link',-1]]){
    const link=new THREE.Group();link.name=name;group.add(link);
    for(const m of meshes.filter(m=>m.link===name)){
      const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(m.points.flat(),3));geometry.setIndex(m.indices);link.add(new THREE.Mesh(geometry));
    }
    profiles.push({link:name,points:sourceBladeProfile(group,name,side).map(p=>p.toArray())});
  }
  group.traverse(n=>{if(n.isMesh){n.geometry.dispose();n.material.dispose();}});
  return{sourceSha256:createHash('sha256').update(bytes).digest('hex'),profiles};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
  const data=await prepareScissorsProfile();
  await fs.writeFile(new URL('../src/scissors-blade-profile.js',import.meta.url),'// Generated from the unchanged source CAD: node scripts/prepare-scissors-profile.mjs\nexport const SCISSORS_BLADE_PROFILE='+JSON.stringify(data)+';\n');
}
