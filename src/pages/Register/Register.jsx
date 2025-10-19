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
  
  const { register, error, setError } = useAuth();
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
                placeholder="Введите пароль"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                required
                minLength={6}
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