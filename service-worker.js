if(!self.define){let e,s={};const i=(i,r)=>(i=new URL(i+".js",r).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(r,n)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let o={};const c=e=>i(e,l),u={module:{uri:l},exports:o,require:c};s[l]=Promise.all(r.map((e=>u[e]||c(e)))).then((e=>(n(...e),o)))}}define(["./workbox-db5fc017"],(function(e){"use strict";e.setCacheNameDetails({prefix:"gym-app"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/gym-app/css/app.a5e9799c.css",revision:null},{url:"/gym-app/css/chunk-vendors.f7813bf3.css",revision:null},{url:"/gym-app/img/exercise.373fbe48.svg",revision:null},{url:"/gym-app/img/home.c321bd64.svg",revision:null},{url:"/gym-app/img/membership.dfb3f85a.svg",revision:null},{url:"/gym-app/img/nutrition.d9fb34ba.svg",revision:null},{url:"/gym-app/index.html",revision:"6c5740a3d71ba473bc9f6330bfa60196"},{url:"/gym-app/js/app.0a8ccedb.js",revision:null},{url:"/gym-app/js/chunk-vendors.665a7677.js",revision:null},{url:"/gym-app/manifest.json",revision:"6d44c5f7c5a3e64c2bb045dab42f250e"},{url:"/gym-app/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
