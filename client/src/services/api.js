import axios from 'axios';

const API_URL = 'http://localhost:3002/api';

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

  // Get articles by category
  getArticlesByCategory: async (category) => {
    const response = await axios.get(`${API_URL}/categories/${category}`);
    return response.data;
  },

  // Get featured articles
  getFeaturedArticles: async () => {
    const response = await axios.get(`${API_URL}/featured`);
    return response.data;
  }
}; 