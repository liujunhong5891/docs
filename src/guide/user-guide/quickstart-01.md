---
outline: deep
---
# 创建运行时环境

本文档将描述创建部署运行时的执行过程。包括以下步骤：  
[安装部署](#安装部署)  
[注册部署运行时集群](#注册部署运行时集群)  
[提交产品配置清单](#提交产品配置清单)  
[提交部署配置清单](#提交部署配置清单)  
[跟踪部署过程和结果](#跟踪部署过程和结果)


## 安装部署

详情参考 [安装部署](quickstart-03.md)。

## 注册部署运行时集群

待补充。

## 提交产品配置清单
支持通过 Nautes CLI 提交产品、环境、项目、代码库、部署运行时等资源文件，这些资源文件组成了“产品配置清单”。提交成功后，将根据产品配置清单向部署运行时集群实施部署，以安装产品的部署运行时环境。

1. 克隆 [产品配置库模板](https://gitlab.bluzin.io/nautes-labs/cli.git) 的代码库到本地，批量替换产品配置库模板中的变量 suffix。

2. 下载 [命令行工具](https://gitlab.bluzin.io/nautes-labs/cli.git)，执行以下命令。其中，“examples/demo.yaml” 指存储产品配置库模板的代码库的相对路径，gitlab-access-token 是您的 GitLab 访问令牌，api-server-address 是 [Nautes API Server 的访问地址](quickstart-03.md#查看组件信息)。执行成功后，将生成产品配置清单，并自动安装产品的部署运行时环境。
```Shell
nautes apply -f examples/demo.yaml -t $gitlab-access-token -s $api-server-address
```

## 提交部署配置清单
部署产品的资源清单，简称为“部署配置清单”，例如 deployment、service 等资源。通过 Git CLI 提交部署配置清单到产品的代码库，产品的部署运行时环境将监听这个代码库以实施产品部署。

1. 克隆 [部署示例](https://github.com/liujunhong5891/demo-user-deployments) 代码库到本地。

2. 修改本地代码库中 ingress 资源的域名。本示例代码库中 ingress 的相对路径为 /deployment/test/devops-sample-svc.yaml。
```yaml
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ks-sample-dev
spec:
  rules:
  # 根据部署运行时集群的IP地址，替换host的域名。将“119-8-58-20”替换为部署运行时集群的访问IP，“.”或者“-”字符替换IP的连接符以表示域名。
  - host: devops-sample.119-8-118-217.nip.io
    http:
      paths:
      ...
```

3. 修改本地 Git 客户端配置，将产品的 GitLab 代码库设置为远程仓库。
```Shell
# 以下为产品的 GitLab 代码库，用于存储产品的部署配置清单
git remote set-url origin ssh://git@gitlab.bluzin.io:2222/liujunhong/liujh-deployment.git
```

4. 提交部署配置清单到产品的代码库。Git CLI 详情参考 [GitLab](https://docs.gitlab.com/ee/tutorials/make_your_first_git_commit.html)。


## 跟踪部署过程和结果
在部署产品的过程中或部署完成后，可以通过 ArgoCD 控制台或者 kubectl 命令行来跟踪部署过程和结果。这两种方式均支持单点登录，方便用户管理被授权的产品资源。详情参考 [跟踪部署过程和结果](user-guide-06.md)。