const axios = require('axios');

const API_KEY = 'be12387faa5dc18ab59312146d313355';

module.exports = {
  async getWeatherByLocation(req, res) {
    try {
      const location = req.query.location; // Assuming the location is passed as a query parameter
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;

      const response = await axios.get(apiUrl);
      const weatherData = response.data;

      res.status(200).json(weatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      res.status(500).send('An error occurred while fetching weather data.');
    }
  },
};