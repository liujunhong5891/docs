import{r as e,b as a,o as r,c as i,d as s,t,e as n,a as o}from"./app.b7ef66d9.js";const l=s("h1",{id:"releases",tabindex:"-1"},[n("Releases "),s("a",{class:"header-anchor",href:"#releases","aria-hidden":"true"},"#")],-1),p={key:0},d=n(" The current latest stable version of Vue is "),c=n(". "),h={key:1},u=o("",24),m=JSON.parse('{"title":"Releases","description":"","frontmatter":{"outline":"deep"},"headers":[{"level":2,"title":"Release Cycle","slug":"release-cycle","link":"#release-cycle","children":[]},{"level":2,"title":"Semantic Versioning Edge Cases","slug":"semantic-versioning-edge-cases","link":"#semantic-versioning-edge-cases","children":[{"level":3,"title":"TypeScript Definitions","slug":"typescript-definitions","link":"#typescript-definitions","children":[]},{"level":3,"title":"Compiled Code Compatibility with Older Runtime","slug":"compiled-code-compatibility-with-older-runtime","link":"#compiled-code-compatibility-with-older-runtime","children":[]}]},{"level":2,"title":"Pre Releases","slug":"pre-releases","link":"#pre-releases","children":[]},{"level":2,"title":"Deprecations","slug":"deprecations","link":"#deprecations","children":[]},{"level":2,"title":"RFCs","slug":"rfcs","link":"#rfcs","children":[]},{"level":2,"title":"Experimental Features","slug":"experimental-features","link":"#experimental-features","children":[]}],"relativePath":"about/releases.md"}'),f=Object.assign({name:"about/releases.md"},{setup(n){let o=e();return a((async()=>{const e=await fetch("https://api.github.com/repos/vuejs/core/releases?per_page=1");o.value=(await e.json())[0].name})),(e,a)=>(r(),i("div",null,[l,o.value?(r(),i("p",p,[d,s("strong",null,t(o.value),1),c])):(r(),i("p",h," Checking latest version... ")),u]))}});export{m as __pageData,f as default};
