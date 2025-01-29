import React from "react"
import { Link } from "react-router-dom"
import "./Sidebar.css"

function Sidebar() {
  return (
    <aside className="sidebar">
      <h1>Admin Panel</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/articles">Articles</Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar

