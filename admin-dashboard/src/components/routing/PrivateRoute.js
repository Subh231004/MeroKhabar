import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    
    // Add additional verification here if needed
    // For example, you could verify the token is valid and the user is an admin
    
    return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute; 