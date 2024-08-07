const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.addFilter("sortByDate", (items) => {
    return items.sort((a, b) => {
      let dateANumeric = new Date(a.date);
      let dateBNumeric = new Date(b.date);
      return dateANumeric - dateBNumeric;
    });
  });

  eleventyConfig.addFilter("filterWIP", (items) => {
    return items.filter(item => !item.data.wip && !item.data.WIP);
  })

  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: "src",
      output: "public"
    },
  }
}