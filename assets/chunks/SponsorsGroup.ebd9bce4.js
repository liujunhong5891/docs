import{r as s,g as e,b as a,Y as t,o as r,c as n,u as o,F as i,n as l,d as p,l as c,W as u,_ as m}from"../app.699c64d2.js";const g=s(),d=s(!1),v="https://sponsors.vuejs.org",f=async()=>{d.value||(d.value=!0,g.value=await(await fetch(`${v}/data.json`)).json())},y=["href"],$={key:0},h=["srcset"],_=["src","alt"],k=["src","alt"],b={key:1,href:"/sponsor/",class:"sponsor-item action"},x=m(e({__name:"SponsorsGroup",props:{tier:null,placement:{default:"aside"}},setup(e){let m=s(),d=s(!1);return a((async()=>{const s=new IntersectionObserver((e=>{e[0].isIntersecting&&(d.value=!0,s.disconnect())}),{rootMargin:"0px 0px 300px 0px"});s.observe(m.value),t((()=>s.disconnect())),await f()})),(s,a)=>(r(),n("div",{ref_key:"container",ref:m,class:u(["sponsor-container",[e.tier.startsWith("plat")?"platinum":e.tier,e.placement]])},[o(g)&&d.value?(r(!0),n(i,{key:0},l(o(g)[e.tier],(({url:s,img:e,name:a})=>(r(),n("a",{class:"sponsor-item",href:s,target:"_blank",rel:"sponsored noopener"},[e.endsWith("png")?(r(),n("picture",$,[p("source",{type:"image/avif",srcset:`${o(v)}/images/${e.replace(/\.png$/,".avif")}`},null,8,h),p("img",{src:`${o(v)}/images/${e}`,alt:a},null,8,_)])):(r(),n("img",{key:1,src:`${o(v)}/images/${e}`,alt:a},null,8,k))],8,y)))),256)):c("",!0),"page"!==e.placement&&"special"!==e.tier?(r(),n("a",b,"Your logo")):c("",!0)],2))}}),[["__scopeId","data-v-ae7fa66f"]]);export{x as S,v as b,g as d,f as l};