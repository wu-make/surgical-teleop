const sessions=new Map();
self.onmessage=({data:{id,type,data,path,entries}})=>{
  try{
    if(type==='begin'){sessions.set(id,data);return;}
    const session=sessions.get(id);if(!session)throw new Error('Unknown session export');
    if(type==='append'){path.reduce((value,key)=>value[key],session).push(...entries);return;}
    if(type!=='finish')throw new Error('Unknown session export command');
    sessions.delete(id);const blob=new Blob([JSON.stringify(session,null,2)],{type:'application/json'});self.postMessage({id,blob});
  }catch(error){sessions.delete(id);self.postMessage({id,error:String(error)});}
};
