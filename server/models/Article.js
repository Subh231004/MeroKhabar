const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  category: { type: String, enum: ["Politics", "Technology", "Business", "Health", "Sports", "Entertainment"], required: true },
  image_url: { type: String, trim: true },
  author: { type: String, required: true, trim: true },
  featured: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Article", articleSchema);
