// Preserve the GLB header, JSON, view offsets and every source bit. Only the
// transport signature and tightly packed uint32/float32 accessor bytes differ.
const GLB=0x46546c67, PACKED=0x31444143; // glTF / CAD1
const widths={SCALAR:1,VEC2:2,VEC3:3,VEC4:4};

function transform(buffer,encode){
  const header=new DataView(buffer);
  if(buffer.byteLength<28||header.getUint32(0,true)!==(encode?GLB:PACKED)||
    header.getUint32(4,true)!==2||header.getUint32(8,true)!==buffer.byteLength||
    header.getUint32(16,true)!==0x4e4f534a)throw new Error('Invalid CAD transport');
  const jsonLength=header.getUint32(12,true),binStart=28+jsonLength;
  if(binStart>buffer.byteLength||header.getUint32(binStart-4,true)!==0x004e4942)throw new Error('Missing CAD binary chunk');
  const model=JSON.parse(new TextDecoder().decode(new Uint8Array(buffer,20,jsonLength)));
  const result=buffer.slice(0),seen=new Set();
  for(const accessor of model.accessors){
    const view=model.bufferViews[accessor.bufferView],lanes=widths[accessor.type];
    if(!view||seen.has(accessor.bufferView)||view.buffer!==0||view.byteStride||accessor.byteOffset||accessor.sparse||
      !lanes||![5125,5126].includes(accessor.componentType)||view.byteLength!==accessor.count*lanes*4)continue;
    seen.add(accessor.bufferView);
    const offset=binStart+(view.byteOffset??0),count=accessor.count;
    const words=new Uint32Array(encode?buffer:result,offset,count*lanes);
    const planes=new Uint8Array(encode?result:buffer,offset,view.byteLength);
    for(let lane=0;lane<lanes;lane++){
      const base=lane*4*count;
      let previous=0;
      for(let i=0;i<count;i++){
        const at=base+i,word=i*lanes+lane;
        if(encode){
          const value=words[word],delta=(value-previous)|0;
          const residual=(delta<<1)^(delta>>31);
          planes[at]=residual;planes[at+count]=residual>>>8;
          planes[at+2*count]=residual>>>16;planes[at+3*count]=residual>>>24;
          previous=value;
        }else{
          const residual=planes[at]|(planes[at+count]<<8)|(planes[at+2*count]<<16)|(planes[at+3*count]<<24);
          previous=(previous+((residual>>>1)^-(residual&1)))>>>0;
          words[word]=previous;
        }
      }
    }
  }
  new DataView(result).setUint32(0,encode?PACKED:GLB,true);
  return result;
}

export const packCad=buffer=>transform(buffer,true);
export const unpackCad=buffer=>transform(buffer,false);
