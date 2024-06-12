// src/components/Weather.js
import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'; // Import CSS file from parent directory

const Weather = () => {
  const [city, setCity] = useState(''); //// State pour stocker le nom de la ville
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState('');

  const apiKey = '966d06d5b4feb4116d91791198a6a575'; // OpenWeatherMap API key
  // Fonction pour récupérer les données météorologiques actuelles
  const getWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      setWeatherData(response.data);
      setError('');
    } catch (err) {
      setError('Error fetching weather data');
      setWeatherData(null);
    }
  };
// Fonction pour récupérer les données de prévision météorologique (forecast)
  const getForecastData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
      );
      setForecastData(response.data.list);
      setError('');
    } catch (err) {
      setError('Error fetching forecast data');
      setForecastData(null);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city) {
      getWeatherData();
      // Clear forecast data when searching for a new city
      setForecastData(null);
    }
  };

  const handleShowForecast = () => {
    if (forecastData === null) {
      getForecastData();
    } else {
      // Toggle forecast data visibility
      setForecastData(null);
    }
  };

  return (
    <div className="weather-container">
      <h2>Weather App</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Search</button>
      </form>
      {error && <p className="error">{error}</p>}
      {weatherData && (
        <div className="weather-details">
          <h3>{weatherData.name}</h3>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          <button className="forecast-button" onClick={handleShowForecast}>
            {forecastData ? 'Hide Forecast' : 'Show Forecast'}
          </button>
        </div>
      )}
      {forecastData && (
        <div className="forecast-details">
          <h3>Forecast</h3>
          <table className="forecast-table">
            <thead>
              <tr>
                {forecastData.map((item, index) => (
                  <th key={index}>{item.dt_txt.split(' ')[0]}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {forecastData.map((item, index) => (
                  <td key={index}>
                    Temperature: {item.main.temp}°C <br />
                    Weather: {item.weather[0].description} <br />
                    Wind Speed: {item.wind.speed} m/s
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Weather;
