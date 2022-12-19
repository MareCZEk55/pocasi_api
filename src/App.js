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
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=cz`
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

    let iconcode = weatherData.weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    let viditelnostKm = weatherData.visibility/1000;

    return (
      <div className="App">
        <h2>Město: {weatherData.name}</h2>
        <h2>Teplota: {weatherData.main.temp}°C</h2>
        <h2>Pocitová teplota: {weatherData.main.feels_like}°C</h2>
        <h3>Popis: {weatherData.weather[0].description}</h3>
        <div><img src={iconurl} alt="Ikona"></img></div>

        <h4>Viditelnost: {weatherData.visibility} metrů ({viditelnostKm} km)</h4>



      </div>
    );
  } else {
    return <div><h1>Loading...</h1></div>;
  }
}

export default App;
