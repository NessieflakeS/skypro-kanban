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
        element={isAuthenticated ? <Main /> : <Login />} 
      />
      <Route 
        path="/register" 
        element={isAuthenticated ? <Main /> : <Register />} 
      />
      
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        }
      >
        {/* Маршруты для модальных окон */}
        <Route path="new-card" element={null} /> {/* Рендерится в Main */}
        <Route path="card/:id" element={null} /> {/* Рендерится в Main */}
        <Route path="exit" element={null} /> {/* Рендерится в Main */}
      </Route>
      
      {/* Страница 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;