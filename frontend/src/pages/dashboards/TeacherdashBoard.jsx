import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BookCopy,
  PlusCircle,
  Award,
  Users as UsersIcon,
  Clock,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import axios from "axios";

import TeacherHeader from "../../components/dashboard/TeacherHeader";
import StatCard from "../../components/dashboard/StatCard";
import DashboardCard from "../../components/ui/DashboardCard";

const TeacherDashboard = () => {
  const [paths, setPaths] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaths = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/paths/getAllPaths"
        );
        setPaths(response.data);
      } catch (error) {
        console.log("Error fetching paths:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaths();
  }, []);

  return (
    <div className="bg-gradient-to-b from-blue-500 to-white min-h-screen flex flex-col">
      <TeacherHeader />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Here's your mission control for today, Sarah.
            </h2>
          </div>

          {/* --- We now use our clean StatCard component --- */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <StatCard
              title="Total Students"
              value="143"
              subValue="in 5 classes"
              icon={<UsersIcon size={24} />}
              color="blue"
            />
            <StatCard
              title="Active Paths"
              value="8"
              subValue="3 new this month"
              icon={<BookCopy size={24} />}
              color="green"
            />
            <StatCard
              title="Avg. Score"
              value="88%"
              subValue="+3% this week"
              icon={<Award size={24} />}
              color="yellow"
            />
            <StatCard
              title="Avg. Engagement"
              value="7.5h"
              subValue="weekly"
              icon={<Clock size={24} />}
              color="purple"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1">
              {/* --- We use our generic DashboardCard for custom content --- */}
              <DashboardCard>
                <h3 className="text-xl font-bold mb-4">Attention Required</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                    <div className="flex items-start">
                      <AlertTriangle
                        size={20}
                        className="text-red-500 mr-3 mt-1 shrink-0"
                      />
                      <div>
                        <p className="font-bold text-red-800 text-sm">
                          Low Average Score
                        </p>
                        <p className="text-xs text-red-600">
                          Chemistry 9A needs attention.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                    <div className="flex items-start">
                      <CheckCircle
                        size={20}
                        className="text-green-500 mr-3 mt-1 shrink-0"
                      />
                      <div>
                        <p className="font-bold text-green-800 text-sm">
                          3 New Submissions
                        </p>
                        <p className="text-xs text-green-600">
                          In Physics 101 - Period 2.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </DashboardCard>
            </div>

            <div className="lg:col-span-2">
              <DashboardCard>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
                  <h3 className="text-xl font-bold mb-2 sm:mb-0">
                    My Paths Library
                  </h3>
                  <Link to="/create-path" className="w-full sm:w-auto">
                    <button className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center border-2 border-black hover:bg-blue-600 transition-colors cursor-pointer">
                      <PlusCircle size={20} className="mr-2" />
                      Create New Path
                    </button>
                  </Link>
                </div>
                <div className="space-y-3 flex-grow flex flex-col">
                  {loading ? (
                    <p className="text-center text-gray-500">
                      Loading your paths...
                    </p>
                  ) : paths.length > 0 ? (
                    paths.map((path) => (
                      <Link
                        key={path._id} // Use the unique database ID as the key
                        to={`/teacher-paths/${path._id}`}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-colors"
                      >
                        <p className="font-semibold text-sm">{path.title}</p>
                        <span className="text-xs text-gray-500">
                          Updated{" "}
                          {new Date(path.updatedAt).toLocaleDateString()}
                        </span>
                        <ChevronRight size={20} className="text-gray-400" />
                      </Link>
                    ))
                  ) : (
                    <p className="text-center text-gray-500">
                      You haven't created any paths yet.
                    </p>
                  )}
                  <div className="flex-grow"></div>
                  <Link to="/teacher-paths" className="self-end">
                    <button className="text-sm font-semibold text-blue-500 cursor-pointer">
                      View all paths
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
