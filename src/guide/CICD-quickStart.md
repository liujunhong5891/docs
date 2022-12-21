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
以下服务有多种安装方式，下文只是其中一种方式。【说明的适用范围】

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

- 下载并配置vault，参见[官网链接](https://developer.hashicorp.com/vault/docs/install#precompiled-binaries)。
  
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
- **向vault同步宿主/运行时集群的认证信息**: 同步集群的认证信息，帮助kubernetes资源使用存储在vault的密钥。
- **执行流水线**：向fork [demo-user-project](https://github.com/lanbingcloud/demo-user-project)的目标代码库推送代码，触发流水线自动执行。


### 维护密钥
#### cert-manager
存储cert-manager的证书和私钥。
- 这里使用[预置的证书和私钥](#预置的证书和私钥)。
- 访问vault界面，创建secret和policy：
  - 创建secret：启用Secrets Engine、并创建secret，详情参见下表：  

  |  |  | 属性（或者key） | 值 |
  | :-----| :---- | :-----| :---- |
  | Secrets Engine |  | type | KV |
  |  |  | path | pki |
  | secret |  | secret path | root |
  |  | secret data | tls.crt |  |
  |  | secret data | tls.key |  |
  - 创建policy：设置policy名称为pki-root，参见下文代码块。
  ```
  path "pki/data/root" {
    capabilities = ["read"]
  }
  ```

#### argo-events
存储argoevents需要的密钥，包括：创建github webhook的accesstoken、防止webhook被非法调用的github secret。
- 新增github accesstoken：访问目标代码库（fork [demo-user-project](https://github.com/lanbingcloud/demo-user-project)）的github界面，在“账号Settings - Developer settings - Personal access token - Token(classic)”操作路径下，新增classic类型的token，填写描述、选择授权范围（授予repo和project的权限）后保存。保存生成的token，关闭界面之后将不再显示。 
- 新增github secret：访问目标代码库（fork [demo-user-project](https://github.com/lanbingcloud/demo-user-project)）的github界面，在“Settings-Security-Secrets-Actions”操作路径下，新增repository secrets，填写secrets后保存，secrets可以是随机字符串（例如uuid）。保存明文的secrets，关闭界面之后将不再显示明文。
- 访问vault界面，配置secrets和policy：
  - 创建secret：启用Secrets Engine、并创建secret，详情参见下表：
  
  |  |  | 属性（或者key） | 值 |
  | :-----| :---- | :-----| :---- |
  | Secrets Engine |  | type | KV |
  |  |  | path | git |
  | secret |  | secret path | github/user-project/argoevents/webhook-access |
  |  | secret data | token | github accesstoken |
  |  | secret data | secret | github secret（明文） |
  - 创建policy：设置policy名称为git-github-user-project-argoevents-webhook-access，参见下文代码块。
  ```
  path "git/data/github/user-project/argoevents/webhook-access" {
    capabilities = ["read"]
  }
  ```
#### pipeline
1. 存储向github packager推送镜像的密钥。
- 新增推送镜像的github账号密码。组成格式为：<account_name>:<personal_access_tokens>，例如：zhangsan:ghp_xxxx。这里使用了和argo-events相同的accesstoken，具备repo的写入权限。再使用base64加密，保存备用。
- 访问vault界面，配置secrets和policy：
  - 创建secrets：启用Secrets Engine、并创建secret，详情参见下表：
  
  |  |  | 属性（或者key） | 值 |
  | :-----| :---- | :-----| :---- |
  | Secrets Engine |  | type | KV |
  |  |  | path | repo |
  | secret |  | secret path | github/container/lanbing/default/readwrite |
  |  | secret data | auth | github账号密码（密文） |

  - 创建policy：设置policy名称为repo-github-container-lanbing-default-readwrite，参见下文代码块。
  ```  
  path "repo/data/github/container/lanbing/default/readwrite" {
      capabilities = ["read"]
  }
  ```

2. 存储向目标代码库推送代码的密钥。
- 新增ssh密钥。
  ```Shell 
  # 使用git客户端生成密钥，其中邮箱替换为github账号的邮箱 
  ssh-keygen -t ed25519 -C "your_email@example.com"
  # ssh密钥的默认名称为：id_ed25519、id_ed25519.pub
  ls -al ~/.ssh
  eval "$(ssh-agent -s)"
  ssh-add ~/.ssh/id_ed25519
  cat ~/.ssh/id_ed25519
  cat ~/.ssh/id_ed25519.pub
  ```
- 访问目标代码库(fork [demo-user-deployments](https://github.com/lanbingcloud/demo-user-deployments))的github界面，新增deploy key，设置值为ssh公钥，并授权代码库的写入权限。

- 访问vault界面，配置secrets和policy：
  - 创建secrets：启用Secrets Engine、并创建secret，详情参见下表：
  
  |  |  | 属性（或者key） | 值 |
  | :-----| :---- | :-----| :---- |
  | Secrets Engine |  | type | KV |
  |  |  | path | git |
  | secret |  | secret path | github/user-deployments/default/readwrite |
  |  | secret data | deploykey | ssh私钥(末尾预留一行空行) |
  - 创建policy：设置policy名称为git-github-user-deployments-default-readwrite，参见下文代码块。
  ```  
  path "git/data/github/user-deployments/default/readwrite" {
      capabilities = ["read"]
  }
  ```

### 安装argoCD
在k8s空集群上安装argocd，供后续基于该argocd自动安装一系列工具。
```Shell  
# 切换到k8s空集群的上下文，fork一份demo代码到宿主机的某目录; 
export KUBECONFIG=~/.kube/config
# cd到fork代码目录（相对路径为cmds），执行argocd安装脚本install-argocd.sh; 
sh install-argocd.sh
# 为argocd添加补丁，执行patch-argocd-server.sh，后续等待trafik、ingress安装完毕可通过浏览器访问argocd； 
sh patch-argocd-server.sh
```

### 安装argoCD app
根据k8s空集群上已安装的argocd，创建根project、app，使得argocd通过app of apps的方式自动安装运行在k8s空集群上的资源、运行时集群以及运行时集群上的资源。

#### 替换服务地址
需要变更的代码主要包括argocd app监听的源代码库地址（需变更为fork出来的代码库）、宿主集群（k8s空集群）的地址、运行时集群的地址，以及地址变更影响的配套资源，详情参见“附件-替换服务地址配置”。
- 根据脚本模板sed-demo.sh，按需替换，详见下文代码注释。
```shell
# 查看替换服务地址的脚本sed-demo.sh
cat sed-demo.sh
# 代码库：demo-pipeline-argoevents-tekton
# 批量替换argocd监听代码库为fork下来的代码库地址； 
sed -i -e "s#https://github.com/lanbingcloud/demo-pipeline-argoevents-tekton.git#https://github.com/lanbingcloud/demo-pipeline-argoevents-tekton-1.git#g"  `grep https://github.com/lanbingcloud/demo-pipeline-argoevents-tekton.git -rl demo-pipeline-argoevents-tekton-1`
# 批量替换替换宿主集群IP地址、宿主机IP、vault服务端IP； 
sed -i -e "s#192.168.0.184#192.168.0.243#g"  `grep 192.168.0.184 -rl demo-pipeline-argoevents-tekton-1`
# 批量替换ingress等nip的地址：
sed -i -e "s#119-8-58-20#119-8-99-179#g"  `grep 119-8-58-20 -rl demo-pipeline-argoevents-tekton-1`
# 替换argo-events的eventsource的repo信息，将<zhangsan>替换为对应的owner；本示例与demo使用相同的owner，因此省略该步骤 
# sed -i -e "s#lanbingcloud#zhangsan#g"  demo-pipeline-argoevents-tekton-1/argo-events/overlays/production/eventsource.yaml
sed -i -e "s#demo-user-project#demo-user-project-1#g"  demo-pipeline-argoevents-tekton-1/argo-events/overlays/production/eventsource.yaml
#  替换init-pipeline.yaml的git-clone task的代码库地址：
sed -i -e "s#https://github.com/lanbingcloud/demo-user-project.git#https://github.com/lanbingcloud/demo-user-project-1.git#g" demo-pipeline-argoevents-tekton-1/argo-events/overlays/production/init-pipeline.yaml

# 代码库：demo-user-project
# 替换流水线task拉取代码、推送代码、推送镜像的地址； 
sed -i -e "s#https://github.com/lanbingcloud/demo-user-project.git#https://github.com/lanbingcloud/demo-user-project-1.git#g" demo-user-project-1/pipelines/test-pipeline.yaml
sed -i -e "s#git@github.com:lanbingcloud/demo-user-deployments.git#git@github.com:lanbingcloud/demo-user-deployments-1.git#g" demo-user-project-1/pipelines/test-pipeline.yaml
# 替换推送镜像的github package；本示例与demo使用相同的package，因此省略该步骤
# sed -i -e "s#ghcr.io/lanbingcloud#ghcr.io/zhangsan#g" demo-user-project-1/pipelines/test-pipeline.yaml

# 代码库：demo-user-deployments
# 替换业务应用svc的外部访问地址
sed -i -e "s#119-8-58-20#119-8-99-179#g"  demo-user-deployments-1/deployments/test/devops-sample-svc.yamlroot@ecs-bd3f:/opt/git/lanbingcloud# 
```

> 说明：
> - 上文脚本模板引用的fork代码库地址分别为：  
> https://github.com/lanbingcloud/demo-pipeline-argoevents-tekton-1.git  
> https://github.com/lanbingcloud/demo-user-project-1.git  
> https://github.com/lanbingcloud/demo-user-deployments-1.git
> - 安装k8s空集群的服务器内网IP：192.168.0.184，外网IP：119.8.99.179。

- 执行sed-demo.sh脚本，批量更新demo代码库的相关配置。
```shell
# 客户端克隆fork的代码库，保持sed-demo.sh与三个demo目录处于相同层级，执行脚本替换代码
sh sed-demo.sh
```

#### 安装根project和根app
通过命令安装根project和根app。
``` 
# cd到demo代码库根目录，安装根project
kubectl -nargocd apply -f project.yaml
# 安装根app，等待初始化结束；
kubectl -nargocd apply -f app.yaml
# 查看argocd app的安装进度和状态，安装过程需要等待一段时间
kubectl -nargocd get apps --watch
```
通过界面访问安装在k8s空集群上的argoCD（此处示例的argoCD访问地址为https://argocd.119-8-99-179.nip.io:30443），并执行脚本cmds/get-argocd-admin-pwd.sh，可获取argoCD的初始密码；初始化结束后观察app状态，两个app未完成同步，其他app处于已同步状态。
- cert-manager：vault服务端未设置了宿主集群（原k8s空集群）的auth授权，导致cert-manager app同步异常； 
- root：新生成的vcluster集群没有注册到宿主集群的argoCD，导致runtime-appset、runtime-argocd-appset同步异常。
<!-- ![avatar](images/argocd_install_2.jpg) -->



#### 修复root app - 注册集群
对于root app，注册vcluster，使得root app的两个appset可以找到目标部署集群完成部署。
- 执行脚本cmds目录下的脚本get-vcluster-kubeconfig.sh获取vcluster的config文件，并保存到宿主机指定目录；并修改config文件的clusters[0].server=https:<内网IP>:<vcluster1-svc的nodeport>、contexts[0].name=<自定义名称>、  current-context=<自定义名称>; 
- 通过argocd命令添加vcluster；
   ``` 
   # 切换到宿主集群（原k8s空集群）的上下文，临时修改argocd server的svc类型为NodePort（过程略）; 
   # 使用命令行登录argocd，规则：argocd login <内网IP>:<argocd server svc的nodeport>； 
   # 执行cmds目录下的get-argocd-admin-pwd.sh脚本可以获取初始密码； 
   argocd login 192.168.0.243:30070
   # 切换到vcluster的上下文
   export KUBECONFIG=/opt/vcluster/kubeconfig-31543.yaml
   # 规则：argocd cluster add <cluster-name> --kubeconfig=<kubeconfig.yaml>
   argocd cluster add Default31543 --kubeconfig=/opt/vcluster/kubeconfig-31543.yaml
   # 查看argocd的集群信息，检查集群是否注册成功
   argocd cluster list
   ```
- 回到argoCD访问界面，进入root app，删除runtime-appset和runtime-argocd-appset，强制其重新生成，观察root app的同步状态更新为已同步。

### 向vault同步宿主集群/运行时集群的认证信息【补充】
#### 修复cert-manager app - 配置vault授权

对于cert-manager app，通过vault界面配置宿主集群（原k8s空集群）与vault服务端的auth授权。
- 准备auth方法需要的信息，包括：kubernetes集群的CA证书、授权sa的token、集群host地址；切换到原k8s空集群的上下文，执行cmds目录下的脚本get-cluster-ca.sh获取CA证书内容、执行get-vault-auth-token.sh获取token、查看~/.kube/config文件明确host地址； 
- 启用auth方法，类型为kubernetes，path为host-cluster，并且需要将CA证书、token和host等上述信息上传或填写到vault的auth方法；
- 对于当前的auth方法，创建配套role，确保cert-manager app可以获取vault中相应的secrets。其中role名称为cert-manager，授权sa为default，授权ns为cert-manager, 授权policy为pki-root，将以上信息保存为auth方法的role;
- 回到argoCD访问界面，进入cert-manager app，删除名称为cert-manager-secretstore（类型=SecretStore）、root-issuer（类型=ExternalSecret）、org-issuer（类型=ClusterIssuer）的资源，强制其重新生成；再次观察cert-manager app状态为已同步。

#### 修复pipeline1 app - 配置vault授权
当root app状态显示为已同步，通过安装在vcluster上的argoCD访问界面，观察pipeline1 app的相关资源是否安装就绪。
- 查看argoCD的界面访问地址（此处示例为https://argocd.pipeline1.119-8-99-179.nip.io:30443），切换到vcluster集群的上下文，使用cmds目录下的get-argocd-admin-pwd.sh脚本可获取初始密码； 
- 观察安装在vcluster上的app状态，此时发现有user-namespaces、argo-events两个app并未处于同步状态。user-namespaces app的pvc一直是pending状态，由于pvc暂未被pods使用，这是正常现像；argo-events app的secretStore资源异常，vault服务端需要给vcluster集群授权；
- 通过vault界面配置vcluster集群的auth授权
  - 启用auth方法，类型为kubernetes，path为pipeline1-cluster; 并且需要将vcluster集群的CA证书、token和host等信息上传或填写到vault的auth方法。获取相关信息参见cert-manager app，不再赘述； 
  - 对于当前auth-kubernetes的方法，创建配套role，确保argo-events app可以获取vault中相应的secrets。 其中role=argo-events-sa，授权sa=argo-events-sa，授权ns=argo-events, 授权policy=git-github-user-project-argoevents-webhook-access; 将以上信息提交为上述auth方法的role;
- 通过argoCD界面删除argo-events app的资源，包括名称为webhook-secretstore（类型=SecretStore）、github-access（类型=ExternalSecret）、webhook（类型=EventSource）的资源，强制其重新生成；观察argoevents app状态为已同步。

### 执行流水线
用户侧代码库（此处指demo-user-project）提交代码之后，使用tekton dashboard观察流水线是否自动执行。 
本次示例的tekton dashboard地址为：http://tekton.pipeline1.119-8-99-179.nip.io:30080。
![directive syntax graph](./images/CI-10.jpg)
- 提交用户侧代码，观察流水线已经触发自动执行；
- 发现流水线执行时卡顿在git-clone-deployment task，检查vault服务端未配置授权。确认auth方法的path为pipeline1-cluster（前置步骤已配置），role为user-pipelines，sa为default，ns为user-pipelines，授权policy为git-github-user-deployments-default-readwrite，完整检查流水线的secrets涉及的policy还包括repo-github-container-lanbing-default-readwrite;
- 通过vault界面给path为pipeline1-cluster的auth方法配置role，使用上述信息配置；
- 再次提交用户侧代码，观察流水线执行成功。

## 附件

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

### 参考链接
**Github DEMO示例：**  
https://github.com/lanbingcloud/demo-vcluster-tekton-argoevents-vaultagent-externalsecrets  
https://github.com/lanbingcloud/demo-pipeline-argoevents-tekton

**B站讲解视频：**  
https://www.bilibili.com/video/BV1yP4y1U7mS/  
https://www.bilibili.com/video/BV1Fm4y1A7qL/

**vault相关：**  
https://developer.hashicorp.com/vault/docs/install#installing-vault  
https://developer.hashicorp.com/vault/docs/install#precompiled-binaries  
https://support.hashicorp.com/hc/en-us/articles/4404389946387-Kubernetes-auth-method-Permission-Denied-error  
https://developer.hashicorp.com/vault/docs

**argoCD命令行安装：**  
https://tanzu.vmware.com/developer/guides/argocd-gs/#install-and-set-up-the-argocd-cli

**github access token：**  
https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token

**github ssh证书相关：**  
https://docs.github.com/cn/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent  
https://docs.github.com/cn/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account

**argoevent webhook：**  
https://argoproj.github.io/argo-events/eventsources/webhook-authentication/

**推送image到github仓库：**  
https://docs.github.com/en/actions/publishing-packages/publishing-docker-images

### **替换服务地址配置**

#### 代码库：demo-pipeline-argoevents-tekton
fork demo-pipeline-argoevents-tekton代码库，修改复制后的代码库。

##### 替换监听的代码库地址
相对路径：app.yaml
```yaml{7}
...
spec:
  project: demo-vcluster
  source:
    path: production
    # 替换为fork下来的代码库地址
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
        # 替换为fork下来的代码库地址
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
    # 替换为fork下来的代码库地址
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
        # 替换为fork下来的代码库地址
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
        # 替换为fork下来的代码库地址
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
    # 替换为fork下来的代码库地址
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
    # 替换为fork下来的代码库地址
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
    # 替换为fork下来的代码库地址
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
    # 替换为fork下来的代码库地址
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
    # 替换为fork下来的代码库地址
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
    # 替换为fork下来的代码库地址
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
    # 替换为fork下来的代码库地址
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
      # 替换为vault服务端的IP和端口，由于本示例的vault服务部署在宿主机上因此使用内网IP
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
      # 替换为vault服务端的IP和端口，由于本示例的vault服务部署在宿主机上因此使用内网IP
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
        # 替换为宿主集群的IP地址和端口，此处为内网IP
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
        # 替换为宿主集群的IP地址和端口，此处为内网IP
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
        # 替换为宿主机IP，本示例的宿主机外网IP地址为119.8.99.179
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

##### 替换init-pipeline git clone任务的代码库地址
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
                      # 替换为fork下来的用户侧代码库地址
                      value: https://github.com/lanbingcloud/demo-user-project-1.git
```

#### 代码库：demo-user-project
fork demo-user-project代码库，修改复制后的代码库。
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
        # 替换为fork下来的用户侧代码库
        value: https://github.com/lanbingcloud/demo-user-project-1.git
      ...
    - name: git-clone-deployment
      ...
      params:
      - name: url
        # 替换为fork下来的部署运行时的代码库
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
        # 替换为github镜像仓库地址，根据实际情况更新
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
         # 使用sed字符串替换镜像地址，根据实际情况更新
          sed -i -e "s#ghcr.io/zhangsan/devops-sample.*#$(tasks.image-build.results.IMAGE_URL)#g" deployments/test/devops-sample.yaml
          git add deployments/test/devops-sample.yaml
          git commit -a -m "automatic update by pipeline bot: $(tasks.image-build.results.IMAGE_URL)"
          git push origin HEAD:$(params.REVISION) --force
```

#### 代码库：demo-user-deployments

fork demo-user-deployments代码库，修改复制后的代码库。替换业务应用svc的外部访问地址。

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

## 未完成（2022.11.12，正式提交后删除该章节）
一 内容
1. 网络相关：traefik、ingress、metallab
2. 证书相关：cert-manager
3. github：
1）https协议，客户端的认证的异常（OPENSSL 443）
2）github secrets
3）access token：fine-grained token；