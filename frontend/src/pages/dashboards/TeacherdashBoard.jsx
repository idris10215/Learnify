// frontend/src/pages/dashboards/TeacherDashBoard.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BookCopy,
  PlusCircle,
  Award,
  Users as UsersIcon,
  Clock,
  ChevronRight,
} from "lucide-react";
import api from "../../../services/api";
import TeacherHeader from "../../components/dashboard/TeacherHeader";
import StatCard from "../../components/dashboard/StatCard";
import DashboardCard from "../../components/ui/DashboardCard";
import MyClassesWidget from "../../components/dashboard/MyClassesWidget";

const TeacherDashboard = () => {
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
    <div className="bg-gradient-to-b from-blue-100 to-gray-50 min-h-screen flex flex-col">
      <TeacherHeader />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Here's your mission control for today, Mohsin Abbasi.
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Students"
              value="143" // Placeholder
              subValue="in 5 classes"
              icon={<UsersIcon size={24} />}
              color="blue"
            />
            <StatCard
              title="Active Modules"
              value={loading ? '...' : modules.length}
              subValue="Ready for students"
              icon={<BookCopy size={24} />}
              color="green"
            />
            <StatCard
              title="Avg. Score"
              value="88%" // Placeholder
              subValue="+3% this week"
              icon={<Award size={24} />}
              color="yellow"
            />
            <StatCard
              title="Avg. Engagement"
              value="7.5h" // Placeholder
              subValue="weekly"
              icon={<Clock size={24} />}
              color="purple"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1">
              <MyClassesWidget />
            </div>
            
            <div className="lg:col-span-2">
              <DashboardCard>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
                  <h3 className="text-xl font-bold mb-2 sm:mb-0">
                    My Modules Library
                  </h3>
                  <Link to="/create-module" className="w-full sm:w-auto">
                    <button className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center border-2 border-black hover:bg-blue-600 transition-colors cursor-pointer">
                      <PlusCircle size={20} className="mr-2" />
                      Create New Module
                    </button>
                  </Link>
                </div>
                <div className="space-y-3 flex-grow flex flex-col">
                  {loading ? (
                    <p className="text-center text-gray-500">Loading your modules...</p>
                  ) : modules.length > 0 ? (
                    modules.slice(0, 5).map((module) => (
                      <Link
                        key={module._id}
                        to={`/teacher-modules/${module._id}`}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-blue-500 transition-colors"
                      >
                        <p className="font-semibold text-sm">{module.title}</p>
                        <span className="text-xs text-gray-500">
                          Updated {new Date(module.updatedAt).toLocaleDateString()}
                        </span>
                        <ChevronRight size={20} className="text-gray-400" />
                      </Link>
                    ))
                  ) : (
                    <p className="text-center text-gray-500">You haven't created any modules yet.</p>
                  )}
                  <div className="flex-grow"></div>
                  <Link to="/teacher-modules" className="self-end">
                    <button className="text-sm font-semibold text-blue-500 hover:underline">
                      View all modules →
                    </button>
                  </Link>
                </div>
              </DashboardCard>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;