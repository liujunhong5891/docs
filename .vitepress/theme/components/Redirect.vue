<template>
    <div></div>
  </template>
  
  <script>
  export default {
    async beforeRouteEnter(to, from, next) {
      const redirect = to.meta.frontmatter.redirect;
      if (redirect) {
        next(redirect);
      } else {
        next();
      }
    },
  };
  </script>
  