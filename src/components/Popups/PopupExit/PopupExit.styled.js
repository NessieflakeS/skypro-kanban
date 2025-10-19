import styled from 'styled-components';

export const PopupContainer = styled.div`
  display: ${props => props.$isOpen ? 'block' : 'none'};
  width: 100%;
  min-width: 375px;
  height: 100%;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 8;
`;

export const PopupOverlay = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
`;

export const PopupBlock = styled.div`
  display: block;
  margin: 0 auto;
  background-color: ${props => props.theme.cardBg};
  max-width: 370px;
  width: 100%;
  padding: 50px 60px;
  border-radius: 10px;
  border: 0.7px solid ${props => props.theme.borderColor};
  position: relative;

  @media screen and (max-width: 495px) {
    border-radius: 0;
    padding: 50px 20px;
  }
`;

export const PopupTitle = styled.div`
  text-align: center;
  margin-bottom: 20px;

  h2 {
    color: ${props => props.theme.textPrimary};
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
  }
`;

export const PopupForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;

  @media screen and (max-width: 495px) {
    flex-direction: column;
  }
`;

export const ExitButton = styled.button`
  width: 153px;
  height: 30px;
  border-radius: 4px;
  border: 0.7px solid ${props => props.$variant === 'yes' ? props.theme.textSecondary : props.theme.borderColor};
  background-color: ${props => props.$variant === 'yes' ? props.theme.textSecondary : 'transparent'};
  color: ${props => props.$variant === 'yes' ? '#FFFFFF' : props.theme.textSecondary};
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 12px;

  &:hover {
    background-color: ${props => props.$variant === 'yes' ? '#33399b' : props.theme.textSecondary};
    color: #FFFFFF;
  }

  @media screen and (max-width: 495px) {
    width: 100%;
    height: 40px;
  }
`;