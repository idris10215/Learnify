import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { uploadData } from 'aws-amplify/storage';
import api from '../../services/api';

import TeacherHeader from '../components/dashboard/TeacherHeader';
import Button from '../components/ui/Button';
import { XCircle, CheckCircle } from 'lucide-react';

const ModuleEditorPage = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sections, setSections] = useState([]);
  
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [saveSuccess, setSaveSuccess] = useState(false);

  // Fetch the existing module data when the page loads
  useEffect(() => {
    const fetchModule = async () => {
      try {
        const response = await api.get(`/api/modules/${moduleId}`);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setSections(response.data.sections);
      } catch (error) {
        console.error("Failed to fetch module for editing:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchModule();
  }, [moduleId]);

  const handleAddSection = async (e) => {
      e.preventDefault();
      if (!newSectionTitle || !selectedFile) return;
      setIsUploading(true);
      try {
          const result = await uploadData({
              path: ({ identityId }) => `protected/${identityId}/${Date.now()}-${selectedFile.name}`,
              data: selectedFile
          }).result;
          
          const newSection = {
              title: newSectionTitle,
              order: sections.length + 1,
              contentType: 'PDF', // Simplified for now
              contentUrl: result.path
          };
          setSections([...sections, newSection]);
          setNewSectionTitle('');
          setSelectedFile(null);
          e.target.reset();
      } catch (error) {
          console.error("Error uploading file:", error);
      } finally {
          setIsUploading(false);
      }
  };

  const handleRemoveSection = (indexToRemove) => {
    // We remove the section from our local list. 
    // The change will be saved to the database when the teacher clicks "Save Changes".
    setSections(sections.filter((_, index) => index !== indexToRemove));
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    setSaveSuccess(false); // Reset success message on new save attempt
    const moduleData = { title, description, sections };
    console.log("Frontend is sending this updated module data:", moduleData);
    try {
      await api.put(`/api/modules/${moduleId}`, moduleData);
      navigate(`/teacher-modules/${moduleId}`);
      // 2. On success, we set our success state to true
      setSaveSuccess(true);
      
      // 3. We remove the automatic redirect. Instead, we'll show a "Saved!" message
      //    and then reset the button after a few seconds.
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000); // Hide the "Saved!" message after 3 seconds

    } catch (error) {
      console.error("Error saving module:", error);
    } finally {
      setIsSaving(false);
    }
  };


  if (isLoading) return <p>Loading editor...</p>;

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <TeacherHeader />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold">Editing Module</h1>
          {/* Form for Title and Description */}
          <div className="bg-white p-6 border-2 border-black rounded-2xl space-y-4">
             <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="block w-full px-4 py-3 border-2 border-black rounded-md font-bold text-lg" />
             <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="block w-full px-4 py-3 border-2 border-black rounded-md" />
          </div>

          {/* List of existing sections with a "Remove" button */}
          <div className="bg-white p-6 border-2 border-black rounded-2xl">
            <h2 className="text-xl font-bold mb-4">Sections</h2>
            {sections.map((section, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2">
                <p>{section.title}</p>
                <button onClick={() => handleRemoveSection(index)} className="text-red-500 hover:text-red-700">
                  <XCircle size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Form to add a new section */}
          <form onSubmit={handleAddSection} className="bg-white p-6 border-2 border-black rounded-2xl space-y-4">
            <h2 className="text-xl font-bold">Add New Section</h2>
            <input type="text" placeholder="New section title" value={newSectionTitle} onChange={(e) => setNewSectionTitle(e.target.value)} className="block w-full px-4 py-3 border-2 border-black rounded-md" required/>
            <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" required/>
            <div className="text-right">
              <Button type="submit" disabled={isUploading}>{isUploading ? 'Uploading...' : 'Add Section'}</Button>
            </div>
          </form>

          {/* Final Save Button */}
          <div className="text-center">
            <Button 
              onClick={handleSaveChanges} 
              disabled={isSaving || saveSuccess} 
              className={`!py-4 !text-lg text-white ${saveSuccess ? '!bg-green-500 !border-green-600' : '!bg-blue-500 !border-blue-600'}`}
            >
              {isSaving ? (
                'Saving...'
              ) : saveSuccess ? (
                <span className="flex items-center"><CheckCircle size={20} className="mr-2"/> Saved!</span>
              ) : (
                'Save All Changes'
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ModuleEditorPage