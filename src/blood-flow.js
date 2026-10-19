import * as THREE from 'three';
import {deformPoint,deformNormal,deformationWeight} from './tissue-worker.js';
import {connectWoundNodes} from './wound-surface.js';
import {BloodNeighbourIndex} from './blood-neighbour-index.js';
import {BloodSurfaceFilm} from './blood-surface-film.js';

// A bounded, conservative surface-film model. All volumes are mm^3. Rates,
// mobility and pressure dwell are illustrative, not patient-calibrated values.
const CELL=.0025,MAX_NODES=320,MAX_DROPS=96;
const keyOf=p=>p.map(v=>Math.round(v/CELL)).join(':');
const hashKey=key=>{let h=2166136261;for(let i=0;i<key.length;i++){h^=key.charCodeAt(i);h=Math.imul(h,16777619);}return(h>>>0)/4294967296;};
const hash=p=>hashKey(keyOf(p));
const vec=p=>new THREE.Vector3(...p);
const pointSegment=(p,a,b)=>{const d=b.clone().sub(a),t=THREE.MathUtils.clamp(p.clone().sub(a).dot(d)/Math.max(1e-20,d.lengthSq()),0,1);return p.distanceTo(a.clone().addScaledVector(d,t));};
const clone=v=>structuredClone(v);

