// Function to update the login/logout button based on user's login status
function updateAuthButton(isLoggedIn) {
  const authButton = document.getElementById("authButton");
  if (isLoggedIn) {
    authButton.removeAttribute("href"); // Remove href attribute for logout
    authButton.classList.remove("btn-primary");
    authButton.classList.add("btn-danger");
    authButton.querySelector("span").textContent = "Logout";
    authButton.addEventListener("click", handleLogout); // Add click event listener
  } else {
    authButton.setAttribute("href", "login.html"); // Set login link
    authButton.classList.remove("btn-danger");
    authButton.classList.add("btn-primary");
    authButton.querySelector("span").textContent = "Log in";
  }
}

document.addEventListener("DOMContentLoaded", function () {
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

async function handleLogout() {
  try {
    const checkLoggedInResponse = await fetch("/checkLoggedIn");
    if (checkLoggedInResponse.ok) {
      const logoutResponse = await fetch("/logout", { method: "POST" });
      if (logoutResponse.ok) {
        updateAuthButton(false); // Update button to "Log in"
        window.location.href = "login.html"; // Redirect to login page
        // Display a logged-out message on the login page
        const loginMessage = document.getElementById("loginMessage");
        if (loginMessage) {
          loginMessage.textContent = "You have been logged out successfully.";
        }
      } else {
        console.error("Logout failed.");
      }
    } else {
      console.error("User is not logged in.");
    }
  } catch (error) {
    console.error("Error logging out:", error);
  }
}
