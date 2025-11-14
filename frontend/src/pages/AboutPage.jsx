// frontend/src/pages/AboutPage.jsx - REVISED for SIMPLER Founder Cards

import React from 'react';
import { ChevronLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

const AboutPage = () => {
    return (
        <div className="min-h-screen flex flex-col ">
            <div className="absolute top-4 left-4 z-10 ">
                <Link to="/">
                    <Button className="bg-white text-gray-800 hover:bg-gray-100 flex items-center px-4 py-2 rounded-lg shadow-md">
                        <ChevronLeft size={20} className="mr-2" /> Back to Home
                    </Button>
                </Link>
            </div>
            <main className="flex-grow flex flex-col items-center p-8 bg-[#33A1E0] text-white">
                <div className="text-center max-w-4xl mx-auto py-12">
                    {/* Hero Section: The Founding Story (kept concise) */}
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
                        The Story Behind Learnify
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-white/90">
                        Learnify was founded by three friends with a shared passion for making education better.
                    </p>
                    <p className="text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
                        United by our belief in the power of personalized learning, we built Learnify to create engaging and effective educational experiences for everyone. Our journey began with a simple idea: that technology can help every student reach their full potential.
                    </p>
                </div>

                {/* Meet the Founders Section - SIMPLIFIED */}
                <div className="max-w-7xl mx-auto py-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Meet the Founders</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Founder 1 */}
                        <SimpleFounderCard
                            name="Abdul Muqit"
                            // intro="Computer Science graduate with a focus on AI in education."
                            image="https://placehold.co/180x180/FFFFFF/33A1E0?text=F1" // Larger placeholder image
                        />
                        {/* Founder 2 */}
                        <SimpleFounderCard
                            name="Mohammed Tanveer"
                            // intro="Experienced educator with a Master's in Curriculum Development."
                            image="https://placehold.co/180x180/FFFFFF/33A1E0?text=F2" // Larger placeholder image
                        />
                        {/* Founder 3 */}
                        <SimpleFounderCard
                            name="Mohammed Idris"
                            // intro="Passionate about UX design, bringing learning to life visually."
                            image="https://placehold.co/180x180/FFFFFF/33A1E0?text=F3" // Larger placeholder image
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

// Helper component for Simple Founder Cards (no icons, concise info)
const SimpleFounderCard = ({ name, intro, image }) => (
    <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
        <img src={image} alt={name} className="w-36 h-36 rounded-full mb-4 object-cover border-4 border-[#33A1E0]" /> {/* Larger image */}
        <h3 className="text-2xl font-bold mb-2">{name}</h3>
        <p className="text-gray-700 leading-relaxed text-md">{intro}</p> {/* Concise intro */}
    </div>
);

export default AboutPage;