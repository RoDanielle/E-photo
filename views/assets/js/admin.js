
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

document.addEventListener('DOMContentLoaded', async () => {
  const isAdmin = await checkAdminStatus();

  if (isAdmin) {
    const searchInput = document.querySelector('#searchInput');
    if (searchInput) {
      searchInput.style.display = 'block';
    }
  }
});

async function checkAdminStatus() {
  try {
    const response = await fetch("/checkLoggedIn");
    const data = await response.json();
    return data.isAdmin;
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false; // Default to non-admin status
  }
}
