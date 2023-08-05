function subscribe() {
    var subscriptionMessage = document.getElementById("subscription-message");
    var errorMessage = document.getElementById("error-message");
    var emailInput = document.querySelector("input[name='email']");

    // Check if the email input is empty
    if (emailInput.value.trim() === "") {
        errorMessage.style.display = "block";

        // Set a timeout to hide the error message after two seconds
        setTimeout(function() {
            errorMessage.style.display = "none";
        }, 2000);

        return false;
    }

    // Hide the error message if it was previously shown
    errorMessage.style.display = "none";

    // Show the subscription message
    subscriptionMessage.style.display = "block";
    // Clear the email input field
    emailInput.value = "";

    // Set a timeout to hide the subscription message after two seconds
    setTimeout(function() {
        subscriptionMessage.style.display = "none";
    }, 2000);

    // Return false to prevent form submission
    return false;
}
