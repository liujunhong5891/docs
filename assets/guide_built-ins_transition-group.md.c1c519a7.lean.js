import{M as s,o as n,c as a,d as l,j as e,w as p,F as o,n as t,t as c,N as r,r as i,h as F,D,E as C,C as y,e as g,a as u}from"./app.699c64d2.js";import{g as b}from"./chunks/index.31797bf8.js";const d={class:"demo"},A={__name:"ListBasic",setup(i){const F=s([1,2,3,4,5]);let D=F.length+1;function C(){F.splice(g(),0,D++)}function y(){F.splice(g(),1)}function g(){return Math.floor(Math.random()*F.length)}return(s,i)=>(n(),a("div",d,[l("button",{onClick:C},"Add at random index"),l("button",{onClick:y},"Remove at random index"),e(r,{name:"list",tag:"ul",style:{"margin-top":"20px"}},{default:p((()=>[(n(!0),a(o,null,t(F,(s=>(n(),a("li",{key:s},c(s),1)))),128))])),_:1})]))}},m={class:"demo"},I={__name:"ListMove",setup(s){let F=i([1,2,3,4,5]),D=F.value.length+1;function C(){F.value.splice(g(),0,D++)}function y(){F.value.splice(g(),1)}function g(){return Math.floor(Math.random()*F.value.length)}return(s,i)=>(n(),a("div",m,[l("button",{onClick:C},"Add"),l("button",{onClick:y},"Remove"),l("button",{onClick:i[0]||(i[0]=s=>function(s){let n,a=s.length;for(;0!=a;)n=Math.floor(Math.random()*a),a--,[s[a],s[n]]=[s[n],s[a]];return s}(F.value))},"Shuffle"),e(r,{name:"list2",tag:"ul",style:{"margin-top":"20px"}},{default:p((()=>[(n(!0),a(o,null,t(F.value,(s=>(n(),a("li",{class:"list-item",key:s},c(s),1)))),128))])),_:1})]))}},h={class:"demo",style:{height:"265px"}},G=["data-index"],X={__name:"ListStagger",setup(s){const y=[{msg:"Bruce Lee"},{msg:"Jackie Chan"},{msg:"Chuck Norris"},{msg:"Jet Li"},{msg:"Kung Fury"}];let g=i("");const u=F((()=>y.filter((s=>s.msg.toLowerCase().includes(g.value)))));function d(s){s.style.opacity=0,s.style.height=0}function A(s,n){b.to(s,{opacity:1,height:"1.6em",delay:.15*s.dataset.index,onComplete:n})}function m(s,n){b.to(s,{opacity:0,height:0,delay:.15*s.dataset.index,onComplete:n})}return(s,i)=>(n(),a("div",h,[D(l("input",{"onUpdate:modelValue":i[0]||(i[0]=s=>g.value=s),style:{"margin-bottom":"20px"}},null,512),[[C,g.value]]),e(r,{tag:"ul",css:!1,onBeforeEnter:d,onEnter:A,onLeave:m},{default:p((()=>[(n(!0),a(o,null,t(u.value,((s,l)=>(n(),a("li",{key:s.msg,"data-index":l},c(s.msg),9,G)))),128))])),_:1})]))}},v=l("h1",{id:"transitiongroup",tabindex:"-1"},[g("TransitionGroup "),l("a",{class:"header-anchor",href:"#transitiongroup","aria-hidden":"true"},"#")],-1),B=u("",9),Z=u("",4),x=u("",6),f=u("",5),V=JSON.parse('{"title":"TransitionGroup","description":"","frontmatter":{},"headers":[{"level":2,"title":"Differences from <Transition>","slug":"differences-from-transition","link":"#differences-from-transition","children":[]},{"level":2,"title":"Enter / Leave Transitions","slug":"enter-leave-transitions","link":"#enter-leave-transitions","children":[]},{"level":2,"title":"Move Transitions","slug":"move-transitions","link":"#move-transitions","children":[]},{"level":2,"title":"Staggering List Transitions","slug":"staggering-list-transitions","link":"#staggering-list-transitions","children":[]}],"relativePath":"guide/built-ins/transition-group.md"}'),w=Object.assign({name:"guide/built-ins/transition-group.md"},{setup:s=>(s,l)=>{const p=y("VueJobs");return n(),a("div",null,[v,e(p),B,e(A),Z,e(I),x,e(X),f])}});export{V as __pageData,w as default};
