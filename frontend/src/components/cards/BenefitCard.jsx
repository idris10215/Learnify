import React from 'react';

const BenefitCard = ({ icon, title, children }) => {
    return (
      <div className="relative h-full">
        <div className="absolute inset-0 bg-black rounded-2xl transform translate-x-1 translate-y-1"></div>
        <div className="relative bg-white text-black p-6 border-2 border-black rounded-2xl h-full flex items-start space-x-4">
          <div className="flex-shrink-0 bg-gray-100 rounded-full p-3">
              {icon}
          </div>
          <div>
              <h3 className="text-xl font-bold text-gray-900">{title}</h3>
              <p className="mt-1 text-gray-600">{children}</p>
          </div>
        </div>
      </div>
    );
};

export default BenefitCard;
