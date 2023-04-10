---
outline: deep
---
# 销毁运行时环境
本文档将描述销毁部署运行时环境、以及销毁管理服务器的执行过程。包括以下步骤：  

[前提条件](#前提条件)  
[删除产品配置清单](#删除产品配置清单)  
[销毁基于物理集群的运行时集群](#销毁基于物理集群的运行时集群)    
[销毁基于虚拟集群的运行时集群](#销毁基于虚拟集群的运行时集群)  
[销毁环境](#销毁环境)  


## 前提条件
已成功安装产品的部署运行时环境，并且在该部署运行时环境中成功部署产品。

## 删除产品配置清单
支持通过 Nautes CLI 删除产品配置清单，包括部署运行时、代码库、项目、环境、产品。

1. 克隆 [产品配置库模板](https://gitlab.bluzin.io/nautes-labs/cli.git) 的代码库到本地，批量替换产品配置库模板中的变量 suffix，并更新 Environment 资源的 cluster 的属性值为部署运行时集群的名称。
2. 下载 [命令行工具](https://gitlab.bluzin.io/nautes-labs/cli.git)，执行以下命令。其中，“examples/demo.yaml” 指存储产品配置库模板的代码库的相对路径，gitlab-access-token 是您的 GitLab 访问令牌，api-server-address 是 [Nautes API Server 的访问地址](quickstart-03.md#查看组件信息)。执行成功后，将删除产品配置清单，并在指定集群上销毁产品的部署运行时环境。
```Shell
nautes remove -f examples/demo.yaml -t $gitlab-access-token -s $api-server-address
```

## 销毁基于物理集群的运行时集群
销毁集群之前请先销毁产品配置清单，详情参考 [删除产品配置清单](#删除产品配置清单)。
先克隆 [注册集群模板](https://gitlab.bluzin.io/nautes-labs/cli.git) 代码库到本地，并替换“examples/demo-cluster-physical-worker.yaml”模板文件的相关变量。然后下载 [命令行工具](https://gitlab.bluzin.io/nautes-labs/cli.git)，并执行以下命令。命令执行成功后，将会销毁物理集群。  
```Shell
# examples/demo-cluster-host.yaml 是在模板代码库中模板文件的相对路径
# gitlab-access-token 是 GitLab 访问令牌
# api-server-address 是 API Server 的访问地址
nautes remove -f examples/demo-cluster-physical-worker.yaml -t $gitlab-access-token -s $api-server-address
```

## 销毁基于虚拟集群的运行时集群
销毁集群之前请先销毁产品配置清单，详情参考 [删除产品配置清单](#删除产品配置清单)。
1. 通过命令行销毁虚拟集群。步骤与 [销毁基于物理集群的运行时集群](#销毁基于物理集群的运行时集群) 类似，使用 [注册集群模板](https://gitlab.bluzin.io/nautes-labs/cli.git) 代码库中“examples/demo-cluster-virtual-worker.yaml”模板文件。
```Shell
nautes remove -f examples/demo-cluster-virtual-worker.yaml -t $gitlab-access-token -s $api-server-address
```
2. 通过命令行销毁虚拟集群所属的宿主集群，步骤与 [销毁基于物理集群的运行时集群](#销毁基于物理集群的运行时集群) 类似，使用 [注册集群模板](https://gitlab.bluzin.io/nautes-labs/cli.git) 代码库中“examples/demo-cluster-host.yaml”模板文件。
```Shell
nautes remove -f examples/demo-cluster-host.yaml -t $gitlab-access-token -s $api-server-address
```
命令执行成功后，将会销毁虚拟集群及其宿主集群。

## 销毁环境
详情参考 [安装部署](quickstart-03.md#销毁环境)。