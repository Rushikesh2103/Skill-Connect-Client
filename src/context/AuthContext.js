import React, { createContext, useState, useEffect } from 'react';
import { loginUser } from '../services/api';
import { jwtDecode } from 'jwt-decode'; // Correctly importing jwtDecode
import axios from 'axios'; // Ensure axios is imported

export const AuthContext = createContext();

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
      setAuthToken(token);
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await loginUser(credentials);
      const { token } = response.data;
      localStorage.setItem('token', token);
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
      setAuthToken(token);
      setError(null);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
