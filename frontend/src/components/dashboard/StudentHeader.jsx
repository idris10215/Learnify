// frontend/src/components/dashboard/StudentHeader.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signOut, getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth'; // Import getCurrentUser
import { Bell, User, LogOut, Menu } from 'lucide-react';

const StudentHeader = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [username, setUsername] = useState('Student'); // State to hold the student's username
    const [name, setName] = useState('Student');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const user = await getCurrentUser();
                setUsername(user.username || 'Student'); // Set username from Amplify

                const attributes = await fetchUserAttributes(user);
                const fetchedName = attributes.name || 'Student';
                setName(fetchedName);

            } catch (error) {
                console.error("Error fetching current user for header:", error);
                setUsername('Student'); // Fallback if user not found or error
            }
        };
        fetchUsername();
    }, []);

    const handleSignOut = async () => {
        try {
            await signOut();
            navigate('/');
            window.location.reload();
        } catch (error) {
            console.error('Error signing out: ', error);
        }
    };

    // Define navigation links for the student dashboard
    const navLinks = [
        { name: 'Dashboard', path: '/student-dashboard' },  
        // You can add more student-specific links here
    ];

    const userInitial = name.charAt(0).toUpperCase();

    return (
        <header className="bg-white sticky top-0 z-50 border-b-2 border-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link to="/">
                            <h1 className="text-3xl font-bold text-gray-800">Learnify<span className="text-blue-500">.</span></h1>
                        </Link>
                    </div>
                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex lg:space-x-4">
                        {navLinks.map(link => (
                            <Link 
                                key={link.name} 
                                to={link.path} 
                                className={"px-4 py-2 rounded-lg text-sm font-medium transition-colors text-gray-500 hover:bg-gray-100 hover:text-gray-900"}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                    {/* Right-side Icons & Profile */}
                    <div className="flex items-center space-x-4">
                        {/* <button className="relative p-2 rounded-full hover:bg-gray-100">
                            <Bell size={24} />
                        </button> */}
                        <div className="relative">
                            <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center space-x-2">
                                {/* Using the userInitial for the profile avatar */}
                                <div className="h-10 w-10 rounded-full border-2 border-gray-300 flex items-center justify-center bg-gray-200 font-bold text-gray-600">
                                    {userInitial}
                                </div>
                            </button>
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border-2 border-black py-2 z-20">
                                    <button onClick={handleSignOut} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 mouse-pointer">
                                        <LogOut size={16} className="mr-2" /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                        {/* Mobile Menu Toggle */}
                        <div className="lg:hidden">
                            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                                <Menu size={28} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-16 left-0 w-full bg-white z-40 border-b-2 border-black shadow-lg">
                    <div className="px-4 pt-4 pb-6 space-y-4">
                        {navLinks.map(link => (
                            <Link 
                                key={link.name} 
                                to={link.path} 
                                className="block text-base font-medium text-gray-700 hover:bg-gray-50 p-3 rounded-lg" 
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        {/* Mobile-only profile and logout */}
                        
                        <button onClick={handleSignOut} className="w-full text-left block text-base font-medium text-red-600 hover:bg-red-50 p-3 rounded-lg">
                            <LogOut size={16} className="mr-2 inline-block" /> Logout
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default StudentHeader;