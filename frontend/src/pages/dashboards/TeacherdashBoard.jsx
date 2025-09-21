import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signOut } from 'aws-amplify/auth';
import { 
    Bell, User, Settings, LogOut, LayoutDashboard, BookCopy, Menu, PlusCircle, BarChart2, Award, Users as UsersIcon, Clock, Folder, CheckCircle
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

const StatCard = ({ title, value, change, icon }) => (
    <DashboardCard>
        <div className="flex items-start justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-2xl sm:text-3xl font-bold mt-1">{value}</p>
                {change && (
                    <p className={`text-xs mt-1 ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {change}
                    </p>
                )}
            </div>
            <div className="bg-gray-100 p-2 sm:p-3 rounded-lg border-2 border-black">
                {icon}
            </div>
        </div>
    </DashboardCard>
);

// --- Dashboard Layout ---

const TeacherSidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const [isHoverExpanded, setIsHoverExpanded] = useState(false);
    const isExpanded = isHoverExpanded;
    const location = useLocation();

    const navItems = [
        { icon: <LayoutDashboard size={20} />, name: 'Home', path: '/teacher-dashboard' },
        { icon: <BookCopy size={20} />, name: 'My Paths', path: '/teacher-paths' },
        { icon: <Folder size={20} />, name: 'My Classes', path: '/teacher-classes' },
        { icon: <BarChart2 size={20} />, name: 'Analytics', path: '/analytics' },
        { icon: <UsersIcon size={20} />, name: 'Students', path: '/students' },
    ];
    return (
        <>
            <div className={`fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsSidebarOpen(false)}></div>
            <aside 
                onMouseEnter={() => setIsHoverExpanded(true)}
                onMouseLeave={() => setIsHoverExpanded(false)}
                className={`fixed lg:relative top-0 left-0 h-full bg-white border-r-2 border-gray-200 z-40 transform transition-all duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'} lg:translate-x-0 ${isExpanded ? 'lg:w-64' : 'lg:w-24'} flex flex-col`}>
                <div className="p-4 flex items-center justify-between" style={{ minHeight: '68px' }}>
                    <h1 className={`text-3xl font-bold text-gray-800 transition-all duration-300 ease-in-out ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>Learnify<span className="text-blue-500">.</span></h1>
                </div>
                <div className={`px-4 transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}><p className="text-sm font-semibold text-gray-400">TEACHER PORTAL</p></div>
                <nav className="flex-1 px-4 mt-4">
                    <ul className="space-y-2">
                        {navItems.map(item => {
                            const isActive = location.pathname === item.path;
                            return (
                                <li key={item.name}>
                                    <Link to={item.path} className={`flex items-center px-4 py-3 rounded-lg transition-colors font-medium overflow-hidden ${!isExpanded && 'justify-center'} ${isActive ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}>
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
                <div className="p-4 border-t-2 border-gray-200">
                     <Link to="/settings" className={`flex items-center px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium overflow-hidden ${!isExpanded && 'justify-center'}`}>
                        <Settings size={20} />
                        <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'w-40 ml-3' : 'w-0 ml-0'}`}>
                            <span className="whitespace-nowrap">Settings</span>
                        </div>
                    </Link>
                </div>
            </aside>
        </>
    );
};

const TopHeader = ({ setIsSidebarOpen }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const navigate = useNavigate();
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

    return (
        <header className="bg-white sticky top-0 z-10 border-b-2 border-gray-200">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                     <div className="flex items-center">
                        <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden mr-4"><Menu size={28} /></button>
                        <div className="flex-1">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Welcome back, {teacherName}!</h2>
                            {/* This text is now hidden on small screens */}
                            <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">Here's what's happening today.</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <button className="relative p-2 rounded-full hover:bg-gray-100"><Bell size={24} /></button>
                        <div className="relative">
                            <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center space-x-2">
                                <img src={`https://placehold.co/40x40/E2E8F0/4A5568?text=${teacherName.charAt(0)}`} alt="Profile" className="h-10 w-10 rounded-full border-2 border-gray-300" />
                            </button>
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border-2 border-gray-200 py-2 z-20">
                                    <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><User size={16} className="mr-2" /> Profile</Link>
                                    <Link to="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><Settings size={16} className="mr-2" /> Settings</Link>
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


// --- Main Teacher Dashboard Component ---

const TeacherDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const recentActivities = [
        { text: 'Alice Chen completed the "Algebra Basics" quiz.', time: '2m ago', icon: <CheckCircle className="text-green-500" /> },
        { text: 'You published a new path: "Intro to Physics".', time: '1h ago', icon: <BookCopy className="text-blue-500" /> },
        { text: '3 new students joined "Math 9A".', time: '5h ago', icon: <UsersIcon className="text-purple-500" /> },
    ];
    
    const classes = [
        { name: 'Physics 101 - Period 2', students: 32, progress: 78, score: 91 },
        { name: 'Chemistry 9A - Fall 2025', students: 28, progress: 65, score: 85 },
        { name: 'World History - Section B', students: 25, progress: 45, score: 79 },
    ];

    return (
        <div className="bg-gray-50 min-h-screen flex">
            <TeacherSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <div className="flex-1 flex flex-col h-screen">
                <TopHeader setIsSidebarOpen={setIsSidebarOpen} />
                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                    <div className="space-y-8">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            <StatCard title="Total Students" value="143" icon={<UsersIcon size={24} className="text-blue-500" />} />
                            <StatCard title="Active Paths" value="8" icon={<BookCopy size={24} className="text-green-500"/>} />
                            <StatCard title="Total Classes" value="5" icon={<Folder size={24} className="text-orange-500"/>} />
                            <StatCard title="Avg. Completion" value="82%" icon={<Award size={24} className="text-yellow-500"/>} />
                        </div>

                        {/* Prominent Create Path CTA */}
                        <Link to="/create-path" className="block relative group">
                            <div className="absolute inset-0 bg-black rounded-2xl transform translate-x-1 translate-y-1 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform duration-200"></div>
                            <div className="relative bg-blue-500 text-white p-6 border-2 border-black rounded-2xl flex flex-col sm:flex-row items-center justify-between hover:bg-blue-600 transition-colors">
                                <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-0 text-center sm:text-left">Ready to build a new learning experience?</h3>
                                <button className="bg-white text-blue-500 font-bold py-2 px-4 rounded-lg flex items-center shrink-0">
                                    <PlusCircle size={20} className="mr-2" />
                                    Create New Path
                                </button>
                            </div>
                        </Link>
                        
                        {/* Class Overview */}
                        <DashboardCard>
                            <h3 className="text-xl font-bold mb-4">Class Overview</h3>
                            <div className="space-y-4">
                                {classes.map(cls => (
                                    <div key={cls.name} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                                        <p className="font-bold mb-2 sm:mb-0">{cls.name}</p>
                                        <div className="grid grid-cols-3 sm:flex sm:items-center gap-4 text-center text-sm w-full sm:w-auto justify-around sm:justify-end">
                                            <div>
                                                <p className="font-bold">{cls.students}</p>
                                                <p className="text-xs text-gray-500">Students</p>
                                            </div>
                                            <div>
                                                <p className="font-bold">{cls.progress}%</p>
                                                <p className="text-xs text-gray-500">Progress</p>
                                            </div>
                                             <div>
                                                <p className="font-bold">{cls.score}%</p>
                                                <p className="text-xs text-gray-500">Avg. Score</p>
                                            </div>
                                        </div>
                                        <Link to={`/teacher-classes/${cls.name.replace(/\s+/g, '-').toLowerCase()}`} className="mt-4 sm:mt-0 sm:ml-4 shrink-0">
                                            <button className="bg-gray-200 text-gray-800 text-sm font-semibold py-1 px-3 rounded-md border border-black w-full sm:w-auto">View Details</button>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </DashboardCard>

                        {/* Recent Activity */}
                        <DashboardCard>
                            <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
                            <ul className="space-y-4">
                                {recentActivities.map((activity, index) => (
                                    <li key={index} className="flex items-start">
                                        <div className="bg-gray-100 p-2 rounded-full mr-3 mt-1 shrink-0">
                                            {activity.icon}
                                        </div>
                                        <div>
                                            <p className="text-sm">{activity.text}</p>
                                            <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </DashboardCard>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default TeacherDashboard;

