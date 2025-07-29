// Main JavaScript for Educate Website Clone
// Following modern ES6+ practices and accessibility guidelines

class EducateWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupMobileMenu();
        this.setupModal();
        this.setupSmoothScrolling();
        this.setupIntersectionObserver();
        this.setupFormHandling();
        this.setupLazyLoading();
        this.setupAccessibility();
    }

    setupEventListeners() {
        // Mobile menu toggle
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger?.classList.remove('active');
                navMenu?.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger?.contains(e.target) && !navMenu?.contains(e.target)) {
                hamburger?.classList.remove('active');
                navMenu?.classList.remove('active');
            }
        });

        // Header scroll effect
        let lastScrollTop = 0;
        const header = document.querySelector('.header');
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                header?.classList.add('header-hidden');
            } else {
                // Scrolling up
                header?.classList.remove('header-hidden');
            }
            
            lastScrollTop = scrollTop;
        });
    }

    setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const bars = document.querySelectorAll('.bar');
        
        if (hamburger) {
            hamburger.addEventListener('click', () => {
                bars.forEach((bar, index) => {
                    if (hamburger.classList.contains('active')) {
                        bar.style.transform = 'rotate(0deg)';
                        if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                        if (index === 1) bar.style.opacity = '0';
                        if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                    } else {
                        bar.style.transform = 'rotate(0deg)';
                        bar.style.opacity = '1';
                    }
                });
            });
        }
    }

    setupModal() {
        const modal = document.getElementById('contact');
        const contactLinks = document.querySelectorAll('a[href="#contact"]');
        const closeBtn = document.querySelector('.close');
        
        if (modal) {
            // Open modal
            contactLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.openModal(modal);
                });
            });

            // Close modal
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    this.closeModal(modal);
                });
            }

            // Close modal when clicking outside
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal);
                }
            });

            // Close modal with Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.style.display === 'block') {
                    this.closeModal(modal);
                }
            });
        }
    }

    openModal(modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Focus management for accessibility
        const firstInput = modal.querySelector('input, select, textarea');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }

    closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Return focus to the element that opened the modal
        const activeElement = document.activeElement;
        if (activeElement) {
            activeElement.focus();
        }
    }

    setupSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.program-card, .program-item, .feature-item, .branch-card, .testimonial-card, .teacher-card, .blog-card');
        animateElements.forEach(el => observer.observe(el));
    }

    setupFormHandling() {
        const contactForm = document.querySelector('.contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(contactForm);
            });
        }
    }

    async handleFormSubmission(form) {
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        try {
            // Show loading state
            submitBtn.textContent = 'Mengirim...';
            submitBtn.disabled = true;
            form.classList.add('loading');
            
            // Simulate form submission (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            this.showNotification('Pesan berhasil dikirim! Kami akan menghubungi Anda segera.', 'success');
            form.reset();
            
        } catch (error) {
            // Show error message
            this.showNotification('Terjadi kesalahan. Silakan coba lagi.', 'error');
            console.error('Form submission error:', error);
            
        } finally {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            form.classList.remove('loading');
        }
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" aria-label="Close notification">×</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            max-width: 400px;
            animation: slideInRight 0.3s ease-out;
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease-out';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    setupLazyLoading() {
        // Intersection Observer for lazy loading images
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        // Observe all images with lazy loading
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    setupAccessibility() {
        // Skip to content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add main content landmark
        const mainContent = document.querySelector('.hero');
        if (mainContent) {
            mainContent.id = 'main-content';
        }
        
        // Keyboard navigation for dropdown menus
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const trigger = dropdown.querySelector('.nav-link');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            if (trigger && menu) {
                trigger.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
                    }
                });
            }
        });
        
        // Announce dynamic content changes to screen readers
        this.setupLiveRegion();
    }

    setupLiveRegion() {
        // Create live region for announcements
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
        document.body.appendChild(liveRegion);
        
        // Store reference for use in other methods
        this.liveRegion = liveRegion;
    }

    announceToScreenReader(message) {
        if (this.liveRegion) {
            this.liveRegion.textContent = message;
        }
    }

    // Utility methods
    debounce(func, wait) {
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

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Performance optimization: Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new EducateWebsite();
    });
} else {
    new EducateWebsite();
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .header-hidden {
        transform: translateY(-100%);
    }
    
    .header {
        transition: transform 0.3s ease;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
    
    .sr-only {
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EducateWebsite;
} 

// Features gallery image changer with sliding animation
function changeMainImage(imageSrc) {
    const mainImg = document.getElementById('features-main-img');
    if (mainImg) {
        // Slide out to the left
        mainImg.style.transform = 'translateX(-100%)';
        
        setTimeout(() => {
            // Change the image source
            mainImg.src = imageSrc;
            
            // Slide in from the right
            mainImg.style.transform = 'translateX(0)';
        }, 300);
    }
} 

// Branches section map switcher
function showBranchMap(branch) {
    // Hide all maps
    document.getElementById('branch-map-cibubur').style.display = 'none';
    document.getElementById('branch-map-solo').style.display = 'none';
    document.getElementById('branch-map-jambi').style.display = 'none';
    // Remove selected class from all cards
    document.getElementById('branch-card-cibubur').classList.remove('selected');
    document.getElementById('branch-card-solo').classList.remove('selected');
    document.getElementById('branch-card-jambi').classList.remove('selected');
    // Show selected map and highlight card
    document.getElementById('branch-map-' + branch).style.display = 'block';
    document.getElementById('branch-card-' + branch).classList.add('selected');
} 

// Testimonials carousel functionality
let currentTestimonial = 0;
const totalTestimonials = 4;
const visibleTestimonials = 3;
const maxIndex = totalTestimonials - visibleTestimonials; // 1

function nextTestimonial() {
    currentTestimonial = Math.min(currentTestimonial + 1, maxIndex);
    updateTestimonialDisplay();
}

function prevTestimonial() {
    currentTestimonial = Math.max(currentTestimonial - 1, 0);
    updateTestimonialDisplay();
}

function goToTestimonial(index) {
    currentTestimonial = Math.max(0, Math.min(index, maxIndex));
    updateTestimonialDisplay();
}

function updateTestimonialDisplay() {
    const slider = document.getElementById('testimonials-slider');
    const cards = document.querySelectorAll('.testimonials-new-card');
    const dots = document.querySelectorAll('.testimonials-new-dot');
    // Get card width and gap
    let cardWidth = 300;
    let gap = 24;
    if (cards.length > 0) {
        cardWidth = cards[0].offsetWidth;
        const sliderStyle = window.getComputedStyle(slider);
        gap = parseInt(sliderStyle.columnGap || sliderStyle.gap || 24, 10);
    }
    // Slide the slider
    slider.style.transform = `translateX(-${currentTestimonial * (cardWidth + gap)}px)`;
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentTestimonial);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    updateTestimonialDisplay();
}); 

