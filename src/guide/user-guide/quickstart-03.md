---
outline: deep
---

# 自动部署 Nautes

本项目用于辅助用户安装 Nautes 程序，它支持公有云部署，从物理机器部署，从已有的 Kubernets 上部署。

本教程主要讲解如何从公有云部署。

## 使用说明

环境准备：
1. 一台amd64的linux系统，已安装docker, git, bash，并且/opt/out目录没有在使用。
2. 一个阿里云的管理员访问密钥（账号余额要大于100元，否则阿里云的机器无法下发）。

安装步骤
1. 通过git命令把本仓库拉取到本地。
2. 进入到目录。
3. 修改vars.yml里面的内容(必须填写access_key和secret_key)。
4. 执行下面脚本进行安装。
```Shell
sh nautes.sh
```
5. 在/opt/out中获取安装后输出的环境信息。
   - argocd文件中含有argocd的admin密码。
   - gitlab中含有root密码，租户仓库的deploykey私钥。
   - hosts里面有机器的访问信息以及访问密钥。
   - k8s里面包含了租户集群的kubeconfig。
   - pki有所有服务使用的证书以及签发证书的ca。
   - vault里面了vault的unseal key和root token。
   - entrypoint中包含dex, argocd, gitlab, vault的访问地址。