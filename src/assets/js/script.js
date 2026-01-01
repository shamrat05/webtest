// ===============================================
// Theme Management
// ===============================================

class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'dark';
        this.init();
    }

    init() {
        this.setTheme(this.theme);
        this.bindEvents();
    }

    setTheme(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    toggle() {
        this.setTheme(this.theme === 'dark' ? 'light' : 'dark');
    }

    bindEvents() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggle());
        }
    }
}

// ===============================================
// Navigation Management
// ===============================================

class NavigationManager {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.previousScrollY = window.scrollY;
        this.isHidden = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.handleScroll();
        this.initSmoothScroll();
    }

    bindEvents() {
        // Mobile menu toggle
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Close mobile menu when clicking nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        // Scroll events
        window.addEventListener('scroll', () => this.handleScroll());

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : '';
    }

    closeMobileMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    handleScroll() {
        const scrollY = window.scrollY;

        // Navbar background opacity - use theme-aware colors
        if (this.navbar) {
            const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
            const bgColor = isDark ? '20, 20, 20' : '255, 255, 255'; // Dark: rgba(20,20,20,0.95) | Light: rgba(255,255,255,0.95)
            this.navbar.style.background = scrollY > 50
                ? `rgba(${bgColor}, 0.95)`
                : `rgba(${bgColor}, 0.9)`;
        }

        // Hide/show navbar based on scroll direction
        this.handleNavbarVisibility(scrollY);

        // Update active nav link
        this.updateActiveNavLink();
    }

    handleNavbarVisibility(currentScrollY) {
        const scrollDifference = currentScrollY - this.previousScrollY;
        const threshold = 10;

        // Only act if scroll difference is significant enough
        if (Math.abs(scrollDifference) < threshold) {
            this.previousScrollY = currentScrollY;
            return;
        }

        // Don't hide navbar if mobile menu is open
        if (this.navMenu.classList.contains('active')) {
            this.previousScrollY = currentScrollY;
            return;
        }

        if (scrollDifference > 0 && !this.isHidden) {
            // Scrolling down, hide navbar
            this.navbar.classList.add('navbar-hidden');
            this.isHidden = true;
        } else if (scrollDifference < 0 && this.isHidden) {
            // Scrolling up, show navbar
            this.navbar.classList.remove('navbar-hidden');
            this.isHidden = false;
        }

        this.previousScrollY = currentScrollY;
    }

    updateActiveNavLink() {
        // Handle blog page active state
        const currentPath = window.location.pathname;
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            
            if (currentPath.includes('/blog')) {
                // Highlight blog link when on blog pages
                if (link.getAttribute('data-nav') === 'blog') {
                    link.classList.add('active');
                }
            } else if (currentPath === '/') {
                // Handle home page section highlighting
                const sections = document.querySelectorAll('section[id]');
                const scrollPos = window.scrollY + 100;

                sections.forEach(section => {
                    const top = section.offsetTop;
                    const bottom = top + section.offsetHeight;
                    const id = section.getAttribute('id');

                    if (scrollPos >= top && scrollPos <= bottom) {
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    }
                });
            }
        });
    }

    updateNavbarTheme() {
        // Update navbar background immediately when theme changes
        if (this.navbar) {
            const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
            const bgColor = isDark ? '20, 20, 20' : '255, 255, 255';
            const scrollY = window.scrollY;
            this.navbar.style.background = scrollY > 50
                ? `rgba(${bgColor}, 0.95)`
                : `rgba(${bgColor}, 0.9)`;
        }
    }

    initSmoothScroll() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Check if it's a cross-page navigation (e.g., /#about from blog page)
                if (href.includes('/#')) {
                    const [pagePath, targetId] = href.split('/#');
                    
                    // If we're not on the home page, navigate to home page first
                    if (window.location.pathname !== '/' && pagePath === '/') {
                        e.preventDefault();
                        // Navigate to home page with hash
                        window.location.href = `/${targetId ? '#' + targetId : ''}`;
                        return;
                    }
                }
                
                // Handle anchor navigation
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        const offsetTop = targetElement.offsetTop - 72; // Account for navbar height
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                } else if (href.includes('/#')) {
                    // Handle cross-page navigation to home page sections
                    e.preventDefault();
                    const targetId = href.split('/#')[1];
                    
                    if (targetId) {
                        // Navigate to home page first
                        window.location.href = `/#${targetId}`;
                    }
                }
            });
        });
    }
}

// ===============================================
// Animation Manager
// ===============================================

class AnimationManager {
    constructor() {
        this.observers = [];
        this.init();
    }

