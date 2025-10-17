import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  useEffect(() => {
    const handleHashChange = () => {
      setIsOpen(window.location.hash === '#popExit');
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleExitYes = (e) => {
    e.preventDefault();
    logout();
    navigate('/login');
    window.location.hash = '';
  };

  const handleExitNo = (e) => {
    e.preventDefault();
    window.location.hash = '';
  };

  if (!isOpen) {
    return null;
  }

  return (
    <PopupContainer isOpen={isOpen}>
      <PopupOverlay>
        <PopupBlock>
          <PopupTitle>
            <h2>Выйти из аккаунта?</h2>
          </PopupTitle>
          <PopupForm id="formExit">
            <ButtonGroup>
              <ExitButton 
                variant="yes" 
                onClick={handleExitYes}
              >
                Да, выйти
              </ExitButton>
              <ExitButton 
                variant="no" 
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