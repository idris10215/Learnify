import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Amplify } from 'aws-amplify';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginNavbar from './components/LoginNavbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/dashboards/StudentdashBoard';
import TeacherDashboard from './pages/dashboards/TeacherDashBoard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PublicRoute from './components/auth/PublicRoute';
import withAuth from './components/auth/withAuth'; // Import our new HOC

Amplify.configure({
  Auth: {
    Cognito: {
      region: import.meta.env.VITE_AWS_REGION,
      userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
    }
  }
});

const MainLayout = ({ children, user }) => (
  <>
    <Navbar user={user} />
    {children}
    <Footer />
  </>
);

const AuthLayout = ({ children }) => (
    <div className="flex flex-col min-h-screen bg-gray-100">
        <LoginNavbar />
        {children}
    </div>
);

// The App component is now much simpler. It just receives the 'user' prop.
const App = ({ user }) => {
  return (
    <BrowserRouter>
      <div className="bg-gray-50 text-gray-900 font-sans">
        <Routes>
          <Route path="/" element={<MainLayout user={user}><LandingPage /></MainLayout>} />
          
          <Route 
            path="/teacher-login" 
            element={
              <PublicRoute user={user} redirectTo="/teacher-dashboard">
                <AuthLayout><LoginPage role="Teacher" /></AuthLayout>
              </PublicRoute>
            } 
          />
          <Route 
            path="/student-login" 
            element={
              <PublicRoute user={user} redirectTo="/student-dashboard">
                <AuthLayout><LoginPage role="Student" /></AuthLayout>
              </PublicRoute>
            }
          />
          
          <Route 
            path="/student-dashboard" 
            element={
              <ProtectedRoute user={user} redirectTo="/">
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/teacher-dashboard" 
            element={
              <ProtectedRoute user={user} redirectTo="/">
                <TeacherDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

// We export the App component wrapped in our withAuth "brain".
export default withAuth(App);

