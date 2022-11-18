import{_ as e,o as s,c as a,a as t}from"./app.b7ef66d9.js";const n=JSON.parse('{"title":"CICD-QuickStart","description":"","frontmatter":{"footer":false},"headers":[{"level":2,"title":"目标","slug":"目标","link":"#目标","children":[]},{"level":2,"title":"工具及其关系概览","slug":"工具及其关系概览","link":"#工具及其关系概览","children":[]},{"level":2,"title":"前提","slug":"前提","link":"#前提","children":[{"level":3,"title":"搭建一个空的k8s集群","slug":"搭建一个空的k8s集群","link":"#搭建一个空的k8s集群","children":[]},{"level":3,"title":"搭建一个vault实例","slug":"搭建一个vault实例","link":"#搭建一个vault实例","children":[]},{"level":3,"title":"安装argocd命令行","slug":"安装argocd命令行","link":"#安装argocd命令行","children":[]}]},{"level":2,"title":"实施步骤","slug":"实施步骤","link":"#实施步骤","children":[{"level":3,"title":"1.维护密钥","slug":"_1-维护密钥","link":"#_1-维护密钥","children":[{"level":4,"title":"维护cert-manager相关密钥","slug":"维护cert-manager相关密钥","link":"#维护cert-manager相关密钥","children":[]},{"level":4,"title":"维护argo-events相关密钥","slug":"维护argo-events相关密钥","link":"#维护argo-events相关密钥","children":[]},{"level":4,"title":"维护pipelines推送镜像相关密钥","slug":"维护pipelines推送镜像相关密钥","link":"#维护pipelines推送镜像相关密钥","children":[]},{"level":4,"title":"维护pipelines提交部署配置相关密钥","slug":"维护pipelines提交部署配置相关密钥","link":"#维护pipelines提交部署配置相关密钥","children":[]}]},{"level":3,"title":"2.安装argoCD","slug":"_2-安装argocd","link":"#_2-安装argocd","children":[]},{"level":3,"title":"3.安装argoCD app","slug":"_3-安装argocd-app","link":"#_3-安装argocd-app","children":[{"level":4,"title":"修改代码相关配置","slug":"修改代码相关配置","link":"#修改代码相关配置","children":[]},{"level":4,"title":"手工安装根project和根app","slug":"手工安装根project和根app","link":"#手工安装根project和根app","children":[]},{"level":4,"title":"修复cert-manager app - 配置vault授权","slug":"修复cert-manager-app-配置vault授权","link":"#修复cert-manager-app-配置vault授权","children":[]},{"level":4,"title":"修复root app - 注册集群","slug":"修复root-app-注册集群","link":"#修复root-app-注册集群","children":[]},{"level":4,"title":"修复pipeline1 app - 配置vault授权","slug":"修复pipeline1-app-配置vault授权","link":"#修复pipeline1-app-配置vault授权","children":[]}]},{"level":3,"title":"4.验证流水线自动执行","slug":"_4-验证流水线自动执行","link":"#_4-验证流水线自动执行","children":[]}]},{"level":2,"title":"问题","slug":"问题","link":"#问题","children":[]},{"level":2,"title":"获取vault服务端密钥报403异常","slug":"获取vault服务端密钥报403异常","link":"#获取vault服务端密钥报403异常","children":[{"level":3,"title":"删除argoCD app命名空间卡顿在terminating状态","slug":"删除argocd-app命名空间卡顿在terminating状态","link":"#删除argocd-app命名空间卡顿在terminating状态","children":[]},{"level":3,"title":"向github推送代码异常","slug":"向github推送代码异常","link":"#向github推送代码异常","children":[]},{"level":3,"title":"argocd无法通过浏览器访问界面","slug":"argocd无法通过浏览器访问界面","link":"#argocd无法通过浏览器访问界面","children":[]},{"level":3,"title":"cert manager生成ClusterIssuer异常","slug":"cert-manager生成clusterissuer异常","link":"#cert-manager生成clusterissuer异常","children":[]}]},{"level":2,"title":"附件","slug":"附件","link":"#附件","children":[{"level":3,"title":"链接参考","slug":"链接参考","link":"#链接参考","children":[]},{"level":3,"title":"代码库变更配置","slug":"代码库变更配置","link":"#代码库变更配置","children":[]}]},{"level":2,"title":"未完成（2022.11.12，正式提交后删除该章节）","slug":"未完成（2022-11-12，正式提交后删除该章节）","link":"#未完成（2022-11-12，正式提交后删除该章节）","children":[]}],"relativePath":"guide/CICD-quickStart.md"}'),l={name:"guide/CICD-quickStart.md"},p=[t("",101)];const o=e(l,[["render",function(e,t,n,l,o,r){return s(),a("div",null,p)}]]);export{n as __pageData,o as default};
