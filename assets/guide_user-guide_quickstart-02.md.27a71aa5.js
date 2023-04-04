import{_ as a,o as e,c as s,a as l}from"./app.bb98a4ab.js";const n=JSON.parse('{"title":"销毁部署运行时环境","description":"","frontmatter":{"outline":"deep"},"headers":[{"level":2,"title":"准备前置条件","slug":"准备前置条件","link":"#准备前置条件","children":[]},{"level":2,"title":"删除产品配置清单","slug":"删除产品配置清单","link":"#删除产品配置清单","children":[]},{"level":2,"title":"销毁部署集群","slug":"销毁部署集群","link":"#销毁部署集群","children":[]},{"level":2,"title":"销毁租户管理集群","slug":"销毁租户管理集群","link":"#销毁租户管理集群","children":[]}],"relativePath":"guide/user-guide/quickstart-02.md"}'),r={name:"guide/user-guide/quickstart-02.md"},t=[l('<h1 id="销毁部署运行时环境" tabindex="-1">销毁部署运行时环境 <a class="header-anchor" href="#销毁部署运行时环境" aria-hidden="true">#</a></h1><p>本文档将描述通过 Nautes CLI 销毁产品的部署运行时环境。包括以下步骤：</p><p><a href="#%E5%87%86%E5%A4%87%E5%89%8D%E7%BD%AE%E6%9D%A1%E4%BB%B6">准备前置条件</a><br><a href="#%E5%88%A0%E9%99%A4%E4%BA%A7%E5%93%81%E9%85%8D%E7%BD%AE%E6%B8%85%E5%8D%95">删除产品配置清单</a><br><a href="#%E9%94%80%E6%AF%81%E9%83%A8%E7%BD%B2%E9%9B%86%E7%BE%A4">销毁部署集群</a><br><a href="#%E9%94%80%E6%AF%81%E7%A7%9F%E6%88%B7%E7%AE%A1%E7%90%86%E9%9B%86%E7%BE%A4">销毁租户管理集群</a></p><h2 id="准备前置条件" tabindex="-1">准备前置条件 <a class="header-anchor" href="#准备前置条件" aria-hidden="true">#</a></h2><p>在开始本节之前，请确保您已阅读 <a href="./user-guide-00.html">用户指南的概述</a> 章节，了解 Nautes 的主流程和相关术语。此外，请确保已经通过 Nautes 生成产品的部署运行时环境。</p><h2 id="删除产品配置清单" tabindex="-1">删除产品配置清单 <a class="header-anchor" href="#删除产品配置清单" aria-hidden="true">#</a></h2><p>通过 Nautes CLI 可以自动删除产品配置清单，包括部署运行时、代码库、项目、环境、产品。</p><ol><li><p>克隆存储产品配置库模板的代码库，批量替换资源的参数值，详情参考 <a href="./quickstart-01.html">从零安装部署运行时环境</a>。</p></li><li><p>将 [nautes.exe] 文件保存在 Windows 操作系统的某个目录下，然后执行以下命令。执行成功后，Nautes 将自动删除产品配置清单，并销毁产品的部署运行时环境。</p></li></ol><div class="language-cmd"><button class="copy"></button><span class="lang">cmd</span><pre><code><span class="line"><span style="color:#A6ACCD;">nautes </span><span style="color:#82AAFF;">remove</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">f examples/demo.yaml </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">t </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">gitlab</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">access</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">token </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">s </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">api</span><span style="color:#89DDFF;">-</span><span style="color:#FFCB6B;">server</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">address</span></span>\n<span class="line"></span></code></pre></div><p>其中，&quot;examples/demo.yaml&quot;是存储产品配置库模板的代码库的相对路径，$gitlab-access-token 是您的 GitLab 访问令牌，$api-server-address 是 Nautes API 的访问地址。</p><h2 id="销毁部署集群" tabindex="-1">销毁部署集群 <a class="header-anchor" href="#销毁部署集群" aria-hidden="true">#</a></h2><p>待补充。</p><h2 id="销毁租户管理集群" tabindex="-1">销毁租户管理集群 <a class="header-anchor" href="#销毁租户管理集群" aria-hidden="true">#</a></h2><p>待补充。</p>',14)];const p=a(r,[["render",function(a,l,n,r,p,o){return e(),s("div",null,t)}]]);export{n as __pageData,p as default};
