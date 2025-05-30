import shikiPlugin from "./libs/shiki.js";

export default async (eleventyConfig) => {
  eleventyConfig.addPlugin(shikiPlugin, {
    themes: ["dark-plus"],
    langs: ['html', 'css', 'javascript', 'typescript', 'vue']
  });

  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.addFilter("sortByDate", (items) => {
    return items.sort((a, b) => {
      let dateANumeric = new Date(a.date);
      let dateBNumeric = new Date(b.date);
      return dateBNumeric - dateANumeric;
    });
  });

  eleventyConfig.addFilter('dateFilter', function(date) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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