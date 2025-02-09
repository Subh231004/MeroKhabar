import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import NewsCard from "../components/NewsCard"
import "./Category.css"

function Category() {
  const { categoryId } = useParams()
  const [articles, setArticles] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3002/api/articles?category=${categoryId}`)
      .then((res) => res.json())
      .then((data) => setArticles(data))
  }, [categoryId])

  return (
    <div className="category-page">
      <h1>{categoryId}</h1>
      <div className="category-grid">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}

export default Category

