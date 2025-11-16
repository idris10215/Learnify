import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { signIn, confirmSignIn, fetchAuthSession, signOut, updateUserAttributes } from 'aws-amplify/auth';
import Button from '../components/ui/Button';
import { quotes } from '../data/quotes';

const MotivationalQuote = ({ role }) => {
    const quoteList = role === 'Teacher' ? quotes.teacher : quotes.student;
    const [currentQuote, setCurrentQuote] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentQuote(prev => (prev + 1) % quoteList.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [quoteList.length]);

    if (!quoteList || quoteList.length === 0) return null;

    return (
        <div className="flex-col justify-center bg-blue-500 p-8 hidden md:flex">
            <p className="text-2xl font-bold text-white italic">"{quoteList[currentQuote].quote}"</p>
            <p className="text-right mt-4 text-yellow-300 italic">- {quoteList[currentQuote].author}</p>
        </div>
    );
};

const NewPasswordForm = ({ handleNewPasswordSubmit, newPassword, setNewPassword,name, setName, loading }) => (
    <form className="space-y-6" onSubmit={handleNewPasswordSubmit}>
        <div>
            <label className="block font-medium text-gray-700 mb-1">Your Full Name</label>
            <input
                type="text"
                required
                className="block w-full px-4 py-3 border-2 border-black rounded-md"
                placeholder="Enter your full name"
                value={name} // Bind to name state
                onChange={(e) => setName(e.target.value)} // Update name state
            />
        </div>
        <div>
            <label className="block font-medium text-gray-700 mb-1">New Permanent Password</label>
            <input
                type="password"
                required
                className="block w-full px-4 py-3 border-2 border-black rounded-md"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
        </div>
        <Button type="submit" className="w-full !py-3" disabled={loading}>
            {loading ? 'Setting Password...' : 'Set Password & Sign In'}
        </Button>
    </form>
);

const LoginForm = ({ handleSignIn, email, setEmail, password, setPassword, loading }) => (
    <form className="space-y-6" onSubmit={handleSignIn}>
        <div>
            <label className="block font-medium text-gray-700 mb-1">Email Address</label>
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
            <label className="block font-medium text-gray-700 mb-1">Password</label>
            <input
                type="password"
                required
                className="block w-full px-4 py-3 border-2 border-black rounded-md"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <Button type="submit" className="w-full !py-3" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
        </Button>
    </form>
);

const LoginPage = ({ role }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState(location.state?.email || '');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newName, setNewName] = useState('');
    
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

            if (newName) {
                await updateUserAttributes({
                    userAttributes: {
                        name: newName,
                    },
                });
            }

            await checkRoleAndRedirect();
        } catch (error) {
            setError(error.message || 'Failed to set new password.');
        }
        setLoading(false);
    };

    // --- THIS IS THE CORRECTED FUNCTION ---
    const checkRoleAndRedirect = async () => {
        try {
            const session = await fetchAuthSession();
            const userGroups = session.tokens.accessToken.payload['cognito:groups'] || [];
            const expectedGroup = role === 'Student' ? 'Students' : 'Teachers';

            if (userGroups.includes(expectedGroup)) {
                // If the role is correct, just navigate. Let the route guards handle the rest.
                navigate(dashboardPath);
            } else {
                // If the role is INCORRECT, we sign the user out to prevent a confusing state,
                // and then navigate them to the correct login page with a helpful message.
                await signOut(); 
                if (userGroups.includes('Teachers')) {
                    navigate('/teacher-login', { state: { message: 'It looks like you have a teacher account. Please log in here.', email } });
                } else if (userGroups.includes('Students')) {
                    navigate('/student-login', { state: { message: 'It looks like you have a student account. Please log in here.', email } });
                } else {
                    // This case is for users with no assigned group.
                    setError(`Access Denied: You do not have a valid role assigned.`);
                }
            }
        } catch (sessionError) {
            setError('Could not verify your session. Please try logging in again.');
        }
    };

    return (
        <main className="flex-grow flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl">
                <div className="absolute inset-0 bg-black rounded-2xl transform translate-x-1 translate-y-1"></div>
                <div className="relative bg-white border-2 border-black rounded-2xl overflow-hidden grid md:grid-cols-2">
                    <div className="p-12 flex flex-col justify-center">
                        {infoMessage && <p className="text-green-700 bg-green-100 p-3 rounded-md text-sm text-center mb-4">{infoMessage}</p>}
                        {error && <p className="text-red-500 bg-red-100 p-3 rounded-md text-sm text-center mb-4">{error}</p>}

                        {requiresNewPassword ? (
                            <>
                                <h2 className="text-4xl font-extrabold mb-8 text-center">Set New Password & Name</h2>
                                <NewPasswordForm 
                                    handleNewPasswordSubmit={handleNewPasswordSubmit}
                                    newPassword={newPassword}
                                    setNewPassword={setNewPassword}
                                    name={newName}
                                    setName={setNewName}
                                    loading={loading}
                                />
                            </>
                        ) : (
                            <>
                                <h2 className="text-4xl font-extrabold mb-8 text-center">{role} Login</h2>
                                <LoginForm 
                                    handleSignIn={handleSignIn}
                                    email={email}
                                    setEmail={setEmail}
                                    password={password}
                                    setPassword={setPassword}
                                    loading={loading}
                                />
                            </>
                        )}
                    </div>
                    <MotivationalQuote role={role} />
                </div>
            </div>
        </main>
    );
};

export default LoginPage;