import{_ as s,C as a,o as n,c as l,j as o,d as p,e,a as t}from"./app.699c64d2.js";const c=JSON.parse('{"title":"Reactivity API: Utilities","description":"","frontmatter":{},"headers":[{"level":1,"title":"Reactivity API: Utilities","slug":"reactivity-api-utilities","link":"#reactivity-api-utilities","children":[{"level":2,"title":"isRef()","slug":"isref","link":"#isref","children":[]},{"level":2,"title":"unref()","slug":"unref","link":"#unref","children":[]},{"level":2,"title":"toRef()","slug":"toref","link":"#toref","children":[]},{"level":2,"title":"toRefs()","slug":"torefs","link":"#torefs","children":[]},{"level":2,"title":"isProxy()","slug":"isproxy","link":"#isproxy","children":[]},{"level":2,"title":"isReactive()","slug":"isreactive","link":"#isreactive","children":[]},{"level":2,"title":"isReadonly()","slug":"isreadonly","link":"#isreadonly","children":[]}]}],"relativePath":"api/reactivity-utilities.md"}'),r={name:"api/reactivity-utilities.md"},y=p("h1",{id:"reactivity-api-utilities",tabindex:"-1"},[e("Reactivity API: Utilities "),p("a",{class:"header-anchor",href:"#reactivity-api-utilities","aria-hidden":"true"},"#")],-1),F=t('<h2 id="isref" tabindex="-1">isRef() <a class="header-anchor" href="#isref" aria-hidden="true">#</a></h2><p>Checks if a value is a ref object.</p><ul><li><p><strong>Type</strong></p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">isRef</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">T</span><span style="color:#89DDFF;">&gt;(</span><span style="color:#A6ACCD;">r</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Ref</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">T</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">unknown</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">r</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">is</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Ref</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">T</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p>Note the return type is a <a href="https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates" target="_blank" rel="noreferrer">type predicate</a>, which means <code>isRef</code> can be used as a type guard:</p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> foo</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">unknown</span></span>\n<span class="line"><span style="color:#89DDFF;">if</span><span style="color:#A6ACCD;"> (</span><span style="color:#82AAFF;">isRef</span><span style="color:#A6ACCD;">(foo)) </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// foo&#39;s type is narrowed to Ref&lt;unknown&gt;</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">foo</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div></li></ul><h2 id="unref" tabindex="-1">unref() <a class="header-anchor" href="#unref" aria-hidden="true">#</a></h2><p>Returns the inner value if the argument is a ref, otherwise return the argument itself. This is a sugar function for <code>val = isRef(val) ? val.value : val</code>.</p><ul><li><p><strong>Type</strong></p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">unref</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">T</span><span style="color:#89DDFF;">&gt;(</span><span style="color:#A6ACCD;">ref</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">T</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Ref</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">T</span><span style="color:#89DDFF;">&gt;):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">T</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>Example</strong></p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">useFoo</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">x</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Ref</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">number</span><span style="color:#89DDFF;">&gt;)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">unwrapped</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">unref</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">x</span><span style="color:#F07178;">)</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// unwrapped is guaranteed to be number now</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div></li></ul><h2 id="toref" tabindex="-1">toRef() <a class="header-anchor" href="#toref" aria-hidden="true">#</a></h2><p>Can be used to create a ref for a property on a source reactive object. The created ref is synced with its source property: mutating the source property will update the ref, and vice-versa.</p><ul><li><p><strong>Type</strong></p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">toRef</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">T</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">object</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">K</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">keyof</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">T</span><span style="color:#89DDFF;">&gt;(</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#A6ACCD;">object</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">T</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#A6ACCD;">key</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">K</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#A6ACCD;">defaultValue</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">T</span><span style="color:#A6ACCD;">[</span><span style="color:#FFCB6B;">K</span><span style="color:#A6ACCD;">]</span></span>\n<span class="line"><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ToRef</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">T</span><span style="color:#A6ACCD;">[</span><span style="color:#FFCB6B;">K</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#C792EA;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ToRef</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">T</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">T</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Ref</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">?</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">T</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Ref</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">T</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>Example</strong></p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> state </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">reactive</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">foo</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">bar</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> fooRef </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">toRef</span><span style="color:#A6ACCD;">(state</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">foo</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;">// mutating the ref updates the original</span></span>\n<span class="line"><span style="color:#A6ACCD;">fooRef</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">++</span></span>\n<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(state</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">foo) </span><span style="color:#676E95;">// 2</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;">// mutating the original also updates the ref</span></span>\n<span class="line"><span style="color:#A6ACCD;">state</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">foo</span><span style="color:#89DDFF;">++</span></span>\n<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(fooRef</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value) </span><span style="color:#676E95;">// 3</span></span>\n<span class="line"></span></code></pre></div><p>Note this is different from:</p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> fooRef </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">ref</span><span style="color:#A6ACCD;">(state</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">foo)</span></span>\n<span class="line"></span></code></pre></div><p>The above ref is <strong>not</strong> synced with <code>state.foo</code>, because the <code>ref()</code> receives a plain number value.</p><p><code>toRef()</code> is useful when you want to pass the ref of a prop to a composable function:</p><div class="language-vue"><button class="copy"></button><span class="lang">vue</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">setup</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">toRef</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> props </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">defineProps</span><span style="color:#A6ACCD;">(</span><span style="color:#676E95;">/* ... */</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;">// convert `props.foo` into a ref, then pass into</span></span>\n<span class="line"><span style="color:#676E95;">// a composable</span></span>\n<span class="line"><span style="color:#82AAFF;">useSomeFeature</span><span style="color:#A6ACCD;">(</span><span style="color:#82AAFF;">toRef</span><span style="color:#A6ACCD;">(props</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">foo</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">))</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p>When <code>toRef</code> is used with component props, the usual restrictions around mutating the props still apply. Attempting to assign a new value to the ref is equivalent to trying to modify the prop directly and is not allowed. In that scenario you may want to consider using <a href="./reactivity-core.html#computed"><code>computed</code></a> with <code>get</code> and <code>set</code> instead. See the guide to <a href="/docs/guide/components/events.html#usage-with-v-model">using <code>v-model</code> with components</a> for more information.</p><p><code>toRef()</code> will return a usable ref even if the source property doesn&#39;t currently exist. This makes it possible to work with optional properties, which wouldn&#39;t be picked up by <a href="#torefs"><code>toRefs</code></a>.</p></li></ul><h2 id="torefs" tabindex="-1">toRefs() <a class="header-anchor" href="#torefs" aria-hidden="true">#</a></h2><p>Converts a reactive object to a plain object where each property of the resulting object is a ref pointing to the corresponding property of the original object. Each individual ref is created using <a href="#toref"><code>toRef()</code></a>.</p><ul><li><p><strong>Type</strong></p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">toRefs</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">T</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">object</span><span style="color:#89DDFF;">&gt;(</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#A6ACCD;">object</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">T</span></span>\n<span class="line"><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  [</span><span style="color:#FFCB6B;">K</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">in</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">keyof</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">T</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ToRef</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">T</span><span style="color:#A6ACCD;">[</span><span style="color:#FFCB6B;">K</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#C792EA;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ToRef</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">T</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Ref</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">?</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">T</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Ref</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">T</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>Example</strong></p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> state </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">reactive</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">foo</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">bar</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> stateAsRefs </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">toRefs</span><span style="color:#A6ACCD;">(state)</span></span>\n<span class="line"><span style="color:#676E95;">/*</span></span>\n<span class="line"><span style="color:#676E95;">Type of stateAsRefs: {</span></span>\n<span class="line"><span style="color:#676E95;">  foo: Ref&lt;number&gt;,</span></span>\n<span class="line"><span style="color:#676E95;">  bar: Ref&lt;number&gt;</span></span>\n<span class="line"><span style="color:#676E95;">}</span></span>\n<span class="line"><span style="color:#676E95;">*/</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;">// The ref and the original property is &quot;linked&quot;</span></span>\n<span class="line"><span style="color:#A6ACCD;">state</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">foo</span><span style="color:#89DDFF;">++</span></span>\n<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(stateAsRefs</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">foo</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value) </span><span style="color:#676E95;">// 2</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">stateAsRefs</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">foo</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">++</span></span>\n<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(state</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">foo) </span><span style="color:#676E95;">// 3</span></span>\n<span class="line"></span></code></pre></div><p><code>toRefs</code> is useful when returning a reactive object from a composable function so that the consuming component can destructure/spread the returned object without losing reactivity:</p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">useFeatureX</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">state</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">reactive</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">    foo</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#F07178;">    bar</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">2</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// ...logic operating on state</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// convert to refs when returning</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">toRefs</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">state</span><span style="color:#F07178;">)</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;">// can destructure without losing reactivity</span></span>\n<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> foo</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> bar </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">useFeatureX</span><span style="color:#A6ACCD;">()</span></span>\n<span class="line"></span></code></pre></div><p><code>toRefs</code> will only generate refs for properties that are enumerable on the source object at call time. To create a ref for a property that may not exist yet, use <a href="#toref"><code>toRef</code></a> instead.</p></li></ul><h2 id="isproxy" tabindex="-1">isProxy() <a class="header-anchor" href="#isproxy" aria-hidden="true">#</a></h2><p>Checks if an object is a proxy created by <a href="./reactivity-core.html#reactive"><code>reactive()</code></a>, <a href="./reactivity-core.html#readonly"><code>readonly()</code></a>, <a href="./reactivity-advanced.html#shallowreactive"><code>shallowReactive()</code></a> or <a href="./reactivity-advanced.html#shallowreadonly"><code>shallowReadonly()</code></a>.</p><ul><li><p><strong>Type</strong></p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">isProxy</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">unknown</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">boolean</span></span>\n<span class="line"></span></code></pre></div></li></ul><h2 id="isreactive" tabindex="-1">isReactive() <a class="header-anchor" href="#isreactive" aria-hidden="true">#</a></h2><p>Checks if an object is a proxy created by <a href="./reactivity-core.html#reactive"><code>reactive()</code></a> or <a href="./reactivity-advanced.html#shallowreactive"><code>shallowReactive()</code></a>.</p><ul><li><p><strong>Type</strong></p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">isReactive</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">unknown</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">boolean</span></span>\n<span class="line"></span></code></pre></div></li></ul><h2 id="isreadonly" tabindex="-1">isReadonly() <a class="header-anchor" href="#isreadonly" aria-hidden="true">#</a></h2><p>Checks whether the passed value is a readonly object. The properties of a readonly object can change, but they can&#39;t be assigned directly via the passed object.</p><p>The proxies created by <a href="./reactivity-core.html#readonly"><code>readonly()</code></a> and <a href="./reactivity-advanced.html#shallowreadonly"><code>shallowReadonly()</code></a> are both considered readonly, as is a <a href="./reactivity-core.html#computed"><code>computed()</code></a> ref without a <code>set</code> function.</p><ul><li><p><strong>Type</strong></p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">isReadonly</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">unknown</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">boolean</span></span>\n<span class="line"></span></code></pre></div></li></ul>',22);const i=s(r,[["render",function(s,p,e,t,c,r){const i=a("VueJobs");return n(),l("div",null,[y,o(i),F])}]]);export{c as __pageData,i as default};
