import MarkdownIt from 'markdown-it'

const excludedPages = [
    // 自定义markdown begin
  'index.md',
  'guide/default.md',
  'guide/user-guide/introduction.md',
  'guide/user-guide/quickstart-01.md',
  'guide/user-guide/quickstart-02.md',
  'guide/user-guide/quickstart-03.md',
  'guide/user-guide/user-guide-00.md',
  'guide/user-guide/user-guide-01.md',
  'guide/user-guide/user-guide-02.md',
  'guide/user-guide/user-guide-03.md',
  'guide/user-guide/user-guide-04.md',
  'guide/user-guide/user-guide-05.md',
  'guide/user-guide/user-guide-06.md'
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
