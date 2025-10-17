import styled from 'styled-components';

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${props => props.theme.bgPrimary};
  padding: 20px;
`;

export const LoginForm = styled.form`
  background: ${props => props.theme.cardBg};
  padding: 40px 30px;
  border-radius: 10px;
  border: 0.7px solid ${props => props.theme.borderColor};
  box-shadow: 0px 10px 39px rgba(26, 56, 101, 0.21);
  width: 100%;
  max-width: 400px;
`;

export const LoginTitle = styled.h1`
  color: ${props => props.theme.textPrimary};
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 30px;
`;

export const LoginInput = styled.input`
  width: 100%;
  padding: 14px;
  margin-bottom: 20px;
  border: 0.7px solid ${props => props.theme.borderColor};
  border-radius: 8px;
  background: transparent;
  color: ${props => props.theme.textPrimary};
  font-size: 14px;
  transition: border-color 0.3s ease;

  &::placeholder {
    color: ${props => props.theme.textTertiary};
  }

  &:focus {
    border-color: ${props => props.theme.textSecondary};
    outline: none;
  }
`;

export const LoginButton = styled.button`
  width: 100%;
  padding: 14px;
  background-color: ${props => props.theme.textSecondary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.3s ease;
  margin-bottom: 20px;

  &:hover {
    background-color: #33399b;
  }
`;

export const LoginLink = styled.p`
  text-align: center;
  color: ${props => props.theme.textPrimary};
  font-size: 14px;

  a {
    color: ${props => props.theme.textSecondary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ErrorMessage = styled.div`
  background-color: #ffebee;
  color: #c62828;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 14px;
  text-align: center;
`;