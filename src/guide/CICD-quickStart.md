---
footer: false
outline: deep
---

## 目标
基于开源工具搭建CI环境，并实现一个代码提交即构建的流水线。

## 工具及其关系概览
![directive syntax graph](./images/CI-1.jpg)
- metallb: k8s的lb工具。
- traefik: 反向代理工具，用于ingress的实现。
- cert-manager: 证书签发工具。
- vault: 密钥管理工具。
- external-secrets: 可以将外部的密钥同步为k8s的secret。
- vcluster: 可以在物理k8s集群中创建虚拟集群的工具。
- argo-events: 提供事件监听、转换和触发的工具。
- tekton: k8s原生的流水线工具。

【补充工具间关系、说明整体实施结构和协同关系】

## 准备
以下服务有多种安装方式，下文只是其中一种方式。

**安装一个kubernetes集群**  
通过命令安装K3s。
```Shell
# 替换tls-san IP为宿主机IP
curl -sfL https://get.k3s.io | INSTALL_K3S_VERSION=v1.21.14+k3s1 sh -s - server --disable servicelb --disable traefik --disable metrics-server --tls-san 119.8.99.179
cp /etc/rancher/k3s/k3s.yaml ~/.kube/k3s-config
cp /etc/rancher/k3s/k3s.yaml ~/.kube/config
export KUBECONFIG=~/.kube/config
```
**安装一个vault实例**  
vault有多种安装方式，包括安装包、helm、源码和docker安装。下文使用安装包安装。

