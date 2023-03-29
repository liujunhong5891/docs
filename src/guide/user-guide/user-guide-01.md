---
outline: deep
---

## 简介

在微服务架构中，一个IT系统由多个微服务组成，每个微服务有独立的代码库。在Nautes中，“产品”表示一个IT系统，“项目”表示一个微服务。因此，一个产品可以包含多个项目，每个项目有独立的代码库。
实施CI/CD活动时，所有操作都基于产品和项目进行。这意味着需要维护与之相关的信息以供实施CI/CD活动使用，并确保这些信息与IT系统的微服务架构保持一致。

由于Nautes是基于GitOps原则构建的IT系统，其核心思想是：使用Git作为单一可信源来管理应用程序部署和基础架构配置，并使得应用程序部署和基础架构配置版本可追溯。当提交更改到Git存储库时，GitOps工具会自动检测并执行相应操作以使集群状态与存储库状态保持一致。
目前，在Nautes中使用GitLab作为Git存储库，并将Kubernetes集群或物理机与环境关联起来。要建立权限边界，则需要将 GitLab 代码库和环境与产品关联起来。

在实施CI/CD活动过程中，用户可以是产品或项目成员。用户拥有哪些权限和角色取决于其所属的产品或项目。

下面将详细介绍如何维护产品以及相关业务规则，帮助读者更好地理解Nautes的特性。

## 维护产品（API 接口）
维护产品有多种方式，包括命令行、API 接口等。下文将描述通过 API 接口的方式维护产品。

### 创建产品
在开展 CI/CD 活动之前，需要先创建一个新的产品。  
以下是创建产品的步骤：
1. 访问 Swagger UI，选择右上角 select a definition 下拉框中的 api.product.v1.Product；选择 POST 接口，点击 try it out，在 product_name 参数中输入产品名称，点击 execute，生成 API 请求的代码示例；  
   ```Shell
   # 由于Nautes暂时只支持 GitLab 的代码库，因此去掉了 GitHub 相关参数； 
   # 实操过程中根据实际情况替换 URL 地址和相关参数； 
   curl -X 'POST' \
    'HTTP://10.204.118.221:32159/api/v1/products/demo-product' \
    -H 'accept: application/json' \
    -H 'Content-Type: application/json' \
    -d '{
    "git": {
        "gitlab": {
            "name": "demo-product",
            "path": "demo-product",
            "visibility": "private",
            "description": "demo-product"
            }
        }
    }'
   ```
2. 访问 GitLab Web UI，获取请求 API 的 access token，作为 API 请求的请求头参数。  
    1）使用您的账号登录 GitLab 之后，在右上角选择您的头像。  
    2）选择 edit profile。  
    3）在左侧边栏中，选择 access tokens。    
    4）输入 access token 的名称和过期日期。  
    5）选择授权给 access token 的权限范围，这里全选即可。  
    6）选择 create personal access token，并将生成的 access token 保存到本地。  
3. 将前置步骤获取的 access token 作为 API 请求的请求头参数，通过 curl 命令，或者 Postman、JMeter 等工具执行 API 请求以新增产品。更新后的 API 请求的代码示例：
   ```Shell
    # 实操过程中根据实际情况替换 URL 地址和相关参数；
    curl -X 'POST' \
    'HTTP://10.204.118.221:32159/api/v1/products/demo-product' \
    -H 'accept: application/json' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer xxxxxxxxxxxxxxxxxxxxxxxxxx' \
    -d '{
    "git": {
        "gitlab": {
            "name": "demo-product",
            "path": "demo-product",
            "visibility": "private",
            "description": "demo-product"
            }
        }
    }'
   ```
    请求成功后，将生成一个产品，同时在 GitLab 中根据产品参数生成对应的 group、以及这个 group 中名称为 default.project 的代码库，一个产品有且只有一个 default.project 代码库。default.project 代码库用于存储产品的环境、项目、资源的配置，根据这些资源文件，系统将自动生成执行 CI/CD 活动的运行时环境。

### 删除产品
由于产品可能关联实施 CI/CD 活动的多种资源，在删除产品之前，需要先删除与该产品相关的所有资源，例如项目、代码库和环境等。通常这种情况发生在产品生命周期结束之后，产品只会剩下一个名称为 default.project 的空代码库。    
以下是删除产品的步骤：
1. 访问 Swagger UI，选择右上角 select a definition 下拉框中的 api.product.v1.Product；选择 DELETE 接口，点击 try it out，在 product_name 参数中输入产品名称，点击 execute，生成 API 请求的代码示例。与 [创建产品的步骤1](#创建产品) 类似，不再赘述。
2. 访问 GitLab Web UI，同样需要获取请求 API 的 access token，作为 API 请求的请求头参数。参见 [创建产品的步骤2](#创建产品)。只有拥有产品的 owner 角色权限或者是 GitLab 管理员权限的用户账号可以删除产品。
3. 将前置步骤获取的 access token 作为 API 请求的请求头参数，通过 curl 命令，或者 Postman、JMeter 等工具执行 API 来删除产品。请求成功后，该产品及其相关资源将被删除，包括 GitLab 中对应的 group 和名称为 default.project 的代码库。


### 查询产品
查询产品有两个 API 接口，分别是查询产品列表、查询产品详情，用于查询用户被授权的产品信息。  
以下是查询产品列表的步骤：
1. 访问 Swagger UI，选择右上角 select a definition 下拉框中的 api.product.v1.Product；选择相对路径是 /api/v1/products 的 GET 接口，点击 try it out，点击 execute，生成 API 请求的代码示例。与 [创建产品的步骤1](#创建产品) 类似，不再赘述。
2. 访问 GitLab Web UI，同样需要获取请求 API 的 access token，作为 API 请求的请求头参数。参见 [创建产品的步骤2](#创建产品)。只有当用户是产品成员时，才能查询到相关产品信息。
3. 将前置步骤获取的 access token 作为 API 请求的请求头参数，通过 curl 命令，或者 Postman、JMeter 等工具执行 API 以查询产品。请求成功后，如果用户是某些产品的成员，将返回产品信息。
   
以下是查询产品详情的步骤：
1. 访问 Swagger UI，选择右上角 select a definition 下拉框中的 api.product.v1.Product；选择相对路径是 /api/v1/products/{productName} 的 GET 接口，点击 try it out，在 product_name 参数中输入产品名称，点击 execute，生成 API 请求的代码示例。与 [创建产品的步骤1](#创建产品) 类似，不再赘述。
2. 其余步骤与“查询产品列表”相同，不再赘述。
