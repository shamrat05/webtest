# Particle Animation Fix - Rollback Instructions

## What was changed:

1. **HTML Template (`src/index.njk`):**
   - Added `<div class="hero-particles"></div>` to hero section

2. **JavaScript (`src/assets/js/script.js`):**
   - Updated ParticleManager to use `.hero-particles` selector
   - Changed mobile detection to be less restrictive (480px instead of 768px)
   - Enhanced Chrome Android compatibility with CSS-based particles

3. **CSS (`src/assets/css/styles.css`):**
   - Enhanced `.hero-particles` with better browser support
   - Added CSS fallbacks for limited animation support
   - Improved Chrome Android specific optimizations

## How to rollback:

### Option 1: Restore from backup files
```bash
# Restore HTML template
cp src/index.njk.backup src/index.njk

# If you have a backup of the original JS and CSS files, restore them too
cp src/assets/js/script.js.backup src/assets/js/script.js
cp src/assets/css/styles.css.backup src/assets/css/styles.css
```

### Option 2: Manual rollback (if backup files don't exist)

1. **HTML Template (`src/index.njk`):**
   - Remove line 11: `<div class="hero-particles"></div>`
   - Keep just: `<div class="hero-gradient"></div>`

2. **JavaScript (`src/assets/js/script.js`):**
   - Change `this.container = document.querySelector('.hero-particles');` back to `.particle-container`
   - Change mobile detection back to `if (window.innerWidth < 768)`
   - Restore original particle creation logic with individual particle elements

3. **CSS (`src/assets/css/styles.css`):**
   - Remove the enhanced `.hero-particles` styles
   - Restore the original gradient-based animation

## Verification:

After rollback, the particle animation should work the same as before the fix.

## Expected Result:

After the fix, particle animations should work consistently across:
- Desktop browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (Chrome Android, Firefox Android, Safari iOS)
- Different screen sizes and performance levels