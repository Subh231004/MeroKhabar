import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const NewsDetail = () => {
    const { id } = useParams();
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await axios.get(`/api/news/${id}`);
                setNews(res.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load news article');
                setLoading(false);
            }
        };

        fetchNews();
    }, [id]);

    if (loading) return <div className="text-center p-4">Loading...</div>;
    if (error) return <div className="text-center text-red-500 p-4">{error}</div>;
    if (!news) return <div className="text-center p-4">News article not found</div>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
            {news.image && (
                <img 
                    src={news.image} 
                    alt={news.title}
                    className="w-full h-96 object-cover mb-4 rounded"
                />
            )}
            <div className="flex items-center text-gray-600 mb-4">
                <span>Category: {news.category}</span>
                <span className="mx-2">•</span>
                <span>{new Date(news.publishDate).toLocaleDateString()}</span>
            </div>
            <div className="prose max-w-none">
                {news.content}
            </div>
        </div>
    );
};

export default NewsDetail; 