- 下载并配置vault，参见[官网链接](https://developer.hashicorp.com/vault/docs/install#installing-vault)。
  
- 更新默认配置文件，启动vault服务。
   ```Shell
   # config.hcl的默认路径：/opt/vault/config
   cat config.hcl
   storage "raft" {     
      path    = "/opt/vault/data"
      node_id = "node1"
   }
   #  更新address端为预置端口
   listener "tcp" {     
      address     = "0.0.0.0:31820"
      tls_disable = "true"
   }
   disable_mlock = true
   #  更新api_addr和cluster_addr的端口为预置端口
   api_addr = "http://0.0.0.0:31820"   
   cluster_addr = "https://192.168.0.243:31821"
   ui = true
   ```

**在宿主机安装argocd命令行**  
下载并配置argoCD命令行，参见[官网链接](https://argo-cd.readthedocs.io/en/stable/cli_installation/#download-with-curl)。

**了解Github DEMO代码库的作用**  【修改措辞】
- 配置CI基础环境和代码提交即触发流水线：[demo-pipeline-argoevents-tekton](https://github.com/lanbingcloud/demo-pipeline-argoevents-tekton)
- 存储应用源码和流水线：[demo-user-project](https://github.com/lanbingcloud/demo-user-project)
- 存储应用部署的资源文件：[demo-user-deployments](https://github.com/lanbingcloud/demo-user-deployments)

## 实施步骤

- **维护密钥**：在vault服务端维护本次DEMO需要的所有密钥，以及密钥的访问策略。
- **安装argoCD**：在宿主集群安装argoCD。 
- **安装argoCD app**： 在宿主集群上的argoCD，创建根project和根app，使得argoCD通过[app of apps](https://argo-cd.readthedocs.io/en/stable/operator-manual/cluster-bootstrapping/#app-of-apps-pattern)的方式自动安装宿主集群的资源、运行时集群以及运行时集群的资源。
- **向vault同步宿主/运行时集群的认证信息**: 同步集群的认证信息，用于kubernetes资源使用存储在vault的密钥。
- **执行流水线**：向fork [demo-user-project](https://github.com/lanbingcloud/demo-user-project)的目标代码库推送代码，触发流水线自动执行。


### 维护密钥
**cert-manager**  
用于cert-manager给ingress资源颁发证书和私钥。
1. 这里使用[预置的证书和私钥](#预置的证书和私钥)。

2. 新增secret：访问vault界面，点击“Secrets”一级菜单，启用Secrets Engines，选择类别为KV，点击Next；进入Enable KV Secrets Engine的配置界面，填写Path为pki，点击Enable Engine；进入当前Secrets Engine的secrets配置界面，点击Create secret，参见下表填写属性值，点击Save完成新增secret。

| 属性      | 取值 |
| ----------- | ----------- |
| Path for this secret      | root    |
| Secret data - key  |  tls.crt  |
| Secret data - value |  [预置的证书](#预置的证书和私钥)   |
| Secret data - key  |  tls.key  |
| Secret data - value |  [预置的私钥](#预置的证书和私钥)   |

3. 新增Policy：访问vault界面，点击“Policies”一级菜单，点击Create ACL policy，填写Name为pki-root，参见下文代码块填写policy，点击Create policy完成新增Policy。
  ```
  path "pki/data/root" {
    capabilities = ["read"]
  }
  ```

**argo-events**  
用于argoevents创建并监听webhook。包括：创建github webhook的accesstoken、防止webhook被非法调用的github secret。
1. 新增github accesstoken：访问github界面，在“账号Settings - Developer settings - Personal access token - Token(classic)”操作路径下，点击Generate new token(classic)，参见下表填写属性值，点击Generate token完成新增accesstoken。保存生成的token，关闭界面之后将不再显示。更多细节[参见官网](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)。

| 属性      | 取值 |
| ----------- | ----------- |
| Note      |  自定义描述    |
| Expiration   |  30days(默认值)  |
| Select scopes(复选框)   |  repo、write:packages  |

2. 新增github secret：访问目标代码库（fork [demo-user-project](https://github.com/lanbingcloud/demo-user-project)）的github界面，在“Settings-Secrets-Actions”操作路径下，点击New repository secret，参见下表填写属性，点击Add secret完成新增secret。保存明文的secrets，关闭界面之后将不再显示明文。

| 属性      | 取值 |
| ----------- | ----------- |
| Name      |  自定义名称    |
| Secret   |  随机字符串(例如UUID)  |

3. 新增secret：访问vault界面，点击“Secrets”一级菜单，启用Secrets Engines，选择类别为KV，点击Next；进入Enable KV Secrets Engine的配置界面，填写Path为git，点击Enable Engine；进入当前Secrets Engine的secrets配置界面，点击Create secret，参见下表填写属性值，点击Save完成新增secret。

| 属性      | 取值 |
| ----------- | ----------- |
| Path for this secret      | github/user-project/argoevents/webhook-access    |
| Secret data - key  |  token  |
| Secret data - value |  github accesstoken的值   |
| Secret data - key   |  secret  |
| Secret data - value |  github secret的值（明文）   |

4. 新增Policy：访问vault界面，点击“Policies”一级菜单，点击Create ACL policy，填写Name为git-github-user-project-argoevents-webhook-access，参见下文代码块填写policy，点击Create policy完成新增Policy。
  ```
  path "git/data/github/user-project/argoevents/webhook-access" {
    capabilities = ["read"]
  }
  ```

**pipeline-推送镜像**  
用于向github package推送镜像。
1. 准备推送镜像的账号信息：这里使用了和argo-events相同的accesstoken，具备packages的写入权限，组成 &lt;github account&gt;:&lt;github access token&gt; 格式的字符。再通过base64转码，用于后续写入密钥。
<!-- 测试异常: <github account>:<github access token> -->

2. 新增secret：访问vault界面，点击“Secrets”一级菜单，启用Secrets Engines，选择类别为KV，点击Next；进入Enable KV Secrets Engine的配置界面，填写Path为repo，点击Enable Engine；进入当前Secrets Engine的secrets配置界面，点击Create secret，参见下表填写属性值，点击Save完成新增secret。

| 属性      | 取值 |
| ----------- | ----------- |
| Path for this secret      | github/container/lanbing/default/readwrite    |
| Secret data - key   |  auth  |
| Secret data - value |  对github access token进行base64转码后的值   |

3. 新增Policy：访问vault界面，点击“Policies”一级菜单，点击Create ACL policy，填写Name为repo-github-container-lanbing-default-readwrite，参见下文代码块填写policy，点击Create policy完成新增Policy。
  ```  
  path "repo/data/github/container/lanbing/default/readwrite" {
      capabilities = ["read"]
  }
  ```

**pipeline-推送代码**  
用于向github代码库推送代码。
1. 新增ssh密钥：更多细节参见[官网](https://docs.github.com/zh/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)。
  ```Shell 
  # 使用git客户端生成密钥，其中邮箱替换为github账号的邮箱 
  ssh-keygen -t ed25519 -C "your_email@example.com"
  ```
2. 新增deploy key：在目标代码库(fork [demo-user-deployments](https://github.com/lanbingcloud/demo-user-deployments))的github界面，点击顶部的Settings，进入设置界面；点击左侧菜单的Deploy keys，进入Deploy keys的维护界面； 点击Add deploy key，参考下表填写属性值，点击Add key完成新增deploy key。更多细节参见[官网](https://docs.github.com/en/developers/overview/managing-deploy-keys#deploy-keys)。

| 属性      | 取值 |
| ----------- | ----------- |
| Title      |   自定义     |
| Key   |  ssh公钥  |
| Allow write access(复选框)   |  选中  |


3. 新增secret：访问vault界面，点击“Secrets”一级菜单，启用Secrets Engines，选择类别为KV，点击Next；进入Enable KV Secrets Engine的配置界面，填写Path为git，点击Enable Engine；进入当前Secrets Engine的secrets配置界面，点击Create secret，参见下表填写属性值，点击Save完成新增secret。

| 属性      | 取值 |
| ----------- | ----------- |
| Path for this secret      | github/user-deployments/default/readwrite       |
| Secret data - key   |  deploykey  |
| Secret data - value |  ssh私钥   |

4. 新增Policy：访问vault界面，点击“Policies”一级菜单，点击Create ACL policy，填写Name为git-github-user-deployments-default-readwrite，参见下文代码块填写policy，点击Create policy完成新增Policy。
  ```  
  path "git/data/github/user-deployments/default/readwrite" {
      capabilities = ["read"]
  }
  ```

### 安装argoCD
在宿主集群安装argoCD。
```Shell  
# 切换到宿主集群 
export KUBECONFIG=~/.kube/config
# clone目标代码库(fork demo-pipeline-argoevents-tekton)，cd到相对路径cmds，执行安装脚本
sh install-argocd.sh
# 执行argocd的补丁脚本 
sh patch-argocd-server.sh
```

### 安装argoCD app

**替换服务地址**  
变更范围包括：argoCD app监听的源代码库地址、宿主集群的地址、运行时集群的地址，以及变更地址的关联资源，详情参见“附件-替换服务地址配置”。
1. 根据下文模板，替换代码库地址、集群地址等，详见下文代码注释。

```Shell
# 目标代码库(fork demo-pipeline-argoevents-tekton)
# 批量替换argocd监听代码库地址为目标代码库
sed -i -e "s#https://github.com/lanbingcloud/demo-pipeline-argoevents-tekton.git#https://github.com/lanbingcloud/demo-pipeline-argoevents-tekton-1.git#g"  `grep https://github.com/lanbingcloud/demo-pipeline-argoevents-tekton.git -rl demo-pipeline-argoevents-tekton-1`
# 批量替换宿主集群IP地址、宿主机IP地址、vault服务端IP地址(这里vault也安装在同一台宿主机)
sed -i -e "s#192.168.0.184#192.168.0.243#g"  `grep 192.168.0.184 -rl demo-pipeline-argoevents-tekton-1`
# 批量替换ingress的地址
sed -i -e "s#119-8-58-20#119-8-99-179#g"  `grep 119-8-58-20 -rl demo-pipeline-argoevents-tekton-1`
# 替换argo-events中eventsource的repo信息，包括owner和names
sed -i -e "s#lanbingcloud#zhangsan#g"  demo-pipeline-argoevents-tekton-1/argo-events/overlays/production/eventsource.yaml
sed -i -e "s#demo-user-project#demo-user-project-1#g"  demo-pipeline-argoevents-tekton-1/argo-events/overlays/production/eventsource.yaml
#  替换argo-events中init-pipeline.yaml git-clone的代码库地址
sed -i -e "s#https://github.com/lanbingcloud/demo-user-project.git#https://github.com/lanbingcloud/demo-user-project-1.git#g" demo-pipeline-argoevents-tekton-1/argo-events/overlays/production/init-pipeline.yaml
# 目标代码库(fork demo-user-project)
# 替换pipeline task 拉取代码、推送代码、推送镜像的地址
sed -i -e "s#https://github.com/lanbingcloud/demo-user-project.git#https://github.com/lanbingcloud/demo-user-project-1.git#g" demo-user-project-1/pipelines/test-pipeline.yaml
sed -i -e "s#git@github.com:lanbingcloud/demo-user-deployments.git#git@github.com:lanbingcloud/demo-user-deployments-1.git#g" demo-user-project-1/pipelines/test-pipeline.yaml
# 替换推送镜像的github package
sed -i -e "s#ghcr.io/lanbingcloud#ghcr.io/zhangsan#g" demo-user-project-1/pipelines/test-pipeline.yaml
# 目标代码库(fork demo-user-deployments)
# 替换应用svc的外部访问地址
sed -i -e "s#119-8-58-20#119-8-99-179#g"  demo-user-deployments-1/deployments/test/devops-sample-svc.yaml 
```

2. clone目标代码库，执行脚本，批量替换目标代码库的服务地址。

```Shell
sh sed-demo.sh
```

**安装根project和根app**
1. 使用命令安装根project和根app。
``` Shell
# cd到目标代码库(fork demo-pipeline-argoevents-tekton)的根目录，安装根project
kubectl -nargocd apply -f project.yaml
# 安装根app
kubectl -nargocd apply -f app.yaml
```
2. 获取argoCD的初始密码，访问[argoCD界面](#安装在宿主集群的argocd访问地址)。观察app状态，其中root和cert-manager两个app显示同步失败：vcluster没有在argoCD注册，导致runtime-argocd-appset和runtime-appset找不到目标集群； 宿主集群没有通过vault认证，导致cert manager无法获取密钥。
```Shell
# cd到目标代码库(fork demo-pipeline-argoevents-tekton)的相对路径cmds，执行脚本获取初始密码
sh get-argocd-admin-pwd.sh
```


### 向argoCD注册虚拟集群
用于argoCD向vcluster集群安装运行时资源，包括root app中runtime-argocd-appset和runtime-appset定义的资源。

1. 准备注册vcluster集群需要的kubeconfig文件。
  ```Shell
  # 切换到宿主集群，cd到目标代码库(fork demo-pipeline-argoevents-tekton)的相对路径cmds，执行脚本获取vcluster的kubeconfig
  export KUBECONFIG=~/.kube/config
  sh get-vcluster-kubeconfig.sh vcluster1
  # 修改kubeconfig文件，保存到宿主机指定目录
  ...
  clusters:
  - cluster:
      certificate-authority-data: ...
      # 修改为:<宿主机内网IP:vcluster1的svc nodePort>
      server: https://192.168.0.243:31543    
  ...
  contexts:
  - context:
      cluster: local
      namespace: default
      user: user
    #自定义名称
    name: Default31543  
  #自定义名称 
  current-context: Default31543  
  ...
  ```
2. 使用argocd命令注册vcluster。
  ``` 
  # 切换到宿主集群，修改argocd server的svc类型为NodePort（步骤略）
  # 执行cmds目录下的get-argocd-admin-pwd.sh脚本获取安装在宿主集群的argoCD初始密码
  # 使用命令行登录argocd：argocd login <内网IP>:<argocd server svc的nodeport>
  argocd login 192.168.0.243:30070
  # 切换到vcluster
  export KUBECONFIG=/opt/vcluster/kubeconfig-31543.yaml
  # 使用命令行注册vcluster：argocd cluster add <cluster-name> --kubeconfig=<kubeconfig.yaml>
  argocd cluster add Default31543 --kubeconfig=/opt/vcluster/kubeconfig-31543.yaml
  # 查看已注册的集群是否包括vcluster
  argocd cluster list
  ```
3. 访问[安装在宿主集群的argoCD界面](#安装在宿主集群的argocd访问地址)，等待argoCD自动同步，直到root app状态更新为已同步。如果想立即验证效果，删除runtime-appset和runtime-argocd-appset，等待argoCD重新生成资源，观察root app状态更新为已同步。


### 向vault同步宿主集群/运行时集群的认证信息  
**同步宿主集群的认证信息**  
用于安装在宿主集群上的资源获取存储在vault的密钥。
1. 准备配置宿主集群认证需要的信息：包括集群的CA证书、授权sa的token、集群host地址。
``` Shell
# 切换到宿主集群，cd到目标代码库(fork demo-pipeline-argoevents-tekton)的相对路径cmds，执行脚本get-cluster-ca.sh获取CA证书
export KUBECONFIG=~/.kube/config
sh get-cluster-ca.sh $KUBECONFIG
# 执行get-vault-auth-token.sh获取token
sh get-vault-auth-token.sh
# 查看kubeconfig文件获取host地址
cat ~/.kube/config
```

2. 启用kubernetes认证方法：访问vault界面，点击"Access"一级菜单,进入Authentication Methods的配置界面，点击Enable new method，选择类别为Kubernetes，点击Next; 进入Enable Kubernetes Authentication Method的配置界面，设置Path为host-cluster，点击Enable Method; 进入Configure Kubernetes的配置界面，参见下表填写属性值，点击Save完成启用kubernetes认证。

| 属性      | 取值 |
| ----------- | ----------- |
| Kubernetes host   |  host地址  |
| Kubernetes CA Certificate |  CA证书   |
| Token Reviewer JWT |  token   |

3. 新增特定kubernetes认证方法的role：访问vault界面，点击"Access"一级菜单,进入Authentication Methods的配置界面，点击Path为host-cluster的认证方法链接； 进入role的维护界面，点击Create role，参见下表填写属性值，点击Save完成新增role。

| 属性      | 取值 |
| ----------- | ----------- |
| Name   |  cert-manager  |
| Bound service account names |  default   |
| Bound service account namespaces |  cert-manager   |
| Generated Token's Policies |  pki-root   |

4. 验证cert-manager获取密钥：访问[安装在宿主集群的argoCD界面](#安装在宿主集群的argocd访问地址)，等待argoCD自动同步，直到cert-manager app状态更新为已同步。如果想立即验证效果，删除以下资源：类型为SecretStore的cert-manager-secretstore、类型为ExternalSecret的root-issuer、类型为ClusterIssuer的org-issuer，等待argoCD重新生成资源，观察cert-manager app的状态更新为已同步。

**同步vcluster的认证信息**  
用于安装在vcluster集群上的资源获取存储在vault的密钥。
1. 准备配置vcluster集群认证需要的信息。包括：集群的CA证书、授权sa的token、集群host地址。
``` Shell
# 切换到vcluster集群，cd到目标代码库(fork demo-pipeline-argoevents-tekton)的相对路径cmds，执行脚本get-cluster-ca.sh获取CA证书
export KUBECONFIG=/opt/vcluster/kubeconfig-31543.yaml
sh get-cluster-ca.sh $KUBECONFIG
# 执行get-vault-auth-token.sh获取token
sh get-vault-auth-token.sh
# 查看kubeconfig文件获取host地址
cat /opt/vcluster/kubeconfig-31543.yaml
```
2. 启用kubernetes认证方法：访问vault界面，点击"Access"一级菜单,进入Authentication Methods的配置界面，点击Enable new method，选择类别为Kubernetes，点击Next; 进入Enable Kubernetes Authentication Method的配置界面，设置Path为pipeline1-cluster，点击Enable Method; 进入Configure Kubernetes的配置界面，参见下表填写属性值，点击Save完成启用kubernetes认证。

| 属性      | 取值 |
| ----------- | ----------- |
| Kubernetes host   |  vcluster的host地址  |
| Kubernetes CA Certificate |  vcluster的CA证书   |
| Token Reviewer JWT |  vcluster的sa token   |

3. 新增特定kubernetes认证方法的role：访问vault界面，点击"Access"一级菜单,进入Authentication Methods的配置界面，点击Path为pipeline1-cluster的认证方法链接； 进入role的维护界面，点击Create role，参见下表填写属性值，点击Save完成新增role。

| 属性      | 取值 |
| ----------- | ----------- |
| Name   |  argo-events-sa  |
| Bound service account names |  argo-events-sa   |
| Bound service account namespaces |  argo-events   |
| Generated Token's Policies |  git-github-user-project-argoevents-webhook-access   |
| Name   |  user-pipelines  |
| Bound service account names |  default   |
| Bound service account namespaces |  user-pipelines   |
| Generated Token's Policies |  git-github-user-deployments-default-readwrite<br>repo-github-container-lanbing-default-readwrite   |

4. 验证argo-events获取密钥：访问[安装在vcluster集群的argoCD界面](#安装在vcluster集群的argocd访问地址)，等待argoCD自动同步，直到argo-events app状态更新为已同步。如果想立即验证效果，删除以下资源：类型为SecretStore的webhook-secretstore、类型为ExternalSecret的github-access、类型为EventSource的webhook，等待argoCD重新生成资源，观察argo-events app的状态更新为已同步。

```Shell
# 切换到vcluster集群，cd到目标代码库(fork demo-pipeline-argoevents-tekton)的相对路径cmds，执行脚本获取初始密码
sh get-argocd-admin-pwd.sh
```

### 执行流水线
fork 代码库demo-user-project，并向目标代码库提交代码（例如修改pom文件中项目的版本），[访问tekton-dashboard](#tekton-dashboard访问地址)观察流水线已经自动执行。
![directive syntax graph](./images/CI-10.jpg)

## 附件
### 参考链接
**Github DEMO示例：**  
https://github.com/lanbingcloud/demo-vcluster-tekton-argoevents-vaultagent-externalsecrets  
https://github.com/lanbingcloud/demo-pipeline-argoevents-tekton

**B站讲解视频：**  
https://www.bilibili.com/video/BV1yP4y1U7mS/  
https://www.bilibili.com/video/BV1Fm4y1A7qL/

### 安装在宿主集群的argoCD访问地址
协议：https  
地址：来自production/patch/ingress-argocd.yaml的hosts  
端口：来自production/traefik-app.yaml的websecure.nodePort  
示例：https://argocd.119-8-99-179.nip.io:30443  

### 安装在vcluster集群的argoCD访问地址
协议：https  
地址：来自runtimes/pipeline1-runtime/production/patch/ingress-argocd.yaml的hosts  
端口：来自production/traefik-app.yaml的websecure.nodePort  
示例：https://argocd.pipeline1.119-8-99-179.nip.io:30443

### tekton-dashboard访问地址
协议：http  
地址：来自tekton/overlays/production/dashboard-ingress.yaml的host  
端口：来自production/traefik-app.yaml的web.nodePort  
示例：http://tekton.pipeline1.119-8-99-179.nip.io:30080  


### 预置的证书和私钥
**tls.crt**  
----BEGIN CERTIFICATE-----
MIIC+zCCAeOgAwIBAgIJAMv/rvOaPioGMA0GCSqGSIb3DQEBCwUAMBQxEjAQBgNV
BAMMCWJsdXppbi1jYTAeFw0yMjA2MjEwMjEzNTBaFw00OTExMDYwMjEzNTBaMBQx
EjAQBgNVBAMMCWJsdXppbi1jYTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC
ggEBAKYqCk8qyWNUsvLt/61ie2CGFvdwFLdWCwfk+be0U9wp7Lq6+RR+KERQF3/E
G15uRpZPreVO/YJpTetod5RWkJeIMho1eutyhJFdaWWxA1G7oyxL/duWJWGCCd2v
VleQD7JjueDC5AXKFQMXBbFcMUB9dv/mPfI/1puMHQbyfvdIsdaTH9gpJGPCl2a+
csDuI/fZJH0yJbWpDbCOhm1JmJ35GweNFIWfkluNU2K4QyH5JMk5dDcLyE4pDkdc
MZbyhsadR4ndNbsvj8xhWv4yMXuVcSbkGekhCuzxkUv3RXGLCPgETIbf+8daX3NW
o5T69alrFqRzB0NFZgbTHN60vrcCAwEAAaNQME4wHQYDVR0OBBYEFKw6dUhhxRxr
DVt3qrZ5l2cWYykmMB8GA1UdIwQYMBaAFKw6dUhhxRxrDVt3qrZ5l2cWYykmMAwG
A1UdEwQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAB2Z94Jbvq9pT4UfjFcV22Bf
zF0+jPifVBe3btJdplc0ItvaQZqVWQ8CC5/lz8Xe0bK3rc95hKqxaZERsvjSqmU/
LhlOlhHrE1Zm4fNuh+svEMFnUnk98wnUMeBed897hDRKhpaP6sX88rRdhanvBoja
rKLTdjUcbrAT9XeTkVwBSSBG5itGUaEeUmbITZlu9juI031W8Wl28i3dRaWvTDGY
/e+FEqu7bz9Pkfu0DKEGpINdFfpl6WV3IbMheORPZM5QNVFkybqgp/ryrRFuVM/U
nT4uAguLdb0yB/NhUh+9iwpxkSv5/o547/nQ8JLJHotJkJ7HaXdMKliL3xvr4Qw=
-----END CERTIFICATE-----

**tls.key**  
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEApioKTyrJY1Sy8u3/rWJ7YIYW93AUt1YLB+T5t7RT3Cnsurr5
FH4oRFAXf8QbXm5Glk+t5U79gmlN62h3lFaQl4gyGjV663KEkV1pZbEDUbujLEv9
25YlYYIJ3a9WV5APsmO54MLkBcoVAxcFsVwxQH12/+Y98j/Wm4wdBvJ+90ix1pMf
2CkkY8KXZr5ywO4j99kkfTIltakNsI6GbUmYnfkbB40UhZ+SW41TYrhDIfkkyTl0
NwvITikOR1wxlvKGxp1Hid01uy+PzGFa/jIxe5VxJuQZ6SEK7PGRS/dFcYsI+ARM
ht/7x1pfc1ajlPr1qWsWpHMHQ0VmBtMc3rS+twIDAQABAoIBAHV4qykk2pM6wfg0
gdkWEps+sOXlev/R+KJwIorZFaBEk3O/02/FcLo61SIihibQV17Und/LZDXaNJgE
luVr/XTjeGhG/suNfmM2Ytjdt7cErGsYnjOrhmnVARyUZLoqwq4fCr33ijT9lLVG
hWPKBZfOG172azzkHNiCydKrhU9UFVDnyhYPKFyMK6ufqessxZZBmIAGkD+17shL
kHgRPepyognblzZW634CpL2vG6p5PwI8DaiM3CrGEYCNyVFoCDMoiUSqIvISSO/L
v/ZpNw0NginN4NT6ZXFS+HTERrgrz4q0HtoI8FDYJjcao6LevtKKGfbCMjtbutJe
zwacjoECgYEA2F/v6ZZx1OveCw6J9HNxwxwQVNUtTZlsyxrRQk8PHYWkVgPkVIMx
BmqVHh98F+4MHZnERi1Yd2bN8FtS3XJv0g6cKnXpCwoscGyNLD+IHjXWK9/WI+74
yyt5kjWQWrlL0cuIrd+ekPAct1lW4aboZSSkeSXotJvNJC8avQ5SwkcCgYEAxJgj
GJB6eV/G+bQEjAi2sxphRe8Oz3TC6O30eJa3MBWyspnlK1KxMbfqBqCA6yqdvghj
QZghONwHFgRwtV72EO4augj+qsSFWWanhGAnBzydv0fk53DYhB3k8j+BqY/8g+VR
ghB7MwwPffsCG3RH6GidFX/53OljI2tqILTvaBECgYEA1Kx3g4D8Iew0M2n27u8J
wlyzMK7X+I31AS06wZIzqTDSdjkdFHRem4/nQdRwhJTWE8IvyUqIydOiV71rlX4F
qtHxbUq35MH7LAWGPRe1EvyXpkg8ktUwdYIl3DAJ0yKOA4eqsDw7/voDP7PwUZtc
kQ2THADG2b7Jw+cIwQpzDcECgYAZYLpHFX95448/9KkRmp5bCHC+Iln7FcuDXhRM
7MfBAUwMGimnKgmNrXwcVuPNd7bdLSAC+6xuNpkDkpcqEpQZI2N32Glnie7c14+Q
WwkuufhzFMjLx5lrlKBVVTVbuiaSsCuRaqc8s7XcQWbIPH571eVRPS/4AHi3vcn5
ZuHwwQKBgQCg+6g8oZJMIYIDxpKnFD6LVicL1aqqbPKBVkGQctwm2rx00C7feeXh
PvGDon8H4FdLTFRfMfSFV7Prnk2vzFFFRz5U3JVxsK77FkigEiV7WAaxM7gW5+2N
zo9O7481Eqd1OxofiLfSJHckDNORZgNvBLBZRoPERNuLVxtacIYxFA==
-----END RSA PRIVATE KEY-----

### **替换服务地址配置**

#### 代码库：demo-pipeline-argoevents-tekton
fork demo-pipeline-argoevents-tekton代码库，修改目标代码库的服务地址。

##### 替换监听的代码库地址
相对路径：app.yaml
```yaml{7}
...
spec:
  project: demo-vcluster
  source:
    path: production
    # 替换为目标代码库地址
    repoURL: https://github.com/lanbingcloud/demo-pipeline-argoevents-tekton-1.git
    targetRevision: HEAD
...
```

相对路径：production/runtime-appset.yaml
```yaml{9}
...
spec:
  ...
  template:
    spec:
      project: demo-vcluster
      source:
        # 替换为目标代码库地址
        repoURL: https://github.com/lanbingcloud/demo-pipeline-argoevents-tekton-1.git
        targetRevision: HEAD
        path: runtimes/{{runtime}}
...
```

相对路径：production/cert-manager-app.yaml
```yaml{7}
...
spec:
  project: demo-vcluster
  source:
    path: cert-manager/overlays/production
    # 替换为目标代码库地址
    repoURL: https://github.com/lanbingcloud/demo-pipeline-argoevents-tekton-1.git
    targetRevision: HEAD
...
```

相对路径：production/runtime-argocd-appset.yaml
```yaml{9}
...
spec:
  ...
  template:
    spec:
      project: demo-vcluster
      source:
        # 替换为目标代码库地址
        repoURL: https://github.com/lanbingcloud/demo-pipeline-argoevents-tekton-1.git
        targetRevision: HEAD
        path: argocd/overlays/production
  ...
```

相对路径：production/vcluster-appset.yaml
```yaml{9}
...
spec:
  ...
  template:
    spec:
      project: demo-vcluster
      source:
        # 替换为目标代码库地址
        repoURL: https://github.com/lanbingcloud/demo-pipeline-argoevents-tekton-1.git
        targetRevision: HEAD
        path: vclusters/{{cluster}}
...
```

相对路径：production/patch-app.yaml
```yaml{7}
...
spec:
  project: demo-vcluster
  source:
    path: production/patch
    # 替换为目标代码库地址
    repoURL: https://github.com/lanbingcloud/demo-pipeline-argoevents-tekton-1.git
    targetRevision: HEAD
...
```

相对路径：vclusters/vcluster1/vcluster1-patch-app.yaml
```yaml{7}
...
spec:
  project: demo-vcluster
  source:
    path: vclusters/vcluster1/vcluster1-patch
    # 替换为目标代码库地址
    repoURL: https://github.com/lanbingcloud/demo-pipeline-argoevents-tekton-1.git
    targetRevision: HEAD
...
```

相对路径：runtimes/pipeline1-runtime/pipeline1-app.yaml
```yaml{7}
...
spec:
  project: demo-pipeline
  source:
    path: runtimes/pipeline1-runtime/production
    # 替换为目标代码库地址
    repoURL: https://github.com/lanbingcloud/demo-pipeline-argoevents-tekton-1.git
    targetRevision: HEAD
...
```

相对路径：runtimes/pipeline1-runtime/production/argo-events-app.yaml
```yaml{7}
...
spec:
  project: demo-pipeline
  source:
    path: argo-events/overlays/production
    # 替换为目标代码库地址
    repoURL: https://github.com/lanbingcloud/demo-pipeline-argoevents-tekton-1.git
    targetRevision: HEAD
...
```

相对路径：runtimes/pipeline1-runtime/production/user-namespaces-app.yaml
```yaml{7}
...
spec:
  project: demo-pipeline
  source:
    path: user-namespaces
    # 替换为目标代码库地址
    repoURL: https://github.com/lanbingcloud/demo-pipeline-argoevents-tekton-1.git
    targetRevision: HEAD
...
```

相对路径：runtimes/pipeline1-runtime/production/tekton-app.yaml
```yaml{7}
...
spec:
  project: demo-pipeline
  source:
    path: tekton/overlays/production
    # 替换为目标代码库地址
    repoURL: https://github.com/lanbingcloud/demo-pipeline-argoevents-tekton-1.git
    targetRevision: HEAD
...
```

相对路径：runtimes/pipeline1-runtime/production/patch-app.yaml
```yaml{7}
...
spec:
  project: demo-pipeline
  source:
    path: runtimes/pipeline1-runtime/production/patch
    # 替换为目标代码库地址
    repoURL: https://github.com/lanbingcloud/demo-pipeline-argoevents-tekton-1.git
    targetRevision: HEAD
...
```

##### 替换宿主集群IP地址、宿主机IP、vault服务端IP
相对路径：vclusters/vcluster1/vcluster1-app.yaml
```yaml{12}
...
spec:
  project: demo-vcluster
  source:
    ...
    helm:
      values: |-
        vcluster:
          image: rancher/k3s:v1.21.13-k3s1
        syncer:
          extraArgs:
          - --tls-san=192.168.0.243   # 替换为宿主机的内网IP
...
```

相对路径：argo-events/overlays/production/secretstore.yaml
```yaml{6}
...
spec:
  provider:
    vault:
      # 替换为vault服务端的IP和端口
      server: "http://192.168.0.243:31820"
      path: "git"
      version: "v2"
...
```

相对路径：cert-manager/overlays/production/secretstore.yaml
```yaml{6}
...
spec:
  provider:
    vault:
      # 替换为vault服务端的IP和端口
      server: "http://192.168.0.243:31820"
      path: "pki"
      version: "v2"
...
```

相对路径：production/metallb-app.yaml
```yaml{13}
...
spec:
  project: demo-vcluster
  source:
    ...
    helm:
      values: |-
        configInline:
          address-pools:
          - name: default
            protocol: layer2
            addresses:
            - 192.168.0.243-192.168.0.243    # 替换为宿主机的内网IP
...
```

相对路径：production/runtime-appset.yaml
```yaml{8}
...
spec:
  generators:
  - list:
      elements:
      - runtime: pipeline1-runtime
        # 替换为目标集群的IP地址和端口
        clusterURL: https://192.168.0.243:31543    
  template:
    ...
    spec:
      project: demo-vcluster
      source:
        repoURL: https://github.com/lanbingcloud/demo-pipeline-argoevents-tekton-1.git
        targetRevision: HEAD
        path: runtimes/{{runtime}}
      destination:
        server: '{{clusterURL}}'
        namespace: argocd
...
```

相对路径：production/vault-app.yaml
```yaml{13}
...
spec:
  project: demo-vcluster
  source:
    ...
    helm:
      values: |-
        global:
          enabled: false
        injector:
          enabled: true
          authPath: auth/host-cluster
          externalVaultAddr: http://192.168.0.243:31820  #替换为vault服务的IP和端口
...
```

相对路径：production/runtime-argocd-appset.yaml
```yaml{8}
...
spec:
  generators:
  - list:
      elements:
      - runtime: pipeline1-runtime-argocd
        # 替换为目标集群的IP地址和端口
        clusterURL: https://192.168.0.243:31543
  template:
    ...
    spec:
      project: demo-vcluster
      source:
        repoURL: https://github.com/lanbingcloud/demo-pipeline-argoevents-tekton-1.git
        targetRevision: HEAD
        path: argocd/overlays/production
      destination:
        server: '{{clusterURL}}'
        namespace: argocd
...
```

相对路径：runtimes/pipeline1-runtime/production/vault-app.yaml
```yaml{13}
...
spec:
  project: demo-pipeline
  source:
    ...
    helm:
      values: |-
        global:
          enabled: false
        injector:
          enabled: true
          authPath: auth/pipeline1-cluster
          externalVaultAddr: http://192.168.0.243:31820  #替换为vault服务的IP和端口
...
```

##### 替换ingress地址
相对路径：argo-events/overlays/production/eventsource.yaml
```yaml{11}
...
spec:
  github:
    user-project:
      ...
      webhook:
        endpoint: /user-project
        port: "12000"
        method: POST
        # 替换为宿主机IP
        url: http://webhook.pipeline1.119-8-99-179.nip.io:30080
...
```

相对路径：argo-events/overlays/production/ingress-webhook-eventsource.yaml
```yaml{10}
...
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: webhook-eventsource
  namespace: argo-events
spec:
  rules:
   # 替换为宿主机IP
  - host: webhook.pipeline1.119-8-99-179.nip.io
...
```

相对路径：production/patch/ingress-argocd.yaml
```yaml{5}
...
spec:
  rules:
  # 替换为宿主机IP
  - host: argocd.119-8-99-179.nip.io
    http:
      paths:
      - path: /
        pathType: ImplementationSpecific
...
```

相对路径：runtimes/pipeline1-runtime/production/patch/ingress-argocd.yaml
```yaml{5}
...
spec:
  rules:
  # 替换为宿主机IP
  - host: argocd.pipeline1.119-8-99-179.nip.io
    http:
      paths:
      - path: /
        pathType: ImplementationSpecific
...
```

相对路径：tekton/overlays/production/dashboard-ingress.yaml
```yaml{5}
...
spec:
  rules:
  # 替换为宿主机IP
  - host: tekton.pipeline1.119-8-99-179.nip.io
    http:
      paths:
      - path: /
        pathType: ImplementationSpecific
...
```

##### 替换argo-events eventsource的repo信息
相对路径：argo-events/overlays/production/eventsource.yaml
```yaml{6,8}
...
spec:
  github:
    user-project:
      repositories:
        - owner: lanbingcloud       # 替换为eventsource监听的代码库的owner
          names:
            - demo-user-project-1   # 替换为eventsource监听的代码库
...
```

##### 替换init-pipeline中git clone任务的代码库地址
相对路径：argo-events/overlays/production/init-pipeline.yaml
```yaml{29}
...
spec:
  ...
  triggers:
    - template:
        name: init-pipeine
        k8s:
          operation: create
          source:
            resource:
              ...
              spec:
                ...
                pipelineSpec:
                  params:
                    ...
                  tasks:
                  - name: git-clone
                    taskRef:
                      name: git-clone
                      kind: ClusterTask
                    workspaces:
                    - name: output
                      workspace: source-volume
                      subPath: $(params.REVISION)
                    params:
                    - name: url
                      # 替换为目标代码库地址（fork demo-user-project代码库）
                      value: https://github.com/lanbingcloud/demo-user-project-1.git
```

#### 代码库：demo-user-project
fork demo-user-project代码库，修改目标代码库。
替换流水线task拉取代码、推送代码、推送镜像的地址。  

相对路径：pipelines/test-pipeline.yaml
```yaml{12,19,33,53}
...
spec:
  ...
  pipelineSpec:
    ...
    tasks:
    - name: git-clone-sourcecode
      ...
      params:
      - name: url
        # 替换为目标代码库（fork demo-user-project）的地址
        value: https://github.com/lanbingcloud/demo-user-project-1.git
      ...
    - name: git-clone-deployment
      ...
      params:
      - name: url
        # 替换为目标代码库(fork demo-user-deployments)的地址
        value: git@github.com:lanbingcloud/demo-user-deployments-1.git
      ...
      - name: image-build
      runAfter:
      - mvn-build
      taskRef:
        name: kaniko
        kind: ClusterTask
      workspaces:
      - name: source
        workspace: source-volume
      params:
      - name: IMAGE
        # 替换为github镜像仓库地址
        value: ghcr.io/zhangsan/devops-sample:0.0.1-$(tasks.git-clone-sourcecode.results.commit)
      - name: DOCKERFILE
        value: ./sourcecode/Dockerfile
      - name: CONTEXT
        value: ./sourcecode
    - name: manifest-update
      runAfter:
      - image-build
      taskRef:
        name: git-cli
        kind: ClusterTask
      workspaces:
      - name: source
        workspace: source-volume
      params:
      ...
      - name: GIT_SCRIPT
        value: |
          cd deployment
        # 使用sed字符串替换镜像地址 
          sed -i -e "s#ghcr.io/zhangsan/devops-sample.*#$(tasks.image-build.results.IMAGE_URL)#g" deployments/test/devops-sample.yaml
          git add deployments/test/devops-sample.yaml
          git commit -a -m "automatic update by pipeline bot: $(tasks.image-build.results.IMAGE_URL)"
          git push origin HEAD:$(params.REVISION) --force
```

#### 代码库：demo-user-deployments

fork demo-user-deployments代码库，修改目标代码库。替换应用svc的外部访问地址。

相对路径：deployments/test/devops-sample-svc.yaml
```yaml{8}
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ks-sample-dev
spec:
  rules:
  # 替换为宿主机外网IP
  - host: devops-sample.119-8-99-179.nip.io
    http:
      paths:
      - path: /
        pathType: ImplementationSpecific
```
