import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import api from '../../services/api';
import TeacherHeader from '../components/dashboard/TeacherHeader';
import { getCurrentUser } from '@aws-amplify/auth';
import { Users, BookOpen } from 'lucide-react';

const AnalyticsPage = () => {
  const [teacherClasses, setTeacherClasses] = useState([]);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoadingClasses(true);
      setError('');
      try {
        const currentUser = await getCurrentUser();
        const currentTeacherId = currentUser.userId;
        if (currentTeacherId) {
          const response = await api.get(`/api/classes/teacher/${currentTeacherId}`);
          setTeacherClasses(response.data);
        } else {
             setError("Could not verify teacher ID.");
        }
      } catch (err) {
        console.error("Error fetching initial data:", err);
        setError("Could not load classes.");
      } finally {
        setLoadingClasses(false);
      }
    };
    fetchInitialData();
  }, []);

  // Handle navigation when a card is clicked
  const handleClassSelect = (classId) => {
    navigate(`/analytics/${classId}`); // Navigate to the new dedicated report page URL
  };

  return (
    <div className="bg-[#33A1E0] min-h-screen flex flex-col">
      <TeacherHeader />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Class Analytics</h1>

          {/* --- CARD-BASED SELECTION (Now uses handleClassSelect for navigation) --- */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">Select a Class to View Report:</h2>
            {loadingClasses ? (
              <p>Loading classes...</p>
            ) : error ? (
               <p className="text-red-500">{error}</p>
            ) : teacherClasses.length === 0 ? (
               <p className="text-gray-500">You are not assigned to any classes yet.</p>
            ) : (
              <div className="flex space-x-4 overflow-x-auto p-5">
                {teacherClasses.map(cls => (
                  <button
                    key={cls._id}
                    onClick={() => handleClassSelect(cls._id)} // Use the navigation handler
                    className={`flex-shrink-0 w-64 p-4 border-2 rounded-xl transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-white border-black hover:shadow-[4px_4px_0_0_#000] hover:-translate-x-1 hover:-translate-y-1`}
                  >
                    <h3 className={`font-bold truncate mb-2 text-gray-900`}>{cls.className}</h3>
                    <div className={`flex items-center text-xs text-gray-500`}>
                      <Users size={14} className="mr-1.5" />
                      <span>{cls.studentIds.length} Student(s)</span>
                    </div>
                     <div className={`flex items-center text-xs mt-1 text-gray-500`}>
                      <BookOpen size={14} className="mr-1.5" />
                      <span>{cls.assignedModuleIds.length} Module(s)</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
           {/* --- The Report Table is REMOVED --- */}
        </div>
      </main>
    </div>
  );
};

export default AnalyticsPage;