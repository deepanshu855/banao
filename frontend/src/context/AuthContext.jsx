import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCurrentUser, loginWithGoogle, logoutUser, demoGoogleLogin } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    setIsLoading(true);
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (err) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLoginWithGoogle = () => {
    loginWithGoogle();
  };

  const handleDemoGoogleLogin = (customData) => {
    const loggedUser = demoGoogleLogin(customData);
    setUser(loggedUser);
    return loggedUser;
  };

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        loginWithGoogle: handleLoginWithGoogle,
        demoGoogleLogin: handleDemoGoogleLogin,
        logout: handleLogout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
