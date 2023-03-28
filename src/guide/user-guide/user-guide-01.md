## xxxx概述

通常一个业务系统包含多个微服务，而这些微服务的代码存储于代码库中。在这个系统中，使用产品表示一个业务系统，使用项目表示微服务，由于一个业务系统可以包含多个微服务，因此一个产品可以包含多个项目，每个微服务的代码库都归属于相应的项目。
在实施 CI/CD 活动时，所有活动都是建立在产品和项目的基础之上的，意味着需要根据业务系统的微服务架构维护产品、项目等信息，供实施 CI/CD 活动使用。同时，本系统遵循 gitops 原则构建实施 CI/CD 活动的平台，配置清单的存储位置、基于配置清单向哪个集群部署等，在本系统中通过代码库（当前版本仅支持 gitlab）和环境来体现，当然这些代码库和环境也需要和产品建立关系，以建立产品之间的权限边界。
在实施 CI/CD 活动过程中，受限于产品或者项目的权限约束，用户账号可以是产品成员或者项目成员，决定了这个用户具备哪些业务系统的权限、在这些业务系统中担任什么角色。

## 维护产品
维护产品有多种方式，包括命令行、API 接口等。下文将描述通过 API 接口的方式维护产品。

### 创建产品
在开展 CI/CD 活动之前，需要先创建一个新的产品。
以下是创建产品的步骤：
1. 访问 Swagger UI 地址，选择右上角 select a definition 下拉框中的 api.product.v1.Product；选择 POST 接口，点击 try it out，输入 product_name 参数，点击 execute，生成 API 请求的代码示例；  
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
    5）选择授权给 access token 权限范围，这里全选即可。
    6）选择 create personal access token，本地保存生成的 access token。
3. 将前置步骤获取的 access token 作为 API 请求的请求头参数，通过 curl 命令，或者 Postman、JMeter 等工具执行 API 以新增产品。更新后的 API 请求的代码示例：
   ```Shell{6}
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
   成功执行 API 请求之后，系统将生成一个产品，同时在 GitLab 中根据产品参数生成对应的 group、以及这个 group 中名称为 default.project 的代码库，一个产品有且只有一个 default.project 代码库。default.project 代码库用于存储产品的环境、项目、资源的配置，根据这些资源文件，系统将自动生成执行 CI/CD 活动的运行时环境。

### 删除产品
由于产品可能关联了实施 CI/CD 活动的多种类型的实体（例如项目、代码库和环境等），在没有删除干净产品的相关实体之前，是不能删除产品的。唯一可以删除产品的条件是：产品中不存在任何实体，除了一个空的default.project代码库。
以下是删除产品的步骤：
1. 访问 Swagger UI 地址，选择右上角 select a definition 下拉框中的 api.product.v1.Product；选择 DELETE 接口，点击 try it out，输入 product_name 参数，点击 execute，生成 API 请求的代码示例。与[创建产品](#创建产品) 的步骤1类似。
2. 访问 GitLab Web UI，获取请求 API 的 access token，作为 API 请求的请求头参数。与[创建产品](#创建产品)的步骤2相同，不再赘述。
3. 将前置步骤获取的 access token 作为 API 请求的请求头参数，通过 curl 命令，或者 Postman、JMeter 等工具执行 API 以新增产品。成功执行 API 请求之后，系统将删除一个产品，同时在 GitLab 中删除对应的 group、以及这个 group 中名称为 default.project 的代码库。


### 查询产品
【待补充】

## 产品与其他实体的关系
【待补充】
