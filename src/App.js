import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const WEATHER_API_KEY = process.env.REACT_APP_API_KEY;
  const lat =  49.97264854386302;
  const lon = 16.39222536244494;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );
      const data = await response.json();
      setWeatherData(data);
    };
    fetchData();
  }, []);

  if (weatherData) {
    if(weatherData.cod !== 200){
      return (
        <div>
          <p>Nelze vrátit data.</p>
        </div>
      )
    }
    return (
      <div>
        <h2>Teplota: {weatherData.main.temp}°C</h2>
        <h3>Popis: {weatherData.weather[0].description}</h3>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default App;
