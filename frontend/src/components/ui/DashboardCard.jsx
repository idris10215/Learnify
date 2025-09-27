
import React from 'react';

const DashboardCard = ({ children, className = '' }) => (
    <div className="relative h-full">
        <div className="absolute inset-0 bg-black rounded-2xl transform translate-x-1 translate-y-1"></div>
        <div className={`relative bg-white p-4 sm:p-6 border-2 border-black rounded-2xl h-full flex flex-col ${className}`}>
            {children}
        </div>
    </div>
);

export default DashboardCard;