import React from "react"
import { Link } from "react-router-dom"
import "./NewsCard.css"

function NewsCard({ article }) {
  return (
    <div className="news-card">
      <Link to={`/article/${article.id}`}>
        <img src={article.image || "/placeholder.svg"} alt={article.title} />
        <div className="news-content">
          <span className="category">{article.category}</span>
          <h4>{article.title}</h4>
          <p>{article.excerpt}</p>
        </div>
      </Link>
    </div>
  )
}

export default NewsCard

