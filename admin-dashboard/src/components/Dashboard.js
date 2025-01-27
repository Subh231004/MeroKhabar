import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsEditor from './NewsEditor';

function Dashboard() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showEditor, setShowEditor] = useState(false);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('/api/news', {
                    headers: { 'x-auth-token': token }
                });
                setNews(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching news:', error);
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    const deleteNews = async (id) => {
        if (window.confirm('Are you sure you want to delete this news?')) {
            try {
                await axios.delete(`/api/news/${id}`, {
                    headers: { 'x-auth-token': localStorage.getItem('token') }
                });
                fetchNews();
            } catch (err) {
                console.error('Error deleting news:', err);
            }
        }
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <button
                    onClick={() => setShowEditor(true)}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Create New Article
                </button>
            </div>

            {showEditor && (
                <NewsEditor
                    onClose={() => setShowEditor(false)}
                    onSave={() => {
                        setShowEditor(false);
                        fetchNews();
                    }}
                />
            )}

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid gap-4">
                    {news.map(item => (
                        <div key={item._id} className="border p-4 rounded flex justify-between items-center">
                            <div>
                                <h3 className="font-bold">{item.title}</h3>
                                <p className="text-gray-600">{item.category}</p>
                            </div>
                            <div>
                                <button
                                    onClick={() => deleteNews(item._id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded mr-2"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => {/* Add edit functionality */}}
                                    className="bg-blue-500 text-white px-3 py-1 rounded"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Dashboard; 