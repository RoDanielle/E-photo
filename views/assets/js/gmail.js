document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById("contactForm");

    // When the form is submitted
    contactForm.addEventListener("submit", async function(event) {
        event.preventDefault(); // Prevent the form from submitting the default way

        // Collect form data
        const formData = new FormData(contactForm);
        const formObject = Object.fromEntries(formData.entries());

        try {
            // Send form data to the server to trigger email sending
            const response = await fetch("/api/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formObject),
            });

            const result = await response.json();
            if (result.success) {
                document.getElementById("messageDiv").innerHTML = "<p>The form was submitted successfully!</p>";
            } else {
                document.getElementById("messageDiv").innerHTML = "<p>Failed to submit form</p>";
            }
        } catch (error) {
            document.getElementById("messageDiv").innerHTML = "<p>Failed to submit form</p>";
        } finally {
            // Reset the form after the submission attempt, regardless of success or failure
            contactForm.reset();
        }
    });
});
