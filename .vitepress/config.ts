import fs from 'fs'
import path from 'path'
import { defineConfigWithTheme } from 'vitepress'
import type { Config as ThemeConfig } from '@vue/theme'
import baseConfig from '@vue/theme/config'
import { headerPlugin } from './headerMdPlugin'
import { jobsPlugin } from './jobsMdPlugin'

const nav: ThemeConfig['nav'] = [
  {
    text: '文档',
    link: 'guide/docs-overview.md',
    activeMatch: `^/(guide|style-guide|cookbook|examples)/`
    // items: [
    //   { text: 'Overview', link: 'guide/docs-overview.md' }
      // { text: 'Tutorial', link: '/tutorial/' },
      // { text: 'Examples', link: '/examples/' },
      // { text: 'Quick Start', link: '/guide/quick-start' }
      // { text: 'Style Guide', link: '/style-guide/' },
    // ]
  },
  {
    text: 'API',
    activeMatch: `^/api/`,
    link: ''
    // link: '/api/'
  },
  {
    text: 'Github',
    link: 'https://github.com/lanbingcloud'
  },
  {
    text: '视频',
    link: 'https://space.bilibili.com/404408807/?spm_id_from=333.999.0.0'
  },
  {
    text: '社区',
    link: ''
  }
  // {
  //   text: 'Ecosystem',
  //   activeMatch: `^/ecosystem/`,
  //   items: [
  //     {
  //       text: 'Resources',
  //       items: [
  //         { text: 'Partners', link: '/partners/' },
  //         { text: 'Themes', link: '/ecosystem/themes' },
  //         { text: 'Jobs', link: 'https://vuejobs.com/?ref=vuejs' },
  //         { text: 'T-Shirt Shop', link: 'https://vue.threadless.com/' }
  //       ]
  //     },
  //     {
  //       text: 'Official Libraries',
  //       items: [
  //         { text: 'Vue Router', link: 'https://router.vuejs.org/' },
  //         { text: 'Pinia', link: 'https://pinia.vuejs.org/' },
  //         { text: 'Tooling Guide', link: '/guide/scaling-up/tooling.html' }
  //       ]
  //     },
  //     {
  //       text: 'Video Courses',
  //       items: [
  //         {
  //           text: 'Vue Mastery',
  //           link: 'https://www.vuemastery.com/courses/'
  //         },
  //         {
  //           text: 'Vue School',
  //           link: 'https://vueschool.io/?friend=vuejs&utm_source=Vuejs.org&utm_medium=Link&utm_content=Navbar%20Dropdown'
  //         }
  //       ]
  //     },
  //     {
  //       text: 'Help',
  //       items: [
  //         {
  //           text: 'Discord Chat',
  //           link: 'https://discord.com/invite/HBherRA'
  //         },
  //         {
  //           text: 'GitHub Discussions',
  //           link: 'https://github.com/vuejs/core/discussions'
  //         },
  //         { text: 'DEV Community', link: 'https://dev.to/t/vue' }
  //       ]
  //     },
  //     {
  //       text: 'News',
  //       items: [
  //         { text: 'Blog', link: 'https://blog.vuejs.org/' },
  //         { text: 'Twitter', link: 'https://twitter.com/vuejs' },
  //         { text: 'Newsletter', link: 'https://news.vuejs.org/' },
  //         { text: 'Events', link: 'https://events.vuejs.org/' }
  //       ]
  //     }
  //   ]
  // },
]

