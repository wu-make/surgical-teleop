import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {TissueVolume} from '../src/tissue.js';
import {planPeripheralResections} from '../src/guided-demo.js';
import {surgicalCase} from '../src/surgical-cases.js';

test('liver row changes do not make an unnecessary loop toward the holding clamp',()=>{
  const definition=surgicalCase('lesion-liver'),tissue=new TissueVolume({caseDefinition:definition});
  tissue.metadata=JSON.parse(fs.readFileSync(new URL('../public/assets/'+definition.asset+'.json',import.meta.url)));
  const bytes=fs.readFileSync(new URL('../public/assets/'+definition.asset+'.bin',import.meta.url));
  tissue._baseField=new Float32Array(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength));
  try{
    const plan=planPeripheralResections(tissue)[0];let directConnections=0;
    for(let row=1;row<plan.strokeStarts.length;row++){
      const start=plan.strokeStarts[row],a=plan.path[plan.unidirectional?plan.strokeStarts[row-1]:start-1],b=plan.path[start],count=Math.max(1,Math.ceil(a.distanceTo(b)/.00025));
      let clear=true;
      for(let i=0;i<=count;i++)if(tissue.queryReferenceDistance(a.clone().lerp(b,i/count))<.0001){clear=false;break;}
      if(!clear)continue;
      directConnections++;
      const route=[a,...plan.transfers[start]],length=route.slice(1).reduce((sum,p,i)=>sum+p.distanceTo(route[i]),0);
      assert(length<=a.distanceTo(b)+1e-7,'an already exposed row connection must not add a lift toward the left clamp');
      assert(route.at(-1).distanceTo(b)<1e-10);
    }
    assert(directConnections>10,'exercise the real curved source-organ row ends');
  }finally{tissue.dispose();}
});
