// frontend/src/pages/ForStudentsPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { ChevronLeft, BookOpen, Brain, TrendingUp, Award } from 'lucide-react'; // Icons for features

// Receive the 'user' prop
const ForStudentsPage = ({ user }) => { 
    return (
        <div className="min-h-screen bg-[#33A1E0] text-white flex flex-col">
            {/* Back to Home Button */}
            <div className="fixed top-4 left-4 z-10 ">
                <Link to="/">
                    <Button className="bg-white text-gray-800 hover:bg-gray-100 flex items-center px-4 py-2 rounded-lg shadow-md">
                        <ChevronLeft size={20} className="mr-2" /> Back to Home
                    </Button>
                </Link>
            </div>

            <main className="flex-grow flex flex-col items-center justify-center p-8 text-center max-w-5xl mx-auto mt-10">
                {/* Hero-like Introduction */}
                <h1 className="text-5xl md:text-6xl font-extrabold mb-4 mt-16 md:mt-0">
                    Your Path to Success Starts Here
                </h1>
                <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl">
                    Learnify personalizes your learning, making it more effective, engaging, and tailored just for you.
                </p>

                {/* Feature Sections */}
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 w-full mb-16 ">
                    <FeatureCard
                        icon={<BookOpen size={40} className="text-blue-500" />}
                        title="Personalized Learning Paths"
                        description="Access content and modules specifically chosen to match your learning pace and style. No more one-size-fits-all education."
                    />
                    <FeatureCard
                        icon={<Brain size={40} className="text-green-500" />}
                        title="Understand Your Progress"
                        description="See clear insights into your strengths and areas for improvement. Get feedback that helps you grow smarter, faster."
                    />
                    <FeatureCard
                        icon={<TrendingUp size={40} className="text-yellow-500" />}
                        title="Stay on Track with Ease"
                        description="Follow your customized journey with easy navigation. Your teacher monitors your progress to ensure you're always supported."
                    />
                    <FeatureCard
                        icon={<Award size={40} className="text-purple-500" />}
                        title="Engaging & Interactive Modules"
                        description="Learn through diverse formats—videos, quizzes, interactive exercises—designed to keep you engaged and motivated."
                    />
                </div>

                {/* Call-to-Action - DYNAMIC BUTTON HERE */}
                <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Learning?</h2>
                {user && user.role === 'Student' ? (
                    // If logged in as a student, show "Go to Dashboard"
                    <Link to="/student-dashboard">
                        <Button className="bg-green-600 text-white hover:bg-green-700 flex items-center px-6 py-3 rounded-lg text-xl transition duration-300 ease-in-out shadow-lg">
                            Go to Your Student Dashboard
                        </Button>
                    </Link>
                ) : (
                    // If not logged in, or logged in as a teacher, show "Sign In as Student"
                    <Link to="/student-login">
                        <Button className="bg-white text-gray-800 hover:bg-gray-100 flex items-center px-6 py-3 rounded-lg text-xl transition duration-300 ease-in-out shadow-lg">
                            Sign In as Student
                        </Button>
                    </Link>
                )}
            </main>
        </div>
    );
};

// Helper component for consistent feature card styling (No changes needed)
const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
        <div className="mb-4">{icon}</div>
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

export default ForStudentsPage;