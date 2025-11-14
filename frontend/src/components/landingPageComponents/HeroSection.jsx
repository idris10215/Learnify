import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const HeroSection = () => {
    return (
        <section className="flex flex-col items-center justify-center text-center px-4 sm:px-6 py-20 bg-[#33A1E0]">
            <div className="max-w-4xl">
                <div className="flex justify-center mb-8">
                    {/* The amber background has been removed for a cleaner look */}
                    <h1 className="text-5xl md:text-7xl font-bold text-white">
                      Learnify<span className="text-yellow-400">.</span>
                    </h1>
                </div>

                <div className="bg-black p-6 rounded-lg">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                      Your Personalized Learning Path, Powered by AI
                    </h2>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/for-students">
                      <Button className="w-full sm:w-auto">Start Your Learning Journey</Button>
                    </Link>
                    <Link to="/for-teachers">
                      <Button className="w-full sm:w-auto">Empower Your Classroom</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;

