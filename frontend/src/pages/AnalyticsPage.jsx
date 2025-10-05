// frontend/src/pages/AnalyticsPage.jsx

import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import TeacherHeader from '../components/dashboard/TeacherHeader';
import StatCard from '../components/dashboard/StatCard';
import { BookCopy, Users, Award, Clock } from 'lucide-react';

const AnalyticsPage = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    moduleCount: 0,
    studentCount: 143, // Placeholder data
    avgScore: '88%',   // Placeholder data
    avgEngagement: '7.5h' // Placeholder data
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // We can fetch the real module count
        const modulesResponse = await api.get("/api/modules/getAllModules");
        
        // In the future, we would fetch real class and student data here
        // For now, we just update the real module count
        setStats(prevStats => ({
          ...prevStats,
          moduleCount: modulesResponse.data.length,
        }));

      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <TeacherHeader />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Platform Analytics</h1>

          {loading ? (
            <p>Loading analytics...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* This card uses REAL data */}
              <StatCard 
                title="Total Modules Created" 
                value={stats.moduleCount} 
                subValue="Across all teachers" 
                icon={<BookCopy size={24} />} 
                color="green"
              />

              {/* These cards use SAMPLE data for the presentation */}
              <StatCard 
                title="Total Active Students" 
                value={stats.studentCount} 
                subValue="in 5 classes" 
                icon={<Users size={24} />} 
                color="blue"
              />
              <StatCard 
                title="Platform Avg. Score" 
                value={stats.avgScore} 
                subValue="+3% this week" 
                icon={<Award size={24} />} 
                color="yellow"
              />
              <StatCard 
                title="Avg. Engagement" 
                value={stats.avgEngagement} 
                subValue="weekly per student" 
                icon={<Clock size={24} />} 
                color="purple"
              />
            </div>
          )}
          
          {/* We can add charts with placeholder data here later if you want! */}
          <div className="mt-8 bg-white p-6 border-2 border-black rounded-2xl text-center text-gray-500">
             Chart Area - Coming Soon
          </div>

        </div>
      </main>
    </div>
  );
};

export default AnalyticsPage;