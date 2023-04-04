---
outline: deep
---
请检查下文这篇IT技术文档，结构和内容是否连贯、语句是否简洁易懂无歧义。并列出问题点和优化建议。

# 维护代码库

## 简介

在开始本节之前，请确保您已阅读 [用户指南的概述](user-guide-00.md) 章节，了解 Nautes 的主流程和相关术语；并且已经创建了至少一个产品，详情参见 [维护产品](user-guide-01.md)。

代码库用于存储产品的相关代码，例如源代码、CI流水线的代码、部署配置的代码等。一个产品可以包含多个代码库，一个代码库可以属于一个项目或者不关联项目。此外，维护代码库的用户即可以是产品成员和项目成员。

下面将详细介绍如何维护代码库以及相关规则。维护代码库有多种方式，包括命令行、API 接口等，下文将描述通过 API 接口的方式维护代码库。

## 维护代码库（API 接口）

### 创建代码库
产品创建成功之后，使用代码库以存储产品的相关代码。以下是创建代码库的步骤：  
1. 访问 Swagger UI【补充访问地址】，选择右上角 select a definition 下拉框中的 api.coderepo.v1.CodeRepo；选择 POST 接口，点击 try it out，在 product_name 参数中输入产品名称，在 coderepo_name 参数中输入代码库名称，点击 execute，生成 API 请求的代码示例；  
   ```Shell
    # 实操过程中根据实际情况替换 URL 地址和相关参数； 
    curl -X 'POST' \
    'HTTP://10.204.118.221:32159/api/v1/products/product-demo/coderepos/coderepo-demo' \
    -H 'accept: application/json' \
    -H 'Content-Type: application/json' \
    -d '{
    "project": "demo-project",
    "webhook": {
        "events": ["push_events"]
    },
    "deployment_runtime": true,
    "pipeline_runtime": false,
    "git": {
        "gitlab": {
            "name": "demo-coderepo",
            "path": "demo-coderepo",
            "visibility": "private",
            "description": "demo-coderepo"
            }
        }
    }'
   ```
2. 获取请求 API 的 access token，作为 API 请求的请求头参数。详情参考 [Personal access tokens](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html)。只有 owner 和 maintainer 角色的产品成员、GitLab 管理员才可以创建代码库。  

3. 将前置步骤获取的 access token 作为 API 请求的请求头参数，通过 curl 命令，或者 Postman、JMeter 等工具执行 API 请求以新增代码库。更新后的 API 请求的代码示例：
   ```Shell
    # 实操过程中根据实际情况替换 URL 地址和相关参数； 
    curl -X 'POST' \
    'HTTP://10.204.118.221:32159/api/v1/products/product-demo/coderepos/coderepo-demo' \
    -H 'accept: application/json' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer xxxxxxxxxxxxxxxxxxxxxxxxxx' \
    -d '{
    "project": "demo-project",
    "webhook": {
        "events": ["push_events"]
    },
    "deployment_runtime": true,
    "pipeline_runtime": false,
    "git": {
        "gitlab": {
            "name": "demo-coderepo",
            "path": "demo-coderepo",
            "visibility": "private",
            "description": "demo-coderepo"
            }
        }
    }'
    ```
    请求成功后，将在产品对应的 GitLab group 中新增代码库，并在产品对应的 default.project 代码库中生成关联产品的代码库资源文件。

### 更新代码库
代码库创建成功后，可以修改代码库。详情参考 [创建代码库](#创建代码库)。只有 owner 和 maintainer 角色的产品成员、GitLab 管理员才可以更新代码库资源。    
请求成功后，除了更新代码库，也将更新存储在产品对应的default.project 代码库中的代码库资源文件。

### 删除代码库
由于代码库可能关联多个资源，在删除代码库之前，需要先删除关联该代码库的所有相关资源，例如部署运行时等。以下是删除代码库的步骤：  
1. 访问 Swagger UI【补充访问地址】，选择右上角 select a definition 下拉框中的 api.coderepo.v1.CodeRepo；选择 DELETE 接口，点击 try it out，在 product_name 参数中输入产品名称，在 coderepo_name 参数中输入代码库名称，点击 execute，生成 API 请求的代码示例。详情参考 [创建代码库的步骤1](#创建代码库) 。
2. 获取请求 API 的 access token，作为 API 请求的请求头参数。详情参考 [Personal access tokens](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html)。只有 owner 角色的产品成员或项目成员、GitLab 管理员才可以删除代码库。  
3. 将前置步骤获取的 access token 作为 API 请求的请求头参数，通过 curl 命令，或者 Postman、JMeter 等工具执行 API 来删除代码库。请求成功后，代码库及其资源文件将被删除。

### 查询代码库
查询代码库有两个 API 接口，分别是查询代码库列表、查询代码库详情。  
以下是查询代码库列表的步骤：  
1. 访问 Swagger UI【补充访问地址】，选择右上角 select a definition 下拉框中的 api.coderepo.v1.CodeRepo；选择相对路径是 /api/v1/products/{products_name}/coderepos 的 GET 接口，点击 try it out，在 product_name 参数中输入产品名称，点击 execute，生成 API 请求的代码示例。详情参考 [创建代码库的步骤1](#创建代码库)。
2. 获取请求 API 的 access token，作为 API 请求的请求头参数。详情参考 [Personal access tokens](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html)。  
3. 将前置步骤获取的 access token 作为 API 请求的请求头参数，通过 curl 命令，或者 Postman、JMeter 等工具执行 API 以查询代码库。请求成功后，如果用户是产品成员或者产品中的项目成员，将返回代码库信息。
   
以下是查询代码库详情的步骤：  
1. 访问 Swagger UI【补充访问地址】，选择右上角 select a definition 下拉框中的 api.coderepo.v1.CodeRepo；选择相对路径是 /api/v1/products/{products_name}/coderepos/{coderepo_name} 的 GET 接口，点击 try it out，在 product_name 参数中输入产品名称，在 coderepo_name 参数中输入代码库名称，点击 execute，生成 API 请求的代码示例。详情参考 [创建代码库的步骤1](#创建代码库)。
2. 其余步骤与“查询代码库列表”相同，不再赘述。