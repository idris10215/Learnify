import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ user, children }) => {
  const location = useLocation();

  // If there is no authenticated user, redirect to the login page.
  // We also pass the current location so we can redirect back after login.
  if (!user) {
    return <Navigate to="/student-login" state={{ from: location }} replace />;
  }

  // If there is a user, render the page they were trying to access.
  return children;
};

export default ProtectedRoute;

