import {Vector3} from 'three';
// Lesions/resection envelopes are explicit scenario volumes in the same
// material frame as the registered anatomy. They are not patient annotations.
const cases=[
  {id:'liver',label:'正常肝脏',title:'肝脏精细操作',asset:'liver-volume',kind:0,context:'hepatic',hint:'左钳夹持牵拉，右剪按住 C 沿连接处切离。'},
  {id:'lesion-liver',label:'病灶肝 · 左半肝',title:'左半肝病灶切除',asset:'liver-volume',kind:1,context:'hepatic',
    lesion:{center:[.045,.012,.062],radii:[.014,.017,.013]},boundary:{center:[.045,.012,.062],radii:[.023,.027,.023]},
    start:[[.020,.012,.075],[.050,.012,.076]],
    hint:'浅褐色区域为病灶；沿金色切缘牵拉、切离，连接完全断开后取出。'},
  {id:'uterus-adnexa',label:'子宫附件 · 左侧病灶',title:'子宫附件精细操作',asset:'pelvic-volume',kind:2,context:'pelvic',
    lesion:{center:[.0565,.017,.010],radii:[.010,.013,.008]},boundary:{center:[.0565,.017,.010],radii:[.019,.024,.018]},
    hint:'子宫、双侧输卵管与卵巢；左侧附件为目标，沿切缘切断连接后移开。',
    start:[[-.006,-.010,.019],[.026,.010,.021]]},
];
export const SURGICAL_CASES=Object.freeze(cases.map(c=>Object.freeze(c)));
export function surgicalCase(id){return SURGICAL_CASES.find(c=>c.id===id)??SURGICAL_CASES[0];}

/** A fresh scenario pose needs fresh source-CAD shaft frames as well as TCPs.
 * Reusing the old alignment after translating a tip misses the fixed RCM port. */
export function initializeCase(sim,tissue,definition,aspect){
  if(definition.start){
    const snapshot=sim.snapshot();
    for(const [i,side]of ['left','right'].entries()){
      const tool=snapshot.state.tools[side];tool.position=tissue.group.localToWorld(new Vector3(...definition.start[i])).toArray();
      delete tool.alignment;delete tool.shaftDirection;
    }
    sim.restore(snapshot);
  }
  sim.prepareInitialScopeView(aspect);
}

/** Radial projection onto a material-space ellipsoid. No field deletion: this
 * only supplies a visible instrument correction near an explicit cut edge. */
export function boundaryProjection(point,boundary){
  if(!boundary)return null;
  const delta=point.map((v,i)=>v-boundary.center[i]),k=Math.hypot(...delta.map((v,i)=>v/boundary.radii[i]));
  if(k<1e-9)return null;
  const target=delta.map((v,i)=>boundary.center[i]+v/k),distance=Math.hypot(...target.map((v,i)=>v-point[i]));
  return {target,distance,inside:k<1};
}
