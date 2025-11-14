// frontend/src/components/Footer.jsx - REVISED: No 3D, Compact Layout, Not Empty

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
    // Clean, flat footer with adjusted spacing
    <footer className="bg-white text-gray-800 py-8 px-4 sm:px-6 lg:px-8 mt-16"> {/* Reduced py and mt */}
        
        <div className="max-w-7xl mx-auto">
            {/* Adjusted grid to 3 columns on medium screens to remove excessive empty space */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8"> 
                {/* Logo and Description Section */}
                <div className="col-span-2 md:col-span-1">
                    <h1 className="text-3xl font-bold">
                        Learnify<span className="text-blue-500">.</span>
                    </h1>
                    <p className="mt-2 text-gray-500 text-sm max-w-xs"> {/* Reduced mt, added max-w */}
                        Empowering education through AI-powered personalized learning experiences.
                    </p>
                </div>

                {/* Platform Links */}
                <div>
                    <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-500">Platform</h3>
                    <ul className="mt-3 space-y-1"> {/* Reduced mt and space-y */}
                        <li><Link to="/for-students" className="text-gray-600 hover:text-blue-500 transition-colors text-sm">For Students</Link></li>
                        <li><Link to="/for-teachers" className="text-gray-600 hover:text-blue-500 transition-colors text-sm">For Teachers</Link></li>
                    </ul>
                </div>

                {/* Company Links */}
                <div className="col-span-1">
                    <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-500">Company</h3>
                    <ul className="mt-3 space-y-1"> {/* Reduced mt and space-y */}
                        <li><Link to="/about-us" className="text-gray-600 hover:text-blue-500 transition-colors text-sm">About Us</Link></li>
                        
                    </ul>
                </div>
            </div>
            <div className="mt-8 border-t border-gray-200 pt-6 text-center"> {/* Reduced mt and pt */}
                <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Learnify. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

export default Footer;