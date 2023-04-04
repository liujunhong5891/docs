---
outline: deep
---
# 维护项目

## 简介

在开始本节之前，请确保您已阅读 [用户指南的概述](user-guide-00.md) 章节，了解 Nautes 的主流程和相关术语；并且已经创建了至少一个产品，详情参考 [维护产品](user-guide-01.md)。

由于一个IT系统由多个微服务组成，因此，一个产品可以包含多个项目。此外，维护项目的用户即可以是产品成员，也可以是项目成员。

下面将详细介绍如何维护项目以及相关规则。维护项目有多种方式，包括命令行、API 接口等，下文将描述通过 API 接口的方式维护项目。

## 维护项目（API 接口）

### 创建项目
产品创建成功之后，使用项目表示产品的微服务组件。步骤如下：  
1. 访问 Swagger UI【补充访问地址】，选择右上角 select a definition 下拉框中的 api.project.v1.Projet；选择 POST 接口，点击 try it out，在 product_name 参数中输入产品名称，在 project_name 参数中输入项目名称，点击 execute，生成 API 请求的代码示例。  
2. 获取请求 API 的 access token，作为 API 请求的请求头参数。详情参考 [Personal access tokens](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html)。只有产品成员才可以创建特定产品的项目。  
3. 将前置步骤获取的 access token 作为 API 请求的请求头参数，通过 curl 命令，或者 Postman、JMeter 等工具执行 API 请求以新增项目。更新后的 API 请求的代码示例：
   ```Shell
    # 实操过程中根据实际情况替换 URL 地址和相关参数； 
    curl -X 'POST' \
        'HTTP://xxx.xxx.xxx.xxx:xxxxx/api/v1/products/product-demo/projects/project-demo' \
        -H 'accept: application/json' \
        -H 'Content-Type: application/json' \
        -H 'Authorization: Bearer xxxxxxxxxxxxxxxxxxxxxxxxxx' \
        -d '{
        "language": "Go"
        }'
    ```
    请求成功后，将在产品对应的 default.project 代码库中生成关联产品的项目资源文件。
    ```yaml
    apiVersion: nautes.resource.nautes.io/v1alpha1
    kind: Project
    metadata:
        name: project-demo
        namespace: my-namespace
    spec:
        language: "Go"
        product: "product-demo"
    ```

### 更新项目
项目创建成功后，可以修改项目。详情参考 [创建项目](#创建项目)。只有产品成员才可以更新对应产品的项目资源。  
请求成功后，将变更存储在产品对应的 default.project 代码库中的项目资源文件。

### 删除项目
由于项目可能关联多个资源，在删除项目之前，需要先删除关联该项目的所有相关资源，例如代码库等。步骤如下：  
1. 访问 Swagger UI【补充访问地址】，选择右上角 select a definition 下拉框中的 api.project.v1.Projet；选择 DELETE 接口，点击 try it out，在 product_name 参数中输入产品名称，在 project_name 参数中输入项目名称，点击 execute，生成 API 请求的代码示例。详情参考 [创建项目的步骤1](#创建项目) 。
2. 获取请求 API 的 access token，作为 API 请求的请求头参数。详情参考 [Personal access tokens](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html)。  
3. 将前置步骤获取的 access token 作为 API 请求的请求头参数，通过 curl 命令，或者 Postman、JMeter 等工具执行 API 来删除项目。请求成功后，项目的资源文件将被删除。

### 查询项目
查询项目有两个 API 接口，分别是查询项目列表、查询项目详情。  
查询项目列表的步骤如下：  
1. 访问 Swagger UI【补充访问地址】，选择右上角 select a definition 下拉框中的 api.project.v1.Projet；选择相对路径是 /api/v1/products/{products_name}/projects 的 GET 接口，点击 try it out，在 product_name 参数中输入产品名称，点击 execute，生成 API 请求的代码示例。详情参考 [创建项目的步骤1](#创建项目)。
2. 获取请求 API 的 access token，作为 API 请求的请求头参数。详情参考 [Personal access tokens](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html)。  
3. 将前置步骤获取的 access token 作为 API 请求的请求头参数，通过 curl 命令，或者 Postman、JMeter 等工具执行 API 以查询项目。请求成功后，如果用户是某些项目的成员，将返回项目信息。
   
查询项目详情的步骤如下：  
1. 访问 Swagger UI【补充访问地址】，选择右上角 select a definition 下拉框中的 api.project.v1.Projet；选择相对路径是 /api/v1/products/{products_name}/projects/{project_name} 的 GET 接口，点击 try it out，在 product_name 参数中输入产品名称，在 project_name 参数中输入项目名称，点击 execute，生成 API 请求的代码示例。详情参考 [创建项目的步骤1](#创建项目) 。
2. 其余步骤与“查询项目列表”相同，不再赘述。
