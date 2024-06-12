// src/App.js
import React from 'react';
import './App.css';
import Weather from './Components/weather';
import WeatherComparison from './Components/weathercomarison';


const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Weather App</h1>
      </header>
      <main>
        <Weather />
        <WeatherComparison />
      </main>
    </div>
  );
};

export default App;
