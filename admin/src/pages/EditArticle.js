import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "./EditArticle.css"

function EditArticle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState({
    title: "",
    content: "",
    category: "",
    image: "",
  })

  useEffect(() => {
    if (id !== "new") {
      fetch(`http://localhost:3002/api/articles/${id}`)
        .then((res) => res.json())
        .then((data) => setArticle(data))
    }
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const method = id === "new" ? "POST" : "PUT"
    const url = id === "new" ? "http://localhost:3002/api/articles" : `http://localhost:3002/api/articles/${id}`

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(article),
    })

    navigate("/articles")
  }

  return (
    <div className="edit-article">
      <h1>{id === "new" ? "New Article" : "Edit Article"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={article.title}
            onChange={(e) => setArticle({ ...article, title: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea value={article.content} onChange={(e) => setArticle({ ...article, content: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select value={article.category} onChange={(e) => setArticle({ ...article, category: e.target.value })}>
            <option value="">Select Category</option>
            <option value="News">News</option>
            <option value="Politics">Politics</option>
            <option value="Business">Business</option>
            <option value="Sports">Sports</option>
          </select>
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            value={article.image}
            onChange={(e) => setArticle({ ...article, image: e.target.value })}
          />
        </div>
        <button type="submit" className="btn-submit">
          Save Article
        </button>
      </form>
    </div>
  )
}

export default EditArticle

