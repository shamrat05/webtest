/**
 * Admin Panel JavaScript
 * Comprehensive admin functionality for content management
 */

// ===============================================
// Admin Panel Manager
// ===============================================

class AdminPanel {
    constructor() {
        this.currentSection = 'dashboard';
        this.isAuthenticated = false;
        this.websiteData = {};
        this.init();
    }

    async init() {
        await this.loadData();
        this.checkAuthentication();
        this.bindEvents();
        this.initializeDynamicContent();
        
        if (this.isAuthenticated) {
            this.showAdminPanel();
        }
    }

    // ===============================================
    // Authentication
    // ===============================================

    checkAuthentication() {
        const authSession = localStorage.getItem('adminAuth');
        const sessionTime = localStorage.getItem('adminAuthTime');
        
        if (authSession && sessionTime) {
            const now = new Date().getTime();
            const sessionAge = now - parseInt(sessionTime);
            // Session expires after 2 hours
            if (sessionAge < 2 * 60 * 60 * 1000) {
                this.isAuthenticated = true;
            } else {
                this.logout();
            }
        }
    }

    authenticate(password) {
        // Default password: admin123
        if (password === 'admin123') {
            this.isAuthenticated = true;
            localStorage.setItem('adminAuth', 'true');
            localStorage.setItem('adminAuthTime', new Date().getTime().toString());
            return true;
        }
        return false;
    }

    logout() {
        this.isAuthenticated = false;
        localStorage.removeItem('adminAuth');
        localStorage.removeItem('adminAuthTime');
        this.showAuthModal();
    }

    // ===============================================
    // Data Management
    // ===============================================

    async loadData() {
        const savedData = localStorage.getItem('adminWebsiteData');
        if (savedData) {
            this.websiteData = JSON.parse(savedData);
        } else {
            // Initialize with default data
            this.websiteData = this.getDefaultData();
        }
    }

    saveData() {
        localStorage.setItem('adminWebsiteData', JSON.stringify(this.websiteData));
        this.showNotification('Changes saved successfully!', 'success');
    }

