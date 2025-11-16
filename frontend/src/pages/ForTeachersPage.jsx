// frontend/src/pages/ForTeachersPage.jsx - REWRITTEN to match ForStudentsPage.jsx style

import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { ChevronLeft, BarChart2, Users, Edit, Cloud } from 'lucide-react'; // Icons for features

const ForTeachersPage = () => {
    return (
        <div className="min-h-screen bg-[#33A1E0] text-white flex flex-col"> {/* Corrected to blue theme */}
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
                    Empower Your Classroom with Learnify
                </h1>
                <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl">
                    Gain unprecedented insights and control over your students' learning journeys with our cloud-based analytics dashboard.
                </p>

                {/* Feature Sections */}
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 w-full mb-16 ">
                    <FeatureCard
                        icon={<BarChart2 size={40} className="text-red-500" />} 
                        title="Actionable Student Analytics"
                        description="Understand individual and class performance at a glance. Identify struggling students and areas for targeted intervention effortlessly."
                    />
                    <FeatureCard
                        icon={<Users size={40} className="text-green-500" />} 
                        title="Personalized Learning Path Creation"
                        description="Easily design and assign customized learning paths to students or groups, adapting content to their unique needs."
                    />
                    <FeatureCard
                        icon={<Edit size={40} className="text-yellow-500" />} 
                        title="Seamless Content Management"
                        description="Upload, organize, and manage all your educational modules and resources in one intuitive library."
                    />
                    <FeatureCard
                        icon={<Cloud size={40} className="text-purple-500" />} 
                        title="Scalable & Secure Cloud Platform"
                        description="Benefit from a robust, reliable, and secure platform that grows with your needs, powered by AWS Amplify and MongoDB."
                    />
                </div>

                {/* Call-to-Action */}
                <h2 className="text-4xl font-bold mb-6">Ready to Revolutionize Your Teaching?</h2>
                <Link to="/teacher-login">
                    <Button className="bg-white text-gray-800 hover:bg-gray-100 flex items-center px-4 py-2 rounded-lg shadow-md">
                        Sign In as Teacher
                    </Button>
                </Link>
            </main>
        </div>
    );
};

// Helper component for consistent feature card styling
const FeatureCard = ({ icon, title, description }) => (
    // This is the simple card styling, no explicit 3D shadow or thick border on these feature cards.
    <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
        <div className="mb-4">{icon}</div>
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

export default ForTeachersPage;