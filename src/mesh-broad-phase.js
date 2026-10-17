// Exact broad phase: indexed conservative chunk bounds, never simplified mesh.
// Synchronize once per blood update; each parcel then visits only nearby chunks.
export class MeshBroadPhase {
  constructor(cell=.016){this.cell=cell;this.records=new Map();this.grid=new Map();this.epoch=0;}
  _keys(low,high,visit){
    const c=this.cell;for(let x=Math.floor(low[0]/c);x<=Math.floor(high[0]/c);x++)for(let y=Math.floor(low[1]/c);y<=Math.floor(high[1]/c);y++)for(let z=Math.floor(low[2]/c);z<=Math.floor(high[2]/c);z++)visit(`${x}:${y}:${z}`);
  }
  _remove(record){for(const k of record.keys){const values=this.grid.get(k);values.delete(record.mesh);if(!values.size)this.grid.delete(k);}}
  sync(meshes){
    const epoch=++this.epoch;
    for(const mesh of meshes){
      const g=mesh.geometry,b=g.boundingBox;if(!g.index?.count||!b)continue;
      const bounds=[...b.min.toArray(),...b.max.toArray()],old=this.records.get(mesh);
      if(old&&old.geometry===g&&old.version===g.attributes.position.version&&bounds.every((v,i)=>v===old.bounds[i])){old.epoch=epoch;continue;}
      if(old)this._remove(old);
      const record={mesh,geometry:g,version:g.attributes.position.version,bounds,keys:[],epoch};
      this._keys(bounds.slice(0,3),bounds.slice(3),k=>{record.keys.push(k);if(!this.grid.has(k))this.grid.set(k,new Set());this.grid.get(k).add(mesh);});this.records.set(mesh,record);
    }
    for(const [mesh,record]of this.records)if(record.epoch!==epoch){this._remove(record);this.records.delete(mesh);}
  }
  query(start,end,radius){
    const a=start.toArray(),b=end.toArray(),low=a.map((v,i)=>Math.min(v,b[i])-radius),high=a.map((v,i)=>Math.max(v,b[i])+radius),found=new Set();
    this._keys(low,high,k=>{for(const mesh of this.grid.get(k)??[])found.add(mesh);});return [...found];
  }
  clear(){this.records.clear();this.grid.clear();}
}