    getDefaultData() {
        return {
            hero: {
                name: 'Md. Shamrat Hossain',
                title: 'Marketing & Operations Professional',
                description: 'Results-driven marketing and operations professional with proven expertise in data analytics, stakeholder coordination, and strategic business execution.',
                profileImage: '../imgs/shamrat-profile.jpg',
                ctaButtons: [
                    { text: 'View My Work', link: '#portfolio' },
                    { text: 'Get In Touch', link: '#contact' }
                ],
                motivationalWords: ['Excellence', 'Innovation', 'Leadership', 'Growth', 'Success']
            },
            about: {
                title: 'About Me',
                subtitle: 'Passionate about creating impact through strategic thinking and data-driven solutions.',
                description: 'I\'m a dedicated marketing and operations professional with a strong foundation in business analytics and strategic planning. I have successfully completed my MBA in Marketing and bring hands-on experience in digital operations and stakeholder management.',
                highlights: [
                    {
                        icon: 'fas fa-graduation-cap',
                        title: 'Education',
                        description: 'MBA & BBA in Marketing from Islamic University'
                    },
                    {
                        icon: 'fas fa-briefcase',
                        title: 'Experience',
                        description: '2+ years in operations and marketing roles'
                    },
                    {
                        icon: 'fas fa-heart',
                        title: 'Passion',
                        description: 'Bridging the gap between strategy and execution'
                    }
                ],
                stats: [
                    { number: '551+', label: 'Outlets Managed' },
                    { number: '62', label: 'Districts Covered' },
                    { number: '100%', label: 'Client Satisfaction' },
                    { number: '5+', label: 'Certifications' }
                ]
            },
            experience: {
                title: 'Professional Experience',
                subtitle: 'Building expertise through diverse roles and challenges',
                items: [
                    {
                        title: 'Officer – Smart Banking Operations',
                        company: 'DOER Services PLC',
                        date: 'Nov 2024 – Aug 2025',
                        description: 'Managed daily operations for 551+ agent banking outlets across 62 districts as liaison between field teams, outlet owners, and Agrani Bank stakeholders. Addressed compliance and ownership-related issues while monitoring outlet performance and preparing monthly Bangladesh Bank Transaction Reports.',
                        tags: ['Operations Management', 'Stakeholder Coordination', 'Data Analysis', 'Compliance']
                    },
                    {
                        title: 'Marketing Intern',
                        company: 'Kiam Metal Industries',
                        date: 'Dec 2023 – Mar 2024',
                        description: 'Supported marketing team in developing sales strategies and conducting market research to identify new business opportunities. Assisted in promotional campaign planning and competitive analysis for cookware products.',
                        tags: ['Market Research', 'Sales Strategy', 'Competitive Analysis', 'Campaign Planning']
                    }
                ]
            },
            skills: {
                title: 'Skills & Expertise',
                subtitle: 'Tools and technologies I use to create value',
                categories: [
                    {
                        name: 'Technical Skills',
                        skills: [
                            { name: 'Advanced Excel / Google Sheets', level: 'expert', icon: 'fas fa-chart-line' },
                            { name: 'Power BI Dashboarding', level: 'advanced', icon: 'fas fa-chart-bar' },
                            { name: 'Data Analysis & Reporting', level: 'expert', icon: 'fas fa-database' },
                            { name: 'CRM Systems', level: 'intermediate', icon: 'fas fa-users-cog' },
                            { name: 'Business Automation', level: 'intermediate', icon: 'fas fa-cogs' },
                            { name: 'Python, VBA, JavaScript', level: 'advanced', icon: 'fas fa-code' }
                        ]
                    },
                    {
                        name: 'Professional Skills',
                        skills: [
                            { name: 'Strategic Thinking', level: 'expert', icon: 'fas fa-chess' },
                            { name: 'Team Leadership', level: 'advanced', icon: 'fas fa-users' },
                            { name: 'Customer Relations', level: 'expert', icon: 'fas fa-handshake' },
                            { name: 'Project Management', level: 'advanced', icon: 'fas fa-tasks' },
                            { name: 'Communication', level: 'expert', icon: 'fas fa-comments' },
                            { name: 'Stakeholder Coordination', level: 'expert', icon: 'fas fa-bullseye' }
                        ]
                    }
                ],
                certifications: [
                    {
                        icon: 'fas fa-certificate',
                        title: 'Email Marketing Certification',
                        organization: 'HubSpot Academy'
                    },
                    {
                        icon: 'fas fa-laptop-code',
                        title: 'Advanced MS Office Certificate',
                        organization: 'Udemy'
                    },
                    {
                        icon: 'fas fa-comments',
                        title: 'Professional English Communication',
                        organization: 'Udemy'
                    },
                    {
                        icon: 'fas fa-trophy',
                        title: 'Best Presenter Award',
                        organization: 'Research on "The Future of E-Commerce in Bangladesh"'
                    }
                ]
            },
            portfolio: {
                title: 'Portfolio',
                subtitle: 'Projects that showcase my expertise and impact',
                categories: ['analytics', 'marketing', 'operations'],
                items: [
                    {
                        title: 'Banking Operations Analytics Dashboard',
                        description: 'Comprehensive Power BI dashboard analyzing performance metrics across 551+ banking outlets, providing real-time insights for strategic decision making.',
                        category: 'analytics',
                        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
                        tags: ['Power BI', 'Data Analytics', 'Dashboard Design'],
                        links: { live: '#', github: '#' }
                    },
                    {
                        title: 'Digital Marketing Strategy & Campaign',
                        description: 'Developed comprehensive digital marketing strategy for metal industry products, including market research, competitor analysis, and campaign execution.',
                        category: 'marketing',
                        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
                        tags: ['Digital Marketing', 'Market Research', 'Strategy Development'],
                        links: { live: '#', github: '#' }
                    },
                    {
                        title: 'Banking Operations Process Optimization',
                        description: 'Led initiative to optimize operational workflows across 62 districts, implementing automation tools and improving efficiency by 25%.',
                        category: 'operations',
                        image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop',
                        tags: ['Process Improvement', 'Automation', 'Stakeholder Management'],
                        links: { live: '#', github: '#' }
                    }
                ]
            },
            blog: {
                title: 'Latest Insights',
                subtitle: 'Thoughts on marketing, operations, and professional growth',
                posts: [
                    {
                        title: 'The Future of Digital Banking in Bangladesh',
                        excerpt: 'Exploring how digital transformation is reshaping the banking landscape in Bangladesh, and what it means for traditional banking operations and customer experience.',
                        category: 'Digital Transformation',
                        image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&h=400&fit=crop',
                        date: 'Dec 8, 2025',
                        readTime: '5 min read'
                    },
                    {
                        title: 'Data-Driven Decision Making in Operations',
                        excerpt: 'How leveraging data analytics can transform operational efficiency and drive better business outcomes, with insights from managing 551+ banking outlets.',
                        category: 'Data Analytics',
                        image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop',
                        date: 'Dec 5, 2025',
                        readTime: '4 min read'
                    }
                ]
            },
            contact: {
                title: 'Get In Touch',
                subtitle: 'Let\'s discuss how we can work together',
                info: [
                    {
                        icon: 'fas fa-envelope',
                        type: 'Email',
                        value: 'shamrat.r.h@gmail.com'
                    },
                    {
                        icon: 'fas fa-phone',
                        type: 'Phone',
                        value: '+88 01727-805705'
                    },
                    {
                        icon: 'fab fa-linkedin',
                        type: 'LinkedIn',
                        value: 'linkedin.com/in/shamrat5'
                    },
                    {
                        icon: 'fas fa-map-marker-alt',
                        type: 'Location',
                        value: 'Azimpur, Dhaka, Bangladesh'
                    }
                ],
                form: {
                    defaultSubject: 'Message from Portfolio Website',
                    successMessage: 'Your email client should now be open with the message. If it didn\'t open, please email directly to shamrat.r.h@gmail.com'
                }
            },
            theme: {
                colors: {
                    primary: '#0A84FF',
                    background: '#0A0A0A',
                    surface: '#141414',
                    textPrimary: '#E4E4E7',
                    textSecondary: '#A1A1AA',
                    success: '#34D399',
                    error: '#F87171'
                },
                fonts: {
                    heading: "'Poppins', sans-serif",
                    body: "'Inter', sans-serif"
                },
                layout: {
                    maxWidth: 1280,
                    borderRadius: 8,
                    spacingScale: '8px'
                }
            },
            settings: {
                siteTitle: 'Md. Shamrat Hossain - Marketing & Operations Professional',
                siteDescription: 'Marketing and Operations Professional specializing in data-driven decision making, customer relations, and business development.',
                features: {
                    analytics: true,
                    particles: true,
                    autoLogo: true,
                    backToTop: true
                },
                seo: {
                    keywords: 'marketing, operations, data analytics, business development',
                    ogImage: '../imgs/shamrat-profile.jpg'
                },
                images: {
                    profileImage: {
                        width: 400,
                        height: 400,
                        borderRadius: '50%',
                        borderWidth: 4,
                        borderColor: 'var(--bg-surface)',
                        boxShadow: '0 0 40px rgba(10, 132, 255, 0.3)',
                        objectFit: 'cover',
                        position: 'center'
                    },
                    portfolioImages: {
                        height: 250,
                        objectFit: 'cover',
                        position: 'center'
                    },
                    blogImages: {
                        height: 200,
                        objectFit: 'cover',
                        position: 'center'
                    }
                }
            }
        };
    }

