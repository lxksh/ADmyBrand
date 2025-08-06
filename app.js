// Professional ADmyBRAND Landing Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initFAQ();
    initScrollAnimations();
    initCTAButtons();
    initDashboardAnimations();
    initIntersectionObserver();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation link highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navHeight = navbar.offsetHeight;
        const scrollPosition = window.scrollY + navHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`a[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    });
}

// FAQ Accordion functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                const faqAnswer = faq.querySelector('.faq-answer');
                faqAnswer.style.maxHeight = '0';
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            }
        });
    }, observerOptions);
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        observer.observe(element);
    });
}

// CTA Button functionality
function initCTAButtons() {
    const ctaButtons = document.querySelectorAll('.btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonText = this.textContent.trim().toLowerCase();
            
            // Handle different button actions
            if (buttonText.includes('start free trial')) {
                handleFreeTrial(e);
            } else if (buttonText.includes('request demo')) {
                handleRequestDemo(e);
            } else if (buttonText.includes('contact sales')) {
                handleContactSales(e);
            } else if (buttonText.includes('sign in')) {
                handleSignIn(e);
            }
            
            // Add click effect
            addClickEffect(this, e);
        });
    });
}

function handleFreeTrial(e) {
    e.preventDefault();
    showNotification('Starting your free trial...', 'success');
    
    // Simulate form or redirect
    setTimeout(() => {
        showNotification('Redirecting to sign up...', 'info');
    }, 1000);
}

function handleRequestDemo(e) {
    e.preventDefault();
    showNotification('Demo request submitted!', 'success');
    
    // Simulate form submission
    setTimeout(() => {
        showNotification('Our team will contact you within 24 hours.', 'info');
    }, 1000);
}

function handleContactSales(e) {
    e.preventDefault();
    showNotification('Connecting you with our sales team...', 'info');
}

function handleSignIn(e) {
    e.preventDefault();
    showNotification('Redirecting to login...', 'info');
}

// Click effect for buttons
function addClickEffect(button, e) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Dashboard animations
function initDashboardAnimations() {
    const dashboard = document.querySelector('.dashboard-mockup');
    const statCards = document.querySelectorAll('.stat-card');
    const chartBars = document.querySelectorAll('.bar-fill');
    
    if (!dashboard) return;
    
    const dashboardObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate dashboard entrance
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(5deg)';
                entry.target.style.transition = 'all 1s ease-out';
                
                // Animate stat cards
                setTimeout(() => {
                    animateStatCards(statCards);
                }, 300);
                
                // Animate chart bars
                setTimeout(() => {
                    animateChartBars(chartBars);
                }, 600);
                
                dashboardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    dashboard.style.opacity = '0';
    dashboard.style.transform = 'perspective(1000px) rotateY(-15deg) rotateX(15deg) translateY(50px)';
    dashboardObserver.observe(dashboard);
}

function animateStatCards(statCards) {
    statCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transform = 'translateY(0)';
            card.style.opacity = '1';
            card.style.transition = 'all 0.5s ease-out';
            
            // Animate the numbers
            const statValue = card.querySelector('.stat-value');
            animateCounter(statValue);
        }, index * 100);
    });
}

function animateChartBars(chartBars) {
    chartBars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.animation = 'fillUp 1s ease-out forwards';
        }, index * 100);
    });
}

function animateCounter(element) {
    const text = element.textContent;
    const isPercentage = text.includes('%');
    const hasK = text.includes('K');
    const hasM = text.includes('M');
    
    let numericPart = text.replace(/[^0-9.]/g, '');
    let targetValue = parseFloat(numericPart);
    
    if (hasK) targetValue *= 1000;
    if (hasM) targetValue *= 1000000;
    
    let currentValue = 0;
    const increment = targetValue / 50;
    const duration = 20;
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
        }
        
        let displayValue = Math.round(currentValue);
        if (hasK && displayValue >= 1000) {
            displayValue = (displayValue / 1000).toFixed(1) + 'K';
        } else if (hasM && displayValue >= 1000000) {
            displayValue = (displayValue / 1000000).toFixed(1) + 'M';
        }
        
        element.textContent = displayValue + (isPercentage ? '%' : '');
    }, duration);
}

// Intersection Observer for general animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe sections for staggered animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: white;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        padding: 16px 20px;
        z-index: 10000;
        min-width: 300px;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    // Type-specific styling
    if (type === 'success') {
        notification.style.borderLeftColor = 'var(--color-success)';
        notification.style.borderLeftWidth = '4px';
    } else if (type === 'info') {
        notification.style.borderLeftColor = 'var(--color-primary)';
        notification.style.borderLeftWidth = '4px';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });
    
    closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        color: var(--color-text-muted);
        padding: 0;
        margin-left: 10px;
    `;
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 4000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return '✓';
        case 'info': return 'ℹ';
        case 'warning': return '⚠';
        case 'error': return '✕';
        default: return 'ℹ';
    }
}

