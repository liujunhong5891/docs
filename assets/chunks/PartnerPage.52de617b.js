import{d as a,n as s,P as r}from"./PartnerCard.45f16f95.js";import{g as e,o as n,c as t,d as i,j as l,u as c,Z as o,t as p,F as d,n as h,l as f,e as u,_ as g}from"../app.ca076d61.js";const m={class:"partner-page"},b={class:"back"},v={href:"/partners/all.html"},_=u("Back to all partners"),k={class:"description"},P=["innerHTML"],j={class:"actions"},L=["href"],C=["href"],H={key:0,class:"hiring"},M=["href"],T=g(e({__name:"PartnerPage",props:{partner:null},setup(e){const u=a.find((a=>s(a.name)===e.partner));return(a,s)=>{return n(),t("div",m,[i("div",b,[i("a",v,[l(c(o),{class:"icon"}),_])]),l(r,{hero:"",page:"",data:c(u)},null,8,["data"]),i("div",k,[i("h2",null,"About "+p(c(u).name),1),(n(!0),t(d,null,h(c(u).description,(a=>(n(),t("p",{innerHTML:a},null,8,P)))),256))]),i("div",j,[i("a",{href:c(u).website.url,target:"_blank"},"Visit Website",8,L),i("a",{class:"contact",href:(e=c(u).contact,`mailto:${e}?subject=Looking for a Vue.js Partner`),target:"_blank"},"Contact",8,C)]),c(u).hiring?(n(),t("div",H,[i("a",{href:c(u).hiring},p(c(u).name)+" is hiring!",9,M)])):f("",!0)]);var e}}}),[["__scopeId","data-v-3c08d5c9"]]);export{T as P};
