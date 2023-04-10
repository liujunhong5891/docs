<template>
    <div>
      <!-- 页面主要内容 -->
      <slot></slot>
    </div>
  </template>
  
  <script>
  export default {
    beforeRouteEnter(to, from, next) {
      if (to.path === '/') {
        next('/guide/user-guide/introduction');
      } else {
        next();
      }
    },
  };
  </script>
  