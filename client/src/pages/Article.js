import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "./Article.css"

function Article() {
  const { articleId } = useParams()
  const [article, setArticle] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:3001/api/articles/${articleId}`)
      .then((res) => res.json())
      .then((data) => setArticle(data))
  }, [articleId])

  if (!article) return <div>Loading...</div>

  return (
    <div className="article-page">
      <h1>{article.title}</h1>
      <img src={article.image || "/placeholder.svg"} alt={article.title} />
      <div className="article-meta">
        <span>By {article.author}</span>
        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
      </div>
      <div className="article-content">{article.content}</div>
    </div>
  )
}

export default Article

