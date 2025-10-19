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
  });
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState('');
  
  const { register, error, setError } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (localError) setLocalError('');
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setLocalError('Введите имя');
      return false;
    }
    if (!formData.email.trim()) {
      setLocalError('Введите email');
      return false;
    }
    if (!formData.email.includes('@')) {
      setLocalError('Введите корректный email');
      return false;
    }
    if (formData.password.length < 6) {
      setLocalError('Пароль должен содержать минимум 6 символов');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLocalError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await register(formData);
      navigate('/');
    } catch (err) {
      console.error('Registration error:', err);
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
                required
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
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="password">Пароль</FormLabel>
              <FormInput
                type="password"
                id="password"
                name="password"
                placeholder="Введите пароль (минимум 6 символов)"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                required
                minLength={6}
              />
            </FormGroup>

            {(error || localError) && (
              <ErrorMessage>{error || localError}</ErrorMessage>
            )}

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