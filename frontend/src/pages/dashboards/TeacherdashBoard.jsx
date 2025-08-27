import React from 'react';
import { Link } from 'react-router-dom';

const TeacherDashboard = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* You can create a dedicated TeacherNavbar component later */}
            <header className="bg-white sticky top-0 z-20 border-b-2 border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/">
                            <h1 className="text-3xl font-bold text-gray-800">
                              Learnify<span className="text-blue-500">.</span>
                            </h1>
                        </Link>
                        <h2 className="hidden md:block text-xl font-semibold text-gray-700">Teacher Dashboard</h2>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="bg-white p-8 rounded-2xl border-2 border-gray-200 shadow-sm text-center">
                    <h2 className="text-3xl font-bold">Welcome, Teacher!</h2>
                    <p className="mt-4 text-lg text-gray-600">This is where you will manage your courses, view student progress, and create learning paths.</p>
                </div>
            </main>
        </div>
    );
};

export default TeacherDashboard;
