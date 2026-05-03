var ua=Object.defineProperty;var pa=(e,t,n)=>t in e?ua(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var ee=(e,t,n)=>pa(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();/**
* @vue/shared v3.5.33
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Kr(e){const t=Object.create(null);for(const n of e.split(","))t[n]=1;return n=>n in t}const se={},Qt=[],st=()=>{},Ai=()=>!1,rr=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),sr=e=>e.startsWith("onUpdate:"),me=Object.assign,Zr=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},fa=Object.prototype.hasOwnProperty,Z=(e,t)=>fa.call(e,t),$=Array.isArray,Kt=e=>Cn(e)==="[object Map]",Ti=e=>Cn(e)==="[object Set]",As=e=>Cn(e)==="[object Date]",H=e=>typeof e=="function",ce=e=>typeof e=="string",lt=e=>typeof e=="symbol",J=e=>e!==null&&typeof e=="object",Di=e=>(J(e)||H(e))&&H(e.then)&&H(e.catch),Bi=Object.prototype.toString,Cn=e=>Bi.call(e),da=e=>Cn(e).slice(8,-1),Pi=e=>Cn(e)==="[object Object]",Xr=e=>ce(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,dn=Kr(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),ir=e=>{const t=Object.create(null);return(n=>t[n]||(t[n]=e(n)))},ha=/-\w/g,Re=ir(e=>e.replace(ha,t=>t.slice(1).toUpperCase())),ma=/\B([A-Z])/g,$t=ir(e=>e.replace(ma,"-$1").toLowerCase()),lr=ir(e=>e.charAt(0).toUpperCase()+e.slice(1)),_r=ir(e=>e?`on${lr(e)}`:""),rt=(e,t)=>!Object.is(e,t),yr=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},Mi=(e,t,n,r=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:r,value:n})},ga=e=>{const t=parseFloat(e);return isNaN(t)?e:t};let Ts;const ar=()=>Ts||(Ts=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Jr(e){if($(e)){const t={};for(let n=0;n<e.length;n++){const r=e[n],s=ce(r)?va(r):Jr(r);if(s)for(const i in s)t[i]=s[i]}return t}else if(ce(e)||J(e))return e}const ba=/;(?![^(]*\))/g,_a=/:([^]+)/,ya=/\/\*[^]*?\*\//g;function va(e){const t={};return e.replace(ya,"").split(ba).forEach(n=>{if(n){const r=n.split(_a);r.length>1&&(t[r[0].trim()]=r[1].trim())}}),t}function ht(e){let t="";if(ce(e))t=e;else if($(e))for(let n=0;n<e.length;n++){const r=ht(e[n]);r&&(t+=r+" ")}else if(J(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}const wa="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",ka=Kr(wa);function Ii(e){return!!e||e===""}function xa(e,t){if(e.length!==t.length)return!1;let n=!0;for(let r=0;n&&r<e.length;r++)n=Yr(e[r],t[r]);return n}function Yr(e,t){if(e===t)return!0;let n=As(e),r=As(t);if(n||r)return n&&r?e.getTime()===t.getTime():!1;if(n=lt(e),r=lt(t),n||r)return e===t;if(n=$(e),r=$(t),n||r)return n&&r?xa(e,t):!1;if(n=J(e),r=J(t),n||r){if(!n||!r)return!1;const s=Object.keys(e).length,i=Object.keys(t).length;if(s!==i)return!1;for(const o in e){const a=e.hasOwnProperty(o),l=t.hasOwnProperty(o);if(a&&!l||!a&&l||!Yr(e[o],t[o]))return!1}}return String(e)===String(t)}const zi=e=>!!(e&&e.__v_isRef===!0),V=e=>ce(e)?e:e==null?"":$(e)||J(e)&&(e.toString===Bi||!H(e.toString))?zi(e)?V(e.value):JSON.stringify(e,Li,2):String(e),Li=(e,t)=>zi(t)?Li(e,t.value):Kt(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((n,[r,s],i)=>(n[vr(r,i)+" =>"]=s,n),{})}:Ti(t)?{[`Set(${t.size})`]:[...t.values()].map(n=>vr(n))}:lt(t)?vr(t):J(t)&&!$(t)&&!Pi(t)?String(t):t,vr=(e,t="")=>{var n;return lt(e)?`Symbol(${(n=e.description)!=null?n:t})`:e};/**
* @vue/reactivity v3.5.33
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let ge;class Sa{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.__v_skip=!0,this.parent=ge,!t&&ge&&(this.index=(ge.scopes||(ge.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,n;if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].pause();for(t=0,n=this.effects.length;t<n;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,n;if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].resume();for(t=0,n=this.effects.length;t<n;t++)this.effects[t].resume()}}run(t){if(this._active){const n=ge;try{return ge=this,t()}finally{ge=n}}}on(){++this._on===1&&(this.prevScope=ge,ge=this)}off(){if(this._on>0&&--this._on===0){if(ge===this)ge=this.prevScope;else{let t=ge;for(;t;){if(t.prevScope===this){t.prevScope=this.prevScope;break}t=t.prevScope}}this.prevScope=void 0}}stop(t){if(this._active){this._active=!1;let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(this.effects.length=0,n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function Ra(){return ge}let re;const wr=new WeakSet;class Ni{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,ge&&ge.active&&ge.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,wr.has(this)&&(wr.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Vi(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Ds(this),Hi(this);const t=re,n=Ve;re=this,Ve=!0;try{return this.fn()}finally{ji(this),re=t,Ve=n,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)ns(t);this.deps=this.depsTail=void 0,Ds(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?wr.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Dr(this)&&this.run()}get dirty(){return Dr(this)}}let $i=0,hn,mn;function Vi(e,t=!1){if(e.flags|=8,t){e.next=mn,mn=e;return}e.next=hn,hn=e}function es(){$i++}function ts(){if(--$i>0)return;if(mn){let t=mn;for(mn=void 0;t;){const n=t.next;t.next=void 0,t.flags&=-9,t=n}}let e;for(;hn;){let t=hn;for(hn=void 0;t;){const n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(r){e||(e=r)}t=n}}if(e)throw e}function Hi(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function ji(e){let t,n=e.depsTail,r=n;for(;r;){const s=r.prevDep;r.version===-1?(r===n&&(n=s),ns(r),qa(r)):t=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=s}e.deps=t,e.depsTail=n}function Dr(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(Ui(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function Ui(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===kn)||(e.globalVersion=kn,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!Dr(e))))return;e.flags|=2;const t=e.dep,n=re,r=Ve;re=e,Ve=!0;try{Hi(e);const s=e.fn(e._value);(t.version===0||rt(s,e._value))&&(e.flags|=128,e._value=s,t.version++)}catch(s){throw t.version++,s}finally{re=n,Ve=r,ji(e),e.flags&=-3}}function ns(e,t=!1){const{dep:n,prevSub:r,nextSub:s}=e;if(r&&(r.nextSub=s,e.prevSub=void 0),s&&(s.prevSub=r,e.nextSub=void 0),n.subs===e&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let i=n.computed.deps;i;i=i.nextDep)ns(i,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function qa(e){const{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}let Ve=!0;const Fi=[];function mt(){Fi.push(Ve),Ve=!1}function gt(){const e=Fi.pop();Ve=e===void 0?!0:e}function Ds(e){const{cleanup:t}=e;if(e.cleanup=void 0,t){const n=re;re=void 0;try{t()}finally{re=n}}}let kn=0;class Oa{constructor(t,n){this.sub=t,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class rs{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!re||!Ve||re===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==re)n=this.activeLink=new Oa(re,this),re.deps?(n.prevDep=re.depsTail,re.depsTail.nextDep=n,re.depsTail=n):re.deps=re.depsTail=n,Gi(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const r=n.nextDep;r.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=r),n.prevDep=re.depsTail,n.nextDep=void 0,re.depsTail.nextDep=n,re.depsTail=n,re.deps===n&&(re.deps=r)}return n}trigger(t){this.version++,kn++,this.notify(t)}notify(t){es();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{ts()}}}function Gi(e){if(e.dep.sc++,e.sub.flags&4){const t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let r=t.deps;r;r=r.nextDep)Gi(r)}const n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}const Br=new WeakMap,zt=Symbol(""),Pr=Symbol(""),xn=Symbol("");function be(e,t,n){if(Ve&&re){let r=Br.get(e);r||Br.set(e,r=new Map);let s=r.get(n);s||(r.set(n,s=new rs),s.map=r,s.key=n),s.track()}}function dt(e,t,n,r,s,i){const o=Br.get(e);if(!o){kn++;return}const a=l=>{l&&l.trigger()};if(es(),t==="clear")o.forEach(a);else{const l=$(e),u=l&&Xr(n);if(l&&n==="length"){const c=Number(r);o.forEach((p,h)=>{(h==="length"||h===xn||!lt(h)&&h>=c)&&a(p)})}else switch((n!==void 0||o.has(void 0))&&a(o.get(n)),u&&a(o.get(xn)),t){case"add":l?u&&a(o.get("length")):(a(o.get(zt)),Kt(e)&&a(o.get(Pr)));break;case"delete":l||(a(o.get(zt)),Kt(e)&&a(o.get(Pr)));break;case"set":Kt(e)&&a(o.get(zt));break}}ts()}function Ft(e){const t=K(e);return t===e?t:(be(t,"iterate",xn),Ie(e)?t:t.map(je))}function or(e){return be(e=K(e),"iterate",xn),e}function tt(e,t){return bt(e)?Jt(Lt(e)?je(t):t):je(t)}const Ea={__proto__:null,[Symbol.iterator](){return kr(this,Symbol.iterator,e=>tt(this,e))},concat(...e){return Ft(this).concat(...e.map(t=>$(t)?Ft(t):t))},entries(){return kr(this,"entries",e=>(e[1]=tt(this,e[1]),e))},every(e,t){return ct(this,"every",e,t,void 0,arguments)},filter(e,t){return ct(this,"filter",e,t,n=>n.map(r=>tt(this,r)),arguments)},find(e,t){return ct(this,"find",e,t,n=>tt(this,n),arguments)},findIndex(e,t){return ct(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return ct(this,"findLast",e,t,n=>tt(this,n),arguments)},findLastIndex(e,t){return ct(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return ct(this,"forEach",e,t,void 0,arguments)},includes(...e){return xr(this,"includes",e)},indexOf(...e){return xr(this,"indexOf",e)},join(e){return Ft(this).join(e)},lastIndexOf(...e){return xr(this,"lastIndexOf",e)},map(e,t){return ct(this,"map",e,t,void 0,arguments)},pop(){return ln(this,"pop")},push(...e){return ln(this,"push",e)},reduce(e,...t){return Bs(this,"reduce",e,t)},reduceRight(e,...t){return Bs(this,"reduceRight",e,t)},shift(){return ln(this,"shift")},some(e,t){return ct(this,"some",e,t,void 0,arguments)},splice(...e){return ln(this,"splice",e)},toReversed(){return Ft(this).toReversed()},toSorted(e){return Ft(this).toSorted(e)},toSpliced(...e){return Ft(this).toSpliced(...e)},unshift(...e){return ln(this,"unshift",e)},values(){return kr(this,"values",e=>tt(this,e))}};function kr(e,t,n){const r=or(e),s=r[t]();return r!==e&&!Ie(e)&&(s._next=s.next,s.next=()=>{const i=s._next();return i.done||(i.value=n(i.value)),i}),s}const Ca=Array.prototype;function ct(e,t,n,r,s,i){const o=or(e),a=o!==e&&!Ie(e),l=o[t];if(l!==Ca[t]){const p=l.apply(e,i);return a?je(p):p}let u=n;o!==e&&(a?u=function(p,h){return n.call(this,tt(e,p),h,e)}:n.length>2&&(u=function(p,h){return n.call(this,p,h,e)}));const c=l.call(o,u,r);return a&&s?s(c):c}function Bs(e,t,n,r){const s=or(e),i=s!==e&&!Ie(e);let o=n,a=!1;s!==e&&(i?(a=r.length===0,o=function(u,c,p){return a&&(a=!1,u=tt(e,u)),n.call(this,u,tt(e,c),p,e)}):n.length>3&&(o=function(u,c,p){return n.call(this,u,c,p,e)}));const l=s[t](o,...r);return a?tt(e,l):l}function xr(e,t,n){const r=K(e);be(r,"iterate",xn);const s=r[t](...n);return(s===-1||s===!1)&&ls(n[0])?(n[0]=K(n[0]),r[t](...n)):s}function ln(e,t,n=[]){mt(),es();const r=K(e)[t].apply(e,n);return ts(),gt(),r}const Aa=Kr("__proto__,__v_isRef,__isVue"),Wi=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(lt));function Ta(e){lt(e)||(e=String(e));const t=K(this);return be(t,"has",e),t.hasOwnProperty(e)}class Qi{constructor(t=!1,n=!1){this._isReadonly=t,this._isShallow=n}get(t,n,r){if(n==="__v_skip")return t.__v_skip;const s=this._isReadonly,i=this._isShallow;if(n==="__v_isReactive")return!s;if(n==="__v_isReadonly")return s;if(n==="__v_isShallow")return i;if(n==="__v_raw")return r===(s?i?Va:Ji:i?Xi:Zi).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(r)?t:void 0;const o=$(t);if(!s){let l;if(o&&(l=Ea[n]))return l;if(n==="hasOwnProperty")return Ta}const a=Reflect.get(t,n,ve(t)?t:r);if((lt(n)?Wi.has(n):Aa(n))||(s||be(t,"get",n),i))return a;if(ve(a)){const l=o&&Xr(n)?a:a.value;return s&&J(l)?Fn(l):l}return J(a)?s?Fn(a):cr(a):a}}class Ki extends Qi{constructor(t=!1){super(!1,t)}set(t,n,r,s){let i=t[n];const o=$(t)&&Xr(n);if(!this._isShallow){const u=bt(i);if(!Ie(r)&&!bt(r)&&(i=K(i),r=K(r)),!o&&ve(i)&&!ve(r))return u||(i.value=r),!0}const a=o?Number(n)<t.length:Z(t,n),l=Reflect.set(t,n,r,ve(t)?t:s);return t===K(s)&&(a?rt(r,i)&&dt(t,"set",n,r):dt(t,"add",n,r)),l}deleteProperty(t,n){const r=Z(t,n);t[n];const s=Reflect.deleteProperty(t,n);return s&&r&&dt(t,"delete",n,void 0),s}has(t,n){const r=Reflect.has(t,n);return(!lt(n)||!Wi.has(n))&&be(t,"has",n),r}ownKeys(t){return be(t,"iterate",$(t)?"length":zt),Reflect.ownKeys(t)}}class Da extends Qi{constructor(t=!1){super(!0,t)}set(t,n){return!0}deleteProperty(t,n){return!0}}const Ba=new Ki,Pa=new Da,Ma=new Ki(!0);const Mr=e=>e,Pn=e=>Reflect.getPrototypeOf(e);function Ia(e,t,n){return function(...r){const s=this.__v_raw,i=K(s),o=Kt(i),a=e==="entries"||e===Symbol.iterator&&o,l=e==="keys"&&o,u=s[e](...r),c=n?Mr:t?Jt:je;return!t&&be(i,"iterate",l?Pr:zt),me(Object.create(u),{next(){const{value:p,done:h}=u.next();return h?{value:p,done:h}:{value:a?[c(p[0]),c(p[1])]:c(p),done:h}}})}}function Mn(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function za(e,t){const n={get(s){const i=this.__v_raw,o=K(i),a=K(s);e||(rt(s,a)&&be(o,"get",s),be(o,"get",a));const{has:l}=Pn(o),u=t?Mr:e?Jt:je;if(l.call(o,s))return u(i.get(s));if(l.call(o,a))return u(i.get(a));i!==o&&i.get(s)},get size(){const s=this.__v_raw;return!e&&be(K(s),"iterate",zt),s.size},has(s){const i=this.__v_raw,o=K(i),a=K(s);return e||(rt(s,a)&&be(o,"has",s),be(o,"has",a)),s===a?i.has(s):i.has(s)||i.has(a)},forEach(s,i){const o=this,a=o.__v_raw,l=K(a),u=t?Mr:e?Jt:je;return!e&&be(l,"iterate",zt),a.forEach((c,p)=>s.call(i,u(c),u(p),o))}};return me(n,e?{add:Mn("add"),set:Mn("set"),delete:Mn("delete"),clear:Mn("clear")}:{add(s){const i=K(this),o=Pn(i),a=K(s),l=!t&&!Ie(s)&&!bt(s)?a:s;return o.has.call(i,l)||rt(s,l)&&o.has.call(i,s)||rt(a,l)&&o.has.call(i,a)||(i.add(l),dt(i,"add",l,l)),this},set(s,i){!t&&!Ie(i)&&!bt(i)&&(i=K(i));const o=K(this),{has:a,get:l}=Pn(o);let u=a.call(o,s);u||(s=K(s),u=a.call(o,s));const c=l.call(o,s);return o.set(s,i),u?rt(i,c)&&dt(o,"set",s,i):dt(o,"add",s,i),this},delete(s){const i=K(this),{has:o,get:a}=Pn(i);let l=o.call(i,s);l||(s=K(s),l=o.call(i,s)),a&&a.call(i,s);const u=i.delete(s);return l&&dt(i,"delete",s,void 0),u},clear(){const s=K(this),i=s.size!==0,o=s.clear();return i&&dt(s,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(s=>{n[s]=Ia(s,e,t)}),n}function ss(e,t){const n=za(e,t);return(r,s,i)=>s==="__v_isReactive"?!e:s==="__v_isReadonly"?e:s==="__v_raw"?r:Reflect.get(Z(n,s)&&s in r?n:r,s,i)}const La={get:ss(!1,!1)},Na={get:ss(!1,!0)},$a={get:ss(!0,!1)};const Zi=new WeakMap,Xi=new WeakMap,Ji=new WeakMap,Va=new WeakMap;function Ha(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function ja(e){return e.__v_skip||!Object.isExtensible(e)?0:Ha(da(e))}function cr(e){return bt(e)?e:is(e,!1,Ba,La,Zi)}function Yi(e){return is(e,!1,Ma,Na,Xi)}function Fn(e){return is(e,!0,Pa,$a,Ji)}function is(e,t,n,r,s){if(!J(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const i=ja(e);if(i===0)return e;const o=s.get(e);if(o)return o;const a=new Proxy(e,i===2?r:n);return s.set(e,a),a}function Lt(e){return bt(e)?Lt(e.__v_raw):!!(e&&e.__v_isReactive)}function bt(e){return!!(e&&e.__v_isReadonly)}function Ie(e){return!!(e&&e.__v_isShallow)}function ls(e){return e?!!e.__v_raw:!1}function K(e){const t=e&&e.__v_raw;return t?K(t):e}function Ua(e){return!Z(e,"__v_skip")&&Object.isExtensible(e)&&Mi(e,"__v_skip",!0),e}const je=e=>J(e)?cr(e):e,Jt=e=>J(e)?Fn(e):e;function ve(e){return e?e.__v_isRef===!0:!1}function Ot(e){return el(e,!1)}function Fa(e){return el(e,!0)}function el(e,t){return ve(e)?e:new Ga(e,t)}class Ga{constructor(t,n){this.dep=new rs,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?t:K(t),this._value=n?t:je(t),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(t){const n=this._rawValue,r=this.__v_isShallow||Ie(t)||bt(t);t=r?t:K(t),rt(t,n)&&(this._rawValue=t,this._value=r?t:je(t),this.dep.trigger())}}function Pe(e){return ve(e)?e.value:e}const Wa={get:(e,t,n)=>t==="__v_raw"?e:Pe(Reflect.get(e,t,n)),set:(e,t,n,r)=>{const s=e[t];return ve(s)&&!ve(n)?(s.value=n,!0):Reflect.set(e,t,n,r)}};function tl(e){return Lt(e)?e:new Proxy(e,Wa)}class Qa{constructor(t,n,r){this.fn=t,this.setter=n,this._value=void 0,this.dep=new rs(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=kn-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=r}notify(){if(this.flags|=16,!(this.flags&8)&&re!==this)return Vi(this,!0),!0}get value(){const t=this.dep.track();return Ui(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function Ka(e,t,n=!1){let r,s;return H(e)?r=e:(r=e.get,s=e.set),new Qa(r,s,n)}const In={},Gn=new WeakMap;let Bt;function Za(e,t=!1,n=Bt){if(n){let r=Gn.get(n);r||Gn.set(n,r=[]),r.push(e)}}function Xa(e,t,n=se){const{immediate:r,deep:s,once:i,scheduler:o,augmentJob:a,call:l}=n,u=B=>s?B:Ie(B)||s===!1||s===0?qt(B,1):qt(B);let c,p,h,m,b=!1,S=!1;if(ve(e)?(p=()=>e.value,b=Ie(e)):Lt(e)?(p=()=>u(e),b=!0):$(e)?(S=!0,b=e.some(B=>Lt(B)||Ie(B)),p=()=>e.map(B=>{if(ve(B))return B.value;if(Lt(B))return u(B);if(H(B))return l?l(B,2):B()})):H(e)?t?p=l?()=>l(e,2):e:p=()=>{if(h){mt();try{h()}finally{gt()}}const B=Bt;Bt=c;try{return l?l(e,3,[m]):e(m)}finally{Bt=B}}:p=st,t&&s){const B=p,G=s===!0?1/0:s;p=()=>qt(B(),G)}const C=Ra(),z=()=>{c.stop(),C&&C.active&&Zr(C.effects,c)};if(i&&t){const B=t;t=(...G)=>{B(...G),z()}}let O=S?new Array(e.length).fill(In):In;const P=B=>{if(!(!(c.flags&1)||!c.dirty&&!B))if(t){const G=c.run();if(s||b||(S?G.some((le,ae)=>rt(le,O[ae])):rt(G,O))){h&&h();const le=Bt;Bt=c;try{const ae=[G,O===In?void 0:S&&O[0]===In?[]:O,m];O=G,l?l(t,3,ae):t(...ae)}finally{Bt=le}}}else c.run()};return a&&a(P),c=new Ni(p),c.scheduler=o?()=>o(P,!1):P,m=B=>Za(B,!1,c),h=c.onStop=()=>{const B=Gn.get(c);if(B){if(l)l(B,4);else for(const G of B)G();Gn.delete(c)}},t?r?P(!0):O=c.run():o?o(P.bind(null,!0),!0):c.run(),z.pause=c.pause.bind(c),z.resume=c.resume.bind(c),z.stop=z,z}function qt(e,t=1/0,n){if(t<=0||!J(e)||e.__v_skip||(n=n||new Map,(n.get(e)||0)>=t))return e;if(n.set(e,t),t--,ve(e))qt(e.value,t,n);else if($(e))for(let r=0;r<e.length;r++)qt(e[r],t,n);else if(Ti(e)||Kt(e))e.forEach(r=>{qt(r,t,n)});else if(Pi(e)){for(const r in e)qt(e[r],t,n);for(const r of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,r)&&qt(e[r],t,n)}return e}/**
* @vue/runtime-core v3.5.33
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function An(e,t,n,r){try{return r?e(...r):e()}catch(s){ur(s,t,n)}}function at(e,t,n,r){if(H(e)){const s=An(e,t,n,r);return s&&Di(s)&&s.catch(i=>{ur(i,t,n)}),s}if($(e)){const s=[];for(let i=0;i<e.length;i++)s.push(at(e[i],t,n,r));return s}}function ur(e,t,n,r=!0){const s=t?t.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:o}=t&&t.appContext.config||se;if(t){let a=t.parent;const l=t.proxy,u=`https://vuejs.org/error-reference/#runtime-${n}`;for(;a;){const c=a.ec;if(c){for(let p=0;p<c.length;p++)if(c[p](e,l,u)===!1)return}a=a.parent}if(i){mt(),An(i,null,10,[e,l,u]),gt();return}}Ja(e,n,s,r,o)}function Ja(e,t,n,r=!0,s=!1){if(s)throw e;console.error(e)}const Se=[];let et=-1;const Zt=[];let St=null,Gt=0;const nl=Promise.resolve();let Wn=null;function as(e){const t=Wn||nl;return e?t.then(this?e.bind(this):e):t}function Ya(e){let t=et+1,n=Se.length;for(;t<n;){const r=t+n>>>1,s=Se[r],i=Sn(s);i<e||i===e&&s.flags&2?t=r+1:n=r}return t}function os(e){if(!(e.flags&1)){const t=Sn(e),n=Se[Se.length-1];!n||!(e.flags&2)&&t>=Sn(n)?Se.push(e):Se.splice(Ya(t),0,e),e.flags|=1,rl()}}function rl(){Wn||(Wn=nl.then(il))}function eo(e){$(e)?Zt.push(...e):St&&e.id===-1?St.splice(Gt+1,0,e):e.flags&1||(Zt.push(e),e.flags|=1),rl()}function Ps(e,t,n=et+1){for(;n<Se.length;n++){const r=Se[n];if(r&&r.flags&2){if(e&&r.id!==e.uid)continue;Se.splice(n,1),n--,r.flags&4&&(r.flags&=-2),r(),r.flags&4||(r.flags&=-2)}}}function sl(e){if(Zt.length){const t=[...new Set(Zt)].sort((n,r)=>Sn(n)-Sn(r));if(Zt.length=0,St){St.push(...t);return}for(St=t,Gt=0;Gt<St.length;Gt++){const n=St[Gt];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}St=null,Gt=0}}const Sn=e=>e.id==null?e.flags&2?-1:1/0:e.id;function il(e){try{for(et=0;et<Se.length;et++){const t=Se[et];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),An(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;et<Se.length;et++){const t=Se[et];t&&(t.flags&=-2)}et=-1,Se.length=0,sl(),Wn=null,(Se.length||Zt.length)&&il()}}let $e=null,ll=null;function Qn(e){const t=$e;return $e=e,ll=e&&e.type.__scopeId||null,t}function $n(e,t=$e,n){if(!t||e._n)return e;const r=(...s)=>{r._d&&Xn(-1);const i=Qn(t);let o;try{o=e(...s)}finally{Qn(i),r._d&&Xn(1)}return o};return r._n=!0,r._c=!0,r._d=!0,r}function Tt(e,t,n,r){const s=e.dirs,i=t&&t.dirs;for(let o=0;o<s.length;o++){const a=s[o];i&&(a.oldValue=i[o].value);let l=a.dir[r];l&&(mt(),at(l,n,8,[e.el,a,e,t]),gt())}}function Vn(e,t){if(_e){let n=_e.provides;const r=_e.parent&&_e.parent.provides;r===n&&(n=_e.provides=Object.create(r)),n[e]=t}}function ze(e,t,n=!1){const r=rc();if(r||Xt){let s=Xt?Xt._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(s&&e in s)return s[e];if(arguments.length>1)return n&&H(t)?t.call(r&&r.proxy):t}}const to=Symbol.for("v-scx"),no=()=>ze(to);function gn(e,t,n){return al(e,t,n)}function al(e,t,n=se){const{immediate:r,deep:s,flush:i,once:o}=n,a=me({},n),l=t&&r||!t&&i!=="post";let u;if(On){if(i==="sync"){const m=no();u=m.__watcherHandles||(m.__watcherHandles=[])}else if(!l){const m=()=>{};return m.stop=st,m.resume=st,m.pause=st,m}}const c=_e;a.call=(m,b,S)=>at(m,c,b,S);let p=!1;i==="post"?a.scheduler=m=>{Oe(m,c&&c.suspense)}:i!=="sync"&&(p=!0,a.scheduler=(m,b)=>{b?m():os(m)}),a.augmentJob=m=>{t&&(m.flags|=4),p&&(m.flags|=2,c&&(m.id=c.uid,m.i=c))};const h=Xa(e,t,a);return On&&(u?u.push(h):l&&h()),h}function ro(e,t,n){const r=this.proxy,s=ce(e)?e.includes(".")?ol(r,e):()=>r[e]:e.bind(r,r);let i;H(t)?i=t:(i=t.handler,n=t);const o=Dn(this),a=al(s,i.bind(r),n);return o(),a}function ol(e,t){const n=t.split(".");return()=>{let r=e;for(let s=0;s<n.length&&r;s++)r=r[n[s]];return r}}const so=Symbol("_vte"),io=e=>e.__isTeleport,lo=Symbol("_leaveCb");function cs(e,t){e.shapeFlag&6&&e.component?(e.transition=t,cs(e.component.subTree,t)):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function cl(e,t){return H(e)?me({name:e.name},t,{setup:e}):e}function ul(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0]}function Ms(e,t){let n;return!!((n=Object.getOwnPropertyDescriptor(e,t))&&!n.configurable)}const Kn=new WeakMap;function bn(e,t,n,r,s=!1){if($(e)){e.forEach((S,C)=>bn(S,t&&($(t)?t[C]:t),n,r,s));return}if(_n(r)&&!s){r.shapeFlag&512&&r.type.__asyncResolved&&r.component.subTree.component&&bn(e,t,n,r.component.subTree);return}const i=r.shapeFlag&4?ds(r.component):r.el,o=s?null:i,{i:a,r:l}=e,u=t&&t.r,c=a.refs===se?a.refs={}:a.refs,p=a.setupState,h=K(p),m=p===se?Ai:S=>Ms(c,S)?!1:Z(h,S),b=(S,C)=>!(C&&Ms(c,C));if(u!=null&&u!==l){if(Is(t),ce(u))c[u]=null,m(u)&&(p[u]=null);else if(ve(u)){const S=t;b(u,S.k)&&(u.value=null),S.k&&(c[S.k]=null)}}if(H(l))An(l,a,12,[o,c]);else{const S=ce(l),C=ve(l);if(S||C){const z=()=>{if(e.f){const O=S?m(l)?p[l]:c[l]:b()||!e.k?l.value:c[e.k];if(s)$(O)&&Zr(O,i);else if($(O))O.includes(i)||O.push(i);else if(S)c[l]=[i],m(l)&&(p[l]=c[l]);else{const P=[i];b(l,e.k)&&(l.value=P),e.k&&(c[e.k]=P)}}else S?(c[l]=o,m(l)&&(p[l]=o)):C&&(b(l,e.k)&&(l.value=o),e.k&&(c[e.k]=o))};if(o){const O=()=>{z(),Kn.delete(e)};O.id=-1,Kn.set(e,O),Oe(O,n)}else Is(e),z()}}}function Is(e){const t=Kn.get(e);t&&(t.flags|=8,Kn.delete(e))}ar().requestIdleCallback;ar().cancelIdleCallback;const _n=e=>!!e.type.__asyncLoader,pl=e=>e.type.__isKeepAlive;function ao(e,t){fl(e,"a",t)}function oo(e,t){fl(e,"da",t)}function fl(e,t,n=_e){const r=e.__wdc||(e.__wdc=()=>{let s=n;for(;s;){if(s.isDeactivated)return;s=s.parent}return e()});if(pr(t,r,n),n){let s=n.parent;for(;s&&s.parent;)pl(s.parent.vnode)&&co(r,t,n,s),s=s.parent}}function co(e,t,n,r){const s=pr(t,e,r,!0);Tn(()=>{Zr(r[t],s)},n)}function pr(e,t,n=_e,r=!1){if(n){const s=n[e]||(n[e]=[]),i=t.__weh||(t.__weh=(...o)=>{mt();const a=Dn(n),l=at(t,n,e,o);return a(),gt(),l});return r?s.unshift(i):s.push(i),i}}const _t=e=>(t,n=_e)=>{(!On||e==="sp")&&pr(e,(...r)=>t(...r),n)},uo=_t("bm"),fr=_t("m"),po=_t("bu"),fo=_t("u"),ho=_t("bum"),Tn=_t("um"),mo=_t("sp"),go=_t("rtg"),bo=_t("rtc");function _o(e,t=_e){pr("ec",e,t)}const yo="components";function dl(e,t){return wo(yo,e,!0,t)||e}const vo=Symbol.for("v-ndc");function wo(e,t,n=!0,r=!1){const s=$e||_e;if(s){const i=s.type;{const a=oc(i,!1);if(a&&(a===t||a===Re(t)||a===lr(Re(t))))return i}const o=zs(s[e]||i[e],t)||zs(s.appContext[e],t);return!o&&r?i:o}}function zs(e,t){return e&&(e[t]||e[Re(t)]||e[lr(Re(t))])}function hl(e,t,n,r){let s;const i=n,o=$(e);if(o||ce(e)){const a=o&&Lt(e);let l=!1,u=!1;a&&(l=!Ie(e),u=bt(e),e=or(e)),s=new Array(e.length);for(let c=0,p=e.length;c<p;c++)s[c]=t(l?u?Jt(je(e[c])):je(e[c]):e[c],c,void 0,i)}else if(typeof e=="number"){s=new Array(e);for(let a=0;a<e;a++)s[a]=t(a+1,a,void 0,i)}else if(J(e))if(e[Symbol.iterator])s=Array.from(e,(a,l)=>t(a,l,void 0,i));else{const a=Object.keys(e);s=new Array(a.length);for(let l=0,u=a.length;l<u;l++){const c=a[l];s[l]=t(e[c],c,l,i)}}else s=[];return s}const Ir=e=>e?Pl(e)?ds(e):Ir(e.parent):null,yn=me(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>Ir(e.parent),$root:e=>Ir(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>gl(e),$forceUpdate:e=>e.f||(e.f=()=>{os(e.update)}),$nextTick:e=>e.n||(e.n=as.bind(e.proxy)),$watch:e=>ro.bind(e)}),Sr=(e,t)=>e!==se&&!e.__isScriptSetup&&Z(e,t),ko={get({_:e},t){if(t==="__v_skip")return!0;const{ctx:n,setupState:r,data:s,props:i,accessCache:o,type:a,appContext:l}=e;if(t[0]!=="$"){const h=o[t];if(h!==void 0)switch(h){case 1:return r[t];case 2:return s[t];case 4:return n[t];case 3:return i[t]}else{if(Sr(r,t))return o[t]=1,r[t];if(s!==se&&Z(s,t))return o[t]=2,s[t];if(Z(i,t))return o[t]=3,i[t];if(n!==se&&Z(n,t))return o[t]=4,n[t];zr&&(o[t]=0)}}const u=yn[t];let c,p;if(u)return t==="$attrs"&&be(e.attrs,"get",""),u(e);if((c=a.__cssModules)&&(c=c[t]))return c;if(n!==se&&Z(n,t))return o[t]=4,n[t];if(p=l.config.globalProperties,Z(p,t))return p[t]},set({_:e},t,n){const{data:r,setupState:s,ctx:i}=e;return Sr(s,t)?(s[t]=n,!0):r!==se&&Z(r,t)?(r[t]=n,!0):Z(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(i[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:r,appContext:s,props:i,type:o}},a){let l;return!!(n[a]||e!==se&&a[0]!=="$"&&Z(e,a)||Sr(t,a)||Z(i,a)||Z(r,a)||Z(yn,a)||Z(s.config.globalProperties,a)||(l=o.__cssModules)&&l[a])},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:Z(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};function Ls(e){return $(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e}let zr=!0;function xo(e){const t=gl(e),n=e.proxy,r=e.ctx;zr=!1,t.beforeCreate&&Ns(t.beforeCreate,e,"bc");const{data:s,computed:i,methods:o,watch:a,provide:l,inject:u,created:c,beforeMount:p,mounted:h,beforeUpdate:m,updated:b,activated:S,deactivated:C,beforeDestroy:z,beforeUnmount:O,destroyed:P,unmounted:B,render:G,renderTracked:le,renderTriggered:ae,errorCaptured:Fe,serverPrefetch:yt,expose:Ge,inheritAttrs:vt,components:Ct,directives:We,filters:rn}=t;if(u&&So(u,r,null),o)for(const Y in o){const W=o[Y];H(W)&&(r[Y]=W.bind(n))}if(s){const Y=s.call(n,n);J(Y)&&(e.data=cr(Y))}if(zr=!0,i)for(const Y in i){const W=i[Y],ot=H(W)?W.bind(n,n):H(W.get)?W.get.bind(n,n):st,wt=!H(W)&&H(W.set)?W.set.bind(n):st,Qe=Me({get:ot,set:wt});Object.defineProperty(r,Y,{enumerable:!0,configurable:!0,get:()=>Qe.value,set:qe=>Qe.value=qe})}if(a)for(const Y in a)ml(a[Y],r,n,Y);if(l){const Y=H(l)?l.call(n):l;Reflect.ownKeys(Y).forEach(W=>{Vn(W,Y[W])})}c&&Ns(c,e,"c");function de(Y,W){$(W)?W.forEach(ot=>Y(ot.bind(n))):W&&Y(W.bind(n))}if(de(uo,p),de(fr,h),de(po,m),de(fo,b),de(ao,S),de(oo,C),de(_o,Fe),de(bo,le),de(go,ae),de(ho,O),de(Tn,B),de(mo,yt),$(Ge))if(Ge.length){const Y=e.exposed||(e.exposed={});Ge.forEach(W=>{Object.defineProperty(Y,W,{get:()=>n[W],set:ot=>n[W]=ot,enumerable:!0})})}else e.exposed||(e.exposed={});G&&e.render===st&&(e.render=G),vt!=null&&(e.inheritAttrs=vt),Ct&&(e.components=Ct),We&&(e.directives=We),yt&&ul(e)}function So(e,t,n=st){$(e)&&(e=Lr(e));for(const r in e){const s=e[r];let i;J(s)?"default"in s?i=ze(s.from||r,s.default,!0):i=ze(s.from||r):i=ze(s),ve(i)?Object.defineProperty(t,r,{enumerable:!0,configurable:!0,get:()=>i.value,set:o=>i.value=o}):t[r]=i}}function Ns(e,t,n){at($(e)?e.map(r=>r.bind(t.proxy)):e.bind(t.proxy),t,n)}function ml(e,t,n,r){let s=r.includes(".")?ol(n,r):()=>n[r];if(ce(e)){const i=t[e];H(i)&&gn(s,i)}else if(H(e))gn(s,e.bind(n));else if(J(e))if($(e))e.forEach(i=>ml(i,t,n,r));else{const i=H(e.handler)?e.handler.bind(n):t[e.handler];H(i)&&gn(s,i,e)}}function gl(e){const t=e.type,{mixins:n,extends:r}=t,{mixins:s,optionsCache:i,config:{optionMergeStrategies:o}}=e.appContext,a=i.get(t);let l;return a?l=a:!s.length&&!n&&!r?l=t:(l={},s.length&&s.forEach(u=>Zn(l,u,o,!0)),Zn(l,t,o)),J(t)&&i.set(t,l),l}function Zn(e,t,n,r=!1){const{mixins:s,extends:i}=t;i&&Zn(e,i,n,!0),s&&s.forEach(o=>Zn(e,o,n,!0));for(const o in t)if(!(r&&o==="expose")){const a=Ro[o]||n&&n[o];e[o]=a?a(e[o],t[o]):t[o]}return e}const Ro={data:$s,props:Vs,emits:Vs,methods:un,computed:un,beforeCreate:we,created:we,beforeMount:we,mounted:we,beforeUpdate:we,updated:we,beforeDestroy:we,beforeUnmount:we,destroyed:we,unmounted:we,activated:we,deactivated:we,errorCaptured:we,serverPrefetch:we,components:un,directives:un,watch:Oo,provide:$s,inject:qo};function $s(e,t){return t?e?function(){return me(H(e)?e.call(this,this):e,H(t)?t.call(this,this):t)}:t:e}function qo(e,t){return un(Lr(e),Lr(t))}function Lr(e){if($(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function we(e,t){return e?[...new Set([].concat(e,t))]:t}function un(e,t){return e?me(Object.create(null),e,t):t}function Vs(e,t){return e?$(e)&&$(t)?[...new Set([...e,...t])]:me(Object.create(null),Ls(e),Ls(t??{})):t}function Oo(e,t){if(!e)return t;if(!t)return e;const n=me(Object.create(null),e);for(const r in t)n[r]=we(e[r],t[r]);return n}function bl(){return{app:null,config:{isNativeTag:Ai,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Eo=0;function Co(e,t){return function(r,s=null){H(r)||(r=me({},r)),s!=null&&!J(s)&&(s=null);const i=bl(),o=new WeakSet,a=[];let l=!1;const u=i.app={_uid:Eo++,_component:r,_props:s,_container:null,_context:i,_instance:null,version:uc,get config(){return i.config},set config(c){},use(c,...p){return o.has(c)||(c&&H(c.install)?(o.add(c),c.install(u,...p)):H(c)&&(o.add(c),c(u,...p))),u},mixin(c){return i.mixins.includes(c)||i.mixins.push(c),u},component(c,p){return p?(i.components[c]=p,u):i.components[c]},directive(c,p){return p?(i.directives[c]=p,u):i.directives[c]},mount(c,p,h){if(!l){const m=u._ceVNode||ue(r,s);return m.appContext=i,h===!0?h="svg":h===!1&&(h=void 0),e(m,c,h),l=!0,u._container=c,c.__vue_app__=u,ds(m.component)}},onUnmount(c){a.push(c)},unmount(){l&&(at(a,u._instance,16),e(null,u._container),delete u._container.__vue_app__)},provide(c,p){return i.provides[c]=p,u},runWithContext(c){const p=Xt;Xt=u;try{return c()}finally{Xt=p}}};return u}}let Xt=null;const Ao=(e,t)=>t==="modelValue"||t==="model-value"?e.modelModifiers:e[`${t}Modifiers`]||e[`${Re(t)}Modifiers`]||e[`${$t(t)}Modifiers`];function To(e,t,...n){if(e.isUnmounted)return;const r=e.vnode.props||se;let s=n;const i=t.startsWith("update:"),o=i&&Ao(r,t.slice(7));o&&(o.trim&&(s=n.map(c=>ce(c)?c.trim():c)),o.number&&(s=n.map(ga)));let a,l=r[a=_r(t)]||r[a=_r(Re(t))];!l&&i&&(l=r[a=_r($t(t))]),l&&at(l,e,6,s);const u=r[a+"Once"];if(u){if(!e.emitted)e.emitted={};else if(e.emitted[a])return;e.emitted[a]=!0,at(u,e,6,s)}}const Do=new WeakMap;function _l(e,t,n=!1){const r=n?Do:t.emitsCache,s=r.get(e);if(s!==void 0)return s;const i=e.emits;let o={},a=!1;if(!H(e)){const l=u=>{const c=_l(u,t,!0);c&&(a=!0,me(o,c))};!n&&t.mixins.length&&t.mixins.forEach(l),e.extends&&l(e.extends),e.mixins&&e.mixins.forEach(l)}return!i&&!a?(J(e)&&r.set(e,null),null):($(i)?i.forEach(l=>o[l]=null):me(o,i),J(e)&&r.set(e,o),o)}function dr(e,t){return!e||!rr(t)?!1:(t=t.slice(2).replace(/Once$/,""),Z(e,t[0].toLowerCase()+t.slice(1))||Z(e,$t(t))||Z(e,t))}function Hs(e){const{type:t,vnode:n,proxy:r,withProxy:s,propsOptions:[i],slots:o,attrs:a,emit:l,render:u,renderCache:c,props:p,data:h,setupState:m,ctx:b,inheritAttrs:S}=e,C=Qn(e);let z,O;try{if(n.shapeFlag&4){const B=s||r,G=B;z=nt(u.call(G,B,c,p,m,h,b)),O=a}else{const B=t;z=nt(B.length>1?B(p,{attrs:a,slots:o,emit:l}):B(p,null)),O=t.props?a:Bo(a)}}catch(B){vn.length=0,ur(B,e,1),z=ue(Et)}let P=z;if(O&&S!==!1){const B=Object.keys(O),{shapeFlag:G}=P;B.length&&G&7&&(i&&B.some(sr)&&(O=Po(O,i)),P=Yt(P,O,!1,!0))}return n.dirs&&(P=Yt(P,null,!1,!0),P.dirs=P.dirs?P.dirs.concat(n.dirs):n.dirs),n.transition&&cs(P,n.transition),z=P,Qn(C),z}const Bo=e=>{let t;for(const n in e)(n==="class"||n==="style"||rr(n))&&((t||(t={}))[n]=e[n]);return t},Po=(e,t)=>{const n={};for(const r in e)(!sr(r)||!(r.slice(9)in t))&&(n[r]=e[r]);return n};function Mo(e,t,n){const{props:r,children:s,component:i}=e,{props:o,children:a,patchFlag:l}=t,u=i.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&l>=0){if(l&1024)return!0;if(l&16)return r?js(r,o,u):!!o;if(l&8){const c=t.dynamicProps;for(let p=0;p<c.length;p++){const h=c[p];if(yl(o,r,h)&&!dr(u,h))return!0}}}else return(s||a)&&(!a||!a.$stable)?!0:r===o?!1:r?o?js(r,o,u):!0:!!o;return!1}function js(e,t,n){const r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let s=0;s<r.length;s++){const i=r[s];if(yl(t,e,i)&&!dr(n,i))return!0}return!1}function yl(e,t,n){const r=e[n],s=t[n];return n==="style"&&J(r)&&J(s)?!Yr(r,s):r!==s}function Io({vnode:e,parent:t,suspense:n},r){for(;t;){const s=t.subTree;if(s.suspense&&s.suspense.activeBranch===e&&(s.suspense.vnode.el=s.el=r,e=s),s===e)(e=t.vnode).el=r,t=t.parent;else break}n&&n.activeBranch===e&&(n.vnode.el=r)}const vl={},wl=()=>Object.create(vl),kl=e=>Object.getPrototypeOf(e)===vl;function zo(e,t,n,r=!1){const s={},i=wl();e.propsDefaults=Object.create(null),xl(e,t,s,i);for(const o in e.propsOptions[0])o in s||(s[o]=void 0);n?e.props=r?s:Yi(s):e.type.props?e.props=s:e.props=i,e.attrs=i}function Lo(e,t,n,r){const{props:s,attrs:i,vnode:{patchFlag:o}}=e,a=K(s),[l]=e.propsOptions;let u=!1;if((r||o>0)&&!(o&16)){if(o&8){const c=e.vnode.dynamicProps;for(let p=0;p<c.length;p++){let h=c[p];if(dr(e.emitsOptions,h))continue;const m=t[h];if(l)if(Z(i,h))m!==i[h]&&(i[h]=m,u=!0);else{const b=Re(h);s[b]=Nr(l,a,b,m,e,!1)}else m!==i[h]&&(i[h]=m,u=!0)}}}else{xl(e,t,s,i)&&(u=!0);let c;for(const p in a)(!t||!Z(t,p)&&((c=$t(p))===p||!Z(t,c)))&&(l?n&&(n[p]!==void 0||n[c]!==void 0)&&(s[p]=Nr(l,a,p,void 0,e,!0)):delete s[p]);if(i!==a)for(const p in i)(!t||!Z(t,p))&&(delete i[p],u=!0)}u&&dt(e.attrs,"set","")}function xl(e,t,n,r){const[s,i]=e.propsOptions;let o=!1,a;if(t)for(let l in t){if(dn(l))continue;const u=t[l];let c;s&&Z(s,c=Re(l))?!i||!i.includes(c)?n[c]=u:(a||(a={}))[c]=u:dr(e.emitsOptions,l)||(!(l in r)||u!==r[l])&&(r[l]=u,o=!0)}if(i){const l=K(n),u=a||se;for(let c=0;c<i.length;c++){const p=i[c];n[p]=Nr(s,l,p,u[p],e,!Z(u,p))}}return o}function Nr(e,t,n,r,s,i){const o=e[n];if(o!=null){const a=Z(o,"default");if(a&&r===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&H(l)){const{propsDefaults:u}=s;if(n in u)r=u[n];else{const c=Dn(s);r=u[n]=l.call(null,t),c()}}else r=l;s.ce&&s.ce._setProp(n,r)}o[0]&&(i&&!a?r=!1:o[1]&&(r===""||r===$t(n))&&(r=!0))}return r}const No=new WeakMap;function Sl(e,t,n=!1){const r=n?No:t.propsCache,s=r.get(e);if(s)return s;const i=e.props,o={},a=[];let l=!1;if(!H(e)){const c=p=>{l=!0;const[h,m]=Sl(p,t,!0);me(o,h),m&&a.push(...m)};!n&&t.mixins.length&&t.mixins.forEach(c),e.extends&&c(e.extends),e.mixins&&e.mixins.forEach(c)}if(!i&&!l)return J(e)&&r.set(e,Qt),Qt;if($(i))for(let c=0;c<i.length;c++){const p=Re(i[c]);Us(p)&&(o[p]=se)}else if(i)for(const c in i){const p=Re(c);if(Us(p)){const h=i[c],m=o[p]=$(h)||H(h)?{type:h}:me({},h),b=m.type;let S=!1,C=!0;if($(b))for(let z=0;z<b.length;++z){const O=b[z],P=H(O)&&O.name;if(P==="Boolean"){S=!0;break}else P==="String"&&(C=!1)}else S=H(b)&&b.name==="Boolean";m[0]=S,m[1]=C,(S||Z(m,"default"))&&a.push(p)}}const u=[o,a];return J(e)&&r.set(e,u),u}function Us(e){return e[0]!=="$"&&!dn(e)}const us=e=>e==="_"||e==="_ctx"||e==="$stable",ps=e=>$(e)?e.map(nt):[nt(e)],$o=(e,t,n)=>{if(t._n)return t;const r=$n((...s)=>ps(t(...s)),n);return r._c=!1,r},Rl=(e,t,n)=>{const r=e._ctx;for(const s in e){if(us(s))continue;const i=e[s];if(H(i))t[s]=$o(s,i,r);else if(i!=null){const o=ps(i);t[s]=()=>o}}},ql=(e,t)=>{const n=ps(t);e.slots.default=()=>n},Ol=(e,t,n)=>{for(const r in t)(n||!us(r))&&(e[r]=t[r])},Vo=(e,t,n)=>{const r=e.slots=wl();if(e.vnode.shapeFlag&32){const s=t._;s?(Ol(r,t,n),n&&Mi(r,"_",s,!0)):Rl(t,r)}else t&&ql(e,t)},Ho=(e,t,n)=>{const{vnode:r,slots:s}=e;let i=!0,o=se;if(r.shapeFlag&32){const a=t._;a?n&&a===1?i=!1:Ol(s,t,n):(i=!t.$stable,Rl(t,s)),o=t}else t&&(ql(e,t),o={default:1});if(i)for(const a in s)!us(a)&&o[a]==null&&delete s[a]},Oe=Wo;function jo(e){return Uo(e)}function Uo(e,t){const n=ar();n.__VUE__=!0;const{insert:r,remove:s,patchProp:i,createElement:o,createText:a,createComment:l,setText:u,setElementText:c,parentNode:p,nextSibling:h,setScopeId:m=st,insertStaticContent:b}=e,S=(f,d,g,y=null,k=null,v=null,E=void 0,q=null,R=!!d.dynamicChildren)=>{if(f===d)return;f&&!an(f,d)&&(y=w(f),qe(f,k,v,!0),f=null),d.patchFlag===-2&&(R=!1,d.dynamicChildren=null);const{type:x,ref:L,shapeFlag:T}=d;switch(x){case hr:C(f,d,g,y);break;case Et:z(f,d,g,y);break;case Hn:f==null&&O(d,g,y,E);break;case Be:Ct(f,d,g,y,k,v,E,q,R);break;default:T&1?G(f,d,g,y,k,v,E,q,R):T&6?We(f,d,g,y,k,v,E,q,R):(T&64||T&128)&&x.process(f,d,g,y,k,v,E,q,R,M)}L!=null&&k?bn(L,f&&f.ref,v,d||f,!d):L==null&&f&&f.ref!=null&&bn(f.ref,null,v,f,!0)},C=(f,d,g,y)=>{if(f==null)r(d.el=a(d.children),g,y);else{const k=d.el=f.el;d.children!==f.children&&u(k,d.children)}},z=(f,d,g,y)=>{f==null?r(d.el=l(d.children||""),g,y):d.el=f.el},O=(f,d,g,y)=>{[f.el,f.anchor]=b(f.children,d,g,y,f.el,f.anchor)},P=({el:f,anchor:d},g,y)=>{let k;for(;f&&f!==d;)k=h(f),r(f,g,y),f=k;r(d,g,y)},B=({el:f,anchor:d})=>{let g;for(;f&&f!==d;)g=h(f),s(f),f=g;s(d)},G=(f,d,g,y,k,v,E,q,R)=>{if(d.type==="svg"?E="svg":d.type==="math"&&(E="mathml"),f==null)le(d,g,y,k,v,E,q,R);else{const x=f.el&&f.el._isVueCE?f.el:null;try{x&&x._beginPatch(),yt(f,d,k,v,E,q,R)}finally{x&&x._endPatch()}}},le=(f,d,g,y,k,v,E,q)=>{let R,x;const{props:L,shapeFlag:T,transition:I,dirs:N}=f;if(R=f.el=o(f.type,v,L&&L.is,L),T&8?c(R,f.children):T&16&&Fe(f.children,R,null,y,k,Rr(f,v),E,q),N&&Tt(f,null,y,"created"),ae(R,f,f.scopeId,E,y),L){for(const te in L)te!=="value"&&!dn(te)&&i(R,te,null,L[te],v,y);"value"in L&&i(R,"value",null,L.value,v),(x=L.onVnodeBeforeMount)&&Je(x,y,f)}N&&Tt(f,null,y,"beforeMount");const F=Fo(k,I);F&&I.beforeEnter(R),r(R,d,g),((x=L&&L.onVnodeMounted)||F||N)&&Oe(()=>{try{x&&Je(x,y,f),F&&I.enter(R),N&&Tt(f,null,y,"mounted")}finally{}},k)},ae=(f,d,g,y,k)=>{if(g&&m(f,g),y)for(let v=0;v<y.length;v++)m(f,y[v]);if(k){let v=k.subTree;if(d===v||Tl(v.type)&&(v.ssContent===d||v.ssFallback===d)){const E=k.vnode;ae(f,E,E.scopeId,E.slotScopeIds,k.parent)}}},Fe=(f,d,g,y,k,v,E,q,R=0)=>{for(let x=R;x<f.length;x++){const L=f[x]=q?ft(f[x]):nt(f[x]);S(null,L,d,g,y,k,v,E,q)}},yt=(f,d,g,y,k,v,E)=>{const q=d.el=f.el;let{patchFlag:R,dynamicChildren:x,dirs:L}=d;R|=f.patchFlag&16;const T=f.props||se,I=d.props||se;let N;if(g&&Dt(g,!1),(N=I.onVnodeBeforeUpdate)&&Je(N,g,d,f),L&&Tt(d,f,g,"beforeUpdate"),g&&Dt(g,!0),(T.innerHTML&&I.innerHTML==null||T.textContent&&I.textContent==null)&&c(q,""),x?Ge(f.dynamicChildren,x,q,g,y,Rr(d,k),v):E||W(f,d,q,null,g,y,Rr(d,k),v,!1),R>0){if(R&16)vt(q,T,I,g,k);else if(R&2&&T.class!==I.class&&i(q,"class",null,I.class,k),R&4&&i(q,"style",T.style,I.style,k),R&8){const F=d.dynamicProps;for(let te=0;te<F.length;te++){const ne=F[te],pe=T[ne],he=I[ne];(he!==pe||ne==="value")&&i(q,ne,pe,he,k,g)}}R&1&&f.children!==d.children&&c(q,d.children)}else!E&&x==null&&vt(q,T,I,g,k);((N=I.onVnodeUpdated)||L)&&Oe(()=>{N&&Je(N,g,d,f),L&&Tt(d,f,g,"updated")},y)},Ge=(f,d,g,y,k,v,E)=>{for(let q=0;q<d.length;q++){const R=f[q],x=d[q],L=R.el&&(R.type===Be||!an(R,x)||R.shapeFlag&198)?p(R.el):g;S(R,x,L,null,y,k,v,E,!0)}},vt=(f,d,g,y,k)=>{if(d!==g){if(d!==se)for(const v in d)!dn(v)&&!(v in g)&&i(f,v,d[v],null,k,y);for(const v in g){if(dn(v))continue;const E=g[v],q=d[v];E!==q&&v!=="value"&&i(f,v,q,E,k,y)}"value"in g&&i(f,"value",d.value,g.value,k)}},Ct=(f,d,g,y,k,v,E,q,R)=>{const x=d.el=f?f.el:a(""),L=d.anchor=f?f.anchor:a("");let{patchFlag:T,dynamicChildren:I,slotScopeIds:N}=d;N&&(q=q?q.concat(N):N),f==null?(r(x,g,y),r(L,g,y),Fe(d.children||[],g,L,k,v,E,q,R)):T>0&&T&64&&I&&f.dynamicChildren&&f.dynamicChildren.length===I.length?(Ge(f.dynamicChildren,I,g,k,v,E,q),(d.key!=null||k&&d===k.subTree)&&El(f,d,!0)):W(f,d,g,L,k,v,E,q,R)},We=(f,d,g,y,k,v,E,q,R)=>{d.slotScopeIds=q,f==null?d.shapeFlag&512?k.ctx.activate(d,g,y,E,R):rn(d,g,y,k,v,E,R):Ht(f,d,R)},rn=(f,d,g,y,k,v,E)=>{const q=f.component=nc(f,y,k);if(pl(f)&&(q.ctx.renderer=M),sc(q,!1,E),q.asyncDep){if(k&&k.registerDep(q,de,E),!f.el){const R=q.subTree=ue(Et);z(null,R,d,g),f.placeholder=R.el}}else de(q,f,d,g,k,v,E)},Ht=(f,d,g)=>{const y=d.component=f.component;if(Mo(f,d,g))if(y.asyncDep&&!y.asyncResolved){Y(y,d,g);return}else y.next=d,y.update();else d.el=f.el,y.vnode=d},de=(f,d,g,y,k,v,E)=>{const q=()=>{if(f.isMounted){let{next:T,bu:I,u:N,parent:F,vnode:te}=f;{const Ze=Cl(f);if(Ze){T&&(T.el=te.el,Y(f,T,E)),Ze.asyncDep.then(()=>{Oe(()=>{f.isUnmounted||x()},k)});return}}let ne=T,pe;Dt(f,!1),T?(T.el=te.el,Y(f,T,E)):T=te,I&&yr(I),(pe=T.props&&T.props.onVnodeBeforeUpdate)&&Je(pe,F,T,te),Dt(f,!0);const he=Hs(f),Ke=f.subTree;f.subTree=he,S(Ke,he,p(Ke.el),w(Ke),f,k,v),T.el=he.el,ne===null&&Io(f,he.el),N&&Oe(N,k),(pe=T.props&&T.props.onVnodeUpdated)&&Oe(()=>Je(pe,F,T,te),k)}else{let T;const{el:I,props:N}=d,{bm:F,m:te,parent:ne,root:pe,type:he}=f,Ke=_n(d);Dt(f,!1),F&&yr(F),!Ke&&(T=N&&N.onVnodeBeforeMount)&&Je(T,ne,d),Dt(f,!0);{pe.ce&&pe.ce._hasShadowRoot()&&pe.ce._injectChildStyle(he,f.parent?f.parent.type:void 0);const Ze=f.subTree=Hs(f);S(null,Ze,g,y,f,k,v),d.el=Ze.el}if(te&&Oe(te,k),!Ke&&(T=N&&N.onVnodeMounted)){const Ze=d;Oe(()=>Je(T,ne,Ze),k)}(d.shapeFlag&256||ne&&_n(ne.vnode)&&ne.vnode.shapeFlag&256)&&f.a&&Oe(f.a,k),f.isMounted=!0,d=g=y=null}};f.scope.on();const R=f.effect=new Ni(q);f.scope.off();const x=f.update=R.run.bind(R),L=f.job=R.runIfDirty.bind(R);L.i=f,L.id=f.uid,R.scheduler=()=>os(L),Dt(f,!0),x()},Y=(f,d,g)=>{d.component=f;const y=f.vnode.props;f.vnode=d,f.next=null,Lo(f,d.props,y,g),Ho(f,d.children,g),mt(),Ps(f),gt()},W=(f,d,g,y,k,v,E,q,R=!1)=>{const x=f&&f.children,L=f?f.shapeFlag:0,T=d.children,{patchFlag:I,shapeFlag:N}=d;if(I>0){if(I&128){wt(x,T,g,y,k,v,E,q,R);return}else if(I&256){ot(x,T,g,y,k,v,E,q,R);return}}N&8?(L&16&&Te(x,k,v),T!==x&&c(g,T)):L&16?N&16?wt(x,T,g,y,k,v,E,q,R):Te(x,k,v,!0):(L&8&&c(g,""),N&16&&Fe(T,g,y,k,v,E,q,R))},ot=(f,d,g,y,k,v,E,q,R)=>{f=f||Qt,d=d||Qt;const x=f.length,L=d.length,T=Math.min(x,L);let I;for(I=0;I<T;I++){const N=d[I]=R?ft(d[I]):nt(d[I]);S(f[I],N,g,null,k,v,E,q,R)}x>L?Te(f,k,v,!0,!1,T):Fe(d,g,y,k,v,E,q,R,T)},wt=(f,d,g,y,k,v,E,q,R)=>{let x=0;const L=d.length;let T=f.length-1,I=L-1;for(;x<=T&&x<=I;){const N=f[x],F=d[x]=R?ft(d[x]):nt(d[x]);if(an(N,F))S(N,F,g,null,k,v,E,q,R);else break;x++}for(;x<=T&&x<=I;){const N=f[T],F=d[I]=R?ft(d[I]):nt(d[I]);if(an(N,F))S(N,F,g,null,k,v,E,q,R);else break;T--,I--}if(x>T){if(x<=I){const N=I+1,F=N<L?d[N].el:y;for(;x<=I;)S(null,d[x]=R?ft(d[x]):nt(d[x]),g,F,k,v,E,q,R),x++}}else if(x>I)for(;x<=T;)qe(f[x],k,v,!0),x++;else{const N=x,F=x,te=new Map;for(x=F;x<=I;x++){const Ee=d[x]=R?ft(d[x]):nt(d[x]);Ee.key!=null&&te.set(Ee.key,x)}let ne,pe=0;const he=I-F+1;let Ke=!1,Ze=0;const sn=new Array(he);for(x=0;x<he;x++)sn[x]=0;for(x=N;x<=T;x++){const Ee=f[x];if(pe>=he){qe(Ee,k,v,!0);continue}let Xe;if(Ee.key!=null)Xe=te.get(Ee.key);else for(ne=F;ne<=I;ne++)if(sn[ne-F]===0&&an(Ee,d[ne])){Xe=ne;break}Xe===void 0?qe(Ee,k,v,!0):(sn[Xe-F]=x+1,Xe>=Ze?Ze=Xe:Ke=!0,S(Ee,d[Xe],g,null,k,v,E,q,R),pe++)}const Os=Ke?Go(sn):Qt;for(ne=Os.length-1,x=he-1;x>=0;x--){const Ee=F+x,Xe=d[Ee],Es=d[Ee+1],Cs=Ee+1<L?Es.el||Al(Es):y;sn[x]===0?S(null,Xe,g,Cs,k,v,E,q,R):Ke&&(ne<0||x!==Os[ne]?Qe(Xe,g,Cs,2):ne--)}}},Qe=(f,d,g,y,k=null)=>{const{el:v,type:E,transition:q,children:R,shapeFlag:x}=f;if(x&6){Qe(f.component.subTree,d,g,y);return}if(x&128){f.suspense.move(d,g,y);return}if(x&64){E.move(f,d,g,M);return}if(E===Be){r(v,d,g);for(let T=0;T<R.length;T++)Qe(R[T],d,g,y);r(f.anchor,d,g);return}if(E===Hn){P(f,d,g);return}if(y!==2&&x&1&&q)if(y===0)q.beforeEnter(v),r(v,d,g),Oe(()=>q.enter(v),k);else{const{leave:T,delayLeave:I,afterLeave:N}=q,F=()=>{f.ctx.isUnmounted?s(v):r(v,d,g)},te=()=>{v._isLeaving&&v[lo](!0),T(v,()=>{F(),N&&N()})};I?I(v,F,te):te()}else r(v,d,g)},qe=(f,d,g,y=!1,k=!1)=>{const{type:v,props:E,ref:q,children:R,dynamicChildren:x,shapeFlag:L,patchFlag:T,dirs:I,cacheIndex:N,memo:F}=f;if(T===-2&&(k=!1),q!=null&&(mt(),bn(q,null,g,f,!0),gt()),N!=null&&(d.renderCache[N]=void 0),L&256){d.ctx.deactivate(f);return}const te=L&1&&I,ne=!_n(f);let pe;if(ne&&(pe=E&&E.onVnodeBeforeUnmount)&&Je(pe,d,f),L&6)At(f.component,g,y);else{if(L&128){f.suspense.unmount(g,y);return}te&&Tt(f,null,d,"beforeUnmount"),L&64?f.type.remove(f,d,g,M,y):x&&!x.hasOnce&&(v!==Be||T>0&&T&64)?Te(x,d,g,!1,!0):(v===Be&&T&384||!k&&L&16)&&Te(R,d,g),y&&jt(f)}const he=F!=null&&N==null;(ne&&(pe=E&&E.onVnodeUnmounted)||te||he)&&Oe(()=>{pe&&Je(pe,d,f),te&&Tt(f,null,d,"unmounted"),he&&(f.el=null)},g)},jt=f=>{const{type:d,el:g,anchor:y,transition:k}=f;if(d===Be){Ut(g,y);return}if(d===Hn){B(f);return}const v=()=>{s(g),k&&!k.persisted&&k.afterLeave&&k.afterLeave()};if(f.shapeFlag&1&&k&&!k.persisted){const{leave:E,delayLeave:q}=k,R=()=>E(g,v);q?q(f.el,v,R):R()}else v()},Ut=(f,d)=>{let g;for(;f!==d;)g=h(f),s(f),f=g;s(d)},At=(f,d,g)=>{const{bum:y,scope:k,job:v,subTree:E,um:q,m:R,a:x}=f;Fs(R),Fs(x),y&&yr(y),k.stop(),v&&(v.flags|=8,qe(E,f,d,g)),q&&Oe(q,d),Oe(()=>{f.isUnmounted=!0},d)},Te=(f,d,g,y=!1,k=!1,v=0)=>{for(let E=v;E<f.length;E++)qe(f[E],d,g,y,k)},w=f=>{if(f.shapeFlag&6)return w(f.component.subTree);if(f.shapeFlag&128)return f.suspense.next();const d=h(f.anchor||f.el),g=d&&d[so];return g?h(g):d};let D=!1;const A=(f,d,g)=>{let y;f==null?d._vnode&&(qe(d._vnode,null,null,!0),y=d._vnode.component):S(d._vnode||null,f,d,null,null,null,g),d._vnode=f,D||(D=!0,Ps(y),sl(),D=!1)},M={p:S,um:qe,m:Qe,r:jt,mt:rn,mc:Fe,pc:W,pbc:Ge,n:w,o:e};return{render:A,hydrate:void 0,createApp:Co(A)}}function Rr({type:e,props:t},n){return n==="svg"&&e==="foreignObject"||n==="mathml"&&e==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function Dt({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function Fo(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function El(e,t,n=!1){const r=e.children,s=t.children;if($(r)&&$(s))for(let i=0;i<r.length;i++){const o=r[i];let a=s[i];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=s[i]=ft(s[i]),a.el=o.el),!n&&a.patchFlag!==-2&&El(o,a)),a.type===hr&&(a.patchFlag===-1&&(a=s[i]=ft(a)),a.el=o.el),a.type===Et&&!a.el&&(a.el=o.el)}}function Go(e){const t=e.slice(),n=[0];let r,s,i,o,a;const l=e.length;for(r=0;r<l;r++){const u=e[r];if(u!==0){if(s=n[n.length-1],e[s]<u){t[r]=s,n.push(r);continue}for(i=0,o=n.length-1;i<o;)a=i+o>>1,e[n[a]]<u?i=a+1:o=a;u<e[n[i]]&&(i>0&&(t[r]=n[i-1]),n[i]=r)}}for(i=n.length,o=n[i-1];i-- >0;)n[i]=o,o=t[o];return n}function Cl(e){const t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:Cl(t)}function Fs(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}function Al(e){if(e.placeholder)return e.placeholder;const t=e.component;return t?Al(t.subTree):null}const Tl=e=>e.__isSuspense;function Wo(e,t){t&&t.pendingBranch?$(e)?t.effects.push(...e):t.effects.push(e):eo(e)}const Be=Symbol.for("v-fgt"),hr=Symbol.for("v-txt"),Et=Symbol.for("v-cmt"),Hn=Symbol.for("v-stc"),vn=[];let Ae=null;function He(e=!1){vn.push(Ae=e?null:[])}function Qo(){vn.pop(),Ae=vn[vn.length-1]||null}let Rn=1;function Xn(e,t=!1){Rn+=e,e<0&&Ae&&t&&(Ae.hasOnce=!0)}function Dl(e){return e.dynamicChildren=Rn>0?Ae||Qt:null,Qo(),Rn>0&&Ae&&Ae.push(e),e}function it(e,t,n,r,s,i){return Dl(_(e,t,n,r,s,i,!0))}function Ko(e,t,n,r,s){return Dl(ue(e,t,n,r,s,!0))}function Jn(e){return e?e.__v_isVNode===!0:!1}function an(e,t){return e.type===t.type&&e.key===t.key}const Bl=({key:e})=>e??null,jn=({ref:e,ref_key:t,ref_for:n})=>(typeof e=="number"&&(e=""+e),e!=null?ce(e)||ve(e)||H(e)?{i:$e,r:e,k:t,f:!!n}:e:null);function _(e,t=null,n=null,r=0,s=null,i=e===Be?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Bl(t),ref:t&&jn(t),scopeId:ll,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:r,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:$e};return a?(fs(l,n),i&128&&e.normalize(l)):n&&(l.shapeFlag|=ce(n)?8:16),Rn>0&&!o&&Ae&&(l.patchFlag>0||i&6)&&l.patchFlag!==32&&Ae.push(l),l}const ue=Zo;function Zo(e,t=null,n=null,r=0,s=null,i=!1){if((!e||e===vo)&&(e=Et),Jn(e)){const a=Yt(e,t,!0);return n&&fs(a,n),Rn>0&&!i&&Ae&&(a.shapeFlag&6?Ae[Ae.indexOf(e)]=a:Ae.push(a)),a.patchFlag=-2,a}if(cc(e)&&(e=e.__vccOpts),t){t=Xo(t);let{class:a,style:l}=t;a&&!ce(a)&&(t.class=ht(a)),J(l)&&(ls(l)&&!$(l)&&(l=me({},l)),t.style=Jr(l))}const o=ce(e)?1:Tl(e)?128:io(e)?64:J(e)?4:H(e)?2:0;return _(e,t,n,r,s,o,i,!0)}function Xo(e){return e?ls(e)||kl(e)?me({},e):e:null}function Yt(e,t,n=!1,r=!1){const{props:s,ref:i,patchFlag:o,children:a,transition:l}=e,u=t?Yo(s||{},t):s,c={__v_isVNode:!0,__v_skip:!0,type:e.type,props:u,key:u&&Bl(u),ref:t&&t.ref?n&&i?$(i)?i.concat(jn(t)):[i,jn(t)]:jn(t):i,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:a,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==Be?o===-1?16:o|16:o,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:l,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Yt(e.ssContent),ssFallback:e.ssFallback&&Yt(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return l&&r&&cs(c,l.clone(c)),c}function qn(e=" ",t=0){return ue(hr,null,e,t)}function zn(e,t){const n=ue(Hn,null,e);return n.staticCount=t,n}function Jo(e="",t=!1){return t?(He(),Ko(Et,null,e)):ue(Et,null,e)}function nt(e){return e==null||typeof e=="boolean"?ue(Et):$(e)?ue(Be,null,e.slice()):Jn(e)?ft(e):ue(hr,null,String(e))}function ft(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:Yt(e)}function fs(e,t){let n=0;const{shapeFlag:r}=e;if(t==null)t=null;else if($(t))n=16;else if(typeof t=="object")if(r&65){const s=t.default;s&&(s._c&&(s._d=!1),fs(e,s()),s._c&&(s._d=!0));return}else{n=32;const s=t._;!s&&!kl(t)?t._ctx=$e:s===3&&$e&&($e.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else H(t)?(t={default:t,_ctx:$e},n=32):(t=String(t),r&64?(n=16,t=[qn(t)]):n=8);e.children=t,e.shapeFlag|=n}function Yo(...e){const t={};for(let n=0;n<e.length;n++){const r=e[n];for(const s in r)if(s==="class")t.class!==r.class&&(t.class=ht([t.class,r.class]));else if(s==="style")t.style=Jr([t.style,r.style]);else if(rr(s)){const i=t[s],o=r[s];o&&i!==o&&!($(i)&&i.includes(o))?t[s]=i?[].concat(i,o):o:o==null&&i==null&&!sr(s)&&(t[s]=o)}else s!==""&&(t[s]=r[s])}return t}function Je(e,t,n,r=null){at(e,t,7,[n,r])}const ec=bl();let tc=0;function nc(e,t,n){const r=e.type,s=(t?t.appContext:e.appContext)||ec,i={uid:tc++,vnode:e,type:r,parent:t,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Sa(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(s.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Sl(r,s),emitsOptions:_l(r,s),emit:null,emitted:null,propsDefaults:se,inheritAttrs:r.inheritAttrs,ctx:se,data:se,props:se,attrs:se,slots:se,refs:se,setupState:se,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=t?t.root:i,i.emit=To.bind(null,i),e.ce&&e.ce(i),i}let _e=null;const rc=()=>_e||$e;let Yn,$r;{const e=ar(),t=(n,r)=>{let s;return(s=e[n])||(s=e[n]=[]),s.push(r),i=>{s.length>1?s.forEach(o=>o(i)):s[0](i)}};Yn=t("__VUE_INSTANCE_SETTERS__",n=>_e=n),$r=t("__VUE_SSR_SETTERS__",n=>On=n)}const Dn=e=>{const t=_e;return Yn(e),e.scope.on(),()=>{e.scope.off(),Yn(t)}},Gs=()=>{_e&&_e.scope.off(),Yn(null)};function Pl(e){return e.vnode.shapeFlag&4}let On=!1;function sc(e,t=!1,n=!1){t&&$r(t);const{props:r,children:s}=e.vnode,i=Pl(e);zo(e,r,i,t),Vo(e,s,n||t);const o=i?ic(e,t):void 0;return t&&$r(!1),o}function ic(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,ko);const{setup:r}=n;if(r){mt();const s=e.setupContext=r.length>1?ac(e):null,i=Dn(e),o=An(r,e,0,[e.props,s]),a=Di(o);if(gt(),i(),(a||e.sp)&&!_n(e)&&ul(e),a){if(o.then(Gs,Gs),t)return o.then(l=>{Ws(e,l)}).catch(l=>{ur(l,e,0)});e.asyncDep=o}else Ws(e,o)}else Ml(e)}function Ws(e,t,n){H(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:J(t)&&(e.setupState=tl(t)),Ml(e)}function Ml(e,t,n){const r=e.type;e.render||(e.render=r.render||st);{const s=Dn(e);mt();try{xo(e)}finally{gt(),s()}}}const lc={get(e,t){return be(e,"get",""),e[t]}};function ac(e){const t=n=>{e.exposed=n||{}};return{attrs:new Proxy(e.attrs,lc),slots:e.slots,emit:e.emit,expose:t}}function ds(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy(tl(Ua(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in yn)return yn[n](e)},has(t,n){return n in t||n in yn}})):e.proxy}function oc(e,t=!0){return H(e)?e.displayName||e.name:e.name||t&&e.__name}function cc(e){return H(e)&&"__vccOpts"in e}const Me=(e,t)=>Ka(e,t,On);function Il(e,t,n){try{Xn(-1);const r=arguments.length;return r===2?J(t)&&!$(t)?Jn(t)?ue(e,null,[t]):ue(e,t):ue(e,null,t):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&Jn(n)&&(n=[n]),ue(e,t,n))}finally{Xn(1)}}const uc="3.5.33";/**
* @vue/runtime-dom v3.5.33
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Vr;const Qs=typeof window<"u"&&window.trustedTypes;if(Qs)try{Vr=Qs.createPolicy("vue",{createHTML:e=>e})}catch{}const zl=Vr?e=>Vr.createHTML(e):e=>e,pc="http://www.w3.org/2000/svg",fc="http://www.w3.org/1998/Math/MathML",pt=typeof document<"u"?document:null,Ks=pt&&pt.createElement("template"),dc={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{const s=t==="svg"?pt.createElementNS(pc,e):t==="mathml"?pt.createElementNS(fc,e):n?pt.createElement(e,{is:n}):pt.createElement(e);return e==="select"&&r&&r.multiple!=null&&s.setAttribute("multiple",r.multiple),s},createText:e=>pt.createTextNode(e),createComment:e=>pt.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>pt.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,r,s,i){const o=n?n.previousSibling:t.lastChild;if(s&&(s===i||s.nextSibling))for(;t.insertBefore(s.cloneNode(!0),n),!(s===i||!(s=s.nextSibling)););else{Ks.innerHTML=zl(r==="svg"?`<svg>${e}</svg>`:r==="mathml"?`<math>${e}</math>`:e);const a=Ks.content;if(r==="svg"||r==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}t.insertBefore(a,n)}return[o?o.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},hc=Symbol("_vtc");function mc(e,t,n){const r=e[hc];r&&(t=(t?[t,...r]:[...r]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}const Zs=Symbol("_vod"),gc=Symbol("_vsh"),bc=Symbol(""),_c=/(?:^|;)\s*display\s*:/;function yc(e,t,n){const r=e.style,s=ce(n);let i=!1;if(n&&!s){if(t)if(ce(t))for(const o of t.split(";")){const a=o.slice(0,o.indexOf(":")).trim();n[a]==null&&pn(r,a,"")}else for(const o in t)n[o]==null&&pn(r,o,"");for(const o in n){o==="display"&&(i=!0);const a=n[o];a!=null?wc(e,o,!ce(t)&&t?t[o]:void 0,a)||pn(r,o,a):pn(r,o,"")}}else if(s){if(t!==n){const o=r[bc];o&&(n+=";"+o),r.cssText=n,i=_c.test(n)}}else t&&e.removeAttribute("style");Zs in e&&(e[Zs]=i?r.display:"",e[gc]&&(r.display="none"))}const Xs=/\s*!important$/;function pn(e,t,n){if($(n))n.forEach(r=>pn(e,t,r));else if(n==null&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const r=vc(e,t);Xs.test(n)?e.setProperty($t(r),n.replace(Xs,""),"important"):e[r]=n}}const Js=["Webkit","Moz","ms"],qr={};function vc(e,t){const n=qr[t];if(n)return n;let r=Re(t);if(r!=="filter"&&r in e)return qr[t]=r;r=lr(r);for(let s=0;s<Js.length;s++){const i=Js[s]+r;if(i in e)return qr[t]=i}return t}function wc(e,t,n,r){return e.tagName==="TEXTAREA"&&(t==="width"||t==="height")&&ce(r)&&n===r}const Ys="http://www.w3.org/1999/xlink";function ei(e,t,n,r,s,i=ka(t)){r&&t.startsWith("xlink:")?n==null?e.removeAttributeNS(Ys,t.slice(6,t.length)):e.setAttributeNS(Ys,t,n):n==null||i&&!Ii(n)?e.removeAttribute(t):e.setAttribute(t,i?"":lt(n)?String(n):n)}function ti(e,t,n,r,s){if(t==="innerHTML"||t==="textContent"){n!=null&&(e[t]=t==="innerHTML"?zl(n):n);return}const i=e.tagName;if(t==="value"&&i!=="PROGRESS"&&!i.includes("-")){const a=i==="OPTION"?e.getAttribute("value")||"":e.value,l=n==null?e.type==="checkbox"?"on":"":String(n);(a!==l||!("_value"in e))&&(e.value=l),n==null&&e.removeAttribute(t),e._value=n;return}let o=!1;if(n===""||n==null){const a=typeof e[t];a==="boolean"?n=Ii(n):n==null&&a==="string"?(n="",o=!0):a==="number"&&(n=0,o=!0)}try{e[t]=n}catch{}o&&e.removeAttribute(s||t)}function kc(e,t,n,r){e.addEventListener(t,n,r)}function xc(e,t,n,r){e.removeEventListener(t,n,r)}const ni=Symbol("_vei");function Sc(e,t,n,r,s=null){const i=e[ni]||(e[ni]={}),o=i[t];if(r&&o)o.value=r;else{const[a,l]=Rc(t);if(r){const u=i[t]=Ec(r,s);kc(e,a,u,l)}else o&&(xc(e,a,o,l),i[t]=void 0)}}const ri=/(?:Once|Passive|Capture)$/;function Rc(e){let t;if(ri.test(e)){t={};let r;for(;r=e.match(ri);)e=e.slice(0,e.length-r[0].length),t[r[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):$t(e.slice(2)),t]}let Or=0;const qc=Promise.resolve(),Oc=()=>Or||(qc.then(()=>Or=0),Or=Date.now());function Ec(e,t){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;at(Cc(r,n.value),t,5,[r])};return n.value=e,n.attached=Oc(),n}function Cc(e,t){if($(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(r=>s=>!s._stopped&&r&&r(s))}else return t}const si=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,Ac=(e,t,n,r,s,i)=>{const o=s==="svg";t==="class"?mc(e,r,o):t==="style"?yc(e,n,r):rr(t)?sr(t)||Sc(e,t,n,r,i):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):Tc(e,t,r,o))?(ti(e,t,r),!e.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&ei(e,t,r,o,i,t!=="value")):e._isVueCE&&(Dc(e,t)||e._def.__asyncLoader&&(/[A-Z]/.test(t)||!ce(r)))?ti(e,Re(t),r,i,t):(t==="true-value"?e._trueValue=r:t==="false-value"&&(e._falseValue=r),ei(e,t,r,o))};function Tc(e,t,n,r){if(r)return!!(t==="innerHTML"||t==="textContent"||t in e&&si(t)&&H(n));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="sandbox"&&e.tagName==="IFRAME"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const s=e.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return si(t)&&ce(n)?!1:t in e}function Dc(e,t){const n=e._def.props;if(!n)return!1;const r=Re(t);return Array.isArray(n)?n.some(s=>Re(s)===r):Object.keys(n).some(s=>Re(s)===r)}const Bc=["ctrl","shift","alt","meta"],Pc={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&e.button!==0,middle:e=>"button"in e&&e.button!==1,right:e=>"button"in e&&e.button!==2,exact:(e,t)=>Bc.some(n=>e[`${n}Key`]&&!t.includes(n))},Ll=(e,t)=>{if(!e)return e;const n=e._withMods||(e._withMods={}),r=t.join(".");return n[r]||(n[r]=((s,...i)=>{for(let o=0;o<t.length;o++){const a=Pc[t[o]];if(a&&a(s,t))return}return e(s,...i)}))},Mc=me({patchProp:Ac},dc);let ii;function Ic(){return ii||(ii=jo(Mc))}const zc=((...e)=>{const t=Ic().createApp(...e),{mount:n}=t;return t.mount=r=>{const s=Nc(r);if(!s)return;const i=t._component;!H(i)&&!i.render&&!i.template&&(i.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const o=n(s,!1,Lc(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},t});function Lc(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function Nc(e){return ce(e)?document.querySelector(e):e}const $c=(e,t)=>{const n=e.__vccOpts||e;for(const[r,s]of t)n[r]=s;return n},Vc={class:"topbar"},Hc={class:"topbar-inner"},jc=["src"],Uc={class:"lang-toggle"},Fc="https://github.com/rbatis/rbatis",Gc={__name:"TopNav",setup(e){const t=ze("lang"),n=ze("setLang"),r=Ot(!1),s=new URL(""+new URL("logo-cMOgi8zC.png",import.meta.url).href,import.meta.url).href;function i(){r.value=!1}return(o,a)=>{const l=dl("router-link");return He(),it("nav",Vc,[_("div",Hc,[ue(l,{class:"topbar-brand",to:"/"},{default:$n(()=>[_("img",{src:Pe(s),alt:"RBatis"},null,8,jc),a[3]||(a[3]=_("span",null,"RBatis",-1))]),_:1}),_("button",{class:"topbar-toggle",id:"navToggle","aria-label":"Toggle menu",onClick:a[0]||(a[0]=u=>r.value=!r.value)},[...a[4]||(a[4]=[_("span",null,null,-1),_("span",null,null,-1),_("span",null,null,-1)])]),_("div",{class:ht(["topbar-links",{open:r.value}]),id:"navLinks"},[ue(l,{to:"/",class:"nav-link",onClick:i},{default:$n(()=>[qn(V(o.$t("nav-home")),1)]),_:1}),ue(l,{to:"/v4",class:"nav-link",onClick:i},{default:$n(()=>[qn(V(o.$t("nav-v4-docs")),1)]),_:1}),_("div",Uc,[_("button",{class:ht(["lang-btn",{active:Pe(t)==="en"}]),onClick:a[1]||(a[1]=u=>Pe(n)("en"))},"EN",2),_("button",{class:ht(["lang-btn",{active:Pe(t)==="zh"}]),onClick:a[2]||(a[2]=u=>Pe(n)("zh"))},"中文",2)]),_("a",{href:Fc,class:"nav-link github-link",target:"_blank",rel:"noopener","aria-label":"GitHub"},[...a[5]||(a[5]=[_("svg",{viewBox:"0 0 16 16","aria-hidden":"true"},[_("path",{"fill-rule":"evenodd",d:"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"})],-1)])])],2)])])}}},Wc=$c(Gc,[["__scopeId","data-v-efc0b774"]]),Qc={class:"site-footer"},Kc="https://github.com/rbatis/rbatis",Zc={__name:"SiteFooter",setup(e){return(t,n)=>(He(),it("footer",Qc,[_("p",null,[_("span",null,V(t.$t("footer-contrib")),1),n[0]||(n[0]=qn(" — ",-1)),_("a",{href:Kc,target:"_blank",rel:"noopener"},V(t.$t("footer-github")),1)])]))}},Xc={__name:"App",setup(e){const t=Ot(!1);function n(){t.value=window.scrollY>400}function r(){window.scrollTo({top:0,behavior:"smooth"})}return fr(()=>window.addEventListener("scroll",n)),Tn(()=>window.removeEventListener("scroll",n)),(s,i)=>{const o=dl("router-view");return He(),it(Be,null,[ue(Wc),ue(o),ue(Zc),_("button",{class:ht(["back-to-top",{visible:t.value}]),id:"backToTop","aria-label":"Back to top",onClick:r},"↑",2)],64)}}};/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const Wt=typeof document<"u";function Nl(e){return typeof e=="object"||"displayName"in e||"props"in e||"__vccOpts"in e}function Jc(e){return e.__esModule||e[Symbol.toStringTag]==="Module"||e.default&&Nl(e.default)}const Q=Object.assign;function Er(e,t){const n={};for(const r in t){const s=t[r];n[r]=Ue(s)?s.map(e):e(s)}return n}const wn=()=>{},Ue=Array.isArray;function li(e,t){const n={};for(const r in e)n[r]=r in t?t[r]:e[r];return n}const $l=/#/g,Yc=/&/g,eu=/\//g,tu=/=/g,nu=/\?/g,Vl=/\+/g,ru=/%5B/g,su=/%5D/g,Hl=/%5E/g,iu=/%60/g,jl=/%7B/g,lu=/%7C/g,Ul=/%7D/g,au=/%20/g;function hs(e){return e==null?"":encodeURI(""+e).replace(lu,"|").replace(ru,"[").replace(su,"]")}function ou(e){return hs(e).replace(jl,"{").replace(Ul,"}").replace(Hl,"^")}function Hr(e){return hs(e).replace(Vl,"%2B").replace(au,"+").replace($l,"%23").replace(Yc,"%26").replace(iu,"`").replace(jl,"{").replace(Ul,"}").replace(Hl,"^")}function cu(e){return Hr(e).replace(tu,"%3D")}function uu(e){return hs(e).replace($l,"%23").replace(nu,"%3F")}function pu(e){return uu(e).replace(eu,"%2F")}function En(e){if(e==null)return null;try{return decodeURIComponent(""+e)}catch{}return""+e}const fu=/\/$/,du=e=>e.replace(fu,"");function Cr(e,t,n="/"){let r,s={},i="",o="";const a=t.indexOf("#");let l=t.indexOf("?");return l=a>=0&&l>a?-1:l,l>=0&&(r=t.slice(0,l),i=t.slice(l,a>0?a:t.length),s=e(i.slice(1))),a>=0&&(r=r||t.slice(0,a),o=t.slice(a,t.length)),r=bu(r??t,n),{fullPath:r+i+o,path:r,query:s,hash:En(o)}}function hu(e,t){const n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}function ai(e,t){return!t||!e.toLowerCase().startsWith(t.toLowerCase())?e:e.slice(t.length)||"/"}function mu(e,t,n){const r=t.matched.length-1,s=n.matched.length-1;return r>-1&&r===s&&en(t.matched[r],n.matched[s])&&Fl(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}function en(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function Fl(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(var n in e)if(!gu(e[n],t[n]))return!1;return!0}function gu(e,t){return Ue(e)?oi(e,t):Ue(t)?oi(t,e):(e==null?void 0:e.valueOf())===(t==null?void 0:t.valueOf())}function oi(e,t){return Ue(t)?e.length===t.length&&e.every((n,r)=>n===t[r]):e.length===1&&e[0]===t}function bu(e,t){if(e.startsWith("/"))return e;if(!e)return t;const n=t.split("/"),r=e.split("/"),s=r[r.length-1];(s===".."||s===".")&&r.push("");let i=n.length-1,o,a;for(o=0;o<r.length;o++)if(a=r[o],a!==".")if(a==="..")i>1&&i--;else break;return n.slice(0,i).join("/")+"/"+r.slice(o).join("/")}const kt={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};let jr=(function(e){return e.pop="pop",e.push="push",e})({}),Ar=(function(e){return e.back="back",e.forward="forward",e.unknown="",e})({});function _u(e){if(!e)if(Wt){const t=document.querySelector("base");e=t&&t.getAttribute("href")||"/",e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return e[0]!=="/"&&e[0]!=="#"&&(e="/"+e),du(e)}const yu=/^[^#]+#/;function vu(e,t){return e.replace(yu,"#")+t}function wu(e,t){const n=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return{behavior:t.behavior,left:r.left-n.left-(t.left||0),top:r.top-n.top-(t.top||0)}}const mr=()=>({left:window.scrollX,top:window.scrollY});function ku(e){let t;if("el"in e){const n=e.el,r=typeof n=="string"&&n.startsWith("#"),s=typeof n=="string"?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!s)return;t=wu(s,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(t.left!=null?t.left:window.scrollX,t.top!=null?t.top:window.scrollY)}function ci(e,t){return(history.state?history.state.position-t:-1)+e}const Ur=new Map;function xu(e,t){Ur.set(e,t)}function Su(e){const t=Ur.get(e);return Ur.delete(e),t}function Ru(e){return typeof e=="string"||e&&typeof e=="object"}function Gl(e){return typeof e=="string"||typeof e=="symbol"}let oe=(function(e){return e[e.MATCHER_NOT_FOUND=1]="MATCHER_NOT_FOUND",e[e.NAVIGATION_GUARD_REDIRECT=2]="NAVIGATION_GUARD_REDIRECT",e[e.NAVIGATION_ABORTED=4]="NAVIGATION_ABORTED",e[e.NAVIGATION_CANCELLED=8]="NAVIGATION_CANCELLED",e[e.NAVIGATION_DUPLICATED=16]="NAVIGATION_DUPLICATED",e})({});const Wl=Symbol("");oe.MATCHER_NOT_FOUND+"",oe.NAVIGATION_GUARD_REDIRECT+"",oe.NAVIGATION_ABORTED+"",oe.NAVIGATION_CANCELLED+"",oe.NAVIGATION_DUPLICATED+"";function tn(e,t){return Q(new Error,{type:e,[Wl]:!0},t)}function ut(e,t){return e instanceof Error&&Wl in e&&(t==null||!!(e.type&t))}const qu=["params","query","hash"];function Ou(e){if(typeof e=="string")return e;if(e.path!=null)return e.path;const t={};for(const n of qu)n in e&&(t[n]=e[n]);return JSON.stringify(t,null,2)}function Eu(e){const t={};if(e===""||e==="?")return t;const n=(e[0]==="?"?e.slice(1):e).split("&");for(let r=0;r<n.length;++r){const s=n[r].replace(Vl," "),i=s.indexOf("="),o=En(i<0?s:s.slice(0,i)),a=i<0?null:En(s.slice(i+1));if(o in t){let l=t[o];Ue(l)||(l=t[o]=[l]),l.push(a)}else t[o]=a}return t}function ui(e){let t="";for(let n in e){const r=e[n];if(n=cu(n),r==null){r!==void 0&&(t+=(t.length?"&":"")+n);continue}(Ue(r)?r.map(s=>s&&Hr(s)):[r&&Hr(r)]).forEach(s=>{s!==void 0&&(t+=(t.length?"&":"")+n,s!=null&&(t+="="+s))})}return t}function Cu(e){const t={};for(const n in e){const r=e[n];r!==void 0&&(t[n]=Ue(r)?r.map(s=>s==null?null:""+s):r==null?r:""+r)}return t}const Au=Symbol(""),pi=Symbol(""),ms=Symbol(""),Ql=Symbol(""),Fr=Symbol("");function on(){let e=[];function t(r){return e.push(r),()=>{const s=e.indexOf(r);s>-1&&e.splice(s,1)}}function n(){e=[]}return{add:t,list:()=>e.slice(),reset:n}}function Rt(e,t,n,r,s,i=o=>o()){const o=r&&(r.enterCallbacks[s]=r.enterCallbacks[s]||[]);return()=>new Promise((a,l)=>{const u=h=>{h===!1?l(tn(oe.NAVIGATION_ABORTED,{from:n,to:t})):h instanceof Error?l(h):Ru(h)?l(tn(oe.NAVIGATION_GUARD_REDIRECT,{from:t,to:h})):(o&&r.enterCallbacks[s]===o&&typeof h=="function"&&o.push(h),a())},c=i(()=>e.call(r&&r.instances[s],t,n,u));let p=Promise.resolve(c);e.length<3&&(p=p.then(u)),p.catch(h=>l(h))})}function Tr(e,t,n,r,s=i=>i()){const i=[];for(const o of e)for(const a in o.components){let l=o.components[a];if(!(t!=="beforeRouteEnter"&&!o.instances[a]))if(Nl(l)){const u=(l.__vccOpts||l)[t];u&&i.push(Rt(u,n,r,o,a,s))}else{let u=l();i.push(()=>u.then(c=>{if(!c)throw new Error(`Couldn't resolve component "${a}" at "${o.path}"`);const p=Jc(c)?c.default:c;o.mods[a]=c,o.components[a]=p;const h=(p.__vccOpts||p)[t];return h&&Rt(h,n,r,o,a,s)()}))}}return i}function Tu(e,t){const n=[],r=[],s=[],i=Math.max(t.matched.length,e.matched.length);for(let o=0;o<i;o++){const a=t.matched[o];a&&(e.matched.find(u=>en(u,a))?r.push(a):n.push(a));const l=e.matched[o];l&&(t.matched.find(u=>en(u,l))||s.push(l))}return[n,r,s]}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let Du=()=>location.protocol+"//"+location.host;function Kl(e,t){const{pathname:n,search:r,hash:s}=t,i=e.indexOf("#");if(i>-1){let o=s.includes(e.slice(i))?e.slice(i).length:1,a=s.slice(o);return a[0]!=="/"&&(a="/"+a),ai(a,"")}return ai(n,e)+r+s}function Bu(e,t,n,r){let s=[],i=[],o=null;const a=({state:h})=>{const m=Kl(e,location),b=n.value,S=t.value;let C=0;if(h){if(n.value=m,t.value=h,o&&o===b){o=null;return}C=S?h.position-S.position:0}else r(m);s.forEach(z=>{z(n.value,b,{delta:C,type:jr.pop,direction:C?C>0?Ar.forward:Ar.back:Ar.unknown})})};function l(){o=n.value}function u(h){s.push(h);const m=()=>{const b=s.indexOf(h);b>-1&&s.splice(b,1)};return i.push(m),m}function c(){if(document.visibilityState==="hidden"){const{history:h}=window;if(!h.state)return;h.replaceState(Q({},h.state,{scroll:mr()}),"")}}function p(){for(const h of i)h();i=[],window.removeEventListener("popstate",a),window.removeEventListener("pagehide",c),document.removeEventListener("visibilitychange",c)}return window.addEventListener("popstate",a),window.addEventListener("pagehide",c),document.addEventListener("visibilitychange",c),{pauseListeners:l,listen:u,destroy:p}}function fi(e,t,n,r=!1,s=!1){return{back:e,current:t,forward:n,replaced:r,position:window.history.length,scroll:s?mr():null}}function Pu(e){const{history:t,location:n}=window,r={value:Kl(e,n)},s={value:t.state};s.value||i(r.value,{back:null,current:r.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0);function i(l,u,c){const p=e.indexOf("#"),h=p>-1?(n.host&&document.querySelector("base")?e:e.slice(p))+l:Du()+e+l;try{t[c?"replaceState":"pushState"](u,"",h),s.value=u}catch(m){console.error(m),n[c?"replace":"assign"](h)}}function o(l,u){i(l,Q({},t.state,fi(s.value.back,l,s.value.forward,!0),u,{position:s.value.position}),!0),r.value=l}function a(l,u){const c=Q({},s.value,t.state,{forward:l,scroll:mr()});i(c.current,c,!0),i(l,Q({},fi(r.value,l,null),{position:c.position+1},u),!1),r.value=l}return{location:r,state:s,push:a,replace:o}}function Mu(e){e=_u(e);const t=Pu(e),n=Bu(e,t.state,t.location,t.replace);function r(i,o=!0){o||n.pauseListeners(),history.go(i)}const s=Q({location:"",base:e,go:r,createHref:vu.bind(null,e)},t,n);return Object.defineProperty(s,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(s,"state",{enumerable:!0,get:()=>t.state.value}),s}function Iu(e){return e=location.host?e||location.pathname+location.search:"",e.includes("#")||(e+="#"),Mu(e)}let Mt=(function(e){return e[e.Static=0]="Static",e[e.Param=1]="Param",e[e.Group=2]="Group",e})({});var fe=(function(e){return e[e.Static=0]="Static",e[e.Param=1]="Param",e[e.ParamRegExp=2]="ParamRegExp",e[e.ParamRegExpEnd=3]="ParamRegExpEnd",e[e.EscapeNext=4]="EscapeNext",e})(fe||{});const zu={type:Mt.Static,value:""},Lu=/[a-zA-Z0-9_]/;function Nu(e){if(!e)return[[]];if(e==="/")return[[zu]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(m){throw new Error(`ERR (${n})/"${u}": ${m}`)}let n=fe.Static,r=n;const s=[];let i;function o(){i&&s.push(i),i=[]}let a=0,l,u="",c="";function p(){u&&(n===fe.Static?i.push({type:Mt.Static,value:u}):n===fe.Param||n===fe.ParamRegExp||n===fe.ParamRegExpEnd?(i.length>1&&(l==="*"||l==="+")&&t(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`),i.push({type:Mt.Param,value:u,regexp:c,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):t("Invalid state to consume buffer"),u="")}function h(){u+=l}for(;a<e.length;){if(l=e[a++],l==="\\"&&n!==fe.ParamRegExp){r=n,n=fe.EscapeNext;continue}switch(n){case fe.Static:l==="/"?(u&&p(),o()):l===":"?(p(),n=fe.Param):h();break;case fe.EscapeNext:h(),n=r;break;case fe.Param:l==="("?n=fe.ParamRegExp:Lu.test(l)?h():(p(),n=fe.Static,l!=="*"&&l!=="?"&&l!=="+"&&a--);break;case fe.ParamRegExp:l===")"?c[c.length-1]=="\\"?c=c.slice(0,-1)+l:n=fe.ParamRegExpEnd:c+=l;break;case fe.ParamRegExpEnd:p(),n=fe.Static,l!=="*"&&l!=="?"&&l!=="+"&&a--,c="";break;default:t("Unknown state");break}}return n===fe.ParamRegExp&&t(`Unfinished custom RegExp for param "${u}"`),p(),o(),s}const di="[^/]+?",$u={sensitive:!1,strict:!1,start:!0,end:!0};var xe=(function(e){return e[e._multiplier=10]="_multiplier",e[e.Root=90]="Root",e[e.Segment=40]="Segment",e[e.SubSegment=30]="SubSegment",e[e.Static=40]="Static",e[e.Dynamic=20]="Dynamic",e[e.BonusCustomRegExp=10]="BonusCustomRegExp",e[e.BonusWildcard=-50]="BonusWildcard",e[e.BonusRepeatable=-20]="BonusRepeatable",e[e.BonusOptional=-8]="BonusOptional",e[e.BonusStrict=.7000000000000001]="BonusStrict",e[e.BonusCaseSensitive=.25]="BonusCaseSensitive",e})(xe||{});const Vu=/[.+*?^${}()[\]/\\]/g;function Hu(e,t){const n=Q({},$u,t),r=[];let s=n.start?"^":"";const i=[];for(const u of e){const c=u.length?[]:[xe.Root];n.strict&&!u.length&&(s+="/");for(let p=0;p<u.length;p++){const h=u[p];let m=xe.Segment+(n.sensitive?xe.BonusCaseSensitive:0);if(h.type===Mt.Static)p||(s+="/"),s+=h.value.replace(Vu,"\\$&"),m+=xe.Static;else if(h.type===Mt.Param){const{value:b,repeatable:S,optional:C,regexp:z}=h;i.push({name:b,repeatable:S,optional:C});const O=z||di;if(O!==di){m+=xe.BonusCustomRegExp;try{`${O}`}catch(B){throw new Error(`Invalid custom RegExp for param "${b}" (${O}): `+B.message)}}let P=S?`((?:${O})(?:/(?:${O}))*)`:`(${O})`;p||(P=C&&u.length<2?`(?:/${P})`:"/"+P),C&&(P+="?"),s+=P,m+=xe.Dynamic,C&&(m+=xe.BonusOptional),S&&(m+=xe.BonusRepeatable),O===".*"&&(m+=xe.BonusWildcard)}c.push(m)}r.push(c)}if(n.strict&&n.end){const u=r.length-1;r[u][r[u].length-1]+=xe.BonusStrict}n.strict||(s+="/?"),n.end?s+="$":n.strict&&!s.endsWith("/")&&(s+="(?:/|$)");const o=new RegExp(s,n.sensitive?"":"i");function a(u){const c=u.match(o),p={};if(!c)return null;for(let h=1;h<c.length;h++){const m=c[h]||"",b=i[h-1];p[b.name]=m&&b.repeatable?m.split("/"):m}return p}function l(u){let c="",p=!1;for(const h of e){(!p||!c.endsWith("/"))&&(c+="/"),p=!1;for(const m of h)if(m.type===Mt.Static)c+=m.value;else if(m.type===Mt.Param){const{value:b,repeatable:S,optional:C}=m,z=b in u?u[b]:"";if(Ue(z)&&!S)throw new Error(`Provided param "${b}" is an array but it is not repeatable (* or + modifiers)`);const O=Ue(z)?z.join("/"):z;if(!O)if(C)h.length<2&&(c.endsWith("/")?c=c.slice(0,-1):p=!0);else throw new Error(`Missing required param "${b}"`);c+=O}}return c||"/"}return{re:o,score:r,keys:i,parse:a,stringify:l}}function ju(e,t){let n=0;for(;n<e.length&&n<t.length;){const r=t[n]-e[n];if(r)return r;n++}return e.length<t.length?e.length===1&&e[0]===xe.Static+xe.Segment?-1:1:e.length>t.length?t.length===1&&t[0]===xe.Static+xe.Segment?1:-1:0}function Zl(e,t){let n=0;const r=e.score,s=t.score;for(;n<r.length&&n<s.length;){const i=ju(r[n],s[n]);if(i)return i;n++}if(Math.abs(s.length-r.length)===1){if(hi(r))return 1;if(hi(s))return-1}return s.length-r.length}function hi(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const Uu={strict:!1,end:!0,sensitive:!1};function Fu(e,t,n){const r=Hu(Nu(e.path),n),s=Q(r,{record:e,parent:t,children:[],alias:[]});return t&&!s.record.aliasOf==!t.record.aliasOf&&t.children.push(s),s}function Gu(e,t){const n=[],r=new Map;t=li(Uu,t);function s(p){return r.get(p)}function i(p,h,m){const b=!m,S=gi(p);S.aliasOf=m&&m.record;const C=li(t,p),z=[S];if("alias"in p){const B=typeof p.alias=="string"?[p.alias]:p.alias;for(const G of B)z.push(gi(Q({},S,{components:m?m.record.components:S.components,path:G,aliasOf:m?m.record:S})))}let O,P;for(const B of z){const{path:G}=B;if(h&&G[0]!=="/"){const le=h.record.path,ae=le[le.length-1]==="/"?"":"/";B.path=h.record.path+(G&&ae+G)}if(O=Fu(B,h,C),m?m.alias.push(O):(P=P||O,P!==O&&P.alias.push(O),b&&p.name&&!bi(O)&&o(p.name)),Xl(O)&&l(O),S.children){const le=S.children;for(let ae=0;ae<le.length;ae++)i(le[ae],O,m&&m.children[ae])}m=m||O}return P?()=>{o(P)}:wn}function o(p){if(Gl(p)){const h=r.get(p);h&&(r.delete(p),n.splice(n.indexOf(h),1),h.children.forEach(o),h.alias.forEach(o))}else{const h=n.indexOf(p);h>-1&&(n.splice(h,1),p.record.name&&r.delete(p.record.name),p.children.forEach(o),p.alias.forEach(o))}}function a(){return n}function l(p){const h=Ku(p,n);n.splice(h,0,p),p.record.name&&!bi(p)&&r.set(p.record.name,p)}function u(p,h){let m,b={},S,C;if("name"in p&&p.name){if(m=r.get(p.name),!m)throw tn(oe.MATCHER_NOT_FOUND,{location:p});C=m.record.name,b=Q(mi(h.params,m.keys.filter(P=>!P.optional).concat(m.parent?m.parent.keys.filter(P=>P.optional):[]).map(P=>P.name)),p.params&&mi(p.params,m.keys.map(P=>P.name))),S=m.stringify(b)}else if(p.path!=null)S=p.path,m=n.find(P=>P.re.test(S)),m&&(b=m.parse(S),C=m.record.name);else{if(m=h.name?r.get(h.name):n.find(P=>P.re.test(h.path)),!m)throw tn(oe.MATCHER_NOT_FOUND,{location:p,currentLocation:h});C=m.record.name,b=Q({},h.params,p.params),S=m.stringify(b)}const z=[];let O=m;for(;O;)z.unshift(O.record),O=O.parent;return{name:C,path:S,params:b,matched:z,meta:Qu(z)}}e.forEach(p=>i(p));function c(){n.length=0,r.clear()}return{addRoute:i,resolve:u,removeRoute:o,clearRoutes:c,getRoutes:a,getRecordMatcher:s}}function mi(e,t){const n={};for(const r of t)r in e&&(n[r]=e[r]);return n}function gi(e){const t={path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:e.aliasOf,beforeEnter:e.beforeEnter,props:Wu(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}};return Object.defineProperty(t,"mods",{value:{}}),t}function Wu(e){const t={},n=e.props||!1;if("component"in e)t.default=n;else for(const r in e.components)t[r]=typeof n=="object"?n[r]:n;return t}function bi(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function Qu(e){return e.reduce((t,n)=>Q(t,n.meta),{})}function Ku(e,t){let n=0,r=t.length;for(;n!==r;){const i=n+r>>1;Zl(e,t[i])<0?r=i:n=i+1}const s=Zu(e);return s&&(r=t.lastIndexOf(s,r-1)),r}function Zu(e){let t=e;for(;t=t.parent;)if(Xl(t)&&Zl(e,t)===0)return t}function Xl({record:e}){return!!(e.name||e.components&&Object.keys(e.components).length||e.redirect)}function _i(e){const t=ze(ms),n=ze(Ql),r=Me(()=>{const l=Pe(e.to);return t.resolve(l)}),s=Me(()=>{const{matched:l}=r.value,{length:u}=l,c=l[u-1],p=n.matched;if(!c||!p.length)return-1;const h=p.findIndex(en.bind(null,c));if(h>-1)return h;const m=yi(l[u-2]);return u>1&&yi(c)===m&&p[p.length-1].path!==m?p.findIndex(en.bind(null,l[u-2])):h}),i=Me(()=>s.value>-1&&tp(n.params,r.value.params)),o=Me(()=>s.value>-1&&s.value===n.matched.length-1&&Fl(n.params,r.value.params));function a(l={}){if(ep(l)){const u=t[Pe(e.replace)?"replace":"push"](Pe(e.to)).catch(wn);return e.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>u),u}return Promise.resolve()}return{route:r,href:Me(()=>r.value.href),isActive:i,isExactActive:o,navigate:a}}function Xu(e){return e.length===1?e[0]:e}const Ju=cl({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:_i,setup(e,{slots:t}){const n=cr(_i(e)),{options:r}=ze(ms),s=Me(()=>({[vi(e.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[vi(e.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const i=t.default&&Xu(t.default(n));return e.custom?i:Il("a",{"aria-current":n.isExactActive?e.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:s.value},i)}}}),Yu=Ju;function ep(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&!(e.button!==void 0&&e.button!==0)){if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return e.preventDefault&&e.preventDefault(),!0}}function tp(e,t){for(const n in t){const r=t[n],s=e[n];if(typeof r=="string"){if(r!==s)return!1}else if(!Ue(s)||s.length!==r.length||r.some((i,o)=>i.valueOf()!==s[o].valueOf()))return!1}return!0}function yi(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const vi=(e,t,n)=>e??t??n,np=cl({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:t,slots:n}){const r=ze(Fr),s=Me(()=>e.route||r.value),i=ze(pi,0),o=Me(()=>{let u=Pe(i);const{matched:c}=s.value;let p;for(;(p=c[u])&&!p.components;)u++;return u}),a=Me(()=>s.value.matched[o.value]);Vn(pi,Me(()=>o.value+1)),Vn(Au,a),Vn(Fr,s);const l=Ot();return gn(()=>[l.value,a.value,e.name],([u,c,p],[h,m,b])=>{c&&(c.instances[p]=u,m&&m!==c&&u&&u===h&&(c.leaveGuards.size||(c.leaveGuards=m.leaveGuards),c.updateGuards.size||(c.updateGuards=m.updateGuards))),u&&c&&(!m||!en(c,m)||!h)&&(c.enterCallbacks[p]||[]).forEach(S=>S(u))},{flush:"post"}),()=>{const u=s.value,c=e.name,p=a.value,h=p&&p.components[c];if(!h)return wi(n.default,{Component:h,route:u});const m=p.props[c],b=m?m===!0?u.params:typeof m=="function"?m(u):m:null,C=Il(h,Q({},b,t,{onVnodeUnmounted:z=>{z.component.isUnmounted&&(p.instances[c]=null)},ref:l}));return wi(n.default,{Component:C,route:u})||C}}});function wi(e,t){if(!e)return null;const n=e(t);return n.length===1?n[0]:n}const rp=np;function sp(e){const t=Gu(e.routes,e),n=e.parseQuery||Eu,r=e.stringifyQuery||ui,s=e.history,i=on(),o=on(),a=on(),l=Fa(kt);let u=kt;Wt&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const c=Er.bind(null,w=>""+w),p=Er.bind(null,pu),h=Er.bind(null,En);function m(w,D){let A,M;return Gl(w)?(A=t.getRecordMatcher(w),M=D):M=w,t.addRoute(M,A)}function b(w){const D=t.getRecordMatcher(w);D&&t.removeRoute(D)}function S(){return t.getRoutes().map(w=>w.record)}function C(w){return!!t.getRecordMatcher(w)}function z(w,D){if(D=Q({},D||l.value),typeof w=="string"){const g=Cr(n,w,D.path),y=t.resolve({path:g.path},D),k=s.createHref(g.fullPath);return Q(g,y,{params:h(y.params),hash:En(g.hash),redirectedFrom:void 0,href:k})}let A;if(w.path!=null)A=Q({},w,{path:Cr(n,w.path,D.path).path});else{const g=Q({},w.params);for(const y in g)g[y]==null&&delete g[y];A=Q({},w,{params:p(g)}),D.params=p(D.params)}const M=t.resolve(A,D),j=w.hash||"";M.params=c(h(M.params));const f=hu(r,Q({},w,{hash:ou(j),path:M.path})),d=s.createHref(f);return Q({fullPath:f,hash:j,query:r===ui?Cu(w.query):w.query||{}},M,{redirectedFrom:void 0,href:d})}function O(w){return typeof w=="string"?Cr(n,w,l.value.path):Q({},w)}function P(w,D){if(u!==w)return tn(oe.NAVIGATION_CANCELLED,{from:D,to:w})}function B(w){return ae(w)}function G(w){return B(Q(O(w),{replace:!0}))}function le(w,D){const A=w.matched[w.matched.length-1];if(A&&A.redirect){const{redirect:M}=A;let j=typeof M=="function"?M(w,D):M;return typeof j=="string"&&(j=j.includes("?")||j.includes("#")?j=O(j):{path:j},j.params={}),Q({query:w.query,hash:w.hash,params:j.path!=null?{}:w.params},j)}}function ae(w,D){const A=u=z(w),M=l.value,j=w.state,f=w.force,d=w.replace===!0,g=le(A,M);if(g)return ae(Q(O(g),{state:typeof g=="object"?Q({},j,g.state):j,force:f,replace:d}),D||A);const y=A;y.redirectedFrom=D;let k;return!f&&mu(r,M,A)&&(k=tn(oe.NAVIGATION_DUPLICATED,{to:y,from:M}),Qe(M,M,!0,!1)),(k?Promise.resolve(k):Ge(y,M)).catch(v=>ut(v)?ut(v,oe.NAVIGATION_GUARD_REDIRECT)?v:wt(v):W(v,y,M)).then(v=>{if(v){if(ut(v,oe.NAVIGATION_GUARD_REDIRECT))return ae(Q({replace:d},O(v.to),{state:typeof v.to=="object"?Q({},j,v.to.state):j,force:f}),D||y)}else v=Ct(y,M,!0,d,j);return vt(y,M,v),v})}function Fe(w,D){const A=P(w,D);return A?Promise.reject(A):Promise.resolve()}function yt(w){const D=Ut.values().next().value;return D&&typeof D.runWithContext=="function"?D.runWithContext(w):w()}function Ge(w,D){let A;const[M,j,f]=Tu(w,D);A=Tr(M.reverse(),"beforeRouteLeave",w,D);for(const g of M)g.leaveGuards.forEach(y=>{A.push(Rt(y,w,D))});const d=Fe.bind(null,w,D);return A.push(d),Te(A).then(()=>{A=[];for(const g of i.list())A.push(Rt(g,w,D));return A.push(d),Te(A)}).then(()=>{A=Tr(j,"beforeRouteUpdate",w,D);for(const g of j)g.updateGuards.forEach(y=>{A.push(Rt(y,w,D))});return A.push(d),Te(A)}).then(()=>{A=[];for(const g of f)if(g.beforeEnter)if(Ue(g.beforeEnter))for(const y of g.beforeEnter)A.push(Rt(y,w,D));else A.push(Rt(g.beforeEnter,w,D));return A.push(d),Te(A)}).then(()=>(w.matched.forEach(g=>g.enterCallbacks={}),A=Tr(f,"beforeRouteEnter",w,D,yt),A.push(d),Te(A))).then(()=>{A=[];for(const g of o.list())A.push(Rt(g,w,D));return A.push(d),Te(A)}).catch(g=>ut(g,oe.NAVIGATION_CANCELLED)?g:Promise.reject(g))}function vt(w,D,A){a.list().forEach(M=>yt(()=>M(w,D,A)))}function Ct(w,D,A,M,j){const f=P(w,D);if(f)return f;const d=D===kt,g=Wt?history.state:{};A&&(M||d?s.replace(w.fullPath,Q({scroll:d&&g&&g.scroll},j)):s.push(w.fullPath,j)),l.value=w,Qe(w,D,A,d),wt()}let We;function rn(){We||(We=s.listen((w,D,A)=>{if(!At.listening)return;const M=z(w),j=le(M,At.currentRoute.value);if(j){ae(Q(j,{replace:!0,force:!0}),M).catch(wn);return}u=M;const f=l.value;Wt&&xu(ci(f.fullPath,A.delta),mr()),Ge(M,f).catch(d=>ut(d,oe.NAVIGATION_ABORTED|oe.NAVIGATION_CANCELLED)?d:ut(d,oe.NAVIGATION_GUARD_REDIRECT)?(ae(Q(O(d.to),{force:!0}),M).then(g=>{ut(g,oe.NAVIGATION_ABORTED|oe.NAVIGATION_DUPLICATED)&&!A.delta&&A.type===jr.pop&&s.go(-1,!1)}).catch(wn),Promise.reject()):(A.delta&&s.go(-A.delta,!1),W(d,M,f))).then(d=>{d=d||Ct(M,f,!1),d&&(A.delta&&!ut(d,oe.NAVIGATION_CANCELLED)?s.go(-A.delta,!1):A.type===jr.pop&&ut(d,oe.NAVIGATION_ABORTED|oe.NAVIGATION_DUPLICATED)&&s.go(-1,!1)),vt(M,f,d)}).catch(wn)}))}let Ht=on(),de=on(),Y;function W(w,D,A){wt(w);const M=de.list();return M.length?M.forEach(j=>j(w,D,A)):console.error(w),Promise.reject(w)}function ot(){return Y&&l.value!==kt?Promise.resolve():new Promise((w,D)=>{Ht.add([w,D])})}function wt(w){return Y||(Y=!w,rn(),Ht.list().forEach(([D,A])=>w?A(w):D()),Ht.reset()),w}function Qe(w,D,A,M){const{scrollBehavior:j}=e;if(!Wt||!j)return Promise.resolve();const f=!A&&Su(ci(w.fullPath,0))||(M||!A)&&history.state&&history.state.scroll||null;return as().then(()=>j(w,D,f)).then(d=>d&&ku(d)).catch(d=>W(d,w,D))}const qe=w=>s.go(w);let jt;const Ut=new Set,At={currentRoute:l,listening:!0,addRoute:m,removeRoute:b,clearRoutes:t.clearRoutes,hasRoute:C,getRoutes:S,resolve:z,options:e,push:B,replace:G,go:qe,back:()=>qe(-1),forward:()=>qe(1),beforeEach:i.add,beforeResolve:o.add,afterEach:a.add,onError:de.add,isReady:ot,install(w){w.component("RouterLink",Yu),w.component("RouterView",rp),w.config.globalProperties.$router=At,Object.defineProperty(w.config.globalProperties,"$route",{enumerable:!0,get:()=>Pe(l)}),Wt&&!jt&&l.value===kt&&(jt=!0,B(s.location).catch(M=>{}));const D={};for(const M in kt)Object.defineProperty(D,M,{get:()=>l.value[M],enumerable:!0});w.provide(ms,At),w.provide(Ql,Yi(D)),w.provide(Fr,l);const A=w.unmount;Ut.add(w),w.unmount=function(){Ut.delete(w),Ut.size<1&&(u=kt,We&&We(),We=null,l.value=kt,jt=!1,Y=!1),A()}}};function Te(w){return w.reduce((D,A)=>D.then(()=>yt(A)),Promise.resolve())}return At}const ki=["66, 185, 131","46, 204, 113","52, 152, 219","41, 128, 185","26, 188, 156","59, 130, 246","14, 165, 233","16, 185, 129","20, 184, 166","34, 211, 238"],De={count:80,maxDistance:200,lineWidth:1,lineOpacity:.2,speed:.3,radius:2.5,radiusRand:1.5,mouseRadius:150};let ie,ke,It,Un,Ce,gs;function ip(e){ie=document.getElementById(e),ie&&(ke=ie.getContext("2d"),Ce={x:null,y:null,active:!1},It=[],gs=!0,Jl(),ap(),lp(),Yl())}function Jl(){ie.width=ie.parentElement.offsetWidth,ie.height=ie.parentElement.offsetHeight}function lp(){window.addEventListener("resize",Jl),ie.addEventListener("mousemove",e=>{const t=ie.getBoundingClientRect();Ce.x=e.clientX-t.left,Ce.y=e.clientY-t.top,Ce.active=!0}),ie.addEventListener("mouseleave",()=>{Ce.active=!1}),ie.addEventListener("touchmove",e=>{const t=ie.getBoundingClientRect(),n=e.touches[0];Ce.x=n.clientX-t.left,Ce.y=n.clientY-t.top,Ce.active=!0},{passive:!0}),ie.addEventListener("touchend",()=>{Ce.active=!1})}function ap(){for(let e=0;e<De.count;e++)It.push({x:Math.random()*ie.width,y:Math.random()*ie.height,vx:(Math.random()-.5)*De.speed,vy:(Math.random()-.5)*De.speed,r:De.radius+Math.random()*De.radiusRand,color:ki[Math.floor(Math.random()*ki.length)]})}function Yl(){gs&&(Un=requestAnimationFrame(Yl),op())}function op(){ke.clearRect(0,0,ie.width,ie.height);for(let e=0;e<It.length;e++){const t=It[e];if(t.x+=t.vx,t.y+=t.vy,t.x<0&&(t.x=ie.width),t.x>ie.width&&(t.x=0),t.y<0&&(t.y=ie.height),t.y>ie.height&&(t.y=0),ke.beginPath(),ke.arc(t.x,t.y,t.r,0,Math.PI*2),ke.fillStyle="rgba("+t.color+", 0.7)",ke.fill(),Ce.active&&Ce.x!==null){const n=t.x-Ce.x,r=t.y-Ce.y,s=Math.sqrt(n*n+r*r);if(s<De.mouseRadius){const i=(De.mouseRadius-s)/De.mouseRadius;t.x+=n/s*i*1.2,t.y+=r/s*i*1.2}}for(let n=e+1;n<It.length;n++){const r=It[n],s=t.x-r.x,i=t.y-r.y,o=Math.sqrt(s*s+i*i);if(o<De.maxDistance){const a=(1-o/De.maxDistance)*De.lineOpacity;ke.beginPath(),ke.moveTo(t.x,t.y),ke.lineTo(r.x,r.y),ke.strokeStyle="rgba("+t.color+", "+a+")",ke.lineWidth=De.lineWidth,ke.stroke()}}}}function cp(){gs=!1,Un&&(cancelAnimationFrame(Un),Un=null),ke&&ke.clearRect(0,0,ie.width,ie.height),It=[],ie=null,ke=null}const up={id:"particles-canvas"},pp={__name:"ParticleCanvas",setup(e){return fr(()=>ip("particles-canvas")),Tn(()=>cp()),(t,n)=>(He(),it("canvas",up))}},fp={class:"hero",id:"hero"},dp={class:"hero-content"},hp=["src"],mp={class:"tagline"},gp={class:"hero-cta"},bp={href:"#/v4",class:"btn btn-primary btn-lg"},_p={class:"hero-features"},yp={class:"feature-card"},vp={class:"feature-card"},wp={class:"feature-card"},kp={class:"terminal-window"},xp={class:"terminal-body"},Sp={class:"comment"},Rp={class:"comment"},qp={class:"home-section",id:"section-why"},Op={class:"section-inner"},Ep={class:"section-title"},Cp={class:"section-subtitle"},Ap={class:"feature-grid-6"},Tp={class:"feature-card-lg"},Dp={class:"feature-card-lg"},Bp={class:"feature-card-lg"},Pp={class:"feature-card-lg"},Mp={class:"feature-card-lg"},Ip={class:"feature-card-lg"},zp={class:"home-section section-alt",id:"section-dsql"},Lp={class:"section-inner"},Np={class:"section-title"},$p={class:"section-subtitle"},Vp={class:"dsql-grid"},Hp={class:"dsql-card dsql-card-full"},jp={class:"dsql-card"},Up=["innerHTML"],Fp={class:"dsql-card"},Gp={class:"home-section",id:"section-db"},Wp={class:"section-inner"},Qp={class:"section-title"},Kp={class:"section-subtitle"},Zp={class:"db-grid"},Xp=["href","onClick"],Jp=["src"],Yp={class:"home-section section-alt",id:"section-eco"},ef={class:"section-inner"},tf={class:"section-title"},nf={class:"section-subtitle"},rf={class:"eco-grid"},sf={href:"https://github.com/rbatis/abs_admin",class:"eco-card",target:"_blank",rel:"noopener"},lf={href:"https://github.com/feihua/salvo-admin",class:"eco-card",target:"_blank",rel:"noopener"},af={__name:"Home",setup(e){const t=new URL(""+new URL("logo-cMOgi8zC.png",import.meta.url).href,import.meta.url).href;function n(a){window.open(a,"_blank")}const r=new URL(""+new URL("mssql-CrKOllh6.svg",import.meta.url).href,import.meta.url).href,s=new URL("data:image/svg+xml,%3csvg%20fill='%2342b983'%20role='img'%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3ctitle%3eOracle%3c/title%3e%3cpath%20d='M16.412%204.412h-8.82a7.588%207.588%200%200%200-.008%2015.176h8.828a7.588%207.588%200%200%200%200-15.176zm-.193%2012.502H7.786a4.915%204.915%200%200%201%200-9.828h8.433a4.914%204.914%200%201%201%200%209.828z'/%3e%3c/svg%3e",import.meta.url).href,i=new URL("data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3csvg%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%20500%20105'%20xml:space='preserve'%3e%3cstyle%20type='text/css'%3e%20.st0{fill:%2342b983;}%20.st1{fill-rule:evenodd;clip-rule:evenodd;fill:%2342b983;}%20%3c/style%3e%3cg%3e%3cpath%20class='st0'%20d='M153.2,27.1h-16v49h-11.1v-49h-15.9v-9.7h43L153.2,27.1z'/%3e%3cpath%20class='st0'%20d='M180.6,17.4c17.1,0,28.5,4.9,28.5,29.4c0,22.7-11.4,29.4-28.5,29.4h-19V17.4H180.6z%20M180.1,66.5c11.3,0,17.6-4.3,17.6-19.8c0-16.3-6.5-20-17.6-20h-7.4v39.8L180.1,66.5z'/%3e%3cpath%20class='st0'%20d='M259.4,55.3l-30,2c0.2,7.7,4,11.2,13.1,11.2c5.1-0.1,10.2-1.1,14.9-3.1V74c-2.7,1.6-9.3,3-16.8,3c-13.9,0-21.9-5.2-21.9-23.7s8-23.7,21.9-23.7c15.8,0,19.1,9,19.1,19.7C259.8,51.3,259.7,53.3,259.4,55.3z%20M250,48.2c0-5.7-1.2-10.5-9.3-10.5c-8.5,0-11,4.1-11.3,12L250,48.2z'/%3e%3cpath%20class='st0'%20d='M310.8,44.8v31.3h-10.6V47.8c0-6.4-1.4-9.4-7.9-9.4c-5.4,0-9.2,1.5-11.2,7.3v30.5h-10.6V30.4h10.6v5.8c2.6-4.7,8-6.6,14.4-6.6C307.1,29.6,310.8,35.1,310.8,44.8z'/%3e%3cpath%20class='st0'%20d='M364.8,30.4v42.2c0,12.6-6.5,20.4-24.3,20.4c-4.1,0-8.3-0.4-12.4-1.1v-8.5c3.9,0.9,7.8,1.3,11.8,1.3c10.1,0,14.4-3.3,14.4-12.5v-3.2c-2,4.5-5.7,7.2-14.1,7.2c-15,0-18.7-9.4-18.7-23.3c0-12.6,3.7-23.3,18.7-23.3c8.6,0,12.4,3.1,14.1,7.5v-6.7H364.8z%20M354.7,52.8c0-9.2-2-15.1-11.9-15.1c-9.4,0-10.4,7.3-10.4,15.1c0,8.5,1.3,15.3,10.4,15.3C352.7,68.2,354.7,62.6,354.7,52.8z'/%3e%3cpath%20class='st0'%20d='M377.3,17.6c0-5.2,1.3-5.7,6-5.7s6,0.5,6,5.7s-1.3,5.8-6,5.8S377.3,22.7,377.3,17.6z%20M378,30.4h10.6v45.7H378L378,30.4z'/%3e%3cpath%20class='st0'%20d='M442,44.8v31.3h-10.5V47.8c0-6.4-1.4-9.4-7.9-9.4c-5.4,0-9.2,1.5-11.2,7.3v30.5h-10.6V30.4h10.6v5.8c2.6-4.7,8-6.6,14.4-6.6C438.3,29.6,442,35.1,442,44.8z'/%3e%3cpath%20class='st0'%20d='M493.3,55.3l-30,2c0.3,7.7,4,11.2,13.1,11.2c5.1-0.1,10.2-1.1,14.9-3.1V74c-2.7,1.6-9.3,3-16.8,3c-13.9,0-21.9-5.2-21.9-23.7s8-23.7,21.9-23.7c15.8,0,19.1,9,19.1,19.7C493.8,51.3,493.6,53.3,493.3,55.3z%20M483.9,48.2c0-5.7-1.2-10.5-9.3-10.5c-8.5,0-11,4.1-11.3,12L483.9,48.2z'/%3e%3cpath%20class='st1'%20d='M48.8,11.8c3.1,0,5.6,2.5,5.6,5.6c0,3.1-2.5,5.6-5.6,5.6s-5.6-2.5-5.6-5.6c0,0,0,0,0,0C43.3,14.3,45.7,11.8,48.8,11.8z%20M11.8,38.5c3.1,0,5.6,2.5,5.6,5.6c0,3.1-2.5,5.6-5.6,5.6s-5.6-2.5-5.6-5.6C6.3,41,8.8,38.5,11.8,38.5z%20M26.3,82.1c3.1,0,5.6,2.5,5.6,5.6s-2.5,5.6-5.6,5.6c-3.1,0-5.6-2.5-5.6-5.6C20.7,84.6,23.2,82.1,26.3,82.1z%20M71.3,82.1c3.1,0,5.6,2.5,5.6,5.6s-2.5,5.6-5.6,5.6s-5.6-2.5-5.6-5.6C65.7,84.6,68.2,82.1,71.3,82.1z%20M57,44.9H40.6l-5,15.5l13.2,9.6L62,60.5L57,44.9L57,44.9z%20M41.1,43.6L46.8,26c-0.4-0.1-0.9-0.2-1.3-0.4l-5.8,18h-19c0,0.2,0,0.3,0,0.5c0,0.3,0,0.6,0,0.8h18.5l-4.8,14.7l-15-10.9c-0.2,0.4-0.5,0.7-0.8,1.1l12.8,9.3l0,0l2.6,1.9l-0.9,2.5l0,0l-5,15.5c0.4,0.1,0.9,0.2,1.3,0.4l5.7-17.5l12.5,9.1L32.9,81.7c0.3,0.3,0.6,0.7,0.8,1l15.1-11l15.1,11c0.2-0.4,0.5-0.7,0.8-1L49.9,70.9l12.5-9.1l0.6,1.7l0,0l5.2,15.9c0.4-0.2,0.8-0.3,1.3-0.4l-5.8-18l2.6-1.9L79,49.8c-0.3-0.3-0.5-0.7-0.8-1.1l-12.4,9L65.4,58l-2.3,1.6l-4.8-14.7h18.5c0-0.3,0-0.6,0-0.9c0-0.2,0-0.3,0-0.5h-19l-5.8-18c-0.4,0.2-0.8,0.3-1.3,0.4l5.7,17.6L41.1,43.6z%20M18.9,38.6l22.5-16.4c0.2,0.4,0.5,0.7,0.8,1L19.6,39.7C19.4,39.3,19.1,39,18.9,38.6L18.9,38.6z%20M22.9,79.4l-8.7-26.8c0.4-0.1,0.8-0.3,1.2-0.4L24.2,79C23.7,79.1,23.3,79.3,22.9,79.4L22.9,79.4z%20M62.5,88H35.2c0-0.1,0-0.2,0-0.4c0-0.3,0-0.6,0-1h27.3c0,0.3,0,0.6,0,1C62.4,87.8,62.4,87.9,62.5,88L62.5,88z%20M83.5,52.7l-8.7,26.8c-0.4-0.2-0.8-0.3-1.2-0.4l8.7-26.8C82.6,52.4,83,52.6,83.5,52.7z%20M56.3,22.2l22.5,16.4c-0.3,0.3-0.5,0.7-0.7,1.1L55.4,23.3C55.7,22.9,56,22.6,56.3,22.2z%20M85.8,38.5c3.1,0,5.6,2.5,5.6,5.6c0,3.1-2.5,5.6-5.6,5.6s-5.6-2.5-5.6-5.6C80.2,41,82.7,38.5,85.8,38.5z'/%3e%3c/g%3e%3c/svg%3e",import.meta.url).href,o=[{name:"MySQL",url:"https://crates.io/crates/rbdc-mysql",iconUrl:"https://cdn.simpleicons.org/mysql/42b983"},{name:"PostgreSQL",url:"https://crates.io/crates/rbdc-pg",iconUrl:"https://cdn.simpleicons.org/postgresql/42b983"},{name:"SQLite",url:"https://crates.io/crates/rbdc-sqlite",iconUrl:"https://cdn.simpleicons.org/sqlite/42b983"},{name:"MSSQL",url:"https://crates.io/crates/rbdc-mssql",iconUrl:r},{name:"Turso",url:"https://crates.io/crates/rbdc-turso",iconUrl:"https://cdn.simpleicons.org/turso/42b983"},{name:"DuckDB",url:"https://crates.io/crates/rbdc-duckdb",iconUrl:"https://cdn.simpleicons.org/duckdb/42b983"},{name:"MariaDB",url:"https://crates.io/crates/rbdc-mysql",iconUrl:"https://cdn.simpleicons.org/mariadb/42b983"},{name:"TiDB",url:"https://crates.io/crates/rbdc-mysql",iconUrl:"https://cdn.simpleicons.org/tidb/42b983"},{name:"CockroachDB",url:"https://crates.io/crates/rbdc-pg",iconUrl:"https://cdn.simpleicons.org/cockroachlabs/42b983"},{name:"Oracle",url:"https://crates.io/crates/rbdc-oracle",iconUrl:s},{name:"TDengine",url:"https://crates.io/crates/rbdc-tdengine",iconUrl:i}];return(a,l)=>(He(),it("div",null,[_("section",fp,[ue(pp),_("div",dp,[_("img",{src:Pe(t),alt:"RBatis",class:"hero-logo"},null,8,hp),l[10]||(l[10]=_("h1",null,"RBatis",-1)),_("p",mp,V(a.$t("tagline")),1),_("div",gp,[_("a",bp,V(a.$t("cta-start")),1)]),_("div",_p,[_("div",yp,[l[0]||(l[0]=_("div",{class:"icon"},"⚡",-1)),_("h3",null,V(a.$t("feature-perf-title")),1),_("p",null,V(a.$t("feature-perf-desc")),1)]),_("div",vp,[l[1]||(l[1]=_("div",{class:"icon"},"🛡️",-1)),_("h3",null,V(a.$t("feature-safe-title")),1),_("p",null,V(a.$t("feature-safe-desc")),1)]),_("div",wp,[l[2]||(l[2]=_("div",{class:"icon"},"🔌",-1)),_("h3",null,V(a.$t("feature-driver-title")),1),_("p",null,V(a.$t("feature-driver-desc")),1)])]),_("div",kp,[l[9]||(l[9]=_("div",{class:"terminal-header"},[_("span",{class:"terminal-dot red"}),_("span",{class:"terminal-dot yellow"}),_("span",{class:"terminal-dot green"})],-1)),_("div",xp,[_("span",Sp,V(a.$t("terminal-cargo")),1),l[3]||(l[3]=_("br",null,null,-1)),l[4]||(l[4]=_("span",{class:"prompt"},"$",-1)),l[5]||(l[5]=qn(" cargo add rbatis",-1)),l[6]||(l[6]=_("br",null,null,-1)),l[7]||(l[7]=_("br",null,null,-1)),_("span",Rp,V(a.$t("terminal-start")),1),l[8]||(l[8]=zn('<br><span class="prompt">$</span> <span class="keyword">let</span> rb = <span class="keyword">RBatis</span>::<span class="function">new</span>();<br><span class="prompt">$</span> rb.<span class="function">init</span>(<br><span class="prompt">$</span>   <span class="keyword">rbdc_sqlite</span>::<span class="keyword">driver</span>::<span class="function">SqliteDriver</span> {},<br><span class="prompt">$</span>   <span class="string">&quot;sqlite://target/sqlite.db&quot;</span><br><span class="prompt">$</span> )?;<br><span class="prompt">$</span> <span class="keyword">let</span> table: <span class="keyword">Vec</span>&lt;Activity&gt; = rb.<span class="function">exec_decode</span>(<span class="string">&quot;select * from activity limit ?&quot;</span>, vec![<span class="function">value!</span>(<span class="keyword">1</span>)]).<span class="keyword">await</span>?;<br><span class="cursor"></span>',49))])]),l[11]||(l[11]=_("div",{class:"scroll-down"},[_("svg",{viewBox:"0 0 24 24",width:"32",height:"32",fill:"none",stroke:"currentColor","stroke-width":"2"},[_("path",{d:"M7 13l5 5 5-5M7 6l5 5 5-5"})])],-1))]),l[12]||(l[12]=_("div",{class:"scroll-indicator"},[_("span")],-1))]),_("section",qp,[_("div",Op,[_("h2",Ep,V(a.$t("sec-why-title")),1),_("p",Cp,V(a.$t("sec-why-sub")),1),_("div",Ap,[_("div",Tp,[l[13]||(l[13]=_("div",{class:"icon"},"⚡",-1)),_("h3",null,V(a.$t("sec-why-compile-title")),1),_("p",null,V(a.$t("sec-why-compile-desc")),1)]),_("div",Dp,[l[14]||(l[14]=_("div",{class:"icon"},"🔄",-1)),_("h3",null,V(a.$t("sec-why-mybatis-title")),1),_("p",null,V(a.$t("sec-why-mybatis-desc")),1)]),_("div",Bp,[l[15]||(l[15]=_("div",{class:"icon"},"🛡️",-1)),_("h3",null,V(a.$t("sec-why-safe-title")),1),_("p",null,V(a.$t("sec-why-safe-desc")),1)]),_("div",Pp,[l[16]||(l[16]=_("div",{class:"icon"},"🚀",-1)),_("h3",null,V(a.$t("sec-why-async-title")),1),_("p",null,V(a.$t("sec-why-async-desc")),1)]),_("div",Mp,[l[17]||(l[17]=_("div",{class:"icon"},"🔌",-1)),_("h3",null,V(a.$t("sec-why-driver-title")),1),_("p",null,V(a.$t("sec-why-driver-desc")),1)]),_("div",Ip,[l[18]||(l[18]=_("div",{class:"icon"},"🧩",-1)),_("h3",null,V(a.$t("sec-why-plugin-title")),1),_("p",null,V(a.$t("sec-why-plugin-desc")),1)])])])]),_("section",zp,[_("div",Lp,[_("h2",Np,V(a.$t("sec-dsql-title")),1),_("p",$p,V(a.$t("sec-dsql-sub")),1),_("div",Vp,[_("div",Hp,[l[19]||(l[19]=_("div",{class:"dsql-label"},"crud!",-1)),_("p",null,V(a.$t("sec-dsql-crud-desc")),1),l[20]||(l[20]=zn('<div class="terminal-window dsql-terminal"><div class="terminal-header"><span class="terminal-dot red"></span><span class="terminal-dot yellow"></span><span class="terminal-dot green"></span></div><div class="terminal-body"><span class="prompt"></span><span class="comment">// One macro = full CRUD</span><br><span class="prompt"></span><span class="keyword">rbatis</span>::<span class="function">crud!</span>(<span class="keyword">BizActivity</span> {});<br><br><span class="prompt"></span><span class="comment">// Built-in functions:</span><br><span class="prompt"></span><span class="keyword">let</span> r = <span class="keyword">BizActivity</span>::<span class="function">insert</span>(&amp;rb, &amp;table).<span class="keyword">await</span>?;<br><span class="prompt"></span><span class="keyword">let</span> r = <span class="keyword">BizActivity</span>::<span class="function">insert_batch</span>(&amp;rb, &amp;tables, <span class="keyword">10</span>).<span class="keyword">await</span>?;<br><span class="prompt"></span><span class="keyword">let</span> data = <span class="keyword">BizActivity</span>::<span class="function">select_by_map</span>(&amp;rb, <span class="function">value!</span>{<span class="string">&quot;id&quot;</span>:<span class="string">&quot;1&quot;</span>}).<span class="keyword">await</span>?;<br><span class="prompt"></span><span class="keyword">let</span> r = <span class="keyword">BizActivity</span>::<span class="function">update_by_map</span>(&amp;rb, &amp;table, <span class="function">value!</span>{<span class="string">&quot;id&quot;</span>:&amp;table.id}).<span class="keyword">await</span>?;<br><span class="prompt"></span><span class="keyword">let</span> r = <span class="keyword">BizActivity</span>::<span class="function">delete_by_map</span>(&amp;rb, <span class="function">value!</span>{<span class="string">&quot;id&quot;</span>:<span class="string">&quot;1&quot;</span>}).<span class="keyword">await</span>?; </div></div>',1))]),_("div",jp,[l[21]||(l[21]=_("div",{class:"dsql-label"},"html_sql",-1)),_("p",{innerHTML:a.$t("sec-dsql-html-desc")},null,8,Up),l[22]||(l[22]=zn('<div class="terminal-window dsql-terminal"><div class="terminal-header"><span class="terminal-dot red"></span><span class="terminal-dot yellow"></span><span class="terminal-dot green"></span></div><div class="terminal-body"><span class="comment">&lt;select id=&quot;select_by_condition&quot;&gt;</span><br><span class="prompt"></span>`select * from biz_activity`<br><span class="prompt"></span><span class="keyword">&lt;where&gt;</span><br><span class="prompt"></span><span class="keyword">&lt;if</span> test=<span class="string">&quot;name != &#39;&#39;&quot;</span><span class="keyword">&gt;</span><br><span class="prompt"></span>` and name like <span class="string">#{name}</span>`<br><span class="prompt"></span><span class="keyword">&lt;/if&gt;</span><br><span class="prompt"></span><span class="keyword">&lt;/where&gt;</span><br><span class="keyword">&lt;/select&gt;</span></div></div>',1))]),_("div",Fp,[l[23]||(l[23]=_("div",{class:"dsql-label"},"py_sql",-1)),_("p",null,V(a.$t("sec-dsql-py-desc")),1),l[24]||(l[24]=zn('<div class="terminal-window dsql-terminal"><div class="terminal-header"><span class="terminal-dot red"></span><span class="terminal-dot yellow"></span><span class="terminal-dot green"></span></div><div class="terminal-body"><span class="comment"># py_sql example</span><br><span class="prompt"></span>`select * from user`<br><span class="prompt"></span><span class="keyword">where</span> :<br><span class="prompt"></span><span class="keyword">if</span> name != <span class="string">&#39;&#39;</span>:<br><span class="prompt"></span>` and name=<span class="string">#{name}</span>`<br><span class="prompt"></span><span class="keyword">if</span> delete_flag != <span class="keyword">0</span>:<br><span class="prompt"></span>` and delete_flag = <span class="keyword">0</span>` </div></div>',1))])])])]),_("section",Gp,[_("div",Wp,[_("h2",Qp,V(a.$t("sec-db-title")),1),_("p",Kp,V(a.$t("sec-db-sub")),1),_("div",Zp,[(He(),it(Be,null,hl(o,u=>_("a",{key:u.name,href:u.url,class:"db-item",onClick:Ll(c=>n(u.url),["prevent"])},[u.iconUrl?(He(),it("img",{key:0,src:u.iconUrl,alt:"",width:"22",height:"22"},null,8,Jp)):Jo("",!0),_("span",null,V(u.name),1)],8,Xp)),64))])])]),_("section",Yp,[_("div",ef,[_("h2",tf,V(a.$t("sec-eco-title")),1),_("p",nf,V(a.$t("sec-eco-sub")),1),_("div",rf,[_("a",sf,[l[25]||(l[25]=_("div",{class:"eco-icon"},"📊",-1)),l[26]||(l[26]=_("h3",null,"abs_admin",-1)),_("p",null,V(a.$t("sec-eco-abs")),1),l[27]||(l[27]=_("span",{class:"eco-link"},"View on GitHub →",-1))]),_("a",lf,[l[28]||(l[28]=_("div",{class:"eco-icon"},"🔐",-1)),l[29]||(l[29]=_("h3",null,"salvo_admin",-1)),_("p",null,V(a.$t("sec-eco-salvo")),1),l[30]||(l[30]=_("span",{class:"eco-link"},"View on GitHub →",-1))])])])])]))}};function bs(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Vt=bs();function ea(e){Vt=e}var Pt={exec:()=>null};function U(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(s,i)=>{let o=typeof i=="string"?i:i.source;return o=o.replace(ye.caret,"$1"),n=n.replace(s,o),r},getRegex:()=>new RegExp(n,t)};return r}var of=((e="")=>{try{return!!new RegExp("(?<=1)(?<!1)"+e)}catch{return!1}})(),ye={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i"),blockquoteBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}>`)},cf=/^(?:[ \t]*(?:\n|$))+/,uf=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,pf=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Bn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ff=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,_s=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,ta=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,na=U(ta).replace(/bull/g,_s).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),df=U(ta).replace(/bull/g,_s).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),ys=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,hf=/^[^\n]+/,vs=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,mf=U(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",vs).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),gf=U(/^(bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,_s).getRegex(),gr="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ws=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,bf=U("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ws).replace("tag",gr).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),ra=U(ys).replace("hr",Bn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",gr).getRegex(),_f=U(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",ra).getRegex(),ks={blockquote:_f,code:uf,def:mf,fences:pf,heading:ff,hr:Bn,html:bf,lheading:na,list:gf,newline:cf,paragraph:ra,table:Pt,text:hf},xi=U("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Bn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",gr).getRegex(),yf={...ks,lheading:df,table:xi,paragraph:U(ys).replace("hr",Bn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",xi).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",gr).getRegex()},vf={...ks,html:U(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ws).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Pt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:U(ys).replace("hr",Bn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",na).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},wf=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,kf=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,sa=/^( {2,}|\\)\n(?!\s*$)/,xf=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,nn=/[\p{P}\p{S}]/u,br=/[\s\p{P}\p{S}]/u,xs=/[^\s\p{P}\p{S}]/u,Sf=U(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,br).getRegex(),ia=/(?!~)[\p{P}\p{S}]/u,Rf=/(?!~)[\s\p{P}\p{S}]/u,qf=/(?:[^\s\p{P}\p{S}]|~)/u,Of=U(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",of?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),la=/^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/,Ef=U(la,"u").replace(/punct/g,nn).getRegex(),Cf=U(la,"u").replace(/punct/g,ia).getRegex(),aa="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Af=U(aa,"gu").replace(/notPunctSpace/g,xs).replace(/punctSpace/g,br).replace(/punct/g,nn).getRegex(),Tf=U(aa,"gu").replace(/notPunctSpace/g,qf).replace(/punctSpace/g,Rf).replace(/punct/g,ia).getRegex(),Df=U("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,xs).replace(/punctSpace/g,br).replace(/punct/g,nn).getRegex(),Bf=U(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,nn).getRegex(),Pf="^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)",Mf=U(Pf,"gu").replace(/notPunctSpace/g,xs).replace(/punctSpace/g,br).replace(/punct/g,nn).getRegex(),If=U(/\\(punct)/,"gu").replace(/punct/g,nn).getRegex(),zf=U(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Lf=U(ws).replace("(?:-->|$)","-->").getRegex(),Nf=U("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Lf).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),er=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/,$f=U(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label",er).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),oa=U(/^!?\[(label)\]\[(ref)\]/).replace("label",er).replace("ref",vs).getRegex(),ca=U(/^!?\[(ref)\](?:\[\])?/).replace("ref",vs).getRegex(),Vf=U("reflink|nolink(?!\\()","g").replace("reflink",oa).replace("nolink",ca).getRegex(),Si=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Ss={_backpedal:Pt,anyPunctuation:If,autolink:zf,blockSkip:Of,br:sa,code:kf,del:Pt,delLDelim:Pt,delRDelim:Pt,emStrongLDelim:Ef,emStrongRDelimAst:Af,emStrongRDelimUnd:Df,escape:wf,link:$f,nolink:ca,punctuation:Sf,reflink:oa,reflinkSearch:Vf,tag:Nf,text:xf,url:Pt},Hf={...Ss,link:U(/^!?\[(label)\]\((.*?)\)/).replace("label",er).getRegex(),reflink:U(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",er).getRegex()},Gr={...Ss,emStrongRDelimAst:Tf,emStrongLDelim:Cf,delLDelim:Bf,delRDelim:Mf,url:U(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Si).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:U(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Si).getRegex()},jf={...Gr,br:U(sa).replace("{2,}","*").getRegex(),text:U(Gr.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Ln={normal:ks,gfm:yf,pedantic:vf},cn={normal:Ss,gfm:Gr,breaks:jf,pedantic:Hf},Uf={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Ri=e=>Uf[e];function Ye(e,t){if(t){if(ye.escapeTest.test(e))return e.replace(ye.escapeReplace,Ri)}else if(ye.escapeTestNoEncode.test(e))return e.replace(ye.escapeReplaceNoEncode,Ri);return e}function qi(e){try{e=encodeURI(e).replace(ye.percentDecode,"%")}catch{return null}return e}function Oi(e,t){var i;let n=e.replace(ye.findPipe,(o,a,l)=>{let u=!1,c=a;for(;--c>=0&&l[c]==="\\";)u=!u;return u?"|":" |"}),r=n.split(ye.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!((i=r.at(-1))!=null&&i.trim())&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(ye.slashPipe,"|");return r}function xt(e,t,n){let r=e.length;if(r===0)return"";let s=0;for(;s<r&&e.charAt(r-s-1)===t;)s++;return e.slice(0,r-s)}function Ei(e){let t=e.split(`
`),n=t.length-1;for(;n>=0&&ye.blankLine.test(t[n]);)n--;return t.length-n<=2?e:t.slice(0,n+1).join(`
`)}function Ff(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function Gf(e,t=0){let n=t,r="";for(let s of e)if(s==="	"){let i=4-n%4;r+=" ".repeat(i),n+=i}else r+=s,n++;return r}function Ci(e,t,n,r,s){let i=t.href,o=t.title||null,a=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:i,title:o,text:a,tokens:r.inlineTokens(a)};return r.state.inLink=!1,l}function Wf(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let s=r[1];return t.split(`
`).map(i=>{let o=i.match(n.other.beginningSpace);if(o===null)return i;let[a]=o;return a.length>=s.length?i.slice(s.length):i}).join(`
`)}var tr=class{constructor(e){ee(this,"options");ee(this,"rules");ee(this,"lexer");this.options=e||Vt}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=this.options.pedantic?t[0]:Ei(t[0]),r=n.replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:n,codeBlockStyle:"indented",text:r}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=Wf(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=xt(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:xt(t[0],`
`),depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:xt(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=xt(t[0],`
`).split(`
`),r="",s="",i=[];for(;n.length>0;){let o=!1,a=[],l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))a.push(n[l]),o=!0;else if(!o)a.push(n[l]);else break;n=n.slice(l);let u=a.join(`
`),c=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,s=s?`${s}
${c}`:c;let p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(c,i,!0),this.lexer.state.top=p,n.length===0)break;let h=i.at(-1);if((h==null?void 0:h.type)==="code")break;if((h==null?void 0:h.type)==="blockquote"){let m=h,b=m.raw+`
`+n.join(`
`),S=this.blockquote(b);i[i.length-1]=S,r=r.substring(0,r.length-m.raw.length)+S.raw,s=s.substring(0,s.length-m.text.length)+S.text;break}else if((h==null?void 0:h.type)==="list"){let m=h,b=m.raw+`
`+n.join(`
`),S=this.list(b);i[i.length-1]=S,r=r.substring(0,r.length-h.raw.length)+S.raw,s=s.substring(0,s.length-m.raw.length)+S.raw,n=b.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:i,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,s={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let i=this.rules.other.listItemRegex(n),o=!1;for(;e;){let l=!1,u="",c="";if(!(t=i.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let p=Gf(t[2].split(`
`,1)[0],t[1].length),h=e.split(`
`,1)[0],m=!p.trim(),b=0;if(this.options.pedantic?(b=2,c=p.trimStart()):m?b=t[1].length+1:(b=p.search(this.rules.other.nonSpaceChar),b=b>4?1:b,c=p.slice(b),b+=t[1].length),m&&this.rules.other.blankLine.test(h)&&(u+=h+`
`,e=e.substring(h.length+1),l=!0),!l){let S=this.rules.other.nextBulletRegex(b),C=this.rules.other.hrRegex(b),z=this.rules.other.fencesBeginRegex(b),O=this.rules.other.headingBeginRegex(b),P=this.rules.other.htmlBeginRegex(b),B=this.rules.other.blockquoteBeginRegex(b);for(;e;){let G=e.split(`
`,1)[0],le;if(h=G,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),le=h):le=h.replace(this.rules.other.tabCharGlobal,"    "),z.test(h)||O.test(h)||P.test(h)||B.test(h)||S.test(h)||C.test(h))break;if(le.search(this.rules.other.nonSpaceChar)>=b||!h.trim())c+=`
`+le.slice(b);else{if(m||p.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||z.test(p)||O.test(p)||C.test(p))break;c+=`
`+h}m=!h.trim(),u+=G+`
`,e=e.substring(G.length+1),p=le.slice(b)}}s.loose||(o?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(o=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(c),loose:!1,text:c,tokens:[]}),s.raw+=u}let a=s.items.at(-1);if(a)a.raw=a.raw.trimEnd(),a.text=a.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]);let u=l.tokens[0];if(l.task&&((u==null?void 0:u.type)==="text"||(u==null?void 0:u.type)==="paragraph")){l.text=l.text.replace(this.rules.other.listReplaceTask,""),u.raw=u.raw.replace(this.rules.other.listReplaceTask,""),u.text=u.text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}let c=this.rules.other.listTaskCheckbox.exec(l.raw);if(c){let p={type:"checkbox",raw:c[0]+" ",checked:c[0]!=="[ ]"};l.checked=p.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=p.raw+l.tokens[0].raw,l.tokens[0].text=p.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(p)):l.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):l.tokens.unshift(p)}}else l.task&&(l.task=!1);if(!s.loose){let c=l.tokens.filter(h=>h.type==="space"),p=c.length>0&&c.some(h=>this.rules.other.anyLine.test(h.raw));s.loose=p}}if(s.loose)for(let l of s.items){l.loose=!0;for(let u of l.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t){let n=Ei(t[0]);return{type:"html",block:!0,raw:n,pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:n}}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:xt(t[0],`
`),href:r,title:s}}}table(e){var o;let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Oi(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=(o=t[3])!=null&&o.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],i={type:"table",raw:xt(t[0],`
`),header:[],align:[],rows:[]};if(n.length===r.length){for(let a of r)this.rules.other.tableAlignRight.test(a)?i.align.push("right"):this.rules.other.tableAlignCenter.test(a)?i.align.push("center"):this.rules.other.tableAlignLeft.test(a)?i.align.push("left"):i.align.push(null);for(let a=0;a<n.length;a++)i.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:i.align[a]});for(let a of s)i.rows.push(Oi(a,i.header.length).map((l,u)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:i.align[u]})));return i}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t){let n=t[1].trim();return{type:"heading",raw:xt(t[0],`
`),depth:t[2].charAt(0)==="="?1:2,text:n,tokens:this.lexer.inline(n)}}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let i=xt(n.slice(0,-1),"\\");if((n.length-i.length)%2===0)return}else{let i=Ff(t[2],"()");if(i===-2)return;if(i>-1){let o=(t[0].indexOf("!")===0?5:4)+t[1].length+i;t[2]=t[2].substring(0,i),t[0]=t[0].substring(0,o).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){let i=this.rules.other.pedanticHrefTitle.exec(r);i&&(r=i[1],s=i[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),Ci(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){let i=n[0].charAt(0);return{type:"text",raw:i,text:i}}return Ci(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||!r[1]&&!r[2]&&!r[3]&&!r[4]||r[4]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[3])||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,i,o,a=s,l=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(r=u.exec(t))!==null;){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i)continue;if(o=[...i].length,r[3]||r[4]){a+=o;continue}else if((r[5]||r[6])&&s%3&&!((s+o)%3)){l+=o;continue}if(a-=o,a>0)continue;o=Math.min(o,o+a+l);let c=[...r[0]][0].length,p=e.slice(0,s+r.index+c+o);if(Math.min(s,o)%2){let m=p.slice(1,-1);return{type:"em",raw:p,text:m,tokens:this.lexer.inlineTokens(m)}}let h=p.slice(2,-2);return{type:"strong",raw:p,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e,t,n=""){let r=this.rules.inline.delLDelim.exec(e);if(r&&(!r[1]||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,i,o,a=s,l=this.rules.inline.delRDelim;for(l.lastIndex=0,t=t.slice(-1*e.length+s);(r=l.exec(t))!==null;){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i||(o=[...i].length,o!==s))continue;if(r[3]||r[4]){a+=o;continue}if(a-=o,a>0)continue;o=Math.min(o,o+a);let u=[...r[0]][0].length,c=e.slice(0,s+r.index+u+o),p=c.slice(s,-s);return{type:"del",raw:c,text:p,tokens:this.lexer.inlineTokens(p)}}}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){var n;let t;if(t=this.rules.inline.url.exec(e)){let r,s;if(t[2]==="@")r=t[0],s="mailto:"+r;else{let i;do i=t[0],t[0]=((n=this.rules.inline._backpedal.exec(t[0]))==null?void 0:n[0])??"";while(i!==t[0]);r=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:r,href:s,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Le=class Wr{constructor(t){ee(this,"tokens");ee(this,"options");ee(this,"state");ee(this,"inlineQueue");ee(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Vt,this.options.tokenizer=this.options.tokenizer||new tr,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:ye,block:Ln.normal,inline:cn.normal};this.options.pedantic?(n.block=Ln.pedantic,n.inline=cn.pedantic):this.options.gfm&&(n.block=Ln.gfm,this.options.breaks?n.inline=cn.breaks:n.inline=cn.gfm),this.tokenizer.rules=n}static get rules(){return{block:Ln,inline:cn}}static lex(t,n){return new Wr(n).lex(t)}static lexInline(t,n){return new Wr(n).inlineTokens(t)}lex(t){t=t.replace(ye.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){var i,o,a;this.tokenizer.lexer=this,this.options.pedantic&&(t=t.replace(ye.tabCharGlobal,"    ").replace(ye.spaceLine,""));let s=1/0;for(;t;){if(t.length<s)s=t.length;else{this.infiniteLoopError(t.charCodeAt(0));break}let l;if((o=(i=this.options.extensions)==null?void 0:i.block)!=null&&o.some(c=>(l=c.call({lexer:this},t,n))?(t=t.substring(l.raw.length),n.push(l),!0):!1))continue;if(l=this.tokenizer.space(t)){t=t.substring(l.raw.length);let c=n.at(-1);l.raw.length===1&&c!==void 0?c.raw+=`
`:n.push(l);continue}if(l=this.tokenizer.code(t)){t=t.substring(l.raw.length);let c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=(c.raw.endsWith(`
`)?"":`
`)+l.raw,c.text+=`
`+l.text,this.inlineQueue.at(-1).src=c.text):n.push(l);continue}if(l=this.tokenizer.fences(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.heading(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.hr(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.blockquote(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.list(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.html(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.def(t)){t=t.substring(l.raw.length);let c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=(c.raw.endsWith(`
`)?"":`
`)+l.raw,c.text+=`
`+l.raw,this.inlineQueue.at(-1).src=c.text):this.tokens.links[l.tag]||(this.tokens.links[l.tag]={href:l.href,title:l.title},n.push(l));continue}if(l=this.tokenizer.table(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.lheading(t)){t=t.substring(l.raw.length),n.push(l);continue}let u=t;if((a=this.options.extensions)!=null&&a.startBlock){let c=1/0,p=t.slice(1),h;this.options.extensions.startBlock.forEach(m=>{h=m.call({lexer:this},p),typeof h=="number"&&h>=0&&(c=Math.min(c,h))}),c<1/0&&c>=0&&(u=t.substring(0,c+1))}if(this.state.top&&(l=this.tokenizer.paragraph(u))){let c=n.at(-1);r&&(c==null?void 0:c.type)==="paragraph"?(c.raw+=(c.raw.endsWith(`
`)?"":`
`)+l.raw,c.text+=`
`+l.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(l),r=u.length!==t.length,t=t.substring(l.raw.length);continue}if(l=this.tokenizer.text(t)){t=t.substring(l.raw.length);let c=n.at(-1);(c==null?void 0:c.type)==="text"?(c.raw+=(c.raw.endsWith(`
`)?"":`
`)+l.raw,c.text+=`
`+l.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(l);continue}if(t){this.infiniteLoopError(t.charCodeAt(0));break}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){var u,c,p,h,m;this.tokenizer.lexer=this;let r=t,s=null;if(this.tokens.links){let b=Object.keys(this.tokens.links);if(b.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!==null;)b.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!==null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let i;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!==null;)i=s[2]?s[2].length:0,r=r.slice(0,s.index+i)+"["+"a".repeat(s[0].length-i-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=((c=(u=this.options.hooks)==null?void 0:u.emStrongMask)==null?void 0:c.call({lexer:this},r))??r;let o=!1,a="",l=1/0;for(;t;){if(t.length<l)l=t.length;else{this.infiniteLoopError(t.charCodeAt(0));break}o||(a=""),o=!1;let b;if((h=(p=this.options.extensions)==null?void 0:p.inline)!=null&&h.some(C=>(b=C.call({lexer:this},t,n))?(t=t.substring(b.raw.length),n.push(b),!0):!1))continue;if(b=this.tokenizer.escape(t)){t=t.substring(b.raw.length),n.push(b);continue}if(b=this.tokenizer.tag(t)){t=t.substring(b.raw.length),n.push(b);continue}if(b=this.tokenizer.link(t)){t=t.substring(b.raw.length),n.push(b);continue}if(b=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(b.raw.length);let C=n.at(-1);b.type==="text"&&(C==null?void 0:C.type)==="text"?(C.raw+=b.raw,C.text+=b.text):n.push(b);continue}if(b=this.tokenizer.emStrong(t,r,a)){t=t.substring(b.raw.length),n.push(b);continue}if(b=this.tokenizer.codespan(t)){t=t.substring(b.raw.length),n.push(b);continue}if(b=this.tokenizer.br(t)){t=t.substring(b.raw.length),n.push(b);continue}if(b=this.tokenizer.del(t,r,a)){t=t.substring(b.raw.length),n.push(b);continue}if(b=this.tokenizer.autolink(t)){t=t.substring(b.raw.length),n.push(b);continue}if(!this.state.inLink&&(b=this.tokenizer.url(t))){t=t.substring(b.raw.length),n.push(b);continue}let S=t;if((m=this.options.extensions)!=null&&m.startInline){let C=1/0,z=t.slice(1),O;this.options.extensions.startInline.forEach(P=>{O=P.call({lexer:this},z),typeof O=="number"&&O>=0&&(C=Math.min(C,O))}),C<1/0&&C>=0&&(S=t.substring(0,C+1))}if(b=this.tokenizer.inlineText(S)){t=t.substring(b.raw.length),b.raw.slice(-1)!=="_"&&(a=b.raw.slice(-1)),o=!0;let C=n.at(-1);(C==null?void 0:C.type)==="text"?(C.raw+=b.raw,C.text+=b.text):n.push(b);continue}if(t){this.infiniteLoopError(t.charCodeAt(0));break}}return n}infiniteLoopError(t){let n="Infinite loop on byte: "+t;if(this.options.silent)console.error(n);else throw new Error(n)}},nr=class{constructor(e){ee(this,"options");ee(this,"parser");this.options=e||Vt}space(e){return""}code({text:e,lang:t,escaped:n}){var i;let r=(i=(t||"").match(ye.notSpaceStart))==null?void 0:i[0],s=e.replace(ye.endingNewline,"")+`
`;return r?'<pre><code class="language-'+Ye(r)+'">'+(n?s:Ye(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:Ye(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,r="";for(let o=0;o<e.items.length;o++){let a=e.items[o];r+=this.listitem(a)}let s=t?"ol":"ul",i=t&&n!==1?' start="'+n+'"':"";return"<"+s+i+`>
`+r+"</"+s+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let s=0;s<e.header.length;s++)n+=this.tablecell(e.header[s]);t+=this.tablerow({text:n});let r="";for(let s=0;s<e.rows.length;s++){let i=e.rows[s];n="";for(let o=0;o<i.length;o++)n+=this.tablecell(i[o]);r+=this.tablerow({text:n})}return r&&(r=`<tbody>${r}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Ye(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),s=qi(e);if(s===null)return r;e=s;let i='<a href="'+e+'"';return t&&(i+=' title="'+Ye(t)+'"'),i+=">"+r+"</a>",i}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let s=qi(e);if(s===null)return Ye(n);e=s;let i=`<img src="${e}" alt="${Ye(n)}"`;return t&&(i+=` title="${Ye(t)}"`),i+=">",i}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Ye(e.text)}},Rs=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Ne=class Qr{constructor(t){ee(this,"options");ee(this,"renderer");ee(this,"textRenderer");this.options=t||Vt,this.options.renderer=this.options.renderer||new nr,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Rs}static parse(t,n){return new Qr(n).parse(t)}static parseInline(t,n){return new Qr(n).parseInline(t)}parse(t){var r,s;this.renderer.parser=this;let n="";for(let i=0;i<t.length;i++){let o=t[i];if((s=(r=this.options.extensions)==null?void 0:r.renderers)!=null&&s[o.type]){let l=o,u=this.options.extensions.renderers[l.type].call({parser:this},l);if(u!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(l.type)){n+=u||"";continue}}let a=o;switch(a.type){case"space":{n+=this.renderer.space(a);break}case"hr":{n+=this.renderer.hr(a);break}case"heading":{n+=this.renderer.heading(a);break}case"code":{n+=this.renderer.code(a);break}case"table":{n+=this.renderer.table(a);break}case"blockquote":{n+=this.renderer.blockquote(a);break}case"list":{n+=this.renderer.list(a);break}case"checkbox":{n+=this.renderer.checkbox(a);break}case"html":{n+=this.renderer.html(a);break}case"def":{n+=this.renderer.def(a);break}case"paragraph":{n+=this.renderer.paragraph(a);break}case"text":{n+=this.renderer.text(a);break}default:{let l='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}parseInline(t,n=this.renderer){var s,i;this.renderer.parser=this;let r="";for(let o=0;o<t.length;o++){let a=t[o];if((i=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&i[a.type]){let u=this.options.extensions.renderers[a.type].call({parser:this},a);if(u!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(a.type)){r+=u||"";continue}}let l=a;switch(l.type){case"escape":{r+=n.text(l);break}case"html":{r+=n.html(l);break}case"link":{r+=n.link(l);break}case"image":{r+=n.image(l);break}case"checkbox":{r+=n.checkbox(l);break}case"strong":{r+=n.strong(l);break}case"em":{r+=n.em(l);break}case"codespan":{r+=n.codespan(l);break}case"br":{r+=n.br(l);break}case"del":{r+=n.del(l);break}case"text":{r+=n.text(l);break}default:{let u='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(u),"";throw new Error(u)}}}return r}},Nn,fn=(Nn=class{constructor(e){ee(this,"options");ee(this,"block");this.options=e||Vt}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(e=this.block){return e?Le.lex:Le.lexInline}provideParser(e=this.block){return e?Ne.parse:Ne.parseInline}},ee(Nn,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),ee(Nn,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Nn),Qf=class{constructor(...e){ee(this,"defaults",bs());ee(this,"options",this.setOptions);ee(this,"parse",this.parseMarkdown(!0));ee(this,"parseInline",this.parseMarkdown(!1));ee(this,"Parser",Ne);ee(this,"Renderer",nr);ee(this,"TextRenderer",Rs);ee(this,"Lexer",Le);ee(this,"Tokenizer",tr);ee(this,"Hooks",fn);this.use(...e)}walkTokens(e,t){var r,s;let n=[];for(let i of e)switch(n=n.concat(t.call(this,i)),i.type){case"table":{let o=i;for(let a of o.header)n=n.concat(this.walkTokens(a.tokens,t));for(let a of o.rows)for(let l of a)n=n.concat(this.walkTokens(l.tokens,t));break}case"list":{let o=i;n=n.concat(this.walkTokens(o.items,t));break}default:{let o=i;(s=(r=this.defaults.extensions)==null?void 0:r.childTokens)!=null&&s[o.type]?this.defaults.extensions.childTokens[o.type].forEach(a=>{let l=o[a].flat(1/0);n=n.concat(this.walkTokens(l,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let i=t.renderers[s.name];i?t.renderers[s.name]=function(...o){let a=s.renderer.apply(this,o);return a===!1&&(a=i.apply(this,o)),a}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let i=t[s.level];i?i.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){let s=this.defaults.renderer||new nr(this.defaults);for(let i in n.renderer){if(!(i in s))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let o=i,a=n.renderer[o],l=s[o];s[o]=(...u)=>{let c=a.apply(s,u);return c===!1&&(c=l.apply(s,u)),c||""}}r.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new tr(this.defaults);for(let i in n.tokenizer){if(!(i in s))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let o=i,a=n.tokenizer[o],l=s[o];s[o]=(...u)=>{let c=a.apply(s,u);return c===!1&&(c=l.apply(s,u)),c}}r.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new fn;for(let i in n.hooks){if(!(i in s))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let o=i,a=n.hooks[o],l=s[o];fn.passThroughHooks.has(i)?s[o]=u=>{if(this.defaults.async&&fn.passThroughHooksRespectAsync.has(i))return(async()=>{let p=await a.call(s,u);return l.call(s,p)})();let c=a.call(s,u);return l.call(s,c)}:s[o]=(...u)=>{if(this.defaults.async)return(async()=>{let p=await a.apply(s,u);return p===!1&&(p=await l.apply(s,u)),p})();let c=a.apply(s,u);return c===!1&&(c=l.apply(s,u)),c}}r.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,i=n.walkTokens;r.walkTokens=function(o){let a=[];return a.push(i.call(this,o)),s&&(a=a.concat(s.call(this,o))),a}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Le.lex(e,t??this.defaults)}parser(e,t){return Ne.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},s={...this.defaults,...r},i=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&r.async===!1)return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let o=s.hooks?await s.hooks.preprocess(t):t,a=await(s.hooks?await s.hooks.provideLexer(e):e?Le.lex:Le.lexInline)(o,s),l=s.hooks?await s.hooks.processAllTokens(a):a;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser(e):e?Ne.parse:Ne.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(i);try{s.hooks&&(t=s.hooks.preprocess(t));let o=(s.hooks?s.hooks.provideLexer(e):e?Le.lex:Le.lexInline)(t,s);s.hooks&&(o=s.hooks.processAllTokens(o)),s.walkTokens&&this.walkTokens(o,s.walkTokens);let a=(s.hooks?s.hooks.provideParser(e):e?Ne.parse:Ne.parseInline)(o,s);return s.hooks&&(a=s.hooks.postprocess(a)),a}catch(o){return i(o)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+Ye(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},Nt=new Qf;function X(e,t){return Nt.parse(e,t)}X.options=X.setOptions=function(e){return Nt.setOptions(e),X.defaults=Nt.defaults,ea(X.defaults),X};X.getDefaults=bs;X.defaults=Vt;X.use=function(...e){return Nt.use(...e),X.defaults=Nt.defaults,ea(X.defaults),X};X.walkTokens=function(e,t){return Nt.walkTokens(e,t)};X.parseInline=Nt.parseInline;X.Parser=Ne;X.parser=Ne.parse;X.Renderer=nr;X.TextRenderer=Rs;X.Lexer=Le;X.lexer=Le.lex;X.Tokenizer=tr;X.Hooks=fn;X.parse=X;X.options;X.setOptions;X.use;X.walkTokens;X.parseInline;Ne.parse;Le.lex;const Kf=`\r
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
use rbatis::table_sync;\r
use rbatis::table_sync::SqliteTableMapper;\r
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
    // ------------choose database column mapper------------\r
    let mapper = &table_sync::SqliteTableMapper{} as &dyn ColumMapper;\r
    // let mapper = &table_sync::PGTableMapper{} as &dyn ColumMapper;\r
    //let mapper = &table_sync::MysqlTableMapper{} as &dyn ColumMapper;\r
    // let mapper = &table_sync::MssqlTableMapper{} as &dyn ColumMapper;\r
\r
    let map = rbs::to_value!{\r
            "id":"INT",\r
            "name":"TEXT",\r
     };\r
    let _ = RBatis::sync(&rb,mapper,&map,"rb_user").await;\r
\r
\r
    RBatis::sync(\r
        &rb.acquire().await.unwrap(),\r
        mapper,\r
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
`,Zf=`### rbatis-v4\r
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
use rbatis::table_sync;\r
use rbatis::table_sync::SqliteTableMapper;\r
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
    // ------------choose database column mapper------------\r
    let mapper = &table_sync::SqliteTableMapper{} as &dyn ColumMapper;\r
    // let mapper = &table_sync::PGTableMapper{} as &dyn ColumMapper;\r
    //let mapper = &table_sync::MysqlTableMapper{} as &dyn ColumMapper;\r
    // let mapper = &table_sync::MssqlTableMapper{} as &dyn ColumMapper;\r
\r
    let map = rbs::to_value!{\r
            "id":"INT",\r
            "name":"TEXT",\r
     };\r
    let _ = RBatis::sync(&rb,mapper,&map,"rb_user").await;\r
\r
\r
    RBatis::sync(\r
        &rb.acquire().await.unwrap(),\r
        mapper,\r
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
`,Xf={class:"doc-layout"},Jf={class:"sidebar-header"},Yf={class:"sidebar-nav"},ed=["href","onClick"],td=["innerHTML"],nd={__name:"Docs",setup(e){const t=ze("lang"),n=Me(()=>t.value==="zh"),r=Ot(""),s=Ot([]),i=Ot(""),o=Ot(!0);let a=null;X.setOptions({gfm:!0,breaks:!0});function l(){const p=n.value?Zf:Kf;r.value='<div class="content">'+X.parse(p)+"</div>"}function u(){as(()=>{const p=document.querySelectorAll(".content h2, .content h3, .content h4"),h=[];p.forEach(m=>{const b=parseInt(m.tagName.slice(1)),S=m.textContent.replace(/#$/,"").trim();let C=m.id;C||(C=S.toLowerCase().replace(/[^\w\s一-鿿-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-"),m.id=C),h.push({level:b,text:S,id:C})}),s.value=h,a&&a.disconnect(),a=new IntersectionObserver(m=>{m.forEach(b=>{b.isIntersecting&&(i.value=b.target.id)})},{rootMargin:"-80px 0px -80% 0px"}),p.forEach(m=>a.observe(m)),document.querySelectorAll(".content h2, .content h3, .content h4").forEach(m=>{if(!m.id)return;const b=document.createElement("a");b.className="anchor-link",b.href="#"+m.id,b.textContent="#",m.prepend(b)}),typeof Prism<"u"&&Prism.highlightAll()})}function c(p){const h=document.getElementById(p);h&&h.scrollIntoView({behavior:"smooth",block:"start"}),o.value=!1}return gn(t,()=>{l(),u(),document.title="RBatis V4 - "+(n.value?"文档":"Documentation")}),fr(()=>{l(),u(),document.title="RBatis V4 - "+(n.value?"文档":"Documentation")}),Tn(()=>{a&&a.disconnect()}),(p,h)=>(He(),it("div",Xf,[_("aside",{class:ht(["sidebar",{active:o.value}]),id:"sidebar"},[_("div",Jf,"V4 "+V(n.value?"文档":"Documentation"),1),_("nav",Yf,[(He(!0),it(Be,null,hl(s.value,m=>(He(),it("a",{key:m.id,href:"#"+m.id,class:ht(["sidebar-link",["sidebar-h"+m.level,{active:i.value===m.id}]]),onClick:Ll(b=>c(m.id),["prevent"])},V(m.text),11,ed))),128))])],2),_("main",{class:"content-area doc",onClick:h[0]||(h[0]=m=>o.value=!1)},[_("div",{id:"content",class:"content",innerHTML:r.value},null,8,td)])]))}},rd=[{path:"/",component:af},{path:"/v4",component:nd}],sd=sp({history:Iu(),routes:rd}),id={"nav-home":{en:"Home",zh:"首页"},"nav-v4-docs":{en:"V4 Docs",zh:"V4 文档"},tagline:{en:"Compile-time ORM for Rust",zh:"Rust 编译期 ORM"},"feature-perf-title":{en:"High Performance",zh:"高性能"},"feature-perf-desc":{en:"Zero-cost dynamic SQL compiled at build time",zh:"编译期零成本动态 SQL"},"feature-safe-title":{en:"Type Safe",zh:"类型安全"},"feature-safe-desc":{en:"100% safe Rust, compile-time query verification",zh:"100% 安全的 Rust，编译期查询验证"},"feature-driver-title":{en:"Driver Abstraction",zh:"驱动抽象"},"feature-driver-desc":{en:"Pluggable database drivers via rbdc trait system",zh:"通过 rbdc trait 系统实现可插拔驱动"},"terminal-cargo":{en:"# Cargo.toml",zh:"# Cargo.toml"},"terminal-start":{en:"# exec_decode",zh:"# exec_decode"},"cta-start":{en:"Get Started",zh:"快速开始"},"sec-why-title":{en:"Why RBatis?",zh:"为什么选择 RBatis？"},"sec-why-sub":{en:"A modern, high-performance ORM for Rust with compile-time safety",zh:"一个现代、高性能的 Rust ORM，编译期安全保障"},"sec-why-compile-title":{en:"Compile-time Dynamic SQL",zh:"编译期动态 SQL"},"sec-why-compile-desc":{en:"Zero-cost dynamic SQL powered by proc-macros at compile time. Uses Cow to minimize cloning — no ONGL engine needed.",zh:"编译期通过 proc-macro 实现的零成本动态 SQL，使用 Cow 减少克隆，无需 ONGL 引擎。"},"sec-why-mybatis-title":{en:"MyBatis3 Compatible",zh:"兼容 MyBatis3"},"sec-why-mybatis-desc":{en:"Familiar MyBatis3 syntax support. Easily migrate existing Java projects to Rust with minimal changes.",zh:"支持熟悉的 MyBatis3 语法，轻松将 Java 项目迁移到 Rust。"},"sec-why-safe-title":{en:"100% Safe Rust",zh:"100% 安全的 Rust"},"sec-why-safe-desc":{en:"Enforces #![forbid(unsafe_code)] — compile-time query verification, zero undefined behavior.",zh:"强制 #![forbid(unsafe_code)] — 编译期查询验证，零未定义行为。"},"sec-why-async-title":{en:"Async & High Performance",zh:"异步 & 高性能"},"sec-why-async-desc":{en:"Built on Tokio async runtime. No GC, no runtime overhead — pure zero-cost abstractions.",zh:"基于 Tokio 异步运行时，无 GC，无运行时开销 — 纯粹的零成本抽象。"},"sec-why-driver-title":{en:"Pluggable Drivers",zh:"可插拔驱动"},"sec-why-driver-desc":{en:"JDBC-like rbdc trait system. Switch databases by changing a single line of Cargo.toml.",zh:"类似 JDBC 的 rbdc trait 系统，切换数据库只需修改一行 Cargo.toml。"},"sec-why-plugin-title":{en:"Rich Plugin System",zh:"丰富的插件系统"},"sec-why-plugin-desc":{en:"Interceptors, auto table-sync, snowflake & ObjectId generators, pagination, and more.",zh:"拦截器、自动表同步、雪花算法 & ObjectId 生成器、分页等等。"},"sec-dsql-title":{en:"Dynamic SQL",zh:"动态 SQL"},"sec-dsql-sub":{en:"Two powerful dynamic SQL languages — write complex queries with ease",zh:"两种强大的动态 SQL 语言 — 轻松编写复杂查询"},"sec-dsql-crud-desc":{en:"Macro that generates built-in CRUD functions for your table structs — zero boilerplate.",zh:"为表结构生成内置 CRUD 函数的宏 — 零样板代码。"},"sec-dsql-html-desc":{en:"MyBatis-compatible XML syntax with &lt;if&gt;, &lt;foreach&gt;, &lt;where&gt;, &lt;trim&gt;, and &lt;choose&gt; support.",zh:"兼容 MyBatis 的 XML 语法，支持 &lt;if&gt;、&lt;foreach&gt;、&lt;where&gt;、&lt;trim&gt;、&lt;choose&gt;。"},"sec-dsql-py-desc":{en:"Python-like syntax for dynamic SQL — concise, readable, and expressive.",zh:"类似 Python 的动态 SQL 语法 — 简洁、可读、表达力强。"},"sec-db-title":{en:"Supported Databases",zh:"支持的数据库"},"sec-db-sub":{en:"Any database that implements the rbdc trait — or write your own driver",zh:"任何实现了 rbdc trait 的数据库 — 你也可以自己编写驱动"},"sec-eco-title":{en:"Ecosystem",zh:"生态项目"},"sec-eco-sub":{en:"Production-ready projects built with RBatis",zh:"基于 RBatis 的生产级项目"},"sec-eco-abs":{en:"Background user management system — Vue.js + RBatis + Axum",zh:"后台用户管理系统 — Vue.js + RBatis + Axum"},"sec-eco-salvo":{en:"Permission management system — React + RBatis + Salvo",zh:"后台权限管理系统 — React + RBatis + Salvo"},"footer-contrib":{en:"© RBatis Contributors",zh:"© RBatis Contributors"},"footer-github":{en:"GitHub",zh:"GitHub"}},ld={install(e){const t=Ot(n());function n(){return localStorage.getItem("rbatis-lang")||"en"}function r(i){t.value=i,localStorage.setItem("rbatis-lang",i),document.documentElement.setAttribute("lang",i==="zh"?"zh-CN":"en")}function s(i){const o=id[i];return o?o[t.value]||o.en:i}e.provide("lang",Fn(t)),e.provide("setLang",r),e.provide("t",s),document.documentElement.setAttribute("lang",t.value==="zh"?"zh-CN":"en"),e.config.globalProperties.$t=s,e.config.globalProperties.$setLang=r,e.config.globalProperties.$lang=t}},qs=zc(Xc);qs.use(sd);qs.use(ld);qs.mount("#app");
