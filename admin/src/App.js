import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Dashboard from "./pages/Dashboard"
import Articles from "./pages/Articles"
import EditArticle from "./pages/EditArticle"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="admin-app">
        <Sidebar />
        <main className="admin-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/edit/:id" element={<EditArticle />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

