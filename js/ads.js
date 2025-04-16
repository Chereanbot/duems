// Ad display system
class AdSystem {
    constructor() {
        this.ads = [
            {
                id: 1,
                title: "Professional Web Development",
                description: "Transform your business with our expert web development services. Get a modern, responsive website that converts visitors into customers.",
                image: "../assets/images/cherean.jpg",
                pricing: {
                    basic: "$999",
                    standard: "$1,499",
                    premium: "$2,499"
                },
                features: [
                    "Responsive Design",
                    "SEO Optimization",
                    "Contact Form",
                    "Social Media Integration"
                ],
                duration: 120000,
                cta: "Get Started",
                link: "../services/web-development-details.html",
                displayHere: "../services/web-development-details.html#pricing"
            },
            {
                id: 2,
                title: "UI/UX Design Services",
                description: "Create beautiful, user-friendly interfaces that delight your users. Our design experts will help you stand out from the competition.",
                image: "../assets/images/tibu.jpg",
                pricing: {
                    basic: "$799",
                    standard: "$1,299",
                    premium: "$1,999"
                },
                features: [
                    "Custom UI Design",
                    "User Research",
                    "Prototyping",
                    "Usability Testing"
                ],
                duration: 120000,
                cta: "View Portfolio",
                link: "../services/ui-ux-design-details.html",
                displayHere: "../services/ui-ux-design-details.html#pricing"
            },
            {
                id: 3,
                title: "Full Stack Development",
                description: "End-to-end solutions for your digital needs. From frontend to backend, we handle everything to bring your vision to life.",
                image: "../assets/images/mesha.jpg",
                pricing: {
                    basic: "$1,499",
                    standard: "$2,999",
                    premium: "$4,999"
                },
                features: [
                    "Frontend Development",
                    "Backend Development",
                    "Database Design",
                    "API Integration"
                ],
                duration: 120000,
                cta: "Schedule Demo",
                link: "../services/full-stack-development-details.html",
                displayHere: "../services/full-stack-development-details.html#pricing"
            }
        ];
        this.currentAdIndex = 0;
        this.adModal = null;
        this.timer = null;
    }

    init() {
        this.createModal();
        this.showAd();
    }

    createModal() {
        const modalHtml = `
            <div class="modal fade" id="adModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Featured Service</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <img src="" alt="Ad Image" class="ad-image mb-3">
                                </div>
                                <div class="col-md-6">
                                    <div class="ad-content">
                                        <h4 class="ad-title"></h4>
                                        <p class="ad-description"></p>
                                        
                                        <div class="features-list mb-4">
                                            <h6>Key Features:</h6>
                                            <ul class="list-unstyled"></ul>
                                        </div>

                                        <div class="pricing-tiers mb-4">
                                            <div class="row g-3">
                                                <div class="col-4">
                                                    <div class="pricing-tier basic">
                                                        <h6>Basic</h6>
                                                        <h4 class="price-basic"></h4>
                                                    </div>
                                                </div>
                                                <div class="col-4">
                                                    <div class="pricing-tier standard">
                                                        <h6>Standard</h6>
                                                        <h4 class="price-standard"></h4>
                                                    </div>
                                                </div>
                                                <div class="col-4">
                                                    <div class="pricing-tier premium">
                                                        <h6>Premium</h6>
                                                        <h4 class="price-premium"></h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="cta-buttons">
                                            <a href="#" class="btn btn-primary btn-lg me-2 main-cta"></a>
                                            <a href="#" class="btn btn-outline-primary btn-lg display-here">Display Here</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div class="ad-timer">
                                <div class="progress">
                                    <div class="progress-bar" role="progressbar" style="width: 100%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);
        this.adModal = new bootstrap.Modal(document.getElementById('adModal'));
    }

    showAd() {
        const ad = this.ads[this.currentAdIndex];
        const modal = document.getElementById('adModal');
        
        // Update content
        modal.querySelector('.ad-image').src = ad.image;
        modal.querySelector('.ad-title').textContent = ad.title;
        modal.querySelector('.ad-description').textContent = ad.description;
        
        // Update features
        const featuresList = modal.querySelector('.features-list ul');
        featuresList.innerHTML = '';
        ad.features.forEach(feature => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="bi bi-check-circle-fill text-success me-2"></i>${feature}`;
            featuresList.appendChild(li);
        });

        // Update pricing
        modal.querySelector('.price-basic').textContent = ad.pricing.basic;
        modal.querySelector('.price-standard').textContent = ad.pricing.standard;
        modal.querySelector('.price-premium').textContent = ad.pricing.premium;

        // Update CTA buttons
        const mainCta = modal.querySelector('.main-cta');
        mainCta.textContent = ad.cta;
        mainCta.href = ad.link;
        
        const displayHere = modal.querySelector('.display-here');
        displayHere.href = ad.displayHere;

        // Reset and start timer
        const progressBar = modal.querySelector('.progress-bar');
        progressBar.style.width = '100%';
        progressBar.style.transition = 'none';
        void progressBar.offsetWidth; // Force reflow
        progressBar.style.transition = `width ${ad.duration/1000}s linear`;

        this.adModal.show();

        // Set timer for next ad
        this.timer = setTimeout(() => {
            this.adModal.hide();
            this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
            this.showAd();
        }, ad.duration);

        // Start progress bar animation
        setTimeout(() => {
            progressBar.style.width = '0%';
        }, 10);
    }

    stop() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        if (this.adModal) {
            this.adModal.hide();
        }
    }
}

// Initialize ad system when document is ready
document.addEventListener('DOMContentLoaded', () => {
    const adSystem = new AdSystem();
    adSystem.init();
}); 