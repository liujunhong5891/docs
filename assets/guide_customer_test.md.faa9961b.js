import{_ as s,o as n,c as a,a as l}from"./app.699c64d2.js";const p=JSON.parse('{"title":"目标","description":"","frontmatter":{"footer":false},"headers":[{"level":1,"title":"目标","slug":"目标","link":"#目标","children":[]},{"level":1,"title":"本地调试","slug":"本地调试","link":"#本地调试","children":[]},{"level":1,"title":"服务端部署","slug":"服务端部署","link":"#服务端部署","children":[]},{"level":1,"title":"参考链接","slug":"参考链接","link":"#参考链接","children":[]},{"level":1,"title":"遗留问题","slug":"遗留问题","link":"#遗留问题","children":[{"level":2,"title":"vitepress【2022.11.17 未完成】","slug":"vitepress【2022-11-17-未完成】","link":"#vitepress【2022-11-17-未完成】","children":[]}]}],"relativePath":"guide/customer_test.md"}'),o={name:"guide/customer_test.md"},e=[l('<h1 id="目标" tabindex="-1">目标 <a class="header-anchor" href="#目标" aria-hidden="true">#</a></h1><p>基于vuejs项目和github搭建文档服务环境。</p><h1 id="本地调试" tabindex="-1">本地调试 <a class="header-anchor" href="#本地调试" aria-hidden="true">#</a></h1><div class="language-Shell"><button class="copy"></button><span class="lang">Shell</span><pre><code><span class="line"><span style="color:#676E95;"># 卸载宿主机低版本的nodejs，vuejs项目要求nodejs版本至少在14.0.0或者更高版本; </span></span>\n<span class="line"><span style="color:#A6ACCD;">apt-get remove nodejs</span></span>\n<span class="line"><span style="color:#676E95;"># 安装nodejs，下载版本高于14.0.0的二进制包并解压缩（此处的下载目录为/opt/vuepress/），设置为环境变量； </span></span>\n<span class="line"><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> /opt/vuepress/</span></span>\n<span class="line"><span style="color:#A6ACCD;">tar -xJvf node-v18.12.1-linux-x64.tar.xz -C /usr/local/lib/nodejs </span></span>\n<span class="line"><span style="color:#C792EA;">export</span><span style="color:#A6ACCD;"> PATH=/usr/local/lib/nodejs/node-v18.12.1-linux-x64/bin:</span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">PATH</span></span>\n<span class="line"><span style="color:#676E95;"># 刷新配置让环境变量生效</span></span>\n<span class="line"><span style="color:#82AAFF;">.</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">~</span><span style="color:#A6ACCD;">/.profile</span></span>\n<span class="line"><span style="color:#676E95;"># 查看nodejs版本</span></span>\n<span class="line"><span style="color:#A6ACCD;">node -v</span></span>\n<span class="line"><span style="color:#676E95;"># 安装pnpm</span></span>\n<span class="line"><span style="color:#A6ACCD;">npm install -g pnpm</span></span>\n<span class="line"><span style="color:#676E95;"># 安装yarn（官网上使用yarn启动服务，本地调试无效）</span></span>\n<span class="line"><span style="color:#A6ACCD;">npm install --global yarn</span></span>\n<span class="line"><span style="color:#676E95;"># clone fork下来的vuejs代码库；cd到代码库根目录，启动本地服务</span></span>\n<span class="line"><span style="color:#A6ACCD;">pnpm i</span></span>\n<span class="line"><span style="color:#676E95;"># 本地调试启动服务</span></span>\n<span class="line"><span style="color:#A6ACCD;">pnpm run dev</span></span>\n<span class="line"><span style="color:#676E95;"># 向目标目录（默认为.vitepress/dist）构建文档</span></span>\n<span class="line"><span style="color:#A6ACCD;">npm run build</span></span>\n<span class="line"><span style="color:#676E95;"># 本地调试启动服务</span></span>\n<span class="line"><span style="color:#A6ACCD;">npm run serve</span></span>\n<span class="line"></span></code></pre></div><h1 id="服务端部署" tabindex="-1">服务端部署 <a class="header-anchor" href="#服务端部署" aria-hidden="true">#</a></h1><ol><li>采用github actions将main分支构建出来的文件deploy到新分支，此时的文件指的是mkdown构成的目录；</li></ol><ul><li>要点：使用本地调试通过的命令，替换workflow中github action涉及的命令，职责就是将源文件目录（src）build到目标目录(.vitepress/dist)。下文展示几个关键文件配置。</li></ul><div class="language-ts"><button class="copy"></button><span class="lang">ts</span><pre><code><span class="line"><span style="color:#676E95;">// .vitepress/config.ts</span></span>\n<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">defineConfigWithTheme</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">ThemeConfig</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">extends</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> baseConfig</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">lang</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">en-US</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">title</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Vue.js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">description</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Vue.js - The Progressive JavaScript Framework</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">srcDir</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">src</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">srcExclude</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">tutorial/**/description.md</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">scrollOffset</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">header</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// 指定构建输出目录</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">outDir</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">.vitepress/dist</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;">// 指定base目录，必须是github项目的repo名称，例如：https://github.com/&lt;user-account&gt;/&lt;repo-name&gt;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">base</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/docs/</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">......</span></span>\n<span class="line"></span></code></pre></div><div class="language-json"><button class="copy"></button><span class="lang">json</span><pre><code><span class="line"><span style="color:#676E95;">// package.json</span></span>\n<span class="line"><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">engines</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">node</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">&gt;=14.0.0</span><span style="color:#89DDFF;">&quot;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">scripts</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;">// 本地调试的脚本配置</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">dev</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">vitepress</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">build</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">vitepress build</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">serve</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">vitepress serve --port 9080</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">preinstall</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">npx only-allow pnpm</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">docs:build</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">vitepress build docs</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">docs:serve</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">vitepress serve docs --port 9080</span><span style="color:#89DDFF;">&quot;</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>\n<span class="line"><span style="color:#A6ACCD;">  ......</span></span>\n<span class="line"></span></code></pre></div><div class="language-yaml"><button class="copy"></button><span class="lang">yaml</span><pre><code><span class="line"><span style="color:#676E95;"># .github/workflows/static.yml</span></span>\n<span class="line"><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Deploy</span></span>\n<span class="line"><span style="color:#FF9CAC;">on</span><span style="color:#89DDFF;">:</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">push</span><span style="color:#89DDFF;">:</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">branches</span><span style="color:#89DDFF;">:</span></span>\n<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">main</span></span>\n<span class="line"><span style="color:#F07178;">jobs</span><span style="color:#89DDFF;">:</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">deploy</span><span style="color:#89DDFF;">:</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">runs-on</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ubuntu-latest</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">steps</span><span style="color:#89DDFF;">:</span></span>\n<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">uses</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">actions/checkout@v3</span></span>\n<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">with</span><span style="color:#89DDFF;">:</span></span>\n<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#F07178;">fetch-depth</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span></span>\n<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">uses</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">actions/setup-node@v3</span></span>\n<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">with</span><span style="color:#89DDFF;">:</span></span>\n<span class="line"><span style="color:#89DDFF;">          </span><span style="color:#676E95;"># node版本不能低于14.0.0</span></span>\n<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#F07178;">node-version</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">18</span></span>\n<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;"># 以下步骤的目的是构建文档到目标目录，根据本地调试时的命令调整</span></span>\n<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Build-0</span></span>\n<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">run</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">npm install -g pnpm</span></span>\n<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Build-1</span></span>\n<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">run</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">pnpm i</span><span style="color:#A6ACCD;"> </span></span>\n<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Build-3</span></span>\n<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">run</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">npm run build</span></span>\n<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;"># 使用github action将publish_dir的文档部署到新分支gh-pages</span></span>\n<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Deploy</span></span>\n<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">uses</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">peaceiris/actions-gh-pages@v3</span></span>\n<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">with</span><span style="color:#89DDFF;">:</span></span>\n<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#F07178;">github_token</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">${{ secrets.GITHUB_TOKEN }}</span></span>\n<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#F07178;">publish_dir</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">.vitepress/dist</span></span>\n<span class="line"><span style="color:#89DDFF;">          </span><span style="color:#676E95;"># cname: example.com # if wanna deploy to custom domain</span></span>\n<span class="line"></span></code></pre></div><ol start="2"><li>通过github界面配置，指定代码库的指定分支、指定目录作为文档服务；</li></ol><ul><li>进入github界面，操作路径：Settings-pages，新增page； 填写信息包括：内容来源（分支、相对目录）、域名（可选）； 提交之后等待几分钟，即可根据站点路径访问文档。</li></ul><h1 id="参考链接" tabindex="-1">参考链接 <a class="header-anchor" href="#参考链接" aria-hidden="true">#</a></h1><table><thead><tr><th style="text-align:left;">概述</th><th style="text-align:left;">链接</th><th style="text-align:center;">备注</th></tr></thead><tbody><tr><td style="text-align:left;">vuejs项目源码</td><td style="text-align:left;"><a href="https://github.com/vuejs/docs" target="_blank" rel="noreferrer">https://github.com/vuejs/docs</a></td><td style="text-align:center;"></td></tr><tr><td style="text-align:left;">github pages部署（github actions）</td><td style="text-align:left;"><a href="https://vitepress.vuejs.org/guide/deploying" target="_blank" rel="noreferrer">https://vitepress.vuejs.org/guide/deploying</a></td><td style="text-align:center;"></td></tr><tr><td style="text-align:left;">github pages界面维护</td><td style="text-align:left;"><a href="https://medium.com/@Roli_Dori/deploy-vue-cli-3-project-to-github-pages-ebeda0705fbd" target="_blank" rel="noreferrer">https://medium.com/@Roli_Dori/deploy-vue-cli-3-project-to-github-pages-ebeda0705fbd</a></td><td style="text-align:center;">仅参考维护github page部分</td></tr><tr><td style="text-align:left;">安装nodejs</td><td style="text-align:left;"><a href="https://github.com/nodejs/help/wiki/Installation" target="_blank" rel="noreferrer">https://github.com/nodejs/help/wiki/Installation</a></td><td style="text-align:center;"></td></tr></tbody></table><h1 id="遗留问题" tabindex="-1">遗留问题 <a class="header-anchor" href="#遗留问题" aria-hidden="true">#</a></h1><h2 id="vitepress【2022-11-17-未完成】" tabindex="-1">vitepress【2022.11.17 未完成】 <a class="header-anchor" href="#vitepress【2022-11-17-未完成】" aria-hidden="true">#</a></h2><ol><li>正文内容：兼容测试；图片不显示、正文大纲缺少一级大纲呈现；</li><li>整体样式：去广告;</li><li>使用yarn本地启动服务报404错误； yarn docs:build（无法生成dist目录下的文档） yarn docs:serve（无法启动服务）</li></ol>',17)];const t=s(o,[["render",function(s,l,p,o,t,c){return n(),a("div",null,e)}]]);export{p as __pageData,t as default};
