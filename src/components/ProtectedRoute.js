import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
    const userId = localStorage.getItem('id'); // Get user ID from local storage
    const role = localStorage.getItem('role'); // Get user role from local storage

    // Redirect to login if userId is not found
    if (!userId) {
        return <Navigate to="/login" />;
    }

    // Compare URL parameter with stored user ID
    const urlId = window.location.pathname.split('/')[2]; // Extract ID from URL
    if (urlId !== userId) {
        return <Navigate to="/unauthorized" />; // Redirect if user ID does not match
    }

    // Redirect if the user's role does not match the required role
    if (requiredRole && role !== requiredRole) {
        return <Navigate to="/unauthorized" />; // Optionally redirect to an unauthorized page
    }

    return children; // If authenticated and role matches, render the children
};

export default ProtectedRoute;
