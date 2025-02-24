import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-project.vercel.app/api' 
  : 'http://localhost:3002';

export const api = {
  // Get all articles
  getAllArticles: async () => {
    const response = await axios.get(`${API_URL}/articles`);
    return response.data;
  },

  // Get article by ID
  getArticleById: async (id) => {
    const response = await axios.get(`${API_URL}/articles/${id}`);
    return response.data;
  },

  // Create new article
  createArticle: async (articleData) => {
    const response = await axios.post(`${API_URL}/articles`, articleData);
    return response.data;
  },

  // Update article
  updateArticle: async (id, articleData) => {
    const response = await axios.put(`${API_URL}/articles/${id}`, articleData);
    return response.data;
  },

  // Delete article
  deleteArticle: async (id) => {
    const response = await axios.delete(`${API_URL}/articles/${id}`);
    return response.data;
  }
};