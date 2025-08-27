// import React from 'react';
// import { Link } from 'react-router-dom';
// import Button from '../components/ui/Button';
// import { quotes } from '../data/quotes'; // Import the new data file

// // The component now accepts a 'role' to select the correct quotes
// const MotivationalQuote = ({ role }) => {
//     const quoteList = role === 'Teacher' ? quotes.teacher : quotes.student;
    
//     const [currentQuote, setCurrentQuote] = React.useState(0);

//     React.useEffect(() => {
//         const timer = setInterval(() => {
//             setCurrentQuote(prev => (prev + 1) % quoteList.length);
//         }, 5000);
//         return () => clearInterval(timer);
//     }, [quoteList.length]);

//     return (
//         <div className="flex flex-col justify-center bg-blue-500 p-8 sm:p-12 relative md:rounded-l-none rounded-b-2xl">
//             <div className="absolute top-4 left-4 sm:top-6 sm:left-6 text-white opacity-20 hidden md:block">
//                 <h1 className="text-xl sm:text-2xl font-bold">Learnify.</h1>
//             </div>
//             <p className="text-2xl sm:text-3xl font-bold text-white italic z-10">"{quoteList[currentQuote].quote}"</p>
//             <p className="text-right mt-4 text-yellow-300 italic text-xl font-semibold z-10">- {quoteList[currentQuote].author}</p>
//         </div>
//     );
// };


// const LoginPage = ({ role }) => (
//     <div className="flex flex-col min-h-screen bg-gray-100">
//         <main className="flex-grow flex items-center justify-center p-4">
//             <div className="relative w-full max-w-4xl">
//                 <div className="absolute inset-0 bg-black rounded-2xl transform translate-x-1 translate-y-1"></div>
//                 <div className="relative bg-white border-2 border-black rounded-2xl overflow-hidden flex flex-col md:grid md:grid-cols-2">
//                     <div className="p-8 sm:p-12 flex flex-col justify-center order-first">
//                         <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center">{role} Login</h2>
//                         <form className="space-y-6">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//                                 <input type="email" className="block w-full px-4 py-3 border-2 border-black rounded-md" placeholder="you@example.com" />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//                                 <input type="password" className="block w-full px-4 py-3 border-2 border-black rounded-md" placeholder="••••••••" />
//                             </div>
//                             <Button className="w-full !py-3">Sign In</Button>
//                         </form>
//                     </div>
//                     {/* The role is passed down to the MotivationalQuote component */}
//                     <MotivationalQuote role={role} />
//                 </div>
//             </div>
//         </main>
//     </div>
// );

// export default LoginPage;




import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { quotes } from '../data/quotes';

// A small component for the rotating quotes
const MotivationalQuote = ({ role }) => {
    const quoteList = role === 'Teacher' ? quotes.teacher : quotes.student;
    
    const [currentQuote, setCurrentQuote] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentQuote(prev => (prev + 1) % quoteList.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [quoteList.length]);

    return (
        <div className="flex flex-col justify-center bg-blue-500 p-8 sm:p-12 relative md:rounded-l-none rounded-b-2xl">
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 text-white opacity-20 hidden md:block">
                <h1 className="text-xl sm:text-2xl font-bold">Learnify.</h1>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white italic z-10">"{quoteList[currentQuote].quote}"</p>
            <p className="text-right mt-4 text-yellow-300 font-semibold z-10">- {quoteList[currentQuote].author}</p>
        </div>
    );
};

const LoginPage = ({ role }) => {
    // Determine the correct dashboard path based on the role
    const dashboardPath = role === 'Student' ? '/student-dashboard' : '/teacher-dashboard';

    return (
        <main className="flex-grow flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl">
                <div className="absolute inset-0 bg-black rounded-2xl transform translate-x-1 translate-y-1"></div>
                <div className="relative bg-white border-2 border-black rounded-2xl overflow-hidden flex flex-col md:grid md:grid-cols-2">
                    <div className="p-8 sm:p-12 flex flex-col justify-center order-first">
                        <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center">{role} Login</h2>
                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input type="email" required className="block w-full px-4 py-3 border-2 border-black rounded-md" placeholder="you@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <input type="password" required className="block w-full px-4 py-3 border-2 border-black rounded-md" placeholder="••••••••" />
                            </div>
                            {/* The Sign In button now uses a Link to navigate */}
                            <Link to={dashboardPath}>
                                <Button type="button" className="w-full !py-3">Sign In</Button>
                            </Link>
                        </form>
                         <div className="mt-8 text-center max-w-xs mx-auto w-full">
                            <Link to="/">
                                <Button className="py-2 px-4 text-sm w-full">← Back to Home</Button>
                            </Link>
                        </div>
                    </div>
                    <MotivationalQuote role={role} />
                </div>
            </div>
        </main>
    );
};

export default LoginPage;
