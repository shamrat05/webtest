#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

/**
 * Minifies CSS and JavaScript files using esbuild
 */
async function minifyAssets() {
  console.log('🚀 Starting asset minification...');
  
  // Define paths
  const srcAssetsDir = path.join(__dirname, '..', 'src', 'assets');
  const siteAssetsDir = path.join(__dirname, '..', '_site', 'assets');
  
  // Bundle Analytics
  await bundleAnalytics(srcAssetsDir, siteAssetsDir);

  // Minify CSS
  await minifyCSS(srcAssetsDir, siteAssetsDir);
  
  // Minify JavaScript
  await minifyJS(srcAssetsDir, siteAssetsDir);
  
  console.log('✅ Asset minification completed!');
}

/**
 * Bundles Vercel Analytics using esbuild
 */
async function bundleAnalytics(srcDir, destDir) {
  console.log('📊 Bundling Analytics...');
  const entryPoint = path.join(srcDir, 'js', 'vercel-analytics.js');
  const destJsDir = path.join(destDir, 'js');
  const outfile = path.join(destJsDir, 'vercel-analytics.js');

  if (!fs.existsSync(entryPoint)) {
     console.log('⚠️ Analytics source file not found, skipping...');
     return;
  }

  // Ensure destination directory exists
  if (!fs.existsSync(destJsDir)) {
    fs.mkdirSync(destJsDir, { recursive: true });
  }

  try {
    await esbuild.build({
      entryPoints: [entryPoint],
      outfile: outfile,
      bundle: true,
      minify: true,
      platform: 'browser',
      target: ['es2020'],
    });
    console.log('  ✅ Analytics bundled successfully');
  } catch (error) {
    console.error('  ❌ Error bundling analytics:', error);
  }
}

/**
 * Minifies CSS files with safe minification
 */
async function minifyCSS(srcDir, destDir) {
  console.log('📄 Minifying CSS files...');
  
  const cssDir = path.join(srcDir, 'css');
  const destCssDir = path.join(destDir, 'css');
  
  if (!fs.existsSync(cssDir)) {
    console.log('⚠️  CSS directory not found, skipping...');
    return;
  }
  
  const cssFiles = fs.readdirSync(cssDir).filter(file => file.endsWith('.css'));
  
  for (const file of cssFiles) {
    const srcPath = path.join(cssDir, file);
    const destPath = path.join(destCssDir, file);
    
    try {
      const content = fs.readFileSync(srcPath, 'utf8');
      
      // Safe CSS minification - preserve structure but remove unnecessary whitespace
      const minified = content
        // Remove multi-line comments but preserve important ones
        .replace(/\/\*[\s\S]*?\*\//g, match => {
          // Keep important comments like licenses or special markers
          if (match.includes('@preserve') || match.includes('copyright') || match.includes('license')) {
            return match;
          }
          return '';
        })
        // Remove extra whitespace but preserve some formatting
        .replace(/\n\s*\n/g, '\n') // Remove empty lines
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .replace(/;\s*}/g, '}') // Remove last semicolon in rules
        .replace(/\s{\s*/g, '{') // Remove spaces around {
        .replace(/}\s*/g, '}') // Remove spaces after }
        .replace(/;\s*/g, ';') // Remove spaces after semicolons
        .replace(/,\s*/g, ',') // Remove spaces after commas
        .replace(/\s*:\s*/g, ':') // Remove spaces around colons
        .replace(/\s*;\s*/g, ';') // Clean up semicolon spacing
        .trim();
      
      // Ensure destination directory exists
      if (!fs.existsSync(destCssDir)) {
        fs.mkdirSync(destCssDir, { recursive: true });
      }
      
      fs.writeFileSync(destPath, minified);
      const originalSize = fs.statSync(srcPath).size;
      const minifiedSize = minified.length;
      const reduction = ((1 - minifiedSize / originalSize) * 100).toFixed(1);
      console.log(`  ✅ Minified: ${file} (${reduction}% smaller)`);
      
    } catch (error) {
      console.error(`  ❌ Error minifying ${file}:`, error.message);
      // Copy original file if minification fails
      const destCssDir = path.join(destDir, 'css');
      if (!fs.existsSync(destCssDir)) {
        fs.mkdirSync(destCssDir, { recursive: true });
      }
      fs.copyFileSync(srcPath, path.join(destCssDir, file));
      console.log(`  📋 Copied original: ${file}`);
    }
  }
}

/**
 * Minifies JavaScript files using esbuild
 */
async function minifyJS(srcDir, destDir) {
  console.log('📜 Minifying JavaScript files...');
  
  const jsDir = path.join(srcDir, 'js');
  const destJsDir = path.join(destDir, 'js');
  
  if (!fs.existsSync(jsDir)) {
    console.log('⚠️  JavaScript directory not found, skipping...');
    return;
  }
  
  // Exclude vercel-analytics.js as it is handled by bundleAnalytics
  const jsFiles = fs.readdirSync(jsDir).filter(file => file.endsWith('.js') && file !== 'vercel-analytics.js');
  
  for (const file of jsFiles) {
    const srcPath = path.join(jsDir, file);
    const destPath = path.join(destJsDir, file);
    
    try {
      const content = fs.readFileSync(srcPath, 'utf8');
      
      // Simple minification without esbuild for now
      // Remove comments but preserve important ones
      const minified = content
        .replace(/\/\*[\s\S]*?\*\//g, match => {
          if (match.includes('@preserve') || match.includes('license')) {
            return match;
          }
          return '';
        })
        .replace(/\/\/.*$/gm, '') // Remove single-line comments
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .replace(/;\s*}/g, '}') // Remove last semicolon in blocks
        .replace(/{\s*/g, '{') // Remove spaces after {
        .replace(/}\s*/g, '}') // Remove spaces after }
        .replace(/;\s*/g, ';') // Remove spaces after semicolons
        .trim();
      
      // Ensure destination directory exists
      if (!fs.existsSync(destJsDir)) {
        fs.mkdirSync(destJsDir, { recursive: true });
      }
      
      fs.writeFileSync(destPath, minified);
      
      const originalSize = fs.statSync(srcPath).size;
      const minifiedSize = minified.length;
      const reduction = ((1 - minifiedSize / originalSize) * 100).toFixed(1);
      console.log(`  ✅ Minified: ${file} (${reduction}% smaller)`);
      
    } catch (error) {
      console.error(`  ❌ Error minifying ${file}:`, error.message);
      // Copy original file if minification fails
      const destJsDir = path.join(destDir, 'js');
      if (!fs.existsSync(destJsDir)) {
        fs.mkdirSync(destJsDir, { recursive: true });
      }
      fs.copyFileSync(srcPath, path.join(destJsDir, file));
      console.log(`  📋 Copied original: ${file}`);
    }
  }
}

// Run the minification
minifyAssets().catch(error => {
  console.error('❌ Minification failed:', error);
  process.exit(1);
});
