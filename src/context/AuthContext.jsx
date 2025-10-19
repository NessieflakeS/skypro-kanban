import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    const token = localStorage.getItem('token');
    
    if (savedUser && token) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      setError('');
      const response = await authAPI.login(credentials);
      
      const userData = {
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        token: response.token
      };

      setCurrentUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));
      localStorage.setItem('token', response.token);
      
      return response;
    } catch (err) {
      setError(err.message || 'Ошибка входа');
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      setError('');
      const response = await authAPI.register(userData);
      
      const newUser = {
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        token: response.token
      };

      setCurrentUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      localStorage.setItem('token', response.token);
      
      return response;
    } catch (err) {
      setError(err.message || 'Ошибка регистрации');
      throw err;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setError('');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    error,
    setError,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};