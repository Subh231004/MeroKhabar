import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Article from './pages/Article';
import Category from './components/Category';
import Login from './pages/Login';
import CategoryPage from './pages/CategoryPage';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/article/:articleId" element={<Article />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} /> {/* Updated path parameter name */}
          <Route path="/category/:id" element={<CategoryPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

