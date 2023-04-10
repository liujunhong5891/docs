<template>
    <div></div>
  </template>
  
  <script>
  export default {
    mounted() {
      if (this.$route.path === '/') {
        this.$router.replace('/guide/user-guide/introduction');
      }
    },
  };
  </script>
  