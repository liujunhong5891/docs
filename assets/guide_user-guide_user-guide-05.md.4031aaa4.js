import{_ as s,o as a,c as n,a as e}from"./app.bb98a4ab.js";const l=JSON.parse('{"title":"维护部署运行时","description":"","frontmatter":{"outline":"deep"},"headers":[{"level":2,"title":"简介","slug":"简介","link":"#简介","children":[]},{"level":2,"title":"维护部署运行时（API 接口）","slug":"维护部署运行时（api-接口）","link":"#维护部署运行时（api-接口）","children":[{"level":3,"title":"创建部署运行时","slug":"创建部署运行时","link":"#创建部署运行时","children":[]},{"level":3,"title":"更新部署运行时","slug":"更新部署运行时","link":"#更新部署运行时","children":[]},{"level":3,"title":"删除部署运行时","slug":"删除部署运行时","link":"#删除部署运行时","children":[]},{"level":3,"title":"查询部署运行时","slug":"查询部署运行时","link":"#查询部署运行时","children":[]}]},{"level":2,"title":"强制提交部署运行时（API 接口）","slug":"强制提交部署运行时（api-接口）","link":"#强制提交部署运行时（api-接口）","children":[]}],"relativePath":"guide/user-guide/user-guide-05.md"}'),p={name:"guide/user-guide/user-guide-05.md"},o=[e('<h1 id="维护部署运行时" tabindex="-1">维护部署运行时 <a class="header-anchor" href="#维护部署运行时" aria-hidden="true">#</a></h1><h2 id="简介" tabindex="-1">简介 <a class="header-anchor" href="#简介" aria-hidden="true">#</a></h2><p>在开始本节之前，请确保您已阅读 <a href="./user-guide-00.html">用户指南的概述</a> 章节，了解 Nautes 的主流程和相关术语；并且已经创建了至少一个产品，以及产品中的一个代码库和一个环境，详情参见 <a href="./user-guide-01.html">维护产品</a>、<a href="./user-guide-03.html">维护代码库</a>、<a href="./user-guide-04.html">维护环境</a>。</p><p>部署运行时指将IT系统成功部署到基础设施的状态和行为，确保其能够正常运行并提供所需的功能，这里的基础设施指 Kubernetes 集群。一个产品可以包含多个部署运行时，一个 Kubernetes 集群可以负载多个产品的部署运行时。</p><p>下面将详细介绍如何维护部署运行时以及相关规则。维护部署运行时有多种方式，包括命令行、API 接口等，下文将描述通过 API 接口的方式维护部署运行时。</p><h2 id="维护部署运行时（api-接口）" tabindex="-1">维护部署运行时（API 接口） <a class="header-anchor" href="#维护部署运行时（api-接口）" aria-hidden="true">#</a></h2><h3 id="创建部署运行时" tabindex="-1">创建部署运行时 <a class="header-anchor" href="#创建部署运行时" aria-hidden="true">#</a></h3><p>产品、环境和代码库创建成功之后，创建部署运行时资源以自动部署产品的运行时环境。步骤如下：</p><ol><li><p>访问 Swagger UI【补充访问地址】，选择右上角 select a definition 下拉框中的 api.deploymentruntime.v1.Deploymentruntime POST 接口，点击 try it out，在 product_name 参数中输入产品名称，在 deploymentruntime_name 参数中输入部署运行时的名称，点击 execute，生成 API 请求的代码示例。</p></li><li><p>获取请求 API 的 access token，作为 API 请求的请求头参数。详情参考 <a href="https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html" target="_blank" rel="noreferrer">Personal access tokens</a>。具有 owner、maintainer、developer、reporter 角色的产品成员，以及 GitLab 管理员都可以创建特定产品的部署运行时。</p></li><li><p>将前置步骤获取的 access token 作为 API 请求的请求头参数，通过 curl 命令，或者 Postman、JMeter 等工具执行 API 请求以新增部署运行时。更新后的 API 请求的代码示例：</p><div class="language-Shell"><button class="copy"></button><span class="lang">Shell</span><pre><code><span class="line"><span style="color:#89DDFF;"> </span><span style="color:#676E95;"># 实操过程中根据实际情况替换 URL 地址和相关参数； </span></span>\n<span class="line"><span style="color:#A6ACCD;"> curl -X </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">POST</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">HTTP://xxx.xxx.xxx.xxx:xxxxx/api/v1/products/product-demo/deploymentruntimes/dr-demo</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;"> -H </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">accept: application/json</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;"> -H </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Content-Type: application/json</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;"> -H </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Authorization: Bearer xxxxxxxxxxxxxxxxxxxxxxxxxx</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;"> -d </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">{</span></span>\n<span class="line"><span style="color:#C3E88D;">     &quot;projects_ref&quot;: [</span></span>\n<span class="line"><span style="color:#C3E88D;">         &quot;project-demo&quot;</span></span>\n<span class="line"><span style="color:#C3E88D;">     ],</span></span>\n<span class="line"><span style="color:#C3E88D;">     &quot;manifest_source&quot;: {</span></span>\n<span class="line"><span style="color:#C3E88D;">         &quot;code_repo&quot;: &quot;coderepo-demo&quot;,</span></span>\n<span class="line"><span style="color:#C3E88D;">         &quot;target_revision&quot;: &quot;master&quot;,</span></span>\n<span class="line"><span style="color:#C3E88D;">         &quot;path&quot;: &quot;coderepo-demo&quot;</span></span>\n<span class="line"><span style="color:#C3E88D;">     },</span></span>\n<span class="line"><span style="color:#C3E88D;">     &quot;destination&quot;: &quot;environment-demo&quot;</span></span>\n<span class="line"><span style="color:#C3E88D;"> }</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">    </span></span>\n<span class="line"></span></code></pre></div><p>请求成功后，将在产品对应的 default.project 代码库中生成关联产品的部署运行时资源文件，并根据部署运行时的配置找到环境关联的部署集群实施自动部署。</p><div class="language-yaml"><button class="copy"></button><span class="lang">yaml</span><pre><code><span class="line"><span style="color:#F07178;">apiVersion</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nautes.resource.nautes.io/v1alpha1</span></span>\n<span class="line"><span style="color:#F07178;">kind</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">DeploymentRuntime</span></span>\n<span class="line"><span style="color:#F07178;">metadata</span><span style="color:#89DDFF;">:</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">dr-demo</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">namespace</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">my-namespace</span></span>\n<span class="line"><span style="color:#F07178;">spec</span><span style="color:#89DDFF;">:</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">destination</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">environment-demo</span><span style="color:#89DDFF;">&quot;</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">manifestSource</span><span style="color:#89DDFF;">:</span></span>\n<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">codeRepo</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">coderepo-demo</span><span style="color:#89DDFF;">&quot;</span></span>\n<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">path</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/path/to/manifests</span><span style="color:#89DDFF;">&quot;</span></span>\n<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">targetRevision</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">master</span><span style="color:#89DDFF;">&quot;</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">product</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">product-demo</span><span style="color:#89DDFF;">&quot;</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">projectsRef</span><span style="color:#89DDFF;">:</span></span>\n<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">project-demo</span><span style="color:#89DDFF;">&quot;</span></span>\n<span class="line"></span></code></pre></div></li></ol><h3 id="更新部署运行时" tabindex="-1">更新部署运行时 <a class="header-anchor" href="#更新部署运行时" aria-hidden="true">#</a></h3><p>部署运行时创建成功后，可以修改部署运行时。详情参考 <a href="#%E5%88%9B%E5%BB%BA%E9%83%A8%E7%BD%B2%E8%BF%90%E8%A1%8C%E6%97%B6">创建部署运行时</a> 。 请求成功后，将更新存储在产品对应的default.project 代码库中的部署运行时资源文件，并基于变更后的配置实施自动部署。如果部署运行时已经成功部署到某个部署集群，暂不支持变更 destination，迁移集群功能将在后续版本提供。</p><h3 id="删除部署运行时" tabindex="-1">删除部署运行时 <a class="header-anchor" href="#删除部署运行时" aria-hidden="true">#</a></h3><p>部署运行时是基于产品、代码库、环境等资源的基础上定义的，其他资源对部署运行时没有依赖，因此只要用户有权限即可执行删除操作。步骤如下：</p><ol><li>访问 Swagger UI【补充访问地址】，选择右上角 select a definition 下拉框中的 api.deploymentruntime.v1.Deploymentruntime；选择 DELETE 接口，点击 try it out，在 product_name 参数中输入产品名称，在 deploymentruntime_name 参数中输入部署运行时名称，点击 execute，生成 API 请求的代码示例。详情参考 <a href="#%E5%88%9B%E5%BB%BA%E9%83%A8%E7%BD%B2%E8%BF%90%E8%A1%8C%E6%97%B6">创建部署运行时的步骤1</a> 。</li><li>获取请求 API 的 access token，作为 API 请求的请求头参数。详情参考 <a href="https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html" target="_blank" rel="noreferrer">Personal access tokens</a>。具有 owner、maintainer、developer、reporter 角色的产品成员，以及 GitLab 管理员才可以删除特定产品的部署运行时。</li><li>将前置步骤获取的 access token 作为 API 请求的请求头参数，通过 curl 命令，或者 Postman、JMeter 等工具执行 API 来删除部署运行时。请求成功后，部署运行时的资源文件将被删除、运行在部署集群的运行时环境将被销毁。</li></ol><h3 id="查询部署运行时" tabindex="-1">查询部署运行时 <a class="header-anchor" href="#查询部署运行时" aria-hidden="true">#</a></h3><p>查询部署运行时有两个 API 接口，分别是查询部署运行时列表、查询部署运行时详情。<br> 查询部署运行时列表的步骤如下：</p><ol><li>访问 Swagger UI【补充访问地址】，选择右上角 select a definition 下拉框中的 api.deploymentruntime.v1.Deploymentruntime；选择相对路径是 /api/v1/products/{products_name}/deploymentruntimes 的 GET 接口，点击 try it out，在 product_name 参数中输入产品名称，点击 execute，生成 API 请求的代码示例。详情参考 <a href="#%E5%88%9B%E5%BB%BA%E9%83%A8%E7%BD%B2%E8%BF%90%E8%A1%8C%E6%97%B6">创建部署运行时的步骤1</a> 。</li><li>获取请求 API 的 access token，作为 API 请求的请求头参数。详情参考 <a href="https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html" target="_blank" rel="noreferrer">Personal access tokens</a>。具有 owner、maintainer、developer、reporter 角色的产品成员，以及 GitLab 管理员才可以查询特定产品的部署运行时。</li><li>将前置步骤获取的 access token 作为 API 请求的请求头参数，通过 curl 命令，或者 Postman、JMeter 等工具执行 API 以查询代码库。请求成功后，如果用户是产品成员，将返回部署运行时列表。</li></ol><p>查询部署运行时详情的步骤如下：</p><ol><li>访问 Swagger UI【补充访问地址】，选择右上角 select a definition 下拉框中的 api.deploymentruntime.v1.Deploymentruntime；选择相对路径是 /api/v1/products/{products_name}/deploymentruntimes/{deploymentruntime_name} 的 GET 接口，点击 try it out，在 product_name 参数中输入产品名称，在 deploymentruntime_name 参数中输入部署运行时名称，点击 execute，生成 API 请求的代码示例。详情参考 <a href="#%E5%88%9B%E5%BB%BA%E9%83%A8%E7%BD%B2%E8%BF%90%E8%A1%8C%E6%97%B6">创建部署运行时的步骤1</a> 。</li><li>其余步骤与“查询部署运行时列表”相同，不再赘述。</li></ol><h2 id="强制提交部署运行时（api-接口）" tabindex="-1">强制提交部署运行时（API 接口） <a class="header-anchor" href="#强制提交部署运行时（api-接口）" aria-hidden="true">#</a></h2><p>详情规则参见 <a href="./user-guide-03.html#强制提交代码库api-接口">强制提交资源文件（API 接口）</a>。</p><div class="language-Shell"><button class="copy"></button><span class="lang">Shell</span><pre><code><span class="line"><span style="color:#676E95;"># 以下示例为创建部署运行时，设置 destination 属性值不合规，启用 insecure_skip_check 参数以强制提交部署运行时的资源文件</span></span>\n<span class="line"><span style="color:#A6ACCD;">curl -X </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">POST</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">HTTP://xxx.xxx.xxx.xxx:xxxxx/api/v1/products/product-demo/deploymentruntimes/dr-demo?insecure_skip_check=true</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;">  -H </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">accept: application/json</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;">  -H </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Content-Type: application/json</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;">  -d </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">{</span></span>\n<span class="line"><span style="color:#C3E88D;">  &quot;projects_ref&quot;: [</span></span>\n<span class="line"><span style="color:#C3E88D;">    &quot;project-demo&quot;</span></span>\n<span class="line"><span style="color:#C3E88D;">  ],</span></span>\n<span class="line"><span style="color:#C3E88D;">  &quot;manifest_source&quot;: {</span></span>\n<span class="line"><span style="color:#C3E88D;">    &quot;code_repo&quot;: &quot;coderepo-demo&quot;,</span></span>\n<span class="line"><span style="color:#C3E88D;">    &quot;target_revision&quot;: &quot;master&quot;,</span></span>\n<span class="line"><span style="color:#C3E88D;">    &quot;path&quot;: &quot;/path/to/manifests&quot;</span></span>\n<span class="line"><span style="color:#C3E88D;">  },</span></span>\n<span class="line"><span style="color:#C3E88D;">  &quot;destination&quot;: &quot;environment-demo-invalid&quot;</span></span>\n<span class="line"><span style="color:#C3E88D;">}</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span></code></pre></div>',22)];const t=s(p,[["render",function(s,e,l,p,t,r){return a(),n("div",null,o)}]]);export{l as __pageData,t as default};