import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard';
import Navbar from './components/layout/Navbar';

// Create PrivateRoute component inline
const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/admin/*"
                        element={
                            <PrivateRoute>
                                <div>
                                    <Navbar />
                                    <div className="container mx-auto px-4 py-8">
                                        <Routes>
                                            <Route path="dashboard" element={<Dashboard />} />
                                        </Routes>
                                    </div>
                                </div>
                            </PrivateRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App; 