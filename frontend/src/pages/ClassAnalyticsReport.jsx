import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link
import api from '../../services/api';
import TeacherHeader from '../components/dashboard/TeacherHeader';
import { ChevronLeft } from 'lucide-react'; // Import back icon

const ClassAnalyticsReport = () => {
  const { classId } = useParams(); // Get classId from the URL
  const [classReport, setClassReport] = useState(null);
  const [className, setClassName] = useState(''); // Store class name
  const [loadingReport, setLoadingReport] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (classId) {
      const fetchClassReport = async () => {
        setLoadingReport(true);
        setError('');
        try {
          // Fetch the main class details first to get the name
          // (Assuming you have a GET /api/classes/:id endpoint)
          const classDetailsRes = await api.get(`/api/classes/${classId}`);
          setClassName(classDetailsRes.data.className);

          // Then fetch the progress report
          const reportRes = await api.get(`/api/progress/class/${classId}`);
          setClassReport(reportRes.data);
        } catch (err) {
          console.error("Error fetching class report:", err);
          setError("Could not load progress report for this class.");
        } finally {
          setLoadingReport(false);
        }
      };
      fetchClassReport();
    }
  }, [classId]);

  return (
    <div className="bg-[#33A1E0] min-h-screen flex flex-col">
      <TeacherHeader />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* --- Navigation back to the main Analytics page --- */}
          <Link to="/analytics" className="inline-flex items-center text-blue-600 hover:underline mb-4">
             <ChevronLeft size={20} className="mr-1" />
             Back to Class Selection
          </Link>

          {loadingReport ? (
            <div className="text-center mt-8"><p>Loading report...</p></div>
          ) : error ? (
             <p className="text-red-500 mt-8">{error}</p>
          ) : classReport && classReport.length > 0 ? (
            <div className="bg-white p-6 border-2 border-black rounded-2xl overflow-x-auto mt-4">
              <h2 className="text-2xl font-bold mb-4">Student Progress Report: {className}</h2>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                   <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                    {/* Dynamically create headers for each assigned module */}
                    {classReport[0]?.modules.map(mod => (
                       <th key={mod.moduleId} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{mod.moduleTitle}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {classReport.map(studentProgress => (
                    <tr key={studentProgress.studentId}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{studentProgress.studentName}</td>
                       {studentProgress.modules.map(mod => (
                           <td key={mod.moduleId} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{mod.percentage}% ({mod.completed}/{mod.total})</td>
                       ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
             <p className="text-gray-500 mt-8">No progress data found for this class yet.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default ClassAnalyticsReport;