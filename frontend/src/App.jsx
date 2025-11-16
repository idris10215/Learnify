import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Amplify } from "aws-amplify"; // Amplify config should be done globally, not here

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

// MainLayout with Navbar and Footer
const MainLayout = ({ children, user }) => (
  <>
    <Navbar user={user} />
    {children}
    <Footer />
  </>
);

// AuthLayout with LoginNavbar (for login pages)
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
          {/* Public Routes with MainLayout (Navbar, Footer) */}
          <Route
            path="/"
            element={
              <MainLayout user={user}>
                <LandingPage />
              </MainLayout>
            }
          />
          <Route
            path="/about-us"
            element={
              <PublicRoute user={user}>
                  <AboutPage />
              </PublicRoute>
            }
          />
          <Route
            path="/for-students"
            element={
              <PublicRoute user={user}>
                  <ForStudentsPage user={user} />
              </PublicRoute>
            }
          />
          <Route
            path="/for-teachers"
            element={
              <PublicRoute user={user}>
                  <ForTeachersPage user={user} />
              </PublicRoute>
            }
          />

          {/* Login Pages - Wrapped in AuthLayout (LoginNavbar) and PublicRoute */}
          <Route
            path="/teacher-login"
            element={
              <PublicRoute user={user} redirectTo={user?.role === 'Teacher' ? '/teacher-dashboard' : null}>
                <AuthLayout>
                  <LoginPage role="Teacher" />
                </AuthLayout>
              </PublicRoute>
            }
          />
          <Route
            path="/student-login"
            element={
              <PublicRoute user={user} redirectTo={user?.role === 'Student' ? '/student-dashboard' : null}>
                <AuthLayout>
                  <LoginPage role="Student" />
                </AuthLayout>
              </PublicRoute>
            }
          />

          {/* Protected Routes - Student (no external layout, pages manage their own UI) */}
          <Route
            path="/student-dashboard"
            element={
              <ProtectedRoute user={user} allowedRoles={['Student']}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/class/:classId"
            element={
              <ProtectedRoute user={user} allowedRoles={['Student']}>
                <StudentClassViewPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/class/:classId/module/:moduleId"
            element={
              <ProtectedRoute user={user} allowedRoles={['Student']}>
                <StudentModuleViewPage />
              </ProtectedRoute>
            }
          />

          {/* Protected Routes - Teacher (no external layout, pages manage their own UI) */}
          <Route
            path="/teacher-dashboard"
            element={
              <ProtectedRoute user={user} allowedRoles={['Teacher']}>
                <TeacherDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-module"
            element={
              <ProtectedRoute user={user} allowedRoles={['Teacher']}>
                <CreateModulePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-sections"
            element={
              <ProtectedRoute user={user} allowedRoles={['Teacher']}>
                <AddSectionsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher-modules"
            element={
              <ProtectedRoute user={user} allowedRoles={['Teacher']}>
                <ModuleLibraryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher-modules/:moduleId"
            element={
              <ProtectedRoute user={user} allowedRoles={['Teacher']}>
                <ModuleViewerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher-modules/:moduleId/edit"
            element={
              <ProtectedRoute user={user} allowedRoles={['Teacher']}>
                <ModuleEditorPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher-classes"
            element={
              <ProtectedRoute user={user} allowedRoles={['Teacher']}>
                <MyClassesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher-classes/:classId"
            element={
              <ProtectedRoute user={user} allowedRoles={['Teacher']}>
                <ClassManagementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute user={user} allowedRoles={['Teacher']}>
                <AnalyticsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics/:classId"
            element={
              <ProtectedRoute user={user} allowedRoles={['Teacher']}>
                <ClassAnalyticsReport />
              </ProtectedRoute>
            }
          />

          {/* Fallback Route for 404 */}
          <Route path="*" element={<MainLayout user={user}><h1 className="text-4xl text-center py-20">404 - Page Not Found</h1></MainLayout>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

// We export the App component wrapped in our withAuth "brain".
export default withAuth(App);