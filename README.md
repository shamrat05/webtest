# Md. Shamrat Hossain - Portfolio Website with Markdown Blog

A modern, fast portfolio website with an easy-to-use markdown-based blog writing system. This project uses Eleventy (11ty) to transform simple markdown files into beautiful, SEO-optimized HTML pages while preserving the exact design of the original portfolio.

## Features

- **Easy Blog Writing**: Write posts in simple Markdown format
- **Exact Design Preservation**: 100% identical visual appearance to original design
- **Enhanced SEO**: Automatic meta tags, Open Graph, JSON-LD structured data, sitemaps, and RSS feeds
- **Fast Performance**: Static HTML files load instantly
- **Version Control**: All content is stored as plain text files
- **Multiple Writing Options**: Direct markdown editing OR graphical CMS interface

## Quick Start

### Prerequisites

- Node.js installed (version 14 or higher)
- Git installed

### Installation

```bash
# Navigate to project directory
cd shamrat-blog

# Install dependencies
npm install

# Start development server
npm start
```

The site will be available at `http://localhost:8080`

### Building for Production

```bash
# Build static files
npm run build

# Output will be in _site directory
```

## How to Write Blog Posts

### Method 1: Direct Markdown File Creation (Recommended)

Create a new file in `src/content/blog/` with a `.md` extension:

```markdown
---
layout: layouts/post.njk
title: "Your Post Title Here"
date: 2025-01-02
description: "A brief description for SEO and previews"
image: "https://example.com/image.jpg"
category: "Category Name"
tags: ["tag1", "tag2", "tag3"]
---

Your content here using **Markdown** formatting.

## Heading 2

- Bullet point 1
- Bullet point 2

> A quoted section

[Link text](https://example.com)
```

### Method 2: Using Netlify CMS (Graphical Interface)

1. Deploy the site to Netlify
2. Access `/admin/` to open the CMS
3. Click "New Post" to create a blog post visually
4. Write content using the rich text editor
5. Click "Publish" to save and deploy

### Markdown Formatting Guide

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*

- Unordered list
- List item

1. Ordered list
2. List item

[Link text](https://example.com)

![Image alt text](https://example.com/image.jpg)

> Blockquote

---
Horizontal rule
```

## Project Structure

```
shamrat-blog/
├── .eleventy.js           # Eleventy configuration
├── package.json           # Dependencies
├── src/
│   ├── _data/
│   │   └── site.json      # Site configuration
│   ├── _includes/
│   │   ├── layouts/
│   │   │   ├── base.njk   # Main template
│   │   │   └── post.njk   # Blog post template
│   │   └── components/
│   │       ├── seo.njk    # SEO tags
│   │       └── schema.njk # JSON-LD structured data
│   ├── assets/
│   │   ├── css/           # Styles (styles.css)
│   │   ├── js/            # Scripts (script.js)
│   │   └── images/        # Images
│   ├── content/
│   │   └── blog/          # Blog posts (markdown files)
│   ├── index.njk          # Homepage
│   ├── blog/
│   │   └── index.njk      # Blog archive page
│   ├── sitemap.xml.njk    # Sitemap template
│   ├── feed.xml.njk       # RSS feed template
│   ├── robots.txt.njk     # Robots.txt template
│   └── admin/             # Netlify CMS files
│       ├── config.yml     # CMS configuration
│       └── index.html     # CMS entry point
└── _site/                 # Build output (generated)
```

## SEO Features Included

This implementation includes comprehensive SEO optimization:

- **Meta Tags**: Title, description, keywords
- **Open Graph**: Social sharing optimization for Facebook, LinkedIn
- **Twitter Cards**: Twitter sharing optimization
- **Canonical URLs**: Prevents duplicate content issues
- **JSON-LD Structured Data**: BlogPosting schema for rich search results
- **Sitemap.xml**: Automatic sitemap generation
- **RSS Feed**: Atom/RSS feed for subscribers
- **Semantic HTML**: Proper heading hierarchy and HTML5 structure
- **Image Alt Text**: All images include proper alt attributes

## Deployment

### Netlify (Recommended)

1. Push your code to a GitHub repository
2. Connect to Netlify
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `_site`
4. Deploy!

### GitHub Pages

1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. Set source to "GitHub Actions"
4. Create workflow file for Eleventy build

### Vercel

1. Push code to GitHub repository
2. Import to Vercel
3. Configure:
   - Build command: `npm run build`
   - Output directory: `_site`

## Writing Workflow

### Local Development

```bash
# Start local server with hot reload
npm start

# Edit markdown files in src/content/blog/
# Changes appear instantly in browser
```

### Publishing

1. Create or edit markdown file in `src/content/blog/`
2. Commit and push to git
3. Netlify automatically builds and deploys
4. Changes live in ~1 minute

## Customization

### Updating Site Information

Edit `src/_data/site.json`:

```json
{
  "name": "Your Name",
  "description": "Your site description",
  "url": "https://yourdomain.com"
}
```

### Modifying Templates

Templates use Nunjucks (.njk) format. Edit files in `src/_includes/` to modify:

- `layouts/base.njk` - Main HTML structure
- `layouts/post.njk` - Blog post layout
- `components/seo.njk` - SEO meta tags
- `components/schema.njk` - Structured data

## Performance

This static site approach provides excellent performance:

- **Load Time**: < 1 second typically
- **PageSpeed Score**: 95-100
- **Core Web Vitals**: All green metrics
- **Hosting**: Free on Netlify/Vercel/GitHub Pages

## Migration from Previous System

To migrate existing blog posts:

1. Copy HTML content from old posts
2. Convert to Markdown format
3. Create front matter with metadata
4. Save as `.md` file in `src/content/blog/`
5. Verify in local development

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
npm run clean
npm run build
```

### Styles Not Loading

Check that CSS file is in `src/assets/css/styles.css`

### Images Not Showing

Ensure images are in `src/assets/images/` and referenced correctly

## License

MIT License - Feel free to use and modify.

## Credits

- Built with [Eleventy](https://www.11ty.dev/)
- Design based on original portfolio by Md. Shamrat Hossain
