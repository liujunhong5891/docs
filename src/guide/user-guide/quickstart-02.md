---
outline: deep
---
# 销毁运行时环境
本文档将描述销毁部署运行时环境、以及销毁管理服务器的执行过程。包括以下步骤：  

[前提条件](#前提条件)  
[删除产品配置清单](#删除产品配置清单)  
[销毁部署运行时集群](#销毁部署运行时集群)  
[销毁服务器](#销毁服务器)  


## 前提条件
已成功安装产品的部署运行时环境，并且在该部署运行时环境中成功部署产品。

## 删除产品配置清单
支持通过 Nautes CLI 删除产品配置清单，包括部署运行时、代码库、项目、环境、产品。

1. 克隆 [产品配置库模板](https://gitlab.bluzin.io/nautes-labs/cli.git) 的代码库到本地，批量替换产品配置库模板中的变量 suffix。
2. 下载 [命令行工具](https://gitlab.bluzin.io/nautes-labs/cli.git)，执行以下命令。其中，“examples/demo.yaml” 指存储产品配置库模板的代码库的相对路径，gitlab-access-token 是您的 GitLab 访问令牌，api-server-address 是 [Nautes API Server 的访问地址](quickstart-03.md#查看组件信息)。执行成功后，将删除产品配置清单，并销毁产品的部署运行时环境。
```Shell
nautes remove -f examples/demo.yaml -t $gitlab-access-token -s $api-server-address
```

## 销毁部署运行时集群
待补充。

## 销毁服务器
详情参考 [销毁服务器](quickstart-03.md#销毁步骤)。