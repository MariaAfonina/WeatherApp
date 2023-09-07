import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search/Search";
import Forecast from "./components/Forecast/Forecast";
import TodayWeather from "./components/TodayWeather/TodayWeather";
import { API_KEY, WEATHER_API_URL, FORECAST_API_URL } from "./api";
import "./App.css";

function App() {
  const [city, setCity] = useState("Lviv");
  const [todayWeather, setTodayWeather] = useState([]);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    async function fetchWeatherData() {
      try {
        const data = await axios.get(
          `${WEATHER_API_URL}?units=metric&q=${city}&appid=${API_KEY}`,
        );
        setTodayWeather(data?.data);
      } catch (e) {
        console.error(e);
      }
      try {
        const data = await axios.get(
          `${FORECAST_API_URL}?units=metric&q=${city}&appid=${API_KEY}`,
        );
        setForecast(data?.data);
      } catch (e) {
        console.error(e);
      }
    }
    fetchWeatherData();
  }, [city]);

  return (
    <div>
      <Search />
      <TodayWeather />
      <Forecast />
    </div>
  );
}

export default App;
