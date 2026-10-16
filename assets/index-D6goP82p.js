(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const pc="180",Cs={ROTATE:0,DOLLY:1,PAN:2},Ts={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},af=0,Zc=1,lf=2,ju=1,qu=2,ei=3,ai=0,Xt=1,cn=2,Ri=0,Ps=1,Jc=2,Qc=3,eh=4,cf=5,Ki=100,hf=101,uf=102,df=103,ff=104,pf=200,mf=201,gf=202,_f=203,ol=204,al=205,vf=206,xf=207,yf=208,Mf=209,Sf=210,wf=211,bf=212,Ef=213,Tf=214,ll=0,cl=1,hl=2,Fs=3,ul=4,dl=5,fl=6,pl=7,mc=0,Af=1,Rf=2,Ci=0,Cf=1,Pf=2,Df=3,Ku=4,If=5,Lf=6,Nf=7,th="attached",Uf="detached",Yu=300,Os=301,ks=302,ml=303,gl=304,Jo=306,Ji=1e3,Ti=1001,Vo=1002,Qt=1003,$u=1004,hr=1005,Jt=1006,Ao=1007,ii=1008,Ln=1009,Zu=1010,Ju=1011,Ar=1012,gc=1013,Qi=1014,Cn=1015,js=1016,_c=1017,vc=1018,Rr=1020,Qu=35902,ed=35899,td=1021,nd=1022,Mn=1023,Cr=1026,Pr=1027,xc=1028,yc=1029,id=1030,Mc=1031,Sc=1033,Ro=33776,Co=33777,Po=33778,Do=33779,_l=35840,vl=35841,xl=35842,yl=35843,Ml=36196,Sl=37492,wl=37496,bl=37808,El=37809,Tl=37810,Al=37811,Rl=37812,Cl=37813,Pl=37814,Dl=37815,Il=37816,Ll=37817,Nl=37818,Ul=37819,Fl=37820,Ol=37821,kl=36492,Bl=36494,zl=36495,Vl=36283,Hl=36284,Gl=36285,Wl=36286,Dr=2300,Ir=2301,aa=2302,nh=2400,ih=2401,sh=2402,Ff=2500,Of=0,sd=1,Xl=2,kf=3200,Bf=3201,wc=0,zf=1,bi="",Rt="srgb",jt="srgb-linear",Ho="linear",at="srgb",ss=7680,rh=519,Vf=512,Hf=513,Gf=514,rd=515,Wf=516,Xf=517,jf=518,qf=519,jl=35044,oh=35040,ah="300 es",Vn=2e3,Go=2001;class ns{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const Vt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let lh=1234567;const gr=Math.PI/180,Bs=180/Math.PI;function Dn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Vt[i&255]+Vt[i>>8&255]+Vt[i>>16&255]+Vt[i>>24&255]+"-"+Vt[e&255]+Vt[e>>8&255]+"-"+Vt[e>>16&15|64]+Vt[e>>24&255]+"-"+Vt[t&63|128]+Vt[t>>8&255]+"-"+Vt[t>>16&255]+Vt[t>>24&255]+Vt[n&255]+Vt[n>>8&255]+Vt[n>>16&255]+Vt[n>>24&255]).toLowerCase()}function He(i,e,t){return Math.max(e,Math.min(t,i))}function bc(i,e){return(i%e+e)%e}function Kf(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Yf(i,e,t){return i!==e?(t-i)/(e-i):0}function _r(i,e,t){return(1-t)*i+t*e}function $f(i,e,t,n){return _r(i,e,1-Math.exp(-t*n))}function Zf(i,e=1){return e-Math.abs(bc(i,e*2)-e)}function Jf(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Qf(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function ep(i,e){return i+Math.floor(Math.random()*(e-i+1))}function tp(i,e){return i+Math.random()*(e-i)}function np(i){return i*(.5-Math.random())}function ip(i){i!==void 0&&(lh=i);let e=lh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function sp(i){return i*gr}function rp(i){return i*Bs}function op(i){return(i&i-1)===0&&i!==0}function ap(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function lp(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function cp(i,e,t,n,s){const r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),d=o((e-n)/2),f=r((n-e)/2),g=o((n-e)/2);switch(s){case"XYX":i.set(a*h,l*u,l*d,a*c);break;case"YZY":i.set(l*d,a*h,l*u,a*c);break;case"ZXZ":i.set(l*u,l*d,a*h,a*c);break;case"XZX":i.set(a*h,l*g,l*f,a*c);break;case"YXY":i.set(l*f,a*h,l*g,a*c);break;case"ZYZ":i.set(l*g,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Rn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function st(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const ni={DEG2RAD:gr,RAD2DEG:Bs,generateUUID:Dn,clamp:He,euclideanModulo:bc,mapLinear:Kf,inverseLerp:Yf,lerp:_r,damp:$f,pingpong:Zf,smoothstep:Jf,smootherstep:Qf,randInt:ep,randFloat:tp,randFloatSpread:np,seededRandom:ip,degToRad:sp,radToDeg:rp,isPowerOfTwo:op,ceilPowerOfTwo:ap,floorPowerOfTwo:lp,setQuaternionFromProperEuler:cp,normalize:st,denormalize:Rn};class de{constructor(e=0,t=0){de.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=He(this.x,e.x,t.x),this.y=He(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=He(this.x,e,t),this.y=He(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(He(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(He(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Fe{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3];const d=r[o+0],f=r[o+1],g=r[o+2],_=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(u!==_||l!==d||c!==f||h!==g){let m=1-a;const p=l*d+c*f+h*g+u*_,S=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){const C=Math.sqrt(y),P=Math.atan2(C,p*S);m=Math.sin(m*P)/C,a=Math.sin(a*P)/C}const M=a*S;if(l=l*m+d*M,c=c*m+f*M,h=h*m+g*M,u=u*m+_*M,m===1-a){const C=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=C,c*=C,h*=C,u*=C}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return e[t]=a*g+h*u+l*f-c*d,e[t+1]=l*g+h*d+c*u-a*f,e[t+2]=c*g+h*f+a*d-l*u,e[t+3]=h*g-a*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),u=a(r/2),d=l(n/2),f=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(He(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class b{constructor(e=0,t=0,n=0){b.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ch.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ch.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*n),h=2*(a*t-r*s),u=2*(r*n-o*t);return this.x=t+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=He(this.x,e.x,t.x),this.y=He(this.y,e.y,t.y),this.z=He(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=He(this.x,e,t),this.y=He(this.y,e,t),this.z=He(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(He(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return la.copy(this).projectOnVector(e),this.sub(la)}reflect(e){return this.sub(la.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(He(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const la=new b,ch=new Fe;class ze{constructor(e,t,n,s,r,o,a,l,c){ze.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c)}set(e,t,n,s,r,o,a,l,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],_=s[0],m=s[3],p=s[6],S=s[1],y=s[4],M=s[7],C=s[2],P=s[5],R=s[8];return r[0]=o*_+a*S+l*C,r[3]=o*m+a*y+l*P,r[6]=o*p+a*M+l*R,r[1]=c*_+h*S+u*C,r[4]=c*m+h*y+u*P,r[7]=c*p+h*M+u*R,r[2]=d*_+f*S+g*C,r[5]=d*m+f*y+g*P,r[8]=d*p+f*M+g*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,d=a*l-h*r,f=c*r-o*l,g=t*u+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(s*c-h*n)*_,e[2]=(a*n-s*o)*_,e[3]=d*_,e[4]=(h*t-s*l)*_,e[5]=(s*r-a*t)*_,e[6]=f*_,e[7]=(n*l-c*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(ca.makeScale(e,t)),this}rotate(e){return this.premultiply(ca.makeRotation(-e)),this}translate(e,t){return this.premultiply(ca.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ca=new ze;function od(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Lr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function hp(){const i=Lr("canvas");return i.style.display="block",i}const hh={};function Nr(i){i in hh||(hh[i]=!0,console.warn(i))}function up(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const uh=new ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),dh=new ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function dp(){const i={enabled:!0,workingColorSpace:jt,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===at&&(s.r=ri(s.r),s.g=ri(s.g),s.b=ri(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===at&&(s.r=Ds(s.r),s.g=Ds(s.g),s.b=Ds(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===bi?Ho:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Nr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Nr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[jt]:{primaries:e,whitePoint:n,transfer:Ho,toXYZ:uh,fromXYZ:dh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Rt},outputColorSpaceConfig:{drawingBufferColorSpace:Rt}},[Rt]:{primaries:e,whitePoint:n,transfer:at,toXYZ:uh,fromXYZ:dh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Rt}}}),i}const Je=dp();function ri(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ds(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let rs;class fp{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{rs===void 0&&(rs=Lr("canvas")),rs.width=e.width,rs.height=e.height;const s=rs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=rs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Lr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=ri(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ri(t[n]/255)*255):t[n]=ri(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let pp=0;class Ec{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:pp++}),this.uuid=Dn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(ha(s[o].image)):r.push(ha(s[o]))}else r=ha(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function ha(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?fp.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let mp=0;const ua=new b;class Pt extends ns{constructor(e=Pt.DEFAULT_IMAGE,t=Pt.DEFAULT_MAPPING,n=Ti,s=Ti,r=Jt,o=ii,a=Mn,l=Ln,c=Pt.DEFAULT_ANISOTROPY,h=bi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:mp++}),this.uuid=Dn(),this.name="",this.source=new Ec(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new de(0,0),this.repeat=new de(1,1),this.center=new de(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ua).x}get height(){return this.source.getSize(ua).y}get depth(){return this.source.getSize(ua).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Yu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ji:e.x=e.x-Math.floor(e.x);break;case Ti:e.x=e.x<0?0:1;break;case Vo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ji:e.y=e.y-Math.floor(e.y);break;case Ti:e.y=e.y<0?0:1;break;case Vo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Pt.DEFAULT_IMAGE=null;Pt.DEFAULT_MAPPING=Yu;Pt.DEFAULT_ANISOTROPY=1;class et{constructor(e=0,t=0,n=0,s=1){et.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(c+1)/2,M=(f+1)/2,C=(p+1)/2,P=(h+d)/4,R=(u+_)/4,T=(g+m)/4;return y>M&&y>C?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=P/n,r=R/n):M>C?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=P/s,r=T/s):C<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),n=R/r,s=T/r),this.set(n,s,r,t),this}let S=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(u-_)/S,this.z=(d-h)/S,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=He(this.x,e.x,t.x),this.y=He(this.y,e.y,t.y),this.z=He(this.z,e.z,t.z),this.w=He(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=He(this.x,e,t),this.y=He(this.y,e,t),this.z=He(this.z,e,t),this.w=He(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(He(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class gp extends ns{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Jt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new et(0,0,e,t),this.scissorTest=!1,this.viewport=new et(0,0,e,t);const s={width:e,height:t,depth:n.depth},r=new Pt(s);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Jt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Ec(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ii extends gp{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class ad extends Pt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Qt,this.minFilter=Qt,this.wrapR=Ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class _p extends Pt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Qt,this.minFilter=Qt,this.wrapR=Ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Gn{constructor(e=new b(1/0,1/0,1/0),t=new b(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(bn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(bn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=bn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,bn):bn.fromBufferAttribute(r,o),bn.applyMatrix4(e.matrixWorld),this.expandByPoint(bn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),jr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),jr.copy(n.boundingBox)),jr.applyMatrix4(e.matrixWorld),this.union(jr)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,bn),bn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Js),qr.subVectors(this.max,Js),os.subVectors(e.a,Js),as.subVectors(e.b,Js),ls.subVectors(e.c,Js),fi.subVectors(as,os),pi.subVectors(ls,as),Oi.subVectors(os,ls);let t=[0,-fi.z,fi.y,0,-pi.z,pi.y,0,-Oi.z,Oi.y,fi.z,0,-fi.x,pi.z,0,-pi.x,Oi.z,0,-Oi.x,-fi.y,fi.x,0,-pi.y,pi.x,0,-Oi.y,Oi.x,0];return!da(t,os,as,ls,qr)||(t=[1,0,0,0,1,0,0,0,1],!da(t,os,as,ls,qr))?!1:(Kr.crossVectors(fi,pi),t=[Kr.x,Kr.y,Kr.z],da(t,os,as,ls,qr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,bn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(bn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(jn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const jn=[new b,new b,new b,new b,new b,new b,new b,new b],bn=new b,jr=new Gn,os=new b,as=new b,ls=new b,fi=new b,pi=new b,Oi=new b,Js=new b,qr=new b,Kr=new b,ki=new b;function da(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){ki.fromArray(i,r);const a=s.x*Math.abs(ki.x)+s.y*Math.abs(ki.y)+s.z*Math.abs(ki.z),l=e.dot(ki),c=t.dot(ki),h=n.dot(ki);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const vp=new Gn,Qs=new b,fa=new b;class Wn{constructor(e=new b,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):vp.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Qs.subVectors(e,this.center);const t=Qs.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Qs,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(fa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Qs.copy(e.center).add(fa)),this.expandByPoint(Qs.copy(e.center).sub(fa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const qn=new b,pa=new b,Yr=new b,mi=new b,ma=new b,$r=new b,ga=new b;class Vr{constructor(e=new b,t=new b(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,qn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=qn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(qn.copy(this.origin).addScaledVector(this.direction,t),qn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){pa.copy(e).add(t).multiplyScalar(.5),Yr.copy(t).sub(e).normalize(),mi.copy(this.origin).sub(pa);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Yr),a=mi.dot(this.direction),l=-mi.dot(Yr),c=mi.lengthSq(),h=Math.abs(1-o*o);let u,d,f,g;if(h>0)if(u=o*l-a,d=o*a-l,g=r*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(pa).addScaledVector(Yr,d),f}intersectSphere(e,t){qn.subVectors(e.center,this.origin);const n=qn.dot(this.direction),s=qn.dot(qn)-n*n,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,s=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,s=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,qn)!==null}intersectTriangle(e,t,n,s,r){ma.subVectors(t,e),$r.subVectors(n,e),ga.crossVectors(ma,$r);let o=this.direction.dot(ga),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;mi.subVectors(this.origin,e);const l=a*this.direction.dot($r.crossVectors(mi,$r));if(l<0)return null;const c=a*this.direction.dot(ma.cross(mi));if(c<0||l+c>o)return null;const h=-a*mi.dot(ga);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ue{constructor(e,t,n,s,r,o,a,l,c,h,u,d,f,g,_,m){Ue.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c,h,u,d,f,g,_,m)}set(e,t,n,s,r,o,a,l,c,h,u,d,f,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ue().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/cs.setFromMatrixColumn(e,0).length(),r=1/cs.setFromMatrixColumn(e,1).length(),o=1/cs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=o*h,f=o*u,g=a*h,_=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+g*c,t[5]=d-_*c,t[9]=-a*l,t[2]=_-d*c,t[6]=g+f*c,t[10]=o*l}else if(e.order==="YXZ"){const d=l*h,f=l*u,g=c*h,_=c*u;t[0]=d+_*a,t[4]=g*a-f,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-g,t[6]=_+d*a,t[10]=o*l}else if(e.order==="ZXY"){const d=l*h,f=l*u,g=c*h,_=c*u;t[0]=d-_*a,t[4]=-o*u,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*h,t[9]=_-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const d=o*h,f=o*u,g=a*h,_=a*u;t[0]=l*h,t[4]=g*c-f,t[8]=d*c+_,t[1]=l*u,t[5]=_*c+d,t[9]=f*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const d=o*l,f=o*c,g=a*l,_=a*c;t[0]=l*h,t[4]=_-d*u,t[8]=g*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*u+g,t[10]=d-_*u}else if(e.order==="XZY"){const d=o*l,f=o*c,g=a*l,_=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+_,t[5]=o*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=a*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(xp,e,yp)}lookAt(e,t,n){const s=this.elements;return on.subVectors(e,t),on.lengthSq()===0&&(on.z=1),on.normalize(),gi.crossVectors(n,on),gi.lengthSq()===0&&(Math.abs(n.z)===1?on.x+=1e-4:on.z+=1e-4,on.normalize(),gi.crossVectors(n,on)),gi.normalize(),Zr.crossVectors(on,gi),s[0]=gi.x,s[4]=Zr.x,s[8]=on.x,s[1]=gi.y,s[5]=Zr.y,s[9]=on.y,s[2]=gi.z,s[6]=Zr.z,s[10]=on.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],S=n[3],y=n[7],M=n[11],C=n[15],P=s[0],R=s[4],T=s[8],v=s[12],x=s[1],A=s[5],D=s[9],U=s[13],L=s[2],k=s[6],O=s[10],K=s[14],V=s[3],Y=s[7],ne=s[11],ue=s[15];return r[0]=o*P+a*x+l*L+c*V,r[4]=o*R+a*A+l*k+c*Y,r[8]=o*T+a*D+l*O+c*ne,r[12]=o*v+a*U+l*K+c*ue,r[1]=h*P+u*x+d*L+f*V,r[5]=h*R+u*A+d*k+f*Y,r[9]=h*T+u*D+d*O+f*ne,r[13]=h*v+u*U+d*K+f*ue,r[2]=g*P+_*x+m*L+p*V,r[6]=g*R+_*A+m*k+p*Y,r[10]=g*T+_*D+m*O+p*ne,r[14]=g*v+_*U+m*K+p*ue,r[3]=S*P+y*x+M*L+C*V,r[7]=S*R+y*A+M*k+C*Y,r[11]=S*T+y*D+M*O+C*ne,r[15]=S*v+y*U+M*K+C*ue,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+r*l*u-s*c*u-r*a*d+n*c*d+s*a*f-n*l*f)+_*(+t*l*f-t*c*d+r*o*d-s*o*f+s*c*h-r*l*h)+m*(+t*c*u-t*a*f-r*o*u+n*o*f+r*a*h-n*c*h)+p*(-s*a*h-t*l*u+t*a*d+s*o*u-n*o*d+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],_=e[13],m=e[14],p=e[15],S=u*m*c-_*d*c+_*l*f-a*m*f-u*l*p+a*d*p,y=g*d*c-h*m*c-g*l*f+o*m*f+h*l*p-o*d*p,M=h*_*c-g*u*c+g*a*f-o*_*f-h*a*p+o*u*p,C=g*u*l-h*_*l-g*a*d+o*_*d+h*a*m-o*u*m,P=t*S+n*y+s*M+r*C;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/P;return e[0]=S*R,e[1]=(_*d*r-u*m*r-_*s*f+n*m*f+u*s*p-n*d*p)*R,e[2]=(a*m*r-_*l*r+_*s*c-n*m*c-a*s*p+n*l*p)*R,e[3]=(u*l*r-a*d*r-u*s*c+n*d*c+a*s*f-n*l*f)*R,e[4]=y*R,e[5]=(h*m*r-g*d*r+g*s*f-t*m*f-h*s*p+t*d*p)*R,e[6]=(g*l*r-o*m*r-g*s*c+t*m*c+o*s*p-t*l*p)*R,e[7]=(o*d*r-h*l*r+h*s*c-t*d*c-o*s*f+t*l*f)*R,e[8]=M*R,e[9]=(g*u*r-h*_*r-g*n*f+t*_*f+h*n*p-t*u*p)*R,e[10]=(o*_*r-g*a*r+g*n*c-t*_*c-o*n*p+t*a*p)*R,e[11]=(h*a*r-o*u*r-h*n*c+t*u*c+o*n*f-t*a*f)*R,e[12]=C*R,e[13]=(h*_*s-g*u*s+g*n*d-t*_*d-h*n*m+t*u*m)*R,e[14]=(g*a*s-o*_*s-g*n*l+t*_*l+o*n*m-t*a*m)*R,e[15]=(o*u*s-h*a*s+h*n*l-t*u*l-o*n*d+t*a*d)*R,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,u=a+a,d=r*c,f=r*h,g=r*u,_=o*h,m=o*u,p=a*u,S=l*c,y=l*h,M=l*u,C=n.x,P=n.y,R=n.z;return s[0]=(1-(_+p))*C,s[1]=(f+M)*C,s[2]=(g-y)*C,s[3]=0,s[4]=(f-M)*P,s[5]=(1-(d+p))*P,s[6]=(m+S)*P,s[7]=0,s[8]=(g+y)*R,s[9]=(m-S)*R,s[10]=(1-(d+_))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=cs.set(s[0],s[1],s[2]).length();const o=cs.set(s[4],s[5],s[6]).length(),a=cs.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],En.copy(this);const c=1/r,h=1/o,u=1/a;return En.elements[0]*=c,En.elements[1]*=c,En.elements[2]*=c,En.elements[4]*=h,En.elements[5]*=h,En.elements[6]*=h,En.elements[8]*=u,En.elements[9]*=u,En.elements[10]*=u,t.setFromRotationMatrix(En),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=Vn,l=!1){const c=this.elements,h=2*r/(t-e),u=2*r/(n-s),d=(t+e)/(t-e),f=(n+s)/(n-s);let g,_;if(l)g=r/(o-r),_=o*r/(o-r);else if(a===Vn)g=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===Go)g=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=Vn,l=!1){const c=this.elements,h=2/(t-e),u=2/(n-s),d=-(t+e)/(t-e),f=-(n+s)/(n-s);let g,_;if(l)g=1/(o-r),_=o/(o-r);else if(a===Vn)g=-2/(o-r),_=-(o+r)/(o-r);else if(a===Go)g=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const cs=new b,En=new Ue,xp=new b(0,0,0),yp=new b(1,1,1),gi=new b,Zr=new b,on=new b,fh=new Ue,ph=new Fe;class Sn{constructor(e=0,t=0,n=0,s=Sn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(He(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-He(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(He(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-He(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(He(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-He(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return fh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(fh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ph.setFromEuler(this),this.setFromQuaternion(ph,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Sn.DEFAULT_ORDER="XYZ";class ld{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Mp=0;const mh=new b,hs=new Fe,Kn=new Ue,Jr=new b,er=new b,Sp=new b,wp=new Fe,gh=new b(1,0,0),_h=new b(0,1,0),vh=new b(0,0,1),xh={type:"added"},bp={type:"removed"},us={type:"childadded",child:null},_a={type:"childremoved",child:null};class ht extends ns{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Mp++}),this.uuid=Dn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ht.DEFAULT_UP.clone();const e=new b,t=new Sn,n=new Fe,s=new b(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ue},normalMatrix:{value:new ze}}),this.matrix=new Ue,this.matrixWorld=new Ue,this.matrixAutoUpdate=ht.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ht.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ld,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return hs.setFromAxisAngle(e,t),this.quaternion.multiply(hs),this}rotateOnWorldAxis(e,t){return hs.setFromAxisAngle(e,t),this.quaternion.premultiply(hs),this}rotateX(e){return this.rotateOnAxis(gh,e)}rotateY(e){return this.rotateOnAxis(_h,e)}rotateZ(e){return this.rotateOnAxis(vh,e)}translateOnAxis(e,t){return mh.copy(e).applyQuaternion(this.quaternion),this.position.add(mh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(gh,e)}translateY(e){return this.translateOnAxis(_h,e)}translateZ(e){return this.translateOnAxis(vh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Kn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Jr.copy(e):Jr.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),er.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Kn.lookAt(er,Jr,this.up):Kn.lookAt(Jr,er,this.up),this.quaternion.setFromRotationMatrix(Kn),s&&(Kn.extractRotation(s.matrixWorld),hs.setFromRotationMatrix(Kn),this.quaternion.premultiply(hs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(xh),us.child=e,this.dispatchEvent(us),us.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(bp),_a.child=e,this.dispatchEvent(_a),_a.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Kn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Kn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Kn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(xh),us.child=e,this.dispatchEvent(us),us.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(er,e,Sp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(er,wp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}ht.DEFAULT_UP=new b(0,1,0);ht.DEFAULT_MATRIX_AUTO_UPDATE=!0;ht.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Tn=new b,Yn=new b,va=new b,$n=new b,ds=new b,fs=new b,yh=new b,xa=new b,ya=new b,Ma=new b,Sa=new et,wa=new et,ba=new et;class yn{constructor(e=new b,t=new b,n=new b){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Tn.subVectors(e,t),s.cross(Tn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Tn.subVectors(s,t),Yn.subVectors(n,t),va.subVectors(e,t);const o=Tn.dot(Tn),a=Tn.dot(Yn),l=Tn.dot(va),c=Yn.dot(Yn),h=Yn.dot(va),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(c*l-a*h)*d,g=(o*h-a*l)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,$n)===null?!1:$n.x>=0&&$n.y>=0&&$n.x+$n.y<=1}static getInterpolation(e,t,n,s,r,o,a,l){return this.getBarycoord(e,t,n,s,$n)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,$n.x),l.addScaledVector(o,$n.y),l.addScaledVector(a,$n.z),l)}static getInterpolatedAttribute(e,t,n,s,r,o){return Sa.setScalar(0),wa.setScalar(0),ba.setScalar(0),Sa.fromBufferAttribute(e,t),wa.fromBufferAttribute(e,n),ba.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Sa,r.x),o.addScaledVector(wa,r.y),o.addScaledVector(ba,r.z),o}static isFrontFacing(e,t,n,s){return Tn.subVectors(n,t),Yn.subVectors(e,t),Tn.cross(Yn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Tn.subVectors(this.c,this.b),Yn.subVectors(this.a,this.b),Tn.cross(Yn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return yn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return yn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return yn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return yn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return yn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let o,a;ds.subVectors(s,n),fs.subVectors(r,n),xa.subVectors(e,n);const l=ds.dot(xa),c=fs.dot(xa);if(l<=0&&c<=0)return t.copy(n);ya.subVectors(e,s);const h=ds.dot(ya),u=fs.dot(ya);if(h>=0&&u<=h)return t.copy(s);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(ds,o);Ma.subVectors(e,r);const f=ds.dot(Ma),g=fs.dot(Ma);if(g>=0&&f<=g)return t.copy(r);const _=f*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(fs,a);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return yh.subVectors(r,s),a=(u-h)/(u-h+(f-g)),t.copy(s).addScaledVector(yh,a);const p=1/(m+_+d);return o=_*p,a=d*p,t.copy(n).addScaledVector(ds,o).addScaledVector(fs,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const cd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},_i={h:0,s:0,l:0},Qr={h:0,s:0,l:0};function Ea(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ce{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Rt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Je.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=Je.workingColorSpace){return this.r=e,this.g=t,this.b=n,Je.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=Je.workingColorSpace){if(e=bc(e,1),t=He(t,0,1),n=He(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Ea(o,r,e+1/3),this.g=Ea(o,r,e),this.b=Ea(o,r,e-1/3)}return Je.colorSpaceToWorking(this,s),this}setStyle(e,t=Rt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Rt){const n=cd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ri(e.r),this.g=ri(e.g),this.b=ri(e.b),this}copyLinearToSRGB(e){return this.r=Ds(e.r),this.g=Ds(e.g),this.b=Ds(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Rt){return Je.workingToColorSpace(Ht.copy(this),e),Math.round(He(Ht.r*255,0,255))*65536+Math.round(He(Ht.g*255,0,255))*256+Math.round(He(Ht.b*255,0,255))}getHexString(e=Rt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Je.workingColorSpace){Je.workingToColorSpace(Ht.copy(this),t);const n=Ht.r,s=Ht.g,r=Ht.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Je.workingColorSpace){return Je.workingToColorSpace(Ht.copy(this),t),e.r=Ht.r,e.g=Ht.g,e.b=Ht.b,e}getStyle(e=Rt){Je.workingToColorSpace(Ht.copy(this),e);const t=Ht.r,n=Ht.g,s=Ht.b;return e!==Rt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(_i),this.setHSL(_i.h+e,_i.s+t,_i.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(_i),e.getHSL(Qr);const n=_r(_i.h,Qr.h,t),s=_r(_i.s,Qr.s,t),r=_r(_i.l,Qr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ht=new Ce;Ce.NAMES=cd;let Ep=0;class In extends ns{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ep++}),this.uuid=Dn(),this.name="",this.type="Material",this.blending=Ps,this.side=ai,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ol,this.blendDst=al,this.blendEquation=Ki,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ce(0,0,0),this.blendAlpha=0,this.depthFunc=Fs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=rh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ss,this.stencilZFail=ss,this.stencilZPass=ss,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ps&&(n.blending=this.blending),this.side!==ai&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ol&&(n.blendSrc=this.blendSrc),this.blendDst!==al&&(n.blendDst=this.blendDst),this.blendEquation!==Ki&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Fs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==rh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ss&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ss&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ss&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class hn extends In{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ce(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Sn,this.combine=mc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const At=new b,eo=new de;let Tp=0;class ct{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Tp++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=jl,this.updateRanges=[],this.gpuType=Cn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)eo.fromBufferAttribute(this,t),eo.applyMatrix3(e),this.setXY(t,eo.x,eo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix3(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix4(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyNormalMatrix(e),this.setXYZ(t,At.x,At.y,At.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.transformDirection(e),this.setXYZ(t,At.x,At.y,At.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Rn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=st(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Rn(t,this.array)),t}setX(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Rn(t,this.array)),t}setY(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Rn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Rn(t,this.array)),t}setW(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array),s=st(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array),s=st(s,this.array),r=st(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==jl&&(e.usage=this.usage),e}}class hd extends ct{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class ud extends ct{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class pt extends ct{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Ap=0;const mn=new Ue,Ta=new ht,ps=new b,an=new Gn,tr=new Gn,Ut=new b;class Lt extends ns{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ap++}),this.uuid=Dn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(od(e)?ud:hd)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new ze().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return mn.makeRotationFromQuaternion(e),this.applyMatrix4(mn),this}rotateX(e){return mn.makeRotationX(e),this.applyMatrix4(mn),this}rotateY(e){return mn.makeRotationY(e),this.applyMatrix4(mn),this}rotateZ(e){return mn.makeRotationZ(e),this.applyMatrix4(mn),this}translate(e,t,n){return mn.makeTranslation(e,t,n),this.applyMatrix4(mn),this}scale(e,t,n){return mn.makeScale(e,t,n),this.applyMatrix4(mn),this}lookAt(e){return Ta.lookAt(e),Ta.updateMatrix(),this.applyMatrix4(Ta.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ps).negate(),this.translate(ps.x,ps.y,ps.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new pt(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Gn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new b(-1/0,-1/0,-1/0),new b(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];an.setFromBufferAttribute(r),this.morphTargetsRelative?(Ut.addVectors(this.boundingBox.min,an.min),this.boundingBox.expandByPoint(Ut),Ut.addVectors(this.boundingBox.max,an.max),this.boundingBox.expandByPoint(Ut)):(this.boundingBox.expandByPoint(an.min),this.boundingBox.expandByPoint(an.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Wn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new b,1/0);return}if(e){const n=this.boundingSphere.center;if(an.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];tr.setFromBufferAttribute(a),this.morphTargetsRelative?(Ut.addVectors(an.min,tr.min),an.expandByPoint(Ut),Ut.addVectors(an.max,tr.max),an.expandByPoint(Ut)):(an.expandByPoint(tr.min),an.expandByPoint(tr.max))}an.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Ut.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Ut));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Ut.fromBufferAttribute(a,c),l&&(ps.fromBufferAttribute(e,c),Ut.add(ps)),s=Math.max(s,n.distanceToSquared(Ut))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ct(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let T=0;T<n.count;T++)a[T]=new b,l[T]=new b;const c=new b,h=new b,u=new b,d=new de,f=new de,g=new de,_=new b,m=new b;function p(T,v,x){c.fromBufferAttribute(n,T),h.fromBufferAttribute(n,v),u.fromBufferAttribute(n,x),d.fromBufferAttribute(r,T),f.fromBufferAttribute(r,v),g.fromBufferAttribute(r,x),h.sub(c),u.sub(c),f.sub(d),g.sub(d);const A=1/(f.x*g.y-g.x*f.y);isFinite(A)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(A),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(A),a[T].add(_),a[v].add(_),a[x].add(_),l[T].add(m),l[v].add(m),l[x].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let T=0,v=S.length;T<v;++T){const x=S[T],A=x.start,D=x.count;for(let U=A,L=A+D;U<L;U+=3)p(e.getX(U+0),e.getX(U+1),e.getX(U+2))}const y=new b,M=new b,C=new b,P=new b;function R(T){C.fromBufferAttribute(s,T),P.copy(C);const v=a[T];y.copy(v),y.sub(C.multiplyScalar(C.dot(v))).normalize(),M.crossVectors(P,v);const A=M.dot(l[T])<0?-1:1;o.setXYZW(T,y.x,y.y,y.z,A)}for(let T=0,v=S.length;T<v;++T){const x=S[T],A=x.start,D=x.count;for(let U=A,L=A+D;U<L;U+=3)R(e.getX(U+0)),R(e.getX(U+1)),R(e.getX(U+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ct(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new b,r=new b,o=new b,a=new b,l=new b,c=new b,h=new b,u=new b;if(e)for(let d=0,f=e.count;d<f;d+=3){const g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ut.fromBufferAttribute(e,t),Ut.normalize(),e.setXYZ(t,Ut.x,Ut.y,Ut.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let f=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?f=l[_]*a.data.stride+a.offset:f=l[_]*h;for(let p=0;p<h;p++)d[g++]=c[f++]}return new ct(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Lt,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=e(l,n);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Mh=new Ue,Bi=new Vr,to=new Wn,Sh=new b,no=new b,io=new b,so=new b,Aa=new b,ro=new b,wh=new b,oo=new b;class qe extends ht{constructor(e=new Lt,t=new hn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){ro.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],u=r[l];h!==0&&(Aa.fromBufferAttribute(u,e),o?ro.addScaledVector(Aa,h):ro.addScaledVector(Aa.sub(t),h))}t.add(ro)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),to.copy(n.boundingSphere),to.applyMatrix4(r),Bi.copy(e.ray).recast(e.near),!(to.containsPoint(Bi.origin)===!1&&(Bi.intersectSphere(to,Sh)===null||Bi.origin.distanceToSquared(Sh)>(e.far-e.near)**2))&&(Mh.copy(r).invert(),Bi.copy(e.ray).applyMatrix4(Mh),!(n.boundingBox!==null&&Bi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Bi)))}_computeIntersections(e,t,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=o[m.materialIndex],S=Math.max(m.start,f.start),y=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let M=S,C=y;M<C;M+=3){const P=a.getX(M),R=a.getX(M+1),T=a.getX(M+2);s=ao(this,p,e,n,c,h,u,P,R,T),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const S=a.getX(m),y=a.getX(m+1),M=a.getX(m+2);s=ao(this,o,e,n,c,h,u,S,y,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=o[m.materialIndex],S=Math.max(m.start,f.start),y=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let M=S,C=y;M<C;M+=3){const P=M,R=M+1,T=M+2;s=ao(this,p,e,n,c,h,u,P,R,T),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const S=m,y=m+1,M=m+2;s=ao(this,o,e,n,c,h,u,S,y,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Rp(i,e,t,n,s,r,o,a){let l;if(e.side===Xt?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,e.side===ai,a),l===null)return null;oo.copy(a),oo.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(oo);return c<t.near||c>t.far?null:{distance:c,point:oo.clone(),object:i}}function ao(i,e,t,n,s,r,o,a,l,c){i.getVertexPosition(a,no),i.getVertexPosition(l,io),i.getVertexPosition(c,so);const h=Rp(i,e,t,n,no,io,so,wh);if(h){const u=new b;yn.getBarycoord(wh,no,io,so,u),s&&(h.uv=yn.getInterpolatedAttribute(s,a,l,c,u,new de)),r&&(h.uv1=yn.getInterpolatedAttribute(r,a,l,c,u,new de)),o&&(h.normal=yn.getInterpolatedAttribute(o,a,l,c,u,new b),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new b,materialIndex:0};yn.getNormal(no,io,so,d.normal),h.face=d,h.barycoord=u}return h}class Ni extends Lt{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new pt(c,3)),this.setAttribute("normal",new pt(h,3)),this.setAttribute("uv",new pt(u,2));function g(_,m,p,S,y,M,C,P,R,T,v){const x=M/R,A=C/T,D=M/2,U=C/2,L=P/2,k=R+1,O=T+1;let K=0,V=0;const Y=new b;for(let ne=0;ne<O;ne++){const ue=ne*A-U;for(let Ae=0;Ae<k;Ae++){const Qe=Ae*x-D;Y[_]=Qe*S,Y[m]=ue*y,Y[p]=L,c.push(Y.x,Y.y,Y.z),Y[_]=0,Y[m]=0,Y[p]=P>0?1:-1,h.push(Y.x,Y.y,Y.z),u.push(Ae/R),u.push(1-ne/T),K+=1}}for(let ne=0;ne<T;ne++)for(let ue=0;ue<R;ue++){const Ae=d+ue+k*ne,Qe=d+ue+k*(ne+1),tt=d+(ue+1)+k*(ne+1),je=d+(ue+1)+k*ne;l.push(Ae,Qe,je),l.push(Qe,tt,je),V+=6}a.addGroup(f,V,v),f+=V,d+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ni(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function zs(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Yt(i){const e={};for(let t=0;t<i.length;t++){const n=zs(i[t]);for(const s in n)e[s]=n[s]}return e}function Cp(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function dd(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Je.workingColorSpace}const ql={clone:zs,merge:Yt};var Pp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Dp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class li extends In{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Pp,this.fragmentShader=Dp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=zs(e.uniforms),this.uniformsGroups=Cp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class fd extends ht{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ue,this.projectionMatrix=new Ue,this.projectionMatrixInverse=new Ue,this.coordinateSystem=Vn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const vi=new b,bh=new de,Eh=new de;class Wt extends fd{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Bs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(gr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Bs*2*Math.atan(Math.tan(gr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){vi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(vi.x,vi.y).multiplyScalar(-e/vi.z),vi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(vi.x,vi.y).multiplyScalar(-e/vi.z)}getViewSize(e,t){return this.getViewBounds(e,bh,Eh),t.subVectors(Eh,bh)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(gr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ms=-90,gs=1;class Ip extends ht{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Wt(ms,gs,e,t);s.layers=this.layers,this.add(s);const r=new Wt(ms,gs,e,t);r.layers=this.layers,this.add(r);const o=new Wt(ms,gs,e,t);o.layers=this.layers,this.add(o);const a=new Wt(ms,gs,e,t);a.layers=this.layers,this.add(a);const l=new Wt(ms,gs,e,t);l.layers=this.layers,this.add(l);const c=new Wt(ms,gs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===Vn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Go)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class pd extends Pt{constructor(e=[],t=Os,n,s,r,o,a,l,c,h){super(e,t,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Lp extends Ii{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new pd(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ni(5,5,5),r=new li({name:"CubemapFromEquirect",uniforms:zs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Xt,blending:Ri});r.uniforms.tEquirect.value=t;const o=new qe(s,r),a=t.minFilter;return t.minFilter===ii&&(t.minFilter=Jt),new Ip(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}}class Ke extends ht{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Np={type:"move"};class Ra{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ke,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ke,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new b,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new b),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ke,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new b,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new b),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Np)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ke;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class md extends ht{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Sn,this.environmentIntensity=1,this.environmentRotation=new Sn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Up{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=jl,this.updateRanges=[],this.version=0,this.uuid=Dn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Dn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Dn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Kt=new b;class Tc{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.applyMatrix4(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.applyNormalMatrix(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.transformDirection(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Rn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=st(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Rn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Rn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Rn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Rn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),n=st(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),n=st(n,this.array),s=st(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),n=st(n,this.array),s=st(s,this.array),r=st(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new ct(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Tc(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Th=new b,Ah=new et,Rh=new et,Fp=new b,Ch=new Ue,lo=new b,Ca=new Wn,Ph=new Ue,Pa=new Vr;class Op extends qe{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=th,this.bindMatrix=new Ue,this.bindMatrixInverse=new Ue,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Gn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,lo),this.boundingBox.expandByPoint(lo)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Wn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,lo),this.boundingSphere.expandByPoint(lo)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ca.copy(this.boundingSphere),Ca.applyMatrix4(s),e.ray.intersectsSphere(Ca)!==!1&&(Ph.copy(s).invert(),Pa.copy(e.ray).applyMatrix4(Ph),!(this.boundingBox!==null&&Pa.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Pa)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new et,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===th?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Uf?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,s=this.geometry;Ah.fromBufferAttribute(s.attributes.skinIndex,e),Rh.fromBufferAttribute(s.attributes.skinWeight,e),Th.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const o=Rh.getComponent(r);if(o!==0){const a=Ah.getComponent(r);Ch.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(Fp.copy(Th).applyMatrix4(Ch),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class gd extends ht{constructor(){super(),this.isBone=!0,this.type="Bone"}}class _d extends Pt{constructor(e=null,t=1,n=1,s,r,o,a,l,c=Qt,h=Qt,u,d){super(null,o,a,l,c,h,s,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Dh=new Ue,kp=new Ue;class Ac{constructor(e=[],t=[]){this.uuid=Dn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Ue)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Ue;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=e.length;r<o;r++){const a=e[r]?e[r].matrixWorld:kp;Dh.multiplyMatrices(a,t[r]),Dh.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new Ac(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new _d(t,e,e,Mn,Cn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){const r=e.bones[n];let o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new gd),this.bones.push(o),this.boneInverses.push(new Ue().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){const o=t[s];e.bones.push(o.uuid);const a=n[s];e.boneInverses.push(a.toArray())}return e}}class Kl extends ct{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const _s=new Ue,Ih=new Ue,co=[],Lh=new Gn,Bp=new Ue,nr=new qe,ir=new Wn;class vd extends qe{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Kl(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Bp)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Gn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,_s),Lh.copy(e.boundingBox).applyMatrix4(_s),this.boundingBox.union(Lh)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Wn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,_s),ir.copy(e.boundingSphere).applyMatrix4(_s),this.boundingSphere.union(ir)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(nr.geometry=this.geometry,nr.material=this.material,nr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ir.copy(this.boundingSphere),ir.applyMatrix4(n),e.ray.intersectsSphere(ir)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,_s),Ih.multiplyMatrices(n,_s),nr.matrixWorld=Ih,nr.raycast(e,co);for(let o=0,a=co.length;o<a;o++){const l=co[o];l.instanceId=r,l.object=this,t.push(l)}co.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Kl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new _d(new Float32Array(s*this.count),s,this.count,xc,Cn));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=s*e;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Da=new b,zp=new b,Vp=new ze;class wi{constructor(e=new b(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Da.subVectors(n,t).cross(zp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Da),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Vp.getNormalMatrix(e),s=this.coplanarPoint(Da).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const zi=new Wn,Hp=new de(.5,.5),ho=new b;class Rc{constructor(e=new wi,t=new wi,n=new wi,s=new wi,r=new wi,o=new wi){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Vn,n=!1){const s=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],f=r[7],g=r[8],_=r[9],m=r[10],p=r[11],S=r[12],y=r[13],M=r[14],C=r[15];if(s[0].setComponents(c-o,f-h,p-g,C-S).normalize(),s[1].setComponents(c+o,f+h,p+g,C+S).normalize(),s[2].setComponents(c+a,f+u,p+_,C+y).normalize(),s[3].setComponents(c-a,f-u,p-_,C-y).normalize(),n)s[4].setComponents(l,d,m,M).normalize(),s[5].setComponents(c-l,f-d,p-m,C-M).normalize();else if(s[4].setComponents(c-l,f-d,p-m,C-M).normalize(),t===Vn)s[5].setComponents(c+l,f+d,p+m,C+M).normalize();else if(t===Go)s[5].setComponents(l,d,m,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),zi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),zi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(zi)}intersectsSprite(e){zi.center.set(0,0,0);const t=Hp.distanceTo(e.center);return zi.radius=.7071067811865476+t,zi.applyMatrix4(e.matrixWorld),this.intersectsSphere(zi)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(ho.x=s.normal.x>0?e.max.x:e.min.x,ho.y=s.normal.y>0?e.max.y:e.min.y,ho.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ho)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Cc extends In{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ce(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Wo=new b,Xo=new b,Nh=new Ue,sr=new Vr,uo=new Wn,Ia=new b,Uh=new b;class Qo extends ht{constructor(e=new Lt,t=new Cc){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Wo.fromBufferAttribute(t,s-1),Xo.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Wo.distanceTo(Xo);e.setAttribute("lineDistance",new pt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),uo.copy(n.boundingSphere),uo.applyMatrix4(s),uo.radius+=r,e.ray.intersectsSphere(uo)===!1)return;Nh.copy(s).invert(),sr.copy(e.ray).applyMatrix4(Nh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=f,m=g-1;_<m;_+=c){const p=h.getX(_),S=h.getX(_+1),y=fo(this,e,sr,l,p,S,_);y&&t.push(y)}if(this.isLineLoop){const _=h.getX(g-1),m=h.getX(f),p=fo(this,e,sr,l,_,m,g-1);p&&t.push(p)}}else{const f=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let _=f,m=g-1;_<m;_+=c){const p=fo(this,e,sr,l,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){const _=fo(this,e,sr,l,g-1,f,g-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function fo(i,e,t,n,s,r,o){const a=i.geometry.attributes.position;if(Wo.fromBufferAttribute(a,s),Xo.fromBufferAttribute(a,r),t.distanceSqToSegment(Wo,Xo,Ia,Uh)>n)return;Ia.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Ia);if(!(c<e.near||c>e.far))return{distance:c,point:Uh.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const Fh=new b,Oh=new b;class Gp extends Qo{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Fh.fromBufferAttribute(t,s),Oh.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Fh.distanceTo(Oh);e.setAttribute("lineDistance",new pt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Wp extends Qo{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class xd extends In{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ce(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const kh=new Ue,Yl=new Vr,po=new Wn,mo=new b;class Xp extends ht{constructor(e=new Lt,t=new xd){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),po.copy(n.boundingSphere),po.applyMatrix4(s),po.radius+=r,e.ray.intersectsSphere(po)===!1)return;kh.copy(s).invert(),Yl.copy(e.ray).applyMatrix4(kh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=d,_=f;g<_;g++){const m=c.getX(g);mo.fromBufferAttribute(u,m),Bh(mo,m,l,s,e,t,this)}}else{const d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let g=d,_=f;g<_;g++)mo.fromBufferAttribute(u,g),Bh(mo,g,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Bh(i,e,t,n,s,r,o){const a=Yl.distanceSqToPoint(i);if(a<t){const l=new b;Yl.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class yd extends Pt{constructor(e,t,n,s,r,o,a,l,c){super(e,t,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Md extends Pt{constructor(e,t,n=Qi,s,r,o,a=Qt,l=Qt,c,h=Cr,u=1){if(h!==Cr&&h!==Pr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:u};super(d,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ec(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Sd extends Pt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Pc extends Lt{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],o=[],a=[],l=[],c=new b,h=new de;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){const f=n+u/t*s;c.x=e*Math.cos(f),c.y=e*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[d]/e+1)/2,h.y=(o[d+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new pt(o,3)),this.setAttribute("normal",new pt(a,3)),this.setAttribute("uv",new pt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pc(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Bt extends Lt{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],d=[],f=[];let g=0;const _=[],m=n/2;let p=0;S(),o===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new pt(u,3)),this.setAttribute("normal",new pt(d,3)),this.setAttribute("uv",new pt(f,2));function S(){const M=new b,C=new b;let P=0;const R=(t-e)/n;for(let T=0;T<=r;T++){const v=[],x=T/r,A=x*(t-e)+e;for(let D=0;D<=s;D++){const U=D/s,L=U*l+a,k=Math.sin(L),O=Math.cos(L);C.x=A*k,C.y=-x*n+m,C.z=A*O,u.push(C.x,C.y,C.z),M.set(k,R,O).normalize(),d.push(M.x,M.y,M.z),f.push(U,1-x),v.push(g++)}_.push(v)}for(let T=0;T<s;T++)for(let v=0;v<r;v++){const x=_[v][T],A=_[v+1][T],D=_[v+1][T+1],U=_[v][T+1];(e>0||v!==0)&&(h.push(x,A,U),P+=3),(t>0||v!==r-1)&&(h.push(A,D,U),P+=3)}c.addGroup(p,P,0),p+=P}function y(M){const C=g,P=new de,R=new b;let T=0;const v=M===!0?e:t,x=M===!0?1:-1;for(let D=1;D<=s;D++)u.push(0,m*x,0),d.push(0,x,0),f.push(.5,.5),g++;const A=g;for(let D=0;D<=s;D++){const L=D/s*l+a,k=Math.cos(L),O=Math.sin(L);R.x=v*O,R.y=m*x,R.z=v*k,u.push(R.x,R.y,R.z),d.push(0,x,0),P.x=k*.5+.5,P.y=O*.5*x+.5,f.push(P.x,P.y),g++}for(let D=0;D<s;D++){const U=C+D,L=A+D;M===!0?h.push(L,L+1,U):h.push(L+1,L,U),T+=3}c.addGroup(p,T,M===!0?1:2),p+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class di{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let s=0;const r=n.length;let o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);const h=n[s],d=n[s+1]-h,f=(o-h)/d;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=t||(o.isVector2?new de:new b);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new b,s=[],r=[],o=[],a=new b,l=new Ue;for(let f=0;f<=e;f++){const g=f/e;s[f]=this.getTangentAt(g,new b)}r[0]=new b,o[0]=new b;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(He(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,g))}o[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(He(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class wd extends di{constructor(e=0,t=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new de){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class jp extends wd{constructor(e,t,n,s,r,o){super(e,t,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Dc(){let i=0,e=0,t=0,n=0;function s(r,o,a,l){i=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,s(o,a,d,f)},calc:function(r){const o=r*r,a=o*r;return i+e*r+t*o+n*a}}}const go=new b,La=new Dc,Na=new Dc,Ua=new Dc;class bd extends di{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new b){const n=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(go.subVectors(s[0],s[1]).add(s[0]),c=go);const u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(go.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=go),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),La.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,_,m),Na.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,_,m),Ua.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(La.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),Na.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Ua.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(La.calc(l),Na.calc(l),Ua.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new b().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function zh(i,e,t,n,s){const r=(n-e)*.5,o=(s-t)*.5,a=i*i,l=i*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*i+t}function qp(i,e){const t=1-i;return t*t*e}function Kp(i,e){return 2*(1-i)*i*e}function Yp(i,e){return i*i*e}function vr(i,e,t,n){return qp(i,e)+Kp(i,t)+Yp(i,n)}function $p(i,e){const t=1-i;return t*t*t*e}function Zp(i,e){const t=1-i;return 3*t*t*i*e}function Jp(i,e){return 3*(1-i)*i*i*e}function Qp(i,e){return i*i*i*e}function xr(i,e,t,n,s){return $p(i,e)+Zp(i,t)+Jp(i,n)+Qp(i,s)}class em extends di{constructor(e=new de,t=new de,n=new de,s=new de){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new de){const n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(xr(e,s.x,r.x,o.x,a.x),xr(e,s.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class tm extends di{constructor(e=new b,t=new b,n=new b,s=new b){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new b){const n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(xr(e,s.x,r.x,o.x,a.x),xr(e,s.y,r.y,o.y,a.y),xr(e,s.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class nm extends di{constructor(e=new de,t=new de){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new de){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new de){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class im extends di{constructor(e=new b,t=new b){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new b){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new b){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class sm extends di{constructor(e=new de,t=new de,n=new de){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new de){const n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(vr(e,s.x,r.x,o.x),vr(e,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ed extends di{constructor(e=new b,t=new b,n=new b){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new b){const n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(vr(e,s.x,r.x,o.x),vr(e,s.y,r.y,o.y),vr(e,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class rm extends di{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new de){const n=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(zh(a,l.x,c.x,h.x,u.x),zh(a,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new de().fromArray(s))}return this}}var om=Object.freeze({__proto__:null,ArcCurve:jp,CatmullRomCurve3:bd,CubicBezierCurve:em,CubicBezierCurve3:tm,EllipseCurve:wd,LineCurve:nm,LineCurve3:im,QuadraticBezierCurve:sm,QuadraticBezierCurve3:Ed,SplineCurve:rm});class Li extends Lt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,u=e/a,d=t/l,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const S=p*d-o;for(let y=0;y<c;y++){const M=y*u-r;g.push(M,-S,0),_.push(0,0,1),m.push(y/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let S=0;S<a;S++){const y=S+c*p,M=S+c*(p+1),C=S+1+c*(p+1),P=S+1+c*p;f.push(y,M,P),f.push(M,C,P)}this.setIndex(f),this.setAttribute("position",new pt(g,3)),this.setAttribute("normal",new pt(_,3)),this.setAttribute("uv",new pt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Li(e.width,e.height,e.widthSegments,e.heightSegments)}}class ci extends Lt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new b,d=new b,f=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const S=[],y=p/n;let M=0;p===0&&o===0?M=.5/t:p===n&&l===Math.PI&&(M=-.5/t);for(let C=0;C<=t;C++){const P=C/t;u.x=-e*Math.cos(s+P*r)*Math.sin(o+y*a),u.y=e*Math.cos(o+y*a),u.z=e*Math.sin(s+P*r)*Math.sin(o+y*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),m.push(P+M,1-y),S.push(c++)}h.push(S)}for(let p=0;p<n;p++)for(let S=0;S<t;S++){const y=h[p][S+1],M=h[p][S],C=h[p+1][S],P=h[p+1][S+1];(p!==0||o>0)&&f.push(y,M,P),(p!==n-1||l<Math.PI)&&f.push(M,C,P)}this.setIndex(f),this.setAttribute("position",new pt(g,3)),this.setAttribute("normal",new pt(_,3)),this.setAttribute("uv",new pt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ci(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class wn extends Lt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],l=[],c=[],h=new b,u=new b,d=new b;for(let f=0;f<=n;f++)for(let g=0;g<=s;g++){const _=g/s*r,m=f/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(_),u.y=(e+t*Math.cos(m))*Math.sin(_),u.z=t*Math.sin(m),a.push(u.x,u.y,u.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(g/s),c.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=s;g++){const _=(s+1)*f+g-1,m=(s+1)*(f-1)+g-1,p=(s+1)*(f-1)+g,S=(s+1)*f+g;o.push(_,m,S),o.push(m,p,S)}this.setIndex(o),this.setAttribute("position",new pt(a,3)),this.setAttribute("normal",new pt(l,3)),this.setAttribute("uv",new pt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wn(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Ic extends Lt{constructor(e=new Ed(new b(-1,-1,0),new b(-1,1,0),new b(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};const o=e.computeFrenetFrames(t,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new b,l=new b,c=new de;let h=new b;const u=[],d=[],f=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new pt(u,3)),this.setAttribute("normal",new pt(d,3)),this.setAttribute("uv",new pt(f,2));function _(){for(let y=0;y<t;y++)m(y);m(r===!1?t:0),S(),p()}function m(y){h=e.getPointAt(y/t,h);const M=o.normals[y],C=o.binormals[y];for(let P=0;P<=s;P++){const R=P/s*Math.PI*2,T=Math.sin(R),v=-Math.cos(R);l.x=v*M.x+T*C.x,l.y=v*M.y+T*C.y,l.z=v*M.z+T*C.z,l.normalize(),d.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,u.push(a.x,a.y,a.z)}}function p(){for(let y=1;y<=t;y++)for(let M=1;M<=s;M++){const C=(s+1)*(y-1)+(M-1),P=(s+1)*y+(M-1),R=(s+1)*y+M,T=(s+1)*(y-1)+M;g.push(C,P,T),g.push(P,R,T)}}function S(){for(let y=0;y<=t;y++)for(let M=0;M<=s;M++)c.x=y/t,c.y=M/s,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Ic(new om[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class Vh extends li{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class hi extends In{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ce(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ce(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=wc,this.normalScale=new de(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Sn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class dn extends hi{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new de(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return He(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ce(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ce(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ce(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class am extends In{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ce(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ce(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=wc,this.normalScale=new de(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Sn,this.combine=mc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class lm extends In{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=kf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class cm extends In{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class hm extends Cc{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}function _o(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function um(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function dm(i){function e(s,r){return i[s]-i[r]}const t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function Hh(i,e,t){const n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){const a=t[r]*e;for(let l=0;l!==e;++l)s[o++]=i[a+l]}return s}function Td(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push(...o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=i[s++];while(r!==void 0)}class Hr{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break e}o=t.length;break t}if(!(e>=r)){const a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class fm extends Hr{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:nh,endingEnd:nh}}intervalChanged_(e,t,n){const s=this.parameterPositions;let r=e-2,o=e+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case ih:r=e,a=2*t-n;break;case sh:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case ih:o=e,l=2*n-t;break;case sh:o=1,l=n+s[1]-s[0];break;default:o=e-1,l=t}const c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(s-t),_=g*g,m=_*g,p=-d*m+2*d*_-d*g,S=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*g+1,y=(-1-f)*m+(1.5+f)*_+.5*g,M=f*m-f*_;for(let C=0;C!==a;++C)r[C]=p*o[h+C]+S*o[c+C]+y*o[l+C]+M*o[u+C];return r}}class pm extends Hr{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(s-t),u=1-h;for(let d=0;d!==a;++d)r[d]=o[c+d]*u+o[l+d]*h;return r}}class mm extends Hr{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class Nn{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=_o(t,this.TimeBufferType),this.values=_o(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:_o(e.times,Array),values:_o(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new mm(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new pm(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new fm(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Dr:t=this.InterpolantFactoryMethodDiscrete;break;case Ir:t=this.InterpolantFactoryMethodLinear;break;case aa:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Dr;case this.InterpolantFactoryMethodLinear:return Ir;case this.InterpolantFactoryMethodSmooth:return aa}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){const n=this.times,s=n.length;let r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(s!==void 0&&um(s))for(let a=0,l=s.length;a!==l;++a){const c=s[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===aa,r=e.length-1;let o=1;for(let a=1;a<r;++a){let l=!1;const c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(s)l=!0;else{const u=a*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){const _=t[u+g];if(_!==t[d+g]||_!==t[f+g]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const u=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}}Nn.prototype.ValueTypeName="";Nn.prototype.TimeBufferType=Float32Array;Nn.prototype.ValueBufferType=Float32Array;Nn.prototype.DefaultInterpolation=Ir;class qs extends Nn{constructor(e,t,n){super(e,t,n)}}qs.prototype.ValueTypeName="bool";qs.prototype.ValueBufferType=Array;qs.prototype.DefaultInterpolation=Dr;qs.prototype.InterpolantFactoryMethodLinear=void 0;qs.prototype.InterpolantFactoryMethodSmooth=void 0;class Ad extends Nn{constructor(e,t,n,s){super(e,t,n,s)}}Ad.prototype.ValueTypeName="color";class Vs extends Nn{constructor(e,t,n,s){super(e,t,n,s)}}Vs.prototype.ValueTypeName="number";class gm extends Hr{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(s-t);let c=e*a;for(let h=c+a;c!==h;c+=4)Fe.slerpFlat(r,0,o,c-a,o,c,l);return r}}class Hs extends Nn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new gm(this.times,this.values,this.getValueSize(),e)}}Hs.prototype.ValueTypeName="quaternion";Hs.prototype.InterpolantFactoryMethodSmooth=void 0;class Ks extends Nn{constructor(e,t,n){super(e,t,n)}}Ks.prototype.ValueTypeName="string";Ks.prototype.ValueBufferType=Array;Ks.prototype.DefaultInterpolation=Dr;Ks.prototype.InterpolantFactoryMethodLinear=void 0;Ks.prototype.InterpolantFactoryMethodSmooth=void 0;class Gs extends Nn{constructor(e,t,n,s){super(e,t,n,s)}}Gs.prototype.ValueTypeName="vector";class _m{constructor(e="",t=-1,n=[],s=Ff){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=Dn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,s=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(xm(n[o]).scale(s));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){const t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,o=n.length;r!==o;++r)t.push(Nn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){const r=t.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);const h=dm(l);l=Hh(l,1,h),c=Hh(c,1,h),!s&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new Vs(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],h=c.name.match(r);if(h&&h.length>1){const u=h[1];let d=s[u];d||(s[u]=d=[]),d.push(c)}}const o=[];for(const a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],t,n));return o}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,g,_){if(f.length!==0){const m=[],p=[];Td(f,m,p,g),m.length!==0&&_.push(new u(d,m,p))}},s=[],r=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let _=0;_<d[g].morphTargets.length;_++)f[d[g].morphTargets[_]]=-1;for(const _ in f){const m=[],p=[];for(let S=0;S!==d[g].morphTargets.length;++S){const y=d[g];m.push(y.time),p.push(y.morphTarget===_?1:0)}s.push(new Vs(".morphTargetInfluence["+_+"]",m,p))}l=f.length*o}else{const f=".bones["+t[u].name+"]";n(Gs,f+".position",d,"pos",s),n(Hs,f+".quaternion",d,"rot",s),n(Gs,f+".scale",d,"scl",s)}}return s.length===0?null:new this(r,l,s,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,s=e.length;n!==s;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function vm(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Vs;case"vector":case"vector2":case"vector3":case"vector4":return Gs;case"color":return Ad;case"quaternion":return Hs;case"bool":case"boolean":return qs;case"string":return Ks}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function xm(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=vm(i.type);if(i.times===void 0){const t=[],n=[];Td(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const si={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class ym{constructor(e,t,n){const s=this;let r=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}}const Mm=new ym;class Ys{constructor(e){this.manager=e!==void 0?e:Mm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Ys.DEFAULT_MATERIAL_NAME="__DEFAULT";const Zn={};class Sm extends Error{constructor(e,t){super(e),this.response=t}}class Rd extends Ys{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=si.get(`file:${e}`);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Zn[e]!==void 0){Zn[e].push({onLoad:t,onProgress:n,onError:s});return}Zn[e]=[],Zn[e].push({onLoad:t,onProgress:n,onError:s});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=Zn[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0;let _=0;const m=new ReadableStream({start(p){S();function S(){u.read().then(({done:y,value:M})=>{if(y)p.close();else{_+=M.byteLength;const C=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:f});for(let P=0,R=h.length;P<R;P++){const T=h[P];T.onProgress&&T.onProgress(C)}p.enqueue(M),S()}},y=>{p.error(y)})}}});return new Response(m)}else throw new Sm(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a==="")return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{si.add(`file:${e}`,c);const h=Zn[e];delete Zn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=Zn[e];if(h===void 0)throw this.manager.itemError(e),c;delete Zn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const vs=new WeakMap;class wm extends Ys{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=si.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);else{let u=vs.get(o);u===void 0&&(u=[],vs.set(o,u)),u.push({onLoad:t,onError:s})}return o}const a=Lr("img");function l(){h(),t&&t(this);const u=vs.get(this)||[];for(let d=0;d<u.length;d++){const f=u[d];f.onLoad&&f.onLoad(this)}vs.delete(this),r.manager.itemEnd(e)}function c(u){h(),s&&s(u),si.remove(`image:${e}`);const d=vs.get(this)||[];for(let f=0;f<d.length;f++){const g=d[f];g.onError&&g.onError(u)}vs.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),si.add(`image:${e}`,a),r.manager.itemStart(e),a.src=e,a}}class bm extends Ys{constructor(e){super(e)}load(e,t,n,s){const r=new Pt,o=new wm(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class ea extends ht{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ce(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Gh extends ea{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ht.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ce(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Fa=new Ue,Wh=new b,Xh=new b;class Lc{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new de(512,512),this.mapType=Ln,this.map=null,this.mapPass=null,this.matrix=new Ue,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Rc,this._frameExtents=new de(1,1),this._viewportCount=1,this._viewports=[new et(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Wh.setFromMatrixPosition(e.matrixWorld),t.position.copy(Wh),Xh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Xh),t.updateMatrixWorld(),Fa.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Fa,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Fa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Em extends Lc{constructor(){super(new Wt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=Bs*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Cd extends ea{constructor(e,t,n=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ht.DEFAULT_UP),this.updateMatrix(),this.target=new ht,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Em}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const jh=new Ue,rr=new b,Oa=new b;class Tm extends Lc{constructor(){super(new Wt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new de(4,2),this._viewportCount=6,this._viewports=[new et(2,1,1,1),new et(0,1,1,1),new et(3,1,1,1),new et(1,1,1,1),new et(3,0,1,1),new et(1,0,1,1)],this._cubeDirections=[new b(1,0,0),new b(-1,0,0),new b(0,0,1),new b(0,0,-1),new b(0,1,0),new b(0,-1,0)],this._cubeUps=[new b(0,1,0),new b(0,1,0),new b(0,1,0),new b(0,1,0),new b(0,0,1),new b(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),rr.setFromMatrixPosition(e.matrixWorld),n.position.copy(rr),Oa.copy(n.position),Oa.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Oa),n.updateMatrixWorld(),s.makeTranslation(-rr.x,-rr.y,-rr.z),jh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(jh,n.coordinateSystem,n.reversedDepth)}}class Pd extends ea{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Tm}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class ta extends fd{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Am extends Lc{constructor(){super(new ta(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class $l extends ea{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ht.DEFAULT_UP),this.updateMatrix(),this.target=new ht,this.shadow=new Am}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class yr{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const ka=new WeakMap;class Rm extends Ys{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=si.get(`image-bitmap:${e}`);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(c=>{if(ka.has(o)===!0)s&&s(ka.get(o)),r.manager.itemError(e),r.manager.itemEnd(e);else return t&&t(c),r.manager.itemEnd(e),c});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return si.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){s&&s(c),ka.set(l,c),si.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});si.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class Cm extends Wt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Nc="\\[\\]\\.:\\/",Pm=new RegExp("["+Nc+"]","g"),Uc="[^"+Nc+"]",Dm="[^"+Nc.replace("\\.","")+"]",Im=/((?:WC+[\/:])*)/.source.replace("WC",Uc),Lm=/(WCOD+)?/.source.replace("WCOD",Dm),Nm=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Uc),Um=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Uc),Fm=new RegExp("^"+Im+Lm+Nm+Um+"$"),Om=["material","materials","bones","map"];class km{constructor(e,t,n){const s=n||rt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class rt{constructor(e,t,n){this.path=t,this.parsedPath=n||rt.parseTrackName(t),this.node=rt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new rt.Composite(e,t,n):new rt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Pm,"")}static parseTrackName(e){const t=Fm.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=n.nodeName.substring(s+1);Om.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,s=t.propertyName;let r=t.propertyIndex;if(e||(e=rt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[s];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}rt.Composite=km;rt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};rt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};rt.prototype.GetterByBindingType=[rt.prototype._getValue_direct,rt.prototype._getValue_array,rt.prototype._getValue_arrayElement,rt.prototype._getValue_toArray];rt.prototype.SetterByBindingTypeAndVersioning=[[rt.prototype._setValue_direct,rt.prototype._setValue_direct_setNeedsUpdate,rt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[rt.prototype._setValue_array,rt.prototype._setValue_array_setNeedsUpdate,rt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[rt.prototype._setValue_arrayElement,rt.prototype._setValue_arrayElement_setNeedsUpdate,rt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[rt.prototype._setValue_fromArray,rt.prototype._setValue_fromArray_setNeedsUpdate,rt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class qh{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=He(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(He(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Bm extends ns{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Kh(i,e,t,n){const s=zm(n);switch(t){case td:return i*e;case xc:return i*e/s.components*s.byteLength;case yc:return i*e/s.components*s.byteLength;case id:return i*e*2/s.components*s.byteLength;case Mc:return i*e*2/s.components*s.byteLength;case nd:return i*e*3/s.components*s.byteLength;case Mn:return i*e*4/s.components*s.byteLength;case Sc:return i*e*4/s.components*s.byteLength;case Ro:case Co:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Po:case Do:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case vl:case yl:return Math.max(i,16)*Math.max(e,8)/4;case _l:case xl:return Math.max(i,8)*Math.max(e,8)/2;case Ml:case Sl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case wl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case bl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case El:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Tl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Al:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Rl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Cl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Pl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Dl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Il:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Ll:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Nl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Ul:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Fl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Ol:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case kl:case Bl:case zl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Vl:case Hl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Gl:case Wl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function zm(i){switch(i){case Ln:case Zu:return{byteLength:1,components:1};case Ar:case Ju:case js:return{byteLength:2,components:1};case _c:case vc:return{byteLength:2,components:4};case Qi:case gc:case Cn:return{byteLength:4,components:1};case Qu:case ed:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:pc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=pc);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Dd(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Vm(i){const e=new WeakMap;function t(a,l){const c=a.array,h=a.usage,u=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l.updateRanges;if(i.bindBuffer(c,a),u.length===0)i.bufferSubData(c,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){const g=u[d],_=u[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){const _=u[f];i.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(i.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var Hm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Gm=`#ifdef USE_ALPHAHASH
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
#endif`,Wm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Xm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,jm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,qm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Km=`#ifdef USE_AOMAP
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
#endif`,Ym=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,$m=`#ifdef USE_BATCHING
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
#endif`,Zm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Jm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Qm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,e0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,t0=`#ifdef USE_IRIDESCENCE
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
#endif`,n0=`#ifdef USE_BUMPMAP
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
#endif`,i0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,s0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,r0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,o0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,a0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,l0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,c0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,h0=`#if defined( USE_COLOR_ALPHA )
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
#endif`,u0=`#define PI 3.141592653589793
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
} // validated`,d0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,f0=`vec3 transformedNormal = objectNormal;
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
#endif`,p0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,m0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,g0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,_0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,v0="gl_FragColor = linearToOutputTexel( gl_FragColor );",x0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,y0=`#ifdef USE_ENVMAP
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
#endif`,M0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,S0=`#ifdef USE_ENVMAP
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
#endif`,w0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,b0=`#ifdef USE_ENVMAP
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
#endif`,E0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,T0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,A0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,R0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,C0=`#ifdef USE_GRADIENTMAP
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
}`,P0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,D0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,I0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,L0=`uniform bool receiveShadow;
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
#endif`,N0=`#ifdef USE_ENVMAP
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
#endif`,U0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,F0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,O0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,k0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,B0=`PhysicalMaterial material;
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
#endif`,z0=`struct PhysicalMaterial {
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
}`,V0=`
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
#endif`,H0=`#if defined( RE_IndirectDiffuse )
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
#endif`,G0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,W0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,X0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,j0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,q0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,K0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Y0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,$0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Z0=`#if defined( USE_POINTS_UV )
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
#endif`,J0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Q0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,eg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,tg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ng=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ig=`#ifdef USE_MORPHTARGETS
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
#endif`,sg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,rg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,og=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,ag=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,cg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,hg=`#ifdef USE_NORMALMAP
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
#endif`,ug=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,dg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,fg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,pg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,mg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,gg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,_g=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,vg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,xg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,yg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Mg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Sg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,wg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,bg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Eg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Tg=`float getShadowMask() {
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
}`,Ag=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Rg=`#ifdef USE_SKINNING
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
#endif`,Cg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Pg=`#ifdef USE_SKINNING
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
#endif`,Dg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ig=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Lg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ng=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ug=`#ifdef USE_TRANSMISSION
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
#endif`,Fg=`#ifdef USE_TRANSMISSION
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
#endif`,Og=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,kg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Bg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,zg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Vg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Hg=`uniform sampler2D t2D;
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
}`,Gg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Wg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Xg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qg=`#include <common>
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
}`,Kg=`#if DEPTH_PACKING == 3200
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
}`,Yg=`#define DISTANCE
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
}`,$g=`#define DISTANCE
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
}`,Zg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Jg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qg=`uniform float scale;
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
}`,e_=`uniform vec3 diffuse;
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
}`,t_=`#include <common>
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
}`,n_=`uniform vec3 diffuse;
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
}`,i_=`#define LAMBERT
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
}`,s_=`#define LAMBERT
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
}`,r_=`#define MATCAP
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
}`,o_=`#define MATCAP
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
}`,a_=`#define NORMAL
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
}`,l_=`#define NORMAL
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
}`,c_=`#define PHONG
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
}`,h_=`#define PHONG
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
}`,u_=`#define STANDARD
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
}`,d_=`#define STANDARD
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
}`,f_=`#define TOON
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
}`,p_=`#define TOON
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
}`,m_=`uniform float size;
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
}`,g_=`uniform vec3 diffuse;
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
}`,__=`#include <common>
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
}`,v_=`uniform vec3 color;
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
}`,x_=`uniform float rotation;
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
}`,y_=`uniform vec3 diffuse;
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
}`,We={alphahash_fragment:Hm,alphahash_pars_fragment:Gm,alphamap_fragment:Wm,alphamap_pars_fragment:Xm,alphatest_fragment:jm,alphatest_pars_fragment:qm,aomap_fragment:Km,aomap_pars_fragment:Ym,batching_pars_vertex:$m,batching_vertex:Zm,begin_vertex:Jm,beginnormal_vertex:Qm,bsdfs:e0,iridescence_fragment:t0,bumpmap_pars_fragment:n0,clipping_planes_fragment:i0,clipping_planes_pars_fragment:s0,clipping_planes_pars_vertex:r0,clipping_planes_vertex:o0,color_fragment:a0,color_pars_fragment:l0,color_pars_vertex:c0,color_vertex:h0,common:u0,cube_uv_reflection_fragment:d0,defaultnormal_vertex:f0,displacementmap_pars_vertex:p0,displacementmap_vertex:m0,emissivemap_fragment:g0,emissivemap_pars_fragment:_0,colorspace_fragment:v0,colorspace_pars_fragment:x0,envmap_fragment:y0,envmap_common_pars_fragment:M0,envmap_pars_fragment:S0,envmap_pars_vertex:w0,envmap_physical_pars_fragment:N0,envmap_vertex:b0,fog_vertex:E0,fog_pars_vertex:T0,fog_fragment:A0,fog_pars_fragment:R0,gradientmap_pars_fragment:C0,lightmap_pars_fragment:P0,lights_lambert_fragment:D0,lights_lambert_pars_fragment:I0,lights_pars_begin:L0,lights_toon_fragment:U0,lights_toon_pars_fragment:F0,lights_phong_fragment:O0,lights_phong_pars_fragment:k0,lights_physical_fragment:B0,lights_physical_pars_fragment:z0,lights_fragment_begin:V0,lights_fragment_maps:H0,lights_fragment_end:G0,logdepthbuf_fragment:W0,logdepthbuf_pars_fragment:X0,logdepthbuf_pars_vertex:j0,logdepthbuf_vertex:q0,map_fragment:K0,map_pars_fragment:Y0,map_particle_fragment:$0,map_particle_pars_fragment:Z0,metalnessmap_fragment:J0,metalnessmap_pars_fragment:Q0,morphinstance_vertex:eg,morphcolor_vertex:tg,morphnormal_vertex:ng,morphtarget_pars_vertex:ig,morphtarget_vertex:sg,normal_fragment_begin:rg,normal_fragment_maps:og,normal_pars_fragment:ag,normal_pars_vertex:lg,normal_vertex:cg,normalmap_pars_fragment:hg,clearcoat_normal_fragment_begin:ug,clearcoat_normal_fragment_maps:dg,clearcoat_pars_fragment:fg,iridescence_pars_fragment:pg,opaque_fragment:mg,packing:gg,premultiplied_alpha_fragment:_g,project_vertex:vg,dithering_fragment:xg,dithering_pars_fragment:yg,roughnessmap_fragment:Mg,roughnessmap_pars_fragment:Sg,shadowmap_pars_fragment:wg,shadowmap_pars_vertex:bg,shadowmap_vertex:Eg,shadowmask_pars_fragment:Tg,skinbase_vertex:Ag,skinning_pars_vertex:Rg,skinning_vertex:Cg,skinnormal_vertex:Pg,specularmap_fragment:Dg,specularmap_pars_fragment:Ig,tonemapping_fragment:Lg,tonemapping_pars_fragment:Ng,transmission_fragment:Ug,transmission_pars_fragment:Fg,uv_pars_fragment:Og,uv_pars_vertex:kg,uv_vertex:Bg,worldpos_vertex:zg,background_vert:Vg,background_frag:Hg,backgroundCube_vert:Gg,backgroundCube_frag:Wg,cube_vert:Xg,cube_frag:jg,depth_vert:qg,depth_frag:Kg,distanceRGBA_vert:Yg,distanceRGBA_frag:$g,equirect_vert:Zg,equirect_frag:Jg,linedashed_vert:Qg,linedashed_frag:e_,meshbasic_vert:t_,meshbasic_frag:n_,meshlambert_vert:i_,meshlambert_frag:s_,meshmatcap_vert:r_,meshmatcap_frag:o_,meshnormal_vert:a_,meshnormal_frag:l_,meshphong_vert:c_,meshphong_frag:h_,meshphysical_vert:u_,meshphysical_frag:d_,meshtoon_vert:f_,meshtoon_frag:p_,points_vert:m_,points_frag:g_,shadow_vert:__,shadow_frag:v_,sprite_vert:x_,sprite_frag:y_},ae={common:{diffuse:{value:new Ce(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ze}},envmap:{envMap:{value:null},envMapRotation:{value:new ze},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ze},normalScale:{value:new de(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ce(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ce(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0},uvTransform:{value:new ze}},sprite:{diffuse:{value:new Ce(16777215)},opacity:{value:1},center:{value:new de(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}}},kn={basic:{uniforms:Yt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:Yt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new Ce(0)}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:Yt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new Ce(0)},specular:{value:new Ce(1118481)},shininess:{value:30}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:Yt([ae.common,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.roughnessmap,ae.metalnessmap,ae.fog,ae.lights,{emissive:{value:new Ce(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:Yt([ae.common,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.gradientmap,ae.fog,ae.lights,{emissive:{value:new Ce(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:Yt([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:Yt([ae.points,ae.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:Yt([ae.common,ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:Yt([ae.common,ae.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:Yt([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,{opacity:{value:1}}]),vertexShader:We.meshnormal_vert,fragmentShader:We.meshnormal_frag},sprite:{uniforms:Yt([ae.sprite,ae.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:We.background_vert,fragmentShader:We.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ze}},vertexShader:We.backgroundCube_vert,fragmentShader:We.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distanceRGBA:{uniforms:Yt([ae.common,ae.displacementmap,{referencePosition:{value:new b},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:We.distanceRGBA_vert,fragmentShader:We.distanceRGBA_frag},shadow:{uniforms:Yt([ae.lights,ae.fog,{color:{value:new Ce(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};kn.physical={uniforms:Yt([kn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ze},clearcoatNormalScale:{value:new de(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ze},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ze},sheen:{value:0},sheenColor:{value:new Ce(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ze},transmissionSamplerSize:{value:new de},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ze},attenuationDistance:{value:0},attenuationColor:{value:new Ce(0)},specularColor:{value:new Ce(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ze},anisotropyVector:{value:new de},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ze}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};const vo={r:0,b:0,g:0},Vi=new Sn,M_=new Ue;function S_(i,e,t,n,s,r,o){const a=new Ce(0);let l=r===!0?0:1,c,h,u=null,d=0,f=null;function g(y){let M=y.isScene===!0?y.background:null;return M&&M.isTexture&&(M=(y.backgroundBlurriness>0?t:e).get(M)),M}function _(y){let M=!1;const C=g(y);C===null?p(a,l):C&&C.isColor&&(p(C,1),M=!0);const P=i.xr.getEnvironmentBlendMode();P==="additive"?n.buffers.color.setClear(0,0,0,1,o):P==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(y,M){const C=g(M);C&&(C.isCubeTexture||C.mapping===Jo)?(h===void 0&&(h=new qe(new Ni(1,1,1),new li({name:"BackgroundCubeMaterial",uniforms:zs(kn.backgroundCube.uniforms),vertexShader:kn.backgroundCube.vertexShader,fragmentShader:kn.backgroundCube.fragmentShader,side:Xt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(P,R,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Vi.copy(M.backgroundRotation),Vi.x*=-1,Vi.y*=-1,Vi.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(Vi.y*=-1,Vi.z*=-1),h.material.uniforms.envMap.value=C,h.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(M_.makeRotationFromEuler(Vi)),h.material.toneMapped=Je.getTransfer(C.colorSpace)!==at,(u!==C||d!==C.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=C,d=C.version,f=i.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):C&&C.isTexture&&(c===void 0&&(c=new qe(new Li(2,2),new li({name:"BackgroundMaterial",uniforms:zs(kn.background.uniforms),vertexShader:kn.background.vertexShader,fragmentShader:kn.background.fragmentShader,side:ai,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=C,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=Je.getTransfer(C.colorSpace)!==at,C.matrixAutoUpdate===!0&&C.updateMatrix(),c.material.uniforms.uvTransform.value.copy(C.matrix),(u!==C||d!==C.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=C,d=C.version,f=i.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function p(y,M){y.getRGB(vo,dd(i)),n.buffers.color.setClear(vo.r,vo.g,vo.b,M,o)}function S(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,M=1){a.set(y),l=M,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,p(a,l)},render:_,addToRenderList:m,dispose:S}}function w_(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,o=!1;function a(x,A,D,U,L){let k=!1;const O=u(U,D,A);r!==O&&(r=O,c(r.object)),k=f(x,U,D,L),k&&g(x,U,D,L),L!==null&&e.update(L,i.ELEMENT_ARRAY_BUFFER),(k||o)&&(o=!1,M(x,A,D,U),L!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(L).buffer))}function l(){return i.createVertexArray()}function c(x){return i.bindVertexArray(x)}function h(x){return i.deleteVertexArray(x)}function u(x,A,D){const U=D.wireframe===!0;let L=n[x.id];L===void 0&&(L={},n[x.id]=L);let k=L[A.id];k===void 0&&(k={},L[A.id]=k);let O=k[U];return O===void 0&&(O=d(l()),k[U]=O),O}function d(x){const A=[],D=[],U=[];for(let L=0;L<t;L++)A[L]=0,D[L]=0,U[L]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:A,enabledAttributes:D,attributeDivisors:U,object:x,attributes:{},index:null}}function f(x,A,D,U){const L=r.attributes,k=A.attributes;let O=0;const K=D.getAttributes();for(const V in K)if(K[V].location>=0){const ne=L[V];let ue=k[V];if(ue===void 0&&(V==="instanceMatrix"&&x.instanceMatrix&&(ue=x.instanceMatrix),V==="instanceColor"&&x.instanceColor&&(ue=x.instanceColor)),ne===void 0||ne.attribute!==ue||ue&&ne.data!==ue.data)return!0;O++}return r.attributesNum!==O||r.index!==U}function g(x,A,D,U){const L={},k=A.attributes;let O=0;const K=D.getAttributes();for(const V in K)if(K[V].location>=0){let ne=k[V];ne===void 0&&(V==="instanceMatrix"&&x.instanceMatrix&&(ne=x.instanceMatrix),V==="instanceColor"&&x.instanceColor&&(ne=x.instanceColor));const ue={};ue.attribute=ne,ne&&ne.data&&(ue.data=ne.data),L[V]=ue,O++}r.attributes=L,r.attributesNum=O,r.index=U}function _(){const x=r.newAttributes;for(let A=0,D=x.length;A<D;A++)x[A]=0}function m(x){p(x,0)}function p(x,A){const D=r.newAttributes,U=r.enabledAttributes,L=r.attributeDivisors;D[x]=1,U[x]===0&&(i.enableVertexAttribArray(x),U[x]=1),L[x]!==A&&(i.vertexAttribDivisor(x,A),L[x]=A)}function S(){const x=r.newAttributes,A=r.enabledAttributes;for(let D=0,U=A.length;D<U;D++)A[D]!==x[D]&&(i.disableVertexAttribArray(D),A[D]=0)}function y(x,A,D,U,L,k,O){O===!0?i.vertexAttribIPointer(x,A,D,L,k):i.vertexAttribPointer(x,A,D,U,L,k)}function M(x,A,D,U){_();const L=U.attributes,k=D.getAttributes(),O=A.defaultAttributeValues;for(const K in k){const V=k[K];if(V.location>=0){let Y=L[K];if(Y===void 0&&(K==="instanceMatrix"&&x.instanceMatrix&&(Y=x.instanceMatrix),K==="instanceColor"&&x.instanceColor&&(Y=x.instanceColor)),Y!==void 0){const ne=Y.normalized,ue=Y.itemSize,Ae=e.get(Y);if(Ae===void 0)continue;const Qe=Ae.buffer,tt=Ae.type,je=Ae.bytesPerElement,j=tt===i.INT||tt===i.UNSIGNED_INT||Y.gpuType===gc;if(Y.isInterleavedBufferAttribute){const Z=Y.data,me=Z.stride,Ne=Y.offset;if(Z.isInstancedInterleavedBuffer){for(let be=0;be<V.locationSize;be++)p(V.location+be,Z.meshPerAttribute);x.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let be=0;be<V.locationSize;be++)m(V.location+be);i.bindBuffer(i.ARRAY_BUFFER,Qe);for(let be=0;be<V.locationSize;be++)y(V.location+be,ue/V.locationSize,tt,ne,me*je,(Ne+ue/V.locationSize*be)*je,j)}else{if(Y.isInstancedBufferAttribute){for(let Z=0;Z<V.locationSize;Z++)p(V.location+Z,Y.meshPerAttribute);x.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let Z=0;Z<V.locationSize;Z++)m(V.location+Z);i.bindBuffer(i.ARRAY_BUFFER,Qe);for(let Z=0;Z<V.locationSize;Z++)y(V.location+Z,ue/V.locationSize,tt,ne,ue*je,ue/V.locationSize*Z*je,j)}}else if(O!==void 0){const ne=O[K];if(ne!==void 0)switch(ne.length){case 2:i.vertexAttrib2fv(V.location,ne);break;case 3:i.vertexAttrib3fv(V.location,ne);break;case 4:i.vertexAttrib4fv(V.location,ne);break;default:i.vertexAttrib1fv(V.location,ne)}}}}S()}function C(){T();for(const x in n){const A=n[x];for(const D in A){const U=A[D];for(const L in U)h(U[L].object),delete U[L];delete A[D]}delete n[x]}}function P(x){if(n[x.id]===void 0)return;const A=n[x.id];for(const D in A){const U=A[D];for(const L in U)h(U[L].object),delete U[L];delete A[D]}delete n[x.id]}function R(x){for(const A in n){const D=n[A];if(D[x.id]===void 0)continue;const U=D[x.id];for(const L in U)h(U[L].object),delete U[L];delete D[x.id]}}function T(){v(),o=!0,r!==s&&(r=s,c(r.object))}function v(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:T,resetDefaultState:v,dispose:C,releaseStatesOfGeometry:P,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:m,disableUnusedAttributes:S}}function b_(i,e,t){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),t.update(h,n,1)}function o(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),t.update(h,n,u))}function a(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];t.update(f,n,1)}function l(c,h,u,d){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)o(c[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*d[_];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function E_(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(R){return!(R!==Mn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){const T=R===js&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==Ln&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Cn&&!T)}function l(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,P=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:S,maxVaryings:y,maxFragmentUniforms:M,vertexTextures:C,maxSamples:P}}function T_(i){const e=this;let t=null,n=0,s=!1,r=!1;const o=new wi,a=new ze,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{const S=r?0:n,y=S*4;let M=p.clippingState||null;l.value=M,M=h(g,d,y,f);for(let C=0;C!==y;++C)M[C]=t[C];p.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=f+_*4,S=d.matrixWorldInverse;a.getNormalMatrix(S),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,M=f;y!==_;++y,M+=4)o.copy(u[y]).applyMatrix4(S,a),o.normal.toArray(m,M),m[M+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function A_(i){let e=new WeakMap;function t(o,a){return a===ml?o.mapping=Os:a===gl&&(o.mapping=ks),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===ml||a===gl)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Lp(l.height);return c.fromEquirectangularTexture(i,o),e.set(o,c),o.addEventListener("dispose",s),t(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const As=4,Yh=[.125,.215,.35,.446,.526,.582],Yi=20,Ba=new ta,$h=new Ce;let za=null,Va=0,Ha=0,Ga=!1;const qi=(1+Math.sqrt(5))/2,xs=1/qi,Zh=[new b(-qi,xs,0),new b(qi,xs,0),new b(-xs,0,qi),new b(xs,0,qi),new b(0,qi,-xs),new b(0,qi,xs),new b(-1,1,-1),new b(1,1,-1),new b(-1,1,1),new b(1,1,1)],R_=new b;class Zl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,r={}){const{size:o=256,position:a=R_}=r;za=this._renderer.getRenderTarget(),Va=this._renderer.getActiveCubeFace(),Ha=this._renderer.getActiveMipmapLevel(),Ga=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=eu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Qh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(za,Va,Ha),this._renderer.xr.enabled=Ga,e.scissorTest=!1,xo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Os||e.mapping===ks?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),za=this._renderer.getRenderTarget(),Va=this._renderer.getActiveCubeFace(),Ha=this._renderer.getActiveMipmapLevel(),Ga=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Jt,minFilter:Jt,generateMipmaps:!1,type:js,format:Mn,colorSpace:jt,depthBuffer:!1},s=Jh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Jh(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=C_(r)),this._blurMaterial=P_(r,e,t)}return s}_compileMaterial(e){const t=new qe(this._lodPlanes[0],e);this._renderer.compile(t,Ba)}_sceneToCubeUV(e,t,n,s,r){const l=new Wt(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor($h),u.toneMapping=Ci,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const _=new hn({name:"PMREM.Background",side:Xt,depthWrite:!1,depthTest:!1}),m=new qe(new Ni,_);let p=!1;const S=e.background;S?S.isColor&&(_.color.copy(S),e.background=null,p=!0):(_.color.copy($h),p=!0);for(let y=0;y<6;y++){const M=y%3;M===0?(l.up.set(0,c[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[y],r.y,r.z)):M===1?(l.up.set(0,0,c[y]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[y],r.z)):(l.up.set(0,c[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[y]));const C=this._cubeSize;xo(s,M*C,y>2?C:0,C,C),u.setRenderTarget(s),p&&u.render(m,l),u.render(e,l)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=f,u.autoClear=d,e.background=S}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Os||e.mapping===ks;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=eu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Qh());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new qe(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;xo(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Ba)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Zh[(s-r-1)%Zh.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new qe(this._lodPlanes[s],c),d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Yi-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):Yi;m>Yi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Yi}`);const p=[];let S=0;for(let R=0;R<Yi;++R){const T=R/_,v=Math.exp(-T*T/2);p.push(v),R===0?S+=v:R<m&&(S+=2*v)}for(let R=0;R<p.length;R++)p[R]=p[R]/S;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:y}=this;d.dTheta.value=g,d.mipInt.value=y-n;const M=this._sizeLods[s],C=3*M*(s>y-As?s-y+As:0),P=4*(this._cubeSize-M);xo(t,C,P,3*M,2*M),l.setRenderTarget(t),l.render(u,Ba)}}function C_(i){const e=[],t=[],n=[];let s=i;const r=i-As+1+Yh.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let l=1/a;o>i-As?l=Yh[o-i+As-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,_=3,m=2,p=1,S=new Float32Array(_*g*f),y=new Float32Array(m*g*f),M=new Float32Array(p*g*f);for(let P=0;P<f;P++){const R=P%3*2/3-1,T=P>2?0:-1,v=[R,T,0,R+2/3,T,0,R+2/3,T+1,0,R,T,0,R+2/3,T+1,0,R,T+1,0];S.set(v,_*g*P),y.set(d,m*g*P);const x=[P,P,P,P,P,P];M.set(x,p*g*P)}const C=new Lt;C.setAttribute("position",new ct(S,_)),C.setAttribute("uv",new ct(y,m)),C.setAttribute("faceIndex",new ct(M,p)),e.push(C),s>As&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Jh(i,e,t){const n=new Ii(i,e,t);return n.texture.mapping=Jo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function xo(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function P_(i,e,t){const n=new Float32Array(Yi),s=new b(0,1,0);return new li({name:"SphericalGaussianBlur",defines:{n:Yi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Fc(),fragmentShader:`

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
		`,blending:Ri,depthTest:!1,depthWrite:!1})}function Qh(){return new li({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Fc(),fragmentShader:`

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
		`,blending:Ri,depthTest:!1,depthWrite:!1})}function eu(){return new li({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Fc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ri,depthTest:!1,depthWrite:!1})}function Fc(){return`

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
	`}function D_(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===ml||l===gl,h=l===Os||l===ks;if(c||h){let u=e.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new Zl(i)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return c&&f&&f.height>0||h&&f&&s(f)?(t===null&&(t=new Zl(i)),u=c?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function I_(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Nr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function L_(i,e,t,n){const s={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",o),delete s[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const f in d)e.update(d[f],i.ARRAY_BUFFER)}function c(u){const d=[],f=u.index,g=u.attributes.position;let _=0;if(f!==null){const S=f.array;_=f.version;for(let y=0,M=S.length;y<M;y+=3){const C=S[y+0],P=S[y+1],R=S[y+2];d.push(C,P,P,R,R,C)}}else if(g!==void 0){const S=g.array;_=g.version;for(let y=0,M=S.length/3-1;y<M;y+=3){const C=y+0,P=y+1,R=y+2;d.push(C,P,P,R,R,C)}}else return;const m=new(od(d)?ud:hd)(d,1);m.version=_;const p=r.get(u);p&&e.remove(p),r.set(u,m)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function N_(i,e,t){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,f){i.drawElements(n,f,r,d*o),t.update(f,n,1)}function c(d,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,d*o,g),t.update(f,n,g))}function h(d,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,n,1)}function u(d,f,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)c(d[p]/o,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,_,0,g);let p=0;for(let S=0;S<g;S++)p+=f[S]*_[S];t.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function U_(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function F_(i,e,t){const n=new WeakMap,s=new et;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let v=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",v)};d!==void 0&&d.texture.dispose();const f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],S=a.morphAttributes.color||[];let y=0;f===!0&&(y=1),g===!0&&(y=2),_===!0&&(y=3);let M=a.attributes.position.count*y,C=1;M>e.maxTextureSize&&(C=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const P=new Float32Array(M*C*4*u),R=new ad(P,M,C,u);R.type=Cn,R.needsUpdate=!0;const T=y*4;for(let x=0;x<u;x++){const A=m[x],D=p[x],U=S[x],L=M*C*4*x;for(let k=0;k<A.count;k++){const O=k*T;f===!0&&(s.fromBufferAttribute(A,k),P[L+O+0]=s.x,P[L+O+1]=s.y,P[L+O+2]=s.z,P[L+O+3]=0),g===!0&&(s.fromBufferAttribute(D,k),P[L+O+4]=s.x,P[L+O+5]=s.y,P[L+O+6]=s.z,P[L+O+7]=0),_===!0&&(s.fromBufferAttribute(U,k),P[L+O+8]=s.x,P[L+O+9]=s.y,P[L+O+10]=s.z,P[L+O+11]=U.itemSize===4?s.w:1)}}d={count:u,texture:R,size:new de(M,C)},n.set(a,d),a.addEventListener("dispose",v)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];const g=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function O_(i,e,t,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=e.get(l,h);if(s.get(u)!==c&&(e.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return u}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}const Id=new Pt,tu=new Md(1,1),Ld=new ad,Nd=new _p,Ud=new pd,nu=[],iu=[],su=new Float32Array(16),ru=new Float32Array(9),ou=new Float32Array(4);function $s(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=nu[s];if(r===void 0&&(r=new Float32Array(s),nu[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function Dt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function It(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function na(i,e){let t=iu[e];t===void 0&&(t=new Int32Array(e),iu[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function k_(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function B_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;i.uniform2fv(this.addr,e),It(t,e)}}function z_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Dt(t,e))return;i.uniform3fv(this.addr,e),It(t,e)}}function V_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;i.uniform4fv(this.addr,e),It(t,e)}}function H_(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Dt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),It(t,e)}else{if(Dt(t,n))return;ou.set(n),i.uniformMatrix2fv(this.addr,!1,ou),It(t,n)}}function G_(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Dt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),It(t,e)}else{if(Dt(t,n))return;ru.set(n),i.uniformMatrix3fv(this.addr,!1,ru),It(t,n)}}function W_(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Dt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),It(t,e)}else{if(Dt(t,n))return;su.set(n),i.uniformMatrix4fv(this.addr,!1,su),It(t,n)}}function X_(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function j_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;i.uniform2iv(this.addr,e),It(t,e)}}function q_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Dt(t,e))return;i.uniform3iv(this.addr,e),It(t,e)}}function K_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;i.uniform4iv(this.addr,e),It(t,e)}}function Y_(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function $_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;i.uniform2uiv(this.addr,e),It(t,e)}}function Z_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Dt(t,e))return;i.uniform3uiv(this.addr,e),It(t,e)}}function J_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;i.uniform4uiv(this.addr,e),It(t,e)}}function Q_(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(tu.compareFunction=rd,r=tu):r=Id,t.setTexture2D(e||r,s)}function ev(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Nd,s)}function tv(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Ud,s)}function nv(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Ld,s)}function iv(i){switch(i){case 5126:return k_;case 35664:return B_;case 35665:return z_;case 35666:return V_;case 35674:return H_;case 35675:return G_;case 35676:return W_;case 5124:case 35670:return X_;case 35667:case 35671:return j_;case 35668:case 35672:return q_;case 35669:case 35673:return K_;case 5125:return Y_;case 36294:return $_;case 36295:return Z_;case 36296:return J_;case 35678:case 36198:case 36298:case 36306:case 35682:return Q_;case 35679:case 36299:case 36307:return ev;case 35680:case 36300:case 36308:case 36293:return tv;case 36289:case 36303:case 36311:case 36292:return nv}}function sv(i,e){i.uniform1fv(this.addr,e)}function rv(i,e){const t=$s(e,this.size,2);i.uniform2fv(this.addr,t)}function ov(i,e){const t=$s(e,this.size,3);i.uniform3fv(this.addr,t)}function av(i,e){const t=$s(e,this.size,4);i.uniform4fv(this.addr,t)}function lv(i,e){const t=$s(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function cv(i,e){const t=$s(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function hv(i,e){const t=$s(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function uv(i,e){i.uniform1iv(this.addr,e)}function dv(i,e){i.uniform2iv(this.addr,e)}function fv(i,e){i.uniform3iv(this.addr,e)}function pv(i,e){i.uniform4iv(this.addr,e)}function mv(i,e){i.uniform1uiv(this.addr,e)}function gv(i,e){i.uniform2uiv(this.addr,e)}function _v(i,e){i.uniform3uiv(this.addr,e)}function vv(i,e){i.uniform4uiv(this.addr,e)}function xv(i,e,t){const n=this.cache,s=e.length,r=na(t,s);Dt(n,r)||(i.uniform1iv(this.addr,r),It(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||Id,r[o])}function yv(i,e,t){const n=this.cache,s=e.length,r=na(t,s);Dt(n,r)||(i.uniform1iv(this.addr,r),It(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Nd,r[o])}function Mv(i,e,t){const n=this.cache,s=e.length,r=na(t,s);Dt(n,r)||(i.uniform1iv(this.addr,r),It(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Ud,r[o])}function Sv(i,e,t){const n=this.cache,s=e.length,r=na(t,s);Dt(n,r)||(i.uniform1iv(this.addr,r),It(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Ld,r[o])}function wv(i){switch(i){case 5126:return sv;case 35664:return rv;case 35665:return ov;case 35666:return av;case 35674:return lv;case 35675:return cv;case 35676:return hv;case 5124:case 35670:return uv;case 35667:case 35671:return dv;case 35668:case 35672:return fv;case 35669:case 35673:return pv;case 5125:return mv;case 36294:return gv;case 36295:return _v;case 36296:return vv;case 35678:case 36198:case 36298:case 36306:case 35682:return xv;case 35679:case 36299:case 36307:return yv;case 35680:case 36300:case 36308:case 36293:return Mv;case 36289:case 36303:case 36311:case 36292:return Sv}}class bv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=iv(t.type)}}class Ev{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=wv(t.type)}}class Tv{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],n)}}}const Wa=/(\w+)(\])?(\[|\.)?/g;function au(i,e){i.seq.push(e),i.map[e.id]=e}function Av(i,e,t){const n=i.name,s=n.length;for(Wa.lastIndex=0;;){const r=Wa.exec(n),o=Wa.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){au(t,c===void 0?new bv(a,i,e):new Ev(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new Tv(a),au(t,u)),t=u}}}class Io{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);Av(r,o,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&n.push(o)}return n}}function lu(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Rv=37297;let Cv=0;function Pv(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const cu=new ze;function Dv(i){Je._getMatrix(cu,Je.workingColorSpace,i);const e=`mat3( ${cu.elements.map(t=>t.toFixed(4))} )`;switch(Je.getTransfer(i)){case Ho:return[e,"LinearTransferOETF"];case at:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function hu(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+Pv(i.getShaderSource(e),a)}else return r}function Iv(i,e){const t=Dv(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Lv(i,e){let t;switch(e){case Cf:t="Linear";break;case Pf:t="Reinhard";break;case Df:t="Cineon";break;case Ku:t="ACESFilmic";break;case Lf:t="AgX";break;case Nf:t="Neutral";break;case If:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const yo=new b;function Nv(){Je.getLuminanceCoefficients(yo);const i=yo.x.toFixed(4),e=yo.y.toFixed(4),t=yo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Uv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ur).join(`
`)}function Fv(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Ov(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function ur(i){return i!==""}function uu(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function du(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const kv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Jl(i){return i.replace(kv,zv)}const Bv=new Map;function zv(i,e){let t=We[e];if(t===void 0){const n=Bv.get(e);if(n!==void 0)t=We[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Jl(t)}const Vv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function fu(i){return i.replace(Vv,Hv)}function Hv(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function pu(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function Gv(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===ju?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===qu?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===ei&&(e="SHADOWMAP_TYPE_VSM"),e}function Wv(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Os:case ks:e="ENVMAP_TYPE_CUBE";break;case Jo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Xv(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ks:e="ENVMAP_MODE_REFRACTION";break}return e}function jv(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case mc:e="ENVMAP_BLENDING_MULTIPLY";break;case Af:e="ENVMAP_BLENDING_MIX";break;case Rf:e="ENVMAP_BLENDING_ADD";break}return e}function qv(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Kv(i,e,t,n){const s=i.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=Gv(t),c=Wv(t),h=Xv(t),u=jv(t),d=qv(t),f=Uv(t),g=Fv(r),_=s.createProgram();let m,p,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ur).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ur).join(`
`),p.length>0&&(p+=`
`)):(m=[pu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ur).join(`
`),p=[pu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ci?"#define TONE_MAPPING":"",t.toneMapping!==Ci?We.tonemapping_pars_fragment:"",t.toneMapping!==Ci?Lv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",We.colorspace_pars_fragment,Iv("linearToOutputTexel",t.outputColorSpace),Nv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ur).join(`
`)),o=Jl(o),o=uu(o,t),o=du(o,t),a=Jl(a),a=uu(a,t),a=du(a,t),o=fu(o),a=fu(a),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===ah?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ah?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const y=S+m+o,M=S+p+a,C=lu(s,s.VERTEX_SHADER,y),P=lu(s,s.FRAGMENT_SHADER,M);s.attachShader(_,C),s.attachShader(_,P),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function R(A){if(i.debug.checkShaderErrors){const D=s.getProgramInfoLog(_)||"",U=s.getShaderInfoLog(C)||"",L=s.getShaderInfoLog(P)||"",k=D.trim(),O=U.trim(),K=L.trim();let V=!0,Y=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(V=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,C,P);else{const ne=hu(s,C,"vertex"),ue=hu(s,P,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+k+`
`+ne+`
`+ue)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(O===""||K==="")&&(Y=!1);Y&&(A.diagnostics={runnable:V,programLog:k,vertexShader:{log:O,prefix:m},fragmentShader:{log:K,prefix:p}})}s.deleteShader(C),s.deleteShader(P),T=new Io(s,_),v=Ov(s,_)}let T;this.getUniforms=function(){return T===void 0&&R(this),T};let v;this.getAttributes=function(){return v===void 0&&R(this),v};let x=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=s.getProgramParameter(_,Rv)),x},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Cv++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=C,this.fragmentShader=P,this}let Yv=0;class $v{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Zv(e),t.set(e,n)),n}}class Zv{constructor(e){this.id=Yv++,this.code=e,this.usedTimes=0}}function Jv(i,e,t,n,s,r,o){const a=new ld,l=new $v,c=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(v){return c.add(v),v===0?"uv":`uv${v}`}function m(v,x,A,D,U){const L=D.fog,k=U.geometry,O=v.isMeshStandardMaterial?D.environment:null,K=(v.isMeshStandardMaterial?t:e).get(v.envMap||O),V=K&&K.mapping===Jo?K.image.height:null,Y=g[v.type];v.precision!==null&&(f=s.getMaxPrecision(v.precision),f!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",f,"instead."));const ne=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,ue=ne!==void 0?ne.length:0;let Ae=0;k.morphAttributes.position!==void 0&&(Ae=1),k.morphAttributes.normal!==void 0&&(Ae=2),k.morphAttributes.color!==void 0&&(Ae=3);let Qe,tt,je,j;if(Y){const it=kn[Y];Qe=it.vertexShader,tt=it.fragmentShader}else Qe=v.vertexShader,tt=v.fragmentShader,l.update(v),je=l.getVertexShaderID(v),j=l.getFragmentShaderID(v);const Z=i.getRenderTarget(),me=i.state.buffers.depth.getReversed(),Ne=U.isInstancedMesh===!0,be=U.isBatchedMesh===!0,Ze=!!v.map,zt=!!v.matcap,N=!!K,gt=!!v.aoMap,Be=!!v.lightMap,De=!!v.bumpMap,ve=!!v.normalMap,_t=!!v.displacementMap,xe=!!v.emissiveMap,Ge=!!v.metalnessMap,Nt=!!v.roughnessMap,bt=v.anisotropy>0,I=v.clearcoat>0,w=v.dispersion>0,H=v.iridescence>0,q=v.sheen>0,J=v.transmission>0,X=bt&&!!v.anisotropyMap,we=I&&!!v.clearcoatMap,re=I&&!!v.clearcoatNormalMap,ye=I&&!!v.clearcoatRoughnessMap,Me=H&&!!v.iridescenceMap,ie=H&&!!v.iridescenceThicknessMap,he=q&&!!v.sheenColorMap,Pe=q&&!!v.sheenRoughnessMap,Se=!!v.specularMap,le=!!v.specularColorMap,Ve=!!v.specularIntensityMap,F=J&&!!v.transmissionMap,se=J&&!!v.thicknessMap,oe=!!v.gradientMap,pe=!!v.alphaMap,ee=v.alphaTest>0,$=!!v.alphaHash,_e=!!v.extensions;let Oe=Ci;v.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(Oe=i.toneMapping);const ft={shaderID:Y,shaderType:v.type,shaderName:v.name,vertexShader:Qe,fragmentShader:tt,defines:v.defines,customVertexShaderID:je,customFragmentShaderID:j,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:f,batching:be,batchingColor:be&&U._colorsTexture!==null,instancing:Ne,instancingColor:Ne&&U.instanceColor!==null,instancingMorph:Ne&&U.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:Z===null?i.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:jt,alphaToCoverage:!!v.alphaToCoverage,map:Ze,matcap:zt,envMap:N,envMapMode:N&&K.mapping,envMapCubeUVHeight:V,aoMap:gt,lightMap:Be,bumpMap:De,normalMap:ve,displacementMap:d&&_t,emissiveMap:xe,normalMapObjectSpace:ve&&v.normalMapType===zf,normalMapTangentSpace:ve&&v.normalMapType===wc,metalnessMap:Ge,roughnessMap:Nt,anisotropy:bt,anisotropyMap:X,clearcoat:I,clearcoatMap:we,clearcoatNormalMap:re,clearcoatRoughnessMap:ye,dispersion:w,iridescence:H,iridescenceMap:Me,iridescenceThicknessMap:ie,sheen:q,sheenColorMap:he,sheenRoughnessMap:Pe,specularMap:Se,specularColorMap:le,specularIntensityMap:Ve,transmission:J,transmissionMap:F,thicknessMap:se,gradientMap:oe,opaque:v.transparent===!1&&v.blending===Ps&&v.alphaToCoverage===!1,alphaMap:pe,alphaTest:ee,alphaHash:$,combine:v.combine,mapUv:Ze&&_(v.map.channel),aoMapUv:gt&&_(v.aoMap.channel),lightMapUv:Be&&_(v.lightMap.channel),bumpMapUv:De&&_(v.bumpMap.channel),normalMapUv:ve&&_(v.normalMap.channel),displacementMapUv:_t&&_(v.displacementMap.channel),emissiveMapUv:xe&&_(v.emissiveMap.channel),metalnessMapUv:Ge&&_(v.metalnessMap.channel),roughnessMapUv:Nt&&_(v.roughnessMap.channel),anisotropyMapUv:X&&_(v.anisotropyMap.channel),clearcoatMapUv:we&&_(v.clearcoatMap.channel),clearcoatNormalMapUv:re&&_(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ye&&_(v.clearcoatRoughnessMap.channel),iridescenceMapUv:Me&&_(v.iridescenceMap.channel),iridescenceThicknessMapUv:ie&&_(v.iridescenceThicknessMap.channel),sheenColorMapUv:he&&_(v.sheenColorMap.channel),sheenRoughnessMapUv:Pe&&_(v.sheenRoughnessMap.channel),specularMapUv:Se&&_(v.specularMap.channel),specularColorMapUv:le&&_(v.specularColorMap.channel),specularIntensityMapUv:Ve&&_(v.specularIntensityMap.channel),transmissionMapUv:F&&_(v.transmissionMap.channel),thicknessMapUv:se&&_(v.thicknessMap.channel),alphaMapUv:pe&&_(v.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(ve||bt),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!k.attributes.uv&&(Ze||pe),fog:!!L,useFog:v.fog===!0,fogExp2:!!L&&L.isFogExp2,flatShading:v.flatShading===!0&&v.wireframe===!1,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:me,skinning:U.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:ue,morphTextureStride:Ae,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&A.length>0,shadowMapType:i.shadowMap.type,toneMapping:Oe,decodeVideoTexture:Ze&&v.map.isVideoTexture===!0&&Je.getTransfer(v.map.colorSpace)===at,decodeVideoTextureEmissive:xe&&v.emissiveMap.isVideoTexture===!0&&Je.getTransfer(v.emissiveMap.colorSpace)===at,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===cn,flipSided:v.side===Xt,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:_e&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(_e&&v.extensions.multiDraw===!0||be)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return ft.vertexUv1s=c.has(1),ft.vertexUv2s=c.has(2),ft.vertexUv3s=c.has(3),c.clear(),ft}function p(v){const x=[];if(v.shaderID?x.push(v.shaderID):(x.push(v.customVertexShaderID),x.push(v.customFragmentShaderID)),v.defines!==void 0)for(const A in v.defines)x.push(A),x.push(v.defines[A]);return v.isRawShaderMaterial===!1&&(S(x,v),y(x,v),x.push(i.outputColorSpace)),x.push(v.customProgramCacheKey),x.join()}function S(v,x){v.push(x.precision),v.push(x.outputColorSpace),v.push(x.envMapMode),v.push(x.envMapCubeUVHeight),v.push(x.mapUv),v.push(x.alphaMapUv),v.push(x.lightMapUv),v.push(x.aoMapUv),v.push(x.bumpMapUv),v.push(x.normalMapUv),v.push(x.displacementMapUv),v.push(x.emissiveMapUv),v.push(x.metalnessMapUv),v.push(x.roughnessMapUv),v.push(x.anisotropyMapUv),v.push(x.clearcoatMapUv),v.push(x.clearcoatNormalMapUv),v.push(x.clearcoatRoughnessMapUv),v.push(x.iridescenceMapUv),v.push(x.iridescenceThicknessMapUv),v.push(x.sheenColorMapUv),v.push(x.sheenRoughnessMapUv),v.push(x.specularMapUv),v.push(x.specularColorMapUv),v.push(x.specularIntensityMapUv),v.push(x.transmissionMapUv),v.push(x.thicknessMapUv),v.push(x.combine),v.push(x.fogExp2),v.push(x.sizeAttenuation),v.push(x.morphTargetsCount),v.push(x.morphAttributeCount),v.push(x.numDirLights),v.push(x.numPointLights),v.push(x.numSpotLights),v.push(x.numSpotLightMaps),v.push(x.numHemiLights),v.push(x.numRectAreaLights),v.push(x.numDirLightShadows),v.push(x.numPointLightShadows),v.push(x.numSpotLightShadows),v.push(x.numSpotLightShadowsWithMaps),v.push(x.numLightProbes),v.push(x.shadowMapType),v.push(x.toneMapping),v.push(x.numClippingPlanes),v.push(x.numClipIntersection),v.push(x.depthPacking)}function y(v,x){a.disableAll(),x.supportsVertexTextures&&a.enable(0),x.instancing&&a.enable(1),x.instancingColor&&a.enable(2),x.instancingMorph&&a.enable(3),x.matcap&&a.enable(4),x.envMap&&a.enable(5),x.normalMapObjectSpace&&a.enable(6),x.normalMapTangentSpace&&a.enable(7),x.clearcoat&&a.enable(8),x.iridescence&&a.enable(9),x.alphaTest&&a.enable(10),x.vertexColors&&a.enable(11),x.vertexAlphas&&a.enable(12),x.vertexUv1s&&a.enable(13),x.vertexUv2s&&a.enable(14),x.vertexUv3s&&a.enable(15),x.vertexTangents&&a.enable(16),x.anisotropy&&a.enable(17),x.alphaHash&&a.enable(18),x.batching&&a.enable(19),x.dispersion&&a.enable(20),x.batchingColor&&a.enable(21),x.gradientMap&&a.enable(22),v.push(a.mask),a.disableAll(),x.fog&&a.enable(0),x.useFog&&a.enable(1),x.flatShading&&a.enable(2),x.logarithmicDepthBuffer&&a.enable(3),x.reversedDepthBuffer&&a.enable(4),x.skinning&&a.enable(5),x.morphTargets&&a.enable(6),x.morphNormals&&a.enable(7),x.morphColors&&a.enable(8),x.premultipliedAlpha&&a.enable(9),x.shadowMapEnabled&&a.enable(10),x.doubleSided&&a.enable(11),x.flipSided&&a.enable(12),x.useDepthPacking&&a.enable(13),x.dithering&&a.enable(14),x.transmission&&a.enable(15),x.sheen&&a.enable(16),x.opaque&&a.enable(17),x.pointsUvs&&a.enable(18),x.decodeVideoTexture&&a.enable(19),x.decodeVideoTextureEmissive&&a.enable(20),x.alphaToCoverage&&a.enable(21),v.push(a.mask)}function M(v){const x=g[v.type];let A;if(x){const D=kn[x];A=ql.clone(D.uniforms)}else A=v.uniforms;return A}function C(v,x){let A;for(let D=0,U=h.length;D<U;D++){const L=h[D];if(L.cacheKey===x){A=L,++A.usedTimes;break}}return A===void 0&&(A=new Kv(i,x,v,r),h.push(A)),A}function P(v){if(--v.usedTimes===0){const x=h.indexOf(v);h[x]=h[h.length-1],h.pop(),v.destroy()}}function R(v){l.remove(v)}function T(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:M,acquireProgram:C,releaseProgram:P,releaseShaderCache:R,programs:h,dispose:T}}function Qv(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function ex(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function mu(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function gu(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(u,d,f,g,_,m){let p=i[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},i[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),e++,p}function a(u,d,f,g,_,m){const p=o(u,d,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):t.push(p)}function l(u,d,f,g,_,m){const p=o(u,d,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function c(u,d){t.length>1&&t.sort(u||ex),n.length>1&&n.sort(d||mu),s.length>1&&s.sort(d||mu)}function h(){for(let u=e,d=i.length;u<d;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function tx(){let i=new WeakMap;function e(n,s){const r=i.get(n);let o;return r===void 0?(o=new gu,i.set(n,[o])):s>=r.length?(o=new gu,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function nx(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new b,color:new Ce};break;case"SpotLight":t={position:new b,direction:new b,color:new Ce,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new b,color:new Ce,distance:0,decay:0};break;case"HemisphereLight":t={direction:new b,skyColor:new Ce,groundColor:new Ce};break;case"RectAreaLight":t={color:new Ce,position:new b,halfWidth:new b,halfHeight:new b};break}return i[e.id]=t,t}}}function ix(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let sx=0;function rx(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function ox(i){const e=new nx,t=ix(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new b);const s=new b,r=new Ue,o=new Ue;function a(c){let h=0,u=0,d=0;for(let v=0;v<9;v++)n.probe[v].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,S=0,y=0,M=0,C=0,P=0,R=0;c.sort(rx);for(let v=0,x=c.length;v<x;v++){const A=c[v],D=A.color,U=A.intensity,L=A.distance,k=A.shadow&&A.shadow.map?A.shadow.map.texture:null;if(A.isAmbientLight)h+=D.r*U,u+=D.g*U,d+=D.b*U;else if(A.isLightProbe){for(let O=0;O<9;O++)n.probe[O].addScaledVector(A.sh.coefficients[O],U);R++}else if(A.isDirectionalLight){const O=e.get(A);if(O.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){const K=A.shadow,V=t.get(A);V.shadowIntensity=K.intensity,V.shadowBias=K.bias,V.shadowNormalBias=K.normalBias,V.shadowRadius=K.radius,V.shadowMapSize=K.mapSize,n.directionalShadow[f]=V,n.directionalShadowMap[f]=k,n.directionalShadowMatrix[f]=A.shadow.matrix,S++}n.directional[f]=O,f++}else if(A.isSpotLight){const O=e.get(A);O.position.setFromMatrixPosition(A.matrixWorld),O.color.copy(D).multiplyScalar(U),O.distance=L,O.coneCos=Math.cos(A.angle),O.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),O.decay=A.decay,n.spot[_]=O;const K=A.shadow;if(A.map&&(n.spotLightMap[C]=A.map,C++,K.updateMatrices(A),A.castShadow&&P++),n.spotLightMatrix[_]=K.matrix,A.castShadow){const V=t.get(A);V.shadowIntensity=K.intensity,V.shadowBias=K.bias,V.shadowNormalBias=K.normalBias,V.shadowRadius=K.radius,V.shadowMapSize=K.mapSize,n.spotShadow[_]=V,n.spotShadowMap[_]=k,M++}_++}else if(A.isRectAreaLight){const O=e.get(A);O.color.copy(D).multiplyScalar(U),O.halfWidth.set(A.width*.5,0,0),O.halfHeight.set(0,A.height*.5,0),n.rectArea[m]=O,m++}else if(A.isPointLight){const O=e.get(A);if(O.color.copy(A.color).multiplyScalar(A.intensity),O.distance=A.distance,O.decay=A.decay,A.castShadow){const K=A.shadow,V=t.get(A);V.shadowIntensity=K.intensity,V.shadowBias=K.bias,V.shadowNormalBias=K.normalBias,V.shadowRadius=K.radius,V.shadowMapSize=K.mapSize,V.shadowCameraNear=K.camera.near,V.shadowCameraFar=K.camera.far,n.pointShadow[g]=V,n.pointShadowMap[g]=k,n.pointShadowMatrix[g]=A.shadow.matrix,y++}n.point[g]=O,g++}else if(A.isHemisphereLight){const O=e.get(A);O.skyColor.copy(A.color).multiplyScalar(U),O.groundColor.copy(A.groundColor).multiplyScalar(U),n.hemi[p]=O,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ae.LTC_FLOAT_1,n.rectAreaLTC2=ae.LTC_FLOAT_2):(n.rectAreaLTC1=ae.LTC_HALF_1,n.rectAreaLTC2=ae.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const T=n.hash;(T.directionalLength!==f||T.pointLength!==g||T.spotLength!==_||T.rectAreaLength!==m||T.hemiLength!==p||T.numDirectionalShadows!==S||T.numPointShadows!==y||T.numSpotShadows!==M||T.numSpotMaps!==C||T.numLightProbes!==R)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=M+C-P,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=P,n.numLightProbes=R,T.directionalLength=f,T.pointLength=g,T.spotLength=_,T.rectAreaLength=m,T.hemiLength=p,T.numDirectionalShadows=S,T.numPointShadows=y,T.numSpotShadows=M,T.numSpotMaps=C,T.numLightProbes=R,n.version=sx++)}function l(c,h){let u=0,d=0,f=0,g=0,_=0;const m=h.matrixWorldInverse;for(let p=0,S=c.length;p<S;p++){const y=c[p];if(y.isDirectionalLight){const M=n.directional[u];M.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),u++}else if(y.isSpotLight){const M=n.spot[f];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),f++}else if(y.isRectAreaLight){const M=n.rectArea[g];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(m),o.identity(),r.copy(y.matrixWorld),r.premultiply(m),o.extractRotation(r),M.halfWidth.set(y.width*.5,0,0),M.halfHeight.set(0,y.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),g++}else if(y.isPointLight){const M=n.point[d];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(m),d++}else if(y.isHemisphereLight){const M=n.hemi[_];M.direction.setFromMatrixPosition(y.matrixWorld),M.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:n}}function _u(i){const e=new ox(i),t=[],n=[];function s(h){c.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function ax(i){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new _u(i),e.set(s,[a])):r>=o.length?(a=new _u(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const lx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,cx=`uniform sampler2D shadow_pass;
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
}`;function hx(i,e,t){let n=new Rc;const s=new de,r=new de,o=new et,a=new lm({depthPacking:Bf}),l=new cm,c={},h=t.maxTextureSize,u={[ai]:Xt,[Xt]:ai,[cn]:cn},d=new li({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new de},radius:{value:4}},vertexShader:lx,fragmentShader:cx}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new Lt;g.setAttribute("position",new ct(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new qe(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ju;let p=this.type;this.render=function(P,R,T){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||P.length===0)return;const v=i.getRenderTarget(),x=i.getActiveCubeFace(),A=i.getActiveMipmapLevel(),D=i.state;D.setBlending(Ri),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const U=p!==ei&&this.type===ei,L=p===ei&&this.type!==ei;for(let k=0,O=P.length;k<O;k++){const K=P[k],V=K.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);const Y=V.getFrameExtents();if(s.multiply(Y),r.copy(V.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/Y.x),s.x=r.x*Y.x,V.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/Y.y),s.y=r.y*Y.y,V.mapSize.y=r.y)),V.map===null||U===!0||L===!0){const ue=this.type!==ei?{minFilter:Qt,magFilter:Qt}:{};V.map!==null&&V.map.dispose(),V.map=new Ii(s.x,s.y,ue),V.map.texture.name=K.name+".shadowMap",V.camera.updateProjectionMatrix()}i.setRenderTarget(V.map),i.clear();const ne=V.getViewportCount();for(let ue=0;ue<ne;ue++){const Ae=V.getViewport(ue);o.set(r.x*Ae.x,r.y*Ae.y,r.x*Ae.z,r.y*Ae.w),D.viewport(o),V.updateMatrices(K,ue),n=V.getFrustum(),M(R,T,V.camera,K,this.type)}V.isPointLightShadow!==!0&&this.type===ei&&S(V,T),V.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(v,x,A)};function S(P,R){const T=e.update(_);d.defines.VSM_SAMPLES!==P.blurSamples&&(d.defines.VSM_SAMPLES=P.blurSamples,f.defines.VSM_SAMPLES=P.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new Ii(s.x,s.y)),d.uniforms.shadow_pass.value=P.map.texture,d.uniforms.resolution.value=P.mapSize,d.uniforms.radius.value=P.radius,i.setRenderTarget(P.mapPass),i.clear(),i.renderBufferDirect(R,null,T,d,_,null),f.uniforms.shadow_pass.value=P.mapPass.texture,f.uniforms.resolution.value=P.mapSize,f.uniforms.radius.value=P.radius,i.setRenderTarget(P.map),i.clear(),i.renderBufferDirect(R,null,T,f,_,null)}function y(P,R,T,v){let x=null;const A=T.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(A!==void 0)x=A;else if(x=T.isPointLight===!0?l:a,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const D=x.uuid,U=R.uuid;let L=c[D];L===void 0&&(L={},c[D]=L);let k=L[U];k===void 0&&(k=x.clone(),L[U]=k,R.addEventListener("dispose",C)),x=k}if(x.visible=R.visible,x.wireframe=R.wireframe,v===ei?x.side=R.shadowSide!==null?R.shadowSide:R.side:x.side=R.shadowSide!==null?R.shadowSide:u[R.side],x.alphaMap=R.alphaMap,x.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,x.map=R.map,x.clipShadows=R.clipShadows,x.clippingPlanes=R.clippingPlanes,x.clipIntersection=R.clipIntersection,x.displacementMap=R.displacementMap,x.displacementScale=R.displacementScale,x.displacementBias=R.displacementBias,x.wireframeLinewidth=R.wireframeLinewidth,x.linewidth=R.linewidth,T.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const D=i.properties.get(x);D.light=T}return x}function M(P,R,T,v,x){if(P.visible===!1)return;if(P.layers.test(R.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&x===ei)&&(!P.frustumCulled||n.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,P.matrixWorld);const U=e.update(P),L=P.material;if(Array.isArray(L)){const k=U.groups;for(let O=0,K=k.length;O<K;O++){const V=k[O],Y=L[V.materialIndex];if(Y&&Y.visible){const ne=y(P,Y,v,x);P.onBeforeShadow(i,P,R,T,U,ne,V),i.renderBufferDirect(T,null,U,ne,P,V),P.onAfterShadow(i,P,R,T,U,ne,V)}}}else if(L.visible){const k=y(P,L,v,x);P.onBeforeShadow(i,P,R,T,U,k,null),i.renderBufferDirect(T,null,U,k,P,null),P.onAfterShadow(i,P,R,T,U,k,null)}}const D=P.children;for(let U=0,L=D.length;U<L;U++)M(D[U],R,T,v,x)}function C(P){P.target.removeEventListener("dispose",C);for(const T in c){const v=c[T],x=P.target.uuid;x in v&&(v[x].dispose(),delete v[x])}}}const ux={[ll]:cl,[hl]:fl,[ul]:pl,[Fs]:dl,[cl]:ll,[fl]:hl,[pl]:ul,[dl]:Fs};function dx(i,e){function t(){let F=!1;const se=new et;let oe=null;const pe=new et(0,0,0,0);return{setMask:function(ee){oe!==ee&&!F&&(i.colorMask(ee,ee,ee,ee),oe=ee)},setLocked:function(ee){F=ee},setClear:function(ee,$,_e,Oe,ft){ft===!0&&(ee*=Oe,$*=Oe,_e*=Oe),se.set(ee,$,_e,Oe),pe.equals(se)===!1&&(i.clearColor(ee,$,_e,Oe),pe.copy(se))},reset:function(){F=!1,oe=null,pe.set(-1,0,0,0)}}}function n(){let F=!1,se=!1,oe=null,pe=null,ee=null;return{setReversed:function($){if(se!==$){const _e=e.get("EXT_clip_control");$?_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.ZERO_TO_ONE_EXT):_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.NEGATIVE_ONE_TO_ONE_EXT),se=$;const Oe=ee;ee=null,this.setClear(Oe)}},getReversed:function(){return se},setTest:function($){$?Z(i.DEPTH_TEST):me(i.DEPTH_TEST)},setMask:function($){oe!==$&&!F&&(i.depthMask($),oe=$)},setFunc:function($){if(se&&($=ux[$]),pe!==$){switch($){case ll:i.depthFunc(i.NEVER);break;case cl:i.depthFunc(i.ALWAYS);break;case hl:i.depthFunc(i.LESS);break;case Fs:i.depthFunc(i.LEQUAL);break;case ul:i.depthFunc(i.EQUAL);break;case dl:i.depthFunc(i.GEQUAL);break;case fl:i.depthFunc(i.GREATER);break;case pl:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}pe=$}},setLocked:function($){F=$},setClear:function($){ee!==$&&(se&&($=1-$),i.clearDepth($),ee=$)},reset:function(){F=!1,oe=null,pe=null,ee=null,se=!1}}}function s(){let F=!1,se=null,oe=null,pe=null,ee=null,$=null,_e=null,Oe=null,ft=null;return{setTest:function(it){F||(it?Z(i.STENCIL_TEST):me(i.STENCIL_TEST))},setMask:function(it){se!==it&&!F&&(i.stencilMask(it),se=it)},setFunc:function(it,Xn,Un){(oe!==it||pe!==Xn||ee!==Un)&&(i.stencilFunc(it,Xn,Un),oe=it,pe=Xn,ee=Un)},setOp:function(it,Xn,Un){($!==it||_e!==Xn||Oe!==Un)&&(i.stencilOp(it,Xn,Un),$=it,_e=Xn,Oe=Un)},setLocked:function(it){F=it},setClear:function(it){ft!==it&&(i.clearStencil(it),ft=it)},reset:function(){F=!1,se=null,oe=null,pe=null,ee=null,$=null,_e=null,Oe=null,ft=null}}}const r=new t,o=new n,a=new s,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,f=[],g=null,_=!1,m=null,p=null,S=null,y=null,M=null,C=null,P=null,R=new Ce(0,0,0),T=0,v=!1,x=null,A=null,D=null,U=null,L=null;const k=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,K=0;const V=i.getParameter(i.VERSION);V.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(V)[1]),O=K>=1):V.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),O=K>=2);let Y=null,ne={};const ue=i.getParameter(i.SCISSOR_BOX),Ae=i.getParameter(i.VIEWPORT),Qe=new et().fromArray(ue),tt=new et().fromArray(Ae);function je(F,se,oe,pe){const ee=new Uint8Array(4),$=i.createTexture();i.bindTexture(F,$),i.texParameteri(F,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(F,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let _e=0;_e<oe;_e++)F===i.TEXTURE_3D||F===i.TEXTURE_2D_ARRAY?i.texImage3D(se,0,i.RGBA,1,1,pe,0,i.RGBA,i.UNSIGNED_BYTE,ee):i.texImage2D(se+_e,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ee);return $}const j={};j[i.TEXTURE_2D]=je(i.TEXTURE_2D,i.TEXTURE_2D,1),j[i.TEXTURE_CUBE_MAP]=je(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[i.TEXTURE_2D_ARRAY]=je(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),j[i.TEXTURE_3D]=je(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),Z(i.DEPTH_TEST),o.setFunc(Fs),De(!1),ve(Zc),Z(i.CULL_FACE),gt(Ri);function Z(F){h[F]!==!0&&(i.enable(F),h[F]=!0)}function me(F){h[F]!==!1&&(i.disable(F),h[F]=!1)}function Ne(F,se){return u[F]!==se?(i.bindFramebuffer(F,se),u[F]=se,F===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=se),F===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=se),!0):!1}function be(F,se){let oe=f,pe=!1;if(F){oe=d.get(se),oe===void 0&&(oe=[],d.set(se,oe));const ee=F.textures;if(oe.length!==ee.length||oe[0]!==i.COLOR_ATTACHMENT0){for(let $=0,_e=ee.length;$<_e;$++)oe[$]=i.COLOR_ATTACHMENT0+$;oe.length=ee.length,pe=!0}}else oe[0]!==i.BACK&&(oe[0]=i.BACK,pe=!0);pe&&i.drawBuffers(oe)}function Ze(F){return g!==F?(i.useProgram(F),g=F,!0):!1}const zt={[Ki]:i.FUNC_ADD,[hf]:i.FUNC_SUBTRACT,[uf]:i.FUNC_REVERSE_SUBTRACT};zt[df]=i.MIN,zt[ff]=i.MAX;const N={[pf]:i.ZERO,[mf]:i.ONE,[gf]:i.SRC_COLOR,[ol]:i.SRC_ALPHA,[Sf]:i.SRC_ALPHA_SATURATE,[yf]:i.DST_COLOR,[vf]:i.DST_ALPHA,[_f]:i.ONE_MINUS_SRC_COLOR,[al]:i.ONE_MINUS_SRC_ALPHA,[Mf]:i.ONE_MINUS_DST_COLOR,[xf]:i.ONE_MINUS_DST_ALPHA,[wf]:i.CONSTANT_COLOR,[bf]:i.ONE_MINUS_CONSTANT_COLOR,[Ef]:i.CONSTANT_ALPHA,[Tf]:i.ONE_MINUS_CONSTANT_ALPHA};function gt(F,se,oe,pe,ee,$,_e,Oe,ft,it){if(F===Ri){_===!0&&(me(i.BLEND),_=!1);return}if(_===!1&&(Z(i.BLEND),_=!0),F!==cf){if(F!==m||it!==v){if((p!==Ki||M!==Ki)&&(i.blendEquation(i.FUNC_ADD),p=Ki,M=Ki),it)switch(F){case Ps:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Jc:i.blendFunc(i.ONE,i.ONE);break;case Qc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case eh:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case Ps:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Jc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Qc:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case eh:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}S=null,y=null,C=null,P=null,R.set(0,0,0),T=0,m=F,v=it}return}ee=ee||se,$=$||oe,_e=_e||pe,(se!==p||ee!==M)&&(i.blendEquationSeparate(zt[se],zt[ee]),p=se,M=ee),(oe!==S||pe!==y||$!==C||_e!==P)&&(i.blendFuncSeparate(N[oe],N[pe],N[$],N[_e]),S=oe,y=pe,C=$,P=_e),(Oe.equals(R)===!1||ft!==T)&&(i.blendColor(Oe.r,Oe.g,Oe.b,ft),R.copy(Oe),T=ft),m=F,v=!1}function Be(F,se){F.side===cn?me(i.CULL_FACE):Z(i.CULL_FACE);let oe=F.side===Xt;se&&(oe=!oe),De(oe),F.blending===Ps&&F.transparent===!1?gt(Ri):gt(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),o.setFunc(F.depthFunc),o.setTest(F.depthTest),o.setMask(F.depthWrite),r.setMask(F.colorWrite);const pe=F.stencilWrite;a.setTest(pe),pe&&(a.setMask(F.stencilWriteMask),a.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),a.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),xe(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?Z(i.SAMPLE_ALPHA_TO_COVERAGE):me(i.SAMPLE_ALPHA_TO_COVERAGE)}function De(F){x!==F&&(F?i.frontFace(i.CW):i.frontFace(i.CCW),x=F)}function ve(F){F!==af?(Z(i.CULL_FACE),F!==A&&(F===Zc?i.cullFace(i.BACK):F===lf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):me(i.CULL_FACE),A=F}function _t(F){F!==D&&(O&&i.lineWidth(F),D=F)}function xe(F,se,oe){F?(Z(i.POLYGON_OFFSET_FILL),(U!==se||L!==oe)&&(i.polygonOffset(se,oe),U=se,L=oe)):me(i.POLYGON_OFFSET_FILL)}function Ge(F){F?Z(i.SCISSOR_TEST):me(i.SCISSOR_TEST)}function Nt(F){F===void 0&&(F=i.TEXTURE0+k-1),Y!==F&&(i.activeTexture(F),Y=F)}function bt(F,se,oe){oe===void 0&&(Y===null?oe=i.TEXTURE0+k-1:oe=Y);let pe=ne[oe];pe===void 0&&(pe={type:void 0,texture:void 0},ne[oe]=pe),(pe.type!==F||pe.texture!==se)&&(Y!==oe&&(i.activeTexture(oe),Y=oe),i.bindTexture(F,se||j[F]),pe.type=F,pe.texture=se)}function I(){const F=ne[Y];F!==void 0&&F.type!==void 0&&(i.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function w(){try{i.compressedTexImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function H(){try{i.compressedTexImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function q(){try{i.texSubImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function J(){try{i.texSubImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function X(){try{i.compressedTexSubImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function we(){try{i.compressedTexSubImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function re(){try{i.texStorage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ye(){try{i.texStorage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Me(){try{i.texImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ie(){try{i.texImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function he(F){Qe.equals(F)===!1&&(i.scissor(F.x,F.y,F.z,F.w),Qe.copy(F))}function Pe(F){tt.equals(F)===!1&&(i.viewport(F.x,F.y,F.z,F.w),tt.copy(F))}function Se(F,se){let oe=c.get(se);oe===void 0&&(oe=new WeakMap,c.set(se,oe));let pe=oe.get(F);pe===void 0&&(pe=i.getUniformBlockIndex(se,F.name),oe.set(F,pe))}function le(F,se){const pe=c.get(se).get(F);l.get(se)!==pe&&(i.uniformBlockBinding(se,pe,F.__bindingPointIndex),l.set(se,pe))}function Ve(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},Y=null,ne={},u={},d=new WeakMap,f=[],g=null,_=!1,m=null,p=null,S=null,y=null,M=null,C=null,P=null,R=new Ce(0,0,0),T=0,v=!1,x=null,A=null,D=null,U=null,L=null,Qe.set(0,0,i.canvas.width,i.canvas.height),tt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:Z,disable:me,bindFramebuffer:Ne,drawBuffers:be,useProgram:Ze,setBlending:gt,setMaterial:Be,setFlipSided:De,setCullFace:ve,setLineWidth:_t,setPolygonOffset:xe,setScissorTest:Ge,activeTexture:Nt,bindTexture:bt,unbindTexture:I,compressedTexImage2D:w,compressedTexImage3D:H,texImage2D:Me,texImage3D:ie,updateUBOMapping:Se,uniformBlockBinding:le,texStorage2D:re,texStorage3D:ye,texSubImage2D:q,texSubImage3D:J,compressedTexSubImage2D:X,compressedTexSubImage3D:we,scissor:he,viewport:Pe,reset:Ve}}function fx(i,e,t,n,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new de,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(I,w){return f?new OffscreenCanvas(I,w):Lr("canvas")}function _(I,w,H){let q=1;const J=bt(I);if((J.width>H||J.height>H)&&(q=H/Math.max(J.width,J.height)),q<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const X=Math.floor(q*J.width),we=Math.floor(q*J.height);u===void 0&&(u=g(X,we));const re=w?g(X,we):u;return re.width=X,re.height=we,re.getContext("2d").drawImage(I,0,0,X,we),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+X+"x"+we+")."),re}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),I;return I}function m(I){return I.generateMipmaps}function p(I){i.generateMipmap(I)}function S(I){return I.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?i.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(I,w,H,q,J=!1){if(I!==null){if(i[I]!==void 0)return i[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let X=w;if(w===i.RED&&(H===i.FLOAT&&(X=i.R32F),H===i.HALF_FLOAT&&(X=i.R16F),H===i.UNSIGNED_BYTE&&(X=i.R8)),w===i.RED_INTEGER&&(H===i.UNSIGNED_BYTE&&(X=i.R8UI),H===i.UNSIGNED_SHORT&&(X=i.R16UI),H===i.UNSIGNED_INT&&(X=i.R32UI),H===i.BYTE&&(X=i.R8I),H===i.SHORT&&(X=i.R16I),H===i.INT&&(X=i.R32I)),w===i.RG&&(H===i.FLOAT&&(X=i.RG32F),H===i.HALF_FLOAT&&(X=i.RG16F),H===i.UNSIGNED_BYTE&&(X=i.RG8)),w===i.RG_INTEGER&&(H===i.UNSIGNED_BYTE&&(X=i.RG8UI),H===i.UNSIGNED_SHORT&&(X=i.RG16UI),H===i.UNSIGNED_INT&&(X=i.RG32UI),H===i.BYTE&&(X=i.RG8I),H===i.SHORT&&(X=i.RG16I),H===i.INT&&(X=i.RG32I)),w===i.RGB_INTEGER&&(H===i.UNSIGNED_BYTE&&(X=i.RGB8UI),H===i.UNSIGNED_SHORT&&(X=i.RGB16UI),H===i.UNSIGNED_INT&&(X=i.RGB32UI),H===i.BYTE&&(X=i.RGB8I),H===i.SHORT&&(X=i.RGB16I),H===i.INT&&(X=i.RGB32I)),w===i.RGBA_INTEGER&&(H===i.UNSIGNED_BYTE&&(X=i.RGBA8UI),H===i.UNSIGNED_SHORT&&(X=i.RGBA16UI),H===i.UNSIGNED_INT&&(X=i.RGBA32UI),H===i.BYTE&&(X=i.RGBA8I),H===i.SHORT&&(X=i.RGBA16I),H===i.INT&&(X=i.RGBA32I)),w===i.RGB&&(H===i.UNSIGNED_INT_5_9_9_9_REV&&(X=i.RGB9_E5),H===i.UNSIGNED_INT_10F_11F_11F_REV&&(X=i.R11F_G11F_B10F)),w===i.RGBA){const we=J?Ho:Je.getTransfer(q);H===i.FLOAT&&(X=i.RGBA32F),H===i.HALF_FLOAT&&(X=i.RGBA16F),H===i.UNSIGNED_BYTE&&(X=we===at?i.SRGB8_ALPHA8:i.RGBA8),H===i.UNSIGNED_SHORT_4_4_4_4&&(X=i.RGBA4),H===i.UNSIGNED_SHORT_5_5_5_1&&(X=i.RGB5_A1)}return(X===i.R16F||X===i.R32F||X===i.RG16F||X===i.RG32F||X===i.RGBA16F||X===i.RGBA32F)&&e.get("EXT_color_buffer_float"),X}function M(I,w){let H;return I?w===null||w===Qi||w===Rr?H=i.DEPTH24_STENCIL8:w===Cn?H=i.DEPTH32F_STENCIL8:w===Ar&&(H=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===Qi||w===Rr?H=i.DEPTH_COMPONENT24:w===Cn?H=i.DEPTH_COMPONENT32F:w===Ar&&(H=i.DEPTH_COMPONENT16),H}function C(I,w){return m(I)===!0||I.isFramebufferTexture&&I.minFilter!==Qt&&I.minFilter!==Jt?Math.log2(Math.max(w.width,w.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?w.mipmaps.length:1}function P(I){const w=I.target;w.removeEventListener("dispose",P),T(w),w.isVideoTexture&&h.delete(w)}function R(I){const w=I.target;w.removeEventListener("dispose",R),x(w)}function T(I){const w=n.get(I);if(w.__webglInit===void 0)return;const H=I.source,q=d.get(H);if(q){const J=q[w.__cacheKey];J.usedTimes--,J.usedTimes===0&&v(I),Object.keys(q).length===0&&d.delete(H)}n.remove(I)}function v(I){const w=n.get(I);i.deleteTexture(w.__webglTexture);const H=I.source,q=d.get(H);delete q[w.__cacheKey],o.memory.textures--}function x(I){const w=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(w.__webglFramebuffer[q]))for(let J=0;J<w.__webglFramebuffer[q].length;J++)i.deleteFramebuffer(w.__webglFramebuffer[q][J]);else i.deleteFramebuffer(w.__webglFramebuffer[q]);w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer[q])}else{if(Array.isArray(w.__webglFramebuffer))for(let q=0;q<w.__webglFramebuffer.length;q++)i.deleteFramebuffer(w.__webglFramebuffer[q]);else i.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&i.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let q=0;q<w.__webglColorRenderbuffer.length;q++)w.__webglColorRenderbuffer[q]&&i.deleteRenderbuffer(w.__webglColorRenderbuffer[q]);w.__webglDepthRenderbuffer&&i.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const H=I.textures;for(let q=0,J=H.length;q<J;q++){const X=n.get(H[q]);X.__webglTexture&&(i.deleteTexture(X.__webglTexture),o.memory.textures--),n.remove(H[q])}n.remove(I)}let A=0;function D(){A=0}function U(){const I=A;return I>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+s.maxTextures),A+=1,I}function L(I){const w=[];return w.push(I.wrapS),w.push(I.wrapT),w.push(I.wrapR||0),w.push(I.magFilter),w.push(I.minFilter),w.push(I.anisotropy),w.push(I.internalFormat),w.push(I.format),w.push(I.type),w.push(I.generateMipmaps),w.push(I.premultiplyAlpha),w.push(I.flipY),w.push(I.unpackAlignment),w.push(I.colorSpace),w.join()}function k(I,w){const H=n.get(I);if(I.isVideoTexture&&Ge(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&H.__version!==I.version){const q=I.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{j(H,I,w);return}}else I.isExternalTexture&&(H.__webglTexture=I.sourceTexture?I.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,H.__webglTexture,i.TEXTURE0+w)}function O(I,w){const H=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&H.__version!==I.version){j(H,I,w);return}t.bindTexture(i.TEXTURE_2D_ARRAY,H.__webglTexture,i.TEXTURE0+w)}function K(I,w){const H=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&H.__version!==I.version){j(H,I,w);return}t.bindTexture(i.TEXTURE_3D,H.__webglTexture,i.TEXTURE0+w)}function V(I,w){const H=n.get(I);if(I.version>0&&H.__version!==I.version){Z(H,I,w);return}t.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture,i.TEXTURE0+w)}const Y={[Ji]:i.REPEAT,[Ti]:i.CLAMP_TO_EDGE,[Vo]:i.MIRRORED_REPEAT},ne={[Qt]:i.NEAREST,[$u]:i.NEAREST_MIPMAP_NEAREST,[hr]:i.NEAREST_MIPMAP_LINEAR,[Jt]:i.LINEAR,[Ao]:i.LINEAR_MIPMAP_NEAREST,[ii]:i.LINEAR_MIPMAP_LINEAR},ue={[Vf]:i.NEVER,[qf]:i.ALWAYS,[Hf]:i.LESS,[rd]:i.LEQUAL,[Gf]:i.EQUAL,[jf]:i.GEQUAL,[Wf]:i.GREATER,[Xf]:i.NOTEQUAL};function Ae(I,w){if(w.type===Cn&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===Jt||w.magFilter===Ao||w.magFilter===hr||w.magFilter===ii||w.minFilter===Jt||w.minFilter===Ao||w.minFilter===hr||w.minFilter===ii)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(I,i.TEXTURE_WRAP_S,Y[w.wrapS]),i.texParameteri(I,i.TEXTURE_WRAP_T,Y[w.wrapT]),(I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY)&&i.texParameteri(I,i.TEXTURE_WRAP_R,Y[w.wrapR]),i.texParameteri(I,i.TEXTURE_MAG_FILTER,ne[w.magFilter]),i.texParameteri(I,i.TEXTURE_MIN_FILTER,ne[w.minFilter]),w.compareFunction&&(i.texParameteri(I,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(I,i.TEXTURE_COMPARE_FUNC,ue[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===Qt||w.minFilter!==hr&&w.minFilter!==ii||w.type===Cn&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){const H=e.get("EXT_texture_filter_anisotropic");i.texParameterf(I,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,s.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function Qe(I,w){let H=!1;I.__webglInit===void 0&&(I.__webglInit=!0,w.addEventListener("dispose",P));const q=w.source;let J=d.get(q);J===void 0&&(J={},d.set(q,J));const X=L(w);if(X!==I.__cacheKey){J[X]===void 0&&(J[X]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,H=!0),J[X].usedTimes++;const we=J[I.__cacheKey];we!==void 0&&(J[I.__cacheKey].usedTimes--,we.usedTimes===0&&v(w)),I.__cacheKey=X,I.__webglTexture=J[X].texture}return H}function tt(I,w,H){return Math.floor(Math.floor(I/H)/w)}function je(I,w,H,q){const X=I.updateRanges;if(X.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,w.width,w.height,H,q,w.data);else{X.sort((ie,he)=>ie.start-he.start);let we=0;for(let ie=1;ie<X.length;ie++){const he=X[we],Pe=X[ie],Se=he.start+he.count,le=tt(Pe.start,w.width,4),Ve=tt(he.start,w.width,4);Pe.start<=Se+1&&le===Ve&&tt(Pe.start+Pe.count-1,w.width,4)===le?he.count=Math.max(he.count,Pe.start+Pe.count-he.start):(++we,X[we]=Pe)}X.length=we+1;const re=i.getParameter(i.UNPACK_ROW_LENGTH),ye=i.getParameter(i.UNPACK_SKIP_PIXELS),Me=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,w.width);for(let ie=0,he=X.length;ie<he;ie++){const Pe=X[ie],Se=Math.floor(Pe.start/4),le=Math.ceil(Pe.count/4),Ve=Se%w.width,F=Math.floor(Se/w.width),se=le,oe=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ve),i.pixelStorei(i.UNPACK_SKIP_ROWS,F),t.texSubImage2D(i.TEXTURE_2D,0,Ve,F,se,oe,H,q,w.data)}I.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,re),i.pixelStorei(i.UNPACK_SKIP_PIXELS,ye),i.pixelStorei(i.UNPACK_SKIP_ROWS,Me)}}function j(I,w,H){let q=i.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(q=i.TEXTURE_2D_ARRAY),w.isData3DTexture&&(q=i.TEXTURE_3D);const J=Qe(I,w),X=w.source;t.bindTexture(q,I.__webglTexture,i.TEXTURE0+H);const we=n.get(X);if(X.version!==we.__version||J===!0){t.activeTexture(i.TEXTURE0+H);const re=Je.getPrimaries(Je.workingColorSpace),ye=w.colorSpace===bi?null:Je.getPrimaries(w.colorSpace),Me=w.colorSpace===bi||re===ye?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me);let ie=_(w.image,!1,s.maxTextureSize);ie=Nt(w,ie);const he=r.convert(w.format,w.colorSpace),Pe=r.convert(w.type);let Se=y(w.internalFormat,he,Pe,w.colorSpace,w.isVideoTexture);Ae(q,w);let le;const Ve=w.mipmaps,F=w.isVideoTexture!==!0,se=we.__version===void 0||J===!0,oe=X.dataReady,pe=C(w,ie);if(w.isDepthTexture)Se=M(w.format===Pr,w.type),se&&(F?t.texStorage2D(i.TEXTURE_2D,1,Se,ie.width,ie.height):t.texImage2D(i.TEXTURE_2D,0,Se,ie.width,ie.height,0,he,Pe,null));else if(w.isDataTexture)if(Ve.length>0){F&&se&&t.texStorage2D(i.TEXTURE_2D,pe,Se,Ve[0].width,Ve[0].height);for(let ee=0,$=Ve.length;ee<$;ee++)le=Ve[ee],F?oe&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,le.width,le.height,he,Pe,le.data):t.texImage2D(i.TEXTURE_2D,ee,Se,le.width,le.height,0,he,Pe,le.data);w.generateMipmaps=!1}else F?(se&&t.texStorage2D(i.TEXTURE_2D,pe,Se,ie.width,ie.height),oe&&je(w,ie,he,Pe)):t.texImage2D(i.TEXTURE_2D,0,Se,ie.width,ie.height,0,he,Pe,ie.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){F&&se&&t.texStorage3D(i.TEXTURE_2D_ARRAY,pe,Se,Ve[0].width,Ve[0].height,ie.depth);for(let ee=0,$=Ve.length;ee<$;ee++)if(le=Ve[ee],w.format!==Mn)if(he!==null)if(F){if(oe)if(w.layerUpdates.size>0){const _e=Kh(le.width,le.height,w.format,w.type);for(const Oe of w.layerUpdates){const ft=le.data.subarray(Oe*_e/le.data.BYTES_PER_ELEMENT,(Oe+1)*_e/le.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,Oe,le.width,le.height,1,he,ft)}w.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,le.width,le.height,ie.depth,he,le.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ee,Se,le.width,le.height,ie.depth,0,le.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else F?oe&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,le.width,le.height,ie.depth,he,Pe,le.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ee,Se,le.width,le.height,ie.depth,0,he,Pe,le.data)}else{F&&se&&t.texStorage2D(i.TEXTURE_2D,pe,Se,Ve[0].width,Ve[0].height);for(let ee=0,$=Ve.length;ee<$;ee++)le=Ve[ee],w.format!==Mn?he!==null?F?oe&&t.compressedTexSubImage2D(i.TEXTURE_2D,ee,0,0,le.width,le.height,he,le.data):t.compressedTexImage2D(i.TEXTURE_2D,ee,Se,le.width,le.height,0,le.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):F?oe&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,le.width,le.height,he,Pe,le.data):t.texImage2D(i.TEXTURE_2D,ee,Se,le.width,le.height,0,he,Pe,le.data)}else if(w.isDataArrayTexture)if(F){if(se&&t.texStorage3D(i.TEXTURE_2D_ARRAY,pe,Se,ie.width,ie.height,ie.depth),oe)if(w.layerUpdates.size>0){const ee=Kh(ie.width,ie.height,w.format,w.type);for(const $ of w.layerUpdates){const _e=ie.data.subarray($*ee/ie.data.BYTES_PER_ELEMENT,($+1)*ee/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,$,ie.width,ie.height,1,he,Pe,_e)}w.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,he,Pe,ie.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Se,ie.width,ie.height,ie.depth,0,he,Pe,ie.data);else if(w.isData3DTexture)F?(se&&t.texStorage3D(i.TEXTURE_3D,pe,Se,ie.width,ie.height,ie.depth),oe&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,he,Pe,ie.data)):t.texImage3D(i.TEXTURE_3D,0,Se,ie.width,ie.height,ie.depth,0,he,Pe,ie.data);else if(w.isFramebufferTexture){if(se)if(F)t.texStorage2D(i.TEXTURE_2D,pe,Se,ie.width,ie.height);else{let ee=ie.width,$=ie.height;for(let _e=0;_e<pe;_e++)t.texImage2D(i.TEXTURE_2D,_e,Se,ee,$,0,he,Pe,null),ee>>=1,$>>=1}}else if(Ve.length>0){if(F&&se){const ee=bt(Ve[0]);t.texStorage2D(i.TEXTURE_2D,pe,Se,ee.width,ee.height)}for(let ee=0,$=Ve.length;ee<$;ee++)le=Ve[ee],F?oe&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,he,Pe,le):t.texImage2D(i.TEXTURE_2D,ee,Se,he,Pe,le);w.generateMipmaps=!1}else if(F){if(se){const ee=bt(ie);t.texStorage2D(i.TEXTURE_2D,pe,Se,ee.width,ee.height)}oe&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,he,Pe,ie)}else t.texImage2D(i.TEXTURE_2D,0,Se,he,Pe,ie);m(w)&&p(q),we.__version=X.version,w.onUpdate&&w.onUpdate(w)}I.__version=w.version}function Z(I,w,H){if(w.image.length!==6)return;const q=Qe(I,w),J=w.source;t.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+H);const X=n.get(J);if(J.version!==X.__version||q===!0){t.activeTexture(i.TEXTURE0+H);const we=Je.getPrimaries(Je.workingColorSpace),re=w.colorSpace===bi?null:Je.getPrimaries(w.colorSpace),ye=w.colorSpace===bi||we===re?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye);const Me=w.isCompressedTexture||w.image[0].isCompressedTexture,ie=w.image[0]&&w.image[0].isDataTexture,he=[];for(let $=0;$<6;$++)!Me&&!ie?he[$]=_(w.image[$],!0,s.maxCubemapSize):he[$]=ie?w.image[$].image:w.image[$],he[$]=Nt(w,he[$]);const Pe=he[0],Se=r.convert(w.format,w.colorSpace),le=r.convert(w.type),Ve=y(w.internalFormat,Se,le,w.colorSpace),F=w.isVideoTexture!==!0,se=X.__version===void 0||q===!0,oe=J.dataReady;let pe=C(w,Pe);Ae(i.TEXTURE_CUBE_MAP,w);let ee;if(Me){F&&se&&t.texStorage2D(i.TEXTURE_CUBE_MAP,pe,Ve,Pe.width,Pe.height);for(let $=0;$<6;$++){ee=he[$].mipmaps;for(let _e=0;_e<ee.length;_e++){const Oe=ee[_e];w.format!==Mn?Se!==null?F?oe&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,_e,0,0,Oe.width,Oe.height,Se,Oe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,_e,Ve,Oe.width,Oe.height,0,Oe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,_e,0,0,Oe.width,Oe.height,Se,le,Oe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,_e,Ve,Oe.width,Oe.height,0,Se,le,Oe.data)}}}else{if(ee=w.mipmaps,F&&se){ee.length>0&&pe++;const $=bt(he[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,pe,Ve,$.width,$.height)}for(let $=0;$<6;$++)if(ie){F?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,he[$].width,he[$].height,Se,le,he[$].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Ve,he[$].width,he[$].height,0,Se,le,he[$].data);for(let _e=0;_e<ee.length;_e++){const ft=ee[_e].image[$].image;F?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,_e+1,0,0,ft.width,ft.height,Se,le,ft.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,_e+1,Ve,ft.width,ft.height,0,Se,le,ft.data)}}else{F?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Se,le,he[$]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Ve,Se,le,he[$]);for(let _e=0;_e<ee.length;_e++){const Oe=ee[_e];F?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,_e+1,0,0,Se,le,Oe.image[$]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,_e+1,Ve,Se,le,Oe.image[$])}}}m(w)&&p(i.TEXTURE_CUBE_MAP),X.__version=J.version,w.onUpdate&&w.onUpdate(w)}I.__version=w.version}function me(I,w,H,q,J,X){const we=r.convert(H.format,H.colorSpace),re=r.convert(H.type),ye=y(H.internalFormat,we,re,H.colorSpace),Me=n.get(w),ie=n.get(H);if(ie.__renderTarget=w,!Me.__hasExternalTextures){const he=Math.max(1,w.width>>X),Pe=Math.max(1,w.height>>X);J===i.TEXTURE_3D||J===i.TEXTURE_2D_ARRAY?t.texImage3D(J,X,ye,he,Pe,w.depth,0,we,re,null):t.texImage2D(J,X,ye,he,Pe,0,we,re,null)}t.bindFramebuffer(i.FRAMEBUFFER,I),xe(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,J,ie.__webglTexture,0,_t(w)):(J===i.TEXTURE_2D||J>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,q,J,ie.__webglTexture,X),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ne(I,w,H){if(i.bindRenderbuffer(i.RENDERBUFFER,I),w.depthBuffer){const q=w.depthTexture,J=q&&q.isDepthTexture?q.type:null,X=M(w.stencilBuffer,J),we=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,re=_t(w);xe(w)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,re,X,w.width,w.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,re,X,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,X,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,we,i.RENDERBUFFER,I)}else{const q=w.textures;for(let J=0;J<q.length;J++){const X=q[J],we=r.convert(X.format,X.colorSpace),re=r.convert(X.type),ye=y(X.internalFormat,we,re,X.colorSpace),Me=_t(w);H&&xe(w)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Me,ye,w.width,w.height):xe(w)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Me,ye,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,ye,w.width,w.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function be(I,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,I),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const q=n.get(w.depthTexture);q.__renderTarget=w,(!q.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),k(w.depthTexture,0);const J=q.__webglTexture,X=_t(w);if(w.depthTexture.format===Cr)xe(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,J,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,J,0);else if(w.depthTexture.format===Pr)xe(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,J,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function Ze(I){const w=n.get(I),H=I.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==I.depthTexture){const q=I.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),q){const J=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,q.removeEventListener("dispose",J)};q.addEventListener("dispose",J),w.__depthDisposeCallback=J}w.__boundDepthTexture=q}if(I.depthTexture&&!w.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");const q=I.texture.mipmaps;q&&q.length>0?be(w.__webglFramebuffer[0],I):be(w.__webglFramebuffer,I)}else if(H){w.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[q]),w.__webglDepthbuffer[q]===void 0)w.__webglDepthbuffer[q]=i.createRenderbuffer(),Ne(w.__webglDepthbuffer[q],I,!1);else{const J=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=w.__webglDepthbuffer[q];i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,X)}}else{const q=I.texture.mipmaps;if(q&&q.length>0?t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=i.createRenderbuffer(),Ne(w.__webglDepthbuffer,I,!1);else{const J=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=w.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,X)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function zt(I,w,H){const q=n.get(I);w!==void 0&&me(q.__webglFramebuffer,I,I.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),H!==void 0&&Ze(I)}function N(I){const w=I.texture,H=n.get(I),q=n.get(w);I.addEventListener("dispose",R);const J=I.textures,X=I.isWebGLCubeRenderTarget===!0,we=J.length>1;if(we||(q.__webglTexture===void 0&&(q.__webglTexture=i.createTexture()),q.__version=w.version,o.memory.textures++),X){H.__webglFramebuffer=[];for(let re=0;re<6;re++)if(w.mipmaps&&w.mipmaps.length>0){H.__webglFramebuffer[re]=[];for(let ye=0;ye<w.mipmaps.length;ye++)H.__webglFramebuffer[re][ye]=i.createFramebuffer()}else H.__webglFramebuffer[re]=i.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){H.__webglFramebuffer=[];for(let re=0;re<w.mipmaps.length;re++)H.__webglFramebuffer[re]=i.createFramebuffer()}else H.__webglFramebuffer=i.createFramebuffer();if(we)for(let re=0,ye=J.length;re<ye;re++){const Me=n.get(J[re]);Me.__webglTexture===void 0&&(Me.__webglTexture=i.createTexture(),o.memory.textures++)}if(I.samples>0&&xe(I)===!1){H.__webglMultisampledFramebuffer=i.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let re=0;re<J.length;re++){const ye=J[re];H.__webglColorRenderbuffer[re]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,H.__webglColorRenderbuffer[re]);const Me=r.convert(ye.format,ye.colorSpace),ie=r.convert(ye.type),he=y(ye.internalFormat,Me,ie,ye.colorSpace,I.isXRRenderTarget===!0),Pe=_t(I);i.renderbufferStorageMultisample(i.RENDERBUFFER,Pe,he,I.width,I.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+re,i.RENDERBUFFER,H.__webglColorRenderbuffer[re])}i.bindRenderbuffer(i.RENDERBUFFER,null),I.depthBuffer&&(H.__webglDepthRenderbuffer=i.createRenderbuffer(),Ne(H.__webglDepthRenderbuffer,I,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(X){t.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),Ae(i.TEXTURE_CUBE_MAP,w);for(let re=0;re<6;re++)if(w.mipmaps&&w.mipmaps.length>0)for(let ye=0;ye<w.mipmaps.length;ye++)me(H.__webglFramebuffer[re][ye],I,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+re,ye);else me(H.__webglFramebuffer[re],I,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);m(w)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(we){for(let re=0,ye=J.length;re<ye;re++){const Me=J[re],ie=n.get(Me);let he=i.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(he=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(he,ie.__webglTexture),Ae(he,Me),me(H.__webglFramebuffer,I,Me,i.COLOR_ATTACHMENT0+re,he,0),m(Me)&&p(he)}t.unbindTexture()}else{let re=i.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(re=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(re,q.__webglTexture),Ae(re,w),w.mipmaps&&w.mipmaps.length>0)for(let ye=0;ye<w.mipmaps.length;ye++)me(H.__webglFramebuffer[ye],I,w,i.COLOR_ATTACHMENT0,re,ye);else me(H.__webglFramebuffer,I,w,i.COLOR_ATTACHMENT0,re,0);m(w)&&p(re),t.unbindTexture()}I.depthBuffer&&Ze(I)}function gt(I){const w=I.textures;for(let H=0,q=w.length;H<q;H++){const J=w[H];if(m(J)){const X=S(I),we=n.get(J).__webglTexture;t.bindTexture(X,we),p(X),t.unbindTexture()}}}const Be=[],De=[];function ve(I){if(I.samples>0){if(xe(I)===!1){const w=I.textures,H=I.width,q=I.height;let J=i.COLOR_BUFFER_BIT;const X=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,we=n.get(I),re=w.length>1;if(re)for(let Me=0;Me<w.length;Me++)t.bindFramebuffer(i.FRAMEBUFFER,we.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,we.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,we.__webglMultisampledFramebuffer);const ye=I.texture.mipmaps;ye&&ye.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,we.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,we.__webglFramebuffer);for(let Me=0;Me<w.length;Me++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(J|=i.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(J|=i.STENCIL_BUFFER_BIT)),re){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,we.__webglColorRenderbuffer[Me]);const ie=n.get(w[Me]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ie,0)}i.blitFramebuffer(0,0,H,q,0,0,H,q,J,i.NEAREST),l===!0&&(Be.length=0,De.length=0,Be.push(i.COLOR_ATTACHMENT0+Me),I.depthBuffer&&I.resolveDepthBuffer===!1&&(Be.push(X),De.push(X),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,De)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Be))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),re)for(let Me=0;Me<w.length;Me++){t.bindFramebuffer(i.FRAMEBUFFER,we.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.RENDERBUFFER,we.__webglColorRenderbuffer[Me]);const ie=n.get(w[Me]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,we.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.TEXTURE_2D,ie,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,we.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&l){const w=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[w])}}}function _t(I){return Math.min(s.maxSamples,I.samples)}function xe(I){const w=n.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function Ge(I){const w=o.render.frame;h.get(I)!==w&&(h.set(I,w),I.update())}function Nt(I,w){const H=I.colorSpace,q=I.format,J=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||H!==jt&&H!==bi&&(Je.getTransfer(H)===at?(q!==Mn||J!==Ln)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),w}function bt(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(c.width=I.naturalWidth||I.width,c.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(c.width=I.displayWidth,c.height=I.displayHeight):(c.width=I.width,c.height=I.height),c}this.allocateTextureUnit=U,this.resetTextureUnits=D,this.setTexture2D=k,this.setTexture2DArray=O,this.setTexture3D=K,this.setTextureCube=V,this.rebindTextures=zt,this.setupRenderTarget=N,this.updateRenderTargetMipmap=gt,this.updateMultisampleRenderTarget=ve,this.setupDepthRenderbuffer=Ze,this.setupFrameBufferTexture=me,this.useMultisampledRTT=xe}function px(i,e){function t(n,s=bi){let r;const o=Je.getTransfer(s);if(n===Ln)return i.UNSIGNED_BYTE;if(n===_c)return i.UNSIGNED_SHORT_4_4_4_4;if(n===vc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Qu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===ed)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Zu)return i.BYTE;if(n===Ju)return i.SHORT;if(n===Ar)return i.UNSIGNED_SHORT;if(n===gc)return i.INT;if(n===Qi)return i.UNSIGNED_INT;if(n===Cn)return i.FLOAT;if(n===js)return i.HALF_FLOAT;if(n===td)return i.ALPHA;if(n===nd)return i.RGB;if(n===Mn)return i.RGBA;if(n===Cr)return i.DEPTH_COMPONENT;if(n===Pr)return i.DEPTH_STENCIL;if(n===xc)return i.RED;if(n===yc)return i.RED_INTEGER;if(n===id)return i.RG;if(n===Mc)return i.RG_INTEGER;if(n===Sc)return i.RGBA_INTEGER;if(n===Ro||n===Co||n===Po||n===Do)if(o===at)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ro)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Co)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Po)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Do)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ro)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Co)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Po)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Do)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===_l||n===vl||n===xl||n===yl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===_l)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===vl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===xl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===yl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ml||n===Sl||n===wl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ml||n===Sl)return o===at?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===wl)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===bl||n===El||n===Tl||n===Al||n===Rl||n===Cl||n===Pl||n===Dl||n===Il||n===Ll||n===Nl||n===Ul||n===Fl||n===Ol)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===bl)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===El)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Tl)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Al)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Rl)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Cl)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Pl)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Dl)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Il)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ll)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Nl)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ul)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Fl)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ol)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===kl||n===Bl||n===zl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===kl)return o===at?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Bl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===zl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Vl||n===Hl||n===Gl||n===Wl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Vl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Hl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Gl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Wl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Rr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const mx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,gx=`
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

}`;class _x{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Sd(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new li({vertexShader:mx,fragmentShader:gx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new qe(new Li(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class vx extends ns{constructor(e,t){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null;const _=typeof XRWebGLBinding<"u",m=new _x,p={},S=t.getContextAttributes();let y=null,M=null;const C=[],P=[],R=new de;let T=null;const v=new Wt;v.viewport=new et;const x=new Wt;x.viewport=new et;const A=[v,x],D=new Cm;let U=null,L=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let Z=C[j];return Z===void 0&&(Z=new Ra,C[j]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(j){let Z=C[j];return Z===void 0&&(Z=new Ra,C[j]=Z),Z.getGripSpace()},this.getHand=function(j){let Z=C[j];return Z===void 0&&(Z=new Ra,C[j]=Z),Z.getHandSpace()};function k(j){const Z=P.indexOf(j.inputSource);if(Z===-1)return;const me=C[Z];me!==void 0&&(me.update(j.inputSource,j.frame,c||o),me.dispatchEvent({type:j.type,data:j.inputSource}))}function O(){s.removeEventListener("select",k),s.removeEventListener("selectstart",k),s.removeEventListener("selectend",k),s.removeEventListener("squeeze",k),s.removeEventListener("squeezestart",k),s.removeEventListener("squeezeend",k),s.removeEventListener("end",O),s.removeEventListener("inputsourceschange",K);for(let j=0;j<C.length;j++){const Z=P[j];Z!==null&&(P[j]=null,C[j].disconnect(Z))}U=null,L=null,m.reset();for(const j in p)delete p[j];e.setRenderTarget(y),f=null,d=null,u=null,s=null,M=null,je.stop(),n.isPresenting=!1,e.setPixelRatio(T),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(y=e.getRenderTarget(),s.addEventListener("select",k),s.addEventListener("selectstart",k),s.addEventListener("selectend",k),s.addEventListener("squeeze",k),s.addEventListener("squeezestart",k),s.addEventListener("squeezeend",k),s.addEventListener("end",O),s.addEventListener("inputsourceschange",K),S.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(R),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let me=null,Ne=null,be=null;S.depth&&(be=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,me=S.stencil?Pr:Cr,Ne=S.stencil?Rr:Qi);const Ze={colorFormat:t.RGBA8,depthFormat:be,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(Ze),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),M=new Ii(d.textureWidth,d.textureHeight,{format:Mn,type:Ln,depthTexture:new Md(d.textureWidth,d.textureHeight,Ne,void 0,void 0,void 0,void 0,void 0,void 0,me),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const me={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,me),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new Ii(f.framebufferWidth,f.framebufferHeight,{format:Mn,type:Ln,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),je.setContext(s),je.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function K(j){for(let Z=0;Z<j.removed.length;Z++){const me=j.removed[Z],Ne=P.indexOf(me);Ne>=0&&(P[Ne]=null,C[Ne].disconnect(me))}for(let Z=0;Z<j.added.length;Z++){const me=j.added[Z];let Ne=P.indexOf(me);if(Ne===-1){for(let Ze=0;Ze<C.length;Ze++)if(Ze>=P.length){P.push(me),Ne=Ze;break}else if(P[Ze]===null){P[Ze]=me,Ne=Ze;break}if(Ne===-1)break}const be=C[Ne];be&&be.connect(me)}}const V=new b,Y=new b;function ne(j,Z,me){V.setFromMatrixPosition(Z.matrixWorld),Y.setFromMatrixPosition(me.matrixWorld);const Ne=V.distanceTo(Y),be=Z.projectionMatrix.elements,Ze=me.projectionMatrix.elements,zt=be[14]/(be[10]-1),N=be[14]/(be[10]+1),gt=(be[9]+1)/be[5],Be=(be[9]-1)/be[5],De=(be[8]-1)/be[0],ve=(Ze[8]+1)/Ze[0],_t=zt*De,xe=zt*ve,Ge=Ne/(-De+ve),Nt=Ge*-De;if(Z.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Nt),j.translateZ(Ge),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),be[10]===-1)j.projectionMatrix.copy(Z.projectionMatrix),j.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{const bt=zt+Ge,I=N+Ge,w=_t-Nt,H=xe+(Ne-Nt),q=gt*N/I*bt,J=Be*N/I*bt;j.projectionMatrix.makePerspective(w,H,q,J,bt,I),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function ue(j,Z){Z===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(Z.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let Z=j.near,me=j.far;m.texture!==null&&(m.depthNear>0&&(Z=m.depthNear),m.depthFar>0&&(me=m.depthFar)),D.near=x.near=v.near=Z,D.far=x.far=v.far=me,(U!==D.near||L!==D.far)&&(s.updateRenderState({depthNear:D.near,depthFar:D.far}),U=D.near,L=D.far),D.layers.mask=j.layers.mask|6,v.layers.mask=D.layers.mask&3,x.layers.mask=D.layers.mask&5;const Ne=j.parent,be=D.cameras;ue(D,Ne);for(let Ze=0;Ze<be.length;Ze++)ue(be[Ze],Ne);be.length===2?ne(D,v,x):D.projectionMatrix.copy(v.projectionMatrix),Ae(j,D,Ne)};function Ae(j,Z,me){me===null?j.matrix.copy(Z.matrixWorld):(j.matrix.copy(me.matrixWorld),j.matrix.invert(),j.matrix.multiply(Z.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(Z.projectionMatrix),j.projectionMatrixInverse.copy(Z.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Bs*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(j){l=j,d!==null&&(d.fixedFoveation=j),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=j)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(D)},this.getCameraTexture=function(j){return p[j]};let Qe=null;function tt(j,Z){if(h=Z.getViewerPose(c||o),g=Z,h!==null){const me=h.views;f!==null&&(e.setRenderTargetFramebuffer(M,f.framebuffer),e.setRenderTarget(M));let Ne=!1;me.length!==D.cameras.length&&(D.cameras.length=0,Ne=!0);for(let N=0;N<me.length;N++){const gt=me[N];let Be=null;if(f!==null)Be=f.getViewport(gt);else{const ve=u.getViewSubImage(d,gt);Be=ve.viewport,N===0&&(e.setRenderTargetTextures(M,ve.colorTexture,ve.depthStencilTexture),e.setRenderTarget(M))}let De=A[N];De===void 0&&(De=new Wt,De.layers.enable(N),De.viewport=new et,A[N]=De),De.matrix.fromArray(gt.transform.matrix),De.matrix.decompose(De.position,De.quaternion,De.scale),De.projectionMatrix.fromArray(gt.projectionMatrix),De.projectionMatrixInverse.copy(De.projectionMatrix).invert(),De.viewport.set(Be.x,Be.y,Be.width,Be.height),N===0&&(D.matrix.copy(De.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),Ne===!0&&D.cameras.push(De)}const be=s.enabledFeatures;if(be&&be.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){u=n.getBinding();const N=u.getDepthInformation(me[0]);N&&N.isValid&&N.texture&&m.init(N,s.renderState)}if(be&&be.includes("camera-access")&&_){e.state.unbindTexture(),u=n.getBinding();for(let N=0;N<me.length;N++){const gt=me[N].camera;if(gt){let Be=p[gt];Be||(Be=new Sd,p[gt]=Be);const De=u.getCameraImage(gt);Be.sourceTexture=De}}}}for(let me=0;me<C.length;me++){const Ne=P[me],be=C[me];Ne!==null&&be!==void 0&&be.update(Ne,Z,c||o)}Qe&&Qe(j,Z),Z.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Z}),g=null}const je=new Dd;je.setAnimationLoop(tt),this.setAnimationLoop=function(j){Qe=j},this.dispose=function(){}}}const Hi=new Sn,xx=new Ue;function yx(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,dd(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,S,y,M){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,M)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,S,y):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Xt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Xt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const S=e.get(p),y=S.envMap,M=S.envMapRotation;y&&(m.envMap.value=y,Hi.copy(M),Hi.x*=-1,Hi.y*=-1,Hi.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Hi.y*=-1,Hi.z*=-1),m.envMapRotation.value.setFromMatrix4(xx.makeRotationFromEuler(Hi)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,S,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*S,m.scale.value=y*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,S){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Xt&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const S=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Mx(i,e,t,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,y){const M=y.program;n.uniformBlockBinding(S,M)}function c(S,y){let M=s[S.id];M===void 0&&(g(S),M=h(S),s[S.id]=M,S.addEventListener("dispose",m));const C=y.program;n.updateUBOMapping(S,C);const P=e.render.frame;r[S.id]!==P&&(d(S),r[S.id]=P)}function h(S){const y=u();S.__bindingPointIndex=y;const M=i.createBuffer(),C=S.__size,P=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,C,P),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,M),M}function u(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(S){const y=s[S.id],M=S.uniforms,C=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let P=0,R=M.length;P<R;P++){const T=Array.isArray(M[P])?M[P]:[M[P]];for(let v=0,x=T.length;v<x;v++){const A=T[v];if(f(A,P,v,C)===!0){const D=A.__offset,U=Array.isArray(A.value)?A.value:[A.value];let L=0;for(let k=0;k<U.length;k++){const O=U[k],K=_(O);typeof O=="number"||typeof O=="boolean"?(A.__data[0]=O,i.bufferSubData(i.UNIFORM_BUFFER,D+L,A.__data)):O.isMatrix3?(A.__data[0]=O.elements[0],A.__data[1]=O.elements[1],A.__data[2]=O.elements[2],A.__data[3]=0,A.__data[4]=O.elements[3],A.__data[5]=O.elements[4],A.__data[6]=O.elements[5],A.__data[7]=0,A.__data[8]=O.elements[6],A.__data[9]=O.elements[7],A.__data[10]=O.elements[8],A.__data[11]=0):(O.toArray(A.__data,L),L+=K.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,D,A.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(S,y,M,C){const P=S.value,R=y+"_"+M;if(C[R]===void 0)return typeof P=="number"||typeof P=="boolean"?C[R]=P:C[R]=P.clone(),!0;{const T=C[R];if(typeof P=="number"||typeof P=="boolean"){if(T!==P)return C[R]=P,!0}else if(T.equals(P)===!1)return T.copy(P),!0}return!1}function g(S){const y=S.uniforms;let M=0;const C=16;for(let R=0,T=y.length;R<T;R++){const v=Array.isArray(y[R])?y[R]:[y[R]];for(let x=0,A=v.length;x<A;x++){const D=v[x],U=Array.isArray(D.value)?D.value:[D.value];for(let L=0,k=U.length;L<k;L++){const O=U[L],K=_(O),V=M%C,Y=V%K.boundary,ne=V+Y;M+=Y,ne!==0&&C-ne<K.storage&&(M+=C-ne),D.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=M,M+=K.storage}}}const P=M%C;return P>0&&(M+=C-P),S.__size=M,S.__cache={},this}function _(S){const y={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(y.boundary=4,y.storage=4):S.isVector2?(y.boundary=8,y.storage=8):S.isVector3||S.isColor?(y.boundary=16,y.storage=12):S.isVector4?(y.boundary=16,y.storage=16):S.isMatrix3?(y.boundary=48,y.storage=48):S.isMatrix4?(y.boundary=64,y.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),y}function m(S){const y=S.target;y.removeEventListener("dispose",m);const M=o.indexOf(y.__bindingPointIndex);o.splice(M,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function p(){for(const S in s)i.deleteBuffer(s[S]);o=[],s={},r={}}return{bind:l,update:c,dispose:p}}class Sx{constructor(e={}){const{canvas:t=hp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const S=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ci,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const M=this;let C=!1;this._outputColorSpace=Rt;let P=0,R=0,T=null,v=-1,x=null;const A=new et,D=new et;let U=null;const L=new Ce(0);let k=0,O=t.width,K=t.height,V=1,Y=null,ne=null;const ue=new et(0,0,O,K),Ae=new et(0,0,O,K);let Qe=!1;const tt=new Rc;let je=!1,j=!1;const Z=new Ue,me=new b,Ne=new et,be={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ze=!1;function zt(){return T===null?V:1}let N=n;function gt(E,B){return t.getContext(E,B)}try{const E={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${pc}`),t.addEventListener("webglcontextlost",oe,!1),t.addEventListener("webglcontextrestored",pe,!1),t.addEventListener("webglcontextcreationerror",ee,!1),N===null){const B="webgl2";if(N=gt(B,E),N===null)throw gt(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Be,De,ve,_t,xe,Ge,Nt,bt,I,w,H,q,J,X,we,re,ye,Me,ie,he,Pe,Se,le,Ve;function F(){Be=new I_(N),Be.init(),Se=new px(N,Be),De=new E_(N,Be,e,Se),ve=new dx(N,Be),De.reversedDepthBuffer&&d&&ve.buffers.depth.setReversed(!0),_t=new U_(N),xe=new Qv,Ge=new fx(N,Be,ve,xe,De,Se,_t),Nt=new A_(M),bt=new D_(M),I=new Vm(N),le=new w_(N,I),w=new L_(N,I,_t,le),H=new O_(N,w,I,_t),ie=new F_(N,De,Ge),re=new T_(xe),q=new Jv(M,Nt,bt,Be,De,le,re),J=new yx(M,xe),X=new tx,we=new ax(Be),Me=new S_(M,Nt,bt,ve,H,f,l),ye=new hx(M,H,De),Ve=new Mx(N,_t,De,ve),he=new b_(N,Be,_t),Pe=new N_(N,Be,_t),_t.programs=q.programs,M.capabilities=De,M.extensions=Be,M.properties=xe,M.renderLists=X,M.shadowMap=ye,M.state=ve,M.info=_t}F();const se=new vx(M,N);this.xr=se,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const E=Be.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Be.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(E){E!==void 0&&(V=E,this.setSize(O,K,!1))},this.getSize=function(E){return E.set(O,K)},this.setSize=function(E,B,G=!0){if(se.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}O=E,K=B,t.width=Math.floor(E*V),t.height=Math.floor(B*V),G===!0&&(t.style.width=E+"px",t.style.height=B+"px"),this.setViewport(0,0,E,B)},this.getDrawingBufferSize=function(E){return E.set(O*V,K*V).floor()},this.setDrawingBufferSize=function(E,B,G){O=E,K=B,V=G,t.width=Math.floor(E*G),t.height=Math.floor(B*G),this.setViewport(0,0,E,B)},this.getCurrentViewport=function(E){return E.copy(A)},this.getViewport=function(E){return E.copy(ue)},this.setViewport=function(E,B,G,W){E.isVector4?ue.set(E.x,E.y,E.z,E.w):ue.set(E,B,G,W),ve.viewport(A.copy(ue).multiplyScalar(V).round())},this.getScissor=function(E){return E.copy(Ae)},this.setScissor=function(E,B,G,W){E.isVector4?Ae.set(E.x,E.y,E.z,E.w):Ae.set(E,B,G,W),ve.scissor(D.copy(Ae).multiplyScalar(V).round())},this.getScissorTest=function(){return Qe},this.setScissorTest=function(E){ve.setScissorTest(Qe=E)},this.setOpaqueSort=function(E){Y=E},this.setTransparentSort=function(E){ne=E},this.getClearColor=function(E){return E.copy(Me.getClearColor())},this.setClearColor=function(){Me.setClearColor(...arguments)},this.getClearAlpha=function(){return Me.getClearAlpha()},this.setClearAlpha=function(){Me.setClearAlpha(...arguments)},this.clear=function(E=!0,B=!0,G=!0){let W=0;if(E){let z=!1;if(T!==null){const te=T.texture.format;z=te===Sc||te===Mc||te===yc}if(z){const te=T.texture.type,ce=te===Ln||te===Qi||te===Ar||te===Rr||te===_c||te===vc,ge=Me.getClearColor(),fe=Me.getClearAlpha(),Re=ge.r,Ie=ge.g,Ee=ge.b;ce?(g[0]=Re,g[1]=Ie,g[2]=Ee,g[3]=fe,N.clearBufferuiv(N.COLOR,0,g)):(_[0]=Re,_[1]=Ie,_[2]=Ee,_[3]=fe,N.clearBufferiv(N.COLOR,0,_))}else W|=N.COLOR_BUFFER_BIT}B&&(W|=N.DEPTH_BUFFER_BIT),G&&(W|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",oe,!1),t.removeEventListener("webglcontextrestored",pe,!1),t.removeEventListener("webglcontextcreationerror",ee,!1),Me.dispose(),X.dispose(),we.dispose(),xe.dispose(),Nt.dispose(),bt.dispose(),H.dispose(),le.dispose(),Ve.dispose(),q.dispose(),se.dispose(),se.removeEventListener("sessionstart",Un),se.removeEventListener("sessionend",Xc),Ui.stop()};function oe(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function pe(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const E=_t.autoReset,B=ye.enabled,G=ye.autoUpdate,W=ye.needsUpdate,z=ye.type;F(),_t.autoReset=E,ye.enabled=B,ye.autoUpdate=G,ye.needsUpdate=W,ye.type=z}function ee(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function $(E){const B=E.target;B.removeEventListener("dispose",$),_e(B)}function _e(E){Oe(E),xe.remove(E)}function Oe(E){const B=xe.get(E).programs;B!==void 0&&(B.forEach(function(G){q.releaseProgram(G)}),E.isShaderMaterial&&q.releaseShaderCache(E))}this.renderBufferDirect=function(E,B,G,W,z,te){B===null&&(B=be);const ce=z.isMesh&&z.matrixWorld.determinant()<0,ge=ef(E,B,G,W,z);ve.setMaterial(W,ce);let fe=G.index,Re=1;if(W.wireframe===!0){if(fe=w.getWireframeAttribute(G),fe===void 0)return;Re=2}const Ie=G.drawRange,Ee=G.attributes.position;let $e=Ie.start*Re,ot=(Ie.start+Ie.count)*Re;te!==null&&($e=Math.max($e,te.start*Re),ot=Math.min(ot,(te.start+te.count)*Re)),fe!==null?($e=Math.max($e,0),ot=Math.min(ot,fe.count)):Ee!=null&&($e=Math.max($e,0),ot=Math.min(ot,Ee.count));const Mt=ot-$e;if(Mt<0||Mt===1/0)return;le.setup(z,W,ge,G,fe);let mt,ut=he;if(fe!==null&&(mt=I.get(fe),ut=Pe,ut.setIndex(mt)),z.isMesh)W.wireframe===!0?(ve.setLineWidth(W.wireframeLinewidth*zt()),ut.setMode(N.LINES)):ut.setMode(N.TRIANGLES);else if(z.isLine){let Te=W.linewidth;Te===void 0&&(Te=1),ve.setLineWidth(Te*zt()),z.isLineSegments?ut.setMode(N.LINES):z.isLineLoop?ut.setMode(N.LINE_LOOP):ut.setMode(N.LINE_STRIP)}else z.isPoints?ut.setMode(N.POINTS):z.isSprite&&ut.setMode(N.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)Nr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ut.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if(Be.get("WEBGL_multi_draw"))ut.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const Te=z._multiDrawStarts,xt=z._multiDrawCounts,nt=z._multiDrawCount,sn=fe?I.get(fe).bytesPerElement:1,is=xe.get(W).currentProgram.getUniforms();for(let rn=0;rn<nt;rn++)is.setValue(N,"_gl_DrawID",rn),ut.render(Te[rn]/sn,xt[rn])}else if(z.isInstancedMesh)ut.renderInstances($e,Mt,z.count);else if(G.isInstancedBufferGeometry){const Te=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,xt=Math.min(G.instanceCount,Te);ut.renderInstances($e,Mt,xt)}else ut.render($e,Mt)};function ft(E,B,G){E.transparent===!0&&E.side===cn&&E.forceSinglePass===!1?(E.side=Xt,E.needsUpdate=!0,Xr(E,B,G),E.side=ai,E.needsUpdate=!0,Xr(E,B,G),E.side=cn):Xr(E,B,G)}this.compile=function(E,B,G=null){G===null&&(G=E),p=we.get(G),p.init(B),y.push(p),G.traverseVisible(function(z){z.isLight&&z.layers.test(B.layers)&&(p.pushLight(z),z.castShadow&&p.pushShadow(z))}),E!==G&&E.traverseVisible(function(z){z.isLight&&z.layers.test(B.layers)&&(p.pushLight(z),z.castShadow&&p.pushShadow(z))}),p.setupLights();const W=new Set;return E.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const te=z.material;if(te)if(Array.isArray(te))for(let ce=0;ce<te.length;ce++){const ge=te[ce];ft(ge,G,z),W.add(ge)}else ft(te,G,z),W.add(te)}),p=y.pop(),W},this.compileAsync=function(E,B,G=null){const W=this.compile(E,B,G);return new Promise(z=>{function te(){if(W.forEach(function(ce){xe.get(ce).currentProgram.isReady()&&W.delete(ce)}),W.size===0){z(E);return}setTimeout(te,10)}Be.get("KHR_parallel_shader_compile")!==null?te():setTimeout(te,10)})};let it=null;function Xn(E){it&&it(E)}function Un(){Ui.stop()}function Xc(){Ui.start()}const Ui=new Dd;Ui.setAnimationLoop(Xn),typeof self<"u"&&Ui.setContext(self),this.setAnimationLoop=function(E){it=E,se.setAnimationLoop(E),E===null?Ui.stop():Ui.start()},se.addEventListener("sessionstart",Un),se.addEventListener("sessionend",Xc),this.render=function(E,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),se.enabled===!0&&se.isPresenting===!0&&(se.cameraAutoUpdate===!0&&se.updateCamera(B),B=se.getCamera()),E.isScene===!0&&E.onBeforeRender(M,E,B,T),p=we.get(E,y.length),p.init(B),y.push(p),Z.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),tt.setFromProjectionMatrix(Z,Vn,B.reversedDepth),j=this.localClippingEnabled,je=re.init(this.clippingPlanes,j),m=X.get(E,S.length),m.init(),S.push(m),se.enabled===!0&&se.isPresenting===!0){const te=M.xr.getDepthSensingMesh();te!==null&&ra(te,B,-1/0,M.sortObjects)}ra(E,B,0,M.sortObjects),m.finish(),M.sortObjects===!0&&m.sort(Y,ne),Ze=se.enabled===!1||se.isPresenting===!1||se.hasDepthSensing()===!1,Ze&&Me.addToRenderList(m,E),this.info.render.frame++,je===!0&&re.beginShadows();const G=p.state.shadowsArray;ye.render(G,E,B),je===!0&&re.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=m.opaque,z=m.transmissive;if(p.setupLights(),B.isArrayCamera){const te=B.cameras;if(z.length>0)for(let ce=0,ge=te.length;ce<ge;ce++){const fe=te[ce];qc(W,z,E,fe)}Ze&&Me.render(E);for(let ce=0,ge=te.length;ce<ge;ce++){const fe=te[ce];jc(m,E,fe,fe.viewport)}}else z.length>0&&qc(W,z,E,B),Ze&&Me.render(E),jc(m,E,B);T!==null&&R===0&&(Ge.updateMultisampleRenderTarget(T),Ge.updateRenderTargetMipmap(T)),E.isScene===!0&&E.onAfterRender(M,E,B),le.resetDefaultState(),v=-1,x=null,y.pop(),y.length>0?(p=y[y.length-1],je===!0&&re.setGlobalState(M.clippingPlanes,p.state.camera)):p=null,S.pop(),S.length>0?m=S[S.length-1]:m=null};function ra(E,B,G,W){if(E.visible===!1)return;if(E.layers.test(B.layers)){if(E.isGroup)G=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(B);else if(E.isLight)p.pushLight(E),E.castShadow&&p.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||tt.intersectsSprite(E)){W&&Ne.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Z);const ce=H.update(E),ge=E.material;ge.visible&&m.push(E,ce,ge,G,Ne.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||tt.intersectsObject(E))){const ce=H.update(E),ge=E.material;if(W&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Ne.copy(E.boundingSphere.center)):(ce.boundingSphere===null&&ce.computeBoundingSphere(),Ne.copy(ce.boundingSphere.center)),Ne.applyMatrix4(E.matrixWorld).applyMatrix4(Z)),Array.isArray(ge)){const fe=ce.groups;for(let Re=0,Ie=fe.length;Re<Ie;Re++){const Ee=fe[Re],$e=ge[Ee.materialIndex];$e&&$e.visible&&m.push(E,ce,$e,G,Ne.z,Ee)}}else ge.visible&&m.push(E,ce,ge,G,Ne.z,null)}}const te=E.children;for(let ce=0,ge=te.length;ce<ge;ce++)ra(te[ce],B,G,W)}function jc(E,B,G,W){const z=E.opaque,te=E.transmissive,ce=E.transparent;p.setupLightsView(G),je===!0&&re.setGlobalState(M.clippingPlanes,G),W&&ve.viewport(A.copy(W)),z.length>0&&Wr(z,B,G),te.length>0&&Wr(te,B,G),ce.length>0&&Wr(ce,B,G),ve.buffers.depth.setTest(!0),ve.buffers.depth.setMask(!0),ve.buffers.color.setMask(!0),ve.setPolygonOffset(!1)}function qc(E,B,G,W){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[W.id]===void 0&&(p.state.transmissionRenderTarget[W.id]=new Ii(1,1,{generateMipmaps:!0,type:Be.has("EXT_color_buffer_half_float")||Be.has("EXT_color_buffer_float")?js:Ln,minFilter:ii,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Je.workingColorSpace}));const te=p.state.transmissionRenderTarget[W.id],ce=W.viewport||A;te.setSize(ce.z*M.transmissionResolutionScale,ce.w*M.transmissionResolutionScale);const ge=M.getRenderTarget(),fe=M.getActiveCubeFace(),Re=M.getActiveMipmapLevel();M.setRenderTarget(te),M.getClearColor(L),k=M.getClearAlpha(),k<1&&M.setClearColor(16777215,.5),M.clear(),Ze&&Me.render(G);const Ie=M.toneMapping;M.toneMapping=Ci;const Ee=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),p.setupLightsView(W),je===!0&&re.setGlobalState(M.clippingPlanes,W),Wr(E,G,W),Ge.updateMultisampleRenderTarget(te),Ge.updateRenderTargetMipmap(te),Be.has("WEBGL_multisampled_render_to_texture")===!1){let $e=!1;for(let ot=0,Mt=B.length;ot<Mt;ot++){const mt=B[ot],ut=mt.object,Te=mt.geometry,xt=mt.material,nt=mt.group;if(xt.side===cn&&ut.layers.test(W.layers)){const sn=xt.side;xt.side=Xt,xt.needsUpdate=!0,Kc(ut,G,W,Te,xt,nt),xt.side=sn,xt.needsUpdate=!0,$e=!0}}$e===!0&&(Ge.updateMultisampleRenderTarget(te),Ge.updateRenderTargetMipmap(te))}M.setRenderTarget(ge,fe,Re),M.setClearColor(L,k),Ee!==void 0&&(W.viewport=Ee),M.toneMapping=Ie}function Wr(E,B,G){const W=B.isScene===!0?B.overrideMaterial:null;for(let z=0,te=E.length;z<te;z++){const ce=E[z],ge=ce.object,fe=ce.geometry,Re=ce.group;let Ie=ce.material;Ie.allowOverride===!0&&W!==null&&(Ie=W),ge.layers.test(G.layers)&&Kc(ge,B,G,fe,Ie,Re)}}function Kc(E,B,G,W,z,te){E.onBeforeRender(M,B,G,W,z,te),E.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),z.onBeforeRender(M,B,G,W,E,te),z.transparent===!0&&z.side===cn&&z.forceSinglePass===!1?(z.side=Xt,z.needsUpdate=!0,M.renderBufferDirect(G,B,W,z,E,te),z.side=ai,z.needsUpdate=!0,M.renderBufferDirect(G,B,W,z,E,te),z.side=cn):M.renderBufferDirect(G,B,W,z,E,te),E.onAfterRender(M,B,G,W,z,te)}function Xr(E,B,G){B.isScene!==!0&&(B=be);const W=xe.get(E),z=p.state.lights,te=p.state.shadowsArray,ce=z.state.version,ge=q.getParameters(E,z.state,te,B,G),fe=q.getProgramCacheKey(ge);let Re=W.programs;W.environment=E.isMeshStandardMaterial?B.environment:null,W.fog=B.fog,W.envMap=(E.isMeshStandardMaterial?bt:Nt).get(E.envMap||W.environment),W.envMapRotation=W.environment!==null&&E.envMap===null?B.environmentRotation:E.envMapRotation,Re===void 0&&(E.addEventListener("dispose",$),Re=new Map,W.programs=Re);let Ie=Re.get(fe);if(Ie!==void 0){if(W.currentProgram===Ie&&W.lightsStateVersion===ce)return $c(E,ge),Ie}else ge.uniforms=q.getUniforms(E),E.onBeforeCompile(ge,M),Ie=q.acquireProgram(ge,fe),Re.set(fe,Ie),W.uniforms=ge.uniforms;const Ee=W.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Ee.clippingPlanes=re.uniform),$c(E,ge),W.needsLights=nf(E),W.lightsStateVersion=ce,W.needsLights&&(Ee.ambientLightColor.value=z.state.ambient,Ee.lightProbe.value=z.state.probe,Ee.directionalLights.value=z.state.directional,Ee.directionalLightShadows.value=z.state.directionalShadow,Ee.spotLights.value=z.state.spot,Ee.spotLightShadows.value=z.state.spotShadow,Ee.rectAreaLights.value=z.state.rectArea,Ee.ltc_1.value=z.state.rectAreaLTC1,Ee.ltc_2.value=z.state.rectAreaLTC2,Ee.pointLights.value=z.state.point,Ee.pointLightShadows.value=z.state.pointShadow,Ee.hemisphereLights.value=z.state.hemi,Ee.directionalShadowMap.value=z.state.directionalShadowMap,Ee.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Ee.spotShadowMap.value=z.state.spotShadowMap,Ee.spotLightMatrix.value=z.state.spotLightMatrix,Ee.spotLightMap.value=z.state.spotLightMap,Ee.pointShadowMap.value=z.state.pointShadowMap,Ee.pointShadowMatrix.value=z.state.pointShadowMatrix),W.currentProgram=Ie,W.uniformsList=null,Ie}function Yc(E){if(E.uniformsList===null){const B=E.currentProgram.getUniforms();E.uniformsList=Io.seqWithValue(B.seq,E.uniforms)}return E.uniformsList}function $c(E,B){const G=xe.get(E);G.outputColorSpace=B.outputColorSpace,G.batching=B.batching,G.batchingColor=B.batchingColor,G.instancing=B.instancing,G.instancingColor=B.instancingColor,G.instancingMorph=B.instancingMorph,G.skinning=B.skinning,G.morphTargets=B.morphTargets,G.morphNormals=B.morphNormals,G.morphColors=B.morphColors,G.morphTargetsCount=B.morphTargetsCount,G.numClippingPlanes=B.numClippingPlanes,G.numIntersection=B.numClipIntersection,G.vertexAlphas=B.vertexAlphas,G.vertexTangents=B.vertexTangents,G.toneMapping=B.toneMapping}function ef(E,B,G,W,z){B.isScene!==!0&&(B=be),Ge.resetTextureUnits();const te=B.fog,ce=W.isMeshStandardMaterial?B.environment:null,ge=T===null?M.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:jt,fe=(W.isMeshStandardMaterial?bt:Nt).get(W.envMap||ce),Re=W.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Ie=!!G.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Ee=!!G.morphAttributes.position,$e=!!G.morphAttributes.normal,ot=!!G.morphAttributes.color;let Mt=Ci;W.toneMapped&&(T===null||T.isXRRenderTarget===!0)&&(Mt=M.toneMapping);const mt=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,ut=mt!==void 0?mt.length:0,Te=xe.get(W),xt=p.state.lights;if(je===!0&&(j===!0||E!==x)){const qt=E===x&&W.id===v;re.setState(W,E,qt)}let nt=!1;W.version===Te.__version?(Te.needsLights&&Te.lightsStateVersion!==xt.state.version||Te.outputColorSpace!==ge||z.isBatchedMesh&&Te.batching===!1||!z.isBatchedMesh&&Te.batching===!0||z.isBatchedMesh&&Te.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&Te.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&Te.instancing===!1||!z.isInstancedMesh&&Te.instancing===!0||z.isSkinnedMesh&&Te.skinning===!1||!z.isSkinnedMesh&&Te.skinning===!0||z.isInstancedMesh&&Te.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&Te.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&Te.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&Te.instancingMorph===!1&&z.morphTexture!==null||Te.envMap!==fe||W.fog===!0&&Te.fog!==te||Te.numClippingPlanes!==void 0&&(Te.numClippingPlanes!==re.numPlanes||Te.numIntersection!==re.numIntersection)||Te.vertexAlphas!==Re||Te.vertexTangents!==Ie||Te.morphTargets!==Ee||Te.morphNormals!==$e||Te.morphColors!==ot||Te.toneMapping!==Mt||Te.morphTargetsCount!==ut)&&(nt=!0):(nt=!0,Te.__version=W.version);let sn=Te.currentProgram;nt===!0&&(sn=Xr(W,B,z));let is=!1,rn=!1,Zs=!1;const yt=sn.getUniforms(),fn=Te.uniforms;if(ve.useProgram(sn.program)&&(is=!0,rn=!0,Zs=!0),W.id!==v&&(v=W.id,rn=!0),is||x!==E){ve.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),yt.setValue(N,"projectionMatrix",E.projectionMatrix),yt.setValue(N,"viewMatrix",E.matrixWorldInverse);const en=yt.map.cameraPosition;en!==void 0&&en.setValue(N,me.setFromMatrixPosition(E.matrixWorld)),De.logarithmicDepthBuffer&&yt.setValue(N,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&yt.setValue(N,"isOrthographic",E.isOrthographicCamera===!0),x!==E&&(x=E,rn=!0,Zs=!0)}if(z.isSkinnedMesh){yt.setOptional(N,z,"bindMatrix"),yt.setOptional(N,z,"bindMatrixInverse");const qt=z.skeleton;qt&&(qt.boneTexture===null&&qt.computeBoneTexture(),yt.setValue(N,"boneTexture",qt.boneTexture,Ge))}z.isBatchedMesh&&(yt.setOptional(N,z,"batchingTexture"),yt.setValue(N,"batchingTexture",z._matricesTexture,Ge),yt.setOptional(N,z,"batchingIdTexture"),yt.setValue(N,"batchingIdTexture",z._indirectTexture,Ge),yt.setOptional(N,z,"batchingColorTexture"),z._colorsTexture!==null&&yt.setValue(N,"batchingColorTexture",z._colorsTexture,Ge));const pn=G.morphAttributes;if((pn.position!==void 0||pn.normal!==void 0||pn.color!==void 0)&&ie.update(z,G,sn),(rn||Te.receiveShadow!==z.receiveShadow)&&(Te.receiveShadow=z.receiveShadow,yt.setValue(N,"receiveShadow",z.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(fn.envMap.value=fe,fn.flipEnvMap.value=fe.isCubeTexture&&fe.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&B.environment!==null&&(fn.envMapIntensity.value=B.environmentIntensity),rn&&(yt.setValue(N,"toneMappingExposure",M.toneMappingExposure),Te.needsLights&&tf(fn,Zs),te&&W.fog===!0&&J.refreshFogUniforms(fn,te),J.refreshMaterialUniforms(fn,W,V,K,p.state.transmissionRenderTarget[E.id]),Io.upload(N,Yc(Te),fn,Ge)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Io.upload(N,Yc(Te),fn,Ge),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&yt.setValue(N,"center",z.center),yt.setValue(N,"modelViewMatrix",z.modelViewMatrix),yt.setValue(N,"normalMatrix",z.normalMatrix),yt.setValue(N,"modelMatrix",z.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const qt=W.uniformsGroups;for(let en=0,oa=qt.length;en<oa;en++){const Fi=qt[en];Ve.update(Fi,sn),Ve.bind(Fi,sn)}}return sn}function tf(E,B){E.ambientLightColor.needsUpdate=B,E.lightProbe.needsUpdate=B,E.directionalLights.needsUpdate=B,E.directionalLightShadows.needsUpdate=B,E.pointLights.needsUpdate=B,E.pointLightShadows.needsUpdate=B,E.spotLights.needsUpdate=B,E.spotLightShadows.needsUpdate=B,E.rectAreaLights.needsUpdate=B,E.hemisphereLights.needsUpdate=B}function nf(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(E,B,G){const W=xe.get(E);W.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),xe.get(E.texture).__webglTexture=B,xe.get(E.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:G,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,B){const G=xe.get(E);G.__webglFramebuffer=B,G.__useDefaultFramebuffer=B===void 0};const sf=N.createFramebuffer();this.setRenderTarget=function(E,B=0,G=0){T=E,P=B,R=G;let W=!0,z=null,te=!1,ce=!1;if(E){const fe=xe.get(E);if(fe.__useDefaultFramebuffer!==void 0)ve.bindFramebuffer(N.FRAMEBUFFER,null),W=!1;else if(fe.__webglFramebuffer===void 0)Ge.setupRenderTarget(E);else if(fe.__hasExternalTextures)Ge.rebindTextures(E,xe.get(E.texture).__webglTexture,xe.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Ee=E.depthTexture;if(fe.__boundDepthTexture!==Ee){if(Ee!==null&&xe.has(Ee)&&(E.width!==Ee.image.width||E.height!==Ee.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ge.setupDepthRenderbuffer(E)}}const Re=E.texture;(Re.isData3DTexture||Re.isDataArrayTexture||Re.isCompressedArrayTexture)&&(ce=!0);const Ie=xe.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Ie[B])?z=Ie[B][G]:z=Ie[B],te=!0):E.samples>0&&Ge.useMultisampledRTT(E)===!1?z=xe.get(E).__webglMultisampledFramebuffer:Array.isArray(Ie)?z=Ie[G]:z=Ie,A.copy(E.viewport),D.copy(E.scissor),U=E.scissorTest}else A.copy(ue).multiplyScalar(V).floor(),D.copy(Ae).multiplyScalar(V).floor(),U=Qe;if(G!==0&&(z=sf),ve.bindFramebuffer(N.FRAMEBUFFER,z)&&W&&ve.drawBuffers(E,z),ve.viewport(A),ve.scissor(D),ve.setScissorTest(U),te){const fe=xe.get(E.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+B,fe.__webglTexture,G)}else if(ce){const fe=B;for(let Re=0;Re<E.textures.length;Re++){const Ie=xe.get(E.textures[Re]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Re,Ie.__webglTexture,G,fe)}}else if(E!==null&&G!==0){const fe=xe.get(E.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,fe.__webglTexture,G)}v=-1},this.readRenderTargetPixels=function(E,B,G,W,z,te,ce,ge=0){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let fe=xe.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ce!==void 0&&(fe=fe[ce]),fe){ve.bindFramebuffer(N.FRAMEBUFFER,fe);try{const Re=E.textures[ge],Ie=Re.format,Ee=Re.type;if(!De.textureFormatReadable(Ie)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!De.textureTypeReadable(Ee)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=E.width-W&&G>=0&&G<=E.height-z&&(E.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+ge),N.readPixels(B,G,W,z,Se.convert(Ie),Se.convert(Ee),te))}finally{const Re=T!==null?xe.get(T).__webglFramebuffer:null;ve.bindFramebuffer(N.FRAMEBUFFER,Re)}}},this.readRenderTargetPixelsAsync=async function(E,B,G,W,z,te,ce,ge=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let fe=xe.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ce!==void 0&&(fe=fe[ce]),fe)if(B>=0&&B<=E.width-W&&G>=0&&G<=E.height-z){ve.bindFramebuffer(N.FRAMEBUFFER,fe);const Re=E.textures[ge],Ie=Re.format,Ee=Re.type;if(!De.textureFormatReadable(Ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!De.textureTypeReadable(Ee))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const $e=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,$e),N.bufferData(N.PIXEL_PACK_BUFFER,te.byteLength,N.STREAM_READ),E.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+ge),N.readPixels(B,G,W,z,Se.convert(Ie),Se.convert(Ee),0);const ot=T!==null?xe.get(T).__webglFramebuffer:null;ve.bindFramebuffer(N.FRAMEBUFFER,ot);const Mt=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await up(N,Mt,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,$e),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,te),N.deleteBuffer($e),N.deleteSync(Mt),te}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,B=null,G=0){const W=Math.pow(2,-G),z=Math.floor(E.image.width*W),te=Math.floor(E.image.height*W),ce=B!==null?B.x:0,ge=B!==null?B.y:0;Ge.setTexture2D(E,0),N.copyTexSubImage2D(N.TEXTURE_2D,G,0,0,ce,ge,z,te),ve.unbindTexture()};const rf=N.createFramebuffer(),of=N.createFramebuffer();this.copyTextureToTexture=function(E,B,G=null,W=null,z=0,te=null){te===null&&(z!==0?(Nr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),te=z,z=0):te=0);let ce,ge,fe,Re,Ie,Ee,$e,ot,Mt;const mt=E.isCompressedTexture?E.mipmaps[te]:E.image;if(G!==null)ce=G.max.x-G.min.x,ge=G.max.y-G.min.y,fe=G.isBox3?G.max.z-G.min.z:1,Re=G.min.x,Ie=G.min.y,Ee=G.isBox3?G.min.z:0;else{const pn=Math.pow(2,-z);ce=Math.floor(mt.width*pn),ge=Math.floor(mt.height*pn),E.isDataArrayTexture?fe=mt.depth:E.isData3DTexture?fe=Math.floor(mt.depth*pn):fe=1,Re=0,Ie=0,Ee=0}W!==null?($e=W.x,ot=W.y,Mt=W.z):($e=0,ot=0,Mt=0);const ut=Se.convert(B.format),Te=Se.convert(B.type);let xt;B.isData3DTexture?(Ge.setTexture3D(B,0),xt=N.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(Ge.setTexture2DArray(B,0),xt=N.TEXTURE_2D_ARRAY):(Ge.setTexture2D(B,0),xt=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,B.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,B.unpackAlignment);const nt=N.getParameter(N.UNPACK_ROW_LENGTH),sn=N.getParameter(N.UNPACK_IMAGE_HEIGHT),is=N.getParameter(N.UNPACK_SKIP_PIXELS),rn=N.getParameter(N.UNPACK_SKIP_ROWS),Zs=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,mt.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,mt.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Re),N.pixelStorei(N.UNPACK_SKIP_ROWS,Ie),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Ee);const yt=E.isDataArrayTexture||E.isData3DTexture,fn=B.isDataArrayTexture||B.isData3DTexture;if(E.isDepthTexture){const pn=xe.get(E),qt=xe.get(B),en=xe.get(pn.__renderTarget),oa=xe.get(qt.__renderTarget);ve.bindFramebuffer(N.READ_FRAMEBUFFER,en.__webglFramebuffer),ve.bindFramebuffer(N.DRAW_FRAMEBUFFER,oa.__webglFramebuffer);for(let Fi=0;Fi<fe;Fi++)yt&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,xe.get(E).__webglTexture,z,Ee+Fi),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,xe.get(B).__webglTexture,te,Mt+Fi)),N.blitFramebuffer(Re,Ie,ce,ge,$e,ot,ce,ge,N.DEPTH_BUFFER_BIT,N.NEAREST);ve.bindFramebuffer(N.READ_FRAMEBUFFER,null),ve.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(z!==0||E.isRenderTargetTexture||xe.has(E)){const pn=xe.get(E),qt=xe.get(B);ve.bindFramebuffer(N.READ_FRAMEBUFFER,rf),ve.bindFramebuffer(N.DRAW_FRAMEBUFFER,of);for(let en=0;en<fe;en++)yt?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,pn.__webglTexture,z,Ee+en):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,pn.__webglTexture,z),fn?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,qt.__webglTexture,te,Mt+en):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,qt.__webglTexture,te),z!==0?N.blitFramebuffer(Re,Ie,ce,ge,$e,ot,ce,ge,N.COLOR_BUFFER_BIT,N.NEAREST):fn?N.copyTexSubImage3D(xt,te,$e,ot,Mt+en,Re,Ie,ce,ge):N.copyTexSubImage2D(xt,te,$e,ot,Re,Ie,ce,ge);ve.bindFramebuffer(N.READ_FRAMEBUFFER,null),ve.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else fn?E.isDataTexture||E.isData3DTexture?N.texSubImage3D(xt,te,$e,ot,Mt,ce,ge,fe,ut,Te,mt.data):B.isCompressedArrayTexture?N.compressedTexSubImage3D(xt,te,$e,ot,Mt,ce,ge,fe,ut,mt.data):N.texSubImage3D(xt,te,$e,ot,Mt,ce,ge,fe,ut,Te,mt):E.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,te,$e,ot,ce,ge,ut,Te,mt.data):E.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,te,$e,ot,mt.width,mt.height,ut,mt.data):N.texSubImage2D(N.TEXTURE_2D,te,$e,ot,ce,ge,ut,Te,mt);N.pixelStorei(N.UNPACK_ROW_LENGTH,nt),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,sn),N.pixelStorei(N.UNPACK_SKIP_PIXELS,is),N.pixelStorei(N.UNPACK_SKIP_ROWS,rn),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Zs),te===0&&B.generateMipmaps&&N.generateMipmap(xt),ve.unbindTexture()},this.initRenderTarget=function(E){xe.get(E).__webglFramebuffer===void 0&&Ge.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?Ge.setTextureCube(E,0):E.isData3DTexture?Ge.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?Ge.setTexture2DArray(E,0):Ge.setTexture2D(E,0),ve.unbindTexture()},this.resetState=function(){P=0,R=0,T=null,ve.reset(),le.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Vn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Je._getDrawingBufferColorSpace(e),t.unpackColorSpace=Je._getUnpackColorSpace()}}const Fd=i=>(Object.values(i).forEach(e=>{e&&typeof e=="object"&&Fd(e)}),Object.freeze(i)),Od=Fd({"needle-driver":{units:"meters",margin:15e-5,source:"public/assets/needle-driver.glb",sourceSha256:"50bb46af543f99b3be7c1540d74813d4c2d9a70d707a1aae978ec19879baad6d",frame:"Each capsule a/b is in its named source URDF link coordinate system; transform with that animated link matrix.",fit:"Triangle-clipped axial slabs; radial bounding circle plus 0.15 mm. No TCP sphere or jaw-gap fill.",tipPositionAtZero:[18063540287423462e-34,-6245698675651502e-34,.4355],joints:[{name:"roll",parent:"adaptor_link",child:"roll_link",type:"revolute",origin:{xyz:[0,0,.4162],rpy:[0,0,0]},axis:[0,0,1],limit:{lower:-4.53786,upper:4.53786,velocity:.4,effort:1e3},mimic:null},{name:"wrist_pitch",parent:"roll_link",child:"wrist_pitch_link",type:"revolute",origin:{xyz:[0,0,0],rpy:[-1.5707963267948966,-1.5707963267948966,0]},axis:[0,0,1],limit:{lower:-1.39626,upper:1.39626,velocity:.4,effort:1e3},mimic:null},{name:"wrist_yaw",parent:"wrist_pitch_link",child:"wrist_yaw_link",type:"revolute",origin:{xyz:[.0091,0,0],rpy:[-1.5707963267948966,-1.5707963267948966,0]},axis:[0,0,1],limit:{lower:-1.39626,upper:1.39626,velocity:.4,effort:1e3},mimic:null},{name:"jaw",parent:"wrist_yaw_link",child:"jaw_link",type:"revolute",origin:{xyz:[0,0,0],rpy:[0,0,0]},axis:[0,0,1],limit:{lower:-.349066,upper:1.39626,velocity:.4,effort:1e3},mimic:null},{name:"jaw_1",parent:"wrist_yaw_link",child:"jaw_1_link",type:"revolute",origin:{xyz:[0,0,0],rpy:[0,0,0]},axis:[0,0,1],limit:{lower:-1.5707,upper:1.5707,velocity:.4,effort:1e3},mimic:{joint:"jaw",multiplier:"0.5"}},{name:"jaw_2",parent:"wrist_yaw_link",child:"jaw_2_link",type:"revolute",origin:{xyz:[0,0,0],rpy:[0,0,0]},axis:[0,0,1],limit:{lower:-1.5707,upper:1.5707,velocity:.4,effort:1e3},mimic:{joint:"jaw",multiplier:"-0.5"}},{name:"tool_tip",parent:"wrist_yaw_link",child:"tool_tip_link",type:"fixed",origin:{xyz:[0,.0102,0],rpy:[0,1.5707963267948966,1.5707963267948966]},axis:[1,0,0],limit:null,mimic:null}],coverage:{meshes:10,triangles:80220,vertices:132925,shaftSlabs:1,distalSlabMaximum:.0035},capsules:[{id:"shaft-roll_link-0",link:"roll_link",region:"shaft",a:[-498e-10,-999e-10,-.5565920963],b:[-498e-10,-999e-10,-.0088236004],radius:.0045225717,source:["roll_link__visual_0_2"],slab:{axis:2,min:-.5565920963,max:-.0088236004}},{id:"wrist-roll_link-0",link:"roll_link",region:"wrist",a:[0,0,-.0088236004],b:[0,0,-.0058595503],radius:.0043533046,source:["roll_link__visual_0_0","roll_link__visual_0_1"],slab:{axis:2,min:-.0088236004,max:-.0058595503}},{id:"wrist-roll_link-1",link:"roll_link",region:"wrist",a:[0,0,-.0058595503],b:[0,0,-.0028955003],radius:.0043533046,source:["roll_link__visual_0_0","roll_link__visual_0_1"],slab:{axis:2,min:-.0058595503,max:-.0028955003}},{id:"wrist-roll_link-2",link:"roll_link",region:"wrist",a:[-155552e-10,0,-.0028955003],b:[-155552e-10,0,685498e-10],radius:.0043577448,source:["roll_link__visual_0_0","roll_link__visual_0_1"],slab:{axis:2,min:-.0028955003,max:685498e-10}},{id:"wrist-roll_link-3",link:"roll_link",region:"wrist",a:[-204989e-10,-28501e-10,685498e-10],b:[-204989e-10,-28501e-10,.0030325998],radius:.0043596401,source:["roll_link__visual_0_0","roll_link__visual_0_1"],slab:{axis:2,min:685498e-10,max:.0030325998}},{id:"wrist-wrist_pitch_link-0",link:"wrist_pitch_link",region:"wrist",a:[-.0030424001,-295e-8,83539e-10],b:[-.0001369199,-295e-8,83539e-10],radius:.0030052248,source:["wrist_pitch_link__visual_0_0","wrist_pitch_link__visual_0_1"],slab:{axis:0,min:-.0030424001,max:-.0001369199}},{id:"wrist-wrist_pitch_link-1",link:"wrist_pitch_link",region:"wrist",a:[-.0001369199,-122982e-10,-233616e-10],b:[.0027685603,-122982e-10,-233616e-10],radius:.0043469827,source:["wrist_pitch_link__visual_0_0","wrist_pitch_link__visual_0_1"],slab:{axis:0,min:-.0001369199,max:.0027685603}},{id:"wrist-wrist_pitch_link-2",link:"wrist_pitch_link",region:"wrist",a:[.0027685603,-1255e-8,-315501e-10],b:[.0056740405,-1255e-8,-315501e-10],radius:.0044526983,source:["wrist_pitch_link__visual_0_0","wrist_pitch_link__visual_0_1"],slab:{axis:0,min:.0027685603,max:.0056740405}},{id:"wrist-wrist_pitch_link-3",link:"wrist_pitch_link",region:"wrist",a:[.0056740405,-29519e-10,135e-8],b:[.0085795207,-29519e-10,135e-8],radius:.0039848776,source:["wrist_pitch_link__visual_0_0","wrist_pitch_link__visual_0_1"],slab:{axis:0,min:.0056740405,max:.0085795207}},{id:"wrist-wrist_pitch_link-4",link:"wrist_pitch_link",region:"wrist",a:[.0085795207,-3141e-9,398297e-10],b:[.0114850009,-3141e-9,398297e-10],radius:.0034524578,source:["wrist_pitch_link__visual_0_0","wrist_pitch_link__visual_0_1"],slab:{axis:0,min:.0085795207,max:.0114850009}},{id:"wrist-wrist_yaw_link-0",link:"wrist_yaw_link",region:"wrist",a:[5e-7,0,-.0028450001],b:[5e-7,0,-1145e-7],radius:.0007662518,source:["wrist_yaw_link__visual_0_0"],slab:{axis:2,min:-.0028450001,max:-1145e-7}},{id:"wrist-wrist_yaw_link-1",link:"wrist_yaw_link",region:"wrist",a:[0,0,-1145e-7],b:[0,0,.0026160001],radius:.0006453676,source:["wrist_yaw_link__visual_0_0"],slab:{axis:2,min:-1145e-7,max:.0026160001}},{id:"jaw-jaw_1_link-0",link:"jaw_1_link",region:"jaw",a:[13665e-10,-.002413,9775e-7],b:[13665e-10,0,9775e-7],radius:.0025698066,source:["jaw_1_link__visual_0_0","jaw_1_link__visual_0_1"],slab:{axis:1,min:-.002413,max:0}},{id:"jaw-jaw_1_link-1",link:"jaw_1_link",region:"jaw",a:[-438e-10,0,978e-6],b:[-438e-10,.002413,978e-6],radius:.0025700847,source:["jaw_1_link__visual_0_0","jaw_1_link__visual_0_1"],slab:{axis:1,min:0,max:.002413}},{id:"jaw-jaw_1_link-2",link:"jaw_1_link",region:"jaw",a:[-305e-6,.002413,.0004686268],b:[-305e-6,.004826,.0004686268],radius:.0020120718,source:["jaw_1_link__visual_0_0","jaw_1_link__visual_0_1"],slab:{axis:1,min:.002413,max:.004826}},{id:"jaw-jaw_1_link-3",link:"jaw_1_link",region:"jaw",a:[-.0007185684,.004826,-125893e-10],b:[-.0007185684,.0072389999,-125893e-10],radius:.0013882732,source:["jaw_1_link__visual_0_0","jaw_1_link__visual_0_1"],slab:{axis:1,min:.004826,max:.0072389999}},{id:"jaw-jaw_1_link-4",link:"jaw_1_link",region:"jaw",a:[-.0006046428,.0072389999,-125994e-10],b:[-.0006046428,.0096519999,-125994e-10],radius:.0011883406,source:["jaw_1_link__visual_0_0","jaw_1_link__visual_0_1"],slab:{axis:1,min:.0072389999,max:.0096519999}},{id:"jaw-jaw_2_link-0",link:"jaw_2_link",region:"jaw",a:[-13665e-10,-.002413,-.0010035],b:[-13665e-10,0,-.0010035],radius:.0025697198,source:["jaw_2_link__visual_0_0","jaw_2_link__visual_0_1"],slab:{axis:1,min:-.002413,max:0}},{id:"jaw-jaw_2_link-1",link:"jaw_2_link",region:"jaw",a:[438e-10,0,-.0010035],b:[438e-10,.002413,-.0010035],radius:.0025700413,source:["jaw_2_link__visual_0_0","jaw_2_link__visual_0_1"],slab:{axis:1,min:0,max:.002413}},{id:"jaw-jaw_2_link-2",link:"jaw_2_link",region:"jaw",a:[305e-6,.002413,-4945e-7],b:[305e-6,.004826,-4945e-7],radius:.0020114453,source:["jaw_2_link__visual_0_0","jaw_2_link__visual_0_1"],slab:{axis:1,min:.002413,max:.004826}},{id:"jaw-jaw_2_link-3",link:"jaw_2_link",region:"jaw",a:[.0007185684,.004826,-128542e-10],b:[.0007185684,.0072389999,-128542e-10],radius:.0013878273,source:["jaw_2_link__visual_0_0","jaw_2_link__visual_0_1"],slab:{axis:1,min:.004826,max:.0072389999}},{id:"jaw-jaw_2_link-4",link:"jaw_2_link",region:"jaw",a:[.0006046428,.0072389999,-126042e-10],b:[.0006046428,.0096519999,-126042e-10],radius:.0011881734,source:["jaw_2_link__visual_0_0","jaw_2_link__visual_0_1"],slab:{axis:1,min:.0072389999,max:.0096519999}}]},scissors:{units:"meters",margin:15e-5,source:"public/assets/scissors.glb",sourceSha256:"7856790eff485c89d2298b8be1a1e725a62087be25fce960190c679614794873",frame:"Each capsule a/b is in its named source URDF link coordinate system; transform with that animated link matrix.",fit:"Triangle-clipped axial slabs; radial bounding circle plus 0.15 mm. No TCP sphere or jaw-gap fill.",tipPositionAtZero:[-.0015999999999999977,-1047073013270987e-33,.4408],joints:[{name:"roll",parent:"adaptor_link",child:"roll_link",type:"revolute",origin:{xyz:[0,0,.4162],rpy:[0,0,0]},axis:[0,0,1],limit:{lower:-4.53786,upper:4.53786,velocity:.4,effort:1e3},mimic:null},{name:"wrist_pitch",parent:"roll_link",child:"wrist_pitch_link",type:"revolute",origin:{xyz:[0,0,0],rpy:[-1.5707963267948966,-1.5707963267948966,0]},axis:[0,0,1],limit:{lower:-1.39626,upper:1.39626,velocity:.4,effort:1e3},mimic:null},{name:"wrist_yaw",parent:"wrist_pitch_link",child:"wrist_yaw_link",type:"revolute",origin:{xyz:[.0091,0,0],rpy:[-1.5707963267948966,-1.5707963267948966,0]},axis:[0,0,1],limit:{lower:-1.39626,upper:1.39626,velocity:.4,effort:1e3},mimic:null},{name:"jaw",parent:"wrist_yaw_link",child:"jaw_link",type:"revolute",origin:{xyz:[0,0,0],rpy:[0,0,0]},axis:[0,0,1],limit:{lower:-.349066,upper:1.39626,velocity:.4,effort:1e3},mimic:null},{name:"jaw_1",parent:"wrist_yaw_link",child:"jaw_1_link",type:"revolute",origin:{xyz:[0,0,0],rpy:[0,0,0]},axis:[0,0,1],limit:{lower:-1.5707,upper:1.5707,velocity:.4,effort:1e3},mimic:{joint:"jaw",multiplier:"0.5"}},{name:"jaw_2",parent:"wrist_yaw_link",child:"jaw_2_link",type:"revolute",origin:{xyz:[0,0,0],rpy:[0,0,0]},axis:[0,0,1],limit:{lower:-1.5707,upper:1.5707,velocity:.4,effort:1e3},mimic:{joint:"jaw",multiplier:"-0.5"}},{name:"tool_tip",parent:"wrist_yaw_link",child:"tool_tip_link",type:"fixed",origin:{xyz:[0,.0155,-.0016],rpy:[0,1.5707963267948966,1.5707963267948966]},axis:[1,0,0],limit:null,mimic:null}],coverage:{meshes:8,triangles:46946,vertices:32248,shaftSlabs:1,distalSlabMaximum:.0035},capsules:[{id:"shaft-roll_link-0",link:"roll_link",region:"shaft",a:[-498e-10,-999e-10,-.5565920963],b:[-498e-10,-999e-10,-.0088236004],radius:.0045225717,source:["roll_link__visual_0_2"],slab:{axis:2,min:-.5565920963,max:-.0088236004}},{id:"wrist-roll_link-0",link:"roll_link",region:"wrist",a:[0,0,-.0088236004],b:[0,0,-.0058595503],radius:.0043533046,source:["roll_link__visual_0_0","roll_link__visual_0_1"],slab:{axis:2,min:-.0088236004,max:-.0058595503}},{id:"wrist-roll_link-1",link:"roll_link",region:"wrist",a:[0,0,-.0058595503],b:[0,0,-.0028955003],radius:.0043533046,source:["roll_link__visual_0_0","roll_link__visual_0_1"],slab:{axis:2,min:-.0058595503,max:-.0028955003}},{id:"wrist-roll_link-2",link:"roll_link",region:"wrist",a:[-155552e-10,0,-.0028955003],b:[-155552e-10,0,685498e-10],radius:.0043577448,source:["roll_link__visual_0_0","roll_link__visual_0_1"],slab:{axis:2,min:-.0028955003,max:685498e-10}},{id:"wrist-roll_link-3",link:"roll_link",region:"wrist",a:[-204989e-10,-28501e-10,685498e-10],b:[-204989e-10,-28501e-10,.0030325998],radius:.0043596401,source:["roll_link__visual_0_0","roll_link__visual_0_1"],slab:{axis:2,min:685498e-10,max:.0030325998}},{id:"wrist-wrist_pitch_link-0",link:"wrist_pitch_link",region:"wrist",a:[-.0030424001,-295e-8,83539e-10],b:[-.0001369199,-295e-8,83539e-10],radius:.0030052248,source:["wrist_pitch_link__visual_0_0","wrist_pitch_link__visual_0_1"],slab:{axis:0,min:-.0030424001,max:-.0001369199}},{id:"wrist-wrist_pitch_link-1",link:"wrist_pitch_link",region:"wrist",a:[-.0001369199,-122982e-10,-233616e-10],b:[.0027685603,-122982e-10,-233616e-10],radius:.0043469827,source:["wrist_pitch_link__visual_0_0","wrist_pitch_link__visual_0_1"],slab:{axis:0,min:-.0001369199,max:.0027685603}},{id:"wrist-wrist_pitch_link-2",link:"wrist_pitch_link",region:"wrist",a:[.0027685603,-1255e-8,-315501e-10],b:[.0056740405,-1255e-8,-315501e-10],radius:.0044526983,source:["wrist_pitch_link__visual_0_0","wrist_pitch_link__visual_0_1"],slab:{axis:0,min:.0027685603,max:.0056740405}},{id:"wrist-wrist_pitch_link-3",link:"wrist_pitch_link",region:"wrist",a:[.0056740405,-29519e-10,135e-8],b:[.0085795207,-29519e-10,135e-8],radius:.0039848776,source:["wrist_pitch_link__visual_0_0","wrist_pitch_link__visual_0_1"],slab:{axis:0,min:.0056740405,max:.0085795207}},{id:"wrist-wrist_pitch_link-4",link:"wrist_pitch_link",region:"wrist",a:[.0085795207,-3141e-9,398297e-10],b:[.0114850009,-3141e-9,398297e-10],radius:.0034524578,source:["wrist_pitch_link__visual_0_0","wrist_pitch_link__visual_0_1"],slab:{axis:0,min:.0085795207,max:.0114850009}},{id:"wrist-wrist_yaw_link-0",link:"wrist_yaw_link",region:"wrist",a:[5e-7,0,-.0028450001],b:[5e-7,0,-1145e-7],radius:.0007662518,source:["wrist_yaw_link__visual_0_0"],slab:{axis:2,min:-.0028450001,max:-1145e-7}},{id:"wrist-wrist_yaw_link-1",link:"wrist_yaw_link",region:"wrist",a:[0,0,-1145e-7],b:[0,0,.0026160001],radius:.0006453676,source:["wrist_yaw_link__visual_0_0"],slab:{axis:2,min:-1145e-7,max:.0026160001}},{id:"jaw-jaw_1_link-0",link:"jaw_1_link",region:"jaw",a:[226e-10,-.0024076721,-.0005896195],b:[226e-10,.0001685876,-.0005896195],radius:.0026707101,source:["jaw_1_link__visual_0_0"],slab:{axis:1,min:-.0024076721,max:.0001685876}},{id:"jaw-jaw_1_link-1",link:"jaw_1_link",region:"jaw",a:[227e-10,.0001685876,-787659e-9],b:[227e-10,.0027448473,-787659e-9],radius:.0026815932,source:["jaw_1_link__visual_0_0"],slab:{axis:1,min:.0001685876,max:.0027448473}},{id:"jaw-jaw_1_link-2",link:"jaw_1_link",region:"jaw",a:[737852e-10,.0027448473,-.0007912751],b:[737852e-10,.005321107,-.0007912751],radius:.0022984057,source:["jaw_1_link__visual_0_0"],slab:{axis:1,min:.0027448473,max:.005321107}},{id:"jaw-jaw_1_link-3",link:"jaw_1_link",region:"jaw",a:[.0002649039,.005321107,-.0008890279],b:[.0002649039,.0078973666,-.0008890279],radius:.0016869244,source:["jaw_1_link__visual_0_0"],slab:{axis:1,min:.005321107,max:.0078973666}},{id:"jaw-jaw_1_link-4",link:"jaw_1_link",region:"jaw",a:[.0002053284,.0078973666,-.0004309969],b:[.0002053284,.0104736263,-.0004309969],radius:.001392067,source:["jaw_1_link__visual_0_0"],slab:{axis:1,min:.0078973666,max:.0104736263}},{id:"jaw-jaw_1_link-5",link:"jaw_1_link",region:"jaw",a:[.0001650363,.0104736263,.0006257144],b:[.0001650363,.013049886,.0006257144],radius:.0013893755,source:["jaw_1_link__visual_0_0"],slab:{axis:1,min:.0104736263,max:.013049886}},{id:"jaw-jaw_2_link-0",link:"jaw_2_link",region:"jaw",a:[196e-10,-.0024076739,864373e-9],b:[196e-10,.0001652364,864373e-9],radius:.0026680451,source:["jaw_2_link__visual_0_0"],slab:{axis:1,min:-.0024076739,max:.0001652364}},{id:"jaw-jaw_2_link-1",link:"jaw_2_link",region:"jaw",a:[195e-10,.0001652364,.001029989],b:[195e-10,.0027381467,.001029989],radius:.0026753456,source:["jaw_2_link__visual_0_0"],slab:{axis:1,min:.0001652364,max:.0027381467}},{id:"jaw-jaw_2_link-2",link:"jaw_2_link",region:"jaw",a:[-74203e-9,.0027381467,.0007373468],b:[-74203e-9,.005311057,.0007373468],radius:.0022558234,source:["jaw_2_link__visual_0_0"],slab:{axis:1,min:.0027381467,max:.005311057}},{id:"jaw-jaw_2_link-3",link:"jaw_2_link",region:"jaw",a:[-.0002386938,.005311057,.0003599046],b:[-.0002386938,.0078839674,.0003599046],radius:.0016617499,source:["jaw_2_link__visual_0_0"],slab:{axis:1,min:.005311057,max:.0078839674}},{id:"jaw-jaw_2_link-4",link:"jaw_2_link",region:"jaw",a:[-.0001864839,.0078839674,.0005660181],b:[-.0001864839,.0104568777,.0005660181],radius:.0014790598,source:["jaw_2_link__visual_0_0"],slab:{axis:1,min:.0078839674,max:.0104568777}},{id:"jaw-jaw_2_link-5",link:"jaw_2_link",region:"jaw",a:[-.0001506457,.0104568777,.0012790946],b:[-.0001506457,.013029788,.0012790946],radius:.0013140326,source:["jaw_2_link__visual_0_0"],slab:{axis:1,min:.0104568777,max:.013029788}}]}}),Ur=[0,0,1],ia=[0,0,0,1],Ql=(i,e)=>i.map((t,n)=>t+e[n]),Fr=(i,e)=>i.map((t,n)=>t-e[n]),kd=(i,e)=>i.reduce((t,n,s)=>t+n*e[s],0),ec=(i,e)=>[i[1]*e[2]-i[2]*e[1],i[2]*e[0]-i[0]*e[2],i[0]*e[1]-i[1]*e[0]],Ws=(i,e=Ur)=>{const t=Math.hypot(...i);return t>1e-12?i.map(n=>n/t):[...e]};function Is(i,e){return[i[3]*e[0]+i[0]*e[3]+i[1]*e[2]-i[2]*e[1],i[3]*e[1]-i[0]*e[2]+i[1]*e[3]+i[2]*e[0],i[3]*e[2]+i[0]*e[1]-i[1]*e[0]+i[2]*e[3],i[3]*e[3]-i[0]*e[0]-i[1]*e[1]-i[2]*e[2]]}function Pi(i,e){const t=ec(e,i).map(s=>s*2),n=ec(e,t);return i.map((s,r)=>s+e[3]*t[r]+n[r])}function wx(i,e){const t=Math.sin(e*.5);return[...i.map(n=>n*t),Math.cos(e*.5)]}function Oc(i,e){let t=kd(i,e)+1,n;return t<1e-12?n=Math.abs(i[0])>Math.abs(i[2])?[-i[1],i[0],0,0]:[0,-i[2],i[1],0]:n=[...ec(i,e),t],Ws(n,ia)}function Bd(i,e,t){if(t<=0)return[...i];if(t>=1)return[...e];let n=kd(i,e);if(n<0&&(e=e.map(o=>-o),n=-n),n>1-1e-10)return Ws(i.map((o,a)=>o+(e[a]-o)*t),ia);const s=Math.acos(Math.min(1,n)),r=Math.sin(s);return i.map((o,a)=>(o*Math.sin((1-t)*s)+e[a]*Math.sin(t*s))/r)}function bx([i,e,t]){const n=Math.cos(i/2),s=Math.sin(i/2),r=Math.cos(e/2),o=Math.sin(e/2),a=Math.cos(t/2),l=Math.sin(t/2);return[s*r*a-n*o*l,n*o*a+s*r*l,n*r*l-s*o*a,n*r*a+s*o*l]}const Ex=Object.fromEntries(Object.entries(Od).map(([i,e])=>[i,{...e,joints:e.joints.map(t=>({...t,rest:bx(t.origin.rpy)}))}])),zd=i=>i.instrument??(i.port[0]<0?"needle-driver":"scissors");function Vd(i,e=i.alignment){let t=Array.isArray(e)&&e.length===4?[...e]:Oc(Ur,Ws(Fr(i.position,i.port)));return Math.abs(Math.hypot(...t)-1)>1e-12&&(t=Ws(t,ia)),t}function Tx(i,e=i.alignment){let t=Vd(i,e);const n=Fr(i.position,i.port),s=Math.hypot(...n);if(s>.003){const r=Pi(Ur,t),o=Ws(n);if(Math.hypot(...Fr(r,o))>1e-12){const a=Is(Oc(r,o),t),l=Math.max(0,Math.min(1,(s-.003)/.017));t=l===1?a:Bd(t,a,l*l*(3-2*l))}}return t}function ui(i){const e=Ex[zd(i)],t={adaptor_link:{position:[0,0,0],quaternion:ia}},n={roll:i.wrist?.[2]??0,wrist_pitch:i.wrist?.[0]??0,wrist_yaw:i.wrist?.[1]??0,jaw:Math.max(0,Math.min(1,i.jaw??0))*1.1};for(const d of e.joints){const f=t[d.parent];if(!f)throw new Error("Invalid source instrument link hierarchy");const g=d.mimic?n[d.mimic.joint]*Number(d.mimic.multiplier):n[d.name]??0,_=d.type==="fixed"?d.rest:Is(d.rest,wx(d.axis,g));t[d.child]={position:Ql(f.position,Pi(d.origin.xyz,f.quaternion)),quaternion:Is(f.quaternion,_)}}const s=t.tool_tip_link.position,r=Fr(i.position,i.port),o=Math.hypot(...r),a=Vd(i),l=s[0]**2+s[1]**2,c=Ws([s[0],s[1],Math.sqrt(Math.max(1e-10,o*o-l))]),h=Is(a,Oc(c,Ur));return{position:Fr(i.position,Pi(s,h)),quaternion:h,alignment:a,links:t,localTip:s,shaftDirection:Pi(Ur,h),rcmFeasible:o*o+1e-12>=l}}function Mr(i,e=ui(i)){return Od[zd(i)].capsules.map(n=>{const s=e.links[n.link],r=c=>Ql(e.position,Pi(Ql(s.position,Pi(c,s.quaternion)),e.quaternion)),o=r(n.a),a=r(n.b),l=n.radius;return{a:o,b:a,radius:l,id:n.id,part:n.region,min:o.map((c,h)=>Math.min(c,a[h])-l),max:o.map((c,h)=>Math.max(c,a[h])+l)}})}const Or=(i,e)=>i.map((t,n)=>t-e[n]),Sr=(i,e)=>i.reduce((t,n,s)=>t+n*e[s],0),Ei=(i,e,t)=>Math.max(e,Math.min(t,i)),Gi=(i,e)=>Math.hypot(...Or(i,e)),jo=(i,e,t)=>i.map((n,s)=>n+(e[s]-n)*t),or=(i,e)=>[i[1]*e[2]-i[2]*e[1],i[2]*e[0]-i[0]*e[2],i[0]*e[1]-i[1]*e[0]],dr=(i,e=[0,0,-1])=>{const t=Math.hypot(...i);return t>1e-12?i.map(n=>n/t):e},Ax=(i,e)=>2*Math.atan2(Math.hypot(...Is(e,[-i[0],-i[1],-i[2],i[3]]).slice(0,3)),Math.abs(Sr(i,e)));function Hd(i,e,t,n){const s=e[0]-i[0],r=e[1]-i[1],o=e[2]-i[2],a=n[0]-t[0],l=n[1]-t[1],c=n[2]-t[2],h=i[0]-t[0],u=i[1]-t[1],d=i[2]-t[2],f=s*s+r*r+o*o,g=a*a+l*l+c*c,_=a*h+l*u+c*d;let m=0,p=0;if(f<=1e-20)p=g<=1e-20?0:Ei(_/g,0,1);else{const S=s*h+r*u+o*d;if(g<=1e-20)m=Ei(-S/f,0,1);else{const y=s*a+r*l+o*c,M=f*g-y*y;M>1e-20&&(m=Ei((y*_-S*g)/M,0,1)),p=(y*m+_)/g,p<0?(p=0,m=Ei(-S/f,0,1)):p>1&&(p=1,m=Ei((y-S)/f,0,1))}}return{one:m,two:p,distance:Math.hypot(h+s*m-a*p,u+r*m-l*p,d+o*m-c*p)}}function Lo(i,e,t,n){return Hd(i,e,t,n).distance}function Rx(i,e){let t=0;for(let n=0;n<3;n++){const s=Math.max(0,i.min[n]-e.max[n],e.min[n]-i.max[n]);t+=s*s}return Math.sqrt(t)}function tc(i,e,t=null,n=!1){let s=1/0,r=null;for(let c=0;c<i.length;c++)for(let h=0;h<e.length;h++){const u=i[c],d=e[h],f=t?.[c*e.length+h]??0;if(f===-1/0)continue;const g=Rx(u,d);if(!t&&s>=0&&g>0&&g>=s)continue;const _=Hd(u.a,u.b,d.a,d.b),m=_.distance-u.radius-d.radius-f;m<s&&(s=m,r={a:u,b:d,..._})}if(!n)return s;if(!r)return{clearance:s,pair:null,closestPoints:null};const o=jo(r.a.a,r.a.b,r.one),a=jo(r.b.a,r.b.b,r.two),l=dr(Or(a,o),[1,0,0]);return{clearance:s,pair:{left:r.a,right:r.b},closestPoints:{left:o.map((c,h)=>c+l[h]*r.a.radius),right:a.map((c,h)=>c-l[h]*r.b.radius)}}}function Cx(i,e){const t=ui(i),n=ui(e),s=tc(Mr(i,t),Mr(e,n),null,!0);if(s.pair)for(const[r,o,a]of[["left",i,t],["right",e,n]]){const l=s.pair[r],c=s.closestPoints[r];s.pair[r]={part:l.part,id:l.id,section:l.part==="shaft"?Sr(Or(c,o.port),a.shaftDirection)<0?"outside":"inside":"distal"}}return s}function Px(i,e){const t=T=>dr(Or(T.position,T.port),T.shaftDirection),n=t(i),s=t(e),r=Math.atan2(Math.hypot(...or(n,s)),Ei(Sr(n,s),-1,1)),o=Gi(i.position,i.port),a=Gi(e.position,i.port),l=Gi(i.position,e.position),c=Lo(i.port,i.port,i.position,e.position)<1e-7&&r>1e-12,h=dr(or(n,s),dr(or(n,Math.abs(n[0])<.8?[1,0,0]:[0,1,0]))),u=i.wrist.reduce((T,v,x)=>T+Math.abs(e.wrist[x]-v),0),d=1.1*Math.abs(e.jaw-i.jaw),f=Math.abs(e.wrist[0]-i.wrist[0])+Math.abs(e.wrist[1]-i.wrist[1]),g=Math.abs(e.wrist[2]-i.wrist[2]),_=ui(i),m=_.localTip,p=ui(e).localTip,S=_.alignment,y=l===0?S:Tx(e,S),M=!c&&r>1e-12&&Lo(i.port,i.port,i.position,e.position)>=.02&&Gi(Pi([0,0,1],S),n)<1e-9&&Gi(Pi([0,0,1],y),s)<1e-9,C=(T,v,x)=>{const A=Math.cos(x),D=Math.sin(x),U=or(v,T),L=Sr(v,T);return T.map((k,O)=>k*A+U[O]*D+v[O]*L*(1-A))},P=T=>{let v;T<=0?v=[...i.position]:T>=1?v=[...e.position]:c?v=C(n,h,r*T).map((U,L)=>i.port[L]+U*(o+(a-o)*T)):v=jo(i.position,e.position,T);const x=dr(Or(v,i.port)),A=M?Ei(Math.atan2(Math.hypot(...or(n,x)),Ei(Sr(n,x),-1,1))/r,0,1):T,D=c?Is([...h.map(U=>U*Math.sin(r*T/2)),Math.cos(r*T/2)],S):Bd(S,y,A);return{...i,position:v,alignment:D,wrist:jo(i.wrist,e.wrist,T),jaw:i.jaw+(e.jaw-i.jaw)*T}};return{pose:P,bound:(T,v)=>{const x=v-T;if(x<=0)return 0;const A=P(T),D=P(v),U=c?r*x:Ax(A.alignment,D.alignment),L=Gi(A.position,i.port),k=Gi(D.position,i.port),O=c?Math.min(L,k):Lo(i.port,i.port,A.position,D.position),K=Math.max(L,k),V=c?Math.abs(a-o)*x:l*x,Y=f>1e-14?.035:Math.max(Math.hypot(m[0],m[1]),Math.hypot(p[0],p[1])),ne=(.035*f+Y*g)*x;let ue;if(O>Y+1e-6){const Ae=Y/O;ue=3*(ne/O+Y*V/(O*O))/Math.sqrt(1-Ae*Ae)}else ue=Math.min(Math.PI,4*(ne+Math.sqrt(2*K*V+2*Y*ne))/Math.max(1e-5,O));return(c?Math.abs(a-o)*x:l*x)+.65*(U+ue)+.035*(u+d)*x+1e-12}}}function Dx(i,e,t){const n=Px(i,e),s=Mr(t),r=Mr(i),o=1e-7;if(n.bound(0,1)<2e-12)return{tool:n.pose(1),limited:!1};let l=null;if(tc(r,s)<0){l=[];for(const u of r)for(const d of s){const f=Lo(u.a,u.b,d.a,d.b)-u.radius-d.radius;l.push(f<=-u.radius-d.radius+o?-1/0:Math.min(0,f))}}const c=u=>tc(Mr(n.pose(u)),s,l);let h=0;for(let u=0;u<2048;u++){const d=c(h),f=1-h,g=n.bound(h,1);if(d>=g+1e-12)return{tool:n.pose(1),limited:!1};let _=h,m=1;const p=Math.max(d*.8,d<2e-5?5e-5:0);for(let S=0;S<30;S++){const y=(_+m)*.5;n.bound(h,y)<=p?_=y:m=y}if(_-h<1e-12)return{tool:n.pose(h),limited:!0,reason:"motion-resolution"};if(d<2e-5&&c(_)<0){let y=h,M=_;for(let C=0;C<28;C++){const P=(y+M)*.5;c(P)>=0?y=P:M=P}return{tool:n.pose(y),limited:!0,reason:"instrument-contact"}}if(h=_,f<1e-12||h>=1-1e-12)return{tool:n.pose(1),limited:!1}}return{tool:n.pose(h),limited:!0,reason:"motion-resolution"}}const zn=Object.freeze({workingDistance:.065,maximumIntentOffset:.012,minimumWorkingDistance:.028,maximumWorkingDistance:.13,insertionSpeed:.035,insertionSmoothing:4.5,defaultFov:55}),Fn=i=>Array.isArray(i)&&i.length===3&&i.every(Number.isFinite),Mo=(i,e,t)=>Math.min(t,Math.max(e,i)),vu=(i,e)=>Math.hypot(...i.map((t,n)=>t-e[n])),So=i=>[...i];function nc(i){return!!i&&Fn(i.min)&&Fn(i.max)&&i.min.every((e,t)=>e<=i.max[t])}function Ix({port:i,intentTarget:e,surfaceTarget:t=null,fieldAnchor:n=null,organBounds:s=null,heldSpecimen:r=null,viewMode:o="field",depthBias:a=0,fovDegrees:l=zn.defaultFov,aspect:c=1,minimumDepth:h=.018,maximumDepth:u=.135}={}){if(!Fn(i)||!Fn(e)||!Number.isFinite(a)||!Number.isFinite(c)||c<=0||!Number.isFinite(l))throw new TypeError("Invalid scope framing inputs.");let d,f,g,_;if(o==="specimen"&&Fn(r?.position)){f=So(r.position),d=So(f),_="specimen";const M=Number.isFinite(r.radius)&&r.radius>0?r.radius:.009,C=Mo(l,30,100)*Math.PI/180,P=Math.tan(C/2)*Math.min(1,c);g=Math.max(.03,M/(.78*P))}else{if(f=Fn(t)?So(t):Fn(n)?So(n):null,!f&&nc(s)&&(f=e.map((T,v)=>Mo(T,s.min[v],s.max[v]))),!f)return null;_=Fn(t)?"mother-surface":Fn(n)?"retained-operative-field":"mother-bounds";const M=e.map((T,v)=>T-f[v]),C=Math.hypot(...M);let P=.45/(1+(C/.035)**2);Fn(r?.position)&&vu(r.position,f)>.045&&(P*=.35);const R=C>1e-12?Math.min(P,zn.maximumIntentOffset/C):0;d=f.map((T,v)=>T+M[v]*R),g=zn.workingDistance}const m=vu(i,d),p=Mo(g-a,zn.minimumWorkingDistance,Math.max(zn.maximumWorkingDistance,g,m-h)),S=m-g,y=Mo(m-p,h,u);return{target:d,anchor:f,source:_,baseWorkingDistance:g,workingDistance:p,baseDepth:S,depthTarget:y,targetDistance:m,viewMode:_==="specimen"?"specimen":"field",insertionLimited:y<m-p-1e-9,retractionLimited:y>m-p+1e-9,framingLimited:Math.abs(y-(m-p))>1e-9}}function Lx(i,e,t){if(![i,e,t].every(Number.isFinite)||t<0)throw new TypeError("Invalid scope insertion update.");const n=e-i,s=Math.sign(n),r=Math.abs(n),o=zn.insertionSpeed,a=zn.insertionSmoothing,l=o/a;if(r<=l)return e-n*Math.exp(-a*t);const c=(r-l)/o;return t<=c?i+s*o*t:e-s*l*Math.exp(-a*(t-c))}const Gt=Object.freeze({scopeDepth:Object.freeze([.018,.135]),workingDistance:.028,collisionTolerance:1e-7,shaftLengths:Object.freeze({left:.4355,right:.4408}),maxFrameTime:.1,history:40}),Bn=Object.freeze({translation:.035,wrist:.8,jaw:1.1,scopeDepth:.026,scopeRotation:.55,fineFactor:.04,startFactor:.045,accelerationDelay:.12,accelerationTime:.85,followSmoothing:5,followMaxRadiansPerSecond:.9}),ws=i=>typeof structuredClone=="function"?structuredClone(i):JSON.parse(JSON.stringify(i)),vn=(i,e,t)=>Math.min(t,Math.max(e,i)),Ot=i=>typeof i=="number"&&Number.isFinite(i),kt=i=>Array.isArray(i)&&i.length===3&&i.every(Ot),qo=(i,e)=>Math.hypot(i[0]-e[0],i[1]-e[1],i[2]-e[2]),ys=(i,e,t=1e-10)=>i.every((n,s)=>Math.abs(n-e[s])<t),wr=["left","right"],xu=[...wr,"scope"],Nx={x:0,y:1,z:2},Ux=i=>Math.atan2(Math.sin(i),Math.cos(i)),Ko=(i,e)=>i.map((t,n)=>t+e[n]),No=(i,e)=>i.map((t,n)=>t-e[n]),$i=(i,e)=>i.map(t=>t*e),Gr=(i,e)=>i.reduce((t,n,s)=>t+n*e[s],0),sa=(i,e)=>[i[1]*e[2]-i[2]*e[1],i[2]*e[0]-i[0]*e[2],i[0]*e[1]-i[1]*e[0]],Pn=(i,e=[0,0,-1])=>{const t=Math.hypot(...i);return t>1e-12?$i(i,1/t):[...e]},yu=(i,e,t)=>i.map((n,s)=>n+(e[s]-n)*t),Mu=["active","midpoint","grasp"];function Fx(i,e,t,n=!1){if(![i,e,t].every(Ot)||i<0||e<0||t<0)throw new TypeError("Invalid control integration.");if(n)return e*t*Bn.fineFactor;const{startFactor:s,accelerationDelay:r,accelerationTime:o}=Bn,a=l=>{const c=vn((l-r)/o,0,1);return t*(s*l+(1-s)*(o*(c**3-.5*c**4)+Math.max(0,l-r-o)))};return a(i+e)-a(i)}function Uo(i,e=!1,t=null,n=null){const s=Cx(i.left,i.right);return{...s,active:e,blocked:e,contact:s.clearance<=25e-5,selected:e?t:null,reason:e?n:null}}function Xa(i){(i.collision?.blocked||i.collision?.active)&&(i.collision={...i.collision,active:!1,blocked:!1,selected:null,reason:null})}function Fo(i,e=[0,1,0]){const t=No(e,$i(i,Gr(e,i)));return Math.hypot(...t)>1e-8?Pn(t):Pn(sa(i,Math.abs(i[0])<.8?[1,0,0]:[0,0,1]))}function ic(i,e,t){const n=Math.cos(t),s=Math.sin(t);return Ko(Ko($i(i,n),$i(sa(e,i),s)),$i(e,Gr(e,i)*(1-n)))}function Ox(i,e,t,n){const s=Math.acos(vn(Gr(i,e),-1,1));if(s<1e-10)return[...e];const r=Math.min(s*(1-Math.exp(-Bn.followSmoothing*t)),Bn.followMaxRadiansPerSecond*t),o=Pn(sa(i,e),Fo(i,n));return Pn(ic(i,o,r))}const sc=Object.freeze({left:{port:[-.08,1.18,.1],position:[-.025,1.105,0],wrist:[0,0,0],jaw:.6},right:{port:[.08,1.18,.1],position:[.025,1.108,0],wrist:[0,0,0],jaw:.6}}),fr=Object.freeze([0,1.18,.14]);function ja(){const i=[...sc.left.position],e=i[0]-fr[0],t=i[1]-fr[1],n=i[2]-fr[2],s={selected:"left",activeTool:"left",paused:!1,cutting:!1,elapsed:0,tools:ws(sc),scope:{port:[...fr],position:[0,0,0],target:i,lookAt:[...i],depth:vn(Math.hypot(e,t,n)-zn.workingDistance,...Gt.scopeDepth),yaw:Math.atan2(e,-n),pitch:Math.atan2(-t,Math.hypot(e,n)),roll:0,follow:!0,followMode:"active",graspTarget:null,operating:!1,direction:Pn([e,t,n]),up:[0,1,0],cameraUp:[0,1,0],viewMode:"field",depthBias:0,surfaceTarget:null,fieldAnchor:null,organBounds:null,heldSpecimen:null,framingSource:null,framingLimited:!1,targetWorkingDistance:zn.workingDistance,autoDepthTarget:null,intentTarget:[...i]}};for(const r of wr){s.tools[r].shaftLength=Gt.shaftLengths[r],s.tools[r].instrument=r==="left"?"needle-driver":"scissors";const o=ui(s.tools[r]);s.tools[r].alignment=o.alignment,s.tools[r].shaftDirection=o.shaftDirection}return s.collision=Uo(s.tools),bs(s),s}function kx(i){return[Math.sin(i.yaw)*Math.cos(i.pitch),-Math.sin(i.pitch),-Math.cos(i.yaw)*Math.cos(i.pitch)]}function bs(i,e){const t=i.scope;t.port=[...fr];const n=t.follow?qo(t.target,t.port):.19,s=Math.max(Gt.scopeDepth[0],Math.min(Gt.scopeDepth[1],n-Gt.workingDistance));t.depth=vn(t.depth,Gt.scopeDepth[0],s);const r=Pn(e||kx(t)),o=kt(t.direction)?Pn(t.direction):r,a=Fo(o,t.up),l=sa(o,r),c=Math.acos(vn(Gr(o,r),-1,1));t.up=c>1e-10?Fo(r,ic(a,Pn(l,a),c)):Fo(r,a),t.direction=r,t.cameraUp=Pn(ic(t.up,r,t.roll)),t.position=t.port.map((h,u)=>h+r[u]*t.depth),t.lookAt=t.port.map((h,u)=>h+r[u]*Math.max(n,t.depth+Gt.workingDistance)),t.follow||(t.target=[...t.lookAt]),t.actualWorkingDistance=qo(t.position,t.target)}function Su(i,e){if(!kt(i)||!kt(e))throw new TypeError("Tool position and port require three finite numbers.");return[...i]}function Bx(i){const e=i instanceof Set?i:new Set(i||[]),t=new Set,n={" ":"Space",Spacebar:"Space",Shift:"ShiftLeft",1:"Digit1",2:"Digit2",3:"Digit3","[":"BracketLeft","]":"BracketRight",w:"KeyW",s:"KeyS",a:"KeyA",d:"KeyD",q:"KeyQ",e:"KeyE",z:"KeyZ",x:"KeyX",c:"KeyC",v:"KeyV"};for(const s of e)typeof s=="string"&&t.add(n[s]||n[s.toLowerCase()]||s);return t}const xi=(i,e,t)=>Number(i.has(e))-Number(i.has(t));class zx{constructor({onEvent:e,getExtraData:t}={}){this.state=ja(),this.undoStack=[],this.redoStack=[],this._listeners=new Set,typeof e=="function"&&this._listeners.add(e),this._previousKeys=new Set,this._gesture=!1,this._events=[],this._limitCooldown=0,this._controlAges=new Map,this.getExtraData=typeof t=="function"?t:void 0,this.viewAspect=1}onEvent(e){if(typeof e!="function")throw new TypeError("Event listener must be a function.");return this._listeners.add(e),()=>this._listeners.delete(e)}_emit(e,t={}){const n={type:e,...t};this._events.push(n);for(const s of this._listeners)s(n);return n}get canUndo(){return this.undoStack.length>0}get canRedo(){return this.redoStack.length>0}get selectedTool(){return this.state.tools[this.state.activeTool]}snapshot(){return ws({version:1,state:this.state})}restore(e){const t=ws(e?.state??e);if(!t||!xu.includes(t.selected)||!wr.includes(t.activeTool)||!Ot(t.elapsed))throw new TypeError("Invalid simulation snapshot.");for(const s of wr){const r=t.tools?.[s];if(!r||!kt(r.position)||!kt(r.wrist)||!Ot(r.jaw))throw new TypeError(`Invalid ${s} tool snapshot.`);if(r.port=[...sc[s].port],r.shaftLength=Gt.shaftLengths[s],r.position=Su(r.position,r.port),r.shaftDirection!==void 0&&(!kt(r.shaftDirection)||Math.hypot(...r.shaftDirection)<1e-10))throw new TypeError(`Invalid ${s} shaft direction.`);if(r.instrument=s==="left"?"needle-driver":"scissors",r.alignment!==void 0&&(!Array.isArray(r.alignment)||r.alignment.length!==4||!r.alignment.every(Ot)||Math.hypot(...r.alignment)<1e-10))throw new TypeError(`Invalid ${s} tool frame.`);const o=ui(r);r.alignment=o.alignment,r.shaftDirection=o.shaftDirection,r.jaw=vn(r.jaw,0,1)}const n=t.scope;if(!n||!kt(n.target)||!["depth","yaw","pitch","roll"].every(s=>Ot(n[s]))||!Mu.includes(n.followMode))throw new TypeError("Invalid scope snapshot.");if(t.paused=!!t.paused,t.cutting=!!t.cutting,n.follow=!!n.follow,n.graspTarget!=null&&!kt(n.graspTarget))throw new TypeError("Invalid scope grasp target.");if(n.graspTarget??=null,n.operating=!!n.operating,n.viewMode??="field",n.depthBias??=0,n.surfaceTarget??=null,n.fieldAnchor??=n.surfaceTarget?[...n.surfaceTarget]:null,n.organBounds??=null,n.heldSpecimen??=null,n.framingSource??=null,n.targetWorkingDistance??=zn.workingDistance,n.framingLimited=!!n.framingLimited,n.autoDepthTarget??=null,n.intentTarget??=[...n.target],!["field","specimen"].includes(n.viewMode)||!Ot(n.depthBias)||n.surfaceTarget!==null&&!kt(n.surfaceTarget)||n.fieldAnchor!==null&&!kt(n.fieldAnchor)||n.organBounds!==null&&!nc(n.organBounds)||!kt(n.intentTarget)||n.heldSpecimen!==null&&(!kt(n.heldSpecimen.position)||!Ot(n.heldSpecimen.radius)||n.heldSpecimen.radius<0))throw new TypeError("Invalid scope anatomical framing snapshot.");return t.elapsed=Math.max(0,t.elapsed),t.collision=Uo(t.tools),bs(t),this.state=t,this._gesture=!1,this._previousKeys.clear(),this._controlAges.clear(),this._emit("restore"),this.state}checkpoint(e="操作",t){this.undoStack.push({label:String(e),snapshot:this.snapshot(),extraData:t===void 0?void 0:ws(t)}),this.undoStack.length>Gt.history&&this.undoStack.shift(),this.redoStack.length=0,this._emit("history",{canUndo:!0,canRedo:!1})}_travelHistory(e,t,n,s){if(!e.length)return null;const r=e.pop();t.push({label:r.label,snapshot:this.snapshot(),extraData:n===void 0?void 0:ws(n)});const o=this.state.paused;this.restore(r.snapshot),this.state.paused=o;const a={label:r.label,extraData:r.extraData===void 0?void 0:ws(r.extraData),hasExtraData:r.extraData!==void 0};return this._emit(s,a),this._emit("history",{canUndo:this.canUndo,canRedo:this.canRedo}),a}undo(e){return this._travelHistory(this.undoStack,this.redoStack,e,"undo")}redo(e){return this._travelHistory(this.redoStack,this.undoStack,e,"redo")}reset(){return this.state=ja(),this.undoStack.length=this.redoStack.length=0,this._previousKeys.clear(),this._gesture=!1,this._controlAges.clear(),this._emit("reset"),this._emit("history",{canUndo:!1,canRedo:!1}),this.state}setSelected(e){return this.select(e)}select(e){if(!xu.includes(e))throw new RangeError(`Unknown selection: ${e}`);return this.state.selected===e?!1:(this.state.selected=e,e!=="scope"&&(this.state.activeTool=e),this._gesture=!1,this._controlAges.clear(),Xa(this.state),this._emit("selection",{selected:e}),!0)}setPaused(e){this.state.paused=!!e,this._gesture=!1,this._controlAges.clear(),Xa(this.state),this._emit("pause",{paused:this.state.paused})}setCutting(e){this.state.cutting=!!e,this._emit("cutting",{cutting:this.state.cutting})}setScopeFollow(e,t=this.state.scope.followMode){if(!Mu.includes(t))throw new RangeError("Scope follow mode must be active, midpoint or grasp.");this.state.scope.follow=!!e,this.state.scope.followMode=t,this._emit("scope-follow",{follow:this.state.scope.follow,mode:t})}setScopeContext({graspTarget:e=null,operating:t=!1,surfaceTarget:n,organBounds:s,heldSpecimen:r,viewAspect:o}={}){if(e!==null&&!kt(e))throw new TypeError("Grasp target must be null or three finite world coordinates.");if(n!=null&&!kt(n))throw new TypeError("Surface target requires finite world coordinates.");if(s!=null&&!nc(s))throw new TypeError("Organ bounds require finite min/max world coordinates.");if(r!=null&&(!kt(r.position)||!Ot(r.radius)||r.radius<0))throw new TypeError("Held specimen requires a finite world position and nonnegative radius.");if(o!==void 0&&(!Ot(o)||o<=0))throw new TypeError("Scope view aspect requires a finite positive width/height ratio.");o!==void 0&&(this.viewAspect=o),this.state.scope.graspTarget=e===null?null:[...e],this.state.scope.operating=!!t,n!==void 0&&(this.state.scope.surfaceTarget=n===null?null:[...n],n!==null&&(this.state.scope.fieldAnchor=[...n])),s!==void 0&&(this.state.scope.organBounds=s===null?null:{min:[...s.min],max:[...s.max]}),r!==void 0&&(this.state.scope.heldSpecimen=r===null?null:{...r,position:[...r.position]})}setScopeViewMode(e){if(!["field","specimen"].includes(e))throw new RangeError("Scope view mode must be field or specimen.");return this.state.scope.viewMode===e?!1:(this.state.scope.viewMode=e,this.state.scope.depthBias=0,this._emit("scope-view",{viewMode:e}),!0)}_scopeIntentTarget(){const e=this.state.scope;return e.followMode==="grasp"&&e.graspTarget?e.operating?yu(e.graspTarget,this.state.tools.right.position,.5):[...e.graspTarget]:e.followMode==="midpoint"||e.followMode==="grasp"?yu(this.state.tools.left.position,this.state.tools.right.position,.5):[...this.state.tools[this.state.activeTool].position]}_scopeFraming(e=this._scopeIntentTarget()){const t=this.state.scope;return Ix({...t,intentTarget:e,aspect:this.viewAspect,minimumDepth:Gt.scopeDepth[0],maximumDepth:Gt.scopeDepth[1]})}_manualScopeDepth(e,t=null){const n=this.state.scope,s=t?.targetDistance??(n.follow?qo(n.target,n.port):.19),r=Math.max(Gt.scopeDepth[0],Math.min(Gt.scopeDepth[1],s-Gt.workingDistance));n.depth=vn(n.depth+e,Gt.scopeDepth[0],r),n.follow&&t&&(n.depthBias=n.depth-t.baseDepth)}_integrateControl(e,t,n,s,r){const o=Math.hypot(...t);if(!o)return this._controlAges.delete(e),t.map(()=>0);const a=$i(t,1/o),l=a.join(",")+":"+r,c=this._controlAges.get(e),h=c?.signature===l?c.age:0,u=Fx(h,n,s,r);return this._controlAges.set(e,{signature:l,age:h+n}),$i(a,u)}_tool(e=this.state.selected){if(!wr.includes(e))throw new RangeError("Select a left or right instrument for this action.");return this.state.tools[e]}_moveTool(e,t=this.state.selected){if(!kt(e))throw new TypeError("Tool displacement requires three finite values.");const n=this._tool(t),s=n.position.map((r,o)=>r+e[o]);return this._applyTool({...n,position:Su(s,n.port)},t)}_applyTool(e,t){const n=this._tool(t);if(e.position.every((u,d)=>u===n.position[d])&&e.wrist.every((u,d)=>u===n.wrist[d])&&e.jaw===n.jaw)return{changed:!1,limited:!1};const s=this._tool(t==="left"?"right":"left"),{tool:r,limited:o,reason:a}=Dx(n,e,s),l=!ys(r.position,n.position)||!ys(r.wrist,n.wrist)||r.jaw!==n.jaw;n.position=[...r.position];const c=ui(r);n.shaftDirection=c.shaftDirection,n.alignment=c.alignment,n.wrist=[...r.wrist],n.jaw=r.jaw,this.state.collision=Uo(this.state.tools,o&&a==="instrument-contact",t,a);const h=this.state.collision.clearance;return o&&this._limitCooldown<=0&&(this._emit("limit",{selected:t,kind:a==="instrument-contact"?"instrument-collision":"motion-resolution",clearance:h}),this._limitCooldown=.6),{changed:l,limited:o}}moveToolTo(e,t=this.state.selected,{checkpoint:n=!1,label:s="定位器械"}={}){if(!kt(e))throw new TypeError("Tool position requires three finite values.");return this.state.paused?{changed:!1,limited:!1}:(n&&this.checkpoint(s,this.getExtraData?.()),this._moveTool(No(e,this._tool(t).position),t))}moveTool(e,t=this.state.selected){return this.state.paused?{changed:!1,limited:!1}:this._moveTool(e,t)}nudge(e,t,n=.002,s=this.state.selected){const r=typeof e=="string"?Nx[e]:e;if(![0,1,2].includes(r)||!Ot(t)||!Ot(n)||n<0)throw new TypeError("Nudge requires an axis, finite direction and nonnegative step.");if(this.state.paused)return!1;if(this.checkpoint("微调位移",this.getExtraData?.()),s==="scope")return r===2?this._manualScopeDepth(-t*n,this.state.scope.follow?this._scopeFraming():null):(this.setScopeFollow(!1),this.state.scope[r===0?"yaw":"pitch"]+=t*n*5),bs(this.state),!0;const o=[0,0,0];return o[r]=t*n,this._moveTool(o,s).changed}setJaw(e,t){if(!Ot(t))throw new TypeError("Jaw opening must be finite.");if(this.state.paused)return!1;const n=this._tool(e),s=vn(t,0,1);return this._applyTool({...n,jaw:s},e).changed}adjustJaw(e,t=this.state.selected){if(!Ot(e))throw new TypeError("Jaw delta must be finite.");return this.setJaw(t,this._tool(t).jaw+e)}adjustWrist(e,t,n=this.state.selected){if(![0,1,2].includes(e)||!Ot(t))throw new TypeError("Wrist adjustment requires axis 0–2 and a finite delta.");if(this.state.paused)return!1;if(n==="scope"){const a=["pitch","yaw","roll"][e];e<2&&this.state.scope.follow&&this.setScopeFollow(!1);const l=this.state.scope[a];return this.state.scope[a]+=t,bs(this.state),l!==this.state.scope[a]}const s=this._tool(n),r=s.wrist[e]+t;if(!Ot(r))throw new TypeError("Wrist rotation overflow.");const o=[...s.wrist];return o[e]=r,this._applyTool({...s,wrist:o},n).changed}homeTools(){return this.state.paused?!1:(this.checkpoint("器械回中",this.getExtraData?.()),this.state.tools=ja().tools,this.state.collision=Uo(this.state.tools),this._emit("home"),!0)}update(e,t=new Set){this._events=[];const n=Bx(t);Xa(this.state);for(const[A,D]of[["Digit1","left"],["Digit2","right"],["Digit3","scope"]])n.has(A)&&!this._previousKeys.has(A)&&this.select(D);if(this._previousKeys=n,!Ot(e)||e<=0)return{changed:!1,moving:!1,clutched:!1,limited:!1,events:[...this._events]};const s=Math.min(e,Gt.maxFrameTime);this._limitCooldown=Math.max(0,this._limitCooldown-s);const r=n.has("Space");if(this.state.paused||r)return this._gesture=!1,this._controlAges.clear(),{changed:!1,moving:!1,clutched:r,limited:!1,events:[...this._events]};const o=xi(n,"KeyD","KeyA"),a=xi(n,"KeyE","KeyQ"),l=xi(n,"KeyS","KeyW"),c=xi(n,"ArrowUp","ArrowDown"),h=xi(n,"ArrowRight","ArrowLeft"),u=xi(n,"KeyX","KeyZ"),d=xi(n,"KeyV","KeyC"),f=xi(n,"BracketRight","BracketLeft"),g=!!(o||a||l||c||h||u||f||d&&this.state.selected!=="scope");g&&!this._gesture&&this.checkpoint("遥操作位姿",this.getExtraData?.()),this._gesture=g;const _=n.has("ShiftLeft")||n.has("ShiftRight");let m=!1,p=!1;const S=[...this.state.scope.position],y=this.state.scope.depth,M=this._integrateControl("translation",[o,a,l],s,Bn.translation,_),C=this._integrateControl("rotation",[c,h,u],s,Bn.wrist,_),P=this._integrateControl("scope-rotation",[vn(a+c,-1,1),vn(o+h,-1,1),u],s,Bn.scopeRotation,_),R=this._integrateControl("scope-navigation",[vn(-l+f,-1,1)],s,Bn.scopeDepth,_)[0],T=this._integrateControl("scope-depth",[f],s,Bn.scopeDepth,_)[0];if(this.state.selected==="scope"){const A=this.state.scope;(o||a||c||h)&&A.follow&&this.setScopeFollow(!1);const D=[A.depth,A.yaw,A.pitch,A.roll];A.pitch+=P[0],A.yaw+=P[1],A.roll+=P[2],m=!ys(D.slice(0,3),[A.depth,A.yaw,A.pitch])||D[3]!==A.roll}else{const A=this._tool(),D=this._applyTool({...A,position:Ko(A.position,M),wrist:Ko(A.wrist,C),jaw:vn(A.jaw+d*Bn.jaw*s*(_?.35:1),0,1)},this.state.selected);p=D.limited,m=D.changed}const v=this.state.scope,x=this.state.selected==="scope"?R:T;if(v.follow){const A=this._scopeIntentTarget();let D=this._scopeFraming(A);const U=D?.target??A;v.intentTarget=[...A],v.target=U;const L=[...v.position],k=[...v.lookAt],O=Ox(v.direction,Pn(No(U,v.port),v.direction),s,v.up);if(x)this._manualScopeDepth(x,D),D=this._scopeFraming(A);else if(D){const K=Lx(v.depth,D.depthTarget,s);(K<=v.depth||Gr(O,Pn(No(U,v.port),O))>Math.cos(.35))&&(v.depth=K)}v.framingSource=D?.source??null,v.framingLimited=D?.framingLimited??!1,v.targetWorkingDistance=D?.workingDistance??qo(v.position,v.target),v.autoDepthTarget=D?.depthTarget??null,v.yaw+=Ux(Math.atan2(O[0],-O[2])-v.yaw),v.pitch=Math.atan2(-O[1],Math.hypot(O[0],O[2])),bs(this.state,O),m=!ys(L,v.position)||!ys(k,v.lookAt)||m}else x&&this._manualScopeDepth(x),v.framingSource=null,v.framingLimited=!1,v.autoDepthTarget=null,bs(this.state);return m=!ys(S,v.position)||y!==v.depth||m,this.state.elapsed+=s,{changed:m,moving:g,clutched:r,limited:p,events:[...this._events]}}}function wu(i,e){if(e===Of)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Xl||e===sd){let t=i.getIndex();if(t===null){const o=[],a=i.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);i.setIndex(o),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,s=[];if(e===Xl)for(let o=1;o<=n;o++)s.push(t.getX(0)),s.push(t.getX(o)),s.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(s.push(t.getX(o)),s.push(t.getX(o+1)),s.push(t.getX(o+2))):(s.push(t.getX(o+2)),s.push(t.getX(o+1)),s.push(t.getX(o)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}class Oo extends Ys{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Xx(t)}),this.register(function(t){return new jx(t)}),this.register(function(t){return new ty(t)}),this.register(function(t){return new ny(t)}),this.register(function(t){return new iy(t)}),this.register(function(t){return new Kx(t)}),this.register(function(t){return new Yx(t)}),this.register(function(t){return new $x(t)}),this.register(function(t){return new Zx(t)}),this.register(function(t){return new Wx(t)}),this.register(function(t){return new Jx(t)}),this.register(function(t){return new qx(t)}),this.register(function(t){return new ey(t)}),this.register(function(t){return new Qx(t)}),this.register(function(t){return new Hx(t)}),this.register(function(t){return new sy(t)}),this.register(function(t){return new ry(t)})}load(e,t,n,s){const r=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const c=yr.extractUrlBase(e);o=yr.resolveURL(c,this.path)}else o=yr.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){s?s(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new Rd(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,o,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r;const o={},a={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Gd){try{o[Ye.KHR_BINARY_GLTF]=new oy(e)}catch(u){s&&s(u);return}r=JSON.parse(o[Ye.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new xy(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case Ye.KHR_MATERIALS_UNLIT:o[u]=new Gx;break;case Ye.KHR_DRACO_MESH_COMPRESSION:o[u]=new ay(r,this.dracoLoader);break;case Ye.KHR_TEXTURE_TRANSFORM:o[u]=new ly;break;case Ye.KHR_MESH_QUANTIZATION:o[u]=new cy;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,s)}parseAsync(e,t){const n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}}function Vx(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}const Ye={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Hx{constructor(e){this.parser=e,this.name=Ye.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let s=t.cache.get(n);if(s)return s;const r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let c;const h=new Ce(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],jt);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new $l(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Pd(h),c.distance=u;break;case"spot":c=new Cd(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),On(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),s=Promise.resolve(c),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class Gx{constructor(){this.name=Ye.KHR_MATERIALS_UNLIT}getMaterialType(){return hn}extendParams(e,t,n){const s=[];e.color=new Ce(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],jt),e.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,Rt))}return Promise.all(s)}}class Wx{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class Xx{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new de(a,a)}return Promise.all(r)}}class jx{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dn}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class qx{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}}class Kx{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new Ce(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=s.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],jt)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,Rt)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}}class Yx{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}}class $x{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new Ce().setRGB(a[0],a[1],a[2],jt),Promise.all(r)}}class Zx{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dn}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class Jx{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new Ce().setRGB(a[0],a[1],a[2],jt),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,Rt)),Promise.all(r)}}class Qx{constructor(e){this.parser=e,this.name=Ye.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}}class ey{constructor(e){this.parser=e,this.name=Ye.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}}class ty{constructor(e){this.parser=e,this.name=Ye.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}}class ny{constructor(e){this.parser=e,this.name=Ye.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=s.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}}class iy{constructor(e){this.parser=e,this.name=Ye.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=s.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}}class sy{constructor(e){this.name=Ye.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){const l=s.byteOffset||0,c=s.byteLength||0,h=s.count,u=s.byteStride,d=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,d,s.mode,s.filter).then(function(f){return f.buffer}):o.ready.then(function(){const f=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(f),h,u,d,s.mode,s.filter),f})})}else return null}}class ry{constructor(e){this.name=Ye.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const s=t.meshes[n.mesh];for(const c of s.primitives)if(c.mode!==_n.TRIANGLES&&c.mode!==_n.TRIANGLE_STRIP&&c.mode!==_n.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(h=>(l[c]=h,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(const g of u){const _=new Ue,m=new b,p=new Fe,S=new b(1,1,1),y=new vd(g.geometry,g.material,d);for(let M=0;M<d;M++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,M),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,M),l.SCALE&&S.fromBufferAttribute(l.SCALE,M),y.setMatrixAt(M,_.compose(m,p,S));for(const M in l)if(M==="_COLOR_0"){const C=l[M];y.instanceColor=new Kl(C.array,C.itemSize,C.normalized)}else M!=="TRANSLATION"&&M!=="ROTATION"&&M!=="SCALE"&&g.geometry.setAttribute(M,l[M]);ht.prototype.copy.call(y,g),this.parser.assignFinalMaterial(y),f.push(y)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const Gd="glTF",ar=12,bu={JSON:1313821514,BIN:5130562};class oy{constructor(e){this.name=Ye.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,ar),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Gd)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-ar,r=new DataView(e,ar);let o=0;for(;o<s;){const a=r.getUint32(o,!0);o+=4;const l=r.getUint32(o,!0);if(o+=4,l===bu.JSON){const c=new Uint8Array(e,ar+o,a);this.content=n.decode(c)}else if(l===bu.BIN){const c=ar+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class ay{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Ye.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const h in o){const u=rc[h]||h.toLowerCase();a[u]=o[h]}for(const h in e.attributes){const u=rc[h]||h.toLowerCase();if(o[h]!==void 0){const d=n.accessors[e.attributes[h]],f=Ls[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){s.decodeDracoFile(h,function(f){for(const g in f.attributes){const _=f.attributes[g],m=l[g];m!==void 0&&(_.normalized=m)}u(f)},a,c,jt,d)})})}}class ly{constructor(){this.name=Ye.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class cy{constructor(){this.name=Ye.KHR_MESH_QUANTIZATION}}class Wd extends Hr{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let o=0;o!==s;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,h=s-t,u=(n-t)/h,d=u*u,f=d*u,g=e*c,_=g-c,m=-2*f+3*d,p=f-d,S=1-m,y=p-d+u;for(let M=0;M!==a;M++){const C=o[_+M+a],P=o[_+M+l]*h,R=o[g+M+a],T=o[g+M]*h;r[M]=S*C+y*P+m*R+p*T}return r}}const hy=new Fe;class uy extends Wd{interpolate_(e,t,n,s){const r=super.interpolate_(e,t,n,s);return hy.fromArray(r).normalize().toArray(r),r}}const _n={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Ls={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Eu={9728:Qt,9729:Jt,9984:$u,9985:Ao,9986:hr,9987:ii},Tu={33071:Ti,33648:Vo,10497:Ji},qa={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},rc={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},yi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},dy={CUBICSPLINE:void 0,LINEAR:Ir,STEP:Dr},Ka={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function fy(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new hi({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ai})),i.DefaultMaterial}function Wi(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function On(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function py(i,e,t){let n=!1,s=!1,r=!1;for(let c=0,h=e.length;c<h;c++){const u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);const o=[],a=[],l=[];for(let c=0,h=e.length;c<h;c++){const u=e[c];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):i.attributes.position;o.push(d)}if(s){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):i.attributes.normal;a.push(d)}if(r){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):i.attributes.color;l.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2];return n&&(i.morphAttributes.position=h),s&&(i.morphAttributes.normal=u),r&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function my(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function gy(i){let e;const t=i.extensions&&i.extensions[Ye.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Ya(t.attributes):e=i.indices+":"+Ya(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+Ya(i.targets[n]);return e}function Ya(i){let e="";const t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function oc(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function _y(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const vy=new Ue;class xy{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Vx,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const l=a.match(/Version\/(\d+)/);s=n&&l?parseInt(l[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&o<98?this.textureLoader=new bm(this.options.manager):this.textureLoader=new Rm(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Rd(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:n,userData:{}};return Wi(r,a,s),On(a,s),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(const l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){const o=t[s].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let s=0,r=e.length;s<r;s++){const o=e[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const s=n.clone(),r=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,h]of o.children.entries())r(h,a.children[c])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const s=e(t[n]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let s=0;s<t.length;s++){const r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Ye.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,o){n.load(yr.resolveURL(t.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){const t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const o=qa[s.type],a=Ls[s.componentType],l=s.normalized===!0,c=new a(s.count*o);return Promise.resolve(new ct(c,o,l))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){const a=o[0],l=qa[s.type],c=Ls[s.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=s.byteOffset||0,f=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0;let _,m;if(f&&f!==u){const p=Math.floor(d/f),S="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count;let y=t.cache.get(S);y||(_=new c(a,p*f,s.count*f/h),y=new Up(_,f/h),t.cache.add(S,y)),m=new Tc(y,l,d%f/h,g)}else a===null?_=new c(s.count*l):_=new c(a,d,s.count*l),m=new ct(_,l,g);if(s.sparse!==void 0){const p=qa.SCALAR,S=Ls[s.sparse.indices.componentType],y=s.sparse.indices.byteOffset||0,M=s.sparse.values.byteOffset||0,C=new S(o[1],y,s.sparse.count*p),P=new c(o[2],M,s.sparse.count*l);a!==null&&(m=new ct(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let R=0,T=C.length;R<T;R++){const v=C[R];if(m.setX(v,P[R*l]),l>=2&&m.setY(v,P[R*l+1]),l>=3&&m.setZ(v,P[R*l+2]),l>=4&&m.setW(v,P[R*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){const s=this,r=this.json,o=r.textures[e],a=r.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);const d=(r.samplers||{})[o.sampler]||{};return h.magFilter=Eu[d.magFilter]||Jt,h.minFilter=Eu[d.minFilter]||ii,h.wrapS=Tu[d.wrapS]||Ji,h.wrapT=Tu[d.wrapT]||Ji,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Qt&&h.minFilter!==Jt,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const o=s.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(u){c=!0;const d=new Blob([u],{type:o.mimeType});return l=a.createObjectURL(d),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(d,f){let g=d;t.isImageBitmapLoader===!0&&(g=function(_){const m=new Pt(_);m.needsUpdate=!0,d(m)}),t.load(yr.resolveURL(u,r.path),g,void 0,f)})}).then(function(u){return c===!0&&a.revokeObjectURL(l),On(u,o),u.userData.mimeType=o.mimeType||_y(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,s){const r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[Ye.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[Ye.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=r.associations.get(o);o=r.extensions[Ye.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,l)}}return s!==void 0&&(o.colorSpace=s),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new xd,In.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new Cc,In.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(s||r||o){let a="ClonedMaterial:"+n.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),r&&(l.vertexColors=!0),o&&(l.flatShading=!0),s&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return hi}loadMaterial(e){const t=this,n=this.json,s=this.extensions,r=n.materials[e];let o;const a={},l=r.extensions||{},c=[];if(l[Ye.KHR_MATERIALS_UNLIT]){const u=s[Ye.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),c.push(u.extendParams(a,r,t))}else{const u=r.pbrMetallicRoughness||{};if(a.color=new Ce(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],jt),a.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",u.baseColorTexture,Rt)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=cn);const h=r.alphaMode||Ka.OPAQUE;if(h===Ka.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===Ka.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==hn&&(c.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new de(1,1),r.normalTexture.scale!==void 0)){const u=r.normalTexture.scale;a.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&o!==hn&&(c.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==hn){const u=r.emissiveFactor;a.emissive=new Ce().setRGB(u[0],u[1],u[2],jt)}return r.emissiveTexture!==void 0&&o!==hn&&c.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,Rt)),Promise.all(c).then(function(){const u=new o(a);return r.name&&(u.name=r.name),On(u,r),t.associations.set(u,{materials:e}),r.extensions&&Wi(s,u,r),u})}createUniqueName(e){const t=rt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,s=this.primitiveCache;function r(a){return n[Ye.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return Au(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],h=gy(c),u=s[h];if(u)o.push(u.promise);else{let d;c.extensions&&c.extensions[Ye.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=Au(new Lt,c,t),s[h]={primitive:c,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,s=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const h=o[l].material===void 0?fy(this.cache):this.getDependency("material",o[l].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,g=h.length;f<g;f++){const _=h[f],m=o[f];let p;const S=c[f];if(m.mode===_n.TRIANGLES||m.mode===_n.TRIANGLE_STRIP||m.mode===_n.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new Op(_,S):new qe(_,S),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===_n.TRIANGLE_STRIP?p.geometry=wu(p.geometry,sd):m.mode===_n.TRIANGLE_FAN&&(p.geometry=wu(p.geometry,Xl));else if(m.mode===_n.LINES)p=new Gp(_,S);else if(m.mode===_n.LINE_STRIP)p=new Qo(_,S);else if(m.mode===_n.LINE_LOOP)p=new Wp(_,S);else if(m.mode===_n.POINTS)p=new Xp(_,S);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&my(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),On(p,r),m.extensions&&Wi(s,p,m),t.assignFinalMaterial(p),u.push(p)}for(let f=0,g=u.length;f<g;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&Wi(s,u[0],r),u[0];const d=new Ke;r.extensions&&Wi(s,d,r),t.associations.set(d,{meshes:e});for(let f=0,g=u.length;f<g;f++)d.add(u[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Wt(ni.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new ta(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),On(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){const r=s.pop(),o=s,a=[],l=[];for(let c=0,h=o.length;c<h;c++){const u=o[c];if(u){a.push(u);const d=new Ue;r!==null&&d.fromArray(r.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Ac(a,l)})}loadAnimation(e){const t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,o=[],a=[],l=[],c=[],h=[];for(let u=0,d=s.channels.length;u<d;u++){const f=s.channels[u],g=s.samplers[f.sampler],_=f.target,m=_.node,p=s.parameters!==void 0?s.parameters[g.input]:g.input,S=s.parameters!==void 0?s.parameters[g.output]:g.output;_.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",S)),c.push(g),h.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],g=u[2],_=u[3],m=u[4],p=[];for(let y=0,M=d.length;y<M;y++){const C=d[y],P=f[y],R=g[y],T=_[y],v=m[y];if(C===void 0)continue;C.updateMatrix&&C.updateMatrix();const x=n._createAnimationTracks(C,P,R,T,v);if(x)for(let A=0;A<x.length;A++)p.push(x[A])}const S=new _m(r,void 0,p);return On(S,s),S})}createNodeMesh(e){const t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){const o=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=s.weights.length;l<c;l++)a.morphTargetInfluences[l]=s.weights[l]}),o})}loadNode(e){const t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=s.children||[];for(let c=0,h=a.length;c<h;c++)o.push(n.getDependency("node",a[c]));const l=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),l]).then(function(c){const h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,vy)});for(let f=0,g=u.length;f<g;f++)h.add(u[f]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],o=r.name?s.createUniqueName(r.name):"",a=[],l=s._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(c){return s._getNodeRef(s.cameraCache,r.camera,c)})),s._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let h;if(r.isBone===!0?h=new gd:c.length>1?h=new Ke:c.length===1?h=c[0]:h=new ht,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(r.name&&(h.userData.name=r.name,h.name=o),On(h,r),r.extensions&&Wi(n,h,r),r.matrix!==void 0){const u=new Ue;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!s.associations.has(h))s.associations.set(h,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){const u=s.associations.get(h);s.associations.set(h,{...u})}return s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],s=this,r=new Ke;n.name&&(r.name=s.createUniqueName(n.name)),On(r,n),n.extensions&&Wi(t,r,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(s.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let h=0,u=l.length;h<u;h++)r.add(l[h]);const c=h=>{const u=new Map;for(const[d,f]of s.associations)(d instanceof In||d instanceof Pt)&&u.set(d,f);return h.traverse(d=>{const f=s.associations.get(d);f!=null&&u.set(d,f)}),u};return s.associations=c(r),r})}_createAnimationTracks(e,t,n,s,r){const o=[],a=e.name?e.name:e.uuid,l=[];yi[r.path]===yi.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(a);let c;switch(yi[r.path]){case yi.weights:c=Vs;break;case yi.rotation:c=Hs;break;case yi.translation:case yi.scale:c=Gs;break;default:switch(n.itemSize){case 1:c=Vs;break;case 2:case 3:default:c=Gs;break}break}const h=s.interpolation!==void 0?dy[s.interpolation]:Ir,u=this._getArrayFromAccessor(n);for(let d=0,f=l.length;d<f;d++){const g=new c(l[d]+"."+yi[r.path],t.array,u,h);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=oc(t.constructor),s=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const s=this instanceof Hs?uy:Wd;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function yy(i,e,t){const n=e.attributes,s=new Gn;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(s.set(new b(l[0],l[1],l[2]),new b(c[0],c[1],c[2])),a.normalized){const h=oc(Ls[a.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const a=new b,l=new b;for(let c=0,h=r.length;c<h;c++){const u=r[c];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){const _=oc(Ls[d.componentType]);l.multiplyScalar(_)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}i.boundingBox=s;const o=new Wn;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=o}function Au(i,e,t){const n=e.attributes,s=[];function r(o,a){return t.getDependency("accessor",o).then(function(l){i.setAttribute(a,l)})}for(const o in n){const a=rc[o]||o.toLowerCase();a in i.attributes||s.push(r(n[o],a))}if(e.indices!==void 0&&!i.index){const o=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});s.push(o)}return Je.workingColorSpace!==jt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Je.workingColorSpace}" not supported.`),On(i,e),yy(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?py(i,e.targets,t):i})}const Ru={type:"change"},kc={type:"start"},Xd={type:"end"},wo=new Vr,Cu=new wi,My=Math.cos(70*ni.DEG2RAD),Ct=new b,tn=2*Math.PI,lt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},$a=1e-6;class Sy extends Bm{constructor(e,t=null){super(e,t),this.state=lt.NONE,this.target=new b,this.cursor=new b,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Cs.ROTATE,MIDDLE:Cs.DOLLY,RIGHT:Cs.PAN},this.touches={ONE:Ts.ROTATE,TWO:Ts.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new b,this._lastQuaternion=new Fe,this._lastTargetPosition=new b,this._quat=new Fe().setFromUnitVectors(e.up,new b(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new qh,this._sphericalDelta=new qh,this._scale=1,this._panOffset=new b,this._rotateStart=new de,this._rotateEnd=new de,this._rotateDelta=new de,this._panStart=new de,this._panEnd=new de,this._panDelta=new de,this._dollyStart=new de,this._dollyEnd=new de,this._dollyDelta=new de,this._dollyDirection=new b,this._mouse=new de,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=by.bind(this),this._onPointerDown=wy.bind(this),this._onPointerUp=Ey.bind(this),this._onContextMenu=Iy.bind(this),this._onMouseWheel=Ry.bind(this),this._onKeyDown=Cy.bind(this),this._onTouchStart=Py.bind(this),this._onTouchMove=Dy.bind(this),this._onMouseDown=Ty.bind(this),this._onMouseMove=Ay.bind(this),this._interceptControlDown=Ly.bind(this),this._interceptControlUp=Ny.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Ru),this.update(),this.state=lt.NONE}update(e=null){const t=this.object.position;Ct.copy(t).sub(this.target),Ct.applyQuaternion(this._quat),this._spherical.setFromVector3(Ct),this.autoRotate&&this.state===lt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=tn:n>Math.PI&&(n-=tn),s<-Math.PI?s+=tn:s>Math.PI&&(s-=tn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Ct.setFromSpherical(this._spherical),Ct.applyQuaternion(this._quatInverse),t.copy(this.target).add(Ct),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Ct.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const a=new b(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new b(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Ct.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(wo.origin.copy(this.object.position),wo.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(wo.direction))<My?this.object.lookAt(this.target):(Cu.setFromNormalAndCoplanarPoint(this.object.up,this.target),wo.intersectPlane(Cu,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>$a||8*(1-this._lastQuaternion.dot(this.object.quaternion))>$a||this._lastTargetPosition.distanceToSquared(this.target)>$a?(this.dispatchEvent(Ru),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?tn/60*this.autoRotateSpeed*e:tn/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Ct.setFromMatrixColumn(t,0),Ct.multiplyScalar(-e),this._panOffset.add(Ct)}_panUp(e,t){this.screenSpacePanning===!0?Ct.setFromMatrixColumn(t,1):(Ct.setFromMatrixColumn(t,0),Ct.crossVectors(this.object.up,Ct)),Ct.multiplyScalar(e),this._panOffset.add(Ct)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Ct.copy(s).sub(this.target);let r=Ct.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(tn*this._rotateDelta.x/t.clientHeight),this._rotateUp(tn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(tn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-tn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(tn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-tn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(tn*this._rotateDelta.x/t.clientHeight),this._rotateUp(tn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new de,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function wy(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function by(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Ey(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Xd),this.state=lt.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Ty(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Cs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=lt.DOLLY;break;case Cs.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=lt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=lt.ROTATE}break;case Cs.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=lt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=lt.PAN}break;default:this.state=lt.NONE}this.state!==lt.NONE&&this.dispatchEvent(kc)}function Ay(i){switch(this.state){case lt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case lt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case lt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Ry(i){this.enabled===!1||this.enableZoom===!1||this.state!==lt.NONE||(i.preventDefault(),this.dispatchEvent(kc),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Xd))}function Cy(i){this.enabled!==!1&&this._handleKeyDown(i)}function Py(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Ts.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=lt.TOUCH_ROTATE;break;case Ts.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=lt.TOUCH_PAN;break;default:this.state=lt.NONE}break;case 2:switch(this.touches.TWO){case Ts.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=lt.TOUCH_DOLLY_PAN;break;case Ts.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=lt.TOUCH_DOLLY_ROTATE;break;default:this.state=lt.NONE}break;default:this.state=lt.NONE}this.state!==lt.NONE&&this.dispatchEvent(kc)}function Dy(i){switch(this._trackPointer(i),this.state){case lt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case lt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case lt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case lt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=lt.NONE}}function Iy(i){this.enabled!==!1&&i.preventDefault()}function Ly(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Ny(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class Uy extends md{constructor(){super();const e=new Ni;e.deleteAttribute("uv");const t=new hi({side:Xt}),n=new hi,s=new Pd(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new qe(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const o=new vd(e,n,6),a=new ht;a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),a.updateMatrix(),o.setMatrixAt(0,a.matrix),a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),a.updateMatrix(),o.setMatrixAt(1,a.matrix),a.position.set(6.167,.857,7.803),a.rotation.set(0,.561,0),a.scale.set(3.927,6.285,3.687),a.updateMatrix(),o.setMatrixAt(2,a.matrix),a.position.set(-2.017,.018,6.124),a.rotation.set(0,.333,0),a.scale.set(2.002,4.566,2.064),a.updateMatrix(),o.setMatrixAt(3,a.matrix),a.position.set(2.291,-.756,-2.621),a.rotation.set(0,-.286,0),a.scale.set(1.546,1.552,1.496),a.updateMatrix(),o.setMatrixAt(4,a.matrix),a.position.set(-2.193,-.369,-5.547),a.rotation.set(0,.516,0),a.scale.set(3.875,3.487,2.986),a.updateMatrix(),o.setMatrixAt(5,a.matrix),this.add(o);const l=new qe(e,Ms(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);const c=new qe(e,Ms(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);const h=new qe(e,Ms(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);const u=new qe(e,Ms(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);const d=new qe(e,Ms(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);const f=new qe(e,Ms(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function Ms(i){return new am({color:0,emissive:16777215,emissiveIntensity:i})}const lr=new b;function gn(i,e,t,n,s,r){const o=2*Math.PI*s/4,a=Math.max(r-2*s,0),l=Math.PI/4;lr.copy(e),lr[n]=0,lr.normalize();const c=.5*o/(o+a),h=1-lr.angleTo(i)/l;return Math.sign(lr[t])===1?h*c:a/(o+a)+c+c*(1-h)}class un extends Ni{constructor(e=1,t=1,n=1,s=2,r=.1){const o=s*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,o,o,o),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:s,radius:r},o===1)return;const a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;const l=new b,c=new b,h=new b(e,t,n).divideScalar(2).subScalar(r),u=this.attributes.position.array,d=this.attributes.normal.array,f=this.attributes.uv.array,g=u.length/6,_=new b,m=.5/o;for(let p=0,S=0;p<u.length;p+=3,S+=2)switch(l.fromArray(u,p),c.copy(l),c.x-=Math.sign(c.x)*m,c.y-=Math.sign(c.y)*m,c.z-=Math.sign(c.z)*m,c.normalize(),u[p+0]=h.x*Math.sign(l.x)+c.x*r,u[p+1]=h.y*Math.sign(l.y)+c.y*r,u[p+2]=h.z*Math.sign(l.z)+c.z*r,d[p+0]=c.x,d[p+1]=c.y,d[p+2]=c.z,Math.floor(p/g)){case 0:_.set(1,0,0),f[S+0]=gn(_,c,"z","y",r,n),f[S+1]=1-gn(_,c,"y","z",r,t);break;case 1:_.set(-1,0,0),f[S+0]=1-gn(_,c,"z","y",r,n),f[S+1]=1-gn(_,c,"y","z",r,t);break;case 2:_.set(0,1,0),f[S+0]=1-gn(_,c,"x","z",r,e),f[S+1]=gn(_,c,"z","x",r,n);break;case 3:_.set(0,-1,0),f[S+0]=1-gn(_,c,"x","z",r,e),f[S+1]=1-gn(_,c,"z","x",r,n);break;case 4:_.set(0,0,1),f[S+0]=1-gn(_,c,"x","y",r,e),f[S+1]=1-gn(_,c,"y","x",r,t);break;case 5:_.set(0,0,-1),f[S+0]=gn(_,c,"x","y",r,e),f[S+1]=1-gn(_,c,"y","x",r,t);break}}static fromJSON(e){return new un(e.width,e.height,e.depth,e.segments,e.radius)}}const Za="./",Ns=new b(0,0,1),Di=ni.clamp,St=Object.freeze({left:Object.freeze([.085,-.026,0]),right:Object.freeze([.085,.026,0]),proximalShaftZ:-.095,lateralBallOffset:.06,clevisDepth:.075,clevisRadius:.0035}),nn=(i,e=.65,t=.35)=>new hi({color:i,metalness:e,roughness:t});function dt(i,e,t,n=[0,0,0]){const s=new qe(e,t);return s.position.set(...n),s.castShadow=s.receiveShadow=!0,s.layers.set(0),i.add(s),s}function Fy(i,e){const t=new Ke;t.name="Concept_Custom_Quick_Change_Instrument_Coupler",i.add(t);const n=nn("#a8b4b5",.78,.3),s=nn("#1b2529",.18,.5);dt(t,new un(.034,.039,.051,2,.004),s,[0,0,-.022]);const r=dt(t,new Bt(.012,.013,.029,24),n,[0,0,.013]);r.rotation.x=Math.PI/2;for(const o of[-.045,.027])dt(t,new wn(.013,.0017,8,28),n,[0,0,o]);dt(t,new wn(.0134,.0012,8,28),nn(e,.22,.42),[0,0,.021]);for(const o of[-.012,.012])for(const a of[-.015,.015]){const l=dt(t,new Bt(.0017,.0017,.002,8),n,[o,a,-.048]);l.rotation.x=Math.PI/2}return t}function Oy(i,e,t){const n=new Ke;n.name=`Concept_${e}_Proximal_Shaft_Clamp`,n.position.z=St.proximalShaftZ,i.add(n);const s=nn("#b2c0c3",.76,.28),r=nn("#26373a",.15,.54),o=dt(n,new un(.021,.025,.029,2,.003),r);o.name="Custom_Shaft_Clamp_Housing";for(const u of[-.012,.012])dt(n,new wn(.0071,.0017,8,24),s,[0,0,u]);const a=e==="left"?-1:1,l=new Ke;l.name="Custom_Fixed_Size_Palm_Clearance_Clevis",n.add(l);for(const u of[0,a*St.lateralBallOffset])dt(l,new Bt(St.clevisRadius,St.clevisRadius,St.clevisDepth,12),s,[u,St.clevisDepth*.5,0]);const c=dt(l,new Bt(St.clevisRadius,St.clevisRadius,St.lateralBallOffset,12),s,[a*St.lateralBallOffset*.5,St.clevisDepth,0]);c.rotation.z=Math.PI/2;for(const u of[0,a*St.lateralBallOffset])dt(l,new ci(St.clevisRadius,12,8),s,[u,St.clevisDepth,0]);const h=dt(n,new ci(.008,18,12),s,[a*St.lateralBallOffset,0,0]);return h.name="Custom_Passive_Universal_Grip_Ball",dt(n,new wn(.0073,.0012,6,20),nn(t,.2,.43),[0,0,-.014]),n}function ky(i,e){i.updateWorldMatrix(!0,!0);const t=i.matrixWorld.clone().invert(),n=new Ue,s=new b,r=new Map;return i.traverse(o=>{if(!o.isMesh)return;n.multiplyMatrices(t,o.matrixWorld);const a=o.geometry.attributes.position;for(let l=0;l<a.count;l++){s.fromBufferAttribute(a,l).applyMatrix4(n);const c=`${Math.floor(s.x/.008)},${Math.floor(s.y/.008)},${Math.floor(s.z/.008)}`;r.has(c)||r.set(c,[s.x-e[0],s.y-e[1],s.z-e[2]])}}),new Float64Array([...r.values()].flat())}function Pu(i,e,t){const n=Math.cos(e),s=Math.sin(e),r=St.clevisDepth;let o=1/0;for(let a=0;a<i.length;a+=3){const l=i[a],c=i[a+2]-St.proximalShaftZ,h=i[a+1]*n+c*s,u=-i[a+1]*s+c*n,d=Math.max(0,-h,h-r),f=Math.max(Math.min(0,t)-l,0,l-Math.max(0,t));o=Math.min(o,l*l+d*d+u*u,(l-t)**2+d*d+u*u,f*f+(h-r)**2+u*u)}return Math.sqrt(o)}function By(i,e,t){const n=new Ke;n.name=`Concept_${e}_Strapped_Palm_Grip`,i.add(n);const s=e==="left"?-1:1,r=nn("#1f3032",.12,.62),o=nn("#afbdc0",.72,.3),a=dt(n,new Bt(.0105,.0105,.061,20),r);a.rotation.x=Math.PI/2,a.name="Custom_Palm_Transverse_Grip_Bar";for(const l of[-.03,.03])dt(n,new ci(.0107,12,8),r,[0,0,l]);dt(n,new un(.049,.008,.061,2,.004),o,[-.03,-s*.008,0]);for(const l of[-.052,-.015]){dt(n,new un(.009,.004,.066,2,.0015),r,[l,-s*.011,0]),dt(n,new un(.009,.004,.066,2,.0015),r,[l,-s*.044,0]);for(const c of[-.031,.031])dt(n,new un(.009,.037,.004,2,.0015),r,[l,-s*.0275,c])}return dt(n,new wn(.0085,.0016,8,24),nn(t,.25,.4)),n}async function bo(i,e){const[t,n]=await Promise.all([fetch(`${Za}assets/${e}.glb`),fetch(`${Za}assets/${e}-kinematics.json`)]);if(!t.ok||!n.ok)throw new Error(`无法载入真实模型：${e}`);const[s,r]=await Promise.all([t.arrayBuffer(),n.json()]),o=await i.parseAsync(s,`${Za}assets/`),a=new Ke;a.name=`Authentic_${e}`,a.add(o.scene),a.traverse(c=>{c.isMesh&&(c.castShadow=!0,c.receiveShadow=!0,e==="endoscope"||e==="z1"?c.layers.set(0):c.layers.enable(1),e!=="z1"&&(c.material.roughness=.32,c.material.metalness=.78))});const l=new Map;for(const c of r.joints){const h=a.getObjectByName(c.name);h&&l.set(c.name,{node:h,specification:c,rest:h.quaternion.clone(),axis:new b(...c.axis),angle:0})}return{name:e,group:a,joints:l,metadata:r}}const zy=new Fe;function An(i,e,t,n=!1){const s=i.joints.get(e);if(!s||s.specification.type==="fixed")return;const r=s.specification.limit;if(!Number.isFinite(t))return;s.angle=n?t:Di(t,r?.lower??-Math.PI,r?.upper??Math.PI);const o=i.frameBounds?.get(e);o&&(s.angle=Di(s.angle,o.lower,o.upper));const a=Math.atan2(Math.sin(s.angle),Math.cos(s.angle));s.node.quaternion.copy(s.rest).multiply(zy.setFromAxisAngle(s.axis,a))}class Du{constructor(e){Object.assign(this,e),this.tipNode=this.group.getObjectByName("tool_tip_link"),this.tipPosition=new b,this.cuttingDirection=new b(0,0,1),this.tipQuaternion=new Fe,this.handlePosition=new b,this.gripPosition=new b,this.gripLocal=new b(e.name==="needle-driver"?-St.lateralBallOffset:St.lateralBallOffset,0,St.proximalShaftZ),this.shaftDirection=new b,this.rcmError=0,this.localTip=new b,this.desired=new b,this.port=new b,this.delta=new b,this.localFromPort=new b,this.alignment=new Fe,this.compensation=new Fe,this.inverseRoot=new Ue,this.scratch=new b,this.previousDirection=new b(0,0,-1),this.transport=new Fe,this.nextAlignment=new Fe,this.initialized=!1,this.rcmFeasible=!0,this.coupler=Fy(this.group,e.name==="needle-driver"?"#5faaa9":"#c3a46b"),this.proximalGrip=Oy(this.group,e.name==="needle-driver"?"left":"right",e.name==="needle-driver"?"#5faaa9":"#c3a46b")}update(e){An(this,"roll",e.wrist[2],!0),An(this,"wrist_pitch",e.wrist[0],!0),An(this,"wrist_yaw",e.wrist[1],!0);const t=Di(e.jaw,0,1)*1.1;An(this,"jaw",t),An(this,"jaw_1",t*.5),An(this,"jaw_2",-t*.5);const n=ui(e);this.localTip.fromArray(n.localTip),this.desired.fromArray(e.position),this.port.fromArray(e.port),this.alignment.fromArray(n.alignment),this.previousDirection.copy(Ns).applyQuaternion(this.alignment),this.group.quaternion.fromArray(n.quaternion),this.group.position.fromArray(n.position),this.rcmFeasible=n.rcmFeasible,this.initialized=!0,this.group.updateWorldMatrix(!0,!0),this.tipNode.getWorldPosition(this.tipPosition),this.tipNode.getWorldQuaternion(this.tipQuaternion),this.cuttingDirection.copy(Ns).applyQuaternion(this.tipQuaternion).normalize(),this.handlePosition.copy(this.group.position),this.gripPosition.copy(this.gripLocal).applyQuaternion(this.group.quaternion).add(this.group.position),this.shaftDirection.copy(Ns).applyQuaternion(this.group.quaternion),this.scratch.subVectors(this.port,this.group.position),this.scratch.addScaledVector(this.shaftDirection,-this.scratch.dot(this.shaftDirection)),this.rcmError=this.scratch.length()}}class Vy{constructor(e){Object.assign(this,e),this.tipNode=this.group.getObjectByName("tip_link"),this.tipPosition=new b,this.handlePosition=new b,this.desired=new b,this.direction=new b,this.previousDirection=new b(0,-1,0),this.transport=new Fe,this.alignment=new Fe,this.initialized=!1,this.supportPosition=new b,this.offset=new b(...e.metadata.tipPositionAtZero),this.scratch=new b,this.roll=new Fe}update(e){this.desired.fromArray(e.position),this.direction.fromArray(e.port).sub(this.desired).negate(),this.direction.lengthSq()<1e-12?this.direction.copy(this.previousDirection):this.direction.normalize(),this.initialized?this.alignment.premultiply(this.transport.setFromUnitVectors(this.previousDirection,this.direction)):this.alignment.setFromUnitVectors(Ns,this.direction),this.previousDirection.copy(this.direction),this.initialized=!0,this.group.quaternion.copy(this.alignment).multiply(this.roll.setFromAxisAngle(Ns,e.roll)),this.group.position.copy(this.desired).sub(this.scratch.copy(this.offset).applyQuaternion(this.group.quaternion)),this.group.updateWorldMatrix(!0,!0),this.tipNode.getWorldPosition(this.tipPosition),this.handlePosition.copy(this.group.position),this.supportPosition.fromArray(e.port).addScaledVector(this.direction,-.1)}}class Hy{constructor(e,t){Object.assign(this,e),this.mount=new Ke,this.mount.name="Custom_G1_Chest_Adapter",this.mount.position.set(0,1.17,.47),this.mount.rotation.x=-Math.PI/2,this.mount.add(this.group),t.add(this.mount);const n=nn("#8f9ea1",.78,.32),s=nn("#263336",.2,.56);dt(this.mount,new un(.14,.014,.12,2,.005),s,[0,-.09,0]).name="Custom_Chest_Backplate",dt(this.mount,new un(.105,.012,.085,2,.004),n).name="Custom_Z1_Baseplate";for(const o of[-.047,.047])for(const a of[-.034,.034])dt(this.mount,new Bt(.006,.006,.086,12),n,[o,-.047,a]),dt(this.mount,new Bt(.004,.004,.004,8),s,[o,.008,a]);const r=dt(this.mount,new wn(.034,.003,8,32),s,[0,.008,0]);r.rotation.x=Math.PI/2,this.end=new ht,this.end.name="Custom_Endoscope_Coupler_TCP",this.end.position.set(.027,0,0),this.group.getObjectByName("link06").add(this.end),this.chain=[...this.joints.values()].filter(o=>o.specification.type==="revolute"),this.position=new b,this.pivot=new b,this.axis=new b,this.toEnd=new b,this.toTarget=new b,this.cross=new b,this.quaternion=new Fe,this.lastTarget=new b(1/0,1/0,1/0),this.accumulated=0,this.initialized=!1,this.error=0,this.stallTime=0,this.recoveryCooldown=0,this.recoveryPose=null,this.recoveries=0,this.baseInverse=new Ue,this.baseTarget=new b,this.frameBounds=null,[0,1.4,-1.8,.35,0,0].forEach((o,a)=>An(this,`joint${a+1}`,o))}solve(e,t,n=.18){for(let s=0;s<t;s++){for(let r=this.chain.length-1;r>=0;r--){const o=this.chain[r];if(this.mount.updateWorldMatrix(!0,!0),o.node.getWorldPosition(this.pivot),this.end.getWorldPosition(this.position),o.node.getWorldQuaternion(this.quaternion),this.axis.copy(o.axis).applyQuaternion(this.quaternion).normalize(),this.toEnd.subVectors(this.position,this.pivot),this.toTarget.subVectors(e,this.pivot),this.toEnd.addScaledVector(this.axis,-this.toEnd.dot(this.axis)),this.toTarget.addScaledVector(this.axis,-this.toTarget.dot(this.axis)),this.toEnd.lengthSq()<1e-12||this.toTarget.lengthSq()<1e-12)continue;this.toEnd.normalize(),this.toTarget.normalize(),this.cross.crossVectors(this.toEnd,this.toTarget);const a=Math.atan2(this.axis.dot(this.cross),Di(this.toEnd.dot(this.toTarget),-1,1));An(this,o.specification.name,o.angle+Di(a,-n,n))}if(this.mount.updateWorldMatrix(!0,!0),this.end.getWorldPosition(this.position),this.position.distanceToSquared(e)<1e-8)break}this.end.getWorldPosition(this.position),this.error=this.position.distanceTo(e)}recover(e){const t=this.chain.map(l=>l.angle),n=this.frameBounds;this.frameBounds=null,this.mount.updateWorldMatrix(!0,!0),this.baseInverse.copy(this.group.getObjectByName("link00").matrixWorld).invert(),this.baseTarget.copy(e).applyMatrix4(this.baseInverse);let s=Math.atan2(-this.baseTarget.y,-this.baseTarget.x);s=Math.atan2(Math.sin(s),Math.cos(s));const r=[[s,.35,-1.3,0,0,0],[s,1.4,-2,.3,0,0],[s,2.6,-2,-.8,0,0],[s,1,-.5,-.8,.7,0],[s,.04,-.65,1.45,0,0],[s,.15,-1.25,1.45,-.6,0]];let o=this.error,a=null;for(const l of r)if(l.forEach((c,h)=>An(this,`joint${h+1}`,c)),this.solve(e,36,.3),this.error<o&&(o=this.error,a=this.chain.map(c=>c.angle)),o<2e-4)break;t.forEach((l,c)=>An(this,this.chain[c].specification.name,l)),this.frameBounds=n,this.mount.updateWorldMatrix(!0,!0),this.end.getWorldPosition(this.position),this.error=this.position.distanceTo(e),a&&o<this.error*.65&&(this.recoveryPose=a,this.recoveries++),this.recoveryCooldown=.65,this.stallTime=0}update(e,t){const n=Math.min(.1,Math.max(0,t||0));if(this.accumulated+=n,this.recoveryCooldown=Math.max(0,this.recoveryCooldown-n),!this.initialized)this.solve(e,80,.25),this.initialized=!0,this.accumulated=0,this.error>.003&&this.recover(e);else if(this.accumulated>=1/30){const s=this.accumulated;if(this.accumulated=0,this.frameBounds=new Map(this.chain.map(r=>{const o=(r.specification.limit?.velocity??Math.PI)*s;return[r.specification.name,{lower:r.angle-o,upper:r.angle+o}]})),this.recoveryPose){let r=0;for(let o=0;o<this.chain.length;o++){const a=this.chain[o],l=this.recoveryPose[o]-a.angle;r+=Math.abs(l),An(this,a.specification.name,a.angle+Di(l,-2.4*s,2.4*s))}r<.025&&(this.recoveryPose=null)}this.recoveryPose?(this.mount.updateWorldMatrix(!0,!0),this.end.getWorldPosition(this.position),this.error=this.position.distanceTo(e)):this.solve(e,4),this.error<.002?(this.stallTime=0,this.recoveryPose=null):(this.stallTime+=s,!this.recoveryPose&&this.stallTime>.18&&this.recoveryCooldown===0&&this.recover(e)),this.frameBounds=null}this.lastTarget.copy(e)}}async function Gy(i){const e=new Oo,[t,n,s,r]=await Promise.all([bo(e,"needle-driver"),bo(e,"scissors"),bo(e,"endoscope"),bo(e,"z1")]),o={left:new Du(t),right:new Du(n)},a=new Vy(s),l=new Hy(r,i);i.add(o.left.group,o.right.group,a.group);const c=new Ke;c.name="Concept_Virtual_Master_Slave_Connections",i.add(c);const h={};for(const[_,m]of[["left","#5eaaa9"],["right","#b9a06f"]]){const p=new Lt;p.setAttribute("position",new ct(new Float32Array(6),3));const S=new Qo(p,new hm({color:m,transparent:!0,opacity:.6,dashSize:.012,gapSize:.009,depthWrite:!1}));S.name=`Concept_${_}_Virtual_Teleoperation_Link`,S.layers.set(0);const y=dt(c,new wn(.014,.0024,8,24),nn(m,.28,.4));y.name=`Concept_${_}_Master_Grip_Indicator`,S.visible=y.visible=!1,c.add(S);const M=By(c,_,m);M.visible=!1,h[_]={line:S,controller:y,saddle:M,clevis:o[_].proximalGrip.getObjectByName("Custom_Fixed_Size_Palm_Clearance_Clevis"),sourceHand:null,cloud:null,transformed:null,inverse:new Fe,relative:new Fe,point:new b,origin:new b,initialized:!1}}const u=new Ke;u.name="Custom_Universal_Endoscope_Shaft_Clamp",i.add(u),dt(u,new wn(.0065,.002,8,28),nn("#879b9d",.78,.3)),dt(u,new un(.014,.011,.016,2,.002),nn("#28373a",.2,.52),[.011,0,0]);let d=!1,f=1/60;const g={loaded:!0,toolNames:Object.freeze({left:"持针钳",right:"单极弯剪"}),tools:o,scope:a,scopeArm:l,scopeMount:l.mount,scopeArmError:0,scopeHandlePosition:a.handlePosition,scopeSupportPosition:a.supportPosition,toolTipPositions:{left:o.left.tipPosition,right:o.right.tipPosition},toolDirections:{left:o.left.cuttingDirection,right:o.right.cuttingDirection},toolHandlePositions:{left:o.left.handlePosition,right:o.right.handlePosition},toolGripPositions:{left:o.left.gripPosition,right:o.right.gripPosition},handGripPositions:{left:new b,right:new b},handGripQuaternions:{left:new Fe,right:new Fe},toolRCMErrors:{left:0,right:0},toolRCMFeasible:{left:!0,right:!0},connectionModes:{left:"direct",right:"direct"},conceptDecoupled:!1,resetPose(){o.left.initialized=o.right.initialized=a.initialized=!1,l.initialized=!1,l.recoveryPose=null,l.accumulated=0,l.frameBounds=null,l.stallTime=0,l.recoveryCooldown=0;for(const _ of Object.values(h))_.initialized=!1},connectHands(_,m,p){g.conceptDecoupled=!1;for(const S of["left","right"]){const y=h[S],M=_[S],C=(m[S]??0)>.003;if(g.connectionModes[S]=C?"virtual":"direct",g.conceptDecoupled||=C,y.line.visible=y.controller.visible=C,!M)continue;const P=o[S].gripPosition,R=y.line.geometry.attributes.position;R.setXYZ(0,M.x,M.y,M.z),R.setXYZ(1,P.x,P.y,P.z),R.needsUpdate=!0,y.line.computeLineDistances(),y.line.geometry.computeBoundingSphere(),y.controller.position.copy(M);const T=p?.[S]??o[S].group.quaternion;if(y.controller.quaternion.copy(T),y.saddle.visible=!0,y.saddle.position.copy(M),y.saddle.quaternion.copy(T),g.handGripPositions[S].copy(M),g.handGripQuaternions[S].copy(T),y.sourceHand??=i.getObjectByName(`${S}_rubber_hand`),y.sourceHand&&!y.cloud&&(y.cloud=ky(y.sourceHand,St[S]),y.transformed=new Float64Array(y.cloud.length)),y.cloud){y.inverse.copy(o[S].group.quaternion).invert(),y.relative.copy(y.inverse).multiply(T),y.origin.copy(M).sub(o[S].group.position).applyQuaternion(y.inverse);for(let L=0;L<y.cloud.length;L+=3)y.point.fromArray(y.cloud,L).applyQuaternion(y.relative).add(y.origin),y.point.toArray(y.transformed,L);const v=y.clevis.rotation.x,x=o[S].gripLocal.x;let A=v,D=Pu(y.transformed,v,x);if(D<.01)for(let L=1;L<=128;L++){const k=v+Math.ceil(L/2)*(L%2?1:-1)*Math.PI/64,O=Pu(y.transformed,k,x);if(O>D&&(D=O,A=k),O>=.01)break}const U=Math.atan2(Math.sin(A-v),Math.cos(A-v));y.clevis.rotation.x=y.initialized?v+Di(U,-4.8*f,4.8*f):A,y.initialized=!0}}},update(_,m=1/60){if(!d){f=Di(Number.isFinite(m)?m:1/60,.001,.05);for(const p of["left","right"])o[p].update(_.tools[p]),g.toolRCMErrors[p]=o[p].rcmError,g.toolRCMFeasible[p]=o[p].rcmFeasible;a.update(_.scope),l.update(a.supportPosition,m),g.scopeArmError=l.error,u.position.copy(a.supportPosition),u.quaternion.setFromUnitVectors(Ns,a.direction)}},dispose(){if(d)return;d=!0;const _=new Set,m=new Set;for(const p of[o.left.group,o.right.group,a.group,l.mount,c,u])p.removeFromParent(),p.traverse(S=>{if(S.geometry&&_.add(S.geometry),S.material)for(const y of Array.isArray(S.material)?S.material:[S.material])m.add(y)});_.forEach(p=>p.dispose()),m.forEach(p=>p.dispose())}};return g}const cr={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`},Wy=new ta(-1,1,1,-1,0,1);class Xy extends Lt{constructor(){super(),this.setAttribute("position",new pt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new pt([0,2,0,0,2,0],2))}}const jy=new Xy;class qy{constructor(e){this._mesh=new qe(jy,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Wy)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Ky{constructor(e,t=1.1){const n=e.extensions?.has("EXT_color_buffer_float")??!1;this.target=new Ii(1,1,{type:n?js:Ln,minFilter:Jt,magFilter:Jt,depthBuffer:!0}),this.target.texture.colorSpace=jt,this.target.texture.name="Linear_Real_Time_Endoscope_Feed";const s=ql.clone(cr.uniforms);s.tDiffuse.value=this.target.texture,s.toneMappingExposure.value=t,this.outputMaterial=new Vh({...cr,uniforms:s,defines:{ACES_FILMIC_TONE_MAPPING:"",SRGB_TRANSFER:""},depthTest:!1,depthWrite:!1,toneMapped:!1});const r=ql.clone(cr.uniforms);r.tDiffuse.value=this.target.texture,r.toneMappingExposure.value=t,r.feedAspect={value:1},r.screenAspect={value:1.6},this.monitorMaterial=new Vh({...cr,uniforms:r,defines:{ACES_FILMIC_TONE_MAPPING:"",SRGB_TRANSFER:""},toneMapped:!1,fragmentShader:cr.fragmentShader.replace("varying vec2 vUv;",`varying vec2 vUv;
uniform float feedAspect;
uniform float screenAspect;`).replace("gl_FragColor = texture2D( tDiffuse, vUv );",`vec2 feedUV=vUv;
float fit=screenAspect/feedAspect;
if(fit>1.0)feedUV.x=(feedUV.x-.5)*fit+.5;else feedUV.y=(feedUV.y-.5)/fit+.5;
if(any(lessThan(feedUV,vec2(0.0)))||any(greaterThan(feedUV,vec2(1.0)))){gl_FragColor=vec4(.008,.012,.016,1.0);return;}
gl_FragColor = texture2D( tDiffuse, feedUV );`)}),this.quad=new qy(this.outputMaterial),this.resolution={width:1,height:1},this.disposed=!1}capture(e,t,n,s,r){const o=e.getPixelRatio(),a=Math.max(1,Math.round(s*o)),l=Math.max(1,Math.round(r*o));(this.target.width!==a||this.target.height!==l)&&this.target.setSize(a,l),this.resolution={width:a,height:l},n.aspect=s/Math.max(1,r),n.updateProjectionMatrix(),this.monitorMaterial.uniforms.feedAspect.value=n.aspect;const c=e.getRenderTarget(),h=e.getScissorTest();try{e.setRenderTarget(this.target),e.setScissorTest(!1),e.clear(),e.render(t,n)}finally{e.setRenderTarget(c),e.setScissorTest(h)}}blit(e,t,n,s,r){const o=e.getViewport(new et),a=e.getScissor(new et),l=e.getScissorTest(),c=e.autoClear;try{e.autoClear=!1,e.setViewport(t,n,s,r),e.setScissorTest(!0),e.setScissor(t,n,s,r),this.quad.render(e)}finally{e.autoClear=c,e.setViewport(o),e.setScissor(a),e.setScissorTest(l)}}dispose(){this.disposed||(this.disposed=!0,this.target.dispose(),this.outputMaterial.dispose(),this.monitorMaterial.dispose(),this.quad.dispose())}}const Ft=(i,e=0,t=.6)=>new hi({color:i,metalness:e,roughness:t});function vt(i,e,t,n,s=.012){const r=new qe(new un(...e,2,Math.min(s,...e.map(o=>o*.4))),n);return r.position.set(...t),r.castShadow=r.receiveShadow=!0,i.add(r),r}function Mi(i,e,t,n,s){const r=new b(...e),o=new b(...t),a=o.clone().sub(r),l=new qe(new Bt(n,n,a.length(),12),s);return l.position.copy(r).add(o).multiplyScalar(.5),l.quaternion.setFromUnitVectors(new b(0,1,0),a.normalize()),l.castShadow=l.receiveShadow=!0,i.add(l),l}function Iu(i,e,t,n,s="#405a61"){const r=document.createElement("canvas");r.width=768,r.height=128;const o=r.getContext("2d");o.fillStyle="#dce6e5",o.fillRect(0,0,768,128),o.fillStyle=s,o.font="500 40px sans-serif",o.textAlign="center",o.fillText(e,384,80);const a=new yd(r);a.colorSpace=Rt;const l=new qe(new Li(...t),new hn({map:a}));return l.position.set(...n),i.add(l),l}function Yy(i,e){const t=new Ke;t.name="Surgical_Theatre",i.add(t);const n=Ft("#dbe5e4",.08,.54),s=Ft("#cbdcdb",.02,.9),r=Ft("#8aa8a8",.25,.5),o=Ft("#adbfc2",.8,.28),a=Ft("#344b54",.3,.44),l=Ft("#23343a",.05,.8),c=Ft("#4e8e93",0,.94),h=Ft("#96b5b2",.03,.81),u=new qe(new Li(7,7),h);u.rotation.x=-Math.PI/2,u.receiveShadow=!0,t.add(u),vt(t,[4.8,2.65,.08],[0,1.325,1.75],s),vt(t,[.08,2.65,3.4],[2.4,1.325,.1],Ft("#d9e3e1",0,.9)),vt(t,[4.8,.11,.055],[0,.055,1.69],r);for(const R of[-2,-1.2,-.4,.4,1.2,2])vt(t,[.003,2.42,.006],[R,1.35,1.704],Ft("#b7cecb",.1,.8),.001);const d=new Ke;d.name="Adjustable_Operating_Table",t.add(d),vt(d,[.62,.065,1.4],[0,.875,-.41],o,.025),vt(d,[.59,.05,1.38],[0,.934,-.4],Ft("#3c5d63",0,.73),.025),vt(d,[.27,.66,.39],[0,.43,-.12],n,.025),vt(d,[.7,.06,.7],[0,.07,-.12],a,.025);for(const R of[-.29,.29])for(const T of[-.38,.14]){const v=new qe(new Bt(.045,.045,.027,18),l);v.position.set(R,.045,T),v.rotation.z=Math.PI/2,d.add(v)}for(const R of[-.33,.33])Mi(d,[R,.85,-.93],[R,.85,.22],.009,o);const f=vt(d,[.26,.055,.23],[0,.985,-.49],Ft("#d7e7e4",0,.96),.045);f.rotation.x=.05;const g=new Ke;g.name="G1_Stable_Mounting_Platform",t.add(g),vt(g,[.6,.29,.58],[0,.145,.51],Ft("#708b8d",.55,.44)),vt(g,[.59,.01,.57],[0,.295,.51],l,.008);for(const R of[-.285,.285])vt(g,[.006,.003,.54],[R,.302,.51],Ft("#c4b784",.3,.6),.001);const _=new Ke;_.name="Live_Endoscopic_Monitor",_.position.set(-.73,1.38,-.4),_.rotation.y=2.15,t.add(_),vt(_,[.35,.24,.027],[0,0,0],l,.012);const m=new qe(new Li(.32,.2),e);m.position.z=.0145,m.name="Same_Frame_Endoscopic_LCD",_.add(m);const p=new qe(new ci(.0025,8,6),new hn({color:"#69dda8"}));p.position.set(.145,-.108,.015),_.add(p),Mi(t,[-.73,.1,-.4],[-.73,1.27,-.4],.012,o),vt(t,[.35,.035,.29],[-.73,.09,-.4],a),Iu(_,"MIRA  |  LIVE ENDOSCOPE",[.25,.033],[0,-.103,.015],"#405b58");const S=new Ke;S.position.set(-1.57,0,1.45),S.name="Sealed_Clinical_Storage",t.add(S),vt(S,[.85,1.78,.42],[0,.92,0],n,.015);for(const R of[-.21,.21])vt(S,[.404,1.65,.018],[R,.95,-.22],Ft("#c9d9d7",.02,.58)),Mi(S,[R+(R>0?-.14:.14),.9,-.243],[R+(R>0?-.14:.14),1.14,-.243],.006,o);const y=new Ke;y.position.set(1.31,0,1.69),t.add(y),vt(y,[.98,2.2,.025],[0,1.12,0],r,.008),vt(y,[.9,2.1,.019],[0,1.13,-.023],Ft("#b7d1d0",.05,.58)),vt(y,[.32,.45,.013],[0,1.55,-.043],Ft("#537478",.2,.31)),Mi(y,[.34,.91,-.049],[.34,1.16,-.049],.008,o);const M=Iu(y,"OPERATING THEATRE  01",[.68,.11],[0,2.36,-.025]);M.rotation.y=Math.PI;const C=new Ke;C.position.set(-.95,0,.66),C.name="Sterile_Instrument_Trolley",t.add(C),vt(C,[.52,.035,.42],[0,.86,0],o),vt(C,[.48,.012,.38],[0,.884,0],c,.006),vt(C,[.45,.018,.35],[0,.31,0],o);for(const R of[-.21,.21])for(const T of[-.16,.16]){Mi(C,[R,.085,T],[R,.85,T],.01,o);const v=new qe(new Bt(.032,.032,.021,12),l);v.position.set(R,.055,T),v.rotation.z=Math.PI/2,C.add(v)}vt(C,[.28,.025,.19],[.025,.903,0],Ft("#b7c9ca",.75,.24),.025);const P=new hn({color:"#fffaf2"});for(const[R,T]of[-.48,.48].entries()){const v=new Ke;v.position.set(T,2.02+R*.1,-.07+R*.27),v.rotation.z=T<0?-.18:.18,t.add(v),Mi(t,[T,2.6,.4],[T,2.45,.4],.017,n),Mi(t,[T,2.45,.4],[T,2.36+R*.1,-.07+R*.27],.014,o),Mi(t,[T,2.36+R*.1,-.07+R*.27],[T,2.035+R*.1,-.07+R*.27],.012,o);const x=new qe(new Bt(.235,.26,.045,48),n);v.add(x);for(let D=0;D<7;D++){const U=(D-1)*Math.PI/3,L=D?.135:0,k=new qe(new Pc(.055,12),P);k.rotation.x=Math.PI/2,k.position.set(Math.cos(U)*L,-.025,Math.sin(U)*L),v.add(k)}const A=new qe(new Bt(.013,.017,.1,12),l);A.position.y=-.075,v.add(A)}for(const R of[-.8,.8])vt(t,[.52,.012,.72],[R,2.61,.7],new hn({color:"#edf5f2"}));return t.traverse(R=>R.layers.set(0)),{room:t,monitor:_,monitorScreen:m,platform:g}}const Ja=new b,ac=new b(0,1,0),Lu=new Fe,Eo="./",xn=(i,e=0,t=.5)=>new hi({color:i,metalness:e,roughness:t});xn("#c7d0d2",.95,.23);const $y=xn("#607178",.85,.3),Nu=xn("#142024",.25,.4);function ti(i,e,t){const n=new qe(i,e);return n.castShadow=!0,n.receiveShadow=!0,t?.add(n),n}function br(i,e,t,n,s=0){const r=ti(s?new un(...i,3,Math.min(s,...i.map(o=>o*.45))):new Ni(...i),t,n);return r.position.set(...e),r}function Xi(i,e,t,n){const s=ti(new ci(1,40,28),t,n);return s.scale.set(...i),s.position.set(...e),s}function Zy(i,e,t){Ja.subVectors(t,e);const n=Ja.length();i.position.copy(e).add(t).multiplyScalar(.5),i.quaternion.setFromUnitVectors(ac,Ja.normalize()),i.scale.set(1,Math.max(n,1e-5),1)}function Jy(){const i=document.createElement("canvas");i.width=i.height=256;const e=i.getContext("2d");let t=1234;const n=()=>(t=Math.imul(t,1664525)+1013904223|0,(t>>>0)/4294967296);e.fillStyle="#9a615b",e.fillRect(0,0,256,256);for(let r=0;r<7500;r++){const o=n(),a=n(),l=n()*2+.3;e.fillStyle=`rgba(${n()>.5?"225,164,135":"81,31,35"},${n()*.15})`,e.beginPath(),e.ellipse(o*256,a*256,l,l*.6,0,0,7),e.fill()}const s=new yd(i);return s.wrapS=s.wrapT=Ji,s.repeat.set(3,3),s.colorSpace=Rt,s}function Qy(i){const e=new Li(.78,.96,40,48),t=e.attributes.position;for(let o=0;o<t.count;o++){const a=t.getX(o),l=t.getY(o),c=Math.abs(a)/.39;t.setZ(o,-.075*c**4+.0028*Math.sin(31*a+7*l)*Math.sin(23*l)+.0015*Math.cos(57*a-19*l))}e.computeVertexNormals();const n=xn("#467e82",0,.97);n.side=cn,n.onBeforeCompile=o=>{o.vertexShader=`varying vec2 drapeLocal;
`+o.vertexShader,o.vertexShader=o.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
drapeLocal=position.xy;`),o.fragmentShader=`varying vec2 drapeLocal;
`+o.fragmentShader,o.fragmentShader=o.fragmentShader.replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
if(drapeLocal.y<-.30||(abs(drapeLocal.x)<.168&&abs(drapeLocal.y)<.198))discard;`)},n.customProgramCacheKey=()=>"cotton-operative-drape-window";const s=ti(e,n,i);s.name="Sterile_Fenestrated_Surgical_Drape",s.rotation.x=-Math.PI/2,s.position.set(0,1.14,0),s.layers.set(0);const r=xn("#79a5a3",0,.98);for(const o of[-.174,.174])br([.007,.001,.41],[o,1.142,0],r,i);for(const o of[-.204,.204])br([.35,.001,.007],[0,1.142,o],r,i);return s}class eM{constructor(e,t,n){this.stage=t,this.mini=n,this.mode="endo",this.disposed=!1,this.ready=!1,this.renderer=new Sx({canvas:e,antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!1}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.5)),this.renderer.setSize(t.clientWidth,t.clientHeight,!1),this.renderer.outputColorSpace=Rt,this.renderer.toneMapping=Ku,this.renderer.toneMappingExposure=1.15,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=qu,this.renderer.info.autoReset=!1,this.scopeFeed=new Ky(this.renderer,1.1),this.scene=new md,this.scene.background=new Ce("#a4b3b3");const s=new Zl(this.renderer);this.env=s.fromScene(new Uy,.04),this.scene.environment=this.env.texture,s.dispose(),this.overviewCamera=new Wt(42,1,.015,30),this.overviewCamera.position.set(1.68,2.02,-1.92),this.endoCamera=new Wt(55,1,.003,5),this.endoCamera.layers.set(1),this.controls=new Sy(this.overviewCamera,e),this.controls.target.set(0,1.2,.18),this.controls.enableDamping=!0,this.controls.minDistance=.3,this.controls.maxDistance=4,this.controls.maxPolarAngle=Math.PI*.49,this.controls.enabled=!1;const r=new Gh("#f4f7f6","#667572",1.35);this.scene.add(r);const o=new Gh("#fff9f3","#9c7670",.6);o.layers.set(1),this.scene.add(o);const a=new $l("#fff5e8",2.1);a.position.set(-1.6,3.2,-1.4),a.castShadow=!0,a.shadow.mapSize.set(1024,1024),a.shadow.camera.left=-1.6,a.shadow.camera.right=1.6,a.shadow.camera.top=1.6,a.shadow.camera.bottom=-1.6,a.shadow.normalBias=.0015,this.scene.add(a);const l=new $l("#dcebf0",.75);l.position.set(2.2,1.8,.7),this.scene.add(l),this.scopeLight=new Cd("#fffaf5",.14,.6,.72,.82,1),this.scopeLight.layers.set(1),this.scopeLight.target=new ht,this.scene.add(this.scopeLight,this.scopeLight.target),this._makeRoom(),this._makePatient(),this._makeTools(),this._makeScopeArm(),this.robot=new Ke,this.robot.position.set(0,1.0922729,.42),this.robot.rotation.y=Math.PI/2,this.scene.add(this.robot),this.joints=[],this.robotLoaded=!1,this.armTargets={left:new b,right:new b},this.armErrors={left:0,right:0},this.handPositions={left:new b,right:new b},this.conceptDecoupled=!1,this.kinematicLimited=!1,this.targetMarker=ti(new ci(.0011,12,8),new hn({color:"#9de3c6"}),this.scene),this.targetMarker.layers.set(1),this.targetMarker.visible=!1,this._makeCollisionMarkers(),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(t),this.lastMini=0}async loadRobot(){const e=new Oo,[t,n]=await Promise.all([e.loadAsync(Eo+"assets/g1.glb"),fetch(Eo+"assets/g1-kinematics.json")]),s=await n.json();this.robot.add(t.scene),this.robot.updateMatrixWorld(!0),t.scene.traverse(r=>{r.isMesh&&(r.castShadow=!0,r.receiveShadow=!0,r.geometry.attributes.normal||r.geometry.computeVertexNormals(),r.material&&(r.material.roughness=.38,r.material.metalness=.11,r.material.name==="dark"?(r.material.color.set("#141a1e"),r.material.roughness=.47,r.material.metalness=.08):r.material.name==="white"&&r.material.color.set("#d9dfde")))}),this.robotModel=t.scene,this.robotMetadata=s;for(const r of s.joints){const o=t.scene.getObjectByName(r.name);!o||r.type==="fixed"||(o.userData.rest=o.quaternion.clone(),o.userData.angle=0,o.userData.axis=new b(...r.axis),o.userData.limit=r.limit||r.limits||{lower:-Math.PI,upper:Math.PI},this.joints.push(o))}for(const r of["left","right"])this.setJoint(r+"_shoulder_pitch_joint",.8),this.setJoint(r+"_shoulder_roll_joint",r==="left"?.2:-.2),this.setJoint(r+"_elbow_joint",1.1);this.handMarkers={},this.handQuaternions={left:new Fe,right:new Fe};for(const r of["left","right"]){const o=t.scene.getObjectByName(r+"_rubber_hand");if(o){const a=new ht;a.name=r+"_Measured_Palm_Grip_Frame",a.position.fromArray(St[r]),o.add(a),this.handMarkers[r]=a}}return this.robotLoaded=!0,s}async loadAnatomy(){this.assemblies=await Gy(this.scene),this.assemblies.scopeMount.position.set(this.robot.position.x,this.robot.position.y+.2377271,this.robot.position.z-.17),this.assemblies.scopeMount.quaternion.premultiply(Lu.setFromAxisAngle(new b(0,0,1),Math.PI)),Object.values(this.tools).forEach(n=>n.group.visible=!1),this.scopeShaft.visible=!1,this.scopeHead.visible=!1,this.scopeLens.visible=!1,this.scopeArm.visible=!1;const e=await new Oo().loadAsync(Eo+"assets/patient-skin.glb");e.scene.rotation.x=-Math.PI/2,e.scene.position.set(0,1.035,0),e.scene.traverse(n=>{n.isMesh&&(n.geometry.attributes.normal||n.geometry.computeVertexNormals(),n.material=new hi({color:"#bfa08a",roughness:.65,metalness:0,side:cn}),n.material.onBeforeCompile=s=>{s.vertexShader=`varying vec3 patientLocal;
`+s.vertexShader,s.vertexShader=s.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
patientLocal=position;`),s.fragmentShader=`varying vec3 patientLocal;
`+s.fragmentShader,s.fragmentShader=s.fragmentShader.replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
if(abs(patientLocal.x)<.17&&abs(patientLocal.y)<.20&&patientLocal.z>0.0)discard;
if(patientLocal.y<-.30)discard;`)},n.material.customProgramCacheKey=()=>"anatomy-teaching-window",n.castShadow=!0,n.receiveShadow=!0,n.layers.set(0))}),this.scene.add(e.scene),this.patientOuter.children[0].visible=!1,this.patientOuter.children[3].visible=!1,this.patientOuter.children[4].visible=!1,this.patientOuter.children[1].visible=!1,this.patientOuter.children[2].visible=!1,this.patientOuter.children[5].visible=!1,this.patientOuter.children[6].visible=!1,this.patientOuter.children[7].visible=!1,this.drape=Qy(this.patientOuter);const t=await new Oo().loadAsync(Eo+"assets/hepatobiliary-context.glb");return this.anatomicContext=t.scene,this.anatomicContext.rotation.x=-Math.PI/2,this.anatomicContext.position.set(0,1.035,0),this.anatomicContext.traverse(n=>{n.isMesh&&(n.layers.enable(1),n.castShadow=n.receiveShadow=!0,n.geometry.attributes.normal||n.geometry.computeVertexNormals(),n.material.roughness=.48,n.material.metalness=0)}),this.scene.add(this.anatomicContext),this.gallbladder.visible=!1,this.schematicVessels.visible=!1,this.cavity.children[1].visible=!1,this.assemblies}setJoint(e,t){this._jointByName??=new Map;let n=this._jointByName.get(e);if(n||(n=this.robotModel?.getObjectByName(e),n&&this._jointByName.set(e,n)),!n?.userData.rest||!Number.isFinite(t))return;const s=n.userData.limit;if(t=ni.clamp(t,s.lower??-Math.PI,s.upper??Math.PI),n.userData.angle=t,n.quaternion.copy(n.userData.rest).multiply(Lu.setFromAxisAngle(n.userData.axis,t)),!this._ikSolving&&this._armIK)for(const r of Object.values(this._armIK))r.valid=!1}_makeRoom(){const e=Yy(this.scene,this.scopeFeed.monitorMaterial);this.room=e.room,this.monitor=e.monitor,this.monitorScreen=e.monitorScreen,this.robotPlatform=e.platform}_makePatient(){const e=new Ke;this.patientOuter=e,this.scene.add(e);const t=xn("#436c70",.05,.94);t.normalMap=null,Xi([.22,.12,.52],[0,.99,-.13],t,e),br([.49,.035,.48],[0,1.03,-.63],t,e),br([.49,.035,.46],[0,1.03,.38],t,e);const n=xn("#bb8d75",0,.7);Xi([.1,.105,.125],[0,1.035,-.76],n,e),Xi([.105,.044,.105],[0,1.11,-.76],xn("#558c89",0,.7),e);const s=xn("#c99882",0,.65);s.transparent=!0,s.opacity=.22,s.depthWrite=!1,Xi([.17,.095,.23],[0,1.09,-.02],s,e);for(const c of[-.22,.22])br([.11,.04,.51],[c,1.105,-.02],t,e);this.cavity=new Ke,this.scene.add(this.cavity);const r=new dn({color:"#c5b1a7",roughness:.72,metalness:0,side:Xt,map:Jy(),clearcoat:.08,clearcoatRoughness:.58}),o=Xi([.25,.16,.29],[0,1.085,0],r,this.cavity);o.layers.set(1),o.castShadow=!1,Xi([.18,.028,.13],[0,1,-.14],xn("#ac7b74",0,.55),this.cavity).layers.enable(1),this.gallbladder=Xi([.012,.017,.032],[-.032,1.001,.055],new dn({color:"#68804b",roughness:.3,clearcoat:.6}),this.cavity),this.gallbladder.rotation.z=.3,this.gallbladder.layers.enable(1),this.schematicVessels=new Ke,this.cavity.add(this.schematicVessels);const l=xn("#794240",.05,.4);for(let c=0;c<3;c++){const h=new bd([new b(-.035+c*.014,.997,-.02),new b(-.025+c*.013,1.003,.016),new b(-.038+c*.02,1.002,.05)]);ti(new Ic(h,16,.0015,6,!1),l,this.schematicVessels).layers.enable(1)}this.portMeshes=[];for(const[c,h]of[[-.08,.1],[.08,.1],[0,.14]]){const u=new Ke;u.position.set(c,1.18,h),this.scene.add(u);const d=ti(new wn(.009,.0016,8,24),xn("#73a7a4",.3,.42),u);d.rotation.x=Math.PI/2;const f=ti(new Bt(.007,.006,.015,20),Nu,u);f.position.y=-.006;const g=ti(new Bt(.0054,.0048,.064,16),$y,u);g.position.y=.032;const _=ti(new wn(.0061,.0011,8,20),Nu,u);_.rotation.x=Math.PI/2,_.position.y=-.014,this.portMeshes.push(u)}}_makeTools(){this.tools={left:{group:new Ke},right:{group:new Ke}},this.scopeShaft=new Ke,this.scopeHead=new Ke,this.scopeLens=new Ke}_makeScopeArm(){this.scopeArm=new Ke}addTissue(e){this.tissue=e,e.group.position.set(0,1.035,0),this.scene.add(e.group),e.group.traverse(t=>{t.layers.enable(1),t.isMesh&&(t.castShadow=!0,t.receiveShadow=!0)})}resize(){const e=this.stage.clientWidth,t=this.stage.clientHeight;e<1||t<1||(this.renderer.setSize(e,t,!1),this.overviewCamera.aspect=e/t,this.overviewCamera.updateProjectionMatrix(),this.endoCamera.aspect=e/t,this.endoCamera.updateProjectionMatrix())}setMode(e){this.mode=e,this.controls.enabled=e==="overview"}get scopeAspect(){const e=this.mode==="endo"?this.stage:this.mini;if(e===this.stage)return Math.max(1,e.clientWidth)/Math.max(1,e.clientHeight);const t=e.getBoundingClientRect();return Math.max(1,t.width)/Math.max(1,t.height)}home(){this.overviewCamera.position.set(1.68,2.02,-1.92),this.controls.target.set(0,1.2,.18),this.controls.update()}releaseKinematicGuard(){this.acceptedArmPoses={},this.kinematicLimited=!1,this._armIK=null,this.assemblies?.resetPose()}guardArmTargets(){return this.kinematicLimited=!1,!1}_makeCollisionMarkers(){const e=this.collisionMarkers=new Ke;e.name="Measured_Instrument_Contact",e.visible=!1,this.scene.add(e);const t=new hn({color:"#ffc76d"}),n=new ci(65e-5,10,8);e.userData.points=["left","right"].map(r=>{const o=new qe(n,t);return o.name=r+"_Surface_Contact_Point",o.layers.enable(1),e.add(o),o});const s=e.userData.line=new qe(new Bt(18e-5,18e-5,1,8),t);s.name="Surface_Contact_Gap",s.layers.enable(1),e.add(s),e.layers.enable(1)}_updateCollisionMarkers(e){const t=this.collisionMarkers;if(!t)return;const n=e?.closestPoints,s=l=>Array.isArray(l)&&l.length===3&&l.every(Number.isFinite);if(t.visible=!!(e?.blocked||e?.contact)&&s(n?.left)&&s(n?.right),!t.visible)return;const[r,o]=t.userData.points;r.position.fromArray(n.left),o.position.fromArray(n.right);const a=r.position.distanceTo(o.position);t.userData.line.visible=a>1e-6&&a<.012,t.userData.line.visible&&Zy(t.userData.line,r.position,o.position)}solveArm(e,t,n=1/60,s=null){if(!this.robotLoaded)return;this._armIK??={};let r=this._armIK[e];if(!r){const U=["shoulder_pitch","shoulder_roll","shoulder_yaw","elbow","wrist_roll","wrist_pitch","wrist_yaw"].map(k=>this.robotModel.getObjectByName(e+"_"+k+"_joint")).filter(Boolean),L=this.handMarkers?.[e]||this.robotModel.getObjectByName(e+"_wrist_yaw_link")||U.at(-1);if(!L)return;r=this._armIK[e]={chain:U,end:L,valid:!1,settled:!1,stationaryFrames:0,error:1/0,bestError:1/0,target:new b,rootMatrix:new Ue,bestAngles:new Float64Array(U.length),jacobian:new Float64Array(3*U.length),matrixElements:new Float64Array(9),centering:new Float64Array(U.length),orientationError:new b,orientationQ:new Fe,goalOrientation:new Fe,lower:new Float64Array(U.length),upper:new Float64Array(U.length),inverse:new ze,pivot:new b,endPos:new b,axis:new b,a:new b,b:new b,cross:new b,scale:new b,q:new Fe}}this.robot.updateWorldMatrix(!0,!1);const o=r.valid&&r.target.distanceToSquared(t)<1e-14&&r.rootMatrix.equals(this.robot.matrixWorld)&&(!s||1-Math.abs(r.goalOrientation.dot(s))<1e-12);if(o&&(r.error<2e-4||r.settled)){this.armErrors[e]=r.error;return}const{chain:a,end:l,pivot:c,endPos:h,axis:u,q:d,a:f,b:g,cross:_,scale:m,jacobian:p,matrixElements:S,centering:y,lower:M,upper:C,inverse:P,orientationError:R,orientationQ:T}=r,v=r.error;if(this.robot.updateMatrixWorld(!0),h.setFromMatrixPosition(l.matrixWorld),!o){r.target.copy(t),r.rootMatrix.copy(this.robot.matrixWorld),r.stationaryFrames=0,r.settled=!1,s&&r.goalOrientation.copy(s),r.bestError=h.distanceTo(t);for(let D=0;D<a.length;D++)r.bestAngles[D]=a[D].userData.angle}const x=a.length,A=ni.clamp(Number.isFinite(n)?n:1/60,.001,.05);for(let D=0;D<x;D++){const U=a[D],L=U.userData.limit,k=L.velocity??12;M[D]=Math.max(L.lower,U.userData.angle-k*A),C[D]=Math.min(L.upper,U.userData.angle+k*A)}this._ikSolving=!0;for(let D=0;D<6&&!(h.distanceToSquared(t)<4e-8);D++){if(R.set(0,0,0),s){l.matrixWorld.decompose(c,T,m),T.invert().premultiply(s).normalize(),T.w<0&&T.set(-T.x,-T.y,-T.z,-T.w);const L=Math.hypot(T.x,T.y,T.z),k=2*Math.acos(ni.clamp(T.w,-1,1));R.set(T.x,T.y,T.z).multiplyScalar(L>1e-10?k/L:0)}for(let L=0;L<x;L++){const k=a[L];k.matrixWorld.decompose(c,d,m),u.copy(k.userData.axis).applyQuaternion(d).normalize(),f.subVectors(h,c),_.crossVectors(u,f),p[L]=_.x,p[x+L]=_.y,p[2*x+L]=_.z;const O=k.userData.limit;y[L]=.4*((O.lower+O.upper)*.5-k.userData.angle)/(O.upper-O.lower)+.015*u.dot(R)}for(let L=0;L<3;L++)for(let k=0;k<3;k++){let O=L===k?25e-6:0;for(let K=0;K<x;K++)O+=p[L*x+K]*p[k*x+K];S[k*3+L]=O}P.fromArray(S).invert(),f.subVectors(t,h).applyMatrix3(P),g.set(0,0,0);for(let L=0;L<x;L++)g.x+=p[L]*y[L],g.y+=p[x+L]*y[L],g.z+=p[2*x+L]*y[L];g.applyMatrix3(P);for(let L=0;L<x;L++){const k=p[L]*f.x+p[x+L]*f.y+p[2*x+L]*f.z+y[L]-(p[L]*g.x+p[x+L]*g.y+p[2*x+L]*g.z);this.setJoint(a[L].name,ni.clamp(a[L].userData.angle+ni.clamp(k,-.2,.2),M[L],C[L]))}a[0].updateMatrixWorld(!0),h.setFromMatrixPosition(l.matrixWorld);const U=h.distanceTo(t);if(U<r.bestError){r.bestError=U;for(let L=0;L<a.length;L++)r.bestAngles[L]=a[L].userData.angle}if(U<2e-4)break}if(r.error=h.distanceTo(t),r.error>r.bestError+1e-8){for(let D=0;D<a.length;D++)this.setJoint(a[D].name,r.bestAngles[D]);this.robot.updateMatrixWorld(!0),r.error=r.bestError}this._ikSolving=!1,r.stationaryFrames=o&&Math.abs(v-r.error)<1e-6?r.stationaryFrames+1:0,r.settled=r.stationaryFrames>=3,r.valid=!0,this.armErrors[e]=r.error}update(e,t){this.assemblies?.update(e,t),this._updateCollisionMarkers(e.collision);for(const[r,o]of["left","right"].entries()){const a=this.assemblies?.toolGripPositions[o];a&&(this.armTargets[o].copy(a),this._gripOrientation??=new Fe,this._gripClock??=new Fe().setFromAxisAngle(new b(0,0,1),Math.PI/2),this._gripOrientation.copy(this.assemblies.tools[o].group.quaternion).multiply(this._gripClock),this.solveArm(o,a,t,this._gripOrientation)),this.handMarkers?.[o]?.getWorldPosition(this.handPositions[o]),this.handQuaternions??={left:new Fe,right:new Fe},this.handMarkers?.[o]?.getWorldQuaternion(this.handQuaternions[o]),this.assemblies&&this.portMeshes[r].quaternion.setFromUnitVectors(ac,this.assemblies.tools[o].shaftDirection)}this.assemblies?.connectHands(this.handPositions,this.armErrors,this.handQuaternions),this.conceptDecoupled=this.assemblies?.conceptDecoupled??!1,this.kinematicLimited=!1;const n=e.scope,s=new b(...n.position);this.assemblies&&this.portMeshes[2].quaternion.setFromUnitVectors(ac,this.assemblies.scope.direction),this.endoCamera.position.copy(s),n.cameraUp?this.endoCamera.up.fromArray(n.cameraUp):this.endoCamera.up.set(0,1,0),this.endoCamera.lookAt(new b(...n.lookAt)),this.scopeLight.position.copy(s),this.scopeLight.target.position.set(...n.lookAt),this.controls.update()}render(e=0){const t=this.renderer,n=this.stage.clientWidth,s=this.stage.clientHeight;if(n<1||s<1)return;const r=this.stage.getBoundingClientRect(),o=this.mini.getBoundingClientRect(),a=o.left-r.left,l=s-(o.top-r.top)-o.height,c=o.width,h=o.height;t.info.reset(),t.setScissorTest(!1),t.setViewport(0,0,n,s),this.cavity.children[0].visible=!0,this.scene.background=new Ce("#6b4a42"),this.scene.environmentIntensity=.34,t.toneMappingExposure=1.1,this.scopeFeed.capture(t,this.scene,this.endoCamera,this.mode==="endo"?n:c,this.mode==="endo"?s:h),t.setRenderTarget(null),t.setScissorTest(!1),t.setViewport(0,0,n,s),t.clear(),this.cavity.children[0].visible=!1,this.scene.background=new Ce("#c2d0d0"),this.scene.environmentIntensity=.8,t.toneMappingExposure=1,this.mode==="endo"?(this.scopeFeed.blit(t,0,0,n,s),this.overviewCamera.aspect=c/h,this.overviewCamera.updateProjectionMatrix(),t.setScissorTest(!0),t.setScissor(a,l,c,h),t.setViewport(a,l,c,h),t.clearDepth(),t.render(this.scene,this.overviewCamera)):(this.overviewCamera.aspect=n/s,this.overviewCamera.updateProjectionMatrix(),t.render(this.scene,this.overviewCamera),this.scopeFeed.blit(t,a,l,c,h)),t.setScissorTest(!1)}dispose(){this.disposed=!0,this.resizeObserver.disconnect(),this.controls.dispose(),this.env.dispose(),this.scene.traverse(e=>{if(e.geometry?.dispose(),e.material)for(const t of Array.isArray(e.material)?e.material:[e.material])t!==this.scopeFeed.monitorMaterial&&t.dispose()}),this.scopeFeed.dispose(),this.renderer.dispose()}}const tM=[[0,5,1,6],[0,1,2,6],[0,2,3,6],[0,3,7,6],[0,7,4,6],[0,4,5,6]],Qa=[[0,0,0],[1,0,0],[1,1,0],[0,1,0],[0,0,1],[1,0,1],[1,1,1],[0,1,1]],nM=[[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]],es=(i,e,t)=>Math.max(e,Math.min(t,i)),Yo=[];for(let i=-1;i<=1;i++)for(let e=-1;e<=1;e++)for(let t=-1;t<=1;t++)Yo.push([t,e,i]);const iM=Yo.map((i,e)=>Yo.reduce((t,n,s)=>s!==e&&Math.max(Math.abs(i[0]-n[0]),Math.abs(i[1]-n[1]),Math.abs(i[2]-n[2]))<=1?t|1<<s:t,0));function jd(i){const e=i.dims??i.dimensions,t=i.origin,n=Array.isArray(i.spacing)?i.spacing:[i.spacing,i.spacing,i.spacing];if(!Array.isArray(e)||e.length!==3||e.some(s=>!Number.isInteger(s)||s<2||s>512))throw new Error("Invalid volume dimensions");if(!Array.isArray(t)||t.length!==3||t.some(s=>!Number.isFinite(s)))throw new Error("Invalid volume origin");if(n.length!==3||n.some(s=>!Number.isFinite(s)||s<=0||s>.05))throw new Error("Invalid volume spacing");return{...i,dims:[...e],origin:[...t],spacing:[...n]}}function Hn(i,e,t,n){return e+i.dims[0]*(t+i.dims[1]*n)}function lc(i,e){return es(.5-i/e,0,1)}function Zi(i){if(!i)return null;const e=i.local??i.point,t=i.displacement??i.delta;if(!Array.isArray(e)||!Array.isArray(t)||e.length!==3||t.length!==3||[...e,...t].some(o=>!Number.isFinite(o)))throw new Error("Invalid tissue deformation");const n=Math.hypot(...t);if(!Number.isFinite(n)||!Number.isFinite(n*3.2))throw new Error("Tissue deformation exceeds the numeric range");if(n<1e-10)return null;const s=[...t],r=Math.max(es(Number.isFinite(i.radius)?i.radius:.065,.02,.2),3.2*Math.hypot(...s));return{local:[...e],displacement:s,radius:r}}function Bc(i,e){if(!e)return{weight:0,gradient:[0,0,0]};const t=i.map((a,l)=>a-e.local[l]),n=Math.hypot(...t),s=n/e.radius;if(s>=1)return{weight:0,gradient:[0,0,0]};const r=1-s,o=-20*r*r*r/(e.radius*e.radius);return{weight:r**4*(4*s+1),gradient:t.map(a=>a*o)}}function Xs(i,e){if(!e)return[...i];const{weight:t}=Bc(i,e);return i.map((n,s)=>n+e.displacement[s]*t)}function cc(i,e){if(!e)return[...i];const t=[...i],n=e.displacement;for(let s=0;s<20;s++){const{weight:r,gradient:o}=Bc(t,e),a=t.map((h,u)=>h+n[u]*r-i[u]);if(Math.hypot(...a)<1e-10)break;const l=1+o.reduce((h,u,d)=>h+u*n[d],0),c=o.reduce((h,u,d)=>h+u*a[d],0)/l;for(let h=0;h<3;h++)t[h]-=a[h]-n[h]*c}return t}function sM(i,e,t){const n=1+e.reduce((a,l,c)=>a+l*t[c],0),s=i.reduce((a,l,c)=>a+l*t[c],0)/n,r=i.map((a,l)=>a-e[l]*s),o=Math.hypot(...r)||1;return r.map(a=>a/o)}function rM(i,e,t=16){const n=jd(i),s=n.dims.reduce((h,u)=>h*u,1);if(!(e instanceof Float32Array)||e.length!==s)throw new Error("Volume byte length does not match its metadata");for(let h=0;h<e.length;h++)if(!Number.isFinite(e[h]))throw new Error("Volume has non-finite samples");const r=new Float32Array(e),o=new Float32Array(e),a=n.spacing.reduce((h,u)=>h*u,1)*1e9,l=Math.min(...n.spacing);let c=0;for(let h=0;h<r.length;h++)c+=lc(r[h],l)*a;return{meta:n,base:r,field:o,chunkSize:t,bandWidth:l,voxelMm3:a,totalVolumeMm3:c,removedVolumeMm3:0,cuts:[],separations:[],fragmentRecords:[],fragmentVolumeMm3:0,excluded:new Uint8Array(s),exclusionIndices:[],baselineLabels:null,connectivityVerified:!1,topologyDirty:!1,topologyMetrics:{scans:0,scannedNodes:0,localChecks:0,lastScanMs:0}}}function oM(i,e,t,n){i.topologyMetrics.localChecks++;const{meta:s,field:r}=i;let o=0;for(let c=0;c<27;c++){if(c===13)continue;const h=Yo[c],u=e+h[0],d=t+h[1],f=n+h[2];u>=0&&u<s.dims[0]&&d>=0&&d<s.dims[1]&&f>=0&&f<s.dims[2]&&r[Hn(s,u,d,f)]<0&&(o|=1<<c)}if(!o)return!1;let a=o&-o,l=a;for(;a&&l!==o;){const c=a&-a,h=31-Math.clz32(c);a&=~c;const u=iM[h]&o&~l;a|=u,l|=u}return l!==o}function qd(i,e,t){const n=t[0]-e[0],s=t[1]-e[1],r=t[2]-e[2],o=n*n+s*s+r*r,a=o?es(((i[0]-e[0])*n+(i[1]-e[1])*s+(i[2]-e[2])*r)/o,0,1):0;return Math.hypot(i[0]-e[0]-a*n,i[1]-e[1]-a*s,i[2]-e[2]-a*r)}function kr(i){const e=i.a??i.point,t=i.b??e;if(!Array.isArray(e)||!Array.isArray(t)||e.length!==3||t.length!==3||[...e,...t].some(r=>!Number.isFinite(r)))throw new Error("Cut points must be finite three-component coordinates");if(!Number.isFinite(i.radius)||i.radius<=0||i.radius>.05)throw new Error("Cut radius must be positive and at most 50 mm");if(Math.hypot(...t.map((r,o)=>r-e[o]))>.5)throw new Error("Cut segment exceeds the supported workspace");const n={a:[...e],b:[...t],radius:i.radius},s=Zi(i.deformation);return s&&(n.deformation=s),n}function $o(i){const e=[],t=i.meta.dims.map(n=>Math.ceil((n-1)/i.chunkSize));for(let n=0;n<t[2];n++)for(let s=0;s<t[1];s++)for(let r=0;r<t[0];r++)e.push(`${r},${s},${n}`);return e}function zc(i,e){const t=kr(e),{meta:n,field:s}=i,r=2.5*Math.max(...n.spacing),o=t.deformation?.displacement??[0,0,0],a=t.radius+r,l=t.a.map((m,p)=>es(Math.floor((Math.min(m,t.b[p])-Math.max(0,o[p])-a-n.origin[p])/n.spacing[p]),0,n.dims[p]-1)),c=t.a.map((m,p)=>es(Math.ceil((Math.max(m,t.b[p])-Math.min(0,o[p])+a-n.origin[p])/n.spacing[p]),0,n.dims[p]-1));let h=0,u=0,d=0;const f=[0,0,0],g=[[1/0,1/0,1/0],[-1/0,-1/0,-1/0]];for(let m=l[2];m<=c[2];m++)for(let p=l[1];p<=c[1];p++)for(let S=l[0];S<=c[0];S++){f[0]=n.origin[0]+S*n.spacing[0],f[1]=n.origin[1]+p*n.spacing[1],f[2]=n.origin[2]+m*n.spacing[2];const y=Hn(n,S,p,m),M=t.deformation?Xs(f,t.deformation):f,C=Math.fround(Math.max(s[y],t.radius-qd(M,t.a,t.b)));if(C<=s[y])continue;const P=s[y]<0;h+=(lc(s[y],i.bandWidth)-lc(C,i.bandWidth))*i.voxelMm3,s[y]=C,P&&C>=0&&(d++,!i.topologyDirty&&oM(i,S,p,m)&&(i.topologyDirty=!0)),u++;for(let R=0;R<3;R++){const T=R===0?S:R===1?p:m;g[0][R]=Math.min(g[0][R],T),g[1][R]=Math.max(g[1][R],T)}}i.cuts.push(t),i.removedVolumeMm3=Math.min(i.totalVolumeMm3,i.removedVolumeMm3+h);const _=new Set;if(u){const m=g[0].map(S=>Math.max(0,Math.floor((S-2)/i.chunkSize))),p=g[1].map((S,y)=>Math.min(Math.ceil((n.dims[y]-1)/i.chunkSize)-1,Math.floor((S+1)/i.chunkSize)));for(let S=m[2];S<=p[2];S++)for(let y=m[1];y<=p[1];y++)for(let M=m[0];M<=p[0];M++)_.add(`${M},${y},${S}`)}return{dirty:_,removedMm3:h,changedSamples:u,removedNodes:d,removedVolumeMm3:i.removedVolumeMm3}}function aM(i,e=[]){i.field.set(i.base),i.cuts=[],i.removedVolumeMm3=0,i.separations=[],i.fragmentRecords=[],i.fragmentVolumeMm3=0,i.excluded.fill(0),i.exclusionIndices=[],i.topologyDirty=!1,i.connectivityVerified=!!i.baselineLabels;for(const t of e)zc(i,t);return i}function lM(i,e,t,n){const{meta:s,field:r}=i,o=[0,0,0];for(let a=0;a<3;a++){const l=[e,t,n],c=[e,t,n];l[a]=Math.max(0,l[a]-1),c[a]=Math.min(s.dims[a]-1,c[a]+1),o[a]=(r[Hn(s,...c)]-r[Hn(s,...l)])/((c[a]-l[a])*s.spacing[a])}return o}function cM(i,e,t){const n=.93+.045*Math.sin(i[0]*492+Math.sin(i[2]*341))+.025*Math.sin(i[1]*713-i[2]*427),s=es((-e-t*.3)/(t*1.1),0,1);return[(.19+.14*s)*n,(.027+.027*s)*n,(.018+.024*s)*n]}function Kd(i,e){const[t,n,s]=e.split(",").map(Number),{meta:r,field:o,base:a,chunkSize:l}=i,c=[t,n,s].map(R=>R*l),h=c.map((R,T)=>Math.min(R+l,r.dims[T]-1)),u=[],d=[],f=[],g=[],_=[],m=new Map,p=new Array(8),S=new Array(8),y=new Array(8),M=new Map,C=(R,T,v)=>{const x=Hn(r,R,T,v);let A=M.get(x);return A||(A=lM(i,R,T,v),M.set(x,A)),A};function P(R,T,v){const x=T.p[0]-R.p[0],A=T.p[1]-R.p[1],D=T.p[2]-R.p[2],U=v.p[0]-R.p[0],L=v.p[1]-R.p[1],k=v.p[2]-R.p[2],O=[A*k-D*L,D*U-x*k,x*L-A*U];if(Math.hypot(...O)<1e-15)return;const K=R.n.map((V,Y)=>V+T.n[Y]+v.n[Y]);O.reduce((V,Y,ne)=>V+Y*K[ne],0)<0&&([T,v]=[v,T]);for(const V of[R,T,v]){let Y=m.get(V.key);Y===void 0&&(Y=u.length/3,m.set(V.key,Y),u.push(...V.p),d.push(...V.n),f.push(...V.c),g.push(V.cutMask)),_.push(Y)}}for(let R=c[2];R<h[2];R++)for(let T=c[1];T<h[1];T++)for(let v=c[0];v<h[0];v++){let x=0;for(let A=0;A<8;A++){const D=[v+Qa[A][0],T+Qa[A][1],R+Qa[A][2]],U=Hn(r,...D);S[A]=o[U],y[A]=a[U],p[A]=D,S[A]<0&&x++}if(!(!x||x===8))for(const A of tM){const D=[];for(const[U,L]of nM){const k=A[U],O=A[L];if(S[k]<0==S[O]<0)continue;const K=S[k]/(S[k]-S[O]),V=C(...p[k]),Y=C(...p[O]),ne=p[k].map((j,Z)=>r.origin[Z]+(j+(p[O][Z]-j)*K)*r.spacing[Z]),ue=V.map((j,Z)=>j+(Y[Z]-j)*K),Ae=Math.hypot(...ue)||1,Qe=y[k]+(y[O]-y[k])*K,tt=Hn(r,...p[k]),je=Hn(r,...p[O]);D.push({key:tt<je?`${tt}:${je}`:`${je}:${tt}`,p:ne,n:ue.map(j=>j/Ae),c:cM(ne,Qe,i.bandWidth),cutMask:es((-Qe-i.bandWidth*.3)/(i.bandWidth*1.1),0,1)})}if(D.length===3)P(...D);else if(D.length===4){const U=[0,1,2].map(V=>D.reduce((Y,ne)=>Y+ne.p[V],0)/4);let L=[0,1,2].map(V=>D.reduce((Y,ne)=>Y+ne.n[V],0));const k=Math.hypot(...L)||1;L=L.map(V=>V/k);const O=D[0].p.map((V,Y)=>V-U[Y]),K=[L[1]*O[2]-L[2]*O[1],L[2]*O[0]-L[0]*O[2],L[0]*O[1]-L[1]*O[0]];for(const V of D){const Y=V.p.map((ne,ue)=>ne-U[ue]);V.angle=Math.atan2(Y.reduce((ne,ue,Ae)=>ne+ue*K[Ae],0),Y.reduce((ne,ue,Ae)=>ne+ue*O[Ae],0))}D.sort((V,Y)=>V.angle-Y.angle),P(D[0],D[1],D[2]),P(D[0],D[2],D[3])}}}return{key:e,positions:new Float32Array(u),normals:new Float32Array(d),colors:new Float32Array(f),cutMasks:new Float32Array(g),indices:new Uint32Array(_)}}function Vc(i,e,t=null){const n=performance.now(),{dims:s}=i.meta,[r,o,a]=s,l=r*o,c=i._connectivityVisited??=new Uint8Array(e.length),h=i._connectivityQueue??=new Uint32Array(e.length);c.fill(0);const u=[];let d=0;for(let f=0;f<e.length;f++){if(c[f]||e[f]>=0)continue;const g=d,_=u.length+1;let m=g;h[d++]=f,c[f]=1,t&&(t[f]=_);const p=[r,o,a],S=[0,0,0];for(;m<d;){const y=h[m++],M=Math.floor(y/l),C=Math.floor((y-M*l)/r),P=y-M*l-C*r;P<p[0]&&(p[0]=P),P>S[0]&&(S[0]=P),C<p[1]&&(p[1]=C),C>S[1]&&(S[1]=C),M<p[2]&&(p[2]=M),M>S[2]&&(S[2]=M);const R=Math.max(0,P-1),T=Math.min(r-1,P+1),v=Math.max(0,C-1),x=Math.min(o-1,C+1),A=Math.max(0,M-1),D=Math.min(a-1,M+1);for(let U=A;U<=D;U++)for(let L=v;L<=x;L++){const k=U*l+L*r;for(let O=R;O<=T;O++){const K=k+O;!c[K]&&e[K]<0&&(c[K]=1,h[d++]=K,t&&(t[K]=_))}}}u.push({seed:f,start:g,end:d,voxelCount:d-g,low:p,high:S,baseline:i.baselineLabels?.[f]??_})}return i.topologyMetrics.scans++,i.topologyMetrics.scannedNodes+=e.length,i.topologyMetrics.lastScanMs=performance.now()-n,{components:u,queue:h}}function Hc(i){if(i.baselineLabels)return i;const e=new Uint32Array(i.base.length);return Vc(i,i.base,e),i.baselineLabels=e,i.cuts.length||(i.connectivityVerified=!0,i.topologyDirty=!1),i}function Yd(i){const e=new Map;for(const t of i){const n=e.get(t.baseline);(!n||t.voxelCount>n.voxelCount)&&e.set(t.baseline,t)}return e}function hM(i,e,t){const n=e.map(o=>Math.max(0,Math.floor((o-2)/i.chunkSize))),s=t.map((o,a)=>Math.min(Math.ceil((i.meta.dims[a]-1)/i.chunkSize)-1,Math.floor((o+1)/i.chunkSize))),r=new Set;for(let o=n[2];o<=s[2];o++)for(let a=n[1];a<=s[1];a++)for(let l=n[0];l<=s[0];l++)r.add(`${l},${a},${o}`);return r}function uM(i){const e=i.reduce((o,a)=>o+a.positions.length,0),t=i.reduce((o,a)=>o+a.indices.length,0),n={positions:new Float32Array(e),normals:new Float32Array(e),colors:new Float32Array(e),cutMasks:new Float32Array(e/3),indices:new Uint32Array(t)};let s=0,r=0;for(const o of i){n.positions.set(o.positions,s),n.normals.set(o.normals,s),n.colors.set(o.colors,s),n.cutMasks.set(o.cutMasks,s/3);for(let a=0;a<o.indices.length;a++)n.indices[r+a]=o.indices[a]+s/3;s+=o.positions.length,r+=o.indices.length}return n}function dM(i){let e=0,t=0,n=0,s=0;const r=i.positions,o=i.indices;for(let a=0;a<o.length;a+=3){const l=o[a]*3,c=o[a+1]*3,h=o[a+2]*3,u=r[l]*(r[c+1]*r[h+2]-r[c+2]*r[h+1])+r[l+1]*(r[c+2]*r[h]-r[c]*r[h+2])+r[l+2]*(r[c]*r[h+1]-r[c+1]*r[h]);e+=u,t+=u*(r[l]+r[c]+r[h]),n+=u*(r[l+1]+r[c+1]+r[h+1]),s+=u*(r[l+2]+r[c+2]+r[h+2])}if(Math.abs(e)<1e-20)throw new Error("Detached tissue has no closed three-dimensional volume");return{volumeMm3:Math.abs(e)/6*1e9,center:[t,n,s].map(a=>a/(4*e))}}function $d(i,e,t,n=null){const s=e.queue.slice(t.start,t.end),r=new Set(s),o=t.low.map(T=>T-2),a=t.high.map(T=>T+2),l=o.map((T,v)=>a[v]-T+1),c=o.map((T,v)=>i.meta.origin[v]+T*i.meta.spacing[v]),h={dims:l,origin:c,spacing:[...i.meta.spacing]},u=l[0]*l[1]*l[2],d=new Float32Array(u),f=new Float32Array(u),g=Math.max(...i.meta.spacing);for(let T=0;T<l[2];T++)for(let v=0;v<l[1];v++)for(let x=0;x<l[0];x++){const A=x+o[0],D=v+o[1],U=T+o[2],L=x+l[0]*(v+l[1]*T);if(A<0||D<0||U<0||A>=i.meta.dims[0]||D>=i.meta.dims[1]||U>=i.meta.dims[2]){d[L]=g,f[L]=g;continue}const k=Hn(i.meta,A,D,U),O=i.field[k];d[L]=r.has(k)?O:Math.max(0,O>=0?O:-O),f[L]=i.base[k]}const _={meta:h,field:d,base:f,chunkSize:i.chunkSize,bandWidth:i.bandWidth},m=uM($o(_).map(T=>Kd(_,T))),p=dM(m),S=i.cuts.length,y=t.seed,M=n?.id??`fragment-${S.toString(36)}-${y.toString(36)}`;if(i.fragmentRecords.some(T=>T.id===M))throw new Error("Duplicate detached tissue identifier");const C=Zi(i.cuts[S-1]?.deformation),P={id:M,cutIndex:S,seed:y,voxelCount:t.voxelCount,...p,...m,deformation:C,coordinateSpace:"source-material",volume:{dims:l,origin:c,spacing:[...i.meta.spacing],values:d}},R=new Float32Array(s.length);for(let T=0;T<s.length;T++){const v=s[T],x=Math.fround(Math.max(Math.abs(i.field[v]),i.bandWidth*.75));i.field[v]=x,R[T]=x,i.excluded[v]||(i.excluded[v]=1,i.exclusionIndices.push(v))}return i.fragmentRecords.push({id:M,cutIndex:S,seed:y,voxelCount:t.voxelCount,volumeMm3:p.volumeMm3,center:[...p.center]}),i.fragmentVolumeMm3+=p.volumeMm3,i.separations.push({id:M,cutIndex:S,seed:y}),{fragment:P,nodeIndices:s,positiveValues:R,dirty:hM(i,t.low,t.high)}}function Uu(i){const e=i.reduce((o,a)=>o+a.nodeIndices.length,0),t=new Uint32Array(e),n=new Float32Array(e),s=new Set;let r=0;for(const o of i)t.set(o.nodeIndices,r),n.set(o.positiveValues,r),r+=o.nodeIndices.length,o.dirty.forEach(a=>s.add(a));return{fragments:i.map(o=>o.fragment),dirty:s,exclusions:{nodeIndices:t,positiveValues:n}}}function fM(i,{force:e=!1,minVoxels:t=12}={}){if(Hc(i),!e&&i.connectivityVerified&&!i.topologyDirty)return Uu([]);const n=Vc(i,i.field),s=Yd(n.components),r=[];for(const o of n.components)s.get(o.baseline)===o||o.voxelCount<t||r.push($d(i,n,o));return i.connectivityVerified=!0,i.topologyDirty=!1,Uu(r)}function pM(i,e=[],t=[]){const n=e.map(kr),s=t.map(d=>({...d})),r=new Set,o=new Set;for(const d of s){const f=`${d.cutIndex}:${d.seed}`;if(!Number.isInteger(d.cutIndex)||d.cutIndex<1||d.cutIndex>n.length||!Number.isInteger(d.seed)||d.seed<0||d.seed>=i.field.length||typeof d.id!="string"||!/^fragment-[a-z0-9-]+$/.test(d.id)||r.has(d.id)||o.has(f))throw new Error("Invalid tissue separation history");r.add(d.id),o.add(f)}s.sort((d,f)=>d.cutIndex-f.cutIndex||d.seed-f.seed);const a=i;i={...i,field:new Float32Array(i.base),excluded:new Uint8Array(i.base.length),topologyMetrics:{...i.topologyMetrics}},aM(i),Hc(i);const l=[];for(let d=0;d<n.length;d++){zc(i,n[d]);const f=s.filter(m=>m.cutIndex===d+1);if(!f.length)continue;const g=Vc(i,i.field),_=Yd(g.components);for(const m of f){const p=g.components.find(S=>S.seed===m.seed);if(!p||_.get(p.baseline)===p)throw new Error("Separation history does not match a fully disconnected component");l.push($d(i,g,p,m).fragment)}i.connectivityVerified=!0,i.topologyDirty=!1}const c=new Uint32Array(i.exclusionIndices),h=new Float32Array(c.length);for(let d=0;d<c.length;d++)h[d]=i.field[c[d]];const u=a.field;return u.set(i.field),Object.assign(a,i,{field:u}),{fragments:l,dirty:new Set($o(i)),exclusions:{nodeIndices:c,positiveValues:h}}}function el(i,e){return[...e].map(t=>Kd(i,t))}function mM(i){return{removedVolumeMm3:i.removedVolumeMm3,totalVolumeMm3:i.totalVolumeMm3,voxelMm:Math.max(...i.meta.spacing)*1e3,cutCount:i.cuts.length,fragmentCount:i.fragmentRecords.length,fragmentVolumeMm3:i.fragmentVolumeMm3,topology:{...i.topologyMetrics}}}if(typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope){let i;self.onmessage=({data:e})=>{try{let t,n=0,s=0,r=[],o={nodeIndices:new Uint32Array,positiveValues:new Float32Array};if(e.type==="init")i=rM(e.metadata,new Float32Array(e.buffer),e.chunkSize??16),Hc(i),t=el(i,$o(i));else if(i)if(e.type==="cut"){const l=new Set;for(const h of e.cuts){const u=zc(i,h);u.dirty.forEach(d=>l.add(d)),n+=u.changedSamples,s+=u.removedMm3}const c=fM(i);r=c.fragments,o=c.exclusions,c.dirty.forEach(h=>l.add(h)),t=el(i,l)}else if(e.type==="restore"){const l=pM(i,e.cuts??[],e.separations??[]);r=l.fragments,o=l.exclusions,t=el(i,$o(i))}else throw new Error(`Unknown tissue operation: ${e.type}`);else throw new Error("The tissue volume is not initialized");const a=t.flatMap(l=>[l.positions.buffer,l.normals.buffer,l.colors.buffer,l.cutMasks.buffer,l.indices.buffer]);for(const l of r)a.push(l.positions.buffer,l.normals.buffer,l.colors.buffer,l.cutMasks.buffer,l.indices.buffer,l.volume.values.buffer);a.push(o.nodeIndices.buffer,o.positiveValues.buffer),self.postMessage({id:e.id,epoch:e.epoch,type:e.type,chunks:t,statistics:mM(i),changedSamples:n,removedMm3:s,fragments:r,exclusions:{reset:e.type!=="cut",...o},separations:i.separations.map(l=>({...l}))},a)}catch(t){self.postMessage({id:e.id,epoch:e.epoch,error:t.message})}}}const gM=`
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
`,_M=`
#include <color_fragment>
float tissueCut=smoothstep(.10,.74,clamp(vTissueCut,0.0,1.0));
float tissueFootprint=max(length(dFdx(vTissuePosition)),length(dFdy(vTissuePosition)));
float tissueGrainVisibility=1.0-smoothstep(.00035,.00120,tissueFootprint);
float tissueMicroVisibility=1.0-smoothstep(.00009,.00035,tissueFootprint);
float tissueMottle=tissueNoise(vTissuePosition*215.0+vec3(7.3,2.1,11.8));
float tissueGrain=tissueNoise(vTissuePosition*1020.0+vec3(2.7,9.2,4.1));
// Irregular inter-lobular boundaries at approximately millimetre scale.
// These are a material cue, not a generated large vessel tree.
float tissueSepta=(1.0-smoothstep(.035,.105,abs(tissueGrain-.49)))
                 *tissueGrainVisibility;
// Sparse submillimetre pits with a restrained pale rim. A site's centre stays
// inside its cell, so no 27-neighbour Voronoi search is necessary.
vec3 tissueCell=vTissuePosition*420.0;
vec3 tissueSeed=tissueHash3(floor(tissueCell)+vec3(19.1,4.7,8.3));
vec3 tissueSite=.20+.60*tissueSeed;
vec3 tissueOffset=(fract(tissueCell)-tissueSite)*vec3(1.0,1.28,.88);
float tissueRadius=.055+.043*tissueSeed.x;
float tissueDistance=length(tissueOffset);
float tissueAA=clamp(fwidth(tissueDistance),.008,.035);
float tissueSiteMask=step(.93,tissueSeed.z)*tissueMicroVisibility;
float tissueLumen=(1.0-smoothstep(tissueRadius-tissueAA,tissueRadius+tissueAA,tissueDistance))*tissueSiteMask;
float tissueRim=max(0.0,(1.0-smoothstep(tissueRadius+.022-tissueAA,tissueRadius+.022+tissueAA,tissueDistance))*tissueSiteMask-tissueLumen);

vec3 tissueCapsule=diffuseColor.rgb*mix(vec3(.92,.92,.96),vec3(1.06,1.03,.98),tissueMottle);
tissueCapsule*=1.0+(tissueGrain-.5)*.055*tissueGrainVisibility;
// Fresh parenchyma has a lighter red-brown body than the dark outer capsule.
// A little source vertex colour preserves continuity at a cut boundary.
vec3 tissueCutColour=mix(vec3(.305,.056,.038),vec3(.425,.091,.062),tissueGrain);
tissueCutColour=mix(tissueCutColour,diffuseColor.rgb,.22);
tissueCutColour*=.94+.12*tissueMottle;
tissueCutColour=mix(tissueCutColour,vec3(.49,.228,.155),tissueSepta*.13);
tissueCutColour=mix(tissueCutColour,vec3(.040,.008,.005),tissueLumen*.77);
tissueCutColour+=vec3(.031,.018,.012)*tissueRim;
diffuseColor.rgb=mix(tissueCapsule,tissueCutColour,tissueCut);
`,vM=`
#include <normal_fragment_maps>
// Tens of micrometres of displayed relief avoid coarse orange-peel highlights.
float tissueHeight=(tissueGrain-.5)*mix(.000012,.000048,tissueCut)*tissueGrainVisibility;
tissueHeight+=(tissueSepta*.000007-tissueLumen*.000030+tissueRim*.000009)*tissueCut;
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
`;function xM(){const i=new dn({vertexColors:!0,side:cn,roughness:.42,metalness:0,ior:1.37,specularIntensity:.8,clearcoat:.2,clearcoatRoughness:.25,envMapIntensity:.65});return i.name="Anatomical_Capsule_And_Procedural_Cut_Parenchyma",i.userData.detailDescription="Procedural display cues at millimetre and submillimetre scales; not patient-specific anatomy or histology.",i.onBeforeCompile=e=>{e.vertexShader=`attribute vec3 tissueRestPosition;
attribute float tissueCutMask;
varying vec3 vTissuePosition;
varying float vTissueCut;
`+e.vertexShader,e.vertexShader=e.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vTissuePosition=tissueRestPosition;
vTissueCut=tissueCutMask;`),e.fragmentShader=gM+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace("#include <color_fragment>",_M),e.fragmentShader=e.fragmentShader.replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
roughnessFactor=clamp(roughnessFactor+tissueCut*.105+(tissueGrain-.5)*.045*tissueGrainVisibility
                     +(tissueMottle-.5)*.035+tissueLumen*tissueCut*.08,.32,.65);`),e.fragmentShader=e.fragmentShader.replace("#include <normal_fragment_maps>",vM),e.fragmentShader=e.fragmentShader.replace("#include <lights_physical_fragment>",`#include <lights_physical_fragment>
#ifdef USE_CLEARCOAT
  material.clearcoat=mix(.20,.115,tissueCut)*(.90+.10*tissueMottle);
  material.clearcoatRoughness=max(material.clearcoatRoughness,mix(.25,.31,tissueCut));
#endif`)},i.customProgramCacheKey=()=>"anatomical-capsule-cut-parenchyma-v3",i}const Gc=i=>Array.isArray(i)||ArrayBuffer.isView(i)?[...i]:i.toArray(),Jn=i=>new b().fromArray(Gc(i)),To=i=>i?new Fe().fromArray(Gc(i)).normalize():new Fe;function Fu(i,e){const t=Gc(e),{dims:n,origin:s,spacing:r,values:o}=i,a=t.map((f,g)=>(f-s[g])/r[g]);if(a.some(f=>!Number.isFinite(f)))return 1/0;const l=a.map((f,g)=>Math.max(0,Math.min(n[g]-1,f))),c=l.map((f,g)=>Math.min(n[g]-2,Math.floor(f))),h=l.map((f,g)=>f-c[g]);let u=0;for(let f=0;f<2;f++)for(let g=0;g<2;g++)for(let _=0;_<2;_++)u+=o[c[0]+_+n[0]*(c[1]+g+n[1]*(c[2]+f))]*(_?h[0]:1-h[0])*(g?h[1]:1-h[1])*(f?h[2]:1-h[2]);const d=Math.hypot(...a.map((f,g)=>(f-l[g])*r[g]));return d?Math.max(0,u)+d:u}class yM{constructor(e){this.tissue=e,this.group=new Ke,this.group.name="detached-liver-specimens",this.group.layers.enable(1),e.group.add(this.group),this.items=new Map}clear(){for(const e of this.items.values())e.mesh.geometry.dispose();this.items.clear(),this.group.clear()}add(e,t){if(this.items.has(e.id))return this.items.get(e.id);const n=t&&Object.hasOwn(t,"deformation")?t.deformation:Object.hasOwn(e,"deformation")?e.deformation:this.tissue._deformation,s=Zi(n),r=new b().fromArray(Xs(e.center,s)),o=new Float32Array(e.positions.length),a=new Float32Array(e.normals.length);for(let u=0;u<o.length;u+=3){const d=[...e.positions.subarray(u,u+3)],f=Xs(d,s),g=s?sM([...e.normals.subarray(u,u+3)],Bc(d,s).gradient,s.displacement):e.normals.subarray(u,u+3);for(let _=0;_<3;_++)o[u+_]=f[_]-r.getComponent(_),a[u+_]=g[_]}const l=new Lt;l.setAttribute("position",new ct(o,3)),l.setAttribute("normal",new ct(a,3)),l.setAttribute("color",new ct(e.colors,3)),l.setAttribute("tissueRestPosition",new ct(e.positions,3)),l.setAttribute("tissueCutMask",new ct(e.cutMasks,1)),l.setIndex(new ct(e.indices,1)),l.computeBoundingBox(),l.computeBoundingSphere();const c=new qe(l,this.tissue.material);c.name=`specimen-${e.id}`,c.layers.enable(1),c.castShadow=!0,c.receiveShadow=!0,c.userData.tissue=!0,c.userData.fragmentId=e.id;const h={id:e.id,volumeMm3:e.volumeMm3,referenceCenter:[...e.center],frozenCenter:r,deformation:s,volume:e.volume,mesh:c,position:t?Jn(t.position):r.clone(),quaternion:To(t?.quaternion),velocity:t?.velocity?Jn(t.velocity):new b,held:!!t?.held,attachment:t?.attachment?structuredClone(t.attachment):null,sleeping:!!t?.sleeping,contactTime:0,support:this._supportPoints(o)};return this.items.set(h.id,h),this.group.add(c),this.sync(h),h}_supportPoints(e){const t=[];for(let n=-1;n<=1;n++)for(let s=-1;s<=1;s++)for(let r=-1;r<=1;r++){if(!r&&!s&&!n)continue;let o=-1/0,a=0;for(let l=0;l<e.length;l+=3){const c=e[l]*r+e[l+1]*s+e[l+2]*n;c>o&&(o=c,a=l)}t.push(new b().fromArray(e,a))}return t}sync(e){e.mesh.position.copy(e.position),e.mesh.quaternion.copy(e.quaternion),e.mesh.updateMatrix(),e.box=e.mesh.geometry.boundingBox.clone().applyMatrix4(e.mesh.matrix)}snapshot(){return[...this.items.values()].map(e=>({id:e.id,position:e.position.toArray(),quaternion:e.quaternion.toArray(),velocity:e.velocity.toArray(),held:e.held,sleeping:e.sleeping,deformation:e.deformation?structuredClone(e.deformation):null,attachment:e.attachment?structuredClone(e.attachment):null}))}atReference(e){for(const t of this.items.values())if(Fu(t.volume,e)<=.002)return t;return null}referencePoint(e,t){const n=Jn(t).sub(e.position).applyQuaternion(e.quaternion.clone().invert()).add(e.frozenCenter);return cc(n.toArray(),e.deformation)}distance(e,t){return Fu(e.volume,this.referencePoint(e,t))}nearest(e,t=.006){const n=Jn(e);let s=null,r=1/0;for(const o of this.items.values()){if(o.box.distanceToPoint(n)>t)continue;const a=o.deformation?1-2.109375*Math.hypot(...o.deformation.displacement)/o.deformation.radius:1,l=Math.abs(this.distance(o,n))*a;l<=t&&l<r&&(s=o,r=l)}return s}surfacePoint(e,t){if(t>.02)return this.closestSurfacePoint(e,t);const n=this.nearest(e,t);if(!n)return this.closestSurfacePoint(e,t);const s=Jn(e),r=s.clone(),o=new b,a=Math.min(...n.volume.spacing)*.3;for(let l=0;l<10;l++){const c=this.distance(n,r);for(let h=0;h<3;h++){const u=r.clone(),d=r.clone();u.setComponent(h,u.getComponent(h)-a),d.setComponent(h,d.getComponent(h)+a),o.setComponent(h,(this.distance(n,d)-this.distance(n,u))/(2*a))}if(!Number.isFinite(c)||o.lengthSq()<1e-9)return this.closestSurfacePoint(e,t);if(Math.abs(c)<4e-5)break;r.addScaledVector(o,-c/o.lengthSq())}return r.distanceTo(s)>t||Math.abs(this.distance(n,r))>3e-4?this.closestSurfacePoint(e,t):(r.normal=o.normalize(),r.fragmentId=n.id,r)}closestSurfacePoint(e,t){const n=Jn(e);if(!Number.isFinite(t)||t<=0||!n.toArray().every(Number.isFinite))return null;let s=t*t,r=null;const o=new yn,a=new b,l=new b,c=new b,h=new b;for(const u of this.items.values()){if(u.box.distanceToPoint(n)>t)continue;const d=n.clone().sub(u.position).applyQuaternion(u.quaternion.clone().invert()),f=u.mesh.geometry,g=f.attributes.position,_=f.attributes.normal,m=f.index.array;for(let p=0;p<m.length;p+=3){const S=m[p],y=m[p+1],M=m[p+2];o.a.fromBufferAttribute(g,S),o.b.fromBufferAttribute(g,y),o.c.fromBufferAttribute(g,M),o.closestPointToPoint(d,a);const C=d.distanceToSquared(a);C>s||(s=C,o.getBarycoord(a,l),c.fromBufferAttribute(_,S).multiplyScalar(l.x),c.addScaledVector(h.fromBufferAttribute(_,y),l.y),c.addScaledVector(h.fromBufferAttribute(_,M),l.z),(!Number.isFinite(c.lengthSq())||c.lengthSq()<1e-12)&&o.getNormal(c),r=a.clone().applyQuaternion(u.quaternion).add(u.position),r.normal=c.clone().applyQuaternion(u.quaternion).normalize(),r.fragmentId=u.id)}}return r}attach(e,t,n){const s=this.items.get(e);if(!s)return!1;const r=To(n);return s.attachment={anchor:Jn(t).sub(s.position).applyQuaternion(s.quaternion.clone().invert()).toArray(),rotationOffset:r.clone().invert().multiply(s.quaternion).toArray()},s.held=!0,s.sleeping=!1,s.velocity.set(0,0,0),!0}move(e,t,n){const s=this.items.get(e);return!s?.held||!s.attachment?!1:(s.quaternion.copy(To(n)).multiply(To(s.attachment.rotationOffset)),s.position.copy(Jn(t)).sub(Jn(s.attachment.anchor).applyQuaternion(s.quaternion)),s.velocity.set(0,0,0),this.sync(s),!0)}release(e){const t=this.items.get(e);return t?(t.held=!1,t.attachment=null,t.sleeping=!1,t.contactTime=0,t.velocity.set(0,0,0),!0):!1}update(e){if(!Number.isFinite(e)||e<=0)return;const t=this.tissue.group.getWorldQuaternion(new Fe).invert(),n=new b(0,-9.81,0).applyQuaternion(t),s=new b(0,1,0).applyQuaternion(t),r=Math.max(1,Math.ceil(Math.min(.05,e)/.01)),o=Math.min(.05,e)/r;for(const a of this.items.values())if(!(a.held||a.sleeping)){for(let l=0;l<r;l++){a.velocity.addScaledVector(n,o).multiplyScalar(Math.exp(-o*1.6)),a.position.addScaledVector(a.velocity,o);let c=0,h=null,u=0;for(const f of a.support){const g=f.clone().applyQuaternion(a.quaternion).add(a.position),_=this.tissue.sampleDistance(g);Number.isFinite(_)&&_<c&&(c=_,h=g);const m=this.tissue.group.localToWorld(g.clone());u=Math.max(u,.959-m.y)}let d=!1;if(h&&c<-1e-4){const f=new b,g=6e-4;for(let m=0;m<3;m++){const p=h.clone(),S=h.clone();p.setComponent(m,p.getComponent(m)-g),S.setComponent(m,S.getComponent(m)+g),f.setComponent(m,(this.tissue.sampleDistance(S)-this.tissue.sampleDistance(p))/(2*g))}(!Number.isFinite(f.lengthSq())||f.lengthSq()<1e-8)&&f.copy(s),f.normalize(),a.position.addScaledVector(f,Math.min(.008,-c+2e-4));const _=a.velocity.dot(f);_<0&&a.velocity.addScaledVector(f,-_),d=!0}if(u>0){a.position.addScaledVector(s,u);const f=a.velocity.dot(s);f<0&&a.velocity.addScaledVector(s,-f),d=!0}if(d?(a.velocity.multiplyScalar(Math.exp(-o*18)),a.contactTime+=o):a.contactTime=0,a.contactTime>.3&&a.velocity.length()<.003){a.sleeping=!0,a.velocity.set(0,0,0);break}}this.sync(a)}}get metrics(){return{count:this.items.size,volumeMm3:[...this.items.values()].reduce((e,t)=>e+t.volumeMm3,0),pieces:[...this.items.values()].map(e=>({id:e.id,volumeMm3:e.volumeMm3,position:e.position.toArray(),quaternion:e.quaternion.toArray(),held:e.held,sleeping:e.sleeping}))}}}const Qn=i=>Array.isArray(i)?[...i]:[i.x,i.y,i.z],Ou=i=>i.map(e=>kr(e)),tl=(i,e,t)=>Math.max(e[0]-i[0],0,i[0]-t[0])**2+Math.max(e[1]-i[1],0,i[1]-t[1])**2+Math.max(e[2]-i[2],0,i[2]-t[2])**2,nl=(i,e,t=1)=>i>0&&(e>=0||i*t*t>=e*e);class MM{constructor(){this.group=new Ke,this.group.name="anatomical-liver-volume",this.ready=!1,this.busy=!1,this.removedVolumeMm3=0,this.totalVolumeMm3=0,this.voxelMm=1.5,this.error=null,this._meshes=new Map,this._cuts=[],this._cutGroups=[],this._cutGroupMap=new Map,this._indexedCuts=this._cuts,this._indexedCutCount=0,this._queryStats={queries:0,mappedGroups:0,evaluatedCutters:0,skippedGroups:0,skippedCutters:0},this._commands=[],this._epoch=0,this._sequence=0,this._inFlight=null,this._disposed=!1,this._deformation=null,this._affectedVertices=0,this._deformationStats={cacheBuilds:0,radiusUpdates:0,movedVertices:0},this.material=xM(),this.fragments=new yM(this),this._separations=[],this._excludedValues=new Map,this._restoringFragmentPoses=null}async load(e="./assets/liver-volume"){if(this._disposed)throw new Error("TissueVolume has been disposed");if(this.worker)throw new Error("This tissue volume has already been loaded");let t=String(e).replace(/\.(?:json|bin)$/,"");t.endsWith("/")&&(t+="liver-volume");const[n,s]=await Promise.all([fetch(`${t}.json`),fetch(`${t}.bin`)]);if(!n.ok||!s.ok)throw new Error("Could not load the anatomical liver volume");const[r,o]=await Promise.all([n.json(),s.arrayBuffer()]);return this.metadata=jd(r),this._baseField=new Float32Array(o.slice(0)),this.worker=new Worker(new URL(""+new URL("tissue-worker-B1cwF8Kn.js",import.meta.url).href,import.meta.url),{type:"module"}),this.worker.onmessage=({data:a})=>this._receive(a),this.worker.onerror=a=>this._fail(new Error(a.message||"Tissue geometry worker failed")),await this._enqueue({type:"init",metadata:r,buffer:o,transfer:[o]}),this.ready=!0,this.onChange?.(),this}cut(e,t){return this.cutSegment(e,e,t)}cutSegment(e,t,n){if(!this.ready||this._disposed)return Promise.resolve({changed:!1,removedMm3:0,reason:"not-ready"});let s;try{s=kr({a:Qn(e),b:Qn(t),radius:n,deformation:this._deformation})}catch(o){return Promise.reject(o)}const r=this._cuts.at(-1);return r&&s.radius===r.radius&&JSON.stringify(s)===JSON.stringify(r)?Promise.resolve({changed:!1,removedMm3:0,removedVolumeMm3:this.removedVolumeMm3}):this._cuts.length>=5e4?Promise.resolve({changed:!1,removedMm3:0,reason:"history-limit"}):(this._cuts.push(s),this._enqueue({type:"cut",cuts:[s]}))}snapshot(){return{version:2,cuts:Ou(this._cuts),deformation:this._deformation?Zi(this._deformation):null,separations:structuredClone(this._separations),fragments:this.fragments.snapshot()}}async restore(e){if(!this.ready||this._disposed)return{changed:!1,reason:"not-ready"};if(!e||![1,2].includes(e.version)||!Array.isArray(e.cuts)||e.cuts.length>5e4)throw new Error("Invalid tissue snapshot");const t=e.cuts.map(kr);this._epoch++;for(const n of this._commands.splice(0))n.resolve({changed:!1,cancelled:!0});return this._cuts=Ou(t),this._restoringFragmentPoses=new Map((e.fragments??[]).map(n=>[n.id,structuredClone(n)])),this.setGrasp(e.deformation??null),this._enqueue({type:"restore",cuts:t,separations:structuredClone(e.separations??[])})}reset(){return this.restore({version:1,cuts:[]})}toReferencePoint(e){return new b().fromArray(cc(Qn(e),this._deformation))}deformPoint(e){return new b().fromArray(Xs(Qn(e),this._deformation))}queryReferenceDistance(e){return this._sampleReferenceDistance(Qn(e))}getFragment(e){return this.fragments.items.get(e)??null}fragmentAtReference(e){return this.fragments.atReference(e)}findFragmentAt(e,t=.006){return this.fragments.nearest(e,t)?.id??null}findSpecimenGraspPoint(e,t=.35){return this.fragments.surfacePoint(e,t)}attachFragment(e,t,n){return this.fragments.attach(e,t,n)}moveHeldFragment(e,t,n){return this.fragments.move(e,t,n)}releaseFragment(e){return this.fragments.release(e)}updateFragments(e){this.fragments.update(e)}get fragmentMetrics(){return this.fragments.metrics}sampleDistance(e){if(!this._baseField)return 1/0;const t=Qn(e);return t.some(n=>!Number.isFinite(n))?1/0:this._sampleReferenceDistance(cc(t,this._deformation))}_sampleReferenceDistance(e){const t=this.metadata;if(e.some(a=>!Number.isFinite(a)))return 1/0;const n=e.map((a,l)=>(a-t.origin[l])/t.spacing[l]);if(n.some((a,l)=>a<0||a>t.dims[l]-1))return 1/0;const s=n.map((a,l)=>Math.min(Math.floor(a),t.dims[l]-2)),r=n.map((a,l)=>a-s[l]);let o=0;for(let a=0;a<=1;a++)for(let l=0;l<=1;l++)for(let c=0;c<=1;c++){const h=(c?r[0]:1-r[0])*(l?r[1]:1-r[1])*(a?r[2]:1-r[2]),u=Hn(t,s[0]+c,s[1]+l,s[2]+a);o+=h*(this._excludedValues.get(u)??this._baseField[u])}this._ensureCutIndex(),this._queryStats.queries++;for(const a of this._cutGroups){if(nl(tl(e,a.referenceLow,a.referenceHigh),o,a.minimumScale)){this._queryStats.skippedGroups++;continue}const l=a.deformation?Xs(e,a.deformation):e;if(this._queryStats.mappedGroups++,nl(tl(l,a.low,a.high),o)){this._queryStats.skippedGroups++;continue}for(const c of a.entries){if(o>=c.cut.radius||nl(tl(l,c.low,c.high),o)){this._queryStats.skippedCutters++;continue}o=Math.max(o,c.cut.radius-qd(l,c.cut.a,c.cut.b)),this._queryStats.evaluatedCutters++}}return o}_ensureCutIndex(){for((this._indexedCuts!==this._cuts||this._indexedCutCount>this._cuts.length)&&(this._cutGroups=[],this._cutGroupMap.clear(),this._indexedCuts=this._cuts,this._indexedCutCount=0);this._indexedCutCount<this._cuts.length;){const e=this._cuts[this._indexedCutCount++],t=e.deformation,n=t?[...t.local,...t.displacement,t.radius].join(","):"rest";let s=this._cutGroupMap.get(n);if(!s){const l=t?1-2.109375*Math.hypot(...t.displacement)/t.radius:1;s={deformation:t,minimumScale:l,entries:[],low:[1/0,1/0,1/0],high:[-1/0,-1/0,-1/0],referenceLow:[1/0,1/0,1/0],referenceHigh:[-1/0,-1/0,-1/0]},this._cutGroupMap.set(n,s),this._cutGroups.push(s)}const r=e.a.map((l,c)=>Math.min(l,e.b[c])-e.radius),o=e.a.map((l,c)=>Math.max(l,e.b[c])+e.radius),a=t?.displacement??[0,0,0];for(let l=0;l<3;l++)s.low[l]=Math.min(s.low[l],r[l]),s.high[l]=Math.max(s.high[l],o[l]),s.referenceLow[l]=Math.min(s.referenceLow[l],r[l]-Math.max(0,a[l])),s.referenceHigh[l]=Math.max(s.referenceHigh[l],o[l]-Math.min(0,a[l]));s.entries.push({cut:e,low:r,high:o})}}get queryMetrics(){return{...this._queryStats,groups:this._cutGroups.length,cuts:this._cuts.length}}contains(e,t=0){return this.sampleDistance(e)<=Math.max(0,Number.isFinite(t)?t:0)}findGraspPoint(e,t=.008){if(!this._baseField||!e||!Number.isFinite(t)||t<=0)return null;const n=this.fragments.surfacePoint(e,t);return n||this.findParentSurfacePoint(e,t)}findParentSurfacePoint(e,t=.008){if(!this._baseField||!e||!Number.isFinite(t)||t<=0)return null;const n=new b().fromArray(Qn(e)),s=this.sampleDistance(n);if(!Number.isFinite(s)||Math.abs(s)>t)return null;const r=n.clone(),o=new b,a=Math.min(...this.metadata.spacing)*.35;for(let l=0;l<12;l++){const c=this.sampleDistance(r);for(let u=0;u<3;u++){const d=r.clone(),f=r.clone();d.setComponent(u,d.getComponent(u)-a),f.setComponent(u,f.getComponent(u)+a),o.setComponent(u,(this.sampleDistance(f)-this.sampleDistance(d))/(2*a))}const h=o.lengthSq();if(!Number.isFinite(h)||h<1e-9)return null;if(Math.abs(c)<25e-6)break;r.addScaledVector(o,-c/h)}return!Number.isFinite(this.sampleDistance(r))||Math.abs(this.sampleDistance(r))>25e-5||r.distanceTo(n)>t*1.8?null:(r.normal=o.normalize(),r)}get graspMetrics(){const e=this._deformation;return{active:!!e,displacementMm:e?Math.hypot(...e.displacement)*1e3:0,radiusMm:e?e.radius*1e3:0,affectedVertices:this._affectedVertices,local:e?[...e.local]:null,displacement:e?[...e.displacement]:[0,0,0],model:"Invertible compact geometric displacement; not calibrated tissue mechanics"}}get deformationMetrics(){return{...this._deformationStats}}setGrasp(e,t){let n=null;try{e&&t?n=Zi({local:Qn(e),displacement:Qn(t)}):e?.local&&(n=Zi(e))}catch{return!1}if(n&&(n.radius<1e6&&(n.radius=Math.ceil(n.radius*1e3)/1e3),this._deformation&&n.local.every((s,r)=>s===this._deformation.local[r])&&(n.radius=Math.max(n.radius,this._deformation.radius))),JSON.stringify(n)===JSON.stringify(this._deformation))return!0;this._deformation=n,this._affectedVertices=0;for(const s of this._meshes.values())this._affectedVertices+=this._applyDeformation(s);return!0}_applyDeformation(e){const t=e.geometry,n=t.userData.restPositions,s=t.userData.restNormals,r=t.attributes.position.array,o=t.attributes.normal.array,a=this._deformation;if(!a)return t.userData.deformed&&(r.set(n),o.set(s),t.attributes.position.clearUpdateRanges(),t.attributes.normal.clearUpdateRanges(),t.attributes.position.needsUpdate=!0,t.attributes.normal.needsUpdate=!0,t.userData.deformed=!1,t.boundingSphere.copy(t.userData.restSphere),t.boundingBox.copy(t.userData.restBox)),0;const l=a.local.join(",");let c=t.userData.deformationCache,h=!1;if(c?.signature!==l||c.capacity<a.radius){this._deformationStats.cacheBuilds++,t.userData.deformed&&(r.set(n),o.set(s)),h=!!t.userData.deformed;const v=Math.max(.14,a.radius*1.5),x=[],A=[],D=t.userData.restBox,U=a.local;if(Math.max(D.min.x-U[0],0,U[0]-D.max.x)**2+Math.max(D.min.y-U[1],0,U[1]-D.max.y)**2+Math.max(D.min.z-U[2],0,U[2]-D.max.z)**2<v*v)for(let k=0;k<n.length;k+=3){const O=n[k]-U[0],K=n[k+1]-U[1],V=n[k+2]-U[2],Y=Math.sqrt(O*O+K*K+V*V);Y<v&&(x.push(k),A.push(Y))}c={signature:l,capacity:v,indices:new Uint32Array(x),distances:new Float32Array(A),weights:new Float32Array(x.length),gradients:new Float32Array(x.length*3),radius:0,maximumWeight:0,activeCount:0},t.userData.deformationCache=c}const[u,d,f]=a.displacement,[g,_,m]=a.local,p=a.radius,S=1/p,y=S*S,M=c.radius!==p;M&&this._deformationStats.radiusUpdates++;let C=0,P=0,R=1/0,T=-1/0;for(let v=0;v<c.indices.length;v++){const x=c.indices[v],A=v*3;let D=c.weights[v];if(M){const ue=c.distances[v];if(ue>=p){c.weights[v]=0;continue}const Ae=ue*S,Qe=1-Ae,tt=Qe*Qe;D=tt*tt*(4*Ae+1);const je=-20*tt*Qe*y;c.weights[v]=D,c.gradients[A]=(n[x]-g)*je,c.gradients[A+1]=(n[x+1]-_)*je,c.gradients[A+2]=(n[x+2]-m)*je}if(!D)continue;C++,P=Math.max(P,D),R=Math.min(R,x),T=Math.max(T,x);const U=c.gradients[A],L=c.gradients[A+1],k=c.gradients[A+2];r[x]=n[x]+u*D,r[x+1]=n[x+1]+d*D,r[x+2]=n[x+2]+f*D;const O=(s[x]*u+s[x+1]*d+s[x+2]*f)/(1+U*u+L*d+k*f),K=s[x]-U*O,V=s[x+1]-L*O,Y=s[x+2]-k*O,ne=Math.sqrt(K*K+V*V+Y*Y)||1;o[x]=K/ne,o[x+1]=V/ne,o[x+2]=Y/ne}if(c.radius=p,c.maximumWeight=P,c.activeCount=C,this._deformationStats.movedVertices+=C,(C||t.userData.deformed)&&(t.attributes.position.clearUpdateRanges(),t.attributes.normal.clearUpdateRanges(),!h&&C&&(t.attributes.position.addUpdateRange(R,T-R+3),t.attributes.normal.addUpdateRange(R,T-R+3)),t.attributes.position.needsUpdate=!0,t.attributes.normal.needsUpdate=!0),C||t.userData.deformed){const v=Math.sqrt(u*u+d*d+f*f)*P;t.boundingSphere.copy(t.userData.restSphere),t.boundingSphere.radius+=v,t.boundingBox.copy(t.userData.restBox).expandByScalar(v)}return t.userData.deformed=!!C,C}_enqueue(e){return this.worker?(this.busy=!0,new Promise((t,n)=>{this._commands.push({...e,epoch:this._epoch,resolve:t,reject:n}),queueMicrotask(()=>this._flush())})):Promise.reject(new Error("Tissue worker is not available"))}_flush(){if(this._inFlight||!this._commands.length||this._disposed)return;const e=this._commands.shift(),t=[e];if(e.type==="cut")for(;this._commands[0]?.type==="cut"&&this._commands[0].epoch===e.epoch&&e.cuts.length<256;){const a=this._commands.shift();t.push(a),e.cuts.push(...a.cuts)}e.id=++this._sequence,this._inFlight={command:e,callbacks:t};const{resolve:n,reject:s,transfer:r,...o}=e;this.worker.postMessage(o,r??[])}_receive(e){const t=this._inFlight;if(!(!t||e.id!==t.command.id)){if(this._inFlight=null,e.error){const n=new Error(e.error);this.error=n,t.callbacks.forEach(s=>s.reject(n))}else if(e.epoch!==this._epoch)t.callbacks.forEach(n=>n.resolve({changed:!1,cancelled:!0}));else{if(e.exclusions?.reset&&this._excludedValues.clear(),e.exclusions)for(let s=0;s<e.exclusions.nodeIndices.length;s++)this._excludedValues.set(e.exclusions.nodeIndices[s],e.exclusions.positiveValues[s]);(e.type==="init"||e.type==="restore")&&this.fragments.clear();for(const s of e.fragments??[])this.fragments.add(s,this._restoringFragmentPoses?.get(s.id));e.separations&&(this._separations=structuredClone(e.separations)),e.type==="restore"&&(this._restoringFragmentPoses=null);for(const s of e.chunks)this._replaceChunk(s);Object.assign(this,e.statistics);const n={changed:!!e.changedSamples||e.type!=="cut",removedMm3:e.removedMm3,removedVolumeMm3:this.removedVolumeMm3,totalVolumeMm3:this.totalVolumeMm3,fragments:(e.fragments??[]).map(s=>s.id)};t.callbacks.forEach(s=>s.resolve(n)),this.onChange?.(n)}this.busy=!!this._commands.length,this._flush()}}_replaceChunk(e){const t=this._meshes.get(e.key);if(t?.geometry.userData.deformed&&(this._affectedVertices-=t.geometry.userData.deformationCache?.activeCount??0),t&&(t.geometry.dispose(),this.group.remove(t),this._meshes.delete(e.key)),!e.positions.length)return;const n=new Lt;n.userData.restPositions=e.positions,n.userData.restNormals=e.normals,n.setAttribute("position",new ct(e.positions.slice(),3).setUsage(oh)),n.setAttribute("normal",new ct(e.normals.slice(),3).setUsage(oh)),n.setAttribute("color",new ct(e.colors,3)),n.setAttribute("tissueRestPosition",new ct(e.positions,3)),n.setAttribute("tissueCutMask",new ct(e.cutMasks??new Float32Array(e.positions.length/3),1)),n.setIndex(new ct(e.indices,1)),n.computeBoundingSphere(),n.userData.restSphere=n.boundingSphere.clone(),n.computeBoundingBox(),n.userData.restBox=n.boundingBox.clone();const s=new qe(n,this.material);s.name=`liver-chunk-${e.key}`,s.castShadow=!0,s.receiveShadow=!0,s.layers.enable(1),s.userData.tissue=!0,this._affectedVertices+=this._applyDeformation(s),this.group.add(s),this._meshes.set(e.key,s)}_fail(e){this.error=e,this.busy=!1,this._inFlight?.callbacks.forEach(t=>t.reject(e)),this._inFlight=null;for(const t of this._commands.splice(0))t.reject(e)}dispose(){this._disposed=!0,this.ready=!1,this.worker?.terminate(),this._fail(new Error("Tissue volume disposed"));for(const e of this._meshes.values())e.geometry.dispose();this.fragments.clear(),this._excludedValues.clear(),this._meshes.clear(),this.group.clear(),this.material.dispose(),this._baseField=null}}const ji=i=>i==null?null:structuredClone(i),Si=(i,e)=>i.group.worldToLocal(new b(...e));class SM{constructor(e,t,{onMessage:n=()=>{},onEvent:s=()=>{},toolDirection:r,toolQuaternion:o}={}){this.sim=e,this.tissue=t,this.onMessage=n,this.onEvent=s,this.toolDirection=r,this.toolQuaternion=o,this.grasp=null,this.relaxing=null,this.cuttingBusy=!1,this.lastCut=null,this.contact={left:!1,right:!1,rightDepthMm:0,cutting:!1},this._generation=0,this._fragmentRebaseId=null}snapshot(){return{version:3,tissue:this.tissue.snapshot(),grasp:ji(this.grasp),relaxing:ji(this.relaxing)}}async restore(e){const t=++this._generation;this._fragmentRebaseId=null,this.lastCut=null,this.relaxing=null,await this.tissue.restore(e?.tissue??e),t===this._generation&&(this.grasp=ji(e?.grasp),this.grasp&&(this.grasp.kind??=this.grasp.fragmentId!=null?"fragment":"tissue",Object.hasOwn(this.grasp,"reference")||(this.grasp.reference=this.grasp.kind==="fragment"?null:[...this.grasp.local])),this.relaxing=ji(e?.relaxing),this.grasp?.kind==="fragment"&&(this._fragmentRebaseId=this.grasp.fragmentId),this.grasp?.kind!=="fragment"&&this.applyGrasp())}release(e=!1){this._fragmentRebaseId=null;const t=this.grasp;t?.kind==="fragment"?this.tissue.releaseFragment?.(t.fragmentId):t&&!e&&(this.relaxing={...ji(t),remaining:1}),this.grasp=null,e&&(this.relaxing=null,this.tissue.setGrasp(null)),this.onEvent("release",{kind:t?.kind??"tissue",fragmentId:t?.fragmentId??null})}_toolQuaternionLocal(e="left"){const t=this.toolQuaternion?.(e);let n;if(t?.isQuaternion)n=t.clone();else if(Array.isArray(t)&&t.length===4&&t.every(Number.isFinite))n=new Fe().fromArray(t);else{const s=this.sim.state.tools[e],r=new b(...s.position).sub(new b(...s.port));r.lengthSq()<1e-16?r.set(0,0,1):r.normalize(),n=new Fe().setFromUnitVectors(new b(0,0,1),r).multiply(new Fe().setFromEuler(new Sn(s.wrist[0],s.wrist[1],s.wrist[2],"XYZ")))}return this.tissue.group.getWorldQuaternion(new Fe).invert().multiply(n).normalize()}_attachFragment(e,t=null,{transition:n=!1,surfaceAnchor:s=null}={}){if(e==null||!this.tissue.getFragment?.(e))return!1;const r=Si(this.tissue,this.sim.state.tools.left.position);if(this.tissue.attachFragment?.(e,s??r,this._toolQuaternionLocal())===!1)return!1;const o=this.grasp;return n&&o?.kind!=="fragment"&&(this.relaxing={...ji(o),remaining:1},this.tissue.setGrasp(null)),this.grasp={kind:"fragment",fragmentId:e,local:r.toArray(),reference:t?[...t]:null,displacement:[0,0,0]},this._fragmentRebaseId=null,this.onEvent("fragment-grasp",{fragmentId:e,transition:n}),this.onMessage(n?"切断已确认：左钳现夹持独立组织块，可移动、旋转，V 松开":"已夹住切离组织块：可移动和旋转，V 松开放下"),!0}_reconcileDetachedGrasp(){if(!this.grasp||this.grasp.kind==="fragment")return!1;const e=this.grasp.reference??this.grasp.local,t=this.tissue.fragmentAtReference?.(new b(...e));let n=t?.id??(typeof t=="string"||typeof t=="number"?t:null);if(n==null&&!this.tissue.fragmentAtReference){const s=this.tissue.deformPoint?.(new b(...e))??Si(this.tissue,this.sim.state.tools.left.position);n=this.tissue.findFragmentAt?.(s,.005)??null}return n!=null?this._attachFragment(n,e,{transition:!0}):!1}applyGrasp(){if(!this.grasp)return;if(this.grasp.kind==="fragment"){if(!this.tissue.getFragment?.(this.grasp.fragmentId)){this.grasp=null,this._fragmentRebaseId=null,this.onMessage("该组织块已不存在，左钳夹持已解除");return}if(this.sim.state.paused)return;const n=Si(this.tissue,this.sim.state.tools.left.position),s=this._toolQuaternionLocal();if(this._fragmentRebaseId===this.grasp.fragmentId){if(this.tissue.attachFragment?.(this.grasp.fragmentId,n,s)===!1)return;this._fragmentRebaseId=null}this.tissue.moveHeldFragment?.(this.grasp.fragmentId,n,s);return}const t=Si(this.tissue,this.sim.state.tools.left.position).sub(new b(...this.grasp.local));this.grasp.displacement=t.toArray(),this.tissue.setGrasp(new b(...this.grasp.local),t)}updateGrasp(e){const t=this.sim.state.tools.left;if(this._reconcileDetachedGrasp(),t.jaw>.32&&this.grasp&&this.release(),t.jaw<.16&&!this.grasp&&!this.relaxing){const n=Si(this.tissue,t.position),s=this.tissue.findGraspPoint(n,.006);if(s)if(s.fragmentId!=null)this._attachFragment(s.fragmentId,s.reference?.toArray?.()??null,{surfaceAnchor:s});else{const r=this.tissue.toReferencePoint?.(s)??s;this.grasp={kind:"tissue",fragmentId:null,local:r.toArray(),reference:r.toArray(),displacement:[0,0,0]},this.onEvent("grasp"),this.onMessage("左钳已夹住肝包膜：按 E 抬起，组织会随钳尖牵拉；V 松开")}}this.grasp&&this.applyGrasp(),(!this.grasp||this.grasp.kind==="fragment")&&this.relaxing?(this.relaxing.remaining*=Math.exp(-e*11),this.tissue.setGrasp(new b(...this.relaxing.local),new b(...this.relaxing.displacement).multiplyScalar(this.relaxing.remaining)),this.relaxing.remaining<.008&&(this.relaxing=null,this.tissue.setGrasp(null))):(!this.grasp||this.grasp.kind==="fragment")&&this.tissue.setGrasp(null)}async update(e,{clutched:t=!1}={}){if(!this.tissue.ready||this.sim.state.paused)return;this.updateGrasp(e),this.tissue.updateFragments?.(e);const{left:n,right:s}=this.sim.state.tools,r=Si(this.tissue,n.position),o=this.tissue.sampleDistance(r),a=this.tissue.findFragmentAt?.(r,.006)??null,l=Si(this.tissue,s.position),c=this.tissue.sampleDistance(l);if(this.contact.left=o<.006||a!=null,this.contact.leftFragmentId=a,this.contact.right=c<.0032,this.contact.rightDepthMm=Number.isFinite(c)?-c*1e3:0,this.contact.cutting=!1,!this.sim.state.cutting||s.jaw>.22||t){this.lastCut=null;return}if(this.cuttingBusy||this.tissue.busy)return;const h=this.tissue.graspMetrics?.displacement??this.grasp?.displacement??[0,0,0];if(this.lastCut&&l.distanceTo(this.lastCut.point)<55e-5&&new b(...h).distanceTo(this.lastCut.deformation)<55e-5)return;const u=this.toolDirection?.("right")?.clone()??new b(...s.position).sub(new b(...s.port)).normalize(),d=this.tissue.group.getWorldQuaternion(new Fe).invert();u.applyQuaternion(d).normalize();const f=l.clone().addScaledVector(u,-.008);if(!(c>.0032&&this.tissue.sampleDistance(f)>.0032)){this.lastCut={point:l.clone(),deformation:new b(...h)},this.cuttingBusy=!0,this.contact.cutting=!0;try{const g=this._generation,_=this.tissue.removedVolumeMm3;if(await this.tissue.cutSegment(f,l,.0024),g!==this._generation)return;this._reconcileDetachedGrasp(),this.tissue.removedVolumeMm3>_&&this.onEvent("cut",{volumeMm3:this.tissue.removedVolumeMm3})}finally{this.cuttingBusy=!1}}}get metrics(){return{...this.contact,grasp:ji(this.grasp),deformation:this.tissue.graspMetrics,cuttingBusy:this.cuttingBusy,heldFragmentId:this.grasp?.kind==="fragment"?this.grasp.fragmentId:null}}}function ku(i,e,t=.08){const n=i.findGraspPoint(Si(i,e),t);if(!n)return null;const s=(n.normal??new b(0,0,1)).clone().applyQuaternion(i.group.getWorldQuaternion(new Fe)).normalize();return{point:i.group.localToWorld(n.clone()),normal:s,fragmentId:n.fragmentId??null,reference:(i.toReferencePoint?.(n)??n).clone()}}const Bu=i=>i*i*(3-2*i),wM={left:[-.025,1.106,-.015],right:[.025,1.108,-.015]};function bM(i,{depth:e=.012,cutRadius:t=.0024}={}){if(!i.queryReferenceDistance||!i.metadata)return[];const n=i.metadata,s=Math.max(...n.spacing),r=Math.min(t*1.45,Math.max(.0025,s*1.8)),o=n.bounds??[n.origin.map(c=>c+s*2),n.origin.map((c,h)=>c+(n.dims[h]-3)*n.spacing[h])],a=c=>i.queryReferenceDistance(new b(...c)),l=[];for(let c=0;c<3;c++)for(const h of[-1,1]){const u=[0,1,2].filter(x=>x!==c),d=o[h>0?1:0][c],f=d-h*e,g=[];let _=1/0,m=-1/0,p=1/0,S=-1/0;for(let x=o[0][u[1]]-r;x<=o[1][u[1]]+r;x+=r)for(let A=o[0][u[0]]-r;A<=o[1][u[0]]+r;A+=r){const D=[0,0,0];D[c]=f,D[u[0]]=A,D[u[1]]=x;const U=a(D);U<=t&&(_=Math.min(_,A),m=Math.max(m,A),p=Math.min(p,x),S=Math.max(S,x)),U<0&&g.push({point:D,distance:U})}if(g.length<4||!Number.isFinite(_))continue;g.sort((x,A)=>x.distance-A.distance);let y=null,M=-1/0;for(const x of g.slice(0,24)){const A=[...x.point];let D=d+h*s*2;for(let U=D;h*(U-f)>=0;U-=h*s*.65){if(A[c]=U,a(A)<=0){let L=U,k=D;for(let O=0;O<12;O++)A[c]=(L+k)*.5,a(A)<=0?L=A[c]:k=A[c];A[c]=(L+k)*.5,h*A[c]>M&&(y=[...A],M=h*A[c]);break}D=U}}if(!y||h*(y[c]-f)<t*2+s)continue;const C=new b().setComponent(c,h),P=C.clone().applyQuaternion(i.group.getWorldQuaternion(new Fe)).normalize();_-=t*1.5,m+=t*1.5,p-=t*1.5,S+=t*1.5;const R=Math.max(2,Math.ceil((S-p)/r)+1),T=[];for(let x=0;x<R;x++){const A=p+(S-p)*x/(R-1);for(const D of x%2?[m,_]:[_,m]){const U=[0,0,0];U[c]=f,U[u[0]]=D,U[u[1]]=A,T.push(new b(...U))}}const v=T.slice(1).reduce((x,A,D)=>x+A.distanceTo(T[D]),0);v>2.8||l.push({axis:c,sign:h,plane:f,normal:C,worldNormal:P,referenceAnchor:new b(...y),path:T,cutRadius:t,rowSpacing:(S-p)/(R-1),length:v,score:v*(P.y<-.25?1.5:1)})}return l.sort((c,h)=>c.score-h.score)}class EM{constructor(e,t,n,{onMessage:s=()=>{},onChange:r=()=>{}}={}){Object.assign(this,{sim:e,tissue:t,interaction:n,onMessage:s,onChange:r}),this.active=!1,this.mode=null}stop(e="已结束自动操作，可继续手动控制"){this.active&&(this.active=!1,this.sim.setCutting(!1),this.interaction.lastCut=null,this.onChange(),e&&this.onMessage(e))}move(e,t){return this.sim.moveToolTo(e,t).limited?(this.stop("自动路径被另一器械挡住；请先移开另一器械，再重新就位"),!1):!0}approach(){const e=this.sim.state.selected;if(e==="scope"){this.onMessage("先选左钳或右剪，再进行表面就位");return}const t=this.sim.state.tools[e],n=ku(this.tissue,t.position)??ku(this.tissue,wM[e]);if(!n){this.onMessage("当前区域没有可接近的组织表面");return}this.sim.checkpoint("器械表面就位",this.interaction.snapshot()),e==="left"&&this.interaction.release(!0),this.sim.setCutting(!1),this.sim.setJaw(e,.7),this.mode="approach",this.active=!0,this.time=0,this.side=e,this.approachFragment=null,this.start=new b(...t.position),this.end=n.point.addScaledVector(n.normal,.001),this.onMessage(`${e==="left"?"左钳":"右剪"}正在贴近实际肝表面`),this.onChange()}approachSpecimen(){if(this.interaction.grasp)return this.onMessage("左钳正在夹持组织，请先按 V 松开后再接近标本"),!1;if(this.sim.state.paused)return this.onMessage("请先继续仿真，再接近标本"),!1;const e=this.tissue.fragmentMetrics?.pieces??[],t=new Set(e.filter(c=>!c.held).map(c=>c.id));if(!t.size)return this.onMessage(e.length?"独立组织块正被夹持，请先松开":"目前没有独立标本；请先完成真实切离"),!1;const n=this.sim.state.tools.left,s=this.tissue.group.worldToLocal(new b(...n.position)),r=this.tissue.findSpecimenGraspPoint?.(s,.35),o=r?.fragmentId!=null?this.tissue.getFragment?.(r.fragmentId):null;if(!o||!t.has(o.id))return this.onMessage("附近 35 cm 内未找到可接近的独立标本表面，不会退回母体"),!1;const a=(r.normal??new b(0,1,0)).clone().normalize(),l=o.quaternion.clone().invert();return this.sim.checkpoint("左钳接近独立标本",this.interaction.snapshot()),this.sim.select("left"),this.sim.setCutting(!1),this.sim.setJaw("left",.75),this.mode="approach",this.active=!0,this.time=0,this.side="left",this.start=new b(...n.position),this.approachFragment={id:o.id,anchor:r.clone().sub(o.position).applyQuaternion(l),normal:a.applyQuaternion(l)},this.end=this.tissue.group.localToWorld(r.clone()),this.onMessage("左钳正在接近最近的独立标本，标本移动时目标会随动；就位后按 C 重抓"),this.onChange(),!0}startExample(){if(this.active){this.stop();return}if(this.tissue.busy){this.onMessage("组织更新中，请稍候再开始示范");return}const e=bM(this.tissue);let t=null;for(const n of e)if(t=this._preparePlan(n),t)break;if(!t){this.onMessage("当前器官没有可安全到达的薄缘切离路径；请移开器械或重置完整器官后重试");return}Object.assign(this,t),this.sim.checkpoint("真实切离、夹持与移开示范",this.interaction.snapshot()),this.interaction.release(!0),this.sim.setCutting(!1),this.sim.setPaused(!1),this.sim.select("right"),this.sim.setScopeFollow(!0,"grasp"),this.leftStart=new b(...this.sim.state.tools.left.position),this.rightStart=new b(...this.sim.state.tools.right.position),this.sim.setJaw("left",.75),this.sim.setJaw("right",.85),this.active=!0,this.mode="example",this.time=0,this.phaseTime=0,this.phase="park",this.pathIndex=0,this.pathPoint=this.plan.path[0].clone(),this.rasterTravel=0,this.onMessage("切离示范：抓持器官薄缘 → 实际栅格切断基底 → 确认独立组织块后移开"),this.onChange()}_preparePlan(e){const t=f=>this.tissue.group.localToWorld(f.clone()),n=t(e.referenceAnchor),s=new b(0,1,0),r=n.clone().addScaledVector(e.worldNormal,6e-4),o=r.clone().addScaledVector(e.worldNormal,.022).addScaledVector(s,.012),a=o.clone().addScaledVector(e.worldNormal,.045).addScaledVector(s,.025),l=this.tissue.group.worldToLocal(o.clone()).sub(e.referenceAnchor),c=Zi({local:e.referenceAnchor.toArray(),displacement:l.toArray()}),h=f=>t(new b(...Xs(f.toArray(),c))),u=h(e.path[0]),d=[new b(...this.sim.state.tools.right.position),u.clone().addScaledVector(e.worldNormal,.035).addScaledVector(s,.018),u.clone().addScaledVector(e.worldNormal,.07).addScaledVector(s,.05)];for(const f of d)try{const g=new this.sim.constructor;g.restore(this.sim.snapshot()),g.setPaused(!1),g.setJaw("left",.75),g.setJaw("right",.85);let _=g.moveToolTo(f.toArray(),"right").limited||g.moveToolTo(r.toArray(),"left").limited;g.setJaw("left",0),_||=g.moveToolTo(o.toArray(),"left").limited||g.moveToolTo(u.toArray(),"right").limited,g.setJaw("right",0);for(const m of e.path)if(_||g.moveToolTo(h(m).toArray(),"right").limited){_=!0;break}if(!_)return{plan:e,leftRest:r,leftLift:o,leftAway:a,rightStandby:f}}catch{continue}return null}_phase(e,t){this.phase=e,this.phaseTime=0,t&&this.onMessage(t),this.onChange()}_displayReference(e){return this.tissue.group.localToWorld((this.tissue.deformPoint?.(e)??e).clone())}_beginFragmentMove(){this.sim.setCutting(!1),this.rightRetractStart=new b(...this.sim.state.tools.right.position);const e=new b(...this.sim.state.tools.left.position),t=new b(0,1,0),n=new b(...this.sim.state.tools.right.port).sub(this.rightRetractStart).normalize(),s=[.05,.08,.03,.12].map(a=>this.rightRetractStart.clone().addScaledVector(n,a)),r=[this.leftAway,e.clone().addScaledVector(this.plan.worldNormal,.02).addScaledVector(t,.05),e.clone().addScaledVector(this.plan.worldNormal,.06).addScaledVector(t,.045)];let o=null;for(const a of s){for(const l of r){const c=new this.sim.constructor;if(c.restore(this.sim.snapshot()),c.setPaused(!1),!c.moveToolTo(a.toArray(),"right").limited&&(c.setJaw("right",.75),!(c.state.tools.right.jaw<.7||c.moveToolTo(l.toArray(),"left").limited))){o={rightTarget:a,leftTarget:l};break}}if(o)break}if(!o){this.stop("独立组织块已切离并仍由左钳夹持，但没有通过双器械防碰撞的自动移开路径，请手动退出右剪");return}this.rightRetractEnd=o.rightTarget,this.leftAway=o.leftTarget,this._phase("retract","基底已真正断开：独立组织块仍在左钳上，先退出右剪再移开")}update(e){if(!this.active||this.sim.state.paused)return;if(this.time+=e,this.mode==="approach"){if(this.approachFragment){const n=this.tissue.getFragment?.(this.approachFragment.id);if(!n||n.held){this.stop("目标标本已不存在或已被夹持，接近操作已停止");return}const s=this.approachFragment.normal.clone().applyQuaternion(n.quaternion).normalize();this.end=this.tissue.group.localToWorld(this.approachFragment.anchor.clone().applyQuaternion(n.quaternion).add(n.position).addScaledVector(s,7e-4))}if(!this.move(this.start.clone().lerp(this.end,Bu(Math.min(1,this.time/1.1))).toArray(),this.side))return;this.time>=1.1&&(this.active=!1,this.onMessage(this.approachFragment?"已接近独立标本表面：按 C 闭合重抓，随后可移动或旋转":"已贴近组织表面：C 闭合，E 抬起；右剪需开启剪切"),this.onChange());return}if(["close-right","raster","wait-separation"].includes(this.phase)&&this.interaction.grasp?.kind==="fragment"){this._beginFragmentMove();return}this.phaseTime+=e;const t=n=>Bu(Math.min(1,this.phaseTime/n));if(this.phase==="park"){if(!this.move(this.rightStart.clone().lerp(this.rightStandby,t(1.1)).toArray(),"right"))return;this.phaseTime>=1.1&&this._phase("approach-left")}else if(this.phase==="approach-left"){if(!this.move(this.leftStart.clone().lerp(this.leftRest,t(1.2)).toArray(),"left"))return;this.phaseTime>=1.2&&this._phase("close-left","左钳正在夹住实际薄缘表面")}else if(this.phase==="close-left")this.sim.setJaw("left",.75*(1-t(.6))),this.phaseTime>=.7&&this.interaction.grasp?.kind==="tissue"?this._phase("lift","左钳牵拉薄缘，右剪将完整扫过其基底"):this.phaseTime>1.3&&this.stop("未成功抓住附着组织，示范已停止；请重置或重新表面就位");else if(this.phase==="lift"){if(!this.move(this.leftRest.clone().lerp(this.leftLift,t(1.5)).toArray(),"left"))return;this.phaseTime>=1.5&&(this.rightBeforeCut=new b(...this.sim.state.tools.right.position),this._phase("approach-cut"))}else if(this.phase==="approach-cut"){if(!this.move(this.rightBeforeCut.clone().lerp(this._displayReference(this.plan.path[0]),t(1.2)).toArray(),"right"))return;this.phaseTime>=1.2&&(this.sim.setCutting(!0),this._phase("close-right","右剪闭合，实际扫切完整基底平面；不会用模型替换制造组织块"))}else if(this.phase==="close-right")this.sim.setJaw("right",.85*(1-t(.6))),this.phaseTime>=.7&&this._phase("raster");else if(this.phase==="raster"){if(this.tissue.busy||this.interaction.cuttingBusy)return;const n=this.plan.path[this.pathIndex+1];if(!n){this.sim.setCutting(!1),this.sim.setJaw("right",.7),this._phase("wait-separation","基底扫描完成，正在确认真实体素连通性");return}const s=this.pathPoint.distanceTo(n),r=Math.min(85e-5,.028*e,s);if(s>1e-10&&this.pathPoint.lerp(n,r/s),this.rasterTravel+=r,!this.move(this._displayReference(this.pathPoint).toArray(),"right"))return;s<=r+1e-10&&this.pathIndex++}else if(this.phase==="wait-separation")!this.tissue.busy&&!this.interaction.cuttingBusy&&this.phaseTime>2?this.stop("扫描后该处组织仍相连，未生成独立块；示范已停止，可继续补切或撤销"):this.phaseTime>12&&this.stop("组织拓扑更新尚未完成，未宣称切离成功；请等待后检查");else if(this.phase==="retract"){if(!this.move(this.rightRetractStart.clone().lerp(this.rightRetractEnd,t(1)).toArray(),"right"))return;this.phaseTime>=1&&(this.sim.setJaw("right",.75),this.fragmentMoveStart=new b(...this.sim.state.tools.left.position),this._demoRoll=0,this._phase("move-fragment","左钳正在搬走并旋转真实切离块，母体已独立回弹"))}else if(this.phase==="move-fragment"){const n=t(2.2);if(!this.move(this.fragmentMoveStart.clone().lerp(this.leftAway,n).toArray(),"left"))return;const s=n*Math.PI*.65;this.sim.adjustWrist(2,s-this._demoRoll,"left"),this._demoRoll=s,this.phaseTime>=2.2&&(this.sim.select("left"),this.stop("切离确认完成：左钳夹持的独立组织块已移开并旋转，V 可松开放下；可撤销或重置"))}}}const zu=new WeakMap,Us=i=>Array.isArray(i)&&i.length===3&&i.every(Number.isFinite),Vu=(i,e)=>i.map((t,n)=>(t+e[n])*.5),Ai=i=>new b().fromArray(i);function TM(i,e){let t=zu.get(i);t||(t=new WeakMap,zu.set(i,t));let n=t.get(e);return n||(n={queriedAt:-1/0,surface:null,lastSpecimenId:null,epoch:e._epoch,scopeReference:null},t.set(e,n)),n}function AM(i){const e=i.metadata?.bounds;if(!Array.isArray(e)||e.length!==2||!e.every(Us)||e[0].some((s,r)=>s>e[1][r]))return null;const t=new Gn(Ai(e[0]),Ai(e[1])),n=i.graspMetrics?.displacement;return Us(n)&&(t.min.add(Ai(n.map(s=>Math.min(0,s)))),t.max.add(Ai(n.map(s=>Math.max(0,s))))),{local:t,world:t.clone().applyMatrix4(i.group.matrixWorld)}}function RM(i,e,t){const n=i.fragmentMetrics?.pieces??[],s=e?.grasp?.fragmentId,r=n.find(c=>s!=null&&c.id===s)||n.find(c=>c.held)||n.find(c=>c.id===t.lastSpecimenId)||n.at(-1);if(!r)return t.lastSpecimenId=null,null;const o=i.getFragment?.(r.id),a=o?.mesh;if(!a?.geometry||(a.geometry.boundingSphere||a.geometry.computeBoundingSphere(),!a.geometry.boundingSphere))return null;a.updateWorldMatrix(!0,!1);const l=a.geometry.boundingSphere.clone().applyMatrix4(a.matrixWorld);return!Number.isFinite(l.radius)||l.radius<0||!Us(l.center.toArray())?null:(t.lastSpecimenId=r.id,{id:r.id,position:l.center.toArray(),radius:l.radius})}function CM(i,e,t,n=globalThis.performance?.now?.()??Date.now()){if(!i?.state?.scope||!e?.group)throw new TypeError("Scope context requires a simulation and tissue group.");if(!Number.isFinite(n))throw new TypeError("Scope context timestamp must be finite milliseconds.");const s=TM(i,e),r=i.state,o=r.scope;e.group.updateWorldMatrix(!0,!1),(s.scopeReference!==o||s.epoch!==e._epoch)&&(s.scopeReference=o,s.epoch=e._epoch,s.queriedAt=-1/0,s.surface=Us(o.fieldAnchor)?e.group.worldToLocal(Ai(o.fieldAnchor)):null,s.lastSpecimenId=o.heldSpecimen?.id??null);const a=AM(e),l=t?.grasp?[...r.tools.left.position]:null,c=!!(r.cutting||t?.grasp&&r.activeTool==="right");let h;if(o.followMode==="grasp"&&l?h=c?Vu(l,r.tools.right.position):l:o.followMode==="midpoint"||o.followMode==="grasp"?h=Vu(r.tools.left.position,r.tools.right.position):h=[...r.tools[r.activeTool].position],!s.surface&&Us(o.fieldAnchor)&&(s.surface=e.group.worldToLocal(Ai(o.fieldAnchor))),(n<s.queriedAt||n-s.queriedAt>=150||s.epoch!==e._epoch)&&e.ready!==!1&&typeof e.findParentSurfacePoint=="function"){s.queriedAt=n,s.epoch=e._epoch;const d=e.group.worldToLocal(Ai(h));a&&a.local.clampPoint(d,d);const f=e.findParentSurfacePoint(d,.18),g=f?.isVector3?f.toArray():f;Us(g)&&(s.surface=Ai(g))}return{graspTarget:l,operating:c,surfaceTarget:s.surface?e.group.localToWorld(s.surface.clone()).toArray():null,organBounds:a?{min:a.world.min.toArray(),max:a.world.max.toArray()}:null,heldSpecimen:RM(e,t,s)}}const PM={left:"左",right:"右"};function Hu(i,e){const t=PM[i]||"";return e?.part==="jaw"?t+(i==="right"?"剪口":"钳口"):e?.part==="wrist"?t+"腕部":e?.part==="shaft"?t+(e.section==="outside"?"体外杆身":e.section==="inside"?"体内杆身":"杆身"):t+"器械"}function DM(i,e="endo"){const t=i?.blocked===!0,n=i?.contact===!0;if(!t&&!n)return{blocked:!1,contact:!1,status:"双器械防碰撞",notice:"",detail:""};const s=i?.pair,r=Hu("left",s?.left)+"与"+Hu("right",s?.right),o=s?.left?.section==="outside"||s?.right?.section==="outside",a=Number.isFinite(i?.clearance)?Math.max(0,i.clearance)*1e3:null,l=r+(t?"接触 · 已阻止靠近":"近接触"),c=t?r+"接触，已阻止继续靠近；反向移动可离开。"+(o&&e==="endo"?"体外接触请切系统总览查看。":""):"",h=l+(a===null?"":"；估算间隙 "+a.toFixed(2)+" mm");return{blocked:t,contact:n,status:l,notice:c,detail:h}}const Q=i=>document.getElementById(i),IM="./",Br=new Set,zr=new Set,LM=new Set(["KeyW","KeyA","KeyS","KeyD","KeyQ","KeyE","KeyZ","KeyX","KeyC","KeyV","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","BracketLeft","BracketRight","Space","ShiftLeft","ShiftRight"]);let ke,Xe,Le,Tt,Et,oi=!1,Er="normal",hc=performance.now(),il=0,sl=0,rl=0,ko=hc,Gu=0,Zo=0,wt=!1,Zd,Bo=[],ts=[];const zo=[],NM=3e3;let Wu,uc=0;const Es={};function Zt(i){Q("toast").textContent=i,Q("toast").hidden=!1,clearTimeout(Wu),Wu=setTimeout(()=>Q("toast").hidden=!0,3e3)}function Jd(){if(!Le||!ke)return;const i=DM(Le.state.collision,ke.mode),e=Q("collision-status"),t=i.blocked?"blocked":i.contact?"contact":"clear";e.textContent!==i.status&&(e.textContent=i.status),e.title!==i.detail&&(e.title=i.detail),e.dataset.collision!==t&&(e.dataset.collision=t);let n=Q("collision-notice");n||(n=document.createElement("div"),n.id="collision-notice",n.className="collision-notice",n.setAttribute("role","status"),n.setAttribute("aria-live","polite"),Q("stage").append(n)),n.textContent!==i.notice&&(n.textContent=i.notice),n.hidden=!i.blocked}function Tr(i,e={}){zo.push({t:Number((Le?.state.elapsed||0).toFixed(3)),type:i,...e}),zo.length>NM&&zo.shift()}function ln(){Br.clear(),zr.clear(),document.querySelectorAll(".held").forEach(i=>i.classList.remove("held")),Tt&&(Tt.lastCut=null)}function pr(i){Et?.stop(""),ln(),Le.select(i),$t(),Q("stage").focus({preventScroll:!0})}function mr(i){ln(),Le.setPaused(i),$t()}function Xu(){Le.setScopeFollow(!Le.state.scope.follow),Zt(Le.state.scope.follow?"内窥镜自动跟随已开启":"自动跟随已关闭，可手动控制镜头"),$t()}function dc(){if(Le.state.selected==="scope"){Zt("请选择左钳或右剪后操作");return}const i=!Le.state.cutting;Et?.stop(""),i&&Le.checkpoint("启用剪切",Tt.snapshot()),Le.setCutting(i),Zt(i?"右剪已启用：接触表面并闭合切除；左钳可同时保持牵拉":"剪切已关闭"),Tt.lastCut=null,$t()}function Ss(i){ke.setMode(i||(ke.mode==="endo"?"overview":"endo")),Q("view-endo").classList.toggle("active",ke.mode==="endo"),Q("view-overview").classList.toggle("active",ke.mode==="overview"),Q("endo-overlay").hidden=ke.mode!=="endo",Q("mini-title").textContent=ke.mode==="endo"?"系统总览":"内窥镜 LIVE",Q("mini-caption").textContent=ke.mode==="endo"?"UNITREE G1 + 胸部持镜概念集成":"同一三维场景 · 实时内窥镜",Q("stage").focus({preventScroll:!0})}async function Rs(i=!1){if(!(wt||!oi)){if(Xe.busy){Zt("正在完成切面更新，请稍后撤销或重做");return}Et?.stop(""),wt=!0,ln();try{const e=Tt.snapshot(),t=i?Le.redo(e):Le.undo(e);if(!t){Zt(i?"没有可重做的操作":"没有可撤销的操作");return}ke.releaseKinematicGuard(),t.hasExtraData&&await Tt.restore(t.extraData),Le.setCutting(!1),Zt((i?"已重做：":"已撤销：")+t.label),Tr(i?"redo":"undo")}catch(e){Wc(e)}finally{wt=!1,$t()}}}async function fc(){if(!(wt||!oi)){Et?.stop(""),wt=!0,ln();try{Tt.release(!0),await Xe.reset(),Le.reset(),ke.releaseKinematicGuard(),Le.select("right"),ke.home(),Tr("reset"),Zt("完整器官、器械与内窥镜已恢复")}catch(i){Wc(i)}finally{wt=!1,$t()}}}function Wc(i){ts.push(String(i.message||i)),console.error(i),Q("system-status").textContent="需要检查",Zt("操作未完成："+(i.message||i))}function $t(){if(!Le)return;const i=Le.state,e=i.tools[i.selected]||i.scope,t=e.position,n={left:"左手 · 持针钳 / 牵拉",right:"右手 · 精细分离剪",scope:"胸部 · 内窥镜"},s=[0,1.035,0];["x","y","z"].forEach((c,h)=>{Q("pos-"+c).innerHTML=((t[h]-s[h])*1e3).toFixed(1)+"<small>mm</small>"}),Q("active-tool").textContent={left:"LEFT / L",right:"RIGHT / R",scope:"SCOPE / C"}[i.selected],Q("selected-badge").textContent=n[i.selected],document.querySelectorAll("[data-select]").forEach(c=>{const h=c.dataset.select===i.selected;c.classList.toggle("selected",h),c.setAttribute("aria-pressed",String(h))}),Q("jaw-value").textContent=i.selected==="scope"?"—":Math.round(e.jaw*100)+"%",Q("scope-depth").textContent=(i.scope.depth*1e3).toFixed(1)+" mm",Q("follow").setAttribute("aria-checked",String(i.scope.follow)),Q("follow").querySelector(".switch").classList.toggle("on",i.scope.follow),Q("cut-mode").setAttribute("aria-checked",String(i.cutting)),Q("cut-mode").querySelector(".switch").classList.toggle("on",i.cutting),Q("cut-mode").classList.toggle("active-cut",i.cutting),Q("scope-summary").textContent=i.scope.follow?"RCM 持镜 · "+{active:"尖端跟随",midpoint:"双器械居中",grasp:"协作区域跟随"}[i.scope.followMode]:"RCM 持镜 · 手动控制";for(const c of["left","right"])Q(c+"-summary").textContent=(i.selected===c?"已选择 · ":"待命 · ")+(i.tools[c].jaw<.16?c==="left"&&Tt?.grasp?Tt.grasp.fragmentId?"已夹持 · 独立组织块":"已抓持 · 牵拉中":"钳口闭合":"钳口 "+Math.round(i.tools[c].jaw*100)+"%");Q("view-status").textContent=ke.mode==="endo"?"内窥镜 · "+(i.scope.follow?"器械自动跟随":"手动镜头"):"系统总览 · 鼠标拖动观察",Q("removed").innerHTML=(Xe?.removedVolumeMm3||0).toFixed(1)+" <small>mm³</small>",Q("removed-bar").style.width=Math.min(100,(Xe?.removedVolumeMm3||0)/(Xe?.totalVolumeMm3||1)*100)+"%",Q("tissue-status").textContent=(Xe?.removedVolumeMm3||0)>0?"已切除组织":"完整",Q("undo").disabled=!Le.canUndo||wt||Xe?.busy,Q("redo").disabled=!Le.canRedo||wt||Xe?.busy,Q("reset").disabled=wt,Q("pause-overlay").hidden=!i.paused,Q("pause").innerHTML=(i.paused?"▶ 继续仿真":"Ⅱ 暂停仿真")+" <kbd>P</kbd>",Q("run-status").textContent=i.paused?"Ⅱ 已暂停":"● 运行中";const r=Math.floor(i.elapsed);Q("session-time").textContent=String(Math.floor(r/60)).padStart(2,"0")+":"+String(r%60).padStart(2,"0"),Q("clutch-indicator").classList.toggle("active",Br.has("Space")||zr.has("Space")),Q("system-status").textContent=ts.length?"需要检查":wt?"恢复组织中":Xe?.busy?"更新组织":"系统就绪",document.querySelectorAll('[data-hold="KeyC"],[data-hold="KeyV"]').forEach(c=>c.disabled=i.selected==="scope");const o=Tt?.contact,a=Xe?.graspMetrics;Q("left-contact").textContent=Tt?.grasp?Tt.grasp.fragmentId?"已夹持独立组织块 · 可抬起移开 / V 释放":"已抓持 · 牵拉 "+(a?.displacementMm||0).toFixed(1)+" mm":o?.leftFragmentId?"标本接触 · C 夹持":o?.left?"包膜接触 · C 抓持":"未接触 · 可表面就位",Q("right-contact").textContent=o?.cutting?"切除中 · 三维缺损更新":o?.right?i.cutting?"组织接触 · 闭合剪切":"组织接触 · B 启用剪切":"未接触 · 可表面就位",Q("roll-value").textContent=i.selected==="scope"?(i.scope.roll*180/Math.PI).toFixed(1)+"°":(e.wrist[2]*180/Math.PI).toFixed(1)+"°",Q("follow-mode").value=i.scope.followMode,Q("scope-content").value=i.scope.viewMode,Q("demo").textContent=Et?.active?"■ 停止自动操作":"▶ 切离与移开示范",Q("demo").disabled=wt||!Et?.active&&Xe?.busy,Q("approach").disabled=wt||Xe?.busy||i.selected==="scope"||i.paused,Jd(),Q("connection-status").textContent=ke.conceptDecoupled?"概念主从联接":"双臂器械联接";const l=Xe?.fragmentMetrics;if(Q("specimen-count").textContent=(l?.count||0)+" 块",Q("specimen-volume").textContent=((l?.volumeMm3||0)/1e3).toFixed(2)+" cm³",Q("specimen-state").textContent=l?.pieces.some(c=>c.held)?"左钳夹持 · 独立搬运":l?.count?"已切离 · C 可再次夹持":"组织桥完全切断后才会分离",l?.count&&(Q("tissue-status").textContent="已分离 "+l.count+" 块"),Q("approach-specimen").disabled=wt||Xe?.busy||!l?.count||l.pieces.some(c=>c.held)||i.paused,Q("stage").dataset.telemetry=JSON.stringify({state:Le.snapshot().state,fps:Zo,errors:ts,removedVolumeMm3:Xe?.removedVolumeMm3,fragments:Xe?.fragmentMetrics,armErrors:ke.armErrors,scopeArmError:ke.assemblies?.scopeArmError,toolRCMErrors:ke.assemblies?.toolRCMErrors,interaction:Tt?.metrics,demo:Et?.active,demoPhase:Et?.phase,tissueBusy:Xe?.busy,cutCount:Xe?._cuts.length,viewMode:ke.mode,precision:Er,scopeFeed:ke.scopeFeed.resolution,scopeViewAspect:Le.viewAspect,drawCalls:ke.renderer.info.render.calls,triangles:ke.renderer.info.render.triangles,connectionModes:ke.assemblies?.connectionModes,timings:Es}),ke.mode==="endo"){const c=new b(...i.tools[i.activeTool].position).applyMatrix4(ke.endoCamera.matrixWorldInverse),h=.01*Q("stage").clientHeight/(2*Math.tan(ni.degToRad(ke.endoCamera.fov*.5))*Math.max(.01,-c.z));Q("lens-scale").style.width=h+"px"}}function UM(){document.querySelectorAll("[data-select]").forEach(i=>i.onclick=()=>pr(i.dataset.select)),document.querySelectorAll("[data-speed]").forEach(i=>i.onclick=()=>{Er=i.dataset.speed,document.querySelectorAll("[data-speed]").forEach(e=>e.classList.toggle("active",e===i)),Zt(Er==="fine"?"精细模式：降低位移与旋转速度":"标准速度模式")});for(const i of document.querySelectorAll("[data-hold]")){let e=0,t=!1;const n=()=>!oi||wt||t?!1:(Et?.stop(""),e=uc,t=!0,zr.add(i.dataset.hold),i.classList.add("held"),!0),s=r=>{const o=t&&e===uc&&["pointerup","keyup"].includes(r.type);if(t=!1,zr.delete(i.dataset.hold),i.classList.remove("held"),o&&!wt&&!Le.state.paused){const a=new Set([i.dataset.hold]);Er==="fine"&&a.add("ShiftLeft"),Le.update(.05,a),Le.update(1e-9,new Set),$t()}};i.addEventListener("pointerdown",r=>{r.preventDefault(),n()&&i.setPointerCapture(r.pointerId)}),i.addEventListener("pointerup",s),i.addEventListener("pointercancel",s),i.addEventListener("lostpointercapture",s),i.addEventListener("keydown",r=>{r.code==="Enter"&&(r.preventDefault(),n())}),i.addEventListener("keyup",r=>{r.code==="Enter"&&s(r)}),i.addEventListener("blur",s)}Q("pause").onclick=()=>mr(!Le.state.paused),Q("resume").onclick=()=>mr(!1),Q("undo").onclick=()=>Rs(),Q("redo").onclick=()=>Rs(!0),Q("reset").onclick=fc,Q("follow").onclick=Xu,Q("cut-mode").onclick=dc,Q("follow-mode").onchange=i=>{Le.setScopeFollow(!0,i.target.value),$t()},Q("scope-content").onchange=i=>{Le.setScopeViewMode(i.target.value),Le.setScopeFollow(!0),Zt(i.target.value==="specimen"?"镜头观察独立标本；无标本时保持肝脏术野":"镜头保持肝脏局部术野"),$t()},Q("demo").onclick=()=>{ln(),Et.startExample(),Ss("endo"),$t()},Q("approach").onclick=()=>{ln(),Et.stop(""),Et.approach(),$t()},Q("approach-specimen").onclick=()=>{ln(),Et.stop(""),Et.approachSpecimen(),Ss("endo"),$t()},Q("view-endo").onclick=()=>Ss("endo"),Q("view-overview").onclick=()=>Ss("overview"),Q("swap-view").onclick=()=>Ss(),Q("view-home").onclick=()=>{ke.home(),Zt("观察视角已复位")},Q("fullscreen").onclick=async()=>{try{document.fullscreenElement?await document.exitFullscreen():await Q("stage").requestFullscreen()}catch{Zt("当前浏览器不支持全屏，请使用浏览器全屏模式")}},Q("help").onclick=()=>{Et?.stop(""),ln(),Q("help-dialog").showModal()},Q("about").onclick=()=>{Et?.stop(""),ln(),Q("about-dialog").showModal()},document.querySelectorAll("dialog [data-close]").forEach(i=>i.onclick=()=>i.closest("dialog").close()),document.querySelectorAll("dialog").forEach(i=>i.addEventListener("click",e=>{e.target===i&&i.close()})),Q("export").onclick=()=>{const i={app:"MIRA surgical teleoperation demo",version:3,exportedAt:new Date().toISOString(),units:"metres/radians/seconds",tissueVoxelMm:Xe.voxelMm,removedVolumeMm3:Xe.removedVolumeMm3,state:Le.snapshot(),interaction:Tt.snapshot(),events:zo},e=document.createElement("a");e.href=URL.createObjectURL(new Blob([JSON.stringify(i,null,2)],{type:"application/json"})),e.download="mira-session-"+new Date().toISOString().replace(/[:.]/g,"-")+".json",e.click(),setTimeout(()=>URL.revokeObjectURL(e.href),1e3),Zt("操作记录已导出")},window.addEventListener("keydown",i=>{if(!oi||i.target.closest("input,textarea,select,[contenteditable=true]")||document.querySelector("dialog[open]"))return;if(i.ctrlKey||i.metaKey){if(i.code==="KeyZ"){i.preventDefault(),i.repeat||Rs(i.shiftKey);return}if(i.code==="KeyY"){i.preventDefault(),i.repeat||Rs(!0);return}return}if(LM.has(i.code)){i.preventDefault(),i.code!=="Space"&&!i.code.startsWith("Shift")&&Et?.stop(""),wt||Br.add(i.code);return}const e={Digit1:()=>pr("left"),Digit2:()=>pr("right"),Digit3:()=>pr("scope"),KeyP:()=>mr(!Le.state.paused),KeyF:Xu,KeyB:dc,KeyR:fc,Tab:()=>Ss(),Slash:()=>{Et?.stop(""),Q("help-dialog").showModal(),ln()}};e[i.code]&&(i.preventDefault(),i.repeat||e[i.code]())}),window.addEventListener("keyup",i=>{Br.delete(i.code)}),window.addEventListener("blur",ln),document.addEventListener("visibilitychange",()=>{ln(),document.hidden&&oi&&mr(!0)}),Q("scene").addEventListener("webglcontextlost",i=>{i.preventDefault(),ln(),Le.setPaused(!0),Q("loading").hidden=!1,Q("loading-detail").textContent="显卡上下文已中断，请刷新页面重新加载。"})}function FM(i,e){!oi||wt||Tt.update(e,{clutched:i.has("Space")}).catch(Wc)}function OM(){const i=Le.state.scope,e=new b(...i.port),t=new b(...i.position).sub(e).normalize();let n=.018;for(let s=0;s<=8;s++){const r=.018+(i.depth-.018)*s/8,o=Xe.group.worldToLocal(e.clone().addScaledVector(t,r));if(Xe.sampleDistance(o)<.005){let a=n,l=r;for(let c=0;c<8;c++){const h=(a+l)*.5,u=Xe.group.worldToLocal(e.clone().addScaledVector(t,h));Xe.sampleDistance(u)<.005?l=h:a=h}i.depth=a,i.position=e.addScaledVector(t,a).toArray();return}n=r}}function Qd(i){Zd=requestAnimationFrame(Qd);const e=Math.max(0,Math.min(.05,(i-hc)/1e3));if(hc=i,!oi)return;const t=performance.now(),n=new Set([...Br,...zr]);Er==="fine"&&n.add("ShiftLeft"),wt&&n.clear(),wt||Le.setScopeContext({...CM(Le,Xe,Tt,i),viewAspect:ke.scopeAspect}),!wt&&!n.has("Space")&&Et.update(e),wt||Le.update(e,n),uc++;const s=performance.now();if(Es.control=s-t,!Le.state.paused&&!wt&&OM(),Es.clearance=performance.now()-s,Jd(),i>=il){const r=Math.min(.05,sl?(i-sl)/1e3:e),o=performance.now();ke.update(Le.state,r),sl=i;const a=performance.now();FM(n,r);const l=performance.now();ke.render(i),Es.scene=a-o,Es.interaction=l-a,Es.render=performance.now()-l,rl++,il=Math.max(il+1e3/60,i-1e3/60)}Bo.push(performance.now()-t),Bo.length>600&&Bo.shift(),i-ko>1e3&&(Zo=rl*1e3/(i-ko),Q("fps").textContent=Zo.toFixed(0)+" FPS",rl=0,ko=i),i-Gu>100&&(Gu=i,$t())}async function kM(){try{ke=new eM(Q("scene"),Q("stage"),Q("mini-view")),Xe=new MM,Le=new zx({getExtraData:()=>Tt?.snapshot()??Xe.snapshot(),onEvent:i=>{i.type!=="history"&&Tr(i.type)}}),Le.select("right"),Tt=new SM(Le,Xe,{onMessage:Zt,onEvent:Tr,toolDirection:i=>ke.assemblies?.toolDirections?.[i],toolQuaternion:i=>ke.assemblies?.tools[i]?.tipQuaternion}),Et=new EM(Le,Xe,Tt,{onMessage:Zt,onChange:()=>{oi&&$t()}}),Q("loading-detail").textContent="加载 G1 官方模型与真实解剖体积…",await Promise.all([ke.loadRobot(),Xe.load(IM+"assets/liver-volume")]),ke.addTissue(Xe),Xe.group.rotation.x=-Math.PI/2,Xe.group.updateMatrixWorld(!0),await ke.loadAnatomy?.(),Q("model-details").innerHTML="<p><strong>宇树 G1：</strong>官方 29 自由度 CAD，保留原始尺寸与关节层级，双臂由逆运动学驱动。原始固定手型通过掌托、绑带和球接轴夹固定器械；夹具为概念设计。器械自由移动不受机械臂可达范围阻挡；超出真实手臂可达范围时显示概念主从联接。</p><p><strong>肝胆解剖：</strong>BodyParts3D 公开成人肝脏、胆囊与肝总动脉，同源坐标注册。体积间距 "+Xe.voxelMm+" mm；包膜与细小纹理由程序材质表现，并非患者 CT 或组织学数据。</p><p><strong>牵拉与切除：</strong>抓持实际表面，三维顶点、法线和阴影随动。剪切贯通并切断全部组织桥后，按体积连通性提取独立三维组织块，可夹持、旋转、移开、释放和再次夹取；切面及两侧封闭表面均保留。撤销同时恢复切口、组织块和夹持。牵拉为几何近似，松手组织块采用简化重力与表面接触。</p><p><strong>器械与持镜：</strong>真实 dVRK 持针钳、弯剪和内窥镜 CAD。G1 胸部 Z1 与快换耦合器为概念集成，非官方医疗配置。旋转连续多圈、无工作空间围栏，仅双器械防碰撞；这也意味着并未模拟真机电缆/关节行程。</p><p><strong>镜头：</strong>可选当前尖端、双器械中心或牵拉协作区，平滑转向与画面上方向连续，自动进退维持约 65 mm 观察距离，默认显示肝脏局部术野；可切换独立标本观察。手动进退保留距离偏置，肝表面提供防穿透。术野与室内实体屏共用同一帧实时图像。</p>";for(let i=0;i<20;i++)ke.update(Le.state,.05);UM(),oi=!0,document.querySelectorAll("button").forEach(i=>i.disabled=!1),ko=performance.now(),Q("loading").hidden=!0,$t(),ke.update(Le.state,0),ke.render(),Tr("ready"),window.__mira={get state(){return Le.snapshot()},get metrics(){return{fps:Zo,frameMs:Bo.slice(),errors:[...ts],removedVolumeMm3:Xe.removedVolumeMm3,totalVolumeMm3:Xe.totalVolumeMm3,voxelMm:Xe.voxelMm,drawCalls:ke.renderer.info.render.calls,triangles:ke.renderer.info.render.triangles,armErrors:{...ke.armErrors},interaction:Tt.metrics}},select:pr,reset:fc,undo:Rs,redo:()=>Rs(!0),setPaused:mr,toggleCut:dc,sim:Le,tissue:Xe,view:ke,interactionController:Tt,demo:Et,ready:!0}}catch(i){console.error(i),ts.push(String(i)),Q("loading-detail").textContent="加载未完成："+i.message;const e=document.createElement("div");e.className="error-actions";const t=document.createElement("button");t.textContent="重新加载",t.onclick=()=>location.reload(),e.append(t),Q("loading").append(e)}}window.addEventListener("error",i=>ts.push(i.message));window.addEventListener("unhandledrejection",i=>ts.push(String(i.reason)));window.addEventListener("beforeunload",()=>{cancelAnimationFrame(Zd),ke?.dispose(),Xe?.dispose?.()});document.querySelectorAll("button").forEach(i=>i.disabled=!0);requestAnimationFrame(Qd);kM();
