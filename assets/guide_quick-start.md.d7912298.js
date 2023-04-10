import{_ as s,o as n,c as a,a as e}from"./app.01220c78.js";const o=JSON.parse('{"title":"Quick Start","description":"","frontmatter":{"footer":false},"headers":[{"level":2,"title":"Try Vue Online","slug":"try-vue-online","link":"#try-vue-online","children":[]},{"level":2,"title":"Creating a Vue Application","slug":"creating-a-vue-application","link":"#creating-a-vue-application","children":[]},{"level":2,"title":"Using Vue from CDN","slug":"using-vue-from-cdn","link":"#using-vue-from-cdn","children":[{"level":3,"title":"Using the Global Build","slug":"using-the-global-build","link":"#using-the-global-build","children":[]},{"level":3,"title":"Using the ES Module Build","slug":"using-the-es-module-build","link":"#using-the-es-module-build","children":[]},{"level":3,"title":"Enabling Import maps","slug":"enabling-import-maps","link":"#enabling-import-maps","children":[]},{"level":3,"title":"Splitting Up the Modules","slug":"splitting-up-the-modules","link":"#splitting-up-the-modules","children":[]},{"level":3,"title":"Using Composition API without a Build Step","slug":"using-composition-api-without-a-build-step","link":"#using-composition-api-without-a-build-step","children":[]}]},{"level":2,"title":"Next Steps","slug":"next-steps","link":"#next-steps","children":[]}],"relativePath":"guide/quick-start.md"}'),l={name:"guide/quick-start.md"},p=[e('<h1 id="quick-start" tabindex="-1">Quick Start <a class="header-anchor" href="#quick-start" aria-hidden="true">#</a></h1><h2 id="try-vue-online" tabindex="-1">Try Vue Online <a class="header-anchor" href="#try-vue-online" aria-hidden="true">#</a></h2><ul><li><p>To quickly get a taste of Vue, you can try it directly in our <a href="https://sfc.vuejs.org/#eNo9j01qAzEMha+iapMWOjbdDm6gu96gG2/cjJJM8B+2nBaGuXvlpBMwtj4/JL234EfO6toIRzT1UObMexvpN6fCMNHRNc+w2AgwOXbPL/caoBC3EjcCCPU0wu6TvE/wlYqfnnZ3ae2PXHKMfiwQYArZOyYhAHN+2y9LnwLrarTQ7XeOuTFch5Am8u8WRbcoktGPbnzFOXS3Q3BZXWqKkuRmy/4L1eK4GbUoUTtbPDPnOmpdj4ee/1JVKictlSot8hxIUQ3Dd0k/lYoMtrglwfUPkXdoJg==" target="_blank" rel="noreferrer">Playground</a>.</p></li><li><p>If you prefer a plain HTML setup without any build steps, you can use this <a href="https://jsfiddle.net/yyx990803/2ke1ab0z/" target="_blank" rel="noreferrer">JSFiddle</a> as your starting point.</p></li><li><p>If you are already familiar with Node.js and the concept of build tools, you can also try a complete build setup right within your browser on <a href="https://vite.new/vue" target="_blank" rel="noreferrer">StackBlitz</a>.</p></li></ul><h2 id="creating-a-vue-application" tabindex="-1">Creating a Vue Application <a class="header-anchor" href="#creating-a-vue-application" aria-hidden="true">#</a></h2><div class="tip custom-block"><p class="custom-block-title">Prerequisites</p><ul><li>Familiarity with the command line</li><li>Install <a href="https://nodejs.org/" target="_blank" rel="noreferrer">Node.js</a> version 16.0 or higher</li></ul></div><p>In this section we will introduce how to scaffold a Vue <a href="/docs/guide/extras/ways-of-using-vue.html#single-page-application-spa">Single Page Application</a> on your local machine. The created project will be using a build setup based on <a href="https://vitejs.dev" target="_blank" rel="noreferrer">Vite</a> and allow us to use Vue <a href="/docs/guide/scaling-up/sfc.html">Single-File Components</a> (SFCs).</p><p>Make sure you have an up-to-date version of <a href="https://nodejs.org/" target="_blank" rel="noreferrer">Node.js</a> installed, then run the following command in your command line (without the <code>&gt;</code> sign):</p><div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt;</span> <span style="color:#A6ACCD;">npm init vue@latest</span></span></code></pre></div><p>This command will install and execute <a href="https://github.com/vuejs/create-vue" target="_blank" rel="noreferrer">create-vue</a>, the official Vue project scaffolding tool. You will be presented with prompts for several optional features such as TypeScript and testing support:</p><div class="language-sh"><pre><code><span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Project name: <span style="color:#888;">… <span style="color:#89DDFF;">&lt;</span><span style="color:#888;">your-project-name</span><span style="color:#89DDFF;">&gt;</span></span></span>\n<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add TypeScript? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline;">No</span> / Yes</span></span>\n<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add JSX Support? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline;">No</span> / Yes</span></span>\n<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Vue Router for Single Page Application development? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline;">No</span> / Yes</span></span>\n<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Pinia for state management? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline;">No</span> / Yes</span></span>\n<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Vitest for Unit testing? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline;">No</span> / Yes</span></span>\n<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Cypress for both Unit and End-to-End testing? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline;">No</span> / Yes</span></span>\n<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add ESLint for code quality? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline;">No</span> / Yes</span></span>\n<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Prettier for code formatting? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline;">No</span> / Yes</span></span>\n<span></span>\n<span style="color:#A6ACCD;">Scaffolding project in ./<span style="color:#89DDFF;">&lt;</span><span style="color:#888;">your-project-name</span><span style="color:#89DDFF;">&gt;</span>...</span>\n<span style="color:#A6ACCD;">Done.</span></code></pre></div><p>If you are unsure about an option, simply choose <code>No</code> by hitting enter for now. Once the project is created, follow the instructions to install dependencies and start the dev server:</p><div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#888;">your-project-name</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">npm install</span></span>\n<span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">npm run dev</span></span>\n<span class="line"></span></code></pre></div><p>You should now have your first Vue project running! Note that the example components in the generated project are written using the <a href="/docs/guide/introduction.html#composition-api">Composition API</a> and <code>&lt;script setup&gt;</code>, rather than the <a href="/docs/guide/introduction.html#options-api">Options API</a>. Here are some additional tips:</p><ul><li>The recommended IDE setup is <a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer">Visual Studio Code</a> + <a href="https://marketplace.visualstudio.com/items?itemName=Vue.volar" target="_blank" rel="noreferrer">Volar extension</a>. If you use other editors, check out the <a href="/docs/guide/scaling-up/tooling.html#ide-support">IDE support section</a>.</li><li>More tooling details, including integration with backend frameworks, are discussed in the <a href="/docs/guide/scaling-up/tooling.html">Tooling Guide</a>.</li><li>To learn more about the underlying build tool Vite, check out the <a href="https://vitejs.dev" target="_blank" rel="noreferrer">Vite docs</a>.</li><li>If you choose to use TypeScript, check out the <a href="./typescript/overview.html">TypeScript Usage Guide</a>.</li></ul><p>When you are ready to ship your app to production, run the following:</p><div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">npm run build</span></span>\n<span class="line"></span></code></pre></div><p>This will create a production-ready build of your app in the project&#39;s <code>./dist</code> directory. Check out the <a href="/docs/guide/best-practices/production-deployment.html">Production Deployment Guide</a> to learn more about shipping your app to production.</p><p><a href="#next-steps">Next Steps &gt;</a></p><h2 id="using-vue-from-cdn" tabindex="-1">Using Vue from CDN <a class="header-anchor" href="#using-vue-from-cdn" aria-hidden="true">#</a></h2><p>You can use Vue directly from a CDN via a script tag:</p><div class="language-html"><button class="copy"></button><span class="lang">html</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">src</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">https://unpkg.com/vue@3/dist/vue.global.js</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p>Here we are using <a href="https://unpkg.com/" target="_blank" rel="noreferrer">unpkg</a>, but you can also use any CDN that serves npm packages, for example <a href="https://www.jsdelivr.com/package/npm/vue" target="_blank" rel="noreferrer">jsdelivr</a> or <a href="https://cdnjs.com/libraries/vue" target="_blank" rel="noreferrer">cdnjs</a>. Of course, you can also download this file and serve it yourself.</p><p>When using Vue from a CDN, there is no &quot;build step&quot; involved. This makes the setup a lot simpler, and is suitable for enhancing static HTML or integrating with a backend framework. However, you won&#39;t be able to use the Single-File Component (SFC) syntax.</p><h3 id="using-the-global-build" tabindex="-1">Using the Global Build <a class="header-anchor" href="#using-the-global-build" aria-hidden="true">#</a></h3><p>The above link loads the <em>global build</em> of Vue, where all top-level APIs are exposed as properties on the global <code>Vue</code> object. Here is a full example using the global build:</p><div class="language-html"><button class="copy"></button><span class="lang">html</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">src</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">https://unpkg.com/vue@3/dist/vue.global.js</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">app</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">{{ message }}</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> createApp </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> Vue</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">createApp</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">data</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">        message</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Hello Vue!</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">mount</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">#app</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p><a href="https://jsfiddle.net/yyx990803/nw1xg8Lj/" target="_blank" rel="noreferrer">JSFiddle demo</a></p><h3 id="using-the-es-module-build" tabindex="-1">Using the ES Module Build <a class="header-anchor" href="#using-the-es-module-build" aria-hidden="true">#</a></h3><p>Throughout the rest of the documentation, we will be primarily using <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules" target="_blank" rel="noreferrer">ES modules</a> syntax. Most modern browsers now support ES modules natively, so we can use Vue from a CDN via native ES modules like this:</p><div class="language-html"><button class="copy"></button><span class="lang">html</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">app</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">{{ message }}</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line highlighted"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">module</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line highlighted"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">createApp</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">https://unpkg.com/vue@3/dist/vue.esm-browser.js</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">createApp</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">data</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">        message</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Hello Vue!</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">mount</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">#app</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p>Notice that we are using <code>&lt;script type=&quot;module&quot;&gt;</code>, and the imported CDN URL is pointing to the <strong>ES modules build</strong> of Vue instead.</p><p><a href="https://jsfiddle.net/yyx990803/vo23c470/" target="_blank" rel="noreferrer">JSFiddle demo</a></p><h3 id="enabling-import-maps" tabindex="-1">Enabling Import maps <a class="header-anchor" href="#enabling-import-maps" aria-hidden="true">#</a></h3><p>In the above example, we are importing from the full CDN URL, but in the rest of the documentation you will see code like this:</p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">createApp</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span></code></pre></div><p>We can teach the browser where to locate the <code>vue</code> import by using <a href="https://caniuse.com/import-maps" target="_blank" rel="noreferrer">Import Maps</a>:</p><div class="language-html"><button class="copy"></button><span class="lang">html</span><pre><code><span class="line highlighted"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">importmap</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line highlighted"><span style="color:#A6ACCD;">  {</span></span>\n<span class="line highlighted"><span style="color:#A6ACCD;">    &quot;imports&quot;: {</span></span>\n<span class="line highlighted"><span style="color:#A6ACCD;">      &quot;vue&quot;: &quot;https://unpkg.com/vue@3/dist/vue.esm-browser.js&quot;</span></span>\n<span class="line highlighted"><span style="color:#A6ACCD;">    }</span></span>\n<span class="line highlighted"><span style="color:#A6ACCD;">  }</span></span>\n<span class="line highlighted"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">app</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">{{ message }}</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">module</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line highlighted"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">createApp</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">createApp</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">data</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">        message</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Hello Vue!</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">mount</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">#app</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p><a href="https://jsfiddle.net/yyx990803/2ke1ab0z/" target="_blank" rel="noreferrer">JSFiddle demo</a></p><p>You can also add entries for other dependencies to the import map - but make sure they point to the ES modules version of the library you intend to use.</p><div class="tip custom-block"><p class="custom-block-title">Import Maps Browser Support</p><p>Import maps are supported by default in Chromium-based browsers, so we recommend using Chrome or Edge during the learning process.</p><p>If using Firefox, it is only supported in version 102+ and currently needs to be enabled via the <code>dom.importMaps.enabled</code> option in <code>about:config</code>.</p><p>If your preferred browser does not support import maps yet, you can polyfill it with <a href="https://github.com/guybedford/es-module-shims" target="_blank" rel="noreferrer">es-module-shims</a>.</p></div><div class="warning custom-block"><p class="custom-block-title">Notes on Production Use</p><p>The examples so far are using the development build of Vue - if you intend to use Vue from a CDN in production, make sure to check out the <a href="/docs/guide/best-practices/production-deployment.html#without-build-tools">Production Deployment Guide</a>.</p></div><h3 id="splitting-up-the-modules" tabindex="-1">Splitting Up the Modules <a class="header-anchor" href="#splitting-up-the-modules" aria-hidden="true">#</a></h3><p>As we dive deeper into the guide, we may need to split our code into separate JavaScript files so that they are easier to manage. For example:</p><div class="language-html"><button class="copy"></button><span class="lang">html</span><pre><code><span class="line"><span style="color:#676E95;">&lt;!-- index.html --&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">module</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">createApp</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> MyComponent </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./my-component.js</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">createApp</span><span style="color:#A6ACCD;">(MyComponent)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">mount</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">#app</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#676E95;">// my-component.js</span></span>\n<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">data</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> count</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">`</span><span style="color:#C3E88D;">&lt;div&gt;count is {{ count }}&lt;/div&gt;</span><span style="color:#89DDFF;">`</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div><p>If you directly open the above <code>index.html</code> in your browser, you will find that it throws an error because ES modules cannot work over the <code>file://</code> protocol. In order for this to work, you need to serve your <code>index.html</code> over the <code>http://</code> protocol, with a local HTTP server.</p><p>To start a local HTTP server, first install <a href="https://nodejs.org/en/" target="_blank" rel="noreferrer">Node.js</a> and then run <code>npx serve</code> from the command line in the same directory where your HTML file is. You can also use any other HTTP server that can serve static files with the correct MIME types.</p><p>You may have noticed that the imported component&#39;s template is inlined as a JavaScript string. If you are using VSCode, you can install the <a href="https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html" target="_blank" rel="noreferrer">es6-string-html</a> extension and prefix the strings with a <code>/*html*/</code> comment to get syntax highlighting for them.</p><h3 id="using-composition-api-without-a-build-step" tabindex="-1">Using Composition API without a Build Step <a class="header-anchor" href="#using-composition-api-without-a-build-step" aria-hidden="true">#</a></h3><p>Many of the examples for Composition API will be using the <code>&lt;script setup&gt;</code> syntax. If you intend to use Composition API without a build step, consult the usage of the <a href="/docs/api/composition-api-setup.html"><code>setup()</code> option</a>.</p><h2 id="next-steps" tabindex="-1">Next Steps <a class="header-anchor" href="#next-steps" aria-hidden="true">#</a></h2><p>If you skipped the <a href="/docs/guide/introduction.html">Introduction</a>, we strongly recommend reading it before moving on to the rest of the documentation.</p><div class="vt-box-container next-steps"><a class="vt-box" href="/guide/essentials/application.html"><p class="next-steps-link">Continue with the Guide</p><p class="next-steps-caption">The guide walks you through every aspect of the framework in full detail.</p></a><a class="vt-box" href="/tutorial/"><p class="next-steps-link">Try the Tutorial</p><p class="next-steps-caption">For those who prefer learning things hands-on.</p></a><a class="vt-box" href="/examples/"><p class="next-steps-link">Check out the Examples</p><p class="next-steps-caption">Explore examples of core features and common UI tasks.</p></a></div>',53)];const t=s(l,[["render",function(s,e,o,l,t,r){return n(),a("div",null,p)}]]);export{o as __pageData,t as default};
