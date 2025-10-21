// frontend/src/pages/StudentModuleViewPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getUrl } from 'aws-amplify/storage';
import api from '../../services/api';

import  Navbar  from '../components/Navbar';
import Button from '../components/ui/Button';
import { Download, CheckSquare } from 'lucide-react';
import { getCurrentUser } from 'aws-amplify/auth';

const StudentModuleViewPage = () => {
  const { moduleId } = useParams();
  const [user, setUser] = useState(null);
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchModuleData = async () => {
      if (!moduleId) return;
      try {
        // First, get the current user for the navbar
        const currentUser = await getCurrentUser();
        setUser(currentUser);

        // Fetch the module's data (title, desc, sections) from our backend
        const response = await api.get(`/api/modules/${moduleId}`);
        const moduleData = response.data;

        // For each section, generate a secure, temporary download URL for its file
        const sectionsWithUrls = await Promise.all(
          moduleData.sections.map(async (section) => {
            const getUrlResult = await getUrl({ path: section.contentUrl });
            return { ...section, downloadUrl: getUrlResult.url.toString() };
          })
        );
        
        moduleData.sections = sectionsWithUrls;
        setModule(moduleData);

      } catch (err) {
        console.error("Error fetching module data:", err);
        setError("Failed to load module content.");
      } finally {
        setLoading(false);
      }
    };

    fetchModuleData();
  }, [moduleId]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-[#33A1E0]"><p className="text-white text-xl">Loading Module...</p></div>;
  }

  if (error || !module) {
    return <div className="flex items-center justify-center h-screen bg-[#33A1E0]"><p className="text-white text-xl">{error}</p></div>;
  }

  return (
    <div className="min-h-screen bg-[#33A1E0]">
      <Navbar user={user} />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          
          <div className="bg-white/90 backdrop-blur-sm p-8 border-2 border-white/50 rounded-2xl shadow-lg">
            <h1 className="text-3xl font-bold text-gray-900">{module.title}</h1>
            <p className="text-gray-600 mt-2 mb-6">{module.description}</p>
            
            <h2 className="text-xl font-bold text-gray-800 mb-4">Sections</h2>
            <div className="space-y-4">
              {module.sections.map(section => (
                <div key={section._id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white rounded-lg border-2 border-gray-200">
                  <p className="font-semibold text-gray-800 mb-2 sm:mb-0">{section.title}</p>
                  <div className="flex space-x-2">
                    <a href={section.downloadUrl} target="_blank" rel="noopener noreferrer">
                      <Button className="!py-2 !px-4 text-sm">
                        <Download size={16} className="md:mr-2"/>
                        <span className="hidden md:inline">View Content</span>
                      </Button>
                    </a>
                    {/* We will wire this button up in our next step */}
                    <Button className="!py-2 !px-4 text-sm !bg-green-500 !border-green-600 text-white">
                      <CheckSquare size={16} className="md:mr-2"/>
                      <span className="hidden md:inline">Mark as Complete</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default StudentModuleViewPage;