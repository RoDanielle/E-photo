$(document).ready(function() {
    $("#registrationForm").submit(function(e) {
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



