---
outline: deep
---
## 从零安装部署运行时环境

本文档将描述从零开始安装集群到自动执行部署的执行过程。包括以下步骤：  
[准备前置条件](#准备前置条件)  
[安装租户管理集群](#安装租户管理集群)  
[注册部署集群](#注册部署集群)  
[提交产品配置清单](#提交产品配置清单)  
[提交部署配置清单](#提交部署配置清单)  
[跟踪部署过程和结果](#跟踪部署过程和结果)

### 准备前置条件
在开始本节之前，请确保您已阅读 [用户指南的概述](user-guide-00.md) 章节，了解 Nautes 的主流程和相关术语。

### 安装租户管理集群

待补充。

### 注册部署集群

待补充。

### 提交产品配置清单
通过 Nautes CLI 可以自动提交产品、环境、项目、代码库、部署运行时等资源文件，这些资源文件组成了“产品配置清单”。提交成功后，Nautes 将监听产品配置清单向部署集群实施自动部署，以安装产品的部署运行时环境。

1. 克隆存储产品配置库模板的代码库，批量替换资源的参数值。产品配置库模板的内容如下：
```yaml
# 产品
# 批量替换 spec.name、spec.git.gitlab.name、spec.git.gitlab.path、spec.git.gitlab.description等参数值
apiVersion: nautes.resource.nautes.io/v1alpha10329
kind: Product
spec:
  name: demo-0329
  git:
    gitlab:
      # 产品名称
      name: demo-0329
      # 产品路径
      path: demo-0329
      visibility: private
      description: demo-0329
      parentID: 0
---
# 环境
# 批量替换 spec.name、spec.product等参数值 
apiVersion: nautes.resource.nautes.io/v1alpha1
kind: Environment
spec:
  # 环镜名称
  name: env-demo-0329
  # 环境所属的产品
  product: demo-0329
  # 环境关联的集群
  cluster: test-deployment-runtime
  envType: dev
---
# 项目
# 批量替换 spec.name、spec.product等参数值
apiVersion: "nautes.resource.nautes.io/v1alpha1"
kind: Project
spec:
  # 项目名称
  name: project-demo-0329
  # 项目所属的产品
  product: demo-0329
  language: golang
---
# 代码库，后续用于存储产品的部署配置清单
# 批量替换 spec.name、spec.product、spec.project、spec.git.gitlab.name、spec.git.gitlab.path、spec.git.gitlab.description
apiVersion: nautes.resource.nautes.io/v1alpha1
kind: CodeRepo
spec:
  # 代码库名称
  name: coderepo-demo-0329
  deploymentRuntime: true
  pipelineRuntime: false
  # 代码库所属的产品
  product: demo-0329
  # 代码库所属的项目
  project: project-demo-0329
  webhook:
    events: ["push_events"]
    isolation: shared
  git:
    gitlab:
      # 代码库名称
      name: coderepo-demo-0329
      # 代码库路径
      path: coderepo-demo-0329 
      visibility: private
      description: coderepo-demo-0329 
---
# 部署运行时
# 批量替换 spec.name、spec.destination、spec.manifestsource.codeRepo、spec.product、spec.projectsRef
apiVersion: nautes.resource.nautes.io/v1alpha1
kind: DeploymentRuntime
spec:
  # 部署运行时名称
  name: dr-demo-0329
  # 部署运行时的目标集群，这里指部署集群
  destination: env-demo-0329
  manifestsource:
    # 部署运行时监听的代码库
    codeRepo: coderepo-demo-0329
    # 部署运行时监听的代码库相对路径
    path: deployments
    # 部署运行时监听的代码库版本或代码库分支
    targetRevision: main
  product: demo-0329
  projectsRef:
    - project-demo-0329
```
2. 将 nautes.exe【补充下载路径】 文件保存在 Windows 操作系统的某个目录下，然后执行以下命令。执行成功后，Nautes 将生成产品配置清单，并自动安装产品的部署运行时环境。其中，“examples/demo.yaml”是存储产品配置库模板的代码库的相对路径，gitlab-access-token 是您的 GitLab 访问令牌，api-server-address 是 Nautes API 的访问地址。
```cmd
nautes apply -f examples/demo.yaml -t $gitlab-access-token -s $api-server-address
```

### 提交部署配置清单

通过 Git CLI 提交产品的部署配置清单，例如 deployment、service、volume 等资源。提交成功后，Nautes 将部署配置清单自动同步到产品的部署运行时环境，并执行自动部署。详情参考 [GitLab](https://docs.gitlab.com/ee/tutorials/make_your_first_git_commit.html)。

### 跟踪部署过程和结果
在部署产品的过程中或部署完成后，可以通过 ArgoCD 控制台或者 kubectl 命令行来跟踪部署过程和结果。这两种方式均支持单点登录，方便用户管理被授权的产品资源。详情参考 [跟踪部署过程和结果](user-guide-06.md)。