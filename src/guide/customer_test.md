## 目标
基于vuejs项目和github搭建文档服务环境。

## 本地调试
```Shell
# 卸载宿主机低版本的nodejs，vuejs项目要求nodejs版本至少在14.0.0或者更高版本; 
apt-get remove nodejs
# 安装nodejs，下载版本高于14.0.0的二进制包并解压缩（此处的下载目录为/opt/vuepress/），设置为环境变量； 
cd /opt/vuepress/
tar -xJvf node-v18.12.1-linux-x64.tar.xz -C /usr/local/lib/nodejs 
export PATH=/usr/local/lib/nodejs/node-v18.12.1-linux-x64/bin:$PATH
# 刷新配置让环境变量生效
. ~/.profile
# 查看nodejs版本
node -v
# 安装pnpm
npm install -g pnpm
# 安装yarn（官网上使用yarn启动服务，本地调试无效）
npm install --global yarn
# clone fork下来的vuejs代码库；cd到代码库根目录，启动本地服务
pnpm i
# 本地调试启动服务
pnpm run dev
# 向目标目录（默认为.vitepress/dist）构建文档
npm run build
# 本地调试启动服务
npm run serve
```

## 服务端部署
1. 采用github actions将main分支构建出来的文件deploy到新分支，此时的文件指的是mkdown构成的目录； 
- 要点：使用本地调试通过的命令，替换workflow中github action涉及的命令，职责就是将源文件目录（src）build到目标目录(.vitepress/dist)。下文展示几个关键文件配置。
```ts
// .vitepress/config.ts
export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,

  lang: 'en-US',
  title: 'Vue.js',
  description: 'Vue.js - The Progressive JavaScript Framework',
  srcDir: 'src',
  srcExclude: ['tutorial/**/description.md'],
  scrollOffset: 'header',
  // 指定构建输出目录
  outDir: '.vitepress/dist',
  // 指定base目录，必须是github项目的repo名称，例如：https://github.com/<user-account>/<repo-name>
  base: '/docs/',
  ......
```

```json
// package.json
{
  "engines": {
    "node": ">=14.0.0"
  },
  "scripts": {
    // 本地调试的脚本配置
    "dev": "vitepress",
    "build": "vitepress build",
    "serve": "vitepress serve --port 9080",
    "preinstall": "npx only-allow pnpm",
    "docs:build": "vitepress build docs",
    "docs:serve": "vitepress serve docs --port 9080"
  },
  ......
```

```yaml
# .github/workflows/static.yml
name: Deploy
on:
  push:
    branches:
      - main
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v3
        with:
          # node版本不能低于14.0.0
          node-version: 18
      # 以下步骤的目的是构建文档到目标目录，根据本地调试时的命令调整
      - name: Build-0
        run: npm install -g pnpm
      - name: Build-1
        run: pnpm i 
      - name: Build-3
        run: npm run build
      # 使用github action将publish_dir的文档部署到新分支gh-pages
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: .vitepress/dist
          # cname: example.com # if wanna deploy to custom domain
```

2. 通过github界面配置，指定代码库的指定分支、指定目录作为文档服务； 
- 进入github界面，操作路径：Settings-pages，新增page； 填写信息包括：内容来源（分支、相对目录）、域名（可选）； 提交之后等待几分钟，即可根据站点路径访问文档。


## 配置
### 主面板去掉广告
md文件头部添加配置，同时.vitepress/jobsMdPlugin.ts引用相关文件。
```md
<!-- md文件头部 -->
---
footer: false
---
```

```ts
const excludedPages = [
  'guide/introduction.md',
  'guide/quick-start.md',
  'guide/customer_test.md', // 测试
  ......
]
```
### 配置md文件当前界面的显示大纲层级
md文件头部添加配置。
```md
<!-- md文件头部，添加后显示二级和三级大纲，否则只显示二级大纲 -->
---
outline: deep
---
```

## 遗留问题
### vitepress【2022.11.17 未完成】
1. 正文内容：图片不显示； 
2. 使用yarn本地启动服务报404错误；
yarn docs:build（无法生成dist目录下的文档）
yarn docs:serve（无法启动服务） 

## 参考链接

| 概述 | 链接 | 备注 |
| :-----| :---- | :----: |
| vuejs项目源码 | https://github.com/vuejs/docs |  |
| github pages部署（github actions） | https://vitepress.vuejs.org/guide/deploying |  |
| github pages界面维护 | https://medium.com/@Roli_Dori/deploy-vue-cli-3-project-to-github-pages-ebeda0705fbd | 仅参考维护github page部分 |
| 安装nodejs | https://github.com/nodejs/help/wiki/Installation |  |