import{g as a,r as e,o as r,c as s,j as t,d as n,u as l,$ as o,D as u,E as c,F as i,_ as p}from"./app.87d21545.js";import{P as d,a as m,b as f}from"./chunks/PartnerJoin.5cb85830.js";import"./chunks/PartnerCard.13cc23d4.js";const v={class:"container"},h=p(a({__name:"PartnerAll",setup(a){let p=e("");function h(a){return P(a.name,p.value)||a.region.some((a=>P(a,p.value)))}function P(a,e){return a.toLowerCase().includes(e.toLowerCase())}return(a,e)=>(r(),s(i,null,[t(d,{title:"Browser All Partners"}),n("div",v,[t(l(o),{class:"icon"}),u(n("input",{placeholder:"Search partners by name or region","onUpdate:modelValue":e[0]||(e[0]=a=>p.value=a)},null,512),[[c,p.value]]),t(m,{filter:h})]),t(f)],64))}}),[["__scopeId","data-v-ce94698c"]]),P=JSON.parse('{"title":"","description":"","frontmatter":{"page":true,"footer":false},"headers":[],"relativePath":"partners/all.md"}'),g=Object.assign({name:"partners/all.md"},{setup:a=>(a,e)=>(r(),s("div",null,[t(h)]))});export{P as __pageData,g as default};
