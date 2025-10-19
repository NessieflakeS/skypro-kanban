import { useState, useEffect } from 'react'; 
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import {
  PopupContainer,
  PopupOverlay,
  PopupBlock,
  PopupTitle,
  PopupForm,
  ButtonGroup,
  ExitButton
} from './PopupExit.styled';

const PopupExit = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsOpen(location.pathname === '/exit');
  }, [location]);

  const handleExitYes = (e) => {
    e.preventDefault();
    logout();
    navigate('/login');
  };

  const handleExitNo = (e) => {
    e.preventDefault();
    navigate('/');
  };

  if (!isOpen) {
    return null;
  }

  return (
    <PopupContainer $isOpen={isOpen}>
      <PopupOverlay onClick={handleExitNo}>
        <PopupBlock onClick={(e) => e.stopPropagation()}>
          <PopupTitle>
            <h2>Выйти из аккаунта?</h2>
          </PopupTitle>
          <PopupForm id="formExit">
            <ButtonGroup>
              <ExitButton 
                $variant="yes" 
                onClick={handleExitYes}
              >
                Да, выйти
              </ExitButton>
              <ExitButton 
                $variant="no" 
                onClick={handleExitNo}
              >
                Нет, остаться
              </ExitButton>
            </ButtonGroup>
          </PopupForm>
        </PopupBlock>
      </PopupOverlay>
    </PopupContainer>
  );
};

export default PopupExit;