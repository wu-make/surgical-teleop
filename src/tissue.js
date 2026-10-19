import * as THREE from 'three';
import { validateCut, normalizeMetadata, distanceToCut, cutBounds, nodeIndex, normalizeDeformation, deformationWeight, deformationMinimumScale, LOCAL_TRACTION, deformPoint, inverseDeformPoint } from './tissue-worker.js';
import { createTissueMaterial } from './tissue-material.js';
import { TissueFragments } from './tissue-fragments.js';
import { BloodFlow } from './blood-flow.js';
import {closestParentSurface,closestParentSegment,firstParentHit} from './tissue-contact.js';
import {MeshBroadPhase} from './mesh-broad-phase.js';
import {CutSpatialIndex} from './cut-spatial-index.js';

const vectorArray = point => Array.isArray(point) ? [...point] : [point.x, point.y, point.z];
// Accepted cutter records are append-only. History can share these immutable
// records while owning its array; public exports still receive detached copies.
const freezeRecord = value => { if(value && typeof value === 'object' && !Object.isFrozen(value)){for(const child of Object.values(value))freezeRecord(child);Object.freeze(value);}return value; };
const copyCuts = cuts => cuts.map(cut => validateCut(cut));
const squaredDistanceToBox = (p, low, high) => Math.max(low[0] - p[0], 0, p[0] - high[0]) ** 2 + Math.max(low[1] - p[1], 0, p[1] - high[1]) ** 2 + Math.max(low[2] - p[2], 0, p[2] - high[2]) ** 2;
// An outside bounding-box distance is a lower bound on distance to its solid.
const canSkipBox = (squaredDistance, currentDistance, scale = 1) => squaredDistance > 0 && (currentDistance >= 0 || squaredDistance * scale * scale >= currentDistance * currentDistance);

/** A real sampled organ volume; the worker alone owns and modifies its SDF. */
export class TissueVolume {
  constructor({gpuBlood=false}={}) {
    this.group = new THREE.Group();
    this.group.name = 'anatomical-liver-volume';
    this.ready = false;
    this.busy = false;
    this.removedVolumeMm3 = 0;
    this.totalVolumeMm3 = 0;
    this.voxelMm = 1.5;
    this.error = null;
    this._meshes = new Map();
    this._bloodBroadPhase=new MeshBroadPhase();this._bloodQueryMeshes=[];
    this.updateTimings={};
    this.transitionTimings=[];
    this._cuts = [];
    this._cutGroups = [];
    this._cutGroupMap = new Map();
    this._indexedCuts = this._cuts;
    this._indexedCutCount = 0;
    this._queryStats = { queries: 0, mappedGroups: 0, evaluatedCutters: 0, skippedGroups: 0, skippedCutters: 0 };
    this._commands = [];
    this._epoch = 0;
    this._sequence = 0;
    this._inFlight = null;
    this._disposed = false;
    this._deformation = null;
    this._affectedVertices = 0;
    this._deformationStats = { cacheBuilds: 0, radiusUpdates: 0, movedVertices: 0 };
    this.material = createTissueMaterial();
    this.fragments = new TissueFragments(this);
    this.blood=new BloodFlow(this,{gpuSurface:gpuBlood});
    this._separations = [];
    this._excludedValues = new Map();
    this._restoringFragmentPoses = null;
    this._contactQueryCache=new Map();
    this._contactHistoryScale=1;this._contactHasDeformedCuts=false;
    this._contactRevision=0;
  }

  async load(urlbase = './assets/liver-volume') {
    if (this._disposed) throw new Error('TissueVolume has been disposed');
    if (this.worker) throw new Error('This tissue volume has already been loaded');
    let base = String(urlbase).replace(/\.(?:json|bin)$/, '');
    if (base.endsWith('/')) base += 'liver-volume';
    const [metadataResponse, volumeResponse] = await Promise.all([fetch(`${base}.json`), fetch(`${base}.bin`)]);
    if (!metadataResponse.ok || !volumeResponse.ok) throw new Error('Could not load the anatomical liver volume');
    const [metadata, buffer] = await Promise.all([metadataResponse.json(), volumeResponse.arrayBuffer()]);
    this.metadata = normalizeMetadata(metadata);
    this._baseField = new Float32Array(buffer.slice(0));
    this.worker = new Worker(new URL('./tissue-worker.js', import.meta.url), { type: 'module' });
    this.worker.onmessage = ({ data }) => this._receive(data);
    this.worker.onerror = event => this._fail(new Error(event.message || 'Tissue geometry worker failed'));
    await this._enqueue({ type: 'init', metadata, buffer, transfer: [buffer] });
    this.ready = true;
    this.onChange?.();
    return this;
  }

  cut(point, radius) { return this.cutSegment(point, point, radius); }

  cutSegment(start, end, radius) {return this.cutSegments([{a:start,b:end}],radius);}

  cutSegments(segments,radius){return this.cutSamples([{segments,deformation:this._deformation}],radius);}

