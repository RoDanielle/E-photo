$(document).ready(function() {
    // Function to update the login/logout button based on user's login status
    function updateAuthButton(isLoggedIn) {
      const authButton = $("#authButton");
      if (isLoggedIn) {
        authButton.attr("href", "#"); // Set logout link
        authButton.removeClass("btn-primary").addClass("btn-danger");
        authButton.find("span").text("Logout");
      } else {
        authButton.attr("href", "login.html"); // Set login link
        authButton.removeClass("btn-danger").addClass("btn-primary");
        authButton.find("span").text("Log in");
      }
    }
  
    // Check session state and update login/logout button
    $.get("/checkLoggedIn", function(data) {
      const isLoggedIn = data.isLoggedIn;
      updateAuthButton(isLoggedIn);
    });
  
    // Handle login form submission
    $("#LogInForm").submit(function(e) {
      e.preventDefault();
      const email = $("input[name='email']").val();
      const password = $("input[name='password']").val();
      
      $.ajax({
        type: "POST",
        url: "login", // Update this URL to match your server-side login route
        data: { email, password },
        success: function(response) {
          console.log("AJAX success:", response);
          if (response.message === "User authenticated") {
            console.log("Log In successful!");
            // Update session state and login/logout button
            updateAuthButton(true);
            
            $("#message")
              .removeClass("alert-danger")
              .addClass("alert-success")
              .text("Log In successful!")
              .removeClass("d-none");
            setTimeout(function() {
              const isAdmin = response.user.isManager; // Use response.user.isManager to check admin status
              if (isAdmin) {
                // Redirect to admin page
                window.location.href = 'admin.html';
              } else {
                // Redirect to regular user page
                window.location.href = 'products.html';
              }
            }, 2000);
          } else {
            console.log("Log In failed:", response.message);
            $("#message")
              .removeClass("alert-success")
              .addClass("alert-danger")
              .text("Log In failed: " + response.message)
              .removeClass("d-none");
            setTimeout(function() {
              $("#message").addClass("d-none").text(""); 
              $("input[name='email']").val(""); 
              $("input[name='password']").val(""); 
            }, 2000);
          }
        },
        error: function(error) {
          console.error("AJAX error:", error);
          $("#message")
            .removeClass("alert-success")
            .addClass("alert-danger")
            .text("Log In failed.")
            .removeClass("d-none");
          setTimeout(function() {
            $("#message").addClass("d-none").text("");
            $("input[name='email']").val(""); 
            $("input[name='password']").val("");
          }, 2000);
        }
      });
    });
  });