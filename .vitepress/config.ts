import fs from 'fs'
import path from 'path'
import { defineConfigWithTheme } from 'vitepress'
import type { Config as ThemeConfig } from '@vue/theme'
import baseConfig from '@vue/theme/config'
import { headerPlugin } from './headerMdPlugin'
import { jobsPlugin } from './jobsMdPlugin'
// .vitepress/config.js
import clientAppEnhance from './clientAppEnhance';

const nav: ThemeConfig['nav'] = [
  {
    text: '文档',
    link: '/guide/user-guide/introduction',
    activeMatch: `^/(guide|style-guide|cookbook|examples)/`
  }
]

export const sidebar: ThemeConfig['sidebar'] = {
  '/guide/': [
    {
      text: '快速入门',
      items: [
        { text: '概述', link: '/guide/user-guide/introduction' },
        { text: '安装部署', link: '/guide/user-guide/quickstart-03' },
        { text: '创建运行时环境', link: '/guide/user-guide/quickstart-01' },
        { text: '销毁运行时环境', link: '/guide/user-guide/quickstart-02' }
      ]
    },
    {
      text: '用户指南',
      items: [
        { text: '主体流程', link: '/guide/user-guide/user-guide-00' },
        { text: '注册集群', link: '/guide/default' },
        { text: '维护产品', link: '/guide/user-guide/user-guide-01' },
        { text: '维护项目', link: '/guide/user-guide/user-guide-02' },
        { text: '维护代码库', link: '/guide/user-guide/user-guide-03' },
        { text: '维护环境', link: '/guide/user-guide/user-guide-04' },
        { text: '维护部署运行时', link: '/guide/user-guide/user-guide-05' },
        { text: '查看部署结果', link: '/guide/user-guide/user-guide-06' }
      ]
    }
  ]
}

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,
  lang: 'en-US',
  title: 'Lanbing', // 修改标题
  srcDir: 'src',
  srcExclude: ['tutorial/**/description.md'],
  scrollOffset: 'header',
  outDir: '.vitepress/dist',
  base: '/docs/',
  clientAppEnhance,
  head: [
  ],

  themeConfig: {
    nav,
    sidebar,
    // 修改 sidebar 宽度
    sidebarWidth: '200px',
    footer: {
      license: {
        text: 'MIT License',
        link: 'https://opensource.org/licenses/MIT'
      },
      copyright: `Copyright © 2014-${new Date().getFullYear()} Evan You`
    }
  },

  markdown: {
    config(md) {
      md.use(headerPlugin).use(jobsPlugin)
    }
  },

  vite: {
    define: {
      __VUE_OPTIONS_API__: false
    },
    optimizeDeps: {
      include: ['gsap', 'dynamics.js'],
      exclude: ['@vue/repl']
    },
    // @ts-ignore
    ssr: {
      external: ['@vue/repl']
    },
    server: {
      host: true,
      fs: {
        // for when developing with locally linked theme
        allow: ['../..']
      }
    },
    build: {
      minify: 'terser',
      chunkSizeWarningLimit: Infinity
    },
    json: {
      stringify: true
    }
  },

  vue: {
    reactivityTransform: true
  }
})
