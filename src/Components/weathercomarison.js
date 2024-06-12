// src/components/WeatherComparison.js
import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'; // Import CSS file

const WeatherComparison = () => {
  const [cities, setCities] = useState(['Tunisia', 'Paris', 'New York']);
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState('');

  const apiKey = '966d06d5b4feb4116d91791198a6a575'; // Your OpenWeatherMap API key

  const getWeatherData = async () => {
    try {
      const promises = cities.map(city =>
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
      );
      const responses = await Promise.all(promises);
      const data = responses.map(response => response.data);
      setWeatherData(data);
      setError('');
    } catch (err) {
      setError('Error fetching weather data');
      setWeatherData([]);
    }
  };

  const handleCityChange = (index, value) => {
    const updatedCities = [...cities];
    updatedCities[index] = value;
    setCities(updatedCities);
  };

  const handleAddCity = () => {
    setCities([...cities, '']);
  };

  const handleRemoveCity = (index) => {
    const updatedCities = [...cities];
    updatedCities.splice(index, 1);
    setCities(updatedCities);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeatherData();
  };

  return (
    <div>
      <h2>Weather Comparison</h2>
      <form onSubmit={handleSubmit}>
        {cities.map((city, index) => (
          <div key={index} className="city-input">
            <input
              type="text"
              value={city}
              onChange={(e) => handleCityChange(index, e.target.value)}
              placeholder="Enter city name"
            />
            <button type="button" onClick={() => handleRemoveCity(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={handleAddCity}>Add City</button>
        <button type="submit">Compare</button>
      </form>
      {error && <p>{error}</p>}
      <div className="weather-comparison">
        {weatherData.map((data, index) => (
          <div key={index} className="city-weather">
            <h3>{cities[index]}</h3>
            <p>Temperature: {data.main.temp}°C</p>
            <p>Weather: {data.weather[0].description}</p>
            <p>Wind Speed: {data.wind.speed} m/s</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherComparison;
