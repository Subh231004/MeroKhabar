import React from "react"
import { Link } from "react-router-dom"
import "./NewsCard.css"

function NewsCard({ article, featured }) {
  return (
    <div className={`news-card ${featured ? "featured" : ""}`}>
      <img src={article.image || "/placeholder.svg"} alt={article.title} />
      <div className="news-content">
        <h3>{article.title}</h3>
        <p>{article.excerpt}</p>
        <Link to={`/article/${article.id}`}>Read More</Link>
      </div>
    </div>
  )
}

export default NewsCard
