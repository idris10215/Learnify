// frontend/src/pages/ClassManagementPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';
import TeacherHeader from '../components/dashboard/TeacherHeader';
import Button from '../components/ui/Button';
import { Users, BookOpen } from 'lucide-react';

const ClassManagementPage = () => {
  const { classId } = useParams(); // Get the class ID from the URL
  const [cls, setCls] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [allModules, setAllModules] = useState([]);
  const [selectedModuleId, setSelectedModuleId] = useState('');

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        // We now make two API calls when the page loads
        // Call 1: Get the details for this specific class
        const classResponse = await api.get(`/api/classes/${classId}`);
        setCls(classResponse.data);

        // Call 2: Get a list of ALL modules available to assign
        const modulesResponse = await api.get('/api/modules/getAllModules');
        setAllModules(modulesResponse.data);
      } catch (err) {
        console.error("Error fetching class details:", err);
        setError("Failed to load class details.");
      } finally {
        setLoading(false);
      }
    };
    fetchClassDetails();
  }, [classId]);

  const handleAssignModule = async () => {
    if (!selectedModuleId) {
      alert('Please select a module to assign.');
      return;
    }
    try {
      // We call our new backend endpoint to update the class
      const response = await api.put(`/api/classes/${classId}/assign-module`, { 
        moduleId: selectedModuleId 
      });
      // On success, we update our local state with the fresh data from the backend
      setCls(response.data);
      setSelectedModuleId(''); // Reset the dropdown
    } catch (error) {
      console.error('Error assigning module:', error);
      alert('Failed to assign the module.');
    }
  };

  if (loading) {
    return <div className="text-center p-8">Loading Class Details...</div>;
  }

  if (error || !cls) {
    return <div className="text-center p-8 text-red-500">{error || "Class not found."}</div>;
  }

  return (
    <div className="bg-[#33A1E0] min-h-screen flex flex-col">
      <TeacherHeader />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">{cls.className}</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Student Roster Card */}
            <div className="lg:col-span-1 bg-white p-6 border-2 border-black rounded-2xl">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Users size={20} className="mr-3 text-blue-500"/>
                Student Roster ({cls.studentIds.length})
              </h2>
              <ul className="space-y-3">
                {cls.studentIds.map(student => (
                  <li key={student._id} className="p-3 bg-gray-50 rounded-lg">
                    {student.username}
                  </li>
                ))}
              </ul>
            </div>

            {/* Assigned Modules Card */}
            <div className="lg:col-span-2 bg-white p-6 border-2 border-black rounded-2xl">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <BookOpen size={20} className="mr-3 text-green-500"/>
                Assigned Modules ({cls.assignedModuleIds.length})
              </h2>
              <div className="space-y-3">
                {cls.assignedModuleIds.length > 0 ? cls.assignedModuleIds.map(module => (
                  <div key={module._id} className="p-3 bg-gray-50 rounded-lg">
                    {module.title}
                  </div>
                )) : (
                  <p className="text-gray-500">No modules have been assigned to this class yet.</p>
                )}
              </div>
              <div className="mt-6 pt-6 border-t-2 border-gray-200">
                <h3 className="text-lg font-bold mb-3">Assign a New Module</h3>
                <div className="flex flex-col sm:flex-row gap-2">
                  <select
                    value={selectedModuleId}
                    onChange={(e) => setSelectedModuleId(e.target.value)}
                    className="flex-grow block w-full px-4 py-3 border-2 border-black rounded-md bg-white"
                  >
                    <option value="">-- Select a module --</option>
                    {allModules.map(module => (
                      <option key={module._id} value={module._id}>
                        {module.title}
                      </option>
                    ))}
                  </select>
                  <Button onClick={handleAssignModule} className="w-full sm:w-auto">
                    Assign Module
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default ClassManagementPage;