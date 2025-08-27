import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginNavbar from './components/LoginNavbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/dashboards/StudentdashBoard';
import TeacherDashboard from './pages/dashboards/TeacherdashBoard';

// A layout for main pages with the full Navbar and Footer
const MainLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

// A layout for authentication pages with the simpler LoginNavbar
const AuthLayout = ({ children }) => (
    <div className="flex flex-col min-h-screen bg-gray-100">
        <LoginNavbar />
        {children}
    </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <div className="bg-gray-50 text-gray-900 font-sans">
        <Routes>
          <Route path="/" element={<MainLayout><LandingPage /></MainLayout>} />
          <Route path="/teacher-login" element={<AuthLayout><LoginPage role="Teacher" /></AuthLayout>} />
          <Route path="/student-login" element={<AuthLayout><LoginPage role="Student" /></AuthLayout>} />
          {/* Add the new routes for the dashboards */}
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
