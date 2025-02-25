document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get input values
    const email = document.getElementById("registerEmail");
    const username = document.getElementById("registerUsername");
    const fullName = document.getElementById("registerFullName");
    const contact = document.getElementById("registerContact");
    const password = document.getElementById("registerPassword");
    const confirmPassword = document.getElementById("confirmPassword");
    const gender = document.querySelector('input[name="gender"]:checked');

    // Error elements
    const emailError = document.getElementById("emailError");
    const usernameError = document.getElementById("usernameError");
    const fullNameError = document.getElementById("fullNameError");
    const contactError = document.getElementById("contactError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");
    const genderError = document.getElementById("genderError");

    // Reset errors
    function resetValidation(input, errorElement) {
        errorElement.innerText = "";
        input.classList.remove("input-error");
        input.classList.add("input-success");
    }

    function setError(input, errorElement, message) {
        errorElement.innerText = message;
        input.classList.add("input-error");
        input.classList.remove("input-success");
    }

    let isValid = true;

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email.value.trim())) {
        setError(email, emailError, "Enter a valid email address");
        isValid = false;
    } else {
        resetValidation(email, emailError);
    }

    // Username validation
    if (username.value.trim().length < 3) {
        setError(username, usernameError, "Username must be at least 3 characters");
        isValid = false;
    } else {
        resetValidation(username, usernameError);
    }

    // Full Name validation
    if (fullName.value.trim().length < 3) {
        setError(fullName, fullNameError, "Full Name must be at least 3 characters");
        isValid = false;
    } else {
        resetValidation(fullName, fullNameError);
    }

    // Contact validation (Must be 10 digits)
    const contactPattern = /^[0-9]{10}$/;
    if (!contactPattern.test(contact.value.trim())) {
        setError(contact, contactError, "Enter a valid 10-digit contact number");
        isValid = false;
    } else {
        resetValidation(contact, contactError);
    }

    // Password validation (8+ characters, 1 number, 1 special character)
    const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordPattern.test(password.value.trim())) {
        setError(password, passwordError, "Password must be at least 8 characters with a number and a special character");
        isValid = false;
    } else {
        resetValidation(password, passwordError);
    }

    // Confirm Password validation
    if (password.value.trim() !== confirmPassword.value.trim()) {
        setError(confirmPassword, confirmPasswordError, "Passwords do not match");
        isValid = false;
    } else {
        resetValidation(confirmPassword, confirmPasswordError);
    }

    // Gender validation
    if (!gender) {
        genderError.innerText = "Please select your gender";
        isValid = false;
    } else {
        genderError.innerText = "";
    }

    // If form is valid, submit
    if (isValid) {
        alert("Form submitted successfully!");
        document.getElementById("registerForm").reset();
        document.querySelectorAll("input").forEach(input => input.classList.remove("input-success", "input-error"));
    }
});