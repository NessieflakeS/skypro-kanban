import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ExitContainer,
  ExitContent,
  ExitTitle,
  ExitMessage,
  ExitButtons,
  ExitButton
} from './ExitPage.styled';

const ExitPage = ({ onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    onLogout();
  }, [onLogout]);

  const handleStay = () => {
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <ExitContainer>
      <ExitContent>
        <ExitTitle>Выход из аккаунта</ExitTitle>
        <ExitMessage>
          Вы успешно вышли из аккаунта. Хотите войти снова или остаться на сайте?
        </ExitMessage>
        <ExitButtons>
          <ExitButton onClick={handleLogin} variant="primary">
            Войти снова
          </ExitButton>
          <ExitButton onClick={handleStay} variant="secondary">
            Остаться на сайте
          </ExitButton>
        </ExitButtons>
      </ExitContent>
    </ExitContainer>
  );
};

export default ExitPage;