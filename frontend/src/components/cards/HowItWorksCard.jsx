import React from 'react';

const HowItWorksCard = ({ icon, title, children }) => {
    return (
      <div className="relative h-full">
        <div className="absolute inset-0 bg-black rounded-2xl transform translate-x-1 translate-y-1"></div>
        <div className="relative bg-white text-black p-8 border-2 border-black rounded-2xl h-full flex flex-col items-center text-center">
          {icon}
          <h4 className="font-bold text-2xl mt-4">{title}</h4>
          <p className="text-gray-700 mt-2 text-base flex-grow">
            {children}
          </p>
        </div>
      </div>
    );
};

export default HowItWorksCard;
