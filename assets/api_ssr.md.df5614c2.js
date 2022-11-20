import{_ as s,C as n,o as a,c as l,j as p,d as e,e as o,a as r}from"./app.699c64d2.js";const t=JSON.parse('{"title":"Server-Side Rendering API","description":"","frontmatter":{},"headers":[{"level":2,"title":"renderToString()","slug":"rendertostring","link":"#rendertostring","children":[{"level":3,"title":"SSR Context","slug":"ssr-context","link":"#ssr-context","children":[]}]},{"level":2,"title":"renderToNodeStream()","slug":"rendertonodestream","link":"#rendertonodestream","children":[]},{"level":2,"title":"pipeToNodeWritable()","slug":"pipetonodewritable","link":"#pipetonodewritable","children":[]},{"level":2,"title":"renderToWebStream()","slug":"rendertowebstream","link":"#rendertowebstream","children":[]},{"level":2,"title":"pipeToWebWritable()","slug":"pipetowebwritable","link":"#pipetowebwritable","children":[]},{"level":2,"title":"renderToSimpleStream()","slug":"rendertosimplestream","link":"#rendertosimplestream","children":[]},{"level":2,"title":"useSSRContext()","slug":"usessrcontext","link":"#usessrcontext","children":[]}],"relativePath":"api/ssr.md"}'),c={name:"api/ssr.md"},i=e("h1",{id:"server-side-rendering-api",tabindex:"-1"},[o("Server-Side Rendering API "),e("a",{class:"header-anchor",href:"#server-side-rendering-api","aria-hidden":"true"},"#")],-1),y=r('<h2 id="rendertostring" tabindex="-1">renderToString() <a class="header-anchor" href="#rendertostring" aria-hidden="true">#</a></h2><ul><li><p><strong>Exported from <code>vue/server-renderer</code></strong></p></li><li><p><strong>Type</strong></p><div class="language-ts line-numbers-mode"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">renderToString</span><span style="color:#89DDFF;">(</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#A6ACCD;">input</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">App</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">VNode</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#A6ACCD;">context</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">SSRContext</span></span>\n<span class="line"><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Promise</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div></li><li><p><strong>Example</strong></p><div class="language-js line-numbers-mode"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">createSSRApp</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">renderToString</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue/server-renderer</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> app </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">createSSRApp</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">data</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> (</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">msg</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">hello</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">`</span><span style="color:#C3E88D;">&lt;div&gt;{{ msg }}&lt;/div&gt;</span><span style="color:#89DDFF;">`</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">(</span><span style="color:#C792EA;">async</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">html</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">await</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">renderToString</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">app</span><span style="color:#F07178;">)</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">html</span><span style="color:#F07178;">)</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)()</span></span>\n<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h3 id="ssr-context" tabindex="-1">SSR Context <a class="header-anchor" href="#ssr-context" aria-hidden="true">#</a></h3><p>You can pass an optional context object, which can be used to record additional data during the render, for example <a href="/docs/guide/scaling-up/ssr.html#teleports">accessing content of Teleports</a>:</p><div class="language-js line-numbers-mode"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> ctx </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>\n<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> html </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">await</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">renderToString</span><span style="color:#A6ACCD;">(app</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> ctx)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(ctx</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">teleports) </span><span style="color:#676E95;">// { &#39;#teleported&#39;: &#39;teleported content&#39; }</span></span>\n<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>Most other SSR APIs on this page also optionally accept a context object. The context object can be accessed in component code via the <a href="#usessrcontext">useSSRContext</a> helper.</p></li><li><p><strong>See also:</strong> <a href="/docs/guide/scaling-up/ssr.html">Guide - Server-Side Rendering</a></p></li></ul><h2 id="rendertonodestream" tabindex="-1">renderToNodeStream() <a class="header-anchor" href="#rendertonodestream" aria-hidden="true">#</a></h2><p>Renders input as a <a href="https://nodejs.org/api/stream.html#stream_class_stream_readable" target="_blank" rel="noreferrer">Node.js Readable stream</a>.</p><ul><li><p><strong>Exported from <code>vue/server-renderer</code></strong></p></li><li><p><strong>Type</strong></p><div class="language-ts line-numbers-mode"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">renderToNodeStream</span><span style="color:#89DDFF;">(</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#A6ACCD;">input</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">App</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">VNode</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#A6ACCD;">context</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">SSRContext</span></span>\n<span class="line"><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Readable</span></span>\n<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div></li><li><p><strong>Example</strong></p><div class="language-js line-numbers-mode"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#676E95;">// inside a Node.js http handler</span></span>\n<span class="line"><span style="color:#82AAFF;">renderToNodeStream</span><span style="color:#A6ACCD;">(app)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">pipe</span><span style="color:#A6ACCD;">(res)</span></span>\n<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="tip custom-block"><p class="custom-block-title">Note</p><p>This method is not supported in the ESM build of <code>vue/server-renderer</code>, which is decoupled from Node.js environments. Use <a href="#pipetonodewritable"><code>pipeToNodeWritable</code></a> instead.</p></div></li></ul><h2 id="pipetonodewritable" tabindex="-1">pipeToNodeWritable() <a class="header-anchor" href="#pipetonodewritable" aria-hidden="true">#</a></h2><p>Render and pipe to an existing <a href="https://nodejs.org/api/stream.html#stream_writable_streams" target="_blank" rel="noreferrer">Node.js Writable stream</a> instance.</p><ul><li><p><strong>Exported from <code>vue/server-renderer</code></strong></p></li><li><p><strong>Type</strong></p><div class="language-ts line-numbers-mode"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">pipeToNodeWritable</span><span style="color:#89DDFF;">(</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#A6ACCD;">input</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">App</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">VNode</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#A6ACCD;">context</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">SSRContext</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{},</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#A6ACCD;">writable</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Writable</span></span>\n<span class="line"><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div></li><li><p><strong>Example</strong></p><div class="language-js line-numbers-mode"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#676E95;">// inside a Node.js http handler</span></span>\n<span class="line"><span style="color:#82AAFF;">pipeToNodeWritable</span><span style="color:#A6ACCD;">(app</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{},</span><span style="color:#A6ACCD;"> res)</span></span>\n<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li></ul><h2 id="rendertowebstream" tabindex="-1">renderToWebStream() <a class="header-anchor" href="#rendertowebstream" aria-hidden="true">#</a></h2><p>Renders input as a <a href="https://developer.mozilla.org/en-US/docs/Web/API/Streams_API" target="_blank" rel="noreferrer">Web ReadableStream</a>.</p><ul><li><p><strong>Exported from <code>vue/server-renderer</code></strong></p></li><li><p><strong>Type</strong></p><div class="language-ts line-numbers-mode"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">renderToWebStream</span><span style="color:#89DDFF;">(</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#A6ACCD;">input</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">App</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">VNode</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#A6ACCD;">context</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">SSRContext</span></span>\n<span class="line"><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ReadableStream</span></span>\n<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div></li><li><p><strong>Example</strong></p><div class="language-js line-numbers-mode"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#676E95;">// inside an environment with ReadableStream support</span></span>\n<span class="line"><span style="color:#89DDFF;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Response</span><span style="color:#A6ACCD;">(</span><span style="color:#82AAFF;">renderToWebStream</span><span style="color:#A6ACCD;">(app))</span></span>\n<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="tip custom-block"><p class="custom-block-title">Note</p><p>In environments that do not expose <code>ReadableStream</code> constructor in the global scope, <a href="#pipetowebwritable"><code>pipeToWebWritable()</code></a> should be used instead.</p></div></li></ul><h2 id="pipetowebwritable" tabindex="-1">pipeToWebWritable() <a class="header-anchor" href="#pipetowebwritable" aria-hidden="true">#</a></h2><p>Render and pipe to an existing <a href="https://developer.mozilla.org/en-US/docs/Web/API/WritableStream" target="_blank" rel="noreferrer">Web WritableStream</a> instance.</p><ul><li><p><strong>Exported from <code>vue/server-renderer</code></strong></p></li><li><p><strong>Type</strong></p><div class="language-ts line-numbers-mode"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">pipeToWebWritable</span><span style="color:#89DDFF;">(</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#A6ACCD;">input</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">App</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">VNode</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#A6ACCD;">context</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">SSRContext</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{},</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#A6ACCD;">writable</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">WritableStream</span></span>\n<span class="line"><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div></li><li><p><strong>Example</strong></p><p>This is typically used in combination with <a href="https://developer.mozilla.org/en-US/docs/Web/API/TransformStream" target="_blank" rel="noreferrer"><code>TransformStream</code></a>:</p><div class="language-js line-numbers-mode"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#676E95;">// TransformStream is available in environments such as CloudFlare workers.</span></span>\n<span class="line"><span style="color:#676E95;">// in Node.js, TransformStream needs to be explicitly imported from &#39;stream/web&#39;</span></span>\n<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> readable</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> writable </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">TransformStream</span><span style="color:#A6ACCD;">()</span></span>\n<span class="line"><span style="color:#82AAFF;">pipeToWebWritable</span><span style="color:#A6ACCD;">(app</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{},</span><span style="color:#A6ACCD;"> writable)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Response</span><span style="color:#A6ACCD;">(readable)</span></span>\n<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div></li></ul><h2 id="rendertosimplestream" tabindex="-1">renderToSimpleStream() <a class="header-anchor" href="#rendertosimplestream" aria-hidden="true">#</a></h2><p>Renders input in streaming mode using a simple readable interface.</p><ul><li><p><strong>Exported from <code>vue/server-renderer</code></strong></p></li><li><p><strong>Type</strong></p><div class="language-ts line-numbers-mode"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">renderToSimpleStream</span><span style="color:#89DDFF;">(</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#A6ACCD;">input</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">App</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">VNode</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#A6ACCD;">context</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">SSRContext</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#A6ACCD;">options</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">SimpleReadable</span></span>\n<span class="line"><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">SimpleReadable</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">SimpleReadable</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">push</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">content</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">null</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">destroy</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">err</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">any</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div></li><li><p><strong>Example</strong></p><div class="language-js line-numbers-mode"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> res </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#82AAFF;">renderToSimpleStream</span><span style="color:#A6ACCD;">(</span></span>\n<span class="line"><span style="color:#A6ACCD;">  app</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">{},</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">push</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">chunk</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">chunk</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">null</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;">// done</span></span>\n<span class="line"><span style="color:#F07178;">        </span><span style="color:#82AAFF;">console</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">`</span><span style="color:#C3E88D;">render complete: </span><span style="color:#89DDFF;">${</span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">}`</span><span style="color:#F07178;">)</span></span>\n<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">else</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">res</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">chunk</span></span>\n<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">},</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">destroy</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">err</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;">// error encountered</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#A6ACCD;">)</span></span>\n<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div></li></ul><h2 id="usessrcontext" tabindex="-1">useSSRContext() <a class="header-anchor" href="#usessrcontext" aria-hidden="true">#</a></h2><p>A runtime API used to retrieve the context object passed to <code>renderToString()</code> or other server render APIs.</p><ul><li><p><strong>Type</strong></p><div class="language-ts line-numbers-mode"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">useSSRContext</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">T</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Record</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">any</span><span style="color:#89DDFF;">&gt;&gt;():</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">T</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">undefined</span></span>\n<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div></li><li><p><strong>Example</strong></p><p>The retrieved context can be used to attach information that is needed for rendering the final HTML (e.g. head metadata).</p><div class="language-vue line-numbers-mode"><button class="copy"></button><span class="lang">vue</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">setup</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">useSSRContext</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;">// make sure to only call it during SSR</span></span>\n<span class="line"><span style="color:#676E95;">// https://vitejs.dev/guide/ssr.html#conditional-logic</span></span>\n<span class="line"><span style="color:#89DDFF;">if</span><span style="color:#A6ACCD;"> (</span><span style="color:#89DDFF;">import</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">meta</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">env</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">SSR) </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">ctx</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">useSSRContext</span><span style="color:#F07178;">()</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// ...attach properties to the context</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div></li></ul>',20);const D=s(c,[["render",function(s,e,o,r,t,c){const D=n("VueJobs");return a(),l("div",null,[i,p(D),y])}]]);export{t as __pageData,D as default};
