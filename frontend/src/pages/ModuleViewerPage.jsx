// frontend/src/pages/ModuleViewerPage.jsx
// --- FINAL, CORRECTED VERSION WITH getUrl ---

import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
// 1. We import 'getUrl' from the correct path, NOT 'Storage'
import { getUrl } from "aws-amplify/storage";
import api from "../../services/api";

import TeacherHeader from "../components/dashboard/TeacherHeader";
import Button from "../components/ui/Button";
import { Download, Edit, Trash2 } from "lucide-react";

const ModuleViewerPage = () => {
  const { moduleId } = useParams();
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchModule = async () => {
      try {
        const response = await api.get(`/api/modules/${moduleId}`);
        const moduleData = response.data;

        // 2. We now use the correct getUrl function for each section
        const sectionsWithUrls = await Promise.all(
          moduleData.sections.map(async (section) => {
            // The 'contentUrl' from our database is the S3 'path'
            const getUrlResult = await getUrl({ path: section.contentUrl });

            // 3. The downloadable URL is inside the '.url' property of the result
            return { ...section, downloadUrl: getUrlResult.url.toString() };
          })
        );

        moduleData.sections = sectionsWithUrls;
        setModule(moduleData);
      } catch (err) {
        console.error("Error fetching module:", err);
        setError("Failed to load module.");
      } finally {
        setLoading(false);
      }
    };

    if (moduleId) {
      fetchModule();
    }
  }, [moduleId]);

  if (loading) {
    return <div className="text-center p-8">Loading module...</div>;
  }

  if (error || !module) {
    return (
      <div className="text-center p-8 text-red-500">
        {error || "Module not found."}
      </div>
    );
  }

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this module?")) {
      try {
        await api.delete(`/api/modules/${moduleId}`);
        alert("Module deleted successfully.");
        navigate("/teacher-modules");
      } catch (err) {
        console.error("Error deleting module:", err);
        alert("Failed to delete module.");
      }
    }
  };

  return (
    <div className="bg-[#33A1E0] min-h-screen flex flex-col">
      <TeacherHeader />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {module.title}
              </h1>
              <p className="text-gray-600 mt-1">{module.description}</p>
            </div>
            <div className="flex space-x-2">
              <Link to={`/teacher-modules/${moduleId}/edit`}>
                <Button className="!bg-yellow-400 !border-yellow-500">
                  <Edit size={16} className="md:mr-2" />{" "}
                  <span className="hidden md:inline">Edit</span>
                </Button>
              </Link>

              <Button
                className="!bg-red-500 !border-red-600 text-white"
                onClick={handleDelete}
              >
                <Trash2 size={16} className="md:mr-2" />{" "}
                <span className="hidden md:inline">Delete</span>
              </Button>
            </div>
          </div>

          <div className="bg-white p-6 border-2 border-black rounded-2xl">
            <h2 className="text-xl font-bold mb-4">
              Sections ({module.sections.length})
            </h2>
            <div className="space-y-3">
              {module.sections.map((section) => (
                <div
                  key={section._id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200"
                >
                  <p className="font-semibold">{section.title}</p>
                  {/* The 'href' now points to the secure, temporary URL from getUrlResult.url */}
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ModuleViewerPage;
