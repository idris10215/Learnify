import React from 'react';
import BenefitCard from '../cards/BenefitCard';
import {    Users, UserRoundPen} from 'lucide-react'; // Example of using Lucide icons


const BenefitsSection = () => (
    <section className="px-4 sm:px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">The Smarter Way to Learn and Teach</h2>
                <p className="mt-4 text-lg text-gray-600">Unlock potential with tools designed for modern education.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <BenefitCard icon={<Users size={30} className="text-yellow-500" />} title="For Students">
                    Master subjects faster with a curriculum that adapts to your personal learning style and pace.
                </BenefitCard>
                <BenefitCard icon={<UserRoundPen size={30} className="text-green-500" />} title="For Teachers">
                    Save hours on planning and get real-time insights into student progress to provide targeted support.
                </BenefitCard>
            </div>
        </div>
    </section>
);

export default BenefitsSection;
