import React from "react";

const WeatherCard = ({ data }) => {
  const { dt_txt, main, weather, wind } = data;
  const date = new Date(dt_txt).toDateString();

  return (
    <div className="card">
      <h3>{date}</h3>
      <img
        src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
        alt="icon"
      />
      <p>{weather[0].description}</p>
      <p>🌡 {main.temp} °C</p>
      <p>💨 {wind.speed} m/s</p>
      <p>💧 {main.humidity}%</p>
    </div>
  );
};

export default WeatherCard;