    init() {
        this.initScrollAnimations();
        this.initSkillTags();
        this.initBackToTop();
    }

    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    // Add staggered animation for grid items
                    if (entry.target.classList.contains('portfolio-item') || 
                        entry.target.classList.contains('blog-card')) {
                        this.staggerChildren(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll(`
            .timeline-item,
            .skill-category,
            .portfolio-item,
            .blog-card,
            .contact-item,
            .cert-item,
            .stat-item,
            .highlight-item
        `);

        animatedElements.forEach(el => observer.observe(el));
        this.observers.push(observer);
    }

    staggerChildren(container) {
        const children = container.children;
        Array.from(children).forEach((child, index) => {
            setTimeout(() => {
                child.classList.add('fade-in-up');
            }, index * 100);
        });
    }

    initSkillTags() {
        const skillTags = document.querySelectorAll('.skill-tag');
        
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillTag = entry.target;
                    // Add a subtle bounce effect when skill tags come into view
                    skillTag.style.animation = `skillTagSlide 0.6s ease-out forwards, skillTagBounce 0.8s ease-out 0.6s`;
                    skillObserver.unobserve(skillTag);
                }
            });
        }, { threshold: 0.3 });

        skillTags.forEach(tag => skillObserver.observe(tag));
        this.observers.push(skillObserver);
    }

    initBackToTop() {
        const backToTopBtn = document.getElementById('back-to-top');
        
        if (backToTopBtn) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            });

            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
}

// ===============================================
// Portfolio Filter Manager
// ===============================================

class PortfolioManager {
    constructor() {
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.portfolioItems = document.querySelectorAll('.portfolio-item');
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const filter = btn.getAttribute('data-filter');
                
                // Add click animation
                btn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    btn.style.transform = '';
                    this.filterPortfolio(filter);
                    this.updateActiveFilter(btn);
                }, 150);
            });
        });
    }

    filterPortfolio(filter) {
        const visibleItems = [];
        const hiddenItems = [];
        
        // Categorize items
        this.portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                visibleItems.push(item);
            } else {
                hiddenItems.push(item);
            }
        });
        
        // First, hide all items smoothly
        this.portfolioItems.forEach(item => {
            item.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            item.style.opacity = '0';
            item.style.transform = 'scale(0.7) translateY(30px)';
        });
        
        // Then show visible items with staggered animation
        setTimeout(() => {
            visibleItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1) translateY(0)';
                    item.classList.add('show');
                    
                    // Remove show class after animation completes
                    setTimeout(() => {
                        item.classList.remove('show');
                    }, 600);
                }, index * 120);
            });
        }, 200);
    }

    updateActiveFilter(activeBtn) {
        this.filterBtns.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }
}



// ===============================================
// Auto Logo Transition Manager
// ===============================================

class AutoLogoTransitionManager {
    constructor() {
        this.logoText = document.getElementById('logo-text');
        this.logoImage = document.getElementById('logo-image');
        this.animatedLogo = document.querySelector('.animated-logo');
        this.init();
    }
    
    init() {
        this.startAutoTransition();
    }
    
    startAutoTransition() {
        setInterval(() => {
            this.transitionToImage();
            setTimeout(() => {
                this.transitionToText();
            }, 3000);
        }, 8000);
    }
    
    transitionToImage() {
        if (this.animatedLogo) {
            this.animatedLogo.classList.add('show-image');
        }
    }
    
    transitionToText() {
        if (this.animatedLogo) {
            this.animatedLogo.classList.remove('show-image');
        }
    }
}

// ===============================================
// Contact Form Manager
// ===============================================

