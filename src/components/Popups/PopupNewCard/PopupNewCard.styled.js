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
  z-index: 6;
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
  padding: 40px 30px 48px;
  border-radius: 10px;
  border: 0.7px solid ${props => props.theme.borderColor};
  position: relative;

  @media screen and (max-width: 660px) {
    border-radius: 0;
    padding: 20px 16px 32px;
  }
`;

export const PopupContent = styled.div`
  display: block;
  text-align: left;
`;

export const PopupTitle = styled.h3`
  color: ${props => props.theme.textPrimary};
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 20px;
`;

export const PopupClose = styled.a`
  position: absolute;
  top: 20px;
  right: 30px;
  color: ${props => props.theme.textTertiary};
  cursor: pointer;
  text-decoration: none;
  font-size: 20px;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.textPrimary};
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
`;

export const FormInput = styled.input`
  width: 100%;
  outline: none;
  padding: 14px;
  background: transparent;
  border: 0.7px solid ${props => props.theme.borderColor};
  border-radius: 8px;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
  color: ${props => props.theme.textPrimary};
  margin: 20px 0;
  transition: border-color 0.3s ease;

  &::placeholder {
    color: ${props => props.theme.textTertiary};
  }

  &:focus {
    border-color: ${props => props.theme.textSecondary};
  }
`;

export const FormTextarea = styled.textarea`
  width: 100%;
  outline: none;
  padding: 14px;
  background: transparent;
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

  @media screen and (max-width: 495px) {
    height: 34px;
  }
`;

export const Categories = styled.div`
  margin-bottom: 20px;
`;

export const CategoriesTitle = styled.p`
  color: ${props => props.theme.textPrimary};
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  margin-bottom: 14px;
`;

export const CategoriesThemes = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 7px;
`;

export const CategoryTheme = styled.div`
  display: inline-block;
  padding: 8px 20px;
  border-radius: 24px;
  cursor: pointer;
  opacity: ${props => props.$active ? 1 : 0.4};
  transition: all 0.3s ease;
  
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
  
  font-size: 14px;
  font-weight: 600;
  line-height: 14px;
  white-space: nowrap;

  &:hover {
    opacity: 0.8;
    transform: translateY(-1px);
  }
`;

export const SubmitButton = styled.button`
  width: 132px;
  height: 30px;
  background-color: ${props => props.theme.textSecondary};
  border-radius: 4px;
  border: none;
  outline: none;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  color: #FFFFFF;
  cursor: pointer;
  transition: all 0.3s ease;
  float: right;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 12px;

  &:hover:not(:disabled) {
    background-color: #33399b;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media screen and (max-width: 495px) {
    width: 100%;
    height: 40px;
    float: none;
  }
`;

export const ErrorMessage = styled.div`
  color: #ff4444;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
`;