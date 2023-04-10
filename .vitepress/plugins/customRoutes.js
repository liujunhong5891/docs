const defaultRouteRedirect = (app) => {
    app.beforeEach((to, from, next) => {
      if (to.path === '/docs/') {
        next('/guide/user-guide/introduction');
      } else {
        next();
      }
    });
  };
  
  export default defaultRouteRedirect;  