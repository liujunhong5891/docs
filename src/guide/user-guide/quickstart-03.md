---
outline: deep
---

# 安装部署
Nautes 支持基于公有云、私有云、主机、及 Kubernets 集群进行部署，下文以阿里云为例描述在公有云部署 Nautes 的过程。

## 准备环境
- 部署机：AMD64架构的 Linux 服务器，需要预先安装 Docker、Git、Bash，并确保 /opt/nautes 目录没有被占用。
- 公有云密钥：一个阿里云账号的访问密钥。详情参考 [创建 AccessKey](https://help.aliyun.com/document_detail/116401.html)。

注：由于部署程序默认是采用按量计费模式申请云资源，受阿里云的计费规则限制，请确保上述阿里云账号的余额大于100元人民币，否则部署程序无法调用阿里云的API申请资源。

## 执行部署
1. 在部署机上克隆安装程序的项目：
```bash
git clone https://github.com/nautes-labs/installer.git
```
2. 修改项目根目录下的 vars.yaml 文件，其中 access_key 和 secret_key 必须填写为阿里云账号的 AccessKey，其他变量可采用默认值。
3. 执行 start.sh 脚本开始部署：
```bash
sh start.sh
```
由于需要部署的组件较多，整个部署过程预计耗时30~40分钟，部署成功后，您可以在在 /opt/nautes 目录下找到部署后的组件信息。如果部署失败，您可以通过日志文件 /opt/nautes/out/log 排查问题。

## 查看部署结果
/opt/nautes/management 是租户配置库的本地副本。

/opt/nautes/terraform 是 terraform 的状态文件，记录了部署程序在阿里云上申请的资源清单。

/opt/nautes 中存储了已部署组件的相关信息，包含多个子目录：

- argocd：ArgoCD 的管理员密码。
- gitlab：GitLab 的管理员密码，以及部署过程中所生成的租户配置库、访问密钥等信息。
- hosts：云服务器的 IP 地址和访问密钥。
- kubernetes：租户管理集群的 kubeconfig，以及 dex 的客户端密钥。
- pki：访问组件需要使用的证书和签发证书的 CA。
- vault：Vault 的 unseal key 和 root token。
- service：租户管理集群、Dex、ArgoCD、Vault、GitLab、Nautes API Server 的访问地址。

## 销毁环境
注：请确保已成功执行部署，部署机上存在 /opt/nautes 目录，且 nautes-installer 容器在运行中。
1. 在部署机上克隆安装程序的项目：
```bash
git clone https://github.com/nautes-labs/installer.git
```
2. 修改项目根目录下的 vars.yaml 文件，填写 access_key 和 secret_key。
3. 执行 destroy.sh 脚本开始销毁环境：
```bash
sh destroy.sh
```
销毁程序将删除所有从云服务中申请的资源，暂不支持单独卸载组件。