import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {loadAssemblies,G1_GRIP} from './authentic-assemblies.js';
import {ScopeFeed} from './scope-feed.js';
import {buildOperatingRoom,buildOperatingRoomSteps} from './operating-room.js';
import {prepareEnvironment} from './environment-preparation.js';
import {runCooperatively,runImmediately} from './cooperative-work.js';
import {ExactRenderBatches} from './exact-render-batches.js';
import {fixedRenderFrame,frameLayout,styleFixedPreview} from './render-frame.js';

const V=new THREE.Vector3(), Y=new THREE.Vector3(0,1,0), Q=new THREE.Quaternion();
const BASE=import.meta.env?.BASE_URL??'/';
const nominalJointAngle=name=>name.endsWith('_shoulder_pitch_joint')?.8:name.endsWith('_shoulder_roll_joint')?(name.startsWith('left_')?.2:-.2):name.endsWith('_elbow_joint')?1.1:0;
const material=(color,metalness=0,roughness=.5)=>new THREE.MeshStandardMaterial({color,metalness,roughness});
const steel=material('#c7d0d2',.95,.23), steelDark=material('#607178',.85,.3), black=material('#142024',.25,.4);
function mesh(geometry,mat,parent){const m=new THREE.Mesh(geometry,mat);m.castShadow=true;m.receiveShadow=true;parent?.add(m);return m;}
function box(size,pos,mat,parent,radius=0){const m=mesh(radius?new RoundedBoxGeometry(...size,3,Math.min(radius,...size.map(v=>v*.45))):new THREE.BoxGeometry(...size),mat,parent);m.position.set(...pos);return m;}
function sphere(scale,pos,mat,parent){const m=mesh(new THREE.SphereGeometry(1,40,28),mat,parent);m.scale.set(...scale);m.position.set(...pos);return m;}
function segment(parent,a,b,radius,mat=steel,endRadius=radius){const m=mesh(new THREE.CylinderGeometry(endRadius,radius,1,16),mat,parent);m.userData.radius=radius;setSegment(m,a,b);return m;}
function setSegment(m,a,b){V.subVectors(b,a);const length=V.length();m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(Y,V.normalize());m.scale.set(1,Math.max(length,.00001),1);}
function labelSprite(text,color='#d6e9df'){
  const c=document.createElement('canvas');c.width=512;c.height=96;const x=c.getContext('2d');x.fillStyle='#12221ee0';x.roundRect(0,0,512,96,14);x.fill();x.fillStyle=color;x.font='500 28px sans-serif';x.textAlign='center';x.fillText(text,256,59);const m=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),transparent:true,depthTest:false}));m.scale.set(.29,.054,1);return m;
}
function* tissueTextureSteps(){const c=document.createElement('canvas');c.width=c.height=256;const x=c.getContext('2d');let seed=1234;const rnd=()=>{seed=(Math.imul(seed,1664525)+1013904223)|0;return(seed>>>0)/4294967296};x.fillStyle='#b39e91';x.fillRect(0,0,256,256);for(let i=0;i<7500;i++){const a=rnd(),b=rnd(),r=rnd()*2+.3;x.fillStyle=`rgba(${rnd()>.5?'205,182,160':'104,83,78'},${rnd()*.15})`;x.beginPath();x.ellipse(a*256,b*256,r,r*.6,0,0,7);x.fill();if(i%256===255)yield;}const tex=new THREE.CanvasTexture(c);tex.wrapS=tex.wrapT=THREE.RepeatWrapping;tex.repeat.set(3,3);tex.colorSpace=THREE.SRGBColorSpace;return tex;}
function sterileDrape(parent){
  const geometry=new THREE.PlaneGeometry(.78,.96,40,48),p=geometry.attributes.position;
  for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i),edge=Math.abs(x)/.39;p.setZ(i,-.075*edge**4+.0028*Math.sin(31*x+7*y)*Math.sin(23*y)+.0015*Math.cos(57*x-19*y));}
  geometry.computeVertexNormals();
  const cloth=material('#467e82',0,.97);cloth.side=THREE.DoubleSide;
  cloth.onBeforeCompile=shader=>{shader.vertexShader='varying vec2 drapeLocal;\n'+shader.vertexShader;shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\ndrapeLocal=position.xy;');shader.fragmentShader='varying vec2 drapeLocal;\n'+shader.fragmentShader;shader.fragmentShader=shader.fragmentShader.replace('#include <clipping_planes_fragment>','#include <clipping_planes_fragment>\nif(drapeLocal.y<-.30||(abs(drapeLocal.x)<.168&&abs(drapeLocal.y)<.198))discard;');};
  cloth.customProgramCacheKey=()=> 'cotton-operative-drape-window';
  const cover=mesh(geometry,cloth,parent);cover.name='Sterile_Fenestrated_Surgical_Drape';cover.rotation.x=-Math.PI/2;cover.position.set(0,1.14,0);cover.layers.set(0);
  const seam=material('#79a5a3',0,.98);
  for(const x of[-.174,.174])box([.007,.001,.41],[x,1.142,0],seam,parent);
  for(const z of[-.204,.204])box([.35,.001,.007],[0,1.142,z],seam,parent);
  return cover;
}

