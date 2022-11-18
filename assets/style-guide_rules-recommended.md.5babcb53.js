import{_ as s,C as n,o as l,c as e,j as a,d as o,e as p,a as t}from"./app.d92a7ebd.js";const c=JSON.parse('{"title":"Priority C Rules: Recommended","description":"","frontmatter":{},"headers":[{"level":2,"title":"Component/instance options order","slug":"component-instance-options-order","link":"#component-instance-options-order","children":[]},{"level":2,"title":"Element attribute order","slug":"element-attribute-order","link":"#element-attribute-order","children":[]},{"level":2,"title":"Empty lines in component/instance options","slug":"empty-lines-in-component-instance-options","link":"#empty-lines-in-component-instance-options","children":[]},{"level":2,"title":"Single-file component top-level element order","slug":"single-file-component-top-level-element-order","link":"#single-file-component-top-level-element-order","children":[]}],"relativePath":"style-guide/rules-recommended.md"}'),r={name:"style-guide/rules-recommended.md"},i=o("h1",{id:"priority-c-rules-recommended",tabindex:"-1"},[p("Priority C Rules: Recommended "),o("a",{class:"header-anchor",href:"#priority-c-rules-recommended","aria-hidden":"true"},"#")],-1),F=t('<p>Where multiple, equally good options exist, an arbitrary choice can be made to ensure consistency. In these rules, we describe each acceptable option and suggest a default choice. That means you can feel free to make a different choice in your own codebase, as long as you&#39;re consistent and have a good reason. Please do have a good reason though! By adapting to the community standard, you will:</p><ol><li>Train your brain to more easily parse most of the community code you encounter</li><li>Be able to copy and paste most community code examples without modification</li><li>Often find new hires are already accustomed to your preferred coding style, at least in regards to Vue</li></ol><h2 id="component-instance-options-order" tabindex="-1">Component/instance options order <a class="header-anchor" href="#component-instance-options-order" aria-hidden="true">#</a></h2><p><strong>Component/instance options should be ordered consistently.</strong></p><p>This is the default order we recommend for component options. They&#39;re split into categories, so you&#39;ll know where to add new properties from plugins.</p><ol><li><p><strong>Global Awareness</strong> (requires knowledge beyond the component)</p><ul><li><code>name</code></li></ul></li><li><p><strong>Template Compiler Options</strong> (changes the way templates are compiled)</p><ul><li><code>compilerOptions</code></li></ul></li><li><p><strong>Template Dependencies</strong> (assets used in the template)</p><ul><li><code>components</code></li><li><code>directives</code></li></ul></li><li><p><strong>Composition</strong> (merges properties into the options)</p><ul><li><code>extends</code></li><li><code>mixins</code></li><li><code>provide</code>/<code>inject</code></li></ul></li><li><p><strong>Interface</strong> (the interface to the component)</p><ul><li><code>inheritAttrs</code></li><li><code>props</code></li><li><code>emits</code></li></ul></li><li><p><strong>Composition API</strong> (the entry point for using the Composition API)</p><ul><li><code>setup</code></li></ul></li><li><p><strong>Local State</strong> (local reactive properties)</p><ul><li><code>data</code></li><li><code>computed</code></li></ul></li><li><p><strong>Events</strong> (callbacks triggered by reactive events)</p><ul><li><code>watch</code></li><li>Lifecycle Events (in the order they are called) <ul><li><code>beforeCreate</code></li><li><code>created</code></li><li><code>beforeMount</code></li><li><code>mounted</code></li><li><code>beforeUpdate</code></li><li><code>updated</code></li><li><code>activated</code></li><li><code>deactivated</code></li><li><code>beforeUnmount</code></li><li><code>unmounted</code></li><li><code>errorCaptured</code></li><li><code>renderTracked</code></li><li><code>renderTriggered</code></li></ul></li></ul></li><li><p><strong>Non-Reactive Properties</strong> (instance properties independent of the reactivity system)</p><ul><li><code>methods</code></li></ul></li><li><p><strong>Rendering</strong> (the declarative description of the component output)</p><ul><li><code>template</code>/<code>render</code></li></ul></li></ol><h2 id="element-attribute-order" tabindex="-1">Element attribute order <a class="header-anchor" href="#element-attribute-order" aria-hidden="true">#</a></h2><p><strong>The attributes of elements (including components) should be ordered consistently.</strong></p><p>This is the default order we recommend for component options. They&#39;re split into categories, so you&#39;ll know where to add custom attributes and directives.</p><ol><li><p><strong>Definition</strong> (provides the component options)</p><ul><li><code>is</code></li></ul></li><li><p><strong>List Rendering</strong> (creates multiple variations of the same element)</p><ul><li><code>v-for</code></li></ul></li><li><p><strong>Conditionals</strong> (whether the element is rendered/shown)</p><ul><li><code>v-if</code></li><li><code>v-else-if</code></li><li><code>v-else</code></li><li><code>v-show</code></li><li><code>v-cloak</code></li></ul></li><li><p><strong>Render Modifiers</strong> (changes the way the element renders)</p><ul><li><code>v-pre</code></li><li><code>v-once</code></li></ul></li><li><p><strong>Global Awareness</strong> (requires knowledge beyond the component)</p><ul><li><code>id</code></li></ul></li><li><p><strong>Unique Attributes</strong> (attributes that require unique values)</p><ul><li><code>ref</code></li><li><code>key</code></li></ul></li><li><p><strong>Two-Way Binding</strong> (combining binding and events)</p><ul><li><code>v-model</code></li></ul></li><li><p><strong>Other Attributes</strong> (all unspecified bound &amp; unbound attributes)</p></li><li><p><strong>Events</strong> (component event listeners)</p><ul><li><code>v-on</code></li></ul></li><li><p><strong>Content</strong> (overrides the content of the element)</p><ul><li><code>v-html</code></li><li><code>v-text</code></li></ul></li></ol><h2 id="empty-lines-in-component-instance-options" tabindex="-1">Empty lines in component/instance options <a class="header-anchor" href="#empty-lines-in-component-instance-options" aria-hidden="true">#</a></h2><p><strong>You may want to add one empty line between multi-line properties, particularly if the options can no longer fit on your screen without scrolling.</strong></p><p>When components begin to feel cramped or difficult to read, adding spaces between multi-line properties can make them easier to skim again. In some editors, such as Vim, formatting options like this can also make them easier to navigate with the keyboard.</p><div class="style-example style-example-good"><h3>Good</h3><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#FFCB6B;">props</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">value</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#FFCB6B;">type</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">String</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#FFCB6B;">required</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">focused</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#FFCB6B;">type</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Boolean</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">default</span><span style="color:#F07178;">: </span><span style="color:#FF9CAC;">false</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">label</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">String</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">icon</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">String</span></span>\n<span class="line"><span style="color:#89DDFF;">},</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#FFCB6B;">computed</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">formattedValue</span><span style="color:#F07178;">() </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// ...</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">inputClasses</span><span style="color:#F07178;">() </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// ...</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#676E95;">// No spaces are also fine, as long as the component</span></span>\n<span class="line"><span style="color:#676E95;">// is still easy to read and navigate.</span></span>\n<span class="line"><span style="color:#FFCB6B;">props</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">value</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#FFCB6B;">type</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">String</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#FFCB6B;">required</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">focused</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#FFCB6B;">type</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Boolean</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">default</span><span style="color:#F07178;">: </span><span style="color:#FF9CAC;">false</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">label</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">String</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#FFCB6B;">icon</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">String</span></span>\n<span class="line"><span style="color:#89DDFF;">},</span></span>\n<span class="line"><span style="color:#FFCB6B;">computed</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">formattedValue</span><span style="color:#F07178;">() </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// ...</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">inputClasses</span><span style="color:#F07178;">() </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// ...</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span></span>\n<span class="line"></span></code></pre></div></div><h2 id="single-file-component-top-level-element-order" tabindex="-1">Single-file component top-level element order <a class="header-anchor" href="#single-file-component-top-level-element-order" aria-hidden="true">#</a></h2><p><strong><a href="/guide/scaling-up/sfc.html">Single-File Components</a> should always order <code>&lt;script&gt;</code>, <code>&lt;template&gt;</code>, and <code>&lt;style&gt;</code> tags consistently, with <code>&lt;style&gt;</code> last, because at least one of the other two is always necessary.</strong></p><div class="style-example style-example-bad"><h3>Bad</h3><div class="language-vue-html"><button class="copy"></button><span class="lang">template</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">/* ... */</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">/* ... */</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">...</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><div class="language-vue-html"><button class="copy"></button><span class="lang">template</span><pre><code><span class="line"><span style="color:#676E95;">&lt;!-- ComponentA.vue --&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">/* ... */</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">...</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">/* ... */</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;">&lt;!-- ComponentB.vue --&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">...</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">/* ... */</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">/* ... */</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div></div><div class="style-example style-example-good"><h3>Good</h3><div class="language-vue-html"><button class="copy"></button><span class="lang">template</span><pre><code><span class="line"><span style="color:#676E95;">&lt;!-- ComponentA.vue --&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">/* ... */</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">...</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">/* ... */</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;">&lt;!-- ComponentB.vue --&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">/* ... */</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">...</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">/* ... */</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div><div class="language-vue-html"><button class="copy"></button><span class="lang">template</span><pre><code><span class="line"><span style="color:#676E95;">&lt;!-- ComponentA.vue --&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">...</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">/* ... */</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">/* ... */</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#676E95;">&lt;!-- ComponentB.vue --&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">...</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">/* ... */</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">/* ... */</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span></span>\n<span class="line"></span></code></pre></div></div>',18);const y=s(r,[["render",function(s,o,p,t,c,r){const y=n("VueJobs");return l(),e("div",null,[i,a(y),F])}]]);export{c as __pageData,y as default};
