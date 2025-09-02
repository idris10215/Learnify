import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ user, children, redirectTo = "/student-dashboard" }) => {
  // If a user is already logged in, redirect them away from the login page.
  if (user) {
    return <Navigate to={redirectTo} replace />;
  }

  // If there is no user, render the public page.
  return children;
};

export default PublicRoute;