export const sidebar: ThemeConfig['sidebar'] = {
  '/guide/': [
    {
      text: '概述',
      items: [
        { text: '概述', link: '/guide/docs-overview' },
      ]
    },
    {
      text: '核心概念',
      items: [
        {
          text: 'gitops',
          link: '/guide/default'
        },
        { text: 'operator', link: '/guide/default' }
      ]
    },
    {
      text: '快速入门',
      items: [
        {
          text: '安装 Nautes-XXXX',
          link: '/guide/default'
        },
        { text: '自动安装部署运行时环境', link: '/guide/default' },
        { text: '自动销毁部署运行时环境', link: '/guide/default' }
      ]
    },
    {
      text: '用户指南',
      items: [
        { text: '注册集群', link: '/guide/default' },
        { text: '维护产品', link: '/guide/default' },
        { text: '维护项目', link: '/guide/default' },
        { text: '维护代码库', link: '/guide/default' },
        { text: '维护环境', link: '/guide/default' },
        { text: '维护部署运行时', link: '/guide/default' },
        { text: '跟踪部署过程和结果', link: '/guide/default' }
      ]
    },
    {
      text: '开发指南',
      items: [
        { text: '筹备中', link: '/guide/default' }
      ]
    },
    {
      text: '运维指南',
      items: [
        { text: '筹备中', link: '/guide/default' }
      ]
    },
    {
      text: 'API参考',
      items: [
        {
          text: '筹备中',
          link: '/guide/default'
        }
      ]
    },
    {
      text: '常见问题',
      items: [
        { text: '筹备中', link: '/guide/default' }
      ]
    },
    {
      text: '演示DEMO',
      items: [
        {
          text: '通过ArgoCD部署和管理CI/CD环境',
          link: '/guide/CICD-quickStart'
        },
        {
          text: '用Tekton和ArgoEvents构建Kubernetes原生的流水线',
          link: '/guide/CICD-quickStart'
        },
        { text: '集成Tekton和ArgoCD', link: '/guide/default' },
        { text: 'Github界面访问Tekton和ArgoCD', link: '/guide/default' },
        { text: '实现Kubernetes/Tekton/ArgoCD的统一认证', link: '/guide/default' },
        { text: '实现Kubernetes/Tekton/ArgoCD的统一权限', link: '/guide/default' }
      ]
    }
  ],
  '/api/': [
    {
      text: 'Global API',
      items: [
        { text: 'Application', link: '/api/application' },
        {
          text: 'General',
          link: '/api/general'
        }
      ]
    },
    {
      text: 'Composition API',
      items: [
        { text: 'setup()', link: '/api/composition-api-setup' },
        {
          text: 'Reactivity: Core',
          link: '/api/reactivity-core'
        },
        {
          text: 'Reactivity: Utilities',
          link: '/api/reactivity-utilities'
        },
        {
          text: 'Reactivity: Advanced',
          link: '/api/reactivity-advanced'
        },
        {
          text: 'Lifecycle Hooks',
          link: '/api/composition-api-lifecycle'
        },
        {
          text: 'Dependency Injection',
          link: '/api/composition-api-dependency-injection'
        }
      ]
    },
    {
      text: 'Options API',
      items: [
        { text: 'Options: State', link: '/api/options-state' },
        { text: 'Options: Rendering', link: '/api/options-rendering' },
        {
          text: 'Options: Lifecycle',
          link: '/api/options-lifecycle'
        },
        {
          text: 'Options: Composition',
          link: '/api/options-composition'
        },
        { text: 'Options: Misc', link: '/api/options-misc' },
        {
          text: 'Component Instance',
          link: '/api/component-instance'
        }
      ]
    },
    {
      text: 'Built-ins',
      items: [
        { text: 'Directives', link: '/api/built-in-directives' },
        { text: 'Components', link: '/api/built-in-components' },
        {
          text: 'Special Elements',
          link: '/api/built-in-special-elements'
        },
        {
          text: 'Special Attributes',
          link: '/api/built-in-special-attributes'
        }
      ]
    },
    {
      text: 'Single-File Component',
      items: [
        { text: 'Syntax Specification', link: '/api/sfc-spec' },
        { text: '<script setup>', link: '/api/sfc-script-setup' },
        { text: 'CSS Features', link: '/api/sfc-css-features' }
      ]
    },
    {
      text: 'Advanced APIs',
      items: [
        { text: 'Render Function', link: '/api/render-function' },
        { text: 'Server-Side Rendering', link: '/api/ssr' },
        { text: 'TypeScript Utility Types', link: '/api/utility-types' },
        { text: 'Custom Renderer', link: '/api/custom-renderer' }
      ]
    }
  ],
  '/examples/': [
    {
      text: 'Basic',
      items: [
        {
          text: 'Hello World',
          link: '/examples/#hello-world'
        },
        {
          text: 'Handling User Input',
          link: '/examples/#handling-input'
        },
        {
          text: 'Attribute Bindings',
          link: '/examples/#attribute-bindings'
        },
        {
          text: 'Conditionals and Loops',
          link: '/examples/#conditionals-and-loops'
        },
        {
          text: 'Form Bindings',
          link: '/examples/#form-bindings'
        },
        {
          text: 'Simple Component',
          link: '/examples/#simple-component'
        }
      ]
    },
    {
      text: 'Practical',
      items: [
        {
          text: 'Markdown Editor',
          link: '/examples/#markdown'
        },
        {
          text: 'Fetching Data',
          link: '/examples/#fetching-data'
        },
        {
          text: 'Grid with Sort and Filter',
          link: '/examples/#grid'
        },
        {
          text: 'Tree View',
          link: '/examples/#tree'
        },
        {
          text: 'SVG Graph',
          link: '/examples/#svg'
        },
        {
          text: 'Modal with Transitions',
          link: '/examples/#modal'
        },
        {
          text: 'List with Transitions',
          link: '/examples/#list-transition'
        },
        {
          text: 'TodoMVC',
          link: '/examples/#todomvc'
        }
      ]
    },
    {
      // https://eugenkiss.github.io/7guis/
      text: '7 GUIs',
      items: [
        {
          text: 'Counter',
          link: '/examples/#counter'
        },
        {
          text: 'Temperature Converter',
          link: '/examples/#temperature-converter'
        },
        {
          text: 'Flight Booker',
          link: '/examples/#flight-booker'
        },
        {
          text: 'Timer',
          link: '/examples/#timer'
        },
        {
          text: 'CRUD',
          link: '/examples/#crud'
        },
        {
          text: 'Circle Drawer',
          link: '/examples/#circle-drawer'
        },
        {
          text: 'Cells',
          link: '/examples/#cells'
        }
      ]
    }
  ],
  '/style-guide/': [
    {
      text: 'Style Guide',
      items: [
        {
          text: 'Overview',
          link: '/style-guide/'
        },
        {
          text: 'A - Essential',
          link: '/style-guide/rules-essential'
        },
        {
          text: 'B - Strongly Recommended',
          link: '/style-guide/rules-strongly-recommended'
        },
        {
          text: 'C - Recommended',
          link: '/style-guide/rules-recommended'
        },
        {
          text: 'D - Use with Caution',
          link: '/style-guide/rules-use-with-caution'
        }
      ]
    }
  ]
}

