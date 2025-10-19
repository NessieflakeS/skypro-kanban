import styled, { keyframes } from 'styled-components';

const cardAnimation = keyframes`
  0% {
    height: 0;
    opacity: 0;
  }
  100% {
    height: auto;
    opacity: 1;
  }
`;

export const CardItem = styled.div.attrs(props => ({
  dragging: props.$dragging ? 'true' : undefined,
}))`
  padding: 0;
  animation-name: ${cardAnimation};
  animation-duration: 500ms;
  animation-timing-function: linear;
  cursor: ${props => props.$dragging ? 'grabbing' : 'grab'};
  position: relative;
  opacity: ${props => props.$dragging ? 0.8 : 1};
  transform: ${props => props.$dragging ? 'scale(0.95) rotate(2deg)' : 'scale(1) rotate(0)'};
  transition: all 0.2s ease;
  z-index: ${props => props.$dragging ? 10 : 1};
  box-shadow: ${props => props.$dragging ? 
    '0 8px 25px rgba(0, 0, 0, 0.15), 0 0 0 2px ' + props.theme.textSecondary : 
    '0px 2px 10px rgba(0, 0, 0, 0.1)'};

  &:active {
    cursor: grabbing;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
`;

export const CardContainer = styled.div.attrs(props => ({
  dragging: props.$dragging ? 'true' : undefined,
}))`
  width: 220px;
  height: 130px;
  background-color: ${props => props.theme.cardBg};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: stretch;
  padding: 15px 13px 19px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid ${props => props.theme.borderColor};
`;

export const CardGroup = styled.div`
  width: 100%;
  height: 20px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CardTheme = styled.div`
  border-radius: 24px;
  padding: 6px 20px;
  font-size: 10px;
  font-weight: 600;
  line-height: 10px;
  background-color: ${props => {
    switch (props.$themeColor) {
      case 'orange': return props.theme.orangeBg;
      case 'green': return props.theme.greenBg;
      case 'purple': return props.theme.purpleBg;
      default: return props.theme.grayBg;
    }
  }};
  color: ${props => {
    switch (props.$themeColor) {
      case 'orange': return props.theme.orangeColor;
      case 'green': return props.theme.greenColor;
      case 'purple': return props.theme.purpleColor;
      default: return props.theme.grayColor;
    }
  }};
`;

export const CardButton = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 2px;
  cursor: pointer;
  flex-direction: column;
  position: relative;
  z-index: 10; 
  pointer-events: auto !important;
`;

export const CardDot = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: ${props => props.theme.textTertiary};
`;

export const CardTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: ${props => props.theme.textPrimary};
  margin-bottom: 10px;
`;

export const CardContent = styled.div`
  height: 64px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

export const CardDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  
  svg {
    width: 13px;
    
    path {
      stroke: ${props => props.theme.textTertiary};
    }
  }
  
  p {
    margin-left: 6px;
    font-size: 10px;
    line-height: 13px;
    color: ${props => props.theme.textTertiary};
    letter-spacing: 0.2px;
  }
`;