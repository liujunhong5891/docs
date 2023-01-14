---
footer: false
outline: deep
---

## 目标
基于开源工具搭建CI环境，并实现一个代码提交即构建的流水线。

## 工具及其关系概览
![directive syntax graph](./images/CI-1.jpg)

**部署结构**  
1. 一个vault服务端：存储搭建CI环境和流水线的相关密钥。
2. 一个kubernetes集群：宿主集群，负载所有资源。
3. 一个vcluster集群：运行时集群，负载运行时集群的资源。

**安装顺序**  
1. 手工安装宿主集群的argoCD。
2. 在宿主集群，手工安装根project（demo-vcluster）和根app（root）。
3. 宿主集群的argoCD向宿主集群自动安装资源，包括cert-manager、metallb、traefik、vault、external-secretes、vcluser、以及vcluser上的argoCD。
4. vcluser的argoCD向vcluster集群自动安装资源，包括argo-events、tekton、vault、external-secrets。

**根app监听的代码库结构**
1. cert-manager-app：cert-manager是签发证书的工具。cert-manager-app监听git代码库（相对路径参见spec.source.path），向宿主集群部署（目标集群参见spec.destination.server）；通过ExternalSecret从vault同步证书和私钥生成k8s secret，并使用ClusterIssuer给集群资源签发证书。

3. metallb-app：metallb为裸金属k8s集群提供lb服务。metallb-app的配置源为helm，向宿主集群部署。
【metallb和ingress关系？】

7. traefik-app：traefik是反向代理工具，用于实现ingress。traefik-app的配置源为helm，向宿主集群部署。【作为用户要了解哪些资源关系】

8. vault-app：配置源为helm，向宿主集群部署；与ExternalSecret协作，向安装在宿主集群的资源同步vault密钥。

9.  vault-rbac：创建并授权k8s sa，用于vault对宿主集群的认证。

9.  external-secret-app：ExternalSecret用于集成密钥管理系统（例如vault），同步为k8s secret。external-secret-app的配置源为helm，向宿主集群部署。

10. patch-app：patch-app监听git代码库，向宿主集群部署；用于安装argoCD的补丁资源（Ingress和ServersTransport），以访问argoCD UI界面。
【ingress和servertransport怎么协作？】

1.   vcluster-appset：vcluster是可以在物理k8s集群中创建虚拟集群的工具。vcluster-appset监听git代码库（相对路径参见spec.template.spec.source.path），向宿主集群部署（目标集群参见spec.template.spec.destination.server）；通过创建vcluster1-app和vcluster1-patch app来安装运行时集群，其中：
     - vcluster1-app的配置源为helm，向宿主集群部署；用于安装vcluster集群； 
     - vcluster1-patch监听git代码库，向宿主集群部署；用于安装vcluster集群的补丁资源，包括namespace、ingress和svc等资源。【ingress和svc在哪用到？】

2. runtime-appset：appset（即ApplicationSet）适用于通过多种形态的argocd app集合自动扩缩容集群、自动部署多个app到单集群或多集群等场景。runtime-appset监听git代码库（相对路径参见spec.template.spec.source.path），向运行时集群部署（目标集群参见spec.template.spec.destination.server）；通过创建demo-pipeline project和pipeline1 app来安装运行时资源，其中pipeline1 app安装的资源包括：
   - argo-events-app：argo-events是提供事件监听、转换和触发的工具。argo-events-app监听git代码库，向运行时集群部署；【待补充，argo-events章节】
   - external-secret-app：external-secret-app的配置源为helm，向运行时集群部署。
   - patch-app：patch-app监听git代码库，向运行时集群部署；用于安装argoCD的补丁资源（Ingress），以访问运行时集群的argoCD UI界面。
   - tekton-app：tekton是k8s原生的流水线工具。tekton-app监听git代码库，向运行时集群部署；安装了CI流水线需要的task以及tekton dashboard，用于编排、执行并跟踪CI流水线； 其中CI流水线task包括：git-cli（执行git操作）、git-clone（clone git代码库到workspace）、kaniko（构建并推送镜像到镜像库）、maven（执行maven构建）。
   - user-namespaces-app：用户侧app，用于安装CI流水线需要的namespace、pvc和rbac资源。
   - vault-app：vault是密钥管理工具。vault-app的配置源为helm，向运行时集群部署； 通过vault agent injector方式向CI流水线task提供密钥。
   - vault-rbac：创建并授权k8s sa，用于vault对运行时集群的认证。

