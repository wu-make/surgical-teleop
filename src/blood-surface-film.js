import * as THREE from 'three';
import {filmSupport} from './film-support.js';

// A liquid height field on the *existing* organ/specimen triangles, rather
// than a collection of ellipsoids. Material-space kernels advect with tissue;
// volume/area sets thickness, while the finite-volume solver owns all mass.
const radiusOf=n=>Math.sqrt(n.area/Math.PI)*.001*1.9;
const boundsOf=g=>{
  const a=g.attributes.tissueRestPosition??g.attributes.position;
  const b=new THREE.Box3(),p=new THREE.Vector3();for(let i=0;i<a.count;i++)b.expandByPoint(p.fromBufferAttribute(a,i));return b;
};
const nodeOwner=n=>n.fragmentId??null;
const GRID=.005;
const bin=(x,y,z)=>`${x}:${y}:${z}`;
const boxDistanceSq=(b,p)=>Math.max(b.min.x-p[0],0,p[0]-b.max.x)**2+Math.max(b.min.y-p[1],0,p[1]-b.max.y)**2+Math.max(b.min.z-p[2],0,p[2]-b.max.z)**2;
const makeFields=capacity=>({capacity,texture:new THREE.DataTexture(new Float32Array(capacity*12),capacity*3,1,THREE.RGBAFormat,THREE.FloatType),count:{value:0},owner:{value:0}});
const encode=(data,n,i,owner=0)=>{
  const r=radiusOf(n),k=i*12;
  // Write the identical Float32 kernel directly; no spread/temporary arrays
  // for every cell in every overlapping source chunk on every fluid step.
  data[k]=n.reference[0];data[k+1]=n.reference[1];data[k+2]=n.reference[2];data[k+3]=r*r;
  data[k+4]=n.restNormal[0];data[k+5]=n.restNormal[1];data[k+6]=n.restNormal[2];
  data[k+7]=n.volume*n.area/Math.max(.01,n.physicalArea??n.area)*3/(Math.PI*(r*1000)**2)*.001;
  data[k+8]=n.clot??0;data[k+9]=owner;data[k+10]=0;data[k+11]=0;
};

