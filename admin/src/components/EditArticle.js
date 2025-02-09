import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import './ArticleForm.css';

function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState({
    title: '',
    content: '',
    category: '',
    image: '',
    isFeatured: false
  });

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await api.getArticleById(id);
        setArticle(data);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };
    fetchArticle();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.updateArticle(id, article);
      navigate('/articles');
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };

  return (
    <div className="article-form-container">
      <h1>Edit Article</h1>
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
          <input
            type="text"
            value={article.category}
            onChange={(e) => setArticle({...article, category: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            value={article.image}
            onChange={(e) => setArticle({...article, image: e.target.value})}
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
          <button type="submit" className="submit-btn">Update Article</button>
          <button type="button" className="cancel-btn" onClick={() => navigate('/articles')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditArticle; 