// Index page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize navbar scroll effect
    initNavbarScroll();
    
    // Initialize mountain animations
    initMountainEffects();
});

// Initialize animations
function initAnimations() {
    const sections = document.querySelectorAll('.section, .feature-card, .stat-item, .testimonial-card, .newsletter-section, .mobile-features, .scheduling-section, .notifications-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Initialize smooth scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize navbar scroll effect
function initNavbarScroll() {
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            // Scroll down
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            // Scroll up
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });
}

// Initialize mountain effects
function initMountainEffects() {
    // Simple parallax effect for mountains
    const mountainBackground = document.querySelector('.mountain-background');
    if (mountainBackground) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            const speed = 0.3;
            mountainBackground.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    }
    
    // Add subtle movement to mountain backgrounds on mouse move
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.addEventListener('mousemove', function(e) {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            
            if (mountainBackground) {
                mountainBackground.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        });
    }
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add hover effect to feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add click effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        
        ripple.className = 'ripple';
        ripple.style.width = ripple.style.height = `${Math.max(rect.width, rect.height)}px`;
        ripple.style.left = `${e.clientX - rect.left - ripple.offsetWidth / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - ripple.offsetHeight / 2}px`;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Hero Slideshow
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;
let slideInterval;

function showSlide(index) {
    // Remove active class from current slide
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    // Add active class to new slide
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
    
    // Reset timer
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
}

function nextSlide() {
    const nextIndex = (currentSlide + 1) % totalSlides;
    showSlide(nextIndex);
}

function prevSlide() {
    const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(prevIndex);
}

// Initialize slideshow
document.addEventListener('DOMContentLoaded', () => {
    // Start auto-sliding
    slideInterval = setInterval(nextSlide, 5000);
    
    // Add click events for controls
    document.querySelector('.slide-next').addEventListener('click', () => {
        nextSlide();
    });
    
    document.querySelector('.slide-prev').addEventListener('click', () => {
        prevSlide();
    });
    
    // Add click events for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });
    
    // Add touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.querySelector('.hero-slideshow').addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.querySelector('.hero-slideshow').addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            nextSlide();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            prevSlide();
        }
    }
}); 