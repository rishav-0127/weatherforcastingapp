import wind from './data/wind.png';
import './App.css';
import { useState } from 'react';

function App() {
  let [city, setCity] = useState('');
  let [weatherData, setWeatherData] = useState(null);

  let getData = (event) => {
    if (city.trim() === '') {
      alert('Please enter a city name');
      return;
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=6a36f4b5407ac776761083d16dfdb42d`)
      .then((res) => res.json())
      .then((finalRes) => {
        setWeatherData(finalRes);
      })
      .catch((error) => {
        console.error(error);
      });
    event.preventDefault();
  };

  return (
    <div className="w-full h-screen bg-[#a0aecd] flex justify-center items-center">
      <div className="max-w-md mx-auto text-center md:max-w-lg lg:max-w-xl">
        <h1 className="text-5xl font-bold py-12 text-black">
          Simple Weather App
        </h1>

        <form onSubmit={getData}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter City Name"
            className="w-full md:w-3/4 lg:w-1/2 mx-auto border-2 border-black p-2 rounded-md"
          />
          <button className="bg-[#490b3d] mx-auto block mt-4 w-full md:w-1/2 lg:w-1/3 p-2 rounded-md text-white">Submit</button>
        </form>
        {weatherData && (
          <div className="w-full mx-auto bg-white shadow-lg mt-10 p-6 shadow-md">
            <h2 className="font-bold text-2xl">
              {weatherData.name} <span className="bg-yellow-500">{weatherData.sys.country}</span>
            </h2>
            <h2 className="font-bold text-2xl">Temperature: {weatherData.main.temp}°C</h2>
            <h2 className="font-bold text-2xl">Wind Speed: {weatherData.wind.speed} m/s</h2>
            <h2 className="font-bold text-2xl">Humidity: {weatherData.main.humidity}%</h2>
            <img src={wind} alt="Wind Icon" />
            <p>{weatherData.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;