import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './layout/Navbar';

function HomePage() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/news');
                setNews(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching news:', error);
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto px-4 py-6">
                {/* Top News Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Main Featured News */}
                    <div className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
                        {news[0] && (
                            <>
                                <img 
                                    src={news[0].image} 
                                    alt={news[0].title}
                                    className="w-full h-96 object-cover"
                                />
                                <div className="p-6">
                                    <h1 className="text-3xl font-bold mb-4">{news[0].title}</h1>
                                    <p className="text-gray-600 text-lg mb-4">{news[0].content}</p>
                                    <div className="text-sm text-gray-500">
                                        <span>By {news[0].author} • </span>
                                        <span>{new Date(news[0].publishDate).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Side News */}
                    <div className="space-y-4">
                        {news.slice(1, 4).map((article) => (
                            <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden flex">
                                <img 
                                    src={article.image}
                                    alt={article.title}
                                    className="w-32 h-32 object-cover"
                                />
                                <div className="p-4 flex-1">
                                    <h2 className="font-semibold mb-2">{article.title}</h2>
                                    <p className="text-sm text-gray-500">{new Date(article.publishDate).toLocaleDateString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Categories Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="col-span-full">
                        <h2 className="text-2xl font-bold mb-4 border-b-2 border-red-600 pb-2">Latest News</h2>
                    </div>
                    {news.slice(4).map((article) => (
                        <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img 
                                src={article.image}
                                alt={article.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="font-semibold mb-2">{article.title}</h3>
                                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{article.content}</p>
                                <div className="text-xs text-gray-500">
                                    <span>{new Date(article.publishDate).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Advertisement Section */}
                <div className="mb-8">
                    <div className="bg-gray-200 h-32 flex items-center justify-center">
                        <span className="text-gray-500">Advertisement Space</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage; 