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
    login: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState('');
  
  const { register, error: authError } = useAuth();
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
    
    if (!formData.login?.trim() || !formData.password?.trim() || !formData.name?.trim()) {
      setLocalError('Все поля обязательны для заполнения');
      return;
    }

    if (formData.login.trim().length === 0 || formData.password.trim().length === 0 || formData.name.trim().length === 0) {
      setLocalError('Поля не могут состоять только из пробелов');
      return;
    }

    if (formData.password.length < 6) {
      setLocalError('Пароль должен содержать минимум 6 символов');
      return;
    }

    setIsLoading(true);

    try {
      const result = await register(formData);
      
      if (result.success) {
        navigate('/');
      } else {
        setLocalError(result.error || 'Ошибка при регистрации');
      }
    } catch (err) {
      setLocalError('Ошибка при регистрации: ' + err.message);
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
                placeholder="Введите пароль (минимум 6 символов)"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                required
                minLength="6"
              />
            </FormGroup>

            {(localError || authError) && (
              <ErrorMessage>{localError || authError}</ErrorMessage>
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