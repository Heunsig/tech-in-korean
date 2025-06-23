import shikiPlugin from "./libs/shiki.js";

export default async (eleventyConfig) => {
  eleventyConfig.addPlugin(shikiPlugin, {
    themes: ["dark-plus"],
    langs: ['html', 'css', 'javascript', 'typescript', 'vue', 'scss']
  });

  eleventyConfig.addPassthroughCopy("src/assets");

  // Transform to handle empty figcaptions
  eleventyConfig.addTransform("figcaption-fallback", function(content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      // Replace empty figcaptions with img alt text
      return content.replace(/<figure[^>]*>([\s\S]*?)<\/figure>/g, (match, figureContent) => {
        // Extract img tag and its alt attribute
        const imgMatch = figureContent.match(/<img[^>]*alt\s*=\s*["']([^"']*)["'][^>]*>/);
        const altText = imgMatch ? imgMatch[1] : '';
        
        // Check if figcaption exists
        const figcaptionMatch = figureContent.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/);
        
        if (figcaptionMatch) {
          // figcaption exists - check if it's empty
          const figcaptionContent = figcaptionMatch[1].trim();
          
          // If figcaption is empty and we have alt text, replace it
          if (!figcaptionContent && altText) {
            return match.replace(
              /<figcaption[^>]*>[\s\S]*?<\/figcaption>/,
              `<figcaption>${altText}</figcaption>`
            );
          }
        } else {
          // figcaption doesn't exist - add one if we have alt text
          if (altText) {
            return match.replace(
              /<\/figure>/,
              `<figcaption>${altText}</figcaption>\n</figure>`
            );
          }
        }
        
        return match;
      });
    }
    return content;
  });

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