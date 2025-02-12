import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "../styles/Article.css"
import Footer from "../components/Footer"

function Article() {
  const { articleId } = useParams()
  const [article, setArticle] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:3002/api/articles/${articleId}`)
      .then((res) => res.json())
      .then((data) => setArticle(data))
  }, [articleId])

  if (!article) return <div className="loading">Loading...</div>

  return (
    <>
      <div className="article-container">
        <main className="article-page">
          <div className="article-header">
            <h1>{article.title}</h1>
            <div className="article-meta">
              <span>By {article.author}</span>
              <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="article-image">
            <img src={article.image || "/placeholder.svg"} alt={article.title} />
          </div>
          <div className="article-content">{article.content}</div>
        </main>
      </div>
      <Footer />
    </>
  )
}

export default Article

