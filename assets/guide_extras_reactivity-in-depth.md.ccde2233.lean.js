import{M as s,_ as a,r as n,o as e,c as l,u as o,t as p,d as t,F as c,n as r,j as i,A as y,B as F,C as D,e as A,a as C}from"./app.760dd816.js";const d=s(Array.from(Array(3).keys()).map((s=>Array.from(Array(3).keys()).map((s=>"")))));function u(s){if(!s.startsWith("="))return s;s=s.slice(1).replace(/\b([A-Z])(\d{1,2})\b/g,((s,a,n)=>`get(${a.charCodeAt(0)-65},${n})`));try{return new Function("get",`return ${s}`)(g)}catch(a){return`#ERROR ${a}`}}function g(s,a){const n=u(d[s][a]),e=Number(n);return Number.isFinite(e)?e:n}d[0][0]="1",d[0][1]="2",d[0][2]="= A0 + A1";const h=["title"],b=["value"],m={key:1},f=a({__name:"SpreadSheetCell",props:{c:Number,r:Number},setup(s){const a=s,t=n(!1);function c(s){t.value=!1,d[a.c][a.r]=s.target.value.trim()}return(a,n)=>(e(),l("div",{class:"cell",title:o(d)[s.c][s.r],onClick:n[1]||(n[1]=s=>t.value=!0)},[t.value?(e(),l("input",{key:0,value:o(d)[s.c][s.r],onChange:c,onBlur:c,onVnodeMounted:n[0]||(n[0]=({el:s})=>s.focus())},null,40,b)):(e(),l("span",m,p(o(u)(o(d)[s.c][s.r])),1))],8,h))}},[["__scopeId","data-v-3efd69a9"]]),v=(s=>(y("data-v-3be5c051"),s=s(),F(),s))((()=>t("th",null,null,-1))),w=a({__name:"SpreadSheet",setup(s){const a=d.map(((s,a)=>String.fromCharCode(65+a)));return(s,n)=>(e(),l("table",null,[t("thead",null,[t("tr",null,[v,(e(!0),l(c,null,r(o(a),(s=>(e(),l("th",null,p(s),1)))),256))])]),t("tbody",null,[(e(!0),l(c,null,r(o(d)[0].length,(s=>(e(),l("tr",null,[t("th",null,p(s-1),1),(e(!0),l(c,null,r(o(a),((a,n)=>(e(),l("td",null,[i(f,{r:s-1,c:n},null,8,["r","c"])])))),256))])))),256))])]))}},[["__scopeId","data-v-3be5c051"]]),I=t("h1",{id:"reactivity-in-depth",tabindex:"-1"},[A("Reactivity in Depth "),t("a",{class:"header-anchor",href:"#reactivity-in-depth","aria-hidden":"true"},"#")],-1),k=t("p",null,"One of Vue’s most distinctive features is the unobtrusive reactivity system. Component state consists of reactive JavaScript objects. When you modify them, the view updates. It makes state management simple and intuitive, but it’s also important to understand how it works to avoid some common gotchas. In this section, we are going to dig into some of the lower-level details of Vue’s reactivity system.",-1),x=t("h2",{id:"what-is-reactivity",tabindex:"-1"},[A("What is Reactivity? "),t("a",{class:"header-anchor",href:"#what-is-reactivity","aria-hidden":"true"},"#")],-1),Z=t("p",null,"This term comes up in programming quite a bit these days, but what do people mean when they say it? Reactivity is a programming paradigm that allows us to adjust to changes in a declarative manner. The canonical example that people usually show, because it’s a great one, is an Excel spreadsheet:",-1),j=C("",79),E=JSON.parse('{"title":"Reactivity in Depth","description":"","frontmatter":{"outline":"deep"},"headers":[{"level":2,"title":"What is Reactivity?","slug":"what-is-reactivity","link":"#what-is-reactivity","children":[]},{"level":2,"title":"How Reactivity Works in Vue","slug":"how-reactivity-works-in-vue","link":"#how-reactivity-works-in-vue","children":[]},{"level":2,"title":"Runtime vs. Compile-time Reactivity","slug":"runtime-vs-compile-time-reactivity","link":"#runtime-vs-compile-time-reactivity","children":[]},{"level":2,"title":"Reactivity Debugging","slug":"reactivity-debugging","link":"#reactivity-debugging","children":[{"level":3,"title":"Component Debugging Hooks","slug":"component-debugging-hooks","link":"#component-debugging-hooks","children":[]},{"level":3,"title":"Computed Debugging","slug":"computed-debugging","link":"#computed-debugging","children":[]},{"level":3,"title":"Watcher Debugging","slug":"watcher-debugging","link":"#watcher-debugging","children":[]}]},{"level":2,"title":"Integration with External State Systems","slug":"integration-with-external-state-systems","link":"#integration-with-external-state-systems","children":[{"level":3,"title":"Immutable Data","slug":"immutable-data","link":"#immutable-data","children":[]},{"level":3,"title":"State Machines","slug":"state-machines","link":"#state-machines","children":[]},{"level":3,"title":"RxJS","slug":"rxjs","link":"#rxjs","children":[]}]}],"relativePath":"guide/extras/reactivity-in-depth.md"}'),V=Object.assign({name:"guide/extras/reactivity-in-depth.md"},{setup:s=>(s,a)=>{const n=D("VueJobs");return e(),l("div",null,[I,i(n),k,x,Z,i(w),j])}});export{E as __pageData,V as default};
