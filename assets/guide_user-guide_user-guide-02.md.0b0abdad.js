import{_ as s,o as a,c as n,a as e}from"./app.bb98a4ab.js";const l=JSON.parse('{"title":"维护项目","description":"","frontmatter":{"outline":"deep"},"headers":[{"level":2,"title":"简介","slug":"简介","link":"#简介","children":[]},{"level":2,"title":"维护项目（API 接口）","slug":"维护项目（api-接口）","link":"#维护项目（api-接口）","children":[{"level":3,"title":"创建项目","slug":"创建项目","link":"#创建项目","children":[]},{"level":3,"title":"更新项目","slug":"更新项目","link":"#更新项目","children":[]},{"level":3,"title":"删除项目","slug":"删除项目","link":"#删除项目","children":[]},{"level":3,"title":"查询项目","slug":"查询项目","link":"#查询项目","children":[]}]},{"level":2,"title":"强制提交代码库（API 接口）","slug":"强制提交代码库（api-接口）","link":"#强制提交代码库（api-接口）","children":[]}],"relativePath":"guide/user-guide/user-guide-02.md"}'),p={name:"guide/user-guide/user-guide-02.md"},o=[e('<h1 id="维护项目" tabindex="-1">维护项目 <a class="header-anchor" href="#维护项目" aria-hidden="true">#</a></h1><h2 id="简介" tabindex="-1">简介 <a class="header-anchor" href="#简介" aria-hidden="true">#</a></h2><p>在开始本节之前，请确保您已阅读 <a href="./user-guide-00.html">用户指南的概述</a> 章节，了解 Nautes 的主流程和相关术语；并且已经创建了至少一个产品，详情参考 <a href="./user-guide-01.html">维护产品</a>。</p><p>由于一个IT系统由多个微服务组成，因此，一个产品可以包含多个项目。此外，维护项目的用户即可以是产品成员，也可以是项目成员。</p><p>下面将详细介绍如何维护项目以及相关规则。维护项目有多种方式，包括命令行、API 接口等，下文将描述通过 API 接口的方式维护项目。</p><h2 id="维护项目（api-接口）" tabindex="-1">维护项目（API 接口） <a class="header-anchor" href="#维护项目（api-接口）" aria-hidden="true">#</a></h2><h3 id="创建项目" tabindex="-1">创建项目 <a class="header-anchor" href="#创建项目" aria-hidden="true">#</a></h3><p>产品创建成功之后，使用项目表示产品的微服务组件。步骤如下：</p><ol><li><p>访问 Swagger UI【补充访问地址】，选择右上角 select a definition 下拉框中的 api.project.v1.Projet；选择 POST 接口，点击 try it out，在 product_name 参数中输入产品名称，在 project_name 参数中输入项目名称，点击 execute，生成 API 请求的代码示例。</p></li><li><p>获取请求 API 的 access token，作为 API 请求的请求头参数。详情参考 <a href="https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html" target="_blank" rel="noreferrer">Personal access tokens</a>。只有产品成员才可以创建特定产品的项目。</p></li><li><p>将前置步骤获取的 access token 作为 API 请求的请求头参数，通过 curl 命令，或者 Postman、JMeter 等工具执行 API 请求以新增项目。更新后的 API 请求的代码示例：</p><div class="language-Shell"><button class="copy"></button><span class="lang">Shell</span><pre><code><span class="line"><span style="color:#89DDFF;"> </span><span style="color:#676E95;"># 实操过程中根据实际情况替换 URL 地址和相关参数； </span></span>\n<span class="line"><span style="color:#A6ACCD;"> curl -X </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">POST</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;">     </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">HTTP://xxx.xxx.xxx.xxx:xxxxx/api/v1/products/product-demo/projects/project-demo</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;">     -H </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">accept: application/json</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;">     -H </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Content-Type: application/json</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;">     -H </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Authorization: Bearer xxxxxxxxxxxxxxxxxxxxxxxxxx</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;">     -d </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">{</span></span>\n<span class="line"><span style="color:#C3E88D;">     &quot;language&quot;: &quot;Go&quot;</span></span>\n<span class="line"><span style="color:#C3E88D;">     }</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span></code></pre></div><p>请求成功后，将在产品对应的 default.project 代码库中生成关联产品的项目资源文件。</p><div class="language-yaml"><button class="copy"></button><span class="lang">yaml</span><pre><code><span class="line"><span style="color:#F07178;">apiVersion</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nautes.resource.nautes.io/v1alpha1</span></span>\n<span class="line"><span style="color:#F07178;">kind</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Project</span></span>\n<span class="line"><span style="color:#F07178;">metadata</span><span style="color:#89DDFF;">:</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">project-demo</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">namespace</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">my-namespace</span></span>\n<span class="line"><span style="color:#F07178;">spec</span><span style="color:#89DDFF;">:</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">language</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Go</span><span style="color:#89DDFF;">&quot;</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">product</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">product-demo</span><span style="color:#89DDFF;">&quot;</span></span>\n<span class="line"></span></code></pre></div></li></ol><h3 id="更新项目" tabindex="-1">更新项目 <a class="header-anchor" href="#更新项目" aria-hidden="true">#</a></h3><p>项目创建成功后，可以修改项目。详情参考 <a href="#%E5%88%9B%E5%BB%BA%E9%A1%B9%E7%9B%AE">创建项目</a>。只有产品成员才可以更新对应产品的项目资源。<br> 请求成功后，将变更存储在产品对应的 default.project 代码库中的项目资源文件。</p><h3 id="删除项目" tabindex="-1">删除项目 <a class="header-anchor" href="#删除项目" aria-hidden="true">#</a></h3><p>由于项目可能关联多个资源，在删除项目之前，需要先删除关联该项目的所有相关资源，例如代码库等。步骤如下：</p><ol><li>访问 Swagger UI【补充访问地址】，选择右上角 select a definition 下拉框中的 api.project.v1.Projet；选择 DELETE 接口，点击 try it out，在 product_name 参数中输入产品名称，在 project_name 参数中输入项目名称，点击 execute，生成 API 请求的代码示例。详情参考 <a href="#%E5%88%9B%E5%BB%BA%E9%A1%B9%E7%9B%AE">创建项目的步骤1</a> 。</li><li>获取请求 API 的 access token，作为 API 请求的请求头参数。详情参考 <a href="https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html" target="_blank" rel="noreferrer">Personal access tokens</a>。</li><li>将前置步骤获取的 access token 作为 API 请求的请求头参数，通过 curl 命令，或者 Postman、JMeter 等工具执行 API 来删除项目。请求成功后，项目的资源文件将被删除。</li></ol><h3 id="查询项目" tabindex="-1">查询项目 <a class="header-anchor" href="#查询项目" aria-hidden="true">#</a></h3><p>查询项目有两个 API 接口，分别是查询项目列表、查询项目详情。<br> 查询项目列表的步骤如下：</p><ol><li>访问 Swagger UI【补充访问地址】，选择右上角 select a definition 下拉框中的 api.project.v1.Projet；选择相对路径是 /api/v1/products/{products_name}/projects 的 GET 接口，点击 try it out，在 product_name 参数中输入产品名称，点击 execute，生成 API 请求的代码示例。详情参考 <a href="#%E5%88%9B%E5%BB%BA%E9%A1%B9%E7%9B%AE">创建项目的步骤1</a>。</li><li>获取请求 API 的 access token，作为 API 请求的请求头参数。详情参考 <a href="https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html" target="_blank" rel="noreferrer">Personal access tokens</a>。</li><li>将前置步骤获取的 access token 作为 API 请求的请求头参数，通过 curl 命令，或者 Postman、JMeter 等工具执行 API 以查询项目。请求成功后，如果用户是某些项目的成员，将返回项目信息。</li></ol><p>查询项目详情的步骤如下：</p><ol><li>访问 Swagger UI【补充访问地址】，选择右上角 select a definition 下拉框中的 api.project.v1.Projet；选择相对路径是 /api/v1/products/{products_name}/projects/{project_name} 的 GET 接口，点击 try it out，在 product_name 参数中输入产品名称，在 project_name 参数中输入项目名称，点击 execute，生成 API 请求的代码示例。详情参考 <a href="#%E5%88%9B%E5%BB%BA%E9%A1%B9%E7%9B%AE">创建项目的步骤1</a> 。</li><li>其余步骤与“查询项目列表”相同，不再赘述。</li></ol><h2 id="强制提交代码库（api-接口）" tabindex="-1">强制提交代码库（API 接口） <a class="header-anchor" href="#强制提交代码库（api-接口）" aria-hidden="true">#</a></h2><p>详情规则参见 <a href="./user-guide-03.html#强制提交代码库api-接口">强制提交资源文件（API 接口）</a>。</p><div class="language-Shell"><button class="copy"></button><span class="lang">Shell</span><pre><code><span class="line"><span style="color:#676E95;"># 以下示例为创建项目时，当产品中存在不合规的environment时，启用 insecure_skip_check 参数以强制提交项目的资源文件</span></span>\n<span class="line"><span style="color:#A6ACCD;">curl -X </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">POST</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">HTTP://xxx.xxx.xxx.xxx:xxxxx/api/v1/products/product-demo/projects/project-demo?insecure_skip_check=true</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;">  -H </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">accept: application/json</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;">  -H </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Content-Type: application/json</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;">  -d </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">{</span></span>\n<span class="line"><span style="color:#C3E88D;">  &quot;language&quot;: &quot;Go&quot;</span></span>\n<span class="line"><span style="color:#C3E88D;">}</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span></code></pre></div>',22)];const t=s(p,[["render",function(s,e,l,p,t,r){return a(),n("div",null,o)}]]);export{l as __pageData,t as default};