function exactSources(view){
  // Keep the original articulated CAD hierarchy for IK and collision. Only
  // transport compatible opaque draw buffers through the existing exact batch.
  // Camera-dependent cavity visibility is deliberately outside these roots.
  const a=view.assemblies,sources=[];
  // Keep the two operative instruments on their original draw path: their
  // specular edges must remain pixel-identical in the endoscopic image.
  for(const root of [view.room,a?.scope?.group,a?.scopeArm?.mount])root?.traverse(m=>{if(m.isMesh)sources.push(m);});
  for(const tool of Object.values(a?.tools??{}))tool.group.traverse(m=>{if(m.isMesh&&!((view.exactBatches?.records.get(m)?.mask??m.layers.mask)&2))sources.push(m);});
  for(const mesh of view.tissue?._meshes.values()??[])sources.push(mesh);
  for(const piece of view.tissue?.fragments.items.values()??[])sources.push(piece.mesh);
  return sources;
}
function prepareExactGeometry(view){
    view.tissue?.blood?.flushRender();view.tissue?.blood?.surfaceFilm?.syncDisplay();view.tissue?.blood?.pooledFilm?.syncDisplay();
    const filmEnd=performance.now();
    if(view.tissue?.ready&&view.assemblies&&view.robotLoaded&&view.renderer.extensions.has('WEBGL_multi_draw')){
      view.exactBatches??=new ExactRenderBatches(view.scene);
      view.exactBatches.sync(exactSources(view));
    }else view.scene.updateMatrixWorld(true);
    const batchEnd=performance.now();
    return {filmEnd,batchEnd};
}

