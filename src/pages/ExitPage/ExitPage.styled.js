import styled from 'styled-components';

export const ExitContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${props => props.theme.bgPrimary};
  padding: 20px;
`;

export const ExitContent = styled.div`
  background: ${props => props.theme.cardBg};
  padding: 40px 30px;
  border-radius: 10px;
  border: 0.7px solid ${props => props.theme.borderColor};
  box-shadow: 0px 10px 39px rgba(26, 56, 101, 0.21);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

export const ExitTitle = styled.h1`
  color: ${props => props.theme.textPrimary};
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
`;

export const ExitMessage = styled.p`
  color: ${props => props.theme.textPrimary};
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 30px;
`;

export const ExitButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const ExitButton = styled.button`
  padding: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;

  ${props => props.variant === 'primary' && `
    background-color: ${props.theme.textSecondary};
    color: white;

    &:hover {
      background-color: #33399b;
    }
  `}

  ${props => props.variant === 'secondary' && `
    background: transparent;
    color: ${props.theme.textSecondary};
    border: 1px solid ${props.theme.textSecondary};

    &:hover {
      background-color: ${props.theme.textSecondary};
      color: white;
    }
  `}
`;