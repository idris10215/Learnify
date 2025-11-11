// frontend/src/pages/dashboards/StudentDashBoard.jsx
// --- NEW, DYNAMIC VERSION ---

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from 'aws-amplify/auth';
import api from '../../../services/api.js';

import  Navbar  from '../../components/Navbar.jsx'; 
import { BookText, User } from 'lucide-react';

const StudentDashboard = () => {
  const [user, setUser] = useState(null);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        // 1. Get the currently logged-in user from Amplify
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        
        // 2. Use the user's ID to fetch their specific classes from our backend
        const response = await api.get(`/api/classes/student/${currentUser.userId}`);
        setClasses(response.data);

      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudentData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-[#33A1E0]"><p className="text-white text-xl">Loading your dashboard...</p></div>;
  }

  return (
    // As requested, the main container has the blue background
    <div className="min-h-screen bg-[#33A1E0]">
      {/* We can use the main Navbar here, it will show the user is logged in */}
      <Navbar user={user} /> 

      <main className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome, {user?.username || 'Student'}!</h1>
          <p className="text-lg text-white/80 mb-8">Here are the classes you're enrolled in.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.length > 0 ? (
              classes.map(cls => (
                <div 
                  key={cls._id}
                  className="bg-white/90 backdrop-blur-sm p-6 border-2 border-white/50 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col"
                >
                  <div className="flex-grow">
                    <h2 className="text-2xl font-bold text-gray-900 truncate">{cls.className}</h2>
                    <div className="flex items-center mt-4 text-sm text-gray-600">
                      <User size={16} className="mr-2" />
                      <span>Taught by: {cls.teacherId?.username || 'N/A'}</span>
                    </div>
                    <div className="flex items-center mt-2 text-sm text-gray-600">
                      <BookText size={16} className="mr-2" />
                      <span>{cls.assignedModuleIds.length} Module(s)</span>
                    </div>
                  </div>
                  <div className="mt-6">
                      <Link to={`/student/class/${cls._id}`} className="w-full">
                        <button className="w-full bg-black text-white font-bold py-3 px-4 rounded-lg transition-transform duration-200 hover:scale-105">
                            View Class
                        </button>
                      </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white">You are not currently enrolled in any classes.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;