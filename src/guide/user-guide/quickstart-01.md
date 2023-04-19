---
outline: deep
---
# 部署第一个应用

本文档将描述部署一个应用的执行过程。包括以下步骤：  
[安装部署](#安装部署)  
[准备服务器](#准备服务器)  
[注册部署应用的物理集群](#注册部署应用的物理集群)  
[注册部署应用的虚拟集群](#注册部署应用的虚拟集群)  
[准备部署应用的运行环境](#准备部署应用的运行环境)  
[部署应用](#部署应用)  
[查看应用的部署结果](#查看应用的部署结果)  

> “注册部署应用的物理集群、注册部署应用的虚拟集群”，这两个步骤任选其中一步执行成功后，即可进入“准备部署应用的运行环境”步骤。

## 安装部署

以阿里云为例描述在公有云部署 Nautes 的过程，详情参考 [安装部署](quickstart-03.md)。

安装部署成功后，将部署众多组件。其中，GitLab 是租户的代码托管平台，用于存储租户的配置库，IT 系统的源代码、部署配置和流水线代码等。Vault 是一款安全地存储和管理敏感数据的开源工具，可以和 Kubernetes 无缝集成。ArgoCD 是 Kubernetes 原生的持续部署工具，用于自动部署并确保 Kubernetes 集群中的应用程序配置与 Git 存储库中的配置声明一致。Dex 是一个使用 OpenID Connect (OIDC) 协议提供身份验证和授权服务的开源工具，客户端只需要与 Dex 对接一次，即可通过 Dex 访问后端的各种组件。每个租户只有一个租户管理集群，负责初始化该租户的所有运行集群，并协调各种组件，以向目标集群实施自动化部署。


## 准备服务器
下文将以阿里云为例描述如何准备服务器，是部署应用的前提。如果已存在服务器，并且服务器中已安装 Kubernetes 集群，可省略该步骤。  

先创建 ECS 云服务器，详情参考 [云服务器 ECS](https://help.aliyun.com/document_detail/25422.html)。服务器创建成功后，在服务器上安装 K3s，命令如下：
```Shell
# 根据实际情况，替换 --tls-san 参数值为服务器的公网 IP
curl -sfL https://get.k3s.io | INSTALL_K3S_VERSION=v1.21.14+k3s1 INSTALL_K3S_EXEC="--tls-san xxx.xxx.xxx.xxx" sh -s - server --disable servicelb --disable traefik --disable metrics-server
mkdir  ${HOME}/.kube
cp /etc/rancher/k3s/k3s.yaml ${HOME}/.kube/k3s-config
cp /etc/rancher/k3s/k3s.yaml ${HOME}/.kube/config
export KUBECONFIG=${HOME}/.kube/config
```

## 注册部署应用的物理集群
下文将描述如何基于服务器来注册部署应用的物理集群。

先克隆 [注册集群模板](https://gitlab.bluzin.io/nautes-labs/cli.git) 的代码库到本地，并替换“examples/demo-cluster-physical-worker.yaml”模板文件的相关变量。下载 [命令行工具](https://gitlab.bluzin.io/nautes-labs/cli.git)，并执行以下命令。命令执行成功后，会向服务器的集群中安装相关配置，并将该集群托管于管理集群。这时在服务器上的集群作为部署应用的运行集群使用。  
```Shell
# examples/demo-cluster-host.yaml 指在模板代码库中模板文件的相对路径
# gitlab-access-token 指 GitLab 访问令牌
# api-server-address 指 API Server 的访问地址
# 模板文件中的 apiServer、kubeconfig，指安装在服务器上的集群信息。更多参数说明，参见模板文件的注释
nautes apply -f examples/demo-cluster-physical-worker.yaml -t $gitlab-access-token -s $api-server-address
```
> GitLab 安装完成后，请先注册账号，再创建 personal access token。由于注册集群的账号必须拥有租户配置库的写入权限，同时 main 分支默认是保护分支，因此建议设置账号角色为租户配置库的 Maintainer。personal access token，详情参考 [Personal access tokens](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html)。租户配置库的访问地址，详情参考 [查看部署结果](quickstart-03.md#查看部署结果)。
> API Server 支持 http 和 https 协议。如果使用 https，需要导入 pki.crt 证书到执行 API 的服务器。以 Windows 操作系统的本地 PC 机为例，需要导入证书到“受信任的根证书颁发机构”证书目录才能使用 https 协议的 API Server。关于 API Server 的访问地址和 pki.crt 的下载地址，详情参考 [安装部署](quickstart-03.md#查看部署结果)。

## 注册部署应用的虚拟集群
下文将描述如何基于服务器来注册部署应用的虚拟集群。  

先克隆 [注册集群模板](https://gitlab.bluzin.io/nautes-labs/cli.git) 的代码库到本地，并替换“examples/demo-cluster-host.yaml”模板文件的相关变量。下载 [命令行工具](https://gitlab.bluzin.io/nautes-labs/cli.git)，并执行以下命令。命令执行成功后，会向服务器中的集群安装相关配置，并将该集群托管于管理集群。这时在服务器上的集群作为虚拟集群的宿主集群。
```Shell
# 模板文件中的 apiServer、kubeconfig，指安装在服务器上的集群信息。更多参数说明，参见模板文件的注释
nautes apply -f examples/demo-cluster-host.yaml -t $gitlab-access-token -s $api-server-address
```

然后在宿主集群上进一步安装虚拟集群。与前面的步骤类似，模板代码库中模板文件的相对路径是“examples/demo-cluster-virtual-worker.yaml”，当替换变量、执行命令等步骤执行成功之后，会向宿主集群中安装一套虚拟集群，并将虚拟集群托管于管理集群。这时该虚拟集群作为部署应用的运行集群使用。
```Shell
nautes apply -f examples/demo-cluster-virtual-worker.yaml -t $gitlab-access-token -s $api-server-address
```
> GitLab 账号、API Server 的注意事项，与 [注册部署应用的物理集群](#注册部署应用的物理集群) 相同。

## 准备部署应用的运行环境
对于微服务架构的 IT 系统准备部署应用的运行环境。在 Nautes 中，通过 Kubernetes 资源文件定义部署应用的运行环境配置，包括IT系统、微服务、微服务的代码库、IT系统的环境、负载IT系统的运行时环境等。


下文将描述通过命令行提交部署应用的 Kubernetes 资源文件。

先克隆 [配置模板库](https://gitlab.bluzin.io/nautes-labs/cli.git) 的代码库到本地，批量替换“examples/demo-product.yaml”中的变量 suffix，并更新 Environment 资源的 cluster 值为运行集群的名称。下载 [命令行工具](https://gitlab.bluzin.io/nautes-labs/cli.git)，执行以下命令。命令执行成功后，将向 GitLab 代码库中生成 Kubernetes 资源文件，并基于这些文件在 GitLab 生成与IT系统相关的群组和代码库、在指定运行集群上安装 IT 系统的部署运行时环境。
```Shell
# “examples/demo-product.yaml” 指配置模板库中模板文件的相对路径
# gitlab-access-token 是 GitLab 访问令牌
# api-server-address 是 API Server 的访问地址
nautes apply -f examples/demo-product.yaml -t $gitlab-access-token -s $api-server-address
```
> 在 GitLab 中，一个 IT 系统映射一个 group ，每个 group 有一个名称为 default.project 的默认代码库，用于存储 IT 系统运行环境的资源文件。
> GitLab 账号需要拥有 default.project 代码库的写入权限，由于 main 分支默认是保护分支，因此建议设置账号角色为 group 成员的 Maintainer。关于 personal access token，详情参考 [Personal access tokens](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html)。  

## 部署应用
部署 IT 系统的资源清单，简称为“部署配置清单”，例如 deployment、service 等资源。下文将描述通过 Git CLI 提交部署配置清单到IT系统的代码库，IT 系统的部署运行时环境将监听这个代码库以部署应用。

先克隆 [部署示例](https://github.com/liujunhong5891/demo-user-deployments) 代码库到本地，修改本地代码库中 ingress 资源的域名。
```yaml
# 本示例代码库中 ingress 的相对路径为 /deployment/test/devops-sample-svc.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ks-sample-dev
spec:
  rules:
  # 根据运行集群的IP地址，替换host的域名，即将“119-8-58-20”替换为运行集群的IP
  - host: devops-sample.119-8-58-20.nip.io
    http:
      paths:
      ...
```

修改本地 Git 客户端配置，将 IT 系统的 GitLab 代码库设置为远程仓库，再 push 部署配置清单到 IT 系统的代码库。推送成功后，将向 IT 系统的部署运行时环境部署应用。Git CLI 详情参考 [GitLab](https://docs.gitlab.com/ee/tutorials/make_your_first_git_commit.html)。
```Shell
# 以下为产品的 GitLab 代码库，用于存储产品的部署配置清单
git remote set-url origin xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
> 推送部署配置清单的 GitLab 账号需要拥有存储部署配置清单代码库的写入权限。

## 查看应用的部署结果
可以通过 ArgoCD 控制台或者 kubectl 命令行来查看 IT 系统的部署结果，并且只能查看和管理被授权 IT 系统的相关资源。下文将描述如何通过 ArgoCD 查看部署结果。

访问安装在运行集群中的 [ArgoCD 控制台](quickstart-03.md#查看部署结果)，点击 LOG IN VIA DEX 进行统一认证，如果在当前浏览器会话中未登录过 GitLab，那么需要填写 GitLab 账号密码进行登录。登录成功后页面会自动跳转到 ArgoCD 控制台。在 ArgoCD 控制台中将呈现被授权 IT 系统相关的 ArgoCD applications，可以查看和管理相关资源。点击某个 ArgoCD application 卡片，将呈现该 application 的资源清单，可以查看资源的 YAML、事件、日志等，并对该资源执行同步、重启、删除等操作。
点击 ArgoCD 控制台左侧菜单栏的“设置”，可以查看被授权IT 系统相关的 ArgoCD projects。
