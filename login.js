document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const submitButton = loginForm.querySelector('button[type="submit"]');

    // Demo accounts for different roles
    const demoAccounts = {
        'employee': { username: 'employee@demo.com', password: 'employee123', role: 'employee', redirect: 'employeer/dashboard.html' },
        'manager': { username: 'manager@demo.com', password: 'manager123', role: 'manager', redirect: 'manager/dashboard.html' },
        'coordinator': { username: 'coordinator@demo.com', password: 'coordinator123', role: 'coordinator', redirect: 'coordinator/dashboard.html' },
        'sysadmin': { username: 'sysadmin@demo.com', password: 'sysadmin123', role: 'sysadmin', redirect: 'sysadmin/dashboard.html' }
    };

    // Add demo account buttons
    function addDemoAccountButtons() {
        const demoContainer = document.createElement('div');
        demoContainer.className = 'demo-accounts mt-4';
        demoContainer.innerHTML = `
            <div class="divider">
                <span>Demo Accounts</span>
            </div>
            <div class="row g-2 mt-2">
                <div class="col-6">
                    <button type="button" class="btn btn-outline-primary w-100 demo-btn" data-role="employee">
                        <i class="fas fa-user me-2"></i>Employee
                    </button>
                </div>
                <div class="col-6">
                    <button type="button" class="btn btn-outline-primary w-100 demo-btn" data-role="manager">
                        <i class="fas fa-user-tie me-2"></i>Manager
                    </button>
                </div>
                <div class="col-6">
                    <button type="button" class="btn btn-outline-primary w-100 demo-btn" data-role="coordinator">
                        <i class="fas fa-user-cog me-2"></i>Coordinator
                    </button>
                </div>
                <div class="col-6">
                    <button type="button" class="btn btn-outline-primary w-100 demo-btn" data-role="sysadmin">
                        <i class="fas fa-user-shield me-2"></i>SysAdmin
                    </button>
                </div>
            </div>
        `;
        
        // Insert before the "Don't have an account" section
        const createAccountSection = loginForm.querySelector('.text-center.mt-4');
        loginForm.insertBefore(demoContainer, createAccountSection);
        
        // Add event listeners to demo buttons
        document.querySelectorAll('.demo-btn').forEach(button => {
            button.addEventListener('click', function() {
                const role = this.getAttribute('data-role');
                const account = demoAccounts[role];
                
                // Fill in the credentials
                usernameInput.value = account.username;
                passwordInput.value = account.password;
                
                // Add visual feedback
                usernameInput.classList.add('is-valid');
                passwordInput.classList.add('is-valid');
                
                // Show info message
                showInfo(`Using ${role} demo account`);
                
                // Auto-submit after a short delay
                setTimeout(() => {
                    loginForm.dispatchEvent(new Event('submit'));
                }, 500);
            });
        });
    }

    // Add loading state class
    function setLoading(isLoading) {
        if (isLoading) {
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Signing in...';
        } else {
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-sign-in-alt me-2"></i>Sign in';
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
        loginForm.insertBefore(errorDiv, loginForm.firstChild);
    }

    // Show success message
    function showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'alert alert-success alert-dismissible fade show mt-3';
        successDiv.innerHTML = `
            <i class="fas fa-check-circle me-2"></i>${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        loginForm.insertBefore(successDiv, loginForm.firstChild);
    }

    // Show info message
    function showInfo(message) {
        const infoDiv = document.createElement('div');
        infoDiv.className = 'alert alert-info alert-dismissible fade show mt-3';
        infoDiv.innerHTML = `
            <i class="fas fa-info-circle me-2"></i>${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        loginForm.insertBefore(infoDiv, loginForm.firstChild);
    }

    // Validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Handle form submission
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Remove any existing alerts
        const existingAlerts = loginForm.querySelectorAll('.alert');
        existingAlerts.forEach(alert => alert.remove());

        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        // Validation
        if (!username || !password) {
            showError('Please fill in all fields');
            return;
        }

        if (username.includes('@') && !isValidEmail(username)) {
            showError('Please enter a valid email address');
            return;
        }

        if (password.length < 6) {
            showError('Password must be at least 6 characters long');
            return;
        }

        // Set loading state
        setLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Check if this is a demo account
            let redirectUrl = null;
            for (const role in demoAccounts) {
                const account = demoAccounts[role];
                if (username === account.username && password === account.password) {
                    redirectUrl = account.redirect;
                    showSuccess(`Login successful! Redirecting to ${role} dashboard...`);
                    break;
                }
            }

            // If not a demo account, use default redirect
            if (!redirectUrl) {
                redirectUrl = 'dashboard.html';
                showSuccess('Login successful! Redirecting...');
            }

            // Redirect after success
            setTimeout(() => {
                window.location.href = redirectUrl;
            }, 1500);

        } catch (error) {
            showError('An error occurred. Please try again.');
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    });

    // Add input validation with visual feedback
    usernameInput.addEventListener('input', function() {
        this.classList.remove('is-invalid', 'is-valid');
        if (this.value.includes('@') && !isValidEmail(this.value)) {
            this.classList.add('is-invalid');
        } else if (this.value) {
            this.classList.add('is-valid');
        }
    });

    passwordInput.addEventListener('input', function() {
        this.classList.remove('is-invalid', 'is-valid');
        if (this.value.length < 6 && this.value.length > 0) {
            this.classList.add('is-invalid');
        } else if (this.value.length >= 6) {
            this.classList.add('is-valid');
        }
    });

    // Add password visibility toggle
    const passwordToggle = document.createElement('button');
    passwordToggle.type = 'button';
    passwordToggle.className = 'btn btn-link position-absolute end-0 top-50 translate-middle-y me-2';
    passwordToggle.innerHTML = '<i class="fas fa-eye"></i>';
    passwordToggle.style.zIndex = '5';
    passwordToggle.style.border = 'none';
    passwordToggle.style.background = 'none';
    passwordToggle.style.color = '#666';

    passwordInput.parentElement.style.position = 'relative';
    passwordInput.parentElement.appendChild(passwordToggle);

    passwordToggle.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });

    // Add demo account buttons to the form
    addDemoAccountButtons();
}); 