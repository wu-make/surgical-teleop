import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {loadAssemblies} from './authentic-assemblies.js';

const V=new THREE.Vector3(), Y=new THREE.Vector3(0,1,0), Q=new THREE.Quaternion();
const BASE=import.meta.env?.BASE_URL??'/';
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
function tissueTexture(){const c=document.createElement('canvas');c.width=c.height=256;const x=c.getContext('2d');let seed=1234;const rnd=()=>{seed=(Math.imul(seed,1664525)+1013904223)|0;return(seed>>>0)/4294967296};x.fillStyle='#9a615b';x.fillRect(0,0,256,256);for(let i=0;i<7500;i++){const a=rnd(),b=rnd(),r=rnd()*2+.3;x.fillStyle=`rgba(${rnd()>.5?'225,164,135':'81,31,35'},${rnd()*.15})`;x.beginPath();x.ellipse(a*256,b*256,r,r*.6,0,0,7);x.fill();}const tex=new THREE.CanvasTexture(c);tex.wrapS=tex.wrapT=THREE.RepeatWrapping;tex.repeat.set(3,3);tex.colorSpace=THREE.SRGBColorSpace;return tex;}
function sterileDrape(parent){
  const geometry=new THREE.PlaneGeometry(.78,.96,40,48),p=geometry.attributes.position;
  for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i),edge=Math.abs(x)/.39;p.setZ(i,-.075*edge**4+.0028*Math.sin(31*x+7*y)*Math.sin(23*y)+.0015*Math.cos(57*x-19*y));}
  geometry.computeVertexNormals();
  const cloth=material('#467e82',0,.97);cloth.side=THREE.DoubleSide;
  cloth.onBeforeCompile=shader=>{shader.vertexShader='varying vec2 drapeLocal;\n'+shader.vertexShader;shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\ndrapeLocal=position.xy;');shader.fragmentShader='varying vec2 drapeLocal;\n'+shader.fragmentShader;shader.fragmentShader=shader.fragmentShader.replace('#include <clipping_planes_fragment>','#include <clipping_planes_fragment>\nif(abs(drapeLocal.x)<.168&&abs(drapeLocal.y)<.198)discard;');};
  cloth.customProgramCacheKey=()=> 'cotton-operative-drape-window';
  const cover=mesh(geometry,cloth,parent);cover.name='Sterile_Fenestrated_Surgical_Drape';cover.rotation.x=-Math.PI/2;cover.position.set(0,1.14,0);cover.layers.set(0);
  const seam=material('#79a5a3',0,.98);
  for(const x of[-.174,.174])box([.007,.001,.41],[x,1.142,0],seam,parent);
  for(const z of[-.204,.204])box([.35,.001,.007],[0,1.142,z],seam,parent);
  return cover;
}

