import{g as e,r as a,o as r,c as s,j as t,d as n,u as l,$ as o,D as u,E as i,F as c,_ as p}from"./app.02abe5b3.js";import{P as d,a as m,b as f}from"./chunks/PartnerJoin.339b56e8.js";import"./chunks/PartnerCard.40eb4f3d.js";const v={class:"container"},b=p(e({__name:"PartnerAll",setup(e){let p=a("");function b(e){return h(e.name,p.value)||e.region.some((e=>h(e,p.value)))}function h(e,a){return e.toLowerCase().includes(a.toLowerCase())}return(e,a)=>(r(),s(c,null,[t(d,{title:"Browser All Partners"}),n("div",v,[t(l(o),{class:"icon"}),u(n("input",{placeholder:"Search partners by name or region","onUpdate:modelValue":a[0]||(a[0]=e=>p.value=e)},null,512),[[i,p.value]]),t(m,{filter:b})]),t(f)],64))}}),[["__scopeId","data-v-ce94698c"]]),h=JSON.parse('{"title":"","description":"","frontmatter":{"page":true,"footer":false},"headers":[],"relativePath":"partners/all.md"}'),P=Object.assign({name:"partners/all.md"},{setup:e=>(e,a)=>(r(),s("div",null,[t(b)]))});export{h as __pageData,P as default};