class ContactFormManager {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.init();
    }

    init() {
        if (this.form) {
            this.bindEvents();
        }
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Add real-time validation
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearValidationError(input));
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        
        if (this.validateForm()) {
            this.submitForm(e);
        }
    }

    validateForm() {
        let isValid = true;
        const inputs = this.form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Remove existing error
        this.clearValidationError(field);

        // Validation rules
        switch (fieldName) {
            case 'name':
                if (value.length < 2) {
                    errorMessage = 'Name must be at least 2 characters';
                    isValid = false;
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                }
                break;
            case 'subject':
                if (value.length < 3) {
                    errorMessage = 'Subject must be at least 3 characters';
                    isValid = false;
                }
                break;
            case 'message':
                if (value.length < 10) {
                    errorMessage = 'Message must be at least 10 characters';
                    isValid = false;
                }
                break;
        }

        if (!isValid) {
            this.showValidationError(field, errorMessage);
        }

        return isValid;
    }

    showValidationError(field, message) {
        field.classList.add('error');
        
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.style.color = 'var(--semantic-error)';
        errorElement.style.fontSize = '14px';
        errorElement.style.marginTop = '4px';
    }

    clearValidationError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    async submitForm(event) {
        event.preventDefault(); // Prevent default form submission
        
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening Email Client...';
        submitBtn.disabled = true;

        try {
            // Create mailto link with form data
            const formData = new FormData(this.form);
            const name = formData.get('Name');
            const email = formData.get('Email');
            const subject = formData.get('Subject');
            const message = formData.get('Message');
            
            const mailtoSubject = encodeURIComponent(subject || 'Message from Portfolio Website');
            const mailtoBody = encodeURIComponent(
                `Name: ${name}\n` +
                `Email: ${email}\n\n` +
                `Message:\n${message}\n\n` +
                `---\n` +
                `Sent from Shamrat's Portfolio Website`
            );
            
            const mailtoLink = `mailto:shamrat.r.h@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            this.showSuccessMessage();
            
            // Reset form after a short delay
            setTimeout(() => {
                this.form.reset();
            }, 1000);
            
        } catch (error) {
            this.showErrorMessage();
        } finally {
            // Reset button state
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }
    }

    showSuccessMessage() {
        this.showMessage('Your email client should now be open with the message. If it didn\'t open, please email directly to shamrat.r.h@gmail.com', 'success');
    }

    showErrorMessage() {
        this.showMessage('Please try again or email directly to shamrat.r.h@gmail.com', 'error');
    }

    showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.textContent = message;
        
        // Style the message
        messageElement.style.padding = '12px 16px';
        messageElement.style.marginTop = '16px';
        messageElement.style.borderRadius = '8px';
        messageElement.style.fontSize = '14px';
        messageElement.style.fontWeight = '500';
        
        if (type === 'success') {
            messageElement.style.backgroundColor = 'var(--semantic-success)';
            messageElement.style.color = 'white';
        } else {
            messageElement.style.backgroundColor = 'var(--semantic-error)';
            messageElement.style.color = 'white';
        }

        this.form.appendChild(messageElement);

        // Auto remove after 5 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
}

// ===============================================
// Particle Animation Manager
// ===============================================

class ParticleManager {
    constructor() {
        this.container = document.querySelector('.particle-container');
        this.particles = [];
        this.isVisible = true;
        this.init();
    }

    init() {
        if (this.container) {
            this.createParticles();
            this.animateParticles();
            this.setupVisibility();
        }
    }

    setupVisibility() {
        // Respect user's motion preferences
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.isVisible = false;
            return;
        }
        
        // Hide particles on mobile for performance
        if (window.innerWidth < 768) {
            this.isVisible = false;
            return;
        }
    }

    createParticles() {
        if (!this.isVisible) return;
        
        const particleCount = Math.min(60, Math.floor(window.innerWidth / 20));
        
        for (let i = 0; i < particleCount; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 3 + 1;
        const x = Math.random() * window.innerWidth;
        const initialY = Math.random() * window.innerHeight;
        const opacity = Math.random() * 0.6 + 0.2;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;
        
        // Style the particle
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: var(--primary-500);
            border-radius: 50%;
            opacity: ${opacity};
            left: ${x}px;
            top: ${initialY}px;
            animation: float ${duration}s linear infinite;
            animation-delay: ${delay}s;
            box-shadow: 0 0 ${size * 2}px rgba(10, 132, 255, 0.3);
        `;
        
        this.container.appendChild(particle);
        this.particles.push(particle);
    }

    animateParticles() {
        // Particles use CSS animations defined in styles.css
        // Additional particle styling for better visibility
        if (!document.querySelector('#particle-enhanced-styles')) {
            const style = document.createElement('style');
            style.id = 'particle-enhanced-styles';
            style.textContent = `
                .particle {
                    pointer-events: none;
                    will-change: transform, opacity;
                    z-index: 1;
                }
                
                /* Enhanced particle visibility */
                .particle {
                    box-shadow: 0 0 6px rgba(10, 132, 255, 0.6);
                }
            `;
            document.head.appendChild(style);
        }
    }

    destroy() {
        this.particles.forEach(particle => particle.remove());
        this.particles = [];
    }

    // Method to recreate particles on resize
    recreateParticles() {
        this.destroy();
        this.createParticles();
    }
}

// ===============================================
// Performance Manager
// ===============================================

class PerformanceManager {
    constructor() {
        this.init();
    }

    init() {
        this.optimizeImages();
        this.lazyLoadElements();
        this.optimizeAnimations();
    }

    optimizeImages() {
        // Add loading="lazy" to images
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    }

    lazyLoadElements() {
        // Lazy load non-critical content
        const lazyElements = document.querySelectorAll('[data-lazy]');
        
        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const src = element.getAttribute('data-lazy');
                    if (src) {
                        element.setAttribute('src', src);
                        element.removeAttribute('data-lazy');
                    }
                    lazyObserver.unobserve(element);
                }
            });
        });

        lazyElements.forEach(el => lazyObserver.observe(el));
    }

    optimizeAnimations() {
        // Respect user's motion preferences
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--transition-normal', '0ms');
            document.documentElement.style.setProperty('--transition-slow', '0ms');
        }
    }
}

