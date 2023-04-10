import{_ as e,C as o,o as a,c as s,j as t,d as n,e as i,a as l}from"./app.d037d240.js";const r=JSON.parse('{"title":"Composition API FAQ","description":"","frontmatter":{"outline":"deep"},"headers":[{"level":2,"title":"What is Composition API?","slug":"what-is-composition-api","link":"#what-is-composition-api","children":[]},{"level":2,"title":"Why Composition API?","slug":"why-composition-api","link":"#why-composition-api","children":[{"level":3,"title":"Better Logic Reuse","slug":"better-logic-reuse","link":"#better-logic-reuse","children":[]},{"level":3,"title":"More Flexible Code Organization","slug":"more-flexible-code-organization","link":"#more-flexible-code-organization","children":[]},{"level":3,"title":"Better Type Inference","slug":"better-type-inference","link":"#better-type-inference","children":[]},{"level":3,"title":"Smaller Production Bundle and Less Overhead","slug":"smaller-production-bundle-and-less-overhead","link":"#smaller-production-bundle-and-less-overhead","children":[]}]},{"level":2,"title":"Relationship with Options API","slug":"relationship-with-options-api","link":"#relationship-with-options-api","children":[{"level":3,"title":"Trade-offs","slug":"trade-offs","link":"#trade-offs","children":[]},{"level":3,"title":"Does Composition API cover all use cases?","slug":"does-composition-api-cover-all-use-cases","link":"#does-composition-api-cover-all-use-cases","children":[]},{"level":3,"title":"Can I use both APIs together?","slug":"can-i-use-both-apis-together","link":"#can-i-use-both-apis-together","children":[]},{"level":3,"title":"Will Options API be deprecated?","slug":"will-options-api-be-deprecated","link":"#will-options-api-be-deprecated","children":[]}]},{"level":2,"title":"Relationship with Class API","slug":"relationship-with-class-api","link":"#relationship-with-class-api","children":[]},{"level":2,"title":"Comparison with React Hooks","slug":"comparison-with-react-hooks","link":"#comparison-with-react-hooks","children":[]}],"relativePath":"guide/extras/composition-api-faq.md"}'),p={name:"guide/extras/composition-api-faq.md"},c=n("h1",{id:"composition-api-faq",tabindex:"-1"},[i("Composition API FAQ "),n("a",{class:"header-anchor",href:"#composition-api-faq","aria-hidden":"true"},"#")],-1),d=l('<div class="tip custom-block"><p class="custom-block-title">TIP</p><p>This FAQ assumes prior experience with Vue - in particular, experience with Vue 2 while primarily using Options API.</p></div><h2 id="what-is-composition-api" tabindex="-1">What is Composition API? <a class="header-anchor" href="#what-is-composition-api" aria-hidden="true">#</a></h2><p>Composition API is a set of APIs that allows us to author Vue components using imported functions instead of declaring options. It is an umbrella term that covers the following APIs:</p><ul><li><p><a href="/docs/api/reactivity-core.html">Reactivity API</a>, e.g. <code>ref()</code> and <code>reactive()</code>, that allows us to directly create reactive state, computed state, and watchers.</p></li><li><p><a href="/docs/api/composition-api-lifecycle.html">Lifecycle Hooks</a>, e.g. <code>onMounted()</code> and <code>onUnmounted()</code>, that allow us to programmatically hook into the component lifecycle.</p></li><li><p><a href="/docs/api/composition-api-dependency-injection.html">Dependency Injection</a>, i.e. <code>provide()</code> and <code>inject()</code>, that allow us to leverage Vue&#39;s dependency injection system while using Reactivity APIs.</p></li></ul><p>Composition API is a built-in feature of Vue 3 and <a href="https://blog.vuejs.org/posts/vue-2-7-naruto.html" target="_blank" rel="noreferrer">Vue 2.7</a>. For older Vue 2 versions, use the officially maintained <a href="https://github.com/vuejs/composition-api" target="_blank" rel="noreferrer"><code>@vue/composition-api</code></a> plugin. In Vue 3, it is also primarily used together with the <a href="/docs/api/sfc-script-setup.html"><code>&lt;script setup&gt;</code></a> syntax in Single-File Components. Here&#39;s a basic example of a component using Composition API:</p><div class="language-vue"><button class="copy"></button><span class="lang">vue</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">setup</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">ref</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">onMounted</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;">// reactive state</span></span>\n<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> count </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">ref</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;">// functions that mutate state and trigger updates</span></span>\n<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">increment</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">count</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">++</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;">// lifecycle hooks</span></span>\n<span class="line"><span style="color:#82AAFF;">onMounted</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">`</span><span style="color:#C3E88D;">The initial count is </span><span style="color:#89DDFF;">${</span><span style="color:#A6ACCD;">count</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;">.</span><span style="color:#89DDFF;">`</span><span style="color:#F07178;">)</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;"> @</span><span style="color:#C792EA;">click</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">increment</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Count is: </span><span style="color:#89DDFF;">{{</span><span style="color:#A6ACCD;"> count </span><span style="color:#89DDFF;">}}&lt;/</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p>Despite an API style based on function composition, <strong>Composition API is NOT functional programming</strong>. Composition API is based on Vue&#39;s mutable, fine-grained reactivity paradigm, whereas functional programming emphasizes immutability.</p><p>If you are interested in learning how to use Vue with Composition API, you can set the site-wide API preference to Composition API using the toggle at the top of the left sidebar, and then go through the guide from the beginning.</p><h2 id="why-composition-api" tabindex="-1">Why Composition API? <a class="header-anchor" href="#why-composition-api" aria-hidden="true">#</a></h2><h3 id="better-logic-reuse" tabindex="-1">Better Logic Reuse <a class="header-anchor" href="#better-logic-reuse" aria-hidden="true">#</a></h3><p>The primary advantage of Composition API is that it enables clean, efficient logic reuse in the form of <a href="/docs/guide/reusability/composables.html">Composable functions</a>. It solves <a href="/docs/guide/reusability/composables.html#vs-mixins">all the drawbacks of mixins</a>, the primary logic reuse mechanism for Options API.</p><p>Composition API&#39;s logic reuse capability has given rise to impressive community projects such as <a href="https://vueuse.org/" target="_blank" rel="noreferrer">VueUse</a>, an ever-growing collection of composable utilities. It also serves as a clean mechanism for easily integrating stateful third-party services or libraries into Vue&#39;s reactivity system, for example <a href="/docs/guide/extras/reactivity-in-depth.html#immutable-data">immutable data</a>, <a href="/docs/guide/extras/reactivity-in-depth.html#state-machines">state machines</a>, and <a href="https://vueuse.org/rxjs/readme.html#vueuse-rxjs" target="_blank" rel="noreferrer">RxJS</a>.</p><h3 id="more-flexible-code-organization" tabindex="-1">More Flexible Code Organization <a class="header-anchor" href="#more-flexible-code-organization" aria-hidden="true">#</a></h3><p>Many users love that we write organized code by default with Options API: everything has its place based on the option it falls under. However, Options API poses serious limitations when a single component&#39;s logic grows beyond a certain complexity threshold. This limitation is particularly prominent in components that need to deal with multiple <strong>logical concerns</strong>, which we have witnessed first hand in many production Vue 2 apps.</p><p>Take the folder explorer component from Vue CLI&#39;s GUI as an example: this component is responsible for the following logical concerns:</p><ul><li>Tracking current folder state and displaying its content</li><li>Handling folder navigation (opening, closing, refreshing...)</li><li>Handling new folder creation</li><li>Toggling show favorite folders only</li><li>Toggling show hidden folders</li><li>Handling current working directory changes</li></ul><p>The <a href="https://github.com/vuejs/vue-cli/blob/a09407dd5b9f18ace7501ddb603b95e31d6d93c0/packages/@vue/cli-ui/src/components/folder/FolderExplorer.vue#L198-L404" target="_blank" rel="noreferrer">original version</a> of the component was written in Options API. If we give each line of code a color based on the logical concern it is dealing with, this is how it looks:</p><img alt="folder component before" src="/docs/assets/options-api.4c42b509.png" width="129" height="500" style="margin:1.2em auto;"><p>Notice how code dealing with the same logical concern is forced to be split under different options, located in different parts of the file. In a component that is several hundred lines long, understanding and navigating a single logical concern requires constantly scrolling up and down the file, making it much more difficult than it should be. In addition, if we ever intend to extract a logical concern into a reusable utility, it takes quite a bit of work to find and extract the right pieces of code from different parts of the file.</p><p>Here&#39;s the same component, before and after the <a href="https://gist.github.com/yyx990803/8854f8f6a97631576c14b63c8acd8f2e" target="_blank" rel="noreferrer">refactor into Composition API</a>:</p><p><img src="/docs/assets/composition-api-after.e3f2c350.png" alt="folder component after"></p><p>Notice how the code related to the same logical concern can now be grouped together: we no longer need to jump between different options blocks while working on a specific logical concern. Moreover, we can now move a group of code into an external file with minimal effort, since we no longer need to shuffle the code around in order to extract them. This reduced friction for refactoring is key to the long-term maintainability in large codebases.</p><h3 id="better-type-inference" tabindex="-1">Better Type Inference <a class="header-anchor" href="#better-type-inference" aria-hidden="true">#</a></h3><p>In recent years, more and more frontend developers are adopting <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer">TypeScript</a> as it helps us write more robust code, make changes with more confidence, and provides a great development experience with IDE support. However, the Options API, originally conceived in 2013, was designed without type inference in mind. We had to implement some <a href="https://github.com/vuejs/core/blob/44b95276f5c086e1d88fa3c686a5f39eb5bb7821/packages/runtime-core/src/componentPublicInstance.ts#L132-L165" target="_blank" rel="noreferrer">absurdly complex type gymnastics</a> to make type inference work with the Options API. Even with all this effort, type inference for Options API can still break down for mixins and dependency injection.</p><p>This had led many developers who wanted to use Vue with TS to lean towards Class API powered by <code>vue-class-component</code>. However, a class-based API heavily relies on ES decorators, a language feature that was only a stage 2 proposal when Vue 3 was being developed in 2019. We felt it was too risky to base an official API on an unstable proposal. Since then, the decorators proposal has gone through yet another complete overhaul, and finally reached stage 3 in 2022. In addition, class-based API suffers from logic reuse and organization limitations similar to Options API.</p><p>In comparison, Composition API utilizes mostly plain variables and functions, which are naturally type friendly. Code written in Composition API can enjoy full type inference with little need for manual type hints. Most of the time, Composition API code will look largely identical in TypeScript and plain JavaScript. This also makes it possible for plain JavaScript users to benefit from partial type inference.</p><h3 id="smaller-production-bundle-and-less-overhead" tabindex="-1">Smaller Production Bundle and Less Overhead <a class="header-anchor" href="#smaller-production-bundle-and-less-overhead" aria-hidden="true">#</a></h3><p>Code written in Composition API and <code>&lt;script setup&gt;</code> is also more efficient and minification-friendly than Options API equivalent. This is because the template in a <code>&lt;script setup&gt;</code> component is compiled as a function inlined in the same scope of the <code>&lt;script setup&gt;</code> code. Unlike property access from <code>this</code>, the compiled template code can directly access variables declared inside <code>&lt;script setup&gt;</code>, without an instance proxy in between. This also leads to better minification because all the variable names can be safely shortened.</p><h2 id="relationship-with-options-api" tabindex="-1">Relationship with Options API <a class="header-anchor" href="#relationship-with-options-api" aria-hidden="true">#</a></h2><h3 id="trade-offs" tabindex="-1">Trade-offs <a class="header-anchor" href="#trade-offs" aria-hidden="true">#</a></h3><p>Some users moving from Options API found their Composition API code less organized, and concluded that Composition API is &quot;worse&quot; in terms of code organization. We recommend users with such opinions to look at that problem from a different perspective.</p><p>It is true that Composition API no longer provides the &quot;guard rails&quot; that guide you to put your code into respective buckets. In return, you get to author component code like how you would write normal JavaScript. This means <strong>you can and should apply any code organization best practices to your Composition API code as you would when writing normal JavaScript</strong>. If you can write well-organized JavaScript, you should also be able to write well-organized Composition API code.</p><p>Options API does allow you to &quot;think less&quot; when writing component code, which is why many users love it. However, in reducing the mental overhead, it also locks you into the prescribed code organization pattern with no escape hatch, which can make it difficult to refactor or improve code quality in larger scale projects. In this regard, Composition API provides better long term scalability.</p><h3 id="does-composition-api-cover-all-use-cases" tabindex="-1">Does Composition API cover all use cases? <a class="header-anchor" href="#does-composition-api-cover-all-use-cases" aria-hidden="true">#</a></h3><p>Yes in terms of stateful logic. When using Composition API, there are only a few options that may still be needed: <code>props</code>, <code>emits</code>, <code>name</code>, and <code>inheritAttrs</code>. If using <code>&lt;script setup&gt;</code>, then <code>inheritAttrs</code> is typically the only option that may require a separate normal <code>&lt;script&gt;</code> block.</p><p>If you intend to exclusively use Composition API (along with the options listed above), you can shave a few kbs off your production bundle via a <a href="https://github.com/vuejs/core/tree/main/packages/vue#bundler-build-feature-flags" target="_blank" rel="noreferrer">compile-time flag</a> that drops Options API related code from Vue. Note this also affects Vue components in your dependencies.</p><h3 id="can-i-use-both-apis-together" tabindex="-1">Can I use both APIs together? <a class="header-anchor" href="#can-i-use-both-apis-together" aria-hidden="true">#</a></h3><p>Yes. You can use Composition API via the <a href="/docs/api/composition-api-setup.html"><code>setup()</code></a> option in an Options API component.</p><p>However, we only recommend doing so if you have an existing Options API codebase that needs to integrate with new features / external libraries written with Composition API.</p><h3 id="will-options-api-be-deprecated" tabindex="-1">Will Options API be deprecated? <a class="header-anchor" href="#will-options-api-be-deprecated" aria-hidden="true">#</a></h3><p>No, we do not have any plan to do so. Options API is an integral part of Vue and the reason many developers love it. We also realize that many of the benefits of Composition API only manifest in larger-scale projects, and Options API remains a solid choice for many low-to-medium-complexity scenarios.</p><h2 id="relationship-with-class-api" tabindex="-1">Relationship with Class API <a class="header-anchor" href="#relationship-with-class-api" aria-hidden="true">#</a></h2><p>We no longer recommend using Class API with Vue 3, given that Composition API provides great TypeScript integration with additional logic reuse and code organization benefits.</p><h2 id="comparison-with-react-hooks" tabindex="-1">Comparison with React Hooks <a class="header-anchor" href="#comparison-with-react-hooks" aria-hidden="true">#</a></h2><p>Composition API provides the same level of logic composition capabilities as React Hooks, but with some important differences.</p><p>React Hooks are invoked repeatedly every time a component updates. This creates a number of caveats that can confuse even seasoned React developers. It also leads to performance optimization issues that can severely affect development experience. Here are some examples:</p><ul><li><p>Hooks are call-order sensitive and cannot be conditional.</p></li><li><p>Variables declared in a React component can be captured by a hook closure and become &quot;stale&quot; if the developer fails to pass in the correct dependencies array. This leads to React developers relying on ESLint rules to ensure correct dependencies are passed. However, the rule is often not smart enough and over-compensates for correctness, which leads to unnecessary invalidation and headaches when edge cases are encountered.</p></li><li><p>Expensive computations require the use of <code>useMemo</code>, which again requires manually passing in the correct dependencies array.</p></li><li><p>Event handlers passed to child components cause unnecessary child updates by default, and require explicit <code>useCallback</code> as an optimization. This is almost always needed, and again requires a correct dependencies array. Neglecting this leads to over-rendering apps by default and can cause performance issues without realizing it.</p></li><li><p>The stale closure problem, combined with Concurrent features, makes it difficult to reason about when a piece of hooks code is run, and makes working with mutable state that should persist across renders (via <code>useRef</code>) cumbersome.</p></li></ul><p>In comparison, Vue Composition API:</p><ul><li><p>Invokes <code>setup()</code> or <code>&lt;script setup&gt;</code> code only once. This makes the code align better with the intuitions of idiomatic JavaScript usage as there are no stale closures to worry about. Composition API calls are also not sensitive to call order and can be conditional.</p></li><li><p>Vue&#39;s runtime reactivity system automatically collects reactive dependencies used in computed properties and watchers, so there&#39;s no need to manually declare dependencies.</p></li><li><p>No need to manually cache callback functions to avoid unnecessary child updates. In general, Vue&#39;s fine-grained reactivity system ensures child components only update when they need to. Manual child-update optimizations are rarely a concern for Vue developers.</p></li></ul><p>We acknowledge the creativity of React Hooks, and it is a major source of inspiration for Composition API. However, the issues mentioned above do exist in its design and we noticed Vue&#39;s reactivity model happens to provide a way around them.</p>',50);const h=e(p,[["render",function(e,n,i,l,r,p){const h=o("VueJobs");return a(),s("div",null,[c,t(h),d])}]]);export{r as __pageData,h as default};
