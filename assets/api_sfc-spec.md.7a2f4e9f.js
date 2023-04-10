import{_ as s,C as e,o as a,c as l,j as n,d as o,e as t,a as p}from"./app.01220c78.js";const c=JSON.parse('{"title":"SFC Syntax Specification","description":"","frontmatter":{},"headers":[{"level":2,"title":"Overview","slug":"overview","link":"#overview","children":[]},{"level":2,"title":"Language Blocks","slug":"language-blocks","link":"#language-blocks","children":[{"level":3,"title":"<template>","slug":"template","link":"#template","children":[]},{"level":3,"title":"<script>","slug":"script","link":"#script","children":[]},{"level":3,"title":"<script setup>","slug":"script-setup","link":"#script-setup","children":[]},{"level":3,"title":"<style>","slug":"style","link":"#style","children":[]},{"level":3,"title":"Custom Blocks","slug":"custom-blocks","link":"#custom-blocks","children":[]}]},{"level":2,"title":"Automatic Name Inference","slug":"automatic-name-inference","link":"#automatic-name-inference","children":[]},{"level":2,"title":"Pre-Processors","slug":"pre-processors","link":"#pre-processors","children":[]},{"level":2,"title":"Src Imports","slug":"src-imports","link":"#src-imports","children":[]},{"level":2,"title":"Comments","slug":"comments","link":"#comments","children":[]}],"relativePath":"api/sfc-spec.md"}'),r={name:"api/sfc-spec.md"},i=o("h1",{id:"sfc-syntax-specification",tabindex:"-1"},[t("SFC Syntax Specification "),o("a",{class:"header-anchor",href:"#sfc-syntax-specification","aria-hidden":"true"},"#")],-1),d=p('<h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-hidden="true">#</a></h2><p>A Vue Single-File Component (SFC), conventionally using the <code>*.vue</code> file extension, is a custom file format that uses an HTML-like syntax to describe a Vue component. A Vue SFC is syntactically compatible with HTML.</p><p>Each <code>*.vue</code> file consists of three types of top-level language blocks: <code>&lt;template&gt;</code>, <code>&lt;script&gt;</code>, and <code>&lt;style&gt;</code>, and optionally additional custom blocks:</p><div class="language-vue"><button class="copy"></button><span class="lang">vue</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">example</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;{{</span><span style="color:#A6ACCD;"> msg </span><span style="color:#89DDFF;">}}&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">data</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">      msg</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Hello world!</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">example</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">color</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> red</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">&lt;custom1&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  This could be e.g. documentation for the component.</span></span>\n<span class="line"><span style="color:#A6ACCD;">&lt;/custom1&gt;</span></span>\n<span class="line"></span></code></pre></div><h2 id="language-blocks" tabindex="-1">Language Blocks <a class="header-anchor" href="#language-blocks" aria-hidden="true">#</a></h2><h3 id="template" tabindex="-1"><code>&lt;template&gt;</code> <a class="header-anchor" href="#template" aria-hidden="true">#</a></h3><ul><li><p>Each <code>*.vue</code> file can contain at most one top-level <code>&lt;template&gt;</code> block at a time.</p></li><li><p>Contents will be extracted and passed on to <code>@vue/compiler-dom</code>, pre-compiled into JavaScript render functions, and attached to the exported component as its <code>render</code> option.</p></li></ul><h3 id="script" tabindex="-1"><code>&lt;script&gt;</code> <a class="header-anchor" href="#script" aria-hidden="true">#</a></h3><ul><li><p>Each <code>*.vue</code> file can contain at most one <code>&lt;script&gt;</code> block at a time (excluding <a href="/docs/api/sfc-script-setup.html"><code>&lt;script setup&gt;</code></a>).</p></li><li><p>The script is executed as an ES Module.</p></li><li><p>The <strong>default export</strong> should be a Vue component options object, either as a plain object or as the return value of <a href="/docs/api/general.html#definecomponent">defineComponent</a>.</p></li></ul><h3 id="script-setup" tabindex="-1"><code>&lt;script setup&gt;</code> <a class="header-anchor" href="#script-setup" aria-hidden="true">#</a></h3><ul><li><p>Each <code>*.vue</code> file can contain at most one <code>&lt;script setup&gt;</code> block at a time (excluding normal <code>&lt;script&gt;</code>).</p></li><li><p>The script is pre-processed and used as the component&#39;s <code>setup()</code> function, which means it will be executed <strong>for each instance of the component</strong>. Top-level bindings in <code>&lt;script setup&gt;</code> are automatically exposed to the template. For more details, see <a href="/docs/api/sfc-script-setup.html">dedicated documentation on <code>&lt;script setup&gt;</code></a>.</p></li></ul><h3 id="style" tabindex="-1"><code>&lt;style&gt;</code> <a class="header-anchor" href="#style" aria-hidden="true">#</a></h3><ul><li><p>A single <code>*.vue</code> file can contain multiple <code>&lt;style&gt;</code> tags.</p></li><li><p>A <code>&lt;style&gt;</code> tag can have <code>scoped</code> or <code>module</code> attributes (see <a href="/docs/api/sfc-css-features.html">SFC Style Features</a> for more details) to help encapsulate the styles to the current component. Multiple <code>&lt;style&gt;</code> tags with different encapsulation modes can be mixed in the same component.</p></li></ul><h3 id="custom-blocks" tabindex="-1">Custom Blocks <a class="header-anchor" href="#custom-blocks" aria-hidden="true">#</a></h3><p>Additional custom blocks can be included in a <code>*.vue</code> file for any project-specific needs, for example a <code>&lt;docs&gt;</code> block. Some real-world examples of custom blocks include:</p><ul><li><a href="https://gridsome.org/docs/querying-data/" target="_blank" rel="noreferrer">Gridsome: <code>&lt;page-query&gt;</code></a></li><li><a href="https://github.com/wheatjs/vite-plugin-vue-gql" target="_blank" rel="noreferrer">vite-plugin-vue-gql: <code>&lt;gql&gt;</code></a></li><li><a href="https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n#i18n-custom-block" target="_blank" rel="noreferrer">vue-i18n: <code>&lt;i18n&gt;</code></a></li></ul><p>Handling of Custom Blocks will depend on tooling - if you want to build your own custom block integrations, see <a href="/docs/guide/scaling-up/tooling.html#sfc-custom-block-integrations">relevant tooling section</a> for more details.</p><h2 id="automatic-name-inference" tabindex="-1">Automatic Name Inference <a class="header-anchor" href="#automatic-name-inference" aria-hidden="true">#</a></h2><p>An SFC automatically infers the component&#39;s name from its <strong>filename</strong> in the following cases:</p><ul><li>Dev warning formatting</li><li>DevTools inspection</li><li>Recursive self-reference. E.g. a file named <code>FooBar.vue</code> can refer to itself as <code>&lt;FooBar/&gt;</code> in its template. This has lower priority than explicitly registered/imported components.</li></ul><h2 id="pre-processors" tabindex="-1">Pre-Processors <a class="header-anchor" href="#pre-processors" aria-hidden="true">#</a></h2><p>Blocks can declare pre-processor languages using the <code>lang</code> attribute. The most common case is using TypeScript for the <code>&lt;script&gt;</code> block:</p><div class="language-vue-html"><button class="copy"></button><span class="lang">template</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">lang</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">ts</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  // use TypeScript</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p><code>lang</code> can be applied to any block - for example we can use <code>&lt;style&gt;</code> with <a href="https://sass-lang.com/" target="_blank" rel="noreferrer">SASS</a> and <code>&lt;template&gt;</code> with <a href="https://pugjs.org/api/getting-started.html" target="_blank" rel="noreferrer">Pug</a>:</p><div class="language-vue-html"><button class="copy"></button><span class="lang">template</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">lang</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">pug</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">p </span><span style="color:#89DDFF;">{{</span><span style="color:#A6ACCD;"> msg </span><span style="color:#89DDFF;">}}</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">lang</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">scss</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  $primary-color: #333;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  body {</span></span>\n<span class="line"><span style="color:#A6ACCD;">    color: $primary-color;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  }</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p>Note that integration with various pre-processors may differ by toolchain. Check out the respective documentation for examples:</p><ul><li><a href="https://vitejs.dev/guide/features.html#css-pre-processors" target="_blank" rel="noreferrer">Vite</a></li><li><a href="https://cli.vuejs.org/guide/css.html#pre-processors" target="_blank" rel="noreferrer">Vue CLI</a></li><li><a href="https://vue-loader.vuejs.org/guide/pre-processors.html#using-pre-processors" target="_blank" rel="noreferrer">webpack + vue-loader</a></li></ul><h2 id="src-imports" tabindex="-1">Src Imports <a class="header-anchor" href="#src-imports" aria-hidden="true">#</a></h2><p>If you prefer splitting up your <code>*.vue</code> components into multiple files, you can use the <code>src</code> attribute to import an external file for a language block:</p><div class="language-vue"><button class="copy"></button><span class="lang">vue</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">src</span><span style="color:#A6ACCD;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./template.html</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">style</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">src</span><span style="color:#A6ACCD;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./style.css</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">src</span><span style="color:#A6ACCD;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./script.js</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p>Beware that <code>src</code> imports follow the same path resolution rules as webpack module requests, which means:</p><ul><li>Relative paths need to start with <code>./</code></li><li>You can import resources from npm dependencies:</li></ul><div class="language-vue"><button class="copy"></button><span class="lang">vue</span><pre><code><span class="line"><span style="color:#676E95;">&lt;!-- import a file from the installed &quot;todomvc-app-css&quot; npm package --&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">style</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">src</span><span style="color:#A6ACCD;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">todomvc-app-css/index.css</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> /</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p><code>src</code> imports also work with custom blocks, e.g.:</p><div class="language-vue"><button class="copy"></button><span class="lang">vue</span><pre><code><span class="line"><span style="color:#A6ACCD;">&lt;unit-test src=&quot;./unit-test.js&quot;&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">&lt;/unit-test&gt;</span></span>\n<span class="line"></span></code></pre></div><h2 id="comments" tabindex="-1">Comments <a class="header-anchor" href="#comments" aria-hidden="true">#</a></h2><p>Inside each block you shall use the comment syntax of the language being used (HTML, CSS, JavaScript, Pug, etc.). For top-level comments, use HTML comment syntax: <code>&lt;!-- comment contents here --&gt;</code></p>',37);const u=s(r,[["render",function(s,o,t,p,c,r){const u=e("VueJobs");return a(),l("div",null,[i,n(u),d])}]]);export{c as __pageData,u as default};
