import React, { useState, useEffect } from 'react';
import { Hub } from 'aws-amplify/utils';
import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth';

// This is a Higher-Order Component (HOC). It's a function that takes a component
// (our main App) and returns a new component with the authentication logic.
const withAuth = (WrappedComponent) => {
  return (props) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // This function checks for an active session with AWS Cognito.
    const checkUser = async () => {
      setLoading(true);
      try {
        const session = await fetchAuthSession();
        const currentUser = await getCurrentUser();
        const groups = session.tokens.accessToken.payload['cognito:groups'] || [];
        
        // We store the complete user object, including their role.
        setUser({ ...currentUser, role: groups[0] }); 
      } catch (error) {
        // If there's any error, we know the user is logged out.
        setUser(null);
      }
      setLoading(false);
    };

    useEffect(() => {
      // The Hub listener is our real-time "security radio".
      const hubListener = (data) => {
        switch (data.payload.event) {
          case 'signedIn':
            checkUser();
            break;
          case 'signedOut':
            setUser(null);
            break;
        }
      };

      const unsubscribe = Hub.listen('auth', hubListener);
      checkUser(); // Check user status on initial load.

      // Cleanup the listener when the app closes.
      return () => unsubscribe();
    }, []);

    if (loading) {
      return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    // Render the main App component, passing the user state down as a prop.
    return <WrappedComponent {...props} user={user} />;
  };
};

export default withAuth;