function removeNotification(notification) {
    if (notification && notification.parentNode) {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }
}

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: var(--color-text-primary);
    }
    
    .notification-icon {
        margin-right: 8px;
        font-weight: bold;
    }
    
    .notification-message {
        flex: 1;
    }
    
    .animate-in {
        animation: fadeInUp 0.8s ease-out forwards;
    }
    
    /* Staggered animations for feature cards */
    .features .feature-card:nth-child(1) { animation-delay: 0.1s; }
    .features .feature-card:nth-child(2) { animation-delay: 0.2s; }
    .features .feature-card:nth-child(3) { animation-delay: 0.3s; }
    .features .feature-card:nth-child(4) { animation-delay: 0.4s; }
    .features .feature-card:nth-child(5) { animation-delay: 0.5s; }
    .features .feature-card:nth-child(6) { animation-delay: 0.6s; }
    .features .feature-card:nth-child(7) { animation-delay: 0.7s; }
    .features .feature-card:nth-child(8) { animation-delay: 0.8s; }
    
    /* Active nav link styling */
    .nav-link.active {
        color: var(--color-primary);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
    
    /* Enhanced button hover effects */
    .btn:hover {
        transform: translateY(-1px);
    }
    
    .btn:active {
        transform: translateY(0);
    }
    
    /* Dashboard stat cards initial state */
    .stat-card {
        opacity: 0;
        transform: translateY(20px);
    }
    
    /* Trust indicators animation */
    .trust-stat {
        opacity: 0;
        transform: translateY(20px);
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .trust-stat:nth-child(1) { animation-delay: 0.2s; }
    .trust-stat:nth-child(2) { animation-delay: 0.4s; }
    .trust-stat:nth-child(3) { animation-delay: 0.6s; }
    
    /* Pricing card hover enhancements */
    .pricing-card:hover .plan-price {
        transform: scale(1.05);
        transition: transform 0.2s ease;
    }
    
    /* Testimonial card quote effect */
    .testimonial-card:hover::before {
        opacity: 0.2;
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(style);

// Initialize trust indicators animation when they come into view
function initTrustIndicators() {
    const trustStats = document.querySelectorAll('.trust-stat');
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.5 });
    
    trustStats.forEach(stat => {
        stat.style.animationPlayState = 'paused';
        observer.observe(stat);
    });
}

// Enhanced mobile experience
function initMobileExperience() {
    if (window.innerWidth <= 768) {
        // Adjust dashboard mockup for mobile
        const dashboard = document.querySelector('.dashboard-mockup');
        if (dashboard) {
            dashboard.style.transform = 'none';
        }
        
        // Make cards more touch-friendly
        const cards = document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card');
        cards.forEach(card => {
            card.style.cursor = 'pointer';
            card.addEventListener('touchstart', function() {
                this.style.transform = 'translateY(-2px)';
            });
            card.addEventListener('touchend', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
}

// Initialize mobile experience
initMobileExperience();
initTrustIndicators();

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

// Optimize scroll performance
const optimizedScrollHandler = debounce(function() {
    // Scroll-based logic here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Accessibility improvements
function initAccessibility() {
    // Add keyboard navigation for FAQ
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Add focus indicators for better keyboard navigation
    const focusableElements = document.querySelectorAll('button, a, input, select, textarea');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--color-primary)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

initAccessibility();

console.log('🚀 ADmyBRAND Professional Landing Page - All systems operational');
console.log('✅ Navigation initialized');
console.log('✅ FAQ accordion ready');
console.log('✅ Animations configured');
console.log('✅ CTA buttons active');
console.log('✅ Dashboard mockup ready');
console.log('💼 Professional experience ready for marketing professionals');