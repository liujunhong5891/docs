const defaultRouteRedirect = (app) => {
    app.beforeEach((to, from, next) => {
      if (to.path === '/') {
        next('/docs/guide/user-guide/introduction');
      } else {
        next();
      }
    });
  };
  
  export default defaultRouteRedirect;  