  /** Ordered, complete CAD blade samples, each with its own frozen material
   * map. A pass is bounded to 64 real blade segments, not 64 render frames. */
  cutSamples(samples,radius){
    if (!this.ready || this._disposed) return Promise.resolve({ changed: false, removedMm3: 0, reason: 'not-ready' });
    if(!samples?.length)return Promise.resolve({changed:false,removedMm3:0,reason:'no-blade'});
    let primitives;
    try {
      if(samples.reduce((n,sample)=>n+(sample.segments?.length??0),0)>64)throw new Error('A cutting pass supports at most 64 source blade segments');
      primitives=samples.filter(sample=>sample.segments?.length).map(sample=>{
        const points=sample.segments.map(segment=>({a:vectorArray(segment.a),b:vectorArray(segment.b)}));
        return freezeRecord(validateCut({...points[0],...(points.length>1?{segments:points}:{}),radius,deformation:sample.deformation}));
      });
    }
    catch (error) { return Promise.reject(error); }
    if(!primitives.length)return Promise.resolve({changed:false,removedMm3:0,reason:'no-blade'});
    const key=JSON.stringify(primitives);
    if(this._lastCompletedCut?.key===key&&this._lastCompletedCut.changed)return Promise.resolve({changed:false,removedMm3:0,reason:'already-cut',removedVolumeMm3:this.removedVolumeMm3});
    if(this._cuts.length+primitives.length>50000)return Promise.resolve({changed:false,removedMm3:0,reason:'history-limit'});
    const epoch=this._epoch,before=this.removedVolumeMm3;this._cuts.push(...primitives);
    return this._enqueue({type:'cut',cuts:primitives}).then(result=>{
      const removed=result.removedMm3>1e-8||this.removedVolumeMm3>before+1e-8||(!Number.isFinite(before)&&result.changed);
      if(epoch===this._epoch)this._lastCompletedCut={key,changed:!!removed};return result;
    },error=>{
      if(epoch===this._epoch){const failed=new Set(primitives);this._cuts=this._cuts.filter(cut=>!failed.has(cut));this._lastCompletedCut=null;}
      throw error;
    });
  }

  snapshot({forHistory=false}={}) { return { version: 2, cuts: forHistory?this._cuts.slice():copyCuts(this._cuts), deformation: this._deformation ? normalizeDeformation(this._deformation) : null,
    separations: structuredClone(this._separations), fragments: this.fragments.snapshot(),blood:this.blood.snapshot() }; }

  async restore(snapshot) {
    if (!this.ready || this._disposed) return { changed: false, reason: 'not-ready' };
    if (!snapshot || ![1, 2].includes(snapshot.version) || !Array.isArray(snapshot.cuts) || snapshot.cuts.length > 50000) throw new Error('Invalid tissue snapshot');
    const cuts = snapshot.cuts.map(validateCut);
    this._epoch++;
    for (const command of this._commands.splice(0)) command.resolve({ changed: false, cancelled: true });
    this._cuts = copyCuts(cuts).map(freezeRecord);
    this._lastCompletedCut=null;
    this._restoringFragmentPoses = new Map((snapshot.fragments ?? []).map(piece => [piece.id, structuredClone(piece)]));
    this._restoringBlood=structuredClone(snapshot.blood??null);
    this.setGrasp(snapshot.deformation ?? null);
    return this._enqueue({ type: 'restore', cuts, separations: structuredClone(snapshot.separations ?? []) });
  }

  reset() { return this.restore({ version: 1, cuts: [] }); }

  toReferencePoint(point) { return new THREE.Vector3().fromArray(inverseDeformPoint(vectorArray(point), this._deformation)); }
  deformPoint(point) { return new THREE.Vector3().fromArray(deformPoint(vectorArray(point), this._deformation)); }
  queryReferenceDistance(point) { return this._sampleReferenceDistance(vectorArray(point)); }
  getFragment(id) { return this.fragments.items.get(id) ?? null; }
  fragmentAtReference(point) { return this.fragments.atReference(point); }
  findFragmentAt(point, margin = .006) { return this.fragments.nearest(point, margin)?.id ?? null; }
  findSpecimenGraspPoint(point, margin = .35) { return this.fragments.surfacePoint(point, margin); }
  attachFragment(id, anchor, quaternion) { return this.fragments.attach(id, anchor, quaternion); }
  moveHeldFragment(id, point, quaternion) { return this.fragments.move(id, point, quaternion); }
  releaseFragment(id) { return this.fragments.release(id); }
  updateFragments(dt) { this.fragments.update(dt); }
  prepareBloodContacts(){this._bloodBroadPhase.sync(this._meshes.values());}
  collideBloodDrop(start,end,radius,prepared=false){
    if(!prepared)this.prepareBloodContacts();
    const meshes=this._bloodBroadPhase.query(start,end,radius+.00005,this._bloodQueryMeshes);
    let crossing=firstParentHit(meshes,start,end),surface=crossing?null:closestParentSurface(meshes,end,radius+.00005);
    if(surface&&end.clone().sub(surface).dot(surface.normal)>=radius)surface=null;
    let best=surface?surface.distanceToSquared(end):Infinity;
    for(const piece of this.fragments.items.values()){
      // Reject in organ coordinates first; retain the complete frozen specimen
      // triangles and the same hierarchy used for the parent surface.
      const box=piece.box,margin=radius+.00005;
      if(box&&(Math.max(start.x,end.x)<box.min.x-margin||Math.min(start.x,end.x)>box.max.x+margin||Math.max(start.y,end.y)<box.min.y-margin||Math.min(start.y,end.y)>box.max.y+margin||Math.max(start.z,end.z)<box.min.z-margin||Math.min(start.z,end.z)>box.max.z+margin))continue;
      const inverse=piece.quaternion.clone().invert(),a=start.clone().sub(piece.position).applyQuaternion(inverse),b=end.clone().sub(piece.position).applyQuaternion(inverse);
      const transform=p=>{p.applyQuaternion(piece.quaternion).add(piece.position);p.normal.applyQuaternion(piece.quaternion);p.fragmentId=piece.id;return p;};
      const hit=firstParentHit([piece.mesh],a,b);
      if(hit&&(!crossing||hit.travel<crossing.travel))crossing=transform(hit);
      const near=crossing?null:closestParentSurface([piece.mesh],b,radius+.00005);
      if(near&&b.clone().sub(near).dot(near.normal)<radius){const distance=near.distanceToSquared(b);if(distance<best){best=distance;surface=transform(near);}}
    }
    return crossing??surface;
  }
  get fragmentMetrics() { return this.fragments.metrics; }

