const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const articlesPath = path.join(__dirname, '../data/articles.json');
const categoriesPath = path.join(__dirname, '../data/categories.json');

// Update category count
async function updateCategoryCount(categoryName, increment = true) {
  const data = await fs.readFile(categoriesPath, 'utf8');
  let { categories } = JSON.parse(data);
  
  categories = categories.map(category => {
    if (category.name === categoryName) {
      return {
        ...category,
        articleCount: Math.max(0, category.articleCount + (increment ? 1 : -1))
      };
    }
    return category;
  });

  await fs.writeFile(categoriesPath, JSON.stringify({ categories }, null, 2));
}

// Create article
router.post('/', async (req, res) => {
  try {
    const data = await fs.readFile(articlesPath, 'utf8');
    const { articles } = JSON.parse(data);
    
    const newArticle = {
      id: articles.length ? Math.max(...articles.map(a => a.id)) + 1 : 1,
      ...req.body,
      publishedAt: new Date().toISOString()
    };

    articles.push(newArticle);
    await fs.writeFile(articlesPath, JSON.stringify({ articles }, null, 2));
    
    // Update category count
    await updateCategoryCount(newArticle.category, true);
    
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ error: 'Error creating article' });
  }
});

// Delete article
router.delete('/:id', async (req, res) => {
  try {
    const data = await fs.readFile(articlesPath, 'utf8');
    let { articles } = JSON.parse(data);
    
    const article = articles.find(a => a.id === parseInt(req.params.id));
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    articles = articles.filter(a => a.id !== parseInt(req.params.id));
    await fs.writeFile(articlesPath, JSON.stringify({ articles }, null, 2));
    
    // Update category count
    await updateCategoryCount(article.category, false);
    
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting article' });
  }
});