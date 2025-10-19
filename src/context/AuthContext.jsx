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
      console.log('Login attempt with:', { 
        login: credentials.email, 
        password: credentials.password 
      });

      const response = await authAPI.login({
        login: credentials.email, 
        password: credentials.password
      });
      
      console.log('Login response:', response);

      const userData = {
        id: response.user?.id || Date.now(),
        name: response.user?.name || credentials.email.split('@')[0],
        email: credentials.email,
        token: response.token
      };

      setCurrentUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));
      localStorage.setItem('token', response.token);
      
      return response;
    } catch (err) {
      console.error('Login error details:', err);
      let errorMessage = 'Ошибка входа';
      
      if (err.message.includes('400')) {
        errorMessage = 'Неверный email или пароль';
      } else if (err.message.includes('500')) {
        errorMessage = 'Ошибка сервера. Попробуйте позже.';
      } else {
        errorMessage = err.message || 'Ошибка входа';
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const register = async (userData) => {
    try {
      setError('');
      console.log('Register attempt with:', { 
        login: userData.email, 
        name: userData.name, 
        password: userData.password 
      });

      const response = await authAPI.register({
        login: userData.email, 
        name: userData.name,
        password: userData.password
      });
      
      console.log('Register response:', response);

      const newUser = {
        id: response.user?.id || Date.now(),
        name: response.user?.name || userData.name,
        email: userData.email,
        token: response.token
      };

      setCurrentUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      localStorage.setItem('token', response.token);
      
      return response;
    } catch (err) {
      console.error('Register error details:', err);
      let errorMessage = 'Ошибка регистрации';
      
      if (err.message.includes('409')) {
        errorMessage = 'Пользователь с таким email уже существует';
      } else if (err.message.includes('400')) {
        errorMessage = 'Некорректные данные для регистрации';
      } else if (err.message.includes('500')) {
        errorMessage = 'Ошибка сервера. Попробуйте позже.';
      } else {
        errorMessage = err.message || 'Ошибка регистрации';
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
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