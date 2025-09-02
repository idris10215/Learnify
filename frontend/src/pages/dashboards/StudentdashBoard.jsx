import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Added useNavigate
import { signOut } from 'aws-amplify/auth'; // Added signOut
import { 
    Bell, User, Settings, LogOut, LayoutDashboard, BookCopy, Menu, Search, ChevronDown, PlayCircle, BarChart2, Award, MessageSquare, BookOpen, CheckSquare, Star, Trophy, Percent, Clock, Lightbulb
} from 'lucide-react';

// --- Reusable UI Components specific to the Dashboard ---

const DashboardCard = ({ children, className = '', color = 'black' }) => (
    <div className={`relative ${className}`}>
      <div className={`absolute inset-0 bg-${color} rounded-2xl transform translate-x-1 translate-y-1`}></div>
      <div className={`relative bg-white p-4 border-2 border-black rounded-2xl h-full flex flex-col`}>
          {children}
      </div>
    </div>
);

const StatCard = ({ icon, value, label, color }) => (
    <div className="relative">
        <div className="absolute inset-0 bg-black rounded-2xl transform translate-x-1 translate-y-1"></div>
        <div className={`relative bg-white p-4 border-2 border-black rounded-2xl h-full flex flex-col`}>
            <div className="flex items-center">
                <div className={`p-2 rounded-lg bg-${color}-100 border-2 border-black mr-3`}>
                    {React.cloneElement(icon, { className: `text-${color}-500`, size: 20 })}
                </div>
                <div>
                    <p className="text-xl font-bold text-gray-800">{value}</p>
                    <p className="text-xs text-gray-500">{label}</p>
                </div>
            </div>
        </div>
    </div>
);


// --- Dashboard Layout Components ---

const LeftSidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const [isHoverExpanded, setIsHoverExpanded] = useState(false);
    const isExpanded = isHoverExpanded;
    const location = useLocation();

    const navItems = [
        { icon: <LayoutDashboard size={22} />, name: 'Dashboard', path: '/student-dashboard' },
        { icon: <BookCopy size={22} />, name: 'Courses', path: '/student-courses' },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            <div 
                className={`fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsSidebarOpen(false)}
            ></div>
            {/* Sidebar */}
            <aside 
                onMouseEnter={() => setIsHoverExpanded(true)}
                onMouseLeave={() => setIsHoverExpanded(false)}
                className={`fixed lg:relative top-0 left-0 h-full bg-gray-800 text-white z-40 transform transition-all duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0 w-60' : '-translate-x-full w-60'} lg:translate-x-0 ${isExpanded ? 'lg:w-64' : 'lg:w-24'} flex flex-col`}
            >
                <div className="p-4 flex items-center" style={{ minHeight: '68px' }}>
                    <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'w-full' : 'w-0'}`}>
                         <h1 className="text-3xl font-bold text-white whitespace-nowrap">Learnify<span className="text-blue-400">.</span></h1>
                    </div>
                </div>

                {isExpanded && (
                    <div className="px-4 mb-4">
                        <div className="bg-gray-700 rounded-lg p-3 flex items-center">
                            <img src="https://placehold.co/40x40/3B82F6/FFFFFF?text=I" alt="Student" className="w-10 h-10 rounded-full border-2 border-blue-400" />
                            <div className="ml-3">
                                <p className="font-bold text-white text-sm">Idris</p>
                                <p className="text-xs text-gray-400">Student</p>
                            </div>
                        </div>
                    </div>
                )}
                
                <nav className="flex-1 px-4">
                    <ul className="space-y-2">
                        {navItems.map(item => {
                            const isActive = location.pathname === item.path;
                            return (
                                <li key={item.name}>
                                    <Link to={item.path} className={`flex items-center p-3 rounded-lg transition-colors font-medium overflow-hidden ${!isExpanded && 'justify-center'} ${isActive ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
                                        {item.icon}
                                        <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'w-40 ml-3' : 'w-0 ml-0'}`}>
                                            <span className="whitespace-nowrap">{item.name}</span>
                                        </div>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </aside>
        </>
    );
};

const TopHeader = ({ setIsSidebarOpen }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const navigate = useNavigate(); // Added navigate hook

    // --- LOGOUT FUNCTIONALITY ADDED HERE ---
    const handleSignOut = async () => {
        try {
            await signOut();
            navigate('/'); // Redirect to home page after logout
        } catch (error) {
            console.error('Error signing out: ', error);
        }
    };

    return (
        <header className="bg-white sticky top-0 z-10 border-b-2 border-gray-200">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden mr-4">
                            <Menu size={28} />
                        </button>
                        <div className="relative">
                            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input type="text" placeholder="Search courses, quizzes..." className="pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg w-full md:w-80" />
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="relative p-2 rounded-full hover:bg-gray-100">
                            <Bell size={24} />
                            <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white"></span>
                        </button>
                        <div className="relative">
                            <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center space-x-2">
                                <img src="https://placehold.co/40x40/E2E8F0/4A5568?text=I" alt="Profile" className="h-10 w-10 rounded-full border-2 border-gray-300" />
                            </button>
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border-2 border-gray-200 py-2 z-20">
                                    <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><User size={16} className="mr-2" /> Profile</Link>
                                    <Link to="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><Settings size={16} className="mr-2" /> Settings</Link>
                                    {/* --- LOGOUT BUTTON IS NOW FUNCTIONAL --- */}
                                    <button onClick={handleSignOut} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                        <LogOut size={16} className="mr-2" /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

// --- Main Student Dashboard Component ---

const StudentDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="bg-gray-50 h-screen flex">
            <LeftSidebar 
                isSidebarOpen={isSidebarOpen} 
                setIsSidebarOpen={setIsSidebarOpen}
            />
            <div className="flex-1 flex flex-col h-screen">
                <TopHeader 
                    setIsSidebarOpen={setIsSidebarOpen}
                />
                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-gradient-to-b from-blue-50 to-gray-50">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Main Content Area */}
                        <div className="lg:col-span-3 space-y-6">
                            {/* Welcome Banner */}
                            <div className="bg-blue-500 text-white p-4 rounded-2xl shadow-lg flex items-center justify-between border-2 border-black">
                                <h2 className="text-xl font-bold">👋 Welcome back, Idris</h2>
                                <div className="text-center">
                                    <p className="font-bold text-2xl">5 🔥</p>
                                    <p className="text-xs text-blue-100">Day Streak</p>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <StatCard icon={<BookOpen size={24}/>} value="3" label="In Progress" color="blue" />
                                <StatCard icon={<Clock size={24}/>} value="5h 30m" label="Time This Week" color="orange" />
                                <StatCard icon={<Percent size={24}/>} value="88%" label="Avg. Score" color="yellow" />
                                <StatCard icon={<Trophy size={24}/>} value="#3" label="Current Rank" color="purple" />
                            </div>

                            {/* Main Content Grid */}
                             <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                                <DashboardCard className="xl:col-span-2">
                                    <h3 className="text-lg font-bold mb-4 border-b-4 border-blue-500 pb-2">🚀 Pick Up Where You Left Off</h3>
                                    <div className="space-y-3 pt-2">
                                        <Link to="/courses/physics-101/module-2" className="flex items-center justify-between p-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition">
                                             <div>
                                                <p className="font-semibold text-sm">Newton's Laws of Motion</p>
                                                <p className="text-xs text-gray-500">From: Physics 101</p>
                                            </div>
                                            <PlayCircle size={20} className="text-blue-500" />
                                        </Link>
                                    </div>
                                </DashboardCard>
                                <div className="bg-yellow-100 p-4 rounded-2xl border-2 border-black flex flex-col items-center text-center">
                                    <Lightbulb size={32} className="text-yellow-500 mb-2"/>
                                    <h4 className="font-bold text-yellow-800">Daily Tip</h4>
                                    <p className="text-sm text-yellow-700 mt-1">Reviewing notes for 15 minutes after a class can boost retention by 60%!</p>
                                </div>
                            </div>
                            <DashboardCard>
                                <div className="flex justify-between items-center mb-4 border-b-4 border-green-500 pb-2">
                                    <h3 className="text-lg font-bold">📚 My Courses</h3>
                                    <Link to="/student-courses">
                                        <button className="bg-gray-100 text-gray-700 font-bold py-1 px-3 rounded-lg text-sm border-2 border-black">View All</button>
                                    </Link>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                                    <div className="border-2 border-black rounded-xl bg-white text-center p-2">
                                        <img src="https://placehold.co/100x100/3B82F6/FFFFFF?text=P" alt="Course" className="w-16 h-16 rounded-lg mx-auto border-2 border-black" />
                                        <h4 className="font-bold mt-2 text-xs">Physics 101</h4>
                                    </div>
                                    <div className="border-2 border-black rounded-xl bg-white text-center p-2">
                                        <img src="https://placehold.co/100x100/10B981/FFFFFF?text=H" alt="Course" className="w-16 h-16 rounded-lg mx-auto border-2 border-black" />
                                        <h4 className="font-bold mt-2 text-xs">World History</h4>
                                    </div>
                                </div>
                            </DashboardCard>
                        </div>

                        {/* Right Sidebar (Leaderboard) */}
                        <div className="lg:col-span-1">
                             <DashboardCard>
                                <h3 className="text-lg font-bold mb-4 border-b-4 border-purple-500 pb-2">🏆 Class Leaderboard</h3>
                                <ul className="space-y-3 pt-2">
                                    <li className="flex items-center"><span className="font-bold mr-3">🥇</span><img src="https://placehold.co/32x32/E2E8F0/4A5568?text=A" className="w-8 h-8 rounded-full" alt="User" /><span className="ml-2 font-medium text-sm">Alice</span><span className="ml-auto text-xs font-semibold text-gray-700">1250 pts</span></li>
                                    <li className="flex items-center"><span className="font-bold mr-3">🥈</span><img src="https://placehold.co/32x32/E2E8F0/4A5568?text=B" className="w-8 h-8 rounded-full" alt="User" /><span className="ml-2 font-medium text-sm">Bob</span><span className="ml-auto text-xs font-semibold text-gray-700">1120 pts</span></li>
                                    <li className="flex items-center bg-blue-50 p-2 rounded-lg border-2 border-blue-200"><span className="font-bold mr-3">🥉</span><img src="https://placehold.co/32x32/E2E8F0/4A5568?text=I" className="w-8 h-8 rounded-full" alt="User" /><span className="ml-2 font-medium text-sm">Idris (You)</span><span className="ml-auto text-xs font-semibold text-blue-600">980 pts</span></li>
                                    <li className="flex items-center"><span className="font-bold mr-3">4.</span><img src="https://placehold.co/32x32/E2E8F0/4A5568?text=C" className="w-8 h-8 rounded-full" alt="User" /><span className="ml-2 font-medium text-sm">Charlie</span><span className="ml-auto text-xs font-semibold text-gray-700">950 pts</span></li>
                                </ul>
                            </DashboardCard>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default StudentDashboard;

