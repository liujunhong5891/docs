import{r as s,o as n,c as a,d as e,t as o,a as l}from"./app.d0375d54.js";const t=l('<h1 id="introduction" tabindex="-1">Introduction <a class="header-anchor" href="#introduction" aria-hidden="true">#</a></h1><div class="info custom-block"><p class="custom-block-title">You are reading the documentation for Vue 3!</p><ul><li>Vue 2 documentation has been moved to <a href="https://v2.vuejs.org/" target="_blank" rel="noreferrer">v2.vuejs.org</a>.</li><li>Upgrading from Vue 2? Check out the <a href="https://v3-migration.vuejs.org/" target="_blank" rel="noreferrer">Migration Guide</a>.</li></ul></div><div class="vue-mastery-link"><a href="https://www.vuemastery.com/courses-path/beginner" target="_blank"><div class="banner-wrapper"><img class="banner" alt="Vue Mastery banner" width="96px" height="56px" src="https://storage.googleapis.com/vue-mastery.appspot.com/flamelink/media/vuemastery-graphical-link-96x56.png"></div><p class="description">Learn Vue with video tutorials on <span>VueMastery.com</span></p><div class="logo-wrapper"><img alt="Vue Mastery Logo" width="25px" src="https://storage.googleapis.com/vue-mastery.appspot.com/flamelink/media/vue-mastery-logo.png"></div></a></div><h2 id="what-is-vue" tabindex="-1">What is Vue? <a class="header-anchor" href="#what-is-vue" aria-hidden="true">#</a></h2><p>Vue (pronounced /vjuː/, like <strong>view</strong>) is a JavaScript framework for building user interfaces. It builds on top of standard HTML, CSS, and JavaScript and provides a declarative and component-based programming model that helps you efficiently develop user interfaces, be they simple or complex.</p><p>Here is a minimal example:</p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">createApp</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#82AAFF;">createApp</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">data</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">      count</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">mount</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">#app</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"></span></code></pre></div><div class="language-vue-html"><button class="copy"></button><span class="lang">template</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#F78C6C;">id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">app</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;"> @</span><span style="color:#C792EA;">click</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">count</span><span style="color:#89DDFF;">++</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">    Count is: </span><span style="color:#89DDFF;">{{</span><span style="color:#A6ACCD;"> count </span><span style="color:#89DDFF;">}}</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p><strong>Result</strong></p>',9),p={class:"demo"},r=l('<p>The above example demonstrates the two core features of Vue:</p><ul><li><p><strong>Declarative Rendering</strong>: Vue extends standard HTML with a template syntax that allows us to declaratively describe HTML output based on JavaScript state.</p></li><li><p><strong>Reactivity</strong>: Vue automatically tracks JavaScript state changes and efficiently updates the DOM when changes happen.</p></li></ul><p>You may already have questions - don&#39;t worry. We will cover every little detail in the rest of the documentation. For now, please read along so you can have a high-level understanding of what Vue offers.</p><div class="tip custom-block"><p class="custom-block-title">Prerequisites</p><p>The rest of the documentation assumes basic familiarity with HTML, CSS, and JavaScript. If you are totally new to frontend development, it might not be the best idea to jump right into a framework as your first step - grasp the basics and then come back! You can check your knowledge level with <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript" target="_blank" rel="noreferrer">this JavaScript overview</a>. Prior experience with other frameworks helps, but is not required.</p></div><h2 id="the-progressive-framework" tabindex="-1">The Progressive Framework <a class="header-anchor" href="#the-progressive-framework" aria-hidden="true">#</a></h2><p>Vue is a framework and ecosystem that covers most of the common features needed in frontend development. But the web is extremely diverse - the things we build on the web may vary drastically in form and scale. With that in mind, Vue is designed to be flexible and incrementally adoptable. Depending on your use case, Vue can be used in different ways:</p><ul><li>Enhancing static HTML without a build step</li><li>Embedding as Web Components on any page</li><li>Single-Page Application (SPA)</li><li>Fullstack / Server-Side Rendering (SSR)</li><li>Jamstack / Static Site Generation (SSG)</li><li>Targeting desktop, mobile, WebGL, and even the terminal</li></ul><p>If you find these concepts intimidating, don&#39;t worry! The tutorial and guide only require basic HTML and JavaScript knowledge, and you should be able to follow along without being an expert in any of these.</p><p>If you are an experienced developer interested in how to best integrate Vue into your stack, or you are curious about what these terms mean, we discuss them in more detail in <a href="/docs/guide/user-guide/guide/extras/ways-of-using-vue.html">Ways of Using Vue</a>.</p><p>Despite the flexibility, the core knowledge about how Vue works is shared across all these use cases. Even if you are just a beginner now, the knowledge gained along the way will stay useful as you grow to tackle more ambitious goals in the future. If you are a veteran, you can pick the optimal way to leverage Vue based on the problems you are trying to solve, while retaining the same productivity. This is why we call Vue &quot;The Progressive Framework&quot;: it&#39;s a framework that can grow with you and adapt to your needs.</p><h2 id="single-file-components" tabindex="-1">Single-File Components <a class="header-anchor" href="#single-file-components" aria-hidden="true">#</a></h2><p>In most build-tool-enabled Vue projects, we author Vue components using an HTML-like file format called <strong>Single-File Component</strong> (also known as <code>*.vue</code> files, abbreviated as <strong>SFC</strong>). A Vue SFC, as the name suggests, encapsulates the component&#39;s logic (JavaScript), template (HTML), and styles (CSS) in a single file. Here&#39;s the previous example, written in SFC format:</p><div class="language-vue"><button class="copy"></button><span class="lang">vue</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">data</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">      count</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;"> @</span><span style="color:#C792EA;">click</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">count</span><span style="color:#89DDFF;">++</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Count is: </span><span style="color:#89DDFF;">{{</span><span style="color:#A6ACCD;"> count </span><span style="color:#89DDFF;">}}&lt;/</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">style</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">scoped</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#FFCB6B;">button</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">font-weight</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> bold</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p>SFC is a defining feature of Vue and is the recommended way to author Vue components <strong>if</strong> your use case warrants a build setup. You can learn more about the <a href="/docs/guide/user-guide/guide/scaling-up/sfc.html">how and why of SFC</a> in its dedicated section - but for now, just know that Vue will handle all the build tools setup for you.</p><h2 id="api-styles" tabindex="-1">API Styles <a class="header-anchor" href="#api-styles" aria-hidden="true">#</a></h2><p>Vue components can be authored in two different API styles: <strong>Options API</strong> and <strong>Composition API</strong>.</p><h3 id="options-api" tabindex="-1">Options API <a class="header-anchor" href="#options-api" aria-hidden="true">#</a></h3><p>With Options API, we define a component&#39;s logic using an object of options such as <code>data</code>, <code>methods</code>, and <code>mounted</code>. Properties defined by options are exposed on <code>this</code> inside functions, which points to the component instance:</p><div class="language-vue"><button class="copy"></button><span class="lang">vue</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// Properties returned from data() become reactive state</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// and will be exposed on `this`.</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">data</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">      count</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// Methods are functions that mutate state and trigger updates.</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// They can be bound as event listeners in templates.</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">methods</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">increment</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">count</span><span style="color:#89DDFF;">++</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// Lifecycle hooks are called at different stages</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// of a component&#39;s lifecycle.</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// This function will be called when the component is mounted.</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">mounted</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">`</span><span style="color:#C3E88D;">The initial count is </span><span style="color:#89DDFF;">${</span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">count</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;">.</span><span style="color:#89DDFF;">`</span><span style="color:#F07178;">)</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;"> @</span><span style="color:#C792EA;">click</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">increment</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Count is: </span><span style="color:#89DDFF;">{{</span><span style="color:#A6ACCD;"> count </span><span style="color:#89DDFF;">}}&lt;/</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p><a href="https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLy8gcmVhY3RpdmUgc3RhdGVcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY291bnQ6IDBcbiAgICB9XG4gIH0sXG5cbiAgLy8gZnVuY3Rpb25zIHRoYXQgbXV0YXRlIHN0YXRlIGFuZCB0cmlnZ2VyIHVwZGF0ZXNcbiAgbWV0aG9kczoge1xuICAgIGluY3JlbWVudCgpIHtcbiAgICAgIHRoaXMuY291bnQrK1xuICAgIH1cbiAgfSxcblxuICAvLyBsaWZlY3ljbGUgaG9va3NcbiAgbW91bnRlZCgpIHtcbiAgICBjb25zb2xlLmxvZyhgVGhlIGluaXRpYWwgY291bnQgaXMgJHt0aGlzLmNvdW50fS5gKVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImluY3JlbWVudFwiPkNvdW50IGlzOiB7eyBjb3VudCB9fTwvYnV0dG9uPlxuPC90ZW1wbGF0ZT4ifQ==" target="_blank" rel="noreferrer">Try it in the Playground</a></p><h3 id="composition-api" tabindex="-1">Composition API <a class="header-anchor" href="#composition-api" aria-hidden="true">#</a></h3><p>With Composition API, we define a component&#39;s logic using imported API functions. In SFCs, Composition API is typically used with <a href="/docs/guide/user-guide/api/sfc-script-setup.html"><code>&lt;script setup&gt;</code></a>. The <code>setup</code> attribute is a hint that makes Vue perform compile-time transforms that allow us to use Composition API with less boilerplate. For example, imports and top-level variables / functions declared in <code>&lt;script setup&gt;</code> are directly usable in the template.</p><p>Here is the same component, with the exact same template, but using Composition API and <code>&lt;script setup&gt;</code> instead:</p><div class="language-vue"><button class="copy"></button><span class="lang">vue</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">setup</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">ref</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">onMounted</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;">// reactive state</span></span>\n<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> count </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">ref</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;">// functions that mutate state and trigger updates</span></span>\n<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">increment</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">count</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">++</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;">// lifecycle hooks</span></span>\n<span class="line"><span style="color:#82AAFF;">onMounted</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">`</span><span style="color:#C3E88D;">The initial count is </span><span style="color:#89DDFF;">${</span><span style="color:#A6ACCD;">count</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;">.</span><span style="color:#89DDFF;">`</span><span style="color:#F07178;">)</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;"> @</span><span style="color:#C792EA;">click</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">increment</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Count is: </span><span style="color:#89DDFF;">{{</span><span style="color:#A6ACCD;"> count </span><span style="color:#89DDFF;">}}&lt;/</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p><a href="https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgb25Nb3VudGVkIH0gZnJvbSAndnVlJ1xuXG4vLyByZWFjdGl2ZSBzdGF0ZVxuY29uc3QgY291bnQgPSByZWYoMClcblxuLy8gZnVuY3Rpb25zIHRoYXQgbXV0YXRlIHN0YXRlIGFuZCB0cmlnZ2VyIHVwZGF0ZXNcbmZ1bmN0aW9uIGluY3JlbWVudCgpIHtcbiAgY291bnQudmFsdWUrK1xufVxuXG4vLyBsaWZlY3ljbGUgaG9va3Ncbm9uTW91bnRlZCgoKSA9PiB7XG4gIGNvbnNvbGUubG9nKGBUaGUgaW5pdGlhbCBjb3VudCBpcyAke2NvdW50LnZhbHVlfS5gKVxufSlcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxidXR0b24gQGNsaWNrPVwiaW5jcmVtZW50XCI+Q291bnQgaXM6IHt7IGNvdW50IH19PC9idXR0b24+XG48L3RlbXBsYXRlPiJ9" target="_blank" rel="noreferrer">Try it in the Playground</a></p><h3 id="which-to-choose" tabindex="-1">Which to Choose? <a class="header-anchor" href="#which-to-choose" aria-hidden="true">#</a></h3><p>Both API styles are fully capable of covering common use cases. They are different interfaces powered by the exact same underlying system. In fact, the Options API is implemented on top of the Composition API! The fundamental concepts and knowledge about Vue are shared across the two styles.</p><p>The Options API is centered around the concept of a &quot;component instance&quot; (<code>this</code> as seen in the example), which typically aligns better with a class-based mental model for users coming from OOP language backgrounds. It is also more beginner-friendly by abstracting away the reactivity details and enforcing code organization via option groups.</p><p>The Composition API is centered around declaring reactive state variables directly in a function scope and composing state from multiple functions together to handle complexity. It is more free-form and requires an understanding of how reactivity works in Vue to be used effectively. In return, its flexibility enables more powerful patterns for organizing and reusing logic.</p><p>You can learn more about the comparison between the two styles and the potential benefits of Composition API in the <a href="/docs/guide/user-guide/guide/extras/composition-api-faq.html">Composition API FAQ</a>.</p><p>If you are new to Vue, here&#39;s our general recommendation:</p><ul><li><p>For learning purposes, go with the style that looks easier to understand to you. Again, most of the core concepts are shared between the two styles. You can always pick up the other style later.</p></li><li><p>For production use:</p><ul><li><p>Go with Options API if you are not using build tools, or plan to use Vue primarily in low-complexity scenarios, e.g. progressive enhancement.</p></li><li><p>Go with Composition API + Single-File Components if you plan to build full applications with Vue.</p></li></ul></li></ul><p>You don&#39;t have to commit to only one style during the learning phase. The rest of the documentation will provide code samples in both styles where applicable, and you can toggle between them at any time using the <strong>API Preference switches</strong> at the top of the left sidebar.</p><h2 id="still-got-questions" tabindex="-1">Still Got Questions? <a class="header-anchor" href="#still-got-questions" aria-hidden="true">#</a></h2><p>Check out our <a href="/docs/guide/user-guide/about/faq.html">FAQ</a>.</p><h2 id="pick-your-learning-path" tabindex="-1">Pick Your Learning Path <a class="header-anchor" href="#pick-your-learning-path" aria-hidden="true">#</a></h2><p>Different developers have different learning styles. Feel free to pick a learning path that suits your preference - although we do recommend going over all of the content, if possible!</p><div class="vt-box-container next-steps"><a class="vt-box" href="/tutorial/"><p class="next-steps-link">Try the Tutorial</p><p class="next-steps-caption">For those who prefer learning things hands-on.</p></a><a class="vt-box" href="/guide/quick-start.html"><p class="next-steps-link">Read the Guide</p><p class="next-steps-caption">The guide walks you through every aspect of the framework in full detail.</p></a><a class="vt-box" href="/examples/"><p class="next-steps-link">Check out the Examples</p><p class="next-steps-caption">Explore examples of core features and common UI tasks.</p></a></div>',38),c=JSON.parse('{"title":"Introduction","description":"","frontmatter":{"footer":false},"headers":[{"level":2,"title":"What is Vue?","slug":"what-is-vue","link":"#what-is-vue","children":[]},{"level":2,"title":"The Progressive Framework","slug":"the-progressive-framework","link":"#the-progressive-framework","children":[]},{"level":2,"title":"Single-File Components","slug":"single-file-components","link":"#single-file-components","children":[]},{"level":2,"title":"API Styles","slug":"api-styles","link":"#api-styles","children":[{"level":3,"title":"Options API","slug":"options-api","link":"#options-api","children":[]},{"level":3,"title":"Composition API","slug":"composition-api","link":"#composition-api","children":[]},{"level":3,"title":"Which to Choose?","slug":"which-to-choose","link":"#which-to-choose","children":[]}]},{"level":2,"title":"Still Got Questions?","slug":"still-got-questions","link":"#still-got-questions","children":[]},{"level":2,"title":"Pick Your Learning Path","slug":"pick-your-learning-path","link":"#pick-your-learning-path","children":[]}],"relativePath":"guide/introduction.md"}'),i=Object.assign({name:"guide/introduction.md"},{setup(l){const c=s(0);return(s,l)=>(n(),a("div",null,[t,e("div",p,[e("button",{onClick:l[0]||(l[0]=s=>c.value++)}," Count is: "+o(c.value),1)]),r]))}});export{c as __pageData,i as default};
