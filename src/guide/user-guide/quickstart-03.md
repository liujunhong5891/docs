---
outline: deep
---

# 安装部署
本文档描述如何安装部署，支持基于公有云、物理机、Kubernets 集群进行部署。
下文主要描述如何基于公有云部署。

## 环境准备
1. 一台 CPU 为 AMD64、操作系统为 Linux 的服务器，已安装 Docker、Git、Bash 等工具，并且 /opt/nautes 目录没有被使用。
2. 一个阿里云的管理员访问密钥。详情参考 [创建 AccessKey](https://help.aliyun.com/document_detail/116401.html)。
3. 受限于阿里云的账号管理规则，账号余额至少大于 100 元，否则阿里云的机器无法下发部署。
   
## 安装步骤
1. 通过 Git CLI 克隆 [installer](https://gitlab.bluzin.io/nautes-labs/installer) 代码库到本地。
2. 进入到根目录，修改 vars.yaml 文件，其中 access_key、secret_key、oauth_secret_key 是必填项。
3. 执行 start.sh 脚本开始安装。
安装部署成功后，将在 /opt/nautes 目录下将生成安装成功的组件信息。详情参考 [查看组件信息](#查看组件信息) 。

## 查看组件信息
在 /opt/nautes 目录下存储了已安装组件的相关信息，包含多个子目录，详情如下：
- argocd：ArgoCD 的 admin 密码。
- gitlab：root 密码，租户配置库的 deploykey 私钥。
- hosts：服务器的访问 IP 和访问密钥。
- k8s：租户管理集群的 kubeconfig 文件。
- pki：相关组件需要使用的证书和签发证书的 CA。
- vault：Vault 的 unseal key、root token。
- service：组件的访问地址。包括：租户管理集群、ArgoCD、Vault、GitLab、Nautes API Server 的访问地址。

## 销毁步骤
前提：安装部署成功后，已存在 /opt/nautes 目录、nautes-installer 容器。
1. 通过 Git CLI 克隆 [installer](https://gitlab.bluzin.io/nautes-labs/installer) 代码库到本地。
2. 进入到根目录，修改 vars.yaml 文件，其中 access_key、secret_key、oauth_secret_key 是必填项。
3. 执行 destroy.sh 脚本开始销毁。
销毁成功后，将销毁整台服务器，不支持通过脚本单独卸载特定组件。