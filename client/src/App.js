import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Category from "./pages/Category"
import Article from "./pages/Article"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryId" element={<Category />} />
          <Route path="/article/:articleId" element={<Article />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

