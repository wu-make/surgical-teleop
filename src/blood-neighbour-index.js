// Exact broad phase for deposition onto moving wound cells. Every cell inside
// the original 3.5 mm search sphere is visited; normals and distances still
// decide contact. Equal distances retain the original node-array ordering.
export class BloodNeighbourIndex {
  constructor(nodes,radius=.0035){
    this.radius=radius;this.cells=new Map();
    nodes.forEach((node,index)=>{
      const p=node.display,key=this.key(Math.floor(p.x/radius),Math.floor(p.y/radius),Math.floor(p.z/radius));
      let cell=this.cells.get(key);if(!cell)this.cells.set(key,cell=[]);
      cell.push({node,index});
    });
  }
  key(x,y,z){return `${x}:${y}:${z}`;}
  nearest(point,velocity){
    const r=this.radius,x=Math.floor(point.x/r),y=Math.floor(point.y/r),z=Math.floor(point.z/r);
    let best=r,nearest=null,bestIndex=Infinity;
    for(let dz=-1;dz<=1;dz++)for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){
      const cell=this.cells.get(this.key(x+dx,y+dy,z+dz));if(!cell)continue;
      for(const {node,index} of cell){
        const distance=node.display.distanceTo(point);
        if((distance<best||(nearest&&distance===best&&index<bestIndex))&&velocity.dot(node.normal)<0){best=distance;nearest=node;bestIndex=index;}
      }
    }
    return {node:nearest,distance:best};
  }
}