  /** Continuous local distance to the current organ; useful for contact gating. */
  sampleDistance(point) {
    if (!this._baseField) return Infinity;
    const display = vectorArray(point);
    if (display.some(v => !Number.isFinite(v))) return Infinity;
    return this._sampleReferenceDistance(inverseDeformPoint(display, this._deformation));
  }

  /** Signed displayed-space contact distance within margin. Far exterior
   * queries may return Infinity. sampleDistance deliberately retains the
   * material-level-set semantics required by CSG and volume replay. */
  contactDistance(point,margin=.006){
    if(!point)return Infinity;
    const coordinates=vectorArray(point);
    if(coordinates.length!==3||!coordinates.every(Number.isFinite)||!Number.isFinite(margin)||margin<=0)return Infinity;
    const raw=this.sampleDistance(coordinates);
    if(!this._deformation&&!this._contactHasDeformedCuts)return raw;
    const result=this._parentContact(coordinates,margin,raw);
    if(result)return (raw<0?-1:1)*result.distance;
    return raw<0?raw*this._contactMinimumScale():Infinity;
  }

  /** Complete displayed-space blade contact. point is on the blade, surface
   * is on the parent, and t is the blade interpolation fraction. */
  contactSegments(segments,margin=.0032){
    // Adjacent CAD blade segments share endpoints. Within this synchronous
    // batch, tissue cannot change; reuse exact signed samples, not geometry.
    const samples=new Map();return segments.map(({a,b})=>this.contactSegment(a,b,margin,samples));
  }

  contactSegment(start,end,margin=.0032,samples=null){
    const a=vectorArray(start),b=vectorArray(end),miss={contact:false,distance:Infinity,point:null,surface:null,t:null,inside:false};
    if(a.length!==3||b.length!==3||![...a,...b,margin].every(Number.isFinite)||margin<=0)return miss;
    const from=new THREE.Vector3(...a),to=new THREE.Vector3(...b);
    const steps=this._meshes.size?2:Math.max(2,Math.ceil(from.distanceTo(to)/Math.min(.00075,margin*.5)));
    for(let i=0;i<=steps;i++){
      const t=i/steps,point=from.clone().lerp(to,t);let raw;
      if(samples){const key=point.x+','+point.y+','+point.z;if(samples.has(key))raw=samples.get(key);else{raw=this.sampleDistance(point);samples.set(key,raw);}}
      else raw=this.sampleDistance(point);
      if(raw<0)return {contact:true,distance:raw*this._contactMinimumScale(),point,surface:null,t,inside:true};
      if(!this._meshes.size){const distance=this.contactDistance(point,margin);if(distance<=margin)return {contact:true,distance,point,surface:null,t,inside:false};}
    }
    const closest=closestParentSegment(this._meshes.values(),from,to,margin);
    return closest?{...closest,contact:true,inside:false}:miss;
  }

  _contactMinimumScale(){
    // A historical display-space cutter remains a non-metric implicit field
    // after recoil. Its stretch and trilinear interpolation also belong in the
    // conservative gate, even when current tissue deformation is null.
    return deformationMinimumScale(this._deformation)*this._contactHistoryScale/Math.sqrt(3);
  }

