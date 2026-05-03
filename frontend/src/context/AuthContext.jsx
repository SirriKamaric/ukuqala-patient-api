import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 1. Initialize state directly from localStorage
  // This avoids the "cascading render" and the ESLint warning
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser && savedUser !== "undefined") {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        console.error("Failed to parse user data", e);
        return null;
      }
    }
    return null;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Now the effect only handles the loading finish
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);