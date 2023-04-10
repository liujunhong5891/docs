export default ({ app }) => {
    app.vueApp.mixin({
      mounted() {
        const footerLink = document.createElement("a");
        footerLink.href = "/docs/guide/user-guide/introduction";
        footerLink.innerText = "概述";
        footerLink.style.display = "block";
        footerLink.style.textAlign = "center";
        footerLink.style.marginTop = "1rem";
        
        this.$el.appendChild(footerLink);
      },
    });
  };
  