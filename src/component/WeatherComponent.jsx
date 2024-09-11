import React, { useState } from 'react';
import axios from 'axios';

const WeatherComponent = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=1f136667cfcdb418bf8b7a4c5a542f00`;

  const fetchWeather = async () => {
    try {
      const response = await axios.get(apiUrl);
      setWeather(response.data);
      setError('');
    } catch (err) {
      setError('City not found');
      setWeather(null);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchWeather();
  };

  return (
    <div>
      <h1>Weather Fetcher</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <p>{error}</p>}
      {weather && (
        <div>
          <h2>Weather in {weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Cloudiness: {weather.clouds.all}%</p>
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
