import{_ as s,C as n,o as a,c as l,j as p,d as o,e,a as t}from"./app.699c64d2.js";const r=JSON.parse('{"title":"Custom Renderer API","description":"","frontmatter":{},"headers":[{"level":1,"title":"Custom Renderer API","slug":"custom-renderer-api","link":"#custom-renderer-api","children":[{"level":2,"title":"createRenderer()","slug":"createrenderer","link":"#createrenderer","children":[]}]}],"relativePath":"api/custom-renderer.md"}'),c={name:"api/custom-renderer.md"},D=o("h1",{id:"custom-renderer-api",tabindex:"-1"},[e("Custom Renderer API "),o("a",{class:"header-anchor",href:"#custom-renderer-api","aria-hidden":"true"},"#")],-1),F=t('<h2 id="createrenderer" tabindex="-1">createRenderer() <a class="header-anchor" href="#createrenderer" aria-hidden="true">#</a></h2><p>Creates a custom renderer. By providing platform-specific node creation and manipulation APIs, you can leverage Vue&#39;s core runtime to target non-DOM environments.</p><ul><li><p><strong>Type</strong></p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">createRenderer</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">HostNode</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">HostElement</span><span style="color:#89DDFF;">&gt;(</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#A6ACCD;">options</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">RendererOptions</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">HostNode</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">HostElement</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Renderer</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">HostElement</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Renderer</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">HostElement</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">render</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">RootRenderFunction</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">HostElement</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">createApp</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">CreateAppFunction</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">HostElement</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">RendererOptions</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">HostNode</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">HostElement</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">patchProp</span><span style="color:#89DDFF;">(</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">el</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">HostElement</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">key</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">prevValue</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">any</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">nextValue</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">any</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// the rest is unused for most custom renderers</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">isSVG</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">boolean</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">prevChildren</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">VNode</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">HostNode</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">HostElement</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">[]</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">parentComponent</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentInternalInstance</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">null</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">parentSuspense</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">SuspenseBoundary</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">null</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">unmountChildren</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">UnmountChildrenFn</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">insert</span><span style="color:#89DDFF;">(</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">el</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">HostNode</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">parent</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">HostElement</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">anchor</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">HostNode</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">null</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">remove</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">el</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">HostNode</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">createElement</span><span style="color:#89DDFF;">(</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">type</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">isSVG</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">boolean</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">isCustomizedBuiltIn</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">vnodeProps</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> (</span><span style="color:#FFCB6B;">VNodeProps</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> [</span><span style="color:#A6ACCD;">key</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">any</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">null</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">HostElement</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">createText</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">text</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">HostNode</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">createComment</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">text</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">HostNode</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">setText</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">node</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">HostNode</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">text</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">setElementText</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">node</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">HostElement</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">text</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">parentNode</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">node</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">HostNode</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">HostElement</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">null</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">nextSibling</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">node</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">HostNode</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">HostNode</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">null</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// optional, DOM-specific</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">querySelector</span><span style="color:#89DDFF;">?(</span><span style="color:#A6ACCD;">selector</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">HostElement</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">null</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">setScopeId</span><span style="color:#89DDFF;">?(</span><span style="color:#A6ACCD;">el</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">HostElement</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">id</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">cloneNode</span><span style="color:#89DDFF;">?(</span><span style="color:#A6ACCD;">node</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">HostNode</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">HostNode</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">insertStaticContent</span><span style="color:#89DDFF;">?(</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">content</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">parent</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">HostElement</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">anchor</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">HostNode</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">null</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">isSVG</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">boolean</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> [</span><span style="color:#FFCB6B;">HostNode</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">HostNode</span><span style="color:#A6ACCD;">]</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>Example</strong></p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">createRenderer</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@vue/runtime-core</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> render</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> createApp </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">createRenderer</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  patchProp</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">  insert</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">  remove</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">  createElement</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// ...</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;">// `render` is the low-level API</span></span>\n<span class="line"><span style="color:#676E95;">// `createApp` returns an app instance</span></span>\n<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">render</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">createApp</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;">// re-export Vue core APIs</span></span>\n<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@vue/runtime-core</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span></code></pre></div><p>Vue&#39;s own <code>@vue/runtime-dom</code> is <a href="https://github.com/vuejs/core/blob/main/packages/runtime-dom/src/index.ts" target="_blank" rel="noreferrer">implemented using the same API</a>. For a simpler implementation, check out <a href="https://github.com/vuejs/core/blob/main/packages/runtime-test/src/index.ts" target="_blank" rel="noreferrer"><code>@vue/runtime-test</code></a> which is a private package for Vue&#39;s own unit testing.</p></li></ul>',3);const C=s(c,[["render",function(s,o,e,t,r,c){const C=n("VueJobs");return a(),l("div",null,[D,p(C),F])}]]);export{r as __pageData,C as default};
