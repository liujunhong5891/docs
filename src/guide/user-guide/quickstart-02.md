---
outline: deep
---
# 销毁部署运行时环境
本文档将描述通过 Nautes CLI 销毁产品的部署运行时环境。包括以下步骤：  

[准备前置条件](#准备前置条件)  
[删除产品配置清单](#删除产品配置清单)  
[销毁部署集群](#销毁部署集群)  
[销毁租户管理集群](#销毁租户管理集群)  


## 准备前置条件
在开始本节之前，请确保您已阅读 [用户指南的概述](user-guide-00.md) 章节，了解 Nautes 的主流程和相关术语。此外，请确保已经通过 Nautes 生成产品的部署运行时环境。

## 删除产品配置清单
通过 Nautes CLI 可以自动删除产品配置清单，包括部署运行时、代码库、项目、环境、产品。

1. 克隆存储产品配置库模板的代码库，批量替换资源的参数值，详情参考 [从零安装部署运行时环境](quickstart-01.md)。

2. 将 nautes.exe 【补充下载链接】文件保存在 Windows 操作系统的某个目录下，然后执行以下命令。执行成功后，Nautes 将自动删除产品配置清单，并销毁产品的部署运行时环境。
```cmd
nautes remove -f examples/demo.yaml -t $gitlab-access-token -s $api-server-address
```
其中，"examples/demo.yaml"是存储产品配置库模板的代码库的相对路径，$gitlab-access-token 是您的 GitLab 访问令牌，$api-server-address 是 Nautes API 的访问地址。

## 销毁部署集群
待补充。

## 销毁租户管理集群
待补充。