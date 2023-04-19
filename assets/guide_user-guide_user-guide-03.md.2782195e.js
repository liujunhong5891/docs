import{_ as s,c as a,o as n,d as l}from"./app.844d8816.js";const p=JSON.parse('{"title":"维护代码库","description":"","frontmatter":{"outline":"deep"},"headers":[{"level":2,"title":"维护代码库（API 接口）","slug":"维护代码库（api-接口）","link":"#维护代码库（api-接口）","children":[{"level":3,"title":"创建代码库","slug":"创建代码库","link":"#创建代码库","children":[]},{"level":3,"title":"更新代码库","slug":"更新代码库","link":"#更新代码库","children":[]},{"level":3,"title":"删除代码库","slug":"删除代码库","link":"#删除代码库","children":[]},{"level":3,"title":"查询代码库","slug":"查询代码库","link":"#查询代码库","children":[]}]},{"level":2,"title":"强制提交代码库（API 接口）","slug":"强制提交代码库（api-接口）","link":"#强制提交代码库（api-接口）","children":[]}],"relativePath":"guide/user-guide/user-guide-03.md"}'),e={name:"guide/user-guide/user-guide-03.md"},o=[l('<h1 id="维护代码库" tabindex="-1">维护代码库 <a class="header-anchor" href="#维护代码库" aria-hidden="true">#</a></h1><p>在开始本节之前，请确保您已阅读 <a href="./user-guide-00.html">主体流程</a> 章节，了解部署应用的主体流程 和相关术语。并且已经创建了至少一个产品，详情参见 <a href="./user-guide-01.html">维护产品</a>。</p><p>代码库用于存储产品的相关代码，例如源代码、CI流水线的代码、部署配置的代码等。一个产品可以包含多个代码库，一个代码库可以属于一个项目或者不关联项目。此外，维护代码库的用户即可以是产品成员和项目成员。</p><p>下面将详细介绍如何维护代码库以及相关规则。维护代码库有多种方式，包括命令行、API 接口等，下文将描述通过 API 接口的方式维护代码库。</p><h2 id="维护代码库（api-接口）" tabindex="-1">维护代码库（API 接口） <a class="header-anchor" href="#维护代码库（api-接口）" aria-hidden="true">#</a></h2><h3 id="创建代码库" tabindex="-1">创建代码库 <a class="header-anchor" href="#创建代码库" aria-hidden="true">#</a></h3><p>产品创建成功之后，使用代码库以存储产品的相关代码。步骤如下：</p><ol><li><p>访问 <a href="./quickstart-03.html">Swagger UI</a>，选择右上角 select a definition 下拉框中的 api.coderepo.v1.CodeRepo；选择 POST 接口，点击 try it out，在 product_name 参数中输入产品名称，在 coderepo_name 参数中输入代码库名称，点击 execute，生成 API 请求的代码示例。</p></li><li><p>获取请求 API 的 access token，作为 API 请求的请求头参数。详情参考 <a href="https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html" target="_blank" rel="noreferrer">Personal access tokens</a>。只有 owner 和 maintainer 角色的产品成员、GitLab 管理员才可以创建代码库。</p></li><li><p>将前置步骤获取的 access token 作为 API 请求的请求头参数，通过 curl 命令，或者 Postman、JMeter 等工具执行 API 请求以新增代码库。更新后的 API 请求的代码示例：</p><div class="language-Shell"><button class="copy"></button><span class="lang">Shell</span><pre><code><span class="line"><span style="color:#89DDFF;"> </span><span style="color:#676E95;"># 实操过程中根据实际情况替换 URL 地址和相关参数</span></span>\n<span class="line"><span style="color:#89DDFF;"> </span><span style="color:#676E95;"># “project”是代码库的关联项目，“webhook.events”是代码库 webhook 的监听事件，“deployment_runtime、pipeline_runtime”表示是否用于特定类型的运行时</span></span>\n<span class="line"><span style="color:#89DDFF;"> </span><span style="color:#676E95;"># “git.gitlab.name”是代码库名称，“git.gitlab.path” 是代码库路径，“git.gitlab.visibility”是代码库可见性，比如 private 或者 public </span></span>\n<span class="line"><span style="color:#A6ACCD;"> curl -X </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">POST</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">HTTP://xxx.xxx.xxx.xxx:xxxxx/api/v1/products/product-demo/coderepos/coderepo-demo</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;"> -H </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">accept: application/json</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;"> -H </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Content-Type: application/json</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;"> -H </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Authorization: Bearer xxxxxxxxxxxxxxxxxxxxxxxxxx</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;"> -d </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">{</span></span>\n<span class="line"><span style="color:#C3E88D;"> &quot;project&quot;: &quot;project-demo&quot;,</span></span>\n<span class="line"><span style="color:#C3E88D;"> &quot;webhook&quot;: {</span></span>\n<span class="line"><span style="color:#C3E88D;">     &quot;events&quot;: [&quot;push_events&quot;]</span></span>\n<span class="line"><span style="color:#C3E88D;"> },</span></span>\n<span class="line"><span style="color:#C3E88D;"> &quot;deployment_runtime&quot;: true,</span></span>\n<span class="line"><span style="color:#C3E88D;"> &quot;pipeline_runtime&quot;: false,</span></span>\n<span class="line"><span style="color:#C3E88D;"> &quot;git&quot;: {</span></span>\n<span class="line"><span style="color:#C3E88D;">     &quot;gitlab&quot;: {</span></span>\n<span class="line"><span style="color:#C3E88D;">         &quot;name&quot;: &quot;coderepo-demo&quot;,</span></span>\n<span class="line"><span style="color:#C3E88D;">         &quot;path&quot;: &quot;coderepo-demo&quot;,</span></span>\n<span class="line"><span style="color:#C3E88D;">         &quot;visibility&quot;: &quot;private&quot;,</span></span>\n<span class="line"><span style="color:#C3E88D;">         &quot;description&quot;: &quot;coderepo-demo&quot;</span></span>\n<span class="line"><span style="color:#C3E88D;">         }</span></span>\n<span class="line"><span style="color:#C3E88D;">     }</span></span>\n<span class="line"><span style="color:#C3E88D;"> }</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span></code></pre></div><p>请求成功后，将在产品对应的 GitLab group 中新增代码库，并在产品对应的 default.project 代码库中生成关联产品的代码库资源文件。</p><div class="language-yaml"><button class="copy"></button><span class="lang">yaml</span><pre><code><span class="line"><span style="color:#F07178;">apiVersion</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nautes.resource.nautes.io/v1alpha1</span></span>\n<span class="line"><span style="color:#F07178;">kind</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">CodeRepo</span></span>\n<span class="line"><span style="color:#F07178;">metadata</span><span style="color:#89DDFF;">:</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">coderepo-demo</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">namespace</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">my-namespace</span></span>\n<span class="line"><span style="color:#F07178;">spec</span><span style="color:#89DDFF;">:</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">codeRepoProvider</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">gitlab</span><span style="color:#89DDFF;">&quot;</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">deploymentRuntime</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">pipelineRuntime</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">product</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">product-demo</span><span style="color:#89DDFF;">&quot;</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">project</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">project-demo</span><span style="color:#89DDFF;">&quot;</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">repoName</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">coderepo-demo</span><span style="color:#89DDFF;">&quot;</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">url</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">https://github.com/myusername/coderepo-demo.git</span><span style="color:#89DDFF;">&quot;</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">webhook</span><span style="color:#89DDFF;">:</span></span>\n<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">events</span><span style="color:#89DDFF;">:</span></span>\n<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">push</span><span style="color:#89DDFF;">&quot;</span></span>\n<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">pull_request</span><span style="color:#89DDFF;">&quot;</span></span>\n<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">isolation</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">default</span><span style="color:#89DDFF;">&quot;</span></span>\n<span class="line"></span></code></pre></div></li></ol><h3 id="更新代码库" tabindex="-1">更新代码库 <a class="header-anchor" href="#更新代码库" aria-hidden="true">#</a></h3><p>代码库创建成功后，可以修改代码库。详情参考 <a href="#%E5%88%9B%E5%BB%BA%E4%BB%A3%E7%A0%81%E5%BA%93">创建代码库</a>。只有 owner 和 maintainer 角色的产品成员、GitLab 管理员才可以更新代码库资源。<br> 请求成功后，除了更新代码库，也将更新存储在产品对应的default.project 代码库中的代码库资源文件。</p><h3 id="删除代码库" tabindex="-1">删除代码库 <a class="header-anchor" href="#删除代码库" aria-hidden="true">#</a></h3><p>由于代码库可能关联多个资源，在删除代码库之前，需要先删除关联该代码库的所有相关资源，例如部署运行时等。步骤如下：</p><ol><li>访问 <a href="./quickstart-03.html">Swagger UI</a>，选择右上角 select a definition 下拉框中的 api.coderepo.v1.CodeRepo；选择 DELETE 接口，点击 try it out，在 product_name 参数中输入产品名称，在 coderepo_name 参数中输入代码库名称，点击 execute，生成 API 请求的代码示例。详情参考 <a href="#%E5%88%9B%E5%BB%BA%E4%BB%A3%E7%A0%81%E5%BA%93">创建代码库的步骤1</a> 。</li><li>获取请求 API 的 access token，作为 API 请求的请求头参数。详情参考 <a href="https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html" target="_blank" rel="noreferrer">Personal access tokens</a>。只有 owner 角色的产品成员或项目成员、GitLab 管理员才可以删除代码库。</li><li>将前置步骤获取的 access token 作为 API 请求的请求头参数，通过 curl 命令，或者 Postman、JMeter 等工具执行 API 来删除代码库。请求成功后，代码库及其资源文件将被删除。</li></ol><h3 id="查询代码库" tabindex="-1">查询代码库 <a class="header-anchor" href="#查询代码库" aria-hidden="true">#</a></h3><p>查询代码库有两个 API 接口，分别是查询代码库列表、查询代码库详情。<br> 查询代码库列表的步骤如下：</p><ol><li>访问 <a href="./quickstart-03.html">Swagger UI</a>，选择右上角 select a definition 下拉框中的 api.coderepo.v1.CodeRepo；选择相对路径是 /api/v1/products/{products_name}/coderepos 的 GET 接口，点击 try it out，在 product_name 参数中输入产品名称，点击 execute，生成 API 请求的代码示例。详情参考 <a href="#%E5%88%9B%E5%BB%BA%E4%BB%A3%E7%A0%81%E5%BA%93">创建代码库的步骤1</a>。</li><li>获取请求 API 的 access token，作为 API 请求的请求头参数。详情参考 <a href="https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html" target="_blank" rel="noreferrer">Personal access tokens</a>。</li><li>将前置步骤获取的 access token 作为 API 请求的请求头参数，通过 curl 命令，或者 Postman、JMeter 等工具执行 API 以查询代码库。请求成功后，如果用户是产品成员或者产品中的项目成员，将返回代码库信息。</li></ol><p>查询代码库详情的步骤如下：</p><ol><li>访问 <a href="./quickstart-03.html">Swagger UI</a>，选择右上角 select a definition 下拉框中的 api.coderepo.v1.CodeRepo；选择相对路径是 /api/v1/products/{products_name}/coderepos/{coderepo_name} 的 GET 接口，点击 try it out，在 product_name 参数中输入产品名称，在 coderepo_name 参数中输入代码库名称，点击 execute，生成 API 请求的代码示例。详情参考 <a href="#%E5%88%9B%E5%BB%BA%E4%BB%A3%E7%A0%81%E5%BA%93">创建代码库的步骤1</a>。</li><li>其余步骤与“查询代码库列表”相同，不再赘述。</li></ol><h2 id="强制提交代码库（api-接口）" tabindex="-1">强制提交代码库（API 接口） <a class="header-anchor" href="#强制提交代码库（api-接口）" aria-hidden="true">#</a></h2><p>为了保证 Nautes 监听的产品配置清单符合既定规则，以便 Nautes 基于产品配置清单能够自动部署产品的运行时环境。因此，提交 API 请求时默认对产品配置清单中的所有资源文件启用校验，如果校验不通过，则不能提交请求。 但在实际操作过程中，用户可能通过 Git CLI 或者 GitLab Web IDE 等渠道提交不符合既定规则的资源文件，例如创建集群不存在的环境、创建项目不存在的代码库等，为了兼容不合规资源的场景，POST 和 DELETE 类型的请求接口可以添加 insecure_skip_check 查询参数，并设置其属性值为 true，表示请求 API 强制提交资源文件，哪怕这个资源文件不符合既定规则。</p><div class="language-Shell"><button class="copy"></button><span class="lang">Shell</span><pre><code><span class="line"><span style="color:#676E95;"># 以下示例为创建代码库时，设置 project 的属性值不合规，启用 insecure_skip_check 参数以强制提交代码库的资源文件</span></span>\n<span class="line"><span style="color:#A6ACCD;">curl -X </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">POST</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">HTTP://xxx.xxx.xxx.xxx:xxxxx/api/v1/products/coderepo-demo/coderepos/coderepo-demo?insecure_skip_check=true</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;">  -H </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">accept: application/json</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;">  -H </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Content-Type: application/json</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> \\</span></span>\n<span class="line"><span style="color:#A6ACCD;">  -d </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">{</span></span>\n<span class="line"><span style="color:#C3E88D;">  &quot;project&quot;: &quot;project-demo-invalid&quot;,</span></span>\n<span class="line"><span style="color:#C3E88D;">  &quot;webhook&quot;: {</span></span>\n<span class="line"><span style="color:#C3E88D;">    &quot;events&quot;: [</span></span>\n<span class="line"><span style="color:#C3E88D;">      &quot;push_events&quot;</span></span>\n<span class="line"><span style="color:#C3E88D;">    ]</span></span>\n<span class="line"><span style="color:#C3E88D;">  },</span></span>\n<span class="line"><span style="color:#C3E88D;">  &quot;deployment_runtime&quot;: true,</span></span>\n<span class="line"><span style="color:#C3E88D;">  &quot;pipeline_runtime&quot;: false,</span></span>\n<span class="line"><span style="color:#C3E88D;">  &quot;git&quot;: {</span></span>\n<span class="line"><span style="color:#C3E88D;">    &quot;gitlab&quot;: {</span></span>\n<span class="line"><span style="color:#C3E88D;">      &quot;name&quot;: &quot;coderepo-demo&quot;,</span></span>\n<span class="line"><span style="color:#C3E88D;">      &quot;path&quot;: &quot;coderepo-demo&quot;,</span></span>\n<span class="line"><span style="color:#C3E88D;">      &quot;visibility&quot;: &quot;private&quot;,</span></span>\n<span class="line"><span style="color:#C3E88D;">      &quot;description&quot;: &quot;coderepo-demo&quot;</span></span>\n<span class="line"><span style="color:#C3E88D;">    }</span></span>\n<span class="line"><span style="color:#C3E88D;">  }</span></span>\n<span class="line"><span style="color:#C3E88D;">}</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span></code></pre></div>',21)];const t=s(e,[["render",function(s,l,p,e,t,c){return n(),a("div",null,o)}]]);export{p as __pageData,t as default};
