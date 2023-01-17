---
footer: false
outline: deep
---

## 概览

近几年随着以 Kubernetes 为核心的云原生技术和工具的发展，开源社区涌现出大量可以实现 CI/CD 的 Kubernetes 原生工具，但我们在引入这些工具的过程中往往会发现，单一工具难以完成所有过程，通常需要多种工具的协同工作才能支撑全流程的 CI/CD 场景，那么如何将多个异构开源工具集成起来，并打通这些工具的认证、权限、数据、流程等壁垒，就成为我们在引入这些工具过程中最大的挑战。本文会用一个 demo 向大家展示，如何通过集成多个 Kubernetes 原生的开源工具，构建一个可以通过代码提交触发的 CI/CD 流水线，完成拉取代码、编译、构建镜像、推送镜像等几个关键任务，以最简化的形式实现软件项目的持续交付。

![directive syntax graph](./images/CI-1.jpg)

如上图所示，本 demo 的基础环境是由一个 Kubernetes 集群和一个 Vault 实例组成（demo 中没有提供这两个工具的自动化安装程序，需要大家自行安装）。其中，Kubernetes 集群承载了所有与提供 CI/CD 能力相关的工具，Vault 则是为 Kubernetes 集群承载的各个工具提供密钥的存取服务。

本 demo 是采用了 GitOps 的管理方法，GitOps 提倡将项目所有的配置声明都存储在版本控制系统中。在本 demo 中，所有运行在 Kubernetes 中工具的安装脚本和参数配置是存储在 GitHub 中，而工具运行过程所需的密钥数据则是通过 Vault 进行存储和管理。Vault 除了能提供密钥的版本管理能力外，还能提供多样的认证方法、灵活的权限控制和密钥提取方式，同时可以和 Kubernetes 无缝集成，相较于 GitHub 更适合与 Kubernetes 及其原生工具协同工作。

本 demo 只展示了流水线的执行环境，但后面我们会为这个 demo 继续扩展持续部署的能力。为了用尽量少的资源获得更好的隔离性，我们采用了在物理集群中划分虚拟集群的方式来实现不同环境之间的隔离。上图中的 vcluster 就是一种虚拟集群的实现方式，demo 中所有跟流水线运行相关的核心工具都是运行在 vcluster 中。

除了密钥数据外，其他所有运行在 Kubernetes 中的工具均是通过 ArgoCD 进行部署和管理的。ArgoCD 会监听 GitHub 中的配置清单，向物理集群中部署CertManager、Metallb、Traefik、VaultAgent、ExternalSecrets、以及一个 vcluster，其中，CertManager 会为 Kubernetes 中各个工具所暴露的 HTTPS 服务自动签发证书；Metallb 是为 Kubernetes service 提供 LoadBalancer；Traefik 同时为物理集群和虚拟机群提供 Ingress 服务；VaultAgent 和 ExternalSecrets 则提供了不同的从 Vault 中加载密钥到 Kubernetes 集群的方式。

当 ArgoCD 在物理集群中部署好一个 vcluster 实例后，会继续在这个 vcluster 中部署一个 ArgoCD 实例，运行在 vcluster 中的其他工具是由这个内部的 ArgoCD 进行部署和管理的。在 vcluster 中运行的工具包括：ArgoEvents、Tekton、以及 VaultAgent 和 ExternalSecrets，其中 ArgoEvents 负责监听 GitHub 上的 Webhook 回调并触发流水线，Tekton 则负责流水线的解析和执行。

我们会将需要被集成的项目代码存放到 GitHub 中，同时将流水线清单、编译脚本、Dockerfile等文件放入同一个代码库。当我们向这个代码库推送变更（git push）时，GitHub 会发送一个回调给 ArgoEvents，ArgoEvents 根据回调内容在 Kubernetes 集群中创建相应的流水线资源，Tekton 再将流水线转为多个 Kubernetes POD去执行，我们可以通过 Kubectl CLI 或 Tekton 的 dashboard  跟踪流水线的执行过程。


