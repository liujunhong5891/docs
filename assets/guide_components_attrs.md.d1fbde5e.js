import{_ as s,C as n,o as a,c as e,j as l,d as t,e as o,a as p}from"./app.699c64d2.js";const c=JSON.parse('{"title":"Fallthrough Attributes","description":"","frontmatter":{"outline":"deep"},"headers":[{"level":2,"title":"Attribute Inheritance","slug":"attribute-inheritance","link":"#attribute-inheritance","children":[{"level":3,"title":"class and style Merging","slug":"class-and-style-merging","link":"#class-and-style-merging","children":[]},{"level":3,"title":"v-on Listener Inheritance","slug":"v-on-listener-inheritance","link":"#v-on-listener-inheritance","children":[]},{"level":3,"title":"Nested Component Inheritance","slug":"nested-component-inheritance","link":"#nested-component-inheritance","children":[]}]},{"level":2,"title":"Disabling Attribute Inheritance","slug":"disabling-attribute-inheritance","link":"#disabling-attribute-inheritance","children":[]},{"level":2,"title":"Attribute Inheritance on Multiple Root Nodes","slug":"attribute-inheritance-on-multiple-root-nodes","link":"#attribute-inheritance-on-multiple-root-nodes","children":[]},{"level":2,"title":"Accessing Fallthrough Attributes in JavaScript","slug":"accessing-fallthrough-attributes-in-javascript","link":"#accessing-fallthrough-attributes-in-javascript","children":[]}],"relativePath":"guide/components/attrs.md"}'),r={name:"guide/components/attrs.md"},i=t("h1",{id:"fallthrough-attributes",tabindex:"-1"},[o("Fallthrough Attributes "),t("a",{class:"header-anchor",href:"#fallthrough-attributes","aria-hidden":"true"},"#")],-1),d=p('<blockquote><p>This page assumes you&#39;ve already read the <a href="/docs/guide/essentials/component-basics.html">Components Basics</a>. Read that first if you are new to components.</p></blockquote><h2 id="attribute-inheritance" tabindex="-1">Attribute Inheritance <a class="header-anchor" href="#attribute-inheritance" aria-hidden="true">#</a></h2><p>A &quot;fallthrough attribute&quot; is an attribute or <code>v-on</code> event listener that is passed to a component, but is not explicitly declared in the receiving component&#39;s <a href="./props.html">props</a> or <a href="./events.html#declaring-emitted-events">emits</a>. Common examples of this include <code>class</code>, <code>style</code>, and <code>id</code> attributes.</p><p>When a component renders a single root element, fallthrough attributes will be automatically added to the root element&#39;s attributes. For example, given a <code>&lt;MyButton&gt;</code> component with the following template:</p><div class="language-vue-html line-numbers-mode"><button class="copy"></button><span class="lang">template</span><pre><code><span class="line"><span style="color:#676E95;">&lt;!-- template of &lt;MyButton&gt; --&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">click me</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>And a parent using this component with:</p><div class="language-vue-html line-numbers-mode"><button class="copy"></button><span class="lang">template</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">MyButton</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">large</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>\n<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><p>The final rendered DOM would be:</p><div class="language-html line-numbers-mode"><button class="copy"></button><span class="lang">html</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">large</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">click me</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><p>Here, <code>&lt;MyButton&gt;</code> did not declare <code>class</code> as an accepted prop. Therefore, <code>class</code> is treated as a fallthrough attribute and automatically added to <code>&lt;MyButton&gt;</code>&#39;s root element.</p><h3 id="class-and-style-merging" tabindex="-1"><code>class</code> and <code>style</code> Merging <a class="header-anchor" href="#class-and-style-merging" aria-hidden="true">#</a></h3><p>If the child component&#39;s root element already has existing <code>class</code> or <code>style</code> attributes, it will be merged with the <code>class</code> and <code>style</code> values that are inherited from the parent. Suppose we change the template of <code>&lt;MyButton&gt;</code> in the previous example to:</p><div class="language-vue-html line-numbers-mode"><button class="copy"></button><span class="lang">template</span><pre><code><span class="line"><span style="color:#676E95;">&lt;!-- template of &lt;MyButton&gt; --&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">btn</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">click me</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Then the final rendered DOM would now become:</p><div class="language-html line-numbers-mode"><button class="copy"></button><span class="lang">html</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">btn large</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">click me</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><h3 id="v-on-listener-inheritance" tabindex="-1"><code>v-on</code> Listener Inheritance <a class="header-anchor" href="#v-on-listener-inheritance" aria-hidden="true">#</a></h3><p>The same rule applies to <code>v-on</code> event listeners:</p><div class="language-vue-html line-numbers-mode"><button class="copy"></button><span class="lang">template</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">MyButton</span><span style="color:#89DDFF;"> @</span><span style="color:#C792EA;">click</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">onClick</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>\n<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><p>The <code>click</code> listener will be added to the root element of <code>&lt;MyButton&gt;</code>, i.e. the native <code>&lt;button&gt;</code> element. When the native <code>&lt;button&gt;</code> is clicked, it will trigger the <code>onClick</code> method of the parent component. If the native <code>&lt;button&gt;</code> already has a <code>click</code> listener bound with <code>v-on</code>, then both listeners will trigger.</p><h3 id="nested-component-inheritance" tabindex="-1">Nested Component Inheritance <a class="header-anchor" href="#nested-component-inheritance" aria-hidden="true">#</a></h3><p>If a component renders another component as its root node, for example, we refactored <code>&lt;MyButton&gt;</code> to render a <code>&lt;BaseButton&gt;</code> as its root:</p><div class="language-vue-html line-numbers-mode"><button class="copy"></button><span class="lang">template</span><pre><code><span class="line"><span style="color:#676E95;">&lt;!-- template of &lt;MyButton/&gt; that simply renders another component --&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">BaseButton</span><span style="color:#89DDFF;"> /&gt;</span></span>\n<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Then the fallthrough attributes received by <code>&lt;MyButton&gt;</code> will be automatically forwarded to <code>&lt;BaseButton&gt;</code>.</p><p>Note that:</p><ol><li><p>Forwarded attributes do not include any attributes that are declared as props, or <code>v-on</code> listeners of declared events by <code>&lt;MyButton&gt;</code> - in other words, the declared props and listeners have been &quot;consumed&quot; by <code>&lt;MyButton&gt;</code>.</p></li><li><p>Forwarded attributes may be accepted as props by <code>&lt;BaseButton&gt;</code>, if declared by it.</p></li></ol><h2 id="disabling-attribute-inheritance" tabindex="-1">Disabling Attribute Inheritance <a class="header-anchor" href="#disabling-attribute-inheritance" aria-hidden="true">#</a></h2><p>If you do <strong>not</strong> want a component to automatically inherit attributes, you can set <code>inheritAttrs: false</code> in the component&#39;s options.</p><div class="composition-api"><p>If using <code>&lt;script setup&gt;</code>, you will need to declare this option using a separate, normal <code>&lt;script&gt;</code> block:</p><div class="language-vue line-numbers-mode"><button class="copy"></button><span class="lang">vue</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#676E95;">// use normal &lt;script&gt; to declare options</span></span>\n<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">inheritAttrs</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">setup</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#676E95;">// ...setup logic</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div></div><p>The common scenario for disabling attribute inheritance is when attributes need to be applied to other elements besides the root node. By setting the <code>inheritAttrs</code> option to <code>false</code>, you can take full control over where the fallthrough attributes should be applied.</p><p>These fallthrough attributes can be accessed directly in template expressions as <code>$attrs</code>:</p><div class="language-vue-html line-numbers-mode"><button class="copy"></button><span class="lang">template</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">span</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Fallthrough attributes: </span><span style="color:#89DDFF;">{{</span><span style="color:#A6ACCD;"> $attrs </span><span style="color:#89DDFF;">}}&lt;/</span><span style="color:#F07178;">span</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><p>The <code>$attrs</code> object includes all attributes that are not declared by the component&#39;s <code>props</code> or <code>emits</code> options (e.g., <code>class</code>, <code>style</code>, <code>v-on</code> listeners, etc.).</p><p>Some notes:</p><ul><li><p>Unlike props, fallthrough attributes preserve their original casing in JavaScript, so an attribute like <code>foo-bar</code> needs to be accessed as <code>$attrs[&#39;foo-bar&#39;]</code>.</p></li><li><p>A <code>v-on</code> event listener like <code>@click</code> will be exposed on the object as a function under <code>$attrs.onClick</code>.</p></li></ul><p>Using our <code>&lt;MyButton&gt;</code> component example from the <a href="#attribute-inheritance">previous section</a> - sometimes we may need to wrap the actual <code>&lt;button&gt;</code> element with an extra <code>&lt;div&gt;</code> for styling purposes:</p><div class="language-vue-html line-numbers-mode"><button class="copy"></button><span class="lang">template</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">btn-wrapper</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">btn</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">click me</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>We want all fallthrough attributes like <code>class</code> and <code>v-on</code> listeners to be applied to the inner <code>&lt;button&gt;</code>, not the outer <code>&lt;div&gt;</code>. We can achieve this with <code>inheritAttrs: false</code> and <code>v-bind=&quot;$attrs&quot;</code>:</p><div class="language-vue-html line-numbers-mode"><button class="copy"></button><span class="lang">template</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">btn-wrapper</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line highlighted"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">btn</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-bind</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">$attrs</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">click me</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Remember that <a href="/docs/guide/essentials/template-syntax.html#dynamically-binding-multiple-attributes"><code>v-bind</code> without an argument</a> binds all the properties of an object as attributes of the target element.</p><h2 id="attribute-inheritance-on-multiple-root-nodes" tabindex="-1">Attribute Inheritance on Multiple Root Nodes <a class="header-anchor" href="#attribute-inheritance-on-multiple-root-nodes" aria-hidden="true">#</a></h2><p>Unlike components with a single root node, components with multiple root nodes do not have an automatic attribute fallthrough behavior. If <code>$attrs</code> are not bound explicitly, a runtime warning will be issued.</p><div class="language-vue-html line-numbers-mode"><button class="copy"></button><span class="lang">template</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">CustomLayout</span><span style="color:#89DDFF;"> </span><span style="color:#F78C6C;">id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">custom-layout</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> @</span><span style="color:#C792EA;">click</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">changeValue</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>\n<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><p>If <code>&lt;CustomLayout&gt;</code> has the following multi-root template, there will be a warning because Vue cannot be sure where to apply the fallthrough attributes:</p><div class="language-vue-html line-numbers-mode"><button class="copy"></button><span class="lang">template</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">header</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">...</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">header</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">main</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">...</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">main</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">footer</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">...</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">footer</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>The warning will be suppressed if <code>$attrs</code> is explicitly bound:</p><div class="language-vue-html line-numbers-mode"><button class="copy"></button><span class="lang">template</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">header</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">...</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">header</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line highlighted"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">main</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-bind</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">$attrs</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">...</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">main</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">footer</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">...</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">footer</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="accessing-fallthrough-attributes-in-javascript" tabindex="-1">Accessing Fallthrough Attributes in JavaScript <a class="header-anchor" href="#accessing-fallthrough-attributes-in-javascript" aria-hidden="true">#</a></h2><div class="composition-api"><p>If needed, you can access a component&#39;s fallthrough attributes in <code>&lt;script setup&gt;</code> using the <code>useAttrs()</code> API:</p><div class="language-vue line-numbers-mode"><button class="copy"></button><span class="lang">vue</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">setup</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">useAttrs</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> attrs </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">useAttrs</span><span style="color:#A6ACCD;">()</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>If not using <code>&lt;script setup&gt;</code>, <code>attrs</code> will be exposed as a property of the <code>setup()</code> context:</p><div class="language-js line-numbers-mode"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">setup</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">props</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">ctx</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// fallthrough attributes are exposed as ctx.attrs</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">ctx</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">attrs</span><span style="color:#F07178;">)</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>Note that although the <code>attrs</code> object here always reflects the latest fallthrough attributes, it isn&#39;t reactive (for performance reasons). You cannot use watchers to observe its changes. If you need reactivity, use a prop. Alternatively, you can use <code>onUpdated()</code> to perform side effects with the latest <code>attrs</code> on each update.</p></div><div class="options-api"><p>If needed, you can access a component&#39;s fallthrough attributes via the <code>$attrs</code> instance property:</p><div class="language-js line-numbers-mode"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">created</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">$attrs</span><span style="color:#F07178;">)</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div></div>',49);const u=s(r,[["render",function(s,t,o,p,c,r){const u=n("VueJobs");return a(),e("div",null,[i,l(u),d])}]]);export{c as __pageData,u as default};
