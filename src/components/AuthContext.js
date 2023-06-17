import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // New state for admin check

  // Load the initial state from localStorage
  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    const storedIsAdmin = localStorage.getItem('isAdmin'); // Load the stored isAdmin value

    if (storedIsLoggedIn) {
      setIsLoggedIn(JSON.parse(storedIsLoggedIn));
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedIsAdmin) {
      setIsAdmin(JSON.parse(storedIsAdmin)); // Set the isAdmin state from stored value
    }
  }, []);

  // Save the state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('isAdmin', JSON.stringify(isAdmin)); // Save the isAdmin state
  }, [isLoggedIn, user, token, isAdmin]); // Include isAdmin in the dependency array

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, user, setUser, token, setToken, isAdmin, setIsAdmin }} // Include isAdmin and setIsAdmin in the context value
    >
      {children}
    </AuthContext.Provider>
  );
};