import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, User, Settings, LogOut, MessageSquare, X, Award, Book, CheckCircle, Clock } from 'lucide-react';

// --- Reusable UI Components specific to the Dashboard ---

const DashboardCard = ({ children, className = '' }) => (
    <div className={`bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-sm ${className}`}>
        {children}
    </div>
);

const ProgressBar = ({ percentage }) => (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
    </div>
);

// --- Main Student Dashboard Component ---

const StudentDashboard = () => {
    const [isProfileOpen, setIsProfileOpen] = React.useState(false);
    const [isChatOpen, setIsChatOpen] = React.useState(false);

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Top Navigation Bar */}
            <header className="bg-white sticky top-0 z-20 border-b-2 border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/">
                            <h1 className="text-3xl font-bold text-gray-800">
                              Learnify<span className="text-blue-500">.</span>
                            </h1>
                        </Link>
                        <h2 className="hidden md:block text-xl font-semibold text-gray-700">Student Dashboard</h2>
                        <div className="flex items-center space-x-4">
                            <button className="relative p-2 rounded-full hover:bg-gray-100">
                                <Bell size={24} />
                                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
                            </button>
                            <div className="relative">
                                <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="block h-10 w-10 rounded-full overflow-hidden border-2 border-gray-300">
                                    <img src="https://placehold.co/40x40/E2E8F0/4A5568?text=I" alt="Profile" />
                                </button>
                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border-2 border-gray-200 py-2">
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

            <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                {/* Welcome Section */}
                <div className="bg-blue-500 text-white p-6 rounded-2xl shadow-lg flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold">👋 Welcome back, Idris</h2>
                        <p className="mt-1 text-blue-100">Keep up the streak! You’re on Day 5 🔥</p>
                    </div>
                    <button className="bg-white text-blue-500 font-bold py-2 px-4 rounded-lg shadow hover:bg-gray-100 transition">
                        Continue Learning
                    </button>
                </div>

                {/* Dashboard Body (2-Column Layout) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* LEFT (Main Content Area) */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* My Courses */}
                        <DashboardCard>
                            <h3 className="text-2xl font-bold mb-4">📚 My Courses</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Course Card Example */}
                                <div className="border-2 border-gray-200 rounded-xl overflow-hidden">
                                    <img src="https://placehold.co/600x400/3B82F6/FFFFFF?text=Course" alt="Course Thumbnail" />
                                    <div className="p-4">
                                        <h4 className="font-bold text-lg">Introduction to React</h4>
                                        <p className="text-sm text-gray-500">by John Doe</p>
                                        <ProgressBar percentage={75} />
                                        <button className="w-full mt-4 bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition">Resume</button>
                                    </div>
                                </div>
                                {/* Add more course cards here */}
                            </div>
                        </DashboardCard>

                        {/* Quizzes & Assignments */}
                        <DashboardCard>
                            <h3 className="text-2xl font-bold mb-4">📝 Quizzes & Assignments</h3>
                            {/* You can add tabs here if needed */}
                            <ul className="space-y-4">
                                <li className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg">
                                    <div>
                                        <p className="font-semibold">React Hooks Quiz</p>
                                        <p className="text-sm text-red-500 flex items-center"><Clock size={14} className="mr-1" /> Ends in 2 days</p>
                                    </div>
                                    <button className="bg-gray-800 text-white font-bold py-1 px-3 rounded-lg text-sm">Start</button>
                                </li>
                                <li className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg bg-green-50">
                                    <div>
                                        <p className="font-semibold text-gray-500">State Management Test</p>
                                        <p className="text-sm text-green-600 flex items-center"><CheckCircle size={14} className="mr-1" /> Score: 92%</p>
                                    </div>
                                    <button className="bg-gray-200 text-gray-700 font-bold py-1 px-3 rounded-lg text-sm">Review</button>
                                </li>
                            </ul>
                        </DashboardCard>

                        {/* Achievements & Certificates */}
                        <DashboardCard>
                             <h3 className="text-2xl font-bold mb-4">🎯 Achievements</h3>
                             <div className="flex space-x-4">
                                <div className="text-center">
                                    <Award size={48} className="text-yellow-500 mx-auto" />
                                    <p className="text-sm mt-1">React Pro</p>
                                </div>
                                {/* Add more badges */}
                             </div>
                        </DashboardCard>
                    </div>

                    {/* RIGHT (Sidebar) */}
                    <div className="space-y-8">
                        {/* Progress & Analytics */}
                        <DashboardCard>
                            <h3 className="text-xl font-bold mb-4">📊 Progress & Analytics</h3>
                            {/* Circular Progress Chart Placeholder */}
                            <div className="flex justify-center items-center my-4">
                                <div className="relative w-32 h-32">
                                    <svg className="w-full h-full" viewBox="0 0 36 36">
                                        <path className="text-gray-200" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                        <path className="text-blue-500" strokeWidth="3" strokeDasharray="80, 100" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-2xl font-bold">80%</span>
                                        <span className="text-sm text-gray-500">Complete</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center font-semibold">🔥 5 days streak</div>
                        </DashboardCard>
                        
                        {/* Leaderboard */}
                        <DashboardCard>
                            <h3 className="text-xl font-bold mb-4">🏆 Leaderboard</h3>
                            <ul className="space-y-3">
                                <li className="flex items-center">
                                    <span className="font-bold mr-3">1.</span>
                                    <img src="https://placehold.co/32x32/E2E8F0/4A5568?text=A" className="w-8 h-8 rounded-full" alt="User" />
                                    <span className="ml-3 font-medium">Alice</span>
                                    <span className="ml-auto text-sm text-gray-500">1250 pts</span>
                                </li>
                                {/* Highlight current user */}
                                <li className="flex items-center bg-blue-50 p-2 rounded-lg">
                                    <span className="font-bold mr-3">3.</span>
                                    <img src="https://placehold.co/32x32/E2E8F0/4A5568?text=I" className="w-8 h-8 rounded-full" alt="User" />
                                    <span className="ml-3 font-medium">Idris (You)</span>
                                    <span className="ml-auto text-sm text-blue-600">980 pts</span>
                                </li>
                            </ul>
                        </DashboardCard>
                    </div>
                </div>
            </main>

            {/* AI Study Assistant */}
            <div className="fixed bottom-6 right-6 z-20">
                {!isChatOpen && (
                    <button onClick={() => setIsChatOpen(true)} className="bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 transition">
                        <MessageSquare size={28} />
                    </button>
                )}
                {isChatOpen && (
                    <div className="bg-white w-80 h-96 rounded-2xl shadow-2xl border-2 border-gray-200 flex flex-col">
                        <div className="p-4 border-b-2 border-gray-200 flex justify-between items-center">
                            <h4 className="font-bold">AI Study Assistant</h4>
                            <button onClick={() => setIsChatOpen(false)}><X size={20} /></button>
                        </div>
                        <div className="flex-grow p-4 text-sm text-gray-500">Chat messages would go here...</div>
                        <div className="p-2 border-t-2 border-gray-200">
                            <input type="text" placeholder="Ask me anything..." className="w-full p-2 border-2 border-gray-200 rounded-lg" />
                        </div>
                    </div>
                )}
            </div>

            {/* Simple Footer */}
            <footer className="max-w-7xl mx-auto p-4 text-center text-sm text-gray-500 border-t-2 border-gray-200 mt-8">
                <Link to="/faq" className="hover:underline">FAQs</Link> | <Link to="/support" className="hover:underline">Support</Link> | <Link to="/logout" className="hover:underline">Logout</Link>
                <p className="mt-2">&copy; {new Date().getFullYear()} Learnify. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default StudentDashboard;
