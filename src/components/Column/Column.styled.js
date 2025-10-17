import styled, { keyframes } from 'styled-components';

const dashMove = keyframes`
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 20px 20px;
  }
`;

const pulse = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
`;

export const ColumnContainer = styled.div`
  min-width: 220px;
  background-color: transparent;
  min-height: 200px;
  transition: all 0.3s ease;
  border: 2px dashed transparent;
  flex: 1;
  max-width: 300px;
  position: relative;
  z-index: ${props => props.dragOver ? 2 : 1};

  ${props => props.dragOver && `
    &::before {
      content: '';
      position: absolute;
      top: -4px;
      left: -4px;
      right: -4px;
      bottom: -4px;
      border: 3px dashed ${props.theme.textSecondary};
      border-radius: 12px;
      pointer-events: none;
      z-index: -1;
      animation: ${dashMove} 1s linear infinite;
    }
  `}

  @media (max-width: 768px) {
    min-width: 100%;
    max-width: 100%;
  }
`;

export const ColumnTitle = styled.div`
  padding: 0 10px;
  margin: 20px 0;
  text-align: center;
  
  p {
    color: ${props => props.dragOver ? props.theme.textSecondary : props.theme.textTertiary};
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    text-transform: uppercase;
    transition: color 0.3s ease;
  }
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 50px;
  position: relative;
  z-index: 1;
`;

export const DropPlaceholder = styled.div`
  height: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 8px 0;
`;

export const DropPlaceholderLine = styled.div`
  height: 2px;
  background-color: ${props => props.theme.textSecondary};
  border-radius: 2px;
  width: 100%;
  animation: ${pulse} 1.5s infinite;
`;