---
outline: deep
---
# 注册和销毁集群

在开始本节之前，请确保您已阅读 [主体流程](user-guide-00.md) 章节，了解部署应用的主体流程 和相关术语。同时，确保 Nautes 安装部署成功，详情参见 [安装部署](quickstart-03)。

下文将详细介绍如何注册和销毁基于物理集群的运行时集群、注册和销毁基于虚拟集群的运行时集群。支持通过 API 接口和命令行的方式来注册、销毁集群。

## 注册集群

### 注册基于物理集群的运行时集群（API）
1. 访问 [Swagger UI](quickstart-03.md#查看部署结果)，选择右上角 select a definition 下拉框中的 api.cluster.v1.Cluster。选择 POST 接口，点击 try it out，在 cluster_name 参数中输入集群名称，点击 execute，将生成 API 请求的代码示例。 
2. 访问 [GitLab UI](quickstart-03.md#查看部署结果)，获取请求 API 的 access token，作为 API 的请求头参数。详情参考 [Personal access tokens](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html)。  
3. 将前置步骤获取的 access token 作为 API 的请求头参数，通过 curl 命令，或者 Postman、JMeter 等工具执行 API 请求以注册基于物理集群的运行时集群。请求体的参数注释，详情参考 [注册集群模板](https://gitlab.bluzin.io/nautes-labs/cli.git) 代码库中“examples/demo-cluster-physical-worker.yaml”的文件注释。更新后的 API 请求的代码示例：
   ```Shell
    # 实操过程中根据实际情况替换 URL 地址和相关参数
    curl -X 'POST' \
    'HTTP://10.204.118.221:32159/api/v1/clusters/cluster-physical-demo' \
    -H 'accept: application/json' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer xxxxxxxxxxxxxxxxxxxxxxxxxx' \
    -d '{
      "api_server": "https://xxx.xxx.xxx.xxx:xxxxx",
      "cluster_kind": "kubernetes",
      "cluster_type": "physical",
      "usage": "worker",
      "argocd_host": "https://argocd.cluster-demo.xxx.xxx.xxx.xxx.nip.io",
      "traefik": {
        "http_node_port": "xxxxx",
        "https_node_port": "xxxxx"
      },
      "kubeconfig": |
        apiVersion: v1
          clusters:
          - cluster:
              certificate-authority-data:
        ...
    }'   
   ```
  请求成功后，将向租户管理集群注册指定参数的物理集群作为部署运行时集群，并在物理集群中安装ArgoCD、ArgoRollouts、ExternalSecret、HNC、Vault-agent等组件。

### 注册基于虚拟集群的运行时集群（API）
注册基于虚拟集群的运行时集群分为两步：注册虚拟集群所属的宿主集群、注册虚拟集群。
1. 通过 API 注册宿主集群，步骤与 [注册基于物理集群的运行时集群（API）](#注册基于物理集群的运行时集群api)类似，请求体不同。请求体的参数注释，详情参考 [注册集群模板](https://gitlab.bluzin.io/nautes-labs/cli.git) 代码库中“examples/demo-cluster-host.yaml”的文件注释。
  ```Shell
  curl -X 'POST' \
    'HTTP://10.204.118.221:32159/api/v1/clusters/cluster-host-demo' \
    -H 'accept: application/json' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer xxxxxxxxxxxxxxxxxxxxxxxxxx' \
    -d '{
      "api_server": "https://xxx.xxx.xxx.xxx:xxxxx",
      "cluster_kind": "kubernetes",
      "cluster_type": "physical",
      "usage": "host",
      "traefik": {
        "http_node_port": "xxxxx",
        "https_node_port": "xxxxx"
      },
      "kubeconfig": |
        apiVersion: v1
          clusters:
          - cluster:
              certificate-authority-data:
        ...
    }'   
  ```
  请求成功后，将向租户管理集群注册指定参数的宿主集群，并向宿主集群中安装 traefik 等组件。

2. 通过 API 注册基于虚拟集群的运行时集群，步骤与 [注册基于物理集群的运行时集群（API）](#注册基于物理集群的运行时集群api)类似，请求体不同。请求体的参数注释，详情参考 [注册集群模板](https://gitlab.bluzin.io/nautes-labs/cli.git) 代码库中“examples/demo-cluster-virtual-worker.yaml”的文件注释。
  ```Shell
    # 实操过程中根据实际情况替换 URL 地址和相关参数
    curl -X 'POST' \
    'HTTP://10.204.118.221:32159/api/v1/clusters/cluster-virtual-demo' \
    -H 'accept: application/json' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer xxxxxxxxxxxxxxxxxxxxxxxxxx' \
    -d '{
      "api_server": "https://xxx.xxx.xxx.xxx:xxxxx",
      "cluster_kind": "kubernetes",
      "cluster_type": "virtual",
      "usage": "worker",
      "hostCluster": "cluster-host",
      "argocd_host": "https://argocd.cluster-demo.xxx.xxx.xxx.xxx.nip.io",
      "vcluster": 
        {
          httpsNodePort: "xxxxx"
        }
    }'   
  ```
  请求成功后，将向租户管理集群注册指定参数的虚拟集群作为部署运行时集群，并在虚拟集群中安装ArgoCD、ArgoRollouts、ExternalSecret、HNC、Vault-agent等组件。

### 注册基于物理集群的运行时集群（命令行）
详情参考 [注册基于物理集群的运行时集群](quickstart-01.md#注册部署应用的物理集群)。

### 注册基于虚拟集群的运行时集群（命令行）
详情参考 [注册基于虚拟集群的运行时集群](quickstart-01.md#注册部署应用的虚拟集群)。

## 销毁集群

### 销毁基于物理集群的运行时集群（API）
由于集群可能负载了产品的运行时环境，在销毁集群之前请先销毁产品配置清单，详情参考 [删除产品配置清单](quickstart-02.md#销毁部署应用的运行环境)。当基于物理集群的运行时集群注册成功后，可以通过 API 销毁集群。  
1. 访问 [Swagger UI](quickstart-03.md#查看部署结果)，选择右上角 select a definition 下拉框中的 api.cluster.v1.Cluster。选择 DELETE 接口，点击 try it out，在 cluster_name 参数中输入集群名称，点击 execute，生成 API 请求的代码示例。与 [注册基于物理集群的运行时集群（API）](#注册基于物理集群的运行时集群api) 的步骤1类似。
2. 获取请求 API 的 access token，作为 API 请求的请求头参数。详情参考 [注册基于物理集群的运行时集群（API）](#注册基于物理集群的运行时集群api) 的步骤2。
3. 将前置步骤获取的 access token 作为 API 请求的请求头参数，通过 curl 命令，或者 Postman、JMeter 等工具执行 API 来销毁集群。请求成功后，该集群将被销毁。

### 销毁基于虚拟集群的运行时集群（API）
销毁集群之前请先销毁产品配置清单，详情参考 [删除产品配置清单](quickstart-02.md#销毁部署应用的运行环境)。
当基于虚拟集群的运行时集群注册成功后，可以通过 API 销毁集群。与注册虚拟集群的步骤相反，包括两步：销毁虚拟集群、销毁虚拟集群所属的宿主集群。
1. 通过 API 销毁虚拟集群。步骤与 [销毁基于物理集群的运行时集群（API）](#销毁基于物理集群的运行时集群api)类似，请求体与 [注册基于虚拟集群的运行时集群（API）](#注册基于虚拟集群的运行时集群api)的步骤2相同。
2. 通过 API 销毁虚拟集群所属的宿主集群。步骤与 [销毁基于物理集群的运行时集群（API）](#销毁基于物理集群的运行时集群api)类似，请求体与 [注册基于虚拟集群的运行时集群（API）](#注册基于虚拟集群的运行时集群api)的步骤1相同。
请求成功后，虚拟集群及其宿主集群将被销毁。

### 销毁基于物理集群的运行时集群（命令行）
详情参考 [销毁基于物理集群的运行时集群](quickstart-02.md#销毁部署应用的物理集群)。

### 销毁基于虚拟集群的运行时集群（命令行）
详情参考 [销毁基于虚拟集群的运行时集群](quickstart-02.md#销毁部署应用的虚拟集群)。

