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
    
    // Initialize notification preferences
    initNotificationPreferences();
    
    // Testimonials Slider
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    
    let currentIndex = 0;
    const cardWidth = 100 / 3; // 33.333% for each card
    const totalCards = testimonialCards.length;
    
    // Function to update the slider position
    function updateSlider() {
        testimonialTrack.style.transform = `translateX(-${currentIndex * cardWidth}%)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Next button click
    nextButton.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % totalCards;
        updateSlider();
    });
    
    // Previous button click
    prevButton.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateSlider();
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentIndex = index;
            updateSlider();
        });
    });
    
    // Auto slide every 5 seconds
    setInterval(function() {
        currentIndex = (currentIndex + 1) % totalCards;
        updateSlider();
    }, 5000);
    
    // Add hover pause functionality
    testimonialTrack.addEventListener('mouseenter', function() {
        clearInterval(autoSlideInterval);
    });
    
    testimonialTrack.addEventListener('mouseleave', function() {
        autoSlideInterval = setInterval(function() {
            currentIndex = (currentIndex + 1) % totalCards;
            updateSlider();
        }, 5000);
    });
    
    // Initialize the slider
    updateSlider();
    
    // Add animation to testimonial cards
    testimonialCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('animate-fadeInUp');
    });
    
    // Add animation to stats
    const statItems = document.querySelectorAll('.testimonial-stats .stat-item');
    statItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        item.classList.add('animate-fadeInUp');
    });

    // Testimonial Filter System
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.getAttribute('data-filter');

            testimonialCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
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

// Notification Preferences
function initNotificationPreferences() {
    const notificationCheckboxes = document.querySelectorAll('.notification-preferences input[type="checkbox"]');
    
    notificationCheckboxes.forEach(checkbox => {
        // Load saved preferences from localStorage
        const savedPreference = localStorage.getItem(checkbox.id);
        if (savedPreference !== null) {
            checkbox.checked = savedPreference === 'true';
        }
        
        // Save preferences when changed
        checkbox.addEventListener('change', function() {
            localStorage.setItem(this.id, this.checked);
            showNotificationPreferenceUpdate(this.id, this.checked);
        });
    });
}

function showNotificationPreferenceUpdate(preferenceId, isEnabled) {
    const preferenceName = preferenceId.replace('Notifications', '');
    const status = isEnabled ? 'enabled' : 'disabled';
    
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.className = 'notification-toast';
    notification.innerHTML = `
        <div class="notification-toast-content">
            <i class="bi bi-${isEnabled ? 'check-circle' : 'x-circle'}"></i>
            <span>${preferenceName} notifications ${status}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show the notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove the notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Testimonial Video Modal
const testimonialVideoModal = document.getElementById('testimonialVideoModal');
const testimonialVideo = document.getElementById('testimonialVideo');
const videoPreviewButtons = document.querySelectorAll('.video-preview-btn');

videoPreviewButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const videoUrl = button.getAttribute('data-video');
        testimonialVideo.src = videoUrl;
        testimonialVideoModal.classList.add('show');
        testimonialVideoModal.style.display = 'block';
    });
});

// Close modal when clicking the close button or outside the modal
document.querySelector('.btn-close').addEventListener('click', () => {
    closeVideoModal();
});

testimonialVideoModal.addEventListener('click', (e) => {
    if (e.target === testimonialVideoModal) {
        closeVideoModal();
    }
});

function closeVideoModal() {
    testimonialVideoModal.classList.remove('show');
    testimonialVideoModal.style.display = 'none';
    testimonialVideo.pause();
    testimonialVideo.src = '';
}

// Initialize Chart.js for the comparison chart
const ctx = document.getElementById('satisfactionChart').getContext('2d');
const satisfactionChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Before Implementation', 'After Implementation'],
        datasets: [{
            label: 'User Satisfaction Rate',
            data: [65, 92],
            backgroundColor: [
                'rgba(0, 87, 45, 0.2)',
                'rgba(0, 87, 45, 0.8)'
            ],
            borderColor: [
                'rgba(0, 87, 45, 1)',
                'rgba(0, 87, 45, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    callback: function(value) {
                        return value + '%';
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return context.raw + '% Satisfaction';
                    }
                }
            }
        }
    }
}); 