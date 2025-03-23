// Partner Registration Form Validation

document.addEventListener('DOMContentLoaded', function() {
    const partnerRegisterForm = document.getElementById('partnerRegisterForm');
    
    // All form inputs
    const businessName = document.getElementById('businessName');
    const businessType = document.getElementById('businessType');
    const businessEmail = document.getElementById('businessEmail');
    const businessPhone = document.getElementById('businessPhone');
    const businessAddress = document.getElementById('businessAddress');
    const contactName = document.getElementById('contactName');
    const contactPosition = document.getElementById('contactPosition');
    const contactEmail = document.getElementById('contactEmail');
    const contactPhone = document.getElementById('contactPhone');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const termsAgree = document.getElementById('termsAgree');
    
    // All error elements
    const businessNameError = document.getElementById('businessNameError');
    const businessTypeError = document.getElementById('businessTypeError');
    const businessEmailError = document.getElementById('businessEmailError');
    const businessPhoneError = document.getElementById('businessPhoneError');
    const businessAddressError = document.getElementById('businessAddressError');
    const contactNameError = document.getElementById('contactNameError');
    const contactPositionError = document.getElementById('contactPositionError');
    const contactEmailError = document.getElementById('contactEmailError');
    const contactPhoneError = document.getElementById('contactPhoneError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const termsError = document.getElementById('termsError');
    const interestsError = document.getElementById('interestsError');
    
    // Get all checkboxes for interests
    const interestCheckboxes = document.querySelectorAll('input[name="interests"]');
    
    // Validation helper functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isBusinessEmail(email) {
        // List of common free email providers to check against
        const freeEmailProviders = [
            'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 
            'aol.com', 'icloud.com', 'mail.com', 'protonmail.com'
        ];
        
        const domain = email.split('@')[1].toLowerCase();
        return !freeEmailProviders.includes(domain);
    }
    
    function isValidPhone(phone) {
        // Allow +, spaces, () and digits
        const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,3}[-\s.]?[0-9]{4,10}$/;
        return phoneRegex.test(phone);
    }
    
    function isStrongPassword(password) {
        // At least 8 characters, one uppercase, one lowercase, one number
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordRegex.test(password);
    }
    
    function showError(inputElement, errorElement, message) {
        errorElement.textContent = message;
        inputElement.classList.remove('input-success');
        inputElement.classList.add('input-error');
    }
    
    function clearError(inputElement, errorElement) {
        errorElement.textContent = '';
        inputElement.classList.remove('input-error');
        inputElement.classList.add('input-success');
    }
    
    function validateInterests() {
        let checked = false;
        interestCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                checked = true;
            }
        });
        
        if (!checked) {
            interestsError.textContent = 'Please select at least one area of interest';
            return false;
        } else {
            interestsError.textContent = '';
            return true;
        }
    }
    
    // Business Name Validation
    businessName.addEventListener('input', function() {
        if (businessName.value.trim() === '') {
            showError(businessName, businessNameError, 'Business name is required');
        } else if (businessName.value.trim().length < 3) {
            showError(businessName, businessNameError, 'Business name must be at least 3 characters');
        } else {
            clearError(businessName, businessNameError);
        }
    });
    
    // Business Type Validation
    businessType.addEventListener('change', function() {
        if (businessType.value === '') {
            showError(businessType, businessTypeError, 'Please select a business type');
        } else {
            clearError(businessType, businessTypeError);
        }
    });
    
    // Business Email Validation
    businessEmail.addEventListener('input', function() {
        if (businessEmail.value.trim() === '') {
            showError(businessEmail, businessEmailError, 'Business email is required');
        } else if (!isValidEmail(businessEmail.value)) {
            showError(businessEmail, businessEmailError, 'Please enter a valid email address');
        } else if (!isBusinessEmail(businessEmail.value)) {
            showError(businessEmail, businessEmailError, 'Please use a business email address');
        } else {
            clearError(businessEmail, businessEmailError);
        }
    });
    
    // Business Phone Validation
    businessPhone.addEventListener('input', function() {
        if (businessPhone.value.trim() === '') {
            showError(businessPhone, businessPhoneError, 'Business phone is required');
        } else if (!isValidPhone(businessPhone.value)) {
            showError(businessPhone, businessPhoneError, 'Please enter a valid phone number');
        } else {
            clearError(businessPhone, businessPhoneError);
        }
    });
    
    // Business Address Validation
    businessAddress.addEventListener('input', function() {
        if (businessAddress.value.trim() === '') {
            showError(businessAddress, businessAddressError, 'Business address is required');
        } else if (businessAddress.value.trim().length < 10) {
            showError(businessAddress, businessAddressError, 'Please enter a complete address');
        } else {
            clearError(businessAddress, businessAddressError);
        }
    });
    
    // Contact Name Validation
    contactName.addEventListener('input', function() {
        if (contactName.value.trim() === '') {
            showError(contactName, contactNameError, 'Contact name is required');
        } else if (contactName.value.trim().length < 3) {
            showError(contactName, contactNameError, 'Name must be at least 3 characters');
        } else {
            clearError(contactName, contactNameError);
        }
    });
    
    // Contact Position Validation
    contactPosition.addEventListener('input', function() {
        if (contactPosition.value.trim() === '') {
            showError(contactPosition, contactPositionError, 'Position is required');
        } else {
            clearError(contactPosition, contactPositionError);
        }
    });
    
    // Contact Email Validation
    contactEmail.addEventListener('input', function() {
        if (contactEmail.value.trim() === '') {
            showError(contactEmail, contactEmailError, 'Contact email is required');
        } else if (!isValidEmail(contactEmail.value)) {
            showError(contactEmail, contactEmailError, 'Please enter a valid email address');
        } else {
            clearError(contactEmail, contactEmailError);
        }
    });
    
    // Contact Phone Validation
    contactPhone.addEventListener('input', function() {
        if (contactPhone.value.trim() === '') {
            showError(contactPhone, contactPhoneError, 'Contact phone is required');
        } else if (!isValidPhone(contactPhone.value)) {
            showError(contactPhone, contactPhoneError, 'Please enter a valid phone number');
        } else {
            clearError(contactPhone, contactPhoneError);
        }
    });
    
    // Password Validation
    password.addEventListener('input', function() {
        if (password.value.trim() === '') {
            showError(password, passwordError, 'Password is required');
        } else if (!isStrongPassword(password.value)) {
            showError(password, passwordError, 'Password must be at least 8 characters and include uppercase, lowercase, and a number');
        } else {
            clearError(password, passwordError);
        }
        
        // Check confirm password match
        if (confirmPassword.value.trim() !== '' && confirmPassword.value !== password.value) {
            showError(confirmPassword, confirmPasswordError, 'Passwords do not match');
        } else if (confirmPassword.value.trim() !== '') {
            clearError(confirmPassword, confirmPasswordError);
        }
    });
    
    // Confirm Password Validation
    confirmPassword.addEventListener('input', function() {
        if (confirmPassword.value.trim() === '') {
            showError(confirmPassword, confirmPasswordError, 'Please confirm your password');
        } else if (confirmPassword.value !== password.value) {
            showError(confirmPassword, confirmPasswordError, 'Passwords do not match');
        } else {
            clearError(confirmPassword, confirmPasswordError);
        }
    });
    
    // Interest Checkboxes Validation
    interestCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', validateInterests);
    });
    
    // Terms Agreement Validation
    termsAgree.addEventListener('change', function() {
        if (!termsAgree.checked) {
            termsError.textContent = 'You must agree to the terms and conditions';
        } else {
            termsError.textContent = '';
        }
    });
    
    // Form Submission Handler
    partnerRegisterForm.addEventListener('submit', function(event) {
        let hasError = false;
        
        // Validate Business Details
        if (businessName.value.trim() === '' || businessName.value.trim().length < 3) {
            showError(businessName, businessNameError, 'Business name is required (min. 3 characters)');
            hasError = true;
        }
        
        if (businessType.value === '') {
            showError(businessType, businessTypeError, 'Please select a business type');
            hasError = true;
        }
        
        if (businessEmail.value.trim() === '') {
            showError(businessEmail, businessEmailError, 'Business email is required');
            hasError = true;
        } else if (!isValidEmail(businessEmail.value)) {
            showError(businessEmail, businessEmailError, 'Please enter a valid email address');
            hasError = true;
        } else if (!isBusinessEmail(businessEmail.value)) {
            showError(businessEmail, businessEmailError, 'Please use a business email address');
            hasError = true;
        }
        
        if (businessPhone.value.trim() === '') {
            showError(businessPhone, businessPhoneError, 'Business phone is required');
            hasError = true;
        } else if (!isValidPhone(businessPhone.value)) {
            showError(businessPhone, businessPhoneError, 'Please enter a valid phone number');
            hasError = true;
        }
        
        if (businessAddress.value.trim() === '' || businessAddress.value.trim().length < 10) {
            showError(businessAddress, businessAddressError, 'Please enter a complete business address');
            hasError = true;
        }
        
        // Validate Contact Person Details
        if (contactName.value.trim() === '' || contactName.value.trim().length < 3) {
            showError(contactName, contactNameError, 'Contact name is required (min. 3 characters)');
            hasError = true;
        }
        
        if (contactPosition.value.trim() === '') {
            showError(contactPosition, contactPositionError, 'Position is required');
            hasError = true;
        }
        
        if (contactEmail.value.trim() === '') {
            showError(contactEmail, contactEmailError, 'Contact email is required');
            hasError = true;
        } else if (!isValidEmail(contactEmail.value)) {
            showError(contactEmail, contactEmailError, 'Please enter a valid email address');
            hasError = true;
        }
        
        if (contactPhone.value.trim() === '') {
            showError(contactPhone, contactPhoneError, 'Contact phone is required');
            hasError = true;
        } else if (!isValidPhone(contactPhone.value)) {
            showError(contactPhone, contactPhoneError, 'Please enter a valid phone number');
            hasError = true;
        }
        
        // Validate Password
        if (password.value.trim() === '') {
            showError(password, passwordError, 'Password is required');
            hasError = true;
        } else if (!isStrongPassword(password.value)) {
            showError(password, passwordError, 'Password must be at least 8 characters and include uppercase, lowercase, and a number');
            hasError = true;
        }
        
        if (confirmPassword.value.trim() === '') {
            showError(confirmPassword, confirmPasswordError, 'Please confirm your password');
            hasError = true;
        } else if (confirmPassword.value !== password.value) {
            showError(confirmPassword, confirmPasswordError, 'Passwords do not match');
            hasError = true;
        }
        
        // Validate Interest Areas
        if (!validateInterests()) {
            hasError = true;
        }
        
        // Validate Terms Agreement
        if (!termsAgree.checked) {
            termsError.textContent = 'You must agree to the terms and conditions';
            hasError = true;
        }
        
        // Prevent form submission if there are errors
        if (hasError) {
            event.preventDefault();
            // Scroll to the first error
            const firstError = document.querySelector('.input-error') || document.querySelector('.error:not(:empty)');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } else {
            // For demo purposes, prevent default and show success message
            event.preventDefault();
            alert('Partner registration successful! Your application has been submitted for review. We will contact you shortly.');
            // In a real application, you would submit the form or use AJAX
        }
    });
}); 