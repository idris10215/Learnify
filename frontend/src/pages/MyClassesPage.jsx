// frontend/src/pages/MyClassesPage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import TeacherHeader from '../components/dashboard/TeacherHeader';
import Button from '../components/ui/Button';
import { Users, BookOpen } from 'lucide-react';

const MyClassesPage = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        // We call our backend endpoint to get the list of all classes.
        const response = await api.get("/api/classes");
        console.log('Frontend received this raw data from backend:', response.data);
        setClasses(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  return (
    <div className="bg-[#33A1E0] min-h-screen flex flex-col">
      <TeacherHeader />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">My Classes</h1>
            {/* Later, we can add a "Create New Class" button here for Admins */}
          </div>

          {loading ? (
            <p>Loading classes...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classes.length > 0 ? (
                classes.map(cls => (
                  <div 
                    key={cls._id}
                    className="bg-white p-6 border-2 border-black rounded-2xl group flex flex-col"
                  >
                    <div className="flex-grow">
                      <h2 className="text-xl font-bold text-gray-900 truncate">{cls.className}</h2>
                      <div className="flex items-center mt-4 text-sm text-gray-600">
                        <Users size={16} className="mr-2" />
                        <span>{cls.studentIds.length} Student(s)</span>
                      </div>
                      <div className="flex items-center mt-2 text-sm text-gray-600">
                        <BookOpen size={16} className="mr-2" />
                        <span>{cls.assignedModuleIds.length} Module(s) Assigned</span>
                      </div>
                    </div>
                    <div className="mt-6">
                        <Link to={`/teacher-classes/${cls._id}`}>
                            <Button className="w-full">Manage Class</Button>
                        </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p>You have not been assigned to any classes yet.</p>
              )}
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default MyClassesPage;