document.addEventListener('DOMContentLoaded', function() {
    const changePasswordForm = document.getElementById('changePasswordForm');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const strengthBar = document.getElementById('strengthBar');

    // Password requirement check elements
    const lengthCheck = document.getElementById('lengthCheck');
    const upperCheck = document.getElementById('upperCheck');
    const lowerCheck = document.getElementById('lowerCheck');
    const numberCheck = document.getElementById('numberCheck');
    const specialCheck = document.getElementById('specialCheck');

    // Password strength colors
    const strengthColors = {
        0: '#ff4444', // Very Weak (Red)
        1: '#ffbb33', // Weak (Orange)
        2: '#ffeb3b', // Medium (Yellow)
        3: '#00C851', // Strong (Green)
        4: '#007E33'  // Very Strong (Dark Green)
    };

    function checkPasswordStrength(password) {
        let strength = 0;
        const checks = {
            length: password.length >= 8,
            upper: /[A-Z]/.test(password),
            lower: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[^A-Za-z0-9]/.test(password)
        };

        // Update requirement checks
        lengthCheck.style.color = checks.length ? '#4CAF50' : '#666';
        upperCheck.style.color = checks.upper ? '#4CAF50' : '#666';
        lowerCheck.style.color = checks.lower ? '#4CAF50' : '#666';
        numberCheck.style.color = checks.number ? '#4CAF50' : '#666';
        specialCheck.style.color = checks.special ? '#4CAF50' : '#666';

        // Calculate strength
        strength += checks.length ? 1 : 0;
        strength += checks.upper ? 1 : 0;
        strength += checks.lower ? 1 : 0;
        strength += checks.number ? 1 : 0;
        strength += checks.special ? 1 : 0;

        return {
            score: strength - 1,
            checks: checks,
            isValid: Object.values(checks).every(check => check)
        };
    }

    newPasswordInput.addEventListener('input', function() {
        const result = checkPasswordStrength(this.value);
        const score = Math.max(0, result.score);
        
        // Update strength bar
        strengthBar.style.width = `${(score + 1) * 20}%`;
        strengthBar.style.backgroundColor = strengthColors[score];
    });

    confirmPasswordInput.addEventListener('input', function() {
        if (this.value !== newPasswordInput.value) {
            this.setCustomValidity('Passwords do not match');
        } else {
            this.setCustomValidity('');
        }
    });

    changePasswordForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Validate password strength
        const strengthResult = checkPasswordStrength(newPassword);
        if (!strengthResult.isValid) {
            alert('Please ensure your password meets all requirements');
            return;
        }

        // Validate password match
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        // Simulate password change process
        const submitButton = this.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Changing Password...';

        setTimeout(() => {
            // Show success message
            const formContainer = changePasswordForm.parentElement;
            formContainer.innerHTML = `
                <div class="text-center">
                    <div class="mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="#4CAF50" class="bi bi-check-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                        </svg>
                    </div>
                    <h4 class="mb-3">Password Changed Successfully!</h4>
                    <p class="text-muted mb-4">
                        Your password has been changed successfully.<br>
                        You can now use your new password to login.
                    </p>
                    <a href="login.html" class="btn btn-change text-white">
                        Go to Login
                    </a>
                </div>
            `;
        }, 1500);
    });
}); 