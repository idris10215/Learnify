// frontend/src/pages/CreateModulePage.jsx
// --- REFACTORED FOR 'MODULES' AND 'SECTIONS' ---

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TeacherHeader from '../components/dashboard/TeacherHeader';
import Button from '../components/ui/Button';

const CreateModulePage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert('Please fill out both the title and description.');
      return;
    }
    
    // We now navigate to the "add-sections" page, passing the Module data.
    navigate('/add-sections', { state: { title, description } });
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <TeacherHeader />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Create New Module (Step 1 of 2)</h1>
          
          <form onSubmit={handleNext} className="bg-white p-8 border-2 border-black rounded-2xl space-y-6">
            <div>
              <label htmlFor="title" className="block font-medium text-gray-700 mb-1">Module Title</label>
              <input
                id="title"
                type="text"
                required
                className="block w-full px-4 py-3 border-2 border-black rounded-md"
                placeholder="e.g., Module 1: Advanced Control Systems"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block font-medium text-gray-700 mb-1">Description</label>
              <textarea
                id="description"
                required
                rows={4}
                className="block w-full px-4 py-3 border-2 border-black rounded-md"
                placeholder="A brief summary of what this module covers."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
            <div className="text-right">
              <Button type="submit">
                Next: Add Sections
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateModulePage;