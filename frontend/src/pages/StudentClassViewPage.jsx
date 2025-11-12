import React, { useState, useEffect } from 'react'; // We only need basic React hooks
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import StudentHeader from '../components/dashboard/StudentHeader';
import { Book, ChevronRight, ChevronLeft } from 'lucide-react';
import { getCurrentUser } from 'aws-amplify/auth';

const StudentClassViewPage = () => {
  const { classId } = useParams();
  const navigate = useNavigate();
  
  // We use useState for all our state management
  const [user, setUser] = useState(null);
  const [cls, setCls] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // We use useEffect to fetch all our data
  useEffect(() => {
    const fetchAllData = async () => {
      if (!classId) return;
      try {
        // Fetch the current user for the navbar
        const currentUser = await getCurrentUser();
        setUser(currentUser);

        // Fetch the class details from our backend
        const response = await api.get(`/api/classes/${classId}`);
        setCls(response.data);

      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Could not load class details.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, [classId]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-[#33A1E0]"><p className="text-white text-xl">Loading Class...</p></div>;
  }

  if (error || !cls) {
    return <div className="flex items-center justify-center h-screen bg-[#33A1E0]"><p className="text-white text-xl">{error}</p></div>;
  }

  return (
    <div className="min-h-screen bg-[#33A1E0]">
      <StudentHeader user={user} />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {/* --- NEW: Go Back Button --- */}
            <button
              onClick={() => navigate(-1)} // This goes back one step in history
              className="flex items-center justify-center text-white/80 hover:text-white mb-6 transition-colors  duration-200 cursor-pointer text-[20px]"
            >
            <ChevronLeft size={28}  />
            Back 
           </button>
          {/* --- END NEW: Go Back Button --- */}
          <h1 className="text-4xl font-bold text-white mb-2">{cls.className}</h1>
          <p className="text-lg text-white/80 mb-8">Modules assigned to this class.</p>
          <div className="bg-white/90 backdrop-blur-sm p-6 border-2 border-white/50 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Syllabus</h2>
            <div className="space-y-3">
              {cls.assignedModuleIds && cls.assignedModuleIds.length > 0 ? (
                cls.assignedModuleIds.map(module => (
                  <Link
                    to={`/student/class/${cls._id}/module/${module._id}`}
                    key={module._id}
                    className="flex items-center justify-between p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-lg mr-4">
                            <Book size={20} className="text-blue-600" />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-800">{module.title}</p>
                            <p className="text-sm text-gray-500">{module.description}</p>
                        </div>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                  </Link>
                ))
              ) : (
                <p className="text-gray-500">The teacher has not assigned any modules to this class yet.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentClassViewPage;