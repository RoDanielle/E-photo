
// Function to load the navigation content into the placeholder
function loadNavbar() {
    var navbarPlaceholder = document.getElementById('navbarPlaceholder');
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'navbar.html', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            navbarPlaceholder.innerHTML = xhr.responseText;
        }
    };
    xhr.send();

        // Identify the active page based on the URL
        var activePage = window.location.pathname.split('/').pop(); // Get the last part of the URL (page name)

        // Determine which navigation item should be active
        var activeNavItem = document.getElementById('homeNavItem'); // Default to home
        if (activePage === 'products.html') {
            activeNavItem = document.getElementById('productsNavItem');
        } else if (activePage === 'contacts.html') {
            activeNavItem = document.getElementById('contactsNavItem');
        } else if (activePage === 'aboutus.html') {
            activeNavItem = document.getElementById('aboutNavItem');
        } else if (activePage === 'WebSockt.html') {
            activeNavItem = document.getElementById('chatNaveItem');
        } else if (activePage === 'admin.html') {
            activeNavItem = document.getElementById('storeInfoNavItem');
        }
        // Add the 'active-nav' class to the active navigation item
        if (activeNavItem) {
            activeNavItem.classList.add('active-nav');
        }
}

// Load the navigation on page load
window.addEventListener('load', loadNavbar);

