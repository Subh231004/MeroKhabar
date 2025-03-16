const express = require("express");
const router = express.Router();
const Article = require("../models/Article"); // Ensure the model path is correct

// Fetch all articles
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find(); // Fetch all articles
    res.json(articles); // Return articles as JSON
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});

// ✅ Corrected POST route (changed `app.post` to `router.post`)
router.post("/", async (req, res) => {
  try {
    const newArticle = new Article(req.body);
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (err) {
    res.status(500).json({ error: "Error saving article", details: err.message });
  }
});

module.exports = router;
