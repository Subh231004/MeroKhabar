import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Dashboard from "./components/Dashboard"
import ArticleManagement from "./components/ArticleManagement"
import EditArticle from "./components/EditArticle"
import AddArticle from "./components/AddArticle"
import CategoryManagement from "./components/CategoryManagement"
import UserManagement from "./components/UserManagement"
import Settings from "./components/Settings"
import Analytics from "./components/Analytics"
import "./App.css"
import { CategoryProvider } from './contexts/CategoryContext';

function App() {
  return (
    <CategoryProvider>
      <Router>
        <div className="admin-layout">
          <Sidebar />
          <main className="admin-main">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/articles" element={<ArticleManagement />} />
              <Route path="/articles/new" element={<AddArticle />} />
              <Route path="/articles/edit/:id" element={<EditArticle />} />
              <Route path="/categories" element={<CategoryManagement />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CategoryProvider>
  )
}

export default App

