// frontend/src/components/dashboard/MyClassesWidget.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api.js'; // Corrected path
import { Users, ChevronRight } from 'lucide-react';
import DashboardCard from '../ui/DashboardCard.jsx'; // Corrected path

const MyClassesWidget = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await api.get("/api/classes");
        setClasses(response.data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching classes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  return (
    <DashboardCard className="flex flex-col">
      <h3 className="text-xl font-bold mb-4">My Classes</h3>
      {loading ? (
        <p className="text-gray-500">Loading classes...</p>
      ) : (
        <div className="space-y-4 flex-grow">
          {classes.length > 0 ? (
            classes.map(cls => (
              <Link
                to={`/teacher-classes/${cls._id}`}
                key={cls._id}
                className="block p-4 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-gray-900 group-hover:text-blue-600">{cls.className}</h4>
                  <ChevronRight size={20} className="text-gray-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
                </div>
                <div className="flex items-center text-xs text-gray-500 mt-2">
                  <Users size={14} className="mr-2" />
                  <span>{cls.studentIds.length} Student(s) Enrolled</span>
                </div>
                
              </Link>
            ))
          ) : (
            <div className="flex-grow flex items-center justify-center">
                 <p className="text-center text-gray-500">You are not assigned to any classes yet.</p>
            </div>
          )}
        </div>
      )}
      <div className="mt-4 text-right">
        <Link to="/teacher-classes" className="text-sm font-semibold text-blue-500 hover:underline">
          View all classes →
        </Link>
      </div>
    </DashboardCard>
  );
};

export default MyClassesWidget;