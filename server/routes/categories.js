const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const categoriesFilePath = path.join(__dirname, '../data/categories.json');
const articlesFilePath = path.join(__dirname, '../data/articles.json');

// Get real-time article counts
async function getArticleCounts() {
  try {
    const articlesData = await fs.readFile(articlesFilePath, 'utf8');
    const { articles } = JSON.parse(articlesData);
    
    const counts = {};
    articles.forEach(article => {
      counts[article.category] = (counts[article.category] || 0) + 1;
    });
    return counts;
  } catch (error) {
    console.error('Error counting articles:', error);
    return {};
  }
}

// Get all categories with real counts
router.get('/', async (req, res) => {
  try {
    const data = await fs.readFile(categoriesFilePath, 'utf8');
    let { categories } = JSON.parse(data);
    
    // Get real-time article counts
    const articleCounts = await getArticleCounts();
    
    // Update categories with real counts
    categories = categories.map(category => ({
      ...category,
      articleCount: articleCounts[category.name] || 0
    }));

    res.json(categories);
  } catch (error) {
    console.error('Error reading categories:', error);
    res.status(500).json({ error: 'Error fetching categories' });
  }
});

// Add new category
router.post('/', async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    const data = await fs.readFile(categoriesFilePath, 'utf8');
    const { categories } = JSON.parse(data);
    
    // Check if category already exists
    if (categories.some(cat => cat.name.toLowerCase() === req.body.name.toLowerCase())) {
      return res.status(400).json({ error: 'Category already exists' });
    }
    
    const newCategory = {
      id: categories.length ? Math.max(...categories.map(c => c.id)) + 1 : 1,
      name: req.body.name.trim(),
      articleCount: 0,
      color: req.body.color || '#' + Math.floor(Math.random()*16777215).toString(16)
    };

    categories.push(newCategory);
    await fs.writeFile(categoriesFilePath, JSON.stringify({ categories }, null, 2));
    
    // Get real article count
    const articleCounts = await getArticleCounts();
    newCategory.articleCount = articleCounts[newCategory.name] || 0;
    
    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(500).json({ error: 'Error adding new category' });
  }
});

// Add new category with article count
router.post('/categories', async (req, res) => {
  try {
    const { name, articleCount } = req.body;
    
    // Validate input
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ message: 'Invalid category name' });
    }

    // Add category to database
    const newCategory = {
      id: Date.now(), // or your DB's ID generation
      name: name.trim(),
      articleCount: articleCount || 0
    };

    // Save to database
    // ... your database logic here

    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete category
router.delete('/:id', async (req, res) => {
  try {
    const data = await fs.readFile(categoriesFilePath, 'utf8');
    let { categories } = JSON.parse(data);
    
    const categoryId = parseInt(req.params.id);
    const categoryExists = categories.some(cat => cat.id === categoryId);
    
    if (!categoryExists) {
      return res.status(404).json({ message: 'Category not found' });
    }

    categories = categories.filter(cat => cat.id !== categoryId);
    await fs.writeFile(categoriesFilePath, JSON.stringify({ categories }, null, 2));
    
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'Error deleting category' });
  }
});

// Delete category by ID
router.delete('/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Your deletion logic here
    // ...
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'Failed to delete category' });
  }
});

// Update category
router.put('/:id', async (req, res) => {
  try {
    const data = await fs.readFile(categoriesFilePath, 'utf8');
    let { categories } = JSON.parse(data);
    
    categories = categories.map(category => 
      category.id === parseInt(req.params.id)
        ? { ...category, name: req.body.name }
        : category
    );

    await fs.writeFile(categoriesFilePath, JSON.stringify({ categories }, null, 2));
    res.json(categories.find(category => category.id === parseInt(req.params.id)));
  } catch (error) {
    res.status(500).json({ error: 'Error updating category' });
  }
});

module.exports = router;