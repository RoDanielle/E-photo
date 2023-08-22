// Function to initialize the Google Map
function initMap() {
  fetch('/api/store-location')
    .then((response) => response.json())
    .then((data) => {
      const map = new google.maps.Map(document.getElementById('map-container'), {
        center: { lat: data[0].lat, lng: data[0].lng },
        zoom: 15,
      });

      // Add markers for all store locations
      data.forEach((location) => {
        const marker = new google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: map,
          title: location.name,
        });
      });
    })
    .catch((error) => {
      console.error('Error fetching store location data:', error);
      // Display a message on the page if there was an error fetching the data
      const mapContainer = document.getElementById('map-container');
      mapContainer.innerHTML = '<div style="text-align: center; font-size: 18px; padding: 20px;">Failed to load the map. Please try again later.</div>';
    });
}


// function for form 
document.addEventListener('DOMContentLoaded', function () {
const contactForm = document.getElementById('contactForm');
const messageDiv = document.getElementById('messageDiv');

contactForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    var name = document.getElementById("name-1").value;
    var email = document.getElementById("email-1").value;
    var message = document.getElementById("message-1").value;

    // Email validation
    var emailInput = document.getElementById("email-1");
    var emailError = document.getElementById("email-error");
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    var isFormValid = true; // Initialize the flag

    if (!emailPattern.test(emailInput.value)) {
        emailInput.classList.add("is-invalid"); // Apply Bootstrap invalid style
        emailError.style.display = "block";     // Show error message
        isFormValid = false; // Set flag to false
    } else {
        emailInput.classList.remove("is-invalid"); // Remove Bootstrap invalid style
        emailError.style.display = "none";         // Hide error message
    }

    if (name === "" || email === "" || message === "") {
        // At least one of the fields is empty, show an error message on the page
        messageDiv.innerHTML = '<p class="text-danger">Please fill in all fields before sending.</p>';
        isFormValid = false; // Set flag to false
    } else {
        // All fields are filled, clear the error message
        messageDiv.innerHTML = ''; // Clear the error message
        contactForm.reset();
        // Here, you can also include code to actually submit the form to your backend server if needed.
    }

    if (isFormValid) {
      // Update the messageDiv with success message
      messageDiv.innerHTML = '<p class="text-success">Message sent successfully!</p>';

      // Clear the success message after two seconds
      setTimeout(function() {
          messageDiv.innerHTML = '';
      }, 2000); 
  }
});
});