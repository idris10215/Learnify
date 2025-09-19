import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
    Bell, User, Settings, LogOut, LayoutDashboard, BookCopy, Menu, PlusCircle, BarChart2, Award, Users, TrendingUp, TrendingDown, Clock, Upload, Eye
} from 'lucide-react';

// --- Reusable UI Components ---

const DashboardCard = ({ children, className = '' }) => (
    <div className="relative h-full">
      <div className="absolute inset-0 bg-black rounded-2xl transform translate-x-1 translate-y-1"></div>
      <div className={`relative bg-white p-6 border-2 border-black rounded-2xl h-full flex flex-col ${className}`}>
          {children}
      </div>
    </div>
);

const StatCard = ({ title, value, change, icon }) => (
    <DashboardCard>
        <div className="flex items-start justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-3xl font-bold mt-1">{value}</p>
                {change && (
                    <p className={`text-xs mt-1 ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {change}
                    </p>
                )}
            </div>
            <div className="bg-gray-100 p-3 rounded-lg border-2 border-black">
                {icon}
            </div>
        </div>
    </DashboardCard>
);

const QuickActionButton = ({ text, icon }) => (
     <div className="relative group cursor-pointer h-full">
        <div className="absolute inset-0 bg-black rounded-2xl transform translate-x-1 translate-y-1 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform duration-200"></div>
        <button className="relative bg-white w-full h-full p-6 border-2 border-black rounded-2xl flex flex-col items-center justify-center text-center font-semibold group-hover:bg-gray-50 transition-colors">
            {icon}
            <span className="mt-2 text-sm">{text}</span>
        </button>
    </div>
);


// --- Dashboard Layout ---

const TeacherSidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const [isHoverExpanded, setIsHoverExpanded] = useState(false);
    const isExpanded = isHoverExpanded;
    const location = useLocation();

    const navItems = [
        { icon: <LayoutDashboard size={20} />, name: 'Home', path: '/teacher-dashboard' },
        { icon: <BookCopy size={20} />, name: 'My Paths', path: '/teacher-paths' },
        { icon: <PlusCircle size={20} />, name: 'Create Path', path: '/create-path' },
        { icon: <BarChart2 size={20} />, name: 'Analytics', path: '/analytics' },
        { icon: <Users size={20} />, name: 'Students', path: '/students' },
        { icon: <Award size={20} />, name: 'Badges', path: '/badges' },
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
                <div className={`p-4 transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}><p className="text-sm font-semibold text-gray-400">TEACHER PORTAL</p></div>
                <nav className="flex-1 px-4">
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
                    <Link to="/logout" className={`flex items-center px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium overflow-hidden ${!isExpanded && 'justify-center'}`}>
                        <LogOut size={20} />
                         <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'w-40 ml-3' : 'w-0 ml-0'}`}>
                            <span className="whitespace-nowrap">Logout</span>
                        </div>
                    </Link>
                </div>
            </aside>
        </>
    );
};

const TopHeader = ({ setIsSidebarOpen }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    return (
        <header className="bg-white sticky top-0 z-10 border-b-2 border-gray-200">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                     <div className="flex items-center">
                        <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden mr-4"><Menu size={28} /></button>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-gray-800">Welcome back, Sarah!</h2>
                            <p className="text-sm text-gray-500">Here's what's happening with your learning paths today.</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="relative p-2 rounded-full hover:bg-gray-100"><Bell size={24} /></button>
                        <div className="relative">
                            <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center space-x-2">
                                <img src="https://placehold.co/40x40/E2E8F0/4A5568?text=S" alt="Profile" className="h-10 w-10 rounded-full border-2 border-gray-300" />
                            </button>
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border-2 border-gray-200 py-2 z-20">
                                    <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><User size={16} className="mr-2" /> Profile</Link>
                                    <Link to="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><Settings size={16} className="mr-2" /> Settings</Link>
                                    <Link to="/logout" className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"><LogOut size={16} className="mr-2" /> Logout</Link>
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

    const studentPerformance = [
        { name: 'Alice Chen', class: 'Math 9A', score: 95, topics: 12, time: 45, badges: 8, trend: <TrendingUp className="text-green-500" />, active: '2 hours ago' },
        { name: 'Mark Wilson', class: 'Math 9A', score: 88, topics: 10, time: 38, badges: 6, trend: <TrendingUp className="text-green-500" />, active: '1 day ago' },
        { name: 'Emma Davis', class: 'Physics 10B', score: 92, topics: 15, time: 52, badges: 10, trend: <TrendingUp className="text-green-500" />, active: '3 hours ago' },
        { name: 'James Brown', class: 'Math 9A', score: 76, topics: 8, time: 25, badges: 4, trend: <TrendingDown className="text-red-500" />, active: '5 hours ago' },
    ];

    return (
        <div className="bg-gray-50 min-h-screen flex">
            <TeacherSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <div className="flex-1 flex flex-col h-screen">
                <TopHeader setIsSidebarOpen={setIsSidebarOpen} />
                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                    <div className="space-y-8">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard title="Total Students" value="143" change="+12 this month" icon={<Users size={24} className="text-blue-500" />} />
                            <StatCard title="Active Paths" value="8" change="3 recently updated" icon={<BookCopy size={24} className="text-green-500"/>} />
                            <StatCard title="Avg. Completion" value="82%" change="+5% from last week" icon={<Award size={24} className="text-yellow-500"/>} />
                            <StatCard title="Time Spent" value="24h" change="This week" icon={<Clock size={24} className="text-purple-500"/>} />
                        </div>

                        {/* Quick Actions */}
                        <div>
                            <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                <QuickActionButton text="Create Path" icon={<PlusCircle size={32} className="text-blue-500" />} />
                                <QuickActionButton text="Upload Resource" icon={<Upload size={32} />} />
                                <QuickActionButton text="Preview Quizzes" icon={<Eye size={32} />} />
                                <QuickActionButton text="Manage Badges" icon={<Award size={32} />} />
                            </div>
                        </div>

                        {/* Student Performance Overview */}
                        <DashboardCard>
                            <h3 className="text-xl font-bold mb-4">Student Performance Overview</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3">Student Name</th>
                                            <th className="px-6 py-3">Avg Quiz Score</th>
                                            <th className="px-6 py-3">Topics Completed</th>
                                            <th className="px-6 py-3">Time Spent (hrs)</th>
                                            <th className="px-6 py-3">Badges Earned</th>
                                            <th className="px-6 py-3">Trend</th>
                                            <th className="px-6 py-3">Last Active</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {studentPerformance.map(student => (
                                            <tr key={student.name} className="bg-white border-b">
                                                <td className="px-6 py-4 font-medium">{student.name} <span className="text-xs text-gray-400 block">{student.class}</span></td>
                                                <td className={`px-6 py-4 font-semibold ${student.score > 80 ? 'text-green-600' : 'text-red-600'}`}>{student.score}%</td>
                                                <td className="px-6 py-4">{student.topics}</td>
                                                <td className="px-6 py-4">{student.time}</td>
                                                <td className="px-6 py-4">{student.badges}</td>
                                                <td className="px-6 py-4">{student.trend}</td>
                                                <td className="px-6 py-4">{student.active}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </DashboardCard>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default TeacherDashboard;

