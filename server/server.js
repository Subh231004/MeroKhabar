const express = require("express")
const cors = require("cors")
const fs = require("fs").promises
const path = require("path")

const app = express()
app.use(cors())
app.use(express.json())

const dataPath = path.join(__dirname, "data", "articles.json")

// Get all articles
app.get("/api/articles", async (req, res) => {
  try {
    const data = await fs.readFile(dataPath, "utf8")
    const articles = JSON.parse(data).articles
    res.json(articles)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch articles" })
  }
})

// Get single article
app.get("/api/articles/:id", async (req, res) => {
  try {
    const data = await fs.readFile(dataPath, "utf8")
    const articles = JSON.parse(data).articles
    const article = articles.find((a) => a.id === Number.parseInt(req.params.id))
    if (article) {
      res.json(article)
    } else {
      res.status(404).json({ error: "Article not found" })
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch article" })
  }
})

// Create article
app.post("/api/articles", async (req, res) => {
  try {
    const data = await fs.readFile(dataPath, "utf8")
    const { articles } = JSON.parse(data)
    const newArticle = {
      id: articles.length + 1,
      ...req.body,
      publishedAt: new Date().toISOString(),
    }
    articles.push(newArticle)
    await fs.writeFile(dataPath, JSON.stringify({ articles }, null, 2))
    res.json(newArticle)
  } catch (error) {
    res.status(500).json({ error: "Failed to create article" })
  }
})

// Update article
app.put("/api/articles/:id", async (req, res) => {
  try {
    const data = await fs.readFile(dataPath, "utf8")
    const { articles } = JSON.parse(data)
    const index = articles.findIndex((a) => a.id === Number.parseInt(req.params.id))
    if (index !== -1) {
      articles[index] = { ...articles[index], ...req.body }
      await fs.writeFile(dataPath, JSON.stringify({ articles }, null, 2))
      res.json(articles[index])
    } else {
      res.status(404).json({ error: "Article not found" })
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update article" })
  }
})

// Delete article
app.delete("/api/articles/:id", async (req, res) => {
  try {
    const data = await fs.readFile(dataPath, "utf8")
    const { articles } = JSON.parse(data)
    const filteredArticles = articles.filter((a) => a.id !== Number.parseInt(req.params.id))
    await fs.writeFile(dataPath, JSON.stringify({ articles: filteredArticles }, null, 2))
    res.json({ message: "Article deleted" })
  } catch (error) {
    res.status(500).json({ error: "Failed to delete article" })
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

