import{_ as s,o as n,c as a,a as l}from"./app.cbaa3ea6.js";const p=JSON.parse('{"title":"","description":"","frontmatter":{"outline":"deep"},"headers":[{"level":2,"title":"从零搭建部署运行时环境","slug":"从零搭建部署运行时环境","link":"#从零搭建部署运行时环境","children":[{"level":3,"title":"准备前置条件","slug":"准备前置条件","link":"#准备前置条件","children":[]},{"level":3,"title":"安装租户管理集群","slug":"安装租户管理集群","link":"#安装租户管理集群","children":[]},{"level":3,"title":"注册部署集群","slug":"注册部署集群","link":"#注册部署集群","children":[]},{"level":3,"title":"提交产品配置清单","slug":"提交产品配置清单","link":"#提交产品配置清单","children":[]},{"level":3,"title":"提交部署配置清单","slug":"提交部署配置清单","link":"#提交部署配置清单","children":[]},{"level":3,"title":"跟踪部署过程和结果","slug":"跟踪部署过程和结果","link":"#跟踪部署过程和结果","children":[]}]}],"relativePath":"guide/user-guide/quickstart-01.md"}'),o={name:"guide/user-guide/quickstart-01.md"},e=[l('<h2 id="从零搭建部署运行时环境" tabindex="-1">从零搭建部署运行时环境 <a class="header-anchor" href="#从零搭建部署运行时环境" aria-hidden="true">#</a></h2><p>下文将描述从零开始安装集群到自动执行部署的执行过程。包括以下步骤：<br><a href="#%E5%87%86%E5%A4%87%E5%89%8D%E7%BD%AE%E6%9D%A1%E4%BB%B6">准备前置条件</a><br><a href="#%E5%AE%89%E8%A3%85%E7%A7%9F%E6%88%B7%E7%AE%A1%E7%90%86%E9%9B%86%E7%BE%A4">安装租户管理集群</a><br><a href="#%E6%B3%A8%E5%86%8C%E9%83%A8%E7%BD%B2%E9%9B%86%E7%BE%A4">注册部署集群</a><br><a href="#%E6%8F%90%E4%BA%A4%E4%BA%A7%E5%93%81%E9%85%8D%E7%BD%AE%E6%B8%85%E5%8D%95">提交产品配置清单</a><br><a href="#%E6%8F%90%E4%BA%A4%E9%83%A8%E7%BD%B2%E9%85%8D%E7%BD%AE%E6%B8%85%E5%8D%95">提交部署配置清单</a><br><a href="#%E8%B7%9F%E8%B8%AA%E9%83%A8%E7%BD%B2%E8%BF%87%E7%A8%8B%E5%92%8C%E7%BB%93%E6%9E%9C">跟踪部署过程和结果</a></p><h3 id="准备前置条件" tabindex="-1">准备前置条件 <a class="header-anchor" href="#准备前置条件" aria-hidden="true">#</a></h3><p>在开始本节之前，请确保您已阅读 <a href="https://liujunhong5891.github.io/docs/guide/user-guide/user-guide-00.html" target="_blank" rel="noreferrer">用户指南的概述</a> 章节。 待补充。</p><h3 id="安装租户管理集群" tabindex="-1">安装租户管理集群 <a class="header-anchor" href="#安装租户管理集群" aria-hidden="true">#</a></h3><p>待补充。</p><h3 id="注册部署集群" tabindex="-1">注册部署集群 <a class="header-anchor" href="#注册部署集群" aria-hidden="true">#</a></h3><p>待补充。</p><h3 id="提交产品配置清单" tabindex="-1">提交产品配置清单 <a class="header-anchor" href="#提交产品配置清单" aria-hidden="true">#</a></h3><p>通过 Nautes CLI 自动提交产品、环境、项目、代码库、部署运行时等资源文件，这些资源文件组成了“产品配置清单”。提交成功后，Nautes 将监听产品配置清单向部署集群实施自动部署，以安装产品的部署运行时环境。</p><ol><li>clone 存储产品配置库模板的代码库，批量替换资源的参数值。产品配置库模板的内容如下：</li></ol><div class="language-yaml"><button class="copy"></button><span class="lang">yaml</span><pre><code><span class="line"><span style="color:#676E95;"># 产品</span></span>\n<span class="line"><span style="color:#676E95;"># 批量替换 spec.name、spec.git.gitlab.name、spec.git.gitlab.path、spec.git.gitlab.description等参数值；</span></span>\n<span class="line"><span style="color:#F07178;">apiVersion</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nautes.resource.nautes.io/v1alpha10329</span></span>\n<span class="line"><span style="color:#F07178;">kind</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Product</span></span>\n<span class="line"><span style="color:#F07178;">spec</span><span style="color:#89DDFF;">:</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">demo-0329</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">git</span><span style="color:#89DDFF;">:</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">gitlab</span><span style="color:#89DDFF;">:</span></span>\n<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;"># 产品名称</span></span>\n<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">demo-0329</span></span>\n<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;"># 产品路径</span></span>\n<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">path</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">demo-0329</span></span>\n<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">visibility</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">private</span></span>\n<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">description</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">demo-0329</span></span>\n<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">parentID</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span></span>\n<span class="line"><span style="color:#FFCB6B;">---</span></span>\n<span class="line"><span style="color:#676E95;"># 环境</span></span>\n<span class="line"><span style="color:#676E95;"># 批量替换 spec.name、spec.product等参数值；这里假设环境关联的 kubernetes 集群名称为 test-deployment-runtime； </span></span>\n<span class="line"><span style="color:#F07178;">apiVersion</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nautes.resource.nautes.io/v1alpha1</span></span>\n<span class="line"><span style="color:#F07178;">kind</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Environment</span></span>\n<span class="line"><span style="color:#F07178;">spec</span><span style="color:#89DDFF;">:</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;"># 环镜名称</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">env-demo-0329</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;"># 环境所属的产品</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">product</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">demo-0329</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;"># 环境关联的集群</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">cluster</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">test-deployment-runtime</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">envType</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">dev</span></span>\n<span class="line"><span style="color:#FFCB6B;">---</span></span>\n<span class="line"><span style="color:#676E95;"># 项目</span></span>\n<span class="line"><span style="color:#676E95;"># 批量替换 spec.name、spec.product等参数值</span></span>\n<span class="line"><span style="color:#F07178;">apiVersion</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">nautes.resource.nautes.io/v1alpha1</span><span style="color:#89DDFF;">&quot;</span></span>\n<span class="line"><span style="color:#F07178;">kind</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Project</span></span>\n<span class="line"><span style="color:#F07178;">spec</span><span style="color:#89DDFF;">:</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;"># 项目名称</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">project-demo-0329</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;"># 项目所属的产品</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">product</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">demo-0329</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">language</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">golang</span></span>\n<span class="line"><span style="color:#FFCB6B;">---</span></span>\n<span class="line"><span style="color:#676E95;"># 代码库，后续用于存储产品的部署配置清单</span></span>\n<span class="line"><span style="color:#676E95;"># 批量替换 spec.name、spec.product、spec.project、spec.git.gitlab.name、spec.git.gitlab.path、spec.git.gitlab.description</span></span>\n<span class="line"><span style="color:#F07178;">apiVersion</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nautes.resource.nautes.io/v1alpha1</span></span>\n<span class="line"><span style="color:#F07178;">kind</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">CodeRepo</span></span>\n<span class="line"><span style="color:#F07178;">spec</span><span style="color:#89DDFF;">:</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;"># 代码库名称</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">coderepo-demo-0329</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">deploymentRuntime</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">pipelineRuntime</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;"># 代码库所属的产品</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">product</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">demo-0329</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;"># 代码库所属的项目</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">project</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">project-demo-0329</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">webhook</span><span style="color:#89DDFF;">:</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">events</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">push_events</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">]</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">isolation</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">shared</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">git</span><span style="color:#89DDFF;">:</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">gitlab</span><span style="color:#89DDFF;">:</span></span>\n<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;"># 代码库名称</span></span>\n<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">coderepo-demo-0329</span></span>\n<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;"># 代码库路径</span></span>\n<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">path</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">coderepo-demo-0329</span><span style="color:#A6ACCD;"> </span></span>\n<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">visibility</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">private</span></span>\n<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">description</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">coderepo-demo-0329</span><span style="color:#A6ACCD;"> </span></span>\n<span class="line"><span style="color:#FFCB6B;">---</span></span>\n<span class="line"><span style="color:#676E95;"># 部署运行时</span></span>\n<span class="line"><span style="color:#676E95;"># 批量替换 spec.name、spec.destination、spec.manifestsource.codeRepo、spec.product、spec.projectsRef； </span></span>\n<span class="line"><span style="color:#F07178;">apiVersion</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nautes.resource.nautes.io/v1alpha1</span></span>\n<span class="line"><span style="color:#F07178;">kind</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">DeploymentRuntime</span></span>\n<span class="line"><span style="color:#F07178;">spec</span><span style="color:#89DDFF;">:</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;"># 部署运行时名称</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">dr-demo-0329</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;"># 部署运行时的目标集群，这里指部署集群</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">destination</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">env-demo-0329</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">manifestsource</span><span style="color:#89DDFF;">:</span></span>\n<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;"># 部署运行时监听的代码库</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">codeRepo</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">coderepo-demo-0329</span></span>\n<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;"># 部署运行时监听的代码库相对路径</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">path</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">deployments</span></span>\n<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;"># 部署运行时监听的代码库版本或代码库分支</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">targetRevision</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">main</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">product</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">demo-0329</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">projectsRef</span><span style="color:#89DDFF;">:</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">project-demo-0329</span></span>\n<span class="line"></span></code></pre></div><ol start="2"><li>在 Windows 操作系统下，将 [nautes.exe] 文件保存于本地某个目录，执行下文的 cmd 命令。执行成功后，Nautes 将生成产品配置清单，并自动安装产品的部署运行时环境。</li></ol><div class="language-cmd"><button class="copy"></button><span class="lang">cmd</span><pre><code><span class="line"><span style="color:#A6ACCD;">:: apply 后面的三个参数分别表示：产品配置库模板在模板代码库中的相对路径； GitLab 用户账号对应的 access token； Nautes API 的访问地址； </span></span>\n<span class="line"><span style="color:#A6ACCD;">nautes apply </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">f examples/demo.yaml </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">t access</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">token </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">s http://</span><span style="color:#F78C6C;">10.204.118.221</span><span style="color:#A6ACCD;">:</span><span style="color:#F78C6C;">32159</span><span style="color:#A6ACCD;">/</span></span>\n<span class="line"></span></code></pre></div><h3 id="提交部署配置清单" tabindex="-1">提交部署配置清单 <a class="header-anchor" href="#提交部署配置清单" aria-hidden="true">#</a></h3><p>通过 Git CLI 提交产品的部署配置清单，例如 deployment、service、volume 等资源。提交成功后，Nautes 将部署配置清单自动同步到产品的部署运行时环境，并执行自动部署。详细步骤参见 <a href="https://docs.gitlab.com/ee/tutorials/make_your_first_git_commit.html" target="_blank" rel="noreferrer">GitLab</a>。</p><h3 id="跟踪部署过程和结果" tabindex="-1">跟踪部署过程和结果 <a class="header-anchor" href="#跟踪部署过程和结果" aria-hidden="true">#</a></h3><p>在部署产品的过程中或部署完成后，可以通过 ArgoCD 控制台或者 kubectl 命令行来跟踪部署过程和结果。这两种方式均支持单点登录，方便用户管理被授权的产品资源。</p><ol><li><p>访问安装在部署集群的 ArgoCD Web UI 地址【地址从哪来】，点击 log in via dex，填写 GitLab 账号和密码，然后单点登入 ArgoCD，并通过 ArgoCD 的 Web UI 管理被授权产品的 application，详细操作步骤参见 <a href="https://argo-cd.readthedocs.io/en/stable/getting_started/" target="_blank" rel="noreferrer">ArgoCD</a> 。 <img src="/docs/assets/quickstart-argocd-1.b3ca4a75.png" alt="directive syntax graph"><img src="/docs/assets/quickstart-argocd-2.cbf8bfd6.png" alt="directive syntax graph"></p></li><li><p>访问 dex 服务地址，填写 extra scopes 值为 groups，点击 login，保存 ID Token 到本地。通过脚本获取部署集群的 kubeconfig 文件，并将 ID Token 替换 kubeconfig 文件中的 users 配置，然后便可以通过 kubectl 命令行管理被授权的产品资源。 <img src="/docs/assets/quickstart-dex-1.7adecedc.png" alt="directive syntax graph"><img src="/docs/assets/quickstart-dex-2.7fcd6d37.png" alt="directive syntax graph"></p></li></ol><div class="language-Shell"><button class="copy"></button><span class="lang">Shell</span><pre><code><span class="line"><span style="color:#676E95;"># 使用命令获取部署集群的 kubeconfig 文件</span></span>\n<span class="line"><span style="color:#A6ACCD;">kubectl get secret vc-</span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">VCLUSTER-vcluster -n </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">VCLUSTER --template={{.data.config}} </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> base64 -d</span></span>\n<span class="line"><span style="color:#676E95;">#将集群名称 test-deployment-runtime 替换变量 $VCLUSTER 为例</span></span>\n<span class="line"><span style="color:#A6ACCD;">kubectl get secret vc-test-deployment-runtime-vcluster -n test-deployment-runtime --template={{.data.config}} </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> base64 -d</span></span>\n<span class="line"></span></code></pre></div><div class="language-yaml"><button class="copy"></button><span class="lang">yaml</span><pre><code><span class="line"><span style="color:#676E95;"># 将 ID-Token 替换 kubeconfig 文件中的 users 配置</span></span>\n<span class="line"><span style="color:#F07178;">apiVersion</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">v1</span></span>\n<span class="line"><span style="color:#F07178;">clusters</span><span style="color:#89DDFF;">:</span></span>\n<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">cluster</span><span style="color:#89DDFF;">:</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">certificate-authority-data</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUJkekNDQVIyZ0F3SUJBZ0lCQURBS0JnZ3Foa2pPUFFRREFqQWpNU0V3SHdZRFZRUUREQmhyTTNNdGMyVnkKZG1WeUxXTmhRREUyTnprd05UUTNNamt3SGhjTk1qTXdNekUzTVRJd05USTVXaGNOTXpNd016RTBNVEl3TlRJNQpXakFqTVNFd0h3WURWUVFEREJock0zTXRjMlZ5ZG1WeUxXTmhRREUyTnprd05UUTNNamt3V1RBVEJnY3Foa2pPClBRSUJCZ2dxaGtqT1BRTUJCd05DQUFRQlZEV2NVRmRLVHFJbEMzbktiYVU2Qmo0eTlZenRNbzNIMkN1ZlpteDMKaitMQUk0Rmh5R2p5UjhxeUhQb0FHcnhVVTVpOTgxc2lUbmVWV3pPYmFRMDRvMEl3UURBT0JnTlZIUThCQWY4RQpCQU1DQXFRd0R3WURWUjBUQVFIL0JBVXdBd0VCL3pBZEJnTlZIUTRFRmdRVVk4NjdIUm92ZWlzUFBhTmgzUzVoClBiNkg0cGN3Q2dZSUtvWkl6ajBFQXdJRFNBQXdSUUloQUlyMTFvZGlOcE52cTN0ZkxPWmRKNEMwMWVOZXR5TDgKUStFKzVxYjdUaTFOQWlCVmZiUFRaQmF0MjlpanRiOUpuUWZ6NnVoYkt6cVRrVUpraWZLbXpvK3p4dz09Ci0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K</span></span>\n<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;"># 根据实际情况修改 kubernetes 的 server 地址</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">server</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://10.204.118.216:32056</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">local</span></span>\n<span class="line"><span style="color:#F07178;">contexts</span><span style="color:#89DDFF;">:</span></span>\n<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">context</span><span style="color:#89DDFF;">:</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">cluster</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">local</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">namespace</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">default</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">user</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">user</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Default</span></span>\n<span class="line"><span style="color:#F07178;">current-context</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Default</span></span>\n<span class="line"><span style="color:#F07178;">kind</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Config</span></span>\n<span class="line"><span style="color:#F07178;">preferences</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>\n<span class="line"><span style="color:#F07178;">users</span><span style="color:#89DDFF;">:</span></span>\n<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">user</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">user</span><span style="color:#89DDFF;">:</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">token</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ4ZGU5MDdiYWNiNDE2NjE3MDk3MTc4ZDg4NzgxYTU4ZjdiN2NmY2EifQ.eyJpc3MiOiJodHRwczovL2RleC5ibHV6aW4uaW86OTA4MCIsInN1YiI6IkNnSXhNaElHWjJsMGJHRmkiLCJhdWQiOiJwbGF0Zm9ybSIsImV4cCI6MTY4MDU5NDIzMCwiaWF0IjoxNjgwNTA3ODMwLCJhdF9oYXNoIjoidHFJa1E0QlI4NHg5dkJvQzBIUTFLQSIsImNfaGFzaCI6InRjZkc3Z3RJUURaX1NnczNWS1dFbWciLCJlbWFpbCI6ImxpdWp1bmhvbmdAdmlzcHJhY3RpY2UuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImdyb3VwcyI6WyJ5dW50aSIsIm5hdXRlcy1sYWJzIiwidGVrdG9uY2QiLCJkZXYtdGVuYW50IiwidGVzdC1wcm9kdWN0LTAzMTgiLCJ0ZXN0LXByb2R1Y3QtMDMxOC1CIiwieXVudGkvc3ViZ3JvdXAiLCJ5dW50aS9zdWJncm91cC9zdWJzdWJncm91cCJdLCJuYW1lIjoibGl1anVuaG9uZyIsInByZWZlcnJlZF91c2VybmFtZSI6ImxpdWp1bmhvbmcifQ.B6Aph154ziVkQvUGsAFNYj8aCGHLFSHfIkb0GHW80ivFW57lRtPlQ2zj4o0gr6LHFcSgrPuA8tCMnZCI1XSRargJDyAVEyK4athUdOS3QLU5B-ukrn21Ne5uPQfEDsu8CA26j3I32ceTW5USGRpOXebUER0ZGNG7qRaqcholx-NhYo0XFea_szQct7NBJbIA3e-NwdL1oR7sRgqce2iJpl2lpeSrDhDJvbHGUtwavM25n1yKWGBPX21od5WIp2OSYGnMjD3KhDvl40mTxmx8foBJ49f11Y2oB4tgnB269Zk5PPymYDj-6c3XcbV5kYfIRwTjJkrcgmYvXBdOpHfDrQ</span></span>\n<span class="line"></span></code></pre></div><div class="language-Shell"><button class="copy"></button><span class="lang">Shell</span><pre><code><span class="line"><span style="color:#676E95;"># 切换集群为上文修改后的 kubeconfig 文件</span></span>\n<span class="line"><span style="color:#C792EA;">export</span><span style="color:#A6ACCD;"> KUBECONFIG=/opt/vcluster/kubeconfig-dex.yaml</span></span>\n<span class="line"><span style="color:#676E95;"># 使用kubectl命令行管理被授权的资源，以下命令行仅为示例</span></span>\n<span class="line"><span style="color:#A6ACCD;">kubectl get deployment -n deployment-runtime-1</span></span>\n<span class="line"><span style="color:#A6ACCD;">kubectl delete deployment deployment-test -n deployment-runtime-1</span></span>\n<span class="line"></span></code></pre></div>',22)];const c=s(o,[["render",function(s,l,p,o,c,t){return n(),a("div",null,e)}]]);export{p as __pageData,c as default};
