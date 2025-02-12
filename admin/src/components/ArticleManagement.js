import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Eye, Search } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useCategories } from '../contexts/CategoryContext';
import { api } from '../services/api';
import '../styles/ArticleManagement.css';
import { formatDateTime } from '../utils/dateFormat';

function ArticleManagement() {
  const navigate = useNavigate();
  const { categories, refreshCategories } = useCategories();  // Add categories from context
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const data = await api.getAllArticles();
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await api.deleteArticle(id);
        await refreshCategories(); // Refresh categories after deleting article
        setArticles(articles.filter(article => article.id !== id));
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/articles/edit/${id}`);
  };

  const handleView = (id) => {
    // Open article in new tab
    window.open(`/article/${id}`, '_blank');
  };

  // Add function to get category name by ID
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === parseInt(categoryId));
    return category ? category.name : 'Unknown';
  };

  // Update the filtered articles to use category IDs for filtering
  const filteredArticles = articles
    .filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || article.category === parseInt(filterCategory);
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.publishedAt) - new Date(a.publishedAt);
      }
      return new Date(a.publishedAt) - new Date(b.publishedAt);
    });

  return (
    <div className="article-management">
      <div className="management-header">
        <h1>Article Management</h1>
        <Link to="/articles/new" className="new-article-btn">New Article</Link>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-options">
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      <div className="articles-table">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Author</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredArticles.map(article => (
              <tr key={article.id}>
                <td>{article.title}</td>
                <td>{getCategoryName(article.category)}</td>
                <td>{article.author}</td>
                <td className="datetime-cell">{formatDateTime(article.publishedAt)}</td>
                <td>
                  <span className={`status ${article.isFeatured ? 'featured' : 'standard'}`}>
                    {article.isFeatured ? 'Featured' : 'Standard'}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="view-btn"
                      onClick={() => handleView(article.id)}
                      title="View Article"
                    >
                      <Eye size={16} />
                    </button>
                    <button 
                      className="edit-btn"
                      onClick={() => handleEdit(article.id)}
                      title="Edit Article"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDelete(article.id)}
                      title="Delete Article"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ArticleManagement;