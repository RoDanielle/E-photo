



const weatherForm = document.getElementById('weatherForm');
const locationInput = document.getElementById('locationInput');
const weatherInfo = document.getElementById('weatherInfo');

weatherForm.addEventListener('submit', async (e) => {
e.preventDefault();
const location = locationInput.value;
try {
const response = await fetch(`/weather?location=${location}`);
const data = await response.json();

let additionalInfo = '';
if (data.additionalInfo) {
    additionalInfo = `<p><strong>${data.additionalInfo}</strong></p>`;
}

weatherInfo.innerHTML = `
  <h2>Weather in ${data.name}</h2>
  <p>Temperature: ${data.main.temp}°C</p>
  <p>Weather: ${data.weather[0].description}</p>
  ${additionalInfo}
`;
} catch (error) {
console.error('Error fetching weather data:', error);
weatherInfo.innerHTML = 'An error occurred while fetching weather data.';
}
});