// ===============================================
// Main Application
// ===============================================

class ShamratWebsite {
    constructor() {
        this.managers = {};
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeManagers());
        } else {
            this.initializeManagers();
        }
    }

    initializeManagers() {
        try {
            // Initialize all managers
            this.managers.theme = new ThemeManager();
            this.managers.navigation = new NavigationManager();
            this.managers.animation = new AnimationManager();
            this.managers.portfolio = new PortfolioManager();

            this.managers.autoLogo = new AutoLogoTransitionManager();
            this.managers.contact = new ContactFormManager();
            this.managers.particles = new ParticleManager();
            this.managers.performance = new PerformanceManager();
            this.managers.emailProtection = new EmailProtection();

            // Connect theme changes to navbar updates
            this.connectThemeAndNavigation();

            // Add loading complete class
            document.body.classList.add('loaded');

            console.log('Shamrat Website initialized successfully');
        } catch (error) {
            console.error('Error initializing website:', error);
        }
    }

    connectThemeAndNavigation() {
        // Override ThemeManager setTheme to also update navbar immediately
        const originalSetTheme = this.managers.theme.setTheme.bind(this.managers.theme);
        this.managers.theme.setTheme = (theme) => {
            originalSetTheme(theme);
            // Update navbar immediately when theme changes
            if (this.managers.navigation) {
                this.managers.navigation.updateNavbarTheme();
            }
        };
    }

    // Public methods for external access
    toggleTheme() {
        this.managers.theme?.toggle();
    }

    scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            const offsetTop = element.offsetTop - 72;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

// ===============================================
// Utility Functions
// ===============================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===============================================
// Event Listeners and Initialization
// ===============================================

// Global error handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden, pause animations
        document.body.classList.add('page-hidden');
    } else {
        // Page is visible, resume animations
        document.body.classList.remove('page-hidden');
    }
});

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Recalculate layouts if needed
    if (window.managers?.particles) {
        window.managers.particles.destroy();
        window.managers.particles.init();
    }
}, 250));

// Initialize the website
const website = new ShamratWebsite();

// Make managers accessible globally for debugging
window.managers = website.managers;
window.ShamratWebsite = ShamratWebsite;

// ===============================================
// Additional Features
// ===============================================

// Add smooth reveal animation for elements
function addRevealAnimation() {
    const reveals = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });
}

// Initialize reveal animations
addRevealAnimation();

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        website.managers.navigation?.closeMobileMenu();
    }
    
    // Enter key on buttons
    if (e.key === 'Enter' && e.target.classList.contains('btn')) {
        e.target.click();
    }
});

// Add print styles optimization
window.addEventListener('beforeprint', () => {
    // Optimize for printing
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
});

// ===============================================
// Email Protection Management
// ===============================================

class EmailProtection {
    constructor() {
        this.protectedEmails = document.querySelectorAll('.protected-email');
        this.init();
    }

    init() {
        this.processEmails();
        this.bindEvents();
    }

    processEmails() {
        this.protectedEmails.forEach(emailElement => {
            const user = emailElement.getAttribute('data-user');
            const domain = emailElement.getAttribute('data-domain');
            const email = `${user}@${domain}`;
            
            // Create email display
            const emailDisplay = document.createElement('span');
            emailDisplay.className = 'email-display';
            emailDisplay.textContent = email;
            
            // Clear existing content and add the display
            emailElement.innerHTML = '';
            emailElement.appendChild(emailDisplay);
            
            // Store email for later use
            emailElement.setAttribute('data-email', email);
        });
    }

    bindEvents() {
        this.protectedEmails.forEach(emailElement => {
            emailElement.addEventListener('click', (e) => {
                e.preventDefault();
                const email = emailElement.getAttribute('data-email');
                
                // Create mailto link dynamically
                const mailtoLink = `mailto:${email}`;
                
                // Copy to clipboard for convenience
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(email).then(() => {
                        // Show success message
                        this.showCopyFeedback(emailElement);
                    });
                }
                
                // Open email client
                window.location.href = mailtoLink;
            });

            // Add hover effect
            emailElement.addEventListener('mouseenter', () => {
                emailElement.style.cursor = 'pointer';
            });
        });
    }

    showCopyFeedback(element) {
        const originalText = element.querySelector('.email-display').textContent;
        const feedback = document.createElement('span');
        feedback.className = 'email-feedback';
        feedback.textContent = 'Copied!';
        
        element.appendChild(feedback);
        element.querySelector('.email-display').textContent = 'Email copied to clipboard';
        
        setTimeout(() => {
            element.querySelector('.email-display').textContent = originalText;
            feedback.remove();
        }, 2000);
    }
}



// ===============================================
// Service Worker registration (for future PWA features)
// ===============================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker can be added here for offline functionality
        console.log('Service Worker support detected');
    });
}


