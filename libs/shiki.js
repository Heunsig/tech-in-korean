// https://www.hoeser.dev/blog/2023-02-07-eleventy-shiki-simple/

import { createHighlighter } from "shiki";

export default (eleventyConfig, options) => {
  eleventyConfig.amendLibrary("md", () => {})
  eleventyConfig.on('eleventy.before', async () => {
    const highlighter = await createHighlighter(options)
    eleventyConfig.amendLibrary("md", (mdLib) => {
      mdLib.set({
        highlight: (code, lang) => highlighter.codeToHtml(code, { lang, theme: 'dark-plus' })
      })
    })
  })
}