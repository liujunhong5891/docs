import{g as a,r as e,o as r,c as s,j as t,d as n,u as l,$ as o,D as u,E as i,F as c,_ as p}from"./app.5b7efb2f.js";import{P as d,a as m,b as f}from"./chunks/PartnerJoin.c88f78b6.js";import"./chunks/PartnerCard.a07c2b7a.js";const v={class:"container"},b=p(a({__name:"PartnerAll",setup(a){let p=e("");function b(a){return h(a.name,p.value)||a.region.some((a=>h(a,p.value)))}function h(a,e){return a.toLowerCase().includes(e.toLowerCase())}return(a,e)=>(r(),s(c,null,[t(d,{title:"Browser All Partners"}),n("div",v,[t(l(o),{class:"icon"}),u(n("input",{placeholder:"Search partners by name or region","onUpdate:modelValue":e[0]||(e[0]=a=>p.value=a)},null,512),[[i,p.value]]),t(m,{filter:b})]),t(f)],64))}}),[["__scopeId","data-v-ce94698c"]]),h=JSON.parse('{"title":"","description":"","frontmatter":{"page":true,"footer":false},"headers":[],"relativePath":"partners/all.md"}'),P=Object.assign({name:"partners/all.md"},{setup:a=>(a,e)=>(r(),s("div",null,[t(b)]))});export{h as __pageData,P as default};
