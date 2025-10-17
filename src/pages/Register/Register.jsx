import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '../../GlobalStyles.styled';
import { lightTheme } from '../../theme';
import {
  RegisterPage,
  RegisterContainer,
  RegisterTitle,
  RegisterForm,
  FormGroup,
  FormLabel,
  FormInput,
  SubmitButton,
  LoginLink,
  ErrorMessage
} from './Register.styled';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        throw new Error('Все поля обязательны для заполнения');
      }

      if (!formData.email.includes('@')) {
        throw new Error('Введите корректный email');
      }

      if (formData.password.length < 6) {
        throw new Error('Пароль должен содержать минимум 6 символов');
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error('Пароли не совпадают');
      }

      const userData = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        token: 'fake-jwt-token'
      };

      register(userData);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <RegisterPage>
        <RegisterContainer>
          <RegisterTitle>Регистрация</RegisterTitle>
          
          <RegisterForm onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel htmlFor="name">Имя</FormLabel>
              <FormInput
                type="text"
                id="name"
                name="name"
                placeholder="Введите ваше имя"
                value={formData.name}
                onChange={handleChange}
                disabled={isLoading}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormInput
                type="email"
                id="email"
                name="email"
                placeholder="Введите ваш email"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="password">Пароль</FormLabel>
              <FormInput
                type="password"
                id="password"
                name="password"
                placeholder="Введите пароль"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="confirmPassword">Подтвердите пароль</FormLabel>
              <FormInput
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Подтвердите пароль"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isLoading}
              />
            </FormGroup>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
            </SubmitButton>
          </RegisterForm>

          <LoginLink>
            Уже есть аккаунт?
            <Link to="/login">Войти</Link>
          </LoginLink>
        </RegisterContainer>
      </RegisterPage>
    </ThemeProvider>
  );
};

export default Register;