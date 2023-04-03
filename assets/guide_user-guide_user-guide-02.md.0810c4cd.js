import{_ as s,o as a,c as e,a as n}from"./app.4d6436be.js";const l=JSON.parse('{"title":"维护项目","description":"","frontmatter":{"outline":"deep"},"headers":[{"level":2,"title":"简介","slug":"简介","link":"#简介","children":[]},{"level":2,"title":"维护项目（API 接口）","slug":"维护项目（api-接口）","link":"#维护项目（api-接口）","children":[{"level":3,"title":"创建项目","slug":"创建项目","link":"#创建项目","children":[]},{"level":3,"title":"删除项目","slug":"删除项目","link":"#删除项目","children":[]},{"level":3,"title":"查询项目","slug":"查询项目","link":"#查询项目","children":[]}]}],"relativePath":"guide/user-guide/user-guide-02.md"}'),p={name:"guide/user-guide/user-guide-02.md"},o=[n('<h1 id="维护项目" tabindex="-1">维护项目 <a class="header-anchor" href="#维护项目" aria-hidden="true">#</a></h1><h2 id="简介" tabindex="-1">简介 <a class="header-anchor" href="#简介" aria-hidden="true">#</a></h2><p>在开始本节之前，请确保您已阅读 <a href="https://liujunhong5891.github.io/docs/guide/user-guide/user-guide-00.html" target="_blank" rel="noreferrer">用户指南的概述</a> 章节，了解 Nautes 的主流程和相关术语；并且已经创建了至少一个产品，详情参见 <a href="https://liujunhong5891.github.io/docs/guide/user-guide/user-guide-01.html" target="_blank" rel="noreferrer">维护产品</a>。</p><p>由于一个IT系统由多个微服务组成，因此，一个产品可以包含多个项目。此外，维护项目的用户即可以是产品成员，也可以是项目成员。</p><p>下面将详细介绍如何维护项目以及相关业务规则。维护项目有多种方式，包括命令行、API 接口等，下文将描述通过 API 接口的方式维护项目。</p><h2 id="维护项目（api-接口）" tabindex="-1">维护项目（API 接口） <a class="header-anchor" href="#维护项目（api-接口）" aria-hidden="true">#</a></h2><h3 id="创建项目" tabindex="-1">创建项目 <a class="header-anchor" href="#创建项目" aria-hidden="true">#</a></h3><p>产品创建成功之后，为其项目表示产品的微服务组件。 以下是创建项目的步骤：</p><ol><li>访问 Swagger UI【补充访问地址】，选择右上角 select a definition 下拉框中的 api.project.v1.Projet；选择 POST 接口，点击 try it out，在 product_name 参数中输入产品名称，在 project_name 参数中输入项目名称，点击 execute，生成 API 请求的代码示例；<div class="language-Shell"><button class="copy"></button><span class="lang">Shell</span><pre><code><span class="line"><span style="color:#89DDFF;"> </span><span style="color:#676E95;"># 实操过程中根据实际情况替换 URL 地址和相关参数； </span></span>\n<span class="line"><span style="color:#A6ACCD;"> curl -X </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">POST</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;">     </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">HTTP://10.204.118.221:32159/api/v1/products/product-demo/projects/project-demo</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;">     -H </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">accept: application/json</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;">     -H </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Content-Type: application/json</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;">     -d </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">{</span></span>\n<span class="line"><span style="color:#C3E88D;">     &quot;language&quot;: &quot;string&quot;</span></span>\n<span class="line"><span style="color:#C3E88D;">     }</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span></code></pre></div></li><li>访问 GitLab Web UI【补充访问地址】，获取请求 API 的 access token，作为 API 请求的请求头参数。<br> 1）使用您的账号登录 GitLab 之后，在右上角选择您的头像。<br> 2）选择 edit profile。<br> 3）在左侧边栏中，选择 access tokens。<br> 4）输入 access token 的名称和过期日期。<br> 5）选择授权给 access token 的权限范围，这里全选即可。<br> 6）选择 create personal access token，并将生成的 access token 保存到本地。</li><li>将前置步骤获取的 access token 作为 API 请求的请求头参数，通过 curl 命令，或者 Postman、JMeter 等工具执行 API 请求以新增项目。更新后的 API 请求的代码示例：<div class="language-Shell"><button class="copy"></button><span class="lang">Shell</span><pre><code><span class="line"><span style="color:#89DDFF;"> </span><span style="color:#676E95;"># 实操过程中根据实际情况替换 URL 地址和相关参数； </span></span>\n<span class="line"><span style="color:#A6ACCD;"> curl -X </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">POST</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;">     </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">HTTP://10.204.118.221:32159/api/v1/products/product-demo/projects/project-demo</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;">     -H </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">accept: application/json</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;">     -H </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Content-Type: application/json</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;">     -H </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Authorization: Bearer xxxxxxxxxxxxxxxxxxxxxxxxxx</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;">     -d </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">{</span></span>\n<span class="line"><span style="color:#C3E88D;">     &quot;language&quot;: &quot;string&quot;</span></span>\n<span class="line"><span style="color:#C3E88D;">     }</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span></code></pre></div>请求成功后，将生成关联产品的一个项目，这个项目资源文件存储在与产品对应的group中的default.project 代码库。</li></ol><h3 id="删除项目" tabindex="-1">删除项目 <a class="header-anchor" href="#删除项目" aria-hidden="true">#</a></h3><p>由于项目可能关联多个资源，在删除项目之前，需要先删除关联该项目的所有相关资源，例如代码库等。<br> 以下是删除项目的步骤：</p><ol><li>访问 Swagger UI【补充访问地址】，选择右上角 select a definition 下拉框中的 api.project.v1.Projet；选择 DELETE 接口，点击 try it out，在 product_name 参数中输入产品名称，在 project_name 参数中输入项目名称，点击 execute，生成 API 请求的代码示例。详情参考 <a href="#%E5%88%9B%E5%BB%BA%E9%A1%B9%E7%9B%AE">创建项目的步骤1</a> 。</li><li>访问 GitLab Web UI【补充访问地址】，同样需要获取请求 API 的 access token，作为 API 请求的请求头参数。详情参考 <a href="#%E5%88%9B%E5%BB%BA%E9%A1%B9%E7%9B%AE">创建项目的步骤2</a>。</li><li>将前置步骤获取的 access token 作为 API 请求的请求头参数，通过 curl 命令，或者 Postman、JMeter 等工具执行 API 来删除项目。请求成功后，该项目的资源文件将被删除。</li></ol><h3 id="查询项目" tabindex="-1">查询项目 <a class="header-anchor" href="#查询项目" aria-hidden="true">#</a></h3><p>查询项目有两个 API 接口，分别是查询项目列表、查询项目详情。<br> 以下是查询项目列表的步骤：</p><ol><li>访问 Swagger UI【补充访问地址】，选择右上角 select a definition 下拉框中的 api.project.v1.Projet；选择相对路径是 /api/v1/products/{products_name}/projects 的 GET 接口，点击 try it out，在 product_name 参数中输入产品名称，点击 execute，生成 API 请求的代码示例。详情参考 <a href="#%E5%88%9B%E5%BB%BA%E9%A1%B9%E7%9B%AE">创建项目的步骤1</a>。</li><li>访问 GitLab Web UI【补充访问地址】，同样需要获取请求 API 的 access token，作为 API 请求的请求头参数。详情参考 <a href="#%E5%88%9B%E5%BB%BA%E9%A1%B9%E7%9B%AE">创建项目的步骤2</a>。</li><li>将前置步骤获取的 access token 作为 API 请求的请求头参数，通过 curl 命令，或者 Postman、JMeter 等工具执行 API 以查询项目。请求成功后，如果用户是某些项目的成员，将返回项目信息。</li></ol><p>以下是查询项目详情的步骤：</p><ol><li>访问 Swagger UI【补充访问地址】，选择右上角 select a definition 下拉框中的 api.project.v1.Projet；选择相对路径是 /api/v1/products/{products_name}/projects/{project_name} 的 GET 接口，点击 try it out，在 product_name 参数中输入产品名称，在 project_name 参数中输入项目名称，点击 execute，生成 API 请求的代码示例。详情参考 <a href="#%E5%88%9B%E5%BB%BA%E9%A1%B9%E7%9B%AE">创建项目的步骤1</a> 。</li><li>其余步骤与“查询项目列表”相同，不再赘述。</li></ol>',17)];const t=s(p,[["render",function(s,n,l,p,t,r){return a(),e("div",null,o)}]]);export{l as __pageData,t as default};
