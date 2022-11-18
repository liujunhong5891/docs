import{_ as s,C as n,o as e,c as a,j as o,d as l,e as p,a as t}from"./app.baae73e2.js";const r=JSON.parse('{"title":"Options: Lifecycle","description":"","frontmatter":{},"headers":[{"level":2,"title":"beforeCreate","slug":"beforecreate","link":"#beforecreate","children":[]},{"level":2,"title":"created","slug":"created","link":"#created","children":[]},{"level":2,"title":"beforeMount","slug":"beforemount","link":"#beforemount","children":[]},{"level":2,"title":"mounted","slug":"mounted","link":"#mounted","children":[]},{"level":2,"title":"beforeUpdate","slug":"beforeupdate","link":"#beforeupdate","children":[]},{"level":2,"title":"updated","slug":"updated","link":"#updated","children":[]},{"level":2,"title":"beforeUnmount","slug":"beforeunmount","link":"#beforeunmount","children":[]},{"level":2,"title":"unmounted","slug":"unmounted","link":"#unmounted","children":[]},{"level":2,"title":"errorCaptured","slug":"errorcaptured","link":"#errorcaptured","children":[]},{"level":2,"title":"renderTracked","slug":"rendertracked","link":"#rendertracked","children":[]},{"level":2,"title":"renderTriggered","slug":"rendertriggered","link":"#rendertriggered","children":[]},{"level":2,"title":"activated","slug":"activated","link":"#activated","children":[]},{"level":2,"title":"deactivated","slug":"deactivated","link":"#deactivated","children":[]},{"level":2,"title":"serverPrefetch","slug":"serverprefetch","link":"#serverprefetch","children":[]}],"relativePath":"api/options-lifecycle.md"}'),c={name:"api/options-lifecycle.md"},i=l("h1",{id:"options-lifecycle",tabindex:"-1"},[p("Options: Lifecycle "),l("a",{class:"header-anchor",href:"#options-lifecycle","aria-hidden":"true"},"#")],-1),d=t('<div class="info custom-block"><p class="custom-block-title">See also</p><p>For shared usage of lifecycle hooks, see <a href="/guide/essentials/lifecycle.html">Guide - Lifecycle Hooks</a></p></div><h2 id="beforecreate" tabindex="-1">beforeCreate <a class="header-anchor" href="#beforecreate" aria-hidden="true">#</a></h2><p>Called when the instance is initialized.</p><ul><li><p><strong>Type</strong></p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentOptions</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">beforeCreate</span><span style="color:#89DDFF;">?(</span><span style="color:#89DDFF;">this</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentPublicInstance</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>Details</strong></p><p>Called immediately when the instance is initialized, after props resolution, before processing other options such as <code>data()</code> or <code>computed</code>.</p><p>Note that the <code>setup()</code> hook of Composition API is called before any Options API hooks, even <code>beforeCreate()</code>.</p></li></ul><h2 id="created" tabindex="-1">created <a class="header-anchor" href="#created" aria-hidden="true">#</a></h2><p>Called after the instance has finished processing all state-related options.</p><ul><li><p><strong>Type</strong></p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentOptions</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">created</span><span style="color:#89DDFF;">?(</span><span style="color:#89DDFF;">this</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentPublicInstance</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>Details</strong></p><p>When this hooks is called, the following have been set up: reactive data, computed properties, methods, and watchers. However, the mounting phase has not been started, and the <code>$el</code> property will not be available yet.</p></li></ul><h2 id="beforemount" tabindex="-1">beforeMount <a class="header-anchor" href="#beforemount" aria-hidden="true">#</a></h2><p>Called right before the component is to be mounted.</p><ul><li><p><strong>Type</strong></p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentOptions</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">beforeMount</span><span style="color:#89DDFF;">?(</span><span style="color:#89DDFF;">this</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentPublicInstance</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>Details</strong></p><p>When this hook is called, the component has finished setting up its reactive state, but no DOM nodes have been created yet. It is about to execute its DOM render effect for the first time.</p><p><strong>This hook is not called during server-side rendering.</strong></p></li></ul><h2 id="mounted" tabindex="-1">mounted <a class="header-anchor" href="#mounted" aria-hidden="true">#</a></h2><p>Called after the component has been mounted.</p><ul><li><p><strong>Type</strong></p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentOptions</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">mounted</span><span style="color:#89DDFF;">?(</span><span style="color:#89DDFF;">this</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentPublicInstance</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>Details</strong></p><p>A component is considered mounted after:</p><ul><li><p>All of its synchronous child components have been mounted (does not include async components or components inside <code>&lt;Suspense&gt;</code> trees).</p></li><li><p>Its own DOM tree has been created and inserted into the parent container. Note it only guarantees that the component&#39;s DOM tree is in-document if the application&#39;s root container is also in-document.</p></li></ul><p>This hook is typically used for performing side effects that need access to the component&#39;s rendered DOM, or for limiting DOM-related code to the client in a <a href="/guide/scaling-up/ssr.html">server-rendered application</a>.</p><p><strong>This hook is not called during server-side rendering.</strong></p></li></ul><h2 id="beforeupdate" tabindex="-1">beforeUpdate <a class="header-anchor" href="#beforeupdate" aria-hidden="true">#</a></h2><p>Called right before the component is about to update its DOM tree due to a reactive state change.</p><ul><li><p><strong>Type</strong></p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentOptions</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">beforeUpdate</span><span style="color:#89DDFF;">?(</span><span style="color:#89DDFF;">this</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentPublicInstance</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>Details</strong></p><p>This hook can be used to access the DOM state before Vue updates the DOM. It is also safe to modify component state inside this hook.</p><p><strong>This hook is not called during server-side rendering.</strong></p></li></ul><h2 id="updated" tabindex="-1">updated <a class="header-anchor" href="#updated" aria-hidden="true">#</a></h2><p>Called after the component has updated its DOM tree due to a reactive state change.</p><ul><li><p><strong>Type</strong></p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentOptions</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">updated</span><span style="color:#89DDFF;">?(</span><span style="color:#89DDFF;">this</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentPublicInstance</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>Details</strong></p><p>A parent component&#39;s updated hook is called after that of its child components.</p><p>This hook is called after any DOM update of the component, which can be caused by different state changes. If you need to access the updated DOM after a specific state change, use <a href="/api/general.html#nexttick">nextTick()</a> instead.</p><p><strong>This hook is not called during server-side rendering.</strong></p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>Do not mutate component state in the updated hook - this will likely lead to an infinite update loop!</p></div></li></ul><h2 id="beforeunmount" tabindex="-1">beforeUnmount <a class="header-anchor" href="#beforeunmount" aria-hidden="true">#</a></h2><p>Called right before a component instance is to be unmounted.</p><ul><li><p><strong>Type</strong></p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentOptions</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">beforeUnmount</span><span style="color:#89DDFF;">?(</span><span style="color:#89DDFF;">this</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentPublicInstance</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>Details</strong></p><p>When this hook is called, the component instance is still fully functional.</p><p><strong>This hook is not called during server-side rendering.</strong></p></li></ul><h2 id="unmounted" tabindex="-1">unmounted <a class="header-anchor" href="#unmounted" aria-hidden="true">#</a></h2><p>Called after the component has been unmounted.</p><ul><li><p><strong>Type</strong></p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentOptions</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">unmounted</span><span style="color:#89DDFF;">?(</span><span style="color:#89DDFF;">this</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentPublicInstance</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>Details</strong></p><p>A component is considered unmounted after:</p><ul><li><p>All of its child components have been unmounted.</p></li><li><p>All of its associated reactive effects (render effect and computed / watchers created during <code>setup()</code>) have been stopped.</p></li></ul><p>Use this hook to clean up manually created side effects such as timers, DOM event listeners or server connections.</p><p><strong>This hook is not called during server-side rendering.</strong></p></li></ul><h2 id="errorcaptured" tabindex="-1">errorCaptured <a class="header-anchor" href="#errorcaptured" aria-hidden="true">#</a></h2><p>Called when an error propagating from a descendant component has been captured.</p><ul><li><p><strong>Type</strong></p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentOptions</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">errorCaptured</span><span style="color:#89DDFF;">?(</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">this</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentPublicInstance</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">err</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">unknown</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">instance</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentPublicInstance</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">null</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">info</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">boolean</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>Details</strong></p><p>Errors can be captured from the following sources:</p><ul><li>Component renders</li><li>Event handlers</li><li>Lifecycle hooks</li><li><code>setup()</code> function</li><li>Watchers</li><li>Custom directive hooks</li><li>Transition hooks</li></ul><p>The hook receives three arguments: the error, the component instance that triggered the error, and an information string specifying the error source type.</p><p>You can modify component state in <code>errorCaptured()</code> to display an error state to the user. However, it is important that the error state should not render the original content that caused the error; otherwise the component will be thrown into an infinite render loop.</p><p>The hook can return <code>false</code> to stop the error from propagating further. See error propagation details below.</p><p><strong>Error Propagation Rules</strong></p><ul><li><p>By default, all errors are still sent to the application-level <a href="/api/application.html#app-config-errorhandler"><code>app.config.errorHandler</code></a> if it is defined, so that these errors can still be reported to an analytics service in a single place.</p></li><li><p>If multiple <code>errorCaptured</code> hooks exist on a component&#39;s inheritance chain or parent chain, all of them will be invoked on the same error, in the order of bottom to top. This is similar to the bubbling mechanism of native DOM events.</p></li><li><p>If the <code>errorCaptured</code> hook itself throws an error, both this error and the original captured error are sent to <code>app.config.errorHandler</code>.</p></li><li><p>An <code>errorCaptured</code> hook can return <code>false</code> to prevent the error from propagating further. This is essentially saying &quot;this error has been handled and should be ignored.&quot; It will prevent any additional <code>errorCaptured</code> hooks or <code>app.config.errorHandler</code> from being invoked for this error.</p></li></ul></li></ul><h2 id="rendertracked" tabindex="-1">renderTracked <sup class="vt-badge dev-only"></sup> <a class="header-anchor" href="#rendertracked" aria-hidden="true">#</a></h2><p>Called when a reactive dependency has been tracked by the component&#39;s render effect.</p><p><strong>This hook is development-mode-only and not called during server-side rendering.</strong></p><ul><li><p><strong>Type</strong></p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentOptions</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">renderTracked</span><span style="color:#89DDFF;">?(</span><span style="color:#89DDFF;">this</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentPublicInstance</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">e</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">DebuggerEvent</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#C792EA;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">DebuggerEvent</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">effect</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ReactiveEffect</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">target</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">object</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">type</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">TrackOpTypes</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">/* &#39;get&#39; | &#39;has&#39; | &#39;iterate&#39; */</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">key</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">any</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>See also:</strong> <a href="/guide/extras/reactivity-in-depth.html">Reactivity in Depth</a></p></li></ul><h2 id="rendertriggered" tabindex="-1">renderTriggered <sup class="vt-badge dev-only"></sup> <a class="header-anchor" href="#rendertriggered" aria-hidden="true">#</a></h2><p>Called when a reactive dependency triggers the component&#39;s render effect to be re-run.</p><p><strong>This hook is development-mode-only and not called during server-side rendering.</strong></p><ul><li><p><strong>Type</strong></p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentOptions</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">renderTriggered</span><span style="color:#89DDFF;">?(</span><span style="color:#89DDFF;">this</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentPublicInstance</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">e</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">DebuggerEvent</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#C792EA;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">DebuggerEvent</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">effect</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ReactiveEffect</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">target</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">object</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">type</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">TriggerOpTypes</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">/* &#39;set&#39; | &#39;add&#39; | &#39;delete&#39; | &#39;clear&#39; */</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">key</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">any</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">newValue</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">any</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">oldValue</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">any</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">oldTarget</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Map</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">any</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">any</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Set</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">any</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>See also:</strong> <a href="/guide/extras/reactivity-in-depth.html">Reactivity in Depth</a></p></li></ul><h2 id="activated" tabindex="-1">activated <a class="header-anchor" href="#activated" aria-hidden="true">#</a></h2><p>Called after the component instance is inserted into the DOM as part of a tree cached by <a href="/api/built-in-components.html#keepalive"><code>&lt;KeepAlive&gt;</code></a>.</p><p><strong>This hook is not called during server-side rendering.</strong></p><ul><li><p><strong>Type</strong></p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentOptions</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">activated</span><span style="color:#89DDFF;">?(</span><span style="color:#89DDFF;">this</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentPublicInstance</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>See also:</strong> <a href="/guide/built-ins/keep-alive.html#lifecycle-of-cached-instance">Guide - Lifecycle of Cached Instance</a></p></li></ul><h2 id="deactivated" tabindex="-1">deactivated <a class="header-anchor" href="#deactivated" aria-hidden="true">#</a></h2><p>Called after the component instance is removed from the DOM as part of a tree cached by <a href="/api/built-in-components.html#keepalive"><code>&lt;KeepAlive&gt;</code></a>.</p><p><strong>This hook is not called during server-side rendering.</strong></p><ul><li><p><strong>Type</strong></p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentOptions</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">deactivated</span><span style="color:#89DDFF;">?(</span><span style="color:#89DDFF;">this</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentPublicInstance</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>See also:</strong> <a href="/guide/built-ins/keep-alive.html#lifecycle-of-cached-instance">Guide - Lifecycle of Cached Instance</a></p></li></ul><h2 id="serverprefetch" tabindex="-1">serverPrefetch <sup class="vt-badge" data-text="SSR only"></sup> <a class="header-anchor" href="#serverprefetch" aria-hidden="true">#</a></h2><p>Async function to be resolved before the component instance is to be rendered on the server.</p><ul><li><p><strong>Type</strong></p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentOptions</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">serverPrefetch</span><span style="color:#89DDFF;">?(</span><span style="color:#89DDFF;">this</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentPublicInstance</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Promise</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">any</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>Details</strong></p><p>If the hook returns a Promise, the server renderer will wait until the Promise is resolved before rendering the component.</p><p>This hook is only called during server-side rendering can be used to perform server-only data fetching.</p></li><li><p><strong>Example</strong></p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">data</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">      data</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">null</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">async</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">serverPrefetch</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// component is rendered as part of the initial request</span></span>\n<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// pre-fetch data on server as it is faster than on the client</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">data</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">await</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">fetchOnServer</span><span style="color:#F07178;">(</span><span style="color:#676E95;">/* ... */</span><span style="color:#F07178;">)</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">async</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">mounted</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">!this.</span><span style="color:#A6ACCD;">data</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;">// if data is null on mount, it means the component</span></span>\n<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;">// is dynamically rendered on the client. Perform a</span></span>\n<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;">// client-side fetch instead.</span></span>\n<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">data</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">await</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">fetchOnClient</span><span style="color:#F07178;">(</span><span style="color:#676E95;">/* ... */</span><span style="color:#F07178;">)</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>See also:</strong> <a href="/guide/scaling-up/ssr.html">Server-Side Rendering</a></p></li></ul>',47);const y=s(c,[["render",function(s,l,p,t,r,c){const y=n("VueJobs");return e(),a("div",null,[i,o(y),d])}]]);export{r as __pageData,y as default};
