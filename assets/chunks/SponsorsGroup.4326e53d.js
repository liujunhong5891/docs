import{r as s,g as a,b as e,Y as t,o as r,c as n,u as o,F as i,n as l,d as p,l as c,W as u,_ as m}from"../app.525807da.js";const g=s(),d=s(!1),v="https://sponsors.vuejs.org",f=async()=>{d.value||(d.value=!0,g.value=await(await fetch(`${v}/data.json`)).json())},y=["href"],$={key:0},h=["srcset"],_=["src","alt"],k=["src","alt"],b={key:1,href:"/sponsor/",class:"sponsor-item action"},x=m(a({__name:"SponsorsGroup",props:{tier:null,placement:{default:"aside"}},setup(a){let m=s(),d=s(!1);return e((async()=>{const s=new IntersectionObserver((a=>{a[0].isIntersecting&&(d.value=!0,s.disconnect())}),{rootMargin:"0px 0px 300px 0px"});s.observe(m.value),t((()=>s.disconnect())),await f()})),(s,e)=>(r(),n("div",{ref_key:"container",ref:m,class:u(["sponsor-container",[a.tier.startsWith("plat")?"platinum":a.tier,a.placement]])},[o(g)&&d.value?(r(!0),n(i,{key:0},l(o(g)[a.tier],(({url:s,img:a,name:e})=>(r(),n("a",{class:"sponsor-item",href:s,target:"_blank",rel:"sponsored noopener"},[a.endsWith("png")?(r(),n("picture",$,[p("source",{type:"image/avif",srcset:`${o(v)}/images/${a.replace(/\.png$/,".avif")}`},null,8,h),p("img",{src:`${o(v)}/images/${a}`,alt:e},null,8,_)])):(r(),n("img",{key:1,src:`${o(v)}/images/${a}`,alt:e},null,8,k))],8,y)))),256)):c("",!0),"page"!==a.placement&&"special"!==a.tier?(r(),n("a",b,"Your logo")):c("",!0)],2))}}),[["__scopeId","data-v-ae7fa66f"]]);export{x as S,v as b,g as d,f as l};
