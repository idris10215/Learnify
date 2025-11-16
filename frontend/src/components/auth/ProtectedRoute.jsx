// frontend/src/components/auth/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ user, children, allowedRoles }) => {
    const location = useLocation();

    // 1. If no user is authenticated AT ALL, redirect to the home page.
    if (!user) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    // 2. Check if the authenticated user has ANY of the allowed roles
    const userHasCorrectRole = allowedRoles.some(role => user.role === role);

    if (!userHasCorrectRole) {
        // User is logged in but does not have an allowed role for this specific route.
        // Instead of redirecting or signing out, we'll simply render an "Access Denied" message.
        // This allows the user to remain logged in as their current role,
        // but prevents them from seeing the content of the restricted page.
        console.warn(`Access Denied: User '${user.username}' (role: ${user.role}) attempted to access a route requiring roles: ${allowedRoles.join(', ')}`);
        
        // Define the dashboard path based on the user's actual role, with a fallback
        const userDashboardPath = user.role ? `/${user.role.toLowerCase()}-dashboard` : '/';

        return (
            <div className="flex items-center justify-center h-screen bg-red-100 text-red-700 p-4 rounded-lg shadow-md text-center">
                <p className="text-2xl font-semibold">Access Denied</p>
                <p className="mt-2 text-lg">You are logged in as a <span className="font-bold capitalize">{user.role || 'user with an unassigned role'}</span> and do not have permission to view this page.</p>
                <p className="mt-4 text-md">
                    Please return to your 
                    <a href={userDashboardPath} className="text-blue-600 hover:underline font-medium ml-1">dashboard</a> 
                    or 
                    <a href="/" className="text-blue-600 hover:underline font-medium ml-1">home page</a>.
                </p>
            </div>
        );
    }

    // If authenticated and has the correct role, render the children.
    return children;
};

export default ProtectedRoute;