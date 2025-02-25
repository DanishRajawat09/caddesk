document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get input values
    const email = document.getElementById("Email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Error elements
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    // Reset errors
    resetValidation("Email", emailError);
    resetValidation("password", passwordError);

    let isValid = true;

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        setError("Email", emailError, "Enter a valid email address");
        isValid = false;
    }

    // Password validation (8+ chars, 1 number, 1 special character)
    const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordPattern.test(password)) {
        setError("password", passwordError, "Password must be 8+ chars with 1 number & 1 special character");
        isValid = false;
    }

    // If valid, submit
    if (isValid) {
        alert("Login successful!");
        document.getElementById("loginForm").reset();
        clearBorders(["Email", "password"]);
    }
});

// Function to show errors
function setError(inputId, errorElement, message) {
    document.getElementById(inputId).classList.add("input-error");
    document.getElementById(inputId).classList.remove("input-success");
    errorElement.innerText = message;
}

// Function to reset errors
function resetValidation(inputId, errorElement) {
    document.getElementById(inputId).classList.remove("input-error");
    document.getElementById(inputId).classList.add("input-success");
    errorElement.innerText = "";
}

// Function to clear borders on form reset
function clearBorders(inputIds) {
    inputIds.forEach(id => {
        document.getElementById(id).classList.remove("input-error", "input-success");
    });
}
