import{_ as e,C as s,o as a,c as t,j as n,d as l,e as p,a as o}from"./app.1f95f02e.js";const r=JSON.parse('{"title":"目标","description":"","frontmatter":{"footer":false},"headers":[{"level":2,"title":"搭建一个空的k8s集群","slug":"搭建一个空的k8s集群","link":"#搭建一个空的k8s集群","children":[]},{"level":2,"title":"搭建一个vault实例","slug":"搭建一个vault实例","link":"#搭建一个vault实例","children":[]},{"level":2,"title":"安装argocd命令行","slug":"安装argocd命令行","link":"#安装argocd命令行","children":[]},{"level":2,"title":"1.维护密钥","slug":"_1-维护密钥","link":"#_1-维护密钥","children":[{"level":3,"title":"维护cert-manager相关密钥","slug":"维护cert-manager相关密钥","link":"#维护cert-manager相关密钥","children":[]},{"level":3,"title":"维护argo-events相关密钥","slug":"维护argo-events相关密钥","link":"#维护argo-events相关密钥","children":[]},{"level":3,"title":"维护pipelines推送镜像相关密钥","slug":"维护pipelines推送镜像相关密钥","link":"#维护pipelines推送镜像相关密钥","children":[]},{"level":3,"title":"维护pipelines提交部署配置相关密钥","slug":"维护pipelines提交部署配置相关密钥","link":"#维护pipelines提交部署配置相关密钥","children":[]}]},{"level":2,"title":"2.安装argoCD","slug":"_2-安装argocd","link":"#_2-安装argocd","children":[]},{"level":2,"title":"3.安装argoCD app","slug":"_3-安装argocd-app","link":"#_3-安装argocd-app","children":[{"level":3,"title":"修改代码相关配置","slug":"修改代码相关配置","link":"#修改代码相关配置","children":[]},{"level":3,"title":"手工安装根project和根app","slug":"手工安装根project和根app","link":"#手工安装根project和根app","children":[]},{"level":3,"title":"修复cert-manager app - 配置vault授权","slug":"修复cert-manager-app-配置vault授权","link":"#修复cert-manager-app-配置vault授权","children":[]},{"level":3,"title":"修复root app - 注册集群","slug":"修复root-app-注册集群","link":"#修复root-app-注册集群","children":[]},{"level":3,"title":"修复pipeline1 app - 配置vault授权","slug":"修复pipeline1-app-配置vault授权","link":"#修复pipeline1-app-配置vault授权","children":[]}]},{"level":2,"title":"4.验证流水线自动执行","slug":"_4-验证流水线自动执行","link":"#_4-验证流水线自动执行","children":[]},{"level":2,"title":"获取vault服务端密钥报403异常","slug":"获取vault服务端密钥报403异常","link":"#获取vault服务端密钥报403异常","children":[]},{"level":2,"title":"删除argoCD app命名空间卡顿在terminating状态","slug":"删除argocd-app命名空间卡顿在terminating状态","link":"#删除argocd-app命名空间卡顿在terminating状态","children":[]},{"level":2,"title":"向github推送代码异常","slug":"向github推送代码异常","link":"#向github推送代码异常","children":[]},{"level":2,"title":"argocd无法通过浏览器访问界面","slug":"argocd无法通过浏览器访问界面","link":"#argocd无法通过浏览器访问界面","children":[]},{"level":2,"title":"cert manager生成ClusterIssuer异常","slug":"cert-manager生成clusterissuer异常","link":"#cert-manager生成clusterissuer异常","children":[]},{"level":2,"title":"链接参考","slug":"链接参考","link":"#链接参考","children":[]},{"level":2,"title":"代码库变更配置","slug":"代码库变更配置","link":"#代码库变更配置","children":[]}],"relativePath":"guide/CICD_DEMO_v0.1.md"}'),i={name:"guide/CICD_DEMO_v0.1.md"},c=l("h1",{id:"目标",tabindex:"-1"},[p("目标 "),l("a",{class:"header-anchor",href:"#目标","aria-hidden":"true"},"#")],-1),d=l("ol",null,[l("li",null,"基于开源工具搭建CI环境；"),l("li",null,"基于CI环境实现一个代码提交即构建的流水线。")],-1),u=l("h1",{id:"工具及其关系概览",tabindex:"-1"},[p("工具及其关系概览 "),l("a",{class:"header-anchor",href:"#工具及其关系概览","aria-hidden":"true"},"#")],-1),g=o("",2),h=o("",14),y=o("",51),v=o("",13),m=o("",12),b=o("",5);const C=e(i,[["render",function(e,l,p,o,r,i){const C=s("VueJobs");return a(),t("div",null,[c,n(C),d,u,n(C),g,n(C),h,n(C),y,n(C),v,n(C),m,n(C),b])}]]);export{r as __pageData,C as default};
