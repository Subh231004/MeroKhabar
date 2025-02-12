import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Wind, User } from "lucide-react"
import "../styles/Navbar.css"

function Navbar() {
  const [categories, setCategories] = useState([]);
  const [weather, setWeather] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  const getWeatherEmoji = (description) => {
    const weatherMap = {
      'clear sky': '☀️',
      'few clouds': '🌤️',
      'scattered clouds': '☁️',
      'broken clouds': '☁️',
      'shower rain': '🌧️',
      'rain': '🌧️',
      'thunderstorm': '⛈️',
      'snow': '🌨️',
      'mist': '🌫️'
    };
    return weatherMap[description.toLowerCase()] || '🌡️';
  };

  // Fetch weather data
  useEffect(() => {
    const WEATHER_API_KEY = '3938e34b9a43af2092c9884d0d7e0f99'; 
    const GANGTOK_LAT = '27.3314';
    const GANGTOK_LON = '88.6138';

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${GANGTOK_LAT}&lon=${GANGTOK_LON}&units=metric&appid=${WEATHER_API_KEY}`)
      .then(res => res.json())
      .then(data => {
        setWeather({
          temp: data.main.temp.toFixed(1),
          description: data.weather[0].description
        });
        setWindSpeed(data.wind.speed.toFixed(1));
      })
      .catch(error => console.error('Error fetching weather:', error));
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <nav className="navbar">
      <div className="top-bar">
        <div className="date">{today}</div>
        <Link to="/" className="logo">
          <img src="/merokhabar.png" alt="Mero Khabar" className="logo-image" />
        </Link>
        <div className="info-section">
          <div className="weather-info">
            {weather && getWeatherEmoji(weather.description)}
            <span>
              {weather ? `${weather.temp}°C Gangtok` : 'Loading...'}
            </span>
          </div>
          
          <Link to="/login" className="login-button">
            <User size={16} />
            Login
          </Link>
        </div>
      </div>

      <div className="main-nav">
        <div className="nav-links">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="nav-link"
            >
              {category.name}
            </Link>
          ))}
        </div>
        
      </div>
    </nav>
  )
}

export default Navbar