  _parentContact(coordinates,margin,raw=this.sampleDistance(coordinates)){
    const key=[this._epoch,this._cuts.length,...coordinates,margin].join(',');
    if(this._contactQueryCache.has(key))return this._contactQueryCache.get(key);
    const scale=this._contactMinimumScale(),initial=new THREE.Vector3(...coordinates);
    let result=null;
    let nearMesh=this._meshes.size===0;
    for(const mesh of this._meshes.values())if(mesh.geometry.boundingBox.distanceToPoint(initial)<=margin){nearMesh=true;break;}
    if(nearMesh&&Number.isFinite(raw)&&Math.abs(raw)*scale<=margin){
      const surface=initial.clone(),gradient=new THREE.Vector3(),low=new THREE.Vector3(),high=new THREE.Vector3();
      const epsilon=Math.min(Math.min(...this.metadata.spacing)*.2,.00025);
      for(let iteration=0;iteration<14;iteration++){
        const d=this.sampleDistance(surface);if(!Number.isFinite(d))break;
        for(let axis=0;axis<3;axis++){
          low.copy(surface);high.copy(surface);low.setComponent(axis,low.getComponent(axis)-epsilon);high.setComponent(axis,high.getComponent(axis)+epsilon);
          gradient.setComponent(axis,(this.sampleDistance(high)-this.sampleDistance(low))/(2*epsilon));
        }
        const squared=gradient.lengthSq();if(!Number.isFinite(squared)||squared<1e-12)break;
        if(Math.abs(d)<1e-7){
          const distance=surface.distanceTo(initial);
          if(distance<=margin){surface.normal=gradient.clone().normalize();result={surface,distance};}
          break;
        }
        const step=-d/squared,maxStep=Math.max(.003,margin);
        surface.addScaledVector(gradient,Math.max(-maxStep/Math.sqrt(squared),Math.min(maxStep/Math.sqrt(squared),step)));
        if(surface.distanceTo(initial)>margin*2+.003)break;
      }
    }
    if(nearMesh&&!result&&(!Number.isFinite(raw)||Math.abs(raw)*scale<=margin)){
      const surface=closestParentSurface(this._meshes.values(),initial,margin);
      if(surface)result={surface,distance:surface.distanceTo(initial)};
    }
    if(this._contactQueryCache.size>=64)this._contactQueryCache.clear();
    this._contactQueryCache.set(key,result);return result;
  }

  _sampleReferenceDistance(p) {
    const meta = this.metadata;
    if (p.some(v => !Number.isFinite(v))) return Infinity;
    // Same eight voxels, weights and accumulation order, without four short
    // arrays per SDF call in each contact/gradient projection iteration.
    const gx=(p[0]-meta.origin[0])/meta.spacing[0],gy=(p[1]-meta.origin[1])/meta.spacing[1],gz=(p[2]-meta.origin[2])/meta.spacing[2];
    if(gx<0||gx>meta.dims[0]-1||gy<0||gy>meta.dims[1]-1||gz<0||gz>meta.dims[2]-1)return Infinity;
    const lx=Math.min(Math.floor(gx),meta.dims[0]-2),ly=Math.min(Math.floor(gy),meta.dims[1]-2),lz=Math.min(Math.floor(gz),meta.dims[2]-2),fx=gx-lx,fy=gy-ly,fz=gz-lz;
    let distance = 0;
    for (let z = 0; z <= 1; z++) for (let y = 0; y <= 1; y++) for (let x = 0; x <= 1; x++) {
      const weight = (x ? fx : 1 - fx) * (y ? fy : 1 - fy) * (z ? fz : 1 - fz);
      const index = nodeIndex(meta, lx + x, ly + y, lz + z);
      distance += weight * (this._excludedValues.get(index) ?? this._baseField[index]);
    }
    this._ensureCutIndex();
    this._queryStats.queries++;
    for (const group of this._cutGroups) {
      if (canSkipBox(squaredDistanceToBox(p, group.referenceLow, group.referenceHigh), distance, group.minimumScale)) { this._queryStats.skippedGroups++; continue; }
      const displayed = group.deformation ? deformPoint(p, group.deformation) : p;
      this._queryStats.mappedGroups++;
      if (canSkipBox(squaredDistanceToBox(displayed, group.low, group.high), distance)) { this._queryStats.skippedGroups++; continue; }
      distance=group.index.evaluate(displayed,distance,this._queryStats);
    }
    return distance;
  }

  _ensureCutIndex() {
    if (this._indexedCuts !== this._cuts || this._indexedCutCount > this._cuts.length) {
      this._cutGroups = []; this._cutGroupMap.clear(); this._indexedCuts = this._cuts; this._indexedCutCount = 0;
      this._contactHistoryScale=1;this._contactHasDeformedCuts=false;this._contactQueryCache.clear();
    }
    while (this._indexedCutCount < this._cuts.length) {
      // History records stay deeply immutable. Hot SDF queries use their own
      // numeric arrays so frozen-array element access cannot deopt every voxel
      // and CAD contact query as the cut history grows.
      const cut = validateCut(this._cuts[this._indexedCutCount++]), deformation = cut.deformation;
      const key = deformation ? JSON.stringify(deformation) : 'rest';
      let group = this._cutGroupMap.get(key);
      if (!group) {
        const minimumScale = deformationMinimumScale(deformation);
        this._contactHistoryScale=Math.min(this._contactHistoryScale,minimumScale);this._contactHasDeformedCuts||=!!deformation;
        group = { deformation, minimumScale, entries: [], index:new CutSpatialIndex(), low: [Infinity, Infinity, Infinity], high: [-Infinity, -Infinity, -Infinity], referenceLow: [Infinity, Infinity, Infinity], referenceHigh: [-Infinity, -Infinity, -Infinity] };
        this._cutGroupMap.set(key, group); this._cutGroups.push(group);
      }
      const {low,high}=cutBounds(cut,cut.radius);
      const delta = deformation?.displacement ?? [0, 0, 0];
      for (let axis = 0; axis < 3; axis++) {
        group.low[axis] = Math.min(group.low[axis], low[axis]); group.high[axis] = Math.max(group.high[axis], high[axis]);
        group.referenceLow[axis] = Math.min(group.referenceLow[axis], low[axis] - Math.max(0, delta[axis]));
        group.referenceHigh[axis] = Math.max(group.referenceHigh[axis], high[axis] - Math.min(0, delta[axis]));
      }
      const entry={cut,low,high};group.entries.push(entry);group.index.add(entry);
    }
  }

