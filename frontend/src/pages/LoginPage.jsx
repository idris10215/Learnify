import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
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

const NewPasswordForm = ({ handleNewPasswordSubmit, newPassword, setNewPassword, name, setName, loading }) => (
    <form className="space-y-6" onSubmit={handleNewPasswordSubmit}>
        <div>
            <label className="block font-medium text-gray-700 mb-1">Your Full Name</label>
            <input
                type="text"
                required
                className="block w-full px-4 py-3 border-2 border-black rounded-md"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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

// --- LoginPage Component (Main Changes Here) ---

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

    // This useEffect will clear infoMessage after a short delay
    useEffect(() => {
        if (infoMessage) {
            const timer = setTimeout(() => setInfoMessage(''), 5000);
            return () => clearTimeout(timer);
        }
    }, [infoMessage]);


    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setInfoMessage(''); // Clear previous info messages on new attempt
        try {
            const { isSignedIn, nextStep } = await signIn({ username: email, password });

            if (isSignedIn) {
                // If signed in, check role and redirect.
                // Ampliy's signIn handles session replacement automatically.
                await verifyRoleAndNavigate(); 
            } else if (nextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
                setRequiresNewPassword(true);
            }
            // Add other nextStep handling if needed (e.g., MFA)
        } catch (error) {
            // Handle common Amplify errors specifically
            if (error.name === 'UserNotFoundException' || error.name === 'NotAuthorizedException') {
                setError('Incorrect email or password.');
            } else {
                setError(error.message || 'An unknown error occurred during sign in.');
            }
        } finally {
            setLoading(false);
        }
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

            // After setting new password, verify role and navigate
            await verifyRoleAndNavigate();
        } catch (error) {
            setError(error.message || 'Failed to set new password.');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Verifies the user's group/role after successful authentication
     * and navigates to the appropriate dashboard. If the role doesn't match
     * the intended login page's role, it gives an error but keeps them logged in.
     */
    const verifyRoleAndNavigate = async () => {
        try {
            const session = await fetchAuthSession();
            const userGroups = session.tokens.accessToken.payload['cognito:groups'] || [];
            const expectedGroup = role === 'Student' ? 'Students' : 'Teachers';

            if (userGroups.includes(expectedGroup)) {
                // User has the correct group for this login page's role, navigate to their dashboard.
                navigate(dashboardPath, { replace: true });
            } else {
                // User logged in, but their group does not match the role of THIS login page.
                // E.g., they logged into /teacher-login with student credentials.
                // DO NOT sign out. Just show an error and let them decide.
                let actualRole = 'unknown';
                if (userGroups.includes('Students')) actualRole = 'Student';
                else if (userGroups.includes('Teachers')) actualRole = 'Teacher';

                setError(`You logged in successfully, but your account is for a ${actualRole}. Please use the ${actualRole} login page.`);
                // Optionally, navigate them to their OWN dashboard, or keep them on the login page
                // to explicitly choose the correct login path.
                // For simplicity as per your request, we just show an error on this page.
                // The 'withAuth' HOC will still have their correct role stored.
            }
        } catch (sessionError) {
            console.error('Error fetching session after login:', sessionError);
            setError('Could not verify your account role. Please try logging in again.');
            // A session error after successful signIn is unusual; force signOut.
            try { await signOut(); } catch (e) { /* ignore */ }
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
                                {/* Optional: Link to switch to the other login page */}
                                <div className="mt-6 text-center text-gray-600">
                                    {role === 'Student' ? (
                                        <p>Are you a teacher? <Link to="/teacher-login" className="text-blue-600 hover:underline">Log in here.</Link></p>
                                    ) : (
                                        <p>Are you a student? <Link to="/student-login" className="text-blue-600 hover:underline">Log in here.</Link></p>
                                    )}
                                </div>
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