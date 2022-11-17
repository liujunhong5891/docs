# CICD主流程问题
主流程搭建过程问题：
1. git仓库的证书，包括账号密码、ssh公私钥、tls证书； deploytoken、deploykey； 使用场景：推拉代码；
2. harbor仓库的证书，包括dockerconfig、base、ssh、tls、Opaque； 使用场景：推拉镜像；
3. git命令原理；(updated 2022.9.27)
4. 使用最简单的webhook搭建argoevent框架，面向sensor的sa相关授权结构和语法；
5. 将eventsource替换为gitlab webhook时，access token 、secret token的职责和生成方式；
6. 其中tls证书作为secret token挂载时，官方示例无效，后来采用spec.template挂载卷的方式生效；**并且想通过本地客户端通过https挂载ssl证书验证其有效性，未调通；**
7. 使用vcluster生成svc时，且类型为nodeport时，无法指定端口； 等到svc生成nodeport后，需要根据nodeport修改gitlab的eventsource资源文件；
8. 通过ingress关联svc，svc挂载gitlab的eventsource时，描述ingress资源显示<error: endpoints "default-http-backend" not found>，后来发现该错误是正常的；需补充ingress相关储备；
9. gitlab webhook和gitlab是通过https协议通讯，必须启用ssl认证，官网示例代码未同步更新，查看eventsource controller日志发现异常；
10. 删除argocd app时，无法删除部分资源，查看ns状态为：Terminating，日志显示异常：Some resources are remaining、Some content in the namespace has finalizers remaining等关键字；(updated 2022.10.11)
    - 查询argocd app 指定项目的资源，去掉finalizers 的数组值，取消级联删除； argocd自动删除eventbus，进而删除ns；
    - 参考：<https://www.redhat.com/sysadmin/troubleshooting-terminating-namespaces>