  get queryMetrics() { return { ...this._queryStats, groups: this._cutGroups.length, cuts: this._cuts.length }; }

  contains(point, margin = 0) {
    return this.sampleDistance(point) <= Math.max(0, Number.isFinite(margin) ? margin : 0);
  }

  /** Projects a nearby displayed point onto the actual current volume surface.
   * Returns a Vector3 with a .normal Vector3, or null when not near tissue. */
  findGraspPoint(point, margin = 0.008) {
    if (!this._baseField || !point || !Number.isFinite(margin) || margin <= 0) return null;
    const specimen = this.fragments.surfacePoint(point, margin);
    if (specimen) return specimen;
    return this.findParentSurfacePoint(point, margin);
  }

  /** Mother-organ surface only: a carried specimen must not redirect the scope. */
  findParentSurfacePoint(point, margin = 0.008) {
    if (!this._baseField || !point || !Number.isFinite(margin) || margin <= 0) return null;
    const coordinates=vectorArray(point);if(coordinates.length!==3||!coordinates.every(Number.isFinite))return null;
    const result=this._parentContact(coordinates,margin);if(!result)return null;
    const surface=result.surface.clone();surface.normal=result.surface.normal.clone();return surface;
  }

  get graspMetrics() {
    const deformation = this._deformation;
    return { active: !!deformation, displacementMm: deformation ? Math.hypot(...deformation.displacement) * 1000 : 0,
      radiusMm: deformation ? deformation.radius * 1000 : 0, affectedVertices: this._affectedVertices,
      coreRadiusMm:deformation?.model==='local-flow'?deformation.coreRadius*1000:0,
      local: deformation ? [...deformation.local] : null, displacement: deformation ? [...deformation.displacement] : [0, 0, 0],
      model: deformation?.model==='local-flow'?'Local anchored traction with a 2.5 mm grasp core; uncalibrated geometric strain model':'Legacy compact geometric displacement; not calibrated tissue mechanics' };
  }

  get deformationMetrics() { return { ...this._deformationStats }; }

  /** Geometry, contact queries, shadows and new cut surfaces share this mapping.
   * Accepts either (Vector3 anchor, Vector3 displacement) or an options object. */
  setGrasp(point, delta) {
    let next = null;
    try {
      if (point && delta) next = normalizeDeformation({model:'local-flow',local: vectorArray(point), displacement: vectorArray(delta) });
      else if (point?.local) next = normalizeDeformation(point);
    } catch { return false; }
    if (next&&next.model!=='local-flow') {
      if (next.radius < 1e6) next.radius = Math.ceil(next.radius * 1000) / 1000;
      if (this._deformation && next.local.every((v, axis) => v === this._deformation.local[axis])) next.radius = Math.max(next.radius, this._deformation.radius);
    }
    if (JSON.stringify(next) === JSON.stringify(this._deformation)) return true;
    this._deformation = next;
    this._contactRevision++;
    this._contactQueryCache.clear();
    this._affectedVertices = 0;
    for (const mesh of this._meshes.values()) this._affectedVertices += this._applyDeformation(mesh);
    return true;
  }

