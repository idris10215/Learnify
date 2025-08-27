import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
    // The footer now has a white background with the 3D top border
    <footer className="bg-white text-gray-800 relative pt-2">
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-950"></div>

        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {/* Logo and Description Section */}
                <div className="col-span-2 md:col-span-1">
                    <h1 className="text-3xl font-bold">
                      Learnify<span className="text-blue-500">.</span>
                    </h1>
                    <p className="mt-4 text-gray-500 text-sm">
                        Empowering education through AI-powered personalized learning experiences.
                    </p>
                </div>

                {/* Platform Links */}
                <div>
                    <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-500">Platform</h3>
                    <ul className="mt-4 space-y-2">
                        <li><Link to="/student-experience" className="text-gray-600 hover:text-blue-500 transition-colors">Student Experience</Link></li>
                        <li><Link to="/teacher-tools" className="text-gray-600 hover:text-blue-500 transition-colors">Teacher Tools</Link></li>
                        <li><Link to="/admin-dashboard" className="text-gray-600 hover:text-blue-500 transition-colors">Admin Dashboard</Link></li>
                        <li><Link to="/pricing" className="text-gray-600 hover:text-blue-500 transition-colors">Pricing</Link></li>
                    </ul>
                </div>

                {/* Resources Links */}
                <div>
                    <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-500">Resources</h3>
                    <ul className="mt-4 space-y-2">
                        <li><Link to="/blog" className="text-gray-600 hover:text-blue-500 transition-colors">Blog</Link></li>
                        <li><Link to="/help-center" className="text-gray-600 hover:text-blue-500 transition-colors">Help Center</Link></li>
                        <li><Link to="/community" className="text-gray-600 hover:text-blue-500 transition-colors">Community</Link></li>
                    </ul>
                </div>

                {/* Company Links */}
                <div>
                    <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-500">Company</h3>
                    <ul className="mt-4 space-y-2">
                        <li><Link to="/about" className="text-gray-600 hover:text-blue-500 transition-colors">About Us</Link></li>
                        <li><Link to="/careers" className="text-gray-600 hover:text-blue-500 transition-colors">Careers</Link></li>
                        <li><Link to="/contact" className="text-gray-600 hover:text-blue-500 transition-colors">Contact</Link></li>
                    </ul>
                </div>
            </div>
            <div className="mt-12 border-t border-gray-200 pt-8 text-center">
                <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Learnify. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

export default Footer;
