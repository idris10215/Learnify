import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const HeroSection = () => (
    <section className="flex flex-col items-center justify-center text-center px-4 sm:px-6 py-20 sm:py-24 bg-blue-500">
        <h1 className="text-5xl sm:text-6xl font-bold text-white tracking-wide">
          Learnify<span className="text-yellow-400">.</span>
        </h1>
        <div className="bg-black p-6 rounded-lg mt-8 w-full max-w-4xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Your Personalized Learning Path, Powered by AI
            </h2>
        </div>
        <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center w-full max-w-xs sm:max-w-none">
            <Link to="/student-login"><Button>Start Your Learning Journey</Button></Link>
            <Link to="/teacher-login"><Button>Empower Your Classroom</Button></Link>
        </div>
    </section>
);

export default HeroSection;
