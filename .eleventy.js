const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // ===========================================
  // PASSTHROUGH COPY - Preserve Exact Design
  // ===========================================
  
  // Copy all assets directly (CSS, JS, Images)
  // This ensures the design remains 100% identical
  eleventyConfig.addPassthroughCopy("./src/assets");
  
  // Copy any other static files
  eleventyConfig.addPassthroughCopy({ "./src/robots.txt": "/robots.txt" });

  // ===========================================
  // FILTERS
  // ===========================================
  
  // Format date for blog posts (e.g., "Dec 8, 2025")
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("LLL d, yyyy");
  });
  
  // Format date for SEO schema (ISO format)
  eleventyConfig.addFilter("isoDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy-MM-dd");
  });
  
  // Read time calculator
  eleventyConfig.addFilter("readTime", (content) => {
    if (!content) return "1 min read";
    const wordsPerMinute = 200;
    // Strip HTML tags for accurate word count
    const plainText = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const wordCount = plainText.split(' ').length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  });
  
  // Slugify filter for URL generation
  eleventyConfig.addFilter("slugify", (str) => {
    if (!str) return '';
    return str.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  });

  // Check if string starts with prefix
  eleventyConfig.addFilter("startsWith", (str, prefix) => {
    if (!str || !prefix) return false;
    return str.startsWith(prefix);
  });

  // ===========================================
  // COLLECTIONS
  // ===========================================
  
  // Blog posts collection - sorted by date (newest first) - only published posts
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/blog/*.md")
      .filter(post => post.data.published !== false) // Include only published posts
      .sort((a, b) => {
        return b.date - a.date; // Newest first
      });
  });
  
  // Latest posts (for homepage preview) - only published posts
  eleventyConfig.addCollection("latestPosts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/blog/*.md")
      .filter(post => post.data.published !== false) // Include only published posts
      .sort((a, b) => b.date - a.date)
      .slice(0, 3);
  });

  // ===========================================
  // SHORTCODES
  // ===========================================
  
  // Get post URL by title
  eleventyConfig.addShortcode("postUrl", (title) => {
    const posts = eleventyConfig.collections.posts || [];
    const post = posts.find(p => p.data.title === title);
    return post ? post.url : "#";
  });

  // ===========================================
  // CONFIGURATION
  // ===========================================
  
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    // Ensure proper path resolution for Vercel
    pathPrefix: "/"
  };
};
