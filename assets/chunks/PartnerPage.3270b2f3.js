import{d as a,n as s,P as r}from"./PartnerCard.4a1c6fdb.js";import{g as e,o as n,c as t,d as i,j as c,u as l,Z as o,t as p,F as d,n as h,l as u,e as f,_ as g}from"../app.01220c78.js";const m={class:"partner-page"},b={class:"back"},v={href:"/partners/all.html"},_=f("Back to all partners"),k={class:"description"},P=["innerHTML"],j={class:"actions"},L=["href"],C=["href"],H={key:0,class:"hiring"},M=["href"],T=g(e({__name:"PartnerPage",props:{partner:null},setup(e){const f=a.find((a=>s(a.name)===e.partner));return(a,s)=>{return n(),t("div",m,[i("div",b,[i("a",v,[c(l(o),{class:"icon"}),_])]),c(r,{hero:"",page:"",data:l(f)},null,8,["data"]),i("div",k,[i("h2",null,"About "+p(l(f).name),1),(n(!0),t(d,null,h(l(f).description,(a=>(n(),t("p",{innerHTML:a},null,8,P)))),256))]),i("div",j,[i("a",{href:l(f).website.url,target:"_blank"},"Visit Website",8,L),i("a",{class:"contact",href:(e=l(f).contact,`mailto:${e}?subject=Looking for a Vue.js Partner`),target:"_blank"},"Contact",8,C)]),l(f).hiring?(n(),t("div",H,[i("a",{href:l(f).hiring},p(l(f).name)+" is hiring!",9,M)])):u("",!0)]);var e}}}),[["__scopeId","data-v-3c08d5c9"]]);export{T as P};
