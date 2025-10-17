// Обновленный Button.styled.js с использованием темы
import styled from 'styled-components';

export const StyledButton = styled.button`
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  padding: 8px 16px;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  gap: 8px;
  font-family: "Roboto", Arial, Helvetica, sans-serif;
  
  /* Варианты кнопок с использованием темы */
  ${props => props.variant === 'primary' && `
    background-color: ${props.theme.textSecondary};
    color: #FFFFFF;
    
    &:hover:not(:disabled) {
      background-color: #33399b;
    }
  `}
  
  ${props => props.variant === 'secondary' && `
    background-color: transparent;
    color: ${props.theme.textSecondary};
    border: 0.7px solid ${props.theme.textSecondary};
    
    &:hover:not(:disabled) {
      background-color: ${props.theme.textSecondary};
      color: #FFFFFF;
    }
  `}
  
  ${props => props.variant === 'outline' && `
    background-color: transparent;
    color: ${props.theme.textSecondary};
    border: 0.7px solid ${props.theme.textSecondary};
    
    &:hover:not(:disabled) {
      background-color: ${props.theme.textSecondary};
      color: #FFFFFF;
    }
  `}
  
  /* Размеры */
  ${props => props.size === 'small' && `
    height: 30px;
    padding: 0 14px;
    font-size: 12px;
  `}
  
  ${props => props.size === 'medium' && `
    height: 35px;
    padding: 0 16px;
  `}
  
  ${props => props.size === 'large' && `
    height: 40px;
    padding: 0 20px;
    font-size: 16px;
  `}
  
  /* Полная ширина */
  ${props => props.full && `
    width: 100%;
  `}
  
  /* Disabled state */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
  
  /* Активное состояние */
  &:active:not(:disabled) {
    transform: translateY(1px);
  }
`;