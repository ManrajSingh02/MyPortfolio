/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react';
import api from '../services/api.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('portfolio_token'));
  const [admin, setAdmin] = useState(() => JSON.parse(localStorage.getItem('portfolio_admin') || 'null'));

  const login = async (values) => {
    const { data } = await api.post('/auth/login', values);
    localStorage.setItem('portfolio_token', data.token);
    localStorage.setItem('portfolio_admin', JSON.stringify(data.admin));
    setToken(data.token);
    setAdmin(data.admin);
  };

  const logout = () => {
    localStorage.removeItem('portfolio_token');
    localStorage.removeItem('portfolio_admin');
    setToken(null);
    setAdmin(null);
  };

  const value = useMemo(() => ({ token, admin, login, logout, isAuthenticated: Boolean(token) }), [token, admin]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
