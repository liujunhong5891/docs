---
outline: deep
---
# 维护部署运行时

## 简介

在开始本节之前，请确保您已阅读 [用户指南的概述](user-guide-00.md) 章节，了解 Nautes 的主流程和相关术语；并且已经创建了至少一个产品，以及产品中的一个代码库和一个环境，详情参见 [维护产品](user-guide-01.md)、[维护代码库](user-guide-03.md)、[维护环境](user-guide-04.md)。

部署运行时指将IT系统成功部署到基础设施的状态和行为，确保其能够正常运行并提供所需的功能，这里的基础设施指 Kubernetes 集群。一个产品可以包含多个部署运行时，一个 Kubernetes 集群可以负载多个产品的部署运行时。

下面将详细介绍如何维护部署运行时以及相关规则。维护部署运行时有多种方式，包括命令行、API 接口等，下文将描述通过 API 接口的方式维护部署运行时。

## 维护部署运行时（API 接口）

### 创建部署运行时
产品、环境和代码库创建成功之后，创建部署运行时资源以自动部署产品的运行时环境。步骤如下：  
1. 访问 Swagger UI【补充访问地址】，选择右上角 select a definition 下拉框中的 api.deploymentruntime.v1.Deploymentruntime POST 接口，点击 try it out，在 product_name 参数中输入产品名称，在 deploymentruntime_name 参数中输入部署运行时的名称，点击 execute，生成 API 请求的代码示例。  
2. 获取请求 API 的 access token，作为 API 请求的请求头参数。详情参考 [Personal access tokens](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html)。具有 owner、maintainer、developer、reporter 角色的产品成员，以及 GitLab 管理员都可以创建特定产品的部署运行时。   
3. 将前置步骤获取的 access token 作为 API 请求的请求头参数，通过 curl 命令，或者 Postman、JMeter 等工具执行 API 请求以新增部署运行时。更新后的 API 请求的代码示例：  
   ```Shell
    # 实操过程中根据实际情况替换 URL 地址和相关参数； 
    curl -X 'POST' \
    'HTTP://xxx.xxx.xxx.xxx:xxxxx/api/v1/products/product-demo/deploymentruntimes/dr-demo' \
    -H 'accept: application/json' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer xxxxxxxxxxxxxxxxxxxxxxxxxx' \
    -d '{
        "projects_ref": [
            "project-demo"
        ],
        "manifest_source": {
            "code_repo": "coderepo-demo",
            "target_revision": "master",
            "path": "coderepo-demo"
        },
        "destination": "environment-demo"
    }'    
    ```
    
    请求成功后，将在产品对应的 default.project 代码库中生成关联产品的部署运行时资源文件，并根据部署运行时的配置找到环境关联的部署集群实施自动部署。

    ```yaml
    apiVersion: nautes.resource.nautes.io/v1alpha1
    kind: DeploymentRuntime
    metadata:
        name: dr-demo
        namespace: my-namespace
    spec:
        destination: "environment-demo"
        manifestSource:
            codeRepo: "coderepo-demo"
            path: "/path/to/manifests"
            targetRevision: "master"
        product: "product-demo"
        projectsRef:
            - "project-demo"
    ```

### 更新部署运行时
部署运行时创建成功后，可以修改部署运行时。详情参考 [创建部署运行时](#创建部署运行时) 。
请求成功后，将更新存储在产品对应的default.project 代码库中的部署运行时资源文件，并基于变更后的配置实施自动部署。如果部署运行时已经成功部署到某个部署集群，暂不支持变更 destination，迁移集群功能将在后续版本提供。

### 删除部署运行时
部署运行时是基于产品、代码库、环境等资源的基础上定义的，其他资源对部署运行时没有依赖，因此只要用户有权限即可执行删除操作。步骤如下：  
1. 访问 Swagger UI【补充访问地址】，选择右上角 select a definition 下拉框中的 api.deploymentruntime.v1.Deploymentruntime；选择 DELETE 接口，点击 try it out，在 product_name 参数中输入产品名称，在 deploymentruntime_name 参数中输入部署运行时名称，点击 execute，生成 API 请求的代码示例。详情参考 [创建部署运行时的步骤1](#创建部署运行时) 。
2. 获取请求 API 的 access token，作为 API 请求的请求头参数。详情参考 [Personal access tokens](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html)。具有 owner、maintainer、developer、reporter 角色的产品成员，以及 GitLab 管理员才可以删除特定产品的部署运行时。    
3. 将前置步骤获取的 access token 作为 API 请求的请求头参数，通过 curl 命令，或者 Postman、JMeter 等工具执行 API 来删除部署运行时。请求成功后，部署运行时的资源文件将被删除、运行在部署集群的运行时环境将被销毁。

### 查询部署运行时
查询部署运行时有两个 API 接口，分别是查询部署运行时列表、查询部署运行时详情。  
查询部署运行时列表的步骤如下：  
1. 访问 Swagger UI【补充访问地址】，选择右上角 select a definition 下拉框中的 api.deploymentruntime.v1.Deploymentruntime；选择相对路径是 /api/v1/products/{products_name}/deploymentruntimes 的 GET 接口，点击 try it out，在 product_name 参数中输入产品名称，点击 execute，生成 API 请求的代码示例。详情参考 [创建部署运行时的步骤1](#创建部署运行时) 。
2. 获取请求 API 的 access token，作为 API 请求的请求头参数。详情参考 [Personal access tokens](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html)。具有 owner、maintainer、developer、reporter 角色的产品成员，以及 GitLab 管理员才可以查询特定产品的部署运行时。  
3. 将前置步骤获取的 access token 作为 API 请求的请求头参数，通过 curl 命令，或者 Postman、JMeter 等工具执行 API 以查询代码库。请求成功后，如果用户是产品成员，将返回部署运行时列表。  
   
查询部署运行时详情的步骤如下：  
1. 访问 Swagger UI【补充访问地址】，选择右上角 select a definition 下拉框中的 api.deploymentruntime.v1.Deploymentruntime；选择相对路径是 /api/v1/products/{products_name}/deploymentruntimes/{deploymentruntime_name} 的 GET 接口，点击 try it out，在 product_name 参数中输入产品名称，在 deploymentruntime_name 参数中输入部署运行时名称，点击 execute，生成 API 请求的代码示例。详情参考 [创建部署运行时的步骤1](#创建部署运行时) 。
2. 其余步骤与“查询部署运行时列表”相同，不再赘述。

## 强制提交部署运行时（API 接口）
详情规则参见 [强制提交资源文件（API 接口）](user-guide-03.md)。
```Shell
# 以下示例为创建部署运行时，设置 destination 属性值不合规，启用 insecure_skip_check 参数以强制提交部署运行时的资源文件
curl -X 'POST' \
  'HTTP://xxx.xxx.xxx.xxx:xxxxx/api/v1/products/product-demo/deploymentruntimes/dr-demo?insecure_skip_check=true' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "projects_ref": [
    "project-demo"
  ],
  "manifest_source": {
    "code_repo": "coderepo-demo",
    "target_revision": "master",
    "path": "/path/to/manifests"
  },
  "destination": "environment-demo-invalid"
}'
```