3. runtime-argocd-appset：监听git代码库，向运行时集群部署；用于安装运行时集群的argoCD，结合ingress资源，可访问运行时集群的argoCD UI界面。

【其他：运行时集群相关资源的层级排版 不超过三层】

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

**在宿主机安装argocd命令行**  
下载并配置argoCD命令行，参见[官网链接](https://argo-cd.readthedocs.io/en/stable/cli_installation/#download-with-curl)。

**fork Github DEMO代码库**  
- 配置CI基础环境和代码提交即触发流水线：[demo-pipeline-argoevents-tekton](https://github.com/lanbingcloud/demo-pipeline-argoevents-tekton)
- 存储应用源码和流水线：[demo-user-project](https://github.com/lanbingcloud/demo-user-project)
- 存储应用部署的资源文件：[demo-user-deployments](https://github.com/lanbingcloud/demo-user-deployments)

## 实施步骤

- **维护密钥**：在Vault中维护本次DEMO需要的所有密钥及其访问策略。
- **安装Argo CD**：在宿主集群安装Argo CD。
- **安装Argo CD app**： 在宿主集群上的Argo CD，创建根Project和根App，Argo CD将通过[App of Apps](https://argo-cd.readthedocs.io/en/stable/operator-manual/cluster-bootstrapping/#app-of-apps-pattern)的方式自动安装宿主集群的资源、运行时集群以及运行时集群的资源。
- **同步集群认证**: 在Vault中配置宿主集群和运行时集群的认证，用于Kubernetes资源获取Vault密钥。
- **执行流水线**：向fork [demo-user-project](https://github.com/lanbingcloud/demo-user-project)的目标代码库推送代码，触发流水线自动执行。


### 维护密钥
**cert-manager**  

维护TLS私钥和证书，用于cert-mananger签发证书。


1. 新增私钥和自签证书：使用下文命令，应答CSR提示信息，生成私钥和证书。
  ```Shell
  openssl req \
    -newkey rsa:2048 -nodes -keyout tls.key \
    -x509 -days 365 -out tls.crt
  ```
2. 新增Secret：访问Vault界面，点击Secrets，点击 Enable new engine，选择KV，点击Next；填写Path为pki，点击Enable Engine；点击Create secret，参见下表填写属性值，点击Save。

| 属性      | 取值 |
| ----------- | ----------- |
| Path for this secret      | root    |
| Secret data - key  |  tls.crt  |
| Secret data - value |  tls.crt的内容   |
| Secret data - key  |  tls.key  |
| Secret data - value |  tls.key的内容   |

3. 新增Policy：访问Vault界面，点击Policies，点击Create ACL policy，填写Name为pki-root，参见下文代码块填写policy，点击Create policy。
  ```
  path "pki/data/root" {
    capabilities = ["read"]
  }
  ```

**argo-events**  
创建GitHub access token和GitHub secret，用Argo Event创建Webhook。
1. 新增GitHub access token：访问GitHub任意界面，点击右上角的头像，点击 Settings > Developer settings > Personal access token > Token(classic)，点击 Generate new token(classic) ； 填写GitHub账号的密码，点击 Confirm；参见下表填写属性值，点击 Generator token。请保存好Token，后续将无法再次查看。更多细节[参见官网](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)。

| 属性      | 取值 |
| ----------- | ----------- |
| Note      |  自定义描述    |
| Expiration   |  30days(默认值)  |
| Select scopes(复选框)   |  admin:repo_hook<br>write:packages（用于Pipeline向GitHub Package推送镜像） |

2. 新增Secret：访问Vault界面，点击Secrets，点击 Enable new engine，选择KV，点击Next；填写Path为git，点击Enable Engine；点击Create secret，参见下表填写属性值，点击Save。

| 属性      | 取值 |
| ----------- | ----------- |
| Path for this secret      | github/user-project/argoevents/webhook-access    |
| Secret data - key  |  token  |
| Secret data - value |  GitHub access token的内容   |  
| Secret data - key   |  secret  |
| Secret data - value |  GitHub secret的内容，可以使用随机字符串（例如UUID）   |

3. 新增Policy：访问Vault界面，点击Policies，点击Create ACL policy，填写Name为git-github-user-project-argoevents-webhook-access，参见下文代码块填写Policy，点击Create policy。
  ```
  path "git/data/github/user-project/argoevents/webhook-access" {
    capabilities = ["read"]
  }
  ```

**pipeline-推送镜像**  
使用GitHub access token，用于Pipeline向GitHub package推送镜像。
1. 配置与GitHub package进行身份认证的账号：重用argo-events章节的GitHub access token，组成 &lt;GitHub account&gt;:&lt;GitHub access token&gt; 格式的字符，并对字符进行base64转码。

2. 新增secret：访问Vault界面，点击Secrets，点击 Enable new engine，选择KV，点击Next；填写Path为repo，点击Enable Engine；点击Create secret，参见下表填写属性值，点击Save。

| 属性      | 取值 |
| ----------- | ----------- |
| Path for this secret      | github/container/lanbing/default/readwrite    |
| Secret data - key   |  auth  |
| Secret data - value |  &lt;GitHub account&gt;:&lt;GitHub access token&gt;通过base64转码后的字符  |

3. 新增Policy：访问Vault界面，点击Policies，点击Create ACL policy，填写Name为repo-github-container-lanbing-default-readwrite，参见下文代码块填写Policy，点击Create policy。

  ```  
  path "repo/data/github/container/lanbing/default/readwrite" {
      capabilities = ["read"]
  }
  ```

**pipeline-推送代码**  
使用SSH keys，用于Pipeline向GitHub代码库推送代码。
1. 新增SSH keys：更多细节参见[官网](https://docs.github.com/zh/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)。
  ```Shell 
  # 使用git客户端生成SSH keys，邮箱替换为github账号的邮箱 
  ssh-keygen -t ed25519 -C "your_email@example.com"
  ```
2. 新增Deploy key： 访问GitHub任意界面，点击右上角的头像，点击 Your profile；点击 Repositories，点击目标代码库名称(fork [demo-user-deployments](https://github.com/lanbingcloud/demo-user-deployments))；进入代码库界面，点击 Settings； 在左侧导航栏，点击 Deploy Keys，然后点击 Add deploy key，参考下表填写属性值，点击 Add key。更多细节参见[官网](https://docs.github.com/en/developers/overview/managing-deploy-keys#deploy-keys)。


| 属性      | 取值 |
| ----------- | ----------- |
| Title      |   自定义     |
| Key   |  SSH公钥内容  |
| Allow write access   |  选中复选框  |


3. 新增Secret：访问Vault界面，点击Secrets，点击Path为git的Secrets Engine；点击Create secret，参见下表填写属性值，点击Save。

| 属性      | 取值 |
| ----------- | ----------- |
| Path for this secret      | github/user-deployments/default/readwrite       |
| Secret data - key   |  deploykey  |
| Secret data - value |  SSH私钥内容   |

4. 新增Policy：访问Vault界面，点击Policies，点击Create ACL policy，填写Name为repo-github-container-lanbing-default-readwrite，参见下文代码块填写Policy，点击Create policy。
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
# 执行补丁脚本 
sh patch-argocd-server.sh
```

### 安装argoCD app

**替换服务地址**  
变更范围包括：argoCD app监听的源代码库地址、宿主集群的地址、运行时集群的地址，以及变更地址的关联资源，详情参见[替换服务地址配置](#替换服务地址配置)。
1. 根据下文模板，替换代码库地址、集群地址等，详见下文代码注释。

```Shell
# 目标代码库(fork demo-pipeline-argoevents-tekton)
# 批量替换argocd监听代码库地址为目标代码库
sed -i -e "s#https://github.com/lanbingcloud/demo-pipeline-argoevents-tekton.git#https://github.com/lanbingcloud/demo-pipeline-argoevents-tekton-1.git#g"  `grep https://github.com/lanbingcloud/demo-pipeline-argoevents-tekton.git -rl demo-pipeline-argoevents-tekton-1`
# 批量替换宿主集群IP地址、宿主机IP地址、vault服务端IP地址(这里vault也安装在同一台宿主机)
sed -i -e "s#192.168.0.184#192.168.0.243#g"  `grep 192.168.0.184 -rl demo-pipeline-argoevents-tekton-1`
# 批量替换ingress的域名地址
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
# 替换Deployment中image地址的关键字
sed -i -e "s#ghcr.io/lanbingcloud#ghcr.io/zhangsan#g"  demo-user-deployments-1/deployments/test/devops-sample.yaml 
# 替换应用svc的外部访问地址
sed -i -e "s#119-8-58-20#119-8-99-179#g"  demo-user-deployments-1/deployments/test/devops-sample-svc.yaml 
```

2. clone目标代码库，执行脚本，批量替换目标代码库的服务地址。

```Shell
sh sed-demo.sh
```

3. push替换后的服务地址到目标代码库。

**安装根project和根app**
1. 使用命令安装根project和根app。
``` Shell
# cd到目标代码库(fork demo-pipeline-argoevents-tekton)的根目录，安装根project
kubectl -nargocd apply -f project.yaml
# 安装根app
kubectl -nargocd apply -f app.yaml
```
2. 获取argoCD的初始密码，等待patch app和traefik app同步完成，可以访问[argoCD界面](#安装在宿主集群的argocd访问地址)。观察app状态，其中root和cert-manager两个app显示同步失败：vcluster没有在argoCD注册，导致runtime-argocd-appset和runtime-appset找不到目标集群； 宿主集群没有通过vault认证，导致cert manager无法获取密钥。
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
  # 切换到宿主集群，查看argocd server的svc类型的clusterIP
  # 执行cmds目录下的get-argocd-admin-pwd.sh脚本获取argoCD初始密码
  sh get-argocd-admin-pwd.sh
  # 使用命令行登录argocd：argocd login <argocd server的svc类型的clusterIP>
  argocd login xxx.xxx.xxx.xxx
  # 使用命令行注册vcluster：argocd cluster add <cluster-name> --kubeconfig=<kubeconfig.yaml>
  argocd cluster add Default31543 --kubeconfig=/opt/vcluster/kubeconfig-31543.yaml
  # 验证vcluster是否注册成功
  argocd cluster list
  ```
3. 访问[安装在宿主集群的argoCD界面](#安装在宿主集群的argocd访问地址)，等待argoCD自动同步，直到root app状态更新为已同步。如果想立即验证效果，删除runtime-appset和runtime-argocd-appset，等待argoCD重新生成资源，观察root app状态更新为已同步。


### 向vault同步宿主集群和运行时集群的认证信息  
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

2. 启用kubernetes认证方法：访问vault界面，点击"Access"一级菜单,进入Authentication Methods的配置界面，点击Enable new method，选择类别为Kubernetes，点击Next; 进入Enable Kubernetes Authentication Method的配置界面，设置Path为host-cluster，点击Enable Method; 进入Configure Kubernetes的配置界面，参见下表填写属性值，点击Save完成启用kubernetes认证方法。

| 属性      | 取值 |
| ----------- | ----------- |
| Kubernetes host   |  宿主集群的host地址  |
| Kubernetes CA Certificate |  宿主集群的CA证书   |
| Token Reviewer JWT |  宿主集群的sa token   |

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
2. 启用kubernetes认证方法：访问vault界面，点击"Access"一级菜单,进入Authentication Methods的配置界面，点击Enable new method，选择类别为Kubernetes，点击Next; 进入Enable Kubernetes Authentication Method的配置界面，设置Path为pipeline1-cluster，点击Enable Method; 进入Configure Kubernetes的配置界面，参见下表填写属性值，点击Save完成启用kubernetes认证方法。

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

##### 替换ingress的域名地址
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
        - owner: lanbingcloud       # 替换为eventsource监听代码库的owner
          names:
            - demo-user-project-1   # 替换为eventsource监听代码库的name
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
