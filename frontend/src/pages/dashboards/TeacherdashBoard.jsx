import { getCurrentUser, signOut } from "aws-amplify/auth";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TeacherDashBoard = () => {
  const [user, setuser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setuser(currentUser);
      } catch (error) {
        console.error("Error fetching user: ", error);
      }
    };
    fetchUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (!user) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white border-2 border-black rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-2">Teacher Dashboard</h1>
        <p className="text-lg text-gray-700">Welcome!</p>
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-md text-left">
          <p>
            <strong>User ID:</strong> {user.userId}
          </p>
          <p>
            <strong>Username (Email):</strong> {user.username}
          </p>
        </div>
        <div className="mt-6">
          <Button onClick={handleSignOut}>Logout</Button>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashBoard;
