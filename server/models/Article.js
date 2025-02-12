const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  // ...existing fields...
  category: {
    type: Number, // This should match the category id
    required: true,
    ref: 'Category'
  },
  // ...existing fields...
}, { timestamps: true });

// Add index for better performance
ArticleSchema.index({ category: 1 });

module.exports = mongoose.model('Article', ArticleSchema);

const fs = require('fs').promises;
const path = require('path');

const articlesPath = path.join(__dirname, '../data/articles.json');

class Article {
  static async getAll() {
    const data = await fs.readFile(articlesPath, 'utf8');
    return JSON.parse(data).articles;
  }

  static async create(articleData) {
    const data = await fs.readFile(articlesPath, 'utf8');
    const { articles } = JSON.parse(data);
    
    const newArticle = {
      id: articles.length + 1,
      ...articleData,
      createdAt: new Date().toISOString()
    };
    
    articles.push(newArticle);
    await fs.writeFile(articlesPath, JSON.stringify({ articles }, null, 2));
    
    return newArticle;
  }
}



module.exports = Article;

const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const data = await fs.readFile(articlesPath, 'utf8');
    const { articles } = JSON.parse(data);
    
    const newArticle = {
      ...req.body,
      id: articles.length + 1,
      category: parseInt(req.body.category), // Ensure category is stored as number
      createdAt: new Date().toISOString()
    };

    articles.push(newArticle);
    await fs.writeFile(articlesPath, JSON.stringify({ articles }, null, 2));
    
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const data = await fs.readFile(articlesPath, 'utf8');
    const { articles } = JSON.parse(data);
    
    // Log the articles being sent
    console.log('Sending articles:', articles);
    
    res.json(articles);
  } catch (error) {
    console.error('Error reading articles:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;