---
outline: deep
---
# 清理环境
本文档将描述清理 IT 系统部署运行环境的执行过程。包括以下步骤：  

[前提条件](#前提条件)  
[销毁部署应用的运行环境](#销毁部署应用的运行环境)  
[销毁部署应用的物理集群](#销毁部署应用的物理集群)  
[销毁部署应用的虚拟集群](#销毁部署应用的虚拟集群)  
[销毁环境](#销毁环境)  
> 根据 [部署第一个应用](quickstart-01.md) 过程中注册的集群类型，决定是否执行“销毁部署应用的物理集群、销毁部署应用的虚拟集群”步骤以销毁集群。

## 前提条件
在指定集群中成功安装 IT 系统的部署运行时环境，并且在运行时环境中成功部署应用。

## 销毁部署应用的运行环境
下文将描述通过命令行销毁 IT 系统运行环境的 Kubernetes 资源文件。

先克隆 [配置模板库](https://gitlab.bluzin.io/nautes-labs/cli.git) 的代码库到本地，批量替换“examples/demo-product.yaml”中的变量 suffix，并更新 Environment 资源的 cluster 值为运行集群的名称。下载 [命令行工具](https://gitlab.bluzin.io/nautes-labs/cli.git)，执行以下命令。命令执行成功后，将删除 GitLab 代码库中对应的 Kubernetes 资源文件，并基于这些文件在 GitLab 中删除与IT系统相关的群组和代码库、以及在指定运行集群上销毁 IT 系统的部署运行时环境。
```Shell
# “examples/demo-product.yaml” 指配置模板库中模板文件的相对路径
# gitlab-access-token 是 GitLab 访问令牌
# api-server-address 是 API Server 的访问地址
nautes remove -f examples/demo-product.yaml -t $gitlab-access-token -s $api-server-address
```
> GitLab 账号的注意事项，与 [注册部署应用的运行环境](quickstart-01.md#准备部署应用的运行环境) 相同。

## 销毁部署应用的物理集群
> 请确保已成功安装用于部署应用的物理集群。

下文将描述如何销毁部署应用的物理集群。

先克隆 [注册集群模板](https://gitlab.bluzin.io/nautes-labs/cli.git) 代码库到本地，并替换“examples/demo-cluster-physical-worker.yaml”模板文件的相关变量。下载 [命令行工具](https://gitlab.bluzin.io/nautes-labs/cli.git)，并执行以下命令。命令执行成功后，将会销毁物理集群。  
```Shell
# examples/demo-cluster-host.yaml 是在模板代码库中模板文件的相对路径
# gitlab-access-token 是 GitLab 访问令牌
# api-server-address 是 API Server 的访问地址
nautes remove -f examples/demo-cluster-physical-worker.yaml -t $gitlab-access-token -s $api-server-address
```
> GitLab 账号、API Server 的注意事项，与 [注册部署应用的物理集群](quickstart-01.md#注册部署应用的物理集群) 相同。


## 销毁部署应用的虚拟集群
> 请确保已成功安装用于部署应用的虚拟集群。

下文将描述如何销毁部署应用的虚拟集群。

1. 执行命令行销毁虚拟集群。步骤与 [销毁部署应用的物理集群](#销毁部署应用的物理集群) 类似，使用 [注册集群模板](https://gitlab.bluzin.io/nautes-labs/cli.git) 代码库中“examples/demo-cluster-virtual-worker.yaml”模板文件。
```Shell
nautes remove -f examples/demo-cluster-virtual-worker.yaml -t $gitlab-access-token -s $api-server-address
```
2. 执行命令行销毁虚拟集群所属的宿主集群，步骤与 [销毁部署应用的物理集群](#销毁部署应用的物理集群) 类似，使用 [注册集群模板](https://gitlab.bluzin.io/nautes-labs/cli.git) 代码库中“examples/demo-cluster-host.yaml”模板文件。
```Shell
nautes remove -f examples/demo-cluster-host.yaml -t $gitlab-access-token -s $api-server-address
```
命令执行成功后，将会销毁虚拟集群及所属的宿主集群。

## 销毁环境
详情参考 [安装部署](quickstart-03.md#销毁环境)。