// Teachers carousel functionality
let currentTeacher = 0;
const totalTeachers = 3;
const visibleTeachers = 3;
const maxTeacherIndex = totalTeachers - visibleTeachers; // 0 (if you add more teachers, update this)

function nextTeacher() {
    currentTeacher = Math.min(currentTeacher + 1, maxTeacherIndex);
    updateTeacherDisplay();
}

function prevTeacher() {
    currentTeacher = Math.max(currentTeacher - 1, 0);
    updateTeacherDisplay();
}

function goToTeacher(index) {
    currentTeacher = Math.max(0, Math.min(index, maxTeacherIndex));
    updateTeacherDisplay();
}

function updateTeacherDisplay() {
    const slider = document.getElementById('teachers-slider');
    const cards = document.querySelectorAll('.teachers-new-card');
    const dots = document.querySelectorAll('.teachers-new-dot');
    // Get card width and gap
    let cardWidth = 300;
    let gap = 24;
    if (cards.length > 0) {
        cardWidth = cards[0].offsetWidth;
        const sliderStyle = window.getComputedStyle(slider);
        gap = parseInt(sliderStyle.columnGap || sliderStyle.gap || 24, 10);
    }
    // Slide the slider
    slider.style.transform = `translateX(-${currentTeacher * (cardWidth + gap)}px)`;
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentTeacher);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    updateTeacherDisplay();
}); 