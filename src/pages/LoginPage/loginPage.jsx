import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LoginContainer,
  LoginForm,
  LoginTitle,
  LoginInput,
  LoginButton,
  LoginLink,
  ErrorMessage
} from './LoginPage.styled';

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Простая валидация
    if (!formData.email || !formData.password) {
      setError('Все поля обязательны для заполнения');
      return;
    }

    // Имитация успешного входа
    onLogin();
    setError('');
    navigate('/');
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <LoginTitle>Вход в аккаунт</LoginTitle>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <LoginInput
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        
        <LoginInput
          type="password"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        
        <LoginButton type="submit">
          Войти
        </LoginButton>
        
        <LoginLink>
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </LoginLink>
      </LoginForm>
    </LoginContainer>
  );
};

export default LoginPage;