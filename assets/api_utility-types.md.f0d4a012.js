import{_ as s,C as n,o as a,c as p,j as o,d as l,e,a as t}from"./app.d037d240.js";const c=JSON.parse('{"title":"Utility Types","description":"","frontmatter":{},"headers":[{"level":2,"title":"PropType<T>","slug":"proptype-t","link":"#proptype-t","children":[]},{"level":2,"title":"ComponentCustomProperties","slug":"componentcustomproperties","link":"#componentcustomproperties","children":[]},{"level":2,"title":"ComponentCustomOptions","slug":"componentcustomoptions","link":"#componentcustomoptions","children":[]},{"level":2,"title":"ComponentCustomProps","slug":"componentcustomprops","link":"#componentcustomprops","children":[]},{"level":2,"title":"CSSProperties","slug":"cssproperties","link":"#cssproperties","children":[]}],"relativePath":"api/utility-types.md"}'),r={name:"api/utility-types.md"},y=l("h1",{id:"utility-types",tabindex:"-1"},[e("Utility Types "),l("a",{class:"header-anchor",href:"#utility-types","aria-hidden":"true"},"#")],-1),i=t('<div class="info custom-block"><p class="custom-block-title">INFO</p><p>This page only lists a few commonly used utility types that may need explanation for their usage. For a full list of exported types, consult the <a href="https://github.com/vuejs/core/blob/main/packages/runtime-core/src/index.ts#L131" target="_blank" rel="noreferrer">source code</a>.</p></div><h2 id="proptype-t" tabindex="-1">PropType&lt;T&gt; <a class="header-anchor" href="#proptype-t" aria-hidden="true">#</a></h2><p>Used to annotate a prop with more advanced types when using runtime props declarations.</p><ul><li><p><strong>Example</strong></p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">PropType</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Book</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">title</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">author</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">year</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">number</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">props</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">book</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;">// provide more specific type to `Object`</span></span>\n<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">type</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> Object </span><span style="color:#89DDFF;">as</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">PropType</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Book</span><span style="color:#89DDFF;">&gt;,</span></span>\n<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">required</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div></li><li><p><strong>See also:</strong> <a href="/docs/guide/typescript/options-api.html#typing-component-props">Guide - Typing Component Props</a></p></li></ul><h2 id="componentcustomproperties" tabindex="-1">ComponentCustomProperties <a class="header-anchor" href="#componentcustomproperties" aria-hidden="true">#</a></h2><p>Used to augment the component instance type to support custom global properties.</p><ul><li><p><strong>Example</strong></p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> axios </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">axios</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#C792EA;">declare</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">module</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">interface</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">ComponentCustomProperties</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">    $http</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">typeof</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">axios</span></span>\n<span class="line"><span style="color:#F07178;">    $translate</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">key</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">string</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Augmentations must be placed in a module <code>.ts</code> or <code>.d.ts</code> file. See <a href="/docs/guide/typescript/options-api.html#augmenting-global-properties">Type Augmentation Placement</a> for more details.</p></div></li><li><p><strong>See also:</strong> <a href="/docs/guide/typescript/options-api.html#augmenting-global-properties">Guide - Augmenting Global Properties</a></p></li></ul><h2 id="componentcustomoptions" tabindex="-1">ComponentCustomOptions <a class="header-anchor" href="#componentcustomoptions" aria-hidden="true">#</a></h2><p>Used to augment the component options type to support custom options.</p><ul><li><p><strong>Example</strong></p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Route</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue-router</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#C792EA;">declare</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">module</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">interface</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">ComponentCustomOptions</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">    beforeRouteEnter</span><span style="color:#89DDFF;">?(</span><span style="color:#A6ACCD;">to</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">any</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">from</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">any</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">next</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">void</span><span style="color:#89DDFF;">):</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">void</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Augmentations must be placed in a module <code>.ts</code> or <code>.d.ts</code> file. See <a href="/docs/guide/typescript/options-api.html#augmenting-global-properties">Type Augmentation Placement</a> for more details.</p></div></li><li><p><strong>See also:</strong> <a href="/docs/guide/typescript/options-api.html#augmenting-custom-options">Guide - Augmenting Custom Options</a></p></li></ul><h2 id="componentcustomprops" tabindex="-1">ComponentCustomProps <a class="header-anchor" href="#componentcustomprops" aria-hidden="true">#</a></h2><p>Used to augment allowed TSX props in order to use non-declared props on TSX elements.</p><ul><li><p><strong>Example</strong></p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">declare</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">module</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">interface</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">ComponentCustomProps</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">    hello</span><span style="color:#89DDFF;">?:</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">string</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>\n<span class="line"></span></code></pre></div><div class="language-tsx"><button class="copy"></button><span class="lang">tsx</span><pre><code><span class="line"><span style="color:#676E95;">// now works even if hello is not a declared prop</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">MyComponent</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">hello</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">world</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>\n<span class="line"></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Augmentations must be placed in a module <code>.ts</code> or <code>.d.ts</code> file. See <a href="/docs/guide/typescript/options-api.html#augmenting-global-properties">Type Augmentation Placement</a> for more details.</p></div></li></ul><h2 id="cssproperties" tabindex="-1">CSSProperties <a class="header-anchor" href="#cssproperties" aria-hidden="true">#</a></h2><p>Used to augment allowed values in style property bindings.</p><ul><li><p><strong>Example</strong></p><p>Allow any custom CSS property</p><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#C792EA;">declare</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">module</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">interface</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">CSSProperties</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">    [</span><span style="color:#A6ACCD;">key</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">`</span><span style="color:#C3E88D;">--</span><span style="color:#89DDFF;">${</span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">}`</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">string</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div><div class="language-tsx"><button class="copy"></button><span class="lang">tsx</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">style</span><span style="color:#89DDFF;">={</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">--bg-color</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">blue</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}&gt;</span></span>\n<span class="line"></span></code></pre></div><div class="language-html"><button class="copy"></button><span class="lang">html</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">:style</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">{ &#39;--bg-color&#39;: &#39;blue&#39; }</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div></li></ul><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Augmentations must be placed in a module <code>.ts</code> or <code>.d.ts</code> file. See <a href="/docs/guide/typescript/options-api.html#augmenting-global-properties">Type Augmentation Placement</a> for more details.</p></div><div class="info custom-block"><p class="custom-block-title">See also</p><p>SFC <code>&lt;style&gt;</code> tags support linking CSS values to dynamic component state using the <code>v-bind</code> CSS function. This allows for custom properties without type augmentation.</p><ul><li><a href="/docs/api/sfc-css-features.html#v-bind-in-css">v-bind() in CSS</a></li></ul></div>',18);const F=s(r,[["render",function(s,l,e,t,c,r){const F=n("VueJobs");return a(),p("div",null,[y,o(F),i])}]]);export{c as __pageData,F as default};
