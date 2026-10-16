(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const xc="180",Ps={ROTATE:0,DOLLY:1,PAN:2},As={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},mf=0,th=1,gf=2,Ju=1,Qu=2,Qn=3,ai=0,Yt=1,un=2,Ci=0,Ds=1,nh=2,ih=3,sh=4,_f=5,$i=100,vf=101,xf=102,yf=103,Mf=104,Sf=200,wf=201,bf=202,Tf=203,hl=204,ul=205,Ef=206,Af=207,Rf=208,Cf=209,Pf=210,Df=211,If=212,Lf=213,Nf=214,dl=0,fl=1,pl=2,Bs=3,ml=4,gl=5,_l=6,vl=7,yc=0,Uf=1,Ff=2,Pi=0,Of=1,kf=2,Bf=3,ed=4,zf=5,Vf=6,Hf=7,rh="attached",Gf="detached",td=300,zs=301,Vs=302,xl=303,yl=304,Qo=306,ts=1e3,Ai=1001,Ho=1002,tn=1003,nd=1004,pr=1005,en=1006,Po=1007,ii=1008,Nn=1009,id=1010,sd=1011,Lr=1012,Mc=1013,ns=1014,Dn=1015,Ks=1016,Sc=1017,wc=1018,Nr=1020,rd=35902,od=35899,ad=1021,ld=1022,wn=1023,Ur=1026,Fr=1027,bc=1028,Tc=1029,cd=1030,Ec=1031,Ac=1033,Do=33776,Io=33777,Lo=33778,No=33779,Ml=35840,Sl=35841,wl=35842,bl=35843,Tl=36196,El=37492,Al=37496,Rl=37808,Cl=37809,Pl=37810,Dl=37811,Il=37812,Ll=37813,Nl=37814,Ul=37815,Fl=37816,Ol=37817,kl=37818,Bl=37819,zl=37820,Vl=37821,Hl=36492,Gl=36494,Wl=36495,Xl=36283,jl=36284,ql=36285,Yl=36286,Or=2300,kr=2301,ha=2302,oh=2400,ah=2401,lh=2402,Wf=2500,Xf=0,hd=1,Kl=2,jf=3200,qf=3201,Rc=0,Yf=1,Ti="",Ct="srgb",Kt="srgb-linear",Go="linear",at="srgb",os=7680,ch=519,Kf=512,$f=513,Zf=514,ud=515,Jf=516,Qf=517,ep=518,tp=519,$l=35044,hh=35040,uh="300 es",zn=2e3,Wo=2001;class ss{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const Gt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let dh=1234567;const Mr=Math.PI/180,Hs=180/Math.PI;function In(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Gt[i&255]+Gt[i>>8&255]+Gt[i>>16&255]+Gt[i>>24&255]+"-"+Gt[e&255]+Gt[e>>8&255]+"-"+Gt[e>>16&15|64]+Gt[e>>24&255]+"-"+Gt[t&63|128]+Gt[t>>8&255]+"-"+Gt[t>>16&255]+Gt[t>>24&255]+Gt[n&255]+Gt[n>>8&255]+Gt[n>>16&255]+Gt[n>>24&255]).toLowerCase()}function Ge(i,e,t){return Math.max(e,Math.min(t,i))}function Cc(i,e){return(i%e+e)%e}function np(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function ip(i,e,t){return i!==e?(t-i)/(e-i):0}function Sr(i,e,t){return(1-t)*i+t*e}function sp(i,e,t,n){return Sr(i,e,1-Math.exp(-t*n))}function rp(i,e=1){return e-Math.abs(Cc(i,e*2)-e)}function op(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function ap(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function lp(i,e){return i+Math.floor(Math.random()*(e-i+1))}function cp(i,e){return i+Math.random()*(e-i)}function hp(i){return i*(.5-Math.random())}function up(i){i!==void 0&&(dh=i);let e=dh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function dp(i){return i*Mr}function fp(i){return i*Hs}function pp(i){return(i&i-1)===0&&i!==0}function mp(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function gp(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function _p(i,e,t,n,s){const r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),d=o((e-n)/2),f=r((n-e)/2),g=o((n-e)/2);switch(s){case"XYX":i.set(a*h,l*u,l*d,a*c);break;case"YZY":i.set(l*d,a*h,l*u,a*c);break;case"ZXZ":i.set(l*u,l*d,a*h,a*c);break;case"XZX":i.set(a*h,l*g,l*f,a*c);break;case"YXY":i.set(l*f,a*h,l*g,a*c);break;case"ZYZ":i.set(l*g,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Pn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function st(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const ni={DEG2RAD:Mr,RAD2DEG:Hs,generateUUID:In,clamp:Ge,euclideanModulo:Cc,mapLinear:np,inverseLerp:ip,lerp:Sr,damp:sp,pingpong:rp,smoothstep:op,smootherstep:ap,randInt:lp,randFloat:cp,randFloatSpread:hp,seededRandom:up,degToRad:dp,radToDeg:fp,isPowerOfTwo:pp,ceilPowerOfTwo:mp,floorPowerOfTwo:gp,setQuaternionFromProperEuler:_p,normalize:st,denormalize:Pn};class de{constructor(e=0,t=0){de.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ge(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ge(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Oe{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3];const d=r[o+0],f=r[o+1],g=r[o+2],_=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(u!==_||l!==d||c!==f||h!==g){let m=1-a;const p=l*d+c*f+h*g+u*_,M=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){const P=Math.sqrt(y),E=Math.atan2(P,p*M);m=Math.sin(m*E)/P,a=Math.sin(a*E)/P}const S=a*M;if(l=l*m+d*S,c=c*m+f*S,h=h*m+g*S,u=u*m+_*S,m===1-a){const P=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=P,c*=P,h*=P,u*=P}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return e[t]=a*g+h*u+l*f-c*d,e[t+1]=l*g+h*d+c*u-a*f,e[t+2]=c*g+h*f+a*d-l*u,e[t+3]=h*g-a*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),u=a(r/2),d=l(n/2),f=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ge(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class b{constructor(e=0,t=0,n=0){b.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(fh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(fh.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*n),h=2*(a*t-r*s),u=2*(r*n-o*t);return this.x=t+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this.z=Ge(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this.z=Ge(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ge(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ua.copy(this).projectOnVector(e),this.sub(ua)}reflect(e){return this.sub(ua.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ge(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ua=new b,fh=new Oe;class ze{constructor(e,t,n,s,r,o,a,l,c){ze.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c)}set(e,t,n,s,r,o,a,l,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],_=s[0],m=s[3],p=s[6],M=s[1],y=s[4],S=s[7],P=s[2],E=s[5],C=s[8];return r[0]=o*_+a*M+l*P,r[3]=o*m+a*y+l*E,r[6]=o*p+a*S+l*C,r[1]=c*_+h*M+u*P,r[4]=c*m+h*y+u*E,r[7]=c*p+h*S+u*C,r[2]=d*_+f*M+g*P,r[5]=d*m+f*y+g*E,r[8]=d*p+f*S+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,d=a*l-h*r,f=c*r-o*l,g=t*u+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(s*c-h*n)*_,e[2]=(a*n-s*o)*_,e[3]=d*_,e[4]=(h*t-s*l)*_,e[5]=(s*r-a*t)*_,e[6]=f*_,e[7]=(n*l-c*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(da.makeScale(e,t)),this}rotate(e){return this.premultiply(da.makeRotation(-e)),this}translate(e,t){return this.premultiply(da.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const da=new ze;function dd(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Br(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function vp(){const i=Br("canvas");return i.style.display="block",i}const ph={};function zr(i){i in ph||(ph[i]=!0,console.warn(i))}function xp(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const mh=new ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),gh=new ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function yp(){const i={enabled:!0,workingColorSpace:Kt,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===at&&(s.r=ri(s.r),s.g=ri(s.g),s.b=ri(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===at&&(s.r=Is(s.r),s.g=Is(s.g),s.b=Is(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ti?Go:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return zr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return zr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Kt]:{primaries:e,whitePoint:n,transfer:Go,toXYZ:mh,fromXYZ:gh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Ct},outputColorSpaceConfig:{drawingBufferColorSpace:Ct}},[Ct]:{primaries:e,whitePoint:n,transfer:at,toXYZ:mh,fromXYZ:gh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Ct}}}),i}const et=yp();function ri(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Is(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let as;class Mp{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{as===void 0&&(as=Br("canvas")),as.width=e.width,as.height=e.height;const s=as.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=as}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Br("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=ri(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ri(t[n]/255)*255):t[n]=ri(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Sp=0;class Pc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Sp++}),this.uuid=In(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(fa(s[o].image)):r.push(fa(s[o]))}else r=fa(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function fa(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Mp.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let wp=0;const pa=new b;class Dt extends ss{constructor(e=Dt.DEFAULT_IMAGE,t=Dt.DEFAULT_MAPPING,n=Ai,s=Ai,r=en,o=ii,a=wn,l=Nn,c=Dt.DEFAULT_ANISOTROPY,h=Ti){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:wp++}),this.uuid=In(),this.name="",this.source=new Pc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new de(0,0),this.repeat=new de(1,1),this.center=new de(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(pa).x}get height(){return this.source.getSize(pa).y}get depth(){return this.source.getSize(pa).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==td)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ts:e.x=e.x-Math.floor(e.x);break;case Ai:e.x=e.x<0?0:1;break;case Ho:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ts:e.y=e.y-Math.floor(e.y);break;case Ai:e.y=e.y<0?0:1;break;case Ho:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Dt.DEFAULT_IMAGE=null;Dt.DEFAULT_MAPPING=td;Dt.DEFAULT_ANISOTROPY=1;class tt{constructor(e=0,t=0,n=0,s=1){tt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(c+1)/2,S=(f+1)/2,P=(p+1)/2,E=(h+d)/4,C=(u+_)/4,R=(g+m)/4;return y>S&&y>P?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=E/n,r=C/n):S>P?S<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),n=E/s,r=R/s):P<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(P),n=C/r,s=R/r),this.set(n,s,r,t),this}let M=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(u-_)/M,this.z=(d-h)/M,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this.z=Ge(this.z,e.z,t.z),this.w=Ge(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this.z=Ge(this.z,e,t),this.w=Ge(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ge(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class bp extends ss{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:en,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new tt(0,0,e,t),this.scissorTest=!1,this.viewport=new tt(0,0,e,t);const s={width:e,height:t,depth:n.depth},r=new Dt(s);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:en,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Pc(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ni extends bp{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class fd extends Dt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=tn,this.minFilter=tn,this.wrapR=Ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Tp extends Dt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=tn,this.minFilter=tn,this.wrapR=Ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Gn{constructor(e=new b(1/0,1/0,1/0),t=new b(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(En.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(En.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=En.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,En):En.fromBufferAttribute(r,o),En.applyMatrix4(e.matrixWorld),this.expandByPoint(En);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),$r.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),$r.copy(n.boundingBox)),$r.applyMatrix4(e.matrixWorld),this.union($r)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,En),En.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(tr),Zr.subVectors(this.max,tr),ls.subVectors(e.a,tr),cs.subVectors(e.b,tr),hs.subVectors(e.c,tr),fi.subVectors(cs,ls),pi.subVectors(hs,cs),Bi.subVectors(ls,hs);let t=[0,-fi.z,fi.y,0,-pi.z,pi.y,0,-Bi.z,Bi.y,fi.z,0,-fi.x,pi.z,0,-pi.x,Bi.z,0,-Bi.x,-fi.y,fi.x,0,-pi.y,pi.x,0,-Bi.y,Bi.x,0];return!ma(t,ls,cs,hs,Zr)||(t=[1,0,0,0,1,0,0,0,1],!ma(t,ls,cs,hs,Zr))?!1:(Jr.crossVectors(fi,pi),t=[Jr.x,Jr.y,Jr.z],ma(t,ls,cs,hs,Zr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,En).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(En).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(jn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const jn=[new b,new b,new b,new b,new b,new b,new b,new b],En=new b,$r=new Gn,ls=new b,cs=new b,hs=new b,fi=new b,pi=new b,Bi=new b,tr=new b,Zr=new b,Jr=new b,zi=new b;function ma(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){zi.fromArray(i,r);const a=s.x*Math.abs(zi.x)+s.y*Math.abs(zi.y)+s.z*Math.abs(zi.z),l=e.dot(zi),c=t.dot(zi),h=n.dot(zi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const Ep=new Gn,nr=new b,ga=new b;class Wn{constructor(e=new b,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Ep.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;nr.subVectors(e,this.center);const t=nr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(nr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ga.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(nr.copy(e.center).add(ga)),this.expandByPoint(nr.copy(e.center).sub(ga))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const qn=new b,_a=new b,Qr=new b,mi=new b,va=new b,eo=new b,xa=new b;class Xr{constructor(e=new b,t=new b(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,qn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=qn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(qn.copy(this.origin).addScaledVector(this.direction,t),qn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){_a.copy(e).add(t).multiplyScalar(.5),Qr.copy(t).sub(e).normalize(),mi.copy(this.origin).sub(_a);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Qr),a=mi.dot(this.direction),l=-mi.dot(Qr),c=mi.lengthSq(),h=Math.abs(1-o*o);let u,d,f,g;if(h>0)if(u=o*l-a,d=o*a-l,g=r*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(_a).addScaledVector(Qr,d),f}intersectSphere(e,t){qn.subVectors(e.center,this.origin);const n=qn.dot(this.direction),s=qn.dot(qn)-n*n,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,s=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,s=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,qn)!==null}intersectTriangle(e,t,n,s,r){va.subVectors(t,e),eo.subVectors(n,e),xa.crossVectors(va,eo);let o=this.direction.dot(xa),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;mi.subVectors(this.origin,e);const l=a*this.direction.dot(eo.crossVectors(mi,eo));if(l<0)return null;const c=a*this.direction.dot(va.cross(mi));if(c<0||l+c>o)return null;const h=-a*mi.dot(xa);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Fe{constructor(e,t,n,s,r,o,a,l,c,h,u,d,f,g,_,m){Fe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c,h,u,d,f,g,_,m)}set(e,t,n,s,r,o,a,l,c,h,u,d,f,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Fe().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/us.setFromMatrixColumn(e,0).length(),r=1/us.setFromMatrixColumn(e,1).length(),o=1/us.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=o*h,f=o*u,g=a*h,_=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+g*c,t[5]=d-_*c,t[9]=-a*l,t[2]=_-d*c,t[6]=g+f*c,t[10]=o*l}else if(e.order==="YXZ"){const d=l*h,f=l*u,g=c*h,_=c*u;t[0]=d+_*a,t[4]=g*a-f,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-g,t[6]=_+d*a,t[10]=o*l}else if(e.order==="ZXY"){const d=l*h,f=l*u,g=c*h,_=c*u;t[0]=d-_*a,t[4]=-o*u,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*h,t[9]=_-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const d=o*h,f=o*u,g=a*h,_=a*u;t[0]=l*h,t[4]=g*c-f,t[8]=d*c+_,t[1]=l*u,t[5]=_*c+d,t[9]=f*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const d=o*l,f=o*c,g=a*l,_=a*c;t[0]=l*h,t[4]=_-d*u,t[8]=g*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*u+g,t[10]=d-_*u}else if(e.order==="XZY"){const d=o*l,f=o*c,g=a*l,_=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+_,t[5]=o*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=a*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ap,e,Rp)}lookAt(e,t,n){const s=this.elements;return cn.subVectors(e,t),cn.lengthSq()===0&&(cn.z=1),cn.normalize(),gi.crossVectors(n,cn),gi.lengthSq()===0&&(Math.abs(n.z)===1?cn.x+=1e-4:cn.z+=1e-4,cn.normalize(),gi.crossVectors(n,cn)),gi.normalize(),to.crossVectors(cn,gi),s[0]=gi.x,s[4]=to.x,s[8]=cn.x,s[1]=gi.y,s[5]=to.y,s[9]=cn.y,s[2]=gi.z,s[6]=to.z,s[10]=cn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],M=n[3],y=n[7],S=n[11],P=n[15],E=s[0],C=s[4],R=s[8],v=s[12],x=s[1],A=s[5],D=s[9],U=s[13],L=s[2],k=s[6],F=s[10],q=s[14],V=s[3],K=s[7],ee=s[11],ce=s[15];return r[0]=o*E+a*x+l*L+c*V,r[4]=o*C+a*A+l*k+c*K,r[8]=o*R+a*D+l*F+c*ee,r[12]=o*v+a*U+l*q+c*ce,r[1]=h*E+u*x+d*L+f*V,r[5]=h*C+u*A+d*k+f*K,r[9]=h*R+u*D+d*F+f*ee,r[13]=h*v+u*U+d*q+f*ce,r[2]=g*E+_*x+m*L+p*V,r[6]=g*C+_*A+m*k+p*K,r[10]=g*R+_*D+m*F+p*ee,r[14]=g*v+_*U+m*q+p*ce,r[3]=M*E+y*x+S*L+P*V,r[7]=M*C+y*A+S*k+P*K,r[11]=M*R+y*D+S*F+P*ee,r[15]=M*v+y*U+S*q+P*ce,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+r*l*u-s*c*u-r*a*d+n*c*d+s*a*f-n*l*f)+_*(+t*l*f-t*c*d+r*o*d-s*o*f+s*c*h-r*l*h)+m*(+t*c*u-t*a*f-r*o*u+n*o*f+r*a*h-n*c*h)+p*(-s*a*h-t*l*u+t*a*d+s*o*u-n*o*d+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],_=e[13],m=e[14],p=e[15],M=u*m*c-_*d*c+_*l*f-a*m*f-u*l*p+a*d*p,y=g*d*c-h*m*c-g*l*f+o*m*f+h*l*p-o*d*p,S=h*_*c-g*u*c+g*a*f-o*_*f-h*a*p+o*u*p,P=g*u*l-h*_*l-g*a*d+o*_*d+h*a*m-o*u*m,E=t*M+n*y+s*S+r*P;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/E;return e[0]=M*C,e[1]=(_*d*r-u*m*r-_*s*f+n*m*f+u*s*p-n*d*p)*C,e[2]=(a*m*r-_*l*r+_*s*c-n*m*c-a*s*p+n*l*p)*C,e[3]=(u*l*r-a*d*r-u*s*c+n*d*c+a*s*f-n*l*f)*C,e[4]=y*C,e[5]=(h*m*r-g*d*r+g*s*f-t*m*f-h*s*p+t*d*p)*C,e[6]=(g*l*r-o*m*r-g*s*c+t*m*c+o*s*p-t*l*p)*C,e[7]=(o*d*r-h*l*r+h*s*c-t*d*c-o*s*f+t*l*f)*C,e[8]=S*C,e[9]=(g*u*r-h*_*r-g*n*f+t*_*f+h*n*p-t*u*p)*C,e[10]=(o*_*r-g*a*r+g*n*c-t*_*c-o*n*p+t*a*p)*C,e[11]=(h*a*r-o*u*r-h*n*c+t*u*c+o*n*f-t*a*f)*C,e[12]=P*C,e[13]=(h*_*s-g*u*s+g*n*d-t*_*d-h*n*m+t*u*m)*C,e[14]=(g*a*s-o*_*s-g*n*l+t*_*l+o*n*m-t*a*m)*C,e[15]=(o*u*s-h*a*s+h*n*l-t*u*l-o*n*d+t*a*d)*C,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,u=a+a,d=r*c,f=r*h,g=r*u,_=o*h,m=o*u,p=a*u,M=l*c,y=l*h,S=l*u,P=n.x,E=n.y,C=n.z;return s[0]=(1-(_+p))*P,s[1]=(f+S)*P,s[2]=(g-y)*P,s[3]=0,s[4]=(f-S)*E,s[5]=(1-(d+p))*E,s[6]=(m+M)*E,s[7]=0,s[8]=(g+y)*C,s[9]=(m-M)*C,s[10]=(1-(d+_))*C,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=us.set(s[0],s[1],s[2]).length();const o=us.set(s[4],s[5],s[6]).length(),a=us.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],An.copy(this);const c=1/r,h=1/o,u=1/a;return An.elements[0]*=c,An.elements[1]*=c,An.elements[2]*=c,An.elements[4]*=h,An.elements[5]*=h,An.elements[6]*=h,An.elements[8]*=u,An.elements[9]*=u,An.elements[10]*=u,t.setFromRotationMatrix(An),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=zn,l=!1){const c=this.elements,h=2*r/(t-e),u=2*r/(n-s),d=(t+e)/(t-e),f=(n+s)/(n-s);let g,_;if(l)g=r/(o-r),_=o*r/(o-r);else if(a===zn)g=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===Wo)g=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=zn,l=!1){const c=this.elements,h=2/(t-e),u=2/(n-s),d=-(t+e)/(t-e),f=-(n+s)/(n-s);let g,_;if(l)g=1/(o-r),_=o/(o-r);else if(a===zn)g=-2/(o-r),_=-(o+r)/(o-r);else if(a===Wo)g=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const us=new b,An=new Fe,Ap=new b(0,0,0),Rp=new b(1,1,1),gi=new b,to=new b,cn=new b,_h=new Fe,vh=new Oe;class bn{constructor(e=0,t=0,n=0,s=bn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Ge(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ge(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ge(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ge(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ge(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Ge(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return _h.makeRotationFromQuaternion(e),this.setFromRotationMatrix(_h,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return vh.setFromEuler(this),this.setFromQuaternion(vh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}bn.DEFAULT_ORDER="XYZ";class pd{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Cp=0;const xh=new b,ds=new Oe,Yn=new Fe,no=new b,ir=new b,Pp=new b,Dp=new Oe,yh=new b(1,0,0),Mh=new b(0,1,0),Sh=new b(0,0,1),wh={type:"added"},Ip={type:"removed"},fs={type:"childadded",child:null},ya={type:"childremoved",child:null};class ht extends ss{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Cp++}),this.uuid=In(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ht.DEFAULT_UP.clone();const e=new b,t=new bn,n=new Oe,s=new b(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Fe},normalMatrix:{value:new ze}}),this.matrix=new Fe,this.matrixWorld=new Fe,this.matrixAutoUpdate=ht.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ht.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new pd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ds.setFromAxisAngle(e,t),this.quaternion.multiply(ds),this}rotateOnWorldAxis(e,t){return ds.setFromAxisAngle(e,t),this.quaternion.premultiply(ds),this}rotateX(e){return this.rotateOnAxis(yh,e)}rotateY(e){return this.rotateOnAxis(Mh,e)}rotateZ(e){return this.rotateOnAxis(Sh,e)}translateOnAxis(e,t){return xh.copy(e).applyQuaternion(this.quaternion),this.position.add(xh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(yh,e)}translateY(e){return this.translateOnAxis(Mh,e)}translateZ(e){return this.translateOnAxis(Sh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Yn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?no.copy(e):no.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),ir.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Yn.lookAt(ir,no,this.up):Yn.lookAt(no,ir,this.up),this.quaternion.setFromRotationMatrix(Yn),s&&(Yn.extractRotation(s.matrixWorld),ds.setFromRotationMatrix(Yn),this.quaternion.premultiply(ds.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(wh),fs.child=e,this.dispatchEvent(fs),fs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ip),ya.child=e,this.dispatchEvent(ya),ya.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Yn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Yn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Yn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(wh),fs.child=e,this.dispatchEvent(fs),fs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ir,e,Pp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ir,Dp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}ht.DEFAULT_UP=new b(0,1,0);ht.DEFAULT_MATRIX_AUTO_UPDATE=!0;ht.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Rn=new b,Kn=new b,Ma=new b,$n=new b,ps=new b,ms=new b,bh=new b,Sa=new b,wa=new b,ba=new b,Ta=new tt,Ea=new tt,Aa=new tt;class dn{constructor(e=new b,t=new b,n=new b){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Rn.subVectors(e,t),s.cross(Rn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Rn.subVectors(s,t),Kn.subVectors(n,t),Ma.subVectors(e,t);const o=Rn.dot(Rn),a=Rn.dot(Kn),l=Rn.dot(Ma),c=Kn.dot(Kn),h=Kn.dot(Ma),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(c*l-a*h)*d,g=(o*h-a*l)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,$n)===null?!1:$n.x>=0&&$n.y>=0&&$n.x+$n.y<=1}static getInterpolation(e,t,n,s,r,o,a,l){return this.getBarycoord(e,t,n,s,$n)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,$n.x),l.addScaledVector(o,$n.y),l.addScaledVector(a,$n.z),l)}static getInterpolatedAttribute(e,t,n,s,r,o){return Ta.setScalar(0),Ea.setScalar(0),Aa.setScalar(0),Ta.fromBufferAttribute(e,t),Ea.fromBufferAttribute(e,n),Aa.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Ta,r.x),o.addScaledVector(Ea,r.y),o.addScaledVector(Aa,r.z),o}static isFrontFacing(e,t,n,s){return Rn.subVectors(n,t),Kn.subVectors(e,t),Rn.cross(Kn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Rn.subVectors(this.c,this.b),Kn.subVectors(this.a,this.b),Rn.cross(Kn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return dn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return dn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return dn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return dn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return dn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let o,a;ps.subVectors(s,n),ms.subVectors(r,n),Sa.subVectors(e,n);const l=ps.dot(Sa),c=ms.dot(Sa);if(l<=0&&c<=0)return t.copy(n);wa.subVectors(e,s);const h=ps.dot(wa),u=ms.dot(wa);if(h>=0&&u<=h)return t.copy(s);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(ps,o);ba.subVectors(e,r);const f=ps.dot(ba),g=ms.dot(ba);if(g>=0&&f<=g)return t.copy(r);const _=f*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(ms,a);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return bh.subVectors(r,s),a=(u-h)/(u-h+(f-g)),t.copy(s).addScaledVector(bh,a);const p=1/(m+_+d);return o=_*p,a=d*p,t.copy(n).addScaledVector(ps,o).addScaledVector(ms,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const md={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},_i={h:0,s:0,l:0},io={h:0,s:0,l:0};function Ra(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class De{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ct){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,et.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=et.workingColorSpace){return this.r=e,this.g=t,this.b=n,et.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=et.workingColorSpace){if(e=Cc(e,1),t=Ge(t,0,1),n=Ge(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Ra(o,r,e+1/3),this.g=Ra(o,r,e),this.b=Ra(o,r,e-1/3)}return et.colorSpaceToWorking(this,s),this}setStyle(e,t=Ct){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ct){const n=md[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ri(e.r),this.g=ri(e.g),this.b=ri(e.b),this}copyLinearToSRGB(e){return this.r=Is(e.r),this.g=Is(e.g),this.b=Is(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ct){return et.workingToColorSpace(Wt.copy(this),e),Math.round(Ge(Wt.r*255,0,255))*65536+Math.round(Ge(Wt.g*255,0,255))*256+Math.round(Ge(Wt.b*255,0,255))}getHexString(e=Ct){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=et.workingColorSpace){et.workingToColorSpace(Wt.copy(this),t);const n=Wt.r,s=Wt.g,r=Wt.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=et.workingColorSpace){return et.workingToColorSpace(Wt.copy(this),t),e.r=Wt.r,e.g=Wt.g,e.b=Wt.b,e}getStyle(e=Ct){et.workingToColorSpace(Wt.copy(this),e);const t=Wt.r,n=Wt.g,s=Wt.b;return e!==Ct?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(_i),this.setHSL(_i.h+e,_i.s+t,_i.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(_i),e.getHSL(io);const n=Sr(_i.h,io.h,t),s=Sr(_i.s,io.s,t),r=Sr(_i.l,io.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Wt=new De;De.NAMES=md;let Lp=0;class Ln extends ss{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Lp++}),this.uuid=In(),this.name="",this.type="Material",this.blending=Ds,this.side=ai,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=hl,this.blendDst=ul,this.blendEquation=$i,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new De(0,0,0),this.blendAlpha=0,this.depthFunc=Bs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ch,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=os,this.stencilZFail=os,this.stencilZPass=os,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ds&&(n.blending=this.blending),this.side!==ai&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==hl&&(n.blendSrc=this.blendSrc),this.blendDst!==ul&&(n.blendDst=this.blendDst),this.blendEquation!==$i&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Bs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ch&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==os&&(n.stencilFail=this.stencilFail),this.stencilZFail!==os&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==os&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class fn extends Ln{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new De(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bn,this.combine=yc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const At=new b,so=new de;let Np=0;class ct{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Np++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=$l,this.updateRanges=[],this.gpuType=Dn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)so.fromBufferAttribute(this,t),so.applyMatrix3(e),this.setXY(t,so.x,so.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix3(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix4(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyNormalMatrix(e),this.setXYZ(t,At.x,At.y,At.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.transformDirection(e),this.setXYZ(t,At.x,At.y,At.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Pn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=st(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Pn(t,this.array)),t}setX(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Pn(t,this.array)),t}setY(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Pn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Pn(t,this.array)),t}setW(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array),s=st(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array),s=st(s,this.array),r=st(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==$l&&(e.usage=this.usage),e}}class gd extends ct{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class _d extends ct{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class pt extends ct{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Up=0;const xn=new Fe,Ca=new ht,gs=new b,hn=new Gn,sr=new Gn,Ft=new b;class Nt extends ss{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Up++}),this.uuid=In(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(dd(e)?_d:gd)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new ze().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return xn.makeRotationFromQuaternion(e),this.applyMatrix4(xn),this}rotateX(e){return xn.makeRotationX(e),this.applyMatrix4(xn),this}rotateY(e){return xn.makeRotationY(e),this.applyMatrix4(xn),this}rotateZ(e){return xn.makeRotationZ(e),this.applyMatrix4(xn),this}translate(e,t,n){return xn.makeTranslation(e,t,n),this.applyMatrix4(xn),this}scale(e,t,n){return xn.makeScale(e,t,n),this.applyMatrix4(xn),this}lookAt(e){return Ca.lookAt(e),Ca.updateMatrix(),this.applyMatrix4(Ca.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(gs).negate(),this.translate(gs.x,gs.y,gs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new pt(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Gn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new b(-1/0,-1/0,-1/0),new b(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];hn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ft.addVectors(this.boundingBox.min,hn.min),this.boundingBox.expandByPoint(Ft),Ft.addVectors(this.boundingBox.max,hn.max),this.boundingBox.expandByPoint(Ft)):(this.boundingBox.expandByPoint(hn.min),this.boundingBox.expandByPoint(hn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Wn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new b,1/0);return}if(e){const n=this.boundingSphere.center;if(hn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];sr.setFromBufferAttribute(a),this.morphTargetsRelative?(Ft.addVectors(hn.min,sr.min),hn.expandByPoint(Ft),Ft.addVectors(hn.max,sr.max),hn.expandByPoint(Ft)):(hn.expandByPoint(sr.min),hn.expandByPoint(sr.max))}hn.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Ft.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Ft));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Ft.fromBufferAttribute(a,c),l&&(gs.fromBufferAttribute(e,c),Ft.add(gs)),s=Math.max(s,n.distanceToSquared(Ft))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ct(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let R=0;R<n.count;R++)a[R]=new b,l[R]=new b;const c=new b,h=new b,u=new b,d=new de,f=new de,g=new de,_=new b,m=new b;function p(R,v,x){c.fromBufferAttribute(n,R),h.fromBufferAttribute(n,v),u.fromBufferAttribute(n,x),d.fromBufferAttribute(r,R),f.fromBufferAttribute(r,v),g.fromBufferAttribute(r,x),h.sub(c),u.sub(c),f.sub(d),g.sub(d);const A=1/(f.x*g.y-g.x*f.y);isFinite(A)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(A),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(A),a[R].add(_),a[v].add(_),a[x].add(_),l[R].add(m),l[v].add(m),l[x].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let R=0,v=M.length;R<v;++R){const x=M[R],A=x.start,D=x.count;for(let U=A,L=A+D;U<L;U+=3)p(e.getX(U+0),e.getX(U+1),e.getX(U+2))}const y=new b,S=new b,P=new b,E=new b;function C(R){P.fromBufferAttribute(s,R),E.copy(P);const v=a[R];y.copy(v),y.sub(P.multiplyScalar(P.dot(v))).normalize(),S.crossVectors(E,v);const A=S.dot(l[R])<0?-1:1;o.setXYZW(R,y.x,y.y,y.z,A)}for(let R=0,v=M.length;R<v;++R){const x=M[R],A=x.start,D=x.count;for(let U=A,L=A+D;U<L;U+=3)C(e.getX(U+0)),C(e.getX(U+1)),C(e.getX(U+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ct(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new b,r=new b,o=new b,a=new b,l=new b,c=new b,h=new b,u=new b;if(e)for(let d=0,f=e.count;d<f;d+=3){const g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ft.fromBufferAttribute(e,t),Ft.normalize(),e.setXYZ(t,Ft.x,Ft.y,Ft.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let f=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?f=l[_]*a.data.stride+a.offset:f=l[_]*h;for(let p=0;p<h;p++)d[g++]=c[f++]}return new ct(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Nt,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=e(l,n);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Th=new Fe,Vi=new Xr,ro=new Wn,Eh=new b,oo=new b,ao=new b,lo=new b,Pa=new b,co=new b,Ah=new b,ho=new b;class qe extends ht{constructor(e=new Nt,t=new fn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){co.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],u=r[l];h!==0&&(Pa.fromBufferAttribute(u,e),o?co.addScaledVector(Pa,h):co.addScaledVector(Pa.sub(t),h))}t.add(co)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ro.copy(n.boundingSphere),ro.applyMatrix4(r),Vi.copy(e.ray).recast(e.near),!(ro.containsPoint(Vi.origin)===!1&&(Vi.intersectSphere(ro,Eh)===null||Vi.origin.distanceToSquared(Eh)>(e.far-e.near)**2))&&(Th.copy(r).invert(),Vi.copy(e.ray).applyMatrix4(Th),!(n.boundingBox!==null&&Vi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Vi)))}_computeIntersections(e,t,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=o[m.materialIndex],M=Math.max(m.start,f.start),y=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let S=M,P=y;S<P;S+=3){const E=a.getX(S),C=a.getX(S+1),R=a.getX(S+2);s=uo(this,p,e,n,c,h,u,E,C,R),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const M=a.getX(m),y=a.getX(m+1),S=a.getX(m+2);s=uo(this,o,e,n,c,h,u,M,y,S),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=o[m.materialIndex],M=Math.max(m.start,f.start),y=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let S=M,P=y;S<P;S+=3){const E=S,C=S+1,R=S+2;s=uo(this,p,e,n,c,h,u,E,C,R),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const M=m,y=m+1,S=m+2;s=uo(this,o,e,n,c,h,u,M,y,S),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Fp(i,e,t,n,s,r,o,a){let l;if(e.side===Yt?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,e.side===ai,a),l===null)return null;ho.copy(a),ho.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(ho);return c<t.near||c>t.far?null:{distance:c,point:ho.clone(),object:i}}function uo(i,e,t,n,s,r,o,a,l,c){i.getVertexPosition(a,oo),i.getVertexPosition(l,ao),i.getVertexPosition(c,lo);const h=Fp(i,e,t,n,oo,ao,lo,Ah);if(h){const u=new b;dn.getBarycoord(Ah,oo,ao,lo,u),s&&(h.uv=dn.getInterpolatedAttribute(s,a,l,c,u,new de)),r&&(h.uv1=dn.getInterpolatedAttribute(r,a,l,c,u,new de)),o&&(h.normal=dn.getInterpolatedAttribute(o,a,l,c,u,new b),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new b,materialIndex:0};dn.getNormal(oo,ao,lo,d.normal),h.face=d,h.barycoord=u}return h}class Fi extends Nt{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new pt(c,3)),this.setAttribute("normal",new pt(h,3)),this.setAttribute("uv",new pt(u,2));function g(_,m,p,M,y,S,P,E,C,R,v){const x=S/C,A=P/R,D=S/2,U=P/2,L=E/2,k=C+1,F=R+1;let q=0,V=0;const K=new b;for(let ee=0;ee<F;ee++){const ce=ee*A-U;for(let Te=0;Te<k;Te++){const $e=Te*x-D;K[_]=$e*M,K[m]=ce*y,K[p]=L,c.push(K.x,K.y,K.z),K[_]=0,K[m]=0,K[p]=E>0?1:-1,h.push(K.x,K.y,K.z),u.push(Te/C),u.push(1-ee/R),q+=1}}for(let ee=0;ee<R;ee++)for(let ce=0;ce<C;ce++){const Te=d+ce+k*ee,$e=d+ce+k*(ee+1),Je=d+(ce+1)+k*(ee+1),Ve=d+(ce+1)+k*ee;l.push(Te,$e,Ve),l.push($e,Je,Ve),V+=6}a.addGroup(f,V,v),f+=V,d+=q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Gs(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Jt(i){const e={};for(let t=0;t<i.length;t++){const n=Gs(i[t]);for(const s in n)e[s]=n[s]}return e}function Op(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function vd(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:et.workingColorSpace}const Zl={clone:Gs,merge:Jt};var kp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Bp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class li extends Ln{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=kp,this.fragmentShader=Bp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Gs(e.uniforms),this.uniformsGroups=Op(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class xd extends ht{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Fe,this.projectionMatrix=new Fe,this.projectionMatrixInverse=new Fe,this.coordinateSystem=zn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const vi=new b,Rh=new de,Ch=new de;class qt extends xd{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Hs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Mr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Hs*2*Math.atan(Math.tan(Mr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){vi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(vi.x,vi.y).multiplyScalar(-e/vi.z),vi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(vi.x,vi.y).multiplyScalar(-e/vi.z)}getViewSize(e,t){return this.getViewBounds(e,Rh,Ch),t.subVectors(Ch,Rh)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Mr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const _s=-90,vs=1;class zp extends ht{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new qt(_s,vs,e,t);s.layers=this.layers,this.add(s);const r=new qt(_s,vs,e,t);r.layers=this.layers,this.add(r);const o=new qt(_s,vs,e,t);o.layers=this.layers,this.add(o);const a=new qt(_s,vs,e,t);a.layers=this.layers,this.add(a);const l=new qt(_s,vs,e,t);l.layers=this.layers,this.add(l);const c=new qt(_s,vs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===zn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Wo)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class yd extends Dt{constructor(e=[],t=zs,n,s,r,o,a,l,c,h){super(e,t,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Vp extends Ni{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new yd(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Fi(5,5,5),r=new li({name:"CubemapFromEquirect",uniforms:Gs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Yt,blending:Ci});r.uniforms.tEquirect.value=t;const o=new qe(s,r),a=t.minFilter;return t.minFilter===ii&&(t.minFilter=en),new zp(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}}class Ye extends ht{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Hp={type:"move"};class Da{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ye,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ye,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new b,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new b),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ye,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new b,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new b),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Hp)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ye;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Md extends ht{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new bn,this.environmentIntensity=1,this.environmentRotation=new bn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Gp{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=$l,this.updateRanges=[],this.version=0,this.uuid=In()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=In()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=In()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Zt=new b;class Dc{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.applyMatrix4(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.applyNormalMatrix(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.transformDirection(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Pn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=st(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Pn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Pn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Pn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Pn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),n=st(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),n=st(n,this.array),s=st(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),n=st(n,this.array),s=st(s,this.array),r=st(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new ct(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Dc(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Ph=new b,Dh=new tt,Ih=new tt,Wp=new b,Lh=new Fe,fo=new b,Ia=new Wn,Nh=new Fe,La=new Xr;class Xp extends qe{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=rh,this.bindMatrix=new Fe,this.bindMatrixInverse=new Fe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Gn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,fo),this.boundingBox.expandByPoint(fo)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Wn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,fo),this.boundingSphere.expandByPoint(fo)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ia.copy(this.boundingSphere),Ia.applyMatrix4(s),e.ray.intersectsSphere(Ia)!==!1&&(Nh.copy(s).invert(),La.copy(e.ray).applyMatrix4(Nh),!(this.boundingBox!==null&&La.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,La)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new tt,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===rh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Gf?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,s=this.geometry;Dh.fromBufferAttribute(s.attributes.skinIndex,e),Ih.fromBufferAttribute(s.attributes.skinWeight,e),Ph.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const o=Ih.getComponent(r);if(o!==0){const a=Dh.getComponent(r);Lh.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(Wp.copy(Ph).applyMatrix4(Lh),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Sd extends ht{constructor(){super(),this.isBone=!0,this.type="Bone"}}class wd extends Dt{constructor(e=null,t=1,n=1,s,r,o,a,l,c=tn,h=tn,u,d){super(null,o,a,l,c,h,s,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Uh=new Fe,jp=new Fe;class Ic{constructor(e=[],t=[]){this.uuid=In(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Fe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Fe;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=e.length;r<o;r++){const a=e[r]?e[r].matrixWorld:jp;Uh.multiplyMatrices(a,t[r]),Uh.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new Ic(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new wd(t,e,e,wn,Dn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){const r=e.bones[n];let o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new Sd),this.bones.push(o),this.boneInverses.push(new Fe().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){const o=t[s];e.bones.push(o.uuid);const a=n[s];e.boneInverses.push(a.toArray())}return e}}class Jl extends ct{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const xs=new Fe,Fh=new Fe,po=[],Oh=new Gn,qp=new Fe,rr=new qe,or=new Wn;class bd extends qe{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Jl(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,qp)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Gn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,xs),Oh.copy(e.boundingBox).applyMatrix4(xs),this.boundingBox.union(Oh)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Wn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,xs),or.copy(e.boundingSphere).applyMatrix4(xs),this.boundingSphere.union(or)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(rr.geometry=this.geometry,rr.material=this.material,rr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),or.copy(this.boundingSphere),or.applyMatrix4(n),e.ray.intersectsSphere(or)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,xs),Fh.multiplyMatrices(n,xs),rr.matrixWorld=Fh,rr.raycast(e,po);for(let o=0,a=po.length;o<a;o++){const l=po[o];l.instanceId=r,l.object=this,t.push(l)}po.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Jl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new wd(new Float32Array(s*this.count),s,this.count,bc,Dn));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=s*e;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Na=new b,Yp=new b,Kp=new ze;class bi{constructor(e=new b(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Na.subVectors(n,t).cross(Yp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Na),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Kp.getNormalMatrix(e),s=this.coplanarPoint(Na).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Hi=new Wn,$p=new de(.5,.5),mo=new b;class Lc{constructor(e=new bi,t=new bi,n=new bi,s=new bi,r=new bi,o=new bi){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=zn,n=!1){const s=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],f=r[7],g=r[8],_=r[9],m=r[10],p=r[11],M=r[12],y=r[13],S=r[14],P=r[15];if(s[0].setComponents(c-o,f-h,p-g,P-M).normalize(),s[1].setComponents(c+o,f+h,p+g,P+M).normalize(),s[2].setComponents(c+a,f+u,p+_,P+y).normalize(),s[3].setComponents(c-a,f-u,p-_,P-y).normalize(),n)s[4].setComponents(l,d,m,S).normalize(),s[5].setComponents(c-l,f-d,p-m,P-S).normalize();else if(s[4].setComponents(c-l,f-d,p-m,P-S).normalize(),t===zn)s[5].setComponents(c+l,f+d,p+m,P+S).normalize();else if(t===Wo)s[5].setComponents(l,d,m,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Hi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Hi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Hi)}intersectsSprite(e){Hi.center.set(0,0,0);const t=$p.distanceTo(e.center);return Hi.radius=.7071067811865476+t,Hi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Hi)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(mo.x=s.normal.x>0?e.max.x:e.min.x,mo.y=s.normal.y>0?e.max.y:e.min.y,mo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(mo)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Nc extends Ln{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new De(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Xo=new b,jo=new b,kh=new Fe,ar=new Xr,go=new Wn,Ua=new b,Bh=new b;class ea extends ht{constructor(e=new Nt,t=new Nc){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Xo.fromBufferAttribute(t,s-1),jo.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Xo.distanceTo(jo);e.setAttribute("lineDistance",new pt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),go.copy(n.boundingSphere),go.applyMatrix4(s),go.radius+=r,e.ray.intersectsSphere(go)===!1)return;kh.copy(s).invert(),ar.copy(e.ray).applyMatrix4(kh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=f,m=g-1;_<m;_+=c){const p=h.getX(_),M=h.getX(_+1),y=_o(this,e,ar,l,p,M,_);y&&t.push(y)}if(this.isLineLoop){const _=h.getX(g-1),m=h.getX(f),p=_o(this,e,ar,l,_,m,g-1);p&&t.push(p)}}else{const f=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let _=f,m=g-1;_<m;_+=c){const p=_o(this,e,ar,l,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){const _=_o(this,e,ar,l,g-1,f,g-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function _o(i,e,t,n,s,r,o){const a=i.geometry.attributes.position;if(Xo.fromBufferAttribute(a,s),jo.fromBufferAttribute(a,r),t.distanceSqToSegment(Xo,jo,Ua,Bh)>n)return;Ua.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Ua);if(!(c<e.near||c>e.far))return{distance:c,point:Bh.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const zh=new b,Vh=new b;class Zp extends ea{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)zh.fromBufferAttribute(t,s),Vh.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+zh.distanceTo(Vh);e.setAttribute("lineDistance",new pt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Jp extends ea{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Td extends Ln{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new De(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Hh=new Fe,Ql=new Xr,vo=new Wn,xo=new b;class Qp extends ht{constructor(e=new Nt,t=new Td){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),vo.copy(n.boundingSphere),vo.applyMatrix4(s),vo.radius+=r,e.ray.intersectsSphere(vo)===!1)return;Hh.copy(s).invert(),Ql.copy(e.ray).applyMatrix4(Hh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=d,_=f;g<_;g++){const m=c.getX(g);xo.fromBufferAttribute(u,m),Gh(xo,m,l,s,e,t,this)}}else{const d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let g=d,_=f;g<_;g++)xo.fromBufferAttribute(u,g),Gh(xo,g,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Gh(i,e,t,n,s,r,o){const a=Ql.distanceSqToPoint(i);if(a<t){const l=new b;Ql.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class Ed extends Dt{constructor(e,t,n,s,r,o,a,l,c){super(e,t,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ad extends Dt{constructor(e,t,n=ns,s,r,o,a=tn,l=tn,c,h=Ur,u=1){if(h!==Ur&&h!==Fr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:u};super(d,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Pc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Rd extends Dt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Uc extends Nt{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],o=[],a=[],l=[],c=new b,h=new de;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){const f=n+u/t*s;c.x=e*Math.cos(f),c.y=e*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[d]/e+1)/2,h.y=(o[d+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new pt(o,3)),this.setAttribute("normal",new pt(a,3)),this.setAttribute("uv",new pt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Uc(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Vt extends Nt{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],d=[],f=[];let g=0;const _=[],m=n/2;let p=0;M(),o===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new pt(u,3)),this.setAttribute("normal",new pt(d,3)),this.setAttribute("uv",new pt(f,2));function M(){const S=new b,P=new b;let E=0;const C=(t-e)/n;for(let R=0;R<=r;R++){const v=[],x=R/r,A=x*(t-e)+e;for(let D=0;D<=s;D++){const U=D/s,L=U*l+a,k=Math.sin(L),F=Math.cos(L);P.x=A*k,P.y=-x*n+m,P.z=A*F,u.push(P.x,P.y,P.z),S.set(k,C,F).normalize(),d.push(S.x,S.y,S.z),f.push(U,1-x),v.push(g++)}_.push(v)}for(let R=0;R<s;R++)for(let v=0;v<r;v++){const x=_[v][R],A=_[v+1][R],D=_[v+1][R+1],U=_[v][R+1];(e>0||v!==0)&&(h.push(x,A,U),E+=3),(t>0||v!==r-1)&&(h.push(A,D,U),E+=3)}c.addGroup(p,E,0),p+=E}function y(S){const P=g,E=new de,C=new b;let R=0;const v=S===!0?e:t,x=S===!0?1:-1;for(let D=1;D<=s;D++)u.push(0,m*x,0),d.push(0,x,0),f.push(.5,.5),g++;const A=g;for(let D=0;D<=s;D++){const L=D/s*l+a,k=Math.cos(L),F=Math.sin(L);C.x=v*F,C.y=m*x,C.z=v*k,u.push(C.x,C.y,C.z),d.push(0,x,0),E.x=k*.5+.5,E.y=F*.5*x+.5,f.push(E.x,E.y),g++}for(let D=0;D<s;D++){const U=P+D,L=A+D;S===!0?h.push(L,L+1,U):h.push(L+1,L,U),R+=3}c.addGroup(p,R,S===!0?1:2),p+=R}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class di{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let s=0;const r=n.length;let o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);const h=n[s],d=n[s+1]-h,f=(o-h)/d;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=t||(o.isVector2?new de:new b);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new b,s=[],r=[],o=[],a=new b,l=new Fe;for(let f=0;f<=e;f++){const g=f/e;s[f]=this.getTangentAt(g,new b)}r[0]=new b,o[0]=new b;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Ge(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,g))}o[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(Ge(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Cd extends di{constructor(e=0,t=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new de){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class em extends Cd{constructor(e,t,n,s,r,o){super(e,t,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Fc(){let i=0,e=0,t=0,n=0;function s(r,o,a,l){i=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,s(o,a,d,f)},calc:function(r){const o=r*r,a=o*r;return i+e*r+t*o+n*a}}}const yo=new b,Fa=new Fc,Oa=new Fc,ka=new Fc;class Pd extends di{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new b){const n=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(yo.subVectors(s[0],s[1]).add(s[0]),c=yo);const u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(yo.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=yo),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Fa.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,_,m),Oa.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,_,m),ka.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(Fa.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),Oa.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),ka.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(Fa.calc(l),Oa.calc(l),ka.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new b().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Wh(i,e,t,n,s){const r=(n-e)*.5,o=(s-t)*.5,a=i*i,l=i*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*i+t}function tm(i,e){const t=1-i;return t*t*e}function nm(i,e){return 2*(1-i)*i*e}function im(i,e){return i*i*e}function wr(i,e,t,n){return tm(i,e)+nm(i,t)+im(i,n)}function sm(i,e){const t=1-i;return t*t*t*e}function rm(i,e){const t=1-i;return 3*t*t*i*e}function om(i,e){return 3*(1-i)*i*i*e}function am(i,e){return i*i*i*e}function br(i,e,t,n,s){return sm(i,e)+rm(i,t)+om(i,n)+am(i,s)}class lm extends di{constructor(e=new de,t=new de,n=new de,s=new de){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new de){const n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(br(e,s.x,r.x,o.x,a.x),br(e,s.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class cm extends di{constructor(e=new b,t=new b,n=new b,s=new b){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new b){const n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(br(e,s.x,r.x,o.x,a.x),br(e,s.y,r.y,o.y,a.y),br(e,s.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class hm extends di{constructor(e=new de,t=new de){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new de){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new de){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class um extends di{constructor(e=new b,t=new b){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new b){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new b){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class dm extends di{constructor(e=new de,t=new de,n=new de){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new de){const n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(wr(e,s.x,r.x,o.x),wr(e,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Dd extends di{constructor(e=new b,t=new b,n=new b){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new b){const n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(wr(e,s.x,r.x,o.x),wr(e,s.y,r.y,o.y),wr(e,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class fm extends di{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new de){const n=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(Wh(a,l.x,c.x,h.x,u.x),Wh(a,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new de().fromArray(s))}return this}}var pm=Object.freeze({__proto__:null,ArcCurve:em,CatmullRomCurve3:Pd,CubicBezierCurve:lm,CubicBezierCurve3:cm,EllipseCurve:Cd,LineCurve:hm,LineCurve3:um,QuadraticBezierCurve:dm,QuadraticBezierCurve3:Dd,SplineCurve:fm});class Ui extends Nt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,u=e/a,d=t/l,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const M=p*d-o;for(let y=0;y<c;y++){const S=y*u-r;g.push(S,-M,0),_.push(0,0,1),m.push(y/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let M=0;M<a;M++){const y=M+c*p,S=M+c*(p+1),P=M+1+c*(p+1),E=M+1+c*p;f.push(y,S,E),f.push(S,P,E)}this.setIndex(f),this.setAttribute("position",new pt(g,3)),this.setAttribute("normal",new pt(_,3)),this.setAttribute("uv",new pt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ui(e.width,e.height,e.widthSegments,e.heightSegments)}}class ci extends Nt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new b,d=new b,f=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const M=[],y=p/n;let S=0;p===0&&o===0?S=.5/t:p===n&&l===Math.PI&&(S=-.5/t);for(let P=0;P<=t;P++){const E=P/t;u.x=-e*Math.cos(s+E*r)*Math.sin(o+y*a),u.y=e*Math.cos(o+y*a),u.z=e*Math.sin(s+E*r)*Math.sin(o+y*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),m.push(E+S,1-y),M.push(c++)}h.push(M)}for(let p=0;p<n;p++)for(let M=0;M<t;M++){const y=h[p][M+1],S=h[p][M],P=h[p+1][M],E=h[p+1][M+1];(p!==0||o>0)&&f.push(y,S,E),(p!==n-1||l<Math.PI)&&f.push(S,P,E)}this.setIndex(f),this.setAttribute("position",new pt(g,3)),this.setAttribute("normal",new pt(_,3)),this.setAttribute("uv",new pt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ci(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Tn extends Nt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],l=[],c=[],h=new b,u=new b,d=new b;for(let f=0;f<=n;f++)for(let g=0;g<=s;g++){const _=g/s*r,m=f/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(_),u.y=(e+t*Math.cos(m))*Math.sin(_),u.z=t*Math.sin(m),a.push(u.x,u.y,u.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(g/s),c.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=s;g++){const _=(s+1)*f+g-1,m=(s+1)*(f-1)+g-1,p=(s+1)*(f-1)+g,M=(s+1)*f+g;o.push(_,m,M),o.push(m,p,M)}this.setIndex(o),this.setAttribute("position",new pt(a,3)),this.setAttribute("normal",new pt(l,3)),this.setAttribute("uv",new pt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Tn(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Oc extends Nt{constructor(e=new Dd(new b(-1,-1,0),new b(-1,1,0),new b(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};const o=e.computeFrenetFrames(t,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new b,l=new b,c=new de;let h=new b;const u=[],d=[],f=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new pt(u,3)),this.setAttribute("normal",new pt(d,3)),this.setAttribute("uv",new pt(f,2));function _(){for(let y=0;y<t;y++)m(y);m(r===!1?t:0),M(),p()}function m(y){h=e.getPointAt(y/t,h);const S=o.normals[y],P=o.binormals[y];for(let E=0;E<=s;E++){const C=E/s*Math.PI*2,R=Math.sin(C),v=-Math.cos(C);l.x=v*S.x+R*P.x,l.y=v*S.y+R*P.y,l.z=v*S.z+R*P.z,l.normalize(),d.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,u.push(a.x,a.y,a.z)}}function p(){for(let y=1;y<=t;y++)for(let S=1;S<=s;S++){const P=(s+1)*(y-1)+(S-1),E=(s+1)*y+(S-1),C=(s+1)*y+S,R=(s+1)*(y-1)+S;g.push(P,E,R),g.push(E,C,R)}}function M(){for(let y=0;y<=t;y++)for(let S=0;S<=s;S++)c.x=y/t,c.y=S/s,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Oc(new pm[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class Xh extends li{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class hi extends Ln{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new De(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new De(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Rc,this.normalScale=new de(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class gn extends hi{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new de(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ge(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new De(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new De(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new De(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class mm extends Ln{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new De(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new De(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Rc,this.normalScale=new de(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bn,this.combine=yc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class gm extends Ln{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=jf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class _m extends Ln{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class vm extends Nc{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}function Mo(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function xm(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function ym(i){function e(s,r){return i[s]-i[r]}const t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function jh(i,e,t){const n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){const a=t[r]*e;for(let l=0;l!==e;++l)s[o++]=i[a+l]}return s}function Id(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push(...o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=i[s++];while(r!==void 0)}class jr{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break e}o=t.length;break t}if(!(e>=r)){const a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Mm extends jr{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:oh,endingEnd:oh}}intervalChanged_(e,t,n){const s=this.parameterPositions;let r=e-2,o=e+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case ah:r=e,a=2*t-n;break;case lh:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case ah:o=e,l=2*n-t;break;case lh:o=1,l=n+s[1]-s[0];break;default:o=e-1,l=t}const c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(s-t),_=g*g,m=_*g,p=-d*m+2*d*_-d*g,M=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*g+1,y=(-1-f)*m+(1.5+f)*_+.5*g,S=f*m-f*_;for(let P=0;P!==a;++P)r[P]=p*o[h+P]+M*o[c+P]+y*o[l+P]+S*o[u+P];return r}}class Sm extends jr{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(s-t),u=1-h;for(let d=0;d!==a;++d)r[d]=o[c+d]*u+o[l+d]*h;return r}}class wm extends jr{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class Un{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Mo(t,this.TimeBufferType),this.values=Mo(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Mo(e.times,Array),values:Mo(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new wm(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Sm(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Mm(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Or:t=this.InterpolantFactoryMethodDiscrete;break;case kr:t=this.InterpolantFactoryMethodLinear;break;case ha:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Or;case this.InterpolantFactoryMethodLinear:return kr;case this.InterpolantFactoryMethodSmooth:return ha}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){const n=this.times,s=n.length;let r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(s!==void 0&&xm(s))for(let a=0,l=s.length;a!==l;++a){const c=s[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===ha,r=e.length-1;let o=1;for(let a=1;a<r;++a){let l=!1;const c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(s)l=!0;else{const u=a*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){const _=t[u+g];if(_!==t[d+g]||_!==t[f+g]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const u=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}}Un.prototype.ValueTypeName="";Un.prototype.TimeBufferType=Float32Array;Un.prototype.ValueBufferType=Float32Array;Un.prototype.DefaultInterpolation=kr;class $s extends Un{constructor(e,t,n){super(e,t,n)}}$s.prototype.ValueTypeName="bool";$s.prototype.ValueBufferType=Array;$s.prototype.DefaultInterpolation=Or;$s.prototype.InterpolantFactoryMethodLinear=void 0;$s.prototype.InterpolantFactoryMethodSmooth=void 0;class Ld extends Un{constructor(e,t,n,s){super(e,t,n,s)}}Ld.prototype.ValueTypeName="color";class Ws extends Un{constructor(e,t,n,s){super(e,t,n,s)}}Ws.prototype.ValueTypeName="number";class bm extends jr{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(s-t);let c=e*a;for(let h=c+a;c!==h;c+=4)Oe.slerpFlat(r,0,o,c-a,o,c,l);return r}}class Xs extends Un{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new bm(this.times,this.values,this.getValueSize(),e)}}Xs.prototype.ValueTypeName="quaternion";Xs.prototype.InterpolantFactoryMethodSmooth=void 0;class Zs extends Un{constructor(e,t,n){super(e,t,n)}}Zs.prototype.ValueTypeName="string";Zs.prototype.ValueBufferType=Array;Zs.prototype.DefaultInterpolation=Or;Zs.prototype.InterpolantFactoryMethodLinear=void 0;Zs.prototype.InterpolantFactoryMethodSmooth=void 0;class js extends Un{constructor(e,t,n,s){super(e,t,n,s)}}js.prototype.ValueTypeName="vector";class Tm{constructor(e="",t=-1,n=[],s=Wf){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=In(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,s=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(Am(n[o]).scale(s));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){const t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,o=n.length;r!==o;++r)t.push(Un.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){const r=t.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);const h=ym(l);l=jh(l,1,h),c=jh(c,1,h),!s&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new Ws(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],h=c.name.match(r);if(h&&h.length>1){const u=h[1];let d=s[u];d||(s[u]=d=[]),d.push(c)}}const o=[];for(const a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],t,n));return o}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,g,_){if(f.length!==0){const m=[],p=[];Id(f,m,p,g),m.length!==0&&_.push(new u(d,m,p))}},s=[],r=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let _=0;_<d[g].morphTargets.length;_++)f[d[g].morphTargets[_]]=-1;for(const _ in f){const m=[],p=[];for(let M=0;M!==d[g].morphTargets.length;++M){const y=d[g];m.push(y.time),p.push(y.morphTarget===_?1:0)}s.push(new Ws(".morphTargetInfluence["+_+"]",m,p))}l=f.length*o}else{const f=".bones["+t[u].name+"]";n(js,f+".position",d,"pos",s),n(Xs,f+".quaternion",d,"rot",s),n(js,f+".scale",d,"scl",s)}}return s.length===0?null:new this(r,l,s,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,s=e.length;n!==s;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function Em(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Ws;case"vector":case"vector2":case"vector3":case"vector4":return js;case"color":return Ld;case"quaternion":return Xs;case"bool":case"boolean":return $s;case"string":return Zs}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function Am(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Em(i.type);if(i.times===void 0){const t=[],n=[];Id(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const si={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class Rm{constructor(e,t,n){const s=this;let r=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}}const Cm=new Rm;class Js{constructor(e){this.manager=e!==void 0?e:Cm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Js.DEFAULT_MATERIAL_NAME="__DEFAULT";const Zn={};class Pm extends Error{constructor(e,t){super(e),this.response=t}}class Nd extends Js{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=si.get(`file:${e}`);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Zn[e]!==void 0){Zn[e].push({onLoad:t,onProgress:n,onError:s});return}Zn[e]=[],Zn[e].push({onLoad:t,onProgress:n,onError:s});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=Zn[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0;let _=0;const m=new ReadableStream({start(p){M();function M(){u.read().then(({done:y,value:S})=>{if(y)p.close();else{_+=S.byteLength;const P=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:f});for(let E=0,C=h.length;E<C;E++){const R=h[E];R.onProgress&&R.onProgress(P)}p.enqueue(S),M()}},y=>{p.error(y)})}}});return new Response(m)}else throw new Pm(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a==="")return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{si.add(`file:${e}`,c);const h=Zn[e];delete Zn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=Zn[e];if(h===void 0)throw this.manager.itemError(e),c;delete Zn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const ys=new WeakMap;class Dm extends Js{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=si.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);else{let u=ys.get(o);u===void 0&&(u=[],ys.set(o,u)),u.push({onLoad:t,onError:s})}return o}const a=Br("img");function l(){h(),t&&t(this);const u=ys.get(this)||[];for(let d=0;d<u.length;d++){const f=u[d];f.onLoad&&f.onLoad(this)}ys.delete(this),r.manager.itemEnd(e)}function c(u){h(),s&&s(u),si.remove(`image:${e}`);const d=ys.get(this)||[];for(let f=0;f<d.length;f++){const g=d[f];g.onError&&g.onError(u)}ys.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),si.add(`image:${e}`,a),r.manager.itemStart(e),a.src=e,a}}class Im extends Js{constructor(e){super(e)}load(e,t,n,s){const r=new Dt,o=new Dm(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class ta extends ht{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new De(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class qh extends ta{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ht.DEFAULT_UP),this.updateMatrix(),this.groundColor=new De(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Ba=new Fe,Yh=new b,Kh=new b;class kc{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new de(512,512),this.mapType=Nn,this.map=null,this.mapPass=null,this.matrix=new Fe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Lc,this._frameExtents=new de(1,1),this._viewportCount=1,this._viewports=[new tt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Yh.setFromMatrixPosition(e.matrixWorld),t.position.copy(Yh),Kh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Kh),t.updateMatrixWorld(),Ba.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ba,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ba)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Lm extends kc{constructor(){super(new qt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=Hs*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Ud extends ta{constructor(e,t,n=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ht.DEFAULT_UP),this.updateMatrix(),this.target=new ht,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Lm}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const $h=new Fe,lr=new b,za=new b;class Nm extends kc{constructor(){super(new qt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new de(4,2),this._viewportCount=6,this._viewports=[new tt(2,1,1,1),new tt(0,1,1,1),new tt(3,1,1,1),new tt(1,1,1,1),new tt(3,0,1,1),new tt(1,0,1,1)],this._cubeDirections=[new b(1,0,0),new b(-1,0,0),new b(0,0,1),new b(0,0,-1),new b(0,1,0),new b(0,-1,0)],this._cubeUps=[new b(0,1,0),new b(0,1,0),new b(0,1,0),new b(0,1,0),new b(0,0,1),new b(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),lr.setFromMatrixPosition(e.matrixWorld),n.position.copy(lr),za.copy(n.position),za.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(za),n.updateMatrixWorld(),s.makeTranslation(-lr.x,-lr.y,-lr.z),$h.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix($h,n.coordinateSystem,n.reversedDepth)}}class Fd extends ta{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Nm}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class na extends xd{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Um extends kc{constructor(){super(new na(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ec extends ta{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ht.DEFAULT_UP),this.updateMatrix(),this.target=new ht,this.shadow=new Um}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Tr{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const Va=new WeakMap;class Fm extends Js{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=si.get(`image-bitmap:${e}`);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(c=>{if(Va.has(o)===!0)s&&s(Va.get(o)),r.manager.itemError(e),r.manager.itemEnd(e);else return t&&t(c),r.manager.itemEnd(e),c});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return si.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){s&&s(c),Va.set(l,c),si.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});si.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class Om extends qt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Bc="\\[\\]\\.:\\/",km=new RegExp("["+Bc+"]","g"),zc="[^"+Bc+"]",Bm="[^"+Bc.replace("\\.","")+"]",zm=/((?:WC+[\/:])*)/.source.replace("WC",zc),Vm=/(WCOD+)?/.source.replace("WCOD",Bm),Hm=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",zc),Gm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",zc),Wm=new RegExp("^"+zm+Vm+Hm+Gm+"$"),Xm=["material","materials","bones","map"];class jm{constructor(e,t,n){const s=n||rt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class rt{constructor(e,t,n){this.path=t,this.parsedPath=n||rt.parseTrackName(t),this.node=rt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new rt.Composite(e,t,n):new rt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(km,"")}static parseTrackName(e){const t=Wm.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=n.nodeName.substring(s+1);Xm.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,s=t.propertyName;let r=t.propertyIndex;if(e||(e=rt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[s];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}rt.Composite=jm;rt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};rt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};rt.prototype.GetterByBindingType=[rt.prototype._getValue_direct,rt.prototype._getValue_array,rt.prototype._getValue_arrayElement,rt.prototype._getValue_toArray];rt.prototype.SetterByBindingTypeAndVersioning=[[rt.prototype._setValue_direct,rt.prototype._setValue_direct_setNeedsUpdate,rt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[rt.prototype._setValue_array,rt.prototype._setValue_array_setNeedsUpdate,rt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[rt.prototype._setValue_arrayElement,rt.prototype._setValue_arrayElement_setNeedsUpdate,rt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[rt.prototype._setValue_fromArray,rt.prototype._setValue_fromArray_setNeedsUpdate,rt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class Zh{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ge(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Ge(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class qm extends ss{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Jh(i,e,t,n){const s=Ym(n);switch(t){case ad:return i*e;case bc:return i*e/s.components*s.byteLength;case Tc:return i*e/s.components*s.byteLength;case cd:return i*e*2/s.components*s.byteLength;case Ec:return i*e*2/s.components*s.byteLength;case ld:return i*e*3/s.components*s.byteLength;case wn:return i*e*4/s.components*s.byteLength;case Ac:return i*e*4/s.components*s.byteLength;case Do:case Io:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Lo:case No:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Sl:case bl:return Math.max(i,16)*Math.max(e,8)/4;case Ml:case wl:return Math.max(i,8)*Math.max(e,8)/2;case Tl:case El:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Al:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Rl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Cl:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Pl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Dl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Il:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Ll:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Nl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Ul:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Fl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Ol:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case kl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Bl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case zl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Vl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Hl:case Gl:case Wl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Xl:case jl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case ql:case Yl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Ym(i){switch(i){case Nn:case id:return{byteLength:1,components:1};case Lr:case sd:case Ks:return{byteLength:2,components:1};case Sc:case wc:return{byteLength:2,components:4};case ns:case Mc:case Dn:return{byteLength:4,components:1};case rd:case od:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:xc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=xc);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Od(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Km(i){const e=new WeakMap;function t(a,l){const c=a.array,h=a.usage,u=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l.updateRanges;if(i.bindBuffer(c,a),u.length===0)i.bufferSubData(c,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){const g=u[d],_=u[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){const _=u[f];i.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(i.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var $m=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Zm=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Jm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Qm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,e0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,t0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,n0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,i0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,s0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,r0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,o0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,a0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,l0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,c0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,h0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,u0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,d0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,f0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,p0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,m0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,g0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,_0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,v0=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,x0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,y0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,M0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,S0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,w0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,b0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,T0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,E0="gl_FragColor = linearToOutputTexel( gl_FragColor );",A0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,R0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,C0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,P0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,D0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,I0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,L0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,N0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,U0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,F0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,O0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,k0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,B0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,z0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,V0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,H0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,G0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,W0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,X0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,j0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,q0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Y0=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,K0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,$0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Z0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,J0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Q0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,eg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,tg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ng=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ig=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,sg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,rg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,og=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ag=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,lg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,cg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,hg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ug=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,dg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,fg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,pg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,mg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_g=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,vg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,xg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,yg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Mg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Sg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,wg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,bg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Tg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Eg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ag=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Rg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Cg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Pg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Dg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Ig=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Lg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Ng=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Ug=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Fg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Og=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,kg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Bg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,zg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Vg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Hg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Gg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Wg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Xg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,jg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,qg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Yg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Kg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,$g=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Jg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,e_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,t_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,n_=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,i_=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,s_=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,r_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,o_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,a_=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,l_=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,c_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,h_=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,u_=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,d_=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,f_=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,p_=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,m_=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,g_=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,__=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,v_=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,x_=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,y_=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,M_=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,S_=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,w_=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,b_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,T_=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,E_=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,A_=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,R_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Xe={alphahash_fragment:$m,alphahash_pars_fragment:Zm,alphamap_fragment:Jm,alphamap_pars_fragment:Qm,alphatest_fragment:e0,alphatest_pars_fragment:t0,aomap_fragment:n0,aomap_pars_fragment:i0,batching_pars_vertex:s0,batching_vertex:r0,begin_vertex:o0,beginnormal_vertex:a0,bsdfs:l0,iridescence_fragment:c0,bumpmap_pars_fragment:h0,clipping_planes_fragment:u0,clipping_planes_pars_fragment:d0,clipping_planes_pars_vertex:f0,clipping_planes_vertex:p0,color_fragment:m0,color_pars_fragment:g0,color_pars_vertex:_0,color_vertex:v0,common:x0,cube_uv_reflection_fragment:y0,defaultnormal_vertex:M0,displacementmap_pars_vertex:S0,displacementmap_vertex:w0,emissivemap_fragment:b0,emissivemap_pars_fragment:T0,colorspace_fragment:E0,colorspace_pars_fragment:A0,envmap_fragment:R0,envmap_common_pars_fragment:C0,envmap_pars_fragment:P0,envmap_pars_vertex:D0,envmap_physical_pars_fragment:H0,envmap_vertex:I0,fog_vertex:L0,fog_pars_vertex:N0,fog_fragment:U0,fog_pars_fragment:F0,gradientmap_pars_fragment:O0,lightmap_pars_fragment:k0,lights_lambert_fragment:B0,lights_lambert_pars_fragment:z0,lights_pars_begin:V0,lights_toon_fragment:G0,lights_toon_pars_fragment:W0,lights_phong_fragment:X0,lights_phong_pars_fragment:j0,lights_physical_fragment:q0,lights_physical_pars_fragment:Y0,lights_fragment_begin:K0,lights_fragment_maps:$0,lights_fragment_end:Z0,logdepthbuf_fragment:J0,logdepthbuf_pars_fragment:Q0,logdepthbuf_pars_vertex:eg,logdepthbuf_vertex:tg,map_fragment:ng,map_pars_fragment:ig,map_particle_fragment:sg,map_particle_pars_fragment:rg,metalnessmap_fragment:og,metalnessmap_pars_fragment:ag,morphinstance_vertex:lg,morphcolor_vertex:cg,morphnormal_vertex:hg,morphtarget_pars_vertex:ug,morphtarget_vertex:dg,normal_fragment_begin:fg,normal_fragment_maps:pg,normal_pars_fragment:mg,normal_pars_vertex:gg,normal_vertex:_g,normalmap_pars_fragment:vg,clearcoat_normal_fragment_begin:xg,clearcoat_normal_fragment_maps:yg,clearcoat_pars_fragment:Mg,iridescence_pars_fragment:Sg,opaque_fragment:wg,packing:bg,premultiplied_alpha_fragment:Tg,project_vertex:Eg,dithering_fragment:Ag,dithering_pars_fragment:Rg,roughnessmap_fragment:Cg,roughnessmap_pars_fragment:Pg,shadowmap_pars_fragment:Dg,shadowmap_pars_vertex:Ig,shadowmap_vertex:Lg,shadowmask_pars_fragment:Ng,skinbase_vertex:Ug,skinning_pars_vertex:Fg,skinning_vertex:Og,skinnormal_vertex:kg,specularmap_fragment:Bg,specularmap_pars_fragment:zg,tonemapping_fragment:Vg,tonemapping_pars_fragment:Hg,transmission_fragment:Gg,transmission_pars_fragment:Wg,uv_pars_fragment:Xg,uv_pars_vertex:jg,uv_vertex:qg,worldpos_vertex:Yg,background_vert:Kg,background_frag:$g,backgroundCube_vert:Zg,backgroundCube_frag:Jg,cube_vert:Qg,cube_frag:e_,depth_vert:t_,depth_frag:n_,distanceRGBA_vert:i_,distanceRGBA_frag:s_,equirect_vert:r_,equirect_frag:o_,linedashed_vert:a_,linedashed_frag:l_,meshbasic_vert:c_,meshbasic_frag:h_,meshlambert_vert:u_,meshlambert_frag:d_,meshmatcap_vert:f_,meshmatcap_frag:p_,meshnormal_vert:m_,meshnormal_frag:g_,meshphong_vert:__,meshphong_frag:v_,meshphysical_vert:x_,meshphysical_frag:y_,meshtoon_vert:M_,meshtoon_frag:S_,points_vert:w_,points_frag:b_,shadow_vert:T_,shadow_frag:E_,sprite_vert:A_,sprite_frag:R_},ae={common:{diffuse:{value:new De(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ze}},envmap:{envMap:{value:null},envMapRotation:{value:new ze},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ze},normalScale:{value:new de(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new De(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new De(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0},uvTransform:{value:new ze}},sprite:{diffuse:{value:new De(16777215)},opacity:{value:1},center:{value:new de(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}}},Bn={basic:{uniforms:Jt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:Jt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new De(0)}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:Jt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new De(0)},specular:{value:new De(1118481)},shininess:{value:30}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:Jt([ae.common,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.roughnessmap,ae.metalnessmap,ae.fog,ae.lights,{emissive:{value:new De(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:Jt([ae.common,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.gradientmap,ae.fog,ae.lights,{emissive:{value:new De(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:Jt([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:Jt([ae.points,ae.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:Jt([ae.common,ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:Jt([ae.common,ae.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:Jt([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:Jt([ae.sprite,ae.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ze}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distanceRGBA:{uniforms:Jt([ae.common,ae.displacementmap,{referencePosition:{value:new b},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distanceRGBA_vert,fragmentShader:Xe.distanceRGBA_frag},shadow:{uniforms:Jt([ae.lights,ae.fog,{color:{value:new De(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};Bn.physical={uniforms:Jt([Bn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ze},clearcoatNormalScale:{value:new de(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ze},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ze},sheen:{value:0},sheenColor:{value:new De(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ze},transmissionSamplerSize:{value:new de},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ze},attenuationDistance:{value:0},attenuationColor:{value:new De(0)},specularColor:{value:new De(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ze},anisotropyVector:{value:new de},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ze}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};const So={r:0,b:0,g:0},Gi=new bn,C_=new Fe;function P_(i,e,t,n,s,r,o){const a=new De(0);let l=r===!0?0:1,c,h,u=null,d=0,f=null;function g(y){let S=y.isScene===!0?y.background:null;return S&&S.isTexture&&(S=(y.backgroundBlurriness>0?t:e).get(S)),S}function _(y){let S=!1;const P=g(y);P===null?p(a,l):P&&P.isColor&&(p(P,1),S=!0);const E=i.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,o):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||S)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(y,S){const P=g(S);P&&(P.isCubeTexture||P.mapping===Qo)?(h===void 0&&(h=new qe(new Fi(1,1,1),new li({name:"BackgroundCubeMaterial",uniforms:Gs(Bn.backgroundCube.uniforms),vertexShader:Bn.backgroundCube.vertexShader,fragmentShader:Bn.backgroundCube.fragmentShader,side:Yt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(E,C,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Gi.copy(S.backgroundRotation),Gi.x*=-1,Gi.y*=-1,Gi.z*=-1,P.isCubeTexture&&P.isRenderTargetTexture===!1&&(Gi.y*=-1,Gi.z*=-1),h.material.uniforms.envMap.value=P,h.material.uniforms.flipEnvMap.value=P.isCubeTexture&&P.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(C_.makeRotationFromEuler(Gi)),h.material.toneMapped=et.getTransfer(P.colorSpace)!==at,(u!==P||d!==P.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=P,d=P.version,f=i.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):P&&P.isTexture&&(c===void 0&&(c=new qe(new Ui(2,2),new li({name:"BackgroundMaterial",uniforms:Gs(Bn.background.uniforms),vertexShader:Bn.background.vertexShader,fragmentShader:Bn.background.fragmentShader,side:ai,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=P,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=et.getTransfer(P.colorSpace)!==at,P.matrixAutoUpdate===!0&&P.updateMatrix(),c.material.uniforms.uvTransform.value.copy(P.matrix),(u!==P||d!==P.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=P,d=P.version,f=i.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function p(y,S){y.getRGB(So,vd(i)),n.buffers.color.setClear(So.r,So.g,So.b,S,o)}function M(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,S=1){a.set(y),l=S,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,p(a,l)},render:_,addToRenderList:m,dispose:M}}function D_(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,o=!1;function a(x,A,D,U,L){let k=!1;const F=u(U,D,A);r!==F&&(r=F,c(r.object)),k=f(x,U,D,L),k&&g(x,U,D,L),L!==null&&e.update(L,i.ELEMENT_ARRAY_BUFFER),(k||o)&&(o=!1,S(x,A,D,U),L!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(L).buffer))}function l(){return i.createVertexArray()}function c(x){return i.bindVertexArray(x)}function h(x){return i.deleteVertexArray(x)}function u(x,A,D){const U=D.wireframe===!0;let L=n[x.id];L===void 0&&(L={},n[x.id]=L);let k=L[A.id];k===void 0&&(k={},L[A.id]=k);let F=k[U];return F===void 0&&(F=d(l()),k[U]=F),F}function d(x){const A=[],D=[],U=[];for(let L=0;L<t;L++)A[L]=0,D[L]=0,U[L]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:A,enabledAttributes:D,attributeDivisors:U,object:x,attributes:{},index:null}}function f(x,A,D,U){const L=r.attributes,k=A.attributes;let F=0;const q=D.getAttributes();for(const V in q)if(q[V].location>=0){const ee=L[V];let ce=k[V];if(ce===void 0&&(V==="instanceMatrix"&&x.instanceMatrix&&(ce=x.instanceMatrix),V==="instanceColor"&&x.instanceColor&&(ce=x.instanceColor)),ee===void 0||ee.attribute!==ce||ce&&ee.data!==ce.data)return!0;F++}return r.attributesNum!==F||r.index!==U}function g(x,A,D,U){const L={},k=A.attributes;let F=0;const q=D.getAttributes();for(const V in q)if(q[V].location>=0){let ee=k[V];ee===void 0&&(V==="instanceMatrix"&&x.instanceMatrix&&(ee=x.instanceMatrix),V==="instanceColor"&&x.instanceColor&&(ee=x.instanceColor));const ce={};ce.attribute=ee,ee&&ee.data&&(ce.data=ee.data),L[V]=ce,F++}r.attributes=L,r.attributesNum=F,r.index=U}function _(){const x=r.newAttributes;for(let A=0,D=x.length;A<D;A++)x[A]=0}function m(x){p(x,0)}function p(x,A){const D=r.newAttributes,U=r.enabledAttributes,L=r.attributeDivisors;D[x]=1,U[x]===0&&(i.enableVertexAttribArray(x),U[x]=1),L[x]!==A&&(i.vertexAttribDivisor(x,A),L[x]=A)}function M(){const x=r.newAttributes,A=r.enabledAttributes;for(let D=0,U=A.length;D<U;D++)A[D]!==x[D]&&(i.disableVertexAttribArray(D),A[D]=0)}function y(x,A,D,U,L,k,F){F===!0?i.vertexAttribIPointer(x,A,D,L,k):i.vertexAttribPointer(x,A,D,U,L,k)}function S(x,A,D,U){_();const L=U.attributes,k=D.getAttributes(),F=A.defaultAttributeValues;for(const q in k){const V=k[q];if(V.location>=0){let K=L[q];if(K===void 0&&(q==="instanceMatrix"&&x.instanceMatrix&&(K=x.instanceMatrix),q==="instanceColor"&&x.instanceColor&&(K=x.instanceColor)),K!==void 0){const ee=K.normalized,ce=K.itemSize,Te=e.get(K);if(Te===void 0)continue;const $e=Te.buffer,Je=Te.type,Ve=Te.bytesPerElement,X=Je===i.INT||Je===i.UNSIGNED_INT||K.gpuType===Mc;if(K.isInterleavedBufferAttribute){const Z=K.data,me=Z.stride,Ue=K.offset;if(Z.isInstancedInterleavedBuffer){for(let be=0;be<V.locationSize;be++)p(V.location+be,Z.meshPerAttribute);x.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let be=0;be<V.locationSize;be++)m(V.location+be);i.bindBuffer(i.ARRAY_BUFFER,$e);for(let be=0;be<V.locationSize;be++)y(V.location+be,ce/V.locationSize,Je,ee,me*Ve,(Ue+ce/V.locationSize*be)*Ve,X)}else{if(K.isInstancedBufferAttribute){for(let Z=0;Z<V.locationSize;Z++)p(V.location+Z,K.meshPerAttribute);x.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let Z=0;Z<V.locationSize;Z++)m(V.location+Z);i.bindBuffer(i.ARRAY_BUFFER,$e);for(let Z=0;Z<V.locationSize;Z++)y(V.location+Z,ce/V.locationSize,Je,ee,ce*Ve,ce/V.locationSize*Z*Ve,X)}}else if(F!==void 0){const ee=F[q];if(ee!==void 0)switch(ee.length){case 2:i.vertexAttrib2fv(V.location,ee);break;case 3:i.vertexAttrib3fv(V.location,ee);break;case 4:i.vertexAttrib4fv(V.location,ee);break;default:i.vertexAttrib1fv(V.location,ee)}}}}M()}function P(){R();for(const x in n){const A=n[x];for(const D in A){const U=A[D];for(const L in U)h(U[L].object),delete U[L];delete A[D]}delete n[x]}}function E(x){if(n[x.id]===void 0)return;const A=n[x.id];for(const D in A){const U=A[D];for(const L in U)h(U[L].object),delete U[L];delete A[D]}delete n[x.id]}function C(x){for(const A in n){const D=n[A];if(D[x.id]===void 0)continue;const U=D[x.id];for(const L in U)h(U[L].object),delete U[L];delete D[x.id]}}function R(){v(),o=!0,r!==s&&(r=s,c(r.object))}function v(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:R,resetDefaultState:v,dispose:P,releaseStatesOfGeometry:E,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:m,disableUnusedAttributes:M}}function I_(i,e,t){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),t.update(h,n,1)}function o(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),t.update(h,n,u))}function a(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];t.update(f,n,1)}function l(c,h,u,d){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)o(c[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*d[_];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function L_(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(C){return!(C!==wn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){const R=C===Ks&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==Nn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Dn&&!R)}function l(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),P=g>0,E=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:M,maxVaryings:y,maxFragmentUniforms:S,vertexTextures:P,maxSamples:E}}function N_(i){const e=this;let t=null,n=0,s=!1,r=!1;const o=new bi,a=new ze,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{const M=r?0:n,y=M*4;let S=p.clippingState||null;l.value=S,S=h(g,d,y,f);for(let P=0;P!==y;++P)S[P]=t[P];p.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=f+_*4,M=d.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,S=f;y!==_;++y,S+=4)o.copy(u[y]).applyMatrix4(M,a),o.normal.toArray(m,S),m[S+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function U_(i){let e=new WeakMap;function t(o,a){return a===xl?o.mapping=zs:a===yl&&(o.mapping=Vs),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===xl||a===yl)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Vp(l.height);return c.fromEquirectangularTexture(i,o),e.set(o,c),o.addEventListener("dispose",s),t(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const Rs=4,Qh=[.125,.215,.35,.446,.526,.582],Zi=20,Ha=new na,eu=new De;let Ga=null,Wa=0,Xa=0,ja=!1;const Ki=(1+Math.sqrt(5))/2,Ms=1/Ki,tu=[new b(-Ki,Ms,0),new b(Ki,Ms,0),new b(-Ms,0,Ki),new b(Ms,0,Ki),new b(0,Ki,-Ms),new b(0,Ki,Ms),new b(-1,1,-1),new b(1,1,-1),new b(-1,1,1),new b(1,1,1)],F_=new b;class tc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,r={}){const{size:o=256,position:a=F_}=r;Ga=this._renderer.getRenderTarget(),Wa=this._renderer.getActiveCubeFace(),Xa=this._renderer.getActiveMipmapLevel(),ja=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=su(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=iu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ga,Wa,Xa),this._renderer.xr.enabled=ja,e.scissorTest=!1,wo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===zs||e.mapping===Vs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ga=this._renderer.getRenderTarget(),Wa=this._renderer.getActiveCubeFace(),Xa=this._renderer.getActiveMipmapLevel(),ja=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:en,minFilter:en,generateMipmaps:!1,type:Ks,format:wn,colorSpace:Kt,depthBuffer:!1},s=nu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=nu(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=O_(r)),this._blurMaterial=k_(r,e,t)}return s}_compileMaterial(e){const t=new qe(this._lodPlanes[0],e);this._renderer.compile(t,Ha)}_sceneToCubeUV(e,t,n,s,r){const l=new qt(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(eu),u.toneMapping=Pi,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const _=new fn({name:"PMREM.Background",side:Yt,depthWrite:!1,depthTest:!1}),m=new qe(new Fi,_);let p=!1;const M=e.background;M?M.isColor&&(_.color.copy(M),e.background=null,p=!0):(_.color.copy(eu),p=!0);for(let y=0;y<6;y++){const S=y%3;S===0?(l.up.set(0,c[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[y],r.y,r.z)):S===1?(l.up.set(0,0,c[y]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[y],r.z)):(l.up.set(0,c[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[y]));const P=this._cubeSize;wo(s,S*P,y>2?P:0,P,P),u.setRenderTarget(s),p&&u.render(m,l),u.render(e,l)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=f,u.autoClear=d,e.background=M}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===zs||e.mapping===Vs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=su()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=iu());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new qe(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;wo(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Ha)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=tu[(s-r-1)%tu.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new qe(this._lodPlanes[s],c),d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Zi-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):Zi;m>Zi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Zi}`);const p=[];let M=0;for(let C=0;C<Zi;++C){const R=C/_,v=Math.exp(-R*R/2);p.push(v),C===0?M+=v:C<m&&(M+=2*v)}for(let C=0;C<p.length;C++)p[C]=p[C]/M;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:y}=this;d.dTheta.value=g,d.mipInt.value=y-n;const S=this._sizeLods[s],P=3*S*(s>y-Rs?s-y+Rs:0),E=4*(this._cubeSize-S);wo(t,P,E,3*S,2*S),l.setRenderTarget(t),l.render(u,Ha)}}function O_(i){const e=[],t=[],n=[];let s=i;const r=i-Rs+1+Qh.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let l=1/a;o>i-Rs?l=Qh[o-i+Rs-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,_=3,m=2,p=1,M=new Float32Array(_*g*f),y=new Float32Array(m*g*f),S=new Float32Array(p*g*f);for(let E=0;E<f;E++){const C=E%3*2/3-1,R=E>2?0:-1,v=[C,R,0,C+2/3,R,0,C+2/3,R+1,0,C,R,0,C+2/3,R+1,0,C,R+1,0];M.set(v,_*g*E),y.set(d,m*g*E);const x=[E,E,E,E,E,E];S.set(x,p*g*E)}const P=new Nt;P.setAttribute("position",new ct(M,_)),P.setAttribute("uv",new ct(y,m)),P.setAttribute("faceIndex",new ct(S,p)),e.push(P),s>Rs&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function nu(i,e,t){const n=new Ni(i,e,t);return n.texture.mapping=Qo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function wo(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function k_(i,e,t){const n=new Float32Array(Zi),s=new b(0,1,0);return new li({name:"SphericalGaussianBlur",defines:{n:Zi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Vc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ci,depthTest:!1,depthWrite:!1})}function iu(){return new li({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Vc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ci,depthTest:!1,depthWrite:!1})}function su(){return new li({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Vc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ci,depthTest:!1,depthWrite:!1})}function Vc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function B_(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===xl||l===yl,h=l===zs||l===Vs;if(c||h){let u=e.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new tc(i)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return c&&f&&f.height>0||h&&f&&s(f)?(t===null&&(t=new tc(i)),u=c?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function z_(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&zr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function V_(i,e,t,n){const s={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",o),delete s[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const f in d)e.update(d[f],i.ARRAY_BUFFER)}function c(u){const d=[],f=u.index,g=u.attributes.position;let _=0;if(f!==null){const M=f.array;_=f.version;for(let y=0,S=M.length;y<S;y+=3){const P=M[y+0],E=M[y+1],C=M[y+2];d.push(P,E,E,C,C,P)}}else if(g!==void 0){const M=g.array;_=g.version;for(let y=0,S=M.length/3-1;y<S;y+=3){const P=y+0,E=y+1,C=y+2;d.push(P,E,E,C,C,P)}}else return;const m=new(dd(d)?_d:gd)(d,1);m.version=_;const p=r.get(u);p&&e.remove(p),r.set(u,m)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function H_(i,e,t){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,f){i.drawElements(n,f,r,d*o),t.update(f,n,1)}function c(d,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,d*o,g),t.update(f,n,g))}function h(d,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,n,1)}function u(d,f,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)c(d[p]/o,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,_,0,g);let p=0;for(let M=0;M<g;M++)p+=f[M]*_[M];t.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function G_(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function W_(i,e,t){const n=new WeakMap,s=new tt;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let v=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",v)};d!==void 0&&d.texture.dispose();const f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],M=a.morphAttributes.color||[];let y=0;f===!0&&(y=1),g===!0&&(y=2),_===!0&&(y=3);let S=a.attributes.position.count*y,P=1;S>e.maxTextureSize&&(P=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const E=new Float32Array(S*P*4*u),C=new fd(E,S,P,u);C.type=Dn,C.needsUpdate=!0;const R=y*4;for(let x=0;x<u;x++){const A=m[x],D=p[x],U=M[x],L=S*P*4*x;for(let k=0;k<A.count;k++){const F=k*R;f===!0&&(s.fromBufferAttribute(A,k),E[L+F+0]=s.x,E[L+F+1]=s.y,E[L+F+2]=s.z,E[L+F+3]=0),g===!0&&(s.fromBufferAttribute(D,k),E[L+F+4]=s.x,E[L+F+5]=s.y,E[L+F+6]=s.z,E[L+F+7]=0),_===!0&&(s.fromBufferAttribute(U,k),E[L+F+8]=s.x,E[L+F+9]=s.y,E[L+F+10]=s.z,E[L+F+11]=U.itemSize===4?s.w:1)}}d={count:u,texture:C,size:new de(S,P)},n.set(a,d),a.addEventListener("dispose",v)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];const g=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function X_(i,e,t,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=e.get(l,h);if(s.get(u)!==c&&(e.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return u}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}const kd=new Dt,ru=new Ad(1,1),Bd=new fd,zd=new Tp,Vd=new yd,ou=[],au=[],lu=new Float32Array(16),cu=new Float32Array(9),hu=new Float32Array(4);function Qs(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=ou[s];if(r===void 0&&(r=new Float32Array(s),ou[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function It(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Lt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function ia(i,e){let t=au[e];t===void 0&&(t=new Int32Array(e),au[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function j_(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function q_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;i.uniform2fv(this.addr,e),Lt(t,e)}}function Y_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(It(t,e))return;i.uniform3fv(this.addr,e),Lt(t,e)}}function K_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;i.uniform4fv(this.addr,e),Lt(t,e)}}function $_(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(It(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Lt(t,e)}else{if(It(t,n))return;hu.set(n),i.uniformMatrix2fv(this.addr,!1,hu),Lt(t,n)}}function Z_(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(It(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Lt(t,e)}else{if(It(t,n))return;cu.set(n),i.uniformMatrix3fv(this.addr,!1,cu),Lt(t,n)}}function J_(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(It(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Lt(t,e)}else{if(It(t,n))return;lu.set(n),i.uniformMatrix4fv(this.addr,!1,lu),Lt(t,n)}}function Q_(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function ev(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;i.uniform2iv(this.addr,e),Lt(t,e)}}function tv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(It(t,e))return;i.uniform3iv(this.addr,e),Lt(t,e)}}function nv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;i.uniform4iv(this.addr,e),Lt(t,e)}}function iv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function sv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;i.uniform2uiv(this.addr,e),Lt(t,e)}}function rv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(It(t,e))return;i.uniform3uiv(this.addr,e),Lt(t,e)}}function ov(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;i.uniform4uiv(this.addr,e),Lt(t,e)}}function av(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(ru.compareFunction=ud,r=ru):r=kd,t.setTexture2D(e||r,s)}function lv(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||zd,s)}function cv(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Vd,s)}function hv(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Bd,s)}function uv(i){switch(i){case 5126:return j_;case 35664:return q_;case 35665:return Y_;case 35666:return K_;case 35674:return $_;case 35675:return Z_;case 35676:return J_;case 5124:case 35670:return Q_;case 35667:case 35671:return ev;case 35668:case 35672:return tv;case 35669:case 35673:return nv;case 5125:return iv;case 36294:return sv;case 36295:return rv;case 36296:return ov;case 35678:case 36198:case 36298:case 36306:case 35682:return av;case 35679:case 36299:case 36307:return lv;case 35680:case 36300:case 36308:case 36293:return cv;case 36289:case 36303:case 36311:case 36292:return hv}}function dv(i,e){i.uniform1fv(this.addr,e)}function fv(i,e){const t=Qs(e,this.size,2);i.uniform2fv(this.addr,t)}function pv(i,e){const t=Qs(e,this.size,3);i.uniform3fv(this.addr,t)}function mv(i,e){const t=Qs(e,this.size,4);i.uniform4fv(this.addr,t)}function gv(i,e){const t=Qs(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function _v(i,e){const t=Qs(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function vv(i,e){const t=Qs(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function xv(i,e){i.uniform1iv(this.addr,e)}function yv(i,e){i.uniform2iv(this.addr,e)}function Mv(i,e){i.uniform3iv(this.addr,e)}function Sv(i,e){i.uniform4iv(this.addr,e)}function wv(i,e){i.uniform1uiv(this.addr,e)}function bv(i,e){i.uniform2uiv(this.addr,e)}function Tv(i,e){i.uniform3uiv(this.addr,e)}function Ev(i,e){i.uniform4uiv(this.addr,e)}function Av(i,e,t){const n=this.cache,s=e.length,r=ia(t,s);It(n,r)||(i.uniform1iv(this.addr,r),Lt(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||kd,r[o])}function Rv(i,e,t){const n=this.cache,s=e.length,r=ia(t,s);It(n,r)||(i.uniform1iv(this.addr,r),Lt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||zd,r[o])}function Cv(i,e,t){const n=this.cache,s=e.length,r=ia(t,s);It(n,r)||(i.uniform1iv(this.addr,r),Lt(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Vd,r[o])}function Pv(i,e,t){const n=this.cache,s=e.length,r=ia(t,s);It(n,r)||(i.uniform1iv(this.addr,r),Lt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Bd,r[o])}function Dv(i){switch(i){case 5126:return dv;case 35664:return fv;case 35665:return pv;case 35666:return mv;case 35674:return gv;case 35675:return _v;case 35676:return vv;case 5124:case 35670:return xv;case 35667:case 35671:return yv;case 35668:case 35672:return Mv;case 35669:case 35673:return Sv;case 5125:return wv;case 36294:return bv;case 36295:return Tv;case 36296:return Ev;case 35678:case 36198:case 36298:case 36306:case 35682:return Av;case 35679:case 36299:case 36307:return Rv;case 35680:case 36300:case 36308:case 36293:return Cv;case 36289:case 36303:case 36311:case 36292:return Pv}}class Iv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=uv(t.type)}}class Lv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Dv(t.type)}}class Nv{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],n)}}}const qa=/(\w+)(\])?(\[|\.)?/g;function uu(i,e){i.seq.push(e),i.map[e.id]=e}function Uv(i,e,t){const n=i.name,s=n.length;for(qa.lastIndex=0;;){const r=qa.exec(n),o=qa.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){uu(t,c===void 0?new Iv(a,i,e):new Lv(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new Nv(a),uu(t,u)),t=u}}}class Uo{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);Uv(r,o,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&n.push(o)}return n}}function du(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Fv=37297;let Ov=0;function kv(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const fu=new ze;function Bv(i){et._getMatrix(fu,et.workingColorSpace,i);const e=`mat3( ${fu.elements.map(t=>t.toFixed(4))} )`;switch(et.getTransfer(i)){case Go:return[e,"LinearTransferOETF"];case at:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function pu(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+kv(i.getShaderSource(e),a)}else return r}function zv(i,e){const t=Bv(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Vv(i,e){let t;switch(e){case Of:t="Linear";break;case kf:t="Reinhard";break;case Bf:t="Cineon";break;case ed:t="ACESFilmic";break;case Vf:t="AgX";break;case Hf:t="Neutral";break;case zf:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const bo=new b;function Hv(){et.getLuminanceCoefficients(bo);const i=bo.x.toFixed(4),e=bo.y.toFixed(4),t=bo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Gv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(mr).join(`
`)}function Wv(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Xv(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function mr(i){return i!==""}function mu(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function gu(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const jv=/^[ \t]*#include +<([\w\d./]+)>/gm;function nc(i){return i.replace(jv,Yv)}const qv=new Map;function Yv(i,e){let t=Xe[e];if(t===void 0){const n=qv.get(e);if(n!==void 0)t=Xe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return nc(t)}const Kv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function _u(i){return i.replace(Kv,$v)}function $v(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function vu(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Zv(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Ju?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Qu?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Qn&&(e="SHADOWMAP_TYPE_VSM"),e}function Jv(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case zs:case Vs:e="ENVMAP_TYPE_CUBE";break;case Qo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Qv(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Vs:e="ENVMAP_MODE_REFRACTION";break}return e}function ex(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case yc:e="ENVMAP_BLENDING_MULTIPLY";break;case Uf:e="ENVMAP_BLENDING_MIX";break;case Ff:e="ENVMAP_BLENDING_ADD";break}return e}function tx(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function nx(i,e,t,n){const s=i.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=Zv(t),c=Jv(t),h=Qv(t),u=ex(t),d=tx(t),f=Gv(t),g=Wv(r),_=s.createProgram();let m,p,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(mr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(mr).join(`
`),p.length>0&&(p+=`
`)):(m=[vu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(mr).join(`
`),p=[vu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Pi?"#define TONE_MAPPING":"",t.toneMapping!==Pi?Xe.tonemapping_pars_fragment:"",t.toneMapping!==Pi?Vv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,zv("linearToOutputTexel",t.outputColorSpace),Hv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(mr).join(`
`)),o=nc(o),o=mu(o,t),o=gu(o,t),a=nc(a),a=mu(a,t),a=gu(a,t),o=_u(o),a=_u(a),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===uh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===uh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const y=M+m+o,S=M+p+a,P=du(s,s.VERTEX_SHADER,y),E=du(s,s.FRAGMENT_SHADER,S);s.attachShader(_,P),s.attachShader(_,E),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function C(A){if(i.debug.checkShaderErrors){const D=s.getProgramInfoLog(_)||"",U=s.getShaderInfoLog(P)||"",L=s.getShaderInfoLog(E)||"",k=D.trim(),F=U.trim(),q=L.trim();let V=!0,K=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(V=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,P,E);else{const ee=pu(s,P,"vertex"),ce=pu(s,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+k+`
`+ee+`
`+ce)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(F===""||q==="")&&(K=!1);K&&(A.diagnostics={runnable:V,programLog:k,vertexShader:{log:F,prefix:m},fragmentShader:{log:q,prefix:p}})}s.deleteShader(P),s.deleteShader(E),R=new Uo(s,_),v=Xv(s,_)}let R;this.getUniforms=function(){return R===void 0&&C(this),R};let v;this.getAttributes=function(){return v===void 0&&C(this),v};let x=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=s.getProgramParameter(_,Fv)),x},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Ov++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=P,this.fragmentShader=E,this}let ix=0;class sx{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new rx(e),t.set(e,n)),n}}class rx{constructor(e){this.id=ix++,this.code=e,this.usedTimes=0}}function ox(i,e,t,n,s,r,o){const a=new pd,l=new sx,c=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(v){return c.add(v),v===0?"uv":`uv${v}`}function m(v,x,A,D,U){const L=D.fog,k=U.geometry,F=v.isMeshStandardMaterial?D.environment:null,q=(v.isMeshStandardMaterial?t:e).get(v.envMap||F),V=q&&q.mapping===Qo?q.image.height:null,K=g[v.type];v.precision!==null&&(f=s.getMaxPrecision(v.precision),f!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",f,"instead."));const ee=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,ce=ee!==void 0?ee.length:0;let Te=0;k.morphAttributes.position!==void 0&&(Te=1),k.morphAttributes.normal!==void 0&&(Te=2),k.morphAttributes.color!==void 0&&(Te=3);let $e,Je,Ve,X;if(K){const it=Bn[K];$e=it.vertexShader,Je=it.fragmentShader}else $e=v.vertexShader,Je=v.fragmentShader,l.update(v),Ve=l.getVertexShaderID(v),X=l.getFragmentShaderID(v);const Z=i.getRenderTarget(),me=i.state.buffers.depth.getReversed(),Ue=U.isInstancedMesh===!0,be=U.isBatchedMesh===!0,Qe=!!v.map,Ht=!!v.matcap,N=!!q,_t=!!v.aoMap,Be=!!v.lightMap,Le=!!v.bumpMap,ve=!!v.normalMap,vt=!!v.displacementMap,xe=!!v.emissiveMap,We=!!v.metalnessMap,Ut=!!v.roughnessMap,Et=v.anisotropy>0,I=v.clearcoat>0,w=v.dispersion>0,H=v.iridescence>0,Y=v.sheen>0,J=v.transmission>0,j=Et&&!!v.anisotropyMap,we=I&&!!v.clearcoatMap,re=I&&!!v.clearcoatNormalMap,ye=I&&!!v.clearcoatRoughnessMap,Me=H&&!!v.iridescenceMap,ie=H&&!!v.iridescenceThicknessMap,ue=Y&&!!v.sheenColorMap,Ie=Y&&!!v.sheenRoughnessMap,Se=!!v.specularMap,le=!!v.specularColorMap,He=!!v.specularIntensityMap,O=J&&!!v.transmissionMap,se=J&&!!v.thicknessMap,oe=!!v.gradientMap,pe=!!v.alphaMap,te=v.alphaTest>0,$=!!v.alphaHash,_e=!!v.extensions;let ke=Pi;v.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(ke=i.toneMapping);const ft={shaderID:K,shaderType:v.type,shaderName:v.name,vertexShader:$e,fragmentShader:Je,defines:v.defines,customVertexShaderID:Ve,customFragmentShaderID:X,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:f,batching:be,batchingColor:be&&U._colorsTexture!==null,instancing:Ue,instancingColor:Ue&&U.instanceColor!==null,instancingMorph:Ue&&U.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:Z===null?i.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:Kt,alphaToCoverage:!!v.alphaToCoverage,map:Qe,matcap:Ht,envMap:N,envMapMode:N&&q.mapping,envMapCubeUVHeight:V,aoMap:_t,lightMap:Be,bumpMap:Le,normalMap:ve,displacementMap:d&&vt,emissiveMap:xe,normalMapObjectSpace:ve&&v.normalMapType===Yf,normalMapTangentSpace:ve&&v.normalMapType===Rc,metalnessMap:We,roughnessMap:Ut,anisotropy:Et,anisotropyMap:j,clearcoat:I,clearcoatMap:we,clearcoatNormalMap:re,clearcoatRoughnessMap:ye,dispersion:w,iridescence:H,iridescenceMap:Me,iridescenceThicknessMap:ie,sheen:Y,sheenColorMap:ue,sheenRoughnessMap:Ie,specularMap:Se,specularColorMap:le,specularIntensityMap:He,transmission:J,transmissionMap:O,thicknessMap:se,gradientMap:oe,opaque:v.transparent===!1&&v.blending===Ds&&v.alphaToCoverage===!1,alphaMap:pe,alphaTest:te,alphaHash:$,combine:v.combine,mapUv:Qe&&_(v.map.channel),aoMapUv:_t&&_(v.aoMap.channel),lightMapUv:Be&&_(v.lightMap.channel),bumpMapUv:Le&&_(v.bumpMap.channel),normalMapUv:ve&&_(v.normalMap.channel),displacementMapUv:vt&&_(v.displacementMap.channel),emissiveMapUv:xe&&_(v.emissiveMap.channel),metalnessMapUv:We&&_(v.metalnessMap.channel),roughnessMapUv:Ut&&_(v.roughnessMap.channel),anisotropyMapUv:j&&_(v.anisotropyMap.channel),clearcoatMapUv:we&&_(v.clearcoatMap.channel),clearcoatNormalMapUv:re&&_(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ye&&_(v.clearcoatRoughnessMap.channel),iridescenceMapUv:Me&&_(v.iridescenceMap.channel),iridescenceThicknessMapUv:ie&&_(v.iridescenceThicknessMap.channel),sheenColorMapUv:ue&&_(v.sheenColorMap.channel),sheenRoughnessMapUv:Ie&&_(v.sheenRoughnessMap.channel),specularMapUv:Se&&_(v.specularMap.channel),specularColorMapUv:le&&_(v.specularColorMap.channel),specularIntensityMapUv:He&&_(v.specularIntensityMap.channel),transmissionMapUv:O&&_(v.transmissionMap.channel),thicknessMapUv:se&&_(v.thicknessMap.channel),alphaMapUv:pe&&_(v.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(ve||Et),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!k.attributes.uv&&(Qe||pe),fog:!!L,useFog:v.fog===!0,fogExp2:!!L&&L.isFogExp2,flatShading:v.flatShading===!0&&v.wireframe===!1,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:me,skinning:U.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:ce,morphTextureStride:Te,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&A.length>0,shadowMapType:i.shadowMap.type,toneMapping:ke,decodeVideoTexture:Qe&&v.map.isVideoTexture===!0&&et.getTransfer(v.map.colorSpace)===at,decodeVideoTextureEmissive:xe&&v.emissiveMap.isVideoTexture===!0&&et.getTransfer(v.emissiveMap.colorSpace)===at,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===un,flipSided:v.side===Yt,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:_e&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(_e&&v.extensions.multiDraw===!0||be)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return ft.vertexUv1s=c.has(1),ft.vertexUv2s=c.has(2),ft.vertexUv3s=c.has(3),c.clear(),ft}function p(v){const x=[];if(v.shaderID?x.push(v.shaderID):(x.push(v.customVertexShaderID),x.push(v.customFragmentShaderID)),v.defines!==void 0)for(const A in v.defines)x.push(A),x.push(v.defines[A]);return v.isRawShaderMaterial===!1&&(M(x,v),y(x,v),x.push(i.outputColorSpace)),x.push(v.customProgramCacheKey),x.join()}function M(v,x){v.push(x.precision),v.push(x.outputColorSpace),v.push(x.envMapMode),v.push(x.envMapCubeUVHeight),v.push(x.mapUv),v.push(x.alphaMapUv),v.push(x.lightMapUv),v.push(x.aoMapUv),v.push(x.bumpMapUv),v.push(x.normalMapUv),v.push(x.displacementMapUv),v.push(x.emissiveMapUv),v.push(x.metalnessMapUv),v.push(x.roughnessMapUv),v.push(x.anisotropyMapUv),v.push(x.clearcoatMapUv),v.push(x.clearcoatNormalMapUv),v.push(x.clearcoatRoughnessMapUv),v.push(x.iridescenceMapUv),v.push(x.iridescenceThicknessMapUv),v.push(x.sheenColorMapUv),v.push(x.sheenRoughnessMapUv),v.push(x.specularMapUv),v.push(x.specularColorMapUv),v.push(x.specularIntensityMapUv),v.push(x.transmissionMapUv),v.push(x.thicknessMapUv),v.push(x.combine),v.push(x.fogExp2),v.push(x.sizeAttenuation),v.push(x.morphTargetsCount),v.push(x.morphAttributeCount),v.push(x.numDirLights),v.push(x.numPointLights),v.push(x.numSpotLights),v.push(x.numSpotLightMaps),v.push(x.numHemiLights),v.push(x.numRectAreaLights),v.push(x.numDirLightShadows),v.push(x.numPointLightShadows),v.push(x.numSpotLightShadows),v.push(x.numSpotLightShadowsWithMaps),v.push(x.numLightProbes),v.push(x.shadowMapType),v.push(x.toneMapping),v.push(x.numClippingPlanes),v.push(x.numClipIntersection),v.push(x.depthPacking)}function y(v,x){a.disableAll(),x.supportsVertexTextures&&a.enable(0),x.instancing&&a.enable(1),x.instancingColor&&a.enable(2),x.instancingMorph&&a.enable(3),x.matcap&&a.enable(4),x.envMap&&a.enable(5),x.normalMapObjectSpace&&a.enable(6),x.normalMapTangentSpace&&a.enable(7),x.clearcoat&&a.enable(8),x.iridescence&&a.enable(9),x.alphaTest&&a.enable(10),x.vertexColors&&a.enable(11),x.vertexAlphas&&a.enable(12),x.vertexUv1s&&a.enable(13),x.vertexUv2s&&a.enable(14),x.vertexUv3s&&a.enable(15),x.vertexTangents&&a.enable(16),x.anisotropy&&a.enable(17),x.alphaHash&&a.enable(18),x.batching&&a.enable(19),x.dispersion&&a.enable(20),x.batchingColor&&a.enable(21),x.gradientMap&&a.enable(22),v.push(a.mask),a.disableAll(),x.fog&&a.enable(0),x.useFog&&a.enable(1),x.flatShading&&a.enable(2),x.logarithmicDepthBuffer&&a.enable(3),x.reversedDepthBuffer&&a.enable(4),x.skinning&&a.enable(5),x.morphTargets&&a.enable(6),x.morphNormals&&a.enable(7),x.morphColors&&a.enable(8),x.premultipliedAlpha&&a.enable(9),x.shadowMapEnabled&&a.enable(10),x.doubleSided&&a.enable(11),x.flipSided&&a.enable(12),x.useDepthPacking&&a.enable(13),x.dithering&&a.enable(14),x.transmission&&a.enable(15),x.sheen&&a.enable(16),x.opaque&&a.enable(17),x.pointsUvs&&a.enable(18),x.decodeVideoTexture&&a.enable(19),x.decodeVideoTextureEmissive&&a.enable(20),x.alphaToCoverage&&a.enable(21),v.push(a.mask)}function S(v){const x=g[v.type];let A;if(x){const D=Bn[x];A=Zl.clone(D.uniforms)}else A=v.uniforms;return A}function P(v,x){let A;for(let D=0,U=h.length;D<U;D++){const L=h[D];if(L.cacheKey===x){A=L,++A.usedTimes;break}}return A===void 0&&(A=new nx(i,x,v,r),h.push(A)),A}function E(v){if(--v.usedTimes===0){const x=h.indexOf(v);h[x]=h[h.length-1],h.pop(),v.destroy()}}function C(v){l.remove(v)}function R(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:S,acquireProgram:P,releaseProgram:E,releaseShaderCache:C,programs:h,dispose:R}}function ax(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function lx(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function xu(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function yu(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(u,d,f,g,_,m){let p=i[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},i[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),e++,p}function a(u,d,f,g,_,m){const p=o(u,d,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):t.push(p)}function l(u,d,f,g,_,m){const p=o(u,d,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function c(u,d){t.length>1&&t.sort(u||lx),n.length>1&&n.sort(d||xu),s.length>1&&s.sort(d||xu)}function h(){for(let u=e,d=i.length;u<d;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function cx(){let i=new WeakMap;function e(n,s){const r=i.get(n);let o;return r===void 0?(o=new yu,i.set(n,[o])):s>=r.length?(o=new yu,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function hx(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new b,color:new De};break;case"SpotLight":t={position:new b,direction:new b,color:new De,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new b,color:new De,distance:0,decay:0};break;case"HemisphereLight":t={direction:new b,skyColor:new De,groundColor:new De};break;case"RectAreaLight":t={color:new De,position:new b,halfWidth:new b,halfHeight:new b};break}return i[e.id]=t,t}}}function ux(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let dx=0;function fx(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function px(i){const e=new hx,t=ux(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new b);const s=new b,r=new Fe,o=new Fe;function a(c){let h=0,u=0,d=0;for(let v=0;v<9;v++)n.probe[v].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,M=0,y=0,S=0,P=0,E=0,C=0;c.sort(fx);for(let v=0,x=c.length;v<x;v++){const A=c[v],D=A.color,U=A.intensity,L=A.distance,k=A.shadow&&A.shadow.map?A.shadow.map.texture:null;if(A.isAmbientLight)h+=D.r*U,u+=D.g*U,d+=D.b*U;else if(A.isLightProbe){for(let F=0;F<9;F++)n.probe[F].addScaledVector(A.sh.coefficients[F],U);C++}else if(A.isDirectionalLight){const F=e.get(A);if(F.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){const q=A.shadow,V=t.get(A);V.shadowIntensity=q.intensity,V.shadowBias=q.bias,V.shadowNormalBias=q.normalBias,V.shadowRadius=q.radius,V.shadowMapSize=q.mapSize,n.directionalShadow[f]=V,n.directionalShadowMap[f]=k,n.directionalShadowMatrix[f]=A.shadow.matrix,M++}n.directional[f]=F,f++}else if(A.isSpotLight){const F=e.get(A);F.position.setFromMatrixPosition(A.matrixWorld),F.color.copy(D).multiplyScalar(U),F.distance=L,F.coneCos=Math.cos(A.angle),F.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),F.decay=A.decay,n.spot[_]=F;const q=A.shadow;if(A.map&&(n.spotLightMap[P]=A.map,P++,q.updateMatrices(A),A.castShadow&&E++),n.spotLightMatrix[_]=q.matrix,A.castShadow){const V=t.get(A);V.shadowIntensity=q.intensity,V.shadowBias=q.bias,V.shadowNormalBias=q.normalBias,V.shadowRadius=q.radius,V.shadowMapSize=q.mapSize,n.spotShadow[_]=V,n.spotShadowMap[_]=k,S++}_++}else if(A.isRectAreaLight){const F=e.get(A);F.color.copy(D).multiplyScalar(U),F.halfWidth.set(A.width*.5,0,0),F.halfHeight.set(0,A.height*.5,0),n.rectArea[m]=F,m++}else if(A.isPointLight){const F=e.get(A);if(F.color.copy(A.color).multiplyScalar(A.intensity),F.distance=A.distance,F.decay=A.decay,A.castShadow){const q=A.shadow,V=t.get(A);V.shadowIntensity=q.intensity,V.shadowBias=q.bias,V.shadowNormalBias=q.normalBias,V.shadowRadius=q.radius,V.shadowMapSize=q.mapSize,V.shadowCameraNear=q.camera.near,V.shadowCameraFar=q.camera.far,n.pointShadow[g]=V,n.pointShadowMap[g]=k,n.pointShadowMatrix[g]=A.shadow.matrix,y++}n.point[g]=F,g++}else if(A.isHemisphereLight){const F=e.get(A);F.skyColor.copy(A.color).multiplyScalar(U),F.groundColor.copy(A.groundColor).multiplyScalar(U),n.hemi[p]=F,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ae.LTC_FLOAT_1,n.rectAreaLTC2=ae.LTC_FLOAT_2):(n.rectAreaLTC1=ae.LTC_HALF_1,n.rectAreaLTC2=ae.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const R=n.hash;(R.directionalLength!==f||R.pointLength!==g||R.spotLength!==_||R.rectAreaLength!==m||R.hemiLength!==p||R.numDirectionalShadows!==M||R.numPointShadows!==y||R.numSpotShadows!==S||R.numSpotMaps!==P||R.numLightProbes!==C)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=S,n.spotShadowMap.length=S,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=S+P-E,n.spotLightMap.length=P,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=C,R.directionalLength=f,R.pointLength=g,R.spotLength=_,R.rectAreaLength=m,R.hemiLength=p,R.numDirectionalShadows=M,R.numPointShadows=y,R.numSpotShadows=S,R.numSpotMaps=P,R.numLightProbes=C,n.version=dx++)}function l(c,h){let u=0,d=0,f=0,g=0,_=0;const m=h.matrixWorldInverse;for(let p=0,M=c.length;p<M;p++){const y=c[p];if(y.isDirectionalLight){const S=n.directional[u];S.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(m),u++}else if(y.isSpotLight){const S=n.spot[f];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(m),f++}else if(y.isRectAreaLight){const S=n.rectArea[g];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(m),o.identity(),r.copy(y.matrixWorld),r.premultiply(m),o.extractRotation(r),S.halfWidth.set(y.width*.5,0,0),S.halfHeight.set(0,y.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),g++}else if(y.isPointLight){const S=n.point[d];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(m),d++}else if(y.isHemisphereLight){const S=n.hemi[_];S.direction.setFromMatrixPosition(y.matrixWorld),S.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:n}}function Mu(i){const e=new px(i),t=[],n=[];function s(h){c.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function mx(i){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new Mu(i),e.set(s,[a])):r>=o.length?(a=new Mu(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const gx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,_x=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function vx(i,e,t){let n=new Lc;const s=new de,r=new de,o=new tt,a=new gm({depthPacking:qf}),l=new _m,c={},h=t.maxTextureSize,u={[ai]:Yt,[Yt]:ai,[un]:un},d=new li({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new de},radius:{value:4}},vertexShader:gx,fragmentShader:_x}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new Nt;g.setAttribute("position",new ct(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new qe(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ju;let p=this.type;this.render=function(E,C,R){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;const v=i.getRenderTarget(),x=i.getActiveCubeFace(),A=i.getActiveMipmapLevel(),D=i.state;D.setBlending(Ci),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const U=p!==Qn&&this.type===Qn,L=p===Qn&&this.type!==Qn;for(let k=0,F=E.length;k<F;k++){const q=E[k],V=q.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);const K=V.getFrameExtents();if(s.multiply(K),r.copy(V.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/K.x),s.x=r.x*K.x,V.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/K.y),s.y=r.y*K.y,V.mapSize.y=r.y)),V.map===null||U===!0||L===!0){const ce=this.type!==Qn?{minFilter:tn,magFilter:tn}:{};V.map!==null&&V.map.dispose(),V.map=new Ni(s.x,s.y,ce),V.map.texture.name=q.name+".shadowMap",V.camera.updateProjectionMatrix()}i.setRenderTarget(V.map),i.clear();const ee=V.getViewportCount();for(let ce=0;ce<ee;ce++){const Te=V.getViewport(ce);o.set(r.x*Te.x,r.y*Te.y,r.x*Te.z,r.y*Te.w),D.viewport(o),V.updateMatrices(q,ce),n=V.getFrustum(),S(C,R,V.camera,q,this.type)}V.isPointLightShadow!==!0&&this.type===Qn&&M(V,R),V.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(v,x,A)};function M(E,C){const R=e.update(_);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Ni(s.x,s.y)),d.uniforms.shadow_pass.value=E.map.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(C,null,R,d,_,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(C,null,R,f,_,null)}function y(E,C,R,v){let x=null;const A=R.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(A!==void 0)x=A;else if(x=R.isPointLight===!0?l:a,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const D=x.uuid,U=C.uuid;let L=c[D];L===void 0&&(L={},c[D]=L);let k=L[U];k===void 0&&(k=x.clone(),L[U]=k,C.addEventListener("dispose",P)),x=k}if(x.visible=C.visible,x.wireframe=C.wireframe,v===Qn?x.side=C.shadowSide!==null?C.shadowSide:C.side:x.side=C.shadowSide!==null?C.shadowSide:u[C.side],x.alphaMap=C.alphaMap,x.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,x.map=C.map,x.clipShadows=C.clipShadows,x.clippingPlanes=C.clippingPlanes,x.clipIntersection=C.clipIntersection,x.displacementMap=C.displacementMap,x.displacementScale=C.displacementScale,x.displacementBias=C.displacementBias,x.wireframeLinewidth=C.wireframeLinewidth,x.linewidth=C.linewidth,R.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const D=i.properties.get(x);D.light=R}return x}function S(E,C,R,v,x){if(E.visible===!1)return;if(E.layers.test(C.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&x===Qn)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,E.matrixWorld);const U=e.update(E),L=E.material;if(Array.isArray(L)){const k=U.groups;for(let F=0,q=k.length;F<q;F++){const V=k[F],K=L[V.materialIndex];if(K&&K.visible){const ee=y(E,K,v,x);E.onBeforeShadow(i,E,C,R,U,ee,V),i.renderBufferDirect(R,null,U,ee,E,V),E.onAfterShadow(i,E,C,R,U,ee,V)}}}else if(L.visible){const k=y(E,L,v,x);E.onBeforeShadow(i,E,C,R,U,k,null),i.renderBufferDirect(R,null,U,k,E,null),E.onAfterShadow(i,E,C,R,U,k,null)}}const D=E.children;for(let U=0,L=D.length;U<L;U++)S(D[U],C,R,v,x)}function P(E){E.target.removeEventListener("dispose",P);for(const R in c){const v=c[R],x=E.target.uuid;x in v&&(v[x].dispose(),delete v[x])}}}const xx={[dl]:fl,[pl]:_l,[ml]:vl,[Bs]:gl,[fl]:dl,[_l]:pl,[vl]:ml,[gl]:Bs};function yx(i,e){function t(){let O=!1;const se=new tt;let oe=null;const pe=new tt(0,0,0,0);return{setMask:function(te){oe!==te&&!O&&(i.colorMask(te,te,te,te),oe=te)},setLocked:function(te){O=te},setClear:function(te,$,_e,ke,ft){ft===!0&&(te*=ke,$*=ke,_e*=ke),se.set(te,$,_e,ke),pe.equals(se)===!1&&(i.clearColor(te,$,_e,ke),pe.copy(se))},reset:function(){O=!1,oe=null,pe.set(-1,0,0,0)}}}function n(){let O=!1,se=!1,oe=null,pe=null,te=null;return{setReversed:function($){if(se!==$){const _e=e.get("EXT_clip_control");$?_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.ZERO_TO_ONE_EXT):_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.NEGATIVE_ONE_TO_ONE_EXT),se=$;const ke=te;te=null,this.setClear(ke)}},getReversed:function(){return se},setTest:function($){$?Z(i.DEPTH_TEST):me(i.DEPTH_TEST)},setMask:function($){oe!==$&&!O&&(i.depthMask($),oe=$)},setFunc:function($){if(se&&($=xx[$]),pe!==$){switch($){case dl:i.depthFunc(i.NEVER);break;case fl:i.depthFunc(i.ALWAYS);break;case pl:i.depthFunc(i.LESS);break;case Bs:i.depthFunc(i.LEQUAL);break;case ml:i.depthFunc(i.EQUAL);break;case gl:i.depthFunc(i.GEQUAL);break;case _l:i.depthFunc(i.GREATER);break;case vl:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}pe=$}},setLocked:function($){O=$},setClear:function($){te!==$&&(se&&($=1-$),i.clearDepth($),te=$)},reset:function(){O=!1,oe=null,pe=null,te=null,se=!1}}}function s(){let O=!1,se=null,oe=null,pe=null,te=null,$=null,_e=null,ke=null,ft=null;return{setTest:function(it){O||(it?Z(i.STENCIL_TEST):me(i.STENCIL_TEST))},setMask:function(it){se!==it&&!O&&(i.stencilMask(it),se=it)},setFunc:function(it,Xn,Fn){(oe!==it||pe!==Xn||te!==Fn)&&(i.stencilFunc(it,Xn,Fn),oe=it,pe=Xn,te=Fn)},setOp:function(it,Xn,Fn){($!==it||_e!==Xn||ke!==Fn)&&(i.stencilOp(it,Xn,Fn),$=it,_e=Xn,ke=Fn)},setLocked:function(it){O=it},setClear:function(it){ft!==it&&(i.clearStencil(it),ft=it)},reset:function(){O=!1,se=null,oe=null,pe=null,te=null,$=null,_e=null,ke=null,ft=null}}}const r=new t,o=new n,a=new s,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,f=[],g=null,_=!1,m=null,p=null,M=null,y=null,S=null,P=null,E=null,C=new De(0,0,0),R=0,v=!1,x=null,A=null,D=null,U=null,L=null;const k=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let F=!1,q=0;const V=i.getParameter(i.VERSION);V.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(V)[1]),F=q>=1):V.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),F=q>=2);let K=null,ee={};const ce=i.getParameter(i.SCISSOR_BOX),Te=i.getParameter(i.VIEWPORT),$e=new tt().fromArray(ce),Je=new tt().fromArray(Te);function Ve(O,se,oe,pe){const te=new Uint8Array(4),$=i.createTexture();i.bindTexture(O,$),i.texParameteri(O,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(O,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let _e=0;_e<oe;_e++)O===i.TEXTURE_3D||O===i.TEXTURE_2D_ARRAY?i.texImage3D(se,0,i.RGBA,1,1,pe,0,i.RGBA,i.UNSIGNED_BYTE,te):i.texImage2D(se+_e,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,te);return $}const X={};X[i.TEXTURE_2D]=Ve(i.TEXTURE_2D,i.TEXTURE_2D,1),X[i.TEXTURE_CUBE_MAP]=Ve(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),X[i.TEXTURE_2D_ARRAY]=Ve(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),X[i.TEXTURE_3D]=Ve(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),Z(i.DEPTH_TEST),o.setFunc(Bs),Le(!1),ve(th),Z(i.CULL_FACE),_t(Ci);function Z(O){h[O]!==!0&&(i.enable(O),h[O]=!0)}function me(O){h[O]!==!1&&(i.disable(O),h[O]=!1)}function Ue(O,se){return u[O]!==se?(i.bindFramebuffer(O,se),u[O]=se,O===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=se),O===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=se),!0):!1}function be(O,se){let oe=f,pe=!1;if(O){oe=d.get(se),oe===void 0&&(oe=[],d.set(se,oe));const te=O.textures;if(oe.length!==te.length||oe[0]!==i.COLOR_ATTACHMENT0){for(let $=0,_e=te.length;$<_e;$++)oe[$]=i.COLOR_ATTACHMENT0+$;oe.length=te.length,pe=!0}}else oe[0]!==i.BACK&&(oe[0]=i.BACK,pe=!0);pe&&i.drawBuffers(oe)}function Qe(O){return g!==O?(i.useProgram(O),g=O,!0):!1}const Ht={[$i]:i.FUNC_ADD,[vf]:i.FUNC_SUBTRACT,[xf]:i.FUNC_REVERSE_SUBTRACT};Ht[yf]=i.MIN,Ht[Mf]=i.MAX;const N={[Sf]:i.ZERO,[wf]:i.ONE,[bf]:i.SRC_COLOR,[hl]:i.SRC_ALPHA,[Pf]:i.SRC_ALPHA_SATURATE,[Rf]:i.DST_COLOR,[Ef]:i.DST_ALPHA,[Tf]:i.ONE_MINUS_SRC_COLOR,[ul]:i.ONE_MINUS_SRC_ALPHA,[Cf]:i.ONE_MINUS_DST_COLOR,[Af]:i.ONE_MINUS_DST_ALPHA,[Df]:i.CONSTANT_COLOR,[If]:i.ONE_MINUS_CONSTANT_COLOR,[Lf]:i.CONSTANT_ALPHA,[Nf]:i.ONE_MINUS_CONSTANT_ALPHA};function _t(O,se,oe,pe,te,$,_e,ke,ft,it){if(O===Ci){_===!0&&(me(i.BLEND),_=!1);return}if(_===!1&&(Z(i.BLEND),_=!0),O!==_f){if(O!==m||it!==v){if((p!==$i||S!==$i)&&(i.blendEquation(i.FUNC_ADD),p=$i,S=$i),it)switch(O){case Ds:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case nh:i.blendFunc(i.ONE,i.ONE);break;case ih:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case sh:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case Ds:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case nh:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case ih:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case sh:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}M=null,y=null,P=null,E=null,C.set(0,0,0),R=0,m=O,v=it}return}te=te||se,$=$||oe,_e=_e||pe,(se!==p||te!==S)&&(i.blendEquationSeparate(Ht[se],Ht[te]),p=se,S=te),(oe!==M||pe!==y||$!==P||_e!==E)&&(i.blendFuncSeparate(N[oe],N[pe],N[$],N[_e]),M=oe,y=pe,P=$,E=_e),(ke.equals(C)===!1||ft!==R)&&(i.blendColor(ke.r,ke.g,ke.b,ft),C.copy(ke),R=ft),m=O,v=!1}function Be(O,se){O.side===un?me(i.CULL_FACE):Z(i.CULL_FACE);let oe=O.side===Yt;se&&(oe=!oe),Le(oe),O.blending===Ds&&O.transparent===!1?_t(Ci):_t(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),o.setFunc(O.depthFunc),o.setTest(O.depthTest),o.setMask(O.depthWrite),r.setMask(O.colorWrite);const pe=O.stencilWrite;a.setTest(pe),pe&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),xe(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?Z(i.SAMPLE_ALPHA_TO_COVERAGE):me(i.SAMPLE_ALPHA_TO_COVERAGE)}function Le(O){x!==O&&(O?i.frontFace(i.CW):i.frontFace(i.CCW),x=O)}function ve(O){O!==mf?(Z(i.CULL_FACE),O!==A&&(O===th?i.cullFace(i.BACK):O===gf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):me(i.CULL_FACE),A=O}function vt(O){O!==D&&(F&&i.lineWidth(O),D=O)}function xe(O,se,oe){O?(Z(i.POLYGON_OFFSET_FILL),(U!==se||L!==oe)&&(i.polygonOffset(se,oe),U=se,L=oe)):me(i.POLYGON_OFFSET_FILL)}function We(O){O?Z(i.SCISSOR_TEST):me(i.SCISSOR_TEST)}function Ut(O){O===void 0&&(O=i.TEXTURE0+k-1),K!==O&&(i.activeTexture(O),K=O)}function Et(O,se,oe){oe===void 0&&(K===null?oe=i.TEXTURE0+k-1:oe=K);let pe=ee[oe];pe===void 0&&(pe={type:void 0,texture:void 0},ee[oe]=pe),(pe.type!==O||pe.texture!==se)&&(K!==oe&&(i.activeTexture(oe),K=oe),i.bindTexture(O,se||X[O]),pe.type=O,pe.texture=se)}function I(){const O=ee[K];O!==void 0&&O.type!==void 0&&(i.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function w(){try{i.compressedTexImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function H(){try{i.compressedTexImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Y(){try{i.texSubImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function J(){try{i.texSubImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function j(){try{i.compressedTexSubImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function we(){try{i.compressedTexSubImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function re(){try{i.texStorage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ye(){try{i.texStorage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Me(){try{i.texImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ie(){try{i.texImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ue(O){$e.equals(O)===!1&&(i.scissor(O.x,O.y,O.z,O.w),$e.copy(O))}function Ie(O){Je.equals(O)===!1&&(i.viewport(O.x,O.y,O.z,O.w),Je.copy(O))}function Se(O,se){let oe=c.get(se);oe===void 0&&(oe=new WeakMap,c.set(se,oe));let pe=oe.get(O);pe===void 0&&(pe=i.getUniformBlockIndex(se,O.name),oe.set(O,pe))}function le(O,se){const pe=c.get(se).get(O);l.get(se)!==pe&&(i.uniformBlockBinding(se,pe,O.__bindingPointIndex),l.set(se,pe))}function He(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},K=null,ee={},u={},d=new WeakMap,f=[],g=null,_=!1,m=null,p=null,M=null,y=null,S=null,P=null,E=null,C=new De(0,0,0),R=0,v=!1,x=null,A=null,D=null,U=null,L=null,$e.set(0,0,i.canvas.width,i.canvas.height),Je.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:Z,disable:me,bindFramebuffer:Ue,drawBuffers:be,useProgram:Qe,setBlending:_t,setMaterial:Be,setFlipSided:Le,setCullFace:ve,setLineWidth:vt,setPolygonOffset:xe,setScissorTest:We,activeTexture:Ut,bindTexture:Et,unbindTexture:I,compressedTexImage2D:w,compressedTexImage3D:H,texImage2D:Me,texImage3D:ie,updateUBOMapping:Se,uniformBlockBinding:le,texStorage2D:re,texStorage3D:ye,texSubImage2D:Y,texSubImage3D:J,compressedTexSubImage2D:j,compressedTexSubImage3D:we,scissor:ue,viewport:Ie,reset:He}}function Mx(i,e,t,n,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new de,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(I,w){return f?new OffscreenCanvas(I,w):Br("canvas")}function _(I,w,H){let Y=1;const J=Et(I);if((J.width>H||J.height>H)&&(Y=H/Math.max(J.width,J.height)),Y<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const j=Math.floor(Y*J.width),we=Math.floor(Y*J.height);u===void 0&&(u=g(j,we));const re=w?g(j,we):u;return re.width=j,re.height=we,re.getContext("2d").drawImage(I,0,0,j,we),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+j+"x"+we+")."),re}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),I;return I}function m(I){return I.generateMipmaps}function p(I){i.generateMipmap(I)}function M(I){return I.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?i.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(I,w,H,Y,J=!1){if(I!==null){if(i[I]!==void 0)return i[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let j=w;if(w===i.RED&&(H===i.FLOAT&&(j=i.R32F),H===i.HALF_FLOAT&&(j=i.R16F),H===i.UNSIGNED_BYTE&&(j=i.R8)),w===i.RED_INTEGER&&(H===i.UNSIGNED_BYTE&&(j=i.R8UI),H===i.UNSIGNED_SHORT&&(j=i.R16UI),H===i.UNSIGNED_INT&&(j=i.R32UI),H===i.BYTE&&(j=i.R8I),H===i.SHORT&&(j=i.R16I),H===i.INT&&(j=i.R32I)),w===i.RG&&(H===i.FLOAT&&(j=i.RG32F),H===i.HALF_FLOAT&&(j=i.RG16F),H===i.UNSIGNED_BYTE&&(j=i.RG8)),w===i.RG_INTEGER&&(H===i.UNSIGNED_BYTE&&(j=i.RG8UI),H===i.UNSIGNED_SHORT&&(j=i.RG16UI),H===i.UNSIGNED_INT&&(j=i.RG32UI),H===i.BYTE&&(j=i.RG8I),H===i.SHORT&&(j=i.RG16I),H===i.INT&&(j=i.RG32I)),w===i.RGB_INTEGER&&(H===i.UNSIGNED_BYTE&&(j=i.RGB8UI),H===i.UNSIGNED_SHORT&&(j=i.RGB16UI),H===i.UNSIGNED_INT&&(j=i.RGB32UI),H===i.BYTE&&(j=i.RGB8I),H===i.SHORT&&(j=i.RGB16I),H===i.INT&&(j=i.RGB32I)),w===i.RGBA_INTEGER&&(H===i.UNSIGNED_BYTE&&(j=i.RGBA8UI),H===i.UNSIGNED_SHORT&&(j=i.RGBA16UI),H===i.UNSIGNED_INT&&(j=i.RGBA32UI),H===i.BYTE&&(j=i.RGBA8I),H===i.SHORT&&(j=i.RGBA16I),H===i.INT&&(j=i.RGBA32I)),w===i.RGB&&(H===i.UNSIGNED_INT_5_9_9_9_REV&&(j=i.RGB9_E5),H===i.UNSIGNED_INT_10F_11F_11F_REV&&(j=i.R11F_G11F_B10F)),w===i.RGBA){const we=J?Go:et.getTransfer(Y);H===i.FLOAT&&(j=i.RGBA32F),H===i.HALF_FLOAT&&(j=i.RGBA16F),H===i.UNSIGNED_BYTE&&(j=we===at?i.SRGB8_ALPHA8:i.RGBA8),H===i.UNSIGNED_SHORT_4_4_4_4&&(j=i.RGBA4),H===i.UNSIGNED_SHORT_5_5_5_1&&(j=i.RGB5_A1)}return(j===i.R16F||j===i.R32F||j===i.RG16F||j===i.RG32F||j===i.RGBA16F||j===i.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function S(I,w){let H;return I?w===null||w===ns||w===Nr?H=i.DEPTH24_STENCIL8:w===Dn?H=i.DEPTH32F_STENCIL8:w===Lr&&(H=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===ns||w===Nr?H=i.DEPTH_COMPONENT24:w===Dn?H=i.DEPTH_COMPONENT32F:w===Lr&&(H=i.DEPTH_COMPONENT16),H}function P(I,w){return m(I)===!0||I.isFramebufferTexture&&I.minFilter!==tn&&I.minFilter!==en?Math.log2(Math.max(w.width,w.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?w.mipmaps.length:1}function E(I){const w=I.target;w.removeEventListener("dispose",E),R(w),w.isVideoTexture&&h.delete(w)}function C(I){const w=I.target;w.removeEventListener("dispose",C),x(w)}function R(I){const w=n.get(I);if(w.__webglInit===void 0)return;const H=I.source,Y=d.get(H);if(Y){const J=Y[w.__cacheKey];J.usedTimes--,J.usedTimes===0&&v(I),Object.keys(Y).length===0&&d.delete(H)}n.remove(I)}function v(I){const w=n.get(I);i.deleteTexture(w.__webglTexture);const H=I.source,Y=d.get(H);delete Y[w.__cacheKey],o.memory.textures--}function x(I){const w=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(w.__webglFramebuffer[Y]))for(let J=0;J<w.__webglFramebuffer[Y].length;J++)i.deleteFramebuffer(w.__webglFramebuffer[Y][J]);else i.deleteFramebuffer(w.__webglFramebuffer[Y]);w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer[Y])}else{if(Array.isArray(w.__webglFramebuffer))for(let Y=0;Y<w.__webglFramebuffer.length;Y++)i.deleteFramebuffer(w.__webglFramebuffer[Y]);else i.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&i.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let Y=0;Y<w.__webglColorRenderbuffer.length;Y++)w.__webglColorRenderbuffer[Y]&&i.deleteRenderbuffer(w.__webglColorRenderbuffer[Y]);w.__webglDepthRenderbuffer&&i.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const H=I.textures;for(let Y=0,J=H.length;Y<J;Y++){const j=n.get(H[Y]);j.__webglTexture&&(i.deleteTexture(j.__webglTexture),o.memory.textures--),n.remove(H[Y])}n.remove(I)}let A=0;function D(){A=0}function U(){const I=A;return I>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+s.maxTextures),A+=1,I}function L(I){const w=[];return w.push(I.wrapS),w.push(I.wrapT),w.push(I.wrapR||0),w.push(I.magFilter),w.push(I.minFilter),w.push(I.anisotropy),w.push(I.internalFormat),w.push(I.format),w.push(I.type),w.push(I.generateMipmaps),w.push(I.premultiplyAlpha),w.push(I.flipY),w.push(I.unpackAlignment),w.push(I.colorSpace),w.join()}function k(I,w){const H=n.get(I);if(I.isVideoTexture&&We(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&H.__version!==I.version){const Y=I.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(H,I,w);return}}else I.isExternalTexture&&(H.__webglTexture=I.sourceTexture?I.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,H.__webglTexture,i.TEXTURE0+w)}function F(I,w){const H=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&H.__version!==I.version){X(H,I,w);return}t.bindTexture(i.TEXTURE_2D_ARRAY,H.__webglTexture,i.TEXTURE0+w)}function q(I,w){const H=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&H.__version!==I.version){X(H,I,w);return}t.bindTexture(i.TEXTURE_3D,H.__webglTexture,i.TEXTURE0+w)}function V(I,w){const H=n.get(I);if(I.version>0&&H.__version!==I.version){Z(H,I,w);return}t.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture,i.TEXTURE0+w)}const K={[ts]:i.REPEAT,[Ai]:i.CLAMP_TO_EDGE,[Ho]:i.MIRRORED_REPEAT},ee={[tn]:i.NEAREST,[nd]:i.NEAREST_MIPMAP_NEAREST,[pr]:i.NEAREST_MIPMAP_LINEAR,[en]:i.LINEAR,[Po]:i.LINEAR_MIPMAP_NEAREST,[ii]:i.LINEAR_MIPMAP_LINEAR},ce={[Kf]:i.NEVER,[tp]:i.ALWAYS,[$f]:i.LESS,[ud]:i.LEQUAL,[Zf]:i.EQUAL,[ep]:i.GEQUAL,[Jf]:i.GREATER,[Qf]:i.NOTEQUAL};function Te(I,w){if(w.type===Dn&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===en||w.magFilter===Po||w.magFilter===pr||w.magFilter===ii||w.minFilter===en||w.minFilter===Po||w.minFilter===pr||w.minFilter===ii)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(I,i.TEXTURE_WRAP_S,K[w.wrapS]),i.texParameteri(I,i.TEXTURE_WRAP_T,K[w.wrapT]),(I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY)&&i.texParameteri(I,i.TEXTURE_WRAP_R,K[w.wrapR]),i.texParameteri(I,i.TEXTURE_MAG_FILTER,ee[w.magFilter]),i.texParameteri(I,i.TEXTURE_MIN_FILTER,ee[w.minFilter]),w.compareFunction&&(i.texParameteri(I,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(I,i.TEXTURE_COMPARE_FUNC,ce[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===tn||w.minFilter!==pr&&w.minFilter!==ii||w.type===Dn&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){const H=e.get("EXT_texture_filter_anisotropic");i.texParameterf(I,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,s.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function $e(I,w){let H=!1;I.__webglInit===void 0&&(I.__webglInit=!0,w.addEventListener("dispose",E));const Y=w.source;let J=d.get(Y);J===void 0&&(J={},d.set(Y,J));const j=L(w);if(j!==I.__cacheKey){J[j]===void 0&&(J[j]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,H=!0),J[j].usedTimes++;const we=J[I.__cacheKey];we!==void 0&&(J[I.__cacheKey].usedTimes--,we.usedTimes===0&&v(w)),I.__cacheKey=j,I.__webglTexture=J[j].texture}return H}function Je(I,w,H){return Math.floor(Math.floor(I/H)/w)}function Ve(I,w,H,Y){const j=I.updateRanges;if(j.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,w.width,w.height,H,Y,w.data);else{j.sort((ie,ue)=>ie.start-ue.start);let we=0;for(let ie=1;ie<j.length;ie++){const ue=j[we],Ie=j[ie],Se=ue.start+ue.count,le=Je(Ie.start,w.width,4),He=Je(ue.start,w.width,4);Ie.start<=Se+1&&le===He&&Je(Ie.start+Ie.count-1,w.width,4)===le?ue.count=Math.max(ue.count,Ie.start+Ie.count-ue.start):(++we,j[we]=Ie)}j.length=we+1;const re=i.getParameter(i.UNPACK_ROW_LENGTH),ye=i.getParameter(i.UNPACK_SKIP_PIXELS),Me=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,w.width);for(let ie=0,ue=j.length;ie<ue;ie++){const Ie=j[ie],Se=Math.floor(Ie.start/4),le=Math.ceil(Ie.count/4),He=Se%w.width,O=Math.floor(Se/w.width),se=le,oe=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,He),i.pixelStorei(i.UNPACK_SKIP_ROWS,O),t.texSubImage2D(i.TEXTURE_2D,0,He,O,se,oe,H,Y,w.data)}I.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,re),i.pixelStorei(i.UNPACK_SKIP_PIXELS,ye),i.pixelStorei(i.UNPACK_SKIP_ROWS,Me)}}function X(I,w,H){let Y=i.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(Y=i.TEXTURE_2D_ARRAY),w.isData3DTexture&&(Y=i.TEXTURE_3D);const J=$e(I,w),j=w.source;t.bindTexture(Y,I.__webglTexture,i.TEXTURE0+H);const we=n.get(j);if(j.version!==we.__version||J===!0){t.activeTexture(i.TEXTURE0+H);const re=et.getPrimaries(et.workingColorSpace),ye=w.colorSpace===Ti?null:et.getPrimaries(w.colorSpace),Me=w.colorSpace===Ti||re===ye?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me);let ie=_(w.image,!1,s.maxTextureSize);ie=Ut(w,ie);const ue=r.convert(w.format,w.colorSpace),Ie=r.convert(w.type);let Se=y(w.internalFormat,ue,Ie,w.colorSpace,w.isVideoTexture);Te(Y,w);let le;const He=w.mipmaps,O=w.isVideoTexture!==!0,se=we.__version===void 0||J===!0,oe=j.dataReady,pe=P(w,ie);if(w.isDepthTexture)Se=S(w.format===Fr,w.type),se&&(O?t.texStorage2D(i.TEXTURE_2D,1,Se,ie.width,ie.height):t.texImage2D(i.TEXTURE_2D,0,Se,ie.width,ie.height,0,ue,Ie,null));else if(w.isDataTexture)if(He.length>0){O&&se&&t.texStorage2D(i.TEXTURE_2D,pe,Se,He[0].width,He[0].height);for(let te=0,$=He.length;te<$;te++)le=He[te],O?oe&&t.texSubImage2D(i.TEXTURE_2D,te,0,0,le.width,le.height,ue,Ie,le.data):t.texImage2D(i.TEXTURE_2D,te,Se,le.width,le.height,0,ue,Ie,le.data);w.generateMipmaps=!1}else O?(se&&t.texStorage2D(i.TEXTURE_2D,pe,Se,ie.width,ie.height),oe&&Ve(w,ie,ue,Ie)):t.texImage2D(i.TEXTURE_2D,0,Se,ie.width,ie.height,0,ue,Ie,ie.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){O&&se&&t.texStorage3D(i.TEXTURE_2D_ARRAY,pe,Se,He[0].width,He[0].height,ie.depth);for(let te=0,$=He.length;te<$;te++)if(le=He[te],w.format!==wn)if(ue!==null)if(O){if(oe)if(w.layerUpdates.size>0){const _e=Jh(le.width,le.height,w.format,w.type);for(const ke of w.layerUpdates){const ft=le.data.subarray(ke*_e/le.data.BYTES_PER_ELEMENT,(ke+1)*_e/le.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,ke,le.width,le.height,1,ue,ft)}w.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,0,le.width,le.height,ie.depth,ue,le.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,te,Se,le.width,le.height,ie.depth,0,le.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else O?oe&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,0,le.width,le.height,ie.depth,ue,Ie,le.data):t.texImage3D(i.TEXTURE_2D_ARRAY,te,Se,le.width,le.height,ie.depth,0,ue,Ie,le.data)}else{O&&se&&t.texStorage2D(i.TEXTURE_2D,pe,Se,He[0].width,He[0].height);for(let te=0,$=He.length;te<$;te++)le=He[te],w.format!==wn?ue!==null?O?oe&&t.compressedTexSubImage2D(i.TEXTURE_2D,te,0,0,le.width,le.height,ue,le.data):t.compressedTexImage2D(i.TEXTURE_2D,te,Se,le.width,le.height,0,le.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):O?oe&&t.texSubImage2D(i.TEXTURE_2D,te,0,0,le.width,le.height,ue,Ie,le.data):t.texImage2D(i.TEXTURE_2D,te,Se,le.width,le.height,0,ue,Ie,le.data)}else if(w.isDataArrayTexture)if(O){if(se&&t.texStorage3D(i.TEXTURE_2D_ARRAY,pe,Se,ie.width,ie.height,ie.depth),oe)if(w.layerUpdates.size>0){const te=Jh(ie.width,ie.height,w.format,w.type);for(const $ of w.layerUpdates){const _e=ie.data.subarray($*te/ie.data.BYTES_PER_ELEMENT,($+1)*te/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,$,ie.width,ie.height,1,ue,Ie,_e)}w.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,ue,Ie,ie.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Se,ie.width,ie.height,ie.depth,0,ue,Ie,ie.data);else if(w.isData3DTexture)O?(se&&t.texStorage3D(i.TEXTURE_3D,pe,Se,ie.width,ie.height,ie.depth),oe&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,ue,Ie,ie.data)):t.texImage3D(i.TEXTURE_3D,0,Se,ie.width,ie.height,ie.depth,0,ue,Ie,ie.data);else if(w.isFramebufferTexture){if(se)if(O)t.texStorage2D(i.TEXTURE_2D,pe,Se,ie.width,ie.height);else{let te=ie.width,$=ie.height;for(let _e=0;_e<pe;_e++)t.texImage2D(i.TEXTURE_2D,_e,Se,te,$,0,ue,Ie,null),te>>=1,$>>=1}}else if(He.length>0){if(O&&se){const te=Et(He[0]);t.texStorage2D(i.TEXTURE_2D,pe,Se,te.width,te.height)}for(let te=0,$=He.length;te<$;te++)le=He[te],O?oe&&t.texSubImage2D(i.TEXTURE_2D,te,0,0,ue,Ie,le):t.texImage2D(i.TEXTURE_2D,te,Se,ue,Ie,le);w.generateMipmaps=!1}else if(O){if(se){const te=Et(ie);t.texStorage2D(i.TEXTURE_2D,pe,Se,te.width,te.height)}oe&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ue,Ie,ie)}else t.texImage2D(i.TEXTURE_2D,0,Se,ue,Ie,ie);m(w)&&p(Y),we.__version=j.version,w.onUpdate&&w.onUpdate(w)}I.__version=w.version}function Z(I,w,H){if(w.image.length!==6)return;const Y=$e(I,w),J=w.source;t.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+H);const j=n.get(J);if(J.version!==j.__version||Y===!0){t.activeTexture(i.TEXTURE0+H);const we=et.getPrimaries(et.workingColorSpace),re=w.colorSpace===Ti?null:et.getPrimaries(w.colorSpace),ye=w.colorSpace===Ti||we===re?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye);const Me=w.isCompressedTexture||w.image[0].isCompressedTexture,ie=w.image[0]&&w.image[0].isDataTexture,ue=[];for(let $=0;$<6;$++)!Me&&!ie?ue[$]=_(w.image[$],!0,s.maxCubemapSize):ue[$]=ie?w.image[$].image:w.image[$],ue[$]=Ut(w,ue[$]);const Ie=ue[0],Se=r.convert(w.format,w.colorSpace),le=r.convert(w.type),He=y(w.internalFormat,Se,le,w.colorSpace),O=w.isVideoTexture!==!0,se=j.__version===void 0||Y===!0,oe=J.dataReady;let pe=P(w,Ie);Te(i.TEXTURE_CUBE_MAP,w);let te;if(Me){O&&se&&t.texStorage2D(i.TEXTURE_CUBE_MAP,pe,He,Ie.width,Ie.height);for(let $=0;$<6;$++){te=ue[$].mipmaps;for(let _e=0;_e<te.length;_e++){const ke=te[_e];w.format!==wn?Se!==null?O?oe&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,_e,0,0,ke.width,ke.height,Se,ke.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,_e,He,ke.width,ke.height,0,ke.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,_e,0,0,ke.width,ke.height,Se,le,ke.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,_e,He,ke.width,ke.height,0,Se,le,ke.data)}}}else{if(te=w.mipmaps,O&&se){te.length>0&&pe++;const $=Et(ue[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,pe,He,$.width,$.height)}for(let $=0;$<6;$++)if(ie){O?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,ue[$].width,ue[$].height,Se,le,ue[$].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,He,ue[$].width,ue[$].height,0,Se,le,ue[$].data);for(let _e=0;_e<te.length;_e++){const ft=te[_e].image[$].image;O?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,_e+1,0,0,ft.width,ft.height,Se,le,ft.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,_e+1,He,ft.width,ft.height,0,Se,le,ft.data)}}else{O?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Se,le,ue[$]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,He,Se,le,ue[$]);for(let _e=0;_e<te.length;_e++){const ke=te[_e];O?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,_e+1,0,0,Se,le,ke.image[$]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,_e+1,He,Se,le,ke.image[$])}}}m(w)&&p(i.TEXTURE_CUBE_MAP),j.__version=J.version,w.onUpdate&&w.onUpdate(w)}I.__version=w.version}function me(I,w,H,Y,J,j){const we=r.convert(H.format,H.colorSpace),re=r.convert(H.type),ye=y(H.internalFormat,we,re,H.colorSpace),Me=n.get(w),ie=n.get(H);if(ie.__renderTarget=w,!Me.__hasExternalTextures){const ue=Math.max(1,w.width>>j),Ie=Math.max(1,w.height>>j);J===i.TEXTURE_3D||J===i.TEXTURE_2D_ARRAY?t.texImage3D(J,j,ye,ue,Ie,w.depth,0,we,re,null):t.texImage2D(J,j,ye,ue,Ie,0,we,re,null)}t.bindFramebuffer(i.FRAMEBUFFER,I),xe(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,J,ie.__webglTexture,0,vt(w)):(J===i.TEXTURE_2D||J>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Y,J,ie.__webglTexture,j),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ue(I,w,H){if(i.bindRenderbuffer(i.RENDERBUFFER,I),w.depthBuffer){const Y=w.depthTexture,J=Y&&Y.isDepthTexture?Y.type:null,j=S(w.stencilBuffer,J),we=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,re=vt(w);xe(w)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,re,j,w.width,w.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,re,j,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,j,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,we,i.RENDERBUFFER,I)}else{const Y=w.textures;for(let J=0;J<Y.length;J++){const j=Y[J],we=r.convert(j.format,j.colorSpace),re=r.convert(j.type),ye=y(j.internalFormat,we,re,j.colorSpace),Me=vt(w);H&&xe(w)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Me,ye,w.width,w.height):xe(w)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Me,ye,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,ye,w.width,w.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function be(I,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,I),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Y=n.get(w.depthTexture);Y.__renderTarget=w,(!Y.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),k(w.depthTexture,0);const J=Y.__webglTexture,j=vt(w);if(w.depthTexture.format===Ur)xe(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,J,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,J,0);else if(w.depthTexture.format===Fr)xe(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,J,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function Qe(I){const w=n.get(I),H=I.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==I.depthTexture){const Y=I.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),Y){const J=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,Y.removeEventListener("dispose",J)};Y.addEventListener("dispose",J),w.__depthDisposeCallback=J}w.__boundDepthTexture=Y}if(I.depthTexture&&!w.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");const Y=I.texture.mipmaps;Y&&Y.length>0?be(w.__webglFramebuffer[0],I):be(w.__webglFramebuffer,I)}else if(H){w.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[Y]),w.__webglDepthbuffer[Y]===void 0)w.__webglDepthbuffer[Y]=i.createRenderbuffer(),Ue(w.__webglDepthbuffer[Y],I,!1);else{const J=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,j=w.__webglDepthbuffer[Y];i.bindRenderbuffer(i.RENDERBUFFER,j),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,j)}}else{const Y=I.texture.mipmaps;if(Y&&Y.length>0?t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=i.createRenderbuffer(),Ue(w.__webglDepthbuffer,I,!1);else{const J=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,j=w.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,j),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,j)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ht(I,w,H){const Y=n.get(I);w!==void 0&&me(Y.__webglFramebuffer,I,I.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),H!==void 0&&Qe(I)}function N(I){const w=I.texture,H=n.get(I),Y=n.get(w);I.addEventListener("dispose",C);const J=I.textures,j=I.isWebGLCubeRenderTarget===!0,we=J.length>1;if(we||(Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture()),Y.__version=w.version,o.memory.textures++),j){H.__webglFramebuffer=[];for(let re=0;re<6;re++)if(w.mipmaps&&w.mipmaps.length>0){H.__webglFramebuffer[re]=[];for(let ye=0;ye<w.mipmaps.length;ye++)H.__webglFramebuffer[re][ye]=i.createFramebuffer()}else H.__webglFramebuffer[re]=i.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){H.__webglFramebuffer=[];for(let re=0;re<w.mipmaps.length;re++)H.__webglFramebuffer[re]=i.createFramebuffer()}else H.__webglFramebuffer=i.createFramebuffer();if(we)for(let re=0,ye=J.length;re<ye;re++){const Me=n.get(J[re]);Me.__webglTexture===void 0&&(Me.__webglTexture=i.createTexture(),o.memory.textures++)}if(I.samples>0&&xe(I)===!1){H.__webglMultisampledFramebuffer=i.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let re=0;re<J.length;re++){const ye=J[re];H.__webglColorRenderbuffer[re]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,H.__webglColorRenderbuffer[re]);const Me=r.convert(ye.format,ye.colorSpace),ie=r.convert(ye.type),ue=y(ye.internalFormat,Me,ie,ye.colorSpace,I.isXRRenderTarget===!0),Ie=vt(I);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ie,ue,I.width,I.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+re,i.RENDERBUFFER,H.__webglColorRenderbuffer[re])}i.bindRenderbuffer(i.RENDERBUFFER,null),I.depthBuffer&&(H.__webglDepthRenderbuffer=i.createRenderbuffer(),Ue(H.__webglDepthRenderbuffer,I,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(j){t.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),Te(i.TEXTURE_CUBE_MAP,w);for(let re=0;re<6;re++)if(w.mipmaps&&w.mipmaps.length>0)for(let ye=0;ye<w.mipmaps.length;ye++)me(H.__webglFramebuffer[re][ye],I,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+re,ye);else me(H.__webglFramebuffer[re],I,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);m(w)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(we){for(let re=0,ye=J.length;re<ye;re++){const Me=J[re],ie=n.get(Me);let ue=i.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(ue=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ue,ie.__webglTexture),Te(ue,Me),me(H.__webglFramebuffer,I,Me,i.COLOR_ATTACHMENT0+re,ue,0),m(Me)&&p(ue)}t.unbindTexture()}else{let re=i.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(re=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(re,Y.__webglTexture),Te(re,w),w.mipmaps&&w.mipmaps.length>0)for(let ye=0;ye<w.mipmaps.length;ye++)me(H.__webglFramebuffer[ye],I,w,i.COLOR_ATTACHMENT0,re,ye);else me(H.__webglFramebuffer,I,w,i.COLOR_ATTACHMENT0,re,0);m(w)&&p(re),t.unbindTexture()}I.depthBuffer&&Qe(I)}function _t(I){const w=I.textures;for(let H=0,Y=w.length;H<Y;H++){const J=w[H];if(m(J)){const j=M(I),we=n.get(J).__webglTexture;t.bindTexture(j,we),p(j),t.unbindTexture()}}}const Be=[],Le=[];function ve(I){if(I.samples>0){if(xe(I)===!1){const w=I.textures,H=I.width,Y=I.height;let J=i.COLOR_BUFFER_BIT;const j=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,we=n.get(I),re=w.length>1;if(re)for(let Me=0;Me<w.length;Me++)t.bindFramebuffer(i.FRAMEBUFFER,we.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,we.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,we.__webglMultisampledFramebuffer);const ye=I.texture.mipmaps;ye&&ye.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,we.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,we.__webglFramebuffer);for(let Me=0;Me<w.length;Me++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(J|=i.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(J|=i.STENCIL_BUFFER_BIT)),re){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,we.__webglColorRenderbuffer[Me]);const ie=n.get(w[Me]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ie,0)}i.blitFramebuffer(0,0,H,Y,0,0,H,Y,J,i.NEAREST),l===!0&&(Be.length=0,Le.length=0,Be.push(i.COLOR_ATTACHMENT0+Me),I.depthBuffer&&I.resolveDepthBuffer===!1&&(Be.push(j),Le.push(j),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Le)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Be))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),re)for(let Me=0;Me<w.length;Me++){t.bindFramebuffer(i.FRAMEBUFFER,we.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.RENDERBUFFER,we.__webglColorRenderbuffer[Me]);const ie=n.get(w[Me]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,we.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.TEXTURE_2D,ie,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,we.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&l){const w=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[w])}}}function vt(I){return Math.min(s.maxSamples,I.samples)}function xe(I){const w=n.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function We(I){const w=o.render.frame;h.get(I)!==w&&(h.set(I,w),I.update())}function Ut(I,w){const H=I.colorSpace,Y=I.format,J=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||H!==Kt&&H!==Ti&&(et.getTransfer(H)===at?(Y!==wn||J!==Nn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),w}function Et(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(c.width=I.naturalWidth||I.width,c.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(c.width=I.displayWidth,c.height=I.displayHeight):(c.width=I.width,c.height=I.height),c}this.allocateTextureUnit=U,this.resetTextureUnits=D,this.setTexture2D=k,this.setTexture2DArray=F,this.setTexture3D=q,this.setTextureCube=V,this.rebindTextures=Ht,this.setupRenderTarget=N,this.updateRenderTargetMipmap=_t,this.updateMultisampleRenderTarget=ve,this.setupDepthRenderbuffer=Qe,this.setupFrameBufferTexture=me,this.useMultisampledRTT=xe}function Sx(i,e){function t(n,s=Ti){let r;const o=et.getTransfer(s);if(n===Nn)return i.UNSIGNED_BYTE;if(n===Sc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===wc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===rd)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===od)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===id)return i.BYTE;if(n===sd)return i.SHORT;if(n===Lr)return i.UNSIGNED_SHORT;if(n===Mc)return i.INT;if(n===ns)return i.UNSIGNED_INT;if(n===Dn)return i.FLOAT;if(n===Ks)return i.HALF_FLOAT;if(n===ad)return i.ALPHA;if(n===ld)return i.RGB;if(n===wn)return i.RGBA;if(n===Ur)return i.DEPTH_COMPONENT;if(n===Fr)return i.DEPTH_STENCIL;if(n===bc)return i.RED;if(n===Tc)return i.RED_INTEGER;if(n===cd)return i.RG;if(n===Ec)return i.RG_INTEGER;if(n===Ac)return i.RGBA_INTEGER;if(n===Do||n===Io||n===Lo||n===No)if(o===at)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Do)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Io)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Lo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===No)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Do)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Io)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Lo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===No)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ml||n===Sl||n===wl||n===bl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ml)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Sl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===wl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===bl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Tl||n===El||n===Al)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Tl||n===El)return o===at?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Al)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Rl||n===Cl||n===Pl||n===Dl||n===Il||n===Ll||n===Nl||n===Ul||n===Fl||n===Ol||n===kl||n===Bl||n===zl||n===Vl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Rl)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Cl)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Pl)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Dl)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Il)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ll)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Nl)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ul)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Fl)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ol)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===kl)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Bl)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===zl)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Vl)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Hl||n===Gl||n===Wl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Hl)return o===at?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Gl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Wl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Xl||n===jl||n===ql||n===Yl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Xl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===jl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ql)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Yl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Nr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const wx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,bx=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Tx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Rd(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new li({vertexShader:wx,fragmentShader:bx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new qe(new Ui(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Ex extends ss{constructor(e,t){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null;const _=typeof XRWebGLBinding<"u",m=new Tx,p={},M=t.getContextAttributes();let y=null,S=null;const P=[],E=[],C=new de;let R=null;const v=new qt;v.viewport=new tt;const x=new qt;x.viewport=new tt;const A=[v,x],D=new Om;let U=null,L=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let Z=P[X];return Z===void 0&&(Z=new Da,P[X]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(X){let Z=P[X];return Z===void 0&&(Z=new Da,P[X]=Z),Z.getGripSpace()},this.getHand=function(X){let Z=P[X];return Z===void 0&&(Z=new Da,P[X]=Z),Z.getHandSpace()};function k(X){const Z=E.indexOf(X.inputSource);if(Z===-1)return;const me=P[Z];me!==void 0&&(me.update(X.inputSource,X.frame,c||o),me.dispatchEvent({type:X.type,data:X.inputSource}))}function F(){s.removeEventListener("select",k),s.removeEventListener("selectstart",k),s.removeEventListener("selectend",k),s.removeEventListener("squeeze",k),s.removeEventListener("squeezestart",k),s.removeEventListener("squeezeend",k),s.removeEventListener("end",F),s.removeEventListener("inputsourceschange",q);for(let X=0;X<P.length;X++){const Z=E[X];Z!==null&&(E[X]=null,P[X].disconnect(Z))}U=null,L=null,m.reset();for(const X in p)delete p[X];e.setRenderTarget(y),f=null,d=null,u=null,s=null,S=null,Ve.stop(),n.isPresenting=!1,e.setPixelRatio(R),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(y=e.getRenderTarget(),s.addEventListener("select",k),s.addEventListener("selectstart",k),s.addEventListener("selectend",k),s.addEventListener("squeeze",k),s.addEventListener("squeezestart",k),s.addEventListener("squeezeend",k),s.addEventListener("end",F),s.addEventListener("inputsourceschange",q),M.xrCompatible!==!0&&await t.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(C),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let me=null,Ue=null,be=null;M.depth&&(be=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,me=M.stencil?Fr:Ur,Ue=M.stencil?Nr:ns);const Qe={colorFormat:t.RGBA8,depthFormat:be,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(Qe),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),S=new Ni(d.textureWidth,d.textureHeight,{format:wn,type:Nn,depthTexture:new Ad(d.textureWidth,d.textureHeight,Ue,void 0,void 0,void 0,void 0,void 0,void 0,me),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const me={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,me),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),S=new Ni(f.framebufferWidth,f.framebufferHeight,{format:wn,type:Nn,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Ve.setContext(s),Ve.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function q(X){for(let Z=0;Z<X.removed.length;Z++){const me=X.removed[Z],Ue=E.indexOf(me);Ue>=0&&(E[Ue]=null,P[Ue].disconnect(me))}for(let Z=0;Z<X.added.length;Z++){const me=X.added[Z];let Ue=E.indexOf(me);if(Ue===-1){for(let Qe=0;Qe<P.length;Qe++)if(Qe>=E.length){E.push(me),Ue=Qe;break}else if(E[Qe]===null){E[Qe]=me,Ue=Qe;break}if(Ue===-1)break}const be=P[Ue];be&&be.connect(me)}}const V=new b,K=new b;function ee(X,Z,me){V.setFromMatrixPosition(Z.matrixWorld),K.setFromMatrixPosition(me.matrixWorld);const Ue=V.distanceTo(K),be=Z.projectionMatrix.elements,Qe=me.projectionMatrix.elements,Ht=be[14]/(be[10]-1),N=be[14]/(be[10]+1),_t=(be[9]+1)/be[5],Be=(be[9]-1)/be[5],Le=(be[8]-1)/be[0],ve=(Qe[8]+1)/Qe[0],vt=Ht*Le,xe=Ht*ve,We=Ue/(-Le+ve),Ut=We*-Le;if(Z.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(Ut),X.translateZ(We),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),be[10]===-1)X.projectionMatrix.copy(Z.projectionMatrix),X.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{const Et=Ht+We,I=N+We,w=vt-Ut,H=xe+(Ue-Ut),Y=_t*N/I*Et,J=Be*N/I*Et;X.projectionMatrix.makePerspective(w,H,Y,J,Et,I),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function ce(X,Z){Z===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(Z.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let Z=X.near,me=X.far;m.texture!==null&&(m.depthNear>0&&(Z=m.depthNear),m.depthFar>0&&(me=m.depthFar)),D.near=x.near=v.near=Z,D.far=x.far=v.far=me,(U!==D.near||L!==D.far)&&(s.updateRenderState({depthNear:D.near,depthFar:D.far}),U=D.near,L=D.far),D.layers.mask=X.layers.mask|6,v.layers.mask=D.layers.mask&3,x.layers.mask=D.layers.mask&5;const Ue=X.parent,be=D.cameras;ce(D,Ue);for(let Qe=0;Qe<be.length;Qe++)ce(be[Qe],Ue);be.length===2?ee(D,v,x):D.projectionMatrix.copy(v.projectionMatrix),Te(X,D,Ue)};function Te(X,Z,me){me===null?X.matrix.copy(Z.matrixWorld):(X.matrix.copy(me.matrixWorld),X.matrix.invert(),X.matrix.multiply(Z.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(Z.projectionMatrix),X.projectionMatrixInverse.copy(Z.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Hs*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(X){l=X,d!==null&&(d.fixedFoveation=X),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=X)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(D)},this.getCameraTexture=function(X){return p[X]};let $e=null;function Je(X,Z){if(h=Z.getViewerPose(c||o),g=Z,h!==null){const me=h.views;f!==null&&(e.setRenderTargetFramebuffer(S,f.framebuffer),e.setRenderTarget(S));let Ue=!1;me.length!==D.cameras.length&&(D.cameras.length=0,Ue=!0);for(let N=0;N<me.length;N++){const _t=me[N];let Be=null;if(f!==null)Be=f.getViewport(_t);else{const ve=u.getViewSubImage(d,_t);Be=ve.viewport,N===0&&(e.setRenderTargetTextures(S,ve.colorTexture,ve.depthStencilTexture),e.setRenderTarget(S))}let Le=A[N];Le===void 0&&(Le=new qt,Le.layers.enable(N),Le.viewport=new tt,A[N]=Le),Le.matrix.fromArray(_t.transform.matrix),Le.matrix.decompose(Le.position,Le.quaternion,Le.scale),Le.projectionMatrix.fromArray(_t.projectionMatrix),Le.projectionMatrixInverse.copy(Le.projectionMatrix).invert(),Le.viewport.set(Be.x,Be.y,Be.width,Be.height),N===0&&(D.matrix.copy(Le.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),Ue===!0&&D.cameras.push(Le)}const be=s.enabledFeatures;if(be&&be.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){u=n.getBinding();const N=u.getDepthInformation(me[0]);N&&N.isValid&&N.texture&&m.init(N,s.renderState)}if(be&&be.includes("camera-access")&&_){e.state.unbindTexture(),u=n.getBinding();for(let N=0;N<me.length;N++){const _t=me[N].camera;if(_t){let Be=p[_t];Be||(Be=new Rd,p[_t]=Be);const Le=u.getCameraImage(_t);Be.sourceTexture=Le}}}}for(let me=0;me<P.length;me++){const Ue=E[me],be=P[me];Ue!==null&&be!==void 0&&be.update(Ue,Z,c||o)}$e&&$e(X,Z),Z.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Z}),g=null}const Ve=new Od;Ve.setAnimationLoop(Je),this.setAnimationLoop=function(X){$e=X},this.dispose=function(){}}}const Wi=new bn,Ax=new Fe;function Rx(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,vd(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,M,y,S){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,S)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,M,y):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Yt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Yt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const M=e.get(p),y=M.envMap,S=M.envMapRotation;y&&(m.envMap.value=y,Wi.copy(S),Wi.x*=-1,Wi.y*=-1,Wi.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Wi.y*=-1,Wi.z*=-1),m.envMapRotation.value.setFromMatrix4(Ax.makeRotationFromEuler(Wi)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,M,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=y*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Yt&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const M=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Cx(i,e,t,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,y){const S=y.program;n.uniformBlockBinding(M,S)}function c(M,y){let S=s[M.id];S===void 0&&(g(M),S=h(M),s[M.id]=S,M.addEventListener("dispose",m));const P=y.program;n.updateUBOMapping(M,P);const E=e.render.frame;r[M.id]!==E&&(d(M),r[M.id]=E)}function h(M){const y=u();M.__bindingPointIndex=y;const S=i.createBuffer(),P=M.__size,E=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,P,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,S),S}function u(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(M){const y=s[M.id],S=M.uniforms,P=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let E=0,C=S.length;E<C;E++){const R=Array.isArray(S[E])?S[E]:[S[E]];for(let v=0,x=R.length;v<x;v++){const A=R[v];if(f(A,E,v,P)===!0){const D=A.__offset,U=Array.isArray(A.value)?A.value:[A.value];let L=0;for(let k=0;k<U.length;k++){const F=U[k],q=_(F);typeof F=="number"||typeof F=="boolean"?(A.__data[0]=F,i.bufferSubData(i.UNIFORM_BUFFER,D+L,A.__data)):F.isMatrix3?(A.__data[0]=F.elements[0],A.__data[1]=F.elements[1],A.__data[2]=F.elements[2],A.__data[3]=0,A.__data[4]=F.elements[3],A.__data[5]=F.elements[4],A.__data[6]=F.elements[5],A.__data[7]=0,A.__data[8]=F.elements[6],A.__data[9]=F.elements[7],A.__data[10]=F.elements[8],A.__data[11]=0):(F.toArray(A.__data,L),L+=q.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,D,A.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(M,y,S,P){const E=M.value,C=y+"_"+S;if(P[C]===void 0)return typeof E=="number"||typeof E=="boolean"?P[C]=E:P[C]=E.clone(),!0;{const R=P[C];if(typeof E=="number"||typeof E=="boolean"){if(R!==E)return P[C]=E,!0}else if(R.equals(E)===!1)return R.copy(E),!0}return!1}function g(M){const y=M.uniforms;let S=0;const P=16;for(let C=0,R=y.length;C<R;C++){const v=Array.isArray(y[C])?y[C]:[y[C]];for(let x=0,A=v.length;x<A;x++){const D=v[x],U=Array.isArray(D.value)?D.value:[D.value];for(let L=0,k=U.length;L<k;L++){const F=U[L],q=_(F),V=S%P,K=V%q.boundary,ee=V+K;S+=K,ee!==0&&P-ee<q.storage&&(S+=P-ee),D.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=S,S+=q.storage}}}const E=S%P;return E>0&&(S+=P-E),M.__size=S,M.__cache={},this}function _(M){const y={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(y.boundary=4,y.storage=4):M.isVector2?(y.boundary=8,y.storage=8):M.isVector3||M.isColor?(y.boundary=16,y.storage=12):M.isVector4?(y.boundary=16,y.storage=16):M.isMatrix3?(y.boundary=48,y.storage=48):M.isMatrix4?(y.boundary=64,y.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),y}function m(M){const y=M.target;y.removeEventListener("dispose",m);const S=o.indexOf(y.__bindingPointIndex);o.splice(S,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function p(){for(const M in s)i.deleteBuffer(s[M]);o=[],s={},r={}}return{bind:l,update:c,dispose:p}}class Px{constructor(e={}){const{canvas:t=vp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const M=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Pi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const S=this;let P=!1;this._outputColorSpace=Ct;let E=0,C=0,R=null,v=-1,x=null;const A=new tt,D=new tt;let U=null;const L=new De(0);let k=0,F=t.width,q=t.height,V=1,K=null,ee=null;const ce=new tt(0,0,F,q),Te=new tt(0,0,F,q);let $e=!1;const Je=new Lc;let Ve=!1,X=!1;const Z=new Fe,me=new b,Ue=new tt,be={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Qe=!1;function Ht(){return R===null?V:1}let N=n;function _t(T,B){return t.getContext(T,B)}try{const T={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${xc}`),t.addEventListener("webglcontextlost",oe,!1),t.addEventListener("webglcontextrestored",pe,!1),t.addEventListener("webglcontextcreationerror",te,!1),N===null){const B="webgl2";if(N=_t(B,T),N===null)throw _t(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Be,Le,ve,vt,xe,We,Ut,Et,I,w,H,Y,J,j,we,re,ye,Me,ie,ue,Ie,Se,le,He;function O(){Be=new z_(N),Be.init(),Se=new Sx(N,Be),Le=new L_(N,Be,e,Se),ve=new yx(N,Be),Le.reversedDepthBuffer&&d&&ve.buffers.depth.setReversed(!0),vt=new G_(N),xe=new ax,We=new Mx(N,Be,ve,xe,Le,Se,vt),Ut=new U_(S),Et=new B_(S),I=new Km(N),le=new D_(N,I),w=new V_(N,I,vt,le),H=new X_(N,w,I,vt),ie=new W_(N,Le,We),re=new N_(xe),Y=new ox(S,Ut,Et,Be,Le,le,re),J=new Rx(S,xe),j=new cx,we=new mx(Be),Me=new P_(S,Ut,Et,ve,H,f,l),ye=new vx(S,H,Le),He=new Cx(N,vt,Le,ve),ue=new I_(N,Be,vt),Ie=new H_(N,Be,vt),vt.programs=Y.programs,S.capabilities=Le,S.extensions=Be,S.properties=xe,S.renderLists=j,S.shadowMap=ye,S.state=ve,S.info=vt}O();const se=new Ex(S,N);this.xr=se,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const T=Be.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Be.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(T){T!==void 0&&(V=T,this.setSize(F,q,!1))},this.getSize=function(T){return T.set(F,q)},this.setSize=function(T,B,G=!0){if(se.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}F=T,q=B,t.width=Math.floor(T*V),t.height=Math.floor(B*V),G===!0&&(t.style.width=T+"px",t.style.height=B+"px"),this.setViewport(0,0,T,B)},this.getDrawingBufferSize=function(T){return T.set(F*V,q*V).floor()},this.setDrawingBufferSize=function(T,B,G){F=T,q=B,V=G,t.width=Math.floor(T*G),t.height=Math.floor(B*G),this.setViewport(0,0,T,B)},this.getCurrentViewport=function(T){return T.copy(A)},this.getViewport=function(T){return T.copy(ce)},this.setViewport=function(T,B,G,W){T.isVector4?ce.set(T.x,T.y,T.z,T.w):ce.set(T,B,G,W),ve.viewport(A.copy(ce).multiplyScalar(V).round())},this.getScissor=function(T){return T.copy(Te)},this.setScissor=function(T,B,G,W){T.isVector4?Te.set(T.x,T.y,T.z,T.w):Te.set(T,B,G,W),ve.scissor(D.copy(Te).multiplyScalar(V).round())},this.getScissorTest=function(){return $e},this.setScissorTest=function(T){ve.setScissorTest($e=T)},this.setOpaqueSort=function(T){K=T},this.setTransparentSort=function(T){ee=T},this.getClearColor=function(T){return T.copy(Me.getClearColor())},this.setClearColor=function(){Me.setClearColor(...arguments)},this.getClearAlpha=function(){return Me.getClearAlpha()},this.setClearAlpha=function(){Me.setClearAlpha(...arguments)},this.clear=function(T=!0,B=!0,G=!0){let W=0;if(T){let z=!1;if(R!==null){const ne=R.texture.format;z=ne===Ac||ne===Ec||ne===Tc}if(z){const ne=R.texture.type,he=ne===Nn||ne===ns||ne===Lr||ne===Nr||ne===Sc||ne===wc,ge=Me.getClearColor(),fe=Me.getClearAlpha(),Ce=ge.r,Ne=ge.g,Ee=ge.b;he?(g[0]=Ce,g[1]=Ne,g[2]=Ee,g[3]=fe,N.clearBufferuiv(N.COLOR,0,g)):(_[0]=Ce,_[1]=Ne,_[2]=Ee,_[3]=fe,N.clearBufferiv(N.COLOR,0,_))}else W|=N.COLOR_BUFFER_BIT}B&&(W|=N.DEPTH_BUFFER_BIT),G&&(W|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",oe,!1),t.removeEventListener("webglcontextrestored",pe,!1),t.removeEventListener("webglcontextcreationerror",te,!1),Me.dispose(),j.dispose(),we.dispose(),xe.dispose(),Ut.dispose(),Et.dispose(),H.dispose(),le.dispose(),He.dispose(),Y.dispose(),se.dispose(),se.removeEventListener("sessionstart",Fn),se.removeEventListener("sessionend",Kc),Oi.stop()};function oe(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function pe(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const T=vt.autoReset,B=ye.enabled,G=ye.autoUpdate,W=ye.needsUpdate,z=ye.type;O(),vt.autoReset=T,ye.enabled=B,ye.autoUpdate=G,ye.needsUpdate=W,ye.type=z}function te(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function $(T){const B=T.target;B.removeEventListener("dispose",$),_e(B)}function _e(T){ke(T),xe.remove(T)}function ke(T){const B=xe.get(T).programs;B!==void 0&&(B.forEach(function(G){Y.releaseProgram(G)}),T.isShaderMaterial&&Y.releaseShaderCache(T))}this.renderBufferDirect=function(T,B,G,W,z,ne){B===null&&(B=be);const he=z.isMesh&&z.matrixWorld.determinant()<0,ge=cf(T,B,G,W,z);ve.setMaterial(W,he);let fe=G.index,Ce=1;if(W.wireframe===!0){if(fe=w.getWireframeAttribute(G),fe===void 0)return;Ce=2}const Ne=G.drawRange,Ee=G.attributes.position;let Ze=Ne.start*Ce,ot=(Ne.start+Ne.count)*Ce;ne!==null&&(Ze=Math.max(Ze,ne.start*Ce),ot=Math.min(ot,(ne.start+ne.count)*Ce)),fe!==null?(Ze=Math.max(Ze,0),ot=Math.min(ot,fe.count)):Ee!=null&&(Ze=Math.max(Ze,0),ot=Math.min(ot,Ee.count));const wt=ot-Ze;if(wt<0||wt===1/0)return;le.setup(z,W,ge,G,fe);let mt,ut=ue;if(fe!==null&&(mt=I.get(fe),ut=Ie,ut.setIndex(mt)),z.isMesh)W.wireframe===!0?(ve.setLineWidth(W.wireframeLinewidth*Ht()),ut.setMode(N.LINES)):ut.setMode(N.TRIANGLES);else if(z.isLine){let Re=W.linewidth;Re===void 0&&(Re=1),ve.setLineWidth(Re*Ht()),z.isLineSegments?ut.setMode(N.LINES):z.isLineLoop?ut.setMode(N.LINE_LOOP):ut.setMode(N.LINE_STRIP)}else z.isPoints?ut.setMode(N.POINTS):z.isSprite&&ut.setMode(N.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)zr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ut.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if(Be.get("WEBGL_multi_draw"))ut.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const Re=z._multiDrawStarts,yt=z._multiDrawCounts,nt=z._multiDrawCount,an=fe?I.get(fe).bytesPerElement:1,rs=xe.get(W).currentProgram.getUniforms();for(let ln=0;ln<nt;ln++)rs.setValue(N,"_gl_DrawID",ln),ut.render(Re[ln]/an,yt[ln])}else if(z.isInstancedMesh)ut.renderInstances(Ze,wt,z.count);else if(G.isInstancedBufferGeometry){const Re=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,yt=Math.min(G.instanceCount,Re);ut.renderInstances(Ze,wt,yt)}else ut.render(Ze,wt)};function ft(T,B,G){T.transparent===!0&&T.side===un&&T.forceSinglePass===!1?(T.side=Yt,T.needsUpdate=!0,Kr(T,B,G),T.side=ai,T.needsUpdate=!0,Kr(T,B,G),T.side=un):Kr(T,B,G)}this.compile=function(T,B,G=null){G===null&&(G=T),p=we.get(G),p.init(B),y.push(p),G.traverseVisible(function(z){z.isLight&&z.layers.test(B.layers)&&(p.pushLight(z),z.castShadow&&p.pushShadow(z))}),T!==G&&T.traverseVisible(function(z){z.isLight&&z.layers.test(B.layers)&&(p.pushLight(z),z.castShadow&&p.pushShadow(z))}),p.setupLights();const W=new Set;return T.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const ne=z.material;if(ne)if(Array.isArray(ne))for(let he=0;he<ne.length;he++){const ge=ne[he];ft(ge,G,z),W.add(ge)}else ft(ne,G,z),W.add(ne)}),p=y.pop(),W},this.compileAsync=function(T,B,G=null){const W=this.compile(T,B,G);return new Promise(z=>{function ne(){if(W.forEach(function(he){xe.get(he).currentProgram.isReady()&&W.delete(he)}),W.size===0){z(T);return}setTimeout(ne,10)}Be.get("KHR_parallel_shader_compile")!==null?ne():setTimeout(ne,10)})};let it=null;function Xn(T){it&&it(T)}function Fn(){Oi.stop()}function Kc(){Oi.start()}const Oi=new Od;Oi.setAnimationLoop(Xn),typeof self<"u"&&Oi.setContext(self),this.setAnimationLoop=function(T){it=T,se.setAnimationLoop(T),T===null?Oi.stop():Oi.start()},se.addEventListener("sessionstart",Fn),se.addEventListener("sessionend",Kc),this.render=function(T,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),se.enabled===!0&&se.isPresenting===!0&&(se.cameraAutoUpdate===!0&&se.updateCamera(B),B=se.getCamera()),T.isScene===!0&&T.onBeforeRender(S,T,B,R),p=we.get(T,y.length),p.init(B),y.push(p),Z.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),Je.setFromProjectionMatrix(Z,zn,B.reversedDepth),X=this.localClippingEnabled,Ve=re.init(this.clippingPlanes,X),m=j.get(T,M.length),m.init(),M.push(m),se.enabled===!0&&se.isPresenting===!0){const ne=S.xr.getDepthSensingMesh();ne!==null&&la(ne,B,-1/0,S.sortObjects)}la(T,B,0,S.sortObjects),m.finish(),S.sortObjects===!0&&m.sort(K,ee),Qe=se.enabled===!1||se.isPresenting===!1||se.hasDepthSensing()===!1,Qe&&Me.addToRenderList(m,T),this.info.render.frame++,Ve===!0&&re.beginShadows();const G=p.state.shadowsArray;ye.render(G,T,B),Ve===!0&&re.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=m.opaque,z=m.transmissive;if(p.setupLights(),B.isArrayCamera){const ne=B.cameras;if(z.length>0)for(let he=0,ge=ne.length;he<ge;he++){const fe=ne[he];Zc(W,z,T,fe)}Qe&&Me.render(T);for(let he=0,ge=ne.length;he<ge;he++){const fe=ne[he];$c(m,T,fe,fe.viewport)}}else z.length>0&&Zc(W,z,T,B),Qe&&Me.render(T),$c(m,T,B);R!==null&&C===0&&(We.updateMultisampleRenderTarget(R),We.updateRenderTargetMipmap(R)),T.isScene===!0&&T.onAfterRender(S,T,B),le.resetDefaultState(),v=-1,x=null,y.pop(),y.length>0?(p=y[y.length-1],Ve===!0&&re.setGlobalState(S.clippingPlanes,p.state.camera)):p=null,M.pop(),M.length>0?m=M[M.length-1]:m=null};function la(T,B,G,W){if(T.visible===!1)return;if(T.layers.test(B.layers)){if(T.isGroup)G=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(B);else if(T.isLight)p.pushLight(T),T.castShadow&&p.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Je.intersectsSprite(T)){W&&Ue.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Z);const he=H.update(T),ge=T.material;ge.visible&&m.push(T,he,ge,G,Ue.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Je.intersectsObject(T))){const he=H.update(T),ge=T.material;if(W&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Ue.copy(T.boundingSphere.center)):(he.boundingSphere===null&&he.computeBoundingSphere(),Ue.copy(he.boundingSphere.center)),Ue.applyMatrix4(T.matrixWorld).applyMatrix4(Z)),Array.isArray(ge)){const fe=he.groups;for(let Ce=0,Ne=fe.length;Ce<Ne;Ce++){const Ee=fe[Ce],Ze=ge[Ee.materialIndex];Ze&&Ze.visible&&m.push(T,he,Ze,G,Ue.z,Ee)}}else ge.visible&&m.push(T,he,ge,G,Ue.z,null)}}const ne=T.children;for(let he=0,ge=ne.length;he<ge;he++)la(ne[he],B,G,W)}function $c(T,B,G,W){const z=T.opaque,ne=T.transmissive,he=T.transparent;p.setupLightsView(G),Ve===!0&&re.setGlobalState(S.clippingPlanes,G),W&&ve.viewport(A.copy(W)),z.length>0&&Yr(z,B,G),ne.length>0&&Yr(ne,B,G),he.length>0&&Yr(he,B,G),ve.buffers.depth.setTest(!0),ve.buffers.depth.setMask(!0),ve.buffers.color.setMask(!0),ve.setPolygonOffset(!1)}function Zc(T,B,G,W){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[W.id]===void 0&&(p.state.transmissionRenderTarget[W.id]=new Ni(1,1,{generateMipmaps:!0,type:Be.has("EXT_color_buffer_half_float")||Be.has("EXT_color_buffer_float")?Ks:Nn,minFilter:ii,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:et.workingColorSpace}));const ne=p.state.transmissionRenderTarget[W.id],he=W.viewport||A;ne.setSize(he.z*S.transmissionResolutionScale,he.w*S.transmissionResolutionScale);const ge=S.getRenderTarget(),fe=S.getActiveCubeFace(),Ce=S.getActiveMipmapLevel();S.setRenderTarget(ne),S.getClearColor(L),k=S.getClearAlpha(),k<1&&S.setClearColor(16777215,.5),S.clear(),Qe&&Me.render(G);const Ne=S.toneMapping;S.toneMapping=Pi;const Ee=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),p.setupLightsView(W),Ve===!0&&re.setGlobalState(S.clippingPlanes,W),Yr(T,G,W),We.updateMultisampleRenderTarget(ne),We.updateRenderTargetMipmap(ne),Be.has("WEBGL_multisampled_render_to_texture")===!1){let Ze=!1;for(let ot=0,wt=B.length;ot<wt;ot++){const mt=B[ot],ut=mt.object,Re=mt.geometry,yt=mt.material,nt=mt.group;if(yt.side===un&&ut.layers.test(W.layers)){const an=yt.side;yt.side=Yt,yt.needsUpdate=!0,Jc(ut,G,W,Re,yt,nt),yt.side=an,yt.needsUpdate=!0,Ze=!0}}Ze===!0&&(We.updateMultisampleRenderTarget(ne),We.updateRenderTargetMipmap(ne))}S.setRenderTarget(ge,fe,Ce),S.setClearColor(L,k),Ee!==void 0&&(W.viewport=Ee),S.toneMapping=Ne}function Yr(T,B,G){const W=B.isScene===!0?B.overrideMaterial:null;for(let z=0,ne=T.length;z<ne;z++){const he=T[z],ge=he.object,fe=he.geometry,Ce=he.group;let Ne=he.material;Ne.allowOverride===!0&&W!==null&&(Ne=W),ge.layers.test(G.layers)&&Jc(ge,B,G,fe,Ne,Ce)}}function Jc(T,B,G,W,z,ne){T.onBeforeRender(S,B,G,W,z,ne),T.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),z.onBeforeRender(S,B,G,W,T,ne),z.transparent===!0&&z.side===un&&z.forceSinglePass===!1?(z.side=Yt,z.needsUpdate=!0,S.renderBufferDirect(G,B,W,z,T,ne),z.side=ai,z.needsUpdate=!0,S.renderBufferDirect(G,B,W,z,T,ne),z.side=un):S.renderBufferDirect(G,B,W,z,T,ne),T.onAfterRender(S,B,G,W,z,ne)}function Kr(T,B,G){B.isScene!==!0&&(B=be);const W=xe.get(T),z=p.state.lights,ne=p.state.shadowsArray,he=z.state.version,ge=Y.getParameters(T,z.state,ne,B,G),fe=Y.getProgramCacheKey(ge);let Ce=W.programs;W.environment=T.isMeshStandardMaterial?B.environment:null,W.fog=B.fog,W.envMap=(T.isMeshStandardMaterial?Et:Ut).get(T.envMap||W.environment),W.envMapRotation=W.environment!==null&&T.envMap===null?B.environmentRotation:T.envMapRotation,Ce===void 0&&(T.addEventListener("dispose",$),Ce=new Map,W.programs=Ce);let Ne=Ce.get(fe);if(Ne!==void 0){if(W.currentProgram===Ne&&W.lightsStateVersion===he)return eh(T,ge),Ne}else ge.uniforms=Y.getUniforms(T),T.onBeforeCompile(ge,S),Ne=Y.acquireProgram(ge,fe),Ce.set(fe,Ne),W.uniforms=ge.uniforms;const Ee=W.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ee.clippingPlanes=re.uniform),eh(T,ge),W.needsLights=uf(T),W.lightsStateVersion=he,W.needsLights&&(Ee.ambientLightColor.value=z.state.ambient,Ee.lightProbe.value=z.state.probe,Ee.directionalLights.value=z.state.directional,Ee.directionalLightShadows.value=z.state.directionalShadow,Ee.spotLights.value=z.state.spot,Ee.spotLightShadows.value=z.state.spotShadow,Ee.rectAreaLights.value=z.state.rectArea,Ee.ltc_1.value=z.state.rectAreaLTC1,Ee.ltc_2.value=z.state.rectAreaLTC2,Ee.pointLights.value=z.state.point,Ee.pointLightShadows.value=z.state.pointShadow,Ee.hemisphereLights.value=z.state.hemi,Ee.directionalShadowMap.value=z.state.directionalShadowMap,Ee.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Ee.spotShadowMap.value=z.state.spotShadowMap,Ee.spotLightMatrix.value=z.state.spotLightMatrix,Ee.spotLightMap.value=z.state.spotLightMap,Ee.pointShadowMap.value=z.state.pointShadowMap,Ee.pointShadowMatrix.value=z.state.pointShadowMatrix),W.currentProgram=Ne,W.uniformsList=null,Ne}function Qc(T){if(T.uniformsList===null){const B=T.currentProgram.getUniforms();T.uniformsList=Uo.seqWithValue(B.seq,T.uniforms)}return T.uniformsList}function eh(T,B){const G=xe.get(T);G.outputColorSpace=B.outputColorSpace,G.batching=B.batching,G.batchingColor=B.batchingColor,G.instancing=B.instancing,G.instancingColor=B.instancingColor,G.instancingMorph=B.instancingMorph,G.skinning=B.skinning,G.morphTargets=B.morphTargets,G.morphNormals=B.morphNormals,G.morphColors=B.morphColors,G.morphTargetsCount=B.morphTargetsCount,G.numClippingPlanes=B.numClippingPlanes,G.numIntersection=B.numClipIntersection,G.vertexAlphas=B.vertexAlphas,G.vertexTangents=B.vertexTangents,G.toneMapping=B.toneMapping}function cf(T,B,G,W,z){B.isScene!==!0&&(B=be),We.resetTextureUnits();const ne=B.fog,he=W.isMeshStandardMaterial?B.environment:null,ge=R===null?S.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Kt,fe=(W.isMeshStandardMaterial?Et:Ut).get(W.envMap||he),Ce=W.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Ne=!!G.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Ee=!!G.morphAttributes.position,Ze=!!G.morphAttributes.normal,ot=!!G.morphAttributes.color;let wt=Pi;W.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(wt=S.toneMapping);const mt=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,ut=mt!==void 0?mt.length:0,Re=xe.get(W),yt=p.state.lights;if(Ve===!0&&(X===!0||T!==x)){const $t=T===x&&W.id===v;re.setState(W,T,$t)}let nt=!1;W.version===Re.__version?(Re.needsLights&&Re.lightsStateVersion!==yt.state.version||Re.outputColorSpace!==ge||z.isBatchedMesh&&Re.batching===!1||!z.isBatchedMesh&&Re.batching===!0||z.isBatchedMesh&&Re.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&Re.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&Re.instancing===!1||!z.isInstancedMesh&&Re.instancing===!0||z.isSkinnedMesh&&Re.skinning===!1||!z.isSkinnedMesh&&Re.skinning===!0||z.isInstancedMesh&&Re.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&Re.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&Re.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&Re.instancingMorph===!1&&z.morphTexture!==null||Re.envMap!==fe||W.fog===!0&&Re.fog!==ne||Re.numClippingPlanes!==void 0&&(Re.numClippingPlanes!==re.numPlanes||Re.numIntersection!==re.numIntersection)||Re.vertexAlphas!==Ce||Re.vertexTangents!==Ne||Re.morphTargets!==Ee||Re.morphNormals!==Ze||Re.morphColors!==ot||Re.toneMapping!==wt||Re.morphTargetsCount!==ut)&&(nt=!0):(nt=!0,Re.__version=W.version);let an=Re.currentProgram;nt===!0&&(an=Kr(W,B,z));let rs=!1,ln=!1,er=!1;const Mt=an.getUniforms(),_n=Re.uniforms;if(ve.useProgram(an.program)&&(rs=!0,ln=!0,er=!0),W.id!==v&&(v=W.id,ln=!0),rs||x!==T){ve.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),Mt.setValue(N,"projectionMatrix",T.projectionMatrix),Mt.setValue(N,"viewMatrix",T.matrixWorldInverse);const nn=Mt.map.cameraPosition;nn!==void 0&&nn.setValue(N,me.setFromMatrixPosition(T.matrixWorld)),Le.logarithmicDepthBuffer&&Mt.setValue(N,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&Mt.setValue(N,"isOrthographic",T.isOrthographicCamera===!0),x!==T&&(x=T,ln=!0,er=!0)}if(z.isSkinnedMesh){Mt.setOptional(N,z,"bindMatrix"),Mt.setOptional(N,z,"bindMatrixInverse");const $t=z.skeleton;$t&&($t.boneTexture===null&&$t.computeBoneTexture(),Mt.setValue(N,"boneTexture",$t.boneTexture,We))}z.isBatchedMesh&&(Mt.setOptional(N,z,"batchingTexture"),Mt.setValue(N,"batchingTexture",z._matricesTexture,We),Mt.setOptional(N,z,"batchingIdTexture"),Mt.setValue(N,"batchingIdTexture",z._indirectTexture,We),Mt.setOptional(N,z,"batchingColorTexture"),z._colorsTexture!==null&&Mt.setValue(N,"batchingColorTexture",z._colorsTexture,We));const vn=G.morphAttributes;if((vn.position!==void 0||vn.normal!==void 0||vn.color!==void 0)&&ie.update(z,G,an),(ln||Re.receiveShadow!==z.receiveShadow)&&(Re.receiveShadow=z.receiveShadow,Mt.setValue(N,"receiveShadow",z.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(_n.envMap.value=fe,_n.flipEnvMap.value=fe.isCubeTexture&&fe.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&B.environment!==null&&(_n.envMapIntensity.value=B.environmentIntensity),ln&&(Mt.setValue(N,"toneMappingExposure",S.toneMappingExposure),Re.needsLights&&hf(_n,er),ne&&W.fog===!0&&J.refreshFogUniforms(_n,ne),J.refreshMaterialUniforms(_n,W,V,q,p.state.transmissionRenderTarget[T.id]),Uo.upload(N,Qc(Re),_n,We)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Uo.upload(N,Qc(Re),_n,We),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&Mt.setValue(N,"center",z.center),Mt.setValue(N,"modelViewMatrix",z.modelViewMatrix),Mt.setValue(N,"normalMatrix",z.normalMatrix),Mt.setValue(N,"modelMatrix",z.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const $t=W.uniformsGroups;for(let nn=0,ca=$t.length;nn<ca;nn++){const ki=$t[nn];He.update(ki,an),He.bind(ki,an)}}return an}function hf(T,B){T.ambientLightColor.needsUpdate=B,T.lightProbe.needsUpdate=B,T.directionalLights.needsUpdate=B,T.directionalLightShadows.needsUpdate=B,T.pointLights.needsUpdate=B,T.pointLightShadows.needsUpdate=B,T.spotLights.needsUpdate=B,T.spotLightShadows.needsUpdate=B,T.rectAreaLights.needsUpdate=B,T.hemisphereLights.needsUpdate=B}function uf(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(T,B,G){const W=xe.get(T);W.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),xe.get(T.texture).__webglTexture=B,xe.get(T.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:G,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,B){const G=xe.get(T);G.__webglFramebuffer=B,G.__useDefaultFramebuffer=B===void 0};const df=N.createFramebuffer();this.setRenderTarget=function(T,B=0,G=0){R=T,E=B,C=G;let W=!0,z=null,ne=!1,he=!1;if(T){const fe=xe.get(T);if(fe.__useDefaultFramebuffer!==void 0)ve.bindFramebuffer(N.FRAMEBUFFER,null),W=!1;else if(fe.__webglFramebuffer===void 0)We.setupRenderTarget(T);else if(fe.__hasExternalTextures)We.rebindTextures(T,xe.get(T.texture).__webglTexture,xe.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Ee=T.depthTexture;if(fe.__boundDepthTexture!==Ee){if(Ee!==null&&xe.has(Ee)&&(T.width!==Ee.image.width||T.height!==Ee.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");We.setupDepthRenderbuffer(T)}}const Ce=T.texture;(Ce.isData3DTexture||Ce.isDataArrayTexture||Ce.isCompressedArrayTexture)&&(he=!0);const Ne=xe.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Ne[B])?z=Ne[B][G]:z=Ne[B],ne=!0):T.samples>0&&We.useMultisampledRTT(T)===!1?z=xe.get(T).__webglMultisampledFramebuffer:Array.isArray(Ne)?z=Ne[G]:z=Ne,A.copy(T.viewport),D.copy(T.scissor),U=T.scissorTest}else A.copy(ce).multiplyScalar(V).floor(),D.copy(Te).multiplyScalar(V).floor(),U=$e;if(G!==0&&(z=df),ve.bindFramebuffer(N.FRAMEBUFFER,z)&&W&&ve.drawBuffers(T,z),ve.viewport(A),ve.scissor(D),ve.setScissorTest(U),ne){const fe=xe.get(T.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+B,fe.__webglTexture,G)}else if(he){const fe=B;for(let Ce=0;Ce<T.textures.length;Ce++){const Ne=xe.get(T.textures[Ce]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Ce,Ne.__webglTexture,G,fe)}}else if(T!==null&&G!==0){const fe=xe.get(T.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,fe.__webglTexture,G)}v=-1},this.readRenderTargetPixels=function(T,B,G,W,z,ne,he,ge=0){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let fe=xe.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&he!==void 0&&(fe=fe[he]),fe){ve.bindFramebuffer(N.FRAMEBUFFER,fe);try{const Ce=T.textures[ge],Ne=Ce.format,Ee=Ce.type;if(!Le.textureFormatReadable(Ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Le.textureTypeReadable(Ee)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=T.width-W&&G>=0&&G<=T.height-z&&(T.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+ge),N.readPixels(B,G,W,z,Se.convert(Ne),Se.convert(Ee),ne))}finally{const Ce=R!==null?xe.get(R).__webglFramebuffer:null;ve.bindFramebuffer(N.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(T,B,G,W,z,ne,he,ge=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let fe=xe.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&he!==void 0&&(fe=fe[he]),fe)if(B>=0&&B<=T.width-W&&G>=0&&G<=T.height-z){ve.bindFramebuffer(N.FRAMEBUFFER,fe);const Ce=T.textures[ge],Ne=Ce.format,Ee=Ce.type;if(!Le.textureFormatReadable(Ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Le.textureTypeReadable(Ee))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ze=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Ze),N.bufferData(N.PIXEL_PACK_BUFFER,ne.byteLength,N.STREAM_READ),T.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+ge),N.readPixels(B,G,W,z,Se.convert(Ne),Se.convert(Ee),0);const ot=R!==null?xe.get(R).__webglFramebuffer:null;ve.bindFramebuffer(N.FRAMEBUFFER,ot);const wt=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await xp(N,wt,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Ze),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,ne),N.deleteBuffer(Ze),N.deleteSync(wt),ne}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,B=null,G=0){const W=Math.pow(2,-G),z=Math.floor(T.image.width*W),ne=Math.floor(T.image.height*W),he=B!==null?B.x:0,ge=B!==null?B.y:0;We.setTexture2D(T,0),N.copyTexSubImage2D(N.TEXTURE_2D,G,0,0,he,ge,z,ne),ve.unbindTexture()};const ff=N.createFramebuffer(),pf=N.createFramebuffer();this.copyTextureToTexture=function(T,B,G=null,W=null,z=0,ne=null){ne===null&&(z!==0?(zr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ne=z,z=0):ne=0);let he,ge,fe,Ce,Ne,Ee,Ze,ot,wt;const mt=T.isCompressedTexture?T.mipmaps[ne]:T.image;if(G!==null)he=G.max.x-G.min.x,ge=G.max.y-G.min.y,fe=G.isBox3?G.max.z-G.min.z:1,Ce=G.min.x,Ne=G.min.y,Ee=G.isBox3?G.min.z:0;else{const vn=Math.pow(2,-z);he=Math.floor(mt.width*vn),ge=Math.floor(mt.height*vn),T.isDataArrayTexture?fe=mt.depth:T.isData3DTexture?fe=Math.floor(mt.depth*vn):fe=1,Ce=0,Ne=0,Ee=0}W!==null?(Ze=W.x,ot=W.y,wt=W.z):(Ze=0,ot=0,wt=0);const ut=Se.convert(B.format),Re=Se.convert(B.type);let yt;B.isData3DTexture?(We.setTexture3D(B,0),yt=N.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(We.setTexture2DArray(B,0),yt=N.TEXTURE_2D_ARRAY):(We.setTexture2D(B,0),yt=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,B.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,B.unpackAlignment);const nt=N.getParameter(N.UNPACK_ROW_LENGTH),an=N.getParameter(N.UNPACK_IMAGE_HEIGHT),rs=N.getParameter(N.UNPACK_SKIP_PIXELS),ln=N.getParameter(N.UNPACK_SKIP_ROWS),er=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,mt.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,mt.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Ce),N.pixelStorei(N.UNPACK_SKIP_ROWS,Ne),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Ee);const Mt=T.isDataArrayTexture||T.isData3DTexture,_n=B.isDataArrayTexture||B.isData3DTexture;if(T.isDepthTexture){const vn=xe.get(T),$t=xe.get(B),nn=xe.get(vn.__renderTarget),ca=xe.get($t.__renderTarget);ve.bindFramebuffer(N.READ_FRAMEBUFFER,nn.__webglFramebuffer),ve.bindFramebuffer(N.DRAW_FRAMEBUFFER,ca.__webglFramebuffer);for(let ki=0;ki<fe;ki++)Mt&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,xe.get(T).__webglTexture,z,Ee+ki),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,xe.get(B).__webglTexture,ne,wt+ki)),N.blitFramebuffer(Ce,Ne,he,ge,Ze,ot,he,ge,N.DEPTH_BUFFER_BIT,N.NEAREST);ve.bindFramebuffer(N.READ_FRAMEBUFFER,null),ve.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(z!==0||T.isRenderTargetTexture||xe.has(T)){const vn=xe.get(T),$t=xe.get(B);ve.bindFramebuffer(N.READ_FRAMEBUFFER,ff),ve.bindFramebuffer(N.DRAW_FRAMEBUFFER,pf);for(let nn=0;nn<fe;nn++)Mt?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,vn.__webglTexture,z,Ee+nn):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,vn.__webglTexture,z),_n?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,$t.__webglTexture,ne,wt+nn):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,$t.__webglTexture,ne),z!==0?N.blitFramebuffer(Ce,Ne,he,ge,Ze,ot,he,ge,N.COLOR_BUFFER_BIT,N.NEAREST):_n?N.copyTexSubImage3D(yt,ne,Ze,ot,wt+nn,Ce,Ne,he,ge):N.copyTexSubImage2D(yt,ne,Ze,ot,Ce,Ne,he,ge);ve.bindFramebuffer(N.READ_FRAMEBUFFER,null),ve.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else _n?T.isDataTexture||T.isData3DTexture?N.texSubImage3D(yt,ne,Ze,ot,wt,he,ge,fe,ut,Re,mt.data):B.isCompressedArrayTexture?N.compressedTexSubImage3D(yt,ne,Ze,ot,wt,he,ge,fe,ut,mt.data):N.texSubImage3D(yt,ne,Ze,ot,wt,he,ge,fe,ut,Re,mt):T.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,ne,Ze,ot,he,ge,ut,Re,mt.data):T.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,ne,Ze,ot,mt.width,mt.height,ut,mt.data):N.texSubImage2D(N.TEXTURE_2D,ne,Ze,ot,he,ge,ut,Re,mt);N.pixelStorei(N.UNPACK_ROW_LENGTH,nt),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,an),N.pixelStorei(N.UNPACK_SKIP_PIXELS,rs),N.pixelStorei(N.UNPACK_SKIP_ROWS,ln),N.pixelStorei(N.UNPACK_SKIP_IMAGES,er),ne===0&&B.generateMipmaps&&N.generateMipmap(yt),ve.unbindTexture()},this.initRenderTarget=function(T){xe.get(T).__webglFramebuffer===void 0&&We.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?We.setTextureCube(T,0):T.isData3DTexture?We.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?We.setTexture2DArray(T,0):We.setTexture2D(T,0),ve.unbindTexture()},this.resetState=function(){E=0,C=0,R=null,ve.reset(),le.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=et._getDrawingBufferColorSpace(e),t.unpackColorSpace=et._getUnpackColorSpace()}}const Hd=i=>(Object.values(i).forEach(e=>{e&&typeof e=="object"&&Hd(e)}),Object.freeze(i)),Gd=Hd({"needle-driver":{units:"meters",margin:15e-5,source:"public/assets/needle-driver.glb",sourceSha256:"50bb46af543f99b3be7c1540d74813d4c2d9a70d707a1aae978ec19879baad6d",frame:"Each capsule a/b is in its named source URDF link coordinate system; transform with that animated link matrix.",fit:"Triangle-clipped axial slabs; radial bounding circle plus 0.15 mm. No TCP sphere or jaw-gap fill.",tipPositionAtZero:[18063540287423462e-34,-6245698675651502e-34,.4355],joints:[{name:"roll",parent:"adaptor_link",child:"roll_link",type:"revolute",origin:{xyz:[0,0,.4162],rpy:[0,0,0]},axis:[0,0,1],limit:{lower:-4.53786,upper:4.53786,velocity:.4,effort:1e3},mimic:null},{name:"wrist_pitch",parent:"roll_link",child:"wrist_pitch_link",type:"revolute",origin:{xyz:[0,0,0],rpy:[-1.5707963267948966,-1.5707963267948966,0]},axis:[0,0,1],limit:{lower:-1.39626,upper:1.39626,velocity:.4,effort:1e3},mimic:null},{name:"wrist_yaw",parent:"wrist_pitch_link",child:"wrist_yaw_link",type:"revolute",origin:{xyz:[.0091,0,0],rpy:[-1.5707963267948966,-1.5707963267948966,0]},axis:[0,0,1],limit:{lower:-1.39626,upper:1.39626,velocity:.4,effort:1e3},mimic:null},{name:"jaw",parent:"wrist_yaw_link",child:"jaw_link",type:"revolute",origin:{xyz:[0,0,0],rpy:[0,0,0]},axis:[0,0,1],limit:{lower:-.349066,upper:1.39626,velocity:.4,effort:1e3},mimic:null},{name:"jaw_1",parent:"wrist_yaw_link",child:"jaw_1_link",type:"revolute",origin:{xyz:[0,0,0],rpy:[0,0,0]},axis:[0,0,1],limit:{lower:-1.5707,upper:1.5707,velocity:.4,effort:1e3},mimic:{joint:"jaw",multiplier:"0.5"}},{name:"jaw_2",parent:"wrist_yaw_link",child:"jaw_2_link",type:"revolute",origin:{xyz:[0,0,0],rpy:[0,0,0]},axis:[0,0,1],limit:{lower:-1.5707,upper:1.5707,velocity:.4,effort:1e3},mimic:{joint:"jaw",multiplier:"-0.5"}},{name:"tool_tip",parent:"wrist_yaw_link",child:"tool_tip_link",type:"fixed",origin:{xyz:[0,.0102,0],rpy:[0,1.5707963267948966,1.5707963267948966]},axis:[1,0,0],limit:null,mimic:null}],coverage:{meshes:10,triangles:80220,vertices:132925,shaftSlabs:1,distalSlabMaximum:.0035},capsules:[{id:"shaft-roll_link-0",link:"roll_link",region:"shaft",a:[-498e-10,-999e-10,-.5565920963],b:[-498e-10,-999e-10,-.0088236004],radius:.0045225717,source:["roll_link__visual_0_2"],slab:{axis:2,min:-.5565920963,max:-.0088236004}},{id:"wrist-roll_link-0",link:"roll_link",region:"wrist",a:[0,0,-.0088236004],b:[0,0,-.0058595503],radius:.0043533046,source:["roll_link__visual_0_0","roll_link__visual_0_1"],slab:{axis:2,min:-.0088236004,max:-.0058595503}},{id:"wrist-roll_link-1",link:"roll_link",region:"wrist",a:[0,0,-.0058595503],b:[0,0,-.0028955003],radius:.0043533046,source:["roll_link__visual_0_0","roll_link__visual_0_1"],slab:{axis:2,min:-.0058595503,max:-.0028955003}},{id:"wrist-roll_link-2",link:"roll_link",region:"wrist",a:[-155552e-10,0,-.0028955003],b:[-155552e-10,0,685498e-10],radius:.0043577448,source:["roll_link__visual_0_0","roll_link__visual_0_1"],slab:{axis:2,min:-.0028955003,max:685498e-10}},{id:"wrist-roll_link-3",link:"roll_link",region:"wrist",a:[-204989e-10,-28501e-10,685498e-10],b:[-204989e-10,-28501e-10,.0030325998],radius:.0043596401,source:["roll_link__visual_0_0","roll_link__visual_0_1"],slab:{axis:2,min:685498e-10,max:.0030325998}},{id:"wrist-wrist_pitch_link-0",link:"wrist_pitch_link",region:"wrist",a:[-.0030424001,-295e-8,83539e-10],b:[-.0001369199,-295e-8,83539e-10],radius:.0030052248,source:["wrist_pitch_link__visual_0_0","wrist_pitch_link__visual_0_1"],slab:{axis:0,min:-.0030424001,max:-.0001369199}},{id:"wrist-wrist_pitch_link-1",link:"wrist_pitch_link",region:"wrist",a:[-.0001369199,-122982e-10,-233616e-10],b:[.0027685603,-122982e-10,-233616e-10],radius:.0043469827,source:["wrist_pitch_link__visual_0_0","wrist_pitch_link__visual_0_1"],slab:{axis:0,min:-.0001369199,max:.0027685603}},{id:"wrist-wrist_pitch_link-2",link:"wrist_pitch_link",region:"wrist",a:[.0027685603,-1255e-8,-315501e-10],b:[.0056740405,-1255e-8,-315501e-10],radius:.0044526983,source:["wrist_pitch_link__visual_0_0","wrist_pitch_link__visual_0_1"],slab:{axis:0,min:.0027685603,max:.0056740405}},{id:"wrist-wrist_pitch_link-3",link:"wrist_pitch_link",region:"wrist",a:[.0056740405,-29519e-10,135e-8],b:[.0085795207,-29519e-10,135e-8],radius:.0039848776,source:["wrist_pitch_link__visual_0_0","wrist_pitch_link__visual_0_1"],slab:{axis:0,min:.0056740405,max:.0085795207}},{id:"wrist-wrist_pitch_link-4",link:"wrist_pitch_link",region:"wrist",a:[.0085795207,-3141e-9,398297e-10],b:[.0114850009,-3141e-9,398297e-10],radius:.0034524578,source:["wrist_pitch_link__visual_0_0","wrist_pitch_link__visual_0_1"],slab:{axis:0,min:.0085795207,max:.0114850009}},{id:"wrist-wrist_yaw_link-0",link:"wrist_yaw_link",region:"wrist",a:[5e-7,0,-.0028450001],b:[5e-7,0,-1145e-7],radius:.0007662518,source:["wrist_yaw_link__visual_0_0"],slab:{axis:2,min:-.0028450001,max:-1145e-7}},{id:"wrist-wrist_yaw_link-1",link:"wrist_yaw_link",region:"wrist",a:[0,0,-1145e-7],b:[0,0,.0026160001],radius:.0006453676,source:["wrist_yaw_link__visual_0_0"],slab:{axis:2,min:-1145e-7,max:.0026160001}},{id:"jaw-jaw_1_link-0",link:"jaw_1_link",region:"jaw",a:[13665e-10,-.002413,9775e-7],b:[13665e-10,0,9775e-7],radius:.0025698066,source:["jaw_1_link__visual_0_0","jaw_1_link__visual_0_1"],slab:{axis:1,min:-.002413,max:0}},{id:"jaw-jaw_1_link-1",link:"jaw_1_link",region:"jaw",a:[-438e-10,0,978e-6],b:[-438e-10,.002413,978e-6],radius:.0025700847,source:["jaw_1_link__visual_0_0","jaw_1_link__visual_0_1"],slab:{axis:1,min:0,max:.002413}},{id:"jaw-jaw_1_link-2",link:"jaw_1_link",region:"jaw",a:[-305e-6,.002413,.0004686268],b:[-305e-6,.004826,.0004686268],radius:.0020120718,source:["jaw_1_link__visual_0_0","jaw_1_link__visual_0_1"],slab:{axis:1,min:.002413,max:.004826}},{id:"jaw-jaw_1_link-3",link:"jaw_1_link",region:"jaw",a:[-.0007185684,.004826,-125893e-10],b:[-.0007185684,.0072389999,-125893e-10],radius:.0013882732,source:["jaw_1_link__visual_0_0","jaw_1_link__visual_0_1"],slab:{axis:1,min:.004826,max:.0072389999}},{id:"jaw-jaw_1_link-4",link:"jaw_1_link",region:"jaw",a:[-.0006046428,.0072389999,-125994e-10],b:[-.0006046428,.0096519999,-125994e-10],radius:.0011883406,source:["jaw_1_link__visual_0_0","jaw_1_link__visual_0_1"],slab:{axis:1,min:.0072389999,max:.0096519999}},{id:"jaw-jaw_2_link-0",link:"jaw_2_link",region:"jaw",a:[-13665e-10,-.002413,-.0010035],b:[-13665e-10,0,-.0010035],radius:.0025697198,source:["jaw_2_link__visual_0_0","jaw_2_link__visual_0_1"],slab:{axis:1,min:-.002413,max:0}},{id:"jaw-jaw_2_link-1",link:"jaw_2_link",region:"jaw",a:[438e-10,0,-.0010035],b:[438e-10,.002413,-.0010035],radius:.0025700413,source:["jaw_2_link__visual_0_0","jaw_2_link__visual_0_1"],slab:{axis:1,min:0,max:.002413}},{id:"jaw-jaw_2_link-2",link:"jaw_2_link",region:"jaw",a:[305e-6,.002413,-4945e-7],b:[305e-6,.004826,-4945e-7],radius:.0020114453,source:["jaw_2_link__visual_0_0","jaw_2_link__visual_0_1"],slab:{axis:1,min:.002413,max:.004826}},{id:"jaw-jaw_2_link-3",link:"jaw_2_link",region:"jaw",a:[.0007185684,.004826,-128542e-10],b:[.0007185684,.0072389999,-128542e-10],radius:.0013878273,source:["jaw_2_link__visual_0_0","jaw_2_link__visual_0_1"],slab:{axis:1,min:.004826,max:.0072389999}},{id:"jaw-jaw_2_link-4",link:"jaw_2_link",region:"jaw",a:[.0006046428,.0072389999,-126042e-10],b:[.0006046428,.0096519999,-126042e-10],radius:.0011881734,source:["jaw_2_link__visual_0_0","jaw_2_link__visual_0_1"],slab:{axis:1,min:.0072389999,max:.0096519999}}]},scissors:{units:"meters",margin:15e-5,source:"public/assets/scissors.glb",sourceSha256:"7856790eff485c89d2298b8be1a1e725a62087be25fce960190c679614794873",frame:"Each capsule a/b is in its named source URDF link coordinate system; transform with that animated link matrix.",fit:"Triangle-clipped axial slabs; radial bounding circle plus 0.15 mm. No TCP sphere or jaw-gap fill.",tipPositionAtZero:[-.0015999999999999977,-1047073013270987e-33,.4408],joints:[{name:"roll",parent:"adaptor_link",child:"roll_link",type:"revolute",origin:{xyz:[0,0,.4162],rpy:[0,0,0]},axis:[0,0,1],limit:{lower:-4.53786,upper:4.53786,velocity:.4,effort:1e3},mimic:null},{name:"wrist_pitch",parent:"roll_link",child:"wrist_pitch_link",type:"revolute",origin:{xyz:[0,0,0],rpy:[-1.5707963267948966,-1.5707963267948966,0]},axis:[0,0,1],limit:{lower:-1.39626,upper:1.39626,velocity:.4,effort:1e3},mimic:null},{name:"wrist_yaw",parent:"wrist_pitch_link",child:"wrist_yaw_link",type:"revolute",origin:{xyz:[.0091,0,0],rpy:[-1.5707963267948966,-1.5707963267948966,0]},axis:[0,0,1],limit:{lower:-1.39626,upper:1.39626,velocity:.4,effort:1e3},mimic:null},{name:"jaw",parent:"wrist_yaw_link",child:"jaw_link",type:"revolute",origin:{xyz:[0,0,0],rpy:[0,0,0]},axis:[0,0,1],limit:{lower:-.349066,upper:1.39626,velocity:.4,effort:1e3},mimic:null},{name:"jaw_1",parent:"wrist_yaw_link",child:"jaw_1_link",type:"revolute",origin:{xyz:[0,0,0],rpy:[0,0,0]},axis:[0,0,1],limit:{lower:-1.5707,upper:1.5707,velocity:.4,effort:1e3},mimic:{joint:"jaw",multiplier:"0.5"}},{name:"jaw_2",parent:"wrist_yaw_link",child:"jaw_2_link",type:"revolute",origin:{xyz:[0,0,0],rpy:[0,0,0]},axis:[0,0,1],limit:{lower:-1.5707,upper:1.5707,velocity:.4,effort:1e3},mimic:{joint:"jaw",multiplier:"-0.5"}},{name:"tool_tip",parent:"wrist_yaw_link",child:"tool_tip_link",type:"fixed",origin:{xyz:[0,.0155,-.0016],rpy:[0,1.5707963267948966,1.5707963267948966]},axis:[1,0,0],limit:null,mimic:null}],coverage:{meshes:8,triangles:46946,vertices:32248,shaftSlabs:1,distalSlabMaximum:.0035},capsules:[{id:"shaft-roll_link-0",link:"roll_link",region:"shaft",a:[-498e-10,-999e-10,-.5565920963],b:[-498e-10,-999e-10,-.0088236004],radius:.0045225717,source:["roll_link__visual_0_2"],slab:{axis:2,min:-.5565920963,max:-.0088236004}},{id:"wrist-roll_link-0",link:"roll_link",region:"wrist",a:[0,0,-.0088236004],b:[0,0,-.0058595503],radius:.0043533046,source:["roll_link__visual_0_0","roll_link__visual_0_1"],slab:{axis:2,min:-.0088236004,max:-.0058595503}},{id:"wrist-roll_link-1",link:"roll_link",region:"wrist",a:[0,0,-.0058595503],b:[0,0,-.0028955003],radius:.0043533046,source:["roll_link__visual_0_0","roll_link__visual_0_1"],slab:{axis:2,min:-.0058595503,max:-.0028955003}},{id:"wrist-roll_link-2",link:"roll_link",region:"wrist",a:[-155552e-10,0,-.0028955003],b:[-155552e-10,0,685498e-10],radius:.0043577448,source:["roll_link__visual_0_0","roll_link__visual_0_1"],slab:{axis:2,min:-.0028955003,max:685498e-10}},{id:"wrist-roll_link-3",link:"roll_link",region:"wrist",a:[-204989e-10,-28501e-10,685498e-10],b:[-204989e-10,-28501e-10,.0030325998],radius:.0043596401,source:["roll_link__visual_0_0","roll_link__visual_0_1"],slab:{axis:2,min:685498e-10,max:.0030325998}},{id:"wrist-wrist_pitch_link-0",link:"wrist_pitch_link",region:"wrist",a:[-.0030424001,-295e-8,83539e-10],b:[-.0001369199,-295e-8,83539e-10],radius:.0030052248,source:["wrist_pitch_link__visual_0_0","wrist_pitch_link__visual_0_1"],slab:{axis:0,min:-.0030424001,max:-.0001369199}},{id:"wrist-wrist_pitch_link-1",link:"wrist_pitch_link",region:"wrist",a:[-.0001369199,-122982e-10,-233616e-10],b:[.0027685603,-122982e-10,-233616e-10],radius:.0043469827,source:["wrist_pitch_link__visual_0_0","wrist_pitch_link__visual_0_1"],slab:{axis:0,min:-.0001369199,max:.0027685603}},{id:"wrist-wrist_pitch_link-2",link:"wrist_pitch_link",region:"wrist",a:[.0027685603,-1255e-8,-315501e-10],b:[.0056740405,-1255e-8,-315501e-10],radius:.0044526983,source:["wrist_pitch_link__visual_0_0","wrist_pitch_link__visual_0_1"],slab:{axis:0,min:.0027685603,max:.0056740405}},{id:"wrist-wrist_pitch_link-3",link:"wrist_pitch_link",region:"wrist",a:[.0056740405,-29519e-10,135e-8],b:[.0085795207,-29519e-10,135e-8],radius:.0039848776,source:["wrist_pitch_link__visual_0_0","wrist_pitch_link__visual_0_1"],slab:{axis:0,min:.0056740405,max:.0085795207}},{id:"wrist-wrist_pitch_link-4",link:"wrist_pitch_link",region:"wrist",a:[.0085795207,-3141e-9,398297e-10],b:[.0114850009,-3141e-9,398297e-10],radius:.0034524578,source:["wrist_pitch_link__visual_0_0","wrist_pitch_link__visual_0_1"],slab:{axis:0,min:.0085795207,max:.0114850009}},{id:"wrist-wrist_yaw_link-0",link:"wrist_yaw_link",region:"wrist",a:[5e-7,0,-.0028450001],b:[5e-7,0,-1145e-7],radius:.0007662518,source:["wrist_yaw_link__visual_0_0"],slab:{axis:2,min:-.0028450001,max:-1145e-7}},{id:"wrist-wrist_yaw_link-1",link:"wrist_yaw_link",region:"wrist",a:[0,0,-1145e-7],b:[0,0,.0026160001],radius:.0006453676,source:["wrist_yaw_link__visual_0_0"],slab:{axis:2,min:-1145e-7,max:.0026160001}},{id:"jaw-jaw_1_link-0",link:"jaw_1_link",region:"jaw",a:[226e-10,-.0024076721,-.0005896195],b:[226e-10,.0001685876,-.0005896195],radius:.0026707101,source:["jaw_1_link__visual_0_0"],slab:{axis:1,min:-.0024076721,max:.0001685876}},{id:"jaw-jaw_1_link-1",link:"jaw_1_link",region:"jaw",a:[227e-10,.0001685876,-787659e-9],b:[227e-10,.0027448473,-787659e-9],radius:.0026815932,source:["jaw_1_link__visual_0_0"],slab:{axis:1,min:.0001685876,max:.0027448473}},{id:"jaw-jaw_1_link-2",link:"jaw_1_link",region:"jaw",a:[737852e-10,.0027448473,-.0007912751],b:[737852e-10,.005321107,-.0007912751],radius:.0022984057,source:["jaw_1_link__visual_0_0"],slab:{axis:1,min:.0027448473,max:.005321107}},{id:"jaw-jaw_1_link-3",link:"jaw_1_link",region:"jaw",a:[.0002649039,.005321107,-.0008890279],b:[.0002649039,.0078973666,-.0008890279],radius:.0016869244,source:["jaw_1_link__visual_0_0"],slab:{axis:1,min:.005321107,max:.0078973666}},{id:"jaw-jaw_1_link-4",link:"jaw_1_link",region:"jaw",a:[.0002053284,.0078973666,-.0004309969],b:[.0002053284,.0104736263,-.0004309969],radius:.001392067,source:["jaw_1_link__visual_0_0"],slab:{axis:1,min:.0078973666,max:.0104736263}},{id:"jaw-jaw_1_link-5",link:"jaw_1_link",region:"jaw",a:[.0001650363,.0104736263,.0006257144],b:[.0001650363,.013049886,.0006257144],radius:.0013893755,source:["jaw_1_link__visual_0_0"],slab:{axis:1,min:.0104736263,max:.013049886}},{id:"jaw-jaw_2_link-0",link:"jaw_2_link",region:"jaw",a:[196e-10,-.0024076739,864373e-9],b:[196e-10,.0001652364,864373e-9],radius:.0026680451,source:["jaw_2_link__visual_0_0"],slab:{axis:1,min:-.0024076739,max:.0001652364}},{id:"jaw-jaw_2_link-1",link:"jaw_2_link",region:"jaw",a:[195e-10,.0001652364,.001029989],b:[195e-10,.0027381467,.001029989],radius:.0026753456,source:["jaw_2_link__visual_0_0"],slab:{axis:1,min:.0001652364,max:.0027381467}},{id:"jaw-jaw_2_link-2",link:"jaw_2_link",region:"jaw",a:[-74203e-9,.0027381467,.0007373468],b:[-74203e-9,.005311057,.0007373468],radius:.0022558234,source:["jaw_2_link__visual_0_0"],slab:{axis:1,min:.0027381467,max:.005311057}},{id:"jaw-jaw_2_link-3",link:"jaw_2_link",region:"jaw",a:[-.0002386938,.005311057,.0003599046],b:[-.0002386938,.0078839674,.0003599046],radius:.0016617499,source:["jaw_2_link__visual_0_0"],slab:{axis:1,min:.005311057,max:.0078839674}},{id:"jaw-jaw_2_link-4",link:"jaw_2_link",region:"jaw",a:[-.0001864839,.0078839674,.0005660181],b:[-.0001864839,.0104568777,.0005660181],radius:.0014790598,source:["jaw_2_link__visual_0_0"],slab:{axis:1,min:.0078839674,max:.0104568777}},{id:"jaw-jaw_2_link-5",link:"jaw_2_link",region:"jaw",a:[-.0001506457,.0104568777,.0012790946],b:[-.0001506457,.013029788,.0012790946],radius:.0013140326,source:["jaw_2_link__visual_0_0"],slab:{axis:1,min:.0104568777,max:.013029788}}]}}),Vr=[0,0,1],sa=[0,0,0,1],ic=(i,e)=>i.map((t,n)=>t+e[n]),Hr=(i,e)=>i.map((t,n)=>t-e[n]),Wd=(i,e)=>i.reduce((t,n,s)=>t+n*e[s],0),sc=(i,e)=>[i[1]*e[2]-i[2]*e[1],i[2]*e[0]-i[0]*e[2],i[0]*e[1]-i[1]*e[0]],qs=(i,e=Vr)=>{const t=Math.hypot(...i);return t>1e-12?i.map(n=>n/t):[...e]};function Ls(i,e){return[i[3]*e[0]+i[0]*e[3]+i[1]*e[2]-i[2]*e[1],i[3]*e[1]-i[0]*e[2]+i[1]*e[3]+i[2]*e[0],i[3]*e[2]+i[0]*e[1]-i[1]*e[0]+i[2]*e[3],i[3]*e[3]-i[0]*e[0]-i[1]*e[1]-i[2]*e[2]]}function Di(i,e){const t=sc(e,i).map(s=>s*2),n=sc(e,t);return i.map((s,r)=>s+e[3]*t[r]+n[r])}function Dx(i,e){const t=Math.sin(e*.5);return[...i.map(n=>n*t),Math.cos(e*.5)]}function Hc(i,e){let t=Wd(i,e)+1,n;return t<1e-12?n=Math.abs(i[0])>Math.abs(i[2])?[-i[1],i[0],0,0]:[0,-i[2],i[1],0]:n=[...sc(i,e),t],qs(n,sa)}function Xd(i,e,t){if(t<=0)return[...i];if(t>=1)return[...e];let n=Wd(i,e);if(n<0&&(e=e.map(o=>-o),n=-n),n>1-1e-10)return qs(i.map((o,a)=>o+(e[a]-o)*t),sa);const s=Math.acos(Math.min(1,n)),r=Math.sin(s);return i.map((o,a)=>(o*Math.sin((1-t)*s)+e[a]*Math.sin(t*s))/r)}function Ix([i,e,t]){const n=Math.cos(i/2),s=Math.sin(i/2),r=Math.cos(e/2),o=Math.sin(e/2),a=Math.cos(t/2),l=Math.sin(t/2);return[s*r*a-n*o*l,n*o*a+s*r*l,n*r*l-s*o*a,n*r*a+s*o*l]}const Lx=Object.fromEntries(Object.entries(Gd).map(([i,e])=>[i,{...e,joints:e.joints.map(t=>({...t,rest:Ix(t.origin.rpy)}))}])),jd=i=>i.instrument??(i.port[0]<0?"needle-driver":"scissors");function qd(i,e=i.alignment){let t=Array.isArray(e)&&e.length===4?[...e]:Hc(Vr,qs(Hr(i.position,i.port)));return Math.abs(Math.hypot(...t)-1)>1e-12&&(t=qs(t,sa)),t}function Nx(i,e=i.alignment){let t=qd(i,e);const n=Hr(i.position,i.port),s=Math.hypot(...n);if(s>.003){const r=Di(Vr,t),o=qs(n);if(Math.hypot(...Hr(r,o))>1e-12){const a=Ls(Hc(r,o),t),l=Math.max(0,Math.min(1,(s-.003)/.017));t=l===1?a:Xd(t,a,l*l*(3-2*l))}}return t}function ui(i){const e=Lx[jd(i)],t={adaptor_link:{position:[0,0,0],quaternion:sa}},n={roll:i.wrist?.[2]??0,wrist_pitch:i.wrist?.[0]??0,wrist_yaw:i.wrist?.[1]??0,jaw:Math.max(0,Math.min(1,i.jaw??0))*1.1};for(const d of e.joints){const f=t[d.parent];if(!f)throw new Error("Invalid source instrument link hierarchy");const g=d.mimic?n[d.mimic.joint]*Number(d.mimic.multiplier):n[d.name]??0,_=d.type==="fixed"?d.rest:Ls(d.rest,Dx(d.axis,g));t[d.child]={position:ic(f.position,Di(d.origin.xyz,f.quaternion)),quaternion:Ls(f.quaternion,_)}}const s=t.tool_tip_link.position,r=Hr(i.position,i.port),o=Math.hypot(...r),a=qd(i),l=s[0]**2+s[1]**2,c=qs([s[0],s[1],Math.sqrt(Math.max(1e-10,o*o-l))]),h=Ls(a,Hc(c,Vr));return{position:Hr(i.position,Di(s,h)),quaternion:h,alignment:a,links:t,localTip:s,shaftDirection:Di(Vr,h),rcmFeasible:o*o+1e-12>=l}}function Er(i,e=ui(i)){return Gd[jd(i)].capsules.map(n=>{const s=e.links[n.link],r=c=>ic(e.position,Di(ic(s.position,Di(c,s.quaternion)),e.quaternion)),o=r(n.a),a=r(n.b),l=n.radius;return{a:o,b:a,radius:l,id:n.id,part:n.region,min:o.map((c,h)=>Math.min(c,a[h])-l),max:o.map((c,h)=>Math.max(c,a[h])+l)}})}const Gr=(i,e)=>i.map((t,n)=>t-e[n]),Ar=(i,e)=>i.reduce((t,n,s)=>t+n*e[s],0),Ei=(i,e,t)=>Math.max(e,Math.min(t,i)),Xi=(i,e)=>Math.hypot(...Gr(i,e)),qo=(i,e,t)=>i.map((n,s)=>n+(e[s]-n)*t),cr=(i,e)=>[i[1]*e[2]-i[2]*e[1],i[2]*e[0]-i[0]*e[2],i[0]*e[1]-i[1]*e[0]],gr=(i,e=[0,0,-1])=>{const t=Math.hypot(...i);return t>1e-12?i.map(n=>n/t):e},Ux=(i,e)=>2*Math.atan2(Math.hypot(...Ls(e,[-i[0],-i[1],-i[2],i[3]]).slice(0,3)),Math.abs(Ar(i,e)));function Yd(i,e,t,n){const s=e[0]-i[0],r=e[1]-i[1],o=e[2]-i[2],a=n[0]-t[0],l=n[1]-t[1],c=n[2]-t[2],h=i[0]-t[0],u=i[1]-t[1],d=i[2]-t[2],f=s*s+r*r+o*o,g=a*a+l*l+c*c,_=a*h+l*u+c*d;let m=0,p=0;if(f<=1e-20)p=g<=1e-20?0:Ei(_/g,0,1);else{const M=s*h+r*u+o*d;if(g<=1e-20)m=Ei(-M/f,0,1);else{const y=s*a+r*l+o*c,S=f*g-y*y;S>1e-20&&(m=Ei((y*_-M*g)/S,0,1)),p=(y*m+_)/g,p<0?(p=0,m=Ei(-M/f,0,1)):p>1&&(p=1,m=Ei((y-M)/f,0,1))}}return{one:m,two:p,distance:Math.hypot(h+s*m-a*p,u+r*m-l*p,d+o*m-c*p)}}function Fo(i,e,t,n){return Yd(i,e,t,n).distance}function Fx(i,e){let t=0;for(let n=0;n<3;n++){const s=Math.max(0,i.min[n]-e.max[n],e.min[n]-i.max[n]);t+=s*s}return Math.sqrt(t)}function rc(i,e,t=null,n=!1){let s=1/0,r=null;for(let c=0;c<i.length;c++)for(let h=0;h<e.length;h++){const u=i[c],d=e[h],f=t?.[c*e.length+h]??0;if(f===-1/0)continue;const g=Fx(u,d);if(!t&&s>=0&&g>0&&g>=s)continue;const _=Yd(u.a,u.b,d.a,d.b),m=_.distance-u.radius-d.radius-f;m<s&&(s=m,r={a:u,b:d,..._})}if(!n)return s;if(!r)return{clearance:s,pair:null,closestPoints:null};const o=qo(r.a.a,r.a.b,r.one),a=qo(r.b.a,r.b.b,r.two),l=gr(Gr(a,o),[1,0,0]);return{clearance:s,pair:{left:r.a,right:r.b},closestPoints:{left:o.map((c,h)=>c+l[h]*r.a.radius),right:a.map((c,h)=>c-l[h]*r.b.radius)}}}function Ox(i,e){const t=ui(i),n=ui(e),s=rc(Er(i,t),Er(e,n),null,!0);if(s.pair)for(const[r,o,a]of[["left",i,t],["right",e,n]]){const l=s.pair[r],c=s.closestPoints[r];s.pair[r]={part:l.part,id:l.id,section:l.part==="shaft"?Ar(Gr(c,o.port),a.shaftDirection)<0?"outside":"inside":"distal"}}return s}function kx(i,e){const t=R=>gr(Gr(R.position,R.port),R.shaftDirection),n=t(i),s=t(e),r=Math.atan2(Math.hypot(...cr(n,s)),Ei(Ar(n,s),-1,1)),o=Xi(i.position,i.port),a=Xi(e.position,i.port),l=Xi(i.position,e.position),c=Fo(i.port,i.port,i.position,e.position)<1e-7&&r>1e-12,h=gr(cr(n,s),gr(cr(n,Math.abs(n[0])<.8?[1,0,0]:[0,1,0]))),u=i.wrist.reduce((R,v,x)=>R+Math.abs(e.wrist[x]-v),0),d=1.1*Math.abs(e.jaw-i.jaw),f=Math.abs(e.wrist[0]-i.wrist[0])+Math.abs(e.wrist[1]-i.wrist[1]),g=Math.abs(e.wrist[2]-i.wrist[2]),_=ui(i),m=_.localTip,p=ui(e).localTip,M=_.alignment,y=l===0?M:Nx(e,M),S=!c&&r>1e-12&&Fo(i.port,i.port,i.position,e.position)>=.02&&Xi(Di([0,0,1],M),n)<1e-9&&Xi(Di([0,0,1],y),s)<1e-9,P=(R,v,x)=>{const A=Math.cos(x),D=Math.sin(x),U=cr(v,R),L=Ar(v,R);return R.map((k,F)=>k*A+U[F]*D+v[F]*L*(1-A))},E=R=>{let v;R<=0?v=[...i.position]:R>=1?v=[...e.position]:c?v=P(n,h,r*R).map((U,L)=>i.port[L]+U*(o+(a-o)*R)):v=qo(i.position,e.position,R);const x=gr(Gr(v,i.port)),A=S?Ei(Math.atan2(Math.hypot(...cr(n,x)),Ei(Ar(n,x),-1,1))/r,0,1):R,D=c?Ls([...h.map(U=>U*Math.sin(r*R/2)),Math.cos(r*R/2)],M):Xd(M,y,A);return{...i,position:v,alignment:D,wrist:qo(i.wrist,e.wrist,R),jaw:i.jaw+(e.jaw-i.jaw)*R}};return{pose:E,bound:(R,v)=>{const x=v-R;if(x<=0)return 0;const A=E(R),D=E(v),U=c?r*x:Ux(A.alignment,D.alignment),L=Xi(A.position,i.port),k=Xi(D.position,i.port),F=c?Math.min(L,k):Fo(i.port,i.port,A.position,D.position),q=Math.max(L,k),V=c?Math.abs(a-o)*x:l*x,K=f>1e-14?.035:Math.max(Math.hypot(m[0],m[1]),Math.hypot(p[0],p[1])),ee=(.035*f+K*g)*x;let ce;if(F>K+1e-6){const Te=K/F;ce=3*(ee/F+K*V/(F*F))/Math.sqrt(1-Te*Te)}else ce=Math.min(Math.PI,4*(ee+Math.sqrt(2*q*V+2*K*ee))/Math.max(1e-5,F));return(c?Math.abs(a-o)*x:l*x)+.65*(U+ce)+.035*(u+d)*x+1e-12}}}function Bx(i,e,t){const n=kx(i,e),s=Er(t),r=Er(i),o=1e-7;if(n.bound(0,1)<2e-12)return{tool:n.pose(1),limited:!1};let l=null;if(rc(r,s)<0){l=[];for(const u of r)for(const d of s){const f=Fo(u.a,u.b,d.a,d.b)-u.radius-d.radius;l.push(f<=-u.radius-d.radius+o?-1/0:Math.min(0,f))}}const c=u=>rc(Er(n.pose(u)),s,l);let h=0;for(let u=0;u<2048;u++){const d=c(h),f=1-h,g=n.bound(h,1);if(d>=g+1e-12)return{tool:n.pose(1),limited:!1};let _=h,m=1;const p=Math.max(d*.8,d<2e-5?5e-5:0);for(let M=0;M<30;M++){const y=(_+m)*.5;n.bound(h,y)<=p?_=y:m=y}if(_-h<1e-12)return{tool:n.pose(h),limited:!0,reason:"motion-resolution"};if(d<2e-5&&c(_)<0){let y=h,S=_;for(let P=0;P<28;P++){const E=(y+S)*.5;c(E)>=0?y=E:S=E}return{tool:n.pose(y),limited:!0,reason:"instrument-contact"}}if(h=_,f<1e-12||h>=1-1e-12)return{tool:n.pose(1),limited:!1}}return{tool:n.pose(h),limited:!0,reason:"motion-resolution"}}const kt=Object.freeze({workingDistance:.065,minimumWorkingDistance:.028,maximumWorkingDistance:.13,insertionSpeed:.035,insertionSmoothing:4.5,defaultFov:55,minimumFov:25,maximumFov:80}),Ji=i=>Array.isArray(i)&&i.length===3&&i.every(Number.isFinite),To=(i,e,t)=>Math.min(t,Math.max(e,i)),Su=(i,e)=>Math.hypot(...i.map((t,n)=>t-e[n])),hr=i=>[...i];function oc(i){return!!i&&Ji(i.min)&&Ji(i.max)&&i.min.every((e,t)=>e<=i.max[t])}function zx({port:i,intentTarget:e,surfaceTarget:t=null,fieldAnchor:n=null,organBounds:s=null,heldSpecimen:r=null,viewMode:o="field",depthBias:a=0,followMode:l="active",fovDegrees:c=kt.defaultFov,aspect:h=1,minimumDepth:u=.018,maximumDepth:d=.135}={}){if(!Ji(i)||!Ji(e)||!Number.isFinite(a)||!Number.isFinite(h)||h<=0||!Number.isFinite(c))throw new TypeError("Invalid scope framing inputs.");let f,g,_,m;if(o==="specimen"&&Ji(r?.position)){g=hr(r.position),f=hr(e),m="specimen";const P=Number.isFinite(r.radius)&&r.radius>0?r.radius:.009,E=To(c,30,100)*Math.PI/180,C=Math.tan(E/2)*Math.min(1,h);_=Math.max(.03,(P+Su(g,f))/(.78*C))}else{if(g=Ji(t)?hr(t):Ji(n)?hr(n):null,!g&&oc(s)&&(g=e.map((P,E)=>To(P,s.min[E],s.max[E]))),!g)return null;m=l==="active"?"active-tip":l==="midpoint"?"instrument-midpoint":"cooperative-target",f=hr(e),_=kt.workingDistance}const p=Su(i,f),M=To(_-a,kt.minimumWorkingDistance,Math.max(kt.maximumWorkingDistance,_,p-u)),y=p-_,S=To(p-M,u,d);return{target:f,anchor:g,source:m,baseWorkingDistance:_,workingDistance:M,baseDepth:y,depthTarget:S,targetDistance:p,viewMode:m==="specimen"?"specimen":"field",insertionLimited:S<p-M-1e-9,retractionLimited:S>p-M+1e-9,framingLimited:Math.abs(S-(p-M))>1e-9}}function Vx(i,e,t){if(![i,e,t].every(Number.isFinite)||t<0)throw new TypeError("Invalid scope insertion update.");const n=e-i,s=Math.sign(n),r=Math.abs(n),o=kt.insertionSpeed,a=kt.insertionSmoothing,l=o/a;if(r<=l)return e-n*Math.exp(-a*t);const c=(r-l)/o;return t<=c?i+s*o*t:e-s*l*Math.exp(-a*(t-c))}const Xt=Object.freeze({scopeDepth:Object.freeze([.018,.135]),workingDistance:.028,collisionTolerance:1e-7,shaftLengths:Object.freeze({left:.4355,right:.4408}),maxFrameTime:.1,history:40}),ei=Object.freeze({translation:.035,wrist:.8,jaw:1.1,scopeDepth:.026,scopeRotation:.55,fineFactor:.04,startFactor:.045,accelerationDelay:.12,accelerationTime:.85,followSmoothing:5,followMaxRadiansPerSecond:.9}),Ts=i=>typeof structuredClone=="function"?structuredClone(i):JSON.parse(JSON.stringify(i)),rn=(i,e,t)=>Math.min(t,Math.max(e,i)),Rt=i=>typeof i=="number"&&Number.isFinite(i),Bt=i=>Array.isArray(i)&&i.length===3&&i.every(Rt),Yo=(i,e)=>Math.hypot(i[0]-e[0],i[1]-e[1],i[2]-e[2]),Ss=(i,e,t=1e-10)=>i.every((n,s)=>Math.abs(n-e[s])<t),Rr=["left","right"],wu=[...Rr,"scope"],Hx={x:0,y:1,z:2},bu=i=>Math.atan2(Math.sin(i),Math.cos(i)),Ko=(i,e)=>i.map((t,n)=>t+e[n]),_r=(i,e)=>i.map((t,n)=>t-e[n]),Qi=(i,e)=>i.map(t=>t*e),qr=(i,e)=>i.reduce((t,n,s)=>t+n*e[s],0),ra=(i,e)=>[i[1]*e[2]-i[2]*e[1],i[2]*e[0]-i[0]*e[2],i[0]*e[1]-i[1]*e[0]],pn=(i,e=[0,0,-1])=>{const t=Math.hypot(...i);return t>1e-12?Qi(i,1/t):[...e]},Tu=(i,e,t)=>i.map((n,s)=>n+(e[s]-n)*t),Eu=["active","midpoint","grasp"];function Gx(i,e,t,n=!1){if(![i,e,t].every(Rt)||i<0||e<0||t<0)throw new TypeError("Invalid control integration.");if(n)return e*t*ei.fineFactor;const{startFactor:s,accelerationDelay:r,accelerationTime:o}=ei,a=l=>{const c=rn((l-r)/o,0,1);return t*(s*l+(1-s)*(o*(c**3-.5*c**4)+Math.max(0,l-r-o)))};return a(i+e)-a(i)}function Oo(i,e=!1,t=null,n=null){const s=Ox(i.left,i.right);return{...s,active:e,blocked:e,contact:s.clearance<=25e-5,selected:e?t:null,reason:e?n:null}}function Ya(i){(i.collision?.blocked||i.collision?.active)&&(i.collision={...i.collision,active:!1,blocked:!1,selected:null,reason:null})}function Cr(i,e=[0,1,0]){const t=_r(e,Qi(i,qr(e,i)));return Math.hypot(...t)>1e-8?pn(t):pn(ra(i,Math.abs(i[0])<.8?[1,0,0]:[0,0,1]))}function ac(i,e,t){const n=Math.cos(t),s=Math.sin(t);return Ko(Ko(Qi(i,n),Qi(ra(e,i),s)),Qi(e,qr(e,i)*(1-n)))}function Wx(i,e,t,n){const s=Math.acos(rn(qr(i,e),-1,1));if(s<1e-10)return[...e];const r=Math.min(s,ei.followMaxRadiansPerSecond*t);if(r===s)return pn(e);const o=pn(ra(i,e),Cr(i,n));return pn(ac(i,o,r))}const lc=Object.freeze({left:{port:[-.08,1.18,.1],position:[-.025,1.105,0],wrist:[0,0,0],jaw:.6},right:{port:[.08,1.18,.1],position:[.025,1.108,0],wrist:[0,0,0],jaw:.6}}),vr=Object.freeze([0,1.18,.14]);function Ka(){const i=[...lc.left.position],e=i[0]-vr[0],t=i[1]-vr[1],n=i[2]-vr[2],s={selected:"left",activeTool:"left",paused:!1,cutting:!1,elapsed:0,tools:Ts(lc),scope:{port:[...vr],position:[0,0,0],target:i,lookAt:[...i],depth:rn(Math.hypot(e,t,n)-kt.workingDistance,...Xt.scopeDepth),yaw:Math.atan2(e,-n),pitch:Math.atan2(-t,Math.hypot(e,n)),roll:0,fov:kt.defaultFov,follow:!0,followMode:"active",graspTarget:null,operating:!1,direction:pn([e,t,n]),up:[0,1,0],cameraUp:[0,1,0],viewMode:"field",depthBias:0,surfaceTarget:null,fieldAnchor:null,organBounds:null,heldSpecimen:null,framingSource:null,framingLimited:!1,targetWorkingDistance:kt.workingDistance,autoDepthTarget:null,intentTarget:[...i]}};for(const r of Rr){s.tools[r].shaftLength=Xt.shaftLengths[r],s.tools[r].instrument=r==="left"?"needle-driver":"scissors";const o=ui(s.tools[r]);s.tools[r].alignment=o.alignment,s.tools[r].shaftDirection=o.shaftDirection}return s.collision=Oo(s.tools),Si(s),s}function Xx(i){return[Math.sin(i.yaw)*Math.cos(i.pitch),-Math.sin(i.pitch),-Math.cos(i.yaw)*Math.cos(i.pitch)]}function Si(i,e){const t=i.scope;t.port=[...vr];const n=t.follow?Yo(t.target,t.port):.19,s=Math.max(Xt.scopeDepth[0],Math.min(Xt.scopeDepth[1],n-Xt.workingDistance));t.depth=rn(t.depth,Xt.scopeDepth[0],s);const r=pn(e||Xx(t)),o=Bt(t.direction)?pn(t.direction):r,a=Cr(o,t.up),l=ra(o,r),c=Math.acos(rn(qr(o,r),-1,1));t.up=c>1e-10?Cr(r,ac(a,pn(l,a),c)):Cr(r,a),t.direction=r,t.cameraUp=pn(ac(t.up,r,t.roll)),t.position=t.port.map((h,u)=>h+r[u]*t.depth),t.lookAt=t.port.map((h,u)=>h+r[u]*Math.max(n,t.depth+Xt.workingDistance)),t.follow||(t.target=[...t.lookAt]),t.actualWorkingDistance=Yo(t.position,t.target)}function Au(i,e){if(!Bt(i)||!Bt(e))throw new TypeError("Tool position and port require three finite numbers.");return[...i]}function jx(i){const e=i instanceof Set?i:new Set(i||[]),t=new Set,n={" ":"Space",Spacebar:"Space",Shift:"ShiftLeft",1:"Digit1",2:"Digit2",3:"Digit3","[":"BracketLeft","]":"BracketRight",w:"KeyW",s:"KeyS",a:"KeyA",d:"KeyD",q:"KeyQ",e:"KeyE",z:"KeyZ",x:"KeyX",c:"KeyC",v:"KeyV"};for(const s of e)typeof s=="string"&&t.add(n[s]||n[s.toLowerCase()]||s);return t}const xi=(i,e,t)=>Number(i.has(e))-Number(i.has(t));class qx{constructor({onEvent:e,getExtraData:t}={}){this.state=Ka(),this.undoStack=[],this.redoStack=[],this._listeners=new Set,typeof e=="function"&&this._listeners.add(e),this._previousKeys=new Set,this._gesture=!1,this._events=[],this._limitCooldown=0,this._controlAges=new Map,this.getExtraData=typeof t=="function"?t:void 0,this.viewAspect=1}onEvent(e){if(typeof e!="function")throw new TypeError("Event listener must be a function.");return this._listeners.add(e),()=>this._listeners.delete(e)}_emit(e,t={}){const n={type:e,...t};this._events.push(n);for(const s of this._listeners)s(n);return n}get canUndo(){return this.undoStack.length>0}get canRedo(){return this.redoStack.length>0}get selectedTool(){return this.state.tools[this.state.activeTool]}snapshot(){return Ts({version:1,state:this.state})}restore(e){const t=Ts(e?.state??e);if(!t||!wu.includes(t.selected)||!Rr.includes(t.activeTool)||!Rt(t.elapsed))throw new TypeError("Invalid simulation snapshot.");for(const s of Rr){const r=t.tools?.[s];if(!r||!Bt(r.position)||!Bt(r.wrist)||!Rt(r.jaw))throw new TypeError(`Invalid ${s} tool snapshot.`);if(r.port=[...lc[s].port],r.shaftLength=Xt.shaftLengths[s],r.position=Au(r.position,r.port),r.shaftDirection!==void 0&&(!Bt(r.shaftDirection)||Math.hypot(...r.shaftDirection)<1e-10))throw new TypeError(`Invalid ${s} shaft direction.`);if(r.instrument=s==="left"?"needle-driver":"scissors",r.alignment!==void 0&&(!Array.isArray(r.alignment)||r.alignment.length!==4||!r.alignment.every(Rt)||Math.hypot(...r.alignment)<1e-10))throw new TypeError(`Invalid ${s} tool frame.`);const o=ui(r);r.alignment=o.alignment,r.shaftDirection=o.shaftDirection,r.jaw=rn(r.jaw,0,1)}const n=t.scope;if(!n||!Bt(n.target)||!["depth","yaw","pitch","roll"].every(s=>Rt(n[s]))||!Eu.includes(n.followMode))throw new TypeError("Invalid scope snapshot.");if(t.paused=!!t.paused,t.cutting=!!t.cutting,n.follow=!!n.follow,n.graspTarget!=null&&!Bt(n.graspTarget))throw new TypeError("Invalid scope grasp target.");if(n.graspTarget??=null,n.operating=!!n.operating,n.fov??=kt.defaultFov,!Rt(n.fov)||n.fov<kt.minimumFov||n.fov>kt.maximumFov)throw new TypeError("Invalid scope optical FOV.");if(n.viewMode??="field",n.depthBias??=0,n.surfaceTarget??=null,n.fieldAnchor??=n.surfaceTarget?[...n.surfaceTarget]:null,n.organBounds??=null,n.heldSpecimen??=null,n.framingSource??=null,n.targetWorkingDistance??=kt.workingDistance,n.framingLimited=!!n.framingLimited,n.autoDepthTarget??=null,n.intentTarget??=[...n.target],!["field","specimen"].includes(n.viewMode)||!Rt(n.depthBias)||n.surfaceTarget!==null&&!Bt(n.surfaceTarget)||n.fieldAnchor!==null&&!Bt(n.fieldAnchor)||n.organBounds!==null&&!oc(n.organBounds)||!Bt(n.intentTarget)||n.heldSpecimen!==null&&(!Bt(n.heldSpecimen.position)||!Rt(n.heldSpecimen.radius)||n.heldSpecimen.radius<0))throw new TypeError("Invalid scope anatomical framing snapshot.");return t.elapsed=Math.max(0,t.elapsed),t.collision=Oo(t.tools),Si(t),this.state=t,this._gesture=!1,this._previousKeys.clear(),this._controlAges.clear(),this._emit("restore"),this.state}checkpoint(e="操作",t){this.undoStack.push({label:String(e),snapshot:this.snapshot(),extraData:t===void 0?void 0:Ts(t)}),this.undoStack.length>Xt.history&&this.undoStack.shift(),this.redoStack.length=0,this._emit("history",{canUndo:!0,canRedo:!1})}_travelHistory(e,t,n,s){if(!e.length)return null;const r=e.pop();t.push({label:r.label,snapshot:this.snapshot(),extraData:n===void 0?void 0:Ts(n)});const o=this.state.paused;this.restore(r.snapshot),this.state.paused=o;const a={label:r.label,extraData:r.extraData===void 0?void 0:Ts(r.extraData),hasExtraData:r.extraData!==void 0};return this._emit(s,a),this._emit("history",{canUndo:this.canUndo,canRedo:this.canRedo}),a}undo(e){return this._travelHistory(this.undoStack,this.redoStack,e,"undo")}redo(e){return this._travelHistory(this.redoStack,this.undoStack,e,"redo")}reset(){return this.state=Ka(),this.undoStack.length=this.redoStack.length=0,this._previousKeys.clear(),this._gesture=!1,this._controlAges.clear(),this._emit("reset"),this._emit("history",{canUndo:!1,canRedo:!1}),this.state}setSelected(e){return this.select(e)}select(e){if(!wu.includes(e))throw new RangeError(`Unknown selection: ${e}`);return this.state.selected===e?!1:(this.state.selected=e,e!=="scope"&&(this.state.activeTool=e),this._gesture=!1,this._controlAges.clear(),Ya(this.state),this._emit("selection",{selected:e}),!0)}setPaused(e){this.state.paused=!!e,this._gesture=!1,this._controlAges.clear(),Ya(this.state),this._emit("pause",{paused:this.state.paused})}setCutting(e){this.state.cutting=!!e,this._emit("cutting",{cutting:this.state.cutting})}setScopeFollow(e,t=this.state.scope.followMode){if(!Eu.includes(t))throw new RangeError("Scope follow mode must be active, midpoint or grasp.");this.state.scope.follow=!!e,this.state.scope.followMode=t,this._emit("scope-follow",{follow:this.state.scope.follow,mode:t})}navigateScope(e,t){if(![e,t].every(Rt))throw new TypeError("Scope navigation requires finite angles.");const n=this.state.scope;return n.follow||this.state.paused||!e&&!t?!1:(n.yaw+=e,n.pitch+=t,Si(this.state),!0)}zoomScope(e){if(!Rt(e))throw new TypeError("Scope optical zoom requires a finite scale.");if(this.state.paused)return!1;const t=this.state.scope,n=rn(t.fov*Math.exp(rn(e,-4,4)),kt.minimumFov,kt.maximumFov);return n===t.fov?!1:(t.fov=n,!0)}homeScopeView(){if(this.state.paused)return!1;const e=this.state.scope,t=pn(_r(this._scopeIntentTarget(),e.port),e.direction);return e.fov=kt.defaultFov,e.roll=0,e.up=Cr(t,[0,1,0]),e.yaw+=bu(Math.atan2(t[0],-t[2])-e.yaw),e.pitch=Math.atan2(-t[1],Math.hypot(t[0],t[2])),Si(this.state,t),!0}setScopeContext({graspTarget:e=null,operating:t=!1,surfaceTarget:n,organBounds:s,heldSpecimen:r,viewAspect:o}={}){if(e!==null&&!Bt(e))throw new TypeError("Grasp target must be null or three finite world coordinates.");if(n!=null&&!Bt(n))throw new TypeError("Surface target requires finite world coordinates.");if(s!=null&&!oc(s))throw new TypeError("Organ bounds require finite min/max world coordinates.");if(r!=null&&(!Bt(r.position)||!Rt(r.radius)||r.radius<0))throw new TypeError("Held specimen requires a finite world position and nonnegative radius.");if(o!==void 0&&(!Rt(o)||o<=0))throw new TypeError("Scope view aspect requires a finite positive width/height ratio.");o!==void 0&&(this.viewAspect=o),this.state.scope.graspTarget=e===null?null:[...e],this.state.scope.operating=!!t,n!==void 0&&(this.state.scope.surfaceTarget=n===null?null:[...n],n!==null&&(this.state.scope.fieldAnchor=[...n])),s!==void 0&&(this.state.scope.organBounds=s===null?null:{min:[...s.min],max:[...s.max]}),r!==void 0&&(this.state.scope.heldSpecimen=r===null?null:{...r,position:[...r.position]})}setScopeViewMode(e){if(!["field","specimen"].includes(e))throw new RangeError("Scope view mode must be field or specimen.");return this.state.scope.viewMode===e?!1:(this.state.scope.viewMode=e,this.state.scope.depthBias=0,this._emit("scope-view",{viewMode:e}),!0)}_scopeIntentTarget(){const e=this.state.scope;return e.followMode==="grasp"&&e.graspTarget?e.operating?Tu(e.graspTarget,this.state.tools.right.position,.5):[...e.graspTarget]:e.followMode==="midpoint"||e.followMode==="grasp"?Tu(this.state.tools.left.position,this.state.tools.right.position,.5):[...this.state.tools[this.state.activeTool].position]}_scopeFraming(e=this._scopeIntentTarget()){const t=this.state.scope;return zx({...t,intentTarget:e,aspect:this.viewAspect,minimumDepth:Xt.scopeDepth[0],maximumDepth:Xt.scopeDepth[1]})}_manualScopeDepth(e,t=null){const n=this.state.scope,s=t?.targetDistance??(n.follow?Yo(n.target,n.port):.19),r=Math.max(Xt.scopeDepth[0],Math.min(Xt.scopeDepth[1],s-Xt.workingDistance));n.depth=rn(n.depth+e,Xt.scopeDepth[0],r),n.follow&&t&&(n.depthBias=n.depth-t.baseDepth)}_integrateControl(e,t,n,s,r){const o=Math.hypot(...t);if(!o)return this._controlAges.delete(e),t.map(()=>0);const a=Qi(t,1/o),l=a.join(",")+":"+r,c=this._controlAges.get(e),h=c?.signature===l?c.age:0,u=Gx(h,n,s,r);return this._controlAges.set(e,{signature:l,age:h+n}),Qi(a,u)}_tool(e=this.state.selected){if(!Rr.includes(e))throw new RangeError("Select a left or right instrument for this action.");return this.state.tools[e]}_moveTool(e,t=this.state.selected){if(!Bt(e))throw new TypeError("Tool displacement requires three finite values.");const n=this._tool(t),s=n.position.map((r,o)=>r+e[o]);return this._applyTool({...n,position:Au(s,n.port)},t)}_applyTool(e,t){const n=this._tool(t);if(e.position.every((u,d)=>u===n.position[d])&&e.wrist.every((u,d)=>u===n.wrist[d])&&e.jaw===n.jaw)return{changed:!1,limited:!1};const s=this._tool(t==="left"?"right":"left"),{tool:r,limited:o,reason:a}=Bx(n,e,s),l=!Ss(r.position,n.position)||!Ss(r.wrist,n.wrist)||r.jaw!==n.jaw;n.position=[...r.position];const c=ui(r);n.shaftDirection=c.shaftDirection,n.alignment=c.alignment,n.wrist=[...r.wrist],n.jaw=r.jaw,l&&(this.state.activeTool=t),this.state.collision=Oo(this.state.tools,o&&a==="instrument-contact",t,a);const h=this.state.collision.clearance;return o&&this._limitCooldown<=0&&(this._emit("limit",{selected:t,kind:a==="instrument-contact"?"instrument-collision":"motion-resolution",clearance:h}),this._limitCooldown=.6),{changed:l,limited:o}}moveToolTo(e,t=this.state.selected,{checkpoint:n=!1,label:s="定位器械"}={}){if(!Bt(e))throw new TypeError("Tool position requires three finite values.");return this.state.paused?{changed:!1,limited:!1}:(n&&this.checkpoint(s,this.getExtraData?.()),this._moveTool(_r(e,this._tool(t).position),t))}moveTool(e,t=this.state.selected){return this.state.paused?{changed:!1,limited:!1}:this._moveTool(e,t)}nudge(e,t,n=.002,s=this.state.selected){const r=typeof e=="string"?Hx[e]:e;if(![0,1,2].includes(r)||!Rt(t)||!Rt(n)||n<0)throw new TypeError("Nudge requires an axis, finite direction and nonnegative step.");if(this.state.paused)return!1;if(this.checkpoint("微调位移",this.getExtraData?.()),s==="scope")return r===2?this._manualScopeDepth(-t*n,this.state.scope.follow?this._scopeFraming():null):(this.setScopeFollow(!1),this.state.scope[r===0?"yaw":"pitch"]+=t*n*5),Si(this.state),!0;const o=[0,0,0];return o[r]=t*n,this._moveTool(o,s).changed}setJaw(e,t){if(!Rt(t))throw new TypeError("Jaw opening must be finite.");if(this.state.paused)return!1;const n=this._tool(e),s=rn(t,0,1);return this._applyTool({...n,jaw:s},e).changed}adjustJaw(e,t=this.state.selected){if(!Rt(e))throw new TypeError("Jaw delta must be finite.");return this.setJaw(t,this._tool(t).jaw+e)}adjustWrist(e,t,n=this.state.selected){if(![0,1,2].includes(e)||!Rt(t))throw new TypeError("Wrist adjustment requires axis 0–2 and a finite delta.");if(this.state.paused)return!1;if(n==="scope"){const a=["pitch","yaw","roll"][e];e<2&&this.state.scope.follow&&this.setScopeFollow(!1);const l=this.state.scope[a];return this.state.scope[a]+=t,Si(this.state),l!==this.state.scope[a]}const s=this._tool(n),r=s.wrist[e]+t;if(!Rt(r))throw new TypeError("Wrist rotation overflow.");const o=[...s.wrist];return o[e]=r,this._applyTool({...s,wrist:o},n).changed}homeTools(){return this.state.paused?!1:(this.checkpoint("器械回中",this.getExtraData?.()),this.state.tools=Ka().tools,this.state.collision=Oo(this.state.tools),this._emit("home"),!0)}update(e,t=new Set){this._events=[];const n=jx(t);Ya(this.state);for(const[A,D]of[["Digit1","left"],["Digit2","right"],["Digit3","scope"]])n.has(A)&&!this._previousKeys.has(A)&&this.select(D);if(this._previousKeys=n,!Rt(e)||e<=0)return{changed:!1,moving:!1,clutched:!1,limited:!1,events:[...this._events]};const s=Math.min(e,Xt.maxFrameTime);this._limitCooldown=Math.max(0,this._limitCooldown-s);const r=n.has("Space");if(this.state.paused||r)return this._gesture=!1,this._controlAges.clear(),{changed:!1,moving:!1,clutched:r,limited:!1,events:[...this._events]};const o=xi(n,"KeyD","KeyA"),a=xi(n,"KeyE","KeyQ"),l=xi(n,"KeyS","KeyW"),c=xi(n,"ArrowUp","ArrowDown"),h=xi(n,"ArrowRight","ArrowLeft"),u=xi(n,"KeyX","KeyZ"),d=xi(n,"KeyV","KeyC"),f=xi(n,"BracketRight","BracketLeft"),g=!!(o||a||l||c||h||u||f||d&&this.state.selected!=="scope");g&&!this._gesture&&this.checkpoint("遥操作位姿",this.getExtraData?.()),this._gesture=g;const _=n.has("ShiftLeft")||n.has("ShiftRight");let m=!1,p=!1;const M=[...this.state.scope.position],y=this.state.scope.depth,S=this._integrateControl("translation",[o,a,l],s,ei.translation,_),P=this._integrateControl("rotation",[c,h,u],s,ei.wrist,_),E=this._integrateControl("scope-rotation",[rn(a+c,-1,1),rn(o+h,-1,1),u],s,ei.scopeRotation,_),C=this._integrateControl("scope-navigation",[rn(-l+f,-1,1)],s,ei.scopeDepth,_)[0],R=this._integrateControl("scope-depth",[f],s,ei.scopeDepth,_)[0];if(this.state.selected==="scope"){const A=this.state.scope;(o||a||c||h)&&A.follow&&this.setScopeFollow(!1);const D=[A.depth,A.yaw,A.pitch,A.roll];A.pitch+=E[0],A.yaw+=E[1],A.roll+=E[2],m=!Ss(D.slice(0,3),[A.depth,A.yaw,A.pitch])||D[3]!==A.roll}else{const A=this._tool(),D=this._applyTool({...A,position:Ko(A.position,S),wrist:Ko(A.wrist,P),jaw:rn(A.jaw+d*ei.jaw*s*(_?.35:1),0,1)},this.state.selected);p=D.limited,m=D.changed}const v=this.state.scope,x=this.state.selected==="scope"?C:R;if(v.follow){const A=this._scopeIntentTarget();let D=this._scopeFraming(A);const U=D?.target??A;v.intentTarget=[...A],v.target=U;const L=[...v.position],k=[...v.lookAt],F=Wx(v.direction,pn(_r(U,v.port),v.direction),s,v.up);if(x)this._manualScopeDepth(x,D),D=this._scopeFraming(A);else if(D){const q=Vx(v.depth,D.depthTarget,s);(q<=v.depth||qr(F,pn(_r(U,v.port),F))>Math.cos(.35))&&(v.depth=q)}v.framingSource=D?.source??null,v.framingLimited=D?.framingLimited??!1,v.targetWorkingDistance=D?.workingDistance??Yo(v.position,v.target),v.autoDepthTarget=D?.depthTarget??null,v.yaw+=bu(Math.atan2(F[0],-F[2])-v.yaw),v.pitch=Math.atan2(-F[1],Math.hypot(F[0],F[2])),Si(this.state,F),m=!Ss(L,v.position)||!Ss(k,v.lookAt)||m}else x&&this._manualScopeDepth(x),v.framingSource=null,v.framingLimited=!1,v.autoDepthTarget=null,Si(this.state);return m=!Ss(M,v.position)||y!==v.depth||m,this.state.elapsed+=s,{changed:m,moving:g,clutched:r,limited:p,events:[...this._events]}}}function Ru(i,e){if(e===Xf)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Kl||e===hd){let t=i.getIndex();if(t===null){const o=[],a=i.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);i.setIndex(o),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,s=[];if(e===Kl)for(let o=1;o<=n;o++)s.push(t.getX(0)),s.push(t.getX(o)),s.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(s.push(t.getX(o)),s.push(t.getX(o+1)),s.push(t.getX(o+2))):(s.push(t.getX(o+2)),s.push(t.getX(o+1)),s.push(t.getX(o)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}class ko extends Js{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Jx(t)}),this.register(function(t){return new Qx(t)}),this.register(function(t){return new ly(t)}),this.register(function(t){return new cy(t)}),this.register(function(t){return new hy(t)}),this.register(function(t){return new ty(t)}),this.register(function(t){return new ny(t)}),this.register(function(t){return new iy(t)}),this.register(function(t){return new sy(t)}),this.register(function(t){return new Zx(t)}),this.register(function(t){return new ry(t)}),this.register(function(t){return new ey(t)}),this.register(function(t){return new ay(t)}),this.register(function(t){return new oy(t)}),this.register(function(t){return new Kx(t)}),this.register(function(t){return new uy(t)}),this.register(function(t){return new dy(t)})}load(e,t,n,s){const r=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const c=Tr.extractUrlBase(e);o=Tr.resolveURL(c,this.path)}else o=Tr.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){s?s(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new Nd(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,o,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r;const o={},a={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Kd){try{o[Ke.KHR_BINARY_GLTF]=new fy(e)}catch(u){s&&s(u);return}r=JSON.parse(o[Ke.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new Ey(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case Ke.KHR_MATERIALS_UNLIT:o[u]=new $x;break;case Ke.KHR_DRACO_MESH_COMPRESSION:o[u]=new py(r,this.dracoLoader);break;case Ke.KHR_TEXTURE_TRANSFORM:o[u]=new my;break;case Ke.KHR_MESH_QUANTIZATION:o[u]=new gy;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,s)}parseAsync(e,t){const n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}}function Yx(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}const Ke={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Kx{constructor(e){this.parser=e,this.name=Ke.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let s=t.cache.get(n);if(s)return s;const r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let c;const h=new De(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],Kt);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new ec(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Fd(h),c.distance=u;break;case"spot":c=new Ud(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),kn(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),s=Promise.resolve(c),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class $x{constructor(){this.name=Ke.KHR_MATERIALS_UNLIT}getMaterialType(){return fn}extendParams(e,t,n){const s=[];e.color=new De(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Kt),e.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,Ct))}return Promise.all(s)}}class Zx{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class Jx{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new de(a,a)}return Promise.all(r)}}class Qx{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gn}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class ey{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}}class ty{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new De(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=s.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Kt)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,Ct)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}}class ny{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}}class iy{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new De().setRGB(a[0],a[1],a[2],Kt),Promise.all(r)}}class sy{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gn}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class ry{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new De().setRGB(a[0],a[1],a[2],Kt),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,Ct)),Promise.all(r)}}class oy{constructor(e){this.parser=e,this.name=Ke.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}}class ay{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}}class ly{constructor(e){this.parser=e,this.name=Ke.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}}class cy{constructor(e){this.parser=e,this.name=Ke.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=s.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}}class hy{constructor(e){this.parser=e,this.name=Ke.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=s.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}}class uy{constructor(e){this.name=Ke.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){const l=s.byteOffset||0,c=s.byteLength||0,h=s.count,u=s.byteStride,d=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,d,s.mode,s.filter).then(function(f){return f.buffer}):o.ready.then(function(){const f=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(f),h,u,d,s.mode,s.filter),f})})}else return null}}class dy{constructor(e){this.name=Ke.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const s=t.meshes[n.mesh];for(const c of s.primitives)if(c.mode!==Mn.TRIANGLES&&c.mode!==Mn.TRIANGLE_STRIP&&c.mode!==Mn.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(h=>(l[c]=h,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(const g of u){const _=new Fe,m=new b,p=new Oe,M=new b(1,1,1),y=new bd(g.geometry,g.material,d);for(let S=0;S<d;S++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,S),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,S),l.SCALE&&M.fromBufferAttribute(l.SCALE,S),y.setMatrixAt(S,_.compose(m,p,M));for(const S in l)if(S==="_COLOR_0"){const P=l[S];y.instanceColor=new Jl(P.array,P.itemSize,P.normalized)}else S!=="TRANSLATION"&&S!=="ROTATION"&&S!=="SCALE"&&g.geometry.setAttribute(S,l[S]);ht.prototype.copy.call(y,g),this.parser.assignFinalMaterial(y),f.push(y)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const Kd="glTF",ur=12,Cu={JSON:1313821514,BIN:5130562};class fy{constructor(e){this.name=Ke.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,ur),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Kd)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-ur,r=new DataView(e,ur);let o=0;for(;o<s;){const a=r.getUint32(o,!0);o+=4;const l=r.getUint32(o,!0);if(o+=4,l===Cu.JSON){const c=new Uint8Array(e,ur+o,a);this.content=n.decode(c)}else if(l===Cu.BIN){const c=ur+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class py{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Ke.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const h in o){const u=cc[h]||h.toLowerCase();a[u]=o[h]}for(const h in e.attributes){const u=cc[h]||h.toLowerCase();if(o[h]!==void 0){const d=n.accessors[e.attributes[h]],f=Ns[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){s.decodeDracoFile(h,function(f){for(const g in f.attributes){const _=f.attributes[g],m=l[g];m!==void 0&&(_.normalized=m)}u(f)},a,c,Kt,d)})})}}class my{constructor(){this.name=Ke.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class gy{constructor(){this.name=Ke.KHR_MESH_QUANTIZATION}}class $d extends jr{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let o=0;o!==s;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,h=s-t,u=(n-t)/h,d=u*u,f=d*u,g=e*c,_=g-c,m=-2*f+3*d,p=f-d,M=1-m,y=p-d+u;for(let S=0;S!==a;S++){const P=o[_+S+a],E=o[_+S+l]*h,C=o[g+S+a],R=o[g+S]*h;r[S]=M*P+y*E+m*C+p*R}return r}}const _y=new Oe;class vy extends $d{interpolate_(e,t,n,s){const r=super.interpolate_(e,t,n,s);return _y.fromArray(r).normalize().toArray(r),r}}const Mn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Ns={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Pu={9728:tn,9729:en,9984:nd,9985:Po,9986:pr,9987:ii},Du={33071:Ai,33648:Ho,10497:ts},$a={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},cc={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},yi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},xy={CUBICSPLINE:void 0,LINEAR:kr,STEP:Or},Za={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function yy(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new hi({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ai})),i.DefaultMaterial}function ji(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function kn(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function My(i,e,t){let n=!1,s=!1,r=!1;for(let c=0,h=e.length;c<h;c++){const u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);const o=[],a=[],l=[];for(let c=0,h=e.length;c<h;c++){const u=e[c];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):i.attributes.position;o.push(d)}if(s){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):i.attributes.normal;a.push(d)}if(r){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):i.attributes.color;l.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2];return n&&(i.morphAttributes.position=h),s&&(i.morphAttributes.normal=u),r&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function Sy(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function wy(i){let e;const t=i.extensions&&i.extensions[Ke.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Ja(t.attributes):e=i.indices+":"+Ja(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+Ja(i.targets[n]);return e}function Ja(i){let e="";const t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function hc(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function by(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const Ty=new Fe;class Ey{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Yx,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const l=a.match(/Version\/(\d+)/);s=n&&l?parseInt(l[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&o<98?this.textureLoader=new Im(this.options.manager):this.textureLoader=new Fm(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Nd(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:n,userData:{}};return ji(r,a,s),kn(a,s),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(const l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){const o=t[s].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let s=0,r=e.length;s<r;s++){const o=e[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const s=n.clone(),r=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,h]of o.children.entries())r(h,a.children[c])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const s=e(t[n]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let s=0;s<t.length;s++){const r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Ke.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,o){n.load(Tr.resolveURL(t.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){const t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const o=$a[s.type],a=Ns[s.componentType],l=s.normalized===!0,c=new a(s.count*o);return Promise.resolve(new ct(c,o,l))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){const a=o[0],l=$a[s.type],c=Ns[s.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=s.byteOffset||0,f=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0;let _,m;if(f&&f!==u){const p=Math.floor(d/f),M="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count;let y=t.cache.get(M);y||(_=new c(a,p*f,s.count*f/h),y=new Gp(_,f/h),t.cache.add(M,y)),m=new Dc(y,l,d%f/h,g)}else a===null?_=new c(s.count*l):_=new c(a,d,s.count*l),m=new ct(_,l,g);if(s.sparse!==void 0){const p=$a.SCALAR,M=Ns[s.sparse.indices.componentType],y=s.sparse.indices.byteOffset||0,S=s.sparse.values.byteOffset||0,P=new M(o[1],y,s.sparse.count*p),E=new c(o[2],S,s.sparse.count*l);a!==null&&(m=new ct(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let C=0,R=P.length;C<R;C++){const v=P[C];if(m.setX(v,E[C*l]),l>=2&&m.setY(v,E[C*l+1]),l>=3&&m.setZ(v,E[C*l+2]),l>=4&&m.setW(v,E[C*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){const s=this,r=this.json,o=r.textures[e],a=r.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);const d=(r.samplers||{})[o.sampler]||{};return h.magFilter=Pu[d.magFilter]||en,h.minFilter=Pu[d.minFilter]||ii,h.wrapS=Du[d.wrapS]||ts,h.wrapT=Du[d.wrapT]||ts,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==tn&&h.minFilter!==en,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const o=s.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(u){c=!0;const d=new Blob([u],{type:o.mimeType});return l=a.createObjectURL(d),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(d,f){let g=d;t.isImageBitmapLoader===!0&&(g=function(_){const m=new Dt(_);m.needsUpdate=!0,d(m)}),t.load(Tr.resolveURL(u,r.path),g,void 0,f)})}).then(function(u){return c===!0&&a.revokeObjectURL(l),kn(u,o),u.userData.mimeType=o.mimeType||by(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,s){const r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[Ke.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[Ke.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=r.associations.get(o);o=r.extensions[Ke.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,l)}}return s!==void 0&&(o.colorSpace=s),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new Td,Ln.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new Nc,Ln.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(s||r||o){let a="ClonedMaterial:"+n.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),r&&(l.vertexColors=!0),o&&(l.flatShading=!0),s&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return hi}loadMaterial(e){const t=this,n=this.json,s=this.extensions,r=n.materials[e];let o;const a={},l=r.extensions||{},c=[];if(l[Ke.KHR_MATERIALS_UNLIT]){const u=s[Ke.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),c.push(u.extendParams(a,r,t))}else{const u=r.pbrMetallicRoughness||{};if(a.color=new De(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],Kt),a.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",u.baseColorTexture,Ct)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=un);const h=r.alphaMode||Za.OPAQUE;if(h===Za.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===Za.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==fn&&(c.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new de(1,1),r.normalTexture.scale!==void 0)){const u=r.normalTexture.scale;a.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&o!==fn&&(c.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==fn){const u=r.emissiveFactor;a.emissive=new De().setRGB(u[0],u[1],u[2],Kt)}return r.emissiveTexture!==void 0&&o!==fn&&c.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,Ct)),Promise.all(c).then(function(){const u=new o(a);return r.name&&(u.name=r.name),kn(u,r),t.associations.set(u,{materials:e}),r.extensions&&ji(s,u,r),u})}createUniqueName(e){const t=rt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,s=this.primitiveCache;function r(a){return n[Ke.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return Iu(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],h=wy(c),u=s[h];if(u)o.push(u.promise);else{let d;c.extensions&&c.extensions[Ke.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=Iu(new Nt,c,t),s[h]={primitive:c,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,s=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const h=o[l].material===void 0?yy(this.cache):this.getDependency("material",o[l].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,g=h.length;f<g;f++){const _=h[f],m=o[f];let p;const M=c[f];if(m.mode===Mn.TRIANGLES||m.mode===Mn.TRIANGLE_STRIP||m.mode===Mn.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new Xp(_,M):new qe(_,M),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===Mn.TRIANGLE_STRIP?p.geometry=Ru(p.geometry,hd):m.mode===Mn.TRIANGLE_FAN&&(p.geometry=Ru(p.geometry,Kl));else if(m.mode===Mn.LINES)p=new Zp(_,M);else if(m.mode===Mn.LINE_STRIP)p=new ea(_,M);else if(m.mode===Mn.LINE_LOOP)p=new Jp(_,M);else if(m.mode===Mn.POINTS)p=new Qp(_,M);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&Sy(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),kn(p,r),m.extensions&&ji(s,p,m),t.assignFinalMaterial(p),u.push(p)}for(let f=0,g=u.length;f<g;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&ji(s,u[0],r),u[0];const d=new Ye;r.extensions&&ji(s,d,r),t.associations.set(d,{meshes:e});for(let f=0,g=u.length;f<g;f++)d.add(u[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new qt(ni.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new na(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),kn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){const r=s.pop(),o=s,a=[],l=[];for(let c=0,h=o.length;c<h;c++){const u=o[c];if(u){a.push(u);const d=new Fe;r!==null&&d.fromArray(r.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Ic(a,l)})}loadAnimation(e){const t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,o=[],a=[],l=[],c=[],h=[];for(let u=0,d=s.channels.length;u<d;u++){const f=s.channels[u],g=s.samplers[f.sampler],_=f.target,m=_.node,p=s.parameters!==void 0?s.parameters[g.input]:g.input,M=s.parameters!==void 0?s.parameters[g.output]:g.output;_.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",M)),c.push(g),h.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],g=u[2],_=u[3],m=u[4],p=[];for(let y=0,S=d.length;y<S;y++){const P=d[y],E=f[y],C=g[y],R=_[y],v=m[y];if(P===void 0)continue;P.updateMatrix&&P.updateMatrix();const x=n._createAnimationTracks(P,E,C,R,v);if(x)for(let A=0;A<x.length;A++)p.push(x[A])}const M=new Tm(r,void 0,p);return kn(M,s),M})}createNodeMesh(e){const t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){const o=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=s.weights.length;l<c;l++)a.morphTargetInfluences[l]=s.weights[l]}),o})}loadNode(e){const t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=s.children||[];for(let c=0,h=a.length;c<h;c++)o.push(n.getDependency("node",a[c]));const l=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),l]).then(function(c){const h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,Ty)});for(let f=0,g=u.length;f<g;f++)h.add(u[f]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],o=r.name?s.createUniqueName(r.name):"",a=[],l=s._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(c){return s._getNodeRef(s.cameraCache,r.camera,c)})),s._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let h;if(r.isBone===!0?h=new Sd:c.length>1?h=new Ye:c.length===1?h=c[0]:h=new ht,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(r.name&&(h.userData.name=r.name,h.name=o),kn(h,r),r.extensions&&ji(n,h,r),r.matrix!==void 0){const u=new Fe;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!s.associations.has(h))s.associations.set(h,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){const u=s.associations.get(h);s.associations.set(h,{...u})}return s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],s=this,r=new Ye;n.name&&(r.name=s.createUniqueName(n.name)),kn(r,n),n.extensions&&ji(t,r,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(s.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let h=0,u=l.length;h<u;h++)r.add(l[h]);const c=h=>{const u=new Map;for(const[d,f]of s.associations)(d instanceof Ln||d instanceof Dt)&&u.set(d,f);return h.traverse(d=>{const f=s.associations.get(d);f!=null&&u.set(d,f)}),u};return s.associations=c(r),r})}_createAnimationTracks(e,t,n,s,r){const o=[],a=e.name?e.name:e.uuid,l=[];yi[r.path]===yi.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(a);let c;switch(yi[r.path]){case yi.weights:c=Ws;break;case yi.rotation:c=Xs;break;case yi.translation:case yi.scale:c=js;break;default:switch(n.itemSize){case 1:c=Ws;break;case 2:case 3:default:c=js;break}break}const h=s.interpolation!==void 0?xy[s.interpolation]:kr,u=this._getArrayFromAccessor(n);for(let d=0,f=l.length;d<f;d++){const g=new c(l[d]+"."+yi[r.path],t.array,u,h);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=hc(t.constructor),s=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const s=this instanceof Xs?vy:$d;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function Ay(i,e,t){const n=e.attributes,s=new Gn;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(s.set(new b(l[0],l[1],l[2]),new b(c[0],c[1],c[2])),a.normalized){const h=hc(Ns[a.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const a=new b,l=new b;for(let c=0,h=r.length;c<h;c++){const u=r[c];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){const _=hc(Ns[d.componentType]);l.multiplyScalar(_)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}i.boundingBox=s;const o=new Wn;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=o}function Iu(i,e,t){const n=e.attributes,s=[];function r(o,a){return t.getDependency("accessor",o).then(function(l){i.setAttribute(a,l)})}for(const o in n){const a=cc[o]||o.toLowerCase();a in i.attributes||s.push(r(n[o],a))}if(e.indices!==void 0&&!i.index){const o=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});s.push(o)}return et.workingColorSpace!==Kt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${et.workingColorSpace}" not supported.`),kn(i,e),Ay(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?My(i,e.targets,t):i})}const Lu={type:"change"},Gc={type:"start"},Zd={type:"end"},Eo=new Xr,Nu=new bi,Ry=Math.cos(70*ni.DEG2RAD),Pt=new b,sn=2*Math.PI,lt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Qa=1e-6;class Cy extends qm{constructor(e,t=null){super(e,t),this.state=lt.NONE,this.target=new b,this.cursor=new b,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ps.ROTATE,MIDDLE:Ps.DOLLY,RIGHT:Ps.PAN},this.touches={ONE:As.ROTATE,TWO:As.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new b,this._lastQuaternion=new Oe,this._lastTargetPosition=new b,this._quat=new Oe().setFromUnitVectors(e.up,new b(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Zh,this._sphericalDelta=new Zh,this._scale=1,this._panOffset=new b,this._rotateStart=new de,this._rotateEnd=new de,this._rotateDelta=new de,this._panStart=new de,this._panEnd=new de,this._panDelta=new de,this._dollyStart=new de,this._dollyEnd=new de,this._dollyDelta=new de,this._dollyDirection=new b,this._mouse=new de,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Dy.bind(this),this._onPointerDown=Py.bind(this),this._onPointerUp=Iy.bind(this),this._onContextMenu=By.bind(this),this._onMouseWheel=Uy.bind(this),this._onKeyDown=Fy.bind(this),this._onTouchStart=Oy.bind(this),this._onTouchMove=ky.bind(this),this._onMouseDown=Ly.bind(this),this._onMouseMove=Ny.bind(this),this._interceptControlDown=zy.bind(this),this._interceptControlUp=Vy.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Lu),this.update(),this.state=lt.NONE}update(e=null){const t=this.object.position;Pt.copy(t).sub(this.target),Pt.applyQuaternion(this._quat),this._spherical.setFromVector3(Pt),this.autoRotate&&this.state===lt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=sn:n>Math.PI&&(n-=sn),s<-Math.PI?s+=sn:s>Math.PI&&(s-=sn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Pt.setFromSpherical(this._spherical),Pt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Pt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Pt.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const a=new b(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new b(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Pt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Eo.origin.copy(this.object.position),Eo.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Eo.direction))<Ry?this.object.lookAt(this.target):(Nu.setFromNormalAndCoplanarPoint(this.object.up,this.target),Eo.intersectPlane(Nu,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Qa||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Qa||this._lastTargetPosition.distanceToSquared(this.target)>Qa?(this.dispatchEvent(Lu),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?sn/60*this.autoRotateSpeed*e:sn/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Pt.setFromMatrixColumn(t,0),Pt.multiplyScalar(-e),this._panOffset.add(Pt)}_panUp(e,t){this.screenSpacePanning===!0?Pt.setFromMatrixColumn(t,1):(Pt.setFromMatrixColumn(t,0),Pt.crossVectors(this.object.up,Pt)),Pt.multiplyScalar(e),this._panOffset.add(Pt)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Pt.copy(s).sub(this.target);let r=Pt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(sn*this._rotateDelta.x/t.clientHeight),this._rotateUp(sn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(sn*this._rotateDelta.x/t.clientHeight),this._rotateUp(sn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new de,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function Py(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function Dy(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Iy(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Zd),this.state=lt.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Ly(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Ps.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=lt.DOLLY;break;case Ps.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=lt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=lt.ROTATE}break;case Ps.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=lt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=lt.PAN}break;default:this.state=lt.NONE}this.state!==lt.NONE&&this.dispatchEvent(Gc)}function Ny(i){switch(this.state){case lt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case lt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case lt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Uy(i){this.enabled===!1||this.enableZoom===!1||this.state!==lt.NONE||(i.preventDefault(),this.dispatchEvent(Gc),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Zd))}function Fy(i){this.enabled!==!1&&this._handleKeyDown(i)}function Oy(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case As.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=lt.TOUCH_ROTATE;break;case As.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=lt.TOUCH_PAN;break;default:this.state=lt.NONE}break;case 2:switch(this.touches.TWO){case As.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=lt.TOUCH_DOLLY_PAN;break;case As.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=lt.TOUCH_DOLLY_ROTATE;break;default:this.state=lt.NONE}break;default:this.state=lt.NONE}this.state!==lt.NONE&&this.dispatchEvent(Gc)}function ky(i){switch(this._trackPointer(i),this.state){case lt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case lt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case lt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case lt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=lt.NONE}}function By(i){this.enabled!==!1&&i.preventDefault()}function zy(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Vy(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class Hy extends Md{constructor(){super();const e=new Fi;e.deleteAttribute("uv");const t=new hi({side:Yt}),n=new hi,s=new Fd(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new qe(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const o=new bd(e,n,6),a=new ht;a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),a.updateMatrix(),o.setMatrixAt(0,a.matrix),a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),a.updateMatrix(),o.setMatrixAt(1,a.matrix),a.position.set(6.167,.857,7.803),a.rotation.set(0,.561,0),a.scale.set(3.927,6.285,3.687),a.updateMatrix(),o.setMatrixAt(2,a.matrix),a.position.set(-2.017,.018,6.124),a.rotation.set(0,.333,0),a.scale.set(2.002,4.566,2.064),a.updateMatrix(),o.setMatrixAt(3,a.matrix),a.position.set(2.291,-.756,-2.621),a.rotation.set(0,-.286,0),a.scale.set(1.546,1.552,1.496),a.updateMatrix(),o.setMatrixAt(4,a.matrix),a.position.set(-2.193,-.369,-5.547),a.rotation.set(0,.516,0),a.scale.set(3.875,3.487,2.986),a.updateMatrix(),o.setMatrixAt(5,a.matrix),this.add(o);const l=new qe(e,ws(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);const c=new qe(e,ws(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);const h=new qe(e,ws(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);const u=new qe(e,ws(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);const d=new qe(e,ws(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);const f=new qe(e,ws(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function ws(i){return new mm({color:0,emissive:16777215,emissiveIntensity:i})}const dr=new b;function yn(i,e,t,n,s,r){const o=2*Math.PI*s/4,a=Math.max(r-2*s,0),l=Math.PI/4;dr.copy(e),dr[n]=0,dr.normalize();const c=.5*o/(o+a),h=1-dr.angleTo(i)/l;return Math.sign(dr[t])===1?h*c:a/(o+a)+c+c*(1-h)}class mn extends Fi{constructor(e=1,t=1,n=1,s=2,r=.1){const o=s*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,o,o,o),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:s,radius:r},o===1)return;const a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;const l=new b,c=new b,h=new b(e,t,n).divideScalar(2).subScalar(r),u=this.attributes.position.array,d=this.attributes.normal.array,f=this.attributes.uv.array,g=u.length/6,_=new b,m=.5/o;for(let p=0,M=0;p<u.length;p+=3,M+=2)switch(l.fromArray(u,p),c.copy(l),c.x-=Math.sign(c.x)*m,c.y-=Math.sign(c.y)*m,c.z-=Math.sign(c.z)*m,c.normalize(),u[p+0]=h.x*Math.sign(l.x)+c.x*r,u[p+1]=h.y*Math.sign(l.y)+c.y*r,u[p+2]=h.z*Math.sign(l.z)+c.z*r,d[p+0]=c.x,d[p+1]=c.y,d[p+2]=c.z,Math.floor(p/g)){case 0:_.set(1,0,0),f[M+0]=yn(_,c,"z","y",r,n),f[M+1]=1-yn(_,c,"y","z",r,t);break;case 1:_.set(-1,0,0),f[M+0]=1-yn(_,c,"z","y",r,n),f[M+1]=1-yn(_,c,"y","z",r,t);break;case 2:_.set(0,1,0),f[M+0]=1-yn(_,c,"x","z",r,e),f[M+1]=yn(_,c,"z","x",r,n);break;case 3:_.set(0,-1,0),f[M+0]=1-yn(_,c,"x","z",r,e),f[M+1]=1-yn(_,c,"z","x",r,n);break;case 4:_.set(0,0,1),f[M+0]=1-yn(_,c,"x","y",r,e),f[M+1]=1-yn(_,c,"y","x",r,t);break;case 5:_.set(0,0,-1),f[M+0]=yn(_,c,"x","y",r,e),f[M+1]=1-yn(_,c,"y","x",r,t);break}}static fromJSON(e){return new mn(e.width,e.height,e.depth,e.segments,e.radius)}}const el="./",Us=new b(0,0,1),Ii=ni.clamp,bt=Object.freeze({left:Object.freeze([.085,-.026,0]),right:Object.freeze([.085,.026,0]),proximalShaftZ:-.095,lateralBallOffset:.06,clevisDepth:.075,clevisRadius:.0035}),on=(i,e=.65,t=.35)=>new hi({color:i,metalness:e,roughness:t});function dt(i,e,t,n=[0,0,0]){const s=new qe(e,t);return s.position.set(...n),s.castShadow=s.receiveShadow=!0,s.layers.set(0),i.add(s),s}function Gy(i,e){const t=new Ye;t.name="Concept_Custom_Quick_Change_Instrument_Coupler",i.add(t);const n=on("#a8b4b5",.78,.3),s=on("#1b2529",.18,.5);dt(t,new mn(.034,.039,.051,2,.004),s,[0,0,-.022]);const r=dt(t,new Vt(.012,.013,.029,24),n,[0,0,.013]);r.rotation.x=Math.PI/2;for(const o of[-.045,.027])dt(t,new Tn(.013,.0017,8,28),n,[0,0,o]);dt(t,new Tn(.0134,.0012,8,28),on(e,.22,.42),[0,0,.021]);for(const o of[-.012,.012])for(const a of[-.015,.015]){const l=dt(t,new Vt(.0017,.0017,.002,8),n,[o,a,-.048]);l.rotation.x=Math.PI/2}return t}function Wy(i,e,t){const n=new Ye;n.name=`Concept_${e}_Proximal_Shaft_Clamp`,n.position.z=bt.proximalShaftZ,i.add(n);const s=on("#b2c0c3",.76,.28),r=on("#26373a",.15,.54),o=dt(n,new mn(.021,.025,.029,2,.003),r);o.name="Custom_Shaft_Clamp_Housing";for(const u of[-.012,.012])dt(n,new Tn(.0071,.0017,8,24),s,[0,0,u]);const a=e==="left"?-1:1,l=new Ye;l.name="Custom_Fixed_Size_Palm_Clearance_Clevis",n.add(l);for(const u of[0,a*bt.lateralBallOffset])dt(l,new Vt(bt.clevisRadius,bt.clevisRadius,bt.clevisDepth,12),s,[u,bt.clevisDepth*.5,0]);const c=dt(l,new Vt(bt.clevisRadius,bt.clevisRadius,bt.lateralBallOffset,12),s,[a*bt.lateralBallOffset*.5,bt.clevisDepth,0]);c.rotation.z=Math.PI/2;for(const u of[0,a*bt.lateralBallOffset])dt(l,new ci(bt.clevisRadius,12,8),s,[u,bt.clevisDepth,0]);const h=dt(n,new ci(.008,18,12),s,[a*bt.lateralBallOffset,0,0]);return h.name="Custom_Passive_Universal_Grip_Ball",dt(n,new Tn(.0073,.0012,6,20),on(t,.2,.43),[0,0,-.014]),n}function Xy(i,e){i.updateWorldMatrix(!0,!0);const t=i.matrixWorld.clone().invert(),n=new Fe,s=new b,r=new Map;return i.traverse(o=>{if(!o.isMesh)return;n.multiplyMatrices(t,o.matrixWorld);const a=o.geometry.attributes.position;for(let l=0;l<a.count;l++){s.fromBufferAttribute(a,l).applyMatrix4(n);const c=`${Math.floor(s.x/.008)},${Math.floor(s.y/.008)},${Math.floor(s.z/.008)}`;r.has(c)||r.set(c,[s.x-e[0],s.y-e[1],s.z-e[2]])}}),new Float64Array([...r.values()].flat())}function Uu(i,e,t){const n=Math.cos(e),s=Math.sin(e),r=bt.clevisDepth;let o=1/0;for(let a=0;a<i.length;a+=3){const l=i[a],c=i[a+2]-bt.proximalShaftZ,h=i[a+1]*n+c*s,u=-i[a+1]*s+c*n,d=Math.max(0,-h,h-r),f=Math.max(Math.min(0,t)-l,0,l-Math.max(0,t));o=Math.min(o,l*l+d*d+u*u,(l-t)**2+d*d+u*u,f*f+(h-r)**2+u*u)}return Math.sqrt(o)}function jy(i,e,t){const n=new Ye;n.name=`Concept_${e}_Strapped_Palm_Grip`,i.add(n);const s=e==="left"?-1:1,r=on("#1f3032",.12,.62),o=on("#afbdc0",.72,.3),a=dt(n,new Vt(.0105,.0105,.061,20),r);a.rotation.x=Math.PI/2,a.name="Custom_Palm_Transverse_Grip_Bar";for(const l of[-.03,.03])dt(n,new ci(.0107,12,8),r,[0,0,l]);dt(n,new mn(.049,.008,.061,2,.004),o,[-.03,-s*.008,0]);for(const l of[-.052,-.015]){dt(n,new mn(.009,.004,.066,2,.0015),r,[l,-s*.011,0]),dt(n,new mn(.009,.004,.066,2,.0015),r,[l,-s*.044,0]);for(const c of[-.031,.031])dt(n,new mn(.009,.037,.004,2,.0015),r,[l,-s*.0275,c])}return dt(n,new Tn(.0085,.0016,8,24),on(t,.25,.4)),n}async function Ao(i,e){const[t,n]=await Promise.all([fetch(`${el}assets/${e}.glb`),fetch(`${el}assets/${e}-kinematics.json`)]);if(!t.ok||!n.ok)throw new Error(`无法载入真实模型：${e}`);const[s,r]=await Promise.all([t.arrayBuffer(),n.json()]),o=await i.parseAsync(s,`${el}assets/`),a=new Ye;a.name=`Authentic_${e}`,a.add(o.scene),a.traverse(c=>{c.isMesh&&(c.castShadow=!0,c.receiveShadow=!0,e==="endoscope"||e==="z1"?c.layers.set(0):c.layers.enable(1),e!=="z1"&&(c.material.roughness=.32,c.material.metalness=.78))});const l=new Map;for(const c of r.joints){const h=a.getObjectByName(c.name);h&&l.set(c.name,{node:h,specification:c,rest:h.quaternion.clone(),axis:new b(...c.axis),angle:0})}return{name:e,group:a,joints:l,metadata:r}}const qy=new Oe;function Cn(i,e,t,n=!1){const s=i.joints.get(e);if(!s||s.specification.type==="fixed")return;const r=s.specification.limit;if(!Number.isFinite(t))return;s.angle=n?t:Ii(t,r?.lower??-Math.PI,r?.upper??Math.PI);const o=i.frameBounds?.get(e);o&&(s.angle=Ii(s.angle,o.lower,o.upper));const a=Math.atan2(Math.sin(s.angle),Math.cos(s.angle));s.node.quaternion.copy(s.rest).multiply(qy.setFromAxisAngle(s.axis,a))}class Fu{constructor(e){Object.assign(this,e),this.tipNode=this.group.getObjectByName("tool_tip_link"),this.tipPosition=new b,this.cuttingDirection=new b(0,0,1),this.tipQuaternion=new Oe,this.handlePosition=new b,this.gripPosition=new b,this.gripLocal=new b(e.name==="needle-driver"?-bt.lateralBallOffset:bt.lateralBallOffset,0,bt.proximalShaftZ),this.shaftDirection=new b,this.rcmError=0,this.localTip=new b,this.desired=new b,this.port=new b,this.delta=new b,this.localFromPort=new b,this.alignment=new Oe,this.compensation=new Oe,this.inverseRoot=new Fe,this.scratch=new b,this.previousDirection=new b(0,0,-1),this.transport=new Oe,this.nextAlignment=new Oe,this.initialized=!1,this.rcmFeasible=!0,this.coupler=Gy(this.group,e.name==="needle-driver"?"#5faaa9":"#c3a46b"),this.proximalGrip=Wy(this.group,e.name==="needle-driver"?"left":"right",e.name==="needle-driver"?"#5faaa9":"#c3a46b")}update(e){Cn(this,"roll",e.wrist[2],!0),Cn(this,"wrist_pitch",e.wrist[0],!0),Cn(this,"wrist_yaw",e.wrist[1],!0);const t=Ii(e.jaw,0,1)*1.1;Cn(this,"jaw",t),Cn(this,"jaw_1",t*.5),Cn(this,"jaw_2",-t*.5);const n=ui(e);this.localTip.fromArray(n.localTip),this.desired.fromArray(e.position),this.port.fromArray(e.port),this.alignment.fromArray(n.alignment),this.previousDirection.copy(Us).applyQuaternion(this.alignment),this.group.quaternion.fromArray(n.quaternion),this.group.position.fromArray(n.position),this.rcmFeasible=n.rcmFeasible,this.initialized=!0,this.group.updateWorldMatrix(!0,!0),this.tipNode.getWorldPosition(this.tipPosition),this.tipNode.getWorldQuaternion(this.tipQuaternion),this.cuttingDirection.copy(Us).applyQuaternion(this.tipQuaternion).normalize(),this.handlePosition.copy(this.group.position),this.gripPosition.copy(this.gripLocal).applyQuaternion(this.group.quaternion).add(this.group.position),this.shaftDirection.copy(Us).applyQuaternion(this.group.quaternion),this.scratch.subVectors(this.port,this.group.position),this.scratch.addScaledVector(this.shaftDirection,-this.scratch.dot(this.shaftDirection)),this.rcmError=this.scratch.length()}}class Yy{constructor(e){Object.assign(this,e),this.tipNode=this.group.getObjectByName("tip_link"),this.tipPosition=new b,this.handlePosition=new b,this.desired=new b,this.direction=new b,this.previousDirection=new b(0,-1,0),this.transport=new Oe,this.alignment=new Oe,this.initialized=!1,this.supportPosition=new b,this.offset=new b(...e.metadata.tipPositionAtZero),this.scratch=new b,this.roll=new Oe}update(e){this.desired.fromArray(e.position),this.direction.fromArray(e.port).sub(this.desired).negate(),this.direction.lengthSq()<1e-12?this.direction.copy(this.previousDirection):this.direction.normalize(),this.initialized?this.alignment.premultiply(this.transport.setFromUnitVectors(this.previousDirection,this.direction)):this.alignment.setFromUnitVectors(Us,this.direction),this.previousDirection.copy(this.direction),this.initialized=!0,this.group.quaternion.copy(this.alignment).multiply(this.roll.setFromAxisAngle(Us,e.roll)),this.group.position.copy(this.desired).sub(this.scratch.copy(this.offset).applyQuaternion(this.group.quaternion)),this.group.updateWorldMatrix(!0,!0),this.tipNode.getWorldPosition(this.tipPosition),this.handlePosition.copy(this.group.position),this.supportPosition.fromArray(e.port).addScaledVector(this.direction,-.1)}}class Ky{constructor(e,t){Object.assign(this,e),this.mount=new Ye,this.mount.name="Custom_G1_Chest_Adapter",this.mount.position.set(0,1.17,.47),this.mount.rotation.x=-Math.PI/2,this.mount.add(this.group),t.add(this.mount);const n=on("#8f9ea1",.78,.32),s=on("#263336",.2,.56);dt(this.mount,new mn(.14,.014,.12,2,.005),s,[0,-.09,0]).name="Custom_Chest_Backplate",dt(this.mount,new mn(.105,.012,.085,2,.004),n).name="Custom_Z1_Baseplate";for(const o of[-.047,.047])for(const a of[-.034,.034])dt(this.mount,new Vt(.006,.006,.086,12),n,[o,-.047,a]),dt(this.mount,new Vt(.004,.004,.004,8),s,[o,.008,a]);const r=dt(this.mount,new Tn(.034,.003,8,32),s,[0,.008,0]);r.rotation.x=Math.PI/2,this.end=new ht,this.end.name="Custom_Endoscope_Coupler_TCP",this.end.position.set(.027,0,0),this.group.getObjectByName("link06").add(this.end),this.chain=[...this.joints.values()].filter(o=>o.specification.type==="revolute"),this.position=new b,this.pivot=new b,this.axis=new b,this.toEnd=new b,this.toTarget=new b,this.cross=new b,this.quaternion=new Oe,this.lastTarget=new b(1/0,1/0,1/0),this.accumulated=0,this.initialized=!1,this.error=0,this.stallTime=0,this.recoveryCooldown=0,this.recoveryPose=null,this.recoveries=0,this.baseInverse=new Fe,this.baseTarget=new b,this.frameBounds=null,[0,1.4,-1.8,.35,0,0].forEach((o,a)=>Cn(this,`joint${a+1}`,o))}solve(e,t,n=.18){for(let s=0;s<t;s++){for(let r=this.chain.length-1;r>=0;r--){const o=this.chain[r];if(this.mount.updateWorldMatrix(!0,!0),o.node.getWorldPosition(this.pivot),this.end.getWorldPosition(this.position),o.node.getWorldQuaternion(this.quaternion),this.axis.copy(o.axis).applyQuaternion(this.quaternion).normalize(),this.toEnd.subVectors(this.position,this.pivot),this.toTarget.subVectors(e,this.pivot),this.toEnd.addScaledVector(this.axis,-this.toEnd.dot(this.axis)),this.toTarget.addScaledVector(this.axis,-this.toTarget.dot(this.axis)),this.toEnd.lengthSq()<1e-12||this.toTarget.lengthSq()<1e-12)continue;this.toEnd.normalize(),this.toTarget.normalize(),this.cross.crossVectors(this.toEnd,this.toTarget);const a=Math.atan2(this.axis.dot(this.cross),Ii(this.toEnd.dot(this.toTarget),-1,1));Cn(this,o.specification.name,o.angle+Ii(a,-n,n))}if(this.mount.updateWorldMatrix(!0,!0),this.end.getWorldPosition(this.position),this.position.distanceToSquared(e)<1e-8)break}this.end.getWorldPosition(this.position),this.error=this.position.distanceTo(e)}recover(e){const t=this.chain.map(l=>l.angle),n=this.frameBounds;this.frameBounds=null,this.mount.updateWorldMatrix(!0,!0),this.baseInverse.copy(this.group.getObjectByName("link00").matrixWorld).invert(),this.baseTarget.copy(e).applyMatrix4(this.baseInverse);let s=Math.atan2(-this.baseTarget.y,-this.baseTarget.x);s=Math.atan2(Math.sin(s),Math.cos(s));const r=[[s,.35,-1.3,0,0,0],[s,1.4,-2,.3,0,0],[s,2.6,-2,-.8,0,0],[s,1,-.5,-.8,.7,0],[s,.04,-.65,1.45,0,0],[s,.15,-1.25,1.45,-.6,0]];let o=this.error,a=null;for(const l of r)if(l.forEach((c,h)=>Cn(this,`joint${h+1}`,c)),this.solve(e,36,.3),this.error<o&&(o=this.error,a=this.chain.map(c=>c.angle)),o<2e-4)break;t.forEach((l,c)=>Cn(this,this.chain[c].specification.name,l)),this.frameBounds=n,this.mount.updateWorldMatrix(!0,!0),this.end.getWorldPosition(this.position),this.error=this.position.distanceTo(e),a&&o<this.error*.65&&(this.recoveryPose=a,this.recoveries++),this.recoveryCooldown=.65,this.stallTime=0}update(e,t){const n=Math.min(.1,Math.max(0,t||0));if(this.accumulated+=n,this.recoveryCooldown=Math.max(0,this.recoveryCooldown-n),!this.initialized)this.solve(e,80,.25),this.initialized=!0,this.accumulated=0,this.error>.003&&this.recover(e);else if(this.accumulated>=1/30){const s=this.accumulated;if(this.accumulated=0,this.frameBounds=new Map(this.chain.map(r=>{const o=(r.specification.limit?.velocity??Math.PI)*s;return[r.specification.name,{lower:r.angle-o,upper:r.angle+o}]})),this.recoveryPose){let r=0;for(let o=0;o<this.chain.length;o++){const a=this.chain[o],l=this.recoveryPose[o]-a.angle;r+=Math.abs(l),Cn(this,a.specification.name,a.angle+Ii(l,-2.4*s,2.4*s))}r<.025&&(this.recoveryPose=null)}this.recoveryPose?(this.mount.updateWorldMatrix(!0,!0),this.end.getWorldPosition(this.position),this.error=this.position.distanceTo(e)):this.solve(e,4),this.error<.002?(this.stallTime=0,this.recoveryPose=null):(this.stallTime+=s,!this.recoveryPose&&this.stallTime>.18&&this.recoveryCooldown===0&&this.recover(e)),this.frameBounds=null}this.lastTarget.copy(e)}}async function $y(i){const e=new ko,[t,n,s,r]=await Promise.all([Ao(e,"needle-driver"),Ao(e,"scissors"),Ao(e,"endoscope"),Ao(e,"z1")]),o={left:new Fu(t),right:new Fu(n)},a=new Yy(s),l=new Ky(r,i);i.add(o.left.group,o.right.group,a.group);const c=new Ye;c.name="Concept_Virtual_Master_Slave_Connections",i.add(c);const h={};for(const[_,m]of[["left","#5eaaa9"],["right","#b9a06f"]]){const p=new Nt;p.setAttribute("position",new ct(new Float32Array(6),3));const M=new ea(p,new vm({color:m,transparent:!0,opacity:.6,dashSize:.012,gapSize:.009,depthWrite:!1}));M.name=`Concept_${_}_Virtual_Teleoperation_Link`,M.layers.set(0);const y=dt(c,new Tn(.014,.0024,8,24),on(m,.28,.4));y.name=`Concept_${_}_Master_Grip_Indicator`,M.visible=y.visible=!1,c.add(M);const S=jy(c,_,m);S.visible=!1,h[_]={line:M,controller:y,saddle:S,clevis:o[_].proximalGrip.getObjectByName("Custom_Fixed_Size_Palm_Clearance_Clevis"),sourceHand:null,cloud:null,transformed:null,inverse:new Oe,relative:new Oe,point:new b,origin:new b,initialized:!1}}const u=new Ye;u.name="Custom_Universal_Endoscope_Shaft_Clamp",i.add(u),dt(u,new Tn(.0065,.002,8,28),on("#879b9d",.78,.3)),dt(u,new mn(.014,.011,.016,2,.002),on("#28373a",.2,.52),[.011,0,0]);let d=!1,f=1/60;const g={loaded:!0,toolNames:Object.freeze({left:"持针钳",right:"单极弯剪"}),tools:o,scope:a,scopeArm:l,scopeMount:l.mount,scopeArmError:0,scopeHandlePosition:a.handlePosition,scopeSupportPosition:a.supportPosition,toolTipPositions:{left:o.left.tipPosition,right:o.right.tipPosition},toolDirections:{left:o.left.cuttingDirection,right:o.right.cuttingDirection},toolHandlePositions:{left:o.left.handlePosition,right:o.right.handlePosition},toolGripPositions:{left:o.left.gripPosition,right:o.right.gripPosition},handGripPositions:{left:new b,right:new b},handGripQuaternions:{left:new Oe,right:new Oe},toolRCMErrors:{left:0,right:0},toolRCMFeasible:{left:!0,right:!0},connectionModes:{left:"direct",right:"direct"},conceptDecoupled:!1,resetPose(){o.left.initialized=o.right.initialized=a.initialized=!1,l.initialized=!1,l.recoveryPose=null,l.accumulated=0,l.frameBounds=null,l.stallTime=0,l.recoveryCooldown=0;for(const _ of Object.values(h))_.initialized=!1},connectHands(_,m,p){g.conceptDecoupled=!1;for(const M of["left","right"]){const y=h[M],S=_[M],P=(m[M]??0)>.003;if(g.connectionModes[M]=P?"virtual":"direct",g.conceptDecoupled||=P,y.line.visible=y.controller.visible=P,!S)continue;const E=o[M].gripPosition,C=y.line.geometry.attributes.position;C.setXYZ(0,S.x,S.y,S.z),C.setXYZ(1,E.x,E.y,E.z),C.needsUpdate=!0,y.line.computeLineDistances(),y.line.geometry.computeBoundingSphere(),y.controller.position.copy(S);const R=p?.[M]??o[M].group.quaternion;if(y.controller.quaternion.copy(R),y.saddle.visible=!0,y.saddle.position.copy(S),y.saddle.quaternion.copy(R),g.handGripPositions[M].copy(S),g.handGripQuaternions[M].copy(R),y.sourceHand??=i.getObjectByName(`${M}_rubber_hand`),y.sourceHand&&!y.cloud&&(y.cloud=Xy(y.sourceHand,bt[M]),y.transformed=new Float64Array(y.cloud.length)),y.cloud){y.inverse.copy(o[M].group.quaternion).invert(),y.relative.copy(y.inverse).multiply(R),y.origin.copy(S).sub(o[M].group.position).applyQuaternion(y.inverse);for(let L=0;L<y.cloud.length;L+=3)y.point.fromArray(y.cloud,L).applyQuaternion(y.relative).add(y.origin),y.point.toArray(y.transformed,L);const v=y.clevis.rotation.x,x=o[M].gripLocal.x;let A=v,D=Uu(y.transformed,v,x);if(D<.01)for(let L=1;L<=128;L++){const k=v+Math.ceil(L/2)*(L%2?1:-1)*Math.PI/64,F=Uu(y.transformed,k,x);if(F>D&&(D=F,A=k),F>=.01)break}const U=Math.atan2(Math.sin(A-v),Math.cos(A-v));y.clevis.rotation.x=y.initialized?v+Ii(U,-4.8*f,4.8*f):A,y.initialized=!0}}},update(_,m=1/60){if(!d){f=Ii(Number.isFinite(m)?m:1/60,.001,.05);for(const p of["left","right"])o[p].update(_.tools[p]),g.toolRCMErrors[p]=o[p].rcmError,g.toolRCMFeasible[p]=o[p].rcmFeasible;a.update(_.scope),l.update(a.supportPosition,m),g.scopeArmError=l.error,u.position.copy(a.supportPosition),u.quaternion.setFromUnitVectors(Us,a.direction)}},dispose(){if(d)return;d=!0;const _=new Set,m=new Set;for(const p of[o.left.group,o.right.group,a.group,l.mount,c,u])p.removeFromParent(),p.traverse(M=>{if(M.geometry&&_.add(M.geometry),M.material)for(const y of Array.isArray(M.material)?M.material:[M.material])m.add(y)});_.forEach(p=>p.dispose()),m.forEach(p=>p.dispose())}};return g}const fr={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`},Zy=new na(-1,1,1,-1,0,1);class Jy extends Nt{constructor(){super(),this.setAttribute("position",new pt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new pt([0,2,0,0,2,0],2))}}const Qy=new Jy;class eM{constructor(e){this._mesh=new qe(Qy,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Zy)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class tM{constructor(e,t=1.1){const n=e.extensions?.has("EXT_color_buffer_float")??!1;this.target=new Ni(1,1,{type:n?Ks:Nn,minFilter:en,magFilter:en,depthBuffer:!0}),this.target.texture.colorSpace=Kt,this.target.texture.name="Linear_Real_Time_Endoscope_Feed";const s=Zl.clone(fr.uniforms);s.tDiffuse.value=this.target.texture,s.toneMappingExposure.value=t,this.outputMaterial=new Xh({...fr,uniforms:s,defines:{ACES_FILMIC_TONE_MAPPING:"",SRGB_TRANSFER:""},depthTest:!1,depthWrite:!1,toneMapped:!1});const r=Zl.clone(fr.uniforms);r.tDiffuse.value=this.target.texture,r.toneMappingExposure.value=t,r.feedAspect={value:1},r.screenAspect={value:1.6},this.monitorMaterial=new Xh({...fr,uniforms:r,defines:{ACES_FILMIC_TONE_MAPPING:"",SRGB_TRANSFER:""},toneMapped:!1,fragmentShader:fr.fragmentShader.replace("varying vec2 vUv;",`varying vec2 vUv;
uniform float feedAspect;
uniform float screenAspect;`).replace("gl_FragColor = texture2D( tDiffuse, vUv );",`vec2 feedUV=vUv;
float fit=screenAspect/feedAspect;
if(fit>1.0)feedUV.x=(feedUV.x-.5)*fit+.5;else feedUV.y=(feedUV.y-.5)/fit+.5;
if(any(lessThan(feedUV,vec2(0.0)))||any(greaterThan(feedUV,vec2(1.0)))){gl_FragColor=vec4(.008,.012,.016,1.0);return;}
gl_FragColor = texture2D( tDiffuse, feedUV );`)}),this.quad=new eM(this.outputMaterial),this.resolution={width:1,height:1},this.disposed=!1}capture(e,t,n,s,r){const o=e.getPixelRatio(),a=Math.max(1,Math.round(s*o)),l=Math.max(1,Math.round(r*o));(this.target.width!==a||this.target.height!==l)&&this.target.setSize(a,l),this.resolution={width:a,height:l},n.aspect=s/Math.max(1,r),n.updateProjectionMatrix(),this.monitorMaterial.uniforms.feedAspect.value=n.aspect;const c=e.getRenderTarget(),h=e.getScissorTest();try{e.setRenderTarget(this.target),e.setScissorTest(!1),e.clear(),e.render(t,n)}finally{e.setRenderTarget(c),e.setScissorTest(h)}}blit(e,t,n,s,r){const o=e.getViewport(new tt),a=e.getScissor(new tt),l=e.getScissorTest(),c=e.autoClear;try{e.autoClear=!1,e.setViewport(t,n,s,r),e.setScissorTest(!0),e.setScissor(t,n,s,r),this.quad.render(e)}finally{e.autoClear=c,e.setViewport(o),e.setScissor(a),e.setScissorTest(l)}}dispose(){this.disposed||(this.disposed=!0,this.target.dispose(),this.outputMaterial.dispose(),this.monitorMaterial.dispose(),this.quad.dispose())}}const Ot=(i,e=0,t=.6)=>new hi({color:i,metalness:e,roughness:t});function xt(i,e,t,n,s=.012){const r=new qe(new mn(...e,2,Math.min(s,...e.map(o=>o*.4))),n);return r.position.set(...t),r.castShadow=r.receiveShadow=!0,i.add(r),r}function Mi(i,e,t,n,s){const r=new b(...e),o=new b(...t),a=o.clone().sub(r),l=new qe(new Vt(n,n,a.length(),12),s);return l.position.copy(r).add(o).multiplyScalar(.5),l.quaternion.setFromUnitVectors(new b(0,1,0),a.normalize()),l.castShadow=l.receiveShadow=!0,i.add(l),l}function Ou(i,e,t,n,s="#405a61"){const r=document.createElement("canvas");r.width=768,r.height=128;const o=r.getContext("2d");o.fillStyle="#dce6e5",o.fillRect(0,0,768,128),o.fillStyle=s,o.font="500 40px sans-serif",o.textAlign="center",o.fillText(e,384,80);const a=new Ed(r);a.colorSpace=Ct;const l=new qe(new Ui(...t),new fn({map:a}));return l.position.set(...n),i.add(l),l}function nM(i,e){const t=new Ye;t.name="Surgical_Theatre",i.add(t);const n=Ot("#dbe5e4",.08,.54),s=Ot("#cbdcdb",.02,.9),r=Ot("#8aa8a8",.25,.5),o=Ot("#adbfc2",.8,.28),a=Ot("#344b54",.3,.44),l=Ot("#23343a",.05,.8),c=Ot("#4e8e93",0,.94),h=Ot("#96b5b2",.03,.81),u=new qe(new Ui(7,7),h);u.rotation.x=-Math.PI/2,u.receiveShadow=!0,t.add(u),xt(t,[4.8,2.65,.08],[0,1.325,1.75],s),xt(t,[.08,2.65,3.4],[2.4,1.325,.1],Ot("#d9e3e1",0,.9)),xt(t,[4.8,.11,.055],[0,.055,1.69],r);for(const C of[-2,-1.2,-.4,.4,1.2,2])xt(t,[.003,2.42,.006],[C,1.35,1.704],Ot("#b7cecb",.1,.8),.001);const d=new Ye;d.name="Adjustable_Operating_Table",t.add(d),xt(d,[.62,.065,1.4],[0,.875,-.41],o,.025),xt(d,[.59,.05,1.38],[0,.934,-.4],Ot("#3c5d63",0,.73),.025),xt(d,[.27,.66,.39],[0,.43,-.12],n,.025),xt(d,[.7,.06,.7],[0,.07,-.12],a,.025);for(const C of[-.29,.29])for(const R of[-.38,.14]){const v=new qe(new Vt(.045,.045,.027,18),l);v.position.set(C,.045,R),v.rotation.z=Math.PI/2,d.add(v)}for(const C of[-.33,.33])Mi(d,[C,.85,-.93],[C,.85,.22],.009,o);const f=xt(d,[.26,.055,.23],[0,.985,-.49],Ot("#d7e7e4",0,.96),.045);f.rotation.x=.05;const g=new Ye;g.name="G1_Stable_Mounting_Platform",t.add(g),xt(g,[.6,.29,.58],[0,.145,.51],Ot("#708b8d",.55,.44)),xt(g,[.59,.01,.57],[0,.295,.51],l,.008);for(const C of[-.285,.285])xt(g,[.006,.003,.54],[C,.302,.51],Ot("#c4b784",.3,.6),.001);const _=new Ye;_.name="Live_Endoscopic_Monitor",_.position.set(-.73,1.38,-.4),_.rotation.y=2.15,t.add(_),xt(_,[.35,.24,.027],[0,0,0],l,.012);const m=new qe(new Ui(.32,.2),e);m.position.z=.0145,m.name="Same_Frame_Endoscopic_LCD",_.add(m);const p=new qe(new ci(.0025,8,6),new fn({color:"#69dda8"}));p.position.set(.145,-.108,.015),_.add(p),Mi(t,[-.73,.1,-.4],[-.73,1.27,-.4],.012,o),xt(t,[.35,.035,.29],[-.73,.09,-.4],a),Ou(_,"MIRA  |  LIVE ENDOSCOPE",[.25,.033],[0,-.103,.015],"#405b58");const M=new Ye;M.position.set(-1.57,0,1.45),M.name="Sealed_Clinical_Storage",t.add(M),xt(M,[.85,1.78,.42],[0,.92,0],n,.015);for(const C of[-.21,.21])xt(M,[.404,1.65,.018],[C,.95,-.22],Ot("#c9d9d7",.02,.58)),Mi(M,[C+(C>0?-.14:.14),.9,-.243],[C+(C>0?-.14:.14),1.14,-.243],.006,o);const y=new Ye;y.position.set(1.31,0,1.69),t.add(y),xt(y,[.98,2.2,.025],[0,1.12,0],r,.008),xt(y,[.9,2.1,.019],[0,1.13,-.023],Ot("#b7d1d0",.05,.58)),xt(y,[.32,.45,.013],[0,1.55,-.043],Ot("#537478",.2,.31)),Mi(y,[.34,.91,-.049],[.34,1.16,-.049],.008,o);const S=Ou(y,"OPERATING THEATRE  01",[.68,.11],[0,2.36,-.025]);S.rotation.y=Math.PI;const P=new Ye;P.position.set(-.95,0,.66),P.name="Sterile_Instrument_Trolley",t.add(P),xt(P,[.52,.035,.42],[0,.86,0],o),xt(P,[.48,.012,.38],[0,.884,0],c,.006),xt(P,[.45,.018,.35],[0,.31,0],o);for(const C of[-.21,.21])for(const R of[-.16,.16]){Mi(P,[C,.085,R],[C,.85,R],.01,o);const v=new qe(new Vt(.032,.032,.021,12),l);v.position.set(C,.055,R),v.rotation.z=Math.PI/2,P.add(v)}xt(P,[.28,.025,.19],[.025,.903,0],Ot("#b7c9ca",.75,.24),.025);const E=new fn({color:"#fffaf2"});for(const[C,R]of[-.48,.48].entries()){const v=new Ye;v.position.set(R,2.02+C*.1,-.07+C*.27),v.rotation.z=R<0?-.18:.18,t.add(v),Mi(t,[R,2.6,.4],[R,2.45,.4],.017,n),Mi(t,[R,2.45,.4],[R,2.36+C*.1,-.07+C*.27],.014,o),Mi(t,[R,2.36+C*.1,-.07+C*.27],[R,2.035+C*.1,-.07+C*.27],.012,o);const x=new qe(new Vt(.235,.26,.045,48),n);v.add(x);for(let D=0;D<7;D++){const U=(D-1)*Math.PI/3,L=D?.135:0,k=new qe(new Uc(.055,12),E);k.rotation.x=Math.PI/2,k.position.set(Math.cos(U)*L,-.025,Math.sin(U)*L),v.add(k)}const A=new qe(new Vt(.013,.017,.1,12),l);A.position.y=-.075,v.add(A)}for(const C of[-.8,.8])xt(t,[.52,.012,.72],[C,2.61,.7],new fn({color:"#edf5f2"}));return t.traverse(C=>C.layers.set(0)),{room:t,monitor:_,monitorScreen:m,platform:g}}const tl=new b,uc=new b(0,1,0),ku=new Oe,Ro="./",Sn=(i,e=0,t=.5)=>new hi({color:i,metalness:e,roughness:t});Sn("#c7d0d2",.95,.23);const iM=Sn("#607178",.85,.3),Bu=Sn("#142024",.25,.4);function ti(i,e,t){const n=new qe(i,e);return n.castShadow=!0,n.receiveShadow=!0,t?.add(n),n}function Pr(i,e,t,n,s=0){const r=ti(s?new mn(...i,3,Math.min(s,...i.map(o=>o*.45))):new Fi(...i),t,n);return r.position.set(...e),r}function qi(i,e,t,n){const s=ti(new ci(1,40,28),t,n);return s.scale.set(...i),s.position.set(...e),s}function sM(i,e,t){tl.subVectors(t,e);const n=tl.length();i.position.copy(e).add(t).multiplyScalar(.5),i.quaternion.setFromUnitVectors(uc,tl.normalize()),i.scale.set(1,Math.max(n,1e-5),1)}function rM(){const i=document.createElement("canvas");i.width=i.height=256;const e=i.getContext("2d");let t=1234;const n=()=>(t=Math.imul(t,1664525)+1013904223|0,(t>>>0)/4294967296);e.fillStyle="#b39e91",e.fillRect(0,0,256,256);for(let r=0;r<7500;r++){const o=n(),a=n(),l=n()*2+.3;e.fillStyle=`rgba(${n()>.5?"205,182,160":"104,83,78"},${n()*.15})`,e.beginPath(),e.ellipse(o*256,a*256,l,l*.6,0,0,7),e.fill()}const s=new Ed(i);return s.wrapS=s.wrapT=ts,s.repeat.set(3,3),s.colorSpace=Ct,s}function oM(i){const e=new Ui(.78,.96,40,48),t=e.attributes.position;for(let o=0;o<t.count;o++){const a=t.getX(o),l=t.getY(o),c=Math.abs(a)/.39;t.setZ(o,-.075*c**4+.0028*Math.sin(31*a+7*l)*Math.sin(23*l)+.0015*Math.cos(57*a-19*l))}e.computeVertexNormals();const n=Sn("#467e82",0,.97);n.side=un,n.onBeforeCompile=o=>{o.vertexShader=`varying vec2 drapeLocal;
`+o.vertexShader,o.vertexShader=o.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
drapeLocal=position.xy;`),o.fragmentShader=`varying vec2 drapeLocal;
`+o.fragmentShader,o.fragmentShader=o.fragmentShader.replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
if(drapeLocal.y<-.30||(abs(drapeLocal.x)<.168&&abs(drapeLocal.y)<.198))discard;`)},n.customProgramCacheKey=()=>"cotton-operative-drape-window";const s=ti(e,n,i);s.name="Sterile_Fenestrated_Surgical_Drape",s.rotation.x=-Math.PI/2,s.position.set(0,1.14,0),s.layers.set(0);const r=Sn("#79a5a3",0,.98);for(const o of[-.174,.174])Pr([.007,.001,.41],[o,1.142,0],r,i);for(const o of[-.204,.204])Pr([.35,.001,.007],[0,1.142,o],r,i);return s}class aM{constructor(e,t,n){this.stage=t,this.mini=n,this.mode="endo",this.disposed=!1,this.ready=!1,this.renderer=new Px({canvas:e,antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!1}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.5)),this.renderer.setSize(t.clientWidth,t.clientHeight,!1),this.renderer.outputColorSpace=Ct,this.renderer.toneMapping=ed,this.renderer.toneMappingExposure=1.15,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Qu,this.renderer.info.autoReset=!1,this.scopeFeed=new tM(this.renderer,1.1),this.scene=new Md,this.scene.background=new De("#a4b3b3");const s=new tc(this.renderer);this.env=s.fromScene(new Hy,.04),this.scene.environment=this.env.texture,s.dispose(),this.overviewCamera=new qt(42,1,.015,30),this.overviewCamera.position.set(1.68,2.02,-1.92),this.endoCamera=new qt(55,1,.003,5),this.endoCamera.layers.set(1),this.controls=new Cy(this.overviewCamera,e),this.controls.target.set(0,1.2,.18),this.controls.enableDamping=!0,this.controls.minDistance=.3,this.controls.maxDistance=4,this.controls.maxPolarAngle=Math.PI*.49,this.controls.enabled=!1;const r=new qh("#f4f7f6","#667572",1.35);this.scene.add(r);const o=new qh("#fff9f3","#9c7670",.6);o.layers.set(1),this.scene.add(o);const a=new ec("#fff5e8",2.1);a.position.set(-1.6,3.2,-1.4),a.castShadow=!0,a.shadow.mapSize.set(1024,1024),a.shadow.camera.left=-1.6,a.shadow.camera.right=1.6,a.shadow.camera.top=1.6,a.shadow.camera.bottom=-1.6,a.shadow.normalBias=.0015,this.scene.add(a);const l=new ec("#dcebf0",.75);l.position.set(2.2,1.8,.7),this.scene.add(l),this.scopeLight=new Ud("#fffaf5",.14,.6,.72,.82,1),this.scopeLight.layers.set(1),this.scopeLight.target=new ht,this.scene.add(this.scopeLight,this.scopeLight.target),this._makeRoom(),this._makePatient(),this._makeTools(),this._makeScopeArm(),this.robot=new Ye,this.robot.position.set(0,1.0922729,.42),this.robot.rotation.y=Math.PI/2,this.scene.add(this.robot),this.joints=[],this.robotLoaded=!1,this.armTargets={left:new b,right:new b},this.armErrors={left:0,right:0},this.handPositions={left:new b,right:new b},this.conceptDecoupled=!1,this.kinematicLimited=!1,this.targetMarker=ti(new ci(.0011,12,8),new fn({color:"#9de3c6"}),this.scene),this.targetMarker.layers.set(1),this.targetMarker.visible=!1,this._makeCollisionMarkers(),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(t),this.lastMini=0}async loadRobot(){const e=new ko,[t,n]=await Promise.all([e.loadAsync(Ro+"assets/g1.glb"),fetch(Ro+"assets/g1-kinematics.json")]),s=await n.json();this.robot.add(t.scene),this.robot.updateMatrixWorld(!0),t.scene.traverse(r=>{r.isMesh&&(r.castShadow=!0,r.receiveShadow=!0,r.geometry.attributes.normal||r.geometry.computeVertexNormals(),r.material&&(r.material.roughness=.38,r.material.metalness=.11,r.material.name==="dark"?(r.material.color.set("#141a1e"),r.material.roughness=.47,r.material.metalness=.08):r.material.name==="white"&&r.material.color.set("#d9dfde")))}),this.robotModel=t.scene,this.robotMetadata=s;for(const r of s.joints){const o=t.scene.getObjectByName(r.name);!o||r.type==="fixed"||(o.userData.rest=o.quaternion.clone(),o.userData.angle=0,o.userData.axis=new b(...r.axis),o.userData.limit=r.limit||r.limits||{lower:-Math.PI,upper:Math.PI},this.joints.push(o))}for(const r of["left","right"])this.setJoint(r+"_shoulder_pitch_joint",.8),this.setJoint(r+"_shoulder_roll_joint",r==="left"?.2:-.2),this.setJoint(r+"_elbow_joint",1.1);this.handMarkers={},this.handQuaternions={left:new Oe,right:new Oe};for(const r of["left","right"]){const o=t.scene.getObjectByName(r+"_rubber_hand");if(o){const a=new ht;a.name=r+"_Measured_Palm_Grip_Frame",a.position.fromArray(bt[r]),o.add(a),this.handMarkers[r]=a}}return this.robotLoaded=!0,s}async loadAnatomy(){this.assemblies=await $y(this.scene),this.assemblies.scopeMount.position.set(this.robot.position.x,this.robot.position.y+.2377271,this.robot.position.z-.17),this.assemblies.scopeMount.quaternion.premultiply(ku.setFromAxisAngle(new b(0,0,1),Math.PI)),Object.values(this.tools).forEach(n=>n.group.visible=!1),this.scopeShaft.visible=!1,this.scopeHead.visible=!1,this.scopeLens.visible=!1,this.scopeArm.visible=!1;const e=await new ko().loadAsync(Ro+"assets/patient-skin.glb");e.scene.rotation.x=-Math.PI/2,e.scene.position.set(0,1.035,0),e.scene.traverse(n=>{n.isMesh&&(n.geometry.attributes.normal||n.geometry.computeVertexNormals(),n.material=new hi({color:"#bfa08a",roughness:.65,metalness:0,side:un}),n.material.onBeforeCompile=s=>{s.vertexShader=`varying vec3 patientLocal;
`+s.vertexShader,s.vertexShader=s.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
patientLocal=position;`),s.fragmentShader=`varying vec3 patientLocal;
`+s.fragmentShader,s.fragmentShader=s.fragmentShader.replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
if(abs(patientLocal.x)<.17&&abs(patientLocal.y)<.20&&patientLocal.z>0.0)discard;
if(patientLocal.y<-.30)discard;`)},n.material.customProgramCacheKey=()=>"anatomy-teaching-window",n.castShadow=!0,n.receiveShadow=!0,n.layers.set(0))}),this.scene.add(e.scene),this.patientOuter.children[0].visible=!1,this.patientOuter.children[3].visible=!1,this.patientOuter.children[4].visible=!1,this.patientOuter.children[1].visible=!1,this.patientOuter.children[2].visible=!1,this.patientOuter.children[5].visible=!1,this.patientOuter.children[6].visible=!1,this.patientOuter.children[7].visible=!1,this.drape=oM(this.patientOuter);const t=await new ko().loadAsync(Ro+"assets/hepatobiliary-context.glb");return this.anatomicContext=t.scene,this.anatomicContext.rotation.x=-Math.PI/2,this.anatomicContext.position.set(0,1.035,0),this.anatomicContext.traverse(n=>{n.isMesh&&(n.layers.enable(1),n.castShadow=n.receiveShadow=!0,n.geometry.attributes.normal||n.geometry.computeVertexNormals(),n.material.roughness=.48,n.material.metalness=0)}),this.scene.add(this.anatomicContext),this.gallbladder.visible=!1,this.schematicVessels.visible=!1,this.cavity.children[1].visible=!1,this.assemblies}setJoint(e,t){this._jointByName??=new Map;let n=this._jointByName.get(e);if(n||(n=this.robotModel?.getObjectByName(e),n&&this._jointByName.set(e,n)),!n?.userData.rest||!Number.isFinite(t))return;const s=n.userData.limit;if(t=ni.clamp(t,s.lower??-Math.PI,s.upper??Math.PI),n.userData.angle=t,n.quaternion.copy(n.userData.rest).multiply(ku.setFromAxisAngle(n.userData.axis,t)),!this._ikSolving&&this._armIK)for(const r of Object.values(this._armIK))r.valid=!1}_makeRoom(){const e=nM(this.scene,this.scopeFeed.monitorMaterial);this.room=e.room,this.monitor=e.monitor,this.monitorScreen=e.monitorScreen,this.robotPlatform=e.platform}_makePatient(){const e=new Ye;this.patientOuter=e,this.scene.add(e);const t=Sn("#436c70",.05,.94);t.normalMap=null,qi([.22,.12,.52],[0,.99,-.13],t,e),Pr([.49,.035,.48],[0,1.03,-.63],t,e),Pr([.49,.035,.46],[0,1.03,.38],t,e);const n=Sn("#bb8d75",0,.7);qi([.1,.105,.125],[0,1.035,-.76],n,e),qi([.105,.044,.105],[0,1.11,-.76],Sn("#558c89",0,.7),e);const s=Sn("#c99882",0,.65);s.transparent=!0,s.opacity=.22,s.depthWrite=!1,qi([.17,.095,.23],[0,1.09,-.02],s,e);for(const c of[-.22,.22])Pr([.11,.04,.51],[c,1.105,-.02],t,e);this.cavity=new Ye,this.scene.add(this.cavity);const r=new gn({color:"#b6afa2",roughness:.76,metalness:0,side:Yt,map:rM(),clearcoat:.08,clearcoatRoughness:.58}),o=qi([.25,.16,.29],[0,1.085,0],r,this.cavity);o.layers.set(1),o.castShadow=!1,qi([.18,.028,.13],[0,1,-.14],Sn("#ac7b74",0,.55),this.cavity).layers.enable(1),this.gallbladder=qi([.012,.017,.032],[-.032,1.001,.055],new gn({color:"#68804b",roughness:.3,clearcoat:.6}),this.cavity),this.gallbladder.rotation.z=.3,this.gallbladder.layers.enable(1),this.schematicVessels=new Ye,this.cavity.add(this.schematicVessels);const l=Sn("#794240",.05,.4);for(let c=0;c<3;c++){const h=new Pd([new b(-.035+c*.014,.997,-.02),new b(-.025+c*.013,1.003,.016),new b(-.038+c*.02,1.002,.05)]);ti(new Oc(h,16,.0015,6,!1),l,this.schematicVessels).layers.enable(1)}this.portMeshes=[];for(const[c,h]of[[-.08,.1],[.08,.1],[0,.14]]){const u=new Ye;u.position.set(c,1.18,h),this.scene.add(u);const d=ti(new Tn(.009,.0016,8,24),Sn("#73a7a4",.3,.42),u);d.rotation.x=Math.PI/2;const f=ti(new Vt(.007,.006,.015,20),Bu,u);f.position.y=-.006;const g=ti(new Vt(.0054,.0048,.064,16),iM,u);g.position.y=.032;const _=ti(new Tn(.0061,.0011,8,20),Bu,u);_.rotation.x=Math.PI/2,_.position.y=-.014,this.portMeshes.push(u)}}_makeTools(){this.tools={left:{group:new Ye},right:{group:new Ye}},this.scopeShaft=new Ye,this.scopeHead=new Ye,this.scopeLens=new Ye}_makeScopeArm(){this.scopeArm=new Ye}addTissue(e){this.tissue=e,e.group.position.set(0,1.035,0),this.scene.add(e.group),e.group.traverse(t=>{t.layers.enable(1),t.isMesh&&(t.castShadow=!0,t.receiveShadow=!0)})}resize(){const e=this.stage.clientWidth,t=this.stage.clientHeight;e<1||t<1||(this.renderer.setSize(e,t,!1),this.overviewCamera.aspect=e/t,this.overviewCamera.updateProjectionMatrix(),this.endoCamera.aspect=e/t,this.endoCamera.updateProjectionMatrix())}setMode(e){this.mode=e,this.controls.enabled=e==="overview"}get scopeAspect(){const e=this.mode==="endo"?this.stage:this.mini;if(e===this.stage)return Math.max(1,e.clientWidth)/Math.max(1,e.clientHeight);const t=e.getBoundingClientRect();return Math.max(1,t.width)/Math.max(1,t.height)}home(){this.overviewCamera.position.set(1.68,2.02,-1.92),this.controls.target.set(0,1.2,.18),this.controls.update()}releaseKinematicGuard(){this.acceptedArmPoses={},this.kinematicLimited=!1,this._armIK=null,this.assemblies?.resetPose()}guardArmTargets(){return this.kinematicLimited=!1,!1}_makeCollisionMarkers(){const e=this.collisionMarkers=new Ye;e.name="Measured_Instrument_Contact",e.visible=!1,this.scene.add(e);const t=new fn({color:"#ffc76d"}),n=new ci(65e-5,10,8);e.userData.points=["left","right"].map(r=>{const o=new qe(n,t);return o.name=r+"_Surface_Contact_Point",o.layers.enable(1),e.add(o),o});const s=e.userData.line=new qe(new Vt(18e-5,18e-5,1,8),t);s.name="Surface_Contact_Gap",s.layers.enable(1),e.add(s),e.layers.enable(1)}_updateCollisionMarkers(e){const t=this.collisionMarkers;if(!t)return;const n=e?.closestPoints,s=l=>Array.isArray(l)&&l.length===3&&l.every(Number.isFinite);if(t.visible=!!(e?.blocked||e?.contact)&&s(n?.left)&&s(n?.right),!t.visible)return;const[r,o]=t.userData.points;r.position.fromArray(n.left),o.position.fromArray(n.right);const a=r.position.distanceTo(o.position);t.userData.line.visible=a>1e-6&&a<.012,t.userData.line.visible&&sM(t.userData.line,r.position,o.position)}solveArm(e,t,n=1/60,s=null){if(!this.robotLoaded)return;this._armIK??={};let r=this._armIK[e];if(!r){const U=["shoulder_pitch","shoulder_roll","shoulder_yaw","elbow","wrist_roll","wrist_pitch","wrist_yaw"].map(k=>this.robotModel.getObjectByName(e+"_"+k+"_joint")).filter(Boolean),L=this.handMarkers?.[e]||this.robotModel.getObjectByName(e+"_wrist_yaw_link")||U.at(-1);if(!L)return;r=this._armIK[e]={chain:U,end:L,valid:!1,settled:!1,stationaryFrames:0,error:1/0,bestError:1/0,target:new b,rootMatrix:new Fe,bestAngles:new Float64Array(U.length),jacobian:new Float64Array(3*U.length),matrixElements:new Float64Array(9),centering:new Float64Array(U.length),orientationError:new b,orientationQ:new Oe,goalOrientation:new Oe,lower:new Float64Array(U.length),upper:new Float64Array(U.length),inverse:new ze,pivot:new b,endPos:new b,axis:new b,a:new b,b:new b,cross:new b,scale:new b,q:new Oe}}this.robot.updateWorldMatrix(!0,!1);const o=r.valid&&r.target.distanceToSquared(t)<1e-14&&r.rootMatrix.equals(this.robot.matrixWorld)&&(!s||1-Math.abs(r.goalOrientation.dot(s))<1e-12);if(o&&(r.error<2e-4||r.settled)){this.armErrors[e]=r.error;return}const{chain:a,end:l,pivot:c,endPos:h,axis:u,q:d,a:f,b:g,cross:_,scale:m,jacobian:p,matrixElements:M,centering:y,lower:S,upper:P,inverse:E,orientationError:C,orientationQ:R}=r,v=r.error;if(this.robot.updateMatrixWorld(!0),h.setFromMatrixPosition(l.matrixWorld),!o){r.target.copy(t),r.rootMatrix.copy(this.robot.matrixWorld),r.stationaryFrames=0,r.settled=!1,s&&r.goalOrientation.copy(s),r.bestError=h.distanceTo(t);for(let D=0;D<a.length;D++)r.bestAngles[D]=a[D].userData.angle}const x=a.length,A=ni.clamp(Number.isFinite(n)?n:1/60,.001,.05);for(let D=0;D<x;D++){const U=a[D],L=U.userData.limit,k=L.velocity??12;S[D]=Math.max(L.lower,U.userData.angle-k*A),P[D]=Math.min(L.upper,U.userData.angle+k*A)}this._ikSolving=!0;for(let D=0;D<6&&!(h.distanceToSquared(t)<4e-8);D++){if(C.set(0,0,0),s){l.matrixWorld.decompose(c,R,m),R.invert().premultiply(s).normalize(),R.w<0&&R.set(-R.x,-R.y,-R.z,-R.w);const L=Math.hypot(R.x,R.y,R.z),k=2*Math.acos(ni.clamp(R.w,-1,1));C.set(R.x,R.y,R.z).multiplyScalar(L>1e-10?k/L:0)}for(let L=0;L<x;L++){const k=a[L];k.matrixWorld.decompose(c,d,m),u.copy(k.userData.axis).applyQuaternion(d).normalize(),f.subVectors(h,c),_.crossVectors(u,f),p[L]=_.x,p[x+L]=_.y,p[2*x+L]=_.z;const F=k.userData.limit;y[L]=.4*((F.lower+F.upper)*.5-k.userData.angle)/(F.upper-F.lower)+.015*u.dot(C)}for(let L=0;L<3;L++)for(let k=0;k<3;k++){let F=L===k?25e-6:0;for(let q=0;q<x;q++)F+=p[L*x+q]*p[k*x+q];M[k*3+L]=F}E.fromArray(M).invert(),f.subVectors(t,h).applyMatrix3(E),g.set(0,0,0);for(let L=0;L<x;L++)g.x+=p[L]*y[L],g.y+=p[x+L]*y[L],g.z+=p[2*x+L]*y[L];g.applyMatrix3(E);for(let L=0;L<x;L++){const k=p[L]*f.x+p[x+L]*f.y+p[2*x+L]*f.z+y[L]-(p[L]*g.x+p[x+L]*g.y+p[2*x+L]*g.z);this.setJoint(a[L].name,ni.clamp(a[L].userData.angle+ni.clamp(k,-.2,.2),S[L],P[L]))}a[0].updateMatrixWorld(!0),h.setFromMatrixPosition(l.matrixWorld);const U=h.distanceTo(t);if(U<r.bestError){r.bestError=U;for(let L=0;L<a.length;L++)r.bestAngles[L]=a[L].userData.angle}if(U<2e-4)break}if(r.error=h.distanceTo(t),r.error>r.bestError+1e-8){for(let D=0;D<a.length;D++)this.setJoint(a[D].name,r.bestAngles[D]);this.robot.updateMatrixWorld(!0),r.error=r.bestError}this._ikSolving=!1,r.stationaryFrames=o&&Math.abs(v-r.error)<1e-6?r.stationaryFrames+1:0,r.settled=r.stationaryFrames>=3,r.valid=!0,this.armErrors[e]=r.error}update(e,t){this.assemblies?.update(e,t),this._updateCollisionMarkers(e.collision);for(const[r,o]of["left","right"].entries()){const a=this.assemblies?.toolGripPositions[o];a&&(this.armTargets[o].copy(a),this._gripOrientation??=new Oe,this._gripClock??=new Oe().setFromAxisAngle(new b(0,0,1),Math.PI/2),this._gripOrientation.copy(this.assemblies.tools[o].group.quaternion).multiply(this._gripClock),this.solveArm(o,a,t,this._gripOrientation)),this.handMarkers?.[o]?.getWorldPosition(this.handPositions[o]),this.handQuaternions??={left:new Oe,right:new Oe},this.handMarkers?.[o]?.getWorldQuaternion(this.handQuaternions[o]),this.assemblies&&this.portMeshes[r].quaternion.setFromUnitVectors(uc,this.assemblies.tools[o].shaftDirection)}this.assemblies?.connectHands(this.handPositions,this.armErrors,this.handQuaternions),this.conceptDecoupled=this.assemblies?.conceptDecoupled??!1,this.kinematicLimited=!1;const n=e.scope,s=new b(...n.position);this.assemblies&&this.portMeshes[2].quaternion.setFromUnitVectors(uc,this.assemblies.scope.direction),this.endoCamera.fov!==(n.fov??55)&&(this.endoCamera.fov=n.fov??55,this.endoCamera.updateProjectionMatrix()),this.endoCamera.position.copy(s),n.cameraUp?this.endoCamera.up.fromArray(n.cameraUp):this.endoCamera.up.set(0,1,0),this.endoCamera.lookAt(new b(...n.lookAt)),this.scopeLight.position.copy(s),this.scopeLight.target.position.set(...n.lookAt),this.controls.update()}render(e=0){const t=this.renderer,n=this.stage.clientWidth,s=this.stage.clientHeight;if(n<1||s<1)return;const r=this.stage.getBoundingClientRect(),o=this.mini.getBoundingClientRect(),a=o.left-r.left,l=s-(o.top-r.top)-o.height,c=o.width,h=o.height;t.info.reset(),t.setScissorTest(!1),t.setViewport(0,0,n,s),this.cavity.children[0].visible=!0,this.scene.background=new De("#6b4a42"),this.scene.environmentIntensity=.34,t.toneMappingExposure=1.1,this.scopeFeed.capture(t,this.scene,this.endoCamera,this.mode==="endo"?n:c,this.mode==="endo"?s:h),t.setRenderTarget(null),t.setScissorTest(!1),t.setViewport(0,0,n,s),t.clear(),this.cavity.children[0].visible=!1,this.scene.background=new De("#c2d0d0"),this.scene.environmentIntensity=.8,t.toneMappingExposure=1,this.mode==="endo"?(this.scopeFeed.blit(t,0,0,n,s),this.overviewCamera.aspect=c/h,this.overviewCamera.updateProjectionMatrix(),t.setScissorTest(!0),t.setScissor(a,l,c,h),t.setViewport(a,l,c,h),t.clearDepth(),t.render(this.scene,this.overviewCamera)):(this.overviewCamera.aspect=n/s,this.overviewCamera.updateProjectionMatrix(),t.render(this.scene,this.overviewCamera),this.scopeFeed.blit(t,a,l,c,h)),t.setScissorTest(!1)}dispose(){this.disposed=!0,this.resizeObserver.disconnect(),this.controls.dispose(),this.env.dispose(),this.scene.traverse(e=>{if(e.geometry?.dispose(),e.material)for(const t of Array.isArray(e.material)?e.material:[e.material])t!==this.scopeFeed.monitorMaterial&&t.dispose()}),this.scopeFeed.dispose(),this.renderer.dispose()}}const lM=[[0,5,1,6],[0,1,2,6],[0,2,3,6],[0,3,7,6],[0,7,4,6],[0,4,5,6]],nl=[[0,0,0],[1,0,0],[1,1,0],[0,1,0],[0,0,1],[1,0,1],[1,1,1],[0,1,1]],cM=[[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]],oi=(i,e,t)=>Math.max(e,Math.min(t,i)),$o=[];for(let i=-1;i<=1;i++)for(let e=-1;e<=1;e++)for(let t=-1;t<=1;t++)$o.push([t,e,i]);const hM=$o.map((i,e)=>$o.reduce((t,n,s)=>s!==e&&Math.max(Math.abs(i[0]-n[0]),Math.abs(i[1]-n[1]),Math.abs(i[2]-n[2]))<=1?t|1<<s:t,0));function Jd(i){const e=i.dims??i.dimensions,t=i.origin,n=Array.isArray(i.spacing)?i.spacing:[i.spacing,i.spacing,i.spacing];if(!Array.isArray(e)||e.length!==3||e.some(s=>!Number.isInteger(s)||s<2||s>512))throw new Error("Invalid volume dimensions");if(!Array.isArray(t)||t.length!==3||t.some(s=>!Number.isFinite(s)))throw new Error("Invalid volume origin");if(n.length!==3||n.some(s=>!Number.isFinite(s)||s<=0||s>.05))throw new Error("Invalid volume spacing");return{...i,dims:[...e],origin:[...t],spacing:[...n]}}function Vn(i,e,t,n){return e+i.dims[0]*(t+i.dims[1]*n)}function dc(i,e){return oi(.5-i/e,0,1)}const Li=Object.freeze({radius:.018,coreRadius:.0025,stepFraction:.24,slipStrain:2.2});function es(i){if(!i)return null;const e=i.local??i.point,t=i.displacement??i.delta;if(!Array.isArray(e)||!Array.isArray(t)||e.length!==3||t.length!==3||[...e,...t].some(o=>!Number.isFinite(o)))throw new Error("Invalid tissue deformation");const n=Math.hypot(...t);if(!Number.isFinite(n)||!Number.isFinite(n*3.2))throw new Error("Tissue deformation exceeds the numeric range");if(n<1e-10)return null;const s=[...t];if(i.model==="local-flow"){const o=oi(Number.isFinite(i.radius)?i.radius:Li.radius,.012,.03),a=oi(Number.isFinite(i.coreRadius)?i.coreRadius:Li.coreRadius,.001,o*.25),l=Math.min(1,(o-a)*Li.stepFraction/n),c=Math.max(1,Math.ceil(1/l));if(c>512)throw new Error("Local traction exceeds supported material strain; the grasp must slip.");return{model:"local-flow",local:[...e],displacement:s,radius:o,coreRadius:a,steps:c,stepFraction:l}}const r=Math.max(oi(Number.isFinite(i.radius)?i.radius:.065,.02,.2),3.2*Math.hypot(...s));return{local:[...e],displacement:s,radius:r}}function oa(i,e){if(!e)return{weight:0,gradient:[0,0,0]};if(e.model==="local-flow"){const a=e.steps,l=e.displacement,c=e.local,h=i[0]-c[0],u=i[1]-c[1],d=i[2]-c[2],f=l[0],g=l[1],_=l[2],m=f*f+g*g+_*_,p=oi((h*f+u*g+d*_)/m,0,1),M=h-f*p,y=u-g*p,S=d-_*p;if(M*M+y*y+S*S>=e.radius*e.radius)return{weight:0,gradient:[0,0,0]};let P=0,E=0,C=0,R=0;for(let v=0;v<a;v++){const x=v*e.stepFraction,A=Math.min(e.stepFraction,1-x),D=P-x,U=h+f*D,L=u+g*D,k=d+_*D,F=Math.sqrt(U*U+L*L+k*k),q=e.coreRadius,V=e.radius-q;if(F>=e.radius)continue;const K=Math.max(0,(F-q)/V),ee=1-K,ce=ee**4*(4*K+1),Te=F>q?-20*K*ee**3/(V*F):0,$e=U*Te,Je=L*Te,Ve=k*Te,X=1+(f*$e+g*Je+_*Ve)*A;E=E*X+$e*A,C=C*X+Je*A,R=R*X+Ve*A,P+=ce*A}return{weight:P,gradient:[E,C,R]}}const t=i.map((a,l)=>a-e.local[l]),n=Math.hypot(...t),s=n/e.radius;if(s>=1)return{weight:0,gradient:[0,0,0]};const r=1-s,o=-20*r*r*r/(e.radius*e.radius);return{weight:r**4*(4*s+1),gradient:t.map(a=>a*o)}}function Ys(i,e){if(!e)return[...i];const{weight:t}=oa(i,e);return i.map((n,s)=>n+e.displacement[s]*t)}function fc(i,e){if(!e)return[...i];if(e.model==="local-flow"){let s=[...i];const r=e.steps;for(let o=r-1;o>=0;o--){const a=o*e.stepFraction,l=Math.min(e.stepFraction,1-a),c=e.displacement.map(d=>d*l),h=e.local.map((d,f)=>d+e.displacement[f]*a),u=[...s];for(let d=0;d<16;d++){const f=s.map((v,x)=>v-h[x]),g=Math.hypot(...f),_=e.coreRadius,m=e.radius-_,p=Math.max(0,Math.min(1,(g-_)/m)),M=1-p,y=M**4*(4*p+1),S=g>_&&p<1?-20*p*M**3/(m*g):0,P=f.map(v=>v*S),E=s.map((v,x)=>v+c[x]*y-u[x]);if(Math.hypot(...E)<1e-11)break;const C=1+P.reduce((v,x,A)=>v+x*c[A],0),R=P.reduce((v,x,A)=>v+x*E[A],0)/C;s=s.map((v,x)=>v-E[x]+c[x]*R)}}return s}const t=[...i],n=e.displacement;for(let s=0;s<20;s++){const{weight:r,gradient:o}=oa(t,e),a=t.map((h,u)=>h+n[u]*r-i[u]);if(Math.hypot(...a)<1e-10)break;const l=1+o.reduce((h,u,d)=>h+u*n[d],0),c=o.reduce((h,u,d)=>h+u*a[d],0)/l;for(let h=0;h<3;h++)t[h]-=a[h]-n[h]*c}return t}function pc(i){if(!i)return 1;const e=Math.hypot(...i.displacement);if(i.model==="local-flow"){const t=2.109375*e/(i.radius-i.coreRadius),n=i.steps-1;return Math.max(1e-12,(1-t*i.stepFraction)**n*(1-t*(1-n*i.stepFraction)))}return Math.max(1e-12,1-2.109375*e/i.radius)}function uM(i,e,t){const n=1+e.reduce((a,l,c)=>a+l*t[c],0),s=i.reduce((a,l,c)=>a+l*t[c],0)/n,r=i.map((a,l)=>a-e[l]*s),o=Math.hypot(...r)||1;return r.map(a=>a/o)}function dM(i,e,t=16){const n=Jd(i),s=n.dims.reduce((h,u)=>h*u,1);if(!(e instanceof Float32Array)||e.length!==s)throw new Error("Volume byte length does not match its metadata");for(let h=0;h<e.length;h++)if(!Number.isFinite(e[h]))throw new Error("Volume has non-finite samples");const r=new Float32Array(e),o=new Float32Array(e),a=n.spacing.reduce((h,u)=>h*u,1)*1e9,l=Math.min(...n.spacing);let c=0;for(let h=0;h<r.length;h++)c+=dc(r[h],l)*a;return{meta:n,base:r,field:o,chunkSize:t,bandWidth:l,voxelMm3:a,totalVolumeMm3:c,removedVolumeMm3:0,cuts:[],separations:[],fragmentRecords:[],fragmentVolumeMm3:0,excluded:new Uint8Array(s),exclusionIndices:[],baselineLabels:null,connectivityVerified:!1,topologyDirty:!1,topologyMetrics:{scans:0,scannedNodes:0,localChecks:0,lastScanMs:0}}}function fM(i,e,t,n){i.topologyMetrics.localChecks++;const{meta:s,field:r}=i;let o=0;for(let c=0;c<27;c++){if(c===13)continue;const h=$o[c],u=e+h[0],d=t+h[1],f=n+h[2];u>=0&&u<s.dims[0]&&d>=0&&d<s.dims[1]&&f>=0&&f<s.dims[2]&&r[Vn(s,u,d,f)]<0&&(o|=1<<c)}if(!o)return!1;let a=o&-o,l=a;for(;a&&l!==o;){const c=a&-a,h=31-Math.clz32(c);a&=~c;const u=hM[h]&o&~l;a|=u,l|=u}return l!==o}function Qd(i,e,t){const n=t[0]-e[0],s=t[1]-e[1],r=t[2]-e[2],o=n*n+s*s+r*r,a=o?oi(((i[0]-e[0])*n+(i[1]-e[1])*s+(i[2]-e[2])*r)/o,0,1):0;return Math.hypot(i[0]-e[0]-a*n,i[1]-e[1]-a*s,i[2]-e[2]-a*r)}function Wr(i){const e=i.a??i.point,t=i.b??e;if(!Array.isArray(e)||!Array.isArray(t)||e.length!==3||t.length!==3||[...e,...t].some(r=>!Number.isFinite(r)))throw new Error("Cut points must be finite three-component coordinates");if(!Number.isFinite(i.radius)||i.radius<=0||i.radius>.05)throw new Error("Cut radius must be positive and at most 50 mm");if(Math.hypot(...t.map((r,o)=>r-e[o]))>.5)throw new Error("Cut segment exceeds the supported workspace");const n={a:[...e],b:[...t],radius:i.radius},s=es(i.deformation);return s&&(n.deformation=s),n}function Zo(i){const e=[],t=i.meta.dims.map(n=>Math.ceil((n-1)/i.chunkSize));for(let n=0;n<t[2];n++)for(let s=0;s<t[1];s++)for(let r=0;r<t[0];r++)e.push(`${r},${s},${n}`);return e}function Wc(i,e){const t=Wr(e),{meta:n,field:s}=i,r=2.5*Math.max(...n.spacing),o=t.deformation?.displacement??[0,0,0],a=t.radius+r,l=t.a.map((m,p)=>oi(Math.floor((Math.min(m,t.b[p])-Math.max(0,o[p])-a-n.origin[p])/n.spacing[p]),0,n.dims[p]-1)),c=t.a.map((m,p)=>oi(Math.ceil((Math.max(m,t.b[p])-Math.min(0,o[p])+a-n.origin[p])/n.spacing[p]),0,n.dims[p]-1));let h=0,u=0,d=0;const f=[0,0,0],g=[[1/0,1/0,1/0],[-1/0,-1/0,-1/0]];for(let m=l[2];m<=c[2];m++)for(let p=l[1];p<=c[1];p++)for(let M=l[0];M<=c[0];M++){f[0]=n.origin[0]+M*n.spacing[0],f[1]=n.origin[1]+p*n.spacing[1],f[2]=n.origin[2]+m*n.spacing[2];const y=Vn(n,M,p,m),S=t.deformation?Ys(f,t.deformation):f,P=Math.fround(Math.max(s[y],t.radius-Qd(S,t.a,t.b)));if(P<=s[y])continue;const E=s[y]<0;h+=(dc(s[y],i.bandWidth)-dc(P,i.bandWidth))*i.voxelMm3,s[y]=P,E&&P>=0&&(d++,!i.topologyDirty&&fM(i,M,p,m)&&(i.topologyDirty=!0)),u++;for(let C=0;C<3;C++){const R=C===0?M:C===1?p:m;g[0][C]=Math.min(g[0][C],R),g[1][C]=Math.max(g[1][C],R)}}i.cuts.push(t),i.removedVolumeMm3=Math.min(i.totalVolumeMm3,i.removedVolumeMm3+h);const _=new Set;if(u){const m=g[0].map(M=>Math.max(0,Math.floor((M-2)/i.chunkSize))),p=g[1].map((M,y)=>Math.min(Math.ceil((n.dims[y]-1)/i.chunkSize)-1,Math.floor((M+1)/i.chunkSize)));for(let M=m[2];M<=p[2];M++)for(let y=m[1];y<=p[1];y++)for(let S=m[0];S<=p[0];S++)_.add(`${S},${y},${M}`)}return{dirty:_,removedMm3:h,changedSamples:u,removedNodes:d,removedVolumeMm3:i.removedVolumeMm3}}function pM(i,e=[]){i.field.set(i.base),i.cuts=[],i.removedVolumeMm3=0,i.separations=[],i.fragmentRecords=[],i.fragmentVolumeMm3=0,i.excluded.fill(0),i.exclusionIndices=[],i.topologyDirty=!1,i.connectivityVerified=!!i.baselineLabels;for(const t of e)Wc(i,t);return i}function mM(i,e,t,n){const{meta:s,field:r}=i,o=[0,0,0];for(let a=0;a<3;a++){const l=[e,t,n],c=[e,t,n];l[a]=Math.max(0,l[a]-1),c[a]=Math.min(s.dims[a]-1,c[a]+1),o[a]=(r[Vn(s,...c)]-r[Vn(s,...l)])/((c[a]-l[a])*s.spacing[a])}return o}function ef(i,e){return oi((-i-e*.08)/(e*.2),0,1)}function gM(i,e,t){const n=.93+.045*Math.sin(i[0]*492+Math.sin(i[2]*341))+.025*Math.sin(i[1]*713-i[2]*427),s=ef(e,t);return[(.19+.14*s)*n,(.027+.027*s)*n,(.018+.024*s)*n]}function tf(i,e){const[t,n,s]=e.split(",").map(Number),{meta:r,field:o,base:a,chunkSize:l}=i,c=[t,n,s].map(C=>C*l),h=c.map((C,R)=>Math.min(C+l,r.dims[R]-1)),u=[],d=[],f=[],g=[],_=[],m=new Map,p=new Array(8),M=new Array(8),y=new Array(8),S=new Map,P=(C,R,v)=>{const x=Vn(r,C,R,v);let A=S.get(x);return A||(A=mM(i,C,R,v),S.set(x,A)),A};function E(C,R,v){const x=R.p[0]-C.p[0],A=R.p[1]-C.p[1],D=R.p[2]-C.p[2],U=v.p[0]-C.p[0],L=v.p[1]-C.p[1],k=v.p[2]-C.p[2],F=[A*k-D*L,D*U-x*k,x*L-A*U];if(Math.hypot(...F)<1e-15)return;const q=C.n.map((V,K)=>V+R.n[K]+v.n[K]);F.reduce((V,K,ee)=>V+K*q[ee],0)<0&&([R,v]=[v,R]);for(const V of[C,R,v]){let K=m.get(V.key);K===void 0&&(K=u.length/3,m.set(V.key,K),u.push(...V.p),d.push(...V.n),f.push(...V.c),g.push(V.cutMask)),_.push(K)}}for(let C=c[2];C<h[2];C++)for(let R=c[1];R<h[1];R++)for(let v=c[0];v<h[0];v++){let x=0;for(let A=0;A<8;A++){const D=[v+nl[A][0],R+nl[A][1],C+nl[A][2]],U=Vn(r,...D);M[A]=o[U],y[A]=a[U],p[A]=D,M[A]<0&&x++}if(!(!x||x===8))for(const A of lM){const D=[];for(const[U,L]of cM){const k=A[U],F=A[L];if(M[k]<0==M[F]<0)continue;const q=M[k]/(M[k]-M[F]),V=P(...p[k]),K=P(...p[F]),ee=p[k].map((X,Z)=>r.origin[Z]+(X+(p[F][Z]-X)*q)*r.spacing[Z]),ce=V.map((X,Z)=>X+(K[Z]-X)*q),Te=Math.hypot(...ce)||1,$e=y[k]+(y[F]-y[k])*q,Je=Vn(r,...p[k]),Ve=Vn(r,...p[F]);D.push({key:Je<Ve?`${Je}:${Ve}`:`${Ve}:${Je}`,p:ee,n:ce.map(X=>X/Te),c:gM(ee,$e,i.bandWidth),cutMask:ef($e,i.bandWidth)})}if(D.length===3)E(...D);else if(D.length===4){const U=[0,1,2].map(V=>D.reduce((K,ee)=>K+ee.p[V],0)/4);let L=[0,1,2].map(V=>D.reduce((K,ee)=>K+ee.n[V],0));const k=Math.hypot(...L)||1;L=L.map(V=>V/k);const F=D[0].p.map((V,K)=>V-U[K]),q=[L[1]*F[2]-L[2]*F[1],L[2]*F[0]-L[0]*F[2],L[0]*F[1]-L[1]*F[0]];for(const V of D){const K=V.p.map((ee,ce)=>ee-U[ce]);V.angle=Math.atan2(K.reduce((ee,ce,Te)=>ee+ce*q[Te],0),K.reduce((ee,ce,Te)=>ee+ce*F[Te],0))}D.sort((V,K)=>V.angle-K.angle),E(D[0],D[1],D[2]),E(D[0],D[2],D[3])}}}return{key:e,positions:new Float32Array(u),normals:new Float32Array(d),colors:new Float32Array(f),cutMasks:new Float32Array(g),indices:new Uint32Array(_)}}function Xc(i,e,t=null){const n=performance.now(),{dims:s}=i.meta,[r,o,a]=s,l=r*o,c=i._connectivityVisited??=new Uint8Array(e.length),h=i._connectivityQueue??=new Uint32Array(e.length);c.fill(0);const u=[];let d=0;for(let f=0;f<e.length;f++){if(c[f]||e[f]>=0)continue;const g=d,_=u.length+1;let m=g;h[d++]=f,c[f]=1,t&&(t[f]=_);const p=[r,o,a],M=[0,0,0];for(;m<d;){const y=h[m++],S=Math.floor(y/l),P=Math.floor((y-S*l)/r),E=y-S*l-P*r;E<p[0]&&(p[0]=E),E>M[0]&&(M[0]=E),P<p[1]&&(p[1]=P),P>M[1]&&(M[1]=P),S<p[2]&&(p[2]=S),S>M[2]&&(M[2]=S);const C=Math.max(0,E-1),R=Math.min(r-1,E+1),v=Math.max(0,P-1),x=Math.min(o-1,P+1),A=Math.max(0,S-1),D=Math.min(a-1,S+1);for(let U=A;U<=D;U++)for(let L=v;L<=x;L++){const k=U*l+L*r;for(let F=C;F<=R;F++){const q=k+F;!c[q]&&e[q]<0&&(c[q]=1,h[d++]=q,t&&(t[q]=_))}}}u.push({seed:f,start:g,end:d,voxelCount:d-g,low:p,high:M,baseline:i.baselineLabels?.[f]??_})}return i.topologyMetrics.scans++,i.topologyMetrics.scannedNodes+=e.length,i.topologyMetrics.lastScanMs=performance.now()-n,{components:u,queue:h}}function jc(i){if(i.baselineLabels)return i;const e=new Uint32Array(i.base.length);return Xc(i,i.base,e),i.baselineLabels=e,i.cuts.length||(i.connectivityVerified=!0,i.topologyDirty=!1),i}function nf(i){const e=new Map;for(const t of i){const n=e.get(t.baseline);(!n||t.voxelCount>n.voxelCount)&&e.set(t.baseline,t)}return e}function _M(i,e,t){const n=e.map(o=>Math.max(0,Math.floor((o-2)/i.chunkSize))),s=t.map((o,a)=>Math.min(Math.ceil((i.meta.dims[a]-1)/i.chunkSize)-1,Math.floor((o+1)/i.chunkSize))),r=new Set;for(let o=n[2];o<=s[2];o++)for(let a=n[1];a<=s[1];a++)for(let l=n[0];l<=s[0];l++)r.add(`${l},${a},${o}`);return r}function vM(i){const e=i.reduce((o,a)=>o+a.positions.length,0),t=i.reduce((o,a)=>o+a.indices.length,0),n={positions:new Float32Array(e),normals:new Float32Array(e),colors:new Float32Array(e),cutMasks:new Float32Array(e/3),indices:new Uint32Array(t)};let s=0,r=0;for(const o of i){n.positions.set(o.positions,s),n.normals.set(o.normals,s),n.colors.set(o.colors,s),n.cutMasks.set(o.cutMasks,s/3);for(let a=0;a<o.indices.length;a++)n.indices[r+a]=o.indices[a]+s/3;s+=o.positions.length,r+=o.indices.length}return n}function xM(i){let e=0,t=0,n=0,s=0;const r=i.positions,o=i.indices;for(let a=0;a<o.length;a+=3){const l=o[a]*3,c=o[a+1]*3,h=o[a+2]*3,u=r[l]*(r[c+1]*r[h+2]-r[c+2]*r[h+1])+r[l+1]*(r[c+2]*r[h]-r[c]*r[h+2])+r[l+2]*(r[c]*r[h+1]-r[c+1]*r[h]);e+=u,t+=u*(r[l]+r[c]+r[h]),n+=u*(r[l+1]+r[c+1]+r[h+1]),s+=u*(r[l+2]+r[c+2]+r[h+2])}if(Math.abs(e)<1e-20)throw new Error("Detached tissue has no closed three-dimensional volume");return{volumeMm3:Math.abs(e)/6*1e9,center:[t,n,s].map(a=>a/(4*e))}}function sf(i,e,t,n=null){const s=e.queue.slice(t.start,t.end),r=new Set(s),o=t.low.map(R=>R-2),a=t.high.map(R=>R+2),l=o.map((R,v)=>a[v]-R+1),c=o.map((R,v)=>i.meta.origin[v]+R*i.meta.spacing[v]),h={dims:l,origin:c,spacing:[...i.meta.spacing]},u=l[0]*l[1]*l[2],d=new Float32Array(u),f=new Float32Array(u),g=Math.max(...i.meta.spacing);for(let R=0;R<l[2];R++)for(let v=0;v<l[1];v++)for(let x=0;x<l[0];x++){const A=x+o[0],D=v+o[1],U=R+o[2],L=x+l[0]*(v+l[1]*R);if(A<0||D<0||U<0||A>=i.meta.dims[0]||D>=i.meta.dims[1]||U>=i.meta.dims[2]){d[L]=g,f[L]=g;continue}const k=Vn(i.meta,A,D,U),F=i.field[k];d[L]=r.has(k)?F:Math.max(0,F>=0?F:-F),f[L]=i.base[k]}const _={meta:h,field:d,base:f,chunkSize:i.chunkSize,bandWidth:i.bandWidth},m=vM(Zo(_).map(R=>tf(_,R))),p=xM(m),M=i.cuts.length,y=t.seed,S=n?.id??`fragment-${M.toString(36)}-${y.toString(36)}`;if(i.fragmentRecords.some(R=>R.id===S))throw new Error("Duplicate detached tissue identifier");const P=es(i.cuts[M-1]?.deformation),E={id:S,cutIndex:M,seed:y,voxelCount:t.voxelCount,...p,...m,deformation:P,coordinateSpace:"source-material",volume:{dims:l,origin:c,spacing:[...i.meta.spacing],values:d}},C=new Float32Array(s.length);for(let R=0;R<s.length;R++){const v=s[R],x=Math.fround(Math.max(Math.abs(i.field[v]),i.bandWidth*.75));i.field[v]=x,C[R]=x,i.excluded[v]||(i.excluded[v]=1,i.exclusionIndices.push(v))}return i.fragmentRecords.push({id:S,cutIndex:M,seed:y,voxelCount:t.voxelCount,volumeMm3:p.volumeMm3,center:[...p.center]}),i.fragmentVolumeMm3+=p.volumeMm3,i.separations.push({id:S,cutIndex:M,seed:y}),{fragment:E,nodeIndices:s,positiveValues:C,dirty:_M(i,t.low,t.high)}}function zu(i){const e=i.reduce((o,a)=>o+a.nodeIndices.length,0),t=new Uint32Array(e),n=new Float32Array(e),s=new Set;let r=0;for(const o of i)t.set(o.nodeIndices,r),n.set(o.positiveValues,r),r+=o.nodeIndices.length,o.dirty.forEach(a=>s.add(a));return{fragments:i.map(o=>o.fragment),dirty:s,exclusions:{nodeIndices:t,positiveValues:n}}}function yM(i,{force:e=!1,minVoxels:t=12}={}){if(jc(i),!e&&i.connectivityVerified&&!i.topologyDirty)return zu([]);const n=Xc(i,i.field),s=nf(n.components),r=[];for(const o of n.components)s.get(o.baseline)===o||o.voxelCount<t||r.push(sf(i,n,o));return i.connectivityVerified=!0,i.topologyDirty=!1,zu(r)}function MM(i,e=[],t=[]){const n=e.map(Wr),s=t.map(d=>({...d})),r=new Set,o=new Set;for(const d of s){const f=`${d.cutIndex}:${d.seed}`;if(!Number.isInteger(d.cutIndex)||d.cutIndex<1||d.cutIndex>n.length||!Number.isInteger(d.seed)||d.seed<0||d.seed>=i.field.length||typeof d.id!="string"||!/^fragment-[a-z0-9-]+$/.test(d.id)||r.has(d.id)||o.has(f))throw new Error("Invalid tissue separation history");r.add(d.id),o.add(f)}s.sort((d,f)=>d.cutIndex-f.cutIndex||d.seed-f.seed);const a=i;i={...i,field:new Float32Array(i.base),excluded:new Uint8Array(i.base.length),topologyMetrics:{...i.topologyMetrics}},pM(i),jc(i);const l=[];for(let d=0;d<n.length;d++){Wc(i,n[d]);const f=s.filter(m=>m.cutIndex===d+1);if(!f.length)continue;const g=Xc(i,i.field),_=nf(g.components);for(const m of f){const p=g.components.find(M=>M.seed===m.seed);if(!p||_.get(p.baseline)===p)throw new Error("Separation history does not match a fully disconnected component");l.push(sf(i,g,p,m).fragment)}i.connectivityVerified=!0,i.topologyDirty=!1}const c=new Uint32Array(i.exclusionIndices),h=new Float32Array(c.length);for(let d=0;d<c.length;d++)h[d]=i.field[c[d]];const u=a.field;return u.set(i.field),Object.assign(a,i,{field:u}),{fragments:l,dirty:new Set(Zo(i)),exclusions:{nodeIndices:c,positiveValues:h}}}function il(i,e){return[...e].map(t=>tf(i,t))}function SM(i){return{removedVolumeMm3:i.removedVolumeMm3,totalVolumeMm3:i.totalVolumeMm3,voxelMm:Math.max(...i.meta.spacing)*1e3,cutCount:i.cuts.length,fragmentCount:i.fragmentRecords.length,fragmentVolumeMm3:i.fragmentVolumeMm3,topology:{...i.topologyMetrics}}}if(typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope){let i;self.onmessage=({data:e})=>{try{let t,n=0,s=0,r=[],o={nodeIndices:new Uint32Array,positiveValues:new Float32Array};if(e.type==="init")i=dM(e.metadata,new Float32Array(e.buffer),e.chunkSize??16),jc(i),t=il(i,Zo(i));else if(i)if(e.type==="cut"){const l=new Set;for(const h of e.cuts){const u=Wc(i,h);u.dirty.forEach(d=>l.add(d)),n+=u.changedSamples,s+=u.removedMm3}const c=yM(i);r=c.fragments,o=c.exclusions,c.dirty.forEach(h=>l.add(h)),t=il(i,l)}else if(e.type==="restore"){const l=MM(i,e.cuts??[],e.separations??[]);r=l.fragments,o=l.exclusions,t=il(i,Zo(i))}else throw new Error(`Unknown tissue operation: ${e.type}`);else throw new Error("The tissue volume is not initialized");const a=t.flatMap(l=>[l.positions.buffer,l.normals.buffer,l.colors.buffer,l.cutMasks.buffer,l.indices.buffer]);for(const l of r)a.push(l.positions.buffer,l.normals.buffer,l.colors.buffer,l.cutMasks.buffer,l.indices.buffer,l.volume.values.buffer);a.push(o.nodeIndices.buffer,o.positiveValues.buffer),self.postMessage({id:e.id,epoch:e.epoch,type:e.type,chunks:t,statistics:SM(i),changedSamples:n,removedMm3:s,fragments:r,exclusions:{reset:e.type!=="cut",...o},separations:i.separations.map(l=>({...l}))},a)}catch(t){self.postMessage({id:e.id,epoch:e.epoch,error:t.message})}}}const wM=`
varying vec3 vTissuePosition;
varying float vTissueCut;
float tissueHash(vec3 p) {
  p=fract(p*.1031);p+=dot(p,p.yxz+33.33);
  return fract((p.x+p.y)*p.z);
}
vec3 tissueHash3(vec3 p) {
  p=fract(p*vec3(.1031,.1030,.0973));p+=dot(p,p.yxz+33.33);
  return fract((p.xxy+p.yzz)*p.zyx);
}
float tissueNoise(vec3 p) {
  vec3 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);
  return mix(mix(mix(tissueHash(i),tissueHash(i+vec3(1,0,0)),f.x),
                 mix(tissueHash(i+vec3(0,1,0)),tissueHash(i+vec3(1,1,0)),f.x),f.y),
             mix(mix(tissueHash(i+vec3(0,0,1)),tissueHash(i+vec3(1,0,1)),f.x),
                 mix(tissueHash(i+vec3(0,1,1)),tissueHash(i+vec3(1,1,1)),f.x),f.y),f.z);
}
`,bM=`
#include <color_fragment>
float tissueCut=smoothstep(.06,.62,clamp(vTissueCut,0.0,1.0));
float tissueFootprint=max(length(dFdx(vTissuePosition)),length(dFdy(vTissuePosition)));
float tissueGrainVisibility=1.0-smoothstep(.00035,.00120,tissueFootprint);
float tissueMicroVisibility=1.0-smoothstep(.00009,.00035,tissueFootprint);
float tissueMottle=tissueNoise(vTissuePosition*92.0+vec3(7.3,2.1,11.8));
float tissueMesoscopic=tissueNoise(vTissuePosition*340.0+vec3(3.7,12.4,2.8));
vec3 tissueGrainCoordinate=vec3(dot(vTissuePosition,vec3(.36,.80,.48)),dot(vTissuePosition,vec3(-.80,.52,-.30)),dot(vTissuePosition,vec3(-.48,-.30,.824)))*1800.0
                         +vec3(tissueMesoscopic,tissueMottle,tissueMesoscopic-tissueMottle)*.72;
float tissueGrain=tissueNoise(tissueGrainCoordinate+vec3(2.7,9.2,4.1));
// Sparse connective flecks; avoid a closed honeycomb or a repeated cell grid.
// These are a material cue, not a reconstructed vessel tree or histology.
float tissueSepta=smoothstep(.58,.76,tissueGrain)
                 *smoothstep(.42,.72,tissueMesoscopic)*tissueGrainVisibility;
// Sparse submillimetre pits with a restrained pale rim. A site's centre stays
// inside its cell, so no 27-neighbour Voronoi search is necessary.
vec3 tissueCell=vTissuePosition*420.0;
vec3 tissueSeed=tissueHash3(floor(tissueCell)+vec3(19.1,4.7,8.3));
vec3 tissueSite=.20+.60*tissueSeed;
vec3 tissueOffset=(fract(tissueCell)-tissueSite)*vec3(1.0,1.28,.88);
float tissueRadius=.055+.043*tissueSeed.x;
float tissueDistance=length(tissueOffset);
float tissueAA=clamp(fwidth(tissueDistance),.008,.035);
float tissueSiteMask=step(.76,tissueSeed.z)*tissueMicroVisibility;
float tissueLumen=(1.0-smoothstep(tissueRadius-tissueAA,tissueRadius+tissueAA,tissueDistance))*tissueSiteMask;
float tissueRim=max(0.0,(1.0-smoothstep(tissueRadius+.022-tissueAA,tissueRadius+.022+tissueAA,tissueDistance))*tissueSiteMask-tissueLumen);

// Linear-light reflectance: a muted purple-brown capsule, not saturated red
// plastic. Large mottling stays shallow; the surface itself remains smooth.
vec3 tissueCapsule=mix(vec3(.100,.027,.028),vec3(.205,.068,.045),tissueMottle);
tissueCapsule*=.94+.12*tissueMesoscopic;
tissueCapsule*=1.0+(tissueGrain-.5)*.038*tissueGrainVisibility;
// The exposed solid is red-brown, warmer and less glossy than the membrane.
// Fine pale septa/pits follow 3-D material coordinates on both sides of a cut.
// This shear demonstration deliberately omits heat-charred/necrotic colouring.
vec3 tissueCutColour=mix(vec3(.190,.050,.038),vec3(.265,.076,.055),tissueGrain);
tissueCutColour*=.90+.15*tissueMesoscopic+.05*tissueMottle;
tissueCutColour=mix(tissueCutColour,vec3(.34,.187,.130),tissueSepta*.10);
tissueCutColour=mix(tissueCutColour,vec3(.045,.012,.009),tissueLumen*.84);
tissueCutColour+=vec3(.048,.032,.020)*tissueRim;
diffuseColor.rgb=mix(tissueCapsule,tissueCutColour,tissueCut);
`,TM=`
#include <normal_fragment_maps>
// Tens of micrometres of displayed relief avoid coarse orange-peel highlights.
float tissueHeight=(tissueGrain-.5)*mix(.000009,.000035,tissueCut)*tissueGrainVisibility;
tissueHeight+=(tissueMesoscopic-.5)*.000025*tissueCut;
tissueHeight+=(tissueSepta*.000004-tissueLumen*.000050+tissueRim*.000007)*tissueCut;
vec3 tissueDx=dFdx(-vViewPosition),tissueDy=dFdy(-vViewPosition);
vec3 tissueR1=cross(tissueDy,normal),tissueR2=cross(normal,tissueDx);
float tissueDet=dot(tissueDx,tissueR1);
// Match Three's bump convention on both sides of a rotating specimen.
tissueDet*=faceDirection;
vec3 tissueGrad=sign(tissueDet)*(dFdx(tissueHeight)*tissueR1+dFdy(tissueHeight)*tissueR2);
vec3 tissuePerturbed=abs(tissueDet)*normal-tissueGrad;
// Edge-on/degenerate triangles can have a zero screen-space determinant.
// Preserve Three's face-corrected normal rather than normalize a zero vector.
if(dot(tissuePerturbed,tissuePerturbed)>1e-20)normal=normalize(tissuePerturbed);
`;function EM(){const i=new gn({vertexColors:!0,side:un,roughness:.38,metalness:0,ior:1.37,specularIntensity:.72,clearcoat:.3,clearcoatRoughness:.23,envMapIntensity:.48});return i.name="Anatomical_Capsule_And_Procedural_Cut_Parenchyma",i.userData.detailDescription="Procedural display cues at millimetre and submillimetre scales; not patient-specific anatomy or histology.",i.onBeforeCompile=e=>{e.vertexShader=`attribute vec3 tissueRestPosition;
attribute float tissueCutMask;
varying vec3 vTissuePosition;
varying float vTissueCut;
`+e.vertexShader,e.vertexShader=e.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vTissuePosition=tissueRestPosition;
vTissueCut=tissueCutMask;`),e.fragmentShader=wM+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace("#include <color_fragment>",bM),e.fragmentShader=e.fragmentShader.replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
roughnessFactor=clamp(roughnessFactor+tissueCut*.18+(tissueGrain-.5)*.055*tissueGrainVisibility
                     +(tissueMottle-.5)*.040+tissueLumen*tissueCut*.08,.30,.68);`),e.fragmentShader=e.fragmentShader.replace("#include <normal_fragment_maps>",TM),e.fragmentShader=e.fragmentShader.replace("#include <lights_physical_fragment>",`#include <lights_physical_fragment>
#ifdef USE_CLEARCOAT
  material.clearcoat=mix(.30,.075,tissueCut)*(.90+.10*tissueMottle);
  material.clearcoatRoughness=max(material.clearcoatRoughness,mix(.23,.37,tissueCut));
#endif`)},i.customProgramCacheKey=()=>"anatomical-capsule-cut-parenchyma-v4",i}const qc=i=>Array.isArray(i)||ArrayBuffer.isView(i)?[...i]:i.toArray(),Jn=i=>new b().fromArray(qc(i)),Co=i=>i?new Oe().fromArray(qc(i)).normalize():new Oe;function Vu(i,e){const t=qc(e),{dims:n,origin:s,spacing:r,values:o}=i,a=t.map((f,g)=>(f-s[g])/r[g]);if(a.some(f=>!Number.isFinite(f)))return 1/0;const l=a.map((f,g)=>Math.max(0,Math.min(n[g]-1,f))),c=l.map((f,g)=>Math.min(n[g]-2,Math.floor(f))),h=l.map((f,g)=>f-c[g]);let u=0;for(let f=0;f<2;f++)for(let g=0;g<2;g++)for(let _=0;_<2;_++)u+=o[c[0]+_+n[0]*(c[1]+g+n[1]*(c[2]+f))]*(_?h[0]:1-h[0])*(g?h[1]:1-h[1])*(f?h[2]:1-h[2]);const d=Math.hypot(...a.map((f,g)=>(f-l[g])*r[g]));return d?Math.max(0,u)+d:u}class AM{constructor(e){this.tissue=e,this.group=new Ye,this.group.name="detached-liver-specimens",this.group.layers.enable(1),e.group.add(this.group),this.items=new Map}clear(){for(const e of this.items.values())e.mesh.geometry.dispose();this.items.clear(),this.group.clear()}add(e,t){if(this.items.has(e.id))return this.items.get(e.id);const n=t&&Object.hasOwn(t,"deformation")?t.deformation:Object.hasOwn(e,"deformation")?e.deformation:this.tissue._deformation,s=es(n),r=new b().fromArray(Ys(e.center,s)),o=new Float32Array(e.positions.length),a=new Float32Array(e.normals.length);for(let u=0;u<o.length;u+=3){const d=[...e.positions.subarray(u,u+3)],f=Ys(d,s),g=s?uM([...e.normals.subarray(u,u+3)],oa(d,s).gradient,s.displacement):e.normals.subarray(u,u+3);for(let _=0;_<3;_++)o[u+_]=f[_]-r.getComponent(_),a[u+_]=g[_]}const l=new Nt;l.setAttribute("position",new ct(o,3)),l.setAttribute("normal",new ct(a,3)),l.setAttribute("color",new ct(e.colors,3)),l.setAttribute("tissueRestPosition",new ct(e.positions,3)),l.setAttribute("tissueCutMask",new ct(e.cutMasks,1)),l.setIndex(new ct(e.indices,1)),l.computeBoundingBox(),l.computeBoundingSphere();const c=new qe(l,this.tissue.material);c.name=`specimen-${e.id}`,c.layers.enable(1),c.castShadow=!0,c.receiveShadow=!0,c.userData.tissue=!0,c.userData.fragmentId=e.id;const h={id:e.id,volumeMm3:e.volumeMm3,referenceCenter:[...e.center],frozenCenter:r,deformation:s,volume:e.volume,mesh:c,position:t?Jn(t.position):r.clone(),quaternion:Co(t?.quaternion),velocity:t?.velocity?Jn(t.velocity):new b,held:!!t?.held,attachment:t?.attachment?structuredClone(t.attachment):null,sleeping:!!t?.sleeping,contactTime:0,support:this._supportPoints(o)};return this.items.set(h.id,h),this.group.add(c),this.sync(h),h}_supportPoints(e){const t=[];for(let n=-1;n<=1;n++)for(let s=-1;s<=1;s++)for(let r=-1;r<=1;r++){if(!r&&!s&&!n)continue;let o=-1/0,a=0;for(let l=0;l<e.length;l+=3){const c=e[l]*r+e[l+1]*s+e[l+2]*n;c>o&&(o=c,a=l)}t.push(new b().fromArray(e,a))}return t}sync(e){e.mesh.position.copy(e.position),e.mesh.quaternion.copy(e.quaternion),e.mesh.updateMatrix(),e.box=e.mesh.geometry.boundingBox.clone().applyMatrix4(e.mesh.matrix)}snapshot(){return[...this.items.values()].map(e=>({id:e.id,position:e.position.toArray(),quaternion:e.quaternion.toArray(),velocity:e.velocity.toArray(),held:e.held,sleeping:e.sleeping,deformation:e.deformation?structuredClone(e.deformation):null,attachment:e.attachment?structuredClone(e.attachment):null}))}atReference(e){for(const t of this.items.values())if(Vu(t.volume,e)<=.002)return t;return null}referencePoint(e,t){const n=Jn(t).sub(e.position).applyQuaternion(e.quaternion.clone().invert()).add(e.frozenCenter);return fc(n.toArray(),e.deformation)}distance(e,t){return Vu(e.volume,this.referencePoint(e,t))}nearest(e,t=.006){const n=Jn(e);let s=null,r=1/0;for(const o of this.items.values()){if(o.box.distanceToPoint(n)>t)continue;const a=pc(o.deformation),l=Math.abs(this.distance(o,n))*a;l<=t&&l<r&&(s=o,r=l)}return s}surfacePoint(e,t){if(t>.02)return this.closestSurfacePoint(e,t);const n=this.nearest(e,t);if(!n)return this.closestSurfacePoint(e,t);const s=Jn(e),r=s.clone(),o=new b,a=Math.min(...n.volume.spacing)*.3;for(let l=0;l<10;l++){const c=this.distance(n,r);for(let h=0;h<3;h++){const u=r.clone(),d=r.clone();u.setComponent(h,u.getComponent(h)-a),d.setComponent(h,d.getComponent(h)+a),o.setComponent(h,(this.distance(n,d)-this.distance(n,u))/(2*a))}if(!Number.isFinite(c)||o.lengthSq()<1e-9)return this.closestSurfacePoint(e,t);if(Math.abs(c)<4e-5)break;r.addScaledVector(o,-c/o.lengthSq())}return r.distanceTo(s)>t||Math.abs(this.distance(n,r))>3e-4?this.closestSurfacePoint(e,t):(r.normal=o.normalize(),r.fragmentId=n.id,r)}closestSurfacePoint(e,t){const n=Jn(e);if(!Number.isFinite(t)||t<=0||!n.toArray().every(Number.isFinite))return null;let s=t*t,r=null;const o=new dn,a=new b,l=new b,c=new b,h=new b;for(const u of this.items.values()){if(u.box.distanceToPoint(n)>t)continue;const d=n.clone().sub(u.position).applyQuaternion(u.quaternion.clone().invert()),f=u.mesh.geometry,g=f.attributes.position,_=f.attributes.normal,m=f.index.array;for(let p=0;p<m.length;p+=3){const M=m[p],y=m[p+1],S=m[p+2];o.a.fromBufferAttribute(g,M),o.b.fromBufferAttribute(g,y),o.c.fromBufferAttribute(g,S),o.closestPointToPoint(d,a);const P=d.distanceToSquared(a);P>s||(s=P,o.getBarycoord(a,l),c.fromBufferAttribute(_,M).multiplyScalar(l.x),c.addScaledVector(h.fromBufferAttribute(_,y),l.y),c.addScaledVector(h.fromBufferAttribute(_,S),l.z),(!Number.isFinite(c.lengthSq())||c.lengthSq()<1e-12)&&o.getNormal(c),r=a.clone().applyQuaternion(u.quaternion).add(u.position),r.normal=c.clone().applyQuaternion(u.quaternion).normalize(),r.fragmentId=u.id)}}return r}attach(e,t,n){const s=this.items.get(e);if(!s)return!1;const r=Co(n);return s.attachment={anchor:Jn(t).sub(s.position).applyQuaternion(s.quaternion.clone().invert()).toArray(),rotationOffset:r.clone().invert().multiply(s.quaternion).toArray()},s.held=!0,s.sleeping=!1,s.velocity.set(0,0,0),!0}move(e,t,n){const s=this.items.get(e);return!s?.held||!s.attachment?!1:(s.quaternion.copy(Co(n)).multiply(Co(s.attachment.rotationOffset)),s.position.copy(Jn(t)).sub(Jn(s.attachment.anchor).applyQuaternion(s.quaternion)),s.velocity.set(0,0,0),this.sync(s),!0)}release(e){const t=this.items.get(e);return t?(t.held=!1,t.attachment=null,t.sleeping=!1,t.contactTime=0,t.velocity.set(0,0,0),!0):!1}update(e){if(!Number.isFinite(e)||e<=0)return;const t=this.tissue.group.getWorldQuaternion(new Oe).invert(),n=new b(0,-9.81,0).applyQuaternion(t),s=new b(0,1,0).applyQuaternion(t),r=Math.max(1,Math.ceil(Math.min(.05,e)/.01)),o=Math.min(.05,e)/r;for(const a of this.items.values())if(!(a.held||a.sleeping)){for(let l=0;l<r;l++){a.velocity.addScaledVector(n,o).multiplyScalar(Math.exp(-o*1.6)),a.position.addScaledVector(a.velocity,o);let c=0,h=null,u=0;for(const f of a.support){const g=f.clone().applyQuaternion(a.quaternion).add(a.position),_=this.tissue.sampleDistance(g);Number.isFinite(_)&&_<c&&(c=_,h=g);const m=this.tissue.group.localToWorld(g.clone());u=Math.max(u,.959-m.y)}let d=!1;if(h&&c<-1e-4){const f=new b,g=6e-4;for(let m=0;m<3;m++){const p=h.clone(),M=h.clone();p.setComponent(m,p.getComponent(m)-g),M.setComponent(m,M.getComponent(m)+g),f.setComponent(m,(this.tissue.sampleDistance(M)-this.tissue.sampleDistance(p))/(2*g))}(!Number.isFinite(f.lengthSq())||f.lengthSq()<1e-8)&&f.copy(s),f.normalize(),a.position.addScaledVector(f,Math.min(.008,-c+2e-4));const _=a.velocity.dot(f);_<0&&a.velocity.addScaledVector(f,-_),d=!0}if(u>0){a.position.addScaledVector(s,u);const f=a.velocity.dot(s);f<0&&a.velocity.addScaledVector(s,-f),d=!0}if(d?(a.velocity.multiplyScalar(Math.exp(-o*18)),a.contactTime+=o):a.contactTime=0,a.contactTime>.3&&a.velocity.length()<.003){a.sleeping=!0,a.velocity.set(0,0,0);break}}this.sync(a)}}get metrics(){return{count:this.items.size,volumeMm3:[...this.items.values()].reduce((e,t)=>e+t.volumeMm3,0),pieces:[...this.items.values()].map(e=>({id:e.id,volumeMm3:e.volumeMm3,position:e.position.toArray(),quaternion:e.quaternion.toArray(),held:e.held,sleeping:e.sleeping}))}}}const sl=(i,e)=>Math.max(e[0]-i.x,0,i.x-e[3])**2+Math.max(e[1]-i.y,0,i.y-e[4])**2+Math.max(e[2]-i.z,0,i.z-e[5])**2;class RM{constructor(e){this.geometry=e,this.positions=e.attributes.position,this.indices=e.index.array;const t=Array.from({length:this.indices.length/3},(r,o)=>o),n=(r,o)=>{const a=r*3,l=this.indices[a],c=this.indices[a+1],h=this.indices[a+2];return(this.positions.array[l*3+o]+this.positions.array[c*3+o]+this.positions.array[h*3+o])/3},s=r=>{if(r.length<=12)return{triangles:r,bounds:new Float64Array(6)};const o=[1/0,1/0,1/0],a=[-1/0,-1/0,-1/0];for(const h of r)for(let u=0;u<3;u++){const d=n(h,u);o[u]=Math.min(o[u],d),a[u]=Math.max(a[u],d)}let l=0;for(let h=1;h<3;h++)a[h]-o[h]>a[l]-o[l]&&(l=h);r.sort((h,u)=>n(h,l)-n(u,l));const c=r.length>>1;return{left:s(r.slice(0,c)),right:s(r.slice(c)),bounds:new Float64Array(6)}};this.root=s(t),this.version=-1}refit(){if(this.version===this.positions.version)return;const e=this.positions.array,t=this.indices,n=s=>{const r=s.bounds;if(r.set([1/0,1/0,1/0,-1/0,-1/0,-1/0]),s.triangles)for(const o of s.triangles)for(let a=0;a<3;a++){const l=t[o*3+a]*3;for(let c=0;c<3;c++)r[c]=Math.min(r[c],e[l+c]),r[c+3]=Math.max(r[c+3],e[l+c])}else{n(s.left),n(s.right);for(let o=0;o<3;o++)r[o]=Math.min(s.left.bounds[o],s.right.bounds[o]),r[o+3]=Math.max(s.left.bounds[o+3],s.right.bounds[o+3])}};n(this.root),this.version=this.positions.version}nearest(e,t){this.refit();let n=t*t,s=null;const r=new dn,o=new b,a=new b,l=new b,c=this.positions,h=this.geometry.attributes.normal,u=this.indices,d=[this.root];for(;d.length;){const f=d.pop();if(!(sl(e,f.bounds)>n)){if(!f.triangles){const g=sl(e,f.left.bounds),_=sl(e,f.right.bounds);g<_?d.push(f.right,f.left):d.push(f.left,f.right);continue}for(const g of f.triangles){const _=u[g*3],m=u[g*3+1],p=u[g*3+2];r.a.fromBufferAttribute(c,_),r.b.fromBufferAttribute(c,m),r.c.fromBufferAttribute(c,p),r.closestPointToPoint(e,o);const M=e.distanceToSquared(o);if(M>n)continue;n=M,r.getBarycoord(o,a);const y=new b().fromBufferAttribute(h,_).multiplyScalar(a.x);y.addScaledVector(l.fromBufferAttribute(h,m),a.y).addScaledVector(l.fromBufferAttribute(h,p),a.z),!Number.isFinite(y.lengthSq())||y.lengthSq()<1e-12?r.getNormal(y):y.normalize(),s=o.clone(),s.normal=y}}}return s}}const Hu=new WeakMap;function CM(i,e,t){let n=null,s=t;for(const r of i){const o=r.geometry;if(!o.index?.count||o.boundingBox?.distanceToPoint(e)>s)continue;let a=Hu.get(o);a||(a=new RM(o),Hu.set(o,a));const l=a.nearest(e,s);l&&(s=l.distanceTo(e),n=l)}return n}const On=i=>Array.isArray(i)?[...i]:[i.x,i.y,i.z],Gu=i=>i.map(e=>Wr(e)),rl=(i,e,t)=>Math.max(e[0]-i[0],0,i[0]-t[0])**2+Math.max(e[1]-i[1],0,i[1]-t[1])**2+Math.max(e[2]-i[2],0,i[2]-t[2])**2,ol=(i,e,t=1)=>i>0&&(e>=0||i*t*t>=e*e);class PM{constructor(){this.group=new Ye,this.group.name="anatomical-liver-volume",this.ready=!1,this.busy=!1,this.removedVolumeMm3=0,this.totalVolumeMm3=0,this.voxelMm=1.5,this.error=null,this._meshes=new Map,this._cuts=[],this._cutGroups=[],this._cutGroupMap=new Map,this._indexedCuts=this._cuts,this._indexedCutCount=0,this._queryStats={queries:0,mappedGroups:0,evaluatedCutters:0,skippedGroups:0,skippedCutters:0},this._commands=[],this._epoch=0,this._sequence=0,this._inFlight=null,this._disposed=!1,this._deformation=null,this._affectedVertices=0,this._deformationStats={cacheBuilds:0,radiusUpdates:0,movedVertices:0},this.material=EM(),this.fragments=new AM(this),this._separations=[],this._excludedValues=new Map,this._restoringFragmentPoses=null,this._contactQueryCache=new Map,this._contactHistoryScale=1,this._contactHasDeformedCuts=!1}async load(e="./assets/liver-volume"){if(this._disposed)throw new Error("TissueVolume has been disposed");if(this.worker)throw new Error("This tissue volume has already been loaded");let t=String(e).replace(/\.(?:json|bin)$/,"");t.endsWith("/")&&(t+="liver-volume");const[n,s]=await Promise.all([fetch(`${t}.json`),fetch(`${t}.bin`)]);if(!n.ok||!s.ok)throw new Error("Could not load the anatomical liver volume");const[r,o]=await Promise.all([n.json(),s.arrayBuffer()]);return this.metadata=Jd(r),this._baseField=new Float32Array(o.slice(0)),this.worker=new Worker(new URL(""+new URL("tissue-worker-Bbka1io8.js",import.meta.url).href,import.meta.url),{type:"module"}),this.worker.onmessage=({data:a})=>this._receive(a),this.worker.onerror=a=>this._fail(new Error(a.message||"Tissue geometry worker failed")),await this._enqueue({type:"init",metadata:r,buffer:o,transfer:[o]}),this.ready=!0,this.onChange?.(),this}cut(e,t){return this.cutSegment(e,e,t)}cutSegment(e,t,n){if(!this.ready||this._disposed)return Promise.resolve({changed:!1,removedMm3:0,reason:"not-ready"});let s;try{s=Wr({a:On(e),b:On(t),radius:n,deformation:this._deformation})}catch(o){return Promise.reject(o)}const r=this._cuts.at(-1);return r&&s.radius===r.radius&&JSON.stringify(s)===JSON.stringify(r)?Promise.resolve({changed:!1,removedMm3:0,removedVolumeMm3:this.removedVolumeMm3}):this._cuts.length>=5e4?Promise.resolve({changed:!1,removedMm3:0,reason:"history-limit"}):(this._cuts.push(s),this._enqueue({type:"cut",cuts:[s]}))}snapshot(){return{version:2,cuts:Gu(this._cuts),deformation:this._deformation?es(this._deformation):null,separations:structuredClone(this._separations),fragments:this.fragments.snapshot()}}async restore(e){if(!this.ready||this._disposed)return{changed:!1,reason:"not-ready"};if(!e||![1,2].includes(e.version)||!Array.isArray(e.cuts)||e.cuts.length>5e4)throw new Error("Invalid tissue snapshot");const t=e.cuts.map(Wr);this._epoch++;for(const n of this._commands.splice(0))n.resolve({changed:!1,cancelled:!0});return this._cuts=Gu(t),this._restoringFragmentPoses=new Map((e.fragments??[]).map(n=>[n.id,structuredClone(n)])),this.setGrasp(e.deformation??null),this._enqueue({type:"restore",cuts:t,separations:structuredClone(e.separations??[])})}reset(){return this.restore({version:1,cuts:[]})}toReferencePoint(e){return new b().fromArray(fc(On(e),this._deformation))}deformPoint(e){return new b().fromArray(Ys(On(e),this._deformation))}queryReferenceDistance(e){return this._sampleReferenceDistance(On(e))}getFragment(e){return this.fragments.items.get(e)??null}fragmentAtReference(e){return this.fragments.atReference(e)}findFragmentAt(e,t=.006){return this.fragments.nearest(e,t)?.id??null}findSpecimenGraspPoint(e,t=.35){return this.fragments.surfacePoint(e,t)}attachFragment(e,t,n){return this.fragments.attach(e,t,n)}moveHeldFragment(e,t,n){return this.fragments.move(e,t,n)}releaseFragment(e){return this.fragments.release(e)}updateFragments(e){this.fragments.update(e)}get fragmentMetrics(){return this.fragments.metrics}sampleDistance(e){if(!this._baseField)return 1/0;const t=On(e);return t.some(n=>!Number.isFinite(n))?1/0:this._sampleReferenceDistance(fc(t,this._deformation))}contactDistance(e,t=.006){if(!e)return 1/0;const n=On(e);if(n.length!==3||!n.every(Number.isFinite)||!Number.isFinite(t)||t<=0)return 1/0;const s=this.sampleDistance(n);if(!this._deformation&&!this._contactHasDeformedCuts)return s;const r=this._parentContact(n,t,s);return r?(s<0?-1:1)*r.distance:s<0?s*this._contactMinimumScale():1/0}_contactMinimumScale(){return pc(this._deformation)*this._contactHistoryScale/Math.sqrt(3)}_parentContact(e,t,n=this.sampleDistance(e)){const s=[this._epoch,this._cuts.length,...e,t].join(",");if(this._contactQueryCache.has(s))return this._contactQueryCache.get(s);const r=this._contactMinimumScale(),o=new b(...e);let a=null,l=this._meshes.size===0;for(const c of this._meshes.values())if(c.geometry.boundingBox.distanceToPoint(o)<=t){l=!0;break}if(l&&Number.isFinite(n)&&Math.abs(n)*r<=t){const c=o.clone(),h=new b,u=Math.min(Math.min(...this.metadata.spacing)*.2,25e-5);for(let d=0;d<14;d++){const f=this.sampleDistance(c);if(!Number.isFinite(f))break;for(let p=0;p<3;p++){const M=c.clone(),y=c.clone();M.setComponent(p,M.getComponent(p)-u),y.setComponent(p,y.getComponent(p)+u),h.setComponent(p,(this.sampleDistance(y)-this.sampleDistance(M))/(2*u))}const g=h.lengthSq();if(!Number.isFinite(g)||g<1e-12)break;if(Math.abs(f)<1e-7){const p=c.distanceTo(o);p<=t&&(c.normal=h.clone().normalize(),a={surface:c,distance:p});break}const _=-f/g,m=Math.max(.003,t);if(c.addScaledVector(h,Math.max(-m/Math.sqrt(g),Math.min(m/Math.sqrt(g),_))),c.distanceTo(o)>t*2+.003)break}}if(l&&!a&&(!Number.isFinite(n)||Math.abs(n)*r<=t)){const c=CM(this._meshes.values(),o,t);c&&(a={surface:c,distance:c.distanceTo(o)})}return this._contactQueryCache.size>=64&&this._contactQueryCache.clear(),this._contactQueryCache.set(s,a),a}_sampleReferenceDistance(e){const t=this.metadata;if(e.some(a=>!Number.isFinite(a)))return 1/0;const n=e.map((a,l)=>(a-t.origin[l])/t.spacing[l]);if(n.some((a,l)=>a<0||a>t.dims[l]-1))return 1/0;const s=n.map((a,l)=>Math.min(Math.floor(a),t.dims[l]-2)),r=n.map((a,l)=>a-s[l]);let o=0;for(let a=0;a<=1;a++)for(let l=0;l<=1;l++)for(let c=0;c<=1;c++){const h=(c?r[0]:1-r[0])*(l?r[1]:1-r[1])*(a?r[2]:1-r[2]),u=Vn(t,s[0]+c,s[1]+l,s[2]+a);o+=h*(this._excludedValues.get(u)??this._baseField[u])}this._ensureCutIndex(),this._queryStats.queries++;for(const a of this._cutGroups){if(ol(rl(e,a.referenceLow,a.referenceHigh),o,a.minimumScale)){this._queryStats.skippedGroups++;continue}const l=a.deformation?Ys(e,a.deformation):e;if(this._queryStats.mappedGroups++,ol(rl(l,a.low,a.high),o)){this._queryStats.skippedGroups++;continue}for(const c of a.entries){if(o>=c.cut.radius||ol(rl(l,c.low,c.high),o)){this._queryStats.skippedCutters++;continue}o=Math.max(o,c.cut.radius-Qd(l,c.cut.a,c.cut.b)),this._queryStats.evaluatedCutters++}}return o}_ensureCutIndex(){for((this._indexedCuts!==this._cuts||this._indexedCutCount>this._cuts.length)&&(this._cutGroups=[],this._cutGroupMap.clear(),this._indexedCuts=this._cuts,this._indexedCutCount=0,this._contactHistoryScale=1,this._contactHasDeformedCuts=!1,this._contactQueryCache.clear());this._indexedCutCount<this._cuts.length;){const e=this._cuts[this._indexedCutCount++],t=e.deformation,n=t?JSON.stringify(t):"rest";let s=this._cutGroupMap.get(n);if(!s){const l=pc(t);this._contactHistoryScale=Math.min(this._contactHistoryScale,l),this._contactHasDeformedCuts||=!!t,s={deformation:t,minimumScale:l,entries:[],low:[1/0,1/0,1/0],high:[-1/0,-1/0,-1/0],referenceLow:[1/0,1/0,1/0],referenceHigh:[-1/0,-1/0,-1/0]},this._cutGroupMap.set(n,s),this._cutGroups.push(s)}const r=e.a.map((l,c)=>Math.min(l,e.b[c])-e.radius),o=e.a.map((l,c)=>Math.max(l,e.b[c])+e.radius),a=t?.displacement??[0,0,0];for(let l=0;l<3;l++)s.low[l]=Math.min(s.low[l],r[l]),s.high[l]=Math.max(s.high[l],o[l]),s.referenceLow[l]=Math.min(s.referenceLow[l],r[l]-Math.max(0,a[l])),s.referenceHigh[l]=Math.max(s.referenceHigh[l],o[l]-Math.min(0,a[l]));s.entries.push({cut:e,low:r,high:o})}}get queryMetrics(){return{...this._queryStats,groups:this._cutGroups.length,cuts:this._cuts.length}}contains(e,t=0){return this.sampleDistance(e)<=Math.max(0,Number.isFinite(t)?t:0)}findGraspPoint(e,t=.008){if(!this._baseField||!e||!Number.isFinite(t)||t<=0)return null;const n=this.fragments.surfacePoint(e,t);return n||this.findParentSurfacePoint(e,t)}findParentSurfacePoint(e,t=.008){if(!this._baseField||!e||!Number.isFinite(t)||t<=0)return null;const n=On(e);if(n.length!==3||!n.every(Number.isFinite))return null;const s=this._parentContact(n,t);if(!s)return null;const r=s.surface.clone();return r.normal=s.surface.normal.clone(),r}get graspMetrics(){const e=this._deformation;return{active:!!e,displacementMm:e?Math.hypot(...e.displacement)*1e3:0,radiusMm:e?e.radius*1e3:0,affectedVertices:this._affectedVertices,coreRadiusMm:e?.model==="local-flow"?e.coreRadius*1e3:0,local:e?[...e.local]:null,displacement:e?[...e.displacement]:[0,0,0],model:e?.model==="local-flow"?"Local anchored traction with a 2.5 mm grasp core; uncalibrated geometric strain model":"Legacy compact geometric displacement; not calibrated tissue mechanics"}}get deformationMetrics(){return{...this._deformationStats}}setGrasp(e,t){let n=null;try{e&&t?n=es({model:"local-flow",local:On(e),displacement:On(t)}):e?.local&&(n=es(e))}catch{return!1}if(n&&n.model!=="local-flow"&&(n.radius<1e6&&(n.radius=Math.ceil(n.radius*1e3)/1e3),this._deformation&&n.local.every((s,r)=>s===this._deformation.local[r])&&(n.radius=Math.max(n.radius,this._deformation.radius))),JSON.stringify(n)===JSON.stringify(this._deformation))return!0;this._deformation=n,this._contactQueryCache.clear(),this._affectedVertices=0;for(const s of this._meshes.values())this._affectedVertices+=this._applyDeformation(s);return!0}_applyLocalDeformation(e){const t=e.geometry,n=t.userData.restPositions,s=t.userData.restNormals,r=t.attributes.position.array,o=t.attributes.normal.array,a=this._deformation,l=Math.hypot(...a.displacement),c=a.radius+Math.max(l*1.1,Li.radius*Li.slipStrain),h=["local-flow",...a.local,a.radius,a.coreRadius].join(",");let u=t.userData.deformationCache,d=!1;if(u?.signature!==h||u.capacity<a.radius+l){d=!!t.userData.deformed,d&&(r.set(n),o.set(s));const P=[],E=t.userData.restBox;if(Math.max(E.min.x-a.local[0],0,a.local[0]-E.max.x)**2+Math.max(E.min.y-a.local[1],0,a.local[1]-E.max.y)**2+Math.max(E.min.z-a.local[2],0,a.local[2]-E.max.z)**2<c*c)for(let R=0;R<n.length;R+=3){const v=n[R]-a.local[0],x=n[R+1]-a.local[1],A=n[R+2]-a.local[2];v*v+x*x+A*A<c*c&&P.push(R)}u={signature:h,capacity:c,indices:new Uint32Array(P),active:new Uint8Array(P.length)},t.userData.deformationCache=u,this._deformationStats.cacheBuilds++,this._deformationStats.radiusUpdates++}let f=0,g=0,_=1/0,m=-1/0;const[p,M,y]=a.displacement;for(let P=0;P<u.indices.length;P++){const E=u.indices[P],{weight:C,gradient:R}=oa([n[E],n[E+1],n[E+2]],a);if(!C&&!u.active[P])continue;u.active[P]=C>0?1:0,f+=u.active[P],g=Math.max(g,C),_=Math.min(_,E),m=Math.max(m,E),r[E]=n[E]+p*C,r[E+1]=n[E+1]+M*C,r[E+2]=n[E+2]+y*C;const v=(s[E]*p+s[E+1]*M+s[E+2]*y)/(1+R[0]*p+R[1]*M+R[2]*y),x=s[E]-R[0]*v,A=s[E+1]-R[1]*v,D=s[E+2]-R[2]*v,U=Math.hypot(x,A,D)||1;o[E]=x/U,o[E+1]=A/U,o[E+2]=D/U}if(u.activeCount=f,this._deformationStats.movedVertices+=f,m>=_||d)for(const P of[t.attributes.position,t.attributes.normal])P.clearUpdateRanges(),!d&&m>=_&&P.addUpdateRange(_,m-_+3),P.needsUpdate=!0;const S=l*g;return t.boundingSphere.copy(t.userData.restSphere),t.boundingSphere.radius+=S,t.boundingBox.copy(t.userData.restBox).expandByScalar(S),t.userData.deformed=f>0,f}_applyDeformation(e){const t=e.geometry,n=t.userData.restPositions,s=t.userData.restNormals,r=t.attributes.position.array,o=t.attributes.normal.array,a=this._deformation;if(!a)return t.userData.deformed&&(r.set(n),o.set(s),t.attributes.position.clearUpdateRanges(),t.attributes.normal.clearUpdateRanges(),t.attributes.position.needsUpdate=!0,t.attributes.normal.needsUpdate=!0,t.userData.deformed=!1,t.boundingSphere.copy(t.userData.restSphere),t.boundingBox.copy(t.userData.restBox)),0;if(a.model==="local-flow")return this._applyLocalDeformation(e);const l=a.local.join(",");let c=t.userData.deformationCache,h=!1;if(c?.signature!==l||c.capacity<a.radius){this._deformationStats.cacheBuilds++,t.userData.deformed&&(r.set(n),o.set(s)),h=!!t.userData.deformed;const v=Math.max(.14,a.radius*1.5),x=[],A=[],D=t.userData.restBox,U=a.local;if(Math.max(D.min.x-U[0],0,U[0]-D.max.x)**2+Math.max(D.min.y-U[1],0,U[1]-D.max.y)**2+Math.max(D.min.z-U[2],0,U[2]-D.max.z)**2<v*v)for(let k=0;k<n.length;k+=3){const F=n[k]-U[0],q=n[k+1]-U[1],V=n[k+2]-U[2],K=Math.sqrt(F*F+q*q+V*V);K<v&&(x.push(k),A.push(K))}c={signature:l,capacity:v,indices:new Uint32Array(x),distances:new Float32Array(A),weights:new Float32Array(x.length),gradients:new Float32Array(x.length*3),radius:0,maximumWeight:0,activeCount:0},t.userData.deformationCache=c}const[u,d,f]=a.displacement,[g,_,m]=a.local,p=a.radius,M=1/p,y=M*M,S=c.radius!==p;S&&this._deformationStats.radiusUpdates++;let P=0,E=0,C=1/0,R=-1/0;for(let v=0;v<c.indices.length;v++){const x=c.indices[v],A=v*3;let D=c.weights[v];if(S){const ce=c.distances[v];if(ce>=p){c.weights[v]=0;continue}const Te=ce*M,$e=1-Te,Je=$e*$e;D=Je*Je*(4*Te+1);const Ve=-20*Je*$e*y;c.weights[v]=D,c.gradients[A]=(n[x]-g)*Ve,c.gradients[A+1]=(n[x+1]-_)*Ve,c.gradients[A+2]=(n[x+2]-m)*Ve}if(!D)continue;P++,E=Math.max(E,D),C=Math.min(C,x),R=Math.max(R,x);const U=c.gradients[A],L=c.gradients[A+1],k=c.gradients[A+2];r[x]=n[x]+u*D,r[x+1]=n[x+1]+d*D,r[x+2]=n[x+2]+f*D;const F=(s[x]*u+s[x+1]*d+s[x+2]*f)/(1+U*u+L*d+k*f),q=s[x]-U*F,V=s[x+1]-L*F,K=s[x+2]-k*F,ee=Math.sqrt(q*q+V*V+K*K)||1;o[x]=q/ee,o[x+1]=V/ee,o[x+2]=K/ee}if(c.radius=p,c.maximumWeight=E,c.activeCount=P,this._deformationStats.movedVertices+=P,(P||t.userData.deformed)&&(t.attributes.position.clearUpdateRanges(),t.attributes.normal.clearUpdateRanges(),!h&&P&&(t.attributes.position.addUpdateRange(C,R-C+3),t.attributes.normal.addUpdateRange(C,R-C+3)),t.attributes.position.needsUpdate=!0,t.attributes.normal.needsUpdate=!0),P||t.userData.deformed){const v=Math.sqrt(u*u+d*d+f*f)*E;t.boundingSphere.copy(t.userData.restSphere),t.boundingSphere.radius+=v,t.boundingBox.copy(t.userData.restBox).expandByScalar(v)}return t.userData.deformed=!!P,P}_enqueue(e){return this.worker?(this.busy=!0,new Promise((t,n)=>{this._commands.push({...e,epoch:this._epoch,resolve:t,reject:n}),queueMicrotask(()=>this._flush())})):Promise.reject(new Error("Tissue worker is not available"))}_flush(){if(this._inFlight||!this._commands.length||this._disposed)return;const e=this._commands.shift(),t=[e];if(e.type==="cut")for(;this._commands[0]?.type==="cut"&&this._commands[0].epoch===e.epoch&&e.cuts.length<256;){const a=this._commands.shift();t.push(a),e.cuts.push(...a.cuts)}e.id=++this._sequence,this._inFlight={command:e,callbacks:t};const{resolve:n,reject:s,transfer:r,...o}=e;this.worker.postMessage(o,r??[])}_receive(e){const t=this._inFlight;if(!(!t||e.id!==t.command.id)){if(this._inFlight=null,e.error){const n=new Error(e.error);this.error=n,t.callbacks.forEach(s=>s.reject(n))}else if(e.epoch!==this._epoch)t.callbacks.forEach(n=>n.resolve({changed:!1,cancelled:!0}));else{if(e.exclusions?.reset&&this._excludedValues.clear(),e.exclusions)for(let s=0;s<e.exclusions.nodeIndices.length;s++)this._excludedValues.set(e.exclusions.nodeIndices[s],e.exclusions.positiveValues[s]);(e.type==="init"||e.type==="restore")&&this.fragments.clear();for(const s of e.fragments??[])this.fragments.add(s,this._restoringFragmentPoses?.get(s.id));e.separations&&(this._separations=structuredClone(e.separations)),e.type==="restore"&&(this._restoringFragmentPoses=null);for(const s of e.chunks)this._replaceChunk(s);Object.assign(this,e.statistics);const n={changed:!!e.changedSamples||e.type!=="cut",removedMm3:e.removedMm3,removedVolumeMm3:this.removedVolumeMm3,totalVolumeMm3:this.totalVolumeMm3,fragments:(e.fragments??[]).map(s=>s.id)};t.callbacks.forEach(s=>s.resolve(n)),this.onChange?.(n)}this.busy=!!this._commands.length,this._flush()}}_replaceChunk(e){this._contactQueryCache.clear();const t=this._meshes.get(e.key);if(t?.geometry.userData.deformed&&(this._affectedVertices-=t.geometry.userData.deformationCache?.activeCount??0),t&&(t.geometry.dispose(),this.group.remove(t),this._meshes.delete(e.key)),!e.positions.length)return;const n=new Nt;n.userData.restPositions=e.positions,n.userData.restNormals=e.normals,n.setAttribute("position",new ct(e.positions.slice(),3).setUsage(hh)),n.setAttribute("normal",new ct(e.normals.slice(),3).setUsage(hh)),n.setAttribute("color",new ct(e.colors,3)),n.setAttribute("tissueRestPosition",new ct(e.positions,3)),n.setAttribute("tissueCutMask",new ct(e.cutMasks??new Float32Array(e.positions.length/3),1)),n.setIndex(new ct(e.indices,1)),n.computeBoundingSphere(),n.userData.restSphere=n.boundingSphere.clone(),n.computeBoundingBox(),n.userData.restBox=n.boundingBox.clone();const s=new qe(n,this.material);s.name=`liver-chunk-${e.key}`,s.castShadow=!0,s.receiveShadow=!0,s.layers.enable(1),s.userData.tissue=!0,this._affectedVertices+=this._applyDeformation(s),this.group.add(s),this._meshes.set(e.key,s)}_fail(e){this.error=e,this.busy=!1,this._inFlight?.callbacks.forEach(t=>t.reject(e)),this._inFlight=null;for(const t of this._commands.splice(0))t.reject(e)}dispose(){this._disposed=!0,this.ready=!1,this.worker?.terminate(),this._fail(new Error("Tissue volume disposed"));for(const e of this._meshes.values())e.geometry.dispose();this.fragments.clear(),this._excludedValues.clear(),this._meshes.clear(),this.group.clear(),this.material.dispose(),this._baseField=null}}const Yi=i=>i==null?null:structuredClone(i),wi=(i,e)=>i.group.worldToLocal(new b(...e));class DM{constructor(e,t,{onMessage:n=()=>{},onEvent:s=()=>{},toolDirection:r,toolQuaternion:o}={}){this.sim=e,this.tissue=t,this.onMessage=n,this.onEvent=s,this.toolDirection=r,this.toolQuaternion=o,this.grasp=null,this.relaxing=null,this.cuttingBusy=!1,this.lastCut=null,this.contact={left:!1,right:!1,rightDepthMm:0,cutting:!1},this._generation=0,this._fragmentRebaseId=null,this.requiresReopen=!1}snapshot(){return{version:3,tissue:this.tissue.snapshot(),grasp:Yi(this.grasp),relaxing:Yi(this.relaxing),requiresReopen:this.requiresReopen}}async restore(e){const t=++this._generation;this._fragmentRebaseId=null,this.lastCut=null,this.relaxing=null,await this.tissue.restore(e?.tissue??e),t===this._generation&&(this.grasp=Yi(e?.grasp),this.grasp&&(this.grasp.kind??=this.grasp.fragmentId!=null?"fragment":"tissue",Object.hasOwn(this.grasp,"reference")||(this.grasp.reference=this.grasp.kind==="fragment"?null:[...this.grasp.local]),this.grasp.kind==="tissue"&&(this.grasp.deformationModel??=e?.tissue?.deformation?.model??"legacy",this.grasp.deformationModel==="legacy"&&(this.grasp.deformationRadius??=e?.tissue?.deformation?.radius??.065))),this.relaxing=Yi(e?.relaxing),this.relaxing&&(this.relaxing.deformationModel??=e?.tissue?.deformation?.model??"legacy",this.relaxing.deformationModel==="legacy"&&(this.relaxing.deformationRadius??=e?.tissue?.deformation?.radius??.065)),this.requiresReopen=!!e?.requiresReopen,this.grasp?.kind==="fragment"&&(this._fragmentRebaseId=this.grasp.fragmentId),this.grasp?.kind!=="fragment"&&this.applyGrasp({restoring:!0}))}release(e=!1){e&&(this.requiresReopen=!1),this._fragmentRebaseId=null;const t=this.grasp;t?.kind==="fragment"?this.tissue.releaseFragment?.(t.fragmentId):t&&!e&&(this.relaxing={...Yi(t),remaining:1}),this.grasp=null,e&&(this.relaxing=null,this.tissue.setGrasp(null)),this.onEvent("release",{kind:t?.kind??"tissue",fragmentId:t?.fragmentId??null})}_toolQuaternionLocal(e="left"){const t=this.toolQuaternion?.(e);let n;if(t?.isQuaternion)n=t.clone();else if(Array.isArray(t)&&t.length===4&&t.every(Number.isFinite))n=new Oe().fromArray(t);else{const s=this.sim.state.tools[e],r=new b(...s.position).sub(new b(...s.port));r.lengthSq()<1e-16?r.set(0,0,1):r.normalize(),n=new Oe().setFromUnitVectors(new b(0,0,1),r).multiply(new Oe().setFromEuler(new bn(s.wrist[0],s.wrist[1],s.wrist[2],"XYZ")))}return this.tissue.group.getWorldQuaternion(new Oe).invert().multiply(n).normalize()}_attachFragment(e,t=null,{transition:n=!1,surfaceAnchor:s=null}={}){if(e==null||!this.tissue.getFragment?.(e))return!1;const r=wi(this.tissue,this.sim.state.tools.left.position);if(this.tissue.attachFragment?.(e,s??r,this._toolQuaternionLocal())===!1)return!1;const o=this.grasp;return n&&o?.kind!=="fragment"&&(this.relaxing={...Yi(o),remaining:1},this.tissue.setGrasp(null)),this.grasp={kind:"fragment",fragmentId:e,local:r.toArray(),reference:t?[...t]:null,displacement:[0,0,0]},this._fragmentRebaseId=null,this.onEvent("fragment-grasp",{fragmentId:e,transition:n}),this.onMessage(n?"切断已确认：左钳现夹持独立组织块，可移动、旋转，V 松开":"已夹住切离组织块：可移动和旋转，V 松开放下"),!0}_reconcileDetachedGrasp(){if(!this.grasp||this.grasp.kind==="fragment")return!1;const e=this.grasp.reference??this.grasp.local,t=this.tissue.fragmentAtReference?.(new b(...e));let n=t?.id??(typeof t=="string"||typeof t=="number"?t:null);if(n==null&&!this.tissue.fragmentAtReference){const s=this.tissue.deformPoint?.(new b(...e))??wi(this.tissue,this.sim.state.tools.left.position);n=this.tissue.findFragmentAt?.(s,.005)??null}return n!=null?this._attachFragment(n,e,{transition:!0}):!1}_setAttachedDeformation(e,t){e.deformationModel==="legacy"?this.tissue.setGrasp({local:[...e.local],displacement:t.toArray(),radius:e.deformationRadius??.065}):this.tissue.setGrasp(new b(...e.local),t)}applyGrasp({restoring:e=!1}={}){if(!this.grasp)return;if(this.grasp.kind==="fragment"){if(!this.tissue.getFragment?.(this.grasp.fragmentId)){this.grasp=null,this._fragmentRebaseId=null,this.onMessage("该组织块已不存在，左钳夹持已解除");return}if(this.sim.state.paused)return;const s=wi(this.tissue,this.sim.state.tools.left.position),r=this._toolQuaternionLocal();if(this._fragmentRebaseId===this.grasp.fragmentId){if(this.tissue.attachFragment?.(this.grasp.fragmentId,s,r)===!1)return;this._fragmentRebaseId=null}this.tissue.moveHeldFragment?.(this.grasp.fragmentId,s,r);return}const n=wi(this.tissue,this.sim.state.tools.left.position).sub(new b(...this.grasp.local));if(!e&&n.length()>Li.radius*Li.slipStrain){this.release(),this.requiresReopen=!0,this.lastCut=null,this.onEvent("grasp-slip",{strain:n.length()/Li.radius}),this.onMessage("局部组织过度牵拉，已从左钳滑脱并回弹；请张开后重新夹持。此为未标定的几何应变模型");return}this.grasp.displacement=n.toArray(),this._setAttachedDeformation(this.grasp,n)}updateGrasp(e){const t=this.sim.state.tools.left;if(t.jaw>.32&&(this.requiresReopen=!1),this._reconcileDetachedGrasp(),t.jaw>.32&&this.grasp&&this.release(),t.jaw<.16&&!this.grasp&&!this.relaxing&&!this.requiresReopen){const n=wi(this.tissue,t.position),s=this.tissue.findGraspPoint(n,.006);if(s)if(s.fragmentId!=null)this._attachFragment(s.fragmentId,s.reference?.toArray?.()??null,{surfaceAnchor:s});else{const r=this.tissue.toReferencePoint?.(s)??s;this.grasp={kind:"tissue",fragmentId:null,deformationModel:"local-flow",local:r.toArray(),reference:r.toArray(),displacement:[0,0,0]},this.onEvent("grasp"),this.onMessage("左钳已夹住肝包膜：按 E 抬起，组织会随钳尖牵拉；V 松开")}}this.grasp&&this.applyGrasp(),(!this.grasp||this.grasp.kind==="fragment")&&this.relaxing?(this.relaxing.remaining*=Math.exp(-e*11),this._setAttachedDeformation(this.relaxing,new b(...this.relaxing.displacement).multiplyScalar(this.relaxing.remaining)),this.relaxing.remaining<.008&&(this.relaxing=null,this.tissue.setGrasp(null))):(!this.grasp||this.grasp.kind==="fragment")&&this.tissue.setGrasp(null)}async update(e,{clutched:t=!1}={}){if(!this.tissue.ready||this.sim.state.paused)return;this.updateGrasp(e),this.tissue.updateFragments?.(e);const{left:n,right:s}=this.sim.state.tools,r=wi(this.tissue,n.position),o=this.tissue.contactDistance?.(r,.006)??this.tissue.sampleDistance(r),a=this.tissue.findFragmentAt?.(r,.006)??null,l=wi(this.tissue,s.position),c=this.tissue.contactDistance?.(l,.0032)??this.tissue.sampleDistance(l);if(this.contact.left=o<.006||a!=null,this.contact.leftFragmentId=a,this.contact.right=c<.0032,this.contact.rightDepthMm=Number.isFinite(c)?-c*1e3:0,this.contact.cutting=!1,!this.sim.state.cutting||s.jaw>.22||t){this.lastCut=null;return}if(this.cuttingBusy||this.tissue.busy)return;const h=this.tissue.graspMetrics?.displacement??this.grasp?.displacement??[0,0,0];if(this.lastCut&&l.distanceTo(this.lastCut.point)<55e-5&&new b(...h).distanceTo(this.lastCut.deformation)<55e-5)return;const u=this.toolDirection?.("right")?.clone()??new b(...s.position).sub(new b(...s.port)).normalize(),d=this.tissue.group.getWorldQuaternion(new Oe).invert();u.applyQuaternion(d).normalize();const f=l.clone().addScaledVector(u,-.008),g=this.tissue.contactDistance?.(f,.0032)??this.tissue.sampleDistance(f);if(!(c>.0032&&g>.0032)){this.lastCut={point:l.clone(),deformation:new b(...h)},this.cuttingBusy=!0,this.contact.cutting=!0;try{const _=this._generation,m=this.tissue.removedVolumeMm3;if(await this.tissue.cutSegment(f,l,.0024),_!==this._generation)return;this._reconcileDetachedGrasp(),this.tissue.removedVolumeMm3>m&&this.onEvent("cut",{volumeMm3:this.tissue.removedVolumeMm3})}finally{this.cuttingBusy=!1}}}get metrics(){return{...this.contact,grasp:Yi(this.grasp),deformation:this.tissue.graspMetrics,cuttingBusy:this.cuttingBusy,heldFragmentId:this.grasp?.kind==="fragment"?this.grasp.fragmentId:null}}}function Wu(i,e,t=.08){const n=i.findGraspPoint(wi(i,e),t);if(!n)return null;const s=(n.normal??new b(0,0,1)).clone().applyQuaternion(i.group.getWorldQuaternion(new Oe)).normalize();return{point:i.group.localToWorld(n.clone()),normal:s,fragmentId:n.fragmentId??null,reference:(i.toReferencePoint?.(n)??n).clone()}}const Xu=i=>i*i*(3-2*i),IM={left:[-.025,1.106,-.015],right:[.025,1.108,-.015]};function LM(i,{depth:e=.012,cutRadius:t=.0024}={}){if(!i.queryReferenceDistance||!i.metadata)return[];const n=i.metadata,s=Math.max(...n.spacing),r=Math.min(t*1.45,Math.max(.0025,s*1.8)),o=n.bounds??[n.origin.map(c=>c+s*2),n.origin.map((c,h)=>c+(n.dims[h]-3)*n.spacing[h])],a=c=>i.queryReferenceDistance(new b(...c)),l=[];for(let c=0;c<3;c++)for(const h of[-1,1]){const u=[0,1,2].filter(x=>x!==c),d=o[h>0?1:0][c],f=d-h*e,g=[];let _=1/0,m=-1/0,p=1/0,M=-1/0;for(let x=o[0][u[1]]-r;x<=o[1][u[1]]+r;x+=r)for(let A=o[0][u[0]]-r;A<=o[1][u[0]]+r;A+=r){const D=[0,0,0];D[c]=f,D[u[0]]=A,D[u[1]]=x;const U=a(D);U<=t&&(_=Math.min(_,A),m=Math.max(m,A),p=Math.min(p,x),M=Math.max(M,x)),U<0&&g.push({point:D,distance:U})}if(g.length<4||!Number.isFinite(_))continue;g.sort((x,A)=>x.distance-A.distance);let y=null,S=-1/0;for(const x of g.slice(0,24)){const A=[...x.point];let D=d+h*s*2;for(let U=D;h*(U-f)>=0;U-=h*s*.65){if(A[c]=U,a(A)<=0){let L=U,k=D;for(let F=0;F<12;F++)A[c]=(L+k)*.5,a(A)<=0?L=A[c]:k=A[c];A[c]=(L+k)*.5,h*A[c]>S&&(y=[...A],S=h*A[c]);break}D=U}}if(!y||h*(y[c]-f)<t*2+s)continue;const P=new b().setComponent(c,h),E=P.clone().applyQuaternion(i.group.getWorldQuaternion(new Oe)).normalize();_-=t*1.5,m+=t*1.5,p-=t*1.5,M+=t*1.5;const C=Math.max(2,Math.ceil((M-p)/r)+1),R=[];for(let x=0;x<C;x++){const A=p+(M-p)*x/(C-1);for(const D of x%2?[m,_]:[_,m]){const U=[0,0,0];U[c]=f,U[u[0]]=D,U[u[1]]=A,R.push(new b(...U))}}const v=R.slice(1).reduce((x,A,D)=>x+A.distanceTo(R[D]),0);v>2.8||l.push({axis:c,sign:h,plane:f,normal:P,worldNormal:E,referenceAnchor:new b(...y),path:R,cutRadius:t,rowSpacing:(M-p)/(C-1),length:v,score:v*(E.y<-.25?1.5:1)})}return l.sort((c,h)=>c.score-h.score)}class NM{constructor(e,t,n,{onMessage:s=()=>{},onChange:r=()=>{}}={}){Object.assign(this,{sim:e,tissue:t,interaction:n,onMessage:s,onChange:r}),this.active=!1,this.mode=null}stop(e="已结束自动操作，可继续手动控制"){this.active&&(this.active=!1,this.sim.setCutting(!1),this.interaction.lastCut=null,this.onChange(),e&&this.onMessage(e))}move(e,t){return this.sim.moveToolTo(e,t).limited?(this.stop("自动路径被另一器械挡住；请先移开另一器械，再重新就位"),!1):!0}approach(){const e=this.sim.state.selected;if(e==="scope"){this.onMessage("先选左钳或右剪，再进行表面就位");return}const t=this.sim.state.tools[e],n=Wu(this.tissue,t.position)??Wu(this.tissue,IM[e]);if(!n){this.onMessage("当前区域没有可接近的组织表面");return}this.sim.checkpoint("器械表面就位",this.interaction.snapshot()),e==="left"&&this.interaction.release(!0),this.sim.setCutting(!1),this.sim.setJaw(e,.7),this.mode="approach",this.active=!0,this.time=0,this.side=e,this.approachFragment=null,this.start=new b(...t.position),this.end=n.point.addScaledVector(n.normal,.001),this.onMessage(`${e==="left"?"左钳":"右剪"}正在贴近实际肝表面`),this.onChange()}approachSpecimen(){if(this.interaction.grasp)return this.onMessage("左钳正在夹持组织，请先按 V 松开后再接近标本"),!1;if(this.sim.state.paused)return this.onMessage("请先继续仿真，再接近标本"),!1;const e=this.tissue.fragmentMetrics?.pieces??[],t=new Set(e.filter(c=>!c.held).map(c=>c.id));if(!t.size)return this.onMessage(e.length?"独立组织块正被夹持，请先松开":"目前没有独立标本；请先完成真实切离"),!1;const n=this.sim.state.tools.left,s=this.tissue.group.worldToLocal(new b(...n.position)),r=this.tissue.findSpecimenGraspPoint?.(s,.35),o=r?.fragmentId!=null?this.tissue.getFragment?.(r.fragmentId):null;if(!o||!t.has(o.id))return this.onMessage("附近 35 cm 内未找到可接近的独立标本表面，不会退回母体"),!1;const a=(r.normal??new b(0,1,0)).clone().normalize(),l=o.quaternion.clone().invert();return this.sim.checkpoint("左钳接近独立标本",this.interaction.snapshot()),this.sim.select("left"),this.sim.setCutting(!1),this.sim.setJaw("left",.75),this.mode="approach",this.active=!0,this.time=0,this.side="left",this.start=new b(...n.position),this.approachFragment={id:o.id,anchor:r.clone().sub(o.position).applyQuaternion(l),normal:a.applyQuaternion(l)},this.end=this.tissue.group.localToWorld(r.clone()),this.onMessage("左钳正在接近最近的独立标本，标本移动时目标会随动；就位后按 C 重抓"),this.onChange(),!0}startExample(){if(this.active){this.stop();return}if(this.tissue.busy){this.onMessage("组织更新中，请稍候再开始示范");return}const e=LM(this.tissue);let t=null;for(const n of e)if(t=this._preparePlan(n),t)break;if(!t){this.onMessage("当前器官没有可安全到达的薄缘切离路径；请移开器械或重置完整器官后重试");return}Object.assign(this,t),this.sim.checkpoint("真实切离、夹持与移开示范",this.interaction.snapshot()),this.interaction.release(!0),this.sim.setCutting(!1),this.sim.setPaused(!1),this.sim.select("right"),this.sim.setScopeFollow(!0,"grasp"),this.leftStart=new b(...this.sim.state.tools.left.position),this.rightStart=new b(...this.sim.state.tools.right.position),this.sim.setJaw("left",.75),this.sim.setJaw("right",.85),this.active=!0,this.mode="example",this.time=0,this.phaseTime=0,this.phase="park",this.pathIndex=0,this.pathPoint=this.plan.path[0].clone(),this.rasterTravel=0,this.onMessage("切离示范：抓持器官薄缘 → 实际栅格切断基底 → 确认独立组织块后移开"),this.onChange()}_preparePlan(e){const t=f=>this.tissue.group.localToWorld(f.clone()),n=t(e.referenceAnchor),s=new b(0,1,0),r=n.clone().addScaledVector(e.worldNormal,6e-4),o=r.clone().addScaledVector(e.worldNormal,.022).addScaledVector(s,.012),a=o.clone().addScaledVector(e.worldNormal,.045).addScaledVector(s,.025),l=this.tissue.group.worldToLocal(o.clone()).sub(e.referenceAnchor),c=es({model:"local-flow",local:e.referenceAnchor.toArray(),displacement:l.toArray()}),h=f=>t(new b(...Ys(f.toArray(),c))),u=h(e.path[0]),d=[new b(...this.sim.state.tools.right.position),u.clone().addScaledVector(e.worldNormal,.035).addScaledVector(s,.018),u.clone().addScaledVector(e.worldNormal,.07).addScaledVector(s,.05)];for(const f of d)try{const g=new this.sim.constructor;g.restore(this.sim.snapshot()),g.setPaused(!1),g.setJaw("left",.75),g.setJaw("right",.85);let _=g.moveToolTo(f.toArray(),"right").limited||g.moveToolTo(r.toArray(),"left").limited;g.setJaw("left",0),_||=g.moveToolTo(o.toArray(),"left").limited||g.moveToolTo(u.toArray(),"right").limited,g.setJaw("right",0);for(const m of e.path)if(_||g.moveToolTo(h(m).toArray(),"right").limited){_=!0;break}if(!_)return{plan:e,leftRest:r,leftLift:o,leftAway:a,rightStandby:f}}catch{continue}return null}_phase(e,t){this.phase=e,this.phaseTime=0,t&&this.onMessage(t),this.onChange()}_displayReference(e){return this.tissue.group.localToWorld((this.tissue.deformPoint?.(e)??e).clone())}_beginFragmentMove(){this.sim.setCutting(!1),this.rightRetractStart=new b(...this.sim.state.tools.right.position);const e=new b(...this.sim.state.tools.left.position),t=new b(0,1,0),n=new b(...this.sim.state.tools.right.port).sub(this.rightRetractStart).normalize(),s=[.05,.08,.03,.12].map(a=>this.rightRetractStart.clone().addScaledVector(n,a)),r=[this.leftAway,e.clone().addScaledVector(this.plan.worldNormal,.02).addScaledVector(t,.05),e.clone().addScaledVector(this.plan.worldNormal,.06).addScaledVector(t,.045)];let o=null;for(const a of s){for(const l of r){const c=new this.sim.constructor;if(c.restore(this.sim.snapshot()),c.setPaused(!1),!c.moveToolTo(a.toArray(),"right").limited&&(c.setJaw("right",.75),!(c.state.tools.right.jaw<.7||c.moveToolTo(l.toArray(),"left").limited))){o={rightTarget:a,leftTarget:l};break}}if(o)break}if(!o){this.stop("独立组织块已切离并仍由左钳夹持，但没有通过双器械防碰撞的自动移开路径，请手动退出右剪");return}this.rightRetractEnd=o.rightTarget,this.leftAway=o.leftTarget,this._phase("retract","基底已真正断开：独立组织块仍在左钳上，先退出右剪再移开")}update(e){if(!this.active||this.sim.state.paused)return;if(this.time+=e,this.mode==="approach"){if(this.approachFragment){const n=this.tissue.getFragment?.(this.approachFragment.id);if(!n||n.held){this.stop("目标标本已不存在或已被夹持，接近操作已停止");return}const s=this.approachFragment.normal.clone().applyQuaternion(n.quaternion).normalize();this.end=this.tissue.group.localToWorld(this.approachFragment.anchor.clone().applyQuaternion(n.quaternion).add(n.position).addScaledVector(s,7e-4))}if(!this.move(this.start.clone().lerp(this.end,Xu(Math.min(1,this.time/1.1))).toArray(),this.side))return;this.time>=1.1&&(this.active=!1,this.onMessage(this.approachFragment?"已接近独立标本表面：按 C 闭合重抓，随后可移动或旋转":"已贴近组织表面：C 闭合，E 抬起；右剪需开启剪切"),this.onChange());return}if(["close-right","raster","wait-separation"].includes(this.phase)&&this.interaction.grasp?.kind==="fragment"){this._beginFragmentMove();return}this.phaseTime+=e;const t=n=>Xu(Math.min(1,this.phaseTime/n));if(this.phase==="park"){if(!this.move(this.rightStart.clone().lerp(this.rightStandby,t(1.1)).toArray(),"right"))return;this.phaseTime>=1.1&&this._phase("approach-left")}else if(this.phase==="approach-left"){if(!this.move(this.leftStart.clone().lerp(this.leftRest,t(1.2)).toArray(),"left"))return;this.phaseTime>=1.2&&this._phase("close-left","左钳正在夹住实际薄缘表面")}else if(this.phase==="close-left")this.sim.setJaw("left",.75*(1-t(.6))),this.phaseTime>=.7&&this.interaction.grasp?.kind==="tissue"?this._phase("lift","左钳牵拉薄缘，右剪将完整扫过其基底"):this.phaseTime>1.3&&this.stop("未成功抓住附着组织，示范已停止；请重置或重新表面就位");else if(this.phase==="lift"){if(!this.move(this.leftRest.clone().lerp(this.leftLift,t(1.5)).toArray(),"left"))return;this.phaseTime>=1.5&&(this.rightBeforeCut=new b(...this.sim.state.tools.right.position),this._phase("approach-cut"))}else if(this.phase==="approach-cut"){if(!this.move(this.rightBeforeCut.clone().lerp(this._displayReference(this.plan.path[0]),t(1.2)).toArray(),"right"))return;this.phaseTime>=1.2&&(this.sim.setCutting(!0),this._phase("close-right","右剪闭合，实际扫切完整基底平面；不会用模型替换制造组织块"))}else if(this.phase==="close-right")this.sim.setJaw("right",.85*(1-t(.6))),this.phaseTime>=.7&&this._phase("raster");else if(this.phase==="raster"){if(this.tissue.busy||this.interaction.cuttingBusy)return;const n=this.plan.path[this.pathIndex+1];if(!n){this.sim.setCutting(!1),this.sim.setJaw("right",.7),this._phase("wait-separation","基底扫描完成，正在确认真实体素连通性");return}const s=this.pathPoint.distanceTo(n),r=Math.min(85e-5,.028*e,s);if(s>1e-10&&this.pathPoint.lerp(n,r/s),this.rasterTravel+=r,!this.move(this._displayReference(this.pathPoint).toArray(),"right"))return;s<=r+1e-10&&this.pathIndex++}else if(this.phase==="wait-separation")!this.tissue.busy&&!this.interaction.cuttingBusy&&this.phaseTime>2?this.stop("扫描后该处组织仍相连，未生成独立块；示范已停止，可继续补切或撤销"):this.phaseTime>12&&this.stop("组织拓扑更新尚未完成，未宣称切离成功；请等待后检查");else if(this.phase==="retract"){if(!this.move(this.rightRetractStart.clone().lerp(this.rightRetractEnd,t(1)).toArray(),"right"))return;this.phaseTime>=1&&(this.sim.setJaw("right",.75),this.fragmentMoveStart=new b(...this.sim.state.tools.left.position),this._demoRoll=0,this._phase("move-fragment","左钳正在搬走并旋转真实切离块，母体已独立回弹"))}else if(this.phase==="move-fragment"){const n=t(2.2);if(!this.move(this.fragmentMoveStart.clone().lerp(this.leftAway,n).toArray(),"left"))return;const s=n*Math.PI*.65;this.sim.adjustWrist(2,s-this._demoRoll,"left"),this._demoRoll=s,this.phaseTime>=2.2&&(this.sim.select("left"),this.stop("切离确认完成：左钳夹持的独立组织块已移开并旋转，V 可松开放下；可撤销或重置"))}}}const ju=new WeakMap,Fs=i=>Array.isArray(i)&&i.length===3&&i.every(Number.isFinite),qu=(i,e)=>i.map((t,n)=>(t+e[n])*.5),Ri=i=>new b().fromArray(i);function UM(i,e){let t=ju.get(i);t||(t=new WeakMap,ju.set(i,t));let n=t.get(e);return n||(n={queriedAt:-1/0,surface:null,lastSpecimenId:null,epoch:e._epoch,scopeReference:null},t.set(e,n)),n}function FM(i){const e=i.metadata?.bounds;if(!Array.isArray(e)||e.length!==2||!e.every(Fs)||e[0].some((s,r)=>s>e[1][r]))return null;const t=new Gn(Ri(e[0]),Ri(e[1])),n=i.graspMetrics?.displacement;return Fs(n)&&(t.min.add(Ri(n.map(s=>Math.min(0,s)))),t.max.add(Ri(n.map(s=>Math.max(0,s))))),{local:t,world:t.clone().applyMatrix4(i.group.matrixWorld)}}function OM(i,e,t){const n=i.fragmentMetrics?.pieces??[],s=e?.grasp?.fragmentId,r=n.find(c=>s!=null&&c.id===s)||n.find(c=>c.held)||n.find(c=>c.id===t.lastSpecimenId)||n.at(-1);if(!r)return t.lastSpecimenId=null,null;const o=i.getFragment?.(r.id),a=o?.mesh;if(!a?.geometry||(a.geometry.boundingSphere||a.geometry.computeBoundingSphere(),!a.geometry.boundingSphere))return null;a.updateWorldMatrix(!0,!1);const l=a.geometry.boundingSphere.clone().applyMatrix4(a.matrixWorld);return!Number.isFinite(l.radius)||l.radius<0||!Fs(l.center.toArray())?null:(t.lastSpecimenId=r.id,{id:r.id,position:l.center.toArray(),radius:l.radius})}function kM(i,e,t,n=globalThis.performance?.now?.()??Date.now()){if(!i?.state?.scope||!e?.group)throw new TypeError("Scope context requires a simulation and tissue group.");if(!Number.isFinite(n))throw new TypeError("Scope context timestamp must be finite milliseconds.");const s=UM(i,e),r=i.state,o=r.scope;e.group.updateWorldMatrix(!0,!1),(s.scopeReference!==o||s.epoch!==e._epoch)&&(s.scopeReference=o,s.epoch=e._epoch,s.queriedAt=-1/0,s.surface=Fs(o.fieldAnchor)?e.group.worldToLocal(Ri(o.fieldAnchor)):null,s.lastSpecimenId=o.heldSpecimen?.id??null);const a=FM(e),l=t?.grasp?[...r.tools.left.position]:null,c=!!(r.cutting||t?.grasp&&r.activeTool==="right");let h;if(o.followMode==="grasp"&&l?h=c?qu(l,r.tools.right.position):l:o.followMode==="midpoint"||o.followMode==="grasp"?h=qu(r.tools.left.position,r.tools.right.position):h=[...r.tools[r.activeTool].position],!s.surface&&Fs(o.fieldAnchor)&&(s.surface=e.group.worldToLocal(Ri(o.fieldAnchor))),(n<s.queriedAt||n-s.queriedAt>=150||s.epoch!==e._epoch)&&e.ready!==!1&&typeof e.findParentSurfacePoint=="function"){s.queriedAt=n,s.epoch=e._epoch;const d=e.group.worldToLocal(Ri(h));a&&a.local.clampPoint(d,d);const f=e.findParentSurfacePoint(d,.18),g=f?.isVector3?f.toArray():f;Fs(g)&&(s.surface=Ri(g))}return{graspTarget:l,operating:c,surfaceTarget:s.surface?e.group.localToWorld(s.surface.clone()).toArray():null,organBounds:a?{min:a.world.min.toArray(),max:a.world.max.toArray()}:null,heldSpecimen:OM(e,t,s)}}const BM={left:"左",right:"右"};function Yu(i,e){const t=BM[i]||"";return e?.part==="jaw"?t+(i==="right"?"剪口":"钳口"):e?.part==="wrist"?t+"腕部":e?.part==="shaft"?t+(e.section==="outside"?"体外杆身":e.section==="inside"?"体内杆身":"杆身"):t+"器械"}function zM(i,e="endo"){const t=i?.blocked===!0,n=i?.contact===!0;if(!t&&!n)return{blocked:!1,contact:!1,status:"双器械防碰撞",notice:"",detail:""};const s=i?.pair,r=Yu("left",s?.left)+"与"+Yu("right",s?.right),o=s?.left?.section==="outside"||s?.right?.section==="outside",a=Number.isFinite(i?.clearance)?Math.max(0,i.clearance)*1e3:null,l=r+(t?"接触 · 已阻止靠近":"近接触"),c=t?r+"接触，已阻止继续靠近；反向移动可离开。"+(o&&e==="endo"?"体外接触请切系统总览查看。":""):"",h=l+(a===null?"":"；估算间隙 "+a.toFixed(2)+" mm");return{blocked:t,contact:n,status:l,notice:c,detail:h}}function VM({canvas:i,sim:e,enabled:t=()=>!0,onBegin:n=()=>{},onChange:s=()=>{},onFocus:r=()=>{},now:o=()=>performance.now()}){let a=null,l=-1/0;const c=[],h=(f,g,_)=>{i.addEventListener(f,g,_),c.push([f,g,_])},u=()=>t()&&!e.state.paused,d=()=>{const f=a?.id;a=null,l=-1/0,f!==void 0&&i.hasPointerCapture?.(f)&&i.releasePointerCapture(f)};h("pointerdown",f=>{f.target!==i||f.button!==0||!u()||e.state.scope.follow||(f.preventDefault(),r(),a={id:f.pointerId,x:f.clientX,y:f.clientY,started:!1},i.setPointerCapture(f.pointerId))}),h("pointermove",f=>{if(!a||a.id!==f.pointerId)return;if(!u()||e.state.scope.follow){d();return}const g=f.clientX-a.x,_=f.clientY-a.y;if(!g&&!_||!a.started&&Math.hypot(g,_)<2)return;f.preventDefault(),a.started||(n("内窥镜鼠标转向"),a.started=!0);const m=(e.state.scope.fov??55)*Math.PI/180/Math.max(1,i.getBoundingClientRect().height);e.navigateScope(g*m,_*m),a.x=f.clientX,a.y=f.clientY,s()});for(const f of["pointerup","pointercancel","lostpointercapture"])h(f,g=>{a?.id===g.pointerId&&d()});return h("wheel",f=>{if(f.target!==i||!u()||!f.deltaY)return;f.preventDefault(),r();const g=o(),_=e.state.scope.fov;if(f.deltaY<0&&_<=kt.minimumFov||f.deltaY>0&&_>=kt.maximumFov)return;g-l>250&&n("内窥镜光学变焦"),l=g;const m=f.deltaMode===1?16:f.deltaMode===2?i.getBoundingClientRect().height:1;e.zoomScope(f.deltaY*m*.0015)&&s()},{passive:!1}),{cancel:d,dispose(){d();for(const[f,g,_]of c)i.removeEventListener(f,g,_)}}}const Q=i=>document.getElementById(i),HM="./",Os=new Set,ks=new Set,GM=new Set(["KeyW","KeyA","KeyS","KeyD","KeyQ","KeyE","KeyZ","KeyX","KeyC","KeyV","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","BracketLeft","BracketRight","Space","ShiftLeft","ShiftRight"]);let Pe,je,Ae,St,Tt,aa,Hn=!1,Dr="normal",mc=performance.now(),al=0,ll=0,cl=0,Bo=mc,Ku=0,Jo=0,gt=!1,rf,zo=[],is=[];const Vo=[],WM=3e3;let $u,gc=0;const Es={};function Qt(i){Q("toast").textContent=i,Q("toast").hidden=!1,clearTimeout($u),$u=setTimeout(()=>Q("toast").hidden=!0,3e3)}function of(){if(!Ae||!Pe)return;const i=zM(Ae.state.collision,Pe.mode),e=Q("collision-status"),t=i.blocked?"blocked":i.contact?"contact":"clear";e.textContent!==i.status&&(e.textContent=i.status),e.title!==i.detail&&(e.title=i.detail),e.dataset.collision!==t&&(e.dataset.collision=t);let n=Q("collision-notice");n||(n=document.createElement("div"),n.id="collision-notice",n.className="collision-notice",n.setAttribute("role","status"),n.setAttribute("aria-live","polite"),Q("stage").append(n)),n.textContent!==i.notice&&(n.textContent=i.notice),n.hidden=!i.blocked}function Ir(i,e={}){Vo.push({t:Number((Ae?.state.elapsed||0).toFixed(3)),type:i,...e}),Vo.length>WM&&Vo.shift()}function zt(){Os.clear(),ks.clear(),aa?.cancel(),document.querySelectorAll(".held").forEach(i=>i.classList.remove("held")),St&&(St.lastCut=null)}function xr(i){Tt?.stop(""),zt(),Ae.select(i),jt(),Q("stage").focus({preventScroll:!0})}function yr(i){zt(),Ae.setPaused(i),jt()}function Zu(){zt(),Ae.setScopeFollow(!Ae.state.scope.follow),Qt(Ae.state.scope.follow?"内窥镜跟随当前控制目标":"自动跟随已关闭：拖拽转向，滚轮光学变焦；W/S 或 [ ] 控制进退"),jt()}function _c(){if(Ae.state.selected==="scope"){Qt("请选择左钳或右剪后操作");return}const i=!Ae.state.cutting;Tt?.stop(""),i&&Ae.checkpoint("启用剪切",St.snapshot()),Ae.setCutting(i),Qt(i?"右剪已启用：接触表面并闭合切除；左钳可同时保持牵拉":"剪切已关闭"),St.lastCut=null,jt()}function bs(i){aa?.cancel(),Pe.setMode(i||(Pe.mode==="endo"?"overview":"endo")),Q("view-endo").classList.toggle("active",Pe.mode==="endo"),Q("view-overview").classList.toggle("active",Pe.mode==="overview"),Q("endo-overlay").hidden=Pe.mode!=="endo",Q("mini-title").textContent=Pe.mode==="endo"?"系统总览":"内窥镜 LIVE",Q("mini-caption").textContent=Pe.mode==="endo"?"UNITREE G1 + 胸部持镜概念集成":"同一三维场景 · 实时内窥镜",Q("stage").focus({preventScroll:!0})}async function Cs(i=!1){if(!(gt||!Hn)){if(je.busy){Qt("正在完成切面更新，请稍后撤销或重做");return}Tt?.stop(""),gt=!0,zt();try{const e=St.snapshot(),t=i?Ae.redo(e):Ae.undo(e);if(!t){Qt(i?"没有可重做的操作":"没有可撤销的操作");return}Pe.releaseKinematicGuard(),t.hasExtraData&&await St.restore(t.extraData),Ae.setCutting(!1),Qt((i?"已重做：":"已撤销：")+t.label),Ir(i?"redo":"undo")}catch(e){Yc(e)}finally{gt=!1,jt()}}}async function vc(){if(!(gt||!Hn)){Tt?.stop(""),gt=!0,zt();try{St.release(!0),await je.reset(),Ae.reset(),Pe.releaseKinematicGuard(),Ae.select("right"),Pe.home(),Ir("reset"),Qt("完整器官、器械与内窥镜已恢复")}catch(i){Yc(i)}finally{gt=!1,jt()}}}function Yc(i){is.push(String(i.message||i)),console.error(i),Q("system-status").textContent="需要检查",Qt("操作未完成："+(i.message||i))}function jt(){if(!Ae)return;const i=Ae.state,e=i.tools[i.selected]||i.scope,t=e.position,n={left:"左手 · 持针钳 / 牵拉",right:"右手 · 精细分离剪",scope:"胸部 · 内窥镜"},s=[0,1.035,0];["x","y","z"].forEach((u,d)=>{Q("pos-"+u).innerHTML=((t[d]-s[d])*1e3).toFixed(1)+"<small>mm</small>"}),Q("active-tool").textContent={left:"LEFT / L",right:"RIGHT / R",scope:"SCOPE / C"}[i.selected],Q("selected-badge").textContent=n[i.selected],document.querySelectorAll("[data-select]").forEach(u=>{const d=u.dataset.select===i.selected;u.classList.toggle("selected",d),u.setAttribute("aria-pressed",String(d))}),Q("jaw-value").textContent=i.selected==="scope"?"—":Math.round(e.jaw*100)+"%",Q("scope-depth").textContent=(i.scope.depth*1e3).toFixed(1)+" mm",Q("follow").setAttribute("aria-checked",String(i.scope.follow)),Q("follow").querySelector(".switch").classList.toggle("on",i.scope.follow),Q("cut-mode").setAttribute("aria-checked",String(i.cutting)),Q("cut-mode").querySelector(".switch").classList.toggle("on",i.cutting),Q("cut-mode").classList.toggle("active-cut",i.cutting),Q("scope-summary").textContent=i.scope.follow?"RCM 持镜 · "+{active:"尖端跟随",midpoint:"双器械居中",grasp:"协作区域跟随"}[i.scope.followMode]:"RCM 持镜 · 手动控制";for(const u of["left","right"])Q(u+"-summary").textContent=(i.selected===u?"已选择 · ":"待命 · ")+(i.tools[u].jaw<.16?u==="left"&&St?.grasp?St.grasp.fragmentId?"已夹持 · 独立组织块":"已抓持 · 牵拉中":"钳口闭合":"钳口 "+Math.round(i.tools[u].jaw*100)+"%");Q("view-status").textContent=Pe.mode==="endo"?"内窥镜 · "+(i.scope.follow?"器械自动跟随":"手动镜头"):"系统总览 · 鼠标拖动观察",Q("removed").innerHTML=(je?.removedVolumeMm3||0).toFixed(1)+" <small>mm³</small>",Q("removed-bar").style.width=Math.min(100,(je?.removedVolumeMm3||0)/(je?.totalVolumeMm3||1)*100)+"%",Q("tissue-status").textContent=(je?.removedVolumeMm3||0)>0?"已切除组织":"完整",Q("undo").disabled=!Ae.canUndo||gt||je?.busy,Q("redo").disabled=!Ae.canRedo||gt||je?.busy,Q("reset").disabled=gt,Q("view-home").disabled=gt||Pe.mode==="endo"&&i.paused,Q("pause-overlay").hidden=!i.paused,Q("pause").innerHTML=(i.paused?"▶ 继续仿真":"Ⅱ 暂停仿真")+" <kbd>P</kbd>",Q("run-status").textContent=i.paused?"Ⅱ 已暂停":"● 运行中";const r=Math.floor(i.elapsed);Q("session-time").textContent=String(Math.floor(r/60)).padStart(2,"0")+":"+String(r%60).padStart(2,"0"),Q("clutch-indicator").classList.toggle("active",Os.has("Space")||ks.has("Space")),Q("system-status").textContent=is.length?"需要检查":gt?"恢复组织中":je?.busy?"更新组织":"系统就绪",document.querySelectorAll('[data-hold="KeyC"],[data-hold="KeyV"]').forEach(u=>u.disabled=i.selected==="scope");const o=St?.contact,a=je?.graspMetrics;Q("left-contact").textContent=St?.grasp?St.grasp.fragmentId?"已夹持独立组织块 · 可抬起移开 / V 释放":"已抓持 · 牵拉 "+(a?.displacementMm||0).toFixed(1)+" mm":o?.leftFragmentId?"标本接触 · C 夹持":o?.left?"包膜接触 · C 抓持":"未接触 · 可表面就位",Q("right-contact").textContent=o?.cutting?"切除中 · 三维缺损更新":o?.right?i.cutting?"组织接触 · 闭合剪切":"组织接触 · B 启用剪切":"未接触 · 可表面就位",Q("roll-value").textContent=i.selected==="scope"?(i.scope.roll*180/Math.PI).toFixed(1)+"°":(e.wrist[2]*180/Math.PI).toFixed(1)+"°",Q("follow-mode").value=i.scope.followMode,Q("scope-content").value=i.scope.viewMode,Q("demo").textContent=Tt?.active?"■ 停止自动操作":"▶ 切离与移开示范",Q("demo").disabled=gt||!Tt?.active&&je?.busy,Q("approach").disabled=gt||je?.busy||i.selected==="scope"||i.paused,of(),Q("connection-status").textContent=Pe.conceptDecoupled?"概念主从联接":"双臂器械联接";const l=je?.fragmentMetrics;Q("specimen-count").textContent=(l?.count||0)+" 块",Q("specimen-volume").textContent=((l?.volumeMm3||0)/1e3).toFixed(2)+" cm³",Q("specimen-state").textContent=l?.pieces.some(u=>u.held)?"左钳夹持 · 独立搬运":l?.count?"已切离 · C 可再次夹持":"组织桥完全切断后才会分离",l?.count&&(Q("tissue-status").textContent="已分离 "+l.count+" 块"),Q("approach-specimen").disabled=gt||je?.busy||!l?.count||l.pieces.some(u=>u.held)||i.paused;const c=new b(...i.tools[i.activeTool].position).project(Pe.endoCamera);if(Q("stage").dataset.telemetry=JSON.stringify({state:Ae.snapshot().state,fps:Jo,errors:is,removedVolumeMm3:je?.removedVolumeMm3,fragments:je?.fragmentMetrics,armErrors:Pe.armErrors,scopeArmError:Pe.assemblies?.scopeArmError,toolRCMErrors:Pe.assemblies?.toolRCMErrors,interaction:St?.metrics,demo:Tt?.active,demoPhase:Tt?.phase,tissueBusy:je?.busy,cutCount:je?._cuts.length,viewMode:Pe.mode,precision:Dr,scopeFeed:Pe.scopeFeed.resolution,scopeViewAspect:Ae.viewAspect,scopeTcpNdc:c.toArray(),scopeFov:Pe.endoCamera.fov,drawCalls:Pe.renderer.info.render.calls,triangles:Pe.renderer.info.render.triangles,connectionModes:Pe.assemblies?.connectionModes,timings:Es}),Pe.mode==="endo"){const u=new b(...i.tools[i.activeTool].position).applyMatrix4(Pe.endoCamera.matrixWorldInverse),d=.01*Q("stage").clientHeight/(2*Math.tan(ni.degToRad(Pe.endoCamera.fov*.5))*Math.max(.01,-u.z));Q("lens-scale").style.width=d+"px"}const h=document.querySelector(".lens-label");h&&(h.textContent="LAPAROSCOPE · "+(i.scope.fov??55).toFixed(0)+"° FOV")}function XM(){document.querySelectorAll("[data-select]").forEach(i=>i.onclick=()=>xr(i.dataset.select)),document.querySelectorAll("[data-speed]").forEach(i=>i.onclick=()=>{Dr=i.dataset.speed,document.querySelectorAll("[data-speed]").forEach(e=>e.classList.toggle("active",e===i)),Qt(Dr==="fine"?"精细模式：降低位移与旋转速度":"标准速度模式")});for(const i of document.querySelectorAll("[data-hold]")){let e=0,t=!1;const n=()=>!Hn||gt||t?!1:(Tt?.stop(""),e=gc,t=!0,ks.add(i.dataset.hold),i.classList.add("held"),!0),s=r=>{const o=t&&e===gc&&["pointerup","keyup"].includes(r.type);if(t=!1,ks.delete(i.dataset.hold),i.classList.remove("held"),o&&!gt&&!Ae.state.paused){const a=new Set([i.dataset.hold]);Dr==="fine"&&a.add("ShiftLeft"),Ae.update(.05,a),Ae.update(1e-9,new Set),jt()}};i.addEventListener("pointerdown",r=>{r.preventDefault(),n()&&i.setPointerCapture(r.pointerId)}),i.addEventListener("pointerup",s),i.addEventListener("pointercancel",s),i.addEventListener("lostpointercapture",s),i.addEventListener("keydown",r=>{r.code==="Enter"&&(r.preventDefault(),n())}),i.addEventListener("keyup",r=>{r.code==="Enter"&&s(r)}),i.addEventListener("blur",s)}Q("pause").onclick=()=>yr(!Ae.state.paused),Q("resume").onclick=()=>yr(!1),Q("undo").onclick=()=>Cs(),Q("redo").onclick=()=>Cs(!0),Q("reset").onclick=vc,Q("follow").onclick=Zu,Q("cut-mode").onclick=_c,Q("follow-mode").onchange=i=>{zt(),Ae.setScopeFollow(!0,i.target.value),jt()},Q("scope-content").onchange=i=>{zt(),Ae.setScopeViewMode(i.target.value),Ae.setScopeFollow(!0),Qt(i.target.value==="specimen"?"按真实标本大小调整观察距离；中心仍跟随所选控制目标":"局部术野距离；中心跟随所选控制目标"),jt()},Q("demo").onclick=()=>{zt(),Tt.startExample(),bs("endo"),jt()},Q("approach").onclick=()=>{zt(),Tt.stop(""),Tt.approach(),jt()},Q("approach-specimen").onclick=()=>{zt(),Tt.stop(""),Tt.approachSpecimen(),bs("endo"),jt()},Q("view-endo").onclick=()=>bs("endo"),Q("view-overview").onclick=()=>bs("overview"),Q("swap-view").onclick=()=>bs(),Q("view-home").onclick=()=>{gt||Pe.mode==="endo"&&Ae.state.paused||(zt(),Pe.mode==="endo"?(Ae.checkpoint("内窥镜视角复位",St.snapshot()),Ae.homeScopeView()):Pe.home(),Qt("观察视角已复位"))},Q("fullscreen").onclick=async()=>{try{document.fullscreenElement?await document.exitFullscreen():await Q("stage").requestFullscreen()}catch{Qt("当前浏览器不支持全屏，请使用浏览器全屏模式")}},Q("help").onclick=()=>{Tt?.stop(""),zt(),Q("help-dialog").showModal()},Q("about").onclick=()=>{Tt?.stop(""),zt(),Q("about-dialog").showModal()},document.querySelectorAll("dialog [data-close]").forEach(i=>i.onclick=()=>i.closest("dialog").close()),document.querySelectorAll("dialog").forEach(i=>i.addEventListener("click",e=>{e.target===i&&i.close()})),Q("export").onclick=()=>{const i={app:"MIRA surgical teleoperation demo",version:3,exportedAt:new Date().toISOString(),units:"metres/radians/seconds",tissueVoxelMm:je.voxelMm,removedVolumeMm3:je.removedVolumeMm3,state:Ae.snapshot(),interaction:St.snapshot(),events:Vo},e=document.createElement("a");e.href=URL.createObjectURL(new Blob([JSON.stringify(i,null,2)],{type:"application/json"})),e.download="mira-session-"+new Date().toISOString().replace(/[:.]/g,"-")+".json",e.click(),setTimeout(()=>URL.revokeObjectURL(e.href),1e3),Qt("操作记录已导出")},window.addEventListener("keydown",i=>{if(!Hn||i.target.closest("input,textarea,select,[contenteditable=true]")||document.querySelector("dialog[open]"))return;if(i.ctrlKey||i.metaKey){if(i.code==="KeyZ"){i.preventDefault(),i.repeat||Cs(i.shiftKey);return}if(i.code==="KeyY"){i.preventDefault(),i.repeat||Cs(!0);return}return}if(GM.has(i.code)){i.preventDefault(),i.code!=="Space"&&!i.code.startsWith("Shift")&&Tt?.stop(""),gt||Os.add(i.code);return}const e={Digit1:()=>xr("left"),Digit2:()=>xr("right"),Digit3:()=>xr("scope"),KeyP:()=>yr(!Ae.state.paused),KeyF:Zu,KeyB:_c,KeyR:vc,Tab:()=>bs(),Slash:()=>{Tt?.stop(""),Q("help-dialog").showModal(),zt()}};e[i.code]&&(i.preventDefault(),i.repeat||e[i.code]())}),window.addEventListener("keyup",i=>{Os.delete(i.code)}),window.addEventListener("blur",zt),document.addEventListener("visibilitychange",()=>{zt(),document.hidden&&Hn&&yr(!0)}),Q("scene").addEventListener("webglcontextlost",i=>{i.preventDefault(),zt(),Ae.setPaused(!0),Q("loading").hidden=!1,Q("loading-detail").textContent="显卡上下文已中断，请刷新页面重新加载。"}),aa=VM({canvas:Q("scene"),sim:Ae,enabled:()=>Hn&&!gt&&Pe.mode==="endo"&&!Os.has("Space")&&!ks.has("Space")&&!document.querySelector("dialog[open]"),onBegin:i=>{Tt?.stop(""),Ae.checkpoint(i,St.snapshot())},onFocus:()=>Q("stage").focus({preventScroll:!0}),onChange:()=>{af(),jt()}})}function jM(i,e){!Hn||gt||St.update(e,{clutched:i.has("Space")}).catch(Yc)}function af(){const i=Ae.state.scope,e=new b(...i.port),t=new b(...i.position).sub(e).normalize();let n=.018;for(let s=0;s<=8;s++){const r=.018+(i.depth-.018)*s/8,o=je.group.worldToLocal(e.clone().addScaledVector(t,r));if(je.contactDistance(o,.005)<.005){let a=n,l=r;for(let c=0;c<8;c++){const h=(a+l)*.5,u=je.group.worldToLocal(e.clone().addScaledVector(t,h));je.contactDistance(u,.005)<.005?l=h:a=h}i.depth=a,i.position=e.addScaledVector(t,a).toArray();return}n=r}}function lf(i){rf=requestAnimationFrame(lf);const e=Math.max(0,Math.min(.05,(i-mc)/1e3));if(mc=i,!Hn)return;const t=performance.now(),n=new Set([...Os,...ks]);Dr==="fine"&&n.add("ShiftLeft"),gt&&n.clear(),gt||Ae.setScopeContext({...kM(Ae,je,St,i),viewAspect:Pe.scopeAspect}),!gt&&!n.has("Space")&&Tt.update(e),gt||Ae.update(e,n),gc++;const s=performance.now();if(Es.control=s-t,!Ae.state.paused&&!gt&&af(),Es.clearance=performance.now()-s,of(),i>=al){const r=Math.min(.05,ll?(i-ll)/1e3:e),o=performance.now();Pe.update(Ae.state,r),ll=i;const a=performance.now();jM(n,r);const l=performance.now();Pe.render(i),Es.scene=a-o,Es.interaction=l-a,Es.render=performance.now()-l,cl++,al=Math.max(al+1e3/60,i-1e3/60)}zo.push(performance.now()-t),zo.length>600&&zo.shift(),i-Bo>1e3&&(Jo=cl*1e3/(i-Bo),Q("fps").textContent=Jo.toFixed(0)+" FPS",cl=0,Bo=i),i-Ku>100&&(Ku=i,jt())}async function qM(){try{Pe=new aM(Q("scene"),Q("stage"),Q("mini-view")),je=new PM,Ae=new qx({getExtraData:()=>St?.snapshot()??je.snapshot(),onEvent:i=>{i.type!=="history"&&Ir(i.type)}}),Ae.select("right"),St=new DM(Ae,je,{onMessage:Qt,onEvent:Ir,toolDirection:i=>Pe.assemblies?.toolDirections?.[i],toolQuaternion:i=>Pe.assemblies?.tools[i]?.tipQuaternion}),Tt=new NM(Ae,je,St,{onMessage:Qt,onChange:()=>{Hn&&jt()}}),Q("loading-detail").textContent="加载 G1 官方模型与真实解剖体积…",await Promise.all([Pe.loadRobot(),je.load(HM+"assets/liver-volume")]),Pe.addTissue(je),je.group.rotation.x=-Math.PI/2,je.group.updateMatrixWorld(!0),await Pe.loadAnatomy?.(),Q("model-details").innerHTML="<p><strong>宇树 G1：</strong>官方 29 自由度 CAD，保留原始尺寸与关节层级，双臂由逆运动学驱动。原始固定手型通过掌托、绑带和球接轴夹固定器械；夹具为概念设计。器械自由移动不受机械臂可达范围阻挡；超出真实手臂可达范围时显示概念主从联接。</p><p><strong>肝胆解剖：</strong>BodyParts3D 公开成人肝脏、胆囊与肝总动脉，同源坐标注册。体积间距 "+je.voxelMm+" mm；包膜与细小纹理由程序材质表现，并非患者 CT 或组织学数据。</p><p><strong>牵拉与切除：</strong>抓持实际表面，三维顶点、法线和阴影随动。剪切贯通并切断全部组织桥后，按体积连通性提取独立三维组织块，可夹持、旋转、移开、释放和再次夹取；切面及两侧封闭表面均保留。撤销同时恢复切口、组织块和夹持。牵拉为几何近似，松手组织块采用简化重力与表面接触。</p><p><strong>器械与持镜：</strong>真实 dVRK 持针钳、弯剪和内窥镜 CAD。G1 胸部 Z1 与快换耦合器为概念集成，非官方医疗配置。旋转连续多圈、无工作空间围栏，仅双器械防碰撞；这也意味着并未模拟真机电缆/关节行程。</p><p><strong>镜头：</strong>当前器械模式精确跟随正在操作的 CAD 尖端，双器械中心和牵拉协作区按显式选择工作。小幅移动即时居中，大幅切换限速转向，实体内窥镜与成像光轴一致；自动进退维持约 65 mm 观察距离，标本模式按真实包围体调整距离。关闭自动后可在主画面拖拽转向；滚轮独立调整 25–80° 光学视角，W/S 或 [ ] 控制实体进退。手动进退保留距离偏置，肝表面提供防穿透。术野与室内实体屏共用同一帧实时图像。</p>";for(let i=0;i<20;i++)Pe.update(Ae.state,.05);XM(),Hn=!0,document.querySelectorAll("button").forEach(i=>i.disabled=!1),Bo=performance.now(),Q("loading").hidden=!0,jt(),Pe.update(Ae.state,0),Pe.render(),Ir("ready"),window.__mira={get state(){return Ae.snapshot()},get metrics(){return{fps:Jo,frameMs:zo.slice(),errors:[...is],removedVolumeMm3:je.removedVolumeMm3,totalVolumeMm3:je.totalVolumeMm3,voxelMm:je.voxelMm,drawCalls:Pe.renderer.info.render.calls,triangles:Pe.renderer.info.render.triangles,armErrors:{...Pe.armErrors},interaction:St.metrics}},select:xr,reset:vc,undo:Cs,redo:()=>Cs(!0),setPaused:yr,toggleCut:_c,sim:Ae,tissue:je,view:Pe,interactionController:St,demo:Tt,ready:!0}}catch(i){console.error(i),is.push(String(i)),Q("loading-detail").textContent="加载未完成："+i.message;const e=document.createElement("div");e.className="error-actions";const t=document.createElement("button");t.textContent="重新加载",t.onclick=()=>location.reload(),e.append(t),Q("loading").append(e)}}window.addEventListener("error",i=>is.push(i.message));window.addEventListener("unhandledrejection",i=>is.push(String(i.reason)));window.addEventListener("beforeunload",()=>{cancelAnimationFrame(rf),aa?.dispose(),Pe?.dispose(),je?.dispose?.()});document.querySelectorAll("button").forEach(i=>i.disabled=!0);requestAnimationFrame(lf);qM();
