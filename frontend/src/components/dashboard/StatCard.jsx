// frontend/src/components/dashboard/StatCard.jsx
import React from 'react';
import DashboardCard from '../ui/DashboardCard';

const StatCard = ({ title, value, subValue, icon, color }) => (
    <DashboardCard>
        <div className="flex items-start justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-2xl sm:text-3xl font-bold mt-1">{value}</p>
                {subValue && (
                    <p className="text-xs text-gray-400">
                        {subValue}
                    </p>
                )}
            </div>
            <div className={`p-2 sm:p-3 rounded-lg border-2 border-black bg-${color}-100`}>
                {React.cloneElement(icon, { className: `text-${color}-500`})}
            </div>
        </div>
    </DashboardCard>
);

export default StatCard;