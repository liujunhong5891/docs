export default {
    name: 'custom-routes',
  
    clientAppEnhance({ app }) {
      const { router } = app;
  
      router.beforeEach((to, from, next) => {
        if (to.path === '/') {
          next('/guide/user-guide/introduction');
        } else {
          next();
        }
      });
    },
  };