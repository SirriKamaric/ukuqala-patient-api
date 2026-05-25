import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';

export function AuthProvider({ children }) {

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // Load saved auth ONCE
  useEffect(() => {

    const savedToken =
      localStorage.getItem('ukuqala_token');

    const savedUser =
      localStorage.getItem('ukuqala_user');

    if (savedToken) {
      setToken(savedToken);
    }

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        setUser(null);
      }
    }

  }, []);

  const login = (tokenValue, userData) => {

    const updatedUser = {
      ...userData,
      role: userData?.role || 'patient'
    };

    localStorage.setItem(
      'ukuqala_token',
      tokenValue
    );

    localStorage.setItem(
      'ukuqala_user',
      JSON.stringify(updatedUser)
    );

    setToken(tokenValue);
    setUser(updatedUser);
  };

  const logout = () => {

    localStorage.removeItem(
      'ukuqala_token'
    );

    localStorage.removeItem(
      'ukuqala_user'
    );

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        isAdmin:
          user?.role === 'admin',
        isDoctor:
          user?.role === 'doctor',
        isPatient:
          user?.role === 'patient'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}