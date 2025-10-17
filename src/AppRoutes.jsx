import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Main from './pages/Main/Main';
import Login from './pages/Login/login';
import Register from './pages/Register/Register';
import NotFound from './pages/NotFound/NotFound';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Публичные маршруты */}
      <Route 
        path="/login" 
        element={
          isAuthenticated ? <Main /> : <Login />
        } 
      />
      <Route 
        path="/register" 
        element={
          isAuthenticated ? <Main /> : <Register />
        } 
      />
      
      {/* Защищенные маршруты */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        }
      />
      
      {/* Страница 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;