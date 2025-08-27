import React from 'react';

const TestimonialCard = ({ quote, author, role }) => (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 bg-black rounded-2xl transform translate-x-1 translate-y-1"></div>
      <div className="relative bg-white text-black p-8 border-2 border-black rounded-2xl h-full flex flex-col">
        <p className="italic text-gray-700 flex-grow">"{quote}"</p>
        <div className="mt-6 flex items-center flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white flex-shrink-0">
                {author.charAt(0)}
            </div>
            <div className="ml-4">
                <p className="font-semibold text-gray-900">{author}</p>
                <p className="text-sm text-gray-500">{role}</p>
            </div>
        </div>
      </div>
    </div>
);

export default TestimonialCard;
