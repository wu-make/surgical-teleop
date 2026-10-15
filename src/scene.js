import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {loadAssemblies} from './authentic-assemblies.js';

const V=new THREE.Vector3(), Y=new THREE.Vector3(0,1,0), Q=new THREE.Quaternion();
const BASE=import.meta.env?.BASE_URL??'/';
const material=(color,metalness=0,roughness=.5)=>new THREE.MeshStandardMaterial({color,metalness,roughness});
const steel=material('#c7d0d2',.95,.23), steelDark=material('#607178',.85,.3), black=material('#142024',.25,.4);
function mesh(geometry,mat,parent){const m=new THREE.Mesh(geometry,mat);m.castShadow=true;m.receiveShadow=true;parent?.add(m);return m;}
function box(size,pos,mat,parent,radius=0){const m=mesh(new THREE.BoxGeometry(...size),mat,parent);m.position.set(...pos);return m;}
function sphere(scale,pos,mat,parent){const m=mesh(new THREE.SphereGeometry(1,40,28),mat,parent);m.scale.set(...scale);m.position.set(...pos);return m;}
function segment(parent,a,b,radius,mat=steel,endRadius=radius){const m=mesh(new THREE.CylinderGeometry(endRadius,radius,1,16),mat,parent);m.userData.radius=radius;setSegment(m,a,b);return m;}
function setSegment(m,a,b){V.subVectors(b,a);const length=V.length();m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(Y,V.normalize());m.scale.set(1,Math.max(length,.00001),1);}
function labelSprite(text,color='#d6e9df'){
  const c=document.createElement('canvas');c.width=512;c.height=96;const x=c.getContext('2d');x.fillStyle='#12221ee0';x.roundRect(0,0,512,96,14);x.fill();x.fillStyle=color;x.font='500 28px sans-serif';x.textAlign='center';x.fillText(text,256,59);const m=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),transparent:true,depthTest:false}));m.scale.set(.29,.054,1);return m;
}
function tissueTexture(){const c=document.createElement('canvas');c.width=c.height=256;const x=c.getContext('2d');let seed=1234;const rnd=()=>{seed=(Math.imul(seed,1664525)+1013904223)|0;return(seed>>>0)/4294967296};x.fillStyle='#9a615b';x.fillRect(0,0,256,256);for(let i=0;i<7500;i++){const a=rnd(),b=rnd(),r=rnd()*2+.3;x.fillStyle=`rgba(${rnd()>.5?'225,164,135':'81,31,35'},${rnd()*.15})`;x.beginPath();x.ellipse(a*256,b*256,r,r*.6,0,0,7);x.fill();}const tex=new THREE.CanvasTexture(c);tex.wrapS=tex.wrapT=THREE.RepeatWrapping;tex.repeat.set(3,3);tex.colorSpace=THREE.SRGBColorSpace;return tex;}