## 准备
以下服务有多种安装方式，下文只是其中一种方式。

**安装一个 Kubernetes 集群**  
通过命令安装K3s。为了让K3S安装成功，请确保宿主机连接外网。
```Shell
# 替换tls-san IP为宿主机IP
curl -sfL https://get.k3s.io | INSTALL_K3S_VERSION=v1.21.14+k3s1 sh -s - server --disable servicelb --disable traefik --disable metrics-server --tls-san 119.8.99.179
cp /etc/rancher/k3s/k3s.yaml ~/.kube/k3s-config
cp /etc/rancher/k3s/k3s.yaml ~/.kube/config
export KUBECONFIG=~/.kube/config
```
**安装一个 Vault 实例**  
Vault 有多种安装方式，包括安装包、Helm、源码和 Docker 安装。下文使用安装包安装。

- 下载并配置 Vault ，参见[官网链接](https://developer.hashicorp.com/vault/docs/install#installing-vault)。
  
- 更新默认配置文件，启动 Vault 服务。
   ```Shell
   # config.hcl的默认路径：/opt/vault/config
   cat config.hcl
   storage "raft" {     
      path    = "/opt/vault/data"
      node_id = "node1"
   }
   #  更新address端口为预置端口
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

**在宿主机安装 ArgoCD 命令行**  
下载并配置 ArgoCD 命令行，参见[官网链接](https://argo-cd.readthedocs.io/en/stable/cli_installation/#download-with-curl)。

**fork GitHub demo 代码库**  
- 配置 CI 基础环境和代码提交即触发流水线：[demo-pipeline-argoevents-tekton](https://github.com/lanbingcloud/demo-pipeline-argoevents-tekton)
- 存储应用源码和流水线：[demo-user-project](https://github.com/lanbingcloud/demo-user-project)
- 存储应用部署的资源文件：[demo-user-deployments](https://github.com/lanbingcloud/demo-user-deployments)

## 实施步骤

- **维护密钥**：在 Vault 中维护本次 demo 需要的所有密钥及其访问策略。
- **安装Argo CD**：在 Kubernetes 集群安装 Argo CD 。
- **安装Argo CD app**： 在 Kubernetes 集群上的 Argo CD ，创建根 Project 和根 App ，Argo CD 将通过 [App of Apps](https://argo-cd.readthedocs.io/en/stable/operator-manual/cluster-bootstrapping/#app-of-apps-pattern) 的方式自动安装 Kubernetes 集群的资源、Vcluster 集群以及 Vcluster 集群的资源。
- **同步集群认证**: 在 Vault 中配置 Kubernetes 集群和 Vcluster 集群的认证，用于 Kubernetes 资源和 Vcluster 资源获取 Vault 密钥。
- **执行流水线**：向fork [demo-user-project](https://github.com/lanbingcloud/demo-user-project)的目标代码库推送代码，触发流水线自动执行。


### 维护密钥
**Cert-manager**  

维护 TLS 私钥和证书，用于 Cert-mananger 签发证书。


1. 新增私钥和自签证书：使用下文命令，应答CSR提示信息，生成私钥和证书。
  ```Shell
  openssl req \
    -newkey rsa:2048 -nodes -keyout tls.key \
    -x509 -days 365 -out tls.crt
  ```
2. 新增 Secret：访问 Vault 界面，点击 Secrets，点击 Enable new engine，选择 KV ，点击 Next；填写 Path 为 pki ，点击 Enable Engine；点击 Create secret，参见下表填写属性值，点击 Save。

| 属性      | 取值 |
| ----------- | ----------- |
| Path for this secret      | root    |
| Secret data - key  |  tls.crt  |
| Secret data - value |  tls.crt的内容   |
| Secret data - key  |  tls.key  |
| Secret data - value |  tls.key的内容   |

3. 新增 Policy：访问 Vault 界面，点击 Policies，点击 Create ACL policy，填写 Name 为 pki-root，参见下文代码块填写 Policy，点击 Create policy。
  ```
  path "pki/data/root" {
    capabilities = ["read"]
  }
  ```

**Argo-events**  
创建 GitHub access token 和 GitHub secret，用于 Argo Event 创建 Webhook。
1. 新增 GitHub access token：访问 GitHub 任意界面，点击右上角的头像，点击 Settings > Developer settings > Personal access token > Token(classic)，点击 Generate new token(classic) ； 填写 GitHub 账号的密码，点击 Confirm；参见下表填写属性值，点击 Generator token。请保存好 Token，后续将无法再次查看。更多细节[参见官网](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)。

| 属性      | 取值 |
| ----------- | ----------- |
| Note      |  自定义描述    |
| Expiration   |  30days(默认值)  |
| Select scopes(复选框)   |  admin:repo_hook<br>write:packages（用于 Pipeline 向 GitHub Package 推送镜像） |

2. 新增 Secret：访问 Vault界面，点击 Secrets，点击 Enable new engine，选择 KV，点击 Next；填写 Path 为 git，点击 Enable Engine；点击 Create secret，参见下表填写属性值，点击 Save。

| 属性      | 取值 |
| ----------- | ----------- |
| Path for this secret      | github/user-project/argoevents/webhook-access    |
| Secret data - key  |  token  |
| Secret data - value |  GitHub access token的内容   |
| Secret data - key   |  secret  |
| Secret data - value |  GitHub secret的内容，可以使用随机字符串（例如UUID）   |

3. 新增 Policy：访问 Vault 界面，点击 Policies，点击 Create ACL policy，填写 Name 为 git-github-user-project-argoevents-webhook-access ，参见下文代码块填写 Policy ，点击 Create policy。
  ```
  path "git/data/github/user-project/argoevents/webhook-access" {
    capabilities = ["read"]
  }
  ```

**Pipeline-推送镜像**  
使用 GitHub access token，用于 Pipeline 向 GitHub package 推送镜像。
1. 配置与 GitHub package 进行身份认证的账号：重用 Argo-events 章节的 GitHub access token ，组成 &lt;GitHub account&gt;:&lt;GitHub access token&gt; 格式的字符，并对字符进行 Base64 转码。

2. 新增 Secret：访问 Vault 界面，点击 Secrets ，点击 Enable new engine，选择 KV，点击 Next；填写 Path 为 repo ，点击 Enable Engine；点击 Create secret，参见下表填写属性值，点击 Save。

| 属性      | 取值 |
| ----------- | ----------- |
| Path for this secret      | github/container/lanbing/default/readwrite    |
| Secret data - key   |  auth  |
| Secret data - value |  &lt;GitHub account&gt;:&lt;GitHub access token&gt;通过base64转码后的字符  |

3. 新增 Policy：访问 Vault 界面，点击 Policies ，点击 Create ACL policy，填写 Name 为 repo-github-container-lanbing-default-readwrite ，参见下文代码块填写 Policy，点击 Create policy。

  ```  
  path "repo/data/github/container/lanbing/default/readwrite" {
      capabilities = ["read"]
  }
  ```

**Pipeline-推送代码**  
使用 SSH keys ，用于 Pipeline 向 GitHub 代码库推送代码。
1. 新增 SSH keys ：更多细节参见[官网](https://docs.github.com/zh/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)。
  ```Shell 
  # 使用Git客户端生成SSH keys，邮箱替换为github账号的邮箱 
  ssh-keygen -t ed25519 -C "your_email@example.com"
  ```
2. 新增 Deploy key ： 访问 GitHub 任意界面，点击右上角的头像，点击 Your profile；点击 Repositories，点击目标代码库名称(fork [demo-user-deployments](https://github.com/lanbingcloud/demo-user-deployments))；进入代码库界面，点击 Settings； 在左侧导航栏，点击 Deploy Keys，然后点击 Add deploy key，参考下表填写属性值，点击 Add key。更多细节参见[官网](https://docs.github.com/en/developers/overview/managing-deploy-keys#deploy-keys)。


| 属性      | 取值 |
| ----------- | ----------- |
| Title      |   自定义     |
| Key   |  SSH公钥内容  |
| Allow write access   |  选中复选框  |


3. 新增 Secret：访问 Vault 界面，点击 Secrets ，点击 Path 为 git 的 Secrets Engine ；点击 Create secret ，参见下表填写属性值，点击 Save 。

| 属性      | 取值 |
| ----------- | ----------- |
| Path for this secret      | github/user-deployments/default/readwrite       |
| Secret data - key   |  deploykey  |
| Secret data - value |  SSH私钥内容   |

4. 新增 Policy：访问 Vault 界面，点击 Policies，点击 Create ACL policy，填写 Name 为 repo-github-container-lanbing-default-readwrite ，参见下文代码块填写 Policy ，点击 Create policy 。
  ```  
  path "git/data/github/user-deployments/default/readwrite" {
      capabilities = ["read"]
  }
  ```

### 安装 ArgoCD
在 Kubernetes 集群安装 ArgoCD 。
```Shell  
# 切换到Kubernetes集群 
export KUBECONFIG=~/.kube/config
# clone目标代码库(fork demo-pipeline-argoevents-tekton)，cd到相对路径cmds，执行安装脚本
sh install-argocd.sh
# 执行补丁脚本 
sh patch-argocd-server.sh
```

### 安装 ArgoCD app

**替换服务地址**  
变更范围包括：ArgoCD app 监听的源代码库地址、目标集群的地址，以及变更地址的关联资源，详情参见[替换服务地址配置](#替换服务地址配置)。
1. 根据下文模板，替换代码库地址、集群地址等，详见下文代码注释。

```Shell
# 目标代码库(fork demo-pipeline-argoevents-tekton)
# 批量替换Argocd监听代码库地址为目标代码库地址
sed -i -e "s#https://github.com/lanbingcloud/demo-pipeline-argoevents-tekton.git#https://github.com/lanbingcloud/demo-pipeline-argoevents-tekton-1.git#g"  `grep https://github.com/lanbingcloud/demo-pipeline-argoevents-tekton.git -rl demo-pipeline-argoevents-tekton-1`
# 批量替换宿主机IP地址、Vault服务端IP地址(这里vault也安装在同一台宿主机)
sed -i -e "s#192.168.0.184#192.168.0.243#g"  `grep 192.168.0.184 -rl demo-pipeline-argoevents-tekton-1`
# 批量替换Ingress的域名地址
sed -i -e "s#119-8-58-20#119-8-99-179#g"  `grep 119-8-58-20 -rl demo-pipeline-argoevents-tekton-1`
# 替换Argo-events中eventsource的repo，包括owner和names
sed -i -e "s#lanbingcloud#zhangsan#g"  demo-pipeline-argoevents-tekton-1/argo-events/overlays/production/eventsource.yaml
sed -i -e "s#demo-user-project#demo-user-project-1#g"  demo-pipeline-argoevents-tekton-1/argo-events/overlays/production/eventsource.yaml
#  替换Argo-events中init-pipeline.yaml git-clone的代码库地址
sed -i -e "s#https://github.com/lanbingcloud/demo-user-project.git#https://github.com/lanbingcloud/demo-user-project-1.git#g" demo-pipeline-argoevents-tekton-1/argo-events/overlays/production/init-pipeline.yaml
# 目标代码库(fork demo-user-project)
# 替换Pipeline task中拉取代码、推送代码、推送镜像的地址
sed -i -e "s#https://github.com/lanbingcloud/demo-user-project.git#https://github.com/lanbingcloud/demo-user-project-1.git#g" demo-user-project-1/pipelines/test-pipeline.yaml
sed -i -e "s#git@github.com:lanbingcloud/demo-user-deployments.git#git@github.com:lanbingcloud/demo-user-deployments-1.git#g" demo-user-project-1/pipelines/test-pipeline.yaml
# 替换推送镜像的GitHub package
sed -i -e "s#ghcr.io/lanbingcloud#ghcr.io/zhangsan#g" demo-user-project-1/pipelines/test-pipeline.yaml
# 目标代码库(fork demo-user-deployments)
# 替换Deployment中image地址的关键字
sed -i -e "s#ghcr.io/lanbingcloud#ghcr.io/zhangsan#g"  demo-user-deployments-1/deployments/test/devops-sample.yaml 
# 替换应用svc的外部访问地址
sed -i -e "s#119-8-58-20#119-8-99-179#g"  demo-user-deployments-1/deployments/test/devops-sample-svc.yaml 
```

2. clone 目标代码库，执行脚本，批量替换目标代码库的服务地址。

```Shell
sh sed-demo.sh
```

3. push 替换服务地址后的代码到目标代码库。

**安装根 Project 和根 App**
1. 执行命令安装根 Project 和根 App 。
``` Shell
# cd到目标代码库(fork demo-pipeline-argoevents-tekton)的根目录，安装根project
kubectl -nargocd apply -f project.yaml
# 安装根App
kubectl -nargocd apply -f app.yaml
```
2. 获取 ArgoCD 的初始密码，等待 Patch app 和 Traefik app 同步完成，可以访问 [ArgoCD界面](#安装在宿主集群的argocd访问地址)。观察 app 状态，其中 root 和 cert-manager 两个 app 显示同步失败：Vcluster 没有在 ArgoCD 注册，导致 runtime-argocd-appset 和 runtime-appset 找不到目标集群； Kubernetes 集群没有通过 Vault 认证，导致 cert-manager 无法获取密钥。
```Shell
# cd到目标代码库(fork demo-pipeline-argoevents-tekton)的相对路径cmds，执行脚本获取初始密码
sh get-argocd-admin-pwd.sh
# 查看Argocd app状态
kubectl get apps -n argocd
```


### 向 ArgoCD 注册 Vcluster
用于 ArgoCD 向 Vcluster 集群安装运行时资源，包括 runtime-argocd-appset 和 runtime-appset 定义的资源。

1. 准备注册 Vcluster 集群需要的 kubeconfig 文件。
  ```Shell
  # 切换到Kubernetes集群，cd到目标代码库(fork demo-pipeline-argoevents-tekton)的相对路径cmds，执行脚本获取Vcluster的Kubeconfig
  export KUBECONFIG=~/.kube/config
  sh get-vcluster-kubeconfig.sh vcluster1
  # 修改kubeconfig文件，保存到宿主机指定目录
  ...
  clusters:
  - cluster:
      certificate-authority-data: ...
      # 修改为:<宿主机内网IP:Vcluster1的svc nodePort>
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
2. 使用 Argocd 命令注册 Vcluster。
  ``` 
  # 切换到Kubernetes集群，查看svc为Argocd server的ClusterIP
  kubectl get svc argocd-server -n argocd
  # 执行cmds目录下的get-argocd-admin-pwd.sh脚本获取ArgoCD初始密码
  sh get-argocd-admin-pwd.sh
  # 执行命令行登录Argocd：argocd login <Argocd server的ClusterIP>
  argocd login xxx.xxx.xxx.xxx
  # 执行命令行注册Vcluster：argocd cluster add <cluster-name> --kubeconfig=<kubeconfig.yaml>
  argocd cluster add Default31543 --kubeconfig=/opt/vcluster/kubeconfig-31543.yaml
  # 验证Vcluster是否注册成功
  argocd cluster list
  ```
3. 访问[安装在 Kuberetes集群的 ArgoCD 界面](#安装在-kubernetes-集群的-argocd-访问地址)，等待 ArgoCD 自动同步，直到 root app 状态更新为已同步。如果想立即验证效果，删除 runtime-appset 和 runtime-argocd-appset ，等待 ArgoCD 重新生成资源，观察 root app 状态更新为已同步。


### 同步集群认证  
**同步 Kubernetes 集群的认证**  
向 Vault 同步 Kubernetes 集群的认证，用于安装在 Kubernetes 集群上的资源获取 Vault 密钥。
1. 准备配置 Kubernetes 集群认证需要的信息：包括 CA 证书、授权 SA 的 Token、Host 地址。
``` Shell
# 切换到Kubernetes集群，cd到目标代码库(fork demo-pipeline-argoevents-tekton)的相对路径cmds，执行脚本get-cluster-ca.sh获取CA证书
export KUBECONFIG=~/.kube/config
sh get-cluster-ca.sh $KUBECONFIG
# 执行get-vault-auth-token.sh获取token
sh get-vault-auth-token.sh
# 查看kubeconfig文件获取host地址
cat ~/.kube/config
```

2. 启用 Kubernetes 认证方法：访问 Vault界面，点击 Access ，点击 Enable new method，选择 Kubernetes ，点击Next ; 填写 Path 为 host-cluster ，点击 Enable Method ；参见下表填写属性值，点击 Save。

| 属性      | 取值 |
| ----------- | ----------- |
| Kubernetes host   |  Kubernetes 的 Host 地址  |
| Kubernetes CA Certificate |  Kubernetes 的 CA 证书   |
| Token Reviewer JWT |  Kubernetes 的 SA Token   |

3. 新增 Role ：访问 Vault 界面，点击 Access ，点击 Path 为 host-cluster 的认证方法链接；点击 Create role ，参见下表填写属性值，点击 Save。

| 属性      | 取值 |
| ----------- | ----------- |
| Name   |  cert-manager  |
| Bound service account names |  default   |
| Bound service account namespaces |  cert-manager   |
| Generated Token's Policies |  pki-root   |

4. 验证 cert-manager 获取密钥：访问[安装在 Kubernetes 集群的 ArgoCD 界面](#安装在-kubernetes-集群的-argocd-访问地址)，等待 ArgoCD 自动同步，直到 cert-manager app 状态更新为已同步。如果想立即验证效果，删除以下资源：类型为 SecretStore 的 cert-manager-secretstore、类型为 ExternalSecret 的 root-issuer 、类型为 ClusterIssuer 的 org-issuer ，等待 ArgoCD 重新生成资源，观察 cert-manager app 的状态更新为已同步。

**同步 Vcluster集群 的认证**  
向 Vault 同步 Vcluster 集群的认证信息，用于安装在 Vcluster 集群上的资源获取 Vault 密钥。
1. 准备配置 Vcluster 集群认证需要的信息：包括 CA 证书、授权 SA 的 Token、Host地址。
``` Shell
# 切换到 Vcluster 集群，cd到目标代码库(fork demo-pipeline-argoevents-tekton)的相对路径cmds，执行脚本get-cluster-ca.sh获取CA证书
export KUBECONFIG=/opt/vcluster/kubeconfig-31543.yaml
sh get-cluster-ca.sh $KUBECONFIG
# 执行get-vault-auth-token.sh获取token
sh get-vault-auth-token.sh
# 查看kubeconfig文件获取host地址
cat /opt/vcluster/kubeconfig-31543.yaml
```
2. 启用 Kubernetes 认证方法：访问 Vault界面，点击 Access ，点击 Enable new method，选择 Kubernetes ，点击 Next ; 填写 Path 为 pipeline1-cluster ，点击 Enable Method ；参见下表填写属性值，点击 Save。

| 属性      | 取值 |
| ----------- | ----------- |
| Kubernetes host   |  Vcluster 的 Host 地址  |
| Kubernetes CA Certificate |  Vcluster 的 CA 证书   |
| Token Reviewer JWT |  Vcluster 的 SA Token   |

3. 新增 Role：访问 Vault 界面，点击 Access ，点击 Path 为 pipeline1-cluster 的认证方法链接；点击 Create role ，参见下表填写属性值，点击 Save。

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

4. 验证 argo-events 获取密钥：访问[安装在 Vcluster 集群的 ArgoCD 界面](#安装在-vcluster-集群的-argocd-访问地址)，等待 ArgoCD 自动同步，直到 argo-events app 状态更新为已同步。如果想立即验证效果，删除以下资源：类型为 SecretStore 的 webhook-secretstore 、类型为 ExternalSecret 的 github-access 、类型为 EventSource 的 webhook ，等待 ArgoCD 重新生成资源，观察 argo-events app 的状态更新为已同步。
```Shell
# 切换到 Vcluster 集群，cd到目标代码库(fork demo-pipeline-argoevents-tekton)的相对路径cmds，执行脚本获取初始密码
sh get-argocd-admin-pwd.sh
```

### 执行流水线
fork 代码库 demo-user-project ，并向目标代码库提交代码（例如修改pom文件中项目的版本），[访问 Tekton-dashboard ](#tekton-dashboard-访问地址) 观察流水线已经自动执行。
![directive syntax graph](./images/CI-10.jpg)

## 附件
### 参考链接
**GitHub demo 示例：**  
https://github.com/lanbingcloud/demo-vcluster-tekton-argoevents-vaultagent-externalsecrets  
https://github.com/lanbingcloud/demo-pipeline-argoevents-tekton

**B站讲解视频：**  
https://www.bilibili.com/video/BV1yP4y1U7mS/  
https://www.bilibili.com/video/BV1Fm4y1A7qL/

### 安装在 Kubernetes 集群的 ArgoCD 访问地址
协议：https  
地址：来自production/patch/ingress-argocd.yaml的hosts  
端口：来自production/traefik-app.yaml的websecure.nodePort  
示例：https://argocd.119-8-99-179.nip.io:30443  

### 安装在 Vcluster 集群的 ArgoCD 访问地址
协议：https  
地址：来自runtimes/pipeline1-runtime/production/patch/ingress-argocd.yaml的hosts  
端口：来自production/traefik-app.yaml的websecure.nodePort  
示例：https://argocd.pipeline1.119-8-99-179.nip.io:30443

### Tekton-dashboard 访问地址
协议：http  
地址：来自tekton/overlays/production/dashboard-ingress.yaml的host  
端口：来自production/traefik-app.yaml的web.nodePort  
示例：http://tekton.pipeline1.119-8-99-179.nip.io:30080  

### **替换服务地址配置**

#### 代码库：demo-pipeline-argoevents-tekton
fork demo-pipeline-argoevents-tekton 代码库，修改目标代码库的服务地址。

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

##### 替换宿主机 IP 、Vault 服务端 IP
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
      # 替换为Vault服务端的IP和端口
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
      # 替换为Vault服务端的IP和端口
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
          externalVaultAddr: http://192.168.0.243:31820  #替换为Vault服务的IP和端口
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
          externalVaultAddr: http://192.168.0.243:31820  #替换为Vault服务的IP和端口
...
```

##### 替换 Ingress 的域名地址
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

##### 替换 Argo-events Eventsource 的 repo
相对路径：argo-events/overlays/production/eventsource.yaml
```yaml{6,8}
...
spec:
  github:
    user-project:
      repositories:
        - owner: lanbingcloud       # 替换为eventsource监听代码库的owner
          names:
            - demo-user-project-1   # 替换为eventsource监听代码库的name
...
```

##### 替换 Init-pipeline 中 git clone 任务的代码库地址
相对路径：argo-events/overlays/production/init-pipeline.yaml
```yaml{29}
...
spec
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
fork demo-user-project 代码库，修改目标代码库。替换流水线 Task 拉取代码、推送代码、推送镜像的地址。  

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

fork demo-user-deployments 代码库，修改目标代码库。替换应用 Svc 的外部访问地址。

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
