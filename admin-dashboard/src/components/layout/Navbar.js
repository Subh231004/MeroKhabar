import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/admin/dashboard" className="text-xl font-bold">
                    Mero Khabhar Admin
                </Link>
                <div className="flex space-x-4">
                    <Link to="/admin/dashboard" className="hover:text-gray-300">
                        Dashboard
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="hover:text-gray-300"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar; 