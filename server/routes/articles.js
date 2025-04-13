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
 try{
  const newArticle = new Article(req.body);
  const savedArticle = await newArticle.save();
  res.status(201).json(savedArticle);
 }catch (err) {
       res.status(500).json({
        message:err.message
       });
 }
});

module.exports = router;
