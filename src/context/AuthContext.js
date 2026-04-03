import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (mock token)
    const token = localStorage.getItem('auth_token');
    if (token) {
      setUser({ name: 'Alex Johnson', email: 'alex@example.com' });
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock login: accept any non-empty email/password
    if (email && password) {
      localStorage.setItem('auth_token', 'mock_token');
      setUser({ name: 'Alex Johnson', email });
      return true;
    }
    return false;
  };

  const signup = (name, email, password) => {
    // Mock signup: store user
    if (name && email && password) {
      localStorage.setItem('auth_token', 'mock_token');
      setUser({ name, email });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);