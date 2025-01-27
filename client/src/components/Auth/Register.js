import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.password2) {
            setError('Passwords do not match');
            return;
        }

        try {
            const res = await axios.post('/api/auth/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
            localStorage.setItem('token', res.data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.msg || 'An error occurred');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
                <h2 className="text-center text-3xl font-bold">Register</h2>
                {error && <div className="text-red-500 text-center">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium">Name</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border rounded-md px-3 py-2"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            className="mt-1 block w-full border rounded-md px-3 py-2"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Password</label>
                        <input
                            type="password"
                            className="mt-1 block w-full border rounded-md px-3 py-2"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Confirm Password</label>
                        <input
                            type="password"
                            className="mt-1 block w-full border rounded-md px-3 py-2"
                            value={formData.password2}
                            onChange={(e) => setFormData({...formData, password2: e.target.value})}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register; 