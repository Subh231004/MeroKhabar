import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function AdminLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const menuItems = [
        { path: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
        { path: '/admin/news', icon: '📰', label: 'Manage News' },
        { path: '/admin/categories', icon: '🗂️', label: 'Categories' },
        { path: '/admin/users', icon: '👥', label: 'Users' },
        { path: '/admin/settings', icon: '⚙️', label: 'Settings' },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800">
                    <div className="flex items-center justify-between mb-6 px-2">
                        <span className="text-xl font-semibold text-white">Admin Panel</span>
                        <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-white">
                            ×
                        </button>
                    </div>
                    <nav>
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center px-4 py-3 mb-2 rounded-lg ${
                                    location.pathname === item.path
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-300 hover:bg-gray-700'
                                }`}
                            >
                                <span className="mr-3">{item.icon}</span>
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <div className={`p-4 ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
                {/* Top Bar */}
                <div className="mb-6 bg-white rounded-lg shadow-sm p-4 flex justify-between items-center">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 text-sm text-red-600 hover:text-red-800"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Page Content */}
                <main className="bg-white rounded-lg shadow-sm p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default AdminLayout; 