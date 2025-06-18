import React, { useEffect, useState } from "react";
import axios from "axios";
import WeatherCard from "./WeatherCard";
import "./App.css";

const App = () => {
  const [location, setLocation] = useState("");
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState("");

  const fetchWeather = async (cityName) => {
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`;
    try {
      const res = await axios.get(url);
      setCity(res.data.city.name);
      const dailyData = res.data.list.filter((_, idx) => idx % 8 === 0);
      setForecast(dailyData);
    } catch (error) {
      console.log(error);
      alert("City not found");
    }
  };

  const detectLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      setCity(res.data.city.name);
      const dailyData = res.data.list.filter((_, idx) => idx % 8 === 0);
      setForecast(dailyData);
    });
  };

  useEffect(() => {
    detectLocation();
  }, []);

  return (
    <div className="app">
      <h1>🌤 Weather Forecast</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Enter city name..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={() => fetchWeather(location)}>Search</button>
      </div>
      <h2>{city && `Forecast for ${city}`}</h2>
      <div className="card-container">
        {forecast.map((weather, idx) => (
          <WeatherCard key={idx} data={weather} />
        ))}
      </div>
    </div>
  );
};

export default App;
