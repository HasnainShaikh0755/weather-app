// src/App.js
import { useState } from "react";
import './App.css'

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = "89f4670e8edcc1a345e4018283589088"
const getWeather = async () => {
  const trimmedCity = city.trim();
  if (!trimmedCity) return;

  setLoading(true);
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${trimmedCity}&appid=${apiKey}&units=metric`
    );
    const data = await res.json();
    console.log(data); // See real response
    if (data.cod === 200) {
      setWeather(data);
    } else {
      setWeather(null);
      alert(data.message || "City not found!");
    }
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
  setLoading(false);
};

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Simple Weather App</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button className="ms-10" onClick={getWeather}>Get Weather</button>

      {loading && <p>Loading...</p>}

      {weather && (
        <div style={{ marginTop: "1rem" }}>
          <h2>{weather.name}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <p>{weather.weather[0].description}</p>
          <p>{weather.main.temp} °C</p>
        </div>
      )}
    </div>
  );
}

export default App;
