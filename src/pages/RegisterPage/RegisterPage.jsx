import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  RegisterContainer,
  RegisterForm,
  RegisterTitle,
  RegisterInput,
  RegisterButton,
  RegisterLink,
  ErrorMessage
} from './RegisterPage.styled';

const RegisterPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Все поля обязательны для заполнения');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    // Имитация успешной регистрации и входа
    onLogin();
    setError('');
    navigate('/');
  };

  return (
    <RegisterContainer>
      <RegisterForm onSubmit={handleSubmit}>
        <RegisterTitle>Регистрация</RegisterTitle>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <RegisterInput
          type="text"
          name="name"
          placeholder="Имя"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        
        <RegisterInput
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        
        <RegisterInput
          type="password"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        
        <RegisterInput
          type="password"
          name="confirmPassword"
          placeholder="Подтвердите пароль"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
        />
        
        <RegisterButton type="submit">
          Зарегистрироваться
        </RegisterButton>
        
        <RegisterLink>
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </RegisterLink>
      </RegisterForm>
    </RegisterContainer>
  );
};

export default RegisterPage;