    // ===============================================
    // UI Management
    // ===============================================

    showAdminPanel() {
        document.body.classList.add('admin-authenticated');
        this.loadCurrentSection();
        this.hideAuthModal();
    }

    showAuthModal() {
        document.getElementById('auth-modal').classList.add('active');
        document.getElementById('admin-password-input').focus();
    }

    hideAuthModal() {
        document.getElementById('auth-modal').classList.remove('active');
    }

    showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.admin-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Remove active state from nav links
        document.querySelectorAll('.admin-nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Show selected section
        document.getElementById(sectionId).classList.add('active');
        document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
        
        this.currentSection = sectionId;
        this.loadSectionData(sectionId);
    }

    loadSectionData(sectionId) {
        switch(sectionId) {
            case 'hero':
                this.loadHeroData();
                break;
            case 'about':
                this.loadAboutData();
                break;
            case 'experience':
                this.loadExperienceData();
                break;
            case 'skills':
                this.loadSkillsData();
                break;
            case 'portfolio':
                this.loadPortfolioData();
                break;
            case 'blog':
                this.loadBlogData();
                break;
            case 'contact':
                this.loadContactData();
                break;
            case 'theme':
                this.loadThemeData();
                break;
            case 'settings':
                this.loadSettingsData();
                break;
        }
    }

    // ===============================================
    // Section Data Loaders
    // ===============================================

    loadHeroData() {
        const data = this.websiteData.hero;
        document.getElementById('hero-name').value = data.name;
        document.getElementById('hero-title').value = data.title;
        document.getElementById('hero-description').value = data.description;
        document.getElementById('hero-image-preview').innerHTML = `<img src="${data.profileImage}" alt="Profile Image">`;
        
        // CTA Buttons
        document.getElementById('cta1-text').value = data.ctaButtons[0].text;
        document.getElementById('cta1-link').value = data.ctaButtons[0].link;
        document.getElementById('cta2-text').value = data.ctaButtons[1].text;
        document.getElementById('cta2-link').value = data.ctaButtons[1].link;
        
        // Motivational Words
        const wordInputs = document.querySelectorAll('.motivation-word-input');
        data.motivationalWords.forEach((word, index) => {
            if (wordInputs[index]) {
                wordInputs[index].value = word;
            }
        });
    }

    loadAboutData() {
        const data = this.websiteData.about;
        document.getElementById('about-title').value = data.title;
        document.getElementById('about-subtitle').value = data.subtitle;
        document.getElementById('about-description').value = data.description;
    }

    loadExperienceData() {
        const data = this.websiteData.experience;
        document.getElementById('experience-title').value = data.title;
        document.getElementById('experience-subtitle').value = data.subtitle;
    }

    loadSkillsData() {
        const data = this.websiteData.skills;
        document.getElementById('skills-title').value = data.title;
        document.getElementById('skills-subtitle').value = data.subtitle;
    }

    loadPortfolioData() {
        const data = this.websiteData.portfolio;
        document.getElementById('portfolio-title').value = data.title;
        document.getElementById('portfolio-subtitle').value = data.subtitle;
    }

    loadBlogData() {
        const data = this.websiteData.blog;
        document.getElementById('blog-title').value = data.title;
        document.getElementById('blog-subtitle').value = data.subtitle;
    }

    loadContactData() {
        const data = this.websiteData.contact;
        document.getElementById('contact-title').value = data.title;
        document.getElementById('contact-subtitle').value = data.subtitle;
    }

    loadThemeData() {
        const data = this.websiteData.theme;
        document.getElementById('primary-color').value = data.colors.primary;
        document.getElementById('primary-color-text').value = data.colors.primary;
        // ... load other theme values
    }

    loadSettingsData() {
        const data = this.websiteData.settings;
        document.getElementById('site-title').value = data.siteTitle;
        document.getElementById('site-description').value = data.siteDescription;
        document.getElementById('meta-keywords').value = data.seo.keywords;
        document.getElementById('og-image').value = data.seo.ogImage;
        
        // Feature toggles
        document.getElementById('enable-analytics').checked = data.features.analytics;
        document.getElementById('enable-particles').checked = data.features.particles;
        document.getElementById('enable-auto-logo').checked = data.features.autoLogo;
        document.getElementById('enable-back-to-top').checked = data.features.backToTop;
        
        // Image settings
        if (data.images) {
            // Profile image settings
            if (data.images.profileImage) {
                document.getElementById('profile-image-width').value = data.images.profileImage.width;
                document.getElementById('profile-image-height').value = data.images.profileImage.height;
                document.getElementById('profile-image-border-radius').value = data.images.profileImage.borderRadius;
                document.getElementById('profile-image-border-width').value = data.images.profileImage.borderWidth;
                document.getElementById('profile-image-border-color').value = data.images.profileImage.borderColor;
                document.getElementById('profile-image-box-shadow').value = data.images.profileImage.boxShadow;
                document.getElementById('profile-image-object-fit').value = data.images.profileImage.objectFit;
                document.getElementById('profile-image-position').value = data.images.profileImage.position;
            }
            
            // Portfolio image settings
            if (data.images.portfolioImages) {
                document.getElementById('portfolio-image-height').value = data.images.portfolioImages.height;
                document.getElementById('portfolio-image-object-fit').value = data.images.portfolioImages.objectFit;
                document.getElementById('portfolio-image-position').value = data.images.portfolioImages.position;
            }
            
            // Blog image settings
            if (data.images.blogImages) {
                document.getElementById('blog-image-height').value = data.images.blogImages.height;
                document.getElementById('blog-image-object-fit').value = data.images.blogImages.objectFit;
                document.getElementById('blog-image-position').value = data.images.blogImages.position;
            }
        }
    }

