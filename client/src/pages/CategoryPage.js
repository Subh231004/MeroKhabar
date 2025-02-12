import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NewsCard from '../components/NewsCard';

function CategoryPage() {
  const { categoryId } = useParams(); // Updated to match route parameter name
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryArticles = async () => {
      try {
        console.log('Category ID:', categoryId); // Debug log

        // Fetch all articles
        const articlesRes = await fetch('http://localhost:3002/api/articles');
        const articlesData = await articlesRes.json();
        
        // Filter articles by category
        const filteredArticles = articlesData.filter(article => 
          String(article.category) === String(categoryId)
        );

        console.log('Filtered Articles:', filteredArticles); // Debug log

        // Fetch category details
        const categoryRes = await fetch(`http://localhost:3002/api/categories/${categoryId}`);
        const categoryData = await categoryRes.json();
        
        setCategory(categoryData);
        setArticles(filteredArticles);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchCategoryArticles();
    }
  }, [categoryId]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="category-page">
      <div className="category-header">
        <h1>{category?.name || 'Category'} News</h1>
        {category?.description && <p>{category.description}</p>}
      </div>

      <div className="articles-grid">
        {articles && articles.length > 0 ? (
          articles.map(article => (
            <NewsCard
              key={article.id}
              article={{
                ...article,
                formattedDate: new Date(article.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
              }}
            />
          ))
        ) : (
          <p className="no-articles">No articles found in this category.</p>
        )}
      </div>
    </div>
  );
}

export default CategoryPage;