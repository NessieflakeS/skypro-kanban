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
  
  /* Варианты кнопок */
  ${props => props.variant === 'primary' && `
    background-color: #565EEF;
    color: #FFFFFF;
    
    &:hover {
      background-color: #33399b;
    }
  `}
  
  ${props => props.variant === 'secondary' && `
    background-color: transparent;
    color: #565EEF;
    border: 0.7px solid #565EEF;
    
    &:hover {
      background-color: #33399b;
      color: #FFFFFF;
      border-color: #33399b;
    }
  `}
  
  ${props => props.variant === 'outline' && `
    background-color: transparent;
    color: #565EEF;
    border: 0.7px solid #565EEF;
    
    &:hover {
      background-color: #565EEF;
      color: #FFFFFF;
    }
  `}
  
  /* Размеры */
  ${props => props.size === 'small' && `
    height: 30px;
    padding: 0 14px;
    font-size: 12px;
  `}
  
  ${props => props.size === 'large' && `
    height: 40px;
    padding: 0 20px;
    font-size: 16px;
  `}
  
  ${props => props.size === 'medium' && `
    height: 35px;
    padding: 0 16px;
  `}
  
  /* Полная ширина */
  ${props => props.full && `
    width: 100%;
  `}
  
  /* Disabled state */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;