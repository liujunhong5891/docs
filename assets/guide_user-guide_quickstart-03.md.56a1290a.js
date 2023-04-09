import{_ as a,o as e,c as s,a as l}from"./app.0e8f636f.js";const t=JSON.parse('{"title":"安装部署","description":"","frontmatter":{"outline":"deep"},"headers":[{"level":2,"title":"准备环境","slug":"准备环境","link":"#准备环境","children":[]},{"level":2,"title":"执行部署","slug":"执行部署","link":"#执行部署","children":[]},{"level":2,"title":"查看部署结果","slug":"查看部署结果","link":"#查看部署结果","children":[]},{"level":2,"title":"销毁环境","slug":"销毁环境","link":"#销毁环境","children":[]}],"relativePath":"guide/user-guide/quickstart-03.md"}'),n={name:"guide/user-guide/quickstart-03.md"},i=[l('<h1 id="安装部署" tabindex="-1">安装部署 <a class="header-anchor" href="#安装部署" aria-hidden="true">#</a></h1><p>Nautes 支持基于公有云、私有云、主机、及 Kubernets 集群进行部署，下文以阿里云为例描述在公有云部署 Nautes 的过程。</p><h2 id="准备环境" tabindex="-1">准备环境 <a class="header-anchor" href="#准备环境" aria-hidden="true">#</a></h2><ul><li>部署机：AMD64架构的 Linux 服务器，需要预先安装 Docker、Git、Bash，并确保 /opt/nautes 目录没有被占用。</li><li>公有云密钥：一个阿里云账号的访问密钥。详情参考 <a href="https://help.aliyun.com/document_detail/116401.html" target="_blank" rel="noreferrer">创建 AccessKey</a>。</li></ul><blockquote><p>由于部署程序默认是采用按量计费模式申请云资源，受阿里云的计费规则限制，请确保上述阿里云账号的余额大于100元人民币，否则部署程序无法调用阿里云的API申请资源。</p></blockquote><h2 id="执行部署" tabindex="-1">执行部署 <a class="header-anchor" href="#执行部署" aria-hidden="true">#</a></h2><ol><li>在部署机上克隆安装程序的项目：</li></ol><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">git clone https://github.com/nautes-labs/installer.git</span></span>\n<span class="line"></span></code></pre></div><ol start="2"><li>修改项目根目录下的 vars.yaml 文件，其中 access_key 和 secret_key 必须填写为阿里云账号的 AccessKey，其他变量可采用默认值。</li><li>执行 <code>start.sh</code> 脚本开始部署：</li></ol><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">sh start.sh</span></span>\n<span class="line"></span></code></pre></div><blockquote><p>由于需要部署的组件较多，整个部署过程预计耗时30~40分钟，部署成功后，您可以在在 /opt/nautes 目录下找到部署后的组件信息。如果部署失败，您可以通过日志文件 /opt/nautes/out/log 排查问题。</p></blockquote><h2 id="查看部署结果" tabindex="-1">查看部署结果 <a class="header-anchor" href="#查看部署结果" aria-hidden="true">#</a></h2><p>/opt/nautes/management 是租户配置库的本地副本。</p><p>/opt/nautes/terraform 是 terraform 的状态文件，记录了部署程序在阿里云上申请的资源清单。</p><p>/opt/nautes 中存储了已部署组件的相关信息，包含多个子目录：</p><ul><li>argocd：ArgoCD 的管理员密码。</li><li>gitlab：GitLab 的管理员密码，以及部署过程中所生成的租户配置库、访问密钥等信息。</li><li>hosts：云服务器的 IP 地址和访问密钥。</li><li>kubernetes：租户管理集群的 kubeconfig，以及 dex 的客户端密钥。</li><li>pki：访问组件需要使用的证书和签发证书的 CA。</li><li>vault：Vault 的 unseal key 和 root token。</li><li>service：租户管理集群、Dex、ArgoCD、Vault、GitLab、Nautes API Server 的访问地址。</li></ul><h2 id="销毁环境" tabindex="-1">销毁环境 <a class="header-anchor" href="#销毁环境" aria-hidden="true">#</a></h2><blockquote><p>请确保已成功执行部署，部署机上存在 /opt/nautes 目录，且 nautes-installer 容器在运行中。</p><p>销毁程序将删除所有从云服务中申请的资源，暂不支持单独对组件执行卸载。</p></blockquote><ol><li>在部署机上克隆安装程序的项目：</li></ol><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">git clone https://github.com/nautes-labs/installer.git</span></span>\n<span class="line"></span></code></pre></div><ol start="2"><li>修改项目根目录下的 vars.yaml 文件，填写 access_key 和 secret_key。</li><li>执行 <code>destroy.sh</code> 脚本开始销毁环境：</li></ol><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">sh destroy.sh</span></span>\n<span class="line"></span></code></pre></div>',22)];const o=a(n,[["render",function(a,l,t,n,o,r){return e(),s("div",null,i)}]]);export{t as __pageData,o as default};
