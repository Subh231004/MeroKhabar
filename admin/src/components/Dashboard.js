import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Users, 
  BarChart2, 
  Settings, 
  PlusCircle,
  List,
  Grid,
} from 'lucide-react';
import './Dashboard.css';
import { api } from '../services/api';


function Dashboard() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await api.getAllArticles();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await api.deleteArticle(id);
        setArticles(articles.filter(article => article.id !== id));
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    }
  };

  const stats = {
    articles: 156,
    users: 2489,
    views: "45.2K",
    engagement: "23%"
  };

  const formatDateTime = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  return (
    <div className="dashboard-container">
      {/* Top Bar */}
      <div className="dashboard-topbar">
        <h1>Admin Dashboard</h1>
        <div className="topbar-right">
          
          <div className="admin-profile">
            <img src="admin-avatar.png" alt="Admin" />
            <span>Abhishek Roy</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon articles">
            <FileText size={24} />
          </div>
          <div className="stat-details">
            <h3>Total Articles</h3>
            <p>{stats.articles}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon users">
            <Users size={24} />
          </div>
          <div className="stat-details">
            <h3>Total Users</h3>
            <p>{stats.users}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon views">
            <BarChart2 size={24} />
          </div>
          <div className="stat-details">
            <h3>Total Views</h3>
            <p>{stats.views}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon engagement">
            <Settings size={24} />
          </div>
          <div className="stat-details">
            <h3>Engagement</h3>
            <p>{stats.engagement}</p>
          </div>
        </div>
        
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <Link to="/articles/new" className="action-btn">
            <PlusCircle size={20} />
            New Article
          </Link>
          <Link to="/articles" className="action-btn">
            <List size={20} />
            Manage Articles
          </Link>
          <Link to="/categories" className="action-btn">
            <Grid size={20} />
            Categories
          </Link>
        </div>
      </div>

      {/* Recent Articles */}
      <div className="recent-articles">
        <h2>Recent Articles</h2>
        <div className="articles-table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.slice(0, 5).map(article => (
                <tr key={article.id}>
                  <td>{article.title}</td>
                  <td>{article.category}</td>
                  <td>{formatDateTime(article.publishedAt)}</td>
                  <td>
                    <span className={`status ${article.isFeatured ? 'featured' : 'standard'}`}>
                      {article.isFeatured ? 'Featured' : 'Standard'}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button 
                        className="edit-btn"
                        onClick={() => navigate(`/articles/edit/${article.id}`)}
                      >
                        Edit
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDelete(article.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;