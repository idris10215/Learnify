import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import CreateLearningPath from './components/CreateLearningPath';
import TopicView from './components/TopicView';
import QuizPage from './components/QuizPage';
import TeacherAnalytics from './components/TeacherAnalytics';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [userType, setUserType] = useState(null);

  const navigate = (page, type) => {
    setCurrentPage(page);
    if (type) setUserType(type);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={navigate} />;
      case 'teacher-dashboard':
        return <TeacherDashboard onNavigate={navigate} />;
      case 'student-dashboard':
        return <StudentDashboard onNavigate={navigate} />;
      case 'create-path':
        return <CreateLearningPath onNavigate={navigate} />;
      case 'topic-view':
        return <TopicView onNavigate={navigate} />;
      case 'quiz':
        return <QuizPage onNavigate={navigate} />;
      case 'analytics':
        return <TeacherAnalytics onNavigate={navigate} />;
      default:
        return <LandingPage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderPage()}
    </div>
  );
}