/** Canvas-only pointer navigation. The simulation owns camera state/history;
 * this adapter owns pointer capture and short wheel gestures, with no inertia. */
import {SCOPE_FRAMING} from './scope-framing.js';
export function attachScopeNavigation({canvas,sim,enabled=()=>true,onBegin=()=>{},onChange=()=>{},onFocus=()=>{},now=()=>performance.now()}) {
  let drag=null,wheelAt=-Infinity;
  const listeners=[];
  const listen=(type,handler,options)=>{canvas.addEventListener(type,handler,options);listeners.push([type,handler,options]);};
  const usable=()=>enabled()&&!sim.state.paused;
  const cancel=()=>{const id=drag?.id;drag=null;wheelAt=-Infinity;if(id!==undefined&&canvas.hasPointerCapture?.(id))canvas.releasePointerCapture(id);};
  listen('pointerdown',event=>{
    if(event.target!==canvas||event.button!==0||!usable()||sim.state.scope.follow)return;
    event.preventDefault();onFocus();drag={id:event.pointerId,x:event.clientX,y:event.clientY,started:false};
    canvas.setPointerCapture(event.pointerId);
  });
  listen('pointermove',event=>{
    if(!drag||drag.id!==event.pointerId)return;
    if(!usable()||sim.state.scope.follow){cancel();return;}
    const dx=event.clientX-drag.x,dy=event.clientY-drag.y;
    if(!dx&&!dy)return;
    if(!drag.started&&Math.hypot(dx,dy)<2)return;
    event.preventDefault();
    if(!drag.started){onBegin('内窥镜鼠标转向');drag.started=true;}
    const scale=(sim.state.scope.fov??55)*Math.PI/180/Math.max(1,canvas.getBoundingClientRect().height);
    sim.navigateScope(dx*scale,dy*scale);drag.x=event.clientX;drag.y=event.clientY;onChange();
  });
  for(const type of ['pointerup','pointercancel','lostpointercapture'])listen(type,event=>{if(drag?.id===event.pointerId)cancel();});
  listen('wheel',event=>{
    if(event.target!==canvas||!usable()||!event.deltaY)return;
    event.preventDefault();onFocus();const time=now();
    const fov=sim.state.scope.fov;
    if(event.deltaY<0&&fov<=SCOPE_FRAMING.minimumFov||event.deltaY>0&&fov>=SCOPE_FRAMING.maximumFov)return;
    if(time-wheelAt>250)onBegin('内窥镜光学变焦');wheelAt=time;
    const units=event.deltaMode===1?16:event.deltaMode===2?canvas.getBoundingClientRect().height:1;
    if(sim.zoomScope(event.deltaY*units*.0015))onChange();
  },{passive:false});
  return {cancel,dispose(){cancel();for(const [type,handler,options]of listeners)canvas.removeEventListener(type,handler,options);}};
}
