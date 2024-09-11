import { useEffect, useState } from "react";
import "./App.css";

const cities = [
  {name:"Select",latitude:0,longitude:0},
  { name: "Karachi", latitude: 24.8607, longitude: 67.0011 },
  { name: "Lahore", latitude: 31.5497, longitude: 74.3436 },
  { name: "Islamabad", latitude: 33.6844, longitude: 73.0479 },
  { name: "Faisalabad", latitude: 31.418, longitude: 73.079 },
  { name: "Rawalpindi", latitude: 33.5651, longitude: 73.0169 },
  { name: "Multan", latitude: 30.1575, longitude: 71.5249 },
  { name: "Peshawar", latitude: 34.0151, longitude: 71.5249 },
  { name: "Quetta", latitude: 30.1798, longitude: 66.975 },
  { name: "Sialkot", latitude: 32.4927, longitude: 74.5319 },
  { name: "Gujranwala", latitude: 32.1877, longitude: 74.1945 },
  { name: "Sukkur", latitude: 27.7052, longitude: 68.8574 },
  { name: "Hyderabad", latitude: 25.396, longitude: 68.3578 },
  { name: "Abbottabad", latitude: 34.1688, longitude: 73.2215 },
  { name: "Bahawalpur", latitude: 29.3956, longitude: 71.6836 },
  { name: "Sargodha", latitude: 32.0836, longitude: 72.6711 },
];

function App() {
  const [chose, setChose] = useState(cities[0]);
  const [weatherData, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { latitude, longitude } = chose;
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=1f136667cfcdb418bf8b7a4c5a542f00`;
    setLoading(true);
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
        setLoading(false);
      });
  }, [chose]);

  const handleCityChange = (e) => {
    setChose(cities[Number(e.target.value)]); // Convert e.target.value to a number
  };

  if (loading || !weatherData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold"> 
<div id="wifi-loader">
    <svg class="circle-outer" viewBox="0 0 86 86">
        <circle class="back" cx="43" cy="43" r="40"></circle>
        <circle class="front" cx="43" cy="43" r="40"></circle>
        <circle class="new" cx="43" cy="43" r="40"></circle>
    </svg>
    <svg class="circle-middle" viewBox="0 0 60 60">
        <circle class="back" cx="30" cy="30" r="27"></circle>
        <circle class="front" cx="30" cy="30" r="27"></circle>
    </svg>
    <svg class="circle-inner" viewBox="0 0 34 34">
        <circle class="back" cx="17" cy="17" r="14"></circle>
        <circle class="front" cx="17" cy="17" r="14"></circle>
    </svg>
    <div class="text" data-text="Searching"></div>
</div></h1>
      </div>
    );
  }

  const { main, weather, sys, name } = weatherData;
  const weatherIcon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  const temperature = Math.round(main.temp - 273.15);
  const feelsLike = Math.round(main.feels_like - 273.15);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center">
      <h1 className="text-3xl text-gray-800 font-bold mb-10">Weather App</h1>
      <select
        onChange={handleCityChange}
        className="p-3 mb-5 border rounded bg-white text-black"
      >
        {cities.map((data, ind) => (
          <option key={ind} value={ind}>
            {data.name}
          </option>
        ))}
      </select>
<h1>{chose.name}</h1>
      <div className="bg-white bg-opacity-80 p-10 rounded-lg shadow-lg text-center">
        <img
          src={weatherIcon}
          alt={weather[0].description}
          className="mx-auto"
        />
        

        <table className="weather-table">
          <tbody>
            <tr>
              <th>Cloud</th>
              <td>{weather[0].main}</td>
            </tr>
            <tr>
              <th>Humidity</th>
              <td>{main.humidity}%</td>
            </tr>
            <tr>
              <th>Pressure</th>
              <td>{main.pressure} hPa</td>
            </tr>
            <tr>
              <th>Feel Like</th>
              <td>{temperature}°C (Feels like: {feelsLike}°C)</td>
            </tr>
            <tr>
              <th>Date/Time</th>
              <td>{new Date().toDateString()}</td>

            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
