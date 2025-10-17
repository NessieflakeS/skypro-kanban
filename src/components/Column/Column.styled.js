import styled, { keyframes } from 'styled-components';

const dashAnimation = keyframes`
  0% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: 20;
  }
`;

const borderAnimation = keyframes`
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
  background-color: ${props => props.dragOver ? 'rgba(86, 94, 239, 0.05)' : 'transparent'};
  z-index: ${props => props.dragOver ? 2 : 1};

  &::before {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    border: 3px dashed ${props => props.dragOver ? props.theme.textSecondary : 'transparent'};
    border-radius: 12px;
    pointer-events: none;
    z-index: -1;
    animation: ${props => props.dragOver ? borderAnimation : 'none'} 2s linear infinite;
    background-image: ${props => props.dragOver ? 
      `linear-gradient(90deg, ${props.theme.textSecondary} 50%, transparent 50%), 
       linear-gradient(90deg, ${props.theme.textSecondary} 50%, transparent 50%), 
       linear-gradient(0deg, ${props.theme.textSecondary} 50%, transparent 50%), 
       linear-gradient(0deg, ${props.theme.textSecondary} 50%, transparent 50%)` : 
      'none'};
    background-size: 10px 3px, 10px 3px, 3px 10px, 3px 10px;
    background-position: 0 0, 0 100%, 0 0, 100% 0;
    background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
  }

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

export const AnimatedBorder = styled.div`
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border-radius: 12px;
  pointer-events: none;
  z-index: -1;
  
  svg {
    width: 100%;
    height: 100%;
    border-radius: 12px;
  }
  
  rect {
    width: 100%;
    height: 100%;
    fill: none;
    stroke: ${props => props.theme.textSecondary};
    stroke-width: 3;
    stroke-dasharray: 10, 10;
    stroke-dashoffset: 0;
    animation: ${dashAnimation} 1s linear infinite;
    rx: 12;
    ry: 12;
  }
`;