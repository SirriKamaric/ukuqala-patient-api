import { useState } from 'react';
import { AuthContext } from './AuthContext';

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(
    localStorage.getItem('ukuqala_token')
  );
  const [user, setUserState] = useState(() => {
    const stored = localStorage.getItem('ukuqala_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = (tokenValue, userData) => {
    localStorage.setItem('ukuqala_token', tokenValue);
    localStorage.setItem('ukuqala_user', JSON.stringify(userData));
    setTokenState(tokenValue);
    setUserState(userData);
  };

  const logout = () => {
    localStorage.removeItem('ukuqala_token');
    localStorage.removeItem('ukuqala_user');
    setTokenState(null);
    setUserState(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}