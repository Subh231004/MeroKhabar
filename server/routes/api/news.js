const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const News = require('../../models/News');

// Get all published news
router.get('/', async (req, res) => {
    try {
        const news = await News.find({ status: 'published' })
            .sort({ publishDate: -1 })
            .populate('author', 'name');
        res.json(news);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Create news (Admin only)
router.post('/', auth, async (req, res) => {
    try {
        const { title, content, category, image } = req.body;
        const news = new News({
            title,
            content,
            category,
            image,
            author: req.user.id
        });
        await news.save();
        res.json(news);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router; 