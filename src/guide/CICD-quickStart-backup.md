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
以下工具有多种安装方式，下文只是其中一种。

**安装一个 Kubernetes 集群**  
通过命令安装 K3s。为了让 K3s 安装成功，请确保宿主机已连通外网。
```Shell
# 替换 tls-san 值为宿主机IP
curl -sfL https://get.k3s.io | INSTALL_K3S_VERSION=v1.21.14+k3s1 sh -s - server --disable servicelb --disable traefik --disable metrics-server --tls-san 119.8.99.179
cp /etc/rancher/k3s/k3s.yaml ~/.kube/k3s-config
cp /etc/rancher/k3s/k3s.yaml ~/.kube/config
export KUBECONFIG=~/.kube/config
```
**安装一个 Vault 实例**  
支持安装包、Helm、源码、Docker 等安装方式。下文使用安装包安装。

1. 下载并配置 Vault ，参见[官网](https://developer.hashicorp.com/vault/docs/install#installing-vault)。
2. 更新默认配置文件，启动 Vault 。
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

**在宿主机上安装 ArgoCD 命令行**  
下载并配置 ArgoCD 命令行，参见[官网](https://argo-cd.readthedocs.io/en/stable/cli_installation/#download-with-curl)。

**Fork GitHub demo 代码库**  
- 配置 CI 基础环境和代码提交即触发流水线（简称FT）：[demo-pipeline-argoevents-tekton](https://github.com/lanbingcloud/demo-pipeline-argoevents-tekton)
- 存储应用源码和流水线（简称FP）：[demo-user-project](https://github.com/lanbingcloud/demo-user-project)
- 存储应用部署的资源文件（简称FD）：[demo-user-deployments](https://github.com/lanbingcloud/demo-user-deployments)

## 实施步骤
1. **维护密钥**：在 Vault 中维护本 demo 所需密钥及其访问策略。
2. **安装ArgoCD**：在 Kubernetes 集群上安装 ArgoCD 。
3. **安装ArgoCD app**：在 Kubernetes 集群的 ArgoCD 上 ，创建根 project 和根 app ，ArgoCD 将通过 [App of Apps](https://argo-cd.readthedocs.io/en/stable/operator-manual/cluster-bootstrapping/#app-of-apps-pattern) 的方式在 Kubernetes 集群中部署工具，详情参见[概览](#概览)。
4. **注册 vcluster**： 向 ArgoCD 注册 vcluster 集群，用于 ArgoCD 在 vcluster 集群中安装工具。
5. **同步集群认证**: 在 Vault 中配置 Kubernetes 集群和 vcluster 集群的认证，用于 Kubernetes 集群和 vcluster 集群中的工具获取 Vault 密钥。
6. **执行流水线**：向[代码库 FP](#准备) 推送代码，触发流水线自动执行。

### 维护密钥

**CertManager**  

在 Vault 中维护 TLS 私钥和证书，用于 CertManager 签发证书。


1. 新增私钥和自签证书：执行命令，应答CSR(Certificate Signing Request)提示信息，生成私钥和证书。
  ```Shell
  openssl req \
    -newkey rsa:2048 -nodes -keyout tls.key \
    -x509 -days 365 -out tls.crt
  ```
2. 新增 secret：访问 Vault 界面，点击 secrets，点击 enable new engine，选择 KV ，点击 next；填写 path 为 pki ，点击 enable engine；点击 create secret，参见下表填写属性值，点击 save。

| 属性      | 取值 |
| ----------- | ----------- |
| path for this secret      | root    |
| secret data - key  |  tls.crt  |
| secret data - value |  tls.crt的内容   |
| secret data - key  |  tls.key  |
| secret data - value |  tls.key的内容   |

3. 新增 policy：访问 Vault 界面，点击 policies，点击 create ACL policy，填写 name 为 pki-root，参见下文代码块填写 policy，点击 create policy。
  ```
  path "pki/data/root" {
    capabilities = ["read"]
  }
  ```

**ArgoEvents**  
在 Vault 中维护 GitHub access token 和 GitHub secret，用于 ArgoEvents 创建 Webhook。
1. 新增 GitHub access token：访问 GitHub 任意界面，点击右上角的头像，点击 settings > developer settings > personal access token > token(classic)，点击 generate new token(classic) ； 填写 GitHub 账号的密码，点击 confirm；参见下表填写属性值，点击 generator token。请保存好 token，后续将无法再次查看。更多细节参见[官网](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)。

| 属性      | 取值 |
| ----------- | ----------- |
| note      |  自定义描述    |
| expiration   |  30days(默认值)  |
| select scopes(复选框)   |  选中范围：<br>admin:repo_hook<br>write:packages（用于 pipeline 向 GitHub package 推送镜像） |

2. 新增 secret：访问 Vault界面，点击 secrets，点击 enable new engine，选择 KV，点击 next；填写 path 为 git，点击 enable engine；点击 create secret，参见下表填写属性值，点击 save。

| 属性      | 取值 |
| ----------- | ----------- |
| path for this secret      | github/user-project/argoevents/webhook-access    |
| secret data - key  |  token  |
| secret data - value |  GitHub access token 的内容   |
| secret data - key   |  secret  |
| secret data - value |  GitHub secret 的内容，可以使用随机字符串（例如 UUID）   |

3. 新增 policy：访问 Vault 界面，点击 policies，点击 create ACL policy，填写 name 为 git-github-user-project-argoevents-webhook-access ，参见下文代码块填写 policy ，点击 create policy。
  ```
  path "git/data/github/user-project/argoevents/webhook-access" {
    capabilities = ["read"]
  }
  ```

**pipeline-推送镜像**  
在 Vault 中维护 GitHub access token，用于 pipeline 向 GitHub package 推送镜像。
1. 配置 GitHub package 的认证账号：重用 ArgoEvents 章节的 GitHub access token ，组成 &lt;GitHub account&gt;:&lt;GitHub access token&gt; 格式的字符，并用 Base64 转码。

2. 新增 secret：访问 Vault 界面，点击 secrets ，点击 enable new engine，选择 KV，点击 next；填写 path 为 repo ，点击 enable engine；点击 create secret，参见下表填写属性值，点击 save。

| 属性      | 取值 |
| ----------- | ----------- |
| path for this secret      | github/container/lanbing/default/readwrite    |
| secret data - key   |  auth  |
| secret data - value |  &lt;GitHub account&gt;:&lt;GitHub access token&gt; 通过Base64 转码后的内容  |

3. 新增 policy：访问 Vault 界面，点击 policies ，点击 create ACL policy，填写 name 为 repo-github-container-lanbing-default-readwrite ，参见下文代码块填写 policy，点击 create policy。

  ```  
  path "repo/data/github/container/lanbing/default/readwrite" {
      capabilities = ["read"]
  }
  ```

**pipeline-推送代码**  
在 Vault 中维护 SSH key ，用于 pipeline 向 GitHub 代码库推送代码。
1. 新增 SSH key ：更多细节参见[官网](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)。
  ```Shell 
  # 使用Git客户端生成SSH key，邮箱替换为GitHub账号的邮箱 
  ssh-keygen -t ed25519 -C "your_email@example.com"
  ```
2. 新增 deploy key ： 访问 GitHub 任意界面，点击右上角的头像，点击 your profile；点击 repositories，点击[代码库 FD](#准备) 的名称；进入代码库界面，点击 settings； 在左侧导航栏，点击 deploy keys，然后点击 add deploy key，参考下表填写属性值，点击 add key。更多细节参见[官网](https://docs.github.com/en/developers/overview/managing-deploy-keys#deploy-keys)。


| 属性      | 取值 |
| ----------- | ----------- |
| title      |   自定义     |
| key   |  SSH公钥内容  |
| allow write access(复选框)   |  选中  |


3. 新增 secret：访问 Vault 界面，点击 secrets ，点击 path 为 git 的 secrets engine ；点击 create secret ，参见下表填写属性值，点击 save 。

| 属性      | 取值 |
| ----------- | ----------- |
| path for this secret      | github/user-deployments/default/readwrite       |
| secret data - key   |  deploykey  |
| secret data - value |  SSH私钥内容   |

4. 新增 policy：访问 Vault 界面，点击 policies，点击 create ACL policy，填写 name 为 repo-github-container-lanbing-default-readwrite ，参见下文代码块填写 policy ，点击 create policy 。
  ```  
  path "git/data/github/user-deployments/default/readwrite" {
      capabilities = ["read"]
  }
  ```

### 安装 ArgoCD
在 Kubernetes 集群上安装 ArgoCD 。
```Shell  
# 切换到Kubernetes集群 
export KUBECONFIG=~/.kube/config
# clone目标代码库FT，cd到相对路径cmds，执行安装脚本
sh install-argocd.sh
# 执行补丁脚本 
sh patch-argocd-server.sh
```

### 安装 ArgoCD app

**替换服务地址**   
替换 ArgoCD app 监听的源代码库地址、目标集群地址，以及变更地址后的关联配置。详情参见[替换服务地址配置](#替换服务地址配置)。
1. 更新模板参数：根据下文的脚本模板，替换代码库地址、集群地址等，详见代码注释。

```Shell
# 目标代码库FT
# 批量替换ArgoCD监听的代码库地址为目标代码库地址
sed -i -e "s#https://github.com/lanbingcloud/demo-pipeline-argoevents-tekton.git#https://github.com/lanbingcloud/demo-pipeline-argoevents-tekton-1.git#g"  `grep https://github.com/lanbingcloud/demo-pipeline-argoevents-tekton.git -rl demo-pipeline-argoevents-tekton-1`
# 批量替换宿主机IP、Vault服务端IP(这里Vault也安装在同一台宿主机)
sed -i -e "s#192.168.0.184#192.168.0.243#g"  `grep 192.168.0.184 -rl demo-pipeline-argoevents-tekton-1`
# 批量替换ArgoCD、pipeline的Ingress域名
sed -i -e "s#119-8-58-20#119-8-99-179#g"  `grep 119-8-58-20 -rl demo-pipeline-argoevents-tekton-1`
# 替换ArgoEvents中EventSource的repo，包括owner和names
sed -i -e "s#lanbingcloud#zhangsan#g"  demo-pipeline-argoevents-tekton-1/argo-events/overlays/production/eventsource.yaml
sed -i -e "s#demo-user-project#demo-user-project-1#g"  demo-pipeline-argoevents-tekton-1/argo-events/overlays/production/eventsource.yaml
#  替换ArgoEvents中init-pipeline的git-clone代码库地址
sed -i -e "s#https://github.com/lanbingcloud/demo-user-project.git#https://github.com/lanbingcloud/demo-user-project-1.git#g" demo-pipeline-argoevents-tekton-1/argo-events/overlays/production/init-pipeline.yaml
# 目标代码库FP
# 替换pipeline中拉取代码、推送代码、镜像仓库的地址
sed -i -e "s#https://github.com/lanbingcloud/demo-user-project.git#https://github.com/lanbingcloud/demo-user-project-1.git#g" demo-user-project-1/pipelines/test-pipeline.yaml
sed -i -e "s#git@github.com:lanbingcloud/demo-user-deployments.git#git@github.com:lanbingcloud/demo-user-deployments-1.git#g" demo-user-project-1/pipelines/test-pipeline.yaml
# 替换镜像仓库地址
sed -i -e "s#ghcr.io/lanbingcloud#ghcr.io/zhangsan#g" demo-user-project-1/pipelines/test-pipeline.yaml
# 目标代码库FD
# 替换image地址
sed -i -e "s#ghcr.io/lanbingcloud#ghcr.io/zhangsan#g"  demo-user-deployments-1/deployments/test/devops-sample.yaml 
# 替换应用的Ingress域名
sed -i -e "s#119-8-58-20#119-8-99-179#g"  demo-user-deployments-1/deployments/test/devops-sample-svc.yaml 
```

2. 批量替换服务地址：clone（git clone） 目标代码库，执行脚本，批量替换目标代码库的服务地址。push（git push） 替换服务地址后的代码到目标代码库。

```Shell
sh sed-demo.sh
```

**安装根 project 和根 app**
1. 安装 app：执行命令，安装根 project 和根 app 。
``` Shell
# cd到目标代码库FT的根目录，安装根project
kubectl -n argocd apply -f project.yaml
# 安装根app
kubectl -n argocd apply -f app.yaml
```
2. 跟踪 app：执行命令，获取 ArgoCD 初始密码、并查看 patch app 和 traefik app 的同步状态，当两个 app 同步完成，可以访问 [ ArgoCD 界面](#安装在-kubernetes-集群的-argocd-访问地址) ，界面显示 root 和 cert-manager 同步失败。其中，vcluster 集群没有被注册到 ArgoCD ，造成 runtime-argocd-appset 和 runtime-appset 找不到目标集群，root app 同步失败；Kubernetes 集群 和 vcluster 集群的认证没有被同步到 Vault，导致部署在集群中的工具（例如CertManager、ArgoEvents）获取密钥失败。
```Shell
# 切换到Kubernetes集群 
export KUBECONFIG=~/.kube/config
# cd到目标代码库FT的相对路径cmds，执行脚本获取ArgoCD初始密码
sh get-argocd-admin-pwd.sh
# 查看ArgoCD app状态
kubectl get apps -n argocd
```


### 注册 vcluster
向 Kubernetes 集群的 ArgoCD 注册 vcluster 集群，用于 ArgoCD 在 vcluster 集群安装 pipeline 的相关工具。

1. 准备：配置 vcluster 集群的 kubeconfig 文件。
  ```Shell
  # 切换到Kubernetes集群，cd到目标代码库FT的相对路径cmds，执行脚本获取vcluster的kubeconfig
  export KUBECONFIG=~/.kube/config
  sh get-vcluster-kubeconfig.sh vcluster1
  # 修改kubeconfig文件，保存到宿主机指定目录
  ...
  clusters:
  - cluster:
      certificate-authority-data: ...
      # https://<宿主机内网IP>:<命名空间vcluster1中svc的nodeport>
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
2. 注册：使用 Argocd 命令注册 vcluster。
  ``` 
  # 切换到Kubernetes集群，查看svc为argocd-server的ClusterIP
  kubectl get svc argocd-server -n argocd
  # cd到目标代码库FT的相对路径cmds，执行脚本获取ArgoCD初始密码
  sh get-argocd-admin-pwd.sh
  # 执行命令登录Argocd，格式为：argocd login <argocd-server的ClusterIP>
  argocd login xxx.xxx.xxx.xxx
  # 执行命令注册vcluster，格式为：argocd cluster add <cluster-name> --kubeconfig=<kubeconfig.yaml>
  argocd cluster add Default31543 --kubeconfig=/opt/vcluster/kubeconfig-31543.yaml
  # 查询vcluster是否注册成功
  argocd cluster list
  ```
3. 验证：访问 [Kubernetes 集群的 ArgoCD 界面](#安装在-kubernetes-集群的-argocd-访问地址)，等待 ArgoCD 自动同步，最终 root app 将更新为同步成功。如果想立即验证效果，可以删除 runtime-appset、runtime-argocd-appset ，ArgoCD 将立即生成资源，root app 更新为同步成功。


### 同步集群认证  
**同步 Kubernetes 集群认证**  
向 Vault 同步 Kubernetes 集群认证，用于部署在 Kubernetes 集群中的工具获取 Vault 密钥。
1. 获取 Kubernetes 集群认证的信息：包括 CA 证书、service account token、host 地址。
``` Shell
# 切换到Kubernetes集群，cd到目标代码库FT的相对路径cmds，执行脚本get-cluster-ca.sh获取CA证书
export KUBECONFIG=~/.kube/config
sh get-cluster-ca.sh $KUBECONFIG
# 执行get-vault-auth-token.sh获取token
sh get-vault-auth-token.sh
# 查看kubeconfig文件获取host地址
cat ~/.kube/config
```

2. 启用 Kubernetes 认证方法：访问 Vault界面，点击 access ，点击 enable new method，选择 Kubernetes ，点击 next ; 填写 path 为 host-cluster ，点击 enable method ；参见下表填写属性值，点击 save。

| 属性      | 取值 |
| ----------- | ----------- |
| Kubernetes host   |  host 地址  |
| Kubernetes CA Certificate |  CA 证书   |
| token reviewer JWT |  service account token   |

3. 新增 role ：访问 Vault 界面，点击 access ，点击 path 为 host-cluster 的认证方法链接；点击 create role ，参见下表填写属性值，点击 save。

| 属性      | 取值 |
| ----------- | ----------- |
| name   |  cert-manager  |
| bound service account names |  default   |
| bound service account namespaces |  cert-manager   |
| generated token's policies |  pki-root   |

4. 验证：访问 [Kubernetes 集群的 ArgoCD 界面](#安装在-kubernetes-集群的-argocd-访问地址)，等待 ArgoCD 自动同步，最终 cert-manager app 将更新为同步成功。如果想立即验证效果，可以删除资源：类型为 SecretStore 的 cert-manager-secretstore、类型为 ExternalSecret 的 root-issuer 、类型为 ClusterIssuer 的 org-issuer ， ArgoCD 将立即生成资源，cert-manager app 更新为同步成功。

**同步 vcluster 集群认证**  
向 Vault 同步 vcluster 集群认证，用于部署在 vcluster 集群中的工具获取 Vault 密钥。
1. 获取 vcluster 集群认证的信息：包括 CA 证书、service account token、host地址。
``` Shell
# 切换到vcluster集群，cd到目标代码库FT的相对路径cmds，执行脚本get-cluster-ca.sh获取CA证书
export KUBECONFIG=/opt/vcluster/kubeconfig-31543.yaml
sh get-cluster-ca.sh $KUBECONFIG
# 执行get-vault-auth-token.sh获取token
sh get-vault-auth-token.sh
# 查看kubeconfig文件获取host地址
cat /opt/vcluster/kubeconfig-31543.yaml
```
2. 启用 Kubernetes 认证方法：访问 Vault界面，点击 access ，点击 enable new method，选择 Kubernetes ，点击 next ; 填写 path 为 pipeline1-cluster ，点击 enable method ；参见下表填写属性值，点击 save。

| 属性      | 取值 |
| ----------- | ----------- |
| Kubernetes host   |  host 地址  |
| Kubernetes CA Certificate |  CA 证书   |
| token reviewer JWT |  service account token   |

3. 新增 role：访问 Vault 界面，点击 access ，点击 path 为 pipeline1-cluster 的认证方法链接；点击 create role ，参见下表填写属性值，点击 save。

| 属性      | 取值 |
| ----------- | ----------- |
| name   |  argo-events-sa  |
| bound service account names |  argo-events-sa   |
| bound service account namespaces |  argo-events   |
| generated token's policies |  git-github-user-project-argoevents-webhook-access   |
| name   |  user-pipelines  |
| bound service account names |  default   |
| bound service account namespaces |  user-pipelines   |
| generated token's policies |  git-github-user-deployments-default-readwrite<br>repo-github-container-lanbing-default-readwrite   |

4. 验证：访问 [vcluster 集群的 ArgoCD 界面](#安装在-vcluster-集群的-argocd-访问地址)，等待 ArgoCD 自动同步，最终 argo-events app 将更新为同步成功。如果想立即验证效果，可以删除资源：类型为 SecretStore 的 webhook-secretstore 、类型为 ExternalSecret 的 github-access 、类型为 EventSource 的 webhook ，ArgoCD 将立即生成资源，argo-events app 更新为同步成功。
```Shell
# 切换到vcluster集群，cd到目标代码库FT的相对路径cmds，执行脚本获取ArgoCD初始密码
sh get-argocd-admin-pwd.sh
```

### 执行流水线
向[目标代码库 FP](#准备) 提交代码（例如修改pom文件的项目版本），[访问 Tekton dashboard](#tekton-dashboard-访问地址)  跟踪流水线已经自动执行。
![directive syntax graph](./images/CI-10.jpg)

## 附件
### 参考链接
**GitHub demo 示例**  
https://github.com/lanbingcloud/demo-vcluster-tekton-argoevents-vaultagent-externalsecrets  
https://github.com/lanbingcloud/demo-pipeline-argoevents-tekton

**B站讲解视频**  
https://www.bilibili.com/video/BV1yP4y1U7mS/  
https://www.bilibili.com/video/BV1Fm4y1A7qL/

### 安装在 Kubernetes 集群的 ArgoCD 访问地址
协议：HTTPS  
地址：来自production/patch/ingress-argocd.yaml的hosts  
端口：来自production/traefik-app.yaml的websecure.nodePort  
示例：https://argocd.119-8-99-179.nip.io:30443  

### 安装在 vcluster 集群的 ArgoCD 访问地址
协议：HTTPS  
地址：来自runtimes/pipeline1-runtime/production/patch/ingress-argocd.yaml的hosts  
端口：来自production/traefik-app.yaml的websecure.nodePort  
示例：https://argocd.pipeline1.119-8-99-179.nip.io:30443

### Tekton dashboard 访问地址
协议：HTTP  
地址：来自tekton/overlays/production/dashboard-ingress.yaml的host  
端口：来自production/traefik-app.yaml的web.nodePort  
示例：http://tekton.pipeline1.119-8-99-179.nip.io:30080  

### **替换服务地址配置**

#### 代码库：demo-pipeline-argoevents-tekton
clone [目标代码库 FT](#准备)，修改服务配置。包括监听的代码库地址、宿主机 IP 、Ingress 域名、监听的repo等。

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
          externalVaultAddr: http://192.168.0.243:31820  #替换为Vault服务端的IP和端口
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
          externalVaultAddr: http://192.168.0.243:31820  #替换为Vault服务端的IP和端口
...
```

##### 替换 Ingress 域名
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

##### 替换 ArgoEvents EventSource 的 repo
相对路径：argo-events/overlays/production/eventsource.yaml
```yaml{6,8}
...
spec:
  github:
    user-project:
      repositories:
        - owner: lanbingcloud       # 替换为EventSource监听代码库的owner
          names:
            - demo-user-project-1   # 替换为EventSource监听代码库的name
...
```

##### 替换 init-pipeline 中 git clone 的代码库地址
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
                      # 替换为目标代码库FT的地址
                      value: https://github.com/lanbingcloud/demo-user-project-1.git
```

#### 代码库：demo-user-project
clone [目标代码库 FP](#准备)，修改服务配置。替换 pipeline 拉取代码、推送代码、镜像仓库的地址。 

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
        # 替换为目标代码库FP的地址
        value: https://github.com/lanbingcloud/demo-user-project-1.git
      ...
    - name: git-clone-deployment
      ...
      params:
      - name: url
        # 替换为目标代码库FD的地址
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
        # 替换为镜像仓库地址
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
        # 替换应用部署的镜像地址 
          sed -i -e "s#ghcr.io/zhangsan/devops-sample.*#$(tasks.image-build.results.IMAGE_URL)#g" deployments/test/devops-sample.yaml
          git add deployments/test/devops-sample.yaml
          git commit -a -m "automatic update by pipeline bot: $(tasks.image-build.results.IMAGE_URL)"
          git push origin HEAD:$(params.REVISION) --force
```

#### 代码库：demo-user-deployments

clone [目标代码库 FD](#准备)，修改服务配置。替换应用的 Ingress 域名。


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
