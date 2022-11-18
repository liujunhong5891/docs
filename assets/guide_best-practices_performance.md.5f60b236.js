import{_ as e,C as s,o as a,c as n,j as t,d as o,e as l,a as r}from"./app.ca076d61.js";const i=JSON.parse('{"title":"Performance","description":"","frontmatter":{"outline":"deep"},"headers":[{"level":1,"title":"Performance","slug":"performance","link":"#performance","children":[{"level":2,"title":"Overview","slug":"overview","link":"#overview","children":[]},{"level":2,"title":"Profiling Options","slug":"profiling-options","link":"#profiling-options","children":[]},{"level":2,"title":"Page Load Optimizations","slug":"page-load-optimizations","link":"#page-load-optimizations","children":[{"level":3,"title":"Choosing the Right Architecture","slug":"choosing-the-right-architecture","link":"#choosing-the-right-architecture","children":[]},{"level":3,"title":"Bundle Size and Tree-shaking","slug":"bundle-size-and-tree-shaking","link":"#bundle-size-and-tree-shaking","children":[]},{"level":3,"title":"Code Splitting","slug":"code-splitting","link":"#code-splitting","children":[]}]},{"level":2,"title":"Update Optimizations","slug":"update-optimizations","link":"#update-optimizations","children":[{"level":3,"title":"Props Stability","slug":"props-stability","link":"#props-stability","children":[]},{"level":3,"title":"v-once","slug":"v-once","link":"#v-once","children":[]},{"level":3,"title":"v-memo","slug":"v-memo","link":"#v-memo","children":[]}]},{"level":2,"title":"General Optimizations","slug":"general-optimizations","link":"#general-optimizations","children":[{"level":3,"title":"Virtualize Large Lists","slug":"virtualize-large-lists","link":"#virtualize-large-lists","children":[]},{"level":3,"title":"Reduce Reactivity Overhead for Large Immutable Structures","slug":"reduce-reactivity-overhead-for-large-immutable-structures","link":"#reduce-reactivity-overhead-for-large-immutable-structures","children":[]},{"level":3,"title":"Avoid Unnecessary Component Abstractions","slug":"avoid-unnecessary-component-abstractions","link":"#avoid-unnecessary-component-abstractions","children":[]}]}]}],"relativePath":"guide/best-practices/performance.md"}'),p={name:"guide/best-practices/performance.md"},c=o("h1",{id:"performance",tabindex:"-1"},[l("Performance "),o("a",{class:"header-anchor",href:"#performance","aria-hidden":"true"},"#")],-1),d=r('<h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-hidden="true">#</a></h2><p>Vue is designed to be performant for most common use cases without much need for manual optimizations. However, there are always challenging scenarios where extra fine-tuning is needed. In this section, we will discuss what you should pay attention to when it comes to performance in a Vue application.</p><p>First, let&#39;s discuss the two major aspects of web performance:</p><ul><li><p><strong>Page Load Performance</strong>: how fast the application shows content and becomes interactive on the initial visit. This is usually measured using web vital metrics like <a href="https://web.dev/lcp/" target="_blank" rel="noreferrer">Largest Contentful Paint (LCP)</a> and <a href="https://web.dev/fid/" target="_blank" rel="noreferrer">First Input Delay (FID)</a>.</p></li><li><p><strong>Update Performance</strong>: how fast the application updates in response to user input. For example, how fast a list updates when the user types in a search box, or how fast the page switches when the user clicks a navigation link in a Single-Page Application (SPA).</p></li></ul><p>While it would be ideal to maximize both, different frontend architectures tend to affect how easy it is to attain desired performance in these aspects. In addition, the type of application you are building greatly influences what you should prioritize in terms of performance. Therefore, the first step of ensuring optimal performance is picking the right architecture for the type of application you are building:</p><ul><li><p>Consult <a href="/docs/guide/extras/ways-of-using-vue.html">Ways of Using Vue</a> to see how you can leverage Vue in different ways.</p></li><li><p>Jason Miller discusses the types of web applications and their respective ideal implementation / delivery in <a href="https://jasonformat.com/application-holotypes/" target="_blank" rel="noreferrer">Application Holotypes</a>.</p></li></ul><h2 id="profiling-options" tabindex="-1">Profiling Options <a class="header-anchor" href="#profiling-options" aria-hidden="true">#</a></h2><p>To improve performance, we need to first know how to measure it. There are a number of great tools that can help in this regard:</p><p>For profiling load performance of production deployments:</p><ul><li><a href="https://pagespeed.web.dev/" target="_blank" rel="noreferrer">PageSpeed Insights</a></li><li><a href="https://www.webpagetest.org/" target="_blank" rel="noreferrer">WebPageTest</a></li></ul><p>For profiling performance during local development:</p><ul><li><a href="https://developer.chrome.com/docs/devtools/evaluate-performance/" target="_blank" rel="noreferrer">Chrome DevTools Performance Panel</a><ul><li><a href="/docs/api/application.html#app-config-performance"><code>app.config.performance</code></a> enables Vue-specific performance markers in Chrome DevTools&#39; performance timeline.</li></ul></li><li><a href="/docs/guide/scaling-up/tooling.html#browser-devtools">Vue DevTools Extension</a> also provides a performance profiling feature.</li></ul><h2 id="page-load-optimizations" tabindex="-1">Page Load Optimizations <a class="header-anchor" href="#page-load-optimizations" aria-hidden="true">#</a></h2><p>There are many framework-agnostic aspects for optimizing page load performance - check out <a href="https://web.dev/fast/" target="_blank" rel="noreferrer">this web.dev guide</a> for a comprehensive round up. Here, we will primarily focus on techniques that are specific to Vue.</p><h3 id="choosing-the-right-architecture" tabindex="-1">Choosing the Right Architecture <a class="header-anchor" href="#choosing-the-right-architecture" aria-hidden="true">#</a></h3><p>If your use case is sensitive to page load performance, avoid shipping it as a pure client-side SPA. You want your server to be directly sending HTML containing the content the users want to see. Pure client-side rendering suffers from slow time-to-content. This can be mitigated with <a href="/docs/guide/extras/ways-of-using-vue.html#fullstack-ssr">Server-Side Rendering (SSR)</a> or <a href="/docs/guide/extras/ways-of-using-vue.html#jamstack-ssg">Static Site Generation (SSG)</a>. Check out the <a href="/docs/guide/scaling-up/ssr.html">SSR Guide</a> to learn about performing SSR with Vue. If your app doesn&#39;t have rich interactivity requirements, you can also use a traditional backend server to render the HTML and enhance it with Vue on the client.</p><p>If your main application has to be an SPA, but has marketing pages (landing, about, blog), ship them separately! Your marketing pages should ideally be deployed as static HTML with minimal JS, by using SSG.</p><h3 id="bundle-size-and-tree-shaking" tabindex="-1">Bundle Size and Tree-shaking <a class="header-anchor" href="#bundle-size-and-tree-shaking" aria-hidden="true">#</a></h3><p>One of the most effective ways to improve page load performance is shipping smaller JavaScript bundles. Here are a few ways to reduce bundle size when using Vue:</p><ul><li><p>Use a build step if possible.</p><ul><li><p>Many of Vue&#39;s APIs are <a href="https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking" target="_blank" rel="noreferrer">&quot;tree-shakable&quot;</a> if bundled via a modern build tool. For example, if you don&#39;t use the built-in <code>&lt;Transition&gt;</code> component, it won&#39;t be included in the final production bundle. Tree-shaking can also remove other unused modules in your source code.</p></li><li><p>When using a build step, templates are pre-compiled so we don&#39;t need to ship the Vue compiler to the browser. This saves <strong>14kb</strong> min+gzipped JavaScript and avoids the runtime compilation cost.</p></li></ul></li><li><p>Be cautious of size when introducing new dependencies! In real world applications, bloated bundles are most often a result of introducing heavy dependencies without realizing it.</p><ul><li><p>If using a build step, prefer dependencies that offer ES module formats and are tree-shaking friendly. For example, prefer <code>lodash-es</code> over <code>lodash</code>.</p></li><li><p>Check a dependency&#39;s size and evaluate whether it is worth the functionality it provides. Note if the dependency is tree-shaking friendly, the actual size increase will depend on the APIs you actually import from it. Tools like <a href="https://bundlejs.com/" target="_blank" rel="noreferrer">bundlejs.com</a> can be used for quick checks, but measuring with your actual build setup will always be the most accurate.</p></li></ul></li><li><p>If you are using Vue primarily for progressive enhancement and prefer to avoid a build step, consider using <a href="https://github.com/vuejs/petite-vue" target="_blank" rel="noreferrer">petite-vue</a> (only <strong>6kb</strong>) instead.</p></li></ul><h3 id="code-splitting" tabindex="-1">Code Splitting <a class="header-anchor" href="#code-splitting" aria-hidden="true">#</a></h3><p>Code splitting is where a build tool splits the application bundle into multiple smaller chunks, which can then be loaded on demand or in parallel. With proper code splitting, features required at page load can be downloaded immediately, with additional chunks being lazy loaded only when needed, thus improving performance.</p><p>Bundlers like Rollup (which Vite is based upon) or webpack can automatically create split chunks by detecting the ESM dynamic import syntax:</p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#676E95;">// lazy.js and its dependencies will be split into a separate chunk</span></span>\n<span class="line"><span style="color:#676E95;">// and only loaded when `loadLazy()` is called.</span></span>\n<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">loadLazy</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">import</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./lazy.js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div><p>Lazy loading is best used on features that are not immediately needed after initial page load. In Vue applications, this can be used in combination with Vue&#39;s <a href="/docs/guide/components/async.html">Async Component</a> feature to create split chunks for component trees:</p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">defineAsyncComponent</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;">// a separate chunk is created for Foo.vue and its dependencies.</span></span>\n<span class="line"><span style="color:#676E95;">// it is only fetched on demand when the async component is</span></span>\n<span class="line"><span style="color:#676E95;">// rendered on the page.</span></span>\n<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> Foo </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">defineAsyncComponent</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./Foo.vue</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">))</span></span>\n<span class="line"></span></code></pre></div><p>For applications using Vue Router, it is strongly recommended to use lazy loading for route components. Vue Router has explicit support for lazy loading, separate from <code>defineAsyncComponent</code>. See <a href="https://router.vuejs.org/guide/advanced/lazy-loading.html" target="_blank" rel="noreferrer">Lazy Loading Routes</a> for more details.</p><h2 id="update-optimizations" tabindex="-1">Update Optimizations <a class="header-anchor" href="#update-optimizations" aria-hidden="true">#</a></h2><h3 id="props-stability" tabindex="-1">Props Stability <a class="header-anchor" href="#props-stability" aria-hidden="true">#</a></h3><p>In Vue, a child component only updates when at least one of its received props has changed. Consider the following example:</p><div class="language-vue-html"><button class="copy"></button><span class="lang">template</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">ListItem</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">v-for</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">item</span><span style="color:#89DDFF;"> in </span><span style="color:#A6ACCD;">list</span><span style="color:#89DDFF;">&quot;</span></span>\n<span class="line"><span style="color:#89DDFF;">  :</span><span style="color:#C792EA;">id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">item</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">id</span><span style="color:#89DDFF;">&quot;</span></span>\n<span class="line"><span style="color:#89DDFF;">  :</span><span style="color:#C792EA;">active-id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">activeId</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>\n<span class="line"></span></code></pre></div><p>Inside the <code>&lt;ListItem&gt;</code> component, it uses its <code>id</code> and <code>activeId</code> props to determine whether it is the currently active item. While this works, the problem is that whenever <code>activeId</code> changes, <strong>every</strong> <code>&lt;ListItem&gt;</code> in the list has to update!</p><p>Ideally, only the items whose active status changed should update. We can achieve that by moving the active status computation into the parent, and make <code>&lt;ListItem&gt;</code> directly accept an <code>active</code> prop instead:</p><div class="language-vue-html"><button class="copy"></button><span class="lang">template</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">ListItem</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">v-for</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">item</span><span style="color:#89DDFF;"> in </span><span style="color:#A6ACCD;">list</span><span style="color:#89DDFF;">&quot;</span></span>\n<span class="line"><span style="color:#89DDFF;">  :</span><span style="color:#C792EA;">id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">item</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">id</span><span style="color:#89DDFF;">&quot;</span></span>\n<span class="line"><span style="color:#89DDFF;">  :</span><span style="color:#C792EA;">active</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">item</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">id</span><span style="color:#89DDFF;"> === </span><span style="color:#A6ACCD;">activeId</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>\n<span class="line"></span></code></pre></div><p>Now, for most components the <code>active</code> prop will remain the same when <code>activeId</code> changes, so they no longer need to update. In general, the idea is keeping the props passed to child components as stable as possible.</p><h3 id="v-once" tabindex="-1"><code>v-once</code> <a class="header-anchor" href="#v-once" aria-hidden="true">#</a></h3><p><code>v-once</code> is a built-in directive that can be used to render content that relies on runtime data but never needs to update. The entire sub-tree it is used on will be skipped for all future updates. Consult its <a href="/docs/api/built-in-directives.html#v-once">API reference</a> for more details.</p><h3 id="v-memo" tabindex="-1"><code>v-memo</code> <a class="header-anchor" href="#v-memo" aria-hidden="true">#</a></h3><p><code>v-memo</code> is a built-in directive that can be used to conditionally skip the update of large sub-trees or <code>v-for</code> lists. Consult its <a href="/docs/api/built-in-directives.html#v-memo">API reference</a> for more details.</p><h2 id="general-optimizations" tabindex="-1">General Optimizations <a class="header-anchor" href="#general-optimizations" aria-hidden="true">#</a></h2><blockquote><p>The following tips affect both page load and update performance.</p></blockquote><h3 id="virtualize-large-lists" tabindex="-1">Virtualize Large Lists <a class="header-anchor" href="#virtualize-large-lists" aria-hidden="true">#</a></h3><p>One of the most common performance issues in all frontend applications is rendering large lists. No matter how performant a framework is, rendering a list with thousands of items <strong>will</strong> be slow due to the sheer number of DOM nodes that the browser needs to handle.</p><p>However, we don&#39;t necessarily have to render all these nodes upfront. In most cases, the user&#39;s screen size can display only a small subset of our large list. We can greatly improve the performance with <strong>list virtualization</strong>, the technique of only rendering the items that are currently in or close to the viewport in a large list.</p><p>Implementing list virtualization isn&#39;t easy, luckily there are existing community libraries that you can directly use:</p><ul><li><a href="https://github.com/Akryum/vue-virtual-scroller" target="_blank" rel="noreferrer">vue-virtual-scroller</a></li><li><a href="https://github.com/rocwang/vue-virtual-scroll-grid" target="_blank" rel="noreferrer">vue-virtual-scroll-grid</a></li><li><a href="https://github.com/07akioni/vueuc" target="_blank" rel="noreferrer">vueuc/VVirtualList</a></li></ul><h3 id="reduce-reactivity-overhead-for-large-immutable-structures" tabindex="-1">Reduce Reactivity Overhead for Large Immutable Structures <a class="header-anchor" href="#reduce-reactivity-overhead-for-large-immutable-structures" aria-hidden="true">#</a></h3><p>Vue&#39;s reactivity system is deep by default. While this makes state management intuitive, it does create a certain level of overhead when the data size is large, because every property access triggers proxy traps that perform dependency tracking. This typically becomes noticeable when dealing with large arrays of deeply nested objects, where a single render needs to access 100,000+ properties, so it should only affect very specific use cases.</p><p>Vue does provide an escape hatch to opt-out of deep reactivity by using <a href="/docs/api/reactivity-advanced.html#shallowref"><code>shallowRef()</code></a> and <a href="/docs/api/reactivity-advanced.html#shallowreactive"><code>shallowReactive()</code></a>. Shallow APIs create state that is reactive only at the root level, and exposes all nested objects untouched. This keeps nested property access fast, with the trade-off being that we must now treat all nested objects as immutable, and updates can only be triggered by replacing the root state:</p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> shallowArray </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">shallowRef</span><span style="color:#A6ACCD;">([</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;">/* big list of deep objects */</span></span>\n<span class="line"><span style="color:#A6ACCD;">])</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;">// this won&#39;t trigger updates...</span></span>\n<span class="line"><span style="color:#A6ACCD;">shallowArray</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">push</span><span style="color:#A6ACCD;">(newObject)</span></span>\n<span class="line"><span style="color:#676E95;">// this does:</span></span>\n<span class="line"><span style="color:#A6ACCD;">shallowArray</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> [</span><span style="color:#89DDFF;">...</span><span style="color:#A6ACCD;">shallowArray</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> newObject]</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;">// this won&#39;t trigger updates...</span></span>\n<span class="line"><span style="color:#A6ACCD;">shallowArray</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value[</span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">foo </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span></span>\n<span class="line"><span style="color:#676E95;">// this does:</span></span>\n<span class="line"><span style="color:#A6ACCD;">shallowArray</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> [</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">...</span><span style="color:#A6ACCD;">shallowArray</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value[</span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">foo</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">...</span><span style="color:#A6ACCD;">shallowArray</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">slice</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"><span style="color:#A6ACCD;">]</span></span>\n<span class="line"></span></code></pre></div><h3 id="avoid-unnecessary-component-abstractions" tabindex="-1">Avoid Unnecessary Component Abstractions <a class="header-anchor" href="#avoid-unnecessary-component-abstractions" aria-hidden="true">#</a></h3><p>Sometimes we may create <a href="/docs/guide/components/slots.html#renderless-components">renderless components</a> or higher-order components (i.e. components that render other components with extra props) for better abstraction or code organization. While there is nothing wrong with this, do keep in mind that component instances are much more expensive than plain DOM nodes, and creating too many of them due to abstraction patterns will incur performance costs.</p><p>Note that reducing only a few instances won&#39;t have noticeable effect, so don&#39;t sweat it if the component is rendered only a few times in the app. The best scenario to consider this optimization is again in large lists. Imagine a list of 100 items where each item component contains many child components. Removing one unnecessary component abstraction here could result in a reduction of hundreds of component instances.</p>',53);const h=e(p,[["render",function(e,o,l,r,i,p){const h=s("VueJobs");return a(),n("div",null,[c,t(h),d])}]]);export{i as __pageData,h as default};
