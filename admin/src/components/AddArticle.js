import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategories } from '../contexts/CategoryContext';
import { api } from '../services/api';
import '../styles/ArticleForm.css';

function AddArticle() {
  const navigate = useNavigate();
  const { categories, refreshCategories } = useCategories();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [article, setArticle] = useState({
    title: '',
    content: '',
    category: '', 
    image: '',
    author: '',
    isFeatured: false
  });

  useEffect(() => {
    if (categories.length > 0 && !article.category) {
      setArticle(prev => ({ ...prev, category: categories[0].id }));
    }
  }, [categories, article.category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.createArticle(article);
      await refreshCategories(); // Refresh categories to update article counts
      navigate('/articles');
    } catch (err) {
      console.error('Error adding article:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="loading">Creating article...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="article-form-container">
      <h1>Add New Article</h1>
      <form onSubmit={handleSubmit} className="article-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={article.title}
            onChange={(e) => setArticle({...article, title: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea
            value={article.content}
            onChange={(e) => setArticle({...article, content: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select 
  value={article.category}
  onChange={(e) => setArticle({...article, category: e.target.value})}
  required
>
  <option value="">Select a category</option>
  {["Politics", "Technology", "Business", "Health", "Sports", "Entertainment"].map((category, index) => (
    <option key={index} value={category}>
      {category}
    </option>
  ))}
</select>

        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            value={article.image}
            onChange={(e) => setArticle({...article, image: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label>Author</label>
          <input
            type="text"
            value={article.author}
            onChange={(e) => setArticle({...article, author: e.target.value})}
            required
          />
        </div>
        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              checked={article.isFeatured}
              onChange={(e) => setArticle({...article, isFeatured: e.target.checked})}
            />
            Featured Article
          </label>
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-btn">Create Article</button>
          <button type="button" className="cancel-btn" onClick={() => navigate('/articles')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddArticle;