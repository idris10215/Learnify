// frontend/src/pages/ModuleLibraryPage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import TeacherHeader from '../components/dashboard/TeacherHeader';
import Button from '../components/ui/Button';
import { PlusCircle, ChevronRight, BookOpen } from 'lucide-react';

const ModuleLibraryPage = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await api.get("/api/modules/getAllModules");
        setModules(response.data);
      } catch (error) {
        console.error("Error fetching modules:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchModules();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <TeacherHeader />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">My Modules Library</h1>
            <Link to="/create-module">
              <Button>
                <PlusCircle size={20} className="mr-2" />
                Create New Module
              </Button>
            </Link>
          </div>

          {loading ? (
            <p>Loading modules...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.length > 0 ? (
                modules.map(module => (
                  <Link 
                    to={`/teacher-modules/${module._id}`} 
                    key={module._id}
                    className="bg-white p-6 border-2 border-black rounded-2xl group hover:shadow-[8px_8px_0_0_#000] hover:-translate-x-2 hover:-translate-y-2 transition-all duration-200 flex flex-col"
                  >
                    <div className="flex-grow">
                      <div className="flex items-center mb-3">
                        <BookOpen size={20} className="text-blue-500 mr-3" />
                        <h2 className="text-xl font-bold text-gray-900 truncate">{module.title}</h2>
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-3">{module.description}</p>
                    </div>
                    <div className="flex justify-between items-center mt-6 text-xs text-gray-500">
                      <span>{module.sections.length} Sections</span>
                      <span>Updated {new Date(module.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </Link>
                ))
              ) : (
                <p>You haven't created any modules yet. Click "Create New Module" to get started.</p>
              )}
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default ModuleLibraryPage;