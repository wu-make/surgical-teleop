// Exact broad phase: indexed conservative chunk bounds, never simplified mesh.
// Synchronize once per blood update; each parcel then visits only nearby chunks.
export class MeshBroadPhase {
  constructor(cell=.016){this.cell=cell;this.records=new Map();this.grid=new Map();this.epoch=0;this.queryEpoch=0;this.seen=new WeakMap();}
  _keys(low,high,visit){
    const c=this.cell;for(let x=Math.floor(low[0]/c);x<=Math.floor(high[0]/c);x++)for(let y=Math.floor(low[1]/c);y<=Math.floor(high[1]/c);y++)for(let z=Math.floor(low[2]/c);z<=Math.floor(high[2]/c);z++)visit(`${x}:${y}:${z}`);
  }
  _remove(record){for(const k of record.keys){const values=this.grid.get(k);values.delete(record.mesh);if(!values.size)this.grid.delete(k);}}
  sync(meshes){
    const epoch=++this.epoch;
    for(const mesh of meshes){
      const g=mesh.geometry,b=g.boundingBox;if(!g.index?.count||!b)continue;
      const old=this.records.get(mesh),v=old?.bounds;
      if(old&&old.geometry===g&&old.version===g.attributes.position.version&&b.min.x===v[0]&&b.min.y===v[1]&&b.min.z===v[2]&&b.max.x===v[3]&&b.max.y===v[4]&&b.max.z===v[5]){old.epoch=epoch;continue;}
      const bounds=[b.min.x,b.min.y,b.min.z,b.max.x,b.max.y,b.max.z];
      if(old)this._remove(old);
      const record={mesh,geometry:g,version:g.attributes.position.version,bounds,keys:[],epoch};
      this._keys(bounds.slice(0,3),bounds.slice(3),k=>{record.keys.push(k);if(!this.grid.has(k))this.grid.set(k,new Set());this.grid.get(k).add(mesh);});this.records.set(mesh,record);
    }
    for(const [mesh,record]of this.records)if(record.epoch!==epoch){this._remove(record);this.records.delete(mesh);}
  }
  query(start,end,radius,result=[]){
    // Preserve cell and insertion order without allocating endpoint arrays,
    // bound arrays and a Set for every parcel's <=8 ms collision substep.
    if(this.queryEpoch>=Number.MAX_SAFE_INTEGER){this.queryEpoch=0;this.seen=new WeakMap();}
    const epoch=++this.queryEpoch,c=this.cell;result.length=0;
    const x0=Math.floor((Math.min(start.x,end.x)-radius)/c),x1=Math.floor((Math.max(start.x,end.x)+radius)/c),y0=Math.floor((Math.min(start.y,end.y)-radius)/c),y1=Math.floor((Math.max(start.y,end.y)+radius)/c),z0=Math.floor((Math.min(start.z,end.z)-radius)/c),z1=Math.floor((Math.max(start.z,end.z)+radius)/c);
    for(let x=x0;x<=x1;x++)for(let y=y0;y<=y1;y++)for(let z=z0;z<=z1;z++)for(const mesh of this.grid.get(`${x}:${y}:${z}`)??[]){if(this.seen.get(mesh)===epoch)continue;this.seen.set(mesh,epoch);result.push(mesh);}
    return result;
  }
  clear(){this.records.clear();this.grid.clear();this.queryEpoch=0;this.seen=new WeakMap();}
}
