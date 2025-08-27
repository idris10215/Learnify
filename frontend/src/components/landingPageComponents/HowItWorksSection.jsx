import React from 'react';
import HowItWorksCard from '../cards/HowItWorksCard';
import { Sparkles, BarChart, BookOpen } from 'lucide-react'; // Example of using Lucide icons

const HowItWorksSection = () => (
    <section className="px-4 sm:px-6 py-20 sm:py-24 bg-[#1C6EA4]">
        <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl sm:text-4xl font-bold mb-12 sm:mb-16 text-center text-white">Three Simple Steps to Success</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <HowItWorksCard icon={<BookOpen size={40} className="text-blue-500" />} title="Create Path">
                    Teachers design structured learning paths with resources, quizzes, and AI-generated content.
                </HowItWorksCard>
                <HowItWorksCard icon={<Sparkles size={40} className="text-yellow-500" />} title="Learn Intelligently">
                    Students follow personalized paths with interactive content and AI-powered assistance.
                </HowItWorksCard>
                <HowItWorksCard icon={<BarChart size={40} className="text-green-500" />} title="Track Progress">
                    Advanced analytics provide insights into learning progress and engagement patterns.
                </HowItWorksCard>
            </div>
        </div>
    </section>
);

export default HowItWorksSection;