    // ===============================================
    // Form Handlers
    // ===============================================

    bindEvents() {
        // Authentication
        document.getElementById('auth-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const password = document.getElementById('admin-password-input').value;
            if (this.authenticate(password)) {
                this.showAdminPanel();
                this.showNotification('Successfully logged in!', 'success');
            } else {
                this.showAuthError('Invalid password');
            }
        });

        document.getElementById('cancel-auth').addEventListener('click', () => {
            window.close();
        });

        // Navigation
        document.querySelectorAll('.admin-nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                this.showSection(section);
            });
        });

        // Logout
        document.getElementById('logout-btn').addEventListener('click', () => {
            this.logout();
        });

        // Preview
        document.getElementById('preview-btn').addEventListener('click', () => {
            this.openPreview();
        });

        // Export
        document.getElementById('export-btn').addEventListener('click', () => {
            this.exportData();
        });

        // Form submissions
        this.bindFormHandlers();
        
        // Dynamic content handlers
        this.bindDynamicContentHandlers();
        
        // Media upload
        this.bindMediaHandlers();
        
        // Theme handlers
        this.bindThemeHandlers();
    }

    bindFormHandlers() {
        // Hero Form
        document.getElementById('hero-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveHeroData();
        });

        // About Form
        document.getElementById('about-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveAboutData();
        });

        // Experience Form
        document.getElementById('experience-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveExperienceData();
        });

        // Skills Form
        document.getElementById('skills-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveSkillsData();
        });

        // Portfolio Form
        document.getElementById('portfolio-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.savePortfolioData();
        });

        // Blog Form
        document.getElementById('blog-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveBlogData();
        });

        // Contact Form
        document.getElementById('contact-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveContactData();
        });

        // Theme Form
        document.getElementById('theme-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveThemeData();
        });

        // Settings Form
        document.getElementById('settings-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveSettingsData();
        });
    }

    bindDynamicContentHandlers() {
        // Add/Remove buttons for dynamic content
        document.getElementById('add-highlight')?.addEventListener('click', () => {
            this.addHighlightItem();
        });

        document.getElementById('add-stat')?.addEventListener('click', () => {
            this.addStatItem();
        });

        document.getElementById('add-experience')?.addEventListener('click', () => {
            this.addExperienceItem();
        });

        document.getElementById('add-skill-category')?.addEventListener('click', () => {
            this.addSkillCategory();
        });

        document.getElementById('add-portfolio')?.addEventListener('click', () => {
            this.addPortfolioItem();
        });

        document.getElementById('add-blog')?.addEventListener('click', () => {
            this.addBlogItem();
        });

        document.getElementById('add-contact-info')?.addEventListener('click', () => {
            this.addContactInfoItem();
        });

        document.getElementById('add-certification')?.addEventListener('click', () => {
            this.addCertificationItem();
        });

        // Remove buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.remove-highlight')) {
                e.target.closest('.highlight-item').remove();
            }
            if (e.target.closest('.remove-stat')) {
                e.target.closest('.stat-item').remove();
            }
            if (e.target.closest('.remove-experience')) {
                e.target.closest('.experience-item').remove();
            }
            if (e.target.closest('.remove-skill')) {
                e.target.closest('.skill-item').remove();
            }
            if (e.target.closest('.remove-cert')) {
                e.target.closest('.cert-item').remove();
            }
            if (e.target.closest('.remove-portfolio')) {
                e.target.closest('.portfolio-item').remove();
            }
            if (e.target.closest('.remove-blog')) {
                e.target.closest('.blog-item').remove();
            }
            if (e.target.closest('.remove-contact-info')) {
                e.target.closest('.contact-info-item').remove();
            }
        });
    }

    bindMediaHandlers() {
        const uploadZone = document.getElementById('upload-zone');
        const fileInput = document.getElementById('file-input');

        if (uploadZone && fileInput) {
            uploadZone.addEventListener('click', () => {
                fileInput.click();
            });

            uploadZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadZone.classList.add('dragover');
            });

            uploadZone.addEventListener('dragleave', () => {
                uploadZone.classList.remove('dragover');
            });

            uploadZone.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadZone.classList.remove('dragover');
                const files = e.dataTransfer.files;
                this.handleFileUpload(files);
            });

            fileInput.addEventListener('change', (e) => {
                this.handleFileUpload(e.target.files);
            });
        }
    }

    bindThemeHandlers() {
        // Color sync
        const colorInputs = ['primary-color', 'bg-color', 'surface-color', 'text-primary-color', 'text-secondary-color'];
        colorInputs.forEach(id => {
            const colorInput = document.getElementById(id);
            const textInput = document.getElementById(id + '-text');
            
            if (colorInput && textInput) {
                colorInput.addEventListener('change', () => {
                    textInput.value = colorInput.value;
                });
                textInput.addEventListener('change', () => {
                    colorInput.value = textInput.value;
                });
            }
        });

        // Theme presets
        document.querySelectorAll('[data-preset]').forEach(btn => {
            btn.addEventListener('click', () => {
                const preset = btn.getAttribute('data-preset');
                this.applyThemePreset(preset);
            });
        });

        // Theme preview and reset
        document.getElementById('theme-preview')?.addEventListener('click', () => {
            this.previewTheme();
        });

        document.getElementById('reset-theme')?.addEventListener('click', () => {
            this.resetTheme();
        });
    }

    // ===============================================
    // Data Save Methods
    // ===============================================

    saveHeroData() {
        this.websiteData.hero = {
            name: document.getElementById('hero-name').value,
            title: document.getElementById('hero-title').value,
            description: document.getElementById('hero-description').value,
            profileImage: this.websiteData.hero.profileImage, // Keep existing
            ctaButtons: [
                {
                    text: document.getElementById('cta1-text').value,
                    link: document.getElementById('cta1-link').value
                },
                {
                    text: document.getElementById('cta2-text').value,
                    link: document.getElementById('cta2-link').value
                }
            ],
            motivationalWords: Array.from(document.querySelectorAll('.motivation-word-input'))
                .map(input => input.value)
                .filter(value => value.trim())
        };
        
        this.saveData();
        this.updateWebsite();
    }

    saveAboutData() {
        this.websiteData.about = {
            title: document.getElementById('about-title').value,
            subtitle: document.getElementById('about-subtitle').value,
            description: document.getElementById('about-description').value,
            highlights: this.getDynamicItems('highlight-item', ['icon', 'title', 'description']),
            stats: this.getDynamicItems('stat-item', ['number', 'label'])
        };
        
        this.saveData();
        this.updateWebsite();
    }

    saveExperienceData() {
        this.websiteData.experience = {
            title: document.getElementById('experience-title').value,
            subtitle: document.getElementById('experience-subtitle').value,
            items: this.getDynamicItems('experience-item', ['title', 'company', 'date', 'description'], 'tags')
        };
        
        this.saveData();
        this.updateWebsite();
    }

    saveSkillsData() {
        this.websiteData.skills = {
            title: document.getElementById('skills-title').value,
            subtitle: document.getElementById('skills-subtitle').value,
            categories: this.getSkillCategories(),
            certifications: this.getDynamicItems('cert-item', ['icon', 'title', 'organization'])
        };
        
        this.saveData();
        this.updateWebsite();
    }

    savePortfolioData() {
        this.websiteData.portfolio = {
            title: document.getElementById('portfolio-title').value,
            subtitle: document.getElementById('portfolio-subtitle').value,
            categories: Array.from(document.querySelectorAll('.portfolio-categories input'))
                .map(input => input.value)
                .filter(value => value.trim()),
            items: this.getDynamicItems('portfolio-item', ['title', 'description', 'category', 'image'], 'tags')
        };
        
        this.saveData();
        this.updateWebsite();
    }

    saveBlogData() {
        this.websiteData.blog = {
            title: document.getElementById('blog-title').value,
            subtitle: document.getElementById('blog-subtitle').value,
            posts: this.getDynamicItems('blog-item', ['title', 'excerpt', 'category', 'image', 'date', 'readTime'])
        };
        
        this.saveData();
        this.updateWebsite();
    }

    saveContactData() {
        this.websiteData.contact = {
            title: document.getElementById('contact-title').value,
            subtitle: document.getElementById('contact-subtitle').value,
            info: this.getDynamicItems('contact-info-item', ['icon', 'type', 'value']),
            form: {
                defaultSubject: document.querySelector('.form-settings input[placeholder*="Subject"]').value,
                successMessage: document.querySelector('.form-settings input[placeholder*="Message"]').value
            }
        };
        
        this.saveData();
        this.updateWebsite();
    }

    saveThemeData() {
        this.websiteData.theme = {
            colors: {
                primary: document.getElementById('primary-color').value,
                background: document.getElementById('bg-color').value,
                surface: document.getElementById('surface-color').value,
                textPrimary: document.getElementById('text-primary-color').value,
                textSecondary: document.getElementById('text-secondary-color').value,
                success: document.getElementById('success-color').value,
                error: document.getElementById('error-color').value
            },
            fonts: {
                heading: document.getElementById('heading-font').value,
                body: document.getElementById('body-font').value
            },
            layout: {
                maxWidth: parseInt(document.getElementById('max-width').value),
                borderRadius: parseInt(document.getElementById('border-radius').value),
                spacingScale: document.getElementById('spacing-scale').value
            }
        };
        
        this.saveData();
        this.applyTheme();
        this.showNotification('Theme updated successfully!', 'success');
    }

    saveSettingsData() {
        // Preserve existing settings and merge with new data
        const existingSettings = this.websiteData.settings || {};
        
        this.websiteData.settings = {
            siteTitle: document.getElementById('site-title').value || existingSettings.siteTitle || '',
            siteDescription: document.getElementById('site-description').value || existingSettings.siteDescription || '',
            features: {
                analytics: document.getElementById('enable-analytics')?.checked ?? existingSettings.features?.analytics ?? true,
                particles: document.getElementById('enable-particles')?.checked ?? existingSettings.features?.particles ?? true,
                autoLogo: document.getElementById('enable-auto-logo')?.checked ?? existingSettings.features?.autoLogo ?? true,
                backToTop: document.getElementById('enable-back-to-top')?.checked ?? existingSettings.features?.backToTop ?? true
            },
            seo: {
                keywords: document.getElementById('meta-keywords').value || existingSettings.seo?.keywords || '',
                ogImage: document.getElementById('og-image').value || existingSettings.seo?.ogImage || ''
            },
            images: {
                profileImage: {
                    width: parseInt(document.getElementById('profile-image-width')?.value) || existingSettings.images?.profileImage?.width || 400,
                    height: parseInt(document.getElementById('profile-image-height')?.value) || existingSettings.images?.profileImage?.height || 400,
                    borderRadius: document.getElementById('profile-image-border-radius')?.value || existingSettings.images?.profileImage?.borderRadius || '50%',
                    borderWidth: parseInt(document.getElementById('profile-image-border-width')?.value) || existingSettings.images?.profileImage?.borderWidth || 4,
                    borderColor: document.getElementById('profile-image-border-color')?.value || existingSettings.images?.profileImage?.borderColor || 'var(--bg-surface)',
                    boxShadow: document.getElementById('profile-image-box-shadow')?.value || existingSettings.images?.profileImage?.boxShadow || '0 0 40px rgba(10, 132, 255, 0.3)',
                    objectFit: document.getElementById('profile-image-object-fit')?.value || existingSettings.images?.profileImage?.objectFit || 'cover',
                    position: document.getElementById('profile-image-position')?.value || existingSettings.images?.profileImage?.position || 'center'
                },
                portfolioImages: {
                    height: parseInt(document.getElementById('portfolio-image-height')?.value) || existingSettings.images?.portfolioImages?.height || 250,
                    objectFit: document.getElementById('portfolio-image-object-fit')?.value || existingSettings.images?.portfolioImages?.objectFit || 'cover',
                    position: document.getElementById('portfolio-image-position')?.value || existingSettings.images?.portfolioImages?.position || 'center'
                },
                blogImages: {
                    height: parseInt(document.getElementById('blog-image-height')?.value) || existingSettings.images?.blogImages?.height || 200,
                    objectFit: document.getElementById('blog-image-object-fit')?.value || existingSettings.images?.blogImages?.objectFit || 'cover',
                    position: document.getElementById('blog-image-position')?.value || existingSettings.images?.blogImages?.position || 'center'
                }
            }
        };
        
        const newPassword = document.getElementById('admin-password')?.value;
        if (newPassword) {
            // In a real app, this would be hashed and stored securely
            localStorage.setItem('adminPassword', newPassword);
        }
        
        this.saveData();
        this.updateWebsite();
        this.showNotification('Settings saved successfully!', 'success');
    }

    // ===============================================
    // Helper Methods
    // ===============================================

    getDynamicItems(containerClass, inputSelectors, tagsSelector = null) {
        const items = [];
        document.querySelectorAll(`.${containerClass}`).forEach(container => {
            const item = {};
            
            inputSelectors.forEach(selector => {
                const input = container.querySelector(`input[placeholder*="${selector}"], input[placeholder="${selector}"], textarea[placeholder*="${selector}"]`);
                if (input) {
                    if (input.tagName === 'TEXTAREA') {
                        item[selector] = input.value;
                    } else {
                        item[selector] = input.value;
                    }
                }
            });
            
            if (tagsSelector) {
                const tagsInput = container.querySelector(`input[placeholder*="Tags"]`);
                if (tagsInput) {
                    item.tags = tagsInput.value.split(',').map(tag => tag.trim());
                }
            }
            
            items.push(item);
        });
        return items;
    }

    getSkillCategories() {
        const categories = [];
        document.querySelectorAll('.skill-category').forEach(category => {
            const nameInput = category.querySelector('.category-name');
            const skills = [];
            
            category.querySelectorAll('.skill-item').forEach(skillItem => {
                const nameInput = skillItem.querySelector('input[placeholder*="Skill Name"]');
                const levelSelect = skillItem.querySelector('.skill-level');
                const iconInput = skillItem.querySelector('input[placeholder*="Icon"]');
                
                if (nameInput && levelSelect && iconInput) {
                    skills.push({
                        name: nameInput.value,
                        level: levelSelect.value,
                        icon: iconInput.value
                    });
                }
            });
            
            if (nameInput && skills.length > 0) {
                categories.push({
                    name: nameInput.value,
                    skills: skills
                });
            }
        });
        return categories;
    }

    // ===============================================
    // Dynamic Content Management
    // ===============================================

    addHighlightItem() {
        const container = document.getElementById('highlights-container');
        const newItem = document.createElement('div');
        newItem.className = 'highlight-item';
        newItem.innerHTML = `
            <input type="text" placeholder="Icon class (e.g., fas fa-graduation-cap)">
            <input type="text" placeholder="Title">
            <input type="text" placeholder="Description">
            <button type="button" class="admin-btn admin-btn-danger admin-btn-sm remove-highlight">
                <i class="fas fa-trash"></i>
            </button>
        `;
        container.appendChild(newItem);
    }

    addStatItem() {
        const container = document.getElementById('stats-container');
        const newItem = document.createElement('div');
        newItem.className = 'stat-item';
        newItem.innerHTML = `
            <input type="text" placeholder="Number">
            <input type="text" placeholder="Label">
            <button type="button" class="admin-btn admin-btn-danger admin-btn-sm remove-stat">
                <i class="fas fa-trash"></i>
            </button>
        `;
        container.appendChild(newItem);
    }

    addExperienceItem() {
        const container = document.getElementById('experience-container');
        const newItem = document.createElement('div');
        newItem.className = 'experience-item';
        newItem.innerHTML = `
            <input type="text" placeholder="Job Title">
            <input type="text" placeholder="Company">
            <input type="text" placeholder="Date Range">
            <textarea placeholder="Job Description" rows="3"></textarea>
            <input type="text" placeholder="Tags (comma-separated)">
            <button type="button" class="admin-btn admin-btn-danger admin-btn-sm remove-experience">
                <i class="fas fa-trash"></i>
            </button>
        `;
        container.appendChild(newItem);
    }

    addSkillCategory() {
        const container = document.getElementById('skills-container');
        const newCategory = document.createElement('div');
        newCategory.className = 'skill-category';
        newCategory.innerHTML = `
            <input type="text" placeholder="Category Name" class="category-name">
            <div class="skills-list">
                <div class="skill-item">
                    <input type="text" placeholder="Skill Name">
                    <select class="skill-level">
                        <option value="expert">Expert</option>
                        <option value="advanced">Advanced</option>
                        <option value="intermediate">Intermediate</option>
                    </select>
                    <input type="text" placeholder="Icon (e.g., fas fa-chart-line)">
                    <button type="button" class="admin-btn admin-btn-danger admin-btn-sm remove-skill">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <button type="button" class="admin-btn admin-btn-secondary add-skill">
                <i class="fas fa-plus"></i>
                Add Skill
            </button>
        `;
        container.appendChild(newCategory);
    }

    addPortfolioItem() {
        const container = document.getElementById('portfolio-container');
        const newItem = document.createElement('div');
        newItem.className = 'portfolio-item';
        newItem.innerHTML = `
            <input type="text" placeholder="Project Title">
            <textarea placeholder="Project Description" rows="3"></textarea>
            <input type="text" placeholder="Category">
            <input type="text" placeholder="Image URL">
            <input type="text" placeholder="Tags (comma-separated)">
            <input type="text" placeholder="Live Link">
            <input type="text" placeholder="GitHub Link">
            <button type="button" class="admin-btn admin-btn-danger admin-btn-sm remove-portfolio">
                <i class="fas fa-trash"></i>
            </button>
        `;
        container.appendChild(newItem);
    }

    addBlogItem() {
        const container = document.getElementById('blog-container');
        const newItem = document.createElement('div');
        newItem.className = 'blog-item';
        newItem.innerHTML = `
            <input type="text" placeholder="Post Title">
            <textarea placeholder="Post Excerpt" rows="3"></textarea>
            <input type="text" placeholder="Category">
            <input type="text" placeholder="Image URL">
            <input type="text" placeholder="Date">
            <input type="text" placeholder="Read Time">
            <button type="button" class="admin-btn admin-btn-danger admin-btn-sm remove-blog">
                <i class="fas fa-trash"></i>
            </button>
        `;
        container.appendChild(newItem);
    }

    addContactInfoItem() {
        const container = document.getElementById('contact-info-container');
        const newItem = document.createElement('div');
        newItem.className = 'contact-info-item';
        newItem.innerHTML = `
            <input type="text" placeholder="Icon (e.g., fas fa-envelope)">
            <input type="text" placeholder="Type">
            <input type="text" placeholder="Value">
            <button type="button" class="admin-btn admin-btn-danger admin-btn-sm remove-contact-info">
                <i class="fas fa-trash"></i>
            </button>
        `;
        container.appendChild(newItem);
    }

    addCertificationItem() {
        const container = document.getElementById('certifications-container');
        const newItem = document.createElement('div');
        newItem.className = 'cert-item';
        newItem.innerHTML = `
            <input type="text" placeholder="Icon (e.g., fas fa-certificate)">
            <input type="text" placeholder="Title">
            <input type="text" placeholder="Organization">
            <button type="button" class="admin-btn admin-btn-danger admin-btn-sm remove-cert">
                <i class="fas fa-trash"></i>
            </button>
        `;
        container.appendChild(newItem);
    }

    // ===============================================
    // File Upload & Media Management
    // ===============================================

    handleFileUpload(files) {
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.addMediaItem(file.name, e.target.result);
                };
                reader.readAsDataURL(file);
            }
        });
        this.showNotification('Files uploaded successfully!', 'success');
    }

    addMediaItem(filename, dataUrl) {
        const container = document.getElementById('media-grid');
        const newItem = document.createElement('div');
        newItem.className = 'media-item';
        newItem.innerHTML = `
            <img src="${dataUrl}" alt="${filename}">
            <div class="media-overlay">
                <span class="media-filename">${filename}</span>
                <button class="admin-btn admin-btn-danger admin-btn-sm">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        container.appendChild(newItem);
    }

    // ===============================================
    // Theme Management
    // ===============================================

    applyTheme() {
        const theme = this.websiteData.theme;
        const root = document.documentElement;
        
        // Apply CSS custom properties
        root.style.setProperty('--primary-color', theme.colors.primary);
        root.style.setProperty('--bg-color', theme.colors.background);
        root.style.setProperty('--surface-color', theme.colors.surface);
        root.style.setProperty('--text-primary-color', theme.colors.textPrimary);
        root.style.setProperty('--text-secondary-color', theme.colors.textSecondary);
        root.style.setProperty('--success-color', theme.colors.success);
        root.style.setProperty('--error-color', theme.colors.error);
    }

    applyThemePreset(preset) {
        const presets = {
            default: {
                primary: '#0A84FF',
                background: '#0A0A0A',
                surface: '#141414',
                textPrimary: '#E4E4E7',
                textSecondary: '#A1A1AA'
            },
            blue: {
                primary: '#1e40af',
                background: '#0f172a',
                surface: '#1e293b',
                textPrimary: '#f1f5f9',
                textSecondary: '#cbd5e1'
            },
            green: {
                primary: '#059669',
                background: '#064e3b',
                surface: '#065f46',
                textPrimary: '#d1fae5',
                textSecondary: '#a7f3d0'
            },
            purple: {
                primary: '#7c3aed',
                background: '#1e1b4b',
                surface: '#312e81',
                textPrimary: '#e0e7ff',
                textSecondary: '#c7d2fe'
            },
            orange: {
                primary: '#ea580c',
                background: '#1c1917',
                surface: '#292524',
                textPrimary: '#fafaf9',
                textSecondary: '#d6d3d1'
            }
        };

        const selectedPreset = presets[preset];
        if (selectedPreset) {
            Object.keys(selectedPreset).forEach(key => {
                document.getElementById(`${key}-color`).value = selectedPreset[key];
                document.getElementById(`${key}-color-text`).value = selectedPreset[key];
            });
        }
    }

    previewTheme() {
        this.applyTheme();
        this.openPreview();
    }

    resetTheme() {
        this.websiteData.theme = this.getDefaultData().theme;
        this.loadThemeData();
        this.applyTheme();
        this.showNotification('Theme reset to defaults!', 'success');
    }

    // ===============================================
    // Website Integration
    // ===============================================

    updateWebsite() {
        // Store data in localStorage for main website to access
        localStorage.setItem('websiteContent', JSON.stringify(this.websiteData));
        
        // Trigger custom event for real-time updates
        window.dispatchEvent(new CustomEvent('websiteContentUpdated', {
            detail: this.websiteData
        }));
        
        this.showNotification('Website updated successfully!', 'success');
    }

    // ===============================================
    // Preview & Export
    // ===============================================

    openPreview() {
        const modal = document.getElementById('preview-modal');
        const iframe = document.getElementById('preview-frame');
        
        // Refresh the iframe to show latest changes
        iframe.src = '../index.html?' + new Date().getTime();
        
        modal.classList.add('active');
    }

    exportData() {
        const dataStr = JSON.stringify(this.websiteData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'website-data.json';
        link.click();
        
        URL.revokeObjectURL(url);
        this.showNotification('Data exported successfully!', 'success');
    }

    // ===============================================
    // Notifications
    // ===============================================

    showNotification(message, type = 'success') {
        const notification = document.getElementById('admin-notification');
        const icon = notification.querySelector('.notification-icon');
        const messageEl = notification.querySelector('.notification-message');
        
        // Set icon based on type
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle'
        };
        
        icon.className = `notification-icon ${icons[type] || icons.success}`;
        messageEl.textContent = message;
        
        notification.className = `admin-notification ${type} show`;
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    showAuthError(message) {
        const errorEl = document.getElementById('auth-error');
        errorEl.textContent = message;
        setTimeout(() => {
            errorEl.textContent = '';
        }, 3000);
    }

    // ===============================================
    // Initialization
    // ===============================================

    initializeDynamicContent() {
        // Add skill functionality to skill categories
        document.addEventListener('click', (e) => {
            if (e.target.closest('.add-skill')) {
                const category = e.target.closest('.skill-category');
                const skillsList = category.querySelector('.skills-list');
                const newSkillItem = document.createElement('div');
                newSkillItem.className = 'skill-item';
                newSkillItem.innerHTML = `
                    <input type="text" placeholder="Skill Name">
                    <select class="skill-level">
                        <option value="expert">Expert</option>
                        <option value="advanced">Advanced</option>
                        <option value="intermediate">Intermediate</option>
                    </select>
                    <input type="text" placeholder="Icon (e.g., fas fa-chart-line)">
                    <button type="button" class="admin-btn admin-btn-danger admin-btn-sm remove-skill">
                        <i class="fas fa-trash"></i>
                    </button>
                `;
                skillsList.appendChild(newSkillItem);
            }
        });

        // Preview modal close
        document.getElementById('close-preview')?.addEventListener('click', () => {
            document.getElementById('preview-modal').classList.remove('active');
        });

        // Reset all data
        document.getElementById('reset-all')?.addEventListener('click', () => {
            if (confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
                localStorage.removeItem('adminWebsiteData');
                this.websiteData = this.getDefaultData();
                this.loadCurrentSection();
                this.updateWebsite();
                this.showNotification('All data reset to defaults!', 'success');
            }
        });
    }

    loadCurrentSection() {
        this.showSection(this.currentSection);
    }
}

// ===============================================
// Admin Access Integration for Main Website
// ===============================================

class AdminIntegration {
    constructor() {
        this.init();
    }

    init() {
        this.addKeyboardShortcut();
        this.addAdminRoute();
        this.listenForContentUpdates();
    }

    addKeyboardShortcut() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+Shift+A to open admin panel
            if (e.ctrlKey && e.shiftKey && e.key === 'A') {
                e.preventDefault();
                this.openAdminPanel();
            }
        });
    }

    addAdminRoute() {
        // Check if current URL has /admin route
        if (window.location.pathname.includes('/admin/') || window.location.hash === '#admin') {
            this.openAdminPanel();
        }
    }

    openAdminPanel() {
        // Open admin panel in new window/tab
        window.open('admin/index.html', '_blank');
    }

    listenForContentUpdates() {
        window.addEventListener('websiteContentUpdated', (e) => {
            this.applyContentUpdates(e.detail);
        });
    }

    applyContentUpdates(data) {
        // This would be called by the main website to apply updates
        console.log('Content updates received:', data);
        // Implementation would depend on main website structure
    }
}

// ===============================================
// Initialize Admin Panel
// ===============================================

// Check if we're in the admin panel or main website
if (window.location.pathname.includes('/admin/') || document.body.classList.contains('admin-body')) {
    // Initialize admin panel
    const admin = new AdminPanel();
    window.adminPanel = admin; // Make available globally for debugging
} else {
    // Initialize admin integration for main website
    const adminIntegration = new AdminIntegration();
    window.adminIntegration = adminIntegration; // Make available globally
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

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate URL
function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// ===============================================
// Export for use in other files
// ===============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AdminPanel, AdminIntegration };
}