function material(gpu,fields,woundOnly=false){
  const m=new THREE.MeshPhysicalMaterial({color:'#610e18',roughness:.26,metalness:0,ior:1.36,clearcoat:.85,clearcoatRoughness:.16,
    transparent:true,depthWrite:false,side:THREE.DoubleSide,forceSinglePass:true,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-1});
  m.name='Continuous_Conformal_Blood_Surface';
  m.onBeforeCompile=s=>{
    s.vertexShader='attribute float filmThickness; attribute float filmClot; varying float vFilmThickness; varying float vFilmClot; varying vec3 vFilmPosition;\n'+s.vertexShader;
    s.vertexShader=s.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvFilmThickness=filmThickness;vFilmClot=filmClot;vFilmPosition=position;');
    if(gpu){
      s.uniforms.filmFields={value:fields.texture};s.uniforms.filmNodeCount=fields.count;s.uniforms.filmOwner=fields.owner;
      s.vertexShader='uniform sampler2D filmFields; uniform int filmNodeCount; uniform float filmOwner; attribute vec3 filmReference; attribute vec3 filmRestNormal;\n'+s.vertexShader;
      s.vertexShader=s.vertexShader.replace('vFilmThickness=filmThickness;vFilmClot=filmClot;vFilmPosition=position;',`float height=0.0,clotMass=0.0;
        for(int i=0;i<${fields.capacity};i++){
          if(i>=filmNodeCount)break;
          vec4 a=texelFetch(filmFields,ivec2(i*3,0),0);
          vec3 delta=filmReference-a.xyz;float q=dot(delta,delta)/a.w;
          if(q>=1.0)continue;
          vec4 b=texelFetch(filmFields,ivec2(i*3+1,0),0);
          if(dot(filmRestNormal,b.xyz)<.15)continue;
          vec4 c=texelFetch(filmFields,ivec2(i*3+2,0),0);
          if(abs(filmOwner-c.y)>.1)continue;
          float h=(1.0-q)*(1.0-q)*b.w;height+=h;clotMass+=h*c.x;
        }
        transformed+=normal*(height+.000012);
        vFilmThickness=height;vFilmClot=height>0.0?clotMass/height:0.0;vFilmPosition=position;`);
    }
    s.fragmentShader='varying float vFilmThickness; varying float vFilmClot; varying vec3 vFilmPosition;\n'+s.fragmentShader;
    s.fragmentShader=s.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
      // Optical depth of the computed liquid layer, not an animated decal.
      float filmOptical=1.0-exp(-max(vFilmThickness,0.0)*19000.0);
      diffuseColor.a*=filmOptical;
      if(diffuseColor.a<.015)discard;
      diffuseColor.rgb*=mix(1.0,.62,clamp(vFilmClot,0.0,1.0));`);
    s.fragmentShader=s.fragmentShader.replace('#include <roughnessmap_fragment>','#include <roughnessmap_fragment>\nroughnessFactor=mix(.23,.52,clamp(vFilmClot,0.0,1.0));');
    if(woundOnly){
      s.vertexShader='attribute float filmCutMask; varying float vFilmCutMask;\n'+s.vertexShader;
      s.vertexShader=s.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvFilmCutMask=filmCutMask;');
      s.fragmentShader='varying float vFilmCutMask;\n'+s.fragmentShader;
      s.fragmentShader=s.fragmentShader.replace('#include <color_fragment>','#include <color_fragment>\nif(vFilmCutMask<.55)discard;');
    }
  };
  m.customProgramCacheKey=()=> `continuous-conformal-blood-v4-${gpu?`gpu-${fields.capacity}`:'cpu'}-${woundOnly?'wound':'spread'}`;return m;
}

export class BloodSurfaceFilm {
  constructor(tissue,{gpu=false,capacity=96,woundOnly=false}={}){
    this.gpu=gpu;this.woundOnly=woundOnly;
    this.fields=makeFields(capacity);
    this.fields.texture.needsUpdate=true;
    this.tissue=tissue;this.geometry=new THREE.BufferGeometry();this.mesh=gpu?new THREE.Group():new THREE.Mesh(this.geometry,material(false,this.fields,woundOnly));
    if(gpu){
      this.mesh.geometry=this.geometry;this.mesh.material=material(true,this.fields,woundOnly);
      // Compile and upload during the existing loading render, before the
      // first wet contact. Retain the program through reset/history replay.
      // A zero-count draw compiles GLSL but does not execute a wet vertex,
      // initialise its VAO or exercise the field texture. Use an isolated real
      // triangle/kernel during loading, without adding any simulated blood.
      this.warmFields=makeFields(capacity);this.warmFields.count.value=capacity;
      for(let i=0;i<capacity;i++)encode(this.warmFields.texture.image.data,{reference:[0,0,0],restNormal:[0,0,1],area:6.25,volume:.02},i);
      this.warmFields.texture.needsUpdate=true;
      this.warmGeometry=new THREE.BufferGeometry();for(const name of ['position','normal','filmReference','filmRestNormal'])this.warmGeometry.setAttribute(name,new THREE.BufferAttribute(new Float32Array(9),3));
      if(woundOnly)this.warmGeometry.setAttribute('filmCutMask',new THREE.BufferAttribute(new Float32Array([1,1,1]),1));
      this.warmGeometry.attributes.position.array.set([0,0,0,.0001,0,0,0,.0001,0]);for(const name of ['normal','filmRestNormal'])this.warmGeometry.attributes[name].array.set([0,0,1,0,0,1,0,0,1]);this.warmGeometry.setDrawRange(0,3);
      this.warmMesh=new THREE.Mesh(this.warmGeometry,material(true,this.warmFields,woundOnly));this.warmMesh.layers.enable(1);this.warmMesh.frustumCulled=false;
      this.warmMesh.userData.cameraSpaceWarmup=true;
      const nearCamera=new THREE.Matrix4().makeTranslation(0,0,-.02);
      this.warmMesh.onBeforeRender=(_renderer,_scene,camera)=>{this.warmMesh.matrixWorld.copy(camera.matrixWorld).multiply(nearCamera);};
      this.warmMesh.onAfterRender=()=>{this.warmMesh.visible=false;};this.mesh.add(this.warmMesh);
    }
    this.mesh.name='Connected_Blood_Film_On_Actual_Tissue_Triangles';this.mesh.layers.enable(1);this.mesh.frustumCulled=false;this.mesh.renderOrder=2;
    this.kernelOwners=new Map();this.kernelEntries=[];this.records=new WeakMap();this.owners=new Map();this.displayRecords=[];this.gpuMaterials=new Map();this.overlays=new Map();this.capacity=0;if(!gpu)this._reserve(65536);this.geometry.setDrawRange(0,0);
    this.stats={triangles:0,vertices:0,cacheBuilds:0};
    this.p=new THREE.Vector3();this.n=new THREE.Vector3();
  }
  _reserve(required){
    if(required<=this.capacity)return;this.capacity=Math.max(required,this.capacity*2,1024);
    const specs=[['position',3],['normal',3],['filmThickness',1],['filmClot',1]];if(this.gpu)specs.push(['filmReference',3],['filmRestNormal',3],['filmOwner',1]);
    if(this.woundOnly)specs.push(['filmCutMask',1]);
    for(const [name,size]of specs){const array=new Float32Array(this.capacity*size);if(this.geometry.attributes[name])array.set(this.geometry.attributes[name].array);this.geometry.setAttribute(name,new THREE.BufferAttribute(array,size).setUsage(THREE.DynamicDrawUsage));}
  }
  reset(){this.kernelOwners.clear();this.kernelEntries.length=0;this.records=new WeakMap();this.owners.clear();this.displayRecords=[];for(const r of this.overlays.values()){r.overlay.geometry.dispose();r.overlay.material.dispose();r.fields.texture.dispose();}this.overlays.clear();if(this.gpu){this.mesh.clear();this.mesh.add(this.warmMesh);}this.fields.count.value=0;this.geometry.setDrawRange(0,0);this.stats.triangles=this.stats.vertices=0;}
  _owners(nodes,pools){
    const groups=new Map();
    for(const n of nodes){const id=nodeOwner(n);if(!groups.has(id))groups.set(id,[]);groups.get(id).push(n);}
    for(const n of pools){const id=nodeOwner(n);if(!groups.has(id))groups.set(id,[]);groups.get(id).push(n);}
    for(const [id,list]of groups){
      const old=this.owners.get(id);
      if(old&&old.list.length===list.length&&list.every((n,i)=>n===old.list[i]&&(n.version??0)===old.versions[i]))continue;
      const box=new THREE.Box3(),grid=new Map(),entries=[];
      for(const n of list){
        const r=radiusOf(n),p=new THREE.Vector3(...n.reference),entry={node:n,r2:r*r,factor:3/(Math.PI*(r*1000)**2),version:n.version??0};entries.push(entry);
        box.expandByPoint(p.clone().addScalar(r));box.expandByPoint(p.addScalar(-r));
        for(let x=Math.floor((n.reference[0]-r)/GRID);x<=Math.floor((n.reference[0]+r)/GRID);x++)for(let y=Math.floor((n.reference[1]-r)/GRID);y<=Math.floor((n.reference[1]+r)/GRID);y++)for(let z=Math.floor((n.reference[2]-r)/GRID);z<=Math.floor((n.reference[2]+r)/GRID);z++){
          const key=bin(x,y,z);if(!grid.has(key))grid.set(key,[]);grid.get(key).push(entry);
        }
      }
      this.owners.set(id,{list,box,entries,grid,versions:list.map(n=>n.version??0)});
    }
    for(const id of this.owners.keys())if(!groups.has(id))this.owners.delete(id);
  }
  _record(mesh,owner){
    const g=mesh.geometry;let record=this.records.get(g);if(record?.owner===owner)return record;
    const rest=g.attributes.tissueRestPosition??g.attributes.position,normal=g.userData.materialNormals??g.userData.restNormals??g.attributes.normal.array;
    const bounds=record?.bounds??g.userData.restBox??boundsOf(g),candidates=owner.box.intersectsBox(bounds)?owner.entries.filter(e=>boxDistanceSq(bounds,e.node.reference)<e.r2):[];
    // A changed wound selection must not invalidate unchanged chunks. Only
    // kernels intersecting this exact geometry can affect its material weights.
    if(record&&record.candidates.length===candidates.length&&candidates.every((e,i)=>e.node===record.candidates[i].node&&e.version===record.candidates[i].version)){record.owner=owner;return record;}
    const faces=[],active=[],offsets=[0],entries=[],weights=[],covered=new Uint8Array(candidates.length?rest.count:0);
    if(candidates.length){
      for(let i=0;i<rest.count;i++){
        const x=rest.getX(i),y=rest.getY(i),z=rest.getZ(i),start=weights.length;
        for(const e of owner.grid.get(bin(Math.floor(x/GRID),Math.floor(y/GRID),Math.floor(z/GRID)))??[]){
          const n=e.node,dx=x-n.reference[0],dy=y-n.reference[1],dz=z-n.reference[2],q=(dx*dx+dy*dy+dz*dz)/e.r2;
          if(q>=1||normal[i*3]*n.restNormal[0]+normal[i*3+1]*n.restNormal[1]+normal[i*3+2]*n.restNormal[2]<.15)continue;
          // Integral of (1-r²/R²)² over a planar disk is PI R²/3.
          entries.push(n);weights.push((1-q)**2*e.factor);
        }
        if(weights.length>start){active.push(i);offsets.push(weights.length);covered[i]=1;}
      }
      const indices=g.index?.array;
      for(let i=0;i<(indices?.length??rest.count);i+=3){const a=indices?indices[i]:i,b=indices?indices[i+1]:i+1,c=indices?indices[i+2]:i+2;if(covered[a]||covered[b]||covered[c])faces.push(a,b,c);}
    }
    record={owner,bounds,candidates,active:new Uint32Array(active),offsets:new Uint32Array(offsets),entries,weights:new Float64Array(weights),faces:new Uint32Array(faces),height:new Float32Array(candidates.length?rest.count:0),clot:new Float32Array(candidates.length?rest.count:0)};
    this.records.set(g,record);this.stats.cacheBuilds++;return record;
  }
  update(nodes,pools=[]){
    if(this.gpu){this._updateGPU(nodes);return;}
    this._owners(nodes,pools);let cursor=0;this.displayRecords=[];
    const sources=[...[...this.tissue._meshes.values()].map(mesh=>({mesh,id:null})),...[...this.tissue.fragments.items.values()].map(piece=>({mesh:piece.mesh,id:piece.id,piece}))];
    for(const {mesh,id,piece}of sources){
      const owner=this.owners.get(id);if(!owner)continue;const r=this._record(mesh,owner);if(!r.faces.length)continue;
      for(let i=0;i<r.active.length;i++){
        let height=0,clot=0;for(let j=r.offsets[i];j<r.offsets[i+1];j++){const node=r.entries[j],h=r.weights[j]*node.volume*node.area/Math.max(.01,node.physicalArea??node.area);height+=h;clot+=h*(node.clot??0);}
        const index=r.active[i];r.height[index]=height*.001;r.clot[index]=height?clot/height:0;
      }
      const p=mesh.geometry.attributes.position,n=mesh.geometry.attributes.normal;
      const start=cursor,displayIndices=[];
      this._reserve(cursor+r.faces.length);
      const out=this.geometry.attributes;
      for(let i=0;i<r.faces.length;i+=3){
        const a=r.faces[i],b=r.faces[i+1],c=r.faces[i+2];if(Math.max(r.height[a],r.height[b],r.height[c])<1e-8)continue;
        for(const index of [a,b,c]){
          this.p.fromBufferAttribute(p,index);this.n.fromBufferAttribute(n,index);
          this.p.addScaledVector(this.n,r.height[index]+.000012);
          if(piece){this.p.applyQuaternion(piece.quaternion).add(piece.position);this.n.applyQuaternion(piece.quaternion);}
          out.position.setXYZ(cursor,this.p.x,this.p.y,this.p.z);out.normal.setXYZ(cursor,this.n.x,this.n.y,this.n.z);
          out.filmThickness.setX(cursor,r.height[index]);out.filmClot.setX(cursor,r.clot[index]);cursor++;
          if(this.woundOnly)out.filmCutMask.setX(cursor-1,mesh.geometry.attributes.tissueCutMask?.getX(index)??0);
          displayIndices.push(index);
        }
      }
      this.displayRecords.push({mesh,piece,start,indices:new Uint32Array(displayIndices),height:r.height,version:p.version,pose:piece?[...piece.position.toArray(),...piece.quaternion.toArray()]:null});
    }
    this.geometry.setDrawRange(0,cursor);
    for(const a of Object.values(this.geometry.attributes)){a.clearUpdateRanges();if(cursor){a.addUpdateRange(0,cursor*a.itemSize);a.needsUpdate=true;}}
    this.stats.vertices=cursor;this.stats.triangles=cursor/3;
  }
  _updateGPU(nodes){
    if(nodes.length>this.fields.capacity)throw new Error('Surface film capacity exceeded');
    // The exact same compact kernel is evaluated on the original vertices by
    // the GPU. Moving pools update a tiny field texture, not tens of thousands
    // of CPU vertex/node pairs. No fluid or tissue samples are removed.
    const owners=this.kernelOwners,data=this.fields.texture.image.data;let ownerCount=0;
    for(const owner of owners.values()){owner.list.length=0;owner.box.makeEmpty();owner.index=-1;}
    for(let i=0;i<nodes.length;i++){
      const n=nodes[i],id=nodeOwner(n);if(!owners.has(id))owners.set(id,{index:-1,list:[],box:new THREE.Box3()});
      const o=owners.get(id),r=radiusOf(n),p=n.reference,b=o.box;if(o.index<0)o.index=ownerCount++;
      b.min.x=Math.min(b.min.x,p[0]-r);b.min.y=Math.min(b.min.y,p[1]-r);b.min.z=Math.min(b.min.z,p[2]-r);
      b.max.x=Math.max(b.max.x,p[0]+r);b.max.y=Math.max(b.max.y,p[1]+r);b.max.z=Math.max(b.max.z,p[2]+r);
      const entry=this.kernelEntries[i]??= {};entry.node=n;entry.r2=r*r;o.list.push(entry);encode(data,n,i,o.index);
    }
    this.fields.count.value=nodes.length;this.fields.texture.needsUpdate=true;
    const active=new Set();let total=0;
    const visit=(mesh,id,piece)=>{
      const owner=owners.get(id);if(!owner)return;const g=mesh.geometry;
      let record=this.records.get(g);if(!record){record={bounds:g.userData.restBox??boundsOf(g)};this.records.set(g,record);this.stats.cacheBuilds++;}
      if(!record.bounds.intersectsBox(owner.box))return;
      const candidates=owner.list.filter(e=>boxDistanceSq(record.bounds,e.node.reference)<e.r2);if(!candidates.length)return;
      active.add(mesh);
      let layer=this.overlays.get(mesh);
      if(!layer||layer.sourceGeometry!==g){
        // Alias exact source arrays with independently owned GPU attributes.
        // Do not change the parent's batching schema or share GL disposal.
        const surface=new THREE.BufferGeometry();
        for(const name of ['position','normal']){const a=g.attributes[name];surface.setAttribute(name,new THREE.BufferAttribute(a.array,a.itemSize,a.normalized));}
        const rest=g.attributes.tissueRestPosition??g.attributes.position;
        surface.setAttribute('filmReference',new THREE.BufferAttribute(rest.array,3));surface.setAttribute('filmRestNormal',new THREE.BufferAttribute(g.userData.materialNormals??g.userData.restNormals??g.attributes.normal.array,3));
        if(this.woundOnly)surface.setAttribute('filmCutMask',new THREE.BufferAttribute(g.attributes.tissueCutMask?.array??new Float32Array(rest.count),1));
        surface.userData.filmSpatialIndex=g.userData.filmSpatialIndex;
        if(g.index)surface.setIndex(new THREE.BufferAttribute(g.index.array,1));else surface.setIndex(Array.from({length:g.attributes.position.count},(_,i)=>i));
        surface.userData.fullFilmIndex=surface.index;
        surface.setIndex(new THREE.BufferAttribute(new surface.index.array.constructor(surface.index.count),1).setUsage(THREE.DynamicDrawUsage));
        const fields=layer?.fields??makeFields(this.fields.capacity),overlay=layer?.overlay??new THREE.Mesh(surface,material(true,fields,this.woundOnly));
        if(layer){overlay.geometry.dispose();overlay.geometry=surface;}
        else{overlay.name='Wet_Film_On_Exact_Source_Buffer';overlay.layers.enable(1);overlay.renderOrder=3;overlay.frustumCulled=false;this.mesh.add(overlay);}
        layer={mesh,piece,overlay,fields,sourceGeometry:g,positionVersion:g.attributes.position.version,normalVersion:g.attributes.normal.version};this.overlays.set(mesh,layer);
      }
      // Conservative chunk support rejects only kernels whose entire sphere
      // misses the source bounds. All surviving normal/distance decisions are
      // made by the same GPU kernel on every original vertex.
      candidates.forEach((e,i)=>encode(layer.fields.texture.image.data,e.node,i));layer.fields.count.value=candidates.length;layer.fields.texture.needsUpdate=true;
      layer.overlay.geometry.userData.filmReferenceVersion=(g.attributes.tissueRestPosition??g.attributes.position).version+':'+(g.userData.materialNormals||g.userData.restNormals?'fixed':g.attributes.normal.version);
      const support=filmSupport(layer.overlay.geometry,layer.fields,layer.support);
      if(support!==layer.support){const index=layer.overlay.geometry.index;index.array.set(support.index.array);index.clearUpdateRanges();if(support.index.count)index.addUpdateRange(0,support.index.count);index.needsUpdate=true;layer.overlay.geometry.setDrawRange(0,support.index.count);layer.support=support;}
      total+=support.index.count;
    };
    for(const mesh of this.tissue._meshes.values())visit(mesh,null,null);
    for(const piece of this.tissue.fragments.items.values())visit(piece.mesh,piece.id,piece);
    for(const [source,layer]of this.overlays)if(!active.has(source)){layer.overlay.removeFromParent();layer.overlay.geometry.dispose();layer.overlay.material.dispose();layer.fields.texture.dispose();this.overlays.delete(source);}
    this.geometry.setDrawRange(0,total);this.stats.vertices=total;this.stats.triangles=total/3;this.syncDisplay();
  }
  // Tissue changes at display cadence, independently of 30 Hz fluid physics.
  // Refresh only the exact source vertices whose geometry/rigid pose moved.
  syncDisplay(){
    if(this.gpu){for(const layer of this.overlays.values()){
      const {mesh,piece,overlay}=layer,p=mesh.geometry.attributes.position,n=mesh.geometry.attributes.normal;
      if(layer.positionVersion!==p.version){overlay.geometry.attributes.position.needsUpdate=true;layer.positionVersion=p.version;}
      if(layer.normalVersion!==n.version){overlay.geometry.attributes.normal.needsUpdate=true;layer.normalVersion=n.version;}
      if(piece){overlay.position.copy(piece.position);overlay.quaternion.copy(piece.quaternion);}
    }return;}
    const out=this.geometry.attributes;let changed=false;
    for(const r of this.displayRecords){
      const p=r.mesh.geometry.attributes.position,n=r.mesh.geometry.attributes.normal,piece=r.piece;
      const pose=piece?[...piece.position.toArray(),...piece.quaternion.toArray()]:null;
      if(r.version===p.version&&(!piece||pose.every((v,i)=>v===r.pose[i])))continue;
      for(let i=0;i<r.indices.length;i++){
        const index=r.indices[i],cursor=r.start+i;this.p.fromBufferAttribute(p,index);this.n.fromBufferAttribute(n,index);if(!this.gpu)this.p.addScaledVector(this.n,r.height[index]+.000012);
        if(piece){this.p.applyQuaternion(piece.quaternion).add(piece.position);this.n.applyQuaternion(piece.quaternion);}
        out.position.setXYZ(cursor,this.p.x,this.p.y,this.p.z);out.normal.setXYZ(cursor,this.n.x,this.n.y,this.n.z);
      }
      r.version=p.version;r.pose=pose;changed=true;
    }
    if(changed)for(const a of [out.position,out.normal]){a.clearUpdateRanges();a.addUpdateRange(0,this.stats.vertices*3);a.needsUpdate=true;}
  }
  dispose(){if(this.gpu)this.reset();this.geometry.dispose();this.warmGeometry?.dispose();this.warmFields?.texture.dispose();this.warmMesh?.material.dispose();this.fields.texture.dispose();this.mesh.material.dispose();this.mesh.removeFromParent();}
}
