import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
`;

export const SkeletonCardContainer = styled.div`
  width: 220px;
  height: 130px;
  background-color: ${props => props.theme.bgSecondary};
  border-radius: 10px;
  padding: 15px 13px 19px;
  margin-bottom: 20px;
  border: 1px solid ${props => props.theme.borderColor};
`;

export const SkeletonCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const SkeletonCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SkeletonElement = styled.div`
  background: linear-gradient(
    90deg, 
    ${props => props.theme.bgTertiary} 25%, 
    ${props => props.theme.borderColor} 50%, 
    ${props => props.theme.bgTertiary} 75%
  );
  background-size: 200% 100%;
  animation: ${loading} 1.5s infinite;
  border-radius: 4px;

  ${props => props.variant === 'theme' && `
    width: 100px;
    height: 20px;
    border-radius: 24px;
  `}

  ${props => props.variant === 'button' && `
    width: 24px;
    height: 24px;
    border-radius: 50%;
  `}

  ${props => props.variant === 'title' && `
    width: 100%;
    height: 16px;
  `}

  ${props => props.variant === 'date' && `
    width: 80px;
    height: 12px;
  `}

  ${props => props.variant === 'text' && `
    width: ${props.width || '120px'};
    height: ${props.height || '16px'};
    margin: ${props.margin || '0'};
  `}
`;