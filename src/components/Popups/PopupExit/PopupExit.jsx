import { useState, useEffect } from 'react';
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

  const handleClose = () => {
    window.location.hash = '';
  };

  const handleExitYes = (e) => {
    e.preventDefault();
    console.log('Выход из аккаунта');
    handleClose();
  };

  const handleExitNo = (e) => {
    e.preventDefault();
    handleClose();
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
                <a href="#/">Да, выйти</a>
              </ExitButton>
              <ExitButton 
                variant="no" 
                onClick={handleExitNo}
              >
                <a href="#/">Нет, остаться</a>
              </ExitButton>
            </ButtonGroup>
          </PopupForm>
        </PopupBlock>
      </PopupOverlay>
    </PopupContainer>
  );
};

export default PopupExit;