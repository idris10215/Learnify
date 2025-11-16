// frontend/src/components/auth/withAuth.jsx - (The Brain)
import React, { useState, useEffect } from 'react';
import { Hub } from 'aws-amplify/utils';
import { fetchAuthSession, getCurrentUser, signOut } from 'aws-amplify/auth';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const [user, setUser] = useState(null); // Holds { username, userId, email, role, groups } or null
    const [loading, setLoading] = useState(true);

    const checkUser = async () => {
      setLoading(true);
      try {
        const session = await fetchAuthSession(); // Checks for active session tokens
        const currentUser = await getCurrentUser(); // Gets basic user info (username, userId)
        const groups = session.tokens.accessToken.payload['cognito:groups'] || []; // Gets user groups from token

        let userRole = null;
        if (groups.includes('Teachers')) {
          userRole = 'Teacher'; // Assign primary role
        } else if (groups.includes('Students')) {
          userRole = 'Student'; // Assign primary role
        }

        setUser({ 
          ...currentUser, 
          role: userRole, 
          groups: groups 
        }); 
      } catch (error) {
        setUser(null); // No active user
        try { await signOut(); } catch (e) { /* ignore error on sign out if already logged out */ }
      }
      setLoading(false);
    };

    useEffect(() => {
      const hubListener = (data) => {
        switch (data.payload.event) {
          case 'signedIn': checkUser(); break;
          case 'signedOut': setUser(null); break;
          case 'tokenRefresh_failure': 
            console.warn("Token refresh failed. Forcing sign out.");
            signOut(); 
            setUser(null); 
            break;
        }
      };

      const unsubscribe = Hub.listen('auth', hubListener);
      checkUser(); // Initial check on app load
      return () => unsubscribe(); // Clean up listener
    }, []);

    if (loading) {
      return <div className="flex items-center justify-center h-screen bg-[#33A1E0] text-white">Loading...</div>;
    }

    return <WrappedComponent {...props} user={user} />; // Pass the 'user' object to App.jsx
  };
};

export default withAuth;