const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-BeZuMZbx.js","assets/@vue-CyH5gSz7.js","assets/vuetify-CvMVwwzd.js","assets/vuetify-DsbUQ1YT.css","assets/@mdi-CH1eX7jq.js","assets/opencc-js-D-mJJ3do.js","assets/index-DFhNh3hY.css"])))=>i.map(i=>d[i]);
import{V as _}from"./vite-ssg-B2Ni7Bin.js";import{d as F,R as g,S as v,U as w,V as d,C as f}from"./@vue-CyH5gSz7.js";import{V as E,a as C,c as P,m as S,b,d as L}from"./vuetify-CvMVwwzd.js";import"./vue-router-CytzrVE2.js";import"./@unhead-B9EGAYRN.js";import"./unhead-aSKGPz5v.js";import"./hookable-B7_1qfUG.js";(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const t of r.addedNodes)t.tagName==="LINK"&&t.rel==="modulepreload"&&l(t)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const V=F({__name:"App",setup(i){return(c,a)=>{const l=v("router-view");return w(),g(E,null,{default:d(()=>[f(C,null,{default:d(()=>[f(l)]),_:1})]),_:1})}}}),A=P({blueprint:S,icons:{defaultSet:"mdi",aliases:b,sets:{mdi:L}},theme:{defaultTheme:"dark",themes:{light:{colors:{primary:"#1976D2",secondary:"#424242",accent:"#82B1FF",error:"#FF5252",info:"#2196F3",success:"#4CAF50",warning:"#FFC107"}},dark:{colors:{primary:"#2196F3",secondary:"#424242",accent:"#FF4081",error:"#FF5252",info:"#2196F3",success:"#4CAF50",warning:"#FFC107"}}}}}),O="modulepreload",B=function(i){return"/"+i},m={},R=function(c,a,l){let e=Promise.resolve();if(a&&a.length>0){document.getElementsByTagName("link");const t=document.querySelector("meta[property=csp-nonce]"),o=(t==null?void 0:t.nonce)||(t==null?void 0:t.getAttribute("nonce"));e=Promise.allSettled(a.map(n=>{if(n=B(n),n in m)return;m[n]=!0;const u=n.endsWith(".css"),p=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${n}"]${p}`))return;const s=document.createElement("link");if(s.rel=u?"stylesheet":O,u||(s.as="script"),s.crossOrigin="",s.href=n,o&&s.setAttribute("nonce",o),document.head.appendChild(s),u)return new Promise((h,y)=>{s.addEventListener("load",h),s.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${n}`)))})}))}function r(t){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=t,window.dispatchEvent(o),!o.defaultPrevented)throw t}return e.then(t=>{for(const o of t||[])o.status==="rejected"&&r(o.reason);return c().catch(r)})},U=[{path:"/",name:"/",component:()=>R(()=>import("./index-BeZuMZbx.js"),__vite__mapDeps([0,1,2,3,4,5,6]))}];_(V,{routes:U},i=>{i.app.use(A)});
