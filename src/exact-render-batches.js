import * as THREE from 'three';
import {runImmediately} from './cooperative-work.js';

/** Multi-draw transport only. Original meshes remain the authoritative source
 * for CAD, tissue contact, deformation, history and per-part bounds. No vertex,
 * triangle, material attribute, resolution or simulation step is removed. */
export class ExactRenderBatches {
  constructor(root){this.root=root;this.groups=new Map();this.records=new Map();this.schemas=new WeakMap();this.operations=[];this.worstOperations=[];this.operationCounts={};this.inverse=new THREE.Matrix4();this.matrix=new THREE.Matrix4();}
  _operation(type,start,group,force=false){
    const end=performance.now(),ms=end-start;this.operationCounts[type]=(this.operationCounts[type]??0)+1;
    if(!force&&ms<2)return;
    const row={type,start,end,ms,vertexCapacity:group.vCapacity,indexCapacity:group.iCapacity,active:group.active,tissue:!!group.mesh.geometry.attributes.tissueRestPosition};
    this.operations.push(row);if(this.operations.length>32)this.operations.shift();this.worstOperations.push(row);this.worstOperations.sort((a,b)=>b.ms-a.ms);this.worstOperations.length=Math.min(8,this.worstOperations.length);
  }
  _key(mesh,mask){
    const g=mesh.geometry;let schema=this.schemas.get(g);
    if(!schema){schema=Object.keys(g.attributes).sort().map(k=>{const a=g.attributes[k];return `${k}/${a.itemSize}/${a.array.constructor.name}/${a.normalized}`;}).join(',')+`/${!!g.index}`;this.schemas.set(g,schema);}
    return `${mesh.material.uuid}/${mask}/${+mesh.castShadow}/${+mesh.receiveShadow}/${mesh.renderOrder}/${schema}`;
  }
  _group(key,list){
    const source=list[0],geometries=[...new Set(list.map(m=>m.geometry))],v=Math.max(2048,Math.ceil(geometries.reduce((n,g)=>n+g.attributes.position.count,0)*1.5)),i=source.geometry.index?Math.max(4096,Math.ceil(geometries.reduce((n,g)=>n+g.index.count,0)*1.5)):0,instances=Math.max(32,list.length*2);
    const mesh=new THREE.BatchedMesh(instances,v,i,source.material);mesh.name='Exact_MultiDraw_Geometry';mesh.layers.mask=source.layers.mask;mesh.castShadow=source.castShadow;mesh.receiveShadow=source.receiveShadow;mesh.renderOrder=source.renderOrder;mesh.frustumCulled=false;
    const group={mesh,geometries:new Map(),vCapacity:v,iCapacity:i,vCursor:0,iCursor:0,instances,active:0};this.root.add(mesh);this.groups.set(key,group);return group;
  }
  _geometry(group,geometry){
    let record=group.geometries.get(geometry);if(record)return record;
    const vertices=geometry.attributes.position.count,indices=geometry.index?.count??0,reusable=!!geometry.attributes.tissueRestPosition;
    const v=reusable?Math.ceil(vertices*1.35):vertices,i=reusable?Math.ceil(indices*1.35):indices;
    if(group.vCursor+v>group.vCapacity||group.iCursor+i>group.iCapacity){
      const optimizeStart=performance.now();group.mesh.optimize();this._operation('compact',optimizeStart,group,true);group.vCursor=0;group.iCursor=0;
      for(const value of group.geometries.values()){const range=group.mesh.getGeometryRangeAt(value.id);group.vCursor=Math.max(group.vCursor,range.vertexStart+range.reservedVertexCount);group.iCursor=Math.max(group.iCursor,range.indexStart+range.reservedIndexCount);}
      if(group.vCursor+v>group.vCapacity||group.iCursor+i>group.iCapacity){group.vCapacity=Math.max(Math.ceil(group.vCapacity*1.5),group.vCursor+v+1024);if(geometry.index)group.iCapacity=Math.max(Math.ceil(group.iCapacity*1.5),group.iCursor+i+2048);const resizeStart=performance.now();group.mesh.setGeometrySize(group.vCapacity,group.iCapacity);this._operation('resize',resizeStart,group,true);}
    }
    // addGeometry already copies every attribute/index. Recording its versions
    // avoids immediately copying the whole new cut surface a second time.
    const attributes=Object.values(geometry.attributes);
    const addStart=performance.now();record={id:group.mesh.addGeometry(geometry,v,i),references:0,attributes,versions:attributes.map(a=>a.version),indexVersion:geometry.index?.version??0,vertices,indices};group.vCursor+=v;group.iCursor+=i;group.geometries.set(geometry,record);this._operation('add',addStart,group);return record;
  }
  _remove(source,record){
    const {group,geometry}=record;group.mesh.deleteInstance(record.instance);group.active--;geometry.references--;
    if(!geometry.references){group.mesh.deleteGeometry(geometry.id);group.geometries.delete(record.sourceGeometry);}
    source.layers.mask=record.mask;this.records.delete(source);
  }
  sync(sources){return runImmediately(this.syncSteps(sources));}
  _reuse(source,record){
    const geometry=source.geometry,old=record.geometry,group=record.group;
    if(old.references!==1||!geometry.attributes.tissueRestPosition||this._key(source,source.layers.mask||record.mask)!==record.key)return false;
    const range=group.mesh.getGeometryRangeAt(old.id);
    if(geometry.attributes.position.count>range.reservedVertexCount||(geometry.index?.count??0)>range.reservedIndexCount)return false;
    const start=performance.now();group.mesh.setGeometryAt(old.id,geometry);group.geometries.delete(record.sourceGeometry);
    old.attributes=Object.values(geometry.attributes);old.versions=old.attributes.map(a=>a.version);old.indexVersion=geometry.index?.version??0;old.vertices=geometry.attributes.position.count;old.indices=geometry.index?.count??0;
    record.sourceGeometry=geometry;group.geometries.set(geometry,old);this._operation('reuse',start,group);return true;
  }
  *syncSteps(sources){
    const eligible=new Set(sources.filter(m=>m.isMesh&&!m.isInstancedMesh&&!m.isBatchedMesh&&!m.isSkinnedMesh&&!Array.isArray(m.material)&&!m.material.transparent&&!Object.keys(m.geometry.morphAttributes).length&&m.geometry.drawRange.start===0&&m.geometry.drawRange.count===Infinity));
    for(const [source,record]of this.records){const g=source.geometry;if(!eligible.has(source)){this._remove(source,record);continue;}if(g!==record.sourceGeometry&&this._reuse(source,record))continue;if(g!==record.sourceGeometry||g.attributes.position.count!==record.geometry.vertices||(g.index?.count??0)!==record.geometry.indices||this._key(source,source.layers.mask||record.mask)!==record.key)this._remove(source,record);}
    const newGroups=new Map();for(const source of eligible)if(!this.records.has(source)){const key=this._key(source,source.layers.mask);if(!newGroups.has(key))newGroups.set(key,[]);newGroups.get(key).push(source);}
    for(const [key,list]of newGroups){
      let group=this.groups.get(key);if(!group&&list.length<2)continue;group??=this._group(key,list);
      for(const source of list){
        if(group.active+1>group.instances){group.instances=Math.ceil(group.instances*1.5);group.mesh.setInstanceCount(group.instances);}
        const geometry=this._geometry(group,source.geometry),instance=group.mesh.addInstance(geometry.id);geometry.references++;group.active++;
        this.records.set(source,{key,group,geometry,instance,sourceGeometry:source.geometry,mask:source.layers.mask,matrix:new THREE.Matrix4().makeScale(0,0,0),visible:null});source.layers.mask=0;
        yield;
      }
    }
    this.root.updateMatrixWorld(true);this.inverse.copy(this.root.matrixWorld).invert();
    for(const [source,record]of this.records){
      const g=source.geometry,value=record.geometry;
      if(value.attributes.some((a,i)=>a.version!==value.versions[i])||value.indexVersion!==(g.index?.version??0)){record.group.mesh.setGeometryAt(value.id,g);value.versions=value.attributes.map(a=>a.version);value.indexVersion=g.index?.version??0;}
      this.matrix.multiplyMatrices(this.inverse,source.matrixWorld);if(!record.matrix.equals(this.matrix)){record.group.mesh.setMatrixAt(record.instance,this.matrix);record.matrix.copy(this.matrix);}
      let visible=true;for(let node=source;node;node=node.parent)if(!node.visible){visible=false;break;}
      if(record.visible!==visible){record.group.mesh.setVisibleAt(record.instance,visible);record.visible=visible;}
    }
  }
  get metrics(){return {operationCounts:this.operationCounts,operations:this.operations,worstOperations:this.worstOperations,sources:this.records.size,batches:this.groups.size,triangles:[...this.records.values()].reduce((n,r)=>n+(r.sourceGeometry.index?.count??r.sourceGeometry.attributes.position.count)/3,0)};}
  dispose(){for(const [source,record]of this.records)source.layers.mask=record.mask;this.records.clear();for(const group of this.groups.values()){group.mesh.removeFromParent();group.mesh.dispose();}this.groups.clear();}
}
