import{_ as e,o as a,c as i,a as l}from"./app.9a886421.js";const t=JSON.parse('{"title":"","description":"","frontmatter":{"outline":"deep"},"headers":[{"level":2,"title":"Nautes 简介","slug":"nautes-简介","link":"#nautes-简介","children":[]},{"level":2,"title":"主流程简介","slug":"主流程简介","link":"#主流程简介","children":[{"level":3,"title":"自动安装租户管理集群及相关组件","slug":"自动安装租户管理集群及相关组件","link":"#自动安装租户管理集群及相关组件","children":[]},{"level":3,"title":"注册部署运行时集群","slug":"注册部署运行时集群","link":"#注册部署运行时集群","children":[]},{"level":3,"title":"提交部署运行时所需的产品配置清单","slug":"提交部署运行时所需的产品配置清单","link":"#提交部署运行时所需的产品配置清单","children":[]},{"level":3,"title":"提交部署清单","slug":"提交部署清单","link":"#提交部署清单","children":[]},{"level":3,"title":"跟踪部署过程和结果","slug":"跟踪部署过程和结果","link":"#跟踪部署过程和结果","children":[]}]}],"relativePath":"guide/user-guide/user-guide-00.md"}'),r={name:"guide/user-guide/user-guide-00.md"},E=[l('<h2 id="nautes-简介" tabindex="-1">Nautes 简介 <a class="header-anchor" href="#nautes-简介" aria-hidden="true">#</a></h2><p>Nautes是一个开源的CI/CD持续交付平台，融合了DevOps理念和GitOps实践。</p><p>具有以下特性：</p><ul><li>统一账号认证和授权，只需登录一次即可在多个异构工具之间使用。</li><li>使用 Git 库作为单一配置库，确保环境配置的一致性和应用变更的可追溯性。</li><li>集成密钥管理工具（Vault），以保护、存储和管理敏感数据。</li><li>使用单一的 Git 配置库，自动化持续部署应用系统及其基础设施，提升部署可靠性。</li><li>可视化跟踪部署链路，以便快速发现和定位问题。</li></ul><h2 id="主流程简介" tabindex="-1">主流程简介 <a class="header-anchor" href="#主流程简介" aria-hidden="true">#</a></h2><p>下文将描述一个租户从零开始到自动实施部署的主流程。主流程执行成功之后的整体效果，如下图所示： <img src="/docs/assets/user-guide-overview-1.84b888a1.png" alt="directive syntax graph"></p><p>每个租户只有一个租户管理集群，该集群负责初始化当前租户的所有运行时集群，并向这些运行时集群安装组件及同步资源。此外，它还协调各种组件，以向运行时集群实施自动化部署。每个租户也只有一个租户配置库。租户管理集群通过监听租户配置库，向当前集群自动更新相关组件和资源。<br> 每个租户可以拥有多个运行时集群，这些运行时集群是承载IT系统运行时环境的真正载体，可以是虚拟集群或者物理集群。</p><p>在Nautes中，对于微服务架构的IT系统，“产品”表示一个IT系统，“项目”表示一个微服务。因此，一个产品包含多个项目，每个项目有独立的代码库。<br> 提交部署运行时的配置清单后，产品分别与 Gitlab 中的 group 和 Kubernetes 集群中的 namespace 对应，Nautes 借助 group 和 namespace 的规则对产品进行权限隔离。<br> 每个产品可以包含多个部署运行时，例如，使用相同部署清单在不同集群所创建出来的功能测试和客户演示环境。同时，在相同集群上也可以承载多个产品的部署运行时环境。</p><p>为了保护敏感信息不被泄露，在 Nautes 中的敏感信息均通过 Vault 存取。</p><p>主流程的步骤如下：</p><ul><li><a href="#nautes-%E7%AE%80%E4%BB%8B">Nautes 简介</a></li><li><a href="#%E4%B8%BB%E6%B5%81%E7%A8%8B%E7%AE%80%E4%BB%8B">主流程简介</a><ul><li><a href="#%E8%87%AA%E5%8A%A8%E5%AE%89%E8%A3%85%E7%A7%9F%E6%88%B7%E7%AE%A1%E7%90%86%E9%9B%86%E7%BE%A4%E5%8F%8A%E7%9B%B8%E5%85%B3%E7%BB%84%E4%BB%B6">自动安装租户管理集群及相关组件</a></li><li><a href="#%E6%B3%A8%E5%86%8C%E9%83%A8%E7%BD%B2%E8%BF%90%E8%A1%8C%E6%97%B6%E9%9B%86%E7%BE%A4">注册部署运行时集群</a></li><li><a href="#%E6%8F%90%E4%BA%A4%E9%83%A8%E7%BD%B2%E8%BF%90%E8%A1%8C%E6%97%B6%E6%89%80%E9%9C%80%E7%9A%84%E4%BA%A7%E5%93%81%E9%85%8D%E7%BD%AE%E6%B8%85%E5%8D%95">提交部署运行时所需的产品配置清单</a></li><li><a href="#%E6%8F%90%E4%BA%A4%E9%83%A8%E7%BD%B2%E6%B8%85%E5%8D%95">提交部署清单</a></li><li><a href="#%E8%B7%9F%E8%B8%AA%E9%83%A8%E7%BD%B2%E8%BF%87%E7%A8%8B%E5%92%8C%E7%BB%93%E6%9E%9C">跟踪部署过程和结果</a></li></ul></li></ul><h3 id="自动安装租户管理集群及相关组件" tabindex="-1">自动安装租户管理集群及相关组件 <a class="header-anchor" href="#自动安装租户管理集群及相关组件" aria-hidden="true">#</a></h3><h3 id="注册部署运行时集群" tabindex="-1">注册部署运行时集群 <a class="header-anchor" href="#注册部署运行时集群" aria-hidden="true">#</a></h3><h3 id="提交部署运行时所需的产品配置清单" tabindex="-1">提交部署运行时所需的产品配置清单 <a class="header-anchor" href="#提交部署运行时所需的产品配置清单" aria-hidden="true">#</a></h3><p>“配置清单”指部署运行时环境所需的资源，包括：环境（负载IT系统部署运行时的被授权集群）、项目（IT系统的某个微服务）、代码库（存储部署配置清单的 GitLab 代码库，简称部署配置库）和部署运行时（IT系统的部署运行时配置）等资源。 有两种方式可以提交配置清单：Nautes-CLI 和 API 接口。使用 Nautes-CLI 的详细步骤参见 [入门指南] 章节，使用 API 接口的详细步骤参见 [用户指南] 章节。<br> 无论使用哪种方式，提交配置清单都有先后顺序：<br> a. 正向新增的顺序：创建产品 -&gt; 创建环境 -&gt; 创建项目 -&gt; 创建代码库 -&gt; 创建部署运行时。<br> b. 反向销毁的顺序：删除部署运行时 -&gt; 删除代码库 -&gt; 删除项目 -&gt; 删除环境 -&gt; 删除产品。<br> 执行提交后，Nautes 将向 GitLab 中名称为 default.project 的代码库提交资源文件，这个代码库属于某个产品，用于存储产品的环境、项目、代码库、运行时等资源。一个产品有且只有一个 default.project 代码库。<br> 提交成功后，Nautes 将根据配置清单向目标集群自动安装相关资源，确保目标集群具备监听部署配置库、并向当前集群自动部署的能力。</p><h3 id="提交部署清单" tabindex="-1">提交部署清单 <a class="header-anchor" href="#提交部署清单" aria-hidden="true">#</a></h3><p>通过 Git-CLI 向部署配置库提交部署配置清单，例如 deployment、service、volume 等资源，Nautes 将根据部署清单进行自动化部署。</p><h3 id="跟踪部署过程和结果" tabindex="-1">跟踪部署过程和结果 <a class="header-anchor" href="#跟踪部署过程和结果" aria-hidden="true">#</a></h3><p>Nautes 部署过程中或者部署完成后，有两种方式可以跟踪部署过程和结果：ArgoCD 控制台和 kubectl。两种方式均支持单点登录，以便访问被授权产品的相关资源。详细步骤参见 [用户指南] 章节。<br> a. 访问 ArgoCD 控制台，管理被授权产品的 ArgoCD application。例如，通过可视化界面查看 ArgoCD application 的部署状态、事件、日志等，删除资源并重新同步资源。<br> b. 通过 kubectl 查看被授权产品的 namespace，并且管理该 namespace 中的资源。例如，使用 kubectl 命令查看 deployment、service 资源的事件、日志等，删除资源等待其重建。</p>',19)];const s=e(r,[["render",function(e,l,t,r,s,u){return a(),i("div",null,E)}]]);export{t as __pageData,s as default};
