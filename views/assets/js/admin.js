
// Function to update the navigation bar based on user's login and admin status
function updateNavbar(isLoggedIn, isAdmin) {
  const storeInfoNavItem = document.getElementById("storeInfoNavItem");
  if (isLoggedIn && isAdmin) {
    storeInfoNavItem.style.display = "block";
  } else {
    storeInfoNavItem.style.display = "none";
  }
}

// Fetch user status and update navigation bar on page load
document.addEventListener("DOMContentLoaded", function() {
  fetch("/checkLoggedIn")
    .then(response => response.json())
    .then(data => {
      const isLoggedIn = data.isLoggedIn;
      const isAdmin = data.isAdmin; // This should be provided by your server response
      updateNavbar(isLoggedIn, isAdmin);
    })
    .catch(error => {
      console.error("Error checking session:", error);
    });
});





