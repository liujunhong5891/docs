import{r as e,g as s,b as a,Y as t,o as r,c as n,u as o,F as i,n as l,d as p,l as c,W as u,_ as m}from"../app.00e684b2.js";const g=e(),v=e(!1),d="https://sponsors.vuejs.org",f=async()=>{v.value||(v.value=!0,g.value=await(await fetch(`${d}/data.json`)).json())},y=["href"],$={key:0},h=["srcset"],_=["src","alt"],b=["src","alt"],k={key:1,href:"/sponsor/",class:"sponsor-item action"},x=m(s({__name:"SponsorsGroup",props:{tier:null,placement:{default:"aside"}},setup(s){let m=e(),v=e(!1);return a((async()=>{const e=new IntersectionObserver((s=>{s[0].isIntersecting&&(v.value=!0,e.disconnect())}),{rootMargin:"0px 0px 300px 0px"});e.observe(m.value),t((()=>e.disconnect())),await f()})),(e,a)=>(r(),n("div",{ref_key:"container",ref:m,class:u(["sponsor-container",[s.tier.startsWith("plat")?"platinum":s.tier,s.placement]])},[o(g)&&v.value?(r(!0),n(i,{key:0},l(o(g)[s.tier],(({url:e,img:s,name:a})=>(r(),n("a",{class:"sponsor-item",href:e,target:"_blank",rel:"sponsored noopener"},[s.endsWith("png")?(r(),n("picture",$,[p("source",{type:"image/avif",srcset:`${o(d)}/images/${s.replace(/\.png$/,".avif")}`},null,8,h),p("img",{src:`${o(d)}/images/${s}`,alt:a},null,8,_)])):(r(),n("img",{key:1,src:`${o(d)}/images/${s}`,alt:a},null,8,b))],8,y)))),256)):c("",!0),"page"!==s.placement&&"special"!==s.tier?(r(),n("a",k,"Your logo")):c("",!0)],2))}}),[["__scopeId","data-v-ae7fa66f"]]);export{x as S,d as b,g as d,f as l};
