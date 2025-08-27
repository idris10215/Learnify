import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginNavbar from './components/LoginNavbar'; // New import
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';

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
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
