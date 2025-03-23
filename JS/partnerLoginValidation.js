// Partner Login Form Validation

document.addEventListener('DOMContentLoaded', function() {
    const partnerLoginForm = document.getElementById('partnerLoginForm');
    const emailInput = document.getElementById('Email');
    const emailError = document.getElementById('emailError');
    const passwordInput = document.getElementById('password');
    const passwordError = document.getElementById('passwordError');

    // Function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Function to validate business email domain
    function isBusinessEmail(email) {
        // List of common free email providers to check against
        const freeEmailProviders = [
            'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 
            'aol.com', 'icloud.com', 'mail.com', 'protonmail.com'
        ];
        
        const domain = email.split('@')[1].toLowerCase();
        return !freeEmailProviders.includes(domain);
    }

    // Function to display error messages
    function showError(inputElement, errorElement, message) {
        errorElement.textContent = message;
        inputElement.classList.remove('input-success');
        inputElement.classList.add('input-error');
    }

    // Function to clear error messages
    function clearError(inputElement, errorElement) {
        errorElement.textContent = '';
        inputElement.classList.remove('input-error');
        inputElement.classList.add('input-success');
    }

    // Real-time validation for email field
    emailInput.addEventListener('input', function() {
        if (emailInput.value.trim() === '') {
            showError(emailInput, emailError, 'Email is required');
        } else if (!isValidEmail(emailInput.value)) {
            showError(emailInput, emailError, 'Please enter a valid email address');
        } else if (!isBusinessEmail(emailInput.value)) {
            showError(emailInput, emailError, 'Please use a business email address');
        } else {
            clearError(emailInput, emailError);
        }
    });

    // Real-time validation for password field
    passwordInput.addEventListener('input', function() {
        if (passwordInput.value.trim() === '') {
            showError(passwordInput, passwordError, 'Password is required');
        } else if (passwordInput.value.length < 6) {
            showError(passwordInput, passwordError, 'Password must be at least 6 characters');
        } else {
            clearError(passwordInput, passwordError);
        }
    });

    // Form submission validation
    partnerLoginForm.addEventListener('submit', function(event) {
        let hasError = false;
        
        // Check email
        if (emailInput.value.trim() === '') {
            showError(emailInput, emailError, 'Email is required');
            hasError = true;
        } else if (!isValidEmail(emailInput.value)) {
            showError(emailInput, emailError, 'Please enter a valid email address');
            hasError = true;
        } else if (!isBusinessEmail(emailInput.value)) {
            showError(emailInput, emailError, 'Please use a business email address');
            hasError = true;
        }
        
        // Check password
        if (passwordInput.value.trim() === '') {
            showError(passwordInput, passwordError, 'Password is required');
            hasError = true;
        } else if (passwordInput.value.length < 6) {
            showError(passwordInput, passwordError, 'Password must be at least 6 characters');
            hasError = true;
        }
        
        // Prevent form submission if there are errors
        if (hasError) {
            event.preventDefault();
        } else {
            // For demo purposes, prevent default and show success message
            event.preventDefault();
            alert('Partner login successful! Redirecting to partner dashboard...');
            // In a real application, you would submit the form or use AJAX to authenticate
        }
    });
}); 