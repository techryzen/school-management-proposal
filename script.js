// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileNavigation();
    initScrollAnimations();
    initScrollProgress();
    initSmoothScrolling();
    initNavbarScroll();
    initCounterAnimations();
    initParallaxEffects();
    initButtonInteractions();
});

// Mobile Navigation Toggle
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const animatedElements = [
        '.feature-card',
        '.overview-item',
        '.flow-step',
        '.tech-category',
        '.timeline-item',
        '.hero-card'
    ];

    animatedElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            element.classList.add('fade-in');
            element.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(element);
        });
    });
}

// Scroll Progress Bar
function initScrollProgress() {
    // Create progress bar element
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Smooth scrolling for CTA buttons
    const ctaButtons = document.querySelectorAll('.btn[href^="#"]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }

        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Counter Animations (for statistics)
function initCounterAnimations() {
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Parallax Effects
function initParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Button Interactions
function initButtonInteractions() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
    });

    // CTA Button Actions - Request Demo functionality
    document.addEventListener('click', function(e) {
        if (e.target.textContent.includes('Request Demo')) {
            e.preventDefault();
            showModal('Request Demo', 'Thank you for your interest! Our team will contact you within 24 hours to schedule a personalized demo of the School Management System.');
        }
        
        if (e.target.textContent.includes('Download Proposal')) {
            e.preventDefault();
            showModal('Download Proposal', 'The detailed project proposal has been prepared for download. Please contact us at rishabagarwal27@gmail.com to receive the complete documentation.');
        }
    });
}

