class CookieConsent {
    constructor() {
        this.modal = document.getElementById('cookieConsentModal');
        this.acceptAllBtn = document.getElementById('acceptAllBtn');
        this.rejectAllBtn = document.getElementById('rejectAllBtn');
        this.settingsLink = document.getElementById('cookieSettingsLink');
        this.analyticsCheckbox = document.getElementById('analyticsCookies');
        this.marketingCheckbox = document.getElementById('marketingCookies');
        this.savePreferencesBtn = document.getElementById('savePreferencesBtn');
        this.floatingSettingsBtn = document.getElementById('floatingCookieSettings');
        
        this.cookieConsent = {
            essential: true,
            analytics: false,
            marketing: false,
            lastUpdated: new Date().toISOString()
        };
        
        this.init();
    }
    
    init() {
        // Check if user has already made a choice
        const savedConsent = this.getCookie('cookieConsent');
        if (!savedConsent) {
            this.showModal();
        } else {
            try {
                this.cookieConsent = JSON.parse(savedConsent);
                this.updateCheckboxes();
                this.applyConsent();
            } catch (error) {
                console.error('Error parsing saved cookie consent:', error);
                this.showModal();
            }
        }
        
        // Add event listeners
        this.acceptAllBtn.addEventListener('click', () => this.acceptAll());
        this.rejectAllBtn.addEventListener('click', () => this.rejectAll());
        this.settingsLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.showModal();
        });
        
        // Handle floating settings button
        if (this.floatingSettingsBtn) {
            this.floatingSettingsBtn.addEventListener('click', () => {
                this.showModal();
            });
        }
        
        // Handle individual checkbox changes
        this.analyticsCheckbox.addEventListener('change', () => this.updateConsent());
        this.marketingCheckbox.addEventListener('change', () => this.updateConsent());
        
        // Add save preferences button event listener if it exists
        if (this.savePreferencesBtn) {
            this.savePreferencesBtn.addEventListener('click', () => {
                this.saveConsent();
                this.hideModal();
                this.showToast('Your cookie preferences have been saved', 'success');
            });
        }
        
        // Add keyboard navigation for accessibility
        this.modal.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideModal();
            }
        });
    }
    
    updateCheckboxes() {
        if (this.analyticsCheckbox) {
            this.analyticsCheckbox.checked = this.cookieConsent.analytics;
        }
        if (this.marketingCheckbox) {
            this.marketingCheckbox.checked = this.cookieConsent.marketing;
        }
    }
    
    showModal() {
        const modal = new bootstrap.Modal(this.modal);
        modal.show();
        
        // Add animation class
        this.modal.classList.add('show');
        
        // Focus on the first interactive element for accessibility
        setTimeout(() => {
            this.acceptAllBtn.focus();
        }, 100);
    }
    
    acceptAll() {
        this.cookieConsent.analytics = true;
        this.cookieConsent.marketing = true;
        this.cookieConsent.lastUpdated = new Date().toISOString();
        this.saveConsent();
        this.hideModal();
        this.showToast('All cookies have been accepted', 'success');
        
        // Trigger a custom event for other scripts to listen to
        this.dispatchConsentEvent('accepted');
    }
    
    rejectAll() {
        this.cookieConsent.analytics = false;
        this.cookieConsent.marketing = false;
        this.cookieConsent.lastUpdated = new Date().toISOString();
        this.saveConsent();
        this.hideModal();
        this.showToast('Only essential cookies will be used', 'info');
        
        // Trigger a custom event for other scripts to listen to
        this.dispatchConsentEvent('rejected');
    }
    
    updateConsent() {
        this.cookieConsent.analytics = this.analyticsCheckbox.checked;
        this.cookieConsent.marketing = this.marketingCheckbox.checked;
        this.cookieConsent.lastUpdated = new Date().toISOString();
    }
    
    saveConsent() {
        const consent = JSON.stringify(this.cookieConsent);
        this.setCookie('cookieConsent', consent, 365); // Store for 1 year
        this.applyConsent();
    }
    
    applyConsent() {
        // Apply analytics consent
        if (this.cookieConsent.analytics) {
            // Initialize analytics
            console.log('Analytics enabled');
            this.enableAnalytics();
        } else {
            this.disableAnalytics();
        }
        
        // Apply marketing consent
        if (this.cookieConsent.marketing) {
            // Initialize marketing cookies
            console.log('Marketing cookies enabled');
            this.enableMarketing();
        } else {
            this.disableMarketing();
        }
    }
    
    enableAnalytics() {
        // Code to enable analytics tracking
        // This could initialize Google Analytics, etc.
        document.body.classList.add('analytics-enabled');
    }
    
    disableAnalytics() {
        // Code to disable analytics tracking
        document.body.classList.remove('analytics-enabled');
    }
    
    enableMarketing() {
        // Code to enable marketing cookies
        document.body.classList.add('marketing-enabled');
    }
    
    disableMarketing() {
        // Code to disable marketing cookies
        document.body.classList.remove('marketing-enabled');
    }
    
    hideModal() {
        const modal = bootstrap.Modal.getInstance(this.modal);
        if (modal) {
            modal.hide();
        }
        
        // Remove animation class
        this.modal.classList.remove('show');
    }
    
    showToast(message, type = 'info') {
        // Create toast container if it doesn't exist
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
            document.body.appendChild(toastContainer);
        }
        
        // Create toast element
        const toastId = 'toast-' + Date.now();
        const toastHtml = `
            <div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header bg-${type} text-white">
                    <i class="bi bi-info-circle me-2"></i>
                    <strong class="me-auto">Cookie Settings</strong>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    ${message}
                </div>
            </div>
        `;
        
        toastContainer.insertAdjacentHTML('beforeend', toastHtml);
        
        // Initialize and show the toast
        const toastElement = document.getElementById(toastId);
        const toast = new bootstrap.Toast(toastElement, {
            autohide: true,
            delay: 5000
        });
        toast.show();
        
        // Remove toast after it's hidden
        toastElement.addEventListener('hidden.bs.toast', () => {
            toastElement.remove();
            if (toastContainer.children.length === 0) {
                toastContainer.remove();
            }
        });
    }
    
    dispatchConsentEvent(action) {
        const event = new CustomEvent('cookieConsent', {
            detail: {
                action: action,
                consent: this.cookieConsent
            }
        });
        document.dispatchEvent(event);
    }
    
    setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value};${expires};path=/;SameSite=Strict`;
    }
    
    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    
    // Method to check if a specific cookie type is allowed
    isAllowed(cookieType) {
        return this.cookieConsent[cookieType] === true;
    }
}

// Initialize cookie consent when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cookieConsent = new CookieConsent();
    
    // Example of how other scripts can listen for cookie consent changes
    document.addEventListener('cookieConsent', (event) => {
        console.log('Cookie consent changed:', event.detail);
        
        // Example: Update UI based on cookie consent
        if (event.detail.action === 'rejected') {
            // Hide marketing elements
            document.querySelectorAll('.marketing-element').forEach(el => {
                el.style.display = 'none';
            });
        } else if (event.detail.action === 'accepted') {
            // Show marketing elements
            document.querySelectorAll('.marketing-element').forEach(el => {
                el.style.display = 'block';
            });
        }
    });
}); 