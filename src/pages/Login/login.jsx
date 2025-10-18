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
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!email || !password) {
        throw new Error('Все поля обязательны для заполнения');
      }

      if (!email.includes('@')) {
        throw new Error('Введите корректный email');
      }

      const userData = {
        id: 1,
        name: 'Ivan Ivanov',
        email: email,
        token: 'fake-jwt-token'
      };

      login(userData);
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
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="password">Пароль</FormLabel>
              <FormInput
                type="password"
                id="password"
                placeholder="Введите ваш пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </FormGroup>

            {error && <ErrorMessage>{error}</ErrorMessage>}

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