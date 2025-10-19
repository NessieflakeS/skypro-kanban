import styled from 'styled-components';

export const PopupContainer = styled.div`
  display: ${props => props.$isOpen ? 'block' : 'none'};
  width: 100%;
  height: 100%;
  min-width: 375px;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 7;
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

  @media screen and (max-width: 660px) {
    padding: 0;
    justify-content: flex-start;
  }
`;

export const PopupBlock = styled.div`
  display: block;
  margin: 0 auto;
  background-color: ${props => props.theme.cardBg};
  max-width: 630px;
  width: 100%;
  padding: 40px 30px 38px;
  border-radius: 10px;
  border: 0.7px solid ${props => props.theme.borderColor};
  position: relative;

  @media screen and (max-width: 660px) {
    border-radius: 0;
  }

  @media screen and (max-width: 495px) {
    padding: 20px 16px 32px;
  }
`;

export const PopupContent = styled.div`
  display: block;
  text-align: left;
`;

export const PopupTopBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
`;

export const PopupTitle = styled.h3`
  color: ${props => props.theme.textPrimary};
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  flex: 1;
  margin-right: 20px;
`;

export const CategoryBadge = styled.div`
  border-radius: 24px;
  padding: 6px 20px;
  font-size: 14px;
  font-weight: 600;
  line-height: 14px;
  white-space: nowrap;
  
  background-color: ${props => {
    switch (props.$theme) {
      case 'orange': return props.theme.orangeBg;
      case 'green': return props.theme.greenBg;
      case 'purple': return props.theme.purpleBg;
      default: return props.theme.grayBg;
    }
  }};
  
  color: ${props => {
    switch (props.$theme) {
      case 'orange': return props.theme.orangeColor;
      case 'green': return props.theme.greenColor;
      case 'purple': return props.theme.purpleColor;
      default: return props.theme.grayColor;
    }
  }};
`;

export const StatusSection = styled.div`
  margin-bottom: 11px;
`;

export const StatusTitle = styled.p`
  color: ${props => props.theme.textPrimary};
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  margin-bottom: 14px;
`;

export const StatusThemes = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 7px;
`;

export const StatusTheme = styled.div`
  border-radius: 24px;
  border: 0.7px solid ${props => props.theme.borderColor};
  color: ${props => props.$active ? '#FFFFFF' : props.theme.textTertiary};
  background-color: ${props => props.$active ? props.theme.textSecondary : 'transparent'};
  padding: 11px 14px 10px;
  cursor: ${props => props.$clickable ? 'pointer' : 'default'};
  transition: all 0.3s ease;

  p {
    font-size: 14px;
    line-height: 1;
    letter-spacing: -0.14px;
    color: ${props => props.$active ? '#FFFFFF' : props.theme.textTertiary};
  }

  &:hover {
    ${props => props.$clickable && `
      background-color: ${props.theme.textSecondary};
      color: #FFFFFF;
      border-color: ${props.theme.textSecondary};
      
      p {
        color: #FFFFFF;
      }
    `}
  }
`;

export const PopupWrap = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 20px;

  @media screen and (max-width: 660px) {
    display: block;
  }
`;

export const PopupForm = styled.form`
  max-width: 370px;
  width: 100%;
  display: block;
  margin-bottom: 20px;

  @media screen and (max-width: 495px) {
    max-width: 100%;
  }
`;

export const FormBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FormLabel = styled.label`
  color: ${props => props.theme.textPrimary};
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  margin-bottom: 14px;
`;

export const FormTextarea = styled.textarea`
  width: 100%;
  outline: none;
  padding: 14px;
  background: ${props => props.theme.bgTertiary};
  border: 0.7px solid ${props => props.theme.borderColor};
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.4;
  letter-spacing: -0.14px;
  color: ${props => props.theme.textPrimary};
  margin-top: 14px;
  height: 200px;
  resize: vertical;
  transition: border-color 0.3s ease;

  &::placeholder {
    color: ${props => props.theme.textTertiary};
  }

  &:focus {
    border-color: ${props => props.theme.textSecondary};
  }

  &:read-only {
    background-color: ${props => props.theme.bgTertiary};
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const EditInput = styled.input`
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 20px;
  font-weight: 600;
  width: 100%;
  box-sizing: border-box;
  color: ${props => props.theme.textPrimary};
  background: transparent;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: ${props => props.theme.textSecondary};
    outline: none;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 20px;

  @media screen and (max-width: 495px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;

  @media screen and (max-width: 495px) {
    width: 100%;
    flex-direction: column;

    button {
      width: 100%;
      height: 40px;
    }
  }
`;

export const CategoriesSection = styled.div`
  margin-bottom: 20px;

  @media screen and (min-width: 496px) {
    display: none;
  }
`;

export const CategoriesTitle = styled.p`
  color: ${props => props.theme.textPrimary};
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  margin-bottom: 14px;
`;

export const ErrorMessage = styled.div`
  color: #ff4444;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
`;