  _applyLocalDeformation(mesh){
    const geometry=mesh.geometry,rest=geometry.userData.restPositions,restNormals=geometry.userData.restNormals;
    const positions=geometry.attributes.position.array,normals=geometry.attributes.normal.array,d=this._deformation;
    const length=Math.hypot(...d.displacement),capacity=d.radius+Math.max(length*1.1,LOCAL_TRACTION.radius*LOCAL_TRACTION.slipStrain);
    const signature=['local-flow',...d.local,d.radius,d.coreRadius].join(',');
    let cache=geometry.userData.deformationCache,fullUpdate=false;
    if(cache?.signature!==signature||cache.capacity<d.radius+length){
      fullUpdate=!!geometry.userData.deformed;
      if(fullUpdate){positions.set(rest);normals.set(restNormals);}
      const indices=[],box=geometry.userData.restBox;
      const distanceSquared=Math.max(box.min.x-d.local[0],0,d.local[0]-box.max.x)**2+
        Math.max(box.min.y-d.local[1],0,d.local[1]-box.max.y)**2+Math.max(box.min.z-d.local[2],0,d.local[2]-box.max.z)**2;
      if(distanceSquared<capacity*capacity)for(let i=0;i<rest.length;i+=3){
        const x=rest[i]-d.local[0],y=rest[i+1]-d.local[1],z=rest[i+2]-d.local[2];
        if(x*x+y*y+z*z<capacity*capacity)indices.push(i);
      }
      cache={signature,capacity,indices:new Uint32Array(indices),active:new Uint8Array(indices.length)};
      geometry.userData.deformationCache=cache;this._deformationStats.cacheBuilds++;this._deformationStats.radiusUpdates++;
    }
    let active=0,maximumWeight=0,first=Infinity,last=-Infinity;
    const [dx,dy,dz]=d.displacement;
    for(let j=0;j<cache.indices.length;j++){
      const i=cache.indices[j],{weight,gradient:g}=deformationWeight([rest[i],rest[i+1],rest[i+2]],d);
      if(!weight&&!cache.active[j])continue;
      cache.active[j]=weight>0?1:0;active+=cache.active[j];maximumWeight=Math.max(maximumWeight,weight);
      first=Math.min(first,i);last=Math.max(last,i);
      positions[i]=rest[i]+dx*weight;positions[i+1]=rest[i+1]+dy*weight;positions[i+2]=rest[i+2]+dz*weight;
      const projection=(restNormals[i]*dx+restNormals[i+1]*dy+restNormals[i+2]*dz)/(1+g[0]*dx+g[1]*dy+g[2]*dz);
      const nx=restNormals[i]-g[0]*projection,ny=restNormals[i+1]-g[1]*projection,nz=restNormals[i+2]-g[2]*projection,norm=Math.hypot(nx,ny,nz)||1;
      normals[i]=nx/norm;normals[i+1]=ny/norm;normals[i+2]=nz/norm;
    }
    cache.activeCount=active;
    this._deformationStats.movedVertices+=active;
    if(last>=first||fullUpdate){
      for(const attribute of [geometry.attributes.position,geometry.attributes.normal]){
        attribute.clearUpdateRanges();if(!fullUpdate&&last>=first)attribute.addUpdateRange(first,last-first+3);attribute.needsUpdate=true;
      }
    }
    const extent=length*maximumWeight;
    geometry.boundingSphere.copy(geometry.userData.restSphere);geometry.boundingSphere.radius+=extent;
    geometry.boundingBox.copy(geometry.userData.restBox).expandByScalar(extent);geometry.userData.deformed=active>0;
    return active;
  }

