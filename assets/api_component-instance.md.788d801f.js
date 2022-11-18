import{_ as s,C as n,o as a,c as l,j as o,d as e,e as p,a as t}from"./app.b7ef66d9.js";const c=JSON.parse('{"title":"Component Instance","description":"","frontmatter":{},"headers":[{"level":2,"title":"$data","slug":"data","link":"#data","children":[]},{"level":2,"title":"$props","slug":"props","link":"#props","children":[]},{"level":2,"title":"$el","slug":"el","link":"#el","children":[]},{"level":2,"title":"$options","slug":"options","link":"#options","children":[]},{"level":2,"title":"$parent","slug":"parent","link":"#parent","children":[]},{"level":2,"title":"$root","slug":"root","link":"#root","children":[]},{"level":2,"title":"$slots","slug":"slots","link":"#slots","children":[]},{"level":2,"title":"$refs","slug":"refs","link":"#refs","children":[]},{"level":2,"title":"$attrs","slug":"attrs","link":"#attrs","children":[]},{"level":2,"title":"$watch()","slug":"watch","link":"#watch","children":[]},{"level":2,"title":"$emit()","slug":"emit","link":"#emit","children":[]},{"level":2,"title":"$forceUpdate()","slug":"forceupdate","link":"#forceupdate","children":[]},{"level":2,"title":"$nextTick()","slug":"nexttick","link":"#nexttick","children":[]}],"relativePath":"api/component-instance.md"}'),r={name:"api/component-instance.md"},i=e("h1",{id:"component-instance",tabindex:"-1"},[p("Component Instance "),e("a",{class:"header-anchor",href:"#component-instance","aria-hidden":"true"},"#")],-1),y=t('<div class="info custom-block"><p class="custom-block-title">INFO</p><p>This page documents the built-in properties and methods exposed on the component public instance, i.e. <code>this</code>.</p><p>All properties listed on this page are readonly (except nested properties in <code>$data</code>).</p></div><h2 id="data" tabindex="-1">$data <a class="header-anchor" href="#data" aria-hidden="true">#</a></h2><p>The object returned from the <a href="./options-state.html#data"><code>data</code></a> option, made reactive by the component. The component instance proxies access to the properties on its data object.</p><ul><li><p><strong>Type</strong></p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentPublicInstance</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">$data</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">object</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div></li></ul><h2 id="props" tabindex="-1">$props <a class="header-anchor" href="#props" aria-hidden="true">#</a></h2><p>An object representing the component&#39;s current, resolved props.</p><ul><li><p><strong>Type</strong></p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentPublicInstance</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">$props</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">object</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>Details</strong></p><p>Only props declared via the <a href="./options-state.html#props"><code>props</code></a> option will be included. The component instance proxies access to the properties on its props object.</p></li></ul><h2 id="el" tabindex="-1">$el <a class="header-anchor" href="#el" aria-hidden="true">#</a></h2><p>The root DOM node that the component instance is managing.</p><ul><li><p><strong>Type</strong></p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentPublicInstance</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">$el</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Node</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">undefined</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>Details</strong></p><p><code>$el</code> will be <code>undefined</code> until the component is <a href="./options-lifecycle.html#mounted">mounted</a>.</p><ul><li>For components with a single root element, <code>$el</code> will point to that element.</li><li>For components with text root, <code>$el</code> will point to the text node.</li><li>For components with multiple root nodes, <code>$el</code> will be the placeholder DOM node that Vue uses to keep track of the component&#39;s position in the DOM (a text node, or a comment node in SSR hydration mode).</li></ul><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>For consistency, it is recommended to use <a href="/docs/guide/essentials/template-refs.html">template refs</a> for direct access to elements instead of relying on <code>$el</code>.</p></div></li></ul><h2 id="options" tabindex="-1">$options <a class="header-anchor" href="#options" aria-hidden="true">#</a></h2><p>The resolved component options used for instantiating the current component instance.</p><ul><li><p><strong>Type</strong></p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentPublicInstance</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">$options</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentOptions</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>Details</strong></p><p>The <code>$options</code> object exposes the resolved options for the current component and is the merge result of these possible sources:</p><ul><li>Global mixins</li><li>Component <code>extends</code> base</li><li>Component mixins</li></ul><p>It is typically used to support custom component options:</p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> app </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">createApp</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">customOption</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">foo</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">created</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">$options</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">customOption</span><span style="color:#F07178;">) </span><span style="color:#676E95;">// =&gt; &#39;foo&#39;</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>See also:</strong> <a href="/docs/api/application.html#app-config-optionmergestrategies"><code>app.config.optionMergeStrategies</code></a></p></li></ul><h2 id="parent" tabindex="-1">$parent <a class="header-anchor" href="#parent" aria-hidden="true">#</a></h2><p>The parent instance, if the current instance has one. It will be <code>null</code> for the root instance itself.</p><ul><li><p><strong>Type</strong></p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentPublicInstance</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">$parent</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentPublicInstance</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">null</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div></li></ul><h2 id="root" tabindex="-1">$root <a class="header-anchor" href="#root" aria-hidden="true">#</a></h2><p>The root component instance of the current component tree. If the current instance has no parents this value will be itself.</p><ul><li><p><strong>Type</strong></p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentPublicInstance</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">$root</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentPublicInstance</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div></li></ul><h2 id="slots" tabindex="-1">$slots <a class="header-anchor" href="#slots" aria-hidden="true">#</a></h2><p>An object representing the <a href="/docs/guide/components/slots.html">slots</a> passed by the parent component.</p><ul><li><p><strong>Type</strong></p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentPublicInstance</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">$slots</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> [</span><span style="color:#A6ACCD;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Slot</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#C792EA;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Slot</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(...</span><span style="color:#A6ACCD;">args</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">any</span><span style="color:#A6ACCD;">[]</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">VNode</span><span style="color:#A6ACCD;">[]</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>Details</strong></p><p>Typically used when manually authoring <a href="/docs/guide/extras/render-function.html">render functions</a>, but can also be used to detect whether a slot is present.</p><p>Each slot is exposed on <code>this.$slots</code> as a function that returns an array of vnodes under the key corresponding to that slot&#39;s name. The default slot is exposed as <code>this.$slots.default</code>.</p><p>If a slot is a <a href="/docs/guide/components/slots.html#scoped-slots">scoped slot</a>, arguments passed to the slot functions are available to the slot as its slot props.</p></li><li><p><strong>See also:</strong> <a href="/docs/guide/extras/render-function.html#rendering-slots">Render Functions - Rendering Slots</a></p></li></ul><h2 id="refs" tabindex="-1">$refs <a class="header-anchor" href="#refs" aria-hidden="true">#</a></h2><p>An object of DOM elements and component instances, registered via <a href="/docs/guide/essentials/template-refs.html">template refs</a>.</p><ul><li><p><strong>Type</strong></p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentPublicInstance</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">$refs</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> [</span><span style="color:#A6ACCD;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Element</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentPublicInstance</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">null</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>See also:</strong></p><ul><li><a href="/docs/guide/essentials/template-refs.html">Template refs</a></li><li><a href="./built-in-special-attributes.html#ref">Special Attributes - ref</a></li></ul></li></ul><h2 id="attrs" tabindex="-1">$attrs <a class="header-anchor" href="#attrs" aria-hidden="true">#</a></h2><p>An object that contains the component&#39;s fallthrough attributes.</p><ul><li><p><strong>Type</strong></p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentPublicInstance</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">$attrs</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">object</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>Details</strong></p><p><a href="/docs/guide/components/attrs.html">Fallthrough Attributes</a> are attributes and event handlers passed by the parent component, but not declared as a prop or an emitted event by the child.</p><p>By default, everything in <code>$attrs</code> will be automatically inherited on the component&#39;s root element if there is only a single root element. This behavior is disabled if the component has multiple root nodes, and can be explicitly disabled with the <a href="./options-misc.html#inheritattrs"><code>inheritAttrs</code></a> option.</p></li><li><p><strong>See also:</strong></p><ul><li><a href="/docs/guide/components/attrs.html">Fallthrough Attributes</a></li></ul></li></ul><h2 id="watch" tabindex="-1">$watch() <a class="header-anchor" href="#watch" aria-hidden="true">#</a></h2><p>Imperative API for creating watchers.</p><ul><li><p><strong>Type</strong></p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentPublicInstance</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">$watch</span><span style="color:#89DDFF;">(</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">source</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> (</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">any</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">callback</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">WatchCallback</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;">options</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">WatchOptions</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">StopHandle</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#C792EA;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">WatchCallback</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">T</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> (</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">T</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#A6ACCD;">oldValue</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">T</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">onCleanup</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">cleanupFn</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"><span style="color:#A6ACCD;">) </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">WatchOptions</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">immediate</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">boolean</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// default: false</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">deep</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">boolean</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// default: false</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">flush</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">pre</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">post</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">sync</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">// default: &#39;pre&#39;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">onTrack</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">event</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">DebuggerEvent</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">onTrigger</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">event</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">DebuggerEvent</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#C792EA;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">StopHandle</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>Details</strong></p><p>The first argument is the watch source. It can be a component property name string, a simple dot-delimited path string, or a getter function.</p><p>The second argument is the callback function. The callback receives the new value and the old value of the watched source.</p><ul><li><strong><code>immediate</code></strong>: trigger the callback immediately on watcher creation. Old value will be <code>undefined</code> on the first call.</li><li><strong><code>deep</code></strong>: force deep traversal of the source if it is an object, so that the callback fires on deep mutations. See <a href="/docs/guide/essentials/watchers.html#deep-watchers">Deep Watchers</a>.</li><li><strong><code>flush</code></strong>: adjust the callback&#39;s flush timing. See <a href="/docs/guide/essentials/watchers.html#callback-flush-timing">Callback Flush Timing</a> and <a href="/docs/api/reactivity-core.html#watcheffect"><code>watchEffect()</code></a>.</li><li><strong><code>onTrack / onTrigger</code></strong>: debug the watcher&#39;s dependencies. See <a href="/docs/guide/extras/reactivity-in-depth.html#watcher-debugging">Watcher Debugging</a>.</li></ul></li><li><p><strong>Example</strong></p><p>Watch a property name:</p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">$watch</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">a</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">newVal</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">oldVal</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"></span></code></pre></div><p>Watch a dot-delimited path:</p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">$watch</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">a.b</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">newVal</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">oldVal</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"></span></code></pre></div><p>Using getter for more complex expressions:</p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">$watch</span><span style="color:#A6ACCD;">(</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// every time the expression `this.a + this.b` yields</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// a different result, the handler will be called.</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// It&#39;s as if we were watching a computed property</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// without defining the computed property itself.</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">a </span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">b</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">newVal</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">oldVal</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>\n<span class="line"><span style="color:#A6ACCD;">)</span></span>\n<span class="line"></span></code></pre></div><p>Stopping the watcher:</p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> unwatch </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">$watch</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">a</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> cb)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;">// later...</span></span>\n<span class="line"><span style="color:#82AAFF;">unwatch</span><span style="color:#A6ACCD;">()</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>See also:</strong></p><ul><li><a href="/docs/api/options-state.html#watch">Options - <code>watch</code></a></li><li><a href="/docs/guide/essentials/watchers.html">Guide - Watchers</a></li></ul></li></ul><h2 id="emit" tabindex="-1">$emit() <a class="header-anchor" href="#emit" aria-hidden="true">#</a></h2><p>Trigger a custom event on the current instance. Any additional arguments will be passed into the listener&#39;s callback function.</p><ul><li><p><strong>Type</strong></p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentPublicInstance</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">$emit</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">event</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">...</span><span style="color:#A6ACCD;">args</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">any</span><span style="color:#A6ACCD;">[]</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>Example</strong></p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">created</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// only event</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">$emit</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">foo</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>\n<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// with additional arguments</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">$emit</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">bar</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">3</span><span style="color:#F07178;">)</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>See also:</strong></p><ul><li><a href="/docs/guide/components/events.html">Component - Events</a></li><li><a href="./options-state.html#emits"><code>emits</code> option</a></li></ul></li></ul><h2 id="forceupdate" tabindex="-1">$forceUpdate() <a class="header-anchor" href="#forceupdate" aria-hidden="true">#</a></h2><p>Force the component instance to re-render.</p><ul><li><p><strong>Type</strong></p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentPublicInstance</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">$forceUpdate</span><span style="color:#89DDFF;">():</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>Details</strong></p><p>This should be rarely needed given Vue&#39;s fully automatic reactivity system. The only cases where you may need it is when you have explicitly created non-reactive component state using advanced reactivity APIs.</p></li></ul><h2 id="nexttick" tabindex="-1">$nextTick() <a class="header-anchor" href="#nexttick" aria-hidden="true">#</a></h2><p>Instance-bound version of the global <a href="./general.html#nexttick"><code>nextTick()</code></a>.</p><ul><li><p><strong>Type</strong></p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentPublicInstance</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">$nextTick</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">callback</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">this</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ComponentPublicInstance</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Promise</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">void</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>Details</strong></p><p>The only difference from the global version of <code>nextTick()</code> is that the callback passed to <code>this.$nextTick()</code> will have its <code>this</code> context bound to the current component instance.</p></li><li><p><strong>See also:</strong> <a href="./general.html#nexttick"><code>nextTick()</code></a></p></li></ul>',40);const D=s(r,[["render",function(s,e,p,t,c,r){const D=n("VueJobs");return a(),l("div",null,[i,o(D),y])}]]);export{c as __pageData,D as default};
