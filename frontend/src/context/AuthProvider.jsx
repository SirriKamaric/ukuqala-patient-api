import { useState } from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    const savedUser = localStorage.getItem('user');
    let user = null;

    if (savedUser && savedUser !== "undefined") {
      try {
        user = JSON.parse(savedUser);
      } catch (e) {
        console.error("Failed to parse user data", e);
      }
    }

    return { user, loading: false };
  });

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setAuthState({ user: userData, loading: false });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthState({ user: null, loading: false });
  };

  return (
    <AuthContext.Provider value={{
      user: authState.user,
      loading: authState.loading,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};