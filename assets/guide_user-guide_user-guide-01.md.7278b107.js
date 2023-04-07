import{_ as a,o as s,c as e,a as n}from"./app.e8b008f9.js";const l=JSON.parse('{"title":"维护产品","description":"","frontmatter":{"outline":"deep"},"headers":[{"level":2,"title":"维护产品（API 接口）","slug":"维护产品（api-接口）","link":"#维护产品（api-接口）","children":[{"level":3,"title":"创建产品","slug":"创建产品","link":"#创建产品","children":[]},{"level":3,"title":"删除产品","slug":"删除产品","link":"#删除产品","children":[]},{"level":3,"title":"查询产品","slug":"查询产品","link":"#查询产品","children":[]}]}],"relativePath":"guide/user-guide/user-guide-01.md"}'),t={name:"guide/user-guide/user-guide-01.md"},o=[n('<h1 id="维护产品" tabindex="-1">维护产品 <a class="header-anchor" href="#维护产品" aria-hidden="true">#</a></h1><p>在开始本节之前，请确保您已阅读 <a href="./user-guide-00.html">概述</a> 章节，了解创建运行时环境的主流程和相关术语。</p><p>在微服务架构中，一个IT系统由多个微服务组成，每个微服务有独立的代码库。在Nautes中，“产品”表示一个IT系统，“项目”表示一个微服务。因此，一个产品可以包含多个项目，每个项目有独立的代码库。 实施CI/CD活动时，所有操作都基于产品和项目进行，这意味着需要维护与之相关的信息以供实施 CI/CD 活动使用，并确保这些信息与IT系统的微服务架构保持一致。此外，用户可以是产品成员或者项目成员，用户所属的产品或项目将决定其拥有哪些权限和角色。</p><p>下面将详细介绍如何维护产品以及相关规则。维护产品有多种方式，包括命令行、API 接口等，下文将描述通过 API 接口的方式维护产品。</p><h2 id="维护产品（api-接口）" tabindex="-1">维护产品（API 接口） <a class="header-anchor" href="#维护产品（api-接口）" aria-hidden="true">#</a></h2><h3 id="创建产品" tabindex="-1">创建产品 <a class="header-anchor" href="#创建产品" aria-hidden="true">#</a></h3><p>在开展 CI/CD 活动之前，需要先创建一个新的产品。步骤如下：</p><ol><li>访问 <a href="./quickstart-03.html">Swagger UI</a>，选择右上角 select a definition 下拉框中的 api.product.v1.Product；选择 POST 接口，点击 try it out，在 product_name 参数中输入产品名称，点击 execute，生成 API 请求的代码示例。</li><li>访问 <a href="./quickstart-03.html">GitLab Web UI</a>，获取请求 API 的 access token，作为 API 请求的请求头参数。详情参考 <a href="https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html" target="_blank" rel="noreferrer">Personal access tokens</a>。</li><li>将前置步骤获取的 access token 作为 API 请求的请求头参数，通过 curl 命令，或者 Postman、JMeter 等工具执行 API 请求以新增产品。更新后的 API 请求的代码示例：<div class="language-Shell"><button class="copy"></button><span class="lang">Shell</span><pre><code><span class="line"><span style="color:#89DDFF;"> </span><span style="color:#676E95;"># 实操过程中根据实际情况替换 URL 地址和相关参数</span></span>\n<span class="line"><span style="color:#89DDFF;"> </span><span style="color:#676E95;"># “git.gitlab.name” 是产品名称，“git.gitlab.path” 是产品路径，“git.gitlab.visibility”是产品的可见性，比如 private 或者 public  </span></span>\n<span class="line"><span style="color:#A6ACCD;"> curl -X </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">POST</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">HTTP://xxx.xxx.xxx.xxx:xxxxx/api/v1/products/product-demo</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;"> -H </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">accept: application/json</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;"> -H </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Content-Type: application/json</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;"> -H </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Authorization: Bearer xxxxxxxxxxxxxxxxxxxxxxxxxx</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;"> -d </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">{</span></span>\n<span class="line"><span style="color:#C3E88D;"> &quot;git&quot;: {</span></span>\n<span class="line"><span style="color:#C3E88D;">     &quot;gitlab&quot;: {</span></span>\n<span class="line"><span style="color:#C3E88D;">         &quot;name&quot;: &quot;product-demo&quot;,</span></span>\n<span class="line"><span style="color:#C3E88D;">         &quot;path&quot;: &quot;product-demo&quot;,</span></span>\n<span class="line"><span style="color:#C3E88D;">         &quot;visibility&quot;: &quot;private&quot;,</span></span>\n<span class="line"><span style="color:#C3E88D;">         &quot;description&quot;: &quot;product-demo&quot;</span></span>\n<span class="line"><span style="color:#C3E88D;">         }</span></span>\n<span class="line"><span style="color:#C3E88D;">     }</span></span>\n<span class="line"><span style="color:#C3E88D;"> }</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span></code></pre></div>请求成功后，将生成一个产品，同时在 GitLab 中根据产品参数生成对应的 group、以及这个 group 中名称为 default.project 的代码库，一个产品有且只有一个 default.project 代码库。default.project 代码库用于存储产品的配置清单，系统将根据这份清单自动生成产品的部署运行时环境。</li></ol><h3 id="删除产品" tabindex="-1">删除产品 <a class="header-anchor" href="#删除产品" aria-hidden="true">#</a></h3><p>由于产品可能关联多个资源，在删除产品之前，需要先删除与该产品相关的所有资源，例如项目、代码库和环境等。通常这种情况发生在产品生命周期结束之后，产品只会剩下一个名称为 default.project 的空代码库。步骤如下：</p><ol><li>访问 <a href="./quickstart-03.html">Swagger UI</a>，选择右上角 select a definition 下拉框中的 api.product.v1.Product；选择 DELETE 接口，点击 try it out，在 product_name 参数中输入产品名称，点击 execute，生成 API 请求的代码示例。详情参考 <a href="#%E5%88%9B%E5%BB%BA%E4%BA%A7%E5%93%81">创建产品的步骤1</a> 。</li><li>获取请求 API 的 access token，作为 API 请求的请求头参数。详情参考 <a href="#%E5%88%9B%E5%BB%BA%E4%BA%A7%E5%93%81">创建产品的步骤2</a>。只有拥有产品的 owner 角色权限或者是 GitLab 管理员权限的用户账号可以删除产品。</li><li>将前置步骤获取的 access token 作为 API 请求的请求头参数，通过 curl 命令，或者 Postman、JMeter 等工具执行 API 来删除产品。请求成功后，该产品及其相关资源将被删除，包括 GitLab 中对应的 group 和名称为 default.project 的代码库。</li></ol><h3 id="查询产品" tabindex="-1">查询产品 <a class="header-anchor" href="#查询产品" aria-hidden="true">#</a></h3><p>查询产品有两个 API 接口，分别是查询产品列表、查询产品详情，用于查询用户被授权的产品信息。<br> 查询产品列表的步骤如下：</p><ol><li>访问 <a href="./quickstart-03.html">Swagger UI</a>，选择右上角 select a definition 下拉框中的 api.product.v1.Product；选择相对路径是 /api/v1/products 的 GET 接口，点击 try it out，点击 execute，生成 API 请求的代码示例。详情参考 <a href="#%E5%88%9B%E5%BB%BA%E4%BA%A7%E5%93%81">创建产品的步骤1</a>。</li><li>获取请求 API 的 access token，作为 API 请求的请求头参数。详情参考 <a href="#%E5%88%9B%E5%BB%BA%E4%BA%A7%E5%93%81">创建产品的步骤2</a>。只有当用户是产品成员时，才能查询到相关产品信息。</li><li>将前置步骤获取的 access token 作为 API 请求的请求头参数，通过 curl 命令，或者 Postman、JMeter 等工具执行 API 以查询产品。请求成功后，如果用户是某些产品的成员，将返回产品信息。</li></ol><p>查询产品详情的步骤如下：</p><ol><li>访问 <a href="./quickstart-03.html">Swagger UI</a>，选择右上角 select a definition 下拉框中的 api.product.v1.Product；选择相对路径是 /api/v1/products/{productName} 的 GET 接口，点击 try it out，在 product_name 参数中输入产品名称，点击 execute，生成 API 请求的代码示例。详情参考 <a href="#%E5%88%9B%E5%BB%BA%E4%BA%A7%E5%93%81">创建产品的步骤1</a> 。</li><li>其余步骤与“查询产品列表”相同，不再赘述。</li></ol>',16)];const p=a(t,[["render",function(a,n,l,t,p,r){return s(),e("div",null,o)}]]);export{l as __pageData,p as default};
