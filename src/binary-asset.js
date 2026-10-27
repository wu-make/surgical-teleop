// Static hosting cannot configure Content-Encoding. Prefer lossless gzip CAD
// files, then use the unchanged original file if decoding is unavailable.
const validGLB=buffer=>buffer.byteLength>=12&&new DataView(buffer).getUint32(0,true)===0x46546c67&&new DataView(buffer).getUint32(8,true)===buffer.byteLength;
export async function fetchModelBytes(url,{fetchImpl=globalThis.fetch,Decompressor=globalThis.DecompressionStream}={}){
  if(Decompressor){
    try{
      const response=await fetchImpl(url+'.gz');
      if(response.ok){
        let buffer=await response.arrayBuffer();const bytes=new Uint8Array(buffer);
        if(bytes[0]===0x1f&&bytes[1]===0x8b)buffer=await new Response(new Blob([buffer]).stream().pipeThrough(new Decompressor('gzip'))).arrayBuffer();
        // A host may already have decoded Content-Encoding. Accept either
        // delivery only after checking the complete original GLB header.
        if(validGLB(buffer))return buffer;
      }
    }catch{/* The raw source remains a complete compatibility/retry path. */}
  }
  const response=await fetchImpl(url);if(!response.ok)throw new Error('无法载入模型：'+url);
  const buffer=await response.arrayBuffer();if(!validGLB(buffer))throw new Error('模型文件不完整：'+url);return buffer;
}
export async function loadModel(loader,url){return loader.parseAsync(await fetchModelBytes(url),url.slice(0,url.lastIndexOf('/')+1));}
