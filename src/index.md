<script>
//   if (typeof window !== 'undefined') {
//     window.location.replace('/guide/user-guide/introduction');
//   }

    // if (typeof window !== "undefined"){
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
    // }

</script>
