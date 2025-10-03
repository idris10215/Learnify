// frontend/src/pages/AddSectionsPage.jsx
// --- FINAL, DEFINITIVE, CORRECTED VERSION ---

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { uploadData, getUrl } from "aws-amplify/storage";
import api from "../../services/api";

import TeacherHeader from "../components/dashboard/TeacherHeader";
import Button from "../components/ui/Button";
import { CheckCircle } from "lucide-react";

const AddSectionsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleDescription, setModuleDescription] = useState("");
  const [sections, setSections] = useState([]);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (location.state?.title && location.state?.description) {
      setModuleTitle(location.state.title);
      setModuleDescription(location.state.description);
    } else {
      navigate("/create-module");
    }
  }, [location.state, navigate]);

  const handleAddSection = async (e) => {
    e.preventDefault();
    if (!newSectionTitle || !selectedFile) {
      alert("Please provide a section title and select a file.");
      return;
    }
    setIsUploading(true);
    setError("");

    try {
      // --- THIS IS THE CORRECT IMPLEMENTATION ---
      // 1. We define the 'path' as a function. Amplify will call this
      //    function and pass in the user's unique identityId.
      const uploadTask = uploadData({
        path: ({ identityId }) =>
          `protected/${identityId}/${Date.now()}-${selectedFile.name}`,
        data: selectedFile,
        options: {
          contentType: selectedFile.type,
        },
      });

      // 2. We await the result of the upload task.
      const result = await uploadTask.result;

      // 3. The 'result.path' now contains the full, correct S3 key,
      //    including the protected/{identityId}/ prefix.
      const uploadedPath = result.path;

      // 4. To get a downloadable URL, we use the getUrl function with the path.
      const urlResult = await getUrl({ path: uploadedPath });
      const contentUrl = urlResult.url.href;

      const getContentType = (file) => {
        if (file.type.includes("pdf")) return "PDF";
        if (file.type.includes("presentation")) return "PPT";
        if (file.type.includes("document")) return "WORD";
        return "UNKNOWN";
      };

      const newSection = {
        title: newSectionTitle,
        order: sections.length + 1,
        contentType: getContentType(selectedFile),
        contentUrl: contentUrl,
      };

      setSections((prevSections) => [...prevSections, newSection]);

      setNewSectionTitle("");
      setSelectedFile(null);
      e.target.reset();
    } catch (err) {
      console.error("Error uploading file:", err);
      setError("File upload failed. Please try again.");
      alert("File upload failed. Please check the console for details.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveModule = async () => {
    setIsSaving(true);
    setError("");
    const moduleData = {
      title: moduleTitle,
      description: moduleDescription,
      sections: sections,
    };
    try {
      await api.post("/api/modules", moduleData);
      navigate("/teacher-dashboard");
    } catch (err) {
      console.error("Error saving module:", err);
      setError("Failed to save the complete module. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <TeacherHeader />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <p className="text-sm font-medium text-blue-600">
              Step 2 of 2: Add Content
            </p>
            <h1 className="text-3xl font-bold text-gray-800">
              Adding Sections to "{moduleTitle}"
            </h1>
          </div>
          {error && (
            <p className="text-red-500 bg-red-100 p-3 rounded-md text-sm text-center mb-4">
              {error}
            </p>
          )}
          <form
            onSubmit={handleAddSection}
            className="bg-white p-6 border-2 border-black rounded-2xl space-y-4"
          >
            <h2 className="text-xl font-bold">Add New Section</h2>
            <div>
              <label
                htmlFor="section-title"
                className="block font-medium text-gray-700 mb-1"
              >
                Section Title
              </label>
              <input
                id="section-title"
                type="text"
                className="block w-full px-4 py-3 border-2 border-black rounded-md"
                placeholder="e.g., Section 1.1: The Fourier Transform"
                value={newSectionTitle}
                onChange={(e) => setNewSectionTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="section-file"
                className="block font-medium text-gray-700 mb-1"
              >
                Section Content (PDF, PPT, or Word)
              </label>
              <input
                id="section-file"
                type="file"
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                required
              />
            </div>
            <div className="text-right">
              <Button type="submit" disabled={isUploading}>
                {isUploading ? "Uploading..." : "Add Section"}
              </Button>
            </div>
          </form>
          <div className="bg-white p-6 border-2 border-black rounded-2xl">
            <h2 className="text-xl font-bold mb-4">
              Added Sections ({sections.length})
            </h2>
            <div className="space-y-3">
              {sections.length === 0 ? (
                <p className="text-gray-500">
                  You haven't added any sections yet.
                </p>
              ) : (
                sections.map((section, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <p className="font-semibold">{section.title}</p>
                    <span className="flex items-center text-green-600 text-sm">
                      <CheckCircle size={16} className="mr-2" /> Content
                      Uploaded
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="text-center pt-4">
            <Button
              onClick={handleSaveModule}
              disabled={isSaving || sections.length === 0}
              className="w-full sm:w-auto !py-4 !text-lg"
            >
              {isSaving ? "Saving Module..." : "Finish & Save Module"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddSectionsPage;
