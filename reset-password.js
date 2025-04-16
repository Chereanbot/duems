document.addEventListener('DOMContentLoaded', function() {
    const resetForm = document.getElementById('resetPasswordForm');
    const emailInput = document.getElementById('email');
    const submitButton = resetForm.querySelector('button[type="submit"]');

    // Add loading state class
    function setLoading(isLoading) {
        if (isLoading) {
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
        } else {
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Send Reset Link';
        }
    }

    // Show error message
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-danger alert-dismissible fade show mt-3';
        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-circle me-2"></i>${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        resetForm.insertBefore(errorDiv, resetForm.firstChild);
    }

    // Show success message
    function showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'alert alert-success alert-dismissible fade show mt-3';
        successDiv.innerHTML = `
            <i class="fas fa-check-circle me-2"></i>${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        resetForm.insertBefore(successDiv, resetForm.firstChild);
    }

    // Validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Handle form submission
    resetForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Remove any existing alerts
        const existingAlerts = resetForm.querySelectorAll('.alert');
        existingAlerts.forEach(alert => alert.remove());

        const email = emailInput.value.trim();

        // Validation
        if (!email) {
            showError('Please enter your email address');
            return;
        }

        if (!isValidEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }

        // Set loading state
        setLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Here you would typically make an API call to your backend
            console.log('Reset password request:', { email });

            // Show success message
            showSuccess('Reset link has been sent to your email!');
            
            // Clear the form
            emailInput.value = '';

            // Redirect to login page after 3 seconds
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 3000);

        } catch (error) {
            showError('An error occurred. Please try again.');
            console.error('Reset password error:', error);
        } finally {
            setLoading(false);
        }
    });

    // Add input validation with visual feedback
    emailInput.addEventListener('input', function() {
        this.classList.remove('is-invalid', 'is-valid');
        if (this.value && !isValidEmail(this.value)) {
            this.classList.add('is-invalid');
        } else if (this.value && isValidEmail(this.value)) {
            this.classList.add('is-valid');
        }
    });
}); 