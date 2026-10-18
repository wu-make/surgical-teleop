// Exact broad phase for deposition onto moving wound cells. Every cell inside
// the original 3.5 mm search sphere is visited; normals and distances still
// decide contact. Equal distances retain the original node-array ordering.
export class BloodNeighbourIndex {
  constructor(nodes,radius=.0035){
    this.radius=radius;this.cells=new Map();this.nodes=nodes;
    nodes.forEach((node,index)=>{
      const p=node.display,x=Math.floor(p.x/radius),y=Math.floor(p.y/radius),z=Math.floor(p.z/radius);
      let column=this.cells.get(x);if(!column)this.cells.set(x,column=new Map());
      let row=column.get(y);if(!row)column.set(y,row=new Map());
      let cell=row.get(z);if(!cell)row.set(z,cell=[]);
      cell.push(index);
    });
  }
  nearest(point,velocity,result={}){
    const r=this.radius,x=Math.floor(point.x/r),y=Math.floor(point.y/r),z=Math.floor(point.z/r);
    let best=r,nearest=null,bestIndex=Infinity;
    // Numeric nested maps avoid allocating 27 string keys per droplet substep.
    for(let dx=-1;dx<=1;dx++){
      const column=this.cells.get(x+dx);if(!column)continue;
      for(let dy=-1;dy<=1;dy++){
        const row=column.get(y+dy);if(!row)continue;
        for(let dz=-1;dz<=1;dz++){
          const cell=row.get(z+dz);if(!cell)continue;
          for(const index of cell){
            const node=this.nodes[index],distance=node.display.distanceTo(point);
            if((distance<best||(nearest&&distance===best&&index<bestIndex))&&velocity.dot(node.normal)<0){best=distance;nearest=node;bestIndex=index;}
          }
        }
      }
    }
    result.node=nearest;result.distance=best;return result;
  }
}