export class BloodFlow {
  constructor(tissue,{gpuSurface=false}={}){
    this.tissue=tissue;this.group=new THREE.Group();this.group.name='physical-blood-film-and-cut-fibres';this.group.layers.enable(1);tissue.group.add(this.group);
    const blood=new THREE.MeshPhysicalMaterial({color:'#610e18',roughness:.25,metalness:0,ior:1.36,clearcoat:.85,clearcoatRoughness:.16});
    const fibre=new THREE.MeshStandardMaterial({color:'#b08065',roughness:.79});
    this.surfaceFilm=new BloodSurfaceFilm(tissue,{gpu:gpuSurface,capacity:MAX_NODES});this.film=this.surfaceFilm.mesh;
    this.pooledFilm=new BloodSurfaceFilm(tissue,{gpu:true});this.poolMesh=this.pooledFilm.mesh;
    this.dropsMesh=new THREE.InstancedMesh(new THREE.SphereGeometry(1,10,7),blood,MAX_DROPS);
    this.fibres=new THREE.InstancedMesh(new THREE.CapsuleGeometry(1,1,2,5),fibre,MAX_NODES);
    for(const m of [this.film,this.poolMesh,this.dropsMesh,this.fibres]){m.layers.enable(1);m.frustumCulled=false;m.castShadow=m.receiveShadow=m===this.fibres;if(m.isInstancedMesh)m.count=0;this.group.add(m);}
    this._surfaceCache=new Map();this._flowOut=new Float64Array(MAX_NODES);this._flowDelta=new Float64Array(MAX_NODES);this._transfers=[];this.reset();
  }
  reset(){this.nodes=[];this.drops=[];this.emitted=0;this.escaped=0;this.reservoir=0;this.clock=0;this.pressureExposure=0;this.lastPressureClock=-1;this.lastPressureContacts=0;this.pressureActive=false;this.pressureContacts=0;this._accumulator=0;this._neighbours=[];this._positionCache=new WeakMap();this._poolFieldCache=new WeakMap();this._fibreRecords=[];this._surfaceCache.clear();this.surfaceFilm.reset();this.pooledFilm.reset();this.render();}
  snapshot(){return{version:1,nodes:clone(this.nodes.map(n=>{const {display,normal,physicalArea,...saved}=n;return saved;})),drops:clone(this.drops),emitted:this.emitted,escaped:this.escaped,reservoir:this.reservoir,clock:this.clock,pressureExposure:this.pressureExposure,lastPressureClock:this.lastPressureClock,lastPressureContacts:this.lastPressureContacts};}
  restore(s){
    this.reset();if(!s)return;
    if(s.version!==1||!Array.isArray(s.nodes)||s.nodes.length>MAX_NODES||!Array.isArray(s.drops)||s.drops.length>MAX_DROPS)throw new Error('Invalid blood-flow snapshot');
    for(const n of s.nodes)if(!Array.isArray(n.reference)||!Array.isArray(n.restNormal)||n.reference.length!==3||n.restNormal.length!==3||![...n.reference,...n.restNormal,n.volume,n.area,n.clot].every(Number.isFinite)||n.volume<0||n.area<=0||n.clot<0||n.clot>1)throw new Error('Invalid blood-film cell');
    for(const d of s.drops){if(![...d.position,...d.velocity,d.volume].every(Number.isFinite)||d.volume<=0)throw new Error('Invalid blood droplet');if(d.surface&&(![d.reference,d.restNormal,d.surfaceNormal].every(a=>Array.isArray(a)&&a.length===3&&a.every(Number.isFinite))||!Number.isFinite(d.area)||d.area<=0||!Number.isFinite(d.clot)||d.clot<0||d.clot>1))throw new Error('Invalid attached blood film');}
    for(const k of ['emitted','escaped','reservoir','clock'])if(!Number.isFinite(s[k])||s[k]<0)throw new Error('Invalid blood-flow quantity');
    this.nodes=clone(s.nodes);this.drops=clone(s.drops);for(const k of ['emitted','escaped','reservoir','clock'])this[k]=s[k];this.updatePositions();this.connect();this.render();
    this.pressureExposure=s.pressureExposure??0;this.lastPressureClock=s.lastPressureClock??-1;this.lastPressureContacts=s.lastPressureContacts??0;
  }
  // Rebuild only after an actual CSG result. Fresh exposed faces, not B or a
  // timer, create perfused sources. Adjacent capsule cells allow film spreading.
  syncSurface({injury=false,selection=null,deferRender=false}={}){
    if(selection){this._applySurfaceSelection(selection.nodes,injury,selection.edges,deferRender);return;}
    const candidates=new Map(),capsule=[];
    const scan=(mesh,fragmentId=null)=>{
      const cached=this._surfaceCache.get(mesh.uuid);if(cached){for(const entry of cached)store(entry);return;}
      const entries=[];
      const prepared=mesh.geometry.userData.woundSurface;
      if(prepared){
        for(const [array,cut]of [[prepared.cuts,true],[prepared.capsule,false]])for(let i=0;i<array.length;i+=8){
          const reference=Array.from(array.subarray(i,i+3)),restNormal=Array.from(array.subarray(i+3,i+6));
          const entry={key:keyOf(reference),reference,restNormal,area:array[i+6],sourceArea:cut?array[i+7]:undefined,cut,fragmentId};entries.push(entry);store(entry);
        }
        this._surfaceCache.set(mesh.uuid,entries);return;
      }
      const g=mesh.geometry,p=g.attributes.tissueRestPosition,n=g.userData.materialNormals??g.userData.restNormals??g.attributes.normal.array,mask=g.attributes.tissueCutMask?.array,idx=g.index?.array;
      if(!p||!mask||!idx)return;
      for(let i=0;i<idx.length;i+=3){
        const ids=[idx[i],idx[i+1],idx[i+2]],cut=ids.reduce((v,id)=>v+mask[id],0)/3;
        if(cut<=.55&&(fragmentId!==null||i%27!==0))continue;
        const a=new THREE.Vector3().fromBufferAttribute(p,ids[0]),b=new THREE.Vector3().fromBufferAttribute(p,ids[1]),c=new THREE.Vector3().fromBufferAttribute(p,ids[2]);
        const area=b.clone().sub(a).cross(c.clone().sub(a)).length()*.5*1e6;if(area<.015)continue;
        const reference=a.add(b).add(c).multiplyScalar(1/3).toArray(),restNormal=ids.reduce((v,id)=>v.add(new THREE.Vector3().fromArray(n,id*3)),new THREE.Vector3()).normalize().toArray();
        const entry={key:keyOf(reference),reference,restNormal,area:Math.min(6.25,area),cut:cut>.55,fragmentId};
        entries.push(entry);store(entry);
      }
      this._surfaceCache.set(mesh.uuid,entries);
    };
    const store=entry=>{entry.seed??=hashKey(entry.key);if(entry.cut){const old=candidates.get(entry.key),sourceArea=Math.min(6.25,(old?.sourceArea??0)+(entry.sourceArea??entry.area));if(!old||old.area<entry.area)candidates.set(entry.key,{...entry,sourceArea});else old.sourceArea=sourceArea;}else capsule.push(entry);};
    const activeMeshes=new Set([...this.tissue._meshes.values(),...[...this.tissue.fragments.items.values()].map(p=>p.mesh)].map(m=>m.uuid));
    for(const id of this._surfaceCache.keys())if(!activeMeshes.has(id))this._surfaceCache.delete(id);
    for(const mesh of this.tissue._meshes.values())scan(mesh);
    for(const piece of this.tissue.fragments.items.values())scan(piece.mesh,piece.id);
    const cutCells=[...candidates.values()].sort((a,b)=>a.seed-b.seed).slice(0,240);
    const nearLow=[Infinity,Infinity,Infinity],nearHigh=[-Infinity,-Infinity,-Infinity];
    for(const c of cutCells)for(let i=0;i<3;i++){nearLow[i]=Math.min(nearLow[i],c.reference[i]-.012);nearHigh[i]=Math.max(nearHigh[i],c.reference[i]+.012);}
    let adjacent=0;
    for(const c of capsule){
      if(adjacent>=80)break;
      if(c.reference.some((v,i)=>v<nearLow[i]||v>nearHigh[i]))continue;
      if(!candidates.has(c.key)&&cutCells.some(n=>n.reference.reduce((s,v,i)=>s+(v-c.reference[i])**2,0)<.000144)){candidates.set(c.key,c);adjacent++;}
    }
    const selected=[...cutCells,...[...candidates.values()].filter(n=>!n.cut).slice(0,MAX_NODES-cutCells.length)];
    this._applySurfaceSelection(selected,injury);
  }
  _applySurfaceSelection(selected,injury,edges=null,deferRender=false){
    const previousNodes=this.nodes,previous=new Map(this.nodes.map(n=>[n.key,n]));
    this.nodes=selected.map(c=>{
      const old=previous.get(c.key),fresh=injury&&c.cut&&(!old?.cut||vec(c.reference).distanceTo(vec(old.reference))>.00025);
      previous.delete(c.key);
      const unchanged=old&&old.fragmentId===c.fragmentId&&old.reference.every((v,i)=>v===c.reference[i])&&old.restNormal.every((v,i)=>v===c.restNormal[i]);
      const node=unchanged?old:{...c,area:6.25,volume:old?.volume??0};
      Object.assign(node,{cut:c.cut,sourceArea:c.sourceArea,clot:fresh||!c.cut?0:(old?.clot??0),injured:c.cut&&(fresh||old?.injured||false),pressure:0});return node;
    });
    for(const old of previous.values())if(old.volume>0){const p=old.display??this.displayPoint(old);this.shed(p,old.volume);}
    this.updatePositions();if(this.nodes.length!==previousNodes.length||this.nodes.some((n,i)=>n!==previousNodes[i])){if(edges)this._neighbours=Array.from({length:edges.length/2},(_,i)=>[edges[i*2],edges[i*2+1]]);else this.connect();}
    // Ownership follows disconnected material, including liquid that contacted
    // the capsule before its component was separated by a real CSG result.
    for(const d of this.drops)if(d.surface&&d.fragmentId==null){const piece=this.tissue.fragmentAtReference?.(d.reference);if(piece)d.fragmentId=piece.id;}
    if(deferRender)this.renderDirty=true;else this.render();
  }
  displayPoint(n){
    const piece=n.fragmentId!=null?this.tissue.getFragment(n.fragmentId):null;
    if(piece)return vec(deformPoint(n.reference,piece.deformation)).sub(piece.frozenCenter).applyQuaternion(piece.quaternion).add(piece.position);
    return vec(deformPoint(n.reference,this.tissue._deformation));
  }
  updatePositions(){
    for(const n of this.nodes){
      const piece=n.fragmentId!=null?this.tissue.getFragment(n.fragmentId):null,d=piece?piece.deformation:this.tissue._deformation;
      const pose=piece?[...piece.position.toArray(),...piece.quaternion.toArray()]:null,last=this._positionCache.get(n);
      if(last&&last.piece===piece&&last.deformation===d&&(!piece||pose.every((v,i)=>v===last.pose?.[i])))continue;
      let materialPoint=last?.materialPoint,materialNormal=last?.materialNormal,physicalArea=last?.physicalArea;
      if(!last||last.piece!==piece||last.deformation!==d){
        // Weight and Jacobian come from the same expensive material mapping.
        // A rigid specimen changes pose without changing either of them.
        const mapping=d?deformationWeight(n.reference,d):null,gradient=mapping?.gradient;
        materialPoint=vec(d?n.reference.map((v,i)=>v+d.displacement[i]*mapping.weight):n.reference);
        if(piece)materialPoint.sub(piece.frozenCenter);
        materialNormal=vec(d?deformNormal(n.restNormal,gradient,d.displacement):n.restNormal);
        const determinant=d?1+vec(gradient).dot(vec(d.displacement)):1;
        const areaScale=d?vec(n.restNormal).multiplyScalar(determinant).addScaledVector(vec(gradient),-vec(n.restNormal).dot(vec(d.displacement))).length():1;
        physicalArea=n.area*THREE.MathUtils.clamp(areaScale,.01,10);
      }
      n.display=materialPoint.clone();if(piece)n.display.applyQuaternion(piece.quaternion).add(piece.position);
      n.normal=materialNormal.clone();n.physicalArea=physicalArea;
      if(piece)n.normal.applyQuaternion(piece.quaternion);n.normal.normalize();
      this._positionCache.set(n,{piece,deformation:d,pose,materialPoint,materialNormal,physicalArea});
    }
  }
  connect(){
    this._neighbours=connectWoundNodes(this.nodes);
  }
  shed(position,volume){
    if(volume<=0)return;
    if(this.drops.length<MAX_DROPS)this.drops.push({position:position.toArray(),velocity:[0,0,0],volume});
    else{
      // Coalesce into the closest represented liquid parcel rather than hide
      // overflowing blood in an invisible counter or silently discard mass.
      let closest=this.drops[0],best=Infinity;
      for(const d of this.drops){const distance=vec(d.position).distanceToSquared(position);if(distance<best){best=distance;closest=d;}}
      const total=closest.volume+volume;closest.position=vec(closest.position).multiplyScalar(closest.volume/total).addScaledVector(position,volume/total).toArray();closest.velocity=closest.velocity.map(v=>v*closest.volume/total);closest.volume=total;
      closest.surface=false;
    }
  }
  update(dt,{pressureSegments=[]}={}){
    if(!Number.isFinite(dt)||dt<=0)return;
    this._accumulator+=Math.min(dt,.1);this.pressureActive=pressureSegments.length>0;
    if(this._accumulator<1/30)return;
    const h=this._accumulator;this._accumulator=0;this.clock+=h;this.updatePositions();this.pressureContacts=0;
    const inverse=this.tissue.group.getWorldQuaternion(new THREE.Quaternion()).invert(),up=new THREE.Vector3(0,1,0).applyQuaternion(inverse),gravity=up.clone().multiplyScalar(-9.81);
    for(const n of this.nodes){
      const distance=pressureSegments.reduce((best,s)=>Math.min(best,pointSegment(n.display,s.a,s.b)),Infinity);
      n.pressure=THREE.MathUtils.clamp(1-distance/.003,0,1);if(n.pressure>.05&&n.cut)this.pressureContacts++;
      if(n.injured&&n.fragmentId==null){
        n.clot=THREE.MathUtils.clamp(n.clot+h*(n.pressure>.25?n.pressure*.12:-.00015),0,1);
        const rate=(n.sourceArea??n.area)*.075*(.55+(n.seed??hash(n.reference)))*(1-n.clot)**3*(1-.99*n.pressure);
        const volume=rate*h;n.volume+=volume;this.emitted+=volume;
      }
    }
    if(this.pressureContacts){this.lastPressureContacts=this.pressureContacts;this.lastPressureClock=this.clock;this.pressureExposure+=h;}
    // Reuse storage without changing traversal, summation order or fluid steps.
    const transfers=this._transfers,out=this._flowOut,delta=this._flowDelta;let transferCount=0;out.fill(0);delta.fill(0);
    for(const [i,j]of this._neighbours){
      const a=this.nodes[i],b=this.nodes[j],distance=a.display.distanceTo(b.display)*1000;
      if(distance>.006*1000||distance<.01)continue;
      const ha=a.volume/a.physicalArea,hb=b.volume/b.physicalArea,potential=(a.display.dot(up)-b.display.dot(up))*1000+ha-hb+(a.pressure-b.pressure)*.7;
      const from=potential>0?i:j,to=potential>0?j:i,source=this.nodes[from];
      const mobility=.02+.98*(1-Math.max(a.clot,b.clot))**3;
      const volume=Math.min(source.volume,Math.abs(potential)*Math.max(ha,hb)**2*.6*mobility*h/distance);if(volume<=0)continue;
      const transfer=transfers[transferCount++]??(transfers[transferCount-1]=[0,0,0]);transfer[0]=from;transfer[1]=to;transfer[2]=volume;out[from]+=volume;
    }
    for(let i=0;i<transferCount;i++){const [from,to,volume]=transfers[i];const amount=volume*Math.min(1,this.nodes[from].volume/Math.max(out[from],1e-20));delta[from]-=amount;delta[to]+=amount;}
    for(let i=0;i<this.nodes.length;i++){
      const n=this.nodes[i];n.volume=Math.max(0,n.volume+delta[i]);
      const limit=n.physicalArea*(n.normal.dot(up)<.1?.25:1.15);
      if(n.volume>limit){const volume=n.volume-limit;n.volume=limit;this.shed(n.display.clone().addScaledVector(n.normal,.0003),volume);}
    }
    const retained=[];
    if(this.drops.length)this.tissue.prepareBloodContacts?.();
    const deposition=this.drops.length?new BloodNeighbourIndex(this.nodes):null;
    // No rigid organ transform changes during a fluid step. Refresh it once;
    // localToWorld otherwise walks the scene graph for every droplet substep.
    this.tissue.group.updateWorldMatrix(true,false);
    const worldMatrix=this.tissue.group.matrixWorld;
    const depositionHit={},previous=new THREE.Vector3(),worldPoint=new THREE.Vector3();
    for(const d of this.drops){
      const p=vec(d.position),v=vec(d.velocity),steps=Math.ceil(h/.008),step=h/steps;
      let deposited=false,lastSurface=null;
      if(d.surface&&d.reference){const pose=this._parcelPose(d);p.copy(pose.position).addScaledVector(pose.normal,.000015);d.surfaceNormal=pose.normal.toArray();}
      for(let i=0;i<steps;i++){
        previous.copy(p);
        v.addScaledVector(gravity,step).multiplyScalar(Math.exp(-step*(d.surface?200+600*(d.clot??0):.5)));p.addScaledVector(v,step);
        const {node:nearest,distance:best}=deposition.nearest(p,v,depositionHit);
        if(nearest&&best<.0012){nearest.volume+=d.volume;deposited=true;break;}
        // Query the displayed cut mesh through its shared/refitted hierarchy.
        // Replaying all historical deformation maps per droplet/substep made
        // contact progressively slower as cuts accumulated. The first inward
        // crossing also catches a fast centre line crossing a thin surface.
        const radius=d.surface ? .00015 : Math.cbrt(d.volume*3/(4*Math.PI))*.001;
        const surface=this.tissue.collideBloodDrop?.(previous,p,radius,true);
        if(surface){lastSurface=surface;d.surface=true;p.copy(surface).addScaledVector(surface.normal,.000015);const inward=v.dot(surface.normal);if(inward<0)v.addScaledVector(surface.normal,-inward);v.multiplyScalar(Math.exp(-step*8));}
        if(worldPoint.copy(p).applyMatrix4(worldMatrix).y<.958){this.escaped+=d.volume;deposited=true;break;}
      }
      if(!deposited){
        if(lastSurface)this._wetParcel(d,lastSurface,h,pressureSegments);else d.surface=false;
        d.position=p.toArray();d.velocity=v.toArray();retained.push(d);
      }
    }
    this.drops=retained;this._coalesceSurfaceParcels();this.render();
  }
  _wetParcel(d,surface,dt,pressureSegments=[]){
    const piece=surface.fragmentId!=null?this.tissue.getFragment(surface.fragmentId):null;
    const reference=piece?vec(this.tissue.fragments.referencePoint(piece,surface)):(this.tissue.toReferencePoint?.(surface)??surface.clone());
    const normal=surface.normal.clone(),deformation=piece?piece.deformation:this.tissue._deformation;
    if(piece)normal.applyQuaternion(piece.quaternion.clone().invert());
    if(deformation){const g=vec(deformationWeight(reference.toArray(),deformation).gradient);normal.addScaledVector(g,vec(deformation.displacement).dot(normal)).normalize();}
    d.reference=reference.toArray();d.restNormal=normal.toArray();d.surfaceNormal=surface.normal.toArray();d.surface=true;d.fragmentId=piece?.id??null;
    d.area??=Math.max(3.2,d.volume/.4);
    const target=Math.max(3.2,d.volume/.12),r=Math.sqrt(d.area/Math.PI),goal=Math.sqrt(target/Math.PI);
    d.area=Math.PI*(r+THREE.MathUtils.clamp(goal-r,-dt*.7,dt*.7))**2;
    const pressure=pressureSegments.reduce((best,s)=>Math.min(best,pointSegment(surface,s.a,s.b)),Infinity);
    d.clot=THREE.MathUtils.clamp((d.clot??0)+dt*(pressure<.003?.1:-.00015),0,1);
  }
  _parcelPose(d){
    const piece=d.fragmentId!=null?this.tissue.getFragment(d.fragmentId):null,deformation=piece?piece.deformation:this.tissue._deformation;
    const normal=vec(deformation?deformNormal(d.restNormal,deformationWeight(d.reference,deformation).gradient,deformation.displacement):d.restNormal);
    if(piece)normal.applyQuaternion(piece.quaternion);
    return {position:this.displayPoint(d),normal:normal.normalize()};
  }
  _coalesceSurfaceParcels(){
    const remove=new Set();
    for(let i=0;i<this.drops.length;i++){
      const a=this.drops[i];if(!a.surface||remove.has(a))continue;
      for(let j=i+1;j<this.drops.length;j++){
        const b=this.drops[j];if(!b.surface||remove.has(b)||(a.fragmentId??null)!==(b.fragmentId??null))continue;
        const dx=a.position[0]-b.position[0],dy=a.position[1]-b.position[1],dz=a.position[2]-b.position[2],radius=(Math.sqrt(a.area/Math.PI)+Math.sqrt(b.area/Math.PI))*.001;
        if(Math.sqrt(dx*dx+dy*dy+dz*dz)>radius*.6||a.surfaceNormal[0]*b.surfaceNormal[0]+a.surfaceNormal[1]*b.surfaceNormal[1]+a.surfaceNormal[2]*b.surfaceNormal[2]<.7)continue;
        const total=a.volume+b.volume,w=b.volume/total,point=vec(a.position).lerp(vec(b.position),w),normal=vec(a.surfaceNormal).add(vec(b.surfaceNormal)).normalize();
        const hit=this.tissue.collideBloodDrop?.(point.clone().addScaledVector(normal,.002),point.clone().addScaledVector(normal,-.002),.00015,true);
        if(!hit||(hit.fragmentId??null)!==(a.fragmentId??null))continue;
        a.position=hit.clone().addScaledVector(hit.normal,.000015).toArray();a.velocity=a.velocity.map((v,k)=>v*(1-w)+b.velocity[k]*w);a.clot=(a.clot??0)*(1-w)+(b.clot??0)*w;a.volume=total;a.area+=b.area;
        this._wetParcel(a,hit,0);remove.add(b);
      }
    }
    if(remove.size)this.drops=this.drops.filter(d=>!remove.has(d));
  }
  flushRender(){if(this.renderDirty)this.render();}
  render(){
    this.renderDirty=false;
    const m=new THREE.Object3D(),up=new THREE.Vector3(0,1,0);let fibres=0;
    this.surfaceFilm.update(this.nodes);
    const pools=[];for(const d of this.drops){if(!d.surface||!d.reference)continue;let field=this._poolFieldCache.get(d);if(!field){field={version:0};this._poolFieldCache.set(d,field);}if(field.area!==d.area||field.fragmentId!==d.fragmentId||!field.reference?.every((v,i)=>v===d.reference[i])||!field.restNormal?.every((v,i)=>v===d.restNormal[i]))field.version++;Object.assign(field,{reference:d.reference,restNormal:d.restNormal,area:d.area,physicalArea:d.area,volume:d.volume,clot:d.clot??0,fragmentId:d.fragmentId??null});pools.push(field);}this.pooledFilm.update(pools);
    let changed=false;
    for(const n of this.nodes){
      if(!n.display||!n.cut)continue;
      const p=n.display,normal=n.normal,seed=n.seed??hash(n.reference),old=this._fibreRecords[fibres];
      // Fluid volume/clot changes do not alter a static tissue fibre. Preserve
      // every instance and exact matrix; only rewrite poses that actually moved.
      if(!old||old.node!==n||old.x!==p.x||old.y!==p.y||old.z!==p.z||old.nx!==normal.x||old.ny!==normal.y||old.nz!==normal.z||old.seed!==seed){
        const tangent=new THREE.Vector3(1,.3,.5).cross(normal).normalize();
        m.position.copy(p).addScaledVector(normal,.00007);m.quaternion.setFromUnitVectors(up,tangent);m.scale.set(.000025,.00020+seed*.00030,.000025);m.updateMatrix();this.fibres.setMatrixAt(fibres,m.matrix);
        this._fibreRecords[fibres]={node:n,x:p.x,y:p.y,z:p.z,nx:normal.x,ny:normal.y,nz:normal.z,seed};changed=true;
      }
      fibres++;
    }
    this._fibreRecords.length=fibres;this.fibres.count=fibres;if(changed)this.fibres.instanceMatrix.needsUpdate=true;
    let airborne=0;for(const d of this.drops){if(d.surface)continue;const r=Math.cbrt(d.volume*3/(4*Math.PI))*.001;m.position.fromArray(d.position);m.quaternion.identity();m.scale.setScalar(r);m.updateMatrix();this.dropsMesh.setMatrixAt(airborne++,m.matrix);}
    this.dropsMesh.count=airborne;this.dropsMesh.instanceMatrix.needsUpdate=true;
  }
  get metrics(){
    const retained=this.nodes.reduce((s,n)=>s+n.volume,0)+this.drops.reduce((s,d)=>s+d.volume,0)+this.reservoir;
    const active=this.nodes.filter(n=>n.injured&&n.fragmentId==null&&n.clot<.95);
    return{emittedMl:this.emitted/1000,retainedMl:retained/1000,escapedMl:this.escaped/1000,balanceErrorMm3:this.emitted-retained-this.escaped,activeSources:active.length,pressureContacts:this.pressureContacts,pressureActive:this.pressureActive,pressureExposureSeconds:this.pressureExposure,lastPressureContacts:this.lastPressureContacts,recentPressure:this.clock-this.lastPressureClock<2&&this.lastPressureContacts>0,filmCells:this.nodes.length,droplets:this.drops.length,airborneDrops:this.drops.filter(d=>!d.surface).length,surfacePools:this.drops.filter(d=>d.surface).length,filmTriangles:this.surfaceFilm.stats.triangles+this.pooledFilm.stats.triangles,model:'Conservative connected surface film, coalescing wetting pools and airborne gravity drops; illustrative perfusion/compression, not clinical haemostasis'};
  }
  dispose(){this.surfaceFilm.dispose();this.pooledFilm.dispose();for(const m of [this.dropsMesh,this.fibres]){m.geometry.dispose();m.material.dispose();}this.group.removeFromParent();}
}