// Modal functionality
function showModal(title, message) {
    // Create modal if it doesn't exist
    let modal = document.querySelector('.custom-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.className = 'custom-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title"></h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p class="modal-message"></p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary modal-ok">OK</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Add modal styles
        const modalStyles = `
            .custom-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .custom-modal.active {
                opacity: 1;
                visibility: visible;
            }
            
            .modal-content {
                background: white;
                border-radius: 15px;
                max-width: 500px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                transform: scale(0.7);
                transition: transform 0.3s ease;
            }
            
            .custom-modal.active .modal-content {
                transform: scale(1);
            }
            
            .modal-header {
                padding: 1.5rem;
                border-bottom: 1px solid #e5e7eb;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .modal-title {
                margin: 0;
                font-size: 1.3rem;
                font-weight: 600;
                color: #1f2937;
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #6b7280;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.3s ease;
            }
            
            .modal-close:hover {
                background: #f3f4f6;
                color: #1f2937;
            }
            
            .modal-body {
                padding: 1.5rem;
            }
            
            .modal-message {
                margin: 0;
                color: #6b7280;
                line-height: 1.6;
            }
            
            .modal-footer {
                padding: 1.5rem;
                border-top: 1px solid #e5e7eb;
                text-align: right;
            }
            
            .modal-ok {
                min-width: 100px;
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);
        
        // Add event listeners
        const closeBtn = modal.querySelector('.modal-close');
        const okBtn = modal.querySelector('.modal-ok');
        
        closeBtn.addEventListener('click', () => closeModal(modal));
        okBtn.addEventListener('click', () => closeModal(modal));
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    }
    
    // Update modal content
    modal.querySelector('.modal-title').textContent = title;
    modal.querySelector('.modal-message').textContent = message;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Active Navigation Link Highlighting
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize active navigation
initActiveNavigation();

// Typing Animation for Hero Title
function initTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid white';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
}

// Initialize typing animation
setTimeout(initTypingAnimation, 500);

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize lazy loading
initLazyLoading();

// Scroll to Top Button
function initScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

// Initialize scroll to top
initScrollToTop();

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Any scroll-heavy operations can be placed here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Console welcome message
// Interactive User Flow Functionality
function initUserFlowInteractivity() {
    const userTypes = document.querySelectorAll('.user-type');
    const flowSteps = document.querySelectorAll('.flow-step');
    const progressFill = document.querySelector('.progress-fill');
    const currentStepSpan = document.querySelector('.current-step');
    
    let currentStep = 1;
    let currentUserType = 'student';
    let isAutoPlaying = false;
    
    // User type switching
    userTypes.forEach(userType => {
        userType.addEventListener('click', function() {
            userTypes.forEach(ut => ut.classList.remove('active'));
            this.classList.add('active');
            currentUserType = this.dataset.user;
            updateFlowContent(currentUserType);
        });
    });
    
    // Step navigation
    flowSteps.forEach((step, index) => {
        step.addEventListener('click', function() {
            if (!isAutoPlaying) {
                activateStep(index + 1);
            }
        });
    });
    
    function activateStep(stepNumber) {
        currentStep = stepNumber;
        
        // Update active states
        flowSteps.forEach((step, index) => {
            step.classList.remove('active');
            if (index + 1 <= stepNumber) {
                step.classList.add('active');
            }
        });
        
        // Update progress
        const progressPercentage = (stepNumber / 5) * 100;
        progressFill.style.width = `${progressPercentage}%`;
        currentStepSpan.textContent = stepNumber;
        
        // Add pulse animation to current step
        const currentStepElement = document.querySelector(`[data-step="${stepNumber}"] .step-circle`);
        if (currentStepElement) {
            currentStepElement.classList.add('pulse');
            setTimeout(() => {
                currentStepElement.classList.remove('pulse');
            }, 2000);
        }
    }
    
    function updateFlowContent(userType) {
        const contentMap = {
            student: {
                1: {
                    title: "Student Login & Authentication",
                    description: "Quick access with student ID and secure password or biometric login",
                    details: [
                        { icon: "fas fa-id-card", text: "Student ID verification" },
                        { icon: "fas fa-mobile-alt", text: "SMS OTP verification" },
                        { icon: "fas fa-fingerprint", text: "Biometric authentication" }
                    ]
                },
                2: {
                    title: "Student Dashboard",
                    description: "Personalized view with grades, assignments, and upcoming events",
                    details: [
                        { icon: "fas fa-chart-line", text: "Academic progress tracking" },
                        { icon: "fas fa-calendar-check", text: "Assignment deadlines" },
                        { icon: "fas fa-bell", text: "Important announcements" }
                    ]
                },
                3: {
                    title: "Academic Modules",
                    description: "Access to homework, grades, attendance, and learning resources",
                    details: [
                        { icon: "fas fa-book", text: "Digital assignments" },
                        { icon: "fas fa-chart-bar", text: "Grade reports" },
                        { icon: "fas fa-calendar-alt", text: "Attendance tracking" }
                    ]
                },
                4: {
                    title: "Student Communication",
                    description: "Chat with teachers, join study groups, and receive notifications",
                    details: [
                        { icon: "fas fa-comments", text: "Teacher messaging" },
                        { icon: "fas fa-users", text: "Study group chats" },
                        { icon: "fas fa-bullhorn", text: "School announcements" }
                    ]
                },
                5: {
                    title: "Progress Analytics",
                    description: "Detailed reports on academic performance and improvement suggestions",
                    details: [
                        { icon: "fas fa-trophy", text: "Achievement tracking" },
                        { icon: "fas fa-target", text: "Goal setting" },
                        { icon: "fas fa-download", text: "Progress reports" }
                    ]
                }
            },
            teacher: {
                1: {
                    title: "Teacher Authentication",
                    description: "Secure login with employee credentials and two-factor authentication",
                    details: [
                        { icon: "fas fa-id-badge", text: "Employee ID login" },
                        { icon: "fas fa-shield-alt", text: "Two-factor security" },
                        { icon: "fas fa-key", text: "Role-based access" }
                    ]
                },
                2: {
                    title: "Teacher Dashboard",
                    description: "Class management interface with student progress and teaching tools",
                    details: [
                        { icon: "fas fa-chalkboard", text: "Class overview" },
                        { icon: "fas fa-users", text: "Student management" },
                        { icon: "fas fa-tasks", text: "Assignment tracking" }
                    ]
                },
                3: {
                    title: "Teaching Tools",
                    description: "Grade management, assignment creation, and attendance tracking",
                    details: [
                        { icon: "fas fa-edit", text: "Grade entry" },
                        { icon: "fas fa-plus-circle", text: "Create assignments" },
                        { icon: "fas fa-check-circle", text: "Attendance marking" }
                    ]
                },
                4: {
                    title: "Teacher Communication",
                    description: "Parent communication, student feedback, and colleague collaboration",
                    details: [
                        { icon: "fas fa-envelope", text: "Parent messaging" },
                        { icon: "fas fa-comment-alt", text: "Student feedback" },
                        { icon: "fas fa-handshake", text: "Staff collaboration" }
                    ]
                },
                5: {
                    title: "Class Analytics",
                    description: "Student performance insights and teaching effectiveness metrics",
                    details: [
                        { icon: "fas fa-chart-pie", text: "Class performance" },
                        { icon: "fas fa-lightbulb", text: "Teaching insights" },
                        { icon: "fas fa-file-alt", text: "Progress reports" }
                    ]
                }
            },
            parent: {
                1: {
                    title: "Parent Access Login",
                    description: "Secure login linked to child's account with verification",
                    details: [
                        { icon: "fas fa-user-friends", text: "Child account linking" },
                        { icon: "fas fa-mobile-alt", text: "Phone verification" },
                        { icon: "fas fa-lock", text: "Secure access" }
                    ]
                },
                2: {
                    title: "Parent Dashboard",
                    description: "Overview of child's academic progress and school activities",
                    details: [
                        { icon: "fas fa-child", text: "Child's progress" },
                        { icon: "fas fa-calendar", text: "School events" },
                        { icon: "fas fa-exclamation-triangle", text: "Important alerts" }
                    ]
                },
                3: {
                    title: "Monitoring Tools",
                    description: "Track attendance, grades, homework, and fee payments",
                    details: [
                        { icon: "fas fa-eye", text: "Attendance monitoring" },
                        { icon: "fas fa-star", text: "Grade tracking" },
                        { icon: "fas fa-credit-card", text: "Fee management" }
                    ]
                },
                4: {
                    title: "Parent Communication",
                    description: "Direct communication with teachers and school administration",
                    details: [
                        { icon: "fas fa-chalkboard-teacher", text: "Teacher meetings" },
                        { icon: "fas fa-phone", text: "School contact" },
                        { icon: "fas fa-calendar-plus", text: "Appointment booking" }
                    ]
                },
                5: {
                    title: "Child's Reports",
                    description: "Comprehensive academic and behavioral reports with insights",
                    details: [
                        { icon: "fas fa-graduation-cap", text: "Academic reports" },
                        { icon: "fas fa-smile", text: "Behavioral insights" },
                        { icon: "fas fa-trend-up", text: "Progress trends" }
                    ]
                }
            },
            admin: {
                1: {
                    title: "Admin Authentication",
                    description: "High-security login with administrative privileges and audit trails",
                    details: [
                        { icon: "fas fa-user-shield", text: "Admin privileges" },
                        { icon: "fas fa-history", text: "Audit logging" },
                        { icon: "fas fa-fingerprint", text: "Biometric security" }
                    ]
                },
                2: {
                    title: "Admin Dashboard",
                    description: "System-wide overview with key metrics and management tools",
                    details: [
                        { icon: "fas fa-tachometer-alt", text: "System metrics" },
                        { icon: "fas fa-cogs", text: "Management tools" },
                        { icon: "fas fa-users-cog", text: "User management" }
                    ]
                },
                3: {
                    title: "System Management",
                    description: "User management, system configuration, and data administration",
                    details: [
                        { icon: "fas fa-database", text: "Data management" },
                        { icon: "fas fa-sliders-h", text: "System settings" },
                        { icon: "fas fa-user-plus", text: "User creation" }
                    ]
                },
                4: {
                    title: "Administrative Tools",
                    description: "Bulk operations, notifications, and system-wide communications",
                    details: [
                        { icon: "fas fa-bullhorn", text: "Mass notifications" },
                        { icon: "fas fa-upload", text: "Bulk operations" },
                        { icon: "fas fa-broadcast-tower", text: "System alerts" }
                    ]
                },
                5: {
                    title: "System Analytics",
                    description: "Comprehensive system reports, usage analytics, and performance metrics",
                    details: [
                        { icon: "fas fa-chart-area", text: "Usage analytics" },
                        { icon: "fas fa-server", text: "Performance metrics" },
                        { icon: "fas fa-file-export", text: "System reports" }
                    ]
                }
            }
        };
        
        const userContent = contentMap[userType];
        if (userContent) {
            flowSteps.forEach((step, index) => {
                const stepNumber = index + 1;
                const content = userContent[stepNumber];
                if (content) {
                    const titleElement = step.querySelector('h3');
                    const descriptionElement = step.querySelector('.step-description');
                    const detailsContainer = step.querySelector('.step-details');
                    
                    if (titleElement) titleElement.textContent = content.title;
                    if (descriptionElement) descriptionElement.textContent = content.description;
                    
                    if (detailsContainer && content.details) {
                        detailsContainer.innerHTML = content.details.map(detail => 
                            `<div class="detail-item">
                                <i class="${detail.icon}"></i>
                                <span>${detail.text}</span>
                            </div>`
                        ).join('');
                    }
                }
            });
        }
    }
    
    // Initialize with default content
    updateFlowContent(currentUserType);
    activateStep(1);
}

// Modal functionality for step details
function showStepModal(stepNumber) {
    const modal = document.createElement('div');
    modal.className = 'step-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Step ${stepNumber} Details</h3>
                <button class="modal-close" onclick="closeStepModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="step-detail-content">
                    <div class="step-visual">
                        <div class="step-icon-large">
                            <i class="fas fa-${getStepIcon(stepNumber)}"></i>
                        </div>
                    </div>
                    <div class="step-info">
                        <h4>${getStepTitle(stepNumber)}</h4>
                        <p>${getStepDescription(stepNumber)}</p>
                        <div class="step-features">
                            ${getStepFeatures(stepNumber).map(feature => 
                                `<div class="feature-item">
                                    <i class="fas fa-check-circle"></i>
                                    <span>${feature}</span>
                                </div>`
                            ).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
}

function closeStepModal() {
    const modal = document.querySelector('.step-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }
}

function getStepIcon(stepNumber) {
    const icons = ['sign-in-alt', 'tachometer-alt', 'th-large', 'comments', 'chart-bar'];
    return icons[stepNumber - 1] || 'info-circle';
}

function getStepTitle(stepNumber) {
    const step = document.querySelector(`[data-step="${stepNumber}"] h3`);
    return step ? step.textContent : `Step ${stepNumber}`;
}

function getStepDescription(stepNumber) {
    const step = document.querySelector(`[data-step="${stepNumber}"] .step-description`);
    return step ? step.textContent : 'Detailed information about this step.';
}

function getStepFeatures(stepNumber) {
    const features = [
        ['Multi-factor authentication', 'Role-based access control', 'Secure session management', 'Password recovery system'],
        ['Customizable widgets', 'Real-time notifications', 'Quick action buttons', 'Personalized content'],
        ['Intuitive navigation', 'Search functionality', 'Favorite shortcuts', 'Recent activity tracking'],
        ['Instant messaging', 'Video conferencing', 'File sharing', 'Group collaboration'],
        ['Advanced analytics', 'Custom reports', 'Data visualization', 'Export capabilities']
    ];
    return features[stepNumber - 1] || ['Feature 1', 'Feature 2', 'Feature 3'];
}

// Interactive demo functionality
function startInteractiveDemo() {
    const demoBtn = document.querySelector('.demo-btn');
    const originalText = demoBtn.innerHTML;
    
    demoBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Starting Demo...';
    demoBtn.disabled = true;
    
    setTimeout(() => {
        demoBtn.innerHTML = '<i class="fas fa-stop"></i> Stop Demo';
        demoBtn.disabled = false;
        demoBtn.onclick = stopInteractiveDemo;
        
        // Start auto-progression through steps
        autoProgressSteps();
    }, 1000);
}

function stopInteractiveDemo() {
    const demoBtn = document.querySelector('.demo-btn');
    demoBtn.innerHTML = '<i class="fas fa-play"></i> Start Interactive Demo';
    demoBtn.onclick = startInteractiveDemo;
    
    // Clear any running intervals
    if (window.demoInterval) {
        clearInterval(window.demoInterval);
        window.demoInterval = null;
    }
}

function autoProgressSteps() {
    let currentStep = 1;
    const totalSteps = 5;
    
    // Activate first step
    activateStep(currentStep);
    
    window.demoInterval = setInterval(() => {
        currentStep++;
        if (currentStep > totalSteps) {
            currentStep = 1;
        }
        activateStep(currentStep);
    }, 3000);
}

function activateStep(stepNumber) {
    const flowSteps = document.querySelectorAll('.flow-step');
    const progressFill = document.querySelector('.progress-fill');
    const currentStepSpan = document.querySelector('.current-step');
    
    // Update active states
    flowSteps.forEach((step, index) => {
        step.classList.remove('active');
        if (index + 1 === stepNumber) {
            step.classList.add('active');
            step.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
    
    // Update progress
    const progressPercentage = (stepNumber / 5) * 100;
    if (progressFill) progressFill.style.width = `${progressPercentage}%`;
    if (currentStepSpan) currentStepSpan.textContent = stepNumber;
}

// Add modal styles
const modalStyles = `
<style>
.step-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.step-modal.active {
    opacity: 1;
}

.modal-content {
    background: white;
    border-radius: 20px;
    max-width: 600px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    transform: scale(0.9);
    transition: transform 0.3s ease;
}

.step-modal.active .modal-content {
    transform: scale(1);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 2rem 1rem;
    border-bottom: 1px solid #e9ecef;
}

.modal-header h3 {
    margin: 0;
    color: #2c3e50;
}

.modal-close {
    background: none;
    border: none;
    font-size: 2rem;
    color: #6c757d;
    cursor: pointer;
    padding: 0;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.3s ease;
}

.modal-close:hover {
    background: #f8f9fa;
    color: #495057;
}

.modal-body {
    padding: 2rem;
}

.step-detail-content {
    display: flex;
    gap: 2rem;
    align-items: flex-start;
}

.step-visual {
    flex-shrink: 0;
}

.step-icon-large {
    width: 100px;
    height: 100px;
    background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 2.5rem;
}

.step-info h4 {
    margin: 0 0 1rem 0;
    color: #2c3e50;
    font-size: 1.5rem;
}

.step-info p {
    color: #6c757d;
    line-height: 1.6;
    margin-bottom: 2rem;
}

.step-features {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.feature-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: #495057;
}

.feature-item i {
    color: #28a745;
    font-size: 1.1rem;
}

@media (max-width: 768px) {
    .step-detail-content {
        flex-direction: column;
        text-align: center;
    }
    
    .modal-content {
        margin: 1rem;
        width: calc(100% - 2rem);
    }
}
</style>
`;

// Add styles to head
document.head.insertAdjacentHTML('beforeend', modalStyles);

// Initialize User Flow functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initUserFlowInteractivity();
});

// Pricing Section Functionality
function initPricingInteractivity() {
    const pricingToggle = document.getElementById('pricing-toggle');
    const annualPrices = document.querySelectorAll('.annual-price');
    const lifetimePrices = document.querySelectorAll('.lifetime-price');
    const annualPeriods = document.querySelectorAll('.annual-period');
    const lifetimePeriods = document.querySelectorAll('.lifetime-period');
    const pricingCards = document.querySelectorAll('.pricing-card');

    // Toggle functionality
    if (pricingToggle) {
        pricingToggle.addEventListener('change', function() {
            const isLifetime = this.checked;
            
            // Animate price changes
            annualPrices.forEach((price, index) => {
                const lifetimePrice = lifetimePrices[index];
                const annualPeriod = annualPeriods[index];
                const lifetimePeriod = lifetimePeriods[index];
                
                if (isLifetime) {
                    // Fade out annual, fade in lifetime
                    price.style.opacity = '0';
                    annualPeriod.style.opacity = '0';
                    
                    setTimeout(() => {
                        price.style.display = 'none';
                        annualPeriod.style.display = 'none';
                        lifetimePrice.style.display = 'inline';
                        lifetimePeriod.style.display = 'inline';
                        
                        setTimeout(() => {
                            lifetimePrice.style.opacity = '1';
                            lifetimePeriod.style.opacity = '1';
                        }, 50);
                    }, 200);
                } else {
                    // Fade out lifetime, fade in annual
                    lifetimePrice.style.opacity = '0';
                    lifetimePeriod.style.opacity = '0';
                    
                    setTimeout(() => {
                        lifetimePrice.style.display = 'none';
                        lifetimePeriod.style.display = 'none';
                        price.style.display = 'inline';
                        annualPeriod.style.display = 'inline';
                        
                        setTimeout(() => {
                            price.style.opacity = '1';
                            annualPeriod.style.opacity = '1';
                        }, 50);
                    }, 200);
                }
            });
        });
    }

    // Card hover animations
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle animation to features
            const features = this.querySelectorAll('.feature');
            features.forEach((feature, index) => {
                setTimeout(() => {
                    feature.style.transform = 'translateX(5px)';
                }, index * 50);
            });
        });

        card.addEventListener('mouseleave', function() {
            const features = this.querySelectorAll('.feature');
            features.forEach(feature => {
                feature.style.transform = 'translateX(0)';
            });
        });
    });

    // CTA Button interactions
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Show pricing modal or redirect
            const planName = this.closest('.pricing-card').querySelector('.plan-name').textContent;
            showPricingModal(planName);
        });
    });

    // Animate pricing cards on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.1 });

    pricingCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// Pricing Modal
function showPricingModal(planName) {
    const modal = document.createElement('div');
    modal.className = 'pricing-modal';
    modal.innerHTML = `
        <div class="pricing-modal-content">
            <div class="pricing-modal-header">
                <h3>Get Started with ${planName} Plan</h3>
                <button class="pricing-modal-close">&times;</button>
            </div>
            <div class="pricing-modal-body">
                <div class="contact-form-pricing">
                    <div class="form-group">
                        <label for="school-name">School Name</label>
                        <input type="text" id="school-name" placeholder="Enter your school name" required>
                    </div>
                    <div class="form-group">
                        <label for="contact-person">Contact Person</label>
                        <input type="text" id="contact-person" placeholder="Your name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input type="email" id="email" placeholder="your@email.com" required>
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone Number</label>
                        <input type="tel" id="phone" placeholder="+91 XXXXX XXXXX" required>
                    </div>
                    <div class="form-group">
                        <label for="students-count">Number of Students</label>
                        <select id="students-count" required>
                            <option value="">Select range</option>
                            <option value="0-500">0 - 500 students</option>
                            <option value="501-1500">501 - 1,500 students</option>
                            <option value="1501+">1,501+ students</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="message">Additional Requirements</label>
                        <textarea id="message" placeholder="Tell us about your specific needs..." rows="4"></textarea>
                    </div>
                    <button class="submit-pricing-form">
                        <span>Request Demo & Quote</span>
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    
    // Add modal styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .pricing-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .pricing-modal.active {
            opacity: 1;
        }
        
        .pricing-modal-content {
            background: white;
            border-radius: 20px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        }
        
        .pricing-modal.active .pricing-modal-content {
            transform: scale(1);
        }
        
        .pricing-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2rem 2rem 1rem;
            border-bottom: 1px solid #e9ecef;
        }
        
        .pricing-modal-header h3 {
            margin: 0;
            color: #2c3e50;
        }
        
        .pricing-modal-close {
            background: none;
            border: none;
            font-size: 2rem;
            color: #6c757d;
            cursor: pointer;
            padding: 0;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .pricing-modal-close:hover {
            background: #f8f9fa;
            color: #495057;
        }
        
        .pricing-modal-body {
            padding: 2rem;
        }
        
        .contact-form-pricing .form-group {
            margin-bottom: 1.5rem;
        }
        
        .contact-form-pricing label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: #2c3e50;
        }
        
        .contact-form-pricing input,
        .contact-form-pricing select,
        .contact-form-pricing textarea {
            width: 100%;
            padding: 0.8rem;
            border: 2px solid #e9ecef;
            border-radius: 10px;
            font-size: 1rem;
            transition: border-color 0.3s ease;
        }
        
        .contact-form-pricing input:focus,
        .contact-form-pricing select:focus,
        .contact-form-pricing textarea:focus {
            outline: none;
            border-color: #667eea;
        }
        
        .submit-pricing-form {
            width: 100%;
            padding: 1rem 2rem;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border: none;
            border-radius: 50px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }
        
        .submit-pricing-form:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
        }
    `;
    
    document.head.appendChild(modalStyles);
    
    // Animate modal
    setTimeout(() => modal.classList.add('active'), 10);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.pricing-modal-close');
    closeBtn.addEventListener('click', () => closePricingModal(modal));
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closePricingModal(modal);
    });
    
    // Form submission
    const submitBtn = modal.querySelector('.submit-pricing-form');
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handlePricingFormSubmission(modal, planName);
    });
}

function closePricingModal(modal) {
    modal.classList.remove('active');
    setTimeout(() => {
        modal.remove();
    }, 300);
}

function handlePricingFormSubmission(modal, planName) {
    const schoolName = modal.querySelector('#school-name').value;
    const contactPerson = modal.querySelector('#contact-person').value;
    const email = modal.querySelector('#email').value;
    const phone = modal.querySelector('#phone').value;
    const studentsCount = modal.querySelector('#students-count').value;
    
    if (!schoolName || !contactPerson || !email || !phone || !studentsCount) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Simulate form submission
    const submitBtn = modal.querySelector('.submit-pricing-form');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        closePricingModal(modal);
        showSuccessMessage(planName, contactPerson);
    }, 2000);
}

function showSuccessMessage(planName, contactPerson) {
    const successModal = document.createElement('div');
    successModal.className = 'success-modal';
    successModal.innerHTML = `
        <div class="success-content">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Thank You, ${contactPerson}!</h3>
            <p>Your request for the <strong>${planName} Plan</strong> has been received.</p>
            <p>Our team will contact you within 24 hours to schedule a personalized demo.</p>
            <button class="success-close">Continue Exploring</button>
        </div>
    `;
    
    const successStyles = document.createElement('style');
    successStyles.textContent = `
        .success-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10001;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .success-modal.active {
            opacity: 1;
        }
        
        .success-content {
            background: white;
            border-radius: 20px;
            padding: 3rem;
            text-align: center;
            max-width: 400px;
            width: 90%;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        }
        
        .success-modal.active .success-content {
            transform: scale(1);
        }
        
        .success-icon {
            font-size: 4rem;
            color: #27ae60;
            margin-bottom: 1rem;
        }
        
        .success-content h3 {
            color: #2c3e50;
            margin-bottom: 1rem;
        }
        
        .success-content p {
            color: #6c757d;
            margin-bottom: 1rem;
            line-height: 1.6;
        }
        
        .success-close {
            background: linear-gradient(135deg, #27ae60, #2ecc71);
            color: white;
            border: none;
            padding: 1rem 2rem;
            border-radius: 50px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .success-close:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(39, 174, 96, 0.3);
        }
    `;
    
    document.head.appendChild(successStyles);
    document.body.appendChild(successModal);
    
    setTimeout(() => successModal.classList.add('active'), 10);
    
    const closeBtn = successModal.querySelector('.success-close');
    closeBtn.addEventListener('click', () => {
        successModal.classList.remove('active');
        setTimeout(() => successModal.remove(), 300);
    });
}

// Add ripple animation keyframes
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyles);

// Initialize pricing functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initPricingInteractivity();
});

console.log('%c🎓 School Management System - Project Proposal', 'color: #ff6b35; font-size: 16px; font-weight: bold;');
console.log('%cWelcome to the interactive project proposal! This website showcases a comprehensive school management solution.', 'color: #6b7280; font-size: 12px;');