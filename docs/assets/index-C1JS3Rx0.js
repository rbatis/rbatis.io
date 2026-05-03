var ua=Object.defineProperty;var pa=(e,t,n)=>t in e?ua(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var ee=(e,t,n)=>pa(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();/**
* @vue/shared v3.5.33
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Kr(e){const t=Object.create(null);for(const n of e.split(","))t[n]=1;return n=>n in t}const se={},Zt=[],st=()=>{},Ai=()=>!1,sr=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),ir=e=>e.startsWith("onUpdate:"),me=Object.assign,Zr=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},fa=Object.prototype.hasOwnProperty,Z=(e,t)=>fa.call(e,t),V=Array.isArray,Xt=e=>Dn(e)==="[object Map]",Di=e=>Dn(e)==="[object Set]",As=e=>Dn(e)==="[object Date]",H=e=>typeof e=="function",ce=e=>typeof e=="string",at=e=>typeof e=="symbol",J=e=>e!==null&&typeof e=="object",Ti=e=>(J(e)||H(e))&&H(e.then)&&H(e.catch),Bi=Object.prototype.toString,Dn=e=>Bi.call(e),da=e=>Dn(e).slice(8,-1),Pi=e=>Dn(e)==="[object Object]",Xr=e=>ce(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,gn=Kr(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),lr=e=>{const t=Object.create(null);return(n=>t[n]||(t[n]=e(n)))},ha=/-\w/g,Re=lr(e=>e.replace(ha,t=>t.slice(1).toUpperCase())),ma=/\B([A-Z])/g,Vt=lr(e=>e.replace(ma,"-$1").toLowerCase()),ar=lr(e=>e.charAt(0).toUpperCase()+e.slice(1)),_r=lr(e=>e?`on${ar(e)}`:""),rt=(e,t)=>!Object.is(e,t),yr=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},Mi=(e,t,n,r=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:r,value:n})},ga=e=>{const t=parseFloat(e);return isNaN(t)?e:t};let Ds;const or=()=>Ds||(Ds=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Jr(e){if(V(e)){const t={};for(let n=0;n<e.length;n++){const r=e[n],s=ce(r)?va(r):Jr(r);if(s)for(const i in s)t[i]=s[i]}return t}else if(ce(e)||J(e))return e}const ba=/;(?![^(]*\))/g,_a=/:([^]+)/,ya=/\/\*[^]*?\*\//g;function va(e){const t={};return e.replace(ya,"").split(ba).forEach(n=>{if(n){const r=n.split(_a);r.length>1&&(t[r[0].trim()]=r[1].trim())}}),t}function it(e){let t="";if(ce(e))t=e;else if(V(e))for(let n=0;n<e.length;n++){const r=it(e[n]);r&&(t+=r+" ")}else if(J(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}const wa="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",ka=Kr(wa);function zi(e){return!!e||e===""}function xa(e,t){if(e.length!==t.length)return!1;let n=!0;for(let r=0;n&&r<e.length;r++)n=Yr(e[r],t[r]);return n}function Yr(e,t){if(e===t)return!0;let n=As(e),r=As(t);if(n||r)return n&&r?e.getTime()===t.getTime():!1;if(n=at(e),r=at(t),n||r)return e===t;if(n=V(e),r=V(t),n||r)return n&&r?xa(e,t):!1;if(n=J(e),r=J(t),n||r){if(!n||!r)return!1;const s=Object.keys(e).length,i=Object.keys(t).length;if(s!==i)return!1;for(const a in e){const o=e.hasOwnProperty(a),l=t.hasOwnProperty(a);if(o&&!l||!o&&l||!Yr(e[a],t[a]))return!1}}return String(e)===String(t)}const Ii=e=>!!(e&&e.__v_isRef===!0),L=e=>ce(e)?e:e==null?"":V(e)||J(e)&&(e.toString===Bi||!H(e.toString))?Ii(e)?L(e.value):JSON.stringify(e,$i,2):String(e),$i=(e,t)=>Ii(t)?$i(e,t.value):Xt(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((n,[r,s],i)=>(n[vr(r,i)+" =>"]=s,n),{})}:Di(t)?{[`Set(${t.size})`]:[...t.values()].map(n=>vr(n))}:at(t)?vr(t):J(t)&&!V(t)&&!Pi(t)?String(t):t,vr=(e,t="")=>{var n;return at(e)?`Symbol(${(n=e.description)!=null?n:t})`:e};/**
* @vue/reactivity v3.5.33
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let ge;class Sa{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.__v_skip=!0,this.parent=ge,!t&&ge&&(this.index=(ge.scopes||(ge.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,n;if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].pause();for(t=0,n=this.effects.length;t<n;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,n;if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].resume();for(t=0,n=this.effects.length;t<n;t++)this.effects[t].resume()}}run(t){if(this._active){const n=ge;try{return ge=this,t()}finally{ge=n}}}on(){++this._on===1&&(this.prevScope=ge,ge=this)}off(){if(this._on>0&&--this._on===0){if(ge===this)ge=this.prevScope;else{let t=ge;for(;t;){if(t.prevScope===this){t.prevScope=this.prevScope;break}t=t.prevScope}}this.prevScope=void 0}}stop(t){if(this._active){this._active=!1;let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(this.effects.length=0,n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function Ra(){return ge}let re;const wr=new WeakSet;class Li{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,ge&&ge.active&&ge.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,wr.has(this)&&(wr.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Vi(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Ts(this),Hi(this);const t=re,n=Ve;re=this,Ve=!0;try{return this.fn()}finally{ji(this),re=t,Ve=n,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)ns(t);this.deps=this.depsTail=void 0,Ts(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?wr.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Tr(this)&&this.run()}get dirty(){return Tr(this)}}let Ni=0,bn,_n;function Vi(e,t=!1){if(e.flags|=8,t){e.next=_n,_n=e;return}e.next=bn,bn=e}function es(){Ni++}function ts(){if(--Ni>0)return;if(_n){let t=_n;for(_n=void 0;t;){const n=t.next;t.next=void 0,t.flags&=-9,t=n}}let e;for(;bn;){let t=bn;for(bn=void 0;t;){const n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(r){e||(e=r)}t=n}}if(e)throw e}function Hi(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function ji(e){let t,n=e.depsTail,r=n;for(;r;){const s=r.prevDep;r.version===-1?(r===n&&(n=s),ns(r),qa(r)):t=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=s}e.deps=t,e.depsTail=n}function Tr(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(Ui(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function Ui(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===Rn)||(e.globalVersion=Rn,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!Tr(e))))return;e.flags|=2;const t=e.dep,n=re,r=Ve;re=e,Ve=!0;try{Hi(e);const s=e.fn(e._value);(t.version===0||rt(s,e._value))&&(e.flags|=128,e._value=s,t.version++)}catch(s){throw t.version++,s}finally{re=n,Ve=r,ji(e),e.flags&=-3}}function ns(e,t=!1){const{dep:n,prevSub:r,nextSub:s}=e;if(r&&(r.nextSub=s,e.prevSub=void 0),s&&(s.prevSub=r,e.nextSub=void 0),n.subs===e&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let i=n.computed.deps;i;i=i.nextDep)ns(i,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function qa(e){const{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}let Ve=!0;const Fi=[];function mt(){Fi.push(Ve),Ve=!1}function gt(){const e=Fi.pop();Ve=e===void 0?!0:e}function Ts(e){const{cleanup:t}=e;if(e.cleanup=void 0,t){const n=re;re=void 0;try{t()}finally{re=n}}}let Rn=0;class Oa{constructor(t,n){this.sub=t,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class rs{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!re||!Ve||re===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==re)n=this.activeLink=new Oa(re,this),re.deps?(n.prevDep=re.depsTail,re.depsTail.nextDep=n,re.depsTail=n):re.deps=re.depsTail=n,Gi(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const r=n.nextDep;r.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=r),n.prevDep=re.depsTail,n.nextDep=void 0,re.depsTail.nextDep=n,re.depsTail=n,re.deps===n&&(re.deps=r)}return n}trigger(t){this.version++,Rn++,this.notify(t)}notify(t){es();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{ts()}}}function Gi(e){if(e.dep.sc++,e.sub.flags&4){const t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let r=t.deps;r;r=r.nextDep)Gi(r)}const n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}const Br=new WeakMap,It=Symbol(""),Pr=Symbol(""),qn=Symbol("");function be(e,t,n){if(Ve&&re){let r=Br.get(e);r||Br.set(e,r=new Map);let s=r.get(n);s||(r.set(n,s=new rs),s.map=r,s.key=n),s.track()}}function ht(e,t,n,r,s,i){const a=Br.get(e);if(!a){Rn++;return}const o=l=>{l&&l.trigger()};if(es(),t==="clear")a.forEach(o);else{const l=V(e),c=l&&Xr(n);if(l&&n==="length"){const u=Number(r);a.forEach((p,h)=>{(h==="length"||h===qn||!at(h)&&h>=u)&&o(p)})}else switch((n!==void 0||a.has(void 0))&&o(a.get(n)),c&&o(a.get(qn)),t){case"add":l?c&&o(a.get("length")):(o(a.get(It)),Xt(e)&&o(a.get(Pr)));break;case"delete":l||(o(a.get(It)),Xt(e)&&o(a.get(Pr)));break;case"set":Xt(e)&&o(a.get(It));break}}ts()}function Gt(e){const t=K(e);return t===e?t:(be(t,"iterate",qn),ze(e)?t:t.map(je))}function cr(e){return be(e=K(e),"iterate",qn),e}function tt(e,t){return bt(e)?en($t(e)?je(t):t):je(t)}const Ca={__proto__:null,[Symbol.iterator](){return kr(this,Symbol.iterator,e=>tt(this,e))},concat(...e){return Gt(this).concat(...e.map(t=>V(t)?Gt(t):t))},entries(){return kr(this,"entries",e=>(e[1]=tt(this,e[1]),e))},every(e,t){return ut(this,"every",e,t,void 0,arguments)},filter(e,t){return ut(this,"filter",e,t,n=>n.map(r=>tt(this,r)),arguments)},find(e,t){return ut(this,"find",e,t,n=>tt(this,n),arguments)},findIndex(e,t){return ut(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return ut(this,"findLast",e,t,n=>tt(this,n),arguments)},findLastIndex(e,t){return ut(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return ut(this,"forEach",e,t,void 0,arguments)},includes(...e){return xr(this,"includes",e)},indexOf(...e){return xr(this,"indexOf",e)},join(e){return Gt(this).join(e)},lastIndexOf(...e){return xr(this,"lastIndexOf",e)},map(e,t){return ut(this,"map",e,t,void 0,arguments)},pop(){return cn(this,"pop")},push(...e){return cn(this,"push",e)},reduce(e,...t){return Bs(this,"reduce",e,t)},reduceRight(e,...t){return Bs(this,"reduceRight",e,t)},shift(){return cn(this,"shift")},some(e,t){return ut(this,"some",e,t,void 0,arguments)},splice(...e){return cn(this,"splice",e)},toReversed(){return Gt(this).toReversed()},toSorted(e){return Gt(this).toSorted(e)},toSpliced(...e){return Gt(this).toSpliced(...e)},unshift(...e){return cn(this,"unshift",e)},values(){return kr(this,"values",e=>tt(this,e))}};function kr(e,t,n){const r=cr(e),s=r[t]();return r!==e&&!ze(e)&&(s._next=s.next,s.next=()=>{const i=s._next();return i.done||(i.value=n(i.value)),i}),s}const Ea=Array.prototype;function ut(e,t,n,r,s,i){const a=cr(e),o=a!==e&&!ze(e),l=a[t];if(l!==Ea[t]){const p=l.apply(e,i);return o?je(p):p}let c=n;a!==e&&(o?c=function(p,h){return n.call(this,tt(e,p),h,e)}:n.length>2&&(c=function(p,h){return n.call(this,p,h,e)}));const u=l.call(a,c,r);return o&&s?s(u):u}function Bs(e,t,n,r){const s=cr(e),i=s!==e&&!ze(e);let a=n,o=!1;s!==e&&(i?(o=r.length===0,a=function(c,u,p){return o&&(o=!1,c=tt(e,c)),n.call(this,c,tt(e,u),p,e)}):n.length>3&&(a=function(c,u,p){return n.call(this,c,u,p,e)}));const l=s[t](a,...r);return o?tt(e,l):l}function xr(e,t,n){const r=K(e);be(r,"iterate",qn);const s=r[t](...n);return(s===-1||s===!1)&&ls(n[0])?(n[0]=K(n[0]),r[t](...n)):s}function cn(e,t,n=[]){mt(),es();const r=K(e)[t].apply(e,n);return ts(),gt(),r}const Aa=Kr("__proto__,__v_isRef,__isVue"),Wi=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(at));function Da(e){at(e)||(e=String(e));const t=K(this);return be(t,"has",e),t.hasOwnProperty(e)}class Qi{constructor(t=!1,n=!1){this._isReadonly=t,this._isShallow=n}get(t,n,r){if(n==="__v_skip")return t.__v_skip;const s=this._isReadonly,i=this._isShallow;if(n==="__v_isReactive")return!s;if(n==="__v_isReadonly")return s;if(n==="__v_isShallow")return i;if(n==="__v_raw")return r===(s?i?Va:Ji:i?Xi:Zi).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(r)?t:void 0;const a=V(t);if(!s){let l;if(a&&(l=Ca[n]))return l;if(n==="hasOwnProperty")return Da}const o=Reflect.get(t,n,ve(t)?t:r);if((at(n)?Wi.has(n):Aa(n))||(s||be(t,"get",n),i))return o;if(ve(o)){const l=a&&Xr(n)?o:o.value;return s&&J(l)?Gn(l):l}return J(o)?s?Gn(o):ur(o):o}}class Ki extends Qi{constructor(t=!1){super(!1,t)}set(t,n,r,s){let i=t[n];const a=V(t)&&Xr(n);if(!this._isShallow){const c=bt(i);if(!ze(r)&&!bt(r)&&(i=K(i),r=K(r)),!a&&ve(i)&&!ve(r))return c||(i.value=r),!0}const o=a?Number(n)<t.length:Z(t,n),l=Reflect.set(t,n,r,ve(t)?t:s);return t===K(s)&&(o?rt(r,i)&&ht(t,"set",n,r):ht(t,"add",n,r)),l}deleteProperty(t,n){const r=Z(t,n);t[n];const s=Reflect.deleteProperty(t,n);return s&&r&&ht(t,"delete",n,void 0),s}has(t,n){const r=Reflect.has(t,n);return(!at(n)||!Wi.has(n))&&be(t,"has",n),r}ownKeys(t){return be(t,"iterate",V(t)?"length":It),Reflect.ownKeys(t)}}class Ta extends Qi{constructor(t=!1){super(!0,t)}set(t,n){return!0}deleteProperty(t,n){return!0}}const Ba=new Ki,Pa=new Ta,Ma=new Ki(!0);const Mr=e=>e,zn=e=>Reflect.getPrototypeOf(e);function za(e,t,n){return function(...r){const s=this.__v_raw,i=K(s),a=Xt(i),o=e==="entries"||e===Symbol.iterator&&a,l=e==="keys"&&a,c=s[e](...r),u=n?Mr:t?en:je;return!t&&be(i,"iterate",l?Pr:It),me(Object.create(c),{next(){const{value:p,done:h}=c.next();return h?{value:p,done:h}:{value:o?[u(p[0]),u(p[1])]:u(p),done:h}}})}}function In(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function Ia(e,t){const n={get(s){const i=this.__v_raw,a=K(i),o=K(s);e||(rt(s,o)&&be(a,"get",s),be(a,"get",o));const{has:l}=zn(a),c=t?Mr:e?en:je;if(l.call(a,s))return c(i.get(s));if(l.call(a,o))return c(i.get(o));i!==a&&i.get(s)},get size(){const s=this.__v_raw;return!e&&be(K(s),"iterate",It),s.size},has(s){const i=this.__v_raw,a=K(i),o=K(s);return e||(rt(s,o)&&be(a,"has",s),be(a,"has",o)),s===o?i.has(s):i.has(s)||i.has(o)},forEach(s,i){const a=this,o=a.__v_raw,l=K(o),c=t?Mr:e?en:je;return!e&&be(l,"iterate",It),o.forEach((u,p)=>s.call(i,c(u),c(p),a))}};return me(n,e?{add:In("add"),set:In("set"),delete:In("delete"),clear:In("clear")}:{add(s){const i=K(this),a=zn(i),o=K(s),l=!t&&!ze(s)&&!bt(s)?o:s;return a.has.call(i,l)||rt(s,l)&&a.has.call(i,s)||rt(o,l)&&a.has.call(i,o)||(i.add(l),ht(i,"add",l,l)),this},set(s,i){!t&&!ze(i)&&!bt(i)&&(i=K(i));const a=K(this),{has:o,get:l}=zn(a);let c=o.call(a,s);c||(s=K(s),c=o.call(a,s));const u=l.call(a,s);return a.set(s,i),c?rt(i,u)&&ht(a,"set",s,i):ht(a,"add",s,i),this},delete(s){const i=K(this),{has:a,get:o}=zn(i);let l=a.call(i,s);l||(s=K(s),l=a.call(i,s)),o&&o.call(i,s);const c=i.delete(s);return l&&ht(i,"delete",s,void 0),c},clear(){const s=K(this),i=s.size!==0,a=s.clear();return i&&ht(s,"clear",void 0,void 0),a}}),["keys","values","entries",Symbol.iterator].forEach(s=>{n[s]=za(s,e,t)}),n}function ss(e,t){const n=Ia(e,t);return(r,s,i)=>s==="__v_isReactive"?!e:s==="__v_isReadonly"?e:s==="__v_raw"?r:Reflect.get(Z(n,s)&&s in r?n:r,s,i)}const $a={get:ss(!1,!1)},La={get:ss(!1,!0)},Na={get:ss(!0,!1)};const Zi=new WeakMap,Xi=new WeakMap,Ji=new WeakMap,Va=new WeakMap;function Ha(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function ja(e){return e.__v_skip||!Object.isExtensible(e)?0:Ha(da(e))}function ur(e){return bt(e)?e:is(e,!1,Ba,$a,Zi)}function Yi(e){return is(e,!1,Ma,La,Xi)}function Gn(e){return is(e,!0,Pa,Na,Ji)}function is(e,t,n,r,s){if(!J(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const i=ja(e);if(i===0)return e;const a=s.get(e);if(a)return a;const o=new Proxy(e,i===2?r:n);return s.set(e,o),o}function $t(e){return bt(e)?$t(e.__v_raw):!!(e&&e.__v_isReactive)}function bt(e){return!!(e&&e.__v_isReadonly)}function ze(e){return!!(e&&e.__v_isShallow)}function ls(e){return e?!!e.__v_raw:!1}function K(e){const t=e&&e.__v_raw;return t?K(t):e}function Ua(e){return!Z(e,"__v_skip")&&Object.isExtensible(e)&&Mi(e,"__v_skip",!0),e}const je=e=>J(e)?ur(e):e,en=e=>J(e)?Gn(e):e;function ve(e){return e?e.__v_isRef===!0:!1}function Ot(e){return el(e,!1)}function Fa(e){return el(e,!0)}function el(e,t){return ve(e)?e:new Ga(e,t)}class Ga{constructor(t,n){this.dep=new rs,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?t:K(t),this._value=n?t:je(t),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(t){const n=this._rawValue,r=this.__v_isShallow||ze(t)||bt(t);t=r?t:K(t),rt(t,n)&&(this._rawValue=t,this._value=r?t:je(t),this.dep.trigger())}}function Pe(e){return ve(e)?e.value:e}const Wa={get:(e,t,n)=>t==="__v_raw"?e:Pe(Reflect.get(e,t,n)),set:(e,t,n,r)=>{const s=e[t];return ve(s)&&!ve(n)?(s.value=n,!0):Reflect.set(e,t,n,r)}};function tl(e){return $t(e)?e:new Proxy(e,Wa)}class Qa{constructor(t,n,r){this.fn=t,this.setter=n,this._value=void 0,this.dep=new rs(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Rn-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=r}notify(){if(this.flags|=16,!(this.flags&8)&&re!==this)return Vi(this,!0),!0}get value(){const t=this.dep.track();return Ui(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function Ka(e,t,n=!1){let r,s;return H(e)?r=e:(r=e.get,s=e.set),new Qa(r,s,n)}const $n={},Wn=new WeakMap;let Bt;function Za(e,t=!1,n=Bt){if(n){let r=Wn.get(n);r||Wn.set(n,r=[]),r.push(e)}}function Xa(e,t,n=se){const{immediate:r,deep:s,once:i,scheduler:a,augmentJob:o,call:l}=n,c=B=>s?B:ze(B)||s===!1||s===0?qt(B,1):qt(B);let u,p,h,g,_=!1,S=!1;if(ve(e)?(p=()=>e.value,_=ze(e)):$t(e)?(p=()=>c(e),_=!0):V(e)?(S=!0,_=e.some(B=>$t(B)||ze(B)),p=()=>e.map(B=>{if(ve(B))return B.value;if($t(B))return c(B);if(H(B))return l?l(B,2):B()})):H(e)?t?p=l?()=>l(e,2):e:p=()=>{if(h){mt();try{h()}finally{gt()}}const B=Bt;Bt=u;try{return l?l(e,3,[g]):e(g)}finally{Bt=B}}:p=st,t&&s){const B=p,G=s===!0?1/0:s;p=()=>qt(B(),G)}const E=Ra(),I=()=>{u.stop(),E&&E.active&&Zr(E.effects,u)};if(i&&t){const B=t;t=(...G)=>{B(...G),I()}}let O=S?new Array(e.length).fill($n):$n;const P=B=>{if(!(!(u.flags&1)||!u.dirty&&!B))if(t){const G=u.run();if(s||_||(S?G.some((le,ae)=>rt(le,O[ae])):rt(G,O))){h&&h();const le=Bt;Bt=u;try{const ae=[G,O===$n?void 0:S&&O[0]===$n?[]:O,g];O=G,l?l(t,3,ae):t(...ae)}finally{Bt=le}}}else u.run()};return o&&o(P),u=new Li(p),u.scheduler=a?()=>a(P,!1):P,g=B=>Za(B,!1,u),h=u.onStop=()=>{const B=Wn.get(u);if(B){if(l)l(B,4);else for(const G of B)G();Wn.delete(u)}},t?r?P(!0):O=u.run():a?a(P.bind(null,!0),!0):u.run(),I.pause=u.pause.bind(u),I.resume=u.resume.bind(u),I.stop=I,I}function qt(e,t=1/0,n){if(t<=0||!J(e)||e.__v_skip||(n=n||new Map,(n.get(e)||0)>=t))return e;if(n.set(e,t),t--,ve(e))qt(e.value,t,n);else if(V(e))for(let r=0;r<e.length;r++)qt(e[r],t,n);else if(Di(e)||Xt(e))e.forEach(r=>{qt(r,t,n)});else if(Pi(e)){for(const r in e)qt(e[r],t,n);for(const r of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,r)&&qt(e[r],t,n)}return e}/**
* @vue/runtime-core v3.5.33
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Tn(e,t,n,r){try{return r?e(...r):e()}catch(s){pr(s,t,n)}}function ot(e,t,n,r){if(H(e)){const s=Tn(e,t,n,r);return s&&Ti(s)&&s.catch(i=>{pr(i,t,n)}),s}if(V(e)){const s=[];for(let i=0;i<e.length;i++)s.push(ot(e[i],t,n,r));return s}}function pr(e,t,n,r=!0){const s=t?t.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:a}=t&&t.appContext.config||se;if(t){let o=t.parent;const l=t.proxy,c=`https://vuejs.org/error-reference/#runtime-${n}`;for(;o;){const u=o.ec;if(u){for(let p=0;p<u.length;p++)if(u[p](e,l,c)===!1)return}o=o.parent}if(i){mt(),Tn(i,null,10,[e,l,c]),gt();return}}Ja(e,n,s,r,a)}function Ja(e,t,n,r=!0,s=!1){if(s)throw e;console.error(e)}const Se=[];let et=-1;const Jt=[];let St=null,Qt=0;const nl=Promise.resolve();let Qn=null;function as(e){const t=Qn||nl;return e?t.then(this?e.bind(this):e):t}function Ya(e){let t=et+1,n=Se.length;for(;t<n;){const r=t+n>>>1,s=Se[r],i=On(s);i<e||i===e&&s.flags&2?t=r+1:n=r}return t}function os(e){if(!(e.flags&1)){const t=On(e),n=Se[Se.length-1];!n||!(e.flags&2)&&t>=On(n)?Se.push(e):Se.splice(Ya(t),0,e),e.flags|=1,rl()}}function rl(){Qn||(Qn=nl.then(il))}function eo(e){V(e)?Jt.push(...e):St&&e.id===-1?St.splice(Qt+1,0,e):e.flags&1||(Jt.push(e),e.flags|=1),rl()}function Ps(e,t,n=et+1){for(;n<Se.length;n++){const r=Se[n];if(r&&r.flags&2){if(e&&r.id!==e.uid)continue;Se.splice(n,1),n--,r.flags&4&&(r.flags&=-2),r(),r.flags&4||(r.flags&=-2)}}}function sl(e){if(Jt.length){const t=[...new Set(Jt)].sort((n,r)=>On(n)-On(r));if(Jt.length=0,St){St.push(...t);return}for(St=t,Qt=0;Qt<St.length;Qt++){const n=St[Qt];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}St=null,Qt=0}}const On=e=>e.id==null?e.flags&2?-1:1/0:e.id;function il(e){try{for(et=0;et<Se.length;et++){const t=Se[et];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),Tn(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;et<Se.length;et++){const t=Se[et];t&&(t.flags&=-2)}et=-1,Se.length=0,sl(),Qn=null,(Se.length||Jt.length)&&il()}}let Ne=null,ll=null;function Kn(e){const t=Ne;return Ne=e,ll=e&&e.type.__scopeId||null,t}function Vn(e,t=Ne,n){if(!t||e._n)return e;const r=(...s)=>{r._d&&Jn(-1);const i=Kn(t);let a;try{a=e(...s)}finally{Kn(i),r._d&&Jn(1)}return a};return r._n=!0,r._c=!0,r._d=!0,r}function Dt(e,t,n,r){const s=e.dirs,i=t&&t.dirs;for(let a=0;a<s.length;a++){const o=s[a];i&&(o.oldValue=i[a].value);let l=o.dir[r];l&&(mt(),ot(l,n,8,[e.el,o,e,t]),gt())}}function Hn(e,t){if(_e){let n=_e.provides;const r=_e.parent&&_e.parent.provides;r===n&&(n=_e.provides=Object.create(r)),n[e]=t}}function Ie(e,t,n=!1){const r=rc();if(r||Yt){let s=Yt?Yt._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(s&&e in s)return s[e];if(arguments.length>1)return n&&H(t)?t.call(r&&r.proxy):t}}const to=Symbol.for("v-scx"),no=()=>Ie(to);function yn(e,t,n){return al(e,t,n)}function al(e,t,n=se){const{immediate:r,deep:s,flush:i,once:a}=n,o=me({},n),l=t&&r||!t&&i!=="post";let c;if(En){if(i==="sync"){const g=no();c=g.__watcherHandles||(g.__watcherHandles=[])}else if(!l){const g=()=>{};return g.stop=st,g.resume=st,g.pause=st,g}}const u=_e;o.call=(g,_,S)=>ot(g,u,_,S);let p=!1;i==="post"?o.scheduler=g=>{Oe(g,u&&u.suspense)}:i!=="sync"&&(p=!0,o.scheduler=(g,_)=>{_?g():os(g)}),o.augmentJob=g=>{t&&(g.flags|=4),p&&(g.flags|=2,u&&(g.id=u.uid,g.i=u))};const h=Xa(e,t,o);return En&&(c?c.push(h):l&&h()),h}function ro(e,t,n){const r=this.proxy,s=ce(e)?e.includes(".")?ol(r,e):()=>r[e]:e.bind(r,r);let i;H(t)?i=t:(i=t.handler,n=t);const a=Pn(this),o=al(s,i.bind(r),n);return a(),o}function ol(e,t){const n=t.split(".");return()=>{let r=e;for(let s=0;s<n.length&&r;s++)r=r[n[s]];return r}}const so=Symbol("_vte"),io=e=>e.__isTeleport,lo=Symbol("_leaveCb");function cs(e,t){e.shapeFlag&6&&e.component?(e.transition=t,cs(e.component.subTree,t)):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function cl(e,t){return H(e)?me({name:e.name},t,{setup:e}):e}function ul(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0]}function Ms(e,t){let n;return!!((n=Object.getOwnPropertyDescriptor(e,t))&&!n.configurable)}const Zn=new WeakMap;function vn(e,t,n,r,s=!1){if(V(e)){e.forEach((S,E)=>vn(S,t&&(V(t)?t[E]:t),n,r,s));return}if(wn(r)&&!s){r.shapeFlag&512&&r.type.__asyncResolved&&r.component.subTree.component&&vn(e,t,n,r.component.subTree);return}const i=r.shapeFlag&4?ds(r.component):r.el,a=s?null:i,{i:o,r:l}=e,c=t&&t.r,u=o.refs===se?o.refs={}:o.refs,p=o.setupState,h=K(p),g=p===se?Ai:S=>Ms(u,S)?!1:Z(h,S),_=(S,E)=>!(E&&Ms(u,E));if(c!=null&&c!==l){if(zs(t),ce(c))u[c]=null,g(c)&&(p[c]=null);else if(ve(c)){const S=t;_(c,S.k)&&(c.value=null),S.k&&(u[S.k]=null)}}if(H(l))Tn(l,o,12,[a,u]);else{const S=ce(l),E=ve(l);if(S||E){const I=()=>{if(e.f){const O=S?g(l)?p[l]:u[l]:_()||!e.k?l.value:u[e.k];if(s)V(O)&&Zr(O,i);else if(V(O))O.includes(i)||O.push(i);else if(S)u[l]=[i],g(l)&&(p[l]=u[l]);else{const P=[i];_(l,e.k)&&(l.value=P),e.k&&(u[e.k]=P)}}else S?(u[l]=a,g(l)&&(p[l]=a)):E&&(_(l,e.k)&&(l.value=a),e.k&&(u[e.k]=a))};if(a){const O=()=>{I(),Zn.delete(e)};O.id=-1,Zn.set(e,O),Oe(O,n)}else zs(e),I()}}}function zs(e){const t=Zn.get(e);t&&(t.flags|=8,Zn.delete(e))}or().requestIdleCallback;or().cancelIdleCallback;const wn=e=>!!e.type.__asyncLoader,pl=e=>e.type.__isKeepAlive;function ao(e,t){fl(e,"a",t)}function oo(e,t){fl(e,"da",t)}function fl(e,t,n=_e){const r=e.__wdc||(e.__wdc=()=>{let s=n;for(;s;){if(s.isDeactivated)return;s=s.parent}return e()});if(fr(t,r,n),n){let s=n.parent;for(;s&&s.parent;)pl(s.parent.vnode)&&co(r,t,n,s),s=s.parent}}function co(e,t,n,r){const s=fr(t,e,r,!0);sn(()=>{Zr(r[t],s)},n)}function fr(e,t,n=_e,r=!1){if(n){const s=n[e]||(n[e]=[]),i=t.__weh||(t.__weh=(...a)=>{mt();const o=Pn(n),l=ot(t,n,e,a);return o(),gt(),l});return r?s.unshift(i):s.push(i),i}}const _t=e=>(t,n=_e)=>{(!En||e==="sp")&&fr(e,(...r)=>t(...r),n)},uo=_t("bm"),Bn=_t("m"),po=_t("bu"),fo=_t("u"),ho=_t("bum"),sn=_t("um"),mo=_t("sp"),go=_t("rtg"),bo=_t("rtc");function _o(e,t=_e){fr("ec",e,t)}const yo="components";function dl(e,t){return wo(yo,e,!0,t)||e}const vo=Symbol.for("v-ndc");function wo(e,t,n=!0,r=!1){const s=Ne||_e;if(s){const i=s.type;{const o=oc(i,!1);if(o&&(o===t||o===Re(t)||o===ar(Re(t))))return i}const a=Is(s[e]||i[e],t)||Is(s.appContext[e],t);return!a&&r?i:a}}function Is(e,t){return e&&(e[t]||e[Re(t)]||e[ar(Re(t))])}function hl(e,t,n,r){let s;const i=n,a=V(e);if(a||ce(e)){const o=a&&$t(e);let l=!1,c=!1;o&&(l=!ze(e),c=bt(e),e=cr(e)),s=new Array(e.length);for(let u=0,p=e.length;u<p;u++)s[u]=t(l?c?en(je(e[u])):je(e[u]):e[u],u,void 0,i)}else if(typeof e=="number"){s=new Array(e);for(let o=0;o<e;o++)s[o]=t(o+1,o,void 0,i)}else if(J(e))if(e[Symbol.iterator])s=Array.from(e,(o,l)=>t(o,l,void 0,i));else{const o=Object.keys(e);s=new Array(o.length);for(let l=0,c=o.length;l<c;l++){const u=o[l];s[l]=t(e[u],u,l,i)}}else s=[];return s}const zr=e=>e?Pl(e)?ds(e):zr(e.parent):null,kn=me(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>zr(e.parent),$root:e=>zr(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>gl(e),$forceUpdate:e=>e.f||(e.f=()=>{os(e.update)}),$nextTick:e=>e.n||(e.n=as.bind(e.proxy)),$watch:e=>ro.bind(e)}),Sr=(e,t)=>e!==se&&!e.__isScriptSetup&&Z(e,t),ko={get({_:e},t){if(t==="__v_skip")return!0;const{ctx:n,setupState:r,data:s,props:i,accessCache:a,type:o,appContext:l}=e;if(t[0]!=="$"){const h=a[t];if(h!==void 0)switch(h){case 1:return r[t];case 2:return s[t];case 4:return n[t];case 3:return i[t]}else{if(Sr(r,t))return a[t]=1,r[t];if(s!==se&&Z(s,t))return a[t]=2,s[t];if(Z(i,t))return a[t]=3,i[t];if(n!==se&&Z(n,t))return a[t]=4,n[t];Ir&&(a[t]=0)}}const c=kn[t];let u,p;if(c)return t==="$attrs"&&be(e.attrs,"get",""),c(e);if((u=o.__cssModules)&&(u=u[t]))return u;if(n!==se&&Z(n,t))return a[t]=4,n[t];if(p=l.config.globalProperties,Z(p,t))return p[t]},set({_:e},t,n){const{data:r,setupState:s,ctx:i}=e;return Sr(s,t)?(s[t]=n,!0):r!==se&&Z(r,t)?(r[t]=n,!0):Z(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(i[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:r,appContext:s,props:i,type:a}},o){let l;return!!(n[o]||e!==se&&o[0]!=="$"&&Z(e,o)||Sr(t,o)||Z(i,o)||Z(r,o)||Z(kn,o)||Z(s.config.globalProperties,o)||(l=a.__cssModules)&&l[o])},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:Z(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};function $s(e){return V(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e}let Ir=!0;function xo(e){const t=gl(e),n=e.proxy,r=e.ctx;Ir=!1,t.beforeCreate&&Ls(t.beforeCreate,e,"bc");const{data:s,computed:i,methods:a,watch:o,provide:l,inject:c,created:u,beforeMount:p,mounted:h,beforeUpdate:g,updated:_,activated:S,deactivated:E,beforeDestroy:I,beforeUnmount:O,destroyed:P,unmounted:B,render:G,renderTracked:le,renderTriggered:ae,errorCaptured:Fe,serverPrefetch:yt,expose:Ge,inheritAttrs:vt,components:Et,directives:We,filters:an}=t;if(c&&So(c,r,null),a)for(const Y in a){const W=a[Y];H(W)&&(r[Y]=W.bind(n))}if(s){const Y=s.call(n,n);J(Y)&&(e.data=ur(Y))}if(Ir=!0,i)for(const Y in i){const W=i[Y],ct=H(W)?W.bind(n,n):H(W.get)?W.get.bind(n,n):st,wt=!H(W)&&H(W.set)?W.set.bind(n):st,Qe=Me({get:ct,set:wt});Object.defineProperty(r,Y,{enumerable:!0,configurable:!0,get:()=>Qe.value,set:qe=>Qe.value=qe})}if(o)for(const Y in o)ml(o[Y],r,n,Y);if(l){const Y=H(l)?l.call(n):l;Reflect.ownKeys(Y).forEach(W=>{Hn(W,Y[W])})}u&&Ls(u,e,"c");function de(Y,W){V(W)?W.forEach(ct=>Y(ct.bind(n))):W&&Y(W.bind(n))}if(de(uo,p),de(Bn,h),de(po,g),de(fo,_),de(ao,S),de(oo,E),de(_o,Fe),de(bo,le),de(go,ae),de(ho,O),de(sn,B),de(mo,yt),V(Ge))if(Ge.length){const Y=e.exposed||(e.exposed={});Ge.forEach(W=>{Object.defineProperty(Y,W,{get:()=>n[W],set:ct=>n[W]=ct,enumerable:!0})})}else e.exposed||(e.exposed={});G&&e.render===st&&(e.render=G),vt!=null&&(e.inheritAttrs=vt),Et&&(e.components=Et),We&&(e.directives=We),yt&&ul(e)}function So(e,t,n=st){V(e)&&(e=$r(e));for(const r in e){const s=e[r];let i;J(s)?"default"in s?i=Ie(s.from||r,s.default,!0):i=Ie(s.from||r):i=Ie(s),ve(i)?Object.defineProperty(t,r,{enumerable:!0,configurable:!0,get:()=>i.value,set:a=>i.value=a}):t[r]=i}}function Ls(e,t,n){ot(V(e)?e.map(r=>r.bind(t.proxy)):e.bind(t.proxy),t,n)}function ml(e,t,n,r){let s=r.includes(".")?ol(n,r):()=>n[r];if(ce(e)){const i=t[e];H(i)&&yn(s,i)}else if(H(e))yn(s,e.bind(n));else if(J(e))if(V(e))e.forEach(i=>ml(i,t,n,r));else{const i=H(e.handler)?e.handler.bind(n):t[e.handler];H(i)&&yn(s,i,e)}}function gl(e){const t=e.type,{mixins:n,extends:r}=t,{mixins:s,optionsCache:i,config:{optionMergeStrategies:a}}=e.appContext,o=i.get(t);let l;return o?l=o:!s.length&&!n&&!r?l=t:(l={},s.length&&s.forEach(c=>Xn(l,c,a,!0)),Xn(l,t,a)),J(t)&&i.set(t,l),l}function Xn(e,t,n,r=!1){const{mixins:s,extends:i}=t;i&&Xn(e,i,n,!0),s&&s.forEach(a=>Xn(e,a,n,!0));for(const a in t)if(!(r&&a==="expose")){const o=Ro[a]||n&&n[a];e[a]=o?o(e[a],t[a]):t[a]}return e}const Ro={data:Ns,props:Vs,emits:Vs,methods:dn,computed:dn,beforeCreate:we,created:we,beforeMount:we,mounted:we,beforeUpdate:we,updated:we,beforeDestroy:we,beforeUnmount:we,destroyed:we,unmounted:we,activated:we,deactivated:we,errorCaptured:we,serverPrefetch:we,components:dn,directives:dn,watch:Oo,provide:Ns,inject:qo};function Ns(e,t){return t?e?function(){return me(H(e)?e.call(this,this):e,H(t)?t.call(this,this):t)}:t:e}function qo(e,t){return dn($r(e),$r(t))}function $r(e){if(V(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function we(e,t){return e?[...new Set([].concat(e,t))]:t}function dn(e,t){return e?me(Object.create(null),e,t):t}function Vs(e,t){return e?V(e)&&V(t)?[...new Set([...e,...t])]:me(Object.create(null),$s(e),$s(t??{})):t}function Oo(e,t){if(!e)return t;if(!t)return e;const n=me(Object.create(null),e);for(const r in t)n[r]=we(e[r],t[r]);return n}function bl(){return{app:null,config:{isNativeTag:Ai,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Co=0;function Eo(e,t){return function(r,s=null){H(r)||(r=me({},r)),s!=null&&!J(s)&&(s=null);const i=bl(),a=new WeakSet,o=[];let l=!1;const c=i.app={_uid:Co++,_component:r,_props:s,_container:null,_context:i,_instance:null,version:uc,get config(){return i.config},set config(u){},use(u,...p){return a.has(u)||(u&&H(u.install)?(a.add(u),u.install(c,...p)):H(u)&&(a.add(u),u(c,...p))),c},mixin(u){return i.mixins.includes(u)||i.mixins.push(u),c},component(u,p){return p?(i.components[u]=p,c):i.components[u]},directive(u,p){return p?(i.directives[u]=p,c):i.directives[u]},mount(u,p,h){if(!l){const g=c._ceVNode||ue(r,s);return g.appContext=i,h===!0?h="svg":h===!1&&(h=void 0),e(g,u,h),l=!0,c._container=u,u.__vue_app__=c,ds(g.component)}},onUnmount(u){o.push(u)},unmount(){l&&(ot(o,c._instance,16),e(null,c._container),delete c._container.__vue_app__)},provide(u,p){return i.provides[u]=p,c},runWithContext(u){const p=Yt;Yt=c;try{return u()}finally{Yt=p}}};return c}}let Yt=null;const Ao=(e,t)=>t==="modelValue"||t==="model-value"?e.modelModifiers:e[`${t}Modifiers`]||e[`${Re(t)}Modifiers`]||e[`${Vt(t)}Modifiers`];function Do(e,t,...n){if(e.isUnmounted)return;const r=e.vnode.props||se;let s=n;const i=t.startsWith("update:"),a=i&&Ao(r,t.slice(7));a&&(a.trim&&(s=n.map(u=>ce(u)?u.trim():u)),a.number&&(s=n.map(ga)));let o,l=r[o=_r(t)]||r[o=_r(Re(t))];!l&&i&&(l=r[o=_r(Vt(t))]),l&&ot(l,e,6,s);const c=r[o+"Once"];if(c){if(!e.emitted)e.emitted={};else if(e.emitted[o])return;e.emitted[o]=!0,ot(c,e,6,s)}}const To=new WeakMap;function _l(e,t,n=!1){const r=n?To:t.emitsCache,s=r.get(e);if(s!==void 0)return s;const i=e.emits;let a={},o=!1;if(!H(e)){const l=c=>{const u=_l(c,t,!0);u&&(o=!0,me(a,u))};!n&&t.mixins.length&&t.mixins.forEach(l),e.extends&&l(e.extends),e.mixins&&e.mixins.forEach(l)}return!i&&!o?(J(e)&&r.set(e,null),null):(V(i)?i.forEach(l=>a[l]=null):me(a,i),J(e)&&r.set(e,a),a)}function dr(e,t){return!e||!sr(t)?!1:(t=t.slice(2).replace(/Once$/,""),Z(e,t[0].toLowerCase()+t.slice(1))||Z(e,Vt(t))||Z(e,t))}function Hs(e){const{type:t,vnode:n,proxy:r,withProxy:s,propsOptions:[i],slots:a,attrs:o,emit:l,render:c,renderCache:u,props:p,data:h,setupState:g,ctx:_,inheritAttrs:S}=e,E=Kn(e);let I,O;try{if(n.shapeFlag&4){const B=s||r,G=B;I=nt(c.call(G,B,u,p,g,h,_)),O=o}else{const B=t;I=nt(B.length>1?B(p,{attrs:o,slots:a,emit:l}):B(p,null)),O=t.props?o:Bo(o)}}catch(B){xn.length=0,pr(B,e,1),I=ue(Ct)}let P=I;if(O&&S!==!1){const B=Object.keys(O),{shapeFlag:G}=P;B.length&&G&7&&(i&&B.some(ir)&&(O=Po(O,i)),P=tn(P,O,!1,!0))}return n.dirs&&(P=tn(P,null,!1,!0),P.dirs=P.dirs?P.dirs.concat(n.dirs):n.dirs),n.transition&&cs(P,n.transition),I=P,Kn(E),I}const Bo=e=>{let t;for(const n in e)(n==="class"||n==="style"||sr(n))&&((t||(t={}))[n]=e[n]);return t},Po=(e,t)=>{const n={};for(const r in e)(!ir(r)||!(r.slice(9)in t))&&(n[r]=e[r]);return n};function Mo(e,t,n){const{props:r,children:s,component:i}=e,{props:a,children:o,patchFlag:l}=t,c=i.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&l>=0){if(l&1024)return!0;if(l&16)return r?js(r,a,c):!!a;if(l&8){const u=t.dynamicProps;for(let p=0;p<u.length;p++){const h=u[p];if(yl(a,r,h)&&!dr(c,h))return!0}}}else return(s||o)&&(!o||!o.$stable)?!0:r===a?!1:r?a?js(r,a,c):!0:!!a;return!1}function js(e,t,n){const r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let s=0;s<r.length;s++){const i=r[s];if(yl(t,e,i)&&!dr(n,i))return!0}return!1}function yl(e,t,n){const r=e[n],s=t[n];return n==="style"&&J(r)&&J(s)?!Yr(r,s):r!==s}function zo({vnode:e,parent:t,suspense:n},r){for(;t;){const s=t.subTree;if(s.suspense&&s.suspense.activeBranch===e&&(s.suspense.vnode.el=s.el=r,e=s),s===e)(e=t.vnode).el=r,t=t.parent;else break}n&&n.activeBranch===e&&(n.vnode.el=r)}const vl={},wl=()=>Object.create(vl),kl=e=>Object.getPrototypeOf(e)===vl;function Io(e,t,n,r=!1){const s={},i=wl();e.propsDefaults=Object.create(null),xl(e,t,s,i);for(const a in e.propsOptions[0])a in s||(s[a]=void 0);n?e.props=r?s:Yi(s):e.type.props?e.props=s:e.props=i,e.attrs=i}function $o(e,t,n,r){const{props:s,attrs:i,vnode:{patchFlag:a}}=e,o=K(s),[l]=e.propsOptions;let c=!1;if((r||a>0)&&!(a&16)){if(a&8){const u=e.vnode.dynamicProps;for(let p=0;p<u.length;p++){let h=u[p];if(dr(e.emitsOptions,h))continue;const g=t[h];if(l)if(Z(i,h))g!==i[h]&&(i[h]=g,c=!0);else{const _=Re(h);s[_]=Lr(l,o,_,g,e,!1)}else g!==i[h]&&(i[h]=g,c=!0)}}}else{xl(e,t,s,i)&&(c=!0);let u;for(const p in o)(!t||!Z(t,p)&&((u=Vt(p))===p||!Z(t,u)))&&(l?n&&(n[p]!==void 0||n[u]!==void 0)&&(s[p]=Lr(l,o,p,void 0,e,!0)):delete s[p]);if(i!==o)for(const p in i)(!t||!Z(t,p))&&(delete i[p],c=!0)}c&&ht(e.attrs,"set","")}function xl(e,t,n,r){const[s,i]=e.propsOptions;let a=!1,o;if(t)for(let l in t){if(gn(l))continue;const c=t[l];let u;s&&Z(s,u=Re(l))?!i||!i.includes(u)?n[u]=c:(o||(o={}))[u]=c:dr(e.emitsOptions,l)||(!(l in r)||c!==r[l])&&(r[l]=c,a=!0)}if(i){const l=K(n),c=o||se;for(let u=0;u<i.length;u++){const p=i[u];n[p]=Lr(s,l,p,c[p],e,!Z(c,p))}}return a}function Lr(e,t,n,r,s,i){const a=e[n];if(a!=null){const o=Z(a,"default");if(o&&r===void 0){const l=a.default;if(a.type!==Function&&!a.skipFactory&&H(l)){const{propsDefaults:c}=s;if(n in c)r=c[n];else{const u=Pn(s);r=c[n]=l.call(null,t),u()}}else r=l;s.ce&&s.ce._setProp(n,r)}a[0]&&(i&&!o?r=!1:a[1]&&(r===""||r===Vt(n))&&(r=!0))}return r}const Lo=new WeakMap;function Sl(e,t,n=!1){const r=n?Lo:t.propsCache,s=r.get(e);if(s)return s;const i=e.props,a={},o=[];let l=!1;if(!H(e)){const u=p=>{l=!0;const[h,g]=Sl(p,t,!0);me(a,h),g&&o.push(...g)};!n&&t.mixins.length&&t.mixins.forEach(u),e.extends&&u(e.extends),e.mixins&&e.mixins.forEach(u)}if(!i&&!l)return J(e)&&r.set(e,Zt),Zt;if(V(i))for(let u=0;u<i.length;u++){const p=Re(i[u]);Us(p)&&(a[p]=se)}else if(i)for(const u in i){const p=Re(u);if(Us(p)){const h=i[u],g=a[p]=V(h)||H(h)?{type:h}:me({},h),_=g.type;let S=!1,E=!0;if(V(_))for(let I=0;I<_.length;++I){const O=_[I],P=H(O)&&O.name;if(P==="Boolean"){S=!0;break}else P==="String"&&(E=!1)}else S=H(_)&&_.name==="Boolean";g[0]=S,g[1]=E,(S||Z(g,"default"))&&o.push(p)}}const c=[a,o];return J(e)&&r.set(e,c),c}function Us(e){return e[0]!=="$"&&!gn(e)}const us=e=>e==="_"||e==="_ctx"||e==="$stable",ps=e=>V(e)?e.map(nt):[nt(e)],No=(e,t,n)=>{if(t._n)return t;const r=Vn((...s)=>ps(t(...s)),n);return r._c=!1,r},Rl=(e,t,n)=>{const r=e._ctx;for(const s in e){if(us(s))continue;const i=e[s];if(H(i))t[s]=No(s,i,r);else if(i!=null){const a=ps(i);t[s]=()=>a}}},ql=(e,t)=>{const n=ps(t);e.slots.default=()=>n},Ol=(e,t,n)=>{for(const r in t)(n||!us(r))&&(e[r]=t[r])},Vo=(e,t,n)=>{const r=e.slots=wl();if(e.vnode.shapeFlag&32){const s=t._;s?(Ol(r,t,n),n&&Mi(r,"_",s,!0)):Rl(t,r)}else t&&ql(e,t)},Ho=(e,t,n)=>{const{vnode:r,slots:s}=e;let i=!0,a=se;if(r.shapeFlag&32){const o=t._;o?n&&o===1?i=!1:Ol(s,t,n):(i=!t.$stable,Rl(t,s)),a=t}else t&&(ql(e,t),a={default:1});if(i)for(const o in s)!us(o)&&a[o]==null&&delete s[o]},Oe=Wo;function jo(e){return Uo(e)}function Uo(e,t){const n=or();n.__VUE__=!0;const{insert:r,remove:s,patchProp:i,createElement:a,createText:o,createComment:l,setText:c,setElementText:u,parentNode:p,nextSibling:h,setScopeId:g=st,insertStaticContent:_}=e,S=(f,d,b,y=null,k=null,v=null,C=void 0,q=null,R=!!d.dynamicChildren)=>{if(f===d)return;f&&!un(f,d)&&(y=w(f),qe(f,k,v,!0),f=null),d.patchFlag===-2&&(R=!1,d.dynamicChildren=null);const{type:x,ref:$,shapeFlag:D}=d;switch(x){case hr:E(f,d,b,y);break;case Ct:I(f,d,b,y);break;case jn:f==null&&O(d,b,y,C);break;case Be:Et(f,d,b,y,k,v,C,q,R);break;default:D&1?G(f,d,b,y,k,v,C,q,R):D&6?We(f,d,b,y,k,v,C,q,R):(D&64||D&128)&&x.process(f,d,b,y,k,v,C,q,R,M)}$!=null&&k?vn($,f&&f.ref,v,d||f,!d):$==null&&f&&f.ref!=null&&vn(f.ref,null,v,f,!0)},E=(f,d,b,y)=>{if(f==null)r(d.el=o(d.children),b,y);else{const k=d.el=f.el;d.children!==f.children&&c(k,d.children)}},I=(f,d,b,y)=>{f==null?r(d.el=l(d.children||""),b,y):d.el=f.el},O=(f,d,b,y)=>{[f.el,f.anchor]=_(f.children,d,b,y,f.el,f.anchor)},P=({el:f,anchor:d},b,y)=>{let k;for(;f&&f!==d;)k=h(f),r(f,b,y),f=k;r(d,b,y)},B=({el:f,anchor:d})=>{let b;for(;f&&f!==d;)b=h(f),s(f),f=b;s(d)},G=(f,d,b,y,k,v,C,q,R)=>{if(d.type==="svg"?C="svg":d.type==="math"&&(C="mathml"),f==null)le(d,b,y,k,v,C,q,R);else{const x=f.el&&f.el._isVueCE?f.el:null;try{x&&x._beginPatch(),yt(f,d,k,v,C,q,R)}finally{x&&x._endPatch()}}},le=(f,d,b,y,k,v,C,q)=>{let R,x;const{props:$,shapeFlag:D,transition:z,dirs:N}=f;if(R=f.el=a(f.type,v,$&&$.is,$),D&8?u(R,f.children):D&16&&Fe(f.children,R,null,y,k,Rr(f,v),C,q),N&&Dt(f,null,y,"created"),ae(R,f,f.scopeId,C,y),$){for(const te in $)te!=="value"&&!gn(te)&&i(R,te,null,$[te],v,y);"value"in $&&i(R,"value",null,$.value,v),(x=$.onVnodeBeforeMount)&&Je(x,y,f)}N&&Dt(f,null,y,"beforeMount");const F=Fo(k,z);F&&z.beforeEnter(R),r(R,d,b),((x=$&&$.onVnodeMounted)||F||N)&&Oe(()=>{try{x&&Je(x,y,f),F&&z.enter(R),N&&Dt(f,null,y,"mounted")}finally{}},k)},ae=(f,d,b,y,k)=>{if(b&&g(f,b),y)for(let v=0;v<y.length;v++)g(f,y[v]);if(k){let v=k.subTree;if(d===v||Dl(v.type)&&(v.ssContent===d||v.ssFallback===d)){const C=k.vnode;ae(f,C,C.scopeId,C.slotScopeIds,k.parent)}}},Fe=(f,d,b,y,k,v,C,q,R=0)=>{for(let x=R;x<f.length;x++){const $=f[x]=q?dt(f[x]):nt(f[x]);S(null,$,d,b,y,k,v,C,q)}},yt=(f,d,b,y,k,v,C)=>{const q=d.el=f.el;let{patchFlag:R,dynamicChildren:x,dirs:$}=d;R|=f.patchFlag&16;const D=f.props||se,z=d.props||se;let N;if(b&&Tt(b,!1),(N=z.onVnodeBeforeUpdate)&&Je(N,b,d,f),$&&Dt(d,f,b,"beforeUpdate"),b&&Tt(b,!0),(D.innerHTML&&z.innerHTML==null||D.textContent&&z.textContent==null)&&u(q,""),x?Ge(f.dynamicChildren,x,q,b,y,Rr(d,k),v):C||W(f,d,q,null,b,y,Rr(d,k),v,!1),R>0){if(R&16)vt(q,D,z,b,k);else if(R&2&&D.class!==z.class&&i(q,"class",null,z.class,k),R&4&&i(q,"style",D.style,z.style,k),R&8){const F=d.dynamicProps;for(let te=0;te<F.length;te++){const ne=F[te],pe=D[ne],he=z[ne];(he!==pe||ne==="value")&&i(q,ne,pe,he,k,b)}}R&1&&f.children!==d.children&&u(q,d.children)}else!C&&x==null&&vt(q,D,z,b,k);((N=z.onVnodeUpdated)||$)&&Oe(()=>{N&&Je(N,b,d,f),$&&Dt(d,f,b,"updated")},y)},Ge=(f,d,b,y,k,v,C)=>{for(let q=0;q<d.length;q++){const R=f[q],x=d[q],$=R.el&&(R.type===Be||!un(R,x)||R.shapeFlag&198)?p(R.el):b;S(R,x,$,null,y,k,v,C,!0)}},vt=(f,d,b,y,k)=>{if(d!==b){if(d!==se)for(const v in d)!gn(v)&&!(v in b)&&i(f,v,d[v],null,k,y);for(const v in b){if(gn(v))continue;const C=b[v],q=d[v];C!==q&&v!=="value"&&i(f,v,q,C,k,y)}"value"in b&&i(f,"value",d.value,b.value,k)}},Et=(f,d,b,y,k,v,C,q,R)=>{const x=d.el=f?f.el:o(""),$=d.anchor=f?f.anchor:o("");let{patchFlag:D,dynamicChildren:z,slotScopeIds:N}=d;N&&(q=q?q.concat(N):N),f==null?(r(x,b,y),r($,b,y),Fe(d.children||[],b,$,k,v,C,q,R)):D>0&&D&64&&z&&f.dynamicChildren&&f.dynamicChildren.length===z.length?(Ge(f.dynamicChildren,z,b,k,v,C,q),(d.key!=null||k&&d===k.subTree)&&Cl(f,d,!0)):W(f,d,b,$,k,v,C,q,R)},We=(f,d,b,y,k,v,C,q,R)=>{d.slotScopeIds=q,f==null?d.shapeFlag&512?k.ctx.activate(d,b,y,C,R):an(d,b,y,k,v,C,R):jt(f,d,R)},an=(f,d,b,y,k,v,C)=>{const q=f.component=nc(f,y,k);if(pl(f)&&(q.ctx.renderer=M),sc(q,!1,C),q.asyncDep){if(k&&k.registerDep(q,de,C),!f.el){const R=q.subTree=ue(Ct);I(null,R,d,b),f.placeholder=R.el}}else de(q,f,d,b,k,v,C)},jt=(f,d,b)=>{const y=d.component=f.component;if(Mo(f,d,b))if(y.asyncDep&&!y.asyncResolved){Y(y,d,b);return}else y.next=d,y.update();else d.el=f.el,y.vnode=d},de=(f,d,b,y,k,v,C)=>{const q=()=>{if(f.isMounted){let{next:D,bu:z,u:N,parent:F,vnode:te}=f;{const Ze=El(f);if(Ze){D&&(D.el=te.el,Y(f,D,C)),Ze.asyncDep.then(()=>{Oe(()=>{f.isUnmounted||x()},k)});return}}let ne=D,pe;Tt(f,!1),D?(D.el=te.el,Y(f,D,C)):D=te,z&&yr(z),(pe=D.props&&D.props.onVnodeBeforeUpdate)&&Je(pe,F,D,te),Tt(f,!0);const he=Hs(f),Ke=f.subTree;f.subTree=he,S(Ke,he,p(Ke.el),w(Ke),f,k,v),D.el=he.el,ne===null&&zo(f,he.el),N&&Oe(N,k),(pe=D.props&&D.props.onVnodeUpdated)&&Oe(()=>Je(pe,F,D,te),k)}else{let D;const{el:z,props:N}=d,{bm:F,m:te,parent:ne,root:pe,type:he}=f,Ke=wn(d);Tt(f,!1),F&&yr(F),!Ke&&(D=N&&N.onVnodeBeforeMount)&&Je(D,ne,d),Tt(f,!0);{pe.ce&&pe.ce._hasShadowRoot()&&pe.ce._injectChildStyle(he,f.parent?f.parent.type:void 0);const Ze=f.subTree=Hs(f);S(null,Ze,b,y,f,k,v),d.el=Ze.el}if(te&&Oe(te,k),!Ke&&(D=N&&N.onVnodeMounted)){const Ze=d;Oe(()=>Je(D,ne,Ze),k)}(d.shapeFlag&256||ne&&wn(ne.vnode)&&ne.vnode.shapeFlag&256)&&f.a&&Oe(f.a,k),f.isMounted=!0,d=b=y=null}};f.scope.on();const R=f.effect=new Li(q);f.scope.off();const x=f.update=R.run.bind(R),$=f.job=R.runIfDirty.bind(R);$.i=f,$.id=f.uid,R.scheduler=()=>os($),Tt(f,!0),x()},Y=(f,d,b)=>{d.component=f;const y=f.vnode.props;f.vnode=d,f.next=null,$o(f,d.props,y,b),Ho(f,d.children,b),mt(),Ps(f),gt()},W=(f,d,b,y,k,v,C,q,R=!1)=>{const x=f&&f.children,$=f?f.shapeFlag:0,D=d.children,{patchFlag:z,shapeFlag:N}=d;if(z>0){if(z&128){wt(x,D,b,y,k,v,C,q,R);return}else if(z&256){ct(x,D,b,y,k,v,C,q,R);return}}N&8?($&16&&De(x,k,v),D!==x&&u(b,D)):$&16?N&16?wt(x,D,b,y,k,v,C,q,R):De(x,k,v,!0):($&8&&u(b,""),N&16&&Fe(D,b,y,k,v,C,q,R))},ct=(f,d,b,y,k,v,C,q,R)=>{f=f||Zt,d=d||Zt;const x=f.length,$=d.length,D=Math.min(x,$);let z;for(z=0;z<D;z++){const N=d[z]=R?dt(d[z]):nt(d[z]);S(f[z],N,b,null,k,v,C,q,R)}x>$?De(f,k,v,!0,!1,D):Fe(d,b,y,k,v,C,q,R,D)},wt=(f,d,b,y,k,v,C,q,R)=>{let x=0;const $=d.length;let D=f.length-1,z=$-1;for(;x<=D&&x<=z;){const N=f[x],F=d[x]=R?dt(d[x]):nt(d[x]);if(un(N,F))S(N,F,b,null,k,v,C,q,R);else break;x++}for(;x<=D&&x<=z;){const N=f[D],F=d[z]=R?dt(d[z]):nt(d[z]);if(un(N,F))S(N,F,b,null,k,v,C,q,R);else break;D--,z--}if(x>D){if(x<=z){const N=z+1,F=N<$?d[N].el:y;for(;x<=z;)S(null,d[x]=R?dt(d[x]):nt(d[x]),b,F,k,v,C,q,R),x++}}else if(x>z)for(;x<=D;)qe(f[x],k,v,!0),x++;else{const N=x,F=x,te=new Map;for(x=F;x<=z;x++){const Ce=d[x]=R?dt(d[x]):nt(d[x]);Ce.key!=null&&te.set(Ce.key,x)}let ne,pe=0;const he=z-F+1;let Ke=!1,Ze=0;const on=new Array(he);for(x=0;x<he;x++)on[x]=0;for(x=N;x<=D;x++){const Ce=f[x];if(pe>=he){qe(Ce,k,v,!0);continue}let Xe;if(Ce.key!=null)Xe=te.get(Ce.key);else for(ne=F;ne<=z;ne++)if(on[ne-F]===0&&un(Ce,d[ne])){Xe=ne;break}Xe===void 0?qe(Ce,k,v,!0):(on[Xe-F]=x+1,Xe>=Ze?Ze=Xe:Ke=!0,S(Ce,d[Xe],b,null,k,v,C,q,R),pe++)}const Os=Ke?Go(on):Zt;for(ne=Os.length-1,x=he-1;x>=0;x--){const Ce=F+x,Xe=d[Ce],Cs=d[Ce+1],Es=Ce+1<$?Cs.el||Al(Cs):y;on[x]===0?S(null,Xe,b,Es,k,v,C,q,R):Ke&&(ne<0||x!==Os[ne]?Qe(Xe,b,Es,2):ne--)}}},Qe=(f,d,b,y,k=null)=>{const{el:v,type:C,transition:q,children:R,shapeFlag:x}=f;if(x&6){Qe(f.component.subTree,d,b,y);return}if(x&128){f.suspense.move(d,b,y);return}if(x&64){C.move(f,d,b,M);return}if(C===Be){r(v,d,b);for(let D=0;D<R.length;D++)Qe(R[D],d,b,y);r(f.anchor,d,b);return}if(C===jn){P(f,d,b);return}if(y!==2&&x&1&&q)if(y===0)q.beforeEnter(v),r(v,d,b),Oe(()=>q.enter(v),k);else{const{leave:D,delayLeave:z,afterLeave:N}=q,F=()=>{f.ctx.isUnmounted?s(v):r(v,d,b)},te=()=>{v._isLeaving&&v[lo](!0),D(v,()=>{F(),N&&N()})};z?z(v,F,te):te()}else r(v,d,b)},qe=(f,d,b,y=!1,k=!1)=>{const{type:v,props:C,ref:q,children:R,dynamicChildren:x,shapeFlag:$,patchFlag:D,dirs:z,cacheIndex:N,memo:F}=f;if(D===-2&&(k=!1),q!=null&&(mt(),vn(q,null,b,f,!0),gt()),N!=null&&(d.renderCache[N]=void 0),$&256){d.ctx.deactivate(f);return}const te=$&1&&z,ne=!wn(f);let pe;if(ne&&(pe=C&&C.onVnodeBeforeUnmount)&&Je(pe,d,f),$&6)At(f.component,b,y);else{if($&128){f.suspense.unmount(b,y);return}te&&Dt(f,null,d,"beforeUnmount"),$&64?f.type.remove(f,d,b,M,y):x&&!x.hasOnce&&(v!==Be||D>0&&D&64)?De(x,d,b,!1,!0):(v===Be&&D&384||!k&&$&16)&&De(R,d,b),y&&Ut(f)}const he=F!=null&&N==null;(ne&&(pe=C&&C.onVnodeUnmounted)||te||he)&&Oe(()=>{pe&&Je(pe,d,f),te&&Dt(f,null,d,"unmounted"),he&&(f.el=null)},b)},Ut=f=>{const{type:d,el:b,anchor:y,transition:k}=f;if(d===Be){Ft(b,y);return}if(d===jn){B(f);return}const v=()=>{s(b),k&&!k.persisted&&k.afterLeave&&k.afterLeave()};if(f.shapeFlag&1&&k&&!k.persisted){const{leave:C,delayLeave:q}=k,R=()=>C(b,v);q?q(f.el,v,R):R()}else v()},Ft=(f,d)=>{let b;for(;f!==d;)b=h(f),s(f),f=b;s(d)},At=(f,d,b)=>{const{bum:y,scope:k,job:v,subTree:C,um:q,m:R,a:x}=f;Fs(R),Fs(x),y&&yr(y),k.stop(),v&&(v.flags|=8,qe(C,f,d,b)),q&&Oe(q,d),Oe(()=>{f.isUnmounted=!0},d)},De=(f,d,b,y=!1,k=!1,v=0)=>{for(let C=v;C<f.length;C++)qe(f[C],d,b,y,k)},w=f=>{if(f.shapeFlag&6)return w(f.component.subTree);if(f.shapeFlag&128)return f.suspense.next();const d=h(f.anchor||f.el),b=d&&d[so];return b?h(b):d};let T=!1;const A=(f,d,b)=>{let y;f==null?d._vnode&&(qe(d._vnode,null,null,!0),y=d._vnode.component):S(d._vnode||null,f,d,null,null,null,b),d._vnode=f,T||(T=!0,Ps(y),sl(),T=!1)},M={p:S,um:qe,m:Qe,r:Ut,mt:an,mc:Fe,pc:W,pbc:Ge,n:w,o:e};return{render:A,hydrate:void 0,createApp:Eo(A)}}function Rr({type:e,props:t},n){return n==="svg"&&e==="foreignObject"||n==="mathml"&&e==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function Tt({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function Fo(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function Cl(e,t,n=!1){const r=e.children,s=t.children;if(V(r)&&V(s))for(let i=0;i<r.length;i++){const a=r[i];let o=s[i];o.shapeFlag&1&&!o.dynamicChildren&&((o.patchFlag<=0||o.patchFlag===32)&&(o=s[i]=dt(s[i]),o.el=a.el),!n&&o.patchFlag!==-2&&Cl(a,o)),o.type===hr&&(o.patchFlag===-1&&(o=s[i]=dt(o)),o.el=a.el),o.type===Ct&&!o.el&&(o.el=a.el)}}function Go(e){const t=e.slice(),n=[0];let r,s,i,a,o;const l=e.length;for(r=0;r<l;r++){const c=e[r];if(c!==0){if(s=n[n.length-1],e[s]<c){t[r]=s,n.push(r);continue}for(i=0,a=n.length-1;i<a;)o=i+a>>1,e[n[o]]<c?i=o+1:a=o;c<e[n[i]]&&(i>0&&(t[r]=n[i-1]),n[i]=r)}}for(i=n.length,a=n[i-1];i-- >0;)n[i]=a,a=t[a];return n}function El(e){const t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:El(t)}function Fs(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}function Al(e){if(e.placeholder)return e.placeholder;const t=e.component;return t?Al(t.subTree):null}const Dl=e=>e.__isSuspense;function Wo(e,t){t&&t.pendingBranch?V(e)?t.effects.push(...e):t.effects.push(e):eo(e)}const Be=Symbol.for("v-fgt"),hr=Symbol.for("v-txt"),Ct=Symbol.for("v-cmt"),jn=Symbol.for("v-stc"),xn=[];let Ae=null;function He(e=!1){xn.push(Ae=e?null:[])}function Qo(){xn.pop(),Ae=xn[xn.length-1]||null}let Cn=1;function Jn(e,t=!1){Cn+=e,e<0&&Ae&&t&&(Ae.hasOnce=!0)}function Tl(e){return e.dynamicChildren=Cn>0?Ae||Zt:null,Qo(),Cn>0&&Ae&&Ae.push(e),e}function lt(e,t,n,r,s,i){return Tl(m(e,t,n,r,s,i,!0))}function Ko(e,t,n,r,s){return Tl(ue(e,t,n,r,s,!0))}function Yn(e){return e?e.__v_isVNode===!0:!1}function un(e,t){return e.type===t.type&&e.key===t.key}const Bl=({key:e})=>e??null,Un=({ref:e,ref_key:t,ref_for:n})=>(typeof e=="number"&&(e=""+e),e!=null?ce(e)||ve(e)||H(e)?{i:Ne,r:e,k:t,f:!!n}:e:null);function m(e,t=null,n=null,r=0,s=null,i=e===Be?0:1,a=!1,o=!1){const l={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Bl(t),ref:t&&Un(t),scopeId:ll,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:r,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:Ne};return o?(fs(l,n),i&128&&e.normalize(l)):n&&(l.shapeFlag|=ce(n)?8:16),Cn>0&&!a&&Ae&&(l.patchFlag>0||i&6)&&l.patchFlag!==32&&Ae.push(l),l}const ue=Zo;function Zo(e,t=null,n=null,r=0,s=null,i=!1){if((!e||e===vo)&&(e=Ct),Yn(e)){const o=tn(e,t,!0);return n&&fs(o,n),Cn>0&&!i&&Ae&&(o.shapeFlag&6?Ae[Ae.indexOf(e)]=o:Ae.push(o)),o.patchFlag=-2,o}if(cc(e)&&(e=e.__vccOpts),t){t=Xo(t);let{class:o,style:l}=t;o&&!ce(o)&&(t.class=it(o)),J(l)&&(ls(l)&&!V(l)&&(l=me({},l)),t.style=Jr(l))}const a=ce(e)?1:Dl(e)?128:io(e)?64:J(e)?4:H(e)?2:0;return m(e,t,n,r,s,a,i,!0)}function Xo(e){return e?ls(e)||kl(e)?me({},e):e:null}function tn(e,t,n=!1,r=!1){const{props:s,ref:i,patchFlag:a,children:o,transition:l}=e,c=t?Yo(s||{},t):s,u={__v_isVNode:!0,__v_skip:!0,type:e.type,props:c,key:c&&Bl(c),ref:t&&t.ref?n&&i?V(i)?i.concat(Un(t)):[i,Un(t)]:Un(t):i,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:o,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==Be?a===-1?16:a|16:a,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:l,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&tn(e.ssContent),ssFallback:e.ssFallback&&tn(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return l&&r&&cs(u,l.clone(u)),u}function Lt(e=" ",t=0){return ue(hr,null,e,t)}function Wt(e,t){const n=ue(jn,null,e);return n.staticCount=t,n}function Jo(e="",t=!1){return t?(He(),Ko(Ct,null,e)):ue(Ct,null,e)}function nt(e){return e==null||typeof e=="boolean"?ue(Ct):V(e)?ue(Be,null,e.slice()):Yn(e)?dt(e):ue(hr,null,String(e))}function dt(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:tn(e)}function fs(e,t){let n=0;const{shapeFlag:r}=e;if(t==null)t=null;else if(V(t))n=16;else if(typeof t=="object")if(r&65){const s=t.default;s&&(s._c&&(s._d=!1),fs(e,s()),s._c&&(s._d=!0));return}else{n=32;const s=t._;!s&&!kl(t)?t._ctx=Ne:s===3&&Ne&&(Ne.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else H(t)?(t={default:t,_ctx:Ne},n=32):(t=String(t),r&64?(n=16,t=[Lt(t)]):n=8);e.children=t,e.shapeFlag|=n}function Yo(...e){const t={};for(let n=0;n<e.length;n++){const r=e[n];for(const s in r)if(s==="class")t.class!==r.class&&(t.class=it([t.class,r.class]));else if(s==="style")t.style=Jr([t.style,r.style]);else if(sr(s)){const i=t[s],a=r[s];a&&i!==a&&!(V(i)&&i.includes(a))?t[s]=i?[].concat(i,a):a:a==null&&i==null&&!ir(s)&&(t[s]=a)}else s!==""&&(t[s]=r[s])}return t}function Je(e,t,n,r=null){ot(e,t,7,[n,r])}const ec=bl();let tc=0;function nc(e,t,n){const r=e.type,s=(t?t.appContext:e.appContext)||ec,i={uid:tc++,vnode:e,type:r,parent:t,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Sa(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(s.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Sl(r,s),emitsOptions:_l(r,s),emit:null,emitted:null,propsDefaults:se,inheritAttrs:r.inheritAttrs,ctx:se,data:se,props:se,attrs:se,slots:se,refs:se,setupState:se,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=t?t.root:i,i.emit=Do.bind(null,i),e.ce&&e.ce(i),i}let _e=null;const rc=()=>_e||Ne;let er,Nr;{const e=or(),t=(n,r)=>{let s;return(s=e[n])||(s=e[n]=[]),s.push(r),i=>{s.length>1?s.forEach(a=>a(i)):s[0](i)}};er=t("__VUE_INSTANCE_SETTERS__",n=>_e=n),Nr=t("__VUE_SSR_SETTERS__",n=>En=n)}const Pn=e=>{const t=_e;return er(e),e.scope.on(),()=>{e.scope.off(),er(t)}},Gs=()=>{_e&&_e.scope.off(),er(null)};function Pl(e){return e.vnode.shapeFlag&4}let En=!1;function sc(e,t=!1,n=!1){t&&Nr(t);const{props:r,children:s}=e.vnode,i=Pl(e);Io(e,r,i,t),Vo(e,s,n||t);const a=i?ic(e,t):void 0;return t&&Nr(!1),a}function ic(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,ko);const{setup:r}=n;if(r){mt();const s=e.setupContext=r.length>1?ac(e):null,i=Pn(e),a=Tn(r,e,0,[e.props,s]),o=Ti(a);if(gt(),i(),(o||e.sp)&&!wn(e)&&ul(e),o){if(a.then(Gs,Gs),t)return a.then(l=>{Ws(e,l)}).catch(l=>{pr(l,e,0)});e.asyncDep=a}else Ws(e,a)}else Ml(e)}function Ws(e,t,n){H(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:J(t)&&(e.setupState=tl(t)),Ml(e)}function Ml(e,t,n){const r=e.type;e.render||(e.render=r.render||st);{const s=Pn(e);mt();try{xo(e)}finally{gt(),s()}}}const lc={get(e,t){return be(e,"get",""),e[t]}};function ac(e){const t=n=>{e.exposed=n||{}};return{attrs:new Proxy(e.attrs,lc),slots:e.slots,emit:e.emit,expose:t}}function ds(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy(tl(Ua(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in kn)return kn[n](e)},has(t,n){return n in t||n in kn}})):e.proxy}function oc(e,t=!0){return H(e)?e.displayName||e.name:e.name||t&&e.__name}function cc(e){return H(e)&&"__vccOpts"in e}const Me=(e,t)=>Ka(e,t,En);function zl(e,t,n){try{Jn(-1);const r=arguments.length;return r===2?J(t)&&!V(t)?Yn(t)?ue(e,null,[t]):ue(e,t):ue(e,null,t):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&Yn(n)&&(n=[n]),ue(e,t,n))}finally{Jn(1)}}const uc="3.5.33";/**
* @vue/runtime-dom v3.5.33
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Vr;const Qs=typeof window<"u"&&window.trustedTypes;if(Qs)try{Vr=Qs.createPolicy("vue",{createHTML:e=>e})}catch{}const Il=Vr?e=>Vr.createHTML(e):e=>e,pc="http://www.w3.org/2000/svg",fc="http://www.w3.org/1998/Math/MathML",ft=typeof document<"u"?document:null,Ks=ft&&ft.createElement("template"),dc={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{const s=t==="svg"?ft.createElementNS(pc,e):t==="mathml"?ft.createElementNS(fc,e):n?ft.createElement(e,{is:n}):ft.createElement(e);return e==="select"&&r&&r.multiple!=null&&s.setAttribute("multiple",r.multiple),s},createText:e=>ft.createTextNode(e),createComment:e=>ft.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>ft.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,r,s,i){const a=n?n.previousSibling:t.lastChild;if(s&&(s===i||s.nextSibling))for(;t.insertBefore(s.cloneNode(!0),n),!(s===i||!(s=s.nextSibling)););else{Ks.innerHTML=Il(r==="svg"?`<svg>${e}</svg>`:r==="mathml"?`<math>${e}</math>`:e);const o=Ks.content;if(r==="svg"||r==="mathml"){const l=o.firstChild;for(;l.firstChild;)o.appendChild(l.firstChild);o.removeChild(l)}t.insertBefore(o,n)}return[a?a.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},hc=Symbol("_vtc");function mc(e,t,n){const r=e[hc];r&&(t=(t?[t,...r]:[...r]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}const Zs=Symbol("_vod"),gc=Symbol("_vsh"),bc=Symbol(""),_c=/(?:^|;)\s*display\s*:/;function yc(e,t,n){const r=e.style,s=ce(n);let i=!1;if(n&&!s){if(t)if(ce(t))for(const a of t.split(";")){const o=a.slice(0,a.indexOf(":")).trim();n[o]==null&&hn(r,o,"")}else for(const a in t)n[a]==null&&hn(r,a,"");for(const a in n){a==="display"&&(i=!0);const o=n[a];o!=null?wc(e,a,!ce(t)&&t?t[a]:void 0,o)||hn(r,a,o):hn(r,a,"")}}else if(s){if(t!==n){const a=r[bc];a&&(n+=";"+a),r.cssText=n,i=_c.test(n)}}else t&&e.removeAttribute("style");Zs in e&&(e[Zs]=i?r.display:"",e[gc]&&(r.display="none"))}const Xs=/\s*!important$/;function hn(e,t,n){if(V(n))n.forEach(r=>hn(e,t,r));else if(n==null&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const r=vc(e,t);Xs.test(n)?e.setProperty(Vt(r),n.replace(Xs,""),"important"):e[r]=n}}const Js=["Webkit","Moz","ms"],qr={};function vc(e,t){const n=qr[t];if(n)return n;let r=Re(t);if(r!=="filter"&&r in e)return qr[t]=r;r=ar(r);for(let s=0;s<Js.length;s++){const i=Js[s]+r;if(i in e)return qr[t]=i}return t}function wc(e,t,n,r){return e.tagName==="TEXTAREA"&&(t==="width"||t==="height")&&ce(r)&&n===r}const Ys="http://www.w3.org/1999/xlink";function ei(e,t,n,r,s,i=ka(t)){r&&t.startsWith("xlink:")?n==null?e.removeAttributeNS(Ys,t.slice(6,t.length)):e.setAttributeNS(Ys,t,n):n==null||i&&!zi(n)?e.removeAttribute(t):e.setAttribute(t,i?"":at(n)?String(n):n)}function ti(e,t,n,r,s){if(t==="innerHTML"||t==="textContent"){n!=null&&(e[t]=t==="innerHTML"?Il(n):n);return}const i=e.tagName;if(t==="value"&&i!=="PROGRESS"&&!i.includes("-")){const o=i==="OPTION"?e.getAttribute("value")||"":e.value,l=n==null?e.type==="checkbox"?"on":"":String(n);(o!==l||!("_value"in e))&&(e.value=l),n==null&&e.removeAttribute(t),e._value=n;return}let a=!1;if(n===""||n==null){const o=typeof e[t];o==="boolean"?n=zi(n):n==null&&o==="string"?(n="",a=!0):o==="number"&&(n=0,a=!0)}try{e[t]=n}catch{}a&&e.removeAttribute(s||t)}function kc(e,t,n,r){e.addEventListener(t,n,r)}function xc(e,t,n,r){e.removeEventListener(t,n,r)}const ni=Symbol("_vei");function Sc(e,t,n,r,s=null){const i=e[ni]||(e[ni]={}),a=i[t];if(r&&a)a.value=r;else{const[o,l]=Rc(t);if(r){const c=i[t]=Cc(r,s);kc(e,o,c,l)}else a&&(xc(e,o,a,l),i[t]=void 0)}}const ri=/(?:Once|Passive|Capture)$/;function Rc(e){let t;if(ri.test(e)){t={};let r;for(;r=e.match(ri);)e=e.slice(0,e.length-r[0].length),t[r[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):Vt(e.slice(2)),t]}let Or=0;const qc=Promise.resolve(),Oc=()=>Or||(qc.then(()=>Or=0),Or=Date.now());function Cc(e,t){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;ot(Ec(r,n.value),t,5,[r])};return n.value=e,n.attached=Oc(),n}function Ec(e,t){if(V(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(r=>s=>!s._stopped&&r&&r(s))}else return t}const si=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,Ac=(e,t,n,r,s,i)=>{const a=s==="svg";t==="class"?mc(e,r,a):t==="style"?yc(e,n,r):sr(t)?ir(t)||Sc(e,t,n,r,i):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):Dc(e,t,r,a))?(ti(e,t,r),!e.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&ei(e,t,r,a,i,t!=="value")):e._isVueCE&&(Tc(e,t)||e._def.__asyncLoader&&(/[A-Z]/.test(t)||!ce(r)))?ti(e,Re(t),r,i,t):(t==="true-value"?e._trueValue=r:t==="false-value"&&(e._falseValue=r),ei(e,t,r,a))};function Dc(e,t,n,r){if(r)return!!(t==="innerHTML"||t==="textContent"||t in e&&si(t)&&H(n));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="sandbox"&&e.tagName==="IFRAME"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const s=e.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return si(t)&&ce(n)?!1:t in e}function Tc(e,t){const n=e._def.props;if(!n)return!1;const r=Re(t);return Array.isArray(n)?n.some(s=>Re(s)===r):Object.keys(n).some(s=>Re(s)===r)}const Bc=["ctrl","shift","alt","meta"],Pc={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&e.button!==0,middle:e=>"button"in e&&e.button!==1,right:e=>"button"in e&&e.button!==2,exact:(e,t)=>Bc.some(n=>e[`${n}Key`]&&!t.includes(n))},$l=(e,t)=>{if(!e)return e;const n=e._withMods||(e._withMods={}),r=t.join(".");return n[r]||(n[r]=((s,...i)=>{for(let a=0;a<t.length;a++){const o=Pc[t[a]];if(o&&o(s,t))return}return e(s,...i)}))},Mc=me({patchProp:Ac},dc);let ii;function zc(){return ii||(ii=jo(Mc))}const Ic=((...e)=>{const t=zc().createApp(...e),{mount:n}=t;return t.mount=r=>{const s=Lc(r);if(!s)return;const i=t._component;!H(i)&&!i.render&&!i.template&&(i.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const a=n(s,!1,$c(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),a},t});function $c(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function Lc(e){return ce(e)?document.querySelector(e):e}const Nc=(e,t)=>{const n=e.__vccOpts||e;for(const[r,s]of t)n[r]=s;return n},Vc={class:"topbar"},Hc={class:"topbar-inner"},jc=["src"],Uc={class:"lang-toggle"},Fc="https://github.com/rbatis/rbatis",Gc={__name:"TopNav",setup(e){const t=Ie("lang"),n=Ie("setLang"),r=Ot(!1),s=new URL(""+new URL("logo-cMOgi8zC.png",import.meta.url).href,import.meta.url).href;function i(){r.value=!1}return(a,o)=>{const l=dl("router-link");return He(),lt("nav",Vc,[m("div",Hc,[ue(l,{class:"topbar-brand",to:"/"},{default:Vn(()=>[m("img",{src:Pe(s),alt:"RBatis"},null,8,jc),o[3]||(o[3]=m("span",null,"RBatis",-1))]),_:1}),m("button",{class:"topbar-toggle",id:"navToggle","aria-label":"Toggle menu",onClick:o[0]||(o[0]=c=>r.value=!r.value)},[...o[4]||(o[4]=[m("span",null,null,-1),m("span",null,null,-1),m("span",null,null,-1)])]),m("div",{class:it(["topbar-links",{open:r.value}]),id:"navLinks"},[ue(l,{to:"/",class:"nav-link",onClick:i},{default:Vn(()=>[Lt(L(a.$t("nav-home")),1)]),_:1}),ue(l,{to:"/v4",class:"nav-link",onClick:i},{default:Vn(()=>[Lt(L(a.$t("nav-v4-docs")),1)]),_:1}),m("div",Uc,[m("button",{class:it(["lang-btn",{active:Pe(t)==="en"}]),onClick:o[1]||(o[1]=c=>Pe(n)("en"))},"EN",2),m("button",{class:it(["lang-btn",{active:Pe(t)==="zh"}]),onClick:o[2]||(o[2]=c=>Pe(n)("zh"))},"中文",2)]),m("a",{href:Fc,class:"nav-link github-link",target:"_blank",rel:"noopener","aria-label":"GitHub"},[...o[5]||(o[5]=[m("svg",{viewBox:"0 0 16 16","aria-hidden":"true"},[m("path",{"fill-rule":"evenodd",d:"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"})],-1)])])],2)])])}}},Wc=Nc(Gc,[["__scopeId","data-v-efc0b774"]]),Qc={class:"site-footer"},Kc="https://github.com/rbatis/rbatis",Zc={__name:"SiteFooter",setup(e){return(t,n)=>(He(),lt("footer",Qc,[m("p",null,[m("span",null,L(t.$t("footer-contrib")),1),n[0]||(n[0]=Lt(" — ",-1)),m("a",{href:Kc,target:"_blank",rel:"noopener"},L(t.$t("footer-github")),1)])]))}},Xc={__name:"App",setup(e){const t=Ot(!1);function n(){t.value=window.scrollY>400}function r(){window.scrollTo({top:0,behavior:"smooth"})}return Bn(()=>window.addEventListener("scroll",n)),sn(()=>window.removeEventListener("scroll",n)),(s,i)=>{const a=dl("router-view");return He(),lt(Be,null,[ue(Wc),ue(a),ue(Zc),m("button",{class:it(["back-to-top",{visible:t.value}]),id:"backToTop","aria-label":"Back to top",onClick:r},"↑",2)],64)}}};/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const Kt=typeof document<"u";function Ll(e){return typeof e=="object"||"displayName"in e||"props"in e||"__vccOpts"in e}function Jc(e){return e.__esModule||e[Symbol.toStringTag]==="Module"||e.default&&Ll(e.default)}const Q=Object.assign;function Cr(e,t){const n={};for(const r in t){const s=t[r];n[r]=Ue(s)?s.map(e):e(s)}return n}const Sn=()=>{},Ue=Array.isArray;function li(e,t){const n={};for(const r in e)n[r]=r in t?t[r]:e[r];return n}const Nl=/#/g,Yc=/&/g,eu=/\//g,tu=/=/g,nu=/\?/g,Vl=/\+/g,ru=/%5B/g,su=/%5D/g,Hl=/%5E/g,iu=/%60/g,jl=/%7B/g,lu=/%7C/g,Ul=/%7D/g,au=/%20/g;function hs(e){return e==null?"":encodeURI(""+e).replace(lu,"|").replace(ru,"[").replace(su,"]")}function ou(e){return hs(e).replace(jl,"{").replace(Ul,"}").replace(Hl,"^")}function Hr(e){return hs(e).replace(Vl,"%2B").replace(au,"+").replace(Nl,"%23").replace(Yc,"%26").replace(iu,"`").replace(jl,"{").replace(Ul,"}").replace(Hl,"^")}function cu(e){return Hr(e).replace(tu,"%3D")}function uu(e){return hs(e).replace(Nl,"%23").replace(nu,"%3F")}function pu(e){return uu(e).replace(eu,"%2F")}function An(e){if(e==null)return null;try{return decodeURIComponent(""+e)}catch{}return""+e}const fu=/\/$/,du=e=>e.replace(fu,"");function Er(e,t,n="/"){let r,s={},i="",a="";const o=t.indexOf("#");let l=t.indexOf("?");return l=o>=0&&l>o?-1:l,l>=0&&(r=t.slice(0,l),i=t.slice(l,o>0?o:t.length),s=e(i.slice(1))),o>=0&&(r=r||t.slice(0,o),a=t.slice(o,t.length)),r=bu(r??t,n),{fullPath:r+i+a,path:r,query:s,hash:An(a)}}function hu(e,t){const n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}function ai(e,t){return!t||!e.toLowerCase().startsWith(t.toLowerCase())?e:e.slice(t.length)||"/"}function mu(e,t,n){const r=t.matched.length-1,s=n.matched.length-1;return r>-1&&r===s&&nn(t.matched[r],n.matched[s])&&Fl(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}function nn(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function Fl(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(var n in e)if(!gu(e[n],t[n]))return!1;return!0}function gu(e,t){return Ue(e)?oi(e,t):Ue(t)?oi(t,e):(e==null?void 0:e.valueOf())===(t==null?void 0:t.valueOf())}function oi(e,t){return Ue(t)?e.length===t.length&&e.every((n,r)=>n===t[r]):e.length===1&&e[0]===t}function bu(e,t){if(e.startsWith("/"))return e;if(!e)return t;const n=t.split("/"),r=e.split("/"),s=r[r.length-1];(s===".."||s===".")&&r.push("");let i=n.length-1,a,o;for(a=0;a<r.length;a++)if(o=r[a],o!==".")if(o==="..")i>1&&i--;else break;return n.slice(0,i).join("/")+"/"+r.slice(a).join("/")}const kt={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};let jr=(function(e){return e.pop="pop",e.push="push",e})({}),Ar=(function(e){return e.back="back",e.forward="forward",e.unknown="",e})({});function _u(e){if(!e)if(Kt){const t=document.querySelector("base");e=t&&t.getAttribute("href")||"/",e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return e[0]!=="/"&&e[0]!=="#"&&(e="/"+e),du(e)}const yu=/^[^#]+#/;function vu(e,t){return e.replace(yu,"#")+t}function wu(e,t){const n=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return{behavior:t.behavior,left:r.left-n.left-(t.left||0),top:r.top-n.top-(t.top||0)}}const mr=()=>({left:window.scrollX,top:window.scrollY});function ku(e){let t;if("el"in e){const n=e.el,r=typeof n=="string"&&n.startsWith("#"),s=typeof n=="string"?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!s)return;t=wu(s,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(t.left!=null?t.left:window.scrollX,t.top!=null?t.top:window.scrollY)}function ci(e,t){return(history.state?history.state.position-t:-1)+e}const Ur=new Map;function xu(e,t){Ur.set(e,t)}function Su(e){const t=Ur.get(e);return Ur.delete(e),t}function Ru(e){return typeof e=="string"||e&&typeof e=="object"}function Gl(e){return typeof e=="string"||typeof e=="symbol"}let oe=(function(e){return e[e.MATCHER_NOT_FOUND=1]="MATCHER_NOT_FOUND",e[e.NAVIGATION_GUARD_REDIRECT=2]="NAVIGATION_GUARD_REDIRECT",e[e.NAVIGATION_ABORTED=4]="NAVIGATION_ABORTED",e[e.NAVIGATION_CANCELLED=8]="NAVIGATION_CANCELLED",e[e.NAVIGATION_DUPLICATED=16]="NAVIGATION_DUPLICATED",e})({});const Wl=Symbol("");oe.MATCHER_NOT_FOUND+"",oe.NAVIGATION_GUARD_REDIRECT+"",oe.NAVIGATION_ABORTED+"",oe.NAVIGATION_CANCELLED+"",oe.NAVIGATION_DUPLICATED+"";function rn(e,t){return Q(new Error,{type:e,[Wl]:!0},t)}function pt(e,t){return e instanceof Error&&Wl in e&&(t==null||!!(e.type&t))}const qu=["params","query","hash"];function Ou(e){if(typeof e=="string")return e;if(e.path!=null)return e.path;const t={};for(const n of qu)n in e&&(t[n]=e[n]);return JSON.stringify(t,null,2)}function Cu(e){const t={};if(e===""||e==="?")return t;const n=(e[0]==="?"?e.slice(1):e).split("&");for(let r=0;r<n.length;++r){const s=n[r].replace(Vl," "),i=s.indexOf("="),a=An(i<0?s:s.slice(0,i)),o=i<0?null:An(s.slice(i+1));if(a in t){let l=t[a];Ue(l)||(l=t[a]=[l]),l.push(o)}else t[a]=o}return t}function ui(e){let t="";for(let n in e){const r=e[n];if(n=cu(n),r==null){r!==void 0&&(t+=(t.length?"&":"")+n);continue}(Ue(r)?r.map(s=>s&&Hr(s)):[r&&Hr(r)]).forEach(s=>{s!==void 0&&(t+=(t.length?"&":"")+n,s!=null&&(t+="="+s))})}return t}function Eu(e){const t={};for(const n in e){const r=e[n];r!==void 0&&(t[n]=Ue(r)?r.map(s=>s==null?null:""+s):r==null?r:""+r)}return t}const Au=Symbol(""),pi=Symbol(""),ms=Symbol(""),Ql=Symbol(""),Fr=Symbol("");function pn(){let e=[];function t(r){return e.push(r),()=>{const s=e.indexOf(r);s>-1&&e.splice(s,1)}}function n(){e=[]}return{add:t,list:()=>e.slice(),reset:n}}function Rt(e,t,n,r,s,i=a=>a()){const a=r&&(r.enterCallbacks[s]=r.enterCallbacks[s]||[]);return()=>new Promise((o,l)=>{const c=h=>{h===!1?l(rn(oe.NAVIGATION_ABORTED,{from:n,to:t})):h instanceof Error?l(h):Ru(h)?l(rn(oe.NAVIGATION_GUARD_REDIRECT,{from:t,to:h})):(a&&r.enterCallbacks[s]===a&&typeof h=="function"&&a.push(h),o())},u=i(()=>e.call(r&&r.instances[s],t,n,c));let p=Promise.resolve(u);e.length<3&&(p=p.then(c)),p.catch(h=>l(h))})}function Dr(e,t,n,r,s=i=>i()){const i=[];for(const a of e)for(const o in a.components){let l=a.components[o];if(!(t!=="beforeRouteEnter"&&!a.instances[o]))if(Ll(l)){const c=(l.__vccOpts||l)[t];c&&i.push(Rt(c,n,r,a,o,s))}else{let c=l();i.push(()=>c.then(u=>{if(!u)throw new Error(`Couldn't resolve component "${o}" at "${a.path}"`);const p=Jc(u)?u.default:u;a.mods[o]=u,a.components[o]=p;const h=(p.__vccOpts||p)[t];return h&&Rt(h,n,r,a,o,s)()}))}}return i}function Du(e,t){const n=[],r=[],s=[],i=Math.max(t.matched.length,e.matched.length);for(let a=0;a<i;a++){const o=t.matched[a];o&&(e.matched.find(c=>nn(c,o))?r.push(o):n.push(o));const l=e.matched[a];l&&(t.matched.find(c=>nn(c,l))||s.push(l))}return[n,r,s]}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let Tu=()=>location.protocol+"//"+location.host;function Kl(e,t){const{pathname:n,search:r,hash:s}=t,i=e.indexOf("#");if(i>-1){let a=s.includes(e.slice(i))?e.slice(i).length:1,o=s.slice(a);return o[0]!=="/"&&(o="/"+o),ai(o,"")}return ai(n,e)+r+s}function Bu(e,t,n,r){let s=[],i=[],a=null;const o=({state:h})=>{const g=Kl(e,location),_=n.value,S=t.value;let E=0;if(h){if(n.value=g,t.value=h,a&&a===_){a=null;return}E=S?h.position-S.position:0}else r(g);s.forEach(I=>{I(n.value,_,{delta:E,type:jr.pop,direction:E?E>0?Ar.forward:Ar.back:Ar.unknown})})};function l(){a=n.value}function c(h){s.push(h);const g=()=>{const _=s.indexOf(h);_>-1&&s.splice(_,1)};return i.push(g),g}function u(){if(document.visibilityState==="hidden"){const{history:h}=window;if(!h.state)return;h.replaceState(Q({},h.state,{scroll:mr()}),"")}}function p(){for(const h of i)h();i=[],window.removeEventListener("popstate",o),window.removeEventListener("pagehide",u),document.removeEventListener("visibilitychange",u)}return window.addEventListener("popstate",o),window.addEventListener("pagehide",u),document.addEventListener("visibilitychange",u),{pauseListeners:l,listen:c,destroy:p}}function fi(e,t,n,r=!1,s=!1){return{back:e,current:t,forward:n,replaced:r,position:window.history.length,scroll:s?mr():null}}function Pu(e){const{history:t,location:n}=window,r={value:Kl(e,n)},s={value:t.state};s.value||i(r.value,{back:null,current:r.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0);function i(l,c,u){const p=e.indexOf("#"),h=p>-1?(n.host&&document.querySelector("base")?e:e.slice(p))+l:Tu()+e+l;try{t[u?"replaceState":"pushState"](c,"",h),s.value=c}catch(g){console.error(g),n[u?"replace":"assign"](h)}}function a(l,c){i(l,Q({},t.state,fi(s.value.back,l,s.value.forward,!0),c,{position:s.value.position}),!0),r.value=l}function o(l,c){const u=Q({},s.value,t.state,{forward:l,scroll:mr()});i(u.current,u,!0),i(l,Q({},fi(r.value,l,null),{position:u.position+1},c),!1),r.value=l}return{location:r,state:s,push:o,replace:a}}function Mu(e){e=_u(e);const t=Pu(e),n=Bu(e,t.state,t.location,t.replace);function r(i,a=!0){a||n.pauseListeners(),history.go(i)}const s=Q({location:"",base:e,go:r,createHref:vu.bind(null,e)},t,n);return Object.defineProperty(s,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(s,"state",{enumerable:!0,get:()=>t.state.value}),s}function zu(e){return e=location.host?e||location.pathname+location.search:"",e.includes("#")||(e+="#"),Mu(e)}let Mt=(function(e){return e[e.Static=0]="Static",e[e.Param=1]="Param",e[e.Group=2]="Group",e})({});var fe=(function(e){return e[e.Static=0]="Static",e[e.Param=1]="Param",e[e.ParamRegExp=2]="ParamRegExp",e[e.ParamRegExpEnd=3]="ParamRegExpEnd",e[e.EscapeNext=4]="EscapeNext",e})(fe||{});const Iu={type:Mt.Static,value:""},$u=/[a-zA-Z0-9_]/;function Lu(e){if(!e)return[[]];if(e==="/")return[[Iu]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(g){throw new Error(`ERR (${n})/"${c}": ${g}`)}let n=fe.Static,r=n;const s=[];let i;function a(){i&&s.push(i),i=[]}let o=0,l,c="",u="";function p(){c&&(n===fe.Static?i.push({type:Mt.Static,value:c}):n===fe.Param||n===fe.ParamRegExp||n===fe.ParamRegExpEnd?(i.length>1&&(l==="*"||l==="+")&&t(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`),i.push({type:Mt.Param,value:c,regexp:u,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):t("Invalid state to consume buffer"),c="")}function h(){c+=l}for(;o<e.length;){if(l=e[o++],l==="\\"&&n!==fe.ParamRegExp){r=n,n=fe.EscapeNext;continue}switch(n){case fe.Static:l==="/"?(c&&p(),a()):l===":"?(p(),n=fe.Param):h();break;case fe.EscapeNext:h(),n=r;break;case fe.Param:l==="("?n=fe.ParamRegExp:$u.test(l)?h():(p(),n=fe.Static,l!=="*"&&l!=="?"&&l!=="+"&&o--);break;case fe.ParamRegExp:l===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+l:n=fe.ParamRegExpEnd:u+=l;break;case fe.ParamRegExpEnd:p(),n=fe.Static,l!=="*"&&l!=="?"&&l!=="+"&&o--,u="";break;default:t("Unknown state");break}}return n===fe.ParamRegExp&&t(`Unfinished custom RegExp for param "${c}"`),p(),a(),s}const di="[^/]+?",Nu={sensitive:!1,strict:!1,start:!0,end:!0};var xe=(function(e){return e[e._multiplier=10]="_multiplier",e[e.Root=90]="Root",e[e.Segment=40]="Segment",e[e.SubSegment=30]="SubSegment",e[e.Static=40]="Static",e[e.Dynamic=20]="Dynamic",e[e.BonusCustomRegExp=10]="BonusCustomRegExp",e[e.BonusWildcard=-50]="BonusWildcard",e[e.BonusRepeatable=-20]="BonusRepeatable",e[e.BonusOptional=-8]="BonusOptional",e[e.BonusStrict=.7000000000000001]="BonusStrict",e[e.BonusCaseSensitive=.25]="BonusCaseSensitive",e})(xe||{});const Vu=/[.+*?^${}()[\]/\\]/g;function Hu(e,t){const n=Q({},Nu,t),r=[];let s=n.start?"^":"";const i=[];for(const c of e){const u=c.length?[]:[xe.Root];n.strict&&!c.length&&(s+="/");for(let p=0;p<c.length;p++){const h=c[p];let g=xe.Segment+(n.sensitive?xe.BonusCaseSensitive:0);if(h.type===Mt.Static)p||(s+="/"),s+=h.value.replace(Vu,"\\$&"),g+=xe.Static;else if(h.type===Mt.Param){const{value:_,repeatable:S,optional:E,regexp:I}=h;i.push({name:_,repeatable:S,optional:E});const O=I||di;if(O!==di){g+=xe.BonusCustomRegExp;try{`${O}`}catch(B){throw new Error(`Invalid custom RegExp for param "${_}" (${O}): `+B.message)}}let P=S?`((?:${O})(?:/(?:${O}))*)`:`(${O})`;p||(P=E&&c.length<2?`(?:/${P})`:"/"+P),E&&(P+="?"),s+=P,g+=xe.Dynamic,E&&(g+=xe.BonusOptional),S&&(g+=xe.BonusRepeatable),O===".*"&&(g+=xe.BonusWildcard)}u.push(g)}r.push(u)}if(n.strict&&n.end){const c=r.length-1;r[c][r[c].length-1]+=xe.BonusStrict}n.strict||(s+="/?"),n.end?s+="$":n.strict&&!s.endsWith("/")&&(s+="(?:/|$)");const a=new RegExp(s,n.sensitive?"":"i");function o(c){const u=c.match(a),p={};if(!u)return null;for(let h=1;h<u.length;h++){const g=u[h]||"",_=i[h-1];p[_.name]=g&&_.repeatable?g.split("/"):g}return p}function l(c){let u="",p=!1;for(const h of e){(!p||!u.endsWith("/"))&&(u+="/"),p=!1;for(const g of h)if(g.type===Mt.Static)u+=g.value;else if(g.type===Mt.Param){const{value:_,repeatable:S,optional:E}=g,I=_ in c?c[_]:"";if(Ue(I)&&!S)throw new Error(`Provided param "${_}" is an array but it is not repeatable (* or + modifiers)`);const O=Ue(I)?I.join("/"):I;if(!O)if(E)h.length<2&&(u.endsWith("/")?u=u.slice(0,-1):p=!0);else throw new Error(`Missing required param "${_}"`);u+=O}}return u||"/"}return{re:a,score:r,keys:i,parse:o,stringify:l}}function ju(e,t){let n=0;for(;n<e.length&&n<t.length;){const r=t[n]-e[n];if(r)return r;n++}return e.length<t.length?e.length===1&&e[0]===xe.Static+xe.Segment?-1:1:e.length>t.length?t.length===1&&t[0]===xe.Static+xe.Segment?1:-1:0}function Zl(e,t){let n=0;const r=e.score,s=t.score;for(;n<r.length&&n<s.length;){const i=ju(r[n],s[n]);if(i)return i;n++}if(Math.abs(s.length-r.length)===1){if(hi(r))return 1;if(hi(s))return-1}return s.length-r.length}function hi(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const Uu={strict:!1,end:!0,sensitive:!1};function Fu(e,t,n){const r=Hu(Lu(e.path),n),s=Q(r,{record:e,parent:t,children:[],alias:[]});return t&&!s.record.aliasOf==!t.record.aliasOf&&t.children.push(s),s}function Gu(e,t){const n=[],r=new Map;t=li(Uu,t);function s(p){return r.get(p)}function i(p,h,g){const _=!g,S=gi(p);S.aliasOf=g&&g.record;const E=li(t,p),I=[S];if("alias"in p){const B=typeof p.alias=="string"?[p.alias]:p.alias;for(const G of B)I.push(gi(Q({},S,{components:g?g.record.components:S.components,path:G,aliasOf:g?g.record:S})))}let O,P;for(const B of I){const{path:G}=B;if(h&&G[0]!=="/"){const le=h.record.path,ae=le[le.length-1]==="/"?"":"/";B.path=h.record.path+(G&&ae+G)}if(O=Fu(B,h,E),g?g.alias.push(O):(P=P||O,P!==O&&P.alias.push(O),_&&p.name&&!bi(O)&&a(p.name)),Xl(O)&&l(O),S.children){const le=S.children;for(let ae=0;ae<le.length;ae++)i(le[ae],O,g&&g.children[ae])}g=g||O}return P?()=>{a(P)}:Sn}function a(p){if(Gl(p)){const h=r.get(p);h&&(r.delete(p),n.splice(n.indexOf(h),1),h.children.forEach(a),h.alias.forEach(a))}else{const h=n.indexOf(p);h>-1&&(n.splice(h,1),p.record.name&&r.delete(p.record.name),p.children.forEach(a),p.alias.forEach(a))}}function o(){return n}function l(p){const h=Ku(p,n);n.splice(h,0,p),p.record.name&&!bi(p)&&r.set(p.record.name,p)}function c(p,h){let g,_={},S,E;if("name"in p&&p.name){if(g=r.get(p.name),!g)throw rn(oe.MATCHER_NOT_FOUND,{location:p});E=g.record.name,_=Q(mi(h.params,g.keys.filter(P=>!P.optional).concat(g.parent?g.parent.keys.filter(P=>P.optional):[]).map(P=>P.name)),p.params&&mi(p.params,g.keys.map(P=>P.name))),S=g.stringify(_)}else if(p.path!=null)S=p.path,g=n.find(P=>P.re.test(S)),g&&(_=g.parse(S),E=g.record.name);else{if(g=h.name?r.get(h.name):n.find(P=>P.re.test(h.path)),!g)throw rn(oe.MATCHER_NOT_FOUND,{location:p,currentLocation:h});E=g.record.name,_=Q({},h.params,p.params),S=g.stringify(_)}const I=[];let O=g;for(;O;)I.unshift(O.record),O=O.parent;return{name:E,path:S,params:_,matched:I,meta:Qu(I)}}e.forEach(p=>i(p));function u(){n.length=0,r.clear()}return{addRoute:i,resolve:c,removeRoute:a,clearRoutes:u,getRoutes:o,getRecordMatcher:s}}function mi(e,t){const n={};for(const r of t)r in e&&(n[r]=e[r]);return n}function gi(e){const t={path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:e.aliasOf,beforeEnter:e.beforeEnter,props:Wu(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}};return Object.defineProperty(t,"mods",{value:{}}),t}function Wu(e){const t={},n=e.props||!1;if("component"in e)t.default=n;else for(const r in e.components)t[r]=typeof n=="object"?n[r]:n;return t}function bi(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function Qu(e){return e.reduce((t,n)=>Q(t,n.meta),{})}function Ku(e,t){let n=0,r=t.length;for(;n!==r;){const i=n+r>>1;Zl(e,t[i])<0?r=i:n=i+1}const s=Zu(e);return s&&(r=t.lastIndexOf(s,r-1)),r}function Zu(e){let t=e;for(;t=t.parent;)if(Xl(t)&&Zl(e,t)===0)return t}function Xl({record:e}){return!!(e.name||e.components&&Object.keys(e.components).length||e.redirect)}function _i(e){const t=Ie(ms),n=Ie(Ql),r=Me(()=>{const l=Pe(e.to);return t.resolve(l)}),s=Me(()=>{const{matched:l}=r.value,{length:c}=l,u=l[c-1],p=n.matched;if(!u||!p.length)return-1;const h=p.findIndex(nn.bind(null,u));if(h>-1)return h;const g=yi(l[c-2]);return c>1&&yi(u)===g&&p[p.length-1].path!==g?p.findIndex(nn.bind(null,l[c-2])):h}),i=Me(()=>s.value>-1&&tp(n.params,r.value.params)),a=Me(()=>s.value>-1&&s.value===n.matched.length-1&&Fl(n.params,r.value.params));function o(l={}){if(ep(l)){const c=t[Pe(e.replace)?"replace":"push"](Pe(e.to)).catch(Sn);return e.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>c),c}return Promise.resolve()}return{route:r,href:Me(()=>r.value.href),isActive:i,isExactActive:a,navigate:o}}function Xu(e){return e.length===1?e[0]:e}const Ju=cl({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:_i,setup(e,{slots:t}){const n=ur(_i(e)),{options:r}=Ie(ms),s=Me(()=>({[vi(e.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[vi(e.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const i=t.default&&Xu(t.default(n));return e.custom?i:zl("a",{"aria-current":n.isExactActive?e.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:s.value},i)}}}),Yu=Ju;function ep(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&!(e.button!==void 0&&e.button!==0)){if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return e.preventDefault&&e.preventDefault(),!0}}function tp(e,t){for(const n in t){const r=t[n],s=e[n];if(typeof r=="string"){if(r!==s)return!1}else if(!Ue(s)||s.length!==r.length||r.some((i,a)=>i.valueOf()!==s[a].valueOf()))return!1}return!0}function yi(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const vi=(e,t,n)=>e??t??n,np=cl({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:t,slots:n}){const r=Ie(Fr),s=Me(()=>e.route||r.value),i=Ie(pi,0),a=Me(()=>{let c=Pe(i);const{matched:u}=s.value;let p;for(;(p=u[c])&&!p.components;)c++;return c}),o=Me(()=>s.value.matched[a.value]);Hn(pi,Me(()=>a.value+1)),Hn(Au,o),Hn(Fr,s);const l=Ot();return yn(()=>[l.value,o.value,e.name],([c,u,p],[h,g,_])=>{u&&(u.instances[p]=c,g&&g!==u&&c&&c===h&&(u.leaveGuards.size||(u.leaveGuards=g.leaveGuards),u.updateGuards.size||(u.updateGuards=g.updateGuards))),c&&u&&(!g||!nn(u,g)||!h)&&(u.enterCallbacks[p]||[]).forEach(S=>S(c))},{flush:"post"}),()=>{const c=s.value,u=e.name,p=o.value,h=p&&p.components[u];if(!h)return wi(n.default,{Component:h,route:c});const g=p.props[u],_=g?g===!0?c.params:typeof g=="function"?g(c):g:null,E=zl(h,Q({},_,t,{onVnodeUnmounted:I=>{I.component.isUnmounted&&(p.instances[u]=null)},ref:l}));return wi(n.default,{Component:E,route:c})||E}}});function wi(e,t){if(!e)return null;const n=e(t);return n.length===1?n[0]:n}const rp=np;function sp(e){const t=Gu(e.routes,e),n=e.parseQuery||Cu,r=e.stringifyQuery||ui,s=e.history,i=pn(),a=pn(),o=pn(),l=Fa(kt);let c=kt;Kt&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=Cr.bind(null,w=>""+w),p=Cr.bind(null,pu),h=Cr.bind(null,An);function g(w,T){let A,M;return Gl(w)?(A=t.getRecordMatcher(w),M=T):M=w,t.addRoute(M,A)}function _(w){const T=t.getRecordMatcher(w);T&&t.removeRoute(T)}function S(){return t.getRoutes().map(w=>w.record)}function E(w){return!!t.getRecordMatcher(w)}function I(w,T){if(T=Q({},T||l.value),typeof w=="string"){const b=Er(n,w,T.path),y=t.resolve({path:b.path},T),k=s.createHref(b.fullPath);return Q(b,y,{params:h(y.params),hash:An(b.hash),redirectedFrom:void 0,href:k})}let A;if(w.path!=null)A=Q({},w,{path:Er(n,w.path,T.path).path});else{const b=Q({},w.params);for(const y in b)b[y]==null&&delete b[y];A=Q({},w,{params:p(b)}),T.params=p(T.params)}const M=t.resolve(A,T),j=w.hash||"";M.params=u(h(M.params));const f=hu(r,Q({},w,{hash:ou(j),path:M.path})),d=s.createHref(f);return Q({fullPath:f,hash:j,query:r===ui?Eu(w.query):w.query||{}},M,{redirectedFrom:void 0,href:d})}function O(w){return typeof w=="string"?Er(n,w,l.value.path):Q({},w)}function P(w,T){if(c!==w)return rn(oe.NAVIGATION_CANCELLED,{from:T,to:w})}function B(w){return ae(w)}function G(w){return B(Q(O(w),{replace:!0}))}function le(w,T){const A=w.matched[w.matched.length-1];if(A&&A.redirect){const{redirect:M}=A;let j=typeof M=="function"?M(w,T):M;return typeof j=="string"&&(j=j.includes("?")||j.includes("#")?j=O(j):{path:j},j.params={}),Q({query:w.query,hash:w.hash,params:j.path!=null?{}:w.params},j)}}function ae(w,T){const A=c=I(w),M=l.value,j=w.state,f=w.force,d=w.replace===!0,b=le(A,M);if(b)return ae(Q(O(b),{state:typeof b=="object"?Q({},j,b.state):j,force:f,replace:d}),T||A);const y=A;y.redirectedFrom=T;let k;return!f&&mu(r,M,A)&&(k=rn(oe.NAVIGATION_DUPLICATED,{to:y,from:M}),Qe(M,M,!0,!1)),(k?Promise.resolve(k):Ge(y,M)).catch(v=>pt(v)?pt(v,oe.NAVIGATION_GUARD_REDIRECT)?v:wt(v):W(v,y,M)).then(v=>{if(v){if(pt(v,oe.NAVIGATION_GUARD_REDIRECT))return ae(Q({replace:d},O(v.to),{state:typeof v.to=="object"?Q({},j,v.to.state):j,force:f}),T||y)}else v=Et(y,M,!0,d,j);return vt(y,M,v),v})}function Fe(w,T){const A=P(w,T);return A?Promise.reject(A):Promise.resolve()}function yt(w){const T=Ft.values().next().value;return T&&typeof T.runWithContext=="function"?T.runWithContext(w):w()}function Ge(w,T){let A;const[M,j,f]=Du(w,T);A=Dr(M.reverse(),"beforeRouteLeave",w,T);for(const b of M)b.leaveGuards.forEach(y=>{A.push(Rt(y,w,T))});const d=Fe.bind(null,w,T);return A.push(d),De(A).then(()=>{A=[];for(const b of i.list())A.push(Rt(b,w,T));return A.push(d),De(A)}).then(()=>{A=Dr(j,"beforeRouteUpdate",w,T);for(const b of j)b.updateGuards.forEach(y=>{A.push(Rt(y,w,T))});return A.push(d),De(A)}).then(()=>{A=[];for(const b of f)if(b.beforeEnter)if(Ue(b.beforeEnter))for(const y of b.beforeEnter)A.push(Rt(y,w,T));else A.push(Rt(b.beforeEnter,w,T));return A.push(d),De(A)}).then(()=>(w.matched.forEach(b=>b.enterCallbacks={}),A=Dr(f,"beforeRouteEnter",w,T,yt),A.push(d),De(A))).then(()=>{A=[];for(const b of a.list())A.push(Rt(b,w,T));return A.push(d),De(A)}).catch(b=>pt(b,oe.NAVIGATION_CANCELLED)?b:Promise.reject(b))}function vt(w,T,A){o.list().forEach(M=>yt(()=>M(w,T,A)))}function Et(w,T,A,M,j){const f=P(w,T);if(f)return f;const d=T===kt,b=Kt?history.state:{};A&&(M||d?s.replace(w.fullPath,Q({scroll:d&&b&&b.scroll},j)):s.push(w.fullPath,j)),l.value=w,Qe(w,T,A,d),wt()}let We;function an(){We||(We=s.listen((w,T,A)=>{if(!At.listening)return;const M=I(w),j=le(M,At.currentRoute.value);if(j){ae(Q(j,{replace:!0,force:!0}),M).catch(Sn);return}c=M;const f=l.value;Kt&&xu(ci(f.fullPath,A.delta),mr()),Ge(M,f).catch(d=>pt(d,oe.NAVIGATION_ABORTED|oe.NAVIGATION_CANCELLED)?d:pt(d,oe.NAVIGATION_GUARD_REDIRECT)?(ae(Q(O(d.to),{force:!0}),M).then(b=>{pt(b,oe.NAVIGATION_ABORTED|oe.NAVIGATION_DUPLICATED)&&!A.delta&&A.type===jr.pop&&s.go(-1,!1)}).catch(Sn),Promise.reject()):(A.delta&&s.go(-A.delta,!1),W(d,M,f))).then(d=>{d=d||Et(M,f,!1),d&&(A.delta&&!pt(d,oe.NAVIGATION_CANCELLED)?s.go(-A.delta,!1):A.type===jr.pop&&pt(d,oe.NAVIGATION_ABORTED|oe.NAVIGATION_DUPLICATED)&&s.go(-1,!1)),vt(M,f,d)}).catch(Sn)}))}let jt=pn(),de=pn(),Y;function W(w,T,A){wt(w);const M=de.list();return M.length?M.forEach(j=>j(w,T,A)):console.error(w),Promise.reject(w)}function ct(){return Y&&l.value!==kt?Promise.resolve():new Promise((w,T)=>{jt.add([w,T])})}function wt(w){return Y||(Y=!w,an(),jt.list().forEach(([T,A])=>w?A(w):T()),jt.reset()),w}function Qe(w,T,A,M){const{scrollBehavior:j}=e;if(!Kt||!j)return Promise.resolve();const f=!A&&Su(ci(w.fullPath,0))||(M||!A)&&history.state&&history.state.scroll||null;return as().then(()=>j(w,T,f)).then(d=>d&&ku(d)).catch(d=>W(d,w,T))}const qe=w=>s.go(w);let Ut;const Ft=new Set,At={currentRoute:l,listening:!0,addRoute:g,removeRoute:_,clearRoutes:t.clearRoutes,hasRoute:E,getRoutes:S,resolve:I,options:e,push:B,replace:G,go:qe,back:()=>qe(-1),forward:()=>qe(1),beforeEach:i.add,beforeResolve:a.add,afterEach:o.add,onError:de.add,isReady:ct,install(w){w.component("RouterLink",Yu),w.component("RouterView",rp),w.config.globalProperties.$router=At,Object.defineProperty(w.config.globalProperties,"$route",{enumerable:!0,get:()=>Pe(l)}),Kt&&!Ut&&l.value===kt&&(Ut=!0,B(s.location).catch(M=>{}));const T={};for(const M in kt)Object.defineProperty(T,M,{get:()=>l.value[M],enumerable:!0});w.provide(ms,At),w.provide(Ql,Yi(T)),w.provide(Fr,l);const A=w.unmount;Ft.add(w),w.unmount=function(){Ft.delete(w),Ft.size<1&&(c=kt,We&&We(),We=null,l.value=kt,Ut=!1,Y=!1),A()}}};function De(w){return w.reduce((T,A)=>T.then(()=>yt(A)),Promise.resolve())}return At}const ki=["66, 185, 131","46, 204, 113","52, 152, 219","41, 128, 185","26, 188, 156","59, 130, 246","14, 165, 233","16, 185, 129","20, 184, 166","34, 211, 238"],Te={count:80,maxDistance:200,lineWidth:1,lineOpacity:.2,speed:.3,radius:2.5,radiusRand:1.5,mouseRadius:150};let ie,ke,zt,Fn,Ee,gs;function ip(e){ie=document.getElementById(e),ie&&(ke=ie.getContext("2d"),Ee={x:null,y:null,active:!1},zt=[],gs=!0,Jl(),ap(),lp(),Yl())}function Jl(){ie.width=ie.parentElement.offsetWidth,ie.height=ie.parentElement.offsetHeight}function lp(){window.addEventListener("resize",Jl),ie.addEventListener("mousemove",e=>{const t=ie.getBoundingClientRect();Ee.x=e.clientX-t.left,Ee.y=e.clientY-t.top,Ee.active=!0}),ie.addEventListener("mouseleave",()=>{Ee.active=!1}),ie.addEventListener("touchmove",e=>{const t=ie.getBoundingClientRect(),n=e.touches[0];Ee.x=n.clientX-t.left,Ee.y=n.clientY-t.top,Ee.active=!0},{passive:!0}),ie.addEventListener("touchend",()=>{Ee.active=!1})}function ap(){for(let e=0;e<Te.count;e++)zt.push({x:Math.random()*ie.width,y:Math.random()*ie.height,vx:(Math.random()-.5)*Te.speed,vy:(Math.random()-.5)*Te.speed,r:Te.radius+Math.random()*Te.radiusRand,color:ki[Math.floor(Math.random()*ki.length)]})}function Yl(){gs&&(Fn=requestAnimationFrame(Yl),op())}function op(){ke.clearRect(0,0,ie.width,ie.height);for(let e=0;e<zt.length;e++){const t=zt[e];if(t.x+=t.vx,t.y+=t.vy,t.x<0&&(t.x=ie.width),t.x>ie.width&&(t.x=0),t.y<0&&(t.y=ie.height),t.y>ie.height&&(t.y=0),ke.beginPath(),ke.arc(t.x,t.y,t.r,0,Math.PI*2),ke.fillStyle="rgba("+t.color+", 0.7)",ke.fill(),Ee.active&&Ee.x!==null){const n=t.x-Ee.x,r=t.y-Ee.y,s=Math.sqrt(n*n+r*r);if(s<Te.mouseRadius){const i=(Te.mouseRadius-s)/Te.mouseRadius;t.x+=n/s*i*1.2,t.y+=r/s*i*1.2}}for(let n=e+1;n<zt.length;n++){const r=zt[n],s=t.x-r.x,i=t.y-r.y,a=Math.sqrt(s*s+i*i);if(a<Te.maxDistance){const o=(1-a/Te.maxDistance)*Te.lineOpacity;ke.beginPath(),ke.moveTo(t.x,t.y),ke.lineTo(r.x,r.y),ke.strokeStyle="rgba("+t.color+", "+o+")",ke.lineWidth=Te.lineWidth,ke.stroke()}}}}function cp(){gs=!1,Fn&&(cancelAnimationFrame(Fn),Fn=null),ke&&ke.clearRect(0,0,ie.width,ie.height),zt=[],ie=null,ke=null}const up={id:"particles-canvas"},pp={__name:"ParticleCanvas",setup(e){return Bn(()=>ip("particles-canvas")),sn(()=>cp()),(t,n)=>(He(),lt("canvas",up))}};function fp(){if(typeof window>"u"||!("IntersectionObserver"in window))return;const e=new IntersectionObserver(t=>{t.forEach(n=>{n.isIntersecting&&(n.target.classList.add("revealed"),e.unobserve(n.target))})},{threshold:.08,rootMargin:"0px 0px -40px 0px"});return document.querySelectorAll(".reveal").forEach(t=>e.observe(t)),()=>e.disconnect()}const dp={class:"hero",id:"hero"},hp={class:"hero-content"},mp=["src"],gp={class:"tagline"},bp={class:"hero-cta"},_p={href:"#/v4",class:"btn btn-primary btn-lg"},yp={class:"hero-features"},vp={class:"feature-card reveal reveal-delay-1"},wp={class:"feature-card reveal reveal-delay-2"},kp={class:"feature-card reveal reveal-delay-3"},xp={class:"terminal-window reveal reveal-delay-4"},Sp={class:"terminal-body"},Rp={class:"comment"},qp={class:"comment"},Op={class:"home-section",id:"section-why"},Cp={class:"section-inner"},Ep={class:"section-title reveal"},Ap={class:"section-subtitle reveal reveal-delay-1"},Dp={class:"feature-grid-6"},Tp={class:"feature-card-lg reveal reveal-delay-1"},Bp={class:"feature-card-lg reveal reveal-delay-2"},Pp={class:"feature-card-lg reveal reveal-delay-3"},Mp={class:"feature-card-lg reveal reveal-delay-4"},zp={class:"feature-card-lg reveal reveal-delay-5"},Ip={class:"feature-card-lg reveal reveal-delay-6"},$p={class:"home-section section-alt",id:"section-dsql"},Lp={class:"section-inner"},Np={class:"section-title reveal"},Vp={class:"section-subtitle reveal reveal-delay-1"},Hp={class:"dsql-grid"},jp={class:"dsql-card dsql-card-full reveal reveal-delay-1"},Up={class:"dsql-card reveal reveal-delay-2"},Fp=["innerHTML"],Gp={class:"dsql-card reveal reveal-delay-3"},Wp={class:"home-section section-ai",id:"section-ai"},Qp={class:"section-inner"},Kp={class:"section-title reveal"},Zp={class:"section-subtitle reveal reveal-delay-1"},Xp={class:"ai-grid"},Jp={class:"ai-card reveal reveal-delay-1"},Yp={class:"ai-card-content"},ef={class:"ai-card-header"},tf={class:"terminal-window ai-terminal"},nf={class:"terminal-body"},rf={class:"comment"},sf={class:"ai-card reveal reveal-delay-2"},lf={class:"ai-card-content"},af={class:"ai-card-header"},of={class:"terminal-window ai-terminal"},cf={class:"terminal-body"},uf={class:"comment"},pf={class:"home-section",id:"section-db"},ff={class:"section-inner"},df={class:"section-title reveal"},hf={class:"section-subtitle reveal reveal-delay-1"},mf={class:"db-grid"},gf=["href","onClick"],bf=["src"],_f={class:"home-section section-alt",id:"section-eco"},yf={class:"section-inner"},vf={class:"section-title reveal"},wf={class:"section-subtitle reveal reveal-delay-1"},kf={class:"eco-grid"},xf={href:"https://github.com/rbatis/abs_admin",class:"eco-card reveal reveal-delay-1",target:"_blank",rel:"noopener"},Sf={href:"https://github.com/feihua/salvo-admin",class:"eco-card reveal reveal-delay-2",target:"_blank",rel:"noopener"},Rf={__name:"Home",setup(e){const t=new URL(""+new URL("logo-cMOgi8zC.png",import.meta.url).href,import.meta.url).href,n=new URL(""+new URL("mssql-CrKOllh6.svg",import.meta.url).href,import.meta.url).href,r=new URL("data:image/svg+xml,%3csvg%20fill='%2342b983'%20role='img'%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3ctitle%3eOracle%3c/title%3e%3cpath%20d='M16.412%204.412h-8.82a7.588%207.588%200%200%200-.008%2015.176h8.828a7.588%207.588%200%200%200%200-15.176zm-.193%2012.502H7.786a4.915%204.915%200%200%201%200-9.828h8.433a4.914%204.914%200%201%201%200%209.828z'/%3e%3c/svg%3e",import.meta.url).href,s=new URL("data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3csvg%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%20500%20105'%20xml:space='preserve'%3e%3cstyle%20type='text/css'%3e%20.st0{fill:%2342b983;}%20.st1{fill-rule:evenodd;clip-rule:evenodd;fill:%2342b983;}%20%3c/style%3e%3cg%3e%3cpath%20class='st0'%20d='M153.2,27.1h-16v49h-11.1v-49h-15.9v-9.7h43L153.2,27.1z'/%3e%3cpath%20class='st0'%20d='M180.6,17.4c17.1,0,28.5,4.9,28.5,29.4c0,22.7-11.4,29.4-28.5,29.4h-19V17.4H180.6z%20M180.1,66.5c11.3,0,17.6-4.3,17.6-19.8c0-16.3-6.5-20-17.6-20h-7.4v39.8L180.1,66.5z'/%3e%3cpath%20class='st0'%20d='M259.4,55.3l-30,2c0.2,7.7,4,11.2,13.1,11.2c5.1-0.1,10.2-1.1,14.9-3.1V74c-2.7,1.6-9.3,3-16.8,3c-13.9,0-21.9-5.2-21.9-23.7s8-23.7,21.9-23.7c15.8,0,19.1,9,19.1,19.7C259.8,51.3,259.7,53.3,259.4,55.3z%20M250,48.2c0-5.7-1.2-10.5-9.3-10.5c-8.5,0-11,4.1-11.3,12L250,48.2z'/%3e%3cpath%20class='st0'%20d='M310.8,44.8v31.3h-10.6V47.8c0-6.4-1.4-9.4-7.9-9.4c-5.4,0-9.2,1.5-11.2,7.3v30.5h-10.6V30.4h10.6v5.8c2.6-4.7,8-6.6,14.4-6.6C307.1,29.6,310.8,35.1,310.8,44.8z'/%3e%3cpath%20class='st0'%20d='M364.8,30.4v42.2c0,12.6-6.5,20.4-24.3,20.4c-4.1,0-8.3-0.4-12.4-1.1v-8.5c3.9,0.9,7.8,1.3,11.8,1.3c10.1,0,14.4-3.3,14.4-12.5v-3.2c-2,4.5-5.7,7.2-14.1,7.2c-15,0-18.7-9.4-18.7-23.3c0-12.6,3.7-23.3,18.7-23.3c8.6,0,12.4,3.1,14.1,7.5v-6.7H364.8z%20M354.7,52.8c0-9.2-2-15.1-11.9-15.1c-9.4,0-10.4,7.3-10.4,15.1c0,8.5,1.3,15.3,10.4,15.3C352.7,68.2,354.7,62.6,354.7,52.8z'/%3e%3cpath%20class='st0'%20d='M377.3,17.6c0-5.2,1.3-5.7,6-5.7s6,0.5,6,5.7s-1.3,5.8-6,5.8S377.3,22.7,377.3,17.6z%20M378,30.4h10.6v45.7H378L378,30.4z'/%3e%3cpath%20class='st0'%20d='M442,44.8v31.3h-10.5V47.8c0-6.4-1.4-9.4-7.9-9.4c-5.4,0-9.2,1.5-11.2,7.3v30.5h-10.6V30.4h10.6v5.8c2.6-4.7,8-6.6,14.4-6.6C438.3,29.6,442,35.1,442,44.8z'/%3e%3cpath%20class='st0'%20d='M493.3,55.3l-30,2c0.3,7.7,4,11.2,13.1,11.2c5.1-0.1,10.2-1.1,14.9-3.1V74c-2.7,1.6-9.3,3-16.8,3c-13.9,0-21.9-5.2-21.9-23.7s8-23.7,21.9-23.7c15.8,0,19.1,9,19.1,19.7C493.8,51.3,493.6,53.3,493.3,55.3z%20M483.9,48.2c0-5.7-1.2-10.5-9.3-10.5c-8.5,0-11,4.1-11.3,12L483.9,48.2z'/%3e%3cpath%20class='st1'%20d='M48.8,11.8c3.1,0,5.6,2.5,5.6,5.6c0,3.1-2.5,5.6-5.6,5.6s-5.6-2.5-5.6-5.6c0,0,0,0,0,0C43.3,14.3,45.7,11.8,48.8,11.8z%20M11.8,38.5c3.1,0,5.6,2.5,5.6,5.6c0,3.1-2.5,5.6-5.6,5.6s-5.6-2.5-5.6-5.6C6.3,41,8.8,38.5,11.8,38.5z%20M26.3,82.1c3.1,0,5.6,2.5,5.6,5.6s-2.5,5.6-5.6,5.6c-3.1,0-5.6-2.5-5.6-5.6C20.7,84.6,23.2,82.1,26.3,82.1z%20M71.3,82.1c3.1,0,5.6,2.5,5.6,5.6s-2.5,5.6-5.6,5.6s-5.6-2.5-5.6-5.6C65.7,84.6,68.2,82.1,71.3,82.1z%20M57,44.9H40.6l-5,15.5l13.2,9.6L62,60.5L57,44.9L57,44.9z%20M41.1,43.6L46.8,26c-0.4-0.1-0.9-0.2-1.3-0.4l-5.8,18h-19c0,0.2,0,0.3,0,0.5c0,0.3,0,0.6,0,0.8h18.5l-4.8,14.7l-15-10.9c-0.2,0.4-0.5,0.7-0.8,1.1l12.8,9.3l0,0l2.6,1.9l-0.9,2.5l0,0l-5,15.5c0.4,0.1,0.9,0.2,1.3,0.4l5.7-17.5l12.5,9.1L32.9,81.7c0.3,0.3,0.6,0.7,0.8,1l15.1-11l15.1,11c0.2-0.4,0.5-0.7,0.8-1L49.9,70.9l12.5-9.1l0.6,1.7l0,0l5.2,15.9c0.4-0.2,0.8-0.3,1.3-0.4l-5.8-18l2.6-1.9L79,49.8c-0.3-0.3-0.5-0.7-0.8-1.1l-12.4,9L65.4,58l-2.3,1.6l-4.8-14.7h18.5c0-0.3,0-0.6,0-0.9c0-0.2,0-0.3,0-0.5h-19l-5.8-18c-0.4,0.2-0.8,0.3-1.3,0.4l5.7,17.6L41.1,43.6z%20M18.9,38.6l22.5-16.4c0.2,0.4,0.5,0.7,0.8,1L19.6,39.7C19.4,39.3,19.1,39,18.9,38.6L18.9,38.6z%20M22.9,79.4l-8.7-26.8c0.4-0.1,0.8-0.3,1.2-0.4L24.2,79C23.7,79.1,23.3,79.3,22.9,79.4L22.9,79.4z%20M62.5,88H35.2c0-0.1,0-0.2,0-0.4c0-0.3,0-0.6,0-1h27.3c0,0.3,0,0.6,0,1C62.4,87.8,62.4,87.9,62.5,88L62.5,88z%20M83.5,52.7l-8.7,26.8c-0.4-0.2-0.8-0.3-1.2-0.4l8.7-26.8C82.6,52.4,83,52.6,83.5,52.7z%20M56.3,22.2l22.5,16.4c-0.3,0.3-0.5,0.7-0.7,1.1L55.4,23.3C55.7,22.9,56,22.6,56.3,22.2z%20M85.8,38.5c3.1,0,5.6,2.5,5.6,5.6c0,3.1-2.5,5.6-5.6,5.6s-5.6-2.5-5.6-5.6C80.2,41,82.7,38.5,85.8,38.5z'/%3e%3c/g%3e%3c/svg%3e",import.meta.url).href,i=[{name:"MySQL",url:"https://crates.io/crates/rbdc-mysql",iconUrl:"https://cdn.simpleicons.org/mysql/42b983"},{name:"PostgreSQL",url:"https://crates.io/crates/rbdc-pg",iconUrl:"https://cdn.simpleicons.org/postgresql/42b983"},{name:"SQLite",url:"https://crates.io/crates/rbdc-sqlite",iconUrl:"https://cdn.simpleicons.org/sqlite/42b983"},{name:"MSSQL",url:"https://crates.io/crates/rbdc-mssql",iconUrl:n},{name:"Turso",url:"https://crates.io/crates/rbdc-turso",iconUrl:"https://cdn.simpleicons.org/turso/42b983"},{name:"DuckDB",url:"https://crates.io/crates/rbdc-duckdb",iconUrl:"https://cdn.simpleicons.org/duckdb/42b983"},{name:"MariaDB",url:"https://crates.io/crates/rbdc-mysql",iconUrl:"https://cdn.simpleicons.org/mariadb/42b983"},{name:"TiDB",url:"https://crates.io/crates/rbdc-mysql",iconUrl:"https://cdn.simpleicons.org/tidb/42b983"},{name:"CockroachDB",url:"https://crates.io/crates/rbdc-pg",iconUrl:"https://cdn.simpleicons.org/cockroachlabs/42b983"},{name:"Oracle",url:"https://crates.io/crates/rbdc-oracle",iconUrl:r},{name:"TDengine",url:"https://crates.io/crates/rbdc-tdengine",iconUrl:s}];function a(l){window.open(l,"_blank")}let o=null;return Bn(()=>{o=fp()}),sn(()=>{o&&o()}),(l,c)=>(He(),lt("div",null,[m("section",dp,[ue(pp),m("div",hp,[m("img",{src:Pe(t),alt:"RBatis",class:"hero-logo"},null,8,mp),c[10]||(c[10]=m("h1",null,"RBatis",-1)),m("p",gp,L(l.$t("tagline")),1),m("div",bp,[m("a",_p,L(l.$t("cta-start")),1)]),m("div",yp,[m("div",vp,[c[0]||(c[0]=m("div",{class:"icon"},"⚡",-1)),m("h3",null,L(l.$t("feature-perf-title")),1),m("p",null,L(l.$t("feature-perf-desc")),1)]),m("div",wp,[c[1]||(c[1]=m("div",{class:"icon"},"🛡️",-1)),m("h3",null,L(l.$t("feature-safe-title")),1),m("p",null,L(l.$t("feature-safe-desc")),1)]),m("div",kp,[c[2]||(c[2]=m("div",{class:"icon"},"🔌",-1)),m("h3",null,L(l.$t("feature-driver-title")),1),m("p",null,L(l.$t("feature-driver-desc")),1)])]),m("div",xp,[c[9]||(c[9]=m("div",{class:"terminal-header"},[m("span",{class:"terminal-dot red"}),m("span",{class:"terminal-dot yellow"}),m("span",{class:"terminal-dot green"})],-1)),m("div",Sp,[m("span",Rp,L(l.$t("terminal-cargo")),1),c[3]||(c[3]=m("br",null,null,-1)),c[4]||(c[4]=m("span",{class:"prompt"},"$",-1)),c[5]||(c[5]=Lt(" cargo add rbatis",-1)),c[6]||(c[6]=m("br",null,null,-1)),c[7]||(c[7]=m("br",null,null,-1)),m("span",qp,L(l.$t("terminal-start")),1),c[8]||(c[8]=Wt('<br><span class="prompt">$</span> <span class="keyword">let</span> rb = <span class="keyword">RBatis</span>::<span class="function">new</span>();<br><span class="prompt">$</span> rb.<span class="function">init</span>(<br><span class="prompt">$</span>   <span class="keyword">rbdc_sqlite</span>::<span class="keyword">driver</span>::<span class="function">SqliteDriver</span> {},<br><span class="prompt">$</span>   <span class="string">&quot;sqlite://target/sqlite.db&quot;</span><br><span class="prompt">$</span> )?;<br><span class="prompt">$</span> <span class="keyword">let</span> table: <span class="keyword">Vec</span>&lt;Activity&gt; = rb.<span class="function">exec_decode</span>(<span class="string">&quot;select * from activity limit ?&quot;</span>, vec![<span class="function">value!</span>(<span class="keyword">1</span>)]).<span class="keyword">await</span>?;<br><span class="cursor"></span>',49))])]),c[11]||(c[11]=m("div",{class:"scroll-down"},[m("svg",{viewBox:"0 0 24 24",width:"32",height:"32",fill:"none",stroke:"currentColor","stroke-width":"2"},[m("path",{d:"M7 13l5 5 5-5M7 6l5 5 5-5"})])],-1))]),c[12]||(c[12]=m("div",{class:"scroll-indicator"},[m("span")],-1))]),m("section",Op,[m("div",Cp,[m("h2",Ep,L(l.$t("sec-why-title")),1),m("p",Ap,L(l.$t("sec-why-sub")),1),m("div",Dp,[m("div",Tp,[c[13]||(c[13]=m("div",{class:"icon"},"⚡",-1)),m("h3",null,L(l.$t("sec-why-compile-title")),1),m("p",null,L(l.$t("sec-why-compile-desc")),1)]),m("div",Bp,[c[14]||(c[14]=m("div",{class:"icon"},"🔄",-1)),m("h3",null,L(l.$t("sec-why-mybatis-title")),1),m("p",null,L(l.$t("sec-why-mybatis-desc")),1)]),m("div",Pp,[c[15]||(c[15]=m("div",{class:"icon"},"🛡️",-1)),m("h3",null,L(l.$t("sec-why-safe-title")),1),m("p",null,L(l.$t("sec-why-safe-desc")),1)]),m("div",Mp,[c[16]||(c[16]=m("div",{class:"icon"},"🚀",-1)),m("h3",null,L(l.$t("sec-why-async-title")),1),m("p",null,L(l.$t("sec-why-async-desc")),1)]),m("div",zp,[c[17]||(c[17]=m("div",{class:"icon"},"🔌",-1)),m("h3",null,L(l.$t("sec-why-driver-title")),1),m("p",null,L(l.$t("sec-why-driver-desc")),1)]),m("div",Ip,[c[18]||(c[18]=m("div",{class:"icon"},"🧩",-1)),m("h3",null,L(l.$t("sec-why-plugin-title")),1),m("p",null,L(l.$t("sec-why-plugin-desc")),1)])])])]),m("section",$p,[m("div",Lp,[m("h2",Np,L(l.$t("sec-dsql-title")),1),m("p",Vp,L(l.$t("sec-dsql-sub")),1),m("div",Hp,[m("div",jp,[c[19]||(c[19]=m("div",{class:"dsql-label"},"crud!",-1)),m("p",null,L(l.$t("sec-dsql-crud-desc")),1),c[20]||(c[20]=Wt('<div class="terminal-window dsql-terminal"><div class="terminal-header"><span class="terminal-dot red"></span><span class="terminal-dot yellow"></span><span class="terminal-dot green"></span></div><div class="terminal-body"><span class="prompt"></span><span class="comment">// One macro = full CRUD</span><br><span class="prompt"></span><span class="keyword">rbatis</span>::<span class="function">crud!</span>(<span class="keyword">BizActivity</span> {});<br><br><span class="prompt"></span><span class="comment">// Built-in functions:</span><br><span class="prompt"></span><span class="keyword">let</span> r = <span class="keyword">BizActivity</span>::<span class="function">insert</span>(&amp;rb, &amp;table).<span class="keyword">await</span>?;<br><span class="prompt"></span><span class="keyword">let</span> r = <span class="keyword">BizActivity</span>::<span class="function">insert_batch</span>(&amp;rb, &amp;tables, <span class="keyword">10</span>).<span class="keyword">await</span>?;<br><span class="prompt"></span><span class="keyword">let</span> data = <span class="keyword">BizActivity</span>::<span class="function">select_by_map</span>(&amp;rb, <span class="function">value!</span>{<span class="string">&quot;id&quot;</span>:<span class="string">&quot;1&quot;</span>}).<span class="keyword">await</span>?;<br><span class="prompt"></span><span class="keyword">let</span> r = <span class="keyword">BizActivity</span>::<span class="function">update_by_map</span>(&amp;rb, &amp;table, <span class="function">value!</span>{<span class="string">&quot;id&quot;</span>:&amp;table.id}).<span class="keyword">await</span>?;<br><span class="prompt"></span><span class="keyword">let</span> r = <span class="keyword">BizActivity</span>::<span class="function">delete_by_map</span>(&amp;rb, <span class="function">value!</span>{<span class="string">&quot;id&quot;</span>:<span class="string">&quot;1&quot;</span>}).<span class="keyword">await</span>?; </div></div>',1))]),m("div",Up,[c[21]||(c[21]=m("div",{class:"dsql-label"},"html_sql",-1)),m("p",{innerHTML:l.$t("sec-dsql-html-desc")},null,8,Fp),c[22]||(c[22]=Wt('<div class="terminal-window dsql-terminal"><div class="terminal-header"><span class="terminal-dot red"></span><span class="terminal-dot yellow"></span><span class="terminal-dot green"></span></div><div class="terminal-body"><span class="comment">&lt;select id=&quot;select_by_condition&quot;&gt;</span><br><span class="prompt"></span>`select * from biz_activity`<br><span class="prompt"></span><span class="keyword">&lt;where&gt;</span><br><span class="prompt"></span><span class="keyword">&lt;if</span> test=<span class="string">&quot;name != &#39;&#39;&quot;</span><span class="keyword">&gt;</span><br><span class="prompt"></span>` and name like <span class="string">#{name}</span>`<br><span class="prompt"></span><span class="keyword">&lt;/if&gt;</span><br><span class="prompt"></span><span class="keyword">&lt;/where&gt;</span><br><span class="keyword">&lt;/select&gt;</span></div></div>',1))]),m("div",Gp,[c[23]||(c[23]=m("div",{class:"dsql-label"},"py_sql",-1)),m("p",null,L(l.$t("sec-dsql-py-desc")),1),c[24]||(c[24]=Wt('<div class="terminal-window dsql-terminal"><div class="terminal-header"><span class="terminal-dot red"></span><span class="terminal-dot yellow"></span><span class="terminal-dot green"></span></div><div class="terminal-body"><span class="comment"># py_sql example</span><br><span class="prompt"></span>`select * from user`<br><span class="prompt"></span><span class="keyword">where</span> :<br><span class="prompt"></span><span class="keyword">if</span> name != <span class="string">&#39;&#39;</span>:<br><span class="prompt"></span>` and name=<span class="string">#{name}</span>`<br><span class="prompt"></span><span class="keyword">if</span> delete_flag != <span class="keyword">0</span>:<br><span class="prompt"></span>` and delete_flag = <span class="keyword">0</span>` </div></div>',1))])])])]),m("section",Wp,[m("div",Qp,[c[37]||(c[37]=m("div",{class:"ai-badge reveal"},"AI",-1)),m("h2",Kp,L(l.$t("sec-ai-title")),1),m("p",Zp,L(l.$t("sec-ai-sub")),1),m("div",Xp,[m("div",Jp,[c[30]||(c[30]=m("div",{class:"ai-card-glow"},null,-1)),m("div",Yp,[m("div",ef,[c[26]||(c[26]=m("div",{class:"ai-card-icon"},[m("svg",{viewBox:"0 0 24 24",width:"28",height:"28",fill:"none",stroke:"currentColor","stroke-width":"1.5"},[m("path",{d:"M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"})])],-1)),m("div",null,[m("h3",null,L(l.$t("ai-mcp-title")),1),c[25]||(c[25]=m("span",{class:"ai-tag"},"MCP",-1))])]),m("p",null,L(l.$t("ai-mcp-desc")),1),m("div",tf,[c[28]||(c[28]=m("div",{class:"terminal-header"},[m("span",{class:"terminal-dot red"}),m("span",{class:"terminal-dot yellow"}),m("span",{class:"terminal-dot green"})],-1)),m("div",nf,[m("span",rf,L(l.$t("ai-mcp-terminal-label")),1),c[27]||(c[27]=Wt('<br><span class="prompt"></span>{<br><span class="prompt"></span>  <span class="string">&quot;mcpServers&quot;</span>: {<br><span class="prompt"></span>    <span class="string">&quot;rbdc-mcp&quot;</span>: {<br><span class="prompt"></span>      <span class="string">&quot;command&quot;</span>: <span class="string">&quot;rbdc-mcp&quot;</span>,<br><span class="prompt"></span>      <span class="string">&quot;args&quot;</span>: [<span class="string">&quot;--database-url&quot;</span>, <span class="string">&quot;sqlite://./database.db&quot;</span>]<br><span class="prompt"></span>    }<br><span class="prompt"></span>  }<br><span class="prompt"></span>} ',38))])]),c[29]||(c[29]=m("a",{href:"https://github.com/rbatis/rbdc-mcp",class:"ai-link",target:"_blank",rel:"noopener"},[m("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor"},[m("path",{d:"M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"})]),Lt(" GitHub → ")],-1))])]),m("div",sf,[c[36]||(c[36]=m("div",{class:"ai-card-glow"},null,-1)),m("div",lf,[m("div",af,[c[32]||(c[32]=m("div",{class:"ai-card-icon"},[m("svg",{viewBox:"0 0 24 24",width:"28",height:"28",fill:"none",stroke:"currentColor","stroke-width":"1.5"},[m("path",{d:"M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"})])],-1)),m("div",null,[m("h3",null,L(l.$t("ai-skill-title")),1),c[31]||(c[31]=m("span",{class:"ai-tag"},"Skill",-1))])]),m("p",null,L(l.$t("ai-skill-desc")),1),m("div",of,[c[34]||(c[34]=m("div",{class:"terminal-header"},[m("span",{class:"terminal-dot red"}),m("span",{class:"terminal-dot yellow"}),m("span",{class:"terminal-dot green"})],-1)),m("div",cf,[m("span",uf,L(l.$t("ai-skill-terminal-label")),1),c[33]||(c[33]=Wt('<br><span class="prompt"></span><span class="comment"># User asks naturally:</span><br><span class="prompt">$</span> how do I define a table struct with RBatis?<br><br><span class="prompt"></span><span class="comment"># Claude responds with code:</span><br><span class="prompt"></span><span class="keyword">#[derive(Clone, Debug, Serialize, Deserialize)]</span><br><span class="prompt"></span><span class="keyword">pub struct</span> <span class="function">User</span> {<br><span class="prompt"></span>   <span class="keyword">pub</span> id: <span class="keyword">Option</span>&lt;<span class="keyword">i32</span>&gt;,<br><span class="prompt"></span>   <span class="keyword">pub</span> name: <span class="keyword">Option</span>&lt;<span class="keyword">String</span>&gt;,<br><span class="prompt"></span>} ',40))])]),c[35]||(c[35]=m("a",{href:"https://github.com/rbatis/rbatis-skill",class:"ai-link",target:"_blank",rel:"noopener"},[m("svg",{viewBox:"0 0 24 24",width:"16",height:"16",fill:"currentColor"},[m("path",{d:"M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"})]),Lt(" GitHub → ")],-1))])])])])]),m("section",pf,[m("div",ff,[m("h2",df,L(l.$t("sec-db-title")),1),m("p",hf,L(l.$t("sec-db-sub")),1),m("div",mf,[(He(),lt(Be,null,hl(i,(u,p)=>m("a",{key:u.name,href:u.url,class:it(["db-item reveal","reveal-delay-"+(p%6+1)]),onClick:$l(h=>a(u.url),["prevent"])},[u.iconUrl?(He(),lt("img",{key:0,src:u.iconUrl,alt:"",width:"22",height:"22"},null,8,bf)):Jo("",!0),m("span",null,L(u.name),1)],10,gf)),64))])])]),m("section",_f,[m("div",yf,[m("h2",vf,L(l.$t("sec-eco-title")),1),m("p",wf,L(l.$t("sec-eco-sub")),1),m("div",kf,[m("a",xf,[c[38]||(c[38]=m("div",{class:"eco-icon"},"📊",-1)),c[39]||(c[39]=m("h3",null,"abs_admin",-1)),m("p",null,L(l.$t("sec-eco-abs")),1),c[40]||(c[40]=m("span",{class:"eco-link"},"View on GitHub →",-1))]),m("a",Sf,[c[41]||(c[41]=m("div",{class:"eco-icon"},"🔐",-1)),c[42]||(c[42]=m("h3",null,"salvo_admin",-1)),m("p",null,L(l.$t("sec-eco-salvo")),1),c[43]||(c[43]=m("span",{class:"eco-link"},"View on GitHub →",-1))])])])])]))}};function bs(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Ht=bs();function ea(e){Ht=e}var Pt={exec:()=>null};function U(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(s,i)=>{let a=typeof i=="string"?i:i.source;return a=a.replace(ye.caret,"$1"),n=n.replace(s,a),r},getRegex:()=>new RegExp(n,t)};return r}var qf=((e="")=>{try{return!!new RegExp("(?<=1)(?<!1)"+e)}catch{return!1}})(),ye={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i"),blockquoteBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}>`)},Of=/^(?:[ \t]*(?:\n|$))+/,Cf=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Ef=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Mn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Af=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,_s=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,ta=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,na=U(ta).replace(/bull/g,_s).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Df=U(ta).replace(/bull/g,_s).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),ys=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Tf=/^[^\n]+/,vs=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Bf=U(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",vs).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Pf=U(/^(bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,_s).getRegex(),gr="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ws=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Mf=U("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ws).replace("tag",gr).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),ra=U(ys).replace("hr",Mn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",gr).getRegex(),zf=U(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",ra).getRegex(),ks={blockquote:zf,code:Cf,def:Bf,fences:Ef,heading:Af,hr:Mn,html:Mf,lheading:na,list:Pf,newline:Of,paragraph:ra,table:Pt,text:Tf},xi=U("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Mn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",gr).getRegex(),If={...ks,lheading:Df,table:xi,paragraph:U(ys).replace("hr",Mn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",xi).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",gr).getRegex()},$f={...ks,html:U(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ws).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Pt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:U(ys).replace("hr",Mn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",na).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Lf=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Nf=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,sa=/^( {2,}|\\)\n(?!\s*$)/,Vf=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,ln=/[\p{P}\p{S}]/u,br=/[\s\p{P}\p{S}]/u,xs=/[^\s\p{P}\p{S}]/u,Hf=U(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,br).getRegex(),ia=/(?!~)[\p{P}\p{S}]/u,jf=/(?!~)[\s\p{P}\p{S}]/u,Uf=/(?:[^\s\p{P}\p{S}]|~)/u,Ff=U(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",qf?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),la=/^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/,Gf=U(la,"u").replace(/punct/g,ln).getRegex(),Wf=U(la,"u").replace(/punct/g,ia).getRegex(),aa="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Qf=U(aa,"gu").replace(/notPunctSpace/g,xs).replace(/punctSpace/g,br).replace(/punct/g,ln).getRegex(),Kf=U(aa,"gu").replace(/notPunctSpace/g,Uf).replace(/punctSpace/g,jf).replace(/punct/g,ia).getRegex(),Zf=U("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,xs).replace(/punctSpace/g,br).replace(/punct/g,ln).getRegex(),Xf=U(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,ln).getRegex(),Jf="^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)",Yf=U(Jf,"gu").replace(/notPunctSpace/g,xs).replace(/punctSpace/g,br).replace(/punct/g,ln).getRegex(),ed=U(/\\(punct)/,"gu").replace(/punct/g,ln).getRegex(),td=U(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),nd=U(ws).replace("(?:-->|$)","-->").getRegex(),rd=U("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",nd).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),tr=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/,sd=U(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label",tr).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),oa=U(/^!?\[(label)\]\[(ref)\]/).replace("label",tr).replace("ref",vs).getRegex(),ca=U(/^!?\[(ref)\](?:\[\])?/).replace("ref",vs).getRegex(),id=U("reflink|nolink(?!\\()","g").replace("reflink",oa).replace("nolink",ca).getRegex(),Si=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Ss={_backpedal:Pt,anyPunctuation:ed,autolink:td,blockSkip:Ff,br:sa,code:Nf,del:Pt,delLDelim:Pt,delRDelim:Pt,emStrongLDelim:Gf,emStrongRDelimAst:Qf,emStrongRDelimUnd:Zf,escape:Lf,link:sd,nolink:ca,punctuation:Hf,reflink:oa,reflinkSearch:id,tag:rd,text:Vf,url:Pt},ld={...Ss,link:U(/^!?\[(label)\]\((.*?)\)/).replace("label",tr).getRegex(),reflink:U(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",tr).getRegex()},Gr={...Ss,emStrongRDelimAst:Kf,emStrongLDelim:Wf,delLDelim:Xf,delRDelim:Yf,url:U(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Si).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:U(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Si).getRegex()},ad={...Gr,br:U(sa).replace("{2,}","*").getRegex(),text:U(Gr.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Ln={normal:ks,gfm:If,pedantic:$f},fn={normal:Ss,gfm:Gr,breaks:ad,pedantic:ld},od={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Ri=e=>od[e];function Ye(e,t){if(t){if(ye.escapeTest.test(e))return e.replace(ye.escapeReplace,Ri)}else if(ye.escapeTestNoEncode.test(e))return e.replace(ye.escapeReplaceNoEncode,Ri);return e}function qi(e){try{e=encodeURI(e).replace(ye.percentDecode,"%")}catch{return null}return e}function Oi(e,t){var i;let n=e.replace(ye.findPipe,(a,o,l)=>{let c=!1,u=o;for(;--u>=0&&l[u]==="\\";)c=!c;return c?"|":" |"}),r=n.split(ye.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!((i=r.at(-1))!=null&&i.trim())&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(ye.slashPipe,"|");return r}function xt(e,t,n){let r=e.length;if(r===0)return"";let s=0;for(;s<r&&e.charAt(r-s-1)===t;)s++;return e.slice(0,r-s)}function Ci(e){let t=e.split(`
`),n=t.length-1;for(;n>=0&&ye.blankLine.test(t[n]);)n--;return t.length-n<=2?e:t.slice(0,n+1).join(`
`)}function cd(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function ud(e,t=0){let n=t,r="";for(let s of e)if(s==="	"){let i=4-n%4;r+=" ".repeat(i),n+=i}else r+=s,n++;return r}function Ei(e,t,n,r,s){let i=t.href,a=t.title||null,o=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:i,title:a,text:o,tokens:r.inlineTokens(o)};return r.state.inLink=!1,l}function pd(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let s=r[1];return t.split(`
`).map(i=>{let a=i.match(n.other.beginningSpace);if(a===null)return i;let[o]=a;return o.length>=s.length?i.slice(s.length):i}).join(`
`)}var nr=class{constructor(e){ee(this,"options");ee(this,"rules");ee(this,"lexer");this.options=e||Ht}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=this.options.pedantic?t[0]:Ci(t[0]),r=n.replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:n,codeBlockStyle:"indented",text:r}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=pd(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=xt(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:xt(t[0],`
`),depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:xt(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=xt(t[0],`
`).split(`
`),r="",s="",i=[];for(;n.length>0;){let a=!1,o=[],l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))o.push(n[l]),a=!0;else if(!a)o.push(n[l]);else break;n=n.slice(l);let c=o.join(`
`),u=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${c}`:c,s=s?`${s}
${u}`:u;let p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(u,i,!0),this.lexer.state.top=p,n.length===0)break;let h=i.at(-1);if((h==null?void 0:h.type)==="code")break;if((h==null?void 0:h.type)==="blockquote"){let g=h,_=g.raw+`
`+n.join(`
`),S=this.blockquote(_);i[i.length-1]=S,r=r.substring(0,r.length-g.raw.length)+S.raw,s=s.substring(0,s.length-g.text.length)+S.text;break}else if((h==null?void 0:h.type)==="list"){let g=h,_=g.raw+`
`+n.join(`
`),S=this.list(_);i[i.length-1]=S,r=r.substring(0,r.length-h.raw.length)+S.raw,s=s.substring(0,s.length-g.raw.length)+S.raw,n=_.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:i,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,s={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let i=this.rules.other.listItemRegex(n),a=!1;for(;e;){let l=!1,c="",u="";if(!(t=i.exec(e))||this.rules.block.hr.test(e))break;c=t[0],e=e.substring(c.length);let p=ud(t[2].split(`
`,1)[0],t[1].length),h=e.split(`
`,1)[0],g=!p.trim(),_=0;if(this.options.pedantic?(_=2,u=p.trimStart()):g?_=t[1].length+1:(_=p.search(this.rules.other.nonSpaceChar),_=_>4?1:_,u=p.slice(_),_+=t[1].length),g&&this.rules.other.blankLine.test(h)&&(c+=h+`
`,e=e.substring(h.length+1),l=!0),!l){let S=this.rules.other.nextBulletRegex(_),E=this.rules.other.hrRegex(_),I=this.rules.other.fencesBeginRegex(_),O=this.rules.other.headingBeginRegex(_),P=this.rules.other.htmlBeginRegex(_),B=this.rules.other.blockquoteBeginRegex(_);for(;e;){let G=e.split(`
`,1)[0],le;if(h=G,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),le=h):le=h.replace(this.rules.other.tabCharGlobal,"    "),I.test(h)||O.test(h)||P.test(h)||B.test(h)||S.test(h)||E.test(h))break;if(le.search(this.rules.other.nonSpaceChar)>=_||!h.trim())u+=`
`+le.slice(_);else{if(g||p.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||I.test(p)||O.test(p)||E.test(p))break;u+=`
`+h}g=!h.trim(),c+=G+`
`,e=e.substring(G.length+1),p=le.slice(_)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(a=!0)),s.items.push({type:"list_item",raw:c,task:!!this.options.gfm&&this.rules.other.listIsTask.test(u),loose:!1,text:u,tokens:[]}),s.raw+=c}let o=s.items.at(-1);if(o)o.raw=o.raw.trimEnd(),o.text=o.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]);let c=l.tokens[0];if(l.task&&((c==null?void 0:c.type)==="text"||(c==null?void 0:c.type)==="paragraph")){l.text=l.text.replace(this.rules.other.listReplaceTask,""),c.raw=c.raw.replace(this.rules.other.listReplaceTask,""),c.text=c.text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}let u=this.rules.other.listTaskCheckbox.exec(l.raw);if(u){let p={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};l.checked=p.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=p.raw+l.tokens[0].raw,l.tokens[0].text=p.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(p)):l.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):l.tokens.unshift(p)}}else l.task&&(l.task=!1);if(!s.loose){let u=l.tokens.filter(h=>h.type==="space"),p=u.length>0&&u.some(h=>this.rules.other.anyLine.test(h.raw));s.loose=p}}if(s.loose)for(let l of s.items){l.loose=!0;for(let c of l.tokens)c.type==="text"&&(c.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t){let n=Ci(t[0]);return{type:"html",block:!0,raw:n,pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:n}}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:xt(t[0],`
`),href:r,title:s}}}table(e){var a;let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Oi(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=(a=t[3])!=null&&a.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],i={type:"table",raw:xt(t[0],`
`),header:[],align:[],rows:[]};if(n.length===r.length){for(let o of r)this.rules.other.tableAlignRight.test(o)?i.align.push("right"):this.rules.other.tableAlignCenter.test(o)?i.align.push("center"):this.rules.other.tableAlignLeft.test(o)?i.align.push("left"):i.align.push(null);for(let o=0;o<n.length;o++)i.header.push({text:n[o],tokens:this.lexer.inline(n[o]),header:!0,align:i.align[o]});for(let o of s)i.rows.push(Oi(o,i.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:i.align[c]})));return i}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t){let n=t[1].trim();return{type:"heading",raw:xt(t[0],`
`),depth:t[2].charAt(0)==="="?1:2,text:n,tokens:this.lexer.inline(n)}}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let i=xt(n.slice(0,-1),"\\");if((n.length-i.length)%2===0)return}else{let i=cd(t[2],"()");if(i===-2)return;if(i>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+i;t[2]=t[2].substring(0,i),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){let i=this.rules.other.pedanticHrefTitle.exec(r);i&&(r=i[1],s=i[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),Ei(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){let i=n[0].charAt(0);return{type:"text",raw:i,text:i}}return Ei(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||!r[1]&&!r[2]&&!r[3]&&!r[4]||r[4]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[3])||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,i,a,o=s,l=0,c=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,t=t.slice(-1*e.length+s);(r=c.exec(t))!==null;){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i)continue;if(a=[...i].length,r[3]||r[4]){o+=a;continue}else if((r[5]||r[6])&&s%3&&!((s+a)%3)){l+=a;continue}if(o-=a,o>0)continue;a=Math.min(a,a+o+l);let u=[...r[0]][0].length,p=e.slice(0,s+r.index+u+a);if(Math.min(s,a)%2){let g=p.slice(1,-1);return{type:"em",raw:p,text:g,tokens:this.lexer.inlineTokens(g)}}let h=p.slice(2,-2);return{type:"strong",raw:p,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e,t,n=""){let r=this.rules.inline.delLDelim.exec(e);if(r&&(!r[1]||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,i,a,o=s,l=this.rules.inline.delRDelim;for(l.lastIndex=0,t=t.slice(-1*e.length+s);(r=l.exec(t))!==null;){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i||(a=[...i].length,a!==s))continue;if(r[3]||r[4]){o+=a;continue}if(o-=a,o>0)continue;a=Math.min(a,a+o);let c=[...r[0]][0].length,u=e.slice(0,s+r.index+c+a),p=u.slice(s,-s);return{type:"del",raw:u,text:p,tokens:this.lexer.inlineTokens(p)}}}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let r,s;if(t[2]==="@")r=t[0],s="mailto:"+r;else{let i;do i=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(i!==t[0]);r=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:r,href:s,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},$e=class Wr{constructor(t){ee(this,"tokens");ee(this,"options");ee(this,"state");ee(this,"inlineQueue");ee(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Ht,this.options.tokenizer=this.options.tokenizer||new nr,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:ye,block:Ln.normal,inline:fn.normal};this.options.pedantic?(n.block=Ln.pedantic,n.inline=fn.pedantic):this.options.gfm&&(n.block=Ln.gfm,this.options.breaks?n.inline=fn.breaks:n.inline=fn.gfm),this.tokenizer.rules=n}static get rules(){return{block:Ln,inline:fn}}static lex(t,n){return new Wr(n).lex(t)}static lexInline(t,n){return new Wr(n).inlineTokens(t)}lex(t){t=t.replace(ye.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){var i,a,o;this.tokenizer.lexer=this,this.options.pedantic&&(t=t.replace(ye.tabCharGlobal,"    ").replace(ye.spaceLine,""));let s=1/0;for(;t;){if(t.length<s)s=t.length;else{this.infiniteLoopError(t.charCodeAt(0));break}let l;if((a=(i=this.options.extensions)==null?void 0:i.block)!=null&&a.some(u=>(l=u.call({lexer:this},t,n))?(t=t.substring(l.raw.length),n.push(l),!0):!1))continue;if(l=this.tokenizer.space(t)){t=t.substring(l.raw.length);let u=n.at(-1);l.raw.length===1&&u!==void 0?u.raw+=`
`:n.push(l);continue}if(l=this.tokenizer.code(t)){t=t.substring(l.raw.length);let u=n.at(-1);(u==null?void 0:u.type)==="paragraph"||(u==null?void 0:u.type)==="text"?(u.raw+=(u.raw.endsWith(`
`)?"":`
`)+l.raw,u.text+=`
`+l.text,this.inlineQueue.at(-1).src=u.text):n.push(l);continue}if(l=this.tokenizer.fences(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.heading(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.hr(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.blockquote(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.list(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.html(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.def(t)){t=t.substring(l.raw.length);let u=n.at(-1);(u==null?void 0:u.type)==="paragraph"||(u==null?void 0:u.type)==="text"?(u.raw+=(u.raw.endsWith(`
`)?"":`
`)+l.raw,u.text+=`
`+l.raw,this.inlineQueue.at(-1).src=u.text):this.tokens.links[l.tag]||(this.tokens.links[l.tag]={href:l.href,title:l.title},n.push(l));continue}if(l=this.tokenizer.table(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.lheading(t)){t=t.substring(l.raw.length),n.push(l);continue}let c=t;if((o=this.options.extensions)!=null&&o.startBlock){let u=1/0,p=t.slice(1),h;this.options.extensions.startBlock.forEach(g=>{h=g.call({lexer:this},p),typeof h=="number"&&h>=0&&(u=Math.min(u,h))}),u<1/0&&u>=0&&(c=t.substring(0,u+1))}if(this.state.top&&(l=this.tokenizer.paragraph(c))){let u=n.at(-1);r&&(u==null?void 0:u.type)==="paragraph"?(u.raw+=(u.raw.endsWith(`
`)?"":`
`)+l.raw,u.text+=`
`+l.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=u.text):n.push(l),r=c.length!==t.length,t=t.substring(l.raw.length);continue}if(l=this.tokenizer.text(t)){t=t.substring(l.raw.length);let u=n.at(-1);(u==null?void 0:u.type)==="text"?(u.raw+=(u.raw.endsWith(`
`)?"":`
`)+l.raw,u.text+=`
`+l.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=u.text):n.push(l);continue}if(t){this.infiniteLoopError(t.charCodeAt(0));break}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var c,u,p,h,g;this.tokenizer.lexer=this;let r=t,s=null;if(this.tokens.links){let _=Object.keys(this.tokens.links);if(_.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!==null;)_.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!==null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let i;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!==null;)i=s[2]?s[2].length:0,r=r.slice(0,s.index+i)+"["+"a".repeat(s[0].length-i-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=((u=(c=this.options.hooks)==null?void 0:c.emStrongMask)==null?void 0:u.call({lexer:this},r))??r;let a=!1,o="",l=1/0;for(;t;){if(t.length<l)l=t.length;else{this.infiniteLoopError(t.charCodeAt(0));break}a||(o=""),a=!1;let _;if((h=(p=this.options.extensions)==null?void 0:p.inline)!=null&&h.some(E=>(_=E.call({lexer:this},t,n))?(t=t.substring(_.raw.length),n.push(_),!0):!1))continue;if(_=this.tokenizer.escape(t)){t=t.substring(_.raw.length),n.push(_);continue}if(_=this.tokenizer.tag(t)){t=t.substring(_.raw.length),n.push(_);continue}if(_=this.tokenizer.link(t)){t=t.substring(_.raw.length),n.push(_);continue}if(_=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(_.raw.length);let E=n.at(-1);_.type==="text"&&(E==null?void 0:E.type)==="text"?(E.raw+=_.raw,E.text+=_.text):n.push(_);continue}if(_=this.tokenizer.emStrong(t,r,o)){t=t.substring(_.raw.length),n.push(_);continue}if(_=this.tokenizer.codespan(t)){t=t.substring(_.raw.length),n.push(_);continue}if(_=this.tokenizer.br(t)){t=t.substring(_.raw.length),n.push(_);continue}if(_=this.tokenizer.del(t,r,o)){t=t.substring(_.raw.length),n.push(_);continue}if(_=this.tokenizer.autolink(t)){t=t.substring(_.raw.length),n.push(_);continue}if(!this.state.inLink&&(_=this.tokenizer.url(t))){t=t.substring(_.raw.length),n.push(_);continue}let S=t;if((g=this.options.extensions)!=null&&g.startInline){let E=1/0,I=t.slice(1),O;this.options.extensions.startInline.forEach(P=>{O=P.call({lexer:this},I),typeof O=="number"&&O>=0&&(E=Math.min(E,O))}),E<1/0&&E>=0&&(S=t.substring(0,E+1))}if(_=this.tokenizer.inlineText(S)){t=t.substring(_.raw.length),_.raw.slice(-1)!=="_"&&(o=_.raw.slice(-1)),a=!0;let E=n.at(-1);(E==null?void 0:E.type)==="text"?(E.raw+=_.raw,E.text+=_.text):n.push(_);continue}if(t){this.infiniteLoopError(t.charCodeAt(0));break}}return n}infiniteLoopError(t){let n="Infinite loop on byte: "+t;if(this.options.silent)console.error(n);else throw new Error(n)}},rr=class{constructor(e){ee(this,"options");ee(this,"parser");this.options=e||Ht}space(e){return""}code({text:e,lang:t,escaped:n}){var i;let r=(i=(t||"").match(ye.notSpaceStart))==null?void 0:i[0],s=e.replace(ye.endingNewline,"")+`
`;return r?'<pre><code class="language-'+Ye(r)+'">'+(n?s:Ye(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:Ye(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,r="";for(let a=0;a<e.items.length;a++){let o=e.items[a];r+=this.listitem(o)}let s=t?"ol":"ul",i=t&&n!==1?' start="'+n+'"':"";return"<"+s+i+`>
`+r+"</"+s+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let s=0;s<e.header.length;s++)n+=this.tablecell(e.header[s]);t+=this.tablerow({text:n});let r="";for(let s=0;s<e.rows.length;s++){let i=e.rows[s];n="";for(let a=0;a<i.length;a++)n+=this.tablecell(i[a]);r+=this.tablerow({text:n})}return r&&(r=`<tbody>${r}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Ye(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),s=qi(e);if(s===null)return r;e=s;let i='<a href="'+e+'"';return t&&(i+=' title="'+Ye(t)+'"'),i+=">"+r+"</a>",i}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let s=qi(e);if(s===null)return Ye(n);e=s;let i=`<img src="${e}" alt="${Ye(n)}"`;return t&&(i+=` title="${Ye(t)}"`),i+=">",i}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Ye(e.text)}},Rs=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Le=class Qr{constructor(t){ee(this,"options");ee(this,"renderer");ee(this,"textRenderer");this.options=t||Ht,this.options.renderer=this.options.renderer||new rr,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Rs}static parse(t,n){return new Qr(n).parse(t)}static parseInline(t,n){return new Qr(n).parseInline(t)}parse(t){var r,s;this.renderer.parser=this;let n="";for(let i=0;i<t.length;i++){let a=t[i];if((s=(r=this.options.extensions)==null?void 0:r.renderers)!=null&&s[a.type]){let l=a,c=this.options.extensions.renderers[l.type].call({parser:this},l);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(l.type)){n+=c||"";continue}}let o=a;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let l='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}parseInline(t,n=this.renderer){var s,i;this.renderer.parser=this;let r="";for(let a=0;a<t.length;a++){let o=t[a];if((i=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&i[o.type]){let c=this.options.extensions.renderers[o.type].call({parser:this},o);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=c||"";continue}}let l=o;switch(l.type){case"escape":{r+=n.text(l);break}case"html":{r+=n.html(l);break}case"link":{r+=n.link(l);break}case"image":{r+=n.image(l);break}case"checkbox":{r+=n.checkbox(l);break}case"strong":{r+=n.strong(l);break}case"em":{r+=n.em(l);break}case"codespan":{r+=n.codespan(l);break}case"br":{r+=n.br(l);break}case"del":{r+=n.del(l);break}case"text":{r+=n.text(l);break}default:{let c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return r}},Nn,mn=(Nn=class{constructor(e){ee(this,"options");ee(this,"block");this.options=e||Ht}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(e=this.block){return e?$e.lex:$e.lexInline}provideParser(e=this.block){return e?Le.parse:Le.parseInline}},ee(Nn,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),ee(Nn,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Nn),fd=class{constructor(...e){ee(this,"defaults",bs());ee(this,"options",this.setOptions);ee(this,"parse",this.parseMarkdown(!0));ee(this,"parseInline",this.parseMarkdown(!1));ee(this,"Parser",Le);ee(this,"Renderer",rr);ee(this,"TextRenderer",Rs);ee(this,"Lexer",$e);ee(this,"Tokenizer",nr);ee(this,"Hooks",mn);this.use(...e)}walkTokens(e,t){var r,s;let n=[];for(let i of e)switch(n=n.concat(t.call(this,i)),i.type){case"table":{let a=i;for(let o of a.header)n=n.concat(this.walkTokens(o.tokens,t));for(let o of a.rows)for(let l of o)n=n.concat(this.walkTokens(l.tokens,t));break}case"list":{let a=i;n=n.concat(this.walkTokens(a.items,t));break}default:{let a=i;(s=(r=this.defaults.extensions)==null?void 0:r.childTokens)!=null&&s[a.type]?this.defaults.extensions.childTokens[a.type].forEach(o=>{let l=a[o].flat(1/0);n=n.concat(this.walkTokens(l,t))}):a.tokens&&(n=n.concat(this.walkTokens(a.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let i=t.renderers[s.name];i?t.renderers[s.name]=function(...a){let o=s.renderer.apply(this,a);return o===!1&&(o=i.apply(this,a)),o}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let i=t[s.level];i?i.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){let s=this.defaults.renderer||new rr(this.defaults);for(let i in n.renderer){if(!(i in s))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let a=i,o=n.renderer[a],l=s[a];s[a]=(...c)=>{let u=o.apply(s,c);return u===!1&&(u=l.apply(s,c)),u||""}}r.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new nr(this.defaults);for(let i in n.tokenizer){if(!(i in s))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let a=i,o=n.tokenizer[a],l=s[a];s[a]=(...c)=>{let u=o.apply(s,c);return u===!1&&(u=l.apply(s,c)),u}}r.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new mn;for(let i in n.hooks){if(!(i in s))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let a=i,o=n.hooks[a],l=s[a];mn.passThroughHooks.has(i)?s[a]=c=>{if(this.defaults.async&&mn.passThroughHooksRespectAsync.has(i))return(async()=>{let p=await o.call(s,c);return l.call(s,p)})();let u=o.call(s,c);return l.call(s,u)}:s[a]=(...c)=>{if(this.defaults.async)return(async()=>{let p=await o.apply(s,c);return p===!1&&(p=await l.apply(s,c)),p})();let u=o.apply(s,c);return u===!1&&(u=l.apply(s,c)),u}}r.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,i=n.walkTokens;r.walkTokens=function(a){let o=[];return o.push(i.call(this,a)),s&&(o=o.concat(s.call(this,a))),o}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return $e.lex(e,t??this.defaults)}parser(e,t){return Le.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},s={...this.defaults,...r},i=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&r.async===!1)return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,o=await(s.hooks?await s.hooks.provideLexer(e):e?$e.lex:$e.lexInline)(a,s),l=s.hooks?await s.hooks.processAllTokens(o):o;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let c=await(s.hooks?await s.hooks.provideParser(e):e?Le.parse:Le.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(c):c})().catch(i);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer(e):e?$e.lex:$e.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let o=(s.hooks?s.hooks.provideParser(e):e?Le.parse:Le.parseInline)(a,s);return s.hooks&&(o=s.hooks.postprocess(o)),o}catch(a){return i(a)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+Ye(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},Nt=new fd;function X(e,t){return Nt.parse(e,t)}X.options=X.setOptions=function(e){return Nt.setOptions(e),X.defaults=Nt.defaults,ea(X.defaults),X};X.getDefaults=bs;X.defaults=Ht;X.use=function(...e){return Nt.use(...e),X.defaults=Nt.defaults,ea(X.defaults),X};X.walkTokens=function(e,t){return Nt.walkTokens(e,t)};X.parseInline=Nt.parseInline;X.Parser=Le;X.parser=Le.parse;X.Renderer=rr;X.TextRenderer=Rs;X.Lexer=$e;X.lexer=$e.lex;X.Tokenizer=nr;X.Hooks=mn;X.parse=X;X.options;X.setOptions;X.use;X.walkTokens;X.parseInline;Le.parse;$e.lex;const dd=`\r
### rbatis-v4\r
\r
A highly Performant SQL Toolkit and Compile time ORM Library. An async, pure \`Rust\` SQL crate featuring compile-time Dynamic SQL\r
\r
It is an ORM, a small compiler, a dynamic SQL languages\r
\r
* Compatible with most mybatis3 syntax.You can start recoding Java projects into \`Rust\`!\r
* No Runtimes，No Garbage Collection,High performance, Based on Future/Tokio\r
* Zero cost Dynamic SQL, implemented using (proc-macro,compile-time,Cow(Reduce unnecessary cloning))\r
  techniques。 don't need ONGL engine(mybatis)\r
* JDBC-like driver design, driver use cargo.toml dependency and \`\`\`Box<dyn Driver>\`\`\` separation\r
* All database drivers supported \`\`\`#{arg}\`\`\`, \`\`\`\${arg}\`\`\`,\`\`\`?\`\`\`  placeholder(pg/mssql auto processing '?' to '$1'\r
  and '@P1')\r
* Dynamic SQL(Write code freely in SQL),pagination, \`\`\`py_sql\`\`\` query lang and \`\`\`html_sql\`\`\`(Inspired Mybatis).\r
* Dynamic configuration connection pool(Based on the https://github.com/rbatis/fast_pool)\r
* Supports Logging based on interceptor implementation\r
* 100% Safe pure \`Rust\` with \`#![forbid(unsafe_code)]\` enabled\r
* [rbatis/example](https://github.com/rbatis/example)\r
* [abs_admin project](https://github.com/rbatis/abs_admin) an background user management system(Vue.js+rbatis+axum)\r
* [salvo_admin project](https://github.com/feihua/salvo-admin) an background permission management system(react+rbatis+salvo)\r
\r
## Claude Code Integration\r
\r
This project includes a Claude Code skill for AI-assisted development. For usage, please visit: [https://github.com/rbatis/rbatis-skill](https://github.com/rbatis/rbatis-skill)\r
\r
\r
#### Supported database driver\r
\r
> the RBatis support any impl [rdbc](https://crates.io/crates/rbdc) drivers.\r
> If you don't have the following driver you want, you can write one yourself, just as long as the impl \`\`\` rbdc::db::* \`\`\` traits\r
\r
| database(crates.io)                                 | github_link                                                                           |\r
|-----------------------------------------------------|---------------------------------------------------------------------------------------|\r
| [Mysql](https://crates.io/crates/rbdc-mysql)        | [rbatis/rbdc-mysql](https://github.com/rbatis/rbatis/tree/master/rbdc-mysql)          |\r
| [Postgres](https://crates.io/crates/rbdc-pg)        | [rbatis/rbdc-pg](https://github.com/rbatis/rbatis/tree/master/rbdc-pg)                | \r
| [Sqlite](https://crates.io/crates/rbdc-sqlite)      | [rbatis/rbdc-sqlite](https://github.com/rbatis/rbatis/tree/master/rbdc-sqlite)        |\r
| [Mssql](https://crates.io/crates/rbdc-mssql)        | [rbatis/rbdc-mssql](https://github.com/rbatis/rbatis/tree/master/rbdc-mssql)          |\r
| [MariaDB](https://crates.io/crates/rbdc-mysql)      | [rbatis/rbdc-mysql](https://github.com/rbatis/rbatis/tree/master/rbdc-mysql)          |\r
| [TiDB](https://crates.io/crates/rbdc-mysql)         | [rbatis/rbdc-mysql](https://github.com/rbatis/rbatis/tree/master/rbdc-mysql)          |\r
| [CockroachDB](https://crates.io/crates/rbdc-pg)     | [rbatis/rbdc-pg](https://github.com/rbatis/rbatis/tree/master/rbdc-pg)                |\r
| [Oracle](https://crates.io/crates/rbdc-oracle)      | [chenpengfan/rbdc-oracle](https://github.com/chenpengfan/rbdc-oracle)                 |\r
| [TDengine](https://crates.io/crates/rbdc-tdengine)  | [tdcare/rbdc-tdengine](https://github.com/tdcare/rbdc-tdengine)                       |\r
\r
\r
#### CRUD-install/use\r
\r
* install step: Cargo.toml(run command \`cargo update\`)\r
\r
* \`toml\`(default)\r
\r
\`\`\`toml\r
#rbatis deps\r
rbatis = { version = "4.8"}\r
rbs = { version = "4"}\r
rbdc-sqlite = { version = "4" }\r
#rbdc-mysql={version="4"}\r
#rbdc-pg={version="4"}\r
#rbdc-mssql={version="4"}\r
\r
serde = { version = "1", features = ["derive"] }\r
tokio = { version = "1", features = ["full"] }\r
log = "0.4"\r
fast_log = "1.6"\r
\`\`\`\r
\r
* \`toml\` \`native-tls\` (option)\r
\r
\`\`\`toml\r
rbs = { version = "4" }\r
rbdc-sqlite = { version = "4", default-features = false, features = ["tls-native-tls"] }\r
#rbdc-mysql={version="4", default-features = false, features = ["tls-native-tls"]}\r
#rbdc-pg={version="4", default-features = false, features = ["tls-native-tls"]}\r
#rbdc-mssql={version="4", default-features = false, features = ["tls-native-tls"]}\r
rbatis = { version = "4.8" }\r
\r
serde = { version = "1", features = ["derive"] }\r
tokio = { version = "1", features = ["full"] }\r
log = "0.4"\r
fast_log = "1.6"\r
\`\`\`\r
\r
\r
\r
##### TableDefine\r
\r
> RBatis follows a clean code style,so that A database table structure is just a normal structure that may use the database types provided by RBatis\r
> We use the \`\`\`crud!()\`\`\` macro Enables the table structure to have the ability to query and modify the database\r
> crud! macro provides: \`\`\`insert()\`\`\` , \`\`\`insert_batch()\`\`\` , \`\`\`select_by_map()\`\`\` , \`\`\`update_by_map()\`\`\` , \`\`\`delete_by_map()\`\`\` and more\r
\r
\`\`\`rust\r
use serde::{Deserialize, Serialize};\r
#[derive(Clone, Debug, Serialize, Deserialize)]\r
pub struct BizActivity {\r
    pub id: Option<String>,\r
    pub name: Option<String>,\r
    pub pc_link: Option<String>,\r
    pub h5_link: Option<String>,\r
    pub pc_banner_img: Option<String>,\r
    pub h5_banner_img: Option<String>,\r
    pub sort: Option<String>,\r
    pub status: Option<i32>,\r
    pub remark: Option<String>,\r
    pub create_time: Option<DateTime>,\r
    pub version: Option<i64>,\r
    pub delete_flag: Option<i32>,\r
}\r
//crud = async fn insert(...)+async fn  select_by_map(...)+ async fn  update_by_map(...)+async fn  delete_by_map(...)...and more\r
rbatis::crud!(BizActivity {}); \r
\r
\`\`\`\r
\r
###### custom table_name\r
\r
> rbatis allow custom your table_name\r
> just like sql \`\`\`select * from \${table_name} \`\`\`\r
\`\`\`rust\r
rbatis::crud!(BizActivity {},"biz_activity");\r
\`\`\`\r
\r
###### macros-insert\r
\r
\`\`\`rust\r
//#[macro_use] define in 'root crate' or 'mod.rs' or 'main.rs'\r
#[macro_use]\r
extern crate rbatis;\r
\r
\r
use rbatis::rbdc::datetime::DateTime;\r
use serde_json::json;\r
\r
/// table\r
#[derive(Clone, Debug, serde::Serialize, serde::Deserialize)]\r
pub struct BizActivity {\r
    pub id: Option<String>,\r
    pub name: Option<String>,\r
    pub pc_link: Option<String>,\r
    pub h5_link: Option<String>,\r
    pub pc_banner_img: Option<String>,\r
    pub h5_banner_img: Option<String>,\r
    pub sort: Option<String>,\r
    pub status: Option<i32>,\r
    pub remark: Option<String>,\r
    pub create_time: Option<DateTime>,\r
    pub version: Option<i64>,\r
    pub delete_flag: Option<i32>,\r
}\r
\r
crud!(BizActivity{});\r
\r
#[tokio::main]\r
async fn main() {\r
    /// enable log crate to show sql logs\r
    fast_log::init(fast_log::Config::new().console()).expect("rbatis init fail");\r
    /// initialize rbatis. also you can call rb.clone(). this is  an Arc point\r
    let rb = RBatis::new();\r
    /// connect to database \r
\r
    //init() just set driver\r
    //rb.init(rbdc_sqlite::SqliteDriver {}, "sqlite://target/sqlite.db" ).unwrap();\r
    \r
    // link() will set driver and try use acquire() link database\r
    // sqlite \r
    rb.link(SqliteDriver {}, "sqlite://target/sqlite.db").await.unwrap();\r
    // mysql \r
    // rb.link(MysqlDriver{},"mysql://root:123456@localhost:3306/test").await.unwrap();\r
    // postgresql \r
    // rb.link(PgDriver{},"postgres://postgres:123456@localhost:5432/postgres").await.unwrap();\r
    // mssql/sqlserver\r
    // rb.link(MssqlDriver{},"jdbc:sqlserver://localhost:1433;User=SA;Password={TestPass!123456};Database=test").await.unwrap();\r
\r
    let table = BizActivity {\r
        id: Some("2".into()),\r
        name: Some("2".into()),\r
        pc_link: Some("2".into()),\r
        h5_link: Some("2".into()),\r
        pc_banner_img: None,\r
        h5_banner_img: None,\r
        sort: Some("2".to_string()),\r
        status: Some(2),\r
        remark: Some("2".into()),\r
        create_time: Some(DateTime::now()),\r
        version: Some(1),\r
        delete_flag: Some(1),\r
    };\r
    let tables = [table.clone(), {\r
        let mut t3 = table.clone();\r
        t3.id = "3".to_string().into();\r
        t3\r
    }];\r
\r
    let data = BizActivity::insert(&rb, &table).await;\r
    println!("insert = {}", json!(data));\r
\r
    let data = BizActivity::insert_batch(&rb, &tables, 10).await;\r
    println!("insert_batch = {}", json!(data));\r
}\r
\`\`\`\r
\r
###### macros-update\r
\r
\`\`\`rust\r
//#[macro_use] define in 'root crate' or 'mod.rs' or 'main.rs'\r
#[macro_use]\r
extern crate rbatis;\r
\r
\r
use rbatis::rbdc::datetime::DateTime;\r
use serde_json::json;\r
\r
#[derive(Clone, Debug, Serialize, Deserialize)]\r
pub struct BizActivity {\r
    pub id: Option<String>,\r
    pub name: Option<String>,\r
    pub pc_link: Option<String>,\r
    pub h5_link: Option<String>,\r
    pub pc_banner_img: Option<String>,\r
    pub h5_banner_img: Option<String>,\r
    pub sort: Option<String>,\r
    pub status: Option<i32>,\r
    pub remark: Option<String>,\r
    pub create_time: Option<DateTime>,\r
    pub version: Option<i64>,\r
    pub delete_flag: Option<i32>,\r
}\r
crud!(BizActivity{});\r
\r
#[tokio::main]\r
async fn main() {\r
    /// enable log crate to show sql logs\r
    fast_log::init(fast_log::Config::new().console()).expect("rbatis init fail");\r
    /// initialize rbatis. also you can call rb.clone(). this is  an Arc point\r
    let rb = RBatis::new();\r
    /// connect to database \r
\r
    //init() just set driver\r
    //rb.init(rbdc_sqlite::SqliteDriver {}, "sqlite://target/sqlite.db" ).unwrap();\r
    \r
    // link() will set driver and try use acquire() link database\r
    // sqlite \r
    rb.link(SqliteDriver {}, "sqlite://target/sqlite.db").await.unwrap();\r
    // mysql \r
    // rb.link(MysqlDriver{},"mysql://root:123456@localhost:3306/test").await.unwrap();\r
    // postgresql \r
    // rb.link(PgDriver{},"postgres://postgres:123456@localhost:5432/postgres").await.unwrap();\r
    // mssql/sqlserver\r
    // rb.link(MssqlDriver{},"jdbc:sqlserver://localhost:1433;User=SA;Password={TestPass!123456};Database=test").await.unwrap();\r
\r
    let table = BizActivity {\r
        id: Some("2".into()),\r
        name: Some("2".into()),\r
        pc_link: Some("2".into()),\r
        h5_link: Some("2".into()),\r
        pc_banner_img: None,\r
        h5_banner_img: None,\r
        sort: None,\r
        status: Some(2),\r
        remark: Some("2".into()),\r
        create_time: Some(DateTime::now()),\r
        version: Some(1),\r
        delete_flag: Some(1),\r
    };\r
\r
    let data = BizActivity::update_by_map(&rb, &table, value!{"id":&table.id}).await;\r
    println!("update_by_map = {}", json!(data));\r
\r
}\r
\`\`\`\r
\r
###### macros-select\r
\r
\`\`\`rust\r
//#[macro_use] define in 'root crate' or 'mod.rs' or 'main.rs'\r
#[macro_use]\r
extern crate rbatis;\r
\r
\r
use rbatis::rbdc::datetime::DateTime;\r
use serde_json::json;\r
\r
#[derive(Clone, Debug, Serialize, Deserialize)]\r
pub struct BizActivity {\r
    pub id: Option<String>,\r
    pub name: Option<String>,\r
    pub pc_link: Option<String>,\r
    pub h5_link: Option<String>,\r
    pub pc_banner_img: Option<String>,\r
    pub h5_banner_img: Option<String>,\r
    pub sort: Option<String>,\r
    pub status: Option<i32>,\r
    pub remark: Option<String>,\r
    pub create_time: Option<DateTime>,\r
    pub version: Option<i64>,\r
    pub delete_flag: Option<i32>,\r
}\r
crud!(BizActivity{});\r
\r
#[tokio::main]\r
async fn main() {\r
    /// enable log crate to show sql logs\r
    fast_log::init(fast_log::Config::new().console()).expect("rbatis init fail");\r
    /// initialize rbatis. also you can call rb.clone(). this is  an Arc point\r
    let rb = RBatis::new();\r
    /// connect to database \r
\r
    //init() just set driver\r
    //rb.init(rbdc_sqlite::SqliteDriver {}, "sqlite://target/sqlite.db" ).unwrap();\r
    \r
    // link() will set driver and try use acquire() link database\r
    // sqlite \r
    rb.link(SqliteDriver {}, "sqlite://target/sqlite.db").await.unwrap();\r
    // mysql \r
    // rb.link(MysqlDriver{},"mysql://root:123456@localhost:3306/test").await.unwrap();\r
    // postgresql \r
    // rb.link(PgDriver{},"postgres://postgres:123456@localhost:5432/postgres").await.unwrap();\r
    // mssql/sqlserver\r
    // rb.link(MssqlDriver{},"jdbc:sqlserver://localhost:1433;User=SA;Password={TestPass!123456};Database=test").await.unwrap();\r
\r
    let data = BizActivity::select_by_map(&rb, value!{"id":"1"}).await;\r
    println!("select_by_map = {}", json!(data));\r
}\r
\`\`\`\r
\r
\r
#### debug_mode\r
\r
if you open features on Cargo.toml "debug_mode", You will see the following features\r
\r
*  show the project build Generated code(\`rbatis_codgen\` Generated code). you can see build log(\`............gen macro py_sql :............\`)\r
*  show the database \`rows\` data . you can see log(\`\`\`query <= len=1,rows=[{"id":1}]\`\`\`)\r
*  show decoding invalid type Which field did the parsing fail. you can see error(\`\`\`"invalid type: integer \`1\`, expected a string, key=\`status\`"\`\`\`)\r
\r
please notice, debug_mode should set log level to 'debug'\r
\r
> how to open debug_mode features on Cargo.toml?\r
\`\`\`toml\r
rbatis = { version = "4",features = ["debug_mode"]}\r
\`\`\`\r
\r
> need fast_log set level = Debug\r
\`\`\`rust\r
#[tokio::main]\r
async fn main(){\r
    fast_log::init(fast_log::Config::new().console().level(log::LevelFilter::Debug));\r
}\r
\`\`\`\r
\r
\`\`\`log\r
cargo run\r
............gen macro py_sql :\r
 pub async fn do_select_all(\r
    rb: &dyn rbatis::executor::Executor,\r
    table_name: String,\r
) -> Result<Vec<BizActivity>, rbatis::rbdc::Error> {\r
    let mut rb_arg_map = rbs::value::map::ValueMap::new();\r
    rb_arg_map.insert(\r
        "table_name".to_string().into(),\r
        rbs::to_value(table_name).unwrap_or_default(),\r
    );\r
    {}\r
    use rbatis::executor::RBatisRef;\r
    let driver_type = rb.get_rbatis().driver_type()?;\r
    use rbatis::rbatis_codegen;\r
    pub fn do_select_all(arg: &rbs::Value, _tag: char) -> (String, Vec<rbs::Value>) {\r
        use rbatis_codegen::ops::*;\r
        let mut sql = String::with_capacity(1000);\r
        let mut args = Vec::with_capacity(20);\r
        sql.push_str(\r
            "select * from \${table_name}"\r
                .replacen("\${table_name}", &{ &arg["table_name"] }.as_sql(), 1)\r
                .as_str(),\r
        );\r
        rbatis_codegen::sql_index!(sql, _tag);\r
        return (sql, args);\r
    }\r
    let (mut sql, rb_args) = do_select_all(&rbs::Value::Map(rb_arg_map), '?');\r
    use rbatis::executor::Executor;\r
    let r = rb.query(&sql, rb_args).await?;\r
    rbatis::decode::decode(r)\r
}\r
............gen macro py_sql end............\r
\`\`\`\r
\r
\r
#### \`rbs\`\r
\r
\`rbs\` is a specialized serialization framework written by \`rbatis\` for the ORM intermediate language \`html_sql\`,\`py_sql\`,\r
used to conveniently use and replace JSON like objects in HTML statements instead of manipulating native structures.\r
You can understand \`rbs\` as an intermediate structure similar to JSON \`Value\`.\r
\r
* Here we show the definition of \`rbs::Value\`\r
\`\`\`rust\r
#[derive(Clone, Debug, PartialEq)]\r
pub enum Value {\r
    /// null\r
    Null,\r
    /// true or false\r
    Bool(bool),\r
    /// Int32\r
    I32(i32),\r
    /// Int64\r
    I64(i64),\r
    /// Uint32\r
    U32(u32),\r
    /// Uint64\r
    U64(u64),\r
    /// A 32-bit float number.\r
    F32(f32),\r
    /// A 64-bit float number.\r
    F64(f64),\r
    /// String\r
    String(String),\r
    /// Binary/Bytes.\r
    Binary(Vec<u8>),\r
    /// Array/Vec.\r
    Array(Vec<Self>),\r
    /// Map<Key,Value>.\r
    Map(ValueMap),\r
    /// Extended implements Extension interface\r
    Ext(&'static str, Box<Self>),\r
}\r
\`\`\`\r
\r
*  rbs build a map value\r
\`\`\`rust\r
fn main(){\r
    let v = rbs::to_value!{\r
        "key":"value",\r
        "key2":"value2"\r
    };\r
}\r
\`\`\`\r
\r
*  rbs encode to value\r
\`\`\`rust\r
fn main(){\r
    let v = rbs::to_value!(1);\r
    let arg = vec![1,2,3];\r
    let v = rbs::to_value!(&arg);\r
    let arg = "1".to_string();\r
    let v = rbs::to_value!(&arg);\r
}\r
\`\`\`\r
\r
*  rbs decode from value\r
\`\`\`rust\r
fn main(){\r
    let v:i32 = rbs::from_value(Value::I32(1)).unwrap();\r
}\r
\`\`\`\r
\r
*  display value\r
\`\`\`rust\r
fn main(){\r
    let value = Value::I32(1);\r
    assert_eq!(value.to_string(),"1");\r
    assert_eq!(format!("{}",value),"1");\r
}\r
\`\`\`\r
\r
\r
#### Transaction\r
\r
> The essence of a transaction is to use the SQL statements BEGIN, COMMIT, and ROLLBACK.\r
> The RBatis provides these three functions but also support \`\`\`defer_async()\`\`\` to prevent forgotten commits\r
\r
example [see](https://github.com/rbatis/rbatis/blob/master/example/src/transaction.rs)\r
\r
\`\`\`rust\r
use serde::{Deserialize, Serialize};\r
#[derive(Clone, Debug, Serialize, Deserialize)]\r
pub struct BizActivity {\r
    pub id: Option<String>,\r
    pub name: Option<String>,\r
    pub pc_link: Option<String>,\r
    pub h5_link: Option<String>,\r
    pub pc_banner_img: Option<String>,\r
    pub h5_banner_img: Option<String>,\r
    pub sort: Option<String>,\r
    pub status: Option<i32>,\r
    pub remark: Option<String>,\r
    pub create_time: Option<DateTime>,\r
    pub version: Option<i64>,\r
    pub delete_flag: Option<i32>,\r
}\r
crud!(BizActivity{});\r
#[tokio::main]\r
pub async fn main() {\r
    let _ = fast_log::init(fast_log::Config::new().console()).expect("rbatis init fail");\r
    let rb = RBatis::new();\r
    // rb.link(MysqlDriver {},"mysql://root:123456@localhost:3306/test").await.unwrap();\r
    // rb.link(PgDriver {},"postgres://postgres:123456@localhost:5432/postgres").await.unwrap();\r
    // rb.link(MssqlDriver {},"mssql://SA:TestPass!123456@localhost:1433/test").await.unwrap();\r
    rb.link(\r
        SqliteDriver {},\r
        &format!("sqlite://{}target/sqlite.db", path),\r
    ).await.unwrap();\r
    let t = BizActivity {\r
        id: Some("2".into()),\r
        name: Some("2".into()),\r
        pc_link: Some("2".into()),\r
        h5_link: Some("2".into()),\r
        pc_banner_img: None,\r
        h5_banner_img: None,\r
        sort: None,\r
        status: Some(2),\r
        remark: Some("2".into()),\r
        create_time: Some(DateTime::now()),\r
        version: Some(1),\r
        delete_flag: Some(1),\r
    };\r
    let tx = rb.acquire_begin().await.unwrap();\r
    // defer_async will be rollback if tx drop\r
    // let mut tx = tx.defer_async(|mut tx| async move {\r
    //     if !tx.done() {\r
    //         tx.rollback().await.unwrap();\r
    //         println!("rollback");\r
    //     }\r
    // });\r
    //tx.exec("select 1", vec![]).await.unwrap();\r
    BizActivity::insert(& tx, &t).await.unwrap();\r
\r
    tx.commit().await.unwrap();\r
    tx.rollback().await.unwrap();\r
}\r
\`\`\`\r
\r
\r
#### Raw Sql\r
\r
> the RBatis also support Write the original statements of the database\r
> And the drivers provided by RBatis all support placeholder '?',so you can write '?' on Postgres/mssql...and more\r
\r
\`\`\`rust\r
use rbs::to_value;\r
use std::time::Duration;\r
use tokio::time::sleep;\r
use serde::{Deserialize, Serialize};\r
#[derive(Clone, Debug, Serialize, Deserialize)]\r
pub struct BizActivity {\r
    pub id: Option<String>,\r
    pub name: Option<String>,\r
    pub pc_link: Option<String>,\r
    pub h5_link: Option<String>,\r
    pub pc_banner_img: Option<String>,\r
    pub h5_banner_img: Option<String>,\r
    pub sort: Option<String>,\r
    pub status: Option<i32>,\r
    pub remark: Option<String>,\r
    pub create_time: Option<DateTime>,\r
    pub version: Option<i64>,\r
    pub delete_flag: Option<i32>,\r
}\r
#[tokio::main]\r
pub async fn main() {\r
    fast_log::init(fast_log::Config::new().console()).expect("rbatis init fail");\r
     let rb = RBatis::new();\r
    // rb.link(MysqlDriver {},"mysql://root:123456@localhost:3306/test").await.unwrap();\r
    // rb.link(PgDriver {},"postgres://postgres:123456@localhost:5432/postgres").await.unwrap();\r
    // rb.link(MssqlDriver {},"mssql://SA:TestPass!123456@localhost:1433/test").await.unwrap();\r
    rb.link(\r
        SqliteDriver {},\r
        &format!("sqlite://{}target/sqlite.db", path),\r
    ).await.unwrap();\r
    let table: Option<BizActivity> = rb\r
        .exec_decode("select * from biz_activity limit ?", vec![to_value!(1)])\r
        .await\r
        .unwrap();\r
    let count: u64 = rb\r
        .exec_decode("select count(1) as count from biz_activity", vec![])\r
        .await\r
        .unwrap();\r
    sleep(Duration::from_secs(1)).await;\r
    println!(">>>>> table={:?}", table);\r
    println!(">>>>> count={}", count);\r
}\r
\`\`\`\r
\r
\r
#### \`HtmlSql\`\r
> It is implemented by RBatis a set of compatible MyBtais3 SQL editing language, support common such as if, Foreach, string interpolation\r
\r
* When the RBatis dependency in Cargo.toml turns on the \`\`\`debug_mode\`\`\` feature, the generated function implementation code is printed\r
* Language parsing -> Lexical analysis -> Syntax analysis -> generation of abstract syntax trees ->  translation to \`Rust\` code。Have the performance of native \`Rust\`\r
* Of course, PySql is also a syntax tree using HtmlSql,PySql will be Convert to HtmlSql\r
* It uses crates [rbs](https://crates.io/crates/rbs)  of   \`\`\`rbs::Value\`\`\` as the base object and operates on and any func\r
* you can call any method/trait on \`\`\`rbs::Value\`\`\` such as \`\`\` #{1 + 1}, #{arg}, #{arg [0]}, #{arg [0] + 'string'}  \`\`\` or  \`\`\`  if sql.contans('count'):   \`\`\`\r
* Strings can be reserved for Spaces using \`\`\` \` \`\`\` such as \`\`\` \` select * from table where \` \`\`\`\r
* method will create 2 variable on method body.So you can determine whether the variable SQL contains a COUNT statement or a SELECT statement in a paging operation\r
\r
* HtmlSql Syntax tree\r
\r
| Syntax/method                                                                                 | Generated \`Rust\` code                                                                               |\r
|-----------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|\r
| \`\`\` <trim prefixOverrides=" and">\` and name != '' \`</trim> \`\`\`                                | \`sql.trim(" and")                      \`                                                            |\r
| \`\`\` <if test="key == 'id'">\`select * from table\`</if> \`\`\`                                     | \`if  key == "id"{sql.push_str("select * from table");}                      \`                       |\r
| \`\`\` <foreach collection="arg" index="key" item="item" open="(" close=")" separator=","/>  \`\`\` | \`for (key,item) in arg{}               \`                                                            |\r
| \`\`\` <continue/>  \`\`\`                                                                          | \`for (key,item) in arg{ continue;}     \`                                                            |\r
| \`\`\` <set>  \`\`\`                                                                                | \`sql.trim("set ").push_str(" set ");        \`                                                       |\r
| \`\`\` <set collection="arg">  \`\`\`                                                               | \`sql.trim("set ").push_str(" set name=?,age=? "); //notice collection={name:"",age:""};           \` |\r
| \`\`\` <choose>  \`\`\`                                                                             | \`match {}                              \`                                                            |\r
| \`\`\` <when test="true">  \`\`\`                                                                   | \`match true{ true=>{} _ => {} }        \`                                                            |\r
| \`\`\` <otherwise>  \`\`\`                                                                          | \`match { _ =>{} }                      \`                                                            |\r
| \`\`\` <where>  \`\`\`                                                                              | \`sql.push_str("WHERE").trim("WHERE");       \`                                                       |\r
| \`\`\` <bind name="a" value="1+1"></bind> \`\`\`                                                    | \`let a = rbs::Value::I32(1 + 1)            \`                                                        |\r
| \`\`\` \`select * from table\`    \`\`\`                                                              | \`sql.push_str("select * from table"); \`                                                             |\r
| \`\`\` \`#{name}\`    \`\`\`                                                                          | \`sql.push_str("?");args.push(rbs::Value::String(name));\`                                            |\r
| \`\`\` \`\${name}\`     \`\`\`                                                                         | \`sql.push_str(&format!("{}",name));                    \`                                            |\r
| \`\`\` \`\${1 + 1}\`   \`\`\`                                                                          | \`sql.push_str(&format!("{}", 1 + 1));    \`                                                          |\r
| \`\`\` \`#{1 + 1}\`   \`\`\`                                                                          | \`sql.push_str("?");args.push(rbs::Value::from(1+1));\`                                               |\r
| \`\`\` \`\${name + '_tag'}\`  \`\`\`                                                                   | \`sql.push_str(&format!("{}",name + "_tag"));    \`                                                   |\r
| \`\`\` \`#{name + '_tag'}\`  \`\`\`                                                                   | \`sql.push_str("?");args.push(rbs::Value::from(format!("{}",name + "_tag")));    \`                   |\r
| \`\`\` \`\${age + 1}\`  \`\`\`                                                                         | \`sql.push_str(&format!("{}", age + 1));    \`                                                        |\r
| \`\`\` \`#{age + 1}\`  \`\`\`                                                                         | \`sql.push_str("?");args.push(rbs::Value::from(age+1));     \`                                        |\r
| \`\`\` \`\${true  & true}\`  \`\`\`                                                                    | \`sql.push_str(&format!("{}", true & true));    \`                                                    |\r
| \`\`\` \`#{true  & true}\`  \`\`\`                                                                    | \`sql.push_str("?");args.push(rbs::Value::from(true & true));    \`                                   |\r
| \`\`\` \`\${2 >  1}\`  \`\`\`                                                                          | \`sql.push_str(&format!("{}",2 >  1));    \`                                                          |\r
| \`\`\` \`\${2 /  1}\`  \`\`\`                                                                          | \`sql.push_str(&format!("{}", 2 / 1));    \`                                                          |\r
| \`\`\` \`\${2 ==  1}\`  \`\`\`                                                                         | \`sql.push_str(&format!("{}", 2 == 1));    \`                                                         |\r
| \`\`\` \`\${2 *  1}\`  \`\`\`                                                                          | \`sql.push_str(&format!("{}", 2 * 1));    \`                                                          |\r
| \`\`\` \`\${ !false }\`  \`\`\`                                                                        | \`sql.push_str(&format!("{}", !false));    \`                                                         |\r
| \`\`\` \`\${ 2 % 1 }\`  \`\`\`                                                                         | \`sql.push_str(&format!("{}", 2 % 1));    \`                                                          |\r
| \`\`\` \`\${ 2 - 1 }\`  \`\`\`                                                                         | \`sql.push_str(&format!("{}", 2 - 1));    \`                                                          |\r
* define on \`Rust\` code [see](https://github.com/rbatis/rbatis/blob/master/example/src/macro_proc_htmlsql.rs)\r
\`\`\`rust\r
// Clion Smart tips: click code, choose 'Inject Language or Reference', and then choose html\r
#[html_sql(r#"<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "https://raw.githubusercontent.com/rbatis/rbatis/master/rbatis-codegen/mybatis-3-mapper.dtd">\r
  <select id="select_by_condition">\r
        \`select * from biz_activity\`\r
        <where>\r
         <if test="a">\r
                \` and name like #{name}\`\r
            </if>\r
            <if test="name != ''">\r
                \` and name like #{name}\`\r
            </if>\r
            <if test="dt >= '2009-12-12 00:00:00'">\r
                \` and create_time < #{dt}\`\r
            </if>\r
            <choose>\r
                <when test="true">\r
                    \` and id != '-1'\`\r
                </when>\r
                <otherwise>and id != -2</otherwise>\r
            </choose>\r
            \` and \`\r
            <trim prefixOverrides=" and">\r
                \` and name != '' \`\r
            </trim>\r
        </where>\r
  </select>"#)]\r
async fn select_by_condition(rb: & dyn Executor, name: &str, dt: &DateTime) -> Vec<BizActivity> {\r
    impled!()\r
}\r
\`\`\`\r
\r
\r
* define on \`Rust\` from file [see](https://github.com/rbatis/rbatis/blob/master/example/src/macro_proc_htmlsql_file.rs)\r
\r
> example/example.html\r
\`\`\`html\r
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "https://raw.githubusercontent.com/rbatis/rbatis/master/rbatis-codegen/mybatis-3-mapper.dtd">\r
<mapper>\r
  <insert id="insert">\r
    \`insert into biz_activity\`\r
    <foreach collection="arg" index="key" item="item" open="(" close=")" separator=",">\r
      <if test="key == 'id'">\r
        <continue/>\r
      </if>\r
      \${key}\r
    </foreach>\r
    \` values \`\r
    <foreach collection="arg" index="key" item="item" open="(" close=")" separator=",">\r
      \${item}\r
    </foreach>\r
  </insert>\r
  <select id="select_by_condition">\r
    \`select * from biz_activity\`\r
    <where>\r
      <if test="name != ''">\r
        \` and name like #{name}\`\r
      </if>\r
      <if test="dt >= '2009-12-12 00:00:00'">\r
        \` and create_time < #{dt}\`\r
      </if>\r
      <choose>\r
        <when test="true">\r
          \` and id != '-1'\`\r
        </when>\r
        <otherwise>and id != -2</otherwise>\r
      </choose>\r
      \` and \`\r
      <trim prefixOverrides=" and">\r
        \` and name != '' \`\r
      </trim>\r
    </where>\r
  </select>\r
</mapper>\r
\`\`\`\r
\r
> rust code\r
\`\`\`rust\r
#[html_sql("example/example.html")]\r
async fn select_by_condition(rb: & dyn Executor, name: &str, dt: &DateTime) -> Vec<BizActivity> {\r
    impled!()\r
}\r
\`\`\`\r
\r
> rust code\r
\`\`\`rust\r
htmlsql!(select_by_condition(rb: & dyn Executor, name: &str, dt: &DateTime) -> rbatis::Result<Vec<BizActivity>> => "example.html");\r
\`\`\`\r
\r
##### Page\r
> impl html_sql select page.\r
\r
you must deal with 3 param:\r
(do_count:bool,page_no:u64,page_size:u64)\r
\r
you must deal with sql:\r
return Vec<Record>（if param do_count = false）\r
return u64（if param do_count = true）\r
\r
just like this exmaple:\r
   \`\`\`html\r
   <select id="select_page_data">\r
           \`select\`\r
           <if test="do_count == true">\r
               \` count(1) from table\`\r
           </if>\r
           <if test="do_count == false">\r
               \` * from table limit \${page_no},\${page_size}\`\r
           </if>\r
     </select>\r
   \`\`\`\r
\`\`\`rust\r
#[macro_use]\r
extern crate rbatis;\r
use rbatis::rbatis::RBatis;\r
use rbatis::rbdc::datetime::DateTime;\r
use rbatis::sql::PageRequest;\r
use rbdc_sqlite::SqliteDriver;\r
\r
htmlsql_select_page!(select_page_data(name: &str, dt: &DateTime) -> BizActivity => "example/example.html");\r
\r
#[tokio::main]\r
pub async fn main() {\r
    fast_log::init(fast_log::Config::new().console()).expect("rbatis init fail");\r
    let rb = RBatis::new();\r
    rb.link(SqliteDriver {}, &format!("sqlite://target/sqlite.db"))\r
        .await\r
        .unwrap();\r
    let a = select_page_data(&rb,&PageRequest::new(1, 10),"test",&DateTime::now().set_micro(0))\r
        .await\r
        .unwrap();\r
    println!("{:?}", a);\r
}\r
\`\`\`\r
\r
\r
##### Include\r
\r
\`\`\`<include>\`\`\` allows reference  SQL blocks and even SQL blocks from \`xxxx.html\` files, requiring \`\`\`refid\`\`\` to be specified for proper reference\r
\r
> step1.define \`\`\`<sql id="a">\` and id != '' \`</sql>\`\`\`\r
\r
> step2.use \`\`\` <include refid="a"></include> \`\`\` or \`\`\`<include refid="file://../rbatis/example/example.html?refid=a"></include>\`\`\`\r
\r
for example:\r
\`\`\`html\r
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "https://raw.githubusercontent.com/rbatis/rbatis/master/rbatis-codegen/mybatis-3-mapper.dtd">\r
<mapper>\r
    <sql id="a">\` and id != '' \`</sql>\r
    <select id="select_by_condition">\r
        \`select * from biz_activity\`\r
        <where>\r
            <include refid="a"></include>\r
            <include refid="file://../rbatis/example/example.html?refid=a"></include>\r
            <if test="name != ''">\r
                \` and name like #{name}\`\r
            </if>\r
            <if test="dt >= '2009-12-12 00:00:00'">\r
                \` and create_time < #{dt}\`\r
            </if>\r
            <choose>\r
                <when test="true">\r
                    \` and id != '-1'\`\r
                </when>\r
                <otherwise>and id != -2</otherwise>\r
            </choose>\r
            \` and \`\r
            <trim prefixOverrides=" and">\r
                \` and name != '' \`\r
            </trim>\r
        </where>\r
    </select>\r
</mapper>\r
\`\`\`\r
\r
#### \`PySql\`\r
\r
* It is a Python-like syntax, a language for manipulating SQL statements and inserting SQL parameters\r
* Syntax tree\r
\r
| Syntax/method                                                 | Generated \`Rust\` code                                                                                   |\r
|---------------------------------------------------------------|---------------------------------------------------------------------------------------------------------|\r
| \`trim 'AND ':      \`                                          | \`sql.trim_end_matches("AND ").trim_start_matches("AND ")       \`                                        |\r
| \`trim start='AND ':      \`                                    | \`sql.trim_start_matches("AND ")      \`                                                                  |\r
| \`trim end='AND ':      \`                                      | \`sql.trim_end_matches("AND ")      \`                                                                    |\r
| \`if arg!=1:         \`                                         | \`if arg !=1 {}               \`                                                                          |\r
| \`if true:\`<br/>   \`\`\`  \`select * from table\` \`\`\`              | \`\`\`if true { sql.push_str("select * from table");}  \`\`\`                                                 |\r
| \`for key,item in arg:      \`                                  | \`for (key,item) in arg{ }     \`                                                                         |\r
| \`for key,item in arg:\`<br/>  \`\`\`  \`and name = \${name}\`    \`\`\` | \`for (key,item) in arg{ sql.push_str(&format!("and name = {}",name)); }     \`                           |\r
| \`for key,item in arg:\`<br/>  \`\`\`  \`continue:\`            \`\`\`  | \`for (key,item) in arg{ continue; }      \`                                                              |\r
| \`set :                       \`                                | \`sql.push_str("SET")                \`                                                                   |\r
| \`set collection='ids':                       \`                | \`sql.trim("set ").push_str(" set name=?,age=? "); //let collection={name:"",age:""};                  \` |\r
| \`choose :                     \`                               | \`match {}                                \`                                                              |\r
| \`when :              \`                                        | \`match true{ true=>{} _ => {} }       \`                                                                 |\r
| \`otherwise :           \`                                      | \`match { _ =>{} }                    \`                                                                  |\r
| \`_:              \`                                            | \`match { _ =>{} }(v1.8.54 later)         \`                                                              |\r
| \`where :              \`                                       | \`sql.push_str("WHERE").trim("WHERE")    \`                                                               |\r
| \`bind a=1+1:       \`                                          | \`let a = rbs::Value::I32(1 + 1) \`                                                                       |\r
| \`let  a=1+1:     \`                                            | \`let a = rbs::Value::I32(1 + 1) \`  (v1.8.54 later)                                                      |\r
| \`\`\` \`select * from table\`    \`\`\`                              | \`sql.push_str("select * from table"); \`                                                                 |\r
| \`\`\` \`#{name}\`    \`\`\`                                          | \`sql.push_str("?");args.push(rbs::Value::String(name));\`                                                |\r
| \`\`\` \`\${name}\`     \`\`\`                                         | \`sql.push_str(&format!("{}",name));                    \`                                                |\r
| \`\`\` \`\${1 + 1}\`   \`\`\`                                          | \`sql.push_str(&format!("{}", 1 + 1));    \`                                                              |\r
| \`\`\` \`#{1 + 1}\`   \`\`\`                                          | \`sql.push_str("?");args.push(rbs::Value::from(1+1));\`                                                   |\r
| \`\`\` \`\${name + '_tag'}\`  \`\`\`                                   | \`sql.push_str(&format!("{}",name.to_string() + "_tag"));    \`                                           |\r
| \`\`\` \`#{name + '_tag'}\`  \`\`\`                                   | \`sql.push_str("?");args.push(rbs::Value::from(format!("{}",name + "_tag")));    \`                       |\r
| \`\`\` \`\${age + 1}\`  \`\`\`                                         | \`sql.push_str(&format!("{}", age + 1));    \`                                                            |\r
| \`\`\` \`#{age + 1}\`  \`\`\`                                         | \`sql.push_str("?");args.push(rbs::Value::from(age+1));     \`                                            |\r
| \`\`\` \`\${true  & true}\`  \`\`\`                                    | \`sql.push_str(&format!("{}", true & true));    \`                                                        |\r
| \`\`\` \`#{true  & true}\`  \`\`\`                                    | \`sql.push_str("?");args.push(rbs::Value::from(true & true));    \`                                       |\r
| \`\`\` \`\${2 >  1}\`  \`\`\`                                          | \`sql.push_str(&format!("{}",2 >  1));    \`                                                              |\r
| \`\`\` \`\${2 /  1}\`  \`\`\`                                          | \`sql.push_str(&format!("{}", 2 / 1));    \`                                                              |\r
| \`\`\` \`\${2 ==  1}\`  \`\`\`                                         | \`sql.push_str(&format!("{}", 2 == 1));    \`                                                             |\r
| \`\`\` \`\${2 *  1}\`  \`\`\`                                          | \`sql.push_str(&format!("{}", 2 * 1));    \`                                                              |\r
| \`\`\` \`\${ !false }\`  \`\`\`                                        | \`sql.push_str(&format!("{}", !false));    \`                                                             |\r
| \`\`\` \`\${ 2 % 1 }\`  \`\`\`                                         | \`sql.push_str(&format!("{}", 2 % 1));    \`                                                              |\r
| \`\`\` \`\${ 2 - 1 }\`  \`\`\`                                         | \`sql.push_str(&format!("{}", 2 - 1));    \`                                                              |\r
\r
\r
\r
\`\`\`rust\r
pub struct User{\r
    pub delete_flag:i32,\r
    pub name:String\r
}\r
\r
#[py_sql(\r
    "\`select * from user where delete_flag = 0\`\r
                  if name != '':\r
                    \` and name=#{name}\`"\r
)]\r
async fn py_select(rb: & dyn Executor, name: &str) -> Result<Vec<User>, Error> {\r
    impled!()\r
}\r
\`\`\`\r
\r
\`\`\`rust\r
pub struct User{\r
    pub delete_flag:i32,\r
    pub name:String\r
}\r
\r
pysql!(user_delete_by_name(rb: &dyn Executor, name: &str) -> Result<ExecResult, Error> =>\r
    "\`delete from user where delete_flag = 0\`\r
                   if name != '':\r
                     \` and name=#{name}\`" );\r
\r
impl User{\r
    pysql!(user_delete_by_name(rb: &dyn Executor, name: &str) -> Result<ExecResult, Error> =>\r
    "\`delete from user where delete_flag = 0\`\r
                   if name != '':\r
                     \` and name=#{name}\`" );\r
}\r
\r
\`\`\`\r
\r
#### plugin: table-sync\r
\r
> This IS a PLUGIN THAT SYNCHRONIZES THE TABLE STRUCTURE WITH THE TABLE STRUCTURE IN THE code, which I believe is VERY important in MOBILE DEVELOPMENT.\r
> Note that it does not change the table structure.\r
\r
* If the table does not exist, it is created\r
* If the table exists but a column is missing, increment the column of the missing section\r
\r
\`\`\`rust\r
use rbatis::rbatis::RBatis;\r
use rbatis::rbdc::datetime::DateTime;\r
use rbdc_sqlite::SqliteDriver;\r
use rbs::to_value;\r
\r
#[derive(Clone, Debug, serde::Serialize, serde::Deserialize)]\r
pub struct RBUser {\r
    pub id: i32,\r
    pub name: Option<String>,\r
    pub remark: Option<String>,\r
    pub create_time: Option<DateTime>,\r
    pub version: Option<i64>,\r
    pub delete_flag: Option<i32>,\r
}\r
\r
#[tokio::main]\r
pub async fn main() {\r
    fast_log::init(fast_log::Config::new().console()).expect("rbatis init fail");\r
    let rb = RBatis::new();\r
    // ------------choose database driver------------\r
    //rb.init(rbdc_mysql::MysqlDriver {}, "mysql://root:123456@localhost:3306/test").unwrap();\r
    // rb.init(rbdc_pg::PgDriver {}, "postgres://postgres:123456@localhost:5432/postgres").unwrap();\r
    // rb.init(rbdc_mssql::MssqlDriver {}, "mssql://SA:TestPass!123456@localhost:1433/test").unwrap();\r
    rb.init(SqliteDriver {}, &format!("sqlite://target/sqlite.db"))\r
        .unwrap();\r
    // ------------use rb as column mapper(or custom impl ColumnMapper)------------\r
    let map = rbs::to_value!{\r
            "id":"INT",\r
            "name":"TEXT",\r
     };\r
    let _ = RBatis::sync(&rb, &rb, &map, "rb_user").await;\r
\r
\r
    RBatis::sync(\r
        &rb.acquire().await.unwrap(),\r
        &rb,\r
        &RBUser {\r
            id: 0,\r
            //// Custom String Database Type\r
            //name: Some("TEXT".to_string()),\r
            name: Some("".to_string()),\r
            //// Custom String Database Type\r
            //remark: Some("TEXT".to_string()),\r
            remark: Some("".to_string()),\r
            create_time: Some(DateTime::utc()),\r
            version: Some(1),\r
            delete_flag: Some(1),\r
        },\r
        "rb_user",\r
    )\r
        .await\r
        .unwrap();\r
}\r
\r
\`\`\`\r
\r
\r
#### plugin: Intercept\r
\r
> Implementing an interface\r
\r
\`\`\`rust\r
use rbatis::{Error, RBatis};\r
use rbatis::executor::Executor;\r
use rbatis::intercept::{Intercept, ResultType};\r
use rbdc::db::ExecResult;\r
use rbs::Value;\r
#[derive(Debug)]\r
pub struct MyInterceptor{}\r
\r
impl Intercept for MyInterceptor {\r
    /// task_id maybe is conn_id or tx_id,\r
    /// is_prepared_sql = !args.is_empty(),\r
    ///\r
    /// if return None will be return result\r
    /// if return Some(true) will be run next intercept\r
    /// if return Some(false) will be break\r
    fn before(\r
        &self,\r
        _task_id: i64,\r
        _rb: &dyn Executor,\r
        _sql: &mut String,\r
        _args: &mut Vec<Value>,\r
        _result: ResultType<&mut Result<ExecResult, Error>, &mut Result<Vec<Value>, Error>>,\r
    ) -> Result<Option<bool>, Error> {\r
        Ok(Some(true))\r
    }\r
\r
    /// task_id maybe is conn_id or tx_id,\r
    /// is_prepared_sql = !args.is_empty(),\r
    ///\r
    /// if return None will be return result\r
    /// if return Some(true) will be run next intercept\r
    /// if return Some(false) will be break\r
    fn after(\r
        &self,\r
        _task_id: i64,\r
        _rb: &dyn Executor,\r
        _sql: &mut String,\r
        _args: &mut Vec<Value>,\r
        _result: ResultType<&mut Result<ExecResult, Error>, &mut Result<Vec<Value>, Error>>,\r
    ) -> Result<Option<bool>, Error> {\r
        Ok(Some(true))\r
    }\r
}\r
//push into RBatis\r
fn main(){\r
    let mut rb=RBatis::new();\r
    rb.intercepts.push(Arc::new(MyInterceptor{}) as Arc<dyn Intercept>);\r
}\r
\`\`\`\r
\r
\r
#### Plug-in: distributed unique ID (snowflake algorithm(i64))\r
\r
\`\`\`rust\r
    use rbatis::plugin::snowflake::new_snowflake_id;\r
    #[test]\r
    fn test_new_async_id() {\r
         //Snowflake::new()  //Snowflake::new(Must be a singleton or global variable)\r
         //default use\r
         println!("{}", new_snowflake_id().to_string());\r
    }\r
\`\`\`\r
\r
#### Plug-in: distributed unique ID (MongoDB object id algorithm(String/u128))\r
\r
\`\`\`rust\r
    #[test]\r
    async fn test_new_async_id() {\r
       println!("{}", rbatis::plugin::object_id::ObjectId::new().to_string());\r
    }\r
\`\`\`\r
\r
\r
\r
#### macro-built-in\r
\r
* \`\`\` make_table\`\`\`  Simplifies table construction by relying on the Default trait\r
* \`\`\` make_table_field_vec \`\`\` take the target Vec member attribute Vec collection\r
* \`\`\` make_table_field_map \`\`\`  Gets the HashMap collection of member attributes of the target Vec\r
\r
for example:\r
\`\`\`rust\r
    use rbatis::rbdc::datetime::DateTime;\r
    use serde::{Deserialize, Serialize};\r
    #[derive(Clone, Debug, Deserialize, Serialize)]\r
    pub struct BizActivity {\r
        pub id: Option<String>,\r
        pub name: Option<String>,\r
        pub pc_link: Option<String>,\r
        pub h5_link: Option<String>,\r
        pub pc_banner_img: Option<String>,\r
        pub h5_banner_img: Option<String>,\r
        pub sort: Option<String>,\r
        pub status: Option<i32>,\r
        pub remark: Option<String>,\r
        pub create_time: Option<DateTime>,\r
        pub version: Option<BigDecimal>,\r
        pub delete_flag: Option<i32>,\r
    }\r
\r
    impl Default for BizActivity {\r
        fn default() -> Self {\r
            Self {\r
                id: None,\r
                name: None,\r
                pc_link: None,\r
                h5_link: None,\r
                pc_banner_img: None,\r
                h5_banner_img: None,\r
                sort: None,\r
                status: None,\r
                remark: None,\r
                create_time: None,\r
                version: None,\r
                delete_flag: None,\r
            }\r
        }\r
    }\r
\r
    #[test]\r
    fn test_make_table() {\r
        let table = rbatis::make_table!(BizActivity{\r
              id:"1".to_string(),\r
        });\r
        println!("{:#?}", table);\r
    }\r
\r
    #[test]\r
    fn test_table_field_map() {\r
        let table = rbatis::make_table!(BizActivity{\r
              id:"1".to_string(),\r
              name:"a".to_string()\r
        });\r
        let table_vec = vec![table];\r
        let map = rbatis::make_table_field_map!(&table_vec,name);\r
        println!("{:#?}", map);\r
        assert_eq!(map.len(), table_vec.len());\r
    }\r
\r
    #[test]\r
    fn test_table_field_vec() {\r
        let table = rbatis::make_table!(BizActivity{\r
              id:"1".to_string(),\r
              name:"a".to_string()\r
        });\r
        let table_vec = vec![table];\r
        let names = rbatis::make_table_field_vec!(&table_vec,name);\r
        println!("{:#?}", names);\r
        assert_eq!(names.len(), table_vec.len());\r
    }\r
\`\`\`\r
\r
\r
#### design-driver\r
\r
* This doc is used to design a new database driver to join into rbatis\r
\r
* example see [rbdc-mssql](https://github.com/rbatis/rbatis/tree/master/rbdc-mssql)\r
\r
* step0: create your cargo project,and add 'rbdc = "4"' on Cargo.toml\r
\`\`\`\r
cargo new mock_driver --lib\r
\`\`\`\r
\r
* step1: add Depend,or add your database driver crates depend.\r
\`\`\`toml\r
rbdc = "4"\r
rbs  = "4"\r
fastdate = { version = "0.1" }\r
# xx_driver = {version = "xxx"}\r
\`\`\`\r
\r
* step2: define you driver struct\r
\`\`\`rust\r
#[derive(Debug, Clone)]\r
struct MockDriver {}\r
#[derive(Clone, Debug)]\r
struct MockRowMetaData {}\r
#[derive(Clone, Debug)]\r
struct MockRow {}\r
#[derive(Clone, Debug)]\r
struct MockConnection {}\r
#[derive(Clone, Debug)]\r
struct MockConnectOptions {}\r
\r
\`\`\`\r
\r
* step3: impl trait rbdc::db::{Driver, MetaData, Row, Connection, ConnectOptions, Placeholder};\r
\r
\`\`\`rust\r
use std::any::Any;\r
use futures_core::future::BoxFuture;\r
use rbdc::db::{Driver, MetaData, Row, Connection, ConnectOptions, Placeholder, ExecResult};\r
use rbdc::Error;\r
use rbs::Value;\r
\r
impl Driver for MockDriver {\r
    fn name(&self) -> &str {\r
        "MockDriver"\r
    }\r
    fn connect(&self, url: &str) -> BoxFuture<Result<Box<dyn Connection>, Error>> {\r
        let url = url.to_owned();\r
        Box::pin(async move {\r
            let conn = MockConnection {};\r
            Ok(Box::new(conn) as Box<dyn Connection>)\r
        })\r
    }\r
\r
    fn connect_opt<'a>(\r
        &'a self,\r
        opt: &'a dyn ConnectOptions,\r
    ) -> BoxFuture<Result<Box<dyn Connection>, Error>> {\r
        let opt = opt.downcast_ref::<MockConnectOptions>().unwrap();\r
        Box::pin(async move {\r
            let conn = MockConnection {};\r
            Ok(Box::new(conn) as Box<dyn Connection>)\r
        })\r
    }\r
\r
    fn default_option(&self) -> Box<dyn ConnectOptions> {\r
        Box::new(MockConnectOptions {})\r
    }\r
}\r
\r
impl MetaData for MockRowMetaData {\r
    fn column_len(&self) -> usize {  todo!() }\r
\r
    fn column_name(&self, i: usize) -> String {  todo!() }\r
\r
    fn column_type(&self, i: usize) -> String {  todo!() }\r
}\r
\r
impl Row for MockRow {\r
    fn meta_data(&self) -> Box<dyn MetaData> {  todo!() }\r
\r
    fn get(&mut self, i: usize) -> Result<Value, Error> {  todo!() }\r
}\r
\r
impl Connection for MockConnection {\r
    fn exec_rows(&mut self, sql: &str, params: Vec<Value>) -> BoxFuture<Result<Vec<Box<dyn Row>>, Error>> {  todo!() }\r
\r
    fn exec(&mut self, sql: &str, params: Vec<Value>) -> BoxFuture<Result<ExecResult, Error>> {  todo!() }\r
\r
    fn close(&mut self) -> BoxFuture<Result<(), Error>> {  todo!() }\r
\r
    fn ping(&mut self) -> BoxFuture<Result<(), Error>> {  todo!() }\r
}\r
\r
impl ConnectOptions for MockConnectOptions {\r
    fn connect(&self) -> BoxFuture<Result<Box<dyn Connection>, Error>> {  todo!() }\r
\r
    fn set_uri(&mut self, uri: &str) -> Result<(), Error> {  todo!() }\r
}\r
\r
impl Placeholder for MockDriver {\r
    fn exchange(&self, sql: &str) -> String {\r
        //return rbdc::impl_exchange("@P", 1, sql); //TODO if database not support sql Placeholder '?',replace '@1' to '?'\r
        return sql.to_string();//if database is support sql Placeholder '?'\r
    }\r
}\r
\`\`\`\r
\r
* step4: load your driver on rbatis\r
\r
\`\`\`rust\r
#[tokio::main]\r
async fn main(){\r
    let mut rb = RBatis::new();\r
    rb.init(MockDriver {}, "xxx://xxx.db").unwrap();\r
    rb.acquire().await.expect("connect database fail");\r
    println!("connect database successful");\r
}\r
\`\`\`\r
`,hd=`### rbatis-v4\r
\r
一个高性能的 SQL 工具包和编译时 ORM 库。一个异步、纯 \`Rust\` SQL 工具库，具有编译时动态 SQL 特性。\r
\r
它是一个 ORM，一个小型编译器，一个动态 SQL 语言。\r
\r
* 兼容大多数 mybatis3 语法。你可以将 Java 项目重构为 \`Rust\`！\r
* 无运行时，无垃圾回收，高性能，基于 Future/Tokio\r
* 零成本动态 SQL，使用（proc-macro、编译时、Cow减少不必要的克隆）技术实现。不需要 ONGL 引擎（mybatis）\r
* 类似 JDBC 的驱动设计，驱动使用 cargo.toml 依赖和 \`\`\`Box<dyn Driver>\`\`\` 分离\r
* 所有数据库驱动支持 \`\`\`#{arg}\`\`\`、\`\`\`\${arg}\`\`\`、\`\`\`?\`\`\` 占位符（pg/mssql 自动处理 '?' 转换为 '$1' 和 '@P1'）\r
* 动态 SQL（在 SQL 中自由编写代码）、分页、\`\`\`py_sql\`\`\` 查询语言和 \`\`\`html_sql\`\`\`（灵感来自 Mybatis）。\r
* 动态配置连接池（基于 https://github.com/rbatis/fast_pool）\r
* 支持基于拦截器实现的日志记录\r
* 100% 安全的纯 \`Rust\`，启用了 \`#![forbid(unsafe_code)]\`\r
* [rbatis/example](https://github.com/rbatis/example)\r
* [abs_admin 项目](https://github.com/rbatis/abs_admin) 一个后台用户管理系统（Vue.js+rbatis+axum）\r
* [salvo_admin 项目](https://github.com/feihua/salvo-admin) 一个后台权限管理系统（react+rbatis+salvo）\r
\r
\r
## Claude Code 集成\r
\r
本项目包含 Claude Code skill，用于 AI 辅助开发。使用方法请访问：[https://github.com/rbatis/rbatis-skill](https://github.com/rbatis/rbatis-skill)\r
\r
#### 支持的数据库驱动\r
\r
> RBatis 支持任何实现了 [rdbc](https://crates.io/crates/rbdc) 驱动的数据库。\r
> 如果你没有找到想要的驱动，你可以自己编写一个，只需要实现 \`\`\` rbdc::db::* \`\`\` trait 即可。\r
\r
| 数据库 (crates.io)                               | github 链接                                                                         |\r
|-------------------------------------------------|---------------------------------------------------------------------------------------|\r
| [Mysql](https://crates.io/crates/rbdc-mysql)        | [rbatis/rbdc-mysql](https://github.com/rbatis/rbatis/tree/master/rbdc-mysql)          |\r
| [Postgres](https://crates.io/crates/rbdc-pg)        | [rbatis/rbdc-pg](https://github.com/rbatis/rbatis/tree/master/rbdc-pg)                |\r
| [Sqlite](https://crates.io/crates/rbdc-sqlite)      | [rbatis/rbdc-sqlite](https://github.com/rbatis/rbatis/tree/master/rbdc-sqlite)        |\r
| [Mssql](https://crates.io/crates/rbdc-mssql)        | [rbatis/rbdc-mssql](https://github.com/rbatis/rbatis/tree/master/rbdc-mssql)          |\r
| [MariaDB](https://crates.io/crates/rbdc-mysql)      | [rbatis/rbdc-mysql](https://github.com/rbatis/rbatis/tree/master/rbdc-mysql)          |\r
| [TiDB](https://crates.io/crates/rbdc-mysql)         | [rbatis/rbdc-mysql](https://github.com/rbatis/rbatis/tree/master/rbdc-mysql)          |\r
| [CockroachDB](https://crates.io/crates/rbdc-pg)     | [rbatis/rbdc-pg](https://github.com/rbatis/rbatis/tree/master/rbdc-pg)                |\r
| [Oracle](https://crates.io/crates/rbdc-oracle)      | [chenpengfan/rbdc-oracle](https://github.com/chenpengfan/rbdc-oracle)                 |\r
| [TDengine](https://crates.io/crates/rbdc-tdengine)  | [tdcare/rbdc-tdengine](https://github.com/tdcare/rbdc-tdengine)                     |\r
\r
\r
#### CRUD 安装/使用\r
\r
* 安装步骤：修改 Cargo.toml（运行命令 \`cargo update\`）\r
\r
* \`toml\`（默认配置）\r
\r
\`\`\`toml\r
#rbatis deps\r
rbatis = { version = "4.8"}\r
rbs = { version = "4"}\r
rbdc-sqlite = { version = "4" }\r
#rbdc-mysql={version="4"}\r
#rbdc-pg={version="4"}\r
#rbdc-mssql={version="4"}\r
\r
serde = { version = "1", features = ["derive"] }\r
tokio = { version = "1", features = ["full"] }\r
log = "0.4"\r
fast_log = "1.6"\r
\`\`\`\r
\r
* \`toml\` \`native-tls\`（可选配置）\r
\r
\`\`\`toml\r
rbs = { version = "4" }\r
rbdc-sqlite = { version = "4", default-features = false, features = ["tls-native-tls"] }\r
#rbdc-mysql={version="4", default-features = false, features = ["tls-native-tls"]}\r
#rbdc-pg={version="4", default-features = false, features = ["tls-native-tls"]}\r
#rbdc-mssql={version="4", default-features = false, features = ["tls-native-tls"]}\r
rbatis = { version = "4.8" }\r
\r
serde = { version = "1", features = ["derive"] }\r
tokio = { version = "1", features = ["full"] }\r
log = "0.4"\r
fast_log = "1.6"\r
\`\`\`\r
\r
\r
\r
##### 表定义\r
\r
> RBatis 遵循简洁的代码风格，数据库表结构只是一个普通结构体，可以使用 RBatis 提供的数据库类型\r
> 我们使用 \`\`\`crud!()\`\`\` 宏使表结构具有查询和修改数据库的能力\r
> crud 宏提供：\`\`\`insert()\`\`\`、\`\`\`insert_batch()\`\`\`、\`\`\`select_by_map()\`\`\`、\`\`\`update_by_map()\`\`\`、\`\`\`delete_by_map()\`\`\` 等方法\r
\r
\`\`\`rust\r
use serde::{Deserialize, Serialize};\r
#[derive(Clone, Debug, Serialize, Deserialize)]\r
pub struct BizActivity {\r
    pub id: Option<String>,\r
    pub name: Option<String>,\r
    pub pc_link: Option<String>,\r
    pub h5_link: Option<String>,\r
    pub pc_banner_img: Option<String>,\r
    pub h5_banner_img: Option<String>,\r
    pub sort: Option<String>,\r
    pub status: Option<i32>,\r
    pub remark: Option<String>,\r
    pub create_time: Option<DateTime>,\r
    pub version: Option<i64>,\r
    pub delete_flag: Option<i32>,\r
}\r
//crud = async fn insert(...)+async fn  select_by_map(...)+ async fn  update_by_map(...)+async fn  delete_by_map(...)...and more\r
rbatis::crud!(BizActivity {});\r
\r
\`\`\`\r
\r
###### 自定义表名\r
\r
> rbatis 允许自定义表名\r
> 就像 SQL 一样 \`\`\`select * from \${table_name} \`\`\`\r
\`\`\`rust\r
rbatis::crud!(BizActivity {},"biz_activity");\r
\`\`\`\r
\r
###### 宏-插入\r
\r
\`\`\`rust\r
//#[macro_use] 定义在 'root crate' 或 'mod.rs' 或 'main.rs'\r
#[macro_use]\r
extern crate rbatis;\r
\r
\r
use rbatis::rbdc::datetime::DateTime;\r
use serde_json::json;\r
\r
/// table\r
#[derive(Clone, Debug, serde::Serialize, serde::Deserialize)]\r
pub struct BizActivity {\r
    pub id: Option<String>,\r
    pub name: Option<String>,\r
    pub pc_link: Option<String>,\r
    pub h5_link: Option<String>,\r
    pub pc_banner_img: Option<String>,\r
    pub h5_banner_img: Option<String>,\r
    pub sort: Option<String>,\r
    pub status: Option<i32>,\r
    pub remark: Option<String>,\r
    pub create_time: Option<DateTime>,\r
    pub version: Option<i64>,\r
    pub delete_flag: Option<i32>,\r
}\r
\r
crud!(BizActivity{});\r
\r
#[tokio::main]\r
async fn main() {\r
    /// enable log crate to show sql logs\r
    fast_log::init(fast_log::Config::new().console()).expect("rbatis init fail");\r
    /// initialize rbatis. also you can call rb.clone(). this is  an Arc point\r
    let rb = RBatis::new();\r
    /// connect to database\r
\r
    //init() just set driver\r
    //rb.init(rbdc_sqlite::SqliteDriver {}, "sqlite://target/sqlite.db" ).unwrap();\r
\r
    // link() will set driver and try use acquire() link database\r
    // sqlite\r
    rb.link(SqliteDriver {}, "sqlite://target/sqlite.db").await.unwrap();\r
    // mysql\r
    // rb.link(MysqlDriver{},"mysql://root:123456@localhost:3306/test").await.unwrap();\r
    // postgresql\r
    // rb.link(PgDriver{},"postgres://postgres:123456@localhost:5432/postgres").await.unwrap();\r
    // mssql/sqlserver\r
    // rb.link(MssqlDriver{},"jdbc:sqlserver://localhost:1433;User=SA;Password={TestPass!123456};Database=test").await.unwrap();\r
\r
    let table = BizActivity {\r
        id: Some("2".into()),\r
        name: Some("2".into()),\r
        pc_link: Some("2".into()),\r
        h5_link: Some("2".into()),\r
        pc_banner_img: None,\r
        h5_banner_img: None,\r
        sort: Some("2".to_string()),\r
        status: Some(2),\r
        remark: Some("2".into()),\r
        create_time: Some(DateTime::now()),\r
        version: Some(1),\r
        delete_flag: Some(1),\r
    };\r
    let tables = [table.clone(), {\r
        let mut t3 = table.clone();\r
        t3.id = "3".to_string().into();\r
        t3\r
    }];\r
\r
    let data = BizActivity::insert(&rb, &table).await;\r
    println!("insert = {}", json!(data));\r
\r
    let data = BizActivity::insert_batch(&rb, &tables, 10).await;\r
    println!("insert_batch = {}", json!(data));\r
}\r
\`\`\`\r
\r
###### 宏-更新\r
\r
\`\`\`rust\r
//#[macro_use] 定义在 'root crate' 或 'mod.rs' 或 'main.rs'\r
#[macro_use]\r
extern crate rbatis;\r
\r
\r
use rbatis::rbdc::datetime::DateTime;\r
use serde_json::json;\r
\r
#[derive(Clone, Debug, Serialize, Deserialize)]\r
pub struct BizActivity {\r
    pub id: Option<String>,\r
    pub name: Option<String>,\r
    pub pc_link: Option<String>,\r
    pub h5_link: Option<String>,\r
    pub pc_banner_img: Option<String>,\r
    pub h5_banner_img: Option<String>,\r
    pub sort: Option<String>,\r
    pub status: Option<i32>,\r
    pub remark: Option<String>,\r
    pub create_time: Option<DateTime>,\r
    pub version: Option<i64>,\r
    pub delete_flag: Option<i32>,\r
}\r
crud!(BizActivity{});\r
\r
#[tokio::main]\r
async fn main() {\r
    /// enable log crate to show sql logs\r
    fast_log::init(fast_log::Config::new().console()).expect("rbatis init fail");\r
    /// initialize rbatis. also you can call rb.clone(). this is  an Arc point\r
    let rb = RBatis::new();\r
    /// connect to database\r
\r
    //init() just set driver\r
    //rb.init(rbdc_sqlite::SqliteDriver {}, "sqlite://target/sqlite.db" ).unwrap();\r
\r
    // link() will set driver and try use acquire() link database\r
    // sqlite\r
    rb.link(SqliteDriver {}, "sqlite://target/sqlite.db").await.unwrap();\r
    // mysql\r
    // rb.link(MysqlDriver{},"mysql://root:123456@localhost:3306/test").await.unwrap();\r
    // postgresql\r
    // rb.link(PgDriver{},"postgres://postgres:123456@localhost:5432/postgres").await.unwrap();\r
    // mssql/sqlserver\r
    // rb.link(MssqlDriver{},"jdbc:sqlserver://localhost:1433;User=SA;Password={TestPass!123456};Database=test").await.unwrap();\r
\r
    let table = BizActivity {\r
        id: Some("2".into()),\r
        name: Some("2".into()),\r
        pc_link: Some("2".into()),\r
        h5_link: Some("2".into()),\r
        pc_banner_img: None,\r
        h5_banner_img: None,\r
        sort: None,\r
        status: Some(2),\r
        remark: Some("2".into()),\r
        create_time: Some(DateTime::now()),\r
        version: Some(1),\r
        delete_flag: Some(1),\r
    };\r
\r
    let data = BizActivity::update_by_map(&rb, &table, value!{"id":&table.id}).await;\r
    println!("update_by_map = {}", json!(data));\r
\r
}\r
\`\`\`\r
\r
###### 宏-查询\r
\r
\`\`\`rust\r
//#[macro_use] 定义在 'root crate' 或 'mod.rs' 或 'main.rs'\r
#[macro_use]\r
extern crate rbatis;\r
\r
\r
use rbatis::rbdc::datetime::DateTime;\r
use serde_json::json;\r
\r
#[derive(Clone, Debug, Serialize, Deserialize)]\r
pub struct BizActivity {\r
    pub id: Option<String>,\r
    pub name: Option<String>,\r
    pub pc_link: Option<String>,\r
    pub h5_link: Option<String>,\r
    pub pc_banner_img: Option<String>,\r
    pub h5_banner_img: Option<String>,\r
    pub sort: Option<String>,\r
    pub status: Option<i32>,\r
    pub remark: Option<String>,\r
    pub create_time: Option<DateTime>,\r
    pub version: Option<i64>,\r
    pub delete_flag: Option<i32>,\r
}\r
crud!(BizActivity{});\r
\r
#[tokio::main]\r
async fn main() {\r
    /// enable log crate to show sql logs\r
    fast_log::init(fast_log::Config::new().console()).expect("rbatis init fail");\r
    /// initialize rbatis. also you can call rb.clone(). this is  an Arc point\r
    let rb = RBatis::new();\r
    /// connect to database\r
\r
    //init() just set driver\r
    //rb.init(rbdc_sqlite::SqliteDriver {}, "sqlite://target/sqlite.db" ).unwrap();\r
\r
    // link() will set driver and try use acquire() link database\r
    // sqlite\r
    rb.link(SqliteDriver {}, "sqlite://target/sqlite.db").await.unwrap();\r
    // mysql\r
    // rb.link(MysqlDriver{},"mysql://root:123456@localhost:3306/test").await.unwrap();\r
    // postgresql\r
    // rb.link(PgDriver{},"postgres://postgres:123456@localhost:5432/postgres").await.unwrap();\r
    // mssql/sqlserver\r
    // rb.link(MssqlDriver{},"jdbc:sqlserver://localhost:1433;User=SA;Password={TestPass!123456};Database=test").await.unwrap();\r
\r
    let data = BizActivity::select_by_map(&rb, value!{"id":"1"}).await;\r
    println!("select_by_map = {}", json!(data));\r
}\r
\`\`\`\r
\r
\r
#### 调试模式\r
\r
如果你在 Cargo.toml 中启用了 "debug_mode" 功能，你将看到以下特性\r
\r
* 显示项目构建时生成的代码（\`rbatis_codgen\` 生成的代码）。你可以在构建日志中看到（\`............gen macro py_sql :............\`）\r
* 显示数据库 \`rows\` 数据。你可以看到日志（\`\`\`query <= len=1,rows=[{"id":1}]\`\`\`）\r
* 显示解码失败的无效类型字段。你可以查看错误信息（\`\`\`"invalid type: integer \`1\`, expected a string, key=\`status\`"\`\`\`）\r
\r
请注意，debug_mode 需要将日志级别设置为 'debug'\r
\r
> 如何在 Cargo.toml 中启用 debug_mode 功能？\r
\`\`\`toml\r
rbatis = { version = "4",features = ["debug_mode"]}\r
\`\`\`\r
\r
> 需要将 fast_log 设置为 Debug 级别\r
\`\`\`rust\r
#[tokio::main]\r
async fn main(){\r
    fast_log::init(fast_log::Config::new().console().level(log::LevelFilter::Debug));\r
}\r
\`\`\`\r
\r
\`\`\`log\r
cargo run\r
............gen macro py_sql :\r
 pub async fn do_select_all(\r
    rb: &dyn rbatis::executor::Executor,\r
    table_name: String,\r
) -> Result<Vec<BizActivity>, rbatis::rbdc::Error> {\r
    let mut rb_arg_map = rbs::value::map::ValueMap::new();\r
    rb_arg_map.insert(\r
        "table_name".to_string().into(),\r
        rbs::to_value(table_name).unwrap_or_default(),\r
    );\r
    {}\r
    use rbatis::executor::RBatisRef;\r
    let driver_type = rb.get_rbatis().driver_type()?;\r
    use rbatis::rbatis_codegen;\r
    pub fn do_select_all(arg: &rbs::Value, _tag: char) -> (String, Vec<rbs::Value>) {\r
        use rbatis_codegen::ops::*;\r
        let mut sql = String::with_capacity(1000);\r
        let mut args = Vec::with_capacity(20);\r
        sql.push_str(\r
            "select * from \${table_name}"\r
                .replacen("\${table_name}", &{ &arg["table_name"] }.as_sql(), 1)\r
                .as_str(),\r
        );\r
        rbatis_codegen::sql_index!(sql, _tag);\r
        return (sql, args);\r
    }\r
    let (mut sql, rb_args) = do_select_all(&rbs::Value::Map(rb_arg_map), '?');\r
    use rbatis::executor::Executor;\r
    let r = rb.query(&sql, rb_args).await?;\r
    rbatis::decode::decode(r)\r
}\r
............gen macro py_sql end............\r
\`\`\`\r
\r
\r
#### \`rbs\`\r
\r
\`rbs\` 是 rbatis 为 ORM 中间语言 \`html_sql\`、\`py_sql\` 编写的专用序列化框架，\r
用于在 HTML 语句中方便地使用和替换类似 JSON 的对象，而不是操作原生结构。\r
你可以将 \`rbs\` 理解为类似于 JSON \`Value\` 的中间结构。\r
\r
* 这里我们展示 \`rbs::Value\` 的定义\r
\`\`\`rust\r
#[derive(Clone, Debug, PartialEq)]\r
pub enum Value {\r
    /// null\r
    Null,\r
    /// true or false\r
    Bool(bool),\r
    /// Int32\r
    I32(i32),\r
    /// Int64\r
    I64(i64),\r
    /// Uint32\r
    U32(u32),\r
    /// Uint64\r
    U64(u64),\r
    /// A 32-bit float number.\r
    F32(f32),\r
    /// A 64-bit float number.\r
    F64(f64),\r
    /// String\r
    String(String),\r
    /// Binary/Bytes.\r
    Binary(Vec<u8>),\r
    /// Array/Vec.\r
    Array(Vec<Self>),\r
    /// Map<Key,Value>.\r
    Map(ValueMap),\r
    /// Extended implements Extension interface\r
    Ext(&'static str, Box<Self>),\r
}\r
\`\`\`\r
\r
*  rbs 构建 map 值\r
\`\`\`rust\r
fn main(){\r
    let v = rbs::to_value!{\r
        "key":"value",\r
        "key2":"value2"\r
    };\r
}\r
\`\`\`\r
\r
*  rbs 编码为 value\r
\`\`\`rust\r
fn main(){\r
    let v = rbs::to_value!(1);\r
    let arg = vec![1,2,3];\r
    let v = rbs::to_value!(&arg);\r
    let arg = "1".to_string();\r
    let v = rbs::to_value!(&arg);\r
}\r
\`\`\`\r
\r
*  rbs 从 value 解码\r
\`\`\`rust\r
fn main(){\r
    let v:i32 = rbs::from_value(Value::I32(1)).unwrap();\r
}\r
\`\`\`\r
\r
*  显示 value\r
\`\`\`rust\r
fn main(){\r
    let value = Value::I32(1);\r
    assert_eq!(value.to_string(),"1");\r
    assert_eq!(format!("{}",value),"1");\r
}\r
\`\`\`\r
\r
\r
#### 事务\r
\r
> 事务的本质是使用 SQL 语句 BEGIN、COMMIT 和 ROLLBACK。\r
> RBatis 提供这三个函数，还支持 \`\`\`defer_async()\`\`\` 来防止忘记提交\r
\r
示例请参见 [这里](https://github.com/rbatis/rbatis/blob/master/example/src/transaction.rs)\r
\r
\`\`\`rust\r
use serde::{Deserialize, Serialize};\r
#[derive(Clone, Debug, Serialize, Deserialize)]\r
pub struct BizActivity {\r
    pub id: Option<String>,\r
    pub name: Option<String>,\r
    pub pc_link: Option<String>,\r
    pub h5_link: Option<String>,\r
    pub pc_banner_img: Option<String>,\r
    pub h5_banner_img: Option<String>,\r
    pub sort: Option<String>,\r
    pub status: Option<i32>,\r
    pub remark: Option<String>,\r
    pub create_time: Option<DateTime>,\r
    pub version: Option<i64>,\r
    pub delete_flag: Option<i32>,\r
}\r
crud!(BizActivity{});\r
#[tokio::main]\r
pub async fn main() {\r
    let _ = fast_log::init(fast_log::Config::new().console()).expect("rbatis init fail");\r
    let rb = RBatis::new();\r
    // rb.link(MysqlDriver {},"mysql://root:123456@localhost:3306/test").await.unwrap();\r
    // rb.link(PgDriver {},"postgres://postgres:123456@localhost:5432/postgres").await.unwrap();\r
    // rb.link(MssqlDriver {},"mssql://SA:TestPass!123456@localhost:1433/test").await.unwrap();\r
    rb.link(\r
        SqliteDriver {},\r
        &format!("sqlite://{}target/sqlite.db", path),\r
    ).await.unwrap();\r
    let t = BizActivity {\r
        id: Some("2".into()),\r
        name: Some("2".into()),\r
        pc_link: Some("2".into()),\r
        h5_link: Some("2".into()),\r
        pc_banner_img: None,\r
        h5_banner_img: None,\r
        sort: None,\r
        status: Some(2),\r
        remark: Some("2".into()),\r
        create_time: Some(DateTime::now()),\r
        version: Some(1),\r
        delete_flag: Some(1),\r
    };\r
    let tx = rb.acquire_begin().await.unwrap();\r
    // defer_async will be rollback if tx drop\r
    // let mut tx = tx.defer_async(|mut tx| async move {\r
    //     if !tx.done() {\r
    //         tx.rollback().await.unwrap();\r
    //         println!("rollback");\r
    //     }\r
    // });\r
    //tx.exec("select 1", vec![]).await.unwrap();\r
    BizActivity::insert(& tx, &t).await.unwrap();\r
\r
    tx.commit().await.unwrap();\r
    tx.rollback().await.unwrap();\r
}\r
\`\`\`\r
\r
\r
#### 原生 SQL\r
\r
> RBatis 也支持编写数据库的原始语句\r
> RBatis 提供的驱动都支持占位符 '?'，因此你可以在 Postgres/mssql 等数据库上使用 '?'\r
\r
\`\`\`rust\r
use rbs::to_value;\r
use std::time::Duration;\r
use tokio::time::sleep;\r
use serde::{Deserialize, Serialize};\r
#[derive(Clone, Debug, Serialize, Deserialize)]\r
pub struct BizActivity {\r
    pub id: Option<String>,\r
    pub name: Option<String>,\r
    pub pc_link: Option<String>,\r
    pub h5_link: Option<String>,\r
    pub pc_banner_img: Option<String>,\r
    pub h5_banner_img: Option<String>,\r
    pub sort: Option<String>,\r
    pub status: Option<i32>,\r
    pub remark: Option<String>,\r
    pub create_time: Option<DateTime>,\r
    pub version: Option<i64>,\r
    pub delete_flag: Option<i32>,\r
}\r
#[tokio::main]\r
pub async fn main() {\r
    fast_log::init(fast_log::Config::new().console()).expect("rbatis init fail");\r
     let rb = RBatis::new();\r
    // rb.link(MysqlDriver {},"mysql://root:123456@localhost:3306/test").await.unwrap();\r
    // rb.link(PgDriver {},"postgres://postgres:123456@localhost:5432/postgres").await.unwrap();\r
    // rb.link(MssqlDriver {},"mssql://SA:TestPass!123456@localhost:1433/test").await.unwrap();\r
    rb.link(\r
        SqliteDriver {},\r
        &format!("sqlite://{}target/sqlite.db", path),\r
    ).await.unwrap();\r
    let table: Option<BizActivity> = rb\r
        .exec_decode("select * from biz_activity limit ?", vec![to_value!(1)])\r
        .await\r
        .unwrap();\r
    let count: u64 = rb\r
        .exec_decode("select count(1) as count from biz_activity", vec![])\r
        .await\r
        .unwrap();\r
    sleep(Duration::from_secs(1)).await;\r
    println!(">>>>> table={:?}", table);\r
    println!(">>>>> count={}", count);\r
}\r
\`\`\`\r
\r
\r
#### \`HtmlSql\`\r
\r
> 这是 RBatis 实现的一套兼容 MyBtais3 的 SQL 编辑语言，支持 if、Foreach、字符串插值等常用功能\r
\r
* 当 Cargo.toml 中 RBatis 依赖开启了 \`\`\`debug_mode\`\`\` 功能时，会打印生成的函数实现代码\r
* 语言解析 -> 词法分析 -> 语法分析 -> 生成抽象语法树 -> 转换为 \`Rust\` 代码。具有原生 \`Rust\` 的性能\r
* 当然，PySql 也是使用 HtmlSql 作为语法树，PySql 会被转换为 HtmlSql\r
* 它使用 crates [rbs](https://crates.io/crates/rbs) 中的 \`\`\`rbs::Value\`\`\` 作为基础对象，可以对其执行任何操作和调用任何方法\r
* 你可以在 \`\`\`rbs::Value\`\`\` 上调用任何方法/trait，例如 \`\`\` #{1 + 1}, #{arg}, #{arg [0]}, #{arg [0] + 'string'} \`\`\` 或 \`\`\` if sql.contans('count'): \`\`\`\r
* 可以使用反引号 \`\`\` \` \`\`\` 保留字符串中的空格，例如 \`\`\` \` select * from table where \` \`\`\`\r
* 方法会在方法体中创建 2 个变量。因此你可以在分页操作中判断变量 SQL 是否包含 COUNT 语句或 SELECT 语句\r
\r
* HtmlSql 语法树\r
\r
| 语法/方法                                                                                     | 生成的 \`Rust\` 代码                                                                               |\r
|-----------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|\r
| \`\`\` <trim prefixOverrides=" and">\` and name != '' \`</trim> \`\`\`                                | \`sql.trim(" and")                      \`                                                            |\r
| \`\`\` <if test="key == 'id'">\`select * from table\`</if> \`\`\`                                     | \`if  key == "id"{sql.push_str("select * from table");}                      \`                       |\r
| \`\`\` <foreach collection="arg" index="key" item="item" open="(" close=")" separator=","/>  \`\`\` | \`for (key,item) in arg{}               \`                                                            |\r
| \`\`\` <continue/>  \`\`\`                                                                          | \`for (key,item) in arg{ continue;}     \`                                                            |\r
| \`\`\` <set>  \`\`\`                                                                                | \`sql.trim("set ").push_str(" set ");        \`                                                       |\r
| \`\`\` <set collection="arg">  \`\`\`                                                               | \`sql.trim("set ").push_str(" set name=?,age=? "); //notice collection={name:"",age:""};           \` |\r
| \`\`\` <choose>  \`\`\`                                                                             | \`match {}                              \`                                                            |\r
| \`\`\` <when test="true">  \`\`\`                                                                   | \`match true{ true=>{} _ => {} }        \`                                                            |\r
| \`\`\` <otherwise>  \`\`\`                                                                          | \`match { _ =>{} }                      \`                                                            |\r
| \`\`\` <where>  \`\`\`                                                                              | \`sql.push_str("WHERE").trim("WHERE");       \`                                                       |\r
| \`\`\` <bind name="a" value="1+1"></bind> \`\`\`                                                    | \`let a = rbs::Value::I32(1 + 1)            \`                                                        |\r
| \`\`\` \`select * from table\`    \`\`\`                                                              | \`sql.push_str("select * from table"); \`                                                             |\r
| \`\`\` \`#{name}\`    \`\`\`                                                                          | \`sql.push_str("?");args.push(rbs::Value::String(name));\`                                            |\r
| \`\`\` \`\${name}\`     \`\`\`                                                                         | \`sql.push_str(&format!("{}",name));                    \`                                            |\r
| \`\`\` \`\${1 + 1}\`   \`\`\`                                                                          | \`sql.push_str(&format!("{}", 1 + 1));    \`                                                          |\r
| \`\`\` \`#{1 + 1}\`   \`\`\`                                                                          | \`sql.push_str("?");args.push(rbs::Value::from(1+1));\`                                               |\r
| \`\`\` \`\${name + '_tag'}\`  \`\`\`                                                                   | \`sql.push_str(&format!("{}",name + "_tag"));    \`                                                   |\r
| \`\`\` \`#{name + '_tag'}\`  \`\`\`                                                                   | \`sql.push_str("?");args.push(rbs::Value::from(format!("{}",name + "_tag")));    \`                   |\r
| \`\`\` \`\${age + 1}\`  \`\`\`                                                                         | \`sql.push_str(&format!("{}", age + 1));    \`                                                        |\r
| \`\`\` \`#{age + 1}\`  \`\`\`                                                                         | \`sql.push_str("?");args.push(rbs::Value::from(age+1));     \`                                        |\r
| \`\`\` \`\${true  & true}\`  \`\`\`                                                                    | \`sql.push_str(&format!("{}", true & true));    \`                                                    |\r
| \`\`\` \`#{true  & true}\`  \`\`\`                                                                    | \`sql.push_str("?");args.push(rbs::Value::from(true & true));    \`                                   |\r
| \`\`\` \`\${2 >  1}\`  \`\`\`                                                                          | \`sql.push_str(&format!("{}",2 >  1));    \`                                                          |\r
| \`\`\` \`\${2 /  1}\`  \`\`\`                                                                          | \`sql.push_str(&format!("{}", 2 / 1));    \`                                                          |\r
| \`\`\` \`\${2 ==  1}\`  \`\`\`                                                                         | \`sql.push_str(&format!("{}", 2 == 1));    \`                                                         |\r
| \`\`\` \`\${2 *  1}\`  \`\`\`                                                                          | \`sql.push_str(&format!("{}", 2 * 1));    \`                                                          |\r
| \`\`\` \`\${ !false }\`  \`\`\`                                                                        | \`sql.push_str(&format!("{}", !false));    \`                                                         |\r
| \`\`\` \`\${ 2 % 1 }\`  \`\`\`                                                                         | \`sql.push_str(&format!("{}", 2 % 1));    \`                                                          |\r
| \`\`\` \`\${ 2 - 1 }\`  \`\`\`                                                                         | \`sql.push_str(&format!("{}", 2 - 1));    \`                                                          |\r
* 在 \`Rust\` 代码中定义请参见 [这里](https://github.com/rbatis/rbatis/blob/master/example/src/macro_proc_htmlsql.rs)\r
\`\`\`rust\r
// Clion Smart tips: click code, choose 'Inject Language or Reference', and then choose html\r
#[html_sql(r#"<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "https://raw.githubusercontent.com/rbatis/rbatis/master/rbatis-codegen/mybatis-3-mapper.dtd">\r
  <select id="select_by_condition">\r
        \`select * from biz_activity\`\r
        <where>\r
         <if test="a">\r
                \` and name like #{name}\`\r
            </if>\r
            <if test="name != ''">\r
                \` and name like #{name}\`\r
            </if>\r
            <if test="dt >= '2009-12-12 00:00:00'">\r
                \` and create_time < #{dt}\`\r
            </if>\r
            <choose>\r
                <when test="true">\r
                    \` and id != '-1'\`\r
                </when>\r
                <otherwise>and id != -2</otherwise>\r
            </choose>\r
            \` and \`\r
            <trim prefixOverrides=" and">\r
                \` and name != '' \`\r
            </trim>\r
        </where>\r
  </select>"#)]\r
async fn select_by_condition(rb: & dyn Executor, name: &str, dt: &DateTime) -> Vec<BizActivity> {\r
    impled!()\r
}\r
\`\`\`\r
\r
\r
* 在 \`Rust\` 中从文件定义请参见 [这里](https://github.com/rbatis/rbatis/blob/master/example/src/macro_proc_htmlsql_file.rs)\r
\r
> example/example.html\r
\`\`\`html\r
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "https://raw.githubusercontent.com/rbatis/rbatis/master/rbatis-codegen/mybatis-3-mapper.dtd">\r
<mapper>\r
  <insert id="insert">\r
    \`insert into biz_activity\`\r
    <foreach collection="arg" index="key" item="item" open="(" close=")" separator=",">\r
      <if test="key == 'id'">\r
        <continue/>\r
      </if>\r
      \${key}\r
    </foreach>\r
    \` values \`\r
    <foreach collection="arg" index="key" item="item" open="(" close=")" separator=",">\r
      \${item}\r
    </foreach>\r
  </insert>\r
  <select id="select_by_condition">\r
    \`select * from biz_activity\`\r
    <where>\r
      <if test="name != ''">\r
        \` and name like #{name}\`\r
      </if>\r
      <if test="dt >= '2009-12-12 00:00:00'">\r
        \` and create_time < #{dt}\`\r
      </if>\r
      <choose>\r
        <when test="true">\r
          \` and id != '-1'\`\r
        </when>\r
        <otherwise>and id != -2</otherwise>\r
      </choose>\r
      \` and \`\r
      <trim prefixOverrides=" and">\r
        \` and name != '' \`\r
      </trim>\r
    </where>\r
  </select>\r
</mapper>\r
\`\`\`\r
\r
> rust 代码\r
\`\`\`rust\r
#[html_sql("example/example.html")]\r
async fn select_by_condition(rb: & dyn Executor, name: &str, dt: &DateTime) -> Vec<BizActivity> {\r
    impled!()\r
}\r
\`\`\`\r
\r
> rust 代码\r
\`\`\`rust\r
htmlsql!(select_by_condition(rb: & dyn Executor, name: &str, dt: &DateTime) -> rbatis::Result<Vec<BizActivity>> => "example.html");\r
\`\`\`\r
\r
##### 分页\r
\r
> 实现 html_sql 分页查询。\r
\r
你必须处理 3 个参数：\r
(do_count:bool, page_no:u64, page_size:u64)\r
\r
你必须处理 SQL：\r
返回 Vec<Record>（如果参数 do_count = false）\r
返回 u64（如果参数 do_count = true）\r
\r
就像这个例子：\r
   \`\`\`html\r
   <select id="select_page_data">\r
           \`select\`\r
           <if test="do_count == true">\r
               \` count(1) from table\`\r
           </if>\r
           <if test="do_count == false">\r
               \` * from table limit \${page_no},\${page_size}\`\r
           </if>\r
     </select>\r
   \`\`\`\r
\`\`\`rust\r
#[macro_use]\r
extern crate rbatis;\r
use rbatis::rbatis::RBatis;\r
use rbatis::rbdc::datetime::DateTime;\r
use rbatis::sql::PageRequest;\r
use rbdc_sqlite::SqliteDriver;\r
\r
htmlsql_select_page!(select_page_data(name: &str, dt: &DateTime) -> BizActivity => "example/example.html");\r
\r
#[tokio::main]\r
pub async fn main() {\r
    fast_log::init(fast_log::Config::new().console()).expect("rbatis init fail");\r
    let rb = RBatis::new();\r
    rb.link(SqliteDriver {}, &format!("sqlite://target/sqlite.db"))\r
        .await\r
        .unwrap();\r
    let a = select_page_data(&rb,&PageRequest::new(1, 10),"test",&DateTime::now().set_micro(0))\r
        .await\r
        .unwrap();\r
    println!("{:?}", a);\r
}\r
\`\`\`\r
\r
\r
##### 包含\r
\r
\`\`\`<include>\`\`\` 允许引用 SQL 块，甚至来自 \`xxxx.html\` 文件的 SQL 块，需要指定 \`\`\`refid\`\`\` 才能正确引用\r
\r
> 步骤1. 定义 \`\`\`<sql id="a">\` and id != '' \`</sql>\`\`\`\r
\r
> 步骤2. 使用 \`\`\` <include refid="a"></include> \`\`\` 或 \`\`\`<include refid="file://../rbatis/example/example.html?refid=a"></include>\`\`\`\r
\r
例如：\r
\`\`\`html\r
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "https://raw.githubusercontent.com/rbatis/rbatis/master/rbatis-codegen/mybatis-3-mapper.dtd">\r
<mapper>\r
    <sql id="a">\` and id != '' \`</sql>\r
    <select id="select_by_condition">\r
        \`select * from biz_activity\`\r
        <where>\r
            <include refid="a"></include>\r
            <include refid="file://../rbatis/example/example.html?refid=a"></include>\r
            <if test="name != ''">\r
                \` and name like #{name}\`\r
            </if>\r
            <if test="dt >= '2009-12-12 00:00:00'">\r
                \` and create_time < #{dt}\`\r
            </if>\r
            <choose>\r
                <when test="true">\r
                    \` and id != '-1'\`\r
                </when>\r
                <otherwise>and id != -2</otherwise>\r
            </choose>\r
            \` and \`\r
            <trim prefixOverrides=" and">\r
                \` and name != '' \`\r
            </trim>\r
        </where>\r
    </select>\r
</mapper>\r
\`\`\`\r
\r
#### \`PySql\`\r
\r
* 这是一种类似 Python 的语法，用于操作 SQL 语句和插入 SQL 参数\r
* 语法树\r
\r
| 语法/方法                                                 | 生成的 \`Rust\` 代码                                                                                   |\r
|---------------------------------------------------------------|---------------------------------------------------------------------------------------------------------|\r
| \`trim 'AND ':      \`                                          | \`sql.trim_end_matches("AND ").trim_start_matches("AND ")       \`                                        |\r
| \`trim start='AND ':      \`                                    | \`sql.trim_start_matches("AND ")      \`                                                                  |\r
| \`trim end='AND ':      \`                                      | \`sql.trim_end_matches("AND ")      \`                                                                    |\r
| \`if arg!=1:         \`                                         | \`if arg !=1 {}               \`                                                                          |\r
| \`if true:\`<br/>   \`\`\`  \`select * from table\` \`\`\`              | \`\`\`if true { sql.push_str("select * from table");}  \`\`\`                                                 |\r
| \`for key,item in arg:      \`                                  | \`for (key,item) in arg{ }     \`                                                                         |\r
| \`for key,item in arg:\`<br/>  \`\`\`  \`and name = \${name}\`    \`\`\` | \`for (key,item) in arg{ sql.push_str(&format!("and name = {}",name)); }     \`                           |\r
| \`for key,item in arg:\`<br/>  \`\`\`  \`continue:\`            \`\`\`  | \`for (key,item) in arg{ continue; }      \`                                                              |\r
| \`set :                       \`                                | \`sql.push_str("SET")                \`                                                                   |\r
| \`set collection='ids':                       \`                | \`sql.trim("set ").push_str(" set name=?,age=? "); //let collection={name:"",age:""};                  \` |\r
| \`choose :                     \`                               | \`match {}                                \`                                                              |\r
| \`when :              \`                                        | \`match true{ true=>{} _ => {} }       \`                                                                 |\r
| \`otherwise :           \`                                      | \`match { _ =>{} }                    \`                                                                  |\r
| \`_:              \`                                            | \`match { _ =>{} }(v1.8.54 later)         \`                                                              |\r
| \`where :              \`                                       | \`sql.push_str("WHERE").trim("WHERE")    \`                                                               |\r
| \`bind a=1+1:       \`                                          | \`let a = rbs::Value::I32(1 + 1) \`                                                                       |\r
| \`let  a=1+1:     \`                                            | \`let a = rbs::Value::I32(1 + 1) \`  (v1.8.54 later)                                                      |\r
| \`\`\` \`select * from table\`    \`\`\`                              | \`sql.push_str("select * from table"); \`                                                                 |\r
| \`\`\` \`#{name}\`    \`\`\`                                          | \`sql.push_str("?");args.push(rbs::Value::String(name));\`                                                |\r
| \`\`\` \`\${name}\`     \`\`\`                                         | \`sql.push_str(&format!("{}",name));                    \`                                                |\r
| \`\`\` \`\${1 + 1}\`   \`\`\`                                          | \`sql.push_str(&format!("{}", 1 + 1));    \`                                                              |\r
| \`\`\` \`#{1 + 1}\`   \`\`\`                                          | \`sql.push_str("?");args.push(rbs::Value::from(1+1));\`                                                   |\r
| \`\`\` \`\${name + '_tag'}\`  \`\`\`                                   | \`sql.push_str(&format!("{}",name.to_string() + "_tag"));    \`                                           |\r
| \`\`\` \`#{name + '_tag'}\`  \`\`\`                                   | \`sql.push_str("?");args.push(rbs::Value::from(format!("{}",name + "_tag")));    \`                       |\r
| \`\`\` \`\${age + 1}\`  \`\`\`                                         | \`sql.push_str(&format!("{}", age + 1));    \`                                                            |\r
| \`\`\` \`#{age + 1}\`  \`\`\`                                         | \`sql.push_str("?");args.push(rbs::Value::from(age+1));     \`                                            |\r
| \`\`\` \`\${true  & true}\`  \`\`\`                                    | \`sql.push_str(&format!("{}", true & true));    \`                                                        |\r
| \`\`\` \`#{true  & true}\`  \`\`\`                                    | \`sql.push_str("?");args.push(rbs::Value::from(true & true));    \`                                       |\r
| \`\`\` \`\${2 >  1}\`  \`\`\`                                          | \`sql.push_str(&format!("{}",2 >  1));    \`                                                              |\r
| \`\`\` \`\${2 /  1}\`  \`\`\`                                          | \`sql.push_str(&format!("{}", 2 / 1));    \`                                                              |\r
| \`\`\` \`\${2 ==  1}\`  \`\`\`                                         | \`sql.push_str(&format!("{}", 2 == 1));    \`                                                             |\r
| \`\`\` \`\${2 *  1}\`  \`\`\`                                          | \`sql.push_str(&format!("{}", 2 * 1));    \`                                                              |\r
| \`\`\` \`\${ !false }\`  \`\`\`                                        | \`sql.push_str(&format!("{}", !false));    \`                                                             |\r
| \`\`\` \`\${ 2 % 1 }\`  \`\`\`                                         | \`sql.push_str(&format!("{}", 2 % 1));    \`                                                              |\r
| \`\`\` \`\${ 2 - 1 }\`  \`\`\`                                         | \`sql.push_str(&format!("{}", 2 - 1));    \`                                                              |\r
\r
\r
\r
\`\`\`rust\r
pub struct User{\r
    pub delete_flag:i32,\r
    pub name:String\r
}\r
\r
#[py_sql(\r
    "\`select * from user where delete_flag = 0\`\r
                  if name != '':\r
                    \` and name=#{name}\`"\r
)]\r
async fn py_select(rb: & dyn Executor, name: &str) -> Result<Vec<User>, Error> {\r
    impled!()\r
}\r
\`\`\`\r
\r
\`\`\`rust\r
pub struct User{\r
    pub delete_flag:i32,\r
    pub name:String\r
}\r
\r
pysql!(user_delete_by_name(rb: &dyn Executor, name: &str) -> Result<ExecResult, Error> =>\r
    "\`delete from user where delete_flag = 0\`\r
                   if name != '':\r
                     \` and name=#{name}\`" );\r
\r
impl User{\r
    pysql!(user_delete_by_name(rb: &dyn Executor, name: &str) -> Result<ExecResult, Error> =>\r
    "\`delete from user where delete_flag = 0\`\r
                   if name != '':\r
                     \` and name=#{name}\`" );\r
}\r
\r
\`\`\`\r
\r
#### 插件：表同步\r
\r
> 这是一个将表结构与代码中的表结构同步的插件，我认为这在移动开发中非常重要。\r
> 请注意，它不会改变表结构。\r
\r
* 如果表不存在，则创建\r
* 如果表存在但缺少列，则增量添加缺少的列\r
\r
\`\`\`rust\r
use rbatis::rbatis::RBatis;\r
use rbatis::rbdc::datetime::DateTime;\r
use rbdc_sqlite::SqliteDriver;\r
use rbs::to_value;\r
\r
#[derive(Clone, Debug, serde::Serialize, serde::Deserialize)]\r
pub struct RBUser {\r
    pub id: i32,\r
    pub name: Option<String>,\r
    pub remark: Option<String>,\r
    pub create_time: Option<DateTime>,\r
    pub version: Option<i64>,\r
    pub delete_flag: Option<i32>,\r
}\r
\r
#[tokio::main]\r
pub async fn main() {\r
    fast_log::init(fast_log::Config::new().console()).expect("rbatis init fail");\r
    let rb = RBatis::new();\r
    // ------------choose database driver------------\r
    //rb.init(rbdc_mysql::MysqlDriver {}, "mysql://root:123456@localhost:3306/test").unwrap();\r
    // rb.init(rbdc_pg::PgDriver {}, "postgres://postgres:123456@localhost:5432/postgres").unwrap();\r
    // rb.init(rbdc_mssql::MssqlDriver {}, "mssql://SA:TestPass!123456@localhost:1433/test").unwrap();\r
    rb.init(SqliteDriver {}, &format!("sqlite://target/sqlite.db"))\r
        .unwrap();\r
    // ------------直接用 &rb 作 column mapper（也可以自定义 impl ColumnMapper）------------\r
    let map = rbs::to_value!{\r
            "id":"INT",\r
            "name":"TEXT",\r
     };\r
    let _ = RBatis::sync(&rb, &rb, &map, "rb_user").await;\r
\r
\r
    RBatis::sync(\r
        &rb.acquire().await.unwrap(),\r
        &rb,\r
        &RBUser {\r
            id: 0,\r
            //// Custom String Database Type\r
            //name: Some("TEXT".to_string()),\r
            name: Some("".to_string()),\r
            //// Custom String Database Type\r
            //remark: Some("TEXT".to_string()),\r
            remark: Some("".to_string()),\r
            create_time: Some(DateTime::utc()),\r
            version: Some(1),\r
            delete_flag: Some(1),\r
        },\r
        "rb_user",\r
    )\r
        .await\r
        .unwrap();\r
}\r
\r
\`\`\`\r
\r
\r
#### 插件：拦截器\r
\r
> 实现一个接口\r
\r
\`\`\`rust\r
use rbatis::{Error, RBatis};\r
use rbatis::executor::Executor;\r
use rbatis::intercept::{Intercept, ResultType};\r
use rbdc::db::ExecResult;\r
use rbs::Value;\r
#[derive(Debug)]\r
pub struct MyInterceptor{}\r
\r
impl Intercept for MyInterceptor {\r
    /// task_id maybe is conn_id or tx_id,\r
    /// is_prepared_sql = !args.is_empty(),\r
    ///\r
    /// if return None will be return result\r
    /// if return Some(true) will be run next intercept\r
    /// if return Some(false) will be break\r
    fn before(\r
        &self,\r
        _task_id: i64,\r
        _rb: &dyn Executor,\r
        _sql: &mut String,\r
        _args: &mut Vec<Value>,\r
        _result: ResultType<&mut Result<ExecResult, Error>, &mut Result<Vec<Value>, Error>>,\r
    ) -> Result<Option<bool>, Error> {\r
        Ok(Some(true))\r
    }\r
\r
    /// task_id maybe is conn_id or tx_id,\r
    /// is_prepared_sql = !args.is_empty(),\r
    ///\r
    /// if return None will be return result\r
    /// if return Some(true) will be run next intercept\r
    /// if return Some(false) will be break\r
    fn after(\r
        &self,\r
        _task_id: i64,\r
        _rb: &dyn Executor,\r
        _sql: &mut String,\r
        _args: &mut Vec<Value>,\r
        _result: ResultType<&mut Result<ExecResult, Error>, &mut Result<Vec<Value>, Error>>,\r
    ) -> Result<Option<bool>, Error> {\r
        Ok(Some(true))\r
    }\r
}\r
//push into RBatis\r
fn main(){\r
    let mut rb=RBatis::new();\r
    rb.intercepts.push(Arc::new(MyInterceptor{}) as Arc<dyn Intercept>);\r
}\r
\`\`\`\r
\r
\r
#### 插件：分布式唯一ID（雪花算法(i64)）\r
\r
\`\`\`rust\r
    use rbatis::plugin::snowflake::new_snowflake_id;\r
    #[test]\r
    fn test_new_async_id() {\r
         //Snowflake::new()  //Snowflake::new(必须是单例或全局变量)\r
         //默认使用\r
         println!("{}", new_snowflake_id().to_string());\r
    }\r
\`\`\`\r
\r
#### 插件：分布式唯一ID（MongoDB 对象ID算法(String/u128)）\r
\r
\`\`\`rust\r
    #[test]\r
    async fn test_new_async_id() {\r
       println!("{}", rbatis::plugin::object_id::ObjectId::new().to_string());\r
    }\r
\`\`\`\r
\r
\r
\r
#### 内置宏\r
\r
* \`\`\` make_table\`\`\` 依赖 Default trait 简化表结构构建\r
* \`\`\` make_table_field_vec \`\`\` 获取目标 Vec 成员属性的 Vec 集合\r
* \`\`\` make_table_field_map \`\`\` 获取目标 Vec 成员属性的 HashMap 集合\r
\r
例如：\r
\`\`\`rust\r
    use rbatis::rbdc::datetime::DateTime;\r
    use serde::{Deserialize, Serialize};\r
    #[derive(Clone, Debug, Deserialize, Serialize)]\r
    pub struct BizActivity {\r
        pub id: Option<String>,\r
        pub name: Option<String>,\r
        pub pc_link: Option<String>,\r
        pub h5_link: Option<String>,\r
        pub pc_banner_img: Option<String>,\r
        pub h5_banner_img: Option<String>,\r
        pub sort: Option<String>,\r
        pub status: Option<i32>,\r
        pub remark: Option<String>,\r
        pub create_time: Option<DateTime>,\r
        pub version: Option<BigDecimal>,\r
        pub delete_flag: Option<i32>,\r
    }\r
\r
    impl Default for BizActivity {\r
        fn default() -> Self {\r
            Self {\r
                id: None,\r
                name: None,\r
                pc_link: None,\r
                h5_link: None,\r
                pc_banner_img: None,\r
                h5_banner_img: None,\r
                sort: None,\r
                status: None,\r
                remark: None,\r
                create_time: None,\r
                version: None,\r
                delete_flag: None,\r
            }\r
        }\r
    }\r
\r
    #[test]\r
    fn test_make_table() {\r
        let table = rbatis::make_table!(BizActivity{\r
              id:"1".to_string(),\r
        });\r
        println!("{:#?}", table);\r
    }\r
\r
    #[test]\r
    fn test_table_field_map() {\r
        let table = rbatis::make_table!(BizActivity{\r
              id:"1".to_string(),\r
              name:"a".to_string()\r
        });\r
        let table_vec = vec![table];\r
        let map = rbatis::make_table_field_map!(&table_vec,name);\r
        println!("{:#?}", map);\r
        assert_eq!(map.len(), table_vec.len());\r
    }\r
\r
    #[test]\r
    fn test_table_field_vec() {\r
        let table = rbatis::make_table!(BizActivity{\r
              id:"1".to_string(),\r
              name:"a".to_string()\r
        });\r
        let table_vec = vec![table];\r
        let names = rbatis::make_table_field_vec!(&table_vec,name);\r
        println!("{:#?}", names);\r
        assert_eq!(names.len(), table_vec.len());\r
    }\r
\`\`\`\r
\r
\r
#### 设计驱动\r
\r
* 本文档用于设计一个新的数据库驱动以加入 rbatis\r
\r
* 示例请参见 [rbdc-mssql](https://github.com/rbatis/rbatis/tree/master/rbdc-mssql)\r
\r
* 步骤0: 创建你的 cargo 项目，并在 Cargo.toml 中添加 'rbdc = "4"'\r
\`\`\`\r
cargo new mock_driver --lib\r
\`\`\`\r
\r
* 步骤1: 添加依赖，或添加你的数据库驱动 crates 依赖。\r
\`\`\`toml\r
rbdc = "4"\r
rbs  = "4"\r
fastdate = { version = "0.1" }\r
# xx_driver = {version = "xxx"}\r
\`\`\`\r
\r
* 步骤2: 定义你的驱动结构\r
\`\`\`rust\r
#[derive(Debug, Clone)]\r
struct MockDriver {}\r
#[derive(Clone, Debug)]\r
struct MockRowMetaData {}\r
#[derive(Clone, Debug)]\r
struct MockRow {}\r
#[derive(Clone, Debug)]\r
struct MockConnection {}\r
#[derive(Clone, Debug)]\r
struct MockConnectOptions {}\r
\r
\`\`\`\r
\r
* 步骤3: 实现 trait rbdc::db::{Driver, MetaData, Row, Connection, ConnectOptions, Placeholder};\r
\r
\`\`\`rust\r
use std::any::Any;\r
use futures_core::future::BoxFuture;\r
use rbdc::db::{Driver, MetaData, Row, Connection, ConnectOptions, Placeholder, ExecResult};\r
use rbdc::Error;\r
use rbs::Value;\r
\r
impl Driver for MockDriver {\r
    fn name(&self) -> &str {\r
        "MockDriver"\r
    }\r
    fn connect(&self, url: &str) -> BoxFuture<Result<Box<dyn Connection>, Error>> {\r
        let url = url.to_owned();\r
        Box::pin(async move {\r
            let conn = MockConnection {};\r
            Ok(Box::new(conn) as Box<dyn Connection>)\r
        })\r
    }\r
\r
    fn connect_opt<'a>(\r
        &'a self,\r
        opt: &'a dyn ConnectOptions,\r
    ) -> BoxFuture<Result<Box<dyn Connection>, Error>> {\r
        let opt = opt.downcast_ref::<MockConnectOptions>().unwrap();\r
        Box::pin(async move {\r
            let conn = MockConnection {};\r
            Ok(Box::new(conn) as Box<dyn Connection>)\r
        })\r
    }\r
\r
    fn default_option(&self) -> Box<dyn ConnectOptions> {\r
        Box::new(MockConnectOptions {})\r
    }\r
}\r
\r
impl MetaData for MockRowMetaData {\r
    fn column_len(&self) -> usize {  todo!() }\r
\r
    fn column_name(&self, i: usize) -> String {  todo!() }\r
\r
    fn column_type(&self, i: usize) -> String {  todo!() }\r
}\r
\r
impl Row for MockRow {\r
    fn meta_data(&self) -> Box<dyn MetaData> {  todo!() }\r
\r
    fn get(&mut self, i: usize) -> Result<Value, Error> {  todo!() }\r
}\r
\r
impl Connection for MockConnection {\r
    fn exec_rows(&mut self, sql: &str, params: Vec<Value>) -> BoxFuture<Result<Vec<Box<dyn Row>>, Error>> {  todo!() }\r
\r
    fn exec(&mut self, sql: &str, params: Vec<Value>) -> BoxFuture<Result<ExecResult, Error>> {  todo!() }\r
\r
    fn close(&mut self) -> BoxFuture<Result<(), Error>> {  todo!() }\r
\r
    fn ping(&mut self) -> BoxFuture<Result<(), Error>> {  todo!() }\r
}\r
\r
impl ConnectOptions for MockConnectOptions {\r
    fn connect(&self) -> BoxFuture<Result<Box<dyn Connection>, Error>> {  todo!() }\r
\r
    fn set_uri(&mut self, uri: &str) -> Result<(), Error> {  todo!() }\r
}\r
\r
impl Placeholder for MockDriver {\r
    fn exchange(&self, sql: &str) -> String {\r
        //return rbdc::impl_exchange("@P", 1, sql); //TODO if database not support sql Placeholder '?',replace '@1' to '?'\r
        return sql.to_string();//if database is support sql Placeholder '?'\r
    }\r
}\r
\`\`\`\r
\r
* 步骤4: 在 rbatis 中加载你的驱动\r
\r
\`\`\`rust\r
#[tokio::main]\r
async fn main(){\r
    let mut rb = RBatis::new();\r
    rb.init(MockDriver {}, "xxx://xxx.db").unwrap();\r
    rb.acquire().await.expect("connect database fail");\r
    println!("connect database successful");\r
}\r
\`\`\`\r
`,md={class:"doc-layout"},gd={class:"sidebar-header"},bd={class:"sidebar-nav"},_d=["href","onClick"],yd=["innerHTML"],vd={__name:"Docs",setup(e){const t=Ie("lang"),n=Me(()=>t.value==="zh"),r=Ot(""),s=Ot([]),i=Ot(""),a=Ot(!0);let o=null;X.setOptions({gfm:!0,breaks:!0});function l(){const p=n.value?hd:dd;r.value='<div class="content">'+X.parse(p)+"</div>"}function c(){as(()=>{const p=document.querySelectorAll(".content h2, .content h3, .content h4"),h=[];p.forEach(g=>{const _=parseInt(g.tagName.slice(1)),S=g.textContent.replace(/#$/,"").trim();let E=g.id;E||(E=S.toLowerCase().replace(/[^\w\s一-鿿-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-"),g.id=E),h.push({level:_,text:S,id:E})}),s.value=h,o&&o.disconnect(),o=new IntersectionObserver(g=>{g.forEach(_=>{_.isIntersecting&&(i.value=_.target.id)})},{rootMargin:"-80px 0px -80% 0px"}),p.forEach(g=>o.observe(g)),document.querySelectorAll(".content h2, .content h3, .content h4").forEach(g=>{if(!g.id)return;const _=document.createElement("a");_.className="anchor-link",_.href="#"+g.id,_.textContent="#",g.prepend(_)}),typeof Prism<"u"&&Prism.highlightAll()})}function u(p){const h=document.getElementById(p);h&&h.scrollIntoView({behavior:"smooth",block:"start"}),a.value=!1}return yn(t,()=>{l(),c(),document.title="RBatis V4 - "+(n.value?"文档":"Documentation")}),Bn(()=>{l(),c(),document.title="RBatis V4 - "+(n.value?"文档":"Documentation")}),sn(()=>{o&&o.disconnect()}),(p,h)=>(He(),lt("div",md,[m("aside",{class:it(["sidebar",{active:a.value}]),id:"sidebar"},[m("div",gd,"V4 "+L(n.value?"文档":"Documentation"),1),m("nav",bd,[(He(!0),lt(Be,null,hl(s.value,g=>(He(),lt("a",{key:g.id,href:"#"+g.id,class:it(["sidebar-link",["sidebar-h"+g.level,{active:i.value===g.id}]]),onClick:$l(_=>u(g.id),["prevent"])},L(g.text),11,_d))),128))])],2),m("main",{class:"content-area doc",onClick:h[0]||(h[0]=g=>a.value=!1)},[m("div",{id:"content",class:"content",innerHTML:r.value},null,8,yd)])]))}},wd=[{path:"/",component:Rf},{path:"/v4",component:vd}],kd=sp({history:zu(),routes:wd}),xd={"nav-home":{en:"Home",zh:"首页"},"nav-v4-docs":{en:"V4 Docs",zh:"V4 文档"},tagline:{en:"Compile-time ORM for Rust",zh:"Rust 编译期 ORM"},"feature-perf-title":{en:"High Performance",zh:"高性能"},"feature-perf-desc":{en:"Zero-cost dynamic SQL compiled at build time",zh:"编译期零成本动态 SQL"},"feature-safe-title":{en:"Type Safe",zh:"类型安全"},"feature-safe-desc":{en:"100% safe Rust, compile-time query verification",zh:"100% 安全的 Rust，编译期查询验证"},"feature-driver-title":{en:"Driver Abstraction",zh:"驱动抽象"},"feature-driver-desc":{en:"Pluggable database drivers via rbdc trait system",zh:"通过 rbdc trait 系统实现可插拔驱动"},"terminal-cargo":{en:"# Cargo.toml",zh:"# Cargo.toml"},"terminal-start":{en:"# exec_decode",zh:"# exec_decode"},"cta-start":{en:"Get Started",zh:"快速开始"},"sec-why-title":{en:"Why RBatis?",zh:"为什么选择 RBatis？"},"sec-why-sub":{en:"A modern, high-performance ORM for Rust with compile-time safety",zh:"一个现代、高性能的 Rust ORM，编译期安全保障"},"sec-why-compile-title":{en:"Compile-time Dynamic SQL",zh:"编译期动态 SQL"},"sec-why-compile-desc":{en:"Zero-cost dynamic SQL powered by proc-macros at compile time. Uses Cow to minimize cloning — no ONGL engine needed.",zh:"编译期通过 proc-macro 实现的零成本动态 SQL，使用 Cow 减少克隆，无需 ONGL 引擎。"},"sec-why-mybatis-title":{en:"MyBatis3 Compatible",zh:"兼容 MyBatis3"},"sec-why-mybatis-desc":{en:"Familiar MyBatis3 syntax support. Easily migrate existing Java projects to Rust with minimal changes.",zh:"支持熟悉的 MyBatis3 语法，轻松将 Java 项目迁移到 Rust。"},"sec-why-safe-title":{en:"100% Safe Rust",zh:"100% 安全的 Rust"},"sec-why-safe-desc":{en:"Enforces #![forbid(unsafe_code)] — compile-time query verification, zero undefined behavior.",zh:"强制 #![forbid(unsafe_code)] — 编译期查询验证，零未定义行为。"},"sec-why-async-title":{en:"Async & High Performance",zh:"异步 & 高性能"},"sec-why-async-desc":{en:"Built on Tokio async runtime. No GC, no runtime overhead — pure zero-cost abstractions.",zh:"基于 Tokio 异步运行时，无 GC，无运行时开销 — 纯粹的零成本抽象。"},"sec-why-driver-title":{en:"Pluggable Drivers",zh:"可插拔驱动"},"sec-why-driver-desc":{en:"JDBC-like rbdc trait system. Switch databases by changing a single line of Cargo.toml.",zh:"类似 JDBC 的 rbdc trait 系统，切换数据库只需修改一行 Cargo.toml。"},"sec-why-plugin-title":{en:"Rich Plugin System",zh:"丰富的插件系统"},"sec-why-plugin-desc":{en:"Interceptors, auto table-sync, snowflake & ObjectId generators, pagination, and more.",zh:"拦截器、自动表同步、雪花算法 & ObjectId 生成器、分页等等。"},"sec-dsql-title":{en:"Dynamic SQL",zh:"动态 SQL"},"sec-dsql-sub":{en:"Two powerful dynamic SQL languages — write complex queries with ease",zh:"两种强大的动态 SQL 语言 — 轻松编写复杂查询"},"sec-dsql-crud-desc":{en:"Macro that generates built-in CRUD functions for your table structs — zero boilerplate.",zh:"为表结构生成内置 CRUD 函数的宏 — 零样板代码。"},"sec-dsql-html-desc":{en:"MyBatis-compatible XML syntax with &lt;if&gt;, &lt;foreach&gt;, &lt;where&gt;, &lt;trim&gt;, and &lt;choose&gt; support.",zh:"兼容 MyBatis 的 XML 语法，支持 &lt;if&gt;、&lt;foreach&gt;、&lt;where&gt;、&lt;trim&gt;、&lt;choose&gt;。"},"sec-dsql-py-desc":{en:"Python-like syntax for dynamic SQL — concise, readable, and expressive.",zh:"类似 Python 的动态 SQL 语法 — 简洁、可读、表达力强。"},"sec-ai-title":{en:"AI & Developer Experience",zh:"AI 与开发者体验"},"sec-ai-sub":{en:"Supercharge your RBatis workflow with AI-powered tools",zh:"使用 AI 工具赋能你的 RBatis 开发工作流"},"ai-mcp-title":{en:"rbdc-mcp",zh:"rbdc-mcp"},"ai-mcp-desc":{en:"Model Context Protocol server for RBatis — let Claude interact with your database directly through natural language.",zh:"RBatis 的 MCP 协议服务器 — 让 Claude 通过自然语言直接操作你的数据库。"},"ai-mcp-terminal-label":{en:"# Model Context Protocol",zh:"# MCP 协议配置"},"ai-skill-title":{en:"rbatis-skill",zh:"rbatis-skill"},"ai-skill-desc":{en:"Install the RBatis skill into Claude Code — then simply ask Claude natural questions about using RBatis in your projects.",zh:"将 RBatis 技能安装到 Claude Code 中 — 然后直接通过自然语言向 Claude 询问有关 RBatis 的使用问题。"},"ai-skill-terminal-label":{en:"# Ask Claude about RBatis",zh:"# 向 Claude 询问 RBatis"},"sec-db-title":{en:"Supported Databases",zh:"支持的数据库"},"sec-db-sub":{en:"Any database that implements the rbdc trait — or write your own driver",zh:"任何实现了 rbdc trait 的数据库 — 你也可以自己编写驱动"},"sec-eco-title":{en:"Ecosystem",zh:"生态项目"},"sec-eco-sub":{en:"Production-ready projects built with RBatis",zh:"基于 RBatis 的生产级项目"},"sec-eco-abs":{en:"Background user management system — Vue.js + RBatis + Axum",zh:"后台用户管理系统 — Vue.js + RBatis + Axum"},"sec-eco-salvo":{en:"Permission management system — React + RBatis + Salvo",zh:"后台权限管理系统 — React + RBatis + Salvo"},"footer-contrib":{en:"© RBatis Contributors",zh:"© RBatis Contributors"},"footer-github":{en:"GitHub",zh:"GitHub"}},Sd={install(e){const t=Ot(n());function n(){return localStorage.getItem("rbatis-lang")||"en"}function r(i){t.value=i,localStorage.setItem("rbatis-lang",i),document.documentElement.setAttribute("lang",i==="zh"?"zh-CN":"en")}function s(i){const a=xd[i];return a?a[t.value]||a.en:i}e.provide("lang",Gn(t)),e.provide("setLang",r),e.provide("t",s),document.documentElement.setAttribute("lang",t.value==="zh"?"zh-CN":"en"),e.config.globalProperties.$t=s,e.config.globalProperties.$setLang=r,e.config.globalProperties.$lang=t}},qs=Ic(Xc);qs.use(kd);qs.use(Sd);qs.mount("#app");
