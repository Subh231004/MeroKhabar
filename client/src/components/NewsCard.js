import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NewsCard.css';

function NewsCard({ article }) {
  return (
    <div className="news-card">
      <Link to={`/article/${article.id}`}>
        <img 
          src={article.image || "/placeholder.svg"} 
          alt={article.title} 
          className="news-image"
        />
        <div className="news-content">
          <h3 className="line-clamp-2">{article.title}</h3>
          <p className="line-clamp-3">{article.excerpt}</p>
          <span className="news-date">{article.formattedDate}</span>
          <button className="read-more">Read More</button>
        </div>
      </Link>
    </div>
  );
}

export default NewsCard;