export class SurgicalScene{
  constructor(canvas,stage,mini,{deferPreparation=false}={}){
    this.startupTimings=[];let began=performance.now();const checkpoint=name=>{const end=performance.now();this.startupTimings.push({name,start:began,end,ms:end-began});began=end;};
    this.stage=stage;this.mini=mini;this.mode='endo';this.disposed=false;this.ready=false;
    this.renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance',preserveDrawingBuffer:false});
    this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));this.fixedFrame=fixedRenderFrame(globalThis.location?.search);styleFixedPreview(stage,mini,this.renderer.getPixelRatio(),this.fixedFrame);const initial=this.frameLayout;this.renderer.setSize(initial.width,initial.height,false);this.renderer.outputColorSpace=THREE.SRGBColorSpace;this.renderer.toneMapping=THREE.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.15;
    this.renderer.shadowMap.enabled=true;this.renderer.shadowMap.type=THREE.PCFSoftShadowMap;this.renderer.info.autoReset=false;
    checkpoint('webgl-context');this.scopeFeed=new ScopeFeed(this.renderer,1.10);
    checkpoint('scope-feed-construction');
    this.scene=new THREE.Scene();this.scene.background=new THREE.Color('#a4b3b3');
    // prepareExactGeometry refreshes the complete articulated hierarchy once
    // before both views. Neither pass changes transforms, so repeating the
    // same scene walk inside each renderer.render() is unnecessary.
    this.scene.matrixWorldAutoUpdate=false;
    if(deferPreparation)return;
    const room=new RoomEnvironment(),pmrem=new THREE.PMREMGenerator(this.renderer);this.env=pmrem.fromScene(room,.04);this.scene.environment=this.env.texture;pmrem.dispose();room.dispose();
    checkpoint('environment-pmrem');runImmediately(this._constructSteps(canvas));
  }
  static async create(canvas,stage,mini){
    await new Promise(resolve=>requestAnimationFrame(resolve));
    const view=new SurgicalScene(canvas,stage,mini,{deferPreparation:true});
    view.env=await prepareEnvironment(view.renderer,{onStage:row=>view.startupTimings.push(row)});view.scene.environment=view.env.texture;
    const work=await runCooperatively(view._constructSteps(canvas),{budgetMs:3});
    view.startupTimings.push({name:'scene-construction-slices',...work.stats});return view;
  }
  *_constructSteps(canvas){
    const checkpoint=name=>{const end=performance.now();this.startupTimings.push({name,start:this._stepStart??end,end,ms:end-(this._stepStart??end)});this._stepStart=end;};
    this._stepStart=performance.now();
    this.overviewCamera=new THREE.PerspectiveCamera(42,1,.015,30);this.overviewCamera.position.set(1.68,2.02,-1.92);
    this.endoCamera=new THREE.PerspectiveCamera(55,1,.003,5);this.endoCamera.layers.set(1);
    this.controls=new OrbitControls(this.overviewCamera,canvas);this.controls.target.set(0,1.20,.18);this.controls.enableDamping=true;this.controls.minDistance=.3;this.controls.maxDistance=4;this.controls.maxPolarAngle=Math.PI*.49;this.controls.enabled=false;
    const hemi=new THREE.HemisphereLight('#f4f7f6','#667572',1.35);this.scene.add(hemi);
    const endoHemi=new THREE.HemisphereLight('#fff9f3','#9c7670',.60);endoHemi.layers.set(1);this.scene.add(endoHemi);
    const light=new THREE.DirectionalLight('#fff5e8',2.1);light.position.set(-1.6,3.2,-1.4);light.castShadow=true;light.shadow.mapSize.set(1024,1024);light.shadow.camera.left=-1.6;light.shadow.camera.right=1.6;light.shadow.camera.top=1.6;light.shadow.camera.bottom=-1.6;light.shadow.normalBias=.0015;this.scene.add(light);
    const fill=new THREE.DirectionalLight('#dcebf0',.75);fill.position.set(2.2,1.8,.7);this.scene.add(fill);
    this.scopeLight=new THREE.SpotLight('#fffaf5',.14,.6,.72,.82,1);this.scopeLight.layers.set(1);this.scopeLight.target=new THREE.Object3D();this.scene.add(this.scopeLight,this.scopeLight.target);
    checkpoint('cameras-and-lights');yield;
    const built=yield* buildOperatingRoomSteps(this.scene,this.scopeFeed.monitorMaterial);
    this.room=built.room;this.monitor=built.monitor;this.monitorScreen=built.monitorScreen;this.robotPlatform=built.platform;
    yield;yield* this._makePatientSteps();yield;this._stepStart=performance.now();this._makeTools();this._makeScopeArm();
    this.robot=new THREE.Group();this.robot.position.set(0,1.0922729,.42);this.robot.rotation.y=Math.PI/2;this.scene.add(this.robot);
    this.joints=[];this.robotLoaded=false;this.armTargets={left:new THREE.Vector3(),right:new THREE.Vector3()};this.armErrors={left:0,right:0};this.handPositions={left:new THREE.Vector3(),right:new THREE.Vector3()};this.conceptDecoupled=false;this.kinematicLimited=false;
    this.targetMarker=mesh(new THREE.SphereGeometry(.0011,12,8),new THREE.MeshBasicMaterial({color:'#9de3c6'}),this.scene);this.targetMarker.layers.set(1);this.targetMarker.visible=false;
    this._makeCollisionMarkers();
    this.resizeObserver=new ResizeObserver(()=>this.resize());this.resizeObserver.observe(this.stage);this.lastMini=0;
    checkpoint('tools-and-markers');
  }
  async loadRobot(){
    const loader=new GLTFLoader();const [gltf,res]=await Promise.all([loader.loadAsync(BASE+'assets/g1.glb'),fetch(BASE+'assets/g1-kinematics.json')]);const meta=await res.json();this.robot.add(gltf.scene);this.robot.updateMatrixWorld(true);
    gltf.scene.traverse(m=>{if(m.isMesh){m.castShadow=true;m.receiveShadow=true;if(!m.geometry.attributes.normal)m.geometry.computeVertexNormals();if(m.material){m.material.roughness=.38;m.material.metalness=.11;if(m.material.name==='dark'){m.material.color.set('#141a1e');m.material.roughness=.47;m.material.metalness=.08;}else if(m.material.name==='white')m.material.color.set('#d9dfde');}}});
    this.robotModel=gltf.scene;this.robotMetadata=meta;
    for(const j of meta.joints){const node=gltf.scene.getObjectByName(j.name);if(!node||j.type==='fixed')continue;node.userData.rest=node.quaternion.clone();node.userData.angle=0;node.userData.axis=new THREE.Vector3(...j.axis);node.userData.limit=j.limit||j.limits||{lower:-Math.PI,upper:Math.PI};this.joints.push(node);}
    // Nominal stable posture. The original manufacturer's mesh and joint frames are retained.
    for(const node of this.joints)this.setJoint(node.name,nominalJointAngle(node.name));
    this.handMarkers={};this.handQuaternions={left:new THREE.Quaternion(),right:new THREE.Quaternion()};for(const side of['left','right']){const hand=gltf.scene.getObjectByName(side+'_rubber_hand');if(hand){const marker=new THREE.Object3D();marker.name=side+'_Measured_Palm_Grip_Frame';marker.position.fromArray(G1_GRIP[side]);hand.add(marker);this.handMarkers[side]=marker;}}
    this.robotLoaded=true;return meta;
  }
  async loadAnatomy(){
    this.assemblies=await loadAssemblies(this.scene);
    this.assemblies.scopeMount.position.set(this.robot.position.x,this.robot.position.y+.2377271,this.robot.position.z-.17);
    // Clock the vertical plate through 180 degrees so the source Z1 folds down
    // from the elevated chest; the original joint geometry/limits are retained.
    this.assemblies.scopeMount.quaternion.premultiply(Q.setFromAxisAngle(new THREE.Vector3(0,0,1),Math.PI));
    Object.values(this.tools).forEach(t=>t.group.visible=false);this.scopeShaft.visible=false;this.scopeHead.visible=false;this.scopeLens.visible=false;this.scopeArm.visible=false;
    const anatomy=await new GLTFLoader().loadAsync(BASE+'assets/patient-skin.glb');
    anatomy.scene.rotation.x=-Math.PI/2;anatomy.scene.position.set(0,1.035,0);
    anatomy.scene.traverse(o=>{if(o.isMesh){if(!o.geometry.attributes.normal)o.geometry.computeVertexNormals();o.material=new THREE.MeshStandardMaterial({color:'#bfa08a',roughness:.65,metalness:0,side:THREE.DoubleSide});o.material.onBeforeCompile=shader=>{shader.vertexShader='varying vec3 patientLocal;\n'+shader.vertexShader;shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\npatientLocal=position;');shader.fragmentShader='varying vec3 patientLocal;\n'+shader.fragmentShader;shader.fragmentShader=shader.fragmentShader.replace('#include <clipping_planes_fragment>','#include <clipping_planes_fragment>\nif(abs(patientLocal.x)<.17&&abs(patientLocal.y)<.20&&patientLocal.z>0.0)discard;\nif(patientLocal.y<-.30)discard;');};o.material.customProgramCacheKey=()=> 'anatomy-teaching-window';o.castShadow=true;o.receiveShadow=true;o.layers.set(0);}});
    this.scene.add(anatomy.scene);this.patientOuter.children[0].visible=false;this.patientOuter.children[3].visible=false;this.patientOuter.children[4].visible=false;
    this.patientOuter.children[1].visible=false;this.patientOuter.children[2].visible=false;this.patientOuter.children[5].visible=false;
    this.patientOuter.children[6].visible=false;this.patientOuter.children[7].visible=false;
    this.drape=sterileDrape(this.patientOuter);
    const context=await new GLTFLoader().loadAsync(BASE+'assets/hepatobiliary-context.glb');
    this.anatomicContext=context.scene;this.anatomicContext.rotation.x=-Math.PI/2;this.anatomicContext.position.set(0,1.035,0);
    this.anatomicContext.traverse(o=>{if(o.isMesh){o.layers.enable(1);o.castShadow=o.receiveShadow=true;if(!o.geometry.attributes.normal)o.geometry.computeVertexNormals();o.material.roughness=.48;o.material.metalness=0;}});
    this.scene.add(this.anatomicContext);this.gallbladder.visible=false;this.schematicVessels.visible=false;this.cavity.children[1].visible=false;
    return this.assemblies;
  }
  setJoint(name,angle){
    this._jointByName??=new Map();let n=this._jointByName.get(name);
    if(!n){n=this.robotModel?.getObjectByName(name);if(n)this._jointByName.set(name,n);}
    if(!n?.userData.rest||!Number.isFinite(angle))return;
    const l=n.userData.limit;angle=THREE.MathUtils.clamp(angle,l.lower??-Math.PI,l.upper??Math.PI);
    n.userData.angle=angle;n.quaternion.copy(n.userData.rest).multiply(Q.setFromAxisAngle(n.userData.axis,angle));
    if(!this._ikSolving&&this._armIK)for(const cache of Object.values(this._armIK))cache.valid=false;
  }
  _makeRoom(){
    const built=buildOperatingRoom(this.scene,this.scopeFeed.monitorMaterial);
    this.room=built.room;this.monitor=built.monitor;this.monitorScreen=built.monitorScreen;this.robotPlatform=built.platform;
  }
  _makePatient(){return runImmediately(this._makePatientSteps());}
  *_makePatientSteps(){
    const outer=new THREE.Group();this.patientOuter=outer;this.scene.add(outer);const drape=material('#436c70',.05,.94);drape.normalMap=null;
    sphere([.22,.12,.52],[0,.99,-.13],drape,outer);box([.49,.035,.48],[0,1.03,-.63],drape,outer);box([.49,.035,.46],[0,1.03,.38],drape,outer);
    yield;const skin=material('#bb8d75',0,.7);sphere([.10,.105,.125],[0,1.035,-.76],skin,outer);sphere([.105,.044,.105],[0,1.11,-.76],material('#558c89',0,.7),outer);
    // A transparent teaching window exposes the anatomical working volume in overview.
    const cutoutMat=material('#c99882',0,.65);cutoutMat.transparent=true;cutoutMat.opacity=.22;cutoutMat.depthWrite=false;
    sphere([.17,.095,.23],[0,1.09,-.02],cutoutMat,outer);
    // Drape portions flank an open work window instead of hiding the intracorporeal scene.
    for(const x of [-.22,.22])box([.11,.04,.51],[x,1.105,-.02],drape,outer);
    yield;const cavityTexture=yield* tissueTextureSteps();this.cavity=new THREE.Group();this.scene.add(this.cavity);const cavityMat=new THREE.MeshPhysicalMaterial({color:'#b6afa2',roughness:.76,metalness:0,side:THREE.BackSide,map:cavityTexture,clearcoat:.08,clearcoatRoughness:.58});
    const inner=sphere([.25,.16,.29],[0,1.085,0],cavityMat,this.cavity);inner.layers.set(1);inner.castShadow=false;
    const diaphragm=sphere([.18,.028,.13],[0,1.00,-.14],material('#ac7b74',0,.55),this.cavity);diaphragm.layers.enable(1);
    yield;this.gallbladder=sphere([.012,.017,.032],[-.032,1.001,.055],new THREE.MeshPhysicalMaterial({color:'#68804b',roughness:.3,clearcoat:.6}),this.cavity);this.gallbladder.rotation.z=.3;this.gallbladder.layers.enable(1);
    // Small vessels are schematic context; the liver surface itself comes from an anatomical source.
    this.schematicVessels=new THREE.Group();this.cavity.add(this.schematicVessels);
    const vesselMat=material('#794240',.05,.4);for(let i=0;i<3;i++){const curve=new THREE.CatmullRomCurve3([new THREE.Vector3(-.035+i*.014,.997,-.02),new THREE.Vector3(-.025+i*.013,1.003,.016),new THREE.Vector3(-.038+i*.02,1.002,.05)]);const vessel=mesh(new THREE.TubeGeometry(curve,16,.0015,6,false),vesselMat,this.schematicVessels);vessel.layers.enable(1);}
    yield;this.portMeshes=[];for(const [x,z]of[[-.08,.1],[.08,.1],[0,.14]]){const p=new THREE.Group();p.position.set(x,1.18,z);this.scene.add(p);const ring=mesh(new THREE.TorusGeometry(.009,.0016,8,24),material('#73a7a4',.3,.42),p);ring.rotation.x=Math.PI/2;const cap=mesh(new THREE.CylinderGeometry(.007,.006,.015,20),black,p);cap.position.y=-.006;const sleeve=mesh(new THREE.CylinderGeometry(.0054,.0048,.064,16),steelDark,p);sleeve.position.y=.032;const seal=mesh(new THREE.TorusGeometry(.0061,.0011,8,20),black,p);seal.rotation.x=Math.PI/2;seal.position.y=-.014;this.portMeshes.push(p);}
  }
  _makeTools(){
    // Empty loading placeholders; all visible instruments come from source CAD.
    this.tools={left:{group:new THREE.Group()},right:{group:new THREE.Group()}};
    this.scopeShaft=new THREE.Group();this.scopeHead=new THREE.Group();this.scopeLens=new THREE.Group();
  }
  _makeScopeArm(){this.scopeArm=new THREE.Group();}
  addTissue(tissue){this.tissue=tissue;tissue.group.position.set(0,1.035,0);this.scene.add(tissue.group);tissue.group.traverse(m=>{m.layers.enable(1);if(m.isMesh){m.castShadow=true;m.receiveShadow=true;}});}
  resize(){
    const {width:w,height:h}=this.frameLayout;if(w<1||h<1)return;
    if(this._width===w&&this._height===h)return;
    const start=performance.now();this._width=w;this._height=h;
    this.renderer.setSize(w,h,false);this.overviewCamera.aspect=w/h;this.overviewCamera.updateProjectionMatrix();this.endoCamera.aspect=w/h;this.endoCamera.updateProjectionMatrix();
    this.resizeTimings??=[];this.resizeTimings.push({at:start,width:w,height:h,ms:performance.now()-start});if(this.resizeTimings.length>32)this.resizeTimings.shift();
  }
  setMode(mode){this.mode=mode;this.controls.enabled=mode==='overview';}
  get frameLayout(){return frameLayout(this.stage,this.mini,this.renderer.getPixelRatio(),this.fixedFrame);}
  get renderFrame(){const size=this.renderer.getDrawingBufferSize(new THREE.Vector2());return{fixed:!!this.fixedFrame,width:size.x,height:size.y,previewWidth:this.stage.clientWidth,previewHeight:this.stage.clientHeight,layout:this.frameLayout};}
  get scopeAspect(){const frame=this.frameLayout,area=this.mode==='endo'?frame:frame.mini;return Math.max(1,area.width)/Math.max(1,area.height);}
  home(){const damping=this.controls.enableDamping;this.controls.enableDamping=false;this.controls.update();this.overviewCamera.position.set(1.68,2.02,-1.92);this.controls.target.set(0,1.20,.18);this.controls.update();this.controls.enableDamping=damping;}
  /** Reset is a deliberate offscreen relocation, distinct from undo/history
   * cache invalidation. Start every source joint from the same seed, then solve
   * to the reset tools before rendering; no stale arm pose survives this call. */
  resetPresentation(state,{settleFrames=20}={}){
    this.releaseKinematicGuard();
    for(const node of this.joints??[])this.setJoint(node.name,nominalJointAngle(node.name));
    this.robot?.updateMatrixWorld(true);this.assemblies?.resetPresentation();
    this.armErrors??={left:0,right:0};this.armErrors.left=this.armErrors.right=0;
    this.conceptDecoupled=false;
    for(let frame=0;frame<Math.max(1,Math.min(120,settleFrames));frame++)this.update(state,.05);
    if(this.controls&&this.overviewCamera)this.home();
    return {armErrors:{...this.armErrors},scopeArmError:this.assemblies?.scopeArmError??0};
  }
  // Kept for reset/history compatibility. Rendering never rewrites a tool pose.
  releaseKinematicGuard(){this.acceptedArmPoses={};this.kinematicLimited=false;this._armIK=null;this.assemblies?.resetPose();}
  guardArmTargets(){this.kinematicLimited=false;return false;}
  _makeCollisionMarkers(){
    const group=this.collisionMarkers=new THREE.Group();group.name='Measured_Instrument_Contact';group.visible=false;this.scene.add(group);
    const amber=new THREE.MeshBasicMaterial({color:'#ffc76d'}),pointGeometry=new THREE.SphereGeometry(.00065,10,8);
    group.userData.points=['left','right'].map(side=>{const point=new THREE.Mesh(pointGeometry,amber);point.name=side+'_Surface_Contact_Point';point.layers.enable(1);group.add(point);return point;});
    const line=group.userData.line=new THREE.Mesh(new THREE.CylinderGeometry(.00018,.00018,1,8),amber);line.name='Surface_Contact_Gap';line.layers.enable(1);group.add(line);group.layers.enable(1);
  }
  _updateCollisionMarkers(collision){
    const group=this.collisionMarkers;if(!group)return;
    const points=collision?.closestPoints,valid=p=>Array.isArray(p)&&p.length===3&&p.every(Number.isFinite);
    group.visible=!!(collision?.blocked||collision?.contact)&&valid(points?.left)&&valid(points?.right);
    if(!group.visible)return;
    const [left,right]=group.userData.points;left.position.fromArray(points.left);right.position.fromArray(points.right);
    const distance=left.position.distanceTo(right.position);group.userData.line.visible=distance>1e-6&&distance<.012;
    if(group.userData.line.visible)setSegment(group.userData.line,left.position,right.position);
  }
  solveArm(side,target,dt=1/60,gripOrientation=null){
    if(!this.robotLoaded)return;
    this._armIK??={};let cache=this._armIK[side];
    if(!cache){
      const names=['shoulder_pitch','shoulder_roll','shoulder_yaw','elbow','wrist_roll','wrist_pitch','wrist_yaw'];
      const chain=names.map(name=>this.robotModel.getObjectByName(side+'_'+name+'_joint')).filter(Boolean);
      const end=this.handMarkers?.[side]||this.robotModel.getObjectByName(side+'_wrist_yaw_link')||chain.at(-1);if(!end)return;
      cache=this._armIK[side]={chain,end,valid:false,settled:false,stationaryFrames:0,error:Infinity,bestError:Infinity,
        target:new THREE.Vector3(),rootMatrix:new THREE.Matrix4(),bestAngles:new Float64Array(chain.length),
        jacobian:new Float64Array(3*chain.length),matrixElements:new Float64Array(9),centering:new Float64Array(chain.length),
        orientationError:new THREE.Vector3(),orientationQ:new THREE.Quaternion(),goalOrientation:new THREE.Quaternion(),
        lower:new Float64Array(chain.length),upper:new Float64Array(chain.length),inverse:new THREE.Matrix3(),
        pivot:new THREE.Vector3(),endPos:new THREE.Vector3(),axis:new THREE.Vector3(),a:new THREE.Vector3(),b:new THREE.Vector3(),cross:new THREE.Vector3(),scale:new THREE.Vector3(),q:new THREE.Quaternion()};
    }
    this.robot.updateWorldMatrix(true,false);
    const unchanged=cache.valid&&cache.target.distanceToSquared(target)<1e-14&&cache.rootMatrix.equals(this.robot.matrixWorld)&&(!gripOrientation||1-Math.abs(cache.goalOrientation.dot(gripOrientation))<1e-12);
    if(unchanged&&(cache.error<.0002||cache.settled)){this.armErrors[side]=cache.error;return;}
    const {chain,end,pivot,endPos,axis,q,a,b,cross,scale,jacobian,matrixElements,centering,lower,upper,inverse,orientationError,orientationQ}=cache,previousError=cache.error;
    this.robot.updateMatrixWorld(true);
    endPos.setFromMatrixPosition(end.matrixWorld);
    if(!unchanged){
      cache.target.copy(target);cache.rootMatrix.copy(this.robot.matrixWorld);cache.stationaryFrames=0;cache.settled=false;
      if(gripOrientation)cache.goalOrientation.copy(gripOrientation);
      cache.bestError=endPos.distanceTo(target);for(let i=0;i<chain.length;i++)cache.bestAngles[i]=chain[i].userData.angle;
    }
    // A passive ball joint connects the real shaft clamp to the strapped palm
    // saddle. Its centre follows position IK; the complete saddle orientation
    // comes from the genuine hand frame, rather than rotating a fake hand.
    // Damped least squares and null-space joint centering prevent the original
    // CCD solver from becoming trapped at the shoulder roll limit mid-demo.
    const count=chain.length,h=THREE.MathUtils.clamp(Number.isFinite(dt)?dt:1/60,.001,.05);
    for(let i=0;i<count;i++){const n=chain[i],l=n.userData.limit,speed=l.velocity??12;lower[i]=Math.max(l.lower,n.userData.angle-speed*h);upper[i]=Math.min(l.upper,n.userData.angle+speed*h);}
    this._ikSolving=true;
    for(let pass=0;pass<6;pass++){
      if(endPos.distanceToSquared(target)<4e-8)break;
      orientationError.set(0,0,0);
      if(gripOrientation){
        end.matrixWorld.decompose(pivot,orientationQ,scale);orientationQ.invert().premultiply(gripOrientation).normalize();
        if(orientationQ.w<0)orientationQ.set(-orientationQ.x,-orientationQ.y,-orientationQ.z,-orientationQ.w);
        const sine=Math.hypot(orientationQ.x,orientationQ.y,orientationQ.z),angle=2*Math.acos(THREE.MathUtils.clamp(orientationQ.w,-1,1));
        orientationError.set(orientationQ.x,orientationQ.y,orientationQ.z).multiplyScalar(sine>1e-10?angle/sine:0);
      }
      for(let i=0;i<count;i++){
        const n=chain[i];n.matrixWorld.decompose(pivot,q,scale);
        axis.copy(n.userData.axis).applyQuaternion(q).normalize();a.subVectors(endPos,pivot);cross.crossVectors(axis,a);
        jacobian[i]=cross.x;jacobian[count+i]=cross.y;jacobian[2*count+i]=cross.z;
        const l=n.userData.limit;centering[i]=.4*((l.lower+l.upper)*.5-n.userData.angle)/(l.upper-l.lower)+.015*axis.dot(orientationError);
      }
      for(let row=0;row<3;row++)for(let column=0;column<3;column++){let value=row===column?.000025:0;for(let i=0;i<count;i++)value+=jacobian[row*count+i]*jacobian[column*count+i];matrixElements[column*3+row]=value;}
      inverse.fromArray(matrixElements).invert();a.subVectors(target,endPos).applyMatrix3(inverse);
      b.set(0,0,0);for(let i=0;i<count;i++){b.x+=jacobian[i]*centering[i];b.y+=jacobian[count+i]*centering[i];b.z+=jacobian[2*count+i]*centering[i];}b.applyMatrix3(inverse);
      for(let i=0;i<count;i++){
        const delta=jacobian[i]*a.x+jacobian[count+i]*a.y+jacobian[2*count+i]*a.z+centering[i]-(jacobian[i]*b.x+jacobian[count+i]*b.y+jacobian[2*count+i]*b.z);
        this.setJoint(chain[i].name,THREE.MathUtils.clamp(chain[i].userData.angle+THREE.MathUtils.clamp(delta,-.2,.2),lower[i],upper[i]));
      }
      // Updating the shoulder subtree once updates all seven joints and the
      // unscaled source hand, without rebuilding every CAD subtree per joint.
      chain[0].updateMatrixWorld(true);
      endPos.setFromMatrixPosition(end.matrixWorld);
      const error=endPos.distanceTo(target);
      if(error<cache.bestError){cache.bestError=error;for(let i=0;i<chain.length;i++)cache.bestAngles[i]=chain[i].userData.angle;}
      if(error<.0002)break;
    }
    cache.error=endPos.distanceTo(target);
    if(cache.error>cache.bestError+1e-8){
      for(let i=0;i<chain.length;i++)this.setJoint(chain[i].name,cache.bestAngles[i]);
      this.robot.updateMatrixWorld(true);cache.error=cache.bestError;
    }
    this._ikSolving=false;
    cache.stationaryFrames=unchanged&&Math.abs(previousError-cache.error)<1e-6?cache.stationaryFrames+1:0;
    // A stationary, unreachable command keeps the best genuine joint pose.
    // This caches rendering work only; it never modifies the user's tool pose.
    cache.settled=cache.stationaryFrames>=3;cache.valid=true;this.armErrors[side]=cache.error;
  }
  update(state,dt){
    this.assemblies?.update(state,dt);
    this._updateCollisionMarkers(state.collision);
    for(const [index,side] of ['left','right'].entries()){
      const target=this.assemblies?.toolGripPositions[side];
      if(target){this.armTargets[side].copy(target);this._gripOrientation??=new THREE.Quaternion();this._gripClock??=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1),Math.PI/2);this._gripOrientation.copy(this.assemblies.tools[side].group.quaternion).multiply(this._gripClock);this.solveArm(side,target,dt,this._gripOrientation);}
      this.handMarkers?.[side]?.getWorldPosition(this.handPositions[side]);
      this.handQuaternions??={left:new THREE.Quaternion(),right:new THREE.Quaternion()};this.handMarkers?.[side]?.getWorldQuaternion(this.handQuaternions[side]);
      if(this.assemblies)this.portMeshes[index].quaternion.setFromUnitVectors(Y,this.assemblies.tools[side].shaftDirection);
    }
    this.assemblies?.connectHands(this.handPositions,this.armErrors,this.handQuaternions);
    this.conceptDecoupled=this.assemblies?.conceptDecoupled??false;this.kinematicLimited=false;
    const sc=state.scope,sp=new THREE.Vector3(...sc.position);
    if(this.assemblies)this.portMeshes[2].quaternion.setFromUnitVectors(Y,this.assemblies.scope.direction);
    if(this.endoCamera.fov!==(sc.fov??55)){this.endoCamera.fov=sc.fov??55;this.endoCamera.updateProjectionMatrix();}
    this.endoCamera.position.copy(sp);if(sc.cameraUp)this.endoCamera.up.fromArray(sc.cameraUp);else this.endoCamera.up.set(0,1,0);this.endoCamera.lookAt(new THREE.Vector3(...sc.lookAt));
    this.scopeLight.position.copy(sp);this.scopeLight.target.position.set(...sc.lookAt);
    this.controls.update();
  }
  prepareRenderGeometry(){return prepareExactGeometry(this);}
  async prepareRenderGeometryAsync(){
    if(!this.exactBatches&&this.tissue?.ready&&this.assemblies&&this.robotLoaded&&this.renderer.extensions.has('WEBGL_multi_draw')){
      this.exactBatches=new ExactRenderBatches(this.scene);
      const start=performance.now(),work=await runCooperatively(this.exactBatches.syncSteps(exactSources(this)),{budgetMs:3,valid:()=>!this.disposed});
      if(work.cancelled)throw new Error('Scene preparation cancelled');
      this.geometryPreparation={name:'initial-exact-batches',start,end:performance.now(),work:work.stats};
    }
    return prepareExactGeometry(this);
  }
  render(now=0){
    const renderStart=performance.now();
    const {filmEnd,batchEnd}=prepareExactGeometry(this);
    const r=this.renderer,{width:w,height:h,mini}=this.frameLayout;
    if(w<1||h<1)return;
    const {x:mx,y:my,width:mw,height:mh}=mini;
    r.info.reset();r.setScissorTest(false);r.setViewport(0,0,w,h);
    // Capture the intracorporeal scene once. The LCD and viewport reuse this frame.
    this.cavity.children[0].visible=true;this.scene.background=new THREE.Color('#6b4a42');
    this.scene.environmentIntensity=.34;r.toneMappingExposure=1.10;
    const captureStart=performance.now();this.scopeFeed.capture(r,this.scene,this.endoCamera,this.mode==='endo'?w:mw,this.mode==='endo'?h:mh);
    const scopeEnd=performance.now(),scopeCalls=r.info.render?.calls??0;
    r.setRenderTarget(null);r.setScissorTest(false);r.setViewport(0,0,w,h);r.clear();
    this.cavity.children[0].visible=false;this.scene.background=new THREE.Color('#c2d0d0');
    this.scene.environmentIntensity=.80;r.toneMappingExposure=1.0;
    if(this.mode==='endo'){
      this.scopeFeed.blit(r,0,0,w,h);
      this.overviewCamera.aspect=mw/mh;this.overviewCamera.updateProjectionMatrix();
      r.setScissorTest(true);r.setScissor(mx,my,mw,mh);r.setViewport(mx,my,mw,mh);r.clearDepth();r.render(this.scene,this.overviewCamera);
    }else{
      this.overviewCamera.aspect=w/h;this.overviewCamera.updateProjectionMatrix();r.render(this.scene,this.overviewCamera);
      this.scopeFeed.blit(r,mx,my,mw,mh);
    }
    r.setScissorTest(false);
    this.renderTimings={filmMs:filmEnd-renderStart,batchMs:batchEnd-filmEnd,layoutMs:captureStart-batchEnd,scopeOnlyMs:scopeEnd-captureStart,scopeMs:scopeEnd-renderStart,overviewMs:performance.now()-scopeEnd,scopeCalls,overviewCalls:(r.info.render?.calls??0)-scopeCalls,multiDraw:r.extensions?.has?.('WEBGL_multi_draw')??false,batching:this.exactBatches?.metrics,resources:{geometries:r.info.memory?.geometries??null,textures:r.info.memory?.textures??null,programs:r.info.programs?.length}};
  }
  dispose(){this.disposed=true;this.exactBatches?.dispose();this.resizeObserver.disconnect();this.controls.dispose();this.env?.dispose();this.scene.traverse(o=>{o.geometry?.dispose();if(o.material){for(const m of Array.isArray(o.material)?o.material:[o.material])if(m!==this.scopeFeed.monitorMaterial)m.dispose();}});this.scopeFeed.dispose();this.renderer.dispose();}
}
