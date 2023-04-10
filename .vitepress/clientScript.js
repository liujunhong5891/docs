// .vitepress/clientScript.js
if (typeof window !== "undefined") {
    if (app.route.path === '/') {
        // 在此处添加需要在浏览器环境中执行的代码
        document.addEventListener("DOMContentLoaded", function () {
        // 获取当前页面的URL
        const currentUrl = new URL(window.location.href);
        // 设置重定向目标
        const redirectTo = "/guide/user-guide/introduction";
        // 构造新的URL
        const newUrl = new URL(redirectTo, currentUrl.origin);
        // 自动重定向
        window.location.replace(newUrl.toString());
        });
    }
  }
  