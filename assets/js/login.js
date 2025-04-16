document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberMeCheckbox = document.getElementById('rememberMe');

    // Check if there are saved credentials
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberMeCheckbox.checked = true;
    }

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const rememberMe = rememberMeCheckbox.checked;

        // Basic validation
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        // Save email if remember me is checked
        if (rememberMe) {
            localStorage.setItem('rememberedEmail', email);
        } else {
            localStorage.removeItem('rememberedEmail');
        }

        // Here you would typically make an API call to your backend
        // For now, we'll just log the credentials
        console.log('Login attempt:', { email, password, rememberMe });

        // Simulate successful login
        // Replace this with actual API call
        setTimeout(() => {
            // Redirect to dashboard or home page
            window.location.href = 'dashboard.html'; // Change this to your actual dashboard page
        }, 1000);
    });

    // Add input validation
    emailInput.addEventListener('input', function() {
        if (!this.value.includes('@')) {
            this.setCustomValidity('Please enter a valid email address');
        } else {
            this.setCustomValidity('');
        }
    });

    passwordInput.addEventListener('input', function() {
        if (this.value.length < 6) {
            this.setCustomValidity('Password must be at least 6 characters long');
        } else {
            this.setCustomValidity('');
        }
    });
}); 