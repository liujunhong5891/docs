import{_ as s,o as a,c as n,a as l}from"./app.e8b008f9.js";const e=JSON.parse('{"title":"查看部署结果","description":"","frontmatter":{"outline":"deep"},"headers":[{"level":2,"title":"查看 ArgoCD 中的资源","slug":"查看-argocd-中的资源","link":"#查看-argocd-中的资源","children":[]},{"level":2,"title":"查看 Kubernetes 中的资源","slug":"查看-kubernetes-中的资源","link":"#查看-kubernetes-中的资源","children":[]}],"relativePath":"guide/user-guide/user-guide-06.md"}'),p={name:"guide/user-guide/user-guide-06.md"},o=[l('<h1 id="查看部署结果" tabindex="-1">查看部署结果 <a class="header-anchor" href="#查看部署结果" aria-hidden="true">#</a></h1><p>在开始本节之前，请确保您已阅读 <a href="./user-guide-00.html">概述</a> 章节，了解创建运行时环境的主流程和相关术语，并且已经创建了至少一个部署运行时，详情参见 <a href="./user-guide-05.html">维护部署运行时</a>。</p><p>您可以通过 ArgoCD 控制台和 Kubectl 命令行两种方式查看项目的部署情况。您只能查看和管理授权产品的项目的相关资源。</p><h2 id="查看-argocd-中的资源" tabindex="-1">查看 ArgoCD 中的资源 <a class="header-anchor" href="#查看-argocd-中的资源" aria-hidden="true">#</a></h2><p>访问安装在部署运行时集群中的 <a href="./quickstart-03.html#查看组件信息">ArgoCD 控制台</a> ，并点击右上角的“LOG IN VIA DEX”按钮进行统一认证。如果您在当前浏览器会话中未登录过认证服务器（如 Gitlab），那么您需要先使用账号和密码进行登录，登录成功后页面会自动跳转至 ArgoCD 控制台。在 ArgoCD 控制台中您可以查看和管理被授权产品相关的 ArgoCD Applications，您也可以通过访问“设置/项目”页面来查看被授权产品相关的 ArgoCD Projects。</p><p><img src="/docs/assets/quickstart-argocd-2.e20eb57e.png" alt="directive syntax graph"></p><p>您可以通过点击某个 ArgoCD Application 卡片来查看此应用所管理的资源清单，您也可以查看某个资源的YAML、事件、日志等，并对该资源执行同步、重启、删除等操作。</p><h2 id="查看-kubernetes-中的资源" tabindex="-1">查看 Kubernetes 中的资源 <a class="header-anchor" href="#查看-kubernetes-中的资源" aria-hidden="true">#</a></h2><p>您可以通过一个标准的 OICD 客户端进行统一认证以获取 ID Token，并将该 ID Token 作为 Kubectl 的认证凭证，再使用 Kubectl 以认证服务器上的身份访问 Kubernetes。下文描述了如何通过 DEX 官方提供的一个示例客户端进行统一认证并获取 ID Token。</p><p>您可以从<a href="https://github.com/dexidp/dex/tree/master/examples/example-app" target="_blank" rel="noreferrer">这里</a>获取该客户端的源码，并将源码编译为二进制文件。然后您可以通过以下指令启动这个客户端，客户端启动后会提供一个简单的 WEB UI 进行统一认证并返回认证结果。</p><div class="language-shell"><button class="copy"></button><span class="lang">shell</span><pre><code><span class="line"><span style="color:#A6ACCD;">./example-app \\</span></span>\n<span class="line"><span style="color:#A6ACCD;"> --client-id </span><span style="color:#89DDFF;">&quot;$</span><span style="color:#A6ACCD;">client_id</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;"> --client-secret </span><span style="color:#89DDFF;">&quot;$</span><span style="color:#A6ACCD;">client_secret</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;"> --issuer </span><span style="color:#89DDFF;">&quot;$</span><span style="color:#A6ACCD;">dex_url</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;"> --issuer-root-ca </span><span style="color:#89DDFF;">&quot;$</span><span style="color:#A6ACCD;">dex_ca</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;"> --listen </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">http://0.0.0.0:5555</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;"> --redirect-uri </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">http://</span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">ip</span><span style="color:#C3E88D;">:5555/callback</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> /tmp/dex-client.log </span><span style="color:#89DDFF;">2&gt;&amp;1</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;</span></span>\n<span class="line"></span></code></pre></div><p>指令中的 $client_id 和 $client_secret 是 DEX 颁发的客户端密钥，$dex_url 是 DEX 的服务地址，$dex_ca 是 DEX 服务的 HTTPS 证书，$ip 是运行客户端的服务器IP。</p><p>当服务启动后，您可以5555端口访问客户端，填写 Extra scopes 属性值为 groups，并点击 Login 进行统一认证。 <img src="/docs/assets/quickstart-dex-1.06996542.png" alt="directive syntax graph"></p><p>认证成功后会生成如下的 ID Token：</p><div class="language-Shell"><button class="copy"></button><span class="lang">Shell</span><pre><code><span class="line"><span style="color:#A6ACCD;">eyJhbGciOiJSUzI1NiIsImtpZCI6IjA2OGUyODFmN2FkYTk2NjNmMWI0MTc0NGFhYTUzZDRmYjk0N2Q1YjMifQ.eyJpc3MiOiJodHRwczovL2RleC5ibHV6aW4uaW86OTA4MCIsInN1YiI6IkNnSXhNaElHWjJsMGJHRmkiLCJhdWQiOiJwbGF0Zm9ybSIsImV4cCI6MTY4MDg3Mjc2MiwiaWF0IjoxNjgwNzg2MzYyLCJhdF9oYXNoIjoiWTNNbnRHLTE3SERaWjNVb0hiNWdmUSIsImNfaGFzaCI6IlBGUXNEM1hPSkhNZ1B3RW1LNXl5bEEiLCJlbWFpbCI6ImxpdWp1bmhvbmdAdmlzcHJhY3RpY2UuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImdyb3VwcyI6WyJ5dW50aSIsIm5hdXRlcy1sYWJzIiwidGVrdG9uY2QiLCJkZXYtdGVuYW50IiwieXVudGkvc3ViZ3JvdXAiLCJ5dW50aS9zdWJncm91cC9zdWJzdWJncm91cCJdLCJuYW1lIjoibGl1anVuaG9uZyIsInByZWZlcnJlZF91c2VybmFtZSI6ImxpdWp1bmhvbmcifQ.AYiLwJMcVaJdVdF-j_RZnHCPpg1psF3CJlzlBzvBYcuI_t7slgRaumRmGJEYXHYn2QFxjEZCNnBiOpJDDJoitVTxi1qoZ2nNoxhB3Wtxc1MoqkiPR5wy49yHw5roTnqIuEBy5BMpN_embxB9vK1bwxf414PsYKm1Dhbj8dynpURjpTsLrN5k7zVC7RQxVvglNX4cgYEucvSLqMEdtHNlmtnRsl6DJuItxC0MYwXlp4C9FNWswUjSpargdX4wgqfYy91l66GiI2Xj_zdba0NHLcPean-nmBMObLNhxex4hj8IVcGyiEu9in87y8eisrCBoLEWP9SJ_ZxWiOPoTFr54A</span></span>\n<span class="line"></span></code></pre></div><p>您可以使用这个 ID Token 替换 Kubeconfig 中的认证信息：</p><div class="language-yaml"><button class="copy"></button><span class="lang">yaml</span><pre><code><span class="line"><span style="color:#676E95;"># 将 ID-Token 替换 kubeconfig 文件中的 users 的配置</span></span>\n<span class="line"><span style="color:#F07178;">apiVersion</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">v1</span></span>\n<span class="line"><span style="color:#F07178;">clusters</span><span style="color:#89DDFF;">:</span></span>\n<span class="line"><span style="color:#FFCB6B;">...</span><span style="color:#F78C6C;">...</span></span>\n<span class="line"><span style="color:#F07178;">kind</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Config</span></span>\n<span class="line"><span style="color:#F07178;">preferences</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>\n<span class="line"><span style="color:#F07178;">users</span><span style="color:#89DDFF;">:</span></span>\n<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">user</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">user</span><span style="color:#89DDFF;">:</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">token</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">$ID-Token</span></span>\n<span class="line"></span></code></pre></div><p>如果您的运行时集群是一个虚拟集群，可以通过下面的命令行获取 Kubeconfig 文件。</p><div class="language-Shell"><button class="copy"></button><span class="lang">Shell</span><pre><code><span class="line"><span style="color:#676E95;"># 使用虚拟集群名称替换 $VCLUSTER 变量</span></span>\n<span class="line"><span style="color:#A6ACCD;">kubectl get secret vc-</span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">VCLUSTER-vcluster -n </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">VCLUSTER --template={{.data.config}} </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> base64 -d</span></span>\n<span class="line"></span></code></pre></div><p>应用 Kubeconfig 文件后，您可以通过 Kubectl 命令行查看与部署运行时相同名称的 Namespace 中的资源，您拥有该 Namespace 下所有资源的管理权限。</p><div class="language-Shell"><button class="copy"></button><span class="lang">Shell</span><pre><code><span class="line"><span style="color:#676E95;"># 应用 Kubeconfig</span></span>\n<span class="line"><span style="color:#C792EA;">export</span><span style="color:#A6ACCD;"> KUBECONFIG=/opt/vcluster/kubeconfig-dex.yaml</span></span>\n<span class="line"><span style="color:#676E95;"># 使用 kubectl 命令行管理命名空间下的资源，以下命令行仅为示例</span></span>\n<span class="line"><span style="color:#A6ACCD;">kubectl get deployment -n deployment-runtime-1</span></span>\n<span class="line"><span style="color:#A6ACCD;">kubectl delete deployment deployment-test -n deployment-runtime-1</span></span>\n<span class="line"></span></code></pre></div>',21)];const c=s(p,[["render",function(s,l,e,p,c,t){return a(),n("div",null,o)}]]);export{e as __pageData,c as default};
