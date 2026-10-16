import * as THREE from 'three';

const caches=new WeakMap();
const validVector=value=>Array.isArray(value)&&value.length===3&&value.every(Number.isFinite);
const midpoint=(a,b)=>a.map((v,i)=>(v+b[i])*.5);
const point=value=>new THREE.Vector3().fromArray(value);

function cacheFor(sim,tissue){
  let tissues=caches.get(sim);
  if(!tissues){tissues=new WeakMap();caches.set(sim,tissues);}
  let cache=tissues.get(tissue);
  if(!cache){cache={queriedAt:-Infinity,surface:null,lastSpecimenId:null,epoch:tissue._epoch,scopeReference:null};tissues.set(tissue,cache);}
  return cache;
}

/** Bounds belong only to the original parent material. Detached meshes must
 * never enlarge this box, even after being carried far from the organ. */
function parentBounds(tissue){
  const bounds=tissue.metadata?.bounds;
  if(!Array.isArray(bounds)||bounds.length!==2||!bounds.every(validVector)||bounds[0].some((v,i)=>v>bounds[1][i]))return null;
  const local=new THREE.Box3(point(bounds[0]),point(bounds[1]));
  const displacement=tissue.graspMetrics?.displacement;
  if(validVector(displacement)){
    // A compact traction map is p + displacement*w, with 0 <= w <= 1.
    // Componentwise expansion is conservative and limited to actual traction.
    local.min.add(point(displacement.map(v=>Math.min(0,v))));
    local.max.add(point(displacement.map(v=>Math.max(0,v))));
  }
  return {local,world:local.clone().applyMatrix4(tissue.group.matrixWorld)};
}

function specimenContext(tissue,interaction,cache){
  const pieces=tissue.fragmentMetrics?.pieces??[];
  const currentId=interaction?.grasp?.fragmentId;
  const selected=pieces.find(p=>currentId!=null&&p.id===currentId)||pieces.find(p=>p.held)||
    pieces.find(p=>p.id===cache.lastSpecimenId)||pieces.at(-1);
  if(!selected){cache.lastSpecimenId=null;return null;}
  const fragment=tissue.getFragment?.(selected.id),mesh=fragment?.mesh;
  if(!mesh?.geometry)return null;
  if(!mesh.geometry.boundingSphere)mesh.geometry.computeBoundingSphere();
  if(!mesh.geometry.boundingSphere)return null;
  mesh.updateWorldMatrix(true,false);
  const sphere=mesh.geometry.boundingSphere.clone().applyMatrix4(mesh.matrixWorld);
  if(!Number.isFinite(sphere.radius)||sphere.radius<0||!validVector(sphere.center.toArray()))return null;
  cache.lastSpecimenId=selected.id;
  return {id:selected.id,position:sphere.center.toArray(),radius:sphere.radius};
}

/** Build world-space context for Simulation.setScopeContext.
 * now is a performance.now()-style timestamp in milliseconds. Mother-surface
 * queries are throttled to 150 ms; intent/rigid specimen poses stay current.
 * This function does not move tools, the scope, tissue or interaction state. */
export function makeScopeContext(sim,tissue,interaction,now=globalThis.performance?.now?.()??Date.now()){
  if(!sim?.state?.scope||!tissue?.group)throw new TypeError('Scope context requires a simulation and tissue group.');
  if(!Number.isFinite(now))throw new TypeError('Scope context timestamp must be finite milliseconds.');
  const cache=cacheFor(sim,tissue),state=sim.state,scope=state.scope;
  tissue.group.updateWorldMatrix(true,false);
  // Simulation.restore/reset replace the scope object, sometimes before a
  // tissue epoch changes. Fallbacks must belong to that restored state, never
  // to the field or specimen that happened to be viewed immediately before it.
  if(cache.scopeReference!==scope||cache.epoch!==tissue._epoch){
    cache.scopeReference=scope;cache.epoch=tissue._epoch;cache.queriedAt=-Infinity;
    cache.surface=validVector(scope.fieldAnchor)?tissue.group.worldToLocal(point(scope.fieldAnchor)):null;
    cache.lastSpecimenId=scope.heldSpecimen?.id??null;
  }
  const bounds=parentBounds(tissue);
  const graspTarget=interaction?.grasp?[...state.tools.left.position]:null;
  // An armed B switch is not an ongoing right-hand operation. After cutting,
  // selecting the left grasper to carry a specimen must leave the parked right
  // tool out of grasp-follow composition, even when剪切 remains enabled.
  const operating=state.activeTool==='right'&&!!(state.cutting||interaction?.grasp||interaction?.contact?.cutting||interaction?.cuttingBusy);
  let intent;
  if(scope.followMode==='grasp'&&graspTarget)intent=operating?midpoint(graspTarget,state.tools.right.position):graspTarget;
  else if(scope.followMode==='midpoint'||scope.followMode==='grasp')intent=midpoint(state.tools.left.position,state.tools.right.position);
  else intent=[...state.tools[state.activeTool].position];

  if(!cache.surface&&validVector(scope.fieldAnchor))cache.surface=tissue.group.worldToLocal(point(scope.fieldAnchor));
  const needsQuery=now<cache.queriedAt||now-cache.queriedAt>=150||cache.epoch!==tissue._epoch;
  if(needsQuery&&tissue.ready!==false&&typeof tissue.findParentSurfacePoint==='function'){
    cache.queriedAt=now;cache.epoch=tissue._epoch;
    const query=tissue.group.worldToLocal(point(intent));
    if(bounds)bounds.local.clampPoint(query,query);
    // Only the parent-only API is permitted here. A far specimen cannot win a
    // generic nearest-object query and drag the normal operative view away.
    const surface=tissue.findParentSurfacePoint(query,.18);
    const coordinates=surface?.isVector3?surface.toArray():surface;
    if(validVector(coordinates))cache.surface=point(coordinates);
  }
  return {
    graspTarget,operating,
    surfaceTarget:cache.surface?tissue.group.localToWorld(cache.surface.clone()).toArray():null,
    organBounds:bounds?{min:bounds.world.min.toArray(),max:bounds.world.max.toArray()}:null,
    heldSpecimen:specimenContext(tissue,interaction,cache),
  };
}
