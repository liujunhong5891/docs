import{_ as s,C as e,o as n,c as a,j as o,d as l,e as p,a as t}from"./app.ca076d61.js";const r=JSON.parse('{"title":"Using Vue with TypeScript","description":"","frontmatter":{"outline":"deep"},"headers":[{"level":2,"title":"Project Setup","slug":"project-setup","link":"#project-setup","children":[{"level":3,"title":"Overview","slug":"overview","link":"#overview","children":[]},{"level":3,"title":"IDE Support","slug":"ide-support","link":"#ide-support","children":[]},{"level":3,"title":"Configuring tsconfig.json","slug":"configuring-tsconfig-json","link":"#configuring-tsconfig-json","children":[]},{"level":3,"title":"Volar Takeover Mode","slug":"volar-takeover-mode","link":"#volar-takeover-mode","children":[]},{"level":3,"title":"Note on Vue CLI and ts-loader","slug":"note-on-vue-cli-and-ts-loader","link":"#note-on-vue-cli-and-ts-loader","children":[]}]},{"level":2,"title":"General Usage Notes","slug":"general-usage-notes","link":"#general-usage-notes","children":[{"level":3,"title":"defineComponent()","slug":"definecomponent","link":"#definecomponent","children":[]},{"level":3,"title":"Usage in Single-File Components","slug":"usage-in-single-file-components","link":"#usage-in-single-file-components","children":[]},{"level":3,"title":"TypeScript in Templates","slug":"typescript-in-templates","link":"#typescript-in-templates","children":[]}]},{"level":2,"title":"API-Specific Recipes","slug":"api-specific-recipes","link":"#api-specific-recipes","children":[]}],"relativePath":"guide/typescript/overview.md"}'),c={name:"guide/typescript/overview.md"},i=l("h1",{id:"using-vue-with-typescript",tabindex:"-1"},[p("Using Vue with TypeScript "),l("a",{class:"header-anchor",href:"#using-vue-with-typescript","aria-hidden":"true"},"#")],-1),y=t('<p>A type system like TypeScript can detect many common errors via static analysis at build time. This reduces the chance of runtime errors in production, and also allows us to more confidently refactor code in large-scale applications. TypeScript also improves developer ergonomics via type-based auto-completion in IDEs.</p><p>Vue is written in TypeScript itself and provides first-class TypeScript support. All official Vue packages come with bundled type declarations that should work out-of-the-box.</p><h2 id="project-setup" tabindex="-1">Project Setup <a class="header-anchor" href="#project-setup" aria-hidden="true">#</a></h2><p><a href="https://github.com/vuejs/create-vue" target="_blank" rel="noreferrer"><code>create-vue</code></a>, the official project scaffolding tool, offers the options to scaffold a <a href="https://vitejs.dev/" target="_blank" rel="noreferrer">Vite</a>-powered, TypeScript-ready Vue project.</p><h3 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-hidden="true">#</a></h3><p>With a Vite-based setup, the dev server and the bundler are transpilation-only and do not perform any type-checking. This ensures the Vite dev server stays blazing fast even when using TypeScript.</p><ul><li><p>During development, we recommend relying on a good <a href="#ide-support">IDE setup</a> for instant feedback on type errors.</p></li><li><p>If using SFCs, use the <a href="https://github.com/johnsoncodehk/volar/tree/master/vue-language-tools/vue-tsc" target="_blank" rel="noreferrer"><code>vue-tsc</code></a> utility for command line type checking and type declaration generation. <code>vue-tsc</code> is a wrapper around <code>tsc</code>, TypeScript&#39;s own command line interface. It works largely the same as <code>tsc</code> except that it supports Vue SFCs in addition to TypeScript files. You can run <code>vue-tsc</code> in watch mode in parallel to the Vite dev server, or use a Vite plugin like <a href="https://vite-plugin-checker.netlify.app/" target="_blank" rel="noreferrer">vite-plugin-checker</a> which runs the checks in a separate worker thread.</p></li><li><p>Vue CLI also provides TypeScript support, but is no longer recommended. See <a href="#note-on-vue-cli-and-ts-loader">notes below</a>.</p></li></ul><h3 id="ide-support" tabindex="-1">IDE Support <a class="header-anchor" href="#ide-support" aria-hidden="true">#</a></h3><ul><li><p><a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer">Visual Studio Code</a> (VSCode) is strongly recommended for its great out-of-the-box support for TypeScript.</p><ul><li><p><a href="https://marketplace.visualstudio.com/items?itemName=Vue.volar" target="_blank" rel="noreferrer">Volar</a> is the official VSCode extension that provides TypeScript support inside Vue SFCs, along with many other great features.</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Volar replaces <a href="https://marketplace.visualstudio.com/items?itemName=octref.vetur" target="_blank" rel="noreferrer">Vetur</a>, our previous official VSCode extension for Vue 2. If you have Vetur currently installed, make sure to disable it in Vue 3 projects.</p></div></li><li><p><a href="https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin" target="_blank" rel="noreferrer">TypeScript Vue Plugin</a> is also needed to get type support for <code>*.vue</code> imports in TS files.</p></li></ul></li><li><p><a href="https://www.jetbrains.com/webstorm/" target="_blank" rel="noreferrer">WebStorm</a> also provides out-of-the-box support for both TypeScript and Vue. Other JetBrains IDEs support them too, either out of the box or via <a href="https://plugins.jetbrains.com/plugin/9442-vue-js" target="_blank" rel="noreferrer">a free plugin</a>.</p></li></ul><h3 id="configuring-tsconfig-json" tabindex="-1">Configuring <code>tsconfig.json</code> <a class="header-anchor" href="#configuring-tsconfig-json" aria-hidden="true">#</a></h3><p>Projects scaffolded via <code>create-vue</code> include pre-configured <code>tsconfig.json</code>. The base config is abstracted in the <a href="https://github.com/vuejs/tsconfig" target="_blank" rel="noreferrer"><code>@vue/tsconfig</code></a> package. Inside the project, we use <a href="https://www.typescriptlang.org/docs/handbook/project-references.html" target="_blank" rel="noreferrer">Project References</a> to ensure correct types for code running in different environments (e.g. app code and test code should have different global variables).</p><p>When configuring <code>tsconfig.json</code> manually, some notable options include:</p><ul><li><p><a href="https://www.typescriptlang.org/tsconfig#isolatedModules" target="_blank" rel="noreferrer"><code>compilerOptions.isolatedModules</code></a> is set to <code>true</code> because Vite uses <a href="https://esbuild.github.io/" target="_blank" rel="noreferrer">esbuild</a> for transpiling TypeScript and is subject to single-file transpile limitations.</p></li><li><p>If you&#39;re using Options API, you need to set <a href="https://www.typescriptlang.org/tsconfig#strict" target="_blank" rel="noreferrer"><code>compilerOptions.strict</code></a> to <code>true</code> (or at least enable <a href="https://www.typescriptlang.org/tsconfig#noImplicitThis" target="_blank" rel="noreferrer"><code>compilerOptions.noImplicitThis</code></a>, which is a part of the <code>strict</code> flag) to leverage type checking of <code>this</code> in component options. Otherwise <code>this</code> will be treated as <code>any</code>.</p></li><li><p>If you have configured resolver aliases in your build tool, for example the <code>@/*</code> alias configured by default in a <code>create-vue</code> project, you need to also configure it for TypeScript via <a href="https://www.typescriptlang.org/tsconfig#paths" target="_blank" rel="noreferrer"><code>compilerOptions.paths</code></a>.</p></li></ul><p>See also:</p><ul><li><a href="https://www.typescriptlang.org/docs/handbook/compiler-options.html" target="_blank" rel="noreferrer">Official TypeScript compiler options docs</a></li><li><a href="https://esbuild.github.io/content-types/#typescript-caveats" target="_blank" rel="noreferrer">esbuild TypeScript compilation caveats</a></li></ul><h3 id="volar-takeover-mode" tabindex="-1">Volar Takeover Mode <a class="header-anchor" href="#volar-takeover-mode" aria-hidden="true">#</a></h3><blockquote><p>This section only applies for VSCode + Volar.</p></blockquote><p>To get Vue SFCs and TypeScript working together, Volar creates a separate TS language service instance patched with Vue-specific support, and uses it in Vue SFCs. At the same time, plain TS files are still handled by VSCode&#39;s built-in TS language service, which is why we need <a href="https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin" target="_blank" rel="noreferrer">TypeScript Vue Plugin</a> to support Vue SFC imports in TS files. This default setup works, but for each project we are running two TS language service instances: one from Volar, one from VSCode&#39;s built-in service. This is a bit inefficient and can lead to performance issues in large projects.</p><p>Volar provides a feature called &quot;Takeover Mode&quot; to improve performance. In takeover mode, Volar provides support for both Vue and TS files using a single TS language service instance.</p><p>To enable Takeover Mode, you need to disable VSCode&#39;s built-in TS language service in <strong>your project&#39;s workspace only</strong> by following these steps:</p><ol><li>In your project workspace, bring up the command palette with <code>Ctrl + Shift + P</code> (macOS: <code>Cmd + Shift + P</code>).</li><li>Type <code>built</code> and select &quot;Extensions: Show Built-in Extensions&quot;.</li><li>Type <code>typescript</code> in the extension search box (do not remove <code>@builtin</code> prefix).</li><li>Click the little gear icon of &quot;TypeScript and JavaScript Language Features&quot;, and select &quot;Disable (Workspace)&quot;.</li><li>Reload the workspace. Takeover mode will be enabled when you open a Vue or TS file.</li></ol><img src="/docs/assets/takeover-mode.54f7bbf6.png" width="590" height="426" style="margin:0px auto;border-radius:8px;"><h3 id="note-on-vue-cli-and-ts-loader" tabindex="-1">Note on Vue CLI and <code>ts-loader</code> <a class="header-anchor" href="#note-on-vue-cli-and-ts-loader" aria-hidden="true">#</a></h3><p>In webpack-based setups such as Vue CLI, it is common to perform type checking as part of the module transform pipeline, for example with <code>ts-loader</code>. This, however, isn&#39;t a clean solution because the type system needs knowledge of the entire module graph to perform type checks. Individual module&#39;s transform step simply is not the right place for the task. It leads to the following problems:</p><ul><li><p><code>ts-loader</code> can only type check post-transform code. This doesn&#39;t align with the errors we see in IDEs or from <code>vue-tsc</code>, which map directly back to the source code.</p></li><li><p>Type checking can be slow. When it is performed in the same thread / process with code transformations, it significantly affects the build speed of the entire application.</p></li><li><p>We already have type checking running right in our IDE in a separate process, so the cost of dev experience slow down simply isn&#39;t a good trade-off.</p></li></ul><p>If you are currently using Vue 3 + TypeScript via Vue CLI, we strongly recommend migrating over to Vite. We are also working on CLI options to enable transpile-only TS support, so that you can switch to <code>vue-tsc</code> for type checking.</p><h2 id="general-usage-notes" tabindex="-1">General Usage Notes <a class="header-anchor" href="#general-usage-notes" aria-hidden="true">#</a></h2><h3 id="definecomponent" tabindex="-1"><code>defineComponent()</code> <a class="header-anchor" href="#definecomponent" aria-hidden="true">#</a></h3><p>To let TypeScript properly infer types inside component options, we need to define components with <a href="/docs/api/general.html#definecomponent"><code>defineComponent()</code></a>:</p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">defineComponent</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">defineComponent</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// type inference enabled</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">props</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> String</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">msg</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">type</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> String</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">required</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">data</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">      count</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">mounted</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">name</span><span style="color:#F07178;"> </span><span style="color:#676E95;">// type: string | undefined</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">msg</span><span style="color:#F07178;"> </span><span style="color:#676E95;">// type: string</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">count</span><span style="color:#F07178;"> </span><span style="color:#676E95;">// type: number</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"></span></code></pre></div><p><code>defineComponent()</code> also supports inferring the props passed to <code>setup()</code> when using Composition API without <code>&lt;script setup&gt;</code>:</p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">defineComponent</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">defineComponent</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// type inference enabled</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">props</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">message</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> String</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">setup</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">props</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">props</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">message</span><span style="color:#F07178;"> </span><span style="color:#676E95;">// type: string | undefined</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"></span></code></pre></div><p>See also:</p><ul><li><a href="/docs/api/general.html#note-on-webpack-treeshaking">Note on webpack Treeshaking</a></li><li><a href="https://github.com/vuejs/core/blob/main/test-dts/defineComponent.test-d.tsx" target="_blank" rel="noreferrer">type tests for <code>defineComponent</code></a></li></ul><div class="tip custom-block"><p class="custom-block-title">TIP</p><p><code>defineComponent()</code> also enables type inference for components defined in plain JavaScript.</p></div><h3 id="usage-in-single-file-components" tabindex="-1">Usage in Single-File Components <a class="header-anchor" href="#usage-in-single-file-components" aria-hidden="true">#</a></h3><p>To use TypeScript in SFCs, add the <code>lang=&quot;ts&quot;</code> attribute to <code>&lt;script&gt;</code> tags. When <code>lang=&quot;ts&quot;</code> is present, all template expressions also enjoy stricter type checking.</p><div class="language-vue"><button class="copy"></button><span class="lang">vue</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">lang</span><span style="color:#A6ACCD;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">ts</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">defineComponent</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">defineComponent</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">data</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">      count</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;">&lt;!-- type checking and auto-completion enabled --&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">{{</span><span style="color:#A6ACCD;"> count</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">toFixed</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">}}</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p><code>lang=&quot;ts&quot;</code> can also be used with <code>&lt;script setup&gt;</code>:</p><div class="language-vue"><button class="copy"></button><span class="lang">vue</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">setup</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">lang</span><span style="color:#A6ACCD;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">ts</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#676E95;">// TypeScript enabled</span></span>\n<span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">ref</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> count </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">ref</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;">&lt;!-- type checking and auto-completion enabled --&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">{{</span><span style="color:#A6ACCD;"> count</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">toFixed</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">}}</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><h3 id="typescript-in-templates" tabindex="-1">TypeScript in Templates <a class="header-anchor" href="#typescript-in-templates" aria-hidden="true">#</a></h3><p>The <code>&lt;template&gt;</code> also supports TypeScript in binding expressions when <code>&lt;script lang=&quot;ts&quot;&gt;</code> or <code>&lt;script setup lang=&quot;ts&quot;&gt;</code> is used. This is useful in cases where you need to perform type casting in template expressions.</p><p>Here&#39;s a contrived example:</p><div class="language-vue"><button class="copy"></button><span class="lang">vue</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">setup</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">lang</span><span style="color:#A6ACCD;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">ts</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> x</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;">&lt;!-- error because x could be a string --&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">{{</span><span style="color:#A6ACCD;"> x</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">toFixed</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">}}</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p>This can be worked around with an inline type cast:</p><div class="language-vue"><button class="copy"></button><span class="lang">vue</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">setup</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">lang</span><span style="color:#A6ACCD;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">ts</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> x</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line highlighted"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">{{</span><span style="color:#A6ACCD;"> (x </span><span style="color:#89DDFF;">as</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">toFixed</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">}}</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>If using Vue CLI or a webpack-based setup, TypeScript in template expressions requires <code>vue-loader@^16.8.0</code>.</p></div><h2 id="api-specific-recipes" tabindex="-1">API-Specific Recipes <a class="header-anchor" href="#api-specific-recipes" aria-hidden="true">#</a></h2><ul><li><a href="./composition-api.html">TS with Composition API</a></li><li><a href="./options-api.html">TS with Options API</a></li></ul>',49);const d=s(c,[["render",function(s,l,p,t,r,c){const d=e("VueJobs");return n(),a("div",null,[i,o(d),y])}]]);export{r as __pageData,d as default};
