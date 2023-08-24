/*
 this code snippet uses jQuery to handle form submission using AJAX. It sends user registration data to the server, 
 receives a response, and updates the UI accordingly based on the success or failure of the registration process.
*/
$(document).ready(function() {
    $("#registrationForm").submit(function(e) //This code attaches a submit event listener to the form with the id "registrationForm". When the form is submitted, the provided function is executed. 
    {
        e.preventDefault();
        const name = $("input[name='name']").val();
        const email = $("input[name='email']").val();
        const password = $("input[name='password']").val();
        $.ajax({
            type: "POST",
            url: "register", 
            data: { name, email, password },
            success: function(response) {
                console.log("AJAX success:", response);
                if (response.message === 'Registered successfully') {
                    console.log("Registration successful!");
                    $("#message")
                        .removeClass("alert-danger")
                        .addClass("alert-success")
                        .text("Registration successful!")
                        .removeClass("d-none");    
                    setTimeout(function() {
                        window.location.href = 'login.html';
                    }, 2000);
                } else if (response.message === 'Email already in use') {
                    console.log("Registration failed:", response.message);
                    $("#message")
                        .removeClass("alert-success")
                        .addClass("alert-danger")
                        .text("Registration failed: " + response.message)
                        .removeClass("d-none");
                }
            },
            error: function(error) {
                console.log("AJAX error:", error);
            }
        });
    });
});



