import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <header className="bg-white shadow-md">
            {/* Top Bar */}
            <div className="bg-red-600 text-white py-1">
                <div className="container mx-auto px-4 flex justify-between items-center text-sm">
                    <span>{currentDate}</span>
                    <div className="flex gap-4">
                        <Link to="/login" className="hover:text-gray-200">Login</Link>
                        <Link to="/register" className="hover:text-gray-200">Register</Link>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-3xl font-bold text-red-600">
                        Mero Khabar
                    </Link>
                    
                    {/* Mobile Menu Button */}
                    <button 
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex gap-6">
                        <Link to="/" className="text-gray-700 hover:text-red-600">Home</Link>
                        <Link to="/politics" className="text-gray-700 hover:text-red-600">Politics</Link>
                        <Link to="/business" className="text-gray-700 hover:text-red-600">Business</Link>
                        <Link to="/technology" className="text-gray-700 hover:text-red-600">Technology</Link>
                        <Link to="/sports" className="text-gray-700 hover:text-red-600">Sports</Link>
                        <Link to="/entertainment" className="text-gray-700 hover:text-red-600">Entertainment</Link>
                    </nav>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <nav className="md:hidden bg-white border-t">
                    <div className="container mx-auto px-4 py-2">
                        <Link to="/" className="block py-2 text-gray-700 hover:text-red-600">Home</Link>
                        <Link to="/politics" className="block py-2 text-gray-700 hover:text-red-600">Politics</Link>
                        <Link to="/business" className="block py-2 text-gray-700 hover:text-red-600">Business</Link>
                        <Link to="/technology" className="block py-2 text-gray-700 hover:text-red-600">Technology</Link>
                        <Link to="/sports" className="block py-2 text-gray-700 hover:text-red-600">Sports</Link>
                        <Link to="/entertainment" className="block py-2 text-gray-700 hover:text-red-600">Entertainment</Link>
                    </div>
                </nav>
            )}

            {/* Breaking News Ticker */}
            <div className="bg-gray-100 border-y">
                <div className="container mx-auto px-4 py-2 flex items-center">
                    <span className="bg-red-600 text-white px-4 py-1 text-sm font-bold mr-4">
                        BREAKING
                    </span>
                    <div className="overflow-hidden">
                        <div className="animate-ticker">
                            Latest Breaking News: Important updates and headlines...
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar; 