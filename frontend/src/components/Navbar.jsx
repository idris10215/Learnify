import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'aws-amplify/auth';
import Button from './ui/Button';
import { User, LogOut, LayoutDashboard } from 'lucide-react';

// The Navbar now receives the user state as a prop
const Navbar = ({ user }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await signOut();
            // The Hub listener in App.jsx will automatically update the user state.
            // We just need to navigate home.
            navigate('/');
            // A full page reload can sometimes help ensure all state is cleared.
            window.location.reload(); 
        } catch (error) {
            console.error('Error signing out: ', error);
        }
    };
    
    // Determine dashboard path (a simple check for now)
    const dashboardPath = "/student-dashboard"; // You can enhance this later to check user's role

    return (
        <header className="bg-white sticky top-0 z-50 border-b-2 border-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/">
                        <h1 className="text-3xl font-bold text-gray-800">
                          Learnify<span className="text-blue-500">.</span>
                        </h1>
                    </Link>
                    <div className="flex items-center space-x-2">
                        {user ? (
                            // Show this if the user IS logged in
                            <>
                                <Link to={dashboardPath}>
                                    <Button className="hidden sm:block text-sm py-2 px-4">Go to Dashboard</Button>
                                </Link>
                                <div className="relative">
                                    <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="block h-10 w-10 rounded-full overflow-hidden border-2 border-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                        <img src={`https://placehold.co/40x40/E2E8F0/4A5568?text=${user?.username?.charAt(0).toUpperCase() || 'U'}`} alt="Profile" />
                                    </button>
                                    {isProfileOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border-2 border-black py-2 z-20">
                                            <Link to={dashboardPath} className="flex sm:hidden items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><LayoutDashboard size={16} className="mr-2" /> Dashboard</Link>
                                            <button onClick={handleSignOut} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                                <LogOut size={16} className="mr-2" /> Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            // Show this if the user IS NOT logged in
                            <>
                                <Link to="/teacher-login">
                                    <Button className="text-sm py-2 px-4">Sign in as Teacher</Button>
                                </Link>
                                <Link to="/student-login">
                                    <Button className="text-sm py-2 px-4">Sign in as Student</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;

