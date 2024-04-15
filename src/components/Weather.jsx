import React, { useState } from 'react';
import './Weather.css';                  

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);


  const API_KEY = 'fe69feffef9d1b92aa527c29b056ae4d';

  const weatherDescriptions = {
    Clear: 'Despejado',
    Clouds: 'Nublado',
    Rain: 'Lluvia',
    Thunderstorm: 'Tormenta eléctrica',
    Snow: 'Nieve',
    Mist: 'Niebla',
  };

  const fetchWeatherData = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

        const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
      setWeatherData(null);
      setError('City not found. Please enter a valid city.');
    }
  };

  const handleUpdateWeather = () => {
    setWeatherData(null);
    setError(null);
  };

  const renderWeatherDetails = () => {
    if (error) {
      return <p className="error-message">{error}</p>;
    }

    if (!weatherData) {
      return null;
    }

    const imageUrl = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;

    const roundedTemperature = (weatherData.main.temp - 273.15).toFixed(2);

    const weatherDescription = weatherDescriptions[weatherData.weather[0].main] || weatherData.weather[0].main;

    return ( 
      <div className="result-container">
        <div className="result-details">
          <h2>{weatherData.name}</h2>
          <p>Temperatura: {roundedTemperature} °C</p>
          <p>Clima: {weatherDescription}</p>
          <p>Humedad: {weatherData.main.humidity}%</p>
          <p>Velocidad del viento: {weatherData.wind.speed} m/s</p>
        </div>
        <div className="city-image">
          <img src={imageUrl} alt={weatherData.name} />
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="title-container">
        <h1>¡Busca el clima de tu ciudad aquí!</h1>
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Ingresa una ciudad"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="input"
        />
        <button onClick={() => fetchWeatherData(city)} className="button">
          BUSCAR
        </button>
        <button onClick={handleUpdateWeather} className="button">
          ACTUALIZAR
        </button>
      </div>

      {renderWeatherDetails()}
    </div>
  );
};

export default WeatherApp;

