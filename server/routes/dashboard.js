const router = require('express').Router();
const Article = require('../models/Article');
const User = require('../models/User');
const View = require('../models/View'); // You'll need to create this model

router.get('/stats', async (req, res) => {
  try {
    // Get total articles count
    const articlesCount = await Article.countDocuments();
    
    // Get total users count
    const usersCount = await User.countDocuments();
    
    // Get total views (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const views = await View.countDocuments({ 
      createdAt: { $gte: thirtyDaysAgo } 
    });
    
    // Calculate engagement (views per article)
    const engagement = articlesCount > 0 
      ? ((views / articlesCount) * 100).toFixed(1) + '%'
      : '0%';

    // Format views for display
    const formattedViews = views >= 1000 
      ? (views / 1000).toFixed(1) + 'K' 
      : views.toString();

    res.json({
      articles: articlesCount,
      users: usersCount,
      views: formattedViews,
      engagement
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dashboard stats' });
  }
});

module.exports = router;