export class SurgicalScene{
  constructor(canvas,stage,mini){
    this.stage=stage;this.mini=mini;this.mode='endo';this.disposed=false;this.ready=false;
    this.renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance',preserveDrawingBuffer:false});
    this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));this.renderer.setSize(stage.clientWidth,stage.clientHeight,false);this.renderer.outputColorSpace=THREE.SRGBColorSpace;this.renderer.toneMapping=THREE.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.15;
    this.renderer.shadowMap.enabled=true;this.renderer.shadowMap.type=THREE.PCFSoftShadowMap;
    this.scene=new THREE.Scene();this.scene.background=new THREE.Color('#a4b3b3');
    const pmrem=new THREE.PMREMGenerator(this.renderer);this.env=pmrem.fromScene(new RoomEnvironment(),.04);this.scene.environment=this.env.texture;pmrem.dispose();
    this.overviewCamera=new THREE.PerspectiveCamera(42,1,.015,30);this.overviewCamera.position.set(1.55,1.87,-1.85);
    this.endoCamera=new THREE.PerspectiveCamera(60,1,.003,5);this.endoCamera.layers.set(1);
    this.controls=new OrbitControls(this.overviewCamera,canvas);this.controls.target.set(0,1.05,.12);this.controls.enableDamping=true;this.controls.minDistance=.3;this.controls.maxDistance=4;this.controls.maxPolarAngle=Math.PI*.49;this.controls.enabled=false;
    const hemi=new THREE.HemisphereLight('#f4f7f6','#667572',1.35);this.scene.add(hemi);
    const endoHemi=new THREE.HemisphereLight('#dcc1b1','#36251f',.24);endoHemi.layers.set(1);this.scene.add(endoHemi);
    const light=new THREE.DirectionalLight('#fff5e8',2.1);light.position.set(-1.6,3.2,-1.4);light.castShadow=true;light.shadow.mapSize.set(1024,1024);light.shadow.camera.left=-1.6;light.shadow.camera.right=1.6;light.shadow.camera.top=1.6;light.shadow.camera.bottom=-1.6;light.shadow.normalBias=.0015;this.scene.add(light);
    const fill=new THREE.DirectionalLight('#dcebf0',.75);fill.position.set(2.2,1.8,.7);this.scene.add(fill);
    this.scopeLight=new THREE.SpotLight('#f6dfcd',.032,.6,.72,.82,1);this.scopeLight.layers.set(1);this.scopeLight.target=new THREE.Object3D();this.scene.add(this.scopeLight,this.scopeLight.target);
    this._makeRoom();this._makePatient();this._makeTools();this._makeScopeArm();
    this.robot=new THREE.Group();this.robot.position.set(0,.9922729,.67);this.robot.rotation.y=Math.PI/2;this.scene.add(this.robot);
    this.joints=[];this.robotLoaded=false;this.armTargets={left:new THREE.Vector3(),right:new THREE.Vector3()};this.armErrors={left:0,right:0};this.handPositions={left:new THREE.Vector3(),right:new THREE.Vector3()};this.conceptDecoupled=false;this.kinematicLimited=false;
    this.targetMarker=mesh(new THREE.SphereGeometry(.0011,12,8),new THREE.MeshBasicMaterial({color:'#9de3c6'}),this.scene);this.targetMarker.layers.set(1);this.targetMarker.visible=false;
    this.resizeObserver=new ResizeObserver(()=>this.resize());this.resizeObserver.observe(stage);this.lastMini=0;
  }
  async loadRobot(){
    const loader=new GLTFLoader();const [gltf,res]=await Promise.all([loader.loadAsync(BASE+'assets/g1.glb'),fetch(BASE+'assets/g1-kinematics.json')]);const meta=await res.json();this.robot.add(gltf.scene);this.robot.updateMatrixWorld(true);
    gltf.scene.traverse(m=>{if(m.isMesh){m.castShadow=true;m.receiveShadow=true;if(!m.geometry.attributes.normal)m.geometry.computeVertexNormals();if(m.material){m.material.roughness=.38;m.material.metalness=.11;if(m.material.name==='dark'){m.material.color.set('#141a1e');m.material.roughness=.47;m.material.metalness=.08;}else if(m.material.name==='white')m.material.color.set('#d9dfde');}}});
    this.robotModel=gltf.scene;this.robotMetadata=meta;
    for(const j of meta.joints){const node=gltf.scene.getObjectByName(j.name);if(!node||j.type==='fixed')continue;node.userData.rest=node.quaternion.clone();node.userData.angle=0;node.userData.axis=new THREE.Vector3(...j.axis);node.userData.limit=j.limit||j.limits||{lower:-Math.PI,upper:Math.PI};this.joints.push(node);}
    // Nominal stable posture. The original manufacturer's mesh and joint frames are retained.
    for(const side of ['left','right']){this.setJoint(side+'_shoulder_pitch_joint',.8);this.setJoint(side+'_shoulder_roll_joint',side==='left'?.2:-.2);this.setJoint(side+'_elbow_joint',1.1);}
    this.handMarkers={};for(const side of['left','right']){const hand=gltf.scene.getObjectByName(side+'_rubber_hand');if(hand){const marker=new THREE.Object3D();marker.position.set(.075,0,.02);hand.add(marker);this.handMarkers[side]=marker;}}
    this.robotLoaded=true;return meta;
  }
  async loadAnatomy(){
    this.assemblies=await loadAssemblies(this.scene);
    this.assemblies.scopeMount.position.y+=.2;
    Object.values(this.tools).forEach(t=>t.group.visible=false);this.scopeShaft.visible=false;this.scopeHead.visible=false;this.scopeLens.visible=false;this.scopeArm.visible=false;
    const anatomy=await new GLTFLoader().loadAsync(BASE+'assets/patient-skin.glb');
    anatomy.scene.rotation.x=-Math.PI/2;anatomy.scene.position.set(0,1.035,0);
    anatomy.scene.traverse(o=>{if(o.isMesh){if(!o.geometry.attributes.normal)o.geometry.computeVertexNormals();o.material=new THREE.MeshStandardMaterial({color:'#bfa08a',roughness:.65,metalness:0,side:THREE.DoubleSide});o.material.onBeforeCompile=shader=>{shader.vertexShader='varying vec3 patientLocal;\n'+shader.vertexShader;shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\npatientLocal=position;');shader.fragmentShader='varying vec3 patientLocal;\n'+shader.fragmentShader;shader.fragmentShader=shader.fragmentShader.replace('#include <clipping_planes_fragment>','#include <clipping_planes_fragment>\nif(abs(patientLocal.x)<.17&&abs(patientLocal.y)<.20&&patientLocal.z>0.0)discard;\nif(patientLocal.y<-.45)discard;');};o.material.customProgramCacheKey=()=> 'anatomy-teaching-window';o.castShadow=true;o.receiveShadow=true;o.layers.set(0);}});
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
    const room=new THREE.Group();this.scene.add(room);const floor=mesh(new THREE.PlaneGeometry(12,12),material('#728380',.05,.88),room);floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;
    const grid=new THREE.GridHelper(6,12,'#9cadaa','#829592');grid.position.y=.001;grid.material.transparent=true;grid.material.opacity=.055;room.add(grid);
    box([4.8,2.4,.06],[0,1.2,1.75],material('#c3cfcd',.02,.93),room,.02);box([4.8,.09,.07],[0,.09,1.70],material('#819693',.1,.66),room,.01);
    const table=new THREE.Group();room.add(table);box([.62,.065,1.6],[0,.875,-.35],material('#aab9b8',.66,.34),table,.025);box([.59,.05,1.58],[0,.934,-.35],material('#3b5354',.04,.74),table,.024);box([.27,.65,.39],[0,.43,-.12],material('#cad3d1',.35,.46),table,.025);box([.7,.06,.7],[0,.07,-.12],steelDark,table,.025);for(const x of [-.29,.29])for(const z of [-.38,.14]){const w=mesh(new THREE.CylinderGeometry(.045,.045,.027,18),black,table);w.position.set(x,.045,z);w.rotation.z=Math.PI/2;}
    const platform=box([.58,.20,.55],[0,.10,.735],material('#647b79',.6,.45),room);box([.57,.009,.54],[0,.204,.735],material('#253b39',.15,.85),room);for(const x of[-.275,.275])box([.007,.008,.53],[x,.211,.735],material('#c8af79',.4,.6),room);
    for(const x of [-.33,.33])segment(table,new THREE.Vector3(x,.85,-.87),new THREE.Vector3(x,.85,.40),.009,steel);
    const pillow=box([.26,.055,.23],[0,1.044,-.49],material('#c9ddda',0,.95),room,.045);pillow.rotation.x=.05;
    this.monitor=new THREE.Group();this.monitor.position.set(-.57,1.36,-.28);this.monitor.rotation.y=.35;room.add(this.monitor);box([.36,.24,.025],[0,0,0],black,this.monitor);this.monitorScreen=mesh(new THREE.PlaneGeometry(.335,.205),new THREE.MeshBasicMaterial({color:'#17302b'}),this.monitor);this.monitorScreen.position.z=.014;segment(room,new THREE.Vector3(-.57,.1,-.28),new THREE.Vector3(-.57,1.28,-.28),.015,steelDark);
    const logo=labelSprite('MIRA  /  G1 TELEOP');logo.position.set(0,.80,.77);room.add(logo);
    const ceiling=new THREE.Group();ceiling.position.set(.65,2.1,-.35);room.add(ceiling);const lamp=mesh(new THREE.CylinderGeometry(.19,.23,.035,32),material('#bbc8c4',.65,.25),ceiling);lamp.rotation.z=.22;const emitter=mesh(new THREE.CircleGeometry(.175,32),new THREE.MeshBasicMaterial({color:'#ebfff8'}),ceiling);emitter.position.y=-.023;emitter.rotation.x=Math.PI/2;
    room.traverse(m=>m.layers.set(0));
  }
  _makePatient(){
    const outer=new THREE.Group();this.patientOuter=outer;this.scene.add(outer);const drape=material('#436c70',.05,.94);drape.normalMap=null;
    sphere([.22,.12,.52],[0,.99,-.13],drape,outer);box([.49,.035,.48],[0,1.03,-.63],drape,outer);box([.49,.035,.46],[0,1.03,.38],drape,outer);
    const skin=material('#bb8d75',0,.7);sphere([.10,.105,.125],[0,1.035,-.76],skin,outer);sphere([.105,.044,.105],[0,1.11,-.76],material('#558c89',0,.7),outer);
    // A transparent teaching window exposes the anatomical working volume in overview.
    const cutoutMat=material('#c99882',0,.65);cutoutMat.transparent=true;cutoutMat.opacity=.22;cutoutMat.depthWrite=false;
    sphere([.17,.095,.23],[0,1.09,-.02],cutoutMat,outer);
    // Drape portions flank an open work window instead of hiding the intracorporeal scene.
    for(const x of [-.22,.22])box([.11,.04,.51],[x,1.105,-.02],drape,outer);
    this.cavity=new THREE.Group();this.scene.add(this.cavity);const cavityMat=new THREE.MeshPhysicalMaterial({color:'#875b53',roughness:.72,metalness:0,side:THREE.BackSide,map:tissueTexture(),clearcoat:.08,clearcoatRoughness:.58});
    const inner=sphere([.25,.16,.29],[0,1.085,0],cavityMat,this.cavity);inner.layers.set(1);inner.castShadow=false;
    const diaphragm=sphere([.18,.028,.13],[0,1.00,-.14],material('#ac7b74',0,.55),this.cavity);diaphragm.layers.enable(1);
    this.gallbladder=sphere([.012,.017,.032],[-.032,1.001,.055],new THREE.MeshPhysicalMaterial({color:'#68804b',roughness:.3,clearcoat:.6}),this.cavity);this.gallbladder.rotation.z=.3;this.gallbladder.layers.enable(1);
    // Small vessels are schematic context; the liver surface itself comes from an anatomical source.
    this.schematicVessels=new THREE.Group();this.cavity.add(this.schematicVessels);
    const vesselMat=material('#794240',.05,.4);for(let i=0;i<3;i++){const curve=new THREE.CatmullRomCurve3([new THREE.Vector3(-.035+i*.014,.997,-.02),new THREE.Vector3(-.025+i*.013,1.003,.016),new THREE.Vector3(-.038+i*.02,1.002,.05)]);const vessel=mesh(new THREE.TubeGeometry(curve,16,.0015,6,false),vesselMat,this.schematicVessels);vessel.layers.enable(1);}
    this.portMeshes=[];for(const [x,z]of[[-.08,.1],[.08,.1],[0,.14]]){const p=new THREE.Group();p.position.set(x,1.18,z);this.scene.add(p);const ring=mesh(new THREE.TorusGeometry(.009,.0016,8,24),material('#73a7a4',.3,.42),p);ring.rotation.x=Math.PI/2;const cap=mesh(new THREE.CylinderGeometry(.007,.006,.015,20),black,p);cap.position.y=-.006;const sleeve=mesh(new THREE.CylinderGeometry(.0054,.0048,.064,16),steelDark,p);sleeve.position.y=.032;const seal=mesh(new THREE.TorusGeometry(.0061,.0011,8,20),black,p);seal.rotation.x=Math.PI/2;seal.position.y=-.014;this.portMeshes.push(p);}
  }
  _makeTools(){
    // Empty loading placeholders; all visible instruments come from source CAD.
    this.tools={left:{group:new THREE.Group()},right:{group:new THREE.Group()}};
    this.scopeShaft=new THREE.Group();this.scopeHead=new THREE.Group();this.scopeLens=new THREE.Group();
  }
  _makeScopeArm(){this.scopeArm=new THREE.Group();}
  addTissue(tissue){this.tissue=tissue;tissue.group.position.set(0,1.035,0);this.scene.add(tissue.group);tissue.group.traverse(m=>{m.layers.enable(1);if(m.isMesh){m.castShadow=true;m.receiveShadow=true;}});}
  resize(){const w=this.stage.clientWidth,h=this.stage.clientHeight;this.renderer.setSize(w,h,false);this.overviewCamera.aspect=w/h;this.overviewCamera.updateProjectionMatrix();this.endoCamera.aspect=w/h;this.endoCamera.updateProjectionMatrix();}
  setMode(mode){this.mode=mode;this.controls.enabled=mode==='overview';}
  home(){this.overviewCamera.position.set(1.55,1.87,-1.85);this.controls.target.set(0,1.05,.12);this.controls.update();}
  // Kept for reset/history compatibility. Rendering never rewrites a tool pose.
  releaseKinematicGuard(){this.acceptedArmPoses={};this.kinematicLimited=false;this._armIK=null;this.assemblies?.resetPose();}
  guardArmTargets(){this.kinematicLimited=false;return false;}
  solveArm(side,target){
    if(!this.robotLoaded)return;
    this._armIK??={};let cache=this._armIK[side];
    if(!cache){
      const names=['shoulder_pitch','shoulder_roll','shoulder_yaw','elbow','wrist_roll','wrist_pitch','wrist_yaw'];
      const chain=names.map(name=>this.robotModel.getObjectByName(side+'_'+name+'_joint')).filter(Boolean);
      const end=this.handMarkers?.[side]||this.robotModel.getObjectByName(side+'_wrist_yaw_link')||chain.at(-1);if(!end)return;
      cache=this._armIK[side]={chain,end,valid:false,settled:false,stationaryFrames:0,error:Infinity,bestError:Infinity,
        target:new THREE.Vector3(),rootMatrix:new THREE.Matrix4(),bestAngles:new Float64Array(chain.length),
        pivot:new THREE.Vector3(),endPos:new THREE.Vector3(),axis:new THREE.Vector3(),a:new THREE.Vector3(),b:new THREE.Vector3(),cross:new THREE.Vector3(),scale:new THREE.Vector3(),q:new THREE.Quaternion()};
    }
    this.robot.updateWorldMatrix(true,false);
    const unchanged=cache.valid&&cache.target.distanceToSquared(target)<1e-14&&cache.rootMatrix.equals(this.robot.matrixWorld);
    if(unchanged&&(cache.error<.0002||cache.settled)){this.armErrors[side]=cache.error;return;}
    const {chain,end,pivot,endPos,axis,q,a,b,cross,scale}=cache,previousError=cache.error;
    this.robot.updateMatrixWorld(true);
    endPos.setFromMatrixPosition(end.matrixWorld);
    if(!unchanged){
      cache.target.copy(target);cache.rootMatrix.copy(this.robot.matrixWorld);cache.stationaryFrames=0;cache.settled=false;
      cache.bestError=endPos.distanceTo(target);for(let i=0;i<chain.length;i++)cache.bestAngles[i]=chain[i].userData.angle;
    }
    this._ikSolving=true;
    for(let pass=0;pass<6;pass++){
      if(endPos.distanceToSquared(target)<4e-8)break;
      for(let i=chain.length-1;i>=0;i--){
        const n=chain[i];n.matrixWorld.decompose(pivot,q,scale);
        endPos.setFromMatrixPosition(end.matrixWorld);axis.copy(n.userData.axis).applyQuaternion(q).normalize();
        a.subVectors(endPos,pivot);b.subVectors(target,pivot);a.addScaledVector(axis,-a.dot(axis));b.addScaledVector(axis,-b.dot(axis));
        if(a.lengthSq()<1e-10||b.lengthSq()<1e-10)continue;
        a.normalize();b.normalize();cross.crossVectors(a,b);
        const delta=THREE.MathUtils.clamp(Math.atan2(axis.dot(cross),a.dot(b)),-.17,.17);
        if(Math.abs(delta)<1e-10)continue;
        this.setJoint(n.name,n.userData.angle+delta);
        // Only this joint's descendants need new FK matrices; legs and the
        // opposite arm do not change during this step.
        n.updateMatrixWorld(true);
      }
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
    for(const [index,side] of ['left','right'].entries()){
      const target=this.assemblies?.toolHandlePositions[side];
      if(target){this.armTargets[side].copy(target);this.solveArm(side,target);}
      this.handMarkers?.[side]?.getWorldPosition(this.handPositions[side]);
      if(this.assemblies)this.portMeshes[index].quaternion.setFromUnitVectors(Y,this.assemblies.tools[side].shaftDirection);
    }
    this.assemblies?.connectHands(this.handPositions,this.armErrors);
    this.conceptDecoupled=this.assemblies?.conceptDecoupled??false;this.kinematicLimited=false;
    const sc=state.scope,sp=new THREE.Vector3(...sc.position);
    if(this.assemblies)this.portMeshes[2].quaternion.setFromUnitVectors(Y,this.assemblies.scope.direction);
    this.endoCamera.position.copy(sp);if(sc.cameraUp)this.endoCamera.up.fromArray(sc.cameraUp);else this.endoCamera.up.set(0,1,0);this.endoCamera.lookAt(new THREE.Vector3(...sc.lookAt));
    this.scopeLight.position.copy(sp);this.scopeLight.target.position.set(...sc.lookAt);
    this.controls.update();
  }
  render(now=0){
    const r=this.renderer,w=this.stage.clientWidth,h=this.stage.clientHeight;r.setScissorTest(false);r.setViewport(0,0,w,h);r.setClearColor(this.mode==='endo'?'#2c1919':'#a4b3b3');
    const main=this.mode==='endo'?this.endoCamera:this.overviewCamera;main.aspect=w/h;main.updateProjectionMatrix();this.cavity.children[0].visible=this.mode==='endo';this.scene.background=new THREE.Color(this.mode==='endo'?'#30201b':'#a4b3b3');this.scene.environmentIntensity=this.mode==='endo'?.18:.68;r.toneMappingExposure=this.mode==='endo'?1.06:1.0;r.render(this.scene,main);
    const stageRect=this.stage.getBoundingClientRect(),miniRect=this.mini.getBoundingClientRect();const mx=miniRect.left-stageRect.left,my=h-(miniRect.top-stageRect.top)-miniRect.height,mw=miniRect.width,mh=miniRect.height;const secondary=this.mode==='endo'?this.overviewCamera:this.endoCamera;secondary.aspect=mw/mh;secondary.updateProjectionMatrix();this.cavity.children[0].visible=this.mode!=='endo';this.scene.background=new THREE.Color(this.mode==='endo'?'#a4b3b3':'#30201b');this.scene.environmentIntensity=this.mode==='endo'?.68:.18;r.toneMappingExposure=this.mode==='endo'?1.0:1.06;r.setScissorTest(true);r.setScissor(mx,my,mw,mh);r.setViewport(mx,my,mw,mh);r.clearDepth();r.render(this.scene,secondary);r.setScissorTest(false);
  }
  dispose(){this.disposed=true;this.resizeObserver.disconnect();this.controls.dispose();this.env.dispose();this.scene.traverse(o=>{o.geometry?.dispose();if(o.material){for(const m of Array.isArray(o.material)?o.material:[o.material])m.dispose();}});this.renderer.dispose();}
}
