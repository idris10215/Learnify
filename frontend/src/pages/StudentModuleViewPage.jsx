// frontend/src/pages/StudentModuleViewPage.jsx
// --- UPGRADED WITH PROGRESS TRACKING ---

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUrl } from "aws-amplify/storage";
import api from "../../services/api";

import StudentHeader from "../components/dashboard/StudentHeader";
import Button from "../components/ui/Button";
import { Download, CheckSquare, Check, ChevronLeft } from "lucide-react";
import { getCurrentUser } from "aws-amplify/auth";

const StudentModuleViewPage = () => {
  const navigate = useNavigate();

  const { moduleId, classId } = useParams();
  const [user, setUser] = useState(null);
  const [module, setModule] = useState(null);
  const [progress, setProgress] = useState(null); // State to hold completion data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllData = async () => {
      if (!moduleId || !classId) {
        setError("Missing module or class information.");
        setLoading(false);
        return;
      }
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);

        // Fetch both module data and progress data at the same time
        const [moduleResponse, progressResponse] = await Promise.all([
          api.get(`/api/modules/${moduleId}`),
          // We need a new backend endpoint for this, which we'll add next
          api.get(`/api/progress/${currentUser.userId}/${moduleId}/${classId}`),
        ]);

        const moduleData = moduleResponse.data;
        setProgress(progressResponse.data);

        const sectionsWithUrls = await Promise.all(
          moduleData.sections.map(async (section) => {
            const getUrlResult = await getUrl({ path: section.contentUrl });
            return { ...section, downloadUrl: getUrlResult.url.toString() };
          })
        );

        moduleData.sections = sectionsWithUrls;
        setModule(moduleData);
      } catch (err) {
        // If progress isn't found, it's not an error, it just means the student hasn't started yet.
        if (err.response && err.response.status === 404) {
          // Handle case where progress doesn't exist yet, but module does
          try {
            const moduleResponse = await api.get(`/api/modules/${moduleId}`);
            const moduleData = moduleResponse.data;
            const sectionsWithUrls = await Promise.all(
              moduleData.sections.map(async (section) => {
                const getUrlResult = await getUrl({ path: section.contentUrl });
                return { ...section, downloadUrl: getUrlResult.url.toString() };
              })
            );
            moduleData.sections = sectionsWithUrls;
            setModule(moduleData);
            setProgress({ completedSections: [] }); // Set empty progress
          } catch (moduleErr) {
            console.error("Error fetching module data:", moduleErr);
            setError("Failed to load module content.");
          }
        } else {
          console.error("Error fetching data:", err);
          setError("Failed to load module content.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [moduleId, classId]);

  const handleMarkAsComplete = async (sectionId) => {
    try {
      const response = await api.post("/api/progress/mark-complete", {
        studentId: user.userId,
        moduleId,
        classId,
        sectionId,
      });
      // Update the local progress state to re-render the button instantly
      setProgress(response.data);
    } catch (error) {
      console.error("Error marking section as complete:", error);
      alert("Could not update progress.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#33A1E0]">
        <p className="text-white text-xl">Loading Module...</p>
      </div>
    );
  }
  if (error || !module) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#33A1E0]">
        <p className="text-white text-xl">{error}</p>
      </div>
    );
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
            <ChevronLeft size={28} />
            Back
          </button>
          {/* --- END NEW: Go Back Button --- */}
          <div className="bg-white/90 backdrop-blur-sm p-8 border-2 border-white/50 rounded-2xl shadow-lg">
            <h1 className="text-3xl font-bold text-gray-900">{module.title}</h1>
            <p className="text-gray-600 mt-2 mb-6">{module.description}</p>

            <h2 className="text-xl font-bold text-gray-800 mb-4">Sections</h2>
            <div className="space-y-4">
              {module.sections.map((section) => {
                const isCompleted = progress?.completedSections?.includes(
                  section._id
                );
                return (
                  <div
                    key={section._id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white rounded-lg border-2 border-gray-200"
                  >
                    <p className="font-semibold text-gray-800 mb-2 sm:mb-0">
                      {section.title}
                    </p>
                    <div className="flex space-x-2">
                      <a
                        href={section.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="!py-2 !px-4 text-sm">
                          <Download size={16} className="md:mr-2" />
                          <span className="hidden md:inline">View Content</span>
                        </Button>
                      </a>
                      <Button
                        onClick={() => handleMarkAsComplete(section._id)}
                        disabled={isCompleted}
                        className={`!py-2 !px-4 text-sm text-white ${
                          isCompleted
                            ? "!bg-gray-400 !border-gray-500 cursor-not-allowed"
                            : "!bg-green-500 !border-green-600"
                        }`}
                      >
                        {isCompleted ? (
                          <Check size={16} className="md:mr-2" />
                        ) : (
                          <CheckSquare size={16} className="md:mr-2" />
                        )}
                        <span className="hidden md:inline">
                          {isCompleted ? "Completed" : "Mark as Complete"}
                        </span>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentModuleViewPage;
