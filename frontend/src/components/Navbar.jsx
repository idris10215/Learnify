import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'aws-amplify/auth';
import Button from './ui/Button';
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react';

const Navbar = ({ user }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await signOut();
            navigate('/');
            window.location.reload(); 
        } catch (error) {
            console.error('Error signing out: ', error);
        }
    };
    
    const dashboardPath = user?.role === 'Students' ? '/student-dashboard' : '/teacher-dashboard';
    const userInitial = user?.username?.charAt(0).toUpperCase() || 'U';

    return (
        <header className="bg-white sticky top-0 z-50 border-b-2 border-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/">
                        <h1 className="text-3xl font-bold text-gray-800">
                          Learnify<span className="text-blue-500">.</span>
                        </h1>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-2">
                        {user ? (
                            <>
                                <Link to={dashboardPath}>
                                    <Button className="text-sm py-2 px-4">Go to Dashboard</Button>
                                </Link>
                                <div className="relative">
                                    <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="block h-10 w-10 rounded-full overflow-hidden border-2 border-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center bg-gray-200 font-bold text-gray-600">
                                        {userInitial}
                                    </button>
                                    {isProfileOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border-2 border-black py-2 z-20">
                                            <button onClick={handleSignOut} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                                <LogOut size={16} className="mr-2" /> Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/teacher-login"><Button className="text-sm py-2 px-4">Sign in as Teacher</Button></Link>
                                <Link to="/student-login"><Button className="text-sm py-2 px-4">Sign in as Student</Button></Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            <Menu size={28} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                 <div className="lg:hidden absolute top-0 left-0 w-full bg-white z-50 border-b-2 border-black shadow-lg">
                     <div className="px-4 pt-4 pb-6">
                        <div className="flex items-center justify-between mb-4">
                             <Link to="/">
                                <h1 className="text-3xl font-bold text-gray-800">Learnify<span className="text-blue-500">.</span></h1>
                            </Link>
                            <button onClick={() => setIsMobileMenuOpen(false)}>
                                <X size={28} />
                            </button>
                        </div>
                        <div className="flex flex-col space-y-4">
                             {user ? (
                                <>
                                    <Link to={dashboardPath}><Button className="w-full">Go to Dashboard</Button></Link>
                                    <Button onClick={handleSignOut} className="w-full !bg-red-500 text-white border-red-500">Logout</Button>
                                </>
                            ) : (
                                <>
                                    <Link to="/teacher-login"><Button className="w-full">Sign in as Teacher</Button></Link>
                                    <Link to="/student-login"><Button className="w-full">Sign in as Student</Button></Link>
                                </>
                            )}
                        </div>
                     </div>
                 </div>
            )}
        </header>
    );
};

export default Navbar;

