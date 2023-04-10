import{g as e,r as t,h as a,o as r,c as i,d as n,D as s,E as u,F as d,n as l,t as c,u as h,l as o,A as x,B as g,_ as p,j as k}from"./app.d0375d54.js";const f=JSON.parse('[{"text":"快速入门","anchor":"快速入门","items":[{"text":"概述","link":"/guide/user-guide/introduction","headers":[]},{"text":"安装部署","link":"/guide/user-guide/quickstart-03","headers":[{"text":"准备环境","anchor":"准备环境"},{"text":"执行部署","anchor":"执行部署"},{"text":"查看部署结果","anchor":"查看部署结果"},{"text":"销毁环境","anchor":"销毁环境"}]},{"text":"创建运行时环境","link":"/guide/user-guide/quickstart-01","headers":[{"text":"安装部署","anchor":"安装部署"},{"text":"注册基于物理集群的运行时集群","anchor":"注册基于物理集群的运行时集群"},{"text":"注册基于虚拟集群的运行时集群","anchor":"注册基于虚拟集群的运行时集群"},{"text":"提交产品配置清单","anchor":"提交产品配置清单"},{"text":"提交部署配置清单","anchor":"提交部署配置清单"},{"text":"查看部署结果","anchor":"查看部署结果"}]},{"text":"销毁运行时环境","link":"/guide/user-guide/quickstart-02","headers":[{"text":"前提条件","anchor":"前提条件"},{"text":"删除产品配置清单","anchor":"删除产品配置清单"},{"text":"销毁部署运行时集群","anchor":"销毁部署运行时集群"},{"text":"销毁服务器","anchor":"销毁服务器"}]}]},{"text":"用户指南","anchor":"用户指南","items":[{"text":"主体流程","link":"/guide/user-guide/user-guide-00","headers":[{"text":"安装部署","anchor":"安装部署"},{"text":"注册部署运行时集群","anchor":"注册部署运行时集群"},{"text":"提交产品配置清单","anchor":"提交产品配置清单"},{"text":"提交部署清单","anchor":"提交部署清单"},{"text":"查看部署结果","anchor":"查看部署结果"}]},{"text":"注册集群","link":"/guide/default","headers":[]},{"text":"维护产品","link":"/guide/user-guide/user-guide-01","headers":[{"text":"维护产品（API 接口）","anchor":"维护产品（api-接口）"}]},{"text":"维护项目","link":"/guide/user-guide/user-guide-02","headers":[{"text":"维护项目（API 接口）","anchor":"维护项目（api-接口）"},{"text":"强制提交项目（API 接口）","anchor":"强制提交项目（api-接口）"}]},{"text":"维护代码库","link":"/guide/user-guide/user-guide-03","headers":[{"text":"维护代码库（API 接口）","anchor":"维护代码库（api-接口）"},{"text":"强制提交代码库（API 接口）","anchor":"强制提交代码库（api-接口）"}]},{"text":"维护环境","link":"/guide/user-guide/user-guide-04","headers":[{"text":"维护环境（API 接口）","anchor":"维护环境（api-接口）"},{"text":"强制提交环境（API 接口）","anchor":"强制提交环境（api-接口）"}]},{"text":"维护部署运行时","link":"/guide/user-guide/user-guide-05","headers":[{"text":"维护部署运行时（API 接口）","anchor":"维护部署运行时（api-接口）"},{"text":"强制提交部署运行时（API 接口）","anchor":"强制提交部署运行时（api-接口）"}]},{"text":"查看部署结果","link":"/guide/user-guide/user-guide-06","headers":[{"text":"查看 ArgoCD 中的资源","anchor":"查看-argocd-中的资源"},{"text":"查看 Kubernetes 中的资源","anchor":"查看-kubernetes-中的资源"}]}]}]'),m=e=>(x("data-v-c6512ab7"),e=e(),g(),e),v={id:"api-index"},A={class:"header"},I=m((()=>n("h1",null,"API Reference",-1))),P={class:"api-filter"},b=m((()=>n("label",{for:"api-filter"},"Filter",-1))),y=["id"],_={class:"api-groups"},j=["href"],q={key:0,class:"no-match"},N=p(e({__name:"ApiIndex",setup(e){const x=t(""),g=e=>e.toLowerCase().replace(/-/g," "),p=a((()=>{const e=g(x.value),t=t=>g(t).includes(e);return f.map((a=>{if(t(a.text))return a;const r=a.items.map((a=>{if(t(a.text))return a;if(e.includes("ssr")&&a.text.startsWith("Server"))return a;const r=a.headers.filter((({text:e,anchor:a})=>t(e)||t(a)));return r.length?{text:a.text,link:a.link,headers:r}:null})).filter((e=>e));return r.length?{text:a.text,items:r}:null})).filter((e=>e))}));return(e,t)=>(r(),i("div",v,[n("div",A,[I,n("div",P,[b,s(n("input",{type:"search",placeholder:"Enter keyword",id:"api-filter","onUpdate:modelValue":t[0]||(t[0]=e=>x.value=e)},null,512),[[u,x.value]])])]),(r(!0),i(d,null,l(h(p),(e=>(r(),i("div",{key:e.text,class:"api-section"},[n("h2",{id:e.anchor},c(e.text),9,y),n("div",_,[(r(!0),i(d,null,l(e.items,(e=>(r(),i("div",{key:e.text,class:"api-group"},[n("h3",null,c(e.text),1),n("ul",null,[(r(!0),i(d,null,l(e.headers,(t=>(r(),i("li",{key:t.anchor},[n("a",{href:e.link+".html#"+t.anchor},c(t.text),9,j)])))),128))])])))),128))])])))),128)),h(p).length?o("",!0):(r(),i("div",q,' No API matching "'+c(x.value)+'" found. ',1))]))}}),[["__scopeId","data-v-c6512ab7"]]),O=JSON.parse('{"title":"API Reference","description":"","frontmatter":{"title":"API Reference","sidebar":false,"page":true,"footer":false},"headers":[],"relativePath":"api/index.md"}'),R=Object.assign({name:"api/index.md"},{setup:e=>(e,t)=>(r(),i("div",null,[k(N)]))});export{O as __pageData,R as default};
