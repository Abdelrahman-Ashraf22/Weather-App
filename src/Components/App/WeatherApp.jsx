import React, { useState } from "react";
import "../Style/_app.css";
import SearchIcon from "../Assets/search.png";
import ClearIcon from "../Assets/clear.png";
import CloudIcon from "../Assets/cloud.png";
import DrizzleIcon from "../Assets/drizzle.png";
import RainIcon from "../Assets/rain.png";
import SnowIcon from "../Assets/snow.png";
import WindIcon from "../Assets/wind.png";
import HumidityIcon from "../Assets/humidity.png";

const WeatherApp = () => {
  const ApiKey = "1cb058a33df40d45069bca74c747743a";
  const [WeatherIcon, setWeatherIcon] = useState(CloudIcon);
  const [error, setError] = useState("");
  const cityInput = document.getElementsByClassName("city")[0];
  const temp = document.getElementsByClassName("weather-temp")[0];
  const location = document.getElementsByClassName("weather-location")[0];
  const humidity = document.getElementsByClassName("humidity-percent")[0];
  const wind = document.getElementsByClassName("wind-rate")[0];
  const state = document.getElementsByClassName("state")[0];
  const country = document.getElementsByClassName("country")[0];

  const Search = async () => {
    if (cityInput === "") {
      return;
    }
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=Metric&appid=${ApiKey}`
      );

      const data = await res.json();
      temp.innerHTML = `${Math.floor(data.main.temp)}° C`;
      location.innerHTML = `${data.name},`;
      humidity.innerHTML = `${data.main.humidity}%`;
      wind.innerHTML = `${Math.round(data.wind.speed)} km/h`;
      state.innerHTML = `"${data.weather[0].main}"`;
      country.innerHTML = data.sys.country.toUpperCase();
      switch (data.weather[0].icon) {
        case "01d":
        case "01n":
          setWeatherIcon(ClearIcon);
          break;
        case "02d":
        case "02n":
          setWeatherIcon(CloudIcon);
          break;
        case "03d":
        case "03n":
        case "04d":
        case "04n":
          setWeatherIcon(DrizzleIcon);
          break;
        case "09d":
        case "09n":
        case "10d":
        case "10n":
          setWeatherIcon(RainIcon);
          break;
        case "13d":
        case "13n":
          setWeatherIcon(SnowIcon);
          break;
        default:
          setWeatherIcon(ClearIcon);
      }
      setError("");
      cityInput.value = "";
    } catch (err) {
      setError("City not found.");
    }
  };

  return (
    <div className="container">
      <div className="item">
        <div className="top-bar">
          <input type="text" className="city" placeholder="Search"></input>
          <div className="search-icon" onClick={Search}>
            <img src={SearchIcon} alt="search-icon"></img>
          </div>
          <div className="err">{error}</div>
        </div>

        <div className="town">
          <div className="weather-location">Cairo,</div>
          <div className="country">EG</div>
        </div>
        <div className="weather-img">
          <img src={WeatherIcon} alt="cloudy"></img>
          <div className="weather-temp">21°C</div>
        </div>
        <div className="state">"Clouds"</div>

        <div className="data-container">
          <div className="element">
            <img src={HumidityIcon} alt="" className="icon"></img>
            <div className="data">
              <div className="humidity-percent">64%</div>
              <div className="text">Humidity</div>
            </div>
          </div>

          <div className="element">
            <img src={WindIcon} alt="" className="icon"></img>
            <div className="data">
              <div className="wind-rate">4 km/h</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
