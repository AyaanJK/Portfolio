// Typing animation for hero section
document.addEventListener('DOMContentLoaded', () => {
    const typedTextElement = document.getElementById('typed-text');
    const subtitleText = "Aspiring Software Engineer & A-Level Student";
    let subtitleIndex = 0;
    
    function typeSubtitle() {
        if (subtitleIndex < subtitleText.length) {
            typedTextElement.textContent += subtitleText.charAt(subtitleIndex);
            subtitleIndex++;
            setTimeout(typeSubtitle, 50);
        }
    }
    
    // Start typing subtitle after a short delay
    setTimeout(typeSubtitle, 500);
});

// Mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Simplified smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Remove focus to prevent any unwanted styling
        this.blur();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced scroll animations with synchronized underlines
const sectionContentVisibility = new Map();

// Special observer for the hero section (no animated cards)
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        const sectionId = entry.target.getAttribute('id');
        if (entry.isIntersecting) {
            sectionContentVisibility.set(sectionId, new Set(['hero-content']));
            updateSectionUnderlines(sectionId);
        } else {
            sectionContentVisibility.set(sectionId, new Set());
            updateSectionUnderlines(sectionId);
        }
    });
}, { 
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
});

// Observe hero section separately
const heroSection = document.getElementById('home');
if (heroSection) {
    heroObserver.observe(heroSection);
}

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        const section = entry.target.closest('section[id]');
        const sectionId = section ? section.getAttribute('id') : null;
        
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Track visible content for this section
            if (sectionId) {
                if (!sectionContentVisibility.has(sectionId)) {
                    sectionContentVisibility.set(sectionId, new Set());
                }
                sectionContentVisibility.get(sectionId).add(entry.target);
                updateSectionUnderlines(sectionId);
            }
        } else {
            // Reset the animation when element leaves viewport
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(40px)';
            
            // Remove from visible content tracking
            if (sectionId) {
                const sectionVisibility = sectionContentVisibility.get(sectionId);
                if (sectionVisibility) {
                    sectionVisibility.delete(entry.target);
                    updateSectionUnderlines(sectionId);
                }
            }
        }
    });
}, { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Function to update underlines based on content visibility
function updateSectionUnderlines(sectionId) {
    const hasVisibleContent = sectionContentVisibility.get(sectionId) && 
                             sectionContentVisibility.get(sectionId).size > 0;
    
    // Update section header underline only
    const section = document.getElementById(sectionId);
    const header = section ? section.querySelector('.section-header h2') : null;
    
    if (hasVisibleContent) {
        if (header) header.classList.add('in-view');
    } else {
        if (header) header.classList.remove('in-view');
    }
}

// Observe all animated elements
document.querySelectorAll(
    '.project-card, .skill-card, .education-item, .experience-item, .contact-item, .contact-form'
).forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(40px)';
    element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    animateOnScroll.observe(element);
});

// Form validation and enhancement
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', function(e) {
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Reset after form submission attempt
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Enhanced hover effects for navigation (only highlighting method now)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Simplified scroll handler for section header underlines only
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    // Handle section header underlines with fallback for sections without animated content
    sections.forEach(section => {
        const sectionId = section.getAttribute('id');
        const hasVisibleContent = sectionContentVisibility.get(sectionId) && 
                                 sectionContentVisibility.get(sectionId).size > 0;
        
        // Only use scroll-based underlines for sections without visible animated content
        if (!hasVisibleContent) {
            const header = section.querySelector('.section-header h2');
            if (header) {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                
                if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                    header.classList.add('in-view');
                } else {
                    header.classList.remove('in-view');
                }
            }
        }
    });
});

// Experience Timeline Scroll Buttons
function addTimelineScroll(btnLeftId, btnRightId, timelineId) {
    const leftBtn = document.getElementById(btnLeftId);
    const rightBtn = document.getElementById(btnRightId);
    const timeline = document.getElementById(timelineId);
    if (!leftBtn || !rightBtn || !timeline) return;
    const scrollAmount = 360; // px, matches card width + gap
    leftBtn.addEventListener('click', () => {
        timeline.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    rightBtn.addEventListener('click', () => {
        timeline.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
}
addTimelineScroll('exp-scroll-left', 'exp-scroll-right', 'exp-timeline-work');
addTimelineScroll('exp-scroll-left-add', 'exp-scroll-right-add', 'exp-timeline-additional');

// Initialize the underline system on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all section visibility states
    const allSections = document.querySelectorAll('section[id]');
    allSections.forEach(section => {
        const sectionId = section.getAttribute('id');
        if (!sectionContentVisibility.has(sectionId)) {
            sectionContentVisibility.set(sectionId, new Set());
        }
    });
    
    // Force initial check for any elements that might already be visible
    setTimeout(() => {
        // Check which elements are currently in view
        const animatedElements = document.querySelectorAll(
            '.project-card, .skill-card, .education-item, .experience-item, .contact-item, .contact-form'
        );
        
        animatedElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                const section = element.closest('section[id]');
                const sectionId = section ? section.getAttribute('id') : null;
                
                if (sectionId) {
                    if (!sectionContentVisibility.has(sectionId)) {
                        sectionContentVisibility.set(sectionId, new Set());
                    }
                    sectionContentVisibility.get(sectionId).add(element);
                    updateSectionUnderlines(sectionId);
                }
            }
        });
        
        // Also check hero section
        const heroRect = document.getElementById('home')?.getBoundingClientRect();
        if (heroRect && heroRect.top < window.innerHeight && heroRect.bottom > 0) {
            sectionContentVisibility.set('home', new Set(['hero-content']));
            updateSectionUnderlines('home');
        }
        
        // Trigger scroll event for any remaining setup
        window.dispatchEvent(new Event('scroll'));
    }, 100);
});