  _applyDeformation(mesh) {
    const geometry = mesh.geometry, rest = geometry.userData.restPositions, restNormals = geometry.userData.restNormals;
    const positions = geometry.attributes.position.array, normals = geometry.attributes.normal.array;
    const deformation = this._deformation;
    if (!deformation) {
      if (geometry.userData.deformed) {
        positions.set(rest); normals.set(restNormals);
        geometry.attributes.position.clearUpdateRanges(); geometry.attributes.normal.clearUpdateRanges();
        geometry.attributes.position.needsUpdate = true; geometry.attributes.normal.needsUpdate = true;
        geometry.userData.deformed = false;
        geometry.boundingSphere.copy(geometry.userData.restSphere); geometry.boundingBox.copy(geometry.userData.restBox);
      }
      return 0;
    }
    if(deformation.model==='local-flow')return this._applyLocalDeformation(mesh);
    // Anchor distances are invariant while the forceps move. Reserve a larger
    // radial domain once, rather than rebuilding it at every 1 mm radius step.
    const signature = deformation.local.join(',');
    let cache = geometry.userData.deformationCache;
    let fullUpdate = false;
    if (cache?.signature !== signature || cache.capacity < deformation.radius) {
      this._deformationStats.cacheBuilds++;
      if (geometry.userData.deformed) { positions.set(rest); normals.set(restNormals); }
      fullUpdate = !!geometry.userData.deformed;
      const capacity = Math.max(0.14, deformation.radius * 1.5);
      const indices = [], distances = [];
      const box = geometry.userData.restBox, local = deformation.local;
      const distanceSquared = Math.max(box.min.x - local[0], 0, local[0] - box.max.x) ** 2 + Math.max(box.min.y - local[1], 0, local[1] - box.max.y) ** 2 + Math.max(box.min.z - local[2], 0, local[2] - box.max.z) ** 2;
      if (distanceSquared < capacity * capacity) {
        for (let i = 0; i < rest.length; i += 3) {
          const x = rest[i] - local[0], y = rest[i + 1] - local[1], z = rest[i + 2] - local[2], distance = Math.sqrt(x * x + y * y + z * z);
          if (distance < capacity) { indices.push(i); distances.push(distance); }
        }
      }
      cache = { signature, capacity, indices: new Uint32Array(indices), distances: new Float32Array(distances), weights: new Float32Array(indices.length), gradients: new Float32Array(indices.length * 3), radius: 0, maximumWeight: 0, activeCount: 0 };
      geometry.userData.deformationCache = cache;
    }
    const [dx, dy, dz] = deformation.displacement;
    const [ax, ay, az] = deformation.local, radius = deformation.radius, inverseRadius = 1 / radius, inverseRadiusSquared = inverseRadius * inverseRadius;
    const radiusChanged = cache.radius !== radius;
    if (radiusChanged) this._deformationStats.radiusUpdates++;
    let activeCount = 0, maximumWeight = 0, firstChanged = Infinity, lastChanged = -Infinity;
    for (let j = 0; j < cache.indices.length; j++) {
      const i = cache.indices[j], gradientIndex = j * 3;
      let weight = cache.weights[j];
      if (radiusChanged) {
        const distance = cache.distances[j];
        if (distance >= radius) { cache.weights[j] = 0; continue; }
        const relative = distance * inverseRadius, t = 1 - relative, t2 = t * t;
        weight = t2 * t2 * (4 * relative + 1);
        const derivative = -20 * t2 * t * inverseRadiusSquared;
        cache.weights[j] = weight;
        cache.gradients[gradientIndex] = (rest[i] - ax) * derivative;
        cache.gradients[gradientIndex + 1] = (rest[i + 1] - ay) * derivative;
        cache.gradients[gradientIndex + 2] = (rest[i + 2] - az) * derivative;
      }
      if (!weight) continue;
      activeCount++; maximumWeight = Math.max(maximumWeight, weight);
      firstChanged = Math.min(firstChanged, i); lastChanged = Math.max(lastChanged, i);
      const gx = cache.gradients[gradientIndex], gy = cache.gradients[gradientIndex + 1], gz = cache.gradients[gradientIndex + 2];
      positions[i] = rest[i] + dx * weight; positions[i + 1] = rest[i + 1] + dy * weight; positions[i + 2] = rest[i + 2] + dz * weight;
      const projection = (restNormals[i] * dx + restNormals[i + 1] * dy + restNormals[i + 2] * dz) / (1 + gx * dx + gy * dy + gz * dz);
      const nx = restNormals[i] - gx * projection, ny = restNormals[i + 1] - gy * projection, nz = restNormals[i + 2] - gz * projection, length = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      normals[i] = nx / length; normals[i + 1] = ny / length; normals[i + 2] = nz / length;
    }
    cache.radius = radius; cache.maximumWeight = maximumWeight; cache.activeCount = activeCount;
    this._deformationStats.movedVertices += activeCount;
    if (activeCount || geometry.userData.deformed) {
      geometry.attributes.position.clearUpdateRanges(); geometry.attributes.normal.clearUpdateRanges();
      if (!fullUpdate && activeCount) {
        geometry.attributes.position.addUpdateRange(firstChanged, lastChanged - firstChanged + 3);
        geometry.attributes.normal.addUpdateRange(firstChanged, lastChanged - firstChanged + 3);
      }
      geometry.attributes.position.needsUpdate = true; geometry.attributes.normal.needsUpdate = true;
    }
    if (activeCount || geometry.userData.deformed) {
      const extent = Math.sqrt(dx * dx + dy * dy + dz * dz) * maximumWeight;
      geometry.boundingSphere.copy(geometry.userData.restSphere); geometry.boundingSphere.radius += extent;
      geometry.boundingBox.copy(geometry.userData.restBox).expandByScalar(extent);
    }
    geometry.userData.deformed = !!activeCount;
    return activeCount;
  }

  _enqueue(operation) {
    if (!this.worker) return Promise.reject(new Error('Tissue worker is not available'));
    this.busy = true;
    return new Promise((resolve, reject) => {
      this._commands.push({ ...operation, epoch: this._epoch, resolve, reject });
      queueMicrotask(() => this._flush());
    });
  }

  _flush() {
    if (this._inFlight || !this._commands.length || this._disposed) return;
    const command = this._commands.shift();
    // Coalesce queued strokes to rebuild each dirty tile once per worker pass.
    const callbacks = [command];
    if (command.type === 'cut') {
      let segmentCount=command.cuts.reduce((n,cut)=>n+(cut.segments?.length??1),0);
      while (this._commands[0]?.type === 'cut' && this._commands[0].epoch === command.epoch && segmentCount+this._commands[0].cuts.reduce((n,cut)=>n+(cut.segments?.length??1),0)<=64) {
        const next = this._commands.shift(); callbacks.push(next); command.cuts.push(...next.cuts);
        segmentCount=command.cuts.reduce((n,cut)=>n+(cut.segments?.length??1),0);
      }
    }
    command.id = ++this._sequence;
    this._inFlight = { command, callbacks };
    const { resolve, reject, transfer, ...message } = command;
    this.worker.postMessage(message, transfer ?? []);
  }

