import React, { useState } from 'react';
import axios from 'axios';

function NewsEditor({ onSave }) {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: '',
        image: '',
        author: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/news', formData);
            setFormData({
                title: '',
                content: '',
                category: '',
                image: '',
                author: ''
            });
            if (onSave) onSave();
        } catch (error) {
            console.error('Error creating news:', error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Create News Article</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Title</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Content</label>
                    <textarea
                        className="w-full p-2 border rounded"
                        rows="4"
                        value={formData.content}
                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Category</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Image URL</label>
                    <input
                        type="url"
                        className="w-full p-2 border rounded"
                        value={formData.image}
                        onChange={(e) => setFormData({...formData, image: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block mb-1">Author</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={formData.author}
                        onChange={(e) => setFormData({...formData, author: e.target.value})}
                        required
                    />
                </div>
                <button 
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Publish
                </button>
            </form>
        </div>
    );
}

export default NewsEditor; 