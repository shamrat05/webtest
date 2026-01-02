# How to Unpublish Blog Posts (Without Deleting)

This guide shows you how to easily unpublish blog posts without permanently deleting them.

## Quick Method

To unpublish a blog post, simply edit the post's markdown file and change or remove the `published` flag:

### To Unpublish a Post:
1. Open the blog post file (e.g., `src/content/blog/your-post-name.md`)
2. Find the frontmatter section at the top (between the `---` lines)
3. Change `published: true` to `published: false`, OR remove the `published` line entirely

### Example:

**Published post (default):**
```yaml
---
layout: layouts/post.njk
title: "Your Blog Post Title"
date: 2025-01-02
description: "Post description"
published: true
---
```

**Unpublished post:**
```yaml
---
layout: layouts/post.njk
title: "Your Blog Post Title"
date: 2025-01-02
description: "Post description"
published: false
---
```

**OR simply remove the published line:**
```yaml
---
layout: layouts/post.njk
title: "Your Blog Post Title"
date: 2025-01-02
description: "Post description"
---
```

## What Happens When You Unpublish

- ❌ Post will be hidden from the blog index page
- ❌ Post will be hidden from homepage latest posts section
- ❌ Post will not appear in the RSS feed
- ❌ Post will not be included in the sitemap
- ✅ Post file remains in your project (not deleted)
- ✅ Post can be republished anytime by setting `published: true`
- ✅ Direct URL to the post will still work if someone has the link

## Republishing

To republish a post, simply edit the file again and add or change `published: true`.

## Current Published Posts

Your existing blog posts that currently have `published: true`:
- Data-Driven Decision Making in Operations
- The Future of Digital Banking in Bangladesh  
- The Ultimate SEO Cheat Sheet: How to Rank on Google and AI Search in 2025

## After Making Changes

After editing any blog post files, remember to:
1. Save the file
2. Run `npm run build` to rebuild the site
3. Deploy your changes

The system automatically filters out unpublished posts from all public-facing pages while keeping them safe in your project files.