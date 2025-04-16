class CheckoutSystem {
    constructor() {
        this.currentService = null;
        this.currentPlan = null;
        this.checkoutModal = null;
    }

    init() {
        this.createCheckoutModal();
        this.setupEventListeners();
    }

    createCheckoutModal() {
        const modalHtml = `
            <div class="modal fade checkout-modal" id="checkoutModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Complete Your Purchase</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-8">
                                    <div class="checkout-form">
                                        <h4 class="mb-4">Billing Information</h4>
                                        <form id="checkoutForm">
                                            <div class="row mb-3">
                                                <div class="col-md-6">
                                                    <label class="form-label">First Name</label>
                                                    <input type="text" class="form-control" required>
                                                </div>
                                                <div class="col-md-6">
                                                    <label class="form-label">Last Name</label>
                                                    <input type="text" class="form-control" required>
                                                </div>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Email</label>
                                                <input type="email" class="form-control" required>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Phone</label>
                                                <input type="tel" class="form-control" required>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Company Name</label>
                                                <input type="text" class="form-control">
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Project Requirements</label>
                                                <textarea class="form-control" rows="3"></textarea>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="order-summary">
                                        <h4 class="mb-4">Order Summary</h4>
                                        <div class="service-info mb-3">
                                            <h5 class="service-name"></h5>
                                            <p class="service-plan mb-0"></p>
                                        </div>
                                        <div class="price-info mb-3">
                                            <div class="d-flex justify-content-between">
                                                <span>Subtotal</span>
                                                <span class="subtotal"></span>
                                            </div>
                                            <div class="d-flex justify-content-between">
                                                <span>Tax (10%)</span>
                                                <span class="tax"></span>
                                            </div>
                                            <hr>
                                            <div class="d-flex justify-content-between">
                                                <strong>Total</strong>
                                                <strong class="total"></strong>
                                            </div>
                                        </div>
                                        <div class="payment-methods mb-3">
                                            <h6>Payment Method</h6>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="paymentMethod" id="creditCard" checked>
                                                <label class="form-check-label" for="creditCard">
                                                    Credit Card
                                                </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="paymentMethod" id="paypal">
                                                <label class="form-check-label" for="paypal">
                                                    PayPal
                                                </label>
                                            </div>
                                        </div>
                                        <button class="btn btn-primary w-100" id="completePurchase">Complete Purchase</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);
        this.checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
    }

    setupEventListeners() {
        document.getElementById('completePurchase').addEventListener('click', () => {
            this.processCheckout();
        });
    }

    showCheckout(service, plan) {
        this.currentService = service;
        this.currentPlan = plan;
        
        const modal = document.getElementById('checkoutModal');
        const subtotal = parseFloat(plan.price.replace('ETB', '').replace(',', '').trim());
        const tax = subtotal * 0.1;
        const total = subtotal + tax;

        modal.querySelector('.service-name').textContent = service.title;
        modal.querySelector('.service-plan').textContent = plan.name;
        modal.querySelector('.subtotal').textContent = plan.price;
        modal.querySelector('.tax').textContent = `${tax.toLocaleString()} ETB`;
        modal.querySelector('.total').textContent = `${total.toLocaleString()} ETB`;

        this.checkoutModal.show();
    }

    processCheckout() {
        const form = document.getElementById('checkoutForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Show loading state
        const button = document.getElementById('completePurchase');
        const originalText = button.textContent;
        button.disabled = true;
        button.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...';

        // Simulate API call
        setTimeout(() => {
            this.checkoutModal.hide();
            this.showSuccessMessage();
            button.disabled = false;
            button.textContent = originalText;
        }, 2000);
    }

    showSuccessMessage() {
        const toastHtml = `
            <div class="toast align-items-center text-white bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        <i class="bi bi-check-circle-fill me-2"></i>
                        Purchase completed successfully! We'll contact you shortly.
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        `;

        const toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        toastContainer.innerHTML = toastHtml;
        document.body.appendChild(toastContainer);

        const toast = new bootstrap.Toast(toastContainer.querySelector('.toast'));
        toast.show();

        // Remove toast after it's hidden
        toastContainer.querySelector('.toast').addEventListener('hidden.bs.toast', () => {
            toastContainer.remove();
        });
    }
}

// Initialize checkout system when document is ready
document.addEventListener('DOMContentLoaded', () => {
    window.checkoutSystem = new CheckoutSystem();
    window.checkoutSystem.init();
}); 