export class SurgicalScene{
  constructor(canvas,stage,mini){
    this.stage=stage;this.mini=mini;this.mode='endo';this.disposed=false;this.ready=false;
    this.renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance',preserveDrawingBuffer:false});
    this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));this.renderer.setSize(stage.clientWidth,stage.clientHeight,false);this.renderer.outputColorSpace=THREE.SRGBColorSpace;this.renderer.toneMapping=THREE.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.15;
    this.renderer.shadowMap.enabled=true;this.renderer.shadowMap.type=THREE.PCFSoftShadowMap;
    this.scene=new THREE.Scene();this.scene.background=new THREE.Color('#1b2728');
    const pmrem=new THREE.PMREMGenerator(this.renderer);this.env=pmrem.fromScene(new RoomEnvironment(),.04);this.scene.environment=this.env.texture;pmrem.dispose();
    this.overviewCamera=new THREE.PerspectiveCamera(42,1,.015,30);this.overviewCamera.position.set(1.75,1.8,2.05);
    this.endoCamera=new THREE.PerspectiveCamera(60,1,.003,5);this.endoCamera.layers.set(1);
    this.controls=new OrbitControls(this.overviewCamera,canvas);this.controls.target.set(0,1.05,.12);this.controls.enableDamping=true;this.controls.minDistance=.3;this.controls.maxDistance=4;this.controls.maxPolarAngle=Math.PI*.49;this.controls.enabled=false;
    const hemi=new THREE.HemisphereLight('#e8fff5','#394147',1.25);this.scene.add(hemi);
    const endoHemi=new THREE.HemisphereLight('#ffe8d8','#402c29',.35);endoHemi.layers.set(1);this.scene.add(endoHemi);
    const light=new THREE.DirectionalLight('#f4fff9',2);light.position.set(1,4,1.5);light.castShadow=true;light.shadow.mapSize.set(1024,1024);light.shadow.camera.left=-1.6;light.shadow.camera.right=1.6;light.shadow.camera.top=1.6;light.shadow.camera.bottom=-1.6;light.shadow.normalBias=.002;this.scene.add(light);
    const fill=new THREE.DirectionalLight('#a5c5ef',1.2);fill.position.set(-2,1,-1);this.scene.add(fill);
    this.scopeLight=new THREE.SpotLight('#ffe9d4',.035,1.3,Math.PI*.43,.7,1);this.scopeLight.layers.set(1);this.scopeLight.target=new THREE.Object3D();this.scene.add(this.scopeLight,this.scopeLight.target);
    this._makeRoom();this._makePatient();this._makeTools();this._makeScopeArm();
    this.robot=new THREE.Group();this.robot.position.set(0,.9922729,.67);this.robot.rotation.y=Math.PI/2;this.scene.add(this.robot);
    this.joints=[];this.robotLoaded=false;this.armTargets={left:new THREE.Vector3(),right:new THREE.Vector3()};this.armErrors={left:0,right:0};
    this.targetMarker=mesh(new THREE.SphereGeometry(.0011,12,8),new THREE.MeshBasicMaterial({color:'#9de3c6'}),this.scene);this.targetMarker.layers.set(1);this.targetMarker.visible=false;
    this.resizeObserver=new ResizeObserver(()=>this.resize());this.resizeObserver.observe(stage);this.lastMini=0;
  }
  async loadRobot(){
    const loader=new GLTFLoader();const [gltf,res]=await Promise.all([loader.loadAsync(BASE+'assets/g1.glb'),fetch(BASE+'assets/g1-kinematics.json')]);const meta=await res.json();this.robot.add(gltf.scene);this.robot.updateMatrixWorld(true);
    gltf.scene.traverse(m=>{if(m.isMesh){m.castShadow=true;m.receiveShadow=true;if(m.material){m.material.roughness=.4;m.material.metalness=.35;}}});
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
    return this.assemblies;
  }
  setJoint(name,angle){const n=this.robotModel?.getObjectByName(name);if(!n?.userData.rest)return;const l=n.userData.limit;angle=THREE.MathUtils.clamp(angle,l.lower??-Math.PI,l.upper??Math.PI);n.userData.angle=angle;n.quaternion.copy(n.userData.rest).multiply(Q.setFromAxisAngle(n.userData.axis,angle));}
  _makeRoom(){
    const room=new THREE.Group();this.scene.add(room);const floor=mesh(new THREE.PlaneGeometry(12,12),material('#354346',.1,.75),room);floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;
    const grid=new THREE.GridHelper(6,24,'#536460','#3f514d');grid.position.y=.001;grid.material.transparent=true;grid.material.opacity=.18;room.add(grid);
    const table=new THREE.Group();room.add(table);box([.58,.075,1.6],[0,.87,-.35],material('#a7b2b0',.7,.28),table);box([.58,.045,1.6],[0,.93,-.35],material('#334f51',.1,.6),table);box([.3,.65,.42],[0,.43,-.12],material('#9aa9a7',.65,.3),table);box([.7,.06,.7],[0,.07,-.12],steelDark,table);for(const x of [-.29,.29])for(const z of [-.38,.14]){const w=mesh(new THREE.CylinderGeometry(.045,.045,.027,18),black,table);w.position.set(x,.045,z);w.rotation.z=Math.PI/2;}
    const platform=box([.58,.20,.55],[0,.10,.735],material('#647b79',.6,.45),room);box([.57,.009,.54],[0,.204,.735],material('#253b39',.15,.85),room);for(const x of[-.275,.275])box([.007,.008,.53],[x,.211,.735],material('#c8af79',.4,.6),room);
    for(const x of [-.33,.33])segment(table,new THREE.Vector3(x,.85,-.87),new THREE.Vector3(x,.85,.62),.012,steel);
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
    this.cavity=new THREE.Group();this.scene.add(this.cavity);const cavityMat=new THREE.MeshPhysicalMaterial({color:'#a26860',roughness:.47,metalness:0,side:THREE.BackSide,map:tissueTexture(),clearcoat:.35,clearcoatRoughness:.28});
    const inner=sphere([.25,.16,.29],[0,1.085,0],cavityMat,this.cavity);inner.layers.set(1);inner.castShadow=false;
    const diaphragm=sphere([.18,.028,.13],[0,1.00,-.14],material('#ac7b74',0,.55),this.cavity);diaphragm.layers.enable(1);
    this.gallbladder=sphere([.012,.017,.032],[-.032,1.001,.055],new THREE.MeshPhysicalMaterial({color:'#68804b',roughness:.3,clearcoat:.6}),this.cavity);this.gallbladder.rotation.z=.3;this.gallbladder.layers.enable(1);
    // Small vessels are schematic context; the liver surface itself comes from an anatomical source.
    const vesselMat=material('#794240',.05,.4);for(let i=0;i<3;i++){const curve=new THREE.CatmullRomCurve3([new THREE.Vector3(-.035+i*.014,.997,-.02),new THREE.Vector3(-.025+i*.013,1.003,.016),new THREE.Vector3(-.038+i*.02,1.002,.05)]);const vessel=mesh(new THREE.TubeGeometry(curve,16,.0015,6,false),vesselMat,this.cavity);vessel.layers.enable(1);}
    this.portMeshes=[];for(const [x,z]of[[-.08,.1],[.08,.1],[0,.14]]){const p=new THREE.Group();p.position.set(x,1.18,z);this.scene.add(p);const ring=mesh(new THREE.TorusGeometry(.009,.002,8,24),material('#77b9b2',.5,.25),p);ring.rotation.x=Math.PI/2;const cap=mesh(new THREE.CylinderGeometry(.007,.006,.012,20),black,p);cap.position.y=.007;this.portMeshes.push(p);}
  }
  _makeTools(){
    this.tools={};for(const side of['left','right']){const g=new THREE.Group();this.scene.add(g);const shaft=segment(g,new THREE.Vector3(),new THREE.Vector3(0,1,0),.0025,steelDark);shaft.layers.enable(1);const sleeve=segment(g,new THREE.Vector3(),new THREE.Vector3(0,1,0),.003,steel);const wrist=new THREE.Group();g.add(wrist);wrist.layers.enable(1);
      const color=side==='left'?'#73bed4':'#dfb477';const collar=mesh(new THREE.CylinderGeometry(.0034,.0034,.007,16),material(color,.65,.3),wrist);collar.position.y=-.016;collar.layers.enable(1);
      const jaws=[];for(const sign of[-1,1]){const hinge=new THREE.Group();hinge.position.y=-.011;wrist.add(hinge);hinge.layers.enable(1);const shape=new THREE.Shape();shape.moveTo(-.0008,0);shape.lineTo(.0008,0);shape.lineTo(.0006,.010);shape.quadraticCurveTo(0,.012,-.0006,.010);shape.closePath();const jaw=mesh(new THREE.ExtrudeGeometry(shape,{depth:side==='left'?.0012:.00065,bevelEnabled:true,bevelSize:.0002,bevelThickness:.00015,bevelSegments:1,steps:1}),steel,hinge);jaw.position.z=-.0006;hinge.userData.sign=sign;jaw.layers.enable(1);jaws.push(hinge);
        if(side==='left'){for(let i=0;i<5;i++){const serration=box([.0015,.00035,.0014],[0,.003+i*.0014,0],steelDark,hinge);serration.layers.enable(1);}}
      }
      const axle=mesh(new THREE.CylinderGeometry(.0019,.0019,.006,12),steel,wrist);axle.position.y=-.011;axle.rotation.z=Math.PI/2;axle.layers.enable(1);
      const handle=new THREE.Group();g.add(handle);box([.017,.028,.025],[0,0,0],black,handle);const band=box([.018,.005,.026],[0,.01,0],material(color,.45,.4),handle);
      for(const sign of[-1,1]){const ring=mesh(new THREE.TorusGeometry(.011,.0024,8,20),black,handle);ring.position.set(sign*.012,.024,0);}
      this.tools[side]={group:g,shaft,sleeve,wrist,jaws,handle,end:new THREE.Vector3(),handlePosition:new THREE.Vector3(),direction:new THREE.Vector3()};
    }
    this.scopeShaft=segment(this.scene,new THREE.Vector3(),new THREE.Vector3(0,1,0),.004,steel);this.scopeShaft.layers.enable(1);
    this.scopeHead=mesh(new THREE.CylinderGeometry(.012,.009,.032,20),black,this.scene);const glass=material('#263e4d',.8,.1);this.scopeLens=mesh(new THREE.SphereGeometry(.0041,12,8),glass,this.scene);this.scopeLens.layers.set(0);
  }
  _makeScopeArm(){
    this.scopeArm=new THREE.Group();this.scene.add(this.scopeArm);this.scopeArmSegments=[];this.scopeArmJoints=[];for(let i=0;i<4;i++){this.scopeArmSegments.push(segment(this.scopeArm,new THREE.Vector3(),new THREE.Vector3(0,1,0),i===0?.024:.018,material('#d6dcd7',.6,.3)));const joint=mesh(new THREE.CylinderGeometry(i===0?.035:.025,i===0?.035:.025,.037,24),black,this.scopeArm);this.scopeArmJoints.push(joint);}
    this.mount=box([.105,.05,.06],[0,1.17,.47],steelDark,this.scopeArm);this.scopeArm.visible=true;
  }
  addTissue(tissue){this.tissue=tissue;tissue.group.position.set(0,1.035,0);this.scene.add(tissue.group);tissue.group.traverse(m=>{m.layers.enable(1);if(m.isMesh){m.castShadow=true;m.receiveShadow=true;}});}
  resize(){const w=this.stage.clientWidth,h=this.stage.clientHeight;this.renderer.setSize(w,h,false);this.overviewCamera.aspect=w/h;this.overviewCamera.updateProjectionMatrix();this.endoCamera.aspect=w/h;this.endoCamera.updateProjectionMatrix();}
  setMode(mode){this.mode=mode;this.controls.enabled=mode==='overview';}
  home(){this.overviewCamera.position.set(1.75,1.8,2.05);this.controls.target.set(0,1.05,.12);this.controls.update();}
  releaseKinematicGuard(){this.acceptedArmPoses={};}
  guardArmTargets(state){
    this.acceptedArmPoses??={};this.kinematicLimited=false;
    for(const side of['left','right']){
      const previous=this.acceptedArmPoses[side];
      if(this.armErrors[side]>.0025&&previous){
        state.tools[side]=structuredClone(previous.tool);
        for(const [name,angle] of previous.joints)this.setJoint(name,angle);
        this.robot.updateMatrixWorld(true);this.kinematicLimited=true;
      }else if(this.armErrors[side]<=.0025){
        this.acceptedArmPoses[side]={tool:structuredClone(state.tools[side]),joints:this.joints.filter(n=>n.name.startsWith(side+'_')&&/shoulder|elbow|wrist/.test(n.name)).map(n=>[n.name,n.userData.angle])};
      }
    }
    if(this.kinematicLimited){this.assemblies?.update(state,0);for(const side of['left','right']){const target=this.assemblies?.toolHandlePositions[side];if(target&&this.handMarkers?.[side]){this.handMarkers[side].getWorldPosition(V);this.armErrors[side]=V.distanceTo(target);}}}
    return this.kinematicLimited;
  }
  solveArm(side,target){
    if(!this.robotLoaded)return;const names=['shoulder_pitch','shoulder_roll','shoulder_yaw','elbow','wrist_roll','wrist_pitch','wrist_yaw'].map(n=>side+'_'+n+'_joint');const chain=names.map(n=>this.robotModel.getObjectByName(n)).filter(Boolean);const end=this.handMarkers?.[side]||this.robotModel.getObjectByName(side+'_wrist_yaw_link')||chain.at(-1);if(!end)return;
    const pivot=new THREE.Vector3(),endPos=new THREE.Vector3(),axis=new THREE.Vector3(),q=new THREE.Quaternion(),a=new THREE.Vector3(),b=new THREE.Vector3();
    for(let pass=0;pass<6;pass++){for(let i=chain.length-1;i>=0;i--){const n=chain[i];this.robot.updateMatrixWorld(true);n.getWorldPosition(pivot);end.getWorldPosition(endPos);n.parent.getWorldQuaternion(q);q.multiply(n.userData.rest);axis.copy(n.userData.axis).applyQuaternion(q).normalize();a.subVectors(endPos,pivot);b.subVectors(target,pivot);a.addScaledVector(axis,-a.dot(axis));b.addScaledVector(axis,-b.dot(axis));if(a.lengthSq()<1e-10||b.lengthSq()<1e-10)continue;a.normalize();b.normalize();const cross=new THREE.Vector3().crossVectors(a,b);let delta=Math.atan2(axis.dot(cross),a.dot(b));delta=THREE.MathUtils.clamp(delta,-.17,.17);this.setJoint(n.name,n.userData.angle+delta);}}
    this.robot.updateMatrixWorld(true);end.getWorldPosition(endPos);this.armErrors[side]=endPos.distanceTo(target);
  }
  update(state,dt){
    this.assemblies?.update(state,dt);
    for(const side of['left','right']){const s=state.tools[side],t=this.tools[side],tip=new THREE.Vector3(...s.position),port=new THREE.Vector3(...s.port);t.direction.subVectors(tip,port).normalize();const rotation=new THREE.Quaternion().setFromUnitVectors(Y,t.direction);const wristRotation=new THREE.Quaternion().setFromEuler(new THREE.Euler(s.wrist[0],s.wrist[2],s.wrist[1],'YXZ'));rotation.multiply(wristRotation);t.wrist.position.copy(tip);t.wrist.quaternion.copy(rotation);const wristBase=new THREE.Vector3(0,-.018,0).applyQuaternion(rotation).add(tip);t.end.copy(tip);const shaftDirection=new THREE.Vector3().subVectors(wristBase,port).normalize();t.handlePosition.copy(port).addScaledVector(shaftDirection,-.15);setSegment(t.shaft,t.handlePosition,wristBase);setSegment(t.sleeve,t.handlePosition,new THREE.Vector3().copy(port).addScaledVector(shaftDirection,-.015));t.handle.position.copy(t.handlePosition);t.handle.quaternion.setFromUnitVectors(Y,shaftDirection);t.jaws.forEach(j=>j.rotation.z=j.userData.sign*s.jaw*.48);this.armTargets[side].copy(this.assemblies?.toolHandlePositions[side]||t.handlePosition);this.solveArm(side,this.armTargets[side]);}
    this.guardArmTargets(state);
    const sc=state.scope,sp=new THREE.Vector3(...sc.position),port=new THREE.Vector3(...sc.port),direction=new THREE.Vector3().subVectors(sp,port).normalize(),handle=port.clone().addScaledVector(direction,-.12);setSegment(this.scopeShaft,handle,sp);this.scopeHead.position.copy(handle).addScaledVector(direction,-.02);this.scopeHead.quaternion.setFromUnitVectors(Y,direction);this.scopeLens.position.copy(sp);
    const points=[new THREE.Vector3(0,1.17,.47),new THREE.Vector3(0,1.39,.38),new THREE.Vector3(.09,1.43,.20),new THREE.Vector3(.06,1.35,.13),handle];for(let i=0;i<4;i++){setSegment(this.scopeArmSegments[i],points[i],points[i+1]);this.scopeArmJoints[i].position.copy(points[i]);this.scopeArmJoints[i].rotation.z=i%2?Math.PI/2:0;}
    this.endoCamera.position.copy(sp);this.endoCamera.up.set(0,1,0).applyAxisAngle(direction,sc.roll);this.endoCamera.lookAt(new THREE.Vector3(...sc.lookAt));
    this.scopeLight.position.copy(sp);this.scopeLight.target.position.set(...sc.lookAt);
    this.controls.update();
  }
  render(now=0){
    const r=this.renderer,w=this.stage.clientWidth,h=this.stage.clientHeight;r.setScissorTest(false);r.setViewport(0,0,w,h);r.setClearColor(this.mode==='endo'?'#2c1919':'#1b2728');
    const main=this.mode==='endo'?this.endoCamera:this.overviewCamera;main.aspect=w/h;main.updateProjectionMatrix();this.cavity.children[0].visible=this.mode==='endo';this.scene.background=new THREE.Color(this.mode==='endo'?'#36201d':'#1b2728');this.scene.environmentIntensity=this.mode==='endo'?.22:1;r.toneMappingExposure=this.mode==='endo'?.9:1.15;r.render(this.scene,main);
    const stageRect=this.stage.getBoundingClientRect(),miniRect=this.mini.getBoundingClientRect();const mx=miniRect.left-stageRect.left,my=h-(miniRect.top-stageRect.top)-miniRect.height,mw=miniRect.width,mh=miniRect.height;const secondary=this.mode==='endo'?this.overviewCamera:this.endoCamera;secondary.aspect=mw/mh;secondary.updateProjectionMatrix();this.cavity.children[0].visible=this.mode!=='endo';this.scene.background=new THREE.Color(this.mode==='endo'?'#1b2728':'#36201d');this.scene.environmentIntensity=this.mode==='endo'?1:.22;r.toneMappingExposure=this.mode==='endo'?1.15:.9;r.setScissorTest(true);r.setScissor(mx,my,mw,mh);r.setViewport(mx,my,mw,mh);r.clearDepth();r.render(this.scene,secondary);r.setScissorTest(false);
  }
  dispose(){this.disposed=true;this.resizeObserver.disconnect();this.controls.dispose();this.env.dispose();this.scene.traverse(o=>{o.geometry?.dispose();if(o.material){for(const m of Array.isArray(o.material)?o.material:[o.material])m.dispose();}});this.renderer.dispose();}
}
