import{_ as s,c as a,e as n,a as l,b as p,d as e,o,r as t}from"./app.844d8816.js";const r=JSON.parse('{"title":"注册和销毁集群","description":"","frontmatter":{"outline":"deep"},"headers":[{"level":2,"title":"注册基于物理集群的运行时集群（API）","slug":"注册基于物理集群的运行时集群（api）","link":"#注册基于物理集群的运行时集群（api）","children":[]},{"level":2,"title":"注册基于虚拟集群的运行时集群（API）","slug":"注册基于虚拟集群的运行时集群（api）","link":"#注册基于虚拟集群的运行时集群（api）","children":[]},{"level":2,"title":"注册基于物理集群的运行时集群（命令行）","slug":"注册基于物理集群的运行时集群（命令行）","link":"#注册基于物理集群的运行时集群（命令行）","children":[]},{"level":2,"title":"注册基于虚拟集群的运行时集群（命令行）","slug":"注册基于虚拟集群的运行时集群（命令行）","link":"#注册基于虚拟集群的运行时集群（命令行）","children":[]},{"level":2,"title":"销毁基于物理集群的运行时集群（API）","slug":"销毁基于物理集群的运行时集群（api）","link":"#销毁基于物理集群的运行时集群（api）","children":[]},{"level":2,"title":"销毁基于虚拟集群的运行时集群（API）","slug":"销毁基于虚拟集群的运行时集群（api）","link":"#销毁基于虚拟集群的运行时集群（api）","children":[]},{"level":2,"title":"销毁基于物理集群的运行时集群（命令行）","slug":"销毁基于物理集群的运行时集群（命令行）","link":"#销毁基于物理集群的运行时集群（命令行）","children":[]},{"level":2,"title":"销毁基于虚拟集群的运行时集群（命令行）","slug":"销毁基于虚拟集群的运行时集群（命令行）","link":"#销毁基于虚拟集群的运行时集群（命令行）","children":[]}],"relativePath":"guide/user-guide/user-guide-07.md"}'),c={name:"guide/user-guide/user-guide-07.md"},i=l("h1",{id:"注册和销毁集群",tabindex:"-1"},[p("注册和销毁集群 "),l("a",{class:"header-anchor",href:"#注册和销毁集群","aria-hidden":"true"},"#")],-1),u=e('<p>在开始本节之前，请确保您已阅读 <a href="./user-guide-00.html">创建运行时环境</a> 章节，了解创建运行时环境的主体流程和相关术语。同时，确保 Nautes 安装部署成功，详情参见 <a href="./quickstart-03.html">安装部署</a>。</p><p>下文将详细介绍如何注册和销毁基于物理集群的运行时集群、注册和销毁基于虚拟集群的运行时集群。支持通过 API 接口和命令行的方式来注册、销毁集群。</p><h2 id="注册基于物理集群的运行时集群（api）" tabindex="-1">注册基于物理集群的运行时集群（API） <a class="header-anchor" href="#注册基于物理集群的运行时集群（api）" aria-hidden="true">#</a></h2><ol><li>访问 <a href="./quickstart-03.html#查看部署结果">Swagger UI</a>，选择右上角 select a definition 下拉框中的 api.cluster.v1.Cluster。选择 POST 接口，点击 try it out，在 cluster_name 参数中输入集群名称，点击 execute，将生成 API 请求的代码示例。</li><li>访问 <a href="./quickstart-03.html#查看部署结果">GitLab UI</a>，获取请求 API 的 access token，作为 API 的请求头参数。详情参考 <a href="https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html" target="_blank" rel="noreferrer">Personal access tokens</a>。</li><li>将前置步骤获取的 access token 作为 API 的请求头参数，通过 curl 命令，或者 Postman、JMeter 等工具执行 API 请求以注册基于物理集群的运行时集群。请求体的参数注释，详情参考 <a href="https://gitlab.bluzin.io/nautes-labs/cli.git" target="_blank" rel="noreferrer">注册集群模板</a> 代码库中“examples/demo-cluster-physical-worker.yaml”的文件注释。更新后的 API 请求的代码示例：<div class="language-Shell"><button class="copy"></button><span class="lang">Shell</span><pre><code><span class="line"><span style="color:#89DDFF;"> </span><span style="color:#676E95;"># 实操过程中根据实际情况替换 URL 地址和相关参数</span></span>\n<span class="line"><span style="color:#A6ACCD;"> curl -X </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">POST</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">HTTP://10.204.118.221:32159/api/v1/clusters/cluster-physical-demo</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;"> -H </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">accept: application/json</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;"> -H </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Content-Type: application/json</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;"> -H </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Authorization: Bearer xxxxxxxxxxxxxxxxxxxxxxxxxx</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;"> -d </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">{</span></span>\n<span class="line"><span style="color:#C3E88D;">   &quot;api_server&quot;: &quot;https://xxx.xxx.xxx.xxx:xxxxx&quot;,</span></span>\n<span class="line"><span style="color:#C3E88D;">   &quot;cluster_kind&quot;: &quot;kubernetes&quot;,</span></span>\n<span class="line"><span style="color:#C3E88D;">   &quot;cluster_type&quot;: &quot;physical&quot;,</span></span>\n<span class="line"><span style="color:#C3E88D;">   &quot;usage&quot;: &quot;worker&quot;,</span></span>\n<span class="line"><span style="color:#C3E88D;">   &quot;argocd_host&quot;: &quot;https://argocd.cluster-demo.xxx.xxx.xxx.xxx.nip.io&quot;,</span></span>\n<span class="line"><span style="color:#C3E88D;">   &quot;traefik&quot;: {</span></span>\n<span class="line"><span style="color:#C3E88D;">     &quot;http_node_port&quot;: &quot;xxxxx&quot;,</span></span>\n<span class="line"><span style="color:#C3E88D;">     &quot;https_node_port&quot;: &quot;xxxxx&quot;</span></span>\n<span class="line"><span style="color:#C3E88D;">   },</span></span>\n<span class="line"><span style="color:#C3E88D;">   &quot;kubeconfig&quot;: |</span></span>\n<span class="line"><span style="color:#C3E88D;">     apiVersion: v1</span></span>\n<span class="line"><span style="color:#C3E88D;">       clusters:</span></span>\n<span class="line"><span style="color:#C3E88D;">       - cluster:</span></span>\n<span class="line"><span style="color:#C3E88D;">           certificate-authority-data:</span></span>\n<span class="line"><span style="color:#C3E88D;">     ...</span></span>\n<span class="line"><span style="color:#C3E88D;"> }</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">   </span></span>\n<span class="line"></span></code></pre></div></li></ol><p>请求成功后，将向租户管理集群注册指定参数的物理集群作为部署运行时集群，并在物理集群中安装ArgoCD、ArgoRollouts、ExternalSecret、HNC、Vault-agent等组件。</p><h2 id="注册基于虚拟集群的运行时集群（api）" tabindex="-1">注册基于虚拟集群的运行时集群（API） <a class="header-anchor" href="#注册基于虚拟集群的运行时集群（api）" aria-hidden="true">#</a></h2><p>注册基于虚拟集群的运行时集群分为两步：注册虚拟集群所属的宿主集群、注册虚拟集群。</p><ol><li>通过 API 注册宿主集群，步骤与 <a href="#%E6%B3%A8%E5%86%8C%E5%9F%BA%E4%BA%8E%E7%89%A9%E7%90%86%E9%9B%86%E7%BE%A4%E7%9A%84%E8%BF%90%E8%A1%8C%E6%97%B6%E9%9B%86%E7%BE%A4api">注册基于物理集群的运行时集群（API）</a>类似，请求体不同。请求体的参数注释，详情参考 <a href="https://gitlab.bluzin.io/nautes-labs/cli.git" target="_blank" rel="noreferrer">注册集群模板</a> 代码库中“examples/demo-cluster-host.yaml”的文件注释。</li></ol><div class="language-Shell"><button class="copy"></button><span class="lang">Shell</span><pre><code><span class="line"><span style="color:#A6ACCD;">curl -X </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">POST</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">HTTP://10.204.118.221:32159/api/v1/clusters/cluster-host-demo</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;">  -H </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">accept: application/json</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;">  -H </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Content-Type: application/json</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;">  -H </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Authorization: Bearer xxxxxxxxxxxxxxxxxxxxxxxxxx</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;">  -d </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">{</span></span>\n<span class="line"><span style="color:#C3E88D;">    &quot;api_server&quot;: &quot;https://xxx.xxx.xxx.xxx:xxxxx&quot;,</span></span>\n<span class="line"><span style="color:#C3E88D;">    &quot;cluster_kind&quot;: &quot;kubernetes&quot;,</span></span>\n<span class="line"><span style="color:#C3E88D;">    &quot;cluster_type&quot;: &quot;physical&quot;,</span></span>\n<span class="line"><span style="color:#C3E88D;">    &quot;usage&quot;: &quot;host&quot;,</span></span>\n<span class="line"><span style="color:#C3E88D;">    &quot;traefik&quot;: {</span></span>\n<span class="line"><span style="color:#C3E88D;">      &quot;http_node_port&quot;: &quot;xxxxx&quot;,</span></span>\n<span class="line"><span style="color:#C3E88D;">      &quot;https_node_port&quot;: &quot;xxxxx&quot;</span></span>\n<span class="line"><span style="color:#C3E88D;">    },</span></span>\n<span class="line"><span style="color:#C3E88D;">    &quot;kubeconfig&quot;: |</span></span>\n<span class="line"><span style="color:#C3E88D;">      apiVersion: v1</span></span>\n<span class="line"><span style="color:#C3E88D;">        clusters:</span></span>\n<span class="line"><span style="color:#C3E88D;">        - cluster:</span></span>\n<span class="line"><span style="color:#C3E88D;">            certificate-authority-data:</span></span>\n<span class="line"><span style="color:#C3E88D;">      ...</span></span>\n<span class="line"><span style="color:#C3E88D;">  }</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">   </span></span>\n<span class="line"></span></code></pre></div><p>请求成功后，将向租户管理集群注册指定参数的宿主集群，并向宿主集群中安装 traefik 等组件。</p><ol start="2"><li>通过 API 注册基于虚拟集群的运行时集群，步骤与 <a href="#%E6%B3%A8%E5%86%8C%E5%9F%BA%E4%BA%8E%E7%89%A9%E7%90%86%E9%9B%86%E7%BE%A4%E7%9A%84%E8%BF%90%E8%A1%8C%E6%97%B6%E9%9B%86%E7%BE%A4api">注册基于物理集群的运行时集群（API）</a>类似，请求体不同。请求体的参数注释，详情参考 <a href="https://gitlab.bluzin.io/nautes-labs/cli.git" target="_blank" rel="noreferrer">注册集群模板</a> 代码库中“examples/demo-cluster-virtual-worker.yaml”的文件注释。</li></ol><div class="language-Shell"><button class="copy"></button><span class="lang">Shell</span><pre><code><span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;"># 实操过程中根据实际情况替换 URL 地址和相关参数</span></span>\n<span class="line"><span style="color:#A6ACCD;">  curl -X </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">POST</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">HTTP://10.204.118.221:32159/api/v1/clusters/cluster-virtual-demo</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;">  -H </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">accept: application/json</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;">  -H </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Content-Type: application/json</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;">  -H </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Authorization: Bearer xxxxxxxxxxxxxxxxxxxxxxxxxx</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;">  -d </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">{</span></span>\n<span class="line"><span style="color:#C3E88D;">    &quot;api_server&quot;: &quot;https://xxx.xxx.xxx.xxx:xxxxx&quot;,</span></span>\n<span class="line"><span style="color:#C3E88D;">    &quot;cluster_kind&quot;: &quot;kubernetes&quot;,</span></span>\n<span class="line"><span style="color:#C3E88D;">    &quot;cluster_type&quot;: &quot;virtual&quot;,</span></span>\n<span class="line"><span style="color:#C3E88D;">    &quot;usage&quot;: &quot;worker&quot;,</span></span>\n<span class="line"><span style="color:#C3E88D;">    &quot;hostCluster&quot;: &quot;cluster-host&quot;,</span></span>\n<span class="line"><span style="color:#C3E88D;">    &quot;argocd_host&quot;: &quot;https://argocd.cluster-demo.xxx.xxx.xxx.xxx.nip.io&quot;,</span></span>\n<span class="line"><span style="color:#C3E88D;">    &quot;vcluster&quot;: </span></span>\n<span class="line"><span style="color:#C3E88D;">      {</span></span>\n<span class="line"><span style="color:#C3E88D;">        httpsNodePort: &quot;xxxxx&quot;</span></span>\n<span class="line"><span style="color:#C3E88D;">      }</span></span>\n<span class="line"><span style="color:#C3E88D;">  }</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">   </span></span>\n<span class="line"></span></code></pre></div><p>请求成功后，将向租户管理集群注册指定参数的虚拟集群作为部署运行时集群，并在虚拟集群中安装ArgoCD、ArgoRollouts、ExternalSecret、HNC、Vault-agent等组件。</p><h2 id="注册基于物理集群的运行时集群（命令行）" tabindex="-1">注册基于物理集群的运行时集群（命令行） <a class="header-anchor" href="#注册基于物理集群的运行时集群（命令行）" aria-hidden="true">#</a></h2><p>详情参考 <a href="./quickstart-01.html#注册基于物理集群的运行时集群">注册基于物理集群的运行时集群（命令行）</a>。</p><h2 id="注册基于虚拟集群的运行时集群（命令行）" tabindex="-1">注册基于虚拟集群的运行时集群（命令行） <a class="header-anchor" href="#注册基于虚拟集群的运行时集群（命令行）" aria-hidden="true">#</a></h2><p>详情参考 <a href="./quickstart-01.html#注册基于虚拟集群的运行时集群">注册基于虚拟集群的运行时集群（命令行）</a>。</p><h2 id="销毁基于物理集群的运行时集群（api）" tabindex="-1">销毁基于物理集群的运行时集群（API） <a class="header-anchor" href="#销毁基于物理集群的运行时集群（api）" aria-hidden="true">#</a></h2><p>由于集群可能负载了产品的运行时环境，在销毁集群之前请先销毁产品配置清单，详情参考 <a href="./quickstart-02.html#删除产品配置清单">删除产品配置清单</a>。当基于物理集群的运行时集群注册成功后，可以通过 API 销毁集群。</p><ol><li>访问 <a href="./quickstart-03.html#查看部署结果">Swagger UI</a>，选择右上角 select a definition 下拉框中的 api.cluster.v1.Cluster。选择 DELETE 接口，点击 try it out，在 cluster_name 参数中输入集群名称，点击 execute，生成 API 请求的代码示例。与类似 <a href="#%E6%B3%A8%E5%86%8C%E5%9F%BA%E4%BA%8E%E7%89%A9%E7%90%86%E9%9B%86%E7%BE%A4%E7%9A%84%E8%BF%90%E8%A1%8C%E6%97%B6%E9%9B%86%E7%BE%A4api">注册基于物理集群的运行时集群api</a> 的步骤1类似。</li><li>获取请求 API 的 access token，作为 API 请求的请求头参数。详情参考 <a href="#%E6%B3%A8%E5%86%8C%E5%9F%BA%E4%BA%8E%E7%89%A9%E7%90%86%E9%9B%86%E7%BE%A4%E7%9A%84%E8%BF%90%E8%A1%8C%E6%97%B6%E9%9B%86%E7%BE%A4api">注册基于物理集群的运行时集群api</a> 的步骤2。</li><li>将前置步骤获取的 access token 作为 API 请求的请求头参数，通过 curl 命令，或者 Postman、JMeter 等工具执行 API 来销毁集群。请求成功后，该集群将被销毁。</li></ol><h2 id="销毁基于虚拟集群的运行时集群（api）" tabindex="-1">销毁基于虚拟集群的运行时集群（API） <a class="header-anchor" href="#销毁基于虚拟集群的运行时集群（api）" aria-hidden="true">#</a></h2><p>销毁集群之前请先销毁产品配置清单，详情参考 <a href="./quickstart-02.html#删除产品配置清单">删除产品配置清单</a>。 当基于虚拟集群的运行时集群注册成功后，可以通过 API 销毁集群。与注册虚拟集群的步骤相反，包括两步：销毁虚拟集群、销毁虚拟集群所属的宿主集群。</p><ol><li>通过 API 销毁虚拟集群。步骤与 <a href="#%E9%94%80%E6%AF%81%E5%9F%BA%E4%BA%8E%E7%89%A9%E7%90%86%E9%9B%86%E7%BE%A4%E7%9A%84%E8%BF%90%E8%A1%8C%E6%97%B6%E9%9B%86%E7%BE%A4api">销毁基于物理集群的运行时集群（API）</a>类似，请求体与 <a href="#%E6%B3%A8%E5%86%8C%E5%9F%BA%E4%BA%8E%E8%99%9A%E6%8B%9F%E9%9B%86%E7%BE%A4%E7%9A%84%E8%BF%90%E8%A1%8C%E6%97%B6%E9%9B%86%E7%BE%A4api">注册基于虚拟集群的运行时集群（API）</a>的步骤2相同。</li><li>通过 API 销毁宿主集群。步骤与 <a href="#%E9%94%80%E6%AF%81%E5%9F%BA%E4%BA%8E%E7%89%A9%E7%90%86%E9%9B%86%E7%BE%A4%E7%9A%84%E8%BF%90%E8%A1%8C%E6%97%B6%E9%9B%86%E7%BE%A4api">销毁基于物理集群的运行时集群（API）</a>类似，请求体与<a href="#%E6%B3%A8%E5%86%8C%E5%9F%BA%E4%BA%8E%E8%99%9A%E6%8B%9F%E9%9B%86%E7%BE%A4%E7%9A%84%E8%BF%90%E8%A1%8C%E6%97%B6%E9%9B%86%E7%BE%A4api">注册基于虚拟集群的运行时集群（API）</a>的步骤1相同。 请求成功后，虚拟集群及其宿主集群将被销毁。</li></ol><h2 id="销毁基于物理集群的运行时集群（命令行）" tabindex="-1">销毁基于物理集群的运行时集群（命令行） <a class="header-anchor" href="#销毁基于物理集群的运行时集群（命令行）" aria-hidden="true">#</a></h2><p>详情参考 <a href="./quickstart-02.html#销毁基于物理集群的运行时集群">销毁基于物理集群的运行时集群</a>。</p><h2 id="销毁基于虚拟集群的运行时集群（命令行）" tabindex="-1">销毁基于虚拟集群的运行时集群（命令行） <a class="header-anchor" href="#销毁基于虚拟集群的运行时集群（命令行）" aria-hidden="true">#</a></h2><p>详情参考 <a href="./quickstart-02.html#销毁基于虚拟集群的运行时集群">销毁基于虚拟集群的运行时集群</a>。</p>',27);const E=s(c,[["render",function(s,l,p,e,r,c){const E=t("VueJobs");return o(),a("div",null,[i,n(E),u])}]]);export{r as __pageData,E as default};
