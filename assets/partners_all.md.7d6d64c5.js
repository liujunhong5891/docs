import{g as e,r as a,o as r,c as s,j as t,d as n,u as l,$ as o,D as u,E as i,F as c,_ as p}from"./app.80b45145.js";import{P as d,a as m,b as f}from"./chunks/PartnerJoin.2b73c256.js";import"./chunks/PartnerCard.e46ce911.js";const v={class:"container"},h=p(e({__name:"PartnerAll",setup(e){let p=a("");function h(e){return P(e.name,p.value)||e.region.some((e=>P(e,p.value)))}function P(e,a){return e.toLowerCase().includes(a.toLowerCase())}return(e,a)=>(r(),s(c,null,[t(d,{title:"Browser All Partners"}),n("div",v,[t(l(o),{class:"icon"}),u(n("input",{placeholder:"Search partners by name or region","onUpdate:modelValue":a[0]||(a[0]=e=>p.value=e)},null,512),[[i,p.value]]),t(m,{filter:h})]),t(f)],64))}}),[["__scopeId","data-v-ce94698c"]]),P=JSON.parse('{"title":"","description":"","frontmatter":{"page":true,"footer":false},"headers":[],"relativePath":"partners/all.md"}'),b=Object.assign({name:"partners/all.md"},{setup:e=>(e,a)=>(r(),s("div",null,[t(h)]))});export{P as __pageData,b as default};