// Placeholder of the i18n config for @vuejs-translations.
// const i18n: ThemeConfig['i18n'] = {
// }

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,

  lang: 'en-US',
  title: 'Lanbing', // 修改标题
  // description: 'Vue.js - The Progressive JavaScript Framework',
  srcDir: 'src',
  srcExclude: ['tutorial/**/description.md'],
  scrollOffset: 'header',
  outDir: '.vitepress/dist',
  base: '/docs/',

  head: [
    // ['meta', { name: 'theme-color', content: '#3c8772' }],
    // ['meta', { name: 'twitter:site', content: '@vuejs' }],
    // ['meta', { name: 'twitter:card', content: 'summary' }],
    // [
    //   'meta',
    //   {
    //     name: 'twitter:image',
    //     content: 'https://vuejs.org/images/logo.png'
    //   }
    // ],
    // [
    //   'link',
    //   {
    //     rel: 'preconnect',
    //     href: 'https://sponsors.vuejs.org'
    //   }
    // ],
    // [
    //   'script',
    //   {},
    //   fs.readFileSync(
    //     path.resolve(__dirname, './inlined-scripts/restorePreference.js'),
    //     'utf-8'
    //   )
    // ],
    // [
    //   'script',
    //   {
    //     src: 'https://cdn.usefathom.com/script.js',
    //     'data-site': 'XNOLWPLB',
    //     'data-spa': 'auto',
    //     defer: ''
    //   }
    // ]
  ],

  themeConfig: {
    nav,
    sidebar
    // 修改顶部栏位的内容，在此配置【.】
    // sidebarDepth : 3
    // Placeholder of the i18n config for @vuejs-translations.
    // i18n,

    // algolia: {
    //   indexName: 'vuejs',
    //   appId: 'ML0LEBN7FQ',
    //   apiKey: 'f49cbd92a74532cc55cfbffa5e5a7d01',
    //   searchParameters: {
    //     facetFilters: ['version:v3']
    //   }
    // },

    // carbonAds: {
    //   code: 'CEBDT27Y',
    //   placement: 'vuejsorg'
    // },

    // socialLinks: [
    //   { icon: 'languages', link: '/translations/' },
    //   { icon: 'github', link: 'https://github.com/vuejs/' },
    //   { icon: 'twitter', link: 'https://twitter.com/vuejs' },
    //   { icon: 'discord', link: 'https://discord.com/invite/HBherRA' }
    // ],

    // editLink: {
    //   repo: 'vuejs/docs',
    //   text: 'Edit this page on GitHub'
    // },

    // footer: {
    //   license: {
    //     text: 'MIT License',
    //     link: 'https://opensource.org/licenses/MIT'
    //   },
    //   copyright: `Copyright © 2014-${new Date().getFullYear()} Evan You`
    // }
  },

  markdown: {
    config(md) {
      md.use(headerPlugin).use(jobsPlugin)
      // lineNumbers: true
    }
    // lineNumbers: true
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
