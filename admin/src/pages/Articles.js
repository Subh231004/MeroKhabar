import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./Articles.css"

function Articles() {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    fetch("http://localhost:3002/api/articles")
      .then((res) => res.json())
      .then((data) => setArticles(data))
  }, [])

  const deleteArticle = async (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      await fetch(`http://localhost:3002/api/articles/${id}`, {
        method: "DELETE",
      })
      setArticles(articles.filter((article) => article.id !== id))
    }
  }

  return (
    <div className="articles-page">
      <div className="articles-header">
        <h1>Articles</h1>
        <Link to="/articles/edit/new" className="btn-new">
          New Article
        </Link>
      </div>
      <table className="articles-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id}>
              <td>{article.title}</td>
              <td>{article.category}</td>
              <td>{new Date(article.publishedAt).toLocaleDateString()}</td>
              <td>
                <Link to={`/articles/edit/${article.id}`} className="btn-edit">
                  Edit
                </Link>
                <button onClick={() => deleteArticle(article.id)} className="btn-delete">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Articles

