import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Dashboard from "./components/Dashboard"
import ArticleManagement from "./components/ArticleManagement"
import EditArticle from "./components/EditArticle"
import AddArticle from "./components/AddArticle"
import CategoryManagement from "./components/CategoryManagement"
import Settings from "./components/Settings"
import Analytics from "./components/Analytics"
import Login from "./components/Login"
import PrivateRoute from "./components/PrivateRoute"
import "./App.css"
import { CategoryProvider } from './contexts/CategoryContext';
import Comments from "./components/Comments";
import Notifications from "./components/Notifications";
import ReportedContent from "./components/ReportedContent";
import Trash from "./components/Trash";
import Roles from "./components/Roles";
import Users from "./components/Users";

function App() {
  return (
    <CategoryProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <div className="admin-layout">
                  <Sidebar />
                  <main className="admin-main">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/articles" element={<ArticleManagement />} />
                      <Route path="/articles/new" element={<AddArticle />} />
                      <Route path="/articles/edit/:id" element={<EditArticle />} />
                      <Route path="/categories" element={<CategoryManagement />} />
                      <Route path="/analytics" element={<Analytics />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/users" element={<Users />} />
                      <Route path="/comments" element={<Comments />} />
                      <Route path="/notifications" element={<Notifications />} />
                      <Route path="/reported-content" element={<ReportedContent />} />
                      <Route path="/trash" element={<Trash />} />
                      <Route path="/roles" element={<Roles />} />
                    </Routes>
                  </main>
                </div>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </CategoryProvider>
  )
}

export default App

