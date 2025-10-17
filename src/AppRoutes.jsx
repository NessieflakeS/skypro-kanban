import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import LoginPage from './pages/LoginPage/loginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import MainPage from './pages/MainPage/MainPage';
import CardPage from './pages/CardPage/CardPage';
import AddCardPage from './pages/AddCardPage/AddCardPage';
import ExitPage from './pages/ExitPage/ExitPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

const AppRoutes = ({ 
  isAuth, 
  isDarkTheme, 
  toggleTheme, 
  onLogin, 
  onLogout 
}) => {
  return (
    <Routes>
      {/* Публичные маршруты */}
      <Route 
        path="/login" 
        element={
          <LoginPage onLogin={onLogin} />
        } 
      />
      <Route 
        path="/register" 
        element={
          <RegisterPage onLogin={onLogin} />
        } 
      />
      
      {/* Защищенные маршруты */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute isAuth={isAuth}>
            <MainPage 
              isDarkTheme={isDarkTheme}
              toggleTheme={toggleTheme}
              onLogout={onLogout}
            />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/card/:id" 
        element={
          <ProtectedRoute isAuth={isAuth}>
            <CardPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/add" 
        element={
          <ProtectedRoute isAuth={isAuth}>
            <AddCardPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/exit" 
        element={
          <ProtectedRoute isAuth={isAuth}>
            <ExitPage onLogout={onLogout} />
          </ProtectedRoute>
        } 
      />
      
      {/* Страница 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;