  _receive(data) {
    const receiveStart=performance.now();
    const active = this._inFlight;
    if (!active || data.id !== active.command.id) return;
    this._inFlight = null;
    if (data.error) {
      const error = new Error(data.error); this.error = error;
      active.callbacks.forEach(command => command.reject(error));
    } else if (data.epoch !== this._epoch) {
      active.callbacks.forEach(command => command.resolve({ changed: false, cancelled: true }));
    } else {
      const exclusionsStart=performance.now();
      if (data.exclusions?.reset) this._excludedValues.clear();
      if (data.exclusions) for (let i = 0; i < data.exclusions.nodeIndices.length; i++) {
        this._excludedValues.set(data.exclusions.nodeIndices[i], data.exclusions.positiveValues[i]);
      }
      if (data.type === 'init' || data.type === 'restore') {this.fragments.clear();this.transitionTimings.length=0;}
      const fragmentsStart=performance.now();
      for (const fragment of data.fragments ?? []) this.fragments.add(fragment, this._restoringFragmentPoses?.get(fragment.id));
      const fragmentsEnd=performance.now();
      if (data.separations) this._separations = structuredClone(data.separations);
      if (data.type === 'restore') this._restoringFragmentPoses = null;
      for (const chunk of data.chunks) this._replaceChunk(chunk);
      Object.assign(this, data.statistics);
      const woundStart=performance.now();
      if(data.type==='restore'){this.blood.restore(this._restoringBlood);this._restoringBlood=null;if(!this.blood.nodes.length)this.blood.syncSurface({selection:data.woundSelection});}
      else if(data.type==='cut')this.blood.syncSurface({injury:data.removedMm3>1e-8,selection:data.woundSelection,deferRender:this.blood.surfaceFilm.gpu});
      else if(data.type==='init')this.blood.reset();
      this.updateTimings={receivedAt:receiveStart,receiveMs:performance.now()-receiveStart,exclusionsMs:fragmentsStart-exclusionsStart,fragmentsMs:fragmentsEnd-fragmentsStart,chunksMs:woundStart-fragmentsEnd,woundMs:performance.now()-woundStart,chunks:data.chunks.length,fragments:data.fragments?.length??0};
      if(data.fragments?.length){this.transitionTimings.push({...this.updateTimings});if(this.transitionTimings.length>8)this.transitionTimings.shift();}
      const result = { changed: !!data.changedSamples || data.type !== 'cut', removedMm3: data.removedMm3, removedVolumeMm3: this.removedVolumeMm3, totalVolumeMm3: this.totalVolumeMm3,
        fragments: (data.fragments ?? []).map(fragment => fragment.id) };
      active.callbacks.forEach(command => command.resolve(result));
      this.onChange?.(result);
    }
    this.busy = !!this._commands.length;
    this._flush();this.onDiagnostic?.('tissue-receive',receiveStart,performance.now());
  }

  _replaceChunk(chunk) {
    this._contactRevision++;
    this._contactQueryCache.clear();
    const previous = this._meshes.get(chunk.key);
    if (previous?.geometry.userData.deformed) this._affectedVertices -= previous.geometry.userData.deformationCache?.activeCount ?? 0;
    if (previous) { previous.geometry.dispose(); this.group.remove(previous); this._meshes.delete(chunk.key); }
    if (!chunk.positions.length) return;
    const geometry = new THREE.BufferGeometry();
    geometry.userData.restPositions = chunk.positions;
    geometry.userData.restNormals = chunk.normals;
    geometry.userData.woundSurface=chunk.woundSurface;
    geometry.userData.surfaceTree=chunk.contactTree;
    geometry.setAttribute('position', new THREE.BufferAttribute(chunk.positions.slice(), 3).setUsage(THREE.StreamDrawUsage));
    geometry.setAttribute('normal', new THREE.BufferAttribute(chunk.normals.slice(), 3).setUsage(THREE.StreamDrawUsage));
    geometry.setAttribute('color', new THREE.BufferAttribute(chunk.colors, 3));
    geometry.setAttribute('tissueRestPosition', new THREE.BufferAttribute(chunk.positions, 3));
    geometry.setAttribute('tissueCutMask', new THREE.BufferAttribute(chunk.cutMasks ?? new Float32Array(chunk.positions.length / 3), 1));
    geometry.setIndex(new THREE.BufferAttribute(chunk.indices, 1));
    geometry.computeBoundingSphere();
    geometry.userData.restSphere = geometry.boundingSphere.clone();
    geometry.computeBoundingBox(); geometry.userData.restBox = geometry.boundingBox.clone();
    const mesh = new THREE.Mesh(geometry, this.material);
    mesh.name = `liver-chunk-${chunk.key}`;
    mesh.castShadow = true; mesh.receiveShadow = true;
    mesh.layers.enable(1);
    mesh.userData.tissue = true;
    this._affectedVertices += this._applyDeformation(mesh);
    this.group.add(mesh); this._meshes.set(chunk.key, mesh);
  }

  _fail(error) {
    this.error = error; this.busy = false;
    this._inFlight?.callbacks.forEach(command => command.reject(error));
    this._inFlight = null;
    for (const command of this._commands.splice(0)) command.reject(error);
  }

  dispose() {
    this._disposed = true; this.ready = false;
    this.worker?.terminate();
    this._fail(new Error('Tissue volume disposed'));
    for (const mesh of this._meshes.values()) mesh.geometry.dispose();
    this.blood.dispose();this.fragments.clear(); this._excludedValues.clear();
    this._meshes.clear();this._bloodBroadPhase.clear(); this.group.clear(); this.material.dispose();
    this._baseField = null;
  }
}

export default TissueVolume;
