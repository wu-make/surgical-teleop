import * as THREE from 'three';

// Explicit, development-only controls for replaying and isolating a real cut.
export function attachCutVerification(view,sim,interaction,pause){
  const panel=document.createElement('div');panel.style.cssText='position:fixed;left:10px;top:4px;z-index:50;display:flex;gap:5px;background:#172823';document.body.append(panel);
  const button=(name,action)=>{const b=document.createElement('button');b.textContent=name;b.onclick=action;panel.append(b);return b;};
  const input=document.createElement('input');input.type='file';input.accept='.json';input.setAttribute('aria-label','恢复剪切回归记录');panel.append(input);
  input.onchange=async()=>{pause(true);const data=JSON.parse(await input.files[0].text());sim.state=structuredClone(data.state.state);sim.state.paused=true;await interaction.restore(data.interaction);view.update(sim.state,0);view.render();input.dataset.restored='true';};
  let original=false;
  button('原始组织绘制对照',()=>{pause(true);original=!original;for(const [m,r]of view.exactBatches.records)if(m.userData.tissue||m.geometry.attributes.tissueRestPosition){m.layers.mask=original?r.mask:0;r.group.mesh.setVisibleAt(r.instance,!original&&r.visible);}view.render();});
  button('隐藏血液对照',()=>{pause(true);view.tissue.blood.group.visible=!view.tissue.blood.group.visible;view.render();});
  const report=button('检查真实切口网格',()=>{
    pause(true);let maxEdge=0,flipped=0,faces=0,mismatch=0;const p=[new THREE.Vector3(),new THREE.Vector3(),new THREE.Vector3()],n=new THREE.Vector3(),a=new THREE.Vector3(),b=new THREE.Vector3(),cross=new THREE.Vector3();
    for(const mesh of view.tissue._meshes.values()){
      const g=mesh.geometry,index=g.index.array,pos=g.attributes.position,normal=g.attributes.normal;
      for(let i=0;i<index.length;i+=3){for(let j=0;j<3;j++)p[j].fromBufferAttribute(pos,index[i+j]);a.subVectors(p[1],p[0]);b.subVectors(p[2],p[0]);cross.crossVectors(a,b);n.set(0,0,0);for(let j=0;j<3;j++)n.add(new THREE.Vector3().fromBufferAttribute(normal,index[i+j]));if(cross.dot(n)<0)flipped++;faces++;maxEdge=Math.max(maxEdge,p[0].distanceTo(p[1]),p[1].distanceTo(p[2]),p[2].distanceTo(p[0]));}
      const record=view.exactBatches.records.get(mesh);if(record){const batched=record.group.mesh.geometry,range=record.group.mesh.getGeometryRangeAt(record.geometry.id);for(let i=0;i<index.length;i++)if(batched.index.array[range.indexStart+i]-range.vertexStart!==index[i])mismatch++;}
    }
    report.dataset.result=JSON.stringify({maxEdgeMm:maxEdge*1000,flipped,faces,batchIndexMismatch:mismatch,render:view.renderTimings});
  });
}
