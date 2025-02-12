const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const usersRouter = require('./routes/users');
const categoriesRouter = require('./routes/categories');

// Middleware
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3002;

// Path to articles.json
const articlesPath = path.join(__dirname, 'data', 'articles.json');

// Get all articles
app.get('/api/articles', (req, res) => {
  try {
    const articlesData = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
    res.json(articlesData.articles);
  } catch (error) {
    res.status(500).json({ error: 'Error reading articles' });
  }
});

// Get article by ID
app.get('/api/articles/:id', (req, res) => {
  try {
    const articlesData = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
    const article = articlesData.articles.find(a => a.id === parseInt(req.params.id));
    
    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ error: 'Article not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error reading article' });
  }
});

// Add new article (admin only)
app.post('/api/articles', (req, res) => {
  try {
    const articlesData = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
    const newArticle = {
      id: articlesData.articles.length + 1,
      ...req.body,
      publishedAt: new Date(Date.now() + (365 * 24 * 60 * 60 * 1000)).toISOString() // Set date 1 year ahead
    };
    
    articlesData.articles.push(newArticle);
    fs.writeFileSync(articlesPath, JSON.stringify(articlesData, null, 2));
    
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ error: 'Error creating article' });
  }
});

// Update article (admin only)
app.put('/api/articles/:id', (req, res) => {
  try {
    const articlesData = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
    const index = articlesData.articles.findIndex(a => a.id === parseInt(req.params.id));
    
    if (index !== -1) {
      articlesData.articles[index] = {
        ...articlesData.articles[index],
        ...req.body
      };
      
      fs.writeFileSync(articlesPath, JSON.stringify(articlesData, null, 2));
      res.json(articlesData.articles[index]);
    } else {
      res.status(404).json({ error: 'Article not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating article' });
  }
});

// Delete article (admin only)
app.delete('/api/articles/:id', (req, res) => {
  try {
    const articlesData = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
    const index = articlesData.articles.findIndex(a => a.id === parseInt(req.params.id));
    
    if (index !== -1) {
      articlesData.articles.splice(index, 1);
      fs.writeFileSync(articlesPath, JSON.stringify(articlesData, null, 2));
      res.json({ message: 'Article deleted successfully' });
    } else {
      res.status(404).json({ error: 'Article not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting article' });
  }
});

// Get articles by category
app.get('/api/categories/:category', (req, res) => {
  try {
    const articlesData = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
    const categoryArticles = articlesData.articles.filter(
      article => article.category.toLowerCase() === req.params.category.toLowerCase()
    );
    res.json(categoryArticles);
  } catch (error) {
    res.status(500).json({ error: 'Error reading category articles' });
  }
});

// Get featured articles
app.get('/api/featured', (req, res) => {
  try {
    const articlesData = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
    const featuredArticles = articlesData.articles.filter(article => article.isFeatured);
    res.json(featuredArticles);
  } catch (error) {
    res.status(500).json({ error: 'Error reading featured articles' });
  }
});

// Routes
app.use('/api/users', usersRouter);
app.use('/api/categories', categoriesRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});