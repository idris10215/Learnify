import React from 'react';
import { Link } from 'react-router-dom';
import Button from './ui/Button';
import { ChevronLeft } from 'lucide-react';

const LoginNavbar = () => (
    <header className="bg-white sticky top-0 z-10 border-b-2 border-black w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <Link to="/">
                    <h1 className="text-3xl font-bold text-gray-800">
                      Learnify<span className="text-blue-500">.</span>
                    </h1>
                </Link>
                {/* Desktop Back Button */}
                <div className="hidden md:block">
                    <Link to="/">
                        <Button className="text-sm py-2 px-3">Back to Home</Button>
                    </Link>
                </div>
                {/* Mobile Back Button with 3D hover effect */}
                <div className="md:hidden">
                    <Link to="/">
                        {/* Replaced CarouselButton with a styled Button for the correct hover effect */}
                        <Button className="!p-3">
                            <ChevronLeft size={20} className="text-gray-600" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    </header>
);

export default LoginNavbar;
