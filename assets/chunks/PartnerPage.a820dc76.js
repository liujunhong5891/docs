import{d as a,n as s,P as r}from"./PartnerCard.2c80e3b2.js";import{g as e,o as n,c as t,d as i,j as l,u as c,Z as o,t as p,F as d,n as h,l as u,e as f,_ as g}from"../app.d0375d54.js";const m={class:"partner-page"},b={class:"back"},v={href:"/partners/all.html"},_=f("Back to all partners"),k={class:"description"},P=["innerHTML"],j={class:"actions"},L=["href"],C=["href"],H={key:0,class:"hiring"},M=["href"],T=g(e({__name:"PartnerPage",props:{partner:null},setup(e){const f=a.find((a=>s(a.name)===e.partner));return(a,s)=>{return n(),t("div",m,[i("div",b,[i("a",v,[l(c(o),{class:"icon"}),_])]),l(r,{hero:"",page:"",data:c(f)},null,8,["data"]),i("div",k,[i("h2",null,"About "+p(c(f).name),1),(n(!0),t(d,null,h(c(f).description,(a=>(n(),t("p",{innerHTML:a},null,8,P)))),256))]),i("div",j,[i("a",{href:c(f).website.url,target:"_blank"},"Visit Website",8,L),i("a",{class:"contact",href:(e=c(f).contact,`mailto:${e}?subject=Looking for a Vue.js Partner`),target:"_blank"},"Contact",8,C)]),c(f).hiring?(n(),t("div",H,[i("a",{href:c(f).hiring},p(c(f).name)+" is hiring!",9,M)])):u("",!0)]);var e}}}),[["__scopeId","data-v-3c08d5c9"]]);export{T as P};
