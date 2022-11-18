import{_ as e,C as s,o as t,c as a,j as i,d as n,e as o,a as r}from"./app.ca076d61.js";const l=JSON.parse('{"title":"CICD主流程问题","description":"","frontmatter":{},"headers":[],"relativePath":"guide/essentials/CICD_FAQ.md"}'),c={name:"guide/essentials/CICD_FAQ.md"},d=n("h1",{id:"cicd主流程问题",tabindex:"-1"},[o("CICD主流程问题 "),n("a",{class:"header-anchor",href:"#cicd主流程问题","aria-hidden":"true"},"#")],-1),p=r('<p>主流程搭建过程问题：</p><ol><li>git仓库的证书，包括账号密码、ssh公私钥、tls证书； deploytoken、deploykey； 使用场景：推拉代码；</li><li>harbor仓库的证书，包括dockerconfig、base、ssh、tls、Opaque； 使用场景：推拉镜像；</li><li>git命令原理；(updated 2022.9.27)</li><li>使用最简单的webhook搭建argoevent框架，面向sensor的sa相关授权结构和语法；</li><li>将eventsource替换为gitlab webhook时，access token 、secret token的职责和生成方式；</li><li>其中tls证书作为secret token挂载时，官方示例无效，后来采用spec.template挂载卷的方式生效；<strong>并且想通过本地客户端通过https挂载ssl证书验证其有效性，未调通；</strong></li><li>使用vcluster生成svc时，且类型为nodeport时，无法指定端口； 等到svc生成nodeport后，需要根据nodeport修改gitlab的eventsource资源文件；</li><li>通过ingress关联svc，svc挂载gitlab的eventsource时，描述ingress资源显示&lt;error: endpoints &quot;default-http-backend&quot; not found&gt;，后来发现该错误是正常的；需补充ingress相关储备；</li><li>gitlab webhook和gitlab是通过https协议通讯，必须启用ssl认证，官网示例代码未同步更新，查看eventsource controller日志发现异常；</li><li>删除argocd app时，无法删除部分资源，查看ns状态为：Terminating，日志显示异常：Some resources are remaining、Some content in the namespace has finalizers remaining等关键字；(updated 2022.10.11) <ul><li>查询argocd app 指定项目的资源，去掉finalizers 的数组值，取消级联删除； argocd自动删除eventbus，进而删除ns；</li><li>参考：<a href="https://www.redhat.com/sysadmin/troubleshooting-terminating-namespaces" target="_blank" rel="noreferrer">https://www.redhat.com/sysadmin/troubleshooting-terminating-namespaces</a></li></ul></li></ol>',2);const g=e(c,[["render",function(e,n,o,r,l,c){const g=s("VueJobs");return t(),a("div",null,[d,i(g),p])}]]);export{l as __pageData,g as default};
