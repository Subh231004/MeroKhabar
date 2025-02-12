const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const categoriesPath = path.join(__dirname, '../data/categories.json');
const articlesPath = path.join(__dirname, '../data/articles.json');

// Get all categories with real-time article counts
router.get('/', async (req, res) => {
  try {
    const categoriesData = await fs.readFile(categoriesPath, 'utf8');
    const articlesData = await fs.readFile(articlesPath, 'utf8');
    
    const { categories } = JSON.parse(categoriesData);
    const { articles } = JSON.parse(articlesData);

    // Count articles for each category
    const articleCounts = articles.reduce((acc, article) => {
      const categoryId = parseInt(article.category);
      acc[categoryId] = (acc[categoryId] || 0) + 1;
      return acc;
    }, {});

    // Add counts to categories
    const categoriesWithCounts = categories.map(category => ({
      ...category,
      articleCount: articleCounts[category.id] || 0
    }));

    res.json(categoriesWithCounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single category
router.get('/:id', async (req, res) => {
  try {
    const category = categories.find(c => c.id === parseInt(req.params.id));
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new category
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    
    // Read current categories
    const data = await fs.readFile(categoriesPath, 'utf8');
    const { categories } = JSON.parse(data);
    
    const newCategory = {
      id: categories.length + 1,
      name,
      slug,
      description
    };
    
    categories.push(newCategory);
    
    // Write back to file
    await fs.writeFile(categoriesPath, JSON.stringify({ categories }, null, 2));
    
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update category
router.put('/:id', async (req, res) => {
  try {
    const { name, description } = req.body;
    const categoryIndex = categories.findIndex(c => c.id === parseInt(req.params.id));
    
    if (categoryIndex === -1) {
      return res.status(404).json({ message: 'Category not found' });
    }

    categories[categoryIndex] = {
      ...categories[categoryIndex],
      name: name || categories[categoryIndex].name,
      description: description || categories[categoryIndex].description,
      slug: name ? name.toLowerCase().replace(/\s+/g, '-') : categories[categoryIndex].slug
    };

    res.json(categories[categoryIndex]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete category
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    // Read current categories
    const data = await fs.readFile(categoriesPath, 'utf8');
    const { categories } = JSON.parse(data);
    
    const updatedCategories = categories.filter(category => category.id !== id);
    
    // Write back to file
    await fs.writeFile(categoriesPath, JSON.stringify({ categories: updatedCategories }, null, 2));
    
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;