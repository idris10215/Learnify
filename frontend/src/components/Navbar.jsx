import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './ui/Button';
import { Menu, X } from 'lucide-react'; // Using Lucide icons for the toggle

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        // Added relative positioning to the header to act as an anchor for the absolute menu
        <header className="bg-white sticky top-0 z-20 border-b-2 border-black ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" onClick={() => setIsOpen(false)}>
                        <h1 className="text-3xl font-bold text-gray-800">
                          Learnify<span className="text-blue-500">.</span>
                        </h1>
                    </Link>
                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/teacher-login">
                            <Button className="text-sm py-2 px-3">Sign in as Teacher</Button>
                        </Link>
                        <Link to="/student-login">
                            <Button className="text-sm py-2 px-3">Sign in as Student</Button>
                        </Link>
                    </div>
                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="z-30 relative cursor-pointer  ">
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu with corrected animation and positioning */}
            <div 
                className={`absolute top-0 left-0 w-full bg-white border-b-2 border-black transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'transform translate-y-0' : 'transform -translate-y-full'}`}
                // The menu is positioned absolutely relative to the header and slides down from above
            >
                {/* Added flex flex-col to ensure space-y works correctly */}
                <div className="pt-24 pb-8 px-4 flex flex-col space-y-6">
                    <Link to="/teacher-login" onClick={() => setIsOpen(false)}>
                        <Button className="w-full">Sign in as Teacher</Button>
                    </Link>
                    <Link to="/student-login" onClick={() => setIsOpen(false)}>
                        <Button className="w-full">Sign in as Student</Button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
