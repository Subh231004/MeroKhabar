import React from "react"
import { Link } from "react-router-dom"
import { Cloud, User } from "lucide-react"
import "./Navbar.css"

function Navbar() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  })

  const mainCategories = [
    "News",
    "Commerce",
    "thought",
    "sports",
    "valley",
    "entertainment",
    "photofeature",
    "feature",
    "world",
    "blog",
    "Koseli",
    "migration",
    "education"
  ]

  

  return (
    <nav className="navbar">
      <div className="top-bar">
        <div className="date">{today}</div>
        <Link to="/" className="logo">
          <img src="/merokhabar.png" alt="Mero Khabar" className="logo-image" />
        </Link>
        <div className="info-section">
          <div className="weather-info">
            <Cloud size={16} />
            <span>19.12°C Kathmandu</span>
          </div>
          <div className="air-quality">
            <span>Air quality in Kathmandu:</span>
            <span className="quality-value">170</span>
          </div>
          <Link to="/login" className="login-button">
            <User size={16} />
            Login
          </Link>
        </div>
      </div>

      <div className="main-nav">
        <div className="nav-links">
          {mainCategories.map((category) => (
            <Link
              key={category}
              to={`/${category.toLowerCase().replace(/\s+/g, '-')}`}
              className="nav-link"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar 