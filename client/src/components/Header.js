import React from "react"
import { Link } from "react-router-dom"
import "./Header.css"

function Header() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <header className="site-header">
      <div className="top-bar">
        <div className="date">{today}</div>
        <div className="logo">
          <Link to="/">
            <h1>NewsPortal</h1>
          </Link>
        </div>
        <div className="auth">
          <Link to="/login" className="login-btn">
            Login
          </Link>
        </div>
      </div>
      <nav className="main-nav">
        <ul>
          <li>
            <Link to="/category/news">News</Link>
          </li>
          <li>
            <Link to="/category/business">Business</Link>
          </li>
          <li>
            <Link to="/category/politics">Politics</Link>
          </li>
          <li>
            <Link to="/category/sports">Sports</Link>
          </li>
          <li>
            <Link to="/category/entertainment">Entertainment</Link>
          </li>
          <li>
            <Link to="/category/technology">Technology</Link>
          </li>
          <li>
            <Link to="/category/health">Health</Link>
          </li>
        </ul>
      </nav>
      <nav className="secondary-nav">
        <ul>
          <li>
            <Link to="/latest">Latest</Link>
          </li>
          <li>
            <Link to="/trending">Trending</Link>
          </li>
          <li>
            <Link to="/most-read">Most Read</Link>
          </li>
          <li>
            <Link to="/videos">Videos</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header

