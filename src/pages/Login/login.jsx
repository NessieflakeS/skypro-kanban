import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '../../GlobalStyles.styled';
import { lightTheme } from '../../theme';
import {
  LoginPage,
  LoginContainer,
  LoginTitle,
  LoginForm,
  FormGroup,
  FormLabel,
  FormInput,
  SubmitButton,
  RegisterLink,
  ErrorMessage
} from './Login.styled';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState('');
  
  const { login, error, setError } = useAuth();
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (localError) setLocalError('');
    if (error) setError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (localError) setLocalError('');
    if (error) setError('');
  };

  const validateForm = () => {
    if (!email.trim()) {
      setLocalError('Введите email');
      return false;
    }
    if (!email.includes('@')) {
      setLocalError('Введите корректный email');
      return false;
    }
    if (!password) {
      setLocalError('Введите пароль');
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
      await login({ email, password });
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <LoginPage>
        <LoginContainer>
          <LoginTitle>Вход в аккаунт</LoginTitle>
          
          <LoginForm onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormInput
                type="email"
                id="email"
                placeholder="Введите ваш email"
                value={email}
                onChange={handleEmailChange}
                disabled={isLoading}
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="password">Пароль</FormLabel>
              <FormInput
                type="password"
                id="password"
                placeholder="Введите ваш пароль"
                value={password}
                onChange={handlePasswordChange}
                disabled={isLoading}
                required
              />
            </FormGroup>

            {(error || localError) && <ErrorMessage>{error || localError}</ErrorMessage>}

            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? 'Вход...' : 'Войти'}
            </SubmitButton>
          </LoginForm>

          <RegisterLink>
            Еще нет аккаунта?
            <Link to="/register">Зарегистрироваться</Link>
          </RegisterLink>
        </LoginContainer>
      </LoginPage>
    </ThemeProvider>
  );
};

export default Login;