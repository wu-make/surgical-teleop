(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Yl="180",Ds={ROTATE:0,DOLLY:1,PAN:2},Rs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Ud=0,Dc=1,Fd=2,Au=1,Ru=2,si=3,di=0,jt=1,un=2,Pi=0,Ls=1,Lc=2,Ic=3,Nc=4,Od=5,$i=100,Bd=101,zd=102,kd=103,Vd=104,Hd=200,Gd=201,Wd=202,Xd=203,qa=204,ja=205,qd=206,jd=207,Kd=208,Yd=209,$d=210,Zd=211,Jd=212,Qd=213,ef=214,Ka=0,Ya=1,$a=2,Fs=3,Za=4,Ja=5,Qa=6,el=7,$l=0,tf=1,nf=2,Di=0,sf=1,rf=2,of=3,Cu=4,af=5,lf=6,cf=7,Uc="attached",hf="detached",Pu=300,Os=301,Bs=302,tl=303,nl=304,Go=306,es=1e3,Ri=1001,Lo=1002,tn=1003,Du=1004,lr=1005,Qt=1006,So=1007,ai=1008,Un=1009,Lu=1010,Iu=1011,Tr=1012,Zl=1013,ts=1014,Dn=1015,Xs=1016,Jl=1017,Ql=1018,wr=1020,Nu=35902,Uu=35899,Fu=1021,Ou=1022,Sn=1023,Ar=1026,Rr=1027,ec=1028,tc=1029,Bu=1030,nc=1031,ic=1033,bo=33776,Eo=33777,To=33778,wo=33779,il=35840,sl=35841,rl=35842,ol=35843,al=36196,ll=37492,cl=37496,hl=37808,ul=37809,dl=37810,fl=37811,pl=37812,ml=37813,gl=37814,_l=37815,vl=37816,xl=37817,yl=37818,Ml=37819,Sl=37820,bl=37821,El=36492,Tl=36494,wl=36495,Al=36283,Rl=36284,Cl=36285,Pl=36286,Cr=2300,Pr=2301,$o=2302,Fc=2400,Oc=2401,Bc=2402,uf=2500,df=0,zu=1,Dl=2,ff=3200,pf=3201,sc=0,mf=1,Ai="",Ct="srgb",Kt="srgb-linear",Io="linear",at="srgb",as=7680,zc=519,gf=512,_f=513,vf=514,ku=515,xf=516,yf=517,Mf=518,Sf=519,Ll=35044,kc=35040,Vc="300 es",Wn=2e3,No=2001;class rs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}}const Ht=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Hc=1234567;const fr=Math.PI/180,zs=180/Math.PI;function Ln(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ht[s&255]+Ht[s>>8&255]+Ht[s>>16&255]+Ht[s>>24&255]+"-"+Ht[e&255]+Ht[e>>8&255]+"-"+Ht[e>>16&15|64]+Ht[e>>24&255]+"-"+Ht[t&63|128]+Ht[t>>8&255]+"-"+Ht[t>>16&255]+Ht[t>>24&255]+Ht[n&255]+Ht[n>>8&255]+Ht[n>>16&255]+Ht[n>>24&255]).toLowerCase()}function He(s,e,t){return Math.max(e,Math.min(t,s))}function rc(s,e){return(s%e+e)%e}function bf(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function Ef(s,e,t){return s!==e?(t-s)/(e-s):0}function pr(s,e,t){return(1-t)*s+t*e}function Tf(s,e,t,n){return pr(s,e,1-Math.exp(-t*n))}function wf(s,e=1){return e-Math.abs(rc(s,e*2)-e)}function Af(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Rf(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function Cf(s,e){return s+Math.floor(Math.random()*(e-s+1))}function Pf(s,e){return s+Math.random()*(e-s)}function Df(s){return s*(.5-Math.random())}function Lf(s){s!==void 0&&(Hc=s);let e=Hc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function If(s){return s*fr}function Nf(s){return s*zs}function Uf(s){return(s&s-1)===0&&s!==0}function Ff(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Of(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Bf(s,e,t,n,i){const r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),d=o((e-n)/2),f=r((n-e)/2),g=o((n-e)/2);switch(i){case"XYX":s.set(a*h,l*u,l*d,a*c);break;case"YZY":s.set(l*d,a*h,l*u,a*c);break;case"ZXZ":s.set(l*u,l*d,a*h,a*c);break;case"XZX":s.set(a*h,l*g,l*f,a*c);break;case"YXY":s.set(l*f,a*h,l*g,a*c);break;case"ZYZ":s.set(l*g,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Pn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function st(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const Hn={DEG2RAD:fr,RAD2DEG:zs,generateUUID:Ln,clamp:He,euclideanModulo:rc,mapLinear:bf,inverseLerp:Ef,lerp:pr,damp:Tf,pingpong:wf,smoothstep:Af,smootherstep:Rf,randInt:Cf,randFloat:Pf,randFloatSpread:Df,seededRandom:Lf,degToRad:If,radToDeg:Nf,isPowerOfTwo:Uf,ceilPowerOfTwo:Ff,floorPowerOfTwo:Of,setQuaternionFromProperEuler:Bf,normalize:st,denormalize:Pn};class ue{constructor(e=0,t=0){ue.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=He(this.x,e.x,t.x),this.y=He(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=He(this.x,e,t),this.y=He(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(He(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(He(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*i+e.x,this.y=r*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Fe{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const d=r[o+0],f=r[o+1],g=r[o+2],_=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(u!==_||l!==d||c!==f||h!==g){let m=1-a;const p=l*d+c*f+h*g+u*_,S=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){const R=Math.sqrt(y),P=Math.atan2(R,p*S);m=Math.sin(m*P)/R,a=Math.sin(a*P)/R}const M=a*S;if(l=l*m+d*M,c=c*m+f*M,h=h*m+g*M,u=u*m+_*M,m===1-a){const R=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=R,c*=R,h*=R,u*=R}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,o){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return e[t]=a*g+h*u+l*f-c*d,e[t+1]=l*g+h*d+c*u-a*f,e[t+2]=c*g+h*f+a*d-l*u,e[t+3]=h*g-a*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(r/2),d=l(n/2),f=l(i/2),g=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-i)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+c)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(r-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(He(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+i*c-r*l,this._y=i*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class E{constructor(e=0,t=0,n=0){E.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Gc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Gc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),h=2*(a*t-r*i),u=2*(r*n-o*t);return this.x=t+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=i+l*u+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=He(this.x,e.x,t.x),this.y=He(this.y,e.y,t.y),this.z=He(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=He(this.x,e,t),this.y=He(this.y,e,t),this.z=He(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(He(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Zo.copy(this).projectOnVector(e),this.sub(Zo)}reflect(e){return this.sub(Zo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(He(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Zo=new E,Gc=new Fe;class ze{constructor(e,t,n,i,r,o,a,l,c){ze.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c)}set(e,t,n,i,r,o,a,l,c){const h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],_=i[0],m=i[3],p=i[6],S=i[1],y=i[4],M=i[7],R=i[2],P=i[5],w=i[8];return r[0]=o*_+a*S+l*R,r[3]=o*m+a*y+l*P,r[6]=o*p+a*M+l*w,r[1]=c*_+h*S+u*R,r[4]=c*m+h*y+u*P,r[7]=c*p+h*M+u*w,r[2]=d*_+f*S+g*R,r[5]=d*m+f*y+g*P,r[8]=d*p+f*M+g*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*r*h+n*a*l+i*r*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,d=a*l-h*r,f=c*r-o*l,g=t*u+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(i*c-h*n)*_,e[2]=(a*n-i*o)*_,e[3]=d*_,e[4]=(h*t-i*l)*_,e[5]=(i*r-a*t)*_,e[6]=f*_,e[7]=(n*l-c*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Jo.makeScale(e,t)),this}rotate(e){return this.premultiply(Jo.makeRotation(-e)),this}translate(e,t){return this.premultiply(Jo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Jo=new ze;function Vu(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Dr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function zf(){const s=Dr("canvas");return s.style.display="block",s}const Wc={};function Lr(s){s in Wc||(Wc[s]=!0,console.warn(s))}function kf(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const Xc=new ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),qc=new ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Vf(){const s={enabled:!0,workingColorSpace:Kt,spaces:{},convert:function(i,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===at&&(i.r=ci(i.r),i.g=ci(i.g),i.b=ci(i.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===at&&(i.r=Is(i.r),i.g=Is(i.g),i.b=Is(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Ai?Io:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,o){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return Lr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return Lr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[Kt]:{primaries:e,whitePoint:n,transfer:Io,toXYZ:Xc,fromXYZ:qc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Ct},outputColorSpaceConfig:{drawingBufferColorSpace:Ct}},[Ct]:{primaries:e,whitePoint:n,transfer:at,toXYZ:Xc,fromXYZ:qc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Ct}}}),s}const Je=Vf();function ci(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Is(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let ls;class Hf{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ls===void 0&&(ls=Dr("canvas")),ls.width=e.width,ls.height=e.height;const i=ls.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=ls}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Dr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=ci(r[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ci(t[n]/255)*255):t[n]=ci(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Gf=0;class oc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Gf++}),this.uuid=Ln(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(Qo(i[o].image)):r.push(Qo(i[o]))}else r=Qo(i);n.url=r}return t||(e.images[this.uuid]=n),n}}function Qo(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Hf.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Wf=0;const ea=new E;class Lt extends rs{constructor(e=Lt.DEFAULT_IMAGE,t=Lt.DEFAULT_MAPPING,n=Ri,i=Ri,r=Qt,o=ai,a=Sn,l=Un,c=Lt.DEFAULT_ANISOTROPY,h=Ai){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Wf++}),this.uuid=Ln(),this.name="",this.source=new oc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ue(0,0),this.repeat=new ue(1,1),this.center=new ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ea).x}get height(){return this.source.getSize(ea).y}get depth(){return this.source.getSize(ea).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Pu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case es:e.x=e.x-Math.floor(e.x);break;case Ri:e.x=e.x<0?0:1;break;case Lo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case es:e.y=e.y-Math.floor(e.y);break;case Ri:e.y=e.y<0?0:1;break;case Lo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Lt.DEFAULT_IMAGE=null;Lt.DEFAULT_MAPPING=Pu;Lt.DEFAULT_ANISOTROPY=1;class et{constructor(e=0,t=0,n=0,i=1){et.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(c+1)/2,M=(f+1)/2,R=(p+1)/2,P=(h+d)/4,w=(u+_)/4,C=(g+m)/4;return y>M&&y>R?y<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(y),i=P/n,r=w/n):M>R?M<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(M),n=P/i,r=C/i):R<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(R),n=w/r,i=C/r),this.set(n,i,r,t),this}let S=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(u-_)/S,this.z=(d-h)/S,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=He(this.x,e.x,t.x),this.y=He(this.y,e.y,t.y),this.z=He(this.z,e.z,t.z),this.w=He(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=He(this.x,e,t),this.y=He(this.y,e,t),this.z=He(this.z,e,t),this.w=He(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(He(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Xf extends rs{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Qt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new et(0,0,e,t),this.scissorTest=!1,this.viewport=new et(0,0,e,t);const i={width:e,height:t,depth:n.depth},r=new Lt(i);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Qt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new oc(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ii extends Xf{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Hu extends Lt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=tn,this.minFilter=tn,this.wrapR=Ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class qf extends Lt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=tn,this.minFilter=tn,this.wrapR=Ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class jn{constructor(e=new E(1/0,1/0,1/0),t=new E(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(wn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(wn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=wn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,wn):wn.fromBufferAttribute(r,o),wn.applyMatrix4(e.matrixWorld),this.expandByPoint(wn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Vr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Vr.copy(n.boundingBox)),Vr.applyMatrix4(e.matrixWorld),this.union(Vr)}const i=e.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,wn),wn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Zs),Hr.subVectors(this.max,Zs),cs.subVectors(e.a,Zs),hs.subVectors(e.b,Zs),us.subVectors(e.c,Zs),gi.subVectors(hs,cs),_i.subVectors(us,hs),zi.subVectors(cs,us);let t=[0,-gi.z,gi.y,0,-_i.z,_i.y,0,-zi.z,zi.y,gi.z,0,-gi.x,_i.z,0,-_i.x,zi.z,0,-zi.x,-gi.y,gi.x,0,-_i.y,_i.x,0,-zi.y,zi.x,0];return!ta(t,cs,hs,us,Hr)||(t=[1,0,0,0,1,0,0,0,1],!ta(t,cs,hs,us,Hr))?!1:(Gr.crossVectors(gi,_i),t=[Gr.x,Gr.y,Gr.z],ta(t,cs,hs,us,Hr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,wn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(wn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:($n[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),$n[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),$n[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),$n[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),$n[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),$n[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),$n[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),$n[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints($n),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const $n=[new E,new E,new E,new E,new E,new E,new E,new E],wn=new E,Vr=new jn,cs=new E,hs=new E,us=new E,gi=new E,_i=new E,zi=new E,Zs=new E,Hr=new E,Gr=new E,ki=new E;function ta(s,e,t,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){ki.fromArray(s,r);const a=i.x*Math.abs(ki.x)+i.y*Math.abs(ki.y)+i.z*Math.abs(ki.z),l=e.dot(ki),c=t.dot(ki),h=n.dot(ki);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const jf=new jn,Js=new E,na=new E;class Kn{constructor(e=new E,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):jf.setFromPoints(e).getCenter(n);let i=0;for(let r=0,o=e.length;r<o;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Js.subVectors(e,this.center);const t=Js.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Js,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(na.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Js.copy(e.center).add(na)),this.expandByPoint(Js.copy(e.center).sub(na))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const Zn=new E,ia=new E,Wr=new E,vi=new E,sa=new E,Xr=new E,ra=new E;class Or{constructor(e=new E,t=new E(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Zn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Zn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Zn.copy(this.origin).addScaledVector(this.direction,t),Zn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){ia.copy(e).add(t).multiplyScalar(.5),Wr.copy(t).sub(e).normalize(),vi.copy(this.origin).sub(ia);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Wr),a=vi.dot(this.direction),l=-vi.dot(Wr),c=vi.lengthSq(),h=Math.abs(1-o*o);let u,d,f,g;if(h>0)if(u=o*l-a,d=o*a-l,g=r*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(ia).addScaledVector(Wr,d),f}intersectSphere(e,t){Zn.subVectors(e.center,this.origin);const n=Zn.dot(this.direction),i=Zn.dot(Zn)-n*n,r=e.radius*e.radius;if(i>r)return null;const o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),u>=0?(a=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Zn)!==null}intersectTriangle(e,t,n,i,r){sa.subVectors(t,e),Xr.subVectors(n,e),ra.crossVectors(sa,Xr);let o=this.direction.dot(ra),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;vi.subVectors(this.origin,e);const l=a*this.direction.dot(Xr.crossVectors(vi,Xr));if(l<0)return null;const c=a*this.direction.dot(sa.cross(vi));if(c<0||l+c>o)return null;const h=-a*vi.dot(ra);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ue{constructor(e,t,n,i,r,o,a,l,c,h,u,d,f,g,_,m){Ue.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c,h,u,d,f,g,_,m)}set(e,t,n,i,r,o,a,l,c,h,u,d,f,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ue().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/ds.setFromMatrixColumn(e,0).length(),r=1/ds.setFromMatrixColumn(e,1).length(),o=1/ds.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=o*h,f=o*u,g=a*h,_=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+g*c,t[5]=d-_*c,t[9]=-a*l,t[2]=_-d*c,t[6]=g+f*c,t[10]=o*l}else if(e.order==="YXZ"){const d=l*h,f=l*u,g=c*h,_=c*u;t[0]=d+_*a,t[4]=g*a-f,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-g,t[6]=_+d*a,t[10]=o*l}else if(e.order==="ZXY"){const d=l*h,f=l*u,g=c*h,_=c*u;t[0]=d-_*a,t[4]=-o*u,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*h,t[9]=_-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const d=o*h,f=o*u,g=a*h,_=a*u;t[0]=l*h,t[4]=g*c-f,t[8]=d*c+_,t[1]=l*u,t[5]=_*c+d,t[9]=f*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const d=o*l,f=o*c,g=a*l,_=a*c;t[0]=l*h,t[4]=_-d*u,t[8]=g*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*u+g,t[10]=d-_*u}else if(e.order==="XZY"){const d=o*l,f=o*c,g=a*l,_=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+_,t[5]=o*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=a*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Kf,e,Yf)}lookAt(e,t,n){const i=this.elements;return ln.subVectors(e,t),ln.lengthSq()===0&&(ln.z=1),ln.normalize(),xi.crossVectors(n,ln),xi.lengthSq()===0&&(Math.abs(n.z)===1?ln.x+=1e-4:ln.z+=1e-4,ln.normalize(),xi.crossVectors(n,ln)),xi.normalize(),qr.crossVectors(ln,xi),i[0]=xi.x,i[4]=qr.x,i[8]=ln.x,i[1]=xi.y,i[5]=qr.y,i[9]=ln.y,i[2]=xi.z,i[6]=qr.z,i[10]=ln.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],S=n[3],y=n[7],M=n[11],R=n[15],P=i[0],w=i[4],C=i[8],v=i[12],x=i[1],A=i[5],L=i[9],U=i[13],I=i[2],B=i[6],O=i[10],K=i[14],V=i[3],$=i[7],se=i[11],de=i[15];return r[0]=o*P+a*x+l*I+c*V,r[4]=o*w+a*A+l*B+c*$,r[8]=o*C+a*L+l*O+c*se,r[12]=o*v+a*U+l*K+c*de,r[1]=h*P+u*x+d*I+f*V,r[5]=h*w+u*A+d*B+f*$,r[9]=h*C+u*L+d*O+f*se,r[13]=h*v+u*U+d*K+f*de,r[2]=g*P+_*x+m*I+p*V,r[6]=g*w+_*A+m*B+p*$,r[10]=g*C+_*L+m*O+p*se,r[14]=g*v+_*U+m*K+p*de,r[3]=S*P+y*x+M*I+R*V,r[7]=S*w+y*A+M*B+R*$,r[11]=S*C+y*L+M*O+R*se,r[15]=S*v+y*U+M*K+R*de,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+r*l*u-i*c*u-r*a*d+n*c*d+i*a*f-n*l*f)+_*(+t*l*f-t*c*d+r*o*d-i*o*f+i*c*h-r*l*h)+m*(+t*c*u-t*a*f-r*o*u+n*o*f+r*a*h-n*c*h)+p*(-i*a*h-t*l*u+t*a*d+i*o*u-n*o*d+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],_=e[13],m=e[14],p=e[15],S=u*m*c-_*d*c+_*l*f-a*m*f-u*l*p+a*d*p,y=g*d*c-h*m*c-g*l*f+o*m*f+h*l*p-o*d*p,M=h*_*c-g*u*c+g*a*f-o*_*f-h*a*p+o*u*p,R=g*u*l-h*_*l-g*a*d+o*_*d+h*a*m-o*u*m,P=t*S+n*y+i*M+r*R;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/P;return e[0]=S*w,e[1]=(_*d*r-u*m*r-_*i*f+n*m*f+u*i*p-n*d*p)*w,e[2]=(a*m*r-_*l*r+_*i*c-n*m*c-a*i*p+n*l*p)*w,e[3]=(u*l*r-a*d*r-u*i*c+n*d*c+a*i*f-n*l*f)*w,e[4]=y*w,e[5]=(h*m*r-g*d*r+g*i*f-t*m*f-h*i*p+t*d*p)*w,e[6]=(g*l*r-o*m*r-g*i*c+t*m*c+o*i*p-t*l*p)*w,e[7]=(o*d*r-h*l*r+h*i*c-t*d*c-o*i*f+t*l*f)*w,e[8]=M*w,e[9]=(g*u*r-h*_*r-g*n*f+t*_*f+h*n*p-t*u*p)*w,e[10]=(o*_*r-g*a*r+g*n*c-t*_*c-o*n*p+t*a*p)*w,e[11]=(h*a*r-o*u*r-h*n*c+t*u*c+o*n*f-t*a*f)*w,e[12]=R*w,e[13]=(h*_*i-g*u*i+g*n*d-t*_*d-h*n*m+t*u*m)*w,e[14]=(g*a*i-o*_*i-g*n*l+t*_*l+o*n*m-t*a*m)*w,e[15]=(o*u*i-h*a*i+h*n*l-t*u*l-o*n*d+t*a*d)*w,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,o){return this.set(1,n,r,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,u=a+a,d=r*c,f=r*h,g=r*u,_=o*h,m=o*u,p=a*u,S=l*c,y=l*h,M=l*u,R=n.x,P=n.y,w=n.z;return i[0]=(1-(_+p))*R,i[1]=(f+M)*R,i[2]=(g-y)*R,i[3]=0,i[4]=(f-M)*P,i[5]=(1-(d+p))*P,i[6]=(m+S)*P,i[7]=0,i[8]=(g+y)*w,i[9]=(m-S)*w,i[10]=(1-(d+_))*w,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let r=ds.set(i[0],i[1],i[2]).length();const o=ds.set(i[4],i[5],i[6]).length(),a=ds.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],An.copy(this);const c=1/r,h=1/o,u=1/a;return An.elements[0]*=c,An.elements[1]*=c,An.elements[2]*=c,An.elements[4]*=h,An.elements[5]*=h,An.elements[6]*=h,An.elements[8]*=u,An.elements[9]*=u,An.elements[10]*=u,t.setFromRotationMatrix(An),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,i,r,o,a=Wn,l=!1){const c=this.elements,h=2*r/(t-e),u=2*r/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i);let g,_;if(l)g=r/(o-r),_=o*r/(o-r);else if(a===Wn)g=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===No)g=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,o,a=Wn,l=!1){const c=this.elements,h=2/(t-e),u=2/(n-i),d=-(t+e)/(t-e),f=-(n+i)/(n-i);let g,_;if(l)g=1/(o-r),_=o/(o-r);else if(a===Wn)g=-2/(o-r),_=-(o+r)/(o-r);else if(a===No)g=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const ds=new E,An=new Ue,Kf=new E(0,0,0),Yf=new E(1,1,1),xi=new E,qr=new E,ln=new E,jc=new Ue,Kc=new Fe;class En{constructor(e=0,t=0,n=0,i=En.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(He(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-He(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(He(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-He(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(He(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-He(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return jc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(jc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Kc.setFromEuler(this),this.setFromQuaternion(Kc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}En.DEFAULT_ORDER="XYZ";class Gu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let $f=0;const Yc=new E,fs=new Fe,Jn=new Ue,jr=new E,Qs=new E,Zf=new E,Jf=new Fe,$c=new E(1,0,0),Zc=new E(0,1,0),Jc=new E(0,0,1),Qc={type:"added"},Qf={type:"removed"},ps={type:"childadded",child:null},oa={type:"childremoved",child:null};class ht extends rs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:$f++}),this.uuid=Ln(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ht.DEFAULT_UP.clone();const e=new E,t=new En,n=new Fe,i=new E(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ue},normalMatrix:{value:new ze}}),this.matrix=new Ue,this.matrixWorld=new Ue,this.matrixAutoUpdate=ht.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ht.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Gu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return fs.setFromAxisAngle(e,t),this.quaternion.multiply(fs),this}rotateOnWorldAxis(e,t){return fs.setFromAxisAngle(e,t),this.quaternion.premultiply(fs),this}rotateX(e){return this.rotateOnAxis($c,e)}rotateY(e){return this.rotateOnAxis(Zc,e)}rotateZ(e){return this.rotateOnAxis(Jc,e)}translateOnAxis(e,t){return Yc.copy(e).applyQuaternion(this.quaternion),this.position.add(Yc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis($c,e)}translateY(e){return this.translateOnAxis(Zc,e)}translateZ(e){return this.translateOnAxis(Jc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Jn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?jr.copy(e):jr.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Qs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Jn.lookAt(Qs,jr,this.up):Jn.lookAt(jr,Qs,this.up),this.quaternion.setFromRotationMatrix(Jn),i&&(Jn.extractRotation(i.matrixWorld),fs.setFromRotationMatrix(Jn),this.quaternion.premultiply(fs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Qc),ps.child=e,this.dispatchEvent(ps),ps.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Qf),oa.child=e,this.dispatchEvent(oa),oa.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Jn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Jn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Jn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Qc),ps.child=e,this.dispatchEvent(ps),ps.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qs,e,Zf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qs,Jf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}ht.DEFAULT_UP=new E(0,1,0);ht.DEFAULT_MATRIX_AUTO_UPDATE=!0;ht.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Rn=new E,Qn=new E,aa=new E,ei=new E,ms=new E,gs=new E,eh=new E,la=new E,ca=new E,ha=new E,ua=new et,da=new et,fa=new et;class yn{constructor(e=new E,t=new E,n=new E){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Rn.subVectors(e,t),i.cross(Rn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Rn.subVectors(i,t),Qn.subVectors(n,t),aa.subVectors(e,t);const o=Rn.dot(Rn),a=Rn.dot(Qn),l=Rn.dot(aa),c=Qn.dot(Qn),h=Qn.dot(aa),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(c*l-a*h)*d,g=(o*h-a*l)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,ei)===null?!1:ei.x>=0&&ei.y>=0&&ei.x+ei.y<=1}static getInterpolation(e,t,n,i,r,o,a,l){return this.getBarycoord(e,t,n,i,ei)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ei.x),l.addScaledVector(o,ei.y),l.addScaledVector(a,ei.z),l)}static getInterpolatedAttribute(e,t,n,i,r,o){return ua.setScalar(0),da.setScalar(0),fa.setScalar(0),ua.fromBufferAttribute(e,t),da.fromBufferAttribute(e,n),fa.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(ua,r.x),o.addScaledVector(da,r.y),o.addScaledVector(fa,r.z),o}static isFrontFacing(e,t,n,i){return Rn.subVectors(n,t),Qn.subVectors(e,t),Rn.cross(Qn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Rn.subVectors(this.c,this.b),Qn.subVectors(this.a,this.b),Rn.cross(Qn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return yn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return yn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return yn.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return yn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return yn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,r=this.c;let o,a;ms.subVectors(i,n),gs.subVectors(r,n),la.subVectors(e,n);const l=ms.dot(la),c=gs.dot(la);if(l<=0&&c<=0)return t.copy(n);ca.subVectors(e,i);const h=ms.dot(ca),u=gs.dot(ca);if(h>=0&&u<=h)return t.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(ms,o);ha.subVectors(e,r);const f=ms.dot(ha),g=gs.dot(ha);if(g>=0&&f<=g)return t.copy(r);const _=f*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(gs,a);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return eh.subVectors(r,i),a=(u-h)/(u-h+(f-g)),t.copy(i).addScaledVector(eh,a);const p=1/(m+_+d);return o=_*p,a=d*p,t.copy(n).addScaledVector(ms,o).addScaledVector(gs,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Wu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},yi={h:0,s:0,l:0},Kr={h:0,s:0,l:0};function pa(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class Re{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ct){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Je.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=Je.workingColorSpace){return this.r=e,this.g=t,this.b=n,Je.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=Je.workingColorSpace){if(e=rc(e,1),t=He(t,0,1),n=He(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=pa(o,r,e+1/3),this.g=pa(o,r,e),this.b=pa(o,r,e-1/3)}return Je.colorSpaceToWorking(this,i),this}setStyle(e,t=Ct){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ct){const n=Wu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ci(e.r),this.g=ci(e.g),this.b=ci(e.b),this}copyLinearToSRGB(e){return this.r=Is(e.r),this.g=Is(e.g),this.b=Is(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ct){return Je.workingToColorSpace(Gt.copy(this),e),Math.round(He(Gt.r*255,0,255))*65536+Math.round(He(Gt.g*255,0,255))*256+Math.round(He(Gt.b*255,0,255))}getHexString(e=Ct){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Je.workingColorSpace){Je.workingToColorSpace(Gt.copy(this),t);const n=Gt.r,i=Gt.g,r=Gt.b,o=Math.max(n,i,r),a=Math.min(n,i,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Je.workingColorSpace){return Je.workingToColorSpace(Gt.copy(this),t),e.r=Gt.r,e.g=Gt.g,e.b=Gt.b,e}getStyle(e=Ct){Je.workingToColorSpace(Gt.copy(this),e);const t=Gt.r,n=Gt.g,i=Gt.b;return e!==Ct?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(yi),this.setHSL(yi.h+e,yi.s+t,yi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(yi),e.getHSL(Kr);const n=pr(yi.h,Kr.h,t),i=pr(yi.s,Kr.s,t),r=pr(yi.l,Kr.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Gt=new Re;Re.NAMES=Wu;let ep=0;class In extends rs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ep++}),this.uuid=Ln(),this.name="",this.type="Material",this.blending=Ls,this.side=di,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=qa,this.blendDst=ja,this.blendEquation=$i,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Re(0,0,0),this.blendAlpha=0,this.depthFunc=Fs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=zc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=as,this.stencilZFail=as,this.stencilZPass=as,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ls&&(n.blending=this.blending),this.side!==di&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==qa&&(n.blendSrc=this.blendSrc),this.blendDst!==ja&&(n.blendDst=this.blendDst),this.blendEquation!==$i&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Fs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==zc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==as&&(n.stencilFail=this.stencilFail),this.stencilZFail!==as&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==as&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=i(e.textures),o=i(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class bn extends In{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Re(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new En,this.combine=$l,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Rt=new E,Yr=new ue;let tp=0;class ct{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:tp++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ll,this.updateRanges=[],this.gpuType=Dn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Yr.fromBufferAttribute(this,t),Yr.applyMatrix3(e),this.setXY(t,Yr.x,Yr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix3(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix4(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.applyNormalMatrix(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.transformDirection(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Pn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=st(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Pn(t,this.array)),t}setX(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Pn(t,this.array)),t}setY(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Pn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Pn(t,this.array)),t}setW(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array),i=st(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array),i=st(i,this.array),r=st(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ll&&(e.usage=this.usage),e}}class Xu extends ct{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class qu extends ct{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class pt extends ct{constructor(e,t,n){super(new Float32Array(e),t,n)}}let np=0;const gn=new Ue,ma=new ht,_s=new E,cn=new jn,er=new jn,Ot=new E;class Ut extends rs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:np++}),this.uuid=Ln(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Vu(e)?qu:Xu)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new ze().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return gn.makeRotationFromQuaternion(e),this.applyMatrix4(gn),this}rotateX(e){return gn.makeRotationX(e),this.applyMatrix4(gn),this}rotateY(e){return gn.makeRotationY(e),this.applyMatrix4(gn),this}rotateZ(e){return gn.makeRotationZ(e),this.applyMatrix4(gn),this}translate(e,t,n){return gn.makeTranslation(e,t,n),this.applyMatrix4(gn),this}scale(e,t,n){return gn.makeScale(e,t,n),this.applyMatrix4(gn),this}lookAt(e){return ma.lookAt(e),ma.updateMatrix(),this.applyMatrix4(ma.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(_s).negate(),this.translate(_s.x,_s.y,_s.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,r=e.length;i<r;i++){const o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new pt(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new jn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new E(-1/0,-1/0,-1/0),new E(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];cn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ot.addVectors(this.boundingBox.min,cn.min),this.boundingBox.expandByPoint(Ot),Ot.addVectors(this.boundingBox.max,cn.max),this.boundingBox.expandByPoint(Ot)):(this.boundingBox.expandByPoint(cn.min),this.boundingBox.expandByPoint(cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Kn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new E,1/0);return}if(e){const n=this.boundingSphere.center;if(cn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];er.setFromBufferAttribute(a),this.morphTargetsRelative?(Ot.addVectors(cn.min,er.min),cn.expandByPoint(Ot),Ot.addVectors(cn.max,er.max),cn.expandByPoint(Ot)):(cn.expandByPoint(er.min),cn.expandByPoint(er.max))}cn.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)Ot.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Ot));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Ot.fromBufferAttribute(a,c),l&&(_s.fromBufferAttribute(e,c),Ot.add(_s)),i=Math.max(i,n.distanceToSquared(Ot))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ct(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let C=0;C<n.count;C++)a[C]=new E,l[C]=new E;const c=new E,h=new E,u=new E,d=new ue,f=new ue,g=new ue,_=new E,m=new E;function p(C,v,x){c.fromBufferAttribute(n,C),h.fromBufferAttribute(n,v),u.fromBufferAttribute(n,x),d.fromBufferAttribute(r,C),f.fromBufferAttribute(r,v),g.fromBufferAttribute(r,x),h.sub(c),u.sub(c),f.sub(d),g.sub(d);const A=1/(f.x*g.y-g.x*f.y);isFinite(A)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(A),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(A),a[C].add(_),a[v].add(_),a[x].add(_),l[C].add(m),l[v].add(m),l[x].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let C=0,v=S.length;C<v;++C){const x=S[C],A=x.start,L=x.count;for(let U=A,I=A+L;U<I;U+=3)p(e.getX(U+0),e.getX(U+1),e.getX(U+2))}const y=new E,M=new E,R=new E,P=new E;function w(C){R.fromBufferAttribute(i,C),P.copy(R);const v=a[C];y.copy(v),y.sub(R.multiplyScalar(R.dot(v))).normalize(),M.crossVectors(P,v);const A=M.dot(l[C])<0?-1:1;o.setXYZW(C,y.x,y.y,y.z,A)}for(let C=0,v=S.length;C<v;++C){const x=S[C],A=x.start,L=x.count;for(let U=A,I=A+L;U<I;U+=3)w(e.getX(U+0)),w(e.getX(U+1)),w(e.getX(U+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ct(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new E,r=new E,o=new E,a=new E,l=new E,c=new E,h=new E,u=new E;if(e)for(let d=0,f=e.count;d<f;d+=3){const g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);i.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ot.fromBufferAttribute(e,t),Ot.normalize(),e.setXYZ(t,Ot.x,Ot.y,Ot.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let f=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?f=l[_]*a.data.stride+a.offset:f=l[_]*h;for(let p=0;p<h;p++)d[g++]=c[f++]}return new ct(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ut,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const th=new Ue,Vi=new Or,$r=new Kn,nh=new E,Zr=new E,Jr=new E,Qr=new E,ga=new E,eo=new E,ih=new E,to=new E;class $e extends ht{constructor(e=new Ut,t=new bn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(r&&a){eo.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],u=r[l];h!==0&&(ga.fromBufferAttribute(u,e),o?eo.addScaledVector(ga,h):eo.addScaledVector(ga.sub(t),h))}t.add(eo)}return t}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),$r.copy(n.boundingSphere),$r.applyMatrix4(r),Vi.copy(e.ray).recast(e.near),!($r.containsPoint(Vi.origin)===!1&&(Vi.intersectSphere($r,nh)===null||Vi.origin.distanceToSquared(nh)>(e.far-e.near)**2))&&(th.copy(r).invert(),Vi.copy(e.ray).applyMatrix4(th),!(n.boundingBox!==null&&Vi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Vi)))}_computeIntersections(e,t,n){let i;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=o[m.materialIndex],S=Math.max(m.start,f.start),y=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let M=S,R=y;M<R;M+=3){const P=a.getX(M),w=a.getX(M+1),C=a.getX(M+2);i=no(this,p,e,n,c,h,u,P,w,C),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const S=a.getX(m),y=a.getX(m+1),M=a.getX(m+2);i=no(this,o,e,n,c,h,u,S,y,M),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=o[m.materialIndex],S=Math.max(m.start,f.start),y=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let M=S,R=y;M<R;M+=3){const P=M,w=M+1,C=M+2;i=no(this,p,e,n,c,h,u,P,w,C),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const S=m,y=m+1,M=m+2;i=no(this,o,e,n,c,h,u,S,y,M),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function ip(s,e,t,n,i,r,o,a){let l;if(e.side===jt?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,e.side===di,a),l===null)return null;to.copy(a),to.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(to);return c<t.near||c>t.far?null:{distance:c,point:to.clone(),object:s}}function no(s,e,t,n,i,r,o,a,l,c){s.getVertexPosition(a,Zr),s.getVertexPosition(l,Jr),s.getVertexPosition(c,Qr);const h=ip(s,e,t,n,Zr,Jr,Qr,ih);if(h){const u=new E;yn.getBarycoord(ih,Zr,Jr,Qr,u),i&&(h.uv=yn.getInterpolatedAttribute(i,a,l,c,u,new ue)),r&&(h.uv1=yn.getInterpolatedAttribute(r,a,l,c,u,new ue)),o&&(h.normal=yn.getInterpolatedAttribute(o,a,l,c,u,new E),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new E,materialIndex:0};yn.getNormal(Zr,Jr,Qr,d.normal),h.face=d,h.barycoord=u}return h}class Fi extends Ut{constructor(e=1,t=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};const a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,i,o,2),g("x","z","y",1,-1,e,n,-t,i,o,3),g("x","y","z",1,-1,e,t,n,i,r,4),g("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new pt(c,3)),this.setAttribute("normal",new pt(h,3)),this.setAttribute("uv",new pt(u,2));function g(_,m,p,S,y,M,R,P,w,C,v){const x=M/w,A=R/C,L=M/2,U=R/2,I=P/2,B=w+1,O=C+1;let K=0,V=0;const $=new E;for(let se=0;se<O;se++){const de=se*A-U;for(let Le=0;Le<B;Le++){const Qe=Le*x-L;$[_]=Qe*S,$[m]=de*y,$[p]=I,c.push($.x,$.y,$.z),$[_]=0,$[m]=0,$[p]=P>0?1:-1,h.push($.x,$.y,$.z),u.push(Le/w),u.push(1-se/C),K+=1}}for(let se=0;se<C;se++)for(let de=0;de<w;de++){const Le=d+de+B*se,Qe=d+de+B*(se+1),tt=d+(de+1)+B*(se+1),qe=d+(de+1)+B*se;l.push(Le,Qe,qe),l.push(Qe,tt,qe),V+=6}a.addGroup(f,V,v),f+=V,d+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ks(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Zt(s){const e={};for(let t=0;t<s.length;t++){const n=ks(s[t]);for(const i in n)e[i]=n[i]}return e}function sp(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function ju(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Je.workingColorSpace}const Il={clone:ks,merge:Zt};var rp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,op=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class fi extends In{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=rp,this.fragmentShader=op,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ks(e.uniforms),this.uniformsGroups=sp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Ku extends ht{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ue,this.projectionMatrix=new Ue,this.projectionMatrixInverse=new Ue,this.coordinateSystem=Wn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Mi=new E,sh=new ue,rh=new ue;class Wt extends Ku{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=zs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(fr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return zs*2*Math.atan(Math.tan(fr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Mi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Mi.x,Mi.y).multiplyScalar(-e/Mi.z),Mi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Mi.x,Mi.y).multiplyScalar(-e/Mi.z)}getViewSize(e,t){return this.getViewBounds(e,sh,rh),t.subVectors(rh,sh)}setViewOffset(e,t,n,i,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(fr*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const vs=-90,xs=1;class ap extends ht{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Wt(vs,xs,e,t);i.layers=this.layers,this.add(i);const r=new Wt(vs,xs,e,t);r.layers=this.layers,this.add(r);const o=new Wt(vs,xs,e,t);o.layers=this.layers,this.add(o);const a=new Wt(vs,xs,e,t);a.layers=this.layers,this.add(a);const l=new Wt(vs,xs,e,t);l.layers=this.layers,this.add(l);const c=new Wt(vs,xs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===Wn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===No)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Yu extends Lt{constructor(e=[],t=Os,n,i,r,o,a,l,c,h){super(e,t,n,i,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class lp extends Ii{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Yu(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Fi(5,5,5),r=new fi({name:"CubemapFromEquirect",uniforms:ks(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:jt,blending:Pi});r.uniforms.tEquirect.value=t;const o=new $e(i,r),a=t.minFilter;return t.minFilter===ai&&(t.minFilter=Qt),new ap(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(r)}}class Ye extends ht{constructor(){super(),this.isGroup=!0,this.type="Group"}}const cp={type:"move"};class _a{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ye,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ye,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new E,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new E),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ye,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new E,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new E),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(cp)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ye;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class $u extends ht{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new En,this.environmentIntensity=1,this.environmentRotation=new En,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class hp{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ll,this.updateRanges=[],this.version=0,this.uuid=Ln()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ln()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ln()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const $t=new E;class ac{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)$t.fromBufferAttribute(this,t),$t.applyMatrix4(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)$t.fromBufferAttribute(this,t),$t.applyNormalMatrix(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)$t.fromBufferAttribute(this,t),$t.transformDirection(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Pn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=st(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Pn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Pn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Pn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Pn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),n=st(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),n=st(n,this.array),i=st(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),n=st(n,this.array),i=st(i,this.array),r=st(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new ct(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new ac(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const oh=new E,ah=new et,lh=new et,up=new E,ch=new Ue,io=new E,va=new Kn,hh=new Ue,xa=new Or;class dp extends $e{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Uc,this.bindMatrix=new Ue,this.bindMatrixInverse=new Ue,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new jn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,io),this.boundingBox.expandByPoint(io)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Kn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,io),this.boundingSphere.expandByPoint(io)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),va.copy(this.boundingSphere),va.applyMatrix4(i),e.ray.intersectsSphere(va)!==!1&&(hh.copy(i).invert(),xa.copy(e.ray).applyMatrix4(hh),!(this.boundingBox!==null&&xa.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,xa)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new et,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Uc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===hf?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;ah.fromBufferAttribute(i.attributes.skinIndex,e),lh.fromBufferAttribute(i.attributes.skinWeight,e),oh.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const o=lh.getComponent(r);if(o!==0){const a=ah.getComponent(r);ch.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(up.copy(oh).applyMatrix4(ch),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Zu extends ht{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Ju extends Lt{constructor(e=null,t=1,n=1,i,r,o,a,l,c=tn,h=tn,u,d){super(null,o,a,l,c,h,i,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const uh=new Ue,fp=new Ue;class lc{constructor(e=[],t=[]){this.uuid=Ln(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Ue)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Ue;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,o=e.length;r<o;r++){const a=e[r]?e[r].matrixWorld:fp;uh.multiplyMatrices(a,t[r]),uh.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new lc(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Ju(t,e,e,Sn,Dn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const r=e.bones[n];let o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new Zu),this.bones.push(o),this.boneInverses.push(new Ue().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class Nl extends ct{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ys=new Ue,dh=new Ue,so=[],fh=new jn,pp=new Ue,tr=new $e,nr=new Kn;class Qu extends $e{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Nl(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,pp)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new jn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ys),fh.copy(e.boundingBox).applyMatrix4(ys),this.boundingBox.union(fh)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Kn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ys),nr.copy(e.boundingSphere).applyMatrix4(ys),this.boundingSphere.union(nr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(tr.geometry=this.geometry,tr.material=this.material,tr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),nr.copy(this.boundingSphere),nr.applyMatrix4(n),e.ray.intersectsSphere(nr)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,ys),dh.multiplyMatrices(n,ys),tr.matrixWorld=dh,tr.raycast(e,so);for(let o=0,a=so.length;o<a;o++){const l=so[o];l.instanceId=r,l.object=this,t.push(l)}so.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Nl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ju(new Float32Array(i*this.count),i,this.count,ec,Dn));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=i*e;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ya=new E,mp=new E,gp=new ze;class wi{constructor(e=new E(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=ya.subVectors(n,t).cross(mp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(ya),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||gp.getNormalMatrix(e),i=this.coplanarPoint(ya).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Hi=new Kn,_p=new ue(.5,.5),ro=new E;class cc{constructor(e=new wi,t=new wi,n=new wi,i=new wi,r=new wi,o=new wi){this.planes=[e,t,n,i,r,o]}set(e,t,n,i,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Wn,n=!1){const i=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],f=r[7],g=r[8],_=r[9],m=r[10],p=r[11],S=r[12],y=r[13],M=r[14],R=r[15];if(i[0].setComponents(c-o,f-h,p-g,R-S).normalize(),i[1].setComponents(c+o,f+h,p+g,R+S).normalize(),i[2].setComponents(c+a,f+u,p+_,R+y).normalize(),i[3].setComponents(c-a,f-u,p-_,R-y).normalize(),n)i[4].setComponents(l,d,m,M).normalize(),i[5].setComponents(c-l,f-d,p-m,R-M).normalize();else if(i[4].setComponents(c-l,f-d,p-m,R-M).normalize(),t===Wn)i[5].setComponents(c+l,f+d,p+m,R+M).normalize();else if(t===No)i[5].setComponents(l,d,m,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Hi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Hi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Hi)}intersectsSprite(e){Hi.center.set(0,0,0);const t=_p.distanceTo(e.center);return Hi.radius=.7071067811865476+t,Hi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Hi)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(ro.x=i.normal.x>0?e.max.x:e.min.x,ro.y=i.normal.y>0?e.max.y:e.min.y,ro.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(ro)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class hc extends In{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Re(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Uo=new E,Fo=new E,ph=new Ue,ir=new Or,oo=new Kn,Ma=new E,mh=new E;class Wo extends ht{constructor(e=new Ut,t=new hc){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)Uo.fromBufferAttribute(t,i-1),Fo.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Uo.distanceTo(Fo);e.setAttribute("lineDistance",new pt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),oo.copy(n.boundingSphere),oo.applyMatrix4(i),oo.radius+=r,e.ray.intersectsSphere(oo)===!1)return;ph.copy(i).invert(),ir.copy(e.ray).applyMatrix4(ph);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=f,m=g-1;_<m;_+=c){const p=h.getX(_),S=h.getX(_+1),y=ao(this,e,ir,l,p,S,_);y&&t.push(y)}if(this.isLineLoop){const _=h.getX(g-1),m=h.getX(f),p=ao(this,e,ir,l,_,m,g-1);p&&t.push(p)}}else{const f=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let _=f,m=g-1;_<m;_+=c){const p=ao(this,e,ir,l,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){const _=ao(this,e,ir,l,g-1,f,g-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function ao(s,e,t,n,i,r,o){const a=s.geometry.attributes.position;if(Uo.fromBufferAttribute(a,i),Fo.fromBufferAttribute(a,r),t.distanceSqToSegment(Uo,Fo,Ma,mh)>n)return;Ma.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(Ma);if(!(c<e.near||c>e.far))return{distance:c,point:mh.clone().applyMatrix4(s.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:s}}const gh=new E,_h=new E;class vp extends Wo{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)gh.fromBufferAttribute(t,i),_h.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+gh.distanceTo(_h);e.setAttribute("lineDistance",new pt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class xp extends Wo{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class ed extends In{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Re(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const vh=new Ue,Ul=new Or,lo=new Kn,co=new E;class yp extends ht{constructor(e=new Ut,t=new ed){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),lo.copy(n.boundingSphere),lo.applyMatrix4(i),lo.radius+=r,e.ray.intersectsSphere(lo)===!1)return;vh.copy(i).invert(),Ul.copy(e.ray).applyMatrix4(vh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=d,_=f;g<_;g++){const m=c.getX(g);co.fromBufferAttribute(u,m),xh(co,m,l,i,e,t,this)}}else{const d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let g=d,_=f;g<_;g++)co.fromBufferAttribute(u,g),xh(co,g,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function xh(s,e,t,n,i,r,o){const a=Ul.distanceSqToPoint(s);if(a<t){const l=new E;Ul.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class td extends Lt{constructor(e,t,n,i,r,o,a,l,c){super(e,t,n,i,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class nd extends Lt{constructor(e,t,n=ts,i,r,o,a=tn,l=tn,c,h=Ar,u=1){if(h!==Ar&&h!==Rr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:u};super(d,i,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new oc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class id extends Lt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class uc extends Ut{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const r=[],o=[],a=[],l=[],c=new E,h=new ue;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){const f=n+u/t*i;c.x=e*Math.cos(f),c.y=e*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[d]/e+1)/2,h.y=(o[d+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new pt(o,3)),this.setAttribute("normal",new pt(a,3)),this.setAttribute("uv",new pt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new uc(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class qt extends Ut{constructor(e=1,t=1,n=1,i=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const h=[],u=[],d=[],f=[];let g=0;const _=[],m=n/2;let p=0;S(),o===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new pt(u,3)),this.setAttribute("normal",new pt(d,3)),this.setAttribute("uv",new pt(f,2));function S(){const M=new E,R=new E;let P=0;const w=(t-e)/n;for(let C=0;C<=r;C++){const v=[],x=C/r,A=x*(t-e)+e;for(let L=0;L<=i;L++){const U=L/i,I=U*l+a,B=Math.sin(I),O=Math.cos(I);R.x=A*B,R.y=-x*n+m,R.z=A*O,u.push(R.x,R.y,R.z),M.set(B,w,O).normalize(),d.push(M.x,M.y,M.z),f.push(U,1-x),v.push(g++)}_.push(v)}for(let C=0;C<i;C++)for(let v=0;v<r;v++){const x=_[v][C],A=_[v+1][C],L=_[v+1][C+1],U=_[v][C+1];(e>0||v!==0)&&(h.push(x,A,U),P+=3),(t>0||v!==r-1)&&(h.push(A,L,U),P+=3)}c.addGroup(p,P,0),p+=P}function y(M){const R=g,P=new ue,w=new E;let C=0;const v=M===!0?e:t,x=M===!0?1:-1;for(let L=1;L<=i;L++)u.push(0,m*x,0),d.push(0,x,0),f.push(.5,.5),g++;const A=g;for(let L=0;L<=i;L++){const I=L/i*l+a,B=Math.cos(I),O=Math.sin(I);w.x=v*O,w.y=m*x,w.z=v*B,u.push(w.x,w.y,w.z),d.push(0,x,0),P.x=B*.5+.5,P.y=O*.5*x+.5,f.push(P.x,P.y),g++}for(let L=0;L<i;L++){const U=R+L,I=A+L;M===!0?h.push(I,I+1,U):h.push(I+1,I,U),C+=3}c.addGroup(p,C,M===!0?1:2),p+=C}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class mi{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let i=0;const r=n.length;let o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(r-1);const h=n[i],d=n[i+1]-h,f=(o-h)/d;return(i+f)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);const o=this.getPoint(i),a=this.getPoint(r),l=t||(o.isVector2?new ue:new E);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new E,i=[],r=[],o=[],a=new E,l=new Ue;for(let f=0;f<=e;f++){const g=f/e;i[f]=this.getTangentAt(g,new E)}r[0]=new E,o[0]=new E;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(He(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,g))}o[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(He(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(i[g],f*g)),o[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class sd extends mi{constructor(e=0,t=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new ue){const n=t,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);const a=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Mp extends sd{constructor(e,t,n,i,r,o){super(e,t,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function dc(){let s=0,e=0,t=0,n=0;function i(r,o,a,l){s=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){i(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,i(o,a,d,f)},calc:function(r){const o=r*r,a=o*r;return s+e*r+t*o+n*a}}}const ho=new E,Sa=new dc,ba=new dc,Ea=new dc;class rd extends mi{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new E){const n=t,i=this.points,r=i.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%r]:(ho.subVectors(i[0],i[1]).add(i[0]),c=ho);const u=i[a%r],d=i[(a+1)%r];if(this.closed||a+2<r?h=i[(a+2)%r]:(ho.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=ho),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Sa.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,_,m),ba.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,_,m),Ea.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(Sa.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),ba.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Ea.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(Sa.calc(l),ba.calc(l),Ea.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new E().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function yh(s,e,t,n,i){const r=(n-e)*.5,o=(i-t)*.5,a=s*s,l=s*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*s+t}function Sp(s,e){const t=1-s;return t*t*e}function bp(s,e){return 2*(1-s)*s*e}function Ep(s,e){return s*s*e}function mr(s,e,t,n){return Sp(s,e)+bp(s,t)+Ep(s,n)}function Tp(s,e){const t=1-s;return t*t*t*e}function wp(s,e){const t=1-s;return 3*t*t*s*e}function Ap(s,e){return 3*(1-s)*s*s*e}function Rp(s,e){return s*s*s*e}function gr(s,e,t,n,i){return Tp(s,e)+wp(s,t)+Ap(s,n)+Rp(s,i)}class Cp extends mi{constructor(e=new ue,t=new ue,n=new ue,i=new ue){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new ue){const n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(gr(e,i.x,r.x,o.x,a.x),gr(e,i.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Pp extends mi{constructor(e=new E,t=new E,n=new E,i=new E){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new E){const n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(gr(e,i.x,r.x,o.x,a.x),gr(e,i.y,r.y,o.y,a.y),gr(e,i.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Dp extends mi{constructor(e=new ue,t=new ue){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ue){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ue){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Lp extends mi{constructor(e=new E,t=new E){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new E){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new E){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ip extends mi{constructor(e=new ue,t=new ue,n=new ue){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ue){const n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(mr(e,i.x,r.x,o.x),mr(e,i.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class od extends mi{constructor(e=new E,t=new E,n=new E){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new E){const n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(mr(e,i.x,r.x,o.x),mr(e,i.y,r.y,o.y),mr(e,i.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Np extends mi{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ue){const n=t,i=this.points,r=(i.length-1)*e,o=Math.floor(r),a=r-o,l=i[o===0?o:o-1],c=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(yh(a,l.x,c.x,h.x,u.x),yh(a,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new ue().fromArray(i))}return this}}var Up=Object.freeze({__proto__:null,ArcCurve:Mp,CatmullRomCurve3:rd,CubicBezierCurve:Cp,CubicBezierCurve3:Pp,EllipseCurve:sd,LineCurve:Dp,LineCurve3:Lp,QuadraticBezierCurve:Ip,QuadraticBezierCurve3:od,SplineCurve:Np});class Ni extends Ut{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=e/a,d=t/l,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const S=p*d-o;for(let y=0;y<c;y++){const M=y*u-r;g.push(M,-S,0),_.push(0,0,1),m.push(y/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let S=0;S<a;S++){const y=S+c*p,M=S+c*(p+1),R=S+1+c*(p+1),P=S+1+c*p;f.push(y,M,P),f.push(M,R,P)}this.setIndex(f),this.setAttribute("position",new pt(g,3)),this.setAttribute("normal",new pt(_,3)),this.setAttribute("uv",new pt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ni(e.width,e.height,e.widthSegments,e.heightSegments)}}class Ui extends Ut{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new E,d=new E,f=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const S=[],y=p/n;let M=0;p===0&&o===0?M=.5/t:p===n&&l===Math.PI&&(M=-.5/t);for(let R=0;R<=t;R++){const P=R/t;u.x=-e*Math.cos(i+P*r)*Math.sin(o+y*a),u.y=e*Math.cos(o+y*a),u.z=e*Math.sin(i+P*r)*Math.sin(o+y*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),m.push(P+M,1-y),S.push(c++)}h.push(S)}for(let p=0;p<n;p++)for(let S=0;S<t;S++){const y=h[p][S+1],M=h[p][S],R=h[p+1][S],P=h[p+1][S+1];(p!==0||o>0)&&f.push(y,M,P),(p!==n-1||l<Math.PI)&&f.push(M,R,P)}this.setIndex(f),this.setAttribute("position",new pt(g,3)),this.setAttribute("normal",new pt(_,3)),this.setAttribute("uv",new pt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ui(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Tn extends Ut{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],l=[],c=[],h=new E,u=new E,d=new E;for(let f=0;f<=n;f++)for(let g=0;g<=i;g++){const _=g/i*r,m=f/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(_),u.y=(e+t*Math.cos(m))*Math.sin(_),u.z=t*Math.sin(m),a.push(u.x,u.y,u.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(g/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=i;g++){const _=(i+1)*f+g-1,m=(i+1)*(f-1)+g-1,p=(i+1)*(f-1)+g,S=(i+1)*f+g;o.push(_,m,S),o.push(m,p,S)}this.setIndex(o),this.setAttribute("position",new pt(a,3)),this.setAttribute("normal",new pt(l,3)),this.setAttribute("uv",new pt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Tn(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class fc extends Ut{constructor(e=new od(new E(-1,-1,0),new E(-1,1,0),new E(1,1,0)),t=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:r};const o=e.computeFrenetFrames(t,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new E,l=new E,c=new ue;let h=new E;const u=[],d=[],f=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new pt(u,3)),this.setAttribute("normal",new pt(d,3)),this.setAttribute("uv",new pt(f,2));function _(){for(let y=0;y<t;y++)m(y);m(r===!1?t:0),S(),p()}function m(y){h=e.getPointAt(y/t,h);const M=o.normals[y],R=o.binormals[y];for(let P=0;P<=i;P++){const w=P/i*Math.PI*2,C=Math.sin(w),v=-Math.cos(w);l.x=v*M.x+C*R.x,l.y=v*M.y+C*R.y,l.z=v*M.z+C*R.z,l.normalize(),d.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,u.push(a.x,a.y,a.z)}}function p(){for(let y=1;y<=t;y++)for(let M=1;M<=i;M++){const R=(i+1)*(y-1)+(M-1),P=(i+1)*y+(M-1),w=(i+1)*y+M,C=(i+1)*(y-1)+M;g.push(R,P,C),g.push(P,w,C)}}function S(){for(let y=0;y<=t;y++)for(let M=0;M<=i;M++)c.x=y/t,c.y=M/i,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new fc(new Up[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class Mh extends fi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class pi extends In{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Re(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Re(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=sc,this.normalScale=new ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new En,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class fn extends pi{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ue(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return He(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Re(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Re(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Re(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Fp extends In{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Re(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Re(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=sc,this.normalScale=new ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new En,this.combine=$l,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Op extends In{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ff,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Bp extends In{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class zp extends hc{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}function uo(s,e){return!s||s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function kp(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Vp(s){function e(i,r){return s[i]-s[r]}const t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Sh(s,e,t){const n=s.length,i=new s.constructor(n);for(let r=0,o=0;o!==n;++r){const a=t[r]*e;for(let l=0;l!==e;++l)i[o++]=s[a+l]}return i}function ad(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push(...o)),r=s[i++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=s[i++];while(r!==void 0)}class Br{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=r)){const a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let o=0;o!==i;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Hp extends Br{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Fc,endingEnd:Fc}}intervalChanged_(e,t,n){const i=this.parameterPositions;let r=e-2,o=e+1,a=i[r],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Oc:r=e,a=2*t-n;break;case Bc:r=i.length-2,a=t+i[r]-i[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Oc:o=e,l=2*n-t;break;case Bc:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}const c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(i-t),_=g*g,m=_*g,p=-d*m+2*d*_-d*g,S=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*g+1,y=(-1-f)*m+(1.5+f)*_+.5*g,M=f*m-f*_;for(let R=0;R!==a;++R)r[R]=p*o[h+R]+S*o[c+R]+y*o[l+R]+M*o[u+R];return r}}class Gp extends Br{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==a;++d)r[d]=o[c+d]*u+o[l+d]*h;return r}}class Wp extends Br{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Fn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=uo(t,this.TimeBufferType),this.values=uo(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:uo(e.times,Array),values:uo(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Wp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Gp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Hp(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Cr:t=this.InterpolantFactoryMethodDiscrete;break;case Pr:t=this.InterpolantFactoryMethodLinear;break;case $o:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Cr;case this.InterpolantFactoryMethodLinear:return Pr;case this.InterpolantFactoryMethodSmooth:return $o}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let r=0,o=i-1;for(;r!==i&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&kp(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===$o,r=e.length-1;let o=1;for(let a=1;a<r;++a){let l=!1;const c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(i)l=!0;else{const u=a*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){const _=t[u+g];if(_!==t[d+g]||_!==t[f+g]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const u=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Fn.prototype.ValueTypeName="";Fn.prototype.TimeBufferType=Float32Array;Fn.prototype.ValueBufferType=Float32Array;Fn.prototype.DefaultInterpolation=Pr;class qs extends Fn{constructor(e,t,n){super(e,t,n)}}qs.prototype.ValueTypeName="bool";qs.prototype.ValueBufferType=Array;qs.prototype.DefaultInterpolation=Cr;qs.prototype.InterpolantFactoryMethodLinear=void 0;qs.prototype.InterpolantFactoryMethodSmooth=void 0;class ld extends Fn{constructor(e,t,n,i){super(e,t,n,i)}}ld.prototype.ValueTypeName="color";class Vs extends Fn{constructor(e,t,n,i){super(e,t,n,i)}}Vs.prototype.ValueTypeName="number";class Xp extends Br{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let h=c+a;c!==h;c+=4)Fe.slerpFlat(r,0,o,c-a,o,c,l);return r}}class Hs extends Fn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Xp(this.times,this.values,this.getValueSize(),e)}}Hs.prototype.ValueTypeName="quaternion";Hs.prototype.InterpolantFactoryMethodSmooth=void 0;class js extends Fn{constructor(e,t,n){super(e,t,n)}}js.prototype.ValueTypeName="string";js.prototype.ValueBufferType=Array;js.prototype.DefaultInterpolation=Cr;js.prototype.InterpolantFactoryMethodLinear=void 0;js.prototype.InterpolantFactoryMethodSmooth=void 0;class Gs extends Fn{constructor(e,t,n,i){super(e,t,n,i)}}Gs.prototype.ValueTypeName="vector";class qp{constructor(e="",t=-1,n=[],i=uf){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Ln(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(Kp(n[o]).scale(i));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,o=n.length;r!==o;++r)t.push(Fn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const r=t.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);const h=Vp(l);l=Sh(l,1,h),c=Sh(c,1,h),!i&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new Vs(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],h=c.name.match(r);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,g,_){if(f.length!==0){const m=[],p=[];ad(f,m,p,g),m.length!==0&&_.push(new u(d,m,p))}},i=[],r=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let _=0;_<d[g].morphTargets.length;_++)f[d[g].morphTargets[_]]=-1;for(const _ in f){const m=[],p=[];for(let S=0;S!==d[g].morphTargets.length;++S){const y=d[g];m.push(y.time),p.push(y.morphTarget===_?1:0)}i.push(new Vs(".morphTargetInfluence["+_+"]",m,p))}l=f.length*o}else{const f=".bones["+t[u].name+"]";n(Gs,f+".position",d,"pos",i),n(Hs,f+".quaternion",d,"rot",i),n(Gs,f+".scale",d,"scl",i)}}return i.length===0?null:new this(r,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function jp(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Vs;case"vector":case"vector2":case"vector3":case"vector4":return Gs;case"color":return ld;case"quaternion":return Hs;case"bool":case"boolean":return qs;case"string":return js}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function Kp(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=jp(s.type);if(s.times===void 0){const t=[],n=[];ad(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}const li={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class Yp{constructor(e,t,n){const i=this;let r=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}}const $p=new Yp;class Ks{constructor(e){this.manager=e!==void 0?e:$p,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Ks.DEFAULT_MATERIAL_NAME="__DEFAULT";const ti={};class Zp extends Error{constructor(e,t){super(e),this.response=t}}class cd extends Ks{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=li.get(`file:${e}`);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(ti[e]!==void 0){ti[e].push({onLoad:t,onProgress:n,onError:i});return}ti[e]=[],ti[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=ti[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0;let _=0;const m=new ReadableStream({start(p){S();function S(){u.read().then(({done:y,value:M})=>{if(y)p.close();else{_+=M.byteLength;const R=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:f});for(let P=0,w=h.length;P<w;P++){const C=h[P];C.onProgress&&C.onProgress(R)}p.enqueue(M),S()}},y=>{p.error(y)})}}});return new Response(m)}else throw new Zp(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a==="")return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{li.add(`file:${e}`,c);const h=ti[e];delete ti[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=ti[e];if(h===void 0)throw this.manager.itemError(e),c;delete ti[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Ms=new WeakMap;class Jp extends Ks{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=li.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);else{let u=Ms.get(o);u===void 0&&(u=[],Ms.set(o,u)),u.push({onLoad:t,onError:i})}return o}const a=Dr("img");function l(){h(),t&&t(this);const u=Ms.get(this)||[];for(let d=0;d<u.length;d++){const f=u[d];f.onLoad&&f.onLoad(this)}Ms.delete(this),r.manager.itemEnd(e)}function c(u){h(),i&&i(u),li.remove(`image:${e}`);const d=Ms.get(this)||[];for(let f=0;f<d.length;f++){const g=d[f];g.onError&&g.onError(u)}Ms.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),li.add(`image:${e}`,a),r.manager.itemStart(e),a.src=e,a}}class Qp extends Ks{constructor(e){super(e)}load(e,t,n,i){const r=new Lt,o=new Jp(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}}class Xo extends ht{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Re(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class bh extends Xo{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ht.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Re(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Ta=new Ue,Eh=new E,Th=new E;class pc{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ue(512,512),this.mapType=Un,this.map=null,this.mapPass=null,this.matrix=new Ue,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new cc,this._frameExtents=new ue(1,1),this._viewportCount=1,this._viewports=[new et(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Eh.setFromMatrixPosition(e.matrixWorld),t.position.copy(Eh),Th.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Th),t.updateMatrixWorld(),Ta.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ta,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ta)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class em extends pc{constructor(){super(new Wt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=zs*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class hd extends Xo{constructor(e,t,n=0,i=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ht.DEFAULT_UP),this.updateMatrix(),this.target=new ht,this.distance=n,this.angle=i,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new em}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const wh=new Ue,sr=new E,wa=new E;class tm extends pc{constructor(){super(new Wt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ue(4,2),this._viewportCount=6,this._viewports=[new et(2,1,1,1),new et(0,1,1,1),new et(3,1,1,1),new et(1,1,1,1),new et(3,0,1,1),new et(1,0,1,1)],this._cubeDirections=[new E(1,0,0),new E(-1,0,0),new E(0,0,1),new E(0,0,-1),new E(0,1,0),new E(0,-1,0)],this._cubeUps=[new E(0,1,0),new E(0,1,0),new E(0,1,0),new E(0,1,0),new E(0,0,1),new E(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),sr.setFromMatrixPosition(e.matrixWorld),n.position.copy(sr),wa.copy(n.position),wa.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(wa),n.updateMatrixWorld(),i.makeTranslation(-sr.x,-sr.y,-sr.z),wh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(wh,n.coordinateSystem,n.reversedDepth)}}class ud extends Xo{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new tm}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class qo extends Ku{constructor(e=-1,t=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class nm extends pc{constructor(){super(new qo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Fl extends Xo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ht.DEFAULT_UP),this.updateMatrix(),this.target=new ht,this.shadow=new nm}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class _r{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const Aa=new WeakMap;class im extends Ks{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=li.get(`image-bitmap:${e}`);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(c=>{if(Aa.has(o)===!0)i&&i(Aa.get(o)),r.manager.itemError(e),r.manager.itemEnd(e);else return t&&t(c),r.manager.itemEnd(e),c});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return li.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){i&&i(c),Aa.set(l,c),li.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});li.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class sm extends Wt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const mc="\\[\\]\\.:\\/",rm=new RegExp("["+mc+"]","g"),gc="[^"+mc+"]",om="[^"+mc.replace("\\.","")+"]",am=/((?:WC+[\/:])*)/.source.replace("WC",gc),lm=/(WCOD+)?/.source.replace("WCOD",om),cm=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",gc),hm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",gc),um=new RegExp("^"+am+lm+cm+hm+"$"),dm=["material","materials","bones","map"];class fm{constructor(e,t,n){const i=n||rt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class rt{constructor(e,t,n){this.path=t,this.parsedPath=n||rt.parseTrackName(t),this.node=rt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new rt.Composite(e,t,n):new rt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(rm,"")}static parseTrackName(e){const t=um.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);dm.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let r=t.propertyIndex;if(e||(e=rt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[i];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}rt.Composite=fm;rt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};rt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};rt.prototype.GetterByBindingType=[rt.prototype._getValue_direct,rt.prototype._getValue_array,rt.prototype._getValue_arrayElement,rt.prototype._getValue_toArray];rt.prototype.SetterByBindingTypeAndVersioning=[[rt.prototype._setValue_direct,rt.prototype._setValue_direct_setNeedsUpdate,rt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[rt.prototype._setValue_array,rt.prototype._setValue_array_setNeedsUpdate,rt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[rt.prototype._setValue_arrayElement,rt.prototype._setValue_arrayElement_setNeedsUpdate,rt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[rt.prototype._setValue_fromArray,rt.prototype._setValue_fromArray_setNeedsUpdate,rt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class Ah{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=He(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(He(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class pm extends rs{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Rh(s,e,t,n){const i=mm(n);switch(t){case Fu:return s*e;case ec:return s*e/i.components*i.byteLength;case tc:return s*e/i.components*i.byteLength;case Bu:return s*e*2/i.components*i.byteLength;case nc:return s*e*2/i.components*i.byteLength;case Ou:return s*e*3/i.components*i.byteLength;case Sn:return s*e*4/i.components*i.byteLength;case ic:return s*e*4/i.components*i.byteLength;case bo:case Eo:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case To:case wo:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case sl:case ol:return Math.max(s,16)*Math.max(e,8)/4;case il:case rl:return Math.max(s,8)*Math.max(e,8)/2;case al:case ll:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case cl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case hl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case ul:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case dl:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case fl:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case pl:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case ml:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case gl:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case _l:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case vl:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case xl:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case yl:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Ml:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case Sl:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case bl:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case El:case Tl:case wl:return Math.ceil(s/4)*Math.ceil(e/4)*16;case Al:case Rl:return Math.ceil(s/4)*Math.ceil(e/4)*8;case Cl:case Pl:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function mm(s){switch(s){case Un:case Lu:return{byteLength:1,components:1};case Tr:case Iu:case Xs:return{byteLength:2,components:1};case Jl:case Ql:return{byteLength:2,components:4};case ts:case Zl:case Dn:return{byteLength:4,components:1};case Nu:case Uu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Yl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Yl);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function dd(){let s=null,e=!1,t=null,n=null;function i(r,o){t(r,o),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function gm(s){const e=new WeakMap;function t(a,l){const c=a.array,h=a.usage,u=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=s.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l.updateRanges;if(s.bindBuffer(c,a),u.length===0)s.bufferSubData(c,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){const g=u[d],_=u[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){const _=u[f];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(s.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}var _m=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,vm=`#ifdef USE_ALPHAHASH
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
#endif`,xm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ym=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Mm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Sm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,bm=`#ifdef USE_AOMAP
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
#endif`,Em=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Tm=`#ifdef USE_BATCHING
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
#endif`,wm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Am=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Rm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Cm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Pm=`#ifdef USE_IRIDESCENCE
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
#endif`,Dm=`#ifdef USE_BUMPMAP
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
#endif`,Lm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Im=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Nm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Um=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Fm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Om=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Bm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,zm=`#if defined( USE_COLOR_ALPHA )
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
#endif`,km=`#define PI 3.141592653589793
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
} // validated`,Vm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Hm=`vec3 transformedNormal = objectNormal;
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
#endif`,Gm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Wm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Xm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,qm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,jm="gl_FragColor = linearToOutputTexel( gl_FragColor );",Km=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ym=`#ifdef USE_ENVMAP
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
#endif`,$m=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Zm=`#ifdef USE_ENVMAP
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
#endif`,Jm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Qm=`#ifdef USE_ENVMAP
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
#endif`,eg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,tg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ng=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ig=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,sg=`#ifdef USE_GRADIENTMAP
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
}`,rg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,og=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ag=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lg=`uniform bool receiveShadow;
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
#endif`,cg=`#ifdef USE_ENVMAP
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
#endif`,hg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ug=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,dg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,fg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,pg=`PhysicalMaterial material;
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
#endif`,mg=`struct PhysicalMaterial {
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
}`,gg=`
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
#endif`,_g=`#if defined( RE_IndirectDiffuse )
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
#endif`,vg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,xg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,yg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Mg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Sg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,bg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Eg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Tg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,wg=`#if defined( USE_POINTS_UV )
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
#endif`,Ag=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Rg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Cg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Pg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Dg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Lg=`#ifdef USE_MORPHTARGETS
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
#endif`,Ig=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ng=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Ug=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Fg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Og=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,zg=`#ifdef USE_NORMALMAP
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
#endif`,kg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Vg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Hg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Gg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Wg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Xg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,qg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,jg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Kg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Yg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,$g=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Zg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Jg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Qg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,e_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,t_=`float getShadowMask() {
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
}`,n_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,i_=`#ifdef USE_SKINNING
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
#endif`,s_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,r_=`#ifdef USE_SKINNING
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
#endif`,o_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,a_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,l_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,c_=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,h_=`#ifdef USE_TRANSMISSION
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
#endif`,u_=`#ifdef USE_TRANSMISSION
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
#endif`,d_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,f_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,p_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,m_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const g_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,__=`uniform sampler2D t2D;
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
}`,v_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,x_=`#ifdef ENVMAP_TYPE_CUBE
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
}`,y_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,M_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,S_=`#include <common>
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
}`,b_=`#if DEPTH_PACKING == 3200
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
}`,E_=`#define DISTANCE
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
}`,T_=`#define DISTANCE
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
}`,w_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,A_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,R_=`uniform float scale;
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
}`,C_=`uniform vec3 diffuse;
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
}`,P_=`#include <common>
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
}`,D_=`uniform vec3 diffuse;
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
}`,L_=`#define LAMBERT
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
}`,I_=`#define LAMBERT
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
}`,N_=`#define MATCAP
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
}`,U_=`#define MATCAP
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
}`,F_=`#define NORMAL
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
}`,O_=`#define NORMAL
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
}`,B_=`#define PHONG
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
}`,z_=`#define PHONG
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
}`,k_=`#define STANDARD
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
}`,V_=`#define STANDARD
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
}`,H_=`#define TOON
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
}`,G_=`#define TOON
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
}`,W_=`uniform float size;
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
}`,X_=`uniform vec3 diffuse;
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
}`,q_=`#include <common>
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
}`,j_=`uniform vec3 color;
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
}`,K_=`uniform float rotation;
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
}`,Y_=`uniform vec3 diffuse;
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
}`,We={alphahash_fragment:_m,alphahash_pars_fragment:vm,alphamap_fragment:xm,alphamap_pars_fragment:ym,alphatest_fragment:Mm,alphatest_pars_fragment:Sm,aomap_fragment:bm,aomap_pars_fragment:Em,batching_pars_vertex:Tm,batching_vertex:wm,begin_vertex:Am,beginnormal_vertex:Rm,bsdfs:Cm,iridescence_fragment:Pm,bumpmap_pars_fragment:Dm,clipping_planes_fragment:Lm,clipping_planes_pars_fragment:Im,clipping_planes_pars_vertex:Nm,clipping_planes_vertex:Um,color_fragment:Fm,color_pars_fragment:Om,color_pars_vertex:Bm,color_vertex:zm,common:km,cube_uv_reflection_fragment:Vm,defaultnormal_vertex:Hm,displacementmap_pars_vertex:Gm,displacementmap_vertex:Wm,emissivemap_fragment:Xm,emissivemap_pars_fragment:qm,colorspace_fragment:jm,colorspace_pars_fragment:Km,envmap_fragment:Ym,envmap_common_pars_fragment:$m,envmap_pars_fragment:Zm,envmap_pars_vertex:Jm,envmap_physical_pars_fragment:cg,envmap_vertex:Qm,fog_vertex:eg,fog_pars_vertex:tg,fog_fragment:ng,fog_pars_fragment:ig,gradientmap_pars_fragment:sg,lightmap_pars_fragment:rg,lights_lambert_fragment:og,lights_lambert_pars_fragment:ag,lights_pars_begin:lg,lights_toon_fragment:hg,lights_toon_pars_fragment:ug,lights_phong_fragment:dg,lights_phong_pars_fragment:fg,lights_physical_fragment:pg,lights_physical_pars_fragment:mg,lights_fragment_begin:gg,lights_fragment_maps:_g,lights_fragment_end:vg,logdepthbuf_fragment:xg,logdepthbuf_pars_fragment:yg,logdepthbuf_pars_vertex:Mg,logdepthbuf_vertex:Sg,map_fragment:bg,map_pars_fragment:Eg,map_particle_fragment:Tg,map_particle_pars_fragment:wg,metalnessmap_fragment:Ag,metalnessmap_pars_fragment:Rg,morphinstance_vertex:Cg,morphcolor_vertex:Pg,morphnormal_vertex:Dg,morphtarget_pars_vertex:Lg,morphtarget_vertex:Ig,normal_fragment_begin:Ng,normal_fragment_maps:Ug,normal_pars_fragment:Fg,normal_pars_vertex:Og,normal_vertex:Bg,normalmap_pars_fragment:zg,clearcoat_normal_fragment_begin:kg,clearcoat_normal_fragment_maps:Vg,clearcoat_pars_fragment:Hg,iridescence_pars_fragment:Gg,opaque_fragment:Wg,packing:Xg,premultiplied_alpha_fragment:qg,project_vertex:jg,dithering_fragment:Kg,dithering_pars_fragment:Yg,roughnessmap_fragment:$g,roughnessmap_pars_fragment:Zg,shadowmap_pars_fragment:Jg,shadowmap_pars_vertex:Qg,shadowmap_vertex:e_,shadowmask_pars_fragment:t_,skinbase_vertex:n_,skinning_pars_vertex:i_,skinning_vertex:s_,skinnormal_vertex:r_,specularmap_fragment:o_,specularmap_pars_fragment:a_,tonemapping_fragment:l_,tonemapping_pars_fragment:c_,transmission_fragment:h_,transmission_pars_fragment:u_,uv_pars_fragment:d_,uv_pars_vertex:f_,uv_vertex:p_,worldpos_vertex:m_,background_vert:g_,background_frag:__,backgroundCube_vert:v_,backgroundCube_frag:x_,cube_vert:y_,cube_frag:M_,depth_vert:S_,depth_frag:b_,distanceRGBA_vert:E_,distanceRGBA_frag:T_,equirect_vert:w_,equirect_frag:A_,linedashed_vert:R_,linedashed_frag:C_,meshbasic_vert:P_,meshbasic_frag:D_,meshlambert_vert:L_,meshlambert_frag:I_,meshmatcap_vert:N_,meshmatcap_frag:U_,meshnormal_vert:F_,meshnormal_frag:O_,meshphong_vert:B_,meshphong_frag:z_,meshphysical_vert:k_,meshphysical_frag:V_,meshtoon_vert:H_,meshtoon_frag:G_,points_vert:W_,points_frag:X_,shadow_vert:q_,shadow_frag:j_,sprite_vert:K_,sprite_frag:Y_},ae={common:{diffuse:{value:new Re(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ze}},envmap:{envMap:{value:null},envMapRotation:{value:new ze},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ze},normalScale:{value:new ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Re(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Re(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0},uvTransform:{value:new ze}},sprite:{diffuse:{value:new Re(16777215)},opacity:{value:1},center:{value:new ue(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}}},kn={basic:{uniforms:Zt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:Zt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new Re(0)}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:Zt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new Re(0)},specular:{value:new Re(1118481)},shininess:{value:30}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:Zt([ae.common,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.roughnessmap,ae.metalnessmap,ae.fog,ae.lights,{emissive:{value:new Re(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:Zt([ae.common,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.gradientmap,ae.fog,ae.lights,{emissive:{value:new Re(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:Zt([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:Zt([ae.points,ae.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:Zt([ae.common,ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:Zt([ae.common,ae.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:Zt([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,{opacity:{value:1}}]),vertexShader:We.meshnormal_vert,fragmentShader:We.meshnormal_frag},sprite:{uniforms:Zt([ae.sprite,ae.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:We.background_vert,fragmentShader:We.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ze}},vertexShader:We.backgroundCube_vert,fragmentShader:We.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distanceRGBA:{uniforms:Zt([ae.common,ae.displacementmap,{referencePosition:{value:new E},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:We.distanceRGBA_vert,fragmentShader:We.distanceRGBA_frag},shadow:{uniforms:Zt([ae.lights,ae.fog,{color:{value:new Re(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};kn.physical={uniforms:Zt([kn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ze},clearcoatNormalScale:{value:new ue(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ze},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ze},sheen:{value:0},sheenColor:{value:new Re(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ze},transmissionSamplerSize:{value:new ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ze},attenuationDistance:{value:0},attenuationColor:{value:new Re(0)},specularColor:{value:new Re(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ze},anisotropyVector:{value:new ue},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ze}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};const fo={r:0,b:0,g:0},Gi=new En,$_=new Ue;function Z_(s,e,t,n,i,r,o){const a=new Re(0);let l=r===!0?0:1,c,h,u=null,d=0,f=null;function g(y){let M=y.isScene===!0?y.background:null;return M&&M.isTexture&&(M=(y.backgroundBlurriness>0?t:e).get(M)),M}function _(y){let M=!1;const R=g(y);R===null?p(a,l):R&&R.isColor&&(p(R,1),M=!0);const P=s.xr.getEnvironmentBlendMode();P==="additive"?n.buffers.color.setClear(0,0,0,1,o):P==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(y,M){const R=g(M);R&&(R.isCubeTexture||R.mapping===Go)?(h===void 0&&(h=new $e(new Fi(1,1,1),new fi({name:"BackgroundCubeMaterial",uniforms:ks(kn.backgroundCube.uniforms),vertexShader:kn.backgroundCube.vertexShader,fragmentShader:kn.backgroundCube.fragmentShader,side:jt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(P,w,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Gi.copy(M.backgroundRotation),Gi.x*=-1,Gi.y*=-1,Gi.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(Gi.y*=-1,Gi.z*=-1),h.material.uniforms.envMap.value=R,h.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4($_.makeRotationFromEuler(Gi)),h.material.toneMapped=Je.getTransfer(R.colorSpace)!==at,(u!==R||d!==R.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,u=R,d=R.version,f=s.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):R&&R.isTexture&&(c===void 0&&(c=new $e(new Ni(2,2),new fi({name:"BackgroundMaterial",uniforms:ks(kn.background.uniforms),vertexShader:kn.background.vertexShader,fragmentShader:kn.background.fragmentShader,side:di,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=R,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=Je.getTransfer(R.colorSpace)!==at,R.matrixAutoUpdate===!0&&R.updateMatrix(),c.material.uniforms.uvTransform.value.copy(R.matrix),(u!==R||d!==R.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,u=R,d=R.version,f=s.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function p(y,M){y.getRGB(fo,ju(s)),n.buffers.color.setClear(fo.r,fo.g,fo.b,M,o)}function S(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,M=1){a.set(y),l=M,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,p(a,l)},render:_,addToRenderList:m,dispose:S}}function J_(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null);let r=i,o=!1;function a(x,A,L,U,I){let B=!1;const O=u(U,L,A);r!==O&&(r=O,c(r.object)),B=f(x,U,L,I),B&&g(x,U,L,I),I!==null&&e.update(I,s.ELEMENT_ARRAY_BUFFER),(B||o)&&(o=!1,M(x,A,L,U),I!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(I).buffer))}function l(){return s.createVertexArray()}function c(x){return s.bindVertexArray(x)}function h(x){return s.deleteVertexArray(x)}function u(x,A,L){const U=L.wireframe===!0;let I=n[x.id];I===void 0&&(I={},n[x.id]=I);let B=I[A.id];B===void 0&&(B={},I[A.id]=B);let O=B[U];return O===void 0&&(O=d(l()),B[U]=O),O}function d(x){const A=[],L=[],U=[];for(let I=0;I<t;I++)A[I]=0,L[I]=0,U[I]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:A,enabledAttributes:L,attributeDivisors:U,object:x,attributes:{},index:null}}function f(x,A,L,U){const I=r.attributes,B=A.attributes;let O=0;const K=L.getAttributes();for(const V in K)if(K[V].location>=0){const se=I[V];let de=B[V];if(de===void 0&&(V==="instanceMatrix"&&x.instanceMatrix&&(de=x.instanceMatrix),V==="instanceColor"&&x.instanceColor&&(de=x.instanceColor)),se===void 0||se.attribute!==de||de&&se.data!==de.data)return!0;O++}return r.attributesNum!==O||r.index!==U}function g(x,A,L,U){const I={},B=A.attributes;let O=0;const K=L.getAttributes();for(const V in K)if(K[V].location>=0){let se=B[V];se===void 0&&(V==="instanceMatrix"&&x.instanceMatrix&&(se=x.instanceMatrix),V==="instanceColor"&&x.instanceColor&&(se=x.instanceColor));const de={};de.attribute=se,se&&se.data&&(de.data=se.data),I[V]=de,O++}r.attributes=I,r.attributesNum=O,r.index=U}function _(){const x=r.newAttributes;for(let A=0,L=x.length;A<L;A++)x[A]=0}function m(x){p(x,0)}function p(x,A){const L=r.newAttributes,U=r.enabledAttributes,I=r.attributeDivisors;L[x]=1,U[x]===0&&(s.enableVertexAttribArray(x),U[x]=1),I[x]!==A&&(s.vertexAttribDivisor(x,A),I[x]=A)}function S(){const x=r.newAttributes,A=r.enabledAttributes;for(let L=0,U=A.length;L<U;L++)A[L]!==x[L]&&(s.disableVertexAttribArray(L),A[L]=0)}function y(x,A,L,U,I,B,O){O===!0?s.vertexAttribIPointer(x,A,L,I,B):s.vertexAttribPointer(x,A,L,U,I,B)}function M(x,A,L,U){_();const I=U.attributes,B=L.getAttributes(),O=A.defaultAttributeValues;for(const K in B){const V=B[K];if(V.location>=0){let $=I[K];if($===void 0&&(K==="instanceMatrix"&&x.instanceMatrix&&($=x.instanceMatrix),K==="instanceColor"&&x.instanceColor&&($=x.instanceColor)),$!==void 0){const se=$.normalized,de=$.itemSize,Le=e.get($);if(Le===void 0)continue;const Qe=Le.buffer,tt=Le.type,qe=Le.bytesPerElement,q=tt===s.INT||tt===s.UNSIGNED_INT||$.gpuType===Zl;if($.isInterleavedBufferAttribute){const Z=$.data,me=Z.stride,Ie=$.offset;if(Z.isInstancedInterleavedBuffer){for(let Ee=0;Ee<V.locationSize;Ee++)p(V.location+Ee,Z.meshPerAttribute);x.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let Ee=0;Ee<V.locationSize;Ee++)m(V.location+Ee);s.bindBuffer(s.ARRAY_BUFFER,Qe);for(let Ee=0;Ee<V.locationSize;Ee++)y(V.location+Ee,de/V.locationSize,tt,se,me*qe,(Ie+de/V.locationSize*Ee)*qe,q)}else{if($.isInstancedBufferAttribute){for(let Z=0;Z<V.locationSize;Z++)p(V.location+Z,$.meshPerAttribute);x.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let Z=0;Z<V.locationSize;Z++)m(V.location+Z);s.bindBuffer(s.ARRAY_BUFFER,Qe);for(let Z=0;Z<V.locationSize;Z++)y(V.location+Z,de/V.locationSize,tt,se,de*qe,de/V.locationSize*Z*qe,q)}}else if(O!==void 0){const se=O[K];if(se!==void 0)switch(se.length){case 2:s.vertexAttrib2fv(V.location,se);break;case 3:s.vertexAttrib3fv(V.location,se);break;case 4:s.vertexAttrib4fv(V.location,se);break;default:s.vertexAttrib1fv(V.location,se)}}}}S()}function R(){C();for(const x in n){const A=n[x];for(const L in A){const U=A[L];for(const I in U)h(U[I].object),delete U[I];delete A[L]}delete n[x]}}function P(x){if(n[x.id]===void 0)return;const A=n[x.id];for(const L in A){const U=A[L];for(const I in U)h(U[I].object),delete U[I];delete A[L]}delete n[x.id]}function w(x){for(const A in n){const L=n[A];if(L[x.id]===void 0)continue;const U=L[x.id];for(const I in U)h(U[I].object),delete U[I];delete L[x.id]}}function C(){v(),o=!0,r!==i&&(r=i,c(r.object))}function v(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:C,resetDefaultState:v,dispose:R,releaseStatesOfGeometry:P,releaseStatesOfProgram:w,initAttributes:_,enableAttribute:m,disableUnusedAttributes:S}}function Q_(s,e,t){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),t.update(h,n,1)}function o(c,h,u){u!==0&&(s.drawArraysInstanced(n,c,h,u),t.update(h,n,u))}function a(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];t.update(f,n,1)}function l(c,h,u,d){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)o(c[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*d[_];t.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function e0(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(w){return!(w!==Sn&&n.convert(w)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){const C=w===Xs&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(w!==Un&&n.convert(w)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==Dn&&!C)}function l(w){if(w==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),S=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),y=s.getParameter(s.MAX_VARYING_VECTORS),M=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),R=g>0,P=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:S,maxVaryings:y,maxFragmentUniforms:M,vertexTextures:R,maxSamples:P}}function t0(s){const e=this;let t=null,n=0,i=!1,r=!1;const o=new wi,a=new ze,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=s.get(u);if(!i||g===null||g.length===0||r&&!m)r?h(null):c();else{const S=r?0:n,y=S*4;let M=p.clippingState||null;l.value=M,M=h(g,d,y,f);for(let R=0;R!==y;++R)M[R]=t[R];p.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=f+_*4,S=d.matrixWorldInverse;a.getNormalMatrix(S),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,M=f;y!==_;++y,M+=4)o.copy(u[y]).applyMatrix4(S,a),o.normal.toArray(m,M),m[M+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function n0(s){let e=new WeakMap;function t(o,a){return a===tl?o.mapping=Os:a===nl&&(o.mapping=Bs),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===tl||a===nl)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new lp(l.height);return c.fromEquirectangularTexture(s,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const Cs=4,Ch=[.125,.215,.35,.446,.526,.582],Zi=20,Ra=new qo,Ph=new Re;let Ca=null,Pa=0,Da=0,La=!1;const Ki=(1+Math.sqrt(5))/2,Ss=1/Ki,Dh=[new E(-Ki,Ss,0),new E(Ki,Ss,0),new E(-Ss,0,Ki),new E(Ss,0,Ki),new E(0,Ki,-Ss),new E(0,Ki,Ss),new E(-1,1,-1),new E(1,1,-1),new E(-1,1,1),new E(1,1,1)],i0=new E;class Ol{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,r={}){const{size:o=256,position:a=i0}=r;Ca=this._renderer.getRenderTarget(),Pa=this._renderer.getActiveCubeFace(),Da=this._renderer.getActiveMipmapLevel(),La=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Nh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ih(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ca,Pa,Da),this._renderer.xr.enabled=La,e.scissorTest=!1,po(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Os||e.mapping===Bs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ca=this._renderer.getRenderTarget(),Pa=this._renderer.getActiveCubeFace(),Da=this._renderer.getActiveMipmapLevel(),La=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Qt,minFilter:Qt,generateMipmaps:!1,type:Xs,format:Sn,colorSpace:Kt,depthBuffer:!1},i=Lh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Lh(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=s0(r)),this._blurMaterial=r0(r,e,t)}return i}_compileMaterial(e){const t=new $e(this._lodPlanes[0],e);this._renderer.compile(t,Ra)}_sceneToCubeUV(e,t,n,i,r){const l=new Wt(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Ph),u.toneMapping=Di,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(i),u.clearDepth(),u.setRenderTarget(null));const _=new bn({name:"PMREM.Background",side:jt,depthWrite:!1,depthTest:!1}),m=new $e(new Fi,_);let p=!1;const S=e.background;S?S.isColor&&(_.color.copy(S),e.background=null,p=!0):(_.color.copy(Ph),p=!0);for(let y=0;y<6;y++){const M=y%3;M===0?(l.up.set(0,c[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[y],r.y,r.z)):M===1?(l.up.set(0,0,c[y]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[y],r.z)):(l.up.set(0,c[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[y]));const R=this._cubeSize;po(i,M*R,y>2?R:0,R,R),u.setRenderTarget(i),p&&u.render(m,l),u.render(e,l)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=f,u.autoClear=d,e.background=S}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Os||e.mapping===Bs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Nh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ih());const r=i?this._cubemapMaterial:this._equirectMaterial,o=new $e(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;po(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Ra)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Dh[(i-r-1)%Dh.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,i,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",r),this._halfBlur(o,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new $e(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Zi-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):Zi;m>Zi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Zi}`);const p=[];let S=0;for(let w=0;w<Zi;++w){const C=w/_,v=Math.exp(-C*C/2);p.push(v),w===0?S+=v:w<m&&(S+=2*v)}for(let w=0;w<p.length;w++)p[w]=p[w]/S;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:y}=this;d.dTheta.value=g,d.mipInt.value=y-n;const M=this._sizeLods[i],R=3*M*(i>y-Cs?i-y+Cs:0),P=4*(this._cubeSize-M);po(t,R,P,3*M,2*M),l.setRenderTarget(t),l.render(u,Ra)}}function s0(s){const e=[],t=[],n=[];let i=s;const r=s-Cs+1+Ch.length;for(let o=0;o<r;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>s-Cs?l=Ch[o-s+Cs-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,_=3,m=2,p=1,S=new Float32Array(_*g*f),y=new Float32Array(m*g*f),M=new Float32Array(p*g*f);for(let P=0;P<f;P++){const w=P%3*2/3-1,C=P>2?0:-1,v=[w,C,0,w+2/3,C,0,w+2/3,C+1,0,w,C,0,w+2/3,C+1,0,w,C+1,0];S.set(v,_*g*P),y.set(d,m*g*P);const x=[P,P,P,P,P,P];M.set(x,p*g*P)}const R=new Ut;R.setAttribute("position",new ct(S,_)),R.setAttribute("uv",new ct(y,m)),R.setAttribute("faceIndex",new ct(M,p)),e.push(R),i>Cs&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Lh(s,e,t){const n=new Ii(s,e,t);return n.texture.mapping=Go,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function po(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function r0(s,e,t){const n=new Float32Array(Zi),i=new E(0,1,0);return new fi({name:"SphericalGaussianBlur",defines:{n:Zi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:_c(),fragmentShader:`

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
		`,blending:Pi,depthTest:!1,depthWrite:!1})}function Ih(){return new fi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:_c(),fragmentShader:`

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
		`,blending:Pi,depthTest:!1,depthWrite:!1})}function Nh(){return new fi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:_c(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Pi,depthTest:!1,depthWrite:!1})}function _c(){return`

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
	`}function o0(s){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===tl||l===nl,h=l===Os||l===Bs;if(c||h){let u=e.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new Ol(s)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return c&&f&&f.height>0||h&&f&&i(f)?(t===null&&(t=new Ol(s)),u=c?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function i(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function a0(s){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&Lr("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function l0(s,e,t,n){const i={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",o),delete i[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const f in d)e.update(d[f],s.ARRAY_BUFFER)}function c(u){const d=[],f=u.index,g=u.attributes.position;let _=0;if(f!==null){const S=f.array;_=f.version;for(let y=0,M=S.length;y<M;y+=3){const R=S[y+0],P=S[y+1],w=S[y+2];d.push(R,P,P,w,w,R)}}else if(g!==void 0){const S=g.array;_=g.version;for(let y=0,M=S.length/3-1;y<M;y+=3){const R=y+0,P=y+1,w=y+2;d.push(R,P,P,w,w,R)}}else return;const m=new(Vu(d)?qu:Xu)(d,1);m.version=_;const p=r.get(u);p&&e.remove(p),r.set(u,m)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function c0(s,e,t){let n;function i(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,f){s.drawElements(n,f,r,d*o),t.update(f,n,1)}function c(d,f,g){g!==0&&(s.drawElementsInstanced(n,f,r,d*o,g),t.update(f,n,g))}function h(d,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,n,1)}function u(d,f,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)c(d[p]/o,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,_,0,g);let p=0;for(let S=0;S<g;S++)p+=f[S]*_[S];t.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function h0(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function u0(s,e,t){const n=new WeakMap,i=new et;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let v=function(){w.dispose(),n.delete(a),a.removeEventListener("dispose",v)};d!==void 0&&d.texture.dispose();const f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],S=a.morphAttributes.color||[];let y=0;f===!0&&(y=1),g===!0&&(y=2),_===!0&&(y=3);let M=a.attributes.position.count*y,R=1;M>e.maxTextureSize&&(R=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const P=new Float32Array(M*R*4*u),w=new Hu(P,M,R,u);w.type=Dn,w.needsUpdate=!0;const C=y*4;for(let x=0;x<u;x++){const A=m[x],L=p[x],U=S[x],I=M*R*4*x;for(let B=0;B<A.count;B++){const O=B*C;f===!0&&(i.fromBufferAttribute(A,B),P[I+O+0]=i.x,P[I+O+1]=i.y,P[I+O+2]=i.z,P[I+O+3]=0),g===!0&&(i.fromBufferAttribute(L,B),P[I+O+4]=i.x,P[I+O+5]=i.y,P[I+O+6]=i.z,P[I+O+7]=0),_===!0&&(i.fromBufferAttribute(U,B),P[I+O+8]=i.x,P[I+O+9]=i.y,P[I+O+10]=i.z,P[I+O+11]=U.itemSize===4?i.w:1)}}d={count:u,texture:w,size:new ue(M,R)},n.set(a,d),a.addEventListener("dispose",v)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,t);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];const g=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",g),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function d0(s,e,t,n){let i=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=e.get(l,h);if(i.get(u)!==c&&(e.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}const fd=new Lt,Uh=new nd(1,1),pd=new Hu,md=new qf,gd=new Yu,Fh=[],Oh=[],Bh=new Float32Array(16),zh=new Float32Array(9),kh=new Float32Array(4);function Ys(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=Fh[i];if(r===void 0&&(r=new Float32Array(i),Fh[i]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function It(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Nt(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function jo(s,e){let t=Oh[e];t===void 0&&(t=new Int32Array(e),Oh[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function f0(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function p0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;s.uniform2fv(this.addr,e),Nt(t,e)}}function m0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(It(t,e))return;s.uniform3fv(this.addr,e),Nt(t,e)}}function g0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;s.uniform4fv(this.addr,e),Nt(t,e)}}function _0(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(It(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Nt(t,e)}else{if(It(t,n))return;kh.set(n),s.uniformMatrix2fv(this.addr,!1,kh),Nt(t,n)}}function v0(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(It(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Nt(t,e)}else{if(It(t,n))return;zh.set(n),s.uniformMatrix3fv(this.addr,!1,zh),Nt(t,n)}}function x0(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(It(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Nt(t,e)}else{if(It(t,n))return;Bh.set(n),s.uniformMatrix4fv(this.addr,!1,Bh),Nt(t,n)}}function y0(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function M0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;s.uniform2iv(this.addr,e),Nt(t,e)}}function S0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(It(t,e))return;s.uniform3iv(this.addr,e),Nt(t,e)}}function b0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;s.uniform4iv(this.addr,e),Nt(t,e)}}function E0(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function T0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;s.uniform2uiv(this.addr,e),Nt(t,e)}}function w0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(It(t,e))return;s.uniform3uiv(this.addr,e),Nt(t,e)}}function A0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;s.uniform4uiv(this.addr,e),Nt(t,e)}}function R0(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Uh.compareFunction=ku,r=Uh):r=fd,t.setTexture2D(e||r,i)}function C0(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||md,i)}function P0(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||gd,i)}function D0(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||pd,i)}function L0(s){switch(s){case 5126:return f0;case 35664:return p0;case 35665:return m0;case 35666:return g0;case 35674:return _0;case 35675:return v0;case 35676:return x0;case 5124:case 35670:return y0;case 35667:case 35671:return M0;case 35668:case 35672:return S0;case 35669:case 35673:return b0;case 5125:return E0;case 36294:return T0;case 36295:return w0;case 36296:return A0;case 35678:case 36198:case 36298:case 36306:case 35682:return R0;case 35679:case 36299:case 36307:return C0;case 35680:case 36300:case 36308:case 36293:return P0;case 36289:case 36303:case 36311:case 36292:return D0}}function I0(s,e){s.uniform1fv(this.addr,e)}function N0(s,e){const t=Ys(e,this.size,2);s.uniform2fv(this.addr,t)}function U0(s,e){const t=Ys(e,this.size,3);s.uniform3fv(this.addr,t)}function F0(s,e){const t=Ys(e,this.size,4);s.uniform4fv(this.addr,t)}function O0(s,e){const t=Ys(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function B0(s,e){const t=Ys(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function z0(s,e){const t=Ys(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function k0(s,e){s.uniform1iv(this.addr,e)}function V0(s,e){s.uniform2iv(this.addr,e)}function H0(s,e){s.uniform3iv(this.addr,e)}function G0(s,e){s.uniform4iv(this.addr,e)}function W0(s,e){s.uniform1uiv(this.addr,e)}function X0(s,e){s.uniform2uiv(this.addr,e)}function q0(s,e){s.uniform3uiv(this.addr,e)}function j0(s,e){s.uniform4uiv(this.addr,e)}function K0(s,e,t){const n=this.cache,i=e.length,r=jo(t,i);It(n,r)||(s.uniform1iv(this.addr,r),Nt(n,r));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||fd,r[o])}function Y0(s,e,t){const n=this.cache,i=e.length,r=jo(t,i);It(n,r)||(s.uniform1iv(this.addr,r),Nt(n,r));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||md,r[o])}function $0(s,e,t){const n=this.cache,i=e.length,r=jo(t,i);It(n,r)||(s.uniform1iv(this.addr,r),Nt(n,r));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||gd,r[o])}function Z0(s,e,t){const n=this.cache,i=e.length,r=jo(t,i);It(n,r)||(s.uniform1iv(this.addr,r),Nt(n,r));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||pd,r[o])}function J0(s){switch(s){case 5126:return I0;case 35664:return N0;case 35665:return U0;case 35666:return F0;case 35674:return O0;case 35675:return B0;case 35676:return z0;case 5124:case 35670:return k0;case 35667:case 35671:return V0;case 35668:case 35672:return H0;case 35669:case 35673:return G0;case 5125:return W0;case 36294:return X0;case 36295:return q0;case 36296:return j0;case 35678:case 36198:case 36298:case 36306:case 35682:return K0;case 35679:case 36299:case 36307:return Y0;case 35680:case 36300:case 36308:case 36293:return $0;case 36289:case 36303:case 36311:case 36292:return Z0}}class Q0{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=L0(t.type)}}class ev{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=J0(t.type)}}class tv{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let r=0,o=i.length;r!==o;++r){const a=i[r];a.setValue(e,t[a.id],n)}}}const Ia=/(\w+)(\])?(\[|\.)?/g;function Vh(s,e){s.seq.push(e),s.map[e.id]=e}function nv(s,e,t){const n=s.name,i=n.length;for(Ia.lastIndex=0;;){const r=Ia.exec(n),o=Ia.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Vh(t,c===void 0?new Q0(a,s,e):new ev(a,s,e));break}else{let u=t.map[a];u===void 0&&(u=new tv(a),Vh(t,u)),t=u}}}class Ao{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=e.getActiveUniform(t,i),o=e.getUniformLocation(t,r.name);nv(r,o,this)}}setValue(e,t,n,i){const r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function Hh(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}const iv=37297;let sv=0;function rv(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=i;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Gh=new ze;function ov(s){Je._getMatrix(Gh,Je.workingColorSpace,s);const e=`mat3( ${Gh.elements.map(t=>t.toFixed(4))} )`;switch(Je.getTransfer(s)){case Io:return[e,"LinearTransferOETF"];case at:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function Wh(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+rv(s.getShaderSource(e),a)}else return r}function av(s,e){const t=ov(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function lv(s,e){let t;switch(e){case sf:t="Linear";break;case rf:t="Reinhard";break;case of:t="Cineon";break;case Cu:t="ACESFilmic";break;case lf:t="AgX";break;case cf:t="Neutral";break;case af:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const mo=new E;function cv(){Je.getLuminanceCoefficients(mo);const s=mo.x.toFixed(4),e=mo.y.toFixed(4),t=mo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function hv(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(cr).join(`
`)}function uv(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function dv(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(e,i),o=r.name;let a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function cr(s){return s!==""}function Xh(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function qh(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const fv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Bl(s){return s.replace(fv,mv)}const pv=new Map;function mv(s,e){let t=We[e];if(t===void 0){const n=pv.get(e);if(n!==void 0)t=We[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Bl(t)}const gv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function jh(s){return s.replace(gv,_v)}function _v(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Kh(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function vv(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Au?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===Ru?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===si&&(e="SHADOWMAP_TYPE_VSM"),e}function xv(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Os:case Bs:e="ENVMAP_TYPE_CUBE";break;case Go:e="ENVMAP_TYPE_CUBE_UV";break}return e}function yv(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Bs:e="ENVMAP_MODE_REFRACTION";break}return e}function Mv(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case $l:e="ENVMAP_BLENDING_MULTIPLY";break;case tf:e="ENVMAP_BLENDING_MIX";break;case nf:e="ENVMAP_BLENDING_ADD";break}return e}function Sv(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function bv(s,e,t,n){const i=s.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=vv(t),c=xv(t),h=yv(t),u=Mv(t),d=Sv(t),f=hv(t),g=uv(r),_=i.createProgram();let m,p,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(cr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(cr).join(`
`),p.length>0&&(p+=`
`)):(m=[Kh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(cr).join(`
`),p=[Kh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Di?"#define TONE_MAPPING":"",t.toneMapping!==Di?We.tonemapping_pars_fragment:"",t.toneMapping!==Di?lv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",We.colorspace_pars_fragment,av("linearToOutputTexel",t.outputColorSpace),cv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(cr).join(`
`)),o=Bl(o),o=Xh(o,t),o=qh(o,t),a=Bl(a),a=Xh(a,t),a=qh(a,t),o=jh(o),a=jh(a),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Vc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Vc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const y=S+m+o,M=S+p+a,R=Hh(i,i.VERTEX_SHADER,y),P=Hh(i,i.FRAGMENT_SHADER,M);i.attachShader(_,R),i.attachShader(_,P),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function w(A){if(s.debug.checkShaderErrors){const L=i.getProgramInfoLog(_)||"",U=i.getShaderInfoLog(R)||"",I=i.getShaderInfoLog(P)||"",B=L.trim(),O=U.trim(),K=I.trim();let V=!0,$=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(V=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,R,P);else{const se=Wh(i,R,"vertex"),de=Wh(i,P,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+B+`
`+se+`
`+de)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(O===""||K==="")&&($=!1);$&&(A.diagnostics={runnable:V,programLog:B,vertexShader:{log:O,prefix:m},fragmentShader:{log:K,prefix:p}})}i.deleteShader(R),i.deleteShader(P),C=new Ao(i,_),v=dv(i,_)}let C;this.getUniforms=function(){return C===void 0&&w(this),C};let v;this.getAttributes=function(){return v===void 0&&w(this),v};let x=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=i.getProgramParameter(_,iv)),x},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=sv++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=R,this.fragmentShader=P,this}let Ev=0;class Tv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new wv(e),t.set(e,n)),n}}class wv{constructor(e){this.id=Ev++,this.code=e,this.usedTimes=0}}function Av(s,e,t,n,i,r,o){const a=new Gu,l=new Tv,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(v){return c.add(v),v===0?"uv":`uv${v}`}function m(v,x,A,L,U){const I=L.fog,B=U.geometry,O=v.isMeshStandardMaterial?L.environment:null,K=(v.isMeshStandardMaterial?t:e).get(v.envMap||O),V=K&&K.mapping===Go?K.image.height:null,$=g[v.type];v.precision!==null&&(f=i.getMaxPrecision(v.precision),f!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",f,"instead."));const se=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,de=se!==void 0?se.length:0;let Le=0;B.morphAttributes.position!==void 0&&(Le=1),B.morphAttributes.normal!==void 0&&(Le=2),B.morphAttributes.color!==void 0&&(Le=3);let Qe,tt,qe,q;if($){const it=kn[$];Qe=it.vertexShader,tt=it.fragmentShader}else Qe=v.vertexShader,tt=v.fragmentShader,l.update(v),qe=l.getVertexShaderID(v),q=l.getFragmentShaderID(v);const Z=s.getRenderTarget(),me=s.state.buffers.depth.getReversed(),Ie=U.isInstancedMesh===!0,Ee=U.isBatchedMesh===!0,Ze=!!v.map,Vt=!!v.matcap,N=!!K,_t=!!v.aoMap,Be=!!v.lightMap,Pe=!!v.bumpMap,ve=!!v.normalMap,vt=!!v.displacementMap,xe=!!v.emissiveMap,Ge=!!v.metalnessMap,Ft=!!v.roughnessMap,Tt=v.anisotropy>0,D=v.clearcoat>0,b=v.dispersion>0,H=v.iridescence>0,j=v.sheen>0,J=v.transmission>0,X=Tt&&!!v.anisotropyMap,be=D&&!!v.clearcoatMap,re=D&&!!v.clearcoatNormalMap,ye=D&&!!v.clearcoatRoughnessMap,Me=H&&!!v.iridescenceMap,ne=H&&!!v.iridescenceThicknessMap,he=j&&!!v.sheenColorMap,Ce=j&&!!v.sheenRoughnessMap,Se=!!v.specularMap,le=!!v.specularColorMap,ke=!!v.specularIntensityMap,F=J&&!!v.transmissionMap,ie=J&&!!v.thicknessMap,oe=!!v.gradientMap,pe=!!v.alphaMap,Q=v.alphaTest>0,Y=!!v.alphaHash,_e=!!v.extensions;let Oe=Di;v.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(Oe=s.toneMapping);const ft={shaderID:$,shaderType:v.type,shaderName:v.name,vertexShader:Qe,fragmentShader:tt,defines:v.defines,customVertexShaderID:qe,customFragmentShaderID:q,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:f,batching:Ee,batchingColor:Ee&&U._colorsTexture!==null,instancing:Ie,instancingColor:Ie&&U.instanceColor!==null,instancingMorph:Ie&&U.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:Z===null?s.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:Kt,alphaToCoverage:!!v.alphaToCoverage,map:Ze,matcap:Vt,envMap:N,envMapMode:N&&K.mapping,envMapCubeUVHeight:V,aoMap:_t,lightMap:Be,bumpMap:Pe,normalMap:ve,displacementMap:d&&vt,emissiveMap:xe,normalMapObjectSpace:ve&&v.normalMapType===mf,normalMapTangentSpace:ve&&v.normalMapType===sc,metalnessMap:Ge,roughnessMap:Ft,anisotropy:Tt,anisotropyMap:X,clearcoat:D,clearcoatMap:be,clearcoatNormalMap:re,clearcoatRoughnessMap:ye,dispersion:b,iridescence:H,iridescenceMap:Me,iridescenceThicknessMap:ne,sheen:j,sheenColorMap:he,sheenRoughnessMap:Ce,specularMap:Se,specularColorMap:le,specularIntensityMap:ke,transmission:J,transmissionMap:F,thicknessMap:ie,gradientMap:oe,opaque:v.transparent===!1&&v.blending===Ls&&v.alphaToCoverage===!1,alphaMap:pe,alphaTest:Q,alphaHash:Y,combine:v.combine,mapUv:Ze&&_(v.map.channel),aoMapUv:_t&&_(v.aoMap.channel),lightMapUv:Be&&_(v.lightMap.channel),bumpMapUv:Pe&&_(v.bumpMap.channel),normalMapUv:ve&&_(v.normalMap.channel),displacementMapUv:vt&&_(v.displacementMap.channel),emissiveMapUv:xe&&_(v.emissiveMap.channel),metalnessMapUv:Ge&&_(v.metalnessMap.channel),roughnessMapUv:Ft&&_(v.roughnessMap.channel),anisotropyMapUv:X&&_(v.anisotropyMap.channel),clearcoatMapUv:be&&_(v.clearcoatMap.channel),clearcoatNormalMapUv:re&&_(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ye&&_(v.clearcoatRoughnessMap.channel),iridescenceMapUv:Me&&_(v.iridescenceMap.channel),iridescenceThicknessMapUv:ne&&_(v.iridescenceThicknessMap.channel),sheenColorMapUv:he&&_(v.sheenColorMap.channel),sheenRoughnessMapUv:Ce&&_(v.sheenRoughnessMap.channel),specularMapUv:Se&&_(v.specularMap.channel),specularColorMapUv:le&&_(v.specularColorMap.channel),specularIntensityMapUv:ke&&_(v.specularIntensityMap.channel),transmissionMapUv:F&&_(v.transmissionMap.channel),thicknessMapUv:ie&&_(v.thicknessMap.channel),alphaMapUv:pe&&_(v.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(ve||Tt),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!B.attributes.uv&&(Ze||pe),fog:!!I,useFog:v.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:v.flatShading===!0&&v.wireframe===!1,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:me,skinning:U.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:de,morphTextureStride:Le,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:v.dithering,shadowMapEnabled:s.shadowMap.enabled&&A.length>0,shadowMapType:s.shadowMap.type,toneMapping:Oe,decodeVideoTexture:Ze&&v.map.isVideoTexture===!0&&Je.getTransfer(v.map.colorSpace)===at,decodeVideoTextureEmissive:xe&&v.emissiveMap.isVideoTexture===!0&&Je.getTransfer(v.emissiveMap.colorSpace)===at,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===un,flipSided:v.side===jt,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:_e&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(_e&&v.extensions.multiDraw===!0||Ee)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return ft.vertexUv1s=c.has(1),ft.vertexUv2s=c.has(2),ft.vertexUv3s=c.has(3),c.clear(),ft}function p(v){const x=[];if(v.shaderID?x.push(v.shaderID):(x.push(v.customVertexShaderID),x.push(v.customFragmentShaderID)),v.defines!==void 0)for(const A in v.defines)x.push(A),x.push(v.defines[A]);return v.isRawShaderMaterial===!1&&(S(x,v),y(x,v),x.push(s.outputColorSpace)),x.push(v.customProgramCacheKey),x.join()}function S(v,x){v.push(x.precision),v.push(x.outputColorSpace),v.push(x.envMapMode),v.push(x.envMapCubeUVHeight),v.push(x.mapUv),v.push(x.alphaMapUv),v.push(x.lightMapUv),v.push(x.aoMapUv),v.push(x.bumpMapUv),v.push(x.normalMapUv),v.push(x.displacementMapUv),v.push(x.emissiveMapUv),v.push(x.metalnessMapUv),v.push(x.roughnessMapUv),v.push(x.anisotropyMapUv),v.push(x.clearcoatMapUv),v.push(x.clearcoatNormalMapUv),v.push(x.clearcoatRoughnessMapUv),v.push(x.iridescenceMapUv),v.push(x.iridescenceThicknessMapUv),v.push(x.sheenColorMapUv),v.push(x.sheenRoughnessMapUv),v.push(x.specularMapUv),v.push(x.specularColorMapUv),v.push(x.specularIntensityMapUv),v.push(x.transmissionMapUv),v.push(x.thicknessMapUv),v.push(x.combine),v.push(x.fogExp2),v.push(x.sizeAttenuation),v.push(x.morphTargetsCount),v.push(x.morphAttributeCount),v.push(x.numDirLights),v.push(x.numPointLights),v.push(x.numSpotLights),v.push(x.numSpotLightMaps),v.push(x.numHemiLights),v.push(x.numRectAreaLights),v.push(x.numDirLightShadows),v.push(x.numPointLightShadows),v.push(x.numSpotLightShadows),v.push(x.numSpotLightShadowsWithMaps),v.push(x.numLightProbes),v.push(x.shadowMapType),v.push(x.toneMapping),v.push(x.numClippingPlanes),v.push(x.numClipIntersection),v.push(x.depthPacking)}function y(v,x){a.disableAll(),x.supportsVertexTextures&&a.enable(0),x.instancing&&a.enable(1),x.instancingColor&&a.enable(2),x.instancingMorph&&a.enable(3),x.matcap&&a.enable(4),x.envMap&&a.enable(5),x.normalMapObjectSpace&&a.enable(6),x.normalMapTangentSpace&&a.enable(7),x.clearcoat&&a.enable(8),x.iridescence&&a.enable(9),x.alphaTest&&a.enable(10),x.vertexColors&&a.enable(11),x.vertexAlphas&&a.enable(12),x.vertexUv1s&&a.enable(13),x.vertexUv2s&&a.enable(14),x.vertexUv3s&&a.enable(15),x.vertexTangents&&a.enable(16),x.anisotropy&&a.enable(17),x.alphaHash&&a.enable(18),x.batching&&a.enable(19),x.dispersion&&a.enable(20),x.batchingColor&&a.enable(21),x.gradientMap&&a.enable(22),v.push(a.mask),a.disableAll(),x.fog&&a.enable(0),x.useFog&&a.enable(1),x.flatShading&&a.enable(2),x.logarithmicDepthBuffer&&a.enable(3),x.reversedDepthBuffer&&a.enable(4),x.skinning&&a.enable(5),x.morphTargets&&a.enable(6),x.morphNormals&&a.enable(7),x.morphColors&&a.enable(8),x.premultipliedAlpha&&a.enable(9),x.shadowMapEnabled&&a.enable(10),x.doubleSided&&a.enable(11),x.flipSided&&a.enable(12),x.useDepthPacking&&a.enable(13),x.dithering&&a.enable(14),x.transmission&&a.enable(15),x.sheen&&a.enable(16),x.opaque&&a.enable(17),x.pointsUvs&&a.enable(18),x.decodeVideoTexture&&a.enable(19),x.decodeVideoTextureEmissive&&a.enable(20),x.alphaToCoverage&&a.enable(21),v.push(a.mask)}function M(v){const x=g[v.type];let A;if(x){const L=kn[x];A=Il.clone(L.uniforms)}else A=v.uniforms;return A}function R(v,x){let A;for(let L=0,U=h.length;L<U;L++){const I=h[L];if(I.cacheKey===x){A=I,++A.usedTimes;break}}return A===void 0&&(A=new bv(s,x,v,r),h.push(A)),A}function P(v){if(--v.usedTimes===0){const x=h.indexOf(v);h[x]=h[h.length-1],h.pop(),v.destroy()}}function w(v){l.remove(v)}function C(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:M,acquireProgram:R,releaseProgram:P,releaseShaderCache:w,programs:h,dispose:C}}function Rv(){let s=new WeakMap;function e(o){return s.has(o)}function t(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,l){s.get(o)[a]=l}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function Cv(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Yh(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function $h(){const s=[];let e=0;const t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function o(u,d,f,g,_,m){let p=s[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},s[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),e++,p}function a(u,d,f,g,_,m){const p=o(u,d,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function l(u,d,f,g,_,m){const p=o(u,d,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function c(u,d){t.length>1&&t.sort(u||Cv),n.length>1&&n.sort(d||Yh),i.length>1&&i.sort(d||Yh)}function h(){for(let u=e,d=s.length;u<d;u++){const f=s[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:a,unshift:l,finish:h,sort:c}}function Pv(){let s=new WeakMap;function e(n,i){const r=s.get(n);let o;return r===void 0?(o=new $h,s.set(n,[o])):i>=r.length?(o=new $h,r.push(o)):o=r[i],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function Dv(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new E,color:new Re};break;case"SpotLight":t={position:new E,direction:new E,color:new Re,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new E,color:new Re,distance:0,decay:0};break;case"HemisphereLight":t={direction:new E,skyColor:new Re,groundColor:new Re};break;case"RectAreaLight":t={color:new Re,position:new E,halfWidth:new E,halfHeight:new E};break}return s[e.id]=t,t}}}function Lv(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let Iv=0;function Nv(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function Uv(s){const e=new Dv,t=Lv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new E);const i=new E,r=new Ue,o=new Ue;function a(c){let h=0,u=0,d=0;for(let v=0;v<9;v++)n.probe[v].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,S=0,y=0,M=0,R=0,P=0,w=0;c.sort(Nv);for(let v=0,x=c.length;v<x;v++){const A=c[v],L=A.color,U=A.intensity,I=A.distance,B=A.shadow&&A.shadow.map?A.shadow.map.texture:null;if(A.isAmbientLight)h+=L.r*U,u+=L.g*U,d+=L.b*U;else if(A.isLightProbe){for(let O=0;O<9;O++)n.probe[O].addScaledVector(A.sh.coefficients[O],U);w++}else if(A.isDirectionalLight){const O=e.get(A);if(O.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){const K=A.shadow,V=t.get(A);V.shadowIntensity=K.intensity,V.shadowBias=K.bias,V.shadowNormalBias=K.normalBias,V.shadowRadius=K.radius,V.shadowMapSize=K.mapSize,n.directionalShadow[f]=V,n.directionalShadowMap[f]=B,n.directionalShadowMatrix[f]=A.shadow.matrix,S++}n.directional[f]=O,f++}else if(A.isSpotLight){const O=e.get(A);O.position.setFromMatrixPosition(A.matrixWorld),O.color.copy(L).multiplyScalar(U),O.distance=I,O.coneCos=Math.cos(A.angle),O.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),O.decay=A.decay,n.spot[_]=O;const K=A.shadow;if(A.map&&(n.spotLightMap[R]=A.map,R++,K.updateMatrices(A),A.castShadow&&P++),n.spotLightMatrix[_]=K.matrix,A.castShadow){const V=t.get(A);V.shadowIntensity=K.intensity,V.shadowBias=K.bias,V.shadowNormalBias=K.normalBias,V.shadowRadius=K.radius,V.shadowMapSize=K.mapSize,n.spotShadow[_]=V,n.spotShadowMap[_]=B,M++}_++}else if(A.isRectAreaLight){const O=e.get(A);O.color.copy(L).multiplyScalar(U),O.halfWidth.set(A.width*.5,0,0),O.halfHeight.set(0,A.height*.5,0),n.rectArea[m]=O,m++}else if(A.isPointLight){const O=e.get(A);if(O.color.copy(A.color).multiplyScalar(A.intensity),O.distance=A.distance,O.decay=A.decay,A.castShadow){const K=A.shadow,V=t.get(A);V.shadowIntensity=K.intensity,V.shadowBias=K.bias,V.shadowNormalBias=K.normalBias,V.shadowRadius=K.radius,V.shadowMapSize=K.mapSize,V.shadowCameraNear=K.camera.near,V.shadowCameraFar=K.camera.far,n.pointShadow[g]=V,n.pointShadowMap[g]=B,n.pointShadowMatrix[g]=A.shadow.matrix,y++}n.point[g]=O,g++}else if(A.isHemisphereLight){const O=e.get(A);O.skyColor.copy(A.color).multiplyScalar(U),O.groundColor.copy(A.groundColor).multiplyScalar(U),n.hemi[p]=O,p++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ae.LTC_FLOAT_1,n.rectAreaLTC2=ae.LTC_FLOAT_2):(n.rectAreaLTC1=ae.LTC_HALF_1,n.rectAreaLTC2=ae.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const C=n.hash;(C.directionalLength!==f||C.pointLength!==g||C.spotLength!==_||C.rectAreaLength!==m||C.hemiLength!==p||C.numDirectionalShadows!==S||C.numPointShadows!==y||C.numSpotShadows!==M||C.numSpotMaps!==R||C.numLightProbes!==w)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=M+R-P,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=P,n.numLightProbes=w,C.directionalLength=f,C.pointLength=g,C.spotLength=_,C.rectAreaLength=m,C.hemiLength=p,C.numDirectionalShadows=S,C.numPointShadows=y,C.numSpotShadows=M,C.numSpotMaps=R,C.numLightProbes=w,n.version=Iv++)}function l(c,h){let u=0,d=0,f=0,g=0,_=0;const m=h.matrixWorldInverse;for(let p=0,S=c.length;p<S;p++){const y=c[p];if(y.isDirectionalLight){const M=n.directional[u];M.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(i),M.direction.transformDirection(m),u++}else if(y.isSpotLight){const M=n.spot[f];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(i),M.direction.transformDirection(m),f++}else if(y.isRectAreaLight){const M=n.rectArea[g];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(m),o.identity(),r.copy(y.matrixWorld),r.premultiply(m),o.extractRotation(r),M.halfWidth.set(y.width*.5,0,0),M.halfHeight.set(0,y.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),g++}else if(y.isPointLight){const M=n.point[d];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(m),d++}else if(y.isHemisphereLight){const M=n.hemi[_];M.direction.setFromMatrixPosition(y.matrixWorld),M.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:n}}function Zh(s){const e=new Uv(s),t=[],n=[];function i(h){c.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Fv(s){let e=new WeakMap;function t(i,r=0){const o=e.get(i);let a;return o===void 0?(a=new Zh(s),e.set(i,[a])):r>=o.length?(a=new Zh(s),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const Ov=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Bv=`uniform sampler2D shadow_pass;
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
}`;function zv(s,e,t){let n=new cc;const i=new ue,r=new ue,o=new et,a=new Op({depthPacking:pf}),l=new Bp,c={},h=t.maxTextureSize,u={[di]:jt,[jt]:di,[un]:un},d=new fi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ue},radius:{value:4}},vertexShader:Ov,fragmentShader:Bv}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new Ut;g.setAttribute("position",new ct(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new $e(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Au;let p=this.type;this.render=function(P,w,C){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||P.length===0)return;const v=s.getRenderTarget(),x=s.getActiveCubeFace(),A=s.getActiveMipmapLevel(),L=s.state;L.setBlending(Pi),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const U=p!==si&&this.type===si,I=p===si&&this.type!==si;for(let B=0,O=P.length;B<O;B++){const K=P[B],V=K.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;i.copy(V.mapSize);const $=V.getFrameExtents();if(i.multiply($),r.copy(V.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/$.x),i.x=r.x*$.x,V.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/$.y),i.y=r.y*$.y,V.mapSize.y=r.y)),V.map===null||U===!0||I===!0){const de=this.type!==si?{minFilter:tn,magFilter:tn}:{};V.map!==null&&V.map.dispose(),V.map=new Ii(i.x,i.y,de),V.map.texture.name=K.name+".shadowMap",V.camera.updateProjectionMatrix()}s.setRenderTarget(V.map),s.clear();const se=V.getViewportCount();for(let de=0;de<se;de++){const Le=V.getViewport(de);o.set(r.x*Le.x,r.y*Le.y,r.x*Le.z,r.y*Le.w),L.viewport(o),V.updateMatrices(K,de),n=V.getFrustum(),M(w,C,V.camera,K,this.type)}V.isPointLightShadow!==!0&&this.type===si&&S(V,C),V.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(v,x,A)};function S(P,w){const C=e.update(_);d.defines.VSM_SAMPLES!==P.blurSamples&&(d.defines.VSM_SAMPLES=P.blurSamples,f.defines.VSM_SAMPLES=P.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new Ii(i.x,i.y)),d.uniforms.shadow_pass.value=P.map.texture,d.uniforms.resolution.value=P.mapSize,d.uniforms.radius.value=P.radius,s.setRenderTarget(P.mapPass),s.clear(),s.renderBufferDirect(w,null,C,d,_,null),f.uniforms.shadow_pass.value=P.mapPass.texture,f.uniforms.resolution.value=P.mapSize,f.uniforms.radius.value=P.radius,s.setRenderTarget(P.map),s.clear(),s.renderBufferDirect(w,null,C,f,_,null)}function y(P,w,C,v){let x=null;const A=C.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(A!==void 0)x=A;else if(x=C.isPointLight===!0?l:a,s.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){const L=x.uuid,U=w.uuid;let I=c[L];I===void 0&&(I={},c[L]=I);let B=I[U];B===void 0&&(B=x.clone(),I[U]=B,w.addEventListener("dispose",R)),x=B}if(x.visible=w.visible,x.wireframe=w.wireframe,v===si?x.side=w.shadowSide!==null?w.shadowSide:w.side:x.side=w.shadowSide!==null?w.shadowSide:u[w.side],x.alphaMap=w.alphaMap,x.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,x.map=w.map,x.clipShadows=w.clipShadows,x.clippingPlanes=w.clippingPlanes,x.clipIntersection=w.clipIntersection,x.displacementMap=w.displacementMap,x.displacementScale=w.displacementScale,x.displacementBias=w.displacementBias,x.wireframeLinewidth=w.wireframeLinewidth,x.linewidth=w.linewidth,C.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const L=s.properties.get(x);L.light=C}return x}function M(P,w,C,v,x){if(P.visible===!1)return;if(P.layers.test(w.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&x===si)&&(!P.frustumCulled||n.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,P.matrixWorld);const U=e.update(P),I=P.material;if(Array.isArray(I)){const B=U.groups;for(let O=0,K=B.length;O<K;O++){const V=B[O],$=I[V.materialIndex];if($&&$.visible){const se=y(P,$,v,x);P.onBeforeShadow(s,P,w,C,U,se,V),s.renderBufferDirect(C,null,U,se,P,V),P.onAfterShadow(s,P,w,C,U,se,V)}}}else if(I.visible){const B=y(P,I,v,x);P.onBeforeShadow(s,P,w,C,U,B,null),s.renderBufferDirect(C,null,U,B,P,null),P.onAfterShadow(s,P,w,C,U,B,null)}}const L=P.children;for(let U=0,I=L.length;U<I;U++)M(L[U],w,C,v,x)}function R(P){P.target.removeEventListener("dispose",R);for(const C in c){const v=c[C],x=P.target.uuid;x in v&&(v[x].dispose(),delete v[x])}}}const kv={[Ka]:Ya,[$a]:Qa,[Za]:el,[Fs]:Ja,[Ya]:Ka,[Qa]:$a,[el]:Za,[Ja]:Fs};function Vv(s,e){function t(){let F=!1;const ie=new et;let oe=null;const pe=new et(0,0,0,0);return{setMask:function(Q){oe!==Q&&!F&&(s.colorMask(Q,Q,Q,Q),oe=Q)},setLocked:function(Q){F=Q},setClear:function(Q,Y,_e,Oe,ft){ft===!0&&(Q*=Oe,Y*=Oe,_e*=Oe),ie.set(Q,Y,_e,Oe),pe.equals(ie)===!1&&(s.clearColor(Q,Y,_e,Oe),pe.copy(ie))},reset:function(){F=!1,oe=null,pe.set(-1,0,0,0)}}}function n(){let F=!1,ie=!1,oe=null,pe=null,Q=null;return{setReversed:function(Y){if(ie!==Y){const _e=e.get("EXT_clip_control");Y?_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.ZERO_TO_ONE_EXT):_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.NEGATIVE_ONE_TO_ONE_EXT),ie=Y;const Oe=Q;Q=null,this.setClear(Oe)}},getReversed:function(){return ie},setTest:function(Y){Y?Z(s.DEPTH_TEST):me(s.DEPTH_TEST)},setMask:function(Y){oe!==Y&&!F&&(s.depthMask(Y),oe=Y)},setFunc:function(Y){if(ie&&(Y=kv[Y]),pe!==Y){switch(Y){case Ka:s.depthFunc(s.NEVER);break;case Ya:s.depthFunc(s.ALWAYS);break;case $a:s.depthFunc(s.LESS);break;case Fs:s.depthFunc(s.LEQUAL);break;case Za:s.depthFunc(s.EQUAL);break;case Ja:s.depthFunc(s.GEQUAL);break;case Qa:s.depthFunc(s.GREATER);break;case el:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}pe=Y}},setLocked:function(Y){F=Y},setClear:function(Y){Q!==Y&&(ie&&(Y=1-Y),s.clearDepth(Y),Q=Y)},reset:function(){F=!1,oe=null,pe=null,Q=null,ie=!1}}}function i(){let F=!1,ie=null,oe=null,pe=null,Q=null,Y=null,_e=null,Oe=null,ft=null;return{setTest:function(it){F||(it?Z(s.STENCIL_TEST):me(s.STENCIL_TEST))},setMask:function(it){ie!==it&&!F&&(s.stencilMask(it),ie=it)},setFunc:function(it,Yn,On){(oe!==it||pe!==Yn||Q!==On)&&(s.stencilFunc(it,Yn,On),oe=it,pe=Yn,Q=On)},setOp:function(it,Yn,On){(Y!==it||_e!==Yn||Oe!==On)&&(s.stencilOp(it,Yn,On),Y=it,_e=Yn,Oe=On)},setLocked:function(it){F=it},setClear:function(it){ft!==it&&(s.clearStencil(it),ft=it)},reset:function(){F=!1,ie=null,oe=null,pe=null,Q=null,Y=null,_e=null,Oe=null,ft=null}}}const r=new t,o=new n,a=new i,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,f=[],g=null,_=!1,m=null,p=null,S=null,y=null,M=null,R=null,P=null,w=new Re(0,0,0),C=0,v=!1,x=null,A=null,L=null,U=null,I=null;const B=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,K=0;const V=s.getParameter(s.VERSION);V.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(V)[1]),O=K>=1):V.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),O=K>=2);let $=null,se={};const de=s.getParameter(s.SCISSOR_BOX),Le=s.getParameter(s.VIEWPORT),Qe=new et().fromArray(de),tt=new et().fromArray(Le);function qe(F,ie,oe,pe){const Q=new Uint8Array(4),Y=s.createTexture();s.bindTexture(F,Y),s.texParameteri(F,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(F,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let _e=0;_e<oe;_e++)F===s.TEXTURE_3D||F===s.TEXTURE_2D_ARRAY?s.texImage3D(ie,0,s.RGBA,1,1,pe,0,s.RGBA,s.UNSIGNED_BYTE,Q):s.texImage2D(ie+_e,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Q);return Y}const q={};q[s.TEXTURE_2D]=qe(s.TEXTURE_2D,s.TEXTURE_2D,1),q[s.TEXTURE_CUBE_MAP]=qe(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),q[s.TEXTURE_2D_ARRAY]=qe(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),q[s.TEXTURE_3D]=qe(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),Z(s.DEPTH_TEST),o.setFunc(Fs),Pe(!1),ve(Dc),Z(s.CULL_FACE),_t(Pi);function Z(F){h[F]!==!0&&(s.enable(F),h[F]=!0)}function me(F){h[F]!==!1&&(s.disable(F),h[F]=!1)}function Ie(F,ie){return u[F]!==ie?(s.bindFramebuffer(F,ie),u[F]=ie,F===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=ie),F===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=ie),!0):!1}function Ee(F,ie){let oe=f,pe=!1;if(F){oe=d.get(ie),oe===void 0&&(oe=[],d.set(ie,oe));const Q=F.textures;if(oe.length!==Q.length||oe[0]!==s.COLOR_ATTACHMENT0){for(let Y=0,_e=Q.length;Y<_e;Y++)oe[Y]=s.COLOR_ATTACHMENT0+Y;oe.length=Q.length,pe=!0}}else oe[0]!==s.BACK&&(oe[0]=s.BACK,pe=!0);pe&&s.drawBuffers(oe)}function Ze(F){return g!==F?(s.useProgram(F),g=F,!0):!1}const Vt={[$i]:s.FUNC_ADD,[Bd]:s.FUNC_SUBTRACT,[zd]:s.FUNC_REVERSE_SUBTRACT};Vt[kd]=s.MIN,Vt[Vd]=s.MAX;const N={[Hd]:s.ZERO,[Gd]:s.ONE,[Wd]:s.SRC_COLOR,[qa]:s.SRC_ALPHA,[$d]:s.SRC_ALPHA_SATURATE,[Kd]:s.DST_COLOR,[qd]:s.DST_ALPHA,[Xd]:s.ONE_MINUS_SRC_COLOR,[ja]:s.ONE_MINUS_SRC_ALPHA,[Yd]:s.ONE_MINUS_DST_COLOR,[jd]:s.ONE_MINUS_DST_ALPHA,[Zd]:s.CONSTANT_COLOR,[Jd]:s.ONE_MINUS_CONSTANT_COLOR,[Qd]:s.CONSTANT_ALPHA,[ef]:s.ONE_MINUS_CONSTANT_ALPHA};function _t(F,ie,oe,pe,Q,Y,_e,Oe,ft,it){if(F===Pi){_===!0&&(me(s.BLEND),_=!1);return}if(_===!1&&(Z(s.BLEND),_=!0),F!==Od){if(F!==m||it!==v){if((p!==$i||M!==$i)&&(s.blendEquation(s.FUNC_ADD),p=$i,M=$i),it)switch(F){case Ls:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Lc:s.blendFunc(s.ONE,s.ONE);break;case Ic:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Nc:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case Ls:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Lc:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Ic:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Nc:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}S=null,y=null,R=null,P=null,w.set(0,0,0),C=0,m=F,v=it}return}Q=Q||ie,Y=Y||oe,_e=_e||pe,(ie!==p||Q!==M)&&(s.blendEquationSeparate(Vt[ie],Vt[Q]),p=ie,M=Q),(oe!==S||pe!==y||Y!==R||_e!==P)&&(s.blendFuncSeparate(N[oe],N[pe],N[Y],N[_e]),S=oe,y=pe,R=Y,P=_e),(Oe.equals(w)===!1||ft!==C)&&(s.blendColor(Oe.r,Oe.g,Oe.b,ft),w.copy(Oe),C=ft),m=F,v=!1}function Be(F,ie){F.side===un?me(s.CULL_FACE):Z(s.CULL_FACE);let oe=F.side===jt;ie&&(oe=!oe),Pe(oe),F.blending===Ls&&F.transparent===!1?_t(Pi):_t(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),o.setFunc(F.depthFunc),o.setTest(F.depthTest),o.setMask(F.depthWrite),r.setMask(F.colorWrite);const pe=F.stencilWrite;a.setTest(pe),pe&&(a.setMask(F.stencilWriteMask),a.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),a.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),xe(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?Z(s.SAMPLE_ALPHA_TO_COVERAGE):me(s.SAMPLE_ALPHA_TO_COVERAGE)}function Pe(F){x!==F&&(F?s.frontFace(s.CW):s.frontFace(s.CCW),x=F)}function ve(F){F!==Ud?(Z(s.CULL_FACE),F!==A&&(F===Dc?s.cullFace(s.BACK):F===Fd?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):me(s.CULL_FACE),A=F}function vt(F){F!==L&&(O&&s.lineWidth(F),L=F)}function xe(F,ie,oe){F?(Z(s.POLYGON_OFFSET_FILL),(U!==ie||I!==oe)&&(s.polygonOffset(ie,oe),U=ie,I=oe)):me(s.POLYGON_OFFSET_FILL)}function Ge(F){F?Z(s.SCISSOR_TEST):me(s.SCISSOR_TEST)}function Ft(F){F===void 0&&(F=s.TEXTURE0+B-1),$!==F&&(s.activeTexture(F),$=F)}function Tt(F,ie,oe){oe===void 0&&($===null?oe=s.TEXTURE0+B-1:oe=$);let pe=se[oe];pe===void 0&&(pe={type:void 0,texture:void 0},se[oe]=pe),(pe.type!==F||pe.texture!==ie)&&($!==oe&&(s.activeTexture(oe),$=oe),s.bindTexture(F,ie||q[F]),pe.type=F,pe.texture=ie)}function D(){const F=se[$];F!==void 0&&F.type!==void 0&&(s.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function b(){try{s.compressedTexImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function H(){try{s.compressedTexImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function j(){try{s.texSubImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function J(){try{s.texSubImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function X(){try{s.compressedTexSubImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function be(){try{s.compressedTexSubImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function re(){try{s.texStorage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ye(){try{s.texStorage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Me(){try{s.texImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ne(){try{s.texImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function he(F){Qe.equals(F)===!1&&(s.scissor(F.x,F.y,F.z,F.w),Qe.copy(F))}function Ce(F){tt.equals(F)===!1&&(s.viewport(F.x,F.y,F.z,F.w),tt.copy(F))}function Se(F,ie){let oe=c.get(ie);oe===void 0&&(oe=new WeakMap,c.set(ie,oe));let pe=oe.get(F);pe===void 0&&(pe=s.getUniformBlockIndex(ie,F.name),oe.set(F,pe))}function le(F,ie){const pe=c.get(ie).get(F);l.get(ie)!==pe&&(s.uniformBlockBinding(ie,pe,F.__bindingPointIndex),l.set(ie,pe))}function ke(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},$=null,se={},u={},d=new WeakMap,f=[],g=null,_=!1,m=null,p=null,S=null,y=null,M=null,R=null,P=null,w=new Re(0,0,0),C=0,v=!1,x=null,A=null,L=null,U=null,I=null,Qe.set(0,0,s.canvas.width,s.canvas.height),tt.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:Z,disable:me,bindFramebuffer:Ie,drawBuffers:Ee,useProgram:Ze,setBlending:_t,setMaterial:Be,setFlipSided:Pe,setCullFace:ve,setLineWidth:vt,setPolygonOffset:xe,setScissorTest:Ge,activeTexture:Ft,bindTexture:Tt,unbindTexture:D,compressedTexImage2D:b,compressedTexImage3D:H,texImage2D:Me,texImage3D:ne,updateUBOMapping:Se,uniformBlockBinding:le,texStorage2D:re,texStorage3D:ye,texSubImage2D:j,texSubImage3D:J,compressedTexSubImage2D:X,compressedTexSubImage3D:be,scissor:he,viewport:Ce,reset:ke}}function Hv(s,e,t,n,i,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ue,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(D,b){return f?new OffscreenCanvas(D,b):Dr("canvas")}function _(D,b,H){let j=1;const J=Tt(D);if((J.width>H||J.height>H)&&(j=H/Math.max(J.width,J.height)),j<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const X=Math.floor(j*J.width),be=Math.floor(j*J.height);u===void 0&&(u=g(X,be));const re=b?g(X,be):u;return re.width=X,re.height=be,re.getContext("2d").drawImage(D,0,0,X,be),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+X+"x"+be+")."),re}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),D;return D}function m(D){return D.generateMipmaps}function p(D){s.generateMipmap(D)}function S(D){return D.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?s.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function y(D,b,H,j,J=!1){if(D!==null){if(s[D]!==void 0)return s[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let X=b;if(b===s.RED&&(H===s.FLOAT&&(X=s.R32F),H===s.HALF_FLOAT&&(X=s.R16F),H===s.UNSIGNED_BYTE&&(X=s.R8)),b===s.RED_INTEGER&&(H===s.UNSIGNED_BYTE&&(X=s.R8UI),H===s.UNSIGNED_SHORT&&(X=s.R16UI),H===s.UNSIGNED_INT&&(X=s.R32UI),H===s.BYTE&&(X=s.R8I),H===s.SHORT&&(X=s.R16I),H===s.INT&&(X=s.R32I)),b===s.RG&&(H===s.FLOAT&&(X=s.RG32F),H===s.HALF_FLOAT&&(X=s.RG16F),H===s.UNSIGNED_BYTE&&(X=s.RG8)),b===s.RG_INTEGER&&(H===s.UNSIGNED_BYTE&&(X=s.RG8UI),H===s.UNSIGNED_SHORT&&(X=s.RG16UI),H===s.UNSIGNED_INT&&(X=s.RG32UI),H===s.BYTE&&(X=s.RG8I),H===s.SHORT&&(X=s.RG16I),H===s.INT&&(X=s.RG32I)),b===s.RGB_INTEGER&&(H===s.UNSIGNED_BYTE&&(X=s.RGB8UI),H===s.UNSIGNED_SHORT&&(X=s.RGB16UI),H===s.UNSIGNED_INT&&(X=s.RGB32UI),H===s.BYTE&&(X=s.RGB8I),H===s.SHORT&&(X=s.RGB16I),H===s.INT&&(X=s.RGB32I)),b===s.RGBA_INTEGER&&(H===s.UNSIGNED_BYTE&&(X=s.RGBA8UI),H===s.UNSIGNED_SHORT&&(X=s.RGBA16UI),H===s.UNSIGNED_INT&&(X=s.RGBA32UI),H===s.BYTE&&(X=s.RGBA8I),H===s.SHORT&&(X=s.RGBA16I),H===s.INT&&(X=s.RGBA32I)),b===s.RGB&&(H===s.UNSIGNED_INT_5_9_9_9_REV&&(X=s.RGB9_E5),H===s.UNSIGNED_INT_10F_11F_11F_REV&&(X=s.R11F_G11F_B10F)),b===s.RGBA){const be=J?Io:Je.getTransfer(j);H===s.FLOAT&&(X=s.RGBA32F),H===s.HALF_FLOAT&&(X=s.RGBA16F),H===s.UNSIGNED_BYTE&&(X=be===at?s.SRGB8_ALPHA8:s.RGBA8),H===s.UNSIGNED_SHORT_4_4_4_4&&(X=s.RGBA4),H===s.UNSIGNED_SHORT_5_5_5_1&&(X=s.RGB5_A1)}return(X===s.R16F||X===s.R32F||X===s.RG16F||X===s.RG32F||X===s.RGBA16F||X===s.RGBA32F)&&e.get("EXT_color_buffer_float"),X}function M(D,b){let H;return D?b===null||b===ts||b===wr?H=s.DEPTH24_STENCIL8:b===Dn?H=s.DEPTH32F_STENCIL8:b===Tr&&(H=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===ts||b===wr?H=s.DEPTH_COMPONENT24:b===Dn?H=s.DEPTH_COMPONENT32F:b===Tr&&(H=s.DEPTH_COMPONENT16),H}function R(D,b){return m(D)===!0||D.isFramebufferTexture&&D.minFilter!==tn&&D.minFilter!==Qt?Math.log2(Math.max(b.width,b.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?b.mipmaps.length:1}function P(D){const b=D.target;b.removeEventListener("dispose",P),C(b),b.isVideoTexture&&h.delete(b)}function w(D){const b=D.target;b.removeEventListener("dispose",w),x(b)}function C(D){const b=n.get(D);if(b.__webglInit===void 0)return;const H=D.source,j=d.get(H);if(j){const J=j[b.__cacheKey];J.usedTimes--,J.usedTimes===0&&v(D),Object.keys(j).length===0&&d.delete(H)}n.remove(D)}function v(D){const b=n.get(D);s.deleteTexture(b.__webglTexture);const H=D.source,j=d.get(H);delete j[b.__cacheKey],o.memory.textures--}function x(D){const b=n.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),n.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(b.__webglFramebuffer[j]))for(let J=0;J<b.__webglFramebuffer[j].length;J++)s.deleteFramebuffer(b.__webglFramebuffer[j][J]);else s.deleteFramebuffer(b.__webglFramebuffer[j]);b.__webglDepthbuffer&&s.deleteRenderbuffer(b.__webglDepthbuffer[j])}else{if(Array.isArray(b.__webglFramebuffer))for(let j=0;j<b.__webglFramebuffer.length;j++)s.deleteFramebuffer(b.__webglFramebuffer[j]);else s.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&s.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&s.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let j=0;j<b.__webglColorRenderbuffer.length;j++)b.__webglColorRenderbuffer[j]&&s.deleteRenderbuffer(b.__webglColorRenderbuffer[j]);b.__webglDepthRenderbuffer&&s.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const H=D.textures;for(let j=0,J=H.length;j<J;j++){const X=n.get(H[j]);X.__webglTexture&&(s.deleteTexture(X.__webglTexture),o.memory.textures--),n.remove(H[j])}n.remove(D)}let A=0;function L(){A=0}function U(){const D=A;return D>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+i.maxTextures),A+=1,D}function I(D){const b=[];return b.push(D.wrapS),b.push(D.wrapT),b.push(D.wrapR||0),b.push(D.magFilter),b.push(D.minFilter),b.push(D.anisotropy),b.push(D.internalFormat),b.push(D.format),b.push(D.type),b.push(D.generateMipmaps),b.push(D.premultiplyAlpha),b.push(D.flipY),b.push(D.unpackAlignment),b.push(D.colorSpace),b.join()}function B(D,b){const H=n.get(D);if(D.isVideoTexture&&Ge(D),D.isRenderTargetTexture===!1&&D.isExternalTexture!==!0&&D.version>0&&H.__version!==D.version){const j=D.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(H,D,b);return}}else D.isExternalTexture&&(H.__webglTexture=D.sourceTexture?D.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,H.__webglTexture,s.TEXTURE0+b)}function O(D,b){const H=n.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&H.__version!==D.version){q(H,D,b);return}t.bindTexture(s.TEXTURE_2D_ARRAY,H.__webglTexture,s.TEXTURE0+b)}function K(D,b){const H=n.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&H.__version!==D.version){q(H,D,b);return}t.bindTexture(s.TEXTURE_3D,H.__webglTexture,s.TEXTURE0+b)}function V(D,b){const H=n.get(D);if(D.version>0&&H.__version!==D.version){Z(H,D,b);return}t.bindTexture(s.TEXTURE_CUBE_MAP,H.__webglTexture,s.TEXTURE0+b)}const $={[es]:s.REPEAT,[Ri]:s.CLAMP_TO_EDGE,[Lo]:s.MIRRORED_REPEAT},se={[tn]:s.NEAREST,[Du]:s.NEAREST_MIPMAP_NEAREST,[lr]:s.NEAREST_MIPMAP_LINEAR,[Qt]:s.LINEAR,[So]:s.LINEAR_MIPMAP_NEAREST,[ai]:s.LINEAR_MIPMAP_LINEAR},de={[gf]:s.NEVER,[Sf]:s.ALWAYS,[_f]:s.LESS,[ku]:s.LEQUAL,[vf]:s.EQUAL,[Mf]:s.GEQUAL,[xf]:s.GREATER,[yf]:s.NOTEQUAL};function Le(D,b){if(b.type===Dn&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===Qt||b.magFilter===So||b.magFilter===lr||b.magFilter===ai||b.minFilter===Qt||b.minFilter===So||b.minFilter===lr||b.minFilter===ai)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(D,s.TEXTURE_WRAP_S,$[b.wrapS]),s.texParameteri(D,s.TEXTURE_WRAP_T,$[b.wrapT]),(D===s.TEXTURE_3D||D===s.TEXTURE_2D_ARRAY)&&s.texParameteri(D,s.TEXTURE_WRAP_R,$[b.wrapR]),s.texParameteri(D,s.TEXTURE_MAG_FILTER,se[b.magFilter]),s.texParameteri(D,s.TEXTURE_MIN_FILTER,se[b.minFilter]),b.compareFunction&&(s.texParameteri(D,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(D,s.TEXTURE_COMPARE_FUNC,de[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===tn||b.minFilter!==lr&&b.minFilter!==ai||b.type===Dn&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){const H=e.get("EXT_texture_filter_anisotropic");s.texParameterf(D,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,i.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function Qe(D,b){let H=!1;D.__webglInit===void 0&&(D.__webglInit=!0,b.addEventListener("dispose",P));const j=b.source;let J=d.get(j);J===void 0&&(J={},d.set(j,J));const X=I(b);if(X!==D.__cacheKey){J[X]===void 0&&(J[X]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,H=!0),J[X].usedTimes++;const be=J[D.__cacheKey];be!==void 0&&(J[D.__cacheKey].usedTimes--,be.usedTimes===0&&v(b)),D.__cacheKey=X,D.__webglTexture=J[X].texture}return H}function tt(D,b,H){return Math.floor(Math.floor(D/H)/b)}function qe(D,b,H,j){const X=D.updateRanges;if(X.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,b.width,b.height,H,j,b.data);else{X.sort((ne,he)=>ne.start-he.start);let be=0;for(let ne=1;ne<X.length;ne++){const he=X[be],Ce=X[ne],Se=he.start+he.count,le=tt(Ce.start,b.width,4),ke=tt(he.start,b.width,4);Ce.start<=Se+1&&le===ke&&tt(Ce.start+Ce.count-1,b.width,4)===le?he.count=Math.max(he.count,Ce.start+Ce.count-he.start):(++be,X[be]=Ce)}X.length=be+1;const re=s.getParameter(s.UNPACK_ROW_LENGTH),ye=s.getParameter(s.UNPACK_SKIP_PIXELS),Me=s.getParameter(s.UNPACK_SKIP_ROWS);s.pixelStorei(s.UNPACK_ROW_LENGTH,b.width);for(let ne=0,he=X.length;ne<he;ne++){const Ce=X[ne],Se=Math.floor(Ce.start/4),le=Math.ceil(Ce.count/4),ke=Se%b.width,F=Math.floor(Se/b.width),ie=le,oe=1;s.pixelStorei(s.UNPACK_SKIP_PIXELS,ke),s.pixelStorei(s.UNPACK_SKIP_ROWS,F),t.texSubImage2D(s.TEXTURE_2D,0,ke,F,ie,oe,H,j,b.data)}D.clearUpdateRanges(),s.pixelStorei(s.UNPACK_ROW_LENGTH,re),s.pixelStorei(s.UNPACK_SKIP_PIXELS,ye),s.pixelStorei(s.UNPACK_SKIP_ROWS,Me)}}function q(D,b,H){let j=s.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(j=s.TEXTURE_2D_ARRAY),b.isData3DTexture&&(j=s.TEXTURE_3D);const J=Qe(D,b),X=b.source;t.bindTexture(j,D.__webglTexture,s.TEXTURE0+H);const be=n.get(X);if(X.version!==be.__version||J===!0){t.activeTexture(s.TEXTURE0+H);const re=Je.getPrimaries(Je.workingColorSpace),ye=b.colorSpace===Ai?null:Je.getPrimaries(b.colorSpace),Me=b.colorSpace===Ai||re===ye?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,b.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,b.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me);let ne=_(b.image,!1,i.maxTextureSize);ne=Ft(b,ne);const he=r.convert(b.format,b.colorSpace),Ce=r.convert(b.type);let Se=y(b.internalFormat,he,Ce,b.colorSpace,b.isVideoTexture);Le(j,b);let le;const ke=b.mipmaps,F=b.isVideoTexture!==!0,ie=be.__version===void 0||J===!0,oe=X.dataReady,pe=R(b,ne);if(b.isDepthTexture)Se=M(b.format===Rr,b.type),ie&&(F?t.texStorage2D(s.TEXTURE_2D,1,Se,ne.width,ne.height):t.texImage2D(s.TEXTURE_2D,0,Se,ne.width,ne.height,0,he,Ce,null));else if(b.isDataTexture)if(ke.length>0){F&&ie&&t.texStorage2D(s.TEXTURE_2D,pe,Se,ke[0].width,ke[0].height);for(let Q=0,Y=ke.length;Q<Y;Q++)le=ke[Q],F?oe&&t.texSubImage2D(s.TEXTURE_2D,Q,0,0,le.width,le.height,he,Ce,le.data):t.texImage2D(s.TEXTURE_2D,Q,Se,le.width,le.height,0,he,Ce,le.data);b.generateMipmaps=!1}else F?(ie&&t.texStorage2D(s.TEXTURE_2D,pe,Se,ne.width,ne.height),oe&&qe(b,ne,he,Ce)):t.texImage2D(s.TEXTURE_2D,0,Se,ne.width,ne.height,0,he,Ce,ne.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){F&&ie&&t.texStorage3D(s.TEXTURE_2D_ARRAY,pe,Se,ke[0].width,ke[0].height,ne.depth);for(let Q=0,Y=ke.length;Q<Y;Q++)if(le=ke[Q],b.format!==Sn)if(he!==null)if(F){if(oe)if(b.layerUpdates.size>0){const _e=Rh(le.width,le.height,b.format,b.type);for(const Oe of b.layerUpdates){const ft=le.data.subarray(Oe*_e/le.data.BYTES_PER_ELEMENT,(Oe+1)*_e/le.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Q,0,0,Oe,le.width,le.height,1,he,ft)}b.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Q,0,0,0,le.width,le.height,ne.depth,he,le.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,Q,Se,le.width,le.height,ne.depth,0,le.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else F?oe&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,Q,0,0,0,le.width,le.height,ne.depth,he,Ce,le.data):t.texImage3D(s.TEXTURE_2D_ARRAY,Q,Se,le.width,le.height,ne.depth,0,he,Ce,le.data)}else{F&&ie&&t.texStorage2D(s.TEXTURE_2D,pe,Se,ke[0].width,ke[0].height);for(let Q=0,Y=ke.length;Q<Y;Q++)le=ke[Q],b.format!==Sn?he!==null?F?oe&&t.compressedTexSubImage2D(s.TEXTURE_2D,Q,0,0,le.width,le.height,he,le.data):t.compressedTexImage2D(s.TEXTURE_2D,Q,Se,le.width,le.height,0,le.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):F?oe&&t.texSubImage2D(s.TEXTURE_2D,Q,0,0,le.width,le.height,he,Ce,le.data):t.texImage2D(s.TEXTURE_2D,Q,Se,le.width,le.height,0,he,Ce,le.data)}else if(b.isDataArrayTexture)if(F){if(ie&&t.texStorage3D(s.TEXTURE_2D_ARRAY,pe,Se,ne.width,ne.height,ne.depth),oe)if(b.layerUpdates.size>0){const Q=Rh(ne.width,ne.height,b.format,b.type);for(const Y of b.layerUpdates){const _e=ne.data.subarray(Y*Q/ne.data.BYTES_PER_ELEMENT,(Y+1)*Q/ne.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,Y,ne.width,ne.height,1,he,Ce,_e)}b.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,he,Ce,ne.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,Se,ne.width,ne.height,ne.depth,0,he,Ce,ne.data);else if(b.isData3DTexture)F?(ie&&t.texStorage3D(s.TEXTURE_3D,pe,Se,ne.width,ne.height,ne.depth),oe&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,he,Ce,ne.data)):t.texImage3D(s.TEXTURE_3D,0,Se,ne.width,ne.height,ne.depth,0,he,Ce,ne.data);else if(b.isFramebufferTexture){if(ie)if(F)t.texStorage2D(s.TEXTURE_2D,pe,Se,ne.width,ne.height);else{let Q=ne.width,Y=ne.height;for(let _e=0;_e<pe;_e++)t.texImage2D(s.TEXTURE_2D,_e,Se,Q,Y,0,he,Ce,null),Q>>=1,Y>>=1}}else if(ke.length>0){if(F&&ie){const Q=Tt(ke[0]);t.texStorage2D(s.TEXTURE_2D,pe,Se,Q.width,Q.height)}for(let Q=0,Y=ke.length;Q<Y;Q++)le=ke[Q],F?oe&&t.texSubImage2D(s.TEXTURE_2D,Q,0,0,he,Ce,le):t.texImage2D(s.TEXTURE_2D,Q,Se,he,Ce,le);b.generateMipmaps=!1}else if(F){if(ie){const Q=Tt(ne);t.texStorage2D(s.TEXTURE_2D,pe,Se,Q.width,Q.height)}oe&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,he,Ce,ne)}else t.texImage2D(s.TEXTURE_2D,0,Se,he,Ce,ne);m(b)&&p(j),be.__version=X.version,b.onUpdate&&b.onUpdate(b)}D.__version=b.version}function Z(D,b,H){if(b.image.length!==6)return;const j=Qe(D,b),J=b.source;t.bindTexture(s.TEXTURE_CUBE_MAP,D.__webglTexture,s.TEXTURE0+H);const X=n.get(J);if(J.version!==X.__version||j===!0){t.activeTexture(s.TEXTURE0+H);const be=Je.getPrimaries(Je.workingColorSpace),re=b.colorSpace===Ai?null:Je.getPrimaries(b.colorSpace),ye=b.colorSpace===Ai||be===re?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,b.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,b.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye);const Me=b.isCompressedTexture||b.image[0].isCompressedTexture,ne=b.image[0]&&b.image[0].isDataTexture,he=[];for(let Y=0;Y<6;Y++)!Me&&!ne?he[Y]=_(b.image[Y],!0,i.maxCubemapSize):he[Y]=ne?b.image[Y].image:b.image[Y],he[Y]=Ft(b,he[Y]);const Ce=he[0],Se=r.convert(b.format,b.colorSpace),le=r.convert(b.type),ke=y(b.internalFormat,Se,le,b.colorSpace),F=b.isVideoTexture!==!0,ie=X.__version===void 0||j===!0,oe=J.dataReady;let pe=R(b,Ce);Le(s.TEXTURE_CUBE_MAP,b);let Q;if(Me){F&&ie&&t.texStorage2D(s.TEXTURE_CUBE_MAP,pe,ke,Ce.width,Ce.height);for(let Y=0;Y<6;Y++){Q=he[Y].mipmaps;for(let _e=0;_e<Q.length;_e++){const Oe=Q[_e];b.format!==Sn?Se!==null?F?oe&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,_e,0,0,Oe.width,Oe.height,Se,Oe.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,_e,ke,Oe.width,Oe.height,0,Oe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?oe&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,_e,0,0,Oe.width,Oe.height,Se,le,Oe.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,_e,ke,Oe.width,Oe.height,0,Se,le,Oe.data)}}}else{if(Q=b.mipmaps,F&&ie){Q.length>0&&pe++;const Y=Tt(he[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,pe,ke,Y.width,Y.height)}for(let Y=0;Y<6;Y++)if(ne){F?oe&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,he[Y].width,he[Y].height,Se,le,he[Y].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,ke,he[Y].width,he[Y].height,0,Se,le,he[Y].data);for(let _e=0;_e<Q.length;_e++){const ft=Q[_e].image[Y].image;F?oe&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,_e+1,0,0,ft.width,ft.height,Se,le,ft.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,_e+1,ke,ft.width,ft.height,0,Se,le,ft.data)}}else{F?oe&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,Se,le,he[Y]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,ke,Se,le,he[Y]);for(let _e=0;_e<Q.length;_e++){const Oe=Q[_e];F?oe&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,_e+1,0,0,Se,le,Oe.image[Y]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,_e+1,ke,Se,le,Oe.image[Y])}}}m(b)&&p(s.TEXTURE_CUBE_MAP),X.__version=J.version,b.onUpdate&&b.onUpdate(b)}D.__version=b.version}function me(D,b,H,j,J,X){const be=r.convert(H.format,H.colorSpace),re=r.convert(H.type),ye=y(H.internalFormat,be,re,H.colorSpace),Me=n.get(b),ne=n.get(H);if(ne.__renderTarget=b,!Me.__hasExternalTextures){const he=Math.max(1,b.width>>X),Ce=Math.max(1,b.height>>X);J===s.TEXTURE_3D||J===s.TEXTURE_2D_ARRAY?t.texImage3D(J,X,ye,he,Ce,b.depth,0,be,re,null):t.texImage2D(J,X,ye,he,Ce,0,be,re,null)}t.bindFramebuffer(s.FRAMEBUFFER,D),xe(b)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,j,J,ne.__webglTexture,0,vt(b)):(J===s.TEXTURE_2D||J>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,j,J,ne.__webglTexture,X),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Ie(D,b,H){if(s.bindRenderbuffer(s.RENDERBUFFER,D),b.depthBuffer){const j=b.depthTexture,J=j&&j.isDepthTexture?j.type:null,X=M(b.stencilBuffer,J),be=b.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,re=vt(b);xe(b)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,re,X,b.width,b.height):H?s.renderbufferStorageMultisample(s.RENDERBUFFER,re,X,b.width,b.height):s.renderbufferStorage(s.RENDERBUFFER,X,b.width,b.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,be,s.RENDERBUFFER,D)}else{const j=b.textures;for(let J=0;J<j.length;J++){const X=j[J],be=r.convert(X.format,X.colorSpace),re=r.convert(X.type),ye=y(X.internalFormat,be,re,X.colorSpace),Me=vt(b);H&&xe(b)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Me,ye,b.width,b.height):xe(b)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Me,ye,b.width,b.height):s.renderbufferStorage(s.RENDERBUFFER,ye,b.width,b.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Ee(D,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,D),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const j=n.get(b.depthTexture);j.__renderTarget=b,(!j.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),B(b.depthTexture,0);const J=j.__webglTexture,X=vt(b);if(b.depthTexture.format===Ar)xe(b)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,J,0,X):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,J,0);else if(b.depthTexture.format===Rr)xe(b)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,J,0,X):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function Ze(D){const b=n.get(D),H=D.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==D.depthTexture){const j=D.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),j){const J=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,j.removeEventListener("dispose",J)};j.addEventListener("dispose",J),b.__depthDisposeCallback=J}b.__boundDepthTexture=j}if(D.depthTexture&&!b.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");const j=D.texture.mipmaps;j&&j.length>0?Ee(b.__webglFramebuffer[0],D):Ee(b.__webglFramebuffer,D)}else if(H){b.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(t.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer[j]),b.__webglDepthbuffer[j]===void 0)b.__webglDepthbuffer[j]=s.createRenderbuffer(),Ie(b.__webglDepthbuffer[j],D,!1);else{const J=D.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,X=b.__webglDepthbuffer[j];s.bindRenderbuffer(s.RENDERBUFFER,X),s.framebufferRenderbuffer(s.FRAMEBUFFER,J,s.RENDERBUFFER,X)}}else{const j=D.texture.mipmaps;if(j&&j.length>0?t.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=s.createRenderbuffer(),Ie(b.__webglDepthbuffer,D,!1);else{const J=D.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,X=b.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,X),s.framebufferRenderbuffer(s.FRAMEBUFFER,J,s.RENDERBUFFER,X)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function Vt(D,b,H){const j=n.get(D);b!==void 0&&me(j.__webglFramebuffer,D,D.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),H!==void 0&&Ze(D)}function N(D){const b=D.texture,H=n.get(D),j=n.get(b);D.addEventListener("dispose",w);const J=D.textures,X=D.isWebGLCubeRenderTarget===!0,be=J.length>1;if(be||(j.__webglTexture===void 0&&(j.__webglTexture=s.createTexture()),j.__version=b.version,o.memory.textures++),X){H.__webglFramebuffer=[];for(let re=0;re<6;re++)if(b.mipmaps&&b.mipmaps.length>0){H.__webglFramebuffer[re]=[];for(let ye=0;ye<b.mipmaps.length;ye++)H.__webglFramebuffer[re][ye]=s.createFramebuffer()}else H.__webglFramebuffer[re]=s.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){H.__webglFramebuffer=[];for(let re=0;re<b.mipmaps.length;re++)H.__webglFramebuffer[re]=s.createFramebuffer()}else H.__webglFramebuffer=s.createFramebuffer();if(be)for(let re=0,ye=J.length;re<ye;re++){const Me=n.get(J[re]);Me.__webglTexture===void 0&&(Me.__webglTexture=s.createTexture(),o.memory.textures++)}if(D.samples>0&&xe(D)===!1){H.__webglMultisampledFramebuffer=s.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let re=0;re<J.length;re++){const ye=J[re];H.__webglColorRenderbuffer[re]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,H.__webglColorRenderbuffer[re]);const Me=r.convert(ye.format,ye.colorSpace),ne=r.convert(ye.type),he=y(ye.internalFormat,Me,ne,ye.colorSpace,D.isXRRenderTarget===!0),Ce=vt(D);s.renderbufferStorageMultisample(s.RENDERBUFFER,Ce,he,D.width,D.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+re,s.RENDERBUFFER,H.__webglColorRenderbuffer[re])}s.bindRenderbuffer(s.RENDERBUFFER,null),D.depthBuffer&&(H.__webglDepthRenderbuffer=s.createRenderbuffer(),Ie(H.__webglDepthRenderbuffer,D,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(X){t.bindTexture(s.TEXTURE_CUBE_MAP,j.__webglTexture),Le(s.TEXTURE_CUBE_MAP,b);for(let re=0;re<6;re++)if(b.mipmaps&&b.mipmaps.length>0)for(let ye=0;ye<b.mipmaps.length;ye++)me(H.__webglFramebuffer[re][ye],D,b,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+re,ye);else me(H.__webglFramebuffer[re],D,b,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);m(b)&&p(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(be){for(let re=0,ye=J.length;re<ye;re++){const Me=J[re],ne=n.get(Me);let he=s.TEXTURE_2D;(D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(he=D.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(he,ne.__webglTexture),Le(he,Me),me(H.__webglFramebuffer,D,Me,s.COLOR_ATTACHMENT0+re,he,0),m(Me)&&p(he)}t.unbindTexture()}else{let re=s.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(re=D.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(re,j.__webglTexture),Le(re,b),b.mipmaps&&b.mipmaps.length>0)for(let ye=0;ye<b.mipmaps.length;ye++)me(H.__webglFramebuffer[ye],D,b,s.COLOR_ATTACHMENT0,re,ye);else me(H.__webglFramebuffer,D,b,s.COLOR_ATTACHMENT0,re,0);m(b)&&p(re),t.unbindTexture()}D.depthBuffer&&Ze(D)}function _t(D){const b=D.textures;for(let H=0,j=b.length;H<j;H++){const J=b[H];if(m(J)){const X=S(D),be=n.get(J).__webglTexture;t.bindTexture(X,be),p(X),t.unbindTexture()}}}const Be=[],Pe=[];function ve(D){if(D.samples>0){if(xe(D)===!1){const b=D.textures,H=D.width,j=D.height;let J=s.COLOR_BUFFER_BIT;const X=D.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,be=n.get(D),re=b.length>1;if(re)for(let Me=0;Me<b.length;Me++)t.bindFramebuffer(s.FRAMEBUFFER,be.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Me,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,be.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Me,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,be.__webglMultisampledFramebuffer);const ye=D.texture.mipmaps;ye&&ye.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,be.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,be.__webglFramebuffer);for(let Me=0;Me<b.length;Me++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(J|=s.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(J|=s.STENCIL_BUFFER_BIT)),re){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,be.__webglColorRenderbuffer[Me]);const ne=n.get(b[Me]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,ne,0)}s.blitFramebuffer(0,0,H,j,0,0,H,j,J,s.NEAREST),l===!0&&(Be.length=0,Pe.length=0,Be.push(s.COLOR_ATTACHMENT0+Me),D.depthBuffer&&D.resolveDepthBuffer===!1&&(Be.push(X),Pe.push(X),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,Pe)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Be))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),re)for(let Me=0;Me<b.length;Me++){t.bindFramebuffer(s.FRAMEBUFFER,be.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Me,s.RENDERBUFFER,be.__webglColorRenderbuffer[Me]);const ne=n.get(b[Me]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,be.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Me,s.TEXTURE_2D,ne,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,be.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&l){const b=D.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[b])}}}function vt(D){return Math.min(i.maxSamples,D.samples)}function xe(D){const b=n.get(D);return D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Ge(D){const b=o.render.frame;h.get(D)!==b&&(h.set(D,b),D.update())}function Ft(D,b){const H=D.colorSpace,j=D.format,J=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||H!==Kt&&H!==Ai&&(Je.getTransfer(H)===at?(j!==Sn||J!==Un)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),b}function Tt(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(c.width=D.naturalWidth||D.width,c.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(c.width=D.displayWidth,c.height=D.displayHeight):(c.width=D.width,c.height=D.height),c}this.allocateTextureUnit=U,this.resetTextureUnits=L,this.setTexture2D=B,this.setTexture2DArray=O,this.setTexture3D=K,this.setTextureCube=V,this.rebindTextures=Vt,this.setupRenderTarget=N,this.updateRenderTargetMipmap=_t,this.updateMultisampleRenderTarget=ve,this.setupDepthRenderbuffer=Ze,this.setupFrameBufferTexture=me,this.useMultisampledRTT=xe}function Gv(s,e){function t(n,i=Ai){let r;const o=Je.getTransfer(i);if(n===Un)return s.UNSIGNED_BYTE;if(n===Jl)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Ql)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Nu)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Uu)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===Lu)return s.BYTE;if(n===Iu)return s.SHORT;if(n===Tr)return s.UNSIGNED_SHORT;if(n===Zl)return s.INT;if(n===ts)return s.UNSIGNED_INT;if(n===Dn)return s.FLOAT;if(n===Xs)return s.HALF_FLOAT;if(n===Fu)return s.ALPHA;if(n===Ou)return s.RGB;if(n===Sn)return s.RGBA;if(n===Ar)return s.DEPTH_COMPONENT;if(n===Rr)return s.DEPTH_STENCIL;if(n===ec)return s.RED;if(n===tc)return s.RED_INTEGER;if(n===Bu)return s.RG;if(n===nc)return s.RG_INTEGER;if(n===ic)return s.RGBA_INTEGER;if(n===bo||n===Eo||n===To||n===wo)if(o===at)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===bo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Eo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===To)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===wo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===bo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Eo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===To)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===wo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===il||n===sl||n===rl||n===ol)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===il)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===sl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===rl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ol)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===al||n===ll||n===cl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===al||n===ll)return o===at?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===cl)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===hl||n===ul||n===dl||n===fl||n===pl||n===ml||n===gl||n===_l||n===vl||n===xl||n===yl||n===Ml||n===Sl||n===bl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===hl)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ul)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===dl)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===fl)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===pl)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ml)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===gl)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===_l)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===vl)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===xl)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===yl)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ml)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Sl)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===bl)return o===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===El||n===Tl||n===wl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===El)return o===at?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Tl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===wl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Al||n===Rl||n===Cl||n===Pl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Al)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Rl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Cl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Pl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===wr?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}const Wv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Xv=`
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

}`;class qv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new id(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new fi({vertexShader:Wv,fragmentShader:Xv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new $e(new Ni(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class jv extends rs{constructor(e,t){super();const n=this;let i=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null;const _=typeof XRWebGLBinding<"u",m=new qv,p={},S=t.getContextAttributes();let y=null,M=null;const R=[],P=[],w=new ue;let C=null;const v=new Wt;v.viewport=new et;const x=new Wt;x.viewport=new et;const A=[v,x],L=new sm;let U=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let Z=R[q];return Z===void 0&&(Z=new _a,R[q]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(q){let Z=R[q];return Z===void 0&&(Z=new _a,R[q]=Z),Z.getGripSpace()},this.getHand=function(q){let Z=R[q];return Z===void 0&&(Z=new _a,R[q]=Z),Z.getHandSpace()};function B(q){const Z=P.indexOf(q.inputSource);if(Z===-1)return;const me=R[Z];me!==void 0&&(me.update(q.inputSource,q.frame,c||o),me.dispatchEvent({type:q.type,data:q.inputSource}))}function O(){i.removeEventListener("select",B),i.removeEventListener("selectstart",B),i.removeEventListener("selectend",B),i.removeEventListener("squeeze",B),i.removeEventListener("squeezestart",B),i.removeEventListener("squeezeend",B),i.removeEventListener("end",O),i.removeEventListener("inputsourceschange",K);for(let q=0;q<R.length;q++){const Z=P[q];Z!==null&&(P[q]=null,R[q].disconnect(Z))}U=null,I=null,m.reset();for(const q in p)delete p[q];e.setRenderTarget(y),f=null,d=null,u=null,i=null,M=null,qe.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(w.width,w.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(q){if(i=q,i!==null){if(y=e.getRenderTarget(),i.addEventListener("select",B),i.addEventListener("selectstart",B),i.addEventListener("selectend",B),i.addEventListener("squeeze",B),i.addEventListener("squeezestart",B),i.addEventListener("squeezeend",B),i.addEventListener("end",O),i.addEventListener("inputsourceschange",K),S.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(w),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let me=null,Ie=null,Ee=null;S.depth&&(Ee=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,me=S.stencil?Rr:Ar,Ie=S.stencil?wr:ts);const Ze={colorFormat:t.RGBA8,depthFormat:Ee,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(Ze),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),M=new Ii(d.textureWidth,d.textureHeight,{format:Sn,type:Un,depthTexture:new nd(d.textureWidth,d.textureHeight,Ie,void 0,void 0,void 0,void 0,void 0,void 0,me),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const me={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,me),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new Ii(f.framebufferWidth,f.framebufferHeight,{format:Sn,type:Un,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),qe.setContext(i),qe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function K(q){for(let Z=0;Z<q.removed.length;Z++){const me=q.removed[Z],Ie=P.indexOf(me);Ie>=0&&(P[Ie]=null,R[Ie].disconnect(me))}for(let Z=0;Z<q.added.length;Z++){const me=q.added[Z];let Ie=P.indexOf(me);if(Ie===-1){for(let Ze=0;Ze<R.length;Ze++)if(Ze>=P.length){P.push(me),Ie=Ze;break}else if(P[Ze]===null){P[Ze]=me,Ie=Ze;break}if(Ie===-1)break}const Ee=R[Ie];Ee&&Ee.connect(me)}}const V=new E,$=new E;function se(q,Z,me){V.setFromMatrixPosition(Z.matrixWorld),$.setFromMatrixPosition(me.matrixWorld);const Ie=V.distanceTo($),Ee=Z.projectionMatrix.elements,Ze=me.projectionMatrix.elements,Vt=Ee[14]/(Ee[10]-1),N=Ee[14]/(Ee[10]+1),_t=(Ee[9]+1)/Ee[5],Be=(Ee[9]-1)/Ee[5],Pe=(Ee[8]-1)/Ee[0],ve=(Ze[8]+1)/Ze[0],vt=Vt*Pe,xe=Vt*ve,Ge=Ie/(-Pe+ve),Ft=Ge*-Pe;if(Z.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Ft),q.translateZ(Ge),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),Ee[10]===-1)q.projectionMatrix.copy(Z.projectionMatrix),q.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{const Tt=Vt+Ge,D=N+Ge,b=vt-Ft,H=xe+(Ie-Ft),j=_t*N/D*Tt,J=Be*N/D*Tt;q.projectionMatrix.makePerspective(b,H,j,J,Tt,D),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function de(q,Z){Z===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(Z.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(i===null)return;let Z=q.near,me=q.far;m.texture!==null&&(m.depthNear>0&&(Z=m.depthNear),m.depthFar>0&&(me=m.depthFar)),L.near=x.near=v.near=Z,L.far=x.far=v.far=me,(U!==L.near||I!==L.far)&&(i.updateRenderState({depthNear:L.near,depthFar:L.far}),U=L.near,I=L.far),L.layers.mask=q.layers.mask|6,v.layers.mask=L.layers.mask&3,x.layers.mask=L.layers.mask&5;const Ie=q.parent,Ee=L.cameras;de(L,Ie);for(let Ze=0;Ze<Ee.length;Ze++)de(Ee[Ze],Ie);Ee.length===2?se(L,v,x):L.projectionMatrix.copy(v.projectionMatrix),Le(q,L,Ie)};function Le(q,Z,me){me===null?q.matrix.copy(Z.matrixWorld):(q.matrix.copy(me.matrixWorld),q.matrix.invert(),q.matrix.multiply(Z.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(Z.projectionMatrix),q.projectionMatrixInverse.copy(Z.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=zs*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(q){l=q,d!==null&&(d.fixedFoveation=q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=q)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(L)},this.getCameraTexture=function(q){return p[q]};let Qe=null;function tt(q,Z){if(h=Z.getViewerPose(c||o),g=Z,h!==null){const me=h.views;f!==null&&(e.setRenderTargetFramebuffer(M,f.framebuffer),e.setRenderTarget(M));let Ie=!1;me.length!==L.cameras.length&&(L.cameras.length=0,Ie=!0);for(let N=0;N<me.length;N++){const _t=me[N];let Be=null;if(f!==null)Be=f.getViewport(_t);else{const ve=u.getViewSubImage(d,_t);Be=ve.viewport,N===0&&(e.setRenderTargetTextures(M,ve.colorTexture,ve.depthStencilTexture),e.setRenderTarget(M))}let Pe=A[N];Pe===void 0&&(Pe=new Wt,Pe.layers.enable(N),Pe.viewport=new et,A[N]=Pe),Pe.matrix.fromArray(_t.transform.matrix),Pe.matrix.decompose(Pe.position,Pe.quaternion,Pe.scale),Pe.projectionMatrix.fromArray(_t.projectionMatrix),Pe.projectionMatrixInverse.copy(Pe.projectionMatrix).invert(),Pe.viewport.set(Be.x,Be.y,Be.width,Be.height),N===0&&(L.matrix.copy(Pe.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),Ie===!0&&L.cameras.push(Pe)}const Ee=i.enabledFeatures;if(Ee&&Ee.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){u=n.getBinding();const N=u.getDepthInformation(me[0]);N&&N.isValid&&N.texture&&m.init(N,i.renderState)}if(Ee&&Ee.includes("camera-access")&&_){e.state.unbindTexture(),u=n.getBinding();for(let N=0;N<me.length;N++){const _t=me[N].camera;if(_t){let Be=p[_t];Be||(Be=new id,p[_t]=Be);const Pe=u.getCameraImage(_t);Be.sourceTexture=Pe}}}}for(let me=0;me<R.length;me++){const Ie=P[me],Ee=R[me];Ie!==null&&Ee!==void 0&&Ee.update(Ie,Z,c||o)}Qe&&Qe(q,Z),Z.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Z}),g=null}const qe=new dd;qe.setAnimationLoop(tt),this.setAnimationLoop=function(q){Qe=q},this.dispose=function(){}}}const Wi=new En,Kv=new Ue;function Yv(s,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,ju(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,S,y,M){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,M)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,S,y):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===jt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===jt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const S=e.get(p),y=S.envMap,M=S.envMapRotation;y&&(m.envMap.value=y,Wi.copy(M),Wi.x*=-1,Wi.y*=-1,Wi.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Wi.y*=-1,Wi.z*=-1),m.envMapRotation.value.setFromMatrix4(Kv.makeRotationFromEuler(Wi)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,S,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*S,m.scale.value=y*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,S){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===jt&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const S=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function $v(s,e,t,n){let i={},r={},o=[];const a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,y){const M=y.program;n.uniformBlockBinding(S,M)}function c(S,y){let M=i[S.id];M===void 0&&(g(S),M=h(S),i[S.id]=M,S.addEventListener("dispose",m));const R=y.program;n.updateUBOMapping(S,R);const P=e.render.frame;r[S.id]!==P&&(d(S),r[S.id]=P)}function h(S){const y=u();S.__bindingPointIndex=y;const M=s.createBuffer(),R=S.__size,P=S.usage;return s.bindBuffer(s.UNIFORM_BUFFER,M),s.bufferData(s.UNIFORM_BUFFER,R,P),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,y,M),M}function u(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(S){const y=i[S.id],M=S.uniforms,R=S.__cache;s.bindBuffer(s.UNIFORM_BUFFER,y);for(let P=0,w=M.length;P<w;P++){const C=Array.isArray(M[P])?M[P]:[M[P]];for(let v=0,x=C.length;v<x;v++){const A=C[v];if(f(A,P,v,R)===!0){const L=A.__offset,U=Array.isArray(A.value)?A.value:[A.value];let I=0;for(let B=0;B<U.length;B++){const O=U[B],K=_(O);typeof O=="number"||typeof O=="boolean"?(A.__data[0]=O,s.bufferSubData(s.UNIFORM_BUFFER,L+I,A.__data)):O.isMatrix3?(A.__data[0]=O.elements[0],A.__data[1]=O.elements[1],A.__data[2]=O.elements[2],A.__data[3]=0,A.__data[4]=O.elements[3],A.__data[5]=O.elements[4],A.__data[6]=O.elements[5],A.__data[7]=0,A.__data[8]=O.elements[6],A.__data[9]=O.elements[7],A.__data[10]=O.elements[8],A.__data[11]=0):(O.toArray(A.__data,I),I+=K.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,L,A.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(S,y,M,R){const P=S.value,w=y+"_"+M;if(R[w]===void 0)return typeof P=="number"||typeof P=="boolean"?R[w]=P:R[w]=P.clone(),!0;{const C=R[w];if(typeof P=="number"||typeof P=="boolean"){if(C!==P)return R[w]=P,!0}else if(C.equals(P)===!1)return C.copy(P),!0}return!1}function g(S){const y=S.uniforms;let M=0;const R=16;for(let w=0,C=y.length;w<C;w++){const v=Array.isArray(y[w])?y[w]:[y[w]];for(let x=0,A=v.length;x<A;x++){const L=v[x],U=Array.isArray(L.value)?L.value:[L.value];for(let I=0,B=U.length;I<B;I++){const O=U[I],K=_(O),V=M%R,$=V%K.boundary,se=V+$;M+=$,se!==0&&R-se<K.storage&&(M+=R-se),L.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=M,M+=K.storage}}}const P=M%R;return P>0&&(M+=R-P),S.__size=M,S.__cache={},this}function _(S){const y={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(y.boundary=4,y.storage=4):S.isVector2?(y.boundary=8,y.storage=8):S.isVector3||S.isColor?(y.boundary=16,y.storage=12):S.isVector4?(y.boundary=16,y.storage=16):S.isMatrix3?(y.boundary=48,y.storage=48):S.isMatrix4?(y.boundary=64,y.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),y}function m(S){const y=S.target;y.removeEventListener("dispose",m);const M=o.indexOf(y.__bindingPointIndex);o.splice(M,1),s.deleteBuffer(i[y.id]),delete i[y.id],delete r[y.id]}function p(){for(const S in i)s.deleteBuffer(i[S]);o=[],i={},r={}}return{bind:l,update:c,dispose:p}}class Zv{constructor(e={}){const{canvas:t=zf(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const S=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Di,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const M=this;let R=!1;this._outputColorSpace=Ct;let P=0,w=0,C=null,v=-1,x=null;const A=new et,L=new et;let U=null;const I=new Re(0);let B=0,O=t.width,K=t.height,V=1,$=null,se=null;const de=new et(0,0,O,K),Le=new et(0,0,O,K);let Qe=!1;const tt=new cc;let qe=!1,q=!1;const Z=new Ue,me=new E,Ie=new et,Ee={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ze=!1;function Vt(){return C===null?V:1}let N=n;function _t(T,z){return t.getContext(T,z)}try{const T={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Yl}`),t.addEventListener("webglcontextlost",oe,!1),t.addEventListener("webglcontextrestored",pe,!1),t.addEventListener("webglcontextcreationerror",Q,!1),N===null){const z="webgl2";if(N=_t(z,T),N===null)throw _t(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Be,Pe,ve,vt,xe,Ge,Ft,Tt,D,b,H,j,J,X,be,re,ye,Me,ne,he,Ce,Se,le,ke;function F(){Be=new a0(N),Be.init(),Se=new Gv(N,Be),Pe=new e0(N,Be,e,Se),ve=new Vv(N,Be),Pe.reversedDepthBuffer&&d&&ve.buffers.depth.setReversed(!0),vt=new h0(N),xe=new Rv,Ge=new Hv(N,Be,ve,xe,Pe,Se,vt),Ft=new n0(M),Tt=new o0(M),D=new gm(N),le=new J_(N,D),b=new l0(N,D,vt,le),H=new d0(N,b,D,vt),ne=new u0(N,Pe,Ge),re=new t0(xe),j=new Av(M,Ft,Tt,Be,Pe,le,re),J=new Yv(M,xe),X=new Pv,be=new Fv(Be),Me=new Z_(M,Ft,Tt,ve,H,f,l),ye=new zv(M,H,Pe),ke=new $v(N,vt,Pe,ve),he=new Q_(N,Be,vt),Ce=new c0(N,Be,vt),vt.programs=j.programs,M.capabilities=Pe,M.extensions=Be,M.properties=xe,M.renderLists=X,M.shadowMap=ye,M.state=ve,M.info=vt}F();const ie=new jv(M,N);this.xr=ie,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const T=Be.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Be.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(T){T!==void 0&&(V=T,this.setSize(O,K,!1))},this.getSize=function(T){return T.set(O,K)},this.setSize=function(T,z,G=!0){if(ie.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}O=T,K=z,t.width=Math.floor(T*V),t.height=Math.floor(z*V),G===!0&&(t.style.width=T+"px",t.style.height=z+"px"),this.setViewport(0,0,T,z)},this.getDrawingBufferSize=function(T){return T.set(O*V,K*V).floor()},this.setDrawingBufferSize=function(T,z,G){O=T,K=z,V=G,t.width=Math.floor(T*G),t.height=Math.floor(z*G),this.setViewport(0,0,T,z)},this.getCurrentViewport=function(T){return T.copy(A)},this.getViewport=function(T){return T.copy(de)},this.setViewport=function(T,z,G,W){T.isVector4?de.set(T.x,T.y,T.z,T.w):de.set(T,z,G,W),ve.viewport(A.copy(de).multiplyScalar(V).round())},this.getScissor=function(T){return T.copy(Le)},this.setScissor=function(T,z,G,W){T.isVector4?Le.set(T.x,T.y,T.z,T.w):Le.set(T,z,G,W),ve.scissor(L.copy(Le).multiplyScalar(V).round())},this.getScissorTest=function(){return Qe},this.setScissorTest=function(T){ve.setScissorTest(Qe=T)},this.setOpaqueSort=function(T){$=T},this.setTransparentSort=function(T){se=T},this.getClearColor=function(T){return T.copy(Me.getClearColor())},this.setClearColor=function(){Me.setClearColor(...arguments)},this.getClearAlpha=function(){return Me.getClearAlpha()},this.setClearAlpha=function(){Me.setClearAlpha(...arguments)},this.clear=function(T=!0,z=!0,G=!0){let W=0;if(T){let k=!1;if(C!==null){const ee=C.texture.format;k=ee===ic||ee===nc||ee===tc}if(k){const ee=C.texture.type,ce=ee===Un||ee===ts||ee===Tr||ee===wr||ee===Jl||ee===Ql,ge=Me.getClearColor(),fe=Me.getClearAlpha(),Ae=ge.r,De=ge.g,Te=ge.b;ce?(g[0]=Ae,g[1]=De,g[2]=Te,g[3]=fe,N.clearBufferuiv(N.COLOR,0,g)):(_[0]=Ae,_[1]=De,_[2]=Te,_[3]=fe,N.clearBufferiv(N.COLOR,0,_))}else W|=N.COLOR_BUFFER_BIT}z&&(W|=N.DEPTH_BUFFER_BIT),G&&(W|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",oe,!1),t.removeEventListener("webglcontextrestored",pe,!1),t.removeEventListener("webglcontextcreationerror",Q,!1),Me.dispose(),X.dispose(),be.dispose(),xe.dispose(),Ft.dispose(),Tt.dispose(),H.dispose(),le.dispose(),ke.dispose(),j.dispose(),ie.dispose(),ie.removeEventListener("sessionstart",On),ie.removeEventListener("sessionend",Tc),Oi.stop()};function oe(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function pe(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;const T=vt.autoReset,z=ye.enabled,G=ye.autoUpdate,W=ye.needsUpdate,k=ye.type;F(),vt.autoReset=T,ye.enabled=z,ye.autoUpdate=G,ye.needsUpdate=W,ye.type=k}function Q(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Y(T){const z=T.target;z.removeEventListener("dispose",Y),_e(z)}function _e(T){Oe(T),xe.remove(T)}function Oe(T){const z=xe.get(T).programs;z!==void 0&&(z.forEach(function(G){j.releaseProgram(G)}),T.isShaderMaterial&&j.releaseShaderCache(T))}this.renderBufferDirect=function(T,z,G,W,k,ee){z===null&&(z=Ee);const ce=k.isMesh&&k.matrixWorld.determinant()<0,ge=Cd(T,z,G,W,k);ve.setMaterial(W,ce);let fe=G.index,Ae=1;if(W.wireframe===!0){if(fe=b.getWireframeAttribute(G),fe===void 0)return;Ae=2}const De=G.drawRange,Te=G.attributes.position;let Ke=De.start*Ae,ot=(De.start+De.count)*Ae;ee!==null&&(Ke=Math.max(Ke,ee.start*Ae),ot=Math.min(ot,(ee.start+ee.count)*Ae)),fe!==null?(Ke=Math.max(Ke,0),ot=Math.min(ot,fe.count)):Te!=null&&(Ke=Math.max(Ke,0),ot=Math.min(ot,Te.count));const St=ot-Ke;if(St<0||St===1/0)return;le.setup(k,W,ge,G,fe);let mt,ut=he;if(fe!==null&&(mt=D.get(fe),ut=Ce,ut.setIndex(mt)),k.isMesh)W.wireframe===!0?(ve.setLineWidth(W.wireframeLinewidth*Vt()),ut.setMode(N.LINES)):ut.setMode(N.TRIANGLES);else if(k.isLine){let we=W.linewidth;we===void 0&&(we=1),ve.setLineWidth(we*Vt()),k.isLineSegments?ut.setMode(N.LINES):k.isLineLoop?ut.setMode(N.LINE_LOOP):ut.setMode(N.LINE_STRIP)}else k.isPoints?ut.setMode(N.POINTS):k.isSprite&&ut.setMode(N.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)Lr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ut.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(Be.get("WEBGL_multi_draw"))ut.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const we=k._multiDrawStarts,yt=k._multiDrawCounts,nt=k._multiDrawCount,on=fe?D.get(fe).bytesPerElement:1,os=xe.get(W).currentProgram.getUniforms();for(let an=0;an<nt;an++)os.setValue(N,"_gl_DrawID",an),ut.render(we[an]/on,yt[an])}else if(k.isInstancedMesh)ut.renderInstances(Ke,St,k.count);else if(G.isInstancedBufferGeometry){const we=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,yt=Math.min(G.instanceCount,we);ut.renderInstances(Ke,St,yt)}else ut.render(Ke,St)};function ft(T,z,G){T.transparent===!0&&T.side===un&&T.forceSinglePass===!1?(T.side=jt,T.needsUpdate=!0,kr(T,z,G),T.side=di,T.needsUpdate=!0,kr(T,z,G),T.side=un):kr(T,z,G)}this.compile=function(T,z,G=null){G===null&&(G=T),p=be.get(G),p.init(z),y.push(p),G.traverseVisible(function(k){k.isLight&&k.layers.test(z.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),T!==G&&T.traverseVisible(function(k){k.isLight&&k.layers.test(z.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),p.setupLights();const W=new Set;return T.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const ee=k.material;if(ee)if(Array.isArray(ee))for(let ce=0;ce<ee.length;ce++){const ge=ee[ce];ft(ge,G,k),W.add(ge)}else ft(ee,G,k),W.add(ee)}),p=y.pop(),W},this.compileAsync=function(T,z,G=null){const W=this.compile(T,z,G);return new Promise(k=>{function ee(){if(W.forEach(function(ce){xe.get(ce).currentProgram.isReady()&&W.delete(ce)}),W.size===0){k(T);return}setTimeout(ee,10)}Be.get("KHR_parallel_shader_compile")!==null?ee():setTimeout(ee,10)})};let it=null;function Yn(T){it&&it(T)}function On(){Oi.stop()}function Tc(){Oi.start()}const Oi=new dd;Oi.setAnimationLoop(Yn),typeof self<"u"&&Oi.setContext(self),this.setAnimationLoop=function(T){it=T,ie.setAnimationLoop(T),T===null?Oi.stop():Oi.start()},ie.addEventListener("sessionstart",On),ie.addEventListener("sessionend",Tc),this.render=function(T,z){if(z!==void 0&&z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),ie.enabled===!0&&ie.isPresenting===!0&&(ie.cameraAutoUpdate===!0&&ie.updateCamera(z),z=ie.getCamera()),T.isScene===!0&&T.onBeforeRender(M,T,z,C),p=be.get(T,y.length),p.init(z),y.push(p),Z.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),tt.setFromProjectionMatrix(Z,Wn,z.reversedDepth),q=this.localClippingEnabled,qe=re.init(this.clippingPlanes,q),m=X.get(T,S.length),m.init(),S.push(m),ie.enabled===!0&&ie.isPresenting===!0){const ee=M.xr.getDepthSensingMesh();ee!==null&&Ko(ee,z,-1/0,M.sortObjects)}Ko(T,z,0,M.sortObjects),m.finish(),M.sortObjects===!0&&m.sort($,se),Ze=ie.enabled===!1||ie.isPresenting===!1||ie.hasDepthSensing()===!1,Ze&&Me.addToRenderList(m,T),this.info.render.frame++,qe===!0&&re.beginShadows();const G=p.state.shadowsArray;ye.render(G,T,z),qe===!0&&re.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=m.opaque,k=m.transmissive;if(p.setupLights(),z.isArrayCamera){const ee=z.cameras;if(k.length>0)for(let ce=0,ge=ee.length;ce<ge;ce++){const fe=ee[ce];Ac(W,k,T,fe)}Ze&&Me.render(T);for(let ce=0,ge=ee.length;ce<ge;ce++){const fe=ee[ce];wc(m,T,fe,fe.viewport)}}else k.length>0&&Ac(W,k,T,z),Ze&&Me.render(T),wc(m,T,z);C!==null&&w===0&&(Ge.updateMultisampleRenderTarget(C),Ge.updateRenderTargetMipmap(C)),T.isScene===!0&&T.onAfterRender(M,T,z),le.resetDefaultState(),v=-1,x=null,y.pop(),y.length>0?(p=y[y.length-1],qe===!0&&re.setGlobalState(M.clippingPlanes,p.state.camera)):p=null,S.pop(),S.length>0?m=S[S.length-1]:m=null};function Ko(T,z,G,W){if(T.visible===!1)return;if(T.layers.test(z.layers)){if(T.isGroup)G=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(z);else if(T.isLight)p.pushLight(T),T.castShadow&&p.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||tt.intersectsSprite(T)){W&&Ie.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Z);const ce=H.update(T),ge=T.material;ge.visible&&m.push(T,ce,ge,G,Ie.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||tt.intersectsObject(T))){const ce=H.update(T),ge=T.material;if(W&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Ie.copy(T.boundingSphere.center)):(ce.boundingSphere===null&&ce.computeBoundingSphere(),Ie.copy(ce.boundingSphere.center)),Ie.applyMatrix4(T.matrixWorld).applyMatrix4(Z)),Array.isArray(ge)){const fe=ce.groups;for(let Ae=0,De=fe.length;Ae<De;Ae++){const Te=fe[Ae],Ke=ge[Te.materialIndex];Ke&&Ke.visible&&m.push(T,ce,Ke,G,Ie.z,Te)}}else ge.visible&&m.push(T,ce,ge,G,Ie.z,null)}}const ee=T.children;for(let ce=0,ge=ee.length;ce<ge;ce++)Ko(ee[ce],z,G,W)}function wc(T,z,G,W){const k=T.opaque,ee=T.transmissive,ce=T.transparent;p.setupLightsView(G),qe===!0&&re.setGlobalState(M.clippingPlanes,G),W&&ve.viewport(A.copy(W)),k.length>0&&zr(k,z,G),ee.length>0&&zr(ee,z,G),ce.length>0&&zr(ce,z,G),ve.buffers.depth.setTest(!0),ve.buffers.depth.setMask(!0),ve.buffers.color.setMask(!0),ve.setPolygonOffset(!1)}function Ac(T,z,G,W){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[W.id]===void 0&&(p.state.transmissionRenderTarget[W.id]=new Ii(1,1,{generateMipmaps:!0,type:Be.has("EXT_color_buffer_half_float")||Be.has("EXT_color_buffer_float")?Xs:Un,minFilter:ai,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Je.workingColorSpace}));const ee=p.state.transmissionRenderTarget[W.id],ce=W.viewport||A;ee.setSize(ce.z*M.transmissionResolutionScale,ce.w*M.transmissionResolutionScale);const ge=M.getRenderTarget(),fe=M.getActiveCubeFace(),Ae=M.getActiveMipmapLevel();M.setRenderTarget(ee),M.getClearColor(I),B=M.getClearAlpha(),B<1&&M.setClearColor(16777215,.5),M.clear(),Ze&&Me.render(G);const De=M.toneMapping;M.toneMapping=Di;const Te=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),p.setupLightsView(W),qe===!0&&re.setGlobalState(M.clippingPlanes,W),zr(T,G,W),Ge.updateMultisampleRenderTarget(ee),Ge.updateRenderTargetMipmap(ee),Be.has("WEBGL_multisampled_render_to_texture")===!1){let Ke=!1;for(let ot=0,St=z.length;ot<St;ot++){const mt=z[ot],ut=mt.object,we=mt.geometry,yt=mt.material,nt=mt.group;if(yt.side===un&&ut.layers.test(W.layers)){const on=yt.side;yt.side=jt,yt.needsUpdate=!0,Rc(ut,G,W,we,yt,nt),yt.side=on,yt.needsUpdate=!0,Ke=!0}}Ke===!0&&(Ge.updateMultisampleRenderTarget(ee),Ge.updateRenderTargetMipmap(ee))}M.setRenderTarget(ge,fe,Ae),M.setClearColor(I,B),Te!==void 0&&(W.viewport=Te),M.toneMapping=De}function zr(T,z,G){const W=z.isScene===!0?z.overrideMaterial:null;for(let k=0,ee=T.length;k<ee;k++){const ce=T[k],ge=ce.object,fe=ce.geometry,Ae=ce.group;let De=ce.material;De.allowOverride===!0&&W!==null&&(De=W),ge.layers.test(G.layers)&&Rc(ge,z,G,fe,De,Ae)}}function Rc(T,z,G,W,k,ee){T.onBeforeRender(M,z,G,W,k,ee),T.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),k.onBeforeRender(M,z,G,W,T,ee),k.transparent===!0&&k.side===un&&k.forceSinglePass===!1?(k.side=jt,k.needsUpdate=!0,M.renderBufferDirect(G,z,W,k,T,ee),k.side=di,k.needsUpdate=!0,M.renderBufferDirect(G,z,W,k,T,ee),k.side=un):M.renderBufferDirect(G,z,W,k,T,ee),T.onAfterRender(M,z,G,W,k,ee)}function kr(T,z,G){z.isScene!==!0&&(z=Ee);const W=xe.get(T),k=p.state.lights,ee=p.state.shadowsArray,ce=k.state.version,ge=j.getParameters(T,k.state,ee,z,G),fe=j.getProgramCacheKey(ge);let Ae=W.programs;W.environment=T.isMeshStandardMaterial?z.environment:null,W.fog=z.fog,W.envMap=(T.isMeshStandardMaterial?Tt:Ft).get(T.envMap||W.environment),W.envMapRotation=W.environment!==null&&T.envMap===null?z.environmentRotation:T.envMapRotation,Ae===void 0&&(T.addEventListener("dispose",Y),Ae=new Map,W.programs=Ae);let De=Ae.get(fe);if(De!==void 0){if(W.currentProgram===De&&W.lightsStateVersion===ce)return Pc(T,ge),De}else ge.uniforms=j.getUniforms(T),T.onBeforeCompile(ge,M),De=j.acquireProgram(ge,fe),Ae.set(fe,De),W.uniforms=ge.uniforms;const Te=W.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Te.clippingPlanes=re.uniform),Pc(T,ge),W.needsLights=Dd(T),W.lightsStateVersion=ce,W.needsLights&&(Te.ambientLightColor.value=k.state.ambient,Te.lightProbe.value=k.state.probe,Te.directionalLights.value=k.state.directional,Te.directionalLightShadows.value=k.state.directionalShadow,Te.spotLights.value=k.state.spot,Te.spotLightShadows.value=k.state.spotShadow,Te.rectAreaLights.value=k.state.rectArea,Te.ltc_1.value=k.state.rectAreaLTC1,Te.ltc_2.value=k.state.rectAreaLTC2,Te.pointLights.value=k.state.point,Te.pointLightShadows.value=k.state.pointShadow,Te.hemisphereLights.value=k.state.hemi,Te.directionalShadowMap.value=k.state.directionalShadowMap,Te.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Te.spotShadowMap.value=k.state.spotShadowMap,Te.spotLightMatrix.value=k.state.spotLightMatrix,Te.spotLightMap.value=k.state.spotLightMap,Te.pointShadowMap.value=k.state.pointShadowMap,Te.pointShadowMatrix.value=k.state.pointShadowMatrix),W.currentProgram=De,W.uniformsList=null,De}function Cc(T){if(T.uniformsList===null){const z=T.currentProgram.getUniforms();T.uniformsList=Ao.seqWithValue(z.seq,T.uniforms)}return T.uniformsList}function Pc(T,z){const G=xe.get(T);G.outputColorSpace=z.outputColorSpace,G.batching=z.batching,G.batchingColor=z.batchingColor,G.instancing=z.instancing,G.instancingColor=z.instancingColor,G.instancingMorph=z.instancingMorph,G.skinning=z.skinning,G.morphTargets=z.morphTargets,G.morphNormals=z.morphNormals,G.morphColors=z.morphColors,G.morphTargetsCount=z.morphTargetsCount,G.numClippingPlanes=z.numClippingPlanes,G.numIntersection=z.numClipIntersection,G.vertexAlphas=z.vertexAlphas,G.vertexTangents=z.vertexTangents,G.toneMapping=z.toneMapping}function Cd(T,z,G,W,k){z.isScene!==!0&&(z=Ee),Ge.resetTextureUnits();const ee=z.fog,ce=W.isMeshStandardMaterial?z.environment:null,ge=C===null?M.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:Kt,fe=(W.isMeshStandardMaterial?Tt:Ft).get(W.envMap||ce),Ae=W.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,De=!!G.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Te=!!G.morphAttributes.position,Ke=!!G.morphAttributes.normal,ot=!!G.morphAttributes.color;let St=Di;W.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(St=M.toneMapping);const mt=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,ut=mt!==void 0?mt.length:0,we=xe.get(W),yt=p.state.lights;if(qe===!0&&(q===!0||T!==x)){const Yt=T===x&&W.id===v;re.setState(W,T,Yt)}let nt=!1;W.version===we.__version?(we.needsLights&&we.lightsStateVersion!==yt.state.version||we.outputColorSpace!==ge||k.isBatchedMesh&&we.batching===!1||!k.isBatchedMesh&&we.batching===!0||k.isBatchedMesh&&we.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&we.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&we.instancing===!1||!k.isInstancedMesh&&we.instancing===!0||k.isSkinnedMesh&&we.skinning===!1||!k.isSkinnedMesh&&we.skinning===!0||k.isInstancedMesh&&we.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&we.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&we.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&we.instancingMorph===!1&&k.morphTexture!==null||we.envMap!==fe||W.fog===!0&&we.fog!==ee||we.numClippingPlanes!==void 0&&(we.numClippingPlanes!==re.numPlanes||we.numIntersection!==re.numIntersection)||we.vertexAlphas!==Ae||we.vertexTangents!==De||we.morphTargets!==Te||we.morphNormals!==Ke||we.morphColors!==ot||we.toneMapping!==St||we.morphTargetsCount!==ut)&&(nt=!0):(nt=!0,we.__version=W.version);let on=we.currentProgram;nt===!0&&(on=kr(W,z,k));let os=!1,an=!1,$s=!1;const Mt=on.getUniforms(),pn=we.uniforms;if(ve.useProgram(on.program)&&(os=!0,an=!0,$s=!0),W.id!==v&&(v=W.id,an=!0),os||x!==T){ve.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),Mt.setValue(N,"projectionMatrix",T.projectionMatrix),Mt.setValue(N,"viewMatrix",T.matrixWorldInverse);const nn=Mt.map.cameraPosition;nn!==void 0&&nn.setValue(N,me.setFromMatrixPosition(T.matrixWorld)),Pe.logarithmicDepthBuffer&&Mt.setValue(N,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&Mt.setValue(N,"isOrthographic",T.isOrthographicCamera===!0),x!==T&&(x=T,an=!0,$s=!0)}if(k.isSkinnedMesh){Mt.setOptional(N,k,"bindMatrix"),Mt.setOptional(N,k,"bindMatrixInverse");const Yt=k.skeleton;Yt&&(Yt.boneTexture===null&&Yt.computeBoneTexture(),Mt.setValue(N,"boneTexture",Yt.boneTexture,Ge))}k.isBatchedMesh&&(Mt.setOptional(N,k,"batchingTexture"),Mt.setValue(N,"batchingTexture",k._matricesTexture,Ge),Mt.setOptional(N,k,"batchingIdTexture"),Mt.setValue(N,"batchingIdTexture",k._indirectTexture,Ge),Mt.setOptional(N,k,"batchingColorTexture"),k._colorsTexture!==null&&Mt.setValue(N,"batchingColorTexture",k._colorsTexture,Ge));const mn=G.morphAttributes;if((mn.position!==void 0||mn.normal!==void 0||mn.color!==void 0)&&ne.update(k,G,on),(an||we.receiveShadow!==k.receiveShadow)&&(we.receiveShadow=k.receiveShadow,Mt.setValue(N,"receiveShadow",k.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(pn.envMap.value=fe,pn.flipEnvMap.value=fe.isCubeTexture&&fe.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&z.environment!==null&&(pn.envMapIntensity.value=z.environmentIntensity),an&&(Mt.setValue(N,"toneMappingExposure",M.toneMappingExposure),we.needsLights&&Pd(pn,$s),ee&&W.fog===!0&&J.refreshFogUniforms(pn,ee),J.refreshMaterialUniforms(pn,W,V,K,p.state.transmissionRenderTarget[T.id]),Ao.upload(N,Cc(we),pn,Ge)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Ao.upload(N,Cc(we),pn,Ge),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&Mt.setValue(N,"center",k.center),Mt.setValue(N,"modelViewMatrix",k.modelViewMatrix),Mt.setValue(N,"normalMatrix",k.normalMatrix),Mt.setValue(N,"modelMatrix",k.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const Yt=W.uniformsGroups;for(let nn=0,Yo=Yt.length;nn<Yo;nn++){const Bi=Yt[nn];ke.update(Bi,on),ke.bind(Bi,on)}}return on}function Pd(T,z){T.ambientLightColor.needsUpdate=z,T.lightProbe.needsUpdate=z,T.directionalLights.needsUpdate=z,T.directionalLightShadows.needsUpdate=z,T.pointLights.needsUpdate=z,T.pointLightShadows.needsUpdate=z,T.spotLights.needsUpdate=z,T.spotLightShadows.needsUpdate=z,T.rectAreaLights.needsUpdate=z,T.hemisphereLights.needsUpdate=z}function Dd(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(T,z,G){const W=xe.get(T);W.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),xe.get(T.texture).__webglTexture=z,xe.get(T.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:G,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,z){const G=xe.get(T);G.__webglFramebuffer=z,G.__useDefaultFramebuffer=z===void 0};const Ld=N.createFramebuffer();this.setRenderTarget=function(T,z=0,G=0){C=T,P=z,w=G;let W=!0,k=null,ee=!1,ce=!1;if(T){const fe=xe.get(T);if(fe.__useDefaultFramebuffer!==void 0)ve.bindFramebuffer(N.FRAMEBUFFER,null),W=!1;else if(fe.__webglFramebuffer===void 0)Ge.setupRenderTarget(T);else if(fe.__hasExternalTextures)Ge.rebindTextures(T,xe.get(T.texture).__webglTexture,xe.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Te=T.depthTexture;if(fe.__boundDepthTexture!==Te){if(Te!==null&&xe.has(Te)&&(T.width!==Te.image.width||T.height!==Te.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ge.setupDepthRenderbuffer(T)}}const Ae=T.texture;(Ae.isData3DTexture||Ae.isDataArrayTexture||Ae.isCompressedArrayTexture)&&(ce=!0);const De=xe.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(De[z])?k=De[z][G]:k=De[z],ee=!0):T.samples>0&&Ge.useMultisampledRTT(T)===!1?k=xe.get(T).__webglMultisampledFramebuffer:Array.isArray(De)?k=De[G]:k=De,A.copy(T.viewport),L.copy(T.scissor),U=T.scissorTest}else A.copy(de).multiplyScalar(V).floor(),L.copy(Le).multiplyScalar(V).floor(),U=Qe;if(G!==0&&(k=Ld),ve.bindFramebuffer(N.FRAMEBUFFER,k)&&W&&ve.drawBuffers(T,k),ve.viewport(A),ve.scissor(L),ve.setScissorTest(U),ee){const fe=xe.get(T.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+z,fe.__webglTexture,G)}else if(ce){const fe=z;for(let Ae=0;Ae<T.textures.length;Ae++){const De=xe.get(T.textures[Ae]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Ae,De.__webglTexture,G,fe)}}else if(T!==null&&G!==0){const fe=xe.get(T.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,fe.__webglTexture,G)}v=-1},this.readRenderTargetPixels=function(T,z,G,W,k,ee,ce,ge=0){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let fe=xe.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ce!==void 0&&(fe=fe[ce]),fe){ve.bindFramebuffer(N.FRAMEBUFFER,fe);try{const Ae=T.textures[ge],De=Ae.format,Te=Ae.type;if(!Pe.textureFormatReadable(De)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Pe.textureTypeReadable(Te)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=T.width-W&&G>=0&&G<=T.height-k&&(T.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+ge),N.readPixels(z,G,W,k,Se.convert(De),Se.convert(Te),ee))}finally{const Ae=C!==null?xe.get(C).__webglFramebuffer:null;ve.bindFramebuffer(N.FRAMEBUFFER,Ae)}}},this.readRenderTargetPixelsAsync=async function(T,z,G,W,k,ee,ce,ge=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let fe=xe.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ce!==void 0&&(fe=fe[ce]),fe)if(z>=0&&z<=T.width-W&&G>=0&&G<=T.height-k){ve.bindFramebuffer(N.FRAMEBUFFER,fe);const Ae=T.textures[ge],De=Ae.format,Te=Ae.type;if(!Pe.textureFormatReadable(De))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Pe.textureTypeReadable(Te))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ke=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Ke),N.bufferData(N.PIXEL_PACK_BUFFER,ee.byteLength,N.STREAM_READ),T.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+ge),N.readPixels(z,G,W,k,Se.convert(De),Se.convert(Te),0);const ot=C!==null?xe.get(C).__webglFramebuffer:null;ve.bindFramebuffer(N.FRAMEBUFFER,ot);const St=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await kf(N,St,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Ke),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,ee),N.deleteBuffer(Ke),N.deleteSync(St),ee}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,z=null,G=0){const W=Math.pow(2,-G),k=Math.floor(T.image.width*W),ee=Math.floor(T.image.height*W),ce=z!==null?z.x:0,ge=z!==null?z.y:0;Ge.setTexture2D(T,0),N.copyTexSubImage2D(N.TEXTURE_2D,G,0,0,ce,ge,k,ee),ve.unbindTexture()};const Id=N.createFramebuffer(),Nd=N.createFramebuffer();this.copyTextureToTexture=function(T,z,G=null,W=null,k=0,ee=null){ee===null&&(k!==0?(Lr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ee=k,k=0):ee=0);let ce,ge,fe,Ae,De,Te,Ke,ot,St;const mt=T.isCompressedTexture?T.mipmaps[ee]:T.image;if(G!==null)ce=G.max.x-G.min.x,ge=G.max.y-G.min.y,fe=G.isBox3?G.max.z-G.min.z:1,Ae=G.min.x,De=G.min.y,Te=G.isBox3?G.min.z:0;else{const mn=Math.pow(2,-k);ce=Math.floor(mt.width*mn),ge=Math.floor(mt.height*mn),T.isDataArrayTexture?fe=mt.depth:T.isData3DTexture?fe=Math.floor(mt.depth*mn):fe=1,Ae=0,De=0,Te=0}W!==null?(Ke=W.x,ot=W.y,St=W.z):(Ke=0,ot=0,St=0);const ut=Se.convert(z.format),we=Se.convert(z.type);let yt;z.isData3DTexture?(Ge.setTexture3D(z,0),yt=N.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(Ge.setTexture2DArray(z,0),yt=N.TEXTURE_2D_ARRAY):(Ge.setTexture2D(z,0),yt=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,z.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,z.unpackAlignment);const nt=N.getParameter(N.UNPACK_ROW_LENGTH),on=N.getParameter(N.UNPACK_IMAGE_HEIGHT),os=N.getParameter(N.UNPACK_SKIP_PIXELS),an=N.getParameter(N.UNPACK_SKIP_ROWS),$s=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,mt.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,mt.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Ae),N.pixelStorei(N.UNPACK_SKIP_ROWS,De),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Te);const Mt=T.isDataArrayTexture||T.isData3DTexture,pn=z.isDataArrayTexture||z.isData3DTexture;if(T.isDepthTexture){const mn=xe.get(T),Yt=xe.get(z),nn=xe.get(mn.__renderTarget),Yo=xe.get(Yt.__renderTarget);ve.bindFramebuffer(N.READ_FRAMEBUFFER,nn.__webglFramebuffer),ve.bindFramebuffer(N.DRAW_FRAMEBUFFER,Yo.__webglFramebuffer);for(let Bi=0;Bi<fe;Bi++)Mt&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,xe.get(T).__webglTexture,k,Te+Bi),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,xe.get(z).__webglTexture,ee,St+Bi)),N.blitFramebuffer(Ae,De,ce,ge,Ke,ot,ce,ge,N.DEPTH_BUFFER_BIT,N.NEAREST);ve.bindFramebuffer(N.READ_FRAMEBUFFER,null),ve.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(k!==0||T.isRenderTargetTexture||xe.has(T)){const mn=xe.get(T),Yt=xe.get(z);ve.bindFramebuffer(N.READ_FRAMEBUFFER,Id),ve.bindFramebuffer(N.DRAW_FRAMEBUFFER,Nd);for(let nn=0;nn<fe;nn++)Mt?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,mn.__webglTexture,k,Te+nn):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,mn.__webglTexture,k),pn?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Yt.__webglTexture,ee,St+nn):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Yt.__webglTexture,ee),k!==0?N.blitFramebuffer(Ae,De,ce,ge,Ke,ot,ce,ge,N.COLOR_BUFFER_BIT,N.NEAREST):pn?N.copyTexSubImage3D(yt,ee,Ke,ot,St+nn,Ae,De,ce,ge):N.copyTexSubImage2D(yt,ee,Ke,ot,Ae,De,ce,ge);ve.bindFramebuffer(N.READ_FRAMEBUFFER,null),ve.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else pn?T.isDataTexture||T.isData3DTexture?N.texSubImage3D(yt,ee,Ke,ot,St,ce,ge,fe,ut,we,mt.data):z.isCompressedArrayTexture?N.compressedTexSubImage3D(yt,ee,Ke,ot,St,ce,ge,fe,ut,mt.data):N.texSubImage3D(yt,ee,Ke,ot,St,ce,ge,fe,ut,we,mt):T.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,ee,Ke,ot,ce,ge,ut,we,mt.data):T.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,ee,Ke,ot,mt.width,mt.height,ut,mt.data):N.texSubImage2D(N.TEXTURE_2D,ee,Ke,ot,ce,ge,ut,we,mt);N.pixelStorei(N.UNPACK_ROW_LENGTH,nt),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,on),N.pixelStorei(N.UNPACK_SKIP_PIXELS,os),N.pixelStorei(N.UNPACK_SKIP_ROWS,an),N.pixelStorei(N.UNPACK_SKIP_IMAGES,$s),ee===0&&z.generateMipmaps&&N.generateMipmap(yt),ve.unbindTexture()},this.initRenderTarget=function(T){xe.get(T).__webglFramebuffer===void 0&&Ge.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?Ge.setTextureCube(T,0):T.isData3DTexture?Ge.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?Ge.setTexture2DArray(T,0):Ge.setTexture2D(T,0),ve.unbindTexture()},this.resetState=function(){P=0,w=0,C=null,ve.reset(),le.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Wn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Je._getDrawingBufferColorSpace(e),t.unpackColorSpace=Je._getUnpackColorSpace()}}const Gn=Object.freeze({workingDistance:.065,maximumIntentOffset:.012,minimumWorkingDistance:.028,maximumWorkingDistance:.13,insertionSpeed:.035,insertionSmoothing:4.5,defaultFov:55}),Bn=s=>Array.isArray(s)&&s.length===3&&s.every(Number.isFinite),go=(s,e,t)=>Math.min(t,Math.max(e,s)),Jh=(s,e)=>Math.hypot(...s.map((t,n)=>t-e[n])),_o=s=>[...s];function zl(s){return!!s&&Bn(s.min)&&Bn(s.max)&&s.min.every((e,t)=>e<=s.max[t])}function Jv({port:s,intentTarget:e,surfaceTarget:t=null,fieldAnchor:n=null,organBounds:i=null,heldSpecimen:r=null,viewMode:o="field",depthBias:a=0,fovDegrees:l=Gn.defaultFov,aspect:c=1,minimumDepth:h=.018,maximumDepth:u=.135}={}){if(!Bn(s)||!Bn(e)||!Number.isFinite(a)||!Number.isFinite(c)||c<=0||!Number.isFinite(l))throw new TypeError("Invalid scope framing inputs.");let d,f,g,_;if(o==="specimen"&&Bn(r?.position)){f=_o(r.position),d=_o(f),_="specimen";const M=Number.isFinite(r.radius)&&r.radius>0?r.radius:.009,R=go(l,30,100)*Math.PI/180,P=Math.tan(R/2)*Math.min(1,c);g=Math.max(.03,M/(.78*P))}else{if(f=Bn(t)?_o(t):Bn(n)?_o(n):null,!f&&zl(i)&&(f=e.map((C,v)=>go(C,i.min[v],i.max[v]))),!f)return null;_=Bn(t)?"mother-surface":Bn(n)?"retained-operative-field":"mother-bounds";const M=e.map((C,v)=>C-f[v]),R=Math.hypot(...M);let P=.45/(1+(R/.035)**2);Bn(r?.position)&&Jh(r.position,f)>.045&&(P*=.35);const w=R>1e-12?Math.min(P,Gn.maximumIntentOffset/R):0;d=f.map((C,v)=>C+M[v]*w),g=Gn.workingDistance}const m=Jh(s,d),p=go(g-a,Gn.minimumWorkingDistance,Math.max(Gn.maximumWorkingDistance,g,m-h)),S=m-g,y=go(m-p,h,u);return{target:d,anchor:f,source:_,baseWorkingDistance:g,workingDistance:p,baseDepth:S,depthTarget:y,targetDistance:m,viewMode:_==="specimen"?"specimen":"field",insertionLimited:y<m-p-1e-9,retractionLimited:y>m-p+1e-9,framingLimited:Math.abs(y-(m-p))>1e-9}}function Qv(s,e,t){if(![s,e,t].every(Number.isFinite)||t<0)throw new TypeError("Invalid scope insertion update.");const n=e-s,i=Math.sign(n),r=Math.abs(n),o=Gn.insertionSpeed,a=Gn.insertionSmoothing,l=o/a;if(r<=l)return e-n*Math.exp(-a*t);const c=(r-l)/o;return t<=c?s+i*o*t:e-i*l*Math.exp(-a*(t-c))}const gt=Object.freeze({scopeDepth:Object.freeze([.018,.135]),workingDistance:.028,shaftRadius:.003,tipRadius:.005,jawRadius:.004,collisionTolerance:1e-7,contactMargin:2e-5,shaftLengths:Object.freeze({left:.4355,right:.4408}),maxFrameTime:.1,history:40}),Vn=Object.freeze({translation:.035,wrist:.8,jaw:1.1,scopeDepth:.026,scopeRotation:.55,fineFactor:.04,startFactor:.045,accelerationDelay:.12,accelerationTime:.85,followSmoothing:5,followMaxRadiansPerSecond:.9}),Yi=s=>typeof structuredClone=="function"?structuredClone(s):JSON.parse(JSON.stringify(s)),Dt=(s,e,t)=>Math.min(t,Math.max(e,s)),kt=s=>typeof s=="number"&&Number.isFinite(s),zt=s=>Array.isArray(s)&&s.length===3&&s.every(kt),hi=(s,e)=>Math.hypot(s[0]-e[0],s[1]-e[1],s[2]-e[2]),bs=(s,e,t=1e-10)=>s.every((n,i)=>Math.abs(n-e[i])<t),vr=["left","right"],Qh=[...vr,"scope"],ex={x:0,y:1,z:2},tx=s=>Math.atan2(Math.sin(s),Math.cos(s)),ns=(s,e)=>s.map((t,n)=>t+e[n]),qn=(s,e)=>s.map((t,n)=>t-e[n]),Nn=(s,e)=>s.map(t=>t*e),Mn=(s,e)=>s.reduce((t,n,i)=>t+n*e[i],0),Ji=(s,e)=>[s[1]*e[2]-s[2]*e[1],s[2]*e[0]-s[0]*e[2],s[0]*e[1]-s[1]*e[0]],en=(s,e=[0,0,-1])=>{const t=Math.hypot(...s);return t>1e-12?Nn(s,1/t):[...e]},Oo=(s,e,t)=>s.map((n,i)=>n+(e[i]-n)*t),eu=["active","midpoint","grasp"];function nx(s,e,t,n=!1){if(![s,e,t].every(kt)||s<0||e<0||t<0)throw new TypeError("Invalid control integration.");if(n)return e*t*Vn.fineFactor;const{startFactor:i,accelerationDelay:r,accelerationTime:o}=Vn,a=l=>{const c=Dt((l-r)/o,0,1);return t*(i*l+(1-i)*(o*(c**3-.5*c**4)+Math.max(0,l-r-o)))};return a(s+e)-a(s)}function _d(s,e,t,n){const i=qn(e,s),r=qn(n,t),o=qn(s,t),a=Mn(i,i),l=Mn(r,r),c=Mn(r,o);let h=0,u=0;if(a<=1e-20&&l<=1e-20)return hi(s,t);if(a<=1e-20)u=Dt(c/l,0,1);else{const d=Mn(i,o);if(l<=1e-20)h=Dt(-d/a,0,1);else{const f=Mn(i,r),g=a*l-f*f;g>1e-20&&(h=Dt((f*c-d*l)/g,0,1)),u=(f*h+c)/l,u<0?(u=0,h=Dt(-d/a,0,1)):u>1&&(u=1,h=Dt((f-d)/a,0,1))}}return hi(ns(s,Nn(i,h)),ns(t,Nn(r,u)))}function xr(s){const e=Ir(s),t=vd(s);return[{a:qn(s.position,Nn(e,t)),b:s.position,radius:gt.shaftRadius},{a:s.position,b:s.position,radius:gt.tipRadius+gt.jawRadius*s.jaw}]}const vd=s=>s.shaftLength??gt.shaftLengths[s.port[0]<0?"left":"right"];function Ir(s){return en(qn(s.position,s.port),zt(s.shaftDirection)?s.shaftDirection:[0,0,-1])}function kl(s,e){const t=[];for(const n of xr(s))for(const i of xr(e))t.push(_d(n.a,n.b,i.a,i.b)-n.radius-i.radius);return t}function yr(s,e){return Math.min(...kl(s,e))}function ix(s,e){const t=Ir(s),n=Ir(e),i=Math.atan2(Math.hypot(...Ji(t,n)),Dt(Mn(t,n),-1,1)),r=hi(s.position,s.port),o=hi(e.position,s.port),a=hi(s.position,e.position),l=vd(s);if(!kt(a))throw new TypeError("Tool trajectory exceeds finite numeric precision.");const c=gt.jawRadius*Math.abs(e.jaw-s.jaw),h=_d(s.port,s.port,s.position,e.position)<1e-7&&i>1e-12,u=en(Ji(t,n),Mr(t)),d=g=>{let _,m;return g<=0?(_=[...s.position],m=[...t]):g>=1?(_=[...e.position],m=[...n]):h?(m=en(Bo(t,u,i*g)),_=ns(s.port,Nn(m,r+(o-r)*g))):(_=Oo(s.position,e.position,g),m=en(qn(_,s.port),t)),{...s,position:_,shaftDirection:m,wrist:Oo(s.wrist,e.wrist,g),jaw:s.jaw+(e.jaw-s.jaw)*g}};return{pose:d,bound:(g,_)=>{const m=_-g;if(m<=0)return 0;if(h){const M=Math.max(r,o,Math.abs(r-l),Math.abs(o-l));return m*(Math.abs(o-r)+M*i+c)+1e-12}const p=d(g).shaftDirection,S=d(_).shaftDirection,y=Math.atan2(Math.hypot(...Ji(p,S)),Dt(Mn(p,S),-1,1));return a*m+l*y+c*m+1e-12}}}function sx(s,e,t){const n=ix(s,e);if(n.bound(0,1)<2e-12)return{tool:n.pose(1),limited:!1};const r=gt.collisionTolerance,o=kl(s,t),a=Math.min(...o)<0;let l=h=>yr(h,t);if(a){const h=xr(s),u=xr(e),d=xr(t),f=[];let g=0;for(let _=0;_<h.length;_++)for(const m of d){const p=Math.min(0,o[g]);-Math.max(h[_].radius,u[_].radius)-m.radius<p-r&&f.push({index:g,allowed:p}),g++}if(!f.length)return{tool:n.pose(1),limited:!1};l=_=>{const m=kl(_,t);return Math.min(...f.map(({index:p,allowed:S})=>m[p]-S+r))}}let c=0;for(let h=0;h<768;h++){const u=n.pose(c),d=l(u),f=1-c,g=n.bound(c,1);if(d>=g+1e-12)return{tool:n.pose(1),limited:!1};if(d<gt.contactMargin){const p=Math.min(f,Math.max(1e-8,f*Math.min(.01,gt.contactMargin/Math.max(g,1e-12))));if(l(n.pose(c+p))<d-1e-11)return{tool:u,limited:!0}}let _=c,m=1;for(let p=0;p<36;p++){const S=(_+m)*.5;n.bound(c,S)<=Math.max(0,d)*.8?_=S:m=S}if(_-c<1e-12)return{tool:u,limited:!0};if(c=_,c>=1-1e-12)return{tool:n.pose(1),limited:!1}}return{tool:n.pose(c),limited:!0}}function Mr(s,e=[0,1,0]){const t=qn(e,Nn(s,Mn(e,s)));return Math.hypot(...t)>1e-8?en(t):en(Ji(s,Math.abs(s[0])<.8?[1,0,0]:[0,0,1]))}function Bo(s,e,t){const n=Math.cos(t),i=Math.sin(t);return ns(ns(Nn(s,n),Nn(Ji(e,s),i)),Nn(e,Mn(e,s)*(1-n)))}function rx(s,e,t,n){const i=Math.acos(Dt(Mn(s,e),-1,1));if(i<1e-10)return[...e];const r=Math.min(i*(1-Math.exp(-Vn.followSmoothing*t)),Vn.followMaxRadiansPerSecond*t),o=en(Ji(s,e),Mr(s,n));return en(Bo(s,o,r))}const zo=Object.freeze({left:{port:[-.08,1.18,.1],position:[-.025,1.105,0],wrist:[0,0,0],jaw:.6},right:{port:[.08,1.18,.1],position:[.025,1.108,0],wrist:[0,0,0],jaw:.6}}),hr=Object.freeze([0,1.18,.14]);function tu(){const s=[...zo.left.position],e=s[0]-hr[0],t=s[1]-hr[1],n=s[2]-hr[2],i={selected:"left",activeTool:"left",paused:!1,cutting:!1,elapsed:0,tools:Yi(zo),scope:{port:[...hr],position:[0,0,0],target:s,lookAt:[...s],depth:Dt(Math.hypot(e,t,n)-Gn.workingDistance,...gt.scopeDepth),yaw:Math.atan2(e,-n),pitch:Math.atan2(-t,Math.hypot(e,n)),roll:0,follow:!0,followMode:"active",graspTarget:null,operating:!1,direction:en([e,t,n]),up:[0,1,0],cameraUp:[0,1,0],viewMode:"field",depthBias:0,surfaceTarget:null,fieldAnchor:null,organBounds:null,heldSpecimen:null,framingSource:null,framingLimited:!1,targetWorkingDistance:Gn.workingDistance,autoDepthTarget:null,intentTarget:[...s]}};for(const r of vr)i.tools[r].shaftLength=gt.shaftLengths[r],i.tools[r].shaftDirection=Ir(i.tools[r]);return i.collision={active:!1,clearance:yr(i.tools.left,i.tools.right),selected:null},ws(i),i}function ox(s){return[Math.sin(s.yaw)*Math.cos(s.pitch),-Math.sin(s.pitch),-Math.cos(s.yaw)*Math.cos(s.pitch)]}function ws(s,e){const t=s.scope;t.port=[...hr];const n=t.follow?hi(t.target,t.port):.19,i=Math.max(gt.scopeDepth[0],Math.min(gt.scopeDepth[1],n-gt.workingDistance));t.depth=Dt(t.depth,gt.scopeDepth[0],i);const r=en(e||ox(t)),o=zt(t.direction)?en(t.direction):r,a=Mr(o,t.up),l=Ji(o,r),c=Math.acos(Dt(Mn(o,r),-1,1));t.up=c>1e-10?Mr(r,Bo(a,en(l,a),c)):Mr(r,a),t.direction=r,t.cameraUp=en(Bo(t.up,r,t.roll)),t.position=t.port.map((h,u)=>h+r[u]*t.depth),t.lookAt=t.port.map((h,u)=>h+r[u]*Math.max(n,t.depth+gt.workingDistance)),t.follow||(t.target=[...t.lookAt]),t.actualWorkingDistance=hi(t.position,t.target)}function nu(s,e){if(!zt(s)||!zt(e))throw new TypeError("Tool position and port require three finite numbers.");return[...s]}function ax(s){const e=s instanceof Set?s:new Set(s||[]),t=new Set,n={" ":"Space",Spacebar:"Space",Shift:"ShiftLeft",1:"Digit1",2:"Digit2",3:"Digit3","[":"BracketLeft","]":"BracketRight",w:"KeyW",s:"KeyS",a:"KeyA",d:"KeyD",q:"KeyQ",e:"KeyE",z:"KeyZ",x:"KeyX",c:"KeyC",v:"KeyV"};for(const i of e)typeof i=="string"&&t.add(n[i]||n[i.toLowerCase()]||i);return t}const Si=(s,e,t)=>Number(s.has(e))-Number(s.has(t));class lx{constructor({onEvent:e,getExtraData:t}={}){this.state=tu(),this.undoStack=[],this.redoStack=[],this._listeners=new Set,typeof e=="function"&&this._listeners.add(e),this._previousKeys=new Set,this._gesture=!1,this._events=[],this._limitCooldown=0,this._controlAges=new Map,this.getExtraData=typeof t=="function"?t:void 0,this.viewAspect=1}onEvent(e){if(typeof e!="function")throw new TypeError("Event listener must be a function.");return this._listeners.add(e),()=>this._listeners.delete(e)}_emit(e,t={}){const n={type:e,...t};this._events.push(n);for(const i of this._listeners)i(n);return n}get canUndo(){return this.undoStack.length>0}get canRedo(){return this.redoStack.length>0}get selectedTool(){return this.state.tools[this.state.activeTool]}snapshot(){return Yi({version:1,state:this.state})}restore(e){const t=Yi(e?.state??e);if(!t||!Qh.includes(t.selected)||!vr.includes(t.activeTool)||!kt(t.elapsed))throw new TypeError("Invalid simulation snapshot.");for(const i of vr){const r=t.tools?.[i];if(!r||!zt(r.position)||!zt(r.wrist)||!kt(r.jaw))throw new TypeError(`Invalid ${i} tool snapshot.`);if(r.port=[...zo[i].port],r.shaftLength=gt.shaftLengths[i],r.position=nu(r.position,r.port),r.shaftDirection!==void 0&&(!zt(r.shaftDirection)||Math.hypot(...r.shaftDirection)<1e-10))throw new TypeError(`Invalid ${i} shaft direction.`);r.shaftDirection??=Ir(r),r.jaw=Dt(r.jaw,0,1)}const n=t.scope;if(!n||!zt(n.target)||!["depth","yaw","pitch","roll"].every(i=>kt(n[i]))||!eu.includes(n.followMode))throw new TypeError("Invalid scope snapshot.");if(t.paused=!!t.paused,t.cutting=!!t.cutting,n.follow=!!n.follow,n.graspTarget!=null&&!zt(n.graspTarget))throw new TypeError("Invalid scope grasp target.");if(n.graspTarget??=null,n.operating=!!n.operating,n.viewMode??="field",n.depthBias??=0,n.surfaceTarget??=null,n.fieldAnchor??=n.surfaceTarget?[...n.surfaceTarget]:null,n.organBounds??=null,n.heldSpecimen??=null,n.framingSource??=null,n.targetWorkingDistance??=Gn.workingDistance,n.framingLimited=!!n.framingLimited,n.autoDepthTarget??=null,n.intentTarget??=[...n.target],!["field","specimen"].includes(n.viewMode)||!kt(n.depthBias)||n.surfaceTarget!==null&&!zt(n.surfaceTarget)||n.fieldAnchor!==null&&!zt(n.fieldAnchor)||n.organBounds!==null&&!zl(n.organBounds)||!zt(n.intentTarget)||n.heldSpecimen!==null&&(!zt(n.heldSpecimen.position)||!kt(n.heldSpecimen.radius)||n.heldSpecimen.radius<0))throw new TypeError("Invalid scope anatomical framing snapshot.");return t.elapsed=Math.max(0,t.elapsed),t.collision??={active:yr(t.tools.left,t.tools.right)<0,clearance:yr(t.tools.left,t.tools.right),selected:null},ws(t),this.state=t,this._gesture=!1,this._previousKeys.clear(),this._controlAges.clear(),this._emit("restore"),this.state}checkpoint(e="操作",t){this.undoStack.push({label:String(e),snapshot:this.snapshot(),extraData:t===void 0?void 0:Yi(t)}),this.undoStack.length>gt.history&&this.undoStack.shift(),this.redoStack.length=0,this._emit("history",{canUndo:!0,canRedo:!1})}_travelHistory(e,t,n,i){if(!e.length)return null;const r=e.pop();t.push({label:r.label,snapshot:this.snapshot(),extraData:n===void 0?void 0:Yi(n)});const o=this.state.paused;this.restore(r.snapshot),this.state.paused=o;const a={label:r.label,extraData:r.extraData===void 0?void 0:Yi(r.extraData),hasExtraData:r.extraData!==void 0};return this._emit(i,a),this._emit("history",{canUndo:this.canUndo,canRedo:this.canRedo}),a}undo(e){return this._travelHistory(this.undoStack,this.redoStack,e,"undo")}redo(e){return this._travelHistory(this.redoStack,this.undoStack,e,"redo")}reset(){return this.state=tu(),this.undoStack.length=this.redoStack.length=0,this._previousKeys.clear(),this._gesture=!1,this._controlAges.clear(),this._emit("reset"),this._emit("history",{canUndo:!1,canRedo:!1}),this.state}setSelected(e){return this.select(e)}select(e){if(!Qh.includes(e))throw new RangeError(`Unknown selection: ${e}`);return this.state.selected===e?!1:(this.state.selected=e,e!=="scope"&&(this.state.activeTool=e),this._gesture=!1,this._controlAges.clear(),this._emit("selection",{selected:e}),!0)}setPaused(e){this.state.paused=!!e,this._gesture=!1,this._controlAges.clear(),this._emit("pause",{paused:this.state.paused})}setCutting(e){this.state.cutting=!!e,this._emit("cutting",{cutting:this.state.cutting})}setScopeFollow(e,t=this.state.scope.followMode){if(!eu.includes(t))throw new RangeError("Scope follow mode must be active, midpoint or grasp.");this.state.scope.follow=!!e,this.state.scope.followMode=t,this._emit("scope-follow",{follow:this.state.scope.follow,mode:t})}setScopeContext({graspTarget:e=null,operating:t=!1,surfaceTarget:n,organBounds:i,heldSpecimen:r,viewAspect:o}={}){if(e!==null&&!zt(e))throw new TypeError("Grasp target must be null or three finite world coordinates.");if(n!=null&&!zt(n))throw new TypeError("Surface target requires finite world coordinates.");if(i!=null&&!zl(i))throw new TypeError("Organ bounds require finite min/max world coordinates.");if(r!=null&&(!zt(r.position)||!kt(r.radius)||r.radius<0))throw new TypeError("Held specimen requires a finite world position and nonnegative radius.");if(o!==void 0&&(!kt(o)||o<=0))throw new TypeError("Scope view aspect requires a finite positive width/height ratio.");o!==void 0&&(this.viewAspect=o),this.state.scope.graspTarget=e===null?null:[...e],this.state.scope.operating=!!t,n!==void 0&&(this.state.scope.surfaceTarget=n===null?null:[...n],n!==null&&(this.state.scope.fieldAnchor=[...n])),i!==void 0&&(this.state.scope.organBounds=i===null?null:{min:[...i.min],max:[...i.max]}),r!==void 0&&(this.state.scope.heldSpecimen=r===null?null:{...r,position:[...r.position]})}setScopeViewMode(e){if(!["field","specimen"].includes(e))throw new RangeError("Scope view mode must be field or specimen.");return this.state.scope.viewMode===e?!1:(this.state.scope.viewMode=e,this.state.scope.depthBias=0,this._emit("scope-view",{viewMode:e}),!0)}_scopeIntentTarget(){const e=this.state.scope;return e.followMode==="grasp"&&e.graspTarget?e.operating?Oo(e.graspTarget,this.state.tools.right.position,.5):[...e.graspTarget]:e.followMode==="midpoint"||e.followMode==="grasp"?Oo(this.state.tools.left.position,this.state.tools.right.position,.5):[...this.state.tools[this.state.activeTool].position]}_scopeFraming(e=this._scopeIntentTarget()){const t=this.state.scope;return Jv({...t,intentTarget:e,aspect:this.viewAspect,minimumDepth:gt.scopeDepth[0],maximumDepth:gt.scopeDepth[1]})}_manualScopeDepth(e,t=null){const n=this.state.scope,i=t?.targetDistance??(n.follow?hi(n.target,n.port):.19),r=Math.max(gt.scopeDepth[0],Math.min(gt.scopeDepth[1],i-gt.workingDistance));n.depth=Dt(n.depth+e,gt.scopeDepth[0],r),n.follow&&t&&(n.depthBias=n.depth-t.baseDepth)}_integrateControl(e,t,n,i,r){const o=Math.hypot(...t);if(!o)return this._controlAges.delete(e),t.map(()=>0);const a=Nn(t,1/o),l=a.join(",")+":"+r,c=this._controlAges.get(e),h=c?.signature===l?c.age:0,u=nx(h,n,i,r);return this._controlAges.set(e,{signature:l,age:h+n}),Nn(a,u)}_tool(e=this.state.selected){if(!vr.includes(e))throw new RangeError("Select a left or right instrument for this action.");return this.state.tools[e]}_moveTool(e,t=this.state.selected){if(!zt(e))throw new TypeError("Tool displacement requires three finite values.");const n=this._tool(t),i=n.position.map((r,o)=>r+e[o]);return this._applyTool({...n,position:nu(i,n.port)},t)}_applyTool(e,t){const n=this._tool(t),i=this._tool(t==="left"?"right":"left"),{tool:r,limited:o}=sx(n,e,i),a=!bs(r.position,n.position)||!bs(e.wrist,n.wrist)||r.jaw!==n.jaw;n.position=[...r.position],n.shaftDirection=[...r.shaftDirection],n.wrist=[...e.wrist],n.jaw=r.jaw;const l=yr(n,i);return this.state.collision={active:o||l<-gt.collisionTolerance,clearance:l,selected:t},o&&this._limitCooldown<=0&&(this._emit("limit",{selected:t,kind:"instrument-collision",clearance:l}),this._limitCooldown=.6),{changed:a,limited:o}}moveToolTo(e,t=this.state.selected,{checkpoint:n=!1,label:i="定位器械"}={}){if(!zt(e))throw new TypeError("Tool position requires three finite values.");return this.state.paused?{changed:!1,limited:!1}:(n&&this.checkpoint(i,this.getExtraData?.()),this._moveTool(qn(e,this._tool(t).position),t))}moveTool(e,t=this.state.selected){return this.state.paused?{changed:!1,limited:!1}:this._moveTool(e,t)}nudge(e,t,n=.002,i=this.state.selected){const r=typeof e=="string"?ex[e]:e;if(![0,1,2].includes(r)||!kt(t)||!kt(n)||n<0)throw new TypeError("Nudge requires an axis, finite direction and nonnegative step.");if(this.state.paused)return!1;if(this.checkpoint("微调位移",this.getExtraData?.()),i==="scope")return r===2?this._manualScopeDepth(-t*n,this.state.scope.follow?this._scopeFraming():null):(this.setScopeFollow(!1),this.state.scope[r===0?"yaw":"pitch"]+=t*n*5),ws(this.state),!0;const o=[0,0,0];return o[r]=t*n,this._moveTool(o,i).changed}setJaw(e,t){if(!kt(t))throw new TypeError("Jaw opening must be finite.");if(this.state.paused)return!1;const n=this._tool(e),i=Dt(t,0,1);return this._applyTool({...n,jaw:i},e).changed}adjustJaw(e,t=this.state.selected){if(!kt(e))throw new TypeError("Jaw delta must be finite.");return this.setJaw(t,this._tool(t).jaw+e)}adjustWrist(e,t,n=this.state.selected){if(![0,1,2].includes(e)||!kt(t))throw new TypeError("Wrist adjustment requires axis 0–2 and a finite delta.");if(this.state.paused)return!1;if(n==="scope"){const a=["pitch","yaw","roll"][e];e<2&&this.state.scope.follow&&this.setScopeFollow(!1);const l=this.state.scope[a];return this.state.scope[a]+=t,ws(this.state),l!==this.state.scope[a]}const i=this._tool(n),r=i.wrist[e]+t;if(!kt(r))throw new TypeError("Wrist rotation overflow.");const o=r!==i.wrist[e];return i.wrist[e]=r,o}homeTools(){return this.state.paused?!1:(this.checkpoint("器械回中",this.getExtraData?.()),this.state.tools=Yi(zo),this._emit("home"),!0)}update(e,t=new Set){this._events=[];const n=ax(t);for(const[A,L]of[["Digit1","left"],["Digit2","right"],["Digit3","scope"]])n.has(A)&&!this._previousKeys.has(A)&&this.select(L);if(this._previousKeys=n,!kt(e)||e<=0)return{changed:!1,moving:!1,clutched:!1,limited:!1,events:[...this._events]};const i=Math.min(e,gt.maxFrameTime);this._limitCooldown=Math.max(0,this._limitCooldown-i);const r=n.has("Space");if(this.state.paused||r)return this._gesture=!1,this._controlAges.clear(),{changed:!1,moving:!1,clutched:r,limited:!1,events:[...this._events]};const o=Si(n,"KeyD","KeyA"),a=Si(n,"KeyE","KeyQ"),l=Si(n,"KeyS","KeyW"),c=Si(n,"ArrowUp","ArrowDown"),h=Si(n,"ArrowRight","ArrowLeft"),u=Si(n,"KeyX","KeyZ"),d=Si(n,"KeyV","KeyC"),f=Si(n,"BracketRight","BracketLeft"),g=!!(o||a||l||c||h||u||f||d&&this.state.selected!=="scope");g&&!this._gesture&&this.checkpoint("遥操作位姿",this.getExtraData?.()),this._gesture=g;const _=n.has("ShiftLeft")||n.has("ShiftRight");let m=!1,p=!1;const S=[...this.state.scope.position],y=this.state.scope.depth,M=this._integrateControl("translation",[o,a,l],i,Vn.translation,_),R=this._integrateControl("rotation",[c,h,u],i,Vn.wrist,_),P=this._integrateControl("scope-rotation",[Dt(a+c,-1,1),Dt(o+h,-1,1),u],i,Vn.scopeRotation,_),w=this._integrateControl("scope-navigation",[Dt(-l+f,-1,1)],i,Vn.scopeDepth,_)[0],C=this._integrateControl("scope-depth",[f],i,Vn.scopeDepth,_)[0];if(this.state.selected==="scope"){const A=this.state.scope;(o||a||c||h)&&A.follow&&this.setScopeFollow(!1);const L=[A.depth,A.yaw,A.pitch,A.roll];A.pitch+=P[0],A.yaw+=P[1],A.roll+=P[2],m=!bs(L.slice(0,3),[A.depth,A.yaw,A.pitch])||L[3]!==A.roll}else{const A=this._tool(),L=this._applyTool({...A,position:ns(A.position,M),wrist:ns(A.wrist,R),jaw:Dt(A.jaw+d*Vn.jaw*i*(_?.35:1),0,1)},this.state.selected);p=L.limited,m=L.changed}const v=this.state.scope,x=this.state.selected==="scope"?w:C;if(v.follow){const A=this._scopeIntentTarget();let L=this._scopeFraming(A);const U=L?.target??A;v.intentTarget=[...A],v.target=U;const I=[...v.position],B=[...v.lookAt],O=rx(v.direction,en(qn(U,v.port),v.direction),i,v.up);if(x)this._manualScopeDepth(x,L),L=this._scopeFraming(A);else if(L){const K=Qv(v.depth,L.depthTarget,i);(K<=v.depth||Mn(O,en(qn(U,v.port),O))>Math.cos(.35))&&(v.depth=K)}v.framingSource=L?.source??null,v.framingLimited=L?.framingLimited??!1,v.targetWorkingDistance=L?.workingDistance??hi(v.position,v.target),v.autoDepthTarget=L?.depthTarget??null,v.yaw+=tx(Math.atan2(O[0],-O[2])-v.yaw),v.pitch=Math.atan2(-O[1],Math.hypot(O[0],O[2])),ws(this.state,O),m=!bs(I,v.position)||!bs(B,v.lookAt)||m}else x&&this._manualScopeDepth(x),v.framingSource=null,v.framingLimited=!1,v.autoDepthTarget=null,ws(this.state);return m=!bs(S,v.position)||y!==v.depth||m,this.state.elapsed+=i,{changed:m,moving:g,clutched:r,limited:p,events:[...this._events]}}}function iu(s,e){if(e===df)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===Dl||e===zu){let t=s.getIndex();if(t===null){const o=[],a=s.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);s.setIndex(o),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}const n=t.count-2,i=[];if(e===Dl)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}class Ro extends Ks{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new fx(t)}),this.register(function(t){return new px(t)}),this.register(function(t){return new bx(t)}),this.register(function(t){return new Ex(t)}),this.register(function(t){return new Tx(t)}),this.register(function(t){return new gx(t)}),this.register(function(t){return new _x(t)}),this.register(function(t){return new vx(t)}),this.register(function(t){return new xx(t)}),this.register(function(t){return new dx(t)}),this.register(function(t){return new yx(t)}),this.register(function(t){return new mx(t)}),this.register(function(t){return new Sx(t)}),this.register(function(t){return new Mx(t)}),this.register(function(t){return new hx(t)}),this.register(function(t){return new wx(t)}),this.register(function(t){return new Ax(t)})}load(e,t,n,i){const r=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const c=_r.extractUrlBase(e);o=_r.resolveURL(c,this.path)}else o=_r.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){i?i(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new cd(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,o,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r;const o={},a={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===xd){try{o[je.KHR_BINARY_GLTF]=new Rx(e)}catch(u){i&&i(u);return}r=JSON.parse(o[je.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new Vx(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case je.KHR_MATERIALS_UNLIT:o[u]=new ux;break;case je.KHR_DRACO_MESH_COMPRESSION:o[u]=new Cx(r,this.dracoLoader);break;case je.KHR_TEXTURE_TRANSFORM:o[u]=new Px;break;case je.KHR_MESH_QUANTIZATION:o[u]=new Dx;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}}function cx(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}const je={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class hx{constructor(e){this.parser=e,this.name=je.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let c;const h=new Re(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],Kt);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Fl(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new ud(h),c.distance=u;break;case"spot":c=new hd(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),zn(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class ux{constructor(){this.name=je.KHR_MATERIALS_UNLIT}getMaterialType(){return bn}extendParams(e,t,n){const i=[];e.color=new Re(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Kt),e.opacity=o[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,Ct))}return Promise.all(i)}}class dx{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class fx{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:fn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ue(a,a)}return Promise.all(r)}}class px{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:fn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class mx{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:fn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}}class gx{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:fn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new Re(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Kt)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,Ct)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}}class _x{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:fn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}}class vx{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:fn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new Re().setRGB(a[0],a[1],a[2],Kt),Promise.all(r)}}class xx{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:fn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class yx{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:fn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new Re().setRGB(a[0],a[1],a[2],Kt),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,Ct)),Promise.all(r)}}class Mx{constructor(e){this.parser=e,this.name=je.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:fn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}}class Sx{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:fn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}}class bx{constructor(e){this.parser=e,this.name=je.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const r=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}}class Ex{constructor(e){this.parser=e,this.name=je.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}}class Tx{constructor(e){this.parser=e,this.name=je.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}}class wx{constructor(e){this.name=je.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):o.ready.then(function(){const f=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}}class Ax{constructor(e){this.name=je.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==vn.TRIANGLES&&c.mode!==vn.TRIANGLE_STRIP&&c.mode!==vn.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(h=>(l[c]=h,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(const g of u){const _=new Ue,m=new E,p=new Fe,S=new E(1,1,1),y=new Qu(g.geometry,g.material,d);for(let M=0;M<d;M++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,M),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,M),l.SCALE&&S.fromBufferAttribute(l.SCALE,M),y.setMatrixAt(M,_.compose(m,p,S));for(const M in l)if(M==="_COLOR_0"){const R=l[M];y.instanceColor=new Nl(R.array,R.itemSize,R.normalized)}else M!=="TRANSLATION"&&M!=="ROTATION"&&M!=="SCALE"&&g.geometry.setAttribute(M,l[M]);ht.prototype.copy.call(y,g),this.parser.assignFinalMaterial(y),f.push(y)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const xd="glTF",rr=12,su={JSON:1313821514,BIN:5130562};class Rx{constructor(e){this.name=je.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,rr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==xd)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-rr,r=new DataView(e,rr);let o=0;for(;o<i;){const a=r.getUint32(o,!0);o+=4;const l=r.getUint32(o,!0);if(o+=4,l===su.JSON){const c=new Uint8Array(e,rr+o,a);this.content=n.decode(c)}else if(l===su.BIN){const c=rr+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class Cx{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=je.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const h in o){const u=Vl[h]||h.toLowerCase();a[u]=o[h]}for(const h in e.attributes){const u=Vl[h]||h.toLowerCase();if(o[h]!==void 0){const d=n.accessors[e.attributes[h]],f=Ns[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(const g in f.attributes){const _=f.attributes[g],m=l[g];m!==void 0&&(_.normalized=m)}u(f)},a,c,Kt,d)})})}}class Px{constructor(){this.name=je.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class Dx{constructor(){this.name=je.KHR_MESH_QUANTIZATION}}class yd extends Br{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,g=e*c,_=g-c,m=-2*f+3*d,p=f-d,S=1-m,y=p-d+u;for(let M=0;M!==a;M++){const R=o[_+M+a],P=o[_+M+l]*h,w=o[g+M+a],C=o[g+M]*h;r[M]=S*R+y*P+m*w+p*C}return r}}const Lx=new Fe;class Ix extends yd{interpolate_(e,t,n,i){const r=super.interpolate_(e,t,n,i);return Lx.fromArray(r).normalize().toArray(r),r}}const vn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Ns={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},ru={9728:tn,9729:Qt,9984:Du,9985:So,9986:lr,9987:ai},ou={33071:Ri,33648:Lo,10497:es},Na={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Vl={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},bi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Nx={CUBICSPLINE:void 0,LINEAR:Pr,STEP:Cr},Ua={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Ux(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new pi({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:di})),s.DefaultMaterial}function Xi(s,e,t){for(const n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function zn(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Fx(s,e,t){let n=!1,i=!1,r=!1;for(let c=0,h=e.length;c<h;c++){const u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);const o=[],a=[],l=[];for(let c=0,h=e.length;c<h;c++){const u=e[c];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):s.attributes.position;o.push(d)}if(i){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):s.attributes.normal;a.push(d)}if(r){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):s.attributes.color;l.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2];return n&&(s.morphAttributes.position=h),i&&(s.morphAttributes.normal=u),r&&(s.morphAttributes.color=d),s.morphTargetsRelative=!0,s})}function Ox(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Bx(s){let e;const t=s.extensions&&s.extensions[je.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Fa(t.attributes):e=s.indices+":"+Fa(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+Fa(s.targets[n]);return e}function Fa(s){let e="";const t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function Hl(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function zx(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":s.search(/\.ktx2($|\?)/i)>0||s.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const kx=new Ue;class Vx{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new cx,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const l=a.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&o<98?this.textureLoader=new Qp(this.options.manager):this.textureLoader=new im(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new cd(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return Xi(r,a,i),zn(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(const l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){const o=t[i].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let i=0,r=e.length;i<r;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),r=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,h]of o.children.entries())r(h,a.children[c])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[je.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(r,o){n.load(_r.resolveURL(t.uri,i.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=Na[i.type],a=Ns[i.componentType],l=i.normalized===!0,c=new a(i.count*o);return Promise.resolve(new ct(c,o,l))}const r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(o){const a=o[0],l=Na[i.type],c=Ns[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0;let _,m;if(f&&f!==u){const p=Math.floor(d/f),S="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let y=t.cache.get(S);y||(_=new c(a,p*f,i.count*f/h),y=new hp(_,f/h),t.cache.add(S,y)),m=new ac(y,l,d%f/h,g)}else a===null?_=new c(i.count*l):_=new c(a,d,i.count*l),m=new ct(_,l,g);if(i.sparse!==void 0){const p=Na.SCALAR,S=Ns[i.sparse.indices.componentType],y=i.sparse.indices.byteOffset||0,M=i.sparse.values.byteOffset||0,R=new S(o[1],y,i.sparse.count*p),P=new c(o[2],M,i.sparse.count*l);a!==null&&(m=new ct(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let w=0,C=R.length;w<C;w++){const v=R[w];if(m.setX(v,P[w*l]),l>=2&&m.setY(v,P[w*l+1]),l>=3&&m.setZ(v,P[w*l+2]),l>=4&&m.setW(v,P[w*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){const i=this,r=this.json,o=r.textures[e],a=r.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);const d=(r.samplers||{})[o.sampler]||{};return h.magFilter=ru[d.magFilter]||Qt,h.minFilter=ru[d.minFilter]||ai,h.wrapS=ou[d.wrapS]||es,h.wrapT=ou[d.wrapT]||es,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==tn&&h.minFilter!==Qt,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const o=i.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(u){c=!0;const d=new Blob([u],{type:o.mimeType});return l=a.createObjectURL(d),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(d,f){let g=d;t.isImageBitmapLoader===!0&&(g=function(_){const m=new Lt(_);m.needsUpdate=!0,d(m)}),t.load(_r.resolveURL(u,r.path),g,void 0,f)})}).then(function(u){return c===!0&&a.revokeObjectURL(l),zn(u,o),u.userData.mimeType=o.mimeType||zx(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[je.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[je.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=r.associations.get(o);o=r.extensions[je.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,l)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new ed,In.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new hc,In.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||r||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),r&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return pi}loadMaterial(e){const t=this,n=this.json,i=this.extensions,r=n.materials[e];let o;const a={},l=r.extensions||{},c=[];if(l[je.KHR_MATERIALS_UNLIT]){const u=i[je.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),c.push(u.extendParams(a,r,t))}else{const u=r.pbrMetallicRoughness||{};if(a.color=new Re(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],Kt),a.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",u.baseColorTexture,Ct)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=un);const h=r.alphaMode||Ua.OPAQUE;if(h===Ua.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===Ua.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==bn&&(c.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new ue(1,1),r.normalTexture.scale!==void 0)){const u=r.normalTexture.scale;a.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&o!==bn&&(c.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==bn){const u=r.emissiveFactor;a.emissive=new Re().setRGB(u[0],u[1],u[2],Kt)}return r.emissiveTexture!==void 0&&o!==bn&&c.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,Ct)),Promise.all(c).then(function(){const u=new o(a);return r.name&&(u.name=r.name),zn(u,r),t.associations.set(u,{materials:e}),r.extensions&&Xi(i,u,r),u})}createUniqueName(e){const t=rt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function r(a){return n[je.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return au(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],h=Bx(c),u=i[h];if(u)o.push(u.promise);else{let d;c.extensions&&c.extensions[je.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=au(new Ut,c,t),i[h]={primitive:c,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const h=o[l].material===void 0?Ux(this.cache):this.getDependency("material",o[l].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,g=h.length;f<g;f++){const _=h[f],m=o[f];let p;const S=c[f];if(m.mode===vn.TRIANGLES||m.mode===vn.TRIANGLE_STRIP||m.mode===vn.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new dp(_,S):new $e(_,S),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===vn.TRIANGLE_STRIP?p.geometry=iu(p.geometry,zu):m.mode===vn.TRIANGLE_FAN&&(p.geometry=iu(p.geometry,Dl));else if(m.mode===vn.LINES)p=new vp(_,S);else if(m.mode===vn.LINE_STRIP)p=new Wo(_,S);else if(m.mode===vn.LINE_LOOP)p=new xp(_,S);else if(m.mode===vn.POINTS)p=new yp(_,S);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&Ox(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),zn(p,r),m.extensions&&Xi(i,p,m),t.assignFinalMaterial(p),u.push(p)}for(let f=0,g=u.length;f<g;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&Xi(i,u[0],r),u[0];const d=new Ye;r.extensions&&Xi(i,d,r),t.associations.set(d,{meshes:e});for(let f=0,g=u.length;f<g;f++)d.add(u[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Wt(Hn.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new qo(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),zn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const r=i.pop(),o=i,a=[],l=[];for(let c=0,h=o.length;c<h;c++){const u=o[c];if(u){a.push(u);const d=new Ue;r!==null&&d.fromArray(r.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new lc(a,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,o=[],a=[],l=[],c=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){const f=i.channels[u],g=i.samplers[f.sampler],_=f.target,m=_.node,p=i.parameters!==void 0?i.parameters[g.input]:g.input,S=i.parameters!==void 0?i.parameters[g.output]:g.output;_.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",S)),c.push(g),h.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],g=u[2],_=u[3],m=u[4],p=[];for(let y=0,M=d.length;y<M;y++){const R=d[y],P=f[y],w=g[y],C=_[y],v=m[y];if(R===void 0)continue;R.updateMatrix&&R.updateMatrix();const x=n._createAnimationTracks(R,P,w,C,v);if(x)for(let A=0;A<x.length;A++)p.push(x[A])}const S=new qp(r,void 0,p);return zn(S,i),S})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){const o=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=i.children||[];for(let c=0,h=a.length;c<h;c++)o.push(n.getDependency("node",a[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(o),l]).then(function(c){const h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,kx)});for(let f=0,g=u.length;f<g;f++)h.add(u[f]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],o=r.name?i.createUniqueName(r.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),r.camera!==void 0&&a.push(i.getDependency("camera",r.camera).then(function(c){return i._getNodeRef(i.cameraCache,r.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let h;if(r.isBone===!0?h=new Zu:c.length>1?h=new Ye:c.length===1?h=c[0]:h=new ht,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(r.name&&(h.userData.name=r.name,h.name=o),zn(h,r),r.extensions&&Xi(n,h,r),r.matrix!==void 0){const u=new Ue;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!i.associations.has(h))i.associations.set(h,{});else if(r.mesh!==void 0&&i.meshCache.refs[r.mesh]>1){const u=i.associations.get(h);i.associations.set(h,{...u})}return i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,r=new Ye;n.name&&(r.name=i.createUniqueName(n.name)),zn(r,n),n.extensions&&Xi(t,r,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(i.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let h=0,u=l.length;h<u;h++)r.add(l[h]);const c=h=>{const u=new Map;for(const[d,f]of i.associations)(d instanceof In||d instanceof Lt)&&u.set(d,f);return h.traverse(d=>{const f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=c(r),r})}_createAnimationTracks(e,t,n,i,r){const o=[],a=e.name?e.name:e.uuid,l=[];bi[r.path]===bi.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(a);let c;switch(bi[r.path]){case bi.weights:c=Vs;break;case bi.rotation:c=Hs;break;case bi.translation:case bi.scale:c=Gs;break;default:switch(n.itemSize){case 1:c=Vs;break;case 2:case 3:default:c=Gs;break}break}const h=i.interpolation!==void 0?Nx[i.interpolation]:Pr,u=this._getArrayFromAccessor(n);for(let d=0,f=l.length;d<f;d++){const g=new c(l[d]+"."+bi[r.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Hl(t.constructor),i=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof Hs?Ix:yd;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function Hx(s,e,t){const n=e.attributes,i=new jn;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new E(l[0],l[1],l[2]),new E(c[0],c[1],c[2])),a.normalized){const h=Hl(Ns[a.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const a=new E,l=new E;for(let c=0,h=r.length;c<h;c++){const u=r[c];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){const _=Hl(Ns[d.componentType]);l.multiplyScalar(_)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}s.boundingBox=i;const o=new Kn;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=o}function au(s,e,t){const n=e.attributes,i=[];function r(o,a){return t.getDependency("accessor",o).then(function(l){s.setAttribute(a,l)})}for(const o in n){const a=Vl[o]||o.toLowerCase();a in s.attributes||i.push(r(n[o],a))}if(e.indices!==void 0&&!s.index){const o=t.getDependency("accessor",e.indices).then(function(a){s.setIndex(a)});i.push(o)}return Je.workingColorSpace!==Kt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Je.workingColorSpace}" not supported.`),zn(s,e),Hx(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?Fx(s,e.targets,t):s})}const lu={type:"change"},vc={type:"start"},Md={type:"end"},vo=new Or,cu=new wi,Gx=Math.cos(70*Hn.DEG2RAD),Pt=new E,sn=2*Math.PI,lt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Oa=1e-6;class Wx extends pm{constructor(e,t=null){super(e,t),this.state=lt.NONE,this.target=new E,this.cursor=new E,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ds.ROTATE,MIDDLE:Ds.DOLLY,RIGHT:Ds.PAN},this.touches={ONE:Rs.ROTATE,TWO:Rs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new E,this._lastQuaternion=new Fe,this._lastTargetPosition=new E,this._quat=new Fe().setFromUnitVectors(e.up,new E(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Ah,this._sphericalDelta=new Ah,this._scale=1,this._panOffset=new E,this._rotateStart=new ue,this._rotateEnd=new ue,this._rotateDelta=new ue,this._panStart=new ue,this._panEnd=new ue,this._panDelta=new ue,this._dollyStart=new ue,this._dollyEnd=new ue,this._dollyDelta=new ue,this._dollyDirection=new E,this._mouse=new ue,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=qx.bind(this),this._onPointerDown=Xx.bind(this),this._onPointerUp=jx.bind(this),this._onContextMenu=ey.bind(this),this._onMouseWheel=$x.bind(this),this._onKeyDown=Zx.bind(this),this._onTouchStart=Jx.bind(this),this._onTouchMove=Qx.bind(this),this._onMouseDown=Kx.bind(this),this._onMouseMove=Yx.bind(this),this._interceptControlDown=ty.bind(this),this._interceptControlUp=ny.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(lu),this.update(),this.state=lt.NONE}update(e=null){const t=this.object.position;Pt.copy(t).sub(this.target),Pt.applyQuaternion(this._quat),this._spherical.setFromVector3(Pt),this.autoRotate&&this.state===lt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,i=this.maxAzimuthAngle;isFinite(n)&&isFinite(i)&&(n<-Math.PI?n+=sn:n>Math.PI&&(n-=sn),i<-Math.PI?i+=sn:i>Math.PI&&(i-=sn),n<=i?this._spherical.theta=Math.max(n,Math.min(i,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+i)/2?Math.max(n,this._spherical.theta):Math.min(i,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Pt.setFromSpherical(this._spherical),Pt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Pt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Pt.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const a=new E(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new E(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Pt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(vo.origin.copy(this.object.position),vo.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(vo.direction))<Gx?this.object.lookAt(this.target):(cu.setFromNormalAndCoplanarPoint(this.object.up,this.target),vo.intersectPlane(cu,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Oa||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Oa||this._lastTargetPosition.distanceToSquared(this.target)>Oa?(this.dispatchEvent(lu),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?sn/60*this.autoRotateSpeed*e:sn/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Pt.setFromMatrixColumn(t,0),Pt.multiplyScalar(-e),this._panOffset.add(Pt)}_panUp(e,t){this.screenSpacePanning===!0?Pt.setFromMatrixColumn(t,1):(Pt.setFromMatrixColumn(t,0),Pt.crossVectors(this.object.up,Pt)),Pt.multiplyScalar(e),this._panOffset.add(Pt)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const i=this.object.position;Pt.copy(i).sub(this.target);let r=Pt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),i=e-n.left,r=t-n.top,o=n.width,a=n.height;this._mouse.x=i/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(sn*this._rotateDelta.x/t.clientHeight),this._rotateUp(sn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._rotateStart.set(n,i)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panStart.set(n,i)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,r=Math.sqrt(n*n+i*i);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(i,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(sn*this._rotateDelta.x/t.clientHeight),this._rotateUp(sn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panEnd.set(n,i)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,r=Math.sqrt(n*n+i*i);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new ue,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function Xx(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s)))}function qx(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function jx(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Md),this.state=lt.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Kx(s){let e;switch(s.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Ds.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=lt.DOLLY;break;case Ds.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=lt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=lt.ROTATE}break;case Ds.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=lt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=lt.PAN}break;default:this.state=lt.NONE}this.state!==lt.NONE&&this.dispatchEvent(vc)}function Yx(s){switch(this.state){case lt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case lt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case lt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function $x(s){this.enabled===!1||this.enableZoom===!1||this.state!==lt.NONE||(s.preventDefault(),this.dispatchEvent(vc),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(Md))}function Zx(s){this.enabled!==!1&&this._handleKeyDown(s)}function Jx(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case Rs.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=lt.TOUCH_ROTATE;break;case Rs.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=lt.TOUCH_PAN;break;default:this.state=lt.NONE}break;case 2:switch(this.touches.TWO){case Rs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=lt.TOUCH_DOLLY_PAN;break;case Rs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=lt.TOUCH_DOLLY_ROTATE;break;default:this.state=lt.NONE}break;default:this.state=lt.NONE}this.state!==lt.NONE&&this.dispatchEvent(vc)}function Qx(s){switch(this._trackPointer(s),this.state){case lt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case lt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case lt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case lt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=lt.NONE}}function ey(s){this.enabled!==!1&&s.preventDefault()}function ty(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function ny(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class iy extends $u{constructor(){super();const e=new Fi;e.deleteAttribute("uv");const t=new pi({side:jt}),n=new pi,i=new ud(16777215,900,28,2);i.position.set(.418,16.199,.3),this.add(i);const r=new $e(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const o=new Qu(e,n,6),a=new ht;a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),a.updateMatrix(),o.setMatrixAt(0,a.matrix),a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),a.updateMatrix(),o.setMatrixAt(1,a.matrix),a.position.set(6.167,.857,7.803),a.rotation.set(0,.561,0),a.scale.set(3.927,6.285,3.687),a.updateMatrix(),o.setMatrixAt(2,a.matrix),a.position.set(-2.017,.018,6.124),a.rotation.set(0,.333,0),a.scale.set(2.002,4.566,2.064),a.updateMatrix(),o.setMatrixAt(3,a.matrix),a.position.set(2.291,-.756,-2.621),a.rotation.set(0,-.286,0),a.scale.set(1.546,1.552,1.496),a.updateMatrix(),o.setMatrixAt(4,a.matrix),a.position.set(-2.193,-.369,-5.547),a.rotation.set(0,.516,0),a.scale.set(3.875,3.487,2.986),a.updateMatrix(),o.setMatrixAt(5,a.matrix),this.add(o);const l=new $e(e,Es(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);const c=new $e(e,Es(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);const h=new $e(e,Es(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);const u=new $e(e,Es(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);const d=new $e(e,Es(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);const f=new $e(e,Es(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function Es(s){return new Fp({color:0,emissive:16777215,emissiveIntensity:s})}const or=new E;function _n(s,e,t,n,i,r){const o=2*Math.PI*i/4,a=Math.max(r-2*i,0),l=Math.PI/4;or.copy(e),or[n]=0,or.normalize();const c=.5*o/(o+a),h=1-or.angleTo(s)/l;return Math.sign(or[t])===1?h*c:a/(o+a)+c+c*(1-h)}class dn extends Fi{constructor(e=1,t=1,n=1,i=2,r=.1){const o=i*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,o,o,o),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:i,radius:r},o===1)return;const a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;const l=new E,c=new E,h=new E(e,t,n).divideScalar(2).subScalar(r),u=this.attributes.position.array,d=this.attributes.normal.array,f=this.attributes.uv.array,g=u.length/6,_=new E,m=.5/o;for(let p=0,S=0;p<u.length;p+=3,S+=2)switch(l.fromArray(u,p),c.copy(l),c.x-=Math.sign(c.x)*m,c.y-=Math.sign(c.y)*m,c.z-=Math.sign(c.z)*m,c.normalize(),u[p+0]=h.x*Math.sign(l.x)+c.x*r,u[p+1]=h.y*Math.sign(l.y)+c.y*r,u[p+2]=h.z*Math.sign(l.z)+c.z*r,d[p+0]=c.x,d[p+1]=c.y,d[p+2]=c.z,Math.floor(p/g)){case 0:_.set(1,0,0),f[S+0]=_n(_,c,"z","y",r,n),f[S+1]=1-_n(_,c,"y","z",r,t);break;case 1:_.set(-1,0,0),f[S+0]=1-_n(_,c,"z","y",r,n),f[S+1]=1-_n(_,c,"y","z",r,t);break;case 2:_.set(0,1,0),f[S+0]=1-_n(_,c,"x","z",r,e),f[S+1]=_n(_,c,"z","x",r,n);break;case 3:_.set(0,-1,0),f[S+0]=1-_n(_,c,"x","z",r,e),f[S+1]=1-_n(_,c,"z","x",r,n);break;case 4:_.set(0,0,1),f[S+0]=1-_n(_,c,"x","y",r,e),f[S+1]=1-_n(_,c,"y","x",r,t);break;case 5:_.set(0,0,-1),f[S+0]=_n(_,c,"x","y",r,e),f[S+1]=1-_n(_,c,"y","x",r,t);break}}static fromJSON(e){return new dn(e.width,e.height,e.depth,e.segments,e.radius)}}const Ba="./",ri=new E(0,0,1),Li=Hn.clamp,bt=Object.freeze({left:Object.freeze([.085,-.026,0]),right:Object.freeze([.085,.026,0]),proximalShaftZ:-.095,lateralBallOffset:.06,clevisDepth:.075,clevisRadius:.0035}),rn=(s,e=.65,t=.35)=>new pi({color:s,metalness:e,roughness:t});function dt(s,e,t,n=[0,0,0]){const i=new $e(e,t);return i.position.set(...n),i.castShadow=i.receiveShadow=!0,i.layers.set(0),s.add(i),i}function sy(s,e){const t=new Ye;t.name="Concept_Custom_Quick_Change_Instrument_Coupler",s.add(t);const n=rn("#a8b4b5",.78,.3),i=rn("#1b2529",.18,.5);dt(t,new dn(.034,.039,.051,2,.004),i,[0,0,-.022]);const r=dt(t,new qt(.012,.013,.029,24),n,[0,0,.013]);r.rotation.x=Math.PI/2;for(const o of[-.045,.027])dt(t,new Tn(.013,.0017,8,28),n,[0,0,o]);dt(t,new Tn(.0134,.0012,8,28),rn(e,.22,.42),[0,0,.021]);for(const o of[-.012,.012])for(const a of[-.015,.015]){const l=dt(t,new qt(.0017,.0017,.002,8),n,[o,a,-.048]);l.rotation.x=Math.PI/2}return t}function ry(s,e,t){const n=new Ye;n.name=`Concept_${e}_Proximal_Shaft_Clamp`,n.position.z=bt.proximalShaftZ,s.add(n);const i=rn("#b2c0c3",.76,.28),r=rn("#26373a",.15,.54),o=dt(n,new dn(.021,.025,.029,2,.003),r);o.name="Custom_Shaft_Clamp_Housing";for(const u of[-.012,.012])dt(n,new Tn(.0071,.0017,8,24),i,[0,0,u]);const a=e==="left"?-1:1,l=new Ye;l.name="Custom_Fixed_Size_Palm_Clearance_Clevis",n.add(l);for(const u of[0,a*bt.lateralBallOffset])dt(l,new qt(bt.clevisRadius,bt.clevisRadius,bt.clevisDepth,12),i,[u,bt.clevisDepth*.5,0]);const c=dt(l,new qt(bt.clevisRadius,bt.clevisRadius,bt.lateralBallOffset,12),i,[a*bt.lateralBallOffset*.5,bt.clevisDepth,0]);c.rotation.z=Math.PI/2;for(const u of[0,a*bt.lateralBallOffset])dt(l,new Ui(bt.clevisRadius,12,8),i,[u,bt.clevisDepth,0]);const h=dt(n,new Ui(.008,18,12),i,[a*bt.lateralBallOffset,0,0]);return h.name="Custom_Passive_Universal_Grip_Ball",dt(n,new Tn(.0073,.0012,6,20),rn(t,.2,.43),[0,0,-.014]),n}function oy(s,e){s.updateWorldMatrix(!0,!0);const t=s.matrixWorld.clone().invert(),n=new Ue,i=new E,r=new Map;return s.traverse(o=>{if(!o.isMesh)return;n.multiplyMatrices(t,o.matrixWorld);const a=o.geometry.attributes.position;for(let l=0;l<a.count;l++){i.fromBufferAttribute(a,l).applyMatrix4(n);const c=`${Math.floor(i.x/.008)},${Math.floor(i.y/.008)},${Math.floor(i.z/.008)}`;r.has(c)||r.set(c,[i.x-e[0],i.y-e[1],i.z-e[2]])}}),new Float64Array([...r.values()].flat())}function hu(s,e,t){const n=Math.cos(e),i=Math.sin(e),r=bt.clevisDepth;let o=1/0;for(let a=0;a<s.length;a+=3){const l=s[a],c=s[a+2]-bt.proximalShaftZ,h=s[a+1]*n+c*i,u=-s[a+1]*i+c*n,d=Math.max(0,-h,h-r),f=Math.max(Math.min(0,t)-l,0,l-Math.max(0,t));o=Math.min(o,l*l+d*d+u*u,(l-t)**2+d*d+u*u,f*f+(h-r)**2+u*u)}return Math.sqrt(o)}function ay(s,e,t){const n=new Ye;n.name=`Concept_${e}_Strapped_Palm_Grip`,s.add(n);const i=e==="left"?-1:1,r=rn("#1f3032",.12,.62),o=rn("#afbdc0",.72,.3),a=dt(n,new qt(.0105,.0105,.061,20),r);a.rotation.x=Math.PI/2,a.name="Custom_Palm_Transverse_Grip_Bar";for(const l of[-.03,.03])dt(n,new Ui(.0107,12,8),r,[0,0,l]);dt(n,new dn(.049,.008,.061,2,.004),o,[-.03,-i*.008,0]);for(const l of[-.052,-.015]){dt(n,new dn(.009,.004,.066,2,.0015),r,[l,-i*.011,0]),dt(n,new dn(.009,.004,.066,2,.0015),r,[l,-i*.044,0]);for(const c of[-.031,.031])dt(n,new dn(.009,.037,.004,2,.0015),r,[l,-i*.0275,c])}return dt(n,new Tn(.0085,.0016,8,24),rn(t,.25,.4)),n}async function xo(s,e){const[t,n]=await Promise.all([fetch(`${Ba}assets/${e}.glb`),fetch(`${Ba}assets/${e}-kinematics.json`)]);if(!t.ok||!n.ok)throw new Error(`无法载入真实模型：${e}`);const[i,r]=await Promise.all([t.arrayBuffer(),n.json()]),o=await s.parseAsync(i,`${Ba}assets/`),a=new Ye;a.name=`Authentic_${e}`,a.add(o.scene),a.traverse(c=>{c.isMesh&&(c.castShadow=!0,c.receiveShadow=!0,e==="endoscope"||e==="z1"?c.layers.set(0):c.layers.enable(1),e!=="z1"&&(c.material.roughness=.32,c.material.metalness=.78))});const l=new Map;for(const c of r.joints){const h=a.getObjectByName(c.name);h&&l.set(c.name,{node:h,specification:c,rest:h.quaternion.clone(),axis:new E(...c.axis),angle:0})}return{name:e,group:a,joints:l,metadata:r}}const ly=new Fe;function Cn(s,e,t,n=!1){const i=s.joints.get(e);if(!i||i.specification.type==="fixed")return;const r=i.specification.limit;if(!Number.isFinite(t))return;i.angle=n?t:Li(t,r?.lower??-Math.PI,r?.upper??Math.PI);const o=s.frameBounds?.get(e);o&&(i.angle=Li(i.angle,o.lower,o.upper));const a=Math.atan2(Math.sin(i.angle),Math.cos(i.angle));i.node.quaternion.copy(i.rest).multiply(ly.setFromAxisAngle(i.axis,a))}class uu{constructor(e){Object.assign(this,e),this.tipNode=this.group.getObjectByName("tool_tip_link"),this.tipPosition=new E,this.cuttingDirection=new E(0,0,1),this.tipQuaternion=new Fe,this.handlePosition=new E,this.gripPosition=new E,this.gripLocal=new E(e.name==="needle-driver"?-bt.lateralBallOffset:bt.lateralBallOffset,0,bt.proximalShaftZ),this.shaftDirection=new E,this.rcmError=0,this.localTip=new E,this.desired=new E,this.port=new E,this.delta=new E,this.localFromPort=new E,this.alignment=new Fe,this.compensation=new Fe,this.inverseRoot=new Ue,this.scratch=new E,this.previousDirection=new E(0,0,-1),this.transport=new Fe,this.nextAlignment=new Fe,this.initialized=!1,this.rcmFeasible=!0,this.coupler=sy(this.group,e.name==="needle-driver"?"#5faaa9":"#c3a46b"),this.proximalGrip=ry(this.group,e.name==="needle-driver"?"left":"right",e.name==="needle-driver"?"#5faaa9":"#c3a46b")}update(e){Cn(this,"roll",e.wrist[2],!0),Cn(this,"wrist_pitch",e.wrist[0],!0),Cn(this,"wrist_yaw",e.wrist[1],!0);const t=Li(e.jaw,0,1)*1.1;Cn(this,"jaw",t),Cn(this,"jaw_1",t*.5),Cn(this,"jaw_2",-t*.5),this.group.updateWorldMatrix(!0,!0),this.inverseRoot.copy(this.group.matrixWorld).invert(),this.tipNode.getWorldPosition(this.localTip).applyMatrix4(this.inverseRoot),this.desired.fromArray(e.position),this.port.fromArray(e.port),this.delta.subVectors(this.desired,this.port);const n=this.delta.lengthSq(),i=this.localTip.x**2+this.localTip.y**2;this.rcmFeasible=n+1e-12>=i;const r=Math.sqrt(Math.max(1e-10,n-i));if(this.localFromPort.set(this.localTip.x,this.localTip.y,r).normalize(),n>1e-12){if(this.delta.normalize(),!this.initialized)this.alignment.setFromUnitVectors(ri,this.delta);else{this.nextAlignment.copy(this.alignment).premultiply(this.transport.setFromUnitVectors(this.previousDirection,this.delta));const o=Hn.smoothstep(Math.sqrt(n),.003,.02);this.alignment.slerp(this.nextAlignment,o)}this.previousDirection.copy(ri).applyQuaternion(this.alignment),this.initialized=!0}else this.initialized||(this.alignment.setFromUnitVectors(ri,this.previousDirection),this.initialized=!0);this.compensation.setFromUnitVectors(this.localFromPort,ri),this.group.quaternion.copy(this.alignment).multiply(this.compensation),this.scratch.copy(this.localTip).applyQuaternion(this.group.quaternion),this.group.position.copy(this.desired).sub(this.scratch),this.group.updateWorldMatrix(!0,!0),this.tipNode.getWorldPosition(this.tipPosition),this.tipNode.getWorldQuaternion(this.tipQuaternion),this.cuttingDirection.copy(ri).applyQuaternion(this.tipQuaternion).normalize(),this.handlePosition.copy(this.group.position),this.gripPosition.copy(this.gripLocal).applyQuaternion(this.group.quaternion).add(this.group.position),this.shaftDirection.copy(ri).applyQuaternion(this.group.quaternion),this.scratch.subVectors(this.port,this.group.position),this.scratch.addScaledVector(this.shaftDirection,-this.scratch.dot(this.shaftDirection)),this.rcmError=this.scratch.length()}}class cy{constructor(e){Object.assign(this,e),this.tipNode=this.group.getObjectByName("tip_link"),this.tipPosition=new E,this.handlePosition=new E,this.desired=new E,this.direction=new E,this.previousDirection=new E(0,-1,0),this.transport=new Fe,this.alignment=new Fe,this.initialized=!1,this.supportPosition=new E,this.offset=new E(...e.metadata.tipPositionAtZero),this.scratch=new E,this.roll=new Fe}update(e){this.desired.fromArray(e.position),this.direction.fromArray(e.port).sub(this.desired).negate(),this.direction.lengthSq()<1e-12?this.direction.copy(this.previousDirection):this.direction.normalize(),this.initialized?this.alignment.premultiply(this.transport.setFromUnitVectors(this.previousDirection,this.direction)):this.alignment.setFromUnitVectors(ri,this.direction),this.previousDirection.copy(this.direction),this.initialized=!0,this.group.quaternion.copy(this.alignment).multiply(this.roll.setFromAxisAngle(ri,e.roll)),this.group.position.copy(this.desired).sub(this.scratch.copy(this.offset).applyQuaternion(this.group.quaternion)),this.group.updateWorldMatrix(!0,!0),this.tipNode.getWorldPosition(this.tipPosition),this.handlePosition.copy(this.group.position),this.supportPosition.fromArray(e.port).addScaledVector(this.direction,-.1)}}class hy{constructor(e,t){Object.assign(this,e),this.mount=new Ye,this.mount.name="Custom_G1_Chest_Adapter",this.mount.position.set(0,1.17,.47),this.mount.rotation.x=-Math.PI/2,this.mount.add(this.group),t.add(this.mount);const n=rn("#8f9ea1",.78,.32),i=rn("#263336",.2,.56);dt(this.mount,new dn(.14,.014,.12,2,.005),i,[0,-.09,0]).name="Custom_Chest_Backplate",dt(this.mount,new dn(.105,.012,.085,2,.004),n).name="Custom_Z1_Baseplate";for(const o of[-.047,.047])for(const a of[-.034,.034])dt(this.mount,new qt(.006,.006,.086,12),n,[o,-.047,a]),dt(this.mount,new qt(.004,.004,.004,8),i,[o,.008,a]);const r=dt(this.mount,new Tn(.034,.003,8,32),i,[0,.008,0]);r.rotation.x=Math.PI/2,this.end=new ht,this.end.name="Custom_Endoscope_Coupler_TCP",this.end.position.set(.027,0,0),this.group.getObjectByName("link06").add(this.end),this.chain=[...this.joints.values()].filter(o=>o.specification.type==="revolute"),this.position=new E,this.pivot=new E,this.axis=new E,this.toEnd=new E,this.toTarget=new E,this.cross=new E,this.quaternion=new Fe,this.lastTarget=new E(1/0,1/0,1/0),this.accumulated=0,this.initialized=!1,this.error=0,this.stallTime=0,this.recoveryCooldown=0,this.recoveryPose=null,this.recoveries=0,this.baseInverse=new Ue,this.baseTarget=new E,this.frameBounds=null,[0,1.4,-1.8,.35,0,0].forEach((o,a)=>Cn(this,`joint${a+1}`,o))}solve(e,t,n=.18){for(let i=0;i<t;i++){for(let r=this.chain.length-1;r>=0;r--){const o=this.chain[r];if(this.mount.updateWorldMatrix(!0,!0),o.node.getWorldPosition(this.pivot),this.end.getWorldPosition(this.position),o.node.getWorldQuaternion(this.quaternion),this.axis.copy(o.axis).applyQuaternion(this.quaternion).normalize(),this.toEnd.subVectors(this.position,this.pivot),this.toTarget.subVectors(e,this.pivot),this.toEnd.addScaledVector(this.axis,-this.toEnd.dot(this.axis)),this.toTarget.addScaledVector(this.axis,-this.toTarget.dot(this.axis)),this.toEnd.lengthSq()<1e-12||this.toTarget.lengthSq()<1e-12)continue;this.toEnd.normalize(),this.toTarget.normalize(),this.cross.crossVectors(this.toEnd,this.toTarget);const a=Math.atan2(this.axis.dot(this.cross),Li(this.toEnd.dot(this.toTarget),-1,1));Cn(this,o.specification.name,o.angle+Li(a,-n,n))}if(this.mount.updateWorldMatrix(!0,!0),this.end.getWorldPosition(this.position),this.position.distanceToSquared(e)<1e-8)break}this.end.getWorldPosition(this.position),this.error=this.position.distanceTo(e)}recover(e){const t=this.chain.map(l=>l.angle),n=this.frameBounds;this.frameBounds=null,this.mount.updateWorldMatrix(!0,!0),this.baseInverse.copy(this.group.getObjectByName("link00").matrixWorld).invert(),this.baseTarget.copy(e).applyMatrix4(this.baseInverse);let i=Math.atan2(-this.baseTarget.y,-this.baseTarget.x);i=Math.atan2(Math.sin(i),Math.cos(i));const r=[[i,.35,-1.3,0,0,0],[i,1.4,-2,.3,0,0],[i,2.6,-2,-.8,0,0],[i,1,-.5,-.8,.7,0],[i,.04,-.65,1.45,0,0],[i,.15,-1.25,1.45,-.6,0]];let o=this.error,a=null;for(const l of r)if(l.forEach((c,h)=>Cn(this,`joint${h+1}`,c)),this.solve(e,36,.3),this.error<o&&(o=this.error,a=this.chain.map(c=>c.angle)),o<2e-4)break;t.forEach((l,c)=>Cn(this,this.chain[c].specification.name,l)),this.frameBounds=n,this.mount.updateWorldMatrix(!0,!0),this.end.getWorldPosition(this.position),this.error=this.position.distanceTo(e),a&&o<this.error*.65&&(this.recoveryPose=a,this.recoveries++),this.recoveryCooldown=.65,this.stallTime=0}update(e,t){const n=Math.min(.1,Math.max(0,t||0));if(this.accumulated+=n,this.recoveryCooldown=Math.max(0,this.recoveryCooldown-n),!this.initialized)this.solve(e,80,.25),this.initialized=!0,this.accumulated=0,this.error>.003&&this.recover(e);else if(this.accumulated>=1/30){const i=this.accumulated;if(this.accumulated=0,this.frameBounds=new Map(this.chain.map(r=>{const o=(r.specification.limit?.velocity??Math.PI)*i;return[r.specification.name,{lower:r.angle-o,upper:r.angle+o}]})),this.recoveryPose){let r=0;for(let o=0;o<this.chain.length;o++){const a=this.chain[o],l=this.recoveryPose[o]-a.angle;r+=Math.abs(l),Cn(this,a.specification.name,a.angle+Li(l,-2.4*i,2.4*i))}r<.025&&(this.recoveryPose=null)}this.recoveryPose?(this.mount.updateWorldMatrix(!0,!0),this.end.getWorldPosition(this.position),this.error=this.position.distanceTo(e)):this.solve(e,4),this.error<.002?(this.stallTime=0,this.recoveryPose=null):(this.stallTime+=i,!this.recoveryPose&&this.stallTime>.18&&this.recoveryCooldown===0&&this.recover(e)),this.frameBounds=null}this.lastTarget.copy(e)}}async function uy(s){const e=new Ro,[t,n,i,r]=await Promise.all([xo(e,"needle-driver"),xo(e,"scissors"),xo(e,"endoscope"),xo(e,"z1")]),o={left:new uu(t),right:new uu(n)},a=new cy(i),l=new hy(r,s);s.add(o.left.group,o.right.group,a.group);const c=new Ye;c.name="Concept_Virtual_Master_Slave_Connections",s.add(c);const h={};for(const[_,m]of[["left","#5eaaa9"],["right","#b9a06f"]]){const p=new Ut;p.setAttribute("position",new ct(new Float32Array(6),3));const S=new Wo(p,new zp({color:m,transparent:!0,opacity:.6,dashSize:.012,gapSize:.009,depthWrite:!1}));S.name=`Concept_${_}_Virtual_Teleoperation_Link`,S.layers.set(0);const y=dt(c,new Tn(.014,.0024,8,24),rn(m,.28,.4));y.name=`Concept_${_}_Master_Grip_Indicator`,S.visible=y.visible=!1,c.add(S);const M=ay(c,_,m);M.visible=!1,h[_]={line:S,controller:y,saddle:M,clevis:o[_].proximalGrip.getObjectByName("Custom_Fixed_Size_Palm_Clearance_Clevis"),sourceHand:null,cloud:null,transformed:null,inverse:new Fe,relative:new Fe,point:new E,origin:new E,initialized:!1}}const u=new Ye;u.name="Custom_Universal_Endoscope_Shaft_Clamp",s.add(u),dt(u,new Tn(.0065,.002,8,28),rn("#879b9d",.78,.3)),dt(u,new dn(.014,.011,.016,2,.002),rn("#28373a",.2,.52),[.011,0,0]);let d=!1,f=1/60;const g={loaded:!0,toolNames:Object.freeze({left:"持针钳",right:"单极弯剪"}),tools:o,scope:a,scopeArm:l,scopeMount:l.mount,scopeArmError:0,scopeHandlePosition:a.handlePosition,scopeSupportPosition:a.supportPosition,toolTipPositions:{left:o.left.tipPosition,right:o.right.tipPosition},toolDirections:{left:o.left.cuttingDirection,right:o.right.cuttingDirection},toolHandlePositions:{left:o.left.handlePosition,right:o.right.handlePosition},toolGripPositions:{left:o.left.gripPosition,right:o.right.gripPosition},handGripPositions:{left:new E,right:new E},handGripQuaternions:{left:new Fe,right:new Fe},toolRCMErrors:{left:0,right:0},toolRCMFeasible:{left:!0,right:!0},connectionModes:{left:"direct",right:"direct"},conceptDecoupled:!1,resetPose(){o.left.initialized=o.right.initialized=a.initialized=!1,l.initialized=!1,l.recoveryPose=null,l.accumulated=0,l.frameBounds=null,l.stallTime=0,l.recoveryCooldown=0;for(const _ of Object.values(h))_.initialized=!1},connectHands(_,m,p){g.conceptDecoupled=!1;for(const S of["left","right"]){const y=h[S],M=_[S],R=(m[S]??0)>.003;if(g.connectionModes[S]=R?"virtual":"direct",g.conceptDecoupled||=R,y.line.visible=y.controller.visible=R,!M)continue;const P=o[S].gripPosition,w=y.line.geometry.attributes.position;w.setXYZ(0,M.x,M.y,M.z),w.setXYZ(1,P.x,P.y,P.z),w.needsUpdate=!0,y.line.computeLineDistances(),y.line.geometry.computeBoundingSphere(),y.controller.position.copy(M);const C=p?.[S]??o[S].group.quaternion;if(y.controller.quaternion.copy(C),y.saddle.visible=!0,y.saddle.position.copy(M),y.saddle.quaternion.copy(C),g.handGripPositions[S].copy(M),g.handGripQuaternions[S].copy(C),y.sourceHand??=s.getObjectByName(`${S}_rubber_hand`),y.sourceHand&&!y.cloud&&(y.cloud=oy(y.sourceHand,bt[S]),y.transformed=new Float64Array(y.cloud.length)),y.cloud){y.inverse.copy(o[S].group.quaternion).invert(),y.relative.copy(y.inverse).multiply(C),y.origin.copy(M).sub(o[S].group.position).applyQuaternion(y.inverse);for(let I=0;I<y.cloud.length;I+=3)y.point.fromArray(y.cloud,I).applyQuaternion(y.relative).add(y.origin),y.point.toArray(y.transformed,I);const v=y.clevis.rotation.x,x=o[S].gripLocal.x;let A=v,L=hu(y.transformed,v,x);if(L<.01)for(let I=1;I<=128;I++){const B=v+Math.ceil(I/2)*(I%2?1:-1)*Math.PI/64,O=hu(y.transformed,B,x);if(O>L&&(L=O,A=B),O>=.01)break}const U=Math.atan2(Math.sin(A-v),Math.cos(A-v));y.clevis.rotation.x=y.initialized?v+Li(U,-4.8*f,4.8*f):A,y.initialized=!0}}},update(_,m=1/60){if(!d){f=Li(Number.isFinite(m)?m:1/60,.001,.05);for(const p of["left","right"])o[p].update(_.tools[p]),g.toolRCMErrors[p]=o[p].rcmError,g.toolRCMFeasible[p]=o[p].rcmFeasible;a.update(_.scope),l.update(a.supportPosition,m),g.scopeArmError=l.error,u.position.copy(a.supportPosition),u.quaternion.setFromUnitVectors(ri,a.direction)}},dispose(){if(d)return;d=!0;const _=new Set,m=new Set;for(const p of[o.left.group,o.right.group,a.group,l.mount,c,u])p.removeFromParent(),p.traverse(S=>{if(S.geometry&&_.add(S.geometry),S.material)for(const y of Array.isArray(S.material)?S.material:[S.material])m.add(y)});_.forEach(p=>p.dispose()),m.forEach(p=>p.dispose())}};return g}const ar={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`},dy=new qo(-1,1,1,-1,0,1);class fy extends Ut{constructor(){super(),this.setAttribute("position",new pt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new pt([0,2,0,0,2,0],2))}}const py=new fy;class my{constructor(e){this._mesh=new $e(py,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,dy)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class gy{constructor(e,t=1.1){const n=e.extensions?.has("EXT_color_buffer_float")??!1;this.target=new Ii(1,1,{type:n?Xs:Un,minFilter:Qt,magFilter:Qt,depthBuffer:!0}),this.target.texture.colorSpace=Kt,this.target.texture.name="Linear_Real_Time_Endoscope_Feed";const i=Il.clone(ar.uniforms);i.tDiffuse.value=this.target.texture,i.toneMappingExposure.value=t,this.outputMaterial=new Mh({...ar,uniforms:i,defines:{ACES_FILMIC_TONE_MAPPING:"",SRGB_TRANSFER:""},depthTest:!1,depthWrite:!1,toneMapped:!1});const r=Il.clone(ar.uniforms);r.tDiffuse.value=this.target.texture,r.toneMappingExposure.value=t,r.feedAspect={value:1},r.screenAspect={value:1.6},this.monitorMaterial=new Mh({...ar,uniforms:r,defines:{ACES_FILMIC_TONE_MAPPING:"",SRGB_TRANSFER:""},toneMapped:!1,fragmentShader:ar.fragmentShader.replace("varying vec2 vUv;",`varying vec2 vUv;
uniform float feedAspect;
uniform float screenAspect;`).replace("gl_FragColor = texture2D( tDiffuse, vUv );",`vec2 feedUV=vUv;
float fit=screenAspect/feedAspect;
if(fit>1.0)feedUV.x=(feedUV.x-.5)*fit+.5;else feedUV.y=(feedUV.y-.5)/fit+.5;
if(any(lessThan(feedUV,vec2(0.0)))||any(greaterThan(feedUV,vec2(1.0)))){gl_FragColor=vec4(.008,.012,.016,1.0);return;}
gl_FragColor = texture2D( tDiffuse, feedUV );`)}),this.quad=new my(this.outputMaterial),this.resolution={width:1,height:1},this.disposed=!1}capture(e,t,n,i,r){const o=e.getPixelRatio(),a=Math.max(1,Math.round(i*o)),l=Math.max(1,Math.round(r*o));(this.target.width!==a||this.target.height!==l)&&this.target.setSize(a,l),this.resolution={width:a,height:l},n.aspect=i/Math.max(1,r),n.updateProjectionMatrix(),this.monitorMaterial.uniforms.feedAspect.value=n.aspect;const c=e.getRenderTarget(),h=e.getScissorTest();try{e.setRenderTarget(this.target),e.setScissorTest(!1),e.clear(),e.render(t,n)}finally{e.setRenderTarget(c),e.setScissorTest(h)}}blit(e,t,n,i,r){const o=e.getViewport(new et),a=e.getScissor(new et),l=e.getScissorTest(),c=e.autoClear;try{e.autoClear=!1,e.setViewport(t,n,i,r),e.setScissorTest(!0),e.setScissor(t,n,i,r),this.quad.render(e)}finally{e.autoClear=c,e.setViewport(o),e.setScissor(a),e.setScissorTest(l)}}dispose(){this.disposed||(this.disposed=!0,this.target.dispose(),this.outputMaterial.dispose(),this.monitorMaterial.dispose(),this.quad.dispose())}}const Bt=(s,e=0,t=.6)=>new pi({color:s,metalness:e,roughness:t});function xt(s,e,t,n,i=.012){const r=new $e(new dn(...e,2,Math.min(i,...e.map(o=>o*.4))),n);return r.position.set(...t),r.castShadow=r.receiveShadow=!0,s.add(r),r}function Ei(s,e,t,n,i){const r=new E(...e),o=new E(...t),a=o.clone().sub(r),l=new $e(new qt(n,n,a.length(),12),i);return l.position.copy(r).add(o).multiplyScalar(.5),l.quaternion.setFromUnitVectors(new E(0,1,0),a.normalize()),l.castShadow=l.receiveShadow=!0,s.add(l),l}function du(s,e,t,n,i="#405a61"){const r=document.createElement("canvas");r.width=768,r.height=128;const o=r.getContext("2d");o.fillStyle="#dce6e5",o.fillRect(0,0,768,128),o.fillStyle=i,o.font="500 40px sans-serif",o.textAlign="center",o.fillText(e,384,80);const a=new td(r);a.colorSpace=Ct;const l=new $e(new Ni(...t),new bn({map:a}));return l.position.set(...n),s.add(l),l}function _y(s,e){const t=new Ye;t.name="Surgical_Theatre",s.add(t);const n=Bt("#dbe5e4",.08,.54),i=Bt("#cbdcdb",.02,.9),r=Bt("#8aa8a8",.25,.5),o=Bt("#adbfc2",.8,.28),a=Bt("#344b54",.3,.44),l=Bt("#23343a",.05,.8),c=Bt("#4e8e93",0,.94),h=Bt("#96b5b2",.03,.81),u=new $e(new Ni(7,7),h);u.rotation.x=-Math.PI/2,u.receiveShadow=!0,t.add(u),xt(t,[4.8,2.65,.08],[0,1.325,1.75],i),xt(t,[.08,2.65,3.4],[2.4,1.325,.1],Bt("#d9e3e1",0,.9)),xt(t,[4.8,.11,.055],[0,.055,1.69],r);for(const w of[-2,-1.2,-.4,.4,1.2,2])xt(t,[.003,2.42,.006],[w,1.35,1.704],Bt("#b7cecb",.1,.8),.001);const d=new Ye;d.name="Adjustable_Operating_Table",t.add(d),xt(d,[.62,.065,1.4],[0,.875,-.41],o,.025),xt(d,[.59,.05,1.38],[0,.934,-.4],Bt("#3c5d63",0,.73),.025),xt(d,[.27,.66,.39],[0,.43,-.12],n,.025),xt(d,[.7,.06,.7],[0,.07,-.12],a,.025);for(const w of[-.29,.29])for(const C of[-.38,.14]){const v=new $e(new qt(.045,.045,.027,18),l);v.position.set(w,.045,C),v.rotation.z=Math.PI/2,d.add(v)}for(const w of[-.33,.33])Ei(d,[w,.85,-.93],[w,.85,.22],.009,o);const f=xt(d,[.26,.055,.23],[0,.985,-.49],Bt("#d7e7e4",0,.96),.045);f.rotation.x=.05;const g=new Ye;g.name="G1_Stable_Mounting_Platform",t.add(g),xt(g,[.6,.29,.58],[0,.145,.51],Bt("#708b8d",.55,.44)),xt(g,[.59,.01,.57],[0,.295,.51],l,.008);for(const w of[-.285,.285])xt(g,[.006,.003,.54],[w,.302,.51],Bt("#c4b784",.3,.6),.001);const _=new Ye;_.name="Live_Endoscopic_Monitor",_.position.set(-.73,1.38,-.4),_.rotation.y=2.15,t.add(_),xt(_,[.35,.24,.027],[0,0,0],l,.012);const m=new $e(new Ni(.32,.2),e);m.position.z=.0145,m.name="Same_Frame_Endoscopic_LCD",_.add(m);const p=new $e(new Ui(.0025,8,6),new bn({color:"#69dda8"}));p.position.set(.145,-.108,.015),_.add(p),Ei(t,[-.73,.1,-.4],[-.73,1.27,-.4],.012,o),xt(t,[.35,.035,.29],[-.73,.09,-.4],a),du(_,"MIRA  |  LIVE ENDOSCOPE",[.25,.033],[0,-.103,.015],"#405b58");const S=new Ye;S.position.set(-1.57,0,1.45),S.name="Sealed_Clinical_Storage",t.add(S),xt(S,[.85,1.78,.42],[0,.92,0],n,.015);for(const w of[-.21,.21])xt(S,[.404,1.65,.018],[w,.95,-.22],Bt("#c9d9d7",.02,.58)),Ei(S,[w+(w>0?-.14:.14),.9,-.243],[w+(w>0?-.14:.14),1.14,-.243],.006,o);const y=new Ye;y.position.set(1.31,0,1.69),t.add(y),xt(y,[.98,2.2,.025],[0,1.12,0],r,.008),xt(y,[.9,2.1,.019],[0,1.13,-.023],Bt("#b7d1d0",.05,.58)),xt(y,[.32,.45,.013],[0,1.55,-.043],Bt("#537478",.2,.31)),Ei(y,[.34,.91,-.049],[.34,1.16,-.049],.008,o);const M=du(y,"OPERATING THEATRE  01",[.68,.11],[0,2.36,-.025]);M.rotation.y=Math.PI;const R=new Ye;R.position.set(-.95,0,.66),R.name="Sterile_Instrument_Trolley",t.add(R),xt(R,[.52,.035,.42],[0,.86,0],o),xt(R,[.48,.012,.38],[0,.884,0],c,.006),xt(R,[.45,.018,.35],[0,.31,0],o);for(const w of[-.21,.21])for(const C of[-.16,.16]){Ei(R,[w,.085,C],[w,.85,C],.01,o);const v=new $e(new qt(.032,.032,.021,12),l);v.position.set(w,.055,C),v.rotation.z=Math.PI/2,R.add(v)}xt(R,[.28,.025,.19],[.025,.903,0],Bt("#b7c9ca",.75,.24),.025);const P=new bn({color:"#fffaf2"});for(const[w,C]of[-.48,.48].entries()){const v=new Ye;v.position.set(C,2.02+w*.1,-.07+w*.27),v.rotation.z=C<0?-.18:.18,t.add(v),Ei(t,[C,2.6,.4],[C,2.45,.4],.017,n),Ei(t,[C,2.45,.4],[C,2.36+w*.1,-.07+w*.27],.014,o),Ei(t,[C,2.36+w*.1,-.07+w*.27],[C,2.035+w*.1,-.07+w*.27],.012,o);const x=new $e(new qt(.235,.26,.045,48),n);v.add(x);for(let L=0;L<7;L++){const U=(L-1)*Math.PI/3,I=L?.135:0,B=new $e(new uc(.055,12),P);B.rotation.x=Math.PI/2,B.position.set(Math.cos(U)*I,-.025,Math.sin(U)*I),v.add(B)}const A=new $e(new qt(.013,.017,.1,12),l);A.position.y=-.075,v.add(A)}for(const w of[-.8,.8])xt(t,[.52,.012,.72],[w,2.61,.7],new bn({color:"#edf5f2"}));return t.traverse(w=>w.layers.set(0)),{room:t,monitor:_,monitorScreen:m,platform:g}}new E;const fu=new E(0,1,0),pu=new Fe,yo="./",xn=(s,e=0,t=.5)=>new pi({color:s,metalness:e,roughness:t});xn("#c7d0d2",.95,.23);const vy=xn("#607178",.85,.3),mu=xn("#142024",.25,.4);function oi(s,e,t){const n=new $e(s,e);return n.castShadow=!0,n.receiveShadow=!0,t?.add(n),n}function Sr(s,e,t,n,i=0){const r=oi(i?new dn(...s,3,Math.min(i,...s.map(o=>o*.45))):new Fi(...s),t,n);return r.position.set(...e),r}function qi(s,e,t,n){const i=oi(new Ui(1,40,28),t,n);return i.scale.set(...s),i.position.set(...e),i}function xy(){const s=document.createElement("canvas");s.width=s.height=256;const e=s.getContext("2d");let t=1234;const n=()=>(t=Math.imul(t,1664525)+1013904223|0,(t>>>0)/4294967296);e.fillStyle="#9a615b",e.fillRect(0,0,256,256);for(let r=0;r<7500;r++){const o=n(),a=n(),l=n()*2+.3;e.fillStyle=`rgba(${n()>.5?"225,164,135":"81,31,35"},${n()*.15})`,e.beginPath(),e.ellipse(o*256,a*256,l,l*.6,0,0,7),e.fill()}const i=new td(s);return i.wrapS=i.wrapT=es,i.repeat.set(3,3),i.colorSpace=Ct,i}function yy(s){const e=new Ni(.78,.96,40,48),t=e.attributes.position;for(let o=0;o<t.count;o++){const a=t.getX(o),l=t.getY(o),c=Math.abs(a)/.39;t.setZ(o,-.075*c**4+.0028*Math.sin(31*a+7*l)*Math.sin(23*l)+.0015*Math.cos(57*a-19*l))}e.computeVertexNormals();const n=xn("#467e82",0,.97);n.side=un,n.onBeforeCompile=o=>{o.vertexShader=`varying vec2 drapeLocal;
`+o.vertexShader,o.vertexShader=o.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
drapeLocal=position.xy;`),o.fragmentShader=`varying vec2 drapeLocal;
`+o.fragmentShader,o.fragmentShader=o.fragmentShader.replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
if(drapeLocal.y<-.30||(abs(drapeLocal.x)<.168&&abs(drapeLocal.y)<.198))discard;`)},n.customProgramCacheKey=()=>"cotton-operative-drape-window";const i=oi(e,n,s);i.name="Sterile_Fenestrated_Surgical_Drape",i.rotation.x=-Math.PI/2,i.position.set(0,1.14,0),i.layers.set(0);const r=xn("#79a5a3",0,.98);for(const o of[-.174,.174])Sr([.007,.001,.41],[o,1.142,0],r,s);for(const o of[-.204,.204])Sr([.35,.001,.007],[0,1.142,o],r,s);return i}class My{constructor(e,t,n){this.stage=t,this.mini=n,this.mode="endo",this.disposed=!1,this.ready=!1,this.renderer=new Zv({canvas:e,antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!1}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.5)),this.renderer.setSize(t.clientWidth,t.clientHeight,!1),this.renderer.outputColorSpace=Ct,this.renderer.toneMapping=Cu,this.renderer.toneMappingExposure=1.15,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Ru,this.renderer.info.autoReset=!1,this.scopeFeed=new gy(this.renderer,1.1),this.scene=new $u,this.scene.background=new Re("#a4b3b3");const i=new Ol(this.renderer);this.env=i.fromScene(new iy,.04),this.scene.environment=this.env.texture,i.dispose(),this.overviewCamera=new Wt(42,1,.015,30),this.overviewCamera.position.set(1.68,2.02,-1.92),this.endoCamera=new Wt(55,1,.003,5),this.endoCamera.layers.set(1),this.controls=new Wx(this.overviewCamera,e),this.controls.target.set(0,1.2,.18),this.controls.enableDamping=!0,this.controls.minDistance=.3,this.controls.maxDistance=4,this.controls.maxPolarAngle=Math.PI*.49,this.controls.enabled=!1;const r=new bh("#f4f7f6","#667572",1.35);this.scene.add(r);const o=new bh("#fff9f3","#9c7670",.6);o.layers.set(1),this.scene.add(o);const a=new Fl("#fff5e8",2.1);a.position.set(-1.6,3.2,-1.4),a.castShadow=!0,a.shadow.mapSize.set(1024,1024),a.shadow.camera.left=-1.6,a.shadow.camera.right=1.6,a.shadow.camera.top=1.6,a.shadow.camera.bottom=-1.6,a.shadow.normalBias=.0015,this.scene.add(a);const l=new Fl("#dcebf0",.75);l.position.set(2.2,1.8,.7),this.scene.add(l),this.scopeLight=new hd("#fffaf5",.14,.6,.72,.82,1),this.scopeLight.layers.set(1),this.scopeLight.target=new ht,this.scene.add(this.scopeLight,this.scopeLight.target),this._makeRoom(),this._makePatient(),this._makeTools(),this._makeScopeArm(),this.robot=new Ye,this.robot.position.set(0,1.0922729,.42),this.robot.rotation.y=Math.PI/2,this.scene.add(this.robot),this.joints=[],this.robotLoaded=!1,this.armTargets={left:new E,right:new E},this.armErrors={left:0,right:0},this.handPositions={left:new E,right:new E},this.conceptDecoupled=!1,this.kinematicLimited=!1,this.targetMarker=oi(new Ui(.0011,12,8),new bn({color:"#9de3c6"}),this.scene),this.targetMarker.layers.set(1),this.targetMarker.visible=!1,this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(t),this.lastMini=0}async loadRobot(){const e=new Ro,[t,n]=await Promise.all([e.loadAsync(yo+"assets/g1.glb"),fetch(yo+"assets/g1-kinematics.json")]),i=await n.json();this.robot.add(t.scene),this.robot.updateMatrixWorld(!0),t.scene.traverse(r=>{r.isMesh&&(r.castShadow=!0,r.receiveShadow=!0,r.geometry.attributes.normal||r.geometry.computeVertexNormals(),r.material&&(r.material.roughness=.38,r.material.metalness=.11,r.material.name==="dark"?(r.material.color.set("#141a1e"),r.material.roughness=.47,r.material.metalness=.08):r.material.name==="white"&&r.material.color.set("#d9dfde")))}),this.robotModel=t.scene,this.robotMetadata=i;for(const r of i.joints){const o=t.scene.getObjectByName(r.name);!o||r.type==="fixed"||(o.userData.rest=o.quaternion.clone(),o.userData.angle=0,o.userData.axis=new E(...r.axis),o.userData.limit=r.limit||r.limits||{lower:-Math.PI,upper:Math.PI},this.joints.push(o))}for(const r of["left","right"])this.setJoint(r+"_shoulder_pitch_joint",.8),this.setJoint(r+"_shoulder_roll_joint",r==="left"?.2:-.2),this.setJoint(r+"_elbow_joint",1.1);this.handMarkers={},this.handQuaternions={left:new Fe,right:new Fe};for(const r of["left","right"]){const o=t.scene.getObjectByName(r+"_rubber_hand");if(o){const a=new ht;a.name=r+"_Measured_Palm_Grip_Frame",a.position.fromArray(bt[r]),o.add(a),this.handMarkers[r]=a}}return this.robotLoaded=!0,i}async loadAnatomy(){this.assemblies=await uy(this.scene),this.assemblies.scopeMount.position.set(this.robot.position.x,this.robot.position.y+.2377271,this.robot.position.z-.17),this.assemblies.scopeMount.quaternion.premultiply(pu.setFromAxisAngle(new E(0,0,1),Math.PI)),Object.values(this.tools).forEach(n=>n.group.visible=!1),this.scopeShaft.visible=!1,this.scopeHead.visible=!1,this.scopeLens.visible=!1,this.scopeArm.visible=!1;const e=await new Ro().loadAsync(yo+"assets/patient-skin.glb");e.scene.rotation.x=-Math.PI/2,e.scene.position.set(0,1.035,0),e.scene.traverse(n=>{n.isMesh&&(n.geometry.attributes.normal||n.geometry.computeVertexNormals(),n.material=new pi({color:"#bfa08a",roughness:.65,metalness:0,side:un}),n.material.onBeforeCompile=i=>{i.vertexShader=`varying vec3 patientLocal;
`+i.vertexShader,i.vertexShader=i.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
patientLocal=position;`),i.fragmentShader=`varying vec3 patientLocal;
`+i.fragmentShader,i.fragmentShader=i.fragmentShader.replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
if(abs(patientLocal.x)<.17&&abs(patientLocal.y)<.20&&patientLocal.z>0.0)discard;
if(patientLocal.y<-.30)discard;`)},n.material.customProgramCacheKey=()=>"anatomy-teaching-window",n.castShadow=!0,n.receiveShadow=!0,n.layers.set(0))}),this.scene.add(e.scene),this.patientOuter.children[0].visible=!1,this.patientOuter.children[3].visible=!1,this.patientOuter.children[4].visible=!1,this.patientOuter.children[1].visible=!1,this.patientOuter.children[2].visible=!1,this.patientOuter.children[5].visible=!1,this.patientOuter.children[6].visible=!1,this.patientOuter.children[7].visible=!1,this.drape=yy(this.patientOuter);const t=await new Ro().loadAsync(yo+"assets/hepatobiliary-context.glb");return this.anatomicContext=t.scene,this.anatomicContext.rotation.x=-Math.PI/2,this.anatomicContext.position.set(0,1.035,0),this.anatomicContext.traverse(n=>{n.isMesh&&(n.layers.enable(1),n.castShadow=n.receiveShadow=!0,n.geometry.attributes.normal||n.geometry.computeVertexNormals(),n.material.roughness=.48,n.material.metalness=0)}),this.scene.add(this.anatomicContext),this.gallbladder.visible=!1,this.schematicVessels.visible=!1,this.cavity.children[1].visible=!1,this.assemblies}setJoint(e,t){this._jointByName??=new Map;let n=this._jointByName.get(e);if(n||(n=this.robotModel?.getObjectByName(e),n&&this._jointByName.set(e,n)),!n?.userData.rest||!Number.isFinite(t))return;const i=n.userData.limit;if(t=Hn.clamp(t,i.lower??-Math.PI,i.upper??Math.PI),n.userData.angle=t,n.quaternion.copy(n.userData.rest).multiply(pu.setFromAxisAngle(n.userData.axis,t)),!this._ikSolving&&this._armIK)for(const r of Object.values(this._armIK))r.valid=!1}_makeRoom(){const e=_y(this.scene,this.scopeFeed.monitorMaterial);this.room=e.room,this.monitor=e.monitor,this.monitorScreen=e.monitorScreen,this.robotPlatform=e.platform}_makePatient(){const e=new Ye;this.patientOuter=e,this.scene.add(e);const t=xn("#436c70",.05,.94);t.normalMap=null,qi([.22,.12,.52],[0,.99,-.13],t,e),Sr([.49,.035,.48],[0,1.03,-.63],t,e),Sr([.49,.035,.46],[0,1.03,.38],t,e);const n=xn("#bb8d75",0,.7);qi([.1,.105,.125],[0,1.035,-.76],n,e),qi([.105,.044,.105],[0,1.11,-.76],xn("#558c89",0,.7),e);const i=xn("#c99882",0,.65);i.transparent=!0,i.opacity=.22,i.depthWrite=!1,qi([.17,.095,.23],[0,1.09,-.02],i,e);for(const c of[-.22,.22])Sr([.11,.04,.51],[c,1.105,-.02],t,e);this.cavity=new Ye,this.scene.add(this.cavity);const r=new fn({color:"#c5b1a7",roughness:.72,metalness:0,side:jt,map:xy(),clearcoat:.08,clearcoatRoughness:.58}),o=qi([.25,.16,.29],[0,1.085,0],r,this.cavity);o.layers.set(1),o.castShadow=!1,qi([.18,.028,.13],[0,1,-.14],xn("#ac7b74",0,.55),this.cavity).layers.enable(1),this.gallbladder=qi([.012,.017,.032],[-.032,1.001,.055],new fn({color:"#68804b",roughness:.3,clearcoat:.6}),this.cavity),this.gallbladder.rotation.z=.3,this.gallbladder.layers.enable(1),this.schematicVessels=new Ye,this.cavity.add(this.schematicVessels);const l=xn("#794240",.05,.4);for(let c=0;c<3;c++){const h=new rd([new E(-.035+c*.014,.997,-.02),new E(-.025+c*.013,1.003,.016),new E(-.038+c*.02,1.002,.05)]);oi(new fc(h,16,.0015,6,!1),l,this.schematicVessels).layers.enable(1)}this.portMeshes=[];for(const[c,h]of[[-.08,.1],[.08,.1],[0,.14]]){const u=new Ye;u.position.set(c,1.18,h),this.scene.add(u);const d=oi(new Tn(.009,.0016,8,24),xn("#73a7a4",.3,.42),u);d.rotation.x=Math.PI/2;const f=oi(new qt(.007,.006,.015,20),mu,u);f.position.y=-.006;const g=oi(new qt(.0054,.0048,.064,16),vy,u);g.position.y=.032;const _=oi(new Tn(.0061,.0011,8,20),mu,u);_.rotation.x=Math.PI/2,_.position.y=-.014,this.portMeshes.push(u)}}_makeTools(){this.tools={left:{group:new Ye},right:{group:new Ye}},this.scopeShaft=new Ye,this.scopeHead=new Ye,this.scopeLens=new Ye}_makeScopeArm(){this.scopeArm=new Ye}addTissue(e){this.tissue=e,e.group.position.set(0,1.035,0),this.scene.add(e.group),e.group.traverse(t=>{t.layers.enable(1),t.isMesh&&(t.castShadow=!0,t.receiveShadow=!0)})}resize(){const e=this.stage.clientWidth,t=this.stage.clientHeight;e<1||t<1||(this.renderer.setSize(e,t,!1),this.overviewCamera.aspect=e/t,this.overviewCamera.updateProjectionMatrix(),this.endoCamera.aspect=e/t,this.endoCamera.updateProjectionMatrix())}setMode(e){this.mode=e,this.controls.enabled=e==="overview"}get scopeAspect(){const e=this.mode==="endo"?this.stage:this.mini;if(e===this.stage)return Math.max(1,e.clientWidth)/Math.max(1,e.clientHeight);const t=e.getBoundingClientRect();return Math.max(1,t.width)/Math.max(1,t.height)}home(){this.overviewCamera.position.set(1.68,2.02,-1.92),this.controls.target.set(0,1.2,.18),this.controls.update()}releaseKinematicGuard(){this.acceptedArmPoses={},this.kinematicLimited=!1,this._armIK=null,this.assemblies?.resetPose()}guardArmTargets(){return this.kinematicLimited=!1,!1}solveArm(e,t,n=1/60,i=null){if(!this.robotLoaded)return;this._armIK??={};let r=this._armIK[e];if(!r){const U=["shoulder_pitch","shoulder_roll","shoulder_yaw","elbow","wrist_roll","wrist_pitch","wrist_yaw"].map(B=>this.robotModel.getObjectByName(e+"_"+B+"_joint")).filter(Boolean),I=this.handMarkers?.[e]||this.robotModel.getObjectByName(e+"_wrist_yaw_link")||U.at(-1);if(!I)return;r=this._armIK[e]={chain:U,end:I,valid:!1,settled:!1,stationaryFrames:0,error:1/0,bestError:1/0,target:new E,rootMatrix:new Ue,bestAngles:new Float64Array(U.length),jacobian:new Float64Array(3*U.length),matrixElements:new Float64Array(9),centering:new Float64Array(U.length),orientationError:new E,orientationQ:new Fe,goalOrientation:new Fe,lower:new Float64Array(U.length),upper:new Float64Array(U.length),inverse:new ze,pivot:new E,endPos:new E,axis:new E,a:new E,b:new E,cross:new E,scale:new E,q:new Fe}}this.robot.updateWorldMatrix(!0,!1);const o=r.valid&&r.target.distanceToSquared(t)<1e-14&&r.rootMatrix.equals(this.robot.matrixWorld)&&(!i||1-Math.abs(r.goalOrientation.dot(i))<1e-12);if(o&&(r.error<2e-4||r.settled)){this.armErrors[e]=r.error;return}const{chain:a,end:l,pivot:c,endPos:h,axis:u,q:d,a:f,b:g,cross:_,scale:m,jacobian:p,matrixElements:S,centering:y,lower:M,upper:R,inverse:P,orientationError:w,orientationQ:C}=r,v=r.error;if(this.robot.updateMatrixWorld(!0),h.setFromMatrixPosition(l.matrixWorld),!o){r.target.copy(t),r.rootMatrix.copy(this.robot.matrixWorld),r.stationaryFrames=0,r.settled=!1,i&&r.goalOrientation.copy(i),r.bestError=h.distanceTo(t);for(let L=0;L<a.length;L++)r.bestAngles[L]=a[L].userData.angle}const x=a.length,A=Hn.clamp(Number.isFinite(n)?n:1/60,.001,.05);for(let L=0;L<x;L++){const U=a[L],I=U.userData.limit,B=I.velocity??12;M[L]=Math.max(I.lower,U.userData.angle-B*A),R[L]=Math.min(I.upper,U.userData.angle+B*A)}this._ikSolving=!0;for(let L=0;L<6&&!(h.distanceToSquared(t)<4e-8);L++){if(w.set(0,0,0),i){l.matrixWorld.decompose(c,C,m),C.invert().premultiply(i).normalize(),C.w<0&&C.set(-C.x,-C.y,-C.z,-C.w);const I=Math.hypot(C.x,C.y,C.z),B=2*Math.acos(Hn.clamp(C.w,-1,1));w.set(C.x,C.y,C.z).multiplyScalar(I>1e-10?B/I:0)}for(let I=0;I<x;I++){const B=a[I];B.matrixWorld.decompose(c,d,m),u.copy(B.userData.axis).applyQuaternion(d).normalize(),f.subVectors(h,c),_.crossVectors(u,f),p[I]=_.x,p[x+I]=_.y,p[2*x+I]=_.z;const O=B.userData.limit;y[I]=.4*((O.lower+O.upper)*.5-B.userData.angle)/(O.upper-O.lower)+.015*u.dot(w)}for(let I=0;I<3;I++)for(let B=0;B<3;B++){let O=I===B?25e-6:0;for(let K=0;K<x;K++)O+=p[I*x+K]*p[B*x+K];S[B*3+I]=O}P.fromArray(S).invert(),f.subVectors(t,h).applyMatrix3(P),g.set(0,0,0);for(let I=0;I<x;I++)g.x+=p[I]*y[I],g.y+=p[x+I]*y[I],g.z+=p[2*x+I]*y[I];g.applyMatrix3(P);for(let I=0;I<x;I++){const B=p[I]*f.x+p[x+I]*f.y+p[2*x+I]*f.z+y[I]-(p[I]*g.x+p[x+I]*g.y+p[2*x+I]*g.z);this.setJoint(a[I].name,Hn.clamp(a[I].userData.angle+Hn.clamp(B,-.2,.2),M[I],R[I]))}a[0].updateMatrixWorld(!0),h.setFromMatrixPosition(l.matrixWorld);const U=h.distanceTo(t);if(U<r.bestError){r.bestError=U;for(let I=0;I<a.length;I++)r.bestAngles[I]=a[I].userData.angle}if(U<2e-4)break}if(r.error=h.distanceTo(t),r.error>r.bestError+1e-8){for(let L=0;L<a.length;L++)this.setJoint(a[L].name,r.bestAngles[L]);this.robot.updateMatrixWorld(!0),r.error=r.bestError}this._ikSolving=!1,r.stationaryFrames=o&&Math.abs(v-r.error)<1e-6?r.stationaryFrames+1:0,r.settled=r.stationaryFrames>=3,r.valid=!0,this.armErrors[e]=r.error}update(e,t){this.assemblies?.update(e,t);for(const[r,o]of["left","right"].entries()){const a=this.assemblies?.toolGripPositions[o];a&&(this.armTargets[o].copy(a),this._gripOrientation??=new Fe,this._gripClock??=new Fe().setFromAxisAngle(new E(0,0,1),Math.PI/2),this._gripOrientation.copy(this.assemblies.tools[o].group.quaternion).multiply(this._gripClock),this.solveArm(o,a,t,this._gripOrientation)),this.handMarkers?.[o]?.getWorldPosition(this.handPositions[o]),this.handQuaternions??={left:new Fe,right:new Fe},this.handMarkers?.[o]?.getWorldQuaternion(this.handQuaternions[o]),this.assemblies&&this.portMeshes[r].quaternion.setFromUnitVectors(fu,this.assemblies.tools[o].shaftDirection)}this.assemblies?.connectHands(this.handPositions,this.armErrors,this.handQuaternions),this.conceptDecoupled=this.assemblies?.conceptDecoupled??!1,this.kinematicLimited=!1;const n=e.scope,i=new E(...n.position);this.assemblies&&this.portMeshes[2].quaternion.setFromUnitVectors(fu,this.assemblies.scope.direction),this.endoCamera.position.copy(i),n.cameraUp?this.endoCamera.up.fromArray(n.cameraUp):this.endoCamera.up.set(0,1,0),this.endoCamera.lookAt(new E(...n.lookAt)),this.scopeLight.position.copy(i),this.scopeLight.target.position.set(...n.lookAt),this.controls.update()}render(e=0){const t=this.renderer,n=this.stage.clientWidth,i=this.stage.clientHeight;if(n<1||i<1)return;const r=this.stage.getBoundingClientRect(),o=this.mini.getBoundingClientRect(),a=o.left-r.left,l=i-(o.top-r.top)-o.height,c=o.width,h=o.height;t.info.reset(),t.setScissorTest(!1),t.setViewport(0,0,n,i),this.cavity.children[0].visible=!0,this.scene.background=new Re("#6b4a42"),this.scene.environmentIntensity=.34,t.toneMappingExposure=1.1,this.scopeFeed.capture(t,this.scene,this.endoCamera,this.mode==="endo"?n:c,this.mode==="endo"?i:h),t.setRenderTarget(null),t.setScissorTest(!1),t.setViewport(0,0,n,i),t.clear(),this.cavity.children[0].visible=!1,this.scene.background=new Re("#c2d0d0"),this.scene.environmentIntensity=.8,t.toneMappingExposure=1,this.mode==="endo"?(this.scopeFeed.blit(t,0,0,n,i),this.overviewCamera.aspect=c/h,this.overviewCamera.updateProjectionMatrix(),t.setScissorTest(!0),t.setScissor(a,l,c,h),t.setViewport(a,l,c,h),t.clearDepth(),t.render(this.scene,this.overviewCamera)):(this.overviewCamera.aspect=n/i,this.overviewCamera.updateProjectionMatrix(),t.render(this.scene,this.overviewCamera),this.scopeFeed.blit(t,a,l,c,h)),t.setScissorTest(!1)}dispose(){this.disposed=!0,this.resizeObserver.disconnect(),this.controls.dispose(),this.env.dispose(),this.scene.traverse(e=>{if(e.geometry?.dispose(),e.material)for(const t of Array.isArray(e.material)?e.material:[e.material])t!==this.scopeFeed.monitorMaterial&&t.dispose()}),this.scopeFeed.dispose(),this.renderer.dispose()}}const Sy=[[0,5,1,6],[0,1,2,6],[0,2,3,6],[0,3,7,6],[0,7,4,6],[0,4,5,6]],za=[[0,0,0],[1,0,0],[1,1,0],[0,1,0],[0,0,1],[1,0,1],[1,1,1],[0,1,1]],by=[[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]],is=(s,e,t)=>Math.max(e,Math.min(t,s)),ko=[];for(let s=-1;s<=1;s++)for(let e=-1;e<=1;e++)for(let t=-1;t<=1;t++)ko.push([t,e,s]);const Ey=ko.map((s,e)=>ko.reduce((t,n,i)=>i!==e&&Math.max(Math.abs(s[0]-n[0]),Math.abs(s[1]-n[1]),Math.abs(s[2]-n[2]))<=1?t|1<<i:t,0));function Sd(s){const e=s.dims??s.dimensions,t=s.origin,n=Array.isArray(s.spacing)?s.spacing:[s.spacing,s.spacing,s.spacing];if(!Array.isArray(e)||e.length!==3||e.some(i=>!Number.isInteger(i)||i<2||i>512))throw new Error("Invalid volume dimensions");if(!Array.isArray(t)||t.length!==3||t.some(i=>!Number.isFinite(i)))throw new Error("Invalid volume origin");if(n.length!==3||n.some(i=>!Number.isFinite(i)||i<=0||i>.05))throw new Error("Invalid volume spacing");return{...s,dims:[...e],origin:[...t],spacing:[...n]}}function Xn(s,e,t,n){return e+s.dims[0]*(t+s.dims[1]*n)}function Gl(s,e){return is(.5-s/e,0,1)}function Qi(s){if(!s)return null;const e=s.local??s.point,t=s.displacement??s.delta;if(!Array.isArray(e)||!Array.isArray(t)||e.length!==3||t.length!==3||[...e,...t].some(o=>!Number.isFinite(o)))throw new Error("Invalid tissue deformation");const n=Math.hypot(...t);if(!Number.isFinite(n)||!Number.isFinite(n*3.2))throw new Error("Tissue deformation exceeds the numeric range");if(n<1e-10)return null;const i=[...t],r=Math.max(is(Number.isFinite(s.radius)?s.radius:.065,.02,.2),3.2*Math.hypot(...i));return{local:[...e],displacement:i,radius:r}}function xc(s,e){if(!e)return{weight:0,gradient:[0,0,0]};const t=s.map((a,l)=>a-e.local[l]),n=Math.hypot(...t),i=n/e.radius;if(i>=1)return{weight:0,gradient:[0,0,0]};const r=1-i,o=-20*r*r*r/(e.radius*e.radius);return{weight:r**4*(4*i+1),gradient:t.map(a=>a*o)}}function Ws(s,e){if(!e)return[...s];const{weight:t}=xc(s,e);return s.map((n,i)=>n+e.displacement[i]*t)}function Wl(s,e){if(!e)return[...s];const t=[...s],n=e.displacement;for(let i=0;i<20;i++){const{weight:r,gradient:o}=xc(t,e),a=t.map((h,u)=>h+n[u]*r-s[u]);if(Math.hypot(...a)<1e-10)break;const l=1+o.reduce((h,u,d)=>h+u*n[d],0),c=o.reduce((h,u,d)=>h+u*a[d],0)/l;for(let h=0;h<3;h++)t[h]-=a[h]-n[h]*c}return t}function Ty(s,e,t){const n=1+e.reduce((a,l,c)=>a+l*t[c],0),i=s.reduce((a,l,c)=>a+l*t[c],0)/n,r=s.map((a,l)=>a-e[l]*i),o=Math.hypot(...r)||1;return r.map(a=>a/o)}function wy(s,e,t=16){const n=Sd(s),i=n.dims.reduce((h,u)=>h*u,1);if(!(e instanceof Float32Array)||e.length!==i)throw new Error("Volume byte length does not match its metadata");for(let h=0;h<e.length;h++)if(!Number.isFinite(e[h]))throw new Error("Volume has non-finite samples");const r=new Float32Array(e),o=new Float32Array(e),a=n.spacing.reduce((h,u)=>h*u,1)*1e9,l=Math.min(...n.spacing);let c=0;for(let h=0;h<r.length;h++)c+=Gl(r[h],l)*a;return{meta:n,base:r,field:o,chunkSize:t,bandWidth:l,voxelMm3:a,totalVolumeMm3:c,removedVolumeMm3:0,cuts:[],separations:[],fragmentRecords:[],fragmentVolumeMm3:0,excluded:new Uint8Array(i),exclusionIndices:[],baselineLabels:null,connectivityVerified:!1,topologyDirty:!1,topologyMetrics:{scans:0,scannedNodes:0,localChecks:0,lastScanMs:0}}}function Ay(s,e,t,n){s.topologyMetrics.localChecks++;const{meta:i,field:r}=s;let o=0;for(let c=0;c<27;c++){if(c===13)continue;const h=ko[c],u=e+h[0],d=t+h[1],f=n+h[2];u>=0&&u<i.dims[0]&&d>=0&&d<i.dims[1]&&f>=0&&f<i.dims[2]&&r[Xn(i,u,d,f)]<0&&(o|=1<<c)}if(!o)return!1;let a=o&-o,l=a;for(;a&&l!==o;){const c=a&-a,h=31-Math.clz32(c);a&=~c;const u=Ey[h]&o&~l;a|=u,l|=u}return l!==o}function bd(s,e,t){const n=t[0]-e[0],i=t[1]-e[1],r=t[2]-e[2],o=n*n+i*i+r*r,a=o?is(((s[0]-e[0])*n+(s[1]-e[1])*i+(s[2]-e[2])*r)/o,0,1):0;return Math.hypot(s[0]-e[0]-a*n,s[1]-e[1]-a*i,s[2]-e[2]-a*r)}function Nr(s){const e=s.a??s.point,t=s.b??e;if(!Array.isArray(e)||!Array.isArray(t)||e.length!==3||t.length!==3||[...e,...t].some(r=>!Number.isFinite(r)))throw new Error("Cut points must be finite three-component coordinates");if(!Number.isFinite(s.radius)||s.radius<=0||s.radius>.05)throw new Error("Cut radius must be positive and at most 50 mm");if(Math.hypot(...t.map((r,o)=>r-e[o]))>.5)throw new Error("Cut segment exceeds the supported workspace");const n={a:[...e],b:[...t],radius:s.radius},i=Qi(s.deformation);return i&&(n.deformation=i),n}function Vo(s){const e=[],t=s.meta.dims.map(n=>Math.ceil((n-1)/s.chunkSize));for(let n=0;n<t[2];n++)for(let i=0;i<t[1];i++)for(let r=0;r<t[0];r++)e.push(`${r},${i},${n}`);return e}function yc(s,e){const t=Nr(e),{meta:n,field:i}=s,r=2.5*Math.max(...n.spacing),o=t.deformation?.displacement??[0,0,0],a=t.radius+r,l=t.a.map((m,p)=>is(Math.floor((Math.min(m,t.b[p])-Math.max(0,o[p])-a-n.origin[p])/n.spacing[p]),0,n.dims[p]-1)),c=t.a.map((m,p)=>is(Math.ceil((Math.max(m,t.b[p])-Math.min(0,o[p])+a-n.origin[p])/n.spacing[p]),0,n.dims[p]-1));let h=0,u=0,d=0;const f=[0,0,0],g=[[1/0,1/0,1/0],[-1/0,-1/0,-1/0]];for(let m=l[2];m<=c[2];m++)for(let p=l[1];p<=c[1];p++)for(let S=l[0];S<=c[0];S++){f[0]=n.origin[0]+S*n.spacing[0],f[1]=n.origin[1]+p*n.spacing[1],f[2]=n.origin[2]+m*n.spacing[2];const y=Xn(n,S,p,m),M=t.deformation?Ws(f,t.deformation):f,R=Math.fround(Math.max(i[y],t.radius-bd(M,t.a,t.b)));if(R<=i[y])continue;const P=i[y]<0;h+=(Gl(i[y],s.bandWidth)-Gl(R,s.bandWidth))*s.voxelMm3,i[y]=R,P&&R>=0&&(d++,!s.topologyDirty&&Ay(s,S,p,m)&&(s.topologyDirty=!0)),u++;for(let w=0;w<3;w++){const C=w===0?S:w===1?p:m;g[0][w]=Math.min(g[0][w],C),g[1][w]=Math.max(g[1][w],C)}}s.cuts.push(t),s.removedVolumeMm3=Math.min(s.totalVolumeMm3,s.removedVolumeMm3+h);const _=new Set;if(u){const m=g[0].map(S=>Math.max(0,Math.floor((S-2)/s.chunkSize))),p=g[1].map((S,y)=>Math.min(Math.ceil((n.dims[y]-1)/s.chunkSize)-1,Math.floor((S+1)/s.chunkSize)));for(let S=m[2];S<=p[2];S++)for(let y=m[1];y<=p[1];y++)for(let M=m[0];M<=p[0];M++)_.add(`${M},${y},${S}`)}return{dirty:_,removedMm3:h,changedSamples:u,removedNodes:d,removedVolumeMm3:s.removedVolumeMm3}}function Ry(s,e=[]){s.field.set(s.base),s.cuts=[],s.removedVolumeMm3=0,s.separations=[],s.fragmentRecords=[],s.fragmentVolumeMm3=0,s.excluded.fill(0),s.exclusionIndices=[],s.topologyDirty=!1,s.connectivityVerified=!!s.baselineLabels;for(const t of e)yc(s,t);return s}function Cy(s,e,t,n){const{meta:i,field:r}=s,o=[0,0,0];for(let a=0;a<3;a++){const l=[e,t,n],c=[e,t,n];l[a]=Math.max(0,l[a]-1),c[a]=Math.min(i.dims[a]-1,c[a]+1),o[a]=(r[Xn(i,...c)]-r[Xn(i,...l)])/((c[a]-l[a])*i.spacing[a])}return o}function Py(s,e,t){const n=.93+.045*Math.sin(s[0]*492+Math.sin(s[2]*341))+.025*Math.sin(s[1]*713-s[2]*427),i=is((-e-t*.3)/(t*1.1),0,1);return[(.19+.14*i)*n,(.027+.027*i)*n,(.018+.024*i)*n]}function Ed(s,e){const[t,n,i]=e.split(",").map(Number),{meta:r,field:o,base:a,chunkSize:l}=s,c=[t,n,i].map(w=>w*l),h=c.map((w,C)=>Math.min(w+l,r.dims[C]-1)),u=[],d=[],f=[],g=[],_=[],m=new Map,p=new Array(8),S=new Array(8),y=new Array(8),M=new Map,R=(w,C,v)=>{const x=Xn(r,w,C,v);let A=M.get(x);return A||(A=Cy(s,w,C,v),M.set(x,A)),A};function P(w,C,v){const x=C.p[0]-w.p[0],A=C.p[1]-w.p[1],L=C.p[2]-w.p[2],U=v.p[0]-w.p[0],I=v.p[1]-w.p[1],B=v.p[2]-w.p[2],O=[A*B-L*I,L*U-x*B,x*I-A*U];if(Math.hypot(...O)<1e-15)return;const K=w.n.map((V,$)=>V+C.n[$]+v.n[$]);O.reduce((V,$,se)=>V+$*K[se],0)<0&&([C,v]=[v,C]);for(const V of[w,C,v]){let $=m.get(V.key);$===void 0&&($=u.length/3,m.set(V.key,$),u.push(...V.p),d.push(...V.n),f.push(...V.c),g.push(V.cutMask)),_.push($)}}for(let w=c[2];w<h[2];w++)for(let C=c[1];C<h[1];C++)for(let v=c[0];v<h[0];v++){let x=0;for(let A=0;A<8;A++){const L=[v+za[A][0],C+za[A][1],w+za[A][2]],U=Xn(r,...L);S[A]=o[U],y[A]=a[U],p[A]=L,S[A]<0&&x++}if(!(!x||x===8))for(const A of Sy){const L=[];for(const[U,I]of by){const B=A[U],O=A[I];if(S[B]<0==S[O]<0)continue;const K=S[B]/(S[B]-S[O]),V=R(...p[B]),$=R(...p[O]),se=p[B].map((q,Z)=>r.origin[Z]+(q+(p[O][Z]-q)*K)*r.spacing[Z]),de=V.map((q,Z)=>q+($[Z]-q)*K),Le=Math.hypot(...de)||1,Qe=y[B]+(y[O]-y[B])*K,tt=Xn(r,...p[B]),qe=Xn(r,...p[O]);L.push({key:tt<qe?`${tt}:${qe}`:`${qe}:${tt}`,p:se,n:de.map(q=>q/Le),c:Py(se,Qe,s.bandWidth),cutMask:is((-Qe-s.bandWidth*.3)/(s.bandWidth*1.1),0,1)})}if(L.length===3)P(...L);else if(L.length===4){const U=[0,1,2].map(V=>L.reduce(($,se)=>$+se.p[V],0)/4);let I=[0,1,2].map(V=>L.reduce(($,se)=>$+se.n[V],0));const B=Math.hypot(...I)||1;I=I.map(V=>V/B);const O=L[0].p.map((V,$)=>V-U[$]),K=[I[1]*O[2]-I[2]*O[1],I[2]*O[0]-I[0]*O[2],I[0]*O[1]-I[1]*O[0]];for(const V of L){const $=V.p.map((se,de)=>se-U[de]);V.angle=Math.atan2($.reduce((se,de,Le)=>se+de*K[Le],0),$.reduce((se,de,Le)=>se+de*O[Le],0))}L.sort((V,$)=>V.angle-$.angle),P(L[0],L[1],L[2]),P(L[0],L[2],L[3])}}}return{key:e,positions:new Float32Array(u),normals:new Float32Array(d),colors:new Float32Array(f),cutMasks:new Float32Array(g),indices:new Uint32Array(_)}}function Mc(s,e,t=null){const n=performance.now(),{dims:i}=s.meta,[r,o,a]=i,l=r*o,c=s._connectivityVisited??=new Uint8Array(e.length),h=s._connectivityQueue??=new Uint32Array(e.length);c.fill(0);const u=[];let d=0;for(let f=0;f<e.length;f++){if(c[f]||e[f]>=0)continue;const g=d,_=u.length+1;let m=g;h[d++]=f,c[f]=1,t&&(t[f]=_);const p=[r,o,a],S=[0,0,0];for(;m<d;){const y=h[m++],M=Math.floor(y/l),R=Math.floor((y-M*l)/r),P=y-M*l-R*r;P<p[0]&&(p[0]=P),P>S[0]&&(S[0]=P),R<p[1]&&(p[1]=R),R>S[1]&&(S[1]=R),M<p[2]&&(p[2]=M),M>S[2]&&(S[2]=M);const w=Math.max(0,P-1),C=Math.min(r-1,P+1),v=Math.max(0,R-1),x=Math.min(o-1,R+1),A=Math.max(0,M-1),L=Math.min(a-1,M+1);for(let U=A;U<=L;U++)for(let I=v;I<=x;I++){const B=U*l+I*r;for(let O=w;O<=C;O++){const K=B+O;!c[K]&&e[K]<0&&(c[K]=1,h[d++]=K,t&&(t[K]=_))}}}u.push({seed:f,start:g,end:d,voxelCount:d-g,low:p,high:S,baseline:s.baselineLabels?.[f]??_})}return s.topologyMetrics.scans++,s.topologyMetrics.scannedNodes+=e.length,s.topologyMetrics.lastScanMs=performance.now()-n,{components:u,queue:h}}function Sc(s){if(s.baselineLabels)return s;const e=new Uint32Array(s.base.length);return Mc(s,s.base,e),s.baselineLabels=e,s.cuts.length||(s.connectivityVerified=!0,s.topologyDirty=!1),s}function Td(s){const e=new Map;for(const t of s){const n=e.get(t.baseline);(!n||t.voxelCount>n.voxelCount)&&e.set(t.baseline,t)}return e}function Dy(s,e,t){const n=e.map(o=>Math.max(0,Math.floor((o-2)/s.chunkSize))),i=t.map((o,a)=>Math.min(Math.ceil((s.meta.dims[a]-1)/s.chunkSize)-1,Math.floor((o+1)/s.chunkSize))),r=new Set;for(let o=n[2];o<=i[2];o++)for(let a=n[1];a<=i[1];a++)for(let l=n[0];l<=i[0];l++)r.add(`${l},${a},${o}`);return r}function Ly(s){const e=s.reduce((o,a)=>o+a.positions.length,0),t=s.reduce((o,a)=>o+a.indices.length,0),n={positions:new Float32Array(e),normals:new Float32Array(e),colors:new Float32Array(e),cutMasks:new Float32Array(e/3),indices:new Uint32Array(t)};let i=0,r=0;for(const o of s){n.positions.set(o.positions,i),n.normals.set(o.normals,i),n.colors.set(o.colors,i),n.cutMasks.set(o.cutMasks,i/3);for(let a=0;a<o.indices.length;a++)n.indices[r+a]=o.indices[a]+i/3;i+=o.positions.length,r+=o.indices.length}return n}function Iy(s){let e=0,t=0,n=0,i=0;const r=s.positions,o=s.indices;for(let a=0;a<o.length;a+=3){const l=o[a]*3,c=o[a+1]*3,h=o[a+2]*3,u=r[l]*(r[c+1]*r[h+2]-r[c+2]*r[h+1])+r[l+1]*(r[c+2]*r[h]-r[c]*r[h+2])+r[l+2]*(r[c]*r[h+1]-r[c+1]*r[h]);e+=u,t+=u*(r[l]+r[c]+r[h]),n+=u*(r[l+1]+r[c+1]+r[h+1]),i+=u*(r[l+2]+r[c+2]+r[h+2])}if(Math.abs(e)<1e-20)throw new Error("Detached tissue has no closed three-dimensional volume");return{volumeMm3:Math.abs(e)/6*1e9,center:[t,n,i].map(a=>a/(4*e))}}function wd(s,e,t,n=null){const i=e.queue.slice(t.start,t.end),r=new Set(i),o=t.low.map(C=>C-2),a=t.high.map(C=>C+2),l=o.map((C,v)=>a[v]-C+1),c=o.map((C,v)=>s.meta.origin[v]+C*s.meta.spacing[v]),h={dims:l,origin:c,spacing:[...s.meta.spacing]},u=l[0]*l[1]*l[2],d=new Float32Array(u),f=new Float32Array(u),g=Math.max(...s.meta.spacing);for(let C=0;C<l[2];C++)for(let v=0;v<l[1];v++)for(let x=0;x<l[0];x++){const A=x+o[0],L=v+o[1],U=C+o[2],I=x+l[0]*(v+l[1]*C);if(A<0||L<0||U<0||A>=s.meta.dims[0]||L>=s.meta.dims[1]||U>=s.meta.dims[2]){d[I]=g,f[I]=g;continue}const B=Xn(s.meta,A,L,U),O=s.field[B];d[I]=r.has(B)?O:Math.max(0,O>=0?O:-O),f[I]=s.base[B]}const _={meta:h,field:d,base:f,chunkSize:s.chunkSize,bandWidth:s.bandWidth},m=Ly(Vo(_).map(C=>Ed(_,C))),p=Iy(m),S=s.cuts.length,y=t.seed,M=n?.id??`fragment-${S.toString(36)}-${y.toString(36)}`;if(s.fragmentRecords.some(C=>C.id===M))throw new Error("Duplicate detached tissue identifier");const R=Qi(s.cuts[S-1]?.deformation),P={id:M,cutIndex:S,seed:y,voxelCount:t.voxelCount,...p,...m,deformation:R,coordinateSpace:"source-material",volume:{dims:l,origin:c,spacing:[...s.meta.spacing],values:d}},w=new Float32Array(i.length);for(let C=0;C<i.length;C++){const v=i[C],x=Math.fround(Math.max(Math.abs(s.field[v]),s.bandWidth*.75));s.field[v]=x,w[C]=x,s.excluded[v]||(s.excluded[v]=1,s.exclusionIndices.push(v))}return s.fragmentRecords.push({id:M,cutIndex:S,seed:y,voxelCount:t.voxelCount,volumeMm3:p.volumeMm3,center:[...p.center]}),s.fragmentVolumeMm3+=p.volumeMm3,s.separations.push({id:M,cutIndex:S,seed:y}),{fragment:P,nodeIndices:i,positiveValues:w,dirty:Dy(s,t.low,t.high)}}function gu(s){const e=s.reduce((o,a)=>o+a.nodeIndices.length,0),t=new Uint32Array(e),n=new Float32Array(e),i=new Set;let r=0;for(const o of s)t.set(o.nodeIndices,r),n.set(o.positiveValues,r),r+=o.nodeIndices.length,o.dirty.forEach(a=>i.add(a));return{fragments:s.map(o=>o.fragment),dirty:i,exclusions:{nodeIndices:t,positiveValues:n}}}function Ny(s,{force:e=!1,minVoxels:t=12}={}){if(Sc(s),!e&&s.connectivityVerified&&!s.topologyDirty)return gu([]);const n=Mc(s,s.field),i=Td(n.components),r=[];for(const o of n.components)i.get(o.baseline)===o||o.voxelCount<t||r.push(wd(s,n,o));return s.connectivityVerified=!0,s.topologyDirty=!1,gu(r)}function Uy(s,e=[],t=[]){const n=e.map(Nr),i=t.map(d=>({...d})),r=new Set,o=new Set;for(const d of i){const f=`${d.cutIndex}:${d.seed}`;if(!Number.isInteger(d.cutIndex)||d.cutIndex<1||d.cutIndex>n.length||!Number.isInteger(d.seed)||d.seed<0||d.seed>=s.field.length||typeof d.id!="string"||!/^fragment-[a-z0-9-]+$/.test(d.id)||r.has(d.id)||o.has(f))throw new Error("Invalid tissue separation history");r.add(d.id),o.add(f)}i.sort((d,f)=>d.cutIndex-f.cutIndex||d.seed-f.seed);const a=s;s={...s,field:new Float32Array(s.base),excluded:new Uint8Array(s.base.length),topologyMetrics:{...s.topologyMetrics}},Ry(s),Sc(s);const l=[];for(let d=0;d<n.length;d++){yc(s,n[d]);const f=i.filter(m=>m.cutIndex===d+1);if(!f.length)continue;const g=Mc(s,s.field),_=Td(g.components);for(const m of f){const p=g.components.find(S=>S.seed===m.seed);if(!p||_.get(p.baseline)===p)throw new Error("Separation history does not match a fully disconnected component");l.push(wd(s,g,p,m).fragment)}s.connectivityVerified=!0,s.topologyDirty=!1}const c=new Uint32Array(s.exclusionIndices),h=new Float32Array(c.length);for(let d=0;d<c.length;d++)h[d]=s.field[c[d]];const u=a.field;return u.set(s.field),Object.assign(a,s,{field:u}),{fragments:l,dirty:new Set(Vo(s)),exclusions:{nodeIndices:c,positiveValues:h}}}function ka(s,e){return[...e].map(t=>Ed(s,t))}function Fy(s){return{removedVolumeMm3:s.removedVolumeMm3,totalVolumeMm3:s.totalVolumeMm3,voxelMm:Math.max(...s.meta.spacing)*1e3,cutCount:s.cuts.length,fragmentCount:s.fragmentRecords.length,fragmentVolumeMm3:s.fragmentVolumeMm3,topology:{...s.topologyMetrics}}}if(typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope){let s;self.onmessage=({data:e})=>{try{let t,n=0,i=0,r=[],o={nodeIndices:new Uint32Array,positiveValues:new Float32Array};if(e.type==="init")s=wy(e.metadata,new Float32Array(e.buffer),e.chunkSize??16),Sc(s),t=ka(s,Vo(s));else if(s)if(e.type==="cut"){const l=new Set;for(const h of e.cuts){const u=yc(s,h);u.dirty.forEach(d=>l.add(d)),n+=u.changedSamples,i+=u.removedMm3}const c=Ny(s);r=c.fragments,o=c.exclusions,c.dirty.forEach(h=>l.add(h)),t=ka(s,l)}else if(e.type==="restore"){const l=Uy(s,e.cuts??[],e.separations??[]);r=l.fragments,o=l.exclusions,t=ka(s,Vo(s))}else throw new Error(`Unknown tissue operation: ${e.type}`);else throw new Error("The tissue volume is not initialized");const a=t.flatMap(l=>[l.positions.buffer,l.normals.buffer,l.colors.buffer,l.cutMasks.buffer,l.indices.buffer]);for(const l of r)a.push(l.positions.buffer,l.normals.buffer,l.colors.buffer,l.cutMasks.buffer,l.indices.buffer,l.volume.values.buffer);a.push(o.nodeIndices.buffer,o.positiveValues.buffer),self.postMessage({id:e.id,epoch:e.epoch,type:e.type,chunks:t,statistics:Fy(s),changedSamples:n,removedMm3:i,fragments:r,exclusions:{reset:e.type!=="cut",...o},separations:s.separations.map(l=>({...l}))},a)}catch(t){self.postMessage({id:e.id,epoch:e.epoch,error:t.message})}}}const Oy=`
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
`,By=`
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
`,zy=`
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
`;function ky(){const s=new fn({vertexColors:!0,side:un,roughness:.42,metalness:0,ior:1.37,specularIntensity:.8,clearcoat:.2,clearcoatRoughness:.25,envMapIntensity:.65});return s.name="Anatomical_Capsule_And_Procedural_Cut_Parenchyma",s.userData.detailDescription="Procedural display cues at millimetre and submillimetre scales; not patient-specific anatomy or histology.",s.onBeforeCompile=e=>{e.vertexShader=`attribute vec3 tissueRestPosition;
attribute float tissueCutMask;
varying vec3 vTissuePosition;
varying float vTissueCut;
`+e.vertexShader,e.vertexShader=e.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vTissuePosition=tissueRestPosition;
vTissueCut=tissueCutMask;`),e.fragmentShader=Oy+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace("#include <color_fragment>",By),e.fragmentShader=e.fragmentShader.replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
roughnessFactor=clamp(roughnessFactor+tissueCut*.105+(tissueGrain-.5)*.045*tissueGrainVisibility
                     +(tissueMottle-.5)*.035+tissueLumen*tissueCut*.08,.32,.65);`),e.fragmentShader=e.fragmentShader.replace("#include <normal_fragment_maps>",zy),e.fragmentShader=e.fragmentShader.replace("#include <lights_physical_fragment>",`#include <lights_physical_fragment>
#ifdef USE_CLEARCOAT
  material.clearcoat=mix(.20,.115,tissueCut)*(.90+.10*tissueMottle);
  material.clearcoatRoughness=max(material.clearcoatRoughness,mix(.25,.31,tissueCut));
#endif`)},s.customProgramCacheKey=()=>"anatomical-capsule-cut-parenchyma-v3",s}const bc=s=>Array.isArray(s)||ArrayBuffer.isView(s)?[...s]:s.toArray(),ni=s=>new E().fromArray(bc(s)),Mo=s=>s?new Fe().fromArray(bc(s)).normalize():new Fe;function _u(s,e){const t=bc(e),{dims:n,origin:i,spacing:r,values:o}=s,a=t.map((f,g)=>(f-i[g])/r[g]);if(a.some(f=>!Number.isFinite(f)))return 1/0;const l=a.map((f,g)=>Math.max(0,Math.min(n[g]-1,f))),c=l.map((f,g)=>Math.min(n[g]-2,Math.floor(f))),h=l.map((f,g)=>f-c[g]);let u=0;for(let f=0;f<2;f++)for(let g=0;g<2;g++)for(let _=0;_<2;_++)u+=o[c[0]+_+n[0]*(c[1]+g+n[1]*(c[2]+f))]*(_?h[0]:1-h[0])*(g?h[1]:1-h[1])*(f?h[2]:1-h[2]);const d=Math.hypot(...a.map((f,g)=>(f-l[g])*r[g]));return d?Math.max(0,u)+d:u}class Vy{constructor(e){this.tissue=e,this.group=new Ye,this.group.name="detached-liver-specimens",this.group.layers.enable(1),e.group.add(this.group),this.items=new Map}clear(){for(const e of this.items.values())e.mesh.geometry.dispose();this.items.clear(),this.group.clear()}add(e,t){if(this.items.has(e.id))return this.items.get(e.id);const n=t&&Object.hasOwn(t,"deformation")?t.deformation:Object.hasOwn(e,"deformation")?e.deformation:this.tissue._deformation,i=Qi(n),r=new E().fromArray(Ws(e.center,i)),o=new Float32Array(e.positions.length),a=new Float32Array(e.normals.length);for(let u=0;u<o.length;u+=3){const d=[...e.positions.subarray(u,u+3)],f=Ws(d,i),g=i?Ty([...e.normals.subarray(u,u+3)],xc(d,i).gradient,i.displacement):e.normals.subarray(u,u+3);for(let _=0;_<3;_++)o[u+_]=f[_]-r.getComponent(_),a[u+_]=g[_]}const l=new Ut;l.setAttribute("position",new ct(o,3)),l.setAttribute("normal",new ct(a,3)),l.setAttribute("color",new ct(e.colors,3)),l.setAttribute("tissueRestPosition",new ct(e.positions,3)),l.setAttribute("tissueCutMask",new ct(e.cutMasks,1)),l.setIndex(new ct(e.indices,1)),l.computeBoundingBox(),l.computeBoundingSphere();const c=new $e(l,this.tissue.material);c.name=`specimen-${e.id}`,c.layers.enable(1),c.castShadow=!0,c.receiveShadow=!0,c.userData.tissue=!0,c.userData.fragmentId=e.id;const h={id:e.id,volumeMm3:e.volumeMm3,referenceCenter:[...e.center],frozenCenter:r,deformation:i,volume:e.volume,mesh:c,position:t?ni(t.position):r.clone(),quaternion:Mo(t?.quaternion),velocity:t?.velocity?ni(t.velocity):new E,held:!!t?.held,attachment:t?.attachment?structuredClone(t.attachment):null,sleeping:!!t?.sleeping,contactTime:0,support:this._supportPoints(o)};return this.items.set(h.id,h),this.group.add(c),this.sync(h),h}_supportPoints(e){const t=[];for(let n=-1;n<=1;n++)for(let i=-1;i<=1;i++)for(let r=-1;r<=1;r++){if(!r&&!i&&!n)continue;let o=-1/0,a=0;for(let l=0;l<e.length;l+=3){const c=e[l]*r+e[l+1]*i+e[l+2]*n;c>o&&(o=c,a=l)}t.push(new E().fromArray(e,a))}return t}sync(e){e.mesh.position.copy(e.position),e.mesh.quaternion.copy(e.quaternion),e.mesh.updateMatrix(),e.box=e.mesh.geometry.boundingBox.clone().applyMatrix4(e.mesh.matrix)}snapshot(){return[...this.items.values()].map(e=>({id:e.id,position:e.position.toArray(),quaternion:e.quaternion.toArray(),velocity:e.velocity.toArray(),held:e.held,sleeping:e.sleeping,deformation:e.deformation?structuredClone(e.deformation):null,attachment:e.attachment?structuredClone(e.attachment):null}))}atReference(e){for(const t of this.items.values())if(_u(t.volume,e)<=.002)return t;return null}referencePoint(e,t){const n=ni(t).sub(e.position).applyQuaternion(e.quaternion.clone().invert()).add(e.frozenCenter);return Wl(n.toArray(),e.deformation)}distance(e,t){return _u(e.volume,this.referencePoint(e,t))}nearest(e,t=.006){const n=ni(e);let i=null,r=1/0;for(const o of this.items.values()){if(o.box.distanceToPoint(n)>t)continue;const a=o.deformation?1-2.109375*Math.hypot(...o.deformation.displacement)/o.deformation.radius:1,l=Math.abs(this.distance(o,n))*a;l<=t&&l<r&&(i=o,r=l)}return i}surfacePoint(e,t){if(t>.02)return this.closestSurfacePoint(e,t);const n=this.nearest(e,t);if(!n)return this.closestSurfacePoint(e,t);const i=ni(e),r=i.clone(),o=new E,a=Math.min(...n.volume.spacing)*.3;for(let l=0;l<10;l++){const c=this.distance(n,r);for(let h=0;h<3;h++){const u=r.clone(),d=r.clone();u.setComponent(h,u.getComponent(h)-a),d.setComponent(h,d.getComponent(h)+a),o.setComponent(h,(this.distance(n,d)-this.distance(n,u))/(2*a))}if(!Number.isFinite(c)||o.lengthSq()<1e-9)return this.closestSurfacePoint(e,t);if(Math.abs(c)<4e-5)break;r.addScaledVector(o,-c/o.lengthSq())}return r.distanceTo(i)>t||Math.abs(this.distance(n,r))>3e-4?this.closestSurfacePoint(e,t):(r.normal=o.normalize(),r.fragmentId=n.id,r)}closestSurfacePoint(e,t){const n=ni(e);if(!Number.isFinite(t)||t<=0||!n.toArray().every(Number.isFinite))return null;let i=t*t,r=null;const o=new yn,a=new E,l=new E,c=new E,h=new E;for(const u of this.items.values()){if(u.box.distanceToPoint(n)>t)continue;const d=n.clone().sub(u.position).applyQuaternion(u.quaternion.clone().invert()),f=u.mesh.geometry,g=f.attributes.position,_=f.attributes.normal,m=f.index.array;for(let p=0;p<m.length;p+=3){const S=m[p],y=m[p+1],M=m[p+2];o.a.fromBufferAttribute(g,S),o.b.fromBufferAttribute(g,y),o.c.fromBufferAttribute(g,M),o.closestPointToPoint(d,a);const R=d.distanceToSquared(a);R>i||(i=R,o.getBarycoord(a,l),c.fromBufferAttribute(_,S).multiplyScalar(l.x),c.addScaledVector(h.fromBufferAttribute(_,y),l.y),c.addScaledVector(h.fromBufferAttribute(_,M),l.z),(!Number.isFinite(c.lengthSq())||c.lengthSq()<1e-12)&&o.getNormal(c),r=a.clone().applyQuaternion(u.quaternion).add(u.position),r.normal=c.clone().applyQuaternion(u.quaternion).normalize(),r.fragmentId=u.id)}}return r}attach(e,t,n){const i=this.items.get(e);if(!i)return!1;const r=Mo(n);return i.attachment={anchor:ni(t).sub(i.position).applyQuaternion(i.quaternion.clone().invert()).toArray(),rotationOffset:r.clone().invert().multiply(i.quaternion).toArray()},i.held=!0,i.sleeping=!1,i.velocity.set(0,0,0),!0}move(e,t,n){const i=this.items.get(e);return!i?.held||!i.attachment?!1:(i.quaternion.copy(Mo(n)).multiply(Mo(i.attachment.rotationOffset)),i.position.copy(ni(t)).sub(ni(i.attachment.anchor).applyQuaternion(i.quaternion)),i.velocity.set(0,0,0),this.sync(i),!0)}release(e){const t=this.items.get(e);return t?(t.held=!1,t.attachment=null,t.sleeping=!1,t.contactTime=0,t.velocity.set(0,0,0),!0):!1}update(e){if(!Number.isFinite(e)||e<=0)return;const t=this.tissue.group.getWorldQuaternion(new Fe).invert(),n=new E(0,-9.81,0).applyQuaternion(t),i=new E(0,1,0).applyQuaternion(t),r=Math.max(1,Math.ceil(Math.min(.05,e)/.01)),o=Math.min(.05,e)/r;for(const a of this.items.values())if(!(a.held||a.sleeping)){for(let l=0;l<r;l++){a.velocity.addScaledVector(n,o).multiplyScalar(Math.exp(-o*1.6)),a.position.addScaledVector(a.velocity,o);let c=0,h=null,u=0;for(const f of a.support){const g=f.clone().applyQuaternion(a.quaternion).add(a.position),_=this.tissue.sampleDistance(g);Number.isFinite(_)&&_<c&&(c=_,h=g);const m=this.tissue.group.localToWorld(g.clone());u=Math.max(u,.959-m.y)}let d=!1;if(h&&c<-1e-4){const f=new E,g=6e-4;for(let m=0;m<3;m++){const p=h.clone(),S=h.clone();p.setComponent(m,p.getComponent(m)-g),S.setComponent(m,S.getComponent(m)+g),f.setComponent(m,(this.tissue.sampleDistance(S)-this.tissue.sampleDistance(p))/(2*g))}(!Number.isFinite(f.lengthSq())||f.lengthSq()<1e-8)&&f.copy(i),f.normalize(),a.position.addScaledVector(f,Math.min(.008,-c+2e-4));const _=a.velocity.dot(f);_<0&&a.velocity.addScaledVector(f,-_),d=!0}if(u>0){a.position.addScaledVector(i,u);const f=a.velocity.dot(i);f<0&&a.velocity.addScaledVector(i,-f),d=!0}if(d?(a.velocity.multiplyScalar(Math.exp(-o*18)),a.contactTime+=o):a.contactTime=0,a.contactTime>.3&&a.velocity.length()<.003){a.sleeping=!0,a.velocity.set(0,0,0);break}}this.sync(a)}}get metrics(){return{count:this.items.size,volumeMm3:[...this.items.values()].reduce((e,t)=>e+t.volumeMm3,0),pieces:[...this.items.values()].map(e=>({id:e.id,volumeMm3:e.volumeMm3,position:e.position.toArray(),quaternion:e.quaternion.toArray(),held:e.held,sleeping:e.sleeping}))}}}const ii=s=>Array.isArray(s)?[...s]:[s.x,s.y,s.z],vu=s=>s.map(e=>Nr(e)),Va=(s,e,t)=>Math.max(e[0]-s[0],0,s[0]-t[0])**2+Math.max(e[1]-s[1],0,s[1]-t[1])**2+Math.max(e[2]-s[2],0,s[2]-t[2])**2,Ha=(s,e,t=1)=>s>0&&(e>=0||s*t*t>=e*e);class Hy{constructor(){this.group=new Ye,this.group.name="anatomical-liver-volume",this.ready=!1,this.busy=!1,this.removedVolumeMm3=0,this.totalVolumeMm3=0,this.voxelMm=1.5,this.error=null,this._meshes=new Map,this._cuts=[],this._cutGroups=[],this._cutGroupMap=new Map,this._indexedCuts=this._cuts,this._indexedCutCount=0,this._queryStats={queries:0,mappedGroups:0,evaluatedCutters:0,skippedGroups:0,skippedCutters:0},this._commands=[],this._epoch=0,this._sequence=0,this._inFlight=null,this._disposed=!1,this._deformation=null,this._affectedVertices=0,this._deformationStats={cacheBuilds:0,radiusUpdates:0,movedVertices:0},this.material=ky(),this.fragments=new Vy(this),this._separations=[],this._excludedValues=new Map,this._restoringFragmentPoses=null}async load(e="./assets/liver-volume"){if(this._disposed)throw new Error("TissueVolume has been disposed");if(this.worker)throw new Error("This tissue volume has already been loaded");let t=String(e).replace(/\.(?:json|bin)$/,"");t.endsWith("/")&&(t+="liver-volume");const[n,i]=await Promise.all([fetch(`${t}.json`),fetch(`${t}.bin`)]);if(!n.ok||!i.ok)throw new Error("Could not load the anatomical liver volume");const[r,o]=await Promise.all([n.json(),i.arrayBuffer()]);return this.metadata=Sd(r),this._baseField=new Float32Array(o.slice(0)),this.worker=new Worker(new URL(""+new URL("tissue-worker-B1cwF8Kn.js",import.meta.url).href,import.meta.url),{type:"module"}),this.worker.onmessage=({data:a})=>this._receive(a),this.worker.onerror=a=>this._fail(new Error(a.message||"Tissue geometry worker failed")),await this._enqueue({type:"init",metadata:r,buffer:o,transfer:[o]}),this.ready=!0,this.onChange?.(),this}cut(e,t){return this.cutSegment(e,e,t)}cutSegment(e,t,n){if(!this.ready||this._disposed)return Promise.resolve({changed:!1,removedMm3:0,reason:"not-ready"});let i;try{i=Nr({a:ii(e),b:ii(t),radius:n,deformation:this._deformation})}catch(o){return Promise.reject(o)}const r=this._cuts.at(-1);return r&&i.radius===r.radius&&JSON.stringify(i)===JSON.stringify(r)?Promise.resolve({changed:!1,removedMm3:0,removedVolumeMm3:this.removedVolumeMm3}):this._cuts.length>=5e4?Promise.resolve({changed:!1,removedMm3:0,reason:"history-limit"}):(this._cuts.push(i),this._enqueue({type:"cut",cuts:[i]}))}snapshot(){return{version:2,cuts:vu(this._cuts),deformation:this._deformation?Qi(this._deformation):null,separations:structuredClone(this._separations),fragments:this.fragments.snapshot()}}async restore(e){if(!this.ready||this._disposed)return{changed:!1,reason:"not-ready"};if(!e||![1,2].includes(e.version)||!Array.isArray(e.cuts)||e.cuts.length>5e4)throw new Error("Invalid tissue snapshot");const t=e.cuts.map(Nr);this._epoch++;for(const n of this._commands.splice(0))n.resolve({changed:!1,cancelled:!0});return this._cuts=vu(t),this._restoringFragmentPoses=new Map((e.fragments??[]).map(n=>[n.id,structuredClone(n)])),this.setGrasp(e.deformation??null),this._enqueue({type:"restore",cuts:t,separations:structuredClone(e.separations??[])})}reset(){return this.restore({version:1,cuts:[]})}toReferencePoint(e){return new E().fromArray(Wl(ii(e),this._deformation))}deformPoint(e){return new E().fromArray(Ws(ii(e),this._deformation))}queryReferenceDistance(e){return this._sampleReferenceDistance(ii(e))}getFragment(e){return this.fragments.items.get(e)??null}fragmentAtReference(e){return this.fragments.atReference(e)}findFragmentAt(e,t=.006){return this.fragments.nearest(e,t)?.id??null}findSpecimenGraspPoint(e,t=.35){return this.fragments.surfacePoint(e,t)}attachFragment(e,t,n){return this.fragments.attach(e,t,n)}moveHeldFragment(e,t,n){return this.fragments.move(e,t,n)}releaseFragment(e){return this.fragments.release(e)}updateFragments(e){this.fragments.update(e)}get fragmentMetrics(){return this.fragments.metrics}sampleDistance(e){if(!this._baseField)return 1/0;const t=ii(e);return t.some(n=>!Number.isFinite(n))?1/0:this._sampleReferenceDistance(Wl(t,this._deformation))}_sampleReferenceDistance(e){const t=this.metadata;if(e.some(a=>!Number.isFinite(a)))return 1/0;const n=e.map((a,l)=>(a-t.origin[l])/t.spacing[l]);if(n.some((a,l)=>a<0||a>t.dims[l]-1))return 1/0;const i=n.map((a,l)=>Math.min(Math.floor(a),t.dims[l]-2)),r=n.map((a,l)=>a-i[l]);let o=0;for(let a=0;a<=1;a++)for(let l=0;l<=1;l++)for(let c=0;c<=1;c++){const h=(c?r[0]:1-r[0])*(l?r[1]:1-r[1])*(a?r[2]:1-r[2]),u=Xn(t,i[0]+c,i[1]+l,i[2]+a);o+=h*(this._excludedValues.get(u)??this._baseField[u])}this._ensureCutIndex(),this._queryStats.queries++;for(const a of this._cutGroups){if(Ha(Va(e,a.referenceLow,a.referenceHigh),o,a.minimumScale)){this._queryStats.skippedGroups++;continue}const l=a.deformation?Ws(e,a.deformation):e;if(this._queryStats.mappedGroups++,Ha(Va(l,a.low,a.high),o)){this._queryStats.skippedGroups++;continue}for(const c of a.entries){if(o>=c.cut.radius||Ha(Va(l,c.low,c.high),o)){this._queryStats.skippedCutters++;continue}o=Math.max(o,c.cut.radius-bd(l,c.cut.a,c.cut.b)),this._queryStats.evaluatedCutters++}}return o}_ensureCutIndex(){for((this._indexedCuts!==this._cuts||this._indexedCutCount>this._cuts.length)&&(this._cutGroups=[],this._cutGroupMap.clear(),this._indexedCuts=this._cuts,this._indexedCutCount=0);this._indexedCutCount<this._cuts.length;){const e=this._cuts[this._indexedCutCount++],t=e.deformation,n=t?[...t.local,...t.displacement,t.radius].join(","):"rest";let i=this._cutGroupMap.get(n);if(!i){const l=t?1-2.109375*Math.hypot(...t.displacement)/t.radius:1;i={deformation:t,minimumScale:l,entries:[],low:[1/0,1/0,1/0],high:[-1/0,-1/0,-1/0],referenceLow:[1/0,1/0,1/0],referenceHigh:[-1/0,-1/0,-1/0]},this._cutGroupMap.set(n,i),this._cutGroups.push(i)}const r=e.a.map((l,c)=>Math.min(l,e.b[c])-e.radius),o=e.a.map((l,c)=>Math.max(l,e.b[c])+e.radius),a=t?.displacement??[0,0,0];for(let l=0;l<3;l++)i.low[l]=Math.min(i.low[l],r[l]),i.high[l]=Math.max(i.high[l],o[l]),i.referenceLow[l]=Math.min(i.referenceLow[l],r[l]-Math.max(0,a[l])),i.referenceHigh[l]=Math.max(i.referenceHigh[l],o[l]-Math.min(0,a[l]));i.entries.push({cut:e,low:r,high:o})}}get queryMetrics(){return{...this._queryStats,groups:this._cutGroups.length,cuts:this._cuts.length}}contains(e,t=0){return this.sampleDistance(e)<=Math.max(0,Number.isFinite(t)?t:0)}findGraspPoint(e,t=.008){if(!this._baseField||!e||!Number.isFinite(t)||t<=0)return null;const n=this.fragments.surfacePoint(e,t);return n||this.findParentSurfacePoint(e,t)}findParentSurfacePoint(e,t=.008){if(!this._baseField||!e||!Number.isFinite(t)||t<=0)return null;const n=new E().fromArray(ii(e)),i=this.sampleDistance(n);if(!Number.isFinite(i)||Math.abs(i)>t)return null;const r=n.clone(),o=new E,a=Math.min(...this.metadata.spacing)*.35;for(let l=0;l<12;l++){const c=this.sampleDistance(r);for(let u=0;u<3;u++){const d=r.clone(),f=r.clone();d.setComponent(u,d.getComponent(u)-a),f.setComponent(u,f.getComponent(u)+a),o.setComponent(u,(this.sampleDistance(f)-this.sampleDistance(d))/(2*a))}const h=o.lengthSq();if(!Number.isFinite(h)||h<1e-9)return null;if(Math.abs(c)<25e-6)break;r.addScaledVector(o,-c/h)}return!Number.isFinite(this.sampleDistance(r))||Math.abs(this.sampleDistance(r))>25e-5||r.distanceTo(n)>t*1.8?null:(r.normal=o.normalize(),r)}get graspMetrics(){const e=this._deformation;return{active:!!e,displacementMm:e?Math.hypot(...e.displacement)*1e3:0,radiusMm:e?e.radius*1e3:0,affectedVertices:this._affectedVertices,local:e?[...e.local]:null,displacement:e?[...e.displacement]:[0,0,0],model:"Invertible compact geometric displacement; not calibrated tissue mechanics"}}get deformationMetrics(){return{...this._deformationStats}}setGrasp(e,t){let n=null;try{e&&t?n=Qi({local:ii(e),displacement:ii(t)}):e?.local&&(n=Qi(e))}catch{return!1}if(n&&(n.radius<1e6&&(n.radius=Math.ceil(n.radius*1e3)/1e3),this._deformation&&n.local.every((i,r)=>i===this._deformation.local[r])&&(n.radius=Math.max(n.radius,this._deformation.radius))),JSON.stringify(n)===JSON.stringify(this._deformation))return!0;this._deformation=n,this._affectedVertices=0;for(const i of this._meshes.values())this._affectedVertices+=this._applyDeformation(i);return!0}_applyDeformation(e){const t=e.geometry,n=t.userData.restPositions,i=t.userData.restNormals,r=t.attributes.position.array,o=t.attributes.normal.array,a=this._deformation;if(!a)return t.userData.deformed&&(r.set(n),o.set(i),t.attributes.position.clearUpdateRanges(),t.attributes.normal.clearUpdateRanges(),t.attributes.position.needsUpdate=!0,t.attributes.normal.needsUpdate=!0,t.userData.deformed=!1,t.boundingSphere.copy(t.userData.restSphere),t.boundingBox.copy(t.userData.restBox)),0;const l=a.local.join(",");let c=t.userData.deformationCache,h=!1;if(c?.signature!==l||c.capacity<a.radius){this._deformationStats.cacheBuilds++,t.userData.deformed&&(r.set(n),o.set(i)),h=!!t.userData.deformed;const v=Math.max(.14,a.radius*1.5),x=[],A=[],L=t.userData.restBox,U=a.local;if(Math.max(L.min.x-U[0],0,U[0]-L.max.x)**2+Math.max(L.min.y-U[1],0,U[1]-L.max.y)**2+Math.max(L.min.z-U[2],0,U[2]-L.max.z)**2<v*v)for(let B=0;B<n.length;B+=3){const O=n[B]-U[0],K=n[B+1]-U[1],V=n[B+2]-U[2],$=Math.sqrt(O*O+K*K+V*V);$<v&&(x.push(B),A.push($))}c={signature:l,capacity:v,indices:new Uint32Array(x),distances:new Float32Array(A),weights:new Float32Array(x.length),gradients:new Float32Array(x.length*3),radius:0,maximumWeight:0,activeCount:0},t.userData.deformationCache=c}const[u,d,f]=a.displacement,[g,_,m]=a.local,p=a.radius,S=1/p,y=S*S,M=c.radius!==p;M&&this._deformationStats.radiusUpdates++;let R=0,P=0,w=1/0,C=-1/0;for(let v=0;v<c.indices.length;v++){const x=c.indices[v],A=v*3;let L=c.weights[v];if(M){const de=c.distances[v];if(de>=p){c.weights[v]=0;continue}const Le=de*S,Qe=1-Le,tt=Qe*Qe;L=tt*tt*(4*Le+1);const qe=-20*tt*Qe*y;c.weights[v]=L,c.gradients[A]=(n[x]-g)*qe,c.gradients[A+1]=(n[x+1]-_)*qe,c.gradients[A+2]=(n[x+2]-m)*qe}if(!L)continue;R++,P=Math.max(P,L),w=Math.min(w,x),C=Math.max(C,x);const U=c.gradients[A],I=c.gradients[A+1],B=c.gradients[A+2];r[x]=n[x]+u*L,r[x+1]=n[x+1]+d*L,r[x+2]=n[x+2]+f*L;const O=(i[x]*u+i[x+1]*d+i[x+2]*f)/(1+U*u+I*d+B*f),K=i[x]-U*O,V=i[x+1]-I*O,$=i[x+2]-B*O,se=Math.sqrt(K*K+V*V+$*$)||1;o[x]=K/se,o[x+1]=V/se,o[x+2]=$/se}if(c.radius=p,c.maximumWeight=P,c.activeCount=R,this._deformationStats.movedVertices+=R,(R||t.userData.deformed)&&(t.attributes.position.clearUpdateRanges(),t.attributes.normal.clearUpdateRanges(),!h&&R&&(t.attributes.position.addUpdateRange(w,C-w+3),t.attributes.normal.addUpdateRange(w,C-w+3)),t.attributes.position.needsUpdate=!0,t.attributes.normal.needsUpdate=!0),R||t.userData.deformed){const v=Math.sqrt(u*u+d*d+f*f)*P;t.boundingSphere.copy(t.userData.restSphere),t.boundingSphere.radius+=v,t.boundingBox.copy(t.userData.restBox).expandByScalar(v)}return t.userData.deformed=!!R,R}_enqueue(e){return this.worker?(this.busy=!0,new Promise((t,n)=>{this._commands.push({...e,epoch:this._epoch,resolve:t,reject:n}),queueMicrotask(()=>this._flush())})):Promise.reject(new Error("Tissue worker is not available"))}_flush(){if(this._inFlight||!this._commands.length||this._disposed)return;const e=this._commands.shift(),t=[e];if(e.type==="cut")for(;this._commands[0]?.type==="cut"&&this._commands[0].epoch===e.epoch&&e.cuts.length<256;){const a=this._commands.shift();t.push(a),e.cuts.push(...a.cuts)}e.id=++this._sequence,this._inFlight={command:e,callbacks:t};const{resolve:n,reject:i,transfer:r,...o}=e;this.worker.postMessage(o,r??[])}_receive(e){const t=this._inFlight;if(!(!t||e.id!==t.command.id)){if(this._inFlight=null,e.error){const n=new Error(e.error);this.error=n,t.callbacks.forEach(i=>i.reject(n))}else if(e.epoch!==this._epoch)t.callbacks.forEach(n=>n.resolve({changed:!1,cancelled:!0}));else{if(e.exclusions?.reset&&this._excludedValues.clear(),e.exclusions)for(let i=0;i<e.exclusions.nodeIndices.length;i++)this._excludedValues.set(e.exclusions.nodeIndices[i],e.exclusions.positiveValues[i]);(e.type==="init"||e.type==="restore")&&this.fragments.clear();for(const i of e.fragments??[])this.fragments.add(i,this._restoringFragmentPoses?.get(i.id));e.separations&&(this._separations=structuredClone(e.separations)),e.type==="restore"&&(this._restoringFragmentPoses=null);for(const i of e.chunks)this._replaceChunk(i);Object.assign(this,e.statistics);const n={changed:!!e.changedSamples||e.type!=="cut",removedMm3:e.removedMm3,removedVolumeMm3:this.removedVolumeMm3,totalVolumeMm3:this.totalVolumeMm3,fragments:(e.fragments??[]).map(i=>i.id)};t.callbacks.forEach(i=>i.resolve(n)),this.onChange?.(n)}this.busy=!!this._commands.length,this._flush()}}_replaceChunk(e){const t=this._meshes.get(e.key);if(t?.geometry.userData.deformed&&(this._affectedVertices-=t.geometry.userData.deformationCache?.activeCount??0),t&&(t.geometry.dispose(),this.group.remove(t),this._meshes.delete(e.key)),!e.positions.length)return;const n=new Ut;n.userData.restPositions=e.positions,n.userData.restNormals=e.normals,n.setAttribute("position",new ct(e.positions.slice(),3).setUsage(kc)),n.setAttribute("normal",new ct(e.normals.slice(),3).setUsage(kc)),n.setAttribute("color",new ct(e.colors,3)),n.setAttribute("tissueRestPosition",new ct(e.positions,3)),n.setAttribute("tissueCutMask",new ct(e.cutMasks??new Float32Array(e.positions.length/3),1)),n.setIndex(new ct(e.indices,1)),n.computeBoundingSphere(),n.userData.restSphere=n.boundingSphere.clone(),n.computeBoundingBox(),n.userData.restBox=n.boundingBox.clone();const i=new $e(n,this.material);i.name=`liver-chunk-${e.key}`,i.castShadow=!0,i.receiveShadow=!0,i.layers.enable(1),i.userData.tissue=!0,this._affectedVertices+=this._applyDeformation(i),this.group.add(i),this._meshes.set(e.key,i)}_fail(e){this.error=e,this.busy=!1,this._inFlight?.callbacks.forEach(t=>t.reject(e)),this._inFlight=null;for(const t of this._commands.splice(0))t.reject(e)}dispose(){this._disposed=!0,this.ready=!1,this.worker?.terminate(),this._fail(new Error("Tissue volume disposed"));for(const e of this._meshes.values())e.geometry.dispose();this.fragments.clear(),this._excludedValues.clear(),this._meshes.clear(),this.group.clear(),this.material.dispose(),this._baseField=null}}const ji=s=>s==null?null:structuredClone(s),Ti=(s,e)=>s.group.worldToLocal(new E(...e));class Gy{constructor(e,t,{onMessage:n=()=>{},onEvent:i=()=>{},toolDirection:r,toolQuaternion:o}={}){this.sim=e,this.tissue=t,this.onMessage=n,this.onEvent=i,this.toolDirection=r,this.toolQuaternion=o,this.grasp=null,this.relaxing=null,this.cuttingBusy=!1,this.lastCut=null,this.contact={left:!1,right:!1,rightDepthMm:0,cutting:!1},this._generation=0,this._fragmentRebaseId=null}snapshot(){return{version:3,tissue:this.tissue.snapshot(),grasp:ji(this.grasp),relaxing:ji(this.relaxing)}}async restore(e){const t=++this._generation;this._fragmentRebaseId=null,this.lastCut=null,this.relaxing=null,await this.tissue.restore(e?.tissue??e),t===this._generation&&(this.grasp=ji(e?.grasp),this.grasp&&(this.grasp.kind??=this.grasp.fragmentId!=null?"fragment":"tissue",Object.hasOwn(this.grasp,"reference")||(this.grasp.reference=this.grasp.kind==="fragment"?null:[...this.grasp.local])),this.relaxing=ji(e?.relaxing),this.grasp?.kind==="fragment"&&(this._fragmentRebaseId=this.grasp.fragmentId),this.grasp?.kind!=="fragment"&&this.applyGrasp())}release(e=!1){this._fragmentRebaseId=null;const t=this.grasp;t?.kind==="fragment"?this.tissue.releaseFragment?.(t.fragmentId):t&&!e&&(this.relaxing={...ji(t),remaining:1}),this.grasp=null,e&&(this.relaxing=null,this.tissue.setGrasp(null)),this.onEvent("release",{kind:t?.kind??"tissue",fragmentId:t?.fragmentId??null})}_toolQuaternionLocal(e="left"){const t=this.toolQuaternion?.(e);let n;if(t?.isQuaternion)n=t.clone();else if(Array.isArray(t)&&t.length===4&&t.every(Number.isFinite))n=new Fe().fromArray(t);else{const i=this.sim.state.tools[e],r=new E(...i.position).sub(new E(...i.port));r.lengthSq()<1e-16?r.set(0,0,1):r.normalize(),n=new Fe().setFromUnitVectors(new E(0,0,1),r).multiply(new Fe().setFromEuler(new En(i.wrist[0],i.wrist[1],i.wrist[2],"XYZ")))}return this.tissue.group.getWorldQuaternion(new Fe).invert().multiply(n).normalize()}_attachFragment(e,t=null,{transition:n=!1,surfaceAnchor:i=null}={}){if(e==null||!this.tissue.getFragment?.(e))return!1;const r=Ti(this.tissue,this.sim.state.tools.left.position);if(this.tissue.attachFragment?.(e,i??r,this._toolQuaternionLocal())===!1)return!1;const o=this.grasp;return n&&o?.kind!=="fragment"&&(this.relaxing={...ji(o),remaining:1},this.tissue.setGrasp(null)),this.grasp={kind:"fragment",fragmentId:e,local:r.toArray(),reference:t?[...t]:null,displacement:[0,0,0]},this._fragmentRebaseId=null,this.onEvent("fragment-grasp",{fragmentId:e,transition:n}),this.onMessage(n?"切断已确认：左钳现夹持独立组织块，可移动、旋转，V 松开":"已夹住切离组织块：可移动和旋转，V 松开放下"),!0}_reconcileDetachedGrasp(){if(!this.grasp||this.grasp.kind==="fragment")return!1;const e=this.grasp.reference??this.grasp.local,t=this.tissue.fragmentAtReference?.(new E(...e));let n=t?.id??(typeof t=="string"||typeof t=="number"?t:null);if(n==null&&!this.tissue.fragmentAtReference){const i=this.tissue.deformPoint?.(new E(...e))??Ti(this.tissue,this.sim.state.tools.left.position);n=this.tissue.findFragmentAt?.(i,.005)??null}return n!=null?this._attachFragment(n,e,{transition:!0}):!1}applyGrasp(){if(!this.grasp)return;if(this.grasp.kind==="fragment"){if(!this.tissue.getFragment?.(this.grasp.fragmentId)){this.grasp=null,this._fragmentRebaseId=null,this.onMessage("该组织块已不存在，左钳夹持已解除");return}if(this.sim.state.paused)return;const n=Ti(this.tissue,this.sim.state.tools.left.position),i=this._toolQuaternionLocal();if(this._fragmentRebaseId===this.grasp.fragmentId){if(this.tissue.attachFragment?.(this.grasp.fragmentId,n,i)===!1)return;this._fragmentRebaseId=null}this.tissue.moveHeldFragment?.(this.grasp.fragmentId,n,i);return}const t=Ti(this.tissue,this.sim.state.tools.left.position).sub(new E(...this.grasp.local));this.grasp.displacement=t.toArray(),this.tissue.setGrasp(new E(...this.grasp.local),t)}updateGrasp(e){const t=this.sim.state.tools.left;if(this._reconcileDetachedGrasp(),t.jaw>.32&&this.grasp&&this.release(),t.jaw<.16&&!this.grasp&&!this.relaxing){const n=Ti(this.tissue,t.position),i=this.tissue.findGraspPoint(n,.006);if(i)if(i.fragmentId!=null)this._attachFragment(i.fragmentId,i.reference?.toArray?.()??null,{surfaceAnchor:i});else{const r=this.tissue.toReferencePoint?.(i)??i;this.grasp={kind:"tissue",fragmentId:null,local:r.toArray(),reference:r.toArray(),displacement:[0,0,0]},this.onEvent("grasp"),this.onMessage("左钳已夹住肝包膜：按 E 抬起，组织会随钳尖牵拉；V 松开")}}this.grasp&&this.applyGrasp(),(!this.grasp||this.grasp.kind==="fragment")&&this.relaxing?(this.relaxing.remaining*=Math.exp(-e*11),this.tissue.setGrasp(new E(...this.relaxing.local),new E(...this.relaxing.displacement).multiplyScalar(this.relaxing.remaining)),this.relaxing.remaining<.008&&(this.relaxing=null,this.tissue.setGrasp(null))):(!this.grasp||this.grasp.kind==="fragment")&&this.tissue.setGrasp(null)}async update(e,{clutched:t=!1}={}){if(!this.tissue.ready||this.sim.state.paused)return;this.updateGrasp(e),this.tissue.updateFragments?.(e);const{left:n,right:i}=this.sim.state.tools,r=Ti(this.tissue,n.position),o=this.tissue.sampleDistance(r),a=this.tissue.findFragmentAt?.(r,.006)??null,l=Ti(this.tissue,i.position),c=this.tissue.sampleDistance(l);if(this.contact.left=o<.006||a!=null,this.contact.leftFragmentId=a,this.contact.right=c<.0032,this.contact.rightDepthMm=Number.isFinite(c)?-c*1e3:0,this.contact.cutting=!1,!this.sim.state.cutting||i.jaw>.22||t){this.lastCut=null;return}if(this.cuttingBusy||this.tissue.busy)return;const h=this.tissue.graspMetrics?.displacement??this.grasp?.displacement??[0,0,0];if(this.lastCut&&l.distanceTo(this.lastCut.point)<55e-5&&new E(...h).distanceTo(this.lastCut.deformation)<55e-5)return;const u=this.toolDirection?.("right")?.clone()??new E(...i.position).sub(new E(...i.port)).normalize(),d=this.tissue.group.getWorldQuaternion(new Fe).invert();u.applyQuaternion(d).normalize();const f=l.clone().addScaledVector(u,-.008);if(!(c>.0032&&this.tissue.sampleDistance(f)>.0032)){this.lastCut={point:l.clone(),deformation:new E(...h)},this.cuttingBusy=!0,this.contact.cutting=!0;try{const g=this._generation,_=this.tissue.removedVolumeMm3;if(await this.tissue.cutSegment(f,l,.0024),g!==this._generation)return;this._reconcileDetachedGrasp(),this.tissue.removedVolumeMm3>_&&this.onEvent("cut",{volumeMm3:this.tissue.removedVolumeMm3})}finally{this.cuttingBusy=!1}}}get metrics(){return{...this.contact,grasp:ji(this.grasp),deformation:this.tissue.graspMetrics,cuttingBusy:this.cuttingBusy,heldFragmentId:this.grasp?.kind==="fragment"?this.grasp.fragmentId:null}}}function xu(s,e,t=.08){const n=s.findGraspPoint(Ti(s,e),t);if(!n)return null;const i=(n.normal??new E(0,0,1)).clone().applyQuaternion(s.group.getWorldQuaternion(new Fe)).normalize();return{point:s.group.localToWorld(n.clone()),normal:i,fragmentId:n.fragmentId??null,reference:(s.toReferencePoint?.(n)??n).clone()}}const yu=s=>s*s*(3-2*s),Wy={left:[-.025,1.106,-.015],right:[.025,1.108,-.015]};function Xy(s,{depth:e=.012,cutRadius:t=.0024}={}){if(!s.queryReferenceDistance||!s.metadata)return[];const n=s.metadata,i=Math.max(...n.spacing),r=Math.min(t*1.45,Math.max(.0025,i*1.8)),o=n.bounds??[n.origin.map(c=>c+i*2),n.origin.map((c,h)=>c+(n.dims[h]-3)*n.spacing[h])],a=c=>s.queryReferenceDistance(new E(...c)),l=[];for(let c=0;c<3;c++)for(const h of[-1,1]){const u=[0,1,2].filter(x=>x!==c),d=o[h>0?1:0][c],f=d-h*e,g=[];let _=1/0,m=-1/0,p=1/0,S=-1/0;for(let x=o[0][u[1]]-r;x<=o[1][u[1]]+r;x+=r)for(let A=o[0][u[0]]-r;A<=o[1][u[0]]+r;A+=r){const L=[0,0,0];L[c]=f,L[u[0]]=A,L[u[1]]=x;const U=a(L);U<=t&&(_=Math.min(_,A),m=Math.max(m,A),p=Math.min(p,x),S=Math.max(S,x)),U<0&&g.push({point:L,distance:U})}if(g.length<4||!Number.isFinite(_))continue;g.sort((x,A)=>x.distance-A.distance);let y=null,M=-1/0;for(const x of g.slice(0,24)){const A=[...x.point];let L=d+h*i*2;for(let U=L;h*(U-f)>=0;U-=h*i*.65){if(A[c]=U,a(A)<=0){let I=U,B=L;for(let O=0;O<12;O++)A[c]=(I+B)*.5,a(A)<=0?I=A[c]:B=A[c];A[c]=(I+B)*.5,h*A[c]>M&&(y=[...A],M=h*A[c]);break}L=U}}if(!y||h*(y[c]-f)<t*2+i)continue;const R=new E().setComponent(c,h),P=R.clone().applyQuaternion(s.group.getWorldQuaternion(new Fe)).normalize();_-=t*1.5,m+=t*1.5,p-=t*1.5,S+=t*1.5;const w=Math.max(2,Math.ceil((S-p)/r)+1),C=[];for(let x=0;x<w;x++){const A=p+(S-p)*x/(w-1);for(const L of x%2?[m,_]:[_,m]){const U=[0,0,0];U[c]=f,U[u[0]]=L,U[u[1]]=A,C.push(new E(...U))}}const v=C.slice(1).reduce((x,A,L)=>x+A.distanceTo(C[L]),0);v>2.8||l.push({axis:c,sign:h,plane:f,normal:R,worldNormal:P,referenceAnchor:new E(...y),path:C,cutRadius:t,rowSpacing:(S-p)/(w-1),length:v,score:v*(P.y<-.25?1.5:1)})}return l.sort((c,h)=>c.score-h.score)}class qy{constructor(e,t,n,{onMessage:i=()=>{},onChange:r=()=>{}}={}){Object.assign(this,{sim:e,tissue:t,interaction:n,onMessage:i,onChange:r}),this.active=!1,this.mode=null}stop(e="已结束自动操作，可继续手动控制"){this.active&&(this.active=!1,this.sim.setCutting(!1),this.interaction.lastCut=null,this.onChange(),e&&this.onMessage(e))}move(e,t){return this.sim.moveToolTo(e,t).limited?(this.stop("自动路径被另一器械挡住；请先移开另一器械，再重新就位"),!1):!0}approach(){const e=this.sim.state.selected;if(e==="scope"){this.onMessage("先选左钳或右剪，再进行表面就位");return}const t=this.sim.state.tools[e],n=xu(this.tissue,t.position)??xu(this.tissue,Wy[e]);if(!n){this.onMessage("当前区域没有可接近的组织表面");return}this.sim.checkpoint("器械表面就位",this.interaction.snapshot()),e==="left"&&this.interaction.release(!0),this.sim.setCutting(!1),this.sim.setJaw(e,.7),this.mode="approach",this.active=!0,this.time=0,this.side=e,this.approachFragment=null,this.start=new E(...t.position),this.end=n.point.addScaledVector(n.normal,.001),this.onMessage(`${e==="left"?"左钳":"右剪"}正在贴近实际肝表面`),this.onChange()}approachSpecimen(){if(this.interaction.grasp)return this.onMessage("左钳正在夹持组织，请先按 V 松开后再接近标本"),!1;if(this.sim.state.paused)return this.onMessage("请先继续仿真，再接近标本"),!1;const e=this.tissue.fragmentMetrics?.pieces??[],t=new Set(e.filter(c=>!c.held).map(c=>c.id));if(!t.size)return this.onMessage(e.length?"独立组织块正被夹持，请先松开":"目前没有独立标本；请先完成真实切离"),!1;const n=this.sim.state.tools.left,i=this.tissue.group.worldToLocal(new E(...n.position)),r=this.tissue.findSpecimenGraspPoint?.(i,.35),o=r?.fragmentId!=null?this.tissue.getFragment?.(r.fragmentId):null;if(!o||!t.has(o.id))return this.onMessage("附近 35 cm 内未找到可接近的独立标本表面，不会退回母体"),!1;const a=(r.normal??new E(0,1,0)).clone().normalize(),l=o.quaternion.clone().invert();return this.sim.checkpoint("左钳接近独立标本",this.interaction.snapshot()),this.sim.select("left"),this.sim.setCutting(!1),this.sim.setJaw("left",.75),this.mode="approach",this.active=!0,this.time=0,this.side="left",this.start=new E(...n.position),this.approachFragment={id:o.id,anchor:r.clone().sub(o.position).applyQuaternion(l),normal:a.applyQuaternion(l)},this.end=this.tissue.group.localToWorld(r.clone()),this.onMessage("左钳正在接近最近的独立标本，标本移动时目标会随动；就位后按 C 重抓"),this.onChange(),!0}startExample(){if(this.active){this.stop();return}if(this.tissue.busy){this.onMessage("组织更新中，请稍候再开始示范");return}const e=Xy(this.tissue);let t=null;for(const n of e)if(t=this._preparePlan(n),t)break;if(!t){this.onMessage("当前器官没有可安全到达的薄缘切离路径；请移开器械或重置完整器官后重试");return}Object.assign(this,t),this.sim.checkpoint("真实切离、夹持与移开示范",this.interaction.snapshot()),this.interaction.release(!0),this.sim.setCutting(!1),this.sim.setPaused(!1),this.sim.select("right"),this.sim.setScopeFollow(!0,"grasp"),this.leftStart=new E(...this.sim.state.tools.left.position),this.rightStart=new E(...this.sim.state.tools.right.position),this.sim.setJaw("left",.75),this.sim.setJaw("right",.85),this.active=!0,this.mode="example",this.time=0,this.phaseTime=0,this.phase="park",this.pathIndex=0,this.pathPoint=this.plan.path[0].clone(),this.rasterTravel=0,this.onMessage("切离示范：抓持器官薄缘 → 实际栅格切断基底 → 确认独立组织块后移开"),this.onChange()}_preparePlan(e){const t=f=>this.tissue.group.localToWorld(f.clone()),n=t(e.referenceAnchor),i=new E(0,1,0),r=n.clone().addScaledVector(e.worldNormal,6e-4),o=r.clone().addScaledVector(e.worldNormal,.022).addScaledVector(i,.012),a=o.clone().addScaledVector(e.worldNormal,.045).addScaledVector(i,.025),l=this.tissue.group.worldToLocal(o.clone()).sub(e.referenceAnchor),c=Qi({local:e.referenceAnchor.toArray(),displacement:l.toArray()}),h=f=>t(new E(...Ws(f.toArray(),c))),u=h(e.path[0]),d=[new E(...this.sim.state.tools.right.position),u.clone().addScaledVector(e.worldNormal,.035).addScaledVector(i,.018),u.clone().addScaledVector(e.worldNormal,.07).addScaledVector(i,.05)];for(const f of d)try{const g=new this.sim.constructor;g.restore(this.sim.snapshot()),g.setPaused(!1),g.setJaw("left",.75),g.setJaw("right",.85);let _=g.moveToolTo(f.toArray(),"right").limited||g.moveToolTo(r.toArray(),"left").limited;g.setJaw("left",0),_||=g.moveToolTo(o.toArray(),"left").limited||g.moveToolTo(u.toArray(),"right").limited,g.setJaw("right",0);for(const m of e.path)if(_||g.moveToolTo(h(m).toArray(),"right").limited){_=!0;break}if(!_)return{plan:e,leftRest:r,leftLift:o,leftAway:a,rightStandby:f}}catch{continue}return null}_phase(e,t){this.phase=e,this.phaseTime=0,t&&this.onMessage(t),this.onChange()}_displayReference(e){return this.tissue.group.localToWorld((this.tissue.deformPoint?.(e)??e).clone())}_beginFragmentMove(){this.sim.setCutting(!1),this.rightRetractStart=new E(...this.sim.state.tools.right.position);const e=new E(...this.sim.state.tools.left.position),t=new E(0,1,0),n=new E(...this.sim.state.tools.right.port).sub(this.rightRetractStart).normalize(),i=[.05,.08,.03,.12].map(a=>this.rightRetractStart.clone().addScaledVector(n,a)),r=[this.leftAway,e.clone().addScaledVector(this.plan.worldNormal,.02).addScaledVector(t,.05),e.clone().addScaledVector(this.plan.worldNormal,.06).addScaledVector(t,.045)];let o=null;for(const a of i){for(const l of r){const c=new this.sim.constructor;if(c.restore(this.sim.snapshot()),c.setPaused(!1),!c.moveToolTo(a.toArray(),"right").limited&&(c.setJaw("right",.75),!(c.state.tools.right.jaw<.7||c.moveToolTo(l.toArray(),"left").limited))){o={rightTarget:a,leftTarget:l};break}}if(o)break}if(!o){this.stop("独立组织块已切离并仍由左钳夹持，但没有通过双器械防碰撞的自动移开路径，请手动退出右剪");return}this.rightRetractEnd=o.rightTarget,this.leftAway=o.leftTarget,this._phase("retract","基底已真正断开：独立组织块仍在左钳上，先退出右剪再移开")}update(e){if(!this.active||this.sim.state.paused)return;if(this.time+=e,this.mode==="approach"){if(this.approachFragment){const n=this.tissue.getFragment?.(this.approachFragment.id);if(!n||n.held){this.stop("目标标本已不存在或已被夹持，接近操作已停止");return}const i=this.approachFragment.normal.clone().applyQuaternion(n.quaternion).normalize();this.end=this.tissue.group.localToWorld(this.approachFragment.anchor.clone().applyQuaternion(n.quaternion).add(n.position).addScaledVector(i,7e-4))}if(!this.move(this.start.clone().lerp(this.end,yu(Math.min(1,this.time/1.1))).toArray(),this.side))return;this.time>=1.1&&(this.active=!1,this.onMessage(this.approachFragment?"已接近独立标本表面：按 C 闭合重抓，随后可移动或旋转":"已贴近组织表面：C 闭合，E 抬起；右剪需开启剪切"),this.onChange());return}if(["close-right","raster","wait-separation"].includes(this.phase)&&this.interaction.grasp?.kind==="fragment"){this._beginFragmentMove();return}this.phaseTime+=e;const t=n=>yu(Math.min(1,this.phaseTime/n));if(this.phase==="park"){if(!this.move(this.rightStart.clone().lerp(this.rightStandby,t(1.1)).toArray(),"right"))return;this.phaseTime>=1.1&&this._phase("approach-left")}else if(this.phase==="approach-left"){if(!this.move(this.leftStart.clone().lerp(this.leftRest,t(1.2)).toArray(),"left"))return;this.phaseTime>=1.2&&this._phase("close-left","左钳正在夹住实际薄缘表面")}else if(this.phase==="close-left")this.sim.setJaw("left",.75*(1-t(.6))),this.phaseTime>=.7&&this.interaction.grasp?.kind==="tissue"?this._phase("lift","左钳牵拉薄缘，右剪将完整扫过其基底"):this.phaseTime>1.3&&this.stop("未成功抓住附着组织，示范已停止；请重置或重新表面就位");else if(this.phase==="lift"){if(!this.move(this.leftRest.clone().lerp(this.leftLift,t(1.5)).toArray(),"left"))return;this.phaseTime>=1.5&&(this.rightBeforeCut=new E(...this.sim.state.tools.right.position),this._phase("approach-cut"))}else if(this.phase==="approach-cut"){if(!this.move(this.rightBeforeCut.clone().lerp(this._displayReference(this.plan.path[0]),t(1.2)).toArray(),"right"))return;this.phaseTime>=1.2&&(this.sim.setCutting(!0),this._phase("close-right","右剪闭合，实际扫切完整基底平面；不会用模型替换制造组织块"))}else if(this.phase==="close-right")this.sim.setJaw("right",.85*(1-t(.6))),this.phaseTime>=.7&&this._phase("raster");else if(this.phase==="raster"){if(this.tissue.busy||this.interaction.cuttingBusy)return;const n=this.plan.path[this.pathIndex+1];if(!n){this.sim.setCutting(!1),this.sim.setJaw("right",.7),this._phase("wait-separation","基底扫描完成，正在确认真实体素连通性");return}const i=this.pathPoint.distanceTo(n),r=Math.min(85e-5,.028*e,i);if(i>1e-10&&this.pathPoint.lerp(n,r/i),this.rasterTravel+=r,!this.move(this._displayReference(this.pathPoint).toArray(),"right"))return;i<=r+1e-10&&this.pathIndex++}else if(this.phase==="wait-separation")!this.tissue.busy&&!this.interaction.cuttingBusy&&this.phaseTime>2?this.stop("扫描后该处组织仍相连，未生成独立块；示范已停止，可继续补切或撤销"):this.phaseTime>12&&this.stop("组织拓扑更新尚未完成，未宣称切离成功；请等待后检查");else if(this.phase==="retract"){if(!this.move(this.rightRetractStart.clone().lerp(this.rightRetractEnd,t(1)).toArray(),"right"))return;this.phaseTime>=1&&(this.sim.setJaw("right",.75),this.fragmentMoveStart=new E(...this.sim.state.tools.left.position),this._demoRoll=0,this._phase("move-fragment","左钳正在搬走并旋转真实切离块，母体已独立回弹"))}else if(this.phase==="move-fragment"){const n=t(2.2);if(!this.move(this.fragmentMoveStart.clone().lerp(this.leftAway,n).toArray(),"left"))return;const i=n*Math.PI*.65;this.sim.adjustWrist(2,i-this._demoRoll,"left"),this._demoRoll=i,this.phaseTime>=2.2&&(this.sim.select("left"),this.stop("切离确认完成：左钳夹持的独立组织块已移开并旋转，V 可松开放下；可撤销或重置"))}}}const Mu=new WeakMap,Us=s=>Array.isArray(s)&&s.length===3&&s.every(Number.isFinite),Su=(s,e)=>s.map((t,n)=>(t+e[n])*.5),Ci=s=>new E().fromArray(s);function jy(s,e){let t=Mu.get(s);t||(t=new WeakMap,Mu.set(s,t));let n=t.get(e);return n||(n={queriedAt:-1/0,surface:null,lastSpecimenId:null,epoch:e._epoch,scopeReference:null},t.set(e,n)),n}function Ky(s){const e=s.metadata?.bounds;if(!Array.isArray(e)||e.length!==2||!e.every(Us)||e[0].some((i,r)=>i>e[1][r]))return null;const t=new jn(Ci(e[0]),Ci(e[1])),n=s.graspMetrics?.displacement;return Us(n)&&(t.min.add(Ci(n.map(i=>Math.min(0,i)))),t.max.add(Ci(n.map(i=>Math.max(0,i))))),{local:t,world:t.clone().applyMatrix4(s.group.matrixWorld)}}function Yy(s,e,t){const n=s.fragmentMetrics?.pieces??[],i=e?.grasp?.fragmentId,r=n.find(c=>i!=null&&c.id===i)||n.find(c=>c.held)||n.find(c=>c.id===t.lastSpecimenId)||n.at(-1);if(!r)return t.lastSpecimenId=null,null;const o=s.getFragment?.(r.id),a=o?.mesh;if(!a?.geometry||(a.geometry.boundingSphere||a.geometry.computeBoundingSphere(),!a.geometry.boundingSphere))return null;a.updateWorldMatrix(!0,!1);const l=a.geometry.boundingSphere.clone().applyMatrix4(a.matrixWorld);return!Number.isFinite(l.radius)||l.radius<0||!Us(l.center.toArray())?null:(t.lastSpecimenId=r.id,{id:r.id,position:l.center.toArray(),radius:l.radius})}function $y(s,e,t,n=globalThis.performance?.now?.()??Date.now()){if(!s?.state?.scope||!e?.group)throw new TypeError("Scope context requires a simulation and tissue group.");if(!Number.isFinite(n))throw new TypeError("Scope context timestamp must be finite milliseconds.");const i=jy(s,e),r=s.state,o=r.scope;e.group.updateWorldMatrix(!0,!1),(i.scopeReference!==o||i.epoch!==e._epoch)&&(i.scopeReference=o,i.epoch=e._epoch,i.queriedAt=-1/0,i.surface=Us(o.fieldAnchor)?e.group.worldToLocal(Ci(o.fieldAnchor)):null,i.lastSpecimenId=o.heldSpecimen?.id??null);const a=Ky(e),l=t?.grasp?[...r.tools.left.position]:null,c=!!(r.cutting||t?.grasp&&r.activeTool==="right");let h;if(o.followMode==="grasp"&&l?h=c?Su(l,r.tools.right.position):l:o.followMode==="midpoint"||o.followMode==="grasp"?h=Su(r.tools.left.position,r.tools.right.position):h=[...r.tools[r.activeTool].position],!i.surface&&Us(o.fieldAnchor)&&(i.surface=e.group.worldToLocal(Ci(o.fieldAnchor))),(n<i.queriedAt||n-i.queriedAt>=150||i.epoch!==e._epoch)&&e.ready!==!1&&typeof e.findParentSurfacePoint=="function"){i.queriedAt=n,i.epoch=e._epoch;const d=e.group.worldToLocal(Ci(h));a&&a.local.clampPoint(d,d);const f=e.findParentSurfacePoint(d,.18),g=f?.isVector3?f.toArray():f;Us(g)&&(i.surface=Ci(g))}return{graspTarget:l,operating:c,surfaceTarget:i.surface?e.group.localToWorld(i.surface.clone()).toArray():null,organBounds:a?{min:a.world.min.toArray(),max:a.world.max.toArray()}:null,heldSpecimen:Yy(e,t,i)}}const te=s=>document.getElementById(s),Zy="./",Ur=new Set,Fr=new Set,Jy=new Set(["KeyW","KeyA","KeyS","KeyD","KeyQ","KeyE","KeyZ","KeyX","KeyC","KeyV","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","BracketLeft","BracketRight","Space","ShiftLeft","ShiftRight"]);let Ve,Xe,Ne,At,wt,ui=!1,br="normal",Xl=performance.now(),Ga=0,Wa=0,Xa=0,Co=Xl,bu=0,Ho=0,Et=!1,Ad,Po=[],ss=[],Eu=0;const Do=[],Qy=3e3;let Tu,ql=0;const As={};function Xt(s){te("toast").textContent=s,te("toast").hidden=!1,clearTimeout(Tu),Tu=setTimeout(()=>te("toast").hidden=!0,3e3)}function Er(s,e={}){Do.push({t:Number((Ne?.state.elapsed||0).toFixed(3)),type:s,...e}),Do.length>Qy&&Do.shift()}function hn(){Ur.clear(),Fr.clear(),document.querySelectorAll(".held").forEach(s=>s.classList.remove("held")),At&&(At.lastCut=null)}function ur(s){wt?.stop(""),hn(),Ne.select(s),Jt(),te("stage").focus({preventScroll:!0})}function dr(s){hn(),Ne.setPaused(s),Jt()}function wu(){Ne.setScopeFollow(!Ne.state.scope.follow),Xt(Ne.state.scope.follow?"内窥镜自动跟随已开启":"自动跟随已关闭，可手动控制镜头"),Jt()}function jl(){if(Ne.state.selected==="scope"){Xt("请选择左钳或右剪后操作");return}const s=!Ne.state.cutting;wt?.stop(""),s&&Ne.checkpoint("启用剪切",At.snapshot()),Ne.setCutting(s),Xt(s?"右剪已启用：接触表面并闭合切除；左钳可同时保持牵拉":"剪切已关闭"),At.lastCut=null,Jt()}function Ts(s){Ve.setMode(s||(Ve.mode==="endo"?"overview":"endo")),te("view-endo").classList.toggle("active",Ve.mode==="endo"),te("view-overview").classList.toggle("active",Ve.mode==="overview"),te("endo-overlay").hidden=Ve.mode!=="endo",te("mini-title").textContent=Ve.mode==="endo"?"系统总览":"内窥镜 LIVE",te("mini-caption").textContent=Ve.mode==="endo"?"UNITREE G1 + 胸部持镜概念集成":"同一三维场景 · 实时内窥镜",te("stage").focus({preventScroll:!0})}async function Ps(s=!1){if(!(Et||!ui)){if(Xe.busy){Xt("正在完成切面更新，请稍后撤销或重做");return}wt?.stop(""),Et=!0,hn();try{const e=At.snapshot(),t=s?Ne.redo(e):Ne.undo(e);if(!t){Xt(s?"没有可重做的操作":"没有可撤销的操作");return}Ve.releaseKinematicGuard(),t.hasExtraData&&await At.restore(t.extraData),Ne.setCutting(!1),Xt((s?"已重做：":"已撤销：")+t.label),Er(s?"redo":"undo")}catch(e){Ec(e)}finally{Et=!1,Jt()}}}async function Kl(){if(!(Et||!ui)){wt?.stop(""),Et=!0,hn();try{At.release(!0),await Xe.reset(),Ne.reset(),Ve.releaseKinematicGuard(),Ne.select("right"),Ve.home(),Er("reset"),Xt("完整器官、器械与内窥镜已恢复")}catch(s){Ec(s)}finally{Et=!1,Jt()}}}function Ec(s){ss.push(String(s.message||s)),console.error(s),te("system-status").textContent="需要检查",Xt("操作未完成："+(s.message||s))}function Jt(){if(!Ne)return;const s=Ne.state,e=s.tools[s.selected]||s.scope,t=e.position,n={left:"左手 · 持针钳 / 牵拉",right:"右手 · 精细分离剪",scope:"胸部 · 内窥镜"},i=[0,1.035,0];["x","y","z"].forEach((c,h)=>{te("pos-"+c).innerHTML=((t[h]-i[h])*1e3).toFixed(1)+"<small>mm</small>"}),te("active-tool").textContent={left:"LEFT / L",right:"RIGHT / R",scope:"SCOPE / C"}[s.selected],te("selected-badge").textContent=n[s.selected],document.querySelectorAll("[data-select]").forEach(c=>{const h=c.dataset.select===s.selected;c.classList.toggle("selected",h),c.setAttribute("aria-pressed",String(h))}),te("jaw-value").textContent=s.selected==="scope"?"—":Math.round(e.jaw*100)+"%",te("scope-depth").textContent=(s.scope.depth*1e3).toFixed(1)+" mm",te("follow").setAttribute("aria-checked",String(s.scope.follow)),te("follow").querySelector(".switch").classList.toggle("on",s.scope.follow),te("cut-mode").setAttribute("aria-checked",String(s.cutting)),te("cut-mode").querySelector(".switch").classList.toggle("on",s.cutting),te("cut-mode").classList.toggle("active-cut",s.cutting),te("scope-summary").textContent=s.scope.follow?"RCM 持镜 · "+{active:"尖端跟随",midpoint:"双器械居中",grasp:"协作区域跟随"}[s.scope.followMode]:"RCM 持镜 · 手动控制";for(const c of["left","right"])te(c+"-summary").textContent=(s.selected===c?"已选择 · ":"待命 · ")+(s.tools[c].jaw<.16?c==="left"&&At?.grasp?At.grasp.fragmentId?"已夹持 · 独立组织块":"已抓持 · 牵拉中":"钳口闭合":"钳口 "+Math.round(s.tools[c].jaw*100)+"%");te("view-status").textContent=Ve.mode==="endo"?"内窥镜 · "+(s.scope.follow?"器械自动跟随":"手动镜头"):"系统总览 · 鼠标拖动观察",te("removed").innerHTML=(Xe?.removedVolumeMm3||0).toFixed(1)+" <small>mm³</small>",te("removed-bar").style.width=Math.min(100,(Xe?.removedVolumeMm3||0)/(Xe?.totalVolumeMm3||1)*100)+"%",te("tissue-status").textContent=(Xe?.removedVolumeMm3||0)>0?"已切除组织":"完整",te("undo").disabled=!Ne.canUndo||Et||Xe?.busy,te("redo").disabled=!Ne.canRedo||Et||Xe?.busy,te("reset").disabled=Et,te("pause-overlay").hidden=!s.paused,te("pause").innerHTML=(s.paused?"▶ 继续仿真":"Ⅱ 暂停仿真")+" <kbd>P</kbd>",te("run-status").textContent=s.paused?"Ⅱ 已暂停":"● 运行中";const r=Math.floor(s.elapsed);te("session-time").textContent=String(Math.floor(r/60)).padStart(2,"0")+":"+String(r%60).padStart(2,"0"),te("clutch-indicator").classList.toggle("active",Ur.has("Space")||Fr.has("Space")),te("system-status").textContent=ss.length?"需要检查":Et?"恢复组织中":Xe?.busy?"更新组织":"系统就绪",document.querySelectorAll('[data-hold="KeyC"],[data-hold="KeyV"]').forEach(c=>c.disabled=s.selected==="scope");const o=At?.contact,a=Xe?.graspMetrics;te("left-contact").textContent=At?.grasp?At.grasp.fragmentId?"已夹持独立组织块 · 可抬起移开 / V 释放":"已抓持 · 牵拉 "+(a?.displacementMm||0).toFixed(1)+" mm":o?.leftFragmentId?"标本接触 · C 夹持":o?.left?"包膜接触 · C 抓持":"未接触 · 可表面就位",te("right-contact").textContent=o?.cutting?"切除中 · 三维缺损更新":o?.right?s.cutting?"组织接触 · 闭合剪切":"组织接触 · B 启用剪切":"未接触 · 可表面就位",te("roll-value").textContent=s.selected==="scope"?(s.scope.roll*180/Math.PI).toFixed(1)+"°":(e.wrist[2]*180/Math.PI).toFixed(1)+"°",te("follow-mode").value=s.scope.followMode,te("scope-content").value=s.scope.viewMode,te("demo").textContent=wt?.active?"■ 停止自动操作":"▶ 切离与移开示范",te("demo").disabled=Et||!wt?.active&&Xe?.busy,te("approach").disabled=Et||Xe?.busy||s.selected==="scope"||s.paused,te("collision-status").textContent=s.collision?.active?"双器械接近 · 已阻止互穿":"双器械防碰撞",te("connection-status").textContent=Ve.conceptDecoupled?"概念主从联接":"双臂器械联接";const l=Xe?.fragmentMetrics;if(te("specimen-count").textContent=(l?.count||0)+" 块",te("specimen-volume").textContent=((l?.volumeMm3||0)/1e3).toFixed(2)+" cm³",te("specimen-state").textContent=l?.pieces.some(c=>c.held)?"左钳夹持 · 独立搬运":l?.count?"已切离 · C 可再次夹持":"组织桥完全切断后才会分离",l?.count&&(te("tissue-status").textContent="已分离 "+l.count+" 块"),te("approach-specimen").disabled=Et||Xe?.busy||!l?.count||l.pieces.some(c=>c.held)||s.paused,te("stage").dataset.telemetry=JSON.stringify({state:Ne.snapshot().state,fps:Ho,errors:ss,removedVolumeMm3:Xe?.removedVolumeMm3,fragments:Xe?.fragmentMetrics,armErrors:Ve.armErrors,scopeArmError:Ve.assemblies?.scopeArmError,toolRCMErrors:Ve.assemblies?.toolRCMErrors,interaction:At?.metrics,demo:wt?.active,demoPhase:wt?.phase,tissueBusy:Xe?.busy,cutCount:Xe?._cuts.length,viewMode:Ve.mode,precision:br,scopeFeed:Ve.scopeFeed.resolution,scopeViewAspect:Ne.viewAspect,drawCalls:Ve.renderer.info.render.calls,triangles:Ve.renderer.info.render.triangles,connectionModes:Ve.assemblies?.connectionModes,timings:As}),Ve.mode==="endo"){const c=new E(...s.tools[s.activeTool].position).applyMatrix4(Ve.endoCamera.matrixWorldInverse),h=.01*te("stage").clientHeight/(2*Math.tan(Hn.degToRad(Ve.endoCamera.fov*.5))*Math.max(.01,-c.z));te("lens-scale").style.width=h+"px"}}function eM(){document.querySelectorAll("[data-select]").forEach(s=>s.onclick=()=>ur(s.dataset.select)),document.querySelectorAll("[data-speed]").forEach(s=>s.onclick=()=>{br=s.dataset.speed,document.querySelectorAll("[data-speed]").forEach(e=>e.classList.toggle("active",e===s)),Xt(br==="fine"?"精细模式：降低位移与旋转速度":"标准速度模式")});for(const s of document.querySelectorAll("[data-hold]")){let e=0,t=!1;const n=()=>!ui||Et||t?!1:(wt?.stop(""),e=ql,t=!0,Fr.add(s.dataset.hold),s.classList.add("held"),!0),i=r=>{const o=t&&e===ql&&["pointerup","keyup"].includes(r.type);if(t=!1,Fr.delete(s.dataset.hold),s.classList.remove("held"),o&&!Et&&!Ne.state.paused){const a=new Set([s.dataset.hold]);br==="fine"&&a.add("ShiftLeft"),Ne.update(.05,a),Ne.update(1e-9,new Set),Jt()}};s.addEventListener("pointerdown",r=>{r.preventDefault(),n()&&s.setPointerCapture(r.pointerId)}),s.addEventListener("pointerup",i),s.addEventListener("pointercancel",i),s.addEventListener("lostpointercapture",i),s.addEventListener("keydown",r=>{r.code==="Enter"&&(r.preventDefault(),n())}),s.addEventListener("keyup",r=>{r.code==="Enter"&&i(r)}),s.addEventListener("blur",i)}te("pause").onclick=()=>dr(!Ne.state.paused),te("resume").onclick=()=>dr(!1),te("undo").onclick=()=>Ps(),te("redo").onclick=()=>Ps(!0),te("reset").onclick=Kl,te("follow").onclick=wu,te("cut-mode").onclick=jl,te("follow-mode").onchange=s=>{Ne.setScopeFollow(!0,s.target.value),Jt()},te("scope-content").onchange=s=>{Ne.setScopeViewMode(s.target.value),Ne.setScopeFollow(!0),Xt(s.target.value==="specimen"?"镜头观察独立标本；无标本时保持肝脏术野":"镜头保持肝脏局部术野"),Jt()},te("demo").onclick=()=>{hn(),wt.startExample(),Ts("endo"),Jt()},te("approach").onclick=()=>{hn(),wt.stop(""),wt.approach(),Jt()},te("approach-specimen").onclick=()=>{hn(),wt.stop(""),wt.approachSpecimen(),Ts("endo"),Jt()},te("view-endo").onclick=()=>Ts("endo"),te("view-overview").onclick=()=>Ts("overview"),te("swap-view").onclick=()=>Ts(),te("view-home").onclick=()=>{Ve.home(),Xt("观察视角已复位")},te("fullscreen").onclick=async()=>{try{document.fullscreenElement?await document.exitFullscreen():await te("stage").requestFullscreen()}catch{Xt("当前浏览器不支持全屏，请使用浏览器全屏模式")}},te("help").onclick=()=>{wt?.stop(""),hn(),te("help-dialog").showModal()},te("about").onclick=()=>{wt?.stop(""),hn(),te("about-dialog").showModal()},document.querySelectorAll("dialog [data-close]").forEach(s=>s.onclick=()=>s.closest("dialog").close()),document.querySelectorAll("dialog").forEach(s=>s.addEventListener("click",e=>{e.target===s&&s.close()})),te("export").onclick=()=>{const s={app:"MIRA surgical teleoperation demo",version:3,exportedAt:new Date().toISOString(),units:"metres/radians/seconds",tissueVoxelMm:Xe.voxelMm,removedVolumeMm3:Xe.removedVolumeMm3,state:Ne.snapshot(),interaction:At.snapshot(),events:Do},e=document.createElement("a");e.href=URL.createObjectURL(new Blob([JSON.stringify(s,null,2)],{type:"application/json"})),e.download="mira-session-"+new Date().toISOString().replace(/[:.]/g,"-")+".json",e.click(),setTimeout(()=>URL.revokeObjectURL(e.href),1e3),Xt("操作记录已导出")},window.addEventListener("keydown",s=>{if(!ui||s.target.closest("input,textarea,select,[contenteditable=true]")||document.querySelector("dialog[open]"))return;if(s.ctrlKey||s.metaKey){if(s.code==="KeyZ"){s.preventDefault(),s.repeat||Ps(s.shiftKey);return}if(s.code==="KeyY"){s.preventDefault(),s.repeat||Ps(!0);return}return}if(Jy.has(s.code)){s.preventDefault(),s.code!=="Space"&&!s.code.startsWith("Shift")&&wt?.stop(""),Et||Ur.add(s.code);return}const e={Digit1:()=>ur("left"),Digit2:()=>ur("right"),Digit3:()=>ur("scope"),KeyP:()=>dr(!Ne.state.paused),KeyF:wu,KeyB:jl,KeyR:Kl,Tab:()=>Ts(),Slash:()=>{wt?.stop(""),te("help-dialog").showModal(),hn()}};e[s.code]&&(s.preventDefault(),s.repeat||e[s.code]())}),window.addEventListener("keyup",s=>{Ur.delete(s.code)}),window.addEventListener("blur",hn),document.addEventListener("visibilitychange",()=>{hn(),document.hidden&&ui&&dr(!0)}),te("scene").addEventListener("webglcontextlost",s=>{s.preventDefault(),hn(),Ne.setPaused(!0),te("loading").hidden=!1,te("loading-detail").textContent="显卡上下文已中断，请刷新页面重新加载。"})}function tM(s,e){!ui||Et||At.update(e,{clutched:s.has("Space")}).catch(Ec)}function nM(){const s=Ne.state.scope,e=new E(...s.port),t=new E(...s.position).sub(e).normalize();let n=.018;for(let i=0;i<=8;i++){const r=.018+(s.depth-.018)*i/8,o=Xe.group.worldToLocal(e.clone().addScaledVector(t,r));if(Xe.sampleDistance(o)<.005){let a=n,l=r;for(let c=0;c<8;c++){const h=(a+l)*.5,u=Xe.group.worldToLocal(e.clone().addScaledVector(t,h));Xe.sampleDistance(u)<.005?l=h:a=h}s.depth=a,s.position=e.addScaledVector(t,a).toArray();return}n=r}}function Rd(s){Ad=requestAnimationFrame(Rd);const e=Math.max(0,Math.min(.05,(s-Xl)/1e3));if(Xl=s,!ui)return;const t=performance.now(),n=new Set([...Ur,...Fr]);br==="fine"&&n.add("ShiftLeft"),Et&&n.clear(),Et||Ne.setScopeContext({...$y(Ne,Xe,At,s),viewAspect:Ve.scopeAspect}),!Et&&!n.has("Space")&&wt.update(e);const i=Et?{limited:!1}:Ne.update(e,n);ql++;const r=performance.now();if(As.control=r-t,!Ne.state.paused&&!Et&&nM(),As.clearance=performance.now()-r,i.limited&&s-Eu>2500&&(Eu=s,Xt("两器械接近接触，已阻止互相穿透；反向移动即可离开")),s>=Ga){const o=Math.min(.05,Wa?(s-Wa)/1e3:e),a=performance.now();Ve.update(Ne.state,o),Wa=s;const l=performance.now();tM(n,o);const c=performance.now();Ve.render(s),As.scene=l-a,As.interaction=c-l,As.render=performance.now()-c,Xa++,Ga=Math.max(Ga+1e3/60,s-1e3/60)}Po.push(performance.now()-t),Po.length>600&&Po.shift(),s-Co>1e3&&(Ho=Xa*1e3/(s-Co),te("fps").textContent=Ho.toFixed(0)+" FPS",Xa=0,Co=s),s-bu>100&&(bu=s,Jt())}async function iM(){try{Ve=new My(te("scene"),te("stage"),te("mini-view")),Xe=new Hy,Ne=new lx({getExtraData:()=>At?.snapshot()??Xe.snapshot(),onEvent:s=>{s.type!=="history"&&Er(s.type)}}),Ne.select("right"),At=new Gy(Ne,Xe,{onMessage:Xt,onEvent:Er,toolDirection:s=>Ve.assemblies?.toolDirections?.[s],toolQuaternion:s=>Ve.assemblies?.tools[s]?.tipQuaternion}),wt=new qy(Ne,Xe,At,{onMessage:Xt,onChange:()=>{ui&&Jt()}}),te("loading-detail").textContent="加载 G1 官方模型与真实解剖体积…",await Promise.all([Ve.loadRobot(),Xe.load(Zy+"assets/liver-volume")]),Ve.addTissue(Xe),Xe.group.rotation.x=-Math.PI/2,Xe.group.updateMatrixWorld(!0),await Ve.loadAnatomy?.(),te("model-details").innerHTML="<p><strong>宇树 G1：</strong>官方 29 自由度 CAD，保留原始尺寸与关节层级，双臂由逆运动学驱动。原始固定手型通过掌托、绑带和球接轴夹固定器械；夹具为概念设计。器械自由移动不受机械臂可达范围阻挡；超出真实手臂可达范围时显示概念主从联接。</p><p><strong>肝胆解剖：</strong>BodyParts3D 公开成人肝脏、胆囊与肝总动脉，同源坐标注册。体积间距 "+Xe.voxelMm+" mm；包膜与细小纹理由程序材质表现，并非患者 CT 或组织学数据。</p><p><strong>牵拉与切除：</strong>抓持实际表面，三维顶点、法线和阴影随动。剪切贯通并切断全部组织桥后，按体积连通性提取独立三维组织块，可夹持、旋转、移开、释放和再次夹取；切面及两侧封闭表面均保留。撤销同时恢复切口、组织块和夹持。牵拉为几何近似，松手组织块采用简化重力与表面接触。</p><p><strong>器械与持镜：</strong>真实 dVRK 持针钳、弯剪和内窥镜 CAD。G1 胸部 Z1 与快换耦合器为概念集成，非官方医疗配置。旋转连续多圈、无工作空间围栏，仅双器械防碰撞；这也意味着并未模拟真机电缆/关节行程。</p><p><strong>镜头：</strong>可选当前尖端、双器械中心或牵拉协作区，平滑转向与画面上方向连续，自动进退维持约 65 mm 观察距离，默认显示肝脏局部术野；可切换独立标本观察。手动进退保留距离偏置，肝表面提供防穿透。术野与室内实体屏共用同一帧实时图像。</p>";for(let s=0;s<20;s++)Ve.update(Ne.state,.05);eM(),ui=!0,document.querySelectorAll("button").forEach(s=>s.disabled=!1),Co=performance.now(),te("loading").hidden=!0,Jt(),Ve.update(Ne.state,0),Ve.render(),Er("ready"),window.__mira={get state(){return Ne.snapshot()},get metrics(){return{fps:Ho,frameMs:Po.slice(),errors:[...ss],removedVolumeMm3:Xe.removedVolumeMm3,totalVolumeMm3:Xe.totalVolumeMm3,voxelMm:Xe.voxelMm,drawCalls:Ve.renderer.info.render.calls,triangles:Ve.renderer.info.render.triangles,armErrors:{...Ve.armErrors},interaction:At.metrics}},select:ur,reset:Kl,undo:Ps,redo:()=>Ps(!0),setPaused:dr,toggleCut:jl,sim:Ne,tissue:Xe,view:Ve,interactionController:At,demo:wt,ready:!0}}catch(s){console.error(s),ss.push(String(s)),te("loading-detail").textContent="加载未完成："+s.message;const e=document.createElement("div");e.className="error-actions";const t=document.createElement("button");t.textContent="重新加载",t.onclick=()=>location.reload(),e.append(t),te("loading").append(e)}}window.addEventListener("error",s=>ss.push(s.message));window.addEventListener("unhandledrejection",s=>ss.push(String(s.reason)));window.addEventListener("beforeunload",()=>{cancelAnimationFrame(Ad),Ve?.dispose(),Xe?.dispose?.()});document.querySelectorAll("button").forEach(s=>s.disabled=!0);requestAnimationFrame(Rd);iM();
