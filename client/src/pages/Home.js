import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NewsCard from "../components/NewsCard";
import Footer from "../components/Footer";
import "../styles/Home.css";

function Home() {
  const [articles, setArticles] = useState([]);
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [latestNews, setLatestNews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3002/api/articles")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setFeaturedArticles(data.filter((article) => article.isFeatured));
        setLatestNews(
          data
            .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
            .slice(0, 5)
        );
      });
  }, []);

  const formatDateTime = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  return (
    <>
      <div className="home-container">
        <main className="main-content">
          <section className="featured-section">
            {featuredArticles[0] && (
              <div className="main-featured">
                <Link to={`/article/${featuredArticles[0].id}`}>
                  <img
                    src={featuredArticles[0].image || "/placeholder.svg"}
                    alt={featuredArticles[0].title}
                  />
                  <h2 className="line-clamp-2">{featuredArticles[0].title}</h2>
                  <p>{featuredArticles[0].excerpt}</p>
                  <span className="datetime">
                    {formatDateTime(featuredArticles[0].publishedAt)}
                  </span>
                  <button className="read-more">Read More</button>
                </Link>
              </div>
            )}
            <div className="secondary-featured">
              {featuredArticles.slice(1, 3).map((article) => (
                <div key={article.id} className="featured-card">
                  <Link to={`/article/${article.id}`}>
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                    />
                    <h3 className="line-clamp-2">{article.title}</h3>
                    <p className="line-clamp-2">{article.excerpt}</p>
                    <span className="datetime">
                      {formatDateTime(article.publishedAt)}
                    </span>
                    <button className="read-more">Read More</button>
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <div className="content-wrapper">
            <section className="news-grid">
              {articles
                .filter((article) => !article.isFeatured)
                .map((article) => (
                  <NewsCard 
                    key={article.id} 
                    article={{
                      ...article,
                      formattedDate: formatDateTime(article.publishedAt)
                    }} 
                  />
                ))}
            </section>

            <aside className="sidebar">
              <h3>Latest News</h3>
              <div className="latest-news">
                {latestNews.map((article) => (
                  <div key={article.id} className="latest-news-item">
                    <Link to={`/article/${article.id}`}>
                      <h4 className="line-clamp-2">{article.title}</h4>
                      <span className="time">
                        {formatDateTime(article.publishedAt)}
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Home;
