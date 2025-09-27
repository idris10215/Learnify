// frontend/src/components/dashboard/TeacherHeader.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signOut } from 'aws-amplify/auth';
import { Bell, User, LogOut, Menu } from 'lucide-react';

const TeacherHeader = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const teacherName = "Sarah"; 

    const handleSignOut = async () => {
        try {
            await signOut();
            navigate('/');
            window.location.reload();
        } catch (error) {
            console.error('Error signing out: ', error);
        }
    };

    const navLinks = [
        { name: 'Dashboard', path: '/teacher-dashboard' },
        { name: 'My Paths', path: '/teacher-paths' },
        { name: 'My Classes', path: '/teacher-classes' },
        { name: 'Analytics', path: '/analytics' },
    ];

    return (
        <header className="bg-white sticky top-0 z-50 border-b-2 border-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link to="/teacher-dashboard">
                            <h1 className="text-3xl font-bold text-gray-800">Learnify<span className="text-blue-500">.</span></h1>
                        </Link>
                    </div>
                    <nav className="hidden lg:flex lg:space-x-4">
                        {navLinks.map(link => (
                            <Link 
                                key={link.name} 
                                to={link.path} 
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === link.path ? 'bg-blue-500 text-white' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                    <div className="flex items-center space-x-4">
                        <button className="relative p-2 rounded-full hover:bg-gray-100">
                            <Bell size={24} />
                        </button>
                        <div className="relative">
                            <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center space-x-2">
                                <img src={`https://placehold.co/40x40/E2E8F0/4A5568?text=${teacherName.charAt(0)}`} alt="Profile" className="h-10 w-10 rounded-full border-2 border-gray-300" />
                            </button>
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border-2 border-black py-2 z-20">
                                    <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><User size={16} className="mr-2" /> Profile</Link>
                                    <button onClick={handleSignOut} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                        <LogOut size={16} className="mr-2" /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                         <div className="lg:hidden">
                            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                                <Menu size={28} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
             {isMobileMenuOpen && (
                 <div className="lg:hidden absolute top-16 left-0 w-full bg-white z-40 border-b-2 border-black shadow-lg">
                      <div className="px-4 pt-4 pb-6 space-y-4">
                          {navLinks.map(link => (
                              <Link key={link.name} to={link.path} className="block text-base font-medium text-gray-700 hover:bg-gray-50 p-3 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
                                  {link.name}
                              </Link>
                          ))}
                     </div>
                 </div>
            )}
        </header>
    );
};

export default TeacherHeader;