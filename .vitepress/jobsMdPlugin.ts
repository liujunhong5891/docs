import MarkdownIt from 'markdown-it'

const excludedPages = [
  'guide/introduction.md',
  'guide/quick-start.md',
  'guide/essentials/computed.md',
  'guide/essentials/conditional.md',
  'guide/essentials/list.md',
  'guide/essentials/event-handling.md',
  'guide/essentials/forms.md',
  'guide/components/registration.md',
  'guide/components/props.md',
  'guide/components/events.md',
  'guide/components/slots.md',
  'guide/built-ins/teleport.md',
  'about/faq.md',
  'about/team.md',
  'about/releases.md',
  'about/community-guide.md',
  'about/coc.md',
  'sponsor/index.md',
  'translations/index.md',
  // 自定义markdown begin
  'index.md',
  'guide/customer_test.md', 
  'guide/CICD-quickStart.md',
  'guide/docs-overview.md',
  'guide/default.md',
  'guide/user-guide/quickstart-01.md',
  'guide/user-guide/user-guide-01.md',
  'guide/user-guide/user-guide-00.md'
  // 自定义markdown end
]

export const jobsPlugin = (md: MarkdownIt) => {
  md.renderer.rules.heading_close = (tokens, i, options, env, self) => {
    const relativePath = env.relativePath
    const renderedContent = self.renderToken(tokens, i, options)

    return excludedPages.includes(relativePath)
      ? renderedContent
      : renderedContent.replace(/<\/h1>/, '</h1><VueJobs/>')
  }
}
