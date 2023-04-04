---
outline: deep
---
# 维护环境

## 简介

在开始本节之前，请确保您已阅读 [用户指南的概述](user-guide-00.md) 章节，了解 Nautes 的主流程和相关术语；并且已经创建了至少一个产品、注册了至少一个部署集群，详情参见 [维护产品](user-guide-01.md)。

环境用于负载产品的部署运行时。一个产品可以包含多个环境，每个环境都需要关联一个 Kubernetes 集群。

下面将详细介绍如何维护环境以及相关规则。维护环境有多种方式，包括命令行、API 接口等，下文将描述通过 API 接口的方式维护环境。

## 维护环境（API 接口）

### 创建环境
产品创建成功之后，创建关联集群的环境以部署指定产品。步骤如下：  
1. 访问 Swagger UI【补充访问地址】，选择右上角 select a definition 下拉框中的 api.environment.v1.Environment；选择 POST 接口，点击 try it out，在 product_name 参数中输入产品名称，在 environment_name  参数中输入环境名称，点击 execute，生成 API 请求的代码示例；  
   ```Shell
    # 实操过程中根据实际情况替换 URL 地址和相关参数； 
    curl -X 'POST' \
    'HTTP://10.204.118.221:32159/api/v1/products/product-demo/environments/environment-demo' \
    -H 'accept: application/json' \
    -H 'Content-Type: application/json' \
    -d '{
            "cluster": "test-deployment-cluster",
            "env_type": "test"
        }'
   ```
2. 获取请求 API 的 access token，作为 API 请求的请求头参数。详情参考 [Personal access tokens](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html)。具有 owner、maintainer、developer、reporter 角色的产品成员，以及 GitLab 管理员都可以创建特定产品的环境。  

3. 将前置步骤获取的 access token 作为 API 请求的请求头参数，通过 curl 命令，或者 Postman、JMeter 等工具执行 API 请求以新增环境。更新后的 API 请求的代码示例：
   ```Shell
    # 实操过程中根据实际情况替换 URL 地址和相关参数； 
    curl -X 'POST' \
    'HTTP://10.204.118.221:32159/api/v1/products/product-demo/environments/environment-demo' \
    -H 'accept: application/json' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer xxxxxxxxxxxxxxxxxxxxxxxxxx' \
    -d '{
            "cluster": "test-deployment-cluster",
            "env_type": "test"
        }'
    ```
    相同产品内的环境不能共享一套 kubernetes 集群，不同产品间的环境可以共享一套 kubernetes 集群。请求成功后，在产品对应的 default.project 代码库中生成关联产品的环境资源文件。

### 更新环境
环境创建成功后，可以修改环境，但相同产品内不同环境关联的集群不能相同。详情参考 [创建环境](#创建环境) 。
请求成功后，将更新存储在产品对应的 default.project 代码库中的环境资源文件。一旦环境负载了产品的部署运行时，则不能修改环境的关联集群，自动部署过程中将拦截请求。

### 删除环境
由于环境可能关联多个资源，在删除环境之前，需要先删除关联该环境的所有相关资源，例如部署运行时等。步骤如下：  
1. 访问 Swagger UI【补充访问地址】，选择右上角 select a definition 下拉框中的 api.environment.v1.Environment；选择 DELETE 接口，点击 try it out，在 product_name 参数中输入产品名称，在 environment_name 参数中输入环境名称，点击 execute，生成 API 请求的代码示例。详情参考 [创建环境的步骤1](#创建环境) 。
2. 获取请求 API 的 access token，作为 API 请求的请求头参数。详情参考 [Personal access tokens](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html)。具有 owner、maintainer、developer、reporter 角色的产品成员，以及 GitLab 管理员才可以删除特定产品的环境。  
3. 将前置步骤获取的 access token 作为 API 请求的请求头参数，通过 curl 命令，或者 Postman、JMeter 等工具执行 API 来删除环境。请求成功后，环境资源文件将被删除。

### 查询环境
查询环境有两个 API 接口，分别是查询环境列表、查询环境详情。  
查询环境列表的步骤如下：  
1. 访问 Swagger UI【补充访问地址】，选择右上角 select a definition 下拉框中的 api.environment.v1.Environment；选择相对路径是 /api/v1/products/{products_name}/environments 的 GET 接口，点击 try it out，在 product_name 参数中输入产品名称，点击 execute，生成 API 请求的代码示例。详情参考 [创建环境的步骤1](#创建环境)。
2. 获取请求 API 的 access token，作为 API 请求的请求头参数。详情参考 [Personal access tokens](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html)。具有 owner、maintainer、developer、reporter 角色的产品成员，以及 GitLab 管理员才可以查询特定产品的环境。
3. 将前置步骤获取的 access token 作为 API 请求的请求头参数，通过 curl 命令，或者 Postman、JMeter 等工具执行 API 以查询代码库。请求成功后，如果用户是产品成员，将返回环境信息。
   
查询环境详情的步骤如下：  
1. 访问 Swagger UI【补充访问地址】，选择右上角 select a definition 下拉框中的 api.environment.v1.Environment；选择相对路径是 /api/v1/products/{products_name}/environments/{enviroment_name} 的 GET 接口，点击 try it out，在 product_name 参数中输入产品名称，在 enviroment_name 参数中输入环境名称，点击 execute，生成 API 请求的代码示例。详情参考 [创建环境的步骤1](#创建环境)。
2. 其余步骤与“查询环境列表”相同，不再赘述。
