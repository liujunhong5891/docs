## 简介

通常，一个业务系统由多个微服务组成，每个微服务的代码存储在各自的代码库中。在本系统中，“产品”用于表示一个业务系统，“项目”用于表示一个微服务。一个业务系统可以包含多个微服务，因此一个产品可以包含多个项目。每个微服务的代码库都属于相应的项目。

在实施 CI/CD 活动时，所有活动都基于产品和项目的基础上进行。这意味着需要维护产品和项目等信息，以供实施 CI/CD 活动使用。这些信息必须与业务系统的微服务架构保持一致。同时，本系统遵循 GitOps 原则构建实施 CI/CD 活动的平台。配置清单的存储位置和基于配置清单的集群部署位置等，是通过代码库（目前版本仅支持 gitlab）和环境来体现的。代码库和环境需要与产品关联，以建立产品间的权限边界。

在实施 CI/CD 活动过程中，用户可以是产品或项目的成员。用户在哪些业务系统中具有权限和角色是由其所属的产品或项目决定的。

下面将详细介绍维护产品的操作步骤和业务规则，帮助读者更好地理解本系统的特性。

## 维护产品（API 接口）
维护产品有多种方式，包括命令行、API 接口等。下文将描述通过 API 接口的方式维护产品。

### 创建产品
在开展 CI/CD 活动之前，需要先创建一个新的产品。
以下是创建产品的步骤：
1. 访问 Swagger UI，选择右上角 select a definition 下拉框中的 api.product.v1.Product；选择 POST 接口，点击 try it out，在 product_name 参数中输入产品名称，点击 execute，生成 API 请求的代码示例；  
   ```Shell
   # 由于本系统暂时只支持 GitLab 的代码库，因此去掉了 GitHub 相关参数； 
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
