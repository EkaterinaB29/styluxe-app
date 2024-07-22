// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    const storedUser = sessionStorage.getItem('user');
    console.log('AuthProvider useEffect: Retrieved token from sessionStorage:', storedToken);
    console.log('AuthProvider useEffect: Retrieved user from sessionStorage:', storedUser);

    if (storedToken) {
      setToken(storedToken);
    }

    try {
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      setUser(parsedUser);
    } catch (error) {
      console.error('Error parsing user from sessionStorage:', error);
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
