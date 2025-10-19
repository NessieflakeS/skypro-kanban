import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
`;

export const ColumnContainer = styled.div.attrs(props => ({
  dragover: props.$dragOver ? 'true' : undefined,
}))`
  min-width: 220px;
  background-color: transparent;
  min-height: 200px;
  transition: all 0.3s ease;
  border: 2px dashed transparent;
  flex: 1;
  max-width: 300px;
  background-color: ${props => props.$dragOver ? 'rgba(86, 94, 239, 0.1)' : 'transparent'};
  border: ${props => props.$dragOver ? '2px dashed #565EEF' : '2px dashed transparent'};
  border-radius: ${props => props.$dragOver ? '10px' : '0'};

  @media (max-width: 768px) {
    min-width: 100%;
    max-width: 100%;
  }
`;

export const ColumnTitle = styled.div.attrs(props => ({
  dragover: props.$dragOver ? 'true' : undefined,
}))`
  padding: 0 10px;
  margin: 20px 0;
  text-align: center;
  
  p {
    color: ${props => props.$dragOver ? '#565EEF' : props.theme.textTertiary};
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
  background-color: #565EEF;
  border-radius: 2px;
  width: 100%;
  animation: ${pulse} 1.5s infinite;
`;