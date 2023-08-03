// Function to initialize the Google Map
function initMap() {
    fetch('/api/store-location')
      .then((response) => response.json())
      .then((data) => {
        const map = new google.maps.Map(document.getElementById('map-container'), {
          center: { lat: data[0].lat, lng: data[0].lng },
          zoom: 11,
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
  
      contactForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission
  
        // Clear the form fields
        contactForm.reset();
  
        // Display a success message or perform any other action you like
        // For example, you can show an alert or update the page with a success message
        alert('Form has been successfully submitted!');
 });
});