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
  const [formData, setFormData] = useState({
    login: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState('');
  
  const { login, error: authError } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    if (localError) setLocalError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    
    if (!formData.login?.trim() || !formData.password?.trim()) {
    setLocalError('Все поля обязательны для заполнения');
    return;
  }

  if (formData.login.trim().length === 0 || formData.password.trim().length === 0) {
    setLocalError('Поля не могут состоять только из пробелов');
    return;
  }

  setIsLoading(true);

    try {
      const result = await login(formData);
      
      if (result.success) {
        navigate('/');
      } else {
        setLocalError(result.error || 'Ошибка при входе');
      }
    } catch (err) {
      setLocalError('Ошибка при входе: ' + err.message);
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
              <FormLabel htmlFor="login">Логин</FormLabel>
              <FormInput
                type="text"
                id="login"
                name="login"
                placeholder="Введите ваш логин"
                value={formData.login}
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
                placeholder="Введите ваш пароль"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </FormGroup>

            {(localError || authError) && (
              <ErrorMessage>{localError || authError}</ErrorMessage>
            )}

            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? 'Вход...' : 'Войти'}
            </SubmitButton>
          </LoginForm>

          <RegisterLink>
            Еще нет аккаунта?
            <Link to="/register">Зарегистрироваться</Link>
          </RegisterLink>

          <div style={{ 
            marginTop: '20px', 
            padding: '10px', 
            backgroundColor: '#f0f8ff', 
            borderRadius: '4px',
            fontSize: '12px',
            color: '#666'
          }}>
            <strong>Для тестирования:</strong><br />
            Логин: admin<br />
            Пароль: admin
          </div>
        </LoginContainer>
      </LoginPage>
    </ThemeProvider>
  );
};

export default Login;