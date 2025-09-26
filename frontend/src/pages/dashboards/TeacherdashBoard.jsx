import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signOut } from 'aws-amplify/auth';
import { 
    Bell, User, Settings, LogOut, LayoutDashboard, BookCopy, Menu, PlusCircle, BarChart2, Award, Users as UsersIcon, Clock, Folder, CheckCircle, ChevronRight, AlertTriangle
} from 'lucide-react';

// --- Reusable UI Components ---

const DashboardCard = ({ children, className = '' }) => (
    <div className="relative h-full">
      <div className="absolute inset-0 bg-black rounded-2xl transform translate-x-1 translate-y-1"></div>
      <div className={`relative bg-white p-4 sm:p-6 border-2 border-black rounded-2xl h-full flex flex-col ${className}`}>
          {children}
      </div>
    </div>
);

const StatCard = ({ title, value, subValue, icon, color }) => (
    <DashboardCard>
        <div className="flex items-start justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-2xl sm:text-3xl font-bold mt-1">{value}</p>
                {subValue && (
                    <p className="text-xs text-gray-400">
                        {subValue}
                    </p>
                )}
            </div>
            <div className={`p-2 sm:p-3 rounded-lg border-2 border-black bg-${color}-100`}>
                {React.cloneElement(icon, { className: `text-${color}-500`})}
            </div>
        </div>
    </DashboardCard>
);

// --- New, Streamlined Header ---

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

const TeacherDashboard = () => {
    return (
        <div className="bg-gradient-to-b from-blue-500 to-white min-h-screen flex flex-col">
            <TeacherHeader />
            <main className="flex-1 p-4 sm:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">Here's your mission control for today, Sarah.</h2>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        <StatCard title="Total Students" value="143" subValue="in 5 classes" icon={<UsersIcon size={24} />} color="blue"/>
                        <StatCard title="Active Paths" value="8" subValue="3 new this month" icon={<BookCopy size={24} />} color="green" />
                        <StatCard title="Avg. Score" value="88%" subValue="+3% this week" icon={<Award size={24} />} color="yellow" />
                        <StatCard title="Avg. Engagement" value="7.5h" subValue="weekly" icon={<Clock size={24} />} color="purple" />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        <div className="lg:col-span-1">
                            <DashboardCard>
                                <h3 className="text-xl font-bold mb-4">Attention Required</h3>
                                <div className="space-y-4">
                                    <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                                        <div className="flex items-start">
                                            <AlertTriangle size={20} className="text-red-500 mr-3 mt-1 shrink-0"/>
                                            <div>
                                                <p className="font-bold text-red-800 text-sm">Low Average Score</p>
                                                <p className="text-xs text-red-600">Chemistry 9A needs attention.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                                        <div className="flex items-start">
                                            <CheckCircle size={20} className="text-green-500 mr-3 mt-1 shrink-0"/>
                                            <div>
                                                <p className="font-bold text-green-800 text-sm">3 New Submissions</p>
                                                <p className="text-xs text-green-600">In Physics 101 - Period 2.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </DashboardCard>
                        </div>
                        <div className="lg:col-span-2">
                            <DashboardCard>
                                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
                                    <h3 className="text-xl font-bold mb-2 sm:mb-0">My Paths Library</h3>
                                    <Link to="/create-path" className="w-full sm:w-auto">
                                        <button className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center border-2 border-black hover:bg-blue-600 transition-colors cursor-pointer">
                                            <PlusCircle size={20} className="mr-2" />
                                            Create New Path
                                        </button>
                                    </Link>
                                </div>
                                <div className="space-y-3 flex-grow flex flex-col">
                                     <Link to="/teacher-paths/1" className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-colors">
                                        <p className="font-semibold text-sm">Introduction to Python</p>
                                        <span className="text-xs text-gray-500">Updated 2 days ago</span>
                                        <ChevronRight size={20} className="text-gray-400" />
                                    </Link>
                                     <Link to="/teacher-paths/2" className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-colors">
                                        <p className="font-semibold text-sm">React Fundamentals</p>
                                        <span className="text-xs text-gray-500">Updated 1 week ago</span>
                                        <ChevronRight size={20} className="text-gray-400" />
                                    </Link>
                                     <div className="flex-grow"></div>
                                     <Link to="/teacher-paths" className="self-end">
                                        <button className="text-sm font-semibold text-blue-500 cursor-pointer">View all paths</button>
                                     </Link>
                                </div>
                            </DashboardCard>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TeacherDashboard;

