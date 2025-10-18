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
        element={!isAuthenticated ? <Login /> : <Main />}
      />
      <Route 
        path="/register" 
        element={!isAuthenticated ? <Register /> : <Main />}
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
      
      {/* Маршруты для модальных окон */}
      <Route
        path="/new-card"
        element={
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        }
      />
      <Route
        path="/card/:id"
        element={
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        }
      />
      <Route
        path="/exit"
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