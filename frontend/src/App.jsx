import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Amplify } from "aws-amplify";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginNavbar from "./components/LoginNavbar";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/dashboards/StudentdashBoard";
import TeacherDashboard from "./pages/dashboards/TeacherdashBoard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";
import withAuth from "./components/auth/withAuth";
import CreateModulePage from "./pages/CreateModulePage";
import AddSectionsPage from "./pages/AddSectionPage";
import ModuleLibraryPage from "./pages/ModuleLibraryPage";
import ModuleViewerPage from "./pages/ModuleViewerPage";
import MyClassesPage from "./pages/MyClassesPage";
import ClassManagementPage from "./pages/ClassManagementPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ModuleEditorPage from "./pages/ModuleEditorPage";
import StudentClassViewPage from "./pages/StudentClassViewPage";
import StudentModuleViewPage from "./pages/StudentModuleViewPage";
import ClassAnalyticsReport from "./pages/ClassAnalyticsReport";
import ForStudentsPage from "./pages/ForStudentsPage";
import ForTeachersPage from "./pages/ForTeachersPage";
import AboutPage from "./pages/AboutPage";

const MainLayout = ({ children, user }) => (
  <>
    <Navbar user={user} />
    {children}
    <Footer />
  </>
);

const AuthLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen bg-gray-100">
    <LoginNavbar />
    {children}
  </div>
);

// The App component is now much simpler. It just receives the 'user' prop.
const App = ({ user }) => {
  return (
    <BrowserRouter>
      <div className="bg-gray-50 text-gray-900 font-sans">
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout user={user}>
                <LandingPage />
              </MainLayout>
            }
          />

          <Route
            path="/teacher-login"
            element={
              <PublicRoute user={user} redirectTo="/teacher-dashboard">
                <AuthLayout>
                  <LoginPage role="Teacher" />
                </AuthLayout>
              </PublicRoute>
            }
          />
          <Route
            path="/student-login"
            element={
              <PublicRoute user={user} redirectTo="/student-dashboard">
                <AuthLayout>
                  <LoginPage role="Student" />
                </AuthLayout>
              </PublicRoute>
            }
          />

          <Route
            path="/student-dashboard"
            element={
              <ProtectedRoute user={user} redirectTo="/">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher-dashboard"
            element={
              <ProtectedRoute user={user} redirectTo="/">
                <TeacherDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-module"
            element={
              <ProtectedRoute user={user} redirectTo="/">
                <CreateModulePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-sections"
            element={
              <ProtectedRoute user={user} redirectTo="/">
                <AddSectionsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher-modules"
            element={
              <ProtectedRoute user={user} redirectTo="/">
                <ModuleLibraryPage />
              </ProtectedRoute>
            }
          />

          {/* This is the page for viewing a SINGLE module */}
          <Route
            path="/teacher-modules/:moduleId"
            element={
              <ProtectedRoute user={user} redirectTo="/">
                <ModuleViewerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher-classes"
            element={
              <ProtectedRoute user={user} redirectTo="/">
                <MyClassesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher-classes/:classId"
            element={
              <ProtectedRoute user={user}>
                <ClassManagementPage />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/analytics" 
            element={
              <ProtectedRoute user={user} redirectTo="/">
                <AnalyticsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/teacher-modules/:moduleId/edit" 
            element={
              <ProtectedRoute user={user} redirectTo="/">
                <ModuleEditorPage />
              </ProtectedRoute>
            } 
          />
          <Route 
              path="/student/class/:classId" 
              element={
                <ProtectedRoute user={user} redirectTo="/">
                  <StudentClassViewPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/class/:classId/module/:moduleId" 
              element={
                <ProtectedRoute user={user}>
                  <StudentModuleViewPage />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/analytics/:classId" 
              element={
                <ProtectedRoute user={user} >
                  <ClassAnalyticsReport/>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/for-students" 
              element={
                <PublicRoute>
                  <ForStudentsPage />
                </PublicRoute>
              } 
            />
            <Route 
              path="/for-teachers" 
              element={
                <PublicRoute>
                  <ForTeachersPage />
                </PublicRoute>
              } 
            />
            <Route 
              path="about-us" 
              element={
                <PublicRoute>
                  <AboutPage />
                </PublicRoute>
              } 
            />
            
        </Routes>
      </div>
    </BrowserRouter>
  );
};

// We export the App component wrapped in our withAuth "brain".
export default withAuth(App);
