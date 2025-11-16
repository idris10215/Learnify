// frontend/src/components/auth/PublicRoute.jsx - (The Public Entrance Guide)
import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ user, children, redirectTo }) => {
  // If user is logged in AND there's a specific 'redirectTo' target (e.g., for login pages),
  // then navigate the user away from this public route to their dashboard.
  if (user && redirectTo) {
    // If the user's role is known, we could make this redirection smarter here,
    // e.g., redirect a student to /student-dashboard if they tried to access /teacher-login.
    // However, the LoginPage itself also handles this by checking session and redirecting.
    return <Navigate to={redirectTo} replace />;
  }

  // In all other cases (no user, or user but no specific redirectTo for this public page),
  // just render the content of the public page.
  return children;
};

export default PublicRoute;