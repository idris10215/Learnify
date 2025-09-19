import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { signIn, confirmSignIn, fetchAuthSession, signOut } from 'aws-amplify/auth';
import Button from '../components/ui/Button';
import { quotes } from '../data/quotes';

// (MotivationalQuote component remains the same)
const MotivationalQuote = ({ role }) => {
    const quoteList = role === 'Teacher' ? quotes.teacher : quotes.student;
    
    const [currentQuote, setCurrentQuote] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentQuote(prev => (prev + 1) % quoteList.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [quoteList.length]);

    if (!quoteList || quoteList.length === 0) return null;

    return (
        <div className="flex flex-col justify-center bg-blue-500 p-8 sm:p-12 relative md:rounded-l-none rounded-b-2xl md:rounded-r-2xl">
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 text-white opacity-20 hidden md:block">
                <h1 className="text-xl sm:text-2xl font-bold">Learnify.</h1>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white italic z-10">"{quoteList[currentQuote].quote}"</p>
            <p className="text-right mt-4 text-yellow-300 italic text-xl font-semibold z-10">- {quoteList[currentQuote].author}</p>
        </div>
    );
};


const LoginPage = ({ role }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // State for the form
    const [email, setEmail] = useState(location.state?.email || '');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    
    // State for UI feedback
    const [error, setError] = useState('');
    const [infoMessage, setInfoMessage] = useState(location.state?.message || '');
    const [loading, setLoading] = useState(false);
    const [requiresNewPassword, setRequiresNewPassword] = useState(false);
    
    const dashboardPath = role === 'Student' ? '/student-dashboard' : '/teacher-dashboard';

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setInfoMessage('');
        try {
            const { isSignedIn, nextStep } = await signIn({ username: email, password });

            if (isSignedIn) {
                await checkRoleAndRedirect();
            } else if (nextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
                setRequiresNewPassword(true);
            }
        } catch (error) {
            setError(error.message || 'An unknown error occurred');
        }
        setLoading(false);
    };

    const handleNewPasswordSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await confirmSignIn({ challengeResponse: newPassword });
            await checkRoleAndRedirect();
        } catch (error) {
            setError(error.message || 'Failed to set new password.');
        }
        setLoading(false);
    };

    const checkRoleAndRedirect = async () => {
        const session = await fetchAuthSession();
        if (!session || !session.tokens || !session.tokens.accessToken) {
            await signOut();
            setError('Could not verify your session. Please try logging in again.');
            return;
        }

        const userGroups = session.tokens.accessToken.payload['cognito:groups'] || [];
        const expectedGroup = role === 'Student' ? 'Students' : 'Teachers';

        if (userGroups.includes(expectedGroup)) {
            navigate(dashboardPath);
        } else {
            // --- THIS IS THE NEW, INTELLIGENT REDIRECTION LOGIC ---
            await signOut(); 

            if (userGroups.includes('Teachers')) {
                navigate('/teacher-login', { 
                    state: { 
                        message: 'It looks like you have a teacher account. Please log in here.',
                        email: email
                    } 
                });
            } else if (userGroups.includes('Students')) {
                navigate('/student-login', { 
                    state: { 
                        message: 'It looks like you have a student account. Please log in here.',
                        email: email 
                    } 
                });
            } else {
                setError(`Access Denied: You do not have a valid role assigned.`);
            }
        }
    };

    return (
        <main className="flex-grow flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl">
                 <div className="absolute inset-0 bg-black rounded-2xl transform translate-x-1 translate-y-1"></div>
                 <div className="relative bg-white border-2 border-black rounded-2xl overflow-hidden flex flex-col md:grid md:grid-cols-2">
                    <div className="p-8 sm:p-12 flex flex-col justify-center order-first">
                        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-center">{role} Login</h2>
                        
                        {infoMessage && <p className="text-green-700 bg-green-100 p-3 rounded-md text-sm text-center mb-4">{infoMessage}</p>}
                        
                        {requiresNewPassword ? (
                            <form className="space-y-6" onSubmit={handleNewPasswordSubmit}>
                                 <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                    <input 
                                        type="password" 
                                        required 
                                        className="block w-full px-4 py-3 border-2 border-black rounded-md" 
                                        placeholder="Enter your new password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                                <Button type="submit" className="w-full !py-3" disabled={loading}>
                                    {loading ? 'Setting Password...' : 'Set Password & Sign In'}
                                </Button>
                            </form>
                        ) : (
                            <form className="space-y-6" onSubmit={handleSignIn}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input 
                                        type="email" 
                                        required 
                                        className="block w-full px-4 py-3 border-2 border-black rounded-md" 
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                    <input 
                                        type="password" 
                                        required 
                                        className="block w-full px-4 py-3 border-2 border-black rounded-md" 
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                                <Button type="submit" className="w-full !py-3" disabled={loading}>
                                    {loading ? 'Signing In...' : 'Sign In'}
                                </Button>
                            </form>
                        )}
                    </div>
                    <MotivationalQuote role={role} />
                </div>
            </div>
        </main>
    );
};

export default LoginPage;

