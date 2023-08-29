require('dotenv').config();
const axios = require('axios');
//https://openweathermap.org/city/5742126
const API_KEY = process.env.API_KEY_WEATHER;

module.exports = {
  async getWeatherByLocation(req, res) {
    try {
      const location = req.query.location; // Assuming the location is passed as a query parameter
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;

      const response = await axios.get(apiUrl);
      const weatherData = response.data;

      console.log('Weather Data:', weatherData); // Add this line to print the weather data to the console

      const temperature = weatherData.main.temp;
      console.log('Weather temperature:', temperature);

      if (temperature < 273) {
        weatherData.additionalInfo = 'It\'s freezing cold! Get cozy with some warm drinks.';
      } else if (temperature > 300) {
        weatherData.additionalInfo = 'It\'s extremely hot! Enjoy some nature pictures.';
      } else {
        weatherData.additionalInfo = 'The weather is pleasant. Consider engaging in outdoor activities or observing animals.';
      }

      res.status(200).json(weatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      res.status(500).send('An error occurred while fetching weather data.');
    }
  },
};