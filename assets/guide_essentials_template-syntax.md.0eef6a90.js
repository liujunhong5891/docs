import{C as s,o as e,c as a,j as n,d as t,t as l,e as o,a as p}from"./app.ca076d61.js";const r=t("h1",{id:"template-syntax",tabindex:"-1"},[o("Template Syntax "),t("a",{class:"header-anchor",href:"#template-syntax","aria-hidden":"true"},"#")],-1),c=p('<p>Vue uses an HTML-based template syntax that allows you to declaratively bind the rendered DOM to the underlying component instance&#39;s data. All Vue templates are syntactically valid HTML that can be parsed by spec-compliant browsers and HTML parsers.</p><p>Under the hood, Vue compiles the templates into highly-optimized JavaScript code. Combined with the reactivity system, Vue can intelligently figure out the minimal number of components to re-render and apply the minimal amount of DOM manipulations when the app state changes.</p><p>If you are familiar with Virtual DOM concepts and prefer the raw power of JavaScript, you can also <a href="/docs/guide/extras/render-function.html">directly write render functions</a> instead of templates, with optional JSX support. However, do note that they do not enjoy the same level of compile-time optimizations as templates.</p><h2 id="text-interpolation" tabindex="-1">Text Interpolation <a class="header-anchor" href="#text-interpolation" aria-hidden="true">#</a></h2><p>The most basic form of data binding is text interpolation using the &quot;Mustache&quot; syntax (double curly braces):</p><div class="language-vue-html"><button class="copy"></button><span class="lang">template</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">span</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Message: </span><span style="color:#89DDFF;">{{</span><span style="color:#A6ACCD;"> msg </span><span style="color:#89DDFF;">}}&lt;/</span><span style="color:#F07178;">span</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p>The mustache tag will be replaced with the value of the <code>msg</code> property from the corresponding component instance. It will also be updated whenever the <code>msg</code> property changes.</p><h2 id="raw-html" tabindex="-1">Raw HTML <a class="header-anchor" href="#raw-html" aria-hidden="true">#</a></h2><p>The double mustaches interpret the data as plain text, not HTML. In order to output real HTML, you will need to use the <a href="/docs/api/built-in-directives.html#v-html"><code>v-html</code> directive</a>:</p><div class="language-vue-html"><button class="copy"></button><span class="lang">template</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">p</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Using text interpolation: </span><span style="color:#89DDFF;">{{</span><span style="color:#A6ACCD;"> rawHtml </span><span style="color:#89DDFF;">}}&lt;/</span><span style="color:#F07178;">p</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">p</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Using v-html directive: </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">span</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-html</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">rawHtml</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">span</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">p</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div>',10),i=o("Using v-html directive: "),d=p('<p>Here we&#39;re encountering something new. The <code>v-html</code> attribute you&#39;re seeing is called a <strong>directive</strong>. Directives are prefixed with <code>v-</code> to indicate that they are special attributes provided by Vue, and as you may have guessed, they apply special reactive behavior to the rendered DOM. Here, we&#39;re basically saying &quot;keep this element&#39;s inner HTML up-to-date with the <code>rawHtml</code> property on the current active instance.&quot;</p><p>The contents of the <code>span</code> will be replaced with the value of the <code>rawHtml</code> property, interpreted as plain HTML - data bindings are ignored. Note that you cannot use <code>v-html</code> to compose template partials, because Vue is not a string-based templating engine. Instead, components are preferred as the fundamental unit for UI reuse and composition.</p><div class="warning custom-block"><p class="custom-block-title">Security Warning</p><p>Dynamically rendering arbitrary HTML on your website can be very dangerous because it can easily lead to <a href="https://en.wikipedia.org/wiki/Cross-site_scripting" target="_blank" rel="noreferrer">XSS vulnerabilities</a>. Only use <code>v-html</code> on trusted content and <strong>never</strong> on user-provided content.</p></div><h2 id="attribute-bindings" tabindex="-1">Attribute Bindings <a class="header-anchor" href="#attribute-bindings" aria-hidden="true">#</a></h2><p>Mustaches cannot be used inside HTML attributes. Instead, use a <a href="/docs/api/built-in-directives.html#v-bind"><code>v-bind</code> directive</a>:</p><div class="language-vue-html"><button class="copy"></button><span class="lang">template</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-bind</span><span style="color:#89DDFF;">:</span><span style="color:#C792EA;">id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">dynamicId</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p>The <code>v-bind</code> directive instructs Vue to keep the element&#39;s <code>id</code> attribute in sync with the component&#39;s <code>dynamicId</code> property. If the bound value is <code>null</code> or <code>undefined</code>, then the attribute will be removed from the rendered element.</p><h3 id="shorthand" tabindex="-1">Shorthand <a class="header-anchor" href="#shorthand" aria-hidden="true">#</a></h3><p>Because <code>v-bind</code> is so commonly used, it has a dedicated shorthand syntax:</p><div class="language-vue-html"><button class="copy"></button><span class="lang">template</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> :</span><span style="color:#C792EA;">id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">dynamicId</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p>Attributes that start with <code>:</code> may look a bit different from normal HTML, but it is in fact a valid character for attribute names and all Vue-supported browsers can parse it correctly. In addition, they do not appear in the final rendered markup. The shorthand syntax is optional, but you will likely appreciate it when you learn more about its usage later.</p><blockquote><p>For the rest of the guide, we will be using the shorthand syntax in code examples, as that&#39;s the most common usage for Vue developers.</p></blockquote><h3 id="boolean-attributes" tabindex="-1">Boolean Attributes <a class="header-anchor" href="#boolean-attributes" aria-hidden="true">#</a></h3><p><a href="https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#boolean-attributes" target="_blank" rel="noreferrer">Boolean attributes</a> are attributes that can indicate true / false values by its presence on an element. For example, <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled" target="_blank" rel="noreferrer"><code>disabled</code></a> is one of the most commonly used boolean attributes.</p><p><code>v-bind</code> works a bit differently in this case:</p><div class="language-vue-html"><button class="copy"></button><span class="lang">template</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;"> :</span><span style="color:#C792EA;">disabled</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">isButtonDisabled</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Button</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p>The <code>disabled</code> attribute will be included if <code>isButtonDisabled</code> has a <a href="https://developer.mozilla.org/en-US/docs/Glossary/Truthy" target="_blank" rel="noreferrer">truthy value</a>. It will also be included if the value is an empty string, maintaining consistency with <code>&lt;button disabled=&quot;&quot;&gt;</code>. For other <a href="https://developer.mozilla.org/en-US/docs/Glossary/Falsy" target="_blank" rel="noreferrer">falsy values</a> the attribute will be omitted.</p><h3 id="dynamically-binding-multiple-attributes" tabindex="-1">Dynamically Binding Multiple Attributes <a class="header-anchor" href="#dynamically-binding-multiple-attributes" aria-hidden="true">#</a></h3><p>If you have a JavaScript object representing multiple attributes that looks like this:</p><div class="composition-api"><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> objectOfAttrs </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">id</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">container</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">class</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">wrapper</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div></div><div class="options-api"><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#82AAFF;">data</span><span style="color:#A6ACCD;">() </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">    objectOfAttrs</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">      id</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">container</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#F07178;">      class</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">wrapper</span><span style="color:#89DDFF;">&#39;</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div></div><p>You can bind them to a single element by using <code>v-bind</code> without an argument:</p><div class="language-vue-html"><button class="copy"></button><span class="lang">template</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-bind</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">objectOfAttrs</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><h2 id="using-javascript-expressions" tabindex="-1">Using JavaScript Expressions <a class="header-anchor" href="#using-javascript-expressions" aria-hidden="true">#</a></h2><p>So far we&#39;ve only been binding to simple property keys in our templates. But Vue actually supports the full power of JavaScript expressions inside all data bindings:</p><div class="language-vue-html"><button class="copy"></button><span class="lang">template</span><pre><code><span class="line"><span style="color:#89DDFF;">{{</span><span style="color:#A6ACCD;"> number </span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">{{</span><span style="color:#A6ACCD;"> ok </span><span style="color:#89DDFF;">?</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">YES</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">NO</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">{{</span><span style="color:#A6ACCD;"> message</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">split</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">reverse</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">join</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;&#39;</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">}}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> :</span><span style="color:#C792EA;">id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;`</span><span style="color:#C3E88D;">list-</span><span style="color:#89DDFF;">${</span><span style="color:#A6ACCD;">id</span><span style="color:#89DDFF;">}`&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p>These expressions will be evaluated as JavaScript in the data scope of the current component instance.</p><p>In Vue templates, JavaScript expressions can be used in the following positions:</p><ul><li>Inside text interpolations (mustaches)</li><li>In the attribute value of any Vue directives (special attributes that start with <code>v-</code>)</li></ul><h3 id="expressions-only" tabindex="-1">Expressions Only <a class="header-anchor" href="#expressions-only" aria-hidden="true">#</a></h3><p>Each binding can only contain <strong>one single expression</strong>. An expression is a piece of code that can be evaluated to a value. A simple check is whether it can be used after <code>return</code>.</p><p>Therefore, the following will <strong>NOT</strong> work:</p><div class="language-vue-html"><button class="copy"></button><span class="lang">template</span><pre><code><span class="line"><span style="color:#676E95;">&lt;!-- this is a statement, not an expression: --&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">{{</span><span style="color:#A6ACCD;"> var a </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;">&lt;!-- flow control won&#39;t work either, use ternary expressions --&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">{{</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">if</span><span style="color:#A6ACCD;"> (ok) </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> return message </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}}</span></span>\n<span class="line"></span></code></pre></div><h3 id="calling-functions" tabindex="-1">Calling Functions <a class="header-anchor" href="#calling-functions" aria-hidden="true">#</a></h3><p>It is possible to call a component-exposed method inside a binding expression:</p><div class="language-vue-html"><button class="copy"></button><span class="lang">template</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">span</span><span style="color:#89DDFF;"> :</span><span style="color:#C792EA;">title</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">toTitleDate</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">date</span><span style="color:#89DDFF;">)</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">{{</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">formatDate</span><span style="color:#A6ACCD;">(date) </span><span style="color:#89DDFF;">}}</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">span</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Functions called inside binding expressions will be called every time the component updates, so they should <strong>not</strong> have any side effects, such as changing data or triggering asynchronous operations.</p></div><h3 id="restricted-globals-access" tabindex="-1">Restricted Globals Access <a class="header-anchor" href="#restricted-globals-access" aria-hidden="true">#</a></h3><p>Template expressions are sandboxed and only have access to a <a href="https://github.com/vuejs/core/blob/main/packages/shared/src/globalsWhitelist.ts#L3" target="_blank" rel="noreferrer">restricted list of globals</a>. The list exposes commonly used built-in globals such as <code>Math</code> and <code>Date</code>.</p><p>Globals not explicitly included in the list, for example user-attached properties on <code>window</code>, will not be accessible in template expressions. You can, however, explicitly define additional globals for all Vue expressions by adding them to <a href="/docs/api/application.html#app-config-globalproperties"><code>app.config.globalProperties</code></a>.</p><h2 id="directives" tabindex="-1">Directives <a class="header-anchor" href="#directives" aria-hidden="true">#</a></h2><p>Directives are special attributes with the <code>v-</code> prefix. Vue provides a number of <a href="/docs/api/built-in-directives.html">built-in directives</a>, including <code>v-html</code> and <code>v-bind</code> which we have introduced above.</p><p>Directive attribute values are expected to be single JavaScript expressions (with the exception of <code>v-for</code>, <code>v-on</code> and <code>v-slot</code>, which will be discussed in their respective sections later). A directive&#39;s job is to reactively apply updates to the DOM when the value of its expression changes. Take <a href="/docs/api/built-in-directives.html#v-if"><code>v-if</code></a> as an example:</p><div class="language-vue-html"><button class="copy"></button><span class="lang">template</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">p</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-if</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">seen</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Now you see me</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">p</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p>Here, the <code>v-if</code> directive would remove / insert the <code>&lt;p&gt;</code> element based on the truthiness of the value of the expression <code>seen</code>.</p><h3 id="arguments" tabindex="-1">Arguments <a class="header-anchor" href="#arguments" aria-hidden="true">#</a></h3><p>Some directives can take an &quot;argument&quot;, denoted by a colon after the directive name. For example, the <code>v-bind</code> directive is used to reactively update an HTML attribute:</p><div class="language-vue-html"><button class="copy"></button><span class="lang">template</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-bind</span><span style="color:#89DDFF;">:</span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">url</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> ... </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;">&lt;!-- shorthand --&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;"> :</span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">url</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> ... </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p>Here, <code>href</code> is the argument, which tells the <code>v-bind</code> directive to bind the element&#39;s <code>href</code> attribute to the value of the expression <code>url</code>. In the shorthand, everything before the argument (i.e., <code>v-bind:</code>) is condensed into a single character, <code>:</code>.</p><p>Another example is the <code>v-on</code> directive, which listens to DOM events:</p><div class="language-vue-html"><button class="copy"></button><span class="lang">template</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-on</span><span style="color:#89DDFF;">:</span><span style="color:#C792EA;">click</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">doSomething</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> ... </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;">&lt;!-- shorthand --&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;"> @</span><span style="color:#C792EA;">click</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">doSomething</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> ... </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p>Here, the argument is the event name to listen to: <code>click</code>. <code>v-on</code> has a corresponding shorthand, namely the <code>@</code> character. We will talk about event handling in more detail too.</p><h3 id="dynamic-arguments" tabindex="-1">Dynamic Arguments <a class="header-anchor" href="#dynamic-arguments" aria-hidden="true">#</a></h3><p>It is also possible to use a JavaScript expression in a directive argument by wrapping it with square brackets:</p><div class="language-vue-html"><button class="copy"></button><span class="lang">template</span><pre><code><span class="line"><span style="color:#676E95;">&lt;!--</span></span>\n<span class="line"><span style="color:#676E95;">Note that there are some constraints to the argument expression,</span></span>\n<span class="line"><span style="color:#676E95;">as explained in the &quot;Dynamic Argument Value Constraints&quot; and &quot;Dynamic Argument Syntax Constraints&quot; sections below.</span></span>\n<span class="line"><span style="color:#676E95;">--&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-bind:</span><span style="color:#89DDFF;">[</span><span style="color:#C792EA;">attributeName</span><span style="color:#89DDFF;">]=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">url</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> ... </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;">&lt;!-- shorthand --&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;"> :[</span><span style="color:#C792EA;">attributeName</span><span style="color:#89DDFF;">]=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">url</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> ... </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p>Here, <code>attributeName</code> will be dynamically evaluated as a JavaScript expression, and its evaluated value will be used as the final value for the argument. For example, if your component instance has a data property, <code>attributeName</code>, whose value is <code>&quot;href&quot;</code>, then this binding will be equivalent to <code>v-bind:href</code>.</p><p>Similarly, you can use dynamic arguments to bind a handler to a dynamic event name:</p><div class="language-vue-html"><button class="copy"></button><span class="lang">template</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-on:</span><span style="color:#89DDFF;">[</span><span style="color:#C792EA;">eventName</span><span style="color:#89DDFF;">]=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">doSomething</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> ... </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;">&lt;!-- shorthand --&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;"> @[</span><span style="color:#C792EA;">eventName</span><span style="color:#89DDFF;">]=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">doSomething</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p>In this example, when <code>eventName</code>&#39;s value is <code>&quot;focus&quot;</code>, <code>v-on:[eventName]</code> will be equivalent to <code>v-on:focus</code>.</p><h4 id="dynamic-argument-value-constraints" tabindex="-1">Dynamic Argument Value Constraints <a class="header-anchor" href="#dynamic-argument-value-constraints" aria-hidden="true">#</a></h4><p>Dynamic arguments are expected to evaluate to a string, with the exception of <code>null</code>. The special value <code>null</code> can be used to explicitly remove the binding. Any other non-string value will trigger a warning.</p><h4 id="dynamic-argument-syntax-constraints" tabindex="-1">Dynamic Argument Syntax Constraints <a class="header-anchor" href="#dynamic-argument-syntax-constraints" aria-hidden="true">#</a></h4><p>Dynamic argument expressions have some syntax constraints because certain characters, such as spaces and quotes, are invalid inside HTML attribute names. For example, the following is invalid:</p><div class="language-vue-html"><button class="copy"></button><span class="lang">template</span><pre><code><span class="line"><span style="color:#676E95;">&lt;!-- This will trigger a compiler warning. --&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;"> :[</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">foo</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;"> + </span><span style="color:#C792EA;">bar</span><span style="color:#89DDFF;">]=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">value</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> ... </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p>If you need to pass a complex dynamic argument, it&#39;s probably better to use a <a href="./computed.html">computed property</a>, which we will cover shortly.</p><p>When using in-DOM templates (templates directly written in an HTML file), you should also avoid naming keys with uppercase characters, as browsers will coerce attribute names into lowercase:</p><div class="language-vue-html"><button class="copy"></button><span class="lang">template</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;"> :[</span><span style="color:#C792EA;">someAttr</span><span style="color:#89DDFF;">]=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">value</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> ... </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p>The above will be converted to <code>:[someattr]</code> in in-DOM templates. If your component has a <code>someAttr</code> property instead of <code>someattr</code>, your code won&#39;t work. Templates inside Single-File Components are <strong>not</strong> subject to this constraint.</p><h3 id="modifiers" tabindex="-1">Modifiers <a class="header-anchor" href="#modifiers" aria-hidden="true">#</a></h3><p>Modifiers are special postfixes denoted by a dot, which indicate that a directive should be bound in some special way. For example, the <code>.prevent</code> modifier tells the <code>v-on</code> directive to call <code>event.preventDefault()</code> on the triggered event:</p><div class="language-vue-html"><button class="copy"></button><span class="lang">template</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">form</span><span style="color:#89DDFF;"> @</span><span style="color:#C792EA;">submit</span><span style="color:#89DDFF;">.</span><span style="color:#C792EA;">prevent</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">onSubmit</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">...</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">form</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><p>You&#39;ll see other examples of modifiers later, <a href="./event-handling.html#event-modifiers">for <code>v-on</code></a> and <a href="./forms.html#modifiers">for <code>v-model</code></a>, when we explore those features.</p><p>And finally, here&#39;s the full directive syntax visualized:</p><p><img src="/docs/assets/directive.69c37117.png" alt="directive syntax graph"></p>',74),y=JSON.parse('{"title":"Template Syntax","description":"","frontmatter":{},"headers":[{"level":2,"title":"Text Interpolation","slug":"text-interpolation","link":"#text-interpolation","children":[]},{"level":2,"title":"Raw HTML","slug":"raw-html","link":"#raw-html","children":[]},{"level":2,"title":"Attribute Bindings","slug":"attribute-bindings","link":"#attribute-bindings","children":[{"level":3,"title":"Shorthand","slug":"shorthand","link":"#shorthand","children":[]},{"level":3,"title":"Boolean Attributes","slug":"boolean-attributes","link":"#boolean-attributes","children":[]},{"level":3,"title":"Dynamically Binding Multiple Attributes","slug":"dynamically-binding-multiple-attributes","link":"#dynamically-binding-multiple-attributes","children":[]}]},{"level":2,"title":"Using JavaScript Expressions","slug":"using-javascript-expressions","link":"#using-javascript-expressions","children":[{"level":3,"title":"Expressions Only","slug":"expressions-only","link":"#expressions-only","children":[]},{"level":3,"title":"Calling Functions","slug":"calling-functions","link":"#calling-functions","children":[]},{"level":3,"title":"Restricted Globals Access","slug":"restricted-globals-access","link":"#restricted-globals-access","children":[]}]},{"level":2,"title":"Directives","slug":"directives","link":"#directives","children":[{"level":3,"title":"Arguments","slug":"arguments","link":"#arguments","children":[]},{"level":3,"title":"Dynamic Arguments","slug":"dynamic-arguments","link":"#dynamic-arguments","children":[]},{"level":3,"title":"Modifiers","slug":"modifiers","link":"#modifiers","children":[]}]}],"relativePath":"guide/essentials/template-syntax.md"}'),D=Object.assign({name:"guide/essentials/template-syntax.md"},{setup(o){const p='<span style="color: red">This should be red.</span>';return(o,y)=>{const D=s("VueJobs");return e(),a("div",null,[r,n(D),c,t("div",{class:"demo"},[t("p",null,"Using text interpolation: "+l(p)),t("p",null,[i,t("span",{innerHTML:p})])]),d])}}});export{y as __pageData,D as default};
