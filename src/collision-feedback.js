const sideName={left:'左',right:'右'};

export function collisionPartLabel(side,part){
  const prefix=sideName[side]||'';
  if(part?.part==='jaw')return prefix+(side==='right'?'剪口':'钳口');
  if(part?.part==='wrist')return prefix+'腕部';
  if(part?.part==='shaft')return prefix+(part.section==='outside'?'体外杆身':part.section==='inside'?'体内杆身':'杆身');
  return prefix+'器械';
}

// A blocked command is transient input feedback, not a three-second notification.
// Contact without a blocked command has its own quieter, non-blocking readout.
export function collisionFeedback(collision,mode='endo'){
  const blocked=collision?.blocked===true,contact=collision?.contact===true;
  if(!blocked&&!contact)return {blocked:false,contact:false,status:'双器械防碰撞',notice:'',detail:''};
  const pair=collision?.pair;
  const location=collisionPartLabel('left',pair?.left)+'与'+collisionPartLabel('right',pair?.right);
  const external=pair?.left?.section==='outside'||pair?.right?.section==='outside';
  const gap=Number.isFinite(collision?.clearance)?Math.max(0,collision.clearance)*1000:null;
  const status=location+(blocked?'接触 · 已阻止靠近':'近接触');
  const notice=blocked?location+'接触，已阻止继续靠近；反向移动可离开。'+(external&&mode==='endo'?'体外接触请切系统总览查看。':''):'';
  const detail=status+(gap===null?'':'；估算间隙 '+gap.toFixed(2)+' mm');
  return {blocked,contact,status,notice,detail};
}
