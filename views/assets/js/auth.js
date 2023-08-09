document.addEventListener("DOMContentLoaded", function() {
  // Function to update the login/logout button based on user's login status
  function updateAuthButton(isLoggedIn) {
      const authButton = document.getElementById("authButton");
      if (isLoggedIn) {
          authButton.removeAttribute("href"); // Remove href attribute for logout
          authButton.classList.remove("btn-primary");
          authButton.classList.add("btn-danger");
          authButton.querySelector("span").textContent = "Logout";
      } else {
          authButton.setAttribute("href", "login.html"); // Set login link
          authButton.classList.remove("btn-danger");
          authButton.classList.add("btn-primary");
          authButton.querySelector("span").textContent = "Log in";
      }
  }

  // Check session state and update login/logout button
  fetch("/checkLoggedIn")
      .then(response => response.json())
      .then(data => {
          const isLoggedIn = data.isLoggedIn;
          updateAuthButton(isLoggedIn);
      })
      .catch(error => {
          console.error("Error checking session:", error);
      });
});